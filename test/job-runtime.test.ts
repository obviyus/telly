import { expect, test } from "bun:test";
import { Cause, Deferred, Effect, Fiber, Layer, Redacted, Schema } from "effect";
import { TestClock } from "effect/testing";

import { Bot } from "../src/BotApi.ts";
import {
  defineJobs,
  job,
  JobLeaseLost,
  JobStore,
  type JobStoreService,
  MemoryJobs,
} from "../src/Jobs.ts";
import { runJobWorker } from "../src/internal/JobRuntime.ts";
import { FakeBotApi } from "../testing.ts";

const token = "123456:job-runtime";

function botLayer() {
  const fake = FakeBotApi.make({ token });
  return Bot.layer({ rateLimit: false, token: Redacted.make(token) }).pipe(
    Layer.provide(fake.layer),
  );
}

test("job worker runs a scheduled handler only after its due time", async () => {
  const handled = Deferred.makeUnsafe<string>();
  const store = MemoryJobs.make();
  const jobs = defineJobs({
    reminder: job({
      payload: Schema.Struct({ text: Schema.String }),
      run: ({ text }) => Deferred.succeed(handled, text),
    }),
  }, {
    options: { leaseMs: 30_000 },
    store,
  });
  const program = Effect.gen(function* () {
    yield* jobs.schedule("reminder", { after: "5 seconds", payload: { text: "stand up" } });
    const worker = yield* Effect.forkChild(runJobWorker(jobs));
    yield* Effect.yieldNow;
    const early = yield* Deferred.poll(handled);
    yield* TestClock.adjust("5 seconds");
    const text = yield* Deferred.await(handled);
    yield* Fiber.interrupt(worker);
    return { early, text };
  }).pipe(
    Effect.provide(botLayer()),
    Effect.provide(TestClock.layer()),
  );

  const result = await Effect.runPromise(program);

  expect(result.early._tag).toBe("None");
  expect(result.text).toBe("stand up");
});

test("job worker retries typed failures and parks an exhausted job", async () => {
  let attempts = 0;
  const secondAttempt = Deferred.makeUnsafe<void>();
  const store = MemoryJobs.make();
  const jobs = defineJobs({
    failing: job({
      payload: Schema.Struct({ value: Schema.Int }),
      run: () => Effect.sync(() => {
        attempts += 1;
        if (attempts === 2) Effect.runSync(Deferred.succeed(secondAttempt, undefined));
      }).pipe(Effect.andThen(Effect.fail("retry"))),
    }),
  }, {
    options: { maxAttempts: 2, retryBaseMs: 1_000, retryMaxMs: 1_000 },
    store,
  });
  const program = Effect.gen(function* () {
    yield* jobs.schedule("failing", { id: "failing", payload: { value: 7 } });
    const worker = yield* Effect.forkChild(runJobWorker(jobs));
    yield* Effect.yieldNow;
    yield* TestClock.adjust("1 second");
    yield* Deferred.await(secondAttempt);
    yield* TestClock.adjust("10 seconds");
    yield* Effect.yieldNow;
    yield* Fiber.interrupt(worker);
  }).pipe(
    Effect.provide(botLayer()),
    Effect.provide(TestClock.layer()),
  );

  await Effect.runPromise(program);

  expect(attempts).toBe(2);
});

test("job worker coalesces a slow repeating job without overlap", async () => {
  const firstStarted = Deferred.makeUnsafe<void>();
  const releaseFirst = Deferred.makeUnsafe<void>();
  const secondStarted = Deferred.makeUnsafe<void>();
  let active = 0;
  let maximumActive = 0;
  let runs = 0;
  const store = MemoryJobs.make();
  const jobs = defineJobs({
    recurring: job({
      payload: Schema.Struct({ name: Schema.String }),
      run: () => Effect.acquireUseRelease(
        Effect.sync(() => {
          active += 1;
          maximumActive = Math.max(maximumActive, active);
          runs += 1;
          if (runs === 1) Effect.runSync(Deferred.succeed(firstStarted, undefined));
          if (runs === 2) Effect.runSync(Deferred.succeed(secondStarted, undefined));
          return runs;
        }),
        (run) => run === 1 ? Deferred.await(releaseFirst) : Effect.void,
        () => Effect.sync(() => {
          active -= 1;
        }),
      ),
    }),
  }, { store });
  const program = Effect.gen(function* () {
    yield* jobs.schedule("recurring", {
      at: new Date(0),
      every: "1 second",
      payload: { name: "heartbeat" },
    });
    const worker = yield* Effect.forkChild(runJobWorker(jobs));
    yield* Deferred.await(firstStarted);
    yield* TestClock.adjust("5 seconds");
    yield* Effect.yieldNow;
    const runsWhileBlocked = runs;
    yield* Deferred.succeed(releaseFirst, undefined);
    yield* TestClock.adjust("1 second");
    yield* Deferred.await(secondStarted);
    yield* Fiber.interrupt(worker);
    return runsWhileBlocked;
  }).pipe(
    Effect.provide(botLayer()),
    Effect.provide(TestClock.layer()),
  );

  const runsWhileBlocked = await Effect.runPromise(program);

  expect(runsWhileBlocked).toBe(1);
  expect(maximumActive).toBe(1);
  expect(runs).toBe(2);
});

test("job worker interruption refunds an unfinished attempt", async () => {
  const started = Deferred.makeUnsafe<void>();
  const memory = MemoryJobs.make();
  const jobs = defineJobs({
    waiting: job({
      payload: Schema.Struct({ value: Schema.Int }),
      run: () => Deferred.succeed(started, undefined).pipe(Effect.andThen(Effect.never)),
    }),
  }, {
    options: { gracePeriodMs: 0 },
    store: memory,
  });
  const program = Effect.gen(function* () {
    yield* jobs.schedule("waiting", { id: "waiting", payload: { value: 1 } });
    const worker = yield* Effect.forkChild(runJobWorker(jobs));
    yield* Deferred.await(started);
    yield* Fiber.interrupt(worker);
    const lease = yield* memory.acquire({ botId: 123456, leaseMs: 30_000 });
    if (lease._tag !== "Acquired") throw new Error("Expected replacement job lease");
    return yield* memory.claim({ botId: 123456, fencingToken: lease.fencingToken, limit: 1 });
  }).pipe(
    Effect.provide(botLayer()),
    Effect.provide(TestClock.layer()),
  );

  const reclaimed = await Effect.runPromise(program);

  expect(reclaimed).toMatchObject([{ attempts: 1, id: "waiting" }]);
});

test("cancelling a running repeating job prevents its next occurrence", async () => {
  const started = Deferred.makeUnsafe<void>();
  const release = Deferred.makeUnsafe<void>();
  let runs = 0;
  const store = MemoryJobs.make();
  const jobs = defineJobs({
    recurring: job({
      payload: Schema.Struct({ value: Schema.Int }),
      run: () => Effect.sync(() => {
        runs += 1;
      }).pipe(
        Effect.andThen(Deferred.succeed(started, undefined)),
        Effect.andThen(Deferred.await(release)),
      ),
    }),
  }, { store });
  const program = Effect.gen(function* () {
    yield* jobs.schedule("recurring", {
      at: new Date(0),
      every: "1 second",
      id: "recurring",
      payload: { value: 1 },
    });
    const worker = yield* Effect.forkChild(runJobWorker(jobs));
    yield* Deferred.await(started);
    const cancelled = yield* jobs.cancel("recurring");
    yield* Deferred.succeed(release, undefined);
    yield* TestClock.adjust("10 seconds");
    yield* Effect.yieldNow;
    yield* Fiber.interrupt(worker);
    return cancelled;
  }).pipe(
    Effect.provide(botLayer()),
    Effect.provide(TestClock.layer()),
  );

  const cancelled = await Effect.runPromise(program);

  expect(cancelled).toBe(true);
  expect(runs).toBe(1);
});

test("job handler defects fail the worker and leave work reclaimable", async () => {
  const store = MemoryJobs.make();
  const jobs = defineJobs({
    defective: job({
      payload: Schema.Struct({ value: Schema.Int }),
      run: () => Effect.die(new Error("job defect")),
    }),
  }, { store });
  const program = Effect.gen(function* () {
    yield* jobs.schedule("defective", {
      id: "defective",
      payload: { value: 1 },
    });
    const worker = yield* Effect.forkChild(runJobWorker(jobs));
    const exit = yield* Fiber.await(worker);
    const lease = yield* store.acquire({ botId: 123456, leaseMs: 30_000 });
    if (lease._tag !== "Acquired") throw new Error("Expected replacement job lease");
    const reclaimed = yield* store.claim({
      botId: 123456,
      fencingToken: lease.fencingToken,
      limit: 1,
    });
    return { exit, reclaimed };
  }).pipe(
    Effect.provide(botLayer()),
    Effect.provide(TestClock.layer()),
  );

  const result = await Effect.runPromise(program);

  expect(result.exit._tag).toBe("Failure");
  if (result.exit._tag !== "Failure") throw new Error("Expected worker failure");
  expect(Cause.pretty(result.exit.cause)).toContain("job defect");
  expect(result.reclaimed).toMatchObject([{ attempts: 2, id: "defective" }]);
});

test("job worker stops active handlers immediately after losing its lease", async () => {
  const started = Deferred.makeUnsafe<void>();
  let wasInterrupted = false;
  const memory = MemoryJobs.make();
  const store: JobStoreService = JobStore.of({
    ...memory,
    renew: (options) => Effect.fail(new JobLeaseLost({ botId: options.botId })),
  });
  const jobs = defineJobs({
    waiting: job({
      payload: Schema.Struct({ value: Schema.Int }),
      run: () => Deferred.succeed(started, undefined).pipe(
        Effect.andThen(Effect.never),
        Effect.onInterrupt(() => Effect.sync(() => {
          wasInterrupted = true;
        })),
      ),
    }),
  }, {
    options: { gracePeriodMs: 10_000, leaseMs: 30 },
    store,
  });
  const program = Effect.gen(function* () {
    yield* jobs.schedule("waiting", { id: "waiting", payload: { value: 1 } });
    const worker = yield* Effect.forkChild(runJobWorker(jobs));
    yield* Deferred.await(started);
    yield* Effect.yieldNow;
    yield* TestClock.adjust(10);
    yield* Effect.yieldNow;
    const interruptedByLeaseLoss = wasInterrupted;
    const stopping = yield* Effect.forkChild(Fiber.interrupt(worker));
    yield* TestClock.adjust("10 seconds");
    yield* Fiber.join(stopping);
    return interruptedByLeaseLoss;
  }).pipe(
    Effect.provide(botLayer()),
    Effect.provide(TestClock.layer()),
  );

  const interruptedByLeaseLoss = await Effect.runPromise(program);

  expect(interruptedByLeaseLoss).toBe(true);
});
