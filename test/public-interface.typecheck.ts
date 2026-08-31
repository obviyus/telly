import { Effect } from "effect";

import {
  Application,
  Bot,
  BotApiError,
  command,
  defineBot,
  every,
  Filter,
  InboxStore,
  media,
  MemoryInbox,
  getMe,
  getMyName,
  on,
  pollInboxUpdates,
  retryUnknownOutcome,
  routes,
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
