import { Effect, Layer, Predicate } from "effect";
import {
  HttpClient,
  HttpClientError,
  type HttpClientRequest,
  HttpClientResponse,
} from "effect/unstable/http";

export interface FakeBotApiCall {
  readonly contentType?: string;
  readonly method: string;
  readonly params: unknown;
  readonly tracingDisabled: boolean;
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
  | { readonly _tag: "Body"; readonly body: string; readonly status: number };

export const FakeBotApiReply = {
  body: (status: number, body: string): FakeBotApiReply => ({ _tag: "Body", body, status }),
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
  readonly token: string;
}

export interface FakeBotApi {
  readonly enqueue: (reply: FakeBotApiReply) => void;
  readonly layer: Layer.Layer<HttpClient.HttpClient>;
  readonly requests: ReadonlyArray<FakeBotApiCall>;
}

function bodyParams(body: HttpClientRequest.HttpClientRequest["body"]): unknown {
  if (body._tag !== "Uint8Array") {
    return {};
  }
  return JSON.parse(new TextDecoder().decode(body.body));
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
    const calls: Array<FakeBotApiCall> = [];
    const replies = [...(options.replies ?? [])];
    let nextMessageId = options.nextMessageId ?? 41;

    const client = HttpClient.make(
      Effect.fnUntraced(function* (request, url, _signal, fiber) {
        const match = url.pathname.match(/^\/bot([^/]+)\/([^/]+)$/u);
        const token = match?.[1];
        const method = match?.[2] === undefined ? undefined : decodeURIComponent(match[2]);
        const params = bodyParams(request.body);
        if (method !== undefined) {
          const contentType = "contentType" in request.body
            ? request.body.contentType
            : undefined;
          calls.push({
            ...(contentType === undefined ? {} : { contentType }),
            method,
            params,
            tracingDisabled: fiber.getRef(HttpClient.TracerDisabledWhen)(request),
          });
        }

        if (token !== options.token) {
          return rejectedResponse(request, 401, "Unauthorized");
        }
        if (method === undefined) {
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
        if (scripted?._tag === "Reject") {
          return rejectedResponse(
            request,
            scripted.errorCode,
            scripted.description,
            scripted.parameters,
          );
        }
        if (scripted?._tag === "Ok") {
          return response(request, 200, JSON.stringify({ ok: true, result: scripted.result }));
        }
        if (method !== "sendMessage" || !Predicate.isObject(params)) {
          return rejectedResponse(request, 404, "Not Found");
        }

        const messageId = nextMessageId;
        nextMessageId += 1;
        return response(
          request,
          200,
          JSON.stringify({
            ok: true,
            result: {
              chat: {
                id: typeof params["chat_id"] === "number" ? params["chat_id"] : 7,
                type: "private",
              },
              date: 1_700_000_000,
              future_field: "kept",
              message_id: messageId,
              text: params["text"],
            },
          }),
        );
      }),
    );

    return {
      enqueue: (reply: FakeBotApiReply) => {
        replies.push(reply);
      },
      layer: Layer.succeed(HttpClient.HttpClient, client),
      get requests() {
        return [...calls];
      },
    } satisfies FakeBotApi;
  },
};
