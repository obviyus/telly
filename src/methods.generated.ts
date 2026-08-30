// Generated from bot-api/schema/sources/dofer/spec.json. Edit schema inputs or overrides, then regenerate.
import { Predicate, Schema, SchemaGetter, Struct } from "effect";

import { callMethod } from "./internal/CallMethod.js";
import { invertKeys } from "./internal/SchemaKeys.js";
import * as Types from "./types.generated.js";

/** Returns the list of gifts that can be sent by the bot to users and channel chats. Requires no parameters. Returns a Gifts object. */
export const getAvailableGifts = callMethod({
  method: "getAvailableGifts",
  result: Schema.suspend((): Schema.Codec<Types.Gifts, unknown> => Types.Gifts),
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

/** Use this method to get custom emoji stickers, which can be used as a forum topic icon by any user. Requires no parameters. Returns an Array of Sticker objects. */
export const getForumTopicIconStickers = callMethod({
  method: "getForumTopicIconStickers",
  result: Schema.Array(Schema.suspend((): Schema.Codec<Types.Sticker, unknown> => Types.Sticker)),
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

/** Use this method to get current webhook status. Requires no parameters. On success, returns a WebhookInfo object. If the bot is using getUpdates, will return an object with the url field empty. */
export const getWebhookInfo = callMethod({
  method: "getWebhookInfo",
  result: Schema.suspend((): Schema.Codec<Types.WebhookInfo, unknown> => Types.WebhookInfo),
  retrySafe: true,
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
