import { expect, test } from "bun:test";

import {
  answerCallback,
  Application,
  callbackTarget,
  type CallbackQuery,
  type Message,
  type User,
} from "../index.ts";
import { FakeBotApi, FakeBotApiReply } from "../testing.ts";

const token = "123456:callback-query-test";
const user: User = { firstName: "Ada", id: 71, isBot: false };

function query(fields: Partial<CallbackQuery> = {}): CallbackQuery {
  return {
    chatInstance: "callback-chat",
    from: user,
    id: "callback-73",
    ...fields,
  };
}

function message(fields: Partial<Message> = {}): Message {
  return {
    chat: { id: 75, type: "private" },
    date: 1_700_000_000,
    messageId: 77,
    ...fields,
  };
}

test("answerCallback derives the callback query identifier", async () => {
  const fake = FakeBotApi.make({ replies: [FakeBotApiReply.ok(true)], token });
  const app = Application.make({ httpClient: fake.layer, token });

  try {
    const answered = await app.run(answerCallback(query(), {
      showAlert: true,
      text: "Saved",
    }));

    expect(answered).toBe(true);
    expect(fake.requests[0]?.params).toEqual({
      callback_query_id: "callback-73",
      show_alert: true,
      text: "Saved",
    });
  } finally {
    await app.close();
  }
});

test("callbackTarget derives inline, business, and inaccessible edit targets", () => {
  expect(callbackTarget(query({
    inlineMessageId: "inline-79",
    message: message(),
  }))).toEqual({ inlineMessageId: "inline-79" });
  expect(callbackTarget(query({
    message: message({ businessConnectionId: "business-81" }),
  }))).toEqual({
    businessConnectionId: "business-81",
    chatId: 75,
    messageId: 77,
  });
  expect(callbackTarget(query({
    message: { chat: { id: 83, type: "supergroup" }, date: 0, messageId: 85 },
  }))).toEqual({ chatId: 83, messageId: 85 });
});

test("callbackTarget derives an ephemeral edit target", () => {
  expect(callbackTarget(query({
    message: message({
      ephemeralMessageId: 87,
      receiverUser: { firstName: "Grace", id: 89, isBot: false },
    }),
  }))).toEqual({
    chatId: 75,
    ephemeralMessageId: 87,
    receiverUserId: 89,
  });
  expect(callbackTarget(query({
    message: message({ ephemeralMessageId: 91 }),
  }))).toEqual({
    chatId: 75,
    ephemeralMessageId: 91,
    receiverUserId: 71,
  });
});

test("callbackTarget rejects a callback without a Telegram edit target", () => {
  expect(() => callbackTarget(query())).toThrow(
    "CallbackQuery has neither message nor inlineMessageId",
  );
});
