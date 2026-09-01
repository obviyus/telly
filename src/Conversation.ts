import type * as Effect from "effect/Effect";

import { Bot, type BotApiError } from "./BotApi.js";
import { sendMessage, type SendMessageParams } from "./methods.generated.js";
import type { Message, ReplyParameters } from "./types.generated.js";

export type ConversationMessage = Pick<Message, "chat" | "messageId"> &
  Partial<
    Pick<
      Message,
      | "businessConnectionId"
      | "directMessagesTopic"
      | "ephemeralMessageId"
      | "isTopicMessage"
      | "messageThreadId"
      | "receiverUser"
    >
  >;

export interface ConversationTarget {
  readonly businessConnectionId?: string;
  readonly chatId: number;
  readonly directMessagesTopicId?: number;
  readonly ephemeralMessageParameters?: { readonly receiverUserId: number };
  readonly messageThreadId?: number;
}

export type ReplyOptions = Pick<
  ReplyParameters,
  | "allowSendingWithoutReply"
  | "checklistTaskId"
  | "pollOptionId"
  | "quote"
  | "quoteEntities"
  | "quoteParseMode"
  | "quotePosition"
>;

export interface ReplyTarget extends ConversationTarget {
  readonly replyParameters: ReplyParameters;
}

/** sendMessage options whose conversation and reply fields come from the triggering message. */
export type ConversationMessageOptions = Omit<
  SendMessageParams,
  keyof ReplyTarget
>;

function options(input: string | ConversationMessageOptions): ConversationMessageOptions {
  return typeof input === "string" ? { text: input } : input;
}

/** Derives the destination fields accepted by generated send methods. */
export function respondTo(message: ConversationMessage): ConversationTarget {
  const target: ConversationTarget = {
    ...(message.businessConnectionId === undefined
      ? {}
      : { businessConnectionId: message.businessConnectionId }),
    chatId: message.chat.id,
    ...(message.directMessagesTopic === undefined
      ? {}
      : { directMessagesTopicId: message.directMessagesTopic.topicId }),
    ...(message.isTopicMessage === true && message.messageThreadId !== undefined
      ? { messageThreadId: message.messageThreadId }
      : {}),
  };
  if (message.ephemeralMessageId === undefined) return target;
  const receiverUserId = message.receiverUser?.id;
  if (receiverUserId === undefined) throw new RangeError("Ephemeral message has no receiverUser");
  return { ...target, ephemeralMessageParameters: { receiverUserId } };
}

/** Derives destination and reply fields accepted by generated send methods. */
export function replyTo(
  message: ConversationMessage,
  options: ReplyOptions = {},
): ReplyTarget {
  return {
    ...respondTo(message),
    replyParameters: {
      ...options,
      ...(message.ephemeralMessageId === undefined
        ? { messageId: message.messageId }
        : { ephemeralMessageId: message.ephemeralMessageId }),
    },
  };
}

/** Sends a new message to the triggering message's conversation without quoting it. */
export function respond(
  message: ConversationMessage,
  input: string | ConversationMessageOptions,
): Effect.Effect<Message, BotApiError, Bot> {
  return sendMessage({ ...options(input), ...respondTo(message) });
}

/** Sends a new message that quotes the triggering message. */
export function reply(
  message: ConversationMessage,
  input: string | ConversationMessageOptions,
): Effect.Effect<Message, BotApiError, Bot> {
  return sendMessage({
    ...options(input),
    ...replyTo(message),
  });
}
