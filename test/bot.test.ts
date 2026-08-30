import { describe, expect, test } from "bun:test";
import { Effect, Layer, Predicate, Redacted, Tracer } from "effect";

import { Bot, sendMessage } from "../index.ts";
import { FakeBotApi, FakeBotApiReply } from "../testing.ts";

const token = "123456:fake-token-for-tests";

function botLayer(fake: FakeBotApi) {
  return Bot.layer({ token: Redacted.make(token) }).pipe(Layer.provide(fake.layer));
}

describe("sendMessage", () => {
  test("sends Telegram wire parameters and decodes the Message", async () => {
    const fake = FakeBotApi.make({ token });

    const message = await Effect.runPromise(
      sendMessage({ chat_id: 7, text: "sprocket" }).pipe(Effect.provide(botLayer(fake))),
    );

    expect(message.message_id).toBe(41);
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
        error_code: 429,
        parameters: { retry_after: 9 },
      })],
      token,
    });

    const error = await Effect.runPromise(Effect.flip(
      sendMessage({ chat_id: 11, text: "ratchet" }).pipe(Effect.provide(botLayer(fake))),
    ));

    expect(error.reason).toEqual({
      _tag: "TelegramRejected",
      description: "Too Many Requests",
      error_code: 429,
      retry_after: 9,
    });
    expect(error.message).toBe(
      "sendMessage: Telegram rejected the call: 429 Too Many Requests (retry after 9s)",
    );
    expect(error.retry_safe).toBe(true);
    expect(fake.requests).toHaveLength(1);
  });

  test("omits optional parameters set to undefined", async () => {
    const fake = FakeBotApi.make({ token });

    await Effect.runPromise(
      sendMessage({
        chat_id: 19,
        parse_mode: undefined,
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
      sendMessage({ chat_id: 13, text: "cog" }).pipe(
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
    expect(error.retry_safe).toBe(false);
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
      sendMessage({ chat_id: 17, text: "bearing" }).pipe(Effect.provide(botLayer(fake))),
    ));

    expect(error.reason._tag).toBe("InvalidResponse");
    expect(error.message).toContain("sendMessage: Telegram returned an invalid response:");
    expect(error.retry_safe).toBe(false);
  });

  test("reports the field path for an invalid method result", async () => {
    const fake = FakeBotApi.make({
      replies: [FakeBotApiReply.ok({ message_id: token })],
      token,
    });

    const error = await Effect.runPromise(Effect.flip(
      sendMessage({ chat_id: 23, text: "pinion" }).pipe(Effect.provide(botLayer(fake))),
    ));

    expect(error.reason._tag).toBe("InvalidResponse");
    expect(error.reason.description).toContain("[\"message_id\"]");
    expect(error.message).not.toContain(token);
  });

  test("keeps the raw call as a separate day-zero path", async () => {
    const fake = FakeBotApi.make({
      replies: [FakeBotApiReply.ok({ first_name: "Telly", id: 23, is_bot: true })],
      token,
    });
    const program = Effect.gen(function* () {
      const bot = yield* Bot;
      return yield* bot.callRaw("getMe");
    }).pipe(Effect.provide(botLayer(fake)));

    const result = await Effect.runPromise(program);

    expect(Predicate.isObject(result) && result["first_name"]).toBe("Telly");
  });
});
