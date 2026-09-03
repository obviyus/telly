import { readFile } from "node:fs/promises";

import {
  CallbackQueryUpdate,
  MessageUpdate,
  Telegram,
} from "puregram";

import {
  makeMetrics,
  record,
  runFramework,
} from "../js-common.mjs";

const packageJson = JSON.parse(await readFile(new URL("./node_modules/puregram/package.json", import.meta.url)));

class BenchmarkTelegram extends Telegram {
  dispatchBenchmark(update) {
    return this.dispatch(update);
  }
}

const telegram = new BenchmarkTelegram({
  bot: {
    first_name: "Benchmark",
    id: 123456,
    is_bot: true,
    username: "benchmark_bot",
  },
  swallowDispatchErrors: true,
  token: "123456:puregram-benchmark",
});
const webhook = telegram.webhookHandler({
  timeoutMilliseconds: 0,
  webhookReply: true,
});
let current = makeMetrics();
let currentEntry;
let sentinel = 0;

function activeEntry() {
  if (currentEntry === undefined) throw new Error("Puregram handler ran without a workload entry");
  return currentEntry;
}

telegram.command("bench", (update) => {
  const entry = activeEntry();
  record(current, "command", update.raw.text?.slice(7) ?? "", entry.updateId);
});
telegram.onMessage(async (update) => {
  const entry = activeEntry();
  if (update.text === "__await__") {
    await Promise.resolve();
    sentinel += 1;
    return;
  }
  record(current, "text", update.text ?? "", entry.updateId);
});
telegram.onCallbackQuery((update) => {
  const entry = activeEntry();
  record(current, "callback", update.data ?? "", entry.updateId);
});

await telegram.start();

async function dispatchIngress(entry) {
  currentEntry = entry;
  await webhook({
    body: entry.update,
    headers: {},
    method: "POST",
  });
}

async function dispatchRouting(entry) {
  currentEntry = entry;
  await telegram.dispatchBenchmark(entry.native);
}

function prepareUpdate(entry) {
  if (entry.kind === "callback") {
    return new CallbackQueryUpdate(entry.update.callback_query, telegram);
  }
  return new MessageUpdate(entry.update.message, telegram);
}

await runFramework({
  close: () => telegram.shutdown(),
  dispatchIngress,
  dispatchRouting,
  framework: "puregram",
  metrics: () => current,
  preflight: async (entries) => {
    current = makeMetrics();
    for (const kind of ["text", "command", "callback"]) {
      const entry = entries.find((value) => value.kind === kind);
      if (entry === undefined) throw new Error(`Missing ${kind} preflight update`);
      await dispatchIngress(entry);
    }
    await dispatchIngress({
      kind: "text",
      payload: "__await__",
      update: {
        message: {
          chat: { id: 71, type: "private" },
          date: 1_700_000_000,
          from: { first_name: "Benchmark", id: 17, is_bot: false },
          message_id: 1,
          text: "__await__",
        },
        update_id: 1,
      },
      updateId: 1,
    });
    await dispatchIngress({
      kind: "text",
      payload: "",
      update: { update_id: 2 },
      updateId: 2,
    });
    if (
      current.text !== 1 ||
      current.command !== 1 ||
      current.callback !== 1 ||
      sentinel !== 1
    ) {
      throw new Error("Puregram routing preflight failed");
    }
  },
  prepareRouting: async (entries) =>
    entries.map((entry) => ({ ...entry, native: prepareUpdate(entry) })),
  reset: () => {
    current = makeMetrics();
  },
  version: packageJson.version,
});
