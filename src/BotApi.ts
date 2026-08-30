import { Context, Effect, Layer, Redacted, Schema } from "effect";
import {
  HttpClient,
  HttpClientRequest,
  type HttpClientResponse,
} from "effect/unstable/http";

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
  error_code: Schema.Int,
  migrate_to_chat_id: Schema.optionalKey(Schema.Int),
  retry_after: Schema.optionalKey(Schema.Int),
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
  retry_safe: Schema.Boolean,
}) {
  override get message(): string {
    switch (this.reason._tag) {
      case "TelegramRejected": {
        const retry = this.reason.retry_after === undefined
          ? ""
          : ` (retry after ${this.reason.retry_after}s)`;
        const migration = this.reason.migrate_to_chat_id === undefined
          ? ""
          : ` (chat migrated to ${this.reason.migrate_to_chat_id})`;
        return `${this.method}: Telegram rejected the call: ${this.reason.error_code} ${this.reason.description}${retry}${migration}`;
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

function invalidResponse(method: string, description: string, token: string) {
  return new BotApiError({
    method,
    reason: {
      _tag: "InvalidResponse",
      description: scrub(description, token),
    },
    retry_safe: false,
  });
}

function transportError(method: string, error: unknown, token: string) {
  return new BotApiError({
    method,
    reason: {
      _tag: "Transport",
      description: scrub(describeError(error), token),
    },
    retry_safe: false,
  });
}

function decodeEnvelope(response: HttpClientResponse.HttpClientResponse, method: string, token: string) {
  return response.json.pipe(
    Effect.mapError((error) => invalidResponse(method, describeError(error), token)),
    Effect.flatMap((body) =>
      Schema.decodeUnknownEffect(TelegramEnvelope)(body).pipe(
        Effect.mapError((error) => invalidResponse(method, error.message, token)),
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
          const request = HttpClientRequest.post(
            `${apiRoot}/bot${token}/${encodeURIComponent(method)}`,
          ).pipe(HttpClientRequest.bodyJsonUnsafe(params));
          const response = yield* client.execute(request).pipe(
            Effect.provideService(HttpClient.TracerDisabledWhen, () => true),
            Effect.mapError((error) => transportError(method, error, token)),
          );
          const envelope = yield* decodeEnvelope(response, method, token);
          if (!envelope.ok) {
            return yield* new BotApiError({
              method,
              reason: {
                _tag: "TelegramRejected",
                description: scrub(envelope.description, token),
                error_code: envelope.error_code,
                ...(envelope.parameters?.migrate_to_chat_id === undefined
                  ? {}
                  : { migrate_to_chat_id: envelope.parameters.migrate_to_chat_id }),
                ...(envelope.parameters?.retry_after === undefined
                  ? {}
                  : { retry_after: envelope.parameters.retry_after }),
              },
              retry_safe: true,
            });
          }
          return envelope.result;
        });

        return Bot.of({ callRaw });
      }),
    );
  }
}
