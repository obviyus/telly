import {
  answerCallbackQuery,
  Application,
  callbackData,
  conversation,
  Conversation,
  defineBot,
  Effect,
  respond,
  Schema,
  SqliteConversations,
  text,
} from "../../../index.ts";

const token = process.env.TELLY_E2E_BOT_TOKEN;
const apiRoot = process.env.TELLY_E2E_API_ROOT;
const databasePath = process.env.TELLY_E2E_DATABASE_PATH;
if (token === undefined || apiRoot === undefined || databasePath === undefined) {
  throw new Error("Missing Telly conversations E2E configuration");
}

const store = await SqliteConversations.open(databasePath);
const confirmation = callbackData("order", Schema.Struct({
  answer: Schema.Literals(["yes", "no"]),
}));
const order = conversation({
  name: "order",
  steps: {
    confirm: Conversation.step({
      filter: confirmation,
      run: ({ callbackQuery: query, data }, state) => {
        const answer = answerCallbackQuery({ callbackQueryId: query.id });
        if (query.message === undefined) return answer.pipe(Effect.asVoid);
        if (data.answer === "no") {
          return Effect.all([answer, respond(query.message, `cancelled:${state.run}`)], {
            concurrency: "unbounded",
            discard: true,
          }).pipe(Effect.as(Conversation.end()));
        }
        return Effect.all([answer, respond(query.message, `note:${state.run}`)], {
          concurrency: "unbounded",
          discard: true,
        }).pipe(Effect.as(Conversation.next("note", state)));
      },
      state: Schema.Struct({ run: Schema.String }),
    }),
    note: Conversation.step({
      filter: text(),
      run: ({ message, text: note }, state) =>
        respond(message, `done:${state.run}:${note}`).pipe(
          Effect.as(Conversation.end()),
        ),
      state: Schema.Struct({ run: Schema.String }),
    }),
  },
  store,
});
const bot = defineBot({
  commands: {
    order: ({ argText, message }) => respond(message, {
      replyMarkup: {
        inlineKeyboard: [[
          confirmation.button("Yes", { answer: "yes" }),
          confirmation.button("No", { answer: "no" }),
        ]],
      },
      text: `confirm:${argText}`,
    }).pipe(Effect.andThen(order.enter(message, "confirm", { run: argText }))),
  },
  conversations: [order],
});
const app = Application.make({ apiRoot, rateLimit: false, token });

console.log("ready");
try {
  await app.runPolling(bot, {
    allowedUpdates: ["callback_query", "message"],
    concurrency: 1,
    pollTimeoutSeconds: 2,
  });
} finally {
  await app.close();
  store.close();
}
