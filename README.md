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

`downloadFile({ fileId })` resolves Telegram's temporary file path and returns a `Uint8Array`. The hosted Bot API currently limits downloads to 20 MB, and resolved paths remain valid for at least one hour.

Uploads use Web `Blob` values. Use `File` when Telegram should receive a filename: `sendPhoto({ chatId, photo: new File([bytes], "photo.png") })`.

Managed bot tokens stay redacted and pass directly into another application:

```ts
const managedToken = await app.run(getManagedBotToken({ userId: 123 }));
const managedApp = Application.make({ token: managedToken });
```

Tests use `FakeBotApi.make({ token })` from `telly/testing` and pass `fake.layer` to `Application.make` as `httpClient`.

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

`respond` sends to the triggering chat without quoting. `reply` quotes the triggering message. Both preserve its business connection, forum thread, and direct-message topic.

Advanced routing also provides `repliedMessage`, `regex`, `media`, `chatType`, and `mention` from the package root. Compose filters with `Filter.and`, `Filter.or`, and `Filter.not`, bind them with `on`, group first-match routes with `routes`, and run overlapping groups with `every`.

`command` matches new `update.message` text only. It excludes edits, captions, and channel posts. `every` runs handlers in order and fails fast, so a failed handler skips later handlers and stops polling.

## Durable inbox

Pass an `InboxStore` to save every update before Telegram receives an acknowledgment. One fenced worker replays saved updates, keeps each conversation in order, retries typed handler failures, and parks an update after five attempts.

```ts
import { Application, MemoryInbox } from "telly";

const app = Application.make({
  token,
  inbox: MemoryInbox.make(),
});

await app.runPolling(bot);
```

`MemoryInbox` implements the complete inbox protocol but loses its contents when the process exits. Use it for development and adapter tests, never for a durability claim. Production applications supply a durable `InboxStore`; Telly acknowledges only `Stored` or `Duplicate` updates and applies backpressure when its default 10,000-update capacity is full.

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

## Bot API schema

Development uses Bun 1.4. Published packages run on supported Node.js versions without Bun.

The repository pins the complete Telegram Bot API 10.3 source snapshot and its provenance under `bot-api/schema/sources`.

```bash
bun run schema:check
```

The check verifies the source hash, Effect schema, version, entity names, and every type reference.

Test the method and its transport contract with `bun test test/bot.test.ts`.
