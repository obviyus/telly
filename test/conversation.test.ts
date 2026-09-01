import { expect, test } from "bun:test";

import {
  Application,
  reply,
  respond,
  type InaccessibleMessage,
  type Message,
} from "../index.ts";
import { FakeBotApi } from "../testing.ts";

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
