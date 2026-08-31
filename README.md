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

`Application.startPolling` runs updates with bounded concurrency. Updates from one chat stay in order. The returned handle exposes failures and controls graceful shutdown.

```ts
import { Application, sendMessage } from "telly";

const token = process.env.BOT_TOKEN;
if (token === undefined) throw new Error("Set BOT_TOKEN");

const app = Application.make({ token });
const polling = app.startPolling(
  (update) => sendMessage({ chatId: 123, text: `Received update ${update.updateId}` }),
  { concurrency: 16 },
);

try {
  await polling.completed;
} finally {
  await app.close();
}
```

The default `on-complete` acknowledgment confirms only the contiguous prefix of successful updates. Use `on-receipt` when a process crash may lose accepted work.

## Bot API schema

Development uses Bun 1.4. Published packages run on supported Node.js versions without Bun.

The repository pins the complete Telegram Bot API 10.3 source snapshot and its provenance under `bot-api/schema/sources`.

```bash
bun run schema:check
```

The check verifies the source hash, Effect schema, version, entity names, and every type reference.

Test the method and its transport contract with `bun test test/bot.test.ts`.
