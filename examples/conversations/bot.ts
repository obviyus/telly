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
} from "../../index.ts";

const token = process.env["BOT_TOKEN"];
if (token === undefined) throw new Error("Set BOT_TOKEN");

const store = await SqliteConversations.open(process.env["TELLY_DB"] ?? "./telly.db");
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
          return Effect.all([answer, respond(query.message, "Order cancelled.")], {
            concurrency: "unbounded",
            discard: true,
          }).pipe(Effect.as(Conversation.end()));
        }
        return Effect.all([answer, respond(query.message, "Send a kitchen note.")], {
          concurrency: "unbounded",
          discard: true,
        }).pipe(Effect.as(Conversation.next("note", state)));
      },
      state: Schema.Struct({ orderId: Schema.Int }),
    }),
    note: Conversation.step({
      filter: text(),
      run: ({ message, text: note }, state) =>
        respond(message, `Order ${state.orderId}: ${note}`).pipe(
          Effect.as(Conversation.end()),
        ),
      state: Schema.Struct({ orderId: Schema.Int }),
    }),
  },
  store,
});
const bot = defineBot({
  commands: {
    cancel: ({ message }) => respond(message, "Conversation cancelled.").pipe(
      Effect.andThen(order.exit(message)),
    ),
    order: ({ message }) => respond(message, {
      replyMarkup: {
        inlineKeyboard: [[
          confirmation.button("Yes", { answer: "yes" }),
          confirmation.button("No", { answer: "no" }),
        ]],
      },
      text: "Confirm order 42?",
    }).pipe(
      Effect.andThen(order.enter(message, "confirm", { orderId: 42 })),
    ),
  },
  conversations: [order],
});
const app = Application.make({ token });

try {
  await app.runPolling(bot);
} finally {
  await app.close();
  store.close();
}
