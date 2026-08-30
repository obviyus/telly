import { describe, expect, test } from "bun:test";
import { Effect, Layer, Predicate, Redacted } from "effect";

import { Bot, sendMediaGroup, sendPhoto, setMyProfilePhoto } from "../index.ts";
import { FakeBotApi, FakeBotApiReply } from "../testing.ts";

const token = "123456:multipart-tests";

function botLayer(fake: FakeBotApi) {
  return Bot.layer({ token: Redacted.make(token) }).pipe(Layer.provide(fake.layer));
}

function message(messageId: number) {
  return {
    chat: { id: 7, type: "private" },
    date: 1_700_000_000,
    message_id: messageId,
  };
}

function requestParams(fake: FakeBotApi) {
  const params = fake.requests[0]?.params;
  if (!Predicate.isObject(params)) throw new Error("Expected multipart parameters");
  return params;
}

describe("multipart Bot API calls", () => {
  test("sendPhoto uploads a File with its name and content type", async () => {
    const fake = FakeBotApi.make({
      replies: [FakeBotApiReply.ok(message(101))],
      token,
    });
    const photo = new File([new Uint8Array([137, 80, 78, 71])], "dot.png", {
      type: "image/png",
    });

    const sent = await Effect.runPromise(
      sendPhoto({ caption: "tiny dot", chatId: 7, photo }).pipe(
        Effect.provide(botLayer(fake)),
      ),
    );

    expect(sent.messageId).toBe(101);
    expect(fake.requests).toEqual([{
      contentType: "multipart/form-data",
      files: {
        photo: { fileName: "dot.png", size: 4, type: "image/png" },
      },
      method: "sendPhoto",
      params: { caption: "tiny dot", chat_id: "7" },
      tracingDisabled: true,
    }]);
  });

  test("sendPhoto keeps the JSON path for a Telegram file id", async () => {
    const fake = FakeBotApi.make({
      replies: [FakeBotApiReply.ok(message(103))],
      token,
    });

    await Effect.runPromise(
      sendPhoto({ chatId: 11, photo: "existing-file-id" }).pipe(
        Effect.provide(botLayer(fake)),
      ),
    );

    expect(fake.requests[0]).toEqual({
      contentType: "application/json",
      method: "sendPhoto",
      params: { chat_id: 11, photo: "existing-file-id" },
      tracingDisabled: true,
    });
  });

  test("multipart JSON fields keep Telegram wire keys", async () => {
    const fake = FakeBotApi.make({
      replies: [FakeBotApiReply.ok(message(107))],
      token,
    });

    await Effect.runPromise(
      sendPhoto({
        chatId: 13,
        photo: new Blob([new Uint8Array([1, 3, 7])], { type: "image/png" }),
        replyMarkup: {
          inlineKeyboard: [[{ callbackData: "next:13", text: "Next" }]],
        },
      }).pipe(Effect.provide(botLayer(fake))),
    );

    expect(JSON.parse(String(requestParams(fake)["reply_markup"]))).toEqual({
      inline_keyboard: [[{ callback_data: "next:13", text: "Next" }]],
    });
    expect(fake.requests[0]?.files).toEqual({
      photo: { fileName: "photo", size: 3, type: "image/png" },
    });
  });

  test("sendMediaGroup uses one attachment for the same nested Blob", async () => {
    const fake = FakeBotApi.make({
      replies: [FakeBotApiReply.ok([message(109), message(110)])],
      token,
    });
    const blob = new Blob([new Uint8Array([2, 5, 8])], { type: "image/jpeg" });

    const messages = await Effect.runPromise(
      sendMediaGroup({
        chatId: 19,
        media: [
          { media: blob, thumbnail: blob, type: "document" },
          { media: "existing-document", type: "document" },
        ],
      }).pipe(Effect.provide(botLayer(fake))),
    );

    expect(messages.map((item) => item.messageId)).toEqual([109, 110]);
    expect(JSON.parse(String(requestParams(fake)["media"]))).toEqual([
      { media: "attach://file0", thumbnail: "attach://file0", type: "document" },
      { media: "existing-document", type: "document" },
    ]);
    expect(requestParams(fake)["chat_id"]).toBe("19");
    expect(fake.requests[0]?.files).toEqual({
      file0: { fileName: "file0", size: 3, type: "image/jpeg" },
    });
  });

  test("multipart transport failures redact the bot token", async () => {
    const fake = FakeBotApi.make({
      replies: [FakeBotApiReply.transportFailure(`failed POST /bot${token}/sendPhoto`)],
      token,
    });

    const error = await Effect.runPromise(Effect.flip(
      sendPhoto({ chatId: 17, photo: new Blob(["photo"]) }).pipe(
        Effect.provide(botLayer(fake)),
      ),
    ));

    expect(error.reason._tag).toBe("Transport");
    expect(error.retrySafe).toBe(false);
    expect(String(error)).not.toContain(token);
    expect(JSON.stringify(error)).not.toContain(token);
  });

  test("nested uploads transform inside an unchanged top-level key", async () => {
    const fake = FakeBotApi.make({
      replies: [FakeBotApiReply.ok(true)],
      token,
    });

    const result = await Effect.runPromise(
      setMyProfilePhoto({
        photo: {
          animation: new File([new Uint8Array([2, 5, 8])], "profile.mp4", {
            type: "video/mp4",
          }),
          mainFrameTimestamp: 2.5,
          type: "animated",
        },
      }).pipe(Effect.provide(botLayer(fake))),
    );

    expect(result).toBe(true);
    expect(JSON.parse(String(requestParams(fake)["photo"]))).toEqual({
      animation: "attach://file0",
      main_frame_timestamp: 2.5,
      type: "animated",
    });
    expect(fake.requests[0]?.files).toEqual({
      file0: { fileName: "profile.mp4", size: 3, type: "video/mp4" },
    });
  });
});
