import * as Cause from "effect/Cause";
import * as Context from "effect/Context";
import * as Deferred from "effect/Deferred";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Redacted from "effect/Redacted";
import * as Schema from "effect/Schema";
import * as HttpClient from "effect/unstable/http/HttpClient";
import * as HttpClientRequest from "effect/unstable/http/HttpClientRequest";
import type * as HttpClientResponse from "effect/unstable/http/HttpClientResponse";

import { requestBody } from "./internal/Multipart.js";
import {
  makeRequestPolicy,
  retryUnknownOutcome,
  type RequestMetadata,
} from "./internal/RequestPolicy.js";
import { trackBotApiRequest } from "./internal/Telemetry.js";
import type { SendMessageParams } from "./methods.generated.js";
import { User, type User as UserType } from "./types.generated.js";

export { retryUnknownOutcome };

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

const InvalidRequest = Schema.TaggedStruct("InvalidRequest", {
  issues: Schema.Array(Schema.Struct({
    message: Schema.String,
    path: Schema.String,
  })),
});

export class BotApiError extends Schema.TaggedError<BotApiError>()("BotApiError", {
  method: Schema.String,
  reason: Schema.Union([TelegramRejected, InvalidRequest, InvalidResponse, Transport]),
  retrySafe: Schema.Boolean,
}) {
  override get message(): string {
    switch (this.reason._tag) {
      case "InvalidRequest":
        return `${this.method}: request rejected before send: ${this.reason.issues
          .map((issue) => `${issue.path}: ${issue.message}`)
          .join("; ")}`;
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
  readonly defaults?: MessageDefaults;
  readonly rateLimit?: boolean;
  readonly token: Redacted.Redacted<string>;
}

/** Defaults for top-level outgoing message fields accepted by a generated method. */
export type MessageDefaults = Pick<
  SendMessageParams,
  "disableNotification" | "linkPreviewOptions" | "parseMode" | "protectContent"
>;

type BotIdentityState =
  | { readonly _tag: "Empty" }
  | { readonly _tag: "Pending"; readonly request: Deferred.Deferred<UserType, BotApiError> }
  | { readonly _tag: "Ready"; readonly user: UserType };

const defaultApiRoot = "https://api.telegram.org";

function describeError(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

function scrub(description: string, token: string): string {
  return description.replaceAll(token, "<token>");
}

function botIdFromToken(token: string): number {
  const separator = token.indexOf(":");
  const prefix = separator === -1 ? token : token.slice(0, separator);
  if (!/^\d+$/u.test(prefix)) throw new RangeError("Bot token must start with a numeric bot id");
  const botId = Number(prefix);
  if (!Number.isSafeInteger(botId) || botId < 1) {
    throw new RangeError("Bot token must start with a positive safe bot id");
  }
  return botId;
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
    readonly id: number;
    readonly defaults?: MessageDefaults;
    readonly call: <A>(
      method: string,
      params: object,
      metadata: RequestMetadata,
      decode: (value: unknown) => Effect.Effect<A, BotApiError>,
    ) => Effect.Effect<A, BotApiError>;
    readonly callRaw: (
      method: string,
      params?: object,
    ) => Effect.Effect<unknown, BotApiError>;
    readonly downloadRaw: (
      filePath: string,
    ) => Effect.Effect<Uint8Array, BotApiError>;
    /** This bot's identity. Successful lookups are cached; failed lookups may retry. */
    readonly me: Effect.Effect<UserType, BotApiError>;
  }
>()("telly/Bot") {
  static layer(options: BotApiOptions): Layer.Layer<Bot, never, HttpClient.HttpClient> {
    return Layer.effect(
      Bot,
      Effect.gen(function* () {
        const client = yield* HttpClient.HttpClient;
        const token = Redacted.value(options.token);
        const id = botIdFromToken(token);
        const apiRoot = (options.apiRoot ?? defaultApiRoot).replace(/\/+$/u, "");
        const policy = makeRequestPolicy({ rateLimit: options.rateLimit !== false });

        const request = Effect.fn("Bot.request")(function* <A>(
          method: string,
          params: object,
          retrySafe: boolean,
          decode: (value: unknown) => Effect.Effect<A, BotApiError>,
        ) {
          const body = requestBody(params);
          const request = HttpClientRequest.post(
            `${apiRoot}/bot${token}/${encodeURIComponent(method)}`,
          ).pipe(
            body._tag === "Json"
              ? HttpClientRequest.bodyJsonUnsafe(body.body)
              : HttpClientRequest.bodyFormData(body.body),
          );
          return yield* trackBotApiRequest(
            method,
            client.execute(request).pipe(
              Effect.provideService(HttpClient.TracerDisabledWhen, () => true),
              Effect.mapError((error) => transportError(method, error, token, retrySafe)),
              Effect.flatMap((response) => decodeEnvelope(response, method, token, retrySafe)),
              Effect.flatMap((envelope) =>
                envelope.ok
                  ? decode(envelope.result)
                  : Effect.fail(telegramRejected(method, envelope, token))
              ),
            ),
          );
        });

        const call = Effect.fn("Bot.call")(function* <A>(
          method: string,
          params: object,
          metadata: RequestMetadata,
          decode: (value: unknown) => Effect.Effect<A, BotApiError>,
        ) {
          return yield* policy.execute(
            method,
            params,
            metadata,
            () => request(method, params, metadata.retrySafe, decode),
          );
        });

        const callRaw = Effect.fn("Bot.callRaw")(function* (
          method: string,
          params: object = {},
        ) {
          return yield* call(
            method,
            params,
            { rateLimit: "none", retrySafe: false },
            Effect.succeed,
          );
        });

        const downloadRaw = Effect.fn("Bot.downloadRaw")(function* (filePath: string) {
          return yield* policy.execute(
            "downloadFile",
            {},
            { rateLimit: "none", retrySafe: true },
            Effect.fn("Bot.downloadRequest")(function* () {
              const encodedPath = filePath.split("/").map(encodeURIComponent).join("/");
              const fileRequest = HttpClientRequest.get(
                `${apiRoot}/file/bot${token}/${encodedPath}`,
              );
              return yield* trackBotApiRequest(
                "downloadFile",
                client.execute(fileRequest).pipe(
                  Effect.provideService(HttpClient.TracerDisabledWhen, () => true),
                  Effect.mapError((error) => transportError("downloadFile", error, token, true)),
                  Effect.flatMap((response) => {
                    if (response.status === 200) {
                      return response.arrayBuffer.pipe(
                        Effect.map((buffer) => new Uint8Array(buffer)),
                        Effect.mapError((error) =>
                          transportError("downloadFile", error, token, true)
                        ),
                      );
                    }
                    return decodeEnvelope(response, "downloadFile", token, true).pipe(
                      Effect.flatMap((envelope) =>
                        envelope.ok
                          ? Effect.fail(invalidResponse(
                              "downloadFile",
                              `file endpoint returned an unexpected success envelope with status ${response.status}`,
                              token,
                              true,
                            ))
                          : Effect.fail(telegramRejected("downloadFile", envelope, token))
                      ),
                    );
                  }),
                ),
              );
            }),
          );
        });

        const fetchMe = Effect.fn("Bot.me")(function* () {
          return yield* call(
            "getMe",
            {},
            { rateLimit: "none", retrySafe: true },
            (body) => Schema.decodeUnknownEffect(User)(body).pipe(
              Effect.mapError((error) => invalidResponse("getMe", error.message, token, true)),
            ),
          );
        });
        let identityState: BotIdentityState = { _tag: "Empty" };
        const me = Effect.suspend(() => {
          if (identityState._tag === "Ready") return Effect.succeed(identityState.user);
          if (identityState._tag === "Pending") return Deferred.await(identityState.request);
          const pending = Deferred.makeUnsafe<UserType, BotApiError>();
          identityState = { _tag: "Pending", request: pending };
          return fetchMe().pipe(
            Effect.onExit((exit) =>
              Effect.sync(() => {
                if (identityState._tag !== "Pending" || identityState.request !== pending) return;
                identityState = exit._tag === "Success"
                  ? { _tag: "Ready", user: exit.value }
                  : { _tag: "Empty" };
                Deferred.doneUnsafe(
                  pending,
                  exit._tag === "Failure" && Cause.hasInterruptsOnly(exit.cause) ? me : exit,
                );
              })
            ),
          );
        });

        return Bot.of({
          call,
          callRaw,
          ...(options.defaults === undefined ? {} : { defaults: options.defaults }),
          downloadRaw,
          id,
          me,
        });
      }),
    );
  }
}
