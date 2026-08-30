import { expect, test } from "bun:test";
import { Redacted } from "effect";

import {
  Application,
  BotApiError,
  getManagedBotToken,
  getMe,
  sendMessage,
} from "../index.ts";
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

test("a managed bot token stays redacted between applications", async () => {
  const sourceToken = "123456:source-bot";
  const managedPlainToken = "777777:managed-fake";
  const sourceFake = FakeBotApi.make({
    replies: [FakeBotApiReply.ok(managedPlainToken)],
    token: sourceToken,
  });
  const sourceApp = Application.make({ httpClient: sourceFake.layer, token: sourceToken });
  const managedToken = await (async () => {
    try {
      return await sourceApp.run(getManagedBotToken({ userId: 5 }));
    } finally {
      await sourceApp.close();
    }
  })();

  expect(Redacted.isRedacted(managedToken)).toBe(true);
  expect(String(managedToken)).not.toContain(managedPlainToken);
  expect(JSON.stringify(managedToken)).not.toContain(managedPlainToken);
  expect(Bun.inspect(managedToken)).not.toContain(managedPlainToken);

  const managedFake = FakeBotApi.make({
    replies: [FakeBotApiReply.ok({
      first_name: "Managed Test",
      id: 97,
      is_bot: true,
    })],
    token: managedPlainToken,
  });
  const managedApp = Application.make({ httpClient: managedFake.layer, token: managedToken });
  try {
    const managedBot = await managedApp.run(getMe());
    expect(managedBot.id).toBe(97);
  } finally {
    await managedApp.close();
  }
});
