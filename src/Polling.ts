import * as Effect from "effect/Effect";

import { Bot, BotApiError } from "./BotApi.js";
import { getUpdates } from "./methods.generated.js";
import { InboxStore, type InboxOptions, type InboxStoreError } from "./Inbox.js";
import { defaultConversationKey, makeDispatcher } from "./internal/Dispatch.js";
import {
  inboxDefaults,
  runInboxWorker,
  saveInboxUpdate,
} from "./internal/InboxRuntime.js";
import type { Update, UpdateType } from "./types.generated.js";

export type AcknowledgmentMode = "on-complete" | "on-receipt";

export type UpdateHandler<E = never, A = unknown> = (
  update: Update,
) => Effect.Effect<A, E, Bot>;

export interface PollingOptions {
  readonly acknowledgment?: AcknowledgmentMode;
  readonly allowedUpdates?: ReadonlyArray<UpdateType>;
  readonly batchSize?: number;
  readonly concurrency?: number;
  readonly conversationKey?: (update: Update) => number | string;
  readonly gracePeriodMs?: number;
  readonly pollTimeoutSeconds?: number;
}

export type InboxPollingOptions = Omit<PollingOptions, "acknowledgment"> & InboxOptions;

interface PendingUpdate {
  complete: boolean;
  readonly updateId: number;
}

const acknowledgmentFlushTimeoutMs = 5_000;

function acknowledgmentFlushTimeout() {
  return new BotApiError({
    method: "getUpdates",
    reason: {
      _tag: "Transport",
      description: `shutdown acknowledgment timed out after ${acknowledgmentFlushTimeoutMs}ms`,
    },
    retrySafe: true,
  });
}

export const pollUpdates = Effect.fn("pollUpdates")(function* <E>(
  handler: UpdateHandler<E>,
  options: PollingOptions = {},
): Effect.fn.Return<never, BotApiError | E, Bot> {
  const acknowledgment = options.acknowledgment ?? "on-complete";
  const batchSize = options.batchSize ?? 100;
  const concurrency = options.concurrency ?? 16;
  const conversationKey = options.conversationKey ?? defaultConversationKey;
  const gracePeriodMs = options.gracePeriodMs ?? 30_000;
  const pollTimeoutSeconds = options.pollTimeoutSeconds ?? 30;
  const seen = new Set<number>();
  const pending: Array<PendingUpdate> = [];
  const pendingById = new Map<number, PendingUpdate>();
  let nextOffset = 0;

  const markComplete = (updateId: number) => {
    const entry = pendingById.get(updateId);
    if (entry === undefined) return;
    entry.complete = true;
    while (pending[0]?.complete === true) {
      const confirmed = pending.shift();
      if (confirmed === undefined) break;
      pendingById.delete(confirmed.updateId);
      nextOffset = confirmed.updateId + 1;
    }
  };

  const trackedHandler: UpdateHandler<E> = acknowledgment === "on-complete"
    ? (update) => handler(update).pipe(
        Effect.tap(() => Effect.sync(() => markComplete(update.updateId))),
      )
    : handler;
  const dispatcher = yield* makeDispatcher(trackedHandler, {
    concurrency,
    conversationKey,
    gracePeriodMs,
  });

  const poll = Effect.gen(function* () {
    const available = yield* dispatcher.awaitCapacity;
    const requestOffset = nextOffset;
    const updates = yield* getUpdates({
      ...(options.allowedUpdates === undefined
        ? {}
        : { allowedUpdates: options.allowedUpdates }),
      ...(requestOffset === 0 ? {} : { offset: requestOffset }),
      limit: Math.min(
        100,
        batchSize,
        acknowledgment === "on-complete" ? seen.size + available : available,
      ),
      timeout: pollTimeoutSeconds,
    });
    for (const updateId of seen) {
      if (updateId < requestOffset) seen.delete(updateId);
    }
    if (updates.length === 0) return;
    let dispatched = 0;
    for (const update of updates) {
      if (seen.has(update.updateId)) continue;
      if (dispatched >= available) break;
      seen.add(update.updateId);
      if (acknowledgment === "on-receipt") {
        nextOffset = update.updateId + 1;
      }
      if (acknowledgment === "on-complete") {
        const entry = { complete: false, updateId: update.updateId };
        pending.push(entry);
        pendingById.set(update.updateId, entry);
      }
      yield* dispatcher.submit(update).pipe(Effect.orDie, Effect.asVoid);
      dispatched += 1;
    }
    if (dispatched === 0 && acknowledgment === "on-complete") {
      yield* dispatcher.awaitCompletion;
    }
  });

  const shutdown = Effect.gen(function* () {
    yield* dispatcher.drain;
    if (nextOffset > 0) {
      yield* getUpdates({ limit: 1, offset: nextOffset, timeout: 0 }).pipe(
        Effect.asVoid,
        Effect.timeoutOrElse({
          duration: acknowledgmentFlushTimeoutMs,
          orElse: () => Effect.fail(acknowledgmentFlushTimeout()),
        }),
      );
    }
  });

  return yield* Effect.raceFirst(
    Effect.forever(poll),
    dispatcher.join,
  ).pipe(Effect.onExit(() => shutdown));
});

export const pollInboxUpdates = Effect.fn("pollInboxUpdates")(function* <E>(
  handler: UpdateHandler<E>,
  options: InboxPollingOptions = {},
): Effect.fn.Return<never, BotApiError | InboxStoreError, Bot | InboxStore> {
  const batchSize = options.batchSize ?? 100;
  const pollTimeoutSeconds = options.pollTimeoutSeconds ?? 30;
  let nextOffset = 0;

  const receive = Effect.forever(Effect.gen(function* () {
    const updates = yield* getUpdates({
      ...(options.allowedUpdates === undefined
        ? {}
        : { allowedUpdates: options.allowedUpdates }),
      ...(nextOffset === 0 ? {} : { offset: nextOffset }),
      limit: Math.min(100, batchSize),
      timeout: pollTimeoutSeconds,
    });
    for (const update of updates) {
      const saved = yield* saveInboxUpdate(update, options);
      if (saved._tag === "Full") {
        yield* Effect.logWarning("Telegram inbox is full").pipe(
          Effect.annotateLogs({ capacity: options.capacity ?? inboxDefaults.capacity }),
        );
        yield* Effect.sleep(inboxDefaults.pollIntervalMs);
        return;
      }
    }
    const last = updates.at(-1);
    if (last !== undefined) nextOffset = last.updateId + 1;
  }));

  const flush = Effect.suspend(() => nextOffset === 0
    ? Effect.void
    : getUpdates({ limit: 1, offset: nextOffset, timeout: 0 }).pipe(
        Effect.asVoid,
        Effect.timeoutOrElse({
          duration: acknowledgmentFlushTimeoutMs,
          orElse: () => Effect.fail(acknowledgmentFlushTimeout()),
        }),
      ));

  return yield* Effect.raceFirst(
    receive,
    runInboxWorker(handler, options),
  ).pipe(Effect.onExit(() => flush));
});
