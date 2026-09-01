import { expect, test } from "bun:test";
import { Deferred, Effect } from "effect";

import {
  Application,
  InboxLeaseLost,
  InboxStore,
  InboxStoreError,
  MemoryInbox,
} from "../index.ts";
import { FakeBotApi, FakeBotApiReply } from "../testing.ts";

const token = "123456:inbox-runtime-test";
const secretToken = "inbox_runtime_secret";

function update(updateId: number, chatId: number) {
  return {
    message: {
      chat: { id: chatId, type: "private" },
      date: 1_700_000_000,
      message_id: updateId,
      text: `update-${updateId}`,
    },
    update_id: updateId,
  };
}

function request(body: unknown) {
  return new Request("https://bot.example/telegram", {
    body: JSON.stringify(body),
    headers: {
      "content-type": "application/json",
      "x-telegram-bot-api-secret-token": secretToken,
    },
    method: "POST",
  });
}

test("inbox polling saves before acknowledgment and handles saved work", async () => {
  const handled = Promise.withResolvers<void>();
  const inbox = MemoryInbox.make();
  const fake = FakeBotApi.make({
    replies: [FakeBotApiReply.ok([update(11, 201)])],
    token,
  });
  const app = Application.make({ httpClient: fake.layer, inbox, token });

  app.startPolling(() => Effect.sync(handled.resolve), { concurrency: 1 });
  await handled.promise;
  const acknowledgment = await fake.whenCalled("getUpdates", 2);
  await app.close();

  expect(acknowledgment.params).toMatchObject({ offset: 12 });
});

test("inbox webhook acknowledges durable save before its handler completes", async () => {
  const gate = Deferred.makeUnsafe<void>();
  const started = Promise.withResolvers<void>();
  let completed = false;
  const inbox = MemoryInbox.make();
  const fake = FakeBotApi.make({ token });
  const app = Application.make({ httpClient: fake.layer, inbox, token });
  const webhook = app.startWebhook(
    () => Effect.sync(started.resolve).pipe(
      Effect.andThen(Deferred.await(gate)),
      Effect.andThen(Effect.sync(() => {
        completed = true;
      })),
    ),
    { secretToken },
  );

  const response = await webhook.fetch(request(update(21, 301)));
  const completedAtAcknowledgment = completed;
  await started.promise;
  Effect.runSync(Deferred.succeed(gate, undefined));
  await webhook.stop();
  await app.close();

  expect(response.status).toBe(200);
  expect(completedAtAcknowledgment).toBe(false);
  expect(completed).toBe(true);
});

test("inbox webhook returns 503 when durable capacity is full", async () => {
  const memory = MemoryInbox.make();
  await Effect.runPromise(memory.save({
    botId: 123456,
    capacity: 1,
    conversationKey: "chat:1",
    payload: update(30, 1),
    updateId: 30,
  }));
  const inbox = InboxStore.of({
    ...memory,
    acquire: () => Effect.succeed({ _tag: "Held" } as const),
  });
  const fake = FakeBotApi.make({ token });
  const app = Application.make({
    httpClient: fake.layer,
    inbox,
    inboxOptions: { capacity: 1 },
    token,
  });
  const webhook = app.startWebhook(() => Effect.void, { secretToken });

  const response = await webhook.fetch(request(update(31, 2)));
  await app.close();

  expect(response.status).toBe(503);
});

test("inbox webhook returns 503 when its store fails", async () => {
  const memory = MemoryInbox.make();
  const inbox = InboxStore.of({
    ...memory,
    save: () => Effect.fail(new InboxStoreError({
      description: "database unavailable",
      operation: "save",
    })),
  });
  const fake = FakeBotApi.make({ token });
  const app = Application.make({ httpClient: fake.layer, inbox, token });
  const webhook = app.startWebhook(() => Effect.void, { secretToken });

  const response = await webhook.fetch(request(update(41, 401)));
  await app.close();

  expect(response.status).toBe(503);
});

test("inbox retries typed failures before later updates in the same chat", async () => {
  class HandlerError extends Error {}
  const handled: Array<number> = [];
  const finished = Promise.withResolvers<void>();
  const inbox = MemoryInbox.make();
  const fake = FakeBotApi.make({ token });
  const app = Application.make({
    httpClient: fake.layer,
    inbox,
    inboxOptions: { maxAttempts: 2, retryBaseMs: 0, retryMaxMs: 0 },
    token,
  });
  const webhook = app.startWebhook(
    (item) => Effect.sync(() => {
      handled.push(item.updateId);
      if (handled.length === 3) finished.resolve();
      return handled.length;
    }).pipe(
      Effect.flatMap((attempt) => item.updateId === 51 && attempt === 1
        ? Effect.fail(new HandlerError("retry"))
        : Effect.void),
    ),
    { concurrency: 2, secretToken },
  );

  expect((await webhook.fetch(request(update(51, 501)))).status).toBe(200);
  expect((await webhook.fetch(request(update(52, 501)))).status).toBe(200);
  await finished.promise;
  await app.close();

  expect(handled).toEqual([51, 51, 52]);
});

test("inbox parks repeated typed failures and advances the chat", async () => {
  class HandlerError extends Error {}
  const handled: Array<number> = [];
  const laterHandled = Promise.withResolvers<void>();
  const inbox = MemoryInbox.make();
  const fake = FakeBotApi.make({ token });
  const app = Application.make({
    httpClient: fake.layer,
    inbox,
    inboxOptions: { maxAttempts: 2, retryBaseMs: 0, retryMaxMs: 0 },
    token,
  });
  const webhook = app.startWebhook(
    (item) => Effect.sync(() => {
      handled.push(item.updateId);
      if (item.updateId === 62) laterHandled.resolve();
    }).pipe(
      Effect.andThen(item.updateId === 61
        ? Effect.fail(new HandlerError("poison"))
        : Effect.void),
    ),
    { concurrency: 2, secretToken },
  );

  await webhook.fetch(request(update(61, 601)));
  await webhook.fetch(request(update(62, 601)));
  await laterHandled.promise;
  await app.close();

  expect(handled).toEqual([61, 61, 62]);
});

test("inbox preserves handler defects and leaves the update reclaimable", async () => {
  const inbox = MemoryInbox.make();
  const fake = FakeBotApi.make({ token });
  const app = Application.make({ httpClient: fake.layer, inbox, token });
  const webhook = app.startWebhook(
    () => Effect.die(new Error("handler defect")),
    { secretToken },
  );

  await webhook.fetch(request(update(71, 701)));
  await expect(webhook.completed).rejects.toThrow("handler defect");
  await app.close().catch(() => undefined);
  const lease = await Effect.runPromise(inbox.acquire({ botId: 123456, leaseMs: 30_000 }));
  if (lease._tag !== "Acquired") throw new Error("Expected replacement lease");
  const reclaimed = await Effect.runPromise(inbox.claim({
    botId: 123456,
    fencingToken: lease.fencingToken,
    limit: 1,
  }));

  expect(reclaimed.map((item) => [item.updateId, item.attempts])).toEqual([[71, 2]]);
});

test("losing the dispatch lease interrupts handlers without graceful delay", async () => {
  let wasInterrupted = false;
  const started = Promise.withResolvers<void>();
  const interrupted = Promise.withResolvers<void>();
  const memory = MemoryInbox.make();
  const inbox = InboxStore.of({
    ...memory,
    renew: (options) => Effect.fail(new InboxLeaseLost({ botId: options.botId })),
  });
  const fake = FakeBotApi.make({ token });
  const app = Application.make({
    httpClient: fake.layer,
    inbox,
    inboxOptions: { gracePeriodMs: 10_000, leaseMs: 30 },
    token,
  });
  const webhook = app.startWebhook(
    () => Effect.sync(started.resolve).pipe(
      Effect.andThen(Effect.never),
      Effect.onInterrupt(() => Effect.sync(() => {
        wasInterrupted = true;
        interrupted.resolve();
      })),
    ),
    { secretToken },
  );

  await webhook.fetch(request(update(81, 801)));
  await started.promise;
  await interrupted.promise;
  await app.close();

  expect(wasInterrupted).toBe(true);
});
