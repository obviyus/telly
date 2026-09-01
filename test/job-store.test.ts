import { expect, test } from "bun:test";
import { Effect } from "effect";
import { TestClock } from "effect/testing";

import { JobLeaseLost, type JobStoreService, MemoryJobs } from "../src/Jobs.ts";

const botId = 123456;

function save(
  store: JobStoreService,
  id: string,
  options: {
    readonly capacity?: number;
    readonly fingerprint?: string;
    readonly runAtMs?: number;
    readonly schedule?: { readonly _tag: "Once" } | {
      readonly _tag: "Repeat";
      readonly intervalMs: number;
    };
  } = {},
) {
  return store.save({
    botId,
    capacity: options.capacity ?? 100,
    fingerprint: options.fingerprint ?? `fingerprint:${id}`,
    id,
    name: "reminder",
    payload: { chatId: 77, text: id },
    runAtMs: options.runAtMs ?? 0,
    schedule: options.schedule ?? { _tag: "Once" },
  });
}

test("memory jobs claim work only when its scheduled time arrives", async () => {
  const store = MemoryJobs.make();
  const program = Effect.gen(function* () {
    yield* save(store, "later", { runAtMs: 5_000 });
    const lease = yield* store.acquire({ botId, leaseMs: 30_000 });
    if (lease._tag !== "Acquired") throw new Error("Expected job lease");
    const early = yield* store.claim({ botId, fencingToken: lease.fencingToken, limit: 1 });
    yield* TestClock.adjust("5 seconds");
    const due = yield* store.claim({ botId, fencingToken: lease.fencingToken, limit: 1 });
    return { due, early };
  }).pipe(Effect.provide(TestClock.layer()));

  const result = await Effect.runPromise(program);

  expect(result.early).toEqual([]);
  expect(result.due).toEqual([{
    attempts: 1,
    id: "later",
    name: "reminder",
    payload: { chatId: 77, text: "later" },
    scheduledTimeMs: 5_000,
  }]);
});

test("memory jobs preserve repeating cadence, coalesce missed runs, and reset attempts", async () => {
  const store = MemoryJobs.make();
  const program = Effect.gen(function* () {
    yield* save(store, "repeating", {
      runAtMs: 1_000,
      schedule: { _tag: "Repeat", intervalMs: 1_000 },
    });
    const lease = yield* store.acquire({ botId, leaseMs: 30_000 });
    if (lease._tag !== "Acquired") throw new Error("Expected job lease");
    yield* TestClock.adjust("5 seconds");
    const overdue = (yield* store.claim({
      botId,
      fencingToken: lease.fencingToken,
      limit: 1,
    }))[0];
    if (overdue === undefined) throw new Error("Expected overdue job");
    yield* store.settle({
      botId,
      fencingToken: lease.fencingToken,
      id: overdue.id,
      outcome: { _tag: "Done" },
    });
    const coalesced = yield* store.claim({
      botId,
      fencingToken: lease.fencingToken,
      limit: 1,
    });
    yield* TestClock.adjust("1 second");
    const next = yield* store.claim({
      botId,
      fencingToken: lease.fencingToken,
      limit: 1,
    });
    return { coalesced, next, overdue };
  }).pipe(Effect.provide(TestClock.layer()));

  const result = await Effect.runPromise(program);

  expect(result.overdue).toMatchObject({ attempts: 1, scheduledTimeMs: 1_000 });
  expect(result.coalesced).toEqual([]);
  expect(result.next).toMatchObject([{ attempts: 1, scheduledTimeMs: 6_000 }]);
});

test("memory jobs persist retry delay and refund an interrupted attempt", async () => {
  const store = MemoryJobs.make();
  const program = Effect.gen(function* () {
    yield* save(store, "retry");
    const lease = yield* store.acquire({ botId, leaseMs: 30_000 });
    if (lease._tag !== "Acquired") throw new Error("Expected job lease");
    const first = (yield* store.claim({
      botId,
      fencingToken: lease.fencingToken,
      limit: 1,
    }))[0];
    if (first === undefined) throw new Error("Expected first attempt");
    yield* store.settle({
      botId,
      fencingToken: lease.fencingToken,
      id: first.id,
      outcome: { _tag: "Retry", delayMs: 2_000 },
    });
    const early = yield* store.claim({ botId, fencingToken: lease.fencingToken, limit: 1 });
    yield* TestClock.adjust("2 seconds");
    const second = (yield* store.claim({
      botId,
      fencingToken: lease.fencingToken,
      limit: 1,
    }))[0];
    if (second === undefined) throw new Error("Expected second attempt");
    yield* store.settle({
      botId,
      fencingToken: lease.fencingToken,
      id: second.id,
      outcome: { _tag: "Interrupted" },
    });
    const resumed = yield* store.claim({
      botId,
      fencingToken: lease.fencingToken,
      limit: 1,
    });
    return { early, first, resumed, second };
  }).pipe(Effect.provide(TestClock.layer()));

  const result = await Effect.runPromise(program);

  expect(result.first.attempts).toBe(1);
  expect(result.early).toEqual([]);
  expect(result.second.attempts).toBe(2);
  expect(result.resumed[0]?.attempts).toBe(2);
});

test("memory jobs reject former lease holders and reclaim their work", async () => {
  const store = MemoryJobs.make();
  const program = Effect.gen(function* () {
    yield* save(store, "fenced");
    const first = yield* store.acquire({ botId, leaseMs: 1_000 });
    if (first._tag !== "Acquired") throw new Error("Expected first job lease");
    yield* store.claim({ botId, fencingToken: first.fencingToken, limit: 1 });
    yield* TestClock.adjust("1 second");
    const second = yield* store.acquire({ botId, leaseMs: 1_000 });
    if (second._tag !== "Acquired") throw new Error("Expected second job lease");
    const stale = yield* Effect.result(store.settle({
      botId,
      fencingToken: first.fencingToken,
      id: "fenced",
      outcome: { _tag: "Done" },
    }));
    const reclaimed = yield* store.claim({
      botId,
      fencingToken: second.fencingToken,
      limit: 1,
    });
    return { reclaimed, stale };
  }).pipe(Effect.provide(TestClock.layer()));

  const result = await Effect.runPromise(program);

  expect(result.stale._tag).toBe("Failure");
  if (result.stale._tag !== "Failure") throw new Error("Expected stale settlement failure");
  expect(result.stale.failure).toBeInstanceOf(JobLeaseLost);
  expect(result.reclaimed).toMatchObject([{ attempts: 2, id: "fenced" }]);
});

test("memory jobs make saves idempotent and reject conflicting identifiers at capacity", async () => {
  const store = MemoryJobs.make();
  const results = await Effect.runPromise(Effect.gen(function* () {
    const stored = yield* save(store, "stable", { capacity: 1 });
    const existing = yield* save(store, "stable", { capacity: 1 });
    const conflict = yield* save(store, "stable", { capacity: 1, fingerprint: "different" });
    const full = yield* save(store, "other", { capacity: 1 });
    return { conflict, existing, full, stored };
  }));

  expect(results).toEqual({
    conflict: { _tag: "Conflict" },
    existing: { _tag: "Existing" },
    full: { _tag: "Full" },
    stored: { _tag: "Stored" },
  });
});

test("memory jobs cancel active work and prune completed identifiers", async () => {
  const store = MemoryJobs.make();
  const program = Effect.gen(function* () {
    yield* save(store, "cancelled");
    const lease = yield* store.acquire({ botId, leaseMs: 30_000 });
    if (lease._tag !== "Acquired") throw new Error("Expected job lease");
    yield* store.claim({ botId, fencingToken: lease.fencingToken, limit: 1 });
    const cancelled = yield* store.cancel({ botId, id: "cancelled" });
    yield* store.settle({
      botId,
      fencingToken: lease.fencingToken,
      id: "cancelled",
      outcome: { _tag: "Done" },
    });
    const restored = yield* save(store, "cancelled");
    const restoredClaim = (yield* store.claim({
      botId,
      fencingToken: lease.fencingToken,
      limit: 1,
    }))[0];
    if (restoredClaim === undefined) throw new Error("Expected restored job");
    yield* store.settle({
      botId,
      fencingToken: lease.fencingToken,
      id: "cancelled",
      outcome: { _tag: "Done" },
    });
    yield* store.prune({ botId, doneAgeMs: 0 });
    const afterPrune = yield* save(store, "cancelled", { fingerprint: "new" });
    return { afterPrune, cancelled, restored };
  }).pipe(Effect.provide(TestClock.layer()));

  const result = await Effect.runPromise(program);

  expect(result).toEqual({
    afterPrune: { _tag: "Stored" },
    cancelled: true,
    restored: { _tag: "Stored" },
  });
});
