import { expect, test } from "bun:test";
import { Effect, Schema } from "effect";

import { InputFile, MessageOrigin } from "../index.ts";

test("InputFile does not claim Telegram file references are upload bodies", async () => {
  const upload = { bytes: new Uint8Array([3, 1, 4]) };

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
    message_id: 53,
    type: "channel",
  }));
  const wrongType = await Effect.runPromiseExit(Schema.decodeUnknownEffect(MessageOrigin)({
    chat: { id: -1001, type: "channel" },
    date: 1_700_000_003,
    message_id: 53,
    type: "user",
  }));

  expect(origin.type).toBe("channel");
  if (origin.type !== "channel") throw new Error("Expected channel origin");
  expect(origin.chat.id).toBe(-1001);
  expect(wrongType._tag).toBe("Failure");
});
