import { messageSender, type MessageSender } from "./Message.js";
import type { Chat, Message, Update, User } from "./types.generated.js";

export interface UpdateContext {
  readonly chat?: Chat;
  readonly message?: Message;
  readonly sender?: MessageSender;
  readonly user?: User;
}

function userContext(user: User, chat?: Chat): UpdateContext {
  return {
    ...(chat === undefined ? {} : { chat }),
    sender: { type: "user", user },
    user,
  };
}

function messageContext(message: Message): UpdateContext {
  const sender = messageSender(message);
  return {
    chat: message.chat,
    message,
    ...(sender === undefined ? {} : { sender }),
    ...(message.from === undefined ? {} : { user: message.from }),
  };
}

/** Derives the chat, accessible message, acting sender, and user from any known update. */
export function updateContext(update: Update): UpdateContext {
  const message = update.message ?? update.editedMessage ?? update.channelPost ??
    update.editedChannelPost ?? update.businessMessage ?? update.editedBusinessMessage ??
    update.guestMessage;
  if (message !== undefined) return messageContext(message);

  const callback = update.callbackQuery;
  if (callback !== undefined) {
    return {
      ...(callback.message === undefined ? {} : { chat: callback.message.chat }),
      ...(callback.message === undefined || callback.message.date === 0
        ? {}
        : { message: callback.message as Message }),
      sender: { type: "user", user: callback.from },
      user: callback.from,
    };
  }

  const directUser = update.inlineQuery?.from ?? update.chosenInlineResult?.from ??
    update.shippingQuery?.from ?? update.preCheckoutQuery?.from ??
    update.purchasedPaidMedia?.from ?? update.businessConnection?.user ??
    update.managedBot?.user ?? update.subscription?.user;
  if (directUser !== undefined) return userContext(directUser);

  const membership = update.myChatMember ?? update.chatMember ?? update.chatJoinRequest;
  if (membership !== undefined) return userContext(membership.from, membership.chat);

  const pollAnswer = update.pollAnswer;
  if (pollAnswer !== undefined) {
    if (pollAnswer.voterChat !== undefined) {
      return { sender: { chat: pollAnswer.voterChat, type: "chat" } };
    }
    return pollAnswer.user === undefined ? {} : userContext(pollAnswer.user);
  }

  const reaction = update.messageReaction;
  if (reaction !== undefined) {
    if (reaction.actorChat !== undefined) {
      return { chat: reaction.chat, sender: { chat: reaction.actorChat, type: "chat" } };
    }
    return reaction.user === undefined ? { chat: reaction.chat } : userContext(
      reaction.user,
      reaction.chat,
    );
  }

  const boost = update.chatBoost;
  if (boost !== undefined) {
    const boostUser = boost.boost.source.user;
    return boostUser === undefined ? { chat: boost.chat } : userContext(boostUser, boost.chat);
  }
  const removedBoost = update.removedChatBoost;
  if (removedBoost !== undefined) {
    const boostUser = removedBoost.source.user;
    return boostUser === undefined
      ? { chat: removedBoost.chat }
      : userContext(boostUser, removedBoost.chat);
  }

  const chat = update.deletedBusinessMessages?.chat ?? update.messageReactionCount?.chat ??
    update.stoppedMessageGeneration?.chat;
  return chat === undefined ? {} : { chat };
}
