import { expect, test } from "bun:test";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { Effect, Schema } from "effect";

import { SqliteConversations } from "../src/SqliteConversations.ts";

const botId = 123456;
const scope = "chat:81:user:27";

async function database() {
  const directory = await mkdtemp(join(tmpdir(), "telly-sqlite-conversations."));
  return {
    close: async () => rm(directory, { force: true, recursive: true }),
    path: join(directory, "conversations.db"),
  };
}

test("SQLite conversations resume persisted state after reopening", async () => {
  const fixture = await database();
  const first = await SqliteConversations.open(fixture.path);
  await Effect.runPromise(first.commit({
    botId,
    expected: "any",
    scope,
    next: { conversation: "order", state: { orderId: 73 }, step: "note" },
  }));
  first.close();
  const reopened = await SqliteConversations.open(fixture.path);

  try {
    expect(await Effect.runPromise(reopened.load({ botId, scope }))).toEqual({
      conversation: "order",
      state: { orderId: 73 },
      step: "note",
      version: 1,
    });
  } finally {
    reopened.close();
    await fixture.close();
  }
});

test("SQLite conversations commit one competing version across connections", async () => {
  const fixture = await database();
  const first = await SqliteConversations.open(fixture.path);
  const second = await SqliteConversations.open(fixture.path);

  try {
    await Effect.runPromise(first.commit({
      botId,
      expected: "any",
      scope,
      next: { conversation: "order", state: { value: 1 }, step: "choice" },
    }));
    const results = await Promise.all([
      Effect.runPromise(first.commit({
        botId,
        expected: 1,
        scope,
        next: { conversation: "order", state: { value: 2 }, step: "done" },
      })),
      Effect.runPromise(second.commit({
        botId,
        expected: 1,
        scope,
        next: { conversation: "order", state: { value: 3 }, step: "done" },
      })),
    ]);
    const current = await Effect.runPromise(first.load({ botId, scope }));

    expect(results.sort()).toEqual(["Committed", "Conflict"]);
    expect(current?.version).toBe(2);
    const state = Schema.decodeUnknownSync(Schema.Struct({ value: Schema.Int }))(current?.state);
    expect([2, 3]).toContain(state.value);
  } finally {
    first.close();
    second.close();
    await fixture.close();
  }
});

test("SQLite conversations replace and end active state atomically", async () => {
  const fixture = await database();
  const store = await SqliteConversations.open(fixture.path);

  try {
    await Effect.runPromise(store.commit({
      botId,
      expected: "any",
      scope,
      next: { conversation: "first", state: {}, step: "start" },
    }));
    await Effect.runPromise(store.commit({
      botId,
      expected: "any",
      scope,
      next: { conversation: "second", state: { ready: true }, step: "ready" },
    }));
    const replaced = await Effect.runPromise(store.load({ botId, scope }));
    const ended = await Effect.runPromise(store.commit({ botId, expected: "any", scope }));
    const current = await Effect.runPromise(store.load({ botId, scope }));

    expect(replaced).toMatchObject({ conversation: "second", state: { ready: true } });
    expect(ended).toBe("Committed");
    expect(current).toBeUndefined();
  } finally {
    store.close();
    await fixture.close();
  }
});
