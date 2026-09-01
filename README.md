# 📺 Telly

**The Effect-native Telegram Bot API framework where the correct bot is the easy bot.**

Telly gives you one canonical way to build, run, and prove a Telegram bot. Coding agents are its first users, humans a close second — so every feature has one obvious path, every operation has typed errors, and major documented behaviors have executable tests. [VISION.md](./VISION.md) is the product contract behind all of it.

## Your first broadcast

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

That is the whole bot. `runPolling` starts polling, surfaces failures through its Promise, handles stop signals, and closes the runtime. This exact bot lives in [`examples/beginner`](./examples/beginner) and runs in [`test/reference-bots.test.ts`](./test/reference-bots.test.ts).

You never configured Effect. You do not have to.

## 📺 Channel guide

Everything below lives behind one package interface, on one dispatch model, one error model, and one service model.

| Channel | What is on |
| --- | --- |
| [Routing](#routing) | Commands, text, media, mentions, regex, and composable filters |
| [Typed callback data](#typed-callback-data) | Schema-checked buttons that route themselves |
| [Conversations](#durable-conversations) | Multi-step flows with per-step state schemas |
| [Jobs](#durable-jobs) | One-time and repeating work with durable stores |
| [Durable inbox](#the-durable-inbox) | Save every update before acknowledging Telegram |
| [Polling and webhooks](#webhooks) | One bot definition, two runtimes |
| [Rate limits and retries](#rate-limits-and-retries) | Telegram's documented limits and safety-classified retries, on by default |
| [Request validation](#request-validation) | Reject invalid calls before they touch the network |
| [Testing](#testing) | A hermetic Bot API fake that speaks real Telegram protocol |
| [Full schema coverage](#bot-api-coverage) | Every Bot API 10.3 method and type, generated and verified |

Observability is built in too: hot-path outcomes emit Effect metrics and span attributes, and successful updates create no log noise.

## Effect inside, optional outside

Every Telly operation is an [Effect](https://effect.website/) value with typed success, error, and requirement channels. `Application` owns the runtime and bridges to Promises at the edge, so beginners call `app.run(...)` and `app.runPolling(...)` and never touch Effect machinery.

```ts
import { Application, getMe, sendMessage } from "telly";

const app = Application.make({ token });

try {
  const me = await app.run(getMe());
  const sent = await app.run(sendMessage({ chatId: 123, text: "Hello from Telly" }));
  console.log(me.firstName, sent.messageId);
} finally {
  await app.close();
}
```

Advanced users compose those same values with Effect. The package root re-exports the `Effect` and `Schema` modules, so everyday composition needs no second import:

```ts
import { Effect, getMe, sendMessage } from "telly";

const announce = Effect.gen(function* () {
  const me = yield* getMe();
  yield* sendMessage({ chatId: 123, text: `${me.firstName} is on the air.` });
});

await app.run(announce);
```

The rest of the Effect library — Layers, Scopes, the Clock — comes from the `effect` package directly, and Telly's operations compose with all of it. Handlers are Effects. Layers wire real services in production and deterministic ones in tests. An optional HTTP client Layer replaces the default fetch transport without changing any operation. Failures are typed values: `app.run` rejects with `BotApiError`, whose `retrySafe` field states whether retrying can duplicate a side effect.

## One dialect: camelCase

Public fields use `camelCase`. Schema codecs translate to Telegram's `snake_case` wire keys, so `chatId` goes out as `chat_id` and `message.messageId` comes back typed. Decoded objects keep unknown fields under their wire names, so a day-zero Telegram field is readable before Telly types it.

A method with no Telegram parameters takes zero arguments: `getMe()`. A method with parameters takes exactly one options object: `getMyName({})`. No positional variants, no overloads.

Set outgoing defaults once and they reach every generated method that accepts the field:

```ts
const app = Application.make({
  token,
  defaults: {
    linkPreviewOptions: { isDisabled: true },
    parseMode: "HTML",
  },
});
```

A key present on one call wins, including an explicit `undefined` as an opt-out. Uploads are Web `Blob` values — use `File` when Telegram should see a filename — and Telly picks JSON or multipart from the value.

## Routing

`defineBot` declares commands, text, and callback-query handlers without exposing routing machinery. Underneath sits a filter engine you can compose directly: `command`, `text`, `regex`, `media`, `mention`, `entity`, `chatType`, `callbackQuery`, and `repliedMessage`, combined with `Filter.and`, `Filter.or`, and `Filter.not`, bound with `on`, grouped first-match with `routes`, and run as overlapping groups with `every`.

This is the heart of SuperSeriousBot's reply-based `sed` feature, ported in full in [`examples/superseriousbot`](./examples/superseriousbot):

```ts
import { Effect, Filter, on, regex, repliedMessage, reply, routes } from "telly";

const sedBot = routes(
  on(
    Filter.and(repliedMessage(), regex(/^s\/[\s\S]*\/[\s\S]*/u)),
    ([{ repliedMessage }, { text }]) => {
      if (repliedMessage.text === undefined) return Effect.void;
      const [, search = "", replacement = ""] = text.split("/");
      return reply(repliedMessage, repliedMessage.text.replaceAll(search, replacement));
    },
  ),
);
```

Both filter matches arrive typed, in order. Pure helpers resolve Telegram's overlapping fields without wrapping the generated models: `updateContext(update)` derives the effective chat, message, user, and acting sender for every update type; `messageText`, `messageMedia`, `messageSender`, `messageReply`, and `messageEntities` do the same for messages. `respondTo(message)` and `replyTo(message)` spread a full destination — business connection, forum thread, and topic included — into any generated send method. `html.escape` and `markdownV2.escape` keep user input from breaking your parse mode.

## Typed callback data

One callback definition packs buttons and acts as its own routing filter:

```ts
import { answerCallback, callbackData, on, Schema } from "telly";

const choice = callbackData("choice", Schema.Struct({
  answer: Schema.Literals(["yes", "no"]),
}));

choice.button("Yes", { answer: "yes" });

on(choice, ({ callbackQuery, data }) =>
  answerCallback(callbackQuery, { text: `You chose ${data.answer}` }));
```

Packing validates the payload and enforces Telegram's exact 64-byte UTF-8 limit at pack time, not in production at 2 a.m. Malformed, stale, or foreign callback data simply does not match the filter. Payload validation is not authorization — check `callbackQuery.from` before sensitive actions.

## Durable conversations

A conversation stores one schema-checked step per chat and user. Handlers return `Conversation.next(...)` or `Conversation.end()`; returning `void` keeps the current step.

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

Attach it with `defineBot({ conversations: [order] })` and start it with `order.enter(message, "confirm", { orderId: 42 })`. State advances only after a handler succeeds, and versioned compare-and-set writes reject concurrent updates. Updates that do not match the active step fall through to normal routing instead of vanishing. [`examples/conversations`](./examples/conversations) shows the complete command → button → text flow with cancellation.

## Durable jobs

Define each job once with a stable name and a payload schema. The application runs due jobs beside polling or webhook delivery:

```ts
const jobs = defineJobs({
  reminder: job({
    payload: Schema.Struct({ chatId: Schema.Int, text: Schema.String }),
    run: ({ chatId, text }) => sendMessage({ chatId, text }),
  }),
}, { store: await SqliteJobs.open("./telly.db") });

const app = Application.make({ jobs, token });

await app.run(jobs.schedule("reminder", {
  after: "10 minutes",
  payload: { chatId: 123, text: "Stand up." },
}));
```

Repeating jobs keep their cadence, never overlap themselves, and coalesce missed occurrences into one run after downtime. A caller-supplied identifier makes scheduling idempotent until its completed record reaches the retention limit. Typed failures retry with persisted backoff; exhausted jobs park instead of looping forever. [`examples/jobs`](./examples/jobs) is a complete reminder bot.

## The durable inbox

Pass an inbox store and Telly saves every update durably before Telegram hears an acknowledgment:

```ts
import { Application, SqliteInbox } from "telly";

const inbox = await SqliteInbox.open("./telly.db");
const app = Application.make({ token, inbox });

try {
  await app.runPolling(bot);
} finally {
  await app.close();
  inbox.close();
}
```

One fenced worker replays saved updates, keeps each conversation in order, retries typed handler failures with persisted backoff, and parks an update after five attempts. `SqliteInbox` uses write-ahead logging and full synchronous durability; `MemoryInbox` speaks the same protocol for development. The inbox acknowledges only atomic `Stored` or `Duplicate` results and applies backpressure at its default 10,000-update capacity instead of growing without bound.

Without an inbox, acknowledgment is still explicit: the default `on-complete` mode confirms only the contiguous prefix of completed updates, and `on-receipt` confirms on fetch when losing accepted work is acceptable.

### Reruns, guaranteed

Be clear-eyed about what durability means:

- **Delivery is at least once.** A crash after your handler's external side effect but before durable settlement runs that handler again on restart.
- **Idempotency is your half of the contract.** Key downstream writes and payments on `updateId` for updates and on the job identifier for jobs.
- **Ordering is per conversation key.** Updates with the same key (by default, the chat) run in order; different keys run in parallel, under a bounded concurrency limit.
- Within one process, each update dispatches once even when an unacknowledged batch is fetched again.

## Webhooks

The same bot definition serves any server that speaks Web `Request` and `Response`:

```ts
const app = Application.make({ token });
const webhook = app.startWebhook(bot, { secretToken });
const server = Bun.serve({ fetch: webhook.fetch, port: 3000 });

try {
  await app.run(setWebhook({ secretToken, url: webhookUrl }));
  await webhook.completed;
} finally {
  await server.stop();
  await app.close();
}
```

Secret-token verification is on by default and rejects bad requests before reading the body. A webhook at capacity returns `503`, so Telegram keeps ownership and retries instead of Telly hoarding an internal queue. Each process remembers the latest 4096 completed update identifiers to absorb Telegram's redeliveries; add the durable inbox when restarts must not replay work into your side effects unkeyed.

Polling is just as deliberate: after a `getUpdates` conflict, Telly asks `getWebhookInfo` who owns delivery instead of parsing error text. An overlapping poller gets a 60-second retry budget; an active webhook fails fast with `PollingConflictError`.

## Rate limits and retries

Message calls apply Telegram's documented limits by default: 30 messages per second overall, one per second per chat, 20 per minute per group, and the paid-broadcast 1000-per-second limit when `allowPaidBroadcast` is set. Every `429` with `retryAfter` pauses message calls bot-wide for at least the stated duration. Set `rateLimit: false` only when another system owns pacing.

Retries are safety-classified per generated method. A request gets at most three attempts. Telly retries `429` and `5xx` rejections, and retries transport failures only when the method cannot duplicate a side effect. When a send *might* have landed before its connection died, you opt into the duplicate risk explicitly, per call:

```ts
await app.run(
  sendMessage({ chatId: 123, text: "Worth sending twice" }).pipe(retryUnknownOutcome),
);
```

## Request validation

Telly rejects locally decidable documented constraints — UTF-8 byte limits, string lengths, array sizes, numeric ranges, character patterns — before the request leaves your process:

```text
sendMessage: request rejected before send: replyMarkup.inlineKeyboard[0][0].callbackData: expected 1–64 UTF-8 bytes, received 68
```

Validation errors name the public field path and the expected limit, and never echo the rejected value. Each constraint pins an exact excerpt of Telegram's documentation in [`overrides.json`](./bot-api/schema/overrides.json), so a wording change upstream forces a human re-review.

The bot token and other secrets live in `Redacted` values and stay out of errors, logs, traces, and URLs.

## Testing

`telly/testing` includes a hermetic Bot API fake that reproduces Telegram's update queues, offsets, long polling, conflicts, webhook ownership, error shapes, and multipart uploads without network access. An excerpt from the executable [`test/reference-bots.test.ts`](./test/reference-bots.test.ts):

```ts
import { Application } from "telly";
import { FakeBotApi } from "telly/testing";

const fake = FakeBotApi.make({ token });
const app = Application.make({ httpClient: fake.layer, rateLimit: false, token });

await app.run(beginnerBot(update));

expect(fake.requests[0]?.params).toEqual({
  chat_id: 101,
  text: "Hi! Send me anything.",
});
```

Seed `updates`, call `pushUpdate`, or set `webhookUrl` to exercise delivery without scripting transport replies. `serverRateLimit: true` adds a deterministic approximation of Telegram's documented `sendMessage` limits. Deterministic Effect services drive time and transport, so unit tests never sleep.

## Bot API coverage

Telly generates its entire method and type surface — all 400 Bot API 10.3 types — from a pinned, hash-verified schema snapshot. `bun run schema:check` verifies provenance, version, names, and every type reference; [`bot-api/schema/README.md`](./bot-api/schema/README.md) documents the pipeline. New Telegram fields stay readable before Telly types them, because decoding preserves unknown fields.

Beyond the hermetic fake, Telly proves methods against Telegram's real Test Server and records a structured event timeline for each one. The checked-in [coverage manifest](./bot-api/proofs/manifest.json) currently tracks 185 methods: 149 `proven` with linked timeline artifacts, and 36 `blocked` on Test Server prerequisites — each blocked entry records Telegram's exact error and an expiry date. Telly does not claim full live coverage until every entry is proven.

## Prime-time performance

VISION.md sets the goal: the lowest measured framework overhead of any Telegram Bot API framework, with correctness guarantees intact. The measured evidence so far comes from the checked-in [benchmark suite](./benchmarks/README.md), which races Telly, grammY, and python-telegram-bot through the same deterministic update workload. The primary score covers each framework's update construction or validation, routing, and awaited handler completion — no JSON parsing, no network, no user work.

From the [accepted baseline](./benchmarks/baselines/2026-09-01T07-28-39-574fbca4-full.md), which passed the suite's noise gate:

| Framework | Updates/s | CV | p50 | p95 | p99 | Median peak RSS | Cold startup | Installed size |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Telly | 963,701 | 2.8% | 1.0 µs | 1.3 µs | 1.6 µs | 124.9 MiB | 159.3 ms | 53.5 MiB |
| grammY | 762,869 | 4.1% | 1.3 µs | 1.8 µs | 2.2 µs | 138.4 MiB | 44.7 ms | 2.6 MiB |
| python-telegram-bot | 28,080 | 4.0% | 37 µs | 41 µs | 43 µs | 41.4 MiB | 145.0 ms | 5.4 MiB |

Each framework gets its honest wins. Telly takes primary throughput by 26% and all three latency percentiles — while validating every update into its public schema, which grammY does not attempt. In the direct Node-versus-Node comparison, Telly's median peak memory also beats grammY's; python-telegram-bot's full Python stack posts the lowest memory figure of the three. grammY wins cold startup and installed size decisively: 44.7 ms and 2.6 MiB against Telly's 159.3 ms and 53.5 MiB, which include Effect and stay visible instead of being hidden. CV is the coefficient of variation across throughput rounds; installed size is a descriptive cross-ecosystem comparison, not a quality score.

Reproduce it yourself:

```sh
bun run bench:setup
bun run bench
bun run bench:baseline --pin <idle-cpu>
```

No sample is discarded, and every report ships its raw samples, variance, and environment. [`benchmarks/README.md`](./benchmarks/README.md) explains how to read the numbers honestly.

## Reference bots

Bots keep their Telegram behavior in `bot.ts`; the ones that need process setup keep it in `main.ts`. The beginner, interactive, and production bots run against the fake Bot API in [`test/reference-bots.test.ts`](./test/reference-bots.test.ts). The SuperSeriousBot port has its own behavior tests, and durable jobs have dedicated contract tests.

| Bot | What it demonstrates | Run |
| --- | --- | --- |
| [Beginner](./examples/beginner) | `/start`, text routing, replies | `BOT_TOKEN=... bun run examples/beginner/main.ts` |
| [Interactive](./examples/conversations) | Buttons and a durable conversation | `BOT_TOKEN=... bun run examples/conversations/main.ts` |
| [Jobs](./examples/jobs) | Durable scheduled reminders | `BOT_TOKEN=... bun run examples/jobs/bot.ts` |
| [Production](./examples/production) | SQLite inbox, durable jobs, Bun webhook server | `BOT_TOKEN=... WEBHOOK_SECRET=... WEBHOOK_URL=https://... bun run examples/production/main.ts` |
| [SuperSeriousBot](./examples/superseriousbot) | Real ported feature over the durable inbox | `BOT_TOKEN=... bun run examples/superseriousbot/bot.ts` |

## Runtimes and tooling

Development uses Bun 1.4, pinned in `package.json`. The built artifact runs on Node.js 22 or newer without Bun — `bun run check` typechecks, runs the test suite, verifies the schema, and smoke-tests the build on Node. Runtime code sticks to Web platform primitives: `fetch`, `Request`, `Response`, `FormData`, `Blob`, `ReadableStream`, `AbortSignal`.

## Go deeper

- [VISION.md](./VISION.md) — the product and architecture contract, with every `Done when` condition
- [AGENTS.md](./AGENTS.md) — how agents (and humans) work on this repository
- [Bot API schema pipeline](./bot-api/schema/README.md) — sources, overrides, generation, checks
- [Live-proof coverage manifest](./bot-api/proofs/manifest.json) — per-method Test Server evidence
- [Benchmark methodology](./benchmarks/README.md) and the [accepted baseline](./benchmarks/baselines/2026-09-01T07-28-39-574fbca4-full.md)
- [Examples](./examples) — the reference bots above

## License

[MIT](./LICENSE) © Ayaan ([@obviyus](https://github.com/obviyus))

📺 *Stay tuned.*
