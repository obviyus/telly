import { describe, expect, test } from "bun:test";
import { Effect, Fiber, Layer, Redacted, Tracer } from "effect";

import { Bot, downloadFile } from "../index.ts";
import { FakeBotApi, FakeBotApiReply } from "../testing.ts";

const token = "123456:file-tests";

function botLayer(fake: FakeBotApi) {
  return Bot.layer({ token: Redacted.make(token) }).pipe(Layer.provide(fake.layer));
}

describe("downloadFile", () => {
  test("resolves the path and returns the file bytes", async () => {
    const fake = FakeBotApi.make({
      replies: [
        FakeBotApiReply.ok({
          file_id: "file-73",
          file_path: "documents/report 73.bin",
          file_size: 3,
          file_unique_id: "unique-73",
        }),
        FakeBotApiReply.file(new Uint8Array([3, 1, 4])),
      ],
      token,
    });

    const bytes = await Effect.runPromise(
      downloadFile({ fileId: "file-73" }).pipe(Effect.provide(botLayer(fake))),
    );

    expect([...bytes]).toEqual([3, 1, 4]);
    expect(fake.requests).toEqual([
      {
        contentType: "application/json",
        method: "getFile",
        params: { file_id: "file-73" },
        tracingDisabled: true,
      },
      {
        filePath: "documents/report 73.bin",
        method: "downloadFile",
        tracingDisabled: true,
      },
    ]);
  });

  test("rejects a getFile result without a path", async () => {
    const fake = FakeBotApi.make({
      replies: [FakeBotApiReply.ok({
        file_id: "file-79",
        file_unique_id: "unique-79",
      })],
      token,
    });

    const error = await Effect.runPromise(Effect.flip(
      downloadFile({ fileId: "file-79" }).pipe(Effect.provide(botLayer(fake))),
    ));

    expect(error).toMatchObject({
      method: "downloadFile",
      reason: {
        _tag: "InvalidResponse",
        description: "getFile returned no filePath",
      },
      retrySafe: true,
    });
    expect(fake.requests).toHaveLength(1);
  });

  test("returns a Telegram rejection from the file route", async () => {
    const fake = FakeBotApi.make({
      replies: [
        FakeBotApiReply.ok({
          file_id: "file-83",
          file_path: "documents/missing.bin",
          file_unique_id: "unique-83",
        }),
        FakeBotApiReply.reject({ description: "Not Found", errorCode: 404 }),
      ],
      token,
    });

    const error = await Effect.runPromise(Effect.flip(
      downloadFile({ fileId: "file-83" }).pipe(Effect.provide(botLayer(fake))),
    ));

    expect(error).toMatchObject({
      method: "downloadFile",
      reason: {
        _tag: "TelegramRejected",
        description: "Not Found",
        errorCode: 404,
      },
      retrySafe: true,
    });
  });

  test("redacts a transport failure from the file route", async () => {
    const spans: Array<Tracer.NativeSpan> = [];
    const tracer = Tracer.make({
      span(options) {
        const span = new Tracer.NativeSpan(options);
        spans.push(span);
        return span;
      },
    });
    const fake = FakeBotApi.make({
      replies: [
        FakeBotApiReply.ok({
          file_id: "file-89",
          file_path: "documents/private.bin",
          file_unique_id: "unique-89",
        }),
        FakeBotApiReply.transportFailure(`failed GET /file/bot${token}/documents/private.bin`),
      ],
      token,
    });

    const error = await Effect.runPromise(Effect.flip(
      downloadFile({ fileId: "file-89" }).pipe(
        Effect.provide(botLayer(fake)),
        Effect.provideService(Tracer.Tracer, tracer),
      ),
    ));
    const serializedSpans = JSON.stringify(spans.map((span) => ({
      attributes: Object.fromEntries(span.attributes),
      exit: span.status._tag === "Ended" ? String(span.status.exit) : undefined,
      name: span.name,
    })));

    expect(error.reason._tag).toBe("Transport");
    expect(error.retrySafe).toBe(true);
    expect(String(error)).not.toContain(token);
    expect(JSON.stringify(error)).not.toContain(token);
    expect(serializedSpans).not.toContain(token);
  });

  test("interrupts an in-flight file request", async () => {
    const fake = FakeBotApi.make({
      replies: [
        FakeBotApiReply.ok({
          file_id: "file-97",
          file_path: "documents/slow.bin",
          file_unique_id: "unique-97",
        }),
        FakeBotApiReply.hang(),
      ],
      token,
    });
    const fiber = Effect.runFork(
      downloadFile({ fileId: "file-97" }).pipe(Effect.provide(botLayer(fake))),
    );

    await fake.whenFileRequested;
    await Effect.runPromise(Fiber.interrupt(fiber));

    expect(fake.abortedFilePaths).toEqual(["documents/slow.bin"]);
  });
});
