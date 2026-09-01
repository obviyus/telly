import type * as Effect from "effect/Effect";

import type { Bot } from "../BotApi.js";
import type {
  ConversationRecord,
  ConversationStoreError,
  ConversationStoreService,
} from "../ConversationStore.js";
import type { Update } from "../types.generated.js";

export const ConversationTypeId = Symbol.for("telly/Conversation");

export interface ConversationRuntime<out E> {
  readonly handle: (
    record: ConversationRecord,
    update: Update,
    scope: string,
    botId: number,
  ) => Effect.Effect<boolean, E | ConversationStoreError, Bot>;
  readonly name: string;
  readonly store: ConversationStoreService;
}

export interface ConversationProtocol<out E> {
  readonly [ConversationTypeId]: ConversationRuntime<E>;
}

export type ConversationProtocolError<Value> = Value extends ConversationProtocol<infer E>
  ? E
  : never;
