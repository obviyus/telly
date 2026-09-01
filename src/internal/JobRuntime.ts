import * as Cause from "effect/Cause";
import * as Effect from "effect/Effect";
import * as Exit from "effect/Exit";
import * as Result from "effect/Result";

import { Bot } from "../BotApi.js";
import {
  JobLeaseLost,
  JobsTypeId,
  jobDefaults,
  type ClaimedJob,
  type JobSettlement,
  type JobStoreError,
  type Jobs,
  type JobsState,
} from "../Jobs.js";
import { makeDispatcher } from "./Dispatch.js";
import { recordSettlement } from "./Telemetry.js";

function retryDelay(attempts: number, options: JobsState["options"]): number {
  return Math.min(
    options.retryMaxMs,
    options.retryBaseMs * 2 ** Math.max(0, attempts - 1),
  );
}

function failedSettlement(
  job: ClaimedJob,
  options: JobsState["options"],
  reason: string,
): Extract<JobSettlement, { readonly _tag: "Parked" | "Retry" }> {
  return job.attempts >= options.maxAttempts
    ? { _tag: "Parked", reason }
    : { _tag: "Retry", delayMs: retryDelay(job.attempts, options) };
}

export const runJobWorker = Effect.fn("runJobWorker")(function* (
  jobs: Jobs,
): Effect.fn.Return<never, JobStoreError, Bot> {
  const bot = yield* Bot;
  const state = jobs[JobsTypeId];
  const options = state.options;
  const { concurrency, doneRetentionMs, gracePeriodMs, leaseMs, maxAttempts } = options;
  yield* Effect.annotateCurrentSpan({ "telly.dispatch.source": "jobs" });

  const standby = Effect.forever(
    state.store.acquire({ botId: bot.id, leaseMs }).pipe(
      Effect.flatMap((lease) => {
        if (lease._tag === "Held") return Effect.sleep(jobDefaults.pollIntervalMs);
        const token = lease.fencingToken;
        return Effect.gen(function* () {
          yield* state.store.prune({
            botId: bot.id,
            doneAgeMs: doneRetentionMs,
          });
          const settle = (id: string, outcome: JobSettlement) =>
            state.store.settle({
              botId: bot.id,
              fencingToken: token,
              id,
              outcome,
            }).pipe(
              Effect.tap(() => recordSettlement("jobs", outcome)),
            );
          const handler = (claimed: ClaimedJob) => {
            const definition = state.definitions.get(claimed.name);
            const execution = definition === undefined
              ? Effect.fail("unknown-job")
              : definition.execute(claimed.payload, {
                  attempt: claimed.attempts,
                  id: claimed.id,
                  scheduledAt: new Date(claimed.scheduledTimeMs),
                });
            return Effect.result(execution).pipe(
              Effect.flatMap((result) => {
                const outcome = Result.isSuccess(result)
                  ? { _tag: "Done" } as const
                  : failedSettlement(
                      claimed,
                      options,
                      definition === undefined ? "unknown-job" : "attempts-exhausted",
                    );
                return settle(claimed.id, outcome);
              }),
              Effect.onInterrupt(() =>
                settle(claimed.id, { _tag: "Interrupted" }).pipe(
                  Effect.catchTag("JobLeaseLost", () => Effect.void),
                  Effect.catchTag("JobStoreError", () => Effect.void),
                )
              ),
            );
          };
          const dispatcher = yield* makeDispatcher(handler, {
            concurrency,
            conversationKey: (job) => job.id,
            gracePeriodMs,
            source: "jobs",
          });

          const pump = Effect.forever(Effect.gen(function* () {
            const available = yield* dispatcher.awaitCapacity;
            const wakeVersion = state.wake.current();
            const claimed = yield* state.store.claim({
              botId: bot.id,
              fencingToken: token,
              limit: available,
            });
            if (claimed.length === 0) {
              yield* state.wake.wait(wakeVersion).pipe(
                Effect.raceFirst(Effect.sleep(jobDefaults.pollIntervalMs)),
              );
              return;
            }
            for (const item of claimed) {
              if (item.attempts > maxAttempts) {
                yield* settle(item.id, {
                  _tag: "Parked",
                  reason: "attempts-exhausted",
                });
                continue;
              }
              yield* dispatcher.submit(item, item.id).pipe(Effect.orDie, Effect.asVoid);
            }
          }));
          const heartbeat = Effect.forever(
            Effect.sleep(leaseMs / 3).pipe(
              Effect.andThen(state.store.renew({
                botId: bot.id,
                fencingToken: token,
                leaseMs,
              })),
            ),
          );
          const maintenance = Effect.forever(
            Effect.sleep(3_600_000).pipe(
              Effect.andThen(state.store.prune({
                botId: bot.id,
                doneAgeMs: doneRetentionMs,
              })),
            ),
          );

          return yield* Effect.raceFirst(
            Effect.raceFirst(Effect.raceFirst(pump, dispatcher.join), maintenance),
            heartbeat,
          ).pipe(
            Effect.onExit((exit) => {
              if (Exit.isFailure(exit)) {
                const error = Cause.findError(exit.cause);
                if (Result.isSuccess(error) && error.success instanceof JobLeaseLost) {
                  return dispatcher.cancel;
                }
              }
              return dispatcher.drain;
            }),
            Effect.ensuring(
              state.store.release({ botId: bot.id, fencingToken: token }).pipe(
                Effect.catchTag("JobStoreError", (error) =>
                  Effect.logError("Telegram job lease release failed").pipe(
                    Effect.annotateLogs({ operation: error.operation }),
                  )
                ),
              ),
            ),
          );
        }).pipe(Effect.catchTag("JobLeaseLost", () => Effect.void));
      }),
    ),
  );

  return yield* standby;
});
