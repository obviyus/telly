import { expect, test } from "bun:test";
import { Deferred, Effect } from "effect";

import { Application, BotApiError, sendMessage } from "../index.ts";
import { FakeBotApi, FakeBotApiReply } from "../testing.ts";

const token = "123456:polling-test";

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

function signal() {
  const { promise, resolve } = Promise.withResolvers<void>();
  return { promise, resolve: () => resolve() };
}

test("polling acknowledges a received update before its handler completes", async () => {
  const gate = Deferred.makeUnsafe<void>();
  const started = signal();
  const fake = FakeBotApi.make({
    replies: [
      FakeBotApiReply.ok([update(11, 101)]),
    ],
    token,
  });
  const app = Application.make({ httpClient: fake.layer, token });

  try {
    app.startPolling(
      () => Effect.sync(started.resolve).pipe(Effect.andThen(Deferred.await(gate))),
      { acknowledgment: "on-receipt", concurrency: 2 },
    );
    await started.promise;
    const secondPoll = await fake.whenCalled("getUpdates", 2);
    Effect.runSync(Deferred.succeed(gate, undefined));
    expect(secondPoll.params).toMatchObject({ offset: 12 });
  } finally {
    await app.close();
  }
});

test("polling acknowledges an update only after its handler completes", async () => {
  const gate = Deferred.makeUnsafe<void>();
  const started = signal();
  const fake = FakeBotApi.make({
    replies: [
      FakeBotApiReply.ok([update(21, 201)]),
    ],
    token,
  });
  const app = Application.make({ httpClient: fake.layer, token });

  try {
    app.startPolling(
      () => Effect.sync(started.resolve).pipe(Effect.andThen(Deferred.await(gate))),
      { acknowledgment: "on-complete", concurrency: 1 },
    );
    await started.promise;
    Effect.runSync(Deferred.succeed(gate, undefined));
    const secondPoll = await fake.whenCalled("getUpdates", 2);

    expect(secondPoll.params).toMatchObject({ offset: 22 });
  } finally {
    await app.close();
  }
});

test("polling does not acknowledge past an incomplete update", async () => {
  const firstGate = Deferred.makeUnsafe<void>();
  const secondCompleted = signal();
  const fake = FakeBotApi.make({
    replies: [
      FakeBotApiReply.ok([update(31, 301), update(32, 302)]),
    ],
    token,
  });
  const app = Application.make({ httpClient: fake.layer, token });

  try {
    app.startPolling(
      (item) =>
        item.updateId === 31
          ? Deferred.await(firstGate)
          : Effect.sync(secondCompleted.resolve),
      { acknowledgment: "on-complete", concurrency: 2 },
    );
    await secondCompleted.promise;
    const secondPoll = await fake.whenCalled("getUpdates", 2);
    Effect.runSync(Deferred.succeed(firstGate, undefined));
    expect(secondPoll.params).not.toHaveProperty("offset");
  } finally {
    await app.close();
  }
});

test("polling keeps updates from the same chat in order", async () => {
  const firstGate = Deferred.makeUnsafe<void>();
  const firstStarted = signal();
  const secondStarted = signal();
  const handled: Array<number> = [];
  const fake = FakeBotApi.make({
    replies: [
      FakeBotApiReply.ok([update(41, 401), update(42, 401)]),
    ],
    token,
  });
  const app = Application.make({ httpClient: fake.layer, token });

  try {
    app.startPolling((item) =>
      Effect.gen(function* () {
        handled.push(item.updateId);
        if (item.updateId === 41) {
          firstStarted.resolve();
          yield* Deferred.await(firstGate);
        } else {
          secondStarted.resolve();
        }
      }), { concurrency: 2 });
    await firstStarted.promise;
    const beforeRelease = [...handled];
    Effect.runSync(Deferred.succeed(firstGate, undefined));
    await secondStarted.promise;
    expect(beforeRelease).toEqual([41]);
    expect(handled).toEqual([41, 42]);
  } finally {
    await app.close();
  }
});

test("polling handles different chats concurrently", async () => {
  const gate = Deferred.makeUnsafe<void>();
  const bothStarted = signal();
  const started = new Set<number>();
  const fake = FakeBotApi.make({
    replies: [
      FakeBotApiReply.ok([update(51, 501), update(52, 502)]),
    ],
    token,
  });
  const app = Application.make({ httpClient: fake.layer, token });

  try {
    app.startPolling((item) =>
      Effect.sync(() => {
        started.add(item.updateId);
        if (started.size === 2) bothStarted.resolve();
      }).pipe(Effect.andThen(Deferred.await(gate))), { concurrency: 2 });
    await bothStarted.promise;
    const observed = new Set(started);
    Effect.runSync(Deferred.succeed(gate, undefined));
    expect(observed).toEqual(new Set([51, 52]));
  } finally {
    await app.close();
  }
});

test("polling never exceeds its concurrency limit", async () => {
  const firstGate = Deferred.makeUnsafe<void>();
  const remainingGate = Deferred.makeUnsafe<void>();
  const firstTwoStarted = signal();
  const thirdStarted = signal();
  let active = 0;
  let maximumActive = 0;
  const fake = FakeBotApi.make({
    replies: [
      FakeBotApiReply.ok([update(61, 601), update(62, 602)]),
      FakeBotApiReply.ok([update(63, 603)]),
    ],
    token,
  });
  const app = Application.make({ httpClient: fake.layer, token });

  try {
    app.startPolling((item) =>
      Effect.gen(function* () {
        active += 1;
        maximumActive = Math.max(maximumActive, active);
        if (active === 2) firstTwoStarted.resolve();
        if (item.updateId === 63) thirdStarted.resolve();
        yield* Deferred.await(item.updateId === 61 ? firstGate : remainingGate);
        active -= 1;
      }), { concurrency: 2 });
    await firstTwoStarted.promise;
    const pollCountAtCapacity = fake.requests.filter(
      (call) => call.method === "getUpdates"
    ).length;
    Effect.runSync(Deferred.succeed(firstGate, undefined));
    await thirdStarted.promise;
    Effect.runSync(Deferred.succeed(remainingGate, undefined));
    expect(pollCountAtCapacity).toBe(1);
    expect(maximumActive).toBe(2);
  } finally {
    await app.close();
  }
});

test("polling stop interrupts work after the grace period", async () => {
  const started = signal();
  const interrupted = signal();
  let wasInterrupted = false;
  const fake = FakeBotApi.make({
    replies: [FakeBotApiReply.ok([update(71, 701)])],
    token,
  });
  const app = Application.make({ httpClient: fake.layer, token });

  app.startPolling(
    () =>
      Effect.sync(started.resolve).pipe(
        Effect.andThen(Effect.never),
        Effect.onInterrupt(() =>
          Effect.sync(() => {
            wasInterrupted = true;
            interrupted.resolve();
          })
        ),
      ),
    { concurrency: 1, gracePeriodMs: 0 },
  );
  await started.promise;
  await app.stop();
  await interrupted.promise;
  expect(wasInterrupted).toBe(true);
  await app.close();
});

test("polling stop lets active work finish within the grace period", async () => {
  const gate = Deferred.makeUnsafe<void>();
  const started = signal();
  let completed = false;
  let interrupted = false;
  const fake = FakeBotApi.make({
    replies: [FakeBotApiReply.ok([update(81, 801)])],
    token,
  });
  const app = Application.make({ httpClient: fake.layer, token });

  const polling = app.startPolling(
    () =>
      Effect.sync(started.resolve).pipe(
        Effect.andThen(Deferred.await(gate)),
        Effect.andThen(Effect.sync(() => {
          completed = true;
        })),
        Effect.onInterrupt(() => Effect.sync(() => {
          interrupted = true;
        })),
      ),
    { concurrency: 1, gracePeriodMs: 1_000 },
  );
  await started.promise;
  const stopping = polling.stop();
  Effect.runSync(Deferred.succeed(gate, undefined));
  await stopping;

  expect(completed).toBe(true);
  expect(interrupted).toBe(false);
  expect(fake.requests.at(-1)?.params).toMatchObject({ offset: 82, timeout: 0 });
  await app.close();
});

test("polling stop aborts an in-flight long poll", async () => {
  const fake = FakeBotApi.make({ token });
  const app = Application.make({ httpClient: fake.layer, token });
  const polling = app.startPolling(() => Effect.void);

  await fake.whenCalled("getUpdates");
  await polling.stop();
  await polling.completed;

  expect(fake.abortedMethods).toContain("getUpdates");
  await app.close();
});

test("polling exposes handler failures through its completion", async () => {
  const fake = FakeBotApi.make({
    replies: [
      FakeBotApiReply.ok([update(91, 901)]),
      FakeBotApiReply.reject({ description: "Forbidden", errorCode: 403 }),
    ],
    token,
  });
  const app = Application.make({ httpClient: fake.layer, token });
  const polling = app.startPolling(
    () => sendMessage({ chatId: 901, text: "reply" }),
    { concurrency: 1 },
  );
  let caught: unknown;

  try {
    await polling.completed;
  } catch (error) {
    caught = error;
  } finally {
    await app.close();
  }

  expect(caught).toBeInstanceOf(BotApiError);
  if (!(caught instanceof BotApiError)) throw new Error("Expected BotApiError");
  expect(caught.method).toBe("sendMessage");
  expect(caught.message).toContain("403 Forbidden");
});
