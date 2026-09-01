import * as Cause from "effect/Cause";
import * as Deferred from "effect/Deferred";
import * as Effect from "effect/Effect";
import * as Exit from "effect/Exit";
import * as Fiber from "effect/Fiber";
import * as Redacted from "effect/Redacted";
import * as Result from "effect/Result";
import * as Schema from "effect/Schema";
import * as Scope from "effect/Scope";

import { Bot } from "../BotApi.js";
import {
  DispatchLeaseLost,
  InboxStore,
  type InboxOptions,
  type InboxSaveResult,
  type InboxStoreError,
} from "../Inbox.js";
import type { UpdateHandler } from "../Polling.js";
import { Update } from "../types.generated.js";
import { makeWebhookFetch, type WebhookRuntime } from "../Webhook.js";
import { defaultConversationKey, makeDispatcher } from "./Dispatch.js";
import { recordInboxSave, recordSettlement } from "./Telemetry.js";

export const inboxDefaults = {
  capacity: 10_000,
  concurrency: 16,
  doneRetentionMs: 86_400_000,
  gracePeriodMs: 30_000,
  leaseMs: 30_000,
  maxAttempts: 5,
  pollIntervalMs: 100,
} as const;

export interface InboxRuntimeOptions extends InboxOptions {
  /** @internal */ readonly wake?: InboxWake;
}

interface InboxWake {
  readonly current: () => number;
  readonly signal: Effect.Effect<void>;
  readonly wait: (version: number) => Effect.Effect<void>;
}

export function makeInboxWake(): InboxWake {
  let version = 0;
  let changed = Deferred.makeUnsafe<void>();
  return {
    current: () => version,
    signal: Effect.sync(() => {
      version += 1;
      const previous = changed;
      changed = Deferred.makeUnsafe<void>();
      Deferred.doneUnsafe(previous, Effect.void);
    }),
    wait: (observed) => Effect.suspend(() =>
      observed === version
        ? Deferred.await(changed).pipe(
            Effect.raceFirst(Effect.sleep(inboxDefaults.pollIntervalMs)),
          )
        : Effect.void
    ),
  };
}

export const saveInboxUpdate = Effect.fn("saveInboxUpdate")(function* (
  update: typeof Update.Type,
  options: InboxRuntimeOptions = {},
): Effect.fn.Return<InboxSaveResult, InboxStoreError, Bot | InboxStore> {
  const bot = yield* Bot;
  const store = yield* InboxStore;
  const key = String((options.conversationKey ?? defaultConversationKey)(update));
  const payload = yield* Schema.encodeEffect(Update)(update).pipe(Effect.orDie);
  const saved = yield* store.save({
    botId: bot.id,
    capacity: options.capacity ?? inboxDefaults.capacity,
    conversationKey: key,
    payload,
    updateId: update.updateId,
  });
  yield* recordInboxSave(saved._tag);
  if (saved._tag !== "Full" && options.wake !== undefined) yield* options.wake.signal;
  return saved;
});

function retryDelay(attempts: number, options: InboxRuntimeOptions): number {
  return Math.min(
    options.retryMaxMs ?? 60_000,
    (options.retryBaseMs ?? 1_000) * 2 ** Math.max(0, attempts - 1),
  );
}

export const runInboxWorker = Effect.fn("runInboxWorker")(function* <E>(
  handler: UpdateHandler<E>,
  options: InboxRuntimeOptions = {},
): Effect.fn.Return<never, InboxStoreError, Bot | InboxStore> {
  const bot = yield* Bot;
  const store = yield* InboxStore;
  const concurrency = options.concurrency ?? inboxDefaults.concurrency;
  const gracePeriodMs = options.gracePeriodMs ?? inboxDefaults.gracePeriodMs;
  const leaseMs = options.leaseMs ?? inboxDefaults.leaseMs;
  const maxAttempts = options.maxAttempts ?? inboxDefaults.maxAttempts;
  yield* Effect.annotateCurrentSpan({ "telly.dispatch.source": "inbox" });

  const standby = Effect.forever(
    store.acquire({ botId: bot.id, leaseMs }).pipe(
      Effect.flatMap((lease) => {
        if (lease._tag === "Held") {
          return Effect.sleep(inboxDefaults.pollIntervalMs);
        }
        const token = lease.fencingToken;
        return Effect.gen(function* () {
          yield* store.prune({
            botId: bot.id,
            doneAgeMs: options.doneRetentionMs ?? inboxDefaults.doneRetentionMs,
          });
          const claimed = new Map<number, { readonly attempts: number }>();
          const trackedHandler: UpdateHandler<DispatchLeaseLost | InboxStoreError, void> = (update) => {
            const item = claimed.get(update.updateId);
            if (item === undefined) return Effect.die(new Error("Claimed update is missing"));
            return Effect.result(handler(update)).pipe(
              Effect.flatMap((result) =>
                store.settle({
                  botId: bot.id,
                  fencingToken: token,
                  outcome: Result.isSuccess(result)
                    ? { _tag: "Done" }
                    : item.attempts >= maxAttempts
                    ? { _tag: "Parked", reason: "attempts-exhausted" }
                    : { _tag: "Retry", delayMs: retryDelay(item.attempts, options) },
                  updateId: update.updateId,
                }).pipe(
                  Effect.tap(() => {
                    if (Result.isSuccess(result)) return recordSettlement("inbox", "done");
                    return item.attempts >= maxAttempts
                      ? recordSettlement("inbox", "parked", "attempts-exhausted")
                      : recordSettlement("inbox", "retry");
                  }),
                  Effect.tap(() => options.wake?.signal ?? Effect.void),
                )
              ),
              Effect.onInterrupt(() =>
                store.settle({
                  botId: bot.id,
                  fencingToken: token,
                  outcome: { _tag: "Interrupted" },
                  updateId: update.updateId,
                }).pipe(
                  Effect.tap(() => recordSettlement("inbox", "interrupted")),
                  Effect.catchTag("DispatchLeaseLost", () => Effect.void),
                  Effect.catchTag("InboxStoreError", () => Effect.void),
                )
              ),
              Effect.ensuring(Effect.sync(() => {
                if (claimed.get(update.updateId) === item) claimed.delete(update.updateId);
              })),
            );
          };
          const dispatcher = yield* makeDispatcher(trackedHandler, {
            concurrency,
            conversationKey: options.conversationKey ?? defaultConversationKey,
            gracePeriodMs,
            source: "inbox",
          });

          const pump = Effect.forever(Effect.gen(function* () {
            const available = yield* dispatcher.awaitCapacity;
            const wakeVersion = options.wake?.current();
            const items = yield* store.claim({
              botId: bot.id,
              fencingToken: token,
              limit: available,
            });
            if (items.length === 0) {
              yield* wakeVersion === undefined
                ? Effect.sleep(inboxDefaults.pollIntervalMs)
                : options.wake?.wait(wakeVersion) ?? Effect.void;
              return;
            }
            for (const item of items) {
              if (item.attempts > maxAttempts) {
                yield* store.settle({
                  botId: bot.id,
                  fencingToken: token,
                  outcome: { _tag: "Parked", reason: "attempts-exhausted" },
                  updateId: item.updateId,
                }).pipe(
                  Effect.tap(() =>
                    recordSettlement("inbox", "parked", "attempts-exhausted")
                  ),
                );
                continue;
              }
              const decoded = yield* Effect.result(Schema.decodeUnknownEffect(Update)(item.payload));
              if (Result.isFailure(decoded)) {
                yield* store.settle({
                  botId: bot.id,
                  fencingToken: token,
                  outcome: { _tag: "Parked", reason: "invalid-update" },
                  updateId: item.updateId,
                }).pipe(
                  Effect.tap(() => recordSettlement("inbox", "parked", "invalid-update")),
                );
                continue;
              }
              claimed.set(item.updateId, { attempts: item.attempts });
              yield* dispatcher.submit(decoded.success, item.conversationKey).pipe(
                Effect.orDie,
                Effect.asVoid,
              );
            }
          }));
          const heartbeat = Effect.forever(
            Effect.sleep(leaseMs / 3).pipe(
              Effect.andThen(store.renew({
                botId: bot.id,
                fencingToken: token,
                leaseMs,
              })),
            ),
          );
          const maintenance = Effect.forever(
            Effect.sleep(3_600_000).pipe(
              Effect.andThen(store.prune({
                botId: bot.id,
                doneAgeMs: options.doneRetentionMs ?? inboxDefaults.doneRetentionMs,
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
                if (
                  Result.isSuccess(error) &&
                  error.success instanceof DispatchLeaseLost
                ) {
                  return dispatcher.cancel;
                }
              }
              return dispatcher.drain;
            }),
            Effect.ensuring(
              store.release({ botId: bot.id, fencingToken: token }).pipe(
                Effect.catchTag("InboxStoreError", (error) =>
                  Effect.logError("Telegram inbox lease release failed").pipe(
                    Effect.annotateLogs({ operation: error.operation }),
                  )
                ),
              ),
            ),
          );
        }).pipe(
          Effect.catchTag("DispatchLeaseLost", () => Effect.void),
        );
      }),
    ),
  );

  return yield* standby;
});

export const makeInboxWebhook = Effect.fn("makeInboxWebhook")(function* <E>(
  handler: UpdateHandler<E>,
  secretToken: string | Redacted.Redacted<string>,
  options: InboxRuntimeOptions = {},
): Effect.fn.Return<WebhookRuntime<InboxStoreError>, never, Bot | InboxStore> {
  const bot = yield* Bot;
  const store = yield* InboxStore;
  const scope = yield* Scope.make("parallel");
  const worker = yield* Effect.forkIn(runInboxWorker(handler, options), scope);
  let accepting = true;
  let stopping: Deferred.Deferred<void> | undefined;

  const receive = makeWebhookFetch(
    secretToken,
    (update) => saveInboxUpdate(update, options).pipe(
      Effect.map((saved) => saved._tag === "Full" ? 503 : 200),
      Effect.catchTag("InboxStoreError", (error) =>
        Effect.logError("Telegram inbox save failed").pipe(
          Effect.annotateLogs({ operation: error.operation }),
          Effect.as(503),
        )
      ),
    ),
    () => accepting,
  );
  const fetch = (request: Request) => receive(request).pipe(
    Effect.provideService(Bot, bot),
    Effect.provideService(InboxStore, store),
  );
  const completed = Fiber.join(worker).pipe(
    Effect.catchCause((cause) =>
      Cause.hasInterruptsOnly(cause) ? Effect.void : Effect.failCause(cause)
    ),
  );
  const stop = Effect.suspend(() => {
    if (stopping !== undefined) return Deferred.await(stopping);
    accepting = false;
    const stopped = Deferred.makeUnsafe<void>();
    stopping = stopped;
    return Scope.close(scope, Exit.void).pipe(
      Effect.onExit((exit) => Effect.sync(() => Deferred.doneUnsafe(stopped, exit))),
    );
  });

  return { completed, fetch, stop };
});
