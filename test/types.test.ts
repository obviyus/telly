import { expect, test } from "bun:test";
import { Effect, Schema } from "effect";

import { InputFile } from "../index.ts";

test("InputFile does not claim Telegram file references are upload bodies", async () => {
  const upload = { bytes: new Uint8Array([3, 1, 4]) };

  const decoded = await Effect.runPromise(Schema.decodeUnknownEffect(InputFile)(upload));
  const fileReference = await Effect.runPromiseExit(
    Schema.decodeUnknownEffect(InputFile)("existing-file-id"),
  );

  expect(decoded).toEqual(upload);
  expect(fileReference._tag).toBe("Failure");
});
