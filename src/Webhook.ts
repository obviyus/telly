import * as Cause from "effect/Cause";
import * as Deferred from "effect/Deferred";
import * as Effect from "effect/Effect";
import * as Exit from "effect/Exit";
import * as Redacted from "effect/Redacted";
import * as Result from "effect/Result";
import * as Schema from "effect/Schema";

import { Bot } from "./BotApi.js";
import type { UpdateHandler } from "./Polling.js";
import {
  defaultConversationKey,
  makeDispatcher,
} from "./internal/Dispatch.js";
import { Update, type Update as UpdateType } from "./types.generated.js";

const completedUpdateCapacity = 4_096;
const secretHeader = "x-telegram-bot-api-secret-token";

export interface WebhookOptions {
  readonly concurrency?: number;
  readonly conversationKey?: (update: UpdateType) => number | string;
  readonly gracePeriodMs?: number;
  readonly secretToken: string | Redacted.Redacted<string>;
}

export interface Webhook {
  readonly completed: Promise<void>;
  readonly fetch: (request: Request) => Promise<Response>;
  readonly stop: () => Promise<void>;
}

export interface WebhookRuntime<E> {
  readonly completed: Effect.Effect<void, E>;
  readonly fetch: (request: Request) => Effect.Effect<Response, never, Bot>;
  readonly stop: Effect.Effect<void>;
}

type RuntimeState = "failed" | "running" | "stopping";

type RequestClaim =
  | { readonly _tag: "Completed" }
  | { readonly _tag: "Follower"; readonly result: Deferred.Deferred<number> }
  | { readonly _tag: "Leader"; readonly result: Deferred.Deferred<number> };

function response(status: number): Response {
  return new Response(null, {
    status,
    ...(status === 405 ? { headers: { allow: "POST" } } : {}),
  });
}

function digest(value: string): Promise<Uint8Array> {
  return crypto.subtle.digest("SHA-256", new TextEncoder().encode(value)).then(
    (buffer) => new Uint8Array(buffer),
  );
}

function equalDigest(left: Uint8Array, right: Uint8Array): boolean {
  let difference = left.length ^ right.length;
  const length = Math.max(left.length, right.length);
  for (let index = 0; index < length; index += 1) {
    difference |= (left[index] ?? 0) ^ (right[index] ?? 0);
  }
  return difference === 0;
}

export function makeWebhookFetch<E, R>(
  secretToken: string | Redacted.Redacted<string>,
  processUpdate: (update: UpdateType) => Effect.Effect<number, E, R>,
  isAccepting: () => boolean = () => true,
): (request: Request) => Effect.Effect<Response, E, R> {
  const secret = Redacted.isRedacted(secretToken) ? Redacted.value(secretToken) : secretToken;
  if (!/^[A-Za-z0-9_-]{1,256}$/u.test(secret)) {
    throw new RangeError("Webhook secretToken must use 1-256 letters, digits, underscores, or dashes");
  }
  const expectedDigest = digest(secret);
  return Effect.fn("Webhook.fetch")(function* (request: Request) {
    if (request.method !== "POST") return response(405);
    const suppliedSecret = request.headers.get(secretHeader);
    if (suppliedSecret === null) return response(401);
    const suppliedDigest = yield* Effect.promise(() => digest(suppliedSecret));
    if (!equalDigest(yield* Effect.promise(() => expectedDigest), suppliedDigest)) {
      return response(401);
    }
    if (!isAccepting()) return response(503);
    const parsed = yield* Effect.result(
      Effect.tryPromise({ try: () => request.json(), catch: (error) => error }),
    );
    if (Result.isFailure(parsed)) return response(400);
    const decoded = yield* Effect.result(Schema.decodeUnknownEffect(Update)(parsed.success));
    if (Result.isFailure(decoded)) return response(400);
    return response(yield* processUpdate(decoded.success));
  });
}

export const makeWebhook = Effect.fn("makeWebhook")(function* <E>(
  handler: UpdateHandler<E>,
  options: WebhookOptions,
): Effect.fn.Return<WebhookRuntime<E>> {
  const concurrency = options.concurrency ?? 16;
  const gracePeriodMs = options.gracePeriodMs ?? 30_000;
  const dispatcher = yield* makeDispatcher(handler, {
    concurrency,
    conversationKey: options.conversationKey ?? defaultConversationKey,
    gracePeriodMs,
  });
  const completion = Deferred.makeUnsafe<void, E>();
  const inFlight = new Map<number, Deferred.Deferred<number>>();
  const recent = new Set<number>();
  const recentOrder: Array<number> = [];
  let recentCursor = 0;
  let state: RuntimeState = "running";
  let stopping: Deferred.Deferred<void> | undefined;

  const remember = (updateId: number) => {
    if (recent.has(updateId)) return;
    if (recentOrder.length < completedUpdateCapacity) {
      recentOrder.push(updateId);
    } else {
      const evicted = recentOrder[recentCursor];
      if (evicted !== undefined) recent.delete(evicted);
      recentOrder[recentCursor] = updateId;
      recentCursor = (recentCursor + 1) % completedUpdateCapacity;
    }
    recent.add(updateId);
  };

  const claim = (updateId: number): RequestClaim => {
    if (recent.has(updateId)) return { _tag: "Completed" };
    const existing = inFlight.get(updateId);
    if (existing !== undefined) return { _tag: "Follower", result: existing };
    const result = Deferred.makeUnsafe<number>();
    inFlight.set(updateId, result);
    return { _tag: "Leader", result };
  };

  const finish = (updateId: number, result: Deferred.Deferred<number>, status: number) => {
    if (inFlight.get(updateId) === result) inFlight.delete(updateId);
    Deferred.doneUnsafe(result, Effect.succeed(status));
    return status;
  };

  const failRuntime = <A>(exit: Exit.Failure<A, E>) => {
    if (state === "running") {
      state = "failed";
      Deferred.doneUnsafe(completion, Effect.failCause(exit.cause));
    }
  };

  const processUpdate = Effect.fn("Webhook.processUpdate")(function* (update: UpdateType) {
    const requestClaim = yield* Effect.sync(() =>
      state === "running" ? claim(update.updateId) : undefined
    );
    if (requestClaim === undefined) return 503;
    if (requestClaim._tag === "Completed") return 200;
    if (requestClaim._tag === "Follower") return yield* Deferred.await(requestClaim.result);
    const submission = yield* Effect.result(dispatcher.submit(update));
    if (Result.isFailure(submission)) {
      return finish(update.updateId, requestClaim.result, 503);
    }
    const exit = yield* submission.success;
    if (Exit.isSuccess(exit)) {
      remember(update.updateId);
      return finish(update.updateId, requestClaim.result, 200);
    }
    if (Cause.hasInterruptsOnly(exit.cause)) {
      return finish(update.updateId, requestClaim.result, 503);
    }
    failRuntime(exit);
    return finish(update.updateId, requestClaim.result, 500);
  });

  const fetch = makeWebhookFetch(
    options.secretToken,
    processUpdate,
    () => state === "running",
  );

  const stop = Effect.suspend(() => {
    if (stopping !== undefined) return Deferred.await(stopping);
    const stopped = Deferred.makeUnsafe<void>();
    stopping = stopped;
    if (state === "running") state = "stopping";
    return dispatcher.drain.pipe(
      Effect.onExit((exit) =>
        Effect.sync(() => {
          Deferred.doneUnsafe(stopped, exit);
          if (state !== "failed") Deferred.doneUnsafe(completion, exit);
        })
      ),
    );
  });

  return {
    completed: Deferred.await(completion),
    fetch,
    stop,
  };
});
