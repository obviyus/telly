import { expect, test } from "bun:test";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { Effect, Schema } from "effect";

import {
  Application,
  callbackData,
  conversation,
  Conversation,
  ConversationConflict,
  ConversationStore,
  defineBot,
  MemoryConversations,
  respond,
  SqliteConversations,
  text,
  type ConversationStoreService,
  type Update,
} from "../index.ts";
import { FakeBotApi } from "../testing.ts";

const token = "123456:conversations";
const chatId = 71;
const userId = 17;
const conversationScope = `chat:${chatId}:user:${userId}`;

function messageUpdate(body: string, updateId: number, asCommand = false): Update {
  return {
    message: {
      chat: { id: chatId, type: "private" },
      date: 1_700_000_000,
      ...(asCommand
        ? { entities: [{ length: body.split(" ")[0]?.length ?? body.length, offset: 0, type: "bot_command" }] }
        : {}),
      from: { firstName: "Ada", id: userId, isBot: false },
      messageId: updateId,
      text: body,
    },
    updateId,
  };
}

function callbackUpdate(data: string, updateId: number): Update {
  return {
    callbackQuery: {
      chatInstance: "conversation-chat",
      data,
      from: { firstName: "Ada", id: userId, isBot: false },
      id: `query-${updateId}`,
      message: {
        chat: { id: chatId, type: "private" },
        date: 1_700_000_000,
        messageId: 900,
        text: "Confirm order?",
      },
    },
    updateId,
  };
}

const choice = callbackData("order", Schema.Struct({
  answer: Schema.Literals(["yes", "no"]),
}));

function orderConversation(store: ConversationStoreService) {
  return conversation({
    name: "order",
    steps: {
      confirm: Conversation.step({
        filter: choice,
        run: ({ callbackQuery: query, data }, state) => {
          if (data.answer === "no") return Effect.succeed(Conversation.end());
          if (query.message === undefined) return Effect.void;
          return respond(query.message, "Send a kitchen note.").pipe(
            Effect.as(Conversation.next("note", state)),
          );
        },
        state: Schema.Struct({ orderId: Schema.Int }),
      }),
      note: Conversation.step({
        filter: text(),
        run: ({ message, text: note }, state) =>
          respond(message, `Order ${state.orderId}: ${note}`).pipe(
            Effect.as(Conversation.end()),
          ),
        state: Schema.Struct({ orderId: Schema.Int }),
      }),
    },
    store,
  });
}

test("conversation advances from command through callback and text", async () => {
  const store = MemoryConversations.make();
  const order = orderConversation(store);
  const fake = FakeBotApi.make({ token });
  const app = Application.make({ httpClient: fake.layer, rateLimit: false, token });
  const bot = defineBot({
    commands: {
      order: ({ message }) => respond(message, {
        replyMarkup: { inlineKeyboard: [[choice.button("Yes", { answer: "yes" })]] },
        text: "Confirm order 42?",
      }).pipe(Effect.andThen(order.enter(message, "confirm", { orderId: 42 }))),
    },
    conversations: [order],
  });

  try {
    await app.run(bot(messageUpdate("/order", 101, true)));
    await app.run(bot(callbackUpdate(choice.pack({ answer: "yes" }), 102)));
    const waiting = await Effect.runPromise(store.load({
      botId: 123456,
      scope: conversationScope,
    }));
    await app.run(bot(messageUpdate("No onions", 103)));
    const ended = await Effect.runPromise(store.load({
      botId: 123456,
      scope: conversationScope,
    }));

    expect(waiting).toMatchObject({ conversation: "order", step: "note", version: 2 });
    expect(ended).toBeUndefined();
    expect(fake.requests.map((request) => request.params)).toMatchObject([
      { text: "Confirm order 42?" },
      { text: "Send a kitchen note." },
      { text: "Order 42: No onions" },
    ]);
  } finally {
    await app.close();
  }
});

test("unmatched conversation updates fall through without changing state", async () => {
  const store = MemoryConversations.make();
  const order = orderConversation(store);
  const observed: Array<string> = [];
  const fake = FakeBotApi.make({ token });
  const app = Application.make({ httpClient: fake.layer, token });
  const bot = defineBot({
    callbackQuery: ({ callbackQuery: query }) => Effect.sync(() => {
      observed.push(query.data ?? "missing");
    }),
    conversations: [order],
  });
  await Effect.runPromise(store.commit({
    botId: 123456,
    expected: "any",
    scope: conversationScope,
    next: { conversation: "order", state: { orderId: 42 }, step: "confirm" },
  }));

  try {
    await app.run(bot(callbackUpdate("foreign:value", 104)));
    const state = await Effect.runPromise(store.load({
      botId: 123456,
      scope: conversationScope,
    }));

    expect(observed).toEqual(["foreign:value"]);
    expect(state).toMatchObject({ step: "confirm", version: 1 });
  } finally {
    await app.close();
  }
});

test("unknown and invalid persisted conversation states fall through", async () => {
  const store = MemoryConversations.make();
  const order = orderConversation(store);
  const observed: Array<string> = [];
  const fake = FakeBotApi.make({ token });
  const app = Application.make({ httpClient: fake.layer, token });
  const bot = defineBot({
    conversations: [order],
    text: ({ text: value }) => Effect.sync(() => {
      observed.push(value);
    }),
  });

  try {
    await Effect.runPromise(store.commit({
      botId: 123456,
      expected: "any",
      scope: conversationScope,
      next: { conversation: "removed-flow", state: {}, step: "gone" },
    }));
    await app.run(bot(messageUpdate("unknown flow", 108)));
    await Effect.runPromise(store.commit({
      botId: 123456,
      expected: "any",
      scope: conversationScope,
      next: { conversation: "order", state: { orderId: "invalid" }, step: "note" },
    }));
    await app.run(bot(messageUpdate("invalid state", 109)));

    expect(observed).toEqual(["unknown flow", "invalid state"]);
  } finally {
    await app.close();
  }
});

test("a command can exit an active conversation when its step does not match", async () => {
  const store = MemoryConversations.make();
  const order = orderConversation(store);
  const fake = FakeBotApi.make({ token });
  const app = Application.make({ httpClient: fake.layer, token });
  const bot = defineBot({
    commands: {
      cancel: ({ message }) => order.exit(message),
    },
    conversations: [order],
  });
  await Effect.runPromise(store.commit({
    botId: 123456,
    expected: "any",
    scope: conversationScope,
    next: { conversation: "order", state: { orderId: 42 }, step: "note" },
  }));

  try {
    await app.run(bot(messageUpdate("/cancel", 105, true)));

    expect(await Effect.runPromise(store.load({ botId: 123456, scope: conversationScope })))
      .toBeUndefined();
  } finally {
    await app.close();
  }
});

test("conversation handler failure leaves its persisted version unchanged", async () => {
  const store = MemoryConversations.make();
  const failing = conversation({
    name: "failing",
    steps: {
      active: Conversation.step({
        filter: text(),
        run: () => Effect.fail("handler failed"),
        state: Schema.Struct({ value: Schema.Int }),
      }),
    },
    store,
  });
  const fake = FakeBotApi.make({ token });
  const app = Application.make({ httpClient: fake.layer, token });
  const bot = defineBot({ conversations: [failing] });
  await Effect.runPromise(store.commit({
    botId: 123456,
    expected: "any",
    scope: conversationScope,
    next: { conversation: "failing", state: { value: 7 }, step: "active" },
  }));

  try {
    await expect(app.run(bot(messageUpdate("input", 106)))).rejects.toBe("handler failed");
    expect(await Effect.runPromise(store.load({ botId: 123456, scope: conversationScope })))
      .toMatchObject({ state: { value: 7 }, version: 1 });
  } finally {
    await app.close();
  }
});

test("conversation reports a compare-and-set conflict without overwriting state", async () => {
  const memory = MemoryConversations.make();
  const store = ConversationStore.of({
    ...memory,
    commit: (options) => typeof options.expected === "number"
      ? Effect.succeed("Conflict" as const)
      : memory.commit(options),
  });
  const order = orderConversation(store);
  const fake = FakeBotApi.make({ token });
  const app = Application.make({ httpClient: fake.layer, token });
  const bot = defineBot({ conversations: [order] });
  await Effect.runPromise(memory.commit({
    botId: 123456,
    expected: "any",
    scope: conversationScope,
    next: { conversation: "order", state: { orderId: 42 }, step: "confirm" },
  }));

  try {
    await expect(app.run(bot(callbackUpdate(choice.pack({ answer: "yes" }), 107))))
      .rejects.toBeInstanceOf(ConversationConflict);
    expect(await Effect.runPromise(memory.load({ botId: 123456, scope: conversationScope })))
      .toMatchObject({ step: "confirm", version: 1 });
  } finally {
    await app.close();
  }
});

test("SQLite conversation resumes its next step after an application restart", async () => {
  const directory = await mkdtemp(join(tmpdir(), "telly-conversation-restart."));
  const path = join(directory, "conversations.db");
  const firstStore = await SqliteConversations.open(path);
  const firstOrder = orderConversation(firstStore);
  const firstFake = FakeBotApi.make({ token });
  const firstApp = Application.make({ httpClient: firstFake.layer, rateLimit: false, token });
  const firstBot = defineBot({
    commands: {
      order: ({ message }) => firstOrder.enter(message, "confirm", { orderId: 84 }),
    },
    conversations: [firstOrder],
  });

  try {
    await firstApp.run(firstBot(messageUpdate("/order", 110, true)));
  } finally {
    await firstApp.close();
    firstStore.close();
  }

  const secondStore = await SqliteConversations.open(path);
  const secondOrder = orderConversation(secondStore);
  const secondFake = FakeBotApi.make({ token });
  const secondApp = Application.make({ httpClient: secondFake.layer, rateLimit: false, token });
  const secondBot = defineBot({ conversations: [secondOrder] });

  try {
    await secondApp.run(secondBot(callbackUpdate(choice.pack({ answer: "yes" }), 111)));
    await secondApp.run(secondBot(messageUpdate("Extra spicy", 112)));

    expect(await Effect.runPromise(secondStore.load({
      botId: 123456,
      scope: conversationScope,
    })))
      .toBeUndefined();
    expect(secondFake.requests.map((request) => request.params)).toMatchObject([
      { text: "Send a kitchen note." },
      { text: "Order 84: Extra spicy" },
    ]);
  } finally {
    await secondApp.close();
    secondStore.close();
    await rm(directory, { force: true, recursive: true });
  }
});

test("defineBot rejects conversations backed by different stores", () => {
  expect(() => defineBot({
    conversations: [
      orderConversation(MemoryConversations.make()),
      orderConversation(MemoryConversations.make()),
    ],
  })).toThrow("must share a store");
});

test("defineBot rejects duplicate conversation names", () => {
  const store = MemoryConversations.make();

  expect(() => defineBot({
    conversations: [orderConversation(store), orderConversation(store)],
  })).toThrow("Duplicate conversation name: order");
});
