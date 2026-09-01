import * as Context from "effect/Context";
import * as Duration from "effect/Duration";
import * as Effect from "effect/Effect";

import type { BotApiError } from "../BotApi.js";
import { recordBotApiDelay } from "./Telemetry.js";

export type RateLimitClass =
  | "media-array"
  | "message"
  | "message-id-array"
  | "none";

export interface RequestMetadata {
  readonly rateLimit: RateLimitClass;
  readonly retrySafe: boolean;
}

interface RequestPolicyOptions {
  readonly rateLimit: boolean;
}

interface RequestPolicy {
  readonly execute: <A>(
    method: string,
    params: object,
    metadata: RequestMetadata,
    request: () => Effect.Effect<A, BotApiError>,
  ) => Effect.Effect<A, BotApiError>;
}

const RetryUnknownOutcome = Context.Reference<boolean>(
  "telly/RequestPolicy/RetryUnknownOutcome",
  { defaultValue: () => false },
);

const maxAttempts = 3;
const freeBroadcastIntervalMs = 1_000 / 30;
const paidBroadcastIntervalMs = 1;
const chatIntervalMs = 1_000;
const groupIntervalMs = 60_000 / 20;
const pruneIntervalMs = 60_000;

function field(params: object, name: string): unknown {
  return Reflect.get(params, name);
}

function rateLimitWeight(rateLimit: RateLimitClass, params: object): number {
  switch (rateLimit) {
    case "none":
      return 0;
    case "message":
      return 1;
    case "media-array": {
      const media = field(params, "media");
      if (!Array.isArray(media)) throw new TypeError("media-array rate limit requires media");
      return media.length;
    }
    case "message-id-array": {
      const messageIds = field(params, "message_ids");
      if (!Array.isArray(messageIds)) {
        throw new TypeError("message-id-array rate limit requires message_ids");
      }
      return messageIds.length;
    }
  }
}

function chatId(params: object): number | string | undefined {
  const value = field(params, "chat_id");
  return typeof value === "number" || typeof value === "string" ? value : undefined;
}

function isGroupChat(value: number | string): boolean {
  return typeof value === "string" || value < 0;
}

function retryDelay(error: BotApiError, failure: number, retryUnknown: boolean): number | undefined {
  if (error.reason._tag === "TelegramRejected") {
    if (error.reason.errorCode === 429) {
      return error.reason.retryAfter === undefined
        ? 1_000 * 2 ** failure
        : error.reason.retryAfter * 1_000;
    }
    return error.reason.errorCode >= 500 && error.reason.errorCode < 600
      ? 1_000 * 2 ** failure
      : undefined;
  }
  return error.retrySafe || retryUnknown ? 1_000 * 2 ** failure : undefined;
}

function wait(method: string, delayMs: number, reason: "rate-limit" | "retry") {
  if (delayMs <= 0) return Effect.void;
  return recordBotApiDelay(reason === "rate-limit" ? "rate_limit" : "retry", delayMs).pipe(
    Effect.andThen(Effect.logDebug("Telegram request delayed")),
    Effect.annotateLogs({ delayMs, method, reason }),
    Effect.andThen(Effect.sleep(Duration.millis(delayMs))),
  );
}

export function makeRequestPolicy(options: RequestPolicyOptions): RequestPolicy {
  const reservations = new Map<string, number>();
  let globalResumeTime = 0;
  let nextPruneTime = 0;

  const reserve = Effect.fn("RequestPolicy.reserve")(function* (
    method: string,
    key: string,
    intervalMs: number,
    weight: number,
  ) {
    const delayMs = yield* Effect.clockWith((clock) =>
      Effect.sync(() => {
        const now = clock.currentTimeMillisUnsafe();
        if (now >= nextPruneTime) {
          for (const [entry, availableAt] of reservations) {
            if (availableAt <= now) reservations.delete(entry);
          }
          nextPruneTime = now + pruneIntervalMs;
        }
        const availableAt = Math.max(now, reservations.get(key) ?? now);
        reservations.set(key, availableAt + intervalMs * weight);
        return availableAt - now;
      })
    );
    yield* wait(method, delayMs, "rate-limit");
  });

  const awaitCooldown = Effect.fn("RequestPolicy.awaitCooldown")(function* (method: string) {
    const cooldownMs = yield* Effect.clockWith((clock) =>
      Effect.sync(() => Math.max(0, globalResumeTime - clock.currentTimeMillisUnsafe()))
    );
    yield* wait(method, cooldownMs, "rate-limit");
    return cooldownMs > 0;
  });

  const awaitRateLimit = Effect.fn("RequestPolicy.awaitRateLimit")(function* (
    method: string,
    params: object,
    metadata: RequestMetadata,
  ) {
    while (true) {
      yield* awaitCooldown(method);
      const weight = rateLimitWeight(metadata.rateLimit, params);
      const target = chatId(params);
      if (target !== undefined) {
        const key = String(target);
        yield* reserve(method, `chat:${key}`, chatIntervalMs, weight);
        if (isGroupChat(target)) {
          yield* reserve(method, `group:${key}`, groupIntervalMs, weight);
        }
      }
      const paid = field(params, "allow_paid_broadcast") === true;
      yield* reserve(
        method,
        paid ? "overall:paid" : "overall:free",
        paid ? paidBroadcastIntervalMs : freeBroadcastIntervalMs,
        weight,
      );
      if (!(yield* awaitCooldown(method))) return;
    }
  });

  const learnCooldown = (error: BotApiError) => {
    if (
      error.reason._tag !== "TelegramRejected" ||
      error.reason.errorCode !== 429 ||
      error.reason.retryAfter === undefined
    ) {
      return Effect.void;
    }
    const retryAfter = error.reason.retryAfter;
    return Effect.clockWith((clock) =>
      Effect.sync(() => {
        globalResumeTime = Math.max(
          globalResumeTime,
          clock.currentTimeMillisUnsafe() + retryAfter * 1_000,
        );
      })
    );
  };

  const execute = Effect.fn("RequestPolicy.execute")(function* <A>(
    method: string,
    params: object,
    metadata: RequestMetadata,
    request: () => Effect.Effect<A, BotApiError>,
  ): Effect.fn.Return<A, BotApiError> {
    const attempt = (failure: number): Effect.Effect<A, BotApiError> => {
      const run = options.rateLimit && metadata.rateLimit !== "none"
        ? awaitRateLimit(method, params, metadata).pipe(
            Effect.andThen(Effect.suspend(request)),
          )
        : Effect.suspend(request);
      return run.pipe(
        Effect.catch((error) =>
          learnCooldown(error).pipe(
            Effect.andThen(
              RetryUnknownOutcome.use((retryUnknown) => {
                const delayMs = retryDelay(error, failure, retryUnknown);
                if (delayMs === undefined || failure + 1 >= maxAttempts) {
                  return Effect.fail(error);
                }
                return wait(method, delayMs, "retry").pipe(
                  Effect.andThen(attempt(failure + 1)),
                );
              }),
            ),
          )
        ),
      );
    };
    return yield* attempt(0);
  });

  return { execute };
}

/** Retries this operation when Telegram may have received an earlier attempt. */
export function retryUnknownOutcome<A, E, R>(
  effect: Effect.Effect<A, E, R>,
): Effect.Effect<A, E, R> {
  return Effect.provideService(effect, RetryUnknownOutcome, true);
}
