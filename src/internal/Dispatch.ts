import * as Deferred from "effect/Deferred";
import * as Effect from "effect/Effect";
import * as Exit from "effect/Exit";
import * as FiberSet from "effect/FiberSet";
import * as Schema from "effect/Schema";
import * as Scope from "effect/Scope";

import { Bot } from "../BotApi.js";
import type { Update } from "../types.generated.js";

export class DispatchFull extends Schema.TaggedError<DispatchFull>()(
  "DispatchFull",
  {},
) {}

export interface DispatchOptions<Item> {
  readonly concurrency: number;
  readonly conversationKey: (item: Item) => number | string;
  readonly gracePeriodMs: number;
}

export interface Dispatcher<Item, E, A = unknown> {
  readonly awaitCapacity: Effect.Effect<number>;
  readonly awaitCompletion: Effect.Effect<void>;
  readonly cancel: Effect.Effect<void>;
  readonly drain: Effect.Effect<void>;
  readonly join: Effect.Effect<never, E>;
  readonly submit: (
    item: Item,
    conversationKey?: number | string,
  ) => Effect.Effect<Effect.Effect<Exit.Exit<A, E>>, DispatchFull, Bot>;
}

interface Lane {
  pending: number;
  tail: Deferred.Deferred<void>;
}

export function defaultConversationKey(update: Update): number | string {
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

export const makeDispatcher = Effect.fn("makeDispatcher")(function* <Item, E, A>(
  handler: (item: Item) => Effect.Effect<A, E, Bot>,
  options: DispatchOptions<Item>,
): Effect.fn.Return<Dispatcher<Item, E, A>> {
  if (!Number.isInteger(options.concurrency) || options.concurrency < 1) {
    throw new RangeError("Dispatch concurrency must be a positive integer");
  }
  if (!Number.isFinite(options.gracePeriodMs) || options.gracePeriodMs < 0) {
    throw new RangeError("Dispatch gracePeriodMs must be a non-negative number");
  }
  const handlerScope = yield* Scope.make("parallel");
  const handlers = yield* FiberSet.make<unknown, E>().pipe(
    Effect.provideService(Scope.Scope, handlerScope),
  );
  const lanes = new Map<number | string, Lane>();
  let accepting = true;
  let active = 0;
  let nextCompletion = Deferred.makeUnsafe<void>();

  const awaitCapacity: Effect.Effect<number> = Effect.suspend(() => {
    if (active < options.concurrency) return Effect.succeed(options.concurrency - active);
    const completed = nextCompletion;
    return Deferred.await(completed).pipe(Effect.andThen(awaitCapacity));
  });

  const awaitCompletion = Effect.suspend(() =>
    active === 0 ? Effect.void : Deferred.await(nextCompletion)
  );

  const submit = (item: Item, conversationKey?: number | string) =>
    Effect.suspend(() => {
      if (!accepting || active >= options.concurrency) return Effect.fail(new DispatchFull());
      const key = conversationKey ?? options.conversationKey(item);
      let lane = lanes.get(key);
      if (lane === undefined) {
        const tail = Deferred.makeUnsafe<void>();
        Deferred.doneUnsafe(tail, Effect.void);
        lane = { pending: 0, tail };
        lanes.set(key, lane);
      }
      const previous = lane.tail;
      const done = Deferred.makeUnsafe<void>();
      const result = Deferred.makeUnsafe<Exit.Exit<A, E>>();
      lane.tail = done;
      lane.pending += 1;
      active += 1;

      const task = Deferred.await(previous).pipe(
        Effect.andThen(Effect.suspend(() => handler(item))),
        Effect.onExit((exit) =>
          Effect.sync(() => {
            Deferred.doneUnsafe(result, Effect.succeed(exit));
          })
        ),
        Effect.ensuring(
          Effect.sync(() => {
            lane.pending -= 1;
            if (lane.pending === 0) lanes.delete(key);
            Deferred.doneUnsafe(done, Effect.void);
            active -= 1;
            const completed = nextCompletion;
            nextCompletion = Deferred.makeUnsafe<void>();
            Deferred.doneUnsafe(completed, Effect.void);
          }),
        ),
      );
      return FiberSet.run(handlers, task).pipe(
        Effect.as(Deferred.await(result)),
      );
    });

  const drain = Effect.suspend(() => {
    accepting = false;
    return FiberSet.awaitEmpty(handlers).pipe(
      Effect.raceFirst(
        Effect.sleep(options.gracePeriodMs).pipe(Effect.andThen(FiberSet.clear(handlers))),
      ),
      Effect.andThen(Scope.close(handlerScope, Exit.void)),
    );
  });

  const cancel = Effect.suspend(() => {
    accepting = false;
    return FiberSet.clear(handlers).pipe(
      Effect.andThen(Scope.close(handlerScope, Exit.void)),
    );
  });

  return {
    awaitCapacity,
    awaitCompletion,
    cancel,
    drain,
    join: FiberSet.join(handlers).pipe(Effect.andThen(Effect.never)),
    submit,
  };
});
