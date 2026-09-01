import { Application, SqliteInbox } from "../../../index.ts";
import { sedBot } from "../../../examples/superseriousbot/sed.ts";

const token = process.env.TELLY_E2E_BOT_TOKEN;
const apiRoot = process.env.TELLY_E2E_API_ROOT;
const databasePath = process.env.TELLY_E2E_DATABASE_PATH;
if (token === undefined || apiRoot === undefined || databasePath === undefined) {
  throw new Error("Missing SuperSeriousBot sed E2E configuration");
}

const inbox = await SqliteInbox.open(databasePath);
const app = Application.make({ apiRoot, inbox, token });
console.log("ready");
try {
  await app.runPolling(sedBot, {
    allowedUpdates: ["message"],
    concurrency: 1,
    pollTimeoutSeconds: 2,
  });
} finally {
  inbox.close();
}
