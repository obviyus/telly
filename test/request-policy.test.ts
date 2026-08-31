import { expect, test } from "bun:test";
import { Effect, Fiber, Layer, Logger, Redacted, References } from "effect";
import { TestClock } from "effect/testing";

import {
  Bot,
  copyMessages,
  getChatMemberCount,
  getMe,
  retryUnknownOutcome,
  sendMessage,
} from "../index.ts";
import { FakeBotApi, FakeBotApiReply } from "../testing.ts";

const token = "123456:request-policy-test";

function botLayer(fake: FakeBotApi, rateLimit = true) {
  return Bot.layer({ rateLimit, token: Redacted.make(token) }).pipe(Layer.provide(fake.layer));
}

function withTestRuntime<A, E>(fake: FakeBotApi, effect: Effect.Effect<A, E, Bot>) {
  return effect.pipe(
    Effect.provide(botLayer(fake)),
    Effect.provide(TestClock.layer()),
  );
}

test("429 waits for retryAfter before retrying", async () => {
  const fake = FakeBotApi.make({
    replies: [
      FakeBotApiReply.reject({
        description: "Too Many Requests",
        errorCode: 429,
        parameters: { retryAfter: 7 },
      }),
      FakeBotApiReply.ok({
        chat: { id: 11, type: "private" },
        date: 1_700_000_000,
        message_id: 81,
        text: "ratchet",
      }),
    ],
    token,
  });
  const program = Effect.gen(function* () {
    const fiber = yield* sendMessage({ chatId: 11, text: "ratchet" }).pipe(Effect.forkChild);
    yield* Effect.promise(() => fake.whenCalled("sendMessage"));
    yield* Effect.yieldNow;

    yield* TestClock.adjust("6999 millis");
    expect(fake.requests).toHaveLength(1);
    yield* TestClock.adjust("1 millis");

    return yield* Fiber.join(fiber);
  });

  const message = await Effect.runPromise(withTestRuntime(fake, program));

  expect(message.messageId).toBe(81);
  expect(fake.requests).toHaveLength(2);
});

test("a learned 429 cooldown pauses calls already waiting for a rate slot", async () => {
  const fake = FakeBotApi.make({
    replies: [
      FakeBotApiReply.ok({
        chat: { id: 22, type: "private" },
        date: 1_700_000_000,
        message_id: 82,
        text: "prime",
      }),
      FakeBotApiReply.reject({
        description: "Too Many Requests",
        errorCode: 429,
        parameters: { retryAfter: 5 },
      }),
      FakeBotApiReply.ok({
        chat: { id: 21, type: "private" },
        date: 1_700_000_000,
        message_id: 83,
        text: "limited",
      }),
      FakeBotApiReply.ok({
        chat: { id: 22, type: "private" },
        date: 1_700_000_000,
        message_id: 84,
        text: "queued",
      }),
      FakeBotApiReply.ok({
        chat: { id: 22, type: "private" },
        date: 1_700_000_000,
        message_id: 85,
        text: "queued-again",
      }),
    ],
    token,
  });
  const program = Effect.gen(function* () {
    yield* sendMessage({ chatId: 22, text: "prime" });
    const queued = yield* sendMessage({ chatId: 22, text: "queued" }).pipe(
      Effect.forkChild,
    );
    const queuedAgain = yield* sendMessage({ chatId: 22, text: "queued-again" }).pipe(
      Effect.forkChild,
    );
    const limited = yield* sendMessage({ chatId: 21, text: "limited" }).pipe(
      Effect.forkChild,
    );
    yield* Effect.yieldNow;

    yield* TestClock.adjust("34 millis");
    expect(fake.requests).toHaveLength(2);
    yield* TestClock.adjust("4999 millis");
    expect(fake.requests).toHaveLength(2);
    yield* TestClock.adjust("1 millis");
    yield* TestClock.adjust("34 millis");
    expect(fake.requests).toHaveLength(4);
    yield* TestClock.adjust("965 millis");
    expect(fake.requests).toHaveLength(4);
    yield* TestClock.adjust("1 millis");
    yield* Fiber.join(limited);
    yield* Fiber.join(queued);
    yield* Fiber.join(queuedAgain);
  });

  await Effect.runPromise(withTestRuntime(fake, program));

  expect(fake.requests).toHaveLength(5);
});

test("same-chat messages are paced at one per second", async () => {
  const fake = FakeBotApi.make({ token });
  const program = Effect.gen(function* () {
    yield* sendMessage({ chatId: 31, text: "first" });
    const second = yield* sendMessage({ chatId: 31, text: "second" }).pipe(Effect.forkChild);
    yield* Effect.yieldNow;

    yield* TestClock.adjust("999 millis");
    expect(fake.requests).toHaveLength(1);
    yield* TestClock.adjust("1 millis");
    yield* Fiber.join(second);
  });

  await Effect.runPromise(withTestRuntime(fake, program));

  expect(fake.requests).toHaveLength(2);
});

test("group messages are paced at twenty per minute", async () => {
  const fake = FakeBotApi.make({ token });
  const program = Effect.gen(function* () {
    yield* sendMessage({ chatId: -41, text: "first" });
    const second = yield* sendMessage({ chatId: -41, text: "second" }).pipe(Effect.forkChild);
    yield* Effect.yieldNow;

    yield* TestClock.adjust("2999 millis");
    expect(fake.requests).toHaveLength(1);
    yield* TestClock.adjust("1 millis");
    yield* Fiber.join(second);
  });

  await Effect.runPromise(withTestRuntime(fake, program));

  expect(fake.requests).toHaveLength(2);
});

test("paid broadcasts use the documented thousand-per-second overall limit", async () => {
  const fake = FakeBotApi.make({ token });
  const program = Effect.gen(function* () {
    yield* sendMessage({ allowPaidBroadcast: true, chatId: 51, text: "first" });
    const second = yield* sendMessage({
      allowPaidBroadcast: true,
      chatId: 52,
      text: "second",
    }).pipe(Effect.forkChild);
    yield* Effect.yieldNow;

    expect(fake.requests).toHaveLength(1);
    yield* TestClock.adjust("1 millis");
    yield* Fiber.join(second);
  });

  await Effect.runPromise(withTestRuntime(fake, program));

  expect(fake.requests).toHaveLength(2);
});

test("batch message methods reserve one slot per resulting message", async () => {
  const fake = FakeBotApi.make({
    replies: [FakeBotApiReply.ok([
      { message_id: 91 },
      { message_id: 92 },
      { message_id: 93 },
    ])],
    token,
  });
  const program = Effect.gen(function* () {
    yield* copyMessages({
      chatId: 61,
      fromChatId: 62,
      messageIds: [1, 2, 3],
    });
    const nextChat = yield* sendMessage({ chatId: 63, text: "overall" }).pipe(
      Effect.forkChild,
    );
    yield* Effect.yieldNow;

    yield* TestClock.adjust("99 millis");
    expect(fake.requests).toHaveLength(1);
    yield* TestClock.adjust("1 millis");
    yield* Fiber.join(nextChat);
  });

  await Effect.runPromise(withTestRuntime(fake, program));

  expect(fake.requests).toHaveLength(2);
});

test("read methods bypass message pacing", async () => {
  const fake = FakeBotApi.make({
    replies: [
      FakeBotApiReply.ok({
        chat: { id: 64, type: "private" },
        date: 1_700_000_000,
        message_id: 96,
        text: "message",
      }),
      FakeBotApiReply.ok(17),
    ],
    token,
  });
  const program = Effect.gen(function* () {
    yield* sendMessage({ chatId: 64, text: "message" });
    return yield* getChatMemberCount({ chatId: 64 });
  });

  const count = await Effect.runPromise(withTestRuntime(fake, program));

  expect(count).toBe(17);
  expect(fake.requests.map((request) => request.method)).toEqual([
    "sendMessage",
    "getChatMemberCount",
  ]);
});

test("unknown send outcomes retry only with explicit opt-in", async () => {
  const defaultFake = FakeBotApi.make({
    replies: [
      FakeBotApiReply.transportFailure("connection reset"),
      FakeBotApiReply.ok({
        chat: { id: 71, type: "private" },
        date: 1_700_000_000,
        message_id: 94,
        text: "default",
      }),
    ],
    token,
  });
  const defaultError = await Effect.runPromise(Effect.flip(
    sendMessage({ chatId: 71, text: "default" }).pipe(
      Effect.provide(botLayer(defaultFake)),
    ),
  ));

  expect(defaultError.reason._tag).toBe("Transport");
  expect(defaultFake.requests).toHaveLength(1);

  const optedInFake = FakeBotApi.make({
    replies: [
      FakeBotApiReply.transportFailure("connection reset"),
      FakeBotApiReply.ok({
        chat: { id: 72, type: "private" },
        date: 1_700_000_000,
        message_id: 95,
        text: "opted-in",
      }),
    ],
    token,
  });
  const program = Effect.gen(function* () {
    const fiber = yield* sendMessage({ chatId: 72, text: "opted-in" }).pipe(
      retryUnknownOutcome,
      Effect.forkChild,
    );
    yield* Effect.promise(() => optedInFake.whenCalled("sendMessage"));
    yield* Effect.yieldNow;
    yield* TestClock.adjust("1 second");
    return yield* Fiber.join(fiber);
  });

  const message = await Effect.runPromise(withTestRuntime(optedInFake, program));

  expect(message.messageId).toBe(95);
  expect(optedInFake.requests).toHaveLength(2);
});

test("safe reads retry transport failures three times", async () => {
  const fake = FakeBotApi.make({
    replies: [
      FakeBotApiReply.transportFailure("first reset"),
      FakeBotApiReply.transportFailure("second reset"),
      FakeBotApiReply.transportFailure("third reset"),
    ],
    token,
  });
  const program = Effect.gen(function* () {
    const fiber = yield* Effect.flip(getMe()).pipe(Effect.forkChild);
    yield* Effect.promise(() => fake.whenCalled("getMe"));
    yield* Effect.yieldNow;
    yield* TestClock.adjust("1 second");
    yield* TestClock.adjust("2 seconds");
    return yield* Fiber.join(fiber);
  });

  const error = await Effect.runPromise(withTestRuntime(fake, program));

  expect(error.reason._tag).toBe("Transport");
  expect(error.retrySafe).toBe(true);
  expect(fake.requests).toHaveLength(3);
});

test("Telegram server failures retry with backoff", async () => {
  const serverFake = FakeBotApi.make({
    replies: [
      FakeBotApiReply.reject({ description: "Unavailable", errorCode: 503 }),
      FakeBotApiReply.ok({
        chat: { id: 81, type: "private" },
        date: 1_700_000_000,
        message_id: 97,
        text: "retried",
      }),
    ],
    token,
  });
  const serverProgram = Effect.gen(function* () {
    const fiber = yield* sendMessage({ chatId: 81, text: "retried" }).pipe(Effect.forkChild);
    yield* Effect.promise(() => serverFake.whenCalled("sendMessage"));
    yield* Effect.yieldNow;
    yield* TestClock.adjust("1 second");
    return yield* Fiber.join(fiber);
  });

  const message = await Effect.runPromise(withTestRuntime(serverFake, serverProgram));
  expect(message.messageId).toBe(97);
  expect(serverFake.requests).toHaveLength(2);
});

test("Telegram client rejections do not retry", async () => {
  const clientFake = FakeBotApi.make({
    replies: [FakeBotApiReply.reject({ description: "Bad Request", errorCode: 400 })],
    token,
  });
  const error = await Effect.runPromise(Effect.flip(
    sendMessage({ chatId: 82, text: "rejected" }).pipe(
      Effect.provide(botLayer(clientFake)),
    ),
  ));

  expect(error.reason._tag).toBe("TelegramRejected");
  expect(clientFake.requests).toHaveLength(1);
});

test("interrupting a paced call cancels its wait", async () => {
  const fake = FakeBotApi.make({ token });
  const program = Effect.gen(function* () {
    yield* sendMessage({ chatId: 91, text: "first" });
    const waiting = yield* sendMessage({ chatId: 91, text: "second" }).pipe(
      Effect.forkChild,
    );
    yield* Effect.yieldNow;
    yield* Fiber.interrupt(waiting);
  });

  await Effect.runPromise(withTestRuntime(fake, program));

  expect(fake.requests).toHaveLength(1);
});

test("rate limiting can be disabled for an externally managed policy", async () => {
  const fake = FakeBotApi.make({ token });
  const program = Effect.gen(function* () {
    yield* sendMessage({ chatId: 101, text: "first" });
    yield* sendMessage({ chatId: 101, text: "second" });
  }).pipe(
    Effect.provide(botLayer(fake, false)),
    Effect.provide(TestClock.layer()),
  );

  await Effect.runPromise(program);

  expect(fake.requests).toHaveLength(2);
});

test("retry logs never expose the bot token", async () => {
  const logs: Array<unknown> = [];
  const logger = Logger.make((options) => {
    logs.push({
      annotations: options.fiber.getRef(References.CurrentLogAnnotations),
      message: options.message,
    });
  });
  const fake = FakeBotApi.make({
    replies: [
      FakeBotApiReply.transportFailure(`failed /bot${token}/getMe`),
      FakeBotApiReply.ok({
        first_name: "Telly Test",
        id: 111,
        is_bot: true,
      }),
    ],
    token,
  });
  const program = Effect.gen(function* () {
    const fiber = yield* getMe().pipe(Effect.forkChild);
    yield* Effect.promise(() => fake.whenCalled("getMe"));
    yield* Effect.yieldNow;
    yield* TestClock.adjust("1 second");
    yield* Fiber.join(fiber);
  }).pipe(
    Effect.provide(botLayer(fake)),
    Effect.provide(Logger.layer([logger])),
    Effect.provideService(References.MinimumLogLevel, "Debug"),
    Effect.provide(TestClock.layer()),
  );

  await Effect.runPromise(program);

  expect(logs).not.toHaveLength(0);
  expect(JSON.stringify(logs)).not.toContain(token);
});
