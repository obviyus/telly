import { expect, test } from "bun:test";
import {
  Deferred,
  Effect,
  Exit,
  Fiber,
  Layer,
  Logger,
  Metric,
  Redacted,
  References,
  Schema,
  Tracer,
} from "effect";
import { TestClock } from "effect/testing";

import {
  Bot,
  defineJobs,
  InboxStore,
  job,
  MemoryInbox,
  MemoryJobs,
  sendMessage,
  Update,
} from "../index.ts";
import { makeDispatcher } from "../src/internal/Dispatch.ts";
import { runJobWorker } from "../src/internal/JobRuntime.ts";
import {
  makeInboxWake,
  resolveInboxOptions,
  runInboxWorker,
  saveInboxUpdate,
} from "../src/internal/InboxRuntime.ts";
import { makeWebhookFetch } from "../src/Webhook.ts";
import { FakeBotApi, FakeBotApiReply } from "../testing.ts";

const token = "123456:telemetry-test";

function botLayer(fake: FakeBotApi) {
  return Bot.layer({ rateLimit: false, token: Redacted.make(token) }).pipe(
    Layer.provide(fake.layer),
  );
}

function counter(
  snapshots: ReadonlyArray<Metric.Metric.Snapshot>,
  id: string,
  attributes: Record<string, string>,
): number {
  const snapshot = snapshots.find((entry) =>
    entry.id === id && Object.entries(attributes).every(
      ([key, value]) => entry.attributes?.[key] === value,
    )
  );
  if (snapshot?.type !== "Counter") throw new Error(`Missing counter ${id}`);
  return Number(snapshot.state.count);
}

function gauge(
  snapshots: ReadonlyArray<Metric.Metric.Snapshot>,
  id: string,
  attributes: Record<string, string>,
): number {
  const snapshot = snapshots.find((entry) =>
    entry.id === id && Object.entries(attributes).every(
      ([key, value]) => entry.attributes?.[key] === value,
    )
  );
  if (snapshot?.type !== "Gauge") throw new Error(`Missing gauge ${id}`);
  return Number(snapshot.state.value);
}

test("Bot API metrics and spans are useful, redacted, and silent on success", async () => {
  const spans: Array<Tracer.NativeSpan> = [];
  const logs: Array<unknown> = [];
  const tracer = Tracer.make({
    span(options) {
      const span = new Tracer.NativeSpan(options);
      spans.push(span);
      return span;
    },
  });
  const logger = Logger.make((options) => logs.push(options.message));
  const fake = FakeBotApi.make({
    replies: [FakeBotApiReply.ok({
      chat: { id: 73, type: "private" },
      date: 1_700_000_000,
      message_id: 91,
      text: "observable",
    })],
    token,
  });
  const snapshots = await Effect.runPromise(
    sendMessage({ chatId: 73, text: "observable" }).pipe(
      Effect.andThen(Metric.snapshot),
      Effect.provide(botLayer(fake)),
      Effect.provide(Logger.layer([logger])),
      Effect.provideService(Metric.MetricRegistry, new Map()),
      Effect.provideService(Tracer.Tracer, tracer),
    ),
  );

  expect(counter(snapshots, "telly_bot_api_request_total", {
    method: "sendMessage",
    outcome: "ok",
  })).toBe(1);
  const duration = snapshots.find((entry) =>
    entry.id === "telly_bot_api_request_duration_ms" &&
    entry.attributes?.["method"] === "sendMessage"
  );
  expect(duration?.type).toBe("Histogram");
  if (duration?.type !== "Histogram") throw new Error("Missing request duration histogram");
  expect(duration.state.count).toBe(1);
  const requestSpan = spans.find((span) => span.name === "Bot.request");
  expect(Object.fromEntries(requestSpan?.attributes ?? [])).toMatchObject({
    "telegram.method": "sendMessage",
    "telegram.outcome": "ok",
  });
  expect(logs).toEqual([]);
  expect(JSON.stringify({
    logs,
    metricAttributes: snapshots.map((snapshot) => snapshot.attributes),
    spans: spans.map((span) => ({ attributes: Object.fromEntries(span.attributes), name: span.name })),
  })).not.toContain(token);
});

test("retries expose bounded outcomes and delay metrics", async () => {
  const fake = FakeBotApi.make({
    replies: [
      FakeBotApiReply.reject({
        description: "Too Many Requests",
        errorCode: 429,
        parameters: { retryAfter: 2 },
      }),
      FakeBotApiReply.ok({
        first_name: "Telemetry Bot",
        id: 123456,
        is_bot: true,
      }),
    ],
    token,
  });
  const snapshots = await Effect.runPromise(Effect.gen(function* () {
    const request = yield* Effect.forkChild(Bot.pipe(
      Effect.flatMap((bot) => bot.me),
    ));
    yield* Effect.promise(() => fake.whenCalled("getMe"));
    yield* Effect.yieldNow;
    yield* TestClock.adjust("2 seconds");
    yield* Fiber.join(request);
    return yield* Metric.snapshot;
  }).pipe(
    Effect.provide(botLayer(fake)),
    Effect.provide(TestClock.layer()),
    Effect.provideService(Metric.MetricRegistry, new Map()),
  ));

  expect(counter(snapshots, "telly_bot_api_request_total", {
    method: "getMe",
    outcome: "rejected_429",
  })).toBe(1);
  expect(counter(snapshots, "telly_bot_api_request_total", {
    method: "getMe",
    outcome: "ok",
  })).toBe(1);
  expect(counter(snapshots, "telly_bot_api_delay_total", { reason: "retry" })).toBe(1);
  expect(counter(snapshots, "telly_bot_api_delay_ms_total", { reason: "retry" })).toBe(2_000);
});

test("webhook and dispatch metrics expose bounded, balanced lifecycle data", async () => {
  const started = Deferred.makeUnsafe<void>();
  const release = Deferred.makeUnsafe<void>();
  const spans: Array<Tracer.NativeSpan> = [];
  const tracer = Tracer.make({
    span(options) {
      const span = new Tracer.NativeSpan(options);
      spans.push(span);
      return span;
    },
  });
  const fake = FakeBotApi.make({ token });
  const result = await Effect.runPromise(Effect.gen(function* () {
    const dispatcher = yield* makeDispatcher(
      () => Deferred.succeed(started, undefined).pipe(Effect.andThen(Deferred.await(release))),
      {
        concurrency: 1,
        conversationKey: String,
        gracePeriodMs: 1_000,
        source: "webhook",
      },
    );
    const first = yield* dispatcher.submit(1);
    yield* Deferred.await(started);
    const active = yield* Metric.snapshot;
    const rejected = yield* Effect.result(dispatcher.submit(2));
    yield* Deferred.succeed(release, undefined);
    const settled = yield* first;
    yield* dispatcher.drain;
    const fetch = makeWebhookFetch("telemetry_secret", () => Effect.succeed(200));
    const webhookResponse = yield* fetch(new Request("https://bot.example/telegram", {
      body: JSON.stringify({ update_id: 41 }),
      headers: {
        "content-type": "application/json",
        "x-telegram-bot-api-secret-token": "telemetry_secret",
      },
      method: "POST",
    }));
    const final = yield* Metric.snapshot;
    return { active, final, rejected, settled, webhookResponse };
  }).pipe(
    Effect.provide(botLayer(fake)),
    Effect.provideService(Metric.MetricRegistry, new Map()),
    Effect.provideService(Tracer.Tracer, tracer),
  ));

  expect(gauge(result.active, "telly_dispatch_active", { source: "webhook" })).toBe(1);
  expect(result.rejected._tag).toBe("Failure");
  expect(Exit.isSuccess(result.settled)).toBe(true);
  expect(gauge(result.final, "telly_dispatch_active", { source: "webhook" })).toBe(0);
  expect(counter(result.final, "telly_dispatch_rejected_total", { source: "webhook" })).toBe(1);
  expect(counter(result.final, "telly_dispatch_settled_total", {
    outcome: "ok",
    source: "webhook",
  })).toBe(1);
  expect(result.webhookResponse.status).toBe(200);
  expect(counter(result.final, "telly_webhook_request_total", { result: "accepted" })).toBe(1);
  const webhookSpan = spans.find((span) => span.name === "Webhook.fetch");
  expect(Object.fromEntries(webhookSpan?.attributes ?? [])).toMatchObject({
    "telegram.webhook.result": "accepted",
  });
});

test("durable inbox and job work emit save and settlement metrics", async () => {
  const inboxHandled = Deferred.makeUnsafe<void>();
  const jobParked = Promise.withResolvers<void>();
  const logs: Array<unknown> = [];
  const logger = Logger.make((options) => {
    logs.push({
      annotations: options.fiber.getRef(References.CurrentLogAnnotations),
      message: options.message,
    });
    if (String(options.message).includes("Telegram durable work parked")) jobParked.resolve();
  });
  const fake = FakeBotApi.make({ token });
  const inbox = MemoryInbox.make();
  const update = Schema.decodeUnknownSync(Update)({
    message: {
      chat: { id: 81, type: "private" },
      date: 1_700_000_000,
      message_id: 101,
      text: "durable",
    },
    update_id: 101,
  });
  const jobs = defineJobs({
    failing: job({
      payload: Schema.Struct({ value: Schema.Int }),
      run: () => Effect.fail("expected"),
    }),
  }, {
    options: { maxAttempts: 1 },
    store: MemoryJobs.make(),
  });
  const inboxOptions = resolveInboxOptions();
  const inboxWake = makeInboxWake();
  const snapshots = await Effect.runPromise(Effect.gen(function* () {
    yield* saveInboxUpdate(update, inboxOptions, inboxWake);
    yield* saveInboxUpdate(update, inboxOptions, inboxWake);
    const inboxWorker = yield* Effect.forkChild(
      runInboxWorker(
        () => Deferred.succeed(inboxHandled, undefined),
        inboxOptions,
        inboxWake,
      ),
    );
    yield* Deferred.await(inboxHandled);
    yield* Fiber.interrupt(inboxWorker);

    yield* jobs.schedule("failing", { id: "metric-job", payload: { value: 1 } });
    const jobWorker = yield* Effect.forkChild(runJobWorker(jobs));
    yield* Effect.promise(() => jobParked.promise);
    yield* Fiber.interrupt(jobWorker);
    return yield* Metric.snapshot;
  }).pipe(
    Effect.provide(botLayer(fake)),
    Effect.provideService(InboxStore, inbox),
    Effect.provide(Logger.layer([logger])),
    Effect.provideService(Metric.MetricRegistry, new Map()),
  ));

  expect(counter(snapshots, "telly_inbox_save_total", { result: "stored" })).toBe(1);
  expect(counter(snapshots, "telly_inbox_save_total", { result: "duplicate" })).toBe(1);
  expect(counter(snapshots, "telly_settlement_total", {
    outcome: "done",
    store: "inbox",
  })).toBe(1);
  expect(counter(snapshots, "telly_settlement_total", {
    outcome: "parked",
    store: "jobs",
  })).toBe(1);
  expect(JSON.stringify({
    logs,
    metricAttributes: snapshots.map((snapshot) => snapshot.attributes),
  })).not.toContain(token);
});
