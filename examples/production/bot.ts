import {
  defineBot,
  defineJobs,
  Effect,
  job,
  respond,
  Schema,
  sendMessage,
  type JobStoreService,
} from "../../index.ts";

export function makeProductionBot(store: JobStoreService) {
  const jobs = defineJobs({
    reminder: job({
      payload: Schema.Struct({ chatId: Schema.Int, text: Schema.String }),
      run: ({ chatId, text }) => sendMessage({ chatId, text }),
    }),
  }, { store });
  const bot = defineBot({
    commands: {
      remind: ({ argText, message }) => jobs.schedule("reminder", {
        after: "10 seconds",
        payload: {
          chatId: message.chat.id,
          text: argText.length === 0 ? "Time is up." : argText,
        },
      }).pipe(
        Effect.andThen(respond(message, "Reminder scheduled for 10 seconds.")),
      ),
      start: ({ message }) => respond(message, "Production bot is ready."),
    },
  });
  return { bot, jobs };
}
