import { Effect } from "effect";

import {
  Application,
  Bot,
  BotApiError,
  callbackData,
  command,
  conversation,
  Conversation,
  defineBot,
  defineJobs,
  every,
  Filter,
  InboxStore,
  job,
  media,
  MemoryInbox,
  MemoryConversations,
  MemoryJobs,
  getMe,
  getMyName,
  on,
  pollInboxUpdates,
  retryUnknownOutcome,
  routes,
  Schema,
  SqliteInbox,
  text,
  type Message,
  type PhotoSize,
  type Update,
  type UpdateHandler,
} from "../index.ts";

// @ts-expect-error Bot API methods with no fields take no arguments.
getMe({});

// @ts-expect-error Bot API methods with fields take one options object.
getMyName();

class FirstHandlerError extends Error {}
class SecondHandlerError extends Error {}

declare const firstHandlerEffect: Effect.Effect<void, FirstHandlerError, Bot>;
declare const secondHandlerEffect: Effect.Effect<void, SecondHandlerError, Bot>;

const routed = routes(
  on(command("start"), ({ argText, message }) => {
    argText satisfies string;
    message.chat.id satisfies number;
    return firstHandlerEffect;
  }),
  on(Filter.make((update) => update.callbackQuery), (query) => {
    query.id satisfies string;
    return secondHandlerEffect;
  }),
);

const routedHandler: UpdateHandler<
  BotApiError | FirstHandlerError | SecondHandlerError
> = routed;
const combinedHandler: UpdateHandler<
  BotApiError | FirstHandlerError | SecondHandlerError
> = every(routed, () => firstHandlerEffect);
declare const update: Update;
routedHandler(update);
combinedHandler(update);

const declarativeHandler: UpdateHandler<
  BotApiError | FirstHandlerError | SecondHandlerError
> = defineBot({
  commands: {
    start: () => firstHandlerEffect,
  },
  text: () => secondHandlerEffect,
});
declarativeHandler(update);
declare const token: string;
Application.make({ token }).runPolling(declarativeHandler);
Application.make({ rateLimit: false, token });
Application.make({ inbox: MemoryInbox.make(), token }).runPolling(declarativeHandler);
getMe().pipe(retryUnknownOutcome);
pollInboxUpdates(declarativeHandler).pipe(
  Effect.provideService(InboxStore, MemoryInbox.make()),
);

const mediaHandler = routes(
  on(media("photo"), ({ media: photos }) => {
    photos satisfies ReadonlyArray<PhotoSize>;
    return firstHandlerEffect;
  }),
);
mediaHandler(update);

const webhook = Application.make({ token }).startWebhook(declarativeHandler, {
  secretToken: "typecheck_secret",
});
webhook.fetch(new Request("https://example.test/telegram"));
webhook.stop();

SqliteInbox.open("telly.db").then((inbox) => {
  Application.make({ inbox, token });
  inbox.close();
});

const jobs = defineJobs({
  reminder: job({
    payload: Schema.Struct({ chatId: Schema.Int, text: Schema.String }),
    run: () => firstHandlerEffect,
  }),
}, { store: MemoryJobs.make() });
jobs.schedule("reminder", { payload: { chatId: 1, text: "typed" } });
// @ts-expect-error Job payloads are inferred from their definition schema.
jobs.schedule("reminder", { payload: { chatId: "wrong", text: "typed" } });
// @ts-expect-error Only declared job names can be scheduled.
jobs.schedule("missing", { payload: { chatId: 1, text: "typed" } });
Application.make({ jobs, token });

const choice = callbackData("choice", Schema.Struct({ answer: Schema.String }));
choice.pack({ answer: "yes" });
// @ts-expect-error Callback payloads are inferred from their schema.
choice.pack({ answer: 1 });

const typedConversation = conversation({
  handlers: (step) => ({
    confirm: step.confirm(choice, ({ data }, state) => {
      data.answer satisfies string;
      state.orderId satisfies number;
      return Effect.succeed(Conversation.next("note", { orderId: state.orderId }));
    }),
    note: step.note(text(), ({ text: note }, state) => {
      note satisfies string;
      state.orderId satisfies number;
      return Effect.succeed(Conversation.end());
    }),
  }),
  name: "typed",
  states: {
    confirm: Schema.Struct({ orderId: Schema.Int }),
    note: Schema.Struct({ orderId: Schema.Int }),
  },
  store: MemoryConversations.make(),
});
declare const message: Message;
typedConversation.enter(message, "confirm", { orderId: 1 });
// @ts-expect-error Conversation entry state comes from the selected step schema.
typedConversation.enter(message, "confirm", { orderId: "wrong" });

conversation({
  handlers: (step) => ({
    // @ts-expect-error A transition can target only a declared step.
    active: step.active(text(), () => Effect.succeed(Conversation.next("missing", {}))),
  }),
  name: "invalid-target",
  states: { active: Schema.Struct({}) },
  store: MemoryConversations.make(),
});
