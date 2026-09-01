import * as Effect from "effect/Effect";

import { Bot, type BotApiError } from "./BotApi.js";
import {
  answerCallbackQuery,
  type AnswerCallbackQueryParams,
} from "./methods.generated.js";
import type { CallbackQuery, Message } from "./types.generated.js";

export type AnswerCallbackOptions = Omit<AnswerCallbackQueryParams, "callbackQueryId">;

export type CallbackTarget =
  | { readonly inlineMessageId: string }
  | {
    readonly businessConnectionId?: string;
    readonly chatId: number;
    readonly messageId: number;
  }
  | {
    readonly chatId: number;
    readonly ephemeralMessageId: number;
    readonly receiverUserId: number;
  };

/** Answers a callback query and closes the client's loading state. */
export const answerCallback = Effect.fn("answerCallback")(function* (
  query: CallbackQuery,
  options: AnswerCallbackOptions = {},
): Effect.fn.Return<true, BotApiError, Bot> {
  return yield* answerCallbackQuery({ ...options, callbackQueryId: query.id });
});

/** Derives the fields required to edit the message behind a callback query. */
export function callbackTarget(query: CallbackQuery): CallbackTarget {
  if (query.inlineMessageId !== undefined) {
    return { inlineMessageId: query.inlineMessageId };
  }
  const message = query.message;
  if (message === undefined) {
    throw new RangeError("CallbackQuery has neither message nor inlineMessageId");
  }
  const accessible = message.date === 0 ? undefined : message as Message;
  if (accessible?.ephemeralMessageId !== undefined) {
    return {
      chatId: accessible.chat.id,
      ephemeralMessageId: accessible.ephemeralMessageId,
      receiverUserId: accessible.receiverUser?.id ?? query.from.id,
    };
  }
  return {
    ...(accessible?.businessConnectionId === undefined
      ? {}
      : { businessConnectionId: accessible.businessConnectionId }),
    chatId: message.chat.id,
    messageId: message.messageId,
  };
}
