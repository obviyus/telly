import { expect, test } from "bun:test";

import {
  Application,
  MemoryConversations,
  MemoryJobs,
  type Update,
} from "../index.ts";
import { beginnerBot } from "../examples/beginner/bot.ts";
import { makeOrderBot } from "../examples/conversations/bot.ts";
import { makeProductionBot } from "../examples/production/bot.ts";
import { FakeBotApi } from "../testing.ts";

const token = "123456:reference-bots";
const user = { firstName: "Ada", id: 71, isBot: false } as const;

test("beginner bot welcomes the user on start", async () => {
  const fake = FakeBotApi.make({ token });
  const app = Application.make({ httpClient: fake.layer, rateLimit: false, token });
  const update: Update = {
    message: {
      chat: { id: 101, type: "private" },
      date: 1_700_000_000,
      entities: [{ length: 6, offset: 0, type: "bot_command" }],
      from: user,
      messageId: 11,
      text: "/start",
    },
    updateId: 11,
  };

  try {
    await app.run(beginnerBot(update));
  } finally {
    await app.close();
  }

  expect(fake.requests[0]?.params).toEqual({
    chat_id: 101,
    text: "Hi! Send me anything.",
  });
});

test("beginner bot echoes ordinary text as a reply", async () => {
  const fake = FakeBotApi.make({ token });
  const app = Application.make({ httpClient: fake.layer, rateLimit: false, token });
  const update: Update = {
    message: {
      chat: { id: 102, type: "private" },
      date: 1_700_000_001,
      from: user,
      messageId: 12,
      text: "echo this",
    },
    updateId: 12,
  };

  try {
    await app.run(beginnerBot(update));
  } finally {
    await app.close();
  }

  expect(fake.requests[0]?.params).toEqual({
    chat_id: 102,
    reply_parameters: { message_id: 12 },
    text: "echo this",
  });
});

test("interactive bot completes an order conversation", async () => {
  const fake = FakeBotApi.make({ token });
  const app = Application.make({ httpClient: fake.layer, rateLimit: false, token });
  const bot = makeOrderBot(MemoryConversations.make());
  const order: Update = {
    message: {
      chat: { id: 103, type: "private" },
      date: 1_700_000_002,
      entities: [{ length: 6, offset: 0, type: "bot_command" }],
      from: user,
      messageId: 13,
      text: "/order",
    },
    updateId: 13,
  };
  const note: Update = {
    message: {
      chat: { id: 103, type: "private" },
      date: 1_700_000_004,
      from: user,
      messageId: 15,
      text: "No onions",
    },
    updateId: 15,
  };

  try {
    await app.run(bot(order));
    const confirmationParams = fake.requests[0]?.params;
    if (typeof confirmationParams !== "object" || confirmationParams === null) {
      throw new Error("Confirmation request has no parameters");
    }
    const replyMarkup = Reflect.get(confirmationParams, "reply_markup");
    if (typeof replyMarkup !== "object" || replyMarkup === null) {
      throw new Error("Confirmation request has no inline keyboard");
    }
    const inlineKeyboard = Reflect.get(replyMarkup, "inline_keyboard");
    const firstRow = Array.isArray(inlineKeyboard) ? inlineKeyboard[0] : undefined;
    const yesButton = Array.isArray(firstRow) ? firstRow[0] : undefined;
    const callbackData = typeof yesButton === "object" && yesButton !== null
      ? Reflect.get(yesButton, "callback_data")
      : undefined;
    if (typeof callbackData !== "string") throw new Error("Yes button has no callback data");
    const confirmed: Update = {
      callbackQuery: {
        chatInstance: "order-chat",
        data: callbackData,
        from: user,
        id: "callback-42",
        message: {
          chat: { id: 103, type: "private" },
          date: 1_700_000_003,
          messageId: 14,
        },
      },
      updateId: 14,
    };
    await app.run(bot(confirmed));
    await app.run(bot(note));
  } finally {
    await app.close();
  }

  const confirmationCall = fake.requests.find((call) => call.method === "sendMessage");
  const answerCall = fake.requests.find((call) => call.method === "answerCallbackQuery");
  const finalCall = fake.requests.find((call) => {
    if (call.method !== "sendMessage" || typeof call.params !== "object" || call.params === null) {
      return false;
    }
    return Reflect.get(call.params, "text") === "Order 42: No onions";
  });
  expect(confirmationCall?.params).toMatchObject({
    chat_id: 103,
    reply_markup: { inline_keyboard: [[{ text: "Yes" }, { text: "No" }]] },
    text: "Confirm order 42?",
  });
  expect(answerCall?.params).toEqual({ callback_query_id: "callback-42" });
  expect(finalCall?.params).toMatchObject({ chat_id: 103, text: "Order 42: No onions" });
});

test("production bot accepts a reminder through its webhook", async () => {
  const secretToken = "production_reference_secret";
  const fake = FakeBotApi.make({ token });
  const { bot, jobs } = makeProductionBot(MemoryJobs.make());
  const app = Application.make({ httpClient: fake.layer, jobs, rateLimit: false, token });
  const webhook = app.startWebhook(bot, { secretToken });
  const request = new Request("https://bot.example/telegram", {
    body: JSON.stringify({
      message: {
        chat: { id: 104, type: "private" },
        date: 1_700_000_005,
        entities: [{ length: 7, offset: 0, type: "bot_command" }],
        from: { first_name: "Ada", id: 71, is_bot: false },
        message_id: 16,
        text: "/remind Drink water",
      },
      update_id: 16,
    }),
    headers: {
      "content-type": "application/json",
      "x-telegram-bot-api-secret-token": secretToken,
    },
    method: "POST",
  });

  try {
    const response = await webhook.fetch(request);
    expect(response.status).toBe(200);
  } finally {
    await app.close();
  }

  const reply = fake.requests.find((call) => call.method === "sendMessage");
  expect(reply?.params).toMatchObject({
    chat_id: 104,
    text: "Reminder scheduled for 10 seconds.",
  });
});
