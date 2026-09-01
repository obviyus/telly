import { expect, test } from "bun:test";
import { Effect } from "effect";

import { MemoryConversations } from "../src/ConversationStore.ts";

const botId = 123456;
const scope = "chat:71:user:17";

test("memory conversations commit new state and reject a stale version", async () => {
  const store = MemoryConversations.make();
  const entered = await Effect.runPromise(store.commit({
    botId,
    expected: "any",
    scope,
    next: { conversation: "order", state: { orderId: 42 }, step: "confirm" },
  }));
  const first = await Effect.runPromise(store.load({ botId, scope }));
  const advanced = await Effect.runPromise(store.commit({
    botId,
    expected: 1,
    scope,
    next: { conversation: "order", state: { orderId: 42 }, step: "note" },
  }));
  const stale = await Effect.runPromise(store.commit({
    botId,
    expected: 1,
    scope,
    next: { conversation: "order", state: { orderId: 99 }, step: "note" },
  }));
  const current = await Effect.runPromise(store.load({ botId, scope }));

  expect(entered).toBe("Committed");
  expect(first).toEqual({
    conversation: "order",
    state: { orderId: 42 },
    step: "confirm",
    version: 1,
  });
  expect(advanced).toBe("Committed");
  expect(stale).toBe("Conflict");
  expect(current).toMatchObject({ state: { orderId: 42 }, step: "note", version: 2 });
});

test("memory conversations replace an active flow when a new one enters", async () => {
  const store = MemoryConversations.make();
  await Effect.runPromise(store.commit({
    botId,
    expected: "any",
    scope,
    next: { conversation: "first", state: {}, step: "start" },
  }));

  const replaced = await Effect.runPromise(store.commit({
    botId,
    expected: "any",
    scope,
    next: { conversation: "second", state: { value: 8 }, step: "ready" },
  }));
  const current = await Effect.runPromise(store.load({ botId, scope }));

  expect(replaced).toBe("Committed");
  expect(current).toMatchObject({
    conversation: "second",
    state: { value: 8 },
    version: 2,
  });
});

test("memory conversations end only the expected version", async () => {
  const store = MemoryConversations.make();
  await Effect.runPromise(store.commit({
    botId,
    expected: "any",
    scope,
    next: { conversation: "order", state: {}, step: "confirm" },
  }));

  const stale = await Effect.runPromise(store.commit({ botId, expected: 2, scope }));
  const ended = await Effect.runPromise(store.commit({ botId, expected: 1, scope }));
  const current = await Effect.runPromise(store.load({ botId, scope }));

  expect(stale).toBe("Conflict");
  expect(ended).toBe("Committed");
  expect(current).toBeUndefined();
});
