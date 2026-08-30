import { expect, test } from "bun:test";
import { Effect, Schema } from "effect";

import { InputFile, MessageOrigin, WebhookInfo } from "../index.ts";

test("InputFile does not claim Telegram file references are upload bodies", async () => {
  const upload = new Blob([new Uint8Array([3, 1, 4])], { type: "application/octet-stream" });

  const decoded = await Effect.runPromise(Schema.decodeUnknownEffect(InputFile)(upload));
  const fileReference = await Effect.runPromiseExit(
    Schema.decodeUnknownEffect(InputFile)("existing-file-id"),
  );

  expect(decoded).toEqual(upload);
  expect(fileReference._tag).toBe("Failure");
});

test("MessageOrigin uses its type field as a discriminator", async () => {
  const origin = await Effect.runPromise(Schema.decodeUnknownEffect(MessageOrigin)({
    chat: { id: -1001, type: "channel" },
    date: 1_700_000_003,
    future_field: "kept",
    message_id: 53,
    type: "channel",
  }));
  const wrongType = await Effect.runPromiseExit(Schema.decodeUnknownEffect(MessageOrigin)({
    chat: { id: -1001, type: "channel" },
    date: 1_700_000_003,
    message_id: 53,
    type: "user",
  }));
  const encoded = await Effect.runPromise(Schema.encodeEffect(MessageOrigin)(origin));
  const invalidPublicValue = await Effect.runPromiseExit(
    Schema.encodeUnknownEffect(MessageOrigin)({
      chat: { id: -1001, type: "channel" },
      date: 1_700_000_003,
      messageId: "not-an-integer",
      type: "channel",
    }),
  );

  expect(origin.type).toBe("channel");
  if (origin.type !== "channel") throw new Error("Expected channel origin");
  expect(origin.chat.id).toBe(-1001);
  expect(origin.messageId).toBe(53);
  expect(origin["future_field"]).toBe("kept");
  expect(encoded).toEqual({
    chat: { id: -1001, type: "channel" },
    date: 1_700_000_003,
    future_field: "kept",
    message_id: 53,
    type: "channel",
  });
  expect(invalidPublicValue._tag).toBe("Failure");
  expect(wrongType._tag).toBe("Failure");
});

test("WebhookInfo keeps the array around its UpdateType enum", async () => {
  const webhook = await Effect.runPromise(Schema.decodeUnknownEffect(WebhookInfo)({
    allowed_updates: ["message", "callback_query"],
    has_custom_certificate: false,
    pending_update_count: 3,
    url: "",
  }));
  const invalid = await Effect.runPromiseExit(Schema.decodeUnknownEffect(WebhookInfo)({
    allowed_updates: ["not_an_update"],
    has_custom_certificate: false,
    pending_update_count: 3,
    url: "",
  }));

  expect(webhook.allowedUpdates).toEqual(["message", "callback_query"]);
  expect(invalid._tag).toBe("Failure");
});
