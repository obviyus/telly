import { Effect } from "effect";

import {
  answerCallback,
  Application,
  Bot,
  BotApiError,
  callbackData,
  callbackTarget,
  command,
  conversation,
  Conversation,
  defineBot,
  defineJobs,
  editEphemeralMessageText,
  editMessageText,
  entity,
  every,
  Filter,
  InboxStore,
  job,
  media,
  messageMedia,
  messageEntities,
  messageReply,
  messageSender,
  messageText,
  MemoryInbox,
  MemoryConversations,
  MemoryJobs,
  getMe,
  getMyName,
  on,
  pollInboxUpdates,
  PollingConflictError,
  retryUnknownOutcome,
  replyTo,
  routes,
  Schema,
  sendPhoto,
  SqliteInbox,
  text,
  type CallbackQuery,
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
Application.make({
  defaults: {
    disableNotification: true,
    linkPreviewOptions: { isDisabled: true },
    parseMode: "HTML",
    protectContent: true,
  },
  token,
});
Application.make({ inbox: MemoryInbox.make(), token }).runPolling(declarativeHandler);
getMe().pipe(retryUnknownOutcome);
pollInboxUpdates(declarativeHandler).pipe(
  Effect.provideService(InboxStore, MemoryInbox.make()),
  Effect.catchTag("PollingConflictError", (error) => {
    error satisfies PollingConflictError;
    return Effect.void;
  }),
);

const mediaHandler = routes(
  on(media("photo"), ({ media: photos }) => {
    photos satisfies ReadonlyArray<PhotoSize>;
    return firstHandlerEffect;
  }),
);
mediaHandler(update);

// @ts-expect-error Entity filters require at least one entity type.
entity();
entity("hashtag");

declare const callback: CallbackQuery;
answerCallback(callback);
const callbackMessageTarget = callbackTarget(callback);
if ("ephemeralMessageId" in callbackMessageTarget) {
  editEphemeralMessageText({ ...callbackMessageTarget, text: "edited" });
} else {
  editMessageText({ ...callbackMessageTarget, text: "edited" });
}

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
  name: "typed",
  steps: {
    confirm: Conversation.step({
      filter: choice,
      run: ({ data }, state) => {
        data.answer satisfies string;
        state.orderId satisfies number;
        return Effect.succeed(Conversation.next("note", { orderId: state.orderId }));
      },
      state: Schema.Struct({ orderId: Schema.Int }),
    }),
    note: Conversation.step({
      filter: text(),
      run: ({ text: note }, state) => {
        note satisfies string;
        state.orderId satisfies number;
        return Effect.succeed(Conversation.end());
      },
      state: Schema.Struct({ orderId: Schema.Int }),
    }),
  },
  store: MemoryConversations.make(),
});
declare const message: Message;
sendPhoto({ ...replyTo(message), photo: "telegram-file-id" });
messageEntities(message, "url", "text_link");
messageText(message) satisfies string | undefined;
messageMedia(message);
messageSender(message);
messageReply(message);
typedConversation.enter(message, "confirm", { orderId: 1 });
// @ts-expect-error Conversation entry state comes from the selected step schema.
typedConversation.enter(message, "confirm", { orderId: "wrong" });

conversation({
  name: "invalid-target",
  steps: {
    // @ts-expect-error A transition can target only a declared step.
    active: Conversation.step({
      filter: text(),
      run: () => Effect.succeed(Conversation.next("missing", {})),
      state: Schema.Struct({}),
    }),
  },
  store: MemoryConversations.make(),
});

conversation({
  name: "invalid-state",
  steps: {
    // @ts-expect-error A transition state must match the target step schema.
    first: Conversation.step({
      filter: text(),
      run: () => Effect.succeed(Conversation.next("second", { orderId: "wrong" })),
      state: Schema.Struct({}),
    }),
    second: Conversation.step({
      filter: text(),
      run: () => Effect.succeed(Conversation.end()),
      state: Schema.Struct({ orderId: Schema.Int }),
    }),
  },
  store: MemoryConversations.make(),
});
