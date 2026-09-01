import { Application, SqliteInbox } from "../../index.ts";

import { sedBot } from "./sed.ts";

const token = process.env["BOT_TOKEN"];
if (token === undefined) throw new Error("Set BOT_TOKEN");

const inbox = await SqliteInbox.open(process.env["TELLY_DB"] ?? "./telly.db");
const apiRoot = process.env["TELLY_API_ROOT"];
const app = Application.make({
  ...(apiRoot === undefined ? {} : { apiRoot }),
  inbox,
  token,
});

try {
  await app.runPolling(sedBot);
} finally {
  await app.close();
  inbox.close();
}
