import { expect, test } from "bun:test";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { Effect } from "effect";

import { JobLeaseLost, type JobStoreService } from "../src/Jobs.ts";
import { SqliteJobs } from "../src/SqliteJobs.ts";

const botId = 123456;

async function database() {
  const directory = await mkdtemp(join(tmpdir(), "telly-sqlite-jobs."));
  return {
    close: async () => rm(directory, { force: true, recursive: true }),
    path: join(directory, "jobs.db"),
  };
}

function save(
  store: JobStoreService,
  id: string,
  options: { readonly capacity?: number; readonly fingerprint?: string } = {},
) {
  return Effect.runPromise(store.save({
    botId,
    capacity: options.capacity ?? 100,
    fingerprint: options.fingerprint ?? `fingerprint:${id}`,
    id,
    name: "reminder",
    payload: { chatId: 77, text: id },
    runAtMs: 0,
    schedule: { _tag: "Once" },
  }));
}

async function claimInProcess(path: string, fencingToken: number) {
  const child = spawn(
    "bun",
    [
      "run",
      "./test/fixtures/sqlite-jobs-worker.mjs",
      path,
      String(botId),
      String(fencingToken),
    ],
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
  if (code !== 0) throw new Error(`SQLite jobs worker failed: ${stderr}`);
  return JSON.parse(stdout) as ReadonlyArray<string>;
}

test("SQLite jobs persist scheduled work across reopening the database", async () => {
  const fixture = await database();
  const first = await SqliteJobs.open(fixture.path);
  await save(first, "persistent");
  first.close();
  const reopened = await SqliteJobs.open(fixture.path);

  try {
    const lease = await Effect.runPromise(reopened.acquire({ botId, leaseMs: 30_000 }));
    if (lease._tag !== "Acquired") throw new Error("Expected job lease");
    const claimed = await Effect.runPromise(reopened.claim({
      botId,
      fencingToken: lease.fencingToken,
      limit: 1,
    }));

    expect(claimed).toEqual([{
      attempts: 1,
      id: "persistent",
      name: "reminder",
      payload: { chatId: 77, text: "persistent" },
      scheduledTimeMs: 0,
    }]);
  } finally {
    reopened.close();
    await fixture.close();
  }
});

test("SQLite jobs enforce capacity and identifiers atomically across connections", async () => {
  const fixture = await database();
  const first = await SqliteJobs.open(fixture.path);
  const second = await SqliteJobs.open(fixture.path);

  try {
    const results = await Promise.all([
      save(first, "left", { capacity: 1 }),
      save(second, "right", { capacity: 1 }),
    ]);
    const storedId = results[0]?._tag === "Stored" ? "left" : "right";
    const existing = await save(second, storedId, { capacity: 1 });
    const conflict = await save(second, storedId, {
      capacity: 1,
      fingerprint: "different",
    });

    expect(results.map((result) => result._tag).sort()).toEqual(["Full", "Stored"]);
    expect(existing._tag).toBe("Existing");
    expect(conflict._tag).toBe("Conflict");
  } finally {
    first.close();
    second.close();
    await fixture.close();
  }
});

test("SQLite jobs claim due work once across separate processes", async () => {
  const fixture = await database();
  const store = await SqliteJobs.open(fixture.path);

  try {
    await save(store, "first");
    await save(store, "second");
    const lease = await Effect.runPromise(store.acquire({ botId, leaseMs: 30_000 }));
    if (lease._tag !== "Acquired") throw new Error("Expected job lease");
    const claims = await Promise.all([
      claimInProcess(fixture.path, lease.fencingToken),
      claimInProcess(fixture.path, lease.fencingToken),
    ]);

    expect(claims.flat().sort()).toEqual(["first", "second"]);
  } finally {
    store.close();
    await fixture.close();
  }
});

test("SQLite jobs fence former workers and reclaim unfinished work", async () => {
  const fixture = await database();
  const store = await SqliteJobs.open(fixture.path);

  try {
    await save(store, "reclaimed");
    const first = await Effect.runPromise(store.acquire({ botId, leaseMs: 30_000 }));
    if (first._tag !== "Acquired") throw new Error("Expected first job lease");
    await Effect.runPromise(store.claim({ botId, fencingToken: first.fencingToken, limit: 1 }));
    await Effect.runPromise(store.release({ botId, fencingToken: first.fencingToken }));
    const second = await Effect.runPromise(store.acquire({ botId, leaseMs: 30_000 }));
    if (second._tag !== "Acquired") throw new Error("Expected second job lease");
    const reclaimed = await Effect.runPromise(store.claim({
      botId,
      fencingToken: second.fencingToken,
      limit: 1,
    }));

    await expect(Effect.runPromise(store.settle({
      botId,
      fencingToken: first.fencingToken,
      id: "reclaimed",
      outcome: { _tag: "Done" },
    }))).rejects.toBeInstanceOf(JobLeaseLost);
    expect(reclaimed).toMatchObject([{ attempts: 2, id: "reclaimed" }]);
  } finally {
    store.close();
    await fixture.close();
  }
});

test("SQLite jobs persist cancellation, interruption refunds, and done pruning", async () => {
  const fixture = await database();
  const store = await SqliteJobs.open(fixture.path);

  try {
    await save(store, "cancelled");
    expect(await Effect.runPromise(store.cancel({ botId, id: "cancelled" }))).toBe(true);
    expect(await Effect.runPromise(store.cancel({ botId, id: "cancelled" }))).toBe(false);
    await save(store, "completed");
    const lease = await Effect.runPromise(store.acquire({ botId, leaseMs: 30_000 }));
    if (lease._tag !== "Acquired") throw new Error("Expected job lease");
    await Effect.runPromise(store.claim({ botId, fencingToken: lease.fencingToken, limit: 1 }));
    await Effect.runPromise(store.settle({
      botId,
      fencingToken: lease.fencingToken,
      id: "completed",
      outcome: { _tag: "Interrupted" },
    }));
    const resumed = await Effect.runPromise(store.claim({
      botId,
      fencingToken: lease.fencingToken,
      limit: 1,
    }));
    await Effect.runPromise(store.settle({
      botId,
      fencingToken: lease.fencingToken,
      id: "completed",
      outcome: { _tag: "Done" },
    }));
    await Effect.runPromise(store.prune({ botId, doneAgeMs: 0 }));
    const reused = await save(store, "completed", { fingerprint: "new" });

    expect(resumed).toMatchObject([{ attempts: 1, id: "completed" }]);
    expect(reused._tag).toBe("Stored");
  } finally {
    store.close();
    await fixture.close();
  }
});
