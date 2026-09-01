import { readFile } from "node:fs/promises";

import { Bot } from "grammy";

import {
  makeMetrics,
  record,
  runFramework,
} from "../js-common.mjs";

const packageJson = JSON.parse(await readFile(new URL("./node_modules/grammy/package.json", import.meta.url)));
const bot = new Bot("123456:grammy-benchmark", {
  botInfo: {
    first_name: "Benchmark",
    id: 123456,
    is_bot: true,
    username: "benchmark_bot",
  },
});
let current = makeMetrics();
let sentinel = 0;

bot.command("bench", (context) => {
  record(current, "command", context.match, context.update.update_id);
});
bot.on("message:text", async (context) => {
  if (context.message.text === "__await__") {
    await Promise.resolve();
    sentinel += 1;
    return;
  }
  record(current, "text", context.message.text, context.update.update_id);
});
bot.on("callback_query:data", (context) => {
  record(current, "callback", context.callbackQuery.data, context.update.update_id);
});

await runFramework({
  close: async () => {},
  dispatchIngress: async (entry) => {
    await bot.handleUpdate(entry.update);
  },
  dispatchRouting: async (entry) => {
    await bot.handleUpdate(entry.native);
  },
  framework: "grammy",
  metrics: () => current,
  preflight: async (entries) => {
    current = makeMetrics();
    for (const kind of ["text", "command", "callback"]) {
      const entry = entries.find((value) => value.kind === kind);
      if (entry === undefined) throw new Error(`Missing ${kind} preflight update`);
      await bot.handleUpdate(entry.update);
    }
    await bot.handleUpdate({
      message: {
        chat: { id: 71, type: "private" },
        date: 1_700_000_000,
        from: { first_name: "Benchmark", id: 17, is_bot: false },
        message_id: 1,
        text: "__await__",
      },
      update_id: 1,
    });
    await bot.handleUpdate({ update_id: 2 });
    if (
      current.text !== 1 ||
      current.command !== 1 ||
      current.callback !== 1 ||
      sentinel !== 1
    ) {
      throw new Error("grammY routing preflight failed");
    }
  },
  prepareRouting: async (entries) => entries.map((entry) => ({ ...entry, native: entry.update })),
  reset: () => {
    current = makeMetrics();
  },
  version: packageJson.version,
});
