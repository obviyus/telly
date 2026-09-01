import { expect, test } from "bun:test";
import { Effect, Layer, Redacted } from "effect";

import {
  Application,
  Bot,
  BotApiError,
  getUpdates,
  sendMediaGroup,
  sendMessage,
  setMyCommands,
  setMyName,
} from "../index.ts";
import { FakeBotApi, FakeBotApiReply } from "../testing.ts";

const token = "123456:request-validation-test";

async function rejected(
  operation: Effect.Effect<unknown, BotApiError, Bot>,
  fake: FakeBotApi,
): Promise<BotApiError> {
  const app = Application.make({ httpClient: fake.layer, token });
  try {
    await app.run(operation);
  } catch (error) {
    expect(fake.requests).toHaveLength(0);
    if (error instanceof BotApiError) return error;
    throw error;
  } finally {
    await app.close();
  }
  throw new Error("Expected Telly to reject the request before transport");
}

test("nested callback data over 64 UTF-8 bytes is rejected before transport", async () => {
  const fake = FakeBotApi.make({ token });
  const callbackData = "🔒".repeat(17);

  const error = await rejected(sendMessage({
    chatId: 17,
    replyMarkup: { inlineKeyboard: [[{ callbackData, text: "Open" }]] },
    text: "Choose",
  }), fake);

  expect(error.reason).toEqual({
    _tag: "InvalidRequest",
    issues: [{
      message: "expected 1–64 UTF-8 bytes, received 68",
      path: "replyMarkup.inlineKeyboard[0][0].callbackData",
    }],
  });
  expect(error.message).not.toContain(callbackData);
  expect(error.retrySafe).toBe(true);
});

test("a callback data value at the UTF-8 byte boundary is sent", async () => {
  const fake = FakeBotApi.make({ token });
  const app = Application.make({ httpClient: fake.layer, token });

  try {
    await app.run(sendMessage({
      chatId: 19,
      replyMarkup: {
        inlineKeyboard: [[{ callbackData: "🔒".repeat(16), text: "Open" }]],
      },
      text: "Choose",
    }));

    expect(fake.requests).toHaveLength(1);
  } finally {
    await app.close();
  }
});

test("response decoding does not apply outgoing request constraints", async () => {
  const callbackData = "r".repeat(65);
  const fake = FakeBotApi.make({
    replies: [FakeBotApiReply.ok({
      chat: { id: 21, type: "private" },
      date: 1_700_000_000,
      message_id: 41,
      reply_markup: {
        inline_keyboard: [[{ callback_data: callbackData, text: "Old" }]],
      },
    })],
    token,
  });
  const app = Application.make({ httpClient: fake.layer, token });

  try {
    const message = await app.run(sendMessage({ chatId: 21, text: "New" }));

    expect(message.replyMarkup?.inlineKeyboard[0]?.[0]?.callbackData).toBe(callbackData);
  } finally {
    await app.close();
  }
});

test("documented numeric and array ranges reject invalid requests", async () => {
  const limited = await rejected(getUpdates({ limit: 101 }), FakeBotApi.make({ token }));
  expect(limited.reason).toMatchObject({
    _tag: "InvalidRequest",
    issues: [{ message: "expected 1–100, received 101", path: "limit" }],
  });

  const media = await rejected(sendMediaGroup({
    chatId: 23,
    media: [{ media: "telegram-file-id", type: "photo" }],
  }), FakeBotApi.make({ token }));
  expect(media.reason).toMatchObject({
    _tag: "InvalidRequest",
    issues: [{ message: "expected 2–10 items, received 1", path: "media" }],
  });
});

test("documented string lengths and patterns reject invalid requests", async () => {
  const name = await rejected(setMyName({ name: "n".repeat(65) }), FakeBotApi.make({ token }));
  expect(name.reason).toMatchObject({
    _tag: "InvalidRequest",
    issues: [{ message: "expected 0–64 characters, received 65", path: "name" }],
  });

  const command = await rejected(setMyCommands({
    commands: [{ command: "Not-Allowed", description: "Invalid command" }],
  }), FakeBotApi.make({ token }));
  expect(command.reason).toMatchObject({
    _tag: "InvalidRequest",
    issues: [{
      message: "expected lowercase English letters, digits, and underscores",
      path: "commands[0].command",
    }],
  });
});

test("character limits count astral Unicode as code points", async () => {
  const passingFake = FakeBotApi.make({ replies: [FakeBotApiReply.ok(true)], token });
  const app = Application.make({ httpClient: passingFake.layer, token });
  try {
    await app.run(setMyName({ name: "🔒".repeat(64) }));
    expect(passingFake.requests).toHaveLength(1);
  } finally {
    await app.close();
  }

  const error = await rejected(
    setMyName({ name: "🔒".repeat(65) }),
    FakeBotApi.make({ token }),
  );
  expect(error.reason).toMatchObject({
    _tag: "InvalidRequest",
    issues: [{ message: "expected 0–64 characters, received 65", path: "name" }],
  });
});

test("raw calls keep day-zero access and bypass typed constraints", async () => {
  const fake = FakeBotApi.make({ token });
  const layer = Bot.layer({ token: Redacted.make(token) }).pipe(Layer.provide(fake.layer));
  const program = Effect.gen(function* () {
    const bot = yield* Bot;
    return yield* bot.callRaw("sendMessage", {
      chat_id: 29,
      reply_markup: {
        inline_keyboard: [[{ callback_data: "x".repeat(65), text: "Raw" }]],
      },
      text: "Raw",
    });
  }).pipe(Effect.provide(layer));

  await Effect.runPromise(program);

  expect(fake.requests).toHaveLength(1);
});
