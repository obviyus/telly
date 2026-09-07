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

function messageUpdateContext(update: Update): UpdateContext | undefined {
  const message =
    update.message ??
    update.editedMessage ??
    update.channelPost ??
    update.editedChannelPost ??
    update.businessMessage ??
    update.editedBusinessMessage ??
    update.guestMessage;
  return message === undefined ? undefined : messageContext(message);
}

function directUserContext(update: Update): UpdateContext | undefined {
  const directUser =
    update.inlineQuery?.from ??
    update.chosenInlineResult?.from ??
    update.shippingQuery?.from ??
    update.preCheckoutQuery?.from ??
    update.purchasedPaidMedia?.from ??
    update.businessConnection?.user ??
    update.managedBot?.user ??
    update.subscription?.user;
  return directUser === undefined ? undefined : userContext(directUser);
}

function actorContext(user: User | undefined, chat?: Chat, actorChat?: Chat): UpdateContext {
  const context = chat === undefined ? {} : { chat };
  if (actorChat !== undefined) {
    return { ...context, sender: { chat: actorChat, type: "chat" } };
  }
  return user === undefined ? context : userContext(user, chat);
}

/** Derives the chat, accessible message, acting sender, and user from any known update. */
export function updateContext(update: Update): UpdateContext {
  const message = messageUpdateContext(update);
  if (message !== undefined) return message;

  const callback = update.callbackQuery;
  if (callback !== undefined) {
    return {
      ...userContext(callback.from, callback.message?.chat),
      ...(callback.message === undefined || callback.message.date === 0
        ? {}
        : { message: callback.message as Message }),
    };
  }

  const directUser = directUserContext(update);
  if (directUser !== undefined) return directUser;

  const membership = update.myChatMember ?? update.chatMember ?? update.chatJoinRequest;
  if (membership !== undefined) return userContext(membership.from, membership.chat);

  const pollAnswer = update.pollAnswer;
  if (pollAnswer !== undefined) {
    return actorContext(pollAnswer.user, undefined, pollAnswer.voterChat);
  }

  const reaction = update.messageReaction;
  if (reaction !== undefined) {
    return actorContext(reaction.user, reaction.chat, reaction.actorChat);
  }

  const boost = update.chatBoost;
  if (boost !== undefined) {
    return actorContext(boost.boost.source.user, boost.chat);
  }
  const removedBoost = update.removedChatBoost;
  if (removedBoost !== undefined) {
    return actorContext(removedBoost.source.user, removedBoost.chat);
  }

  const chat =
    update.deletedBusinessMessages?.chat ??
    update.messageReactionCount?.chat ??
    update.stoppedMessageGeneration?.chat;
  return chat === undefined ? {} : { chat };
}
