import type { EventEmitter } from "node:events";

import {
  Application,
  setWebhook,
  SqliteInbox,
  SqliteJobs,
} from "../../index.ts";

import { makeProductionBot } from "./bot.ts";

const token = process.env["BOT_TOKEN"];
const secretToken = process.env["WEBHOOK_SECRET"];
const webhookUrl = process.env["WEBHOOK_URL"];
if (token === undefined) throw new Error("Set BOT_TOKEN");
if (secretToken === undefined) throw new Error("Set WEBHOOK_SECRET");
if (webhookUrl === undefined) throw new Error("Set WEBHOOK_URL");

const port = Number(process.env["PORT"] ?? "3000");
if (!Number.isSafeInteger(port) || port < 1 || port > 65_535) {
  throw new Error("PORT must be an integer from 1 to 65535");
}

const database = process.env["TELLY_DB"] ?? "./telly.db";
const inbox = await SqliteInbox.open(database);
const jobStore = await SqliteJobs.open(database);
const { bot, jobs } = makeProductionBot(jobStore);
const app = Application.make({ inbox, jobs, token });
let closing: Promise<void> | undefined;
const close = () => closing ??= app.close();
const stopOnSignal = () => void close();
const processEvents: EventEmitter = process;
processEvents.once("SIGINT", stopOnSignal);
processEvents.once("SIGTERM", stopOnSignal);
let server: ReturnType<typeof Bun.serve> | undefined;

try {
  const webhook = app.startWebhook(bot, { secretToken });
  server = Bun.serve({ fetch: webhook.fetch, port });
  await app.run(setWebhook({ secretToken, url: webhookUrl }));
  console.log(`Telly webhook listening on port ${port}`);
  await webhook.completed;
} finally {
  processEvents.off("SIGINT", stopOnSignal);
  processEvents.off("SIGTERM", stopOnSignal);
  await server?.stop();
  await close();
  inbox.close();
  jobStore.close();
}
