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
} from "../../index.ts";

const token = process.env["BOT_TOKEN"];
if (token === undefined) throw new Error("Set BOT_TOKEN");

const store = await SqliteJobs.open(process.env["TELLY_DB"] ?? "./telly.db");
const jobs = defineJobs({
  reminder: job({
    payload: Schema.Struct({ chatId: Schema.Int, text: Schema.String }),
    run: ({ chatId, text }) => sendMessage({ chatId, text }),
  }),
}, { store });
const bot = defineBot({
  commands: {
    remind: ({ message }) => jobs.schedule("reminder", {
      after: "10 seconds",
      payload: {
        chatId: message.chat.id,
        text: "Ten seconds are up.",
      },
    }).pipe(
      Effect.flatMap((id) => respond(message, `Scheduled ${id}`)),
    ),
  },
});
const app = Application.make({ jobs, token });

try {
  await app.runPolling(bot);
} finally {
  await app.close();
  store.close();
}
