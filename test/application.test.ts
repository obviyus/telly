import { expect, test } from "bun:test";

import { Application, BotApiError, sendMessage } from "../index.ts";
import { FakeBotApi, FakeBotApiReply } from "../testing.ts";

const token = "123456:application-test";

test("Application runs sendMessage without Effect setup", async () => {
  const fake = FakeBotApi.make({ token });
  const app = Application.make({ httpClient: fake.layer, token });

  try {
    const message = await app.run(
      sendMessage({ chatId: 37, text: "application-test" }),
    );

    expect(message.messageId).toBe(41);
    expect(fake.requests[0]?.params).toEqual({ chat_id: 37, text: "application-test" });
  } finally {
    await app.close();
  }
});

test("Application rejects with a useful BotApiError", async () => {
  const fake = FakeBotApi.make({
    replies: [FakeBotApiReply.reject({
      description: "Forbidden",
      errorCode: 403,
    })],
    token,
  });
  const app = Application.make({ httpClient: fake.layer, token });
  let caught: unknown;

  try {
    await app.run(sendMessage({ chatId: 43, text: "rejection-test" }));
  } catch (error) {
    caught = error;
  } finally {
    await app.close();
  }

  expect(caught).toBeInstanceOf(BotApiError);
  if (!(caught instanceof BotApiError)) throw new Error("Expected BotApiError");
  expect(caught.message).toBe("sendMessage: Telegram rejected the call: 403 Forbidden");
  expect(caught.retrySafe).toBe(true);
});
