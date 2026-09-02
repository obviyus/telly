import * as Deferred from "effect/Deferred";
import * as Duration from "effect/Duration";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Option from "effect/Option";
import * as Predicate from "effect/Predicate";
import * as HttpClient from "effect/unstable/http/HttpClient";
import * as HttpClientError from "effect/unstable/http/HttpClientError";
import type * as HttpClientRequest from "effect/unstable/http/HttpClientRequest";
import * as HttpClientResponse from "effect/unstable/http/HttpClientResponse";

export interface FakeBotApiCall {
  readonly contentType?: string;
  readonly filePath?: string;
  readonly files?: Readonly<Record<string, FakeBotApiFile>>;
  readonly method: string;
  readonly params?: unknown;
  readonly tracingDisabled: boolean;
}

export interface FakeBotApiFile {
  readonly fileName: string;
  readonly size: number;
  readonly type: string;
}

export interface FakeUpdate extends Readonly<Record<string, unknown>> {
  readonly update_id: number;
}

export interface FakeBotApiResponseParameters {
  readonly migrateToChatId?: number;
  readonly retryAfter?: number;
}

export type FakeBotApiReply =
  | { readonly _tag: "Ok"; readonly result: unknown }
  | {
      readonly _tag: "Reject";
      readonly description: string;
      readonly errorCode: number;
      readonly parameters?: FakeBotApiResponseParameters;
    }
  | { readonly _tag: "TransportFailure"; readonly description: string }
  | { readonly _tag: "Body"; readonly body: string; readonly status: number }
  | { readonly _tag: "File"; readonly bytes: Uint8Array }
  | { readonly _tag: "Hang" };

export const FakeBotApiReply = {
  body: (status: number, body: string): FakeBotApiReply => ({ _tag: "Body", body, status }),
  file: (bytes: Uint8Array): FakeBotApiReply => ({ _tag: "File", bytes }),
  hang: (): FakeBotApiReply => ({ _tag: "Hang" }),
  ok: (result: unknown): FakeBotApiReply => ({ _tag: "Ok", result }),
  reject: (options: {
    readonly description: string;
    readonly errorCode: number;
    readonly parameters?: FakeBotApiResponseParameters;
  }): FakeBotApiReply => ({
    _tag: "Reject",
    ...options,
  }),
  transportFailure: (description: string): FakeBotApiReply => ({
    _tag: "TransportFailure",
    description,
  }),
};

export interface FakeBotApiOptions {
  readonly nextMessageId?: number;
  readonly replies?: ReadonlyArray<FakeBotApiReply>;
  /** Enables a deterministic approximation of Telegram's documented message limits. */
  readonly serverRateLimit?: boolean;
  readonly token: string;
  readonly updates?: ReadonlyArray<FakeUpdate>;
  readonly webhookUrl?: string;
}

export interface FakeBotApi {
  readonly abortedFilePaths: ReadonlyArray<string>;
  readonly abortedMethods: ReadonlyArray<string>;
  readonly enqueue: (reply: FakeBotApiReply) => void;
  readonly layer: Layer.Layer<HttpClient.HttpClient>;
  readonly pushUpdate: (update: FakeUpdate) => void;
  readonly requests: ReadonlyArray<FakeBotApiCall>;
  readonly whenCalled: (method: string, ordinal?: number) => Promise<FakeBotApiCall>;
}

type PollSignal = "conflict" | "wake";

interface ParkedPoll {
  readonly signal: Deferred.Deferred<PollSignal>;
}

function assertUpdates(updates: ReadonlyArray<FakeUpdate>): Array<FakeUpdate> {
  const result: Array<FakeUpdate> = [];
  let previous = 0;
  for (const update of updates) {
    assertNextUpdate(update, previous);
    result.push(update);
    previous = update.update_id;
  }
  return result;
}

function assertNextUpdate(update: FakeUpdate, previous: number): void {
  if (!Number.isSafeInteger(update.update_id) || update.update_id <= previous) {
    throw new RangeError("Fake Telegram updates require ascending positive update_id values");
  }
}

function integerField(params: object, name: string): number | undefined {
  const value = Reflect.get(params, name);
  return typeof value === "number" && Number.isInteger(value) ? value : undefined;
}

function stringField(params: object, name: string): string | undefined {
  const value = Reflect.get(params, name);
  return typeof value === "string" ? value : undefined;
}

function okResponse(request: HttpClientRequest.HttpClientRequest, result: unknown) {
  return response(request, 200, JSON.stringify({ ok: true, result }));
}

function bodyDetails(body: HttpClientRequest.HttpClientRequest["body"]): {
  readonly contentType?: string;
  readonly files?: Readonly<Record<string, FakeBotApiFile>>;
  readonly params: unknown;
} {
  if (body._tag === "FormData") {
    const files: Record<string, FakeBotApiFile> = {};
    const params: Record<string, string> = {};
    for (const [key, value] of body.formData.entries()) {
      if (typeof value === "string") {
        params[key] = value;
      } else {
        const file: unknown = value;
        if (!Predicate.isObject(file)) throw new Error(`Invalid multipart file part ${key}`);
        const name = file["name"];
        const size = file["size"];
        const type = file["type"];
        if (typeof name !== "string" || typeof size !== "number" || typeof type !== "string") {
          throw new Error(`Invalid multipart file part ${key}`);
        }
        files[key] = {
          fileName: name,
          size,
          type,
        };
      }
    }
    return {
      contentType: "multipart/form-data",
      ...(Object.keys(files).length === 0 ? {} : { files }),
      params,
    };
  }
  if (body._tag === "Uint8Array") {
    return {
      ...(body.contentType === undefined ? {} : { contentType: body.contentType }),
      params: JSON.parse(new TextDecoder().decode(body.body)),
    };
  }
  return { params: {} };
}

function response(request: HttpClientRequest.HttpClientRequest, status: number, body: string) {
  return HttpClientResponse.fromWeb(
    request,
    new Response(body, {
      headers: { "content-type": "application/json" },
      status,
    }),
  );
}

function fileResponse(request: HttpClientRequest.HttpClientRequest, bytes: Uint8Array) {
  const body = new Uint8Array(bytes.byteLength);
  body.set(bytes);
  return HttpClientResponse.fromWeb(
    request,
    new Response(body.buffer, {
      headers: { "content-type": "application/octet-stream" },
      status: 200,
    }),
  );
}

function rejectedResponse(
  request: HttpClientRequest.HttpClientRequest,
  errorCode: number,
  description: string,
  parameters?: FakeBotApiResponseParameters,
) {
  return response(
    request,
    errorCode,
    JSON.stringify({
      description,
      error_code: errorCode,
      ok: false,
      ...(parameters === undefined
        ? {}
        : {
            parameters: {
              ...(parameters.migrateToChatId === undefined
                ? {}
                : { migrate_to_chat_id: parameters.migrateToChatId }),
              ...(parameters.retryAfter === undefined
                ? {}
                : { retry_after: parameters.retryAfter }),
            },
          }),
    }),
  );
}

export const FakeBotApi = {
  make(options: FakeBotApiOptions): FakeBotApi {
    const abortedFilePaths = new Set<string>();
    const abortedMethods = new Set<string>();
    const calls: Array<FakeBotApiCall> = [];
    const callWaiters: Array<{
      readonly method: string;
      readonly ordinal: number;
      readonly resolve: (call: FakeBotApiCall) => void;
    }> = [];
    const replies = [...(options.replies ?? [])];
    let updates = assertUpdates(options.updates ?? []);
    let lastUpdateId = updates.at(-1)?.update_id ?? 0;
    let webhookUrl = options.webhookUrl ?? "";
    let parkedPoll: ParkedPoll | undefined;
    const rateLimitReservations = new Map<string, number>();
    let nextMessageId = options.nextMessageId ?? 41;

    const completeParkedPoll = (outcome: PollSignal) => {
      if (parkedPoll === undefined) return;
      Deferred.doneUnsafe(parkedPoll.signal, Effect.succeed(outcome));
    };

    const pushUpdate = (update: FakeUpdate) => {
      assertNextUpdate(update, lastUpdateId);
      updates.push(update);
      lastUpdateId = update.update_id;
      completeParkedPoll("wake");
    };

    const applyOffset = (offset: number | undefined) => {
      if (offset === undefined || offset === 0) return;
      if (offset > 0) {
        updates = updates.filter((update) => update.update_id >= offset);
        return;
      }
      updates = updates.slice(offset);
    };

    const rateLimitDelay = (params: object, now: number): number => {
      const chatId = Reflect.get(params, "chat_id");
      if (typeof chatId !== "number" && typeof chatId !== "string") return 0;
      const paid = Reflect.get(params, "allow_paid_broadcast") === true;
      const reservations: ReadonlyArray<readonly [string, number]> = [
        [paid ? "overall:paid" : "overall:free", paid ? 1 : 1_000 / 30],
        [`chat:${String(chatId)}`, 1_000],
        ...(typeof chatId === "string" || chatId < 0
          ? [[`group:${String(chatId)}`, 60_000 / 20] as const]
          : []),
      ];
      let delayMs = 0;
      for (const [key] of reservations) {
        delayMs = Math.max(delayMs, (rateLimitReservations.get(key) ?? now) - now);
      }
      if (delayMs > 0) return delayMs;
      for (const [key, intervalMs] of reservations) {
        rateLimitReservations.set(key, now + intervalMs);
      }
      return 0;
    };

    const recordCall = (call: FakeBotApiCall) => {
      calls.push(call);
      const matching = calls.filter((item) => item.method === call.method);
      for (const waiter of [...callWaiters]) {
        const matched = matching[waiter.ordinal - 1];
        if (waiter.method !== call.method || matched === undefined) continue;
        callWaiters.splice(callWaiters.indexOf(waiter), 1);
        waiter.resolve(matched);
      }
    };

    const client = HttpClient.make(
      Effect.fnUntraced(function* (request, url, signal, fiber) {
        const methodMatch = url.pathname.match(/^\/bot([^/]+)\/([^/]+)$/u);
        const fileMatch = url.pathname.match(/^\/file\/bot([^/]+)\/(.+)$/u);
        const token = methodMatch?.[1] ?? fileMatch?.[1];
        const method = methodMatch?.[2] === undefined
          ? undefined
          : decodeURIComponent(methodMatch[2]);
        const filePath = fileMatch?.[2]?.split("/").map(decodeURIComponent).join("/");
        const details = bodyDetails(request.body);
        const params = details.params;
        if (method !== undefined) {
          recordCall({
            ...details,
            method,
            tracingDisabled: fiber.getRef(HttpClient.TracerDisabledWhen)(request),
          });
        } else if (filePath !== undefined) {
          recordCall({
            filePath,
            method: "downloadFile",
            tracingDisabled: fiber.getRef(HttpClient.TracerDisabledWhen)(request),
          });
        }

        if (token !== options.token) {
          return rejectedResponse(request, 401, "Unauthorized");
        }
        if (method === undefined && filePath === undefined) {
          return rejectedResponse(request, 404, "Not Found");
        }

        const scripted = replies.shift();
        if (scripted?._tag === "TransportFailure") {
          return yield* Effect.fail(
            new HttpClientError.HttpClientError({
              reason: new HttpClientError.TransportError({
                description: scripted.description,
                request,
              }),
            }),
          );
        }
        if (scripted?._tag === "Body") {
          return response(request, scripted.status, scripted.body);
        }
        if (scripted?._tag === "File") {
          return fileResponse(request, scripted.bytes);
        }
        if (scripted?._tag === "Hang") {
          signal.addEventListener("abort", () => {
            if (filePath !== undefined) abortedFilePaths.add(filePath);
            if (method !== undefined) abortedMethods.add(method);
          }, { once: true });
          return yield* Effect.never;
        }
        if (scripted?._tag === "Reject") {
          return rejectedResponse(
            request,
            scripted.errorCode,
            scripted.description,
            scripted.parameters,
          );
        }
        if (scripted?._tag === "Ok") {
          return okResponse(request, scripted.result);
        }
        if (method === "getUpdates" && Predicate.isObject(params)) {
          if (webhookUrl !== "") {
            return rejectedResponse(
              request,
              409,
              "Conflict: can't use getUpdates method while webhook is active",
            );
          }
          applyOffset(integerField(params, "offset"));
          const limit = Math.max(1, Math.min(100, integerField(params, "limit") ?? 100));
          const timeoutSeconds = Math.max(0, integerField(params, "timeout") ?? 0);

          while (true) {
            if (updates.length > 0) return okResponse(request, updates.slice(0, limit));
            if (timeoutSeconds === 0) return okResponse(request, []);

            completeParkedPoll("conflict");
            const wait: ParkedPoll = { signal: Deferred.makeUnsafe<PollSignal>() };
            parkedPoll = wait;
            const recordAbort = () => abortedMethods.add(method);
            signal.addEventListener("abort", recordAbort, { once: true });
            const outcome = yield* Deferred.await(wait.signal).pipe(
              Effect.timeoutOption(Duration.seconds(timeoutSeconds)),
              Effect.onInterrupt(() => Effect.sync(() => abortedMethods.add(method))),
              Effect.ensuring(Effect.sync(() => {
                signal.removeEventListener("abort", recordAbort);
                if (parkedPoll === wait) parkedPoll = undefined;
              })),
            );
            if (Option.isNone(outcome)) return okResponse(request, []);
            if (outcome.value === "conflict") {
              return rejectedResponse(
                request,
                409,
                "Conflict: terminated by other getUpdates request",
              );
            }
          }
        }
        if (method === "setWebhook" && Predicate.isObject(params)) {
          const url = stringField(params, "url");
          if (url === undefined) {
            return rejectedResponse(request, 400, "Bad Request: url is required");
          }
          webhookUrl = url;
          if (params["drop_pending_updates"] === true) updates = [];
          if (url !== "") completeParkedPoll("conflict");
          return okResponse(request, true);
        }
        if (method === "deleteWebhook" && Predicate.isObject(params)) {
          webhookUrl = "";
          if (params["drop_pending_updates"] === true) updates = [];
          return okResponse(request, true);
        }
        if (method === "getWebhookInfo") {
          return okResponse(request, {
            has_custom_certificate: false,
            pending_update_count: updates.length,
            url: webhookUrl,
          });
        }
        if (method === "answerCallbackQuery") {
          return okResponse(request, true);
        }
        if (method === "editMessageText" && Predicate.isObject(params)) {
          const messageId = integerField(params, "message_id");
          if (messageId === undefined) return okResponse(request, true);
          return okResponse(request, {
            chat: {
              id: typeof params["chat_id"] === "number" ? params["chat_id"] : 7,
              type: "private",
            },
            date: 1_700_000_000,
            message_id: messageId,
            ...(params["rich_message"] === undefined
              ? { text: params["text"] }
              : { rich_message: { blocks: [] } }),
          });
        }
        const sendsMessage = method === "sendMessage" || method === "sendRichMessage";
        if (
          options.serverRateLimit === true &&
          sendsMessage &&
          Predicate.isObject(params)
        ) {
          const now = yield* Effect.clockWith((clock) =>
            Effect.sync(() => clock.currentTimeMillisUnsafe())
          );
          const delayMs = rateLimitDelay(params, now);
          if (delayMs > 0) {
            return rejectedResponse(
              request,
              429,
              "Too Many Requests: retry later",
              { retryAfter: Math.max(1, Math.ceil(delayMs / 1_000)) },
            );
          }
        }
        if (!sendsMessage || !Predicate.isObject(params)) {
          return rejectedResponse(request, 404, "Not Found");
        }

        const messageId = nextMessageId;
        nextMessageId += 1;
        return okResponse(request, {
          chat: {
            id: typeof params["chat_id"] === "number" ? params["chat_id"] : 7,
            type: "private",
          },
          date: 1_700_000_000,
          future_field: "kept",
          message_id: messageId,
          ...(method === "sendRichMessage"
            ? { rich_message: { blocks: [] } }
            : { text: params["text"] }),
        });
      }),
    );

    return {
      get abortedFilePaths() {
        return [...abortedFilePaths];
      },
      get abortedMethods() {
        return [...abortedMethods];
      },
      enqueue: (reply: FakeBotApiReply) => {
        replies.push(reply);
      },
      layer: Layer.succeed(HttpClient.HttpClient, client),
      pushUpdate,
      get requests() {
        return [...calls];
      },
      whenCalled(method, ordinal = 1) {
        const existing = calls.filter((call) => call.method === method)[ordinal - 1];
        if (existing !== undefined) return Promise.resolve(existing);
        return new Promise((resolve) => callWaiters.push({ method, ordinal, resolve }));
      },
    } satisfies FakeBotApi;
  },
};
