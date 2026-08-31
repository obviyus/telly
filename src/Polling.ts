import {
  Deferred,
  Effect,
  Exit,
  FiberSet,
  Ref,
  Scope,
} from "effect";

import { Bot, BotApiError } from "./BotApi.js";
import { getUpdates } from "./methods.generated.js";
import type { Update, UpdateType } from "./types.generated.js";

export type AcknowledgmentMode = "on-complete" | "on-receipt";

export type UpdateHandler<E = never> = (
  update: Update,
) => Effect.Effect<unknown, E, Bot>;

export interface PollingOptions {
  readonly acknowledgment?: AcknowledgmentMode;
  readonly allowedUpdates?: ReadonlyArray<UpdateType>;
  readonly batchSize?: number;
  readonly concurrency?: number;
  readonly conversationKey?: (update: Update) => number | string;
  readonly gracePeriodMs?: number;
  readonly pollTimeoutSeconds?: number;
}

interface Lane {
  pending: number;
  tail: Deferred.Deferred<void>;
}

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

function defaultConversationKey(update: Update): number | string {
  const message = update.message ??
    update.editedMessage ??
    update.channelPost ??
    update.editedChannelPost ??
    update.businessMessage ??
    update.editedBusinessMessage ??
    update.guestMessage;
  if (message !== undefined) return `chat:${message.chat.id}`;
  if (update.deletedBusinessMessages !== undefined) {
    return `chat:${update.deletedBusinessMessages.chat.id}`;
  }
  if (update.businessConnection !== undefined) {
    return `chat:${update.businessConnection.userChatId}`;
  }
  if (update.messageReaction !== undefined) return `chat:${update.messageReaction.chat.id}`;
  if (update.messageReactionCount !== undefined) {
    return `chat:${update.messageReactionCount.chat.id}`;
  }
  if (update.callbackQuery?.message !== undefined) {
    return `chat:${update.callbackQuery.message.chat.id}`;
  }
  if (update.callbackQuery !== undefined) {
    return `chat-instance:${update.callbackQuery.chatInstance}`;
  }
  if (update.pollAnswer?.voterChat !== undefined) {
    return `chat:${update.pollAnswer.voterChat.id}`;
  }
  if (update.chatJoinRequest !== undefined) return `chat:${update.chatJoinRequest.chat.id}`;
  if (update.myChatMember !== undefined) return `chat:${update.myChatMember.chat.id}`;
  if (update.chatMember !== undefined) return `chat:${update.chatMember.chat.id}`;
  if (update.chatBoost !== undefined) return `chat:${update.chatBoost.chat.id}`;
  if (update.removedChatBoost !== undefined) return `chat:${update.removedChatBoost.chat.id}`;
  if (update.stoppedMessageGeneration !== undefined) {
    return `chat:${update.stoppedMessageGeneration.chat.id}`;
  }
  return `update:${update.updateId}`;
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
  const handlerScope = yield* Scope.make("parallel");
  const handlers = yield* FiberSet.make<unknown, E>().pipe(
    Effect.provideService(Scope.Scope, handlerScope),
  );
  const active = yield* Ref.make(0);
  const lanes = new Map<number | string, Lane>();
  const seen = new Set<number>();
  const pending: Array<PendingUpdate> = [];
  const pendingById = new Map<number, PendingUpdate>();
  let nextCompletion = Deferred.makeUnsafe<void>();
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

  const dispatch = Effect.fn("pollUpdates.dispatch")(function* (update: Update) {
    const key = conversationKey(update);
    let lane = lanes.get(key);
    if (lane === undefined) {
      const tail = yield* Deferred.make<void>();
      yield* Deferred.succeed(tail, undefined);
      lane = { pending: 0, tail };
      lanes.set(key, lane);
    }
    const previous = lane.tail;
    const done = yield* Deferred.make<void>();
    lane.tail = done;
    lane.pending += 1;
    yield* Ref.update(active, (count) => count + 1);

    const task = Deferred.await(previous).pipe(
      Effect.andThen(handler(update)),
      Effect.tap(() =>
        acknowledgment === "on-complete"
          ? Effect.sync(() => markComplete(update.updateId))
          : Effect.void
      ),
      Effect.ensuring(
        Effect.gen(function* () {
          lane.pending -= 1;
          if (lane.pending === 0) lanes.delete(key);
          yield* Deferred.succeed(done, undefined);
          yield* Ref.update(active, (count) => count - 1);
          const completed = nextCompletion;
          nextCompletion = Deferred.makeUnsafe<void>();
          yield* Deferred.succeed(completed, undefined);
        }),
      ),
    );
    yield* FiberSet.run(handlers, task);
  });

  const poll = Effect.gen(function* () {
    let activeCount: number;
    while (true) {
      const completed = nextCompletion;
      activeCount = yield* Ref.get(active);
      if (activeCount < concurrency) break;
      yield* Deferred.await(completed);
    }
    const requestOffset = nextOffset;
    const available = concurrency - activeCount;
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
      yield* dispatch(update);
      dispatched += 1;
    }
    if (dispatched === 0 && acknowledgment === "on-complete") {
      const completed = nextCompletion;
      if ((yield* Ref.get(active)) > 0) yield* Deferred.await(completed);
    }
  });

  const shutdown = Effect.gen(function* () {
    yield* FiberSet.awaitEmpty(handlers).pipe(
      Effect.raceFirst(
        Effect.sleep(gracePeriodMs).pipe(Effect.andThen(FiberSet.clear(handlers))),
      ),
    );
    yield* Scope.close(handlerScope, Exit.void);
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
    FiberSet.join(handlers).pipe(Effect.andThen(Effect.never)),
  ).pipe(Effect.onExit(() => shutdown));
});
