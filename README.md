# Telly

Telly will be an Effect-native Telegram Bot API framework designed primarily for agents.

Read [VISION.md](./VISION.md) for the product direction.

## First method

`sendMessage` is the first generated Bot API method.

```ts
import { Application, sendMessage } from "telly";

const token = process.env.BOT_TOKEN;
if (token === undefined) throw new Error("Set BOT_TOKEN");

const app = Application.make({ token });

try {
  const message = await app.run(
    sendMessage({ chatId: 123, text: "Hello from Telly" }),
  );
  console.log(message.messageId);
} finally {
  await app.close();
}
```

`Application.run` rejects with `BotApiError`. Its `message` explains the failure, and `retrySafe` states whether retrying can duplicate a side effect.

Tests use `FakeBotApi.make({ token })` from `telly/testing` and pass `fake.layer` to `Application.make` as `httpClient`.

## Bot API schema

Development uses Bun 1.4. Published packages run on supported Node.js versions without Bun.

The repository pins the complete Telegram Bot API 10.3 source snapshot and its provenance under `bot-api/schema/sources`.

```bash
bun run schema:check
```

The check verifies the source hash, Effect schema, version, entity names, and every type reference.

Test the method and its transport contract with `bun test test/bot.test.ts`.
