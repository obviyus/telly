import { Context, Effect, Layer, Redacted, Schema } from "effect";
import {
  HttpClient,
  HttpClientRequest,
  type HttpClientResponse,
} from "effect/unstable/http";

import { requestBody } from "./internal/Multipart.js";

const TelegramResponseParameters = Schema.Struct({
  migrate_to_chat_id: Schema.optionalKey(Schema.Int),
  retry_after: Schema.optionalKey(Schema.Int),
});

const TelegramSuccess = Schema.Struct({
  ok: Schema.Literal(true),
  result: Schema.Unknown,
});

const TelegramFailure = Schema.Struct({
  description: Schema.String,
  error_code: Schema.Int,
  ok: Schema.Literal(false),
  parameters: Schema.optionalKey(TelegramResponseParameters),
});

const TelegramEnvelope = Schema.Union([TelegramSuccess, TelegramFailure]);

const TelegramRejected = Schema.TaggedStruct("TelegramRejected", {
  description: Schema.String,
  errorCode: Schema.Int,
  migrateToChatId: Schema.optionalKey(Schema.Int),
  retryAfter: Schema.optionalKey(Schema.Int),
});

const InvalidResponse = Schema.TaggedStruct("InvalidResponse", {
  description: Schema.String,
});

const Transport = Schema.TaggedStruct("Transport", {
  description: Schema.String,
});

export class BotApiError extends Schema.TaggedError<BotApiError>()("BotApiError", {
  method: Schema.String,
  reason: Schema.Union([TelegramRejected, InvalidResponse, Transport]),
  retrySafe: Schema.Boolean,
}) {
  override get message(): string {
    switch (this.reason._tag) {
      case "TelegramRejected": {
        const retry = this.reason.retryAfter === undefined
          ? ""
          : ` (retry after ${this.reason.retryAfter}s)`;
        const migration = this.reason.migrateToChatId === undefined
          ? ""
          : ` (chat migrated to ${this.reason.migrateToChatId})`;
        return `${this.method}: Telegram rejected the call: ${this.reason.errorCode} ${this.reason.description}${retry}${migration}`;
      }
      case "InvalidResponse":
        return `${this.method}: Telegram returned an invalid response: ${this.reason.description}`;
      case "Transport":
        return `${this.method}: no Telegram response: ${this.reason.description}`;
    }
  }
}

export interface BotApiOptions {
  readonly apiRoot?: string;
  readonly token: Redacted.Redacted<string>;
}

const defaultApiRoot = "https://api.telegram.org";

function describeError(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

function scrub(description: string, token: string): string {
  return description.replaceAll(token, "<token>");
}

function invalidResponse(
  method: string,
  description: string,
  token: string,
  retrySafe: boolean,
) {
  return new BotApiError({
    method,
    reason: {
      _tag: "InvalidResponse",
      description: scrub(description, token),
    },
    retrySafe,
  });
}

function transportError(method: string, error: unknown, token: string, retrySafe: boolean) {
  return new BotApiError({
    method,
    reason: {
      _tag: "Transport",
      description: scrub(describeError(error), token),
    },
    retrySafe,
  });
}

function telegramRejected(
  method: string,
  failure: typeof TelegramFailure.Type,
  token: string,
) {
  return new BotApiError({
    method,
    reason: {
      _tag: "TelegramRejected",
      description: scrub(failure.description, token),
      errorCode: failure.error_code,
      ...(failure.parameters?.migrate_to_chat_id === undefined
        ? {}
        : { migrateToChatId: failure.parameters.migrate_to_chat_id }),
      ...(failure.parameters?.retry_after === undefined
        ? {}
        : { retryAfter: failure.parameters.retry_after }),
    },
    retrySafe: true,
  });
}

function decodeEnvelope(
  response: HttpClientResponse.HttpClientResponse,
  method: string,
  token: string,
  retrySafe: boolean,
) {
  return response.json.pipe(
    Effect.mapError((error) => invalidResponse(method, describeError(error), token, retrySafe)),
    Effect.flatMap((body) =>
      Schema.decodeUnknownEffect(TelegramEnvelope)(body).pipe(
        Effect.mapError((error) => invalidResponse(method, error.message, token, retrySafe)),
      ),
    ),
  );
}

/** Service that sends Bot API calls for one bot token. */
export class Bot extends Context.Service<
  Bot,
  {
    readonly callRaw: (
      method: string,
      params?: object,
    ) => Effect.Effect<unknown, BotApiError>;
    readonly downloadRaw: (
      filePath: string,
    ) => Effect.Effect<Uint8Array, BotApiError>;
  }
>()("telly/Bot") {
  static layer(options: BotApiOptions): Layer.Layer<Bot, never, HttpClient.HttpClient> {
    return Layer.effect(
      Bot,
      Effect.gen(function* () {
        const client = yield* HttpClient.HttpClient;
        const token = Redacted.value(options.token);
        const apiRoot = (options.apiRoot ?? defaultApiRoot).replace(/\/+$/u, "");

        const callRaw = Effect.fn("Bot.callRaw")(function* (
          method: string,
          params: object = {},
        ) {
          yield* Effect.annotateCurrentSpan({ method });
          const body = requestBody(params);
          const request = HttpClientRequest.post(
            `${apiRoot}/bot${token}/${encodeURIComponent(method)}`,
          ).pipe(
            body._tag === "Json"
              ? HttpClientRequest.bodyJsonUnsafe(body.body)
              : HttpClientRequest.bodyFormData(body.body),
          );
          const response = yield* client.execute(request).pipe(
            Effect.provideService(HttpClient.TracerDisabledWhen, () => true),
            Effect.mapError((error) => transportError(method, error, token, false)),
          );
          const envelope = yield* decodeEnvelope(response, method, token, false);
          if (!envelope.ok) {
            return yield* telegramRejected(method, envelope, token);
          }
          return envelope.result;
        });

        const downloadRaw = Effect.fn("Bot.downloadRaw")(function* (filePath: string) {
          yield* Effect.annotateCurrentSpan({ method: "downloadFile" });
          const encodedPath = filePath.split("/").map(encodeURIComponent).join("/");
          const request = HttpClientRequest.get(`${apiRoot}/file/bot${token}/${encodedPath}`);
          const response = yield* client.execute(request).pipe(
            Effect.provideService(HttpClient.TracerDisabledWhen, () => true),
            Effect.mapError((error) => transportError("downloadFile", error, token, true)),
          );
          if (response.status === 200) {
            const buffer = yield* response.arrayBuffer.pipe(
              Effect.mapError((error) => transportError("downloadFile", error, token, true)),
            );
            return new Uint8Array(buffer);
          }
          const envelope = yield* decodeEnvelope(response, "downloadFile", token, true);
          if (!envelope.ok) {
            return yield* telegramRejected("downloadFile", envelope, token);
          }
          return yield* invalidResponse(
            "downloadFile",
            `file endpoint returned an unexpected success envelope with status ${response.status}`,
            token,
            true,
          );
        });

        return Bot.of({ callRaw, downloadRaw });
      }),
    );
  }
}
