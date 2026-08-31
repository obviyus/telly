import { expect, test } from "bun:test";
import { Deferred, Effect } from "effect";

import {
  Application,
  defineBot,
  respond,
  type Update,
} from "../index.ts";
import { FakeBotApi } from "../testing.ts";

const token = "123456:webhook-test";
const secretToken = "webhook_secret-17";

function update(updateId: number, chatId: number, text = `update-${updateId}`) {
  return {
    message: {
      chat: { id: chatId, type: "private" },
      date: 1_700_000_000,
      message_id: updateId,
      text,
    },
    update_id: updateId,
  };
}

function request(body: unknown, secret = secretToken) {
  return new Request("https://bot.example/telegram", {
    body: typeof body === "string" ? body : JSON.stringify(body),
    headers: {
      "content-type": "application/json",
      "x-telegram-bot-api-secret-token": secret,
    },
    method: "POST",
  });
}

function signal() {
  const { promise, resolve } = Promise.withResolvers<void>();
  return { promise, resolve: () => resolve() };
}

test("webhook rejects wrong methods, secrets, and malformed updates", async () => {
  const fake = FakeBotApi.make({ token });
  const app = Application.make({ httpClient: fake.layer, token });
  const webhook = app.startWebhook(() => Effect.void, { secretToken });

  try {
    const wrongMethod = await webhook.fetch(new Request("https://bot.example/telegram"));
    const missingSecret = await webhook.fetch(new Request("https://bot.example/telegram", {
      body: "{}",
      method: "POST",
    }));
    const wrongSecret = await webhook.fetch(request({}, "wrong-secret"));
    const malformedJson = await webhook.fetch(request("{"));
    const invalidUpdate = await webhook.fetch(request({ ok: true }));

    expect(wrongMethod.status).toBe(405);
    expect(wrongMethod.headers.get("allow")).toBe("POST");
    expect(missingSecret.status).toBe(401);
    expect(wrongSecret.status).toBe(401);
    expect(malformedJson.status).toBe(400);
    expect(invalidUpdate.status).toBe(400);
  } finally {
    await app.close();
  }
});

test("webhook rejects invalid dispatch options", async () => {
  const fake = FakeBotApi.make({ token });
  const app = Application.make({ httpClient: fake.layer, token });

  expect(() => app.startWebhook(() => Effect.void, {
    concurrency: 0,
    secretToken,
  })).toThrow("concurrency must be a positive integer");
  expect(() => app.startWebhook(() => Effect.void, {
    gracePeriodMs: -1,
    secretToken,
  })).toThrow("gracePeriodMs must be a non-negative number");

  await app.close();
});

test("webhook runs a defineBot handler and acknowledges after completion", async () => {
  const fake = FakeBotApi.make({ token });
  const app = Application.make({ httpClient: fake.layer, token });
  const bot = defineBot({
    commands: {
      start: ({ message }) => respond(message, "webhook-started"),
    },
  });
  const webhook = app.startWebhook(bot, { secretToken });

  try {
    const delivered = await webhook.fetch(request({
      ...update(301, 701, "/start"),
      message: {
        ...update(301, 701, "/start").message,
        entities: [{ length: 6, offset: 0, type: "bot_command" }],
      },
    }));

    expect(delivered.status).toBe(200);
    expect(fake.requests[0]?.params).toMatchObject({
      chat_id: 701,
      text: "webhook-started",
    });
  } finally {
    await app.close();
  }
});

test("webhook keeps updates from one chat in order", async () => {
  const firstGate = Deferred.makeUnsafe<void>();
  const firstStarted = signal();
  const secondStarted = signal();
  const handled: Array<number> = [];
  const fake = FakeBotApi.make({ token });
  const app = Application.make({ httpClient: fake.layer, token });
  const webhook = app.startWebhook(
    (item: Update) => Effect.gen(function* () {
      handled.push(item.updateId);
      if (item.updateId === 311) {
        firstStarted.resolve();
        yield* Deferred.await(firstGate);
      } else {
        secondStarted.resolve();
      }
    }),
    { concurrency: 2, secretToken },
  );

  try {
    const first = webhook.fetch(request(update(311, 711)));
    await firstStarted.promise;
    const second = webhook.fetch(request(update(312, 711)));
    const beforeRelease = [...handled];
    Effect.runSync(Deferred.succeed(firstGate, undefined));
    await secondStarted.promise;

    expect((await first).status).toBe(200);
    expect((await second).status).toBe(200);
    expect(beforeRelease).toEqual([311]);
    expect(handled).toEqual([311, 312]);
  } finally {
    await app.close();
  }
});

test("webhook runs different chats concurrently", async () => {
  const gate = Deferred.makeUnsafe<void>();
  const bothStarted = signal();
  const started = new Set<number>();
  const fake = FakeBotApi.make({ token });
  const app = Application.make({ httpClient: fake.layer, token });
  const webhook = app.startWebhook(
    (item: Update) => Effect.sync(() => {
      started.add(item.updateId);
      if (started.size === 2) bothStarted.resolve();
    }).pipe(Effect.andThen(Deferred.await(gate))),
    { concurrency: 2, secretToken },
  );

  try {
    const first = webhook.fetch(request(update(321, 721)));
    const second = webhook.fetch(request(update(322, 722)));
    await bothStarted.promise;
    const observed = new Set(started);
    Effect.runSync(Deferred.succeed(gate, undefined));

    expect((await first).status).toBe(200);
    expect((await second).status).toBe(200);
    expect(observed).toEqual(new Set([321, 322]));
  } finally {
    await app.close();
  }
});

test("webhook rejects excess unique work with 503", async () => {
  const gate = Deferred.makeUnsafe<void>();
  const started = signal();
  const fake = FakeBotApi.make({ token });
  const app = Application.make({ httpClient: fake.layer, token });
  const webhook = app.startWebhook(
    () => Effect.sync(started.resolve).pipe(Effect.andThen(Deferred.await(gate))),
    { concurrency: 1, secretToken },
  );

  try {
    const first = webhook.fetch(request(update(331, 731)));
    await started.promise;
    const overloaded = await webhook.fetch(request(update(332, 732)));
    Effect.runSync(Deferred.succeed(gate, undefined));

    expect(overloaded.status).toBe(503);
    expect((await first).status).toBe(200);
  } finally {
    await app.close();
  }
});

test("webhook shares concurrent duplicates and remembers completion", async () => {
  const gate = Deferred.makeUnsafe<void>();
  const started = signal();
  let handled = 0;
  const fake = FakeBotApi.make({ token });
  const app = Application.make({ httpClient: fake.layer, token });
  const webhook = app.startWebhook(
    () => Effect.sync(() => {
      handled += 1;
      started.resolve();
    }).pipe(Effect.andThen(Deferred.await(gate))),
    { concurrency: 1, secretToken },
  );

  try {
    const first = webhook.fetch(request(update(341, 741)));
    await started.promise;
    const duplicate = webhook.fetch(request(update(341, 741)));
    Effect.runSync(Deferred.succeed(gate, undefined));

    expect((await first).status).toBe(200);
    expect((await duplicate).status).toBe(200);
    expect((await webhook.fetch(request(update(341, 741)))).status).toBe(200);
    expect(handled).toBe(1);
  } finally {
    await app.close();
  }
});

test("webhook returns 500 on handler failure and then stops accepting work", async () => {
  class HandlerError extends Error {}
  const fake = FakeBotApi.make({ token });
  const app = Application.make({ httpClient: fake.layer, token });
  const webhook = app.startWebhook(
    () => Effect.fail(new HandlerError("handler failed")),
    { secretToken },
  );
  let failure: unknown;

  try {
    const failed = await webhook.fetch(request(update(351, 751)));
    try {
      await webhook.completed;
    } catch (error) {
      failure = error;
    }
    const afterFailure = await webhook.fetch(request(update(352, 752)));

    expect(failed.status).toBe(500);
    expect(failure).toBeInstanceOf(HandlerError);
    expect(afterFailure.status).toBe(503);
  } finally {
    await app.close().catch(() => undefined);
  }
});

test("webhook stop drains active work and completes pending response", async () => {
  const gate = Deferred.makeUnsafe<void>();
  const started = signal();
  let completed = false;
  const fake = FakeBotApi.make({ token });
  const app = Application.make({ httpClient: fake.layer, token });
  const webhook = app.startWebhook(
    () => Effect.sync(started.resolve).pipe(
      Effect.andThen(Deferred.await(gate)),
      Effect.andThen(Effect.sync(() => {
        completed = true;
      })),
    ),
    { gracePeriodMs: 1_000, secretToken },
  );

  const delivered = webhook.fetch(request(update(361, 761)));
  await started.promise;
  const stopping = webhook.stop();
  Effect.runSync(Deferred.succeed(gate, undefined));
  await stopping;

  expect(completed).toBe(true);
  expect((await delivered).status).toBe(200);
  expect((await webhook.fetch(request(update(362, 762)))).status).toBe(503);
  await app.close();
});

test("webhook stop returns 503 after interrupting work beyond the grace period", async () => {
  const started = signal();
  const interrupted = signal();
  const fake = FakeBotApi.make({ token });
  const app = Application.make({ httpClient: fake.layer, token });
  const webhook = app.startWebhook(
    () => Effect.sync(started.resolve).pipe(
      Effect.andThen(Effect.never),
      Effect.onInterrupt(() => Effect.sync(interrupted.resolve)),
    ),
    { gracePeriodMs: 0, secretToken },
  );

  const delivered = webhook.fetch(request(update(371, 771)));
  await started.promise;
  await webhook.stop();
  await interrupted.promise;

  expect((await delivered).status).toBe(503);
  await app.close();
});
