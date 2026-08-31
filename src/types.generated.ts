// Generated from bot-api/schema/sources/dofer/spec.json. Edit schema inputs or overrides, then regenerate.
import { Predicate, Schema, SchemaGetter, Struct } from "effect";

import { invertKeys } from "./internal/SchemaKeys.js";

/** Values of the type field that tell subtypes of BackgroundFill apart. */
export type BackgroundFillType = "solid" | "gradient" | "freeform_gradient";
export const BackgroundFillType: Schema.Codec<BackgroundFillType> = Schema.Literals(["solid", "gradient", "freeform_gradient"]);

/** Values of the type field that tell subtypes of BackgroundType apart. */
export type BackgroundTypeType = "fill" | "wallpaper" | "pattern" | "chat_theme";
export const BackgroundTypeType: Schema.Codec<BackgroundTypeType> = Schema.Literals(["fill", "wallpaper", "pattern", "chat_theme"]);

/** Values of the type field that tell subtypes of BotCommandScope apart. */
export type BotCommandScopeType = "default" | "all_private_chats" | "all_group_chats" | "all_chat_administrators" | "chat" | "chat_administrators" | "chat_member";
export const BotCommandScopeType: Schema.Codec<BotCommandScopeType> = Schema.Literals(["default", "all_private_chats", "all_group_chats", "all_chat_administrators", "chat", "chat_administrators", "chat_member"]);

/** Actions a bot can broadcast with sendChatAction. */
export type ChatAction = "typing" | "upload_photo" | "record_video" | "upload_video" | "record_voice" | "upload_voice" | "upload_document" | "choose_sticker" | "find_location" | "record_video_note" | "upload_video_note";
export const ChatAction: Schema.Codec<ChatAction> = Schema.Literals(["typing", "upload_photo", "record_video", "upload_video", "record_voice", "upload_voice", "upload_document", "choose_sticker", "find_location", "record_video_note", "upload_video_note"]);

/** Values of the source field that tell subtypes of ChatBoostSource apart. */
export type ChatBoostSourceSource = "premium" | "gift_code" | "giveaway";
export const ChatBoostSourceSource: Schema.Codec<ChatBoostSourceSource> = Schema.Literals(["premium", "gift_code", "giveaway"]);

/** Values of the status field that tell subtypes of ChatMember apart. */
export type ChatMemberStatus = "creator" | "administrator" | "member" | "restricted" | "left" | "kicked";
export const ChatMemberStatus: Schema.Codec<ChatMemberStatus> = Schema.Literals(["creator", "administrator", "member", "restricted", "left", "kicked"]);

/** Kinds of chat the type field can report. */
export type ChatType = "private" | "group" | "supergroup" | "channel";
export const ChatType: Schema.Codec<ChatType> = Schema.Literals(["private", "group", "supergroup", "channel"]);

/** Kinds of content and service event a Message can carry. */
export type ContentType = "text" | "rich_message" | "animation" | "audio" | "document" | "live_photo" | "paid_media" | "photo" | "sticker" | "story" | "video" | "video_note" | "voice" | "checklist" | "contact" | "dice" | "game" | "poll" | "venue" | "location" | "new_chat_members" | "left_chat_member" | "chat_owner_left" | "chat_owner_changed" | "new_chat_title" | "new_chat_photo" | "delete_chat_photo" | "group_chat_created" | "supergroup_chat_created" | "channel_chat_created" | "message_auto_delete_timer_changed" | "migrate_to_chat_id" | "migrate_from_chat_id" | "pinned_message" | "invoice" | "successful_payment" | "refunded_payment" | "users_shared" | "chat_shared" | "gift" | "unique_gift" | "gift_upgrade_sent" | "connected_website" | "write_access_allowed" | "passport_data" | "proximity_alert_triggered" | "boost_added" | "chat_background_set" | "checklist_tasks_done" | "checklist_tasks_added" | "community_chat_added" | "community_chat_joined" | "community_chat_removed" | "direct_message_price_changed" | "forum_topic_created" | "forum_topic_edited" | "forum_topic_closed" | "forum_topic_reopened" | "general_forum_topic_hidden" | "general_forum_topic_unhidden" | "giveaway_created" | "giveaway" | "giveaway_winners" | "giveaway_completed" | "managed_bot_created" | "paid_message_price_changed" | "poll_option_added" | "poll_option_deleted" | "suggested_post_approved" | "suggested_post_approval_failed" | "suggested_post_declined" | "suggested_post_paid" | "suggested_post_refunded" | "video_chat_scheduled" | "video_chat_started" | "video_chat_ended" | "video_chat_participants_invited" | "web_app_data";
export const ContentType: Schema.Codec<ContentType> = Schema.Literals(["text", "rich_message", "animation", "audio", "document", "live_photo", "paid_media", "photo", "sticker", "story", "video", "video_note", "voice", "checklist", "contact", "dice", "game", "poll", "venue", "location", "new_chat_members", "left_chat_member", "chat_owner_left", "chat_owner_changed", "new_chat_title", "new_chat_photo", "delete_chat_photo", "group_chat_created", "supergroup_chat_created", "channel_chat_created", "message_auto_delete_timer_changed", "migrate_to_chat_id", "migrate_from_chat_id", "pinned_message", "invoice", "successful_payment", "refunded_payment", "users_shared", "chat_shared", "gift", "unique_gift", "gift_upgrade_sent", "connected_website", "write_access_allowed", "passport_data", "proximity_alert_triggered", "boost_added", "chat_background_set", "checklist_tasks_done", "checklist_tasks_added", "community_chat_added", "community_chat_joined", "community_chat_removed", "direct_message_price_changed", "forum_topic_created", "forum_topic_edited", "forum_topic_closed", "forum_topic_reopened", "general_forum_topic_hidden", "general_forum_topic_unhidden", "giveaway_created", "giveaway", "giveaway_winners", "giveaway_completed", "managed_bot_created", "paid_message_price_changed", "poll_option_added", "poll_option_deleted", "suggested_post_approved", "suggested_post_approval_failed", "suggested_post_declined", "suggested_post_paid", "suggested_post_refunded", "video_chat_scheduled", "video_chat_started", "video_chat_ended", "video_chat_participants_invited", "web_app_data"]);

/** Emoji accepted by sendDice. The documentation carries them as images, not as text. */
export type DiceEmoji = "🎲" | "🎯" | "🏀" | "⚽" | "🎳" | "🎰";
export const DiceEmoji: Schema.Codec<DiceEmoji> = Schema.Literals(["🎲", "🎯", "🏀", "⚽", "🎳", "🎰"]);

/** Sections of Telegram Passport a bot can request. */
export type EncryptedPassportElementType = "personal_details" | "passport" | "driver_license" | "identity_card" | "internal_passport" | "address" | "utility_bill" | "bank_statement" | "rental_agreement" | "passport_registration" | "temporary_registration" | "phone_number" | "email";
export const EncryptedPassportElementType: Schema.Codec<EncryptedPassportElementType> = Schema.Literals(["personal_details", "passport", "driver_license", "identity_card", "internal_passport", "address", "utility_bill", "bank_statement", "rental_agreement", "passport_registration", "temporary_registration", "phone_number", "email"]);

/** Kinds of chat an inline query can come from. */
export type InlineQueryChatType = "sender" | "private" | "group" | "supergroup" | "channel";
export const InlineQueryChatType: Schema.Codec<InlineQueryChatType> = Schema.Literals(["sender", "private", "group", "supergroup", "channel"]);

/** Values of the type field that tell subtypes of InlineQueryResult apart. */
export type InlineQueryResultType = "audio" | "document" | "gif" | "mpeg4_gif" | "photo" | "sticker" | "video" | "voice" | "article" | "contact" | "game" | "location" | "venue";
export const InlineQueryResultType: Schema.Codec<InlineQueryResultType> = Schema.Literals(["audio", "document", "gif", "mpeg4_gif", "photo", "sticker", "video", "voice", "article", "contact", "game", "location", "venue"]);

/** Values of the type field that tell subtypes of InputMedia apart. */
export type InputMediaType = "animation" | "audio" | "document" | "live_photo" | "photo" | "video";
export const InputMediaType: Schema.Codec<InputMediaType> = Schema.Literals(["animation", "audio", "document", "live_photo", "photo", "video"]);

/** Values of the type field that tell subtypes of InputPaidMedia apart. */
export type InputPaidMediaType = "live_photo" | "photo" | "video";
export const InputPaidMediaType: Schema.Codec<InputPaidMediaType> = Schema.Literals(["live_photo", "photo", "video"]);

/** Values of the type field that tell subtypes of InputPollMedia apart. */
export type InputPollMediaType = "animation" | "audio" | "document" | "live_photo" | "location" | "photo" | "venue" | "video";
export const InputPollMediaType: Schema.Codec<InputPollMediaType> = Schema.Literals(["animation", "audio", "document", "live_photo", "location", "photo", "venue", "video"]);

/** Values of the type field that tell subtypes of InputPollOptionMedia apart. */
export type InputPollOptionMediaType = "animation" | "link" | "live_photo" | "location" | "photo" | "sticker" | "venue" | "video";
export const InputPollOptionMediaType: Schema.Codec<InputPollOptionMediaType> = Schema.Literals(["animation", "link", "live_photo", "location", "photo", "sticker", "venue", "video"]);

/** Values of the type field that tell subtypes of InputProfilePhoto apart. */
export type InputProfilePhotoType = "static" | "animated";
export const InputProfilePhotoType: Schema.Codec<InputProfilePhotoType> = Schema.Literals(["static", "animated"]);

/** Values of the type field that tell subtypes of InputRichBlock apart. */
export type InputRichBlockType = "paragraph" | "heading" | "pre" | "footer" | "divider" | "mathematical_expression" | "anchor" | "list" | "blockquote" | "expandable_blockquote" | "pullquote" | "collage" | "slideshow" | "table" | "details" | "map" | "buttons" | "animation" | "audio" | "document" | "photo" | "video" | "voice_note" | "thinking";
export const InputRichBlockType: Schema.Codec<InputRichBlockType> = Schema.Literals(["paragraph", "heading", "pre", "footer", "divider", "mathematical_expression", "anchor", "list", "blockquote", "expandable_blockquote", "pullquote", "collage", "slideshow", "table", "details", "map", "buttons", "animation", "audio", "document", "photo", "video", "voice_note", "thinking"]);

/** Values of the type field that tell subtypes of InputStoryContent apart. */
export type InputStoryContentType = "photo" | "video";
export const InputStoryContentType: Schema.Codec<InputStoryContentType> = Schema.Literals(["photo", "video"]);

/** Parts of a face a mask can be attached to. */
export type MaskPositionPoint = "forehead" | "eyes" | "mouth" | "chin";
export const MaskPositionPoint: Schema.Codec<MaskPositionPoint> = Schema.Literals(["forehead", "eyes", "mouth", "chin"]);

/** Values of the type field that tell subtypes of MenuButton apart. */
export type MenuButtonType = "commands" | "web_app" | "default";
export const MenuButtonType: Schema.Codec<MenuButtonType> = Schema.Literals(["commands", "web_app", "default"]);

/** Kinds of entity found in message text. */
export type MessageEntityType = "mention" | "hashtag" | "cashtag" | "bot_command" | "url" | "email" | "phone_number" | "bold" | "italic" | "underline" | "strikethrough" | "spoiler" | "blockquote" | "expandable_blockquote" | "code" | "pre" | "text_link" | "text_mention" | "custom_emoji" | "date_time";
export const MessageEntityType: Schema.Codec<MessageEntityType> = Schema.Literals(["mention", "hashtag", "cashtag", "bot_command", "url", "email", "phone_number", "bold", "italic", "underline", "strikethrough", "spoiler", "blockquote", "expandable_blockquote", "code", "pre", "text_link", "text_mention", "custom_emoji", "date_time"]);

/** Values of the type field that tell subtypes of MessageOrigin apart. */
export type MessageOriginType = "user" | "hidden_user" | "chat" | "channel";
export const MessageOriginType: Schema.Codec<MessageOriginType> = Schema.Literals(["user", "hidden_user", "chat", "channel"]);

/** Values of the type field that tell subtypes of OwnedGift apart. */
export type OwnedGiftType = "regular" | "unique";
export const OwnedGiftType: Schema.Codec<OwnedGiftType> = Schema.Literals(["regular", "unique"]);

/** Values of the type field that tell subtypes of PaidMedia apart. */
export type PaidMediaType = "live_photo" | "photo" | "preview" | "video";
export const PaidMediaType: Schema.Codec<PaidMediaType> = Schema.Literals(["live_photo", "photo", "preview", "video"]);

/** Formatting modes accepted by the parse_mode parameter. */
export type ParseMode = "HTML" | "Markdown" | "MarkdownV2";
export const ParseMode: Schema.Codec<ParseMode> = Schema.Literals(["HTML", "Markdown", "MarkdownV2"]);

/** Values of the source field that tell subtypes of PassportElementError apart. */
export type PassportElementErrorSource = "data" | "front_side" | "reverse_side" | "selfie" | "file" | "files" | "translation_file" | "translation_files" | "unspecified";
export const PassportElementErrorSource: Schema.Codec<PassportElementErrorSource> = Schema.Literals(["data", "front_side", "reverse_side", "selfie", "file", "files", "translation_file", "translation_files", "unspecified"]);

/** Kinds of poll. */
export type PollType = "regular" | "quiz";
export const PollType: Schema.Codec<PollType> = Schema.Literals(["regular", "quiz"]);

/** Values of the type field that tell subtypes of ReactionType apart. */
export type ReactionTypeType = "emoji" | "custom_emoji" | "paid";
export const ReactionTypeType: Schema.Codec<ReactionTypeType> = Schema.Literals(["emoji", "custom_emoji", "paid"]);

/** Values of the type field that tell subtypes of RevenueWithdrawalState apart. */
export type RevenueWithdrawalStateType = "pending" | "succeeded" | "failed";
export const RevenueWithdrawalStateType: Schema.Codec<RevenueWithdrawalStateType> = Schema.Literals(["pending", "succeeded", "failed"]);

/** Values of the type field that tell subtypes of RichBlock apart. */
export type RichBlockType = "paragraph" | "heading" | "pre" | "footer" | "divider" | "mathematical_expression" | "anchor" | "list" | "blockquote" | "expandable_blockquote" | "pullquote" | "collage" | "slideshow" | "table" | "details" | "map" | "buttons" | "animation" | "audio" | "document" | "photo" | "video" | "voice_note" | "thinking";
export const RichBlockType: Schema.Codec<RichBlockType> = Schema.Literals(["paragraph", "heading", "pre", "footer", "divider", "mathematical_expression", "anchor", "list", "blockquote", "expandable_blockquote", "pullquote", "collage", "slideshow", "table", "details", "map", "buttons", "animation", "audio", "document", "photo", "video", "voice_note", "thinking"]);

/** Values of the type field that tell subtypes of RichText apart. */
export type RichTextType = "bold" | "italic" | "underline" | "strikethrough" | "spoiler" | "date_time" | "text_mention" | "subscript" | "superscript" | "marked" | "code" | "custom_emoji" | "mathematical_expression" | "url" | "email_address" | "phone_number" | "bank_card_number" | "mention" | "hashtag" | "cashtag" | "bot_command" | "button" | "anchor" | "anchor_link" | "reference" | "reference_link";
export const RichTextType: Schema.Codec<RichTextType> = Schema.Literals(["bold", "italic", "underline", "strikethrough", "spoiler", "date_time", "text_mention", "subscript", "superscript", "marked", "code", "custom_emoji", "mathematical_expression", "url", "email_address", "phone_number", "bank_card_number", "mention", "hashtag", "cashtag", "bot_command", "button", "anchor", "anchor_link", "reference", "reference_link"]);

/** Formats accepted when a sticker is uploaded. */
export type StickerFormat = "static" | "animated" | "video";
export const StickerFormat: Schema.Codec<StickerFormat> = Schema.Literals(["static", "animated", "video"]);

/** Kinds of sticker. */
export type StickerType = "regular" | "mask" | "custom_emoji";
export const StickerType: Schema.Codec<StickerType> = Schema.Literals(["regular", "mask", "custom_emoji"]);

/** Values of the type field that tell subtypes of StoryAreaType apart. */
export type StoryAreaTypeType = "location" | "suggested_reaction" | "link" | "weather" | "unique_gift";
export const StoryAreaTypeType: Schema.Codec<StoryAreaTypeType> = Schema.Literals(["location", "suggested_reaction", "link", "weather", "unique_gift"]);

/** Values of the type field that tell subtypes of TransactionPartner apart. */
export type TransactionPartnerType = "user" | "chat" | "affiliate_program" | "fragment" | "telegram_ads" | "telegram_api" | "other";
export const TransactionPartnerType: Schema.Codec<TransactionPartnerType> = Schema.Literals(["user", "chat", "affiliate_program", "fragment", "telegram_ads", "telegram_api", "other"]);

/** Kinds of update a bot can receive — the optional fields of Update. */
export type UpdateType = "message" | "edited_message" | "channel_post" | "edited_channel_post" | "business_connection" | "business_message" | "edited_business_message" | "deleted_business_messages" | "guest_message" | "message_reaction" | "message_reaction_count" | "inline_query" | "chosen_inline_result" | "callback_query" | "shipping_query" | "pre_checkout_query" | "purchased_paid_media" | "poll" | "poll_answer" | "my_chat_member" | "chat_member" | "chat_join_request" | "chat_boost" | "removed_chat_boost" | "managed_bot" | "subscription" | "stopped_message_generation";
export const UpdateType: Schema.Codec<UpdateType> = Schema.Literals(["message", "edited_message", "channel_post", "edited_channel_post", "business_connection", "business_message", "edited_business_message", "deleted_business_messages", "guest_message", "message_reaction", "message_reaction_count", "inline_query", "chosen_inline_result", "callback_query", "shipping_query", "pre_checkout_query", "purchased_paid_media", "poll", "poll_answer", "my_chat_member", "chat_member", "chat_join_request", "chat_boost", "removed_chat_boost", "managed_bot", "subscription", "stopped_message_generation"]);

/** This object describes the types of gifts that can be gifted to a user or a chat. */
export interface AcceptedGiftTypes {
  /** True, if unlimited regular gifts are accepted */
  readonly unlimitedGifts: boolean;
  /** True, if limited regular gifts are accepted */
  readonly limitedGifts: boolean;
  /** True, if unique gifts or gifts that can be upgraded to unique for free are accepted */
  readonly uniqueGifts: boolean;
  /** True, if a Telegram Premium subscription is accepted */
  readonly premiumSubscription: boolean;
  /** True, if transfers of unique gifts from channels are accepted */
  readonly giftsFromChannels: boolean;
  readonly [key: string]: unknown;
}
const _AcceptedGiftTypesPublicKeys = { unlimited_gifts: "unlimitedGifts", limited_gifts: "limitedGifts", unique_gifts: "uniqueGifts", premium_subscription: "premiumSubscription", gifts_from_channels: "giftsFromChannels" } as const;
const _AcceptedGiftTypesWireKeys = invertKeys(_AcceptedGiftTypesPublicKeys);
const _AcceptedGiftTypesEncoded = Schema.StructWithRest(
  Schema.Struct({
    unlimited_gifts: Schema.Boolean,
    limited_gifts: Schema.Boolean,
    unique_gifts: Schema.Boolean,
    premium_subscription: Schema.Boolean,
    gifts_from_channels: Schema.Boolean,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _AcceptedGiftTypesDecoded = Schema.declare<AcceptedGiftTypes>((input): input is AcceptedGiftTypes => Predicate.isObject(input));
export const AcceptedGiftTypes: Schema.Codec<AcceptedGiftTypes, unknown> = _AcceptedGiftTypesEncoded.pipe(
  Schema.decodeTo(_AcceptedGiftTypesDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_AcceptedGiftTypesPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_AcceptedGiftTypesWireKeys)),
  }),
);

/** Contains information about the affiliate that received a commission via this transaction. */
export interface AffiliateInfo {
  /** Optional. The bot or the user that received an affiliate commission if it was received by a bot or a user */
  readonly affiliateUser?: User;
  /** Optional. The chat that received an affiliate commission if it was received by a chat */
  readonly affiliateChat?: Chat;
  /** The number of Telegram Stars received by the affiliate for each 1000 Telegram Stars received by the bot from referred users */
  readonly commissionPerMille: number;
  /** Integer amount of Telegram Stars received by the affiliate from the transaction, rounded to 0; can be negative for refunds */
  readonly amount: number;
  /** Optional. The number of 1/1000000000 shares of Telegram Stars received by the affiliate; from -999999999 to 999999999; can be negative for refunds */
  readonly nanostarAmount?: number;
  readonly [key: string]: unknown;
}
const _AffiliateInfoPublicKeys = { affiliate_user: "affiliateUser", affiliate_chat: "affiliateChat", commission_per_mille: "commissionPerMille", nanostar_amount: "nanostarAmount" } as const;
const _AffiliateInfoWireKeys = invertKeys(_AffiliateInfoPublicKeys);
const _AffiliateInfoEncoded = Schema.StructWithRest(
  Schema.Struct({
    affiliate_user: Schema.optionalKey(Schema.suspend((): Schema.Codec<User, unknown> => User)),
    affiliate_chat: Schema.optionalKey(Schema.suspend((): Schema.Codec<Chat, unknown> => Chat)),
    commission_per_mille: Schema.Int,
    amount: Schema.Int,
    nanostar_amount: Schema.optionalKey(Schema.Int),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _AffiliateInfoDecoded = Schema.declare<AffiliateInfo>((input): input is AffiliateInfo => Predicate.isObject(input));
export const AffiliateInfo: Schema.Codec<AffiliateInfo, unknown> = _AffiliateInfoEncoded.pipe(
  Schema.decodeTo(_AffiliateInfoDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_AffiliateInfoPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_AffiliateInfoWireKeys)),
  }),
);

/** This object represents an animation file (GIF or H.264/MPEG-4 AVC video without sound). */
export interface Animation {
  /** Identifier for this file, which can be used to download or reuse the file */
  readonly fileId: string;
  /** Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file. */
  readonly fileUniqueId: string;
  /** Video width as defined by the sender */
  readonly width: number;
  /** Video height as defined by the sender */
  readonly height: number;
  /** Duration of the video in seconds as defined by the sender */
  readonly duration: number;
  /** Optional. Animation thumbnail as defined by the sender */
  readonly thumbnail?: PhotoSize;
  /** Optional. Original animation filename as defined by the sender */
  readonly fileName?: string;
  /** Optional. MIME type of the file as defined by the sender */
  readonly mimeType?: string;
  /** Optional. File size in bytes. It can be bigger than 2^31 and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a signed 64-bit integer or double-precision float type are safe for storing this value. */
  readonly fileSize?: number;
  readonly [key: string]: unknown;
}
const _AnimationPublicKeys = { file_id: "fileId", file_unique_id: "fileUniqueId", file_name: "fileName", mime_type: "mimeType", file_size: "fileSize" } as const;
const _AnimationWireKeys = invertKeys(_AnimationPublicKeys);
const _AnimationEncoded = Schema.StructWithRest(
  Schema.Struct({
    file_id: Schema.String,
    file_unique_id: Schema.String,
    width: Schema.Int,
    height: Schema.Int,
    duration: Schema.Int,
    thumbnail: Schema.optionalKey(Schema.suspend((): Schema.Codec<PhotoSize, unknown> => PhotoSize)),
    file_name: Schema.optionalKey(Schema.String),
    mime_type: Schema.optionalKey(Schema.String),
    file_size: Schema.optionalKey(Schema.Int),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _AnimationDecoded = Schema.declare<Animation>((input): input is Animation => Predicate.isObject(input));
export const Animation: Schema.Codec<Animation, unknown> = _AnimationEncoded.pipe(
  Schema.decodeTo(_AnimationDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_AnimationPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_AnimationWireKeys)),
  }),
);

/** This object represents an audio file to be treated as music by the Telegram clients. */
export interface Audio {
  /** Identifier for this file, which can be used to download or reuse the file */
  readonly fileId: string;
  /** Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file. */
  readonly fileUniqueId: string;
  /** Duration of the audio in seconds as defined by the sender */
  readonly duration: number;
  /** Optional. Performer of the audio as defined by the sender or by audio tags */
  readonly performer?: string;
  /** Optional. Title of the audio as defined by the sender or by audio tags */
  readonly title?: string;
  /** Optional. Original filename as defined by the sender */
  readonly fileName?: string;
  /** Optional. MIME type of the file as defined by the sender */
  readonly mimeType?: string;
  /** Optional. File size in bytes. It can be bigger than 2^31 and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a signed 64-bit integer or double-precision float type are safe for storing this value. */
  readonly fileSize?: number;
  /** Optional. Thumbnail of the album cover to which the music file belongs */
  readonly thumbnail?: PhotoSize;
  readonly [key: string]: unknown;
}
const _AudioPublicKeys = { file_id: "fileId", file_unique_id: "fileUniqueId", file_name: "fileName", mime_type: "mimeType", file_size: "fileSize" } as const;
const _AudioWireKeys = invertKeys(_AudioPublicKeys);
const _AudioEncoded = Schema.StructWithRest(
  Schema.Struct({
    file_id: Schema.String,
    file_unique_id: Schema.String,
    duration: Schema.Int,
    performer: Schema.optionalKey(Schema.String),
    title: Schema.optionalKey(Schema.String),
    file_name: Schema.optionalKey(Schema.String),
    mime_type: Schema.optionalKey(Schema.String),
    file_size: Schema.optionalKey(Schema.Int),
    thumbnail: Schema.optionalKey(Schema.suspend((): Schema.Codec<PhotoSize, unknown> => PhotoSize)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _AudioDecoded = Schema.declare<Audio>((input): input is Audio => Predicate.isObject(input));
export const Audio: Schema.Codec<Audio, unknown> = _AudioEncoded.pipe(
  Schema.decodeTo(_AudioDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_AudioPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_AudioWireKeys)),
  }),
);

/** This object describes the way a background is filled based on the selected colors. Currently, it can be one of */
export type BackgroundFill = BackgroundFillSolid | BackgroundFillGradient | BackgroundFillFreeformGradient;
export const BackgroundFill: Schema.Codec<BackgroundFill, unknown> = Schema.Union([Schema.suspend((): Schema.Codec<BackgroundFillSolid, unknown> => BackgroundFillSolid), Schema.suspend((): Schema.Codec<BackgroundFillGradient, unknown> => BackgroundFillGradient), Schema.suspend((): Schema.Codec<BackgroundFillFreeformGradient, unknown> => BackgroundFillFreeformGradient)]);

/** The background is a freeform gradient that rotates after every message in the chat. */
export interface BackgroundFillFreeformGradient {
  /** Type of the background fill, always “freeform_gradient” */
  readonly type: "freeform_gradient";
  /** A list of the 3 or 4 base colors that are used to generate the freeform gradient in the RGB24 format */
  readonly colors: ReadonlyArray<number>;
  readonly [key: string]: unknown;
}
export const BackgroundFillFreeformGradient: Schema.Codec<BackgroundFillFreeformGradient, unknown> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("freeform_gradient"),
    colors: Schema.Array(Schema.Int),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** The background is a gradient fill. */
export interface BackgroundFillGradient {
  /** Type of the background fill, always “gradient” */
  readonly type: "gradient";
  /** Top color of the gradient in the RGB24 format */
  readonly topColor: number;
  /** Bottom color of the gradient in the RGB24 format */
  readonly bottomColor: number;
  /** Clockwise rotation angle of the background fill in degrees; 0-359 */
  readonly rotationAngle: number;
  readonly [key: string]: unknown;
}
const _BackgroundFillGradientPublicKeys = { top_color: "topColor", bottom_color: "bottomColor", rotation_angle: "rotationAngle" } as const;
const _BackgroundFillGradientWireKeys = invertKeys(_BackgroundFillGradientPublicKeys);
const _BackgroundFillGradientEncoded = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("gradient"),
    top_color: Schema.Int,
    bottom_color: Schema.Int,
    rotation_angle: Schema.Int,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _BackgroundFillGradientDecoded = Schema.declare<BackgroundFillGradient>((input): input is BackgroundFillGradient => Predicate.isObject(input));
export const BackgroundFillGradient: Schema.Codec<BackgroundFillGradient, unknown> = _BackgroundFillGradientEncoded.pipe(
  Schema.decodeTo(_BackgroundFillGradientDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_BackgroundFillGradientPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_BackgroundFillGradientWireKeys)),
  }),
);

/** The background is filled using the selected color. */
export interface BackgroundFillSolid {
  /** Type of the background fill, always “solid” */
  readonly type: "solid";
  /** The color of the background fill in the RGB24 format */
  readonly color: number;
  readonly [key: string]: unknown;
}
export const BackgroundFillSolid: Schema.Codec<BackgroundFillSolid, unknown> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("solid"),
    color: Schema.Int,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object describes the type of a background. Currently, it can be one of */
export type BackgroundType = BackgroundTypeFill | BackgroundTypeWallpaper | BackgroundTypePattern | BackgroundTypeChatTheme;
export const BackgroundType: Schema.Codec<BackgroundType, unknown> = Schema.Union([Schema.suspend((): Schema.Codec<BackgroundTypeFill, unknown> => BackgroundTypeFill), Schema.suspend((): Schema.Codec<BackgroundTypeWallpaper, unknown> => BackgroundTypeWallpaper), Schema.suspend((): Schema.Codec<BackgroundTypePattern, unknown> => BackgroundTypePattern), Schema.suspend((): Schema.Codec<BackgroundTypeChatTheme, unknown> => BackgroundTypeChatTheme)]);

/** The background is taken directly from a built-in chat theme. */
export interface BackgroundTypeChatTheme {
  /** Type of the background, always “chat_theme” */
  readonly type: "chat_theme";
  /** Name of the chat theme, which is usually an emoji */
  readonly themeName: string;
  readonly [key: string]: unknown;
}
const _BackgroundTypeChatThemePublicKeys = { theme_name: "themeName" } as const;
const _BackgroundTypeChatThemeWireKeys = invertKeys(_BackgroundTypeChatThemePublicKeys);
const _BackgroundTypeChatThemeEncoded = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("chat_theme"),
    theme_name: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _BackgroundTypeChatThemeDecoded = Schema.declare<BackgroundTypeChatTheme>((input): input is BackgroundTypeChatTheme => Predicate.isObject(input));
export const BackgroundTypeChatTheme: Schema.Codec<BackgroundTypeChatTheme, unknown> = _BackgroundTypeChatThemeEncoded.pipe(
  Schema.decodeTo(_BackgroundTypeChatThemeDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_BackgroundTypeChatThemePublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_BackgroundTypeChatThemeWireKeys)),
  }),
);

/** The background is automatically filled based on the selected colors. */
export interface BackgroundTypeFill {
  /** Type of the background, always “fill” */
  readonly type: "fill";
  /** The background fill */
  readonly fill: BackgroundFill;
  /** Dimming of the background in dark themes, as a percentage; 0-100 */
  readonly darkThemeDimming: number;
  readonly [key: string]: unknown;
}
const _BackgroundTypeFillPublicKeys = { dark_theme_dimming: "darkThemeDimming" } as const;
const _BackgroundTypeFillWireKeys = invertKeys(_BackgroundTypeFillPublicKeys);
const _BackgroundTypeFillEncoded = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("fill"),
    fill: Schema.suspend((): Schema.Codec<BackgroundFill, unknown> => BackgroundFill),
    dark_theme_dimming: Schema.Int,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _BackgroundTypeFillDecoded = Schema.declare<BackgroundTypeFill>((input): input is BackgroundTypeFill => Predicate.isObject(input));
export const BackgroundTypeFill: Schema.Codec<BackgroundTypeFill, unknown> = _BackgroundTypeFillEncoded.pipe(
  Schema.decodeTo(_BackgroundTypeFillDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_BackgroundTypeFillPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_BackgroundTypeFillWireKeys)),
  }),
);

/** The background is a .PNG or .TGV (gzipped subset of SVG with MIME type “application/x-tgwallpattern”) pattern to be combined with the background fill chosen by the user. */
export interface BackgroundTypePattern {
  /** Type of the background, always “pattern” */
  readonly type: "pattern";
  /** Document with the pattern */
  readonly document: Document;
  /** The background fill that is combined with the pattern */
  readonly fill: BackgroundFill;
  /** Intensity of the pattern when it is shown above the filled background; 0-100 */
  readonly intensity: number;
  /** Optional. True, if the background fill must be applied only to the pattern itself. All other pixels are black in this case. For dark themes only. */
  readonly isInverted?: true;
  /** Optional. True, if the background moves slightly when the device is tilted */
  readonly isMoving?: true;
  readonly [key: string]: unknown;
}
const _BackgroundTypePatternPublicKeys = { is_inverted: "isInverted", is_moving: "isMoving" } as const;
const _BackgroundTypePatternWireKeys = invertKeys(_BackgroundTypePatternPublicKeys);
const _BackgroundTypePatternEncoded = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("pattern"),
    document: Schema.suspend((): Schema.Codec<Document, unknown> => Document),
    fill: Schema.suspend((): Schema.Codec<BackgroundFill, unknown> => BackgroundFill),
    intensity: Schema.Int,
    is_inverted: Schema.optionalKey(Schema.Literal(true)),
    is_moving: Schema.optionalKey(Schema.Literal(true)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _BackgroundTypePatternDecoded = Schema.declare<BackgroundTypePattern>((input): input is BackgroundTypePattern => Predicate.isObject(input));
export const BackgroundTypePattern: Schema.Codec<BackgroundTypePattern, unknown> = _BackgroundTypePatternEncoded.pipe(
  Schema.decodeTo(_BackgroundTypePatternDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_BackgroundTypePatternPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_BackgroundTypePatternWireKeys)),
  }),
);

/** The background is a wallpaper in the JPEG format. */
export interface BackgroundTypeWallpaper {
  /** Type of the background, always “wallpaper” */
  readonly type: "wallpaper";
  /** Document with the wallpaper */
  readonly document: Document;
  /** Dimming of the background in dark themes, as a percentage; 0-100 */
  readonly darkThemeDimming: number;
  /** Optional. True, if the wallpaper is downscaled to fit in a 450x450 square and then box-blurred with radius 12 */
  readonly isBlurred?: true;
  /** Optional. True, if the background moves slightly when the device is tilted */
  readonly isMoving?: true;
  readonly [key: string]: unknown;
}
const _BackgroundTypeWallpaperPublicKeys = { dark_theme_dimming: "darkThemeDimming", is_blurred: "isBlurred", is_moving: "isMoving" } as const;
const _BackgroundTypeWallpaperWireKeys = invertKeys(_BackgroundTypeWallpaperPublicKeys);
const _BackgroundTypeWallpaperEncoded = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("wallpaper"),
    document: Schema.suspend((): Schema.Codec<Document, unknown> => Document),
    dark_theme_dimming: Schema.Int,
    is_blurred: Schema.optionalKey(Schema.Literal(true)),
    is_moving: Schema.optionalKey(Schema.Literal(true)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _BackgroundTypeWallpaperDecoded = Schema.declare<BackgroundTypeWallpaper>((input): input is BackgroundTypeWallpaper => Predicate.isObject(input));
export const BackgroundTypeWallpaper: Schema.Codec<BackgroundTypeWallpaper, unknown> = _BackgroundTypeWallpaperEncoded.pipe(
  Schema.decodeTo(_BackgroundTypeWallpaperDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_BackgroundTypeWallpaperPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_BackgroundTypeWallpaperWireKeys)),
  }),
);

/** Describes the birthdate of a user. */
export interface Birthdate {
  /** Day of the user's birth; 1-31 */
  readonly day: number;
  /** Month of the user's birth; 1-12 */
  readonly month: number;
  /** Optional. Year of the user's birth */
  readonly year?: number;
  readonly [key: string]: unknown;
}
export const Birthdate: Schema.Codec<Birthdate, unknown> = Schema.StructWithRest(
  Schema.Struct({
    day: Schema.Int,
    month: Schema.Int,
    year: Schema.optionalKey(Schema.Int),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object describes the access settings of a bot. */
export interface BotAccessSettings {
  /** True, if only selected users can access the bot. The bot's owner can always access it. */
  readonly isAccessRestricted: boolean;
  /** Optional. The list of other users who have access to the bot if the access is restricted */
  readonly addedUsers?: ReadonlyArray<User>;
  readonly [key: string]: unknown;
}
const _BotAccessSettingsPublicKeys = { is_access_restricted: "isAccessRestricted", added_users: "addedUsers" } as const;
const _BotAccessSettingsWireKeys = invertKeys(_BotAccessSettingsPublicKeys);
const _BotAccessSettingsEncoded = Schema.StructWithRest(
  Schema.Struct({
    is_access_restricted: Schema.Boolean,
    added_users: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<User, unknown> => User))),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _BotAccessSettingsDecoded = Schema.declare<BotAccessSettings>((input): input is BotAccessSettings => Predicate.isObject(input));
export const BotAccessSettings: Schema.Codec<BotAccessSettings, unknown> = _BotAccessSettingsEncoded.pipe(
  Schema.decodeTo(_BotAccessSettingsDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_BotAccessSettingsPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_BotAccessSettingsWireKeys)),
  }),
);

/** This object represents a bot command. */
export interface BotCommand {
  /** Text of the command; 1-32 characters. Can contain only lowercase English letters, digits and underscores. */
  readonly command: string;
  /** Description of the command; 1-256 characters */
  readonly description: string;
  /** Optional. True, if the command sends an ephemeral message, which can be seen only by the sender of the message and the bot */
  readonly isEphemeral?: boolean;
  readonly [key: string]: unknown;
}
const _BotCommandPublicKeys = { is_ephemeral: "isEphemeral" } as const;
const _BotCommandWireKeys = invertKeys(_BotCommandPublicKeys);
const _BotCommandEncoded = Schema.StructWithRest(
  Schema.Struct({
    command: Schema.String,
    description: Schema.String,
    is_ephemeral: Schema.optionalKey(Schema.Boolean),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _BotCommandDecoded = Schema.declare<BotCommand>((input): input is BotCommand => Predicate.isObject(input));
export const BotCommand: Schema.Codec<BotCommand, unknown> = _BotCommandEncoded.pipe(
  Schema.decodeTo(_BotCommandDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_BotCommandPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_BotCommandWireKeys)),
  }),
);

/** This object represents the scope to which bot commands are applied. Currently, the following 7 scopes are supported: */
export type BotCommandScope = BotCommandScopeDefault | BotCommandScopeAllPrivateChats | BotCommandScopeAllGroupChats | BotCommandScopeAllChatAdministrators | BotCommandScopeChat | BotCommandScopeChatAdministrators | BotCommandScopeChatMember;
export const BotCommandScope: Schema.Codec<BotCommandScope, unknown> = Schema.Union([Schema.suspend((): Schema.Codec<BotCommandScopeDefault, unknown> => BotCommandScopeDefault), Schema.suspend((): Schema.Codec<BotCommandScopeAllPrivateChats, unknown> => BotCommandScopeAllPrivateChats), Schema.suspend((): Schema.Codec<BotCommandScopeAllGroupChats, unknown> => BotCommandScopeAllGroupChats), Schema.suspend((): Schema.Codec<BotCommandScopeAllChatAdministrators, unknown> => BotCommandScopeAllChatAdministrators), Schema.suspend((): Schema.Codec<BotCommandScopeChat, unknown> => BotCommandScopeChat), Schema.suspend((): Schema.Codec<BotCommandScopeChatAdministrators, unknown> => BotCommandScopeChatAdministrators), Schema.suspend((): Schema.Codec<BotCommandScopeChatMember, unknown> => BotCommandScopeChatMember)]);

/** Represents the scope of bot commands, covering all group and supergroup chat administrators. */
export interface BotCommandScopeAllChatAdministrators {
  /** Scope type, must be all_chat_administrators */
  readonly type: "all_chat_administrators";
  readonly [key: string]: unknown;
}
export const BotCommandScopeAllChatAdministrators: Schema.Codec<BotCommandScopeAllChatAdministrators, unknown> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("all_chat_administrators"),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Represents the scope of bot commands, covering all group and supergroup chats. */
export interface BotCommandScopeAllGroupChats {
  /** Scope type, must be all_group_chats */
  readonly type: "all_group_chats";
  readonly [key: string]: unknown;
}
export const BotCommandScopeAllGroupChats: Schema.Codec<BotCommandScopeAllGroupChats, unknown> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("all_group_chats"),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Represents the scope of bot commands, covering all private chats. */
export interface BotCommandScopeAllPrivateChats {
  /** Scope type, must be all_private_chats */
  readonly type: "all_private_chats";
  readonly [key: string]: unknown;
}
export const BotCommandScopeAllPrivateChats: Schema.Codec<BotCommandScopeAllPrivateChats, unknown> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("all_private_chats"),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Represents the scope of bot commands, covering a specific chat. */
export interface BotCommandScopeChat {
  /** Scope type, must be chat */
  readonly type: "chat";
  /** Unique identifier for the target chat or username of the target supergroup in the format @username. Channel direct messages chats and channel chats aren't supported. */
  readonly chatId: number | string;
  readonly [key: string]: unknown;
}
const _BotCommandScopeChatPublicKeys = { chat_id: "chatId" } as const;
const _BotCommandScopeChatWireKeys = invertKeys(_BotCommandScopeChatPublicKeys);
const _BotCommandScopeChatEncoded = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("chat"),
    chat_id: Schema.Union([Schema.Int, Schema.String]),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _BotCommandScopeChatDecoded = Schema.declare<BotCommandScopeChat>((input): input is BotCommandScopeChat => Predicate.isObject(input));
export const BotCommandScopeChat: Schema.Codec<BotCommandScopeChat, unknown> = _BotCommandScopeChatEncoded.pipe(
  Schema.decodeTo(_BotCommandScopeChatDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_BotCommandScopeChatPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_BotCommandScopeChatWireKeys)),
  }),
);

/** Represents the scope of bot commands, covering all administrators of a specific group or supergroup chat. */
export interface BotCommandScopeChatAdministrators {
  /** Scope type, must be chat_administrators */
  readonly type: "chat_administrators";
  /** Unique identifier for the target chat or username of the target supergroup in the format @username. Channel direct messages chats and channel chats aren't supported. */
  readonly chatId: number | string;
  readonly [key: string]: unknown;
}
const _BotCommandScopeChatAdministratorsPublicKeys = { chat_id: "chatId" } as const;
const _BotCommandScopeChatAdministratorsWireKeys = invertKeys(_BotCommandScopeChatAdministratorsPublicKeys);
const _BotCommandScopeChatAdministratorsEncoded = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("chat_administrators"),
    chat_id: Schema.Union([Schema.Int, Schema.String]),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _BotCommandScopeChatAdministratorsDecoded = Schema.declare<BotCommandScopeChatAdministrators>((input): input is BotCommandScopeChatAdministrators => Predicate.isObject(input));
export const BotCommandScopeChatAdministrators: Schema.Codec<BotCommandScopeChatAdministrators, unknown> = _BotCommandScopeChatAdministratorsEncoded.pipe(
  Schema.decodeTo(_BotCommandScopeChatAdministratorsDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_BotCommandScopeChatAdministratorsPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_BotCommandScopeChatAdministratorsWireKeys)),
  }),
);

/** Represents the scope of bot commands, covering a specific member of a group or supergroup chat. */
export interface BotCommandScopeChatMember {
  /** Scope type, must be chat_member */
  readonly type: "chat_member";
  /** Unique identifier for the target chat or username of the target supergroup in the format @username. Channel direct messages chats and channel chats aren't supported. */
  readonly chatId: number | string;
  /** Unique identifier of the target user */
  readonly userId: number;
  readonly [key: string]: unknown;
}
const _BotCommandScopeChatMemberPublicKeys = { chat_id: "chatId", user_id: "userId" } as const;
const _BotCommandScopeChatMemberWireKeys = invertKeys(_BotCommandScopeChatMemberPublicKeys);
const _BotCommandScopeChatMemberEncoded = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("chat_member"),
    chat_id: Schema.Union([Schema.Int, Schema.String]),
    user_id: Schema.Int,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _BotCommandScopeChatMemberDecoded = Schema.declare<BotCommandScopeChatMember>((input): input is BotCommandScopeChatMember => Predicate.isObject(input));
export const BotCommandScopeChatMember: Schema.Codec<BotCommandScopeChatMember, unknown> = _BotCommandScopeChatMemberEncoded.pipe(
  Schema.decodeTo(_BotCommandScopeChatMemberDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_BotCommandScopeChatMemberPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_BotCommandScopeChatMemberWireKeys)),
  }),
);

/** Represents the default scope of bot commands. Default commands are used if no commands with a narrower scope are specified for the user. */
export interface BotCommandScopeDefault {
  /** Scope type, must be default */
  readonly type: "default";
  readonly [key: string]: unknown;
}
export const BotCommandScopeDefault: Schema.Codec<BotCommandScopeDefault, unknown> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("default"),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object represents the bot's description. */
export interface BotDescription {
  /** The bot's description */
  readonly description: string;
  readonly [key: string]: unknown;
}
export const BotDescription: Schema.Codec<BotDescription, unknown> = Schema.StructWithRest(
  Schema.Struct({
    description: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object represents the bot's name. */
export interface BotName {
  /** The bot's name */
  readonly name: string;
  readonly [key: string]: unknown;
}
export const BotName: Schema.Codec<BotName, unknown> = Schema.StructWithRest(
  Schema.Struct({
    name: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object represents the bot's short description. */
export interface BotShortDescription {
  /** The bot's short description */
  readonly shortDescription: string;
  readonly [key: string]: unknown;
}
const _BotShortDescriptionPublicKeys = { short_description: "shortDescription" } as const;
const _BotShortDescriptionWireKeys = invertKeys(_BotShortDescriptionPublicKeys);
const _BotShortDescriptionEncoded = Schema.StructWithRest(
  Schema.Struct({
    short_description: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _BotShortDescriptionDecoded = Schema.declare<BotShortDescription>((input): input is BotShortDescription => Predicate.isObject(input));
export const BotShortDescription: Schema.Codec<BotShortDescription, unknown> = _BotShortDescriptionEncoded.pipe(
  Schema.decodeTo(_BotShortDescriptionDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_BotShortDescriptionPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_BotShortDescriptionWireKeys)),
  }),
);

/** This object contains information about changes to a user payment subscription toward the current bot. */
export interface BotSubscriptionUpdated {
  /** User who subscribed for payments toward the bot */
  readonly user: User;
  /** Bot-specified invoice payload */
  readonly invoicePayload: string;
  /** The new state of the subscription. Currently, it can be one of “canceled” if the user canceled the subscription, “active” if the user re-enabled a previously canceled subscription, or “failed” if payment for the subscription failed. */
  readonly state: string;
  readonly [key: string]: unknown;
}
const _BotSubscriptionUpdatedPublicKeys = { invoice_payload: "invoicePayload" } as const;
const _BotSubscriptionUpdatedWireKeys = invertKeys(_BotSubscriptionUpdatedPublicKeys);
const _BotSubscriptionUpdatedEncoded = Schema.StructWithRest(
  Schema.Struct({
    user: Schema.suspend((): Schema.Codec<User, unknown> => User),
    invoice_payload: Schema.String,
    state: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _BotSubscriptionUpdatedDecoded = Schema.declare<BotSubscriptionUpdated>((input): input is BotSubscriptionUpdated => Predicate.isObject(input));
export const BotSubscriptionUpdated: Schema.Codec<BotSubscriptionUpdated, unknown> = _BotSubscriptionUpdatedEncoded.pipe(
  Schema.decodeTo(_BotSubscriptionUpdatedDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_BotSubscriptionUpdatedPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_BotSubscriptionUpdatedWireKeys)),
  }),
);

/** Represents the rights of a business bot. */
export interface BusinessBotRights {
  /** Optional. True, if the bot can send and edit messages in the private chats that had incoming messages in the last 24 hours */
  readonly canReply?: true;
  /** Optional. True, if the bot can mark incoming private messages as read */
  readonly canReadMessages?: true;
  /** Optional. True, if the bot can delete messages sent by the bot */
  readonly canDeleteSentMessages?: true;
  /** Optional. True, if the bot can delete all private messages in managed chats */
  readonly canDeleteAllMessages?: true;
  /** Optional. True, if the bot can edit the first and last name of the business account */
  readonly canEditName?: true;
  /** Optional. True, if the bot can edit the bio of the business account */
  readonly canEditBio?: true;
  /** Optional. True, if the bot can edit the profile photo of the business account */
  readonly canEditProfilePhoto?: true;
  /** Optional. True, if the bot can edit the username of the business account */
  readonly canEditUsername?: true;
  /** Optional. True, if the bot can change the privacy settings pertaining to gifts for the business account */
  readonly canChangeGiftSettings?: true;
  /** Optional. True, if the bot can view gifts and the amount of Telegram Stars owned by the business account */
  readonly canViewGiftsAndStars?: true;
  /** Optional. True, if the bot can convert regular gifts owned by the business account to Telegram Stars */
  readonly canConvertGiftsToStars?: true;
  /** Optional. True, if the bot can transfer and upgrade gifts owned by the business account */
  readonly canTransferAndUpgradeGifts?: true;
  /** Optional. True, if the bot can transfer Telegram Stars received by the business account to its own account, or use them to upgrade and transfer gifts */
  readonly canTransferStars?: true;
  /** Optional. True, if the bot can post, edit and delete stories on behalf of the business account */
  readonly canManageStories?: true;
  readonly [key: string]: unknown;
}
const _BusinessBotRightsPublicKeys = { can_reply: "canReply", can_read_messages: "canReadMessages", can_delete_sent_messages: "canDeleteSentMessages", can_delete_all_messages: "canDeleteAllMessages", can_edit_name: "canEditName", can_edit_bio: "canEditBio", can_edit_profile_photo: "canEditProfilePhoto", can_edit_username: "canEditUsername", can_change_gift_settings: "canChangeGiftSettings", can_view_gifts_and_stars: "canViewGiftsAndStars", can_convert_gifts_to_stars: "canConvertGiftsToStars", can_transfer_and_upgrade_gifts: "canTransferAndUpgradeGifts", can_transfer_stars: "canTransferStars", can_manage_stories: "canManageStories" } as const;
const _BusinessBotRightsWireKeys = invertKeys(_BusinessBotRightsPublicKeys);
const _BusinessBotRightsEncoded = Schema.StructWithRest(
  Schema.Struct({
    can_reply: Schema.optionalKey(Schema.Literal(true)),
    can_read_messages: Schema.optionalKey(Schema.Literal(true)),
    can_delete_sent_messages: Schema.optionalKey(Schema.Literal(true)),
    can_delete_all_messages: Schema.optionalKey(Schema.Literal(true)),
    can_edit_name: Schema.optionalKey(Schema.Literal(true)),
    can_edit_bio: Schema.optionalKey(Schema.Literal(true)),
    can_edit_profile_photo: Schema.optionalKey(Schema.Literal(true)),
    can_edit_username: Schema.optionalKey(Schema.Literal(true)),
    can_change_gift_settings: Schema.optionalKey(Schema.Literal(true)),
    can_view_gifts_and_stars: Schema.optionalKey(Schema.Literal(true)),
    can_convert_gifts_to_stars: Schema.optionalKey(Schema.Literal(true)),
    can_transfer_and_upgrade_gifts: Schema.optionalKey(Schema.Literal(true)),
    can_transfer_stars: Schema.optionalKey(Schema.Literal(true)),
    can_manage_stories: Schema.optionalKey(Schema.Literal(true)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _BusinessBotRightsDecoded = Schema.declare<BusinessBotRights>((input): input is BusinessBotRights => Predicate.isObject(input));
export const BusinessBotRights: Schema.Codec<BusinessBotRights, unknown> = _BusinessBotRightsEncoded.pipe(
  Schema.decodeTo(_BusinessBotRightsDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_BusinessBotRightsPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_BusinessBotRightsWireKeys)),
  }),
);

/** Describes the connection of the bot with a business account. */
export interface BusinessConnection {
  /** Unique identifier of the business connection */
  readonly id: string;
  /** Business account user that created the business connection */
  readonly user: User;
  /** Identifier of a private chat with the user who created the business connection. This number may have more than 32 significant bits and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a 64-bit integer or double-precision float type are safe for storing this identifier. */
  readonly userChatId: number;
  /** Date the connection was established in Unix time */
  readonly date: number;
  /** Optional. Rights of the business bot */
  readonly rights?: BusinessBotRights;
  /** True, if the connection is active */
  readonly isEnabled: boolean;
  readonly [key: string]: unknown;
}
const _BusinessConnectionPublicKeys = { user_chat_id: "userChatId", is_enabled: "isEnabled" } as const;
const _BusinessConnectionWireKeys = invertKeys(_BusinessConnectionPublicKeys);
const _BusinessConnectionEncoded = Schema.StructWithRest(
  Schema.Struct({
    id: Schema.String,
    user: Schema.suspend((): Schema.Codec<User, unknown> => User),
    user_chat_id: Schema.Int,
    date: Schema.Int,
    rights: Schema.optionalKey(Schema.suspend((): Schema.Codec<BusinessBotRights, unknown> => BusinessBotRights)),
    is_enabled: Schema.Boolean,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _BusinessConnectionDecoded = Schema.declare<BusinessConnection>((input): input is BusinessConnection => Predicate.isObject(input));
export const BusinessConnection: Schema.Codec<BusinessConnection, unknown> = _BusinessConnectionEncoded.pipe(
  Schema.decodeTo(_BusinessConnectionDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_BusinessConnectionPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_BusinessConnectionWireKeys)),
  }),
);

/** Contains information about the start page settings of a Telegram Business account. */
export interface BusinessIntro {
  /** Optional. Title text of the business intro */
  readonly title?: string;
  /** Optional. Message text of the business intro */
  readonly message?: string;
  /** Optional. Sticker of the business intro */
  readonly sticker?: Sticker;
  readonly [key: string]: unknown;
}
export const BusinessIntro: Schema.Codec<BusinessIntro, unknown> = Schema.StructWithRest(
  Schema.Struct({
    title: Schema.optionalKey(Schema.String),
    message: Schema.optionalKey(Schema.String),
    sticker: Schema.optionalKey(Schema.suspend((): Schema.Codec<Sticker, unknown> => Sticker)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Contains information about the location of a Telegram Business account. */
export interface BusinessLocation {
  /** Address of the business */
  readonly address: string;
  /** Optional. Location of the business */
  readonly location?: Location;
  readonly [key: string]: unknown;
}
export const BusinessLocation: Schema.Codec<BusinessLocation, unknown> = Schema.StructWithRest(
  Schema.Struct({
    address: Schema.String,
    location: Schema.optionalKey(Schema.suspend((): Schema.Codec<Location, unknown> => Location)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object is received when messages are deleted from a connected business account. */
export interface BusinessMessagesDeleted {
  /** Unique identifier of the business connection */
  readonly businessConnectionId: string;
  /** Information about a chat in the business account. The bot may not have access to the chat or the corresponding user. */
  readonly chat: Chat;
  /** The list of identifiers of deleted messages in the chat of the business account */
  readonly messageIds: ReadonlyArray<number>;
  readonly [key: string]: unknown;
}
const _BusinessMessagesDeletedPublicKeys = { business_connection_id: "businessConnectionId", message_ids: "messageIds" } as const;
const _BusinessMessagesDeletedWireKeys = invertKeys(_BusinessMessagesDeletedPublicKeys);
const _BusinessMessagesDeletedEncoded = Schema.StructWithRest(
  Schema.Struct({
    business_connection_id: Schema.String,
    chat: Schema.suspend((): Schema.Codec<Chat, unknown> => Chat),
    message_ids: Schema.Array(Schema.Int),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _BusinessMessagesDeletedDecoded = Schema.declare<BusinessMessagesDeleted>((input): input is BusinessMessagesDeleted => Predicate.isObject(input));
export const BusinessMessagesDeleted: Schema.Codec<BusinessMessagesDeleted, unknown> = _BusinessMessagesDeletedEncoded.pipe(
  Schema.decodeTo(_BusinessMessagesDeletedDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_BusinessMessagesDeletedPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_BusinessMessagesDeletedWireKeys)),
  }),
);

/** Describes the opening hours of a business. */
export interface BusinessOpeningHours {
  /** Unique name of the time zone for which the opening hours are defined */
  readonly timeZoneName: string;
  /** List of time intervals describing business opening hours */
  readonly openingHours: ReadonlyArray<BusinessOpeningHoursInterval>;
  readonly [key: string]: unknown;
}
const _BusinessOpeningHoursPublicKeys = { time_zone_name: "timeZoneName", opening_hours: "openingHours" } as const;
const _BusinessOpeningHoursWireKeys = invertKeys(_BusinessOpeningHoursPublicKeys);
const _BusinessOpeningHoursEncoded = Schema.StructWithRest(
  Schema.Struct({
    time_zone_name: Schema.String,
    opening_hours: Schema.Array(Schema.suspend((): Schema.Codec<BusinessOpeningHoursInterval, unknown> => BusinessOpeningHoursInterval)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _BusinessOpeningHoursDecoded = Schema.declare<BusinessOpeningHours>((input): input is BusinessOpeningHours => Predicate.isObject(input));
export const BusinessOpeningHours: Schema.Codec<BusinessOpeningHours, unknown> = _BusinessOpeningHoursEncoded.pipe(
  Schema.decodeTo(_BusinessOpeningHoursDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_BusinessOpeningHoursPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_BusinessOpeningHoursWireKeys)),
  }),
);

/** Describes an interval of time during which a business is open. */
export interface BusinessOpeningHoursInterval {
  /** The minute's sequence number in a week, starting on Monday, marking the start of the time interval during which the business is open; 0 - 7 * 24 * 60 */
  readonly openingMinute: number;
  /** The minute's sequence number in a week, starting on Monday, marking the end of the time interval during which the business is open; 0 - 8 * 24 * 60 */
  readonly closingMinute: number;
  readonly [key: string]: unknown;
}
const _BusinessOpeningHoursIntervalPublicKeys = { opening_minute: "openingMinute", closing_minute: "closingMinute" } as const;
const _BusinessOpeningHoursIntervalWireKeys = invertKeys(_BusinessOpeningHoursIntervalPublicKeys);
const _BusinessOpeningHoursIntervalEncoded = Schema.StructWithRest(
  Schema.Struct({
    opening_minute: Schema.Int,
    closing_minute: Schema.Int,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _BusinessOpeningHoursIntervalDecoded = Schema.declare<BusinessOpeningHoursInterval>((input): input is BusinessOpeningHoursInterval => Predicate.isObject(input));
export const BusinessOpeningHoursInterval: Schema.Codec<BusinessOpeningHoursInterval, unknown> = _BusinessOpeningHoursIntervalEncoded.pipe(
  Schema.decodeTo(_BusinessOpeningHoursIntervalDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_BusinessOpeningHoursIntervalPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_BusinessOpeningHoursIntervalWireKeys)),
  }),
);

/** A placeholder, currently holds no information. Use BotFather to set up your game. */
export interface CallbackGame {
  readonly [key: string]: unknown;
}
export const CallbackGame: Schema.Codec<CallbackGame, unknown> = Schema.StructWithRest(
  Schema.Struct({}),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object represents an incoming callback query from a callback button in an inline keyboard. If the button that originated the query was attached to a message sent by the bot, the field message will be present. If the button was attached to a message sent via the bot (in inline mode), the field inline_message_id will be present. Exactly one of the fields data or game_short_name will be present. */
export interface CallbackQuery {
  /** Unique identifier for this query */
  readonly id: string;
  /** Sender */
  readonly from: User;
  /** Optional. Message sent by the bot with the callback button that originated the query */
  readonly message?: MaybeInaccessibleMessage;
  /** Optional. Identifier of the message sent via the bot in inline mode, that originated the query */
  readonly inlineMessageId?: string;
  /** Global identifier, uniquely corresponding to the chat to which the message with the callback button was sent. Useful for high scores in games. */
  readonly chatInstance: string;
  /** Optional. Data associated with the callback button. Be aware that the message originated the query can contain no callback buttons with this data. */
  readonly data?: string;
  /** Optional. Short name of a Game to be returned, serves as the unique identifier for the game */
  readonly gameShortName?: string;
  readonly [key: string]: unknown;
}
const _CallbackQueryPublicKeys = { inline_message_id: "inlineMessageId", chat_instance: "chatInstance", game_short_name: "gameShortName" } as const;
const _CallbackQueryWireKeys = invertKeys(_CallbackQueryPublicKeys);
const _CallbackQueryEncoded = Schema.StructWithRest(
  Schema.Struct({
    id: Schema.String,
    from: Schema.suspend((): Schema.Codec<User, unknown> => User),
    message: Schema.optionalKey(Schema.suspend((): Schema.Codec<MaybeInaccessibleMessage, unknown> => MaybeInaccessibleMessage)),
    inline_message_id: Schema.optionalKey(Schema.String),
    chat_instance: Schema.String,
    data: Schema.optionalKey(Schema.String),
    game_short_name: Schema.optionalKey(Schema.String),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _CallbackQueryDecoded = Schema.declare<CallbackQuery>((input): input is CallbackQuery => Predicate.isObject(input));
export const CallbackQuery: Schema.Codec<CallbackQuery, unknown> = _CallbackQueryEncoded.pipe(
  Schema.decodeTo(_CallbackQueryDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_CallbackQueryPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_CallbackQueryWireKeys)),
  }),
);

/** This object represents a chat. */
export interface Chat {
  /** Unique identifier for this chat. This number may have more than 32 significant bits and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a signed 64-bit integer or double-precision float type are safe for storing this identifier. */
  readonly id: number;
  /** Type of the chat, can be either “private”, “group”, “supergroup” or “channel” */
  readonly type: ChatType;
  /** Optional. Title, for supergroups, channels and group chats */
  readonly title?: string;
  /** Optional. Username, for private chats, supergroups and channels if available */
  readonly username?: string;
  /** Optional. First name of the other party in a private chat */
  readonly firstName?: string;
  /** Optional. Last name of the other party in a private chat */
  readonly lastName?: string;
  /** Optional. True, if the supergroup chat is a forum (has topics enabled) */
  readonly isForum?: true;
  /** Optional. True, if the chat is the direct messages chat of a channel */
  readonly isDirectMessages?: true;
  readonly [key: string]: unknown;
}
const _ChatPublicKeys = { first_name: "firstName", last_name: "lastName", is_forum: "isForum", is_direct_messages: "isDirectMessages" } as const;
const _ChatWireKeys = invertKeys(_ChatPublicKeys);
const _ChatEncoded = Schema.StructWithRest(
  Schema.Struct({
    id: Schema.Int,
    type: Schema.suspend((): Schema.Codec<ChatType, unknown> => ChatType),
    title: Schema.optionalKey(Schema.String),
    username: Schema.optionalKey(Schema.String),
    first_name: Schema.optionalKey(Schema.String),
    last_name: Schema.optionalKey(Schema.String),
    is_forum: Schema.optionalKey(Schema.Literal(true)),
    is_direct_messages: Schema.optionalKey(Schema.Literal(true)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _ChatDecoded = Schema.declare<Chat>((input): input is Chat => Predicate.isObject(input));
export const Chat: Schema.Codec<Chat, unknown> = _ChatEncoded.pipe(
  Schema.decodeTo(_ChatDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_ChatPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_ChatWireKeys)),
  }),
);

/** Represents the rights of an administrator in a chat. */
export interface ChatAdministratorRights {
  /** True, if the user's presence in the chat is hidden */
  readonly isAnonymous: boolean;
  /** True, if the administrator can access the chat event log, get boost list, see hidden supergroup and channel members, report spam messages, ignore slow mode, and send messages to the chat without paying Telegram Stars. Implied by any other administrator privilege. */
  readonly canManageChat: boolean;
  /** True, if the administrator can delete messages of other users */
  readonly canDeleteMessages: boolean;
  /** True, if the administrator can manage video chats */
  readonly canManageVideoChats: boolean;
  /** True, if the administrator can restrict, ban or unban chat members, or access supergroup statistics */
  readonly canRestrictMembers: boolean;
  /** True, if the administrator can add new administrators with a subset of their own privileges or demote administrators that they have promoted, directly or indirectly (promoted by administrators that were appointed by the user) */
  readonly canPromoteMembers: boolean;
  /** True, if the user is allowed to change the chat title, photo and other settings */
  readonly canChangeInfo: boolean;
  /** True, if the user is allowed to invite new users to the chat */
  readonly canInviteUsers: boolean;
  /** True, if the administrator can post stories to the chat */
  readonly canPostStories: boolean;
  /** True, if the administrator can edit stories posted by other users, post stories to the chat page, pin chat stories, and access the chat's story archive */
  readonly canEditStories: boolean;
  /** True, if the administrator can delete stories posted by other users */
  readonly canDeleteStories: boolean;
  /** Optional. True, if the administrator can post messages in the channel, approve suggested posts, or access channel statistics; for channels only */
  readonly canPostMessages?: boolean;
  /** Optional. True, if the administrator can edit messages of other users and can pin messages; for channels only */
  readonly canEditMessages?: boolean;
  /** Optional. True, if the user is allowed to pin messages; for groups and supergroups only */
  readonly canPinMessages?: boolean;
  /** Optional. True, if the user is allowed to create, rename, close, and reopen forum topics; for supergroups only */
  readonly canManageTopics?: boolean;
  /** Optional. True, if the administrator can manage direct messages of the channel and decline suggested posts; for channels only */
  readonly canManageDirectMessages?: boolean;
  /** Optional. True, if the administrator can edit the tags of regular members; for groups and supergroups only */
  readonly canManageTags?: boolean;
  /** True, if the administrator can manage chat welcome messages or directly send them in the case of bots */
  readonly canSendWelcomeMessages: boolean;
  readonly [key: string]: unknown;
}
const _ChatAdministratorRightsPublicKeys = { is_anonymous: "isAnonymous", can_manage_chat: "canManageChat", can_delete_messages: "canDeleteMessages", can_manage_video_chats: "canManageVideoChats", can_restrict_members: "canRestrictMembers", can_promote_members: "canPromoteMembers", can_change_info: "canChangeInfo", can_invite_users: "canInviteUsers", can_post_stories: "canPostStories", can_edit_stories: "canEditStories", can_delete_stories: "canDeleteStories", can_post_messages: "canPostMessages", can_edit_messages: "canEditMessages", can_pin_messages: "canPinMessages", can_manage_topics: "canManageTopics", can_manage_direct_messages: "canManageDirectMessages", can_manage_tags: "canManageTags", can_send_welcome_messages: "canSendWelcomeMessages" } as const;
const _ChatAdministratorRightsWireKeys = invertKeys(_ChatAdministratorRightsPublicKeys);
const _ChatAdministratorRightsEncoded = Schema.StructWithRest(
  Schema.Struct({
    is_anonymous: Schema.Boolean,
    can_manage_chat: Schema.Boolean,
    can_delete_messages: Schema.Boolean,
    can_manage_video_chats: Schema.Boolean,
    can_restrict_members: Schema.Boolean,
    can_promote_members: Schema.Boolean,
    can_change_info: Schema.Boolean,
    can_invite_users: Schema.Boolean,
    can_post_stories: Schema.Boolean,
    can_edit_stories: Schema.Boolean,
    can_delete_stories: Schema.Boolean,
    can_post_messages: Schema.optionalKey(Schema.Boolean),
    can_edit_messages: Schema.optionalKey(Schema.Boolean),
    can_pin_messages: Schema.optionalKey(Schema.Boolean),
    can_manage_topics: Schema.optionalKey(Schema.Boolean),
    can_manage_direct_messages: Schema.optionalKey(Schema.Boolean),
    can_manage_tags: Schema.optionalKey(Schema.Boolean),
    can_send_welcome_messages: Schema.Boolean,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _ChatAdministratorRightsDecoded = Schema.declare<ChatAdministratorRights>((input): input is ChatAdministratorRights => Predicate.isObject(input));
export const ChatAdministratorRights: Schema.Codec<ChatAdministratorRights, unknown> = _ChatAdministratorRightsEncoded.pipe(
  Schema.decodeTo(_ChatAdministratorRightsDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_ChatAdministratorRightsPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_ChatAdministratorRightsWireKeys)),
  }),
);

/** This object represents a chat background. */
export interface ChatBackground {
  /** Type of the background */
  readonly type: BackgroundType;
  readonly [key: string]: unknown;
}
export const ChatBackground: Schema.Codec<ChatBackground, unknown> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.suspend((): Schema.Codec<BackgroundType, unknown> => BackgroundType),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object contains information about a chat boost. */
export interface ChatBoost {
  /** Unique identifier of the boost */
  readonly boostId: string;
  /** Point in time (Unix timestamp) when the chat was boosted */
  readonly addDate: number;
  /** Point in time (Unix timestamp) when the boost will automatically expire, unless the booster's Telegram Premium subscription is prolonged */
  readonly expirationDate: number;
  /** Source of the added boost */
  readonly source: ChatBoostSource;
  readonly [key: string]: unknown;
}
const _ChatBoostPublicKeys = { boost_id: "boostId", add_date: "addDate", expiration_date: "expirationDate" } as const;
const _ChatBoostWireKeys = invertKeys(_ChatBoostPublicKeys);
const _ChatBoostEncoded = Schema.StructWithRest(
  Schema.Struct({
    boost_id: Schema.String,
    add_date: Schema.Int,
    expiration_date: Schema.Int,
    source: Schema.suspend((): Schema.Codec<ChatBoostSource, unknown> => ChatBoostSource),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _ChatBoostDecoded = Schema.declare<ChatBoost>((input): input is ChatBoost => Predicate.isObject(input));
export const ChatBoost: Schema.Codec<ChatBoost, unknown> = _ChatBoostEncoded.pipe(
  Schema.decodeTo(_ChatBoostDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_ChatBoostPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_ChatBoostWireKeys)),
  }),
);

/** This object represents a service message about a user boosting a chat. */
export interface ChatBoostAdded {
  /** Number of boosts added by the user */
  readonly boostCount: number;
  readonly [key: string]: unknown;
}
const _ChatBoostAddedPublicKeys = { boost_count: "boostCount" } as const;
const _ChatBoostAddedWireKeys = invertKeys(_ChatBoostAddedPublicKeys);
const _ChatBoostAddedEncoded = Schema.StructWithRest(
  Schema.Struct({
    boost_count: Schema.Int,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _ChatBoostAddedDecoded = Schema.declare<ChatBoostAdded>((input): input is ChatBoostAdded => Predicate.isObject(input));
export const ChatBoostAdded: Schema.Codec<ChatBoostAdded, unknown> = _ChatBoostAddedEncoded.pipe(
  Schema.decodeTo(_ChatBoostAddedDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_ChatBoostAddedPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_ChatBoostAddedWireKeys)),
  }),
);

/** This object represents a boost removed from a chat. */
export interface ChatBoostRemoved {
  /** Chat which was boosted */
  readonly chat: Chat;
  /** Unique identifier of the boost */
  readonly boostId: string;
  /** Point in time (Unix timestamp) when the boost was removed */
  readonly removeDate: number;
  /** Source of the removed boost */
  readonly source: ChatBoostSource;
  readonly [key: string]: unknown;
}
const _ChatBoostRemovedPublicKeys = { boost_id: "boostId", remove_date: "removeDate" } as const;
const _ChatBoostRemovedWireKeys = invertKeys(_ChatBoostRemovedPublicKeys);
const _ChatBoostRemovedEncoded = Schema.StructWithRest(
  Schema.Struct({
    chat: Schema.suspend((): Schema.Codec<Chat, unknown> => Chat),
    boost_id: Schema.String,
    remove_date: Schema.Int,
    source: Schema.suspend((): Schema.Codec<ChatBoostSource, unknown> => ChatBoostSource),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _ChatBoostRemovedDecoded = Schema.declare<ChatBoostRemoved>((input): input is ChatBoostRemoved => Predicate.isObject(input));
export const ChatBoostRemoved: Schema.Codec<ChatBoostRemoved, unknown> = _ChatBoostRemovedEncoded.pipe(
  Schema.decodeTo(_ChatBoostRemovedDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_ChatBoostRemovedPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_ChatBoostRemovedWireKeys)),
  }),
);

/** This object describes the source of a chat boost. It can be one of */
export type ChatBoostSource = ChatBoostSourcePremium | ChatBoostSourceGiftCode | ChatBoostSourceGiveaway;
export const ChatBoostSource: Schema.Codec<ChatBoostSource, unknown> = Schema.Union([Schema.suspend((): Schema.Codec<ChatBoostSourcePremium, unknown> => ChatBoostSourcePremium), Schema.suspend((): Schema.Codec<ChatBoostSourceGiftCode, unknown> => ChatBoostSourceGiftCode), Schema.suspend((): Schema.Codec<ChatBoostSourceGiveaway, unknown> => ChatBoostSourceGiveaway)]);

/** The boost was obtained by the creation of Telegram Premium gift codes to boost a chat. Each such code boosts the chat 4 times for the duration of the corresponding Telegram Premium subscription. */
export interface ChatBoostSourceGiftCode {
  /** Source of the boost, always “gift_code” */
  readonly source: "gift_code";
  /** User for which the gift code was created */
  readonly user: User;
  readonly [key: string]: unknown;
}
export const ChatBoostSourceGiftCode: Schema.Codec<ChatBoostSourceGiftCode, unknown> = Schema.StructWithRest(
  Schema.Struct({
    source: Schema.Literal("gift_code"),
    user: Schema.suspend((): Schema.Codec<User, unknown> => User),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** The boost was obtained by the creation of a Telegram Premium or a Telegram Star giveaway. This boosts the chat 4 times for the duration of the corresponding Telegram Premium subscription for Telegram Premium giveaways and prize_star_count / 500 times for one year for Telegram Star giveaways. */
export interface ChatBoostSourceGiveaway {
  /** Source of the boost, always “giveaway” */
  readonly source: "giveaway";
  /** Identifier of a message in the chat with the giveaway; the message could have been deleted already. May be 0 if the message isn't sent yet. */
  readonly giveawayMessageId: number;
  /** Optional. User that won the prize in the giveaway if any; for Telegram Premium giveaways only */
  readonly user?: User;
  /** Optional. The number of Telegram Stars to be split between giveaway winners; for Telegram Star giveaways only */
  readonly prizeStarCount?: number;
  /** Optional. True, if the giveaway was completed, but there was no user to win the prize */
  readonly isUnclaimed?: true;
  readonly [key: string]: unknown;
}
const _ChatBoostSourceGiveawayPublicKeys = { giveaway_message_id: "giveawayMessageId", prize_star_count: "prizeStarCount", is_unclaimed: "isUnclaimed" } as const;
const _ChatBoostSourceGiveawayWireKeys = invertKeys(_ChatBoostSourceGiveawayPublicKeys);
const _ChatBoostSourceGiveawayEncoded = Schema.StructWithRest(
  Schema.Struct({
    source: Schema.Literal("giveaway"),
    giveaway_message_id: Schema.Int,
    user: Schema.optionalKey(Schema.suspend((): Schema.Codec<User, unknown> => User)),
    prize_star_count: Schema.optionalKey(Schema.Int),
    is_unclaimed: Schema.optionalKey(Schema.Literal(true)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _ChatBoostSourceGiveawayDecoded = Schema.declare<ChatBoostSourceGiveaway>((input): input is ChatBoostSourceGiveaway => Predicate.isObject(input));
export const ChatBoostSourceGiveaway: Schema.Codec<ChatBoostSourceGiveaway, unknown> = _ChatBoostSourceGiveawayEncoded.pipe(
  Schema.decodeTo(_ChatBoostSourceGiveawayDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_ChatBoostSourceGiveawayPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_ChatBoostSourceGiveawayWireKeys)),
  }),
);

/** The boost was obtained by subscribing to Telegram Premium or by gifting a Telegram Premium subscription to another user. */
export interface ChatBoostSourcePremium {
  /** Source of the boost, always “premium” */
  readonly source: "premium";
  /** User that boosted the chat */
  readonly user: User;
  readonly [key: string]: unknown;
}
export const ChatBoostSourcePremium: Schema.Codec<ChatBoostSourcePremium, unknown> = Schema.StructWithRest(
  Schema.Struct({
    source: Schema.Literal("premium"),
    user: Schema.suspend((): Schema.Codec<User, unknown> => User),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object represents a boost added to a chat or changed. */
export interface ChatBoostUpdated {
  /** Chat which was boosted */
  readonly chat: Chat;
  /** Information about the chat boost */
  readonly boost: ChatBoost;
  readonly [key: string]: unknown;
}
export const ChatBoostUpdated: Schema.Codec<ChatBoostUpdated, unknown> = Schema.StructWithRest(
  Schema.Struct({
    chat: Schema.suspend((): Schema.Codec<Chat, unknown> => Chat),
    boost: Schema.suspend((): Schema.Codec<ChatBoost, unknown> => ChatBoost),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object contains full information about a chat. */
export interface ChatFullInfo {
  /** Unique identifier for this chat. This number may have more than 32 significant bits and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a signed 64-bit integer or double-precision float type are safe for storing this identifier. */
  readonly id: number;
  /** Type of the chat, can be either “private”, “group”, “supergroup” or “channel” */
  readonly type: ChatType;
  /** Optional. Title, for supergroups, channels and group chats */
  readonly title?: string;
  /** Optional. Username, for private chats, supergroups and channels if available */
  readonly username?: string;
  /** Optional. First name of the other party in a private chat */
  readonly firstName?: string;
  /** Optional. Last name of the other party in a private chat */
  readonly lastName?: string;
  /** Optional. True, if the supergroup chat is a forum (has topics enabled) */
  readonly isForum?: true;
  /** Optional. True, if the chat is the direct messages chat of a channel */
  readonly isDirectMessages?: true;
  /** Identifier of the accent color for the chat name and backgrounds of the chat photo, reply header, and link preview. See accent colors for more details. */
  readonly accentColorId: number;
  /** The maximum number of reactions that can be set on a message in the chat */
  readonly maxReactionCount: number;
  /** Optional. Chat photo */
  readonly photo?: ChatPhoto;
  /** Optional. If non-empty, the list of all active chat usernames; for private chats, supergroups and channels */
  readonly activeUsernames?: ReadonlyArray<string>;
  /** Optional. For private chats, the date of birth of the user */
  readonly birthdate?: Birthdate;
  /** Optional. For private chats with business accounts, the intro of the business */
  readonly businessIntro?: BusinessIntro;
  /** Optional. For private chats with business accounts, the location of the business */
  readonly businessLocation?: BusinessLocation;
  /** Optional. For private chats with business accounts, the opening hours of the business */
  readonly businessOpeningHours?: BusinessOpeningHours;
  /** Optional. For private chats, the personal channel of the user */
  readonly personalChat?: Chat;
  /** Optional. Information about the corresponding channel chat; for direct messages chats only */
  readonly parentChat?: Chat;
  /** Optional. List of available reactions allowed in the chat. If omitted, then all emoji reactions are allowed. */
  readonly availableReactions?: ReadonlyArray<ReactionType>;
  /** Optional. Custom emoji identifier of the emoji chosen by the chat for the reply header and link preview background */
  readonly backgroundCustomEmojiId?: string;
  /** Optional. Identifier of the accent color for the chat's profile background. See profile accent colors for more details. */
  readonly profileAccentColorId?: number;
  /** Optional. Custom emoji identifier of the emoji chosen by the chat for its profile background */
  readonly profileBackgroundCustomEmojiId?: string;
  /** Optional. Custom emoji identifier of the emoji status of the chat or the other party in a private chat */
  readonly emojiStatusCustomEmojiId?: string;
  /** Optional. Expiration date of the emoji status of the chat or the other party in a private chat, in Unix time, if any */
  readonly emojiStatusExpirationDate?: number;
  /** Optional. Bio of the other party in a private chat */
  readonly bio?: string;
  /** Optional. True, if privacy settings of the other party in the private chat allows to use tg://user?id=<user_id> links only in chats with the user */
  readonly hasPrivateForwards?: true;
  /** Optional. True, if the privacy settings of the other party restrict sending voice and video note messages in the private chat */
  readonly hasRestrictedVoiceAndVideoMessages?: true;
  /** Optional. True, if users need to join the supergroup before they can send messages */
  readonly joinToSendMessages?: true;
  /** Optional. True, if all users directly joining the supergroup without using an invite link need to be approved by supergroup administrators */
  readonly joinByRequest?: true;
  /** Optional. Description, for groups, supergroups and channel chats */
  readonly description?: string;
  /** Optional. Primary invite link, for groups, supergroups and channel chats */
  readonly inviteLink?: string;
  /** Optional. The most recent pinned message (by sending date) */
  readonly pinnedMessage?: Message;
  /** Optional. Default chat member permissions, for groups and supergroups */
  readonly permissions?: ChatPermissions;
  /** Information about types of gifts that are accepted by the chat or by the corresponding user for private chats */
  readonly acceptedGiftTypes: AcceptedGiftTypes;
  /** Optional. True, if paid media messages can be sent or forwarded to the channel chat. The field is available only for channel chats. */
  readonly canSendPaidMedia?: true;
  /** Optional. For supergroups, the minimum allowed delay between consecutive messages sent by each unprivileged user; in seconds */
  readonly slowModeDelay?: number;
  /** Optional. For supergroups, the minimum number of boosts that a non-administrator user needs to add in order to ignore slow mode and chat permissions */
  readonly unrestrictBoostCount?: number;
  /** Optional. The time after which all messages sent to the chat will be automatically deleted; in seconds */
  readonly messageAutoDeleteTime?: number;
  /** Optional. True, if aggressive anti-spam checks are enabled in the supergroup. The field is only available to chat administrators. */
  readonly hasAggressiveAntiSpamEnabled?: true;
  /** Optional. True, if non-administrators can only get the list of bots and administrators in the chat */
  readonly hasHiddenMembers?: true;
  /** Optional. True, if messages from the chat can't be forwarded to other chats */
  readonly hasProtectedContent?: true;
  /** Optional. True, if new chat members will have access to old messages; available only to chat administrators */
  readonly hasVisibleHistory?: true;
  /** Optional. For supergroups, name of the group sticker set */
  readonly stickerSetName?: string;
  /** Optional. True, if the bot can change the group sticker set */
  readonly canSetStickerSet?: true;
  /** Optional. For supergroups, the name of the group's custom emoji sticker set. Custom emoji from this set can be used by all users and bots in the group. */
  readonly customEmojiStickerSetName?: string;
  /** Optional. Unique identifier for the linked chat, i.e. the discussion group identifier for a channel and vice versa; for supergroups and channel chats. This identifier may be greater than 32 bits and some programming languages may have difficulty/silent defects in interpreting it. But it is smaller than 52 bits, so a signed 64 bit integer or double-precision float type are safe for storing this identifier. */
  readonly linkedChatId?: number;
  /** Optional. For supergroups, the location to which the supergroup is connected */
  readonly location?: ChatLocation;
  /** Optional. For private chats, the rating of the user if any */
  readonly rating?: UserRating;
  /** Optional. For private chats, the first audio added to the profile of the user */
  readonly firstProfileAudio?: Audio;
  /** Optional. The color scheme based on a unique gift that must be used for the chat's name, message replies and link previews */
  readonly uniqueGiftColors?: UniqueGiftColors;
  /** Optional. The number of Telegram Stars a general user has to pay to send a message to the chat */
  readonly paidMessageStarCount?: number;
  /** Optional. The bot that processes join request queries in the chat. The field is only available to chat administrators. */
  readonly guardBot?: User;
  /** Optional. The Community to which the chat belongs */
  readonly community?: Community;
  readonly [key: string]: unknown;
}
const _ChatFullInfoPublicKeys = { first_name: "firstName", last_name: "lastName", is_forum: "isForum", is_direct_messages: "isDirectMessages", accent_color_id: "accentColorId", max_reaction_count: "maxReactionCount", active_usernames: "activeUsernames", business_intro: "businessIntro", business_location: "businessLocation", business_opening_hours: "businessOpeningHours", personal_chat: "personalChat", parent_chat: "parentChat", available_reactions: "availableReactions", background_custom_emoji_id: "backgroundCustomEmojiId", profile_accent_color_id: "profileAccentColorId", profile_background_custom_emoji_id: "profileBackgroundCustomEmojiId", emoji_status_custom_emoji_id: "emojiStatusCustomEmojiId", emoji_status_expiration_date: "emojiStatusExpirationDate", has_private_forwards: "hasPrivateForwards", has_restricted_voice_and_video_messages: "hasRestrictedVoiceAndVideoMessages", join_to_send_messages: "joinToSendMessages", join_by_request: "joinByRequest", invite_link: "inviteLink", pinned_message: "pinnedMessage", accepted_gift_types: "acceptedGiftTypes", can_send_paid_media: "canSendPaidMedia", slow_mode_delay: "slowModeDelay", unrestrict_boost_count: "unrestrictBoostCount", message_auto_delete_time: "messageAutoDeleteTime", has_aggressive_anti_spam_enabled: "hasAggressiveAntiSpamEnabled", has_hidden_members: "hasHiddenMembers", has_protected_content: "hasProtectedContent", has_visible_history: "hasVisibleHistory", sticker_set_name: "stickerSetName", can_set_sticker_set: "canSetStickerSet", custom_emoji_sticker_set_name: "customEmojiStickerSetName", linked_chat_id: "linkedChatId", first_profile_audio: "firstProfileAudio", unique_gift_colors: "uniqueGiftColors", paid_message_star_count: "paidMessageStarCount", guard_bot: "guardBot" } as const;
const _ChatFullInfoWireKeys = invertKeys(_ChatFullInfoPublicKeys);
const _ChatFullInfoEncoded = Schema.StructWithRest(
  Schema.Struct({
    id: Schema.Int,
    type: Schema.suspend((): Schema.Codec<ChatType, unknown> => ChatType),
    title: Schema.optionalKey(Schema.String),
    username: Schema.optionalKey(Schema.String),
    first_name: Schema.optionalKey(Schema.String),
    last_name: Schema.optionalKey(Schema.String),
    is_forum: Schema.optionalKey(Schema.Literal(true)),
    is_direct_messages: Schema.optionalKey(Schema.Literal(true)),
    accent_color_id: Schema.Int,
    max_reaction_count: Schema.Int,
    photo: Schema.optionalKey(Schema.suspend((): Schema.Codec<ChatPhoto, unknown> => ChatPhoto)),
    active_usernames: Schema.optionalKey(Schema.Array(Schema.String)),
    birthdate: Schema.optionalKey(Schema.suspend((): Schema.Codec<Birthdate, unknown> => Birthdate)),
    business_intro: Schema.optionalKey(Schema.suspend((): Schema.Codec<BusinessIntro, unknown> => BusinessIntro)),
    business_location: Schema.optionalKey(Schema.suspend((): Schema.Codec<BusinessLocation, unknown> => BusinessLocation)),
    business_opening_hours: Schema.optionalKey(Schema.suspend((): Schema.Codec<BusinessOpeningHours, unknown> => BusinessOpeningHours)),
    personal_chat: Schema.optionalKey(Schema.suspend((): Schema.Codec<Chat, unknown> => Chat)),
    parent_chat: Schema.optionalKey(Schema.suspend((): Schema.Codec<Chat, unknown> => Chat)),
    available_reactions: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<ReactionType, unknown> => ReactionType))),
    background_custom_emoji_id: Schema.optionalKey(Schema.String),
    profile_accent_color_id: Schema.optionalKey(Schema.Int),
    profile_background_custom_emoji_id: Schema.optionalKey(Schema.String),
    emoji_status_custom_emoji_id: Schema.optionalKey(Schema.String),
    emoji_status_expiration_date: Schema.optionalKey(Schema.Int),
    bio: Schema.optionalKey(Schema.String),
    has_private_forwards: Schema.optionalKey(Schema.Literal(true)),
    has_restricted_voice_and_video_messages: Schema.optionalKey(Schema.Literal(true)),
    join_to_send_messages: Schema.optionalKey(Schema.Literal(true)),
    join_by_request: Schema.optionalKey(Schema.Literal(true)),
    description: Schema.optionalKey(Schema.String),
    invite_link: Schema.optionalKey(Schema.String),
    pinned_message: Schema.optionalKey(Schema.suspend((): Schema.Codec<Message, unknown> => Message)),
    permissions: Schema.optionalKey(Schema.suspend((): Schema.Codec<ChatPermissions, unknown> => ChatPermissions)),
    accepted_gift_types: Schema.suspend((): Schema.Codec<AcceptedGiftTypes, unknown> => AcceptedGiftTypes),
    can_send_paid_media: Schema.optionalKey(Schema.Literal(true)),
    slow_mode_delay: Schema.optionalKey(Schema.Int),
    unrestrict_boost_count: Schema.optionalKey(Schema.Int),
    message_auto_delete_time: Schema.optionalKey(Schema.Int),
    has_aggressive_anti_spam_enabled: Schema.optionalKey(Schema.Literal(true)),
    has_hidden_members: Schema.optionalKey(Schema.Literal(true)),
    has_protected_content: Schema.optionalKey(Schema.Literal(true)),
    has_visible_history: Schema.optionalKey(Schema.Literal(true)),
    sticker_set_name: Schema.optionalKey(Schema.String),
    can_set_sticker_set: Schema.optionalKey(Schema.Literal(true)),
    custom_emoji_sticker_set_name: Schema.optionalKey(Schema.String),
    linked_chat_id: Schema.optionalKey(Schema.Int),
    location: Schema.optionalKey(Schema.suspend((): Schema.Codec<ChatLocation, unknown> => ChatLocation)),
    rating: Schema.optionalKey(Schema.suspend((): Schema.Codec<UserRating, unknown> => UserRating)),
    first_profile_audio: Schema.optionalKey(Schema.suspend((): Schema.Codec<Audio, unknown> => Audio)),
    unique_gift_colors: Schema.optionalKey(Schema.suspend((): Schema.Codec<UniqueGiftColors, unknown> => UniqueGiftColors)),
    paid_message_star_count: Schema.optionalKey(Schema.Int),
    guard_bot: Schema.optionalKey(Schema.suspend((): Schema.Codec<User, unknown> => User)),
    community: Schema.optionalKey(Schema.suspend((): Schema.Codec<Community, unknown> => Community)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _ChatFullInfoDecoded = Schema.declare<ChatFullInfo>((input): input is ChatFullInfo => Predicate.isObject(input));
export const ChatFullInfo: Schema.Codec<ChatFullInfo, unknown> = _ChatFullInfoEncoded.pipe(
  Schema.decodeTo(_ChatFullInfoDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_ChatFullInfoPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_ChatFullInfoWireKeys)),
  }),
);

/** Represents an invite link for a chat. */
export interface ChatInviteLink {
  /** The invite link. If the link was created by another chat administrator, then the second part of the link will be replaced with “…”. */
  readonly inviteLink: string;
  /** Creator of the link */
  readonly creator: User;
  /** True, if users joining the chat via the link need to be approved by chat administrators */
  readonly createsJoinRequest: boolean;
  /** True, if the link is primary */
  readonly isPrimary: boolean;
  /** True, if the link is revoked */
  readonly isRevoked: boolean;
  /** Optional. Invite link name */
  readonly name?: string;
  /** Optional. Point in time (Unix timestamp) when the link will expire or has been expired */
  readonly expireDate?: number;
  /** Optional. The maximum number of users that can be members of the chat simultaneously after joining the chat via this invite link; 1-99999 */
  readonly memberLimit?: number;
  /** Optional. Number of pending join requests created using this link */
  readonly pendingJoinRequestCount?: number;
  /** Optional. The number of seconds the subscription will be active for before the next payment */
  readonly subscriptionPeriod?: number;
  /** Optional. The amount of Telegram Stars a user must pay initially and after each subsequent subscription period to be a member of the chat using the link */
  readonly subscriptionPrice?: number;
  readonly [key: string]: unknown;
}
const _ChatInviteLinkPublicKeys = { invite_link: "inviteLink", creates_join_request: "createsJoinRequest", is_primary: "isPrimary", is_revoked: "isRevoked", expire_date: "expireDate", member_limit: "memberLimit", pending_join_request_count: "pendingJoinRequestCount", subscription_period: "subscriptionPeriod", subscription_price: "subscriptionPrice" } as const;
const _ChatInviteLinkWireKeys = invertKeys(_ChatInviteLinkPublicKeys);
const _ChatInviteLinkEncoded = Schema.StructWithRest(
  Schema.Struct({
    invite_link: Schema.String,
    creator: Schema.suspend((): Schema.Codec<User, unknown> => User),
    creates_join_request: Schema.Boolean,
    is_primary: Schema.Boolean,
    is_revoked: Schema.Boolean,
    name: Schema.optionalKey(Schema.String),
    expire_date: Schema.optionalKey(Schema.Int),
    member_limit: Schema.optionalKey(Schema.Int),
    pending_join_request_count: Schema.optionalKey(Schema.Int),
    subscription_period: Schema.optionalKey(Schema.Int),
    subscription_price: Schema.optionalKey(Schema.Int),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _ChatInviteLinkDecoded = Schema.declare<ChatInviteLink>((input): input is ChatInviteLink => Predicate.isObject(input));
export const ChatInviteLink: Schema.Codec<ChatInviteLink, unknown> = _ChatInviteLinkEncoded.pipe(
  Schema.decodeTo(_ChatInviteLinkDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_ChatInviteLinkPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_ChatInviteLinkWireKeys)),
  }),
);

/** Represents a join request sent to a chat. */
export interface ChatJoinRequest {
  /** Chat to which the request was sent */
  readonly chat: Chat;
  /** User that sent the join request */
  readonly from: User;
  /** Identifier of a private chat with the user who sent the join request. This number may have more than 32 significant bits and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a 64-bit integer or double-precision float type are safe for storing this identifier. The bot can use this identifier for 5 minutes to send messages until the join request is processed, assuming no other administrator contacted the user. */
  readonly userChatId: number;
  /** Date the request was sent in Unix time */
  readonly date: number;
  /** Optional. Bio of the user */
  readonly bio?: string;
  /** Optional. Chat invite link that was used by the user to send the join request */
  readonly inviteLink?: ChatInviteLink;
  /** Optional. Identifier of the join request query; for bots assigned to process join requests only. If present, then the bot must call sendChatJoinRequestWebApp or directly call answerChatJoinRequestQuery within 10 seconds. */
  readonly queryId?: string;
  readonly [key: string]: unknown;
}
const _ChatJoinRequestPublicKeys = { user_chat_id: "userChatId", invite_link: "inviteLink", query_id: "queryId" } as const;
const _ChatJoinRequestWireKeys = invertKeys(_ChatJoinRequestPublicKeys);
const _ChatJoinRequestEncoded = Schema.StructWithRest(
  Schema.Struct({
    chat: Schema.suspend((): Schema.Codec<Chat, unknown> => Chat),
    from: Schema.suspend((): Schema.Codec<User, unknown> => User),
    user_chat_id: Schema.Int,
    date: Schema.Int,
    bio: Schema.optionalKey(Schema.String),
    invite_link: Schema.optionalKey(Schema.suspend((): Schema.Codec<ChatInviteLink, unknown> => ChatInviteLink)),
    query_id: Schema.optionalKey(Schema.String),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _ChatJoinRequestDecoded = Schema.declare<ChatJoinRequest>((input): input is ChatJoinRequest => Predicate.isObject(input));
export const ChatJoinRequest: Schema.Codec<ChatJoinRequest, unknown> = _ChatJoinRequestEncoded.pipe(
  Schema.decodeTo(_ChatJoinRequestDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_ChatJoinRequestPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_ChatJoinRequestWireKeys)),
  }),
);

/** Represents a location to which a chat is connected. */
export interface ChatLocation {
  /** The location to which the supergroup is connected. Can't be a live location. */
  readonly location: Location;
  /** Location address; 1-64 characters, as defined by the chat owner */
  readonly address: string;
  readonly [key: string]: unknown;
}
export const ChatLocation: Schema.Codec<ChatLocation, unknown> = Schema.StructWithRest(
  Schema.Struct({
    location: Schema.suspend((): Schema.Codec<Location, unknown> => Location),
    address: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object contains information about one member of a chat. Currently, the following 6 types of chat members are supported: */
export type ChatMember = ChatMemberOwner | ChatMemberAdministrator | ChatMemberMember | ChatMemberRestricted | ChatMemberLeft | ChatMemberBanned;
export const ChatMember: Schema.Codec<ChatMember, unknown> = Schema.Union([Schema.suspend((): Schema.Codec<ChatMemberOwner, unknown> => ChatMemberOwner), Schema.suspend((): Schema.Codec<ChatMemberAdministrator, unknown> => ChatMemberAdministrator), Schema.suspend((): Schema.Codec<ChatMemberMember, unknown> => ChatMemberMember), Schema.suspend((): Schema.Codec<ChatMemberRestricted, unknown> => ChatMemberRestricted), Schema.suspend((): Schema.Codec<ChatMemberLeft, unknown> => ChatMemberLeft), Schema.suspend((): Schema.Codec<ChatMemberBanned, unknown> => ChatMemberBanned)]);

/** Represents a chat member that has some additional privileges. */
export interface ChatMemberAdministrator {
  /** The member's status in the chat, always “administrator” */
  readonly status: "administrator";
  /** Information about the user */
  readonly user: User;
  /** True, if the bot is allowed to edit administrator privileges of that user */
  readonly canBeEdited: boolean;
  /** True, if the user's presence in the chat is hidden */
  readonly isAnonymous: boolean;
  /** True, if the administrator can access the chat event log, get boost list, see hidden supergroup and channel members, report spam messages, ignore slow mode, and send messages to the chat without paying Telegram Stars. Implied by any other administrator privilege. */
  readonly canManageChat: boolean;
  /** True, if the administrator can delete messages of other users */
  readonly canDeleteMessages: boolean;
  /** True, if the administrator can manage video chats */
  readonly canManageVideoChats: boolean;
  /** True, if the administrator can restrict, ban or unban chat members, or access supergroup statistics */
  readonly canRestrictMembers: boolean;
  /** True, if the administrator can add new administrators with a subset of their own privileges or demote administrators that they have promoted, directly or indirectly (promoted by administrators that were appointed by the user) */
  readonly canPromoteMembers: boolean;
  /** True, if the user is allowed to change the chat title, photo and other settings */
  readonly canChangeInfo: boolean;
  /** True, if the user is allowed to invite new users to the chat */
  readonly canInviteUsers: boolean;
  /** True, if the administrator can post stories to the chat */
  readonly canPostStories: boolean;
  /** True, if the administrator can edit stories posted by other users, post stories to the chat page, pin chat stories, and access the chat's story archive */
  readonly canEditStories: boolean;
  /** True, if the administrator can delete stories posted by other users */
  readonly canDeleteStories: boolean;
  /** Optional. True, if the administrator can post messages in the channel, approve suggested posts, or access channel statistics; for channels only */
  readonly canPostMessages?: boolean;
  /** Optional. True, if the administrator can edit messages of other users and can pin messages; for channels only */
  readonly canEditMessages?: boolean;
  /** Optional. True, if the user is allowed to pin messages; for groups and supergroups only */
  readonly canPinMessages?: boolean;
  /** Optional. True, if the user is allowed to create, rename, close, and reopen forum topics; for supergroups only */
  readonly canManageTopics?: boolean;
  /** Optional. True, if the administrator can manage direct messages of the channel and decline suggested posts; for channels only */
  readonly canManageDirectMessages?: boolean;
  /** Optional. True, if the administrator can edit the tags of regular members; for groups and supergroups only */
  readonly canManageTags?: boolean;
  /** True, if the administrator can manage chat welcome messages or directly send them in the case of bots */
  readonly canSendWelcomeMessages: boolean;
  /** Optional. Custom title for this user */
  readonly customTitle?: string;
  readonly [key: string]: unknown;
}
const _ChatMemberAdministratorPublicKeys = { can_be_edited: "canBeEdited", is_anonymous: "isAnonymous", can_manage_chat: "canManageChat", can_delete_messages: "canDeleteMessages", can_manage_video_chats: "canManageVideoChats", can_restrict_members: "canRestrictMembers", can_promote_members: "canPromoteMembers", can_change_info: "canChangeInfo", can_invite_users: "canInviteUsers", can_post_stories: "canPostStories", can_edit_stories: "canEditStories", can_delete_stories: "canDeleteStories", can_post_messages: "canPostMessages", can_edit_messages: "canEditMessages", can_pin_messages: "canPinMessages", can_manage_topics: "canManageTopics", can_manage_direct_messages: "canManageDirectMessages", can_manage_tags: "canManageTags", can_send_welcome_messages: "canSendWelcomeMessages", custom_title: "customTitle" } as const;
const _ChatMemberAdministratorWireKeys = invertKeys(_ChatMemberAdministratorPublicKeys);
const _ChatMemberAdministratorEncoded = Schema.StructWithRest(
  Schema.Struct({
    status: Schema.Literal("administrator"),
    user: Schema.suspend((): Schema.Codec<User, unknown> => User),
    can_be_edited: Schema.Boolean,
    is_anonymous: Schema.Boolean,
    can_manage_chat: Schema.Boolean,
    can_delete_messages: Schema.Boolean,
    can_manage_video_chats: Schema.Boolean,
    can_restrict_members: Schema.Boolean,
    can_promote_members: Schema.Boolean,
    can_change_info: Schema.Boolean,
    can_invite_users: Schema.Boolean,
    can_post_stories: Schema.Boolean,
    can_edit_stories: Schema.Boolean,
    can_delete_stories: Schema.Boolean,
    can_post_messages: Schema.optionalKey(Schema.Boolean),
    can_edit_messages: Schema.optionalKey(Schema.Boolean),
    can_pin_messages: Schema.optionalKey(Schema.Boolean),
    can_manage_topics: Schema.optionalKey(Schema.Boolean),
    can_manage_direct_messages: Schema.optionalKey(Schema.Boolean),
    can_manage_tags: Schema.optionalKey(Schema.Boolean),
    can_send_welcome_messages: Schema.Boolean,
    custom_title: Schema.optionalKey(Schema.String),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _ChatMemberAdministratorDecoded = Schema.declare<ChatMemberAdministrator>((input): input is ChatMemberAdministrator => Predicate.isObject(input));
export const ChatMemberAdministrator: Schema.Codec<ChatMemberAdministrator, unknown> = _ChatMemberAdministratorEncoded.pipe(
  Schema.decodeTo(_ChatMemberAdministratorDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_ChatMemberAdministratorPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_ChatMemberAdministratorWireKeys)),
  }),
);

/** Represents a chat member that was banned in the chat and can't return to the chat or view chat messages. */
export interface ChatMemberBanned {
  /** The member's status in the chat, always “kicked” */
  readonly status: "kicked";
  /** Information about the user */
  readonly user: User;
  /** Date when restrictions will be lifted for this user; Unix time. If 0, then the user is banned forever. */
  readonly untilDate: number;
  readonly [key: string]: unknown;
}
const _ChatMemberBannedPublicKeys = { until_date: "untilDate" } as const;
const _ChatMemberBannedWireKeys = invertKeys(_ChatMemberBannedPublicKeys);
const _ChatMemberBannedEncoded = Schema.StructWithRest(
  Schema.Struct({
    status: Schema.Literal("kicked"),
    user: Schema.suspend((): Schema.Codec<User, unknown> => User),
    until_date: Schema.Int,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _ChatMemberBannedDecoded = Schema.declare<ChatMemberBanned>((input): input is ChatMemberBanned => Predicate.isObject(input));
export const ChatMemberBanned: Schema.Codec<ChatMemberBanned, unknown> = _ChatMemberBannedEncoded.pipe(
  Schema.decodeTo(_ChatMemberBannedDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_ChatMemberBannedPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_ChatMemberBannedWireKeys)),
  }),
);

/** Represents a chat member that isn't currently a member of the chat, but may join it themselves. */
export interface ChatMemberLeft {
  /** The member's status in the chat, always “left” */
  readonly status: "left";
  /** Information about the user */
  readonly user: User;
  readonly [key: string]: unknown;
}
export const ChatMemberLeft: Schema.Codec<ChatMemberLeft, unknown> = Schema.StructWithRest(
  Schema.Struct({
    status: Schema.Literal("left"),
    user: Schema.suspend((): Schema.Codec<User, unknown> => User),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Represents a chat member that has no additional privileges or restrictions. */
export interface ChatMemberMember {
  /** The member's status in the chat, always “member” */
  readonly status: "member";
  /** Optional. Tag of the member */
  readonly tag?: string;
  /** Information about the user */
  readonly user: User;
  /** Optional. Date when the user's subscription will expire; Unix time */
  readonly untilDate?: number;
  readonly [key: string]: unknown;
}
const _ChatMemberMemberPublicKeys = { until_date: "untilDate" } as const;
const _ChatMemberMemberWireKeys = invertKeys(_ChatMemberMemberPublicKeys);
const _ChatMemberMemberEncoded = Schema.StructWithRest(
  Schema.Struct({
    status: Schema.Literal("member"),
    tag: Schema.optionalKey(Schema.String),
    user: Schema.suspend((): Schema.Codec<User, unknown> => User),
    until_date: Schema.optionalKey(Schema.Int),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _ChatMemberMemberDecoded = Schema.declare<ChatMemberMember>((input): input is ChatMemberMember => Predicate.isObject(input));
export const ChatMemberMember: Schema.Codec<ChatMemberMember, unknown> = _ChatMemberMemberEncoded.pipe(
  Schema.decodeTo(_ChatMemberMemberDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_ChatMemberMemberPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_ChatMemberMemberWireKeys)),
  }),
);

/** Represents a chat member that owns the chat and has all administrator privileges. */
export interface ChatMemberOwner {
  /** The member's status in the chat, always “creator” */
  readonly status: "creator";
  /** Information about the user */
  readonly user: User;
  /** True, if the user's presence in the chat is hidden */
  readonly isAnonymous: boolean;
  /** Optional. Custom title for this user */
  readonly customTitle?: string;
  readonly [key: string]: unknown;
}
const _ChatMemberOwnerPublicKeys = { is_anonymous: "isAnonymous", custom_title: "customTitle" } as const;
const _ChatMemberOwnerWireKeys = invertKeys(_ChatMemberOwnerPublicKeys);
const _ChatMemberOwnerEncoded = Schema.StructWithRest(
  Schema.Struct({
    status: Schema.Literal("creator"),
    user: Schema.suspend((): Schema.Codec<User, unknown> => User),
    is_anonymous: Schema.Boolean,
    custom_title: Schema.optionalKey(Schema.String),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _ChatMemberOwnerDecoded = Schema.declare<ChatMemberOwner>((input): input is ChatMemberOwner => Predicate.isObject(input));
export const ChatMemberOwner: Schema.Codec<ChatMemberOwner, unknown> = _ChatMemberOwnerEncoded.pipe(
  Schema.decodeTo(_ChatMemberOwnerDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_ChatMemberOwnerPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_ChatMemberOwnerWireKeys)),
  }),
);

/** Represents a chat member that is under certain restrictions in the chat. Supergroups only. */
export interface ChatMemberRestricted {
  /** The member's status in the chat, always “restricted” */
  readonly status: "restricted";
  /** Optional. Tag of the member */
  readonly tag?: string;
  /** Information about the user */
  readonly user: User;
  /** True, if the user is a member of the chat at the moment of the request */
  readonly isMember: boolean;
  /** True, if the user is allowed to send text messages, rich messages, contacts, giveaways, giveaway winners, invoices, locations and venues */
  readonly canSendMessages: boolean;
  /** True, if the user is allowed to send audios */
  readonly canSendAudios: boolean;
  /** True, if the user is allowed to send documents */
  readonly canSendDocuments: boolean;
  /** True, if the user is allowed to send photos */
  readonly canSendPhotos: boolean;
  /** True, if the user is allowed to send videos */
  readonly canSendVideos: boolean;
  /** True, if the user is allowed to send video notes */
  readonly canSendVideoNotes: boolean;
  /** True, if the user is allowed to send voice notes */
  readonly canSendVoiceNotes: boolean;
  /** True, if the user is allowed to send polls and checklists */
  readonly canSendPolls: boolean;
  /** True, if the user is allowed to send animations, games, stickers and use inline bots */
  readonly canSendOtherMessages: boolean;
  /** True, if the user is allowed to add web page previews to their messages */
  readonly canAddWebPagePreviews: boolean;
  /** True, if the user is allowed to react to messages */
  readonly canReactToMessages: boolean;
  /** True, if the user is allowed to edit their own tag */
  readonly canEditTag: boolean;
  /** True, if the user is allowed to change the chat title, photo and other settings */
  readonly canChangeInfo: boolean;
  /** True, if the user is allowed to invite new users to the chat */
  readonly canInviteUsers: boolean;
  /** True, if the user is allowed to pin messages */
  readonly canPinMessages: boolean;
  /** True, if the user is allowed to create forum topics */
  readonly canManageTopics: boolean;
  /** Date when restrictions will be lifted for this user; Unix time. If 0, then the user is restricted forever. */
  readonly untilDate: number;
  readonly [key: string]: unknown;
}
const _ChatMemberRestrictedPublicKeys = { is_member: "isMember", can_send_messages: "canSendMessages", can_send_audios: "canSendAudios", can_send_documents: "canSendDocuments", can_send_photos: "canSendPhotos", can_send_videos: "canSendVideos", can_send_video_notes: "canSendVideoNotes", can_send_voice_notes: "canSendVoiceNotes", can_send_polls: "canSendPolls", can_send_other_messages: "canSendOtherMessages", can_add_web_page_previews: "canAddWebPagePreviews", can_react_to_messages: "canReactToMessages", can_edit_tag: "canEditTag", can_change_info: "canChangeInfo", can_invite_users: "canInviteUsers", can_pin_messages: "canPinMessages", can_manage_topics: "canManageTopics", until_date: "untilDate" } as const;
const _ChatMemberRestrictedWireKeys = invertKeys(_ChatMemberRestrictedPublicKeys);
const _ChatMemberRestrictedEncoded = Schema.StructWithRest(
  Schema.Struct({
    status: Schema.Literal("restricted"),
    tag: Schema.optionalKey(Schema.String),
    user: Schema.suspend((): Schema.Codec<User, unknown> => User),
    is_member: Schema.Boolean,
    can_send_messages: Schema.Boolean,
    can_send_audios: Schema.Boolean,
    can_send_documents: Schema.Boolean,
    can_send_photos: Schema.Boolean,
    can_send_videos: Schema.Boolean,
    can_send_video_notes: Schema.Boolean,
    can_send_voice_notes: Schema.Boolean,
    can_send_polls: Schema.Boolean,
    can_send_other_messages: Schema.Boolean,
    can_add_web_page_previews: Schema.Boolean,
    can_react_to_messages: Schema.Boolean,
    can_edit_tag: Schema.Boolean,
    can_change_info: Schema.Boolean,
    can_invite_users: Schema.Boolean,
    can_pin_messages: Schema.Boolean,
    can_manage_topics: Schema.Boolean,
    until_date: Schema.Int,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _ChatMemberRestrictedDecoded = Schema.declare<ChatMemberRestricted>((input): input is ChatMemberRestricted => Predicate.isObject(input));
export const ChatMemberRestricted: Schema.Codec<ChatMemberRestricted, unknown> = _ChatMemberRestrictedEncoded.pipe(
  Schema.decodeTo(_ChatMemberRestrictedDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_ChatMemberRestrictedPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_ChatMemberRestrictedWireKeys)),
  }),
);

/** This object represents changes in the status of a chat member. */
export interface ChatMemberUpdated {
  /** Chat the user belongs to */
  readonly chat: Chat;
  /** Performer of the action, which resulted in the change */
  readonly from: User;
  /** Date the change was done in Unix time */
  readonly date: number;
  /** Previous information about the chat member */
  readonly oldChatMember: ChatMember;
  /** New information about the chat member */
  readonly newChatMember: ChatMember;
  /** Optional. Chat invite link, which was used by the user to join the chat; for joining by invite link events only */
  readonly inviteLink?: ChatInviteLink;
  /** Optional. True, if the user joined the chat after sending a direct join request without using an invite link and being approved by an administrator */
  readonly viaJoinRequest?: boolean;
  /** Optional. True, if the user joined the chat via a chat folder invite link */
  readonly viaChatFolderInviteLink?: boolean;
  readonly [key: string]: unknown;
}
const _ChatMemberUpdatedPublicKeys = { old_chat_member: "oldChatMember", new_chat_member: "newChatMember", invite_link: "inviteLink", via_join_request: "viaJoinRequest", via_chat_folder_invite_link: "viaChatFolderInviteLink" } as const;
const _ChatMemberUpdatedWireKeys = invertKeys(_ChatMemberUpdatedPublicKeys);
const _ChatMemberUpdatedEncoded = Schema.StructWithRest(
  Schema.Struct({
    chat: Schema.suspend((): Schema.Codec<Chat, unknown> => Chat),
    from: Schema.suspend((): Schema.Codec<User, unknown> => User),
    date: Schema.Int,
    old_chat_member: Schema.suspend((): Schema.Codec<ChatMember, unknown> => ChatMember),
    new_chat_member: Schema.suspend((): Schema.Codec<ChatMember, unknown> => ChatMember),
    invite_link: Schema.optionalKey(Schema.suspend((): Schema.Codec<ChatInviteLink, unknown> => ChatInviteLink)),
    via_join_request: Schema.optionalKey(Schema.Boolean),
    via_chat_folder_invite_link: Schema.optionalKey(Schema.Boolean),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _ChatMemberUpdatedDecoded = Schema.declare<ChatMemberUpdated>((input): input is ChatMemberUpdated => Predicate.isObject(input));
export const ChatMemberUpdated: Schema.Codec<ChatMemberUpdated, unknown> = _ChatMemberUpdatedEncoded.pipe(
  Schema.decodeTo(_ChatMemberUpdatedDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_ChatMemberUpdatedPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_ChatMemberUpdatedWireKeys)),
  }),
);

/** Describes a service message about an ownership change in the chat. */
export interface ChatOwnerChanged {
  /** The new owner of the chat */
  readonly newOwner: User;
  readonly [key: string]: unknown;
}
const _ChatOwnerChangedPublicKeys = { new_owner: "newOwner" } as const;
const _ChatOwnerChangedWireKeys = invertKeys(_ChatOwnerChangedPublicKeys);
const _ChatOwnerChangedEncoded = Schema.StructWithRest(
  Schema.Struct({
    new_owner: Schema.suspend((): Schema.Codec<User, unknown> => User),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _ChatOwnerChangedDecoded = Schema.declare<ChatOwnerChanged>((input): input is ChatOwnerChanged => Predicate.isObject(input));
export const ChatOwnerChanged: Schema.Codec<ChatOwnerChanged, unknown> = _ChatOwnerChangedEncoded.pipe(
  Schema.decodeTo(_ChatOwnerChangedDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_ChatOwnerChangedPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_ChatOwnerChangedWireKeys)),
  }),
);

/** Describes a service message about the chat owner leaving the chat. */
export interface ChatOwnerLeft {
  /** Optional. The user who will become the new owner of the chat if the previous owner does not return to the chat */
  readonly newOwner?: User;
  readonly [key: string]: unknown;
}
const _ChatOwnerLeftPublicKeys = { new_owner: "newOwner" } as const;
const _ChatOwnerLeftWireKeys = invertKeys(_ChatOwnerLeftPublicKeys);
const _ChatOwnerLeftEncoded = Schema.StructWithRest(
  Schema.Struct({
    new_owner: Schema.optionalKey(Schema.suspend((): Schema.Codec<User, unknown> => User)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _ChatOwnerLeftDecoded = Schema.declare<ChatOwnerLeft>((input): input is ChatOwnerLeft => Predicate.isObject(input));
export const ChatOwnerLeft: Schema.Codec<ChatOwnerLeft, unknown> = _ChatOwnerLeftEncoded.pipe(
  Schema.decodeTo(_ChatOwnerLeftDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_ChatOwnerLeftPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_ChatOwnerLeftWireKeys)),
  }),
);

/** Describes actions that a non-administrator user is allowed to take in a chat. */
export interface ChatPermissions {
  /** Optional. True, if the user is allowed to send text messages, rich messages, contacts, giveaways, giveaway winners, invoices, locations and venues */
  readonly canSendMessages?: boolean;
  /** Optional. True, if the user is allowed to send audios */
  readonly canSendAudios?: boolean;
  /** Optional. True, if the user is allowed to send documents */
  readonly canSendDocuments?: boolean;
  /** Optional. True, if the user is allowed to send photos */
  readonly canSendPhotos?: boolean;
  /** Optional. True, if the user is allowed to send videos */
  readonly canSendVideos?: boolean;
  /** Optional. True, if the user is allowed to send video notes */
  readonly canSendVideoNotes?: boolean;
  /** Optional. True, if the user is allowed to send voice notes */
  readonly canSendVoiceNotes?: boolean;
  /** Optional. True, if the user is allowed to send polls and checklists */
  readonly canSendPolls?: boolean;
  /** Optional. True, if the user is allowed to send animations, games, stickers and use inline bots */
  readonly canSendOtherMessages?: boolean;
  /** Optional. True, if the user is allowed to add web page previews to their messages */
  readonly canAddWebPagePreviews?: boolean;
  /** Optional. True, if the user is allowed to react to messages. If omitted, defaults to the value of can_send_messages. */
  readonly canReactToMessages?: boolean;
  /** Optional. True, if the user is allowed to edit their own tag. If omitted, defaults to the value of can_pin_messages. */
  readonly canEditTag?: boolean;
  /** Optional. True, if the user is allowed to change the chat title, photo and other settings. Ignored in public supergroups. */
  readonly canChangeInfo?: boolean;
  /** Optional. True, if the user is allowed to invite new users to the chat */
  readonly canInviteUsers?: boolean;
  /** Optional. True, if the user is allowed to pin messages. Ignored in public supergroups. */
  readonly canPinMessages?: boolean;
  /** Optional. True, if the user is allowed to create forum topics. If omitted, defaults to the value of can_pin_messages. */
  readonly canManageTopics?: boolean;
  readonly [key: string]: unknown;
}
const _ChatPermissionsPublicKeys = { can_send_messages: "canSendMessages", can_send_audios: "canSendAudios", can_send_documents: "canSendDocuments", can_send_photos: "canSendPhotos", can_send_videos: "canSendVideos", can_send_video_notes: "canSendVideoNotes", can_send_voice_notes: "canSendVoiceNotes", can_send_polls: "canSendPolls", can_send_other_messages: "canSendOtherMessages", can_add_web_page_previews: "canAddWebPagePreviews", can_react_to_messages: "canReactToMessages", can_edit_tag: "canEditTag", can_change_info: "canChangeInfo", can_invite_users: "canInviteUsers", can_pin_messages: "canPinMessages", can_manage_topics: "canManageTopics" } as const;
const _ChatPermissionsWireKeys = invertKeys(_ChatPermissionsPublicKeys);
const _ChatPermissionsEncoded = Schema.StructWithRest(
  Schema.Struct({
    can_send_messages: Schema.optionalKey(Schema.Boolean),
    can_send_audios: Schema.optionalKey(Schema.Boolean),
    can_send_documents: Schema.optionalKey(Schema.Boolean),
    can_send_photos: Schema.optionalKey(Schema.Boolean),
    can_send_videos: Schema.optionalKey(Schema.Boolean),
    can_send_video_notes: Schema.optionalKey(Schema.Boolean),
    can_send_voice_notes: Schema.optionalKey(Schema.Boolean),
    can_send_polls: Schema.optionalKey(Schema.Boolean),
    can_send_other_messages: Schema.optionalKey(Schema.Boolean),
    can_add_web_page_previews: Schema.optionalKey(Schema.Boolean),
    can_react_to_messages: Schema.optionalKey(Schema.Boolean),
    can_edit_tag: Schema.optionalKey(Schema.Boolean),
    can_change_info: Schema.optionalKey(Schema.Boolean),
    can_invite_users: Schema.optionalKey(Schema.Boolean),
    can_pin_messages: Schema.optionalKey(Schema.Boolean),
    can_manage_topics: Schema.optionalKey(Schema.Boolean),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _ChatPermissionsDecoded = Schema.declare<ChatPermissions>((input): input is ChatPermissions => Predicate.isObject(input));
export const ChatPermissions: Schema.Codec<ChatPermissions, unknown> = _ChatPermissionsEncoded.pipe(
  Schema.decodeTo(_ChatPermissionsDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_ChatPermissionsPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_ChatPermissionsWireKeys)),
  }),
);

/** This object represents a chat photo. */
export interface ChatPhoto {
  /** File identifier of small (160x160) chat photo. This file_id can be used only for photo download and only for as long as the photo is not changed. */
  readonly smallFileId: string;
  /** Unique file identifier of small (160x160) chat photo, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file. */
  readonly smallFileUniqueId: string;
  /** File identifier of big (640x640) chat photo. This file_id can be used only for photo download and only for as long as the photo is not changed. */
  readonly bigFileId: string;
  /** Unique file identifier of big (640x640) chat photo, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file. */
  readonly bigFileUniqueId: string;
  readonly [key: string]: unknown;
}
const _ChatPhotoPublicKeys = { small_file_id: "smallFileId", small_file_unique_id: "smallFileUniqueId", big_file_id: "bigFileId", big_file_unique_id: "bigFileUniqueId" } as const;
const _ChatPhotoWireKeys = invertKeys(_ChatPhotoPublicKeys);
const _ChatPhotoEncoded = Schema.StructWithRest(
  Schema.Struct({
    small_file_id: Schema.String,
    small_file_unique_id: Schema.String,
    big_file_id: Schema.String,
    big_file_unique_id: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _ChatPhotoDecoded = Schema.declare<ChatPhoto>((input): input is ChatPhoto => Predicate.isObject(input));
export const ChatPhoto: Schema.Codec<ChatPhoto, unknown> = _ChatPhotoEncoded.pipe(
  Schema.decodeTo(_ChatPhotoDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_ChatPhotoPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_ChatPhotoWireKeys)),
  }),
);

/** This object contains information about a chat that was shared with the bot using a KeyboardButtonRequestChat button. */
export interface ChatShared {
  /** Identifier of the request */
  readonly requestId: number;
  /** Identifier of the shared chat. This number may have more than 32 significant bits and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a 64-bit integer or double-precision float type are safe for storing this identifier. The bot may not have access to the chat and could be unable to use this identifier, unless the chat is already known to the bot by some other means. */
  readonly chatId: number;
  /** Optional. Title of the chat, if the title was requested by the bot */
  readonly title?: string;
  /** Optional. Username of the chat, if the username was requested by the bot and available */
  readonly username?: string;
  /** Optional. Available sizes of the chat photo, if the photo was requested by the bot */
  readonly photo?: ReadonlyArray<PhotoSize>;
  readonly [key: string]: unknown;
}
const _ChatSharedPublicKeys = { request_id: "requestId", chat_id: "chatId" } as const;
const _ChatSharedWireKeys = invertKeys(_ChatSharedPublicKeys);
const _ChatSharedEncoded = Schema.StructWithRest(
  Schema.Struct({
    request_id: Schema.Int,
    chat_id: Schema.Int,
    title: Schema.optionalKey(Schema.String),
    username: Schema.optionalKey(Schema.String),
    photo: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<PhotoSize, unknown> => PhotoSize))),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _ChatSharedDecoded = Schema.declare<ChatShared>((input): input is ChatShared => Predicate.isObject(input));
export const ChatShared: Schema.Codec<ChatShared, unknown> = _ChatSharedEncoded.pipe(
  Schema.decodeTo(_ChatSharedDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_ChatSharedPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_ChatSharedWireKeys)),
  }),
);

/** Describes a checklist. */
export interface Checklist {
  /** Title of the checklist */
  readonly title: string;
  /** Optional. Special entities that appear in the checklist title */
  readonly titleEntities?: ReadonlyArray<MessageEntity>;
  /** List of tasks in the checklist */
  readonly tasks: ReadonlyArray<ChecklistTask>;
  /** Optional. True, if users other than the creator of the list can add tasks to the list */
  readonly othersCanAddTasks?: true;
  /** Optional. True, if users other than the creator of the list can mark tasks as done or not done */
  readonly othersCanMarkTasksAsDone?: true;
  readonly [key: string]: unknown;
}
const _ChecklistPublicKeys = { title_entities: "titleEntities", others_can_add_tasks: "othersCanAddTasks", others_can_mark_tasks_as_done: "othersCanMarkTasksAsDone" } as const;
const _ChecklistWireKeys = invertKeys(_ChecklistPublicKeys);
const _ChecklistEncoded = Schema.StructWithRest(
  Schema.Struct({
    title: Schema.String,
    title_entities: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<MessageEntity, unknown> => MessageEntity))),
    tasks: Schema.Array(Schema.suspend((): Schema.Codec<ChecklistTask, unknown> => ChecklistTask)),
    others_can_add_tasks: Schema.optionalKey(Schema.Literal(true)),
    others_can_mark_tasks_as_done: Schema.optionalKey(Schema.Literal(true)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _ChecklistDecoded = Schema.declare<Checklist>((input): input is Checklist => Predicate.isObject(input));
export const Checklist: Schema.Codec<Checklist, unknown> = _ChecklistEncoded.pipe(
  Schema.decodeTo(_ChecklistDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_ChecklistPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_ChecklistWireKeys)),
  }),
);

/** Describes a task in a checklist. */
export interface ChecklistTask {
  /** Unique identifier of the task */
  readonly id: number;
  /** Text of the task */
  readonly text: string;
  /** Optional. Special entities that appear in the task text */
  readonly textEntities?: ReadonlyArray<MessageEntity>;
  /** Optional. User that completed the task; omitted if the task wasn't completed by a user */
  readonly completedByUser?: User;
  /** Optional. Chat that completed the task; omitted if the task wasn't completed by a chat */
  readonly completedByChat?: Chat;
  /** Optional. Point in time (Unix timestamp) when the task was completed; 0 if the task wasn't completed */
  readonly completionDate?: number;
  readonly [key: string]: unknown;
}
const _ChecklistTaskPublicKeys = { text_entities: "textEntities", completed_by_user: "completedByUser", completed_by_chat: "completedByChat", completion_date: "completionDate" } as const;
const _ChecklistTaskWireKeys = invertKeys(_ChecklistTaskPublicKeys);
const _ChecklistTaskEncoded = Schema.StructWithRest(
  Schema.Struct({
    id: Schema.Int,
    text: Schema.String,
    text_entities: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<MessageEntity, unknown> => MessageEntity))),
    completed_by_user: Schema.optionalKey(Schema.suspend((): Schema.Codec<User, unknown> => User)),
    completed_by_chat: Schema.optionalKey(Schema.suspend((): Schema.Codec<Chat, unknown> => Chat)),
    completion_date: Schema.optionalKey(Schema.Int),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _ChecklistTaskDecoded = Schema.declare<ChecklistTask>((input): input is ChecklistTask => Predicate.isObject(input));
export const ChecklistTask: Schema.Codec<ChecklistTask, unknown> = _ChecklistTaskEncoded.pipe(
  Schema.decodeTo(_ChecklistTaskDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_ChecklistTaskPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_ChecklistTaskWireKeys)),
  }),
);

/** Describes a service message about tasks added to a checklist. */
export interface ChecklistTasksAdded {
  /** Optional. Message containing the checklist to which the tasks were added. Note that the Message object in this field will not contain the reply_to_message field even if it itself is a reply. */
  readonly checklistMessage?: Message;
  /** List of tasks added to the checklist */
  readonly tasks: ReadonlyArray<ChecklistTask>;
  readonly [key: string]: unknown;
}
const _ChecklistTasksAddedPublicKeys = { checklist_message: "checklistMessage" } as const;
const _ChecklistTasksAddedWireKeys = invertKeys(_ChecklistTasksAddedPublicKeys);
const _ChecklistTasksAddedEncoded = Schema.StructWithRest(
  Schema.Struct({
    checklist_message: Schema.optionalKey(Schema.suspend((): Schema.Codec<Message, unknown> => Message)),
    tasks: Schema.Array(Schema.suspend((): Schema.Codec<ChecklistTask, unknown> => ChecklistTask)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _ChecklistTasksAddedDecoded = Schema.declare<ChecklistTasksAdded>((input): input is ChecklistTasksAdded => Predicate.isObject(input));
export const ChecklistTasksAdded: Schema.Codec<ChecklistTasksAdded, unknown> = _ChecklistTasksAddedEncoded.pipe(
  Schema.decodeTo(_ChecklistTasksAddedDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_ChecklistTasksAddedPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_ChecklistTasksAddedWireKeys)),
  }),
);

/** Describes a service message about checklist tasks marked as done or not done. */
export interface ChecklistTasksDone {
  /** Optional. Message containing the checklist whose tasks were marked as done or not done. Note that the Message object in this field will not contain the reply_to_message field even if it itself is a reply. */
  readonly checklistMessage?: Message;
  /** Optional. Identifiers of the tasks that were marked as done */
  readonly markedAsDoneTaskIds?: ReadonlyArray<number>;
  /** Optional. Identifiers of the tasks that were marked as not done */
  readonly markedAsNotDoneTaskIds?: ReadonlyArray<number>;
  readonly [key: string]: unknown;
}
const _ChecklistTasksDonePublicKeys = { checklist_message: "checklistMessage", marked_as_done_task_ids: "markedAsDoneTaskIds", marked_as_not_done_task_ids: "markedAsNotDoneTaskIds" } as const;
const _ChecklistTasksDoneWireKeys = invertKeys(_ChecklistTasksDonePublicKeys);
const _ChecklistTasksDoneEncoded = Schema.StructWithRest(
  Schema.Struct({
    checklist_message: Schema.optionalKey(Schema.suspend((): Schema.Codec<Message, unknown> => Message)),
    marked_as_done_task_ids: Schema.optionalKey(Schema.Array(Schema.Int)),
    marked_as_not_done_task_ids: Schema.optionalKey(Schema.Array(Schema.Int)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _ChecklistTasksDoneDecoded = Schema.declare<ChecklistTasksDone>((input): input is ChecklistTasksDone => Predicate.isObject(input));
export const ChecklistTasksDone: Schema.Codec<ChecklistTasksDone, unknown> = _ChecklistTasksDoneEncoded.pipe(
  Schema.decodeTo(_ChecklistTasksDoneDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_ChecklistTasksDonePublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_ChecklistTasksDoneWireKeys)),
  }),
);

/** Represents a result of an inline query that was chosen by the user and sent to their chat partner. */
export interface ChosenInlineResult {
  /** The unique identifier for the result that was chosen */
  readonly resultId: string;
  /** The user that chose the result */
  readonly from: User;
  /** Optional. Sender location, only for bots that require user location */
  readonly location?: Location;
  /** Optional. Identifier of the sent inline message. Available only if there is an inline keyboard attached to the message. Will be also received in callback queries and can be used to edit the message. */
  readonly inlineMessageId?: string;
  /** The query that was used to obtain the result */
  readonly query: string;
  readonly [key: string]: unknown;
}
const _ChosenInlineResultPublicKeys = { result_id: "resultId", inline_message_id: "inlineMessageId" } as const;
const _ChosenInlineResultWireKeys = invertKeys(_ChosenInlineResultPublicKeys);
const _ChosenInlineResultEncoded = Schema.StructWithRest(
  Schema.Struct({
    result_id: Schema.String,
    from: Schema.suspend((): Schema.Codec<User, unknown> => User),
    location: Schema.optionalKey(Schema.suspend((): Schema.Codec<Location, unknown> => Location)),
    inline_message_id: Schema.optionalKey(Schema.String),
    query: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _ChosenInlineResultDecoded = Schema.declare<ChosenInlineResult>((input): input is ChosenInlineResult => Predicate.isObject(input));
export const ChosenInlineResult: Schema.Codec<ChosenInlineResult, unknown> = _ChosenInlineResultEncoded.pipe(
  Schema.decodeTo(_ChosenInlineResultDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_ChosenInlineResultPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_ChosenInlineResultWireKeys)),
  }),
);

/** Represents a community (a group of chats). */
export interface Community {
  /** Unique identifier for this community. This number may have more than 32 significant bits and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a signed 64-bit integer or double-precision float type are safe for storing this identifier. */
  readonly id: number;
  /** Name of the community */
  readonly name: string;
  readonly [key: string]: unknown;
}
export const Community: Schema.Codec<Community, unknown> = Schema.StructWithRest(
  Schema.Struct({
    id: Schema.Int,
    name: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Describes a service message about a chat or a bot being added to a community. */
export interface CommunityChatAdded {
  /** The new community to which the chat or the bot belongs */
  readonly community: Community;
  readonly [key: string]: unknown;
}
export const CommunityChatAdded: Schema.Codec<CommunityChatAdded, unknown> = Schema.StructWithRest(
  Schema.Struct({
    community: Schema.suspend((): Schema.Codec<Community, unknown> => Community),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Describes a service message about a chat being joined by a user from a community. */
export interface CommunityChatJoined {
  /** The community from which the chat was joined */
  readonly community: Community;
  readonly [key: string]: unknown;
}
export const CommunityChatJoined: Schema.Codec<CommunityChatJoined, unknown> = Schema.StructWithRest(
  Schema.Struct({
    community: Schema.suspend((): Schema.Codec<Community, unknown> => Community),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Describes a service message about a chat or a bot being removed from a community. Currently holds no information. */
export interface CommunityChatRemoved {
  readonly [key: string]: unknown;
}
export const CommunityChatRemoved: Schema.Codec<CommunityChatRemoved, unknown> = Schema.StructWithRest(
  Schema.Struct({}),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object represents a phone contact. */
export interface Contact {
  /** Contact's phone number */
  readonly phoneNumber: string;
  /** Contact's first name */
  readonly firstName: string;
  /** Optional. Contact's last name */
  readonly lastName?: string;
  /** Optional. Contact's user identifier in Telegram. This number may have more than 32 significant bits and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a 64-bit integer or double-precision float type are safe for storing this identifier. */
  readonly userId?: number;
  /** Optional. Additional data about the contact in the form of a vCard */
  readonly vcard?: string;
  readonly [key: string]: unknown;
}
const _ContactPublicKeys = { phone_number: "phoneNumber", first_name: "firstName", last_name: "lastName", user_id: "userId" } as const;
const _ContactWireKeys = invertKeys(_ContactPublicKeys);
const _ContactEncoded = Schema.StructWithRest(
  Schema.Struct({
    phone_number: Schema.String,
    first_name: Schema.String,
    last_name: Schema.optionalKey(Schema.String),
    user_id: Schema.optionalKey(Schema.Int),
    vcard: Schema.optionalKey(Schema.String),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _ContactDecoded = Schema.declare<Contact>((input): input is Contact => Predicate.isObject(input));
export const Contact: Schema.Codec<Contact, unknown> = _ContactEncoded.pipe(
  Schema.decodeTo(_ContactDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_ContactPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_ContactWireKeys)),
  }),
);

/** This object represents an inline keyboard button that copies specified text to the clipboard. */
export interface CopyTextButton {
  /** The text to be copied to the clipboard; 1-256 characters */
  readonly text: string;
  readonly [key: string]: unknown;
}
export const CopyTextButton: Schema.Codec<CopyTextButton, unknown> = Schema.StructWithRest(
  Schema.Struct({
    text: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object represents an animated emoji that displays a random value. */
export interface Dice {
  /** Emoji on which the dice throw animation is based */
  readonly emoji: DiceEmoji;
  /** Value of the dice, 1-6 for “🎲”, “🎯” and “🎳” base emoji, 1-5 for “🏀” and “⚽” base emoji, 1-64 for “🎰” base emoji */
  readonly value: number;
  readonly [key: string]: unknown;
}
export const Dice: Schema.Codec<Dice, unknown> = Schema.StructWithRest(
  Schema.Struct({
    emoji: Schema.suspend((): Schema.Codec<DiceEmoji, unknown> => DiceEmoji),
    value: Schema.Int,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Describes a service message about a change in the price of direct messages sent to a channel chat. */
export interface DirectMessagePriceChanged {
  /** True, if direct messages are enabled for the channel chat; False otherwise */
  readonly areDirectMessagesEnabled: boolean;
  /** Optional. The new number of Telegram Stars that must be paid by users for each direct message sent to the channel. Does not apply to users who have been exempted by administrators. Defaults to 0. */
  readonly directMessageStarCount?: number;
  readonly [key: string]: unknown;
}
const _DirectMessagePriceChangedPublicKeys = { are_direct_messages_enabled: "areDirectMessagesEnabled", direct_message_star_count: "directMessageStarCount" } as const;
const _DirectMessagePriceChangedWireKeys = invertKeys(_DirectMessagePriceChangedPublicKeys);
const _DirectMessagePriceChangedEncoded = Schema.StructWithRest(
  Schema.Struct({
    are_direct_messages_enabled: Schema.Boolean,
    direct_message_star_count: Schema.optionalKey(Schema.Int),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _DirectMessagePriceChangedDecoded = Schema.declare<DirectMessagePriceChanged>((input): input is DirectMessagePriceChanged => Predicate.isObject(input));
export const DirectMessagePriceChanged: Schema.Codec<DirectMessagePriceChanged, unknown> = _DirectMessagePriceChangedEncoded.pipe(
  Schema.decodeTo(_DirectMessagePriceChangedDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_DirectMessagePriceChangedPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_DirectMessagePriceChangedWireKeys)),
  }),
);

/** Describes a topic of a direct messages chat. */
export interface DirectMessagesTopic {
  /** Unique identifier of the topic. This number may have more than 32 significant bits and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a 64-bit integer or double-precision float type are safe for storing this identifier. */
  readonly topicId: number;
  /** Optional. Information about the user that created the topic. Currently, it is always present. */
  readonly user?: User;
  readonly [key: string]: unknown;
}
const _DirectMessagesTopicPublicKeys = { topic_id: "topicId" } as const;
const _DirectMessagesTopicWireKeys = invertKeys(_DirectMessagesTopicPublicKeys);
const _DirectMessagesTopicEncoded = Schema.StructWithRest(
  Schema.Struct({
    topic_id: Schema.Int,
    user: Schema.optionalKey(Schema.suspend((): Schema.Codec<User, unknown> => User)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _DirectMessagesTopicDecoded = Schema.declare<DirectMessagesTopic>((input): input is DirectMessagesTopic => Predicate.isObject(input));
export const DirectMessagesTopic: Schema.Codec<DirectMessagesTopic, unknown> = _DirectMessagesTopicEncoded.pipe(
  Schema.decodeTo(_DirectMessagesTopicDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_DirectMessagesTopicPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_DirectMessagesTopicWireKeys)),
  }),
);

/** This object represents a disabled button which does nothing. Currently holds no information. */
export interface DisabledButton {
  readonly [key: string]: unknown;
}
export const DisabledButton: Schema.Codec<DisabledButton, unknown> = Schema.StructWithRest(
  Schema.Struct({}),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object represents a general file (as opposed to photos, voice messages and audio files). */
export interface Document {
  /** Identifier for this file, which can be used to download or reuse the file */
  readonly fileId: string;
  /** Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file. */
  readonly fileUniqueId: string;
  /** Optional. Document thumbnail as defined by the sender */
  readonly thumbnail?: PhotoSize;
  /** Optional. Original filename as defined by the sender */
  readonly fileName?: string;
  /** Optional. MIME type of the file as defined by the sender */
  readonly mimeType?: string;
  /** Optional. File size in bytes. It can be bigger than 2^31 and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a signed 64-bit integer or double-precision float type are safe for storing this value. */
  readonly fileSize?: number;
  readonly [key: string]: unknown;
}
const _DocumentPublicKeys = { file_id: "fileId", file_unique_id: "fileUniqueId", file_name: "fileName", mime_type: "mimeType", file_size: "fileSize" } as const;
const _DocumentWireKeys = invertKeys(_DocumentPublicKeys);
const _DocumentEncoded = Schema.StructWithRest(
  Schema.Struct({
    file_id: Schema.String,
    file_unique_id: Schema.String,
    thumbnail: Schema.optionalKey(Schema.suspend((): Schema.Codec<PhotoSize, unknown> => PhotoSize)),
    file_name: Schema.optionalKey(Schema.String),
    mime_type: Schema.optionalKey(Schema.String),
    file_size: Schema.optionalKey(Schema.Int),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _DocumentDecoded = Schema.declare<Document>((input): input is Document => Predicate.isObject(input));
export const Document: Schema.Codec<Document, unknown> = _DocumentEncoded.pipe(
  Schema.decodeTo(_DocumentDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_DocumentPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_DocumentWireKeys)),
  }),
);

/** Describes data required for decrypting and authenticating EncryptedPassportElement. See the Telegram Passport Documentation for a complete description of the data decryption and authentication processes. */
export interface EncryptedCredentials {
  /** Base64-encoded encrypted JSON-serialized data with unique user's payload, data hashes and secrets required for EncryptedPassportElement decryption and authentication */
  readonly data: string;
  /** Base64-encoded data hash for data authentication */
  readonly hash: string;
  /** Base64-encoded secret, encrypted with the bot's public RSA key, required for data decryption */
  readonly secret: string;
  readonly [key: string]: unknown;
}
export const EncryptedCredentials: Schema.Codec<EncryptedCredentials, unknown> = Schema.StructWithRest(
  Schema.Struct({
    data: Schema.String,
    hash: Schema.String,
    secret: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Describes documents or other Telegram Passport elements shared with the bot by the user. */
export interface EncryptedPassportElement {
  /** Element type. One of “personal_details”, “passport”, “driver_license”, “identity_card”, “internal_passport”, “address”, “utility_bill”, “bank_statement”, “rental_agreement”, “passport_registration”, “temporary_registration”, “phone_number”, “email”. */
  readonly type: EncryptedPassportElementType;
  /** Optional. Base64-encoded encrypted Telegram Passport element data provided by the user; available only for “personal_details”, “passport”, “driver_license”, “identity_card”, “internal_passport” and “address” types. Can be decrypted and verified using the accompanying EncryptedCredentials. */
  readonly data?: string;
  /** Optional. User's verified phone number; available only for “phone_number” type */
  readonly phoneNumber?: string;
  /** Optional. User's verified email address; available only for “email” type */
  readonly email?: string;
  /** Optional. Array of encrypted files with documents provided by the user; available only for “utility_bill”, “bank_statement”, “rental_agreement”, “passport_registration” and “temporary_registration” types. Files can be decrypted and verified using the accompanying EncryptedCredentials. */
  readonly files?: ReadonlyArray<PassportFile>;
  /** Optional. Encrypted file with the front side of the document, provided by the user; available only for “passport”, “driver_license”, “identity_card” and “internal_passport”. The file can be decrypted and verified using the accompanying EncryptedCredentials. */
  readonly frontSide?: PassportFile;
  /** Optional. Encrypted file with the reverse side of the document, provided by the user; available only for “driver_license” and “identity_card”. The file can be decrypted and verified using the accompanying EncryptedCredentials. */
  readonly reverseSide?: PassportFile;
  /** Optional. Encrypted file with the selfie of the user holding a document, provided by the user; available if requested for “passport”, “driver_license”, “identity_card” and “internal_passport”. The file can be decrypted and verified using the accompanying EncryptedCredentials. */
  readonly selfie?: PassportFile;
  /** Optional. Array of encrypted files with translated versions of documents provided by the user; available if requested for “passport”, “driver_license”, “identity_card”, “internal_passport”, “utility_bill”, “bank_statement”, “rental_agreement”, “passport_registration” and “temporary_registration” types. Files can be decrypted and verified using the accompanying EncryptedCredentials. */
  readonly translation?: ReadonlyArray<PassportFile>;
  /** Base64-encoded element hash for using in PassportElementErrorUnspecified */
  readonly hash: string;
  readonly [key: string]: unknown;
}
const _EncryptedPassportElementPublicKeys = { phone_number: "phoneNumber", front_side: "frontSide", reverse_side: "reverseSide" } as const;
const _EncryptedPassportElementWireKeys = invertKeys(_EncryptedPassportElementPublicKeys);
const _EncryptedPassportElementEncoded = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.suspend((): Schema.Codec<EncryptedPassportElementType, unknown> => EncryptedPassportElementType),
    data: Schema.optionalKey(Schema.String),
    phone_number: Schema.optionalKey(Schema.String),
    email: Schema.optionalKey(Schema.String),
    files: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<PassportFile, unknown> => PassportFile))),
    front_side: Schema.optionalKey(Schema.suspend((): Schema.Codec<PassportFile, unknown> => PassportFile)),
    reverse_side: Schema.optionalKey(Schema.suspend((): Schema.Codec<PassportFile, unknown> => PassportFile)),
    selfie: Schema.optionalKey(Schema.suspend((): Schema.Codec<PassportFile, unknown> => PassportFile)),
    translation: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<PassportFile, unknown> => PassportFile))),
    hash: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _EncryptedPassportElementDecoded = Schema.declare<EncryptedPassportElement>((input): input is EncryptedPassportElement => Predicate.isObject(input));
export const EncryptedPassportElement: Schema.Codec<EncryptedPassportElement, unknown> = _EncryptedPassportElementEncoded.pipe(
  Schema.decodeTo(_EncryptedPassportElementDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_EncryptedPassportElementPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_EncryptedPassportElementWireKeys)),
  }),
);

/**  */
export interface EphemeralMessageParameters {
  /** Identifier of the user who will receive the message. It is not guaranteed that the user will receive the message, especially if they are offline. See here for more details. */
  readonly receiverUserId: number;
  /** Optional. Identifier of the callback query which triggered the message, if any */
  readonly callbackQueryId?: string;
  /** Optional. Pass True if the ephemeral message must be shown in place of the original message. Must be False for callback queries from ephemeral messages, which must be edited using regular editEphemeralMessage… methods. */
  readonly replaceCallbackQueryMessage?: boolean;
  readonly [key: string]: unknown;
}
const _EphemeralMessageParametersPublicKeys = { receiver_user_id: "receiverUserId", callback_query_id: "callbackQueryId", replace_callback_query_message: "replaceCallbackQueryMessage" } as const;
const _EphemeralMessageParametersWireKeys = invertKeys(_EphemeralMessageParametersPublicKeys);
const _EphemeralMessageParametersEncoded = Schema.StructWithRest(
  Schema.Struct({
    receiver_user_id: Schema.Int,
    callback_query_id: Schema.optionalKey(Schema.String),
    replace_callback_query_message: Schema.optionalKey(Schema.Boolean),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _EphemeralMessageParametersDecoded = Schema.declare<EphemeralMessageParameters>((input): input is EphemeralMessageParameters => Predicate.isObject(input));
export const EphemeralMessageParameters: Schema.Codec<EphemeralMessageParameters, unknown> = _EphemeralMessageParametersEncoded.pipe(
  Schema.decodeTo(_EphemeralMessageParametersDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_EphemeralMessageParametersPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_EphemeralMessageParametersWireKeys)),
  }),
);

/** This object contains information about a message that is being replied to, which may come from another chat or forum topic. */
export interface ExternalReplyInfo {
  /** Origin of the message replied to by the given message */
  readonly origin: MessageOrigin;
  /** Optional. Chat the original message belongs to. Available only if the chat is a supergroup or a channel. */
  readonly chat?: Chat;
  /** Optional. Unique message identifier inside the original chat. Available only if the original chat is a supergroup or a channel. */
  readonly messageId?: number;
  /** Optional. Options used for link preview generation for the original message, if it is a text message */
  readonly linkPreviewOptions?: LinkPreviewOptions;
  /** Optional. Message is an animation, information about the animation */
  readonly animation?: Animation;
  /** Optional. Message is an audio file, information about the file */
  readonly audio?: Audio;
  /** Optional. Message is a general file, information about the file */
  readonly document?: Document;
  /** Optional. Message is a live photo, information about the live photo */
  readonly livePhoto?: LivePhoto;
  /** Optional. Message contains paid media; information about the paid media */
  readonly paidMedia?: PaidMediaInfo;
  /** Optional. Message is a photo, available sizes of the photo */
  readonly photo?: ReadonlyArray<PhotoSize>;
  /** Optional. Message is a sticker, information about the sticker */
  readonly sticker?: Sticker;
  /** Optional. Message is a forwarded story */
  readonly story?: Story;
  /** Optional. Message is a video, information about the video */
  readonly video?: Video;
  /** Optional. Message is a video note, information about the video message */
  readonly videoNote?: VideoNote;
  /** Optional. Message is a voice message, information about the file */
  readonly voice?: Voice;
  /** Optional. True, if the message media is covered by a spoiler animation */
  readonly hasMediaSpoiler?: true;
  /** Optional. Message is a checklist */
  readonly checklist?: Checklist;
  /** Optional. Message is a shared contact, information about the contact */
  readonly contact?: Contact;
  /** Optional. Message is a dice with random value */
  readonly dice?: Dice;
  /** Optional. Message is a game, information about the game. More about games » */
  readonly game?: Game;
  /** Optional. Message is a scheduled giveaway, information about the giveaway */
  readonly giveaway?: Giveaway;
  /** Optional. A giveaway with public winners was completed */
  readonly giveawayWinners?: GiveawayWinners;
  /** Optional. Message is an invoice for a payment, information about the invoice. More about payments » */
  readonly invoice?: Invoice;
  /** Optional. Message is a shared location, information about the location */
  readonly location?: Location;
  /** Optional. Message is a native poll, information about the poll */
  readonly poll?: Poll;
  /** Optional. Message is a venue, information about the venue */
  readonly venue?: Venue;
  readonly [key: string]: unknown;
}
const _ExternalReplyInfoPublicKeys = { message_id: "messageId", link_preview_options: "linkPreviewOptions", live_photo: "livePhoto", paid_media: "paidMedia", video_note: "videoNote", has_media_spoiler: "hasMediaSpoiler", giveaway_winners: "giveawayWinners" } as const;
const _ExternalReplyInfoWireKeys = invertKeys(_ExternalReplyInfoPublicKeys);
const _ExternalReplyInfoEncoded = Schema.StructWithRest(
  Schema.Struct({
    origin: Schema.suspend((): Schema.Codec<MessageOrigin, unknown> => MessageOrigin),
    chat: Schema.optionalKey(Schema.suspend((): Schema.Codec<Chat, unknown> => Chat)),
    message_id: Schema.optionalKey(Schema.Int),
    link_preview_options: Schema.optionalKey(Schema.suspend((): Schema.Codec<LinkPreviewOptions, unknown> => LinkPreviewOptions)),
    animation: Schema.optionalKey(Schema.suspend((): Schema.Codec<Animation, unknown> => Animation)),
    audio: Schema.optionalKey(Schema.suspend((): Schema.Codec<Audio, unknown> => Audio)),
    document: Schema.optionalKey(Schema.suspend((): Schema.Codec<Document, unknown> => Document)),
    live_photo: Schema.optionalKey(Schema.suspend((): Schema.Codec<LivePhoto, unknown> => LivePhoto)),
    paid_media: Schema.optionalKey(Schema.suspend((): Schema.Codec<PaidMediaInfo, unknown> => PaidMediaInfo)),
    photo: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<PhotoSize, unknown> => PhotoSize))),
    sticker: Schema.optionalKey(Schema.suspend((): Schema.Codec<Sticker, unknown> => Sticker)),
    story: Schema.optionalKey(Schema.suspend((): Schema.Codec<Story, unknown> => Story)),
    video: Schema.optionalKey(Schema.suspend((): Schema.Codec<Video, unknown> => Video)),
    video_note: Schema.optionalKey(Schema.suspend((): Schema.Codec<VideoNote, unknown> => VideoNote)),
    voice: Schema.optionalKey(Schema.suspend((): Schema.Codec<Voice, unknown> => Voice)),
    has_media_spoiler: Schema.optionalKey(Schema.Literal(true)),
    checklist: Schema.optionalKey(Schema.suspend((): Schema.Codec<Checklist, unknown> => Checklist)),
    contact: Schema.optionalKey(Schema.suspend((): Schema.Codec<Contact, unknown> => Contact)),
    dice: Schema.optionalKey(Schema.suspend((): Schema.Codec<Dice, unknown> => Dice)),
    game: Schema.optionalKey(Schema.suspend((): Schema.Codec<Game, unknown> => Game)),
    giveaway: Schema.optionalKey(Schema.suspend((): Schema.Codec<Giveaway, unknown> => Giveaway)),
    giveaway_winners: Schema.optionalKey(Schema.suspend((): Schema.Codec<GiveawayWinners, unknown> => GiveawayWinners)),
    invoice: Schema.optionalKey(Schema.suspend((): Schema.Codec<Invoice, unknown> => Invoice)),
    location: Schema.optionalKey(Schema.suspend((): Schema.Codec<Location, unknown> => Location)),
    poll: Schema.optionalKey(Schema.suspend((): Schema.Codec<Poll, unknown> => Poll)),
    venue: Schema.optionalKey(Schema.suspend((): Schema.Codec<Venue, unknown> => Venue)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _ExternalReplyInfoDecoded = Schema.declare<ExternalReplyInfo>((input): input is ExternalReplyInfo => Predicate.isObject(input));
export const ExternalReplyInfo: Schema.Codec<ExternalReplyInfo, unknown> = _ExternalReplyInfoEncoded.pipe(
  Schema.decodeTo(_ExternalReplyInfoDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_ExternalReplyInfoPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_ExternalReplyInfoWireKeys)),
  }),
);

/** This object represents a file ready to be downloaded. The file can be downloaded via the link https://api.telegram.org/file/bot<token>/<file_path>. It is guaranteed that the link will be valid for at least 1 hour. When the link expires, a new one can be requested by calling getFile. */
export interface File {
  /** Identifier for this file, which can be used to download or reuse the file */
  readonly fileId: string;
  /** Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file. */
  readonly fileUniqueId: string;
  /** Optional. File size in bytes. It can be bigger than 2^31 and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a signed 64-bit integer or double-precision float type are safe for storing this value. */
  readonly fileSize?: number;
  /** Optional. File path. Use https://api.telegram.org/file/bot<token>/<file_path> to get the file. */
  readonly filePath?: string;
  readonly [key: string]: unknown;
}
const _FilePublicKeys = { file_id: "fileId", file_unique_id: "fileUniqueId", file_size: "fileSize", file_path: "filePath" } as const;
const _FileWireKeys = invertKeys(_FilePublicKeys);
const _FileEncoded = Schema.StructWithRest(
  Schema.Struct({
    file_id: Schema.String,
    file_unique_id: Schema.String,
    file_size: Schema.optionalKey(Schema.Int),
    file_path: Schema.optionalKey(Schema.String),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _FileDecoded = Schema.declare<File>((input): input is File => Predicate.isObject(input));
export const File: Schema.Codec<File, unknown> = _FileEncoded.pipe(
  Schema.decodeTo(_FileDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_FilePublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_FileWireKeys)),
  }),
);

/** Upon receiving a message with this object, Telegram clients will display a reply interface to the user (act as if the user has selected the bot's message and tapped 'Reply'). This can be extremely useful if you want to create user-friendly step-by-step interfaces without having to sacrifice privacy mode. Not supported in channels and for messages sent on behalf of a user account. */
export interface ForceReply {
  /** Shows reply interface to the user, as if they had manually selected the bot's message and tapped 'Reply' */
  readonly forceReply: true;
  /** Optional. The placeholder to be shown in the input field when the reply is active; 1-64 characters */
  readonly inputFieldPlaceholder?: string;
  /** Optional. Use this parameter if you want to force reply from specific users only. Targets: 1) users that are @mentioned in the text of the Message object; 2) if the bot's message is a reply to a message in the same chat and forum topic, sender of the original message. */
  readonly selective?: boolean;
  readonly [key: string]: unknown;
}
const _ForceReplyPublicKeys = { force_reply: "forceReply", input_field_placeholder: "inputFieldPlaceholder" } as const;
const _ForceReplyWireKeys = invertKeys(_ForceReplyPublicKeys);
const _ForceReplyEncoded = Schema.StructWithRest(
  Schema.Struct({
    force_reply: Schema.Literal(true),
    input_field_placeholder: Schema.optionalKey(Schema.String),
    selective: Schema.optionalKey(Schema.Boolean),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _ForceReplyDecoded = Schema.declare<ForceReply>((input): input is ForceReply => Predicate.isObject(input));
export const ForceReply: Schema.Codec<ForceReply, unknown> = _ForceReplyEncoded.pipe(
  Schema.decodeTo(_ForceReplyDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_ForceReplyPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_ForceReplyWireKeys)),
  }),
);

/** This object represents a forum topic. */
export interface ForumTopic {
  /** Unique identifier of the forum topic */
  readonly messageThreadId: number;
  /** Name of the topic */
  readonly name: string;
  /** Color of the topic icon in RGB format */
  readonly iconColor: number;
  /** Optional. Unique identifier of the custom emoji shown as the topic icon */
  readonly iconCustomEmojiId?: string;
  /** Optional. True, if the name of the topic wasn't specified explicitly by its creator and likely needs to be changed by the bot */
  readonly isNameImplicit?: true;
  readonly [key: string]: unknown;
}
const _ForumTopicPublicKeys = { message_thread_id: "messageThreadId", icon_color: "iconColor", icon_custom_emoji_id: "iconCustomEmojiId", is_name_implicit: "isNameImplicit" } as const;
const _ForumTopicWireKeys = invertKeys(_ForumTopicPublicKeys);
const _ForumTopicEncoded = Schema.StructWithRest(
  Schema.Struct({
    message_thread_id: Schema.Int,
    name: Schema.String,
    icon_color: Schema.Int,
    icon_custom_emoji_id: Schema.optionalKey(Schema.String),
    is_name_implicit: Schema.optionalKey(Schema.Literal(true)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _ForumTopicDecoded = Schema.declare<ForumTopic>((input): input is ForumTopic => Predicate.isObject(input));
export const ForumTopic: Schema.Codec<ForumTopic, unknown> = _ForumTopicEncoded.pipe(
  Schema.decodeTo(_ForumTopicDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_ForumTopicPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_ForumTopicWireKeys)),
  }),
);

/** This object represents a service message about a forum topic closed in the chat. Currently holds no information. */
export interface ForumTopicClosed {
  readonly [key: string]: unknown;
}
export const ForumTopicClosed: Schema.Codec<ForumTopicClosed, unknown> = Schema.StructWithRest(
  Schema.Struct({}),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object represents a service message about a new forum topic created in the chat. */
export interface ForumTopicCreated {
  /** Name of the topic */
  readonly name: string;
  /** Color of the topic icon in RGB format */
  readonly iconColor: number;
  /** Optional. Unique identifier of the custom emoji shown as the topic icon */
  readonly iconCustomEmojiId?: string;
  /** Optional. True, if the name of the topic wasn't specified explicitly by its creator and likely needs to be changed by the bot */
  readonly isNameImplicit?: true;
  readonly [key: string]: unknown;
}
const _ForumTopicCreatedPublicKeys = { icon_color: "iconColor", icon_custom_emoji_id: "iconCustomEmojiId", is_name_implicit: "isNameImplicit" } as const;
const _ForumTopicCreatedWireKeys = invertKeys(_ForumTopicCreatedPublicKeys);
const _ForumTopicCreatedEncoded = Schema.StructWithRest(
  Schema.Struct({
    name: Schema.String,
    icon_color: Schema.Int,
    icon_custom_emoji_id: Schema.optionalKey(Schema.String),
    is_name_implicit: Schema.optionalKey(Schema.Literal(true)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _ForumTopicCreatedDecoded = Schema.declare<ForumTopicCreated>((input): input is ForumTopicCreated => Predicate.isObject(input));
export const ForumTopicCreated: Schema.Codec<ForumTopicCreated, unknown> = _ForumTopicCreatedEncoded.pipe(
  Schema.decodeTo(_ForumTopicCreatedDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_ForumTopicCreatedPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_ForumTopicCreatedWireKeys)),
  }),
);

/** This object represents a service message about an edited forum topic. */
export interface ForumTopicEdited {
  /** Optional. New name of the topic, if it was edited */
  readonly name?: string;
  /** Optional. New identifier of the custom emoji shown as the topic icon, if it was edited; an empty string if the icon was removed */
  readonly iconCustomEmojiId?: string;
  readonly [key: string]: unknown;
}
const _ForumTopicEditedPublicKeys = { icon_custom_emoji_id: "iconCustomEmojiId" } as const;
const _ForumTopicEditedWireKeys = invertKeys(_ForumTopicEditedPublicKeys);
const _ForumTopicEditedEncoded = Schema.StructWithRest(
  Schema.Struct({
    name: Schema.optionalKey(Schema.String),
    icon_custom_emoji_id: Schema.optionalKey(Schema.String),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _ForumTopicEditedDecoded = Schema.declare<ForumTopicEdited>((input): input is ForumTopicEdited => Predicate.isObject(input));
export const ForumTopicEdited: Schema.Codec<ForumTopicEdited, unknown> = _ForumTopicEditedEncoded.pipe(
  Schema.decodeTo(_ForumTopicEditedDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_ForumTopicEditedPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_ForumTopicEditedWireKeys)),
  }),
);

/** This object represents a service message about a forum topic reopened in the chat. Currently holds no information. */
export interface ForumTopicReopened {
  readonly [key: string]: unknown;
}
export const ForumTopicReopened: Schema.Codec<ForumTopicReopened, unknown> = Schema.StructWithRest(
  Schema.Struct({}),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object represents a game. Use BotFather to create and edit games, their short names will act as unique identifiers. */
export interface Game {
  /** Title of the game */
  readonly title: string;
  /** Description of the game */
  readonly description: string;
  /** Photo that will be displayed in the game message in chats */
  readonly photo: ReadonlyArray<PhotoSize>;
  /** Optional. Brief description of the game or high scores included in the game message. Can be automatically edited to include current high scores for the game when the bot calls setGameScore, or manually edited using editMessageText. 0-4096 characters. */
  readonly text?: string;
  /** Optional. Special entities that appear in text, such as usernames, URLs, bot commands, etc. */
  readonly textEntities?: ReadonlyArray<MessageEntity>;
  /** Optional. Animation that will be displayed in the game message in chats. Upload via BotFather. */
  readonly animation?: Animation;
  readonly [key: string]: unknown;
}
const _GamePublicKeys = { text_entities: "textEntities" } as const;
const _GameWireKeys = invertKeys(_GamePublicKeys);
const _GameEncoded = Schema.StructWithRest(
  Schema.Struct({
    title: Schema.String,
    description: Schema.String,
    photo: Schema.Array(Schema.suspend((): Schema.Codec<PhotoSize, unknown> => PhotoSize)),
    text: Schema.optionalKey(Schema.String),
    text_entities: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<MessageEntity, unknown> => MessageEntity))),
    animation: Schema.optionalKey(Schema.suspend((): Schema.Codec<Animation, unknown> => Animation)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _GameDecoded = Schema.declare<Game>((input): input is Game => Predicate.isObject(input));
export const Game: Schema.Codec<Game, unknown> = _GameEncoded.pipe(
  Schema.decodeTo(_GameDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_GamePublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_GameWireKeys)),
  }),
);

/** This object represents one row of the high scores table for a game. */
export interface GameHighScore {
  /** Position in high score table for the game */
  readonly position: number;
  /** User */
  readonly user: User;
  /** Score */
  readonly score: number;
  readonly [key: string]: unknown;
}
export const GameHighScore: Schema.Codec<GameHighScore, unknown> = Schema.StructWithRest(
  Schema.Struct({
    position: Schema.Int,
    user: Schema.suspend((): Schema.Codec<User, unknown> => User),
    score: Schema.Int,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object represents a service message about General forum topic hidden in the chat. Currently holds no information. */
export interface GeneralForumTopicHidden {
  readonly [key: string]: unknown;
}
export const GeneralForumTopicHidden: Schema.Codec<GeneralForumTopicHidden, unknown> = Schema.StructWithRest(
  Schema.Struct({}),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object represents a service message about General forum topic unhidden in the chat. Currently holds no information. */
export interface GeneralForumTopicUnhidden {
  readonly [key: string]: unknown;
}
export const GeneralForumTopicUnhidden: Schema.Codec<GeneralForumTopicUnhidden, unknown> = Schema.StructWithRest(
  Schema.Struct({}),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object represents a gift that can be sent by the bot. */
export interface Gift {
  /** Unique identifier of the gift */
  readonly id: string;
  /** The sticker that represents the gift */
  readonly sticker: Sticker;
  /** The number of Telegram Stars that must be paid to send the sticker */
  readonly starCount: number;
  /** Optional. The number of Telegram Stars that must be paid to upgrade the gift to a unique one */
  readonly upgradeStarCount?: number;
  /** Optional. True, if the gift can only be purchased by Telegram Premium subscribers */
  readonly isPremium?: true;
  /** Optional. True, if the gift can be used (after being upgraded) to customize a user's appearance */
  readonly hasColors?: true;
  /** Optional. The total number of gifts of this type that can be sent by all users; for limited gifts only */
  readonly totalCount?: number;
  /** Optional. The number of remaining gifts of this type that can be sent by all users; for limited gifts only */
  readonly remainingCount?: number;
  /** Optional. The total number of gifts of this type that can be sent by the bot; for limited gifts only */
  readonly personalTotalCount?: number;
  /** Optional. The number of remaining gifts of this type that can be sent by the bot; for limited gifts only */
  readonly personalRemainingCount?: number;
  /** Optional. Background of the gift */
  readonly background?: GiftBackground;
  /** Optional. The total number of different unique gifts that can be obtained by upgrading the gift */
  readonly uniqueGiftVariantCount?: number;
  /** Optional. Information about the chat that published the gift */
  readonly publisherChat?: Chat;
  readonly [key: string]: unknown;
}
const _GiftPublicKeys = { star_count: "starCount", upgrade_star_count: "upgradeStarCount", is_premium: "isPremium", has_colors: "hasColors", total_count: "totalCount", remaining_count: "remainingCount", personal_total_count: "personalTotalCount", personal_remaining_count: "personalRemainingCount", unique_gift_variant_count: "uniqueGiftVariantCount", publisher_chat: "publisherChat" } as const;
const _GiftWireKeys = invertKeys(_GiftPublicKeys);
const _GiftEncoded = Schema.StructWithRest(
  Schema.Struct({
    id: Schema.String,
    sticker: Schema.suspend((): Schema.Codec<Sticker, unknown> => Sticker),
    star_count: Schema.Int,
    upgrade_star_count: Schema.optionalKey(Schema.Int),
    is_premium: Schema.optionalKey(Schema.Literal(true)),
    has_colors: Schema.optionalKey(Schema.Literal(true)),
    total_count: Schema.optionalKey(Schema.Int),
    remaining_count: Schema.optionalKey(Schema.Int),
    personal_total_count: Schema.optionalKey(Schema.Int),
    personal_remaining_count: Schema.optionalKey(Schema.Int),
    background: Schema.optionalKey(Schema.suspend((): Schema.Codec<GiftBackground, unknown> => GiftBackground)),
    unique_gift_variant_count: Schema.optionalKey(Schema.Int),
    publisher_chat: Schema.optionalKey(Schema.suspend((): Schema.Codec<Chat, unknown> => Chat)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _GiftDecoded = Schema.declare<Gift>((input): input is Gift => Predicate.isObject(input));
export const Gift: Schema.Codec<Gift, unknown> = _GiftEncoded.pipe(
  Schema.decodeTo(_GiftDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_GiftPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_GiftWireKeys)),
  }),
);

/** This object describes the background of a gift. */
export interface GiftBackground {
  /** Center color of the background in RGB format */
  readonly centerColor: number;
  /** Edge color of the background in RGB format */
  readonly edgeColor: number;
  /** Text color of the background in RGB format */
  readonly textColor: number;
  readonly [key: string]: unknown;
}
const _GiftBackgroundPublicKeys = { center_color: "centerColor", edge_color: "edgeColor", text_color: "textColor" } as const;
const _GiftBackgroundWireKeys = invertKeys(_GiftBackgroundPublicKeys);
const _GiftBackgroundEncoded = Schema.StructWithRest(
  Schema.Struct({
    center_color: Schema.Int,
    edge_color: Schema.Int,
    text_color: Schema.Int,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _GiftBackgroundDecoded = Schema.declare<GiftBackground>((input): input is GiftBackground => Predicate.isObject(input));
export const GiftBackground: Schema.Codec<GiftBackground, unknown> = _GiftBackgroundEncoded.pipe(
  Schema.decodeTo(_GiftBackgroundDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_GiftBackgroundPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_GiftBackgroundWireKeys)),
  }),
);

/** Describes a service message about a regular gift that was sent or received. */
export interface GiftInfo {
  /** Information about the gift */
  readonly gift: Gift;
  /** Optional. Unique identifier of the received gift for the bot; only present for gifts received on behalf of business accounts */
  readonly ownedGiftId?: string;
  /** Optional. Number of Telegram Stars that can be claimed by the receiver by converting the gift; omitted if conversion to Telegram Stars is impossible */
  readonly convertStarCount?: number;
  /** Optional. Number of Telegram Stars that were prepaid for the ability to upgrade the gift */
  readonly prepaidUpgradeStarCount?: number;
  /** Optional. True, if the gift's upgrade was purchased after the gift was sent */
  readonly isUpgradeSeparate?: true;
  /** Optional. True, if the gift can be upgraded to a unique gift */
  readonly canBeUpgraded?: true;
  /** Optional. Text of the message that was added to the gift */
  readonly text?: string;
  /** Optional. Special entities that appear in the text */
  readonly entities?: ReadonlyArray<MessageEntity>;
  /** Optional. True, if the sender and gift text are shown only to the gift receiver; otherwise, everyone will be able to see them */
  readonly isPrivate?: true;
  /** Optional. Unique number reserved for this gift when upgraded. See the number field in UniqueGift. */
  readonly uniqueGiftNumber?: number;
  readonly [key: string]: unknown;
}
const _GiftInfoPublicKeys = { owned_gift_id: "ownedGiftId", convert_star_count: "convertStarCount", prepaid_upgrade_star_count: "prepaidUpgradeStarCount", is_upgrade_separate: "isUpgradeSeparate", can_be_upgraded: "canBeUpgraded", is_private: "isPrivate", unique_gift_number: "uniqueGiftNumber" } as const;
const _GiftInfoWireKeys = invertKeys(_GiftInfoPublicKeys);
const _GiftInfoEncoded = Schema.StructWithRest(
  Schema.Struct({
    gift: Schema.suspend((): Schema.Codec<Gift, unknown> => Gift),
    owned_gift_id: Schema.optionalKey(Schema.String),
    convert_star_count: Schema.optionalKey(Schema.Int),
    prepaid_upgrade_star_count: Schema.optionalKey(Schema.Int),
    is_upgrade_separate: Schema.optionalKey(Schema.Literal(true)),
    can_be_upgraded: Schema.optionalKey(Schema.Literal(true)),
    text: Schema.optionalKey(Schema.String),
    entities: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<MessageEntity, unknown> => MessageEntity))),
    is_private: Schema.optionalKey(Schema.Literal(true)),
    unique_gift_number: Schema.optionalKey(Schema.Int),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _GiftInfoDecoded = Schema.declare<GiftInfo>((input): input is GiftInfo => Predicate.isObject(input));
export const GiftInfo: Schema.Codec<GiftInfo, unknown> = _GiftInfoEncoded.pipe(
  Schema.decodeTo(_GiftInfoDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_GiftInfoPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_GiftInfoWireKeys)),
  }),
);

/** This object represent a list of gifts. */
export interface Gifts {
  /** The list of gifts */
  readonly gifts: ReadonlyArray<Gift>;
  readonly [key: string]: unknown;
}
export const Gifts: Schema.Codec<Gifts, unknown> = Schema.StructWithRest(
  Schema.Struct({
    gifts: Schema.Array(Schema.suspend((): Schema.Codec<Gift, unknown> => Gift)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object represents a message about a scheduled giveaway. */
export interface Giveaway {
  /** The list of chats which the user must join to participate in the giveaway */
  readonly chats: ReadonlyArray<Chat>;
  /** Point in time (Unix timestamp) when winners of the giveaway will be selected */
  readonly winnersSelectionDate: number;
  /** The number of users which are supposed to be selected as winners of the giveaway */
  readonly winnerCount: number;
  /** Optional. True, if only users who join the chats after the giveaway started should be eligible to win */
  readonly onlyNewMembers?: true;
  /** Optional. True, if the list of giveaway winners will be visible to everyone */
  readonly hasPublicWinners?: true;
  /** Optional. Description of additional giveaway prize */
  readonly prizeDescription?: string;
  /** Optional. A list of two-letter ISO 3166-1 alpha-2 country codes indicating the countries from which eligible users for the giveaway must come. If empty, then all users can participate in the giveaway. Users with a phone number that was bought on Fragment can always participate in giveaways. */
  readonly countryCodes?: ReadonlyArray<string>;
  /** Optional. The number of Telegram Stars to be split between giveaway winners; for Telegram Star giveaways only */
  readonly prizeStarCount?: number;
  /** Optional. The number of months the Telegram Premium subscription won from the giveaway will be active for; for Telegram Premium giveaways only */
  readonly premiumSubscriptionMonthCount?: number;
  readonly [key: string]: unknown;
}
const _GiveawayPublicKeys = { winners_selection_date: "winnersSelectionDate", winner_count: "winnerCount", only_new_members: "onlyNewMembers", has_public_winners: "hasPublicWinners", prize_description: "prizeDescription", country_codes: "countryCodes", prize_star_count: "prizeStarCount", premium_subscription_month_count: "premiumSubscriptionMonthCount" } as const;
const _GiveawayWireKeys = invertKeys(_GiveawayPublicKeys);
const _GiveawayEncoded = Schema.StructWithRest(
  Schema.Struct({
    chats: Schema.Array(Schema.suspend((): Schema.Codec<Chat, unknown> => Chat)),
    winners_selection_date: Schema.Int,
    winner_count: Schema.Int,
    only_new_members: Schema.optionalKey(Schema.Literal(true)),
    has_public_winners: Schema.optionalKey(Schema.Literal(true)),
    prize_description: Schema.optionalKey(Schema.String),
    country_codes: Schema.optionalKey(Schema.Array(Schema.String)),
    prize_star_count: Schema.optionalKey(Schema.Int),
    premium_subscription_month_count: Schema.optionalKey(Schema.Int),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _GiveawayDecoded = Schema.declare<Giveaway>((input): input is Giveaway => Predicate.isObject(input));
export const Giveaway: Schema.Codec<Giveaway, unknown> = _GiveawayEncoded.pipe(
  Schema.decodeTo(_GiveawayDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_GiveawayPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_GiveawayWireKeys)),
  }),
);

/** This object represents a service message about the completion of a giveaway without public winners. */
export interface GiveawayCompleted {
  /** Number of winners in the giveaway */
  readonly winnerCount: number;
  /** Optional. Number of undistributed prizes */
  readonly unclaimedPrizeCount?: number;
  /** Optional. Message with the giveaway that was completed, if it wasn't deleted */
  readonly giveawayMessage?: Message;
  /** Optional. True, if the giveaway is a Telegram Star giveaway. Otherwise, currently, the giveaway is a Telegram Premium giveaway. */
  readonly isStarGiveaway?: true;
  readonly [key: string]: unknown;
}
const _GiveawayCompletedPublicKeys = { winner_count: "winnerCount", unclaimed_prize_count: "unclaimedPrizeCount", giveaway_message: "giveawayMessage", is_star_giveaway: "isStarGiveaway" } as const;
const _GiveawayCompletedWireKeys = invertKeys(_GiveawayCompletedPublicKeys);
const _GiveawayCompletedEncoded = Schema.StructWithRest(
  Schema.Struct({
    winner_count: Schema.Int,
    unclaimed_prize_count: Schema.optionalKey(Schema.Int),
    giveaway_message: Schema.optionalKey(Schema.suspend((): Schema.Codec<Message, unknown> => Message)),
    is_star_giveaway: Schema.optionalKey(Schema.Literal(true)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _GiveawayCompletedDecoded = Schema.declare<GiveawayCompleted>((input): input is GiveawayCompleted => Predicate.isObject(input));
export const GiveawayCompleted: Schema.Codec<GiveawayCompleted, unknown> = _GiveawayCompletedEncoded.pipe(
  Schema.decodeTo(_GiveawayCompletedDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_GiveawayCompletedPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_GiveawayCompletedWireKeys)),
  }),
);

/** This object represents a service message about the creation of a scheduled giveaway. */
export interface GiveawayCreated {
  /** Optional. The number of Telegram Stars to be split between giveaway winners; for Telegram Star giveaways only */
  readonly prizeStarCount?: number;
  readonly [key: string]: unknown;
}
const _GiveawayCreatedPublicKeys = { prize_star_count: "prizeStarCount" } as const;
const _GiveawayCreatedWireKeys = invertKeys(_GiveawayCreatedPublicKeys);
const _GiveawayCreatedEncoded = Schema.StructWithRest(
  Schema.Struct({
    prize_star_count: Schema.optionalKey(Schema.Int),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _GiveawayCreatedDecoded = Schema.declare<GiveawayCreated>((input): input is GiveawayCreated => Predicate.isObject(input));
export const GiveawayCreated: Schema.Codec<GiveawayCreated, unknown> = _GiveawayCreatedEncoded.pipe(
  Schema.decodeTo(_GiveawayCreatedDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_GiveawayCreatedPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_GiveawayCreatedWireKeys)),
  }),
);

/** This object represents a message about the completion of a giveaway with public winners. */
export interface GiveawayWinners {
  /** The chat that created the giveaway */
  readonly chat: Chat;
  /** Identifier of the message with the giveaway in the chat */
  readonly giveawayMessageId: number;
  /** Point in time (Unix timestamp) when winners of the giveaway were selected */
  readonly winnersSelectionDate: number;
  /** Total number of winners in the giveaway */
  readonly winnerCount: number;
  /** List of up to 100 winners of the giveaway */
  readonly winners: ReadonlyArray<User>;
  /** Optional. The number of other chats the user had to join in order to be eligible for the giveaway */
  readonly additionalChatCount?: number;
  /** Optional. The number of Telegram Stars that were split between giveaway winners; for Telegram Star giveaways only */
  readonly prizeStarCount?: number;
  /** Optional. The number of months the Telegram Premium subscription won from the giveaway will be active for; for Telegram Premium giveaways only */
  readonly premiumSubscriptionMonthCount?: number;
  /** Optional. Number of undistributed prizes */
  readonly unclaimedPrizeCount?: number;
  /** Optional. True, if only users who had joined the chats after the giveaway started were eligible to win */
  readonly onlyNewMembers?: true;
  /** Optional. True, if the giveaway was canceled because the payment for it was refunded */
  readonly wasRefunded?: true;
  /** Optional. Description of additional giveaway prize */
  readonly prizeDescription?: string;
  readonly [key: string]: unknown;
}
const _GiveawayWinnersPublicKeys = { giveaway_message_id: "giveawayMessageId", winners_selection_date: "winnersSelectionDate", winner_count: "winnerCount", additional_chat_count: "additionalChatCount", prize_star_count: "prizeStarCount", premium_subscription_month_count: "premiumSubscriptionMonthCount", unclaimed_prize_count: "unclaimedPrizeCount", only_new_members: "onlyNewMembers", was_refunded: "wasRefunded", prize_description: "prizeDescription" } as const;
const _GiveawayWinnersWireKeys = invertKeys(_GiveawayWinnersPublicKeys);
const _GiveawayWinnersEncoded = Schema.StructWithRest(
  Schema.Struct({
    chat: Schema.suspend((): Schema.Codec<Chat, unknown> => Chat),
    giveaway_message_id: Schema.Int,
    winners_selection_date: Schema.Int,
    winner_count: Schema.Int,
    winners: Schema.Array(Schema.suspend((): Schema.Codec<User, unknown> => User)),
    additional_chat_count: Schema.optionalKey(Schema.Int),
    prize_star_count: Schema.optionalKey(Schema.Int),
    premium_subscription_month_count: Schema.optionalKey(Schema.Int),
    unclaimed_prize_count: Schema.optionalKey(Schema.Int),
    only_new_members: Schema.optionalKey(Schema.Literal(true)),
    was_refunded: Schema.optionalKey(Schema.Literal(true)),
    prize_description: Schema.optionalKey(Schema.String),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _GiveawayWinnersDecoded = Schema.declare<GiveawayWinners>((input): input is GiveawayWinners => Predicate.isObject(input));
export const GiveawayWinners: Schema.Codec<GiveawayWinners, unknown> = _GiveawayWinnersEncoded.pipe(
  Schema.decodeTo(_GiveawayWinnersDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_GiveawayWinnersPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_GiveawayWinnersWireKeys)),
  }),
);

/** This object describes a message that was deleted or is otherwise inaccessible to the bot. */
export interface InaccessibleMessage {
  /** Chat the message belonged to */
  readonly chat: Chat;
  /** Unique message identifier inside the chat */
  readonly messageId: number;
  /** Always 0. The field can be used to differentiate regular and inaccessible messages. */
  readonly date: number;
  readonly [key: string]: unknown;
}
const _InaccessibleMessagePublicKeys = { message_id: "messageId" } as const;
const _InaccessibleMessageWireKeys = invertKeys(_InaccessibleMessagePublicKeys);
const _InaccessibleMessageEncoded = Schema.StructWithRest(
  Schema.Struct({
    chat: Schema.suspend((): Schema.Codec<Chat, unknown> => Chat),
    message_id: Schema.Int,
    date: Schema.Int,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _InaccessibleMessageDecoded = Schema.declare<InaccessibleMessage>((input): input is InaccessibleMessage => Predicate.isObject(input));
export const InaccessibleMessage: Schema.Codec<InaccessibleMessage, unknown> = _InaccessibleMessageEncoded.pipe(
  Schema.decodeTo(_InaccessibleMessageDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_InaccessibleMessagePublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_InaccessibleMessageWireKeys)),
  }),
);

/** This object represents one button of an inline keyboard. Exactly one of the fields other than text, icon_custom_emoji_id, and style must be used to specify the type of the button. */
export interface InlineKeyboardButton {
  /** Label text on the button */
  readonly text: string;
  /** Optional. Unique identifier of the custom emoji shown before the text of the button. Can only be used by bots that purchased additional usernames on Fragment or in the messages directly sent by the bot to private, group and supergroup chats if the owner of the bot has a Telegram Premium subscription. */
  readonly iconCustomEmojiId?: string;
  /** Optional. Style of the button. Must be one of “danger” (red), “success” (green) or “primary” (blue). If omitted, then an app-specific style is used. */
  readonly style?: string;
  /** Optional. HTTP or tg:// URL to be opened when the button is pressed. Links tg://user?id=<user_id> can be used to mention a user by their identifier without using a username, if this is allowed by their privacy settings. */
  readonly url?: string;
  /** Optional. Data to be sent in a callback query to the bot when the button is pressed, 1-64 bytes */
  readonly callbackData?: string;
  /** Optional. Description of the Web App that will be launched when the user presses the button. The Web App will be able to send an arbitrary message on behalf of the user using the method answerWebAppQuery. Available only in private chats between a user and the bot. Not supported for messages sent on behalf of a business account. */
  readonly webApp?: WebAppInfo;
  /** Optional. An HTTPS URL used to automatically authorize the user. Can be used as a replacement for the Telegram Login Widget. Not supported for ephemeral messages. */
  readonly loginUrl?: LoginUrl;
  /** Optional. If set, pressing the button will prompt the user to select one of their chats, open that chat and insert the bot's username and the specified inline query in the input field. May be empty, in which case just the bot's username will be inserted. Not supported for messages sent in channel direct messages chats and on behalf of a business account. */
  readonly switchInlineQuery?: string;
  /** Optional. If set, pressing the button will insert the bot's username and the specified inline query in the current chat's input field. May be empty, in which case only the bot's username will be inserted.

This offers a quick way for the user to open your bot in inline mode in the same chat - good for selecting something from multiple options. Not supported in channels and for messages sent in channel direct messages chats and on behalf of a business account. */
  readonly switchInlineQueryCurrentChat?: string;
  /** Optional. If set, pressing the button will prompt the user to select one of their chats of the specified type, open that chat and insert the bot's username and the specified inline query in the input field. Not supported for messages sent in channel direct messages chats and on behalf of a business account. */
  readonly switchInlineQueryChosenChat?: SwitchInlineQueryChosenChat;
  /** Optional. Description of the button that copies the specified text to the clipboard */
  readonly copyText?: CopyTextButton;
  /** Optional. Description of the game that will be launched when the user presses the button.

NOTE: This type of button must always be the first button in the first row. */
  readonly callbackGame?: CallbackGame;
  /** Optional. Specify True, to send a Pay button. Substrings “⭐” and “XTR” in the buttons's text will be replaced with a Telegram Star icon.

NOTE: This type of button must always be the first button in the first row and can only be used in invoice messages. */
  readonly pay?: boolean;
  /** Optional. If set, then the button is disabled and does nothing */
  readonly disabled?: DisabledButton;
  readonly [key: string]: unknown;
}
const _InlineKeyboardButtonPublicKeys = { icon_custom_emoji_id: "iconCustomEmojiId", callback_data: "callbackData", web_app: "webApp", login_url: "loginUrl", switch_inline_query: "switchInlineQuery", switch_inline_query_current_chat: "switchInlineQueryCurrentChat", switch_inline_query_chosen_chat: "switchInlineQueryChosenChat", copy_text: "copyText", callback_game: "callbackGame" } as const;
const _InlineKeyboardButtonWireKeys = invertKeys(_InlineKeyboardButtonPublicKeys);
const _InlineKeyboardButtonEncoded = Schema.StructWithRest(
  Schema.Struct({
    text: Schema.String,
    icon_custom_emoji_id: Schema.optionalKey(Schema.String),
    style: Schema.optionalKey(Schema.String),
    url: Schema.optionalKey(Schema.String),
    callback_data: Schema.optionalKey(Schema.String),
    web_app: Schema.optionalKey(Schema.suspend((): Schema.Codec<WebAppInfo, unknown> => WebAppInfo)),
    login_url: Schema.optionalKey(Schema.suspend((): Schema.Codec<LoginUrl, unknown> => LoginUrl)),
    switch_inline_query: Schema.optionalKey(Schema.String),
    switch_inline_query_current_chat: Schema.optionalKey(Schema.String),
    switch_inline_query_chosen_chat: Schema.optionalKey(Schema.suspend((): Schema.Codec<SwitchInlineQueryChosenChat, unknown> => SwitchInlineQueryChosenChat)),
    copy_text: Schema.optionalKey(Schema.suspend((): Schema.Codec<CopyTextButton, unknown> => CopyTextButton)),
    callback_game: Schema.optionalKey(Schema.suspend((): Schema.Codec<CallbackGame, unknown> => CallbackGame)),
    pay: Schema.optionalKey(Schema.Boolean),
    disabled: Schema.optionalKey(Schema.suspend((): Schema.Codec<DisabledButton, unknown> => DisabledButton)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _InlineKeyboardButtonDecoded = Schema.declare<InlineKeyboardButton>((input): input is InlineKeyboardButton => Predicate.isObject(input));
export const InlineKeyboardButton: Schema.Codec<InlineKeyboardButton, unknown> = _InlineKeyboardButtonEncoded.pipe(
  Schema.decodeTo(_InlineKeyboardButtonDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_InlineKeyboardButtonPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_InlineKeyboardButtonWireKeys)),
  }),
);

/** This object represents an inline keyboard that appears right next to the message it belongs to. */
export interface InlineKeyboardMarkup {
  /** Array of button rows, each represented by an Array of InlineKeyboardButton objects */
  readonly inlineKeyboard: ReadonlyArray<ReadonlyArray<InlineKeyboardButton>>;
  /** Optional. Pass True if the reply interface must be shown to the user, as if they had manually selected the bot's message and tapped 'Reply'. The value of the field can't be changed when the inline keyboard is edited. */
  readonly forceReply?: boolean;
  readonly [key: string]: unknown;
}
const _InlineKeyboardMarkupPublicKeys = { inline_keyboard: "inlineKeyboard", force_reply: "forceReply" } as const;
const _InlineKeyboardMarkupWireKeys = invertKeys(_InlineKeyboardMarkupPublicKeys);
const _InlineKeyboardMarkupEncoded = Schema.StructWithRest(
  Schema.Struct({
    inline_keyboard: Schema.Array(Schema.Array(Schema.suspend((): Schema.Codec<InlineKeyboardButton, unknown> => InlineKeyboardButton))),
    force_reply: Schema.optionalKey(Schema.Boolean),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _InlineKeyboardMarkupDecoded = Schema.declare<InlineKeyboardMarkup>((input): input is InlineKeyboardMarkup => Predicate.isObject(input));
export const InlineKeyboardMarkup: Schema.Codec<InlineKeyboardMarkup, unknown> = _InlineKeyboardMarkupEncoded.pipe(
  Schema.decodeTo(_InlineKeyboardMarkupDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_InlineKeyboardMarkupPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_InlineKeyboardMarkupWireKeys)),
  }),
);

/** This object represents an incoming inline query. When the user sends an empty query, your bot could return some default or trending results. */
export interface InlineQuery {
  /** Unique identifier for this query */
  readonly id: string;
  /** Sender */
  readonly from: User;
  /** Text of the query (up to 256 characters) */
  readonly query: string;
  /** Offset of the results to be returned, can be controlled by the bot */
  readonly offset: string;
  /** Optional. Type of the chat from which the inline query was sent. Can be either “sender” for a private chat with the inline query sender, “private”, “group”, “supergroup”, or “channel”. The chat type should be always known for requests sent from official clients and most third-party clients, unless the request was sent from a secret chat. */
  readonly chatType?: InlineQueryChatType;
  /** Optional. Sender location, only for bots that request user location */
  readonly location?: Location;
  readonly [key: string]: unknown;
}
const _InlineQueryPublicKeys = { chat_type: "chatType" } as const;
const _InlineQueryWireKeys = invertKeys(_InlineQueryPublicKeys);
const _InlineQueryEncoded = Schema.StructWithRest(
  Schema.Struct({
    id: Schema.String,
    from: Schema.suspend((): Schema.Codec<User, unknown> => User),
    query: Schema.String,
    offset: Schema.String,
    chat_type: Schema.optionalKey(Schema.suspend((): Schema.Codec<InlineQueryChatType, unknown> => InlineQueryChatType)),
    location: Schema.optionalKey(Schema.suspend((): Schema.Codec<Location, unknown> => Location)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _InlineQueryDecoded = Schema.declare<InlineQuery>((input): input is InlineQuery => Predicate.isObject(input));
export const InlineQuery: Schema.Codec<InlineQuery, unknown> = _InlineQueryEncoded.pipe(
  Schema.decodeTo(_InlineQueryDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_InlineQueryPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_InlineQueryWireKeys)),
  }),
);

/** This object represents one result of an inline query. Telegram clients currently support results of the following 20 types: */
export type InlineQueryResult = InlineQueryResultCachedAudio | InlineQueryResultCachedDocument | InlineQueryResultCachedGif | InlineQueryResultCachedMpeg4Gif | InlineQueryResultCachedPhoto | InlineQueryResultCachedSticker | InlineQueryResultCachedVideo | InlineQueryResultCachedVoice | InlineQueryResultArticle | InlineQueryResultAudio | InlineQueryResultContact | InlineQueryResultGame | InlineQueryResultDocument | InlineQueryResultGif | InlineQueryResultLocation | InlineQueryResultMpeg4Gif | InlineQueryResultPhoto | InlineQueryResultVenue | InlineQueryResultVideo | InlineQueryResultVoice;
export const InlineQueryResult: Schema.Codec<InlineQueryResult, unknown> = Schema.Union([Schema.suspend((): Schema.Codec<InlineQueryResultCachedAudio, unknown> => InlineQueryResultCachedAudio), Schema.suspend((): Schema.Codec<InlineQueryResultCachedDocument, unknown> => InlineQueryResultCachedDocument), Schema.suspend((): Schema.Codec<InlineQueryResultCachedGif, unknown> => InlineQueryResultCachedGif), Schema.suspend((): Schema.Codec<InlineQueryResultCachedMpeg4Gif, unknown> => InlineQueryResultCachedMpeg4Gif), Schema.suspend((): Schema.Codec<InlineQueryResultCachedPhoto, unknown> => InlineQueryResultCachedPhoto), Schema.suspend((): Schema.Codec<InlineQueryResultCachedSticker, unknown> => InlineQueryResultCachedSticker), Schema.suspend((): Schema.Codec<InlineQueryResultCachedVideo, unknown> => InlineQueryResultCachedVideo), Schema.suspend((): Schema.Codec<InlineQueryResultCachedVoice, unknown> => InlineQueryResultCachedVoice), Schema.suspend((): Schema.Codec<InlineQueryResultArticle, unknown> => InlineQueryResultArticle), Schema.suspend((): Schema.Codec<InlineQueryResultAudio, unknown> => InlineQueryResultAudio), Schema.suspend((): Schema.Codec<InlineQueryResultContact, unknown> => InlineQueryResultContact), Schema.suspend((): Schema.Codec<InlineQueryResultGame, unknown> => InlineQueryResultGame), Schema.suspend((): Schema.Codec<InlineQueryResultDocument, unknown> => InlineQueryResultDocument), Schema.suspend((): Schema.Codec<InlineQueryResultGif, unknown> => InlineQueryResultGif), Schema.suspend((): Schema.Codec<InlineQueryResultLocation, unknown> => InlineQueryResultLocation), Schema.suspend((): Schema.Codec<InlineQueryResultMpeg4Gif, unknown> => InlineQueryResultMpeg4Gif), Schema.suspend((): Schema.Codec<InlineQueryResultPhoto, unknown> => InlineQueryResultPhoto), Schema.suspend((): Schema.Codec<InlineQueryResultVenue, unknown> => InlineQueryResultVenue), Schema.suspend((): Schema.Codec<InlineQueryResultVideo, unknown> => InlineQueryResultVideo), Schema.suspend((): Schema.Codec<InlineQueryResultVoice, unknown> => InlineQueryResultVoice)]);

/** Represents a link to an article or web page. */
export interface InlineQueryResultArticle {
  /** Type of the result, must be article */
  readonly type: "article";
  /** Unique identifier for this result, 1-64 Bytes */
  readonly id: string;
  /** Title of the result */
  readonly title: string;
  /** Content of the message to be sent */
  readonly inputMessageContent: InputMessageContent;
  /** Optional. Inline keyboard attached to the message */
  readonly replyMarkup?: InlineKeyboardMarkup;
  /** Optional. URL of the result */
  readonly url?: string;
  /** Optional. Short description of the result */
  readonly description?: string;
  /** Optional. Url of the thumbnail for the result */
  readonly thumbnailUrl?: string;
  /** Optional. Thumbnail width */
  readonly thumbnailWidth?: number;
  /** Optional. Thumbnail height */
  readonly thumbnailHeight?: number;
  readonly [key: string]: unknown;
}
const _InlineQueryResultArticlePublicKeys = { input_message_content: "inputMessageContent", reply_markup: "replyMarkup", thumbnail_url: "thumbnailUrl", thumbnail_width: "thumbnailWidth", thumbnail_height: "thumbnailHeight" } as const;
const _InlineQueryResultArticleWireKeys = invertKeys(_InlineQueryResultArticlePublicKeys);
const _InlineQueryResultArticleEncoded = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("article"),
    id: Schema.String,
    title: Schema.String,
    input_message_content: Schema.suspend((): Schema.Codec<InputMessageContent, unknown> => InputMessageContent),
    reply_markup: Schema.optionalKey(Schema.suspend((): Schema.Codec<InlineKeyboardMarkup, unknown> => InlineKeyboardMarkup)),
    url: Schema.optionalKey(Schema.String),
    description: Schema.optionalKey(Schema.String),
    thumbnail_url: Schema.optionalKey(Schema.String),
    thumbnail_width: Schema.optionalKey(Schema.Int),
    thumbnail_height: Schema.optionalKey(Schema.Int),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _InlineQueryResultArticleDecoded = Schema.declare<InlineQueryResultArticle>((input): input is InlineQueryResultArticle => Predicate.isObject(input));
export const InlineQueryResultArticle: Schema.Codec<InlineQueryResultArticle, unknown> = _InlineQueryResultArticleEncoded.pipe(
  Schema.decodeTo(_InlineQueryResultArticleDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_InlineQueryResultArticlePublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_InlineQueryResultArticleWireKeys)),
  }),
);

/** Represents a link to an MP3 audio file. By default, this audio file will be sent by the user. Alternatively, you can use input_message_content to send a message with the specified content instead of the audio. */
export interface InlineQueryResultAudio {
  /** Type of the result, must be audio */
  readonly type: "audio";
  /** Unique identifier for this result, 1-64 bytes */
  readonly id: string;
  /** A valid URL for the audio file */
  readonly audioUrl: string;
  /** Title */
  readonly title: string;
  /** Optional. Caption, 0-1024 characters after entities parsing */
  readonly caption?: string;
  /** Optional. Mode for parsing entities in the audio caption. See formatting options for more details. */
  readonly parseMode?: ParseMode;
  /** Optional. List of special entities that appear in the caption, which can be specified instead of parse_mode */
  readonly captionEntities?: ReadonlyArray<MessageEntity>;
  /** Optional. Performer */
  readonly performer?: string;
  /** Optional. Audio duration in seconds */
  readonly audioDuration?: number;
  /** Optional. Inline keyboard attached to the message */
  readonly replyMarkup?: InlineKeyboardMarkup;
  /** Optional. Content of the message to be sent instead of the audio */
  readonly inputMessageContent?: InputMessageContent;
  readonly [key: string]: unknown;
}
const _InlineQueryResultAudioPublicKeys = { audio_url: "audioUrl", parse_mode: "parseMode", caption_entities: "captionEntities", audio_duration: "audioDuration", reply_markup: "replyMarkup", input_message_content: "inputMessageContent" } as const;
const _InlineQueryResultAudioWireKeys = invertKeys(_InlineQueryResultAudioPublicKeys);
const _InlineQueryResultAudioEncoded = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("audio"),
    id: Schema.String,
    audio_url: Schema.String,
    title: Schema.String,
    caption: Schema.optionalKey(Schema.String),
    parse_mode: Schema.optionalKey(Schema.suspend((): Schema.Codec<ParseMode, unknown> => ParseMode)),
    caption_entities: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<MessageEntity, unknown> => MessageEntity))),
    performer: Schema.optionalKey(Schema.String),
    audio_duration: Schema.optionalKey(Schema.Int),
    reply_markup: Schema.optionalKey(Schema.suspend((): Schema.Codec<InlineKeyboardMarkup, unknown> => InlineKeyboardMarkup)),
    input_message_content: Schema.optionalKey(Schema.suspend((): Schema.Codec<InputMessageContent, unknown> => InputMessageContent)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _InlineQueryResultAudioDecoded = Schema.declare<InlineQueryResultAudio>((input): input is InlineQueryResultAudio => Predicate.isObject(input));
export const InlineQueryResultAudio: Schema.Codec<InlineQueryResultAudio, unknown> = _InlineQueryResultAudioEncoded.pipe(
  Schema.decodeTo(_InlineQueryResultAudioDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_InlineQueryResultAudioPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_InlineQueryResultAudioWireKeys)),
  }),
);

/** Represents a link to an MP3 audio file stored on the Telegram servers. By default, this audio file will be sent by the user. Alternatively, you can use input_message_content to send a message with the specified content instead of the audio. */
export interface InlineQueryResultCachedAudio {
  /** Type of the result, must be audio */
  readonly type: "audio";
  /** Unique identifier for this result, 1-64 bytes */
  readonly id: string;
  /** A valid file identifier for the audio file */
  readonly audioFileId: string;
  /** Optional. Caption, 0-1024 characters after entities parsing */
  readonly caption?: string;
  /** Optional. Mode for parsing entities in the audio caption. See formatting options for more details. */
  readonly parseMode?: ParseMode;
  /** Optional. List of special entities that appear in the caption, which can be specified instead of parse_mode */
  readonly captionEntities?: ReadonlyArray<MessageEntity>;
  /** Optional. Inline keyboard attached to the message */
  readonly replyMarkup?: InlineKeyboardMarkup;
  /** Optional. Content of the message to be sent instead of the audio */
  readonly inputMessageContent?: InputMessageContent;
  readonly [key: string]: unknown;
}
const _InlineQueryResultCachedAudioPublicKeys = { audio_file_id: "audioFileId", parse_mode: "parseMode", caption_entities: "captionEntities", reply_markup: "replyMarkup", input_message_content: "inputMessageContent" } as const;
const _InlineQueryResultCachedAudioWireKeys = invertKeys(_InlineQueryResultCachedAudioPublicKeys);
const _InlineQueryResultCachedAudioEncoded = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("audio"),
    id: Schema.String,
    audio_file_id: Schema.String,
    caption: Schema.optionalKey(Schema.String),
    parse_mode: Schema.optionalKey(Schema.suspend((): Schema.Codec<ParseMode, unknown> => ParseMode)),
    caption_entities: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<MessageEntity, unknown> => MessageEntity))),
    reply_markup: Schema.optionalKey(Schema.suspend((): Schema.Codec<InlineKeyboardMarkup, unknown> => InlineKeyboardMarkup)),
    input_message_content: Schema.optionalKey(Schema.suspend((): Schema.Codec<InputMessageContent, unknown> => InputMessageContent)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _InlineQueryResultCachedAudioDecoded = Schema.declare<InlineQueryResultCachedAudio>((input): input is InlineQueryResultCachedAudio => Predicate.isObject(input));
export const InlineQueryResultCachedAudio: Schema.Codec<InlineQueryResultCachedAudio, unknown> = _InlineQueryResultCachedAudioEncoded.pipe(
  Schema.decodeTo(_InlineQueryResultCachedAudioDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_InlineQueryResultCachedAudioPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_InlineQueryResultCachedAudioWireKeys)),
  }),
);

/** Represents a link to a file stored on the Telegram servers. By default, this file will be sent by the user with an optional caption. Alternatively, you can use input_message_content to send a message with the specified content instead of the file. */
export interface InlineQueryResultCachedDocument {
  /** Type of the result, must be document */
  readonly type: "document";
  /** Unique identifier for this result, 1-64 bytes */
  readonly id: string;
  /** Title for the result */
  readonly title: string;
  /** A valid file identifier for the file */
  readonly documentFileId: string;
  /** Optional. Short description of the result */
  readonly description?: string;
  /** Optional. Caption of the document to be sent, 0-1024 characters after entities parsing */
  readonly caption?: string;
  /** Optional. Mode for parsing entities in the document caption. See formatting options for more details. */
  readonly parseMode?: ParseMode;
  /** Optional. List of special entities that appear in the caption, which can be specified instead of parse_mode */
  readonly captionEntities?: ReadonlyArray<MessageEntity>;
  /** Optional. Inline keyboard attached to the message */
  readonly replyMarkup?: InlineKeyboardMarkup;
  /** Optional. Content of the message to be sent instead of the file */
  readonly inputMessageContent?: InputMessageContent;
  readonly [key: string]: unknown;
}
const _InlineQueryResultCachedDocumentPublicKeys = { document_file_id: "documentFileId", parse_mode: "parseMode", caption_entities: "captionEntities", reply_markup: "replyMarkup", input_message_content: "inputMessageContent" } as const;
const _InlineQueryResultCachedDocumentWireKeys = invertKeys(_InlineQueryResultCachedDocumentPublicKeys);
const _InlineQueryResultCachedDocumentEncoded = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("document"),
    id: Schema.String,
    title: Schema.String,
    document_file_id: Schema.String,
    description: Schema.optionalKey(Schema.String),
    caption: Schema.optionalKey(Schema.String),
    parse_mode: Schema.optionalKey(Schema.suspend((): Schema.Codec<ParseMode, unknown> => ParseMode)),
    caption_entities: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<MessageEntity, unknown> => MessageEntity))),
    reply_markup: Schema.optionalKey(Schema.suspend((): Schema.Codec<InlineKeyboardMarkup, unknown> => InlineKeyboardMarkup)),
    input_message_content: Schema.optionalKey(Schema.suspend((): Schema.Codec<InputMessageContent, unknown> => InputMessageContent)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _InlineQueryResultCachedDocumentDecoded = Schema.declare<InlineQueryResultCachedDocument>((input): input is InlineQueryResultCachedDocument => Predicate.isObject(input));
export const InlineQueryResultCachedDocument: Schema.Codec<InlineQueryResultCachedDocument, unknown> = _InlineQueryResultCachedDocumentEncoded.pipe(
  Schema.decodeTo(_InlineQueryResultCachedDocumentDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_InlineQueryResultCachedDocumentPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_InlineQueryResultCachedDocumentWireKeys)),
  }),
);

/** Represents a link to an animated GIF file stored on the Telegram servers. By default, this animated GIF file will be sent by the user with an optional caption. Alternatively, you can use input_message_content to send a message with specified content instead of the animation. */
export interface InlineQueryResultCachedGif {
  /** Type of the result, must be gif */
  readonly type: "gif";
  /** Unique identifier for this result, 1-64 bytes */
  readonly id: string;
  /** A valid file identifier for the GIF file */
  readonly gifFileId: string;
  /** Optional. Title for the result */
  readonly title?: string;
  /** Optional. Caption of the GIF file to be sent, 0-1024 characters after entities parsing */
  readonly caption?: string;
  /** Optional. Mode for parsing entities in the caption. See formatting options for more details. */
  readonly parseMode?: ParseMode;
  /** Optional. List of special entities that appear in the caption, which can be specified instead of parse_mode */
  readonly captionEntities?: ReadonlyArray<MessageEntity>;
  /** Optional. Pass True if the caption must be shown above the message media */
  readonly showCaptionAboveMedia?: boolean;
  /** Optional. Inline keyboard attached to the message */
  readonly replyMarkup?: InlineKeyboardMarkup;
  /** Optional. Content of the message to be sent instead of the GIF animation */
  readonly inputMessageContent?: InputMessageContent;
  readonly [key: string]: unknown;
}
const _InlineQueryResultCachedGifPublicKeys = { gif_file_id: "gifFileId", parse_mode: "parseMode", caption_entities: "captionEntities", show_caption_above_media: "showCaptionAboveMedia", reply_markup: "replyMarkup", input_message_content: "inputMessageContent" } as const;
const _InlineQueryResultCachedGifWireKeys = invertKeys(_InlineQueryResultCachedGifPublicKeys);
const _InlineQueryResultCachedGifEncoded = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("gif"),
    id: Schema.String,
    gif_file_id: Schema.String,
    title: Schema.optionalKey(Schema.String),
    caption: Schema.optionalKey(Schema.String),
    parse_mode: Schema.optionalKey(Schema.suspend((): Schema.Codec<ParseMode, unknown> => ParseMode)),
    caption_entities: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<MessageEntity, unknown> => MessageEntity))),
    show_caption_above_media: Schema.optionalKey(Schema.Boolean),
    reply_markup: Schema.optionalKey(Schema.suspend((): Schema.Codec<InlineKeyboardMarkup, unknown> => InlineKeyboardMarkup)),
    input_message_content: Schema.optionalKey(Schema.suspend((): Schema.Codec<InputMessageContent, unknown> => InputMessageContent)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _InlineQueryResultCachedGifDecoded = Schema.declare<InlineQueryResultCachedGif>((input): input is InlineQueryResultCachedGif => Predicate.isObject(input));
export const InlineQueryResultCachedGif: Schema.Codec<InlineQueryResultCachedGif, unknown> = _InlineQueryResultCachedGifEncoded.pipe(
  Schema.decodeTo(_InlineQueryResultCachedGifDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_InlineQueryResultCachedGifPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_InlineQueryResultCachedGifWireKeys)),
  }),
);

/** Represents a link to a video animation (H.264/MPEG-4 AVC video without sound) stored on the Telegram servers. By default, this animated MPEG-4 file will be sent by the user with an optional caption. Alternatively, you can use input_message_content to send a message with the specified content instead of the animation. */
export interface InlineQueryResultCachedMpeg4Gif {
  /** Type of the result, must be mpeg4_gif */
  readonly type: "mpeg4_gif";
  /** Unique identifier for this result, 1-64 bytes */
  readonly id: string;
  /** A valid file identifier for the MPEG4 file */
  readonly mpeg4FileId: string;
  /** Optional. Title for the result */
  readonly title?: string;
  /** Optional. Caption of the MPEG-4 file to be sent, 0-1024 characters after entities parsing */
  readonly caption?: string;
  /** Optional. Mode for parsing entities in the caption. See formatting options for more details. */
  readonly parseMode?: ParseMode;
  /** Optional. List of special entities that appear in the caption, which can be specified instead of parse_mode */
  readonly captionEntities?: ReadonlyArray<MessageEntity>;
  /** Optional. Pass True if the caption must be shown above the message media */
  readonly showCaptionAboveMedia?: boolean;
  /** Optional. Inline keyboard attached to the message */
  readonly replyMarkup?: InlineKeyboardMarkup;
  /** Optional. Content of the message to be sent instead of the video animation */
  readonly inputMessageContent?: InputMessageContent;
  readonly [key: string]: unknown;
}
const _InlineQueryResultCachedMpeg4GifPublicKeys = { mpeg4_file_id: "mpeg4FileId", parse_mode: "parseMode", caption_entities: "captionEntities", show_caption_above_media: "showCaptionAboveMedia", reply_markup: "replyMarkup", input_message_content: "inputMessageContent" } as const;
const _InlineQueryResultCachedMpeg4GifWireKeys = invertKeys(_InlineQueryResultCachedMpeg4GifPublicKeys);
const _InlineQueryResultCachedMpeg4GifEncoded = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("mpeg4_gif"),
    id: Schema.String,
    mpeg4_file_id: Schema.String,
    title: Schema.optionalKey(Schema.String),
    caption: Schema.optionalKey(Schema.String),
    parse_mode: Schema.optionalKey(Schema.suspend((): Schema.Codec<ParseMode, unknown> => ParseMode)),
    caption_entities: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<MessageEntity, unknown> => MessageEntity))),
    show_caption_above_media: Schema.optionalKey(Schema.Boolean),
    reply_markup: Schema.optionalKey(Schema.suspend((): Schema.Codec<InlineKeyboardMarkup, unknown> => InlineKeyboardMarkup)),
    input_message_content: Schema.optionalKey(Schema.suspend((): Schema.Codec<InputMessageContent, unknown> => InputMessageContent)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _InlineQueryResultCachedMpeg4GifDecoded = Schema.declare<InlineQueryResultCachedMpeg4Gif>((input): input is InlineQueryResultCachedMpeg4Gif => Predicate.isObject(input));
export const InlineQueryResultCachedMpeg4Gif: Schema.Codec<InlineQueryResultCachedMpeg4Gif, unknown> = _InlineQueryResultCachedMpeg4GifEncoded.pipe(
  Schema.decodeTo(_InlineQueryResultCachedMpeg4GifDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_InlineQueryResultCachedMpeg4GifPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_InlineQueryResultCachedMpeg4GifWireKeys)),
  }),
);

/** Represents a link to a photo stored on the Telegram servers. By default, this photo will be sent by the user with an optional caption. Alternatively, you can use input_message_content to send a message with the specified content instead of the photo. */
export interface InlineQueryResultCachedPhoto {
  /** Type of the result, must be photo */
  readonly type: "photo";
  /** Unique identifier for this result, 1-64 bytes */
  readonly id: string;
  /** A valid file identifier of the photo */
  readonly photoFileId: string;
  /** Optional. Title for the result */
  readonly title?: string;
  /** Optional. Short description of the result */
  readonly description?: string;
  /** Optional. Caption of the photo to be sent, 0-1024 characters after entities parsing */
  readonly caption?: string;
  /** Optional. Mode for parsing entities in the photo caption. See formatting options for more details. */
  readonly parseMode?: ParseMode;
  /** Optional. List of special entities that appear in the caption, which can be specified instead of parse_mode */
  readonly captionEntities?: ReadonlyArray<MessageEntity>;
  /** Optional. Pass True if the caption must be shown above the message media */
  readonly showCaptionAboveMedia?: boolean;
  /** Optional. Inline keyboard attached to the message */
  readonly replyMarkup?: InlineKeyboardMarkup;
  /** Optional. Content of the message to be sent instead of the photo */
  readonly inputMessageContent?: InputMessageContent;
  readonly [key: string]: unknown;
}
const _InlineQueryResultCachedPhotoPublicKeys = { photo_file_id: "photoFileId", parse_mode: "parseMode", caption_entities: "captionEntities", show_caption_above_media: "showCaptionAboveMedia", reply_markup: "replyMarkup", input_message_content: "inputMessageContent" } as const;
const _InlineQueryResultCachedPhotoWireKeys = invertKeys(_InlineQueryResultCachedPhotoPublicKeys);
const _InlineQueryResultCachedPhotoEncoded = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("photo"),
    id: Schema.String,
    photo_file_id: Schema.String,
    title: Schema.optionalKey(Schema.String),
    description: Schema.optionalKey(Schema.String),
    caption: Schema.optionalKey(Schema.String),
    parse_mode: Schema.optionalKey(Schema.suspend((): Schema.Codec<ParseMode, unknown> => ParseMode)),
    caption_entities: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<MessageEntity, unknown> => MessageEntity))),
    show_caption_above_media: Schema.optionalKey(Schema.Boolean),
    reply_markup: Schema.optionalKey(Schema.suspend((): Schema.Codec<InlineKeyboardMarkup, unknown> => InlineKeyboardMarkup)),
    input_message_content: Schema.optionalKey(Schema.suspend((): Schema.Codec<InputMessageContent, unknown> => InputMessageContent)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _InlineQueryResultCachedPhotoDecoded = Schema.declare<InlineQueryResultCachedPhoto>((input): input is InlineQueryResultCachedPhoto => Predicate.isObject(input));
export const InlineQueryResultCachedPhoto: Schema.Codec<InlineQueryResultCachedPhoto, unknown> = _InlineQueryResultCachedPhotoEncoded.pipe(
  Schema.decodeTo(_InlineQueryResultCachedPhotoDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_InlineQueryResultCachedPhotoPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_InlineQueryResultCachedPhotoWireKeys)),
  }),
);

/** Represents a link to a sticker stored on the Telegram servers. By default, this sticker will be sent by the user. Alternatively, you can use input_message_content to send a message with the specified content instead of the sticker. */
export interface InlineQueryResultCachedSticker {
  /** Type of the result, must be sticker */
  readonly type: "sticker";
  /** Unique identifier for this result, 1-64 bytes */
  readonly id: string;
  /** A valid file identifier of the sticker */
  readonly stickerFileId: string;
  /** Optional. Inline keyboard attached to the message */
  readonly replyMarkup?: InlineKeyboardMarkup;
  /** Optional. Content of the message to be sent instead of the sticker */
  readonly inputMessageContent?: InputMessageContent;
  readonly [key: string]: unknown;
}
const _InlineQueryResultCachedStickerPublicKeys = { sticker_file_id: "stickerFileId", reply_markup: "replyMarkup", input_message_content: "inputMessageContent" } as const;
const _InlineQueryResultCachedStickerWireKeys = invertKeys(_InlineQueryResultCachedStickerPublicKeys);
const _InlineQueryResultCachedStickerEncoded = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("sticker"),
    id: Schema.String,
    sticker_file_id: Schema.String,
    reply_markup: Schema.optionalKey(Schema.suspend((): Schema.Codec<InlineKeyboardMarkup, unknown> => InlineKeyboardMarkup)),
    input_message_content: Schema.optionalKey(Schema.suspend((): Schema.Codec<InputMessageContent, unknown> => InputMessageContent)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _InlineQueryResultCachedStickerDecoded = Schema.declare<InlineQueryResultCachedSticker>((input): input is InlineQueryResultCachedSticker => Predicate.isObject(input));
export const InlineQueryResultCachedSticker: Schema.Codec<InlineQueryResultCachedSticker, unknown> = _InlineQueryResultCachedStickerEncoded.pipe(
  Schema.decodeTo(_InlineQueryResultCachedStickerDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_InlineQueryResultCachedStickerPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_InlineQueryResultCachedStickerWireKeys)),
  }),
);

/** Represents a link to a video file stored on the Telegram servers. By default, this video file will be sent by the user with an optional caption. Alternatively, you can use input_message_content to send a message with the specified content instead of the video. */
export interface InlineQueryResultCachedVideo {
  /** Type of the result, must be video */
  readonly type: "video";
  /** Unique identifier for this result, 1-64 bytes */
  readonly id: string;
  /** A valid file identifier for the video file */
  readonly videoFileId: string;
  /** Title for the result */
  readonly title: string;
  /** Optional. Short description of the result */
  readonly description?: string;
  /** Optional. Caption of the video to be sent, 0-1024 characters after entities parsing */
  readonly caption?: string;
  /** Optional. Mode for parsing entities in the video caption. See formatting options for more details. */
  readonly parseMode?: ParseMode;
  /** Optional. List of special entities that appear in the caption, which can be specified instead of parse_mode */
  readonly captionEntities?: ReadonlyArray<MessageEntity>;
  /** Optional. Pass True if the caption must be shown above the message media */
  readonly showCaptionAboveMedia?: boolean;
  /** Optional. Inline keyboard attached to the message */
  readonly replyMarkup?: InlineKeyboardMarkup;
  /** Optional. Content of the message to be sent instead of the video */
  readonly inputMessageContent?: InputMessageContent;
  readonly [key: string]: unknown;
}
const _InlineQueryResultCachedVideoPublicKeys = { video_file_id: "videoFileId", parse_mode: "parseMode", caption_entities: "captionEntities", show_caption_above_media: "showCaptionAboveMedia", reply_markup: "replyMarkup", input_message_content: "inputMessageContent" } as const;
const _InlineQueryResultCachedVideoWireKeys = invertKeys(_InlineQueryResultCachedVideoPublicKeys);
const _InlineQueryResultCachedVideoEncoded = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("video"),
    id: Schema.String,
    video_file_id: Schema.String,
    title: Schema.String,
    description: Schema.optionalKey(Schema.String),
    caption: Schema.optionalKey(Schema.String),
    parse_mode: Schema.optionalKey(Schema.suspend((): Schema.Codec<ParseMode, unknown> => ParseMode)),
    caption_entities: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<MessageEntity, unknown> => MessageEntity))),
    show_caption_above_media: Schema.optionalKey(Schema.Boolean),
    reply_markup: Schema.optionalKey(Schema.suspend((): Schema.Codec<InlineKeyboardMarkup, unknown> => InlineKeyboardMarkup)),
    input_message_content: Schema.optionalKey(Schema.suspend((): Schema.Codec<InputMessageContent, unknown> => InputMessageContent)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _InlineQueryResultCachedVideoDecoded = Schema.declare<InlineQueryResultCachedVideo>((input): input is InlineQueryResultCachedVideo => Predicate.isObject(input));
export const InlineQueryResultCachedVideo: Schema.Codec<InlineQueryResultCachedVideo, unknown> = _InlineQueryResultCachedVideoEncoded.pipe(
  Schema.decodeTo(_InlineQueryResultCachedVideoDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_InlineQueryResultCachedVideoPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_InlineQueryResultCachedVideoWireKeys)),
  }),
);

/** Represents a link to a voice message stored on the Telegram servers. By default, this voice message will be sent by the user. Alternatively, you can use input_message_content to send a message with the specified content instead of the voice message. */
export interface InlineQueryResultCachedVoice {
  /** Type of the result, must be voice */
  readonly type: "voice";
  /** Unique identifier for this result, 1-64 bytes */
  readonly id: string;
  /** A valid file identifier for the voice message */
  readonly voiceFileId: string;
  /** Voice message title */
  readonly title: string;
  /** Optional. Caption, 0-1024 characters after entities parsing */
  readonly caption?: string;
  /** Optional. Mode for parsing entities in the voice message caption. See formatting options for more details. */
  readonly parseMode?: ParseMode;
  /** Optional. List of special entities that appear in the caption, which can be specified instead of parse_mode */
  readonly captionEntities?: ReadonlyArray<MessageEntity>;
  /** Optional. Inline keyboard attached to the message */
  readonly replyMarkup?: InlineKeyboardMarkup;
  /** Optional. Content of the message to be sent instead of the voice message */
  readonly inputMessageContent?: InputMessageContent;
  readonly [key: string]: unknown;
}
const _InlineQueryResultCachedVoicePublicKeys = { voice_file_id: "voiceFileId", parse_mode: "parseMode", caption_entities: "captionEntities", reply_markup: "replyMarkup", input_message_content: "inputMessageContent" } as const;
const _InlineQueryResultCachedVoiceWireKeys = invertKeys(_InlineQueryResultCachedVoicePublicKeys);
const _InlineQueryResultCachedVoiceEncoded = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("voice"),
    id: Schema.String,
    voice_file_id: Schema.String,
    title: Schema.String,
    caption: Schema.optionalKey(Schema.String),
    parse_mode: Schema.optionalKey(Schema.suspend((): Schema.Codec<ParseMode, unknown> => ParseMode)),
    caption_entities: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<MessageEntity, unknown> => MessageEntity))),
    reply_markup: Schema.optionalKey(Schema.suspend((): Schema.Codec<InlineKeyboardMarkup, unknown> => InlineKeyboardMarkup)),
    input_message_content: Schema.optionalKey(Schema.suspend((): Schema.Codec<InputMessageContent, unknown> => InputMessageContent)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _InlineQueryResultCachedVoiceDecoded = Schema.declare<InlineQueryResultCachedVoice>((input): input is InlineQueryResultCachedVoice => Predicate.isObject(input));
export const InlineQueryResultCachedVoice: Schema.Codec<InlineQueryResultCachedVoice, unknown> = _InlineQueryResultCachedVoiceEncoded.pipe(
  Schema.decodeTo(_InlineQueryResultCachedVoiceDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_InlineQueryResultCachedVoicePublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_InlineQueryResultCachedVoiceWireKeys)),
  }),
);

/** Represents a contact with a phone number. By default, this contact will be sent by the user. Alternatively, you can use input_message_content to send a message with the specified content instead of the contact. */
export interface InlineQueryResultContact {
  /** Type of the result, must be contact */
  readonly type: "contact";
  /** Unique identifier for this result, 1-64 Bytes */
  readonly id: string;
  /** Contact's phone number */
  readonly phoneNumber: string;
  /** Contact's first name */
  readonly firstName: string;
  /** Optional. Contact's last name */
  readonly lastName?: string;
  /** Optional. Additional data about the contact in the form of a vCard, 0-2048 bytes */
  readonly vcard?: string;
  /** Optional. Inline keyboard attached to the message */
  readonly replyMarkup?: InlineKeyboardMarkup;
  /** Optional. Content of the message to be sent instead of the contact */
  readonly inputMessageContent?: InputMessageContent;
  /** Optional. Url of the thumbnail for the result */
  readonly thumbnailUrl?: string;
  /** Optional. Thumbnail width */
  readonly thumbnailWidth?: number;
  /** Optional. Thumbnail height */
  readonly thumbnailHeight?: number;
  readonly [key: string]: unknown;
}
const _InlineQueryResultContactPublicKeys = { phone_number: "phoneNumber", first_name: "firstName", last_name: "lastName", reply_markup: "replyMarkup", input_message_content: "inputMessageContent", thumbnail_url: "thumbnailUrl", thumbnail_width: "thumbnailWidth", thumbnail_height: "thumbnailHeight" } as const;
const _InlineQueryResultContactWireKeys = invertKeys(_InlineQueryResultContactPublicKeys);
const _InlineQueryResultContactEncoded = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("contact"),
    id: Schema.String,
    phone_number: Schema.String,
    first_name: Schema.String,
    last_name: Schema.optionalKey(Schema.String),
    vcard: Schema.optionalKey(Schema.String),
    reply_markup: Schema.optionalKey(Schema.suspend((): Schema.Codec<InlineKeyboardMarkup, unknown> => InlineKeyboardMarkup)),
    input_message_content: Schema.optionalKey(Schema.suspend((): Schema.Codec<InputMessageContent, unknown> => InputMessageContent)),
    thumbnail_url: Schema.optionalKey(Schema.String),
    thumbnail_width: Schema.optionalKey(Schema.Int),
    thumbnail_height: Schema.optionalKey(Schema.Int),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _InlineQueryResultContactDecoded = Schema.declare<InlineQueryResultContact>((input): input is InlineQueryResultContact => Predicate.isObject(input));
export const InlineQueryResultContact: Schema.Codec<InlineQueryResultContact, unknown> = _InlineQueryResultContactEncoded.pipe(
  Schema.decodeTo(_InlineQueryResultContactDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_InlineQueryResultContactPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_InlineQueryResultContactWireKeys)),
  }),
);

/** Represents a link to a file. By default, this file will be sent by the user with an optional caption. Alternatively, you can use input_message_content to send a message with the specified content instead of the file. Currently, only .PDF and .ZIP files can be sent using this method. */
export interface InlineQueryResultDocument {
  /** Type of the result, must be document */
  readonly type: "document";
  /** Unique identifier for this result, 1-64 bytes */
  readonly id: string;
  /** Title for the result */
  readonly title: string;
  /** Optional. Caption of the document to be sent, 0-1024 characters after entities parsing */
  readonly caption?: string;
  /** Optional. Mode for parsing entities in the document caption. See formatting options for more details. */
  readonly parseMode?: ParseMode;
  /** Optional. List of special entities that appear in the caption, which can be specified instead of parse_mode */
  readonly captionEntities?: ReadonlyArray<MessageEntity>;
  /** A valid URL for the file */
  readonly documentUrl: string;
  /** MIME type of the content of the file, either “application/pdf” or “application/zip” */
  readonly mimeType: string;
  /** Optional. Short description of the result */
  readonly description?: string;
  /** Optional. Inline keyboard attached to the message */
  readonly replyMarkup?: InlineKeyboardMarkup;
  /** Optional. Content of the message to be sent instead of the file */
  readonly inputMessageContent?: InputMessageContent;
  /** Optional. URL of the thumbnail (JPEG only) for the file */
  readonly thumbnailUrl?: string;
  /** Optional. Thumbnail width */
  readonly thumbnailWidth?: number;
  /** Optional. Thumbnail height */
  readonly thumbnailHeight?: number;
  readonly [key: string]: unknown;
}
const _InlineQueryResultDocumentPublicKeys = { parse_mode: "parseMode", caption_entities: "captionEntities", document_url: "documentUrl", mime_type: "mimeType", reply_markup: "replyMarkup", input_message_content: "inputMessageContent", thumbnail_url: "thumbnailUrl", thumbnail_width: "thumbnailWidth", thumbnail_height: "thumbnailHeight" } as const;
const _InlineQueryResultDocumentWireKeys = invertKeys(_InlineQueryResultDocumentPublicKeys);
const _InlineQueryResultDocumentEncoded = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("document"),
    id: Schema.String,
    title: Schema.String,
    caption: Schema.optionalKey(Schema.String),
    parse_mode: Schema.optionalKey(Schema.suspend((): Schema.Codec<ParseMode, unknown> => ParseMode)),
    caption_entities: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<MessageEntity, unknown> => MessageEntity))),
    document_url: Schema.String,
    mime_type: Schema.String,
    description: Schema.optionalKey(Schema.String),
    reply_markup: Schema.optionalKey(Schema.suspend((): Schema.Codec<InlineKeyboardMarkup, unknown> => InlineKeyboardMarkup)),
    input_message_content: Schema.optionalKey(Schema.suspend((): Schema.Codec<InputMessageContent, unknown> => InputMessageContent)),
    thumbnail_url: Schema.optionalKey(Schema.String),
    thumbnail_width: Schema.optionalKey(Schema.Int),
    thumbnail_height: Schema.optionalKey(Schema.Int),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _InlineQueryResultDocumentDecoded = Schema.declare<InlineQueryResultDocument>((input): input is InlineQueryResultDocument => Predicate.isObject(input));
export const InlineQueryResultDocument: Schema.Codec<InlineQueryResultDocument, unknown> = _InlineQueryResultDocumentEncoded.pipe(
  Schema.decodeTo(_InlineQueryResultDocumentDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_InlineQueryResultDocumentPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_InlineQueryResultDocumentWireKeys)),
  }),
);

/** Represents a Game. */
export interface InlineQueryResultGame {
  /** Type of the result, must be game */
  readonly type: "game";
  /** Unique identifier for this result, 1-64 bytes */
  readonly id: string;
  /** Short name of the game */
  readonly gameShortName: string;
  /** Optional. Inline keyboard attached to the message */
  readonly replyMarkup?: InlineKeyboardMarkup;
  readonly [key: string]: unknown;
}
const _InlineQueryResultGamePublicKeys = { game_short_name: "gameShortName", reply_markup: "replyMarkup" } as const;
const _InlineQueryResultGameWireKeys = invertKeys(_InlineQueryResultGamePublicKeys);
const _InlineQueryResultGameEncoded = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("game"),
    id: Schema.String,
    game_short_name: Schema.String,
    reply_markup: Schema.optionalKey(Schema.suspend((): Schema.Codec<InlineKeyboardMarkup, unknown> => InlineKeyboardMarkup)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _InlineQueryResultGameDecoded = Schema.declare<InlineQueryResultGame>((input): input is InlineQueryResultGame => Predicate.isObject(input));
export const InlineQueryResultGame: Schema.Codec<InlineQueryResultGame, unknown> = _InlineQueryResultGameEncoded.pipe(
  Schema.decodeTo(_InlineQueryResultGameDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_InlineQueryResultGamePublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_InlineQueryResultGameWireKeys)),
  }),
);

/** Represents a link to an animated GIF file. By default, this animated GIF file will be sent by the user with optional caption. Alternatively, you can use input_message_content to send a message with the specified content instead of the animation. */
export interface InlineQueryResultGif {
  /** Type of the result, must be gif */
  readonly type: "gif";
  /** Unique identifier for this result, 1-64 bytes */
  readonly id: string;
  /** A valid URL for the GIF file */
  readonly gifUrl: string;
  /** Optional. Width of the GIF */
  readonly gifWidth?: number;
  /** Optional. Height of the GIF */
  readonly gifHeight?: number;
  /** Optional. Duration of the GIF in seconds */
  readonly gifDuration?: number;
  /** URL of the static (JPEG or GIF) or animated (MPEG4) thumbnail for the result */
  readonly thumbnailUrl: string;
  /** Optional. MIME type of the thumbnail, must be one of “image/jpeg”, “image/gif”, or “video/mp4”. Defaults to “image/jpeg”. */
  readonly thumbnailMimeType?: string;
  /** Optional. Title for the result */
  readonly title?: string;
  /** Optional. Caption of the GIF file to be sent, 0-1024 characters after entities parsing */
  readonly caption?: string;
  /** Optional. Mode for parsing entities in the caption. See formatting options for more details. */
  readonly parseMode?: ParseMode;
  /** Optional. List of special entities that appear in the caption, which can be specified instead of parse_mode */
  readonly captionEntities?: ReadonlyArray<MessageEntity>;
  /** Optional. Pass True if the caption must be shown above the message media */
  readonly showCaptionAboveMedia?: boolean;
  /** Optional. Inline keyboard attached to the message */
  readonly replyMarkup?: InlineKeyboardMarkup;
  /** Optional. Content of the message to be sent instead of the GIF animation */
  readonly inputMessageContent?: InputMessageContent;
  readonly [key: string]: unknown;
}
const _InlineQueryResultGifPublicKeys = { gif_url: "gifUrl", gif_width: "gifWidth", gif_height: "gifHeight", gif_duration: "gifDuration", thumbnail_url: "thumbnailUrl", thumbnail_mime_type: "thumbnailMimeType", parse_mode: "parseMode", caption_entities: "captionEntities", show_caption_above_media: "showCaptionAboveMedia", reply_markup: "replyMarkup", input_message_content: "inputMessageContent" } as const;
const _InlineQueryResultGifWireKeys = invertKeys(_InlineQueryResultGifPublicKeys);
const _InlineQueryResultGifEncoded = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("gif"),
    id: Schema.String,
    gif_url: Schema.String,
    gif_width: Schema.optionalKey(Schema.Int),
    gif_height: Schema.optionalKey(Schema.Int),
    gif_duration: Schema.optionalKey(Schema.Int),
    thumbnail_url: Schema.String,
    thumbnail_mime_type: Schema.optionalKey(Schema.String),
    title: Schema.optionalKey(Schema.String),
    caption: Schema.optionalKey(Schema.String),
    parse_mode: Schema.optionalKey(Schema.suspend((): Schema.Codec<ParseMode, unknown> => ParseMode)),
    caption_entities: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<MessageEntity, unknown> => MessageEntity))),
    show_caption_above_media: Schema.optionalKey(Schema.Boolean),
    reply_markup: Schema.optionalKey(Schema.suspend((): Schema.Codec<InlineKeyboardMarkup, unknown> => InlineKeyboardMarkup)),
    input_message_content: Schema.optionalKey(Schema.suspend((): Schema.Codec<InputMessageContent, unknown> => InputMessageContent)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _InlineQueryResultGifDecoded = Schema.declare<InlineQueryResultGif>((input): input is InlineQueryResultGif => Predicate.isObject(input));
export const InlineQueryResultGif: Schema.Codec<InlineQueryResultGif, unknown> = _InlineQueryResultGifEncoded.pipe(
  Schema.decodeTo(_InlineQueryResultGifDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_InlineQueryResultGifPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_InlineQueryResultGifWireKeys)),
  }),
);

/** Represents a location on a map. By default, the location will be sent by the user. Alternatively, you can use input_message_content to send a message with the specified content instead of the location. */
export interface InlineQueryResultLocation {
  /** Type of the result, must be location */
  readonly type: "location";
  /** Unique identifier for this result, 1-64 Bytes */
  readonly id: string;
  /** Location latitude in degrees */
  readonly latitude: number;
  /** Location longitude in degrees */
  readonly longitude: number;
  /** Location title */
  readonly title: string;
  /** Optional. The radius of uncertainty for the location, measured in meters; 0-1500 */
  readonly horizontalAccuracy?: number;
  /** Optional. Period in seconds during which the location can be updated, must be between 60 and 86400, or 0x7FFFFFFF for live locations that can be edited indefinitely */
  readonly livePeriod?: number;
  /** Optional. For live locations, a direction in which the user is moving, in degrees. Must be between 1 and 360 if specified. */
  readonly heading?: number;
  /** Optional. For live locations, a maximum distance for proximity alerts about approaching another chat member, in meters. Must be between 1 and 100000 if specified. */
  readonly proximityAlertRadius?: number;
  /** Optional. Inline keyboard attached to the message */
  readonly replyMarkup?: InlineKeyboardMarkup;
  /** Optional. Content of the message to be sent instead of the location */
  readonly inputMessageContent?: InputMessageContent;
  /** Optional. Url of the thumbnail for the result */
  readonly thumbnailUrl?: string;
  /** Optional. Thumbnail width */
  readonly thumbnailWidth?: number;
  /** Optional. Thumbnail height */
  readonly thumbnailHeight?: number;
  readonly [key: string]: unknown;
}
const _InlineQueryResultLocationPublicKeys = { horizontal_accuracy: "horizontalAccuracy", live_period: "livePeriod", proximity_alert_radius: "proximityAlertRadius", reply_markup: "replyMarkup", input_message_content: "inputMessageContent", thumbnail_url: "thumbnailUrl", thumbnail_width: "thumbnailWidth", thumbnail_height: "thumbnailHeight" } as const;
const _InlineQueryResultLocationWireKeys = invertKeys(_InlineQueryResultLocationPublicKeys);
const _InlineQueryResultLocationEncoded = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("location"),
    id: Schema.String,
    latitude: Schema.Number,
    longitude: Schema.Number,
    title: Schema.String,
    horizontal_accuracy: Schema.optionalKey(Schema.Number),
    live_period: Schema.optionalKey(Schema.Int),
    heading: Schema.optionalKey(Schema.Int),
    proximity_alert_radius: Schema.optionalKey(Schema.Int),
    reply_markup: Schema.optionalKey(Schema.suspend((): Schema.Codec<InlineKeyboardMarkup, unknown> => InlineKeyboardMarkup)),
    input_message_content: Schema.optionalKey(Schema.suspend((): Schema.Codec<InputMessageContent, unknown> => InputMessageContent)),
    thumbnail_url: Schema.optionalKey(Schema.String),
    thumbnail_width: Schema.optionalKey(Schema.Int),
    thumbnail_height: Schema.optionalKey(Schema.Int),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _InlineQueryResultLocationDecoded = Schema.declare<InlineQueryResultLocation>((input): input is InlineQueryResultLocation => Predicate.isObject(input));
export const InlineQueryResultLocation: Schema.Codec<InlineQueryResultLocation, unknown> = _InlineQueryResultLocationEncoded.pipe(
  Schema.decodeTo(_InlineQueryResultLocationDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_InlineQueryResultLocationPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_InlineQueryResultLocationWireKeys)),
  }),
);

/** Represents a link to a video animation (H.264/MPEG-4 AVC video without sound). By default, this animated MPEG-4 file will be sent by the user with optional caption. Alternatively, you can use input_message_content to send a message with the specified content instead of the animation. */
export interface InlineQueryResultMpeg4Gif {
  /** Type of the result, must be mpeg4_gif */
  readonly type: "mpeg4_gif";
  /** Unique identifier for this result, 1-64 bytes */
  readonly id: string;
  /** A valid URL for the MPEG4 file */
  readonly mpeg4Url: string;
  /** Optional. Video width */
  readonly mpeg4Width?: number;
  /** Optional. Video height */
  readonly mpeg4Height?: number;
  /** Optional. Video duration in seconds */
  readonly mpeg4Duration?: number;
  /** URL of the static (JPEG or GIF) or animated (MPEG4) thumbnail for the result */
  readonly thumbnailUrl: string;
  /** Optional. MIME type of the thumbnail, must be one of “image/jpeg”, “image/gif”, or “video/mp4”. Defaults to “image/jpeg”. */
  readonly thumbnailMimeType?: string;
  /** Optional. Title for the result */
  readonly title?: string;
  /** Optional. Caption of the MPEG-4 file to be sent, 0-1024 characters after entities parsing */
  readonly caption?: string;
  /** Optional. Mode for parsing entities in the caption. See formatting options for more details. */
  readonly parseMode?: ParseMode;
  /** Optional. List of special entities that appear in the caption, which can be specified instead of parse_mode */
  readonly captionEntities?: ReadonlyArray<MessageEntity>;
  /** Optional. Pass True if the caption must be shown above the message media */
  readonly showCaptionAboveMedia?: boolean;
  /** Optional. Inline keyboard attached to the message */
  readonly replyMarkup?: InlineKeyboardMarkup;
  /** Optional. Content of the message to be sent instead of the video animation */
  readonly inputMessageContent?: InputMessageContent;
  readonly [key: string]: unknown;
}
const _InlineQueryResultMpeg4GifPublicKeys = { mpeg4_url: "mpeg4Url", mpeg4_width: "mpeg4Width", mpeg4_height: "mpeg4Height", mpeg4_duration: "mpeg4Duration", thumbnail_url: "thumbnailUrl", thumbnail_mime_type: "thumbnailMimeType", parse_mode: "parseMode", caption_entities: "captionEntities", show_caption_above_media: "showCaptionAboveMedia", reply_markup: "replyMarkup", input_message_content: "inputMessageContent" } as const;
const _InlineQueryResultMpeg4GifWireKeys = invertKeys(_InlineQueryResultMpeg4GifPublicKeys);
const _InlineQueryResultMpeg4GifEncoded = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("mpeg4_gif"),
    id: Schema.String,
    mpeg4_url: Schema.String,
    mpeg4_width: Schema.optionalKey(Schema.Int),
    mpeg4_height: Schema.optionalKey(Schema.Int),
    mpeg4_duration: Schema.optionalKey(Schema.Int),
    thumbnail_url: Schema.String,
    thumbnail_mime_type: Schema.optionalKey(Schema.String),
    title: Schema.optionalKey(Schema.String),
    caption: Schema.optionalKey(Schema.String),
    parse_mode: Schema.optionalKey(Schema.suspend((): Schema.Codec<ParseMode, unknown> => ParseMode)),
    caption_entities: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<MessageEntity, unknown> => MessageEntity))),
    show_caption_above_media: Schema.optionalKey(Schema.Boolean),
    reply_markup: Schema.optionalKey(Schema.suspend((): Schema.Codec<InlineKeyboardMarkup, unknown> => InlineKeyboardMarkup)),
    input_message_content: Schema.optionalKey(Schema.suspend((): Schema.Codec<InputMessageContent, unknown> => InputMessageContent)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _InlineQueryResultMpeg4GifDecoded = Schema.declare<InlineQueryResultMpeg4Gif>((input): input is InlineQueryResultMpeg4Gif => Predicate.isObject(input));
export const InlineQueryResultMpeg4Gif: Schema.Codec<InlineQueryResultMpeg4Gif, unknown> = _InlineQueryResultMpeg4GifEncoded.pipe(
  Schema.decodeTo(_InlineQueryResultMpeg4GifDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_InlineQueryResultMpeg4GifPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_InlineQueryResultMpeg4GifWireKeys)),
  }),
);

/** Represents a link to a photo. By default, this photo will be sent by the user with optional caption. Alternatively, you can use input_message_content to send a message with the specified content instead of the photo. */
export interface InlineQueryResultPhoto {
  /** Type of the result, must be photo */
  readonly type: "photo";
  /** Unique identifier for this result, 1-64 bytes */
  readonly id: string;
  /** A valid URL of the photo. Photo must be in JPEG format. Photo size must not exceed 5MB. */
  readonly photoUrl: string;
  /** URL of the thumbnail for the photo */
  readonly thumbnailUrl: string;
  /** Optional. Width of the photo */
  readonly photoWidth?: number;
  /** Optional. Height of the photo */
  readonly photoHeight?: number;
  /** Optional. Title for the result */
  readonly title?: string;
  /** Optional. Short description of the result */
  readonly description?: string;
  /** Optional. Caption of the photo to be sent, 0-1024 characters after entities parsing */
  readonly caption?: string;
  /** Optional. Mode for parsing entities in the photo caption. See formatting options for more details. */
  readonly parseMode?: ParseMode;
  /** Optional. List of special entities that appear in the caption, which can be specified instead of parse_mode */
  readonly captionEntities?: ReadonlyArray<MessageEntity>;
  /** Optional. Pass True if the caption must be shown above the message media */
  readonly showCaptionAboveMedia?: boolean;
  /** Optional. Inline keyboard attached to the message */
  readonly replyMarkup?: InlineKeyboardMarkup;
  /** Optional. Content of the message to be sent instead of the photo */
  readonly inputMessageContent?: InputMessageContent;
  readonly [key: string]: unknown;
}
const _InlineQueryResultPhotoPublicKeys = { photo_url: "photoUrl", thumbnail_url: "thumbnailUrl", photo_width: "photoWidth", photo_height: "photoHeight", parse_mode: "parseMode", caption_entities: "captionEntities", show_caption_above_media: "showCaptionAboveMedia", reply_markup: "replyMarkup", input_message_content: "inputMessageContent" } as const;
const _InlineQueryResultPhotoWireKeys = invertKeys(_InlineQueryResultPhotoPublicKeys);
const _InlineQueryResultPhotoEncoded = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("photo"),
    id: Schema.String,
    photo_url: Schema.String,
    thumbnail_url: Schema.String,
    photo_width: Schema.optionalKey(Schema.Int),
    photo_height: Schema.optionalKey(Schema.Int),
    title: Schema.optionalKey(Schema.String),
    description: Schema.optionalKey(Schema.String),
    caption: Schema.optionalKey(Schema.String),
    parse_mode: Schema.optionalKey(Schema.suspend((): Schema.Codec<ParseMode, unknown> => ParseMode)),
    caption_entities: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<MessageEntity, unknown> => MessageEntity))),
    show_caption_above_media: Schema.optionalKey(Schema.Boolean),
    reply_markup: Schema.optionalKey(Schema.suspend((): Schema.Codec<InlineKeyboardMarkup, unknown> => InlineKeyboardMarkup)),
    input_message_content: Schema.optionalKey(Schema.suspend((): Schema.Codec<InputMessageContent, unknown> => InputMessageContent)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _InlineQueryResultPhotoDecoded = Schema.declare<InlineQueryResultPhoto>((input): input is InlineQueryResultPhoto => Predicate.isObject(input));
export const InlineQueryResultPhoto: Schema.Codec<InlineQueryResultPhoto, unknown> = _InlineQueryResultPhotoEncoded.pipe(
  Schema.decodeTo(_InlineQueryResultPhotoDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_InlineQueryResultPhotoPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_InlineQueryResultPhotoWireKeys)),
  }),
);

/** This object represents a button to be shown above inline query results. You must use exactly one of the optional fields. */
export interface InlineQueryResultsButton {
  /** Label text on the button */
  readonly text: string;
  /** Optional. Description of the Web App that will be launched when the user presses the button. The Web App will be able to switch back to the inline mode using the method switchInlineQuery inside the Web App. */
  readonly webApp?: WebAppInfo;
  /** Optional. Deep-linking parameter for the /start message sent to the bot when a user presses the button. 1-64 characters, only A-Z, a-z, 0-9, _ and - are allowed.

Example: An inline bot that sends YouTube videos can ask the user to connect the bot to their YouTube account to adapt search results accordingly. To do this, it displays a 'Connect your YouTube account' button above the results, or even before showing any. The user presses the button, switches to a private chat with the bot and, in doing so, passes a start parameter that instructs the bot to return an OAuth link. Once done, the bot can offer a switch_inline button so that the user can easily return to the chat where they wanted to use the bot's inline capabilities. */
  readonly startParameter?: string;
  readonly [key: string]: unknown;
}
const _InlineQueryResultsButtonPublicKeys = { web_app: "webApp", start_parameter: "startParameter" } as const;
const _InlineQueryResultsButtonWireKeys = invertKeys(_InlineQueryResultsButtonPublicKeys);
const _InlineQueryResultsButtonEncoded = Schema.StructWithRest(
  Schema.Struct({
    text: Schema.String,
    web_app: Schema.optionalKey(Schema.suspend((): Schema.Codec<WebAppInfo, unknown> => WebAppInfo)),
    start_parameter: Schema.optionalKey(Schema.String),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _InlineQueryResultsButtonDecoded = Schema.declare<InlineQueryResultsButton>((input): input is InlineQueryResultsButton => Predicate.isObject(input));
export const InlineQueryResultsButton: Schema.Codec<InlineQueryResultsButton, unknown> = _InlineQueryResultsButtonEncoded.pipe(
  Schema.decodeTo(_InlineQueryResultsButtonDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_InlineQueryResultsButtonPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_InlineQueryResultsButtonWireKeys)),
  }),
);

/** Represents a venue. By default, the venue will be sent by the user. Alternatively, you can use input_message_content to send a message with the specified content instead of the venue. */
export interface InlineQueryResultVenue {
  /** Type of the result, must be venue */
  readonly type: "venue";
  /** Unique identifier for this result, 1-64 Bytes */
  readonly id: string;
  /** Latitude of the venue location in degrees */
  readonly latitude: number;
  /** Longitude of the venue location in degrees */
  readonly longitude: number;
  /** Title of the venue */
  readonly title: string;
  /** Address of the venue */
  readonly address: string;
  /** Optional. Foursquare identifier of the venue if known */
  readonly foursquareId?: string;
  /** Optional. Foursquare type of the venue, if known. (For example, “arts_entertainment/default”, “arts_entertainment/aquarium” or “food/icecream”.) */
  readonly foursquareType?: string;
  /** Optional. Google Places identifier of the venue */
  readonly googlePlaceId?: string;
  /** Optional. Google Places type of the venue. (See supported types.) */
  readonly googlePlaceType?: string;
  /** Optional. Inline keyboard attached to the message */
  readonly replyMarkup?: InlineKeyboardMarkup;
  /** Optional. Content of the message to be sent instead of the venue */
  readonly inputMessageContent?: InputMessageContent;
  /** Optional. Url of the thumbnail for the result */
  readonly thumbnailUrl?: string;
  /** Optional. Thumbnail width */
  readonly thumbnailWidth?: number;
  /** Optional. Thumbnail height */
  readonly thumbnailHeight?: number;
  readonly [key: string]: unknown;
}
const _InlineQueryResultVenuePublicKeys = { foursquare_id: "foursquareId", foursquare_type: "foursquareType", google_place_id: "googlePlaceId", google_place_type: "googlePlaceType", reply_markup: "replyMarkup", input_message_content: "inputMessageContent", thumbnail_url: "thumbnailUrl", thumbnail_width: "thumbnailWidth", thumbnail_height: "thumbnailHeight" } as const;
const _InlineQueryResultVenueWireKeys = invertKeys(_InlineQueryResultVenuePublicKeys);
const _InlineQueryResultVenueEncoded = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("venue"),
    id: Schema.String,
    latitude: Schema.Number,
    longitude: Schema.Number,
    title: Schema.String,
    address: Schema.String,
    foursquare_id: Schema.optionalKey(Schema.String),
    foursquare_type: Schema.optionalKey(Schema.String),
    google_place_id: Schema.optionalKey(Schema.String),
    google_place_type: Schema.optionalKey(Schema.String),
    reply_markup: Schema.optionalKey(Schema.suspend((): Schema.Codec<InlineKeyboardMarkup, unknown> => InlineKeyboardMarkup)),
    input_message_content: Schema.optionalKey(Schema.suspend((): Schema.Codec<InputMessageContent, unknown> => InputMessageContent)),
    thumbnail_url: Schema.optionalKey(Schema.String),
    thumbnail_width: Schema.optionalKey(Schema.Int),
    thumbnail_height: Schema.optionalKey(Schema.Int),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _InlineQueryResultVenueDecoded = Schema.declare<InlineQueryResultVenue>((input): input is InlineQueryResultVenue => Predicate.isObject(input));
export const InlineQueryResultVenue: Schema.Codec<InlineQueryResultVenue, unknown> = _InlineQueryResultVenueEncoded.pipe(
  Schema.decodeTo(_InlineQueryResultVenueDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_InlineQueryResultVenuePublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_InlineQueryResultVenueWireKeys)),
  }),
);

/** Represents a link to a page containing an embedded video player or a video file. By default, this video file will be sent by the user with an optional caption. Alternatively, you can use input_message_content to send a message with the specified content instead of the video. */
export interface InlineQueryResultVideo {
  /** Type of the result, must be video */
  readonly type: "video";
  /** Unique identifier for this result, 1-64 bytes */
  readonly id: string;
  /** A valid URL for the embedded video player or video file */
  readonly videoUrl: string;
  /** MIME type of the content of the video URL, “text/html” or “video/mp4” */
  readonly mimeType: string;
  /** URL of the thumbnail (JPEG only) for the video */
  readonly thumbnailUrl: string;
  /** Title for the result */
  readonly title: string;
  /** Optional. Caption of the video to be sent, 0-1024 characters after entities parsing */
  readonly caption?: string;
  /** Optional. Mode for parsing entities in the video caption. See formatting options for more details. */
  readonly parseMode?: ParseMode;
  /** Optional. List of special entities that appear in the caption, which can be specified instead of parse_mode */
  readonly captionEntities?: ReadonlyArray<MessageEntity>;
  /** Optional. Pass True if the caption must be shown above the message media */
  readonly showCaptionAboveMedia?: boolean;
  /** Optional. Video width */
  readonly videoWidth?: number;
  /** Optional. Video height */
  readonly videoHeight?: number;
  /** Optional. Video duration in seconds */
  readonly videoDuration?: number;
  /** Optional. Short description of the result */
  readonly description?: string;
  /** Optional. Inline keyboard attached to the message */
  readonly replyMarkup?: InlineKeyboardMarkup;
  /** Optional. Content of the message to be sent instead of the video. This field is required if InlineQueryResultVideo is used to send an HTML-page as a result (e.g., a YouTube video). */
  readonly inputMessageContent?: InputMessageContent;
  readonly [key: string]: unknown;
}
const _InlineQueryResultVideoPublicKeys = { video_url: "videoUrl", mime_type: "mimeType", thumbnail_url: "thumbnailUrl", parse_mode: "parseMode", caption_entities: "captionEntities", show_caption_above_media: "showCaptionAboveMedia", video_width: "videoWidth", video_height: "videoHeight", video_duration: "videoDuration", reply_markup: "replyMarkup", input_message_content: "inputMessageContent" } as const;
const _InlineQueryResultVideoWireKeys = invertKeys(_InlineQueryResultVideoPublicKeys);
const _InlineQueryResultVideoEncoded = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("video"),
    id: Schema.String,
    video_url: Schema.String,
    mime_type: Schema.String,
    thumbnail_url: Schema.String,
    title: Schema.String,
    caption: Schema.optionalKey(Schema.String),
    parse_mode: Schema.optionalKey(Schema.suspend((): Schema.Codec<ParseMode, unknown> => ParseMode)),
    caption_entities: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<MessageEntity, unknown> => MessageEntity))),
    show_caption_above_media: Schema.optionalKey(Schema.Boolean),
    video_width: Schema.optionalKey(Schema.Int),
    video_height: Schema.optionalKey(Schema.Int),
    video_duration: Schema.optionalKey(Schema.Int),
    description: Schema.optionalKey(Schema.String),
    reply_markup: Schema.optionalKey(Schema.suspend((): Schema.Codec<InlineKeyboardMarkup, unknown> => InlineKeyboardMarkup)),
    input_message_content: Schema.optionalKey(Schema.suspend((): Schema.Codec<InputMessageContent, unknown> => InputMessageContent)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _InlineQueryResultVideoDecoded = Schema.declare<InlineQueryResultVideo>((input): input is InlineQueryResultVideo => Predicate.isObject(input));
export const InlineQueryResultVideo: Schema.Codec<InlineQueryResultVideo, unknown> = _InlineQueryResultVideoEncoded.pipe(
  Schema.decodeTo(_InlineQueryResultVideoDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_InlineQueryResultVideoPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_InlineQueryResultVideoWireKeys)),
  }),
);

/** Represents a link to a voice recording in an .OGG container encoded with OPUS. By default, this voice recording will be sent by the user. Alternatively, you can use input_message_content to send a message with the specified content instead of the the voice message. */
export interface InlineQueryResultVoice {
  /** Type of the result, must be voice */
  readonly type: "voice";
  /** Unique identifier for this result, 1-64 bytes */
  readonly id: string;
  /** A valid URL for the voice recording */
  readonly voiceUrl: string;
  /** Recording title */
  readonly title: string;
  /** Optional. Caption, 0-1024 characters after entities parsing */
  readonly caption?: string;
  /** Optional. Mode for parsing entities in the voice message caption. See formatting options for more details. */
  readonly parseMode?: ParseMode;
  /** Optional. List of special entities that appear in the caption, which can be specified instead of parse_mode */
  readonly captionEntities?: ReadonlyArray<MessageEntity>;
  /** Optional. Recording duration in seconds */
  readonly voiceDuration?: number;
  /** Optional. Inline keyboard attached to the message */
  readonly replyMarkup?: InlineKeyboardMarkup;
  /** Optional. Content of the message to be sent instead of the voice recording */
  readonly inputMessageContent?: InputMessageContent;
  readonly [key: string]: unknown;
}
const _InlineQueryResultVoicePublicKeys = { voice_url: "voiceUrl", parse_mode: "parseMode", caption_entities: "captionEntities", voice_duration: "voiceDuration", reply_markup: "replyMarkup", input_message_content: "inputMessageContent" } as const;
const _InlineQueryResultVoiceWireKeys = invertKeys(_InlineQueryResultVoicePublicKeys);
const _InlineQueryResultVoiceEncoded = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("voice"),
    id: Schema.String,
    voice_url: Schema.String,
    title: Schema.String,
    caption: Schema.optionalKey(Schema.String),
    parse_mode: Schema.optionalKey(Schema.suspend((): Schema.Codec<ParseMode, unknown> => ParseMode)),
    caption_entities: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<MessageEntity, unknown> => MessageEntity))),
    voice_duration: Schema.optionalKey(Schema.Int),
    reply_markup: Schema.optionalKey(Schema.suspend((): Schema.Codec<InlineKeyboardMarkup, unknown> => InlineKeyboardMarkup)),
    input_message_content: Schema.optionalKey(Schema.suspend((): Schema.Codec<InputMessageContent, unknown> => InputMessageContent)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _InlineQueryResultVoiceDecoded = Schema.declare<InlineQueryResultVoice>((input): input is InlineQueryResultVoice => Predicate.isObject(input));
export const InlineQueryResultVoice: Schema.Codec<InlineQueryResultVoice, unknown> = _InlineQueryResultVoiceEncoded.pipe(
  Schema.decodeTo(_InlineQueryResultVoiceDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_InlineQueryResultVoicePublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_InlineQueryResultVoiceWireKeys)),
  }),
);

/** Describes a checklist to create. */
export interface InputChecklist {
  /** Title of the checklist; 1-255 characters after entities parsing */
  readonly title: string;
  /** Optional. Mode for parsing entities in the title. See formatting options for more details. */
  readonly parseMode?: ParseMode;
  /** Optional. List of special entities that appear in the title, which can be specified instead of parse_mode. Currently, only bold, italic, underline, strikethrough, spoiler, custom_emoji, and date_time entities are allowed. */
  readonly titleEntities?: ReadonlyArray<MessageEntity>;
  /** List of 1-30 tasks in the checklist */
  readonly tasks: ReadonlyArray<InputChecklistTask>;
  /** Optional. Pass True if other users can add tasks to the checklist */
  readonly othersCanAddTasks?: boolean;
  /** Optional. Pass True if other users can mark tasks as done or not done in the checklist */
  readonly othersCanMarkTasksAsDone?: boolean;
  readonly [key: string]: unknown;
}
const _InputChecklistPublicKeys = { parse_mode: "parseMode", title_entities: "titleEntities", others_can_add_tasks: "othersCanAddTasks", others_can_mark_tasks_as_done: "othersCanMarkTasksAsDone" } as const;
const _InputChecklistWireKeys = invertKeys(_InputChecklistPublicKeys);
const _InputChecklistEncoded = Schema.StructWithRest(
  Schema.Struct({
    title: Schema.String,
    parse_mode: Schema.optionalKey(Schema.suspend((): Schema.Codec<ParseMode, unknown> => ParseMode)),
    title_entities: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<MessageEntity, unknown> => MessageEntity))),
    tasks: Schema.Array(Schema.suspend((): Schema.Codec<InputChecklistTask, unknown> => InputChecklistTask)),
    others_can_add_tasks: Schema.optionalKey(Schema.Boolean),
    others_can_mark_tasks_as_done: Schema.optionalKey(Schema.Boolean),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _InputChecklistDecoded = Schema.declare<InputChecklist>((input): input is InputChecklist => Predicate.isObject(input));
export const InputChecklist: Schema.Codec<InputChecklist, unknown> = _InputChecklistEncoded.pipe(
  Schema.decodeTo(_InputChecklistDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_InputChecklistPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_InputChecklistWireKeys)),
  }),
);

/** Describes a task to add to a checklist. */
export interface InputChecklistTask {
  /** Unique identifier of the task; must be positive and unique among all task identifiers currently present in the checklist */
  readonly id: number;
  /** Text of the task; 1-100 characters after entities parsing */
  readonly text: string;
  /** Optional. Mode for parsing entities in the text. See formatting options for more details. */
  readonly parseMode?: ParseMode;
  /** Optional. List of special entities that appear in the text, which can be specified instead of parse_mode. Currently, only bold, italic, underline, strikethrough, spoiler, custom_emoji, and date_time entities are allowed. */
  readonly textEntities?: ReadonlyArray<MessageEntity>;
  readonly [key: string]: unknown;
}
const _InputChecklistTaskPublicKeys = { parse_mode: "parseMode", text_entities: "textEntities" } as const;
const _InputChecklistTaskWireKeys = invertKeys(_InputChecklistTaskPublicKeys);
const _InputChecklistTaskEncoded = Schema.StructWithRest(
  Schema.Struct({
    id: Schema.Int,
    text: Schema.String,
    parse_mode: Schema.optionalKey(Schema.suspend((): Schema.Codec<ParseMode, unknown> => ParseMode)),
    text_entities: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<MessageEntity, unknown> => MessageEntity))),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _InputChecklistTaskDecoded = Schema.declare<InputChecklistTask>((input): input is InputChecklistTask => Predicate.isObject(input));
export const InputChecklistTask: Schema.Codec<InputChecklistTask, unknown> = _InputChecklistTaskEncoded.pipe(
  Schema.decodeTo(_InputChecklistTaskDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_InputChecklistTaskPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_InputChecklistTaskWireKeys)),
  }),
);

/** Represents the content of a contact message to be sent as the result of an inline query. */
export interface InputContactMessageContent {
  /** Contact's phone number */
  readonly phoneNumber: string;
  /** Contact's first name */
  readonly firstName: string;
  /** Optional. Contact's last name */
  readonly lastName?: string;
  /** Optional. Additional data about the contact in the form of a vCard, 0-2048 bytes */
  readonly vcard?: string;
  readonly [key: string]: unknown;
}
const _InputContactMessageContentPublicKeys = { phone_number: "phoneNumber", first_name: "firstName", last_name: "lastName" } as const;
const _InputContactMessageContentWireKeys = invertKeys(_InputContactMessageContentPublicKeys);
const _InputContactMessageContentEncoded = Schema.StructWithRest(
  Schema.Struct({
    phone_number: Schema.String,
    first_name: Schema.String,
    last_name: Schema.optionalKey(Schema.String),
    vcard: Schema.optionalKey(Schema.String),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _InputContactMessageContentDecoded = Schema.declare<InputContactMessageContent>((input): input is InputContactMessageContent => Predicate.isObject(input));
export const InputContactMessageContent: Schema.Codec<InputContactMessageContent, unknown> = _InputContactMessageContentEncoded.pipe(
  Schema.decodeTo(_InputContactMessageContentDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_InputContactMessageContentPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_InputContactMessageContentWireKeys)),
  }),
);

/** This object represents the contents of a file to be uploaded. Must be posted using multipart/form-data in the usual way that files are uploaded via the browser. */
export type InputFile = Blob;
export const InputFile: Schema.Codec<InputFile> = Schema.instanceOf(Blob);

/** Represents the content of an invoice message to be sent as the result of an inline query. */
export interface InputInvoiceMessageContent {
  /** Product name, 1-32 characters */
  readonly title: string;
  /** Product description, 1-255 characters */
  readonly description: string;
  /** Bot-defined invoice payload, 1-128 bytes. This will not be displayed to the user, use it for your internal processes. */
  readonly payload: string;
  /** Optional. Payment provider token, obtained via @BotFather. Pass an empty string for payments in Telegram Stars. */
  readonly providerToken?: string;
  /** Three-letter ISO 4217 currency code, see more on currencies. Pass “XTR” for payments in Telegram Stars. */
  readonly currency: string;
  /** Price breakdown, a JSON-serialized list of components (e.g. product price, tax, discount, delivery cost, delivery tax, bonus, etc.). Must contain exactly one item for payments in Telegram Stars. */
  readonly prices: ReadonlyArray<LabeledPrice>;
  /** Optional. The maximum accepted amount for tips in the smallest units of the currency (integer, not float/double). For example, for a maximum tip of US$ 1.45 pass max_tip_amount = 145. See the exp parameter in currencies.json, it shows the number of digits past the decimal point for each currency (2 for the majority of currencies). Defaults to 0. Not supported for payments in Telegram Stars. */
  readonly maxTipAmount?: number;
  /** Optional. A JSON-serialized Array of suggested amounts of tip in the smallest units of the currency (integer, not float/double). At most 4 suggested tip amounts can be specified. The suggested tip amounts must be positive, passed in a strictly increased order and must not exceed max_tip_amount. */
  readonly suggestedTipAmounts?: ReadonlyArray<number>;
  /** Optional. A JSON-serialized object for data about the invoice, which will be shared with the payment provider. A detailed description of the required fields should be provided by the payment provider. */
  readonly providerData?: string;
  /** Optional. URL of the product photo for the invoice. Can be a photo of the goods or a marketing image for a service. */
  readonly photoUrl?: string;
  /** Optional. Photo size in bytes */
  readonly photoSize?: number;
  /** Optional. Photo width */
  readonly photoWidth?: number;
  /** Optional. Photo height */
  readonly photoHeight?: number;
  /** Optional. Pass True if you require the user's full name to complete the order. Ignored for payments in Telegram Stars. */
  readonly needName?: boolean;
  /** Optional. Pass True if you require the user's phone number to complete the order. Ignored for payments in Telegram Stars. */
  readonly needPhoneNumber?: boolean;
  /** Optional. Pass True if you require the user's email address to complete the order. Ignored for payments in Telegram Stars. */
  readonly needEmail?: boolean;
  /** Optional. Pass True if you require the user's shipping address to complete the order. Ignored for payments in Telegram Stars. */
  readonly needShippingAddress?: boolean;
  /** Optional. Pass True if the user's phone number should be sent to the provider. Ignored for payments in Telegram Stars. */
  readonly sendPhoneNumberToProvider?: boolean;
  /** Optional. Pass True if the user's email address should be sent to the provider. Ignored for payments in Telegram Stars. */
  readonly sendEmailToProvider?: boolean;
  /** Optional. Pass True if the final price depends on the shipping method. Ignored for payments in Telegram Stars. */
  readonly isFlexible?: boolean;
  readonly [key: string]: unknown;
}
const _InputInvoiceMessageContentPublicKeys = { provider_token: "providerToken", max_tip_amount: "maxTipAmount", suggested_tip_amounts: "suggestedTipAmounts", provider_data: "providerData", photo_url: "photoUrl", photo_size: "photoSize", photo_width: "photoWidth", photo_height: "photoHeight", need_name: "needName", need_phone_number: "needPhoneNumber", need_email: "needEmail", need_shipping_address: "needShippingAddress", send_phone_number_to_provider: "sendPhoneNumberToProvider", send_email_to_provider: "sendEmailToProvider", is_flexible: "isFlexible" } as const;
const _InputInvoiceMessageContentWireKeys = invertKeys(_InputInvoiceMessageContentPublicKeys);
const _InputInvoiceMessageContentEncoded = Schema.StructWithRest(
  Schema.Struct({
    title: Schema.String,
    description: Schema.String,
    payload: Schema.String,
    provider_token: Schema.optionalKey(Schema.String),
    currency: Schema.String,
    prices: Schema.Array(Schema.suspend((): Schema.Codec<LabeledPrice, unknown> => LabeledPrice)),
    max_tip_amount: Schema.optionalKey(Schema.Int),
    suggested_tip_amounts: Schema.optionalKey(Schema.Array(Schema.Int)),
    provider_data: Schema.optionalKey(Schema.String),
    photo_url: Schema.optionalKey(Schema.String),
    photo_size: Schema.optionalKey(Schema.Int),
    photo_width: Schema.optionalKey(Schema.Int),
    photo_height: Schema.optionalKey(Schema.Int),
    need_name: Schema.optionalKey(Schema.Boolean),
    need_phone_number: Schema.optionalKey(Schema.Boolean),
    need_email: Schema.optionalKey(Schema.Boolean),
    need_shipping_address: Schema.optionalKey(Schema.Boolean),
    send_phone_number_to_provider: Schema.optionalKey(Schema.Boolean),
    send_email_to_provider: Schema.optionalKey(Schema.Boolean),
    is_flexible: Schema.optionalKey(Schema.Boolean),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _InputInvoiceMessageContentDecoded = Schema.declare<InputInvoiceMessageContent>((input): input is InputInvoiceMessageContent => Predicate.isObject(input));
export const InputInvoiceMessageContent: Schema.Codec<InputInvoiceMessageContent, unknown> = _InputInvoiceMessageContentEncoded.pipe(
  Schema.decodeTo(_InputInvoiceMessageContentDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_InputInvoiceMessageContentPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_InputInvoiceMessageContentWireKeys)),
  }),
);

/** Represents the content of a location message to be sent as the result of an inline query. */
export interface InputLocationMessageContent {
  /** Latitude of the location in degrees */
  readonly latitude: number;
  /** Longitude of the location in degrees */
  readonly longitude: number;
  /** Optional. The radius of uncertainty for the location, measured in meters; 0-1500 */
  readonly horizontalAccuracy?: number;
  /** Optional. Period in seconds during which the location can be updated, must be between 60 and 86400, or 0x7FFFFFFF for live locations that can be edited indefinitely */
  readonly livePeriod?: number;
  /** Optional. For live locations, a direction in which the user is moving, in degrees. Must be between 1 and 360 if specified. */
  readonly heading?: number;
  /** Optional. For live locations, a maximum distance for proximity alerts about approaching another chat member, in meters. Must be between 1 and 100000 if specified. */
  readonly proximityAlertRadius?: number;
  readonly [key: string]: unknown;
}
const _InputLocationMessageContentPublicKeys = { horizontal_accuracy: "horizontalAccuracy", live_period: "livePeriod", proximity_alert_radius: "proximityAlertRadius" } as const;
const _InputLocationMessageContentWireKeys = invertKeys(_InputLocationMessageContentPublicKeys);
const _InputLocationMessageContentEncoded = Schema.StructWithRest(
  Schema.Struct({
    latitude: Schema.Number,
    longitude: Schema.Number,
    horizontal_accuracy: Schema.optionalKey(Schema.Number),
    live_period: Schema.optionalKey(Schema.Int),
    heading: Schema.optionalKey(Schema.Int),
    proximity_alert_radius: Schema.optionalKey(Schema.Int),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _InputLocationMessageContentDecoded = Schema.declare<InputLocationMessageContent>((input): input is InputLocationMessageContent => Predicate.isObject(input));
export const InputLocationMessageContent: Schema.Codec<InputLocationMessageContent, unknown> = _InputLocationMessageContentEncoded.pipe(
  Schema.decodeTo(_InputLocationMessageContentDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_InputLocationMessageContentPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_InputLocationMessageContentWireKeys)),
  }),
);

/** This object represents the content of a media message to be sent. It should be one of */
export type InputMedia = InputMediaAnimation | InputMediaAudio | InputMediaDocument | InputMediaLivePhoto | InputMediaPhoto | InputMediaVideo;
export const InputMedia: Schema.Codec<InputMedia, unknown> = Schema.Union([Schema.suspend((): Schema.Codec<InputMediaAnimation, unknown> => InputMediaAnimation), Schema.suspend((): Schema.Codec<InputMediaAudio, unknown> => InputMediaAudio), Schema.suspend((): Schema.Codec<InputMediaDocument, unknown> => InputMediaDocument), Schema.suspend((): Schema.Codec<InputMediaLivePhoto, unknown> => InputMediaLivePhoto), Schema.suspend((): Schema.Codec<InputMediaPhoto, unknown> => InputMediaPhoto), Schema.suspend((): Schema.Codec<InputMediaVideo, unknown> => InputMediaVideo)]);

/** Represents an animation file (GIF or H.264/MPEG-4 AVC video without sound) to be sent. */
export interface InputMediaAnimation {
  /** Type of the media, must be animation */
  readonly type: "animation";
  /** File to send. Pass a file_id to send a file that exists on the Telegram servers (recommended), pass an HTTP URL for Telegram to get a file from the Internet, or pass “attach://<file_attach_name>” to upload a new one using multipart/form-data under <file_attach_name> name. More information on Sending Files » */
  readonly media: InputFile | string;
  /** Optional. Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails can't be reused and can be only uploaded as a new file, so you can pass “attach://<file_attach_name>” if the thumbnail was uploaded using multipart/form-data under <file_attach_name>. More information on Sending Files » */
  readonly thumbnail?: InputFile;
  /** Optional. Caption of the animation to be sent, 0-1024 characters after entities parsing */
  readonly caption?: string;
  /** Optional. Mode for parsing entities in the animation caption. See formatting options for more details. */
  readonly parseMode?: ParseMode;
  /** Optional. List of special entities that appear in the caption, which can be specified instead of parse_mode */
  readonly captionEntities?: ReadonlyArray<MessageEntity>;
  /** Optional. Pass True if the caption must be shown above the message media */
  readonly showCaptionAboveMedia?: boolean;
  /** Optional. Animation width */
  readonly width?: number;
  /** Optional. Animation height */
  readonly height?: number;
  /** Optional. Animation duration in seconds */
  readonly duration?: number;
  /** Optional. Pass True if the animation needs to be covered with a spoiler animation */
  readonly hasSpoiler?: boolean;
  readonly [key: string]: unknown;
}
const _InputMediaAnimationPublicKeys = { parse_mode: "parseMode", caption_entities: "captionEntities", show_caption_above_media: "showCaptionAboveMedia", has_spoiler: "hasSpoiler" } as const;
const _InputMediaAnimationWireKeys = invertKeys(_InputMediaAnimationPublicKeys);
const _InputMediaAnimationEncoded = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("animation"),
    media: Schema.Union([Schema.suspend((): Schema.Codec<InputFile, unknown> => InputFile), Schema.String]),
    thumbnail: Schema.optionalKey(Schema.suspend((): Schema.Codec<InputFile, unknown> => InputFile)),
    caption: Schema.optionalKey(Schema.String),
    parse_mode: Schema.optionalKey(Schema.suspend((): Schema.Codec<ParseMode, unknown> => ParseMode)),
    caption_entities: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<MessageEntity, unknown> => MessageEntity))),
    show_caption_above_media: Schema.optionalKey(Schema.Boolean),
    width: Schema.optionalKey(Schema.Int),
    height: Schema.optionalKey(Schema.Int),
    duration: Schema.optionalKey(Schema.Int),
    has_spoiler: Schema.optionalKey(Schema.Boolean),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _InputMediaAnimationDecoded = Schema.declare<InputMediaAnimation>((input): input is InputMediaAnimation => Predicate.isObject(input));
export const InputMediaAnimation: Schema.Codec<InputMediaAnimation, unknown> = _InputMediaAnimationEncoded.pipe(
  Schema.decodeTo(_InputMediaAnimationDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_InputMediaAnimationPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_InputMediaAnimationWireKeys)),
  }),
);

/** Represents an audio file to be treated as music to be sent. */
export interface InputMediaAudio {
  /** Type of the media, must be audio */
  readonly type: "audio";
  /** File to send. Pass a file_id to send a file that exists on the Telegram servers (recommended), pass an HTTP URL for Telegram to get a file from the Internet, or pass “attach://<file_attach_name>” to upload a new one using multipart/form-data under <file_attach_name> name. More information on Sending Files » */
  readonly media: InputFile | string;
  /** Optional. Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails can't be reused and can be only uploaded as a new file, so you can pass “attach://<file_attach_name>” if the thumbnail was uploaded using multipart/form-data under <file_attach_name>. More information on Sending Files » */
  readonly thumbnail?: InputFile;
  /** Optional. Caption of the audio to be sent, 0-1024 characters after entities parsing */
  readonly caption?: string;
  /** Optional. Mode for parsing entities in the audio caption. See formatting options for more details. */
  readonly parseMode?: ParseMode;
  /** Optional. List of special entities that appear in the caption, which can be specified instead of parse_mode */
  readonly captionEntities?: ReadonlyArray<MessageEntity>;
  /** Optional. Duration of the audio in seconds */
  readonly duration?: number;
  /** Optional. Performer of the audio */
  readonly performer?: string;
  /** Optional. Title of the audio */
  readonly title?: string;
  readonly [key: string]: unknown;
}
const _InputMediaAudioPublicKeys = { parse_mode: "parseMode", caption_entities: "captionEntities" } as const;
const _InputMediaAudioWireKeys = invertKeys(_InputMediaAudioPublicKeys);
const _InputMediaAudioEncoded = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("audio"),
    media: Schema.Union([Schema.suspend((): Schema.Codec<InputFile, unknown> => InputFile), Schema.String]),
    thumbnail: Schema.optionalKey(Schema.suspend((): Schema.Codec<InputFile, unknown> => InputFile)),
    caption: Schema.optionalKey(Schema.String),
    parse_mode: Schema.optionalKey(Schema.suspend((): Schema.Codec<ParseMode, unknown> => ParseMode)),
    caption_entities: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<MessageEntity, unknown> => MessageEntity))),
    duration: Schema.optionalKey(Schema.Int),
    performer: Schema.optionalKey(Schema.String),
    title: Schema.optionalKey(Schema.String),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _InputMediaAudioDecoded = Schema.declare<InputMediaAudio>((input): input is InputMediaAudio => Predicate.isObject(input));
export const InputMediaAudio: Schema.Codec<InputMediaAudio, unknown> = _InputMediaAudioEncoded.pipe(
  Schema.decodeTo(_InputMediaAudioDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_InputMediaAudioPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_InputMediaAudioWireKeys)),
  }),
);

/** Represents a general file to be sent. */
export interface InputMediaDocument {
  /** Type of the media, must be document */
  readonly type: "document";
  /** File to send. Pass a file_id to send a file that exists on the Telegram servers (recommended), pass an HTTP URL for Telegram to get a file from the Internet, or pass “attach://<file_attach_name>” to upload a new one using multipart/form-data under <file_attach_name> name. More information on Sending Files » */
  readonly media: InputFile | string;
  /** Optional. Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails can't be reused and can be only uploaded as a new file, so you can pass “attach://<file_attach_name>” if the thumbnail was uploaded using multipart/form-data under <file_attach_name>. More information on Sending Files » */
  readonly thumbnail?: InputFile;
  /** Optional. Caption of the document to be sent, 0-1024 characters after entities parsing */
  readonly caption?: string;
  /** Optional. Mode for parsing entities in the document caption. See formatting options for more details. */
  readonly parseMode?: ParseMode;
  /** Optional. List of special entities that appear in the caption, which can be specified instead of parse_mode */
  readonly captionEntities?: ReadonlyArray<MessageEntity>;
  /** Optional. Disables automatic server-side content type detection for files uploaded using multipart/form-data. Always True, if the document is sent as part of an album. */
  readonly disableContentTypeDetection?: boolean;
  readonly [key: string]: unknown;
}
const _InputMediaDocumentPublicKeys = { parse_mode: "parseMode", caption_entities: "captionEntities", disable_content_type_detection: "disableContentTypeDetection" } as const;
const _InputMediaDocumentWireKeys = invertKeys(_InputMediaDocumentPublicKeys);
const _InputMediaDocumentEncoded = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("document"),
    media: Schema.Union([Schema.suspend((): Schema.Codec<InputFile, unknown> => InputFile), Schema.String]),
    thumbnail: Schema.optionalKey(Schema.suspend((): Schema.Codec<InputFile, unknown> => InputFile)),
    caption: Schema.optionalKey(Schema.String),
    parse_mode: Schema.optionalKey(Schema.suspend((): Schema.Codec<ParseMode, unknown> => ParseMode)),
    caption_entities: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<MessageEntity, unknown> => MessageEntity))),
    disable_content_type_detection: Schema.optionalKey(Schema.Boolean),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _InputMediaDocumentDecoded = Schema.declare<InputMediaDocument>((input): input is InputMediaDocument => Predicate.isObject(input));
export const InputMediaDocument: Schema.Codec<InputMediaDocument, unknown> = _InputMediaDocumentEncoded.pipe(
  Schema.decodeTo(_InputMediaDocumentDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_InputMediaDocumentPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_InputMediaDocumentWireKeys)),
  }),
);

/** Represents an HTTP link to be sent. */
export interface InputMediaLink {
  /** Type of the media, must be link */
  readonly type: "link";
  /** HTTP URL of the link */
  readonly url: string;
  readonly [key: string]: unknown;
}
export const InputMediaLink: Schema.Codec<InputMediaLink, unknown> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("link"),
    url: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Represents a live photo to be sent. */
export interface InputMediaLivePhoto {
  /** Type of the media, must be live_photo */
  readonly type: "live_photo";
  /** Video of the live photo to send. Pass a file_id to send a file that exists on the Telegram servers (recommended) or pass “attach://<file_attach_name>” to upload a new one using multipart/form-data under <file_attach_name> name. More information on Sending Files ». Sending live photos by a URL is currently unsupported. */
  readonly media: InputFile | string;
  /** The static photo to send. Pass a file_id to send a file that exists on the Telegram servers (recommended) or pass “attach://<file_attach_name>” to upload a new one using multipart/form-data under <file_attach_name> name. More information on Sending Files ». Sending live photos by a URL is currently unsupported. */
  readonly photo: InputFile | string;
  /** Optional. Caption of the live photo to be sent, 0-1024 characters after entities parsing */
  readonly caption?: string;
  /** Optional. Mode for parsing entities in the live photo caption. See formatting options for more details. */
  readonly parseMode?: ParseMode;
  /** Optional. List of special entities that appear in the caption, which can be specified instead of parse_mode */
  readonly captionEntities?: ReadonlyArray<MessageEntity>;
  /** Optional. Pass True if the caption must be shown above the message media */
  readonly showCaptionAboveMedia?: boolean;
  /** Optional. Pass True if the live photo needs to be covered with a spoiler animation */
  readonly hasSpoiler?: boolean;
  readonly [key: string]: unknown;
}
const _InputMediaLivePhotoPublicKeys = { parse_mode: "parseMode", caption_entities: "captionEntities", show_caption_above_media: "showCaptionAboveMedia", has_spoiler: "hasSpoiler" } as const;
const _InputMediaLivePhotoWireKeys = invertKeys(_InputMediaLivePhotoPublicKeys);
const _InputMediaLivePhotoEncoded = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("live_photo"),
    media: Schema.Union([Schema.suspend((): Schema.Codec<InputFile, unknown> => InputFile), Schema.String]),
    photo: Schema.Union([Schema.suspend((): Schema.Codec<InputFile, unknown> => InputFile), Schema.String]),
    caption: Schema.optionalKey(Schema.String),
    parse_mode: Schema.optionalKey(Schema.suspend((): Schema.Codec<ParseMode, unknown> => ParseMode)),
    caption_entities: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<MessageEntity, unknown> => MessageEntity))),
    show_caption_above_media: Schema.optionalKey(Schema.Boolean),
    has_spoiler: Schema.optionalKey(Schema.Boolean),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _InputMediaLivePhotoDecoded = Schema.declare<InputMediaLivePhoto>((input): input is InputMediaLivePhoto => Predicate.isObject(input));
export const InputMediaLivePhoto: Schema.Codec<InputMediaLivePhoto, unknown> = _InputMediaLivePhotoEncoded.pipe(
  Schema.decodeTo(_InputMediaLivePhotoDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_InputMediaLivePhotoPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_InputMediaLivePhotoWireKeys)),
  }),
);

/** Represents a location to be sent. */
export interface InputMediaLocation {
  /** Type of the media, must be location */
  readonly type: "location";
  /** Latitude of the location */
  readonly latitude: number;
  /** Longitude of the location */
  readonly longitude: number;
  /** Optional. The radius of uncertainty for the location, measured in meters; 0-1500 */
  readonly horizontalAccuracy?: number;
  readonly [key: string]: unknown;
}
const _InputMediaLocationPublicKeys = { horizontal_accuracy: "horizontalAccuracy" } as const;
const _InputMediaLocationWireKeys = invertKeys(_InputMediaLocationPublicKeys);
const _InputMediaLocationEncoded = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("location"),
    latitude: Schema.Number,
    longitude: Schema.Number,
    horizontal_accuracy: Schema.optionalKey(Schema.Number),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _InputMediaLocationDecoded = Schema.declare<InputMediaLocation>((input): input is InputMediaLocation => Predicate.isObject(input));
export const InputMediaLocation: Schema.Codec<InputMediaLocation, unknown> = _InputMediaLocationEncoded.pipe(
  Schema.decodeTo(_InputMediaLocationDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_InputMediaLocationPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_InputMediaLocationWireKeys)),
  }),
);

/** Represents a photo to be sent. */
export interface InputMediaPhoto {
  /** Type of the media, must be photo */
  readonly type: "photo";
  /** File to send. Pass a file_id to send a file that exists on the Telegram servers (recommended), pass an HTTP URL for Telegram to get a file from the Internet, or pass “attach://<file_attach_name>” to upload a new one using multipart/form-data under <file_attach_name> name. More information on Sending Files » */
  readonly media: InputFile | string;
  /** Optional. Caption of the photo to be sent, 0-1024 characters after entities parsing */
  readonly caption?: string;
  /** Optional. Mode for parsing entities in the photo caption. See formatting options for more details. */
  readonly parseMode?: ParseMode;
  /** Optional. List of special entities that appear in the caption, which can be specified instead of parse_mode */
  readonly captionEntities?: ReadonlyArray<MessageEntity>;
  /** Optional. Pass True if the caption must be shown above the message media */
  readonly showCaptionAboveMedia?: boolean;
  /** Optional. Pass True if the photo needs to be covered with a spoiler animation */
  readonly hasSpoiler?: boolean;
  readonly [key: string]: unknown;
}
const _InputMediaPhotoPublicKeys = { parse_mode: "parseMode", caption_entities: "captionEntities", show_caption_above_media: "showCaptionAboveMedia", has_spoiler: "hasSpoiler" } as const;
const _InputMediaPhotoWireKeys = invertKeys(_InputMediaPhotoPublicKeys);
const _InputMediaPhotoEncoded = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("photo"),
    media: Schema.Union([Schema.suspend((): Schema.Codec<InputFile, unknown> => InputFile), Schema.String]),
    caption: Schema.optionalKey(Schema.String),
    parse_mode: Schema.optionalKey(Schema.suspend((): Schema.Codec<ParseMode, unknown> => ParseMode)),
    caption_entities: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<MessageEntity, unknown> => MessageEntity))),
    show_caption_above_media: Schema.optionalKey(Schema.Boolean),
    has_spoiler: Schema.optionalKey(Schema.Boolean),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _InputMediaPhotoDecoded = Schema.declare<InputMediaPhoto>((input): input is InputMediaPhoto => Predicate.isObject(input));
export const InputMediaPhoto: Schema.Codec<InputMediaPhoto, unknown> = _InputMediaPhotoEncoded.pipe(
  Schema.decodeTo(_InputMediaPhotoDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_InputMediaPhotoPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_InputMediaPhotoWireKeys)),
  }),
);

/** Represents a sticker file to be sent. */
export interface InputMediaSticker {
  /** Type of the media, must be sticker */
  readonly type: "sticker";
  /** File to send. Pass a file_id to send a file that exists on the Telegram servers (recommended), pass an HTTP URL for Telegram to get a .WEBP sticker from the Internet, or pass “attach://<file_attach_name>” to upload a new .WEBP, .TGS, or .WEBM sticker using multipart/form-data under <file_attach_name> name. More information on Sending Files » */
  readonly media: InputFile | string;
  /** Optional. Emoji associated with the sticker; only for just uploaded stickers */
  readonly emoji?: string;
  readonly [key: string]: unknown;
}
export const InputMediaSticker: Schema.Codec<InputMediaSticker, unknown> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("sticker"),
    media: Schema.Union([Schema.suspend((): Schema.Codec<InputFile, unknown> => InputFile), Schema.String]),
    emoji: Schema.optionalKey(Schema.String),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Represents a venue to be sent. */
export interface InputMediaVenue {
  /** Type of the media, must be venue */
  readonly type: "venue";
  /** Latitude of the location */
  readonly latitude: number;
  /** Longitude of the location */
  readonly longitude: number;
  /** Name of the venue */
  readonly title: string;
  /** Address of the venue */
  readonly address: string;
  /** Optional. Foursquare identifier of the venue */
  readonly foursquareId?: string;
  /** Optional. Foursquare type of the venue, if known. (For example, “arts_entertainment/default”, “arts_entertainment/aquarium” or “food/icecream”.) */
  readonly foursquareType?: string;
  /** Optional. Google Places identifier of the venue */
  readonly googlePlaceId?: string;
  /** Optional. Google Places type of the venue. (See supported types.) */
  readonly googlePlaceType?: string;
  readonly [key: string]: unknown;
}
const _InputMediaVenuePublicKeys = { foursquare_id: "foursquareId", foursquare_type: "foursquareType", google_place_id: "googlePlaceId", google_place_type: "googlePlaceType" } as const;
const _InputMediaVenueWireKeys = invertKeys(_InputMediaVenuePublicKeys);
const _InputMediaVenueEncoded = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("venue"),
    latitude: Schema.Number,
    longitude: Schema.Number,
    title: Schema.String,
    address: Schema.String,
    foursquare_id: Schema.optionalKey(Schema.String),
    foursquare_type: Schema.optionalKey(Schema.String),
    google_place_id: Schema.optionalKey(Schema.String),
    google_place_type: Schema.optionalKey(Schema.String),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _InputMediaVenueDecoded = Schema.declare<InputMediaVenue>((input): input is InputMediaVenue => Predicate.isObject(input));
export const InputMediaVenue: Schema.Codec<InputMediaVenue, unknown> = _InputMediaVenueEncoded.pipe(
  Schema.decodeTo(_InputMediaVenueDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_InputMediaVenuePublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_InputMediaVenueWireKeys)),
  }),
);

/** Represents a video to be sent. */
export interface InputMediaVideo {
  /** Type of the media, must be video */
  readonly type: "video";
  /** File to send. Pass a file_id to send a file that exists on the Telegram servers (recommended), pass an HTTP URL for Telegram to get a file from the Internet, or pass “attach://<file_attach_name>” to upload a new one using multipart/form-data under <file_attach_name> name. More information on Sending Files » */
  readonly media: InputFile | string;
  /** Optional. Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails can't be reused and can be only uploaded as a new file, so you can pass “attach://<file_attach_name>” if the thumbnail was uploaded using multipart/form-data under <file_attach_name>. More information on Sending Files » */
  readonly thumbnail?: InputFile;
  /** Optional. Cover for the video in the message. Pass a file_id to send a file that exists on the Telegram servers (recommended), pass an HTTP URL for Telegram to get a file from the Internet, or pass “attach://<file_attach_name>” to upload a new one using multipart/form-data under <file_attach_name> name. More information on Sending Files » */
  readonly cover?: InputFile | string;
  /** Optional. Start timestamp for the video in the message */
  readonly startTimestamp?: number;
  /** Optional. Caption of the video to be sent, 0-1024 characters after entities parsing */
  readonly caption?: string;
  /** Optional. Mode for parsing entities in the video caption. See formatting options for more details. */
  readonly parseMode?: ParseMode;
  /** Optional. List of special entities that appear in the caption, which can be specified instead of parse_mode */
  readonly captionEntities?: ReadonlyArray<MessageEntity>;
  /** Optional. Pass True if the caption must be shown above the message media */
  readonly showCaptionAboveMedia?: boolean;
  /** Optional. Video width */
  readonly width?: number;
  /** Optional. Video height */
  readonly height?: number;
  /** Optional. Video duration in seconds */
  readonly duration?: number;
  /** Optional. Pass True if the uploaded video is suitable for streaming */
  readonly supportsStreaming?: boolean;
  /** Optional. Pass True if the video needs to be covered with a spoiler animation */
  readonly hasSpoiler?: boolean;
  readonly [key: string]: unknown;
}
const _InputMediaVideoPublicKeys = { start_timestamp: "startTimestamp", parse_mode: "parseMode", caption_entities: "captionEntities", show_caption_above_media: "showCaptionAboveMedia", supports_streaming: "supportsStreaming", has_spoiler: "hasSpoiler" } as const;
const _InputMediaVideoWireKeys = invertKeys(_InputMediaVideoPublicKeys);
const _InputMediaVideoEncoded = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("video"),
    media: Schema.Union([Schema.suspend((): Schema.Codec<InputFile, unknown> => InputFile), Schema.String]),
    thumbnail: Schema.optionalKey(Schema.suspend((): Schema.Codec<InputFile, unknown> => InputFile)),
    cover: Schema.optionalKey(Schema.Union([Schema.suspend((): Schema.Codec<InputFile, unknown> => InputFile), Schema.String])),
    start_timestamp: Schema.optionalKey(Schema.Int),
    caption: Schema.optionalKey(Schema.String),
    parse_mode: Schema.optionalKey(Schema.suspend((): Schema.Codec<ParseMode, unknown> => ParseMode)),
    caption_entities: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<MessageEntity, unknown> => MessageEntity))),
    show_caption_above_media: Schema.optionalKey(Schema.Boolean),
    width: Schema.optionalKey(Schema.Int),
    height: Schema.optionalKey(Schema.Int),
    duration: Schema.optionalKey(Schema.Int),
    supports_streaming: Schema.optionalKey(Schema.Boolean),
    has_spoiler: Schema.optionalKey(Schema.Boolean),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _InputMediaVideoDecoded = Schema.declare<InputMediaVideo>((input): input is InputMediaVideo => Predicate.isObject(input));
export const InputMediaVideo: Schema.Codec<InputMediaVideo, unknown> = _InputMediaVideoEncoded.pipe(
  Schema.decodeTo(_InputMediaVideoDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_InputMediaVideoPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_InputMediaVideoWireKeys)),
  }),
);

/** Represents a voice message file to be sent. */
export interface InputMediaVoiceNote {
  /** Type of the media, must be voice_note */
  readonly type: string;
  /** File to send. Pass a file_id to send a file that exists on the Telegram servers (recommended), pass an HTTP URL for Telegram to get a file from the Internet, or pass "attach://<file_attach_name>" to upload a new one using multipart/form-data under <file_attach_name> name. More information on Sending Files » */
  readonly media: InputFile | string;
  /** Optional. Caption of the voice message to be sent, 0-1024 characters after entities parsing */
  readonly caption?: string;
  /** Optional. Mode for parsing entities in the voice message caption. See formatting options for more details. */
  readonly parseMode?: ParseMode;
  /** Optional. List of special entities that appear in the caption, which can be specified instead of parse_mode */
  readonly captionEntities?: ReadonlyArray<MessageEntity>;
  /** Optional. Duration of the voice message in seconds */
  readonly duration?: number;
  readonly [key: string]: unknown;
}
const _InputMediaVoiceNotePublicKeys = { parse_mode: "parseMode", caption_entities: "captionEntities" } as const;
const _InputMediaVoiceNoteWireKeys = invertKeys(_InputMediaVoiceNotePublicKeys);
const _InputMediaVoiceNoteEncoded = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    media: Schema.Union([Schema.suspend((): Schema.Codec<InputFile, unknown> => InputFile), Schema.String]),
    caption: Schema.optionalKey(Schema.String),
    parse_mode: Schema.optionalKey(Schema.suspend((): Schema.Codec<ParseMode, unknown> => ParseMode)),
    caption_entities: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<MessageEntity, unknown> => MessageEntity))),
    duration: Schema.optionalKey(Schema.Int),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _InputMediaVoiceNoteDecoded = Schema.declare<InputMediaVoiceNote>((input): input is InputMediaVoiceNote => Predicate.isObject(input));
export const InputMediaVoiceNote: Schema.Codec<InputMediaVoiceNote, unknown> = _InputMediaVoiceNoteEncoded.pipe(
  Schema.decodeTo(_InputMediaVoiceNoteDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_InputMediaVoiceNotePublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_InputMediaVoiceNoteWireKeys)),
  }),
);

/** This object represents the content of a message to be sent as a result of an inline query. Telegram clients currently support the following types: */
export type InputMessageContent = InputTextMessageContent | InputRichMessageContent | InputLocationMessageContent | InputVenueMessageContent | InputContactMessageContent | InputInvoiceMessageContent;
export const InputMessageContent: Schema.Codec<InputMessageContent, unknown> = Schema.Union([Schema.suspend((): Schema.Codec<InputTextMessageContent, unknown> => InputTextMessageContent), Schema.suspend((): Schema.Codec<InputRichMessageContent, unknown> => InputRichMessageContent), Schema.suspend((): Schema.Codec<InputLocationMessageContent, unknown> => InputLocationMessageContent), Schema.suspend((): Schema.Codec<InputVenueMessageContent, unknown> => InputVenueMessageContent), Schema.suspend((): Schema.Codec<InputContactMessageContent, unknown> => InputContactMessageContent), Schema.suspend((): Schema.Codec<InputInvoiceMessageContent, unknown> => InputInvoiceMessageContent)]);

/** This object describes the paid media to be sent. Currently, it can be one of */
export type InputPaidMedia = InputPaidMediaLivePhoto | InputPaidMediaPhoto | InputPaidMediaVideo;
export const InputPaidMedia: Schema.Codec<InputPaidMedia, unknown> = Schema.Union([Schema.suspend((): Schema.Codec<InputPaidMediaLivePhoto, unknown> => InputPaidMediaLivePhoto), Schema.suspend((): Schema.Codec<InputPaidMediaPhoto, unknown> => InputPaidMediaPhoto), Schema.suspend((): Schema.Codec<InputPaidMediaVideo, unknown> => InputPaidMediaVideo)]);

/** The paid media to send is a live photo. */
export interface InputPaidMediaLivePhoto {
  /** Type of the media, must be live_photo */
  readonly type: "live_photo";
  /** Video of the live photo to send. Pass a file_id to send a file that exists on the Telegram servers (recommended) or pass “attach://<file_attach_name>” to upload a new one using multipart/form-data under <file_attach_name> name. More information on Sending Files ». Sending live photos by a URL is currently unsupported. */
  readonly media: InputFile | string;
  /** The static photo to send. Pass a file_id to send a file that exists on the Telegram servers (recommended) or pass “attach://<file_attach_name>” to upload a new one using multipart/form-data under <file_attach_name> name. More information on Sending Files ». Sending live photos by a URL is currently unsupported. */
  readonly photo: InputFile | string;
  readonly [key: string]: unknown;
}
export const InputPaidMediaLivePhoto: Schema.Codec<InputPaidMediaLivePhoto, unknown> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("live_photo"),
    media: Schema.Union([Schema.suspend((): Schema.Codec<InputFile, unknown> => InputFile), Schema.String]),
    photo: Schema.Union([Schema.suspend((): Schema.Codec<InputFile, unknown> => InputFile), Schema.String]),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** The paid media to send is a photo. */
export interface InputPaidMediaPhoto {
  /** Type of the media, must be photo */
  readonly type: "photo";
  /** File to send. Pass a file_id to send a file that exists on the Telegram servers (recommended), pass an HTTP URL for Telegram to get a file from the Internet, or pass “attach://<file_attach_name>” to upload a new one using multipart/form-data under <file_attach_name> name. More information on Sending Files » */
  readonly media: InputFile | string;
  readonly [key: string]: unknown;
}
export const InputPaidMediaPhoto: Schema.Codec<InputPaidMediaPhoto, unknown> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("photo"),
    media: Schema.Union([Schema.suspend((): Schema.Codec<InputFile, unknown> => InputFile), Schema.String]),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** The paid media to send is a video. */
export interface InputPaidMediaVideo {
  /** Type of the media, must be video */
  readonly type: "video";
  /** File to send. Pass a file_id to send a file that exists on the Telegram servers (recommended), pass an HTTP URL for Telegram to get a file from the Internet, or pass “attach://<file_attach_name>” to upload a new one using multipart/form-data under <file_attach_name> name. More information on Sending Files » */
  readonly media: InputFile | string;
  /** Optional. Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails can't be reused and can be only uploaded as a new file, so you can pass “attach://<file_attach_name>” if the thumbnail was uploaded using multipart/form-data under <file_attach_name>. More information on Sending Files » */
  readonly thumbnail?: InputFile;
  /** Optional. Cover for the video in the message. Pass a file_id to send a file that exists on the Telegram servers (recommended), pass an HTTP URL for Telegram to get a file from the Internet, or pass “attach://<file_attach_name>” to upload a new one using multipart/form-data under <file_attach_name> name. More information on Sending Files » */
  readonly cover?: InputFile | string;
  /** Optional. Start timestamp for the video in the message */
  readonly startTimestamp?: number;
  /** Optional. Video width */
  readonly width?: number;
  /** Optional. Video height */
  readonly height?: number;
  /** Optional. Video duration in seconds */
  readonly duration?: number;
  /** Optional. Pass True if the uploaded video is suitable for streaming */
  readonly supportsStreaming?: boolean;
  readonly [key: string]: unknown;
}
const _InputPaidMediaVideoPublicKeys = { start_timestamp: "startTimestamp", supports_streaming: "supportsStreaming" } as const;
const _InputPaidMediaVideoWireKeys = invertKeys(_InputPaidMediaVideoPublicKeys);
const _InputPaidMediaVideoEncoded = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("video"),
    media: Schema.Union([Schema.suspend((): Schema.Codec<InputFile, unknown> => InputFile), Schema.String]),
    thumbnail: Schema.optionalKey(Schema.suspend((): Schema.Codec<InputFile, unknown> => InputFile)),
    cover: Schema.optionalKey(Schema.Union([Schema.suspend((): Schema.Codec<InputFile, unknown> => InputFile), Schema.String])),
    start_timestamp: Schema.optionalKey(Schema.Int),
    width: Schema.optionalKey(Schema.Int),
    height: Schema.optionalKey(Schema.Int),
    duration: Schema.optionalKey(Schema.Int),
    supports_streaming: Schema.optionalKey(Schema.Boolean),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _InputPaidMediaVideoDecoded = Schema.declare<InputPaidMediaVideo>((input): input is InputPaidMediaVideo => Predicate.isObject(input));
export const InputPaidMediaVideo: Schema.Codec<InputPaidMediaVideo, unknown> = _InputPaidMediaVideoEncoded.pipe(
  Schema.decodeTo(_InputPaidMediaVideoDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_InputPaidMediaVideoPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_InputPaidMediaVideoWireKeys)),
  }),
);

/** This object represents the content of a poll description or a quiz explanation to be sent. It should be one of */
export type InputPollMedia = InputMediaAnimation | InputMediaAudio | InputMediaDocument | InputMediaLivePhoto | InputMediaLocation | InputMediaPhoto | InputMediaVenue | InputMediaVideo;
export const InputPollMedia: Schema.Codec<InputPollMedia, unknown> = Schema.Union([Schema.suspend((): Schema.Codec<InputMediaAnimation, unknown> => InputMediaAnimation), Schema.suspend((): Schema.Codec<InputMediaAudio, unknown> => InputMediaAudio), Schema.suspend((): Schema.Codec<InputMediaDocument, unknown> => InputMediaDocument), Schema.suspend((): Schema.Codec<InputMediaLivePhoto, unknown> => InputMediaLivePhoto), Schema.suspend((): Schema.Codec<InputMediaLocation, unknown> => InputMediaLocation), Schema.suspend((): Schema.Codec<InputMediaPhoto, unknown> => InputMediaPhoto), Schema.suspend((): Schema.Codec<InputMediaVenue, unknown> => InputMediaVenue), Schema.suspend((): Schema.Codec<InputMediaVideo, unknown> => InputMediaVideo)]);

/** This object contains information about one answer option in a poll to be sent. */
export interface InputPollOption {
  /** Option text, 1-100 characters */
  readonly text: string;
  /** Optional. Mode for parsing entities in the text. See formatting options for more details. Currently, only custom emoji entities are allowed. */
  readonly textParseMode?: ParseMode;
  /** Optional. A JSON-serialized list of special entities that appear in the poll option text. It can be specified instead of text_parse_mode. */
  readonly textEntities?: ReadonlyArray<MessageEntity>;
  /** Optional. Media added to the poll option */
  readonly media?: InputPollOptionMedia;
  readonly [key: string]: unknown;
}
const _InputPollOptionPublicKeys = { text_parse_mode: "textParseMode", text_entities: "textEntities" } as const;
const _InputPollOptionWireKeys = invertKeys(_InputPollOptionPublicKeys);
const _InputPollOptionEncoded = Schema.StructWithRest(
  Schema.Struct({
    text: Schema.String,
    text_parse_mode: Schema.optionalKey(Schema.suspend((): Schema.Codec<ParseMode, unknown> => ParseMode)),
    text_entities: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<MessageEntity, unknown> => MessageEntity))),
    media: Schema.optionalKey(Schema.suspend((): Schema.Codec<InputPollOptionMedia, unknown> => InputPollOptionMedia)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _InputPollOptionDecoded = Schema.declare<InputPollOption>((input): input is InputPollOption => Predicate.isObject(input));
export const InputPollOption: Schema.Codec<InputPollOption, unknown> = _InputPollOptionEncoded.pipe(
  Schema.decodeTo(_InputPollOptionDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_InputPollOptionPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_InputPollOptionWireKeys)),
  }),
);

/** This object represents the content of a poll option to be sent. It should be one of */
export type InputPollOptionMedia = InputMediaAnimation | InputMediaLink | InputMediaLivePhoto | InputMediaLocation | InputMediaPhoto | InputMediaSticker | InputMediaVenue | InputMediaVideo;
export const InputPollOptionMedia: Schema.Codec<InputPollOptionMedia, unknown> = Schema.Union([Schema.suspend((): Schema.Codec<InputMediaAnimation, unknown> => InputMediaAnimation), Schema.suspend((): Schema.Codec<InputMediaLink, unknown> => InputMediaLink), Schema.suspend((): Schema.Codec<InputMediaLivePhoto, unknown> => InputMediaLivePhoto), Schema.suspend((): Schema.Codec<InputMediaLocation, unknown> => InputMediaLocation), Schema.suspend((): Schema.Codec<InputMediaPhoto, unknown> => InputMediaPhoto), Schema.suspend((): Schema.Codec<InputMediaSticker, unknown> => InputMediaSticker), Schema.suspend((): Schema.Codec<InputMediaVenue, unknown> => InputMediaVenue), Schema.suspend((): Schema.Codec<InputMediaVideo, unknown> => InputMediaVideo)]);

/** This object describes a profile photo to set. Currently, it can be one of */
export type InputProfilePhoto = InputProfilePhotoStatic | InputProfilePhotoAnimated;
export const InputProfilePhoto: Schema.Codec<InputProfilePhoto, unknown> = Schema.Union([Schema.suspend((): Schema.Codec<InputProfilePhotoStatic, unknown> => InputProfilePhotoStatic), Schema.suspend((): Schema.Codec<InputProfilePhotoAnimated, unknown> => InputProfilePhotoAnimated)]);

/** An animated profile photo in the MPEG4 format. */
export interface InputProfilePhotoAnimated {
  /** Type of the profile photo, must be animated */
  readonly type: "animated";
  /** The animated profile photo. Profile photos can't be reused and can only be uploaded as a new file, so you can pass “attach://<file_attach_name>” if the photo was uploaded using multipart/form-data under <file_attach_name>. More information on Sending Files » */
  readonly animation: InputFile;
  /** Optional. Timestamp in seconds of the frame that will be used as the static profile photo. Defaults to 0.0. */
  readonly mainFrameTimestamp?: number;
  readonly [key: string]: unknown;
}
const _InputProfilePhotoAnimatedPublicKeys = { main_frame_timestamp: "mainFrameTimestamp" } as const;
const _InputProfilePhotoAnimatedWireKeys = invertKeys(_InputProfilePhotoAnimatedPublicKeys);
const _InputProfilePhotoAnimatedEncoded = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("animated"),
    animation: Schema.suspend((): Schema.Codec<InputFile, unknown> => InputFile),
    main_frame_timestamp: Schema.optionalKey(Schema.Number),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _InputProfilePhotoAnimatedDecoded = Schema.declare<InputProfilePhotoAnimated>((input): input is InputProfilePhotoAnimated => Predicate.isObject(input));
export const InputProfilePhotoAnimated: Schema.Codec<InputProfilePhotoAnimated, unknown> = _InputProfilePhotoAnimatedEncoded.pipe(
  Schema.decodeTo(_InputProfilePhotoAnimatedDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_InputProfilePhotoAnimatedPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_InputProfilePhotoAnimatedWireKeys)),
  }),
);

/** A static profile photo in the .JPG format. */
export interface InputProfilePhotoStatic {
  /** Type of the profile photo, must be static */
  readonly type: "static";
  /** The static profile photo. Profile photos can't be reused and can only be uploaded as a new file, so you can pass “attach://<file_attach_name>” if the photo was uploaded using multipart/form-data under <file_attach_name>. More information on Sending Files » */
  readonly photo: InputFile;
  readonly [key: string]: unknown;
}
export const InputProfilePhotoStatic: Schema.Codec<InputProfilePhotoStatic, unknown> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("static"),
    photo: Schema.suspend((): Schema.Codec<InputFile, unknown> => InputFile),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object represents a block in a rich formatted message to be sent. Currently, it can be any of the following types: */
export type InputRichBlock = InputRichBlockParagraph | InputRichBlockSectionHeading | InputRichBlockPreformatted | InputRichBlockFooter | InputRichBlockDivider | InputRichBlockMathematicalExpression | InputRichBlockAnchor | InputRichBlockList | InputRichBlockBlockQuotation | InputRichBlockExpandableBlockQuotation | InputRichBlockPullQuotation | InputRichBlockCollage | InputRichBlockSlideshow | InputRichBlockTable | InputRichBlockDetails | InputRichBlockMap | InputRichBlockButtons | InputRichBlockAnimation | InputRichBlockAudio | InputRichBlockDocument | InputRichBlockPhoto | InputRichBlockVideo | InputRichBlockVoiceNote | InputRichBlockThinking;
export const InputRichBlock: Schema.Codec<InputRichBlock, unknown> = Schema.Union([Schema.suspend((): Schema.Codec<InputRichBlockParagraph, unknown> => InputRichBlockParagraph), Schema.suspend((): Schema.Codec<InputRichBlockSectionHeading, unknown> => InputRichBlockSectionHeading), Schema.suspend((): Schema.Codec<InputRichBlockPreformatted, unknown> => InputRichBlockPreformatted), Schema.suspend((): Schema.Codec<InputRichBlockFooter, unknown> => InputRichBlockFooter), Schema.suspend((): Schema.Codec<InputRichBlockDivider, unknown> => InputRichBlockDivider), Schema.suspend((): Schema.Codec<InputRichBlockMathematicalExpression, unknown> => InputRichBlockMathematicalExpression), Schema.suspend((): Schema.Codec<InputRichBlockAnchor, unknown> => InputRichBlockAnchor), Schema.suspend((): Schema.Codec<InputRichBlockList, unknown> => InputRichBlockList), Schema.suspend((): Schema.Codec<InputRichBlockBlockQuotation, unknown> => InputRichBlockBlockQuotation), Schema.suspend((): Schema.Codec<InputRichBlockExpandableBlockQuotation, unknown> => InputRichBlockExpandableBlockQuotation), Schema.suspend((): Schema.Codec<InputRichBlockPullQuotation, unknown> => InputRichBlockPullQuotation), Schema.suspend((): Schema.Codec<InputRichBlockCollage, unknown> => InputRichBlockCollage), Schema.suspend((): Schema.Codec<InputRichBlockSlideshow, unknown> => InputRichBlockSlideshow), Schema.suspend((): Schema.Codec<InputRichBlockTable, unknown> => InputRichBlockTable), Schema.suspend((): Schema.Codec<InputRichBlockDetails, unknown> => InputRichBlockDetails), Schema.suspend((): Schema.Codec<InputRichBlockMap, unknown> => InputRichBlockMap), Schema.suspend((): Schema.Codec<InputRichBlockButtons, unknown> => InputRichBlockButtons), Schema.suspend((): Schema.Codec<InputRichBlockAnimation, unknown> => InputRichBlockAnimation), Schema.suspend((): Schema.Codec<InputRichBlockAudio, unknown> => InputRichBlockAudio), Schema.suspend((): Schema.Codec<InputRichBlockDocument, unknown> => InputRichBlockDocument), Schema.suspend((): Schema.Codec<InputRichBlockPhoto, unknown> => InputRichBlockPhoto), Schema.suspend((): Schema.Codec<InputRichBlockVideo, unknown> => InputRichBlockVideo), Schema.suspend((): Schema.Codec<InputRichBlockVoiceNote, unknown> => InputRichBlockVoiceNote), Schema.suspend((): Schema.Codec<InputRichBlockThinking, unknown> => InputRichBlockThinking)]);

/** A block with an anchor, corresponding to the HTML tag <a> with the attribute name. */
export interface InputRichBlockAnchor {
  /** Type of the block, always “anchor” */
  readonly type: "anchor";
  /** The name of the anchor */
  readonly name: string;
  readonly [key: string]: unknown;
}
export const InputRichBlockAnchor: Schema.Codec<InputRichBlockAnchor, unknown> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("anchor"),
    name: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A block with an animation, corresponding to the HTML tag <video>. */
export interface InputRichBlockAnimation {
  /** Type of the block, always “animation” */
  readonly type: "animation";
  /** The animation. Caption is ignored. */
  readonly animation: InputMediaAnimation;
  /** Optional. Caption of the block */
  readonly caption?: RichBlockCaption;
  readonly [key: string]: unknown;
}
export const InputRichBlockAnimation: Schema.Codec<InputRichBlockAnimation, unknown> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("animation"),
    animation: Schema.suspend((): Schema.Codec<InputMediaAnimation, unknown> => InputMediaAnimation),
    caption: Schema.optionalKey(Schema.suspend((): Schema.Codec<RichBlockCaption, unknown> => RichBlockCaption)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A block with a music file, corresponding to the HTML tag <audio>. */
export interface InputRichBlockAudio {
  /** Type of the block, always “audio” */
  readonly type: "audio";
  /** The audio. Caption is ignored. */
  readonly audio: InputMediaAudio;
  /** Optional. Caption of the block */
  readonly caption?: RichBlockCaption;
  readonly [key: string]: unknown;
}
export const InputRichBlockAudio: Schema.Codec<InputRichBlockAudio, unknown> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("audio"),
    audio: Schema.suspend((): Schema.Codec<InputMediaAudio, unknown> => InputMediaAudio),
    caption: Schema.optionalKey(Schema.suspend((): Schema.Codec<RichBlockCaption, unknown> => RichBlockCaption)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A block quotation, corresponding to the HTML tag <blockquote>. */
export interface InputRichBlockBlockQuotation {
  /** Type of the block, always “blockquote” */
  readonly type: "blockquote";
  /** Content of the block */
  readonly blocks: ReadonlyArray<InputRichBlock>;
  /** Optional. Credit of the block */
  readonly credit?: RichText;
  readonly [key: string]: unknown;
}
export const InputRichBlockBlockQuotation: Schema.Codec<InputRichBlockBlockQuotation, unknown> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("blockquote"),
    blocks: Schema.Array(Schema.suspend((): Schema.Codec<InputRichBlock, unknown> => InputRichBlock)),
    credit: Schema.optionalKey(Schema.suspend((): Schema.Codec<RichText, unknown> => RichText)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A block containing a list of buttons that are shown in one row, corresponding to the custom HTML tag <tg-button-row>. */
export interface InputRichBlockButtons {
  /** Type of the block, always “buttons” */
  readonly type: "buttons";
  /** List of 1-8 buttons to send */
  readonly buttons: ReadonlyArray<RichMessageButton>;
  /** Optional. Horizontal alignment of the buttons. Currently, must be one of “left”, “center”, or “right”. */
  readonly align?: string;
  readonly [key: string]: unknown;
}
export const InputRichBlockButtons: Schema.Codec<InputRichBlockButtons, unknown> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("buttons"),
    buttons: Schema.Array(Schema.suspend((): Schema.Codec<RichMessageButton, unknown> => RichMessageButton)),
    align: Schema.optionalKey(Schema.String),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A collage, corresponding to the custom HTML tag <tg-collage>. */
export interface InputRichBlockCollage {
  /** Type of the block, always “collage” */
  readonly type: "collage";
  /** Elements of the collage */
  readonly blocks: ReadonlyArray<InputRichBlock>;
  /** Optional. Caption of the block */
  readonly caption?: RichBlockCaption;
  readonly [key: string]: unknown;
}
export const InputRichBlockCollage: Schema.Codec<InputRichBlockCollage, unknown> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("collage"),
    blocks: Schema.Array(Schema.suspend((): Schema.Codec<InputRichBlock, unknown> => InputRichBlock)),
    caption: Schema.optionalKey(Schema.suspend((): Schema.Codec<RichBlockCaption, unknown> => RichBlockCaption)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** An expandable block for details disclosure, corresponding to the HTML tag <details>. */
export interface InputRichBlockDetails {
  /** Type of the block, always “details” */
  readonly type: "details";
  /** Always shown summary of the block */
  readonly summary: RichText;
  /** Content of the block */
  readonly blocks: ReadonlyArray<InputRichBlock>;
  /** Optional. Pass True if the content of the block is visible by default */
  readonly isOpen?: true;
  readonly [key: string]: unknown;
}
const _InputRichBlockDetailsPublicKeys = { is_open: "isOpen" } as const;
const _InputRichBlockDetailsWireKeys = invertKeys(_InputRichBlockDetailsPublicKeys);
const _InputRichBlockDetailsEncoded = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("details"),
    summary: Schema.suspend((): Schema.Codec<RichText, unknown> => RichText),
    blocks: Schema.Array(Schema.suspend((): Schema.Codec<InputRichBlock, unknown> => InputRichBlock)),
    is_open: Schema.optionalKey(Schema.Literal(true)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _InputRichBlockDetailsDecoded = Schema.declare<InputRichBlockDetails>((input): input is InputRichBlockDetails => Predicate.isObject(input));
export const InputRichBlockDetails: Schema.Codec<InputRichBlockDetails, unknown> = _InputRichBlockDetailsEncoded.pipe(
  Schema.decodeTo(_InputRichBlockDetailsDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_InputRichBlockDetailsPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_InputRichBlockDetailsWireKeys)),
  }),
);

/** A divider, corresponding to the HTML tag <hr/>. */
export interface InputRichBlockDivider {
  /** Type of the block, always “divider” */
  readonly type: "divider";
  readonly [key: string]: unknown;
}
export const InputRichBlockDivider: Schema.Codec<InputRichBlockDivider, unknown> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("divider"),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A block with a general file, corresponding to the custom HTML tag <tg-document>. */
export interface InputRichBlockDocument {
  /** Type of the block, always “document” */
  readonly type: "document";
  /** The document. Caption is ignored. */
  readonly document: InputMediaDocument;
  /** Optional. Caption of the block */
  readonly caption?: RichBlockCaption;
  readonly [key: string]: unknown;
}
export const InputRichBlockDocument: Schema.Codec<InputRichBlockDocument, unknown> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("document"),
    document: Schema.suspend((): Schema.Codec<InputMediaDocument, unknown> => InputMediaDocument),
    caption: Schema.optionalKey(Schema.suspend((): Schema.Codec<RichBlockCaption, unknown> => RichBlockCaption)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A block quotation, corresponding to the HTML tag <blockquote> with custom attribute "expandable". */
export interface InputRichBlockExpandableBlockQuotation {
  /** Type of the block, always “expandable_blockquote” */
  readonly type: "expandable_blockquote";
  /** Content of the block */
  readonly text: RichText;
  /** Optional. Credit of the block */
  readonly credit?: RichText;
  readonly [key: string]: unknown;
}
export const InputRichBlockExpandableBlockQuotation: Schema.Codec<InputRichBlockExpandableBlockQuotation, unknown> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("expandable_blockquote"),
    text: Schema.suspend((): Schema.Codec<RichText, unknown> => RichText),
    credit: Schema.optionalKey(Schema.suspend((): Schema.Codec<RichText, unknown> => RichText)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A footer, corresponding to the HTML tag <footer>. */
export interface InputRichBlockFooter {
  /** Type of the block, always “footer” */
  readonly type: "footer";
  /** Text of the block */
  readonly text: RichText;
  readonly [key: string]: unknown;
}
export const InputRichBlockFooter: Schema.Codec<InputRichBlockFooter, unknown> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("footer"),
    text: Schema.suspend((): Schema.Codec<RichText, unknown> => RichText),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A list of blocks, corresponding to the HTML tag <ul> or <ol> with multiple nested tags <li>. */
export interface InputRichBlockList {
  /** Type of the block, always “list” */
  readonly type: "list";
  /** Items of the list */
  readonly items: ReadonlyArray<InputRichBlockListItem>;
  readonly [key: string]: unknown;
}
export const InputRichBlockList: Schema.Codec<InputRichBlockList, unknown> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("list"),
    items: Schema.Array(Schema.suspend((): Schema.Codec<InputRichBlockListItem, unknown> => InputRichBlockListItem)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** An item of a list to be sent. */
export interface InputRichBlockListItem {
  /** The content of the item */
  readonly blocks: ReadonlyArray<InputRichBlock>;
  /** Optional. Pass True if the item has a checkbox */
  readonly hasCheckbox?: true;
  /** Optional. Pass True if the item has a checked checkbox */
  readonly isChecked?: true;
  /** Optional. For ordered lists, the numeric value of the item label */
  readonly value?: number;
  /** Optional. For ordered lists, the type of the item label; must be one of “a” for lowercase letters, “A” for uppercase letters, “i” for lowercase Roman numerals, “I” for uppercase Roman numerals, or “1” for decimal numbers */
  readonly type?: string;
  readonly [key: string]: unknown;
}
const _InputRichBlockListItemPublicKeys = { has_checkbox: "hasCheckbox", is_checked: "isChecked" } as const;
const _InputRichBlockListItemWireKeys = invertKeys(_InputRichBlockListItemPublicKeys);
const _InputRichBlockListItemEncoded = Schema.StructWithRest(
  Schema.Struct({
    blocks: Schema.Array(Schema.suspend((): Schema.Codec<InputRichBlock, unknown> => InputRichBlock)),
    has_checkbox: Schema.optionalKey(Schema.Literal(true)),
    is_checked: Schema.optionalKey(Schema.Literal(true)),
    value: Schema.optionalKey(Schema.Int),
    type: Schema.optionalKey(Schema.String),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _InputRichBlockListItemDecoded = Schema.declare<InputRichBlockListItem>((input): input is InputRichBlockListItem => Predicate.isObject(input));
export const InputRichBlockListItem: Schema.Codec<InputRichBlockListItem, unknown> = _InputRichBlockListItemEncoded.pipe(
  Schema.decodeTo(_InputRichBlockListItemDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_InputRichBlockListItemPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_InputRichBlockListItemWireKeys)),
  }),
);

/** A block with a map, corresponding to the custom HTML tag <tg-map>. The map's width and height must not exceed 10000 in total. The width and height ratio must be at most 20. */
export interface InputRichBlockMap {
  /** Type of the block, always “map” */
  readonly type: "map";
  /** Location of the center of the map */
  readonly location: Location;
  /** Optional. Map zoom level; 0-24 */
  readonly zoom?: number;
  /** Optional. Map width; 0-10000 */
  readonly width?: number;
  /** Optional. Map height; 0-10000 */
  readonly height?: number;
  /** Optional. Caption of the block */
  readonly caption?: RichBlockCaption;
  readonly [key: string]: unknown;
}
export const InputRichBlockMap: Schema.Codec<InputRichBlockMap, unknown> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("map"),
    location: Schema.suspend((): Schema.Codec<Location, unknown> => Location),
    zoom: Schema.optionalKey(Schema.Int),
    width: Schema.optionalKey(Schema.Int),
    height: Schema.optionalKey(Schema.Int),
    caption: Schema.optionalKey(Schema.suspend((): Schema.Codec<RichBlockCaption, unknown> => RichBlockCaption)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A block with a mathematical expression in LaTeX format, corresponding to the custom HTML tag <tg-math-block>. */
export interface InputRichBlockMathematicalExpression {
  /** Type of the block, always “mathematical_expression” */
  readonly type: "mathematical_expression";
  /** The mathematical expression in LaTeX format */
  readonly expression: string;
  readonly [key: string]: unknown;
}
export const InputRichBlockMathematicalExpression: Schema.Codec<InputRichBlockMathematicalExpression, unknown> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("mathematical_expression"),
    expression: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A text paragraph, corresponding to the HTML tag <p>. */
export interface InputRichBlockParagraph {
  /** Type of the block, always “paragraph” */
  readonly type: "paragraph";
  /** Text of the block */
  readonly text: RichText;
  readonly [key: string]: unknown;
}
export const InputRichBlockParagraph: Schema.Codec<InputRichBlockParagraph, unknown> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("paragraph"),
    text: Schema.suspend((): Schema.Codec<RichText, unknown> => RichText),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A block with a photo, corresponding to the HTML tag <img>. */
export interface InputRichBlockPhoto {
  /** Type of the block, always “photo” */
  readonly type: "photo";
  /** The photo. Caption is ignored. */
  readonly photo: InputMediaPhoto;
  /** Optional. Caption of the block */
  readonly caption?: RichBlockCaption;
  readonly [key: string]: unknown;
}
export const InputRichBlockPhoto: Schema.Codec<InputRichBlockPhoto, unknown> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("photo"),
    photo: Schema.suspend((): Schema.Codec<InputMediaPhoto, unknown> => InputMediaPhoto),
    caption: Schema.optionalKey(Schema.suspend((): Schema.Codec<RichBlockCaption, unknown> => RichBlockCaption)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A preformatted text block, corresponding to the nested HTML tags <pre> and <code>. */
export interface InputRichBlockPreformatted {
  /** Type of the block, always “pre” */
  readonly type: "pre";
  /** Text of the block */
  readonly text: RichText;
  /** Optional. The programming language of the text */
  readonly language?: string;
  readonly [key: string]: unknown;
}
export const InputRichBlockPreformatted: Schema.Codec<InputRichBlockPreformatted, unknown> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("pre"),
    text: Schema.suspend((): Schema.Codec<RichText, unknown> => RichText),
    language: Schema.optionalKey(Schema.String),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A quotation with centered text, loosely corresponding to the HTML tag <aside>. */
export interface InputRichBlockPullQuotation {
  /** Type of the block, always “pullquote” */
  readonly type: "pullquote";
  /** Text of the block */
  readonly text: RichText;
  /** Optional. Credit of the block */
  readonly credit?: RichText;
  readonly [key: string]: unknown;
}
export const InputRichBlockPullQuotation: Schema.Codec<InputRichBlockPullQuotation, unknown> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("pullquote"),
    text: Schema.suspend((): Schema.Codec<RichText, unknown> => RichText),
    credit: Schema.optionalKey(Schema.suspend((): Schema.Codec<RichText, unknown> => RichText)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A section heading, corresponding to the HTML tags <h1>, <h2>, <h3>, <h4>, <h5>, or <h6>. */
export interface InputRichBlockSectionHeading {
  /** Type of the block, always “heading” */
  readonly type: "heading";
  /** Text of the block */
  readonly text: RichText;
  /** Relative size of the text font; 1-6, 1 is the largest, 6 is the smallest */
  readonly size: number;
  readonly [key: string]: unknown;
}
export const InputRichBlockSectionHeading: Schema.Codec<InputRichBlockSectionHeading, unknown> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("heading"),
    text: Schema.suspend((): Schema.Codec<RichText, unknown> => RichText),
    size: Schema.Int,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A slideshow, corresponding to the custom HTML tag <tg-slideshow>. */
export interface InputRichBlockSlideshow {
  /** Type of the block, always “slideshow” */
  readonly type: "slideshow";
  /** Elements of the slideshow */
  readonly blocks: ReadonlyArray<InputRichBlock>;
  /** Optional. Caption of the block */
  readonly caption?: RichBlockCaption;
  readonly [key: string]: unknown;
}
export const InputRichBlockSlideshow: Schema.Codec<InputRichBlockSlideshow, unknown> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("slideshow"),
    blocks: Schema.Array(Schema.suspend((): Schema.Codec<InputRichBlock, unknown> => InputRichBlock)),
    caption: Schema.optionalKey(Schema.suspend((): Schema.Codec<RichBlockCaption, unknown> => RichBlockCaption)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A table, corresponding to the HTML tag <table>. */
export interface InputRichBlockTable {
  /** Type of the block, always “table” */
  readonly type: "table";
  /** Cells of the table */
  readonly cells: ReadonlyArray<ReadonlyArray<RichBlockTableCell>>;
  /** Optional. Pass True if the table has borders */
  readonly isBordered?: true;
  /** Optional. Pass True if the table is striped */
  readonly isStriped?: true;
  /** Optional. Pass True if table cells must have smaller indents */
  readonly isCompact?: true;
  /** Optional. Caption of the table */
  readonly caption?: RichText;
  readonly [key: string]: unknown;
}
const _InputRichBlockTablePublicKeys = { is_bordered: "isBordered", is_striped: "isStriped", is_compact: "isCompact" } as const;
const _InputRichBlockTableWireKeys = invertKeys(_InputRichBlockTablePublicKeys);
const _InputRichBlockTableEncoded = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("table"),
    cells: Schema.Array(Schema.Array(Schema.suspend((): Schema.Codec<RichBlockTableCell, unknown> => RichBlockTableCell))),
    is_bordered: Schema.optionalKey(Schema.Literal(true)),
    is_striped: Schema.optionalKey(Schema.Literal(true)),
    is_compact: Schema.optionalKey(Schema.Literal(true)),
    caption: Schema.optionalKey(Schema.suspend((): Schema.Codec<RichText, unknown> => RichText)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _InputRichBlockTableDecoded = Schema.declare<InputRichBlockTable>((input): input is InputRichBlockTable => Predicate.isObject(input));
export const InputRichBlockTable: Schema.Codec<InputRichBlockTable, unknown> = _InputRichBlockTableEncoded.pipe(
  Schema.decodeTo(_InputRichBlockTableDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_InputRichBlockTablePublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_InputRichBlockTableWireKeys)),
  }),
);

/** A block with a “Thinking…” placeholder, corresponding to the custom HTML tag <tg-thinking>. The block may be used only in sendRichMessageDraft, therefore it can't be received in messages. See https://t.me/addemoji/AIActions for examples of custom emoji that are recommended for usage in the block. */
export interface InputRichBlockThinking {
  /** Type of the block, always “thinking” */
  readonly type: "thinking";
  /** Text of the block. See https://t.me/addemoji/AIActions for examples of custom emoji that are recommended for usage in the block. */
  readonly text: RichText;
  readonly [key: string]: unknown;
}
export const InputRichBlockThinking: Schema.Codec<InputRichBlockThinking, unknown> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("thinking"),
    text: Schema.suspend((): Schema.Codec<RichText, unknown> => RichText),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A block with a video, corresponding to the HTML tag <video>. */
export interface InputRichBlockVideo {
  /** Type of the block, always “video” */
  readonly type: "video";
  /** The video. Caption is ignored. */
  readonly video: InputMediaVideo;
  /** Optional. Caption of the block */
  readonly caption?: RichBlockCaption;
  readonly [key: string]: unknown;
}
export const InputRichBlockVideo: Schema.Codec<InputRichBlockVideo, unknown> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("video"),
    video: Schema.suspend((): Schema.Codec<InputMediaVideo, unknown> => InputMediaVideo),
    caption: Schema.optionalKey(Schema.suspend((): Schema.Codec<RichBlockCaption, unknown> => RichBlockCaption)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A block with a voice note, corresponding to the HTML tag <audio>. */
export interface InputRichBlockVoiceNote {
  /** Type of the block, always “voice_note” */
  readonly type: "voice_note";
  /** The voice note. Caption is ignored. */
  readonly voiceNote: InputMediaVoiceNote;
  /** Optional. Caption of the block */
  readonly caption?: RichBlockCaption;
  readonly [key: string]: unknown;
}
const _InputRichBlockVoiceNotePublicKeys = { voice_note: "voiceNote" } as const;
const _InputRichBlockVoiceNoteWireKeys = invertKeys(_InputRichBlockVoiceNotePublicKeys);
const _InputRichBlockVoiceNoteEncoded = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("voice_note"),
    voice_note: Schema.suspend((): Schema.Codec<InputMediaVoiceNote, unknown> => InputMediaVoiceNote),
    caption: Schema.optionalKey(Schema.suspend((): Schema.Codec<RichBlockCaption, unknown> => RichBlockCaption)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _InputRichBlockVoiceNoteDecoded = Schema.declare<InputRichBlockVoiceNote>((input): input is InputRichBlockVoiceNote => Predicate.isObject(input));
export const InputRichBlockVoiceNote: Schema.Codec<InputRichBlockVoiceNote, unknown> = _InputRichBlockVoiceNoteEncoded.pipe(
  Schema.decodeTo(_InputRichBlockVoiceNoteDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_InputRichBlockVoiceNotePublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_InputRichBlockVoiceNoteWireKeys)),
  }),
);

/** Describes a rich message to be sent. Exactly one of the fields html, markdown, or blocks must be used. */
export interface InputRichMessage {
  /** Optional. Content of the rich message to send described as a list of blocks */
  readonly blocks?: ReadonlyArray<InputRichBlock>;
  /** Optional. Content of the rich message to send described using HTML formatting. See rich message formatting options for more details. Use media field to specify the media used in the message. */
  readonly html?: string;
  /** Optional. Content of the rich message to send described using Markdown formatting. See rich message formatting options for more details. Use media field to specify the media used in the message. */
  readonly markdown?: string;
  /** Optional. List of media that are specified in the markdown or html fields using tg://photo?id=, tg://video?id=, tg://document?id=, and tg://audio?id= links */
  readonly media?: ReadonlyArray<InputRichMessageMedia>;
  /** Optional. Pass True if the rich message must be shown right-to-left */
  readonly isRtl?: boolean;
  /** Optional. Pass True to skip automatic detection of entities (e.g., URLs, email addresses, username mentions, hashtags, cashtags, bot commands, or phone numbers) in the text */
  readonly skipEntityDetection?: boolean;
  readonly [key: string]: unknown;
}
const _InputRichMessagePublicKeys = { is_rtl: "isRtl", skip_entity_detection: "skipEntityDetection" } as const;
const _InputRichMessageWireKeys = invertKeys(_InputRichMessagePublicKeys);
const _InputRichMessageEncoded = Schema.StructWithRest(
  Schema.Struct({
    blocks: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<InputRichBlock, unknown> => InputRichBlock))),
    html: Schema.optionalKey(Schema.String),
    markdown: Schema.optionalKey(Schema.String),
    media: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<InputRichMessageMedia, unknown> => InputRichMessageMedia))),
    is_rtl: Schema.optionalKey(Schema.Boolean),
    skip_entity_detection: Schema.optionalKey(Schema.Boolean),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _InputRichMessageDecoded = Schema.declare<InputRichMessage>((input): input is InputRichMessage => Predicate.isObject(input));
export const InputRichMessage: Schema.Codec<InputRichMessage, unknown> = _InputRichMessageEncoded.pipe(
  Schema.decodeTo(_InputRichMessageDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_InputRichMessagePublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_InputRichMessageWireKeys)),
  }),
);

/** Represents the content of a rich message to be sent as the result of an inline query. */
export interface InputRichMessageContent {
  /** The message to be sent. Only previously uploaded files may be used in the message. */
  readonly richMessage: InputRichMessage;
  readonly [key: string]: unknown;
}
const _InputRichMessageContentPublicKeys = { rich_message: "richMessage" } as const;
const _InputRichMessageContentWireKeys = invertKeys(_InputRichMessageContentPublicKeys);
const _InputRichMessageContentEncoded = Schema.StructWithRest(
  Schema.Struct({
    rich_message: Schema.suspend((): Schema.Codec<InputRichMessage, unknown> => InputRichMessage),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _InputRichMessageContentDecoded = Schema.declare<InputRichMessageContent>((input): input is InputRichMessageContent => Predicate.isObject(input));
export const InputRichMessageContent: Schema.Codec<InputRichMessageContent, unknown> = _InputRichMessageContentEncoded.pipe(
  Schema.decodeTo(_InputRichMessageContentDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_InputRichMessageContentPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_InputRichMessageContentWireKeys)),
  }),
);

/** Describes a media element embedded in an outgoing rich message. */
export interface InputRichMessageMedia {
  /** Unique identifier of the media used in a tg://photo?id=, tg://video?id=, tg://document?id=, or tg://audio?id= link. 1-64 characters, only A-Z, a-z, 0-9, _ and - are allowed. */
  readonly id: string;
  /** The media to be sent. Everything except the media itself and its properties is ignored. */
  readonly media: InputMediaAnimation | InputMediaAudio | InputMediaDocument | InputMediaPhoto | InputMediaVideo | InputMediaVoiceNote;
  readonly [key: string]: unknown;
}
export const InputRichMessageMedia: Schema.Codec<InputRichMessageMedia, unknown> = Schema.StructWithRest(
  Schema.Struct({
    id: Schema.String,
    media: Schema.Union([Schema.suspend((): Schema.Codec<InputMediaAnimation, unknown> => InputMediaAnimation), Schema.suspend((): Schema.Codec<InputMediaAudio, unknown> => InputMediaAudio), Schema.suspend((): Schema.Codec<InputMediaDocument, unknown> => InputMediaDocument), Schema.suspend((): Schema.Codec<InputMediaPhoto, unknown> => InputMediaPhoto), Schema.suspend((): Schema.Codec<InputMediaVideo, unknown> => InputMediaVideo), Schema.suspend((): Schema.Codec<InputMediaVoiceNote, unknown> => InputMediaVoiceNote)]),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object describes a sticker to be added to a sticker set. */
export interface InputSticker {
  /** The added sticker. Pass a file_id as a String to send a file that already exists on the Telegram servers, pass an HTTP URL as a String for Telegram to get a file from the Internet, or pass “attach://<file_attach_name>” to upload a new file using multipart/form-data under <file_attach_name> name. Animated and video stickers can't be uploaded via HTTP URL. More information on Sending Files » */
  readonly sticker: InputFile | string;
  /** Format of the added sticker, must be one of “static” for a .WEBP or .PNG image, “animated” for a .TGS animation, “video” for a .WEBM video */
  readonly format: StickerFormat;
  /** List of 1-20 emoji associated with the sticker */
  readonly emojiList: ReadonlyArray<string>;
  /** Optional. Position where the mask should be placed on faces. For “mask” stickers only. */
  readonly maskPosition?: MaskPosition;
  /** Optional. List of 0-20 search keywords for the sticker with total length of up to 64 characters. For “regular” and “custom_emoji” stickers only. */
  readonly keywords?: ReadonlyArray<string>;
  readonly [key: string]: unknown;
}
const _InputStickerPublicKeys = { emoji_list: "emojiList", mask_position: "maskPosition" } as const;
const _InputStickerWireKeys = invertKeys(_InputStickerPublicKeys);
const _InputStickerEncoded = Schema.StructWithRest(
  Schema.Struct({
    sticker: Schema.Union([Schema.suspend((): Schema.Codec<InputFile, unknown> => InputFile), Schema.String]),
    format: Schema.suspend((): Schema.Codec<StickerFormat, unknown> => StickerFormat),
    emoji_list: Schema.Array(Schema.String),
    mask_position: Schema.optionalKey(Schema.suspend((): Schema.Codec<MaskPosition, unknown> => MaskPosition)),
    keywords: Schema.optionalKey(Schema.Array(Schema.String)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _InputStickerDecoded = Schema.declare<InputSticker>((input): input is InputSticker => Predicate.isObject(input));
export const InputSticker: Schema.Codec<InputSticker, unknown> = _InputStickerEncoded.pipe(
  Schema.decodeTo(_InputStickerDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_InputStickerPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_InputStickerWireKeys)),
  }),
);

/** This object describes the content of a story to post. Currently, it can be one of */
export type InputStoryContent = InputStoryContentPhoto | InputStoryContentVideo;
export const InputStoryContent: Schema.Codec<InputStoryContent, unknown> = Schema.Union([Schema.suspend((): Schema.Codec<InputStoryContentPhoto, unknown> => InputStoryContentPhoto), Schema.suspend((): Schema.Codec<InputStoryContentVideo, unknown> => InputStoryContentVideo)]);

/** Describes a photo to post as a story. */
export interface InputStoryContentPhoto {
  /** Type of the content, must be photo */
  readonly type: "photo";
  /** The photo to post as a story. The photo must be of the size 1080x1920 and must not exceed 10 MB. The photo can't be reused and can only be uploaded as a new file, so you can pass “attach://<file_attach_name>” if the photo was uploaded using multipart/form-data under <file_attach_name>. More information on Sending Files » */
  readonly photo: InputFile;
  readonly [key: string]: unknown;
}
export const InputStoryContentPhoto: Schema.Codec<InputStoryContentPhoto, unknown> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("photo"),
    photo: Schema.suspend((): Schema.Codec<InputFile, unknown> => InputFile),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Describes a video to post as a story. */
export interface InputStoryContentVideo {
  /** Type of the content, must be video */
  readonly type: "video";
  /** The video to post as a story. The video must be of the size 720x1280, streamable, encoded with H.265 codec, with key frames added each second in the MPEG4 format, and must not exceed 30 MB. The video can't be reused and can only be uploaded as a new file, so you can pass “attach://<file_attach_name>” if the video was uploaded using multipart/form-data under <file_attach_name>. More information on Sending Files » */
  readonly video: InputFile;
  /** Optional. Precise duration of the video in seconds; 0-60 */
  readonly duration?: number;
  /** Optional. Timestamp in seconds of the frame that will be used as the static cover for the story. Defaults to 0.0. */
  readonly coverFrameTimestamp?: number;
  /** Optional. Pass True if the video has no sound */
  readonly isAnimation?: boolean;
  readonly [key: string]: unknown;
}
const _InputStoryContentVideoPublicKeys = { cover_frame_timestamp: "coverFrameTimestamp", is_animation: "isAnimation" } as const;
const _InputStoryContentVideoWireKeys = invertKeys(_InputStoryContentVideoPublicKeys);
const _InputStoryContentVideoEncoded = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("video"),
    video: Schema.suspend((): Schema.Codec<InputFile, unknown> => InputFile),
    duration: Schema.optionalKey(Schema.Number),
    cover_frame_timestamp: Schema.optionalKey(Schema.Number),
    is_animation: Schema.optionalKey(Schema.Boolean),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _InputStoryContentVideoDecoded = Schema.declare<InputStoryContentVideo>((input): input is InputStoryContentVideo => Predicate.isObject(input));
export const InputStoryContentVideo: Schema.Codec<InputStoryContentVideo, unknown> = _InputStoryContentVideoEncoded.pipe(
  Schema.decodeTo(_InputStoryContentVideoDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_InputStoryContentVideoPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_InputStoryContentVideoWireKeys)),
  }),
);

/** Represents the content of a text message to be sent as the result of an inline query. */
export interface InputTextMessageContent {
  /** Text of the message to be sent, 1-4096 characters */
  readonly messageText: string;
  /** Optional. Mode for parsing entities in the message text. See formatting options for more details. */
  readonly parseMode?: ParseMode;
  /** Optional. List of special entities that appear in message text, which can be specified instead of parse_mode */
  readonly entities?: ReadonlyArray<MessageEntity>;
  /** Optional. Link preview generation options for the message */
  readonly linkPreviewOptions?: LinkPreviewOptions;
  readonly [key: string]: unknown;
}
const _InputTextMessageContentPublicKeys = { message_text: "messageText", parse_mode: "parseMode", link_preview_options: "linkPreviewOptions" } as const;
const _InputTextMessageContentWireKeys = invertKeys(_InputTextMessageContentPublicKeys);
const _InputTextMessageContentEncoded = Schema.StructWithRest(
  Schema.Struct({
    message_text: Schema.String,
    parse_mode: Schema.optionalKey(Schema.suspend((): Schema.Codec<ParseMode, unknown> => ParseMode)),
    entities: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<MessageEntity, unknown> => MessageEntity))),
    link_preview_options: Schema.optionalKey(Schema.suspend((): Schema.Codec<LinkPreviewOptions, unknown> => LinkPreviewOptions)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _InputTextMessageContentDecoded = Schema.declare<InputTextMessageContent>((input): input is InputTextMessageContent => Predicate.isObject(input));
export const InputTextMessageContent: Schema.Codec<InputTextMessageContent, unknown> = _InputTextMessageContentEncoded.pipe(
  Schema.decodeTo(_InputTextMessageContentDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_InputTextMessageContentPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_InputTextMessageContentWireKeys)),
  }),
);

/** Represents the content of a venue message to be sent as the result of an inline query. */
export interface InputVenueMessageContent {
  /** Latitude of the venue in degrees */
  readonly latitude: number;
  /** Longitude of the venue in degrees */
  readonly longitude: number;
  /** Name of the venue */
  readonly title: string;
  /** Address of the venue */
  readonly address: string;
  /** Optional. Foursquare identifier of the venue, if known */
  readonly foursquareId?: string;
  /** Optional. Foursquare type of the venue, if known. (For example, “arts_entertainment/default”, “arts_entertainment/aquarium” or “food/icecream”.) */
  readonly foursquareType?: string;
  /** Optional. Google Places identifier of the venue */
  readonly googlePlaceId?: string;
  /** Optional. Google Places type of the venue. (See supported types.) */
  readonly googlePlaceType?: string;
  readonly [key: string]: unknown;
}
const _InputVenueMessageContentPublicKeys = { foursquare_id: "foursquareId", foursquare_type: "foursquareType", google_place_id: "googlePlaceId", google_place_type: "googlePlaceType" } as const;
const _InputVenueMessageContentWireKeys = invertKeys(_InputVenueMessageContentPublicKeys);
const _InputVenueMessageContentEncoded = Schema.StructWithRest(
  Schema.Struct({
    latitude: Schema.Number,
    longitude: Schema.Number,
    title: Schema.String,
    address: Schema.String,
    foursquare_id: Schema.optionalKey(Schema.String),
    foursquare_type: Schema.optionalKey(Schema.String),
    google_place_id: Schema.optionalKey(Schema.String),
    google_place_type: Schema.optionalKey(Schema.String),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _InputVenueMessageContentDecoded = Schema.declare<InputVenueMessageContent>((input): input is InputVenueMessageContent => Predicate.isObject(input));
export const InputVenueMessageContent: Schema.Codec<InputVenueMessageContent, unknown> = _InputVenueMessageContentEncoded.pipe(
  Schema.decodeTo(_InputVenueMessageContentDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_InputVenueMessageContentPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_InputVenueMessageContentWireKeys)),
  }),
);

/** This object contains basic information about an invoice. */
export interface Invoice {
  /** Product name */
  readonly title: string;
  /** Product description */
  readonly description: string;
  /** Unique bot deep-linking parameter that can be used to generate this invoice */
  readonly startParameter: string;
  /** Three-letter ISO 4217 currency code, or “XTR” for payments in Telegram Stars */
  readonly currency: string;
  /** Total price in the smallest units of the currency (integer, not float/double). For example, for a price of US$ 1.45 pass amount = 145. See the exp parameter in currencies.json, it shows the number of digits past the decimal point for each currency (2 for the majority of currencies). */
  readonly totalAmount: number;
  readonly [key: string]: unknown;
}
const _InvoicePublicKeys = { start_parameter: "startParameter", total_amount: "totalAmount" } as const;
const _InvoiceWireKeys = invertKeys(_InvoicePublicKeys);
const _InvoiceEncoded = Schema.StructWithRest(
  Schema.Struct({
    title: Schema.String,
    description: Schema.String,
    start_parameter: Schema.String,
    currency: Schema.String,
    total_amount: Schema.Int,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _InvoiceDecoded = Schema.declare<Invoice>((input): input is Invoice => Predicate.isObject(input));
export const Invoice: Schema.Codec<Invoice, unknown> = _InvoiceEncoded.pipe(
  Schema.decodeTo(_InvoiceDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_InvoicePublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_InvoiceWireKeys)),
  }),
);

/** This object represents one button of the reply keyboard. At most one of the fields other than text, icon_custom_emoji_id, and style must be used to specify the type of the button. For simple text buttons, String can be used instead of this object to specify the button text. */
export interface KeyboardButton {
  /** Text of the button. If none of the fields other than text, icon_custom_emoji_id, and style are used, it will be sent as a message when the button is pressed. */
  readonly text: string;
  /** Optional. Unique identifier of the custom emoji shown before the text of the button. Can only be used by bots that purchased additional usernames on Fragment or in the messages directly sent by the bot to private, group and supergroup chats if the owner of the bot has a Telegram Premium subscription. */
  readonly iconCustomEmojiId?: string;
  /** Optional. Style of the button. Must be one of “danger” (red), “success” (green) or “primary” (blue). If omitted, then an app-specific style is used. */
  readonly style?: string;
  /** Optional. If specified, pressing the button will open a list of suitable users. Identifiers of selected users will be sent to the bot in a “users_shared” service message. Available in private chats only. */
  readonly requestUsers?: KeyboardButtonRequestUsers;
  /** Optional. If specified, pressing the button will open a list of suitable chats. Tapping on a chat will send its identifier to the bot in a “chat_shared” service message. Available in private chats only. */
  readonly requestChat?: KeyboardButtonRequestChat;
  /** Optional. If specified, pressing the button will ask the user to create and share a bot that will be managed by the current bot. Available for bots that enabled management of other bots in the @BotFather Mini App. Available in private chats only. */
  readonly requestManagedBot?: KeyboardButtonRequestManagedBot;
  /** Optional. If True, the user's phone number will be sent as a contact when the button is pressed. Available in private chats only. */
  readonly requestContact?: boolean;
  /** Optional. If True, the user's current location will be sent when the button is pressed. Available in private chats only. */
  readonly requestLocation?: boolean;
  /** Optional. If specified, the user will be asked to create a poll and send it to the bot when the button is pressed. Available in private chats only. */
  readonly requestPoll?: KeyboardButtonPollType;
  /** Optional. If specified, the described Web App will be launched when the button is pressed. The Web App will be able to send a “web_app_data” service message. Available in private chats only. */
  readonly webApp?: WebAppInfo;
  readonly [key: string]: unknown;
}
const _KeyboardButtonPublicKeys = { icon_custom_emoji_id: "iconCustomEmojiId", request_users: "requestUsers", request_chat: "requestChat", request_managed_bot: "requestManagedBot", request_contact: "requestContact", request_location: "requestLocation", request_poll: "requestPoll", web_app: "webApp" } as const;
const _KeyboardButtonWireKeys = invertKeys(_KeyboardButtonPublicKeys);
const _KeyboardButtonEncoded = Schema.StructWithRest(
  Schema.Struct({
    text: Schema.String,
    icon_custom_emoji_id: Schema.optionalKey(Schema.String),
    style: Schema.optionalKey(Schema.String),
    request_users: Schema.optionalKey(Schema.suspend((): Schema.Codec<KeyboardButtonRequestUsers, unknown> => KeyboardButtonRequestUsers)),
    request_chat: Schema.optionalKey(Schema.suspend((): Schema.Codec<KeyboardButtonRequestChat, unknown> => KeyboardButtonRequestChat)),
    request_managed_bot: Schema.optionalKey(Schema.suspend((): Schema.Codec<KeyboardButtonRequestManagedBot, unknown> => KeyboardButtonRequestManagedBot)),
    request_contact: Schema.optionalKey(Schema.Boolean),
    request_location: Schema.optionalKey(Schema.Boolean),
    request_poll: Schema.optionalKey(Schema.suspend((): Schema.Codec<KeyboardButtonPollType, unknown> => KeyboardButtonPollType)),
    web_app: Schema.optionalKey(Schema.suspend((): Schema.Codec<WebAppInfo, unknown> => WebAppInfo)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _KeyboardButtonDecoded = Schema.declare<KeyboardButton>((input): input is KeyboardButton => Predicate.isObject(input));
export const KeyboardButton: Schema.Codec<KeyboardButton, unknown> = _KeyboardButtonEncoded.pipe(
  Schema.decodeTo(_KeyboardButtonDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_KeyboardButtonPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_KeyboardButtonWireKeys)),
  }),
);

/** This object represents type of a poll, which is allowed to be created and sent when the corresponding button is pressed. */
export interface KeyboardButtonPollType {
  /** Optional. If quiz is passed, the user will be allowed to create only polls in the quiz mode. If regular is passed, only regular polls will be allowed. Otherwise, the user will be allowed to create a poll of any type. */
  readonly type?: string;
  readonly [key: string]: unknown;
}
export const KeyboardButtonPollType: Schema.Codec<KeyboardButtonPollType, unknown> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.optionalKey(Schema.String),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object defines the criteria used to request a suitable chat. Information about the selected chat will be shared with the bot when the corresponding button is pressed. The bot will be granted requested rights in the chat if appropriate. More about requesting chats ». */
export interface KeyboardButtonRequestChat {
  /** Signed 32-bit identifier of the request, which will be received back in the ChatShared object. Must be unique within the message. */
  readonly requestId: number;
  /** Pass True to request a channel chat, pass False to request a group or a supergroup chat */
  readonly chatIsChannel: boolean;
  /** Optional. Pass True to request a forum supergroup, pass False to request a non-forum chat. If not specified, no additional restrictions are applied. */
  readonly chatIsForum?: boolean;
  /** Optional. Pass True to request a supergroup or a channel with a username, pass False to request a chat without a username. If not specified, no additional restrictions are applied. */
  readonly chatHasUsername?: boolean;
  /** Optional. Pass True to request a chat owned by the user. Otherwise, no additional restrictions are applied. */
  readonly chatIsCreated?: boolean;
  /** Optional. A JSON-serialized object listing the required administrator rights of the user in the chat. The rights must be a superset of bot_administrator_rights. If not specified, no additional restrictions are applied. */
  readonly userAdministratorRights?: ChatAdministratorRights;
  /** Optional. A JSON-serialized object listing the required administrator rights of the bot in the chat. The rights must be a subset of user_administrator_rights. If not specified, no additional restrictions are applied. */
  readonly botAdministratorRights?: ChatAdministratorRights;
  /** Optional. Pass True to request a chat with the bot as a member. Otherwise, no additional restrictions are applied. */
  readonly botIsMember?: boolean;
  /** Optional. Pass True to request the chat's title */
  readonly requestTitle?: boolean;
  /** Optional. Pass True to request the chat's username */
  readonly requestUsername?: boolean;
  /** Optional. Pass True to request the chat's photo */
  readonly requestPhoto?: boolean;
  readonly [key: string]: unknown;
}
const _KeyboardButtonRequestChatPublicKeys = { request_id: "requestId", chat_is_channel: "chatIsChannel", chat_is_forum: "chatIsForum", chat_has_username: "chatHasUsername", chat_is_created: "chatIsCreated", user_administrator_rights: "userAdministratorRights", bot_administrator_rights: "botAdministratorRights", bot_is_member: "botIsMember", request_title: "requestTitle", request_username: "requestUsername", request_photo: "requestPhoto" } as const;
const _KeyboardButtonRequestChatWireKeys = invertKeys(_KeyboardButtonRequestChatPublicKeys);
const _KeyboardButtonRequestChatEncoded = Schema.StructWithRest(
  Schema.Struct({
    request_id: Schema.Int,
    chat_is_channel: Schema.Boolean,
    chat_is_forum: Schema.optionalKey(Schema.Boolean),
    chat_has_username: Schema.optionalKey(Schema.Boolean),
    chat_is_created: Schema.optionalKey(Schema.Boolean),
    user_administrator_rights: Schema.optionalKey(Schema.suspend((): Schema.Codec<ChatAdministratorRights, unknown> => ChatAdministratorRights)),
    bot_administrator_rights: Schema.optionalKey(Schema.suspend((): Schema.Codec<ChatAdministratorRights, unknown> => ChatAdministratorRights)),
    bot_is_member: Schema.optionalKey(Schema.Boolean),
    request_title: Schema.optionalKey(Schema.Boolean),
    request_username: Schema.optionalKey(Schema.Boolean),
    request_photo: Schema.optionalKey(Schema.Boolean),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _KeyboardButtonRequestChatDecoded = Schema.declare<KeyboardButtonRequestChat>((input): input is KeyboardButtonRequestChat => Predicate.isObject(input));
export const KeyboardButtonRequestChat: Schema.Codec<KeyboardButtonRequestChat, unknown> = _KeyboardButtonRequestChatEncoded.pipe(
  Schema.decodeTo(_KeyboardButtonRequestChatDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_KeyboardButtonRequestChatPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_KeyboardButtonRequestChatWireKeys)),
  }),
);

/** This object defines the parameters for the creation of a managed bot. Information about the created bot will be shared with the bot using the update managed_bot and a Message with the field managed_bot_created. */
export interface KeyboardButtonRequestManagedBot {
  /** Signed 32-bit identifier of the request. Must be unique within the message. */
  readonly requestId: number;
  /** Optional. Suggested name for the bot */
  readonly suggestedName?: string;
  /** Optional. Suggested username for the bot */
  readonly suggestedUsername?: string;
  readonly [key: string]: unknown;
}
const _KeyboardButtonRequestManagedBotPublicKeys = { request_id: "requestId", suggested_name: "suggestedName", suggested_username: "suggestedUsername" } as const;
const _KeyboardButtonRequestManagedBotWireKeys = invertKeys(_KeyboardButtonRequestManagedBotPublicKeys);
const _KeyboardButtonRequestManagedBotEncoded = Schema.StructWithRest(
  Schema.Struct({
    request_id: Schema.Int,
    suggested_name: Schema.optionalKey(Schema.String),
    suggested_username: Schema.optionalKey(Schema.String),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _KeyboardButtonRequestManagedBotDecoded = Schema.declare<KeyboardButtonRequestManagedBot>((input): input is KeyboardButtonRequestManagedBot => Predicate.isObject(input));
export const KeyboardButtonRequestManagedBot: Schema.Codec<KeyboardButtonRequestManagedBot, unknown> = _KeyboardButtonRequestManagedBotEncoded.pipe(
  Schema.decodeTo(_KeyboardButtonRequestManagedBotDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_KeyboardButtonRequestManagedBotPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_KeyboardButtonRequestManagedBotWireKeys)),
  }),
);

/** This object defines the criteria used to request suitable users. Information about the selected users will be shared with the bot when the corresponding button is pressed. More about requesting users » */
export interface KeyboardButtonRequestUsers {
  /** Signed 32-bit identifier of the request that will be received back in the UsersShared object. Must be unique within the message. */
  readonly requestId: number;
  /** Optional. Pass True to request bots, pass False to request regular users. If not specified, no additional restrictions are applied. */
  readonly userIsBot?: boolean;
  /** Optional. Pass True to request premium users, pass False to request non-premium users. If not specified, no additional restrictions are applied. */
  readonly userIsPremium?: boolean;
  /** Optional. The maximum number of users to be selected; 1-10. Defaults to 1. */
  readonly maxQuantity?: number;
  /** Optional. Pass True to request the users' first and last names */
  readonly requestName?: boolean;
  /** Optional. Pass True to request the users' usernames */
  readonly requestUsername?: boolean;
  /** Optional. Pass True to request the users' photos */
  readonly requestPhoto?: boolean;
  readonly [key: string]: unknown;
}
const _KeyboardButtonRequestUsersPublicKeys = { request_id: "requestId", user_is_bot: "userIsBot", user_is_premium: "userIsPremium", max_quantity: "maxQuantity", request_name: "requestName", request_username: "requestUsername", request_photo: "requestPhoto" } as const;
const _KeyboardButtonRequestUsersWireKeys = invertKeys(_KeyboardButtonRequestUsersPublicKeys);
const _KeyboardButtonRequestUsersEncoded = Schema.StructWithRest(
  Schema.Struct({
    request_id: Schema.Int,
    user_is_bot: Schema.optionalKey(Schema.Boolean),
    user_is_premium: Schema.optionalKey(Schema.Boolean),
    max_quantity: Schema.optionalKey(Schema.Int),
    request_name: Schema.optionalKey(Schema.Boolean),
    request_username: Schema.optionalKey(Schema.Boolean),
    request_photo: Schema.optionalKey(Schema.Boolean),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _KeyboardButtonRequestUsersDecoded = Schema.declare<KeyboardButtonRequestUsers>((input): input is KeyboardButtonRequestUsers => Predicate.isObject(input));
export const KeyboardButtonRequestUsers: Schema.Codec<KeyboardButtonRequestUsers, unknown> = _KeyboardButtonRequestUsersEncoded.pipe(
  Schema.decodeTo(_KeyboardButtonRequestUsersDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_KeyboardButtonRequestUsersPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_KeyboardButtonRequestUsersWireKeys)),
  }),
);

/** This object represents a portion of the price for goods or services. */
export interface LabeledPrice {
  /** Portion label */
  readonly label: string;
  /** Price of the product in the smallest units of the currency (integer, not float/double). For example, for a price of US$ 1.45 pass amount = 145. See the exp parameter in currencies.json, it shows the number of digits past the decimal point for each currency (2 for the majority of currencies). */
  readonly amount: number;
  readonly [key: string]: unknown;
}
export const LabeledPrice: Schema.Codec<LabeledPrice, unknown> = Schema.StructWithRest(
  Schema.Struct({
    label: Schema.String,
    amount: Schema.Int,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Represents an HTTP link. */
export interface Link {
  /** URL of the link */
  readonly url: string;
  readonly [key: string]: unknown;
}
export const Link: Schema.Codec<Link, unknown> = Schema.StructWithRest(
  Schema.Struct({
    url: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Describes the options used for link preview generation. */
export interface LinkPreviewOptions {
  /** Optional. True, if the link preview is disabled */
  readonly isDisabled?: boolean;
  /** Optional. URL to use for the link preview. If empty, then the first URL found in the message text will be used. */
  readonly url?: string;
  /** Optional. True, if the media in the link preview is supposed to be shrunk; ignored if the URL isn't explicitly specified or media size change isn't supported for the preview */
  readonly preferSmallMedia?: boolean;
  /** Optional. True, if the media in the link preview is supposed to be enlarged; ignored if the URL isn't explicitly specified or media size change isn't supported for the preview */
  readonly preferLargeMedia?: boolean;
  /** Optional. True, if the link preview must be shown above the message text; otherwise, the link preview will be shown below the message text */
  readonly showAboveText?: boolean;
  readonly [key: string]: unknown;
}
const _LinkPreviewOptionsPublicKeys = { is_disabled: "isDisabled", prefer_small_media: "preferSmallMedia", prefer_large_media: "preferLargeMedia", show_above_text: "showAboveText" } as const;
const _LinkPreviewOptionsWireKeys = invertKeys(_LinkPreviewOptionsPublicKeys);
const _LinkPreviewOptionsEncoded = Schema.StructWithRest(
  Schema.Struct({
    is_disabled: Schema.optionalKey(Schema.Boolean),
    url: Schema.optionalKey(Schema.String),
    prefer_small_media: Schema.optionalKey(Schema.Boolean),
    prefer_large_media: Schema.optionalKey(Schema.Boolean),
    show_above_text: Schema.optionalKey(Schema.Boolean),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _LinkPreviewOptionsDecoded = Schema.declare<LinkPreviewOptions>((input): input is LinkPreviewOptions => Predicate.isObject(input));
export const LinkPreviewOptions: Schema.Codec<LinkPreviewOptions, unknown> = _LinkPreviewOptionsEncoded.pipe(
  Schema.decodeTo(_LinkPreviewOptionsDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_LinkPreviewOptionsPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_LinkPreviewOptionsWireKeys)),
  }),
);

/** This object represents a live photo. */
export interface LivePhoto {
  /** Optional. Available sizes of the corresponding static photo */
  readonly photo?: ReadonlyArray<PhotoSize>;
  /** Identifier for the video file which can be used to download or reuse the file */
  readonly fileId: string;
  /** Unique identifier for the video file which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file. */
  readonly fileUniqueId: string;
  /** Video width as defined by the sender */
  readonly width: number;
  /** Video height as defined by the sender */
  readonly height: number;
  /** Duration of the video in seconds as defined by the sender */
  readonly duration: number;
  /** Optional. MIME type of the file as defined by the sender */
  readonly mimeType?: string;
  /** Optional. File size in bytes. It can be bigger than 2^31 and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a signed 64-bit integer or double-precision float type are safe for storing this value. */
  readonly fileSize?: number;
  readonly [key: string]: unknown;
}
const _LivePhotoPublicKeys = { file_id: "fileId", file_unique_id: "fileUniqueId", mime_type: "mimeType", file_size: "fileSize" } as const;
const _LivePhotoWireKeys = invertKeys(_LivePhotoPublicKeys);
const _LivePhotoEncoded = Schema.StructWithRest(
  Schema.Struct({
    photo: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<PhotoSize, unknown> => PhotoSize))),
    file_id: Schema.String,
    file_unique_id: Schema.String,
    width: Schema.Int,
    height: Schema.Int,
    duration: Schema.Int,
    mime_type: Schema.optionalKey(Schema.String),
    file_size: Schema.optionalKey(Schema.Int),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _LivePhotoDecoded = Schema.declare<LivePhoto>((input): input is LivePhoto => Predicate.isObject(input));
export const LivePhoto: Schema.Codec<LivePhoto, unknown> = _LivePhotoEncoded.pipe(
  Schema.decodeTo(_LivePhotoDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_LivePhotoPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_LivePhotoWireKeys)),
  }),
);

/** This object represents a point on the map. */
export interface Location {
  /** Latitude as defined by the sender */
  readonly latitude: number;
  /** Longitude as defined by the sender */
  readonly longitude: number;
  /** Optional. The radius of uncertainty for the location, measured in meters; 0-1500 */
  readonly horizontalAccuracy?: number;
  /** Optional. Time relative to the message sending date, during which the location can be updated; in seconds. For active live locations only. */
  readonly livePeriod?: number;
  /** Optional. The direction in which user is moving, in degrees; 1-360. For active live locations only. */
  readonly heading?: number;
  /** Optional. The maximum distance for proximity alerts about approaching another chat member, in meters. For sent live locations only. */
  readonly proximityAlertRadius?: number;
  readonly [key: string]: unknown;
}
const _LocationPublicKeys = { horizontal_accuracy: "horizontalAccuracy", live_period: "livePeriod", proximity_alert_radius: "proximityAlertRadius" } as const;
const _LocationWireKeys = invertKeys(_LocationPublicKeys);
const _LocationEncoded = Schema.StructWithRest(
  Schema.Struct({
    latitude: Schema.Number,
    longitude: Schema.Number,
    horizontal_accuracy: Schema.optionalKey(Schema.Number),
    live_period: Schema.optionalKey(Schema.Int),
    heading: Schema.optionalKey(Schema.Int),
    proximity_alert_radius: Schema.optionalKey(Schema.Int),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _LocationDecoded = Schema.declare<Location>((input): input is Location => Predicate.isObject(input));
export const Location: Schema.Codec<Location, unknown> = _LocationEncoded.pipe(
  Schema.decodeTo(_LocationDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_LocationPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_LocationWireKeys)),
  }),
);

/** Describes the physical address of a location. */
export interface LocationAddress {
  /** The two-letter ISO 3166-1 alpha-2 country code of the country where the location is located */
  readonly countryCode: string;
  /** Optional. State of the location */
  readonly state?: string;
  /** Optional. City of the location */
  readonly city?: string;
  /** Optional. Street address of the location */
  readonly street?: string;
  readonly [key: string]: unknown;
}
const _LocationAddressPublicKeys = { country_code: "countryCode" } as const;
const _LocationAddressWireKeys = invertKeys(_LocationAddressPublicKeys);
const _LocationAddressEncoded = Schema.StructWithRest(
  Schema.Struct({
    country_code: Schema.String,
    state: Schema.optionalKey(Schema.String),
    city: Schema.optionalKey(Schema.String),
    street: Schema.optionalKey(Schema.String),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _LocationAddressDecoded = Schema.declare<LocationAddress>((input): input is LocationAddress => Predicate.isObject(input));
export const LocationAddress: Schema.Codec<LocationAddress, unknown> = _LocationAddressEncoded.pipe(
  Schema.decodeTo(_LocationAddressDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_LocationAddressPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_LocationAddressWireKeys)),
  }),
);

/** This object represents a parameter of the inline keyboard button used to automatically authorize a user. It serves as a great replacement for the Telegram Login Widget when the user is coming from Telegram. All the user needs to do is tap/click a button and confirm that they want to log in: */
export interface LoginUrl {
  /** An HTTPS URL to be opened with user authorization data added to the query string when the button is pressed. If the user refuses to provide authorization data, the original URL without information about the user will be opened. The data added is the same as described in Receiving authorization data.

NOTE: You must always check the hash of the received data to verify the authentication and the integrity of the data as described in Checking authorization. */
  readonly url: string;
  /** Optional. New text of the button in forwarded messages */
  readonly forwardText?: string;
  /** Optional. Username of a bot, which will be used for user authorization; not supported in RichMessageButton. See Setting up a bot for more details. If not specified, the current bot's username will be assumed. The url's domain must be the same as the domain linked with the bot. See Linking your domain to the bot for more details. */
  readonly botUsername?: string;
  /** Optional. Pass True to request the permission for your bot to send messages to the user */
  readonly requestWriteAccess?: boolean;
  readonly [key: string]: unknown;
}
const _LoginUrlPublicKeys = { forward_text: "forwardText", bot_username: "botUsername", request_write_access: "requestWriteAccess" } as const;
const _LoginUrlWireKeys = invertKeys(_LoginUrlPublicKeys);
const _LoginUrlEncoded = Schema.StructWithRest(
  Schema.Struct({
    url: Schema.String,
    forward_text: Schema.optionalKey(Schema.String),
    bot_username: Schema.optionalKey(Schema.String),
    request_write_access: Schema.optionalKey(Schema.Boolean),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _LoginUrlDecoded = Schema.declare<LoginUrl>((input): input is LoginUrl => Predicate.isObject(input));
export const LoginUrl: Schema.Codec<LoginUrl, unknown> = _LoginUrlEncoded.pipe(
  Schema.decodeTo(_LoginUrlDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_LoginUrlPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_LoginUrlWireKeys)),
  }),
);

/** This object contains information about the bot that was created to be managed by the current bot. */
export interface ManagedBotCreated {
  /** Information about the bot. The bot's token can be fetched using the method getManagedBotToken. */
  readonly bot: User;
  readonly [key: string]: unknown;
}
export const ManagedBotCreated: Schema.Codec<ManagedBotCreated, unknown> = Schema.StructWithRest(
  Schema.Struct({
    bot: Schema.suspend((): Schema.Codec<User, unknown> => User),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object contains information about the creation, token update, or owner update of a bot that is managed by the current bot. */
export interface ManagedBotUpdated {
  /** User that created the bot */
  readonly user: User;
  /** Information about the bot. Token of the bot can be fetched using the method getManagedBotToken. */
  readonly bot: User;
  readonly [key: string]: unknown;
}
export const ManagedBotUpdated: Schema.Codec<ManagedBotUpdated, unknown> = Schema.StructWithRest(
  Schema.Struct({
    user: Schema.suspend((): Schema.Codec<User, unknown> => User),
    bot: Schema.suspend((): Schema.Codec<User, unknown> => User),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object describes the position on faces where a mask should be placed by default. */
export interface MaskPosition {
  /** The part of the face relative to which the mask should be placed. One of “forehead”, “eyes”, “mouth”, or “chin”. */
  readonly point: MaskPositionPoint;
  /** Shift by X-axis measured in widths of the mask scaled to the face size, from left to right. For example, choosing -1.0 will place mask just to the left of the default mask position. */
  readonly xShift: number;
  /** Shift by Y-axis measured in heights of the mask scaled to the face size, from top to bottom. For example, 1.0 will place the mask just below the default mask position. */
  readonly yShift: number;
  /** Mask scaling coefficient. For example, 2.0 means double size. */
  readonly scale: number;
  readonly [key: string]: unknown;
}
const _MaskPositionPublicKeys = { x_shift: "xShift", y_shift: "yShift" } as const;
const _MaskPositionWireKeys = invertKeys(_MaskPositionPublicKeys);
const _MaskPositionEncoded = Schema.StructWithRest(
  Schema.Struct({
    point: Schema.suspend((): Schema.Codec<MaskPositionPoint, unknown> => MaskPositionPoint),
    x_shift: Schema.Number,
    y_shift: Schema.Number,
    scale: Schema.Number,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _MaskPositionDecoded = Schema.declare<MaskPosition>((input): input is MaskPosition => Predicate.isObject(input));
export const MaskPosition: Schema.Codec<MaskPosition, unknown> = _MaskPositionEncoded.pipe(
  Schema.decodeTo(_MaskPositionDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_MaskPositionPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_MaskPositionWireKeys)),
  }),
);

/** This object describes a message that can be inaccessible to the bot. It can be one of */
export type MaybeInaccessibleMessage = Message | InaccessibleMessage;
export const MaybeInaccessibleMessage: Schema.Codec<MaybeInaccessibleMessage, unknown> = Schema.Union([Schema.suspend((): Schema.Codec<Message, unknown> => Message), Schema.suspend((): Schema.Codec<InaccessibleMessage, unknown> => InaccessibleMessage)]);

/** This object describes the bot's menu button in a private chat. It should be one of */
export type MenuButton = MenuButtonCommands | MenuButtonWebApp | MenuButtonDefault;
export const MenuButton: Schema.Codec<MenuButton, unknown> = Schema.Union([Schema.suspend((): Schema.Codec<MenuButtonCommands, unknown> => MenuButtonCommands), Schema.suspend((): Schema.Codec<MenuButtonWebApp, unknown> => MenuButtonWebApp), Schema.suspend((): Schema.Codec<MenuButtonDefault, unknown> => MenuButtonDefault)]);

/** Represents a menu button, which opens the bot's list of commands. */
export interface MenuButtonCommands {
  /** Type of the button, must be commands */
  readonly type: "commands";
  readonly [key: string]: unknown;
}
export const MenuButtonCommands: Schema.Codec<MenuButtonCommands, unknown> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("commands"),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Describes that no specific value for the menu button was set. */
export interface MenuButtonDefault {
  /** Type of the button, must be default */
  readonly type: "default";
  readonly [key: string]: unknown;
}
export const MenuButtonDefault: Schema.Codec<MenuButtonDefault, unknown> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("default"),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Represents a menu button, which launches a Web App. */
export interface MenuButtonWebApp {
  /** Type of the button, must be web_app */
  readonly type: "web_app";
  /** Text on the button */
  readonly text: string;
  /** Description of the Web App that will be launched when the user presses the button. The Web App will be able to send an arbitrary message on behalf of the user using the method answerWebAppQuery. Alternatively, a t.me link to a Web App of the bot can be specified in the object instead of the Web App's URL, in which case the Web App will be opened as if the user pressed the link. */
  readonly webApp: WebAppInfo;
  readonly [key: string]: unknown;
}
const _MenuButtonWebAppPublicKeys = { web_app: "webApp" } as const;
const _MenuButtonWebAppWireKeys = invertKeys(_MenuButtonWebAppPublicKeys);
const _MenuButtonWebAppEncoded = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("web_app"),
    text: Schema.String,
    web_app: Schema.suspend((): Schema.Codec<WebAppInfo, unknown> => WebAppInfo),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _MenuButtonWebAppDecoded = Schema.declare<MenuButtonWebApp>((input): input is MenuButtonWebApp => Predicate.isObject(input));
export const MenuButtonWebApp: Schema.Codec<MenuButtonWebApp, unknown> = _MenuButtonWebAppEncoded.pipe(
  Schema.decodeTo(_MenuButtonWebAppDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_MenuButtonWebAppPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_MenuButtonWebAppWireKeys)),
  }),
);

/** This object represents a message. */
export interface Message {
  /** Unique message identifier inside this chat; 0 for ephemeral messages. In specific instances (e.g., a message containing a video sent to a big chat), the server might automatically schedule a message instead of sending it immediately. In such cases, this field will be 0 and the relevant message will be unusable until it is actually sent. */
  readonly messageId: number;
  /** Optional. Unique identifier of a message thread or forum topic to which the message belongs; for supergroups and private chats only */
  readonly messageThreadId?: number;
  /** Optional. Information about the direct messages chat topic that contains the message */
  readonly directMessagesTopic?: DirectMessagesTopic;
  /** Optional. Sender of the message; may be empty for messages sent to channels. For backward compatibility, if the message was sent on behalf of a chat, the field contains a fake sender user in non-channel chats. */
  readonly from?: User;
  /** Optional. Sender of the message when sent on behalf of a chat. For example, the supergroup itself for messages sent by its anonymous administrators or a linked channel for messages automatically forwarded to the channel's discussion group. For backward compatibility, if the message was sent on behalf of a chat, the field from contains a fake sender user in non-channel chats. */
  readonly senderChat?: Chat;
  /** Optional. If the sender of the message boosted the chat, the number of boosts added by the user */
  readonly senderBoostCount?: number;
  /** Optional. The bot that actually sent the message on behalf of the business account. Available only for outgoing messages sent on behalf of the connected business account. */
  readonly senderBusinessBot?: User;
  /** Optional. Tag or custom title of the sender of the message; for supergroups only */
  readonly senderTag?: string;
  /** Optional. For ephemeral messages, the user who received the message */
  readonly receiverUser?: User;
  /** Optional. For ephemeral messages, identifier of the ephemeral message inside this chat. The identifier may be reused for another ephemeral message after the message is deleted or expires. */
  readonly ephemeralMessageId?: number;
  /** Date the message was sent in Unix time. It is always a positive number, representing a valid date. */
  readonly date: number;
  /** Optional. The unique identifier for the guest query. Use this identifier with the method answerGuestQuery to send a response message. If non-empty, the message belongs to the chat where the guest bot was summoned, which may not coincide with other existing bot chats sharing the same identifier. */
  readonly guestQueryId?: string;
  /** Optional. Unique identifier of the business connection from which the message was received. If non-empty, the message belongs to a chat of the corresponding business account that is independent from any potential bot chat which might share the same identifier. */
  readonly businessConnectionId?: string;
  /** Chat the message belongs to */
  readonly chat: Chat;
  /** Optional. Information about the original message for forwarded messages */
  readonly forwardOrigin?: MessageOrigin;
  /** Optional. True, if the message is sent to a topic in a forum supergroup or a private chat with the bot */
  readonly isTopicMessage?: true;
  /** Optional. True, if the message is a channel post that was automatically forwarded to the connected discussion group */
  readonly isAutomaticForward?: true;
  /** Optional. For replies in the same chat and message thread, the original message. Note that the Message object in this field will not contain further reply_to_message fields even if it itself is a reply. If the message is a reply to an ephemeral message, then this field may be omitted. */
  readonly replyToMessage?: Message;
  /** Optional. Information about the message that is being replied to, which may come from another chat or forum topic */
  readonly externalReply?: ExternalReplyInfo;
  /** Optional. For replies that quote part of the original message, the quoted part of the message */
  readonly quote?: TextQuote;
  /** Optional. For replies to a story, the original story */
  readonly replyToStory?: Story;
  /** Optional. Identifier of the specific checklist task that is being replied to */
  readonly replyToChecklistTaskId?: number;
  /** Optional. Persistent identifier of the specific poll option that is being replied to */
  readonly replyToPollOptionId?: string;
  /** Optional. Bot through which the message was sent */
  readonly viaBot?: User;
  /** Optional. For a message sent by a guest bot, this is the user whose original message triggered the bot's response */
  readonly guestBotCallerUser?: User;
  /** Optional. For a message sent by a guest bot, this is the chat whose original message triggered the bot's response */
  readonly guestBotCallerChat?: Chat;
  /** Optional. Date the message was last edited in Unix time */
  readonly editDate?: number;
  /** Optional. True, if the message can't be forwarded */
  readonly hasProtectedContent?: true;
  /** Optional. True, if the message was sent by an implicit action, for example, as an away or a greeting business message, or as a scheduled message */
  readonly isFromOffline?: true;
  /** Optional. True, if the message is a paid post. Note that such posts must not be deleted for 24 hours to receive the payment and can't be edited. */
  readonly isPaidPost?: true;
  /** Optional. The unique identifier inside this chat of a media message group this message belongs to */
  readonly mediaGroupId?: string;
  /** Optional. Signature of the post author for messages in channels, or the custom title of an anonymous group administrator */
  readonly authorSignature?: string;
  /** Optional. The number of Telegram Stars that were paid by the sender of the message to send it */
  readonly paidStarCount?: number;
  /** Optional. For text messages, the actual UTF-8 text of the message */
  readonly text?: string;
  /** Optional. For text messages, special entities like usernames, URLs, bot commands, etc. that appear in the text */
  readonly entities?: ReadonlyArray<MessageEntity>;
  /** Optional. Options used for link preview generation for the message, if it is a text message and link preview options were changed */
  readonly linkPreviewOptions?: LinkPreviewOptions;
  /** Optional. Information about suggested post parameters if the message is a suggested post in a channel direct messages chat. If the message is an approved or declined suggested post, then it can't be edited. */
  readonly suggestedPostInfo?: SuggestedPostInfo;
  /** Optional. Unique identifier of the message effect added to the message */
  readonly effectId?: string;
  /** Optional. Message is a rich formatted message */
  readonly richMessage?: RichMessage;
  /** Optional. Message is an animation, information about the animation. For backward compatibility, when this field is set, the document field will also be set. */
  readonly animation?: Animation;
  /** Optional. Message is an audio file, information about the file */
  readonly audio?: Audio;
  /** Optional. Message is a general file, information about the file */
  readonly document?: Document;
  /** Optional. Message is a live photo, information about the live photo. For backward compatibility, when this field is set, the photo field will also be set. */
  readonly livePhoto?: LivePhoto;
  /** Optional. Message contains paid media; information about the paid media */
  readonly paidMedia?: PaidMediaInfo;
  /** Optional. Message is a photo, available sizes of the photo */
  readonly photo?: ReadonlyArray<PhotoSize>;
  /** Optional. Message is a sticker, information about the sticker */
  readonly sticker?: Sticker;
  /** Optional. Message is a forwarded story */
  readonly story?: Story;
  /** Optional. Message is a video, information about the video */
  readonly video?: Video;
  /** Optional. Message is a video note, information about the video message */
  readonly videoNote?: VideoNote;
  /** Optional. Message is a voice message, information about the file */
  readonly voice?: Voice;
  /** Optional. Caption for the animation, audio, document, paid media, photo, video or voice */
  readonly caption?: string;
  /** Optional. For messages with a caption, special entities like usernames, URLs, bot commands, etc. that appear in the caption */
  readonly captionEntities?: ReadonlyArray<MessageEntity>;
  /** Optional. True, if the caption must be shown above the message media */
  readonly showCaptionAboveMedia?: true;
  /** Optional. True, if the message media is covered by a spoiler animation */
  readonly hasMediaSpoiler?: true;
  /** Optional. Message is a checklist */
  readonly checklist?: Checklist;
  /** Optional. Message is a shared contact, information about the contact */
  readonly contact?: Contact;
  /** Optional. Message is a dice with random value */
  readonly dice?: Dice;
  /** Optional. Message is a game, information about the game. More about games » */
  readonly game?: Game;
  /** Optional. Message is a native poll, information about the poll */
  readonly poll?: Poll;
  /** Optional. Message is a venue, information about the venue. For backward compatibility, when this field is set, the location field will also be set. */
  readonly venue?: Venue;
  /** Optional. Message is a shared location, information about the location */
  readonly location?: Location;
  /** Optional. New members that were added to the group or supergroup and information about them (the bot itself may be one of these members) */
  readonly newChatMembers?: ReadonlyArray<User>;
  /** Optional. A member was removed from the group, information about them (this member may be the bot itself) */
  readonly leftChatMember?: User;
  /** Optional. Service message: chat owner has left */
  readonly chatOwnerLeft?: ChatOwnerLeft;
  /** Optional. Service message: chat owner has changed */
  readonly chatOwnerChanged?: ChatOwnerChanged;
  /** Optional. A chat title was changed to this value */
  readonly newChatTitle?: string;
  /** Optional. A chat photo was change to this value */
  readonly newChatPhoto?: ReadonlyArray<PhotoSize>;
  /** Optional. Service message: the chat photo was deleted */
  readonly deleteChatPhoto?: true;
  /** Optional. Service message: the group has been created */
  readonly groupChatCreated?: true;
  /** Optional. Service message: the supergroup has been created. This field can't be received in a message coming through updates, because bot can't be a member of a supergroup when it is created. It can only be found in reply_to_message if someone replies to a very first message in a directly created supergroup. */
  readonly supergroupChatCreated?: true;
  /** Optional. Service message: the channel has been created. This field can't be received in a message coming through updates, because bot can't be a member of a channel when it is created. It can only be found in reply_to_message if someone replies to a very first message in a channel. */
  readonly channelChatCreated?: true;
  /** Optional. Service message: auto-delete timer settings changed in the chat */
  readonly messageAutoDeleteTimerChanged?: MessageAutoDeleteTimerChanged;
  /** Optional. The group has been migrated to a supergroup with the specified identifier. This number may have more than 32 significant bits and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a signed 64-bit integer or double-precision float type are safe for storing this identifier. */
  readonly migrateToChatId?: number;
  /** Optional. The supergroup has been migrated from a group with the specified identifier. This number may have more than 32 significant bits and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a signed 64-bit integer or double-precision float type are safe for storing this identifier. */
  readonly migrateFromChatId?: number;
  /** Optional. Specified message was pinned. Note that the Message object in this field will not contain further reply_to_message fields even if it itself is a reply. */
  readonly pinnedMessage?: MaybeInaccessibleMessage;
  /** Optional. Message is an invoice for a payment, information about the invoice. More about payments » */
  readonly invoice?: Invoice;
  /** Optional. Message is a service message about a successful payment, information about the payment. More about payments » */
  readonly successfulPayment?: SuccessfulPayment;
  /** Optional. Message is a service message about a refunded payment, information about the payment. More about payments » */
  readonly refundedPayment?: RefundedPayment;
  /** Optional. Service message: users were shared with the bot */
  readonly usersShared?: UsersShared;
  /** Optional. Service message: a chat was shared with the bot */
  readonly chatShared?: ChatShared;
  /** Optional. Service message: a regular gift was sent or received */
  readonly gift?: GiftInfo;
  /** Optional. Service message: a unique gift was sent or received */
  readonly uniqueGift?: UniqueGiftInfo;
  /** Optional. Service message: upgrade of a gift was purchased after the gift was sent */
  readonly giftUpgradeSent?: GiftInfo;
  /** Optional. The domain name of the website on which the user has logged in. More about Telegram Login » */
  readonly connectedWebsite?: string;
  /** Optional. Service message: the user allowed the bot to write messages after adding it to the attachment or side menu, launching a Web App from a link, or accepting an explicit request from a Web App sent by the method requestWriteAccess */
  readonly writeAccessAllowed?: WriteAccessAllowed;
  /** Optional. Telegram Passport data */
  readonly passportData?: PassportData;
  /** Optional. Service message: a user in the chat triggered another user's proximity alert while sharing Live Location */
  readonly proximityAlertTriggered?: ProximityAlertTriggered;
  /** Optional. Service message: user boosted the chat */
  readonly boostAdded?: ChatBoostAdded;
  /** Optional. Service message: chat background set */
  readonly chatBackgroundSet?: ChatBackground;
  /** Optional. Service message: some tasks in a checklist were marked as done or not done */
  readonly checklistTasksDone?: ChecklistTasksDone;
  /** Optional. Service message: tasks were added to a checklist */
  readonly checklistTasksAdded?: ChecklistTasksAdded;
  /** Optional. Service message: chat or bot added to a Community */
  readonly communityChatAdded?: CommunityChatAdded;
  /** Optional. Service message: chat was joined by a user from a Community */
  readonly communityChatJoined?: CommunityChatJoined;
  /** Optional. Service message: chat or bot removed from a Community */
  readonly communityChatRemoved?: CommunityChatRemoved;
  /** Optional. Service message: the price for paid messages in the corresponding direct messages chat of a channel has changed */
  readonly directMessagePriceChanged?: DirectMessagePriceChanged;
  /** Optional. Service message: forum topic created */
  readonly forumTopicCreated?: ForumTopicCreated;
  /** Optional. Service message: forum topic edited */
  readonly forumTopicEdited?: ForumTopicEdited;
  /** Optional. Service message: forum topic closed */
  readonly forumTopicClosed?: ForumTopicClosed;
  /** Optional. Service message: forum topic reopened */
  readonly forumTopicReopened?: ForumTopicReopened;
  /** Optional. Service message: the 'General' forum topic hidden */
  readonly generalForumTopicHidden?: GeneralForumTopicHidden;
  /** Optional. Service message: the 'General' forum topic unhidden */
  readonly generalForumTopicUnhidden?: GeneralForumTopicUnhidden;
  /** Optional. Service message: a scheduled giveaway was created */
  readonly giveawayCreated?: GiveawayCreated;
  /** Optional. The message is a scheduled giveaway message */
  readonly giveaway?: Giveaway;
  /** Optional. A giveaway with public winners was completed */
  readonly giveawayWinners?: GiveawayWinners;
  /** Optional. Service message: a giveaway without public winners was completed */
  readonly giveawayCompleted?: GiveawayCompleted;
  /** Optional. Service message: user created a bot that will be managed by the current bot */
  readonly managedBotCreated?: ManagedBotCreated;
  /** Optional. Service message: the price for paid messages has changed in the chat */
  readonly paidMessagePriceChanged?: PaidMessagePriceChanged;
  /** Optional. Service message: answer option was added to a poll */
  readonly pollOptionAdded?: PollOptionAdded;
  /** Optional. Service message: answer option was deleted from a poll */
  readonly pollOptionDeleted?: PollOptionDeleted;
  /** Optional. Service message: a suggested post was approved */
  readonly suggestedPostApproved?: SuggestedPostApproved;
  /** Optional. Service message: approval of a suggested post has failed */
  readonly suggestedPostApprovalFailed?: SuggestedPostApprovalFailed;
  /** Optional. Service message: a suggested post was declined */
  readonly suggestedPostDeclined?: SuggestedPostDeclined;
  /** Optional. Service message: payment for a suggested post was received */
  readonly suggestedPostPaid?: SuggestedPostPaid;
  /** Optional. Service message: payment for a suggested post was refunded */
  readonly suggestedPostRefunded?: SuggestedPostRefunded;
  /** Optional. Service message: video chat scheduled */
  readonly videoChatScheduled?: VideoChatScheduled;
  /** Optional. Service message: video chat started */
  readonly videoChatStarted?: VideoChatStarted;
  /** Optional. Service message: video chat ended */
  readonly videoChatEnded?: VideoChatEnded;
  /** Optional. Service message: new participants invited to a video chat */
  readonly videoChatParticipantsInvited?: VideoChatParticipantsInvited;
  /** Optional. Service message: data sent by a Web App */
  readonly webAppData?: WebAppData;
  /** Optional. Inline keyboard attached to the message. login_url buttons are represented as ordinary url buttons. */
  readonly replyMarkup?: InlineKeyboardMarkup;
  readonly [key: string]: unknown;
}
const _MessagePublicKeys = { message_id: "messageId", message_thread_id: "messageThreadId", direct_messages_topic: "directMessagesTopic", sender_chat: "senderChat", sender_boost_count: "senderBoostCount", sender_business_bot: "senderBusinessBot", sender_tag: "senderTag", receiver_user: "receiverUser", ephemeral_message_id: "ephemeralMessageId", guest_query_id: "guestQueryId", business_connection_id: "businessConnectionId", forward_origin: "forwardOrigin", is_topic_message: "isTopicMessage", is_automatic_forward: "isAutomaticForward", reply_to_message: "replyToMessage", external_reply: "externalReply", reply_to_story: "replyToStory", reply_to_checklist_task_id: "replyToChecklistTaskId", reply_to_poll_option_id: "replyToPollOptionId", via_bot: "viaBot", guest_bot_caller_user: "guestBotCallerUser", guest_bot_caller_chat: "guestBotCallerChat", edit_date: "editDate", has_protected_content: "hasProtectedContent", is_from_offline: "isFromOffline", is_paid_post: "isPaidPost", media_group_id: "mediaGroupId", author_signature: "authorSignature", paid_star_count: "paidStarCount", link_preview_options: "linkPreviewOptions", suggested_post_info: "suggestedPostInfo", effect_id: "effectId", rich_message: "richMessage", live_photo: "livePhoto", paid_media: "paidMedia", video_note: "videoNote", caption_entities: "captionEntities", show_caption_above_media: "showCaptionAboveMedia", has_media_spoiler: "hasMediaSpoiler", new_chat_members: "newChatMembers", left_chat_member: "leftChatMember", chat_owner_left: "chatOwnerLeft", chat_owner_changed: "chatOwnerChanged", new_chat_title: "newChatTitle", new_chat_photo: "newChatPhoto", delete_chat_photo: "deleteChatPhoto", group_chat_created: "groupChatCreated", supergroup_chat_created: "supergroupChatCreated", channel_chat_created: "channelChatCreated", message_auto_delete_timer_changed: "messageAutoDeleteTimerChanged", migrate_to_chat_id: "migrateToChatId", migrate_from_chat_id: "migrateFromChatId", pinned_message: "pinnedMessage", successful_payment: "successfulPayment", refunded_payment: "refundedPayment", users_shared: "usersShared", chat_shared: "chatShared", unique_gift: "uniqueGift", gift_upgrade_sent: "giftUpgradeSent", connected_website: "connectedWebsite", write_access_allowed: "writeAccessAllowed", passport_data: "passportData", proximity_alert_triggered: "proximityAlertTriggered", boost_added: "boostAdded", chat_background_set: "chatBackgroundSet", checklist_tasks_done: "checklistTasksDone", checklist_tasks_added: "checklistTasksAdded", community_chat_added: "communityChatAdded", community_chat_joined: "communityChatJoined", community_chat_removed: "communityChatRemoved", direct_message_price_changed: "directMessagePriceChanged", forum_topic_created: "forumTopicCreated", forum_topic_edited: "forumTopicEdited", forum_topic_closed: "forumTopicClosed", forum_topic_reopened: "forumTopicReopened", general_forum_topic_hidden: "generalForumTopicHidden", general_forum_topic_unhidden: "generalForumTopicUnhidden", giveaway_created: "giveawayCreated", giveaway_winners: "giveawayWinners", giveaway_completed: "giveawayCompleted", managed_bot_created: "managedBotCreated", paid_message_price_changed: "paidMessagePriceChanged", poll_option_added: "pollOptionAdded", poll_option_deleted: "pollOptionDeleted", suggested_post_approved: "suggestedPostApproved", suggested_post_approval_failed: "suggestedPostApprovalFailed", suggested_post_declined: "suggestedPostDeclined", suggested_post_paid: "suggestedPostPaid", suggested_post_refunded: "suggestedPostRefunded", video_chat_scheduled: "videoChatScheduled", video_chat_started: "videoChatStarted", video_chat_ended: "videoChatEnded", video_chat_participants_invited: "videoChatParticipantsInvited", web_app_data: "webAppData", reply_markup: "replyMarkup" } as const;
const _MessageWireKeys = invertKeys(_MessagePublicKeys);
const _MessageEncoded = Schema.StructWithRest(
  Schema.Struct({
    message_id: Schema.Int,
    message_thread_id: Schema.optionalKey(Schema.Int),
    direct_messages_topic: Schema.optionalKey(Schema.suspend((): Schema.Codec<DirectMessagesTopic, unknown> => DirectMessagesTopic)),
    from: Schema.optionalKey(Schema.suspend((): Schema.Codec<User, unknown> => User)),
    sender_chat: Schema.optionalKey(Schema.suspend((): Schema.Codec<Chat, unknown> => Chat)),
    sender_boost_count: Schema.optionalKey(Schema.Int),
    sender_business_bot: Schema.optionalKey(Schema.suspend((): Schema.Codec<User, unknown> => User)),
    sender_tag: Schema.optionalKey(Schema.String),
    receiver_user: Schema.optionalKey(Schema.suspend((): Schema.Codec<User, unknown> => User)),
    ephemeral_message_id: Schema.optionalKey(Schema.Int),
    date: Schema.Int,
    guest_query_id: Schema.optionalKey(Schema.String),
    business_connection_id: Schema.optionalKey(Schema.String),
    chat: Schema.suspend((): Schema.Codec<Chat, unknown> => Chat),
    forward_origin: Schema.optionalKey(Schema.suspend((): Schema.Codec<MessageOrigin, unknown> => MessageOrigin)),
    is_topic_message: Schema.optionalKey(Schema.Literal(true)),
    is_automatic_forward: Schema.optionalKey(Schema.Literal(true)),
    reply_to_message: Schema.optionalKey(Schema.suspend((): Schema.Codec<Message, unknown> => Message)),
    external_reply: Schema.optionalKey(Schema.suspend((): Schema.Codec<ExternalReplyInfo, unknown> => ExternalReplyInfo)),
    quote: Schema.optionalKey(Schema.suspend((): Schema.Codec<TextQuote, unknown> => TextQuote)),
    reply_to_story: Schema.optionalKey(Schema.suspend((): Schema.Codec<Story, unknown> => Story)),
    reply_to_checklist_task_id: Schema.optionalKey(Schema.Int),
    reply_to_poll_option_id: Schema.optionalKey(Schema.String),
    via_bot: Schema.optionalKey(Schema.suspend((): Schema.Codec<User, unknown> => User)),
    guest_bot_caller_user: Schema.optionalKey(Schema.suspend((): Schema.Codec<User, unknown> => User)),
    guest_bot_caller_chat: Schema.optionalKey(Schema.suspend((): Schema.Codec<Chat, unknown> => Chat)),
    edit_date: Schema.optionalKey(Schema.Int),
    has_protected_content: Schema.optionalKey(Schema.Literal(true)),
    is_from_offline: Schema.optionalKey(Schema.Literal(true)),
    is_paid_post: Schema.optionalKey(Schema.Literal(true)),
    media_group_id: Schema.optionalKey(Schema.String),
    author_signature: Schema.optionalKey(Schema.String),
    paid_star_count: Schema.optionalKey(Schema.Int),
    text: Schema.optionalKey(Schema.String),
    entities: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<MessageEntity, unknown> => MessageEntity))),
    link_preview_options: Schema.optionalKey(Schema.suspend((): Schema.Codec<LinkPreviewOptions, unknown> => LinkPreviewOptions)),
    suggested_post_info: Schema.optionalKey(Schema.suspend((): Schema.Codec<SuggestedPostInfo, unknown> => SuggestedPostInfo)),
    effect_id: Schema.optionalKey(Schema.String),
    rich_message: Schema.optionalKey(Schema.suspend((): Schema.Codec<RichMessage, unknown> => RichMessage)),
    animation: Schema.optionalKey(Schema.suspend((): Schema.Codec<Animation, unknown> => Animation)),
    audio: Schema.optionalKey(Schema.suspend((): Schema.Codec<Audio, unknown> => Audio)),
    document: Schema.optionalKey(Schema.suspend((): Schema.Codec<Document, unknown> => Document)),
    live_photo: Schema.optionalKey(Schema.suspend((): Schema.Codec<LivePhoto, unknown> => LivePhoto)),
    paid_media: Schema.optionalKey(Schema.suspend((): Schema.Codec<PaidMediaInfo, unknown> => PaidMediaInfo)),
    photo: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<PhotoSize, unknown> => PhotoSize))),
    sticker: Schema.optionalKey(Schema.suspend((): Schema.Codec<Sticker, unknown> => Sticker)),
    story: Schema.optionalKey(Schema.suspend((): Schema.Codec<Story, unknown> => Story)),
    video: Schema.optionalKey(Schema.suspend((): Schema.Codec<Video, unknown> => Video)),
    video_note: Schema.optionalKey(Schema.suspend((): Schema.Codec<VideoNote, unknown> => VideoNote)),
    voice: Schema.optionalKey(Schema.suspend((): Schema.Codec<Voice, unknown> => Voice)),
    caption: Schema.optionalKey(Schema.String),
    caption_entities: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<MessageEntity, unknown> => MessageEntity))),
    show_caption_above_media: Schema.optionalKey(Schema.Literal(true)),
    has_media_spoiler: Schema.optionalKey(Schema.Literal(true)),
    checklist: Schema.optionalKey(Schema.suspend((): Schema.Codec<Checklist, unknown> => Checklist)),
    contact: Schema.optionalKey(Schema.suspend((): Schema.Codec<Contact, unknown> => Contact)),
    dice: Schema.optionalKey(Schema.suspend((): Schema.Codec<Dice, unknown> => Dice)),
    game: Schema.optionalKey(Schema.suspend((): Schema.Codec<Game, unknown> => Game)),
    poll: Schema.optionalKey(Schema.suspend((): Schema.Codec<Poll, unknown> => Poll)),
    venue: Schema.optionalKey(Schema.suspend((): Schema.Codec<Venue, unknown> => Venue)),
    location: Schema.optionalKey(Schema.suspend((): Schema.Codec<Location, unknown> => Location)),
    new_chat_members: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<User, unknown> => User))),
    left_chat_member: Schema.optionalKey(Schema.suspend((): Schema.Codec<User, unknown> => User)),
    chat_owner_left: Schema.optionalKey(Schema.suspend((): Schema.Codec<ChatOwnerLeft, unknown> => ChatOwnerLeft)),
    chat_owner_changed: Schema.optionalKey(Schema.suspend((): Schema.Codec<ChatOwnerChanged, unknown> => ChatOwnerChanged)),
    new_chat_title: Schema.optionalKey(Schema.String),
    new_chat_photo: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<PhotoSize, unknown> => PhotoSize))),
    delete_chat_photo: Schema.optionalKey(Schema.Literal(true)),
    group_chat_created: Schema.optionalKey(Schema.Literal(true)),
    supergroup_chat_created: Schema.optionalKey(Schema.Literal(true)),
    channel_chat_created: Schema.optionalKey(Schema.Literal(true)),
    message_auto_delete_timer_changed: Schema.optionalKey(Schema.suspend((): Schema.Codec<MessageAutoDeleteTimerChanged, unknown> => MessageAutoDeleteTimerChanged)),
    migrate_to_chat_id: Schema.optionalKey(Schema.Int),
    migrate_from_chat_id: Schema.optionalKey(Schema.Int),
    pinned_message: Schema.optionalKey(Schema.suspend((): Schema.Codec<MaybeInaccessibleMessage, unknown> => MaybeInaccessibleMessage)),
    invoice: Schema.optionalKey(Schema.suspend((): Schema.Codec<Invoice, unknown> => Invoice)),
    successful_payment: Schema.optionalKey(Schema.suspend((): Schema.Codec<SuccessfulPayment, unknown> => SuccessfulPayment)),
    refunded_payment: Schema.optionalKey(Schema.suspend((): Schema.Codec<RefundedPayment, unknown> => RefundedPayment)),
    users_shared: Schema.optionalKey(Schema.suspend((): Schema.Codec<UsersShared, unknown> => UsersShared)),
    chat_shared: Schema.optionalKey(Schema.suspend((): Schema.Codec<ChatShared, unknown> => ChatShared)),
    gift: Schema.optionalKey(Schema.suspend((): Schema.Codec<GiftInfo, unknown> => GiftInfo)),
    unique_gift: Schema.optionalKey(Schema.suspend((): Schema.Codec<UniqueGiftInfo, unknown> => UniqueGiftInfo)),
    gift_upgrade_sent: Schema.optionalKey(Schema.suspend((): Schema.Codec<GiftInfo, unknown> => GiftInfo)),
    connected_website: Schema.optionalKey(Schema.String),
    write_access_allowed: Schema.optionalKey(Schema.suspend((): Schema.Codec<WriteAccessAllowed, unknown> => WriteAccessAllowed)),
    passport_data: Schema.optionalKey(Schema.suspend((): Schema.Codec<PassportData, unknown> => PassportData)),
    proximity_alert_triggered: Schema.optionalKey(Schema.suspend((): Schema.Codec<ProximityAlertTriggered, unknown> => ProximityAlertTriggered)),
    boost_added: Schema.optionalKey(Schema.suspend((): Schema.Codec<ChatBoostAdded, unknown> => ChatBoostAdded)),
    chat_background_set: Schema.optionalKey(Schema.suspend((): Schema.Codec<ChatBackground, unknown> => ChatBackground)),
    checklist_tasks_done: Schema.optionalKey(Schema.suspend((): Schema.Codec<ChecklistTasksDone, unknown> => ChecklistTasksDone)),
    checklist_tasks_added: Schema.optionalKey(Schema.suspend((): Schema.Codec<ChecklistTasksAdded, unknown> => ChecklistTasksAdded)),
    community_chat_added: Schema.optionalKey(Schema.suspend((): Schema.Codec<CommunityChatAdded, unknown> => CommunityChatAdded)),
    community_chat_joined: Schema.optionalKey(Schema.suspend((): Schema.Codec<CommunityChatJoined, unknown> => CommunityChatJoined)),
    community_chat_removed: Schema.optionalKey(Schema.suspend((): Schema.Codec<CommunityChatRemoved, unknown> => CommunityChatRemoved)),
    direct_message_price_changed: Schema.optionalKey(Schema.suspend((): Schema.Codec<DirectMessagePriceChanged, unknown> => DirectMessagePriceChanged)),
    forum_topic_created: Schema.optionalKey(Schema.suspend((): Schema.Codec<ForumTopicCreated, unknown> => ForumTopicCreated)),
    forum_topic_edited: Schema.optionalKey(Schema.suspend((): Schema.Codec<ForumTopicEdited, unknown> => ForumTopicEdited)),
    forum_topic_closed: Schema.optionalKey(Schema.suspend((): Schema.Codec<ForumTopicClosed, unknown> => ForumTopicClosed)),
    forum_topic_reopened: Schema.optionalKey(Schema.suspend((): Schema.Codec<ForumTopicReopened, unknown> => ForumTopicReopened)),
    general_forum_topic_hidden: Schema.optionalKey(Schema.suspend((): Schema.Codec<GeneralForumTopicHidden, unknown> => GeneralForumTopicHidden)),
    general_forum_topic_unhidden: Schema.optionalKey(Schema.suspend((): Schema.Codec<GeneralForumTopicUnhidden, unknown> => GeneralForumTopicUnhidden)),
    giveaway_created: Schema.optionalKey(Schema.suspend((): Schema.Codec<GiveawayCreated, unknown> => GiveawayCreated)),
    giveaway: Schema.optionalKey(Schema.suspend((): Schema.Codec<Giveaway, unknown> => Giveaway)),
    giveaway_winners: Schema.optionalKey(Schema.suspend((): Schema.Codec<GiveawayWinners, unknown> => GiveawayWinners)),
    giveaway_completed: Schema.optionalKey(Schema.suspend((): Schema.Codec<GiveawayCompleted, unknown> => GiveawayCompleted)),
    managed_bot_created: Schema.optionalKey(Schema.suspend((): Schema.Codec<ManagedBotCreated, unknown> => ManagedBotCreated)),
    paid_message_price_changed: Schema.optionalKey(Schema.suspend((): Schema.Codec<PaidMessagePriceChanged, unknown> => PaidMessagePriceChanged)),
    poll_option_added: Schema.optionalKey(Schema.suspend((): Schema.Codec<PollOptionAdded, unknown> => PollOptionAdded)),
    poll_option_deleted: Schema.optionalKey(Schema.suspend((): Schema.Codec<PollOptionDeleted, unknown> => PollOptionDeleted)),
    suggested_post_approved: Schema.optionalKey(Schema.suspend((): Schema.Codec<SuggestedPostApproved, unknown> => SuggestedPostApproved)),
    suggested_post_approval_failed: Schema.optionalKey(Schema.suspend((): Schema.Codec<SuggestedPostApprovalFailed, unknown> => SuggestedPostApprovalFailed)),
    suggested_post_declined: Schema.optionalKey(Schema.suspend((): Schema.Codec<SuggestedPostDeclined, unknown> => SuggestedPostDeclined)),
    suggested_post_paid: Schema.optionalKey(Schema.suspend((): Schema.Codec<SuggestedPostPaid, unknown> => SuggestedPostPaid)),
    suggested_post_refunded: Schema.optionalKey(Schema.suspend((): Schema.Codec<SuggestedPostRefunded, unknown> => SuggestedPostRefunded)),
    video_chat_scheduled: Schema.optionalKey(Schema.suspend((): Schema.Codec<VideoChatScheduled, unknown> => VideoChatScheduled)),
    video_chat_started: Schema.optionalKey(Schema.suspend((): Schema.Codec<VideoChatStarted, unknown> => VideoChatStarted)),
    video_chat_ended: Schema.optionalKey(Schema.suspend((): Schema.Codec<VideoChatEnded, unknown> => VideoChatEnded)),
    video_chat_participants_invited: Schema.optionalKey(Schema.suspend((): Schema.Codec<VideoChatParticipantsInvited, unknown> => VideoChatParticipantsInvited)),
    web_app_data: Schema.optionalKey(Schema.suspend((): Schema.Codec<WebAppData, unknown> => WebAppData)),
    reply_markup: Schema.optionalKey(Schema.suspend((): Schema.Codec<InlineKeyboardMarkup, unknown> => InlineKeyboardMarkup)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _MessageDecoded = Schema.declare<Message>((input): input is Message => Predicate.isObject(input));
export const Message: Schema.Codec<Message, unknown> = _MessageEncoded.pipe(
  Schema.decodeTo(_MessageDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_MessagePublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_MessageWireKeys)),
  }),
);

/** This object represents a service message about a change in auto-delete timer settings. */
export interface MessageAutoDeleteTimerChanged {
  /** New auto-delete time for messages in the chat; in seconds */
  readonly messageAutoDeleteTime: number;
  readonly [key: string]: unknown;
}
const _MessageAutoDeleteTimerChangedPublicKeys = { message_auto_delete_time: "messageAutoDeleteTime" } as const;
const _MessageAutoDeleteTimerChangedWireKeys = invertKeys(_MessageAutoDeleteTimerChangedPublicKeys);
const _MessageAutoDeleteTimerChangedEncoded = Schema.StructWithRest(
  Schema.Struct({
    message_auto_delete_time: Schema.Int,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _MessageAutoDeleteTimerChangedDecoded = Schema.declare<MessageAutoDeleteTimerChanged>((input): input is MessageAutoDeleteTimerChanged => Predicate.isObject(input));
export const MessageAutoDeleteTimerChanged: Schema.Codec<MessageAutoDeleteTimerChanged, unknown> = _MessageAutoDeleteTimerChangedEncoded.pipe(
  Schema.decodeTo(_MessageAutoDeleteTimerChangedDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_MessageAutoDeleteTimerChangedPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_MessageAutoDeleteTimerChangedWireKeys)),
  }),
);

/** This object represents one special entity in a text message. For example, hashtags, usernames, URLs, etc. */
export interface MessageEntity {
  /** Type of the entity. Currently, can be “mention” (@username), “hashtag” (#hashtag or #hashtag@chatusername), “cashtag” ($USD or $USD@chatusername), “bot_command” (/start@jobs_bot), “url” (https://telegram.org), “email” (do-not-reply@telegram.org), “phone_number” (+1-212-555-0123), “bold” (bold text), “italic” (italic text), “underline” (underlined text), “strikethrough” (strikethrough text), “spoiler” (spoiler message), “blockquote” (block quotation), “expandable_blockquote” (collapsed-by-default block quotation), “code” (monowidth string), “pre” (monowidth block), “text_link” (for clickable text URLs), “text_mention” (for users without usernames), “custom_emoji” (for inline custom emoji stickers), or “date_time” (for formatted date and time). */
  readonly type: MessageEntityType;
  /** Offset in UTF-16 code units to the start of the entity */
  readonly offset: number;
  /** Length of the entity in UTF-16 code units */
  readonly length: number;
  /** Optional. For “text_link” only, URL that will be opened after user taps on the text */
  readonly url?: string;
  /** Optional. For “text_mention” only, the mentioned user */
  readonly user?: User;
  /** Optional. For “pre” only, the programming language of the entity text */
  readonly language?: string;
  /** Optional. For “custom_emoji” only, unique identifier of the custom emoji. Use getCustomEmojiStickers to get full information about the sticker. */
  readonly customEmojiId?: string;
  /** Optional. For “date_time” only, the Unix time associated with the entity */
  readonly unixTime?: number;
  /** Optional. For “date_time” only, the string that defines the formatting of the date and time. See date-time entity formatting for more details. */
  readonly dateTimeFormat?: string;
  readonly [key: string]: unknown;
}
const _MessageEntityPublicKeys = { custom_emoji_id: "customEmojiId", unix_time: "unixTime", date_time_format: "dateTimeFormat" } as const;
const _MessageEntityWireKeys = invertKeys(_MessageEntityPublicKeys);
const _MessageEntityEncoded = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.suspend((): Schema.Codec<MessageEntityType, unknown> => MessageEntityType),
    offset: Schema.Int,
    length: Schema.Int,
    url: Schema.optionalKey(Schema.String),
    user: Schema.optionalKey(Schema.suspend((): Schema.Codec<User, unknown> => User)),
    language: Schema.optionalKey(Schema.String),
    custom_emoji_id: Schema.optionalKey(Schema.String),
    unix_time: Schema.optionalKey(Schema.Int),
    date_time_format: Schema.optionalKey(Schema.String),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _MessageEntityDecoded = Schema.declare<MessageEntity>((input): input is MessageEntity => Predicate.isObject(input));
export const MessageEntity: Schema.Codec<MessageEntity, unknown> = _MessageEntityEncoded.pipe(
  Schema.decodeTo(_MessageEntityDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_MessageEntityPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_MessageEntityWireKeys)),
  }),
);

/** This object describes an update about a user stopping message generation. */
export interface MessageGenerationStopped {
  /** Chat in which the message is generated */
  readonly chat: Chat;
  /** Optional. Unique identifier of the message thread in which the message is generated */
  readonly messageThreadId?: number;
  /** Unique identifier of the message draft which was stopped */
  readonly draftId: number;
  readonly [key: string]: unknown;
}
const _MessageGenerationStoppedPublicKeys = { message_thread_id: "messageThreadId", draft_id: "draftId" } as const;
const _MessageGenerationStoppedWireKeys = invertKeys(_MessageGenerationStoppedPublicKeys);
const _MessageGenerationStoppedEncoded = Schema.StructWithRest(
  Schema.Struct({
    chat: Schema.suspend((): Schema.Codec<Chat, unknown> => Chat),
    message_thread_id: Schema.optionalKey(Schema.Int),
    draft_id: Schema.Int,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _MessageGenerationStoppedDecoded = Schema.declare<MessageGenerationStopped>((input): input is MessageGenerationStopped => Predicate.isObject(input));
export const MessageGenerationStopped: Schema.Codec<MessageGenerationStopped, unknown> = _MessageGenerationStoppedEncoded.pipe(
  Schema.decodeTo(_MessageGenerationStoppedDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_MessageGenerationStoppedPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_MessageGenerationStoppedWireKeys)),
  }),
);

/** This object represents a unique message identifier. */
export interface MessageId {
  /** Unique message identifier. In specific instances (e.g., message containing a video sent to a big chat), the server might automatically schedule a message instead of sending it immediately. In such cases, this field will be 0 and the relevant message will be unusable until it is actually sent. */
  readonly messageId: number;
  readonly [key: string]: unknown;
}
const _MessageIdPublicKeys = { message_id: "messageId" } as const;
const _MessageIdWireKeys = invertKeys(_MessageIdPublicKeys);
const _MessageIdEncoded = Schema.StructWithRest(
  Schema.Struct({
    message_id: Schema.Int,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _MessageIdDecoded = Schema.declare<MessageId>((input): input is MessageId => Predicate.isObject(input));
export const MessageId: Schema.Codec<MessageId, unknown> = _MessageIdEncoded.pipe(
  Schema.decodeTo(_MessageIdDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_MessageIdPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_MessageIdWireKeys)),
  }),
);

/** This object describes the origin of a message. It can be one of */
export type MessageOrigin = MessageOriginUser | MessageOriginHiddenUser | MessageOriginChat | MessageOriginChannel;
export const MessageOrigin: Schema.Codec<MessageOrigin, unknown> = Schema.Union([Schema.suspend((): Schema.Codec<MessageOriginUser, unknown> => MessageOriginUser), Schema.suspend((): Schema.Codec<MessageOriginHiddenUser, unknown> => MessageOriginHiddenUser), Schema.suspend((): Schema.Codec<MessageOriginChat, unknown> => MessageOriginChat), Schema.suspend((): Schema.Codec<MessageOriginChannel, unknown> => MessageOriginChannel)]);

/** The message was originally sent to a channel chat. */
export interface MessageOriginChannel {
  /** Type of the message origin, always “channel” */
  readonly type: "channel";
  /** Date the message was sent originally in Unix time */
  readonly date: number;
  /** Channel chat to which the message was originally sent */
  readonly chat: Chat;
  /** Unique message identifier inside the chat */
  readonly messageId: number;
  /** Optional. Signature of the original post author */
  readonly authorSignature?: string;
  readonly [key: string]: unknown;
}
const _MessageOriginChannelPublicKeys = { message_id: "messageId", author_signature: "authorSignature" } as const;
const _MessageOriginChannelWireKeys = invertKeys(_MessageOriginChannelPublicKeys);
const _MessageOriginChannelEncoded = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("channel"),
    date: Schema.Int,
    chat: Schema.suspend((): Schema.Codec<Chat, unknown> => Chat),
    message_id: Schema.Int,
    author_signature: Schema.optionalKey(Schema.String),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _MessageOriginChannelDecoded = Schema.declare<MessageOriginChannel>((input): input is MessageOriginChannel => Predicate.isObject(input));
export const MessageOriginChannel: Schema.Codec<MessageOriginChannel, unknown> = _MessageOriginChannelEncoded.pipe(
  Schema.decodeTo(_MessageOriginChannelDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_MessageOriginChannelPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_MessageOriginChannelWireKeys)),
  }),
);

/** The message was originally sent on behalf of a chat to a group chat. */
export interface MessageOriginChat {
  /** Type of the message origin, always “chat” */
  readonly type: "chat";
  /** Date the message was sent originally in Unix time */
  readonly date: number;
  /** Chat that sent the message originally */
  readonly senderChat: Chat;
  /** Optional. For messages originally sent by an anonymous chat administrator, original message author signature */
  readonly authorSignature?: string;
  readonly [key: string]: unknown;
}
const _MessageOriginChatPublicKeys = { sender_chat: "senderChat", author_signature: "authorSignature" } as const;
const _MessageOriginChatWireKeys = invertKeys(_MessageOriginChatPublicKeys);
const _MessageOriginChatEncoded = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("chat"),
    date: Schema.Int,
    sender_chat: Schema.suspend((): Schema.Codec<Chat, unknown> => Chat),
    author_signature: Schema.optionalKey(Schema.String),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _MessageOriginChatDecoded = Schema.declare<MessageOriginChat>((input): input is MessageOriginChat => Predicate.isObject(input));
export const MessageOriginChat: Schema.Codec<MessageOriginChat, unknown> = _MessageOriginChatEncoded.pipe(
  Schema.decodeTo(_MessageOriginChatDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_MessageOriginChatPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_MessageOriginChatWireKeys)),
  }),
);

/** The message was originally sent by an unknown user. */
export interface MessageOriginHiddenUser {
  /** Type of the message origin, always “hidden_user” */
  readonly type: "hidden_user";
  /** Date the message was sent originally in Unix time */
  readonly date: number;
  /** Name of the user that sent the message originally */
  readonly senderUserName: string;
  readonly [key: string]: unknown;
}
const _MessageOriginHiddenUserPublicKeys = { sender_user_name: "senderUserName" } as const;
const _MessageOriginHiddenUserWireKeys = invertKeys(_MessageOriginHiddenUserPublicKeys);
const _MessageOriginHiddenUserEncoded = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("hidden_user"),
    date: Schema.Int,
    sender_user_name: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _MessageOriginHiddenUserDecoded = Schema.declare<MessageOriginHiddenUser>((input): input is MessageOriginHiddenUser => Predicate.isObject(input));
export const MessageOriginHiddenUser: Schema.Codec<MessageOriginHiddenUser, unknown> = _MessageOriginHiddenUserEncoded.pipe(
  Schema.decodeTo(_MessageOriginHiddenUserDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_MessageOriginHiddenUserPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_MessageOriginHiddenUserWireKeys)),
  }),
);

/** The message was originally sent by a known user. */
export interface MessageOriginUser {
  /** Type of the message origin, always “user” */
  readonly type: "user";
  /** Date the message was sent originally in Unix time */
  readonly date: number;
  /** User that sent the message originally */
  readonly senderUser: User;
  readonly [key: string]: unknown;
}
const _MessageOriginUserPublicKeys = { sender_user: "senderUser" } as const;
const _MessageOriginUserWireKeys = invertKeys(_MessageOriginUserPublicKeys);
const _MessageOriginUserEncoded = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("user"),
    date: Schema.Int,
    sender_user: Schema.suspend((): Schema.Codec<User, unknown> => User),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _MessageOriginUserDecoded = Schema.declare<MessageOriginUser>((input): input is MessageOriginUser => Predicate.isObject(input));
export const MessageOriginUser: Schema.Codec<MessageOriginUser, unknown> = _MessageOriginUserEncoded.pipe(
  Schema.decodeTo(_MessageOriginUserDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_MessageOriginUserPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_MessageOriginUserWireKeys)),
  }),
);

/** This object represents reaction changes on a message with anonymous reactions. */
export interface MessageReactionCountUpdated {
  /** The chat containing the message */
  readonly chat: Chat;
  /** Unique message identifier inside the chat */
  readonly messageId: number;
  /** Date of the change in Unix time */
  readonly date: number;
  /** List of reactions that are present on the message */
  readonly reactions: ReadonlyArray<ReactionCount>;
  readonly [key: string]: unknown;
}
const _MessageReactionCountUpdatedPublicKeys = { message_id: "messageId" } as const;
const _MessageReactionCountUpdatedWireKeys = invertKeys(_MessageReactionCountUpdatedPublicKeys);
const _MessageReactionCountUpdatedEncoded = Schema.StructWithRest(
  Schema.Struct({
    chat: Schema.suspend((): Schema.Codec<Chat, unknown> => Chat),
    message_id: Schema.Int,
    date: Schema.Int,
    reactions: Schema.Array(Schema.suspend((): Schema.Codec<ReactionCount, unknown> => ReactionCount)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _MessageReactionCountUpdatedDecoded = Schema.declare<MessageReactionCountUpdated>((input): input is MessageReactionCountUpdated => Predicate.isObject(input));
export const MessageReactionCountUpdated: Schema.Codec<MessageReactionCountUpdated, unknown> = _MessageReactionCountUpdatedEncoded.pipe(
  Schema.decodeTo(_MessageReactionCountUpdatedDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_MessageReactionCountUpdatedPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_MessageReactionCountUpdatedWireKeys)),
  }),
);

/** This object represents a change of a reaction on a message performed by a user. */
export interface MessageReactionUpdated {
  /** The chat containing the message the user reacted to */
  readonly chat: Chat;
  /** Unique identifier of the message inside the chat */
  readonly messageId: number;
  /** Optional. The user that changed the reaction, if the user isn't anonymous */
  readonly user?: User;
  /** Optional. The chat on behalf of which the reaction was changed, if the user is anonymous */
  readonly actorChat?: Chat;
  /** Date of the change in Unix time */
  readonly date: number;
  /** Previous list of reaction types that were set by the user */
  readonly oldReaction: ReadonlyArray<ReactionType>;
  /** New list of reaction types that have been set by the user */
  readonly newReaction: ReadonlyArray<ReactionType>;
  readonly [key: string]: unknown;
}
const _MessageReactionUpdatedPublicKeys = { message_id: "messageId", actor_chat: "actorChat", old_reaction: "oldReaction", new_reaction: "newReaction" } as const;
const _MessageReactionUpdatedWireKeys = invertKeys(_MessageReactionUpdatedPublicKeys);
const _MessageReactionUpdatedEncoded = Schema.StructWithRest(
  Schema.Struct({
    chat: Schema.suspend((): Schema.Codec<Chat, unknown> => Chat),
    message_id: Schema.Int,
    user: Schema.optionalKey(Schema.suspend((): Schema.Codec<User, unknown> => User)),
    actor_chat: Schema.optionalKey(Schema.suspend((): Schema.Codec<Chat, unknown> => Chat)),
    date: Schema.Int,
    old_reaction: Schema.Array(Schema.suspend((): Schema.Codec<ReactionType, unknown> => ReactionType)),
    new_reaction: Schema.Array(Schema.suspend((): Schema.Codec<ReactionType, unknown> => ReactionType)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _MessageReactionUpdatedDecoded = Schema.declare<MessageReactionUpdated>((input): input is MessageReactionUpdated => Predicate.isObject(input));
export const MessageReactionUpdated: Schema.Codec<MessageReactionUpdated, unknown> = _MessageReactionUpdatedEncoded.pipe(
  Schema.decodeTo(_MessageReactionUpdatedDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_MessageReactionUpdatedPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_MessageReactionUpdatedWireKeys)),
  }),
);

/** This object represents information about an order. */
export interface OrderInfo {
  /** Optional. User name */
  readonly name?: string;
  /** Optional. User's phone number */
  readonly phoneNumber?: string;
  /** Optional. User email */
  readonly email?: string;
  /** Optional. User shipping address */
  readonly shippingAddress?: ShippingAddress;
  readonly [key: string]: unknown;
}
const _OrderInfoPublicKeys = { phone_number: "phoneNumber", shipping_address: "shippingAddress" } as const;
const _OrderInfoWireKeys = invertKeys(_OrderInfoPublicKeys);
const _OrderInfoEncoded = Schema.StructWithRest(
  Schema.Struct({
    name: Schema.optionalKey(Schema.String),
    phone_number: Schema.optionalKey(Schema.String),
    email: Schema.optionalKey(Schema.String),
    shipping_address: Schema.optionalKey(Schema.suspend((): Schema.Codec<ShippingAddress, unknown> => ShippingAddress)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _OrderInfoDecoded = Schema.declare<OrderInfo>((input): input is OrderInfo => Predicate.isObject(input));
export const OrderInfo: Schema.Codec<OrderInfo, unknown> = _OrderInfoEncoded.pipe(
  Schema.decodeTo(_OrderInfoDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_OrderInfoPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_OrderInfoWireKeys)),
  }),
);

/** This object describes a gift received and owned by a user or a chat. Currently, it can be one of */
export type OwnedGift = OwnedGiftRegular | OwnedGiftUnique;
export const OwnedGift: Schema.Codec<OwnedGift, unknown> = Schema.Union([Schema.suspend((): Schema.Codec<OwnedGiftRegular, unknown> => OwnedGiftRegular), Schema.suspend((): Schema.Codec<OwnedGiftUnique, unknown> => OwnedGiftUnique)]);

/** Describes a regular gift owned by a user or a chat. */
export interface OwnedGiftRegular {
  /** Type of the gift, always “regular” */
  readonly type: "regular";
  /** Information about the regular gift */
  readonly gift: Gift;
  /** Optional. Unique identifier of the gift for the bot; for gifts received on behalf of business accounts only */
  readonly ownedGiftId?: string;
  /** Optional. Sender of the gift if it is a known user */
  readonly senderUser?: User;
  /** Date the gift was sent in Unix time */
  readonly sendDate: number;
  /** Optional. Text of the message that was added to the gift */
  readonly text?: string;
  /** Optional. Special entities that appear in the text */
  readonly entities?: ReadonlyArray<MessageEntity>;
  /** Optional. True, if the sender and gift text are shown only to the gift receiver; otherwise, everyone will be able to see them */
  readonly isPrivate?: true;
  /** Optional. True, if the gift is displayed on the account's profile page; for gifts received on behalf of business accounts only */
  readonly isSaved?: true;
  /** Optional. True, if the gift can be upgraded to a unique gift; for gifts received on behalf of business accounts only */
  readonly canBeUpgraded?: true;
  /** Optional. True, if the gift was refunded and isn't available anymore */
  readonly wasRefunded?: true;
  /** Optional. Number of Telegram Stars that can be claimed by the receiver instead of the gift; omitted if the gift cannot be converted to Telegram Stars; for gifts received on behalf of business accounts only */
  readonly convertStarCount?: number;
  /** Optional. Number of Telegram Stars that were paid for the ability to upgrade the gift */
  readonly prepaidUpgradeStarCount?: number;
  /** Optional. True, if the gift's upgrade was purchased after the gift was sent; for gifts received on behalf of business accounts only */
  readonly isUpgradeSeparate?: true;
  /** Optional. Unique number reserved for this gift when upgraded. See the number field in UniqueGift. */
  readonly uniqueGiftNumber?: number;
  readonly [key: string]: unknown;
}
const _OwnedGiftRegularPublicKeys = { owned_gift_id: "ownedGiftId", sender_user: "senderUser", send_date: "sendDate", is_private: "isPrivate", is_saved: "isSaved", can_be_upgraded: "canBeUpgraded", was_refunded: "wasRefunded", convert_star_count: "convertStarCount", prepaid_upgrade_star_count: "prepaidUpgradeStarCount", is_upgrade_separate: "isUpgradeSeparate", unique_gift_number: "uniqueGiftNumber" } as const;
const _OwnedGiftRegularWireKeys = invertKeys(_OwnedGiftRegularPublicKeys);
const _OwnedGiftRegularEncoded = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("regular"),
    gift: Schema.suspend((): Schema.Codec<Gift, unknown> => Gift),
    owned_gift_id: Schema.optionalKey(Schema.String),
    sender_user: Schema.optionalKey(Schema.suspend((): Schema.Codec<User, unknown> => User)),
    send_date: Schema.Int,
    text: Schema.optionalKey(Schema.String),
    entities: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<MessageEntity, unknown> => MessageEntity))),
    is_private: Schema.optionalKey(Schema.Literal(true)),
    is_saved: Schema.optionalKey(Schema.Literal(true)),
    can_be_upgraded: Schema.optionalKey(Schema.Literal(true)),
    was_refunded: Schema.optionalKey(Schema.Literal(true)),
    convert_star_count: Schema.optionalKey(Schema.Int),
    prepaid_upgrade_star_count: Schema.optionalKey(Schema.Int),
    is_upgrade_separate: Schema.optionalKey(Schema.Literal(true)),
    unique_gift_number: Schema.optionalKey(Schema.Int),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _OwnedGiftRegularDecoded = Schema.declare<OwnedGiftRegular>((input): input is OwnedGiftRegular => Predicate.isObject(input));
export const OwnedGiftRegular: Schema.Codec<OwnedGiftRegular, unknown> = _OwnedGiftRegularEncoded.pipe(
  Schema.decodeTo(_OwnedGiftRegularDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_OwnedGiftRegularPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_OwnedGiftRegularWireKeys)),
  }),
);

/** Contains the list of gifts received and owned by a user or a chat. */
export interface OwnedGifts {
  /** The total number of gifts owned by the user or the chat */
  readonly totalCount: number;
  /** The list of gifts */
  readonly gifts: ReadonlyArray<OwnedGift>;
  /** Optional. Offset for the next request. If empty, then there are no more results. */
  readonly nextOffset?: string;
  readonly [key: string]: unknown;
}
const _OwnedGiftsPublicKeys = { total_count: "totalCount", next_offset: "nextOffset" } as const;
const _OwnedGiftsWireKeys = invertKeys(_OwnedGiftsPublicKeys);
const _OwnedGiftsEncoded = Schema.StructWithRest(
  Schema.Struct({
    total_count: Schema.Int,
    gifts: Schema.Array(Schema.suspend((): Schema.Codec<OwnedGift, unknown> => OwnedGift)),
    next_offset: Schema.optionalKey(Schema.String),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _OwnedGiftsDecoded = Schema.declare<OwnedGifts>((input): input is OwnedGifts => Predicate.isObject(input));
export const OwnedGifts: Schema.Codec<OwnedGifts, unknown> = _OwnedGiftsEncoded.pipe(
  Schema.decodeTo(_OwnedGiftsDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_OwnedGiftsPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_OwnedGiftsWireKeys)),
  }),
);

/** Describes a unique gift received and owned by a user or a chat. */
export interface OwnedGiftUnique {
  /** Type of the gift, always “unique” */
  readonly type: "unique";
  /** Information about the unique gift */
  readonly gift: UniqueGift;
  /** Optional. Unique identifier of the received gift for the bot; for gifts received on behalf of business accounts only */
  readonly ownedGiftId?: string;
  /** Optional. Sender of the gift if it is a known user */
  readonly senderUser?: User;
  /** Date the gift was sent in Unix time */
  readonly sendDate: number;
  /** Optional. True, if the gift is displayed on the account's profile page; for gifts received on behalf of business accounts only */
  readonly isSaved?: true;
  /** Optional. True, if the gift can be transferred to another owner; for gifts received on behalf of business accounts only */
  readonly canBeTransferred?: true;
  /** Optional. Number of Telegram Stars that must be paid to transfer the gift; omitted if the bot cannot transfer the gift */
  readonly transferStarCount?: number;
  /** Optional. Point in time (Unix timestamp) when the gift can be transferred. If it is in the past, then the gift can be transferred now. */
  readonly nextTransferDate?: number;
  readonly [key: string]: unknown;
}
const _OwnedGiftUniquePublicKeys = { owned_gift_id: "ownedGiftId", sender_user: "senderUser", send_date: "sendDate", is_saved: "isSaved", can_be_transferred: "canBeTransferred", transfer_star_count: "transferStarCount", next_transfer_date: "nextTransferDate" } as const;
const _OwnedGiftUniqueWireKeys = invertKeys(_OwnedGiftUniquePublicKeys);
const _OwnedGiftUniqueEncoded = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("unique"),
    gift: Schema.suspend((): Schema.Codec<UniqueGift, unknown> => UniqueGift),
    owned_gift_id: Schema.optionalKey(Schema.String),
    sender_user: Schema.optionalKey(Schema.suspend((): Schema.Codec<User, unknown> => User)),
    send_date: Schema.Int,
    is_saved: Schema.optionalKey(Schema.Literal(true)),
    can_be_transferred: Schema.optionalKey(Schema.Literal(true)),
    transfer_star_count: Schema.optionalKey(Schema.Int),
    next_transfer_date: Schema.optionalKey(Schema.Int),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _OwnedGiftUniqueDecoded = Schema.declare<OwnedGiftUnique>((input): input is OwnedGiftUnique => Predicate.isObject(input));
export const OwnedGiftUnique: Schema.Codec<OwnedGiftUnique, unknown> = _OwnedGiftUniqueEncoded.pipe(
  Schema.decodeTo(_OwnedGiftUniqueDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_OwnedGiftUniquePublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_OwnedGiftUniqueWireKeys)),
  }),
);

/** This object describes paid media. Currently, it can be one of */
export type PaidMedia = PaidMediaLivePhoto | PaidMediaPhoto | PaidMediaPreview | PaidMediaVideo;
export const PaidMedia: Schema.Codec<PaidMedia, unknown> = Schema.Union([Schema.suspend((): Schema.Codec<PaidMediaLivePhoto, unknown> => PaidMediaLivePhoto), Schema.suspend((): Schema.Codec<PaidMediaPhoto, unknown> => PaidMediaPhoto), Schema.suspend((): Schema.Codec<PaidMediaPreview, unknown> => PaidMediaPreview), Schema.suspend((): Schema.Codec<PaidMediaVideo, unknown> => PaidMediaVideo)]);

/** Describes the paid media added to a message. */
export interface PaidMediaInfo {
  /** The number of Telegram Stars that must be paid to buy access to the media */
  readonly starCount: number;
  /** Information about the paid media */
  readonly paidMedia: ReadonlyArray<PaidMedia>;
  readonly [key: string]: unknown;
}
const _PaidMediaInfoPublicKeys = { star_count: "starCount", paid_media: "paidMedia" } as const;
const _PaidMediaInfoWireKeys = invertKeys(_PaidMediaInfoPublicKeys);
const _PaidMediaInfoEncoded = Schema.StructWithRest(
  Schema.Struct({
    star_count: Schema.Int,
    paid_media: Schema.Array(Schema.suspend((): Schema.Codec<PaidMedia, unknown> => PaidMedia)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _PaidMediaInfoDecoded = Schema.declare<PaidMediaInfo>((input): input is PaidMediaInfo => Predicate.isObject(input));
export const PaidMediaInfo: Schema.Codec<PaidMediaInfo, unknown> = _PaidMediaInfoEncoded.pipe(
  Schema.decodeTo(_PaidMediaInfoDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_PaidMediaInfoPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_PaidMediaInfoWireKeys)),
  }),
);

/** The paid media is a live photo. */
export interface PaidMediaLivePhoto {
  /** Type of the paid media, always “live_photo” */
  readonly type: "live_photo";
  /** The photo */
  readonly livePhoto: LivePhoto;
  readonly [key: string]: unknown;
}
const _PaidMediaLivePhotoPublicKeys = { live_photo: "livePhoto" } as const;
const _PaidMediaLivePhotoWireKeys = invertKeys(_PaidMediaLivePhotoPublicKeys);
const _PaidMediaLivePhotoEncoded = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("live_photo"),
    live_photo: Schema.suspend((): Schema.Codec<LivePhoto, unknown> => LivePhoto),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _PaidMediaLivePhotoDecoded = Schema.declare<PaidMediaLivePhoto>((input): input is PaidMediaLivePhoto => Predicate.isObject(input));
export const PaidMediaLivePhoto: Schema.Codec<PaidMediaLivePhoto, unknown> = _PaidMediaLivePhotoEncoded.pipe(
  Schema.decodeTo(_PaidMediaLivePhotoDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_PaidMediaLivePhotoPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_PaidMediaLivePhotoWireKeys)),
  }),
);

/** The paid media is a photo. */
export interface PaidMediaPhoto {
  /** Type of the paid media, always “photo” */
  readonly type: "photo";
  /** The photo */
  readonly photo: ReadonlyArray<PhotoSize>;
  readonly [key: string]: unknown;
}
export const PaidMediaPhoto: Schema.Codec<PaidMediaPhoto, unknown> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("photo"),
    photo: Schema.Array(Schema.suspend((): Schema.Codec<PhotoSize, unknown> => PhotoSize)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** The paid media isn't available before the payment. */
export interface PaidMediaPreview {
  /** Type of the paid media, always “preview” */
  readonly type: "preview";
  /** Optional. Media width as defined by the sender */
  readonly width?: number;
  /** Optional. Media height as defined by the sender */
  readonly height?: number;
  /** Optional. Duration of the media in seconds as defined by the sender */
  readonly duration?: number;
  readonly [key: string]: unknown;
}
export const PaidMediaPreview: Schema.Codec<PaidMediaPreview, unknown> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("preview"),
    width: Schema.optionalKey(Schema.Int),
    height: Schema.optionalKey(Schema.Int),
    duration: Schema.optionalKey(Schema.Int),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object contains information about a paid media purchase. */
export interface PaidMediaPurchased {
  /** User who purchased the media */
  readonly from: User;
  /** Bot-specified paid media payload */
  readonly paidMediaPayload: string;
  readonly [key: string]: unknown;
}
const _PaidMediaPurchasedPublicKeys = { paid_media_payload: "paidMediaPayload" } as const;
const _PaidMediaPurchasedWireKeys = invertKeys(_PaidMediaPurchasedPublicKeys);
const _PaidMediaPurchasedEncoded = Schema.StructWithRest(
  Schema.Struct({
    from: Schema.suspend((): Schema.Codec<User, unknown> => User),
    paid_media_payload: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _PaidMediaPurchasedDecoded = Schema.declare<PaidMediaPurchased>((input): input is PaidMediaPurchased => Predicate.isObject(input));
export const PaidMediaPurchased: Schema.Codec<PaidMediaPurchased, unknown> = _PaidMediaPurchasedEncoded.pipe(
  Schema.decodeTo(_PaidMediaPurchasedDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_PaidMediaPurchasedPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_PaidMediaPurchasedWireKeys)),
  }),
);

/** The paid media is a video. */
export interface PaidMediaVideo {
  /** Type of the paid media, always “video” */
  readonly type: "video";
  /** The video */
  readonly video: Video;
  readonly [key: string]: unknown;
}
export const PaidMediaVideo: Schema.Codec<PaidMediaVideo, unknown> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("video"),
    video: Schema.suspend((): Schema.Codec<Video, unknown> => Video),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Describes a service message about a change in the price of paid messages within a chat. */
export interface PaidMessagePriceChanged {
  /** The new number of Telegram Stars that must be paid by non-administrator users of the supergroup chat for each sent message */
  readonly paidMessageStarCount: number;
  readonly [key: string]: unknown;
}
const _PaidMessagePriceChangedPublicKeys = { paid_message_star_count: "paidMessageStarCount" } as const;
const _PaidMessagePriceChangedWireKeys = invertKeys(_PaidMessagePriceChangedPublicKeys);
const _PaidMessagePriceChangedEncoded = Schema.StructWithRest(
  Schema.Struct({
    paid_message_star_count: Schema.Int,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _PaidMessagePriceChangedDecoded = Schema.declare<PaidMessagePriceChanged>((input): input is PaidMessagePriceChanged => Predicate.isObject(input));
export const PaidMessagePriceChanged: Schema.Codec<PaidMessagePriceChanged, unknown> = _PaidMessagePriceChangedEncoded.pipe(
  Schema.decodeTo(_PaidMessagePriceChangedDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_PaidMessagePriceChangedPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_PaidMessagePriceChangedWireKeys)),
  }),
);

/** Describes Telegram Passport data shared with the bot by the user. */
export interface PassportData {
  /** Array with information about documents and other Telegram Passport elements that was shared with the bot */
  readonly data: ReadonlyArray<EncryptedPassportElement>;
  /** Encrypted credentials required to decrypt the data */
  readonly credentials: EncryptedCredentials;
  readonly [key: string]: unknown;
}
export const PassportData: Schema.Codec<PassportData, unknown> = Schema.StructWithRest(
  Schema.Struct({
    data: Schema.Array(Schema.suspend((): Schema.Codec<EncryptedPassportElement, unknown> => EncryptedPassportElement)),
    credentials: Schema.suspend((): Schema.Codec<EncryptedCredentials, unknown> => EncryptedCredentials),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object represents an error in the Telegram Passport element which was submitted that should be resolved by the user. It should be one of: */
export type PassportElementError = PassportElementErrorDataField | PassportElementErrorFrontSide | PassportElementErrorReverseSide | PassportElementErrorSelfie | PassportElementErrorFile | PassportElementErrorFiles | PassportElementErrorTranslationFile | PassportElementErrorTranslationFiles | PassportElementErrorUnspecified;
export const PassportElementError: Schema.Codec<PassportElementError, unknown> = Schema.Union([Schema.suspend((): Schema.Codec<PassportElementErrorDataField, unknown> => PassportElementErrorDataField), Schema.suspend((): Schema.Codec<PassportElementErrorFrontSide, unknown> => PassportElementErrorFrontSide), Schema.suspend((): Schema.Codec<PassportElementErrorReverseSide, unknown> => PassportElementErrorReverseSide), Schema.suspend((): Schema.Codec<PassportElementErrorSelfie, unknown> => PassportElementErrorSelfie), Schema.suspend((): Schema.Codec<PassportElementErrorFile, unknown> => PassportElementErrorFile), Schema.suspend((): Schema.Codec<PassportElementErrorFiles, unknown> => PassportElementErrorFiles), Schema.suspend((): Schema.Codec<PassportElementErrorTranslationFile, unknown> => PassportElementErrorTranslationFile), Schema.suspend((): Schema.Codec<PassportElementErrorTranslationFiles, unknown> => PassportElementErrorTranslationFiles), Schema.suspend((): Schema.Codec<PassportElementErrorUnspecified, unknown> => PassportElementErrorUnspecified)]);

/** Represents an issue in one of the data fields that was provided by the user. The error is considered resolved when the field's value changes. */
export interface PassportElementErrorDataField {
  /** Error source, must be data */
  readonly source: "data";
  /** The section of the user's Telegram Passport which has the error, one of “personal_details”, “passport”, “driver_license”, “identity_card”, “internal_passport”, “address” */
  readonly type: string;
  /** Name of the data field which has the error */
  readonly fieldName: string;
  /** Base64-encoded data hash */
  readonly dataHash: string;
  /** Error message */
  readonly message: string;
  readonly [key: string]: unknown;
}
const _PassportElementErrorDataFieldPublicKeys = { field_name: "fieldName", data_hash: "dataHash" } as const;
const _PassportElementErrorDataFieldWireKeys = invertKeys(_PassportElementErrorDataFieldPublicKeys);
const _PassportElementErrorDataFieldEncoded = Schema.StructWithRest(
  Schema.Struct({
    source: Schema.Literal("data"),
    type: Schema.String,
    field_name: Schema.String,
    data_hash: Schema.String,
    message: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _PassportElementErrorDataFieldDecoded = Schema.declare<PassportElementErrorDataField>((input): input is PassportElementErrorDataField => Predicate.isObject(input));
export const PassportElementErrorDataField: Schema.Codec<PassportElementErrorDataField, unknown> = _PassportElementErrorDataFieldEncoded.pipe(
  Schema.decodeTo(_PassportElementErrorDataFieldDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_PassportElementErrorDataFieldPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_PassportElementErrorDataFieldWireKeys)),
  }),
);

/** Represents an issue with a document scan. The error is considered resolved when the file with the document scan changes. */
export interface PassportElementErrorFile {
  /** Error source, must be file */
  readonly source: "file";
  /** The section of the user's Telegram Passport which has the issue, one of “utility_bill”, “bank_statement”, “rental_agreement”, “passport_registration”, “temporary_registration” */
  readonly type: string;
  /** Base64-encoded file hash */
  readonly fileHash: string;
  /** Error message */
  readonly message: string;
  readonly [key: string]: unknown;
}
const _PassportElementErrorFilePublicKeys = { file_hash: "fileHash" } as const;
const _PassportElementErrorFileWireKeys = invertKeys(_PassportElementErrorFilePublicKeys);
const _PassportElementErrorFileEncoded = Schema.StructWithRest(
  Schema.Struct({
    source: Schema.Literal("file"),
    type: Schema.String,
    file_hash: Schema.String,
    message: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _PassportElementErrorFileDecoded = Schema.declare<PassportElementErrorFile>((input): input is PassportElementErrorFile => Predicate.isObject(input));
export const PassportElementErrorFile: Schema.Codec<PassportElementErrorFile, unknown> = _PassportElementErrorFileEncoded.pipe(
  Schema.decodeTo(_PassportElementErrorFileDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_PassportElementErrorFilePublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_PassportElementErrorFileWireKeys)),
  }),
);

/** Represents an issue with a list of scans. The error is considered resolved when the list of files containing the scans changes. */
export interface PassportElementErrorFiles {
  /** Error source, must be files */
  readonly source: "files";
  /** The section of the user's Telegram Passport which has the issue, one of “utility_bill”, “bank_statement”, “rental_agreement”, “passport_registration”, “temporary_registration” */
  readonly type: string;
  /** List of base64-encoded file hashes */
  readonly fileHashes: ReadonlyArray<string>;
  /** Error message */
  readonly message: string;
  readonly [key: string]: unknown;
}
const _PassportElementErrorFilesPublicKeys = { file_hashes: "fileHashes" } as const;
const _PassportElementErrorFilesWireKeys = invertKeys(_PassportElementErrorFilesPublicKeys);
const _PassportElementErrorFilesEncoded = Schema.StructWithRest(
  Schema.Struct({
    source: Schema.Literal("files"),
    type: Schema.String,
    file_hashes: Schema.Array(Schema.String),
    message: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _PassportElementErrorFilesDecoded = Schema.declare<PassportElementErrorFiles>((input): input is PassportElementErrorFiles => Predicate.isObject(input));
export const PassportElementErrorFiles: Schema.Codec<PassportElementErrorFiles, unknown> = _PassportElementErrorFilesEncoded.pipe(
  Schema.decodeTo(_PassportElementErrorFilesDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_PassportElementErrorFilesPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_PassportElementErrorFilesWireKeys)),
  }),
);

/** Represents an issue with the front side of a document. The error is considered resolved when the file with the front side of the document changes. */
export interface PassportElementErrorFrontSide {
  /** Error source, must be front_side */
  readonly source: "front_side";
  /** The section of the user's Telegram Passport which has the issue, one of “passport”, “driver_license”, “identity_card”, “internal_passport” */
  readonly type: string;
  /** Base64-encoded hash of the file with the front side of the document */
  readonly fileHash: string;
  /** Error message */
  readonly message: string;
  readonly [key: string]: unknown;
}
const _PassportElementErrorFrontSidePublicKeys = { file_hash: "fileHash" } as const;
const _PassportElementErrorFrontSideWireKeys = invertKeys(_PassportElementErrorFrontSidePublicKeys);
const _PassportElementErrorFrontSideEncoded = Schema.StructWithRest(
  Schema.Struct({
    source: Schema.Literal("front_side"),
    type: Schema.String,
    file_hash: Schema.String,
    message: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _PassportElementErrorFrontSideDecoded = Schema.declare<PassportElementErrorFrontSide>((input): input is PassportElementErrorFrontSide => Predicate.isObject(input));
export const PassportElementErrorFrontSide: Schema.Codec<PassportElementErrorFrontSide, unknown> = _PassportElementErrorFrontSideEncoded.pipe(
  Schema.decodeTo(_PassportElementErrorFrontSideDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_PassportElementErrorFrontSidePublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_PassportElementErrorFrontSideWireKeys)),
  }),
);

/** Represents an issue with the reverse side of a document. The error is considered resolved when the file with reverse side of the document changes. */
export interface PassportElementErrorReverseSide {
  /** Error source, must be reverse_side */
  readonly source: "reverse_side";
  /** The section of the user's Telegram Passport which has the issue, one of “driver_license”, “identity_card” */
  readonly type: string;
  /** Base64-encoded hash of the file with the reverse side of the document */
  readonly fileHash: string;
  /** Error message */
  readonly message: string;
  readonly [key: string]: unknown;
}
const _PassportElementErrorReverseSidePublicKeys = { file_hash: "fileHash" } as const;
const _PassportElementErrorReverseSideWireKeys = invertKeys(_PassportElementErrorReverseSidePublicKeys);
const _PassportElementErrorReverseSideEncoded = Schema.StructWithRest(
  Schema.Struct({
    source: Schema.Literal("reverse_side"),
    type: Schema.String,
    file_hash: Schema.String,
    message: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _PassportElementErrorReverseSideDecoded = Schema.declare<PassportElementErrorReverseSide>((input): input is PassportElementErrorReverseSide => Predicate.isObject(input));
export const PassportElementErrorReverseSide: Schema.Codec<PassportElementErrorReverseSide, unknown> = _PassportElementErrorReverseSideEncoded.pipe(
  Schema.decodeTo(_PassportElementErrorReverseSideDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_PassportElementErrorReverseSidePublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_PassportElementErrorReverseSideWireKeys)),
  }),
);

/** Represents an issue with the selfie with a document. The error is considered resolved when the file with the selfie changes. */
export interface PassportElementErrorSelfie {
  /** Error source, must be selfie */
  readonly source: "selfie";
  /** The section of the user's Telegram Passport which has the issue, one of “passport”, “driver_license”, “identity_card”, “internal_passport” */
  readonly type: string;
  /** Base64-encoded hash of the file with the selfie */
  readonly fileHash: string;
  /** Error message */
  readonly message: string;
  readonly [key: string]: unknown;
}
const _PassportElementErrorSelfiePublicKeys = { file_hash: "fileHash" } as const;
const _PassportElementErrorSelfieWireKeys = invertKeys(_PassportElementErrorSelfiePublicKeys);
const _PassportElementErrorSelfieEncoded = Schema.StructWithRest(
  Schema.Struct({
    source: Schema.Literal("selfie"),
    type: Schema.String,
    file_hash: Schema.String,
    message: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _PassportElementErrorSelfieDecoded = Schema.declare<PassportElementErrorSelfie>((input): input is PassportElementErrorSelfie => Predicate.isObject(input));
export const PassportElementErrorSelfie: Schema.Codec<PassportElementErrorSelfie, unknown> = _PassportElementErrorSelfieEncoded.pipe(
  Schema.decodeTo(_PassportElementErrorSelfieDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_PassportElementErrorSelfiePublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_PassportElementErrorSelfieWireKeys)),
  }),
);

/** Represents an issue with one of the files that constitute the translation of a document. The error is considered resolved when the file changes. */
export interface PassportElementErrorTranslationFile {
  /** Error source, must be translation_file */
  readonly source: "translation_file";
  /** Type of element of the user's Telegram Passport which has the issue, one of “passport”, “driver_license”, “identity_card”, “internal_passport”, “utility_bill”, “bank_statement”, “rental_agreement”, “passport_registration”, “temporary_registration” */
  readonly type: string;
  /** Base64-encoded file hash */
  readonly fileHash: string;
  /** Error message */
  readonly message: string;
  readonly [key: string]: unknown;
}
const _PassportElementErrorTranslationFilePublicKeys = { file_hash: "fileHash" } as const;
const _PassportElementErrorTranslationFileWireKeys = invertKeys(_PassportElementErrorTranslationFilePublicKeys);
const _PassportElementErrorTranslationFileEncoded = Schema.StructWithRest(
  Schema.Struct({
    source: Schema.Literal("translation_file"),
    type: Schema.String,
    file_hash: Schema.String,
    message: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _PassportElementErrorTranslationFileDecoded = Schema.declare<PassportElementErrorTranslationFile>((input): input is PassportElementErrorTranslationFile => Predicate.isObject(input));
export const PassportElementErrorTranslationFile: Schema.Codec<PassportElementErrorTranslationFile, unknown> = _PassportElementErrorTranslationFileEncoded.pipe(
  Schema.decodeTo(_PassportElementErrorTranslationFileDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_PassportElementErrorTranslationFilePublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_PassportElementErrorTranslationFileWireKeys)),
  }),
);

/** Represents an issue with the translated version of a document. The error is considered resolved when a file with the document translation change. */
export interface PassportElementErrorTranslationFiles {
  /** Error source, must be translation_files */
  readonly source: "translation_files";
  /** Type of element of the user's Telegram Passport which has the issue, one of “passport”, “driver_license”, “identity_card”, “internal_passport”, “utility_bill”, “bank_statement”, “rental_agreement”, “passport_registration”, “temporary_registration” */
  readonly type: string;
  /** List of base64-encoded file hashes */
  readonly fileHashes: ReadonlyArray<string>;
  /** Error message */
  readonly message: string;
  readonly [key: string]: unknown;
}
const _PassportElementErrorTranslationFilesPublicKeys = { file_hashes: "fileHashes" } as const;
const _PassportElementErrorTranslationFilesWireKeys = invertKeys(_PassportElementErrorTranslationFilesPublicKeys);
const _PassportElementErrorTranslationFilesEncoded = Schema.StructWithRest(
  Schema.Struct({
    source: Schema.Literal("translation_files"),
    type: Schema.String,
    file_hashes: Schema.Array(Schema.String),
    message: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _PassportElementErrorTranslationFilesDecoded = Schema.declare<PassportElementErrorTranslationFiles>((input): input is PassportElementErrorTranslationFiles => Predicate.isObject(input));
export const PassportElementErrorTranslationFiles: Schema.Codec<PassportElementErrorTranslationFiles, unknown> = _PassportElementErrorTranslationFilesEncoded.pipe(
  Schema.decodeTo(_PassportElementErrorTranslationFilesDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_PassportElementErrorTranslationFilesPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_PassportElementErrorTranslationFilesWireKeys)),
  }),
);

/** Represents an issue in an unspecified place. The error is considered resolved when new data is added. */
export interface PassportElementErrorUnspecified {
  /** Error source, must be unspecified */
  readonly source: "unspecified";
  /** Type of element of the user's Telegram Passport which has the issue */
  readonly type: string;
  /** Base64-encoded element hash */
  readonly elementHash: string;
  /** Error message */
  readonly message: string;
  readonly [key: string]: unknown;
}
const _PassportElementErrorUnspecifiedPublicKeys = { element_hash: "elementHash" } as const;
const _PassportElementErrorUnspecifiedWireKeys = invertKeys(_PassportElementErrorUnspecifiedPublicKeys);
const _PassportElementErrorUnspecifiedEncoded = Schema.StructWithRest(
  Schema.Struct({
    source: Schema.Literal("unspecified"),
    type: Schema.String,
    element_hash: Schema.String,
    message: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _PassportElementErrorUnspecifiedDecoded = Schema.declare<PassportElementErrorUnspecified>((input): input is PassportElementErrorUnspecified => Predicate.isObject(input));
export const PassportElementErrorUnspecified: Schema.Codec<PassportElementErrorUnspecified, unknown> = _PassportElementErrorUnspecifiedEncoded.pipe(
  Schema.decodeTo(_PassportElementErrorUnspecifiedDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_PassportElementErrorUnspecifiedPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_PassportElementErrorUnspecifiedWireKeys)),
  }),
);

/** This object represents a file uploaded to Telegram Passport. Currently all Telegram Passport files are in JPEG format when decrypted and don't exceed 10MB. */
export interface PassportFile {
  /** Identifier for this file, which can be used to download or reuse the file */
  readonly fileId: string;
  /** Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file. */
  readonly fileUniqueId: string;
  /** File size in bytes */
  readonly fileSize: number;
  /** Unix time when the file was uploaded */
  readonly fileDate: number;
  readonly [key: string]: unknown;
}
const _PassportFilePublicKeys = { file_id: "fileId", file_unique_id: "fileUniqueId", file_size: "fileSize", file_date: "fileDate" } as const;
const _PassportFileWireKeys = invertKeys(_PassportFilePublicKeys);
const _PassportFileEncoded = Schema.StructWithRest(
  Schema.Struct({
    file_id: Schema.String,
    file_unique_id: Schema.String,
    file_size: Schema.Int,
    file_date: Schema.Int,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _PassportFileDecoded = Schema.declare<PassportFile>((input): input is PassportFile => Predicate.isObject(input));
export const PassportFile: Schema.Codec<PassportFile, unknown> = _PassportFileEncoded.pipe(
  Schema.decodeTo(_PassportFileDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_PassportFilePublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_PassportFileWireKeys)),
  }),
);

/** This object represents one size of a photo or a file / sticker thumbnail. */
export interface PhotoSize {
  /** Identifier for this file, which can be used to download or reuse the file */
  readonly fileId: string;
  /** Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file. */
  readonly fileUniqueId: string;
  /** Photo width */
  readonly width: number;
  /** Photo height */
  readonly height: number;
  /** Optional. File size in bytes */
  readonly fileSize?: number;
  readonly [key: string]: unknown;
}
const _PhotoSizePublicKeys = { file_id: "fileId", file_unique_id: "fileUniqueId", file_size: "fileSize" } as const;
const _PhotoSizeWireKeys = invertKeys(_PhotoSizePublicKeys);
const _PhotoSizeEncoded = Schema.StructWithRest(
  Schema.Struct({
    file_id: Schema.String,
    file_unique_id: Schema.String,
    width: Schema.Int,
    height: Schema.Int,
    file_size: Schema.optionalKey(Schema.Int),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _PhotoSizeDecoded = Schema.declare<PhotoSize>((input): input is PhotoSize => Predicate.isObject(input));
export const PhotoSize: Schema.Codec<PhotoSize, unknown> = _PhotoSizeEncoded.pipe(
  Schema.decodeTo(_PhotoSizeDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_PhotoSizePublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_PhotoSizeWireKeys)),
  }),
);

/** This object contains information about a poll. */
export interface Poll {
  /** Unique poll identifier */
  readonly id: string;
  /** Poll question, 1-300 characters */
  readonly question: string;
  /** Optional. Special entities that appear in the question. Currently, only custom emoji entities are allowed in poll questions */
  readonly questionEntities?: ReadonlyArray<MessageEntity>;
  /** List of poll options */
  readonly options: ReadonlyArray<PollOption>;
  /** Total number of users that voted in the poll */
  readonly totalVoterCount: number;
  /** True, if the poll is closed */
  readonly isClosed: boolean;
  /** True, if the poll is anonymous */
  readonly isAnonymous: boolean;
  /** Poll type, currently can be “regular” or “quiz” */
  readonly type: PollType;
  /** True, if the poll allows multiple answers */
  readonly allowsMultipleAnswers: boolean;
  /** True, if the poll allows to change the chosen answer options */
  readonly allowsRevoting: boolean;
  /** True if voting is limited to users who have been members of the chat where the poll was originally sent for more than 24 hours */
  readonly membersOnly: boolean;
  /** Optional. A list of two-letter ISO 3166-1 alpha-2 country codes indicating the countries from which users can vote in the poll. The country code “FT” is used for users with anonymous numbers. If omitted, then users from any country can participate in the poll. */
  readonly countryCodes?: ReadonlyArray<string>;
  /** Optional. Array of 0-based identifiers of the correct answer options. Available only for polls in quiz mode which are closed or were sent (not forwarded) by the bot or to the private chat with the bot. */
  readonly correctOptionIds?: ReadonlyArray<number>;
  /** Optional. Text that is shown when a user chooses an incorrect answer or taps on the lamp icon in a quiz-style poll, 0-200 characters */
  readonly explanation?: string;
  /** Optional. Special entities like usernames, URLs, bot commands, etc. that appear in the explanation */
  readonly explanationEntities?: ReadonlyArray<MessageEntity>;
  /** Optional. Media added to the quiz explanation */
  readonly explanationMedia?: PollMedia;
  /** Optional. Amount of time in seconds the poll will be active after creation */
  readonly openPeriod?: number;
  /** Optional. Point in time (Unix timestamp) when the poll will be automatically closed */
  readonly closeDate?: number;
  /** Optional. Description of the poll; for polls inside the Message object only */
  readonly description?: string;
  /** Optional. Special entities like usernames, URLs, bot commands, etc. that appear in the description */
  readonly descriptionEntities?: ReadonlyArray<MessageEntity>;
  /** Optional. Media added to the poll description; for polls inside the Message object only */
  readonly media?: PollMedia;
  readonly [key: string]: unknown;
}
const _PollPublicKeys = { question_entities: "questionEntities", total_voter_count: "totalVoterCount", is_closed: "isClosed", is_anonymous: "isAnonymous", allows_multiple_answers: "allowsMultipleAnswers", allows_revoting: "allowsRevoting", members_only: "membersOnly", country_codes: "countryCodes", correct_option_ids: "correctOptionIds", explanation_entities: "explanationEntities", explanation_media: "explanationMedia", open_period: "openPeriod", close_date: "closeDate", description_entities: "descriptionEntities" } as const;
const _PollWireKeys = invertKeys(_PollPublicKeys);
const _PollEncoded = Schema.StructWithRest(
  Schema.Struct({
    id: Schema.String,
    question: Schema.String,
    question_entities: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<MessageEntity, unknown> => MessageEntity))),
    options: Schema.Array(Schema.suspend((): Schema.Codec<PollOption, unknown> => PollOption)),
    total_voter_count: Schema.Int,
    is_closed: Schema.Boolean,
    is_anonymous: Schema.Boolean,
    type: Schema.suspend((): Schema.Codec<PollType, unknown> => PollType),
    allows_multiple_answers: Schema.Boolean,
    allows_revoting: Schema.Boolean,
    members_only: Schema.Boolean,
    country_codes: Schema.optionalKey(Schema.Array(Schema.String)),
    correct_option_ids: Schema.optionalKey(Schema.Array(Schema.Int)),
    explanation: Schema.optionalKey(Schema.String),
    explanation_entities: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<MessageEntity, unknown> => MessageEntity))),
    explanation_media: Schema.optionalKey(Schema.suspend((): Schema.Codec<PollMedia, unknown> => PollMedia)),
    open_period: Schema.optionalKey(Schema.Int),
    close_date: Schema.optionalKey(Schema.Int),
    description: Schema.optionalKey(Schema.String),
    description_entities: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<MessageEntity, unknown> => MessageEntity))),
    media: Schema.optionalKey(Schema.suspend((): Schema.Codec<PollMedia, unknown> => PollMedia)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _PollDecoded = Schema.declare<Poll>((input): input is Poll => Predicate.isObject(input));
export const Poll: Schema.Codec<Poll, unknown> = _PollEncoded.pipe(
  Schema.decodeTo(_PollDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_PollPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_PollWireKeys)),
  }),
);

/** This object represents an answer of a user in a non-anonymous poll. */
export interface PollAnswer {
  /** Unique poll identifier */
  readonly pollId: string;
  /** Optional. The chat that changed the answer to the poll, if the voter is anonymous */
  readonly voterChat?: Chat;
  /** Optional. The user that changed the answer to the poll, if the voter isn't anonymous */
  readonly user?: User;
  /** 0-based identifiers of chosen answer options. May be empty if the vote was retracted. */
  readonly optionIds: ReadonlyArray<number>;
  /** Persistent identifiers of the chosen answer options. May be empty if the vote was retracted. */
  readonly optionPersistentIds: ReadonlyArray<string>;
  readonly [key: string]: unknown;
}
const _PollAnswerPublicKeys = { poll_id: "pollId", voter_chat: "voterChat", option_ids: "optionIds", option_persistent_ids: "optionPersistentIds" } as const;
const _PollAnswerWireKeys = invertKeys(_PollAnswerPublicKeys);
const _PollAnswerEncoded = Schema.StructWithRest(
  Schema.Struct({
    poll_id: Schema.String,
    voter_chat: Schema.optionalKey(Schema.suspend((): Schema.Codec<Chat, unknown> => Chat)),
    user: Schema.optionalKey(Schema.suspend((): Schema.Codec<User, unknown> => User)),
    option_ids: Schema.Array(Schema.Int),
    option_persistent_ids: Schema.Array(Schema.String),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _PollAnswerDecoded = Schema.declare<PollAnswer>((input): input is PollAnswer => Predicate.isObject(input));
export const PollAnswer: Schema.Codec<PollAnswer, unknown> = _PollAnswerEncoded.pipe(
  Schema.decodeTo(_PollAnswerDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_PollAnswerPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_PollAnswerWireKeys)),
  }),
);

/** At most one of the optional fields can be present in any given object. */
export interface PollMedia {
  /** Optional. Media is an animation, information about the animation */
  readonly animation?: Animation;
  /** Optional. Media is an audio file, information about the file; currently, can't be received in a poll option */
  readonly audio?: Audio;
  /** Optional. Media is a general file, information about the file; currently, can't be received in a poll option */
  readonly document?: Document;
  /** Optional. The HTTP link attached to the poll option */
  readonly link?: Link;
  /** Optional. Media is a live photo, information about the live photo */
  readonly livePhoto?: LivePhoto;
  /** Optional. Media is a shared location, information about the location */
  readonly location?: Location;
  /** Optional. Media is a photo, available sizes of the photo */
  readonly photo?: ReadonlyArray<PhotoSize>;
  /** Optional. Media is a sticker, information about the sticker; currently, for poll options only */
  readonly sticker?: Sticker;
  /** Optional. Media is a venue, information about the venue */
  readonly venue?: Venue;
  /** Optional. Media is a video, information about the video */
  readonly video?: Video;
  readonly [key: string]: unknown;
}
const _PollMediaPublicKeys = { live_photo: "livePhoto" } as const;
const _PollMediaWireKeys = invertKeys(_PollMediaPublicKeys);
const _PollMediaEncoded = Schema.StructWithRest(
  Schema.Struct({
    animation: Schema.optionalKey(Schema.suspend((): Schema.Codec<Animation, unknown> => Animation)),
    audio: Schema.optionalKey(Schema.suspend((): Schema.Codec<Audio, unknown> => Audio)),
    document: Schema.optionalKey(Schema.suspend((): Schema.Codec<Document, unknown> => Document)),
    link: Schema.optionalKey(Schema.suspend((): Schema.Codec<Link, unknown> => Link)),
    live_photo: Schema.optionalKey(Schema.suspend((): Schema.Codec<LivePhoto, unknown> => LivePhoto)),
    location: Schema.optionalKey(Schema.suspend((): Schema.Codec<Location, unknown> => Location)),
    photo: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<PhotoSize, unknown> => PhotoSize))),
    sticker: Schema.optionalKey(Schema.suspend((): Schema.Codec<Sticker, unknown> => Sticker)),
    venue: Schema.optionalKey(Schema.suspend((): Schema.Codec<Venue, unknown> => Venue)),
    video: Schema.optionalKey(Schema.suspend((): Schema.Codec<Video, unknown> => Video)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _PollMediaDecoded = Schema.declare<PollMedia>((input): input is PollMedia => Predicate.isObject(input));
export const PollMedia: Schema.Codec<PollMedia, unknown> = _PollMediaEncoded.pipe(
  Schema.decodeTo(_PollMediaDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_PollMediaPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_PollMediaWireKeys)),
  }),
);

/** This object contains information about one answer option in a poll. */
export interface PollOption {
  /** Unique identifier of the option, persistent on option addition and deletion */
  readonly persistentId: string;
  /** Option text, 1-100 characters */
  readonly text: string;
  /** Optional. Special entities that appear in the option text. Currently, only custom emoji entities are allowed in poll option texts */
  readonly textEntities?: ReadonlyArray<MessageEntity>;
  /** Optional. Media added to the poll option */
  readonly media?: PollMedia;
  /** Number of users who voted for this option; may be 0 if unknown */
  readonly voterCount: number;
  /** Optional. User who added the option; omitted if the option wasn't added by a user after poll creation */
  readonly addedByUser?: User;
  /** Optional. Chat that added the option; omitted if the option wasn't added by a chat after poll creation */
  readonly addedByChat?: Chat;
  /** Optional. Point in time (Unix timestamp) when the option was added; omitted if the option existed in the original poll */
  readonly additionDate?: number;
  readonly [key: string]: unknown;
}
const _PollOptionPublicKeys = { persistent_id: "persistentId", text_entities: "textEntities", voter_count: "voterCount", added_by_user: "addedByUser", added_by_chat: "addedByChat", addition_date: "additionDate" } as const;
const _PollOptionWireKeys = invertKeys(_PollOptionPublicKeys);
const _PollOptionEncoded = Schema.StructWithRest(
  Schema.Struct({
    persistent_id: Schema.String,
    text: Schema.String,
    text_entities: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<MessageEntity, unknown> => MessageEntity))),
    media: Schema.optionalKey(Schema.suspend((): Schema.Codec<PollMedia, unknown> => PollMedia)),
    voter_count: Schema.Int,
    added_by_user: Schema.optionalKey(Schema.suspend((): Schema.Codec<User, unknown> => User)),
    added_by_chat: Schema.optionalKey(Schema.suspend((): Schema.Codec<Chat, unknown> => Chat)),
    addition_date: Schema.optionalKey(Schema.Int),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _PollOptionDecoded = Schema.declare<PollOption>((input): input is PollOption => Predicate.isObject(input));
export const PollOption: Schema.Codec<PollOption, unknown> = _PollOptionEncoded.pipe(
  Schema.decodeTo(_PollOptionDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_PollOptionPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_PollOptionWireKeys)),
  }),
);

/** Describes a service message about an option added to a poll. */
export interface PollOptionAdded {
  /** Optional. Message containing the poll to which the option was added, if known. Note that the Message object in this field will not contain the reply_to_message field even if it itself is a reply. */
  readonly pollMessage?: MaybeInaccessibleMessage;
  /** Unique identifier of the added option */
  readonly optionPersistentId: string;
  /** Option text */
  readonly optionText: string;
  /** Optional. Special entities that appear in the option_text */
  readonly optionTextEntities?: ReadonlyArray<MessageEntity>;
  readonly [key: string]: unknown;
}
const _PollOptionAddedPublicKeys = { poll_message: "pollMessage", option_persistent_id: "optionPersistentId", option_text: "optionText", option_text_entities: "optionTextEntities" } as const;
const _PollOptionAddedWireKeys = invertKeys(_PollOptionAddedPublicKeys);
const _PollOptionAddedEncoded = Schema.StructWithRest(
  Schema.Struct({
    poll_message: Schema.optionalKey(Schema.suspend((): Schema.Codec<MaybeInaccessibleMessage, unknown> => MaybeInaccessibleMessage)),
    option_persistent_id: Schema.String,
    option_text: Schema.String,
    option_text_entities: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<MessageEntity, unknown> => MessageEntity))),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _PollOptionAddedDecoded = Schema.declare<PollOptionAdded>((input): input is PollOptionAdded => Predicate.isObject(input));
export const PollOptionAdded: Schema.Codec<PollOptionAdded, unknown> = _PollOptionAddedEncoded.pipe(
  Schema.decodeTo(_PollOptionAddedDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_PollOptionAddedPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_PollOptionAddedWireKeys)),
  }),
);

/** Describes a service message about an option deleted from a poll. */
export interface PollOptionDeleted {
  /** Optional. Message containing the poll from which the option was deleted, if known. Note that the Message object in this field will not contain the reply_to_message field even if it itself is a reply. */
  readonly pollMessage?: MaybeInaccessibleMessage;
  /** Unique identifier of the deleted option */
  readonly optionPersistentId: string;
  /** Option text */
  readonly optionText: string;
  /** Optional. Special entities that appear in the option_text */
  readonly optionTextEntities?: ReadonlyArray<MessageEntity>;
  readonly [key: string]: unknown;
}
const _PollOptionDeletedPublicKeys = { poll_message: "pollMessage", option_persistent_id: "optionPersistentId", option_text: "optionText", option_text_entities: "optionTextEntities" } as const;
const _PollOptionDeletedWireKeys = invertKeys(_PollOptionDeletedPublicKeys);
const _PollOptionDeletedEncoded = Schema.StructWithRest(
  Schema.Struct({
    poll_message: Schema.optionalKey(Schema.suspend((): Schema.Codec<MaybeInaccessibleMessage, unknown> => MaybeInaccessibleMessage)),
    option_persistent_id: Schema.String,
    option_text: Schema.String,
    option_text_entities: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<MessageEntity, unknown> => MessageEntity))),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _PollOptionDeletedDecoded = Schema.declare<PollOptionDeleted>((input): input is PollOptionDeleted => Predicate.isObject(input));
export const PollOptionDeleted: Schema.Codec<PollOptionDeleted, unknown> = _PollOptionDeletedEncoded.pipe(
  Schema.decodeTo(_PollOptionDeletedDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_PollOptionDeletedPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_PollOptionDeletedWireKeys)),
  }),
);

/** This object contains information about an incoming pre-checkout query. */
export interface PreCheckoutQuery {
  /** Unique query identifier */
  readonly id: string;
  /** User who sent the query */
  readonly from: User;
  /** Three-letter ISO 4217 currency code, or “XTR” for payments in Telegram Stars */
  readonly currency: string;
  /** Total price in the smallest units of the currency (integer, not float/double). For example, for a price of US$ 1.45 pass amount = 145. See the exp parameter in currencies.json, it shows the number of digits past the decimal point for each currency (2 for the majority of currencies). */
  readonly totalAmount: number;
  /** Bot-specified invoice payload */
  readonly invoicePayload: string;
  /** Optional. Identifier of the shipping option chosen by the user */
  readonly shippingOptionId?: string;
  /** Optional. Order information provided by the user */
  readonly orderInfo?: OrderInfo;
  readonly [key: string]: unknown;
}
const _PreCheckoutQueryPublicKeys = { total_amount: "totalAmount", invoice_payload: "invoicePayload", shipping_option_id: "shippingOptionId", order_info: "orderInfo" } as const;
const _PreCheckoutQueryWireKeys = invertKeys(_PreCheckoutQueryPublicKeys);
const _PreCheckoutQueryEncoded = Schema.StructWithRest(
  Schema.Struct({
    id: Schema.String,
    from: Schema.suspend((): Schema.Codec<User, unknown> => User),
    currency: Schema.String,
    total_amount: Schema.Int,
    invoice_payload: Schema.String,
    shipping_option_id: Schema.optionalKey(Schema.String),
    order_info: Schema.optionalKey(Schema.suspend((): Schema.Codec<OrderInfo, unknown> => OrderInfo)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _PreCheckoutQueryDecoded = Schema.declare<PreCheckoutQuery>((input): input is PreCheckoutQuery => Predicate.isObject(input));
export const PreCheckoutQuery: Schema.Codec<PreCheckoutQuery, unknown> = _PreCheckoutQueryEncoded.pipe(
  Schema.decodeTo(_PreCheckoutQueryDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_PreCheckoutQueryPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_PreCheckoutQueryWireKeys)),
  }),
);

/** Describes an inline message to be sent by a user of a Mini App. */
export interface PreparedInlineMessage {
  /** Unique identifier of the prepared message */
  readonly id: string;
  /** Expiration date of the prepared message, in Unix time. Expired prepared messages can no longer be used. */
  readonly expirationDate: number;
  readonly [key: string]: unknown;
}
const _PreparedInlineMessagePublicKeys = { expiration_date: "expirationDate" } as const;
const _PreparedInlineMessageWireKeys = invertKeys(_PreparedInlineMessagePublicKeys);
const _PreparedInlineMessageEncoded = Schema.StructWithRest(
  Schema.Struct({
    id: Schema.String,
    expiration_date: Schema.Int,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _PreparedInlineMessageDecoded = Schema.declare<PreparedInlineMessage>((input): input is PreparedInlineMessage => Predicate.isObject(input));
export const PreparedInlineMessage: Schema.Codec<PreparedInlineMessage, unknown> = _PreparedInlineMessageEncoded.pipe(
  Schema.decodeTo(_PreparedInlineMessageDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_PreparedInlineMessagePublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_PreparedInlineMessageWireKeys)),
  }),
);

/** Describes a keyboard button to be used by a user of a Mini App. */
export interface PreparedKeyboardButton {
  /** Unique identifier of the keyboard button */
  readonly id: string;
  readonly [key: string]: unknown;
}
export const PreparedKeyboardButton: Schema.Codec<PreparedKeyboardButton, unknown> = Schema.StructWithRest(
  Schema.Struct({
    id: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object represents the content of a service message, sent whenever a user in the chat triggers a proximity alert set by another user. */
export interface ProximityAlertTriggered {
  /** User that triggered the alert */
  readonly traveler: User;
  /** User that set the alert */
  readonly watcher: User;
  /** The distance between the users */
  readonly distance: number;
  readonly [key: string]: unknown;
}
export const ProximityAlertTriggered: Schema.Codec<ProximityAlertTriggered, unknown> = Schema.StructWithRest(
  Schema.Struct({
    traveler: Schema.suspend((): Schema.Codec<User, unknown> => User),
    watcher: Schema.suspend((): Schema.Codec<User, unknown> => User),
    distance: Schema.Int,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Represents a reaction added to a message along with the number of times it was added. */
export interface ReactionCount {
  /** Type of the reaction */
  readonly type: ReactionType;
  /** Number of times the reaction was added */
  readonly totalCount: number;
  readonly [key: string]: unknown;
}
const _ReactionCountPublicKeys = { total_count: "totalCount" } as const;
const _ReactionCountWireKeys = invertKeys(_ReactionCountPublicKeys);
const _ReactionCountEncoded = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.suspend((): Schema.Codec<ReactionType, unknown> => ReactionType),
    total_count: Schema.Int,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _ReactionCountDecoded = Schema.declare<ReactionCount>((input): input is ReactionCount => Predicate.isObject(input));
export const ReactionCount: Schema.Codec<ReactionCount, unknown> = _ReactionCountEncoded.pipe(
  Schema.decodeTo(_ReactionCountDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_ReactionCountPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_ReactionCountWireKeys)),
  }),
);

/** This object describes the type of a reaction. Currently, it can be one of */
export type ReactionType = ReactionTypeEmoji | ReactionTypeCustomEmoji | ReactionTypePaid;
export const ReactionType: Schema.Codec<ReactionType, unknown> = Schema.Union([Schema.suspend((): Schema.Codec<ReactionTypeEmoji, unknown> => ReactionTypeEmoji), Schema.suspend((): Schema.Codec<ReactionTypeCustomEmoji, unknown> => ReactionTypeCustomEmoji), Schema.suspend((): Schema.Codec<ReactionTypePaid, unknown> => ReactionTypePaid)]);

/** The reaction is based on a custom emoji. */
export interface ReactionTypeCustomEmoji {
  /** Type of the reaction, always “custom_emoji” */
  readonly type: "custom_emoji";
  /** Custom emoji identifier */
  readonly customEmojiId: string;
  readonly [key: string]: unknown;
}
const _ReactionTypeCustomEmojiPublicKeys = { custom_emoji_id: "customEmojiId" } as const;
const _ReactionTypeCustomEmojiWireKeys = invertKeys(_ReactionTypeCustomEmojiPublicKeys);
const _ReactionTypeCustomEmojiEncoded = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("custom_emoji"),
    custom_emoji_id: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _ReactionTypeCustomEmojiDecoded = Schema.declare<ReactionTypeCustomEmoji>((input): input is ReactionTypeCustomEmoji => Predicate.isObject(input));
export const ReactionTypeCustomEmoji: Schema.Codec<ReactionTypeCustomEmoji, unknown> = _ReactionTypeCustomEmojiEncoded.pipe(
  Schema.decodeTo(_ReactionTypeCustomEmojiDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_ReactionTypeCustomEmojiPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_ReactionTypeCustomEmojiWireKeys)),
  }),
);

/** The reaction is based on an emoji. */
export interface ReactionTypeEmoji {
  /** Type of the reaction, always “emoji” */
  readonly type: "emoji";
  /** Reaction emoji. Currently, it can be one of "❤", "👍", "👎", "🔥", "🥰", "👏", "😁", "🤔", "🤯", "😱", "🤬", "😢", "🎉", "🤩", "🤮", "💩", "🙏", "👌", "🕊", "🤡", "🥱", "🥴", "😍", "🐳", "❤‍🔥", "🌚", "🌭", "💯", "🤣", "⚡", "🍌", "🏆", "💔", "🤨", "😐", "🍓", "🍾", "💋", "🖕", "😈", "😴", "😭", "🤓", "👻", "👨‍💻", "👀", "🎃", "🙈", "😇", "😨", "🤝", "✍", "🤗", "🫡", "🎅", "🎄", "☃", "💅", "🤪", "🗿", "🆒", "💘", "🙉", "🦄", "😘", "💊", "🙊", "😎", "👾", "🤷‍♂", "🤷", "🤷‍♀", "😡". */
  readonly emoji: string;
  readonly [key: string]: unknown;
}
export const ReactionTypeEmoji: Schema.Codec<ReactionTypeEmoji, unknown> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("emoji"),
    emoji: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** The reaction is paid. */
export interface ReactionTypePaid {
  /** Type of the reaction, always “paid” */
  readonly type: "paid";
  readonly [key: string]: unknown;
}
export const ReactionTypePaid: Schema.Codec<ReactionTypePaid, unknown> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("paid"),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object contains basic information about a refunded payment. */
export interface RefundedPayment {
  /** Three-letter ISO 4217 currency code, or “XTR” for payments in Telegram Stars. Currently, always “XTR”. */
  readonly currency: string;
  /** Total refunded price in the smallest units of the currency (integer, not float/double). For example, for a price of US$ 1.45, total_amount = 145. See the exp parameter in currencies.json, it shows the number of digits past the decimal point for each currency (2 for the majority of currencies). */
  readonly totalAmount: number;
  /** Bot-specified invoice payload */
  readonly invoicePayload: string;
  /** Telegram payment identifier */
  readonly telegramPaymentChargeId: string;
  /** Optional. Provider payment identifier */
  readonly providerPaymentChargeId?: string;
  readonly [key: string]: unknown;
}
const _RefundedPaymentPublicKeys = { total_amount: "totalAmount", invoice_payload: "invoicePayload", telegram_payment_charge_id: "telegramPaymentChargeId", provider_payment_charge_id: "providerPaymentChargeId" } as const;
const _RefundedPaymentWireKeys = invertKeys(_RefundedPaymentPublicKeys);
const _RefundedPaymentEncoded = Schema.StructWithRest(
  Schema.Struct({
    currency: Schema.String,
    total_amount: Schema.Int,
    invoice_payload: Schema.String,
    telegram_payment_charge_id: Schema.String,
    provider_payment_charge_id: Schema.optionalKey(Schema.String),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _RefundedPaymentDecoded = Schema.declare<RefundedPayment>((input): input is RefundedPayment => Predicate.isObject(input));
export const RefundedPayment: Schema.Codec<RefundedPayment, unknown> = _RefundedPaymentEncoded.pipe(
  Schema.decodeTo(_RefundedPaymentDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_RefundedPaymentPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_RefundedPaymentWireKeys)),
  }),
);

/** This object represents a custom keyboard with reply options (see Introduction to bots for details and examples). Not supported in channels and for messages sent on behalf of a business account. */
export interface ReplyKeyboardMarkup {
  /** Array of button rows, each represented by an Array of KeyboardButton objects */
  readonly keyboard: ReadonlyArray<ReadonlyArray<KeyboardButton>>;
  /** Optional. Requests clients to always show the keyboard when the regular keyboard is hidden. Defaults to False, in which case the custom keyboard can be hidden and opened with a keyboard icon. */
  readonly isPersistent?: boolean;
  /** Optional. Requests clients to resize the keyboard vertically for optimal fit (e.g., make the keyboard smaller if there are just two rows of buttons). Defaults to False, in which case the custom keyboard is always of the same height as the app's standard keyboard. */
  readonly resizeKeyboard?: boolean;
  /** Optional. Requests clients to hide the keyboard as soon as it's been used. The keyboard will still be available, but clients will automatically display the usual letter-keyboard in the chat - the user can press a special button in the input field to see the custom keyboard again. Defaults to False. */
  readonly oneTimeKeyboard?: boolean;
  /** Optional. The placeholder to be shown in the input field when the keyboard is active; 1-64 characters */
  readonly inputFieldPlaceholder?: string;
  /** Optional. Use this parameter if you want to show the keyboard to specific users only. Targets: 1) users that are @mentioned in the text of the Message object; 2) if the bot's message is a reply to a message in the same chat and forum topic, sender of the original message.

Example: A user requests to change the bot's language, bot replies to the request with a keyboard to select the new language. Other users in the group don't see the keyboard. */
  readonly selective?: boolean;
  /** Optional. Pass True if the reply interface must be shown to the user, as if they had manually selected the bot's message and tapped 'Reply' */
  readonly forceReply?: boolean;
  readonly [key: string]: unknown;
}
const _ReplyKeyboardMarkupPublicKeys = { is_persistent: "isPersistent", resize_keyboard: "resizeKeyboard", one_time_keyboard: "oneTimeKeyboard", input_field_placeholder: "inputFieldPlaceholder", force_reply: "forceReply" } as const;
const _ReplyKeyboardMarkupWireKeys = invertKeys(_ReplyKeyboardMarkupPublicKeys);
const _ReplyKeyboardMarkupEncoded = Schema.StructWithRest(
  Schema.Struct({
    keyboard: Schema.Array(Schema.Array(Schema.suspend((): Schema.Codec<KeyboardButton, unknown> => KeyboardButton))),
    is_persistent: Schema.optionalKey(Schema.Boolean),
    resize_keyboard: Schema.optionalKey(Schema.Boolean),
    one_time_keyboard: Schema.optionalKey(Schema.Boolean),
    input_field_placeholder: Schema.optionalKey(Schema.String),
    selective: Schema.optionalKey(Schema.Boolean),
    force_reply: Schema.optionalKey(Schema.Boolean),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _ReplyKeyboardMarkupDecoded = Schema.declare<ReplyKeyboardMarkup>((input): input is ReplyKeyboardMarkup => Predicate.isObject(input));
export const ReplyKeyboardMarkup: Schema.Codec<ReplyKeyboardMarkup, unknown> = _ReplyKeyboardMarkupEncoded.pipe(
  Schema.decodeTo(_ReplyKeyboardMarkupDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_ReplyKeyboardMarkupPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_ReplyKeyboardMarkupWireKeys)),
  }),
);

/** Upon receiving a message with this object, Telegram clients will remove the current custom keyboard and display the default letter-keyboard. By default, custom keyboards are displayed until a new keyboard is sent by a bot. An exception is made for one-time keyboards that are hidden immediately after the user presses a button (see ReplyKeyboardMarkup). Not supported in channels and for messages sent on behalf of a business account. */
export interface ReplyKeyboardRemove {
  /** Requests clients to remove the custom keyboard (user will not be able to summon this keyboard; if you want to hide the keyboard from sight but keep it accessible, use one_time_keyboard in ReplyKeyboardMarkup) */
  readonly removeKeyboard: true;
  /** Optional. Use this parameter if you want to remove the keyboard for specific users only. Targets: 1) users that are @mentioned in the text of the Message object; 2) if the bot's message is a reply to a message in the same chat and forum topic, sender of the original message.

Example: A user votes in a poll, bot returns confirmation message in reply to the vote and removes the keyboard for that user, while still showing the keyboard with poll options to users who haven't voted yet. */
  readonly selective?: boolean;
  readonly [key: string]: unknown;
}
const _ReplyKeyboardRemovePublicKeys = { remove_keyboard: "removeKeyboard" } as const;
const _ReplyKeyboardRemoveWireKeys = invertKeys(_ReplyKeyboardRemovePublicKeys);
const _ReplyKeyboardRemoveEncoded = Schema.StructWithRest(
  Schema.Struct({
    remove_keyboard: Schema.Literal(true),
    selective: Schema.optionalKey(Schema.Boolean),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _ReplyKeyboardRemoveDecoded = Schema.declare<ReplyKeyboardRemove>((input): input is ReplyKeyboardRemove => Predicate.isObject(input));
export const ReplyKeyboardRemove: Schema.Codec<ReplyKeyboardRemove, unknown> = _ReplyKeyboardRemoveEncoded.pipe(
  Schema.decodeTo(_ReplyKeyboardRemoveDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_ReplyKeyboardRemovePublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_ReplyKeyboardRemoveWireKeys)),
  }),
);

/** Describes reply parameters for the message that is being sent. */
export interface ReplyParameters {
  /** Optional. Identifier of the message that will be replied to in the current chat, or in the chat chat_id if it is specified. Required if ephemeral_message_id isn't specified. */
  readonly messageId?: number;
  /** Optional. If the message to be replied to is from a different chat, unique identifier for the chat or username of the bot, supergroup or channel in the format @username. Not supported for messages sent on behalf of a business account, messages from channel direct messages chats and ephemeral messages. */
  readonly chatId?: number | string;
  /** Optional. Identifier of the incoming ephemeral message that will be replied to in the current chat. A reply to an ephemeral message must itself be an ephemeral message. An ephemeral message may only be replied to within 15 seconds of being sent. Required if message_id isn't specified. */
  readonly ephemeralMessageId?: number;
  /** Optional. Pass True if the message should be sent even if the specified message to be replied to is not found. Always False for replies in another chat or forum topic, and sent ephemeral messages. Always True for messages sent on behalf of a business account. */
  readonly allowSendingWithoutReply?: boolean;
  /** Optional. Quoted part of the message to be replied to; 0-1024 characters after entities parsing. The quote must be an exact substring of the message to be replied to, including bold, italic, underline, strikethrough, spoiler, custom_emoji, and date_time entities. The message will fail to send if the quote isn't found in the original message. Ignored for ephemeral messages. */
  readonly quote?: string;
  /** Optional. Mode for parsing entities in the quote. See formatting options for more details. */
  readonly quoteParseMode?: string;
  /** Optional. A JSON-serialized list of special entities that appear in the quote. It can be specified instead of quote_parse_mode. */
  readonly quoteEntities?: ReadonlyArray<MessageEntity>;
  /** Optional. Position of the quote in the original message in UTF-16 code units */
  readonly quotePosition?: number;
  /** Optional. Identifier of the specific checklist task to be replied to */
  readonly checklistTaskId?: number;
  /** Optional. Persistent identifier of the specific poll option to be replied to */
  readonly pollOptionId?: string;
  readonly [key: string]: unknown;
}
const _ReplyParametersPublicKeys = { message_id: "messageId", chat_id: "chatId", ephemeral_message_id: "ephemeralMessageId", allow_sending_without_reply: "allowSendingWithoutReply", quote_parse_mode: "quoteParseMode", quote_entities: "quoteEntities", quote_position: "quotePosition", checklist_task_id: "checklistTaskId", poll_option_id: "pollOptionId" } as const;
const _ReplyParametersWireKeys = invertKeys(_ReplyParametersPublicKeys);
const _ReplyParametersEncoded = Schema.StructWithRest(
  Schema.Struct({
    message_id: Schema.optionalKey(Schema.Int),
    chat_id: Schema.optionalKey(Schema.Union([Schema.Int, Schema.String])),
    ephemeral_message_id: Schema.optionalKey(Schema.Int),
    allow_sending_without_reply: Schema.optionalKey(Schema.Boolean),
    quote: Schema.optionalKey(Schema.String),
    quote_parse_mode: Schema.optionalKey(Schema.String),
    quote_entities: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<MessageEntity, unknown> => MessageEntity))),
    quote_position: Schema.optionalKey(Schema.Int),
    checklist_task_id: Schema.optionalKey(Schema.Int),
    poll_option_id: Schema.optionalKey(Schema.String),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _ReplyParametersDecoded = Schema.declare<ReplyParameters>((input): input is ReplyParameters => Predicate.isObject(input));
export const ReplyParameters: Schema.Codec<ReplyParameters, unknown> = _ReplyParametersEncoded.pipe(
  Schema.decodeTo(_ReplyParametersDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_ReplyParametersPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_ReplyParametersWireKeys)),
  }),
);

/** Describes why a request was unsuccessful. */
export interface ResponseParameters {
  /** Optional. The group has been migrated to a supergroup with the specified identifier. This number may have more than 32 significant bits and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a signed 64-bit integer or double-precision float type are safe for storing this identifier. */
  readonly migrateToChatId?: number;
  /** Optional. In case of exceeding flood control, the number of seconds left to wait before the request can be repeated */
  readonly retryAfter?: number;
  readonly [key: string]: unknown;
}
const _ResponseParametersPublicKeys = { migrate_to_chat_id: "migrateToChatId", retry_after: "retryAfter" } as const;
const _ResponseParametersWireKeys = invertKeys(_ResponseParametersPublicKeys);
const _ResponseParametersEncoded = Schema.StructWithRest(
  Schema.Struct({
    migrate_to_chat_id: Schema.optionalKey(Schema.Int),
    retry_after: Schema.optionalKey(Schema.Int),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _ResponseParametersDecoded = Schema.declare<ResponseParameters>((input): input is ResponseParameters => Predicate.isObject(input));
export const ResponseParameters: Schema.Codec<ResponseParameters, unknown> = _ResponseParametersEncoded.pipe(
  Schema.decodeTo(_ResponseParametersDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_ResponseParametersPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_ResponseParametersWireKeys)),
  }),
);

/** This object describes the state of a revenue withdrawal operation. Currently, it can be one of */
export type RevenueWithdrawalState = RevenueWithdrawalStatePending | RevenueWithdrawalStateSucceeded | RevenueWithdrawalStateFailed;
export const RevenueWithdrawalState: Schema.Codec<RevenueWithdrawalState, unknown> = Schema.Union([Schema.suspend((): Schema.Codec<RevenueWithdrawalStatePending, unknown> => RevenueWithdrawalStatePending), Schema.suspend((): Schema.Codec<RevenueWithdrawalStateSucceeded, unknown> => RevenueWithdrawalStateSucceeded), Schema.suspend((): Schema.Codec<RevenueWithdrawalStateFailed, unknown> => RevenueWithdrawalStateFailed)]);

/** The withdrawal failed and the transaction was refunded. */
export interface RevenueWithdrawalStateFailed {
  /** Type of the state, always “failed” */
  readonly type: "failed";
  readonly [key: string]: unknown;
}
export const RevenueWithdrawalStateFailed: Schema.Codec<RevenueWithdrawalStateFailed, unknown> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("failed"),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** The withdrawal is in progress. */
export interface RevenueWithdrawalStatePending {
  /** Type of the state, always “pending” */
  readonly type: "pending";
  readonly [key: string]: unknown;
}
export const RevenueWithdrawalStatePending: Schema.Codec<RevenueWithdrawalStatePending, unknown> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("pending"),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** The withdrawal succeeded. */
export interface RevenueWithdrawalStateSucceeded {
  /** Type of the state, always “succeeded” */
  readonly type: "succeeded";
  /** Date the withdrawal was completed in Unix time */
  readonly date: number;
  /** An HTTPS URL that can be used to see transaction details */
  readonly url: string;
  readonly [key: string]: unknown;
}
export const RevenueWithdrawalStateSucceeded: Schema.Codec<RevenueWithdrawalStateSucceeded, unknown> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("succeeded"),
    date: Schema.Int,
    url: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object represents a block in a rich formatted message. Currently, it can be any of the following types: */
export type RichBlock = RichBlockParagraph | RichBlockSectionHeading | RichBlockPreformatted | RichBlockFooter | RichBlockDivider | RichBlockMathematicalExpression | RichBlockAnchor | RichBlockList | RichBlockBlockQuotation | RichBlockExpandableBlockQuotation | RichBlockPullQuotation | RichBlockCollage | RichBlockSlideshow | RichBlockTable | RichBlockDetails | RichBlockMap | RichBlockButtons | RichBlockAnimation | RichBlockAudio | RichBlockDocument | RichBlockPhoto | RichBlockVideo | RichBlockVoiceNote | RichBlockThinking;
export const RichBlock: Schema.Codec<RichBlock, unknown> = Schema.Union([Schema.suspend((): Schema.Codec<RichBlockParagraph, unknown> => RichBlockParagraph), Schema.suspend((): Schema.Codec<RichBlockSectionHeading, unknown> => RichBlockSectionHeading), Schema.suspend((): Schema.Codec<RichBlockPreformatted, unknown> => RichBlockPreformatted), Schema.suspend((): Schema.Codec<RichBlockFooter, unknown> => RichBlockFooter), Schema.suspend((): Schema.Codec<RichBlockDivider, unknown> => RichBlockDivider), Schema.suspend((): Schema.Codec<RichBlockMathematicalExpression, unknown> => RichBlockMathematicalExpression), Schema.suspend((): Schema.Codec<RichBlockAnchor, unknown> => RichBlockAnchor), Schema.suspend((): Schema.Codec<RichBlockList, unknown> => RichBlockList), Schema.suspend((): Schema.Codec<RichBlockBlockQuotation, unknown> => RichBlockBlockQuotation), Schema.suspend((): Schema.Codec<RichBlockExpandableBlockQuotation, unknown> => RichBlockExpandableBlockQuotation), Schema.suspend((): Schema.Codec<RichBlockPullQuotation, unknown> => RichBlockPullQuotation), Schema.suspend((): Schema.Codec<RichBlockCollage, unknown> => RichBlockCollage), Schema.suspend((): Schema.Codec<RichBlockSlideshow, unknown> => RichBlockSlideshow), Schema.suspend((): Schema.Codec<RichBlockTable, unknown> => RichBlockTable), Schema.suspend((): Schema.Codec<RichBlockDetails, unknown> => RichBlockDetails), Schema.suspend((): Schema.Codec<RichBlockMap, unknown> => RichBlockMap), Schema.suspend((): Schema.Codec<RichBlockButtons, unknown> => RichBlockButtons), Schema.suspend((): Schema.Codec<RichBlockAnimation, unknown> => RichBlockAnimation), Schema.suspend((): Schema.Codec<RichBlockAudio, unknown> => RichBlockAudio), Schema.suspend((): Schema.Codec<RichBlockDocument, unknown> => RichBlockDocument), Schema.suspend((): Schema.Codec<RichBlockPhoto, unknown> => RichBlockPhoto), Schema.suspend((): Schema.Codec<RichBlockVideo, unknown> => RichBlockVideo), Schema.suspend((): Schema.Codec<RichBlockVoiceNote, unknown> => RichBlockVoiceNote), Schema.suspend((): Schema.Codec<RichBlockThinking, unknown> => RichBlockThinking)]);

/** A block with an anchor, corresponding to the HTML tag <a> with the attribute name. */
export interface RichBlockAnchor {
  /** Type of the block, always “anchor” */
  readonly type: "anchor";
  /** The name of the anchor */
  readonly name: string;
  readonly [key: string]: unknown;
}
export const RichBlockAnchor: Schema.Codec<RichBlockAnchor, unknown> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("anchor"),
    name: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A block with an animation, corresponding to the HTML tag <video>. */
export interface RichBlockAnimation {
  /** Type of the block, always “animation” */
  readonly type: "animation";
  /** The animation */
  readonly animation: Animation;
  /** Optional. True, if the media preview is covered by a spoiler animation */
  readonly hasSpoiler?: true;
  /** Optional. Caption of the block */
  readonly caption?: RichBlockCaption;
  readonly [key: string]: unknown;
}
const _RichBlockAnimationPublicKeys = { has_spoiler: "hasSpoiler" } as const;
const _RichBlockAnimationWireKeys = invertKeys(_RichBlockAnimationPublicKeys);
const _RichBlockAnimationEncoded = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("animation"),
    animation: Schema.suspend((): Schema.Codec<Animation, unknown> => Animation),
    has_spoiler: Schema.optionalKey(Schema.Literal(true)),
    caption: Schema.optionalKey(Schema.suspend((): Schema.Codec<RichBlockCaption, unknown> => RichBlockCaption)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _RichBlockAnimationDecoded = Schema.declare<RichBlockAnimation>((input): input is RichBlockAnimation => Predicate.isObject(input));
export const RichBlockAnimation: Schema.Codec<RichBlockAnimation, unknown> = _RichBlockAnimationEncoded.pipe(
  Schema.decodeTo(_RichBlockAnimationDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_RichBlockAnimationPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_RichBlockAnimationWireKeys)),
  }),
);

/** A block with a music file, corresponding to the HTML tag <audio>. */
export interface RichBlockAudio {
  /** Type of the block, always “audio” */
  readonly type: "audio";
  /** The audio */
  readonly audio: Audio;
  /** Optional. Caption of the block */
  readonly caption?: RichBlockCaption;
  readonly [key: string]: unknown;
}
export const RichBlockAudio: Schema.Codec<RichBlockAudio, unknown> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("audio"),
    audio: Schema.suspend((): Schema.Codec<Audio, unknown> => Audio),
    caption: Schema.optionalKey(Schema.suspend((): Schema.Codec<RichBlockCaption, unknown> => RichBlockCaption)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A block quotation, corresponding to the HTML tag <blockquote>. */
export interface RichBlockBlockQuotation {
  /** Type of the block, always “blockquote” */
  readonly type: "blockquote";
  /** Content of the block */
  readonly blocks: ReadonlyArray<RichBlock>;
  /** Optional. Credit of the block */
  readonly credit?: RichText;
  readonly [key: string]: unknown;
}
export const RichBlockBlockQuotation: Schema.Codec<RichBlockBlockQuotation, unknown> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("blockquote"),
    blocks: Schema.Array(Schema.suspend((): Schema.Codec<RichBlock, unknown> => RichBlock)),
    credit: Schema.optionalKey(Schema.suspend((): Schema.Codec<RichText, unknown> => RichText)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A block containing a list of buttons that are shown in one row, corresponding to the custom HTML tag <tg-button-row>. */
export interface RichBlockButtons {
  /** Type of the block, always “buttons” */
  readonly type: "buttons";
  /** The buttons */
  readonly buttons: ReadonlyArray<RichMessageButton>;
  /** Optional. Horizontal alignment of the buttons. Currently, must be one of “left”, “center”, or “right”. */
  readonly align?: string;
  readonly [key: string]: unknown;
}
export const RichBlockButtons: Schema.Codec<RichBlockButtons, unknown> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("buttons"),
    buttons: Schema.Array(Schema.suspend((): Schema.Codec<RichMessageButton, unknown> => RichMessageButton)),
    align: Schema.optionalKey(Schema.String),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Caption of a rich formatted block. */
export interface RichBlockCaption {
  /** Block caption */
  readonly text: RichText;
  /** Optional. Block credit which corresponds to the HTML tag <cite> */
  readonly credit?: RichText;
  readonly [key: string]: unknown;
}
export const RichBlockCaption: Schema.Codec<RichBlockCaption, unknown> = Schema.StructWithRest(
  Schema.Struct({
    text: Schema.suspend((): Schema.Codec<RichText, unknown> => RichText),
    credit: Schema.optionalKey(Schema.suspend((): Schema.Codec<RichText, unknown> => RichText)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A collage, corresponding to the custom HTML tag <tg-collage>. */
export interface RichBlockCollage {
  /** Type of the block, always “collage” */
  readonly type: "collage";
  /** Elements of the collage */
  readonly blocks: ReadonlyArray<RichBlock>;
  /** Optional. Caption of the block */
  readonly caption?: RichBlockCaption;
  readonly [key: string]: unknown;
}
export const RichBlockCollage: Schema.Codec<RichBlockCollage, unknown> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("collage"),
    blocks: Schema.Array(Schema.suspend((): Schema.Codec<RichBlock, unknown> => RichBlock)),
    caption: Schema.optionalKey(Schema.suspend((): Schema.Codec<RichBlockCaption, unknown> => RichBlockCaption)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** An expandable block for details disclosure, corresponding to the HTML tag <details>. */
export interface RichBlockDetails {
  /** Type of the block, always “details” */
  readonly type: "details";
  /** Always shown summary of the block */
  readonly summary: RichText;
  /** Content of the block */
  readonly blocks: ReadonlyArray<RichBlock>;
  /** Optional. True, if the content of the block is visible by default */
  readonly isOpen?: true;
  readonly [key: string]: unknown;
}
const _RichBlockDetailsPublicKeys = { is_open: "isOpen" } as const;
const _RichBlockDetailsWireKeys = invertKeys(_RichBlockDetailsPublicKeys);
const _RichBlockDetailsEncoded = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("details"),
    summary: Schema.suspend((): Schema.Codec<RichText, unknown> => RichText),
    blocks: Schema.Array(Schema.suspend((): Schema.Codec<RichBlock, unknown> => RichBlock)),
    is_open: Schema.optionalKey(Schema.Literal(true)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _RichBlockDetailsDecoded = Schema.declare<RichBlockDetails>((input): input is RichBlockDetails => Predicate.isObject(input));
export const RichBlockDetails: Schema.Codec<RichBlockDetails, unknown> = _RichBlockDetailsEncoded.pipe(
  Schema.decodeTo(_RichBlockDetailsDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_RichBlockDetailsPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_RichBlockDetailsWireKeys)),
  }),
);

/** A divider, corresponding to the HTML tag <hr/>. */
export interface RichBlockDivider {
  /** Type of the block, always “divider” */
  readonly type: "divider";
  readonly [key: string]: unknown;
}
export const RichBlockDivider: Schema.Codec<RichBlockDivider, unknown> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("divider"),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A block with a general file, corresponding to the custom HTML tag <tg-document>. */
export interface RichBlockDocument {
  /** Type of the block, always “document” */
  readonly type: "document";
  /** The document */
  readonly document: Document;
  /** Optional. Caption of the block */
  readonly caption?: RichBlockCaption;
  readonly [key: string]: unknown;
}
export const RichBlockDocument: Schema.Codec<RichBlockDocument, unknown> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("document"),
    document: Schema.suspend((): Schema.Codec<Document, unknown> => Document),
    caption: Schema.optionalKey(Schema.suspend((): Schema.Codec<RichBlockCaption, unknown> => RichBlockCaption)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A block quotation, corresponding to the HTML tag <blockquote> with custom attribute "expandable". */
export interface RichBlockExpandableBlockQuotation {
  /** Type of the block, always “expandable_blockquote” */
  readonly type: "expandable_blockquote";
  /** Content of the block */
  readonly text: RichText;
  /** Optional. Credit of the block */
  readonly credit?: RichText;
  readonly [key: string]: unknown;
}
export const RichBlockExpandableBlockQuotation: Schema.Codec<RichBlockExpandableBlockQuotation, unknown> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("expandable_blockquote"),
    text: Schema.suspend((): Schema.Codec<RichText, unknown> => RichText),
    credit: Schema.optionalKey(Schema.suspend((): Schema.Codec<RichText, unknown> => RichText)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A footer, corresponding to the HTML tag <footer>. */
export interface RichBlockFooter {
  /** Type of the block, always “footer” */
  readonly type: "footer";
  /** Text of the block */
  readonly text: RichText;
  readonly [key: string]: unknown;
}
export const RichBlockFooter: Schema.Codec<RichBlockFooter, unknown> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("footer"),
    text: Schema.suspend((): Schema.Codec<RichText, unknown> => RichText),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A list of blocks, corresponding to the HTML tag <ul> or <ol> with multiple nested tags <li>. */
export interface RichBlockList {
  /** Type of the block, always “list” */
  readonly type: "list";
  /** Items of the list */
  readonly items: ReadonlyArray<RichBlockListItem>;
  readonly [key: string]: unknown;
}
export const RichBlockList: Schema.Codec<RichBlockList, unknown> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("list"),
    items: Schema.Array(Schema.suspend((): Schema.Codec<RichBlockListItem, unknown> => RichBlockListItem)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** An item of a list. */
export interface RichBlockListItem {
  /** Label of the item */
  readonly label: string;
  /** The content of the item */
  readonly blocks: ReadonlyArray<RichBlock>;
  /** Optional. True, if the item has a checkbox */
  readonly hasCheckbox?: true;
  /** Optional. True, if the item has a checked checkbox */
  readonly isChecked?: true;
  /** Optional. For ordered lists, the numeric value of the item label */
  readonly value?: number;
  /** Optional. For ordered lists, the type of the item label; must be one of “a” for lowercase letters, “A” for uppercase letters, “i” for lowercase Roman numerals, “I” for uppercase Roman numerals, or “1” for decimal numbers */
  readonly type?: string;
  readonly [key: string]: unknown;
}
const _RichBlockListItemPublicKeys = { has_checkbox: "hasCheckbox", is_checked: "isChecked" } as const;
const _RichBlockListItemWireKeys = invertKeys(_RichBlockListItemPublicKeys);
const _RichBlockListItemEncoded = Schema.StructWithRest(
  Schema.Struct({
    label: Schema.String,
    blocks: Schema.Array(Schema.suspend((): Schema.Codec<RichBlock, unknown> => RichBlock)),
    has_checkbox: Schema.optionalKey(Schema.Literal(true)),
    is_checked: Schema.optionalKey(Schema.Literal(true)),
    value: Schema.optionalKey(Schema.Int),
    type: Schema.optionalKey(Schema.String),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _RichBlockListItemDecoded = Schema.declare<RichBlockListItem>((input): input is RichBlockListItem => Predicate.isObject(input));
export const RichBlockListItem: Schema.Codec<RichBlockListItem, unknown> = _RichBlockListItemEncoded.pipe(
  Schema.decodeTo(_RichBlockListItemDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_RichBlockListItemPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_RichBlockListItemWireKeys)),
  }),
);

/** A block with a map, corresponding to the custom HTML tag <tg-map>. */
export interface RichBlockMap {
  /** Type of the block, always “map” */
  readonly type: "map";
  /** Location of the center of the map */
  readonly location: Location;
  /** Map zoom level */
  readonly zoom: number;
  /** Expected width of the map */
  readonly width: number;
  /** Expected height of the map */
  readonly height: number;
  /** Optional. Caption of the block */
  readonly caption?: RichBlockCaption;
  readonly [key: string]: unknown;
}
export const RichBlockMap: Schema.Codec<RichBlockMap, unknown> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("map"),
    location: Schema.suspend((): Schema.Codec<Location, unknown> => Location),
    zoom: Schema.Int,
    width: Schema.Int,
    height: Schema.Int,
    caption: Schema.optionalKey(Schema.suspend((): Schema.Codec<RichBlockCaption, unknown> => RichBlockCaption)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A block with a mathematical expression in LaTeX format, corresponding to the custom HTML tag <tg-math-block>. */
export interface RichBlockMathematicalExpression {
  /** Type of the block, always “mathematical_expression” */
  readonly type: "mathematical_expression";
  /** The mathematical expression in LaTeX format */
  readonly expression: string;
  readonly [key: string]: unknown;
}
export const RichBlockMathematicalExpression: Schema.Codec<RichBlockMathematicalExpression, unknown> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("mathematical_expression"),
    expression: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A text paragraph, corresponding to the HTML tag <p>. */
export interface RichBlockParagraph {
  /** Type of the block, always “paragraph” */
  readonly type: "paragraph";
  /** Text of the block */
  readonly text: RichText;
  readonly [key: string]: unknown;
}
export const RichBlockParagraph: Schema.Codec<RichBlockParagraph, unknown> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("paragraph"),
    text: Schema.suspend((): Schema.Codec<RichText, unknown> => RichText),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A block with a photo, corresponding to the HTML tag <img>. */
export interface RichBlockPhoto {
  /** Type of the block, always “photo” */
  readonly type: "photo";
  /** Available sizes of the photo */
  readonly photo: ReadonlyArray<PhotoSize>;
  /** Optional. True, if the media preview is covered by a spoiler animation */
  readonly hasSpoiler?: true;
  /** Optional. Caption of the block */
  readonly caption?: RichBlockCaption;
  readonly [key: string]: unknown;
}
const _RichBlockPhotoPublicKeys = { has_spoiler: "hasSpoiler" } as const;
const _RichBlockPhotoWireKeys = invertKeys(_RichBlockPhotoPublicKeys);
const _RichBlockPhotoEncoded = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("photo"),
    photo: Schema.Array(Schema.suspend((): Schema.Codec<PhotoSize, unknown> => PhotoSize)),
    has_spoiler: Schema.optionalKey(Schema.Literal(true)),
    caption: Schema.optionalKey(Schema.suspend((): Schema.Codec<RichBlockCaption, unknown> => RichBlockCaption)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _RichBlockPhotoDecoded = Schema.declare<RichBlockPhoto>((input): input is RichBlockPhoto => Predicate.isObject(input));
export const RichBlockPhoto: Schema.Codec<RichBlockPhoto, unknown> = _RichBlockPhotoEncoded.pipe(
  Schema.decodeTo(_RichBlockPhotoDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_RichBlockPhotoPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_RichBlockPhotoWireKeys)),
  }),
);

/** A preformatted text block, corresponding to the nested HTML tags <pre> and <code>. */
export interface RichBlockPreformatted {
  /** Type of the block, always “pre” */
  readonly type: "pre";
  /** Text of the block */
  readonly text: RichText;
  /** Optional. The programming language of the text */
  readonly language?: string;
  readonly [key: string]: unknown;
}
export const RichBlockPreformatted: Schema.Codec<RichBlockPreformatted, unknown> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("pre"),
    text: Schema.suspend((): Schema.Codec<RichText, unknown> => RichText),
    language: Schema.optionalKey(Schema.String),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A quotation with centered text, loosely corresponding to the HTML tag <aside>. */
export interface RichBlockPullQuotation {
  /** Type of the block, always “pullquote” */
  readonly type: "pullquote";
  /** Text of the block */
  readonly text: RichText;
  /** Optional. Credit of the block */
  readonly credit?: RichText;
  readonly [key: string]: unknown;
}
export const RichBlockPullQuotation: Schema.Codec<RichBlockPullQuotation, unknown> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("pullquote"),
    text: Schema.suspend((): Schema.Codec<RichText, unknown> => RichText),
    credit: Schema.optionalKey(Schema.suspend((): Schema.Codec<RichText, unknown> => RichText)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A section heading, corresponding to the HTML tags <h1>, <h2>, <h3>, <h4>, <h5>, or <h6>. */
export interface RichBlockSectionHeading {
  /** Type of the block, always “heading” */
  readonly type: "heading";
  /** Text of the block */
  readonly text: RichText;
  /** Relative size of the text font; 1-6, 1 is the largest, 6 is the smallest */
  readonly size: number;
  readonly [key: string]: unknown;
}
export const RichBlockSectionHeading: Schema.Codec<RichBlockSectionHeading, unknown> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("heading"),
    text: Schema.suspend((): Schema.Codec<RichText, unknown> => RichText),
    size: Schema.Int,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A slideshow, corresponding to the custom HTML tag <tg-slideshow>. */
export interface RichBlockSlideshow {
  /** Type of the block, always “slideshow” */
  readonly type: "slideshow";
  /** Elements of the slideshow */
  readonly blocks: ReadonlyArray<RichBlock>;
  /** Optional. Caption of the block */
  readonly caption?: RichBlockCaption;
  readonly [key: string]: unknown;
}
export const RichBlockSlideshow: Schema.Codec<RichBlockSlideshow, unknown> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("slideshow"),
    blocks: Schema.Array(Schema.suspend((): Schema.Codec<RichBlock, unknown> => RichBlock)),
    caption: Schema.optionalKey(Schema.suspend((): Schema.Codec<RichBlockCaption, unknown> => RichBlockCaption)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A table, corresponding to the HTML tag <table>. */
export interface RichBlockTable {
  /** Type of the block, always “table” */
  readonly type: "table";
  /** Cells of the table */
  readonly cells: ReadonlyArray<ReadonlyArray<RichBlockTableCell>>;
  /** Optional. True, if the table has borders */
  readonly isBordered?: true;
  /** Optional. True, if the table is striped */
  readonly isStriped?: true;
  /** Optional. True, if table cells have smaller indents */
  readonly isCompact?: true;
  /** Optional. Caption of the table */
  readonly caption?: RichText;
  readonly [key: string]: unknown;
}
const _RichBlockTablePublicKeys = { is_bordered: "isBordered", is_striped: "isStriped", is_compact: "isCompact" } as const;
const _RichBlockTableWireKeys = invertKeys(_RichBlockTablePublicKeys);
const _RichBlockTableEncoded = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("table"),
    cells: Schema.Array(Schema.Array(Schema.suspend((): Schema.Codec<RichBlockTableCell, unknown> => RichBlockTableCell))),
    is_bordered: Schema.optionalKey(Schema.Literal(true)),
    is_striped: Schema.optionalKey(Schema.Literal(true)),
    is_compact: Schema.optionalKey(Schema.Literal(true)),
    caption: Schema.optionalKey(Schema.suspend((): Schema.Codec<RichText, unknown> => RichText)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _RichBlockTableDecoded = Schema.declare<RichBlockTable>((input): input is RichBlockTable => Predicate.isObject(input));
export const RichBlockTable: Schema.Codec<RichBlockTable, unknown> = _RichBlockTableEncoded.pipe(
  Schema.decodeTo(_RichBlockTableDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_RichBlockTablePublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_RichBlockTableWireKeys)),
  }),
);

/** Cell in a table. */
export interface RichBlockTableCell {
  /** Optional. Text in the cell. If omitted, then the cell is invisible. */
  readonly text?: RichText;
  /** Optional. True, if the cell is a header cell */
  readonly isHeader?: true;
  /** Optional. The number of columns the cell spans if it is bigger than 1 */
  readonly colspan?: number;
  /** Optional. The number of rows the cell spans if it is bigger than 1 */
  readonly rowspan?: number;
  /** Horizontal cell content alignment. Currently, must be one of “left”, “center”, or “right”. */
  readonly align: string;
  /** Vertical cell content alignment. Currently, must be one of “top”, “middle”, or “bottom”. */
  readonly valign: string;
  readonly [key: string]: unknown;
}
const _RichBlockTableCellPublicKeys = { is_header: "isHeader" } as const;
const _RichBlockTableCellWireKeys = invertKeys(_RichBlockTableCellPublicKeys);
const _RichBlockTableCellEncoded = Schema.StructWithRest(
  Schema.Struct({
    text: Schema.optionalKey(Schema.suspend((): Schema.Codec<RichText, unknown> => RichText)),
    is_header: Schema.optionalKey(Schema.Literal(true)),
    colspan: Schema.optionalKey(Schema.Int),
    rowspan: Schema.optionalKey(Schema.Int),
    align: Schema.String,
    valign: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _RichBlockTableCellDecoded = Schema.declare<RichBlockTableCell>((input): input is RichBlockTableCell => Predicate.isObject(input));
export const RichBlockTableCell: Schema.Codec<RichBlockTableCell, unknown> = _RichBlockTableCellEncoded.pipe(
  Schema.decodeTo(_RichBlockTableCellDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_RichBlockTableCellPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_RichBlockTableCellWireKeys)),
  }),
);

/** A block with a “Thinking…” placeholder, corresponding to the custom HTML tag <tg-thinking>. The block may be used only in sendRichMessageDraft, therefore it can't be received in messages. See https://t.me/addemoji/AIActions for examples of custom emoji that are recommended for usage in the block. */
export interface RichBlockThinking {
  /** Type of the block, always “thinking” */
  readonly type: "thinking";
  /** Text of the block. See https://t.me/addemoji/AIActions for examples of custom emoji that are recommended for usage in the block. */
  readonly text: RichText;
  readonly [key: string]: unknown;
}
export const RichBlockThinking: Schema.Codec<RichBlockThinking, unknown> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("thinking"),
    text: Schema.suspend((): Schema.Codec<RichText, unknown> => RichText),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A block with a video, corresponding to the HTML tag <video>. */
export interface RichBlockVideo {
  /** Type of the block, always “video” */
  readonly type: "video";
  /** The video */
  readonly video: Video;
  /** Optional. True, if the media preview is covered by a spoiler animation */
  readonly hasSpoiler?: true;
  /** Optional. Caption of the block */
  readonly caption?: RichBlockCaption;
  readonly [key: string]: unknown;
}
const _RichBlockVideoPublicKeys = { has_spoiler: "hasSpoiler" } as const;
const _RichBlockVideoWireKeys = invertKeys(_RichBlockVideoPublicKeys);
const _RichBlockVideoEncoded = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("video"),
    video: Schema.suspend((): Schema.Codec<Video, unknown> => Video),
    has_spoiler: Schema.optionalKey(Schema.Literal(true)),
    caption: Schema.optionalKey(Schema.suspend((): Schema.Codec<RichBlockCaption, unknown> => RichBlockCaption)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _RichBlockVideoDecoded = Schema.declare<RichBlockVideo>((input): input is RichBlockVideo => Predicate.isObject(input));
export const RichBlockVideo: Schema.Codec<RichBlockVideo, unknown> = _RichBlockVideoEncoded.pipe(
  Schema.decodeTo(_RichBlockVideoDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_RichBlockVideoPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_RichBlockVideoWireKeys)),
  }),
);

/** A block with a voice note, corresponding to the HTML tag <audio>. */
export interface RichBlockVoiceNote {
  /** Type of the block, always “voice_note” */
  readonly type: "voice_note";
  /** The voice note */
  readonly voiceNote: Voice;
  /** Optional. Caption of the block */
  readonly caption?: RichBlockCaption;
  readonly [key: string]: unknown;
}
const _RichBlockVoiceNotePublicKeys = { voice_note: "voiceNote" } as const;
const _RichBlockVoiceNoteWireKeys = invertKeys(_RichBlockVoiceNotePublicKeys);
const _RichBlockVoiceNoteEncoded = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("voice_note"),
    voice_note: Schema.suspend((): Schema.Codec<Voice, unknown> => Voice),
    caption: Schema.optionalKey(Schema.suspend((): Schema.Codec<RichBlockCaption, unknown> => RichBlockCaption)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _RichBlockVoiceNoteDecoded = Schema.declare<RichBlockVoiceNote>((input): input is RichBlockVoiceNote => Predicate.isObject(input));
export const RichBlockVoiceNote: Schema.Codec<RichBlockVoiceNote, unknown> = _RichBlockVoiceNoteEncoded.pipe(
  Schema.decodeTo(_RichBlockVoiceNoteDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_RichBlockVoiceNotePublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_RichBlockVoiceNoteWireKeys)),
  }),
);

/** Rich formatted message. */
export interface RichMessage {
  /** Content of the message */
  readonly blocks: ReadonlyArray<RichBlock>;
  /** Optional. True, if the rich message must be shown right-to-left */
  readonly isRtl?: boolean;
  readonly [key: string]: unknown;
}
const _RichMessagePublicKeys = { is_rtl: "isRtl" } as const;
const _RichMessageWireKeys = invertKeys(_RichMessagePublicKeys);
const _RichMessageEncoded = Schema.StructWithRest(
  Schema.Struct({
    blocks: Schema.Array(Schema.suspend((): Schema.Codec<RichBlock, unknown> => RichBlock)),
    is_rtl: Schema.optionalKey(Schema.Boolean),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _RichMessageDecoded = Schema.declare<RichMessage>((input): input is RichMessage => Predicate.isObject(input));
export const RichMessage: Schema.Codec<RichMessage, unknown> = _RichMessageEncoded.pipe(
  Schema.decodeTo(_RichMessageDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_RichMessagePublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_RichMessageWireKeys)),
  }),
);

/** This object represents a button in a RichMessage. Exactly one of the fields other than text and style must be used to specify the type of the button. */
export interface RichMessageButton {
  /** Text of the button. May contain only plain text, RichTextCustomEmoji and RichTextDateTime entities. */
  readonly text: RichText;
  /** Optional. Style of the button. Must be one of “danger”, “success”, “primary”, or “link” (the button is shown as a regular link without borders). Apps may use theme-specific colors for the button background and text based on the style. The style “link” is allowed only for callback buttons. */
  readonly style?: string;
  /** Optional. HTTP or tg:// URL to be opened when the button is pressed. Links tg://user?id=<user_id> can be used to mention a user by their identifier without using a username, if this is allowed by their privacy settings. */
  readonly url?: string;
  /** Optional. Data to be sent in a callback query to the bot when the button is pressed, 1-64 bytes */
  readonly callbackData?: string;
  /** Optional. Description of the Web App that will be launched when the user presses the button. The Web App will be able to send an arbitrary message on behalf of the user using the method answerWebAppQuery. Available only in private chats between a user and the bot. Not supported for messages sent on behalf of a business account. */
  readonly webApp?: WebAppInfo;
  /** Optional. An HTTPS URL used to automatically authorize the user. Can be used as a replacement for the Telegram Login Widget. Not supported for ephemeral messages. */
  readonly loginUrl?: LoginUrl;
  /** Optional. If set, pressing the button will prompt the user to select one of their chats, open that chat and insert the bot's username and the specified inline query in the input field. May be empty, in which case just the bot's username will be inserted. Not supported for messages sent in channel direct messages chats and on behalf of a business account. */
  readonly switchInlineQuery?: string;
  /** Optional. If set, pressing the button will insert the bot's username and the specified inline query in the current chat's input field. May be empty, in which case only the bot's username will be inserted. Not supported in channels and for messages sent in channel direct messages chats and on behalf of a business account. */
  readonly switchInlineQueryCurrentChat?: string;
  /** Optional. If set, pressing the button will prompt the user to select one of their chats of the specified type, open that chat and insert the bot's username and the specified inline query in the input field. Not supported for messages sent in channel direct messages chats and on behalf of a business account. */
  readonly switchInlineQueryChosenChat?: SwitchInlineQueryChosenChat;
  /** Optional. A button that copies the specified text to the clipboard */
  readonly copyText?: CopyTextButton;
  /** Optional. If set, then the button is disabled and does nothing */
  readonly disabled?: DisabledButton;
  readonly [key: string]: unknown;
}
const _RichMessageButtonPublicKeys = { callback_data: "callbackData", web_app: "webApp", login_url: "loginUrl", switch_inline_query: "switchInlineQuery", switch_inline_query_current_chat: "switchInlineQueryCurrentChat", switch_inline_query_chosen_chat: "switchInlineQueryChosenChat", copy_text: "copyText" } as const;
const _RichMessageButtonWireKeys = invertKeys(_RichMessageButtonPublicKeys);
const _RichMessageButtonEncoded = Schema.StructWithRest(
  Schema.Struct({
    text: Schema.suspend((): Schema.Codec<RichText, unknown> => RichText),
    style: Schema.optionalKey(Schema.String),
    url: Schema.optionalKey(Schema.String),
    callback_data: Schema.optionalKey(Schema.String),
    web_app: Schema.optionalKey(Schema.suspend((): Schema.Codec<WebAppInfo, unknown> => WebAppInfo)),
    login_url: Schema.optionalKey(Schema.suspend((): Schema.Codec<LoginUrl, unknown> => LoginUrl)),
    switch_inline_query: Schema.optionalKey(Schema.String),
    switch_inline_query_current_chat: Schema.optionalKey(Schema.String),
    switch_inline_query_chosen_chat: Schema.optionalKey(Schema.suspend((): Schema.Codec<SwitchInlineQueryChosenChat, unknown> => SwitchInlineQueryChosenChat)),
    copy_text: Schema.optionalKey(Schema.suspend((): Schema.Codec<CopyTextButton, unknown> => CopyTextButton)),
    disabled: Schema.optionalKey(Schema.suspend((): Schema.Codec<DisabledButton, unknown> => DisabledButton)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _RichMessageButtonDecoded = Schema.declare<RichMessageButton>((input): input is RichMessageButton => Predicate.isObject(input));
export const RichMessageButton: Schema.Codec<RichMessageButton, unknown> = _RichMessageButtonEncoded.pipe(
  Schema.decodeTo(_RichMessageButtonDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_RichMessageButtonPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_RichMessageButtonWireKeys)),
  }),
);

/** This object represents a rich formatted text. Currently, it can be either a String for plain text, an Array of RichText, or any of the following types: */
export type RichText = RichTextBold | RichTextItalic | RichTextUnderline | RichTextStrikethrough | RichTextSpoiler | RichTextDateTime | RichTextTextMention | RichTextSubscript | RichTextSuperscript | RichTextMarked | RichTextCode | RichTextCustomEmoji | RichTextMathematicalExpression | RichTextUrl | RichTextEmailAddress | RichTextPhoneNumber | RichTextBankCardNumber | RichTextMention | RichTextHashtag | RichTextCashtag | RichTextBotCommand | RichTextButton | RichTextAnchor | RichTextAnchorLink | RichTextReference | RichTextReferenceLink | string | ReadonlyArray<RichText>;
export const RichText: Schema.Codec<RichText, unknown> = Schema.Union([Schema.suspend((): Schema.Codec<RichTextBold, unknown> => RichTextBold), Schema.suspend((): Schema.Codec<RichTextItalic, unknown> => RichTextItalic), Schema.suspend((): Schema.Codec<RichTextUnderline, unknown> => RichTextUnderline), Schema.suspend((): Schema.Codec<RichTextStrikethrough, unknown> => RichTextStrikethrough), Schema.suspend((): Schema.Codec<RichTextSpoiler, unknown> => RichTextSpoiler), Schema.suspend((): Schema.Codec<RichTextDateTime, unknown> => RichTextDateTime), Schema.suspend((): Schema.Codec<RichTextTextMention, unknown> => RichTextTextMention), Schema.suspend((): Schema.Codec<RichTextSubscript, unknown> => RichTextSubscript), Schema.suspend((): Schema.Codec<RichTextSuperscript, unknown> => RichTextSuperscript), Schema.suspend((): Schema.Codec<RichTextMarked, unknown> => RichTextMarked), Schema.suspend((): Schema.Codec<RichTextCode, unknown> => RichTextCode), Schema.suspend((): Schema.Codec<RichTextCustomEmoji, unknown> => RichTextCustomEmoji), Schema.suspend((): Schema.Codec<RichTextMathematicalExpression, unknown> => RichTextMathematicalExpression), Schema.suspend((): Schema.Codec<RichTextUrl, unknown> => RichTextUrl), Schema.suspend((): Schema.Codec<RichTextEmailAddress, unknown> => RichTextEmailAddress), Schema.suspend((): Schema.Codec<RichTextPhoneNumber, unknown> => RichTextPhoneNumber), Schema.suspend((): Schema.Codec<RichTextBankCardNumber, unknown> => RichTextBankCardNumber), Schema.suspend((): Schema.Codec<RichTextMention, unknown> => RichTextMention), Schema.suspend((): Schema.Codec<RichTextHashtag, unknown> => RichTextHashtag), Schema.suspend((): Schema.Codec<RichTextCashtag, unknown> => RichTextCashtag), Schema.suspend((): Schema.Codec<RichTextBotCommand, unknown> => RichTextBotCommand), Schema.suspend((): Schema.Codec<RichTextButton, unknown> => RichTextButton), Schema.suspend((): Schema.Codec<RichTextAnchor, unknown> => RichTextAnchor), Schema.suspend((): Schema.Codec<RichTextAnchorLink, unknown> => RichTextAnchorLink), Schema.suspend((): Schema.Codec<RichTextReference, unknown> => RichTextReference), Schema.suspend((): Schema.Codec<RichTextReferenceLink, unknown> => RichTextReferenceLink), Schema.String, Schema.Array(Schema.suspend((): Schema.Codec<RichText, unknown> => RichText))]);

/** An anchor. */
export interface RichTextAnchor {
  /** Type of the rich text, always “anchor” */
  readonly type: "anchor";
  /** The name of the anchor */
  readonly name: string;
  readonly [key: string]: unknown;
}
export const RichTextAnchor: Schema.Codec<RichTextAnchor, unknown> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("anchor"),
    name: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A link to an anchor. */
export interface RichTextAnchorLink {
  /** Type of the rich text, always “anchor_link” */
  readonly type: "anchor_link";
  /** The link text */
  readonly text: RichText;
  /** The name of the anchor. If the name is empty, then the link brings back to the top of the message. */
  readonly anchorName: string;
  readonly [key: string]: unknown;
}
const _RichTextAnchorLinkPublicKeys = { anchor_name: "anchorName" } as const;
const _RichTextAnchorLinkWireKeys = invertKeys(_RichTextAnchorLinkPublicKeys);
const _RichTextAnchorLinkEncoded = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("anchor_link"),
    text: Schema.suspend((): Schema.Codec<RichText, unknown> => RichText),
    anchor_name: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _RichTextAnchorLinkDecoded = Schema.declare<RichTextAnchorLink>((input): input is RichTextAnchorLink => Predicate.isObject(input));
export const RichTextAnchorLink: Schema.Codec<RichTextAnchorLink, unknown> = _RichTextAnchorLinkEncoded.pipe(
  Schema.decodeTo(_RichTextAnchorLinkDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_RichTextAnchorLinkPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_RichTextAnchorLinkWireKeys)),
  }),
);

/** A text with a bank card number. */
export interface RichTextBankCardNumber {
  /** Type of the rich text, always “bank_card_number” */
  readonly type: "bank_card_number";
  /** The text */
  readonly text: RichText;
  /** The bank card number */
  readonly bankCardNumber: string;
  readonly [key: string]: unknown;
}
const _RichTextBankCardNumberPublicKeys = { bank_card_number: "bankCardNumber" } as const;
const _RichTextBankCardNumberWireKeys = invertKeys(_RichTextBankCardNumberPublicKeys);
const _RichTextBankCardNumberEncoded = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("bank_card_number"),
    text: Schema.suspend((): Schema.Codec<RichText, unknown> => RichText),
    bank_card_number: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _RichTextBankCardNumberDecoded = Schema.declare<RichTextBankCardNumber>((input): input is RichTextBankCardNumber => Predicate.isObject(input));
export const RichTextBankCardNumber: Schema.Codec<RichTextBankCardNumber, unknown> = _RichTextBankCardNumberEncoded.pipe(
  Schema.decodeTo(_RichTextBankCardNumberDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_RichTextBankCardNumberPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_RichTextBankCardNumberWireKeys)),
  }),
);

/** A bold text. */
export interface RichTextBold {
  /** Type of the rich text, always “bold” */
  readonly type: "bold";
  /** The text */
  readonly text: RichText;
  readonly [key: string]: unknown;
}
export const RichTextBold: Schema.Codec<RichTextBold, unknown> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("bold"),
    text: Schema.suspend((): Schema.Codec<RichText, unknown> => RichText),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A bot command. */
export interface RichTextBotCommand {
  /** Type of the rich text, always “bot_command” */
  readonly type: "bot_command";
  /** The text */
  readonly text: RichText;
  /** The bot command */
  readonly botCommand: string;
  readonly [key: string]: unknown;
}
const _RichTextBotCommandPublicKeys = { bot_command: "botCommand" } as const;
const _RichTextBotCommandWireKeys = invertKeys(_RichTextBotCommandPublicKeys);
const _RichTextBotCommandEncoded = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("bot_command"),
    text: Schema.suspend((): Schema.Codec<RichText, unknown> => RichText),
    bot_command: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _RichTextBotCommandDecoded = Schema.declare<RichTextBotCommand>((input): input is RichTextBotCommand => Predicate.isObject(input));
export const RichTextBotCommand: Schema.Codec<RichTextBotCommand, unknown> = _RichTextBotCommandEncoded.pipe(
  Schema.decodeTo(_RichTextBotCommandDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_RichTextBotCommandPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_RichTextBotCommandWireKeys)),
  }),
);

/** A button. */
export interface RichTextButton {
  /** Type of the rich text, always “button” */
  readonly type: "button";
  /** The button */
  readonly button: RichMessageButton;
  readonly [key: string]: unknown;
}
export const RichTextButton: Schema.Codec<RichTextButton, unknown> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("button"),
    button: Schema.suspend((): Schema.Codec<RichMessageButton, unknown> => RichMessageButton),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A cashtag. */
export interface RichTextCashtag {
  /** Type of the rich text, always “cashtag” */
  readonly type: "cashtag";
  /** The text */
  readonly text: RichText;
  /** The cashtag */
  readonly cashtag: string;
  readonly [key: string]: unknown;
}
export const RichTextCashtag: Schema.Codec<RichTextCashtag, unknown> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("cashtag"),
    text: Schema.suspend((): Schema.Codec<RichText, unknown> => RichText),
    cashtag: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A monowidth text. */
export interface RichTextCode {
  /** Type of the rich text, always “code” */
  readonly type: "code";
  /** The text */
  readonly text: RichText;
  readonly [key: string]: unknown;
}
export const RichTextCode: Schema.Codec<RichTextCode, unknown> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("code"),
    text: Schema.suspend((): Schema.Codec<RichText, unknown> => RichText),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A custom emoji. */
export interface RichTextCustomEmoji {
  /** Type of the rich text, always “custom_emoji” */
  readonly type: "custom_emoji";
  /** Unique identifier of the custom emoji. Use getCustomEmojiStickers to get full information about the sticker. */
  readonly customEmojiId: string;
  /** Alternative emoji for the custom emoji */
  readonly alternativeText: string;
  readonly [key: string]: unknown;
}
const _RichTextCustomEmojiPublicKeys = { custom_emoji_id: "customEmojiId", alternative_text: "alternativeText" } as const;
const _RichTextCustomEmojiWireKeys = invertKeys(_RichTextCustomEmojiPublicKeys);
const _RichTextCustomEmojiEncoded = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("custom_emoji"),
    custom_emoji_id: Schema.String,
    alternative_text: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _RichTextCustomEmojiDecoded = Schema.declare<RichTextCustomEmoji>((input): input is RichTextCustomEmoji => Predicate.isObject(input));
export const RichTextCustomEmoji: Schema.Codec<RichTextCustomEmoji, unknown> = _RichTextCustomEmojiEncoded.pipe(
  Schema.decodeTo(_RichTextCustomEmojiDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_RichTextCustomEmojiPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_RichTextCustomEmojiWireKeys)),
  }),
);

/** Formatted date and time. */
export interface RichTextDateTime {
  /** Type of the rich text, always “date_time” */
  readonly type: "date_time";
  /** The text */
  readonly text: RichText;
  /** The Unix time associated with the entity */
  readonly unixTime: number;
  /** The string that defines the formatting of the date and time. See date-time entity formatting for more details. */
  readonly dateTimeFormat: string;
  readonly [key: string]: unknown;
}
const _RichTextDateTimePublicKeys = { unix_time: "unixTime", date_time_format: "dateTimeFormat" } as const;
const _RichTextDateTimeWireKeys = invertKeys(_RichTextDateTimePublicKeys);
const _RichTextDateTimeEncoded = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("date_time"),
    text: Schema.suspend((): Schema.Codec<RichText, unknown> => RichText),
    unix_time: Schema.Int,
    date_time_format: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _RichTextDateTimeDecoded = Schema.declare<RichTextDateTime>((input): input is RichTextDateTime => Predicate.isObject(input));
export const RichTextDateTime: Schema.Codec<RichTextDateTime, unknown> = _RichTextDateTimeEncoded.pipe(
  Schema.decodeTo(_RichTextDateTimeDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_RichTextDateTimePublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_RichTextDateTimeWireKeys)),
  }),
);

/** A text with an email address. */
export interface RichTextEmailAddress {
  /** Type of the rich text, always “email_address” */
  readonly type: "email_address";
  /** The text */
  readonly text: RichText;
  /** The email address */
  readonly emailAddress: string;
  readonly [key: string]: unknown;
}
const _RichTextEmailAddressPublicKeys = { email_address: "emailAddress" } as const;
const _RichTextEmailAddressWireKeys = invertKeys(_RichTextEmailAddressPublicKeys);
const _RichTextEmailAddressEncoded = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("email_address"),
    text: Schema.suspend((): Schema.Codec<RichText, unknown> => RichText),
    email_address: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _RichTextEmailAddressDecoded = Schema.declare<RichTextEmailAddress>((input): input is RichTextEmailAddress => Predicate.isObject(input));
export const RichTextEmailAddress: Schema.Codec<RichTextEmailAddress, unknown> = _RichTextEmailAddressEncoded.pipe(
  Schema.decodeTo(_RichTextEmailAddressDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_RichTextEmailAddressPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_RichTextEmailAddressWireKeys)),
  }),
);

/** A hashtag. */
export interface RichTextHashtag {
  /** Type of the rich text, always “hashtag” */
  readonly type: "hashtag";
  /** The text */
  readonly text: RichText;
  /** The hashtag */
  readonly hashtag: string;
  readonly [key: string]: unknown;
}
export const RichTextHashtag: Schema.Codec<RichTextHashtag, unknown> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("hashtag"),
    text: Schema.suspend((): Schema.Codec<RichText, unknown> => RichText),
    hashtag: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** An italicized text. */
export interface RichTextItalic {
  /** Type of the rich text, always “italic” */
  readonly type: "italic";
  /** The text */
  readonly text: RichText;
  readonly [key: string]: unknown;
}
export const RichTextItalic: Schema.Codec<RichTextItalic, unknown> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("italic"),
    text: Schema.suspend((): Schema.Codec<RichText, unknown> => RichText),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A marked text. */
export interface RichTextMarked {
  /** Type of the rich text, always “marked” */
  readonly type: "marked";
  /** The text */
  readonly text: RichText;
  readonly [key: string]: unknown;
}
export const RichTextMarked: Schema.Codec<RichTextMarked, unknown> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("marked"),
    text: Schema.suspend((): Schema.Codec<RichText, unknown> => RichText),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A mathematical expression. */
export interface RichTextMathematicalExpression {
  /** Type of the rich text, always “mathematical_expression” */
  readonly type: "mathematical_expression";
  /** The expression in LaTeX format */
  readonly expression: string;
  readonly [key: string]: unknown;
}
export const RichTextMathematicalExpression: Schema.Codec<RichTextMathematicalExpression, unknown> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("mathematical_expression"),
    expression: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A mention by a username. */
export interface RichTextMention {
  /** Type of the rich text, always “mention” */
  readonly type: "mention";
  /** The text */
  readonly text: RichText;
  /** The username */
  readonly username: string;
  readonly [key: string]: unknown;
}
export const RichTextMention: Schema.Codec<RichTextMention, unknown> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("mention"),
    text: Schema.suspend((): Schema.Codec<RichText, unknown> => RichText),
    username: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A text with a phone number. */
export interface RichTextPhoneNumber {
  /** Type of the rich text, always “phone_number” */
  readonly type: "phone_number";
  /** The text */
  readonly text: RichText;
  /** The phone number */
  readonly phoneNumber: string;
  readonly [key: string]: unknown;
}
const _RichTextPhoneNumberPublicKeys = { phone_number: "phoneNumber" } as const;
const _RichTextPhoneNumberWireKeys = invertKeys(_RichTextPhoneNumberPublicKeys);
const _RichTextPhoneNumberEncoded = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("phone_number"),
    text: Schema.suspend((): Schema.Codec<RichText, unknown> => RichText),
    phone_number: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _RichTextPhoneNumberDecoded = Schema.declare<RichTextPhoneNumber>((input): input is RichTextPhoneNumber => Predicate.isObject(input));
export const RichTextPhoneNumber: Schema.Codec<RichTextPhoneNumber, unknown> = _RichTextPhoneNumberEncoded.pipe(
  Schema.decodeTo(_RichTextPhoneNumberDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_RichTextPhoneNumberPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_RichTextPhoneNumberWireKeys)),
  }),
);

/** A reference. */
export interface RichTextReference {
  /** Type of the rich text, always “reference” */
  readonly type: "reference";
  /** Text of the reference */
  readonly text: RichText;
  /** The name of the reference */
  readonly name: string;
  readonly [key: string]: unknown;
}
export const RichTextReference: Schema.Codec<RichTextReference, unknown> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("reference"),
    text: Schema.suspend((): Schema.Codec<RichText, unknown> => RichText),
    name: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A link to a reference. */
export interface RichTextReferenceLink {
  /** Type of the rich text, always “reference_link” */
  readonly type: "reference_link";
  /** The link text */
  readonly text: RichText;
  /** The name of the reference */
  readonly referenceName: string;
  readonly [key: string]: unknown;
}
const _RichTextReferenceLinkPublicKeys = { reference_name: "referenceName" } as const;
const _RichTextReferenceLinkWireKeys = invertKeys(_RichTextReferenceLinkPublicKeys);
const _RichTextReferenceLinkEncoded = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("reference_link"),
    text: Schema.suspend((): Schema.Codec<RichText, unknown> => RichText),
    reference_name: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _RichTextReferenceLinkDecoded = Schema.declare<RichTextReferenceLink>((input): input is RichTextReferenceLink => Predicate.isObject(input));
export const RichTextReferenceLink: Schema.Codec<RichTextReferenceLink, unknown> = _RichTextReferenceLinkEncoded.pipe(
  Schema.decodeTo(_RichTextReferenceLinkDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_RichTextReferenceLinkPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_RichTextReferenceLinkWireKeys)),
  }),
);

/** A text covered by a spoiler. */
export interface RichTextSpoiler {
  /** Type of the rich text, always “spoiler” */
  readonly type: "spoiler";
  /** The text */
  readonly text: RichText;
  readonly [key: string]: unknown;
}
export const RichTextSpoiler: Schema.Codec<RichTextSpoiler, unknown> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("spoiler"),
    text: Schema.suspend((): Schema.Codec<RichText, unknown> => RichText),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A strikethrough text. */
export interface RichTextStrikethrough {
  /** Type of the rich text, always “strikethrough” */
  readonly type: "strikethrough";
  /** The text */
  readonly text: RichText;
  readonly [key: string]: unknown;
}
export const RichTextStrikethrough: Schema.Codec<RichTextStrikethrough, unknown> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("strikethrough"),
    text: Schema.suspend((): Schema.Codec<RichText, unknown> => RichText),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A subscript text. */
export interface RichTextSubscript {
  /** Type of the rich text, always “subscript” */
  readonly type: "subscript";
  /** The text */
  readonly text: RichText;
  readonly [key: string]: unknown;
}
export const RichTextSubscript: Schema.Codec<RichTextSubscript, unknown> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("subscript"),
    text: Schema.suspend((): Schema.Codec<RichText, unknown> => RichText),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A superscript text. */
export interface RichTextSuperscript {
  /** Type of the rich text, always “superscript” */
  readonly type: "superscript";
  /** The text */
  readonly text: RichText;
  readonly [key: string]: unknown;
}
export const RichTextSuperscript: Schema.Codec<RichTextSuperscript, unknown> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("superscript"),
    text: Schema.suspend((): Schema.Codec<RichText, unknown> => RichText),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A mention of a Telegram user by their identifier. */
export interface RichTextTextMention {
  /** Type of the rich text, always “text_mention” */
  readonly type: "text_mention";
  /** The text */
  readonly text: RichText;
  /** The mentioned user */
  readonly user: User;
  readonly [key: string]: unknown;
}
export const RichTextTextMention: Schema.Codec<RichTextTextMention, unknown> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("text_mention"),
    text: Schema.suspend((): Schema.Codec<RichText, unknown> => RichText),
    user: Schema.suspend((): Schema.Codec<User, unknown> => User),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** An underlined text. */
export interface RichTextUnderline {
  /** Type of the rich text, always “underline” */
  readonly type: "underline";
  /** The text */
  readonly text: RichText;
  readonly [key: string]: unknown;
}
export const RichTextUnderline: Schema.Codec<RichTextUnderline, unknown> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("underline"),
    text: Schema.suspend((): Schema.Codec<RichText, unknown> => RichText),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A text with a link. */
export interface RichTextUrl {
  /** Type of the rich text, always “url” */
  readonly type: "url";
  /** The text */
  readonly text: RichText;
  /** URL of the link */
  readonly url: string;
  readonly [key: string]: unknown;
}
export const RichTextUrl: Schema.Codec<RichTextUrl, unknown> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("url"),
    text: Schema.suspend((): Schema.Codec<RichText, unknown> => RichText),
    url: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Describes an inline message sent by a guest bot. */
export interface SentGuestMessage {
  /** Identifier of the sent inline message */
  readonly inlineMessageId: string;
  readonly [key: string]: unknown;
}
const _SentGuestMessagePublicKeys = { inline_message_id: "inlineMessageId" } as const;
const _SentGuestMessageWireKeys = invertKeys(_SentGuestMessagePublicKeys);
const _SentGuestMessageEncoded = Schema.StructWithRest(
  Schema.Struct({
    inline_message_id: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _SentGuestMessageDecoded = Schema.declare<SentGuestMessage>((input): input is SentGuestMessage => Predicate.isObject(input));
export const SentGuestMessage: Schema.Codec<SentGuestMessage, unknown> = _SentGuestMessageEncoded.pipe(
  Schema.decodeTo(_SentGuestMessageDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_SentGuestMessagePublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_SentGuestMessageWireKeys)),
  }),
);

/** Describes an inline message sent by a Web App on behalf of a user. */
export interface SentWebAppMessage {
  /** Optional. Identifier of the sent inline message. Available only if there is an inline keyboard attached to the message. */
  readonly inlineMessageId?: string;
  readonly [key: string]: unknown;
}
const _SentWebAppMessagePublicKeys = { inline_message_id: "inlineMessageId" } as const;
const _SentWebAppMessageWireKeys = invertKeys(_SentWebAppMessagePublicKeys);
const _SentWebAppMessageEncoded = Schema.StructWithRest(
  Schema.Struct({
    inline_message_id: Schema.optionalKey(Schema.String),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _SentWebAppMessageDecoded = Schema.declare<SentWebAppMessage>((input): input is SentWebAppMessage => Predicate.isObject(input));
export const SentWebAppMessage: Schema.Codec<SentWebAppMessage, unknown> = _SentWebAppMessageEncoded.pipe(
  Schema.decodeTo(_SentWebAppMessageDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_SentWebAppMessagePublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_SentWebAppMessageWireKeys)),
  }),
);

/** This object contains information about a user that was shared with the bot using a KeyboardButtonRequestUsers button. */
export interface SharedUser {
  /** Identifier of the shared user. This number may have more than 32 significant bits and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so 64-bit integers or double-precision float types are safe for storing these identifiers. The bot may not have access to the user and could be unable to use this identifier, unless the user is already known to the bot by some other means. */
  readonly userId: number;
  /** Optional. First name of the user, if the name was requested by the bot */
  readonly firstName?: string;
  /** Optional. Last name of the user, if the name was requested by the bot */
  readonly lastName?: string;
  /** Optional. Username of the user, if the username was requested by the bot */
  readonly username?: string;
  /** Optional. Available sizes of the chat photo, if the photo was requested by the bot */
  readonly photo?: ReadonlyArray<PhotoSize>;
  readonly [key: string]: unknown;
}
const _SharedUserPublicKeys = { user_id: "userId", first_name: "firstName", last_name: "lastName" } as const;
const _SharedUserWireKeys = invertKeys(_SharedUserPublicKeys);
const _SharedUserEncoded = Schema.StructWithRest(
  Schema.Struct({
    user_id: Schema.Int,
    first_name: Schema.optionalKey(Schema.String),
    last_name: Schema.optionalKey(Schema.String),
    username: Schema.optionalKey(Schema.String),
    photo: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<PhotoSize, unknown> => PhotoSize))),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _SharedUserDecoded = Schema.declare<SharedUser>((input): input is SharedUser => Predicate.isObject(input));
export const SharedUser: Schema.Codec<SharedUser, unknown> = _SharedUserEncoded.pipe(
  Schema.decodeTo(_SharedUserDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_SharedUserPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_SharedUserWireKeys)),
  }),
);

/** This object represents a shipping address. */
export interface ShippingAddress {
  /** Two-letter ISO 3166-1 alpha-2 country code */
  readonly countryCode: string;
  /** State, if applicable */
  readonly state: string;
  /** City */
  readonly city: string;
  /** First line for the address */
  readonly streetLine1: string;
  /** Second line for the address */
  readonly streetLine2: string;
  /** Address post code */
  readonly postCode: string;
  readonly [key: string]: unknown;
}
const _ShippingAddressPublicKeys = { country_code: "countryCode", street_line1: "streetLine1", street_line2: "streetLine2", post_code: "postCode" } as const;
const _ShippingAddressWireKeys = invertKeys(_ShippingAddressPublicKeys);
const _ShippingAddressEncoded = Schema.StructWithRest(
  Schema.Struct({
    country_code: Schema.String,
    state: Schema.String,
    city: Schema.String,
    street_line1: Schema.String,
    street_line2: Schema.String,
    post_code: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _ShippingAddressDecoded = Schema.declare<ShippingAddress>((input): input is ShippingAddress => Predicate.isObject(input));
export const ShippingAddress: Schema.Codec<ShippingAddress, unknown> = _ShippingAddressEncoded.pipe(
  Schema.decodeTo(_ShippingAddressDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_ShippingAddressPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_ShippingAddressWireKeys)),
  }),
);

/** This object represents one shipping option. */
export interface ShippingOption {
  /** Shipping option identifier */
  readonly id: string;
  /** Option title */
  readonly title: string;
  /** List of price portions */
  readonly prices: ReadonlyArray<LabeledPrice>;
  readonly [key: string]: unknown;
}
export const ShippingOption: Schema.Codec<ShippingOption, unknown> = Schema.StructWithRest(
  Schema.Struct({
    id: Schema.String,
    title: Schema.String,
    prices: Schema.Array(Schema.suspend((): Schema.Codec<LabeledPrice, unknown> => LabeledPrice)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object contains information about an incoming shipping query. */
export interface ShippingQuery {
  /** Unique query identifier */
  readonly id: string;
  /** User who sent the query */
  readonly from: User;
  /** Bot-specified invoice payload */
  readonly invoicePayload: string;
  /** User specified shipping address */
  readonly shippingAddress: ShippingAddress;
  readonly [key: string]: unknown;
}
const _ShippingQueryPublicKeys = { invoice_payload: "invoicePayload", shipping_address: "shippingAddress" } as const;
const _ShippingQueryWireKeys = invertKeys(_ShippingQueryPublicKeys);
const _ShippingQueryEncoded = Schema.StructWithRest(
  Schema.Struct({
    id: Schema.String,
    from: Schema.suspend((): Schema.Codec<User, unknown> => User),
    invoice_payload: Schema.String,
    shipping_address: Schema.suspend((): Schema.Codec<ShippingAddress, unknown> => ShippingAddress),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _ShippingQueryDecoded = Schema.declare<ShippingQuery>((input): input is ShippingQuery => Predicate.isObject(input));
export const ShippingQuery: Schema.Codec<ShippingQuery, unknown> = _ShippingQueryEncoded.pipe(
  Schema.decodeTo(_ShippingQueryDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_ShippingQueryPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_ShippingQueryWireKeys)),
  }),
);

/** Describes an amount of Telegram Stars. */
export interface StarAmount {
  /** Integer amount of Telegram Stars, rounded to 0; can be negative */
  readonly amount: number;
  /** Optional. The number of 1/1000000000 shares of Telegram Stars; from -999999999 to 999999999; can be negative if and only if amount is non-positive */
  readonly nanostarAmount?: number;
  readonly [key: string]: unknown;
}
const _StarAmountPublicKeys = { nanostar_amount: "nanostarAmount" } as const;
const _StarAmountWireKeys = invertKeys(_StarAmountPublicKeys);
const _StarAmountEncoded = Schema.StructWithRest(
  Schema.Struct({
    amount: Schema.Int,
    nanostar_amount: Schema.optionalKey(Schema.Int),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _StarAmountDecoded = Schema.declare<StarAmount>((input): input is StarAmount => Predicate.isObject(input));
export const StarAmount: Schema.Codec<StarAmount, unknown> = _StarAmountEncoded.pipe(
  Schema.decodeTo(_StarAmountDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_StarAmountPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_StarAmountWireKeys)),
  }),
);

/** Describes a Telegram Star transaction. Note that if the buyer initiates a chargeback with the payment provider from whom they acquired Stars (e.g., Apple, Google) following this transaction, the refunded Stars will be deducted from the bot's balance. This is outside of Telegram's control. */
export interface StarTransaction {
  /** Unique identifier of the transaction. Coincides with the identifier of the original transaction for refund transactions. Coincides with SuccessfulPayment.telegram_payment_charge_id for successful incoming payments from users. */
  readonly id: string;
  /** Integer amount of Telegram Stars transferred by the transaction */
  readonly amount: number;
  /** Optional. The number of 1/1000000000 shares of Telegram Stars transferred by the transaction; from 0 to 999999999 */
  readonly nanostarAmount?: number;
  /** Date the transaction was created in Unix time */
  readonly date: number;
  /** Optional. Source of an incoming transaction (e.g., a user purchasing goods or services, Fragment refunding a failed withdrawal). Only for incoming transactions. */
  readonly source?: TransactionPartner;
  /** Optional. Receiver of an outgoing transaction (e.g., a user for a purchase refund, Fragment for a withdrawal). Only for outgoing transactions. */
  readonly receiver?: TransactionPartner;
  readonly [key: string]: unknown;
}
const _StarTransactionPublicKeys = { nanostar_amount: "nanostarAmount" } as const;
const _StarTransactionWireKeys = invertKeys(_StarTransactionPublicKeys);
const _StarTransactionEncoded = Schema.StructWithRest(
  Schema.Struct({
    id: Schema.String,
    amount: Schema.Int,
    nanostar_amount: Schema.optionalKey(Schema.Int),
    date: Schema.Int,
    source: Schema.optionalKey(Schema.suspend((): Schema.Codec<TransactionPartner, unknown> => TransactionPartner)),
    receiver: Schema.optionalKey(Schema.suspend((): Schema.Codec<TransactionPartner, unknown> => TransactionPartner)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _StarTransactionDecoded = Schema.declare<StarTransaction>((input): input is StarTransaction => Predicate.isObject(input));
export const StarTransaction: Schema.Codec<StarTransaction, unknown> = _StarTransactionEncoded.pipe(
  Schema.decodeTo(_StarTransactionDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_StarTransactionPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_StarTransactionWireKeys)),
  }),
);

/** Contains a list of Telegram Star transactions. */
export interface StarTransactions {
  /** The list of transactions */
  readonly transactions: ReadonlyArray<StarTransaction>;
  readonly [key: string]: unknown;
}
export const StarTransactions: Schema.Codec<StarTransactions, unknown> = Schema.StructWithRest(
  Schema.Struct({
    transactions: Schema.Array(Schema.suspend((): Schema.Codec<StarTransaction, unknown> => StarTransaction)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object represents a sticker. */
export interface Sticker {
  /** Identifier for this file, which can be used to download or reuse the file */
  readonly fileId: string;
  /** Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file. */
  readonly fileUniqueId: string;
  /** Type of the sticker, currently one of “regular”, “mask”, “custom_emoji”. The type of the sticker is independent from its format, which is determined by the fields is_animated and is_video. */
  readonly type: StickerType;
  /** Sticker width */
  readonly width: number;
  /** Sticker height */
  readonly height: number;
  /** True, if the sticker is animated */
  readonly isAnimated: boolean;
  /** True, if the sticker is a video sticker */
  readonly isVideo: boolean;
  /** Optional. Sticker thumbnail in the .WEBP or .JPG format */
  readonly thumbnail?: PhotoSize;
  /** Optional. Emoji associated with the sticker */
  readonly emoji?: string;
  /** Optional. Name of the sticker set to which the sticker belongs */
  readonly setName?: string;
  /** Optional. For premium regular stickers, premium animation for the sticker */
  readonly premiumAnimation?: File;
  /** Optional. For mask stickers, the position where the mask should be placed */
  readonly maskPosition?: MaskPosition;
  /** Optional. For custom emoji stickers, unique identifier of the custom emoji */
  readonly customEmojiId?: string;
  /** Optional. True, if the sticker must be repainted to a text color in messages, the color of the Telegram Premium badge in emoji status, white color on chat photos, or another appropriate color in other places */
  readonly needsRepainting?: true;
  /** Optional. File size in bytes */
  readonly fileSize?: number;
  readonly [key: string]: unknown;
}
const _StickerPublicKeys = { file_id: "fileId", file_unique_id: "fileUniqueId", is_animated: "isAnimated", is_video: "isVideo", set_name: "setName", premium_animation: "premiumAnimation", mask_position: "maskPosition", custom_emoji_id: "customEmojiId", needs_repainting: "needsRepainting", file_size: "fileSize" } as const;
const _StickerWireKeys = invertKeys(_StickerPublicKeys);
const _StickerEncoded = Schema.StructWithRest(
  Schema.Struct({
    file_id: Schema.String,
    file_unique_id: Schema.String,
    type: Schema.suspend((): Schema.Codec<StickerType, unknown> => StickerType),
    width: Schema.Int,
    height: Schema.Int,
    is_animated: Schema.Boolean,
    is_video: Schema.Boolean,
    thumbnail: Schema.optionalKey(Schema.suspend((): Schema.Codec<PhotoSize, unknown> => PhotoSize)),
    emoji: Schema.optionalKey(Schema.String),
    set_name: Schema.optionalKey(Schema.String),
    premium_animation: Schema.optionalKey(Schema.suspend((): Schema.Codec<File, unknown> => File)),
    mask_position: Schema.optionalKey(Schema.suspend((): Schema.Codec<MaskPosition, unknown> => MaskPosition)),
    custom_emoji_id: Schema.optionalKey(Schema.String),
    needs_repainting: Schema.optionalKey(Schema.Literal(true)),
    file_size: Schema.optionalKey(Schema.Int),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _StickerDecoded = Schema.declare<Sticker>((input): input is Sticker => Predicate.isObject(input));
export const Sticker: Schema.Codec<Sticker, unknown> = _StickerEncoded.pipe(
  Schema.decodeTo(_StickerDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_StickerPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_StickerWireKeys)),
  }),
);

/** This object represents a sticker set. */
export interface StickerSet {
  /** Sticker set name */
  readonly name: string;
  /** Sticker set title */
  readonly title: string;
  /** Type of stickers in the set, currently one of “regular”, “mask”, “custom_emoji” */
  readonly stickerType: StickerType;
  /** List of all set stickers */
  readonly stickers: ReadonlyArray<Sticker>;
  /** Optional. Sticker set thumbnail in the .WEBP, .TGS, or .WEBM format */
  readonly thumbnail?: PhotoSize;
  readonly [key: string]: unknown;
}
const _StickerSetPublicKeys = { sticker_type: "stickerType" } as const;
const _StickerSetWireKeys = invertKeys(_StickerSetPublicKeys);
const _StickerSetEncoded = Schema.StructWithRest(
  Schema.Struct({
    name: Schema.String,
    title: Schema.String,
    sticker_type: Schema.suspend((): Schema.Codec<StickerType, unknown> => StickerType),
    stickers: Schema.Array(Schema.suspend((): Schema.Codec<Sticker, unknown> => Sticker)),
    thumbnail: Schema.optionalKey(Schema.suspend((): Schema.Codec<PhotoSize, unknown> => PhotoSize)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _StickerSetDecoded = Schema.declare<StickerSet>((input): input is StickerSet => Predicate.isObject(input));
export const StickerSet: Schema.Codec<StickerSet, unknown> = _StickerSetEncoded.pipe(
  Schema.decodeTo(_StickerSetDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_StickerSetPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_StickerSetWireKeys)),
  }),
);

/** This object represents a story. */
export interface Story {
  /** Chat that posted the story */
  readonly chat: Chat;
  /** Unique identifier for the story in the chat */
  readonly id: number;
  readonly [key: string]: unknown;
}
export const Story: Schema.Codec<Story, unknown> = Schema.StructWithRest(
  Schema.Struct({
    chat: Schema.suspend((): Schema.Codec<Chat, unknown> => Chat),
    id: Schema.Int,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Describes a clickable area on a story media. */
export interface StoryArea {
  /** Position of the area */
  readonly position: StoryAreaPosition;
  /** Type of the area */
  readonly type: StoryAreaType;
  readonly [key: string]: unknown;
}
export const StoryArea: Schema.Codec<StoryArea, unknown> = Schema.StructWithRest(
  Schema.Struct({
    position: Schema.suspend((): Schema.Codec<StoryAreaPosition, unknown> => StoryAreaPosition),
    type: Schema.suspend((): Schema.Codec<StoryAreaType, unknown> => StoryAreaType),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Describes the position of a clickable area within a story. */
export interface StoryAreaPosition {
  /** The abscissa of the area's center, as a percentage of the media width */
  readonly xPercentage: number;
  /** The ordinate of the area's center, as a percentage of the media height */
  readonly yPercentage: number;
  /** The width of the area's rectangle, as a percentage of the media width */
  readonly widthPercentage: number;
  /** The height of the area's rectangle, as a percentage of the media height */
  readonly heightPercentage: number;
  /** The clockwise rotation angle of the rectangle, in degrees; 0-360 */
  readonly rotationAngle: number;
  /** The radius of the rectangle corner rounding, as a percentage of the media width */
  readonly cornerRadiusPercentage: number;
  readonly [key: string]: unknown;
}
const _StoryAreaPositionPublicKeys = { x_percentage: "xPercentage", y_percentage: "yPercentage", width_percentage: "widthPercentage", height_percentage: "heightPercentage", rotation_angle: "rotationAngle", corner_radius_percentage: "cornerRadiusPercentage" } as const;
const _StoryAreaPositionWireKeys = invertKeys(_StoryAreaPositionPublicKeys);
const _StoryAreaPositionEncoded = Schema.StructWithRest(
  Schema.Struct({
    x_percentage: Schema.Number,
    y_percentage: Schema.Number,
    width_percentage: Schema.Number,
    height_percentage: Schema.Number,
    rotation_angle: Schema.Number,
    corner_radius_percentage: Schema.Number,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _StoryAreaPositionDecoded = Schema.declare<StoryAreaPosition>((input): input is StoryAreaPosition => Predicate.isObject(input));
export const StoryAreaPosition: Schema.Codec<StoryAreaPosition, unknown> = _StoryAreaPositionEncoded.pipe(
  Schema.decodeTo(_StoryAreaPositionDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_StoryAreaPositionPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_StoryAreaPositionWireKeys)),
  }),
);

/** Describes the type of a clickable area on a story. Currently, it can be one of */
export type StoryAreaType = StoryAreaTypeLocation | StoryAreaTypeSuggestedReaction | StoryAreaTypeLink | StoryAreaTypeWeather | StoryAreaTypeUniqueGift;
export const StoryAreaType: Schema.Codec<StoryAreaType, unknown> = Schema.Union([Schema.suspend((): Schema.Codec<StoryAreaTypeLocation, unknown> => StoryAreaTypeLocation), Schema.suspend((): Schema.Codec<StoryAreaTypeSuggestedReaction, unknown> => StoryAreaTypeSuggestedReaction), Schema.suspend((): Schema.Codec<StoryAreaTypeLink, unknown> => StoryAreaTypeLink), Schema.suspend((): Schema.Codec<StoryAreaTypeWeather, unknown> => StoryAreaTypeWeather), Schema.suspend((): Schema.Codec<StoryAreaTypeUniqueGift, unknown> => StoryAreaTypeUniqueGift)]);

/** Describes a story area pointing to an HTTP or tg:// link. Currently, a story can have up to 3 link areas. */
export interface StoryAreaTypeLink {
  /** Type of the area, always “link” */
  readonly type: "link";
  /** HTTP or tg:// URL to be opened when the area is clicked */
  readonly url: string;
  readonly [key: string]: unknown;
}
export const StoryAreaTypeLink: Schema.Codec<StoryAreaTypeLink, unknown> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("link"),
    url: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Describes a story area pointing to a location. Currently, a story can have up to 10 location areas. */
export interface StoryAreaTypeLocation {
  /** Type of the area, always “location” */
  readonly type: "location";
  /** Location latitude in degrees */
  readonly latitude: number;
  /** Location longitude in degrees */
  readonly longitude: number;
  /** Optional. Address of the location */
  readonly address?: LocationAddress;
  readonly [key: string]: unknown;
}
export const StoryAreaTypeLocation: Schema.Codec<StoryAreaTypeLocation, unknown> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("location"),
    latitude: Schema.Number,
    longitude: Schema.Number,
    address: Schema.optionalKey(Schema.suspend((): Schema.Codec<LocationAddress, unknown> => LocationAddress)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Describes a story area pointing to a suggested reaction. Currently, a story can have up to 5 suggested reaction areas. */
export interface StoryAreaTypeSuggestedReaction {
  /** Type of the area, always “suggested_reaction” */
  readonly type: "suggested_reaction";
  /** Type of the reaction */
  readonly reactionType: ReactionType;
  /** Optional. Pass True if the reaction area has a dark background */
  readonly isDark?: boolean;
  /** Optional. Pass True if reaction area corner is flipped */
  readonly isFlipped?: boolean;
  readonly [key: string]: unknown;
}
const _StoryAreaTypeSuggestedReactionPublicKeys = { reaction_type: "reactionType", is_dark: "isDark", is_flipped: "isFlipped" } as const;
const _StoryAreaTypeSuggestedReactionWireKeys = invertKeys(_StoryAreaTypeSuggestedReactionPublicKeys);
const _StoryAreaTypeSuggestedReactionEncoded = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("suggested_reaction"),
    reaction_type: Schema.suspend((): Schema.Codec<ReactionType, unknown> => ReactionType),
    is_dark: Schema.optionalKey(Schema.Boolean),
    is_flipped: Schema.optionalKey(Schema.Boolean),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _StoryAreaTypeSuggestedReactionDecoded = Schema.declare<StoryAreaTypeSuggestedReaction>((input): input is StoryAreaTypeSuggestedReaction => Predicate.isObject(input));
export const StoryAreaTypeSuggestedReaction: Schema.Codec<StoryAreaTypeSuggestedReaction, unknown> = _StoryAreaTypeSuggestedReactionEncoded.pipe(
  Schema.decodeTo(_StoryAreaTypeSuggestedReactionDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_StoryAreaTypeSuggestedReactionPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_StoryAreaTypeSuggestedReactionWireKeys)),
  }),
);

/** Describes a story area pointing to a unique gift. Currently, a story can have at most 1 unique gift area. */
export interface StoryAreaTypeUniqueGift {
  /** Type of the area, always “unique_gift” */
  readonly type: "unique_gift";
  /** Unique name of the gift */
  readonly name: string;
  readonly [key: string]: unknown;
}
export const StoryAreaTypeUniqueGift: Schema.Codec<StoryAreaTypeUniqueGift, unknown> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("unique_gift"),
    name: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Describes a story area containing weather information. Currently, a story can have up to 3 weather areas. */
export interface StoryAreaTypeWeather {
  /** Type of the area, always “weather” */
  readonly type: "weather";
  /** Temperature, in degree Celsius */
  readonly temperature: number;
  /** Emoji representing the weather */
  readonly emoji: string;
  /** A color of the area background in the ARGB format */
  readonly backgroundColor: number;
  readonly [key: string]: unknown;
}
const _StoryAreaTypeWeatherPublicKeys = { background_color: "backgroundColor" } as const;
const _StoryAreaTypeWeatherWireKeys = invertKeys(_StoryAreaTypeWeatherPublicKeys);
const _StoryAreaTypeWeatherEncoded = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("weather"),
    temperature: Schema.Number,
    emoji: Schema.String,
    background_color: Schema.Int,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _StoryAreaTypeWeatherDecoded = Schema.declare<StoryAreaTypeWeather>((input): input is StoryAreaTypeWeather => Predicate.isObject(input));
export const StoryAreaTypeWeather: Schema.Codec<StoryAreaTypeWeather, unknown> = _StoryAreaTypeWeatherEncoded.pipe(
  Schema.decodeTo(_StoryAreaTypeWeatherDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_StoryAreaTypeWeatherPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_StoryAreaTypeWeatherWireKeys)),
  }),
);

/** This object contains basic information about a successful payment. Note that if the buyer initiates a chargeback with the relevant payment provider following this transaction, the funds may be debited from your balance. This is outside of Telegram's control. */
export interface SuccessfulPayment {
  /** Three-letter ISO 4217 currency code, or “XTR” for payments in Telegram Stars */
  readonly currency: string;
  /** Total price in the smallest units of the currency (integer, not float/double). For example, for a price of US$ 1.45 pass amount = 145. See the exp parameter in currencies.json, it shows the number of digits past the decimal point for each currency (2 for the majority of currencies). */
  readonly totalAmount: number;
  /** Bot-specified invoice payload */
  readonly invoicePayload: string;
  /** Optional. Expiration date of the subscription, in Unix time; for recurring payments only */
  readonly subscriptionExpirationDate?: number;
  /** Optional. True, if the payment is a recurring payment for a subscription */
  readonly isRecurring?: true;
  /** Optional. True, if the payment is the first payment for a subscription */
  readonly isFirstRecurring?: true;
  /** Optional. Identifier of the shipping option chosen by the user */
  readonly shippingOptionId?: string;
  /** Optional. Order information provided by the user */
  readonly orderInfo?: OrderInfo;
  /** Telegram payment identifier */
  readonly telegramPaymentChargeId: string;
  /** Provider payment identifier */
  readonly providerPaymentChargeId: string;
  readonly [key: string]: unknown;
}
const _SuccessfulPaymentPublicKeys = { total_amount: "totalAmount", invoice_payload: "invoicePayload", subscription_expiration_date: "subscriptionExpirationDate", is_recurring: "isRecurring", is_first_recurring: "isFirstRecurring", shipping_option_id: "shippingOptionId", order_info: "orderInfo", telegram_payment_charge_id: "telegramPaymentChargeId", provider_payment_charge_id: "providerPaymentChargeId" } as const;
const _SuccessfulPaymentWireKeys = invertKeys(_SuccessfulPaymentPublicKeys);
const _SuccessfulPaymentEncoded = Schema.StructWithRest(
  Schema.Struct({
    currency: Schema.String,
    total_amount: Schema.Int,
    invoice_payload: Schema.String,
    subscription_expiration_date: Schema.optionalKey(Schema.Int),
    is_recurring: Schema.optionalKey(Schema.Literal(true)),
    is_first_recurring: Schema.optionalKey(Schema.Literal(true)),
    shipping_option_id: Schema.optionalKey(Schema.String),
    order_info: Schema.optionalKey(Schema.suspend((): Schema.Codec<OrderInfo, unknown> => OrderInfo)),
    telegram_payment_charge_id: Schema.String,
    provider_payment_charge_id: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _SuccessfulPaymentDecoded = Schema.declare<SuccessfulPayment>((input): input is SuccessfulPayment => Predicate.isObject(input));
export const SuccessfulPayment: Schema.Codec<SuccessfulPayment, unknown> = _SuccessfulPaymentEncoded.pipe(
  Schema.decodeTo(_SuccessfulPaymentDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_SuccessfulPaymentPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_SuccessfulPaymentWireKeys)),
  }),
);

/** Describes a service message about the failed approval of a suggested post. Currently, only caused by insufficient user funds at the time of approval. */
export interface SuggestedPostApprovalFailed {
  /** Optional. Message containing the suggested post whose approval has failed. Note that the Message object in this field will not contain the reply_to_message field even if it itself is a reply. */
  readonly suggestedPostMessage?: Message;
  /** Expected price of the post */
  readonly price: SuggestedPostPrice;
  readonly [key: string]: unknown;
}
const _SuggestedPostApprovalFailedPublicKeys = { suggested_post_message: "suggestedPostMessage" } as const;
const _SuggestedPostApprovalFailedWireKeys = invertKeys(_SuggestedPostApprovalFailedPublicKeys);
const _SuggestedPostApprovalFailedEncoded = Schema.StructWithRest(
  Schema.Struct({
    suggested_post_message: Schema.optionalKey(Schema.suspend((): Schema.Codec<Message, unknown> => Message)),
    price: Schema.suspend((): Schema.Codec<SuggestedPostPrice, unknown> => SuggestedPostPrice),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _SuggestedPostApprovalFailedDecoded = Schema.declare<SuggestedPostApprovalFailed>((input): input is SuggestedPostApprovalFailed => Predicate.isObject(input));
export const SuggestedPostApprovalFailed: Schema.Codec<SuggestedPostApprovalFailed, unknown> = _SuggestedPostApprovalFailedEncoded.pipe(
  Schema.decodeTo(_SuggestedPostApprovalFailedDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_SuggestedPostApprovalFailedPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_SuggestedPostApprovalFailedWireKeys)),
  }),
);

/** Describes a service message about the approval of a suggested post. */
export interface SuggestedPostApproved {
  /** Optional. Message containing the suggested post. Note that the Message object in this field will not contain the reply_to_message field even if it itself is a reply. */
  readonly suggestedPostMessage?: Message;
  /** Optional. Amount paid for the post */
  readonly price?: SuggestedPostPrice;
  /** Date when the post will be published */
  readonly sendDate: number;
  readonly [key: string]: unknown;
}
const _SuggestedPostApprovedPublicKeys = { suggested_post_message: "suggestedPostMessage", send_date: "sendDate" } as const;
const _SuggestedPostApprovedWireKeys = invertKeys(_SuggestedPostApprovedPublicKeys);
const _SuggestedPostApprovedEncoded = Schema.StructWithRest(
  Schema.Struct({
    suggested_post_message: Schema.optionalKey(Schema.suspend((): Schema.Codec<Message, unknown> => Message)),
    price: Schema.optionalKey(Schema.suspend((): Schema.Codec<SuggestedPostPrice, unknown> => SuggestedPostPrice)),
    send_date: Schema.Int,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _SuggestedPostApprovedDecoded = Schema.declare<SuggestedPostApproved>((input): input is SuggestedPostApproved => Predicate.isObject(input));
export const SuggestedPostApproved: Schema.Codec<SuggestedPostApproved, unknown> = _SuggestedPostApprovedEncoded.pipe(
  Schema.decodeTo(_SuggestedPostApprovedDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_SuggestedPostApprovedPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_SuggestedPostApprovedWireKeys)),
  }),
);

/** Describes a service message about the rejection of a suggested post. */
export interface SuggestedPostDeclined {
  /** Optional. Message containing the suggested post. Note that the Message object in this field will not contain the reply_to_message field even if it itself is a reply. */
  readonly suggestedPostMessage?: Message;
  /** Optional. Comment with which the post was declined */
  readonly comment?: string;
  readonly [key: string]: unknown;
}
const _SuggestedPostDeclinedPublicKeys = { suggested_post_message: "suggestedPostMessage" } as const;
const _SuggestedPostDeclinedWireKeys = invertKeys(_SuggestedPostDeclinedPublicKeys);
const _SuggestedPostDeclinedEncoded = Schema.StructWithRest(
  Schema.Struct({
    suggested_post_message: Schema.optionalKey(Schema.suspend((): Schema.Codec<Message, unknown> => Message)),
    comment: Schema.optionalKey(Schema.String),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _SuggestedPostDeclinedDecoded = Schema.declare<SuggestedPostDeclined>((input): input is SuggestedPostDeclined => Predicate.isObject(input));
export const SuggestedPostDeclined: Schema.Codec<SuggestedPostDeclined, unknown> = _SuggestedPostDeclinedEncoded.pipe(
  Schema.decodeTo(_SuggestedPostDeclinedDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_SuggestedPostDeclinedPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_SuggestedPostDeclinedWireKeys)),
  }),
);

/** Contains information about a suggested post. */
export interface SuggestedPostInfo {
  /** State of the suggested post. Currently, it can be one of “pending”, “approved”, “declined”. */
  readonly state: string;
  /** Optional. Proposed price of the post. If the field is omitted, then the post is unpaid. */
  readonly price?: SuggestedPostPrice;
  /** Optional. Proposed send date of the post. If the field is omitted, then the post can be published at any time within 30 days at the sole discretion of the user or administrator who approves it. */
  readonly sendDate?: number;
  readonly [key: string]: unknown;
}
const _SuggestedPostInfoPublicKeys = { send_date: "sendDate" } as const;
const _SuggestedPostInfoWireKeys = invertKeys(_SuggestedPostInfoPublicKeys);
const _SuggestedPostInfoEncoded = Schema.StructWithRest(
  Schema.Struct({
    state: Schema.String,
    price: Schema.optionalKey(Schema.suspend((): Schema.Codec<SuggestedPostPrice, unknown> => SuggestedPostPrice)),
    send_date: Schema.optionalKey(Schema.Int),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _SuggestedPostInfoDecoded = Schema.declare<SuggestedPostInfo>((input): input is SuggestedPostInfo => Predicate.isObject(input));
export const SuggestedPostInfo: Schema.Codec<SuggestedPostInfo, unknown> = _SuggestedPostInfoEncoded.pipe(
  Schema.decodeTo(_SuggestedPostInfoDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_SuggestedPostInfoPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_SuggestedPostInfoWireKeys)),
  }),
);

/** Describes a service message about a successful payment for a suggested post. */
export interface SuggestedPostPaid {
  /** Optional. Message containing the suggested post. Note that the Message object in this field will not contain the reply_to_message field even if it itself is a reply. */
  readonly suggestedPostMessage?: Message;
  /** Currency in which the payment was made. Currently, one of “XTR” for Telegram Stars or “TON” for TON grams. */
  readonly currency: string;
  /** Optional. The amount of the currency that was received by the channel in nanograms; for payments in TON grams only */
  readonly amount?: number;
  /** Optional. The amount of Telegram Stars that was received by the channel; for payments in Telegram Stars only */
  readonly starAmount?: StarAmount;
  readonly [key: string]: unknown;
}
const _SuggestedPostPaidPublicKeys = { suggested_post_message: "suggestedPostMessage", star_amount: "starAmount" } as const;
const _SuggestedPostPaidWireKeys = invertKeys(_SuggestedPostPaidPublicKeys);
const _SuggestedPostPaidEncoded = Schema.StructWithRest(
  Schema.Struct({
    suggested_post_message: Schema.optionalKey(Schema.suspend((): Schema.Codec<Message, unknown> => Message)),
    currency: Schema.String,
    amount: Schema.optionalKey(Schema.Int),
    star_amount: Schema.optionalKey(Schema.suspend((): Schema.Codec<StarAmount, unknown> => StarAmount)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _SuggestedPostPaidDecoded = Schema.declare<SuggestedPostPaid>((input): input is SuggestedPostPaid => Predicate.isObject(input));
export const SuggestedPostPaid: Schema.Codec<SuggestedPostPaid, unknown> = _SuggestedPostPaidEncoded.pipe(
  Schema.decodeTo(_SuggestedPostPaidDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_SuggestedPostPaidPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_SuggestedPostPaidWireKeys)),
  }),
);

/** Contains parameters of a post that is being suggested by the bot. */
export interface SuggestedPostParameters {
  /** Optional. Proposed price for the post. If the field is omitted, then the post is unpaid. */
  readonly price?: SuggestedPostPrice;
  /** Optional. Proposed send date of the post. If specified, then the date must be between 300 second and 2678400 seconds (30 days) in the future. If the field is omitted, then the post can be published at any time within 30 days at the sole discretion of the user who approves it. */
  readonly sendDate?: number;
  readonly [key: string]: unknown;
}
const _SuggestedPostParametersPublicKeys = { send_date: "sendDate" } as const;
const _SuggestedPostParametersWireKeys = invertKeys(_SuggestedPostParametersPublicKeys);
const _SuggestedPostParametersEncoded = Schema.StructWithRest(
  Schema.Struct({
    price: Schema.optionalKey(Schema.suspend((): Schema.Codec<SuggestedPostPrice, unknown> => SuggestedPostPrice)),
    send_date: Schema.optionalKey(Schema.Int),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _SuggestedPostParametersDecoded = Schema.declare<SuggestedPostParameters>((input): input is SuggestedPostParameters => Predicate.isObject(input));
export const SuggestedPostParameters: Schema.Codec<SuggestedPostParameters, unknown> = _SuggestedPostParametersEncoded.pipe(
  Schema.decodeTo(_SuggestedPostParametersDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_SuggestedPostParametersPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_SuggestedPostParametersWireKeys)),
  }),
);

/** Describes the price of a suggested post. */
export interface SuggestedPostPrice {
  /** Currency in which the post will be paid. Currently, must be one of “XTR” for Telegram Stars or “TON” for TON grams. */
  readonly currency: string;
  /** The amount of the currency that will be paid for the post in the smallest units of the currency, i.e. Telegram Stars or nanograms. Currently, price in Telegram Stars must be between 5 and 100000, and price in nanograms must be between 10000000 and 10000000000000. */
  readonly amount: number;
  readonly [key: string]: unknown;
}
export const SuggestedPostPrice: Schema.Codec<SuggestedPostPrice, unknown> = Schema.StructWithRest(
  Schema.Struct({
    currency: Schema.String,
    amount: Schema.Int,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Describes a service message about a payment refund for a suggested post. */
export interface SuggestedPostRefunded {
  /** Optional. Message containing the suggested post. Note that the Message object in this field will not contain the reply_to_message field even if it itself is a reply. */
  readonly suggestedPostMessage?: Message;
  /** Reason for the refund. Currently, one of “post_deleted” if the post was deleted within 24 hours of being posted or removed from scheduled messages without being posted, or “payment_refunded” if the payer refunded their payment. */
  readonly reason: string;
  readonly [key: string]: unknown;
}
const _SuggestedPostRefundedPublicKeys = { suggested_post_message: "suggestedPostMessage" } as const;
const _SuggestedPostRefundedWireKeys = invertKeys(_SuggestedPostRefundedPublicKeys);
const _SuggestedPostRefundedEncoded = Schema.StructWithRest(
  Schema.Struct({
    suggested_post_message: Schema.optionalKey(Schema.suspend((): Schema.Codec<Message, unknown> => Message)),
    reason: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _SuggestedPostRefundedDecoded = Schema.declare<SuggestedPostRefunded>((input): input is SuggestedPostRefunded => Predicate.isObject(input));
export const SuggestedPostRefunded: Schema.Codec<SuggestedPostRefunded, unknown> = _SuggestedPostRefundedEncoded.pipe(
  Schema.decodeTo(_SuggestedPostRefundedDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_SuggestedPostRefundedPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_SuggestedPostRefundedWireKeys)),
  }),
);

/** This object represents an inline button that switches the current user to inline mode in a chosen chat, with an optional default inline query. */
export interface SwitchInlineQueryChosenChat {
  /** Optional. The default inline query to be inserted in the input field. If left empty, only the bot's username will be inserted. */
  readonly query?: string;
  /** Optional. True, if private chats with users can be chosen */
  readonly allowUserChats?: boolean;
  /** Optional. True, if private chats with bots can be chosen */
  readonly allowBotChats?: boolean;
  /** Optional. True, if group and supergroup chats can be chosen */
  readonly allowGroupChats?: boolean;
  /** Optional. True, if channel chats can be chosen */
  readonly allowChannelChats?: boolean;
  readonly [key: string]: unknown;
}
const _SwitchInlineQueryChosenChatPublicKeys = { allow_user_chats: "allowUserChats", allow_bot_chats: "allowBotChats", allow_group_chats: "allowGroupChats", allow_channel_chats: "allowChannelChats" } as const;
const _SwitchInlineQueryChosenChatWireKeys = invertKeys(_SwitchInlineQueryChosenChatPublicKeys);
const _SwitchInlineQueryChosenChatEncoded = Schema.StructWithRest(
  Schema.Struct({
    query: Schema.optionalKey(Schema.String),
    allow_user_chats: Schema.optionalKey(Schema.Boolean),
    allow_bot_chats: Schema.optionalKey(Schema.Boolean),
    allow_group_chats: Schema.optionalKey(Schema.Boolean),
    allow_channel_chats: Schema.optionalKey(Schema.Boolean),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _SwitchInlineQueryChosenChatDecoded = Schema.declare<SwitchInlineQueryChosenChat>((input): input is SwitchInlineQueryChosenChat => Predicate.isObject(input));
export const SwitchInlineQueryChosenChat: Schema.Codec<SwitchInlineQueryChosenChat, unknown> = _SwitchInlineQueryChosenChatEncoded.pipe(
  Schema.decodeTo(_SwitchInlineQueryChosenChatDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_SwitchInlineQueryChosenChatPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_SwitchInlineQueryChosenChatWireKeys)),
  }),
);

/** This object contains information about the quoted part of a message that is replied to by the given message. */
export interface TextQuote {
  /** Text of the quoted part of a message that is replied to by the given message */
  readonly text: string;
  /** Optional. Special entities that appear in the quote. Currently, only bold, italic, underline, strikethrough, spoiler, custom_emoji, and date_time entities are kept in quotes. */
  readonly entities?: ReadonlyArray<MessageEntity>;
  /** Approximate quote position in the original message in UTF-16 code units as specified by the sender */
  readonly position: number;
  /** Optional. True, if the quote was chosen manually by the message sender. Otherwise, the quote was added automatically by the server. */
  readonly isManual?: true;
  readonly [key: string]: unknown;
}
const _TextQuotePublicKeys = { is_manual: "isManual" } as const;
const _TextQuoteWireKeys = invertKeys(_TextQuotePublicKeys);
const _TextQuoteEncoded = Schema.StructWithRest(
  Schema.Struct({
    text: Schema.String,
    entities: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<MessageEntity, unknown> => MessageEntity))),
    position: Schema.Int,
    is_manual: Schema.optionalKey(Schema.Literal(true)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _TextQuoteDecoded = Schema.declare<TextQuote>((input): input is TextQuote => Predicate.isObject(input));
export const TextQuote: Schema.Codec<TextQuote, unknown> = _TextQuoteEncoded.pipe(
  Schema.decodeTo(_TextQuoteDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_TextQuotePublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_TextQuoteWireKeys)),
  }),
);

/** This object describes the source of a transaction, or its recipient for outgoing transactions. Currently, it can be one of */
export type TransactionPartner = TransactionPartnerUser | TransactionPartnerChat | TransactionPartnerAffiliateProgram | TransactionPartnerFragment | TransactionPartnerTelegramAds | TransactionPartnerTelegramApi | TransactionPartnerOther;
export const TransactionPartner: Schema.Codec<TransactionPartner, unknown> = Schema.Union([Schema.suspend((): Schema.Codec<TransactionPartnerUser, unknown> => TransactionPartnerUser), Schema.suspend((): Schema.Codec<TransactionPartnerChat, unknown> => TransactionPartnerChat), Schema.suspend((): Schema.Codec<TransactionPartnerAffiliateProgram, unknown> => TransactionPartnerAffiliateProgram), Schema.suspend((): Schema.Codec<TransactionPartnerFragment, unknown> => TransactionPartnerFragment), Schema.suspend((): Schema.Codec<TransactionPartnerTelegramAds, unknown> => TransactionPartnerTelegramAds), Schema.suspend((): Schema.Codec<TransactionPartnerTelegramApi, unknown> => TransactionPartnerTelegramApi), Schema.suspend((): Schema.Codec<TransactionPartnerOther, unknown> => TransactionPartnerOther)]);

/** Describes the affiliate program that issued the affiliate commission received via this transaction. */
export interface TransactionPartnerAffiliateProgram {
  /** Type of the transaction partner, always “affiliate_program” */
  readonly type: "affiliate_program";
  /** Optional. Information about the bot that sponsored the affiliate program */
  readonly sponsorUser?: User;
  /** The number of Telegram Stars received by the bot for each 1000 Telegram Stars received by the affiliate program sponsor from referred users */
  readonly commissionPerMille: number;
  readonly [key: string]: unknown;
}
const _TransactionPartnerAffiliateProgramPublicKeys = { sponsor_user: "sponsorUser", commission_per_mille: "commissionPerMille" } as const;
const _TransactionPartnerAffiliateProgramWireKeys = invertKeys(_TransactionPartnerAffiliateProgramPublicKeys);
const _TransactionPartnerAffiliateProgramEncoded = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("affiliate_program"),
    sponsor_user: Schema.optionalKey(Schema.suspend((): Schema.Codec<User, unknown> => User)),
    commission_per_mille: Schema.Int,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _TransactionPartnerAffiliateProgramDecoded = Schema.declare<TransactionPartnerAffiliateProgram>((input): input is TransactionPartnerAffiliateProgram => Predicate.isObject(input));
export const TransactionPartnerAffiliateProgram: Schema.Codec<TransactionPartnerAffiliateProgram, unknown> = _TransactionPartnerAffiliateProgramEncoded.pipe(
  Schema.decodeTo(_TransactionPartnerAffiliateProgramDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_TransactionPartnerAffiliateProgramPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_TransactionPartnerAffiliateProgramWireKeys)),
  }),
);

/** Describes a transaction with a chat. */
export interface TransactionPartnerChat {
  /** Type of the transaction partner, always “chat” */
  readonly type: "chat";
  /** Information about the chat */
  readonly chat: Chat;
  /** Optional. The gift sent to the chat by the bot */
  readonly gift?: Gift;
  readonly [key: string]: unknown;
}
export const TransactionPartnerChat: Schema.Codec<TransactionPartnerChat, unknown> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("chat"),
    chat: Schema.suspend((): Schema.Codec<Chat, unknown> => Chat),
    gift: Schema.optionalKey(Schema.suspend((): Schema.Codec<Gift, unknown> => Gift)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Describes a withdrawal transaction with Fragment. */
export interface TransactionPartnerFragment {
  /** Type of the transaction partner, always “fragment” */
  readonly type: "fragment";
  /** Optional. State of the transaction if the transaction is outgoing */
  readonly withdrawalState?: RevenueWithdrawalState;
  readonly [key: string]: unknown;
}
const _TransactionPartnerFragmentPublicKeys = { withdrawal_state: "withdrawalState" } as const;
const _TransactionPartnerFragmentWireKeys = invertKeys(_TransactionPartnerFragmentPublicKeys);
const _TransactionPartnerFragmentEncoded = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("fragment"),
    withdrawal_state: Schema.optionalKey(Schema.suspend((): Schema.Codec<RevenueWithdrawalState, unknown> => RevenueWithdrawalState)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _TransactionPartnerFragmentDecoded = Schema.declare<TransactionPartnerFragment>((input): input is TransactionPartnerFragment => Predicate.isObject(input));
export const TransactionPartnerFragment: Schema.Codec<TransactionPartnerFragment, unknown> = _TransactionPartnerFragmentEncoded.pipe(
  Schema.decodeTo(_TransactionPartnerFragmentDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_TransactionPartnerFragmentPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_TransactionPartnerFragmentWireKeys)),
  }),
);

/** Describes a transaction with an unknown source or recipient. */
export interface TransactionPartnerOther {
  /** Type of the transaction partner, always “other” */
  readonly type: "other";
  readonly [key: string]: unknown;
}
export const TransactionPartnerOther: Schema.Codec<TransactionPartnerOther, unknown> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("other"),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Describes a withdrawal transaction to the Telegram Ads platform. */
export interface TransactionPartnerTelegramAds {
  /** Type of the transaction partner, always “telegram_ads” */
  readonly type: "telegram_ads";
  readonly [key: string]: unknown;
}
export const TransactionPartnerTelegramAds: Schema.Codec<TransactionPartnerTelegramAds, unknown> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("telegram_ads"),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Describes a transaction with payment for paid broadcasting. */
export interface TransactionPartnerTelegramApi {
  /** Type of the transaction partner, always “telegram_api” */
  readonly type: "telegram_api";
  /** The number of successful requests that exceeded regular limits and were therefore billed */
  readonly requestCount: number;
  readonly [key: string]: unknown;
}
const _TransactionPartnerTelegramApiPublicKeys = { request_count: "requestCount" } as const;
const _TransactionPartnerTelegramApiWireKeys = invertKeys(_TransactionPartnerTelegramApiPublicKeys);
const _TransactionPartnerTelegramApiEncoded = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("telegram_api"),
    request_count: Schema.Int,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _TransactionPartnerTelegramApiDecoded = Schema.declare<TransactionPartnerTelegramApi>((input): input is TransactionPartnerTelegramApi => Predicate.isObject(input));
export const TransactionPartnerTelegramApi: Schema.Codec<TransactionPartnerTelegramApi, unknown> = _TransactionPartnerTelegramApiEncoded.pipe(
  Schema.decodeTo(_TransactionPartnerTelegramApiDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_TransactionPartnerTelegramApiPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_TransactionPartnerTelegramApiWireKeys)),
  }),
);

/** Describes a transaction with a user. */
export interface TransactionPartnerUser {
  /** Type of the transaction partner, always “user” */
  readonly type: "user";
  /** Type of the transaction, currently one of “invoice_payment” for payments via invoices, “paid_media_payment” for payments for paid media, “gift_purchase” for gifts sent by the bot, “premium_purchase” for Telegram Premium subscriptions gifted by the bot, “business_account_transfer” for direct transfers from managed business accounts */
  readonly transactionType: string;
  /** Information about the user */
  readonly user: User;
  /** Optional. Information about the affiliate that received a commission via this transaction. Can be available only for “invoice_payment” and “paid_media_payment” transactions. */
  readonly affiliate?: AffiliateInfo;
  /** Optional. Bot-specified invoice payload. Can be available only for “invoice_payment” transactions. */
  readonly invoicePayload?: string;
  /** Optional. The duration of the paid subscription. Can be available only for “invoice_payment” transactions. */
  readonly subscriptionPeriod?: number;
  /** Optional. Information about the paid media bought by the user; for “paid_media_payment” transactions only */
  readonly paidMedia?: ReadonlyArray<PaidMedia>;
  /** Optional. Bot-specified paid media payload. Can be available only for “paid_media_payment” transactions. */
  readonly paidMediaPayload?: string;
  /** Optional. The gift sent to the user by the bot; for “gift_purchase” transactions only */
  readonly gift?: Gift;
  /** Optional. Number of months the gifted Telegram Premium subscription will be active for; for “premium_purchase” transactions only */
  readonly premiumSubscriptionDuration?: number;
  readonly [key: string]: unknown;
}
const _TransactionPartnerUserPublicKeys = { transaction_type: "transactionType", invoice_payload: "invoicePayload", subscription_period: "subscriptionPeriod", paid_media: "paidMedia", paid_media_payload: "paidMediaPayload", premium_subscription_duration: "premiumSubscriptionDuration" } as const;
const _TransactionPartnerUserWireKeys = invertKeys(_TransactionPartnerUserPublicKeys);
const _TransactionPartnerUserEncoded = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.Literal("user"),
    transaction_type: Schema.String,
    user: Schema.suspend((): Schema.Codec<User, unknown> => User),
    affiliate: Schema.optionalKey(Schema.suspend((): Schema.Codec<AffiliateInfo, unknown> => AffiliateInfo)),
    invoice_payload: Schema.optionalKey(Schema.String),
    subscription_period: Schema.optionalKey(Schema.Int),
    paid_media: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<PaidMedia, unknown> => PaidMedia))),
    paid_media_payload: Schema.optionalKey(Schema.String),
    gift: Schema.optionalKey(Schema.suspend((): Schema.Codec<Gift, unknown> => Gift)),
    premium_subscription_duration: Schema.optionalKey(Schema.Int),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _TransactionPartnerUserDecoded = Schema.declare<TransactionPartnerUser>((input): input is TransactionPartnerUser => Predicate.isObject(input));
export const TransactionPartnerUser: Schema.Codec<TransactionPartnerUser, unknown> = _TransactionPartnerUserEncoded.pipe(
  Schema.decodeTo(_TransactionPartnerUserDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_TransactionPartnerUserPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_TransactionPartnerUserWireKeys)),
  }),
);

/** This object describes a unique gift that was upgraded from a regular gift. */
export interface UniqueGift {
  /** Identifier of the regular gift from which the gift was upgraded */
  readonly giftId: string;
  /** Human-readable name of the regular gift from which this unique gift was upgraded */
  readonly baseName: string;
  /** Unique name of the gift. This name can be used in https://t.me/nft/... links and story areas. */
  readonly name: string;
  /** Unique number of the upgraded gift among gifts upgraded from the same regular gift */
  readonly number: number;
  /** Model of the gift */
  readonly model: UniqueGiftModel;
  /** Symbol of the gift */
  readonly symbol: UniqueGiftSymbol;
  /** Backdrop of the gift */
  readonly backdrop: UniqueGiftBackdrop;
  /** Optional. True, if the original regular gift was exclusively purchaseable by Telegram Premium subscribers */
  readonly isPremium?: true;
  /** Optional. True, if the gift was used to craft another gift and isn't available anymore */
  readonly isBurned?: true;
  /** Optional. True, if the gift is assigned from the TON blockchain and can't be resold or transferred in Telegram */
  readonly isFromBlockchain?: true;
  /** Optional. The color scheme that can be used by the gift's owner for the chat's name, replies to messages and link previews; for business account gifts and gifts that are currently on sale only */
  readonly colors?: UniqueGiftColors;
  /** Optional. Information about the chat that published the gift */
  readonly publisherChat?: Chat;
  readonly [key: string]: unknown;
}
const _UniqueGiftPublicKeys = { gift_id: "giftId", base_name: "baseName", is_premium: "isPremium", is_burned: "isBurned", is_from_blockchain: "isFromBlockchain", publisher_chat: "publisherChat" } as const;
const _UniqueGiftWireKeys = invertKeys(_UniqueGiftPublicKeys);
const _UniqueGiftEncoded = Schema.StructWithRest(
  Schema.Struct({
    gift_id: Schema.String,
    base_name: Schema.String,
    name: Schema.String,
    number: Schema.Int,
    model: Schema.suspend((): Schema.Codec<UniqueGiftModel, unknown> => UniqueGiftModel),
    symbol: Schema.suspend((): Schema.Codec<UniqueGiftSymbol, unknown> => UniqueGiftSymbol),
    backdrop: Schema.suspend((): Schema.Codec<UniqueGiftBackdrop, unknown> => UniqueGiftBackdrop),
    is_premium: Schema.optionalKey(Schema.Literal(true)),
    is_burned: Schema.optionalKey(Schema.Literal(true)),
    is_from_blockchain: Schema.optionalKey(Schema.Literal(true)),
    colors: Schema.optionalKey(Schema.suspend((): Schema.Codec<UniqueGiftColors, unknown> => UniqueGiftColors)),
    publisher_chat: Schema.optionalKey(Schema.suspend((): Schema.Codec<Chat, unknown> => Chat)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _UniqueGiftDecoded = Schema.declare<UniqueGift>((input): input is UniqueGift => Predicate.isObject(input));
export const UniqueGift: Schema.Codec<UniqueGift, unknown> = _UniqueGiftEncoded.pipe(
  Schema.decodeTo(_UniqueGiftDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_UniqueGiftPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_UniqueGiftWireKeys)),
  }),
);

/** This object describes the backdrop of a unique gift. */
export interface UniqueGiftBackdrop {
  /** Name of the backdrop */
  readonly name: string;
  /** Colors of the backdrop */
  readonly colors: UniqueGiftBackdropColors;
  /** The number of unique gifts that receive this backdrop for every 1000 gifts upgraded */
  readonly rarityPerMille: number;
  readonly [key: string]: unknown;
}
const _UniqueGiftBackdropPublicKeys = { rarity_per_mille: "rarityPerMille" } as const;
const _UniqueGiftBackdropWireKeys = invertKeys(_UniqueGiftBackdropPublicKeys);
const _UniqueGiftBackdropEncoded = Schema.StructWithRest(
  Schema.Struct({
    name: Schema.String,
    colors: Schema.suspend((): Schema.Codec<UniqueGiftBackdropColors, unknown> => UniqueGiftBackdropColors),
    rarity_per_mille: Schema.Int,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _UniqueGiftBackdropDecoded = Schema.declare<UniqueGiftBackdrop>((input): input is UniqueGiftBackdrop => Predicate.isObject(input));
export const UniqueGiftBackdrop: Schema.Codec<UniqueGiftBackdrop, unknown> = _UniqueGiftBackdropEncoded.pipe(
  Schema.decodeTo(_UniqueGiftBackdropDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_UniqueGiftBackdropPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_UniqueGiftBackdropWireKeys)),
  }),
);

/** This object describes the colors of the backdrop of a unique gift. */
export interface UniqueGiftBackdropColors {
  /** The color in the center of the backdrop in RGB format */
  readonly centerColor: number;
  /** The color on the edges of the backdrop in RGB format */
  readonly edgeColor: number;
  /** The color to be applied to the symbol in RGB format */
  readonly symbolColor: number;
  /** The color for the text on the backdrop in RGB format */
  readonly textColor: number;
  readonly [key: string]: unknown;
}
const _UniqueGiftBackdropColorsPublicKeys = { center_color: "centerColor", edge_color: "edgeColor", symbol_color: "symbolColor", text_color: "textColor" } as const;
const _UniqueGiftBackdropColorsWireKeys = invertKeys(_UniqueGiftBackdropColorsPublicKeys);
const _UniqueGiftBackdropColorsEncoded = Schema.StructWithRest(
  Schema.Struct({
    center_color: Schema.Int,
    edge_color: Schema.Int,
    symbol_color: Schema.Int,
    text_color: Schema.Int,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _UniqueGiftBackdropColorsDecoded = Schema.declare<UniqueGiftBackdropColors>((input): input is UniqueGiftBackdropColors => Predicate.isObject(input));
export const UniqueGiftBackdropColors: Schema.Codec<UniqueGiftBackdropColors, unknown> = _UniqueGiftBackdropColorsEncoded.pipe(
  Schema.decodeTo(_UniqueGiftBackdropColorsDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_UniqueGiftBackdropColorsPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_UniqueGiftBackdropColorsWireKeys)),
  }),
);

/** This object contains information about the color scheme for a user's name, message replies and link previews based on a unique gift. */
export interface UniqueGiftColors {
  /** Custom emoji identifier of the unique gift's model */
  readonly modelCustomEmojiId: string;
  /** Custom emoji identifier of the unique gift's symbol */
  readonly symbolCustomEmojiId: string;
  /** Main color used in light themes; RGB format */
  readonly lightThemeMainColor: number;
  /** List of 1-3 additional colors used in light themes; RGB format */
  readonly lightThemeOtherColors: ReadonlyArray<number>;
  /** Main color used in dark themes; RGB format */
  readonly darkThemeMainColor: number;
  /** List of 1-3 additional colors used in dark themes; RGB format */
  readonly darkThemeOtherColors: ReadonlyArray<number>;
  readonly [key: string]: unknown;
}
const _UniqueGiftColorsPublicKeys = { model_custom_emoji_id: "modelCustomEmojiId", symbol_custom_emoji_id: "symbolCustomEmojiId", light_theme_main_color: "lightThemeMainColor", light_theme_other_colors: "lightThemeOtherColors", dark_theme_main_color: "darkThemeMainColor", dark_theme_other_colors: "darkThemeOtherColors" } as const;
const _UniqueGiftColorsWireKeys = invertKeys(_UniqueGiftColorsPublicKeys);
const _UniqueGiftColorsEncoded = Schema.StructWithRest(
  Schema.Struct({
    model_custom_emoji_id: Schema.String,
    symbol_custom_emoji_id: Schema.String,
    light_theme_main_color: Schema.Int,
    light_theme_other_colors: Schema.Array(Schema.Int),
    dark_theme_main_color: Schema.Int,
    dark_theme_other_colors: Schema.Array(Schema.Int),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _UniqueGiftColorsDecoded = Schema.declare<UniqueGiftColors>((input): input is UniqueGiftColors => Predicate.isObject(input));
export const UniqueGiftColors: Schema.Codec<UniqueGiftColors, unknown> = _UniqueGiftColorsEncoded.pipe(
  Schema.decodeTo(_UniqueGiftColorsDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_UniqueGiftColorsPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_UniqueGiftColorsWireKeys)),
  }),
);

/** Describes a service message about a unique gift that was sent or received. */
export interface UniqueGiftInfo {
  /** Information about the gift */
  readonly gift: UniqueGift;
  /** Origin of the gift. Currently, either “upgrade” for gifts upgraded from regular gifts, “transfer” for gifts transferred from other users or channels, “resale” for gifts bought from other users, “gifted_upgrade” for upgrades purchased after the gift was sent, or “offer” for gifts bought or sold through gift purchase offers. */
  readonly origin: string;
  /** Optional. Text of the message that was added to the gift */
  readonly text?: string;
  /** Optional. Special entities that appear in the text */
  readonly entities?: ReadonlyArray<MessageEntity>;
  /** Optional. True, if the sender and gift text are shown only to the gift receiver; otherwise, everyone will be able to see them */
  readonly isPrivate?: true;
  /** Optional. For gifts bought from other users, the currency in which the payment for the gift was done. Currently, one of “XTR” for Telegram Stars or “TON” for TON grams. */
  readonly lastResaleCurrency?: string;
  /** Optional. For gifts bought from other users, the price paid for the gift in either Telegram Stars or nanograms */
  readonly lastResaleAmount?: number;
  /** Optional. Unique identifier of the received gift for the bot; only present for gifts received on behalf of business accounts */
  readonly ownedGiftId?: string;
  /** Optional. Number of Telegram Stars that must be paid to transfer the gift; omitted if the bot cannot transfer the gift */
  readonly transferStarCount?: number;
  /** Optional. Point in time (Unix timestamp) when the gift can be transferred. If it is in the past, then the gift can be transferred now. */
  readonly nextTransferDate?: number;
  readonly [key: string]: unknown;
}
const _UniqueGiftInfoPublicKeys = { is_private: "isPrivate", last_resale_currency: "lastResaleCurrency", last_resale_amount: "lastResaleAmount", owned_gift_id: "ownedGiftId", transfer_star_count: "transferStarCount", next_transfer_date: "nextTransferDate" } as const;
const _UniqueGiftInfoWireKeys = invertKeys(_UniqueGiftInfoPublicKeys);
const _UniqueGiftInfoEncoded = Schema.StructWithRest(
  Schema.Struct({
    gift: Schema.suspend((): Schema.Codec<UniqueGift, unknown> => UniqueGift),
    origin: Schema.String,
    text: Schema.optionalKey(Schema.String),
    entities: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<MessageEntity, unknown> => MessageEntity))),
    is_private: Schema.optionalKey(Schema.Literal(true)),
    last_resale_currency: Schema.optionalKey(Schema.String),
    last_resale_amount: Schema.optionalKey(Schema.Int),
    owned_gift_id: Schema.optionalKey(Schema.String),
    transfer_star_count: Schema.optionalKey(Schema.Int),
    next_transfer_date: Schema.optionalKey(Schema.Int),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _UniqueGiftInfoDecoded = Schema.declare<UniqueGiftInfo>((input): input is UniqueGiftInfo => Predicate.isObject(input));
export const UniqueGiftInfo: Schema.Codec<UniqueGiftInfo, unknown> = _UniqueGiftInfoEncoded.pipe(
  Schema.decodeTo(_UniqueGiftInfoDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_UniqueGiftInfoPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_UniqueGiftInfoWireKeys)),
  }),
);

/** This object describes the model of a unique gift. */
export interface UniqueGiftModel {
  /** Name of the model */
  readonly name: string;
  /** The sticker that represents the unique gift */
  readonly sticker: Sticker;
  /** The number of unique gifts that receive this model for every 1000 gift upgrades. Always 0 for crafted gifts. */
  readonly rarityPerMille: number;
  /** Optional. Rarity of the model if it is a crafted model. Currently, can be “uncommon”, “rare”, “epic”, or “legendary”. */
  readonly rarity?: string;
  readonly [key: string]: unknown;
}
const _UniqueGiftModelPublicKeys = { rarity_per_mille: "rarityPerMille" } as const;
const _UniqueGiftModelWireKeys = invertKeys(_UniqueGiftModelPublicKeys);
const _UniqueGiftModelEncoded = Schema.StructWithRest(
  Schema.Struct({
    name: Schema.String,
    sticker: Schema.suspend((): Schema.Codec<Sticker, unknown> => Sticker),
    rarity_per_mille: Schema.Int,
    rarity: Schema.optionalKey(Schema.String),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _UniqueGiftModelDecoded = Schema.declare<UniqueGiftModel>((input): input is UniqueGiftModel => Predicate.isObject(input));
export const UniqueGiftModel: Schema.Codec<UniqueGiftModel, unknown> = _UniqueGiftModelEncoded.pipe(
  Schema.decodeTo(_UniqueGiftModelDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_UniqueGiftModelPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_UniqueGiftModelWireKeys)),
  }),
);

/** This object describes the symbol shown on the pattern of a unique gift. */
export interface UniqueGiftSymbol {
  /** Name of the symbol */
  readonly name: string;
  /** The sticker that represents the unique gift */
  readonly sticker: Sticker;
  /** The number of unique gifts that receive this model for every 1000 gifts upgraded */
  readonly rarityPerMille: number;
  readonly [key: string]: unknown;
}
const _UniqueGiftSymbolPublicKeys = { rarity_per_mille: "rarityPerMille" } as const;
const _UniqueGiftSymbolWireKeys = invertKeys(_UniqueGiftSymbolPublicKeys);
const _UniqueGiftSymbolEncoded = Schema.StructWithRest(
  Schema.Struct({
    name: Schema.String,
    sticker: Schema.suspend((): Schema.Codec<Sticker, unknown> => Sticker),
    rarity_per_mille: Schema.Int,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _UniqueGiftSymbolDecoded = Schema.declare<UniqueGiftSymbol>((input): input is UniqueGiftSymbol => Predicate.isObject(input));
export const UniqueGiftSymbol: Schema.Codec<UniqueGiftSymbol, unknown> = _UniqueGiftSymbolEncoded.pipe(
  Schema.decodeTo(_UniqueGiftSymbolDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_UniqueGiftSymbolPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_UniqueGiftSymbolWireKeys)),
  }),
);

/** This object represents an incoming update.
At most one of the optional fields can be present in any given update. */
export interface Update {
  /** The update's unique identifier. Update identifiers start from a certain positive number and increase sequentially. This identifier becomes especially handy if you're using webhooks, since it allows you to ignore repeated updates or to restore the correct update sequence, should they get out of order. If there are no new updates for at least a week, then identifier of the next update will be chosen randomly instead of sequentially. */
  readonly updateId: number;
  /** Optional. New incoming message of any kind - text, photo, sticker, etc. */
  readonly message?: Message;
  /** Optional. New version of a message that is known to the bot and was edited. This update may at times be triggered by changes to message fields that are either unavailable or not actively used by your bot. */
  readonly editedMessage?: Message;
  /** Optional. New incoming channel post of any kind - text, photo, sticker, etc. */
  readonly channelPost?: Message;
  /** Optional. New version of a channel post that is known to the bot and was edited. This update may at times be triggered by changes to message fields that are either unavailable or not actively used by your bot. */
  readonly editedChannelPost?: Message;
  /** Optional. The bot was connected to or disconnected from a business account, or a user edited an existing connection with the bot */
  readonly businessConnection?: BusinessConnection;
  /** Optional. New message from a connected business account */
  readonly businessMessage?: Message;
  /** Optional. New version of a message from a connected business account */
  readonly editedBusinessMessage?: Message;
  /** Optional. Messages were deleted from a connected business account */
  readonly deletedBusinessMessages?: BusinessMessagesDeleted;
  /** Optional. New guest message. The bot can use the field Message.guest_query_id and the method answerGuestQuery to send a message in response. */
  readonly guestMessage?: Message;
  /** Optional. A reaction to a message was changed by a user. The bot must be an administrator in the chat and must explicitly specify "message_reaction" in the list of allowed_updates to receive these updates. The update isn't received for reactions set by bots. */
  readonly messageReaction?: MessageReactionUpdated;
  /** Optional. Reactions to a message with anonymous reactions were changed. The bot must be an administrator in the chat and must explicitly specify "message_reaction_count" in the list of allowed_updates to receive these updates. The updates are grouped and can be sent with delay up to a few minutes. */
  readonly messageReactionCount?: MessageReactionCountUpdated;
  /** Optional. New incoming inline query */
  readonly inlineQuery?: InlineQuery;
  /** Optional. The result of an inline query that was chosen by a user and sent to their chat partner. Please see our documentation on the feedback collecting for details on how to enable these updates for your bot. */
  readonly chosenInlineResult?: ChosenInlineResult;
  /** Optional. New incoming callback query */
  readonly callbackQuery?: CallbackQuery;
  /** Optional. New incoming shipping query. Only for invoices with flexible price. */
  readonly shippingQuery?: ShippingQuery;
  /** Optional. New incoming pre-checkout query. Contains full information about checkout. */
  readonly preCheckoutQuery?: PreCheckoutQuery;
  /** Optional. A user purchased paid media with a non-empty payload sent by the bot in a non-channel chat */
  readonly purchasedPaidMedia?: PaidMediaPurchased;
  /** Optional. New poll state. Bots receive only updates about manually stopped polls and polls, which are sent by the bot. */
  readonly poll?: Poll;
  /** Optional. A user changed their answer in a non-anonymous poll. Bots receive new votes only in polls that were sent by the bot itself. */
  readonly pollAnswer?: PollAnswer;
  /** Optional. The bot's chat member status was updated in a chat. For private chats, this update is received only when the bot is blocked or unblocked by the user. */
  readonly myChatMember?: ChatMemberUpdated;
  /** Optional. A chat member's status was updated in a chat. The bot must be an administrator in the chat and must explicitly specify "chat_member" in the list of allowed_updates to receive these updates. */
  readonly chatMember?: ChatMemberUpdated;
  /** Optional. A request to join the chat has been sent. The bot must have the can_invite_users administrator right in the chat to receive these updates. */
  readonly chatJoinRequest?: ChatJoinRequest;
  /** Optional. A chat boost was added or changed. The bot must be an administrator in the chat to receive these updates. */
  readonly chatBoost?: ChatBoostUpdated;
  /** Optional. A boost was removed from a chat. The bot must be an administrator in the chat to receive these updates. */
  readonly removedChatBoost?: ChatBoostRemoved;
  /** Optional. A new bot was created to be managed by the bot, or token or owner of a managed bot was changed */
  readonly managedBot?: ManagedBotUpdated;
  /** Optional. User payment subscription has changed */
  readonly subscription?: BotSubscriptionUpdated;
  /** Optional. A user asked the bot to stop the generation of a message */
  readonly stoppedMessageGeneration?: MessageGenerationStopped;
  readonly [key: string]: unknown;
}
const _UpdatePublicKeys = { update_id: "updateId", edited_message: "editedMessage", channel_post: "channelPost", edited_channel_post: "editedChannelPost", business_connection: "businessConnection", business_message: "businessMessage", edited_business_message: "editedBusinessMessage", deleted_business_messages: "deletedBusinessMessages", guest_message: "guestMessage", message_reaction: "messageReaction", message_reaction_count: "messageReactionCount", inline_query: "inlineQuery", chosen_inline_result: "chosenInlineResult", callback_query: "callbackQuery", shipping_query: "shippingQuery", pre_checkout_query: "preCheckoutQuery", purchased_paid_media: "purchasedPaidMedia", poll_answer: "pollAnswer", my_chat_member: "myChatMember", chat_member: "chatMember", chat_join_request: "chatJoinRequest", chat_boost: "chatBoost", removed_chat_boost: "removedChatBoost", managed_bot: "managedBot", stopped_message_generation: "stoppedMessageGeneration" } as const;
const _UpdateWireKeys = invertKeys(_UpdatePublicKeys);
const _UpdateEncoded = Schema.StructWithRest(
  Schema.Struct({
    update_id: Schema.Int,
    message: Schema.optionalKey(Schema.suspend((): Schema.Codec<Message, unknown> => Message)),
    edited_message: Schema.optionalKey(Schema.suspend((): Schema.Codec<Message, unknown> => Message)),
    channel_post: Schema.optionalKey(Schema.suspend((): Schema.Codec<Message, unknown> => Message)),
    edited_channel_post: Schema.optionalKey(Schema.suspend((): Schema.Codec<Message, unknown> => Message)),
    business_connection: Schema.optionalKey(Schema.suspend((): Schema.Codec<BusinessConnection, unknown> => BusinessConnection)),
    business_message: Schema.optionalKey(Schema.suspend((): Schema.Codec<Message, unknown> => Message)),
    edited_business_message: Schema.optionalKey(Schema.suspend((): Schema.Codec<Message, unknown> => Message)),
    deleted_business_messages: Schema.optionalKey(Schema.suspend((): Schema.Codec<BusinessMessagesDeleted, unknown> => BusinessMessagesDeleted)),
    guest_message: Schema.optionalKey(Schema.suspend((): Schema.Codec<Message, unknown> => Message)),
    message_reaction: Schema.optionalKey(Schema.suspend((): Schema.Codec<MessageReactionUpdated, unknown> => MessageReactionUpdated)),
    message_reaction_count: Schema.optionalKey(Schema.suspend((): Schema.Codec<MessageReactionCountUpdated, unknown> => MessageReactionCountUpdated)),
    inline_query: Schema.optionalKey(Schema.suspend((): Schema.Codec<InlineQuery, unknown> => InlineQuery)),
    chosen_inline_result: Schema.optionalKey(Schema.suspend((): Schema.Codec<ChosenInlineResult, unknown> => ChosenInlineResult)),
    callback_query: Schema.optionalKey(Schema.suspend((): Schema.Codec<CallbackQuery, unknown> => CallbackQuery)),
    shipping_query: Schema.optionalKey(Schema.suspend((): Schema.Codec<ShippingQuery, unknown> => ShippingQuery)),
    pre_checkout_query: Schema.optionalKey(Schema.suspend((): Schema.Codec<PreCheckoutQuery, unknown> => PreCheckoutQuery)),
    purchased_paid_media: Schema.optionalKey(Schema.suspend((): Schema.Codec<PaidMediaPurchased, unknown> => PaidMediaPurchased)),
    poll: Schema.optionalKey(Schema.suspend((): Schema.Codec<Poll, unknown> => Poll)),
    poll_answer: Schema.optionalKey(Schema.suspend((): Schema.Codec<PollAnswer, unknown> => PollAnswer)),
    my_chat_member: Schema.optionalKey(Schema.suspend((): Schema.Codec<ChatMemberUpdated, unknown> => ChatMemberUpdated)),
    chat_member: Schema.optionalKey(Schema.suspend((): Schema.Codec<ChatMemberUpdated, unknown> => ChatMemberUpdated)),
    chat_join_request: Schema.optionalKey(Schema.suspend((): Schema.Codec<ChatJoinRequest, unknown> => ChatJoinRequest)),
    chat_boost: Schema.optionalKey(Schema.suspend((): Schema.Codec<ChatBoostUpdated, unknown> => ChatBoostUpdated)),
    removed_chat_boost: Schema.optionalKey(Schema.suspend((): Schema.Codec<ChatBoostRemoved, unknown> => ChatBoostRemoved)),
    managed_bot: Schema.optionalKey(Schema.suspend((): Schema.Codec<ManagedBotUpdated, unknown> => ManagedBotUpdated)),
    subscription: Schema.optionalKey(Schema.suspend((): Schema.Codec<BotSubscriptionUpdated, unknown> => BotSubscriptionUpdated)),
    stopped_message_generation: Schema.optionalKey(Schema.suspend((): Schema.Codec<MessageGenerationStopped, unknown> => MessageGenerationStopped)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _UpdateDecoded = Schema.declare<Update>((input): input is Update => Predicate.isObject(input));
export const Update: Schema.Codec<Update, unknown> = _UpdateEncoded.pipe(
  Schema.decodeTo(_UpdateDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_UpdatePublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_UpdateWireKeys)),
  }),
);

/** This object represents a Telegram user or bot. */
export interface User {
  /** Unique identifier for this user or bot. This number may have more than 32 significant bits and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a 64-bit integer or double-precision float type are safe for storing this identifier. */
  readonly id: number;
  /** True, if this user is a bot */
  readonly isBot: boolean;
  /** User's or bot's first name */
  readonly firstName: string;
  /** Optional. User's or bot's last name */
  readonly lastName?: string;
  /** Optional. User's or bot's username */
  readonly username?: string;
  /** Optional. IETF language tag of the user's language */
  readonly languageCode?: string;
  /** Optional. True, if this user is a Telegram Premium user */
  readonly isPremium?: true;
  /** Optional. True, if this user added the bot to the attachment menu */
  readonly addedToAttachmentMenu?: true;
  /** Optional. True, if the bot can be invited to groups. Returned only in getMe. */
  readonly canJoinGroups?: boolean;
  /** Optional. True, if privacy mode is disabled for the bot. Returned only in getMe. */
  readonly canReadAllGroupMessages?: boolean;
  /** Optional. True, if the bot supports guest queries from chats it is not a member of. Returned only in getMe. */
  readonly supportsGuestQueries?: boolean;
  /** Optional. True, if the bot supports inline queries. Returned only in getMe. */
  readonly supportsInlineQueries?: boolean;
  /** Optional. True, if the bot can be connected to a user account to manage it. Returned only in getMe. */
  readonly canConnectToBusiness?: boolean;
  /** Optional. True, if the bot has a main Web App. Returned only in getMe. */
  readonly hasMainWebApp?: boolean;
  /** Optional. True, if the bot has forum topic mode enabled in private chats. Returned only in getMe. */
  readonly hasTopicsEnabled?: boolean;
  /** Optional. True, if the bot allows users to create and delete topics in private chats. Returned only in getMe. */
  readonly allowsUsersToCreateTopics?: boolean;
  /** Optional. True, if other bots can be created to be controlled by the bot. Returned only in getMe. */
  readonly canManageBots?: boolean;
  /** Optional. True, if the bot supports join request queries and can be assigned to process them. Returned only in getMe. */
  readonly supportsJoinRequestQueries?: boolean;
  readonly [key: string]: unknown;
}
const _UserPublicKeys = { is_bot: "isBot", first_name: "firstName", last_name: "lastName", language_code: "languageCode", is_premium: "isPremium", added_to_attachment_menu: "addedToAttachmentMenu", can_join_groups: "canJoinGroups", can_read_all_group_messages: "canReadAllGroupMessages", supports_guest_queries: "supportsGuestQueries", supports_inline_queries: "supportsInlineQueries", can_connect_to_business: "canConnectToBusiness", has_main_web_app: "hasMainWebApp", has_topics_enabled: "hasTopicsEnabled", allows_users_to_create_topics: "allowsUsersToCreateTopics", can_manage_bots: "canManageBots", supports_join_request_queries: "supportsJoinRequestQueries" } as const;
const _UserWireKeys = invertKeys(_UserPublicKeys);
const _UserEncoded = Schema.StructWithRest(
  Schema.Struct({
    id: Schema.Int,
    is_bot: Schema.Boolean,
    first_name: Schema.String,
    last_name: Schema.optionalKey(Schema.String),
    username: Schema.optionalKey(Schema.String),
    language_code: Schema.optionalKey(Schema.String),
    is_premium: Schema.optionalKey(Schema.Literal(true)),
    added_to_attachment_menu: Schema.optionalKey(Schema.Literal(true)),
    can_join_groups: Schema.optionalKey(Schema.Boolean),
    can_read_all_group_messages: Schema.optionalKey(Schema.Boolean),
    supports_guest_queries: Schema.optionalKey(Schema.Boolean),
    supports_inline_queries: Schema.optionalKey(Schema.Boolean),
    can_connect_to_business: Schema.optionalKey(Schema.Boolean),
    has_main_web_app: Schema.optionalKey(Schema.Boolean),
    has_topics_enabled: Schema.optionalKey(Schema.Boolean),
    allows_users_to_create_topics: Schema.optionalKey(Schema.Boolean),
    can_manage_bots: Schema.optionalKey(Schema.Boolean),
    supports_join_request_queries: Schema.optionalKey(Schema.Boolean),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _UserDecoded = Schema.declare<User>((input): input is User => Predicate.isObject(input));
export const User: Schema.Codec<User, unknown> = _UserEncoded.pipe(
  Schema.decodeTo(_UserDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_UserPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_UserWireKeys)),
  }),
);

/** This object represents a list of boosts added to a chat by a user. */
export interface UserChatBoosts {
  /** The list of boosts added to the chat by the user */
  readonly boosts: ReadonlyArray<ChatBoost>;
  readonly [key: string]: unknown;
}
export const UserChatBoosts: Schema.Codec<UserChatBoosts, unknown> = Schema.StructWithRest(
  Schema.Struct({
    boosts: Schema.Array(Schema.suspend((): Schema.Codec<ChatBoost, unknown> => ChatBoost)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object represents the audios displayed on a user's profile. */
export interface UserProfileAudios {
  /** Total number of profile audios for the target user */
  readonly totalCount: number;
  /** Requested profile audios */
  readonly audios: ReadonlyArray<Audio>;
  readonly [key: string]: unknown;
}
const _UserProfileAudiosPublicKeys = { total_count: "totalCount" } as const;
const _UserProfileAudiosWireKeys = invertKeys(_UserProfileAudiosPublicKeys);
const _UserProfileAudiosEncoded = Schema.StructWithRest(
  Schema.Struct({
    total_count: Schema.Int,
    audios: Schema.Array(Schema.suspend((): Schema.Codec<Audio, unknown> => Audio)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _UserProfileAudiosDecoded = Schema.declare<UserProfileAudios>((input): input is UserProfileAudios => Predicate.isObject(input));
export const UserProfileAudios: Schema.Codec<UserProfileAudios, unknown> = _UserProfileAudiosEncoded.pipe(
  Schema.decodeTo(_UserProfileAudiosDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_UserProfileAudiosPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_UserProfileAudiosWireKeys)),
  }),
);

/** This object represent a user's profile pictures. */
export interface UserProfilePhotos {
  /** Total number of profile pictures the target user has */
  readonly totalCount: number;
  /** Requested profile pictures (in up to 4 sizes each) */
  readonly photos: ReadonlyArray<ReadonlyArray<PhotoSize>>;
  readonly [key: string]: unknown;
}
const _UserProfilePhotosPublicKeys = { total_count: "totalCount" } as const;
const _UserProfilePhotosWireKeys = invertKeys(_UserProfilePhotosPublicKeys);
const _UserProfilePhotosEncoded = Schema.StructWithRest(
  Schema.Struct({
    total_count: Schema.Int,
    photos: Schema.Array(Schema.Array(Schema.suspend((): Schema.Codec<PhotoSize, unknown> => PhotoSize))),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _UserProfilePhotosDecoded = Schema.declare<UserProfilePhotos>((input): input is UserProfilePhotos => Predicate.isObject(input));
export const UserProfilePhotos: Schema.Codec<UserProfilePhotos, unknown> = _UserProfilePhotosEncoded.pipe(
  Schema.decodeTo(_UserProfilePhotosDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_UserProfilePhotosPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_UserProfilePhotosWireKeys)),
  }),
);

/** This object describes the rating of a user based on their Telegram Star spendings. */
export interface UserRating {
  /** Current level of the user, indicating their reliability when purchasing digital goods and services. A higher level suggests a more trustworthy customer; a negative level is likely reason for concern. */
  readonly level: number;
  /** Numerical value of the user's rating; the higher the rating, the better */
  readonly rating: number;
  /** The rating value required to get the current level */
  readonly currentLevelRating: number;
  /** Optional. The rating value required to get to the next level; omitted if the maximum level was reached */
  readonly nextLevelRating?: number;
  readonly [key: string]: unknown;
}
const _UserRatingPublicKeys = { current_level_rating: "currentLevelRating", next_level_rating: "nextLevelRating" } as const;
const _UserRatingWireKeys = invertKeys(_UserRatingPublicKeys);
const _UserRatingEncoded = Schema.StructWithRest(
  Schema.Struct({
    level: Schema.Int,
    rating: Schema.Int,
    current_level_rating: Schema.Int,
    next_level_rating: Schema.optionalKey(Schema.Int),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _UserRatingDecoded = Schema.declare<UserRating>((input): input is UserRating => Predicate.isObject(input));
export const UserRating: Schema.Codec<UserRating, unknown> = _UserRatingEncoded.pipe(
  Schema.decodeTo(_UserRatingDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_UserRatingPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_UserRatingWireKeys)),
  }),
);

/** This object contains information about the users whose identifiers were shared with the bot using a KeyboardButtonRequestUsers button. */
export interface UsersShared {
  /** Identifier of the request */
  readonly requestId: number;
  /** Information about users shared with the bot */
  readonly users: ReadonlyArray<SharedUser>;
  readonly [key: string]: unknown;
}
const _UsersSharedPublicKeys = { request_id: "requestId" } as const;
const _UsersSharedWireKeys = invertKeys(_UsersSharedPublicKeys);
const _UsersSharedEncoded = Schema.StructWithRest(
  Schema.Struct({
    request_id: Schema.Int,
    users: Schema.Array(Schema.suspend((): Schema.Codec<SharedUser, unknown> => SharedUser)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _UsersSharedDecoded = Schema.declare<UsersShared>((input): input is UsersShared => Predicate.isObject(input));
export const UsersShared: Schema.Codec<UsersShared, unknown> = _UsersSharedEncoded.pipe(
  Schema.decodeTo(_UsersSharedDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_UsersSharedPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_UsersSharedWireKeys)),
  }),
);

/** This object represents a venue. */
export interface Venue {
  /** Venue location. Can't be a live location. */
  readonly location: Location;
  /** Name of the venue */
  readonly title: string;
  /** Address of the venue */
  readonly address: string;
  /** Optional. Foursquare identifier of the venue */
  readonly foursquareId?: string;
  /** Optional. Foursquare type of the venue. (For example, “arts_entertainment/default”, “arts_entertainment/aquarium” or “food/icecream”.) */
  readonly foursquareType?: string;
  /** Optional. Google Places identifier of the venue */
  readonly googlePlaceId?: string;
  /** Optional. Google Places type of the venue. (See supported types.) */
  readonly googlePlaceType?: string;
  readonly [key: string]: unknown;
}
const _VenuePublicKeys = { foursquare_id: "foursquareId", foursquare_type: "foursquareType", google_place_id: "googlePlaceId", google_place_type: "googlePlaceType" } as const;
const _VenueWireKeys = invertKeys(_VenuePublicKeys);
const _VenueEncoded = Schema.StructWithRest(
  Schema.Struct({
    location: Schema.suspend((): Schema.Codec<Location, unknown> => Location),
    title: Schema.String,
    address: Schema.String,
    foursquare_id: Schema.optionalKey(Schema.String),
    foursquare_type: Schema.optionalKey(Schema.String),
    google_place_id: Schema.optionalKey(Schema.String),
    google_place_type: Schema.optionalKey(Schema.String),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _VenueDecoded = Schema.declare<Venue>((input): input is Venue => Predicate.isObject(input));
export const Venue: Schema.Codec<Venue, unknown> = _VenueEncoded.pipe(
  Schema.decodeTo(_VenueDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_VenuePublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_VenueWireKeys)),
  }),
);

/** This object represents a video file. */
export interface Video {
  /** Identifier for this file, which can be used to download or reuse the file */
  readonly fileId: string;
  /** Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file. */
  readonly fileUniqueId: string;
  /** Video width as defined by the sender */
  readonly width: number;
  /** Video height as defined by the sender */
  readonly height: number;
  /** Duration of the video in seconds as defined by the sender */
  readonly duration: number;
  /** Optional. Video thumbnail */
  readonly thumbnail?: PhotoSize;
  /** Optional. Available sizes of the cover of the video in the message */
  readonly cover?: ReadonlyArray<PhotoSize>;
  /** Optional. Timestamp in seconds from which the video will play in the message */
  readonly startTimestamp?: number;
  /** Optional. List of available qualities of the video */
  readonly qualities?: ReadonlyArray<VideoQuality>;
  /** Optional. Original filename as defined by the sender */
  readonly fileName?: string;
  /** Optional. MIME type of the file as defined by the sender */
  readonly mimeType?: string;
  /** Optional. File size in bytes. It can be bigger than 2^31 and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a signed 64-bit integer or double-precision float type are safe for storing this value. */
  readonly fileSize?: number;
  readonly [key: string]: unknown;
}
const _VideoPublicKeys = { file_id: "fileId", file_unique_id: "fileUniqueId", start_timestamp: "startTimestamp", file_name: "fileName", mime_type: "mimeType", file_size: "fileSize" } as const;
const _VideoWireKeys = invertKeys(_VideoPublicKeys);
const _VideoEncoded = Schema.StructWithRest(
  Schema.Struct({
    file_id: Schema.String,
    file_unique_id: Schema.String,
    width: Schema.Int,
    height: Schema.Int,
    duration: Schema.Int,
    thumbnail: Schema.optionalKey(Schema.suspend((): Schema.Codec<PhotoSize, unknown> => PhotoSize)),
    cover: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<PhotoSize, unknown> => PhotoSize))),
    start_timestamp: Schema.optionalKey(Schema.Int),
    qualities: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<VideoQuality, unknown> => VideoQuality))),
    file_name: Schema.optionalKey(Schema.String),
    mime_type: Schema.optionalKey(Schema.String),
    file_size: Schema.optionalKey(Schema.Int),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _VideoDecoded = Schema.declare<Video>((input): input is Video => Predicate.isObject(input));
export const Video: Schema.Codec<Video, unknown> = _VideoEncoded.pipe(
  Schema.decodeTo(_VideoDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_VideoPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_VideoWireKeys)),
  }),
);

/** This object represents a service message about a video chat ended in the chat. */
export interface VideoChatEnded {
  /** Video chat duration in seconds */
  readonly duration: number;
  readonly [key: string]: unknown;
}
export const VideoChatEnded: Schema.Codec<VideoChatEnded, unknown> = Schema.StructWithRest(
  Schema.Struct({
    duration: Schema.Int,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object represents a service message about new members invited to a video chat. */
export interface VideoChatParticipantsInvited {
  /** New members that were invited to the video chat */
  readonly users: ReadonlyArray<User>;
  readonly [key: string]: unknown;
}
export const VideoChatParticipantsInvited: Schema.Codec<VideoChatParticipantsInvited, unknown> = Schema.StructWithRest(
  Schema.Struct({
    users: Schema.Array(Schema.suspend((): Schema.Codec<User, unknown> => User)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object represents a service message about a video chat scheduled in the chat. */
export interface VideoChatScheduled {
  /** Point in time (Unix timestamp) when the video chat is supposed to be started by a chat administrator */
  readonly startDate: number;
  readonly [key: string]: unknown;
}
const _VideoChatScheduledPublicKeys = { start_date: "startDate" } as const;
const _VideoChatScheduledWireKeys = invertKeys(_VideoChatScheduledPublicKeys);
const _VideoChatScheduledEncoded = Schema.StructWithRest(
  Schema.Struct({
    start_date: Schema.Int,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _VideoChatScheduledDecoded = Schema.declare<VideoChatScheduled>((input): input is VideoChatScheduled => Predicate.isObject(input));
export const VideoChatScheduled: Schema.Codec<VideoChatScheduled, unknown> = _VideoChatScheduledEncoded.pipe(
  Schema.decodeTo(_VideoChatScheduledDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_VideoChatScheduledPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_VideoChatScheduledWireKeys)),
  }),
);

/** This object represents a service message about a video chat started in the chat. Currently holds no information. */
export interface VideoChatStarted {
  readonly [key: string]: unknown;
}
export const VideoChatStarted: Schema.Codec<VideoChatStarted, unknown> = Schema.StructWithRest(
  Schema.Struct({}),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object represents a video message. */
export interface VideoNote {
  /** Identifier for this file, which can be used to download or reuse the file */
  readonly fileId: string;
  /** Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file. */
  readonly fileUniqueId: string;
  /** Video width and height (diameter of the video message) as defined by the sender */
  readonly length: number;
  /** Duration of the video in seconds as defined by the sender */
  readonly duration: number;
  /** Optional. Video thumbnail */
  readonly thumbnail?: PhotoSize;
  /** Optional. File size in bytes */
  readonly fileSize?: number;
  readonly [key: string]: unknown;
}
const _VideoNotePublicKeys = { file_id: "fileId", file_unique_id: "fileUniqueId", file_size: "fileSize" } as const;
const _VideoNoteWireKeys = invertKeys(_VideoNotePublicKeys);
const _VideoNoteEncoded = Schema.StructWithRest(
  Schema.Struct({
    file_id: Schema.String,
    file_unique_id: Schema.String,
    length: Schema.Int,
    duration: Schema.Int,
    thumbnail: Schema.optionalKey(Schema.suspend((): Schema.Codec<PhotoSize, unknown> => PhotoSize)),
    file_size: Schema.optionalKey(Schema.Int),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _VideoNoteDecoded = Schema.declare<VideoNote>((input): input is VideoNote => Predicate.isObject(input));
export const VideoNote: Schema.Codec<VideoNote, unknown> = _VideoNoteEncoded.pipe(
  Schema.decodeTo(_VideoNoteDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_VideoNotePublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_VideoNoteWireKeys)),
  }),
);

/** This object represents a video file of a specific quality. */
export interface VideoQuality {
  /** Identifier for this file, which can be used to download or reuse the file */
  readonly fileId: string;
  /** Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file. */
  readonly fileUniqueId: string;
  /** Video width */
  readonly width: number;
  /** Video height */
  readonly height: number;
  /** Codec that was used to encode the video, for example, “h264”, “h265”, or “av01” */
  readonly codec: string;
  /** Optional. File size in bytes. It can be bigger than 2^31 and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a signed 64-bit integer or double-precision float type are safe for storing this value. */
  readonly fileSize?: number;
  readonly [key: string]: unknown;
}
const _VideoQualityPublicKeys = { file_id: "fileId", file_unique_id: "fileUniqueId", file_size: "fileSize" } as const;
const _VideoQualityWireKeys = invertKeys(_VideoQualityPublicKeys);
const _VideoQualityEncoded = Schema.StructWithRest(
  Schema.Struct({
    file_id: Schema.String,
    file_unique_id: Schema.String,
    width: Schema.Int,
    height: Schema.Int,
    codec: Schema.String,
    file_size: Schema.optionalKey(Schema.Int),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _VideoQualityDecoded = Schema.declare<VideoQuality>((input): input is VideoQuality => Predicate.isObject(input));
export const VideoQuality: Schema.Codec<VideoQuality, unknown> = _VideoQualityEncoded.pipe(
  Schema.decodeTo(_VideoQualityDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_VideoQualityPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_VideoQualityWireKeys)),
  }),
);

/** This object represents a voice note. */
export interface Voice {
  /** Identifier for this file, which can be used to download or reuse the file */
  readonly fileId: string;
  /** Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file. */
  readonly fileUniqueId: string;
  /** Duration of the audio in seconds as defined by the sender */
  readonly duration: number;
  /** Optional. MIME type of the file as defined by the sender */
  readonly mimeType?: string;
  /** Optional. File size in bytes. It can be bigger than 2^31 and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a signed 64-bit integer or double-precision float type are safe for storing this value. */
  readonly fileSize?: number;
  readonly [key: string]: unknown;
}
const _VoicePublicKeys = { file_id: "fileId", file_unique_id: "fileUniqueId", mime_type: "mimeType", file_size: "fileSize" } as const;
const _VoiceWireKeys = invertKeys(_VoicePublicKeys);
const _VoiceEncoded = Schema.StructWithRest(
  Schema.Struct({
    file_id: Schema.String,
    file_unique_id: Schema.String,
    duration: Schema.Int,
    mime_type: Schema.optionalKey(Schema.String),
    file_size: Schema.optionalKey(Schema.Int),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _VoiceDecoded = Schema.declare<Voice>((input): input is Voice => Predicate.isObject(input));
export const Voice: Schema.Codec<Voice, unknown> = _VoiceEncoded.pipe(
  Schema.decodeTo(_VoiceDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_VoicePublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_VoiceWireKeys)),
  }),
);

/** Describes data sent from a Web App to the bot. */
export interface WebAppData {
  /** The data. Be aware that a bad client can send arbitrary data in this field. */
  readonly data: string;
  /** Text of the web_app keyboard button from which the Web App was opened. Be aware that a bad client can send arbitrary data in this field. */
  readonly buttonText: string;
  readonly [key: string]: unknown;
}
const _WebAppDataPublicKeys = { button_text: "buttonText" } as const;
const _WebAppDataWireKeys = invertKeys(_WebAppDataPublicKeys);
const _WebAppDataEncoded = Schema.StructWithRest(
  Schema.Struct({
    data: Schema.String,
    button_text: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _WebAppDataDecoded = Schema.declare<WebAppData>((input): input is WebAppData => Predicate.isObject(input));
export const WebAppData: Schema.Codec<WebAppData, unknown> = _WebAppDataEncoded.pipe(
  Schema.decodeTo(_WebAppDataDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_WebAppDataPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_WebAppDataWireKeys)),
  }),
);

/** Describes a Web App. */
export interface WebAppInfo {
  /** An HTTPS URL of a Web App to be opened with additional data as specified in Initializing Web Apps */
  readonly url: string;
  readonly [key: string]: unknown;
}
export const WebAppInfo: Schema.Codec<WebAppInfo, unknown> = Schema.StructWithRest(
  Schema.Struct({
    url: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Describes the current status of a webhook. */
export interface WebhookInfo {
  /** Webhook URL, may be empty if webhook is not set up */
  readonly url: string;
  /** True, if a custom certificate was provided for webhook certificate checks */
  readonly hasCustomCertificate: boolean;
  /** Number of updates awaiting delivery */
  readonly pendingUpdateCount: number;
  /** Optional. Currently used webhook IP address */
  readonly ipAddress?: string;
  /** Optional. Unix time for the most recent error that happened when trying to deliver an update via webhook */
  readonly lastErrorDate?: number;
  /** Optional. Error message in human-readable format for the most recent error that happened when trying to deliver an update via webhook */
  readonly lastErrorMessage?: string;
  /** Optional. Unix time of the most recent error that happened when trying to synchronize available updates with Telegram datacenters */
  readonly lastSynchronizationErrorDate?: number;
  /** Optional. The maximum allowed number of simultaneous HTTPS connections to the webhook for update delivery */
  readonly maxConnections?: number;
  /** Optional. A list of update types the bot is subscribed to. Defaults to all update types except chat_member, message_reaction, and message_reaction_count. */
  readonly allowedUpdates?: ReadonlyArray<UpdateType>;
  readonly [key: string]: unknown;
}
const _WebhookInfoPublicKeys = { has_custom_certificate: "hasCustomCertificate", pending_update_count: "pendingUpdateCount", ip_address: "ipAddress", last_error_date: "lastErrorDate", last_error_message: "lastErrorMessage", last_synchronization_error_date: "lastSynchronizationErrorDate", max_connections: "maxConnections", allowed_updates: "allowedUpdates" } as const;
const _WebhookInfoWireKeys = invertKeys(_WebhookInfoPublicKeys);
const _WebhookInfoEncoded = Schema.StructWithRest(
  Schema.Struct({
    url: Schema.String,
    has_custom_certificate: Schema.Boolean,
    pending_update_count: Schema.Int,
    ip_address: Schema.optionalKey(Schema.String),
    last_error_date: Schema.optionalKey(Schema.Int),
    last_error_message: Schema.optionalKey(Schema.String),
    last_synchronization_error_date: Schema.optionalKey(Schema.Int),
    max_connections: Schema.optionalKey(Schema.Int),
    allowed_updates: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<UpdateType, unknown> => UpdateType))),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _WebhookInfoDecoded = Schema.declare<WebhookInfo>((input): input is WebhookInfo => Predicate.isObject(input));
export const WebhookInfo: Schema.Codec<WebhookInfo, unknown> = _WebhookInfoEncoded.pipe(
  Schema.decodeTo(_WebhookInfoDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_WebhookInfoPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_WebhookInfoWireKeys)),
  }),
);

/** This object represents a service message about a user allowing a bot to write messages after adding it to the attachment menu, launching a Web App from a link, or accepting an explicit request from a Web App sent by the method requestWriteAccess. */
export interface WriteAccessAllowed {
  /** Optional. True, if the access was granted after the user accepted an explicit request from a Web App sent by the method requestWriteAccess */
  readonly fromRequest?: boolean;
  /** Optional. Name of the Web App, if the access was granted when the Web App was launched from a link */
  readonly webAppName?: string;
  /** Optional. True, if the access was granted when the bot was added to the attachment or side menu */
  readonly fromAttachmentMenu?: boolean;
  readonly [key: string]: unknown;
}
const _WriteAccessAllowedPublicKeys = { from_request: "fromRequest", web_app_name: "webAppName", from_attachment_menu: "fromAttachmentMenu" } as const;
const _WriteAccessAllowedWireKeys = invertKeys(_WriteAccessAllowedPublicKeys);
const _WriteAccessAllowedEncoded = Schema.StructWithRest(
  Schema.Struct({
    from_request: Schema.optionalKey(Schema.Boolean),
    web_app_name: Schema.optionalKey(Schema.String),
    from_attachment_menu: Schema.optionalKey(Schema.Boolean),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
const _WriteAccessAllowedDecoded = Schema.declare<WriteAccessAllowed>((input): input is WriteAccessAllowed => Predicate.isObject(input));
export const WriteAccessAllowed: Schema.Codec<WriteAccessAllowed, unknown> = _WriteAccessAllowedEncoded.pipe(
  Schema.decodeTo(_WriteAccessAllowedDecoded, {
    decode: SchemaGetter.transform(Struct.renameKeys(_WriteAccessAllowedPublicKeys)),
    encode: SchemaGetter.transform(Struct.renameKeys(_WriteAccessAllowedWireKeys)),
  }),
);
