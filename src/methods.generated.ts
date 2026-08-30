// Generated from bot-api/schema/sources/dofer/spec.json. Edit schema inputs or overrides, then regenerate.
import { Predicate, Schema, SchemaGetter, Struct } from "effect";

import { callMethod } from "./internal/CallMethod.js";
import { invertKeys } from "./internal/SchemaKeys.js";
import * as Types from "./types.generated.js";

/** Use this method to add a new sticker to a set created by the bot. Emoji sticker sets can have up to 200 stickers. Other sticker sets can have up to 120 stickers. Returns True on success. */
export interface AddStickerToSetParams {
  /** User identifier of sticker set owner */
  readonly userId: number;
  /** Sticker set name */
  readonly name: string;
  /** A JSON-serialized object with information about the added sticker. If exactly the same sticker had already been added to the set, then the set isn't changed. */
  readonly sticker: Types.InputSticker;
}
const _AddStickerToSetParamsPublicKeys = { user_id: "userId" } as const;
const _AddStickerToSetParamsWireKeys = invertKeys(_AddStickerToSetParamsPublicKeys);
const _AddStickerToSetParamsEncoded = Schema.Struct({
  user_id: Schema.Int,
  name: Schema.String,
  sticker: Schema.suspend((): Schema.Codec<Types.InputSticker, unknown> => Types.InputSticker),
});
const _AddStickerToSetParamsDecoded = Schema.declare<AddStickerToSetParams>((input): input is AddStickerToSetParams => Predicate.isObject(input));
export const AddStickerToSetParams: Schema.Codec<AddStickerToSetParams, Readonly<Record<string, unknown>>> = _AddStickerToSetParamsEncoded.pipe(
  Schema.decodeTo(_AddStickerToSetParamsDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_AddStickerToSetParamsPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_AddStickerToSetParamsWireKeys)),
  }),
);

export const addStickerToSet = callMethod({
  method: "addStickerToSet",
  params: AddStickerToSetParams,
  result: Schema.Literal(true),
  retrySafe: false,
});

/** Use this method to send answers to callback queries sent from inline keyboards. The answer will be displayed to the user as a notification at the top of the chat screen or as an alert. On success, True is returned. */
export interface AnswerCallbackQueryParams {
  /** Unique identifier for the query to be answered */
  readonly callbackQueryId: string;
  /** Text of the notification. If not specified, nothing will be shown to the user, 0-200 characters. */
  readonly text?: string | undefined;
  /** If True, an alert will be shown by the client instead of a notification at the top of the chat screen. Defaults to False. */
  readonly showAlert?: boolean | undefined;
  /** URL that will be opened by the user's client. If you have created a Game and accepted the conditions via @BotFather, specify the URL that opens your game - note that this will only work if the query comes from a callback_game button.

Otherwise, you may use links like t.me/your_bot?start=XXXX that open your bot with a parameter. */
  readonly url?: string | undefined;
  /** The maximum amount of time in seconds that the result of the callback query may be cached client-side. Defaults to 0. */
  readonly cacheTime?: number | undefined;
}
const _AnswerCallbackQueryParamsPublicKeys = { callback_query_id: "callbackQueryId", show_alert: "showAlert", cache_time: "cacheTime" } as const;
const _AnswerCallbackQueryParamsWireKeys = invertKeys(_AnswerCallbackQueryParamsPublicKeys);
const _AnswerCallbackQueryParamsEncoded = Schema.Struct({
  callback_query_id: Schema.String,
  text: Schema.optional(Schema.String),
  show_alert: Schema.optional(Schema.Boolean),
  url: Schema.optional(Schema.String),
  cache_time: Schema.optional(Schema.Int),
});
const _AnswerCallbackQueryParamsDecoded = Schema.declare<AnswerCallbackQueryParams>((input): input is AnswerCallbackQueryParams => Predicate.isObject(input));
export const AnswerCallbackQueryParams: Schema.Codec<AnswerCallbackQueryParams, Readonly<Record<string, unknown>>> = _AnswerCallbackQueryParamsEncoded.pipe(
  Schema.decodeTo(_AnswerCallbackQueryParamsDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_AnswerCallbackQueryParamsPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_AnswerCallbackQueryParamsWireKeys)),
  }),
);

export const answerCallbackQuery = callMethod({
  method: "answerCallbackQuery",
  params: AnswerCallbackQueryParams,
  result: Schema.Literal(true),
  retrySafe: true,
});

/** Use this method to process a received chat join request query. Returns True on success. */
export interface AnswerChatJoinRequestQueryParams {
  /** Unique identifier of the join request query */
  readonly chatJoinRequestQueryId: string;
  /** Result of the query. Must be either “approve” to allow the user to join the chat, “decline” to disallow the user to join the chat, or “queue” to leave the decision to other administrators. */
  readonly result: string;
}
const _AnswerChatJoinRequestQueryParamsPublicKeys = { chat_join_request_query_id: "chatJoinRequestQueryId" } as const;
const _AnswerChatJoinRequestQueryParamsWireKeys = invertKeys(_AnswerChatJoinRequestQueryParamsPublicKeys);
const _AnswerChatJoinRequestQueryParamsEncoded = Schema.Struct({
  chat_join_request_query_id: Schema.String,
  result: Schema.String,
});
const _AnswerChatJoinRequestQueryParamsDecoded = Schema.declare<AnswerChatJoinRequestQueryParams>((input): input is AnswerChatJoinRequestQueryParams => Predicate.isObject(input));
export const AnswerChatJoinRequestQueryParams: Schema.Codec<AnswerChatJoinRequestQueryParams, Readonly<Record<string, unknown>>> = _AnswerChatJoinRequestQueryParamsEncoded.pipe(
  Schema.decodeTo(_AnswerChatJoinRequestQueryParamsDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_AnswerChatJoinRequestQueryParamsPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_AnswerChatJoinRequestQueryParamsWireKeys)),
  }),
);

export const answerChatJoinRequestQuery = callMethod({
  method: "answerChatJoinRequestQuery",
  params: AnswerChatJoinRequestQueryParams,
  result: Schema.Literal(true),
  retrySafe: true,
});

/** Use this method to reply to a received guest message. On success, a SentGuestMessage object is returned. */
export interface AnswerGuestQueryParams {
  /** Unique identifier for the query to be answered */
  readonly guestQueryId: string;
  /** A JSON-serialized object describing the message to be sent */
  readonly result: Types.InlineQueryResult;
}
const _AnswerGuestQueryParamsPublicKeys = { guest_query_id: "guestQueryId" } as const;
const _AnswerGuestQueryParamsWireKeys = invertKeys(_AnswerGuestQueryParamsPublicKeys);
const _AnswerGuestQueryParamsEncoded = Schema.Struct({
  guest_query_id: Schema.String,
  result: Schema.suspend((): Schema.Codec<Types.InlineQueryResult, unknown> => Types.InlineQueryResult),
});
const _AnswerGuestQueryParamsDecoded = Schema.declare<AnswerGuestQueryParams>((input): input is AnswerGuestQueryParams => Predicate.isObject(input));
export const AnswerGuestQueryParams: Schema.Codec<AnswerGuestQueryParams, Readonly<Record<string, unknown>>> = _AnswerGuestQueryParamsEncoded.pipe(
  Schema.decodeTo(_AnswerGuestQueryParamsDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_AnswerGuestQueryParamsPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_AnswerGuestQueryParamsWireKeys)),
  }),
);

export const answerGuestQuery = callMethod({
  method: "answerGuestQuery",
  params: AnswerGuestQueryParams,
  result: Schema.suspend((): Schema.Codec<Types.SentGuestMessage, unknown> => Types.SentGuestMessage),
  retrySafe: true,
});

/** Use this method to send answers to an inline query. On success, True is returned.
No more than 50 results per query are allowed. */
export interface AnswerInlineQueryParams {
  /** Unique identifier for the answered query */
  readonly inlineQueryId: string;
  /** A JSON-serialized Array of results for the inline query */
  readonly results: ReadonlyArray<Types.InlineQueryResult>;
  /** The maximum amount of time in seconds that the result of the inline query may be cached on the server. Defaults to 300. */
  readonly cacheTime?: number | undefined;
  /** Pass True if results may be cached on the server side only for the user that sent the query. By default, results may be returned to any user who sends the same query. */
  readonly isPersonal?: boolean | undefined;
  /** Pass the offset that a client should send in the next query with the same text to receive more results. Pass an empty string if there are no more results or if you don't support pagination. Offset length can't exceed 64 bytes. */
  readonly nextOffset?: string | undefined;
  /** A JSON-serialized object describing a button to be shown above inline query results */
  readonly button?: Types.InlineQueryResultsButton | undefined;
}
const _AnswerInlineQueryParamsPublicKeys = { inline_query_id: "inlineQueryId", cache_time: "cacheTime", is_personal: "isPersonal", next_offset: "nextOffset" } as const;
const _AnswerInlineQueryParamsWireKeys = invertKeys(_AnswerInlineQueryParamsPublicKeys);
const _AnswerInlineQueryParamsEncoded = Schema.Struct({
  inline_query_id: Schema.String,
  results: Schema.Array(Schema.suspend((): Schema.Codec<Types.InlineQueryResult, unknown> => Types.InlineQueryResult)),
  cache_time: Schema.optional(Schema.Int),
  is_personal: Schema.optional(Schema.Boolean),
  next_offset: Schema.optional(Schema.String),
  button: Schema.optional(Schema.suspend((): Schema.Codec<Types.InlineQueryResultsButton, unknown> => Types.InlineQueryResultsButton)),
});
const _AnswerInlineQueryParamsDecoded = Schema.declare<AnswerInlineQueryParams>((input): input is AnswerInlineQueryParams => Predicate.isObject(input));
export const AnswerInlineQueryParams: Schema.Codec<AnswerInlineQueryParams, Readonly<Record<string, unknown>>> = _AnswerInlineQueryParamsEncoded.pipe(
  Schema.decodeTo(_AnswerInlineQueryParamsDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_AnswerInlineQueryParamsPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_AnswerInlineQueryParamsWireKeys)),
  }),
);

export const answerInlineQuery = callMethod({
  method: "answerInlineQuery",
  params: AnswerInlineQueryParams,
  result: Schema.Literal(true),
  retrySafe: true,
});

/** Once the user has confirmed their payment and shipping details, the Bot API sends the final confirmation in the form of an Update with the field pre_checkout_query. Use this method to respond to such pre-checkout queries. On success, True is returned. Note: The Bot API must receive an answer within 10 seconds after the pre-checkout query was sent. */
export interface AnswerPreCheckoutQueryParams {
  /** Unique identifier for the query to be answered */
  readonly preCheckoutQueryId: string;
  /** Specify True if everything is alright (goods are available, etc.) and the bot is ready to proceed with the order. Use False if there are any problems. */
  readonly ok: boolean;
  /** Required if ok is False. Error message in human readable form that explains the reason for failure to proceed with the checkout (e.g. "Sorry, somebody just bought the last of our amazing black T-shirts while you were busy filling out your payment details. Please choose a different color or garment!"). Telegram will display this message to the user. */
  readonly errorMessage?: string | undefined;
}
const _AnswerPreCheckoutQueryParamsPublicKeys = { pre_checkout_query_id: "preCheckoutQueryId", error_message: "errorMessage" } as const;
const _AnswerPreCheckoutQueryParamsWireKeys = invertKeys(_AnswerPreCheckoutQueryParamsPublicKeys);
const _AnswerPreCheckoutQueryParamsEncoded = Schema.Struct({
  pre_checkout_query_id: Schema.String,
  ok: Schema.Boolean,
  error_message: Schema.optional(Schema.String),
});
const _AnswerPreCheckoutQueryParamsDecoded = Schema.declare<AnswerPreCheckoutQueryParams>((input): input is AnswerPreCheckoutQueryParams => Predicate.isObject(input));
export const AnswerPreCheckoutQueryParams: Schema.Codec<AnswerPreCheckoutQueryParams, Readonly<Record<string, unknown>>> = _AnswerPreCheckoutQueryParamsEncoded.pipe(
  Schema.decodeTo(_AnswerPreCheckoutQueryParamsDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_AnswerPreCheckoutQueryParamsPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_AnswerPreCheckoutQueryParamsWireKeys)),
  }),
);

export const answerPreCheckoutQuery = callMethod({
  method: "answerPreCheckoutQuery",
  params: AnswerPreCheckoutQueryParams,
  result: Schema.Literal(true),
  retrySafe: true,
});

/** If you sent an invoice requesting a shipping address and the parameter is_flexible was specified, the Bot API will send an Update with a shipping_query field to the bot. Use this method to reply to shipping queries. On success, True is returned. */
export interface AnswerShippingQueryParams {
  /** Unique identifier for the query to be answered */
  readonly shippingQueryId: string;
  /** Pass True if delivery to the specified address is possible and False if there are any problems (for example, if delivery to the specified address is not possible) */
  readonly ok: boolean;
  /** Required if ok is True. A JSON-serialized Array of available shipping options. */
  readonly shippingOptions?: ReadonlyArray<Types.ShippingOption> | undefined;
  /** Required if ok is False. Error message in human readable form that explains why it is impossible to complete the order (e.g. “Sorry, delivery to your desired address is unavailable”). Telegram will display this message to the user. */
  readonly errorMessage?: string | undefined;
}
const _AnswerShippingQueryParamsPublicKeys = { shipping_query_id: "shippingQueryId", shipping_options: "shippingOptions", error_message: "errorMessage" } as const;
const _AnswerShippingQueryParamsWireKeys = invertKeys(_AnswerShippingQueryParamsPublicKeys);
const _AnswerShippingQueryParamsEncoded = Schema.Struct({
  shipping_query_id: Schema.String,
  ok: Schema.Boolean,
  shipping_options: Schema.optional(Schema.Array(Schema.suspend((): Schema.Codec<Types.ShippingOption, unknown> => Types.ShippingOption))),
  error_message: Schema.optional(Schema.String),
});
const _AnswerShippingQueryParamsDecoded = Schema.declare<AnswerShippingQueryParams>((input): input is AnswerShippingQueryParams => Predicate.isObject(input));
export const AnswerShippingQueryParams: Schema.Codec<AnswerShippingQueryParams, Readonly<Record<string, unknown>>> = _AnswerShippingQueryParamsEncoded.pipe(
  Schema.decodeTo(_AnswerShippingQueryParamsDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_AnswerShippingQueryParamsPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_AnswerShippingQueryParamsWireKeys)),
  }),
);

export const answerShippingQuery = callMethod({
  method: "answerShippingQuery",
  params: AnswerShippingQueryParams,
  result: Schema.Literal(true),
  retrySafe: true,
});

/** Use this method to set the result of an interaction with a Web App and send a corresponding message on behalf of the user to the chat from which the query originated. On success, a SentWebAppMessage object is returned. */
export interface AnswerWebAppQueryParams {
  /** Unique identifier for the query to be answered */
  readonly webAppQueryId: string;
  /** A JSON-serialized object describing the message to be sent */
  readonly result: Types.InlineQueryResult;
}
const _AnswerWebAppQueryParamsPublicKeys = { web_app_query_id: "webAppQueryId" } as const;
const _AnswerWebAppQueryParamsWireKeys = invertKeys(_AnswerWebAppQueryParamsPublicKeys);
const _AnswerWebAppQueryParamsEncoded = Schema.Struct({
  web_app_query_id: Schema.String,
  result: Schema.suspend((): Schema.Codec<Types.InlineQueryResult, unknown> => Types.InlineQueryResult),
});
const _AnswerWebAppQueryParamsDecoded = Schema.declare<AnswerWebAppQueryParams>((input): input is AnswerWebAppQueryParams => Predicate.isObject(input));
export const AnswerWebAppQueryParams: Schema.Codec<AnswerWebAppQueryParams, Readonly<Record<string, unknown>>> = _AnswerWebAppQueryParamsEncoded.pipe(
  Schema.decodeTo(_AnswerWebAppQueryParamsDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_AnswerWebAppQueryParamsPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_AnswerWebAppQueryParamsWireKeys)),
  }),
);

export const answerWebAppQuery = callMethod({
  method: "answerWebAppQuery",
  params: AnswerWebAppQueryParams,
  result: Schema.suspend((): Schema.Codec<Types.SentWebAppMessage, unknown> => Types.SentWebAppMessage),
  retrySafe: true,
});

/** Use this method to approve a chat join request. The bot must be an administrator in the chat for this to work and must have the can_invite_users administrator right. Returns True on success. */
export interface ApproveChatJoinRequestParams {
  /** Unique identifier for the target chat or username of the target channel in the format @username */
  readonly chatId: number | string;
  /** Unique identifier of the target user */
  readonly userId: number;
}
const _ApproveChatJoinRequestParamsPublicKeys = { chat_id: "chatId", user_id: "userId" } as const;
const _ApproveChatJoinRequestParamsWireKeys = invertKeys(_ApproveChatJoinRequestParamsPublicKeys);
const _ApproveChatJoinRequestParamsEncoded = Schema.Struct({
  chat_id: Schema.Union([Schema.Int, Schema.String]),
  user_id: Schema.Int,
});
const _ApproveChatJoinRequestParamsDecoded = Schema.declare<ApproveChatJoinRequestParams>((input): input is ApproveChatJoinRequestParams => Predicate.isObject(input));
export const ApproveChatJoinRequestParams: Schema.Codec<ApproveChatJoinRequestParams, Readonly<Record<string, unknown>>> = _ApproveChatJoinRequestParamsEncoded.pipe(
  Schema.decodeTo(_ApproveChatJoinRequestParamsDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_ApproveChatJoinRequestParamsPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_ApproveChatJoinRequestParamsWireKeys)),
  }),
);

export const approveChatJoinRequest = callMethod({
  method: "approveChatJoinRequest",
  params: ApproveChatJoinRequestParams,
  result: Schema.Literal(true),
  retrySafe: true,
});

/** Use this method to approve a suggested post in a direct messages chat. The bot must have the 'can_post_messages' administrator right in the corresponding channel chat. Returns True on success. */
export interface ApproveSuggestedPostParams {
  /** Unique identifier for the target direct messages chat */
  readonly chatId: number;
  /** Identifier of a suggested post message to approve */
  readonly messageId: number;
  /** Point in time (Unix timestamp) when the post is expected to be published; omit if the date has already been specified when the suggested post was created. If specified, then the date must be not more than 2678400 seconds (30 days) in the future. */
  readonly sendDate?: number | undefined;
}
const _ApproveSuggestedPostParamsPublicKeys = { chat_id: "chatId", message_id: "messageId", send_date: "sendDate" } as const;
const _ApproveSuggestedPostParamsWireKeys = invertKeys(_ApproveSuggestedPostParamsPublicKeys);
const _ApproveSuggestedPostParamsEncoded = Schema.Struct({
  chat_id: Schema.Int,
  message_id: Schema.Int,
  send_date: Schema.optional(Schema.Int),
});
const _ApproveSuggestedPostParamsDecoded = Schema.declare<ApproveSuggestedPostParams>((input): input is ApproveSuggestedPostParams => Predicate.isObject(input));
export const ApproveSuggestedPostParams: Schema.Codec<ApproveSuggestedPostParams, Readonly<Record<string, unknown>>> = _ApproveSuggestedPostParamsEncoded.pipe(
  Schema.decodeTo(_ApproveSuggestedPostParamsDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_ApproveSuggestedPostParamsPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_ApproveSuggestedPostParamsWireKeys)),
  }),
);

export const approveSuggestedPost = callMethod({
  method: "approveSuggestedPost",
  params: ApproveSuggestedPostParams,
  result: Schema.Literal(true),
  retrySafe: true,
});

/** Use this method to copy messages of any kind. Service messages, paid media messages, giveaway messages, giveaway winners messages, and invoice messages can't be copied. A quiz poll can be copied only if the value of the field correct_option_ids is known to the bot. The method is analogous to the method forwardMessage, but the copied message doesn't have a link to the original message. Returns the MessageId of the sent message on success. */
export interface CopyMessageParams {
  /** Unique identifier for the target chat or username of the target bot, supergroup or channel in the format @username */
  readonly chatId: number | string;
  /** Unique identifier for the target message thread (topic) of a forum; for forum supergroups and private chats of bots with forum topic mode enabled only */
  readonly messageThreadId?: number | undefined;
  /** Identifier of the direct messages topic to which the message will be sent; required if the message is sent to a direct messages chat */
  readonly directMessagesTopicId?: number | undefined;
  /** Unique identifier for the chat where the original message was sent (or username of the target bot, supergroup or channel in the format @username) */
  readonly fromChatId: number | string;
  /** Message identifier in the chat specified in from_chat_id */
  readonly messageId: number;
  /** New start timestamp for the copied video in the message */
  readonly videoStartTimestamp?: number | undefined;
  /** New caption for media, 0-1024 characters after entities parsing. If not specified, the original caption is kept. */
  readonly caption?: string | undefined;
  /** Mode for parsing entities in the new caption. See formatting options for more details. */
  readonly parseMode?: Types.ParseMode | undefined;
  /** A JSON-serialized list of special entities that appear in the new caption, which can be specified instead of parse_mode */
  readonly captionEntities?: ReadonlyArray<Types.MessageEntity> | undefined;
  /** Pass True if the caption must be shown above the message media. Ignored if a new caption isn't specified. */
  readonly showCaptionAboveMedia?: boolean | undefined;
  /** Sends the message silently. Users will receive a notification with no sound. */
  readonly disableNotification?: boolean | undefined;
  /** Protects the contents of the sent message from forwarding and saving */
  readonly protectContent?: boolean | undefined;
  /** Pass True to allow up to 1000 messages per second, ignoring broadcasting limits for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot's balance. */
  readonly allowPaidBroadcast?: boolean | undefined;
  /** Unique identifier of the message effect to be added to the message; only available when copying to private chats */
  readonly messageEffectId?: string | undefined;
  /** A JSON-serialized object containing the parameters of the suggested post to send; for direct messages chats only. If the message is sent as a reply to another suggested post, then that suggested post is automatically declined. */
  readonly suggestedPostParameters?: Types.SuggestedPostParameters | undefined;
  /** Description of the message to reply to */
  readonly replyParameters?: Types.ReplyParameters | undefined;
  /** Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove a reply keyboard or to force a reply from the user. */
  readonly replyMarkup?: Types.InlineKeyboardMarkup | Types.ReplyKeyboardMarkup | Types.ReplyKeyboardRemove | Types.ForceReply | undefined;
}
const _CopyMessageParamsPublicKeys = { chat_id: "chatId", message_thread_id: "messageThreadId", direct_messages_topic_id: "directMessagesTopicId", from_chat_id: "fromChatId", message_id: "messageId", video_start_timestamp: "videoStartTimestamp", parse_mode: "parseMode", caption_entities: "captionEntities", show_caption_above_media: "showCaptionAboveMedia", disable_notification: "disableNotification", protect_content: "protectContent", allow_paid_broadcast: "allowPaidBroadcast", message_effect_id: "messageEffectId", suggested_post_parameters: "suggestedPostParameters", reply_parameters: "replyParameters", reply_markup: "replyMarkup" } as const;
const _CopyMessageParamsWireKeys = invertKeys(_CopyMessageParamsPublicKeys);
const _CopyMessageParamsEncoded = Schema.Struct({
  chat_id: Schema.Union([Schema.Int, Schema.String]),
  message_thread_id: Schema.optional(Schema.Int),
  direct_messages_topic_id: Schema.optional(Schema.Int),
  from_chat_id: Schema.Union([Schema.Int, Schema.String]),
  message_id: Schema.Int,
  video_start_timestamp: Schema.optional(Schema.Int),
  caption: Schema.optional(Schema.String),
  parse_mode: Schema.optional(Schema.suspend((): Schema.Codec<Types.ParseMode, unknown> => Types.ParseMode)),
  caption_entities: Schema.optional(Schema.Array(Schema.suspend((): Schema.Codec<Types.MessageEntity, unknown> => Types.MessageEntity))),
  show_caption_above_media: Schema.optional(Schema.Boolean),
  disable_notification: Schema.optional(Schema.Boolean),
  protect_content: Schema.optional(Schema.Boolean),
  allow_paid_broadcast: Schema.optional(Schema.Boolean),
  message_effect_id: Schema.optional(Schema.String),
  suggested_post_parameters: Schema.optional(Schema.suspend((): Schema.Codec<Types.SuggestedPostParameters, unknown> => Types.SuggestedPostParameters)),
  reply_parameters: Schema.optional(Schema.suspend((): Schema.Codec<Types.ReplyParameters, unknown> => Types.ReplyParameters)),
  reply_markup: Schema.optional(Schema.Union([Schema.suspend((): Schema.Codec<Types.InlineKeyboardMarkup, unknown> => Types.InlineKeyboardMarkup), Schema.suspend((): Schema.Codec<Types.ReplyKeyboardMarkup, unknown> => Types.ReplyKeyboardMarkup), Schema.suspend((): Schema.Codec<Types.ReplyKeyboardRemove, unknown> => Types.ReplyKeyboardRemove), Schema.suspend((): Schema.Codec<Types.ForceReply, unknown> => Types.ForceReply)])),
});
const _CopyMessageParamsDecoded = Schema.declare<CopyMessageParams>((input): input is CopyMessageParams => Predicate.isObject(input));
export const CopyMessageParams: Schema.Codec<CopyMessageParams, Readonly<Record<string, unknown>>> = _CopyMessageParamsEncoded.pipe(
  Schema.decodeTo(_CopyMessageParamsDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_CopyMessageParamsPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_CopyMessageParamsWireKeys)),
  }),
);

export const copyMessage = callMethod({
  method: "copyMessage",
  params: CopyMessageParams,
  result: Schema.suspend((): Schema.Codec<Types.MessageId, unknown> => Types.MessageId),
  retrySafe: false,
});

/** Use this method to copy messages of any kind. If some of the specified messages can't be found or copied, they are skipped. Service messages, paid media messages, giveaway messages, giveaway winners messages, and invoice messages can't be copied. A quiz poll can be copied only if the value of the field correct_option_ids is known to the bot. The method is analogous to the method forwardMessages, but the copied messages don't have a link to the original message. Album grouping is kept for copied messages. On success, an Array of MessageId of the sent messages is returned. */
export interface CopyMessagesParams {
  /** Unique identifier for the target chat or username of the target bot, supergroup or channel in the format @username */
  readonly chatId: number | string;
  /** Unique identifier for the target message thread (topic) of a forum; for forum supergroups and private chats of bots with forum topic mode enabled only */
  readonly messageThreadId?: number | undefined;
  /** Identifier of the direct messages topic to which the messages will be sent; required if the messages are sent to a direct messages chat */
  readonly directMessagesTopicId?: number | undefined;
  /** Unique identifier for the chat where the original messages were sent (or username of the target bot, supergroup or channel in the format @username) */
  readonly fromChatId: number | string;
  /** A JSON-serialized list of 1-100 identifiers of messages in the chat from_chat_id to copy. The identifiers must be specified in a strictly increasing order. */
  readonly messageIds: ReadonlyArray<number>;
  /** Sends the messages silently. Users will receive a notification with no sound. */
  readonly disableNotification?: boolean | undefined;
  /** Protects the contents of the sent messages from forwarding and saving */
  readonly protectContent?: boolean | undefined;
  /** Pass True to copy the messages without their captions */
  readonly removeCaption?: boolean | undefined;
}
const _CopyMessagesParamsPublicKeys = { chat_id: "chatId", message_thread_id: "messageThreadId", direct_messages_topic_id: "directMessagesTopicId", from_chat_id: "fromChatId", message_ids: "messageIds", disable_notification: "disableNotification", protect_content: "protectContent", remove_caption: "removeCaption" } as const;
const _CopyMessagesParamsWireKeys = invertKeys(_CopyMessagesParamsPublicKeys);
const _CopyMessagesParamsEncoded = Schema.Struct({
  chat_id: Schema.Union([Schema.Int, Schema.String]),
  message_thread_id: Schema.optional(Schema.Int),
  direct_messages_topic_id: Schema.optional(Schema.Int),
  from_chat_id: Schema.Union([Schema.Int, Schema.String]),
  message_ids: Schema.Array(Schema.Int),
  disable_notification: Schema.optional(Schema.Boolean),
  protect_content: Schema.optional(Schema.Boolean),
  remove_caption: Schema.optional(Schema.Boolean),
});
const _CopyMessagesParamsDecoded = Schema.declare<CopyMessagesParams>((input): input is CopyMessagesParams => Predicate.isObject(input));
export const CopyMessagesParams: Schema.Codec<CopyMessagesParams, Readonly<Record<string, unknown>>> = _CopyMessagesParamsEncoded.pipe(
  Schema.decodeTo(_CopyMessagesParamsDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_CopyMessagesParamsPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_CopyMessagesParamsWireKeys)),
  }),
);

export const copyMessages = callMethod({
  method: "copyMessages",
  params: CopyMessagesParams,
  result: Schema.Array(Schema.suspend((): Schema.Codec<Types.MessageId, unknown> => Types.MessageId)),
  retrySafe: false,
});

/** Use this method to create an additional invite link for a chat. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. The link can be revoked using the method revokeChatInviteLink. Returns the new invite link as ChatInviteLink object. */
export interface CreateChatInviteLinkParams {
  /** Unique identifier for the target chat or username of the target channel in the format @username */
  readonly chatId: number | string;
  /** Invite link name; 0-32 characters */
  readonly name?: string | undefined;
  /** Point in time (Unix timestamp) when the link will expire */
  readonly expireDate?: number | undefined;
  /** The maximum number of users that can be members of the chat simultaneously after joining the chat via this invite link; 1-99999 */
  readonly memberLimit?: number | undefined;
  /** True, if users joining the chat via the link need to be approved by chat administrators. If True, member_limit can't be specified. */
  readonly createsJoinRequest?: boolean | undefined;
}
const _CreateChatInviteLinkParamsPublicKeys = { chat_id: "chatId", expire_date: "expireDate", member_limit: "memberLimit", creates_join_request: "createsJoinRequest" } as const;
const _CreateChatInviteLinkParamsWireKeys = invertKeys(_CreateChatInviteLinkParamsPublicKeys);
const _CreateChatInviteLinkParamsEncoded = Schema.Struct({
  chat_id: Schema.Union([Schema.Int, Schema.String]),
  name: Schema.optional(Schema.String),
  expire_date: Schema.optional(Schema.Int),
  member_limit: Schema.optional(Schema.Int),
  creates_join_request: Schema.optional(Schema.Boolean),
});
const _CreateChatInviteLinkParamsDecoded = Schema.declare<CreateChatInviteLinkParams>((input): input is CreateChatInviteLinkParams => Predicate.isObject(input));
export const CreateChatInviteLinkParams: Schema.Codec<CreateChatInviteLinkParams, Readonly<Record<string, unknown>>> = _CreateChatInviteLinkParamsEncoded.pipe(
  Schema.decodeTo(_CreateChatInviteLinkParamsDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_CreateChatInviteLinkParamsPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_CreateChatInviteLinkParamsWireKeys)),
  }),
);

export const createChatInviteLink = callMethod({
  method: "createChatInviteLink",
  params: CreateChatInviteLinkParams,
  result: Schema.suspend((): Schema.Codec<Types.ChatInviteLink, unknown> => Types.ChatInviteLink),
  retrySafe: false,
});

/** Use this method to create a subscription invite link for a channel chat. The bot must have the can_invite_users administrator rights. The link can be edited using the method editChatSubscriptionInviteLink or revoked using the method revokeChatInviteLink. Returns the new invite link as a ChatInviteLink object. */
export interface CreateChatSubscriptionInviteLinkParams {
  /** Unique identifier for the target channel chat or username of the target channel in the format @username */
  readonly chatId: number | string;
  /** Invite link name; 0-32 characters */
  readonly name?: string | undefined;
  /** The number of seconds the subscription will be active for before the next payment. Currently, it must always be 2592000 (30 days). */
  readonly subscriptionPeriod: number;
  /** The amount of Telegram Stars a user must pay initially and after each subsequent subscription period to be a member of the chat; 1-10000 */
  readonly subscriptionPrice: number;
}
const _CreateChatSubscriptionInviteLinkParamsPublicKeys = { chat_id: "chatId", subscription_period: "subscriptionPeriod", subscription_price: "subscriptionPrice" } as const;
const _CreateChatSubscriptionInviteLinkParamsWireKeys = invertKeys(_CreateChatSubscriptionInviteLinkParamsPublicKeys);
const _CreateChatSubscriptionInviteLinkParamsEncoded = Schema.Struct({
  chat_id: Schema.Union([Schema.Int, Schema.String]),
  name: Schema.optional(Schema.String),
  subscription_period: Schema.Int,
  subscription_price: Schema.Int,
});
const _CreateChatSubscriptionInviteLinkParamsDecoded = Schema.declare<CreateChatSubscriptionInviteLinkParams>((input): input is CreateChatSubscriptionInviteLinkParams => Predicate.isObject(input));
export const CreateChatSubscriptionInviteLinkParams: Schema.Codec<CreateChatSubscriptionInviteLinkParams, Readonly<Record<string, unknown>>> = _CreateChatSubscriptionInviteLinkParamsEncoded.pipe(
  Schema.decodeTo(_CreateChatSubscriptionInviteLinkParamsDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_CreateChatSubscriptionInviteLinkParamsPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_CreateChatSubscriptionInviteLinkParamsWireKeys)),
  }),
);

export const createChatSubscriptionInviteLink = callMethod({
  method: "createChatSubscriptionInviteLink",
  params: CreateChatSubscriptionInviteLinkParams,
  result: Schema.suspend((): Schema.Codec<Types.ChatInviteLink, unknown> => Types.ChatInviteLink),
  retrySafe: false,
});

/** Use this method to create a topic in a forum supergroup chat or a private chat with a user. In the case of a supergroup chat the bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator right. Returns information about the created topic as a ForumTopic object. */
export interface CreateForumTopicParams {
  /** Unique identifier for the target chat or username of the target supergroup in the format @username */
  readonly chatId: number | string;
  /** Topic name, 1-128 characters */
  readonly name: string;
  /** Color of the topic icon in RGB format. Currently, must be one of 7322096 (0x6FB9F0), 16766590 (0xFFD67E), 13338331 (0xCB86DB), 9367192 (0x8EEE98), 16749490 (0xFF93B2), or 16478047 (0xFB6F5F). */
  readonly iconColor?: number | undefined;
  /** Unique identifier of the custom emoji shown as the topic icon. Use getForumTopicIconStickers to get all allowed custom emoji identifiers. */
  readonly iconCustomEmojiId?: string | undefined;
}
const _CreateForumTopicParamsPublicKeys = { chat_id: "chatId", icon_color: "iconColor", icon_custom_emoji_id: "iconCustomEmojiId" } as const;
const _CreateForumTopicParamsWireKeys = invertKeys(_CreateForumTopicParamsPublicKeys);
const _CreateForumTopicParamsEncoded = Schema.Struct({
  chat_id: Schema.Union([Schema.Int, Schema.String]),
  name: Schema.String,
  icon_color: Schema.optional(Schema.Int),
  icon_custom_emoji_id: Schema.optional(Schema.String),
});
const _CreateForumTopicParamsDecoded = Schema.declare<CreateForumTopicParams>((input): input is CreateForumTopicParams => Predicate.isObject(input));
export const CreateForumTopicParams: Schema.Codec<CreateForumTopicParams, Readonly<Record<string, unknown>>> = _CreateForumTopicParamsEncoded.pipe(
  Schema.decodeTo(_CreateForumTopicParamsDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_CreateForumTopicParamsPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_CreateForumTopicParamsWireKeys)),
  }),
);

export const createForumTopic = callMethod({
  method: "createForumTopic",
  params: CreateForumTopicParams,
  result: Schema.suspend((): Schema.Codec<Types.ForumTopic, unknown> => Types.ForumTopic),
  retrySafe: false,
});

/** Use this method to create a link for an invoice. Returns the created invoice link as String on success. */
export interface CreateInvoiceLinkParams {
  /** Unique identifier of the business connection on behalf of which the link will be created. For payments in Telegram Stars only. */
  readonly businessConnectionId?: string | undefined;
  /** Product name, 1-32 characters */
  readonly title: string;
  /** Product description, 1-255 characters */
  readonly description: string;
  /** Bot-defined invoice payload, 1-128 bytes. This will not be displayed to the user, use it for your internal processes. */
  readonly payload: string;
  /** Payment provider token, obtained via @BotFather. Pass an empty string for payments in Telegram Stars. */
  readonly providerToken?: string | undefined;
  /** Three-letter ISO 4217 currency code, see more on currencies. Pass “XTR” for payments in Telegram Stars. */
  readonly currency: string;
  /** Price breakdown, a JSON-serialized list of components (e.g. product price, tax, discount, delivery cost, delivery tax, bonus, etc.). Must contain exactly one item for payments in Telegram Stars. */
  readonly prices: ReadonlyArray<Types.LabeledPrice>;
  /** The number of seconds the subscription will be active for before the next payment. The currency must be set to “XTR” (Telegram Stars) if the parameter is used. Currently, it must always be 2592000 (30 days) if specified. Any number of subscriptions can be active for a given bot at the same time, including multiple concurrent subscriptions from the same user. Subscription price must no exceed 10000 Telegram Stars. */
  readonly subscriptionPeriod?: number | undefined;
  /** The maximum accepted amount for tips in the smallest units of the currency (integer, not float/double). For example, for a maximum tip of US$ 1.45 pass max_tip_amount = 145. See the exp parameter in currencies.json, it shows the number of digits past the decimal point for each currency (2 for the majority of currencies). Defaults to 0. Not supported for payments in Telegram Stars. */
  readonly maxTipAmount?: number | undefined;
  /** A JSON-serialized Array of suggested amounts of tips in the smallest units of the currency (integer, not float/double). At most 4 suggested tip amounts can be specified. The suggested tip amounts must be positive, passed in a strictly increased order and must not exceed max_tip_amount. */
  readonly suggestedTipAmounts?: ReadonlyArray<number> | undefined;
  /** JSON-serialized data about the invoice, which will be shared with the payment provider. A detailed description of required fields should be provided by the payment provider. */
  readonly providerData?: string | undefined;
  /** URL of the product photo for the invoice. Can be a photo of the goods or a marketing image for a service. */
  readonly photoUrl?: string | undefined;
  /** Photo size in bytes */
  readonly photoSize?: number | undefined;
  /** Photo width */
  readonly photoWidth?: number | undefined;
  /** Photo height */
  readonly photoHeight?: number | undefined;
  /** Pass True if you require the user's full name to complete the order. Ignored for payments in Telegram Stars. */
  readonly needName?: boolean | undefined;
  /** Pass True if you require the user's phone number to complete the order. Ignored for payments in Telegram Stars. */
  readonly needPhoneNumber?: boolean | undefined;
  /** Pass True if you require the user's email address to complete the order. Ignored for payments in Telegram Stars. */
  readonly needEmail?: boolean | undefined;
  /** Pass True if you require the user's shipping address to complete the order. Ignored for payments in Telegram Stars. */
  readonly needShippingAddress?: boolean | undefined;
  /** Pass True if the user's phone number should be sent to the provider. Ignored for payments in Telegram Stars. */
  readonly sendPhoneNumberToProvider?: boolean | undefined;
  /** Pass True if the user's email address should be sent to the provider. Ignored for payments in Telegram Stars. */
  readonly sendEmailToProvider?: boolean | undefined;
  /** Pass True if the final price depends on the shipping method. Ignored for payments in Telegram Stars. */
  readonly isFlexible?: boolean | undefined;
}
const _CreateInvoiceLinkParamsPublicKeys = { business_connection_id: "businessConnectionId", provider_token: "providerToken", subscription_period: "subscriptionPeriod", max_tip_amount: "maxTipAmount", suggested_tip_amounts: "suggestedTipAmounts", provider_data: "providerData", photo_url: "photoUrl", photo_size: "photoSize", photo_width: "photoWidth", photo_height: "photoHeight", need_name: "needName", need_phone_number: "needPhoneNumber", need_email: "needEmail", need_shipping_address: "needShippingAddress", send_phone_number_to_provider: "sendPhoneNumberToProvider", send_email_to_provider: "sendEmailToProvider", is_flexible: "isFlexible" } as const;
const _CreateInvoiceLinkParamsWireKeys = invertKeys(_CreateInvoiceLinkParamsPublicKeys);
const _CreateInvoiceLinkParamsEncoded = Schema.Struct({
  business_connection_id: Schema.optional(Schema.String),
  title: Schema.String,
  description: Schema.String,
  payload: Schema.String,
  provider_token: Schema.optional(Schema.String),
  currency: Schema.String,
  prices: Schema.Array(Schema.suspend((): Schema.Codec<Types.LabeledPrice, unknown> => Types.LabeledPrice)),
  subscription_period: Schema.optional(Schema.Int),
  max_tip_amount: Schema.optional(Schema.Int),
  suggested_tip_amounts: Schema.optional(Schema.Array(Schema.Int)),
  provider_data: Schema.optional(Schema.String),
  photo_url: Schema.optional(Schema.String),
  photo_size: Schema.optional(Schema.Int),
  photo_width: Schema.optional(Schema.Int),
  photo_height: Schema.optional(Schema.Int),
  need_name: Schema.optional(Schema.Boolean),
  need_phone_number: Schema.optional(Schema.Boolean),
  need_email: Schema.optional(Schema.Boolean),
  need_shipping_address: Schema.optional(Schema.Boolean),
  send_phone_number_to_provider: Schema.optional(Schema.Boolean),
  send_email_to_provider: Schema.optional(Schema.Boolean),
  is_flexible: Schema.optional(Schema.Boolean),
});
const _CreateInvoiceLinkParamsDecoded = Schema.declare<CreateInvoiceLinkParams>((input): input is CreateInvoiceLinkParams => Predicate.isObject(input));
export const CreateInvoiceLinkParams: Schema.Codec<CreateInvoiceLinkParams, Readonly<Record<string, unknown>>> = _CreateInvoiceLinkParamsEncoded.pipe(
  Schema.decodeTo(_CreateInvoiceLinkParamsDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_CreateInvoiceLinkParamsPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_CreateInvoiceLinkParamsWireKeys)),
  }),
);

export const createInvoiceLink = callMethod({
  method: "createInvoiceLink",
  params: CreateInvoiceLinkParams,
  result: Schema.String,
  retrySafe: false,
});

/** Use this method to decline a chat join request. The bot must be an administrator in the chat for this to work and must have the can_invite_users administrator right. Returns True on success. */
export interface DeclineChatJoinRequestParams {
  /** Unique identifier for the target chat or username of the target channel in the format @username */
  readonly chatId: number | string;
  /** Unique identifier of the target user */
  readonly userId: number;
}
const _DeclineChatJoinRequestParamsPublicKeys = { chat_id: "chatId", user_id: "userId" } as const;
const _DeclineChatJoinRequestParamsWireKeys = invertKeys(_DeclineChatJoinRequestParamsPublicKeys);
const _DeclineChatJoinRequestParamsEncoded = Schema.Struct({
  chat_id: Schema.Union([Schema.Int, Schema.String]),
  user_id: Schema.Int,
});
const _DeclineChatJoinRequestParamsDecoded = Schema.declare<DeclineChatJoinRequestParams>((input): input is DeclineChatJoinRequestParams => Predicate.isObject(input));
export const DeclineChatJoinRequestParams: Schema.Codec<DeclineChatJoinRequestParams, Readonly<Record<string, unknown>>> = _DeclineChatJoinRequestParamsEncoded.pipe(
  Schema.decodeTo(_DeclineChatJoinRequestParamsDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_DeclineChatJoinRequestParamsPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_DeclineChatJoinRequestParamsWireKeys)),
  }),
);

export const declineChatJoinRequest = callMethod({
  method: "declineChatJoinRequest",
  params: DeclineChatJoinRequestParams,
  result: Schema.Literal(true),
  retrySafe: true,
});

/** Use this method to decline a suggested post in a direct messages chat. The bot must have the 'can_manage_direct_messages' administrator right in the corresponding channel chat. Returns True on success. */
export interface DeclineSuggestedPostParams {
  /** Unique identifier for the target direct messages chat */
  readonly chatId: number;
  /** Identifier of a suggested post message to decline */
  readonly messageId: number;
  /** Comment for the creator of the suggested post; 0-128 characters */
  readonly comment?: string | undefined;
}
const _DeclineSuggestedPostParamsPublicKeys = { chat_id: "chatId", message_id: "messageId" } as const;
const _DeclineSuggestedPostParamsWireKeys = invertKeys(_DeclineSuggestedPostParamsPublicKeys);
const _DeclineSuggestedPostParamsEncoded = Schema.Struct({
  chat_id: Schema.Int,
  message_id: Schema.Int,
  comment: Schema.optional(Schema.String),
});
const _DeclineSuggestedPostParamsDecoded = Schema.declare<DeclineSuggestedPostParams>((input): input is DeclineSuggestedPostParams => Predicate.isObject(input));
export const DeclineSuggestedPostParams: Schema.Codec<DeclineSuggestedPostParams, Readonly<Record<string, unknown>>> = _DeclineSuggestedPostParamsEncoded.pipe(
  Schema.decodeTo(_DeclineSuggestedPostParamsDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_DeclineSuggestedPostParamsPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_DeclineSuggestedPostParamsWireKeys)),
  }),
);

export const declineSuggestedPost = callMethod({
  method: "declineSuggestedPost",
  params: DeclineSuggestedPostParams,
  result: Schema.Literal(true),
  retrySafe: true,
});

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

/** Use this method to generate a new primary invite link for a chat; any previously generated primary link is revoked. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns the new invite link as String on success. */
export interface ExportChatInviteLinkParams {
  /** Unique identifier for the target chat or username of the target channel in the format @username */
  readonly chatId: number | string;
}
const _ExportChatInviteLinkParamsPublicKeys = { chat_id: "chatId" } as const;
const _ExportChatInviteLinkParamsWireKeys = invertKeys(_ExportChatInviteLinkParamsPublicKeys);
const _ExportChatInviteLinkParamsEncoded = Schema.Struct({
  chat_id: Schema.Union([Schema.Int, Schema.String]),
});
const _ExportChatInviteLinkParamsDecoded = Schema.declare<ExportChatInviteLinkParams>((input): input is ExportChatInviteLinkParams => Predicate.isObject(input));
export const ExportChatInviteLinkParams: Schema.Codec<ExportChatInviteLinkParams, Readonly<Record<string, unknown>>> = _ExportChatInviteLinkParamsEncoded.pipe(
  Schema.decodeTo(_ExportChatInviteLinkParamsDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_ExportChatInviteLinkParamsPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_ExportChatInviteLinkParamsWireKeys)),
  }),
);

export const exportChatInviteLink = callMethod({
  method: "exportChatInviteLink",
  params: ExportChatInviteLinkParams,
  result: Schema.String,
  retrySafe: false,
});

/** Use this method to forward messages of any kind. Service messages and messages with protected content can't be forwarded. On success, the sent Message is returned. */
export interface ForwardMessageParams {
  /** Unique identifier for the target chat or username of the target bot, supergroup or channel in the format @username */
  readonly chatId: number | string;
  /** Unique identifier for the target message thread (topic) of a forum; for forum supergroups and private chats of bots with forum topic mode enabled only */
  readonly messageThreadId?: number | undefined;
  /** Identifier of the direct messages topic to which the message will be forwarded; required if the message is forwarded to a direct messages chat */
  readonly directMessagesTopicId?: number | undefined;
  /** Unique identifier for the chat where the original message was sent (or username of the target bot, supergroup or channel in the format @username) */
  readonly fromChatId: number | string;
  /** New start timestamp for the forwarded video in the message */
  readonly videoStartTimestamp?: number | undefined;
  /** Sends the message silently. Users will receive a notification with no sound. */
  readonly disableNotification?: boolean | undefined;
  /** Protects the contents of the forwarded message from forwarding and saving */
  readonly protectContent?: boolean | undefined;
  /** Unique identifier of the message effect to be added to the message; only available when forwarding to private chats */
  readonly messageEffectId?: string | undefined;
  /** A JSON-serialized object containing the parameters of the suggested post to send; for direct messages chats only */
  readonly suggestedPostParameters?: Types.SuggestedPostParameters | undefined;
  /** Message identifier in the chat specified in from_chat_id */
  readonly messageId: number;
}
const _ForwardMessageParamsPublicKeys = { chat_id: "chatId", message_thread_id: "messageThreadId", direct_messages_topic_id: "directMessagesTopicId", from_chat_id: "fromChatId", video_start_timestamp: "videoStartTimestamp", disable_notification: "disableNotification", protect_content: "protectContent", message_effect_id: "messageEffectId", suggested_post_parameters: "suggestedPostParameters", message_id: "messageId" } as const;
const _ForwardMessageParamsWireKeys = invertKeys(_ForwardMessageParamsPublicKeys);
const _ForwardMessageParamsEncoded = Schema.Struct({
  chat_id: Schema.Union([Schema.Int, Schema.String]),
  message_thread_id: Schema.optional(Schema.Int),
  direct_messages_topic_id: Schema.optional(Schema.Int),
  from_chat_id: Schema.Union([Schema.Int, Schema.String]),
  video_start_timestamp: Schema.optional(Schema.Int),
  disable_notification: Schema.optional(Schema.Boolean),
  protect_content: Schema.optional(Schema.Boolean),
  message_effect_id: Schema.optional(Schema.String),
  suggested_post_parameters: Schema.optional(Schema.suspend((): Schema.Codec<Types.SuggestedPostParameters, unknown> => Types.SuggestedPostParameters)),
  message_id: Schema.Int,
});
const _ForwardMessageParamsDecoded = Schema.declare<ForwardMessageParams>((input): input is ForwardMessageParams => Predicate.isObject(input));
export const ForwardMessageParams: Schema.Codec<ForwardMessageParams, Readonly<Record<string, unknown>>> = _ForwardMessageParamsEncoded.pipe(
  Schema.decodeTo(_ForwardMessageParamsDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_ForwardMessageParamsPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_ForwardMessageParamsWireKeys)),
  }),
);

export const forwardMessage = callMethod({
  method: "forwardMessage",
  params: ForwardMessageParams,
  result: Schema.suspend((): Schema.Codec<Types.Message, unknown> => Types.Message),
  retrySafe: false,
});

/** Use this method to forward multiple messages of any kind. If some of the specified messages can't be found or forwarded, they are skipped. Service messages and messages with protected content can't be forwarded. Album grouping is kept for forwarded messages. On success, an Array of MessageId of the sent messages is returned. */
export interface ForwardMessagesParams {
  /** Unique identifier for the target chat or username of the target bot, supergroup or channel in the format @username */
  readonly chatId: number | string;
  /** Unique identifier for the target message thread (topic) of a forum; for forum supergroups and private chats of bots with forum topic mode enabled only */
  readonly messageThreadId?: number | undefined;
  /** Identifier of the direct messages topic to which the messages will be forwarded; required if the messages are forwarded to a direct messages chat */
  readonly directMessagesTopicId?: number | undefined;
  /** Unique identifier for the chat where the original messages were sent (or username of the target bot, supergroup or channel in the format @username) */
  readonly fromChatId: number | string;
  /** A JSON-serialized list of 1-100 identifiers of messages in the chat from_chat_id to forward. The identifiers must be specified in a strictly increasing order. */
  readonly messageIds: ReadonlyArray<number>;
  /** Sends the messages silently. Users will receive a notification with no sound. */
  readonly disableNotification?: boolean | undefined;
  /** Protects the contents of the forwarded messages from forwarding and saving */
  readonly protectContent?: boolean | undefined;
}
const _ForwardMessagesParamsPublicKeys = { chat_id: "chatId", message_thread_id: "messageThreadId", direct_messages_topic_id: "directMessagesTopicId", from_chat_id: "fromChatId", message_ids: "messageIds", disable_notification: "disableNotification", protect_content: "protectContent" } as const;
const _ForwardMessagesParamsWireKeys = invertKeys(_ForwardMessagesParamsPublicKeys);
const _ForwardMessagesParamsEncoded = Schema.Struct({
  chat_id: Schema.Union([Schema.Int, Schema.String]),
  message_thread_id: Schema.optional(Schema.Int),
  direct_messages_topic_id: Schema.optional(Schema.Int),
  from_chat_id: Schema.Union([Schema.Int, Schema.String]),
  message_ids: Schema.Array(Schema.Int),
  disable_notification: Schema.optional(Schema.Boolean),
  protect_content: Schema.optional(Schema.Boolean),
});
const _ForwardMessagesParamsDecoded = Schema.declare<ForwardMessagesParams>((input): input is ForwardMessagesParams => Predicate.isObject(input));
export const ForwardMessagesParams: Schema.Codec<ForwardMessagesParams, Readonly<Record<string, unknown>>> = _ForwardMessagesParamsEncoded.pipe(
  Schema.decodeTo(_ForwardMessagesParamsDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_ForwardMessagesParamsPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_ForwardMessagesParamsWireKeys)),
  }),
);

export const forwardMessages = callMethod({
  method: "forwardMessages",
  params: ForwardMessagesParams,
  result: Schema.Array(Schema.suspend((): Schema.Codec<Types.MessageId, unknown> => Types.MessageId)),
  retrySafe: false,
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
export const GetStarTransactionsParams: Schema.Codec<GetStarTransactionsParams, Readonly<Record<string, unknown>>> = Schema.Struct({
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
export const GetStickerSetParams: Schema.Codec<GetStickerSetParams, Readonly<Record<string, unknown>>> = Schema.Struct({
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

/** Gifts a Telegram Premium subscription to the given user. Returns True on success. */
export interface GiftPremiumSubscriptionParams {
  /** Unique identifier of the target user who will receive a Telegram Premium subscription */
  readonly userId: number;
  /** Number of months the Telegram Premium subscription will be active for the user; must be one of 3, 6, or 12 */
  readonly monthCount: number;
  /** Number of Telegram Stars to pay for the Telegram Premium subscription; must be 1000 for 3 months, 1500 for 6 months, and 2500 for 12 months */
  readonly starCount: number;
  /** Text that will be shown along with the service message about the subscription; 0-128 characters */
  readonly text?: string | undefined;
  /** Mode for parsing entities in the text. See formatting options for more details. Entities other than “bold”, “italic”, “underline”, “strikethrough”, “spoiler”, “custom_emoji”, and “date_time” are ignored. */
  readonly textParseMode?: Types.ParseMode | undefined;
  /** A JSON-serialized list of special entities that appear in the gift text. It can be specified instead of text_parse_mode. Entities other than “bold”, “italic”, “underline”, “strikethrough”, “spoiler”, “custom_emoji”, and “date_time” are ignored. */
  readonly textEntities?: ReadonlyArray<Types.MessageEntity> | undefined;
}
const _GiftPremiumSubscriptionParamsPublicKeys = { user_id: "userId", month_count: "monthCount", star_count: "starCount", text_parse_mode: "textParseMode", text_entities: "textEntities" } as const;
const _GiftPremiumSubscriptionParamsWireKeys = invertKeys(_GiftPremiumSubscriptionParamsPublicKeys);
const _GiftPremiumSubscriptionParamsEncoded = Schema.Struct({
  user_id: Schema.Int,
  month_count: Schema.Int,
  star_count: Schema.Int,
  text: Schema.optional(Schema.String),
  text_parse_mode: Schema.optional(Schema.suspend((): Schema.Codec<Types.ParseMode, unknown> => Types.ParseMode)),
  text_entities: Schema.optional(Schema.Array(Schema.suspend((): Schema.Codec<Types.MessageEntity, unknown> => Types.MessageEntity))),
});
const _GiftPremiumSubscriptionParamsDecoded = Schema.declare<GiftPremiumSubscriptionParams>((input): input is GiftPremiumSubscriptionParams => Predicate.isObject(input));
export const GiftPremiumSubscriptionParams: Schema.Codec<GiftPremiumSubscriptionParams, Readonly<Record<string, unknown>>> = _GiftPremiumSubscriptionParamsEncoded.pipe(
  Schema.decodeTo(_GiftPremiumSubscriptionParamsDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_GiftPremiumSubscriptionParamsPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_GiftPremiumSubscriptionParamsWireKeys)),
  }),
);

export const giftPremiumSubscription = callMethod({
  method: "giftPremiumSubscription",
  params: GiftPremiumSubscriptionParams,
  result: Schema.Literal(true),
  retrySafe: false,
});

/** Use this method to add a message to the list of pinned messages in a chat. In private chats and channel direct messages chats, all non-service messages can be pinned. Conversely, the bot must be an administrator with the 'can_pin_messages' right or the 'can_edit_messages' right to pin messages in groups and channels respectively. Returns True on success. */
export interface PinChatMessageParams {
  /** Unique identifier of the business connection on behalf of which the message will be pinned */
  readonly businessConnectionId?: string | undefined;
  /** Unique identifier for the target chat or username of the target channel in the format @username */
  readonly chatId: number | string;
  /** Identifier of a message to pin */
  readonly messageId: number;
  /** Pass True if it is not necessary to send a notification to all chat members about the new pinned message. Notifications are always disabled in channels and private chats. */
  readonly disableNotification?: boolean | undefined;
}
const _PinChatMessageParamsPublicKeys = { business_connection_id: "businessConnectionId", chat_id: "chatId", message_id: "messageId", disable_notification: "disableNotification" } as const;
const _PinChatMessageParamsWireKeys = invertKeys(_PinChatMessageParamsPublicKeys);
const _PinChatMessageParamsEncoded = Schema.Struct({
  business_connection_id: Schema.optional(Schema.String),
  chat_id: Schema.Union([Schema.Int, Schema.String]),
  message_id: Schema.Int,
  disable_notification: Schema.optional(Schema.Boolean),
});
const _PinChatMessageParamsDecoded = Schema.declare<PinChatMessageParams>((input): input is PinChatMessageParams => Predicate.isObject(input));
export const PinChatMessageParams: Schema.Codec<PinChatMessageParams, Readonly<Record<string, unknown>>> = _PinChatMessageParamsEncoded.pipe(
  Schema.decodeTo(_PinChatMessageParamsDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_PinChatMessageParamsPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_PinChatMessageParamsWireKeys)),
  }),
);

export const pinChatMessage = callMethod({
  method: "pinChatMessage",
  params: PinChatMessageParams,
  result: Schema.Literal(true),
  retrySafe: false,
});

/** Posts a story on behalf of a managed business account. Requires the can_manage_stories business bot right. Returns Story on success. */
export interface PostStoryParams {
  /** Unique identifier of the business connection */
  readonly businessConnectionId: string;
  /** Content of the story */
  readonly content: Types.InputStoryContent;
  /** Period after which the story is moved to the archive, in seconds; must be one of 6 * 3600, 12 * 3600, 86400, or 2 * 86400 */
  readonly activePeriod: number;
  /** Caption of the story, 0-2048 characters after entities parsing */
  readonly caption?: string | undefined;
  /** Mode for parsing entities in the story caption. See formatting options for more details. */
  readonly parseMode?: Types.ParseMode | undefined;
  /** A JSON-serialized list of special entities that appear in the caption, which can be specified instead of parse_mode */
  readonly captionEntities?: ReadonlyArray<Types.MessageEntity> | undefined;
  /** A JSON-serialized list of clickable areas to be shown on the story */
  readonly areas?: ReadonlyArray<Types.StoryArea> | undefined;
  /** Pass True to keep the story accessible after it expires */
  readonly postToChatPage?: boolean | undefined;
  /** Pass True if the content of the story must be protected from forwarding and screenshotting */
  readonly protectContent?: boolean | undefined;
}
const _PostStoryParamsPublicKeys = { business_connection_id: "businessConnectionId", active_period: "activePeriod", parse_mode: "parseMode", caption_entities: "captionEntities", post_to_chat_page: "postToChatPage", protect_content: "protectContent" } as const;
const _PostStoryParamsWireKeys = invertKeys(_PostStoryParamsPublicKeys);
const _PostStoryParamsEncoded = Schema.Struct({
  business_connection_id: Schema.String,
  content: Schema.suspend((): Schema.Codec<Types.InputStoryContent, unknown> => Types.InputStoryContent),
  active_period: Schema.Int,
  caption: Schema.optional(Schema.String),
  parse_mode: Schema.optional(Schema.suspend((): Schema.Codec<Types.ParseMode, unknown> => Types.ParseMode)),
  caption_entities: Schema.optional(Schema.Array(Schema.suspend((): Schema.Codec<Types.MessageEntity, unknown> => Types.MessageEntity))),
  areas: Schema.optional(Schema.Array(Schema.suspend((): Schema.Codec<Types.StoryArea, unknown> => Types.StoryArea))),
  post_to_chat_page: Schema.optional(Schema.Boolean),
  protect_content: Schema.optional(Schema.Boolean),
});
const _PostStoryParamsDecoded = Schema.declare<PostStoryParams>((input): input is PostStoryParams => Predicate.isObject(input));
export const PostStoryParams: Schema.Codec<PostStoryParams, Readonly<Record<string, unknown>>> = _PostStoryParamsEncoded.pipe(
  Schema.decodeTo(_PostStoryParamsDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_PostStoryParamsPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_PostStoryParamsWireKeys)),
  }),
);

export const postStory = callMethod({
  method: "postStory",
  params: PostStoryParams,
  result: Schema.suspend((): Schema.Codec<Types.Story, unknown> => Types.Story),
  retrySafe: false,
});

/** Use this method to revoke the current token of a managed bot and generate a new one. Returns the new token as String on success. */
export interface ReplaceManagedBotTokenParams {
  /** User identifier of the managed bot whose token will be replaced */
  readonly userId: number;
}
const _ReplaceManagedBotTokenParamsPublicKeys = { user_id: "userId" } as const;
const _ReplaceManagedBotTokenParamsWireKeys = invertKeys(_ReplaceManagedBotTokenParamsPublicKeys);
const _ReplaceManagedBotTokenParamsEncoded = Schema.Struct({
  user_id: Schema.Int,
});
const _ReplaceManagedBotTokenParamsDecoded = Schema.declare<ReplaceManagedBotTokenParams>((input): input is ReplaceManagedBotTokenParams => Predicate.isObject(input));
export const ReplaceManagedBotTokenParams: Schema.Codec<ReplaceManagedBotTokenParams, Readonly<Record<string, unknown>>> = _ReplaceManagedBotTokenParamsEncoded.pipe(
  Schema.decodeTo(_ReplaceManagedBotTokenParamsDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_ReplaceManagedBotTokenParamsPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_ReplaceManagedBotTokenParamsWireKeys)),
  }),
);

export const replaceManagedBotToken = callMethod({
  method: "replaceManagedBotToken",
  params: ReplaceManagedBotTokenParams,
  result: Schema.RedactedFromValue(Schema.String, { label: "Telegram bot token" }),
  retrySafe: false,
});

/** Reposts a story on behalf of a business account from another business account. Both business accounts must be managed by the same bot, and the story on the source account must have been posted (or reposted) by the bot. Requires the can_manage_stories business bot right for both business accounts. Returns Story on success. */
export interface RepostStoryParams {
  /** Unique identifier of the business connection */
  readonly businessConnectionId: string;
  /** Unique identifier of the chat which posted the story that should be reposted */
  readonly fromChatId: number;
  /** Unique identifier of the story that should be reposted */
  readonly fromStoryId: number;
  /** Period after which the story is moved to the archive, in seconds; must be one of 6 * 3600, 12 * 3600, 86400, or 2 * 86400 */
  readonly activePeriod: number;
  /** Pass True to keep the story accessible after it expires */
  readonly postToChatPage?: boolean | undefined;
  /** Pass True if the content of the story must be protected from forwarding and screenshotting */
  readonly protectContent?: boolean | undefined;
}
const _RepostStoryParamsPublicKeys = { business_connection_id: "businessConnectionId", from_chat_id: "fromChatId", from_story_id: "fromStoryId", active_period: "activePeriod", post_to_chat_page: "postToChatPage", protect_content: "protectContent" } as const;
const _RepostStoryParamsWireKeys = invertKeys(_RepostStoryParamsPublicKeys);
const _RepostStoryParamsEncoded = Schema.Struct({
  business_connection_id: Schema.String,
  from_chat_id: Schema.Int,
  from_story_id: Schema.Int,
  active_period: Schema.Int,
  post_to_chat_page: Schema.optional(Schema.Boolean),
  protect_content: Schema.optional(Schema.Boolean),
});
const _RepostStoryParamsDecoded = Schema.declare<RepostStoryParams>((input): input is RepostStoryParams => Predicate.isObject(input));
export const RepostStoryParams: Schema.Codec<RepostStoryParams, Readonly<Record<string, unknown>>> = _RepostStoryParamsEncoded.pipe(
  Schema.decodeTo(_RepostStoryParamsDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_RepostStoryParamsPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_RepostStoryParamsWireKeys)),
  }),
);

export const repostStory = callMethod({
  method: "repostStory",
  params: RepostStoryParams,
  result: Schema.suspend((): Schema.Codec<Types.Story, unknown> => Types.Story),
  retrySafe: false,
});

/** Stores a message that can be sent by a user of a Mini App. Returns a PreparedInlineMessage object. */
export interface SavePreparedInlineMessageParams {
  /** Unique identifier of the target user that can use the prepared message */
  readonly userId: number;
  /** A JSON-serialized object describing the message to be sent */
  readonly result: Types.InlineQueryResult;
  /** Pass True if the message can be sent to private chats with users */
  readonly allowUserChats?: boolean | undefined;
  /** Pass True if the message can be sent to private chats with bots */
  readonly allowBotChats?: boolean | undefined;
  /** Pass True if the message can be sent to group and supergroup chats */
  readonly allowGroupChats?: boolean | undefined;
  /** Pass True if the message can be sent to channel chats */
  readonly allowChannelChats?: boolean | undefined;
}
const _SavePreparedInlineMessageParamsPublicKeys = { user_id: "userId", allow_user_chats: "allowUserChats", allow_bot_chats: "allowBotChats", allow_group_chats: "allowGroupChats", allow_channel_chats: "allowChannelChats" } as const;
const _SavePreparedInlineMessageParamsWireKeys = invertKeys(_SavePreparedInlineMessageParamsPublicKeys);
const _SavePreparedInlineMessageParamsEncoded = Schema.Struct({
  user_id: Schema.Int,
  result: Schema.suspend((): Schema.Codec<Types.InlineQueryResult, unknown> => Types.InlineQueryResult),
  allow_user_chats: Schema.optional(Schema.Boolean),
  allow_bot_chats: Schema.optional(Schema.Boolean),
  allow_group_chats: Schema.optional(Schema.Boolean),
  allow_channel_chats: Schema.optional(Schema.Boolean),
});
const _SavePreparedInlineMessageParamsDecoded = Schema.declare<SavePreparedInlineMessageParams>((input): input is SavePreparedInlineMessageParams => Predicate.isObject(input));
export const SavePreparedInlineMessageParams: Schema.Codec<SavePreparedInlineMessageParams, Readonly<Record<string, unknown>>> = _SavePreparedInlineMessageParamsEncoded.pipe(
  Schema.decodeTo(_SavePreparedInlineMessageParamsDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_SavePreparedInlineMessageParamsPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_SavePreparedInlineMessageParamsWireKeys)),
  }),
);

export const savePreparedInlineMessage = callMethod({
  method: "savePreparedInlineMessage",
  params: SavePreparedInlineMessageParams,
  result: Schema.suspend((): Schema.Codec<Types.PreparedInlineMessage, unknown> => Types.PreparedInlineMessage),
  retrySafe: false,
});

/** Stores a keyboard button that can be used by a user within a Mini App. Returns a PreparedKeyboardButton object. */
export interface SavePreparedKeyboardButtonParams {
  /** Unique identifier of the target user that can use the button */
  readonly userId: number;
  /** A JSON-serialized object describing the button to be saved. The button must be of the type request_users, request_chat, or request_managed_bot. */
  readonly button: Types.KeyboardButton;
}
const _SavePreparedKeyboardButtonParamsPublicKeys = { user_id: "userId" } as const;
const _SavePreparedKeyboardButtonParamsWireKeys = invertKeys(_SavePreparedKeyboardButtonParamsPublicKeys);
const _SavePreparedKeyboardButtonParamsEncoded = Schema.Struct({
  user_id: Schema.Int,
  button: Schema.suspend((): Schema.Codec<Types.KeyboardButton, unknown> => Types.KeyboardButton),
});
const _SavePreparedKeyboardButtonParamsDecoded = Schema.declare<SavePreparedKeyboardButtonParams>((input): input is SavePreparedKeyboardButtonParams => Predicate.isObject(input));
export const SavePreparedKeyboardButtonParams: Schema.Codec<SavePreparedKeyboardButtonParams, Readonly<Record<string, unknown>>> = _SavePreparedKeyboardButtonParamsEncoded.pipe(
  Schema.decodeTo(_SavePreparedKeyboardButtonParamsDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_SavePreparedKeyboardButtonParamsPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_SavePreparedKeyboardButtonParamsWireKeys)),
  }),
);

export const savePreparedKeyboardButton = callMethod({
  method: "savePreparedKeyboardButton",
  params: SavePreparedKeyboardButtonParams,
  result: Schema.suspend((): Schema.Codec<Types.PreparedKeyboardButton, unknown> => Types.PreparedKeyboardButton),
  retrySafe: false,
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

/** Use this method to process a received chat join request query by showing a Mini App to the user before deciding the outcome. Call answerChatJoinRequestQuery to resolve the join request query based on the user interaction with the Mini App. Returns True on success. */
export interface SendChatJoinRequestWebAppParams {
  /** Unique identifier of the join request query */
  readonly chatJoinRequestQueryId: string;
  /** An HTTPS URL of a Web App to be opened with additional data as specified in Initializing Web Apps */
  readonly webAppUrl: string;
}
const _SendChatJoinRequestWebAppParamsPublicKeys = { chat_join_request_query_id: "chatJoinRequestQueryId", web_app_url: "webAppUrl" } as const;
const _SendChatJoinRequestWebAppParamsWireKeys = invertKeys(_SendChatJoinRequestWebAppParamsPublicKeys);
const _SendChatJoinRequestWebAppParamsEncoded = Schema.Struct({
  chat_join_request_query_id: Schema.String,
  web_app_url: Schema.String,
});
const _SendChatJoinRequestWebAppParamsDecoded = Schema.declare<SendChatJoinRequestWebAppParams>((input): input is SendChatJoinRequestWebAppParams => Predicate.isObject(input));
export const SendChatJoinRequestWebAppParams: Schema.Codec<SendChatJoinRequestWebAppParams, Readonly<Record<string, unknown>>> = _SendChatJoinRequestWebAppParamsEncoded.pipe(
  Schema.decodeTo(_SendChatJoinRequestWebAppParamsDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_SendChatJoinRequestWebAppParamsPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_SendChatJoinRequestWebAppParamsWireKeys)),
  }),
);

export const sendChatJoinRequestWebApp = callMethod({
  method: "sendChatJoinRequestWebApp",
  params: SendChatJoinRequestWebAppParams,
  result: Schema.Literal(true),
  retrySafe: false,
});

/** Use this method to send a checklist on behalf of a connected business account. On success, the sent Message is returned. */
export interface SendChecklistParams {
  /** Unique identifier of the business connection on behalf of which the message will be sent */
  readonly businessConnectionId: string;
  /** Unique identifier for the target chat or username of the target bot in the format @username */
  readonly chatId: number | string;
  /** A JSON-serialized object for the checklist to send */
  readonly checklist: Types.InputChecklist;
  /** Sends the message silently. Users will receive a notification with no sound. */
  readonly disableNotification?: boolean | undefined;
  /** Protects the contents of the sent message from forwarding and saving */
  readonly protectContent?: boolean | undefined;
  /** Unique identifier of the message effect to be added to the message */
  readonly messageEffectId?: string | undefined;
  /** A JSON-serialized object for description of the message to reply to */
  readonly replyParameters?: Types.ReplyParameters | undefined;
  /** A JSON-serialized object for an inline keyboard */
  readonly replyMarkup?: Types.InlineKeyboardMarkup | undefined;
}
const _SendChecklistParamsPublicKeys = { business_connection_id: "businessConnectionId", chat_id: "chatId", disable_notification: "disableNotification", protect_content: "protectContent", message_effect_id: "messageEffectId", reply_parameters: "replyParameters", reply_markup: "replyMarkup" } as const;
const _SendChecklistParamsWireKeys = invertKeys(_SendChecklistParamsPublicKeys);
const _SendChecklistParamsEncoded = Schema.Struct({
  business_connection_id: Schema.String,
  chat_id: Schema.Union([Schema.Int, Schema.String]),
  checklist: Schema.suspend((): Schema.Codec<Types.InputChecklist, unknown> => Types.InputChecklist),
  disable_notification: Schema.optional(Schema.Boolean),
  protect_content: Schema.optional(Schema.Boolean),
  message_effect_id: Schema.optional(Schema.String),
  reply_parameters: Schema.optional(Schema.suspend((): Schema.Codec<Types.ReplyParameters, unknown> => Types.ReplyParameters)),
  reply_markup: Schema.optional(Schema.suspend((): Schema.Codec<Types.InlineKeyboardMarkup, unknown> => Types.InlineKeyboardMarkup)),
});
const _SendChecklistParamsDecoded = Schema.declare<SendChecklistParams>((input): input is SendChecklistParams => Predicate.isObject(input));
export const SendChecklistParams: Schema.Codec<SendChecklistParams, Readonly<Record<string, unknown>>> = _SendChecklistParamsEncoded.pipe(
  Schema.decodeTo(_SendChecklistParamsDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_SendChecklistParamsPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_SendChecklistParamsWireKeys)),
  }),
);

export const sendChecklist = callMethod({
  method: "sendChecklist",
  params: SendChecklistParams,
  result: Schema.suspend((): Schema.Codec<Types.Message, unknown> => Types.Message),
  retrySafe: false,
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

/** Use this method to send a game. On success, the sent Message is returned. */
export interface SendGameParams {
  /** Unique identifier of the business connection on behalf of which the message will be sent */
  readonly businessConnectionId?: string | undefined;
  /** Unique identifier for the target chat or username of the target bot in the format @username. Games can't be sent to channel direct messages chats and channel chats. */
  readonly chatId: number | string;
  /** Unique identifier for the target message thread (topic) of a forum; for forum supergroups and private chats of bots with forum topic mode enabled only */
  readonly messageThreadId?: number | undefined;
  /** Short name of the game, serves as the unique identifier for the game. Set up your games via @BotFather. */
  readonly gameShortName: string;
  /** Sends the message silently. Users will receive a notification with no sound. */
  readonly disableNotification?: boolean | undefined;
  /** Protects the contents of the sent message from forwarding and saving */
  readonly protectContent?: boolean | undefined;
  /** Pass True to allow up to 1000 messages per second, ignoring broadcasting limits for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot's balance. */
  readonly allowPaidBroadcast?: boolean | undefined;
  /** Unique identifier of the message effect to be added to the message; for private chats only */
  readonly messageEffectId?: string | undefined;
  /** Description of the message to reply to */
  readonly replyParameters?: Types.ReplyParameters | undefined;
  /** A JSON-serialized object for an inline keyboard. If empty, one 'Play game_title' button will be shown. If not empty, the first button must launch the game. */
  readonly replyMarkup?: Types.InlineKeyboardMarkup | undefined;
}
const _SendGameParamsPublicKeys = { business_connection_id: "businessConnectionId", chat_id: "chatId", message_thread_id: "messageThreadId", game_short_name: "gameShortName", disable_notification: "disableNotification", protect_content: "protectContent", allow_paid_broadcast: "allowPaidBroadcast", message_effect_id: "messageEffectId", reply_parameters: "replyParameters", reply_markup: "replyMarkup" } as const;
const _SendGameParamsWireKeys = invertKeys(_SendGameParamsPublicKeys);
const _SendGameParamsEncoded = Schema.Struct({
  business_connection_id: Schema.optional(Schema.String),
  chat_id: Schema.Union([Schema.Int, Schema.String]),
  message_thread_id: Schema.optional(Schema.Int),
  game_short_name: Schema.String,
  disable_notification: Schema.optional(Schema.Boolean),
  protect_content: Schema.optional(Schema.Boolean),
  allow_paid_broadcast: Schema.optional(Schema.Boolean),
  message_effect_id: Schema.optional(Schema.String),
  reply_parameters: Schema.optional(Schema.suspend((): Schema.Codec<Types.ReplyParameters, unknown> => Types.ReplyParameters)),
  reply_markup: Schema.optional(Schema.suspend((): Schema.Codec<Types.InlineKeyboardMarkup, unknown> => Types.InlineKeyboardMarkup)),
});
const _SendGameParamsDecoded = Schema.declare<SendGameParams>((input): input is SendGameParams => Predicate.isObject(input));
export const SendGameParams: Schema.Codec<SendGameParams, Readonly<Record<string, unknown>>> = _SendGameParamsEncoded.pipe(
  Schema.decodeTo(_SendGameParamsDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_SendGameParamsPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_SendGameParamsWireKeys)),
  }),
);

export const sendGame = callMethod({
  method: "sendGame",
  params: SendGameParams,
  result: Schema.suspend((): Schema.Codec<Types.Message, unknown> => Types.Message),
  retrySafe: false,
});

/** Sends a gift to the given user or channel chat. The gift can't be converted to Telegram Stars by the receiver. Returns True on success. */
export interface SendGiftParams {
  /** Required if chat_id is not specified. Unique identifier of the target user who will receive the gift. */
  readonly userId?: number | undefined;
  /** Required if user_id is not specified. Unique identifier for the chat or username of the channel (in the format @username) that will receive the gift. */
  readonly chatId?: number | string | undefined;
  /** Identifier of the gift; limited gifts can't be sent to channel chats */
  readonly giftId: string;
  /** Pass True to pay for the gift upgrade from the bot's balance, thereby making the upgrade free for the receiver */
  readonly payForUpgrade?: boolean | undefined;
  /** Text that will be shown along with the gift; 0-128 characters */
  readonly text?: string | undefined;
  /** Mode for parsing entities in the text. See formatting options for more details. Entities other than “bold”, “italic”, “underline”, “strikethrough”, “spoiler”, “custom_emoji”, and “date_time” are ignored. */
  readonly textParseMode?: Types.ParseMode | undefined;
  /** A JSON-serialized list of special entities that appear in the gift text. It can be specified instead of text_parse_mode. Entities other than “bold”, “italic”, “underline”, “strikethrough”, “spoiler”, “custom_emoji”, and “date_time” are ignored. */
  readonly textEntities?: ReadonlyArray<Types.MessageEntity> | undefined;
}
const _SendGiftParamsPublicKeys = { user_id: "userId", chat_id: "chatId", gift_id: "giftId", pay_for_upgrade: "payForUpgrade", text_parse_mode: "textParseMode", text_entities: "textEntities" } as const;
const _SendGiftParamsWireKeys = invertKeys(_SendGiftParamsPublicKeys);
const _SendGiftParamsEncoded = Schema.Struct({
  user_id: Schema.optional(Schema.Int),
  chat_id: Schema.optional(Schema.Union([Schema.Int, Schema.String])),
  gift_id: Schema.String,
  pay_for_upgrade: Schema.optional(Schema.Boolean),
  text: Schema.optional(Schema.String),
  text_parse_mode: Schema.optional(Schema.suspend((): Schema.Codec<Types.ParseMode, unknown> => Types.ParseMode)),
  text_entities: Schema.optional(Schema.Array(Schema.suspend((): Schema.Codec<Types.MessageEntity, unknown> => Types.MessageEntity))),
});
const _SendGiftParamsDecoded = Schema.declare<SendGiftParams>((input): input is SendGiftParams => Predicate.isObject(input));
export const SendGiftParams: Schema.Codec<SendGiftParams, Readonly<Record<string, unknown>>> = _SendGiftParamsEncoded.pipe(
  Schema.decodeTo(_SendGiftParamsDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_SendGiftParamsPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_SendGiftParamsWireKeys)),
  }),
);

export const sendGift = callMethod({
  method: "sendGift",
  params: SendGiftParams,
  result: Schema.Literal(true),
  retrySafe: false,
});

/** Use this method to send invoices. On success, the sent Message is returned. */
export interface SendInvoiceParams {
  /** Unique identifier for the target chat or username of the target bot, supergroup or channel in the format @username */
  readonly chatId: number | string;
  /** Unique identifier for the target message thread (topic) of a forum; for forum supergroups and private chats of bots with forum topic mode enabled only */
  readonly messageThreadId?: number | undefined;
  /** Identifier of the direct messages topic to which the message will be sent; required if the message is sent to a direct messages chat */
  readonly directMessagesTopicId?: number | undefined;
  /** Product name, 1-32 characters */
  readonly title: string;
  /** Product description, 1-255 characters */
  readonly description: string;
  /** Bot-defined invoice payload, 1-128 bytes. This will not be displayed to the user, use it for your internal processes. */
  readonly payload: string;
  /** Payment provider token, obtained via @BotFather. Pass an empty string for payments in Telegram Stars. */
  readonly providerToken?: string | undefined;
  /** Three-letter ISO 4217 currency code, see more on currencies. Pass “XTR” for payments in Telegram Stars. */
  readonly currency: string;
  /** Price breakdown, a JSON-serialized list of components (e.g. product price, tax, discount, delivery cost, delivery tax, bonus, etc.). Must contain exactly one item for payments in Telegram Stars. */
  readonly prices: ReadonlyArray<Types.LabeledPrice>;
  /** The maximum accepted amount for tips in the smallest units of the currency (integer, not float/double). For example, for a maximum tip of US$ 1.45 pass max_tip_amount = 145. See the exp parameter in currencies.json, it shows the number of digits past the decimal point for each currency (2 for the majority of currencies). Defaults to 0. Not supported for payments in Telegram Stars. */
  readonly maxTipAmount?: number | undefined;
  /** A JSON-serialized Array of suggested amounts of tips in the smallest units of the currency (integer, not float/double). At most 4 suggested tip amounts can be specified. The suggested tip amounts must be positive, passed in a strictly increased order and must not exceed max_tip_amount. */
  readonly suggestedTipAmounts?: ReadonlyArray<number> | undefined;
  /** Unique deep-linking parameter. If left empty, forwarded copies of the sent message will have a Pay button, allowing multiple users to pay directly from the forwarded message, using the same invoice. If non-empty, forwarded copies of the sent message will have a URL button with a deep link to the bot (instead of a Pay button), with the value used as the start parameter. */
  readonly startParameter?: string | undefined;
  /** JSON-serialized data about the invoice, which will be shared with the payment provider. A detailed description of required fields should be provided by the payment provider. */
  readonly providerData?: string | undefined;
  /** URL of the product photo for the invoice. Can be a photo of the goods or a marketing image for a service. People like it better when they see what they are paying for. */
  readonly photoUrl?: string | undefined;
  /** Photo size in bytes */
  readonly photoSize?: number | undefined;
  /** Photo width */
  readonly photoWidth?: number | undefined;
  /** Photo height */
  readonly photoHeight?: number | undefined;
  /** Pass True if you require the user's full name to complete the order. Ignored for payments in Telegram Stars. */
  readonly needName?: boolean | undefined;
  /** Pass True if you require the user's phone number to complete the order. Ignored for payments in Telegram Stars. */
  readonly needPhoneNumber?: boolean | undefined;
  /** Pass True if you require the user's email address to complete the order. Ignored for payments in Telegram Stars. */
  readonly needEmail?: boolean | undefined;
  /** Pass True if you require the user's shipping address to complete the order. Ignored for payments in Telegram Stars. */
  readonly needShippingAddress?: boolean | undefined;
  /** Pass True if the user's phone number should be sent to the provider. Ignored for payments in Telegram Stars. */
  readonly sendPhoneNumberToProvider?: boolean | undefined;
  /** Pass True if the user's email address should be sent to the provider. Ignored for payments in Telegram Stars. */
  readonly sendEmailToProvider?: boolean | undefined;
  /** Pass True if the final price depends on the shipping method. Ignored for payments in Telegram Stars. */
  readonly isFlexible?: boolean | undefined;
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
  /** A JSON-serialized object for an inline keyboard. If empty, one 'Pay total price' button will be shown. If not empty, the first button must be a Pay button. */
  readonly replyMarkup?: Types.InlineKeyboardMarkup | undefined;
}
const _SendInvoiceParamsPublicKeys = { chat_id: "chatId", message_thread_id: "messageThreadId", direct_messages_topic_id: "directMessagesTopicId", provider_token: "providerToken", max_tip_amount: "maxTipAmount", suggested_tip_amounts: "suggestedTipAmounts", start_parameter: "startParameter", provider_data: "providerData", photo_url: "photoUrl", photo_size: "photoSize", photo_width: "photoWidth", photo_height: "photoHeight", need_name: "needName", need_phone_number: "needPhoneNumber", need_email: "needEmail", need_shipping_address: "needShippingAddress", send_phone_number_to_provider: "sendPhoneNumberToProvider", send_email_to_provider: "sendEmailToProvider", is_flexible: "isFlexible", disable_notification: "disableNotification", protect_content: "protectContent", allow_paid_broadcast: "allowPaidBroadcast", message_effect_id: "messageEffectId", suggested_post_parameters: "suggestedPostParameters", reply_parameters: "replyParameters", reply_markup: "replyMarkup" } as const;
const _SendInvoiceParamsWireKeys = invertKeys(_SendInvoiceParamsPublicKeys);
const _SendInvoiceParamsEncoded = Schema.Struct({
  chat_id: Schema.Union([Schema.Int, Schema.String]),
  message_thread_id: Schema.optional(Schema.Int),
  direct_messages_topic_id: Schema.optional(Schema.Int),
  title: Schema.String,
  description: Schema.String,
  payload: Schema.String,
  provider_token: Schema.optional(Schema.String),
  currency: Schema.String,
  prices: Schema.Array(Schema.suspend((): Schema.Codec<Types.LabeledPrice, unknown> => Types.LabeledPrice)),
  max_tip_amount: Schema.optional(Schema.Int),
  suggested_tip_amounts: Schema.optional(Schema.Array(Schema.Int)),
  start_parameter: Schema.optional(Schema.String),
  provider_data: Schema.optional(Schema.String),
  photo_url: Schema.optional(Schema.String),
  photo_size: Schema.optional(Schema.Int),
  photo_width: Schema.optional(Schema.Int),
  photo_height: Schema.optional(Schema.Int),
  need_name: Schema.optional(Schema.Boolean),
  need_phone_number: Schema.optional(Schema.Boolean),
  need_email: Schema.optional(Schema.Boolean),
  need_shipping_address: Schema.optional(Schema.Boolean),
  send_phone_number_to_provider: Schema.optional(Schema.Boolean),
  send_email_to_provider: Schema.optional(Schema.Boolean),
  is_flexible: Schema.optional(Schema.Boolean),
  disable_notification: Schema.optional(Schema.Boolean),
  protect_content: Schema.optional(Schema.Boolean),
  allow_paid_broadcast: Schema.optional(Schema.Boolean),
  message_effect_id: Schema.optional(Schema.String),
  suggested_post_parameters: Schema.optional(Schema.suspend((): Schema.Codec<Types.SuggestedPostParameters, unknown> => Types.SuggestedPostParameters)),
  reply_parameters: Schema.optional(Schema.suspend((): Schema.Codec<Types.ReplyParameters, unknown> => Types.ReplyParameters)),
  reply_markup: Schema.optional(Schema.suspend((): Schema.Codec<Types.InlineKeyboardMarkup, unknown> => Types.InlineKeyboardMarkup)),
});
const _SendInvoiceParamsDecoded = Schema.declare<SendInvoiceParams>((input): input is SendInvoiceParams => Predicate.isObject(input));
export const SendInvoiceParams: Schema.Codec<SendInvoiceParams, Readonly<Record<string, unknown>>> = _SendInvoiceParamsEncoded.pipe(
  Schema.decodeTo(_SendInvoiceParamsDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_SendInvoiceParamsPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_SendInvoiceParamsWireKeys)),
  }),
);

export const sendInvoice = callMethod({
  method: "sendInvoice",
  params: SendInvoiceParams,
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

/** Use this method to send a group of photos, live photos, videos, documents or audios as an album. Documents and audio files can be only grouped in an album with messages of the same type. On success, an Array of Message objects that were sent is returned. */
export interface SendMediaGroupParams {
  /** Unique identifier of the business connection on behalf of which the message will be sent */
  readonly businessConnectionId?: string | undefined;
  /** Unique identifier for the target chat or username of the target bot, supergroup or channel in the format @username */
  readonly chatId: number | string;
  /** Unique identifier for the target message thread (topic) of a forum; for forum supergroups and private chats of bots with forum topic mode enabled only */
  readonly messageThreadId?: number | undefined;
  /** Identifier of the direct messages topic to which the messages will be sent; required if the messages are sent to a direct messages chat */
  readonly directMessagesTopicId?: number | undefined;
  /** A JSON-serialized Array describing messages to be sent, must include 2-10 items */
  readonly media: ReadonlyArray<Types.InputMediaAudio> | ReadonlyArray<Types.InputMediaDocument> | ReadonlyArray<Types.InputMediaLivePhoto> | ReadonlyArray<Types.InputMediaPhoto> | ReadonlyArray<Types.InputMediaVideo>;
  /** Sends messages silently. Users will receive a notification with no sound. */
  readonly disableNotification?: boolean | undefined;
  /** Protects the contents of the sent messages from forwarding and saving */
  readonly protectContent?: boolean | undefined;
  /** Pass True to allow up to 1000 messages per second, ignoring broadcasting limits for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot's balance. */
  readonly allowPaidBroadcast?: boolean | undefined;
  /** Unique identifier of the message effect to be added to the message; for private chats only */
  readonly messageEffectId?: string | undefined;
  /** Description of the message to reply to */
  readonly replyParameters?: Types.ReplyParameters | undefined;
}
const _SendMediaGroupParamsPublicKeys = { business_connection_id: "businessConnectionId", chat_id: "chatId", message_thread_id: "messageThreadId", direct_messages_topic_id: "directMessagesTopicId", disable_notification: "disableNotification", protect_content: "protectContent", allow_paid_broadcast: "allowPaidBroadcast", message_effect_id: "messageEffectId", reply_parameters: "replyParameters" } as const;
const _SendMediaGroupParamsWireKeys = invertKeys(_SendMediaGroupParamsPublicKeys);
const _SendMediaGroupParamsEncoded = Schema.Struct({
  business_connection_id: Schema.optional(Schema.String),
  chat_id: Schema.Union([Schema.Int, Schema.String]),
  message_thread_id: Schema.optional(Schema.Int),
  direct_messages_topic_id: Schema.optional(Schema.Int),
  media: Schema.Union([Schema.Array(Schema.suspend((): Schema.Codec<Types.InputMediaAudio, unknown> => Types.InputMediaAudio)), Schema.Array(Schema.suspend((): Schema.Codec<Types.InputMediaDocument, unknown> => Types.InputMediaDocument)), Schema.Array(Schema.suspend((): Schema.Codec<Types.InputMediaLivePhoto, unknown> => Types.InputMediaLivePhoto)), Schema.Array(Schema.suspend((): Schema.Codec<Types.InputMediaPhoto, unknown> => Types.InputMediaPhoto)), Schema.Array(Schema.suspend((): Schema.Codec<Types.InputMediaVideo, unknown> => Types.InputMediaVideo))]),
  disable_notification: Schema.optional(Schema.Boolean),
  protect_content: Schema.optional(Schema.Boolean),
  allow_paid_broadcast: Schema.optional(Schema.Boolean),
  message_effect_id: Schema.optional(Schema.String),
  reply_parameters: Schema.optional(Schema.suspend((): Schema.Codec<Types.ReplyParameters, unknown> => Types.ReplyParameters)),
});
const _SendMediaGroupParamsDecoded = Schema.declare<SendMediaGroupParams>((input): input is SendMediaGroupParams => Predicate.isObject(input));
export const SendMediaGroupParams: Schema.Codec<SendMediaGroupParams, Readonly<Record<string, unknown>>> = _SendMediaGroupParamsEncoded.pipe(
  Schema.decodeTo(_SendMediaGroupParamsDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_SendMediaGroupParamsPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_SendMediaGroupParamsWireKeys)),
  }),
);

export const sendMediaGroup = callMethod({
  method: "sendMediaGroup",
  params: SendMediaGroupParams,
  result: Schema.Array(Schema.suspend((): Schema.Codec<Types.Message, unknown> => Types.Message)),
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

/** Use this method to send paid media. On success, the sent Message is returned. */
export interface SendPaidMediaParams {
  /** Unique identifier of the business connection on behalf of which the message will be sent */
  readonly businessConnectionId?: string | undefined;
  /** Unique identifier for the target chat or username of the target bot, supergroup or channel in the format @username. If the chat is a channel, all Telegram Star proceeds from this media will be credited to the chat's balance. Otherwise, they will be credited to the bot's balance. */
  readonly chatId: number | string;
  /** Unique identifier for the target message thread (topic) of a forum; for forum supergroups and private chats of bots with forum topic mode enabled only */
  readonly messageThreadId?: number | undefined;
  /** Identifier of the direct messages topic to which the message will be sent; required if the message is sent to a direct messages chat */
  readonly directMessagesTopicId?: number | undefined;
  /** The number of Telegram Stars that must be paid to buy access to the media; 1-25000 */
  readonly starCount: number;
  /** A JSON-serialized Array describing the media to be sent; up to 10 items */
  readonly media: ReadonlyArray<Types.InputPaidMedia>;
  /** Bot-defined paid media payload, 0-128 bytes. This will not be displayed to the user, use it for your internal processes. */
  readonly payload?: string | undefined;
  /** Media caption, 0-1024 characters after entities parsing */
  readonly caption?: string | undefined;
  /** Mode for parsing entities in the media caption. See formatting options for more details. */
  readonly parseMode?: Types.ParseMode | undefined;
  /** A JSON-serialized list of special entities that appear in the caption, which can be specified instead of parse_mode */
  readonly captionEntities?: ReadonlyArray<Types.MessageEntity> | undefined;
  /** Pass True if the caption must be shown above the message media */
  readonly showCaptionAboveMedia?: boolean | undefined;
  /** Sends the message silently. Users will receive a notification with no sound. */
  readonly disableNotification?: boolean | undefined;
  /** Protects the contents of the sent message from forwarding and saving */
  readonly protectContent?: boolean | undefined;
  /** Pass True to allow up to 1000 messages per second, ignoring broadcasting limits for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot's balance. */
  readonly allowPaidBroadcast?: boolean | undefined;
  /** A JSON-serialized object containing the parameters of the suggested post to send; for direct messages chats only. If the message is sent as a reply to another suggested post, then that suggested post is automatically declined. */
  readonly suggestedPostParameters?: Types.SuggestedPostParameters | undefined;
  /** Description of the message to reply to */
  readonly replyParameters?: Types.ReplyParameters | undefined;
  /** Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove a reply keyboard or to force a reply from the user. */
  readonly replyMarkup?: Types.InlineKeyboardMarkup | Types.ReplyKeyboardMarkup | Types.ReplyKeyboardRemove | Types.ForceReply | undefined;
}
const _SendPaidMediaParamsPublicKeys = { business_connection_id: "businessConnectionId", chat_id: "chatId", message_thread_id: "messageThreadId", direct_messages_topic_id: "directMessagesTopicId", star_count: "starCount", parse_mode: "parseMode", caption_entities: "captionEntities", show_caption_above_media: "showCaptionAboveMedia", disable_notification: "disableNotification", protect_content: "protectContent", allow_paid_broadcast: "allowPaidBroadcast", suggested_post_parameters: "suggestedPostParameters", reply_parameters: "replyParameters", reply_markup: "replyMarkup" } as const;
const _SendPaidMediaParamsWireKeys = invertKeys(_SendPaidMediaParamsPublicKeys);
const _SendPaidMediaParamsEncoded = Schema.Struct({
  business_connection_id: Schema.optional(Schema.String),
  chat_id: Schema.Union([Schema.Int, Schema.String]),
  message_thread_id: Schema.optional(Schema.Int),
  direct_messages_topic_id: Schema.optional(Schema.Int),
  star_count: Schema.Int,
  media: Schema.Array(Schema.suspend((): Schema.Codec<Types.InputPaidMedia, unknown> => Types.InputPaidMedia)),
  payload: Schema.optional(Schema.String),
  caption: Schema.optional(Schema.String),
  parse_mode: Schema.optional(Schema.suspend((): Schema.Codec<Types.ParseMode, unknown> => Types.ParseMode)),
  caption_entities: Schema.optional(Schema.Array(Schema.suspend((): Schema.Codec<Types.MessageEntity, unknown> => Types.MessageEntity))),
  show_caption_above_media: Schema.optional(Schema.Boolean),
  disable_notification: Schema.optional(Schema.Boolean),
  protect_content: Schema.optional(Schema.Boolean),
  allow_paid_broadcast: Schema.optional(Schema.Boolean),
  suggested_post_parameters: Schema.optional(Schema.suspend((): Schema.Codec<Types.SuggestedPostParameters, unknown> => Types.SuggestedPostParameters)),
  reply_parameters: Schema.optional(Schema.suspend((): Schema.Codec<Types.ReplyParameters, unknown> => Types.ReplyParameters)),
  reply_markup: Schema.optional(Schema.Union([Schema.suspend((): Schema.Codec<Types.InlineKeyboardMarkup, unknown> => Types.InlineKeyboardMarkup), Schema.suspend((): Schema.Codec<Types.ReplyKeyboardMarkup, unknown> => Types.ReplyKeyboardMarkup), Schema.suspend((): Schema.Codec<Types.ReplyKeyboardRemove, unknown> => Types.ReplyKeyboardRemove), Schema.suspend((): Schema.Codec<Types.ForceReply, unknown> => Types.ForceReply)])),
});
const _SendPaidMediaParamsDecoded = Schema.declare<SendPaidMediaParams>((input): input is SendPaidMediaParams => Predicate.isObject(input));
export const SendPaidMediaParams: Schema.Codec<SendPaidMediaParams, Readonly<Record<string, unknown>>> = _SendPaidMediaParamsEncoded.pipe(
  Schema.decodeTo(_SendPaidMediaParamsDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_SendPaidMediaParamsPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_SendPaidMediaParamsWireKeys)),
  }),
);

export const sendPaidMedia = callMethod({
  method: "sendPaidMedia",
  params: SendPaidMediaParams,
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

/** Use this method to send a native poll. On success, the sent Message is returned. */
export interface SendPollParams {
  /** Unique identifier of the business connection on behalf of which the message will be sent */
  readonly businessConnectionId?: string | undefined;
  /** Unique identifier for the target chat or username of the target bot, supergroup or channel in the format @username. Polls can't be sent to channel direct messages chats. */
  readonly chatId: number | string;
  /** Unique identifier for the target message thread (topic) of a forum; for forum supergroups and private chats of bots with forum topic mode enabled only */
  readonly messageThreadId?: number | undefined;
  /** Poll question, 1-300 characters */
  readonly question: string;
  /** Mode for parsing entities in the question. See formatting options for more details. Currently, only custom emoji entities are allowed. */
  readonly questionParseMode?: string | undefined;
  /** A JSON-serialized list of special entities that appear in the poll question. It can be specified instead of question_parse_mode. */
  readonly questionEntities?: ReadonlyArray<Types.MessageEntity> | undefined;
  /** A JSON-serialized list of 1-12 answer options */
  readonly options: ReadonlyArray<Types.InputPollOption>;
  /** True, if the poll needs to be anonymous, defaults to True */
  readonly isAnonymous?: boolean | undefined;
  /** Poll type, “quiz” or “regular”, defaults to “regular” */
  readonly type?: Types.PollType | undefined;
  /** Pass True if the poll allows multiple answers, defaults to False */
  readonly allowsMultipleAnswers?: boolean | undefined;
  /** Pass True if the poll allows to change chosen answer options, defaults to False for quizzes and to True for regular polls */
  readonly allowsRevoting?: boolean | undefined;
  /** Pass True if the poll options must be shown in random order */
  readonly shuffleOptions?: boolean | undefined;
  /** Pass True if answer options can be added to the poll after creation; not supported for anonymous polls and quizzes */
  readonly allowAddingOptions?: boolean | undefined;
  /** Pass True if poll results must be shown only after the poll closes */
  readonly hideResultsUntilCloses?: boolean | undefined;
  /** Pass True if voting is limited to users who have been members of the chat where the poll is being sent for more than 24 hours; for channel chats only */
  readonly membersOnly?: boolean | undefined;
  /** A JSON-serialized list of 0-12 two-letter ISO 3166-1 alpha-2 country codes indicating the countries from which users can vote in the poll; for channel chats only. Use “FT” as a country code to allow users with anonymous numbers to vote. If omitted or empty, then users from any country can participate in the poll. */
  readonly countryCodes?: ReadonlyArray<string> | undefined;
  /** A JSON-serialized list of monotonically increasing 0-based identifiers of the correct answer options, required for polls in quiz mode */
  readonly correctOptionIds?: ReadonlyArray<number> | undefined;
  /** Text that is shown when a user chooses an incorrect answer or taps on the lamp icon in a quiz-style poll, 0-200 characters with at most 2 line feeds after entities parsing */
  readonly explanation?: string | undefined;
  /** Mode for parsing entities in the explanation. See formatting options for more details. */
  readonly explanationParseMode?: string | undefined;
  /** A JSON-serialized list of special entities that appear in the poll explanation. It can be specified instead of explanation_parse_mode. */
  readonly explanationEntities?: ReadonlyArray<Types.MessageEntity> | undefined;
  /** Media added to the quiz explanation */
  readonly explanationMedia?: Types.InputPollMedia | undefined;
  /** Amount of time in seconds the poll will be active after creation, 5-2628000. Can't be used together with close_date. */
  readonly openPeriod?: number | undefined;
  /** Point in time (Unix timestamp) when the poll will be automatically closed. Must be at least 5 and no more than 2628000 seconds in the future. Can't be used together with open_period. */
  readonly closeDate?: number | undefined;
  /** Pass True if the poll needs to be immediately closed. This can be useful for poll preview. */
  readonly isClosed?: boolean | undefined;
  /** Description of the poll to be sent, 0-1024 characters after entities parsing */
  readonly description?: string | undefined;
  /** Mode for parsing entities in the poll description. See formatting options for more details. */
  readonly descriptionParseMode?: Types.ParseMode | undefined;
  /** A JSON-serialized list of special entities that appear in the poll description, which can be specified instead of description_parse_mode */
  readonly descriptionEntities?: ReadonlyArray<Types.MessageEntity> | undefined;
  /** Media added to the poll description */
  readonly media?: Types.InputPollMedia | undefined;
  /** Sends the message silently. Users will receive a notification with no sound. */
  readonly disableNotification?: boolean | undefined;
  /** Protects the contents of the sent message from forwarding and saving */
  readonly protectContent?: boolean | undefined;
  /** Pass True to allow up to 1000 messages per second, ignoring broadcasting limits for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot's balance. */
  readonly allowPaidBroadcast?: boolean | undefined;
  /** Unique identifier of the message effect to be added to the message; for private chats only */
  readonly messageEffectId?: string | undefined;
  /** Description of the message to reply to */
  readonly replyParameters?: Types.ReplyParameters | undefined;
  /** Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove a reply keyboard or to force a reply from the user. */
  readonly replyMarkup?: Types.InlineKeyboardMarkup | Types.ReplyKeyboardMarkup | Types.ReplyKeyboardRemove | Types.ForceReply | undefined;
}
const _SendPollParamsPublicKeys = { business_connection_id: "businessConnectionId", chat_id: "chatId", message_thread_id: "messageThreadId", question_parse_mode: "questionParseMode", question_entities: "questionEntities", is_anonymous: "isAnonymous", allows_multiple_answers: "allowsMultipleAnswers", allows_revoting: "allowsRevoting", shuffle_options: "shuffleOptions", allow_adding_options: "allowAddingOptions", hide_results_until_closes: "hideResultsUntilCloses", members_only: "membersOnly", country_codes: "countryCodes", correct_option_ids: "correctOptionIds", explanation_parse_mode: "explanationParseMode", explanation_entities: "explanationEntities", explanation_media: "explanationMedia", open_period: "openPeriod", close_date: "closeDate", is_closed: "isClosed", description_parse_mode: "descriptionParseMode", description_entities: "descriptionEntities", disable_notification: "disableNotification", protect_content: "protectContent", allow_paid_broadcast: "allowPaidBroadcast", message_effect_id: "messageEffectId", reply_parameters: "replyParameters", reply_markup: "replyMarkup" } as const;
const _SendPollParamsWireKeys = invertKeys(_SendPollParamsPublicKeys);
const _SendPollParamsEncoded = Schema.Struct({
  business_connection_id: Schema.optional(Schema.String),
  chat_id: Schema.Union([Schema.Int, Schema.String]),
  message_thread_id: Schema.optional(Schema.Int),
  question: Schema.String,
  question_parse_mode: Schema.optional(Schema.String),
  question_entities: Schema.optional(Schema.Array(Schema.suspend((): Schema.Codec<Types.MessageEntity, unknown> => Types.MessageEntity))),
  options: Schema.Array(Schema.suspend((): Schema.Codec<Types.InputPollOption, unknown> => Types.InputPollOption)),
  is_anonymous: Schema.optional(Schema.Boolean),
  type: Schema.optional(Schema.suspend((): Schema.Codec<Types.PollType, unknown> => Types.PollType)),
  allows_multiple_answers: Schema.optional(Schema.Boolean),
  allows_revoting: Schema.optional(Schema.Boolean),
  shuffle_options: Schema.optional(Schema.Boolean),
  allow_adding_options: Schema.optional(Schema.Boolean),
  hide_results_until_closes: Schema.optional(Schema.Boolean),
  members_only: Schema.optional(Schema.Boolean),
  country_codes: Schema.optional(Schema.Array(Schema.String)),
  correct_option_ids: Schema.optional(Schema.Array(Schema.Int)),
  explanation: Schema.optional(Schema.String),
  explanation_parse_mode: Schema.optional(Schema.String),
  explanation_entities: Schema.optional(Schema.Array(Schema.suspend((): Schema.Codec<Types.MessageEntity, unknown> => Types.MessageEntity))),
  explanation_media: Schema.optional(Schema.suspend((): Schema.Codec<Types.InputPollMedia, unknown> => Types.InputPollMedia)),
  open_period: Schema.optional(Schema.Int),
  close_date: Schema.optional(Schema.Int),
  is_closed: Schema.optional(Schema.Boolean),
  description: Schema.optional(Schema.String),
  description_parse_mode: Schema.optional(Schema.suspend((): Schema.Codec<Types.ParseMode, unknown> => Types.ParseMode)),
  description_entities: Schema.optional(Schema.Array(Schema.suspend((): Schema.Codec<Types.MessageEntity, unknown> => Types.MessageEntity))),
  media: Schema.optional(Schema.suspend((): Schema.Codec<Types.InputPollMedia, unknown> => Types.InputPollMedia)),
  disable_notification: Schema.optional(Schema.Boolean),
  protect_content: Schema.optional(Schema.Boolean),
  allow_paid_broadcast: Schema.optional(Schema.Boolean),
  message_effect_id: Schema.optional(Schema.String),
  reply_parameters: Schema.optional(Schema.suspend((): Schema.Codec<Types.ReplyParameters, unknown> => Types.ReplyParameters)),
  reply_markup: Schema.optional(Schema.Union([Schema.suspend((): Schema.Codec<Types.InlineKeyboardMarkup, unknown> => Types.InlineKeyboardMarkup), Schema.suspend((): Schema.Codec<Types.ReplyKeyboardMarkup, unknown> => Types.ReplyKeyboardMarkup), Schema.suspend((): Schema.Codec<Types.ReplyKeyboardRemove, unknown> => Types.ReplyKeyboardRemove), Schema.suspend((): Schema.Codec<Types.ForceReply, unknown> => Types.ForceReply)])),
});
const _SendPollParamsDecoded = Schema.declare<SendPollParams>((input): input is SendPollParams => Predicate.isObject(input));
export const SendPollParams: Schema.Codec<SendPollParams, Readonly<Record<string, unknown>>> = _SendPollParamsEncoded.pipe(
  Schema.decodeTo(_SendPollParamsDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_SendPollParamsPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_SendPollParamsWireKeys)),
  }),
);

export const sendPoll = callMethod({
  method: "sendPoll",
  params: SendPollParams,
  result: Schema.suspend((): Schema.Codec<Types.Message, unknown> => Types.Message),
  retrySafe: false,
});

/** Use this method to send rich messages. If the message contains a block with a media element, then the bot must have the right to send the media to the chat. On success, the sent Message is returned. */
export interface SendRichMessageParams {
  /** Unique identifier of the business connection on behalf of which the message will be sent. Bot can send rich messages on behalf of a business account only if the corresponding user can send rich messages. */
  readonly businessConnectionId?: string | undefined;
  /** Unique identifier for the target chat or username of the target bot, supergroup or channel in the format @username */
  readonly chatId: number | string;
  /** Unique identifier for the target message thread (topic) of a forum; for forum supergroups and private chats of bots with forum topic mode enabled only */
  readonly messageThreadId?: number | undefined;
  /** Identifier of the direct messages topic to which the message will be sent; required if the message is sent to a direct messages chat */
  readonly directMessagesTopicId?: number | undefined;
  /** A JSON-serialized object containing the parameters of the ephemeral message to send */
  readonly ephemeralMessageParameters?: Types.EphemeralMessageParameters | undefined;
  /** The message to be sent */
  readonly richMessage: Types.InputRichMessage;
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
const _SendRichMessageParamsPublicKeys = { business_connection_id: "businessConnectionId", chat_id: "chatId", message_thread_id: "messageThreadId", direct_messages_topic_id: "directMessagesTopicId", ephemeral_message_parameters: "ephemeralMessageParameters", rich_message: "richMessage", disable_notification: "disableNotification", protect_content: "protectContent", allow_paid_broadcast: "allowPaidBroadcast", message_effect_id: "messageEffectId", suggested_post_parameters: "suggestedPostParameters", reply_parameters: "replyParameters", reply_markup: "replyMarkup" } as const;
const _SendRichMessageParamsWireKeys = invertKeys(_SendRichMessageParamsPublicKeys);
const _SendRichMessageParamsEncoded = Schema.Struct({
  business_connection_id: Schema.optional(Schema.String),
  chat_id: Schema.Union([Schema.Int, Schema.String]),
  message_thread_id: Schema.optional(Schema.Int),
  direct_messages_topic_id: Schema.optional(Schema.Int),
  ephemeral_message_parameters: Schema.optional(Schema.suspend((): Schema.Codec<Types.EphemeralMessageParameters, unknown> => Types.EphemeralMessageParameters)),
  rich_message: Schema.suspend((): Schema.Codec<Types.InputRichMessage, unknown> => Types.InputRichMessage),
  disable_notification: Schema.optional(Schema.Boolean),
  protect_content: Schema.optional(Schema.Boolean),
  allow_paid_broadcast: Schema.optional(Schema.Boolean),
  message_effect_id: Schema.optional(Schema.String),
  suggested_post_parameters: Schema.optional(Schema.suspend((): Schema.Codec<Types.SuggestedPostParameters, unknown> => Types.SuggestedPostParameters)),
  reply_parameters: Schema.optional(Schema.suspend((): Schema.Codec<Types.ReplyParameters, unknown> => Types.ReplyParameters)),
  reply_markup: Schema.optional(Schema.Union([Schema.suspend((): Schema.Codec<Types.InlineKeyboardMarkup, unknown> => Types.InlineKeyboardMarkup), Schema.suspend((): Schema.Codec<Types.ReplyKeyboardMarkup, unknown> => Types.ReplyKeyboardMarkup), Schema.suspend((): Schema.Codec<Types.ReplyKeyboardRemove, unknown> => Types.ReplyKeyboardRemove), Schema.suspend((): Schema.Codec<Types.ForceReply, unknown> => Types.ForceReply)])),
});
const _SendRichMessageParamsDecoded = Schema.declare<SendRichMessageParams>((input): input is SendRichMessageParams => Predicate.isObject(input));
export const SendRichMessageParams: Schema.Codec<SendRichMessageParams, Readonly<Record<string, unknown>>> = _SendRichMessageParamsEncoded.pipe(
  Schema.decodeTo(_SendRichMessageParamsDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_SendRichMessageParamsPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_SendRichMessageParamsWireKeys)),
  }),
);

export const sendRichMessage = callMethod({
  method: "sendRichMessage",
  params: SendRichMessageParams,
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

/** Changes the profile photo of a managed business account. Requires the can_edit_profile_photo business bot right. Returns True on success. */
export interface SetBusinessAccountProfilePhotoParams {
  /** Unique identifier of the business connection */
  readonly businessConnectionId: string;
  /** The new profile photo to set */
  readonly photo: Types.InputProfilePhoto;
  /** Pass True to set the public photo, which will be visible even if the main photo is hidden by the business account's privacy settings. An account can have only one public photo. */
  readonly isPublic?: boolean | undefined;
}
const _SetBusinessAccountProfilePhotoParamsPublicKeys = { business_connection_id: "businessConnectionId", is_public: "isPublic" } as const;
const _SetBusinessAccountProfilePhotoParamsWireKeys = invertKeys(_SetBusinessAccountProfilePhotoParamsPublicKeys);
const _SetBusinessAccountProfilePhotoParamsEncoded = Schema.Struct({
  business_connection_id: Schema.String,
  photo: Schema.suspend((): Schema.Codec<Types.InputProfilePhoto, unknown> => Types.InputProfilePhoto),
  is_public: Schema.optional(Schema.Boolean),
});
const _SetBusinessAccountProfilePhotoParamsDecoded = Schema.declare<SetBusinessAccountProfilePhotoParams>((input): input is SetBusinessAccountProfilePhotoParams => Predicate.isObject(input));
export const SetBusinessAccountProfilePhotoParams: Schema.Codec<SetBusinessAccountProfilePhotoParams, Readonly<Record<string, unknown>>> = _SetBusinessAccountProfilePhotoParamsEncoded.pipe(
  Schema.decodeTo(_SetBusinessAccountProfilePhotoParamsDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_SetBusinessAccountProfilePhotoParamsPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_SetBusinessAccountProfilePhotoParamsWireKeys)),
  }),
);

export const setBusinessAccountProfilePhoto = callMethod({
  method: "setBusinessAccountProfilePhoto",
  params: SetBusinessAccountProfilePhotoParams,
  result: Schema.Literal(true),
  retrySafe: false,
});

/** Use this method to set a new profile photo for the chat. Photos can't be changed for private chats. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns True on success. */
export interface SetChatPhotoParams {
  /** Unique identifier for the target chat or username of the target channel in the format @username */
  readonly chatId: number | string;
  /** New chat photo, uploaded using multipart/form-data */
  readonly photo: Types.InputFile;
}
const _SetChatPhotoParamsPublicKeys = { chat_id: "chatId" } as const;
const _SetChatPhotoParamsWireKeys = invertKeys(_SetChatPhotoParamsPublicKeys);
const _SetChatPhotoParamsEncoded = Schema.Struct({
  chat_id: Schema.Union([Schema.Int, Schema.String]),
  photo: Schema.suspend((): Schema.Codec<Types.InputFile, unknown> => Types.InputFile),
});
const _SetChatPhotoParamsDecoded = Schema.declare<SetChatPhotoParams>((input): input is SetChatPhotoParams => Predicate.isObject(input));
export const SetChatPhotoParams: Schema.Codec<SetChatPhotoParams, Readonly<Record<string, unknown>>> = _SetChatPhotoParamsEncoded.pipe(
  Schema.decodeTo(_SetChatPhotoParamsDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_SetChatPhotoParamsPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_SetChatPhotoParamsWireKeys)),
  }),
);

export const setChatPhoto = callMethod({
  method: "setChatPhoto",
  params: SetChatPhotoParams,
  result: Schema.Literal(true),
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

/** Changes the profile photo of the bot. Returns True on success. */
export interface SetMyProfilePhotoParams {
  /** The new profile photo to set */
  readonly photo: Types.InputProfilePhoto;
}
export const SetMyProfilePhotoParams: Schema.Codec<SetMyProfilePhotoParams, Readonly<Record<string, unknown>>> = Schema.Struct({
  photo: Schema.suspend((): Schema.Codec<Types.InputProfilePhoto, unknown> => Types.InputProfilePhoto),
});

export const setMyProfilePhoto = callMethod({
  method: "setMyProfilePhoto",
  params: SetMyProfilePhotoParams,
  result: Schema.Literal(true),
  retrySafe: false,
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

/** Transfers Telegram Stars from the business account balance to the bot's balance. Requires the can_transfer_stars business bot right. Returns True on success. */
export interface TransferBusinessAccountStarsParams {
  /** Unique identifier of the business connection */
  readonly businessConnectionId: string;
  /** Number of Telegram Stars to transfer; 1-10000 */
  readonly starCount: number;
}
const _TransferBusinessAccountStarsParamsPublicKeys = { business_connection_id: "businessConnectionId", star_count: "starCount" } as const;
const _TransferBusinessAccountStarsParamsWireKeys = invertKeys(_TransferBusinessAccountStarsParamsPublicKeys);
const _TransferBusinessAccountStarsParamsEncoded = Schema.Struct({
  business_connection_id: Schema.String,
  star_count: Schema.Int,
});
const _TransferBusinessAccountStarsParamsDecoded = Schema.declare<TransferBusinessAccountStarsParams>((input): input is TransferBusinessAccountStarsParams => Predicate.isObject(input));
export const TransferBusinessAccountStarsParams: Schema.Codec<TransferBusinessAccountStarsParams, Readonly<Record<string, unknown>>> = _TransferBusinessAccountStarsParamsEncoded.pipe(
  Schema.decodeTo(_TransferBusinessAccountStarsParamsDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_TransferBusinessAccountStarsParamsPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_TransferBusinessAccountStarsParamsWireKeys)),
  }),
);

export const transferBusinessAccountStars = callMethod({
  method: "transferBusinessAccountStars",
  params: TransferBusinessAccountStarsParams,
  result: Schema.Literal(true),
  retrySafe: false,
});

/** Use this method to upload a file with a sticker for later use in the createNewStickerSet, addStickerToSet, or replaceStickerInSet methods (the file can be used multiple times). Returns the uploaded File on success. */
export interface UploadStickerFileParams {
  /** User identifier of sticker file owner */
  readonly userId: number;
  /** A file with the sticker in .WEBP, .PNG, .TGS, or .WEBM format. See https://core.telegram.org/stickers for technical requirements. More information on Sending Files » */
  readonly sticker: Types.InputFile;
  /** Format of the sticker, must be one of “static”, “animated”, “video” */
  readonly stickerFormat: Types.StickerFormat;
}
const _UploadStickerFileParamsPublicKeys = { user_id: "userId", sticker_format: "stickerFormat" } as const;
const _UploadStickerFileParamsWireKeys = invertKeys(_UploadStickerFileParamsPublicKeys);
const _UploadStickerFileParamsEncoded = Schema.Struct({
  user_id: Schema.Int,
  sticker: Schema.suspend((): Schema.Codec<Types.InputFile, unknown> => Types.InputFile),
  sticker_format: Schema.suspend((): Schema.Codec<Types.StickerFormat, unknown> => Types.StickerFormat),
});
const _UploadStickerFileParamsDecoded = Schema.declare<UploadStickerFileParams>((input): input is UploadStickerFileParams => Predicate.isObject(input));
export const UploadStickerFileParams: Schema.Codec<UploadStickerFileParams, Readonly<Record<string, unknown>>> = _UploadStickerFileParamsEncoded.pipe(
  Schema.decodeTo(_UploadStickerFileParamsDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_UploadStickerFileParamsPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_UploadStickerFileParamsWireKeys)),
  }),
);

export const uploadStickerFile = callMethod({
  method: "uploadStickerFile",
  params: UploadStickerFileParams,
  result: Schema.suspend((): Schema.Codec<Types.File, unknown> => Types.File),
  retrySafe: false,
});
