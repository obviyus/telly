# Telly

Telly will be an Effect-native Telegram Bot API framework designed primarily for agents.

Read [VISION.md](./VISION.md) for the product direction.

## First methods

Bot API methods are generated from the checked-in Telegram schema. Methods with no parameters take no arguments.

```ts
import { Application, getManagedBotToken, getMe, getMyName, sendMessage } from "telly";

const token = process.env.BOT_TOKEN;
if (token === undefined) throw new Error("Set BOT_TOKEN");

const app = Application.make({ token });

try {
  const bot = await app.run(getMe());
  const defaultName = await app.run(getMyName({}));
  const message = await app.run(
    sendMessage({ chatId: 123, text: "Hello from Telly" }),
  );
  console.log(bot.firstName, defaultName.name, message.messageId);
} finally {
  await app.close();
}
```

Telly validates the standard Telegram token prefix as the numeric bot identifier. It uses that identifier to isolate inbox rows without storing or hashing the secret token.

`Application.run` rejects with `BotApiError`. Its `message` explains the failure, and `retrySafe` states whether retrying can duplicate a side effect.

Telly retries a request at most twice after the first attempt. It honors Telegram's `retryAfter` value, retries Telegram `5xx` failures, and retries unknown outcomes only when the method is safe. A send may have succeeded before its connection failed. Opt into that duplicate risk for one call only:

```ts
import { retryUnknownOutcome, sendMessage } from "telly";

await app.run(
  sendMessage({ chatId: 123, text: "Retry even if this may send twice" }).pipe(
    retryUnknownOutcome,
  ),
);
```

Message calls use Telegram's documented limits by default: 30 messages per second overall, one per second in one chat, and 20 per minute in one group. `allowPaidBroadcast: true` uses Telegram's paid 1000-per-second overall limit. Set `rateLimit: false` on `Application.make` only when another system owns message pacing.

A method with optional fields still takes one options object: `await app.run(getMyName({}))`.

Set common outgoing message options once on the application:

```ts
const app = Application.make({
  token,
  defaults: {
    linkPreviewOptions: { isDisabled: true },
    parseMode: "HTML",
    protectContent: true,
  },
});
```

Defaults apply only to generated methods that accept the field at the top level. A field present on one call replaces its default. Set it to `undefined` to suppress the default for that call. Explicit `entities` or `captionEntities` suppress the `parseMode` default. `linkPreviewOptions` replaces the complete default object instead of merging its fields.

`downloadFile({ fileId })` resolves Telegram's temporary file path and returns a `Uint8Array`. The hosted Bot API currently limits downloads to 20 MB, and resolved paths remain valid for at least one hour.

Uploads use Web `Blob` values. Use `File` when Telegram should receive a filename: `sendPhoto({ chatId, photo: new File([bytes], "photo.png") })`.

Managed bot tokens stay redacted and pass directly into another application:

```ts
const managedToken = await app.run(getManagedBotToken({ userId: 123 }));
const managedApp = Application.make({ token: managedToken });
```

Tests use `FakeBotApi.make({ token })` from `telly/testing` and pass `fake.layer` to `Application.make` as `httpClient`. Seed `updates`, call `pushUpdate`, or set `webhookUrl` to test Telegram delivery without scripting transport replies. `serverRateLimit: true` enables a deterministic approximation of Telegram's documented `sendMessage` limits.

## Polling

`defineBot` is the beginner interface. It declares commands and ordinary text handlers without exposing routing machinery.

```ts
import { Application, defineBot, reply, respond } from "telly";

const token = process.env.BOT_TOKEN;
if (token === undefined) throw new Error("Set BOT_TOKEN");

const bot = defineBot({
  commands: {
    start: ({ message }) => respond(message, "Hi! Send me anything."),
  },
  text: ({ message, text }) => reply(message, text),
});

await Application.make({ token }).runPolling(bot);
```

The default `on-complete` acknowledgment confirms only the contiguous prefix of successful updates. Use `on-receipt` when a process crash may lose accepted work.

If another process briefly owns `getUpdates`, Telly checks that no webhook is active and retries for up to 60 seconds. An active webhook fails at once with `PollingConflictError`. Set `conflictRetryBudgetMs: 0` to disable conflict recovery.

`respond` sends to the triggering chat without quoting. `reply` quotes the triggering message. Both preserve its business connection, forum thread, and direct-message topic.

Advanced routing also provides `repliedMessage`, `regex`, `media`, `chatType`, and `mention` from the package root. Compose filters with `Filter.and`, `Filter.or`, and `Filter.not`, bind them with `on`, group first-match routes with `routes`, and run overlapping groups with `every`.

Pure Message helpers resolve Telegram's overlapping fields without replacing the generated Message model:

```ts
import { messageMedia, messageReply, messageSender, messageText } from "telly";

const text = messageText(message); // text, then media caption
const media = messageMedia(message);
const sender = messageSender(message); // senderChat, then from
const repliedTo = messageReply(message);

if (media?.type === "photo") {
  console.log(media.photo.fileId); // largest available size
}
```

`messageMedia` resolves Telegram's animation/document and live-photo/photo aliases. `messageReply` distinguishes same-chat messages, external messages, and stories. Forward details already use the generated `message.forwardOrigin` discriminated union, so they need no second helper.

`command` matches new `update.message` text only. It excludes edits, captions, and channel posts. `every` runs handlers in order and fails fast, so a failed handler skips later handlers and stops polling.

## Durable inbox

Pass an `InboxStore` to save every update before Telegram receives an acknowledgment. One fenced worker replays saved updates, keeps each conversation in order, retries typed handler failures, and parks an update after five attempts.

```ts
import { Application, SqliteInbox } from "telly";

const inbox = await SqliteInbox.open("./telly.db");

const app = Application.make({
  token,
  inbox,
});

try {
  await app.runPolling(bot);
} finally {
  await app.close();
  inbox.close();
}
```

`SqliteInbox` uses write-ahead logging, full synchronous durability, atomic write transactions, and a five-second busy timeout. `MemoryInbox` implements the same protocol but loses its contents when the process exits; use it only for development and adapter tests. Telly acknowledges only `Stored` or `Duplicate` updates and applies backpressure when its default 10,000-update capacity is full.

Inbox delivery is at least once. A crash after a handler's external side effect but before durable settlement can run that handler again. Use `updateId` as the idempotency key for downstream writes and payments.

## Webhooks

The same bot definition works with any server that accepts Web `Request` and `Response` values.

```ts
const app = Application.make({ token });
const webhook = app.startWebhook(bot, { secretToken });
const server = Bun.serve({ fetch: webhook.fetch, port: 3000 });

try {
  await webhook.completed;
} finally {
  server.stop(true);
  await app.close();
}
```

Pass the same `secretToken` to Telegram's `setWebhook` method. Telly rejects missing or incorrect secrets before reading the request body.

## Typed callback data

One callback definition packs buttons and acts as its own routing filter.

```ts
const choice = callbackData("choice", Schema.Struct({
  answer: Schema.Literals(["yes", "no"]),
}));

choice.button("Yes", { answer: "yes" });
on(choice, ({ callbackQuery, data }) =>
  answerCallbackQuery({
    callbackQueryId: callbackQuery.id,
    text: `Selected ${data.answer}`,
  }));
```

Packing validates the payload and rejects values larger than Telegram's 64-byte UTF-8 limit. Malformed, stale, or foreign callback data does not match the filter. Payload validation is not user authorization; check `callbackQuery.from` before a sensitive action.

## Durable conversations

A conversation stores one schema-checked step for each chat and user. Successful handlers return `Conversation.next(...)` or `Conversation.end()`. Returning `void` keeps the current step.

```ts
const order = conversation({
  name: "order",
  steps: {
    confirm: Conversation.step({
      filter: choice,
      run: ({ data }, state) => Effect.succeed(data.answer === "yes"
        ? Conversation.next("note", state)
        : Conversation.end()),
      state: Schema.Struct({ orderId: Schema.Int }),
    }),
    note: Conversation.step({
      filter: text(),
      run: ({ message, text }, state) =>
        respond(message, `Order ${state.orderId}: ${text}`).pipe(
          Effect.as(Conversation.end()),
        ),
      state: Schema.Struct({ orderId: Schema.Int }),
    }),
  },
  store: await SqliteConversations.open("./telly.db"),
});
```

Attach it with `defineBot({ conversations: [order] })`. Prompt the user, then call `order.enter(message, "confirm", state)`. Entering a new conversation replaces the active conversation for that chat and user. [`examples/conversations/bot.ts`](./examples/conversations/bot.ts) shows a complete command → button → text flow with cancellation.

Conversation state uses versioned compare-and-set writes. Use the durable inbox when multiple processes must preserve Telegram update order.

## Durable jobs

Define each job with a stable name and payload schema. The application runs due jobs beside polling or webhook delivery.

```ts
import {
  Application,
  defineBot,
  defineJobs,
  job,
  Schema,
  sendMessage,
  SqliteJobs,
} from "telly";

const store = await SqliteJobs.open("./telly.db");
const jobs = defineJobs({
  reminder: job({
    payload: Schema.Struct({ chatId: Schema.Int, text: Schema.String }),
    run: ({ chatId, text }) => sendMessage({ chatId, text }),
  }),
}, { store });
const token = process.env.BOT_TOKEN;
if (token === undefined) throw new Error("Set BOT_TOKEN");
const app = Application.make({ jobs, token });
const bot = defineBot({});

await app.run(jobs.schedule("reminder", {
  after: "10 minutes",
  payload: { chatId: 123, text: "Stand up." },
}));
await app.runPolling(bot);
```

Add `every` for fixed-interval work. Repeating jobs default to their definition name as the durable identifier. Completed identifiers remain idempotent for the configured retention period. Job delivery is at least once, so external side effects should use the job identifier as an idempotency key when possible.

[`examples/jobs/bot.ts`](./examples/jobs/bot.ts) is a complete reminder bot. An application processes jobs only while its polling or webhook runtime is active.

## Observability

Telly records production signals through Effect's metric registry, tracer, and structured logger. It needs no telemetry option and no exporter dependency. Effect-native applications can attach their preferred exporter Layers.

Successful updates do not create Telly log lines. Retries and rate-limit waits log at debug level. Parked durable work and store failures produce structured warning or error logs.

| Metric | Attributes | Meaning |
| --- | --- | --- |
| `telly_bot_api_request_total` | `method`, `outcome` | Bot API attempts and bounded results |
| `telly_bot_api_request_duration_ms` | `method` | Bot API attempt duration |
| `telly_bot_api_delay_total` | `reason` | Rate-limit and retry waits |
| `telly_bot_api_delay_ms_total` | `reason` | Total wait time |
| `telly_dispatch_active` | `source` | Accepted work that has not settled |
| `telly_dispatch_settled_total` | `source`, `outcome` | Completed, failed, or interrupted dispatches |
| `telly_dispatch_rejected_total` | `source` | Work rejected at the concurrency limit or during shutdown |
| `telly_webhook_request_total` | `result` | Webhook responses grouped by bounded result |
| `telly_inbox_save_total` | `result` | Stored, duplicate, or full durable saves |
| `telly_settlement_total` | `store`, `outcome` | Inbox and job settlements |

Spans use bounded attributes such as `telegram.method`, `telegram.outcome`, `telegram.webhook.result`, and `telly.dispatch.source`. Metrics never contain tokens, URLs, chat identifiers, user identifiers, update identifiers, job identifiers, or arbitrary error text.

## First real consumer

[`examples/superseriousbot`](./examples/superseriousbot) ports SuperSeriousBot's reply-based `sed` feature. It composes `repliedMessage` and `regex`, replies to the original message, and runs through the durable SQLite inbox.

```bash
BOT_TOKEN=... bun run ./examples/superseriousbot/bot.ts
```

## Benchmarks

A public suite under [`benchmarks/`](./benchmarks/README.md) races Telly, grammY, and python-telegram-bot through the same deterministic Telegram update workload. The primary score starts from a parsed update object and includes each framework's native update construction or validation, routing, and awaited handler completion. It excludes JSON parsing, network time, and user handler work.

Telly wins primary throughput by 26%, all three latency percentiles, and median peak memory while validating every update into its public schema. grammY still starts faster and installs fewer bytes; those costs remain visible below and in the full report.

This baseline passed the suite's noise gate. Throughput variation was 2.8% for Telly and 4.1% for grammY.

| Framework | Updates/s | CV | p50 latency | Median peak RSS | Cold startup |
| --- | ---: | ---: | ---: | ---: | ---: |
| Telly | 963,701 | 2.8% | 1.0 µs | 124.9 MiB | 159.3 ms |
| grammY | 762,869 | 4.1% | 1.3 µs | 138.4 MiB | 44.7 ms |
| python-telegram-bot | 28,080 | 4.0% | 37 µs | 41.4 MiB | 145.0 ms |

CV is the coefficient of variation across throughput rounds. Peak RSS compares Telly with grammY directly under Node; the Python value describes the full Python stack.

```bash
bun run bench:setup
bun run bench
bun run bench:baseline --pin <idle-cpu>
```

[`benchmarks/README.md`](./benchmarks/README.md) documents the method, the correctness contract, and how to read results honestly. The full baseline, including diagnostics, raw samples, and environment data, is [checked in](./benchmarks/baselines/2026-09-01T07-28-39-574fbca4-full.md).

## Bot API schema

Development uses Bun 1.4. Published packages run on supported Node.js versions without Bun.

The repository pins the complete Telegram Bot API 10.3 source snapshot and its provenance under `bot-api/schema/sources`.

```bash
bun run schema:check
```

The check verifies the source hash, Effect schema, version, entity names, and every type reference.

Test the method and its transport contract with `bun test test/bot.test.ts`.
