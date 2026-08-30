# Telly

Telly will be an Effect-native Telegram Bot API framework designed primarily for agents.

The repository contains project scaffolding only. Read [VISION.md](./VISION.md) for the product direction.

Development uses Bun 1.4. Published packages must run on supported Node.js versions without Bun.

## Bot API schema

The repository pins the complete Telegram Bot API 10.3 source snapshot and its provenance under `schema/sources`.

```bash
bun run schema:check
```

The check verifies the source hash, Effect schema, version, entity names, and every type reference.
