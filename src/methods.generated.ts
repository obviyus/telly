// Generated from bot-api/schema/sources/dofer/spec.json. Edit schema inputs or overrides, then regenerate.
import * as Predicate from "effect/Predicate";
import * as Schema from "effect/Schema";
import * as SchemaGetter from "effect/SchemaGetter";
import * as Struct from "effect/Struct";

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
export const AddStickerToSetParams: Schema.Codec<AddStickerToSetParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { user_id: "userId" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  user_id: Schema.Int,
    name: Schema.String,
    sticker: Types.InputSticker,
  });
  const decoded = Schema.declare<AddStickerToSetParams>((input): input is AddStickerToSetParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const addStickerToSet = callMethod({
  method: "addStickerToSet",
  params: AddStickerToSetParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Literal(true)),
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
export const AnswerCallbackQueryParams: Schema.Codec<AnswerCallbackQueryParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { callback_query_id: "callbackQueryId", show_alert: "showAlert", cache_time: "cacheTime" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  callback_query_id: Schema.String,
    text: Schema.optional(Schema.String),
    show_alert: Schema.optional(Schema.Boolean),
    url: Schema.optional(Schema.String),
    cache_time: Schema.optional(Schema.Int),
  });
  const decoded = Schema.declare<AnswerCallbackQueryParams>((input): input is AnswerCallbackQueryParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const answerCallbackQuery = callMethod({
  method: "answerCallbackQuery",
  params: AnswerCallbackQueryParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Literal(true)),
  retrySafe: true,
});

/** Use this method to process a received chat join request query. Returns True on success. */
export interface AnswerChatJoinRequestQueryParams {
  /** Unique identifier of the join request query */
  readonly chatJoinRequestQueryId: string;
  /** Result of the query. Must be either “approve” to allow the user to join the chat, “decline” to disallow the user to join the chat, or “queue” to leave the decision to other administrators. */
  readonly result: string;
}
export const AnswerChatJoinRequestQueryParams: Schema.Codec<AnswerChatJoinRequestQueryParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { chat_join_request_query_id: "chatJoinRequestQueryId" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  chat_join_request_query_id: Schema.String,
    result: Schema.String,
  });
  const decoded = Schema.declare<AnswerChatJoinRequestQueryParams>((input): input is AnswerChatJoinRequestQueryParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const answerChatJoinRequestQuery = callMethod({
  method: "answerChatJoinRequestQuery",
  params: AnswerChatJoinRequestQueryParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Literal(true)),
  retrySafe: true,
});

/** Use this method to reply to a received guest message. On success, a SentGuestMessage object is returned. */
export interface AnswerGuestQueryParams {
  /** Unique identifier for the query to be answered */
  readonly guestQueryId: string;
  /** A JSON-serialized object describing the message to be sent */
  readonly result: Types.InlineQueryResult;
}
export const AnswerGuestQueryParams: Schema.Codec<AnswerGuestQueryParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { guest_query_id: "guestQueryId" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  guest_query_id: Schema.String,
    result: Types.InlineQueryResult,
  });
  const decoded = Schema.declare<AnswerGuestQueryParams>((input): input is AnswerGuestQueryParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const answerGuestQuery = callMethod({
  method: "answerGuestQuery",
  params: AnswerGuestQueryParams,
  rateLimit: "none",
  result: Schema.suspend(() => Types.SentGuestMessage),
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
export const AnswerInlineQueryParams: Schema.Codec<AnswerInlineQueryParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { inline_query_id: "inlineQueryId", cache_time: "cacheTime", is_personal: "isPersonal", next_offset: "nextOffset" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  inline_query_id: Schema.String,
    results: Schema.Array(Types.InlineQueryResult),
    cache_time: Schema.optional(Schema.Int),
    is_personal: Schema.optional(Schema.Boolean),
    next_offset: Schema.optional(Schema.String),
    button: Schema.optional(Types.InlineQueryResultsButton),
  });
  const decoded = Schema.declare<AnswerInlineQueryParams>((input): input is AnswerInlineQueryParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const answerInlineQuery = callMethod({
  method: "answerInlineQuery",
  params: AnswerInlineQueryParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Literal(true)),
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
export const AnswerPreCheckoutQueryParams: Schema.Codec<AnswerPreCheckoutQueryParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { pre_checkout_query_id: "preCheckoutQueryId", error_message: "errorMessage" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  pre_checkout_query_id: Schema.String,
    ok: Schema.Boolean,
    error_message: Schema.optional(Schema.String),
  });
  const decoded = Schema.declare<AnswerPreCheckoutQueryParams>((input): input is AnswerPreCheckoutQueryParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const answerPreCheckoutQuery = callMethod({
  method: "answerPreCheckoutQuery",
  params: AnswerPreCheckoutQueryParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Literal(true)),
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
export const AnswerShippingQueryParams: Schema.Codec<AnswerShippingQueryParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { shipping_query_id: "shippingQueryId", shipping_options: "shippingOptions", error_message: "errorMessage" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  shipping_query_id: Schema.String,
    ok: Schema.Boolean,
    shipping_options: Schema.optional(Schema.Array(Types.ShippingOption)),
    error_message: Schema.optional(Schema.String),
  });
  const decoded = Schema.declare<AnswerShippingQueryParams>((input): input is AnswerShippingQueryParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const answerShippingQuery = callMethod({
  method: "answerShippingQuery",
  params: AnswerShippingQueryParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Literal(true)),
  retrySafe: true,
});

/** Use this method to set the result of an interaction with a Web App and send a corresponding message on behalf of the user to the chat from which the query originated. On success, a SentWebAppMessage object is returned. */
export interface AnswerWebAppQueryParams {
  /** Unique identifier for the query to be answered */
  readonly webAppQueryId: string;
  /** A JSON-serialized object describing the message to be sent */
  readonly result: Types.InlineQueryResult;
}
export const AnswerWebAppQueryParams: Schema.Codec<AnswerWebAppQueryParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { web_app_query_id: "webAppQueryId" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  web_app_query_id: Schema.String,
    result: Types.InlineQueryResult,
  });
  const decoded = Schema.declare<AnswerWebAppQueryParams>((input): input is AnswerWebAppQueryParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const answerWebAppQuery = callMethod({
  method: "answerWebAppQuery",
  params: AnswerWebAppQueryParams,
  rateLimit: "message",
  result: Schema.suspend(() => Types.SentWebAppMessage),
  retrySafe: true,
});

/** Use this method to approve a chat join request. The bot must be an administrator in the chat for this to work and must have the can_invite_users administrator right. Returns True on success. */
export interface ApproveChatJoinRequestParams {
  /** Unique identifier for the target chat or username of the target channel in the format @username */
  readonly chatId: number | string;
  /** Unique identifier of the target user */
  readonly userId: number;
}
export const ApproveChatJoinRequestParams: Schema.Codec<ApproveChatJoinRequestParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { chat_id: "chatId", user_id: "userId" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  chat_id: Schema.Union([Schema.Int, Schema.String]),
    user_id: Schema.Int,
  });
  const decoded = Schema.declare<ApproveChatJoinRequestParams>((input): input is ApproveChatJoinRequestParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const approveChatJoinRequest = callMethod({
  method: "approveChatJoinRequest",
  params: ApproveChatJoinRequestParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Literal(true)),
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
export const ApproveSuggestedPostParams: Schema.Codec<ApproveSuggestedPostParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { chat_id: "chatId", message_id: "messageId", send_date: "sendDate" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  chat_id: Schema.Int,
    message_id: Schema.Int,
    send_date: Schema.optional(Schema.Int),
  });
  const decoded = Schema.declare<ApproveSuggestedPostParams>((input): input is ApproveSuggestedPostParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const approveSuggestedPost = callMethod({
  method: "approveSuggestedPost",
  params: ApproveSuggestedPostParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Literal(true)),
  retrySafe: true,
});

/** Use this method to ban a user in a group, a supergroup or a channel. In the case of supergroups and channels, the user will not be able to return to the chat on their own using invite links, etc., unless unbanned first. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns True on success. */
export interface BanChatMemberParams {
  /** Unique identifier for the target group or username of the target supergroup or channel in the format @username */
  readonly chatId: number | string;
  /** Unique identifier of the target user */
  readonly userId: number;
  /** Date when the user will be unbanned; Unix time. If user is banned for more than 366 days or less than 30 seconds from the current time they are considered to be banned forever. Applied for supergroups and channels only. */
  readonly untilDate?: number | undefined;
  /** Pass True to delete all messages from the chat for the user that is being removed. If False, the user will be able to see messages in the group that were sent before the user was removed. Always True for supergroups and channels. */
  readonly revokeMessages?: boolean | undefined;
}
export const BanChatMemberParams: Schema.Codec<BanChatMemberParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { chat_id: "chatId", user_id: "userId", until_date: "untilDate", revoke_messages: "revokeMessages" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  chat_id: Schema.Union([Schema.Int, Schema.String]),
    user_id: Schema.Int,
    until_date: Schema.optional(Schema.Int),
    revoke_messages: Schema.optional(Schema.Boolean),
  });
  const decoded = Schema.declare<BanChatMemberParams>((input): input is BanChatMemberParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const banChatMember = callMethod({
  method: "banChatMember",
  params: BanChatMemberParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Literal(true)),
  retrySafe: true,
});

/** Use this method to ban a channel chat in a supergroup or a channel. Until the chat is unbanned, the owner of the banned chat won't be able to send messages on behalf of any of their channels. The bot must be an administrator in the supergroup or channel for this to work and must have the appropriate administrator rights. Returns True on success. */
export interface BanChatSenderChatParams {
  /** Unique identifier for the target chat or username of the target channel in the format @username */
  readonly chatId: number | string;
  /** Unique identifier of the target sender chat */
  readonly senderChatId: number;
}
export const BanChatSenderChatParams: Schema.Codec<BanChatSenderChatParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { chat_id: "chatId", sender_chat_id: "senderChatId" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  chat_id: Schema.Union([Schema.Int, Schema.String]),
    sender_chat_id: Schema.Int,
  });
  const decoded = Schema.declare<BanChatSenderChatParams>((input): input is BanChatSenderChatParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const banChatSenderChat = callMethod({
  method: "banChatSenderChat",
  params: BanChatSenderChatParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Literal(true)),
  retrySafe: true,
});

/** Use this method to close the bot instance before moving it from one local server to another. You need to delete the webhook before calling this method to ensure that the bot isn't launched again after server restart. The method will return error 429 in the first 10 minutes after the bot is launched. Returns True on success. Requires no parameters. */
export const close = callMethod({
  method: "close",
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Literal(true)),
  retrySafe: true,
});

/** Use this method to close an open topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights, unless it is the creator of the topic. Returns True on success. */
export interface CloseForumTopicParams {
  /** Unique identifier for the target chat or username of the target supergroup in the format @username */
  readonly chatId: number | string;
  /** Unique identifier for the target message thread of the forum topic */
  readonly messageThreadId: number;
}
export const CloseForumTopicParams: Schema.Codec<CloseForumTopicParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { chat_id: "chatId", message_thread_id: "messageThreadId" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  chat_id: Schema.Union([Schema.Int, Schema.String]),
    message_thread_id: Schema.Int,
  });
  const decoded = Schema.declare<CloseForumTopicParams>((input): input is CloseForumTopicParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const closeForumTopic = callMethod({
  method: "closeForumTopic",
  params: CloseForumTopicParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Literal(true)),
  retrySafe: true,
});

/** Use this method to close an open 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights. Returns True on success. */
export interface CloseGeneralForumTopicParams {
  /** Unique identifier for the target chat or username of the target supergroup in the format @username */
  readonly chatId: number | string;
}
export const CloseGeneralForumTopicParams: Schema.Codec<CloseGeneralForumTopicParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { chat_id: "chatId" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  chat_id: Schema.Union([Schema.Int, Schema.String]),
  });
  const decoded = Schema.declare<CloseGeneralForumTopicParams>((input): input is CloseGeneralForumTopicParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const closeGeneralForumTopic = callMethod({
  method: "closeGeneralForumTopic",
  params: CloseGeneralForumTopicParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Literal(true)),
  retrySafe: true,
});

/** Converts a given regular gift to Telegram Stars. Requires the can_convert_gifts_to_stars business bot right. Returns True on success. */
export interface ConvertGiftToStarsParams {
  /** Unique identifier of the business connection */
  readonly businessConnectionId: string;
  /** Unique identifier of the regular gift that should be converted to Telegram Stars */
  readonly ownedGiftId: string;
}
export const ConvertGiftToStarsParams: Schema.Codec<ConvertGiftToStarsParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { business_connection_id: "businessConnectionId", owned_gift_id: "ownedGiftId" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  business_connection_id: Schema.String,
    owned_gift_id: Schema.String,
  });
  const decoded = Schema.declare<ConvertGiftToStarsParams>((input): input is ConvertGiftToStarsParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const convertGiftToStars = callMethod({
  method: "convertGiftToStars",
  params: ConvertGiftToStarsParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Literal(true)),
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
export const CopyMessageParams: Schema.Codec<CopyMessageParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { chat_id: "chatId", message_thread_id: "messageThreadId", direct_messages_topic_id: "directMessagesTopicId", from_chat_id: "fromChatId", message_id: "messageId", video_start_timestamp: "videoStartTimestamp", parse_mode: "parseMode", caption_entities: "captionEntities", show_caption_above_media: "showCaptionAboveMedia", disable_notification: "disableNotification", protect_content: "protectContent", allow_paid_broadcast: "allowPaidBroadcast", message_effect_id: "messageEffectId", suggested_post_parameters: "suggestedPostParameters", reply_parameters: "replyParameters", reply_markup: "replyMarkup" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  chat_id: Schema.Union([Schema.Int, Schema.String]),
    message_thread_id: Schema.optional(Schema.Int),
    direct_messages_topic_id: Schema.optional(Schema.Int),
    from_chat_id: Schema.Union([Schema.Int, Schema.String]),
    message_id: Schema.Int,
    video_start_timestamp: Schema.optional(Schema.Int),
    caption: Schema.optional(Schema.String),
    parse_mode: Schema.optional(Types.ParseMode),
    caption_entities: Schema.optional(Schema.Array(Types.MessageEntity)),
    show_caption_above_media: Schema.optional(Schema.Boolean),
    disable_notification: Schema.optional(Schema.Boolean),
    protect_content: Schema.optional(Schema.Boolean),
    allow_paid_broadcast: Schema.optional(Schema.Boolean),
    message_effect_id: Schema.optional(Schema.String),
    suggested_post_parameters: Schema.optional(Types.SuggestedPostParameters),
    reply_parameters: Schema.optional(Types.ReplyParameters),
    reply_markup: Schema.optional(Schema.Union([Types.InlineKeyboardMarkup, Types.ReplyKeyboardMarkup, Types.ReplyKeyboardRemove, Types.ForceReply])),
  });
  const decoded = Schema.declare<CopyMessageParams>((input): input is CopyMessageParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const copyMessage = callMethod({
  method: "copyMessage",
  params: CopyMessageParams,
  rateLimit: "message",
  result: Schema.suspend(() => Types.MessageId),
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
export const CopyMessagesParams: Schema.Codec<CopyMessagesParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { chat_id: "chatId", message_thread_id: "messageThreadId", direct_messages_topic_id: "directMessagesTopicId", from_chat_id: "fromChatId", message_ids: "messageIds", disable_notification: "disableNotification", protect_content: "protectContent", remove_caption: "removeCaption" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  chat_id: Schema.Union([Schema.Int, Schema.String]),
    message_thread_id: Schema.optional(Schema.Int),
    direct_messages_topic_id: Schema.optional(Schema.Int),
    from_chat_id: Schema.Union([Schema.Int, Schema.String]),
    message_ids: Schema.Array(Schema.Int),
    disable_notification: Schema.optional(Schema.Boolean),
    protect_content: Schema.optional(Schema.Boolean),
    remove_caption: Schema.optional(Schema.Boolean),
  });
  const decoded = Schema.declare<CopyMessagesParams>((input): input is CopyMessagesParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const copyMessages = callMethod({
  method: "copyMessages",
  params: CopyMessagesParams,
  rateLimit: "message-id-array",
  result: Schema.suspend(() => Schema.Array(Types.MessageId)),
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
export const CreateChatInviteLinkParams: Schema.Codec<CreateChatInviteLinkParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { chat_id: "chatId", expire_date: "expireDate", member_limit: "memberLimit", creates_join_request: "createsJoinRequest" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  chat_id: Schema.Union([Schema.Int, Schema.String]),
    name: Schema.optional(Schema.String),
    expire_date: Schema.optional(Schema.Int),
    member_limit: Schema.optional(Schema.Int),
    creates_join_request: Schema.optional(Schema.Boolean),
  });
  const decoded = Schema.declare<CreateChatInviteLinkParams>((input): input is CreateChatInviteLinkParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const createChatInviteLink = callMethod({
  method: "createChatInviteLink",
  params: CreateChatInviteLinkParams,
  rateLimit: "none",
  result: Schema.suspend(() => Types.ChatInviteLink),
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
export const CreateChatSubscriptionInviteLinkParams: Schema.Codec<CreateChatSubscriptionInviteLinkParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { chat_id: "chatId", subscription_period: "subscriptionPeriod", subscription_price: "subscriptionPrice" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  chat_id: Schema.Union([Schema.Int, Schema.String]),
    name: Schema.optional(Schema.String),
    subscription_period: Schema.Int,
    subscription_price: Schema.Int,
  });
  const decoded = Schema.declare<CreateChatSubscriptionInviteLinkParams>((input): input is CreateChatSubscriptionInviteLinkParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const createChatSubscriptionInviteLink = callMethod({
  method: "createChatSubscriptionInviteLink",
  params: CreateChatSubscriptionInviteLinkParams,
  rateLimit: "none",
  result: Schema.suspend(() => Types.ChatInviteLink),
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
export const CreateForumTopicParams: Schema.Codec<CreateForumTopicParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { chat_id: "chatId", icon_color: "iconColor", icon_custom_emoji_id: "iconCustomEmojiId" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  chat_id: Schema.Union([Schema.Int, Schema.String]),
    name: Schema.String,
    icon_color: Schema.optional(Schema.Int),
    icon_custom_emoji_id: Schema.optional(Schema.String),
  });
  const decoded = Schema.declare<CreateForumTopicParams>((input): input is CreateForumTopicParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const createForumTopic = callMethod({
  method: "createForumTopic",
  params: CreateForumTopicParams,
  rateLimit: "none",
  result: Schema.suspend(() => Types.ForumTopic),
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
export const CreateInvoiceLinkParams: Schema.Codec<CreateInvoiceLinkParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { business_connection_id: "businessConnectionId", provider_token: "providerToken", subscription_period: "subscriptionPeriod", max_tip_amount: "maxTipAmount", suggested_tip_amounts: "suggestedTipAmounts", provider_data: "providerData", photo_url: "photoUrl", photo_size: "photoSize", photo_width: "photoWidth", photo_height: "photoHeight", need_name: "needName", need_phone_number: "needPhoneNumber", need_email: "needEmail", need_shipping_address: "needShippingAddress", send_phone_number_to_provider: "sendPhoneNumberToProvider", send_email_to_provider: "sendEmailToProvider", is_flexible: "isFlexible" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  business_connection_id: Schema.optional(Schema.String),
    title: Schema.String,
    description: Schema.String,
    payload: Schema.String,
    provider_token: Schema.optional(Schema.String),
    currency: Schema.String,
    prices: Schema.Array(Types.LabeledPrice),
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
  const decoded = Schema.declare<CreateInvoiceLinkParams>((input): input is CreateInvoiceLinkParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const createInvoiceLink = callMethod({
  method: "createInvoiceLink",
  params: CreateInvoiceLinkParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.String),
  retrySafe: false,
});

/** Use this method to create a new sticker set owned by a user. The bot will be able to edit the sticker set thus created. Returns True on success. */
export interface CreateNewStickerSetParams {
  /** User identifier of created sticker set owner */
  readonly userId: number;
  /** Short name of sticker set, to be used in t.me/addstickers/ URLs (e.g., animals). Can contain only English letters, digits and underscores. Must begin with a letter, can't contain consecutive underscores and must end in "_by_<bot_username>". <bot_username> is case insensitive. 1-64 characters. */
  readonly name: string;
  /** Sticker set title, 1-64 characters */
  readonly title: string;
  /** A JSON-serialized list of 1-50 initial stickers to be added to the sticker set */
  readonly stickers: ReadonlyArray<Types.InputSticker>;
  /** Type of stickers in the set, pass “regular”, “mask”, or “custom_emoji”. By default, a regular sticker set is created. */
  readonly stickerType?: Types.StickerType | undefined;
  /** Pass True if stickers in the sticker set must be repainted to the color of text when used in messages, the accent color if used as emoji status, white on chat photos, or another appropriate color based on context; for custom emoji sticker sets only */
  readonly needsRepainting?: boolean | undefined;
}
export const CreateNewStickerSetParams: Schema.Codec<CreateNewStickerSetParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { user_id: "userId", sticker_type: "stickerType", needs_repainting: "needsRepainting" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  user_id: Schema.Int,
    name: Schema.String,
    title: Schema.String,
    stickers: Schema.Array(Types.InputSticker),
    sticker_type: Schema.optional(Types.StickerType),
    needs_repainting: Schema.optional(Schema.Boolean),
  });
  const decoded = Schema.declare<CreateNewStickerSetParams>((input): input is CreateNewStickerSetParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const createNewStickerSet = callMethod({
  method: "createNewStickerSet",
  params: CreateNewStickerSetParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Literal(true)),
  retrySafe: true,
});

/** Use this method to decline a chat join request. The bot must be an administrator in the chat for this to work and must have the can_invite_users administrator right. Returns True on success. */
export interface DeclineChatJoinRequestParams {
  /** Unique identifier for the target chat or username of the target channel in the format @username */
  readonly chatId: number | string;
  /** Unique identifier of the target user */
  readonly userId: number;
}
export const DeclineChatJoinRequestParams: Schema.Codec<DeclineChatJoinRequestParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { chat_id: "chatId", user_id: "userId" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  chat_id: Schema.Union([Schema.Int, Schema.String]),
    user_id: Schema.Int,
  });
  const decoded = Schema.declare<DeclineChatJoinRequestParams>((input): input is DeclineChatJoinRequestParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const declineChatJoinRequest = callMethod({
  method: "declineChatJoinRequest",
  params: DeclineChatJoinRequestParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Literal(true)),
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
export const DeclineSuggestedPostParams: Schema.Codec<DeclineSuggestedPostParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { chat_id: "chatId", message_id: "messageId" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  chat_id: Schema.Int,
    message_id: Schema.Int,
    comment: Schema.optional(Schema.String),
  });
  const decoded = Schema.declare<DeclineSuggestedPostParams>((input): input is DeclineSuggestedPostParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const declineSuggestedPost = callMethod({
  method: "declineSuggestedPost",
  params: DeclineSuggestedPostParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Literal(true)),
  retrySafe: true,
});

/** Use this method to remove up to 10000 recent reactions in a group or a supergroup chat added by a given user or chat. The bot must have the 'can_delete_messages' administrator right in the chat. Returns True on success. */
export interface DeleteAllMessageReactionsParams {
  /** Unique identifier for the target chat or username of the target supergroup in the format @username */
  readonly chatId: number | string;
  /** Identifier of the user whose reactions will be removed, if the reactions were added by a user */
  readonly userId?: number | undefined;
  /** Identifier of the chat whose reactions will be removed, if the reactions were added by a chat */
  readonly actorChatId?: number | undefined;
}
export const DeleteAllMessageReactionsParams: Schema.Codec<DeleteAllMessageReactionsParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { chat_id: "chatId", user_id: "userId", actor_chat_id: "actorChatId" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  chat_id: Schema.Union([Schema.Int, Schema.String]),
    user_id: Schema.optional(Schema.Int),
    actor_chat_id: Schema.optional(Schema.Int),
  });
  const decoded = Schema.declare<DeleteAllMessageReactionsParams>((input): input is DeleteAllMessageReactionsParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const deleteAllMessageReactions = callMethod({
  method: "deleteAllMessageReactions",
  params: DeleteAllMessageReactionsParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Literal(true)),
  retrySafe: true,
});

/** Delete messages on behalf of a business account. Requires the can_delete_sent_messages business bot right to delete messages sent by the bot itself, or the can_delete_all_messages business bot right to delete any message. Returns True on success. */
export interface DeleteBusinessMessagesParams {
  /** Unique identifier of the business connection on behalf of which to delete the messages */
  readonly businessConnectionId: string;
  /** A JSON-serialized list of 1-100 identifiers of messages to delete. All messages must be from the same chat. See deleteMessage for limitations on which messages can be deleted. */
  readonly messageIds: ReadonlyArray<number>;
}
export const DeleteBusinessMessagesParams: Schema.Codec<DeleteBusinessMessagesParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { business_connection_id: "businessConnectionId", message_ids: "messageIds" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  business_connection_id: Schema.String,
    message_ids: Schema.Array(Schema.Int),
  });
  const decoded = Schema.declare<DeleteBusinessMessagesParams>((input): input is DeleteBusinessMessagesParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const deleteBusinessMessages = callMethod({
  method: "deleteBusinessMessages",
  params: DeleteBusinessMessagesParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Literal(true)),
  retrySafe: true,
});

/** Use this method to delete a chat photo. Photos can't be changed for private chats. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns True on success. */
export interface DeleteChatPhotoParams {
  /** Unique identifier for the target chat or username of the target channel in the format @username */
  readonly chatId: number | string;
}
export const DeleteChatPhotoParams: Schema.Codec<DeleteChatPhotoParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { chat_id: "chatId" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  chat_id: Schema.Union([Schema.Int, Schema.String]),
  });
  const decoded = Schema.declare<DeleteChatPhotoParams>((input): input is DeleteChatPhotoParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const deleteChatPhoto = callMethod({
  method: "deleteChatPhoto",
  params: DeleteChatPhotoParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Literal(true)),
  retrySafe: true,
});

/** Use this method to delete a group sticker set from a supergroup. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Use the field can_set_sticker_set optionally returned in getChat requests to check if the bot can use this method. Returns True on success. */
export interface DeleteChatStickerSetParams {
  /** Unique identifier for the target chat or username of the target supergroup in the format @username */
  readonly chatId: number | string;
}
export const DeleteChatStickerSetParams: Schema.Codec<DeleteChatStickerSetParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { chat_id: "chatId" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  chat_id: Schema.Union([Schema.Int, Schema.String]),
  });
  const decoded = Schema.declare<DeleteChatStickerSetParams>((input): input is DeleteChatStickerSetParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const deleteChatStickerSet = callMethod({
  method: "deleteChatStickerSet",
  params: DeleteChatStickerSetParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Literal(true)),
  retrySafe: true,
});

/** Use this method to delete an ephemeral message. Note that it is not guaranteed that the user will receive the message deletion event, especially if they are offline. Returns True on success. */
export interface DeleteEphemeralMessageParams {
  /** Unique identifier for the target chat or username of the target supergroup in the format @username */
  readonly chatId: number | string;
  /** Identifier of the user who received the message */
  readonly receiverUserId: number;
  /** Identifier of the ephemeral message to delete */
  readonly ephemeralMessageId: number;
}
export const DeleteEphemeralMessageParams: Schema.Codec<DeleteEphemeralMessageParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { chat_id: "chatId", receiver_user_id: "receiverUserId", ephemeral_message_id: "ephemeralMessageId" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  chat_id: Schema.Union([Schema.Int, Schema.String]),
    receiver_user_id: Schema.Int,
    ephemeral_message_id: Schema.Int,
  });
  const decoded = Schema.declare<DeleteEphemeralMessageParams>((input): input is DeleteEphemeralMessageParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const deleteEphemeralMessage = callMethod({
  method: "deleteEphemeralMessage",
  params: DeleteEphemeralMessageParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Literal(true)),
  retrySafe: true,
});

/** Use this method to delete a forum topic along with all its messages in a forum supergroup chat or a private chat with a user. In the case of a supergroup chat the bot must be an administrator in the chat for this to work and must have the can_delete_messages administrator rights. Returns True on success. */
export interface DeleteForumTopicParams {
  /** Unique identifier for the target chat or username of the target supergroup in the format @username */
  readonly chatId: number | string;
  /** Unique identifier for the target message thread of the forum topic */
  readonly messageThreadId: number;
}
export const DeleteForumTopicParams: Schema.Codec<DeleteForumTopicParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { chat_id: "chatId", message_thread_id: "messageThreadId" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  chat_id: Schema.Union([Schema.Int, Schema.String]),
    message_thread_id: Schema.Int,
  });
  const decoded = Schema.declare<DeleteForumTopicParams>((input): input is DeleteForumTopicParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const deleteForumTopic = callMethod({
  method: "deleteForumTopic",
  params: DeleteForumTopicParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Literal(true)),
  retrySafe: true,
});

/** Use this method to delete a message, including service messages, with the following limitations:
- A message can only be deleted if it was sent less than 48 hours ago.
- Service messages about a supergroup, channel, or forum topic creation can't be deleted.
- A dice message in a private chat can only be deleted if it was sent more than 24 hours ago.
- Bots can delete outgoing messages in private chats, groups, and supergroups.
- Bots can delete incoming messages in private chats.
- Bots granted can_post_messages permissions can delete outgoing messages in channels.
- If the bot is an administrator of a group, it can delete any message there.
- If the bot has can_delete_messages administrator right in a supergroup or a channel, it can delete any message there.
- If the bot has can_manage_direct_messages administrator right in a channel, it can delete any message in the corresponding direct messages chat.
Returns True on success. */
export interface DeleteMessageParams {
  /** Unique identifier for the target chat or username of the target bot, supergroup or channel in the format @username */
  readonly chatId: number | string;
  /** Identifier of the message to delete */
  readonly messageId: number;
}
export const DeleteMessageParams: Schema.Codec<DeleteMessageParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { chat_id: "chatId", message_id: "messageId" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  chat_id: Schema.Union([Schema.Int, Schema.String]),
    message_id: Schema.Int,
  });
  const decoded = Schema.declare<DeleteMessageParams>((input): input is DeleteMessageParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const deleteMessage = callMethod({
  method: "deleteMessage",
  params: DeleteMessageParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Literal(true)),
  retrySafe: true,
});

/** Use this method to remove a reaction from a message in a group or a supergroup chat. The bot must have the 'can_delete_messages' administrator right in the chat. Returns True on success. */
export interface DeleteMessageReactionParams {
  /** Unique identifier for the target chat or username of the target supergroup in the format @username */
  readonly chatId: number | string;
  /** Identifier of the target message */
  readonly messageId: number;
  /** Identifier of the user whose reaction will be removed, if the reaction was added by a user */
  readonly userId?: number | undefined;
  /** Identifier of the chat whose reaction will be removed, if the reaction was added by a chat */
  readonly actorChatId?: number | undefined;
}
export const DeleteMessageReactionParams: Schema.Codec<DeleteMessageReactionParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { chat_id: "chatId", message_id: "messageId", user_id: "userId", actor_chat_id: "actorChatId" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  chat_id: Schema.Union([Schema.Int, Schema.String]),
    message_id: Schema.Int,
    user_id: Schema.optional(Schema.Int),
    actor_chat_id: Schema.optional(Schema.Int),
  });
  const decoded = Schema.declare<DeleteMessageReactionParams>((input): input is DeleteMessageReactionParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const deleteMessageReaction = callMethod({
  method: "deleteMessageReaction",
  params: DeleteMessageReactionParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Literal(true)),
  retrySafe: true,
});

/** Use this method to delete multiple messages simultaneously. If some of the specified messages can't be found, they are skipped. Returns True on success. */
export interface DeleteMessagesParams {
  /** Unique identifier for the target chat or username of the target bot, supergroup or channel in the format @username */
  readonly chatId: number | string;
  /** A JSON-serialized list of 1-100 identifiers of messages to delete. See deleteMessage for limitations on which messages can be deleted. */
  readonly messageIds: ReadonlyArray<number>;
}
export const DeleteMessagesParams: Schema.Codec<DeleteMessagesParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { chat_id: "chatId", message_ids: "messageIds" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  chat_id: Schema.Union([Schema.Int, Schema.String]),
    message_ids: Schema.Array(Schema.Int),
  });
  const decoded = Schema.declare<DeleteMessagesParams>((input): input is DeleteMessagesParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const deleteMessages = callMethod({
  method: "deleteMessages",
  params: DeleteMessagesParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Literal(true)),
  retrySafe: true,
});

/** Use this method to delete the list of the bot's commands for the given scope and user language. After deletion, higher level commands will be shown to affected users. Returns True on success. */
export interface DeleteMyCommandsParams {
  /** A JSON-serialized object, describing scope of users for which the commands are relevant. Defaults to BotCommandScopeDefault. */
  readonly scope?: Types.BotCommandScope | undefined;
  /** A two-letter ISO 639-1 language code. If empty, commands will be applied to all users from the given scope, for whose language there are no dedicated commands. */
  readonly languageCode?: string | undefined;
}
export const DeleteMyCommandsParams: Schema.Codec<DeleteMyCommandsParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { language_code: "languageCode" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  scope: Schema.optional(Types.BotCommandScope),
    language_code: Schema.optional(Schema.String),
  });
  const decoded = Schema.declare<DeleteMyCommandsParams>((input): input is DeleteMyCommandsParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const deleteMyCommands = callMethod({
  method: "deleteMyCommands",
  params: DeleteMyCommandsParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Literal(true)),
  retrySafe: true,
});

/** Use this method to delete a sticker from a set created by the bot. Returns True on success. */
export interface DeleteStickerFromSetParams {
  /** File identifier of the sticker */
  readonly sticker: string;
}
export const DeleteStickerFromSetParams: Schema.Codec<DeleteStickerFromSetParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => Schema.Struct({
  sticker: Schema.String,
}));

export const deleteStickerFromSet = callMethod({
  method: "deleteStickerFromSet",
  params: DeleteStickerFromSetParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Literal(true)),
  retrySafe: true,
});

/** Use this method to delete a sticker set that was created by the bot. Returns True on success. */
export interface DeleteStickerSetParams {
  /** Sticker set name */
  readonly name: string;
}
export const DeleteStickerSetParams: Schema.Codec<DeleteStickerSetParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => Schema.Struct({
  name: Schema.String,
}));

export const deleteStickerSet = callMethod({
  method: "deleteStickerSet",
  params: DeleteStickerSetParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Literal(true)),
  retrySafe: true,
});

/** Deletes a story previously posted by the bot on behalf of a managed business account. Requires the can_manage_stories business bot right. Returns True on success. */
export interface DeleteStoryParams {
  /** Unique identifier of the business connection */
  readonly businessConnectionId: string;
  /** Unique identifier of the story to delete */
  readonly storyId: number;
}
export const DeleteStoryParams: Schema.Codec<DeleteStoryParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { business_connection_id: "businessConnectionId", story_id: "storyId" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  business_connection_id: Schema.String,
    story_id: Schema.Int,
  });
  const decoded = Schema.declare<DeleteStoryParams>((input): input is DeleteStoryParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const deleteStory = callMethod({
  method: "deleteStory",
  params: DeleteStoryParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Literal(true)),
  retrySafe: true,
});

/** Use this method to remove webhook integration if you decide to switch back to getUpdates. Returns True on success. */
export interface DeleteWebhookParams {
  /** Pass True to drop all pending updates */
  readonly dropPendingUpdates?: boolean | undefined;
}
export const DeleteWebhookParams: Schema.Codec<DeleteWebhookParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { drop_pending_updates: "dropPendingUpdates" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  drop_pending_updates: Schema.optional(Schema.Boolean),
  });
  const decoded = Schema.declare<DeleteWebhookParams>((input): input is DeleteWebhookParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const deleteWebhook = callMethod({
  method: "deleteWebhook",
  params: DeleteWebhookParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Literal(true)),
  retrySafe: true,
});

/** Use this method to edit a non-primary invite link created by the bot. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns the edited invite link as a ChatInviteLink object. */
export interface EditChatInviteLinkParams {
  /** Unique identifier for the target chat or username of the target channel in the format @username */
  readonly chatId: number | string;
  /** The invite link to edit */
  readonly inviteLink: string;
  /** Invite link name; 0-32 characters */
  readonly name?: string | undefined;
  /** Point in time (Unix timestamp) when the link will expire */
  readonly expireDate?: number | undefined;
  /** The maximum number of users that can be members of the chat simultaneously after joining the chat via this invite link; 1-99999 */
  readonly memberLimit?: number | undefined;
  /** True, if users joining the chat via the link need to be approved by chat administrators. If True, member_limit can't be specified. */
  readonly createsJoinRequest?: boolean | undefined;
}
export const EditChatInviteLinkParams: Schema.Codec<EditChatInviteLinkParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { chat_id: "chatId", invite_link: "inviteLink", expire_date: "expireDate", member_limit: "memberLimit", creates_join_request: "createsJoinRequest" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  chat_id: Schema.Union([Schema.Int, Schema.String]),
    invite_link: Schema.String,
    name: Schema.optional(Schema.String),
    expire_date: Schema.optional(Schema.Int),
    member_limit: Schema.optional(Schema.Int),
    creates_join_request: Schema.optional(Schema.Boolean),
  });
  const decoded = Schema.declare<EditChatInviteLinkParams>((input): input is EditChatInviteLinkParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const editChatInviteLink = callMethod({
  method: "editChatInviteLink",
  params: EditChatInviteLinkParams,
  rateLimit: "none",
  result: Schema.suspend(() => Types.ChatInviteLink),
  retrySafe: true,
});

/** Use this method to edit a subscription invite link created by the bot. The bot must have the can_invite_users administrator rights. Returns the edited invite link as a ChatInviteLink object. */
export interface EditChatSubscriptionInviteLinkParams {
  /** Unique identifier for the target chat or username of the target channel in the format @username */
  readonly chatId: number | string;
  /** The invite link to edit */
  readonly inviteLink: string;
  /** Invite link name; 0-32 characters */
  readonly name?: string | undefined;
}
export const EditChatSubscriptionInviteLinkParams: Schema.Codec<EditChatSubscriptionInviteLinkParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { chat_id: "chatId", invite_link: "inviteLink" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  chat_id: Schema.Union([Schema.Int, Schema.String]),
    invite_link: Schema.String,
    name: Schema.optional(Schema.String),
  });
  const decoded = Schema.declare<EditChatSubscriptionInviteLinkParams>((input): input is EditChatSubscriptionInviteLinkParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const editChatSubscriptionInviteLink = callMethod({
  method: "editChatSubscriptionInviteLink",
  params: EditChatSubscriptionInviteLinkParams,
  rateLimit: "none",
  result: Schema.suspend(() => Types.ChatInviteLink),
  retrySafe: true,
});

/** Use this method to edit the caption of an ephemeral message. Note that it is not guaranteed that the user will receive the message edit event, especially if they are offline. On success, True is returned. */
export interface EditEphemeralMessageCaptionParams {
  /** Unique identifier for the target chat or username of the target supergroup in the format @username */
  readonly chatId: number | string;
  /** Identifier of the user who received the message */
  readonly receiverUserId: number;
  /** Identifier of the ephemeral message to edit */
  readonly ephemeralMessageId: number;
  /** New caption of the message, 0-1024 characters after entities parsing */
  readonly caption?: string | undefined;
  /** Mode for parsing entities in the message caption. See formatting options for more details. */
  readonly parseMode?: Types.ParseMode | undefined;
  /** A JSON-serialized list of special entities that appear in the caption, which can be specified instead of parse_mode */
  readonly captionEntities?: ReadonlyArray<Types.MessageEntity> | undefined;
  /** Pass True if the caption must be shown above the message media. Supported only for animation, photo and video messages. */
  readonly showCaptionAboveMedia?: boolean | undefined;
  /** A JSON-serialized object for an inline keyboard */
  readonly replyMarkup?: Types.InlineKeyboardMarkup | undefined;
}
export const EditEphemeralMessageCaptionParams: Schema.Codec<EditEphemeralMessageCaptionParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { chat_id: "chatId", receiver_user_id: "receiverUserId", ephemeral_message_id: "ephemeralMessageId", parse_mode: "parseMode", caption_entities: "captionEntities", show_caption_above_media: "showCaptionAboveMedia", reply_markup: "replyMarkup" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  chat_id: Schema.Union([Schema.Int, Schema.String]),
    receiver_user_id: Schema.Int,
    ephemeral_message_id: Schema.Int,
    caption: Schema.optional(Schema.String),
    parse_mode: Schema.optional(Types.ParseMode),
    caption_entities: Schema.optional(Schema.Array(Types.MessageEntity)),
    show_caption_above_media: Schema.optional(Schema.Boolean),
    reply_markup: Schema.optional(Types.InlineKeyboardMarkup),
  });
  const decoded = Schema.declare<EditEphemeralMessageCaptionParams>((input): input is EditEphemeralMessageCaptionParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const editEphemeralMessageCaption = callMethod({
  method: "editEphemeralMessageCaption",
  params: EditEphemeralMessageCaptionParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Literal(true)),
  retrySafe: true,
});

/** Use this method to edit the media of an ephemeral message. Note that it is not guaranteed that the user will receive the message edit event, especially if they are offline. On success, True is returned. */
export interface EditEphemeralMessageMediaParams {
  /** Unique identifier for the target chat or username of the target supergroup in the format @username */
  readonly chatId: number | string;
  /** Identifier of the user who received the message */
  readonly receiverUserId: number;
  /** Identifier of the ephemeral message to edit */
  readonly ephemeralMessageId: number;
  /** A JSON-serialized object for the new media content of the message */
  readonly media: Types.InputMedia;
  /** A JSON-serialized object for an inline keyboard */
  readonly replyMarkup?: Types.InlineKeyboardMarkup | undefined;
}
export const EditEphemeralMessageMediaParams: Schema.Codec<EditEphemeralMessageMediaParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { chat_id: "chatId", receiver_user_id: "receiverUserId", ephemeral_message_id: "ephemeralMessageId", reply_markup: "replyMarkup" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  chat_id: Schema.Union([Schema.Int, Schema.String]),
    receiver_user_id: Schema.Int,
    ephemeral_message_id: Schema.Int,
    media: Types.InputMedia,
    reply_markup: Schema.optional(Types.InlineKeyboardMarkup),
  });
  const decoded = Schema.declare<EditEphemeralMessageMediaParams>((input): input is EditEphemeralMessageMediaParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const editEphemeralMessageMedia = callMethod({
  method: "editEphemeralMessageMedia",
  params: EditEphemeralMessageMediaParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Literal(true)),
  retrySafe: true,
});

/** Use this method to edit only the reply markup of an ephemeral message. Note that it is not guaranteed that the user will receive the message edit event, especially if they are offline. On success, True is returned. */
export interface EditEphemeralMessageReplyMarkupParams {
  /** Unique identifier for the target chat or username of the target supergroup in the format @username */
  readonly chatId: number | string;
  /** Identifier of the user who received the message */
  readonly receiverUserId: number;
  /** Identifier of the ephemeral message to edit */
  readonly ephemeralMessageId: number;
  /** A JSON-serialized object for an inline keyboard */
  readonly replyMarkup?: Types.InlineKeyboardMarkup | undefined;
}
export const EditEphemeralMessageReplyMarkupParams: Schema.Codec<EditEphemeralMessageReplyMarkupParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { chat_id: "chatId", receiver_user_id: "receiverUserId", ephemeral_message_id: "ephemeralMessageId", reply_markup: "replyMarkup" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  chat_id: Schema.Union([Schema.Int, Schema.String]),
    receiver_user_id: Schema.Int,
    ephemeral_message_id: Schema.Int,
    reply_markup: Schema.optional(Types.InlineKeyboardMarkup),
  });
  const decoded = Schema.declare<EditEphemeralMessageReplyMarkupParams>((input): input is EditEphemeralMessageReplyMarkupParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const editEphemeralMessageReplyMarkup = callMethod({
  method: "editEphemeralMessageReplyMarkup",
  params: EditEphemeralMessageReplyMarkupParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Literal(true)),
  retrySafe: true,
});

/** Use this method to edit an ephemeral text or rich message. Note that it is not guaranteed that the user will receive the message edit event, especially if they are offline. On success, True is returned. */
export interface EditEphemeralMessageTextParams {
  /** Unique identifier for the target chat or username of the target supergroup in the format @username */
  readonly chatId: number | string;
  /** Identifier of the user who received the message */
  readonly receiverUserId: number;
  /** Identifier of the ephemeral message to edit */
  readonly ephemeralMessageId: number;
  /** New text of the message, 1-4096 characters after entity parsing; required if rich_message isn't specified */
  readonly text?: string | undefined;
  /** Mode for parsing entities in the message text. See formatting options for more details. */
  readonly parseMode?: Types.ParseMode | undefined;
  /** A JSON-serialized list of special entities that appear in message text, which can be specified instead of parse_mode */
  readonly entities?: ReadonlyArray<Types.MessageEntity> | undefined;
  /** New rich content of the message; required if text isn't specified */
  readonly richMessage?: Types.InputRichMessage | undefined;
  /** Link preview generation options for the message */
  readonly linkPreviewOptions?: Types.LinkPreviewOptions | undefined;
  /** A JSON-serialized object for an inline keyboard */
  readonly replyMarkup?: Types.InlineKeyboardMarkup | undefined;
}
export const EditEphemeralMessageTextParams: Schema.Codec<EditEphemeralMessageTextParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { chat_id: "chatId", receiver_user_id: "receiverUserId", ephemeral_message_id: "ephemeralMessageId", parse_mode: "parseMode", rich_message: "richMessage", link_preview_options: "linkPreviewOptions", reply_markup: "replyMarkup" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  chat_id: Schema.Union([Schema.Int, Schema.String]),
    receiver_user_id: Schema.Int,
    ephemeral_message_id: Schema.Int,
    text: Schema.optional(Schema.String),
    parse_mode: Schema.optional(Types.ParseMode),
    entities: Schema.optional(Schema.Array(Types.MessageEntity)),
    rich_message: Schema.optional(Types.InputRichMessage),
    link_preview_options: Schema.optional(Types.LinkPreviewOptions),
    reply_markup: Schema.optional(Types.InlineKeyboardMarkup),
  });
  const decoded = Schema.declare<EditEphemeralMessageTextParams>((input): input is EditEphemeralMessageTextParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const editEphemeralMessageText = callMethod({
  method: "editEphemeralMessageText",
  params: EditEphemeralMessageTextParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Literal(true)),
  retrySafe: true,
});

/** Use this method to edit name and icon of a topic in a forum supergroup chat or a private chat with a user. In the case of a supergroup chat the bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights, unless it is the creator of the topic. Returns True on success. */
export interface EditForumTopicParams {
  /** Unique identifier for the target chat or username of the target supergroup in the format @username */
  readonly chatId: number | string;
  /** Unique identifier for the target message thread of the forum topic */
  readonly messageThreadId: number;
  /** New topic name, 0-128 characters. If not specified or empty, the current name of the topic will be kept. */
  readonly name?: string | undefined;
  /** New unique identifier of the custom emoji shown as the topic icon. Use getForumTopicIconStickers to get all allowed custom emoji identifiers. Pass an empty string to remove the icon. If not specified, the current icon will be kept. */
  readonly iconCustomEmojiId?: string | undefined;
}
export const EditForumTopicParams: Schema.Codec<EditForumTopicParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { chat_id: "chatId", message_thread_id: "messageThreadId", icon_custom_emoji_id: "iconCustomEmojiId" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  chat_id: Schema.Union([Schema.Int, Schema.String]),
    message_thread_id: Schema.Int,
    name: Schema.optional(Schema.String),
    icon_custom_emoji_id: Schema.optional(Schema.String),
  });
  const decoded = Schema.declare<EditForumTopicParams>((input): input is EditForumTopicParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const editForumTopic = callMethod({
  method: "editForumTopic",
  params: EditForumTopicParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Literal(true)),
  retrySafe: true,
});

/** Use this method to edit the name of the 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights. Returns True on success. */
export interface EditGeneralForumTopicParams {
  /** Unique identifier for the target chat or username of the target supergroup in the format @username */
  readonly chatId: number | string;
  /** New topic name, 1-128 characters */
  readonly name: string;
}
export const EditGeneralForumTopicParams: Schema.Codec<EditGeneralForumTopicParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { chat_id: "chatId" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  chat_id: Schema.Union([Schema.Int, Schema.String]),
    name: Schema.String,
  });
  const decoded = Schema.declare<EditGeneralForumTopicParams>((input): input is EditGeneralForumTopicParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const editGeneralForumTopic = callMethod({
  method: "editGeneralForumTopic",
  params: EditGeneralForumTopicParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Literal(true)),
  retrySafe: true,
});

/** Use this method to edit captions of messages. On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned. Note that business messages that were not sent by the bot and do not contain an inline keyboard can only be edited within 48 hours from the time they were sent. */
export interface EditMessageCaptionParams {
  /** Unique identifier of the business connection on behalf of which the message to be edited was sent */
  readonly businessConnectionId?: string | undefined;
  /** Required if inline_message_id is not specified. Unique identifier for the target chat or username of the target bot, supergroup or channel in the format @username. */
  readonly chatId?: number | string | undefined;
  /** Required if inline_message_id is not specified. Identifier of the message to edit. */
  readonly messageId?: number | undefined;
  /** Required if chat_id and message_id are not specified. Identifier of the inline message. */
  readonly inlineMessageId?: string | undefined;
  /** New caption of the message, 0-1024 characters after entities parsing */
  readonly caption?: string | undefined;
  /** Mode for parsing entities in the message caption. See formatting options for more details. */
  readonly parseMode?: Types.ParseMode | undefined;
  /** A JSON-serialized list of special entities that appear in the caption, which can be specified instead of parse_mode */
  readonly captionEntities?: ReadonlyArray<Types.MessageEntity> | undefined;
  /** Pass True if the caption must be shown above the message media. Supported only for animation, photo and video messages. */
  readonly showCaptionAboveMedia?: boolean | undefined;
  /** A JSON-serialized object for an inline keyboard */
  readonly replyMarkup?: Types.InlineKeyboardMarkup | undefined;
}
export const EditMessageCaptionParams: Schema.Codec<EditMessageCaptionParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { business_connection_id: "businessConnectionId", chat_id: "chatId", message_id: "messageId", inline_message_id: "inlineMessageId", parse_mode: "parseMode", caption_entities: "captionEntities", show_caption_above_media: "showCaptionAboveMedia", reply_markup: "replyMarkup" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  business_connection_id: Schema.optional(Schema.String),
    chat_id: Schema.optional(Schema.Union([Schema.Int, Schema.String])),
    message_id: Schema.optional(Schema.Int),
    inline_message_id: Schema.optional(Schema.String),
    caption: Schema.optional(Schema.String),
    parse_mode: Schema.optional(Types.ParseMode),
    caption_entities: Schema.optional(Schema.Array(Types.MessageEntity)),
    show_caption_above_media: Schema.optional(Schema.Boolean),
    reply_markup: Schema.optional(Types.InlineKeyboardMarkup),
  });
  const decoded = Schema.declare<EditMessageCaptionParams>((input): input is EditMessageCaptionParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const editMessageCaption = callMethod({
  method: "editMessageCaption",
  params: EditMessageCaptionParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Union([Types.Message, Schema.Literal(true)])),
  retrySafe: true,
});

/** Use this method to edit a checklist on behalf of a connected business account. On success, the edited Message is returned. */
export interface EditMessageChecklistParams {
  /** Unique identifier of the business connection on behalf of which the message will be sent */
  readonly businessConnectionId: string;
  /** Unique identifier for the target chat or username of the target bot in the format @username */
  readonly chatId: number | string;
  /** Unique identifier for the target message */
  readonly messageId: number;
  /** A JSON-serialized object for the new checklist */
  readonly checklist: Types.InputChecklist;
  /** A JSON-serialized object for the new inline keyboard for the message */
  readonly replyMarkup?: Types.InlineKeyboardMarkup | undefined;
}
export const EditMessageChecklistParams: Schema.Codec<EditMessageChecklistParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { business_connection_id: "businessConnectionId", chat_id: "chatId", message_id: "messageId", reply_markup: "replyMarkup" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  business_connection_id: Schema.String,
    chat_id: Schema.Union([Schema.Int, Schema.String]),
    message_id: Schema.Int,
    checklist: Types.InputChecklist,
    reply_markup: Schema.optional(Types.InlineKeyboardMarkup),
  });
  const decoded = Schema.declare<EditMessageChecklistParams>((input): input is EditMessageChecklistParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const editMessageChecklist = callMethod({
  method: "editMessageChecklist",
  params: EditMessageChecklistParams,
  rateLimit: "none",
  result: Schema.suspend(() => Types.Message),
  retrySafe: true,
});

/** Use this method to edit live location messages. A location can be edited until its live_period expires or editing is explicitly disabled by a call to stopMessageLiveLocation. On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned. */
export interface EditMessageLiveLocationParams {
  /** Unique identifier of the business connection on behalf of which the message to be edited was sent */
  readonly businessConnectionId?: string | undefined;
  /** Required if inline_message_id is not specified. Unique identifier for the target chat or username of the target bot, supergroup or channel in the format @username. */
  readonly chatId?: number | string | undefined;
  /** Required if inline_message_id is not specified. Identifier of the message to edit. */
  readonly messageId?: number | undefined;
  /** Required if chat_id and message_id are not specified. Identifier of the inline message. */
  readonly inlineMessageId?: string | undefined;
  /** Latitude of new location */
  readonly latitude: number;
  /** Longitude of new location */
  readonly longitude: number;
  /** New period in seconds during which the location can be updated, starting from the message send date. If 0x7FFFFFFF is specified, then the location can be updated forever. Otherwise, the new value must not exceed the current live_period by more than a day, and the live location expiration date must remain within the next 90 days. If not specified, then live_period remains unchanged. */
  readonly livePeriod?: number | undefined;
  /** The radius of uncertainty for the location, measured in meters; 0-1500 */
  readonly horizontalAccuracy?: number | undefined;
  /** Direction in which the user is moving, in degrees. Must be between 1 and 360 if specified. */
  readonly heading?: number | undefined;
  /** The maximum distance for proximity alerts about approaching another chat member, in meters. Must be between 1 and 100000 if specified. */
  readonly proximityAlertRadius?: number | undefined;
  /** A JSON-serialized object for a new inline keyboard */
  readonly replyMarkup?: Types.InlineKeyboardMarkup | undefined;
}
export const EditMessageLiveLocationParams: Schema.Codec<EditMessageLiveLocationParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { business_connection_id: "businessConnectionId", chat_id: "chatId", message_id: "messageId", inline_message_id: "inlineMessageId", live_period: "livePeriod", horizontal_accuracy: "horizontalAccuracy", proximity_alert_radius: "proximityAlertRadius", reply_markup: "replyMarkup" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  business_connection_id: Schema.optional(Schema.String),
    chat_id: Schema.optional(Schema.Union([Schema.Int, Schema.String])),
    message_id: Schema.optional(Schema.Int),
    inline_message_id: Schema.optional(Schema.String),
    latitude: Schema.Number,
    longitude: Schema.Number,
    live_period: Schema.optional(Schema.Int),
    horizontal_accuracy: Schema.optional(Schema.Number),
    heading: Schema.optional(Schema.Int),
    proximity_alert_radius: Schema.optional(Schema.Int),
    reply_markup: Schema.optional(Types.InlineKeyboardMarkup),
  });
  const decoded = Schema.declare<EditMessageLiveLocationParams>((input): input is EditMessageLiveLocationParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const editMessageLiveLocation = callMethod({
  method: "editMessageLiveLocation",
  params: EditMessageLiveLocationParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Union([Types.Message, Schema.Literal(true)])),
  retrySafe: true,
});

/** Use this method to edit animation, audio, document, live photo, photo, or video messages, or to replace a text or a rich message with a media. If a message is part of a message album, then it can be edited only to an audio for audio albums, only to a document for document albums and to a photo, a live photo, or a video otherwise. When an inline message is edited, a new file can't be uploaded; use a previously uploaded file via its file_id or specify a URL. On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned. Note that business messages that were not sent by the bot and do not contain an inline keyboard can only be edited within 48 hours from the time they were sent. */
export interface EditMessageMediaParams {
  /** Unique identifier of the business connection on behalf of which the message to be edited was sent */
  readonly businessConnectionId?: string | undefined;
  /** Required if inline_message_id is not specified. Unique identifier for the target chat or username of the target bot, supergroup or channel in the format @username. */
  readonly chatId?: number | string | undefined;
  /** Required if inline_message_id is not specified. Identifier of the message to edit. */
  readonly messageId?: number | undefined;
  /** Required if chat_id and message_id are not specified. Identifier of the inline message. */
  readonly inlineMessageId?: string | undefined;
  /** A JSON-serialized object for the new media content of the message */
  readonly media: Types.InputMedia;
  /** A JSON-serialized object for a new inline keyboard */
  readonly replyMarkup?: Types.InlineKeyboardMarkup | undefined;
}
export const EditMessageMediaParams: Schema.Codec<EditMessageMediaParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { business_connection_id: "businessConnectionId", chat_id: "chatId", message_id: "messageId", inline_message_id: "inlineMessageId", reply_markup: "replyMarkup" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  business_connection_id: Schema.optional(Schema.String),
    chat_id: Schema.optional(Schema.Union([Schema.Int, Schema.String])),
    message_id: Schema.optional(Schema.Int),
    inline_message_id: Schema.optional(Schema.String),
    media: Types.InputMedia,
    reply_markup: Schema.optional(Types.InlineKeyboardMarkup),
  });
  const decoded = Schema.declare<EditMessageMediaParams>((input): input is EditMessageMediaParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const editMessageMedia = callMethod({
  method: "editMessageMedia",
  params: EditMessageMediaParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Union([Types.Message, Schema.Literal(true)])),
  retrySafe: true,
});

/** Use this method to edit only the reply markup of messages. On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned. Note that business messages that were not sent by the bot and do not contain an inline keyboard can only be edited within 48 hours from the time they were sent. */
export interface EditMessageReplyMarkupParams {
  /** Unique identifier of the business connection on behalf of which the message to be edited was sent */
  readonly businessConnectionId?: string | undefined;
  /** Required if inline_message_id is not specified. Unique identifier for the target chat or username of the target bot, supergroup or channel in the format @username. */
  readonly chatId?: number | string | undefined;
  /** Required if inline_message_id is not specified. Identifier of the message to edit. */
  readonly messageId?: number | undefined;
  /** Required if chat_id and message_id are not specified. Identifier of the inline message. */
  readonly inlineMessageId?: string | undefined;
  /** A JSON-serialized object for an inline keyboard */
  readonly replyMarkup?: Types.InlineKeyboardMarkup | undefined;
}
export const EditMessageReplyMarkupParams: Schema.Codec<EditMessageReplyMarkupParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { business_connection_id: "businessConnectionId", chat_id: "chatId", message_id: "messageId", inline_message_id: "inlineMessageId", reply_markup: "replyMarkup" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  business_connection_id: Schema.optional(Schema.String),
    chat_id: Schema.optional(Schema.Union([Schema.Int, Schema.String])),
    message_id: Schema.optional(Schema.Int),
    inline_message_id: Schema.optional(Schema.String),
    reply_markup: Schema.optional(Types.InlineKeyboardMarkup),
  });
  const decoded = Schema.declare<EditMessageReplyMarkupParams>((input): input is EditMessageReplyMarkupParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const editMessageReplyMarkup = callMethod({
  method: "editMessageReplyMarkup",
  params: EditMessageReplyMarkupParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Union([Types.Message, Schema.Literal(true)])),
  retrySafe: true,
});

/** Use this method to edit text, rich and game messages. On success, if the edited message is not an inline message, the edited Message is returned, otherwise True is returned. Note that business messages that were not sent by the bot and do not contain an inline keyboard can only be edited within 48 hours from the time they were sent. */
export interface EditMessageTextParams {
  /** Unique identifier of the business connection on behalf of which the message to be edited was sent */
  readonly businessConnectionId?: string | undefined;
  /** Required if inline_message_id is not specified. Unique identifier for the target chat or username of the target bot, supergroup or channel in the format @username. */
  readonly chatId?: number | string | undefined;
  /** Required if inline_message_id is not specified. Identifier of the message to edit. */
  readonly messageId?: number | undefined;
  /** Required if chat_id and message_id are not specified. Identifier of the inline message. */
  readonly inlineMessageId?: string | undefined;
  /** New text of the message, 1-4096 characters after entity parsing; required if rich_message isn't specified */
  readonly text?: string | undefined;
  /** Mode for parsing entities in the message text. See formatting options for more details. */
  readonly parseMode?: Types.ParseMode | undefined;
  /** A JSON-serialized list of special entities that appear in message text, which can be specified instead of parse_mode */
  readonly entities?: ReadonlyArray<Types.MessageEntity> | undefined;
  /** Link preview generation options for the message */
  readonly linkPreviewOptions?: Types.LinkPreviewOptions | undefined;
  /** New rich content of the message; required if text isn't specified. Direct upload of new files and explicit upload of files by a URL isn't supported when an inline message is edited. */
  readonly richMessage?: Types.InputRichMessage | undefined;
  /** A JSON-serialized object for an inline keyboard */
  readonly replyMarkup?: Types.InlineKeyboardMarkup | undefined;
}
export const EditMessageTextParams: Schema.Codec<EditMessageTextParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { business_connection_id: "businessConnectionId", chat_id: "chatId", message_id: "messageId", inline_message_id: "inlineMessageId", parse_mode: "parseMode", link_preview_options: "linkPreviewOptions", rich_message: "richMessage", reply_markup: "replyMarkup" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  business_connection_id: Schema.optional(Schema.String),
    chat_id: Schema.optional(Schema.Union([Schema.Int, Schema.String])),
    message_id: Schema.optional(Schema.Int),
    inline_message_id: Schema.optional(Schema.String),
    text: Schema.optional(Schema.String),
    parse_mode: Schema.optional(Types.ParseMode),
    entities: Schema.optional(Schema.Array(Types.MessageEntity)),
    link_preview_options: Schema.optional(Types.LinkPreviewOptions),
    rich_message: Schema.optional(Types.InputRichMessage),
    reply_markup: Schema.optional(Types.InlineKeyboardMarkup),
  });
  const decoded = Schema.declare<EditMessageTextParams>((input): input is EditMessageTextParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const editMessageText = callMethod({
  method: "editMessageText",
  params: EditMessageTextParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Union([Types.Message, Schema.Literal(true)])),
  retrySafe: true,
});

/** Edits a story previously posted by the bot on behalf of a managed business account. Requires the can_manage_stories business bot right. Returns Story on success. */
export interface EditStoryParams {
  /** Unique identifier of the business connection */
  readonly businessConnectionId: string;
  /** Unique identifier of the story to edit */
  readonly storyId: number;
  /** Content of the story */
  readonly content: Types.InputStoryContent;
  /** Caption of the story, 0-2048 characters after entities parsing */
  readonly caption?: string | undefined;
  /** Mode for parsing entities in the story caption. See formatting options for more details. */
  readonly parseMode?: Types.ParseMode | undefined;
  /** A JSON-serialized list of special entities that appear in the caption, which can be specified instead of parse_mode */
  readonly captionEntities?: ReadonlyArray<Types.MessageEntity> | undefined;
  /** A JSON-serialized list of clickable areas to be shown on the story */
  readonly areas?: ReadonlyArray<Types.StoryArea> | undefined;
}
export const EditStoryParams: Schema.Codec<EditStoryParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { business_connection_id: "businessConnectionId", story_id: "storyId", parse_mode: "parseMode", caption_entities: "captionEntities" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  business_connection_id: Schema.String,
    story_id: Schema.Int,
    content: Types.InputStoryContent,
    caption: Schema.optional(Schema.String),
    parse_mode: Schema.optional(Types.ParseMode),
    caption_entities: Schema.optional(Schema.Array(Types.MessageEntity)),
    areas: Schema.optional(Schema.Array(Types.StoryArea)),
  });
  const decoded = Schema.declare<EditStoryParams>((input): input is EditStoryParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const editStory = callMethod({
  method: "editStory",
  params: EditStoryParams,
  rateLimit: "none",
  result: Schema.suspend(() => Types.Story),
  retrySafe: true,
});

/** Allows the bot to cancel or re-enable extension of a subscription paid in Telegram Stars. Returns True on success. */
export interface EditUserStarSubscriptionParams {
  /** Identifier of the user whose subscription will be edited */
  readonly userId: number;
  /** Telegram payment identifier for the subscription */
  readonly telegramPaymentChargeId: string;
  /** Pass True to cancel extension of the user subscription; the subscription must be active up to the end of the current subscription period. Pass False to allow the user to re-enable a subscription that was previously canceled by the bot. */
  readonly isCanceled: boolean;
}
export const EditUserStarSubscriptionParams: Schema.Codec<EditUserStarSubscriptionParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { user_id: "userId", telegram_payment_charge_id: "telegramPaymentChargeId", is_canceled: "isCanceled" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  user_id: Schema.Int,
    telegram_payment_charge_id: Schema.String,
    is_canceled: Schema.Boolean,
  });
  const decoded = Schema.declare<EditUserStarSubscriptionParams>((input): input is EditUserStarSubscriptionParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const editUserStarSubscription = callMethod({
  method: "editUserStarSubscription",
  params: EditUserStarSubscriptionParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Literal(true)),
  retrySafe: true,
});

/** Use this method to generate a new primary invite link for a chat; any previously generated primary link is revoked. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns the new invite link as String on success. */
export interface ExportChatInviteLinkParams {
  /** Unique identifier for the target chat or username of the target channel in the format @username */
  readonly chatId: number | string;
}
export const ExportChatInviteLinkParams: Schema.Codec<ExportChatInviteLinkParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { chat_id: "chatId" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  chat_id: Schema.Union([Schema.Int, Schema.String]),
  });
  const decoded = Schema.declare<ExportChatInviteLinkParams>((input): input is ExportChatInviteLinkParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const exportChatInviteLink = callMethod({
  method: "exportChatInviteLink",
  params: ExportChatInviteLinkParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.String),
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
export const ForwardMessageParams: Schema.Codec<ForwardMessageParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { chat_id: "chatId", message_thread_id: "messageThreadId", direct_messages_topic_id: "directMessagesTopicId", from_chat_id: "fromChatId", video_start_timestamp: "videoStartTimestamp", disable_notification: "disableNotification", protect_content: "protectContent", message_effect_id: "messageEffectId", suggested_post_parameters: "suggestedPostParameters", message_id: "messageId" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  chat_id: Schema.Union([Schema.Int, Schema.String]),
    message_thread_id: Schema.optional(Schema.Int),
    direct_messages_topic_id: Schema.optional(Schema.Int),
    from_chat_id: Schema.Union([Schema.Int, Schema.String]),
    video_start_timestamp: Schema.optional(Schema.Int),
    disable_notification: Schema.optional(Schema.Boolean),
    protect_content: Schema.optional(Schema.Boolean),
    message_effect_id: Schema.optional(Schema.String),
    suggested_post_parameters: Schema.optional(Types.SuggestedPostParameters),
    message_id: Schema.Int,
  });
  const decoded = Schema.declare<ForwardMessageParams>((input): input is ForwardMessageParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const forwardMessage = callMethod({
  method: "forwardMessage",
  params: ForwardMessageParams,
  rateLimit: "message",
  result: Schema.suspend(() => Types.Message),
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
export const ForwardMessagesParams: Schema.Codec<ForwardMessagesParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { chat_id: "chatId", message_thread_id: "messageThreadId", direct_messages_topic_id: "directMessagesTopicId", from_chat_id: "fromChatId", message_ids: "messageIds", disable_notification: "disableNotification", protect_content: "protectContent" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  chat_id: Schema.Union([Schema.Int, Schema.String]),
    message_thread_id: Schema.optional(Schema.Int),
    direct_messages_topic_id: Schema.optional(Schema.Int),
    from_chat_id: Schema.Union([Schema.Int, Schema.String]),
    message_ids: Schema.Array(Schema.Int),
    disable_notification: Schema.optional(Schema.Boolean),
    protect_content: Schema.optional(Schema.Boolean),
  });
  const decoded = Schema.declare<ForwardMessagesParams>((input): input is ForwardMessagesParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const forwardMessages = callMethod({
  method: "forwardMessages",
  params: ForwardMessagesParams,
  rateLimit: "message-id-array",
  result: Schema.suspend(() => Schema.Array(Types.MessageId)),
  retrySafe: false,
});

/** Returns the list of gifts that can be sent by the bot to users and channel chats. Requires no parameters. Returns a Gifts object. */
export const getAvailableGifts = callMethod({
  method: "getAvailableGifts",
  rateLimit: "none",
  result: Schema.suspend(() => Types.Gifts),
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
export const GetBusinessAccountGiftsParams: Schema.Codec<GetBusinessAccountGiftsParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { business_connection_id: "businessConnectionId", exclude_unsaved: "excludeUnsaved", exclude_saved: "excludeSaved", exclude_unlimited: "excludeUnlimited", exclude_limited_upgradable: "excludeLimitedUpgradable", exclude_limited_non_upgradable: "excludeLimitedNonUpgradable", exclude_unique: "excludeUnique", exclude_from_blockchain: "excludeFromBlockchain", sort_by_price: "sortByPrice" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
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
  const decoded = Schema.declare<GetBusinessAccountGiftsParams>((input): input is GetBusinessAccountGiftsParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const getBusinessAccountGifts = callMethod({
  method: "getBusinessAccountGifts",
  params: GetBusinessAccountGiftsParams,
  rateLimit: "none",
  result: Schema.suspend(() => Types.OwnedGifts),
  retrySafe: true,
});

/** Returns the amount of Telegram Stars owned by a managed business account. Requires the can_view_gifts_and_stars business bot right. Returns StarAmount on success. */
export interface GetBusinessAccountStarBalanceParams {
  /** Unique identifier of the business connection */
  readonly businessConnectionId: string;
}
export const GetBusinessAccountStarBalanceParams: Schema.Codec<GetBusinessAccountStarBalanceParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { business_connection_id: "businessConnectionId" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  business_connection_id: Schema.String,
  });
  const decoded = Schema.declare<GetBusinessAccountStarBalanceParams>((input): input is GetBusinessAccountStarBalanceParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const getBusinessAccountStarBalance = callMethod({
  method: "getBusinessAccountStarBalance",
  params: GetBusinessAccountStarBalanceParams,
  rateLimit: "none",
  result: Schema.suspend(() => Types.StarAmount),
  retrySafe: true,
});

/** Use this method to get information about the connection of the bot with a business account. Returns a BusinessConnection object on success. */
export interface GetBusinessConnectionParams {
  /** Unique identifier of the business connection */
  readonly businessConnectionId: string;
}
export const GetBusinessConnectionParams: Schema.Codec<GetBusinessConnectionParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { business_connection_id: "businessConnectionId" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  business_connection_id: Schema.String,
  });
  const decoded = Schema.declare<GetBusinessConnectionParams>((input): input is GetBusinessConnectionParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const getBusinessConnection = callMethod({
  method: "getBusinessConnection",
  params: GetBusinessConnectionParams,
  rateLimit: "none",
  result: Schema.suspend(() => Types.BusinessConnection),
  retrySafe: true,
});

/** Use this method to get up-to-date information about the chat. Returns a ChatFullInfo object on success. */
export interface GetChatParams {
  /** Unique identifier for the target chat or username of the target supergroup or channel in the format @username */
  readonly chatId: number | string;
}
export const GetChatParams: Schema.Codec<GetChatParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { chat_id: "chatId" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  chat_id: Schema.Union([Schema.Int, Schema.String]),
  });
  const decoded = Schema.declare<GetChatParams>((input): input is GetChatParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const getChat = callMethod({
  method: "getChat",
  params: GetChatParams,
  rateLimit: "none",
  result: Schema.suspend(() => Types.ChatFullInfo),
  retrySafe: true,
});

/** Use this method to get a list of administrators in a chat. Returns an Array of ChatMember objects. */
export interface GetChatAdministratorsParams {
  /** Unique identifier for the target chat or username of the target supergroup or channel in the format @username */
  readonly chatId: number | string;
  /** Pass True to additionally receive all bots that are administrators of the chat. By default, bots other than the current bot are omitted. */
  readonly returnBots?: boolean | undefined;
}
export const GetChatAdministratorsParams: Schema.Codec<GetChatAdministratorsParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { chat_id: "chatId", return_bots: "returnBots" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  chat_id: Schema.Union([Schema.Int, Schema.String]),
    return_bots: Schema.optional(Schema.Boolean),
  });
  const decoded = Schema.declare<GetChatAdministratorsParams>((input): input is GetChatAdministratorsParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const getChatAdministrators = callMethod({
  method: "getChatAdministrators",
  params: GetChatAdministratorsParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Array(Types.ChatMember)),
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
export const GetChatGiftsParams: Schema.Codec<GetChatGiftsParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { chat_id: "chatId", exclude_unsaved: "excludeUnsaved", exclude_saved: "excludeSaved", exclude_unlimited: "excludeUnlimited", exclude_limited_upgradable: "excludeLimitedUpgradable", exclude_limited_non_upgradable: "excludeLimitedNonUpgradable", exclude_from_blockchain: "excludeFromBlockchain", exclude_unique: "excludeUnique", sort_by_price: "sortByPrice" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
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
  const decoded = Schema.declare<GetChatGiftsParams>((input): input is GetChatGiftsParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const getChatGifts = callMethod({
  method: "getChatGifts",
  params: GetChatGiftsParams,
  rateLimit: "none",
  result: Schema.suspend(() => Types.OwnedGifts),
  retrySafe: true,
});

/** Use this method to get information about a member of a chat. The method is only guaranteed to work for other users if the bot is an administrator in the chat. Returns a ChatMember object on success. */
export interface GetChatMemberParams {
  /** Unique identifier for the target chat or username of the target supergroup or channel in the format @username */
  readonly chatId: number | string;
  /** Unique identifier of the target user */
  readonly userId: number;
}
export const GetChatMemberParams: Schema.Codec<GetChatMemberParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { chat_id: "chatId", user_id: "userId" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  chat_id: Schema.Union([Schema.Int, Schema.String]),
    user_id: Schema.Int,
  });
  const decoded = Schema.declare<GetChatMemberParams>((input): input is GetChatMemberParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const getChatMember = callMethod({
  method: "getChatMember",
  params: GetChatMemberParams,
  rateLimit: "none",
  result: Schema.suspend(() => Types.ChatMember),
  retrySafe: true,
});

/** Use this method to get the number of members in a chat. Returns Integer on success. */
export interface GetChatMemberCountParams {
  /** Unique identifier for the target chat or username of the target supergroup or channel in the format @username */
  readonly chatId: number | string;
}
export const GetChatMemberCountParams: Schema.Codec<GetChatMemberCountParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { chat_id: "chatId" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  chat_id: Schema.Union([Schema.Int, Schema.String]),
  });
  const decoded = Schema.declare<GetChatMemberCountParams>((input): input is GetChatMemberCountParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const getChatMemberCount = callMethod({
  method: "getChatMemberCount",
  params: GetChatMemberCountParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Int),
  retrySafe: true,
});

/** Use this method to get the current value of the bot's menu button in a private chat, or the default menu button. Returns MenuButton on success. */
export interface GetChatMenuButtonParams {
  /** Unique identifier for the target private chat. If not specified, the bot's default menu button will be returned. */
  readonly chatId?: number | undefined;
}
export const GetChatMenuButtonParams: Schema.Codec<GetChatMenuButtonParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { chat_id: "chatId" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  chat_id: Schema.optional(Schema.Int),
  });
  const decoded = Schema.declare<GetChatMenuButtonParams>((input): input is GetChatMenuButtonParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const getChatMenuButton = callMethod({
  method: "getChatMenuButton",
  params: GetChatMenuButtonParams,
  rateLimit: "none",
  result: Schema.suspend(() => Types.MenuButton),
  retrySafe: true,
});

/** Use this method to get information about custom emoji stickers by their identifiers. Returns an Array of Sticker objects. */
export interface GetCustomEmojiStickersParams {
  /** A JSON-serialized list of custom emoji identifiers. At most 200 custom emoji identifiers can be specified. */
  readonly customEmojiIds: ReadonlyArray<string>;
}
export const GetCustomEmojiStickersParams: Schema.Codec<GetCustomEmojiStickersParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { custom_emoji_ids: "customEmojiIds" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  custom_emoji_ids: Schema.Array(Schema.String),
  });
  const decoded = Schema.declare<GetCustomEmojiStickersParams>((input): input is GetCustomEmojiStickersParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const getCustomEmojiStickers = callMethod({
  method: "getCustomEmojiStickers",
  params: GetCustomEmojiStickersParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Array(Types.Sticker)),
  retrySafe: true,
});

/** Use this method to get basic information about a file and prepare it for downloading. For the moment, bots can download files of up to 20MB in size. On success, a File object is returned. The file can then be downloaded via the link https://api.telegram.org/file/bot<token>/<file_path>, where <file_path> is taken from the response. It is guaranteed that the link will be valid for at least 1 hour. When the link expires, a new one can be requested by calling getFile again. */
export interface GetFileParams {
  /** File identifier to get information about */
  readonly fileId: string;
}
export const GetFileParams: Schema.Codec<GetFileParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { file_id: "fileId" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  file_id: Schema.String,
  });
  const decoded = Schema.declare<GetFileParams>((input): input is GetFileParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const getFile = callMethod({
  method: "getFile",
  params: GetFileParams,
  rateLimit: "none",
  result: Schema.suspend(() => Types.File),
  retrySafe: true,
});

/** Use this method to get custom emoji stickers, which can be used as a forum topic icon by any user. Requires no parameters. Returns an Array of Sticker objects. */
export const getForumTopicIconStickers = callMethod({
  method: "getForumTopicIconStickers",
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Array(Types.Sticker)),
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
export const GetGameHighScoresParams: Schema.Codec<GetGameHighScoresParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { user_id: "userId", chat_id: "chatId", message_id: "messageId", inline_message_id: "inlineMessageId" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  user_id: Schema.Int,
    chat_id: Schema.optional(Schema.Int),
    message_id: Schema.optional(Schema.Int),
    inline_message_id: Schema.optional(Schema.String),
  });
  const decoded = Schema.declare<GetGameHighScoresParams>((input): input is GetGameHighScoresParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const getGameHighScores = callMethod({
  method: "getGameHighScores",
  params: GetGameHighScoresParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Array(Types.GameHighScore)),
  retrySafe: true,
});

/** Use this method to get the access settings of a managed bot. Returns a BotAccessSettings object on success. */
export interface GetManagedBotAccessSettingsParams {
  /** User identifier of the managed bot whose access settings will be returned */
  readonly userId: number;
}
export const GetManagedBotAccessSettingsParams: Schema.Codec<GetManagedBotAccessSettingsParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { user_id: "userId" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  user_id: Schema.Int,
  });
  const decoded = Schema.declare<GetManagedBotAccessSettingsParams>((input): input is GetManagedBotAccessSettingsParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const getManagedBotAccessSettings = callMethod({
  method: "getManagedBotAccessSettings",
  params: GetManagedBotAccessSettingsParams,
  rateLimit: "none",
  result: Schema.suspend(() => Types.BotAccessSettings),
  retrySafe: true,
});

/** Use this method to get the token of a managed bot. Returns the token as String on success. */
export interface GetManagedBotTokenParams {
  /** User identifier of the managed bot whose token will be returned */
  readonly userId: number;
}
export const GetManagedBotTokenParams: Schema.Codec<GetManagedBotTokenParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { user_id: "userId" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  user_id: Schema.Int,
  });
  const decoded = Schema.declare<GetManagedBotTokenParams>((input): input is GetManagedBotTokenParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const getManagedBotToken = callMethod({
  method: "getManagedBotToken",
  params: GetManagedBotTokenParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.RedactedFromValue(Schema.String, { label: "Telegram bot token" })),
  retrySafe: true,
});

/** A simple method for testing your bot's authentication token. Requires no parameters. Returns basic information about the bot in form of a User object. */
export const getMe = callMethod({
  method: "getMe",
  rateLimit: "none",
  result: Schema.suspend(() => Types.User),
  retrySafe: true,
});

/** Use this method to get the current list of the bot's commands for the given scope and user language. Returns an Array of BotCommand objects. If commands aren't set, an empty list is returned. */
export interface GetMyCommandsParams {
  /** A JSON-serialized object, describing scope of users. Defaults to BotCommandScopeDefault. */
  readonly scope?: Types.BotCommandScope | undefined;
  /** A two-letter ISO 639-1 language code or an empty string */
  readonly languageCode?: string | undefined;
}
export const GetMyCommandsParams: Schema.Codec<GetMyCommandsParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { language_code: "languageCode" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  scope: Schema.optional(Types.BotCommandScope),
    language_code: Schema.optional(Schema.String),
  });
  const decoded = Schema.declare<GetMyCommandsParams>((input): input is GetMyCommandsParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const getMyCommands = callMethod({
  method: "getMyCommands",
  params: GetMyCommandsParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Array(Types.BotCommand)),
  retrySafe: true,
});

/** Use this method to get the current default administrator rights of the bot. Returns ChatAdministratorRights on success. */
export interface GetMyDefaultAdministratorRightsParams {
  /** Pass True to get default administrator rights of the bot in channels. Otherwise, default administrator rights of the bot for groups and supergroups will be returned. */
  readonly forChannels?: boolean | undefined;
}
export const GetMyDefaultAdministratorRightsParams: Schema.Codec<GetMyDefaultAdministratorRightsParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { for_channels: "forChannels" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  for_channels: Schema.optional(Schema.Boolean),
  });
  const decoded = Schema.declare<GetMyDefaultAdministratorRightsParams>((input): input is GetMyDefaultAdministratorRightsParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const getMyDefaultAdministratorRights = callMethod({
  method: "getMyDefaultAdministratorRights",
  params: GetMyDefaultAdministratorRightsParams,
  rateLimit: "none",
  result: Schema.suspend(() => Types.ChatAdministratorRights),
  retrySafe: true,
});

/** Use this method to get the current bot description for the given user language. Returns BotDescription on success. */
export interface GetMyDescriptionParams {
  /** A two-letter ISO 639-1 language code or an empty string */
  readonly languageCode?: string | undefined;
}
export const GetMyDescriptionParams: Schema.Codec<GetMyDescriptionParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { language_code: "languageCode" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  language_code: Schema.optional(Schema.String),
  });
  const decoded = Schema.declare<GetMyDescriptionParams>((input): input is GetMyDescriptionParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const getMyDescription = callMethod({
  method: "getMyDescription",
  params: GetMyDescriptionParams,
  rateLimit: "none",
  result: Schema.suspend(() => Types.BotDescription),
  retrySafe: true,
});

/** Use this method to get the current bot name for the given user language. Returns BotName on success. */
export interface GetMyNameParams {
  /** A two-letter ISO 639-1 language code or an empty string */
  readonly languageCode?: string | undefined;
}
export const GetMyNameParams: Schema.Codec<GetMyNameParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { language_code: "languageCode" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  language_code: Schema.optional(Schema.String),
  });
  const decoded = Schema.declare<GetMyNameParams>((input): input is GetMyNameParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const getMyName = callMethod({
  method: "getMyName",
  params: GetMyNameParams,
  rateLimit: "none",
  result: Schema.suspend(() => Types.BotName),
  retrySafe: true,
});

/** Use this method to get the current bot short description for the given user language. Returns BotShortDescription on success. */
export interface GetMyShortDescriptionParams {
  /** A two-letter ISO 639-1 language code or an empty string */
  readonly languageCode?: string | undefined;
}
export const GetMyShortDescriptionParams: Schema.Codec<GetMyShortDescriptionParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { language_code: "languageCode" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  language_code: Schema.optional(Schema.String),
  });
  const decoded = Schema.declare<GetMyShortDescriptionParams>((input): input is GetMyShortDescriptionParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const getMyShortDescription = callMethod({
  method: "getMyShortDescription",
  params: GetMyShortDescriptionParams,
  rateLimit: "none",
  result: Schema.suspend(() => Types.BotShortDescription),
  retrySafe: true,
});

/** A method to get the current Telegram Stars balance of the bot. Requires no parameters. On success, returns a StarAmount object. */
export const getMyStarBalance = callMethod({
  method: "getMyStarBalance",
  rateLimit: "none",
  result: Schema.suspend(() => Types.StarAmount),
  retrySafe: true,
});

/** Returns the bot's Telegram Star transactions in chronological order. On success, returns a StarTransactions object. */
export interface GetStarTransactionsParams {
  /** Number of transactions to skip in the response */
  readonly offset?: number | undefined;
  /** The maximum number of transactions to be retrieved. Values between 1-100 are accepted. Defaults to 100. */
  readonly limit?: number | undefined;
}
export const GetStarTransactionsParams: Schema.Codec<GetStarTransactionsParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => Schema.Struct({
  offset: Schema.optional(Schema.Int),
  limit: Schema.optional(Schema.Int),
}));

export const getStarTransactions = callMethod({
  method: "getStarTransactions",
  params: GetStarTransactionsParams,
  rateLimit: "none",
  result: Schema.suspend(() => Types.StarTransactions),
  retrySafe: true,
});

/** Use this method to get a sticker set. On success, a StickerSet object is returned. */
export interface GetStickerSetParams {
  /** Name of the sticker set */
  readonly name: string;
}
export const GetStickerSetParams: Schema.Codec<GetStickerSetParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => Schema.Struct({
  name: Schema.String,
}));

export const getStickerSet = callMethod({
  method: "getStickerSet",
  params: GetStickerSetParams,
  rateLimit: "none",
  result: Schema.suspend(() => Types.StickerSet),
  retrySafe: true,
});

/** Use this method to receive incoming updates using long polling (wiki). Returns an Array of Update objects. */
export interface GetUpdatesParams {
  /** Identifier of the first update to be returned. Must be greater by one than the highest among the identifiers of previously received updates. By default, updates starting with the earliest unconfirmed update are returned. An update is considered confirmed as soon as getUpdates is called with an offset higher than its update_id. The negative offset can be specified to retrieve updates starting from -offset update from the end of the updates queue. All previous updates will be forgotten. */
  readonly offset?: number | undefined;
  /** Limits the number of updates to be retrieved. Values between 1-100 are accepted. Defaults to 100. */
  readonly limit?: number | undefined;
  /** Timeout in seconds for long polling. Defaults to 0, i.e. usual short polling. Should be positive, short polling should be used for testing purposes only. */
  readonly timeout?: number | undefined;
  /** A JSON-serialized list of the update types you want your bot to receive. For example, specify ["message", "edited_channel_post", "callback_query"] to only receive updates of these types. See Update for a complete list of available update types. Specify an empty list to receive all update types except chat_member, message_reaction, and message_reaction_count (default). If not specified, the previous setting will be used.

Please note that this parameter doesn't affect updates created before the call to getUpdates, so unwanted updates may be received for a short period of time. */
  readonly allowedUpdates?: ReadonlyArray<Types.UpdateType> | undefined;
}
export const GetUpdatesParams: Schema.Codec<GetUpdatesParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { allowed_updates: "allowedUpdates" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  offset: Schema.optional(Schema.Int),
    limit: Schema.optional(Schema.Int),
    timeout: Schema.optional(Schema.Int),
    allowed_updates: Schema.optional(Schema.Array(Types.UpdateType)),
  });
  const decoded = Schema.declare<GetUpdatesParams>((input): input is GetUpdatesParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const getUpdates = callMethod({
  method: "getUpdates",
  params: GetUpdatesParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Array(Types.Update)),
  retrySafe: true,
});

/** Use this method to get the list of boosts added to a chat by a user. Requires administrator rights in the chat. Returns a UserChatBoosts object. */
export interface GetUserChatBoostsParams {
  /** Unique identifier for the chat or username of the channel in the format @username */
  readonly chatId: number | string;
  /** Unique identifier of the target user */
  readonly userId: number;
}
export const GetUserChatBoostsParams: Schema.Codec<GetUserChatBoostsParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { chat_id: "chatId", user_id: "userId" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  chat_id: Schema.Union([Schema.Int, Schema.String]),
    user_id: Schema.Int,
  });
  const decoded = Schema.declare<GetUserChatBoostsParams>((input): input is GetUserChatBoostsParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const getUserChatBoosts = callMethod({
  method: "getUserChatBoosts",
  params: GetUserChatBoostsParams,
  rateLimit: "none",
  result: Schema.suspend(() => Types.UserChatBoosts),
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
export const GetUserGiftsParams: Schema.Codec<GetUserGiftsParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { user_id: "userId", exclude_unlimited: "excludeUnlimited", exclude_limited_upgradable: "excludeLimitedUpgradable", exclude_limited_non_upgradable: "excludeLimitedNonUpgradable", exclude_from_blockchain: "excludeFromBlockchain", exclude_unique: "excludeUnique", sort_by_price: "sortByPrice" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
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
  const decoded = Schema.declare<GetUserGiftsParams>((input): input is GetUserGiftsParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const getUserGifts = callMethod({
  method: "getUserGifts",
  params: GetUserGiftsParams,
  rateLimit: "none",
  result: Schema.suspend(() => Types.OwnedGifts),
  retrySafe: true,
});

/** Use this method to get the last messages from the personal chat (i.e., the chat currently added to their profile) of a given user. On success, an Array of Message objects is returned. */
export interface GetUserPersonalChatMessagesParams {
  /** Unique identifier for the target user */
  readonly userId: number;
  /** The maximum number of messages to return; 1-20 */
  readonly limit: number;
}
export const GetUserPersonalChatMessagesParams: Schema.Codec<GetUserPersonalChatMessagesParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { user_id: "userId" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  user_id: Schema.Int,
    limit: Schema.Int,
  });
  const decoded = Schema.declare<GetUserPersonalChatMessagesParams>((input): input is GetUserPersonalChatMessagesParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const getUserPersonalChatMessages = callMethod({
  method: "getUserPersonalChatMessages",
  params: GetUserPersonalChatMessagesParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Array(Types.Message)),
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
export const GetUserProfileAudiosParams: Schema.Codec<GetUserProfileAudiosParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { user_id: "userId" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  user_id: Schema.Int,
    offset: Schema.optional(Schema.Int),
    limit: Schema.optional(Schema.Int),
  });
  const decoded = Schema.declare<GetUserProfileAudiosParams>((input): input is GetUserProfileAudiosParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const getUserProfileAudios = callMethod({
  method: "getUserProfileAudios",
  params: GetUserProfileAudiosParams,
  rateLimit: "none",
  result: Schema.suspend(() => Types.UserProfileAudios),
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
export const GetUserProfilePhotosParams: Schema.Codec<GetUserProfilePhotosParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { user_id: "userId" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  user_id: Schema.Int,
    offset: Schema.optional(Schema.Int),
    limit: Schema.optional(Schema.Int),
  });
  const decoded = Schema.declare<GetUserProfilePhotosParams>((input): input is GetUserProfilePhotosParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const getUserProfilePhotos = callMethod({
  method: "getUserProfilePhotos",
  params: GetUserProfilePhotosParams,
  rateLimit: "none",
  result: Schema.suspend(() => Types.UserProfilePhotos),
  retrySafe: true,
});

/** Use this method to get current webhook status. Requires no parameters. On success, returns a WebhookInfo object. If the bot is using getUpdates, will return an object with the url field empty. */
export const getWebhookInfo = callMethod({
  method: "getWebhookInfo",
  rateLimit: "none",
  result: Schema.suspend(() => Types.WebhookInfo),
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
export const GiftPremiumSubscriptionParams: Schema.Codec<GiftPremiumSubscriptionParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { user_id: "userId", month_count: "monthCount", star_count: "starCount", text_parse_mode: "textParseMode", text_entities: "textEntities" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  user_id: Schema.Int,
    month_count: Schema.Int,
    star_count: Schema.Int,
    text: Schema.optional(Schema.String),
    text_parse_mode: Schema.optional(Types.ParseMode),
    text_entities: Schema.optional(Schema.Array(Types.MessageEntity)),
  });
  const decoded = Schema.declare<GiftPremiumSubscriptionParams>((input): input is GiftPremiumSubscriptionParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const giftPremiumSubscription = callMethod({
  method: "giftPremiumSubscription",
  params: GiftPremiumSubscriptionParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Literal(true)),
  retrySafe: false,
});

/** Use this method to hide the 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights. The topic will be automatically closed if it was open. Returns True on success. */
export interface HideGeneralForumTopicParams {
  /** Unique identifier for the target chat or username of the target supergroup in the format @username */
  readonly chatId: number | string;
}
export const HideGeneralForumTopicParams: Schema.Codec<HideGeneralForumTopicParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { chat_id: "chatId" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  chat_id: Schema.Union([Schema.Int, Schema.String]),
  });
  const decoded = Schema.declare<HideGeneralForumTopicParams>((input): input is HideGeneralForumTopicParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const hideGeneralForumTopic = callMethod({
  method: "hideGeneralForumTopic",
  params: HideGeneralForumTopicParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Literal(true)),
  retrySafe: true,
});

/** Use this method for your bot to leave a group, supergroup or channel. Returns True on success. */
export interface LeaveChatParams {
  /** Unique identifier for the target chat or username of the target supergroup or channel in the format @username. Channel direct messages chats aren't supported; leave the corresponding channel instead. */
  readonly chatId: number | string;
}
export const LeaveChatParams: Schema.Codec<LeaveChatParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { chat_id: "chatId" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  chat_id: Schema.Union([Schema.Int, Schema.String]),
  });
  const decoded = Schema.declare<LeaveChatParams>((input): input is LeaveChatParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const leaveChat = callMethod({
  method: "leaveChat",
  params: LeaveChatParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Literal(true)),
  retrySafe: true,
});

/** Use this method to log out from the cloud Bot API server before launching the bot locally. You must log out the bot before running it locally, otherwise there is no guarantee that the bot will receive updates. After a successful call, you can immediately log in on a local server, but will not be able to log in back to the cloud Bot API server for 10 minutes. Returns True on success. Requires no parameters. */
export const logOut = callMethod({
  method: "logOut",
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Literal(true)),
  retrySafe: true,
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
export const PinChatMessageParams: Schema.Codec<PinChatMessageParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { business_connection_id: "businessConnectionId", chat_id: "chatId", message_id: "messageId", disable_notification: "disableNotification" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  business_connection_id: Schema.optional(Schema.String),
    chat_id: Schema.Union([Schema.Int, Schema.String]),
    message_id: Schema.Int,
    disable_notification: Schema.optional(Schema.Boolean),
  });
  const decoded = Schema.declare<PinChatMessageParams>((input): input is PinChatMessageParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const pinChatMessage = callMethod({
  method: "pinChatMessage",
  params: PinChatMessageParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Literal(true)),
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
export const PostStoryParams: Schema.Codec<PostStoryParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { business_connection_id: "businessConnectionId", active_period: "activePeriod", parse_mode: "parseMode", caption_entities: "captionEntities", post_to_chat_page: "postToChatPage", protect_content: "protectContent" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  business_connection_id: Schema.String,
    content: Types.InputStoryContent,
    active_period: Schema.Int,
    caption: Schema.optional(Schema.String),
    parse_mode: Schema.optional(Types.ParseMode),
    caption_entities: Schema.optional(Schema.Array(Types.MessageEntity)),
    areas: Schema.optional(Schema.Array(Types.StoryArea)),
    post_to_chat_page: Schema.optional(Schema.Boolean),
    protect_content: Schema.optional(Schema.Boolean),
  });
  const decoded = Schema.declare<PostStoryParams>((input): input is PostStoryParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const postStory = callMethod({
  method: "postStory",
  params: PostStoryParams,
  rateLimit: "none",
  result: Schema.suspend(() => Types.Story),
  retrySafe: false,
});

/** Use this method to promote or demote a user in a supergroup or a channel. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Pass False for all boolean parameters to demote a user. Returns True on success. */
export interface PromoteChatMemberParams {
  /** Unique identifier for the target chat or username of the target channel in the format @username */
  readonly chatId: number | string;
  /** Unique identifier of the target user */
  readonly userId: number;
  /** Pass True if the administrator's presence in the chat is hidden */
  readonly isAnonymous?: boolean | undefined;
  /** Pass True if the administrator can access the chat event log, get boost list, see hidden supergroup and channel members, report spam messages, ignore slow mode, and send messages to the chat without paying Telegram Stars. Implied by any other administrator privilege. */
  readonly canManageChat?: boolean | undefined;
  /** Pass True if the administrator can delete messages of other users */
  readonly canDeleteMessages?: boolean | undefined;
  /** Pass True if the administrator can manage video chats */
  readonly canManageVideoChats?: boolean | undefined;
  /** Pass True if the administrator can restrict, ban or unban chat members, or access supergroup statistics. For backward compatibility, defaults to True for promotions of channel administrators. */
  readonly canRestrictMembers?: boolean | undefined;
  /** Pass True if the administrator can add new administrators with a subset of their own privileges or demote administrators that they have promoted, directly or indirectly (promoted by administrators that were appointed by him) */
  readonly canPromoteMembers?: boolean | undefined;
  /** Pass True if the administrator can change chat title, photo and other settings */
  readonly canChangeInfo?: boolean | undefined;
  /** Pass True if the administrator can invite new users to the chat */
  readonly canInviteUsers?: boolean | undefined;
  /** Pass True if the administrator can post stories to the chat */
  readonly canPostStories?: boolean | undefined;
  /** Pass True if the administrator can edit stories posted by other users, post stories to the chat page, pin chat stories, and access the chat's story archive */
  readonly canEditStories?: boolean | undefined;
  /** Pass True if the administrator can delete stories posted by other users */
  readonly canDeleteStories?: boolean | undefined;
  /** Pass True if the administrator can post messages in the channel, approve suggested posts, or access channel statistics; for channels only */
  readonly canPostMessages?: boolean | undefined;
  /** Pass True if the administrator can edit messages of other users and can pin messages; for channels only */
  readonly canEditMessages?: boolean | undefined;
  /** Pass True if the administrator can pin messages; for supergroups only */
  readonly canPinMessages?: boolean | undefined;
  /** Pass True if the user is allowed to create, rename, close, and reopen forum topics; for supergroups only */
  readonly canManageTopics?: boolean | undefined;
  /** Pass True if the administrator can manage direct messages within the channel and decline suggested posts; for channels only */
  readonly canManageDirectMessages?: boolean | undefined;
  /** Pass True if the administrator can edit the tags of regular members; for groups and supergroups only */
  readonly canManageTags?: boolean | undefined;
  /** Pass True if the administrator can manage chat welcome messages or directly send them in the case of bots */
  readonly canSendWelcomeMessages?: boolean | undefined;
}
export const PromoteChatMemberParams: Schema.Codec<PromoteChatMemberParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { chat_id: "chatId", user_id: "userId", is_anonymous: "isAnonymous", can_manage_chat: "canManageChat", can_delete_messages: "canDeleteMessages", can_manage_video_chats: "canManageVideoChats", can_restrict_members: "canRestrictMembers", can_promote_members: "canPromoteMembers", can_change_info: "canChangeInfo", can_invite_users: "canInviteUsers", can_post_stories: "canPostStories", can_edit_stories: "canEditStories", can_delete_stories: "canDeleteStories", can_post_messages: "canPostMessages", can_edit_messages: "canEditMessages", can_pin_messages: "canPinMessages", can_manage_topics: "canManageTopics", can_manage_direct_messages: "canManageDirectMessages", can_manage_tags: "canManageTags", can_send_welcome_messages: "canSendWelcomeMessages" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  chat_id: Schema.Union([Schema.Int, Schema.String]),
    user_id: Schema.Int,
    is_anonymous: Schema.optional(Schema.Boolean),
    can_manage_chat: Schema.optional(Schema.Boolean),
    can_delete_messages: Schema.optional(Schema.Boolean),
    can_manage_video_chats: Schema.optional(Schema.Boolean),
    can_restrict_members: Schema.optional(Schema.Boolean),
    can_promote_members: Schema.optional(Schema.Boolean),
    can_change_info: Schema.optional(Schema.Boolean),
    can_invite_users: Schema.optional(Schema.Boolean),
    can_post_stories: Schema.optional(Schema.Boolean),
    can_edit_stories: Schema.optional(Schema.Boolean),
    can_delete_stories: Schema.optional(Schema.Boolean),
    can_post_messages: Schema.optional(Schema.Boolean),
    can_edit_messages: Schema.optional(Schema.Boolean),
    can_pin_messages: Schema.optional(Schema.Boolean),
    can_manage_topics: Schema.optional(Schema.Boolean),
    can_manage_direct_messages: Schema.optional(Schema.Boolean),
    can_manage_tags: Schema.optional(Schema.Boolean),
    can_send_welcome_messages: Schema.optional(Schema.Boolean),
  });
  const decoded = Schema.declare<PromoteChatMemberParams>((input): input is PromoteChatMemberParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const promoteChatMember = callMethod({
  method: "promoteChatMember",
  params: PromoteChatMemberParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Literal(true)),
  retrySafe: true,
});

/** Marks incoming message as read on behalf of a business account. Requires the can_read_messages business bot right. Returns True on success. */
export interface ReadBusinessMessageParams {
  /** Unique identifier of the business connection on behalf of which to read the message */
  readonly businessConnectionId: string;
  /** Unique identifier of the chat in which the message was received. The chat must have been active in the last 24 hours. */
  readonly chatId: number;
  /** Unique identifier of the message to mark as read */
  readonly messageId: number;
}
export const ReadBusinessMessageParams: Schema.Codec<ReadBusinessMessageParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { business_connection_id: "businessConnectionId", chat_id: "chatId", message_id: "messageId" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  business_connection_id: Schema.String,
    chat_id: Schema.Int,
    message_id: Schema.Int,
  });
  const decoded = Schema.declare<ReadBusinessMessageParams>((input): input is ReadBusinessMessageParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const readBusinessMessage = callMethod({
  method: "readBusinessMessage",
  params: ReadBusinessMessageParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Literal(true)),
  retrySafe: true,
});

/** Refunds a successful payment in Telegram Stars. Returns True on success. */
export interface RefundStarPaymentParams {
  /** Identifier of the user whose payment will be refunded */
  readonly userId: number;
  /** Telegram payment identifier */
  readonly telegramPaymentChargeId: string;
}
export const RefundStarPaymentParams: Schema.Codec<RefundStarPaymentParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { user_id: "userId", telegram_payment_charge_id: "telegramPaymentChargeId" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  user_id: Schema.Int,
    telegram_payment_charge_id: Schema.String,
  });
  const decoded = Schema.declare<RefundStarPaymentParams>((input): input is RefundStarPaymentParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const refundStarPayment = callMethod({
  method: "refundStarPayment",
  params: RefundStarPaymentParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Literal(true)),
  retrySafe: true,
});

/** Removes the current profile photo of a managed business account. Requires the can_edit_profile_photo business bot right. Returns True on success. */
export interface RemoveBusinessAccountProfilePhotoParams {
  /** Unique identifier of the business connection */
  readonly businessConnectionId: string;
  /** Pass True to remove the public photo, which is visible even if the main photo is hidden by the business account's privacy settings. After the main photo is removed, the previous profile photo (if present) becomes the main photo. */
  readonly isPublic?: boolean | undefined;
}
export const RemoveBusinessAccountProfilePhotoParams: Schema.Codec<RemoveBusinessAccountProfilePhotoParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { business_connection_id: "businessConnectionId", is_public: "isPublic" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  business_connection_id: Schema.String,
    is_public: Schema.optional(Schema.Boolean),
  });
  const decoded = Schema.declare<RemoveBusinessAccountProfilePhotoParams>((input): input is RemoveBusinessAccountProfilePhotoParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const removeBusinessAccountProfilePhoto = callMethod({
  method: "removeBusinessAccountProfilePhoto",
  params: RemoveBusinessAccountProfilePhotoParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Literal(true)),
  retrySafe: true,
});

/** Removes verification from a chat that is currently verified on behalf of the organization represented by the bot. Returns True on success. */
export interface RemoveChatVerificationParams {
  /** Unique identifier for the target chat or username of the target bot or channel in the format @username */
  readonly chatId: number | string;
}
export const RemoveChatVerificationParams: Schema.Codec<RemoveChatVerificationParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { chat_id: "chatId" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  chat_id: Schema.Union([Schema.Int, Schema.String]),
  });
  const decoded = Schema.declare<RemoveChatVerificationParams>((input): input is RemoveChatVerificationParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const removeChatVerification = callMethod({
  method: "removeChatVerification",
  params: RemoveChatVerificationParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Literal(true)),
  retrySafe: true,
});

/** Removes the profile photo of the bot. Requires no parameters. Returns True on success. */
export const removeMyProfilePhoto = callMethod({
  method: "removeMyProfilePhoto",
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Literal(true)),
  retrySafe: true,
});

/** Removes verification from a user who is currently verified on behalf of the organization represented by the bot. Returns True on success. */
export interface RemoveUserVerificationParams {
  /** Unique identifier of the target user */
  readonly userId: number;
}
export const RemoveUserVerificationParams: Schema.Codec<RemoveUserVerificationParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { user_id: "userId" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  user_id: Schema.Int,
  });
  const decoded = Schema.declare<RemoveUserVerificationParams>((input): input is RemoveUserVerificationParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const removeUserVerification = callMethod({
  method: "removeUserVerification",
  params: RemoveUserVerificationParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Literal(true)),
  retrySafe: true,
});

/** Use this method to reopen a closed topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights, unless it is the creator of the topic. Returns True on success. */
export interface ReopenForumTopicParams {
  /** Unique identifier for the target chat or username of the target supergroup in the format @username */
  readonly chatId: number | string;
  /** Unique identifier for the target message thread of the forum topic */
  readonly messageThreadId: number;
}
export const ReopenForumTopicParams: Schema.Codec<ReopenForumTopicParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { chat_id: "chatId", message_thread_id: "messageThreadId" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  chat_id: Schema.Union([Schema.Int, Schema.String]),
    message_thread_id: Schema.Int,
  });
  const decoded = Schema.declare<ReopenForumTopicParams>((input): input is ReopenForumTopicParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const reopenForumTopic = callMethod({
  method: "reopenForumTopic",
  params: ReopenForumTopicParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Literal(true)),
  retrySafe: true,
});

/** Use this method to reopen a closed 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights. The topic will be automatically unhidden if it was hidden. Returns True on success. */
export interface ReopenGeneralForumTopicParams {
  /** Unique identifier for the target chat or username of the target supergroup in the format @username */
  readonly chatId: number | string;
}
export const ReopenGeneralForumTopicParams: Schema.Codec<ReopenGeneralForumTopicParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { chat_id: "chatId" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  chat_id: Schema.Union([Schema.Int, Schema.String]),
  });
  const decoded = Schema.declare<ReopenGeneralForumTopicParams>((input): input is ReopenGeneralForumTopicParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const reopenGeneralForumTopic = callMethod({
  method: "reopenGeneralForumTopic",
  params: ReopenGeneralForumTopicParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Literal(true)),
  retrySafe: true,
});

/** Use this method to revoke the current token of a managed bot and generate a new one. Returns the new token as String on success. */
export interface ReplaceManagedBotTokenParams {
  /** User identifier of the managed bot whose token will be replaced */
  readonly userId: number;
}
export const ReplaceManagedBotTokenParams: Schema.Codec<ReplaceManagedBotTokenParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { user_id: "userId" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  user_id: Schema.Int,
  });
  const decoded = Schema.declare<ReplaceManagedBotTokenParams>((input): input is ReplaceManagedBotTokenParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const replaceManagedBotToken = callMethod({
  method: "replaceManagedBotToken",
  params: ReplaceManagedBotTokenParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.RedactedFromValue(Schema.String, { label: "Telegram bot token" })),
  retrySafe: false,
});

/** Use this method to replace an existing sticker in a sticker set with a new one. The method is equivalent to calling deleteStickerFromSet, then addStickerToSet, then setStickerPositionInSet. Returns True on success. */
export interface ReplaceStickerInSetParams {
  /** User identifier of the sticker set owner */
  readonly userId: number;
  /** Sticker set name */
  readonly name: string;
  /** File identifier of the replaced sticker */
  readonly oldSticker: string;
  /** A JSON-serialized object with information about the added sticker. If exactly the same sticker had already been added to the set, then the set remains unchanged. */
  readonly sticker: Types.InputSticker;
}
export const ReplaceStickerInSetParams: Schema.Codec<ReplaceStickerInSetParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { user_id: "userId", old_sticker: "oldSticker" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  user_id: Schema.Int,
    name: Schema.String,
    old_sticker: Schema.String,
    sticker: Types.InputSticker,
  });
  const decoded = Schema.declare<ReplaceStickerInSetParams>((input): input is ReplaceStickerInSetParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const replaceStickerInSet = callMethod({
  method: "replaceStickerInSet",
  params: ReplaceStickerInSetParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Literal(true)),
  retrySafe: true,
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
export const RepostStoryParams: Schema.Codec<RepostStoryParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { business_connection_id: "businessConnectionId", from_chat_id: "fromChatId", from_story_id: "fromStoryId", active_period: "activePeriod", post_to_chat_page: "postToChatPage", protect_content: "protectContent" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  business_connection_id: Schema.String,
    from_chat_id: Schema.Int,
    from_story_id: Schema.Int,
    active_period: Schema.Int,
    post_to_chat_page: Schema.optional(Schema.Boolean),
    protect_content: Schema.optional(Schema.Boolean),
  });
  const decoded = Schema.declare<RepostStoryParams>((input): input is RepostStoryParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const repostStory = callMethod({
  method: "repostStory",
  params: RepostStoryParams,
  rateLimit: "none",
  result: Schema.suspend(() => Types.Story),
  retrySafe: false,
});

/** Use this method to restrict a user in a supergroup. The bot must be an administrator in the supergroup for this to work and must have the appropriate administrator rights. Pass True for all permissions to lift restrictions from a user. Returns True on success. */
export interface RestrictChatMemberParams {
  /** Unique identifier for the target chat or username of the target supergroup in the format @username */
  readonly chatId: number | string;
  /** Unique identifier of the target user */
  readonly userId: number;
  /** A JSON-serialized object for new user permissions */
  readonly permissions: Types.ChatPermissions;
  /** Pass True if chat permissions are set independently. Otherwise, the can_send_other_messages and can_add_web_page_previews permissions will imply the can_send_messages, can_send_audios, can_send_documents, can_send_photos, can_send_videos, can_send_video_notes, and can_send_voice_notes permissions; the can_send_polls permission will imply the can_send_messages permission. */
  readonly useIndependentChatPermissions?: boolean | undefined;
  /** Date when restrictions will be lifted for the user; Unix time. If user is restricted for more than 366 days or less than 30 seconds from the current time, they are considered to be restricted forever. */
  readonly untilDate?: number | undefined;
}
export const RestrictChatMemberParams: Schema.Codec<RestrictChatMemberParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { chat_id: "chatId", user_id: "userId", use_independent_chat_permissions: "useIndependentChatPermissions", until_date: "untilDate" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  chat_id: Schema.Union([Schema.Int, Schema.String]),
    user_id: Schema.Int,
    permissions: Types.ChatPermissions,
    use_independent_chat_permissions: Schema.optional(Schema.Boolean),
    until_date: Schema.optional(Schema.Int),
  });
  const decoded = Schema.declare<RestrictChatMemberParams>((input): input is RestrictChatMemberParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const restrictChatMember = callMethod({
  method: "restrictChatMember",
  params: RestrictChatMemberParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Literal(true)),
  retrySafe: true,
});

/** Use this method to revoke an invite link created by the bot. If the primary link is revoked, a new link is automatically generated. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns the revoked invite link as ChatInviteLink object. */
export interface RevokeChatInviteLinkParams {
  /** Unique identifier of the target chat or username of the target channel in the format @username */
  readonly chatId: number | string;
  /** The invite link to revoke */
  readonly inviteLink: string;
}
export const RevokeChatInviteLinkParams: Schema.Codec<RevokeChatInviteLinkParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { chat_id: "chatId", invite_link: "inviteLink" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  chat_id: Schema.Union([Schema.Int, Schema.String]),
    invite_link: Schema.String,
  });
  const decoded = Schema.declare<RevokeChatInviteLinkParams>((input): input is RevokeChatInviteLinkParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const revokeChatInviteLink = callMethod({
  method: "revokeChatInviteLink",
  params: RevokeChatInviteLinkParams,
  rateLimit: "none",
  result: Schema.suspend(() => Types.ChatInviteLink),
  retrySafe: true,
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
export const SavePreparedInlineMessageParams: Schema.Codec<SavePreparedInlineMessageParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { user_id: "userId", allow_user_chats: "allowUserChats", allow_bot_chats: "allowBotChats", allow_group_chats: "allowGroupChats", allow_channel_chats: "allowChannelChats" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  user_id: Schema.Int,
    result: Types.InlineQueryResult,
    allow_user_chats: Schema.optional(Schema.Boolean),
    allow_bot_chats: Schema.optional(Schema.Boolean),
    allow_group_chats: Schema.optional(Schema.Boolean),
    allow_channel_chats: Schema.optional(Schema.Boolean),
  });
  const decoded = Schema.declare<SavePreparedInlineMessageParams>((input): input is SavePreparedInlineMessageParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const savePreparedInlineMessage = callMethod({
  method: "savePreparedInlineMessage",
  params: SavePreparedInlineMessageParams,
  rateLimit: "none",
  result: Schema.suspend(() => Types.PreparedInlineMessage),
  retrySafe: false,
});

/** Stores a keyboard button that can be used by a user within a Mini App. Returns a PreparedKeyboardButton object. */
export interface SavePreparedKeyboardButtonParams {
  /** Unique identifier of the target user that can use the button */
  readonly userId: number;
  /** A JSON-serialized object describing the button to be saved. The button must be of the type request_users, request_chat, or request_managed_bot. */
  readonly button: Types.KeyboardButton;
}
export const SavePreparedKeyboardButtonParams: Schema.Codec<SavePreparedKeyboardButtonParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { user_id: "userId" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  user_id: Schema.Int,
    button: Types.KeyboardButton,
  });
  const decoded = Schema.declare<SavePreparedKeyboardButtonParams>((input): input is SavePreparedKeyboardButtonParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const savePreparedKeyboardButton = callMethod({
  method: "savePreparedKeyboardButton",
  params: SavePreparedKeyboardButtonParams,
  rateLimit: "none",
  result: Schema.suspend(() => Types.PreparedKeyboardButton),
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
export const SendAnimationParams: Schema.Codec<SendAnimationParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { business_connection_id: "businessConnectionId", chat_id: "chatId", message_thread_id: "messageThreadId", direct_messages_topic_id: "directMessagesTopicId", ephemeral_message_parameters: "ephemeralMessageParameters", parse_mode: "parseMode", caption_entities: "captionEntities", show_caption_above_media: "showCaptionAboveMedia", has_spoiler: "hasSpoiler", disable_notification: "disableNotification", protect_content: "protectContent", allow_paid_broadcast: "allowPaidBroadcast", message_effect_id: "messageEffectId", suggested_post_parameters: "suggestedPostParameters", reply_parameters: "replyParameters", reply_markup: "replyMarkup" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  business_connection_id: Schema.optional(Schema.String),
    chat_id: Schema.Union([Schema.Int, Schema.String]),
    message_thread_id: Schema.optional(Schema.Int),
    direct_messages_topic_id: Schema.optional(Schema.Int),
    ephemeral_message_parameters: Schema.optional(Types.EphemeralMessageParameters),
    animation: Schema.Union([Types.InputFile, Schema.String]),
    duration: Schema.optional(Schema.Int),
    width: Schema.optional(Schema.Int),
    height: Schema.optional(Schema.Int),
    thumbnail: Schema.optional(Schema.Union([Types.InputFile, Schema.String])),
    caption: Schema.optional(Schema.String),
    parse_mode: Schema.optional(Types.ParseMode),
    caption_entities: Schema.optional(Schema.Array(Types.MessageEntity)),
    show_caption_above_media: Schema.optional(Schema.Boolean),
    has_spoiler: Schema.optional(Schema.Boolean),
    disable_notification: Schema.optional(Schema.Boolean),
    protect_content: Schema.optional(Schema.Boolean),
    allow_paid_broadcast: Schema.optional(Schema.Boolean),
    message_effect_id: Schema.optional(Schema.String),
    suggested_post_parameters: Schema.optional(Types.SuggestedPostParameters),
    reply_parameters: Schema.optional(Types.ReplyParameters),
    reply_markup: Schema.optional(Schema.Union([Types.InlineKeyboardMarkup, Types.ReplyKeyboardMarkup, Types.ReplyKeyboardRemove, Types.ForceReply])),
  });
  const decoded = Schema.declare<SendAnimationParams>((input): input is SendAnimationParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const sendAnimation = callMethod({
  method: "sendAnimation",
  params: SendAnimationParams,
  rateLimit: "message",
  result: Schema.suspend(() => Types.Message),
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
export const SendAudioParams: Schema.Codec<SendAudioParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { business_connection_id: "businessConnectionId", chat_id: "chatId", message_thread_id: "messageThreadId", direct_messages_topic_id: "directMessagesTopicId", ephemeral_message_parameters: "ephemeralMessageParameters", parse_mode: "parseMode", caption_entities: "captionEntities", disable_notification: "disableNotification", protect_content: "protectContent", allow_paid_broadcast: "allowPaidBroadcast", message_effect_id: "messageEffectId", suggested_post_parameters: "suggestedPostParameters", reply_parameters: "replyParameters", reply_markup: "replyMarkup" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  business_connection_id: Schema.optional(Schema.String),
    chat_id: Schema.Union([Schema.Int, Schema.String]),
    message_thread_id: Schema.optional(Schema.Int),
    direct_messages_topic_id: Schema.optional(Schema.Int),
    ephemeral_message_parameters: Schema.optional(Types.EphemeralMessageParameters),
    audio: Schema.Union([Types.InputFile, Schema.String]),
    caption: Schema.optional(Schema.String),
    parse_mode: Schema.optional(Types.ParseMode),
    caption_entities: Schema.optional(Schema.Array(Types.MessageEntity)),
    duration: Schema.optional(Schema.Int),
    performer: Schema.optional(Schema.String),
    title: Schema.optional(Schema.String),
    thumbnail: Schema.optional(Schema.Union([Types.InputFile, Schema.String])),
    disable_notification: Schema.optional(Schema.Boolean),
    protect_content: Schema.optional(Schema.Boolean),
    allow_paid_broadcast: Schema.optional(Schema.Boolean),
    message_effect_id: Schema.optional(Schema.String),
    suggested_post_parameters: Schema.optional(Types.SuggestedPostParameters),
    reply_parameters: Schema.optional(Types.ReplyParameters),
    reply_markup: Schema.optional(Schema.Union([Types.InlineKeyboardMarkup, Types.ReplyKeyboardMarkup, Types.ReplyKeyboardRemove, Types.ForceReply])),
  });
  const decoded = Schema.declare<SendAudioParams>((input): input is SendAudioParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const sendAudio = callMethod({
  method: "sendAudio",
  params: SendAudioParams,
  rateLimit: "message",
  result: Schema.suspend(() => Types.Message),
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
export const SendChatActionParams: Schema.Codec<SendChatActionParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { business_connection_id: "businessConnectionId", chat_id: "chatId", message_thread_id: "messageThreadId" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  business_connection_id: Schema.optional(Schema.String),
    chat_id: Schema.Union([Schema.Int, Schema.String]),
    message_thread_id: Schema.optional(Schema.Int),
    action: Types.ChatAction,
  });
  const decoded = Schema.declare<SendChatActionParams>((input): input is SendChatActionParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const sendChatAction = callMethod({
  method: "sendChatAction",
  params: SendChatActionParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Literal(true)),
  retrySafe: true,
});

/** Use this method to process a received chat join request query by showing a Mini App to the user before deciding the outcome. Call answerChatJoinRequestQuery to resolve the join request query based on the user interaction with the Mini App. Returns True on success. */
export interface SendChatJoinRequestWebAppParams {
  /** Unique identifier of the join request query */
  readonly chatJoinRequestQueryId: string;
  /** An HTTPS URL of a Web App to be opened with additional data as specified in Initializing Web Apps */
  readonly webAppUrl: string;
}
export const SendChatJoinRequestWebAppParams: Schema.Codec<SendChatJoinRequestWebAppParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { chat_join_request_query_id: "chatJoinRequestQueryId", web_app_url: "webAppUrl" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  chat_join_request_query_id: Schema.String,
    web_app_url: Schema.String,
  });
  const decoded = Schema.declare<SendChatJoinRequestWebAppParams>((input): input is SendChatJoinRequestWebAppParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const sendChatJoinRequestWebApp = callMethod({
  method: "sendChatJoinRequestWebApp",
  params: SendChatJoinRequestWebAppParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Literal(true)),
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
export const SendChecklistParams: Schema.Codec<SendChecklistParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { business_connection_id: "businessConnectionId", chat_id: "chatId", disable_notification: "disableNotification", protect_content: "protectContent", message_effect_id: "messageEffectId", reply_parameters: "replyParameters", reply_markup: "replyMarkup" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  business_connection_id: Schema.String,
    chat_id: Schema.Union([Schema.Int, Schema.String]),
    checklist: Types.InputChecklist,
    disable_notification: Schema.optional(Schema.Boolean),
    protect_content: Schema.optional(Schema.Boolean),
    message_effect_id: Schema.optional(Schema.String),
    reply_parameters: Schema.optional(Types.ReplyParameters),
    reply_markup: Schema.optional(Types.InlineKeyboardMarkup),
  });
  const decoded = Schema.declare<SendChecklistParams>((input): input is SendChecklistParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const sendChecklist = callMethod({
  method: "sendChecklist",
  params: SendChecklistParams,
  rateLimit: "message",
  result: Schema.suspend(() => Types.Message),
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
export const SendContactParams: Schema.Codec<SendContactParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { business_connection_id: "businessConnectionId", chat_id: "chatId", message_thread_id: "messageThreadId", direct_messages_topic_id: "directMessagesTopicId", ephemeral_message_parameters: "ephemeralMessageParameters", phone_number: "phoneNumber", first_name: "firstName", last_name: "lastName", disable_notification: "disableNotification", protect_content: "protectContent", allow_paid_broadcast: "allowPaidBroadcast", message_effect_id: "messageEffectId", suggested_post_parameters: "suggestedPostParameters", reply_parameters: "replyParameters", reply_markup: "replyMarkup" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  business_connection_id: Schema.optional(Schema.String),
    chat_id: Schema.Union([Schema.Int, Schema.String]),
    message_thread_id: Schema.optional(Schema.Int),
    direct_messages_topic_id: Schema.optional(Schema.Int),
    ephemeral_message_parameters: Schema.optional(Types.EphemeralMessageParameters),
    phone_number: Schema.String,
    first_name: Schema.String,
    last_name: Schema.optional(Schema.String),
    vcard: Schema.optional(Schema.String),
    disable_notification: Schema.optional(Schema.Boolean),
    protect_content: Schema.optional(Schema.Boolean),
    allow_paid_broadcast: Schema.optional(Schema.Boolean),
    message_effect_id: Schema.optional(Schema.String),
    suggested_post_parameters: Schema.optional(Types.SuggestedPostParameters),
    reply_parameters: Schema.optional(Types.ReplyParameters),
    reply_markup: Schema.optional(Schema.Union([Types.InlineKeyboardMarkup, Types.ReplyKeyboardMarkup, Types.ReplyKeyboardRemove, Types.ForceReply])),
  });
  const decoded = Schema.declare<SendContactParams>((input): input is SendContactParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const sendContact = callMethod({
  method: "sendContact",
  params: SendContactParams,
  rateLimit: "message",
  result: Schema.suspend(() => Types.Message),
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
export const SendDiceParams: Schema.Codec<SendDiceParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { business_connection_id: "businessConnectionId", chat_id: "chatId", message_thread_id: "messageThreadId", direct_messages_topic_id: "directMessagesTopicId", disable_notification: "disableNotification", protect_content: "protectContent", allow_paid_broadcast: "allowPaidBroadcast", message_effect_id: "messageEffectId", suggested_post_parameters: "suggestedPostParameters", reply_parameters: "replyParameters", reply_markup: "replyMarkup" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  business_connection_id: Schema.optional(Schema.String),
    chat_id: Schema.Union([Schema.Int, Schema.String]),
    message_thread_id: Schema.optional(Schema.Int),
    direct_messages_topic_id: Schema.optional(Schema.Int),
    emoji: Schema.optional(Types.DiceEmoji),
    disable_notification: Schema.optional(Schema.Boolean),
    protect_content: Schema.optional(Schema.Boolean),
    allow_paid_broadcast: Schema.optional(Schema.Boolean),
    message_effect_id: Schema.optional(Schema.String),
    suggested_post_parameters: Schema.optional(Types.SuggestedPostParameters),
    reply_parameters: Schema.optional(Types.ReplyParameters),
    reply_markup: Schema.optional(Schema.Union([Types.InlineKeyboardMarkup, Types.ReplyKeyboardMarkup, Types.ReplyKeyboardRemove, Types.ForceReply])),
  });
  const decoded = Schema.declare<SendDiceParams>((input): input is SendDiceParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const sendDice = callMethod({
  method: "sendDice",
  params: SendDiceParams,
  rateLimit: "message",
  result: Schema.suspend(() => Types.Message),
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
export const SendDocumentParams: Schema.Codec<SendDocumentParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { business_connection_id: "businessConnectionId", chat_id: "chatId", message_thread_id: "messageThreadId", direct_messages_topic_id: "directMessagesTopicId", ephemeral_message_parameters: "ephemeralMessageParameters", parse_mode: "parseMode", caption_entities: "captionEntities", disable_content_type_detection: "disableContentTypeDetection", disable_notification: "disableNotification", protect_content: "protectContent", allow_paid_broadcast: "allowPaidBroadcast", message_effect_id: "messageEffectId", suggested_post_parameters: "suggestedPostParameters", reply_parameters: "replyParameters", reply_markup: "replyMarkup" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  business_connection_id: Schema.optional(Schema.String),
    chat_id: Schema.Union([Schema.Int, Schema.String]),
    message_thread_id: Schema.optional(Schema.Int),
    direct_messages_topic_id: Schema.optional(Schema.Int),
    ephemeral_message_parameters: Schema.optional(Types.EphemeralMessageParameters),
    document: Schema.Union([Types.InputFile, Schema.String]),
    thumbnail: Schema.optional(Schema.Union([Types.InputFile, Schema.String])),
    caption: Schema.optional(Schema.String),
    parse_mode: Schema.optional(Types.ParseMode),
    caption_entities: Schema.optional(Schema.Array(Types.MessageEntity)),
    disable_content_type_detection: Schema.optional(Schema.Boolean),
    disable_notification: Schema.optional(Schema.Boolean),
    protect_content: Schema.optional(Schema.Boolean),
    allow_paid_broadcast: Schema.optional(Schema.Boolean),
    message_effect_id: Schema.optional(Schema.String),
    suggested_post_parameters: Schema.optional(Types.SuggestedPostParameters),
    reply_parameters: Schema.optional(Types.ReplyParameters),
    reply_markup: Schema.optional(Schema.Union([Types.InlineKeyboardMarkup, Types.ReplyKeyboardMarkup, Types.ReplyKeyboardRemove, Types.ForceReply])),
  });
  const decoded = Schema.declare<SendDocumentParams>((input): input is SendDocumentParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const sendDocument = callMethod({
  method: "sendDocument",
  params: SendDocumentParams,
  rateLimit: "message",
  result: Schema.suspend(() => Types.Message),
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
export const SendGameParams: Schema.Codec<SendGameParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { business_connection_id: "businessConnectionId", chat_id: "chatId", message_thread_id: "messageThreadId", game_short_name: "gameShortName", disable_notification: "disableNotification", protect_content: "protectContent", allow_paid_broadcast: "allowPaidBroadcast", message_effect_id: "messageEffectId", reply_parameters: "replyParameters", reply_markup: "replyMarkup" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  business_connection_id: Schema.optional(Schema.String),
    chat_id: Schema.Union([Schema.Int, Schema.String]),
    message_thread_id: Schema.optional(Schema.Int),
    game_short_name: Schema.String,
    disable_notification: Schema.optional(Schema.Boolean),
    protect_content: Schema.optional(Schema.Boolean),
    allow_paid_broadcast: Schema.optional(Schema.Boolean),
    message_effect_id: Schema.optional(Schema.String),
    reply_parameters: Schema.optional(Types.ReplyParameters),
    reply_markup: Schema.optional(Types.InlineKeyboardMarkup),
  });
  const decoded = Schema.declare<SendGameParams>((input): input is SendGameParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const sendGame = callMethod({
  method: "sendGame",
  params: SendGameParams,
  rateLimit: "message",
  result: Schema.suspend(() => Types.Message),
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
export const SendGiftParams: Schema.Codec<SendGiftParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { user_id: "userId", chat_id: "chatId", gift_id: "giftId", pay_for_upgrade: "payForUpgrade", text_parse_mode: "textParseMode", text_entities: "textEntities" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  user_id: Schema.optional(Schema.Int),
    chat_id: Schema.optional(Schema.Union([Schema.Int, Schema.String])),
    gift_id: Schema.String,
    pay_for_upgrade: Schema.optional(Schema.Boolean),
    text: Schema.optional(Schema.String),
    text_parse_mode: Schema.optional(Types.ParseMode),
    text_entities: Schema.optional(Schema.Array(Types.MessageEntity)),
  });
  const decoded = Schema.declare<SendGiftParams>((input): input is SendGiftParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const sendGift = callMethod({
  method: "sendGift",
  params: SendGiftParams,
  rateLimit: "message",
  result: Schema.suspend(() => Schema.Literal(true)),
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
export const SendInvoiceParams: Schema.Codec<SendInvoiceParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { chat_id: "chatId", message_thread_id: "messageThreadId", direct_messages_topic_id: "directMessagesTopicId", provider_token: "providerToken", max_tip_amount: "maxTipAmount", suggested_tip_amounts: "suggestedTipAmounts", start_parameter: "startParameter", provider_data: "providerData", photo_url: "photoUrl", photo_size: "photoSize", photo_width: "photoWidth", photo_height: "photoHeight", need_name: "needName", need_phone_number: "needPhoneNumber", need_email: "needEmail", need_shipping_address: "needShippingAddress", send_phone_number_to_provider: "sendPhoneNumberToProvider", send_email_to_provider: "sendEmailToProvider", is_flexible: "isFlexible", disable_notification: "disableNotification", protect_content: "protectContent", allow_paid_broadcast: "allowPaidBroadcast", message_effect_id: "messageEffectId", suggested_post_parameters: "suggestedPostParameters", reply_parameters: "replyParameters", reply_markup: "replyMarkup" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  chat_id: Schema.Union([Schema.Int, Schema.String]),
    message_thread_id: Schema.optional(Schema.Int),
    direct_messages_topic_id: Schema.optional(Schema.Int),
    title: Schema.String,
    description: Schema.String,
    payload: Schema.String,
    provider_token: Schema.optional(Schema.String),
    currency: Schema.String,
    prices: Schema.Array(Types.LabeledPrice),
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
    suggested_post_parameters: Schema.optional(Types.SuggestedPostParameters),
    reply_parameters: Schema.optional(Types.ReplyParameters),
    reply_markup: Schema.optional(Types.InlineKeyboardMarkup),
  });
  const decoded = Schema.declare<SendInvoiceParams>((input): input is SendInvoiceParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const sendInvoice = callMethod({
  method: "sendInvoice",
  params: SendInvoiceParams,
  rateLimit: "message",
  result: Schema.suspend(() => Types.Message),
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
export const SendLivePhotoParams: Schema.Codec<SendLivePhotoParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { business_connection_id: "businessConnectionId", chat_id: "chatId", message_thread_id: "messageThreadId", direct_messages_topic_id: "directMessagesTopicId", ephemeral_message_parameters: "ephemeralMessageParameters", live_photo: "livePhoto", parse_mode: "parseMode", caption_entities: "captionEntities", show_caption_above_media: "showCaptionAboveMedia", has_spoiler: "hasSpoiler", disable_notification: "disableNotification", protect_content: "protectContent", allow_paid_broadcast: "allowPaidBroadcast", message_effect_id: "messageEffectId", suggested_post_parameters: "suggestedPostParameters", reply_parameters: "replyParameters", reply_markup: "replyMarkup" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  business_connection_id: Schema.optional(Schema.String),
    chat_id: Schema.Union([Schema.Int, Schema.String]),
    message_thread_id: Schema.optional(Schema.Int),
    direct_messages_topic_id: Schema.optional(Schema.Int),
    ephemeral_message_parameters: Schema.optional(Types.EphemeralMessageParameters),
    live_photo: Schema.Union([Types.InputFile, Schema.String]),
    photo: Schema.Union([Types.InputFile, Schema.String]),
    caption: Schema.optional(Schema.String),
    parse_mode: Schema.optional(Types.ParseMode),
    caption_entities: Schema.optional(Schema.Array(Types.MessageEntity)),
    show_caption_above_media: Schema.optional(Schema.Boolean),
    has_spoiler: Schema.optional(Schema.Boolean),
    disable_notification: Schema.optional(Schema.Boolean),
    protect_content: Schema.optional(Schema.Boolean),
    allow_paid_broadcast: Schema.optional(Schema.Boolean),
    message_effect_id: Schema.optional(Schema.String),
    suggested_post_parameters: Schema.optional(Types.SuggestedPostParameters),
    reply_parameters: Schema.optional(Types.ReplyParameters),
    reply_markup: Schema.optional(Schema.Union([Types.InlineKeyboardMarkup, Types.ReplyKeyboardMarkup, Types.ReplyKeyboardRemove, Types.ForceReply])),
  });
  const decoded = Schema.declare<SendLivePhotoParams>((input): input is SendLivePhotoParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const sendLivePhoto = callMethod({
  method: "sendLivePhoto",
  params: SendLivePhotoParams,
  rateLimit: "message",
  result: Schema.suspend(() => Types.Message),
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
export const SendLocationParams: Schema.Codec<SendLocationParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { business_connection_id: "businessConnectionId", chat_id: "chatId", message_thread_id: "messageThreadId", direct_messages_topic_id: "directMessagesTopicId", ephemeral_message_parameters: "ephemeralMessageParameters", horizontal_accuracy: "horizontalAccuracy", live_period: "livePeriod", proximity_alert_radius: "proximityAlertRadius", disable_notification: "disableNotification", protect_content: "protectContent", allow_paid_broadcast: "allowPaidBroadcast", message_effect_id: "messageEffectId", suggested_post_parameters: "suggestedPostParameters", reply_parameters: "replyParameters", reply_markup: "replyMarkup" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  business_connection_id: Schema.optional(Schema.String),
    chat_id: Schema.Union([Schema.Int, Schema.String]),
    message_thread_id: Schema.optional(Schema.Int),
    direct_messages_topic_id: Schema.optional(Schema.Int),
    ephemeral_message_parameters: Schema.optional(Types.EphemeralMessageParameters),
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
    suggested_post_parameters: Schema.optional(Types.SuggestedPostParameters),
    reply_parameters: Schema.optional(Types.ReplyParameters),
    reply_markup: Schema.optional(Schema.Union([Types.InlineKeyboardMarkup, Types.ReplyKeyboardMarkup, Types.ReplyKeyboardRemove, Types.ForceReply])),
  });
  const decoded = Schema.declare<SendLocationParams>((input): input is SendLocationParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const sendLocation = callMethod({
  method: "sendLocation",
  params: SendLocationParams,
  rateLimit: "message",
  result: Schema.suspend(() => Types.Message),
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
export const SendMediaGroupParams: Schema.Codec<SendMediaGroupParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { business_connection_id: "businessConnectionId", chat_id: "chatId", message_thread_id: "messageThreadId", direct_messages_topic_id: "directMessagesTopicId", disable_notification: "disableNotification", protect_content: "protectContent", allow_paid_broadcast: "allowPaidBroadcast", message_effect_id: "messageEffectId", reply_parameters: "replyParameters" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  business_connection_id: Schema.optional(Schema.String),
    chat_id: Schema.Union([Schema.Int, Schema.String]),
    message_thread_id: Schema.optional(Schema.Int),
    direct_messages_topic_id: Schema.optional(Schema.Int),
    media: Schema.Union([Schema.Array(Types.InputMediaAudio), Schema.Array(Types.InputMediaDocument), Schema.Array(Types.InputMediaLivePhoto), Schema.Array(Types.InputMediaPhoto), Schema.Array(Types.InputMediaVideo)]),
    disable_notification: Schema.optional(Schema.Boolean),
    protect_content: Schema.optional(Schema.Boolean),
    allow_paid_broadcast: Schema.optional(Schema.Boolean),
    message_effect_id: Schema.optional(Schema.String),
    reply_parameters: Schema.optional(Types.ReplyParameters),
  });
  const decoded = Schema.declare<SendMediaGroupParams>((input): input is SendMediaGroupParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const sendMediaGroup = callMethod({
  method: "sendMediaGroup",
  params: SendMediaGroupParams,
  rateLimit: "media-array",
  result: Schema.suspend(() => Schema.Array(Types.Message)),
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
export const SendMessageParams: Schema.Codec<SendMessageParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { business_connection_id: "businessConnectionId", chat_id: "chatId", message_thread_id: "messageThreadId", direct_messages_topic_id: "directMessagesTopicId", ephemeral_message_parameters: "ephemeralMessageParameters", parse_mode: "parseMode", link_preview_options: "linkPreviewOptions", disable_notification: "disableNotification", protect_content: "protectContent", allow_paid_broadcast: "allowPaidBroadcast", message_effect_id: "messageEffectId", suggested_post_parameters: "suggestedPostParameters", reply_parameters: "replyParameters", reply_markup: "replyMarkup" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  business_connection_id: Schema.optional(Schema.String),
    chat_id: Schema.Union([Schema.Int, Schema.String]),
    message_thread_id: Schema.optional(Schema.Int),
    direct_messages_topic_id: Schema.optional(Schema.Int),
    ephemeral_message_parameters: Schema.optional(Types.EphemeralMessageParameters),
    text: Schema.String,
    parse_mode: Schema.optional(Types.ParseMode),
    entities: Schema.optional(Schema.Array(Types.MessageEntity)),
    link_preview_options: Schema.optional(Types.LinkPreviewOptions),
    disable_notification: Schema.optional(Schema.Boolean),
    protect_content: Schema.optional(Schema.Boolean),
    allow_paid_broadcast: Schema.optional(Schema.Boolean),
    message_effect_id: Schema.optional(Schema.String),
    suggested_post_parameters: Schema.optional(Types.SuggestedPostParameters),
    reply_parameters: Schema.optional(Types.ReplyParameters),
    reply_markup: Schema.optional(Schema.Union([Types.InlineKeyboardMarkup, Types.ReplyKeyboardMarkup, Types.ReplyKeyboardRemove, Types.ForceReply])),
  });
  const decoded = Schema.declare<SendMessageParams>((input): input is SendMessageParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const sendMessage = callMethod({
  method: "sendMessage",
  params: SendMessageParams,
  rateLimit: "message",
  result: Schema.suspend(() => Types.Message),
  retrySafe: false,
});

/** Use this method to stream a partial message to a user while the message is being generated. Note that the streamed draft is ephemeral and acts as a temporary 30-second preview - once the output is finalized, you must call sendMessage with the complete message to persist it in the user's chat. Returns True on success. */
export interface SendMessageDraftParams {
  /** Unique identifier for the target private chat */
  readonly chatId: number;
  /** Unique identifier for the target message thread */
  readonly messageThreadId?: number | undefined;
  /** Unique identifier of the message draft; must be non-zero. Changes to drafts with the same identifier are animated. Otherwise, the draft is replaced without animation. */
  readonly draftId: number;
  /** Text of the message to be sent, 0-4096 characters after entities parsing. Pass an empty text to show a “Thinking…” placeholder. */
  readonly text?: string | undefined;
  /** Mode for parsing entities in the message text. See formatting options for more details. */
  readonly parseMode?: Types.ParseMode | undefined;
  /** A JSON-serialized list of special entities that appear in message text, which can be specified instead of parse_mode */
  readonly entities?: ReadonlyArray<Types.MessageEntity> | undefined;
  /** Pass True to show the user a button to stop further drafts. The bot will receive an Update “stopped_message_generation” if the user presses the button. */
  readonly canStop?: boolean | undefined;
  /** Pass True to keep the draft in the chat when the button is pressed. The draft will still disappear after a short time or if the bot sends a message. To fully preserve the partial draft, the bot should send it as a new message. */
  readonly keepOnStop?: boolean | undefined;
}
export const SendMessageDraftParams: Schema.Codec<SendMessageDraftParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { chat_id: "chatId", message_thread_id: "messageThreadId", draft_id: "draftId", parse_mode: "parseMode", can_stop: "canStop", keep_on_stop: "keepOnStop" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  chat_id: Schema.Int,
    message_thread_id: Schema.optional(Schema.Int),
    draft_id: Schema.Int,
    text: Schema.optional(Schema.String),
    parse_mode: Schema.optional(Types.ParseMode),
    entities: Schema.optional(Schema.Array(Types.MessageEntity)),
    can_stop: Schema.optional(Schema.Boolean),
    keep_on_stop: Schema.optional(Schema.Boolean),
  });
  const decoded = Schema.declare<SendMessageDraftParams>((input): input is SendMessageDraftParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const sendMessageDraft = callMethod({
  method: "sendMessageDraft",
  params: SendMessageDraftParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Literal(true)),
  retrySafe: true,
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
export const SendPaidMediaParams: Schema.Codec<SendPaidMediaParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { business_connection_id: "businessConnectionId", chat_id: "chatId", message_thread_id: "messageThreadId", direct_messages_topic_id: "directMessagesTopicId", star_count: "starCount", parse_mode: "parseMode", caption_entities: "captionEntities", show_caption_above_media: "showCaptionAboveMedia", disable_notification: "disableNotification", protect_content: "protectContent", allow_paid_broadcast: "allowPaidBroadcast", suggested_post_parameters: "suggestedPostParameters", reply_parameters: "replyParameters", reply_markup: "replyMarkup" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  business_connection_id: Schema.optional(Schema.String),
    chat_id: Schema.Union([Schema.Int, Schema.String]),
    message_thread_id: Schema.optional(Schema.Int),
    direct_messages_topic_id: Schema.optional(Schema.Int),
    star_count: Schema.Int,
    media: Schema.Array(Types.InputPaidMedia),
    payload: Schema.optional(Schema.String),
    caption: Schema.optional(Schema.String),
    parse_mode: Schema.optional(Types.ParseMode),
    caption_entities: Schema.optional(Schema.Array(Types.MessageEntity)),
    show_caption_above_media: Schema.optional(Schema.Boolean),
    disable_notification: Schema.optional(Schema.Boolean),
    protect_content: Schema.optional(Schema.Boolean),
    allow_paid_broadcast: Schema.optional(Schema.Boolean),
    suggested_post_parameters: Schema.optional(Types.SuggestedPostParameters),
    reply_parameters: Schema.optional(Types.ReplyParameters),
    reply_markup: Schema.optional(Schema.Union([Types.InlineKeyboardMarkup, Types.ReplyKeyboardMarkup, Types.ReplyKeyboardRemove, Types.ForceReply])),
  });
  const decoded = Schema.declare<SendPaidMediaParams>((input): input is SendPaidMediaParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const sendPaidMedia = callMethod({
  method: "sendPaidMedia",
  params: SendPaidMediaParams,
  rateLimit: "message",
  result: Schema.suspend(() => Types.Message),
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
export const SendPhotoParams: Schema.Codec<SendPhotoParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { business_connection_id: "businessConnectionId", chat_id: "chatId", message_thread_id: "messageThreadId", direct_messages_topic_id: "directMessagesTopicId", ephemeral_message_parameters: "ephemeralMessageParameters", parse_mode: "parseMode", caption_entities: "captionEntities", show_caption_above_media: "showCaptionAboveMedia", has_spoiler: "hasSpoiler", disable_notification: "disableNotification", protect_content: "protectContent", allow_paid_broadcast: "allowPaidBroadcast", message_effect_id: "messageEffectId", suggested_post_parameters: "suggestedPostParameters", reply_parameters: "replyParameters", reply_markup: "replyMarkup" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  business_connection_id: Schema.optional(Schema.String),
    chat_id: Schema.Union([Schema.Int, Schema.String]),
    message_thread_id: Schema.optional(Schema.Int),
    direct_messages_topic_id: Schema.optional(Schema.Int),
    ephemeral_message_parameters: Schema.optional(Types.EphemeralMessageParameters),
    photo: Schema.Union([Types.InputFile, Schema.String]),
    caption: Schema.optional(Schema.String),
    parse_mode: Schema.optional(Types.ParseMode),
    caption_entities: Schema.optional(Schema.Array(Types.MessageEntity)),
    show_caption_above_media: Schema.optional(Schema.Boolean),
    has_spoiler: Schema.optional(Schema.Boolean),
    disable_notification: Schema.optional(Schema.Boolean),
    protect_content: Schema.optional(Schema.Boolean),
    allow_paid_broadcast: Schema.optional(Schema.Boolean),
    message_effect_id: Schema.optional(Schema.String),
    suggested_post_parameters: Schema.optional(Types.SuggestedPostParameters),
    reply_parameters: Schema.optional(Types.ReplyParameters),
    reply_markup: Schema.optional(Schema.Union([Types.InlineKeyboardMarkup, Types.ReplyKeyboardMarkup, Types.ReplyKeyboardRemove, Types.ForceReply])),
  });
  const decoded = Schema.declare<SendPhotoParams>((input): input is SendPhotoParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const sendPhoto = callMethod({
  method: "sendPhoto",
  params: SendPhotoParams,
  rateLimit: "message",
  result: Schema.suspend(() => Types.Message),
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
export const SendPollParams: Schema.Codec<SendPollParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { business_connection_id: "businessConnectionId", chat_id: "chatId", message_thread_id: "messageThreadId", question_parse_mode: "questionParseMode", question_entities: "questionEntities", is_anonymous: "isAnonymous", allows_multiple_answers: "allowsMultipleAnswers", allows_revoting: "allowsRevoting", shuffle_options: "shuffleOptions", allow_adding_options: "allowAddingOptions", hide_results_until_closes: "hideResultsUntilCloses", members_only: "membersOnly", country_codes: "countryCodes", correct_option_ids: "correctOptionIds", explanation_parse_mode: "explanationParseMode", explanation_entities: "explanationEntities", explanation_media: "explanationMedia", open_period: "openPeriod", close_date: "closeDate", is_closed: "isClosed", description_parse_mode: "descriptionParseMode", description_entities: "descriptionEntities", disable_notification: "disableNotification", protect_content: "protectContent", allow_paid_broadcast: "allowPaidBroadcast", message_effect_id: "messageEffectId", reply_parameters: "replyParameters", reply_markup: "replyMarkup" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  business_connection_id: Schema.optional(Schema.String),
    chat_id: Schema.Union([Schema.Int, Schema.String]),
    message_thread_id: Schema.optional(Schema.Int),
    question: Schema.String,
    question_parse_mode: Schema.optional(Schema.String),
    question_entities: Schema.optional(Schema.Array(Types.MessageEntity)),
    options: Schema.Array(Types.InputPollOption),
    is_anonymous: Schema.optional(Schema.Boolean),
    type: Schema.optional(Types.PollType),
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
    explanation_entities: Schema.optional(Schema.Array(Types.MessageEntity)),
    explanation_media: Schema.optional(Types.InputPollMedia),
    open_period: Schema.optional(Schema.Int),
    close_date: Schema.optional(Schema.Int),
    is_closed: Schema.optional(Schema.Boolean),
    description: Schema.optional(Schema.String),
    description_parse_mode: Schema.optional(Types.ParseMode),
    description_entities: Schema.optional(Schema.Array(Types.MessageEntity)),
    media: Schema.optional(Types.InputPollMedia),
    disable_notification: Schema.optional(Schema.Boolean),
    protect_content: Schema.optional(Schema.Boolean),
    allow_paid_broadcast: Schema.optional(Schema.Boolean),
    message_effect_id: Schema.optional(Schema.String),
    reply_parameters: Schema.optional(Types.ReplyParameters),
    reply_markup: Schema.optional(Schema.Union([Types.InlineKeyboardMarkup, Types.ReplyKeyboardMarkup, Types.ReplyKeyboardRemove, Types.ForceReply])),
  });
  const decoded = Schema.declare<SendPollParams>((input): input is SendPollParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const sendPoll = callMethod({
  method: "sendPoll",
  params: SendPollParams,
  rateLimit: "message",
  result: Schema.suspend(() => Types.Message),
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
export const SendRichMessageParams: Schema.Codec<SendRichMessageParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { business_connection_id: "businessConnectionId", chat_id: "chatId", message_thread_id: "messageThreadId", direct_messages_topic_id: "directMessagesTopicId", ephemeral_message_parameters: "ephemeralMessageParameters", rich_message: "richMessage", disable_notification: "disableNotification", protect_content: "protectContent", allow_paid_broadcast: "allowPaidBroadcast", message_effect_id: "messageEffectId", suggested_post_parameters: "suggestedPostParameters", reply_parameters: "replyParameters", reply_markup: "replyMarkup" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  business_connection_id: Schema.optional(Schema.String),
    chat_id: Schema.Union([Schema.Int, Schema.String]),
    message_thread_id: Schema.optional(Schema.Int),
    direct_messages_topic_id: Schema.optional(Schema.Int),
    ephemeral_message_parameters: Schema.optional(Types.EphemeralMessageParameters),
    rich_message: Types.InputRichMessage,
    disable_notification: Schema.optional(Schema.Boolean),
    protect_content: Schema.optional(Schema.Boolean),
    allow_paid_broadcast: Schema.optional(Schema.Boolean),
    message_effect_id: Schema.optional(Schema.String),
    suggested_post_parameters: Schema.optional(Types.SuggestedPostParameters),
    reply_parameters: Schema.optional(Types.ReplyParameters),
    reply_markup: Schema.optional(Schema.Union([Types.InlineKeyboardMarkup, Types.ReplyKeyboardMarkup, Types.ReplyKeyboardRemove, Types.ForceReply])),
  });
  const decoded = Schema.declare<SendRichMessageParams>((input): input is SendRichMessageParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const sendRichMessage = callMethod({
  method: "sendRichMessage",
  params: SendRichMessageParams,
  rateLimit: "message",
  result: Schema.suspend(() => Types.Message),
  retrySafe: false,
});

/** Use this method to stream a partial rich message to a user while the message is being generated. Note that the streamed draft is ephemeral and acts as a temporary 30-second preview - once the output is finalized, you must call sendRichMessage with the complete message to persist it in the user's chat. Returns True on success. */
export interface SendRichMessageDraftParams {
  /** Unique identifier for the target private chat */
  readonly chatId: number;
  /** Unique identifier for the target message thread */
  readonly messageThreadId?: number | undefined;
  /** Unique identifier of the message draft; must be non-zero. Changes to drafts with the same identifier are animated. Otherwise, the draft is replaced without animation. */
  readonly draftId: number;
  /** The partial message to be streamed. Direct upload of new files and explicit upload of files by a URL isn't supported. */
  readonly richMessage: Types.InputRichMessage;
  /** Pass True to show the user a button to stop further drafts. The bot will receive an Update “stopped_message_generation” if the user presses the button. */
  readonly canStop?: boolean | undefined;
  /** Pass True to keep the draft in the chat when the button is pressed. The draft will still disappear after a short time or if the bot sends a message. To fully preserve the partial draft, the bot should send it as a new message. */
  readonly keepOnStop?: boolean | undefined;
}
export const SendRichMessageDraftParams: Schema.Codec<SendRichMessageDraftParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { chat_id: "chatId", message_thread_id: "messageThreadId", draft_id: "draftId", rich_message: "richMessage", can_stop: "canStop", keep_on_stop: "keepOnStop" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  chat_id: Schema.Int,
    message_thread_id: Schema.optional(Schema.Int),
    draft_id: Schema.Int,
    rich_message: Types.InputRichMessage,
    can_stop: Schema.optional(Schema.Boolean),
    keep_on_stop: Schema.optional(Schema.Boolean),
  });
  const decoded = Schema.declare<SendRichMessageDraftParams>((input): input is SendRichMessageDraftParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const sendRichMessageDraft = callMethod({
  method: "sendRichMessageDraft",
  params: SendRichMessageDraftParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Literal(true)),
  retrySafe: true,
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
export const SendStickerParams: Schema.Codec<SendStickerParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { business_connection_id: "businessConnectionId", chat_id: "chatId", message_thread_id: "messageThreadId", direct_messages_topic_id: "directMessagesTopicId", ephemeral_message_parameters: "ephemeralMessageParameters", disable_notification: "disableNotification", protect_content: "protectContent", allow_paid_broadcast: "allowPaidBroadcast", message_effect_id: "messageEffectId", suggested_post_parameters: "suggestedPostParameters", reply_parameters: "replyParameters", reply_markup: "replyMarkup" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  business_connection_id: Schema.optional(Schema.String),
    chat_id: Schema.Union([Schema.Int, Schema.String]),
    message_thread_id: Schema.optional(Schema.Int),
    direct_messages_topic_id: Schema.optional(Schema.Int),
    ephemeral_message_parameters: Schema.optional(Types.EphemeralMessageParameters),
    sticker: Schema.Union([Types.InputFile, Schema.String]),
    emoji: Schema.optional(Schema.String),
    disable_notification: Schema.optional(Schema.Boolean),
    protect_content: Schema.optional(Schema.Boolean),
    allow_paid_broadcast: Schema.optional(Schema.Boolean),
    message_effect_id: Schema.optional(Schema.String),
    suggested_post_parameters: Schema.optional(Types.SuggestedPostParameters),
    reply_parameters: Schema.optional(Types.ReplyParameters),
    reply_markup: Schema.optional(Schema.Union([Types.InlineKeyboardMarkup, Types.ReplyKeyboardMarkup, Types.ReplyKeyboardRemove, Types.ForceReply])),
  });
  const decoded = Schema.declare<SendStickerParams>((input): input is SendStickerParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const sendSticker = callMethod({
  method: "sendSticker",
  params: SendStickerParams,
  rateLimit: "message",
  result: Schema.suspend(() => Types.Message),
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
export const SendVenueParams: Schema.Codec<SendVenueParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { business_connection_id: "businessConnectionId", chat_id: "chatId", message_thread_id: "messageThreadId", direct_messages_topic_id: "directMessagesTopicId", ephemeral_message_parameters: "ephemeralMessageParameters", foursquare_id: "foursquareId", foursquare_type: "foursquareType", google_place_id: "googlePlaceId", google_place_type: "googlePlaceType", disable_notification: "disableNotification", protect_content: "protectContent", allow_paid_broadcast: "allowPaidBroadcast", message_effect_id: "messageEffectId", suggested_post_parameters: "suggestedPostParameters", reply_parameters: "replyParameters", reply_markup: "replyMarkup" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  business_connection_id: Schema.optional(Schema.String),
    chat_id: Schema.Union([Schema.Int, Schema.String]),
    message_thread_id: Schema.optional(Schema.Int),
    direct_messages_topic_id: Schema.optional(Schema.Int),
    ephemeral_message_parameters: Schema.optional(Types.EphemeralMessageParameters),
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
    suggested_post_parameters: Schema.optional(Types.SuggestedPostParameters),
    reply_parameters: Schema.optional(Types.ReplyParameters),
    reply_markup: Schema.optional(Schema.Union([Types.InlineKeyboardMarkup, Types.ReplyKeyboardMarkup, Types.ReplyKeyboardRemove, Types.ForceReply])),
  });
  const decoded = Schema.declare<SendVenueParams>((input): input is SendVenueParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const sendVenue = callMethod({
  method: "sendVenue",
  params: SendVenueParams,
  rateLimit: "message",
  result: Schema.suspend(() => Types.Message),
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
export const SendVideoParams: Schema.Codec<SendVideoParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { business_connection_id: "businessConnectionId", chat_id: "chatId", message_thread_id: "messageThreadId", direct_messages_topic_id: "directMessagesTopicId", ephemeral_message_parameters: "ephemeralMessageParameters", start_timestamp: "startTimestamp", parse_mode: "parseMode", caption_entities: "captionEntities", show_caption_above_media: "showCaptionAboveMedia", has_spoiler: "hasSpoiler", supports_streaming: "supportsStreaming", disable_notification: "disableNotification", protect_content: "protectContent", allow_paid_broadcast: "allowPaidBroadcast", message_effect_id: "messageEffectId", suggested_post_parameters: "suggestedPostParameters", reply_parameters: "replyParameters", reply_markup: "replyMarkup" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  business_connection_id: Schema.optional(Schema.String),
    chat_id: Schema.Union([Schema.Int, Schema.String]),
    message_thread_id: Schema.optional(Schema.Int),
    direct_messages_topic_id: Schema.optional(Schema.Int),
    ephemeral_message_parameters: Schema.optional(Types.EphemeralMessageParameters),
    video: Schema.Union([Types.InputFile, Schema.String]),
    duration: Schema.optional(Schema.Int),
    width: Schema.optional(Schema.Int),
    height: Schema.optional(Schema.Int),
    thumbnail: Schema.optional(Schema.Union([Types.InputFile, Schema.String])),
    cover: Schema.optional(Schema.Union([Types.InputFile, Schema.String])),
    start_timestamp: Schema.optional(Schema.Int),
    caption: Schema.optional(Schema.String),
    parse_mode: Schema.optional(Types.ParseMode),
    caption_entities: Schema.optional(Schema.Array(Types.MessageEntity)),
    show_caption_above_media: Schema.optional(Schema.Boolean),
    has_spoiler: Schema.optional(Schema.Boolean),
    supports_streaming: Schema.optional(Schema.Boolean),
    disable_notification: Schema.optional(Schema.Boolean),
    protect_content: Schema.optional(Schema.Boolean),
    allow_paid_broadcast: Schema.optional(Schema.Boolean),
    message_effect_id: Schema.optional(Schema.String),
    suggested_post_parameters: Schema.optional(Types.SuggestedPostParameters),
    reply_parameters: Schema.optional(Types.ReplyParameters),
    reply_markup: Schema.optional(Schema.Union([Types.InlineKeyboardMarkup, Types.ReplyKeyboardMarkup, Types.ReplyKeyboardRemove, Types.ForceReply])),
  });
  const decoded = Schema.declare<SendVideoParams>((input): input is SendVideoParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const sendVideo = callMethod({
  method: "sendVideo",
  params: SendVideoParams,
  rateLimit: "message",
  result: Schema.suspend(() => Types.Message),
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
export const SendVideoNoteParams: Schema.Codec<SendVideoNoteParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { business_connection_id: "businessConnectionId", chat_id: "chatId", message_thread_id: "messageThreadId", direct_messages_topic_id: "directMessagesTopicId", ephemeral_message_parameters: "ephemeralMessageParameters", video_note: "videoNote", disable_notification: "disableNotification", protect_content: "protectContent", allow_paid_broadcast: "allowPaidBroadcast", message_effect_id: "messageEffectId", suggested_post_parameters: "suggestedPostParameters", reply_parameters: "replyParameters", reply_markup: "replyMarkup" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  business_connection_id: Schema.optional(Schema.String),
    chat_id: Schema.Union([Schema.Int, Schema.String]),
    message_thread_id: Schema.optional(Schema.Int),
    direct_messages_topic_id: Schema.optional(Schema.Int),
    ephemeral_message_parameters: Schema.optional(Types.EphemeralMessageParameters),
    video_note: Schema.Union([Types.InputFile, Schema.String]),
    duration: Schema.optional(Schema.Int),
    length: Schema.optional(Schema.Int),
    thumbnail: Schema.optional(Schema.Union([Types.InputFile, Schema.String])),
    disable_notification: Schema.optional(Schema.Boolean),
    protect_content: Schema.optional(Schema.Boolean),
    allow_paid_broadcast: Schema.optional(Schema.Boolean),
    message_effect_id: Schema.optional(Schema.String),
    suggested_post_parameters: Schema.optional(Types.SuggestedPostParameters),
    reply_parameters: Schema.optional(Types.ReplyParameters),
    reply_markup: Schema.optional(Schema.Union([Types.InlineKeyboardMarkup, Types.ReplyKeyboardMarkup, Types.ReplyKeyboardRemove, Types.ForceReply])),
  });
  const decoded = Schema.declare<SendVideoNoteParams>((input): input is SendVideoNoteParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const sendVideoNote = callMethod({
  method: "sendVideoNote",
  params: SendVideoNoteParams,
  rateLimit: "message",
  result: Schema.suspend(() => Types.Message),
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
export const SendVoiceParams: Schema.Codec<SendVoiceParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { business_connection_id: "businessConnectionId", chat_id: "chatId", message_thread_id: "messageThreadId", direct_messages_topic_id: "directMessagesTopicId", ephemeral_message_parameters: "ephemeralMessageParameters", parse_mode: "parseMode", caption_entities: "captionEntities", disable_notification: "disableNotification", protect_content: "protectContent", allow_paid_broadcast: "allowPaidBroadcast", message_effect_id: "messageEffectId", suggested_post_parameters: "suggestedPostParameters", reply_parameters: "replyParameters", reply_markup: "replyMarkup" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  business_connection_id: Schema.optional(Schema.String),
    chat_id: Schema.Union([Schema.Int, Schema.String]),
    message_thread_id: Schema.optional(Schema.Int),
    direct_messages_topic_id: Schema.optional(Schema.Int),
    ephemeral_message_parameters: Schema.optional(Types.EphemeralMessageParameters),
    voice: Schema.Union([Types.InputFile, Schema.String]),
    caption: Schema.optional(Schema.String),
    parse_mode: Schema.optional(Types.ParseMode),
    caption_entities: Schema.optional(Schema.Array(Types.MessageEntity)),
    duration: Schema.optional(Schema.Int),
    disable_notification: Schema.optional(Schema.Boolean),
    protect_content: Schema.optional(Schema.Boolean),
    allow_paid_broadcast: Schema.optional(Schema.Boolean),
    message_effect_id: Schema.optional(Schema.String),
    suggested_post_parameters: Schema.optional(Types.SuggestedPostParameters),
    reply_parameters: Schema.optional(Types.ReplyParameters),
    reply_markup: Schema.optional(Schema.Union([Types.InlineKeyboardMarkup, Types.ReplyKeyboardMarkup, Types.ReplyKeyboardRemove, Types.ForceReply])),
  });
  const decoded = Schema.declare<SendVoiceParams>((input): input is SendVoiceParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const sendVoice = callMethod({
  method: "sendVoice",
  params: SendVoiceParams,
  rateLimit: "message",
  result: Schema.suspend(() => Types.Message),
  retrySafe: false,
});

/** Changes the bio of a managed business account. Requires the can_change_bio business bot right. Returns True on success. */
export interface SetBusinessAccountBioParams {
  /** Unique identifier of the business connection */
  readonly businessConnectionId: string;
  /** The new value of the bio for the business account; 0-140 characters */
  readonly bio?: string | undefined;
}
export const SetBusinessAccountBioParams: Schema.Codec<SetBusinessAccountBioParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { business_connection_id: "businessConnectionId" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  business_connection_id: Schema.String,
    bio: Schema.optional(Schema.String),
  });
  const decoded = Schema.declare<SetBusinessAccountBioParams>((input): input is SetBusinessAccountBioParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const setBusinessAccountBio = callMethod({
  method: "setBusinessAccountBio",
  params: SetBusinessAccountBioParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Literal(true)),
  retrySafe: true,
});

/** Changes the privacy settings pertaining to incoming gifts in a managed business account. Requires the can_change_gift_settings business bot right. Returns True on success. */
export interface SetBusinessAccountGiftSettingsParams {
  /** Unique identifier of the business connection */
  readonly businessConnectionId: string;
  /** Pass True if a button for sending a gift to the user or by the business account must always be shown in the input field */
  readonly showGiftButton: boolean;
  /** Types of gifts accepted by the business account */
  readonly acceptedGiftTypes: Types.AcceptedGiftTypes;
}
export const SetBusinessAccountGiftSettingsParams: Schema.Codec<SetBusinessAccountGiftSettingsParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { business_connection_id: "businessConnectionId", show_gift_button: "showGiftButton", accepted_gift_types: "acceptedGiftTypes" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  business_connection_id: Schema.String,
    show_gift_button: Schema.Boolean,
    accepted_gift_types: Types.AcceptedGiftTypes,
  });
  const decoded = Schema.declare<SetBusinessAccountGiftSettingsParams>((input): input is SetBusinessAccountGiftSettingsParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const setBusinessAccountGiftSettings = callMethod({
  method: "setBusinessAccountGiftSettings",
  params: SetBusinessAccountGiftSettingsParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Literal(true)),
  retrySafe: true,
});

/** Changes the first and last name of a managed business account. Requires the can_change_name business bot right. Returns True on success. */
export interface SetBusinessAccountNameParams {
  /** Unique identifier of the business connection */
  readonly businessConnectionId: string;
  /** The new value of the first name for the business account; 1-64 characters */
  readonly firstName: string;
  /** The new value of the last name for the business account; 0-64 characters */
  readonly lastName?: string | undefined;
}
export const SetBusinessAccountNameParams: Schema.Codec<SetBusinessAccountNameParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { business_connection_id: "businessConnectionId", first_name: "firstName", last_name: "lastName" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  business_connection_id: Schema.String,
    first_name: Schema.String,
    last_name: Schema.optional(Schema.String),
  });
  const decoded = Schema.declare<SetBusinessAccountNameParams>((input): input is SetBusinessAccountNameParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const setBusinessAccountName = callMethod({
  method: "setBusinessAccountName",
  params: SetBusinessAccountNameParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Literal(true)),
  retrySafe: true,
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
export const SetBusinessAccountProfilePhotoParams: Schema.Codec<SetBusinessAccountProfilePhotoParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { business_connection_id: "businessConnectionId", is_public: "isPublic" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  business_connection_id: Schema.String,
    photo: Types.InputProfilePhoto,
    is_public: Schema.optional(Schema.Boolean),
  });
  const decoded = Schema.declare<SetBusinessAccountProfilePhotoParams>((input): input is SetBusinessAccountProfilePhotoParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const setBusinessAccountProfilePhoto = callMethod({
  method: "setBusinessAccountProfilePhoto",
  params: SetBusinessAccountProfilePhotoParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Literal(true)),
  retrySafe: false,
});

/** Changes the username of a managed business account. Requires the can_change_username business bot right. Returns True on success. */
export interface SetBusinessAccountUsernameParams {
  /** Unique identifier of the business connection */
  readonly businessConnectionId: string;
  /** The new value of the username for the business account; 0-32 characters */
  readonly username?: string | undefined;
}
export const SetBusinessAccountUsernameParams: Schema.Codec<SetBusinessAccountUsernameParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { business_connection_id: "businessConnectionId" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  business_connection_id: Schema.String,
    username: Schema.optional(Schema.String),
  });
  const decoded = Schema.declare<SetBusinessAccountUsernameParams>((input): input is SetBusinessAccountUsernameParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const setBusinessAccountUsername = callMethod({
  method: "setBusinessAccountUsername",
  params: SetBusinessAccountUsernameParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Literal(true)),
  retrySafe: true,
});

/** Use this method to set a custom title for an administrator in a supergroup promoted by the bot. Returns True on success. */
export interface SetChatAdministratorCustomTitleParams {
  /** Unique identifier for the target chat or username of the target supergroup in the format @username */
  readonly chatId: number | string;
  /** Unique identifier of the target user */
  readonly userId: number;
  /** New custom title for the administrator; 0-16 characters, emoji are not allowed */
  readonly customTitle: string;
}
export const SetChatAdministratorCustomTitleParams: Schema.Codec<SetChatAdministratorCustomTitleParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { chat_id: "chatId", user_id: "userId", custom_title: "customTitle" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  chat_id: Schema.Union([Schema.Int, Schema.String]),
    user_id: Schema.Int,
    custom_title: Schema.String,
  });
  const decoded = Schema.declare<SetChatAdministratorCustomTitleParams>((input): input is SetChatAdministratorCustomTitleParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const setChatAdministratorCustomTitle = callMethod({
  method: "setChatAdministratorCustomTitle",
  params: SetChatAdministratorCustomTitleParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Literal(true)),
  retrySafe: true,
});

/** Use this method to change the description of a group, a supergroup or a channel. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns True on success. */
export interface SetChatDescriptionParams {
  /** Unique identifier for the target chat or username of the target channel in the format @username */
  readonly chatId: number | string;
  /** New chat description, 0-255 characters */
  readonly description?: string | undefined;
}
export const SetChatDescriptionParams: Schema.Codec<SetChatDescriptionParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { chat_id: "chatId" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  chat_id: Schema.Union([Schema.Int, Schema.String]),
    description: Schema.optional(Schema.String),
  });
  const decoded = Schema.declare<SetChatDescriptionParams>((input): input is SetChatDescriptionParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const setChatDescription = callMethod({
  method: "setChatDescription",
  params: SetChatDescriptionParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Literal(true)),
  retrySafe: true,
});

/** Use this method to set a tag for a regular member in a group or a supergroup. The bot must be an administrator in the chat for this to work and must have the can_manage_tags administrator right. Returns True on success. */
export interface SetChatMemberTagParams {
  /** Unique identifier for the target chat or username of the target supergroup in the format @username */
  readonly chatId: number | string;
  /** Unique identifier of the target user */
  readonly userId: number;
  /** New tag for the member; 0-16 characters, emoji are not allowed */
  readonly tag?: string | undefined;
}
export const SetChatMemberTagParams: Schema.Codec<SetChatMemberTagParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { chat_id: "chatId", user_id: "userId" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  chat_id: Schema.Union([Schema.Int, Schema.String]),
    user_id: Schema.Int,
    tag: Schema.optional(Schema.String),
  });
  const decoded = Schema.declare<SetChatMemberTagParams>((input): input is SetChatMemberTagParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const setChatMemberTag = callMethod({
  method: "setChatMemberTag",
  params: SetChatMemberTagParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Literal(true)),
  retrySafe: true,
});

/** Use this method to change the bot's menu button in a private chat, or the default menu button. Returns True on success. */
export interface SetChatMenuButtonParams {
  /** Unique identifier for the target private chat. If not specified, the bot's default menu button will be changed. */
  readonly chatId?: number | undefined;
  /** A JSON-serialized object for the bot's new menu button. Defaults to MenuButtonDefault. */
  readonly menuButton?: Types.MenuButton | undefined;
}
export const SetChatMenuButtonParams: Schema.Codec<SetChatMenuButtonParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { chat_id: "chatId", menu_button: "menuButton" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  chat_id: Schema.optional(Schema.Int),
    menu_button: Schema.optional(Types.MenuButton),
  });
  const decoded = Schema.declare<SetChatMenuButtonParams>((input): input is SetChatMenuButtonParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const setChatMenuButton = callMethod({
  method: "setChatMenuButton",
  params: SetChatMenuButtonParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Literal(true)),
  retrySafe: true,
});

/** Use this method to set default chat permissions for all members. The bot must be an administrator in the group or a supergroup for this to work and must have the can_restrict_members administrator rights. Returns True on success. */
export interface SetChatPermissionsParams {
  /** Unique identifier for the target chat or username of the target supergroup in the format @username */
  readonly chatId: number | string;
  /** A JSON-serialized object for new default chat permissions */
  readonly permissions: Types.ChatPermissions;
  /** Pass True if chat permissions are set independently. Otherwise, the can_send_other_messages and can_add_web_page_previews permissions will imply the can_send_messages, can_send_audios, can_send_documents, can_send_photos, can_send_videos, can_send_video_notes, and can_send_voice_notes permissions; the can_send_polls permission will imply the can_send_messages permission. */
  readonly useIndependentChatPermissions?: boolean | undefined;
}
export const SetChatPermissionsParams: Schema.Codec<SetChatPermissionsParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { chat_id: "chatId", use_independent_chat_permissions: "useIndependentChatPermissions" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  chat_id: Schema.Union([Schema.Int, Schema.String]),
    permissions: Types.ChatPermissions,
    use_independent_chat_permissions: Schema.optional(Schema.Boolean),
  });
  const decoded = Schema.declare<SetChatPermissionsParams>((input): input is SetChatPermissionsParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const setChatPermissions = callMethod({
  method: "setChatPermissions",
  params: SetChatPermissionsParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Literal(true)),
  retrySafe: true,
});

/** Use this method to set a new profile photo for the chat. Photos can't be changed for private chats. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns True on success. */
export interface SetChatPhotoParams {
  /** Unique identifier for the target chat or username of the target channel in the format @username */
  readonly chatId: number | string;
  /** New chat photo, uploaded using multipart/form-data */
  readonly photo: Types.InputFile;
}
export const SetChatPhotoParams: Schema.Codec<SetChatPhotoParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { chat_id: "chatId" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  chat_id: Schema.Union([Schema.Int, Schema.String]),
    photo: Types.InputFile,
  });
  const decoded = Schema.declare<SetChatPhotoParams>((input): input is SetChatPhotoParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const setChatPhoto = callMethod({
  method: "setChatPhoto",
  params: SetChatPhotoParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Literal(true)),
  retrySafe: false,
});

/** Use this method to set a new group sticker set for a supergroup. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Use the field can_set_sticker_set optionally returned in getChat requests to check if the bot can use this method. Returns True on success. */
export interface SetChatStickerSetParams {
  /** Unique identifier for the target chat or username of the target supergroup in the format @username */
  readonly chatId: number | string;
  /** Name of the sticker set to be set as the group sticker set */
  readonly stickerSetName: string;
}
export const SetChatStickerSetParams: Schema.Codec<SetChatStickerSetParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { chat_id: "chatId", sticker_set_name: "stickerSetName" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  chat_id: Schema.Union([Schema.Int, Schema.String]),
    sticker_set_name: Schema.String,
  });
  const decoded = Schema.declare<SetChatStickerSetParams>((input): input is SetChatStickerSetParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const setChatStickerSet = callMethod({
  method: "setChatStickerSet",
  params: SetChatStickerSetParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Literal(true)),
  retrySafe: true,
});

/** Use this method to change the title of a chat. Titles can't be changed for private chats. The bot must be an administrator in the chat for this to work and must have the appropriate administrator rights. Returns True on success. */
export interface SetChatTitleParams {
  /** Unique identifier for the target chat or username of the target channel in the format @username */
  readonly chatId: number | string;
  /** New chat title, 1-128 characters */
  readonly title: string;
}
export const SetChatTitleParams: Schema.Codec<SetChatTitleParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { chat_id: "chatId" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  chat_id: Schema.Union([Schema.Int, Schema.String]),
    title: Schema.String,
  });
  const decoded = Schema.declare<SetChatTitleParams>((input): input is SetChatTitleParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const setChatTitle = callMethod({
  method: "setChatTitle",
  params: SetChatTitleParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Literal(true)),
  retrySafe: true,
});

/** Use this method to set the thumbnail of a custom emoji sticker set. Returns True on success. */
export interface SetCustomEmojiStickerSetThumbnailParams {
  /** Sticker set name */
  readonly name: string;
  /** Custom emoji identifier of a sticker from the sticker set; pass an empty string to drop the thumbnail and use the first sticker as the thumbnail */
  readonly customEmojiId?: string | undefined;
}
export const SetCustomEmojiStickerSetThumbnailParams: Schema.Codec<SetCustomEmojiStickerSetThumbnailParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { custom_emoji_id: "customEmojiId" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  name: Schema.String,
    custom_emoji_id: Schema.optional(Schema.String),
  });
  const decoded = Schema.declare<SetCustomEmojiStickerSetThumbnailParams>((input): input is SetCustomEmojiStickerSetThumbnailParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const setCustomEmojiStickerSetThumbnail = callMethod({
  method: "setCustomEmojiStickerSetThumbnail",
  params: SetCustomEmojiStickerSetThumbnailParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Literal(true)),
  retrySafe: true,
});

/** Use this method to set the score of the specified user in a game message. On success, if the message is not an inline message, the Message is returned, otherwise True is returned. Returns an error, if the new score is not greater than the user's current score in the chat and force is False. */
export interface SetGameScoreParams {
  /** User identifier */
  readonly userId: number;
  /** New score, must be non-negative */
  readonly score: number;
  /** Pass True if the high score is allowed to decrease. This can be useful when fixing mistakes or banning cheaters. */
  readonly force?: boolean | undefined;
  /** Pass True if the game message should not be automatically edited to include the current scoreboard */
  readonly disableEditMessage?: boolean | undefined;
  /** Required if inline_message_id is not specified. Unique identifier for the target chat. */
  readonly chatId?: number | undefined;
  /** Required if inline_message_id is not specified. Identifier of the sent message. */
  readonly messageId?: number | undefined;
  /** Required if chat_id and message_id are not specified. Identifier of the inline message. */
  readonly inlineMessageId?: string | undefined;
}
export const SetGameScoreParams: Schema.Codec<SetGameScoreParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { user_id: "userId", disable_edit_message: "disableEditMessage", chat_id: "chatId", message_id: "messageId", inline_message_id: "inlineMessageId" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  user_id: Schema.Int,
    score: Schema.Int,
    force: Schema.optional(Schema.Boolean),
    disable_edit_message: Schema.optional(Schema.Boolean),
    chat_id: Schema.optional(Schema.Int),
    message_id: Schema.optional(Schema.Int),
    inline_message_id: Schema.optional(Schema.String),
  });
  const decoded = Schema.declare<SetGameScoreParams>((input): input is SetGameScoreParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const setGameScore = callMethod({
  method: "setGameScore",
  params: SetGameScoreParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Union([Types.Message, Schema.Literal(true)])),
  retrySafe: true,
});

/** Use this method to change the access settings of a managed bot. Returns True on success. */
export interface SetManagedBotAccessSettingsParams {
  /** User identifier of the managed bot whose access settings will be changed */
  readonly userId: number;
  /** Pass True if only selected users can access the bot. The bot's owner can always access it. */
  readonly isAccessRestricted: boolean;
  /** A JSON-serialized list of up to 10 identifiers of users who will have access to the bot in addition to its owner. Ignored if is_access_restricted is False. */
  readonly addedUserIds?: ReadonlyArray<number> | undefined;
}
export const SetManagedBotAccessSettingsParams: Schema.Codec<SetManagedBotAccessSettingsParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { user_id: "userId", is_access_restricted: "isAccessRestricted", added_user_ids: "addedUserIds" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  user_id: Schema.Int,
    is_access_restricted: Schema.Boolean,
    added_user_ids: Schema.optional(Schema.Array(Schema.Int)),
  });
  const decoded = Schema.declare<SetManagedBotAccessSettingsParams>((input): input is SetManagedBotAccessSettingsParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const setManagedBotAccessSettings = callMethod({
  method: "setManagedBotAccessSettings",
  params: SetManagedBotAccessSettingsParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Literal(true)),
  retrySafe: true,
});

/** Use this method to change the chosen reactions on a message. Service messages of some types can't be reacted to. Automatically forwarded messages from a channel to its discussion group have the same available reactions as messages in the channel. Bots can't use paid reactions. Returns True on success. */
export interface SetMessageReactionParams {
  /** Unique identifier for the target chat or username of the target bot, supergroup or channel in the format @username */
  readonly chatId: number | string;
  /** Identifier of the target message. If the message belongs to a media group, the reaction is set to the first non-deleted message in the group instead. */
  readonly messageId: number;
  /** A JSON-serialized list of reaction types to set on the message. Currently, as non-premium users, bots can set up to one reaction per message. A custom emoji reaction can be used if it is either already present on the message or explicitly allowed by chat administrators. Paid reactions can't be used by bots. */
  readonly reaction?: ReadonlyArray<Types.ReactionType> | undefined;
  /** Pass True to set the reaction with a big animation */
  readonly isBig?: boolean | undefined;
}
export const SetMessageReactionParams: Schema.Codec<SetMessageReactionParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { chat_id: "chatId", message_id: "messageId", is_big: "isBig" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  chat_id: Schema.Union([Schema.Int, Schema.String]),
    message_id: Schema.Int,
    reaction: Schema.optional(Schema.Array(Types.ReactionType)),
    is_big: Schema.optional(Schema.Boolean),
  });
  const decoded = Schema.declare<SetMessageReactionParams>((input): input is SetMessageReactionParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const setMessageReaction = callMethod({
  method: "setMessageReaction",
  params: SetMessageReactionParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Literal(true)),
  retrySafe: true,
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
export const SetMyCommandsParams: Schema.Codec<SetMyCommandsParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { language_code: "languageCode" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  commands: Schema.Array(Types.BotCommand),
    scope: Schema.optional(Types.BotCommandScope),
    language_code: Schema.optional(Schema.String),
  });
  const decoded = Schema.declare<SetMyCommandsParams>((input): input is SetMyCommandsParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const setMyCommands = callMethod({
  method: "setMyCommands",
  params: SetMyCommandsParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Literal(true)),
  retrySafe: true,
});

/** Use this method to change the default administrator rights requested by the bot when it's added as an administrator to groups or channels. These rights will be suggested to users, but they are free to modify the list before adding the bot. Returns True on success. */
export interface SetMyDefaultAdministratorRightsParams {
  /** A JSON-serialized object describing new default administrator rights. If not specified, the default administrator rights will be cleared. */
  readonly rights?: Types.ChatAdministratorRights | undefined;
  /** Pass True to change the default administrator rights of the bot in channels. Otherwise, the default administrator rights of the bot for groups and supergroups will be changed. */
  readonly forChannels?: boolean | undefined;
}
export const SetMyDefaultAdministratorRightsParams: Schema.Codec<SetMyDefaultAdministratorRightsParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { for_channels: "forChannels" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  rights: Schema.optional(Types.ChatAdministratorRights),
    for_channels: Schema.optional(Schema.Boolean),
  });
  const decoded = Schema.declare<SetMyDefaultAdministratorRightsParams>((input): input is SetMyDefaultAdministratorRightsParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const setMyDefaultAdministratorRights = callMethod({
  method: "setMyDefaultAdministratorRights",
  params: SetMyDefaultAdministratorRightsParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Literal(true)),
  retrySafe: true,
});

/** Use this method to change the bot's description, which is shown in the chat with the bot if the chat is empty. Returns True on success. */
export interface SetMyDescriptionParams {
  /** New bot description; 0-512 characters. Pass an empty string to remove the dedicated description for the given language. */
  readonly description?: string | undefined;
  /** A two-letter ISO 639-1 language code. If empty, the description will be applied to all users for whose language there is no dedicated description. */
  readonly languageCode?: string | undefined;
}
export const SetMyDescriptionParams: Schema.Codec<SetMyDescriptionParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { language_code: "languageCode" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  description: Schema.optional(Schema.String),
    language_code: Schema.optional(Schema.String),
  });
  const decoded = Schema.declare<SetMyDescriptionParams>((input): input is SetMyDescriptionParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const setMyDescription = callMethod({
  method: "setMyDescription",
  params: SetMyDescriptionParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Literal(true)),
  retrySafe: true,
});

/** Use this method to change the bot's name. Returns True on success. */
export interface SetMyNameParams {
  /** New bot name; 0-64 characters. Pass an empty string to remove the dedicated name for the given language. */
  readonly name?: string | undefined;
  /** A two-letter ISO 639-1 language code. If empty, the name will be shown to all users for whose language there is no dedicated name. */
  readonly languageCode?: string | undefined;
}
export const SetMyNameParams: Schema.Codec<SetMyNameParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { language_code: "languageCode" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  name: Schema.optional(Schema.String),
    language_code: Schema.optional(Schema.String),
  });
  const decoded = Schema.declare<SetMyNameParams>((input): input is SetMyNameParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const setMyName = callMethod({
  method: "setMyName",
  params: SetMyNameParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Literal(true)),
  retrySafe: true,
});

/** Changes the profile photo of the bot. Returns True on success. */
export interface SetMyProfilePhotoParams {
  /** The new profile photo to set */
  readonly photo: Types.InputProfilePhoto;
}
export const SetMyProfilePhotoParams: Schema.Codec<SetMyProfilePhotoParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => Schema.Struct({
  photo: Types.InputProfilePhoto,
}));

export const setMyProfilePhoto = callMethod({
  method: "setMyProfilePhoto",
  params: SetMyProfilePhotoParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Literal(true)),
  retrySafe: false,
});

/** Use this method to change the bot's short description, which is shown on the bot's profile page and is sent together with the link when users share the bot. Returns True on success. */
export interface SetMyShortDescriptionParams {
  /** New short description for the bot; 0-120 characters. Pass an empty string to remove the dedicated short description for the given language. */
  readonly shortDescription?: string | undefined;
  /** A two-letter ISO 639-1 language code. If empty, the short description will be applied to all users for whose language there is no dedicated short description. */
  readonly languageCode?: string | undefined;
}
export const SetMyShortDescriptionParams: Schema.Codec<SetMyShortDescriptionParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { short_description: "shortDescription", language_code: "languageCode" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  short_description: Schema.optional(Schema.String),
    language_code: Schema.optional(Schema.String),
  });
  const decoded = Schema.declare<SetMyShortDescriptionParams>((input): input is SetMyShortDescriptionParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const setMyShortDescription = callMethod({
  method: "setMyShortDescription",
  params: SetMyShortDescriptionParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Literal(true)),
  retrySafe: true,
});

/** Informs a user that some of the Telegram Passport elements they provided contains errors. The user will not be able to re-submit their Passport to you until the errors are fixed (the contents of the field for which you returned the error must change). Returns True on success. Use this if the data submitted by the user doesn't satisfy the standards your service requires for any reason. For example, if a birthday date seems invalid, a submitted document is blurry, a scan shows evidence of tampering, etc. Supply some details in the error message to make sure the user knows how to correct the issues. */
export interface SetPassportDataErrorsParams {
  /** User identifier */
  readonly userId: number;
  /** A JSON-serialized Array describing the errors */
  readonly errors: ReadonlyArray<Types.PassportElementError>;
}
export const SetPassportDataErrorsParams: Schema.Codec<SetPassportDataErrorsParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { user_id: "userId" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  user_id: Schema.Int,
    errors: Schema.Array(Types.PassportElementError),
  });
  const decoded = Schema.declare<SetPassportDataErrorsParams>((input): input is SetPassportDataErrorsParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const setPassportDataErrors = callMethod({
  method: "setPassportDataErrors",
  params: SetPassportDataErrorsParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Literal(true)),
  retrySafe: true,
});

/** Use this method to change the list of emoji assigned to a regular or custom emoji sticker. The sticker must belong to a sticker set created by the bot. Returns True on success. */
export interface SetStickerEmojiListParams {
  /** File identifier of the sticker */
  readonly sticker: string;
  /** A JSON-serialized list of 1-20 emoji associated with the sticker */
  readonly emojiList: ReadonlyArray<string>;
}
export const SetStickerEmojiListParams: Schema.Codec<SetStickerEmojiListParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { emoji_list: "emojiList" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  sticker: Schema.String,
    emoji_list: Schema.Array(Schema.String),
  });
  const decoded = Schema.declare<SetStickerEmojiListParams>((input): input is SetStickerEmojiListParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const setStickerEmojiList = callMethod({
  method: "setStickerEmojiList",
  params: SetStickerEmojiListParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Literal(true)),
  retrySafe: true,
});

/** Use this method to change search keywords assigned to a regular or custom emoji sticker. The sticker must belong to a sticker set created by the bot. Returns True on success. */
export interface SetStickerKeywordsParams {
  /** File identifier of the sticker */
  readonly sticker: string;
  /** A JSON-serialized list of 0-20 search keywords for the sticker with total length of up to 64 characters */
  readonly keywords?: ReadonlyArray<string> | undefined;
}
export const SetStickerKeywordsParams: Schema.Codec<SetStickerKeywordsParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => Schema.Struct({
  sticker: Schema.String,
  keywords: Schema.optional(Schema.Array(Schema.String)),
}));

export const setStickerKeywords = callMethod({
  method: "setStickerKeywords",
  params: SetStickerKeywordsParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Literal(true)),
  retrySafe: true,
});

/** Use this method to change the mask position of a mask sticker. The sticker must belong to a sticker set that was created by the bot. Returns True on success. */
export interface SetStickerMaskPositionParams {
  /** File identifier of the sticker */
  readonly sticker: string;
  /** A JSON-serialized object with the position where the mask should be placed on faces. Omit the parameter to remove the mask position. */
  readonly maskPosition?: Types.MaskPosition | undefined;
}
export const SetStickerMaskPositionParams: Schema.Codec<SetStickerMaskPositionParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { mask_position: "maskPosition" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  sticker: Schema.String,
    mask_position: Schema.optional(Types.MaskPosition),
  });
  const decoded = Schema.declare<SetStickerMaskPositionParams>((input): input is SetStickerMaskPositionParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const setStickerMaskPosition = callMethod({
  method: "setStickerMaskPosition",
  params: SetStickerMaskPositionParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Literal(true)),
  retrySafe: true,
});

/** Use this method to move a sticker in a set created by the bot to a specific position. Returns True on success. */
export interface SetStickerPositionInSetParams {
  /** File identifier of the sticker */
  readonly sticker: string;
  /** New sticker position in the set, zero-based */
  readonly position: number;
}
export const SetStickerPositionInSetParams: Schema.Codec<SetStickerPositionInSetParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => Schema.Struct({
  sticker: Schema.String,
  position: Schema.Int,
}));

export const setStickerPositionInSet = callMethod({
  method: "setStickerPositionInSet",
  params: SetStickerPositionInSetParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Literal(true)),
  retrySafe: true,
});

/** Use this method to set the thumbnail of a regular or mask sticker set. The format of the thumbnail file must match the format of the stickers in the set. Returns True on success. */
export interface SetStickerSetThumbnailParams {
  /** Sticker set name */
  readonly name: string;
  /** User identifier of the sticker set owner */
  readonly userId: number;
  /** A .WEBP or .PNG image with the thumbnail, must be up to 128 kilobytes in size and have a width and height of exactly 100px, or a .TGS animation with a thumbnail up to 32 kilobytes in size (see https://core.telegram.org/stickers#animation-requirements for animated sticker technical requirements), or a .WEBM video with the thumbnail up to 32 kilobytes in size; see https://core.telegram.org/stickers#video-requirements for video sticker technical requirements. Pass a file_id as a String to send a file that already exists on the Telegram servers, pass an HTTP URL as a String for Telegram to get a file from the Internet, or upload a new one using multipart/form-data. More information on Sending Files ». Animated and video sticker set thumbnails can't be uploaded via HTTP URL. If omitted, then the thumbnail is dropped and the first sticker is used as the thumbnail. */
  readonly thumbnail?: Types.InputFile | string | undefined;
  /** Format of the thumbnail, must be one of “static” for a .WEBP or .PNG image, “animated” for a .TGS animation, or “video” for a .WEBM video */
  readonly format: Types.StickerFormat;
}
export const SetStickerSetThumbnailParams: Schema.Codec<SetStickerSetThumbnailParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { user_id: "userId" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  name: Schema.String,
    user_id: Schema.Int,
    thumbnail: Schema.optional(Schema.Union([Types.InputFile, Schema.String])),
    format: Types.StickerFormat,
  });
  const decoded = Schema.declare<SetStickerSetThumbnailParams>((input): input is SetStickerSetThumbnailParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const setStickerSetThumbnail = callMethod({
  method: "setStickerSetThumbnail",
  params: SetStickerSetThumbnailParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Literal(true)),
  retrySafe: true,
});

/** Use this method to set the title of a created sticker set. Returns True on success. */
export interface SetStickerSetTitleParams {
  /** Sticker set name */
  readonly name: string;
  /** Sticker set title, 1-64 characters */
  readonly title: string;
}
export const SetStickerSetTitleParams: Schema.Codec<SetStickerSetTitleParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => Schema.Struct({
  name: Schema.String,
  title: Schema.String,
}));

export const setStickerSetTitle = callMethod({
  method: "setStickerSetTitle",
  params: SetStickerSetTitleParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Literal(true)),
  retrySafe: true,
});

/** Changes the emoji status for a given user that previously allowed the bot to manage their emoji status via the Mini App method requestEmojiStatusAccess. Returns True on success. */
export interface SetUserEmojiStatusParams {
  /** Unique identifier of the target user */
  readonly userId: number;
  /** Custom emoji identifier of the emoji status to set. Pass an empty string to remove the status. */
  readonly emojiStatusCustomEmojiId?: string | undefined;
  /** Expiration date of the emoji status, if any */
  readonly emojiStatusExpirationDate?: number | undefined;
}
export const SetUserEmojiStatusParams: Schema.Codec<SetUserEmojiStatusParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { user_id: "userId", emoji_status_custom_emoji_id: "emojiStatusCustomEmojiId", emoji_status_expiration_date: "emojiStatusExpirationDate" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  user_id: Schema.Int,
    emoji_status_custom_emoji_id: Schema.optional(Schema.String),
    emoji_status_expiration_date: Schema.optional(Schema.Int),
  });
  const decoded = Schema.declare<SetUserEmojiStatusParams>((input): input is SetUserEmojiStatusParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const setUserEmojiStatus = callMethod({
  method: "setUserEmojiStatus",
  params: SetUserEmojiStatusParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Literal(true)),
  retrySafe: true,
});

/** Use this method to specify a URL and receive incoming updates via an outgoing webhook. Whenever there is an update for the bot, we will send an HTTPS POST request to the specified URL, containing a JSON-serialized Update. In case of an unsuccessful request (a request with response HTTP status code different from 2XY), we will repeat the request and give up after a reasonable amount of attempts. Returns True on success. If you'd like to make sure that the webhook was set by you, you can specify secret data in the parameter secret_token. If specified, the request will contain a header “X-Telegram-Bot-Api-Secret-Token” with the secret token as content. */
export interface SetWebhookParams {
  /** HTTPS URL to send updates to. Use an empty string to remove webhook integration. */
  readonly url: string;
  /** Upload your public key certificate so that the root certificate in use can be checked. See our self-signed guide for details. */
  readonly certificate?: Types.InputFile | undefined;
  /** The fixed IP address which will be used to send webhook requests instead of the IP address resolved through DNS */
  readonly ipAddress?: string | undefined;
  /** The maximum allowed number of simultaneous HTTPS connections to the webhook for update delivery, 1-100. Defaults to 40. Use lower values to limit the load on your bot's server, and higher values to increase your bot's throughput. */
  readonly maxConnections?: number | undefined;
  /** A JSON-serialized list of the update types you want your bot to receive. For example, specify ["message", "edited_channel_post", "callback_query"] to only receive updates of these types. See Update for a complete list of available update types. Specify an empty list to receive all update types except chat_member, message_reaction, and message_reaction_count (default). If not specified, the previous setting will be used.
Please note that this parameter doesn't affect updates created before the call to the setWebhook, so unwanted updates may be received for a short period of time. */
  readonly allowedUpdates?: ReadonlyArray<Types.UpdateType> | undefined;
  /** Pass True to drop all pending updates */
  readonly dropPendingUpdates?: boolean | undefined;
  /** A secret token to be sent in a header “X-Telegram-Bot-Api-Secret-Token” in every webhook request, 1-256 characters. Only characters A-Z, a-z, 0-9, _ and - are allowed. The header is useful to ensure that the request comes from a webhook set by you. */
  readonly secretToken?: string | undefined;
}
export const SetWebhookParams: Schema.Codec<SetWebhookParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { ip_address: "ipAddress", max_connections: "maxConnections", allowed_updates: "allowedUpdates", drop_pending_updates: "dropPendingUpdates", secret_token: "secretToken" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  url: Schema.String,
    certificate: Schema.optional(Types.InputFile),
    ip_address: Schema.optional(Schema.String),
    max_connections: Schema.optional(Schema.Int),
    allowed_updates: Schema.optional(Schema.Array(Types.UpdateType)),
    drop_pending_updates: Schema.optional(Schema.Boolean),
    secret_token: Schema.optional(Schema.String),
  });
  const decoded = Schema.declare<SetWebhookParams>((input): input is SetWebhookParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const setWebhook = callMethod({
  method: "setWebhook",
  params: SetWebhookParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Literal(true)),
  retrySafe: true,
});

/** Use this method to stop updating a live location message before live_period expires. On success, if the message is not an inline message, the edited Message is returned, otherwise True is returned. */
export interface StopMessageLiveLocationParams {
  /** Unique identifier of the business connection on behalf of which the message to be edited was sent */
  readonly businessConnectionId?: string | undefined;
  /** Required if inline_message_id is not specified. Unique identifier for the target chat or username of the target bot, supergroup or channel in the format @username. */
  readonly chatId?: number | string | undefined;
  /** Required if inline_message_id is not specified. Identifier of the message with live location to stop. */
  readonly messageId?: number | undefined;
  /** Required if chat_id and message_id are not specified. Identifier of the inline message. */
  readonly inlineMessageId?: string | undefined;
  /** A JSON-serialized object for a new inline keyboard */
  readonly replyMarkup?: Types.InlineKeyboardMarkup | undefined;
}
export const StopMessageLiveLocationParams: Schema.Codec<StopMessageLiveLocationParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { business_connection_id: "businessConnectionId", chat_id: "chatId", message_id: "messageId", inline_message_id: "inlineMessageId", reply_markup: "replyMarkup" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  business_connection_id: Schema.optional(Schema.String),
    chat_id: Schema.optional(Schema.Union([Schema.Int, Schema.String])),
    message_id: Schema.optional(Schema.Int),
    inline_message_id: Schema.optional(Schema.String),
    reply_markup: Schema.optional(Types.InlineKeyboardMarkup),
  });
  const decoded = Schema.declare<StopMessageLiveLocationParams>((input): input is StopMessageLiveLocationParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const stopMessageLiveLocation = callMethod({
  method: "stopMessageLiveLocation",
  params: StopMessageLiveLocationParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Union([Types.Message, Schema.Literal(true)])),
  retrySafe: true,
});

/** Use this method to stop a poll which was sent by the bot. On success, the stopped Poll is returned. */
export interface StopPollParams {
  /** Unique identifier of the business connection on behalf of which the message to be edited was sent */
  readonly businessConnectionId?: string | undefined;
  /** Unique identifier for the target chat or username of the target bot, supergroup or channel in the format @username */
  readonly chatId: number | string;
  /** Identifier of the original message with the poll */
  readonly messageId: number;
  /** A JSON-serialized object for a new message inline keyboard */
  readonly replyMarkup?: Types.InlineKeyboardMarkup | undefined;
}
export const StopPollParams: Schema.Codec<StopPollParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { business_connection_id: "businessConnectionId", chat_id: "chatId", message_id: "messageId", reply_markup: "replyMarkup" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  business_connection_id: Schema.optional(Schema.String),
    chat_id: Schema.Union([Schema.Int, Schema.String]),
    message_id: Schema.Int,
    reply_markup: Schema.optional(Types.InlineKeyboardMarkup),
  });
  const decoded = Schema.declare<StopPollParams>((input): input is StopPollParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const stopPoll = callMethod({
  method: "stopPoll",
  params: StopPollParams,
  rateLimit: "none",
  result: Schema.suspend(() => Types.Poll),
  retrySafe: true,
});

/** Transfers Telegram Stars from the business account balance to the bot's balance. Requires the can_transfer_stars business bot right. Returns True on success. */
export interface TransferBusinessAccountStarsParams {
  /** Unique identifier of the business connection */
  readonly businessConnectionId: string;
  /** Number of Telegram Stars to transfer; 1-10000 */
  readonly starCount: number;
}
export const TransferBusinessAccountStarsParams: Schema.Codec<TransferBusinessAccountStarsParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { business_connection_id: "businessConnectionId", star_count: "starCount" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  business_connection_id: Schema.String,
    star_count: Schema.Int,
  });
  const decoded = Schema.declare<TransferBusinessAccountStarsParams>((input): input is TransferBusinessAccountStarsParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const transferBusinessAccountStars = callMethod({
  method: "transferBusinessAccountStars",
  params: TransferBusinessAccountStarsParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Literal(true)),
  retrySafe: false,
});

/** Transfers an owned unique gift to another user. Requires the can_transfer_and_upgrade_gifts business bot right. Requires can_transfer_stars business bot right if the transfer is paid. Returns True on success. */
export interface TransferGiftParams {
  /** Unique identifier of the business connection */
  readonly businessConnectionId: string;
  /** Unique identifier of the regular gift that should be transferred */
  readonly ownedGiftId: string;
  /** Unique identifier of the chat which will own the gift. The chat must be active in the last 24 hours. */
  readonly newOwnerChatId: number;
  /** The amount of Telegram Stars that will be paid for the transfer from the business account balance. If positive, then the can_transfer_stars business bot right is required. */
  readonly starCount?: number | undefined;
}
export const TransferGiftParams: Schema.Codec<TransferGiftParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { business_connection_id: "businessConnectionId", owned_gift_id: "ownedGiftId", new_owner_chat_id: "newOwnerChatId", star_count: "starCount" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  business_connection_id: Schema.String,
    owned_gift_id: Schema.String,
    new_owner_chat_id: Schema.Int,
    star_count: Schema.optional(Schema.Int),
  });
  const decoded = Schema.declare<TransferGiftParams>((input): input is TransferGiftParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const transferGift = callMethod({
  method: "transferGift",
  params: TransferGiftParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Literal(true)),
  retrySafe: true,
});

/** Use this method to unban a previously banned user in a supergroup or channel. The user will not return to the group or channel automatically, but will be able to join via link, etc. The bot must be an administrator for this to work. By default, this method guarantees that after the call the user is not a member of the chat, but will be able to join it. So if the user is a member of the chat they will also be removed from the chat. If you don't want this, use the parameter only_if_banned. Returns True on success. */
export interface UnbanChatMemberParams {
  /** Unique identifier for the target group or username of the target supergroup or channel in the format @username */
  readonly chatId: number | string;
  /** Unique identifier of the target user */
  readonly userId: number;
  /** Do nothing if the user is not banned */
  readonly onlyIfBanned?: boolean | undefined;
}
export const UnbanChatMemberParams: Schema.Codec<UnbanChatMemberParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { chat_id: "chatId", user_id: "userId", only_if_banned: "onlyIfBanned" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  chat_id: Schema.Union([Schema.Int, Schema.String]),
    user_id: Schema.Int,
    only_if_banned: Schema.optional(Schema.Boolean),
  });
  const decoded = Schema.declare<UnbanChatMemberParams>((input): input is UnbanChatMemberParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const unbanChatMember = callMethod({
  method: "unbanChatMember",
  params: UnbanChatMemberParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Literal(true)),
  retrySafe: true,
});

/** Use this method to unban a previously banned channel chat in a supergroup or channel. The bot must be an administrator for this to work and must have the appropriate administrator rights. Returns True on success. */
export interface UnbanChatSenderChatParams {
  /** Unique identifier for the target chat or username of the target channel in the format @username */
  readonly chatId: number | string;
  /** Unique identifier of the target sender chat */
  readonly senderChatId: number;
}
export const UnbanChatSenderChatParams: Schema.Codec<UnbanChatSenderChatParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { chat_id: "chatId", sender_chat_id: "senderChatId" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  chat_id: Schema.Union([Schema.Int, Schema.String]),
    sender_chat_id: Schema.Int,
  });
  const decoded = Schema.declare<UnbanChatSenderChatParams>((input): input is UnbanChatSenderChatParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const unbanChatSenderChat = callMethod({
  method: "unbanChatSenderChat",
  params: UnbanChatSenderChatParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Literal(true)),
  retrySafe: true,
});

/** Use this method to unhide the 'General' topic in a forum supergroup chat. The bot must be an administrator in the chat for this to work and must have the can_manage_topics administrator rights. Returns True on success. */
export interface UnhideGeneralForumTopicParams {
  /** Unique identifier for the target chat or username of the target supergroup in the format @username */
  readonly chatId: number | string;
}
export const UnhideGeneralForumTopicParams: Schema.Codec<UnhideGeneralForumTopicParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { chat_id: "chatId" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  chat_id: Schema.Union([Schema.Int, Schema.String]),
  });
  const decoded = Schema.declare<UnhideGeneralForumTopicParams>((input): input is UnhideGeneralForumTopicParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const unhideGeneralForumTopic = callMethod({
  method: "unhideGeneralForumTopic",
  params: UnhideGeneralForumTopicParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Literal(true)),
  retrySafe: true,
});

/** Use this method to clear the list of pinned messages in a chat. In private chats and channel direct messages chats, no additional rights are required to unpin all pinned messages. Conversely, the bot must be an administrator with the 'can_pin_messages' right or the 'can_edit_messages' right to unpin all pinned messages in groups and channels respectively. Returns True on success. */
export interface UnpinAllChatMessagesParams {
  /** Unique identifier for the target chat or username of the target channel in the format @username */
  readonly chatId: number | string;
}
export const UnpinAllChatMessagesParams: Schema.Codec<UnpinAllChatMessagesParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { chat_id: "chatId" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  chat_id: Schema.Union([Schema.Int, Schema.String]),
  });
  const decoded = Schema.declare<UnpinAllChatMessagesParams>((input): input is UnpinAllChatMessagesParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const unpinAllChatMessages = callMethod({
  method: "unpinAllChatMessages",
  params: UnpinAllChatMessagesParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Literal(true)),
  retrySafe: true,
});

/** Use this method to clear the list of pinned messages in a forum topic in a forum supergroup chat or a private chat with a user. In the case of a supergroup chat the bot must be an administrator in the chat for this to work and must have the can_pin_messages administrator right in the supergroup. Returns True on success. */
export interface UnpinAllForumTopicMessagesParams {
  /** Unique identifier for the target chat or username of the target supergroup in the format @username */
  readonly chatId: number | string;
  /** Unique identifier for the target message thread of the forum topic */
  readonly messageThreadId: number;
}
export const UnpinAllForumTopicMessagesParams: Schema.Codec<UnpinAllForumTopicMessagesParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { chat_id: "chatId", message_thread_id: "messageThreadId" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  chat_id: Schema.Union([Schema.Int, Schema.String]),
    message_thread_id: Schema.Int,
  });
  const decoded = Schema.declare<UnpinAllForumTopicMessagesParams>((input): input is UnpinAllForumTopicMessagesParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const unpinAllForumTopicMessages = callMethod({
  method: "unpinAllForumTopicMessages",
  params: UnpinAllForumTopicMessagesParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Literal(true)),
  retrySafe: true,
});

/** Use this method to clear the list of pinned messages in a General forum topic. The bot must be an administrator in the chat for this to work and must have the can_pin_messages administrator right in the supergroup. Returns True on success. */
export interface UnpinAllGeneralForumTopicMessagesParams {
  /** Unique identifier for the target chat or username of the target supergroup in the format @username */
  readonly chatId: number | string;
}
export const UnpinAllGeneralForumTopicMessagesParams: Schema.Codec<UnpinAllGeneralForumTopicMessagesParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { chat_id: "chatId" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  chat_id: Schema.Union([Schema.Int, Schema.String]),
  });
  const decoded = Schema.declare<UnpinAllGeneralForumTopicMessagesParams>((input): input is UnpinAllGeneralForumTopicMessagesParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const unpinAllGeneralForumTopicMessages = callMethod({
  method: "unpinAllGeneralForumTopicMessages",
  params: UnpinAllGeneralForumTopicMessagesParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Literal(true)),
  retrySafe: true,
});

/** Use this method to remove a message from the list of pinned messages in a chat. In private chats and channel direct messages chats, all messages can be unpinned. Conversely, the bot must be an administrator with the 'can_pin_messages' right or the 'can_edit_messages' right to unpin messages in groups and channels respectively. Returns True on success. */
export interface UnpinChatMessageParams {
  /** Unique identifier of the business connection on behalf of which the message will be unpinned */
  readonly businessConnectionId?: string | undefined;
  /** Unique identifier for the target chat or username of the target channel in the format @username */
  readonly chatId: number | string;
  /** Identifier of the message to unpin. Required if business_connection_id is specified. If not specified, the most recent pinned message (by sending date) will be unpinned. */
  readonly messageId?: number | undefined;
}
export const UnpinChatMessageParams: Schema.Codec<UnpinChatMessageParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { business_connection_id: "businessConnectionId", chat_id: "chatId", message_id: "messageId" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  business_connection_id: Schema.optional(Schema.String),
    chat_id: Schema.Union([Schema.Int, Schema.String]),
    message_id: Schema.optional(Schema.Int),
  });
  const decoded = Schema.declare<UnpinChatMessageParams>((input): input is UnpinChatMessageParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const unpinChatMessage = callMethod({
  method: "unpinChatMessage",
  params: UnpinChatMessageParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Literal(true)),
  retrySafe: true,
});

/** Upgrades a given regular gift to a unique gift. Requires the can_transfer_and_upgrade_gifts business bot right. Additionally requires the can_transfer_stars business bot right if the upgrade is paid. Returns True on success. */
export interface UpgradeGiftParams {
  /** Unique identifier of the business connection */
  readonly businessConnectionId: string;
  /** Unique identifier of the regular gift that should be upgraded to a unique one */
  readonly ownedGiftId: string;
  /** Pass True to keep the original gift text, sender and receiver in the upgraded gift */
  readonly keepOriginalDetails?: boolean | undefined;
  /** The amount of Telegram Stars that will be paid for the upgrade from the business account balance. If gift.prepaid_upgrade_star_count > 0, then pass 0, otherwise, the can_transfer_stars business bot right is required and gift.upgrade_star_count must be passed. */
  readonly starCount?: number | undefined;
}
export const UpgradeGiftParams: Schema.Codec<UpgradeGiftParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { business_connection_id: "businessConnectionId", owned_gift_id: "ownedGiftId", keep_original_details: "keepOriginalDetails", star_count: "starCount" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  business_connection_id: Schema.String,
    owned_gift_id: Schema.String,
    keep_original_details: Schema.optional(Schema.Boolean),
    star_count: Schema.optional(Schema.Int),
  });
  const decoded = Schema.declare<UpgradeGiftParams>((input): input is UpgradeGiftParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const upgradeGift = callMethod({
  method: "upgradeGift",
  params: UpgradeGiftParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Literal(true)),
  retrySafe: true,
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
export const UploadStickerFileParams: Schema.Codec<UploadStickerFileParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { user_id: "userId", sticker_format: "stickerFormat" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  user_id: Schema.Int,
    sticker: Types.InputFile,
    sticker_format: Types.StickerFormat,
  });
  const decoded = Schema.declare<UploadStickerFileParams>((input): input is UploadStickerFileParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const uploadStickerFile = callMethod({
  method: "uploadStickerFile",
  params: UploadStickerFileParams,
  rateLimit: "none",
  result: Schema.suspend(() => Types.File),
  retrySafe: false,
});

/** Verifies a chat on behalf of the organization which is represented by the bot. Returns True on success. */
export interface VerifyChatParams {
  /** Unique identifier for the target chat or username of the target bot, supergroup or channel in the format @username. Channel direct messages chats can't be verified. */
  readonly chatId: number | string;
  /** Custom description for the verification; 0-70 characters. Must be empty if the organization isn't allowed to provide a custom verification description. */
  readonly customDescription?: string | undefined;
}
export const VerifyChatParams: Schema.Codec<VerifyChatParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { chat_id: "chatId", custom_description: "customDescription" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  chat_id: Schema.Union([Schema.Int, Schema.String]),
    custom_description: Schema.optional(Schema.String),
  });
  const decoded = Schema.declare<VerifyChatParams>((input): input is VerifyChatParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const verifyChat = callMethod({
  method: "verifyChat",
  params: VerifyChatParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Literal(true)),
  retrySafe: true,
});

/** Verifies a user on behalf of the organization which is represented by the bot. Returns True on success. */
export interface VerifyUserParams {
  /** Unique identifier of the target user */
  readonly userId: number;
  /** Custom description for the verification; 0-70 characters. Must be empty if the organization isn't allowed to provide a custom verification description. */
  readonly customDescription?: string | undefined;
}
export const VerifyUserParams: Schema.Codec<VerifyUserParams, Readonly<Record<string, unknown>>> = Schema.suspend(() => {
  const publicKeys = { user_id: "userId", custom_description: "customDescription" } as const;
  const wireKeys = invertKeys(publicKeys);
  const encoded = Schema.Struct({
  user_id: Schema.Int,
    custom_description: Schema.optional(Schema.String),
  });
  const decoded = Schema.declare<VerifyUserParams>((input): input is VerifyUserParams => Predicate.isObject(input));
  return encoded.pipe(
    Schema.decodeTo(decoded, {
      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),
      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),
    }),
  );
});

export const verifyUser = callMethod({
  method: "verifyUser",
  params: VerifyUserParams,
  rateLimit: "none",
  result: Schema.suspend(() => Schema.Literal(true)),
  retrySafe: true,
});
