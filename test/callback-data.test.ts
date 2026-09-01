import { expect, test } from "bun:test";
import { Effect, Schema } from "effect";

import {
  Application,
  callbackData,
  CallbackDataInvalid,
  CallbackDataTooLong,
  callbackQuery,
  on,
  routes,
  type Update,
} from "../index.ts";
import { FakeBotApi } from "../testing.ts";

const token = "123456:callback-data";

function callbackUpdate(data: string): Update {
  return {
    callbackQuery: {
      chatInstance: "callback-chat",
      data,
      from: { firstName: "Ada", id: 17, isBot: false },
      id: "query-1",
    },
    updateId: 101,
  };
}

test("callback data round trips typed payloads and builds inline buttons", () => {
  const choice = callbackData("choice", Schema.Struct({
    answer: Schema.Literals(["yes", "no"]),
    orderId: Schema.Int,
  }));

  const packed = choice.pack({ answer: "yes", orderId: 42 });

  expect(packed).toBe('choice:{"answer":"yes","orderId":42}');
  expect(choice.unpack(packed)).toEqual({ answer: "yes", orderId: 42 });
  expect(choice.button("Confirm", { answer: "yes", orderId: 42 })).toEqual({
    callbackData: packed,
    text: "Confirm",
  });
});

test("callback data rejects invalid outbound payloads", () => {
  const counter = callbackData("counter", Schema.Struct({ count: Schema.Int }));

  expect(() => counter.pack({ count: 1.5 })).toThrow(CallbackDataInvalid);
});

test("callback data enforces Telegram's UTF-8 byte limit", () => {
  const text = callbackData("x", Schema.String);

  expect(new TextEncoder().encode(text.pack("a".repeat(60))).byteLength).toBe(64);
  expect(() => text.pack("a".repeat(61))).toThrow(CallbackDataTooLong);
  expect(() => text.pack("🙂".repeat(16))).toThrow(CallbackDataTooLong);
});

test("callback data treats malformed, foreign, and stale payloads as no match", () => {
  const choice = callbackData("choice", Schema.Struct({ answer: Schema.String }));

  expect(choice.unpack("other:{\"answer\":\"yes\"}")).toBeUndefined();
  expect(choice.unpack("choice:not-json")).toBeUndefined();
  expect(choice.unpack("choice:{}")).toBeUndefined();
});

test("callback data routes decoded payloads and lets foreign callbacks fall through", async () => {
  const choice = callbackData("choice", Schema.Struct({ answer: Schema.String }));
  const observed: Array<string> = [];
  const fake = FakeBotApi.make({ token });
  const app = Application.make({ httpClient: fake.layer, token });
  const handler = routes(
    on(choice, ({ data }) => Effect.sync(() => {
      observed.push(`choice:${data.answer}`);
    })),
    on(callbackQuery(), ({ callbackQuery: query }) => Effect.sync(() => {
      observed.push(`fallback:${query.data ?? "missing"}`);
    })),
  );

  try {
    await app.run(handler(callbackUpdate(choice.pack({ answer: "yes" }))));
    await app.run(handler(callbackUpdate("foreign:value")));
  } finally {
    await app.close();
  }

  expect(observed).toEqual(["choice:yes", "fallback:foreign:value"]);
});
