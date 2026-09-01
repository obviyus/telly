import { expect, test } from "bun:test";

import { updateContext, type Chat, type Message, type Update, type User } from "../index.ts";

const chat: Chat = { id: -100107, title: "Telly", type: "supergroup" };
const user: User = { firstName: "Ada", id: 109, isBot: false };

function update(fields: Partial<Update> = {}): Update {
  return { updateId: 111, ...fields };
}

function message(fields: Partial<Message> = {}): Message {
  return { chat, date: 1_700_000_000, messageId: 113, ...fields };
}

test("updateContext derives message, chat, user, and real sender", () => {
  const senderChat: Chat = { id: -100115, title: "Channel", type: "channel" };
  const incoming = message({ from: user, senderChat, text: "hello" });

  expect(updateContext(update({ message: incoming }))).toEqual({
    chat,
    message: incoming,
    sender: { chat: senderChat, type: "chat" },
    user,
  });
});

test("updateContext covers every message-bearing update variant", () => {
  const incoming = message({ from: user, text: "variant" });
  const contexts = [
    updateContext(update({ message: incoming })),
    updateContext(update({ editedMessage: incoming })),
    updateContext(update({ channelPost: incoming })),
    updateContext(update({ editedChannelPost: incoming })),
    updateContext(update({ businessMessage: incoming })),
    updateContext(update({ editedBusinessMessage: incoming })),
    updateContext(update({ guestMessage: incoming })),
  ];

  for (const context of contexts) {
    expect(context).toEqual({
      chat,
      message: incoming,
      sender: { type: "user", user },
      user,
    });
  }
});

test("updateContext derives callback context but excludes inaccessible messages", () => {
  const accessible = message({ messageId: 117 });

  expect(updateContext(update({
    callbackQuery: {
      chatInstance: "callback-context",
      from: user,
      id: "callback-119",
      message: accessible,
    },
  }))).toEqual({
    chat,
    message: accessible,
    sender: { type: "user", user },
    user,
  });
  expect(updateContext(update({
    callbackQuery: {
      chatInstance: "inaccessible-context",
      from: user,
      id: "callback-121",
      message: { chat, date: 0, messageId: 123 },
    },
  }))).toEqual({
    chat,
    sender: { type: "user", user },
    user,
  });
});

test("updateContext distinguishes anonymous poll and reaction senders", () => {
  const voterChat: Chat = { id: -100125, title: "Voter", type: "channel" };
  const actorChat: Chat = { id: -100127, title: "Actor", type: "channel" };

  expect(updateContext(update({
    pollAnswer: {
      optionIds: [1],
      optionPersistentIds: ["option-1"],
      pollId: "poll-129",
      voterChat,
    },
  }))).toEqual({ sender: { chat: voterChat, type: "chat" } });
  expect(updateContext(update({
    messageReaction: {
      actorChat,
      chat,
      date: 1_700_000_001,
      messageId: 131,
      newReaction: [],
      oldReaction: [],
    },
  }))).toEqual({ chat, sender: { chat: actorChat, type: "chat" } });
});

test("updateContext covers current user and chat-only update variants", () => {
  expect(updateContext(update({ subscription: {
    invoicePayload: "subscription-133",
    state: "active",
    user,
  } }))).toEqual({ sender: { type: "user", user }, user });
  expect(updateContext(update({ stoppedMessageGeneration: {
    chat,
    draftId: 135,
  } }))).toEqual({ chat });
  expect(updateContext(update())).toEqual({});
});

test("updateContext covers every non-message user source", () => {
  const shippingAddress = {
    city: "London",
    countryCode: "GB",
    postCode: "N1",
    state: "",
    streetLine1: "17 Telly Street",
    streetLine2: "",
  };
  const contexts = [
    updateContext(update({ inlineQuery: { from: user, id: "inline-137", offset: "", query: "q" } })),
    updateContext(update({ chosenInlineResult: {
      from: user,
      query: "q",
      resultId: "result-139",
    } })),
    updateContext(update({ shippingQuery: {
      from: user,
      id: "shipping-141",
      invoicePayload: "invoice",
      shippingAddress,
    } })),
    updateContext(update({ preCheckoutQuery: {
      currency: "XTR",
      from: user,
      id: "checkout-143",
      invoicePayload: "invoice",
      totalAmount: 5,
    } })),
    updateContext(update({ purchasedPaidMedia: { from: user, paidMediaPayload: "media-145" } })),
    updateContext(update({ businessConnection: {
      date: 1_700_000_002,
      id: "business-147",
      isEnabled: true,
      user,
      userChatId: 149,
    } })),
    updateContext(update({ managedBot: {
      bot: { firstName: "Managed", id: 151, isBot: true },
      user,
    } })),
    updateContext(update({ subscription: {
      invoicePayload: "subscription-153",
      state: "active",
      user,
    } })),
  ];

  for (const context of contexts) {
    expect(context).toEqual({ sender: { type: "user", user }, user });
  }
});

test("updateContext covers membership, boost, and chat-only sources", () => {
  const member = { isAnonymous: false, status: "creator" as const, user };
  const myMemberContext = updateContext(update({ myChatMember: {
    chat,
    date: 1_700_000_003,
    from: user,
    newChatMember: member,
    oldChatMember: member,
  } }));
  const memberContext = updateContext(update({ chatMember: {
    chat,
    date: 1_700_000_003,
    from: user,
    newChatMember: member,
    oldChatMember: member,
  } }));
  const joinContext = updateContext(update({ chatJoinRequest: {
    chat,
    date: 1_700_000_003,
    from: user,
    userChatId: 155,
  } }));
  const boostContext = updateContext(update({ chatBoost: {
    boost: {
      addDate: 1_700_000_004,
      boostId: "boost-157",
      expirationDate: 1_800_000_000,
      source: { source: "premium", user },
    },
    chat,
  } }));
  const unclaimedBoostContext = updateContext(update({ removedChatBoost: {
    boostId: "boost-159",
    chat,
    removeDate: 1_700_000_005,
    source: { giveawayMessageId: 161, isUnclaimed: true, source: "giveaway" },
  } }));
  const unclaimedActiveBoostContext = updateContext(update({ chatBoost: {
    boost: {
      addDate: 1_700_000_005,
      boostId: "boost-160",
      expirationDate: 1_800_000_000,
      source: { giveawayMessageId: 162, isUnclaimed: true, source: "giveaway" },
    },
    chat,
  } }));
  const deletedContext = updateContext(update({ deletedBusinessMessages: {
    businessConnectionId: "business-163",
    chat,
    messageIds: [165],
  } }));
  const reactionCountContext = updateContext(update({ messageReactionCount: {
    chat,
    date: 1_700_000_006,
    messageId: 167,
    reactions: [],
  } }));

  expect(myMemberContext).toEqual({ chat, sender: { type: "user", user }, user });
  expect(memberContext).toEqual({ chat, sender: { type: "user", user }, user });
  expect(joinContext).toEqual({ chat, sender: { type: "user", user }, user });
  expect(boostContext).toEqual({ chat, sender: { type: "user", user }, user });
  expect(unclaimedBoostContext).toEqual({ chat });
  expect(unclaimedActiveBoostContext).toEqual({ chat });
  expect(deletedContext).toEqual({ chat });
  expect(reactionCountContext).toEqual({ chat });
});
