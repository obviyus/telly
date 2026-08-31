# Telly Vision

Telly is an Effect-native framework for the Telegram Bot API. Coding agents are its first users. Humans are its second users. Telly gives both one correct way to build, run, and prove a Telegram bot.

This document is the product and architecture contract. Each section states its decisions. A section with measurable guarantees ends in the `Done when` condition that proves them. It carries no dates and no task list.

## Scope

- Telly covers the Telegram HTTP Bot API only. MTProto client interfaces and the Gateway API stay out until a separate product decision changes this document.
- Telly targets the current published Bot API version at all times.

## Lineage

[python-telegram-bot](https://docs.python-telegram-bot.org/) is the quality standard. Telly translates its design qualities into TypeScript and Effect. Its class structure stays in Python.

Qualities we keep:

- One application object owns the full lifecycle: build, start, run, stop.
- A builder makes configuration explicit and readable.
- Handlers and composable filters route updates.
- Typed domain objects mirror the Bot API and hide transport detail.
- Defaults apply once and reach every call.
- Rate limiting, persistence, and job scheduling are part of the core.
- Reference documentation is complete, generated where possible, and current.

Qualities we change:

- Effect replaces class hierarchies and exceptions. Every operation states its success type, its error types, and its required services.
- Structured concurrency replaces threads and ad hoc queues.
- Schemas replace hand-written validation.

## Agent-first interface

A coding agent must use a Telly feature correctly with the least context and the fewest decisions. Human ergonomics matter, but agent generation reliability wins ties.

- One canonical path exists for each task.
- Beginner bots declare commands, text, and callback-query handlers with `defineBot`. Advanced bots compose the same routing engine with filters.
- Built-in message filters inspect new `update.message` values. Other Telegram update variants require an explicit filter.
- Production code imports application features, Bot API methods, and Telegram types from the package root. Test tools use the `testing` subpath.
- Modules are deep: small surface, substantial behavior.
- Telly uses the fewest concepts that express its behavior without hiding a contract.
- Names use Telegram domain words. Generic names such as `manager`, `helper`, and `util` stay out of the public interface.
- Known public fields use `camelCase`. Schema codecs translate them to Telegram's `snake_case` wire keys. Unknown day-zero fields keep their wire names until Telly types them.
- Uploads are Web `Blob` values, or `File` values when the name matters. Telly chooses JSON or multipart from the value; no public parameter names a transport or an `attach://` reference.
- Types and schemas encode the contract. A value that passes the schema is valid for the call.
- A method whose Telegram schema has no fields takes zero arguments. A method with fields takes exactly one options object, even when every field is optional.
- Options objects with named fields replace positional variants and overloads.
- Conversation operations take the triggering message plus text or one options object. `respond` sends without quoting; `reply` quotes the triggering message.
- Errors are typed values in the Effect error channel. Each error has a useful message and a `retrySafe` value that states whether retrying can duplicate a side effect.
- Every documented feature has an executable example that runs in tests.
- Reference data for methods, types, errors, and limits is generated from the schema and shipped in machine-readable form.
- Import paths are stable. A path that ships is a path we keep.

Done when:

- A coding agent with only the package, its reference data, and `AGENTS.md` produces a correct bot for a documented feature on the first attempt, measured on a fixed task set.
- Every public import path that shipped still resolves in the current release.
- A structural distillation pass finds no accidental special case, duplicate path, or redundant state in the public path.

## Effect-native contract

Telly is Effect v4 native from the public interface through the implementation. The Effect value is the only public form of an operation.

Terms:

- **Effect**: a value that describes a computation with typed success, error, and requirement channels.
- **Schema**: a runtime description of a type that decodes, encodes, and validates data.
- **Service**: a capability, such as a clock or an HTTP client, identified by a Context tag.
- **Layer**: a recipe that builds services and their dependencies.
- **Scope**: the lifetime that owns resources and releases them on exit or interruption.

How Telly uses Effect:

- Bot API methods are Effects. Their requirements name the services they need.
- Operations that Telegram does not define as one method, such as `downloadFile`, are hand-written Effects requiring `Bot` and ship beside generated methods at the package root.
- Handlers are Effects. Effect combinators and Layers are the single composition model for timing, tracing, error reporting, and application policy.
- `Application` owns the HTTP client and managed runtime. Its `run` method bridges an operation to a Promise only at the application edge. An optional HTTP client Layer replaces the default fetch client without changing the operation.
- `Application.runPolling` is the beginner lifecycle: it starts polling, exposes failures through its Promise, handles process stop signals, and closes the runtime.
- `Application.startWebhook` exposes a Web `Request` to `Response` function plus explicit completion and stop handles.
- Bot API objects are Schemas. Decoding preserves unknown fields.
- `Message` is generated from Telegram's wire contract and remains the single Message model. Derived facts are pure functions; operations that contact Telegram are Effects requiring `Bot` and accept the message as input.
- External systems sit behind small service interfaces: HTTP transport, clock, random, persistence, inbox, job store, logger, tracer, metrics.
- Layers wire real services for production and deterministic services for tests.
- Runtimes own a Scope. Interruption of the Scope cancels polling, drains work, and releases resources.
- Streams carry updates from transport to handlers.
- Schedules define retry, backoff, and rate limit timing.
- Secrets, including the bot token, are `Redacted` values. The redaction guarantee lives under Runtime correctness.

Done when:

- Every exported operation is an Effect with explicit success, error, and requirement types, checked by the type build.

## Bot API freshness

Telly owns its schema pipeline. No upstream review step sits between a Telegram release and a Telly release.

- A normalized schema for the full Bot API is checked into the repository.
- A generator produces types, Schemas, method definitions, reference data, and the coverage manifest from that schema.
- Inputs to the normalizer can include the official documentation page and third-party scrapes such as [telegram-bot-api-spec](https://github.com/PaulSonOfLars/telegram-bot-api-spec). No input is trusted alone. Disagreement between inputs blocks the update.
- An explicit override file records every hand decision. The override file wins over all inputs.
- A drift check compares the checked-in schema with the live documentation and with Telegram's changelog. A named item that is missing on either side blocks the update.
- Release automation regenerates, tests, and publishes when the drift check passes and a maintainer approves.

Day-zero access:

- Decoded objects keep unknown fields. A new field in a Telegram release is readable before Telly types it.
- A raw call path sends any method name with any parameters and returns the decoded result. A new method is callable before Telly types it.

Done when:

- Every method and type in the current published Bot API exists in the generated interface. The drift check reports zero unexplained differences.
- A new Bot API release reaches a Telly release with edits only to the override file and evidence manifest, or with none.

## Runtime correctness

Telly ships the production runtime that consumers currently build themselves. Each guarantee is explicit, named, and tested.

Terms:

- **Offset**: the number Telly sends to `getUpdates` to confirm which updates it has received. Telegram deletes confirmed updates. Confirmation is contiguous: confirming update N confirms every update before N.
- **Acknowledgment**: the moment Telly advances the offset for an update.
- **Conversation key**: the value that groups updates that must run in order, by default the chat.

Guarantees:

- Acknowledgment mode is explicit. `on-receipt` advances the offset when Telly fetches an update. `on-complete` advances the offset past the contiguous prefix of completed updates. `inbox` writes each update to a durable store and then advances the offset.
- The durable inbox is optional. Telly defines the interface. The consumer supplies the durable store. A receiver acknowledges only an atomic `Stored` or `Duplicate` result; `Full` applies backpressure. One fenced dispatch lease per bot claims the oldest eligible update for each conversation key. Restart or lease succession reclaims incomplete updates. Delivery is at least once, bounded by Telegram's update retention before save and by the supplied store's durability after save.
- Inbox attempts have four settlements: done, retry, parked, or interrupted. Typed handler failures retry with persisted backoff and park after a bounded attempt count. Graceful interruption refunds its attempt. Defects remain defects and leave the update reclaimable.
- Updates with the same conversation key run in order. Updates with different keys run in parallel.
- Concurrency is bounded. Polling pauses when the in-flight limit is reached. Every queue has a limit; the inbox default is 10,000 non-terminal updates.
- Telly dispatches each update once inside one process, even when an unacknowledged batch is fetched again.
- Webhooks share concurrent duplicate work and remember the latest 4096 completed update identifiers per process. Restart delivery remains at least once until a durable inbox is configured.
- A webhook at capacity returns `503`, so Telegram retains ownership and retries instead of growing an internal queue.
- A handler has no mandatory timeout. A stalled offset raises an observable event that names the blocking update and key.
- Cancellation flows through Effect interruption. Stop aborts the in-flight poll, waits for it, drains handlers within a stated grace period, persists the offset, and then completes.
- Conflict recovery is typed. A `getUpdates` conflict caused by an overlapping poll retries within a bounded budget. A conflict caused by an active webhook fails at once. The policy is configurable.
- Retry classification is explicit. Generated method metadata states whether retrying after an unknown outcome can duplicate a side effect. A request gets at most three attempts. Telly retries `429` and `5xx` Telegram rejections, and retries transport or invalid-response failures only for intrinsically safe methods. Raw calls treat an unknown outcome as unsafe. `retryUnknownOutcome` explicitly accepts duplicate side effects for one operation.
- Message rate limits apply Telegram's documented defaults: 30 messages per second overall, one per second in one chat, and 20 per minute in one group. Paid broadcasts use their documented 1000-per-second overall limit. Every `429` with `retryAfter` pauses message calls bot-wide and waits at least the stated duration before retrying. Telegram does not publish every effective limit, so Telly claims only these limits.
- Redaction is total. Telly holds the bot token and other secrets in `Redacted` values and never emits a plaintext secret in an error, log, trace, URL, fixture, or proof artifact.
- Webhook and long polling are two runtimes over one dispatch model. Webhook handling accepts a Web `Request` and returns a Web `Response`. Secret token verification is on by default.
- Observability is built in. Every runtime decision emits traces, metrics, and structured logs through Effect observability. A consumer that wants external telemetry supplies exporter Layers.

Done when:

- The hermetic Bot API fake proves every guarantee in this section, including per-key ordering under parallel load, bounded in-flight work, and drain within the grace period.
- Under `on-complete` and `inbox`, the fake proves at-least-once delivery within Telegram's update retention and, for `inbox`, within the durability of the supplied store.
- A test proves the bot token appears in no error, log, trace, or URL in clear text.

## Batteries-included core

Telly pulls broadly useful correctness and workflow features into core. Every feature shares one dispatch model, one error model, and one service model.

Core includes:

- Handlers and composable filters.
- Persistence interfaces with useful first-party adapters.
- Conversations: multi-step flows with per-key state.
- Job scheduling: one-time and repeating jobs with a pluggable store.
- Callback data: typed, compact, and verifiable.
- Rate limiting, retry, and defaults.
- Webhook and polling runtimes.
- Testing tools: deterministic service Layers and a hermetic Bot API fake.

Rule for adding to core: the feature must serve most production bots, must fit the shared model without a second concept, and must be provable with tests. A feature that needs its own model stays out of core. Third-party extension happens through the service interfaces and Layers, so core carries no plugin API.

Done when:

- Every core feature has a behavior test that runs it on the shared dispatch, error, and service model.

## Platform

- Bun owns package management, scripts, bundling, and the main test runner. `package.json` declares the pinned Bun version.
- Published artifacts run on the Node.js versions declared in `package.json` without Bun.
- Bun-only interfaces stay in development tooling and tests.
- Runtime code uses Web platform primitives where they exist: `fetch`, `Request`, `Response`, `FormData`, `Blob`, `ReadableStream`, `AbortSignal`.
- The HTTP transport is a service. A consumer replaces it for proxy, DNS, or connection policy without patching Telly.

Done when:

- The built artifact passes a Node.js compatibility and public-interface smoke suite on every supported Node.js version without Bun.

## Performance

Telly targets the lowest measured framework overhead of any Telegram Bot API framework. Framework overhead is the time and resources Telly adds outside Telegram network latency and user handler work.

- Correctness, delivery guarantees, and safety stay fixed during every comparison.
- A public benchmark suite defines representative workloads, input sizes, environments, competitor versions, and measurement methods.
- The suite measures throughput, latency distributions, memory, allocations, startup time, and package cost where each metric matters.
- Comparisons include leading maintained frameworks from other languages when they can run equivalent workloads with equivalent guarantees.
- Profiling identifies the hot path before optimization. The same workload measures the result after optimization.
- A performance change ships only when the measured gain justifies its design and maintenance cost.

Done when:

- Telly ranks first on the primary score of the published benchmark suite without disabling a correctness or safety guarantee.
- Every performance claim links to reproducible baseline, result, variance, environment, and competitor-version data.

## Verification

Tests prove behavior through public interfaces.

Telly owns its behavior-first testing policy and writes it in its own words. [shamashel/testing-on-the-toilet](https://github.com/shamashel/testing-on-the-toilet) and the original [Google Testing Blog](https://testing.googleblog.com/) are its influences.

Layers of proof:

1. Behavior tests run against public interfaces with deterministic Effect services for time, random, and transport.
2. A synchronous hermetic Bot API fake reproduces Telegram semantics: offsets, conflicts, rate limits, error shapes, multipart uploads. The same fake works through `Application` and direct Effect Layers.
3. Node.js compatibility tests load and run the built artifact on every supported Node.js version.
4. Real Telegram Test Server runs produce a structured event timeline for every live claim.

Live proof foundation: the existing OpenClaw skill `telegram-e2e-userbot` drives real user turns on the Test Server with leased team credentials and records timelines. It is OpenClaw-specific today. Telly needs a project-local adapter or a first-party skill before it can run against Telly.

Coverage manifest:

- A machine-readable manifest lists every Bot API method.
- Each method has a status: `proven` with a link to a timeline artifact, or `blocked` with a precise reason and an expiry.
- Destructive and stateful calls use isolated leased bots and explicit cleanup.

Done when:

- The manifest has a `proven` entry with a current Test Server artifact for every Bot API method and no expired `blocked` entry. Only then does Telly claim full coverage.

## First consumer

OpenClaw is the first demanding consumer and the first acceptance test. It runs Telly in production polling, webhook, proxy, and multi-instance conditions.

- Telly serves OpenClaw's needs through its public interface only.
- Telly's names, types, and rules come from Telegram, never from OpenClaw.
- A need that OpenClaw raises enters Telly only when it fits the shared model and serves other bots.

Done when:

- OpenClaw runs on Telly in production with no grammY dependency and no consumer-owned polling, offset, acknowledgment, throttle, or retry code.

## Packaging

- Telly ships as one package.
- The package root exports the production interface. Subpaths may expose testing tools and reference data.
- The package splits only after a proven independent release lifecycle or a proven consumer need.
- The publication name is undecided. The package stays private and named `telly` until that decision.

## References

- [Telegram Bot API](https://core.telegram.org/bots/api)
- [Telegram Bot API changelog](https://core.telegram.org/bots/api-changelog)
- [Telegram Test Server](https://core.telegram.org/bots/features#testing-your-bot)
- [python-telegram-bot documentation](https://docs.python-telegram-bot.org/)
- [Effect](https://effect.website/)
- [Bun documentation](https://bun.sh/docs)
- [telegram-bot-api-spec](https://github.com/PaulSonOfLars/telegram-bot-api-spec)
- [shamashel/testing-on-the-toilet](https://github.com/shamashel/testing-on-the-toilet)
- [Google Testing Blog](https://testing.googleblog.com/)

## Success

Telly succeeds when every `Done when` condition in this document holds at the same time.
