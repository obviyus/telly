import * as Duration from "effect/Duration";
import * as Effect from "effect/Effect";
import * as Result from "effect/Result";
import * as Schema from "effect/Schema";

import { Bot, BotApiError } from "../BotApi.js";
import {
  getUpdates,
  getWebhookInfo,
  type GetUpdatesParams,
} from "../methods.generated.js";
import type { Update } from "../types.generated.js";
import { recordBotApiDelay } from "./Telemetry.js";

const defaultConflictRetryBudgetMs = 60_000;
const acknowledgmentFlushTimeoutMs = 5_000;
const conflictRetryBaseMs = 1_000;
const conflictRetryMaxMs = 5_000;

export class PollingConflictError extends Schema.TaggedError<PollingConflictError>()(
  "PollingConflictError",
  {
    conflict: Schema.Literals(["active-webhook", "overlapping-poll"]),
    rejection: BotApiError,
  },
) {
  override get message(): string {
    return this.conflict === "active-webhook"
      ? "getUpdates cannot run while a Telegram webhook is active; delete the webhook or use startWebhook"
      : "another getUpdates consumer held the polling conflict for the full retry budget";
  }
}

interface PollingRequests {
  readonly confirmOffset: (offset: number) => Effect.Effect<void, BotApiError, Bot>;
  readonly getUpdates: (
    params: GetUpdatesParams,
  ) => Effect.Effect<ReadonlyArray<Update>, BotApiError | PollingConflictError, Bot>;
}

interface ConflictEpisode {
  readonly deadlineMs: number;
  readonly rejection: BotApiError;
  readonly retry: number;
}

function isGetUpdatesConflict(error: BotApiError): boolean {
  return error.method === "getUpdates" &&
    error.reason._tag === "TelegramRejected" &&
    error.reason.errorCode === 409;
}

function flushTimeout() {
  return new BotApiError({
    method: "getUpdates",
    reason: {
      _tag: "Transport",
      description: `shutdown acknowledgment timed out after ${acknowledgmentFlushTimeoutMs}ms`,
    },
    retrySafe: true,
  });
}

export function makePollingRequests(conflictRetryBudgetMs = defaultConflictRetryBudgetMs) {
  if (!Number.isFinite(conflictRetryBudgetMs) || conflictRetryBudgetMs < 0) {
    throw new RangeError("Polling conflictRetryBudgetMs must be a non-negative number");
  }

  const recoveringGetUpdates = Effect.fn("PollingRequests.getUpdates")(function* (
    params: GetUpdatesParams,
  ): Effect.fn.Return<ReadonlyArray<Update>, BotApiError | PollingConflictError, Bot> {
    let episode: ConflictEpisode | undefined;

    while (true) {
      const now = yield* Effect.clockWith((clock) =>
        Effect.sync(() => clock.currentTimeMillisUnsafe())
      );
      if (episode !== undefined && now >= episode.deadlineMs) {
        return yield* new PollingConflictError({
          conflict: "overlapping-poll",
          rejection: episode.rejection,
        });
      }

      const result = yield* Effect.result(getUpdates(params));
      if (Result.isSuccess(result)) return result.success;
      const rejection = result.failure;
      if (!isGetUpdatesConflict(rejection) || conflictRetryBudgetMs === 0) {
        return yield* rejection;
      }

      // Telegram does not document stable conflict descriptions. Webhook state is the safe classifier.
      const webhook = yield* getWebhookInfo().pipe(
        Effect.catch(() => Effect.fail(rejection)),
      );
      if (webhook.url !== "") {
        return yield* new PollingConflictError({
          conflict: "active-webhook",
          rejection,
        });
      }

      const classifiedAt = yield* Effect.clockWith((clock) =>
        Effect.sync(() => clock.currentTimeMillisUnsafe())
      );
      const current = episode ?? {
        deadlineMs: classifiedAt + conflictRetryBudgetMs,
        rejection,
        retry: 0,
      };
      if (classifiedAt >= current.deadlineMs) {
        return yield* new PollingConflictError({
          conflict: "overlapping-poll",
          rejection,
        });
      }
      const delayMs = Math.min(
        conflictRetryBaseMs * 2 ** current.retry,
        conflictRetryMaxMs,
        current.deadlineMs - classifiedAt,
      );
      yield* recordBotApiDelay("retry", delayMs).pipe(
        Effect.andThen(Effect.logWarning("Telegram polling conflict; retrying")),
        Effect.annotateLogs({
          delayMs,
          elapsedMs: conflictRetryBudgetMs - (current.deadlineMs - classifiedAt),
        }),
        Effect.andThen(Effect.sleep(Duration.millis(delayMs))),
      );
      episode = {
        deadlineMs: current.deadlineMs,
        rejection,
        retry: current.retry + 1,
      };
    }
  });

  const confirmOffset = Effect.fn("PollingRequests.confirmOffset")(function* (offset: number) {
    return yield* getUpdates({ limit: 1, offset, timeout: 0 }).pipe(
      Effect.asVoid,
      // Another consumer will receive anything this process could not confirm during shutdown.
      Effect.catch((error) => isGetUpdatesConflict(error) ? Effect.void : Effect.fail(error)),
      Effect.timeoutOrElse({
        duration: acknowledgmentFlushTimeoutMs,
        orElse: () => Effect.fail(flushTimeout()),
      }),
    );
  });

  return {
    confirmOffset,
    getUpdates: recoveringGetUpdates,
  } satisfies PollingRequests;
}
