import { expect, test } from "bun:test";

import { Application, type Update } from "../index.ts";
import { sedBot } from "../examples/superseriousbot/sed.ts";
import { FakeBotApi } from "../testing.ts";

const token = "123456:superseriousbot-sed";

function update(expression: string, repliedText?: string): Update {
  return {
    message: {
      chat: { id: -10017, type: "supergroup" },
      date: 1_700_000_000,
      messageId: 72,
      ...(repliedText === undefined
        ? {}
        : {
            replyToMessage: {
              chat: { id: -10017, type: "supergroup" },
              date: 1_699_999_999,
              messageId: 71,
              text: repliedText,
            },
          }),
      text: expression,
    },
    updateId: 72,
  };
}

test("SuperSeriousBot sed replaces every match and replies to the source message", async () => {
  const fake = FakeBotApi.make({ token });
  const app = Application.make({ httpClient: fake.layer, rateLimit: false, token });

  try {
    await app.run(sedBot(update("s/old/new", "old wheel, old axle")));
  } finally {
    await app.close();
  }

  expect(fake.requests[0]?.params).toMatchObject({
    chat_id: -10017,
    reply_parameters: { message_id: 71 },
    text: "new wheel, new axle",
  });
});

test("SuperSeriousBot sed keeps replacement dollars literal", async () => {
  const fake = FakeBotApi.make({ token });
  const app = Application.make({ httpClient: fake.layer, rateLimit: false, token });

  try {
    await app.run(sedBot(update("s/old/$&", "old")));
  } finally {
    await app.close();
  }

  expect(fake.requests[0]?.params).toMatchObject({ text: "$&" });
});

test("SuperSeriousBot sed ignores messages without a reply", async () => {
  const fake = FakeBotApi.make({ token });
  const app = Application.make({ httpClient: fake.layer, token });

  try {
    await app.run(sedBot(update("s/old/new")));
  } finally {
    await app.close();
  }

  expect(fake.requests).toEqual([]);
});

test("SuperSeriousBot sed ignores replies to non-text messages", async () => {
  const fake = FakeBotApi.make({ token });
  const app = Application.make({ httpClient: fake.layer, rateLimit: false, token });
  const item = update("s/old/new", "placeholder");
  if (item.message?.replyToMessage === undefined) throw new Error("Expected reply");
  const withoutText: Update = {
    ...item,
    message: {
      ...item.message,
      replyToMessage: {
        chat: item.message.replyToMessage.chat,
        date: item.message.replyToMessage.date,
        messageId: item.message.replyToMessage.messageId,
      },
    },
  };

  try {
    await app.run(sedBot(withoutText));
  } finally {
    await app.close();
  }

  expect(fake.requests).toEqual([]);
});
