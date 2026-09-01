import { expect, test } from "bun:test";

import {
  Application,
  reply,
  replyTo,
  respond,
  respondTo,
  sendChatAction,
  type InaccessibleMessage,
  type Message,
} from "../index.ts";
import { FakeBotApi, FakeBotApiReply } from "../testing.ts";

const token = "123456:conversation-test";

function sourceMessage(): Message {
  return {
    businessConnectionId: "business-17",
    chat: { id: -1007001, type: "supergroup" },
    date: 1_700_000_000,
    directMessagesTopic: { topicId: 83 },
    isTopicMessage: true,
    messageId: 41,
    messageThreadId: 29,
    text: "source",
  };
}

test("respond derives the complete conversation destination without quoting", async () => {
  const fake = FakeBotApi.make({ token });
  const app = Application.make({ httpClient: fake.layer, token });

  try {
    const sent = await app.run(respond(sourceMessage(), {
      disableNotification: true,
      parseMode: "HTML",
      text: "response",
    }));

    expect(sent.text).toBe("response");
    expect(fake.requests[0]?.params).toEqual({
      business_connection_id: "business-17",
      chat_id: -1007001,
      direct_messages_topic_id: 83,
      disable_notification: true,
      message_thread_id: 29,
      parse_mode: "HTML",
      text: "response",
    });
  } finally {
    await app.close();
  }
});

test("respondTo and replyTo compose with every generated send method", () => {
  expect(respondTo(sourceMessage())).toEqual({
    businessConnectionId: "business-17",
    chatId: -1007001,
    directMessagesTopicId: 83,
    messageThreadId: 29,
  });
  expect(replyTo(sourceMessage(), {
    quote: "source",
    quotePosition: 0,
  })).toEqual({
    businessConnectionId: "business-17",
    chatId: -1007001,
    directMessagesTopicId: 83,
    messageThreadId: 29,
    replyParameters: {
      messageId: 41,
      quote: "source",
      quotePosition: 0,
    },
  });
});

test("replyTo preserves an ephemeral receiver and message identifier", () => {
  const receiver = { firstName: "Ada", id: 45, isBot: false };
  const ephemeral = sourceMessage();
  const target = replyTo({
    ...ephemeral,
    ephemeralMessageId: 47,
    receiverUser: receiver,
  });

  expect(target).toMatchObject({
    ephemeralMessageParameters: { receiverUserId: 45 },
    replyParameters: { ephemeralMessageId: 47 },
  });
});

test("reply encodes an ephemeral recipient and reply identifier", async () => {
  const fake = FakeBotApi.make({ token });
  const app = Application.make({ httpClient: fake.layer, token });
  const message: Message = {
    chat: { id: 7004, type: "private" },
    date: 1_700_000_002,
    ephemeralMessageId: 49,
    messageId: 0,
    receiverUser: { firstName: "Ada", id: 51, isBot: false },
  };

  try {
    await app.run(reply(message, "ephemeral reply"));

    expect(fake.requests[0]?.params).toEqual({
      chat_id: 7004,
      ephemeral_message_parameters: { receiver_user_id: 51 },
      reply_parameters: { ephemeral_message_id: 49 },
      text: "ephemeral reply",
    });
  } finally {
    await app.close();
  }
});

test("generated methods keep only the target fields they support", async () => {
  const fake = FakeBotApi.make({ replies: [FakeBotApiReply.ok(true)], token });
  const app = Application.make({ httpClient: fake.layer, token });
  const message: Message = {
    chat: { id: 7005, type: "private" },
    date: 1_700_000_003,
    ephemeralMessageId: 53,
    messageId: 0,
    receiverUser: { firstName: "Grace", id: 55, isBot: false },
  };

  try {
    await app.run(sendChatAction({ ...respondTo(message), action: "typing" }));

    expect(fake.requests[0]?.params).toEqual({ action: "typing", chat_id: 7005 });
  } finally {
    await app.close();
  }
});

test("respondTo rejects an ephemeral message without its receiver", () => {
  expect(() => respondTo({
    chat: { id: 7006, type: "private" },
    ephemeralMessageId: 57,
    messageId: 0,
  })).toThrow("Ephemeral message has no receiverUser");
});

test("reply quotes the triggering message", async () => {
  const fake = FakeBotApi.make({ token });
  const app = Application.make({ httpClient: fake.layer, token });

  try {
    await app.run(reply(sourceMessage(), "quoted response"));

    expect(fake.requests[0]?.params).toMatchObject({
      chat_id: -1007001,
      reply_parameters: { message_id: 41 },
      text: "quoted response",
    });
  } finally {
    await app.close();
  }
});

test("respond omits a non-topic message thread identifier", async () => {
  const fake = FakeBotApi.make({ token });
  const app = Application.make({ httpClient: fake.layer, token });
  const message: Message = {
    chat: { id: -1007002, type: "supergroup" },
    date: 1_700_000_001,
    messageId: 42,
    messageThreadId: 31,
    text: "ordinary group reply",
  };

  try {
    await app.run(respond(message, "group response"));

    expect(fake.requests[0]?.params).toEqual({
      chat_id: -1007002,
      text: "group response",
    });
  } finally {
    await app.close();
  }
});

test("respond accepts an inaccessible callback-query message", async () => {
  const fake = FakeBotApi.make({ token });
  const app = Application.make({ httpClient: fake.layer, token });
  const message: InaccessibleMessage = {
    chat: { id: 7003, type: "private" },
    date: 0,
    messageId: 43,
  };

  try {
    await app.run(respond(message, "callback response"));

    expect(fake.requests[0]?.params).toEqual({
      chat_id: 7003,
      text: "callback response",
    });
  } finally {
    await app.close();
  }
});
