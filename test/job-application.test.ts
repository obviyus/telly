import { expect, test } from "bun:test";
import { Effect } from "effect";

import {
  Application,
  defineJobs,
  job,
  JobStore,
  JobStoreError,
  MemoryJobs,
  Schema,
  sendMessage,
} from "../index.ts";
import { FakeBotApi } from "../testing.ts";

const token = "123456:job-application";

function reminderJobs(store = MemoryJobs.make()) {
  return defineJobs({
    reminder: job({
      payload: Schema.Struct({ chatId: Schema.Int, text: Schema.String }),
      run: ({ chatId, text }) => sendMessage({ chatId, text }),
    }),
  }, { store });
}

test("Application runs scheduled jobs beside polling", async () => {
  const fake = FakeBotApi.make({ token });
  const jobs = reminderJobs();
  const app = Application.make({ httpClient: fake.layer, jobs, rateLimit: false, token });
  await app.run(jobs.schedule("reminder", {
    id: "polling-reminder",
    payload: { chatId: 71, text: "polling job" },
  }));

  app.startPolling(() => Effect.void);
  const request = await fake.whenCalled("sendMessage");
  await app.close();

  expect(request.params).toMatchObject({ chat_id: 71, text: "polling job" });
});

test("Application runs scheduled jobs beside webhooks", async () => {
  const fake = FakeBotApi.make({ token });
  const jobs = reminderJobs();
  const app = Application.make({ httpClient: fake.layer, jobs, rateLimit: false, token });
  await app.run(jobs.schedule("reminder", {
    id: "webhook-reminder",
    payload: { chatId: 72, text: "webhook job" },
  }));

  app.startWebhook(() => Effect.void, { secretToken: "job_application_secret" });
  const request = await fake.whenCalled("sendMessage");
  await app.close();

  expect(request.params).toMatchObject({ chat_id: 72, text: "webhook job" });
});

test("Application exposes an unrecoverable job-store failure", async () => {
  const memory = MemoryJobs.make();
  const store = JobStore.of({
    ...memory,
    acquire: () => Effect.fail(new JobStoreError({
      description: "database unavailable",
      operation: "acquire",
    })),
  });
  const fake = FakeBotApi.make({ token });
  const app = Application.make({
    httpClient: fake.layer,
    jobs: reminderJobs(store),
    token,
  });
  const polling = app.startPolling(() => Effect.void);

  await expect(polling.completed).rejects.toBeInstanceOf(JobStoreError);
  await app.close().catch(() => undefined);
});
