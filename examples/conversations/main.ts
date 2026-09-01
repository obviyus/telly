import { Application, SqliteConversations } from "../../index.ts";

import { makeOrderBot } from "./bot.ts";

const token = process.env["BOT_TOKEN"];
if (token === undefined) throw new Error("Set BOT_TOKEN");

const store = await SqliteConversations.open(process.env["TELLY_DB"] ?? "./telly.db");
const app = Application.make({ token });

try {
  await app.runPolling(makeOrderBot(store));
} finally {
  store.close();
}
