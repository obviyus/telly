import * as Effect from "effect/Effect";

import { Bot, type BotApiError } from "./BotApi.js";
import { messageEntities, messageText, type MessageEntitySpan } from "./Message.js";
import { withConversations } from "./internal/ConversationRuntime.js";
import type {
  ConversationProtocol,
  ConversationProtocolError,
} from "./internal/ConversationProtocol.js";
import type { UpdateHandler } from "./Polling.js";
import type {
  Animation,
  Audio,
  CallbackQuery,
  Chat,
  ChatType,
  Document,
  Message,
  MessageEntityType,
  PhotoSize,
  Sticker,
  Update,
  User,
  Video,
  VideoNote,
  Voice,
} from "./types.generated.js";

const FilterTypeId = Symbol.for("telly/Filter");
const RouteTypeId = Symbol.for("telly/Route");
const BotIdentityRequired = Symbol("BotIdentityRequired");

type FilterResult<A> = A | undefined | typeof BotIdentityRequired;

interface FilterState<out A> {
  readonly match: (update: Update, me: User | undefined) => FilterResult<A>;
}

/** A pure update matcher that extracts the value given to its handler. */
export interface Filter<out A> {
  readonly [FilterTypeId]: FilterState<A>;
}

/** Data extracted from a new message command addressed to this bot. */
export interface CommandMatch {
  readonly argText: string;
  readonly args: ReadonlyArray<string>;
  readonly command: string;
  readonly message: Message;
  readonly update: Update;
}

/** Data extracted from an ordinary new text message. */
export interface TextMatch {
  readonly message: Message;
  readonly text: string;
  readonly update: Update;
}

/** Data extracted from a callback query update. */
export interface CallbackQueryMatch {
  readonly callbackQuery: CallbackQuery;
  readonly update: Update;
}

export interface RepliedMessageMatch {
  readonly message: Message;
  readonly repliedMessage: Message;
  readonly update: Update;
}

export interface RegexMatch {
  readonly match: RegExpExecArray;
  readonly message: Message;
  readonly text: string;
  readonly update: Update;
}

export interface MediaKindMap {
  readonly animation: Animation;
  readonly audio: Audio;
  readonly document: Document;
  readonly photo: ReadonlyArray<PhotoSize>;
  readonly sticker: Sticker;
  readonly video: Video;
  readonly videoNote: VideoNote;
  readonly voice: Voice;
}

export type MediaKind = keyof MediaKindMap;

export interface MediaMatch<Kind extends MediaKind> {
  readonly kind: Kind;
  readonly media: MediaKindMap[Kind];
  readonly message: Message;
  readonly update: Update;
}

export type MessageChatType = Exclude<ChatType, "channel">;

export interface ChatTypeMatch {
  readonly chat: Chat;
  readonly message: Message;
  readonly update: Update;
}

export interface EntityMatch {
  readonly entities: ReadonlyArray<MessageEntitySpan>;
  readonly message: Message;
  readonly text: string;
  readonly update: Update;
}

type DefinitionHandler<in Match> = (
  match: Match,
) => Effect.Effect<unknown, unknown, Bot>;

/** The canonical declarative shape for a bot's common update handlers. */
export interface BotDefinition {
  readonly callbackQuery?: DefinitionHandler<CallbackQueryMatch>;
  readonly commands?: Readonly<Record<string, DefinitionHandler<CommandMatch>>>;
  readonly conversations?: ReadonlyArray<ConversationProtocol<unknown>>;
  readonly text?: DefinitionHandler<TextMatch>;
}

interface RouteState<out E> {
  readonly run: (
    update: Update,
    me: User | undefined,
  ) => Effect.Effect<unknown, E, Bot> | undefined | typeof BotIdentityRequired;
}

/** A filter and its typed handler, created with `on`. */
export interface Route<out E> {
  readonly [RouteTypeId]: RouteState<E>;
}

type RouteError<T> = T extends Route<infer E> ? E : never;
type HandlerError<T> = T extends UpdateHandler<infer E> ? E : never;
type EffectError<T> = T extends (
  ...args: ReadonlyArray<never>
) => Effect.Effect<unknown, infer E, Bot> ? E : never;
type CommandDefinitionError<D> = D extends { readonly commands: infer Commands }
  ? Commands extends Readonly<Record<string, infer Handler>> ? EffectError<Handler> : never
  : never;
type DefinitionError<D> =
  | CommandDefinitionError<D>
  | (D extends { readonly callbackQuery: infer Handler } ? EffectError<Handler> : never)
  | (D extends { readonly conversations: ReadonlyArray<infer Conversation> }
    ? ConversationProtocolError<Conversation>
    : never)
  | (D extends { readonly text: infer Handler } ? EffectError<Handler> : never);

function makeFilter<A>(
  match: FilterState<A>["match"],
): Filter<A> {
  return {
    [FilterTypeId]: { match },
  };
}

/** Constructors for custom filters and typed filter composition. */
export const Filter = {
  make<A>(match: (update: Update) => A | undefined): Filter<A> {
    return makeFilter((update) => match(update));
  },

  and<A, B>(left: Filter<A>, right: Filter<B>): Filter<readonly [A, B]> {
    const leftState = left[FilterTypeId];
    const rightState = right[FilterTypeId];
    return makeFilter((update, me) => {
      const leftMatch = leftState.match(update, me);
      if (leftMatch === BotIdentityRequired) return BotIdentityRequired;
      if (leftMatch === undefined) return undefined;
      const rightMatch = rightState.match(update, me);
      if (rightMatch === BotIdentityRequired) return BotIdentityRequired;
      if (rightMatch === undefined) return undefined;
      const match: readonly [A, B] = [leftMatch, rightMatch];
      return match;
    });
  },

  or<A, B>(left: Filter<A>, right: Filter<B>): Filter<A | B> {
    const leftState = left[FilterTypeId];
    const rightState = right[FilterTypeId];
    return makeFilter((update, me) => {
      const leftMatch = leftState.match(update, me);
      if (leftMatch === BotIdentityRequired) return BotIdentityRequired;
      return leftMatch === undefined ? rightState.match(update, me) : leftMatch;
    });
  },

  not(filter: Filter<unknown>): Filter<Update> {
    const state = filter[FilterTypeId];
    return makeFilter((update, me) => {
      const match = state.match(update, me);
      if (match === BotIdentityRequired) return BotIdentityRequired;
      return match === undefined ? update : undefined;
    });
  },
};

/** Runs one filter against an update, resolving bot identity only when the filter needs it. */
export const matchFilter = Effect.fn("Filter.match")(function* <A>(
  filter: Filter<A>,
  update: Update,
): Effect.fn.Return<A | undefined, BotApiError, Bot> {
  const state = filter[FilterTypeId];
  const initial = state.match(update, undefined);
  if (initial !== BotIdentityRequired) return initial;
  const bot = yield* Bot;
  const identity = yield* bot.me;
  const matched = state.match(update, identity);
  return matched === BotIdentityRequired ? undefined : matched;
});

/** Matches a new text or media-caption command using Telegram's `bot_command` entity. */
export function command(name: string): Filter<CommandMatch> {
  if (!/^[A-Za-z0-9_]{1,32}$/u.test(name)) {
    throw new RangeError(`Invalid Telegram bot command: ${name}`);
  }
  const expectedName = name.toLowerCase();
  return makeFilter((update, me) => {
    const message = update.message;
    if (message === undefined) return undefined;
    const body = message.text ?? message.caption;
    const entity = message.text === undefined
      ? message.captionEntities?.[0]
      : message.entities?.[0];
    if (
      body === undefined ||
      entity?.type !== "bot_command" ||
      entity.offset !== 0
    ) {
      return undefined;
    }
    const token = body.slice(1, entity.length);
    const separator = token.indexOf("@");
    const commandName = separator === -1 ? token : token.slice(0, separator);
    if (commandName.toLowerCase() !== expectedName) return undefined;
    if (separator !== -1) {
      const target = token.slice(separator + 1);
      if (me === undefined) return BotIdentityRequired;
      if (me.username === undefined || target.toLowerCase() !== me.username.toLowerCase()) {
        return undefined;
      }
    }
    const argText = body.slice(entity.length).trimStart();
    return {
      argText,
      args: argText.match(/\S+/gu) ?? [],
      command: commandName.toLowerCase(),
      message,
      update,
    };
  });
}

/** Matches ordinary new message text and excludes text that starts with a command. */
export function text(): Filter<TextMatch> {
  return makeFilter((update) => {
    const message = update.message;
    if (message?.text === undefined) return undefined;
    const firstEntity = message.entities?.[0];
    if (firstEntity?.type === "bot_command" && firstEntity.offset === 0) return undefined;
    return { message, text: message.text, update };
  });
}

/** Matches a callback query update. */
export function callbackQuery(): Filter<CallbackQueryMatch> {
  return makeFilter((update) =>
    update.callbackQuery === undefined
      ? undefined
      : { callbackQuery: update.callbackQuery, update });
}

/** Matches a new message that directly replies to another message. */
export function repliedMessage(): Filter<RepliedMessageMatch> {
  return makeFilter((update) => {
    const message = update.message;
    if (message?.replyToMessage === undefined) return undefined;
    return { message, repliedMessage: message.replyToMessage, update };
  });
}

/** Matches a regular expression against new message text. */
export function regex(pattern: RegExp): Filter<RegexMatch> {
  if (pattern.global || pattern.sticky) {
    throw new RangeError("Telegram regex filters cannot use global or sticky state");
  }
  return makeFilter((update) => {
    const message = update.message;
    if (message?.text === undefined) return undefined;
    const match = pattern.exec(message.text);
    return match === null ? undefined : { match, message, text: message.text, update };
  });
}

function mediaField<Kind extends MediaKind>(
  message: Message,
  kind: Kind,
): MediaKindMap[Kind] | undefined;
function mediaField(
  message: Message,
  kind: MediaKind,
): MediaKindMap[MediaKind] | undefined {
  switch (kind) {
    case "animation":
      return message.animation;
    case "audio":
      return message.audio;
    case "document":
      return message.document;
    case "photo":
      return message.photo;
    case "sticker":
      return message.sticker;
    case "video":
      return message.video;
    case "videoNote":
      return message.videoNote;
    case "voice":
      return message.voice;
  }
}

/** Matches one media field on a new message. */
export function media<Kind extends MediaKind>(kind: Kind): Filter<MediaMatch<Kind>> {
  return makeFilter((update) => {
    const message = update.message;
    if (message === undefined) return undefined;
    const value = mediaField(message, kind);
    return value === undefined ? undefined : { kind, media: value, message, update };
  });
}

/** Matches a new message whose chat has one of the selected types. */
export function chatType(
  first: MessageChatType,
  ...rest: ReadonlyArray<MessageChatType>
): Filter<ChatTypeMatch> {
  const types: ReadonlyArray<ChatType> = [first, ...rest];
  return makeFilter((update) => {
    const message = update.message;
    if (message === undefined || !types.includes(message.chat.type)) {
      return undefined;
    }
    return { chat: message.chat, message, update };
  });
}

/** Matches selected entities in new message text or a media caption. */
export function entity(
  first: MessageEntityType,
  ...rest: ReadonlyArray<MessageEntityType>
): Filter<EntityMatch> {
  const types = [first, ...rest];
  return makeFilter((update) => {
    const message = update.message;
    if (message === undefined) return undefined;
    const entities = messageEntities(message, ...types);
    const text = messageText(message);
    return entities.length === 0 || text === undefined
      ? undefined
      : { entities, message, text, update };
  });
}

/** Matches user mentions in new message text or a media caption. */
export function mention(): Filter<EntityMatch> {
  return entity("mention", "text_mention");
}

/** Compiles a declarative bot definition into one reusable update handler. */
export function defineBot<const Definition extends BotDefinition>(
  definition: Definition,
): UpdateHandler<BotApiError | DefinitionError<Definition>>;
export function defineBot(definition: BotDefinition): UpdateHandler<unknown> {
  const routeList: Array<Route<unknown>> = [];
  for (const [name, handler] of Object.entries(definition.commands ?? {})) {
    routeList.push(on(command(name), handler));
  }
  if (definition.text !== undefined) routeList.push(on(text(), definition.text));
  if (definition.callbackQuery !== undefined) {
    routeList.push(on(callbackQuery(), definition.callbackQuery));
  }
  const routed = routes(...routeList);
  return definition.conversations === undefined
    ? routed
    : withConversations(definition.conversations, routed);
}

/** Binds one filter to the Effect that handles its extracted value. */
export function on<A, E>(
  filter: Filter<A>,
  handle: (match: A) => Effect.Effect<unknown, E, Bot>,
): Route<E> {
  const state = filter[FilterTypeId];
  return {
    [RouteTypeId]: {
      run(update, me) {
        const match = state.match(update, me);
        if (match === BotIdentityRequired) return BotIdentityRequired;
        return match === undefined ? undefined : handle(match);
      },
    },
  };
}

/** Creates one update handler that runs its first matching route. */
export function routes<const Routes extends ReadonlyArray<Route<unknown>>>(
  ...routeList: Routes
): UpdateHandler<BotApiError | RouteError<Routes[number]>>;
export function routes(...routeList: ReadonlyArray<Route<unknown>>): UpdateHandler<unknown> {
  const dispatch = (
    update: Update,
    me: User | undefined,
  ): Effect.Effect<unknown, unknown, Bot> => {
    for (const route of routeList) {
      const effect = route[RouteTypeId].run(update, me);
      if (effect === BotIdentityRequired) {
        return Effect.flatMap(Bot, (bot) =>
          Effect.flatMap(bot.me, (identity) => dispatch(update, identity))
        );
      }
      if (effect === undefined) continue;
      return effect;
    }
    return Effect.void;
  };
  return (update) => dispatch(update, undefined);
}

/** Creates one update handler that runs every handler sequentially and fails fast. */
export function every<const Handlers extends ReadonlyArray<UpdateHandler<unknown>>>(
  ...handlers: Handlers
): UpdateHandler<HandlerError<Handlers[number]>>;
export function every(...handlers: ReadonlyArray<UpdateHandler<unknown>>): UpdateHandler<unknown> {
  return Effect.fn("every.dispatch")(function* (update: Update) {
    for (const handler of handlers) yield* handler(update);
  });
}
