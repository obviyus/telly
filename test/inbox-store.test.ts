import { expect, test } from "bun:test";
import { Effect } from "effect";
import { TestClock } from "effect/testing";

import { InboxLeaseLost, MemoryInbox } from "../index.ts";

const botId = 123456;

function save(
  store: ReturnType<typeof MemoryInbox.make>,
  updateId: number,
  conversationKey: string,
  capacity = 100,
) {
  return store.save({
    botId,
    capacity,
    conversationKey,
    payload: { update_id: updateId },
    updateId,
  });
}

function run<A, E>(effect: Effect.Effect<A, E>) {
  return Effect.runPromise(effect);
}

test("concurrent duplicate saves create one inbox update", async () => {
  const store = MemoryInbox.make();
  const result = await run(Effect.all([
    save(store, 11, "chat:1"),
    save(store, 11, "chat:1"),
  ], { concurrency: "unbounded" }));
  const lease = await run(store.acquire({ botId, leaseMs: 30_000 }));
  if (lease._tag !== "Acquired") throw new Error("Expected dispatch lease");
  const claimed = await run(store.claim({
    botId,
    fencingToken: lease.fencingToken,
    limit: 10,
  }));

  expect(result.map((item) => item._tag).sort()).toEqual(["Duplicate", "Stored"]);
  expect(claimed.map((item) => item.updateId)).toEqual([11]);
});

test("duplicate saves succeed when the inbox is full", async () => {
  const store = MemoryInbox.make();

  expect((await run(save(store, 21, "chat:2", 1)))._tag).toBe("Stored");
  expect((await run(save(store, 21, "chat:2", 1)))._tag).toBe("Duplicate");
  expect((await run(save(store, 22, "chat:3", 1)))._tag).toBe("Full");
});

test("claim returns only eligible conversation heads", async () => {
  const store = MemoryInbox.make();
  await run(Effect.all([
    save(store, 31, "chat:4"),
    save(store, 32, "chat:4"),
    save(store, 33, "chat:5"),
  ]));
  const lease = await run(store.acquire({ botId, leaseMs: 30_000 }));
  if (lease._tag !== "Acquired") throw new Error("Expected dispatch lease");

  const first = await run(store.claim({
    botId,
    fencingToken: lease.fencingToken,
    limit: 3,
  }));

  expect(first.map((item) => item.updateId)).toEqual([31, 33]);
  expect(first.map((item) => item.attempts)).toEqual([1, 1]);
});

test("retry keeps later updates blocked until its store-timed delay ends", async () => {
  const store = MemoryInbox.make();
  const program = Effect.gen(function* () {
    yield* Effect.all([
      save(store, 41, "chat:6"),
      save(store, 42, "chat:6"),
    ]);
    const lease = yield* store.acquire({ botId, leaseMs: 30_000 });
    if (lease._tag !== "Acquired") throw new Error("Expected dispatch lease");
    const first = (yield* store.claim({
      botId,
      fencingToken: lease.fencingToken,
      limit: 2,
    }))[0];
    if (first === undefined) throw new Error("Expected claimed update");
    yield* store.settle({
      botId,
      fencingToken: lease.fencingToken,
      outcome: { _tag: "Retry", delayMs: 5_000 },
      updateId: first.updateId,
    });
    const blocked = yield* store.claim({
      botId,
      fencingToken: lease.fencingToken,
      limit: 2,
    });
    yield* TestClock.adjust("5 seconds");
    const retried = yield* store.claim({
      botId,
      fencingToken: lease.fencingToken,
      limit: 2,
    });
    return { blocked, retried };
  }).pipe(Effect.provide(TestClock.layer()));

  const { blocked, retried } = await Effect.runPromise(program);

  expect(blocked).toEqual([]);
  expect(retried.map((item) => [item.updateId, item.attempts])).toEqual([[41, 2]]);
});

test("interrupted settlement refunds the claim attempt", async () => {
  const store = MemoryInbox.make();
  await run(save(store, 51, "chat:7"));
  const lease = await run(store.acquire({ botId, leaseMs: 30_000 }));
  if (lease._tag !== "Acquired") throw new Error("Expected dispatch lease");
  const first = (await run(store.claim({
    botId,
    fencingToken: lease.fencingToken,
    limit: 1,
  })))[0];
  if (first === undefined) throw new Error("Expected claimed update");
  await run(store.settle({
    botId,
    fencingToken: lease.fencingToken,
    outcome: { _tag: "Interrupted" },
    updateId: first.updateId,
  }));
  const second = (await run(store.claim({
    botId,
    fencingToken: lease.fencingToken,
    limit: 1,
  })))[0];

  expect(second?.attempts).toBe(1);
});

test("new fencing token reclaims work and rejects stale mutations", async () => {
  const store = MemoryInbox.make();
  const program = Effect.gen(function* () {
    yield* save(store, 61, "chat:8");
    const firstLease = yield* store.acquire({ botId, leaseMs: 1_000 });
    if (firstLease._tag !== "Acquired") throw new Error("Expected first dispatch lease");
    yield* store.claim({ botId, fencingToken: firstLease.fencingToken, limit: 1 });
    yield* TestClock.adjust("1 second");
    const secondLease = yield* store.acquire({ botId, leaseMs: 1_000 });
    if (secondLease._tag !== "Acquired") throw new Error("Expected second dispatch lease");
    yield* store.release({ botId, fencingToken: firstLease.fencingToken });
    const staleRenew = yield* Effect.result(store.renew({
      botId,
      fencingToken: firstLease.fencingToken,
      leaseMs: 1_000,
    }));
    const reclaimed = yield* store.claim({
      botId,
      fencingToken: secondLease.fencingToken,
      limit: 1,
    });
    return { reclaimed, staleRenew };
  }).pipe(Effect.provide(TestClock.layer()));

  const { reclaimed, staleRenew } = await Effect.runPromise(program);

  expect(staleRenew._tag).toBe("Failure");
  if (staleRenew._tag !== "Failure") throw new Error("Expected stale renewal failure");
  expect(staleRenew.failure).toBeInstanceOf(InboxLeaseLost);
  expect(reclaimed.map((item) => [item.updateId, item.attempts])).toEqual([[61, 2]]);
});

test("prune removes old done rows so their update ids can be stored again", async () => {
  const store = MemoryInbox.make();
  await run(save(store, 71, "chat:9"));
  const lease = await run(store.acquire({ botId, leaseMs: 30_000 }));
  if (lease._tag !== "Acquired") throw new Error("Expected dispatch lease");
  await run(store.claim({ botId, fencingToken: lease.fencingToken, limit: 1 }));
  await run(store.settle({
    botId,
    fencingToken: lease.fencingToken,
    outcome: { _tag: "Done" },
    updateId: 71,
  }));
  await run(store.prune({ botId, doneAgeMs: 0 }));

  expect((await run(save(store, 71, "chat:9")))._tag).toBe("Stored");
});
