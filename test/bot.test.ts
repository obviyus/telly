import { describe, expect, test } from "bun:test";
import { Effect, Layer, Predicate, Redacted, Tracer } from "effect";

import {
  Bot,
  getChatMenuButton,
  getChatMemberCount,
  getMe,
  getStarTransactions,
  getUserProfilePhotos,
  sendMessage,
} from "../index.ts";
import { FakeBotApi, FakeBotApiReply } from "../testing.ts";

const token = "123456:fake-token-for-tests";

function botLayer(fake: FakeBotApi) {
  return Bot.layer({ token: Redacted.make(token) }).pipe(Layer.provide(fake.layer));
}

describe("sendMessage", () => {
  test("sends Telegram wire parameters and decodes the Message", async () => {
    const fake = FakeBotApi.make({ token });

    const message = await Effect.runPromise(
      sendMessage({ chatId: 7, text: "sprocket" }).pipe(Effect.provide(botLayer(fake))),
    );

    expect(message.messageId).toBe(41);
    expect(message.chat.id).toBe(7);
    expect(message.text).toBe("sprocket");
    expect(message["future_field"]).toBe("kept");
    expect(fake.requests).toEqual([
      {
        contentType: "application/json",
        method: "sendMessage",
        params: { chat_id: 7, text: "sprocket" },
        tracingDisabled: true,
      },
    ]);
  });

  test("returns Telegram rejection details without retrying", async () => {
    const fake = FakeBotApi.make({
      replies: [FakeBotApiReply.reject({
        description: "Too Many Requests",
        errorCode: 429,
        parameters: { retryAfter: 9 },
      })],
      token,
    });

    const error = await Effect.runPromise(Effect.flip(
      sendMessage({ chatId: 11, text: "ratchet" }).pipe(Effect.provide(botLayer(fake))),
    ));

    expect(error.reason).toEqual({
      _tag: "TelegramRejected",
      description: "Too Many Requests",
      errorCode: 429,
      retryAfter: 9,
    });
    expect(error.message).toBe(
      "sendMessage: Telegram rejected the call: 429 Too Many Requests (retry after 9s)",
    );
    expect(error.retrySafe).toBe(true);
    expect(fake.requests).toHaveLength(1);
  });

  test("omits optional parameters set to undefined", async () => {
    const fake = FakeBotApi.make({ token });

    await Effect.runPromise(
      sendMessage({
        chatId: 19,
        parseMode: undefined,
        text: "flywheel",
      }).pipe(Effect.provide(botLayer(fake))),
    );

    expect(fake.requests[0]?.params).toEqual({ chat_id: 19, text: "flywheel" });
  });

  test("marks a transport failure as unsafe to retry", async () => {
    const spans: Array<Tracer.NativeSpan> = [];
    const tracer = Tracer.make({
      span(options) {
        const span = new Tracer.NativeSpan(options);
        spans.push(span);
        return span;
      },
    });
    const fake = FakeBotApi.make({
      replies: [FakeBotApiReply.transportFailure(`failed POST /bot${token}/sendMessage`)],
      token,
    });

    const error = await Effect.runPromise(Effect.flip(
      sendMessage({ chatId: 13, text: "cog" }).pipe(
        Effect.provide(botLayer(fake)),
        Effect.provideService(Tracer.Tracer, tracer),
      ),
    ));

    expect(error.reason).toEqual({
      _tag: "Transport",
      description: "Transport: failed POST /bot<token>/sendMessage (POST https://api.telegram.org/bot<token>/sendMessage)",
    });
    expect(error.message).toBe(
      "sendMessage: no Telegram response: Transport: failed POST /bot<token>/sendMessage (POST https://api.telegram.org/bot<token>/sendMessage)",
    );
    expect(error.retrySafe).toBe(false);
    expect(String(error)).toContain("BotApiError: sendMessage: no Telegram response:");
    expect(String(error)).not.toContain(token);
    expect(JSON.stringify(error)).not.toContain(token);
    expect(JSON.stringify(
      spans.map((span) => ({
        attributes: Object.fromEntries(span.attributes),
        exit: span.status._tag === "Ended" ? String(span.status.exit) : undefined,
        name: span.name,
      })),
    )).not.toContain(token);
    expect(fake.requests).toHaveLength(1);
  });

  test("returns InvalidResponse for a non-Telegram response", async () => {
    const fake = FakeBotApi.make({
      replies: [FakeBotApiReply.body(502, "<html>bad gateway</html>")],
      token,
    });

    const error = await Effect.runPromise(Effect.flip(
      sendMessage({ chatId: 17, text: "bearing" }).pipe(Effect.provide(botLayer(fake))),
    ));

    expect(error.reason._tag).toBe("InvalidResponse");
    expect(error.message).toContain("sendMessage: Telegram returned an invalid response:");
    expect(error.retrySafe).toBe(false);
  });

  test("reports the field path for an invalid method result", async () => {
    const fake = FakeBotApi.make({
      replies: [FakeBotApiReply.ok({ message_id: token })],
      token,
    });

    const error = await Effect.runPromise(Effect.flip(
      sendMessage({ chatId: 23, text: "pinion" }).pipe(Effect.provide(botLayer(fake))),
    ));

    expect(error.reason._tag).toBe("InvalidResponse");
    expect(error.reason.description).toContain("[\"message_id\"]");
    expect(error.message).not.toContain(token);
  });

  test("keeps the raw call as a separate day-zero path", async () => {
    const fake = FakeBotApi.make({ token });
    const program = Effect.gen(function* () {
      const bot = yield* Bot;
      return yield* bot.callRaw("sendMessage", { chat_id: 31, text: "raw-call" });
    }).pipe(Effect.provide(botLayer(fake)));

    const result = await Effect.runPromise(program);

    expect(Predicate.isObject(result) && result["message_id"]).toBe(41);
    expect(fake.requests[0]?.params).toEqual({ chat_id: 31, text: "raw-call" });
  });
});

describe("getMe", () => {
  test("sends an empty Telegram object and decodes the User", async () => {
    const fake = FakeBotApi.make({
      replies: [FakeBotApiReply.ok({
        first_name: "Telly Test",
        future_field: "kept",
        id: 73,
        is_bot: true,
        username: "telly_test_bot",
      })],
      token,
    });

    const user = await Effect.runPromise(getMe().pipe(Effect.provide(botLayer(fake))));

    expect(user.id).toBe(73);
    expect(user.isBot).toBe(true);
    expect(user.firstName).toBe("Telly Test");
    expect(user["future_field"]).toBe("kept");
    expect(fake.requests).toEqual([
      {
        contentType: "application/json",
        method: "getMe",
        params: {},
        tracingDisabled: true,
      },
    ]);
  });

  test("marks a transport failure as safe to retry", async () => {
    const fake = FakeBotApi.make({
      replies: [FakeBotApiReply.transportFailure("connection reset")],
      token,
    });

    const error = await Effect.runPromise(
      Effect.flip(getMe().pipe(Effect.provide(botLayer(fake)))),
    );

    expect(error.reason._tag).toBe("Transport");
    expect(error.retrySafe).toBe(true);
  });
});

describe("read-only methods with optional fields", () => {
  test("sends an empty object and decodes a discriminated union", async () => {
    const fake = FakeBotApi.make({
      replies: [FakeBotApiReply.ok({ type: "default" })],
      token,
    });

    const menuButton = await Effect.runPromise(
      getChatMenuButton({}).pipe(Effect.provide(botLayer(fake))),
    );

    expect(menuButton).toEqual({ type: "default" });
    expect(fake.requests[0]?.params).toEqual({});
  });

  test("sends optional fields that keep their Telegram names", async () => {
    const fake = FakeBotApi.make({
      replies: [FakeBotApiReply.ok({ transactions: [] })],
      token,
    });

    const transactions = await Effect.runPromise(
      getStarTransactions({ limit: 5, offset: 3 }).pipe(Effect.provide(botLayer(fake))),
    );

    expect(transactions.transactions).toEqual([]);
    expect(fake.requests[0]?.params).toEqual({ limit: 5, offset: 3 });
  });
});

test("getChatMemberCount sends the required chat identifier", async () => {
  const fake = FakeBotApi.make({
    replies: [FakeBotApiReply.ok(17)],
    token,
  });

  const count = await Effect.runPromise(
    getChatMemberCount({ chatId: -10073 }).pipe(Effect.provide(botLayer(fake))),
  );

  expect(count).toBe(17);
  expect(fake.requests[0]?.params).toEqual({ chat_id: -10073 });
});

test("getUserProfilePhotos decodes its nested result", async () => {
  const fake = FakeBotApi.make({
    replies: [FakeBotApiReply.ok({ photos: [], total_count: 0 })],
    token,
  });

  const photos = await Effect.runPromise(
    getUserProfilePhotos({ limit: 4, offset: 2, userId: 73 }).pipe(
      Effect.provide(botLayer(fake)),
    ),
  );

  expect(photos.totalCount).toBe(0);
  expect(photos.photos).toEqual([]);
  expect(fake.requests[0]?.params).toEqual({ limit: 4, offset: 2, user_id: 73 });
});
