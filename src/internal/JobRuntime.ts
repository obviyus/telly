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
  type JobOptions,
  type JobSettlement,
  type JobStoreError,
  type Jobs,
} from "../Jobs.js";
import { makeDispatcher } from "./Dispatch.js";
import { recordSettlement } from "./Telemetry.js";

function retryDelay(attempts: number, options: JobOptions): number {
  return Math.min(
    options.retryMaxMs ?? jobDefaults.retryMaxMs,
    (options.retryBaseMs ?? jobDefaults.retryBaseMs) * 2 ** Math.max(0, attempts - 1),
  );
}

function failedSettlement(
  job: ClaimedJob,
  options: JobOptions,
  reason: string,
): Extract<JobSettlement, { readonly _tag: "Parked" | "Retry" }> {
  return job.attempts >= (options.maxAttempts ?? jobDefaults.maxAttempts)
    ? { _tag: "Parked", reason }
    : { _tag: "Retry", delayMs: retryDelay(job.attempts, options) };
}

export const runJobWorker = Effect.fn("runJobWorker")(function* (
  jobs: Jobs,
): Effect.fn.Return<never, JobStoreError, Bot> {
  const bot = yield* Bot;
  const state = jobs[JobsTypeId];
  const options = state.options;
  const concurrency = options.concurrency ?? jobDefaults.concurrency;
  const gracePeriodMs = options.gracePeriodMs ?? jobDefaults.gracePeriodMs;
  const leaseMs = options.leaseMs ?? jobDefaults.leaseMs;
  const maxAttempts = options.maxAttempts ?? jobDefaults.maxAttempts;
  yield* Effect.annotateCurrentSpan({ "telly.dispatch.source": "jobs" });

  const standby = Effect.forever(
    state.store.acquire({ botId: bot.id, leaseMs }).pipe(
      Effect.flatMap((lease) => {
        if (lease._tag === "Held") return Effect.sleep(jobDefaults.pollIntervalMs);
        const token = lease.fencingToken;
        return Effect.gen(function* () {
          yield* state.store.prune({
            botId: bot.id,
            doneAgeMs: options.doneRetentionMs ?? jobDefaults.doneRetentionMs,
          });
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
                return state.store.settle({
                  botId: bot.id,
                  fencingToken: token,
                  id: claimed.id,
                  outcome,
                }).pipe(
                  Effect.tap(() =>
                    outcome._tag === "Done"
                      ? recordSettlement("jobs", "done")
                      : outcome._tag === "Retry"
                      ? recordSettlement("jobs", "retry")
                      : recordSettlement("jobs", "parked", outcome.reason)
                  ),
                );
              }),
              Effect.onInterrupt(() =>
                state.store.settle({
                  botId: bot.id,
                  fencingToken: token,
                  id: claimed.id,
                  outcome: { _tag: "Interrupted" },
                }).pipe(
                  Effect.tap(() => recordSettlement("jobs", "interrupted")),
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
                yield* state.store.settle({
                  botId: bot.id,
                  fencingToken: token,
                  id: item.id,
                  outcome: { _tag: "Parked", reason: "attempts-exhausted" },
                }).pipe(
                  Effect.tap(() =>
                    recordSettlement("jobs", "parked", "attempts-exhausted")
                  ),
                );
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
                doneAgeMs: options.doneRetentionMs ?? jobDefaults.doneRetentionMs,
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
