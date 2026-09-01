import { expect, test } from "bun:test";
import { Effect } from "effect";

import {
  Application,
  defineJobs,
  InvalidJobPayload,
  InvalidJobSchedule,
  job,
  JobCapacityExceeded,
  JobConflict,
  MemoryJobs,
  Schema,
} from "../index.ts";
import { FakeBotApi } from "../testing.ts";

const token = "123456:jobs";

function fixture(options: { readonly capacity?: number } = {}) {
  const jobs = defineJobs({
    reminder: job({
      payload: Schema.Struct({ count: Schema.Int, text: Schema.String }),
      run: () => Effect.void,
    }),
  }, { options, store: MemoryJobs.make() });
  const fake = FakeBotApi.make({ token });
  return {
    app: Application.make({ httpClient: fake.layer, jobs, token }),
    jobs,
  };
}

test("jobs validate payloads before persistence", async () => {
  const { app, jobs } = fixture();

  await expect(app.run(jobs.schedule("reminder", {
    payload: { count: 1.5, text: "invalid integer" },
  }))).rejects.toBeInstanceOf(InvalidJobPayload);
  await app.close();
});

test("jobs reject ambiguous timing before persistence", async () => {
  const { app, jobs } = fixture();

  await expect(app.run(jobs.schedule("reminder", {
    after: "1 minute",
    at: new Date("2030-01-01T00:00:00Z"),
    payload: { count: 1, text: "ambiguous" },
  }))).rejects.toBeInstanceOf(InvalidJobSchedule);
  await app.close();
});

test("repeating jobs default to a stable definition identifier", async () => {
  const { app, jobs } = fixture();
  const schedule = () => app.run(jobs.schedule("reminder", {
    every: "1 hour",
    payload: { count: 2, text: "same declaration" },
  }));

  const first = await schedule();
  const second = await schedule();
  await app.close();

  expect(first).toBe("reminder");
  expect(second).toBe("reminder");
});

test("one-time jobs receive distinct automatic identifiers", async () => {
  const { app, jobs } = fixture();

  const first = await app.run(jobs.schedule("reminder", {
    payload: { count: 3, text: "first" },
  }));
  const second = await app.run(jobs.schedule("reminder", {
    payload: { count: 4, text: "second" },
  }));
  await app.close();

  expect(first).toStartWith("reminder:");
  expect(second).toStartWith("reminder:");
  expect(second).not.toBe(first);
});

test("jobs reject conflicting explicit identifiers", async () => {
  const { app, jobs } = fixture();
  await app.run(jobs.schedule("reminder", {
    id: "stable",
    payload: { count: 5, text: "first declaration" },
  }));

  await expect(app.run(jobs.schedule("reminder", {
    id: "stable",
    payload: { count: 6, text: "different declaration" },
  }))).rejects.toBeInstanceOf(JobConflict);
  await app.close();
});

test("jobs enforce bounded durable capacity", async () => {
  const { app, jobs } = fixture({ capacity: 1 });
  await app.run(jobs.schedule("reminder", {
    id: "first",
    payload: { count: 7, text: "fills capacity" },
  }));

  await expect(app.run(jobs.schedule("reminder", {
    id: "second",
    payload: { count: 8, text: "too much work" },
  }))).rejects.toBeInstanceOf(JobCapacityExceeded);
  await app.close();
});

test("job cancellation is idempotent", async () => {
  const { app, jobs } = fixture();
  const id = await app.run(jobs.schedule("reminder", {
    id: "cancel-me",
    payload: { count: 9, text: "cancelled" },
  }));

  const first = await app.run(jobs.cancel(id));
  const second = await app.run(jobs.cancel(id));
  await app.close();

  expect(first).toBe(true);
  expect(second).toBe(false);
});
