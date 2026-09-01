import type * as Effect from "effect/Effect";

import { Bot, type BotApiError } from "./BotApi.js";
import { sendMessage, type SendMessageParams } from "./methods.generated.js";
import type { Message } from "./types.generated.js";

type DerivedConversationField =
  | "businessConnectionId"
  | "chatId"
  | "directMessagesTopicId"
  | "messageThreadId"
  | "replyParameters";

export type ConversationMessage = Pick<Message, "chat" | "messageId"> &
  Partial<
    Pick<
      Message,
      | "businessConnectionId"
      | "directMessagesTopic"
      | "ephemeralMessageId"
      | "isTopicMessage"
      | "messageThreadId"
    >
  >;

/** sendMessage options whose conversation and reply fields come from the triggering message. */
export type ConversationMessageOptions = Omit<
  SendMessageParams,
  DerivedConversationField
>;

type ConversationMessageInput = string | ConversationMessageOptions;

function options(input: ConversationMessageInput): ConversationMessageOptions {
  return typeof input === "string" ? { text: input } : input;
}

function destination(message: ConversationMessage) {
  return {
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
}

/** Sends a new message to the triggering message's conversation without quoting it. */
export function respond(
  message: ConversationMessage,
  input: ConversationMessageInput,
): Effect.Effect<Message, BotApiError, Bot> {
  return sendMessage({ ...options(input), ...destination(message) });
}

/** Sends a new message that quotes the triggering message. */
export function reply(
  message: ConversationMessage,
  input: ConversationMessageInput,
): Effect.Effect<Message, BotApiError, Bot> {
  return sendMessage({
    ...options(input),
    ...destination(message),
    replyParameters: message.ephemeralMessageId === undefined
      ? { messageId: message.messageId }
      : { ephemeralMessageId: message.ephemeralMessageId },
  });
}
