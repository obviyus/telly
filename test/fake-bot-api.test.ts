import { expect, test } from "bun:test";
import { Effect, Fiber, Layer, Redacted } from "effect";
import { TestClock } from "effect/testing";

import {
  Bot,
  BotApiError,
  deleteWebhook,
  editMessageText,
  getUpdates,
  getWebhookInfo,
  sendMessage,
  sendRichMessage,
  setWebhook,
} from "../index.ts";
import { FakeBotApi, FakeBotApiReply, type FakeUpdate } from "../testing.ts";

const token = "123456:semantic-fake";

function update(updateId: number): FakeUpdate {
  return {
    message: {
      chat: { id: 71, type: "private" },
      date: 1_700_000_000,
      message_id: updateId,
      text: `update-${updateId}`,
    },
    update_id: updateId,
  };
}

function botLayer(fake: FakeBotApi, rateLimit = false) {
  return Bot.layer({ rateLimit, token: Redacted.make(token) }).pipe(
    Layer.provide(fake.layer),
  );
}

test("fake getUpdates redelivers until a positive offset confirms updates", async () => {
  const fake = FakeBotApi.make({
    token,
    updates: [update(11), update(12), update(13)],
  });
  const result = await Effect.runPromise(Effect.gen(function* () {
    const first = yield* getUpdates({ limit: 2, timeout: 0 });
    const redelivered = yield* getUpdates({ limit: 2, timeout: 0 });
    const remaining = yield* getUpdates({ offset: 12, timeout: 0 });
    const cleared = yield* getUpdates({ offset: 14, timeout: 0 });
    return { cleared, first, redelivered, remaining };
  }).pipe(Effect.provide(botLayer(fake))));

  expect(result.first.map((item) => item.updateId)).toEqual([11, 12]);
  expect(result.redelivered.map((item) => item.updateId)).toEqual([11, 12]);
  expect(result.remaining.map((item) => item.updateId)).toEqual([12, 13]);
  expect(result.cleared).toEqual([]);
});

test("fake getUpdates supports Telegram negative offsets", async () => {
  const fake = FakeBotApi.make({
    token,
    updates: [update(21), update(22), update(23)],
  });
  const result = await Effect.runPromise(Effect.gen(function* () {
    const tail = yield* getUpdates({ offset: -2, timeout: 0 });
    const redelivered = yield* getUpdates({ timeout: 0 });
    return { redelivered, tail };
  }).pipe(Effect.provide(botLayer(fake))));

  expect(result.tail.map((item) => item.updateId)).toEqual([22, 23]);
  expect(result.redelivered.map((item) => item.updateId)).toEqual([22, 23]);
});

test("pushUpdate wakes a parked long poll", async () => {
  const fake = FakeBotApi.make({ token });
  const received = await Effect.runPromise(Effect.gen(function* () {
    const polling = yield* getUpdates({ timeout: 30 }).pipe(Effect.forkChild);
    yield* Effect.promise(() => fake.whenCalled("getUpdates"));
    yield* Effect.yieldNow;
    yield* Effect.sync(() => fake.pushUpdate(update(31)));
    return yield* Fiber.join(polling);
  }).pipe(Effect.provide(botLayer(fake))));

  expect(received.map((item) => item.updateId)).toEqual([31]);
});

test("pushUpdate rejects an update id that does not advance", () => {
  const fake = FakeBotApi.make({ token, updates: [update(35)] });

  expect(() => fake.pushUpdate(update(35))).toThrow(
    "ascending positive update_id values",
  );
});

test("a long poll returns empty when its Telegram timeout expires", async () => {
  const fake = FakeBotApi.make({ token });
  const received = await Effect.runPromise(Effect.gen(function* () {
    const polling = yield* getUpdates({ timeout: 30 }).pipe(Effect.forkChild);
    yield* Effect.promise(() => fake.whenCalled("getUpdates"));
    yield* Effect.yieldNow;
    yield* TestClock.adjust("30 seconds");
    return yield* Fiber.join(polling);
  }).pipe(
    Effect.provide(botLayer(fake)),
    Effect.provide(TestClock.layer()),
  ));

  expect(received).toEqual([]);
});

test("a newer long poll terminates the older poll with a conflict", async () => {
  const fake = FakeBotApi.make({ token });
  const result = await Effect.runPromise(Effect.gen(function* () {
    const older = yield* getUpdates({ timeout: 30 }).pipe(Effect.forkChild);
    yield* Effect.promise(() => fake.whenCalled("getUpdates"));
    yield* Effect.yieldNow;
    const newer = yield* getUpdates({ timeout: 30 }).pipe(Effect.forkChild);
    yield* Effect.promise(() => fake.whenCalled("getUpdates", 2));
    const conflict = yield* Fiber.join(older).pipe(Effect.flip);
    yield* Effect.sync(() => fake.pushUpdate(update(41)));
    const received = yield* Fiber.join(newer);
    return { conflict, received };
  }).pipe(Effect.provide(botLayer(fake))));

  expect(result.conflict).toBeInstanceOf(BotApiError);
  expect(result.conflict.reason).toMatchObject({ errorCode: 409 });
  expect(result.received.map((item) => item.updateId)).toEqual([41]);
});

test("webhook methods own delivery state and pending update count", async () => {
  const fake = FakeBotApi.make({ token, updates: [update(51)] });
  const result = await Effect.runPromise(Effect.gen(function* () {
    yield* setWebhook({ url: "https://bot.example/telegram" });
    const active = yield* getWebhookInfo();
    const conflict = yield* getUpdates({ timeout: 0 }).pipe(Effect.flip);
    yield* deleteWebhook({ dropPendingUpdates: true });
    const inactive = yield* getWebhookInfo();
    yield* Effect.sync(() => fake.pushUpdate(update(52)));
    const received = yield* getUpdates({ timeout: 0 });
    return { active, conflict, inactive, received };
  }).pipe(Effect.provide(botLayer(fake))));

  expect(result.active).toMatchObject({
    pendingUpdateCount: 1,
    url: "https://bot.example/telegram",
  });
  expect(result.conflict.reason).toMatchObject({ errorCode: 409 });
  expect(result.inactive).toMatchObject({ pendingUpdateCount: 0, url: "" });
  expect(result.received.map((item) => item.updateId)).toEqual([52]);
});

test("serverRateLimit rejects an early message and accepts its timed retry", async () => {
  const fake = FakeBotApi.make({ serverRateLimit: true, token });
  const result = await Effect.runPromise(Effect.gen(function* () {
    const first = yield* sendMessage({ chatId: 61, text: "first" });
    const second = yield* sendMessage({ chatId: 61, text: "second" }).pipe(
      Effect.forkChild,
    );
    yield* Effect.promise(() => fake.whenCalled("sendMessage", 2));
    yield* Effect.yieldNow;
    const waiting = yield* Effect.sync(() => second.pollUnsafe() === undefined);
    yield* TestClock.adjust("1 second");
    const retried = yield* Fiber.join(second);
    return { first, retried, waiting };
  }).pipe(
    Effect.provide(botLayer(fake)),
    Effect.provide(TestClock.layer()),
  ));

  expect(result.waiting).toBe(true);
  expect(result.first.text).toBe("first");
  expect(result.retried.text).toBe("second");
  expect(fake.requests.filter((call) => call.method === "sendMessage")).toHaveLength(3);
});

test("fake rich messages can be sent and edited", async () => {
  const fake = FakeBotApi.make({ token });

  const result = await Effect.runPromise(Effect.gen(function* () {
    const sent = yield* sendRichMessage({
      chatId: 63,
      richMessage: { markdown: "## Native rich answer" },
    });
    const edited = yield* editMessageText({
      chatId: sent.chat.id,
      messageId: sent.messageId,
      richMessage: { markdown: "## Edited rich answer" },
    });
    return { edited, sent };
  }).pipe(Effect.provide(botLayer(fake))));

  expect(result.sent).toMatchObject({
    chat: { id: 63 },
    richMessage: { blocks: [] },
  });
  expect(result.edited).toMatchObject({
    chat: { id: 63 },
    messageId: result.sent.messageId,
    richMessage: { blocks: [] },
  });
  expect(fake.requests.map(({ method }) => method)).toEqual([
    "sendRichMessage",
    "editMessageText",
  ]);
});

test("a scripted failure leaves semantic updates untouched", async () => {
  const fake = FakeBotApi.make({
    replies: [FakeBotApiReply.reject({ description: "Forbidden", errorCode: 403 })],
    token,
    updates: [update(71)],
  });
  const result = await Effect.runPromise(Effect.gen(function* () {
    const failed = yield* getUpdates({ timeout: 0 }).pipe(Effect.flip);
    const received = yield* getUpdates({ timeout: 0 });
    return { failed, received };
  }).pipe(Effect.provide(botLayer(fake))));

  expect(result.failed.reason).toMatchObject({ errorCode: 403 });
  expect(result.received.map((item) => item.updateId)).toEqual([71]);
});
