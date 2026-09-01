import { expect, test } from "bun:test";
import { Effect, Redacted } from "effect";

import {
  Application,
  BotApiError,
  getManagedBotToken,
  getMe,
  replaceManagedBotToken,
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

test("a rotated managed bot token is redacted", async () => {
  const sourceToken = "123456:rotation-source";
  const rotatedPlainToken = "888888:rotated-fake";
  const fake = FakeBotApi.make({
    replies: [FakeBotApiReply.ok(rotatedPlainToken)],
    token: sourceToken,
  });
  const app = Application.make({ httpClient: fake.layer, token: sourceToken });

  try {
    const rotatedToken = await app.run(replaceManagedBotToken({ userId: 83 }));

    expect(Redacted.isRedacted(rotatedToken)).toBe(true);
    expect(String(rotatedToken)).not.toContain(rotatedPlainToken);
    expect(JSON.stringify(rotatedToken)).not.toContain(rotatedPlainToken);
    expect(fake.requests[0]?.params).toEqual({ user_id: 83 });
  } finally {
    await app.close();
  }
});

test("runPolling waits for close and removes its process listeners", async () => {
  const { promise: handled, resolve } = Promise.withResolvers<void>();
  const fake = FakeBotApi.make({
    replies: [FakeBotApiReply.ok([{
      message: {
        chat: { id: 89, type: "private" },
        date: 1_700_000_000,
        message_id: 201,
        text: "run-polling",
      },
      update_id: 201,
    }])],
    token,
  });
  const app = Application.make({ httpClient: fake.layer, token });
  const sigintListeners = process.listenerCount("SIGINT");
  const sigtermListeners = process.listenerCount("SIGTERM");
  const running = app.runPolling(() => Effect.sync(resolve), { concurrency: 1 });

  await handled;
  await app.close();
  await running;

  expect(process.listenerCount("SIGINT")).toBe(sigintListeners);
  expect(process.listenerCount("SIGTERM")).toBe(sigtermListeners);
  expect(fake.requests.at(-1)?.params).toMatchObject({ offset: 202, timeout: 0 });
});

test("runPolling rejects with its polling failure and removes listeners", async () => {
  const fake = FakeBotApi.make({
    replies: [FakeBotApiReply.reject({ description: "polling unavailable", errorCode: 403 })],
    token,
  });
  const app = Application.make({ httpClient: fake.layer, token });
  const sigintListeners = process.listenerCount("SIGINT");
  const sigtermListeners = process.listenerCount("SIGTERM");

  await expect(app.runPolling(() => Effect.void)).rejects.toBeInstanceOf(BotApiError);

  expect(process.listenerCount("SIGINT")).toBe(sigintListeners);
  expect(process.listenerCount("SIGTERM")).toBe(sigtermListeners);
});
