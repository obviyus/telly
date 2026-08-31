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

`Application.run` rejects with `BotApiError`. Its `message` explains the failure, and `retrySafe` states whether retrying can duplicate a side effect.

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

`Application.startPolling` runs updates with bounded concurrency. Updates from one chat stay in order. Routes use Telegram entities and give each handler narrowed data.

```ts
import { Application, command, on, routes, sendMessage, text } from "telly";

const token = process.env.BOT_TOKEN;
if (token === undefined) throw new Error("Set BOT_TOKEN");

const app = Application.make({ token });
const handler = routes(
  on(command("start"), ({ message }) =>
    sendMessage({ chatId: message.chat.id, text: "Welcome!" })
  ),
  on(text(), ({ message, text }) =>
    sendMessage({ chatId: message.chat.id, text: `You said: ${text}` })
  ),
);
const polling = app.startPolling(handler, { concurrency: 16 });

try {
  await polling.completed;
} finally {
  await app.close();
}
```

The default `on-complete` acknowledgment confirms only the contiguous prefix of successful updates. Use `on-receipt` when a process crash may lose accepted work.

`command("start")` reads Telegram's `bot_command` entity. It handles `/START`, `/start@this_bot`, `args`, and the original `argText`. `text()` matches ordinary text but excludes commands. `routes` runs the first match. Use `every` to run several route groups for each update.

`command` matches new `update.message` text only. It excludes edits, captions, and channel posts. `every` runs handlers in order and fails fast, so a failed handler skips later handlers and stops polling.

## Bot API schema

Development uses Bun 1.4. Published packages run on supported Node.js versions without Bun.

The repository pins the complete Telegram Bot API 10.3 source snapshot and its provenance under `bot-api/schema/sources`.

```bash
bun run schema:check
```

The check verifies the source hash, Effect schema, version, entity names, and every type reference.

Test the method and its transport contract with `bun test test/bot.test.ts`.
