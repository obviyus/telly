import { expect, test } from "bun:test";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { Effect } from "effect";

import { DispatchLeaseLost, SqliteInbox } from "../index.ts";

const botId = 123456;

async function database() {
  const directory = await mkdtemp(join(tmpdir(), "telly-sqlite-inbox."));
  const path = join(directory, "inbox.db");
  return {
    close: async () => rm(directory, { force: true, recursive: true }),
    path,
  };
}

async function saveInProcess(path: string, updateId: number) {
  const child = spawn(
    "bun",
    ["run", "./test/fixtures/sqlite-inbox-worker.mjs", path, String(updateId)],
    { cwd: new URL("..", import.meta.url), stdio: ["ignore", "pipe", "pipe"] },
  );
  let stdout = "";
  let stderr = "";
  child.stdout.setEncoding("utf8");
  child.stderr.setEncoding("utf8");
  child.stdout.on("data", (chunk) => {
    stdout += chunk;
  });
  child.stderr.on("data", (chunk) => {
    stderr += chunk;
  });
  const [code] = await once(child, "exit");
  if (code !== 0) throw new Error(`SQLite worker failed: ${stderr}`);
  return JSON.parse(stdout);
}

function save(
  store: Awaited<ReturnType<typeof SqliteInbox.open>>,
  updateId: number,
  conversationKey: string,
  capacity = 100,
) {
  return Effect.runPromise(store.save({
    botId,
    capacity,
    conversationKey,
    payload: { message: { future_field: "kept" }, update_id: updateId },
    updateId,
  }));
}

test("SQLite inbox replays saved updates after reopening the database", async () => {
  const fixture = await database();
  const first = await SqliteInbox.open(fixture.path);
  await save(first, 11, "chat:1");
  first.close();
  const reopened = await SqliteInbox.open(fixture.path);

  try {
    const lease = await Effect.runPromise(reopened.acquire({ botId, leaseMs: 30_000 }));
    if (lease._tag !== "Acquired") throw new Error("Expected dispatch lease");
    const claimed = await Effect.runPromise(reopened.claim({
      botId,
      fencingToken: lease.fencingToken,
      limit: 10,
    }));

    expect(claimed).toEqual([{
      attempts: 1,
      conversationKey: "chat:1",
      payload: { message: { future_field: "kept" }, update_id: 11 },
      updateId: 11,
    }]);
  } finally {
    reopened.close();
    await fixture.close();
  }
});

test("SQLite inbox enforces capacity atomically across connections", async () => {
  const fixture = await database();
  const first = await SqliteInbox.open(fixture.path);
  const second = await SqliteInbox.open(fixture.path);

  try {
    const results = await Promise.all([
      save(first, 21, "chat:2", 1),
      save(second, 22, "chat:3", 1),
    ]);
    const storedId = results[0]?._tag === "Stored" ? 21 : 22;
    const duplicate = await save(second, storedId, "chat:duplicate", 1);

    expect(results.map((result) => result._tag).sort()).toEqual(["Full", "Stored"]);
    expect(duplicate._tag).toBe("Duplicate");
  } finally {
    first.close();
    second.close();
    await fixture.close();
  }
});

test("SQLite inbox enforces capacity atomically across processes", async () => {
  const fixture = await database();
  const setup = await SqliteInbox.open(fixture.path);
  setup.close();

  try {
    const results = await Promise.all([
      saveInProcess(fixture.path, 23),
      saveInProcess(fixture.path, 24),
    ]);

    expect(results.map((result) => result._tag).sort()).toEqual(["Full", "Stored"]);
  } finally {
    await fixture.close();
  }
});

test("SQLite inbox claims one conversation head once across connections", async () => {
  const fixture = await database();
  const first = await SqliteInbox.open(fixture.path);
  const second = await SqliteInbox.open(fixture.path);

  try {
    await save(first, 31, "chat:4");
    await save(first, 32, "chat:4");
    await save(first, 33, "chat:5");
    const lease = await Effect.runPromise(first.acquire({ botId, leaseMs: 30_000 }));
    if (lease._tag !== "Acquired") throw new Error("Expected dispatch lease");
    const [left, right] = await Promise.all([
      Effect.runPromise(first.claim({ botId, fencingToken: lease.fencingToken, limit: 1 })),
      Effect.runPromise(second.claim({ botId, fencingToken: lease.fencingToken, limit: 1 })),
    ]);

    expect([...left, ...right].map((item) => item.updateId).sort()).toEqual([31, 33]);
  } finally {
    first.close();
    second.close();
    await fixture.close();
  }
});

test("SQLite inbox fencing tokens reject former lease holders", async () => {
  const fixture = await database();
  const store = await SqliteInbox.open(fixture.path);

  try {
    const first = await Effect.runPromise(store.acquire({ botId, leaseMs: 30_000 }));
    if (first._tag !== "Acquired") throw new Error("Expected first dispatch lease");
    await Effect.runPromise(store.release({ botId, fencingToken: first.fencingToken }));
    const second = await Effect.runPromise(store.acquire({ botId, leaseMs: 30_000 }));
    if (second._tag !== "Acquired") throw new Error("Expected second dispatch lease");

    await expect(Effect.runPromise(store.renew({
      botId,
      fencingToken: first.fencingToken,
      leaseMs: 30_000,
    }))).rejects.toBeInstanceOf(DispatchLeaseLost);
    expect(second.fencingToken).toBeGreaterThan(first.fencingToken);
  } finally {
    store.close();
    await fixture.close();
  }
});

test("SQLite inbox reclaims unfinished work after lease succession", async () => {
  const fixture = await database();
  const store = await SqliteInbox.open(fixture.path);

  try {
    await save(store, 35, "chat:succession");
    const first = await Effect.runPromise(store.acquire({ botId, leaseMs: 30_000 }));
    if (first._tag !== "Acquired") throw new Error("Expected first dispatch lease");
    await Effect.runPromise(store.claim({
      botId,
      fencingToken: first.fencingToken,
      limit: 1,
    }));
    await Effect.runPromise(store.release({ botId, fencingToken: first.fencingToken }));
    const second = await Effect.runPromise(store.acquire({ botId, leaseMs: 30_000 }));
    if (second._tag !== "Acquired") throw new Error("Expected second dispatch lease");
    const reclaimed = await Effect.runPromise(store.claim({
      botId,
      fencingToken: second.fencingToken,
      limit: 1,
    }));

    await expect(Effect.runPromise(store.settle({
      botId,
      fencingToken: first.fencingToken,
      outcome: { _tag: "Done" },
      updateId: 35,
    }))).rejects.toBeInstanceOf(DispatchLeaseLost);
    expect(reclaimed.map((item) => [item.updateId, item.attempts])).toEqual([[35, 2]]);
  } finally {
    store.close();
    await fixture.close();
  }
});

test("SQLite inbox persists attempt refund and done pruning", async () => {
  const fixture = await database();
  const store = await SqliteInbox.open(fixture.path);

  try {
    await save(store, 41, "chat:6");
    const lease = await Effect.runPromise(store.acquire({ botId, leaseMs: 30_000 }));
    if (lease._tag !== "Acquired") throw new Error("Expected dispatch lease");
    await Effect.runPromise(store.claim({ botId, fencingToken: lease.fencingToken, limit: 1 }));
    await Effect.runPromise(store.settle({
      botId,
      fencingToken: lease.fencingToken,
      outcome: { _tag: "Interrupted" },
      updateId: 41,
    }));
    const reclaimed = await Effect.runPromise(store.claim({
      botId,
      fencingToken: lease.fencingToken,
      limit: 1,
    }));
    await Effect.runPromise(store.settle({
      botId,
      fencingToken: lease.fencingToken,
      outcome: { _tag: "Done" },
      updateId: 41,
    }));
    await Effect.runPromise(store.prune({ botId, doneAgeMs: 0 }));

    expect(reclaimed[0]?.attempts).toBe(1);
    expect((await save(store, 41, "chat:6"))._tag).toBe("Stored");
  } finally {
    store.close();
    await fixture.close();
  }
});
