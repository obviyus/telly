import {
  Application,
  defineBot,
  defineJobs,
  Effect,
  job,
  respond,
  Schema,
  sendMessage,
  SqliteJobs,
} from "../../../index.ts";

const token = process.env.TELLY_E2E_BOT_TOKEN;
const apiRoot = process.env.TELLY_E2E_API_ROOT;
const databasePath = process.env.TELLY_E2E_DATABASE_PATH;
if (token === undefined || apiRoot === undefined || databasePath === undefined) {
  throw new Error("Missing Telly jobs E2E configuration");
}

const store = await SqliteJobs.open(databasePath);
const jobs = defineJobs({
  reminder: job({
    payload: Schema.Struct({ chatId: Schema.Int, text: Schema.String }),
    run: ({ chatId, text }) => sendMessage({ chatId, text: `reminder:${text}` }),
  }),
}, { store });
const bot = defineBot({
  commands: {
    remind: ({ argText, message, update }) => jobs.schedule("reminder", {
      after: "1 second",
      id: `reminder:${update.updateId}`,
      payload: { chatId: message.chat.id, text: argText },
    }).pipe(
      Effect.flatMap(() => respond(message, `scheduled:${argText}`)),
    ),
  },
});
const app = Application.make({ apiRoot, jobs, token });

console.log("ready");
try {
  await app.runPolling(bot, {
    allowedUpdates: ["message"],
    concurrency: 1,
    pollTimeoutSeconds: 2,
  });
} finally {
  await app.close();
  store.close();
}
