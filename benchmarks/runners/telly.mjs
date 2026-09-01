import { readFile } from "node:fs/promises";

import {
  Application,
  defineBot,
  Effect,
  Schema,
  Update,
} from "../../dist/index.js";

import {
  makeMetrics,
  record,
  runFramework,
} from "./js-common.mjs";

const packageJson = JSON.parse(await readFile(new URL("../../package.json", import.meta.url)));
const token = "123456:telly-benchmark";
const app = Application.make({ rateLimit: false, token });
const decode = Schema.decodeUnknownSync(Update);
const decodeExit = Schema.decodeUnknownExit(Update);
let current = makeMetrics();
let sentinel = 0;

const handler = defineBot({
  callbackQuery: ({ callbackQuery, update }) => Effect.sync(() => {
    record(current, "callback", callbackQuery.data ?? "", update.updateId);
  }),
  commands: {
    bench: ({ argText, update }) => Effect.sync(() => {
      record(current, "command", argText, update.updateId);
    }),
  },
  text: ({ text, update }) => text === "__await__"
    ? Effect.yieldNow.pipe(Effect.tap(() => Effect.sync(() => {
        sentinel += 1;
      })))
    : Effect.sync(() => {
        record(current, "text", text, update.updateId);
      }),
});

function recordDecoded(update) {
  if (update.callbackQuery !== undefined) {
    record(current, "callback", update.callbackQuery.data ?? "", update.updateId);
    return;
  }
  const text = update.message?.text ?? "";
  const command = update.message?.entities?.[0]?.type === "bot_command";
  record(current, command ? "command" : "text", command ? text.slice(7) : text, update.updateId);
}

await runFramework({
  close: () => app.close(),
  decode: async (entry) => {
    recordDecoded(decode(entry.update));
  },
  dispatchIngress: async (entry) => {
    await app.run(handler(decode(entry.update)));
  },
  dispatchRouting: async (entry) => {
    await app.run(handler(entry.native));
  },
  framework: "telly",
  metrics: () => current,
  preflight: async (entries) => {
    current = makeMetrics();
    for (const kind of ["text", "command", "callback"]) {
      const entry = entries.find((value) => value.kind === kind);
      if (entry === undefined) throw new Error(`Missing ${kind} preflight update`);
      await app.run(handler(decode(entry.update)));
    }
    await app.run(handler(decode({
      message: {
        chat: { id: 71, type: "private" },
        date: 1_700_000_000,
        from: { first_name: "Benchmark", id: 17, is_bot: false },
        message_id: 1,
        text: "__await__",
      },
      update_id: 1,
    })));
    await app.run(handler(decode({ update_id: 2 })));
    for (const invalid of [
      {},
      {
        message: {
          chat: { id: 71, type: "private" },
          date: "not-an-integer",
          message_id: 3,
        },
        update_id: 3,
      },
      {
        message: {
          chat: { id: 71, type: "private" },
          date: 1_700_000_000,
          entities: [{ length: 6, offset: "zero", type: "bot_command" }],
          message_id: 4,
          text: "/bench",
        },
        update_id: 4,
      },
    ]) {
      if (decodeExit(invalid)._tag !== "Failure") {
        throw new Error("Telly validation preflight accepted an invalid update");
      }
    }
    if (
      current.text !== 1 ||
      current.command !== 1 ||
      current.callback !== 1 ||
      sentinel !== 1
    ) {
      throw new Error("Telly routing preflight failed");
    }
  },
  prepareRouting: async (entries) =>
    entries.map((entry) => ({ ...entry, native: decode(entry.update) })),
  reset: () => {
    current = makeMetrics();
  },
  version: packageJson.version,
});
