import { Effect } from "effect";

import { Bot } from "../BotApi.js";
import type { ConversationStoreError } from "../ConversationStore.js";
import type { UpdateHandler } from "../Polling.js";
import type { Message, Update } from "../types.generated.js";
import {
  ConversationTypeId,
  type ConversationProtocol,
  type ConversationProtocolError,
} from "./ConversationProtocol.js";

export function conversationScopeFromMessage(message: Message): string | undefined {
  return message.from === undefined
    ? undefined
    : `chat:${message.chat.id}:user:${message.from.id}`;
}

export function conversationScopeFromUpdate(update: Update): string | undefined {
  if (update.message !== undefined) return conversationScopeFromMessage(update.message);
  const query = update.callbackQuery;
  return query?.message === undefined
    ? undefined
    : `chat:${query.message.chat.id}:user:${query.from.id}`;
}

export function withConversations<
  const Definitions extends ReadonlyArray<ConversationProtocol<unknown>>,
  FallbackError,
>(
  definitions: Definitions,
  fallback: UpdateHandler<FallbackError>,
): UpdateHandler<
  | ConversationProtocolError<Definitions[number]>
  | ConversationStoreError
  | FallbackError
>;
export function withConversations(
  definitions: ReadonlyArray<ConversationProtocol<unknown>>,
  fallback: UpdateHandler<unknown>,
): UpdateHandler<unknown> {
  if (definitions.length === 0) return fallback;
  const runtimes = definitions.map((definition) => definition[ConversationTypeId]);
  const store = runtimes[0]?.store;
  if (store === undefined) return fallback;
  const byName = new Map<string, (typeof runtimes)[number]>();
  for (const runtime of runtimes) {
    if (runtime.store !== store) {
      throw new RangeError("All conversations in one bot must share a store");
    }
    if (byName.has(runtime.name)) {
      throw new RangeError(`Duplicate conversation name: ${runtime.name}`);
    }
    byName.set(runtime.name, runtime);
  }

  return Effect.fn("conversations.dispatch")(function* (update) {
    const scope = conversationScopeFromUpdate(update);
    if (scope === undefined) return yield* fallback(update);
    const bot = yield* Bot;
    const record = yield* store.load({ botId: bot.id, scope });
    if (record === undefined) return yield* fallback(update);
    const runtime = byName.get(record.conversation);
    if (runtime === undefined) return yield* fallback(update);
    const handled = yield* runtime.handle(record, update, scope, bot.id);
    if (!handled) return yield* fallback(update);
  });
}
