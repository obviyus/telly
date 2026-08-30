// Generated from bot-api/schema/sources/dofer/spec.json. Edit schema inputs or overrides, then regenerate.
import { Predicate, Schema, SchemaGetter, Struct } from "effect";

import { callMethod } from "./internal/CallMethod.js";
import { invertKeys } from "./internal/SchemaKeys.js";
import * as Types from "./types.generated.js";

/** Use this method to delete the list of the bot's commands for the given scope and user language. After deletion, higher level commands will be shown to affected users. Returns True on success. */
export interface DeleteMyCommandsParams {
  /** A JSON-serialized object, describing scope of users for which the commands are relevant. Defaults to BotCommandScopeDefault. */
  readonly scope?: Types.BotCommandScope | undefined;
  /** A two-letter ISO 639-1 language code. If empty, commands will be applied to all users from the given scope, for whose language there are no dedicated commands. */
  readonly languageCode?: string | undefined;
}
const _DeleteMyCommandsParamsPublicKeys = { language_code: "languageCode" } as const;
const _DeleteMyCommandsParamsWireKeys = invertKeys(_DeleteMyCommandsParamsPublicKeys);
const _DeleteMyCommandsParamsEncoded = Schema.Struct({
  scope: Schema.optional(Schema.suspend((): Schema.Codec<Types.BotCommandScope, unknown> => Types.BotCommandScope)),
  language_code: Schema.optional(Schema.String),
});
const _DeleteMyCommandsParamsDecoded = Schema.declare<DeleteMyCommandsParams>((input): input is DeleteMyCommandsParams => Predicate.isObject(input));
export const DeleteMyCommandsParams: Schema.Codec<DeleteMyCommandsParams, Readonly<Record<string, unknown>>> = _DeleteMyCommandsParamsEncoded.pipe(
  Schema.decodeTo(_DeleteMyCommandsParamsDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_DeleteMyCommandsParamsPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_DeleteMyCommandsParamsWireKeys)),
  }),
);

export const deleteMyCommands = callMethod({
  method: "deleteMyCommands",
  params: DeleteMyCommandsParams,
  result: Schema.Literal(true),
  retrySafe: true,
});

/** Returns the list of gifts that can be sent by the bot to users and channel chats. Requires no parameters. Returns a Gifts object. */
export const getAvailableGifts = callMethod({
  method: "getAvailableGifts",
  result: Schema.suspend((): Schema.Codec<Types.Gifts, unknown> => Types.Gifts),
  retrySafe: true,
});

/** Returns the gifts received and owned by a managed business account. Requires the can_view_gifts_and_stars business bot right. Returns OwnedGifts on success. */
export interface GetBusinessAccountGiftsParams {
  /** Unique identifier of the business connection */
  readonly businessConnectionId: string;
  /** Pass True to exclude gifts that aren't saved to the account's profile page */
  readonly excludeUnsaved?: boolean | undefined;
  /** Pass True to exclude gifts that are saved to the account's profile page */
  readonly excludeSaved?: boolean | undefined;
  /** Pass True to exclude gifts that can be purchased an unlimited number of times */
  readonly excludeUnlimited?: boolean | undefined;
  /** Pass True to exclude gifts that can be purchased a limited number of times and can be upgraded to unique */
  readonly excludeLimitedUpgradable?: boolean | undefined;
  /** Pass True to exclude gifts that can be purchased a limited number of times and can't be upgraded to unique */
  readonly excludeLimitedNonUpgradable?: boolean | undefined;
  /** Pass True to exclude unique gifts */
  readonly excludeUnique?: boolean | undefined;
  /** Pass True to exclude gifts that were assigned from the TON blockchain and can't be resold or transferred in Telegram */
  readonly excludeFromBlockchain?: boolean | undefined;
  /** Pass True to sort results by gift price instead of send date. Sorting is applied before pagination. */
  readonly sortByPrice?: boolean | undefined;
  /** Offset of the first entry to return as received from the previous request; use empty string to get the first chunk of results */
  readonly offset?: string | undefined;
  /** The maximum number of gifts to be returned; 1-100. Defaults to 100. */
  readonly limit?: number | undefined;
}
const _GetBusinessAccountGiftsParamsPublicKeys = { business_connection_id: "businessConnectionId", exclude_unsaved: "excludeUnsaved", exclude_saved: "excludeSaved", exclude_unlimited: "excludeUnlimited", exclude_limited_upgradable: "excludeLimitedUpgradable", exclude_limited_non_upgradable: "excludeLimitedNonUpgradable", exclude_unique: "excludeUnique", exclude_from_blockchain: "excludeFromBlockchain", sort_by_price: "sortByPrice" } as const;
const _GetBusinessAccountGiftsParamsWireKeys = invertKeys(_GetBusinessAccountGiftsParamsPublicKeys);
const _GetBusinessAccountGiftsParamsEncoded = Schema.Struct({
  business_connection_id: Schema.String,
  exclude_unsaved: Schema.optional(Schema.Boolean),
  exclude_saved: Schema.optional(Schema.Boolean),
  exclude_unlimited: Schema.optional(Schema.Boolean),
  exclude_limited_upgradable: Schema.optional(Schema.Boolean),
  exclude_limited_non_upgradable: Schema.optional(Schema.Boolean),
  exclude_unique: Schema.optional(Schema.Boolean),
  exclude_from_blockchain: Schema.optional(Schema.Boolean),
  sort_by_price: Schema.optional(Schema.Boolean),
  offset: Schema.optional(Schema.String),
  limit: Schema.optional(Schema.Int),
});
const _GetBusinessAccountGiftsParamsDecoded = Schema.declare<GetBusinessAccountGiftsParams>((input): input is GetBusinessAccountGiftsParams => Predicate.isObject(input));
export const GetBusinessAccountGiftsParams: Schema.Codec<GetBusinessAccountGiftsParams, Readonly<Record<string, unknown>>> = _GetBusinessAccountGiftsParamsEncoded.pipe(
  Schema.decodeTo(_GetBusinessAccountGiftsParamsDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_GetBusinessAccountGiftsParamsPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_GetBusinessAccountGiftsParamsWireKeys)),
  }),
);

export const getBusinessAccountGifts = callMethod({
  method: "getBusinessAccountGifts",
  params: GetBusinessAccountGiftsParams,
  result: Schema.suspend((): Schema.Codec<Types.OwnedGifts, unknown> => Types.OwnedGifts),
  retrySafe: true,
});

/** Returns the amount of Telegram Stars owned by a managed business account. Requires the can_view_gifts_and_stars business bot right. Returns StarAmount on success. */
export interface GetBusinessAccountStarBalanceParams {
  /** Unique identifier of the business connection */
  readonly businessConnectionId: string;
}
const _GetBusinessAccountStarBalanceParamsPublicKeys = { business_connection_id: "businessConnectionId" } as const;
const _GetBusinessAccountStarBalanceParamsWireKeys = invertKeys(_GetBusinessAccountStarBalanceParamsPublicKeys);
const _GetBusinessAccountStarBalanceParamsEncoded = Schema.Struct({
  business_connection_id: Schema.String,
});
const _GetBusinessAccountStarBalanceParamsDecoded = Schema.declare<GetBusinessAccountStarBalanceParams>((input): input is GetBusinessAccountStarBalanceParams => Predicate.isObject(input));
export const GetBusinessAccountStarBalanceParams: Schema.Codec<GetBusinessAccountStarBalanceParams, Readonly<Record<string, unknown>>> = _GetBusinessAccountStarBalanceParamsEncoded.pipe(
  Schema.decodeTo(_GetBusinessAccountStarBalanceParamsDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_GetBusinessAccountStarBalanceParamsPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_GetBusinessAccountStarBalanceParamsWireKeys)),
  }),
);

export const getBusinessAccountStarBalance = callMethod({
  method: "getBusinessAccountStarBalance",
  params: GetBusinessAccountStarBalanceParams,
  result: Schema.suspend((): Schema.Codec<Types.StarAmount, unknown> => Types.StarAmount),
  retrySafe: true,
});

/** Use this method to get information about the connection of the bot with a business account. Returns a BusinessConnection object on success. */
export interface GetBusinessConnectionParams {
  /** Unique identifier of the business connection */
  readonly businessConnectionId: string;
}
const _GetBusinessConnectionParamsPublicKeys = { business_connection_id: "businessConnectionId" } as const;
const _GetBusinessConnectionParamsWireKeys = invertKeys(_GetBusinessConnectionParamsPublicKeys);
const _GetBusinessConnectionParamsEncoded = Schema.Struct({
  business_connection_id: Schema.String,
});
const _GetBusinessConnectionParamsDecoded = Schema.declare<GetBusinessConnectionParams>((input): input is GetBusinessConnectionParams => Predicate.isObject(input));
export const GetBusinessConnectionParams: Schema.Codec<GetBusinessConnectionParams, Readonly<Record<string, unknown>>> = _GetBusinessConnectionParamsEncoded.pipe(
  Schema.decodeTo(_GetBusinessConnectionParamsDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_GetBusinessConnectionParamsPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_GetBusinessConnectionParamsWireKeys)),
  }),
);

export const getBusinessConnection = callMethod({
  method: "getBusinessConnection",
  params: GetBusinessConnectionParams,
  result: Schema.suspend((): Schema.Codec<Types.BusinessConnection, unknown> => Types.BusinessConnection),
  retrySafe: true,
});

/** Use this method to get up-to-date information about the chat. Returns a ChatFullInfo object on success. */
export interface GetChatParams {
  /** Unique identifier for the target chat or username of the target supergroup or channel in the format @username */
  readonly chatId: number | string;
}
const _GetChatParamsPublicKeys = { chat_id: "chatId" } as const;
const _GetChatParamsWireKeys = invertKeys(_GetChatParamsPublicKeys);
const _GetChatParamsEncoded = Schema.Struct({
  chat_id: Schema.Union([Schema.Int, Schema.String]),
});
const _GetChatParamsDecoded = Schema.declare<GetChatParams>((input): input is GetChatParams => Predicate.isObject(input));
export const GetChatParams: Schema.Codec<GetChatParams, Readonly<Record<string, unknown>>> = _GetChatParamsEncoded.pipe(
  Schema.decodeTo(_GetChatParamsDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_GetChatParamsPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_GetChatParamsWireKeys)),
  }),
);

export const getChat = callMethod({
  method: "getChat",
  params: GetChatParams,
  result: Schema.suspend((): Schema.Codec<Types.ChatFullInfo, unknown> => Types.ChatFullInfo),
  retrySafe: true,
});

/** Use this method to get a list of administrators in a chat. Returns an Array of ChatMember objects. */
export interface GetChatAdministratorsParams {
  /** Unique identifier for the target chat or username of the target supergroup or channel in the format @username */
  readonly chatId: number | string;
  /** Pass True to additionally receive all bots that are administrators of the chat. By default, bots other than the current bot are omitted. */
  readonly returnBots?: boolean | undefined;
}
const _GetChatAdministratorsParamsPublicKeys = { chat_id: "chatId", return_bots: "returnBots" } as const;
const _GetChatAdministratorsParamsWireKeys = invertKeys(_GetChatAdministratorsParamsPublicKeys);
const _GetChatAdministratorsParamsEncoded = Schema.Struct({
  chat_id: Schema.Union([Schema.Int, Schema.String]),
  return_bots: Schema.optional(Schema.Boolean),
});
const _GetChatAdministratorsParamsDecoded = Schema.declare<GetChatAdministratorsParams>((input): input is GetChatAdministratorsParams => Predicate.isObject(input));
export const GetChatAdministratorsParams: Schema.Codec<GetChatAdministratorsParams, Readonly<Record<string, unknown>>> = _GetChatAdministratorsParamsEncoded.pipe(
  Schema.decodeTo(_GetChatAdministratorsParamsDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_GetChatAdministratorsParamsPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_GetChatAdministratorsParamsWireKeys)),
  }),
);

export const getChatAdministrators = callMethod({
  method: "getChatAdministrators",
  params: GetChatAdministratorsParams,
  result: Schema.Array(Schema.suspend((): Schema.Codec<Types.ChatMember, unknown> => Types.ChatMember)),
  retrySafe: true,
});

/** Returns the gifts owned by a chat. Returns OwnedGifts on success. */
export interface GetChatGiftsParams {
  /** Unique identifier for the target chat or username of the target channel in the format @username */
  readonly chatId: number | string;
  /** Pass True to exclude gifts that aren't saved to the chat's profile page. Always True, unless the bot has the can_post_messages administrator right in the channel. */
  readonly excludeUnsaved?: boolean | undefined;
  /** Pass True to exclude gifts that are saved to the chat's profile page. Always False, unless the bot has the can_post_messages administrator right in the channel. */
  readonly excludeSaved?: boolean | undefined;
  /** Pass True to exclude gifts that can be purchased an unlimited number of times */
  readonly excludeUnlimited?: boolean | undefined;
  /** Pass True to exclude gifts that can be purchased a limited number of times and can be upgraded to unique */
  readonly excludeLimitedUpgradable?: boolean | undefined;
  /** Pass True to exclude gifts that can be purchased a limited number of times and can't be upgraded to unique */
  readonly excludeLimitedNonUpgradable?: boolean | undefined;
  /** Pass True to exclude gifts that were assigned from the TON blockchain and can't be resold or transferred in Telegram */
  readonly excludeFromBlockchain?: boolean | undefined;
  /** Pass True to exclude unique gifts */
  readonly excludeUnique?: boolean | undefined;
  /** Pass True to sort results by gift price instead of send date. Sorting is applied before pagination. */
  readonly sortByPrice?: boolean | undefined;
  /** Offset of the first entry to return as received from the previous request; use an empty string to get the first chunk of results */
  readonly offset?: string | undefined;
  /** The maximum number of gifts to be returned; 1-100. Defaults to 100. */
  readonly limit?: number | undefined;
}
const _GetChatGiftsParamsPublicKeys = { chat_id: "chatId", exclude_unsaved: "excludeUnsaved", exclude_saved: "excludeSaved", exclude_unlimited: "excludeUnlimited", exclude_limited_upgradable: "excludeLimitedUpgradable", exclude_limited_non_upgradable: "excludeLimitedNonUpgradable", exclude_from_blockchain: "excludeFromBlockchain", exclude_unique: "excludeUnique", sort_by_price: "sortByPrice" } as const;
const _GetChatGiftsParamsWireKeys = invertKeys(_GetChatGiftsParamsPublicKeys);
const _GetChatGiftsParamsEncoded = Schema.Struct({
  chat_id: Schema.Union([Schema.Int, Schema.String]),
  exclude_unsaved: Schema.optional(Schema.Boolean),
  exclude_saved: Schema.optional(Schema.Boolean),
  exclude_unlimited: Schema.optional(Schema.Boolean),
  exclude_limited_upgradable: Schema.optional(Schema.Boolean),
  exclude_limited_non_upgradable: Schema.optional(Schema.Boolean),
  exclude_from_blockchain: Schema.optional(Schema.Boolean),
  exclude_unique: Schema.optional(Schema.Boolean),
  sort_by_price: Schema.optional(Schema.Boolean),
  offset: Schema.optional(Schema.String),
  limit: Schema.optional(Schema.Int),
});
const _GetChatGiftsParamsDecoded = Schema.declare<GetChatGiftsParams>((input): input is GetChatGiftsParams => Predicate.isObject(input));
export const GetChatGiftsParams: Schema.Codec<GetChatGiftsParams, Readonly<Record<string, unknown>>> = _GetChatGiftsParamsEncoded.pipe(
  Schema.decodeTo(_GetChatGiftsParamsDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_GetChatGiftsParamsPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_GetChatGiftsParamsWireKeys)),
  }),
);

export const getChatGifts = callMethod({
  method: "getChatGifts",
  params: GetChatGiftsParams,
  result: Schema.suspend((): Schema.Codec<Types.OwnedGifts, unknown> => Types.OwnedGifts),
  retrySafe: true,
});

/** Use this method to get information about a member of a chat. The method is only guaranteed to work for other users if the bot is an administrator in the chat. Returns a ChatMember object on success. */
export interface GetChatMemberParams {
  /** Unique identifier for the target chat or username of the target supergroup or channel in the format @username */
  readonly chatId: number | string;
  /** Unique identifier of the target user */
  readonly userId: number;
}
const _GetChatMemberParamsPublicKeys = { chat_id: "chatId", user_id: "userId" } as const;
const _GetChatMemberParamsWireKeys = invertKeys(_GetChatMemberParamsPublicKeys);
const _GetChatMemberParamsEncoded = Schema.Struct({
  chat_id: Schema.Union([Schema.Int, Schema.String]),
  user_id: Schema.Int,
});
const _GetChatMemberParamsDecoded = Schema.declare<GetChatMemberParams>((input): input is GetChatMemberParams => Predicate.isObject(input));
export const GetChatMemberParams: Schema.Codec<GetChatMemberParams, Readonly<Record<string, unknown>>> = _GetChatMemberParamsEncoded.pipe(
  Schema.decodeTo(_GetChatMemberParamsDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_GetChatMemberParamsPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_GetChatMemberParamsWireKeys)),
  }),
);

export const getChatMember = callMethod({
  method: "getChatMember",
  params: GetChatMemberParams,
  result: Schema.suspend((): Schema.Codec<Types.ChatMember, unknown> => Types.ChatMember),
  retrySafe: true,
});

/** Use this method to get the number of members in a chat. Returns Integer on success. */
export interface GetChatMemberCountParams {
  /** Unique identifier for the target chat or username of the target supergroup or channel in the format @username */
  readonly chatId: number | string;
}
const _GetChatMemberCountParamsPublicKeys = { chat_id: "chatId" } as const;
const _GetChatMemberCountParamsWireKeys = invertKeys(_GetChatMemberCountParamsPublicKeys);
const _GetChatMemberCountParamsEncoded = Schema.Struct({
  chat_id: Schema.Union([Schema.Int, Schema.String]),
});
const _GetChatMemberCountParamsDecoded = Schema.declare<GetChatMemberCountParams>((input): input is GetChatMemberCountParams => Predicate.isObject(input));
export const GetChatMemberCountParams: Schema.Codec<GetChatMemberCountParams, Readonly<Record<string, unknown>>> = _GetChatMemberCountParamsEncoded.pipe(
  Schema.decodeTo(_GetChatMemberCountParamsDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_GetChatMemberCountParamsPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_GetChatMemberCountParamsWireKeys)),
  }),
);

export const getChatMemberCount = callMethod({
  method: "getChatMemberCount",
  params: GetChatMemberCountParams,
  result: Schema.Int,
  retrySafe: true,
});

/** Use this method to get the current value of the bot's menu button in a private chat, or the default menu button. Returns MenuButton on success. */
export interface GetChatMenuButtonParams {
  /** Unique identifier for the target private chat. If not specified, the bot's default menu button will be returned. */
  readonly chatId?: number | undefined;
}
const _GetChatMenuButtonParamsPublicKeys = { chat_id: "chatId" } as const;
const _GetChatMenuButtonParamsWireKeys = invertKeys(_GetChatMenuButtonParamsPublicKeys);
const _GetChatMenuButtonParamsEncoded = Schema.Struct({
  chat_id: Schema.optional(Schema.Int),
});
const _GetChatMenuButtonParamsDecoded = Schema.declare<GetChatMenuButtonParams>((input): input is GetChatMenuButtonParams => Predicate.isObject(input));
export const GetChatMenuButtonParams: Schema.Codec<GetChatMenuButtonParams, Readonly<Record<string, unknown>>> = _GetChatMenuButtonParamsEncoded.pipe(
  Schema.decodeTo(_GetChatMenuButtonParamsDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_GetChatMenuButtonParamsPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_GetChatMenuButtonParamsWireKeys)),
  }),
);

export const getChatMenuButton = callMethod({
  method: "getChatMenuButton",
  params: GetChatMenuButtonParams,
  result: Schema.suspend((): Schema.Codec<Types.MenuButton, unknown> => Types.MenuButton),
  retrySafe: true,
});

/** Use this method to get information about custom emoji stickers by their identifiers. Returns an Array of Sticker objects. */
export interface GetCustomEmojiStickersParams {
  /** A JSON-serialized list of custom emoji identifiers. At most 200 custom emoji identifiers can be specified. */
  readonly customEmojiIds: ReadonlyArray<string>;
}
const _GetCustomEmojiStickersParamsPublicKeys = { custom_emoji_ids: "customEmojiIds" } as const;
const _GetCustomEmojiStickersParamsWireKeys = invertKeys(_GetCustomEmojiStickersParamsPublicKeys);
const _GetCustomEmojiStickersParamsEncoded = Schema.Struct({
  custom_emoji_ids: Schema.Array(Schema.String),
});
const _GetCustomEmojiStickersParamsDecoded = Schema.declare<GetCustomEmojiStickersParams>((input): input is GetCustomEmojiStickersParams => Predicate.isObject(input));
export const GetCustomEmojiStickersParams: Schema.Codec<GetCustomEmojiStickersParams, Readonly<Record<string, unknown>>> = _GetCustomEmojiStickersParamsEncoded.pipe(
  Schema.decodeTo(_GetCustomEmojiStickersParamsDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_GetCustomEmojiStickersParamsPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_GetCustomEmojiStickersParamsWireKeys)),
  }),
);

export const getCustomEmojiStickers = callMethod({
  method: "getCustomEmojiStickers",
  params: GetCustomEmojiStickersParams,
  result: Schema.Array(Schema.suspend((): Schema.Codec<Types.Sticker, unknown> => Types.Sticker)),
  retrySafe: true,
});

/** Use this method to get basic information about a file and prepare it for downloading. For the moment, bots can download files of up to 20MB in size. On success, a File object is returned. The file can then be downloaded via the link https://api.telegram.org/file/bot<token>/<file_path>, where <file_path> is taken from the response. It is guaranteed that the link will be valid for at least 1 hour. When the link expires, a new one can be requested by calling getFile again. */
export interface GetFileParams {
  /** File identifier to get information about */
  readonly fileId: string;
}
const _GetFileParamsPublicKeys = { file_id: "fileId" } as const;
const _GetFileParamsWireKeys = invertKeys(_GetFileParamsPublicKeys);
const _GetFileParamsEncoded = Schema.Struct({
  file_id: Schema.String,
});
const _GetFileParamsDecoded = Schema.declare<GetFileParams>((input): input is GetFileParams => Predicate.isObject(input));
export const GetFileParams: Schema.Codec<GetFileParams, Readonly<Record<string, unknown>>> = _GetFileParamsEncoded.pipe(
  Schema.decodeTo(_GetFileParamsDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_GetFileParamsPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_GetFileParamsWireKeys)),
  }),
);

export const getFile = callMethod({
  method: "getFile",
  params: GetFileParams,
  result: Schema.suspend((): Schema.Codec<Types.File, unknown> => Types.File),
  retrySafe: true,
});

/** Use this method to get custom emoji stickers, which can be used as a forum topic icon by any user. Requires no parameters. Returns an Array of Sticker objects. */
export const getForumTopicIconStickers = callMethod({
  method: "getForumTopicIconStickers",
  result: Schema.Array(Schema.suspend((): Schema.Codec<Types.Sticker, unknown> => Types.Sticker)),
  retrySafe: true,
});

/** Use this method to get data for high score tables. Will return the score of the specified user and several of their neighbors in a game. Returns an Array of GameHighScore objects. */
export interface GetGameHighScoresParams {
  /** Target user id */
  readonly userId: number;
  /** Required if inline_message_id is not specified. Unique identifier for the target chat. */
  readonly chatId?: number | undefined;
  /** Required if inline_message_id is not specified. Identifier of the sent message. */
  readonly messageId?: number | undefined;
  /** Required if chat_id and message_id are not specified. Identifier of the inline message. */
  readonly inlineMessageId?: string | undefined;
}
const _GetGameHighScoresParamsPublicKeys = { user_id: "userId", chat_id: "chatId", message_id: "messageId", inline_message_id: "inlineMessageId" } as const;
const _GetGameHighScoresParamsWireKeys = invertKeys(_GetGameHighScoresParamsPublicKeys);
const _GetGameHighScoresParamsEncoded = Schema.Struct({
  user_id: Schema.Int,
  chat_id: Schema.optional(Schema.Int),
  message_id: Schema.optional(Schema.Int),
  inline_message_id: Schema.optional(Schema.String),
});
const _GetGameHighScoresParamsDecoded = Schema.declare<GetGameHighScoresParams>((input): input is GetGameHighScoresParams => Predicate.isObject(input));
export const GetGameHighScoresParams: Schema.Codec<GetGameHighScoresParams, Readonly<Record<string, unknown>>> = _GetGameHighScoresParamsEncoded.pipe(
  Schema.decodeTo(_GetGameHighScoresParamsDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_GetGameHighScoresParamsPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_GetGameHighScoresParamsWireKeys)),
  }),
);

export const getGameHighScores = callMethod({
  method: "getGameHighScores",
  params: GetGameHighScoresParams,
  result: Schema.Array(Schema.suspend((): Schema.Codec<Types.GameHighScore, unknown> => Types.GameHighScore)),
  retrySafe: true,
});

/** Use this method to get the access settings of a managed bot. Returns a BotAccessSettings object on success. */
export interface GetManagedBotAccessSettingsParams {
  /** User identifier of the managed bot whose access settings will be returned */
  readonly userId: number;
}
const _GetManagedBotAccessSettingsParamsPublicKeys = { user_id: "userId" } as const;
const _GetManagedBotAccessSettingsParamsWireKeys = invertKeys(_GetManagedBotAccessSettingsParamsPublicKeys);
const _GetManagedBotAccessSettingsParamsEncoded = Schema.Struct({
  user_id: Schema.Int,
});
const _GetManagedBotAccessSettingsParamsDecoded = Schema.declare<GetManagedBotAccessSettingsParams>((input): input is GetManagedBotAccessSettingsParams => Predicate.isObject(input));
export const GetManagedBotAccessSettingsParams: Schema.Codec<GetManagedBotAccessSettingsParams, Readonly<Record<string, unknown>>> = _GetManagedBotAccessSettingsParamsEncoded.pipe(
  Schema.decodeTo(_GetManagedBotAccessSettingsParamsDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_GetManagedBotAccessSettingsParamsPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_GetManagedBotAccessSettingsParamsWireKeys)),
  }),
);

export const getManagedBotAccessSettings = callMethod({
  method: "getManagedBotAccessSettings",
  params: GetManagedBotAccessSettingsParams,
  result: Schema.suspend((): Schema.Codec<Types.BotAccessSettings, unknown> => Types.BotAccessSettings),
  retrySafe: true,
});

/** Use this method to get the token of a managed bot. Returns the token as String on success. */
export interface GetManagedBotTokenParams {
  /** User identifier of the managed bot whose token will be returned */
  readonly userId: number;
}
const _GetManagedBotTokenParamsPublicKeys = { user_id: "userId" } as const;
const _GetManagedBotTokenParamsWireKeys = invertKeys(_GetManagedBotTokenParamsPublicKeys);
const _GetManagedBotTokenParamsEncoded = Schema.Struct({
  user_id: Schema.Int,
});
const _GetManagedBotTokenParamsDecoded = Schema.declare<GetManagedBotTokenParams>((input): input is GetManagedBotTokenParams => Predicate.isObject(input));
export const GetManagedBotTokenParams: Schema.Codec<GetManagedBotTokenParams, Readonly<Record<string, unknown>>> = _GetManagedBotTokenParamsEncoded.pipe(
  Schema.decodeTo(_GetManagedBotTokenParamsDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_GetManagedBotTokenParamsPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_GetManagedBotTokenParamsWireKeys)),
  }),
);

export const getManagedBotToken = callMethod({
  method: "getManagedBotToken",
  params: GetManagedBotTokenParams,
  result: Schema.RedactedFromValue(Schema.String, { label: "Telegram bot token" }),
  retrySafe: true,
});

/** A simple method for testing your bot's authentication token. Requires no parameters. Returns basic information about the bot in form of a User object. */
export const getMe = callMethod({
  method: "getMe",
  result: Schema.suspend((): Schema.Codec<Types.User, unknown> => Types.User),
  retrySafe: true,
});

/** Use this method to get the current list of the bot's commands for the given scope and user language. Returns an Array of BotCommand objects. If commands aren't set, an empty list is returned. */
export interface GetMyCommandsParams {
  /** A JSON-serialized object, describing scope of users. Defaults to BotCommandScopeDefault. */
  readonly scope?: Types.BotCommandScope | undefined;
  /** A two-letter ISO 639-1 language code or an empty string */
  readonly languageCode?: string | undefined;
}
const _GetMyCommandsParamsPublicKeys = { language_code: "languageCode" } as const;
const _GetMyCommandsParamsWireKeys = invertKeys(_GetMyCommandsParamsPublicKeys);
const _GetMyCommandsParamsEncoded = Schema.Struct({
  scope: Schema.optional(Schema.suspend((): Schema.Codec<Types.BotCommandScope, unknown> => Types.BotCommandScope)),
  language_code: Schema.optional(Schema.String),
});
const _GetMyCommandsParamsDecoded = Schema.declare<GetMyCommandsParams>((input): input is GetMyCommandsParams => Predicate.isObject(input));
export const GetMyCommandsParams: Schema.Codec<GetMyCommandsParams, Readonly<Record<string, unknown>>> = _GetMyCommandsParamsEncoded.pipe(
  Schema.decodeTo(_GetMyCommandsParamsDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_GetMyCommandsParamsPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_GetMyCommandsParamsWireKeys)),
  }),
);

export const getMyCommands = callMethod({
  method: "getMyCommands",
  params: GetMyCommandsParams,
  result: Schema.Array(Schema.suspend((): Schema.Codec<Types.BotCommand, unknown> => Types.BotCommand)),
  retrySafe: true,
});

/** Use this method to get the current default administrator rights of the bot. Returns ChatAdministratorRights on success. */
export interface GetMyDefaultAdministratorRightsParams {
  /** Pass True to get default administrator rights of the bot in channels. Otherwise, default administrator rights of the bot for groups and supergroups will be returned. */
  readonly forChannels?: boolean | undefined;
}
const _GetMyDefaultAdministratorRightsParamsPublicKeys = { for_channels: "forChannels" } as const;
const _GetMyDefaultAdministratorRightsParamsWireKeys = invertKeys(_GetMyDefaultAdministratorRightsParamsPublicKeys);
const _GetMyDefaultAdministratorRightsParamsEncoded = Schema.Struct({
  for_channels: Schema.optional(Schema.Boolean),
});
const _GetMyDefaultAdministratorRightsParamsDecoded = Schema.declare<GetMyDefaultAdministratorRightsParams>((input): input is GetMyDefaultAdministratorRightsParams => Predicate.isObject(input));
export const GetMyDefaultAdministratorRightsParams: Schema.Codec<GetMyDefaultAdministratorRightsParams, Readonly<Record<string, unknown>>> = _GetMyDefaultAdministratorRightsParamsEncoded.pipe(
  Schema.decodeTo(_GetMyDefaultAdministratorRightsParamsDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_GetMyDefaultAdministratorRightsParamsPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_GetMyDefaultAdministratorRightsParamsWireKeys)),
  }),
);

export const getMyDefaultAdministratorRights = callMethod({
  method: "getMyDefaultAdministratorRights",
  params: GetMyDefaultAdministratorRightsParams,
  result: Schema.suspend((): Schema.Codec<Types.ChatAdministratorRights, unknown> => Types.ChatAdministratorRights),
  retrySafe: true,
});

/** Use this method to get the current bot description for the given user language. Returns BotDescription on success. */
export interface GetMyDescriptionParams {
  /** A two-letter ISO 639-1 language code or an empty string */
  readonly languageCode?: string | undefined;
}
const _GetMyDescriptionParamsPublicKeys = { language_code: "languageCode" } as const;
const _GetMyDescriptionParamsWireKeys = invertKeys(_GetMyDescriptionParamsPublicKeys);
const _GetMyDescriptionParamsEncoded = Schema.Struct({
  language_code: Schema.optional(Schema.String),
});
const _GetMyDescriptionParamsDecoded = Schema.declare<GetMyDescriptionParams>((input): input is GetMyDescriptionParams => Predicate.isObject(input));
export const GetMyDescriptionParams: Schema.Codec<GetMyDescriptionParams, Readonly<Record<string, unknown>>> = _GetMyDescriptionParamsEncoded.pipe(
  Schema.decodeTo(_GetMyDescriptionParamsDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_GetMyDescriptionParamsPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_GetMyDescriptionParamsWireKeys)),
  }),
);

export const getMyDescription = callMethod({
  method: "getMyDescription",
  params: GetMyDescriptionParams,
  result: Schema.suspend((): Schema.Codec<Types.BotDescription, unknown> => Types.BotDescription),
  retrySafe: true,
});

/** Use this method to get the current bot name for the given user language. Returns BotName on success. */
export interface GetMyNameParams {
  /** A two-letter ISO 639-1 language code or an empty string */
  readonly languageCode?: string | undefined;
}
const _GetMyNameParamsPublicKeys = { language_code: "languageCode" } as const;
const _GetMyNameParamsWireKeys = invertKeys(_GetMyNameParamsPublicKeys);
const _GetMyNameParamsEncoded = Schema.Struct({
  language_code: Schema.optional(Schema.String),
});
const _GetMyNameParamsDecoded = Schema.declare<GetMyNameParams>((input): input is GetMyNameParams => Predicate.isObject(input));
export const GetMyNameParams: Schema.Codec<GetMyNameParams, Readonly<Record<string, unknown>>> = _GetMyNameParamsEncoded.pipe(
  Schema.decodeTo(_GetMyNameParamsDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_GetMyNameParamsPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_GetMyNameParamsWireKeys)),
  }),
);

export const getMyName = callMethod({
  method: "getMyName",
  params: GetMyNameParams,
  result: Schema.suspend((): Schema.Codec<Types.BotName, unknown> => Types.BotName),
  retrySafe: true,
});

/** Use this method to get the current bot short description for the given user language. Returns BotShortDescription on success. */
export interface GetMyShortDescriptionParams {
  /** A two-letter ISO 639-1 language code or an empty string */
  readonly languageCode?: string | undefined;
}
const _GetMyShortDescriptionParamsPublicKeys = { language_code: "languageCode" } as const;
const _GetMyShortDescriptionParamsWireKeys = invertKeys(_GetMyShortDescriptionParamsPublicKeys);
const _GetMyShortDescriptionParamsEncoded = Schema.Struct({
  language_code: Schema.optional(Schema.String),
});
const _GetMyShortDescriptionParamsDecoded = Schema.declare<GetMyShortDescriptionParams>((input): input is GetMyShortDescriptionParams => Predicate.isObject(input));
export const GetMyShortDescriptionParams: Schema.Codec<GetMyShortDescriptionParams, Readonly<Record<string, unknown>>> = _GetMyShortDescriptionParamsEncoded.pipe(
  Schema.decodeTo(_GetMyShortDescriptionParamsDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_GetMyShortDescriptionParamsPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_GetMyShortDescriptionParamsWireKeys)),
  }),
);

export const getMyShortDescription = callMethod({
  method: "getMyShortDescription",
  params: GetMyShortDescriptionParams,
  result: Schema.suspend((): Schema.Codec<Types.BotShortDescription, unknown> => Types.BotShortDescription),
  retrySafe: true,
});

/** A method to get the current Telegram Stars balance of the bot. Requires no parameters. On success, returns a StarAmount object. */
export const getMyStarBalance = callMethod({
  method: "getMyStarBalance",
  result: Schema.suspend((): Schema.Codec<Types.StarAmount, unknown> => Types.StarAmount),
  retrySafe: true,
});

/** Returns the bot's Telegram Star transactions in chronological order. On success, returns a StarTransactions object. */
export interface GetStarTransactionsParams {
  /** Number of transactions to skip in the response */
  readonly offset?: number | undefined;
  /** The maximum number of transactions to be retrieved. Values between 1-100 are accepted. Defaults to 100. */
  readonly limit?: number | undefined;
}
export const GetStarTransactionsParams: Schema.Codec<GetStarTransactionsParams> = Schema.Struct({
  offset: Schema.optional(Schema.Int),
  limit: Schema.optional(Schema.Int),
});

export const getStarTransactions = callMethod({
  method: "getStarTransactions",
  params: GetStarTransactionsParams,
  result: Schema.suspend((): Schema.Codec<Types.StarTransactions, unknown> => Types.StarTransactions),
  retrySafe: true,
});

/** Use this method to get a sticker set. On success, a StickerSet object is returned. */
export interface GetStickerSetParams {
  /** Name of the sticker set */
  readonly name: string;
}
export const GetStickerSetParams: Schema.Codec<GetStickerSetParams> = Schema.Struct({
  name: Schema.String,
});

export const getStickerSet = callMethod({
  method: "getStickerSet",
  params: GetStickerSetParams,
  result: Schema.suspend((): Schema.Codec<Types.StickerSet, unknown> => Types.StickerSet),
  retrySafe: true,
});

/** Use this method to get the list of boosts added to a chat by a user. Requires administrator rights in the chat. Returns a UserChatBoosts object. */
export interface GetUserChatBoostsParams {
  /** Unique identifier for the chat or username of the channel in the format @username */
  readonly chatId: number | string;
  /** Unique identifier of the target user */
  readonly userId: number;
}
const _GetUserChatBoostsParamsPublicKeys = { chat_id: "chatId", user_id: "userId" } as const;
const _GetUserChatBoostsParamsWireKeys = invertKeys(_GetUserChatBoostsParamsPublicKeys);
const _GetUserChatBoostsParamsEncoded = Schema.Struct({
  chat_id: Schema.Union([Schema.Int, Schema.String]),
  user_id: Schema.Int,
});
const _GetUserChatBoostsParamsDecoded = Schema.declare<GetUserChatBoostsParams>((input): input is GetUserChatBoostsParams => Predicate.isObject(input));
export const GetUserChatBoostsParams: Schema.Codec<GetUserChatBoostsParams, Readonly<Record<string, unknown>>> = _GetUserChatBoostsParamsEncoded.pipe(
  Schema.decodeTo(_GetUserChatBoostsParamsDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_GetUserChatBoostsParamsPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_GetUserChatBoostsParamsWireKeys)),
  }),
);

export const getUserChatBoosts = callMethod({
  method: "getUserChatBoosts",
  params: GetUserChatBoostsParams,
  result: Schema.suspend((): Schema.Codec<Types.UserChatBoosts, unknown> => Types.UserChatBoosts),
  retrySafe: true,
});

/** Returns the gifts owned and hosted by a user. Returns OwnedGifts on success. */
export interface GetUserGiftsParams {
  /** Unique identifier of the user */
  readonly userId: number;
  /** Pass True to exclude gifts that can be purchased an unlimited number of times */
  readonly excludeUnlimited?: boolean | undefined;
  /** Pass True to exclude gifts that can be purchased a limited number of times and can be upgraded to unique */
  readonly excludeLimitedUpgradable?: boolean | undefined;
  /** Pass True to exclude gifts that can be purchased a limited number of times and can't be upgraded to unique */
  readonly excludeLimitedNonUpgradable?: boolean | undefined;
  /** Pass True to exclude gifts that were assigned from the TON blockchain and can't be resold or transferred in Telegram */
  readonly excludeFromBlockchain?: boolean | undefined;
  /** Pass True to exclude unique gifts */
  readonly excludeUnique?: boolean | undefined;
  /** Pass True to sort results by gift price instead of send date. Sorting is applied before pagination. */
  readonly sortByPrice?: boolean | undefined;
  /** Offset of the first entry to return as received from the previous request; use an empty string to get the first chunk of results */
  readonly offset?: string | undefined;
  /** The maximum number of gifts to be returned; 1-100. Defaults to 100. */
  readonly limit?: number | undefined;
}
const _GetUserGiftsParamsPublicKeys = { user_id: "userId", exclude_unlimited: "excludeUnlimited", exclude_limited_upgradable: "excludeLimitedUpgradable", exclude_limited_non_upgradable: "excludeLimitedNonUpgradable", exclude_from_blockchain: "excludeFromBlockchain", exclude_unique: "excludeUnique", sort_by_price: "sortByPrice" } as const;
const _GetUserGiftsParamsWireKeys = invertKeys(_GetUserGiftsParamsPublicKeys);
const _GetUserGiftsParamsEncoded = Schema.Struct({
  user_id: Schema.Int,
  exclude_unlimited: Schema.optional(Schema.Boolean),
  exclude_limited_upgradable: Schema.optional(Schema.Boolean),
  exclude_limited_non_upgradable: Schema.optional(Schema.Boolean),
  exclude_from_blockchain: Schema.optional(Schema.Boolean),
  exclude_unique: Schema.optional(Schema.Boolean),
  sort_by_price: Schema.optional(Schema.Boolean),
  offset: Schema.optional(Schema.String),
  limit: Schema.optional(Schema.Int),
});
const _GetUserGiftsParamsDecoded = Schema.declare<GetUserGiftsParams>((input): input is GetUserGiftsParams => Predicate.isObject(input));
export const GetUserGiftsParams: Schema.Codec<GetUserGiftsParams, Readonly<Record<string, unknown>>> = _GetUserGiftsParamsEncoded.pipe(
  Schema.decodeTo(_GetUserGiftsParamsDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_GetUserGiftsParamsPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_GetUserGiftsParamsWireKeys)),
  }),
);

export const getUserGifts = callMethod({
  method: "getUserGifts",
  params: GetUserGiftsParams,
  result: Schema.suspend((): Schema.Codec<Types.OwnedGifts, unknown> => Types.OwnedGifts),
  retrySafe: true,
});

/** Use this method to get the last messages from the personal chat (i.e., the chat currently added to their profile) of a given user. On success, an Array of Message objects is returned. */
export interface GetUserPersonalChatMessagesParams {
  /** Unique identifier for the target user */
  readonly userId: number;
  /** The maximum number of messages to return; 1-20 */
  readonly limit: number;
}
const _GetUserPersonalChatMessagesParamsPublicKeys = { user_id: "userId" } as const;
const _GetUserPersonalChatMessagesParamsWireKeys = invertKeys(_GetUserPersonalChatMessagesParamsPublicKeys);
const _GetUserPersonalChatMessagesParamsEncoded = Schema.Struct({
  user_id: Schema.Int,
  limit: Schema.Int,
});
const _GetUserPersonalChatMessagesParamsDecoded = Schema.declare<GetUserPersonalChatMessagesParams>((input): input is GetUserPersonalChatMessagesParams => Predicate.isObject(input));
export const GetUserPersonalChatMessagesParams: Schema.Codec<GetUserPersonalChatMessagesParams, Readonly<Record<string, unknown>>> = _GetUserPersonalChatMessagesParamsEncoded.pipe(
  Schema.decodeTo(_GetUserPersonalChatMessagesParamsDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_GetUserPersonalChatMessagesParamsPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_GetUserPersonalChatMessagesParamsWireKeys)),
  }),
);

export const getUserPersonalChatMessages = callMethod({
  method: "getUserPersonalChatMessages",
  params: GetUserPersonalChatMessagesParams,
  result: Schema.Array(Schema.suspend((): Schema.Codec<Types.Message, unknown> => Types.Message)),
  retrySafe: true,
});

/** Use this method to get a list of profile audios for a user. Returns a UserProfileAudios object. */
export interface GetUserProfileAudiosParams {
  /** Unique identifier of the target user */
  readonly userId: number;
  /** Sequential number of the first audio to be returned. By default, all audios are returned. */
  readonly offset?: number | undefined;
  /** Limits the number of audios to be retrieved. Values between 1-100 are accepted. Defaults to 100. */
  readonly limit?: number | undefined;
}
const _GetUserProfileAudiosParamsPublicKeys = { user_id: "userId" } as const;
const _GetUserProfileAudiosParamsWireKeys = invertKeys(_GetUserProfileAudiosParamsPublicKeys);
const _GetUserProfileAudiosParamsEncoded = Schema.Struct({
  user_id: Schema.Int,
  offset: Schema.optional(Schema.Int),
  limit: Schema.optional(Schema.Int),
});
const _GetUserProfileAudiosParamsDecoded = Schema.declare<GetUserProfileAudiosParams>((input): input is GetUserProfileAudiosParams => Predicate.isObject(input));
export const GetUserProfileAudiosParams: Schema.Codec<GetUserProfileAudiosParams, Readonly<Record<string, unknown>>> = _GetUserProfileAudiosParamsEncoded.pipe(
  Schema.decodeTo(_GetUserProfileAudiosParamsDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_GetUserProfileAudiosParamsPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_GetUserProfileAudiosParamsWireKeys)),
  }),
);

export const getUserProfileAudios = callMethod({
  method: "getUserProfileAudios",
  params: GetUserProfileAudiosParams,
  result: Schema.suspend((): Schema.Codec<Types.UserProfileAudios, unknown> => Types.UserProfileAudios),
  retrySafe: true,
});

/** Use this method to get a list of profile pictures for a user. Returns a UserProfilePhotos object. */
export interface GetUserProfilePhotosParams {
  /** Unique identifier of the target user */
  readonly userId: number;
  /** Sequential number of the first photo to be returned. By default, all photos are returned. */
  readonly offset?: number | undefined;
  /** Limits the number of photos to be retrieved. Values between 1-100 are accepted. Defaults to 100. */
  readonly limit?: number | undefined;
}
const _GetUserProfilePhotosParamsPublicKeys = { user_id: "userId" } as const;
const _GetUserProfilePhotosParamsWireKeys = invertKeys(_GetUserProfilePhotosParamsPublicKeys);
const _GetUserProfilePhotosParamsEncoded = Schema.Struct({
  user_id: Schema.Int,
  offset: Schema.optional(Schema.Int),
  limit: Schema.optional(Schema.Int),
});
const _GetUserProfilePhotosParamsDecoded = Schema.declare<GetUserProfilePhotosParams>((input): input is GetUserProfilePhotosParams => Predicate.isObject(input));
export const GetUserProfilePhotosParams: Schema.Codec<GetUserProfilePhotosParams, Readonly<Record<string, unknown>>> = _GetUserProfilePhotosParamsEncoded.pipe(
  Schema.decodeTo(_GetUserProfilePhotosParamsDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_GetUserProfilePhotosParamsPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_GetUserProfilePhotosParamsWireKeys)),
  }),
);

export const getUserProfilePhotos = callMethod({
  method: "getUserProfilePhotos",
  params: GetUserProfilePhotosParams,
  result: Schema.suspend((): Schema.Codec<Types.UserProfilePhotos, unknown> => Types.UserProfilePhotos),
  retrySafe: true,
});

/** Use this method to get current webhook status. Requires no parameters. On success, returns a WebhookInfo object. If the bot is using getUpdates, will return an object with the url field empty. */
export const getWebhookInfo = callMethod({
  method: "getWebhookInfo",
  result: Schema.suspend((): Schema.Codec<Types.WebhookInfo, unknown> => Types.WebhookInfo),
  retrySafe: true,
});

/** Use this method to send animation files (GIF or H.264/MPEG-4 AVC video without sound). On success, the sent Message is returned. Bots can currently send animation files of up to 50 MB in size, this limit may be changed in the future. */
export interface SendAnimationParams {
  /** Unique identifier of the business connection on behalf of which the message will be sent */
  readonly businessConnectionId?: string | undefined;
  /** Unique identifier for the target chat or username of the target bot, supergroup or channel in the format @username */
  readonly chatId: number | string;
  /** Unique identifier for the target message thread (topic) of a forum; for forum supergroups and private chats of bots with forum topic mode enabled only */
  readonly messageThreadId?: number | undefined;
  /** Identifier of the direct messages topic to which the message will be sent; required if the message is sent to a direct messages chat */
  readonly directMessagesTopicId?: number | undefined;
  /** A JSON-serialized object containing the parameters of the ephemeral message to send */
  readonly ephemeralMessageParameters?: Types.EphemeralMessageParameters | undefined;
  /** Animation to send. Pass a file_id as String to send an animation that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get an animation from the Internet, or upload a new animation using multipart/form-data. More information on Sending Files » */
  readonly animation: Types.InputFile | string;
  /** Duration of sent animation in seconds */
  readonly duration?: number | undefined;
  /** Animation width */
  readonly width?: number | undefined;
  /** Animation height */
  readonly height?: number | undefined;
  /** Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails can't be reused and can be only uploaded as a new file, so you can pass “attach://<file_attach_name>” if the thumbnail was uploaded using multipart/form-data under <file_attach_name>. More information on Sending Files » */
  readonly thumbnail?: Types.InputFile | string | undefined;
  /** Animation caption (may also be used when resending animation by file_id), 0-1024 characters after entities parsing */
  readonly caption?: string | undefined;
  /** Mode for parsing entities in the animation caption. See formatting options for more details. */
  readonly parseMode?: Types.ParseMode | undefined;
  /** A JSON-serialized list of special entities that appear in the caption, which can be specified instead of parse_mode */
  readonly captionEntities?: ReadonlyArray<Types.MessageEntity> | undefined;
  /** Pass True if the caption must be shown above the message media */
  readonly showCaptionAboveMedia?: boolean | undefined;
  /** Pass True if the animation needs to be covered with a spoiler animation */
  readonly hasSpoiler?: boolean | undefined;
  /** Sends the message silently. Users will receive a notification with no sound. */
  readonly disableNotification?: boolean | undefined;
  /** Protects the contents of the sent message from forwarding and saving */
  readonly protectContent?: boolean | undefined;
  /** Pass True to allow up to 1000 messages per second, ignoring broadcasting limits for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot's balance. */
  readonly allowPaidBroadcast?: boolean | undefined;
  /** Unique identifier of the message effect to be added to the message; for private chats only */
  readonly messageEffectId?: string | undefined;
  /** A JSON-serialized object containing the parameters of the suggested post to send; for direct messages chats only. If the message is sent as a reply to another suggested post, then that suggested post is automatically declined. */
  readonly suggestedPostParameters?: Types.SuggestedPostParameters | undefined;
  /** Description of the message to reply to */
  readonly replyParameters?: Types.ReplyParameters | undefined;
  /** Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove a reply keyboard or to force a reply from the user. */
  readonly replyMarkup?: Types.InlineKeyboardMarkup | Types.ReplyKeyboardMarkup | Types.ReplyKeyboardRemove | Types.ForceReply | undefined;
}
const _SendAnimationParamsPublicKeys = { business_connection_id: "businessConnectionId", chat_id: "chatId", message_thread_id: "messageThreadId", direct_messages_topic_id: "directMessagesTopicId", ephemeral_message_parameters: "ephemeralMessageParameters", parse_mode: "parseMode", caption_entities: "captionEntities", show_caption_above_media: "showCaptionAboveMedia", has_spoiler: "hasSpoiler", disable_notification: "disableNotification", protect_content: "protectContent", allow_paid_broadcast: "allowPaidBroadcast", message_effect_id: "messageEffectId", suggested_post_parameters: "suggestedPostParameters", reply_parameters: "replyParameters", reply_markup: "replyMarkup" } as const;
const _SendAnimationParamsWireKeys = invertKeys(_SendAnimationParamsPublicKeys);
const _SendAnimationParamsEncoded = Schema.Struct({
  business_connection_id: Schema.optional(Schema.String),
  chat_id: Schema.Union([Schema.Int, Schema.String]),
  message_thread_id: Schema.optional(Schema.Int),
  direct_messages_topic_id: Schema.optional(Schema.Int),
  ephemeral_message_parameters: Schema.optional(Schema.suspend((): Schema.Codec<Types.EphemeralMessageParameters, unknown> => Types.EphemeralMessageParameters)),
  animation: Schema.Union([Schema.suspend((): Schema.Codec<Types.InputFile, unknown> => Types.InputFile), Schema.String]),
  duration: Schema.optional(Schema.Int),
  width: Schema.optional(Schema.Int),
  height: Schema.optional(Schema.Int),
  thumbnail: Schema.optional(Schema.Union([Schema.suspend((): Schema.Codec<Types.InputFile, unknown> => Types.InputFile), Schema.String])),
  caption: Schema.optional(Schema.String),
  parse_mode: Schema.optional(Schema.suspend((): Schema.Codec<Types.ParseMode, unknown> => Types.ParseMode)),
  caption_entities: Schema.optional(Schema.Array(Schema.suspend((): Schema.Codec<Types.MessageEntity, unknown> => Types.MessageEntity))),
  show_caption_above_media: Schema.optional(Schema.Boolean),
  has_spoiler: Schema.optional(Schema.Boolean),
  disable_notification: Schema.optional(Schema.Boolean),
  protect_content: Schema.optional(Schema.Boolean),
  allow_paid_broadcast: Schema.optional(Schema.Boolean),
  message_effect_id: Schema.optional(Schema.String),
  suggested_post_parameters: Schema.optional(Schema.suspend((): Schema.Codec<Types.SuggestedPostParameters, unknown> => Types.SuggestedPostParameters)),
  reply_parameters: Schema.optional(Schema.suspend((): Schema.Codec<Types.ReplyParameters, unknown> => Types.ReplyParameters)),
  reply_markup: Schema.optional(Schema.Union([Schema.suspend((): Schema.Codec<Types.InlineKeyboardMarkup, unknown> => Types.InlineKeyboardMarkup), Schema.suspend((): Schema.Codec<Types.ReplyKeyboardMarkup, unknown> => Types.ReplyKeyboardMarkup), Schema.suspend((): Schema.Codec<Types.ReplyKeyboardRemove, unknown> => Types.ReplyKeyboardRemove), Schema.suspend((): Schema.Codec<Types.ForceReply, unknown> => Types.ForceReply)])),
});
const _SendAnimationParamsDecoded = Schema.declare<SendAnimationParams>((input): input is SendAnimationParams => Predicate.isObject(input));
export const SendAnimationParams: Schema.Codec<SendAnimationParams, Readonly<Record<string, unknown>>> = _SendAnimationParamsEncoded.pipe(
  Schema.decodeTo(_SendAnimationParamsDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_SendAnimationParamsPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_SendAnimationParamsWireKeys)),
  }),
);

export const sendAnimation = callMethod({
  method: "sendAnimation",
  params: SendAnimationParams,
  result: Schema.suspend((): Schema.Codec<Types.Message, unknown> => Types.Message),
  retrySafe: false,
});

/** Use this method to send audio files, if you want Telegram clients to display them in the music player. Your audio must be in the .MP3 or .M4A format. On success, the sent Message is returned. Bots can currently send audio files of up to 50 MB in size, this limit may be changed in the future. For sending voice messages, use the sendVoice method instead. */
export interface SendAudioParams {
  /** Unique identifier of the business connection on behalf of which the message will be sent */
  readonly businessConnectionId?: string | undefined;
  /** Unique identifier for the target chat or username of the target bot, supergroup or channel in the format @username */
  readonly chatId: number | string;
  /** Unique identifier for the target message thread (topic) of a forum; for forum supergroups and private chats of bots with forum topic mode enabled only */
  readonly messageThreadId?: number | undefined;
  /** Identifier of the direct messages topic to which the message will be sent; required if the message is sent to a direct messages chat */
  readonly directMessagesTopicId?: number | undefined;
  /** A JSON-serialized object containing the parameters of the ephemeral message to send */
  readonly ephemeralMessageParameters?: Types.EphemeralMessageParameters | undefined;
  /** Audio file to send. Pass a file_id as String to send an audio file that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get an audio file from the Internet, or upload a new one using multipart/form-data. More information on Sending Files » */
  readonly audio: Types.InputFile | string;
  /** Audio caption, 0-1024 characters after entities parsing */
  readonly caption?: string | undefined;
  /** Mode for parsing entities in the audio caption. See formatting options for more details. */
  readonly parseMode?: Types.ParseMode | undefined;
  /** A JSON-serialized list of special entities that appear in the caption, which can be specified instead of parse_mode */
  readonly captionEntities?: ReadonlyArray<Types.MessageEntity> | undefined;
  /** Duration of the audio in seconds */
  readonly duration?: number | undefined;
  /** Performer */
  readonly performer?: string | undefined;
  /** Track name */
  readonly title?: string | undefined;
  /** Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails can't be reused and can be only uploaded as a new file, so you can pass “attach://<file_attach_name>” if the thumbnail was uploaded using multipart/form-data under <file_attach_name>. More information on Sending Files » */
  readonly thumbnail?: Types.InputFile | string | undefined;
  /** Sends the message silently. Users will receive a notification with no sound. */
  readonly disableNotification?: boolean | undefined;
  /** Protects the contents of the sent message from forwarding and saving */
  readonly protectContent?: boolean | undefined;
  /** Pass True to allow up to 1000 messages per second, ignoring broadcasting limits for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot's balance. */
  readonly allowPaidBroadcast?: boolean | undefined;
  /** Unique identifier of the message effect to be added to the message; for private chats only */
  readonly messageEffectId?: string | undefined;
  /** A JSON-serialized object containing the parameters of the suggested post to send; for direct messages chats only. If the message is sent as a reply to another suggested post, then that suggested post is automatically declined. */
  readonly suggestedPostParameters?: Types.SuggestedPostParameters | undefined;
  /** Description of the message to reply to */
  readonly replyParameters?: Types.ReplyParameters | undefined;
  /** Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove a reply keyboard or to force a reply from the user. */
  readonly replyMarkup?: Types.InlineKeyboardMarkup | Types.ReplyKeyboardMarkup | Types.ReplyKeyboardRemove | Types.ForceReply | undefined;
}
const _SendAudioParamsPublicKeys = { business_connection_id: "businessConnectionId", chat_id: "chatId", message_thread_id: "messageThreadId", direct_messages_topic_id: "directMessagesTopicId", ephemeral_message_parameters: "ephemeralMessageParameters", parse_mode: "parseMode", caption_entities: "captionEntities", disable_notification: "disableNotification", protect_content: "protectContent", allow_paid_broadcast: "allowPaidBroadcast", message_effect_id: "messageEffectId", suggested_post_parameters: "suggestedPostParameters", reply_parameters: "replyParameters", reply_markup: "replyMarkup" } as const;
const _SendAudioParamsWireKeys = invertKeys(_SendAudioParamsPublicKeys);
const _SendAudioParamsEncoded = Schema.Struct({
  business_connection_id: Schema.optional(Schema.String),
  chat_id: Schema.Union([Schema.Int, Schema.String]),
  message_thread_id: Schema.optional(Schema.Int),
  direct_messages_topic_id: Schema.optional(Schema.Int),
  ephemeral_message_parameters: Schema.optional(Schema.suspend((): Schema.Codec<Types.EphemeralMessageParameters, unknown> => Types.EphemeralMessageParameters)),
  audio: Schema.Union([Schema.suspend((): Schema.Codec<Types.InputFile, unknown> => Types.InputFile), Schema.String]),
  caption: Schema.optional(Schema.String),
  parse_mode: Schema.optional(Schema.suspend((): Schema.Codec<Types.ParseMode, unknown> => Types.ParseMode)),
  caption_entities: Schema.optional(Schema.Array(Schema.suspend((): Schema.Codec<Types.MessageEntity, unknown> => Types.MessageEntity))),
  duration: Schema.optional(Schema.Int),
  performer: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  thumbnail: Schema.optional(Schema.Union([Schema.suspend((): Schema.Codec<Types.InputFile, unknown> => Types.InputFile), Schema.String])),
  disable_notification: Schema.optional(Schema.Boolean),
  protect_content: Schema.optional(Schema.Boolean),
  allow_paid_broadcast: Schema.optional(Schema.Boolean),
  message_effect_id: Schema.optional(Schema.String),
  suggested_post_parameters: Schema.optional(Schema.suspend((): Schema.Codec<Types.SuggestedPostParameters, unknown> => Types.SuggestedPostParameters)),
  reply_parameters: Schema.optional(Schema.suspend((): Schema.Codec<Types.ReplyParameters, unknown> => Types.ReplyParameters)),
  reply_markup: Schema.optional(Schema.Union([Schema.suspend((): Schema.Codec<Types.InlineKeyboardMarkup, unknown> => Types.InlineKeyboardMarkup), Schema.suspend((): Schema.Codec<Types.ReplyKeyboardMarkup, unknown> => Types.ReplyKeyboardMarkup), Schema.suspend((): Schema.Codec<Types.ReplyKeyboardRemove, unknown> => Types.ReplyKeyboardRemove), Schema.suspend((): Schema.Codec<Types.ForceReply, unknown> => Types.ForceReply)])),
});
const _SendAudioParamsDecoded = Schema.declare<SendAudioParams>((input): input is SendAudioParams => Predicate.isObject(input));
export const SendAudioParams: Schema.Codec<SendAudioParams, Readonly<Record<string, unknown>>> = _SendAudioParamsEncoded.pipe(
  Schema.decodeTo(_SendAudioParamsDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_SendAudioParamsPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_SendAudioParamsWireKeys)),
  }),
);

export const sendAudio = callMethod({
  method: "sendAudio",
  params: SendAudioParams,
  result: Schema.suspend((): Schema.Codec<Types.Message, unknown> => Types.Message),
  retrySafe: false,
});

/** Use this method when you need to tell the user that something is happening on the bot's side. The status is set for 5 seconds or less (when a message arrives from your bot, Telegram clients clear its typing status). Returns True on success. We only recommend using this method when a response from the bot will take a noticeable amount of time to arrive. */
export interface SendChatActionParams {
  /** Unique identifier of the business connection on behalf of which the action will be sent */
  readonly businessConnectionId?: string | undefined;
  /** Unique identifier for the target chat or username of the target bot or supergroup in the format @username. Channel chats and channel direct messages chats aren't supported. */
  readonly chatId: number | string;
  /** Unique identifier for the target message thread or topic of a forum; for supergroups and private chats of bots with forum topic mode enabled only */
  readonly messageThreadId?: number | undefined;
  /** Type of action to broadcast. Choose one, depending on what the user is about to receive: typing for text messages, upload_photo for photos, record_video or upload_video for videos, record_voice or upload_voice for voice notes, upload_document for general files, choose_sticker for stickers, find_location for location data, record_video_note or upload_video_note for video notes. */
  readonly action: Types.ChatAction;
}
const _SendChatActionParamsPublicKeys = { business_connection_id: "businessConnectionId", chat_id: "chatId", message_thread_id: "messageThreadId" } as const;
const _SendChatActionParamsWireKeys = invertKeys(_SendChatActionParamsPublicKeys);
const _SendChatActionParamsEncoded = Schema.Struct({
  business_connection_id: Schema.optional(Schema.String),
  chat_id: Schema.Union([Schema.Int, Schema.String]),
  message_thread_id: Schema.optional(Schema.Int),
  action: Schema.suspend((): Schema.Codec<Types.ChatAction, unknown> => Types.ChatAction),
});
const _SendChatActionParamsDecoded = Schema.declare<SendChatActionParams>((input): input is SendChatActionParams => Predicate.isObject(input));
export const SendChatActionParams: Schema.Codec<SendChatActionParams, Readonly<Record<string, unknown>>> = _SendChatActionParamsEncoded.pipe(
  Schema.decodeTo(_SendChatActionParamsDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_SendChatActionParamsPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_SendChatActionParamsWireKeys)),
  }),
);

export const sendChatAction = callMethod({
  method: "sendChatAction",
  params: SendChatActionParams,
  result: Schema.Literal(true),
  retrySafe: true,
});

/** Use this method to send phone contacts. On success, the sent Message is returned. */
export interface SendContactParams {
  /** Unique identifier of the business connection on behalf of which the message will be sent */
  readonly businessConnectionId?: string | undefined;
  /** Unique identifier for the target chat or username of the target bot, supergroup or channel in the format @username */
  readonly chatId: number | string;
  /** Unique identifier for the target message thread (topic) of a forum; for forum supergroups and private chats of bots with forum topic mode enabled only */
  readonly messageThreadId?: number | undefined;
  /** Identifier of the direct messages topic to which the message will be sent; required if the message is sent to a direct messages chat */
  readonly directMessagesTopicId?: number | undefined;
  /** A JSON-serialized object containing the parameters of the ephemeral message to send */
  readonly ephemeralMessageParameters?: Types.EphemeralMessageParameters | undefined;
  /** Contact's phone number */
  readonly phoneNumber: string;
  /** Contact's first name */
  readonly firstName: string;
  /** Contact's last name */
  readonly lastName?: string | undefined;
  /** Additional data about the contact in the form of a vCard, 0-2048 bytes */
  readonly vcard?: string | undefined;
  /** Sends the message silently. Users will receive a notification with no sound. */
  readonly disableNotification?: boolean | undefined;
  /** Protects the contents of the sent message from forwarding and saving */
  readonly protectContent?: boolean | undefined;
  /** Pass True to allow up to 1000 messages per second, ignoring broadcasting limits for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot's balance. */
  readonly allowPaidBroadcast?: boolean | undefined;
  /** Unique identifier of the message effect to be added to the message; for private chats only */
  readonly messageEffectId?: string | undefined;
  /** A JSON-serialized object containing the parameters of the suggested post to send; for direct messages chats only. If the message is sent as a reply to another suggested post, then that suggested post is automatically declined. */
  readonly suggestedPostParameters?: Types.SuggestedPostParameters | undefined;
  /** Description of the message to reply to */
  readonly replyParameters?: Types.ReplyParameters | undefined;
  /** Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove a reply keyboard or to force a reply from the user. */
  readonly replyMarkup?: Types.InlineKeyboardMarkup | Types.ReplyKeyboardMarkup | Types.ReplyKeyboardRemove | Types.ForceReply | undefined;
}
const _SendContactParamsPublicKeys = { business_connection_id: "businessConnectionId", chat_id: "chatId", message_thread_id: "messageThreadId", direct_messages_topic_id: "directMessagesTopicId", ephemeral_message_parameters: "ephemeralMessageParameters", phone_number: "phoneNumber", first_name: "firstName", last_name: "lastName", disable_notification: "disableNotification", protect_content: "protectContent", allow_paid_broadcast: "allowPaidBroadcast", message_effect_id: "messageEffectId", suggested_post_parameters: "suggestedPostParameters", reply_parameters: "replyParameters", reply_markup: "replyMarkup" } as const;
const _SendContactParamsWireKeys = invertKeys(_SendContactParamsPublicKeys);
const _SendContactParamsEncoded = Schema.Struct({
  business_connection_id: Schema.optional(Schema.String),
  chat_id: Schema.Union([Schema.Int, Schema.String]),
  message_thread_id: Schema.optional(Schema.Int),
  direct_messages_topic_id: Schema.optional(Schema.Int),
  ephemeral_message_parameters: Schema.optional(Schema.suspend((): Schema.Codec<Types.EphemeralMessageParameters, unknown> => Types.EphemeralMessageParameters)),
  phone_number: Schema.String,
  first_name: Schema.String,
  last_name: Schema.optional(Schema.String),
  vcard: Schema.optional(Schema.String),
  disable_notification: Schema.optional(Schema.Boolean),
  protect_content: Schema.optional(Schema.Boolean),
  allow_paid_broadcast: Schema.optional(Schema.Boolean),
  message_effect_id: Schema.optional(Schema.String),
  suggested_post_parameters: Schema.optional(Schema.suspend((): Schema.Codec<Types.SuggestedPostParameters, unknown> => Types.SuggestedPostParameters)),
  reply_parameters: Schema.optional(Schema.suspend((): Schema.Codec<Types.ReplyParameters, unknown> => Types.ReplyParameters)),
  reply_markup: Schema.optional(Schema.Union([Schema.suspend((): Schema.Codec<Types.InlineKeyboardMarkup, unknown> => Types.InlineKeyboardMarkup), Schema.suspend((): Schema.Codec<Types.ReplyKeyboardMarkup, unknown> => Types.ReplyKeyboardMarkup), Schema.suspend((): Schema.Codec<Types.ReplyKeyboardRemove, unknown> => Types.ReplyKeyboardRemove), Schema.suspend((): Schema.Codec<Types.ForceReply, unknown> => Types.ForceReply)])),
});
const _SendContactParamsDecoded = Schema.declare<SendContactParams>((input): input is SendContactParams => Predicate.isObject(input));
export const SendContactParams: Schema.Codec<SendContactParams, Readonly<Record<string, unknown>>> = _SendContactParamsEncoded.pipe(
  Schema.decodeTo(_SendContactParamsDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_SendContactParamsPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_SendContactParamsWireKeys)),
  }),
);

export const sendContact = callMethod({
  method: "sendContact",
  params: SendContactParams,
  result: Schema.suspend((): Schema.Codec<Types.Message, unknown> => Types.Message),
  retrySafe: false,
});

/** Use this method to send an animated emoji that will display a random value. On success, the sent Message is returned. */
export interface SendDiceParams {
  /** Unique identifier of the business connection on behalf of which the message will be sent */
  readonly businessConnectionId?: string | undefined;
  /** Unique identifier for the target chat or username of the target bot, supergroup or channel in the format @username */
  readonly chatId: number | string;
  /** Unique identifier for the target message thread (topic) of a forum; for forum supergroups and private chats of bots with forum topic mode enabled only */
  readonly messageThreadId?: number | undefined;
  /** Identifier of the direct messages topic to which the message will be sent; required if the message is sent to a direct messages chat */
  readonly directMessagesTopicId?: number | undefined;
  /** Emoji on which the dice throw animation is based. Currently, must be one of “🎲”, “🎯”, “🏀”, “⚽”, “🎳”, or “🎰”. Dice can have values 1-6 for “🎲”, “🎯” and “🎳”, values 1-5 for “🏀” and “⚽”, and values 1-64 for “🎰”. Defaults to “🎲”. */
  readonly emoji?: Types.DiceEmoji | undefined;
  /** Sends the message silently. Users will receive a notification with no sound. */
  readonly disableNotification?: boolean | undefined;
  /** Protects the contents of the sent message from forwarding */
  readonly protectContent?: boolean | undefined;
  /** Pass True to allow up to 1000 messages per second, ignoring broadcasting limits for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot's balance. */
  readonly allowPaidBroadcast?: boolean | undefined;
  /** Unique identifier of the message effect to be added to the message; for private chats only */
  readonly messageEffectId?: string | undefined;
  /** A JSON-serialized object containing the parameters of the suggested post to send; for direct messages chats only. If the message is sent as a reply to another suggested post, then that suggested post is automatically declined. */
  readonly suggestedPostParameters?: Types.SuggestedPostParameters | undefined;
  /** Description of the message to reply to */
  readonly replyParameters?: Types.ReplyParameters | undefined;
  /** Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove a reply keyboard or to force a reply from the user. */
  readonly replyMarkup?: Types.InlineKeyboardMarkup | Types.ReplyKeyboardMarkup | Types.ReplyKeyboardRemove | Types.ForceReply | undefined;
}
const _SendDiceParamsPublicKeys = { business_connection_id: "businessConnectionId", chat_id: "chatId", message_thread_id: "messageThreadId", direct_messages_topic_id: "directMessagesTopicId", disable_notification: "disableNotification", protect_content: "protectContent", allow_paid_broadcast: "allowPaidBroadcast", message_effect_id: "messageEffectId", suggested_post_parameters: "suggestedPostParameters", reply_parameters: "replyParameters", reply_markup: "replyMarkup" } as const;
const _SendDiceParamsWireKeys = invertKeys(_SendDiceParamsPublicKeys);
const _SendDiceParamsEncoded = Schema.Struct({
  business_connection_id: Schema.optional(Schema.String),
  chat_id: Schema.Union([Schema.Int, Schema.String]),
  message_thread_id: Schema.optional(Schema.Int),
  direct_messages_topic_id: Schema.optional(Schema.Int),
  emoji: Schema.optional(Schema.suspend((): Schema.Codec<Types.DiceEmoji, unknown> => Types.DiceEmoji)),
  disable_notification: Schema.optional(Schema.Boolean),
  protect_content: Schema.optional(Schema.Boolean),
  allow_paid_broadcast: Schema.optional(Schema.Boolean),
  message_effect_id: Schema.optional(Schema.String),
  suggested_post_parameters: Schema.optional(Schema.suspend((): Schema.Codec<Types.SuggestedPostParameters, unknown> => Types.SuggestedPostParameters)),
  reply_parameters: Schema.optional(Schema.suspend((): Schema.Codec<Types.ReplyParameters, unknown> => Types.ReplyParameters)),
  reply_markup: Schema.optional(Schema.Union([Schema.suspend((): Schema.Codec<Types.InlineKeyboardMarkup, unknown> => Types.InlineKeyboardMarkup), Schema.suspend((): Schema.Codec<Types.ReplyKeyboardMarkup, unknown> => Types.ReplyKeyboardMarkup), Schema.suspend((): Schema.Codec<Types.ReplyKeyboardRemove, unknown> => Types.ReplyKeyboardRemove), Schema.suspend((): Schema.Codec<Types.ForceReply, unknown> => Types.ForceReply)])),
});
const _SendDiceParamsDecoded = Schema.declare<SendDiceParams>((input): input is SendDiceParams => Predicate.isObject(input));
export const SendDiceParams: Schema.Codec<SendDiceParams, Readonly<Record<string, unknown>>> = _SendDiceParamsEncoded.pipe(
  Schema.decodeTo(_SendDiceParamsDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_SendDiceParamsPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_SendDiceParamsWireKeys)),
  }),
);

export const sendDice = callMethod({
  method: "sendDice",
  params: SendDiceParams,
  result: Schema.suspend((): Schema.Codec<Types.Message, unknown> => Types.Message),
  retrySafe: false,
});

/** Use this method to send general files. On success, the sent Message is returned. Bots can currently send files of any type of up to 50 MB in size, this limit may be changed in the future. */
export interface SendDocumentParams {
  /** Unique identifier of the business connection on behalf of which the message will be sent */
  readonly businessConnectionId?: string | undefined;
  /** Unique identifier for the target chat or username of the target bot, supergroup or channel in the format @username */
  readonly chatId: number | string;
  /** Unique identifier for the target message thread (topic) of a forum; for forum supergroups and private chats of bots with forum topic mode enabled only */
  readonly messageThreadId?: number | undefined;
  /** Identifier of the direct messages topic to which the message will be sent; required if the message is sent to a direct messages chat */
  readonly directMessagesTopicId?: number | undefined;
  /** A JSON-serialized object containing the parameters of the ephemeral message to send */
  readonly ephemeralMessageParameters?: Types.EphemeralMessageParameters | undefined;
  /** File to send. Pass a file_id as String to send a file that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a file from the Internet, or upload a new one using multipart/form-data. More information on Sending Files » */
  readonly document: Types.InputFile | string;
  /** Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails can't be reused and can be only uploaded as a new file, so you can pass “attach://<file_attach_name>” if the thumbnail was uploaded using multipart/form-data under <file_attach_name>. More information on Sending Files » */
  readonly thumbnail?: Types.InputFile | string | undefined;
  /** Document caption (may also be used when resending documents by file_id), 0-1024 characters after entities parsing */
  readonly caption?: string | undefined;
  /** Mode for parsing entities in the document caption. See formatting options for more details. */
  readonly parseMode?: Types.ParseMode | undefined;
  /** A JSON-serialized list of special entities that appear in the caption, which can be specified instead of parse_mode */
  readonly captionEntities?: ReadonlyArray<Types.MessageEntity> | undefined;
  /** Disables automatic server-side content type detection for files uploaded using multipart/form-data */
  readonly disableContentTypeDetection?: boolean | undefined;
  /** Sends the message silently. Users will receive a notification with no sound. */
  readonly disableNotification?: boolean | undefined;
  /** Protects the contents of the sent message from forwarding and saving */
  readonly protectContent?: boolean | undefined;
  /** Pass True to allow up to 1000 messages per second, ignoring broadcasting limits for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot's balance. */
  readonly allowPaidBroadcast?: boolean | undefined;
  /** Unique identifier of the message effect to be added to the message; for private chats only */
  readonly messageEffectId?: string | undefined;
  /** A JSON-serialized object containing the parameters of the suggested post to send; for direct messages chats only. If the message is sent as a reply to another suggested post, then that suggested post is automatically declined. */
  readonly suggestedPostParameters?: Types.SuggestedPostParameters | undefined;
  /** Description of the message to reply to */
  readonly replyParameters?: Types.ReplyParameters | undefined;
  /** Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove a reply keyboard or to force a reply from the user. */
  readonly replyMarkup?: Types.InlineKeyboardMarkup | Types.ReplyKeyboardMarkup | Types.ReplyKeyboardRemove | Types.ForceReply | undefined;
}
const _SendDocumentParamsPublicKeys = { business_connection_id: "businessConnectionId", chat_id: "chatId", message_thread_id: "messageThreadId", direct_messages_topic_id: "directMessagesTopicId", ephemeral_message_parameters: "ephemeralMessageParameters", parse_mode: "parseMode", caption_entities: "captionEntities", disable_content_type_detection: "disableContentTypeDetection", disable_notification: "disableNotification", protect_content: "protectContent", allow_paid_broadcast: "allowPaidBroadcast", message_effect_id: "messageEffectId", suggested_post_parameters: "suggestedPostParameters", reply_parameters: "replyParameters", reply_markup: "replyMarkup" } as const;
const _SendDocumentParamsWireKeys = invertKeys(_SendDocumentParamsPublicKeys);
const _SendDocumentParamsEncoded = Schema.Struct({
  business_connection_id: Schema.optional(Schema.String),
  chat_id: Schema.Union([Schema.Int, Schema.String]),
  message_thread_id: Schema.optional(Schema.Int),
  direct_messages_topic_id: Schema.optional(Schema.Int),
  ephemeral_message_parameters: Schema.optional(Schema.suspend((): Schema.Codec<Types.EphemeralMessageParameters, unknown> => Types.EphemeralMessageParameters)),
  document: Schema.Union([Schema.suspend((): Schema.Codec<Types.InputFile, unknown> => Types.InputFile), Schema.String]),
  thumbnail: Schema.optional(Schema.Union([Schema.suspend((): Schema.Codec<Types.InputFile, unknown> => Types.InputFile), Schema.String])),
  caption: Schema.optional(Schema.String),
  parse_mode: Schema.optional(Schema.suspend((): Schema.Codec<Types.ParseMode, unknown> => Types.ParseMode)),
  caption_entities: Schema.optional(Schema.Array(Schema.suspend((): Schema.Codec<Types.MessageEntity, unknown> => Types.MessageEntity))),
  disable_content_type_detection: Schema.optional(Schema.Boolean),
  disable_notification: Schema.optional(Schema.Boolean),
  protect_content: Schema.optional(Schema.Boolean),
  allow_paid_broadcast: Schema.optional(Schema.Boolean),
  message_effect_id: Schema.optional(Schema.String),
  suggested_post_parameters: Schema.optional(Schema.suspend((): Schema.Codec<Types.SuggestedPostParameters, unknown> => Types.SuggestedPostParameters)),
  reply_parameters: Schema.optional(Schema.suspend((): Schema.Codec<Types.ReplyParameters, unknown> => Types.ReplyParameters)),
  reply_markup: Schema.optional(Schema.Union([Schema.suspend((): Schema.Codec<Types.InlineKeyboardMarkup, unknown> => Types.InlineKeyboardMarkup), Schema.suspend((): Schema.Codec<Types.ReplyKeyboardMarkup, unknown> => Types.ReplyKeyboardMarkup), Schema.suspend((): Schema.Codec<Types.ReplyKeyboardRemove, unknown> => Types.ReplyKeyboardRemove), Schema.suspend((): Schema.Codec<Types.ForceReply, unknown> => Types.ForceReply)])),
});
const _SendDocumentParamsDecoded = Schema.declare<SendDocumentParams>((input): input is SendDocumentParams => Predicate.isObject(input));
export const SendDocumentParams: Schema.Codec<SendDocumentParams, Readonly<Record<string, unknown>>> = _SendDocumentParamsEncoded.pipe(
  Schema.decodeTo(_SendDocumentParamsDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_SendDocumentParamsPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_SendDocumentParamsWireKeys)),
  }),
);

export const sendDocument = callMethod({
  method: "sendDocument",
  params: SendDocumentParams,
  result: Schema.suspend((): Schema.Codec<Types.Message, unknown> => Types.Message),
  retrySafe: false,
});

/** Use this method to send live photos. On success, the sent Message is returned. */
export interface SendLivePhotoParams {
  /** Unique identifier of the business connection on behalf of which the message will be sent */
  readonly businessConnectionId?: string | undefined;
  /** Unique identifier for the target chat or username of the target channel (in the format @channelusername) */
  readonly chatId: number | string;
  /** Unique identifier for the target message thread (topic) of a forum; for forum supergroups and private chats of bots with forum topic mode enabled only */
  readonly messageThreadId?: number | undefined;
  /** Identifier of the direct messages topic to which the message will be sent; required if the message is sent to a direct messages chat */
  readonly directMessagesTopicId?: number | undefined;
  /** A JSON-serialized object containing the parameters of the ephemeral message to send */
  readonly ephemeralMessageParameters?: Types.EphemeralMessageParameters | undefined;
  /** Live photo video to send. The video must be no longer than 10 seconds and must not exceed 10 MB in size. Pass a file_id as String to send a video that exists on the Telegram servers (recommended) or upload a new video using multipart/form-data. More information on Sending Files ». Sending live photos by a URL is currently unsupported. */
  readonly livePhoto: Types.InputFile | string;
  /** The static photo to send. Pass a file_id as String to send a photo that exists on the Telegram servers (recommended) or upload a new video using multipart/form-data. More information on Sending Files ». Sending live photos by a URL is currently unsupported. */
  readonly photo: Types.InputFile | string;
  /** Video caption (may also be used when resending videos by file_id), 0-1024 characters after entities parsing */
  readonly caption?: string | undefined;
  /** Mode for parsing entities in the video caption. See formatting options for more details. */
  readonly parseMode?: Types.ParseMode | undefined;
  /** A JSON-serialized list of special entities that appear in the caption, which can be specified instead of parse_mode */
  readonly captionEntities?: ReadonlyArray<Types.MessageEntity> | undefined;
  /** Pass True if the caption must be shown above the message media */
  readonly showCaptionAboveMedia?: boolean | undefined;
  /** Pass True if the video needs to be covered with a spoiler animation */
  readonly hasSpoiler?: boolean | undefined;
  /** Sends the message silently. Users will receive a notification with no sound. */
  readonly disableNotification?: boolean | undefined;
  /** Protects the contents of the sent message from forwarding and saving */
  readonly protectContent?: boolean | undefined;
  /** Pass True to allow up to 1000 messages per second, ignoring broadcasting limits for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot's balance. */
  readonly allowPaidBroadcast?: boolean | undefined;
  /** Unique identifier of the message effect to be added to the message; for private chats only */
  readonly messageEffectId?: string | undefined;
  /** A JSON-serialized object containing the parameters of the suggested post to send; for direct messages chats only. If the message is sent as a reply to another suggested post, then that suggested post is automatically declined. */
  readonly suggestedPostParameters?: Types.SuggestedPostParameters | undefined;
  /** Description of the message to reply to */
  readonly replyParameters?: Types.ReplyParameters | undefined;
  /** Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove a reply keyboard or to force a reply from the user. */
  readonly replyMarkup?: Types.InlineKeyboardMarkup | Types.ReplyKeyboardMarkup | Types.ReplyKeyboardRemove | Types.ForceReply | undefined;
}
const _SendLivePhotoParamsPublicKeys = { business_connection_id: "businessConnectionId", chat_id: "chatId", message_thread_id: "messageThreadId", direct_messages_topic_id: "directMessagesTopicId", ephemeral_message_parameters: "ephemeralMessageParameters", live_photo: "livePhoto", parse_mode: "parseMode", caption_entities: "captionEntities", show_caption_above_media: "showCaptionAboveMedia", has_spoiler: "hasSpoiler", disable_notification: "disableNotification", protect_content: "protectContent", allow_paid_broadcast: "allowPaidBroadcast", message_effect_id: "messageEffectId", suggested_post_parameters: "suggestedPostParameters", reply_parameters: "replyParameters", reply_markup: "replyMarkup" } as const;
const _SendLivePhotoParamsWireKeys = invertKeys(_SendLivePhotoParamsPublicKeys);
const _SendLivePhotoParamsEncoded = Schema.Struct({
  business_connection_id: Schema.optional(Schema.String),
  chat_id: Schema.Union([Schema.Int, Schema.String]),
  message_thread_id: Schema.optional(Schema.Int),
  direct_messages_topic_id: Schema.optional(Schema.Int),
  ephemeral_message_parameters: Schema.optional(Schema.suspend((): Schema.Codec<Types.EphemeralMessageParameters, unknown> => Types.EphemeralMessageParameters)),
  live_photo: Schema.Union([Schema.suspend((): Schema.Codec<Types.InputFile, unknown> => Types.InputFile), Schema.String]),
  photo: Schema.Union([Schema.suspend((): Schema.Codec<Types.InputFile, unknown> => Types.InputFile), Schema.String]),
  caption: Schema.optional(Schema.String),
  parse_mode: Schema.optional(Schema.suspend((): Schema.Codec<Types.ParseMode, unknown> => Types.ParseMode)),
  caption_entities: Schema.optional(Schema.Array(Schema.suspend((): Schema.Codec<Types.MessageEntity, unknown> => Types.MessageEntity))),
  show_caption_above_media: Schema.optional(Schema.Boolean),
  has_spoiler: Schema.optional(Schema.Boolean),
  disable_notification: Schema.optional(Schema.Boolean),
  protect_content: Schema.optional(Schema.Boolean),
  allow_paid_broadcast: Schema.optional(Schema.Boolean),
  message_effect_id: Schema.optional(Schema.String),
  suggested_post_parameters: Schema.optional(Schema.suspend((): Schema.Codec<Types.SuggestedPostParameters, unknown> => Types.SuggestedPostParameters)),
  reply_parameters: Schema.optional(Schema.suspend((): Schema.Codec<Types.ReplyParameters, unknown> => Types.ReplyParameters)),
  reply_markup: Schema.optional(Schema.Union([Schema.suspend((): Schema.Codec<Types.InlineKeyboardMarkup, unknown> => Types.InlineKeyboardMarkup), Schema.suspend((): Schema.Codec<Types.ReplyKeyboardMarkup, unknown> => Types.ReplyKeyboardMarkup), Schema.suspend((): Schema.Codec<Types.ReplyKeyboardRemove, unknown> => Types.ReplyKeyboardRemove), Schema.suspend((): Schema.Codec<Types.ForceReply, unknown> => Types.ForceReply)])),
});
const _SendLivePhotoParamsDecoded = Schema.declare<SendLivePhotoParams>((input): input is SendLivePhotoParams => Predicate.isObject(input));
export const SendLivePhotoParams: Schema.Codec<SendLivePhotoParams, Readonly<Record<string, unknown>>> = _SendLivePhotoParamsEncoded.pipe(
  Schema.decodeTo(_SendLivePhotoParamsDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_SendLivePhotoParamsPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_SendLivePhotoParamsWireKeys)),
  }),
);

export const sendLivePhoto = callMethod({
  method: "sendLivePhoto",
  params: SendLivePhotoParams,
  result: Schema.suspend((): Schema.Codec<Types.Message, unknown> => Types.Message),
  retrySafe: false,
});

/** Use this method to send point on the map. On success, the sent Message is returned. */
export interface SendLocationParams {
  /** Unique identifier of the business connection on behalf of which the message will be sent */
  readonly businessConnectionId?: string | undefined;
  /** Unique identifier for the target chat or username of the target bot, supergroup or channel in the format @username */
  readonly chatId: number | string;
  /** Unique identifier for the target message thread (topic) of a forum; for forum supergroups and private chats of bots with forum topic mode enabled only */
  readonly messageThreadId?: number | undefined;
  /** Identifier of the direct messages topic to which the message will be sent; required if the message is sent to a direct messages chat */
  readonly directMessagesTopicId?: number | undefined;
  /** A JSON-serialized object containing the parameters of the ephemeral message to send */
  readonly ephemeralMessageParameters?: Types.EphemeralMessageParameters | undefined;
  /** Latitude of the location */
  readonly latitude: number;
  /** Longitude of the location */
  readonly longitude: number;
  /** The radius of uncertainty for the location, measured in meters; 0-1500 */
  readonly horizontalAccuracy?: number | undefined;
  /** Period in seconds during which the location will be updated (see Live Locations), must be between 60 and 86400, or 0x7FFFFFFF for live locations that can be edited indefinitely. Must be 0 for ephemeral messages. */
  readonly livePeriod?: number | undefined;
  /** For live locations, a direction in which the user is moving, in degrees. Must be between 1 and 360 if specified. */
  readonly heading?: number | undefined;
  /** For live locations, a maximum distance for proximity alerts about approaching another chat member, in meters. Must be between 1 and 100000 if specified. */
  readonly proximityAlertRadius?: number | undefined;
  /** Sends the message silently. Users will receive a notification with no sound. */
  readonly disableNotification?: boolean | undefined;
  /** Protects the contents of the sent message from forwarding and saving */
  readonly protectContent?: boolean | undefined;
  /** Pass True to allow up to 1000 messages per second, ignoring broadcasting limits for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot's balance. */
  readonly allowPaidBroadcast?: boolean | undefined;
  /** Unique identifier of the message effect to be added to the message; for private chats only */
  readonly messageEffectId?: string | undefined;
  /** A JSON-serialized object containing the parameters of the suggested post to send; for direct messages chats only. If the message is sent as a reply to another suggested post, then that suggested post is automatically declined. */
  readonly suggestedPostParameters?: Types.SuggestedPostParameters | undefined;
  /** Description of the message to reply to */
  readonly replyParameters?: Types.ReplyParameters | undefined;
  /** Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove a reply keyboard or to force a reply from the user. */
  readonly replyMarkup?: Types.InlineKeyboardMarkup | Types.ReplyKeyboardMarkup | Types.ReplyKeyboardRemove | Types.ForceReply | undefined;
}
const _SendLocationParamsPublicKeys = { business_connection_id: "businessConnectionId", chat_id: "chatId", message_thread_id: "messageThreadId", direct_messages_topic_id: "directMessagesTopicId", ephemeral_message_parameters: "ephemeralMessageParameters", horizontal_accuracy: "horizontalAccuracy", live_period: "livePeriod", proximity_alert_radius: "proximityAlertRadius", disable_notification: "disableNotification", protect_content: "protectContent", allow_paid_broadcast: "allowPaidBroadcast", message_effect_id: "messageEffectId", suggested_post_parameters: "suggestedPostParameters", reply_parameters: "replyParameters", reply_markup: "replyMarkup" } as const;
const _SendLocationParamsWireKeys = invertKeys(_SendLocationParamsPublicKeys);
const _SendLocationParamsEncoded = Schema.Struct({
  business_connection_id: Schema.optional(Schema.String),
  chat_id: Schema.Union([Schema.Int, Schema.String]),
  message_thread_id: Schema.optional(Schema.Int),
  direct_messages_topic_id: Schema.optional(Schema.Int),
  ephemeral_message_parameters: Schema.optional(Schema.suspend((): Schema.Codec<Types.EphemeralMessageParameters, unknown> => Types.EphemeralMessageParameters)),
  latitude: Schema.Number,
  longitude: Schema.Number,
  horizontal_accuracy: Schema.optional(Schema.Number),
  live_period: Schema.optional(Schema.Int),
  heading: Schema.optional(Schema.Int),
  proximity_alert_radius: Schema.optional(Schema.Int),
  disable_notification: Schema.optional(Schema.Boolean),
  protect_content: Schema.optional(Schema.Boolean),
  allow_paid_broadcast: Schema.optional(Schema.Boolean),
  message_effect_id: Schema.optional(Schema.String),
  suggested_post_parameters: Schema.optional(Schema.suspend((): Schema.Codec<Types.SuggestedPostParameters, unknown> => Types.SuggestedPostParameters)),
  reply_parameters: Schema.optional(Schema.suspend((): Schema.Codec<Types.ReplyParameters, unknown> => Types.ReplyParameters)),
  reply_markup: Schema.optional(Schema.Union([Schema.suspend((): Schema.Codec<Types.InlineKeyboardMarkup, unknown> => Types.InlineKeyboardMarkup), Schema.suspend((): Schema.Codec<Types.ReplyKeyboardMarkup, unknown> => Types.ReplyKeyboardMarkup), Schema.suspend((): Schema.Codec<Types.ReplyKeyboardRemove, unknown> => Types.ReplyKeyboardRemove), Schema.suspend((): Schema.Codec<Types.ForceReply, unknown> => Types.ForceReply)])),
});
const _SendLocationParamsDecoded = Schema.declare<SendLocationParams>((input): input is SendLocationParams => Predicate.isObject(input));
export const SendLocationParams: Schema.Codec<SendLocationParams, Readonly<Record<string, unknown>>> = _SendLocationParamsEncoded.pipe(
  Schema.decodeTo(_SendLocationParamsDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_SendLocationParamsPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_SendLocationParamsWireKeys)),
  }),
);

export const sendLocation = callMethod({
  method: "sendLocation",
  params: SendLocationParams,
  result: Schema.suspend((): Schema.Codec<Types.Message, unknown> => Types.Message),
  retrySafe: false,
});

/** Use this method to send text messages. On success, the sent Message is returned. */
export interface SendMessageParams {
  /** Unique identifier of the business connection on behalf of which the message will be sent */
  readonly businessConnectionId?: string | undefined;
  /** Unique identifier for the target chat or username of the target bot, supergroup or channel in the format @username */
  readonly chatId: number | string;
  /** Unique identifier for the target message thread (topic) of a forum; for forum supergroups and private chats of bots with forum topic mode enabled only */
  readonly messageThreadId?: number | undefined;
  /** Identifier of the direct messages topic to which the message will be sent; required if the message is sent to a direct messages chat */
  readonly directMessagesTopicId?: number | undefined;
  /** A JSON-serialized object containing the parameters of the ephemeral message to send */
  readonly ephemeralMessageParameters?: Types.EphemeralMessageParameters | undefined;
  /** Text of the message to be sent, 1-4096 characters after entities parsing */
  readonly text: string;
  /** Mode for parsing entities in the message text. See formatting options for more details. */
  readonly parseMode?: Types.ParseMode | undefined;
  /** A JSON-serialized list of special entities that appear in message text, which can be specified instead of parse_mode */
  readonly entities?: ReadonlyArray<Types.MessageEntity> | undefined;
  /** Link preview generation options for the message */
  readonly linkPreviewOptions?: Types.LinkPreviewOptions | undefined;
  /** Sends the message silently. Users will receive a notification with no sound. */
  readonly disableNotification?: boolean | undefined;
  /** Protects the contents of the sent message from forwarding and saving */
  readonly protectContent?: boolean | undefined;
  /** Pass True to allow up to 1000 messages per second, ignoring broadcasting limits for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot's balance. */
  readonly allowPaidBroadcast?: boolean | undefined;
  /** Unique identifier of the message effect to be added to the message; for private chats only */
  readonly messageEffectId?: string | undefined;
  /** A JSON-serialized object containing the parameters of the suggested post to send; for direct messages chats only. If the message is sent as a reply to another suggested post, then that suggested post is automatically declined. */
  readonly suggestedPostParameters?: Types.SuggestedPostParameters | undefined;
  /** Description of the message to reply to */
  readonly replyParameters?: Types.ReplyParameters | undefined;
  /** Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove a reply keyboard or to force a reply from the user. */
  readonly replyMarkup?: Types.InlineKeyboardMarkup | Types.ReplyKeyboardMarkup | Types.ReplyKeyboardRemove | Types.ForceReply | undefined;
}
const _SendMessageParamsPublicKeys = { business_connection_id: "businessConnectionId", chat_id: "chatId", message_thread_id: "messageThreadId", direct_messages_topic_id: "directMessagesTopicId", ephemeral_message_parameters: "ephemeralMessageParameters", parse_mode: "parseMode", link_preview_options: "linkPreviewOptions", disable_notification: "disableNotification", protect_content: "protectContent", allow_paid_broadcast: "allowPaidBroadcast", message_effect_id: "messageEffectId", suggested_post_parameters: "suggestedPostParameters", reply_parameters: "replyParameters", reply_markup: "replyMarkup" } as const;
const _SendMessageParamsWireKeys = invertKeys(_SendMessageParamsPublicKeys);
const _SendMessageParamsEncoded = Schema.Struct({
  business_connection_id: Schema.optional(Schema.String),
  chat_id: Schema.Union([Schema.Int, Schema.String]),
  message_thread_id: Schema.optional(Schema.Int),
  direct_messages_topic_id: Schema.optional(Schema.Int),
  ephemeral_message_parameters: Schema.optional(Schema.suspend((): Schema.Codec<Types.EphemeralMessageParameters, unknown> => Types.EphemeralMessageParameters)),
  text: Schema.String,
  parse_mode: Schema.optional(Schema.suspend((): Schema.Codec<Types.ParseMode, unknown> => Types.ParseMode)),
  entities: Schema.optional(Schema.Array(Schema.suspend((): Schema.Codec<Types.MessageEntity, unknown> => Types.MessageEntity))),
  link_preview_options: Schema.optional(Schema.suspend((): Schema.Codec<Types.LinkPreviewOptions, unknown> => Types.LinkPreviewOptions)),
  disable_notification: Schema.optional(Schema.Boolean),
  protect_content: Schema.optional(Schema.Boolean),
  allow_paid_broadcast: Schema.optional(Schema.Boolean),
  message_effect_id: Schema.optional(Schema.String),
  suggested_post_parameters: Schema.optional(Schema.suspend((): Schema.Codec<Types.SuggestedPostParameters, unknown> => Types.SuggestedPostParameters)),
  reply_parameters: Schema.optional(Schema.suspend((): Schema.Codec<Types.ReplyParameters, unknown> => Types.ReplyParameters)),
  reply_markup: Schema.optional(Schema.Union([Schema.suspend((): Schema.Codec<Types.InlineKeyboardMarkup, unknown> => Types.InlineKeyboardMarkup), Schema.suspend((): Schema.Codec<Types.ReplyKeyboardMarkup, unknown> => Types.ReplyKeyboardMarkup), Schema.suspend((): Schema.Codec<Types.ReplyKeyboardRemove, unknown> => Types.ReplyKeyboardRemove), Schema.suspend((): Schema.Codec<Types.ForceReply, unknown> => Types.ForceReply)])),
});
const _SendMessageParamsDecoded = Schema.declare<SendMessageParams>((input): input is SendMessageParams => Predicate.isObject(input));
export const SendMessageParams: Schema.Codec<SendMessageParams, Readonly<Record<string, unknown>>> = _SendMessageParamsEncoded.pipe(
  Schema.decodeTo(_SendMessageParamsDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_SendMessageParamsPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_SendMessageParamsWireKeys)),
  }),
);

export const sendMessage = callMethod({
  method: "sendMessage",
  params: SendMessageParams,
  result: Schema.suspend((): Schema.Codec<Types.Message, unknown> => Types.Message),
  retrySafe: false,
});

/** Use this method to send photos. On success, the sent Message is returned. */
export interface SendPhotoParams {
  /** Unique identifier of the business connection on behalf of which the message will be sent */
  readonly businessConnectionId?: string | undefined;
  /** Unique identifier for the target chat or username of the target bot, supergroup or channel in the format @username */
  readonly chatId: number | string;
  /** Unique identifier for the target message thread (topic) of a forum; for forum supergroups and private chats of bots with forum topic mode enabled only */
  readonly messageThreadId?: number | undefined;
  /** Identifier of the direct messages topic to which the message will be sent; required if the message is sent to a direct messages chat */
  readonly directMessagesTopicId?: number | undefined;
  /** A JSON-serialized object containing the parameters of the ephemeral message to send */
  readonly ephemeralMessageParameters?: Types.EphemeralMessageParameters | undefined;
  /** Photo to send. Pass a file_id as String to send a photo that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a photo from the Internet, or upload a new photo using multipart/form-data. The photo must be at most 10 MB in size. The photo's width and height must not exceed 10000 in total. Width and height ratio must be at most 20. More information on Sending Files » */
  readonly photo: Types.InputFile | string;
  /** Photo caption (may also be used when resending photos by file_id), 0-1024 characters after entities parsing */
  readonly caption?: string | undefined;
  /** Mode for parsing entities in the photo caption. See formatting options for more details. */
  readonly parseMode?: Types.ParseMode | undefined;
  /** A JSON-serialized list of special entities that appear in the caption, which can be specified instead of parse_mode */
  readonly captionEntities?: ReadonlyArray<Types.MessageEntity> | undefined;
  /** Pass True if the caption must be shown above the message media */
  readonly showCaptionAboveMedia?: boolean | undefined;
  /** Pass True if the photo needs to be covered with a spoiler animation */
  readonly hasSpoiler?: boolean | undefined;
  /** Sends the message silently. Users will receive a notification with no sound. */
  readonly disableNotification?: boolean | undefined;
  /** Protects the contents of the sent message from forwarding and saving */
  readonly protectContent?: boolean | undefined;
  /** Pass True to allow up to 1000 messages per second, ignoring broadcasting limits for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot's balance. */
  readonly allowPaidBroadcast?: boolean | undefined;
  /** Unique identifier of the message effect to be added to the message; for private chats only */
  readonly messageEffectId?: string | undefined;
  /** A JSON-serialized object containing the parameters of the suggested post to send; for direct messages chats only. If the message is sent as a reply to another suggested post, then that suggested post is automatically declined. */
  readonly suggestedPostParameters?: Types.SuggestedPostParameters | undefined;
  /** Description of the message to reply to */
  readonly replyParameters?: Types.ReplyParameters | undefined;
  /** Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove a reply keyboard or to force a reply from the user. */
  readonly replyMarkup?: Types.InlineKeyboardMarkup | Types.ReplyKeyboardMarkup | Types.ReplyKeyboardRemove | Types.ForceReply | undefined;
}
const _SendPhotoParamsPublicKeys = { business_connection_id: "businessConnectionId", chat_id: "chatId", message_thread_id: "messageThreadId", direct_messages_topic_id: "directMessagesTopicId", ephemeral_message_parameters: "ephemeralMessageParameters", parse_mode: "parseMode", caption_entities: "captionEntities", show_caption_above_media: "showCaptionAboveMedia", has_spoiler: "hasSpoiler", disable_notification: "disableNotification", protect_content: "protectContent", allow_paid_broadcast: "allowPaidBroadcast", message_effect_id: "messageEffectId", suggested_post_parameters: "suggestedPostParameters", reply_parameters: "replyParameters", reply_markup: "replyMarkup" } as const;
const _SendPhotoParamsWireKeys = invertKeys(_SendPhotoParamsPublicKeys);
const _SendPhotoParamsEncoded = Schema.Struct({
  business_connection_id: Schema.optional(Schema.String),
  chat_id: Schema.Union([Schema.Int, Schema.String]),
  message_thread_id: Schema.optional(Schema.Int),
  direct_messages_topic_id: Schema.optional(Schema.Int),
  ephemeral_message_parameters: Schema.optional(Schema.suspend((): Schema.Codec<Types.EphemeralMessageParameters, unknown> => Types.EphemeralMessageParameters)),
  photo: Schema.Union([Schema.suspend((): Schema.Codec<Types.InputFile, unknown> => Types.InputFile), Schema.String]),
  caption: Schema.optional(Schema.String),
  parse_mode: Schema.optional(Schema.suspend((): Schema.Codec<Types.ParseMode, unknown> => Types.ParseMode)),
  caption_entities: Schema.optional(Schema.Array(Schema.suspend((): Schema.Codec<Types.MessageEntity, unknown> => Types.MessageEntity))),
  show_caption_above_media: Schema.optional(Schema.Boolean),
  has_spoiler: Schema.optional(Schema.Boolean),
  disable_notification: Schema.optional(Schema.Boolean),
  protect_content: Schema.optional(Schema.Boolean),
  allow_paid_broadcast: Schema.optional(Schema.Boolean),
  message_effect_id: Schema.optional(Schema.String),
  suggested_post_parameters: Schema.optional(Schema.suspend((): Schema.Codec<Types.SuggestedPostParameters, unknown> => Types.SuggestedPostParameters)),
  reply_parameters: Schema.optional(Schema.suspend((): Schema.Codec<Types.ReplyParameters, unknown> => Types.ReplyParameters)),
  reply_markup: Schema.optional(Schema.Union([Schema.suspend((): Schema.Codec<Types.InlineKeyboardMarkup, unknown> => Types.InlineKeyboardMarkup), Schema.suspend((): Schema.Codec<Types.ReplyKeyboardMarkup, unknown> => Types.ReplyKeyboardMarkup), Schema.suspend((): Schema.Codec<Types.ReplyKeyboardRemove, unknown> => Types.ReplyKeyboardRemove), Schema.suspend((): Schema.Codec<Types.ForceReply, unknown> => Types.ForceReply)])),
});
const _SendPhotoParamsDecoded = Schema.declare<SendPhotoParams>((input): input is SendPhotoParams => Predicate.isObject(input));
export const SendPhotoParams: Schema.Codec<SendPhotoParams, Readonly<Record<string, unknown>>> = _SendPhotoParamsEncoded.pipe(
  Schema.decodeTo(_SendPhotoParamsDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_SendPhotoParamsPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_SendPhotoParamsWireKeys)),
  }),
);

export const sendPhoto = callMethod({
  method: "sendPhoto",
  params: SendPhotoParams,
  result: Schema.suspend((): Schema.Codec<Types.Message, unknown> => Types.Message),
  retrySafe: false,
});

/** Use this method to send static .WEBP, animated .TGS, or video .WEBM stickers. On success, the sent Message is returned. */
export interface SendStickerParams {
  /** Unique identifier of the business connection on behalf of which the message will be sent */
  readonly businessConnectionId?: string | undefined;
  /** Unique identifier for the target chat or username of the target bot, supergroup or channel in the format @username */
  readonly chatId: number | string;
  /** Unique identifier for the target message thread (topic) of a forum; for forum supergroups and private chats of bots with forum topic mode enabled only */
  readonly messageThreadId?: number | undefined;
  /** Identifier of the direct messages topic to which the message will be sent; required if the message is sent to a direct messages chat */
  readonly directMessagesTopicId?: number | undefined;
  /** A JSON-serialized object containing the parameters of the ephemeral message to send */
  readonly ephemeralMessageParameters?: Types.EphemeralMessageParameters | undefined;
  /** Sticker to send. Pass a file_id as String to send a file that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a .WEBP sticker from the Internet, or upload a new .WEBP, .TGS, or .WEBM sticker using multipart/form-data. More information on Sending Files ». Video and animated stickers can't be sent via an HTTP URL. */
  readonly sticker: Types.InputFile | string;
  /** Emoji associated with the sticker; only for just uploaded stickers */
  readonly emoji?: string | undefined;
  /** Sends the message silently. Users will receive a notification with no sound. */
  readonly disableNotification?: boolean | undefined;
  /** Protects the contents of the sent message from forwarding and saving */
  readonly protectContent?: boolean | undefined;
  /** Pass True to allow up to 1000 messages per second, ignoring broadcasting limits for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot's balance. */
  readonly allowPaidBroadcast?: boolean | undefined;
  /** Unique identifier of the message effect to be added to the message; for private chats only */
  readonly messageEffectId?: string | undefined;
  /** A JSON-serialized object containing the parameters of the suggested post to send; for direct messages chats only. If the message is sent as a reply to another suggested post, then that suggested post is automatically declined. */
  readonly suggestedPostParameters?: Types.SuggestedPostParameters | undefined;
  /** Description of the message to reply to */
  readonly replyParameters?: Types.ReplyParameters | undefined;
  /** Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove a reply keyboard or to force a reply from the user. */
  readonly replyMarkup?: Types.InlineKeyboardMarkup | Types.ReplyKeyboardMarkup | Types.ReplyKeyboardRemove | Types.ForceReply | undefined;
}
const _SendStickerParamsPublicKeys = { business_connection_id: "businessConnectionId", chat_id: "chatId", message_thread_id: "messageThreadId", direct_messages_topic_id: "directMessagesTopicId", ephemeral_message_parameters: "ephemeralMessageParameters", disable_notification: "disableNotification", protect_content: "protectContent", allow_paid_broadcast: "allowPaidBroadcast", message_effect_id: "messageEffectId", suggested_post_parameters: "suggestedPostParameters", reply_parameters: "replyParameters", reply_markup: "replyMarkup" } as const;
const _SendStickerParamsWireKeys = invertKeys(_SendStickerParamsPublicKeys);
const _SendStickerParamsEncoded = Schema.Struct({
  business_connection_id: Schema.optional(Schema.String),
  chat_id: Schema.Union([Schema.Int, Schema.String]),
  message_thread_id: Schema.optional(Schema.Int),
  direct_messages_topic_id: Schema.optional(Schema.Int),
  ephemeral_message_parameters: Schema.optional(Schema.suspend((): Schema.Codec<Types.EphemeralMessageParameters, unknown> => Types.EphemeralMessageParameters)),
  sticker: Schema.Union([Schema.suspend((): Schema.Codec<Types.InputFile, unknown> => Types.InputFile), Schema.String]),
  emoji: Schema.optional(Schema.String),
  disable_notification: Schema.optional(Schema.Boolean),
  protect_content: Schema.optional(Schema.Boolean),
  allow_paid_broadcast: Schema.optional(Schema.Boolean),
  message_effect_id: Schema.optional(Schema.String),
  suggested_post_parameters: Schema.optional(Schema.suspend((): Schema.Codec<Types.SuggestedPostParameters, unknown> => Types.SuggestedPostParameters)),
  reply_parameters: Schema.optional(Schema.suspend((): Schema.Codec<Types.ReplyParameters, unknown> => Types.ReplyParameters)),
  reply_markup: Schema.optional(Schema.Union([Schema.suspend((): Schema.Codec<Types.InlineKeyboardMarkup, unknown> => Types.InlineKeyboardMarkup), Schema.suspend((): Schema.Codec<Types.ReplyKeyboardMarkup, unknown> => Types.ReplyKeyboardMarkup), Schema.suspend((): Schema.Codec<Types.ReplyKeyboardRemove, unknown> => Types.ReplyKeyboardRemove), Schema.suspend((): Schema.Codec<Types.ForceReply, unknown> => Types.ForceReply)])),
});
const _SendStickerParamsDecoded = Schema.declare<SendStickerParams>((input): input is SendStickerParams => Predicate.isObject(input));
export const SendStickerParams: Schema.Codec<SendStickerParams, Readonly<Record<string, unknown>>> = _SendStickerParamsEncoded.pipe(
  Schema.decodeTo(_SendStickerParamsDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_SendStickerParamsPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_SendStickerParamsWireKeys)),
  }),
);

export const sendSticker = callMethod({
  method: "sendSticker",
  params: SendStickerParams,
  result: Schema.suspend((): Schema.Codec<Types.Message, unknown> => Types.Message),
  retrySafe: false,
});

/** Use this method to send information about a venue. On success, the sent Message is returned. */
export interface SendVenueParams {
  /** Unique identifier of the business connection on behalf of which the message will be sent */
  readonly businessConnectionId?: string | undefined;
  /** Unique identifier for the target chat or username of the target bot, supergroup or channel in the format @username */
  readonly chatId: number | string;
  /** Unique identifier for the target message thread (topic) of a forum; for forum supergroups and private chats of bots with forum topic mode enabled only */
  readonly messageThreadId?: number | undefined;
  /** Identifier of the direct messages topic to which the message will be sent; required if the message is sent to a direct messages chat */
  readonly directMessagesTopicId?: number | undefined;
  /** A JSON-serialized object containing the parameters of the ephemeral message to send */
  readonly ephemeralMessageParameters?: Types.EphemeralMessageParameters | undefined;
  /** Latitude of the venue */
  readonly latitude: number;
  /** Longitude of the venue */
  readonly longitude: number;
  /** Name of the venue */
  readonly title: string;
  /** Address of the venue */
  readonly address: string;
  /** Foursquare identifier of the venue */
  readonly foursquareId?: string | undefined;
  /** Foursquare type of the venue, if known. (For example, “arts_entertainment/default”, “arts_entertainment/aquarium” or “food/icecream”.) */
  readonly foursquareType?: string | undefined;
  /** Google Places identifier of the venue */
  readonly googlePlaceId?: string | undefined;
  /** Google Places type of the venue. (See supported types.) */
  readonly googlePlaceType?: string | undefined;
  /** Sends the message silently. Users will receive a notification with no sound. */
  readonly disableNotification?: boolean | undefined;
  /** Protects the contents of the sent message from forwarding and saving */
  readonly protectContent?: boolean | undefined;
  /** Pass True to allow up to 1000 messages per second, ignoring broadcasting limits for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot's balance. */
  readonly allowPaidBroadcast?: boolean | undefined;
  /** Unique identifier of the message effect to be added to the message; for private chats only */
  readonly messageEffectId?: string | undefined;
  /** A JSON-serialized object containing the parameters of the suggested post to send; for direct messages chats only. If the message is sent as a reply to another suggested post, then that suggested post is automatically declined. */
  readonly suggestedPostParameters?: Types.SuggestedPostParameters | undefined;
  /** Description of the message to reply to */
  readonly replyParameters?: Types.ReplyParameters | undefined;
  /** Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove a reply keyboard or to force a reply from the user. */
  readonly replyMarkup?: Types.InlineKeyboardMarkup | Types.ReplyKeyboardMarkup | Types.ReplyKeyboardRemove | Types.ForceReply | undefined;
}
const _SendVenueParamsPublicKeys = { business_connection_id: "businessConnectionId", chat_id: "chatId", message_thread_id: "messageThreadId", direct_messages_topic_id: "directMessagesTopicId", ephemeral_message_parameters: "ephemeralMessageParameters", foursquare_id: "foursquareId", foursquare_type: "foursquareType", google_place_id: "googlePlaceId", google_place_type: "googlePlaceType", disable_notification: "disableNotification", protect_content: "protectContent", allow_paid_broadcast: "allowPaidBroadcast", message_effect_id: "messageEffectId", suggested_post_parameters: "suggestedPostParameters", reply_parameters: "replyParameters", reply_markup: "replyMarkup" } as const;
const _SendVenueParamsWireKeys = invertKeys(_SendVenueParamsPublicKeys);
const _SendVenueParamsEncoded = Schema.Struct({
  business_connection_id: Schema.optional(Schema.String),
  chat_id: Schema.Union([Schema.Int, Schema.String]),
  message_thread_id: Schema.optional(Schema.Int),
  direct_messages_topic_id: Schema.optional(Schema.Int),
  ephemeral_message_parameters: Schema.optional(Schema.suspend((): Schema.Codec<Types.EphemeralMessageParameters, unknown> => Types.EphemeralMessageParameters)),
  latitude: Schema.Number,
  longitude: Schema.Number,
  title: Schema.String,
  address: Schema.String,
  foursquare_id: Schema.optional(Schema.String),
  foursquare_type: Schema.optional(Schema.String),
  google_place_id: Schema.optional(Schema.String),
  google_place_type: Schema.optional(Schema.String),
  disable_notification: Schema.optional(Schema.Boolean),
  protect_content: Schema.optional(Schema.Boolean),
  allow_paid_broadcast: Schema.optional(Schema.Boolean),
  message_effect_id: Schema.optional(Schema.String),
  suggested_post_parameters: Schema.optional(Schema.suspend((): Schema.Codec<Types.SuggestedPostParameters, unknown> => Types.SuggestedPostParameters)),
  reply_parameters: Schema.optional(Schema.suspend((): Schema.Codec<Types.ReplyParameters, unknown> => Types.ReplyParameters)),
  reply_markup: Schema.optional(Schema.Union([Schema.suspend((): Schema.Codec<Types.InlineKeyboardMarkup, unknown> => Types.InlineKeyboardMarkup), Schema.suspend((): Schema.Codec<Types.ReplyKeyboardMarkup, unknown> => Types.ReplyKeyboardMarkup), Schema.suspend((): Schema.Codec<Types.ReplyKeyboardRemove, unknown> => Types.ReplyKeyboardRemove), Schema.suspend((): Schema.Codec<Types.ForceReply, unknown> => Types.ForceReply)])),
});
const _SendVenueParamsDecoded = Schema.declare<SendVenueParams>((input): input is SendVenueParams => Predicate.isObject(input));
export const SendVenueParams: Schema.Codec<SendVenueParams, Readonly<Record<string, unknown>>> = _SendVenueParamsEncoded.pipe(
  Schema.decodeTo(_SendVenueParamsDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_SendVenueParamsPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_SendVenueParamsWireKeys)),
  }),
);

export const sendVenue = callMethod({
  method: "sendVenue",
  params: SendVenueParams,
  result: Schema.suspend((): Schema.Codec<Types.Message, unknown> => Types.Message),
  retrySafe: false,
});

/** Use this method to send video files, Telegram clients support MPEG4 videos (other formats may be sent as Document). On success, the sent Message is returned. Bots can currently send video files of up to 50 MB in size, this limit may be changed in the future. */
export interface SendVideoParams {
  /** Unique identifier of the business connection on behalf of which the message will be sent */
  readonly businessConnectionId?: string | undefined;
  /** Unique identifier for the target chat or username of the target bot, supergroup or channel in the format @username */
  readonly chatId: number | string;
  /** Unique identifier for the target message thread (topic) of a forum; for forum supergroups and private chats of bots with forum topic mode enabled only */
  readonly messageThreadId?: number | undefined;
  /** Identifier of the direct messages topic to which the message will be sent; required if the message is sent to a direct messages chat */
  readonly directMessagesTopicId?: number | undefined;
  /** A JSON-serialized object containing the parameters of the ephemeral message to send */
  readonly ephemeralMessageParameters?: Types.EphemeralMessageParameters | undefined;
  /** Video to send. Pass a file_id as String to send a video that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a video from the Internet, or upload a new video using multipart/form-data. More information on Sending Files » */
  readonly video: Types.InputFile | string;
  /** Duration of sent video in seconds */
  readonly duration?: number | undefined;
  /** Video width */
  readonly width?: number | undefined;
  /** Video height */
  readonly height?: number | undefined;
  /** Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails can't be reused and can be only uploaded as a new file, so you can pass “attach://<file_attach_name>” if the thumbnail was uploaded using multipart/form-data under <file_attach_name>. More information on Sending Files » */
  readonly thumbnail?: Types.InputFile | string | undefined;
  /** Cover for the video in the message. Pass a file_id to send a file that exists on the Telegram servers (recommended), pass an HTTP URL for Telegram to get a file from the Internet, or pass “attach://<file_attach_name>” to upload a new one using multipart/form-data under <file_attach_name> name. More information on Sending Files » */
  readonly cover?: Types.InputFile | string | undefined;
  /** Start timestamp for the video in the message */
  readonly startTimestamp?: number | undefined;
  /** Video caption (may also be used when resending videos by file_id), 0-1024 characters after entities parsing */
  readonly caption?: string | undefined;
  /** Mode for parsing entities in the video caption. See formatting options for more details. */
  readonly parseMode?: Types.ParseMode | undefined;
  /** A JSON-serialized list of special entities that appear in the caption, which can be specified instead of parse_mode */
  readonly captionEntities?: ReadonlyArray<Types.MessageEntity> | undefined;
  /** Pass True if the caption must be shown above the message media */
  readonly showCaptionAboveMedia?: boolean | undefined;
  /** Pass True if the video needs to be covered with a spoiler animation */
  readonly hasSpoiler?: boolean | undefined;
  /** Pass True if the uploaded video is suitable for streaming */
  readonly supportsStreaming?: boolean | undefined;
  /** Sends the message silently. Users will receive a notification with no sound. */
  readonly disableNotification?: boolean | undefined;
  /** Protects the contents of the sent message from forwarding and saving */
  readonly protectContent?: boolean | undefined;
  /** Pass True to allow up to 1000 messages per second, ignoring broadcasting limits for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot's balance. */
  readonly allowPaidBroadcast?: boolean | undefined;
  /** Unique identifier of the message effect to be added to the message; for private chats only */
  readonly messageEffectId?: string | undefined;
  /** A JSON-serialized object containing the parameters of the suggested post to send; for direct messages chats only. If the message is sent as a reply to another suggested post, then that suggested post is automatically declined. */
  readonly suggestedPostParameters?: Types.SuggestedPostParameters | undefined;
  /** Description of the message to reply to */
  readonly replyParameters?: Types.ReplyParameters | undefined;
  /** Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove a reply keyboard or to force a reply from the user. */
  readonly replyMarkup?: Types.InlineKeyboardMarkup | Types.ReplyKeyboardMarkup | Types.ReplyKeyboardRemove | Types.ForceReply | undefined;
}
const _SendVideoParamsPublicKeys = { business_connection_id: "businessConnectionId", chat_id: "chatId", message_thread_id: "messageThreadId", direct_messages_topic_id: "directMessagesTopicId", ephemeral_message_parameters: "ephemeralMessageParameters", start_timestamp: "startTimestamp", parse_mode: "parseMode", caption_entities: "captionEntities", show_caption_above_media: "showCaptionAboveMedia", has_spoiler: "hasSpoiler", supports_streaming: "supportsStreaming", disable_notification: "disableNotification", protect_content: "protectContent", allow_paid_broadcast: "allowPaidBroadcast", message_effect_id: "messageEffectId", suggested_post_parameters: "suggestedPostParameters", reply_parameters: "replyParameters", reply_markup: "replyMarkup" } as const;
const _SendVideoParamsWireKeys = invertKeys(_SendVideoParamsPublicKeys);
const _SendVideoParamsEncoded = Schema.Struct({
  business_connection_id: Schema.optional(Schema.String),
  chat_id: Schema.Union([Schema.Int, Schema.String]),
  message_thread_id: Schema.optional(Schema.Int),
  direct_messages_topic_id: Schema.optional(Schema.Int),
  ephemeral_message_parameters: Schema.optional(Schema.suspend((): Schema.Codec<Types.EphemeralMessageParameters, unknown> => Types.EphemeralMessageParameters)),
  video: Schema.Union([Schema.suspend((): Schema.Codec<Types.InputFile, unknown> => Types.InputFile), Schema.String]),
  duration: Schema.optional(Schema.Int),
  width: Schema.optional(Schema.Int),
  height: Schema.optional(Schema.Int),
  thumbnail: Schema.optional(Schema.Union([Schema.suspend((): Schema.Codec<Types.InputFile, unknown> => Types.InputFile), Schema.String])),
  cover: Schema.optional(Schema.Union([Schema.suspend((): Schema.Codec<Types.InputFile, unknown> => Types.InputFile), Schema.String])),
  start_timestamp: Schema.optional(Schema.Int),
  caption: Schema.optional(Schema.String),
  parse_mode: Schema.optional(Schema.suspend((): Schema.Codec<Types.ParseMode, unknown> => Types.ParseMode)),
  caption_entities: Schema.optional(Schema.Array(Schema.suspend((): Schema.Codec<Types.MessageEntity, unknown> => Types.MessageEntity))),
  show_caption_above_media: Schema.optional(Schema.Boolean),
  has_spoiler: Schema.optional(Schema.Boolean),
  supports_streaming: Schema.optional(Schema.Boolean),
  disable_notification: Schema.optional(Schema.Boolean),
  protect_content: Schema.optional(Schema.Boolean),
  allow_paid_broadcast: Schema.optional(Schema.Boolean),
  message_effect_id: Schema.optional(Schema.String),
  suggested_post_parameters: Schema.optional(Schema.suspend((): Schema.Codec<Types.SuggestedPostParameters, unknown> => Types.SuggestedPostParameters)),
  reply_parameters: Schema.optional(Schema.suspend((): Schema.Codec<Types.ReplyParameters, unknown> => Types.ReplyParameters)),
  reply_markup: Schema.optional(Schema.Union([Schema.suspend((): Schema.Codec<Types.InlineKeyboardMarkup, unknown> => Types.InlineKeyboardMarkup), Schema.suspend((): Schema.Codec<Types.ReplyKeyboardMarkup, unknown> => Types.ReplyKeyboardMarkup), Schema.suspend((): Schema.Codec<Types.ReplyKeyboardRemove, unknown> => Types.ReplyKeyboardRemove), Schema.suspend((): Schema.Codec<Types.ForceReply, unknown> => Types.ForceReply)])),
});
const _SendVideoParamsDecoded = Schema.declare<SendVideoParams>((input): input is SendVideoParams => Predicate.isObject(input));
export const SendVideoParams: Schema.Codec<SendVideoParams, Readonly<Record<string, unknown>>> = _SendVideoParamsEncoded.pipe(
  Schema.decodeTo(_SendVideoParamsDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_SendVideoParamsPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_SendVideoParamsWireKeys)),
  }),
);

export const sendVideo = callMethod({
  method: "sendVideo",
  params: SendVideoParams,
  result: Schema.suspend((): Schema.Codec<Types.Message, unknown> => Types.Message),
  retrySafe: false,
});

/** Use this method to send a rounded square MPEG4 video of up to 1 minute long. On success, the sent Message is returned. */
export interface SendVideoNoteParams {
  /** Unique identifier of the business connection on behalf of which the message will be sent */
  readonly businessConnectionId?: string | undefined;
  /** Unique identifier for the target chat or username of the target bot, supergroup or channel in the format @username */
  readonly chatId: number | string;
  /** Unique identifier for the target message thread (topic) of a forum; for forum supergroups and private chats of bots with forum topic mode enabled only */
  readonly messageThreadId?: number | undefined;
  /** Identifier of the direct messages topic to which the message will be sent; required if the message is sent to a direct messages chat */
  readonly directMessagesTopicId?: number | undefined;
  /** A JSON-serialized object containing the parameters of the ephemeral message to send */
  readonly ephemeralMessageParameters?: Types.EphemeralMessageParameters | undefined;
  /** Video note to send. Pass a file_id as String to send a video note that exists on the Telegram servers (recommended) or upload a new video using multipart/form-data. More information on Sending Files ». Sending video notes by a URL is currently unsupported. */
  readonly videoNote: Types.InputFile | string;
  /** Duration of sent video in seconds */
  readonly duration?: number | undefined;
  /** Video width and height, i.e. diameter of the video message */
  readonly length?: number | undefined;
  /** Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails can't be reused and can be only uploaded as a new file, so you can pass “attach://<file_attach_name>” if the thumbnail was uploaded using multipart/form-data under <file_attach_name>. More information on Sending Files » */
  readonly thumbnail?: Types.InputFile | string | undefined;
  /** Sends the message silently. Users will receive a notification with no sound. */
  readonly disableNotification?: boolean | undefined;
  /** Protects the contents of the sent message from forwarding and saving */
  readonly protectContent?: boolean | undefined;
  /** Pass True to allow up to 1000 messages per second, ignoring broadcasting limits for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot's balance. */
  readonly allowPaidBroadcast?: boolean | undefined;
  /** Unique identifier of the message effect to be added to the message; for private chats only */
  readonly messageEffectId?: string | undefined;
  /** A JSON-serialized object containing the parameters of the suggested post to send; for direct messages chats only. If the message is sent as a reply to another suggested post, then that suggested post is automatically declined. */
  readonly suggestedPostParameters?: Types.SuggestedPostParameters | undefined;
  /** Description of the message to reply to */
  readonly replyParameters?: Types.ReplyParameters | undefined;
  /** Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove a reply keyboard or to force a reply from the user. */
  readonly replyMarkup?: Types.InlineKeyboardMarkup | Types.ReplyKeyboardMarkup | Types.ReplyKeyboardRemove | Types.ForceReply | undefined;
}
const _SendVideoNoteParamsPublicKeys = { business_connection_id: "businessConnectionId", chat_id: "chatId", message_thread_id: "messageThreadId", direct_messages_topic_id: "directMessagesTopicId", ephemeral_message_parameters: "ephemeralMessageParameters", video_note: "videoNote", disable_notification: "disableNotification", protect_content: "protectContent", allow_paid_broadcast: "allowPaidBroadcast", message_effect_id: "messageEffectId", suggested_post_parameters: "suggestedPostParameters", reply_parameters: "replyParameters", reply_markup: "replyMarkup" } as const;
const _SendVideoNoteParamsWireKeys = invertKeys(_SendVideoNoteParamsPublicKeys);
const _SendVideoNoteParamsEncoded = Schema.Struct({
  business_connection_id: Schema.optional(Schema.String),
  chat_id: Schema.Union([Schema.Int, Schema.String]),
  message_thread_id: Schema.optional(Schema.Int),
  direct_messages_topic_id: Schema.optional(Schema.Int),
  ephemeral_message_parameters: Schema.optional(Schema.suspend((): Schema.Codec<Types.EphemeralMessageParameters, unknown> => Types.EphemeralMessageParameters)),
  video_note: Schema.Union([Schema.suspend((): Schema.Codec<Types.InputFile, unknown> => Types.InputFile), Schema.String]),
  duration: Schema.optional(Schema.Int),
  length: Schema.optional(Schema.Int),
  thumbnail: Schema.optional(Schema.Union([Schema.suspend((): Schema.Codec<Types.InputFile, unknown> => Types.InputFile), Schema.String])),
  disable_notification: Schema.optional(Schema.Boolean),
  protect_content: Schema.optional(Schema.Boolean),
  allow_paid_broadcast: Schema.optional(Schema.Boolean),
  message_effect_id: Schema.optional(Schema.String),
  suggested_post_parameters: Schema.optional(Schema.suspend((): Schema.Codec<Types.SuggestedPostParameters, unknown> => Types.SuggestedPostParameters)),
  reply_parameters: Schema.optional(Schema.suspend((): Schema.Codec<Types.ReplyParameters, unknown> => Types.ReplyParameters)),
  reply_markup: Schema.optional(Schema.Union([Schema.suspend((): Schema.Codec<Types.InlineKeyboardMarkup, unknown> => Types.InlineKeyboardMarkup), Schema.suspend((): Schema.Codec<Types.ReplyKeyboardMarkup, unknown> => Types.ReplyKeyboardMarkup), Schema.suspend((): Schema.Codec<Types.ReplyKeyboardRemove, unknown> => Types.ReplyKeyboardRemove), Schema.suspend((): Schema.Codec<Types.ForceReply, unknown> => Types.ForceReply)])),
});
const _SendVideoNoteParamsDecoded = Schema.declare<SendVideoNoteParams>((input): input is SendVideoNoteParams => Predicate.isObject(input));
export const SendVideoNoteParams: Schema.Codec<SendVideoNoteParams, Readonly<Record<string, unknown>>> = _SendVideoNoteParamsEncoded.pipe(
  Schema.decodeTo(_SendVideoNoteParamsDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_SendVideoNoteParamsPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_SendVideoNoteParamsWireKeys)),
  }),
);

export const sendVideoNote = callMethod({
  method: "sendVideoNote",
  params: SendVideoNoteParams,
  result: Schema.suspend((): Schema.Codec<Types.Message, unknown> => Types.Message),
  retrySafe: false,
});

/** Use this method to send audio files, if you want Telegram clients to display the file as a playable voice message. For this to work, your audio must be in an .OGG file encoded with OPUS, or in .MP3 format, or in .M4A format (other formats may be sent as Audio or Document). On success, the sent Message is returned. Bots can currently send voice messages of up to 50 MB in size, this limit may be changed in the future. */
export interface SendVoiceParams {
  /** Unique identifier of the business connection on behalf of which the message will be sent */
  readonly businessConnectionId?: string | undefined;
  /** Unique identifier for the target chat or username of the target bot, supergroup or channel in the format @username */
  readonly chatId: number | string;
  /** Unique identifier for the target message thread (topic) of a forum; for forum supergroups and private chats of bots with forum topic mode enabled only */
  readonly messageThreadId?: number | undefined;
  /** Identifier of the direct messages topic to which the message will be sent; required if the message is sent to a direct messages chat */
  readonly directMessagesTopicId?: number | undefined;
  /** A JSON-serialized object containing the parameters of the ephemeral message to send */
  readonly ephemeralMessageParameters?: Types.EphemeralMessageParameters | undefined;
  /** Audio file to send. Pass a file_id as String to send a file that exists on the Telegram servers (recommended), pass an HTTP URL as a String for Telegram to get a file from the Internet, or upload a new one using multipart/form-data. More information on Sending Files » */
  readonly voice: Types.InputFile | string;
  /** Voice message caption, 0-1024 characters after entities parsing */
  readonly caption?: string | undefined;
  /** Mode for parsing entities in the voice message caption. See formatting options for more details. */
  readonly parseMode?: Types.ParseMode | undefined;
  /** A JSON-serialized list of special entities that appear in the caption, which can be specified instead of parse_mode */
  readonly captionEntities?: ReadonlyArray<Types.MessageEntity> | undefined;
  /** Duration of the voice message in seconds */
  readonly duration?: number | undefined;
  /** Sends the message silently. Users will receive a notification with no sound. */
  readonly disableNotification?: boolean | undefined;
  /** Protects the contents of the sent message from forwarding and saving */
  readonly protectContent?: boolean | undefined;
  /** Pass True to allow up to 1000 messages per second, ignoring broadcasting limits for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot's balance. */
  readonly allowPaidBroadcast?: boolean | undefined;
  /** Unique identifier of the message effect to be added to the message; for private chats only */
  readonly messageEffectId?: string | undefined;
  /** A JSON-serialized object containing the parameters of the suggested post to send; for direct messages chats only. If the message is sent as a reply to another suggested post, then that suggested post is automatically declined. */
  readonly suggestedPostParameters?: Types.SuggestedPostParameters | undefined;
  /** Description of the message to reply to */
  readonly replyParameters?: Types.ReplyParameters | undefined;
  /** Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove a reply keyboard or to force a reply from the user. */
  readonly replyMarkup?: Types.InlineKeyboardMarkup | Types.ReplyKeyboardMarkup | Types.ReplyKeyboardRemove | Types.ForceReply | undefined;
}
const _SendVoiceParamsPublicKeys = { business_connection_id: "businessConnectionId", chat_id: "chatId", message_thread_id: "messageThreadId", direct_messages_topic_id: "directMessagesTopicId", ephemeral_message_parameters: "ephemeralMessageParameters", parse_mode: "parseMode", caption_entities: "captionEntities", disable_notification: "disableNotification", protect_content: "protectContent", allow_paid_broadcast: "allowPaidBroadcast", message_effect_id: "messageEffectId", suggested_post_parameters: "suggestedPostParameters", reply_parameters: "replyParameters", reply_markup: "replyMarkup" } as const;
const _SendVoiceParamsWireKeys = invertKeys(_SendVoiceParamsPublicKeys);
const _SendVoiceParamsEncoded = Schema.Struct({
  business_connection_id: Schema.optional(Schema.String),
  chat_id: Schema.Union([Schema.Int, Schema.String]),
  message_thread_id: Schema.optional(Schema.Int),
  direct_messages_topic_id: Schema.optional(Schema.Int),
  ephemeral_message_parameters: Schema.optional(Schema.suspend((): Schema.Codec<Types.EphemeralMessageParameters, unknown> => Types.EphemeralMessageParameters)),
  voice: Schema.Union([Schema.suspend((): Schema.Codec<Types.InputFile, unknown> => Types.InputFile), Schema.String]),
  caption: Schema.optional(Schema.String),
  parse_mode: Schema.optional(Schema.suspend((): Schema.Codec<Types.ParseMode, unknown> => Types.ParseMode)),
  caption_entities: Schema.optional(Schema.Array(Schema.suspend((): Schema.Codec<Types.MessageEntity, unknown> => Types.MessageEntity))),
  duration: Schema.optional(Schema.Int),
  disable_notification: Schema.optional(Schema.Boolean),
  protect_content: Schema.optional(Schema.Boolean),
  allow_paid_broadcast: Schema.optional(Schema.Boolean),
  message_effect_id: Schema.optional(Schema.String),
  suggested_post_parameters: Schema.optional(Schema.suspend((): Schema.Codec<Types.SuggestedPostParameters, unknown> => Types.SuggestedPostParameters)),
  reply_parameters: Schema.optional(Schema.suspend((): Schema.Codec<Types.ReplyParameters, unknown> => Types.ReplyParameters)),
  reply_markup: Schema.optional(Schema.Union([Schema.suspend((): Schema.Codec<Types.InlineKeyboardMarkup, unknown> => Types.InlineKeyboardMarkup), Schema.suspend((): Schema.Codec<Types.ReplyKeyboardMarkup, unknown> => Types.ReplyKeyboardMarkup), Schema.suspend((): Schema.Codec<Types.ReplyKeyboardRemove, unknown> => Types.ReplyKeyboardRemove), Schema.suspend((): Schema.Codec<Types.ForceReply, unknown> => Types.ForceReply)])),
});
const _SendVoiceParamsDecoded = Schema.declare<SendVoiceParams>((input): input is SendVoiceParams => Predicate.isObject(input));
export const SendVoiceParams: Schema.Codec<SendVoiceParams, Readonly<Record<string, unknown>>> = _SendVoiceParamsEncoded.pipe(
  Schema.decodeTo(_SendVoiceParamsDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_SendVoiceParamsPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_SendVoiceParamsWireKeys)),
  }),
);

export const sendVoice = callMethod({
  method: "sendVoice",
  params: SendVoiceParams,
  result: Schema.suspend((): Schema.Codec<Types.Message, unknown> => Types.Message),
  retrySafe: false,
});

/** Use this method to change the list of the bot's commands. See this manual for more details about bot commands. Returns True on success. */
export interface SetMyCommandsParams {
  /** A JSON-serialized list of bot commands to be set as the list of the bot's commands. At most 100 commands can be specified. */
  readonly commands: ReadonlyArray<Types.BotCommand>;
  /** A JSON-serialized object, describing scope of users for which the commands are relevant. Defaults to BotCommandScopeDefault. */
  readonly scope?: Types.BotCommandScope | undefined;
  /** A two-letter ISO 639-1 language code. If empty, commands will be applied to all users from the given scope, for whose language there are no dedicated commands. */
  readonly languageCode?: string | undefined;
}
const _SetMyCommandsParamsPublicKeys = { language_code: "languageCode" } as const;
const _SetMyCommandsParamsWireKeys = invertKeys(_SetMyCommandsParamsPublicKeys);
const _SetMyCommandsParamsEncoded = Schema.Struct({
  commands: Schema.Array(Schema.suspend((): Schema.Codec<Types.BotCommand, unknown> => Types.BotCommand)),
  scope: Schema.optional(Schema.suspend((): Schema.Codec<Types.BotCommandScope, unknown> => Types.BotCommandScope)),
  language_code: Schema.optional(Schema.String),
});
const _SetMyCommandsParamsDecoded = Schema.declare<SetMyCommandsParams>((input): input is SetMyCommandsParams => Predicate.isObject(input));
export const SetMyCommandsParams: Schema.Codec<SetMyCommandsParams, Readonly<Record<string, unknown>>> = _SetMyCommandsParamsEncoded.pipe(
  Schema.decodeTo(_SetMyCommandsParamsDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_SetMyCommandsParamsPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_SetMyCommandsParamsWireKeys)),
  }),
);

export const setMyCommands = callMethod({
  method: "setMyCommands",
  params: SetMyCommandsParams,
  result: Schema.Literal(true),
  retrySafe: true,
});

/** Use this method to change the default administrator rights requested by the bot when it's added as an administrator to groups or channels. These rights will be suggested to users, but they are free to modify the list before adding the bot. Returns True on success. */
export interface SetMyDefaultAdministratorRightsParams {
  /** A JSON-serialized object describing new default administrator rights. If not specified, the default administrator rights will be cleared. */
  readonly rights?: Types.ChatAdministratorRights | undefined;
  /** Pass True to change the default administrator rights of the bot in channels. Otherwise, the default administrator rights of the bot for groups and supergroups will be changed. */
  readonly forChannels?: boolean | undefined;
}
const _SetMyDefaultAdministratorRightsParamsPublicKeys = { for_channels: "forChannels" } as const;
const _SetMyDefaultAdministratorRightsParamsWireKeys = invertKeys(_SetMyDefaultAdministratorRightsParamsPublicKeys);
const _SetMyDefaultAdministratorRightsParamsEncoded = Schema.Struct({
  rights: Schema.optional(Schema.suspend((): Schema.Codec<Types.ChatAdministratorRights, unknown> => Types.ChatAdministratorRights)),
  for_channels: Schema.optional(Schema.Boolean),
});
const _SetMyDefaultAdministratorRightsParamsDecoded = Schema.declare<SetMyDefaultAdministratorRightsParams>((input): input is SetMyDefaultAdministratorRightsParams => Predicate.isObject(input));
export const SetMyDefaultAdministratorRightsParams: Schema.Codec<SetMyDefaultAdministratorRightsParams, Readonly<Record<string, unknown>>> = _SetMyDefaultAdministratorRightsParamsEncoded.pipe(
  Schema.decodeTo(_SetMyDefaultAdministratorRightsParamsDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_SetMyDefaultAdministratorRightsParamsPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_SetMyDefaultAdministratorRightsParamsWireKeys)),
  }),
);

export const setMyDefaultAdministratorRights = callMethod({
  method: "setMyDefaultAdministratorRights",
  params: SetMyDefaultAdministratorRightsParams,
  result: Schema.Literal(true),
  retrySafe: true,
});

/** Use this method to change the bot's description, which is shown in the chat with the bot if the chat is empty. Returns True on success. */
export interface SetMyDescriptionParams {
  /** New bot description; 0-512 characters. Pass an empty string to remove the dedicated description for the given language. */
  readonly description?: string | undefined;
  /** A two-letter ISO 639-1 language code. If empty, the description will be applied to all users for whose language there is no dedicated description. */
  readonly languageCode?: string | undefined;
}
const _SetMyDescriptionParamsPublicKeys = { language_code: "languageCode" } as const;
const _SetMyDescriptionParamsWireKeys = invertKeys(_SetMyDescriptionParamsPublicKeys);
const _SetMyDescriptionParamsEncoded = Schema.Struct({
  description: Schema.optional(Schema.String),
  language_code: Schema.optional(Schema.String),
});
const _SetMyDescriptionParamsDecoded = Schema.declare<SetMyDescriptionParams>((input): input is SetMyDescriptionParams => Predicate.isObject(input));
export const SetMyDescriptionParams: Schema.Codec<SetMyDescriptionParams, Readonly<Record<string, unknown>>> = _SetMyDescriptionParamsEncoded.pipe(
  Schema.decodeTo(_SetMyDescriptionParamsDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_SetMyDescriptionParamsPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_SetMyDescriptionParamsWireKeys)),
  }),
);

export const setMyDescription = callMethod({
  method: "setMyDescription",
  params: SetMyDescriptionParams,
  result: Schema.Literal(true),
  retrySafe: true,
});

/** Use this method to change the bot's name. Returns True on success. */
export interface SetMyNameParams {
  /** New bot name; 0-64 characters. Pass an empty string to remove the dedicated name for the given language. */
  readonly name?: string | undefined;
  /** A two-letter ISO 639-1 language code. If empty, the name will be shown to all users for whose language there is no dedicated name. */
  readonly languageCode?: string | undefined;
}
const _SetMyNameParamsPublicKeys = { language_code: "languageCode" } as const;
const _SetMyNameParamsWireKeys = invertKeys(_SetMyNameParamsPublicKeys);
const _SetMyNameParamsEncoded = Schema.Struct({
  name: Schema.optional(Schema.String),
  language_code: Schema.optional(Schema.String),
});
const _SetMyNameParamsDecoded = Schema.declare<SetMyNameParams>((input): input is SetMyNameParams => Predicate.isObject(input));
export const SetMyNameParams: Schema.Codec<SetMyNameParams, Readonly<Record<string, unknown>>> = _SetMyNameParamsEncoded.pipe(
  Schema.decodeTo(_SetMyNameParamsDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_SetMyNameParamsPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_SetMyNameParamsWireKeys)),
  }),
);

export const setMyName = callMethod({
  method: "setMyName",
  params: SetMyNameParams,
  result: Schema.Literal(true),
  retrySafe: true,
});

/** Use this method to change the bot's short description, which is shown on the bot's profile page and is sent together with the link when users share the bot. Returns True on success. */
export interface SetMyShortDescriptionParams {
  /** New short description for the bot; 0-120 characters. Pass an empty string to remove the dedicated short description for the given language. */
  readonly shortDescription?: string | undefined;
  /** A two-letter ISO 639-1 language code. If empty, the short description will be applied to all users for whose language there is no dedicated short description. */
  readonly languageCode?: string | undefined;
}
const _SetMyShortDescriptionParamsPublicKeys = { short_description: "shortDescription", language_code: "languageCode" } as const;
const _SetMyShortDescriptionParamsWireKeys = invertKeys(_SetMyShortDescriptionParamsPublicKeys);
const _SetMyShortDescriptionParamsEncoded = Schema.Struct({
  short_description: Schema.optional(Schema.String),
  language_code: Schema.optional(Schema.String),
});
const _SetMyShortDescriptionParamsDecoded = Schema.declare<SetMyShortDescriptionParams>((input): input is SetMyShortDescriptionParams => Predicate.isObject(input));
export const SetMyShortDescriptionParams: Schema.Codec<SetMyShortDescriptionParams, Readonly<Record<string, unknown>>> = _SetMyShortDescriptionParamsEncoded.pipe(
  Schema.decodeTo(_SetMyShortDescriptionParamsDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_SetMyShortDescriptionParamsPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_SetMyShortDescriptionParamsWireKeys)),
  }),
);

export const setMyShortDescription = callMethod({
  method: "setMyShortDescription",
  params: SetMyShortDescriptionParams,
  result: Schema.Literal(true),
  retrySafe: true,
});
