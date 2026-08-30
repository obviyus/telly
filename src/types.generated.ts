// Generated from schema/sources/dofer/spec.json. Edit schema inputs or overrides, then regenerate.
import { Schema } from "effect";

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
  readonly unlimited_gifts: boolean;
  /** True, if limited regular gifts are accepted */
  readonly limited_gifts: boolean;
  /** True, if unique gifts or gifts that can be upgraded to unique for free are accepted */
  readonly unique_gifts: boolean;
  /** True, if a Telegram Premium subscription is accepted */
  readonly premium_subscription: boolean;
  /** True, if transfers of unique gifts from channels are accepted */
  readonly gifts_from_channels: boolean;
  readonly [key: string]: unknown;
}
export const AcceptedGiftTypes: Schema.Codec<AcceptedGiftTypes> = Schema.StructWithRest(
  Schema.Struct({
    unlimited_gifts: Schema.Boolean,
    limited_gifts: Schema.Boolean,
    unique_gifts: Schema.Boolean,
    premium_subscription: Schema.Boolean,
    gifts_from_channels: Schema.Boolean,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Contains information about the affiliate that received a commission via this transaction. */
export interface AffiliateInfo {
  /** Optional. The bot or the user that received an affiliate commission if it was received by a bot or a user */
  readonly affiliate_user?: User;
  /** Optional. The chat that received an affiliate commission if it was received by a chat */
  readonly affiliate_chat?: Chat;
  /** The number of Telegram Stars received by the affiliate for each 1000 Telegram Stars received by the bot from referred users */
  readonly commission_per_mille: number;
  /** Integer amount of Telegram Stars received by the affiliate from the transaction, rounded to 0; can be negative for refunds */
  readonly amount: number;
  /** Optional. The number of 1/1000000000 shares of Telegram Stars received by the affiliate; from -999999999 to 999999999; can be negative for refunds */
  readonly nanostar_amount?: number;
  readonly [key: string]: unknown;
}
export const AffiliateInfo: Schema.Codec<AffiliateInfo> = Schema.StructWithRest(
  Schema.Struct({
    affiliate_user: Schema.optionalKey(Schema.suspend((): Schema.Codec<User> => User)),
    affiliate_chat: Schema.optionalKey(Schema.suspend((): Schema.Codec<Chat> => Chat)),
    commission_per_mille: Schema.Int,
    amount: Schema.Int,
    nanostar_amount: Schema.optionalKey(Schema.Int),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object represents an animation file (GIF or H.264/MPEG-4 AVC video without sound). */
export interface Animation {
  /** Identifier for this file, which can be used to download or reuse the file */
  readonly file_id: string;
  /** Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file. */
  readonly file_unique_id: string;
  /** Video width as defined by the sender */
  readonly width: number;
  /** Video height as defined by the sender */
  readonly height: number;
  /** Duration of the video in seconds as defined by the sender */
  readonly duration: number;
  /** Optional. Animation thumbnail as defined by the sender */
  readonly thumbnail?: PhotoSize;
  /** Optional. Original animation filename as defined by the sender */
  readonly file_name?: string;
  /** Optional. MIME type of the file as defined by the sender */
  readonly mime_type?: string;
  /** Optional. File size in bytes. It can be bigger than 2^31 and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a signed 64-bit integer or double-precision float type are safe for storing this value. */
  readonly file_size?: number;
  readonly [key: string]: unknown;
}
export const Animation: Schema.Codec<Animation> = Schema.StructWithRest(
  Schema.Struct({
    file_id: Schema.String,
    file_unique_id: Schema.String,
    width: Schema.Int,
    height: Schema.Int,
    duration: Schema.Int,
    thumbnail: Schema.optionalKey(Schema.suspend((): Schema.Codec<PhotoSize> => PhotoSize)),
    file_name: Schema.optionalKey(Schema.String),
    mime_type: Schema.optionalKey(Schema.String),
    file_size: Schema.optionalKey(Schema.Int),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object represents an audio file to be treated as music by the Telegram clients. */
export interface Audio {
  /** Identifier for this file, which can be used to download or reuse the file */
  readonly file_id: string;
  /** Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file. */
  readonly file_unique_id: string;
  /** Duration of the audio in seconds as defined by the sender */
  readonly duration: number;
  /** Optional. Performer of the audio as defined by the sender or by audio tags */
  readonly performer?: string;
  /** Optional. Title of the audio as defined by the sender or by audio tags */
  readonly title?: string;
  /** Optional. Original filename as defined by the sender */
  readonly file_name?: string;
  /** Optional. MIME type of the file as defined by the sender */
  readonly mime_type?: string;
  /** Optional. File size in bytes. It can be bigger than 2^31 and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a signed 64-bit integer or double-precision float type are safe for storing this value. */
  readonly file_size?: number;
  /** Optional. Thumbnail of the album cover to which the music file belongs */
  readonly thumbnail?: PhotoSize;
  readonly [key: string]: unknown;
}
export const Audio: Schema.Codec<Audio> = Schema.StructWithRest(
  Schema.Struct({
    file_id: Schema.String,
    file_unique_id: Schema.String,
    duration: Schema.Int,
    performer: Schema.optionalKey(Schema.String),
    title: Schema.optionalKey(Schema.String),
    file_name: Schema.optionalKey(Schema.String),
    mime_type: Schema.optionalKey(Schema.String),
    file_size: Schema.optionalKey(Schema.Int),
    thumbnail: Schema.optionalKey(Schema.suspend((): Schema.Codec<PhotoSize> => PhotoSize)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object describes the way a background is filled based on the selected colors. Currently, it can be one of */
export type BackgroundFill = BackgroundFillSolid | BackgroundFillGradient | BackgroundFillFreeformGradient;
export const BackgroundFill: Schema.Codec<BackgroundFill> = Schema.Union([Schema.suspend((): Schema.Codec<BackgroundFillSolid> => BackgroundFillSolid), Schema.suspend((): Schema.Codec<BackgroundFillGradient> => BackgroundFillGradient), Schema.suspend((): Schema.Codec<BackgroundFillFreeformGradient> => BackgroundFillFreeformGradient)]);

/** The background is a freeform gradient that rotates after every message in the chat. */
export interface BackgroundFillFreeformGradient {
  /** Type of the background fill, always “freeform_gradient” */
  readonly type: string;
  /** A list of the 3 or 4 base colors that are used to generate the freeform gradient in the RGB24 format */
  readonly colors: ReadonlyArray<number>;
  readonly [key: string]: unknown;
}
export const BackgroundFillFreeformGradient: Schema.Codec<BackgroundFillFreeformGradient> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    colors: Schema.Array(Schema.Int),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** The background is a gradient fill. */
export interface BackgroundFillGradient {
  /** Type of the background fill, always “gradient” */
  readonly type: string;
  /** Top color of the gradient in the RGB24 format */
  readonly top_color: number;
  /** Bottom color of the gradient in the RGB24 format */
  readonly bottom_color: number;
  /** Clockwise rotation angle of the background fill in degrees; 0-359 */
  readonly rotation_angle: number;
  readonly [key: string]: unknown;
}
export const BackgroundFillGradient: Schema.Codec<BackgroundFillGradient> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    top_color: Schema.Int,
    bottom_color: Schema.Int,
    rotation_angle: Schema.Int,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** The background is filled using the selected color. */
export interface BackgroundFillSolid {
  /** Type of the background fill, always “solid” */
  readonly type: string;
  /** The color of the background fill in the RGB24 format */
  readonly color: number;
  readonly [key: string]: unknown;
}
export const BackgroundFillSolid: Schema.Codec<BackgroundFillSolid> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    color: Schema.Int,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object describes the type of a background. Currently, it can be one of */
export type BackgroundType = BackgroundTypeFill | BackgroundTypeWallpaper | BackgroundTypePattern | BackgroundTypeChatTheme;
export const BackgroundType: Schema.Codec<BackgroundType> = Schema.Union([Schema.suspend((): Schema.Codec<BackgroundTypeFill> => BackgroundTypeFill), Schema.suspend((): Schema.Codec<BackgroundTypeWallpaper> => BackgroundTypeWallpaper), Schema.suspend((): Schema.Codec<BackgroundTypePattern> => BackgroundTypePattern), Schema.suspend((): Schema.Codec<BackgroundTypeChatTheme> => BackgroundTypeChatTheme)]);

/** The background is taken directly from a built-in chat theme. */
export interface BackgroundTypeChatTheme {
  /** Type of the background, always “chat_theme” */
  readonly type: string;
  /** Name of the chat theme, which is usually an emoji */
  readonly theme_name: string;
  readonly [key: string]: unknown;
}
export const BackgroundTypeChatTheme: Schema.Codec<BackgroundTypeChatTheme> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    theme_name: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** The background is automatically filled based on the selected colors. */
export interface BackgroundTypeFill {
  /** Type of the background, always “fill” */
  readonly type: string;
  /** The background fill */
  readonly fill: BackgroundFill;
  /** Dimming of the background in dark themes, as a percentage; 0-100 */
  readonly dark_theme_dimming: number;
  readonly [key: string]: unknown;
}
export const BackgroundTypeFill: Schema.Codec<BackgroundTypeFill> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    fill: Schema.suspend((): Schema.Codec<BackgroundFill> => BackgroundFill),
    dark_theme_dimming: Schema.Int,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** The background is a .PNG or .TGV (gzipped subset of SVG with MIME type “application/x-tgwallpattern”) pattern to be combined with the background fill chosen by the user. */
export interface BackgroundTypePattern {
  /** Type of the background, always “pattern” */
  readonly type: string;
  /** Document with the pattern */
  readonly document: Document;
  /** The background fill that is combined with the pattern */
  readonly fill: BackgroundFill;
  /** Intensity of the pattern when it is shown above the filled background; 0-100 */
  readonly intensity: number;
  /** Optional. True, if the background fill must be applied only to the pattern itself. All other pixels are black in this case. For dark themes only. */
  readonly is_inverted?: true;
  /** Optional. True, if the background moves slightly when the device is tilted */
  readonly is_moving?: true;
  readonly [key: string]: unknown;
}
export const BackgroundTypePattern: Schema.Codec<BackgroundTypePattern> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    document: Schema.suspend((): Schema.Codec<Document> => Document),
    fill: Schema.suspend((): Schema.Codec<BackgroundFill> => BackgroundFill),
    intensity: Schema.Int,
    is_inverted: Schema.optionalKey(Schema.Literal(true)),
    is_moving: Schema.optionalKey(Schema.Literal(true)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** The background is a wallpaper in the JPEG format. */
export interface BackgroundTypeWallpaper {
  /** Type of the background, always “wallpaper” */
  readonly type: string;
  /** Document with the wallpaper */
  readonly document: Document;
  /** Dimming of the background in dark themes, as a percentage; 0-100 */
  readonly dark_theme_dimming: number;
  /** Optional. True, if the wallpaper is downscaled to fit in a 450x450 square and then box-blurred with radius 12 */
  readonly is_blurred?: true;
  /** Optional. True, if the background moves slightly when the device is tilted */
  readonly is_moving?: true;
  readonly [key: string]: unknown;
}
export const BackgroundTypeWallpaper: Schema.Codec<BackgroundTypeWallpaper> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    document: Schema.suspend((): Schema.Codec<Document> => Document),
    dark_theme_dimming: Schema.Int,
    is_blurred: Schema.optionalKey(Schema.Literal(true)),
    is_moving: Schema.optionalKey(Schema.Literal(true)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
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
export const Birthdate: Schema.Codec<Birthdate> = Schema.StructWithRest(
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
  readonly is_access_restricted: boolean;
  /** Optional. The list of other users who have access to the bot if the access is restricted */
  readonly added_users?: ReadonlyArray<User>;
  readonly [key: string]: unknown;
}
export const BotAccessSettings: Schema.Codec<BotAccessSettings> = Schema.StructWithRest(
  Schema.Struct({
    is_access_restricted: Schema.Boolean,
    added_users: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<User> => User))),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object represents a bot command. */
export interface BotCommand {
  /** Text of the command; 1-32 characters. Can contain only lowercase English letters, digits and underscores. */
  readonly command: string;
  /** Description of the command; 1-256 characters */
  readonly description: string;
  /** Optional. True, if the command sends an ephemeral message, which can be seen only by the sender of the message and the bot */
  readonly is_ephemeral?: boolean;
  readonly [key: string]: unknown;
}
export const BotCommand: Schema.Codec<BotCommand> = Schema.StructWithRest(
  Schema.Struct({
    command: Schema.String,
    description: Schema.String,
    is_ephemeral: Schema.optionalKey(Schema.Boolean),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object represents the scope to which bot commands are applied. Currently, the following 7 scopes are supported: */
export type BotCommandScope = BotCommandScopeDefault | BotCommandScopeAllPrivateChats | BotCommandScopeAllGroupChats | BotCommandScopeAllChatAdministrators | BotCommandScopeChat | BotCommandScopeChatAdministrators | BotCommandScopeChatMember;
export const BotCommandScope: Schema.Codec<BotCommandScope> = Schema.Union([Schema.suspend((): Schema.Codec<BotCommandScopeDefault> => BotCommandScopeDefault), Schema.suspend((): Schema.Codec<BotCommandScopeAllPrivateChats> => BotCommandScopeAllPrivateChats), Schema.suspend((): Schema.Codec<BotCommandScopeAllGroupChats> => BotCommandScopeAllGroupChats), Schema.suspend((): Schema.Codec<BotCommandScopeAllChatAdministrators> => BotCommandScopeAllChatAdministrators), Schema.suspend((): Schema.Codec<BotCommandScopeChat> => BotCommandScopeChat), Schema.suspend((): Schema.Codec<BotCommandScopeChatAdministrators> => BotCommandScopeChatAdministrators), Schema.suspend((): Schema.Codec<BotCommandScopeChatMember> => BotCommandScopeChatMember)]);

/** Represents the scope of bot commands, covering all group and supergroup chat administrators. */
export interface BotCommandScopeAllChatAdministrators {
  /** Scope type, must be all_chat_administrators */
  readonly type: string;
  readonly [key: string]: unknown;
}
export const BotCommandScopeAllChatAdministrators: Schema.Codec<BotCommandScopeAllChatAdministrators> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Represents the scope of bot commands, covering all group and supergroup chats. */
export interface BotCommandScopeAllGroupChats {
  /** Scope type, must be all_group_chats */
  readonly type: string;
  readonly [key: string]: unknown;
}
export const BotCommandScopeAllGroupChats: Schema.Codec<BotCommandScopeAllGroupChats> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Represents the scope of bot commands, covering all private chats. */
export interface BotCommandScopeAllPrivateChats {
  /** Scope type, must be all_private_chats */
  readonly type: string;
  readonly [key: string]: unknown;
}
export const BotCommandScopeAllPrivateChats: Schema.Codec<BotCommandScopeAllPrivateChats> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Represents the scope of bot commands, covering a specific chat. */
export interface BotCommandScopeChat {
  /** Scope type, must be chat */
  readonly type: string;
  /** Unique identifier for the target chat or username of the target supergroup in the format @username. Channel direct messages chats and channel chats aren't supported. */
  readonly chat_id: number | string;
  readonly [key: string]: unknown;
}
export const BotCommandScopeChat: Schema.Codec<BotCommandScopeChat> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    chat_id: Schema.Union([Schema.Int, Schema.String]),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Represents the scope of bot commands, covering all administrators of a specific group or supergroup chat. */
export interface BotCommandScopeChatAdministrators {
  /** Scope type, must be chat_administrators */
  readonly type: string;
  /** Unique identifier for the target chat or username of the target supergroup in the format @username. Channel direct messages chats and channel chats aren't supported. */
  readonly chat_id: number | string;
  readonly [key: string]: unknown;
}
export const BotCommandScopeChatAdministrators: Schema.Codec<BotCommandScopeChatAdministrators> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    chat_id: Schema.Union([Schema.Int, Schema.String]),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Represents the scope of bot commands, covering a specific member of a group or supergroup chat. */
export interface BotCommandScopeChatMember {
  /** Scope type, must be chat_member */
  readonly type: string;
  /** Unique identifier for the target chat or username of the target supergroup in the format @username. Channel direct messages chats and channel chats aren't supported. */
  readonly chat_id: number | string;
  /** Unique identifier of the target user */
  readonly user_id: number;
  readonly [key: string]: unknown;
}
export const BotCommandScopeChatMember: Schema.Codec<BotCommandScopeChatMember> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    chat_id: Schema.Union([Schema.Int, Schema.String]),
    user_id: Schema.Int,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Represents the default scope of bot commands. Default commands are used if no commands with a narrower scope are specified for the user. */
export interface BotCommandScopeDefault {
  /** Scope type, must be default */
  readonly type: string;
  readonly [key: string]: unknown;
}
export const BotCommandScopeDefault: Schema.Codec<BotCommandScopeDefault> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object represents the bot's description. */
export interface BotDescription {
  /** The bot's description */
  readonly description: string;
  readonly [key: string]: unknown;
}
export const BotDescription: Schema.Codec<BotDescription> = Schema.StructWithRest(
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
export const BotName: Schema.Codec<BotName> = Schema.StructWithRest(
  Schema.Struct({
    name: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object represents the bot's short description. */
export interface BotShortDescription {
  /** The bot's short description */
  readonly short_description: string;
  readonly [key: string]: unknown;
}
export const BotShortDescription: Schema.Codec<BotShortDescription> = Schema.StructWithRest(
  Schema.Struct({
    short_description: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object contains information about changes to a user payment subscription toward the current bot. */
export interface BotSubscriptionUpdated {
  /** User who subscribed for payments toward the bot */
  readonly user: User;
  /** Bot-specified invoice payload */
  readonly invoice_payload: string;
  /** The new state of the subscription. Currently, it can be one of “canceled” if the user canceled the subscription, “active” if the user re-enabled a previously canceled subscription, or “failed” if payment for the subscription failed. */
  readonly state: string;
  readonly [key: string]: unknown;
}
export const BotSubscriptionUpdated: Schema.Codec<BotSubscriptionUpdated> = Schema.StructWithRest(
  Schema.Struct({
    user: Schema.suspend((): Schema.Codec<User> => User),
    invoice_payload: Schema.String,
    state: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Represents the rights of a business bot. */
export interface BusinessBotRights {
  /** Optional. True, if the bot can send and edit messages in the private chats that had incoming messages in the last 24 hours */
  readonly can_reply?: true;
  /** Optional. True, if the bot can mark incoming private messages as read */
  readonly can_read_messages?: true;
  /** Optional. True, if the bot can delete messages sent by the bot */
  readonly can_delete_sent_messages?: true;
  /** Optional. True, if the bot can delete all private messages in managed chats */
  readonly can_delete_all_messages?: true;
  /** Optional. True, if the bot can edit the first and last name of the business account */
  readonly can_edit_name?: true;
  /** Optional. True, if the bot can edit the bio of the business account */
  readonly can_edit_bio?: true;
  /** Optional. True, if the bot can edit the profile photo of the business account */
  readonly can_edit_profile_photo?: true;
  /** Optional. True, if the bot can edit the username of the business account */
  readonly can_edit_username?: true;
  /** Optional. True, if the bot can change the privacy settings pertaining to gifts for the business account */
  readonly can_change_gift_settings?: true;
  /** Optional. True, if the bot can view gifts and the amount of Telegram Stars owned by the business account */
  readonly can_view_gifts_and_stars?: true;
  /** Optional. True, if the bot can convert regular gifts owned by the business account to Telegram Stars */
  readonly can_convert_gifts_to_stars?: true;
  /** Optional. True, if the bot can transfer and upgrade gifts owned by the business account */
  readonly can_transfer_and_upgrade_gifts?: true;
  /** Optional. True, if the bot can transfer Telegram Stars received by the business account to its own account, or use them to upgrade and transfer gifts */
  readonly can_transfer_stars?: true;
  /** Optional. True, if the bot can post, edit and delete stories on behalf of the business account */
  readonly can_manage_stories?: true;
  readonly [key: string]: unknown;
}
export const BusinessBotRights: Schema.Codec<BusinessBotRights> = Schema.StructWithRest(
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

/** Describes the connection of the bot with a business account. */
export interface BusinessConnection {
  /** Unique identifier of the business connection */
  readonly id: string;
  /** Business account user that created the business connection */
  readonly user: User;
  /** Identifier of a private chat with the user who created the business connection. This number may have more than 32 significant bits and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a 64-bit integer or double-precision float type are safe for storing this identifier. */
  readonly user_chat_id: number;
  /** Date the connection was established in Unix time */
  readonly date: number;
  /** Optional. Rights of the business bot */
  readonly rights?: BusinessBotRights;
  /** True, if the connection is active */
  readonly is_enabled: boolean;
  readonly [key: string]: unknown;
}
export const BusinessConnection: Schema.Codec<BusinessConnection> = Schema.StructWithRest(
  Schema.Struct({
    id: Schema.String,
    user: Schema.suspend((): Schema.Codec<User> => User),
    user_chat_id: Schema.Int,
    date: Schema.Int,
    rights: Schema.optionalKey(Schema.suspend((): Schema.Codec<BusinessBotRights> => BusinessBotRights)),
    is_enabled: Schema.Boolean,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
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
export const BusinessIntro: Schema.Codec<BusinessIntro> = Schema.StructWithRest(
  Schema.Struct({
    title: Schema.optionalKey(Schema.String),
    message: Schema.optionalKey(Schema.String),
    sticker: Schema.optionalKey(Schema.suspend((): Schema.Codec<Sticker> => Sticker)),
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
export const BusinessLocation: Schema.Codec<BusinessLocation> = Schema.StructWithRest(
  Schema.Struct({
    address: Schema.String,
    location: Schema.optionalKey(Schema.suspend((): Schema.Codec<Location> => Location)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object is received when messages are deleted from a connected business account. */
export interface BusinessMessagesDeleted {
  /** Unique identifier of the business connection */
  readonly business_connection_id: string;
  /** Information about a chat in the business account. The bot may not have access to the chat or the corresponding user. */
  readonly chat: Chat;
  /** The list of identifiers of deleted messages in the chat of the business account */
  readonly message_ids: ReadonlyArray<number>;
  readonly [key: string]: unknown;
}
export const BusinessMessagesDeleted: Schema.Codec<BusinessMessagesDeleted> = Schema.StructWithRest(
  Schema.Struct({
    business_connection_id: Schema.String,
    chat: Schema.suspend((): Schema.Codec<Chat> => Chat),
    message_ids: Schema.Array(Schema.Int),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Describes the opening hours of a business. */
export interface BusinessOpeningHours {
  /** Unique name of the time zone for which the opening hours are defined */
  readonly time_zone_name: string;
  /** List of time intervals describing business opening hours */
  readonly opening_hours: ReadonlyArray<BusinessOpeningHoursInterval>;
  readonly [key: string]: unknown;
}
export const BusinessOpeningHours: Schema.Codec<BusinessOpeningHours> = Schema.StructWithRest(
  Schema.Struct({
    time_zone_name: Schema.String,
    opening_hours: Schema.Array(Schema.suspend((): Schema.Codec<BusinessOpeningHoursInterval> => BusinessOpeningHoursInterval)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Describes an interval of time during which a business is open. */
export interface BusinessOpeningHoursInterval {
  /** The minute's sequence number in a week, starting on Monday, marking the start of the time interval during which the business is open; 0 - 7 * 24 * 60 */
  readonly opening_minute: number;
  /** The minute's sequence number in a week, starting on Monday, marking the end of the time interval during which the business is open; 0 - 8 * 24 * 60 */
  readonly closing_minute: number;
  readonly [key: string]: unknown;
}
export const BusinessOpeningHoursInterval: Schema.Codec<BusinessOpeningHoursInterval> = Schema.StructWithRest(
  Schema.Struct({
    opening_minute: Schema.Int,
    closing_minute: Schema.Int,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A placeholder, currently holds no information. Use BotFather to set up your game. */
export interface CallbackGame {
  readonly [key: string]: unknown;
}
export const CallbackGame: Schema.Codec<CallbackGame> = Schema.StructWithRest(
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
  readonly inline_message_id?: string;
  /** Global identifier, uniquely corresponding to the chat to which the message with the callback button was sent. Useful for high scores in games. */
  readonly chat_instance: string;
  /** Optional. Data associated with the callback button. Be aware that the message originated the query can contain no callback buttons with this data. */
  readonly data?: string;
  /** Optional. Short name of a Game to be returned, serves as the unique identifier for the game */
  readonly game_short_name?: string;
  readonly [key: string]: unknown;
}
export const CallbackQuery: Schema.Codec<CallbackQuery> = Schema.StructWithRest(
  Schema.Struct({
    id: Schema.String,
    from: Schema.suspend((): Schema.Codec<User> => User),
    message: Schema.optionalKey(Schema.suspend((): Schema.Codec<MaybeInaccessibleMessage> => MaybeInaccessibleMessage)),
    inline_message_id: Schema.optionalKey(Schema.String),
    chat_instance: Schema.String,
    data: Schema.optionalKey(Schema.String),
    game_short_name: Schema.optionalKey(Schema.String),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
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
  readonly first_name?: string;
  /** Optional. Last name of the other party in a private chat */
  readonly last_name?: string;
  /** Optional. True, if the supergroup chat is a forum (has topics enabled) */
  readonly is_forum?: true;
  /** Optional. True, if the chat is the direct messages chat of a channel */
  readonly is_direct_messages?: true;
  readonly [key: string]: unknown;
}
export const Chat: Schema.Codec<Chat> = Schema.StructWithRest(
  Schema.Struct({
    id: Schema.Int,
    type: Schema.suspend((): Schema.Codec<ChatType> => ChatType),
    title: Schema.optionalKey(Schema.String),
    username: Schema.optionalKey(Schema.String),
    first_name: Schema.optionalKey(Schema.String),
    last_name: Schema.optionalKey(Schema.String),
    is_forum: Schema.optionalKey(Schema.Literal(true)),
    is_direct_messages: Schema.optionalKey(Schema.Literal(true)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Represents the rights of an administrator in a chat. */
export interface ChatAdministratorRights {
  /** True, if the user's presence in the chat is hidden */
  readonly is_anonymous: boolean;
  /** True, if the administrator can access the chat event log, get boost list, see hidden supergroup and channel members, report spam messages, ignore slow mode, and send messages to the chat without paying Telegram Stars. Implied by any other administrator privilege. */
  readonly can_manage_chat: boolean;
  /** True, if the administrator can delete messages of other users */
  readonly can_delete_messages: boolean;
  /** True, if the administrator can manage video chats */
  readonly can_manage_video_chats: boolean;
  /** True, if the administrator can restrict, ban or unban chat members, or access supergroup statistics */
  readonly can_restrict_members: boolean;
  /** True, if the administrator can add new administrators with a subset of their own privileges or demote administrators that they have promoted, directly or indirectly (promoted by administrators that were appointed by the user) */
  readonly can_promote_members: boolean;
  /** True, if the user is allowed to change the chat title, photo and other settings */
  readonly can_change_info: boolean;
  /** True, if the user is allowed to invite new users to the chat */
  readonly can_invite_users: boolean;
  /** True, if the administrator can post stories to the chat */
  readonly can_post_stories: boolean;
  /** True, if the administrator can edit stories posted by other users, post stories to the chat page, pin chat stories, and access the chat's story archive */
  readonly can_edit_stories: boolean;
  /** True, if the administrator can delete stories posted by other users */
  readonly can_delete_stories: boolean;
  /** Optional. True, if the administrator can post messages in the channel, approve suggested posts, or access channel statistics; for channels only */
  readonly can_post_messages?: boolean;
  /** Optional. True, if the administrator can edit messages of other users and can pin messages; for channels only */
  readonly can_edit_messages?: boolean;
  /** Optional. True, if the user is allowed to pin messages; for groups and supergroups only */
  readonly can_pin_messages?: boolean;
  /** Optional. True, if the user is allowed to create, rename, close, and reopen forum topics; for supergroups only */
  readonly can_manage_topics?: boolean;
  /** Optional. True, if the administrator can manage direct messages of the channel and decline suggested posts; for channels only */
  readonly can_manage_direct_messages?: boolean;
  /** Optional. True, if the administrator can edit the tags of regular members; for groups and supergroups only */
  readonly can_manage_tags?: boolean;
  /** True, if the administrator can manage chat welcome messages or directly send them in the case of bots */
  readonly can_send_welcome_messages: boolean;
  readonly [key: string]: unknown;
}
export const ChatAdministratorRights: Schema.Codec<ChatAdministratorRights> = Schema.StructWithRest(
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

/** This object represents a chat background. */
export interface ChatBackground {
  /** Type of the background */
  readonly type: BackgroundType;
  readonly [key: string]: unknown;
}
export const ChatBackground: Schema.Codec<ChatBackground> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.suspend((): Schema.Codec<BackgroundType> => BackgroundType),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object contains information about a chat boost. */
export interface ChatBoost {
  /** Unique identifier of the boost */
  readonly boost_id: string;
  /** Point in time (Unix timestamp) when the chat was boosted */
  readonly add_date: number;
  /** Point in time (Unix timestamp) when the boost will automatically expire, unless the booster's Telegram Premium subscription is prolonged */
  readonly expiration_date: number;
  /** Source of the added boost */
  readonly source: ChatBoostSource;
  readonly [key: string]: unknown;
}
export const ChatBoost: Schema.Codec<ChatBoost> = Schema.StructWithRest(
  Schema.Struct({
    boost_id: Schema.String,
    add_date: Schema.Int,
    expiration_date: Schema.Int,
    source: Schema.suspend((): Schema.Codec<ChatBoostSource> => ChatBoostSource),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object represents a service message about a user boosting a chat. */
export interface ChatBoostAdded {
  /** Number of boosts added by the user */
  readonly boost_count: number;
  readonly [key: string]: unknown;
}
export const ChatBoostAdded: Schema.Codec<ChatBoostAdded> = Schema.StructWithRest(
  Schema.Struct({
    boost_count: Schema.Int,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object represents a boost removed from a chat. */
export interface ChatBoostRemoved {
  /** Chat which was boosted */
  readonly chat: Chat;
  /** Unique identifier of the boost */
  readonly boost_id: string;
  /** Point in time (Unix timestamp) when the boost was removed */
  readonly remove_date: number;
  /** Source of the removed boost */
  readonly source: ChatBoostSource;
  readonly [key: string]: unknown;
}
export const ChatBoostRemoved: Schema.Codec<ChatBoostRemoved> = Schema.StructWithRest(
  Schema.Struct({
    chat: Schema.suspend((): Schema.Codec<Chat> => Chat),
    boost_id: Schema.String,
    remove_date: Schema.Int,
    source: Schema.suspend((): Schema.Codec<ChatBoostSource> => ChatBoostSource),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object describes the source of a chat boost. It can be one of */
export type ChatBoostSource = ChatBoostSourcePremium | ChatBoostSourceGiftCode | ChatBoostSourceGiveaway;
export const ChatBoostSource: Schema.Codec<ChatBoostSource> = Schema.Union([Schema.suspend((): Schema.Codec<ChatBoostSourcePremium> => ChatBoostSourcePremium), Schema.suspend((): Schema.Codec<ChatBoostSourceGiftCode> => ChatBoostSourceGiftCode), Schema.suspend((): Schema.Codec<ChatBoostSourceGiveaway> => ChatBoostSourceGiveaway)]);

/** The boost was obtained by the creation of Telegram Premium gift codes to boost a chat. Each such code boosts the chat 4 times for the duration of the corresponding Telegram Premium subscription. */
export interface ChatBoostSourceGiftCode {
  /** Source of the boost, always “gift_code” */
  readonly source: string;
  /** User for which the gift code was created */
  readonly user: User;
  readonly [key: string]: unknown;
}
export const ChatBoostSourceGiftCode: Schema.Codec<ChatBoostSourceGiftCode> = Schema.StructWithRest(
  Schema.Struct({
    source: Schema.String,
    user: Schema.suspend((): Schema.Codec<User> => User),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** The boost was obtained by the creation of a Telegram Premium or a Telegram Star giveaway. This boosts the chat 4 times for the duration of the corresponding Telegram Premium subscription for Telegram Premium giveaways and prize_star_count / 500 times for one year for Telegram Star giveaways. */
export interface ChatBoostSourceGiveaway {
  /** Source of the boost, always “giveaway” */
  readonly source: string;
  /** Identifier of a message in the chat with the giveaway; the message could have been deleted already. May be 0 if the message isn't sent yet. */
  readonly giveaway_message_id: number;
  /** Optional. User that won the prize in the giveaway if any; for Telegram Premium giveaways only */
  readonly user?: User;
  /** Optional. The number of Telegram Stars to be split between giveaway winners; for Telegram Star giveaways only */
  readonly prize_star_count?: number;
  /** Optional. True, if the giveaway was completed, but there was no user to win the prize */
  readonly is_unclaimed?: true;
  readonly [key: string]: unknown;
}
export const ChatBoostSourceGiveaway: Schema.Codec<ChatBoostSourceGiveaway> = Schema.StructWithRest(
  Schema.Struct({
    source: Schema.String,
    giveaway_message_id: Schema.Int,
    user: Schema.optionalKey(Schema.suspend((): Schema.Codec<User> => User)),
    prize_star_count: Schema.optionalKey(Schema.Int),
    is_unclaimed: Schema.optionalKey(Schema.Literal(true)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** The boost was obtained by subscribing to Telegram Premium or by gifting a Telegram Premium subscription to another user. */
export interface ChatBoostSourcePremium {
  /** Source of the boost, always “premium” */
  readonly source: string;
  /** User that boosted the chat */
  readonly user: User;
  readonly [key: string]: unknown;
}
export const ChatBoostSourcePremium: Schema.Codec<ChatBoostSourcePremium> = Schema.StructWithRest(
  Schema.Struct({
    source: Schema.String,
    user: Schema.suspend((): Schema.Codec<User> => User),
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
export const ChatBoostUpdated: Schema.Codec<ChatBoostUpdated> = Schema.StructWithRest(
  Schema.Struct({
    chat: Schema.suspend((): Schema.Codec<Chat> => Chat),
    boost: Schema.suspend((): Schema.Codec<ChatBoost> => ChatBoost),
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
  readonly first_name?: string;
  /** Optional. Last name of the other party in a private chat */
  readonly last_name?: string;
  /** Optional. True, if the supergroup chat is a forum (has topics enabled) */
  readonly is_forum?: true;
  /** Optional. True, if the chat is the direct messages chat of a channel */
  readonly is_direct_messages?: true;
  /** Identifier of the accent color for the chat name and backgrounds of the chat photo, reply header, and link preview. See accent colors for more details. */
  readonly accent_color_id: number;
  /** The maximum number of reactions that can be set on a message in the chat */
  readonly max_reaction_count: number;
  /** Optional. Chat photo */
  readonly photo?: ChatPhoto;
  /** Optional. If non-empty, the list of all active chat usernames; for private chats, supergroups and channels */
  readonly active_usernames?: ReadonlyArray<string>;
  /** Optional. For private chats, the date of birth of the user */
  readonly birthdate?: Birthdate;
  /** Optional. For private chats with business accounts, the intro of the business */
  readonly business_intro?: BusinessIntro;
  /** Optional. For private chats with business accounts, the location of the business */
  readonly business_location?: BusinessLocation;
  /** Optional. For private chats with business accounts, the opening hours of the business */
  readonly business_opening_hours?: BusinessOpeningHours;
  /** Optional. For private chats, the personal channel of the user */
  readonly personal_chat?: Chat;
  /** Optional. Information about the corresponding channel chat; for direct messages chats only */
  readonly parent_chat?: Chat;
  /** Optional. List of available reactions allowed in the chat. If omitted, then all emoji reactions are allowed. */
  readonly available_reactions?: ReadonlyArray<ReactionType>;
  /** Optional. Custom emoji identifier of the emoji chosen by the chat for the reply header and link preview background */
  readonly background_custom_emoji_id?: string;
  /** Optional. Identifier of the accent color for the chat's profile background. See profile accent colors for more details. */
  readonly profile_accent_color_id?: number;
  /** Optional. Custom emoji identifier of the emoji chosen by the chat for its profile background */
  readonly profile_background_custom_emoji_id?: string;
  /** Optional. Custom emoji identifier of the emoji status of the chat or the other party in a private chat */
  readonly emoji_status_custom_emoji_id?: string;
  /** Optional. Expiration date of the emoji status of the chat or the other party in a private chat, in Unix time, if any */
  readonly emoji_status_expiration_date?: number;
  /** Optional. Bio of the other party in a private chat */
  readonly bio?: string;
  /** Optional. True, if privacy settings of the other party in the private chat allows to use tg://user?id=<user_id> links only in chats with the user */
  readonly has_private_forwards?: true;
  /** Optional. True, if the privacy settings of the other party restrict sending voice and video note messages in the private chat */
  readonly has_restricted_voice_and_video_messages?: true;
  /** Optional. True, if users need to join the supergroup before they can send messages */
  readonly join_to_send_messages?: true;
  /** Optional. True, if all users directly joining the supergroup without using an invite link need to be approved by supergroup administrators */
  readonly join_by_request?: true;
  /** Optional. Description, for groups, supergroups and channel chats */
  readonly description?: string;
  /** Optional. Primary invite link, for groups, supergroups and channel chats */
  readonly invite_link?: string;
  /** Optional. The most recent pinned message (by sending date) */
  readonly pinned_message?: Message;
  /** Optional. Default chat member permissions, for groups and supergroups */
  readonly permissions?: ChatPermissions;
  /** Information about types of gifts that are accepted by the chat or by the corresponding user for private chats */
  readonly accepted_gift_types: AcceptedGiftTypes;
  /** Optional. True, if paid media messages can be sent or forwarded to the channel chat. The field is available only for channel chats. */
  readonly can_send_paid_media?: true;
  /** Optional. For supergroups, the minimum allowed delay between consecutive messages sent by each unprivileged user; in seconds */
  readonly slow_mode_delay?: number;
  /** Optional. For supergroups, the minimum number of boosts that a non-administrator user needs to add in order to ignore slow mode and chat permissions */
  readonly unrestrict_boost_count?: number;
  /** Optional. The time after which all messages sent to the chat will be automatically deleted; in seconds */
  readonly message_auto_delete_time?: number;
  /** Optional. True, if aggressive anti-spam checks are enabled in the supergroup. The field is only available to chat administrators. */
  readonly has_aggressive_anti_spam_enabled?: true;
  /** Optional. True, if non-administrators can only get the list of bots and administrators in the chat */
  readonly has_hidden_members?: true;
  /** Optional. True, if messages from the chat can't be forwarded to other chats */
  readonly has_protected_content?: true;
  /** Optional. True, if new chat members will have access to old messages; available only to chat administrators */
  readonly has_visible_history?: true;
  /** Optional. For supergroups, name of the group sticker set */
  readonly sticker_set_name?: string;
  /** Optional. True, if the bot can change the group sticker set */
  readonly can_set_sticker_set?: true;
  /** Optional. For supergroups, the name of the group's custom emoji sticker set. Custom emoji from this set can be used by all users and bots in the group. */
  readonly custom_emoji_sticker_set_name?: string;
  /** Optional. Unique identifier for the linked chat, i.e. the discussion group identifier for a channel and vice versa; for supergroups and channel chats. This identifier may be greater than 32 bits and some programming languages may have difficulty/silent defects in interpreting it. But it is smaller than 52 bits, so a signed 64 bit integer or double-precision float type are safe for storing this identifier. */
  readonly linked_chat_id?: number;
  /** Optional. For supergroups, the location to which the supergroup is connected */
  readonly location?: ChatLocation;
  /** Optional. For private chats, the rating of the user if any */
  readonly rating?: UserRating;
  /** Optional. For private chats, the first audio added to the profile of the user */
  readonly first_profile_audio?: Audio;
  /** Optional. The color scheme based on a unique gift that must be used for the chat's name, message replies and link previews */
  readonly unique_gift_colors?: UniqueGiftColors;
  /** Optional. The number of Telegram Stars a general user has to pay to send a message to the chat */
  readonly paid_message_star_count?: number;
  /** Optional. The bot that processes join request queries in the chat. The field is only available to chat administrators. */
  readonly guard_bot?: User;
  /** Optional. The Community to which the chat belongs */
  readonly community?: Community;
  readonly [key: string]: unknown;
}
export const ChatFullInfo: Schema.Codec<ChatFullInfo> = Schema.StructWithRest(
  Schema.Struct({
    id: Schema.Int,
    type: Schema.suspend((): Schema.Codec<ChatType> => ChatType),
    title: Schema.optionalKey(Schema.String),
    username: Schema.optionalKey(Schema.String),
    first_name: Schema.optionalKey(Schema.String),
    last_name: Schema.optionalKey(Schema.String),
    is_forum: Schema.optionalKey(Schema.Literal(true)),
    is_direct_messages: Schema.optionalKey(Schema.Literal(true)),
    accent_color_id: Schema.Int,
    max_reaction_count: Schema.Int,
    photo: Schema.optionalKey(Schema.suspend((): Schema.Codec<ChatPhoto> => ChatPhoto)),
    active_usernames: Schema.optionalKey(Schema.Array(Schema.String)),
    birthdate: Schema.optionalKey(Schema.suspend((): Schema.Codec<Birthdate> => Birthdate)),
    business_intro: Schema.optionalKey(Schema.suspend((): Schema.Codec<BusinessIntro> => BusinessIntro)),
    business_location: Schema.optionalKey(Schema.suspend((): Schema.Codec<BusinessLocation> => BusinessLocation)),
    business_opening_hours: Schema.optionalKey(Schema.suspend((): Schema.Codec<BusinessOpeningHours> => BusinessOpeningHours)),
    personal_chat: Schema.optionalKey(Schema.suspend((): Schema.Codec<Chat> => Chat)),
    parent_chat: Schema.optionalKey(Schema.suspend((): Schema.Codec<Chat> => Chat)),
    available_reactions: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<ReactionType> => ReactionType))),
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
    pinned_message: Schema.optionalKey(Schema.suspend((): Schema.Codec<Message> => Message)),
    permissions: Schema.optionalKey(Schema.suspend((): Schema.Codec<ChatPermissions> => ChatPermissions)),
    accepted_gift_types: Schema.suspend((): Schema.Codec<AcceptedGiftTypes> => AcceptedGiftTypes),
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
    location: Schema.optionalKey(Schema.suspend((): Schema.Codec<ChatLocation> => ChatLocation)),
    rating: Schema.optionalKey(Schema.suspend((): Schema.Codec<UserRating> => UserRating)),
    first_profile_audio: Schema.optionalKey(Schema.suspend((): Schema.Codec<Audio> => Audio)),
    unique_gift_colors: Schema.optionalKey(Schema.suspend((): Schema.Codec<UniqueGiftColors> => UniqueGiftColors)),
    paid_message_star_count: Schema.optionalKey(Schema.Int),
    guard_bot: Schema.optionalKey(Schema.suspend((): Schema.Codec<User> => User)),
    community: Schema.optionalKey(Schema.suspend((): Schema.Codec<Community> => Community)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Represents an invite link for a chat. */
export interface ChatInviteLink {
  /** The invite link. If the link was created by another chat administrator, then the second part of the link will be replaced with “…”. */
  readonly invite_link: string;
  /** Creator of the link */
  readonly creator: User;
  /** True, if users joining the chat via the link need to be approved by chat administrators */
  readonly creates_join_request: boolean;
  /** True, if the link is primary */
  readonly is_primary: boolean;
  /** True, if the link is revoked */
  readonly is_revoked: boolean;
  /** Optional. Invite link name */
  readonly name?: string;
  /** Optional. Point in time (Unix timestamp) when the link will expire or has been expired */
  readonly expire_date?: number;
  /** Optional. The maximum number of users that can be members of the chat simultaneously after joining the chat via this invite link; 1-99999 */
  readonly member_limit?: number;
  /** Optional. Number of pending join requests created using this link */
  readonly pending_join_request_count?: number;
  /** Optional. The number of seconds the subscription will be active for before the next payment */
  readonly subscription_period?: number;
  /** Optional. The amount of Telegram Stars a user must pay initially and after each subsequent subscription period to be a member of the chat using the link */
  readonly subscription_price?: number;
  readonly [key: string]: unknown;
}
export const ChatInviteLink: Schema.Codec<ChatInviteLink> = Schema.StructWithRest(
  Schema.Struct({
    invite_link: Schema.String,
    creator: Schema.suspend((): Schema.Codec<User> => User),
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

/** Represents a join request sent to a chat. */
export interface ChatJoinRequest {
  /** Chat to which the request was sent */
  readonly chat: Chat;
  /** User that sent the join request */
  readonly from: User;
  /** Identifier of a private chat with the user who sent the join request. This number may have more than 32 significant bits and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a 64-bit integer or double-precision float type are safe for storing this identifier. The bot can use this identifier for 5 minutes to send messages until the join request is processed, assuming no other administrator contacted the user. */
  readonly user_chat_id: number;
  /** Date the request was sent in Unix time */
  readonly date: number;
  /** Optional. Bio of the user */
  readonly bio?: string;
  /** Optional. Chat invite link that was used by the user to send the join request */
  readonly invite_link?: ChatInviteLink;
  /** Optional. Identifier of the join request query; for bots assigned to process join requests only. If present, then the bot must call sendChatJoinRequestWebApp or directly call answerChatJoinRequestQuery within 10 seconds. */
  readonly query_id?: string;
  readonly [key: string]: unknown;
}
export const ChatJoinRequest: Schema.Codec<ChatJoinRequest> = Schema.StructWithRest(
  Schema.Struct({
    chat: Schema.suspend((): Schema.Codec<Chat> => Chat),
    from: Schema.suspend((): Schema.Codec<User> => User),
    user_chat_id: Schema.Int,
    date: Schema.Int,
    bio: Schema.optionalKey(Schema.String),
    invite_link: Schema.optionalKey(Schema.suspend((): Schema.Codec<ChatInviteLink> => ChatInviteLink)),
    query_id: Schema.optionalKey(Schema.String),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Represents a location to which a chat is connected. */
export interface ChatLocation {
  /** The location to which the supergroup is connected. Can't be a live location. */
  readonly location: Location;
  /** Location address; 1-64 characters, as defined by the chat owner */
  readonly address: string;
  readonly [key: string]: unknown;
}
export const ChatLocation: Schema.Codec<ChatLocation> = Schema.StructWithRest(
  Schema.Struct({
    location: Schema.suspend((): Schema.Codec<Location> => Location),
    address: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object contains information about one member of a chat. Currently, the following 6 types of chat members are supported: */
export type ChatMember = ChatMemberOwner | ChatMemberAdministrator | ChatMemberMember | ChatMemberRestricted | ChatMemberLeft | ChatMemberBanned;
export const ChatMember: Schema.Codec<ChatMember> = Schema.Union([Schema.suspend((): Schema.Codec<ChatMemberOwner> => ChatMemberOwner), Schema.suspend((): Schema.Codec<ChatMemberAdministrator> => ChatMemberAdministrator), Schema.suspend((): Schema.Codec<ChatMemberMember> => ChatMemberMember), Schema.suspend((): Schema.Codec<ChatMemberRestricted> => ChatMemberRestricted), Schema.suspend((): Schema.Codec<ChatMemberLeft> => ChatMemberLeft), Schema.suspend((): Schema.Codec<ChatMemberBanned> => ChatMemberBanned)]);

/** Represents a chat member that has some additional privileges. */
export interface ChatMemberAdministrator {
  /** The member's status in the chat, always “administrator” */
  readonly status: string;
  /** Information about the user */
  readonly user: User;
  /** True, if the bot is allowed to edit administrator privileges of that user */
  readonly can_be_edited: boolean;
  /** True, if the user's presence in the chat is hidden */
  readonly is_anonymous: boolean;
  /** True, if the administrator can access the chat event log, get boost list, see hidden supergroup and channel members, report spam messages, ignore slow mode, and send messages to the chat without paying Telegram Stars. Implied by any other administrator privilege. */
  readonly can_manage_chat: boolean;
  /** True, if the administrator can delete messages of other users */
  readonly can_delete_messages: boolean;
  /** True, if the administrator can manage video chats */
  readonly can_manage_video_chats: boolean;
  /** True, if the administrator can restrict, ban or unban chat members, or access supergroup statistics */
  readonly can_restrict_members: boolean;
  /** True, if the administrator can add new administrators with a subset of their own privileges or demote administrators that they have promoted, directly or indirectly (promoted by administrators that were appointed by the user) */
  readonly can_promote_members: boolean;
  /** True, if the user is allowed to change the chat title, photo and other settings */
  readonly can_change_info: boolean;
  /** True, if the user is allowed to invite new users to the chat */
  readonly can_invite_users: boolean;
  /** True, if the administrator can post stories to the chat */
  readonly can_post_stories: boolean;
  /** True, if the administrator can edit stories posted by other users, post stories to the chat page, pin chat stories, and access the chat's story archive */
  readonly can_edit_stories: boolean;
  /** True, if the administrator can delete stories posted by other users */
  readonly can_delete_stories: boolean;
  /** Optional. True, if the administrator can post messages in the channel, approve suggested posts, or access channel statistics; for channels only */
  readonly can_post_messages?: boolean;
  /** Optional. True, if the administrator can edit messages of other users and can pin messages; for channels only */
  readonly can_edit_messages?: boolean;
  /** Optional. True, if the user is allowed to pin messages; for groups and supergroups only */
  readonly can_pin_messages?: boolean;
  /** Optional. True, if the user is allowed to create, rename, close, and reopen forum topics; for supergroups only */
  readonly can_manage_topics?: boolean;
  /** Optional. True, if the administrator can manage direct messages of the channel and decline suggested posts; for channels only */
  readonly can_manage_direct_messages?: boolean;
  /** Optional. True, if the administrator can edit the tags of regular members; for groups and supergroups only */
  readonly can_manage_tags?: boolean;
  /** True, if the administrator can manage chat welcome messages or directly send them in the case of bots */
  readonly can_send_welcome_messages: boolean;
  /** Optional. Custom title for this user */
  readonly custom_title?: string;
  readonly [key: string]: unknown;
}
export const ChatMemberAdministrator: Schema.Codec<ChatMemberAdministrator> = Schema.StructWithRest(
  Schema.Struct({
    status: Schema.String,
    user: Schema.suspend((): Schema.Codec<User> => User),
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

/** Represents a chat member that was banned in the chat and can't return to the chat or view chat messages. */
export interface ChatMemberBanned {
  /** The member's status in the chat, always “kicked” */
  readonly status: string;
  /** Information about the user */
  readonly user: User;
  /** Date when restrictions will be lifted for this user; Unix time. If 0, then the user is banned forever. */
  readonly until_date: number;
  readonly [key: string]: unknown;
}
export const ChatMemberBanned: Schema.Codec<ChatMemberBanned> = Schema.StructWithRest(
  Schema.Struct({
    status: Schema.String,
    user: Schema.suspend((): Schema.Codec<User> => User),
    until_date: Schema.Int,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Represents a chat member that isn't currently a member of the chat, but may join it themselves. */
export interface ChatMemberLeft {
  /** The member's status in the chat, always “left” */
  readonly status: string;
  /** Information about the user */
  readonly user: User;
  readonly [key: string]: unknown;
}
export const ChatMemberLeft: Schema.Codec<ChatMemberLeft> = Schema.StructWithRest(
  Schema.Struct({
    status: Schema.String,
    user: Schema.suspend((): Schema.Codec<User> => User),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Represents a chat member that has no additional privileges or restrictions. */
export interface ChatMemberMember {
  /** The member's status in the chat, always “member” */
  readonly status: string;
  /** Optional. Tag of the member */
  readonly tag?: string;
  /** Information about the user */
  readonly user: User;
  /** Optional. Date when the user's subscription will expire; Unix time */
  readonly until_date?: number;
  readonly [key: string]: unknown;
}
export const ChatMemberMember: Schema.Codec<ChatMemberMember> = Schema.StructWithRest(
  Schema.Struct({
    status: Schema.String,
    tag: Schema.optionalKey(Schema.String),
    user: Schema.suspend((): Schema.Codec<User> => User),
    until_date: Schema.optionalKey(Schema.Int),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Represents a chat member that owns the chat and has all administrator privileges. */
export interface ChatMemberOwner {
  /** The member's status in the chat, always “creator” */
  readonly status: string;
  /** Information about the user */
  readonly user: User;
  /** True, if the user's presence in the chat is hidden */
  readonly is_anonymous: boolean;
  /** Optional. Custom title for this user */
  readonly custom_title?: string;
  readonly [key: string]: unknown;
}
export const ChatMemberOwner: Schema.Codec<ChatMemberOwner> = Schema.StructWithRest(
  Schema.Struct({
    status: Schema.String,
    user: Schema.suspend((): Schema.Codec<User> => User),
    is_anonymous: Schema.Boolean,
    custom_title: Schema.optionalKey(Schema.String),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Represents a chat member that is under certain restrictions in the chat. Supergroups only. */
export interface ChatMemberRestricted {
  /** The member's status in the chat, always “restricted” */
  readonly status: string;
  /** Optional. Tag of the member */
  readonly tag?: string;
  /** Information about the user */
  readonly user: User;
  /** True, if the user is a member of the chat at the moment of the request */
  readonly is_member: boolean;
  /** True, if the user is allowed to send text messages, rich messages, contacts, giveaways, giveaway winners, invoices, locations and venues */
  readonly can_send_messages: boolean;
  /** True, if the user is allowed to send audios */
  readonly can_send_audios: boolean;
  /** True, if the user is allowed to send documents */
  readonly can_send_documents: boolean;
  /** True, if the user is allowed to send photos */
  readonly can_send_photos: boolean;
  /** True, if the user is allowed to send videos */
  readonly can_send_videos: boolean;
  /** True, if the user is allowed to send video notes */
  readonly can_send_video_notes: boolean;
  /** True, if the user is allowed to send voice notes */
  readonly can_send_voice_notes: boolean;
  /** True, if the user is allowed to send polls and checklists */
  readonly can_send_polls: boolean;
  /** True, if the user is allowed to send animations, games, stickers and use inline bots */
  readonly can_send_other_messages: boolean;
  /** True, if the user is allowed to add web page previews to their messages */
  readonly can_add_web_page_previews: boolean;
  /** True, if the user is allowed to react to messages */
  readonly can_react_to_messages: boolean;
  /** True, if the user is allowed to edit their own tag */
  readonly can_edit_tag: boolean;
  /** True, if the user is allowed to change the chat title, photo and other settings */
  readonly can_change_info: boolean;
  /** True, if the user is allowed to invite new users to the chat */
  readonly can_invite_users: boolean;
  /** True, if the user is allowed to pin messages */
  readonly can_pin_messages: boolean;
  /** True, if the user is allowed to create forum topics */
  readonly can_manage_topics: boolean;
  /** Date when restrictions will be lifted for this user; Unix time. If 0, then the user is restricted forever. */
  readonly until_date: number;
  readonly [key: string]: unknown;
}
export const ChatMemberRestricted: Schema.Codec<ChatMemberRestricted> = Schema.StructWithRest(
  Schema.Struct({
    status: Schema.String,
    tag: Schema.optionalKey(Schema.String),
    user: Schema.suspend((): Schema.Codec<User> => User),
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

/** This object represents changes in the status of a chat member. */
export interface ChatMemberUpdated {
  /** Chat the user belongs to */
  readonly chat: Chat;
  /** Performer of the action, which resulted in the change */
  readonly from: User;
  /** Date the change was done in Unix time */
  readonly date: number;
  /** Previous information about the chat member */
  readonly old_chat_member: ChatMember;
  /** New information about the chat member */
  readonly new_chat_member: ChatMember;
  /** Optional. Chat invite link, which was used by the user to join the chat; for joining by invite link events only */
  readonly invite_link?: ChatInviteLink;
  /** Optional. True, if the user joined the chat after sending a direct join request without using an invite link and being approved by an administrator */
  readonly via_join_request?: boolean;
  /** Optional. True, if the user joined the chat via a chat folder invite link */
  readonly via_chat_folder_invite_link?: boolean;
  readonly [key: string]: unknown;
}
export const ChatMemberUpdated: Schema.Codec<ChatMemberUpdated> = Schema.StructWithRest(
  Schema.Struct({
    chat: Schema.suspend((): Schema.Codec<Chat> => Chat),
    from: Schema.suspend((): Schema.Codec<User> => User),
    date: Schema.Int,
    old_chat_member: Schema.suspend((): Schema.Codec<ChatMember> => ChatMember),
    new_chat_member: Schema.suspend((): Schema.Codec<ChatMember> => ChatMember),
    invite_link: Schema.optionalKey(Schema.suspend((): Schema.Codec<ChatInviteLink> => ChatInviteLink)),
    via_join_request: Schema.optionalKey(Schema.Boolean),
    via_chat_folder_invite_link: Schema.optionalKey(Schema.Boolean),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Describes a service message about an ownership change in the chat. */
export interface ChatOwnerChanged {
  /** The new owner of the chat */
  readonly new_owner: User;
  readonly [key: string]: unknown;
}
export const ChatOwnerChanged: Schema.Codec<ChatOwnerChanged> = Schema.StructWithRest(
  Schema.Struct({
    new_owner: Schema.suspend((): Schema.Codec<User> => User),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Describes a service message about the chat owner leaving the chat. */
export interface ChatOwnerLeft {
  /** Optional. The user who will become the new owner of the chat if the previous owner does not return to the chat */
  readonly new_owner?: User;
  readonly [key: string]: unknown;
}
export const ChatOwnerLeft: Schema.Codec<ChatOwnerLeft> = Schema.StructWithRest(
  Schema.Struct({
    new_owner: Schema.optionalKey(Schema.suspend((): Schema.Codec<User> => User)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Describes actions that a non-administrator user is allowed to take in a chat. */
export interface ChatPermissions {
  /** Optional. True, if the user is allowed to send text messages, rich messages, contacts, giveaways, giveaway winners, invoices, locations and venues */
  readonly can_send_messages?: boolean;
  /** Optional. True, if the user is allowed to send audios */
  readonly can_send_audios?: boolean;
  /** Optional. True, if the user is allowed to send documents */
  readonly can_send_documents?: boolean;
  /** Optional. True, if the user is allowed to send photos */
  readonly can_send_photos?: boolean;
  /** Optional. True, if the user is allowed to send videos */
  readonly can_send_videos?: boolean;
  /** Optional. True, if the user is allowed to send video notes */
  readonly can_send_video_notes?: boolean;
  /** Optional. True, if the user is allowed to send voice notes */
  readonly can_send_voice_notes?: boolean;
  /** Optional. True, if the user is allowed to send polls and checklists */
  readonly can_send_polls?: boolean;
  /** Optional. True, if the user is allowed to send animations, games, stickers and use inline bots */
  readonly can_send_other_messages?: boolean;
  /** Optional. True, if the user is allowed to add web page previews to their messages */
  readonly can_add_web_page_previews?: boolean;
  /** Optional. True, if the user is allowed to react to messages. If omitted, defaults to the value of can_send_messages. */
  readonly can_react_to_messages?: boolean;
  /** Optional. True, if the user is allowed to edit their own tag. If omitted, defaults to the value of can_pin_messages. */
  readonly can_edit_tag?: boolean;
  /** Optional. True, if the user is allowed to change the chat title, photo and other settings. Ignored in public supergroups. */
  readonly can_change_info?: boolean;
  /** Optional. True, if the user is allowed to invite new users to the chat */
  readonly can_invite_users?: boolean;
  /** Optional. True, if the user is allowed to pin messages. Ignored in public supergroups. */
  readonly can_pin_messages?: boolean;
  /** Optional. True, if the user is allowed to create forum topics. If omitted, defaults to the value of can_pin_messages. */
  readonly can_manage_topics?: boolean;
  readonly [key: string]: unknown;
}
export const ChatPermissions: Schema.Codec<ChatPermissions> = Schema.StructWithRest(
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

/** This object represents a chat photo. */
export interface ChatPhoto {
  /** File identifier of small (160x160) chat photo. This file_id can be used only for photo download and only for as long as the photo is not changed. */
  readonly small_file_id: string;
  /** Unique file identifier of small (160x160) chat photo, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file. */
  readonly small_file_unique_id: string;
  /** File identifier of big (640x640) chat photo. This file_id can be used only for photo download and only for as long as the photo is not changed. */
  readonly big_file_id: string;
  /** Unique file identifier of big (640x640) chat photo, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file. */
  readonly big_file_unique_id: string;
  readonly [key: string]: unknown;
}
export const ChatPhoto: Schema.Codec<ChatPhoto> = Schema.StructWithRest(
  Schema.Struct({
    small_file_id: Schema.String,
    small_file_unique_id: Schema.String,
    big_file_id: Schema.String,
    big_file_unique_id: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object contains information about a chat that was shared with the bot using a KeyboardButtonRequestChat button. */
export interface ChatShared {
  /** Identifier of the request */
  readonly request_id: number;
  /** Identifier of the shared chat. This number may have more than 32 significant bits and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a 64-bit integer or double-precision float type are safe for storing this identifier. The bot may not have access to the chat and could be unable to use this identifier, unless the chat is already known to the bot by some other means. */
  readonly chat_id: number;
  /** Optional. Title of the chat, if the title was requested by the bot */
  readonly title?: string;
  /** Optional. Username of the chat, if the username was requested by the bot and available */
  readonly username?: string;
  /** Optional. Available sizes of the chat photo, if the photo was requested by the bot */
  readonly photo?: ReadonlyArray<PhotoSize>;
  readonly [key: string]: unknown;
}
export const ChatShared: Schema.Codec<ChatShared> = Schema.StructWithRest(
  Schema.Struct({
    request_id: Schema.Int,
    chat_id: Schema.Int,
    title: Schema.optionalKey(Schema.String),
    username: Schema.optionalKey(Schema.String),
    photo: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<PhotoSize> => PhotoSize))),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Describes a checklist. */
export interface Checklist {
  /** Title of the checklist */
  readonly title: string;
  /** Optional. Special entities that appear in the checklist title */
  readonly title_entities?: ReadonlyArray<MessageEntity>;
  /** List of tasks in the checklist */
  readonly tasks: ReadonlyArray<ChecklistTask>;
  /** Optional. True, if users other than the creator of the list can add tasks to the list */
  readonly others_can_add_tasks?: true;
  /** Optional. True, if users other than the creator of the list can mark tasks as done or not done */
  readonly others_can_mark_tasks_as_done?: true;
  readonly [key: string]: unknown;
}
export const Checklist: Schema.Codec<Checklist> = Schema.StructWithRest(
  Schema.Struct({
    title: Schema.String,
    title_entities: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<MessageEntity> => MessageEntity))),
    tasks: Schema.Array(Schema.suspend((): Schema.Codec<ChecklistTask> => ChecklistTask)),
    others_can_add_tasks: Schema.optionalKey(Schema.Literal(true)),
    others_can_mark_tasks_as_done: Schema.optionalKey(Schema.Literal(true)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Describes a task in a checklist. */
export interface ChecklistTask {
  /** Unique identifier of the task */
  readonly id: number;
  /** Text of the task */
  readonly text: string;
  /** Optional. Special entities that appear in the task text */
  readonly text_entities?: ReadonlyArray<MessageEntity>;
  /** Optional. User that completed the task; omitted if the task wasn't completed by a user */
  readonly completed_by_user?: User;
  /** Optional. Chat that completed the task; omitted if the task wasn't completed by a chat */
  readonly completed_by_chat?: Chat;
  /** Optional. Point in time (Unix timestamp) when the task was completed; 0 if the task wasn't completed */
  readonly completion_date?: number;
  readonly [key: string]: unknown;
}
export const ChecklistTask: Schema.Codec<ChecklistTask> = Schema.StructWithRest(
  Schema.Struct({
    id: Schema.Int,
    text: Schema.String,
    text_entities: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<MessageEntity> => MessageEntity))),
    completed_by_user: Schema.optionalKey(Schema.suspend((): Schema.Codec<User> => User)),
    completed_by_chat: Schema.optionalKey(Schema.suspend((): Schema.Codec<Chat> => Chat)),
    completion_date: Schema.optionalKey(Schema.Int),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Describes a service message about tasks added to a checklist. */
export interface ChecklistTasksAdded {
  /** Optional. Message containing the checklist to which the tasks were added. Note that the Message object in this field will not contain the reply_to_message field even if it itself is a reply. */
  readonly checklist_message?: Message;
  /** List of tasks added to the checklist */
  readonly tasks: ReadonlyArray<ChecklistTask>;
  readonly [key: string]: unknown;
}
export const ChecklistTasksAdded: Schema.Codec<ChecklistTasksAdded> = Schema.StructWithRest(
  Schema.Struct({
    checklist_message: Schema.optionalKey(Schema.suspend((): Schema.Codec<Message> => Message)),
    tasks: Schema.Array(Schema.suspend((): Schema.Codec<ChecklistTask> => ChecklistTask)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Describes a service message about checklist tasks marked as done or not done. */
export interface ChecklistTasksDone {
  /** Optional. Message containing the checklist whose tasks were marked as done or not done. Note that the Message object in this field will not contain the reply_to_message field even if it itself is a reply. */
  readonly checklist_message?: Message;
  /** Optional. Identifiers of the tasks that were marked as done */
  readonly marked_as_done_task_ids?: ReadonlyArray<number>;
  /** Optional. Identifiers of the tasks that were marked as not done */
  readonly marked_as_not_done_task_ids?: ReadonlyArray<number>;
  readonly [key: string]: unknown;
}
export const ChecklistTasksDone: Schema.Codec<ChecklistTasksDone> = Schema.StructWithRest(
  Schema.Struct({
    checklist_message: Schema.optionalKey(Schema.suspend((): Schema.Codec<Message> => Message)),
    marked_as_done_task_ids: Schema.optionalKey(Schema.Array(Schema.Int)),
    marked_as_not_done_task_ids: Schema.optionalKey(Schema.Array(Schema.Int)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Represents a result of an inline query that was chosen by the user and sent to their chat partner. */
export interface ChosenInlineResult {
  /** The unique identifier for the result that was chosen */
  readonly result_id: string;
  /** The user that chose the result */
  readonly from: User;
  /** Optional. Sender location, only for bots that require user location */
  readonly location?: Location;
  /** Optional. Identifier of the sent inline message. Available only if there is an inline keyboard attached to the message. Will be also received in callback queries and can be used to edit the message. */
  readonly inline_message_id?: string;
  /** The query that was used to obtain the result */
  readonly query: string;
  readonly [key: string]: unknown;
}
export const ChosenInlineResult: Schema.Codec<ChosenInlineResult> = Schema.StructWithRest(
  Schema.Struct({
    result_id: Schema.String,
    from: Schema.suspend((): Schema.Codec<User> => User),
    location: Schema.optionalKey(Schema.suspend((): Schema.Codec<Location> => Location)),
    inline_message_id: Schema.optionalKey(Schema.String),
    query: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Represents a community (a group of chats). */
export interface Community {
  /** Unique identifier for this community. This number may have more than 32 significant bits and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a signed 64-bit integer or double-precision float type are safe for storing this identifier. */
  readonly id: number;
  /** Name of the community */
  readonly name: string;
  readonly [key: string]: unknown;
}
export const Community: Schema.Codec<Community> = Schema.StructWithRest(
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
export const CommunityChatAdded: Schema.Codec<CommunityChatAdded> = Schema.StructWithRest(
  Schema.Struct({
    community: Schema.suspend((): Schema.Codec<Community> => Community),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Describes a service message about a chat being joined by a user from a community. */
export interface CommunityChatJoined {
  /** The community from which the chat was joined */
  readonly community: Community;
  readonly [key: string]: unknown;
}
export const CommunityChatJoined: Schema.Codec<CommunityChatJoined> = Schema.StructWithRest(
  Schema.Struct({
    community: Schema.suspend((): Schema.Codec<Community> => Community),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Describes a service message about a chat or a bot being removed from a community. Currently holds no information. */
export interface CommunityChatRemoved {
  readonly [key: string]: unknown;
}
export const CommunityChatRemoved: Schema.Codec<CommunityChatRemoved> = Schema.StructWithRest(
  Schema.Struct({}),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object represents a phone contact. */
export interface Contact {
  /** Contact's phone number */
  readonly phone_number: string;
  /** Contact's first name */
  readonly first_name: string;
  /** Optional. Contact's last name */
  readonly last_name?: string;
  /** Optional. Contact's user identifier in Telegram. This number may have more than 32 significant bits and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a 64-bit integer or double-precision float type are safe for storing this identifier. */
  readonly user_id?: number;
  /** Optional. Additional data about the contact in the form of a vCard */
  readonly vcard?: string;
  readonly [key: string]: unknown;
}
export const Contact: Schema.Codec<Contact> = Schema.StructWithRest(
  Schema.Struct({
    phone_number: Schema.String,
    first_name: Schema.String,
    last_name: Schema.optionalKey(Schema.String),
    user_id: Schema.optionalKey(Schema.Int),
    vcard: Schema.optionalKey(Schema.String),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object represents an inline keyboard button that copies specified text to the clipboard. */
export interface CopyTextButton {
  /** The text to be copied to the clipboard; 1-256 characters */
  readonly text: string;
  readonly [key: string]: unknown;
}
export const CopyTextButton: Schema.Codec<CopyTextButton> = Schema.StructWithRest(
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
export const Dice: Schema.Codec<Dice> = Schema.StructWithRest(
  Schema.Struct({
    emoji: Schema.suspend((): Schema.Codec<DiceEmoji> => DiceEmoji),
    value: Schema.Int,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Describes a service message about a change in the price of direct messages sent to a channel chat. */
export interface DirectMessagePriceChanged {
  /** True, if direct messages are enabled for the channel chat; False otherwise */
  readonly are_direct_messages_enabled: boolean;
  /** Optional. The new number of Telegram Stars that must be paid by users for each direct message sent to the channel. Does not apply to users who have been exempted by administrators. Defaults to 0. */
  readonly direct_message_star_count?: number;
  readonly [key: string]: unknown;
}
export const DirectMessagePriceChanged: Schema.Codec<DirectMessagePriceChanged> = Schema.StructWithRest(
  Schema.Struct({
    are_direct_messages_enabled: Schema.Boolean,
    direct_message_star_count: Schema.optionalKey(Schema.Int),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Describes a topic of a direct messages chat. */
export interface DirectMessagesTopic {
  /** Unique identifier of the topic. This number may have more than 32 significant bits and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a 64-bit integer or double-precision float type are safe for storing this identifier. */
  readonly topic_id: number;
  /** Optional. Information about the user that created the topic. Currently, it is always present. */
  readonly user?: User;
  readonly [key: string]: unknown;
}
export const DirectMessagesTopic: Schema.Codec<DirectMessagesTopic> = Schema.StructWithRest(
  Schema.Struct({
    topic_id: Schema.Int,
    user: Schema.optionalKey(Schema.suspend((): Schema.Codec<User> => User)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object represents a disabled button which does nothing. Currently holds no information. */
export interface DisabledButton {
  readonly [key: string]: unknown;
}
export const DisabledButton: Schema.Codec<DisabledButton> = Schema.StructWithRest(
  Schema.Struct({}),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object represents a general file (as opposed to photos, voice messages and audio files). */
export interface Document {
  /** Identifier for this file, which can be used to download or reuse the file */
  readonly file_id: string;
  /** Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file. */
  readonly file_unique_id: string;
  /** Optional. Document thumbnail as defined by the sender */
  readonly thumbnail?: PhotoSize;
  /** Optional. Original filename as defined by the sender */
  readonly file_name?: string;
  /** Optional. MIME type of the file as defined by the sender */
  readonly mime_type?: string;
  /** Optional. File size in bytes. It can be bigger than 2^31 and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a signed 64-bit integer or double-precision float type are safe for storing this value. */
  readonly file_size?: number;
  readonly [key: string]: unknown;
}
export const Document: Schema.Codec<Document> = Schema.StructWithRest(
  Schema.Struct({
    file_id: Schema.String,
    file_unique_id: Schema.String,
    thumbnail: Schema.optionalKey(Schema.suspend((): Schema.Codec<PhotoSize> => PhotoSize)),
    file_name: Schema.optionalKey(Schema.String),
    mime_type: Schema.optionalKey(Schema.String),
    file_size: Schema.optionalKey(Schema.Int),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
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
export const EncryptedCredentials: Schema.Codec<EncryptedCredentials> = Schema.StructWithRest(
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
  readonly phone_number?: string;
  /** Optional. User's verified email address; available only for “email” type */
  readonly email?: string;
  /** Optional. Array of encrypted files with documents provided by the user; available only for “utility_bill”, “bank_statement”, “rental_agreement”, “passport_registration” and “temporary_registration” types. Files can be decrypted and verified using the accompanying EncryptedCredentials. */
  readonly files?: ReadonlyArray<PassportFile>;
  /** Optional. Encrypted file with the front side of the document, provided by the user; available only for “passport”, “driver_license”, “identity_card” and “internal_passport”. The file can be decrypted and verified using the accompanying EncryptedCredentials. */
  readonly front_side?: PassportFile;
  /** Optional. Encrypted file with the reverse side of the document, provided by the user; available only for “driver_license” and “identity_card”. The file can be decrypted and verified using the accompanying EncryptedCredentials. */
  readonly reverse_side?: PassportFile;
  /** Optional. Encrypted file with the selfie of the user holding a document, provided by the user; available if requested for “passport”, “driver_license”, “identity_card” and “internal_passport”. The file can be decrypted and verified using the accompanying EncryptedCredentials. */
  readonly selfie?: PassportFile;
  /** Optional. Array of encrypted files with translated versions of documents provided by the user; available if requested for “passport”, “driver_license”, “identity_card”, “internal_passport”, “utility_bill”, “bank_statement”, “rental_agreement”, “passport_registration” and “temporary_registration” types. Files can be decrypted and verified using the accompanying EncryptedCredentials. */
  readonly translation?: ReadonlyArray<PassportFile>;
  /** Base64-encoded element hash for using in PassportElementErrorUnspecified */
  readonly hash: string;
  readonly [key: string]: unknown;
}
export const EncryptedPassportElement: Schema.Codec<EncryptedPassportElement> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.suspend((): Schema.Codec<EncryptedPassportElementType> => EncryptedPassportElementType),
    data: Schema.optionalKey(Schema.String),
    phone_number: Schema.optionalKey(Schema.String),
    email: Schema.optionalKey(Schema.String),
    files: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<PassportFile> => PassportFile))),
    front_side: Schema.optionalKey(Schema.suspend((): Schema.Codec<PassportFile> => PassportFile)),
    reverse_side: Schema.optionalKey(Schema.suspend((): Schema.Codec<PassportFile> => PassportFile)),
    selfie: Schema.optionalKey(Schema.suspend((): Schema.Codec<PassportFile> => PassportFile)),
    translation: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<PassportFile> => PassportFile))),
    hash: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/**  */
export interface EphemeralMessageParameters {
  /** Identifier of the user who will receive the message. It is not guaranteed that the user will receive the message, especially if they are offline. See here for more details. */
  readonly receiver_user_id: number;
  /** Optional. Identifier of the callback query which triggered the message, if any */
  readonly callback_query_id?: string;
  /** Optional. Pass True if the ephemeral message must be shown in place of the original message. Must be False for callback queries from ephemeral messages, which must be edited using regular editEphemeralMessage… methods. */
  readonly replace_callback_query_message?: boolean;
  readonly [key: string]: unknown;
}
export const EphemeralMessageParameters: Schema.Codec<EphemeralMessageParameters> = Schema.StructWithRest(
  Schema.Struct({
    receiver_user_id: Schema.Int,
    callback_query_id: Schema.optionalKey(Schema.String),
    replace_callback_query_message: Schema.optionalKey(Schema.Boolean),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object contains information about a message that is being replied to, which may come from another chat or forum topic. */
export interface ExternalReplyInfo {
  /** Origin of the message replied to by the given message */
  readonly origin: MessageOrigin;
  /** Optional. Chat the original message belongs to. Available only if the chat is a supergroup or a channel. */
  readonly chat?: Chat;
  /** Optional. Unique message identifier inside the original chat. Available only if the original chat is a supergroup or a channel. */
  readonly message_id?: number;
  /** Optional. Options used for link preview generation for the original message, if it is a text message */
  readonly link_preview_options?: LinkPreviewOptions;
  /** Optional. Message is an animation, information about the animation */
  readonly animation?: Animation;
  /** Optional. Message is an audio file, information about the file */
  readonly audio?: Audio;
  /** Optional. Message is a general file, information about the file */
  readonly document?: Document;
  /** Optional. Message is a live photo, information about the live photo */
  readonly live_photo?: LivePhoto;
  /** Optional. Message contains paid media; information about the paid media */
  readonly paid_media?: PaidMediaInfo;
  /** Optional. Message is a photo, available sizes of the photo */
  readonly photo?: ReadonlyArray<PhotoSize>;
  /** Optional. Message is a sticker, information about the sticker */
  readonly sticker?: Sticker;
  /** Optional. Message is a forwarded story */
  readonly story?: Story;
  /** Optional. Message is a video, information about the video */
  readonly video?: Video;
  /** Optional. Message is a video note, information about the video message */
  readonly video_note?: VideoNote;
  /** Optional. Message is a voice message, information about the file */
  readonly voice?: Voice;
  /** Optional. True, if the message media is covered by a spoiler animation */
  readonly has_media_spoiler?: true;
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
  readonly giveaway_winners?: GiveawayWinners;
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
export const ExternalReplyInfo: Schema.Codec<ExternalReplyInfo> = Schema.StructWithRest(
  Schema.Struct({
    origin: Schema.suspend((): Schema.Codec<MessageOrigin> => MessageOrigin),
    chat: Schema.optionalKey(Schema.suspend((): Schema.Codec<Chat> => Chat)),
    message_id: Schema.optionalKey(Schema.Int),
    link_preview_options: Schema.optionalKey(Schema.suspend((): Schema.Codec<LinkPreviewOptions> => LinkPreviewOptions)),
    animation: Schema.optionalKey(Schema.suspend((): Schema.Codec<Animation> => Animation)),
    audio: Schema.optionalKey(Schema.suspend((): Schema.Codec<Audio> => Audio)),
    document: Schema.optionalKey(Schema.suspend((): Schema.Codec<Document> => Document)),
    live_photo: Schema.optionalKey(Schema.suspend((): Schema.Codec<LivePhoto> => LivePhoto)),
    paid_media: Schema.optionalKey(Schema.suspend((): Schema.Codec<PaidMediaInfo> => PaidMediaInfo)),
    photo: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<PhotoSize> => PhotoSize))),
    sticker: Schema.optionalKey(Schema.suspend((): Schema.Codec<Sticker> => Sticker)),
    story: Schema.optionalKey(Schema.suspend((): Schema.Codec<Story> => Story)),
    video: Schema.optionalKey(Schema.suspend((): Schema.Codec<Video> => Video)),
    video_note: Schema.optionalKey(Schema.suspend((): Schema.Codec<VideoNote> => VideoNote)),
    voice: Schema.optionalKey(Schema.suspend((): Schema.Codec<Voice> => Voice)),
    has_media_spoiler: Schema.optionalKey(Schema.Literal(true)),
    checklist: Schema.optionalKey(Schema.suspend((): Schema.Codec<Checklist> => Checklist)),
    contact: Schema.optionalKey(Schema.suspend((): Schema.Codec<Contact> => Contact)),
    dice: Schema.optionalKey(Schema.suspend((): Schema.Codec<Dice> => Dice)),
    game: Schema.optionalKey(Schema.suspend((): Schema.Codec<Game> => Game)),
    giveaway: Schema.optionalKey(Schema.suspend((): Schema.Codec<Giveaway> => Giveaway)),
    giveaway_winners: Schema.optionalKey(Schema.suspend((): Schema.Codec<GiveawayWinners> => GiveawayWinners)),
    invoice: Schema.optionalKey(Schema.suspend((): Schema.Codec<Invoice> => Invoice)),
    location: Schema.optionalKey(Schema.suspend((): Schema.Codec<Location> => Location)),
    poll: Schema.optionalKey(Schema.suspend((): Schema.Codec<Poll> => Poll)),
    venue: Schema.optionalKey(Schema.suspend((): Schema.Codec<Venue> => Venue)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object represents a file ready to be downloaded. The file can be downloaded via the link https://api.telegram.org/file/bot<token>/<file_path>. It is guaranteed that the link will be valid for at least 1 hour. When the link expires, a new one can be requested by calling getFile. */
export interface File {
  /** Identifier for this file, which can be used to download or reuse the file */
  readonly file_id: string;
  /** Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file. */
  readonly file_unique_id: string;
  /** Optional. File size in bytes. It can be bigger than 2^31 and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a signed 64-bit integer or double-precision float type are safe for storing this value. */
  readonly file_size?: number;
  /** Optional. File path. Use https://api.telegram.org/file/bot<token>/<file_path> to get the file. */
  readonly file_path?: string;
  readonly [key: string]: unknown;
}
export const File: Schema.Codec<File> = Schema.StructWithRest(
  Schema.Struct({
    file_id: Schema.String,
    file_unique_id: Schema.String,
    file_size: Schema.optionalKey(Schema.Int),
    file_path: Schema.optionalKey(Schema.String),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Upon receiving a message with this object, Telegram clients will display a reply interface to the user (act as if the user has selected the bot's message and tapped 'Reply'). This can be extremely useful if you want to create user-friendly step-by-step interfaces without having to sacrifice privacy mode. Not supported in channels and for messages sent on behalf of a user account. */
export interface ForceReply {
  /** Shows reply interface to the user, as if they had manually selected the bot's message and tapped 'Reply' */
  readonly force_reply: true;
  /** Optional. The placeholder to be shown in the input field when the reply is active; 1-64 characters */
  readonly input_field_placeholder?: string;
  /** Optional. Use this parameter if you want to force reply from specific users only. Targets: 1) users that are @mentioned in the text of the Message object; 2) if the bot's message is a reply to a message in the same chat and forum topic, sender of the original message. */
  readonly selective?: boolean;
  readonly [key: string]: unknown;
}
export const ForceReply: Schema.Codec<ForceReply> = Schema.StructWithRest(
  Schema.Struct({
    force_reply: Schema.Literal(true),
    input_field_placeholder: Schema.optionalKey(Schema.String),
    selective: Schema.optionalKey(Schema.Boolean),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object represents a forum topic. */
export interface ForumTopic {
  /** Unique identifier of the forum topic */
  readonly message_thread_id: number;
  /** Name of the topic */
  readonly name: string;
  /** Color of the topic icon in RGB format */
  readonly icon_color: number;
  /** Optional. Unique identifier of the custom emoji shown as the topic icon */
  readonly icon_custom_emoji_id?: string;
  /** Optional. True, if the name of the topic wasn't specified explicitly by its creator and likely needs to be changed by the bot */
  readonly is_name_implicit?: true;
  readonly [key: string]: unknown;
}
export const ForumTopic: Schema.Codec<ForumTopic> = Schema.StructWithRest(
  Schema.Struct({
    message_thread_id: Schema.Int,
    name: Schema.String,
    icon_color: Schema.Int,
    icon_custom_emoji_id: Schema.optionalKey(Schema.String),
    is_name_implicit: Schema.optionalKey(Schema.Literal(true)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object represents a service message about a forum topic closed in the chat. Currently holds no information. */
export interface ForumTopicClosed {
  readonly [key: string]: unknown;
}
export const ForumTopicClosed: Schema.Codec<ForumTopicClosed> = Schema.StructWithRest(
  Schema.Struct({}),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object represents a service message about a new forum topic created in the chat. */
export interface ForumTopicCreated {
  /** Name of the topic */
  readonly name: string;
  /** Color of the topic icon in RGB format */
  readonly icon_color: number;
  /** Optional. Unique identifier of the custom emoji shown as the topic icon */
  readonly icon_custom_emoji_id?: string;
  /** Optional. True, if the name of the topic wasn't specified explicitly by its creator and likely needs to be changed by the bot */
  readonly is_name_implicit?: true;
  readonly [key: string]: unknown;
}
export const ForumTopicCreated: Schema.Codec<ForumTopicCreated> = Schema.StructWithRest(
  Schema.Struct({
    name: Schema.String,
    icon_color: Schema.Int,
    icon_custom_emoji_id: Schema.optionalKey(Schema.String),
    is_name_implicit: Schema.optionalKey(Schema.Literal(true)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object represents a service message about an edited forum topic. */
export interface ForumTopicEdited {
  /** Optional. New name of the topic, if it was edited */
  readonly name?: string;
  /** Optional. New identifier of the custom emoji shown as the topic icon, if it was edited; an empty string if the icon was removed */
  readonly icon_custom_emoji_id?: string;
  readonly [key: string]: unknown;
}
export const ForumTopicEdited: Schema.Codec<ForumTopicEdited> = Schema.StructWithRest(
  Schema.Struct({
    name: Schema.optionalKey(Schema.String),
    icon_custom_emoji_id: Schema.optionalKey(Schema.String),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object represents a service message about a forum topic reopened in the chat. Currently holds no information. */
export interface ForumTopicReopened {
  readonly [key: string]: unknown;
}
export const ForumTopicReopened: Schema.Codec<ForumTopicReopened> = Schema.StructWithRest(
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
  readonly text_entities?: ReadonlyArray<MessageEntity>;
  /** Optional. Animation that will be displayed in the game message in chats. Upload via BotFather. */
  readonly animation?: Animation;
  readonly [key: string]: unknown;
}
export const Game: Schema.Codec<Game> = Schema.StructWithRest(
  Schema.Struct({
    title: Schema.String,
    description: Schema.String,
    photo: Schema.Array(Schema.suspend((): Schema.Codec<PhotoSize> => PhotoSize)),
    text: Schema.optionalKey(Schema.String),
    text_entities: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<MessageEntity> => MessageEntity))),
    animation: Schema.optionalKey(Schema.suspend((): Schema.Codec<Animation> => Animation)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
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
export const GameHighScore: Schema.Codec<GameHighScore> = Schema.StructWithRest(
  Schema.Struct({
    position: Schema.Int,
    user: Schema.suspend((): Schema.Codec<User> => User),
    score: Schema.Int,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object represents a service message about General forum topic hidden in the chat. Currently holds no information. */
export interface GeneralForumTopicHidden {
  readonly [key: string]: unknown;
}
export const GeneralForumTopicHidden: Schema.Codec<GeneralForumTopicHidden> = Schema.StructWithRest(
  Schema.Struct({}),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object represents a service message about General forum topic unhidden in the chat. Currently holds no information. */
export interface GeneralForumTopicUnhidden {
  readonly [key: string]: unknown;
}
export const GeneralForumTopicUnhidden: Schema.Codec<GeneralForumTopicUnhidden> = Schema.StructWithRest(
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
  readonly star_count: number;
  /** Optional. The number of Telegram Stars that must be paid to upgrade the gift to a unique one */
  readonly upgrade_star_count?: number;
  /** Optional. True, if the gift can only be purchased by Telegram Premium subscribers */
  readonly is_premium?: true;
  /** Optional. True, if the gift can be used (after being upgraded) to customize a user's appearance */
  readonly has_colors?: true;
  /** Optional. The total number of gifts of this type that can be sent by all users; for limited gifts only */
  readonly total_count?: number;
  /** Optional. The number of remaining gifts of this type that can be sent by all users; for limited gifts only */
  readonly remaining_count?: number;
  /** Optional. The total number of gifts of this type that can be sent by the bot; for limited gifts only */
  readonly personal_total_count?: number;
  /** Optional. The number of remaining gifts of this type that can be sent by the bot; for limited gifts only */
  readonly personal_remaining_count?: number;
  /** Optional. Background of the gift */
  readonly background?: GiftBackground;
  /** Optional. The total number of different unique gifts that can be obtained by upgrading the gift */
  readonly unique_gift_variant_count?: number;
  /** Optional. Information about the chat that published the gift */
  readonly publisher_chat?: Chat;
  readonly [key: string]: unknown;
}
export const Gift: Schema.Codec<Gift> = Schema.StructWithRest(
  Schema.Struct({
    id: Schema.String,
    sticker: Schema.suspend((): Schema.Codec<Sticker> => Sticker),
    star_count: Schema.Int,
    upgrade_star_count: Schema.optionalKey(Schema.Int),
    is_premium: Schema.optionalKey(Schema.Literal(true)),
    has_colors: Schema.optionalKey(Schema.Literal(true)),
    total_count: Schema.optionalKey(Schema.Int),
    remaining_count: Schema.optionalKey(Schema.Int),
    personal_total_count: Schema.optionalKey(Schema.Int),
    personal_remaining_count: Schema.optionalKey(Schema.Int),
    background: Schema.optionalKey(Schema.suspend((): Schema.Codec<GiftBackground> => GiftBackground)),
    unique_gift_variant_count: Schema.optionalKey(Schema.Int),
    publisher_chat: Schema.optionalKey(Schema.suspend((): Schema.Codec<Chat> => Chat)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object describes the background of a gift. */
export interface GiftBackground {
  /** Center color of the background in RGB format */
  readonly center_color: number;
  /** Edge color of the background in RGB format */
  readonly edge_color: number;
  /** Text color of the background in RGB format */
  readonly text_color: number;
  readonly [key: string]: unknown;
}
export const GiftBackground: Schema.Codec<GiftBackground> = Schema.StructWithRest(
  Schema.Struct({
    center_color: Schema.Int,
    edge_color: Schema.Int,
    text_color: Schema.Int,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Describes a service message about a regular gift that was sent or received. */
export interface GiftInfo {
  /** Information about the gift */
  readonly gift: Gift;
  /** Optional. Unique identifier of the received gift for the bot; only present for gifts received on behalf of business accounts */
  readonly owned_gift_id?: string;
  /** Optional. Number of Telegram Stars that can be claimed by the receiver by converting the gift; omitted if conversion to Telegram Stars is impossible */
  readonly convert_star_count?: number;
  /** Optional. Number of Telegram Stars that were prepaid for the ability to upgrade the gift */
  readonly prepaid_upgrade_star_count?: number;
  /** Optional. True, if the gift's upgrade was purchased after the gift was sent */
  readonly is_upgrade_separate?: true;
  /** Optional. True, if the gift can be upgraded to a unique gift */
  readonly can_be_upgraded?: true;
  /** Optional. Text of the message that was added to the gift */
  readonly text?: string;
  /** Optional. Special entities that appear in the text */
  readonly entities?: ReadonlyArray<MessageEntity>;
  /** Optional. True, if the sender and gift text are shown only to the gift receiver; otherwise, everyone will be able to see them */
  readonly is_private?: true;
  /** Optional. Unique number reserved for this gift when upgraded. See the number field in UniqueGift. */
  readonly unique_gift_number?: number;
  readonly [key: string]: unknown;
}
export const GiftInfo: Schema.Codec<GiftInfo> = Schema.StructWithRest(
  Schema.Struct({
    gift: Schema.suspend((): Schema.Codec<Gift> => Gift),
    owned_gift_id: Schema.optionalKey(Schema.String),
    convert_star_count: Schema.optionalKey(Schema.Int),
    prepaid_upgrade_star_count: Schema.optionalKey(Schema.Int),
    is_upgrade_separate: Schema.optionalKey(Schema.Literal(true)),
    can_be_upgraded: Schema.optionalKey(Schema.Literal(true)),
    text: Schema.optionalKey(Schema.String),
    entities: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<MessageEntity> => MessageEntity))),
    is_private: Schema.optionalKey(Schema.Literal(true)),
    unique_gift_number: Schema.optionalKey(Schema.Int),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object represent a list of gifts. */
export interface Gifts {
  /** The list of gifts */
  readonly gifts: ReadonlyArray<Gift>;
  readonly [key: string]: unknown;
}
export const Gifts: Schema.Codec<Gifts> = Schema.StructWithRest(
  Schema.Struct({
    gifts: Schema.Array(Schema.suspend((): Schema.Codec<Gift> => Gift)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object represents a message about a scheduled giveaway. */
export interface Giveaway {
  /** The list of chats which the user must join to participate in the giveaway */
  readonly chats: ReadonlyArray<Chat>;
  /** Point in time (Unix timestamp) when winners of the giveaway will be selected */
  readonly winners_selection_date: number;
  /** The number of users which are supposed to be selected as winners of the giveaway */
  readonly winner_count: number;
  /** Optional. True, if only users who join the chats after the giveaway started should be eligible to win */
  readonly only_new_members?: true;
  /** Optional. True, if the list of giveaway winners will be visible to everyone */
  readonly has_public_winners?: true;
  /** Optional. Description of additional giveaway prize */
  readonly prize_description?: string;
  /** Optional. A list of two-letter ISO 3166-1 alpha-2 country codes indicating the countries from which eligible users for the giveaway must come. If empty, then all users can participate in the giveaway. Users with a phone number that was bought on Fragment can always participate in giveaways. */
  readonly country_codes?: ReadonlyArray<string>;
  /** Optional. The number of Telegram Stars to be split between giveaway winners; for Telegram Star giveaways only */
  readonly prize_star_count?: number;
  /** Optional. The number of months the Telegram Premium subscription won from the giveaway will be active for; for Telegram Premium giveaways only */
  readonly premium_subscription_month_count?: number;
  readonly [key: string]: unknown;
}
export const Giveaway: Schema.Codec<Giveaway> = Schema.StructWithRest(
  Schema.Struct({
    chats: Schema.Array(Schema.suspend((): Schema.Codec<Chat> => Chat)),
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

/** This object represents a service message about the completion of a giveaway without public winners. */
export interface GiveawayCompleted {
  /** Number of winners in the giveaway */
  readonly winner_count: number;
  /** Optional. Number of undistributed prizes */
  readonly unclaimed_prize_count?: number;
  /** Optional. Message with the giveaway that was completed, if it wasn't deleted */
  readonly giveaway_message?: Message;
  /** Optional. True, if the giveaway is a Telegram Star giveaway. Otherwise, currently, the giveaway is a Telegram Premium giveaway. */
  readonly is_star_giveaway?: true;
  readonly [key: string]: unknown;
}
export const GiveawayCompleted: Schema.Codec<GiveawayCompleted> = Schema.StructWithRest(
  Schema.Struct({
    winner_count: Schema.Int,
    unclaimed_prize_count: Schema.optionalKey(Schema.Int),
    giveaway_message: Schema.optionalKey(Schema.suspend((): Schema.Codec<Message> => Message)),
    is_star_giveaway: Schema.optionalKey(Schema.Literal(true)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object represents a service message about the creation of a scheduled giveaway. */
export interface GiveawayCreated {
  /** Optional. The number of Telegram Stars to be split between giveaway winners; for Telegram Star giveaways only */
  readonly prize_star_count?: number;
  readonly [key: string]: unknown;
}
export const GiveawayCreated: Schema.Codec<GiveawayCreated> = Schema.StructWithRest(
  Schema.Struct({
    prize_star_count: Schema.optionalKey(Schema.Int),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object represents a message about the completion of a giveaway with public winners. */
export interface GiveawayWinners {
  /** The chat that created the giveaway */
  readonly chat: Chat;
  /** Identifier of the message with the giveaway in the chat */
  readonly giveaway_message_id: number;
  /** Point in time (Unix timestamp) when winners of the giveaway were selected */
  readonly winners_selection_date: number;
  /** Total number of winners in the giveaway */
  readonly winner_count: number;
  /** List of up to 100 winners of the giveaway */
  readonly winners: ReadonlyArray<User>;
  /** Optional. The number of other chats the user had to join in order to be eligible for the giveaway */
  readonly additional_chat_count?: number;
  /** Optional. The number of Telegram Stars that were split between giveaway winners; for Telegram Star giveaways only */
  readonly prize_star_count?: number;
  /** Optional. The number of months the Telegram Premium subscription won from the giveaway will be active for; for Telegram Premium giveaways only */
  readonly premium_subscription_month_count?: number;
  /** Optional. Number of undistributed prizes */
  readonly unclaimed_prize_count?: number;
  /** Optional. True, if only users who had joined the chats after the giveaway started were eligible to win */
  readonly only_new_members?: true;
  /** Optional. True, if the giveaway was canceled because the payment for it was refunded */
  readonly was_refunded?: true;
  /** Optional. Description of additional giveaway prize */
  readonly prize_description?: string;
  readonly [key: string]: unknown;
}
export const GiveawayWinners: Schema.Codec<GiveawayWinners> = Schema.StructWithRest(
  Schema.Struct({
    chat: Schema.suspend((): Schema.Codec<Chat> => Chat),
    giveaway_message_id: Schema.Int,
    winners_selection_date: Schema.Int,
    winner_count: Schema.Int,
    winners: Schema.Array(Schema.suspend((): Schema.Codec<User> => User)),
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

/** This object describes a message that was deleted or is otherwise inaccessible to the bot. */
export interface InaccessibleMessage {
  /** Chat the message belonged to */
  readonly chat: Chat;
  /** Unique message identifier inside the chat */
  readonly message_id: number;
  /** Always 0. The field can be used to differentiate regular and inaccessible messages. */
  readonly date: number;
  readonly [key: string]: unknown;
}
export const InaccessibleMessage: Schema.Codec<InaccessibleMessage> = Schema.StructWithRest(
  Schema.Struct({
    chat: Schema.suspend((): Schema.Codec<Chat> => Chat),
    message_id: Schema.Int,
    date: Schema.Int,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object represents one button of an inline keyboard. Exactly one of the fields other than text, icon_custom_emoji_id, and style must be used to specify the type of the button. */
export interface InlineKeyboardButton {
  /** Label text on the button */
  readonly text: string;
  /** Optional. Unique identifier of the custom emoji shown before the text of the button. Can only be used by bots that purchased additional usernames on Fragment or in the messages directly sent by the bot to private, group and supergroup chats if the owner of the bot has a Telegram Premium subscription. */
  readonly icon_custom_emoji_id?: string;
  /** Optional. Style of the button. Must be one of “danger” (red), “success” (green) or “primary” (blue). If omitted, then an app-specific style is used. */
  readonly style?: string;
  /** Optional. HTTP or tg:// URL to be opened when the button is pressed. Links tg://user?id=<user_id> can be used to mention a user by their identifier without using a username, if this is allowed by their privacy settings. */
  readonly url?: string;
  /** Optional. Data to be sent in a callback query to the bot when the button is pressed, 1-64 bytes */
  readonly callback_data?: string;
  /** Optional. Description of the Web App that will be launched when the user presses the button. The Web App will be able to send an arbitrary message on behalf of the user using the method answerWebAppQuery. Available only in private chats between a user and the bot. Not supported for messages sent on behalf of a business account. */
  readonly web_app?: WebAppInfo;
  /** Optional. An HTTPS URL used to automatically authorize the user. Can be used as a replacement for the Telegram Login Widget. Not supported for ephemeral messages. */
  readonly login_url?: LoginUrl;
  /** Optional. If set, pressing the button will prompt the user to select one of their chats, open that chat and insert the bot's username and the specified inline query in the input field. May be empty, in which case just the bot's username will be inserted. Not supported for messages sent in channel direct messages chats and on behalf of a business account. */
  readonly switch_inline_query?: string;
  /** Optional. If set, pressing the button will insert the bot's username and the specified inline query in the current chat's input field. May be empty, in which case only the bot's username will be inserted.

This offers a quick way for the user to open your bot in inline mode in the same chat - good for selecting something from multiple options. Not supported in channels and for messages sent in channel direct messages chats and on behalf of a business account. */
  readonly switch_inline_query_current_chat?: string;
  /** Optional. If set, pressing the button will prompt the user to select one of their chats of the specified type, open that chat and insert the bot's username and the specified inline query in the input field. Not supported for messages sent in channel direct messages chats and on behalf of a business account. */
  readonly switch_inline_query_chosen_chat?: SwitchInlineQueryChosenChat;
  /** Optional. Description of the button that copies the specified text to the clipboard */
  readonly copy_text?: CopyTextButton;
  /** Optional. Description of the game that will be launched when the user presses the button.

NOTE: This type of button must always be the first button in the first row. */
  readonly callback_game?: CallbackGame;
  /** Optional. Specify True, to send a Pay button. Substrings “⭐” and “XTR” in the buttons's text will be replaced with a Telegram Star icon.

NOTE: This type of button must always be the first button in the first row and can only be used in invoice messages. */
  readonly pay?: boolean;
  /** Optional. If set, then the button is disabled and does nothing */
  readonly disabled?: DisabledButton;
  readonly [key: string]: unknown;
}
export const InlineKeyboardButton: Schema.Codec<InlineKeyboardButton> = Schema.StructWithRest(
  Schema.Struct({
    text: Schema.String,
    icon_custom_emoji_id: Schema.optionalKey(Schema.String),
    style: Schema.optionalKey(Schema.String),
    url: Schema.optionalKey(Schema.String),
    callback_data: Schema.optionalKey(Schema.String),
    web_app: Schema.optionalKey(Schema.suspend((): Schema.Codec<WebAppInfo> => WebAppInfo)),
    login_url: Schema.optionalKey(Schema.suspend((): Schema.Codec<LoginUrl> => LoginUrl)),
    switch_inline_query: Schema.optionalKey(Schema.String),
    switch_inline_query_current_chat: Schema.optionalKey(Schema.String),
    switch_inline_query_chosen_chat: Schema.optionalKey(Schema.suspend((): Schema.Codec<SwitchInlineQueryChosenChat> => SwitchInlineQueryChosenChat)),
    copy_text: Schema.optionalKey(Schema.suspend((): Schema.Codec<CopyTextButton> => CopyTextButton)),
    callback_game: Schema.optionalKey(Schema.suspend((): Schema.Codec<CallbackGame> => CallbackGame)),
    pay: Schema.optionalKey(Schema.Boolean),
    disabled: Schema.optionalKey(Schema.suspend((): Schema.Codec<DisabledButton> => DisabledButton)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object represents an inline keyboard that appears right next to the message it belongs to. */
export interface InlineKeyboardMarkup {
  /** Array of button rows, each represented by an Array of InlineKeyboardButton objects */
  readonly inline_keyboard: ReadonlyArray<ReadonlyArray<InlineKeyboardButton>>;
  /** Optional. Pass True if the reply interface must be shown to the user, as if they had manually selected the bot's message and tapped 'Reply'. The value of the field can't be changed when the inline keyboard is edited. */
  readonly force_reply?: boolean;
  readonly [key: string]: unknown;
}
export const InlineKeyboardMarkup: Schema.Codec<InlineKeyboardMarkup> = Schema.StructWithRest(
  Schema.Struct({
    inline_keyboard: Schema.Array(Schema.Array(Schema.suspend((): Schema.Codec<InlineKeyboardButton> => InlineKeyboardButton))),
    force_reply: Schema.optionalKey(Schema.Boolean),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
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
  readonly chat_type?: InlineQueryChatType;
  /** Optional. Sender location, only for bots that request user location */
  readonly location?: Location;
  readonly [key: string]: unknown;
}
export const InlineQuery: Schema.Codec<InlineQuery> = Schema.StructWithRest(
  Schema.Struct({
    id: Schema.String,
    from: Schema.suspend((): Schema.Codec<User> => User),
    query: Schema.String,
    offset: Schema.String,
    chat_type: Schema.optionalKey(Schema.suspend((): Schema.Codec<InlineQueryChatType> => InlineQueryChatType)),
    location: Schema.optionalKey(Schema.suspend((): Schema.Codec<Location> => Location)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object represents one result of an inline query. Telegram clients currently support results of the following 20 types: */
export type InlineQueryResult = InlineQueryResultCachedAudio | InlineQueryResultCachedDocument | InlineQueryResultCachedGif | InlineQueryResultCachedMpeg4Gif | InlineQueryResultCachedPhoto | InlineQueryResultCachedSticker | InlineQueryResultCachedVideo | InlineQueryResultCachedVoice | InlineQueryResultArticle | InlineQueryResultAudio | InlineQueryResultContact | InlineQueryResultGame | InlineQueryResultDocument | InlineQueryResultGif | InlineQueryResultLocation | InlineQueryResultMpeg4Gif | InlineQueryResultPhoto | InlineQueryResultVenue | InlineQueryResultVideo | InlineQueryResultVoice;
export const InlineQueryResult: Schema.Codec<InlineQueryResult> = Schema.Union([Schema.suspend((): Schema.Codec<InlineQueryResultCachedAudio> => InlineQueryResultCachedAudio), Schema.suspend((): Schema.Codec<InlineQueryResultCachedDocument> => InlineQueryResultCachedDocument), Schema.suspend((): Schema.Codec<InlineQueryResultCachedGif> => InlineQueryResultCachedGif), Schema.suspend((): Schema.Codec<InlineQueryResultCachedMpeg4Gif> => InlineQueryResultCachedMpeg4Gif), Schema.suspend((): Schema.Codec<InlineQueryResultCachedPhoto> => InlineQueryResultCachedPhoto), Schema.suspend((): Schema.Codec<InlineQueryResultCachedSticker> => InlineQueryResultCachedSticker), Schema.suspend((): Schema.Codec<InlineQueryResultCachedVideo> => InlineQueryResultCachedVideo), Schema.suspend((): Schema.Codec<InlineQueryResultCachedVoice> => InlineQueryResultCachedVoice), Schema.suspend((): Schema.Codec<InlineQueryResultArticle> => InlineQueryResultArticle), Schema.suspend((): Schema.Codec<InlineQueryResultAudio> => InlineQueryResultAudio), Schema.suspend((): Schema.Codec<InlineQueryResultContact> => InlineQueryResultContact), Schema.suspend((): Schema.Codec<InlineQueryResultGame> => InlineQueryResultGame), Schema.suspend((): Schema.Codec<InlineQueryResultDocument> => InlineQueryResultDocument), Schema.suspend((): Schema.Codec<InlineQueryResultGif> => InlineQueryResultGif), Schema.suspend((): Schema.Codec<InlineQueryResultLocation> => InlineQueryResultLocation), Schema.suspend((): Schema.Codec<InlineQueryResultMpeg4Gif> => InlineQueryResultMpeg4Gif), Schema.suspend((): Schema.Codec<InlineQueryResultPhoto> => InlineQueryResultPhoto), Schema.suspend((): Schema.Codec<InlineQueryResultVenue> => InlineQueryResultVenue), Schema.suspend((): Schema.Codec<InlineQueryResultVideo> => InlineQueryResultVideo), Schema.suspend((): Schema.Codec<InlineQueryResultVoice> => InlineQueryResultVoice)]);

/** Represents a link to an article or web page. */
export interface InlineQueryResultArticle {
  /** Type of the result, must be article */
  readonly type: string;
  /** Unique identifier for this result, 1-64 Bytes */
  readonly id: string;
  /** Title of the result */
  readonly title: string;
  /** Content of the message to be sent */
  readonly input_message_content: InputMessageContent;
  /** Optional. Inline keyboard attached to the message */
  readonly reply_markup?: InlineKeyboardMarkup;
  /** Optional. URL of the result */
  readonly url?: string;
  /** Optional. Short description of the result */
  readonly description?: string;
  /** Optional. Url of the thumbnail for the result */
  readonly thumbnail_url?: string;
  /** Optional. Thumbnail width */
  readonly thumbnail_width?: number;
  /** Optional. Thumbnail height */
  readonly thumbnail_height?: number;
  readonly [key: string]: unknown;
}
export const InlineQueryResultArticle: Schema.Codec<InlineQueryResultArticle> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    id: Schema.String,
    title: Schema.String,
    input_message_content: Schema.suspend((): Schema.Codec<InputMessageContent> => InputMessageContent),
    reply_markup: Schema.optionalKey(Schema.suspend((): Schema.Codec<InlineKeyboardMarkup> => InlineKeyboardMarkup)),
    url: Schema.optionalKey(Schema.String),
    description: Schema.optionalKey(Schema.String),
    thumbnail_url: Schema.optionalKey(Schema.String),
    thumbnail_width: Schema.optionalKey(Schema.Int),
    thumbnail_height: Schema.optionalKey(Schema.Int),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Represents a link to an MP3 audio file. By default, this audio file will be sent by the user. Alternatively, you can use input_message_content to send a message with the specified content instead of the audio. */
export interface InlineQueryResultAudio {
  /** Type of the result, must be audio */
  readonly type: string;
  /** Unique identifier for this result, 1-64 bytes */
  readonly id: string;
  /** A valid URL for the audio file */
  readonly audio_url: string;
  /** Title */
  readonly title: string;
  /** Optional. Caption, 0-1024 characters after entities parsing */
  readonly caption?: string;
  /** Optional. Mode for parsing entities in the audio caption. See formatting options for more details. */
  readonly parse_mode?: ParseMode;
  /** Optional. List of special entities that appear in the caption, which can be specified instead of parse_mode */
  readonly caption_entities?: ReadonlyArray<MessageEntity>;
  /** Optional. Performer */
  readonly performer?: string;
  /** Optional. Audio duration in seconds */
  readonly audio_duration?: number;
  /** Optional. Inline keyboard attached to the message */
  readonly reply_markup?: InlineKeyboardMarkup;
  /** Optional. Content of the message to be sent instead of the audio */
  readonly input_message_content?: InputMessageContent;
  readonly [key: string]: unknown;
}
export const InlineQueryResultAudio: Schema.Codec<InlineQueryResultAudio> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    id: Schema.String,
    audio_url: Schema.String,
    title: Schema.String,
    caption: Schema.optionalKey(Schema.String),
    parse_mode: Schema.optionalKey(Schema.suspend((): Schema.Codec<ParseMode> => ParseMode)),
    caption_entities: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<MessageEntity> => MessageEntity))),
    performer: Schema.optionalKey(Schema.String),
    audio_duration: Schema.optionalKey(Schema.Int),
    reply_markup: Schema.optionalKey(Schema.suspend((): Schema.Codec<InlineKeyboardMarkup> => InlineKeyboardMarkup)),
    input_message_content: Schema.optionalKey(Schema.suspend((): Schema.Codec<InputMessageContent> => InputMessageContent)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Represents a link to an MP3 audio file stored on the Telegram servers. By default, this audio file will be sent by the user. Alternatively, you can use input_message_content to send a message with the specified content instead of the audio. */
export interface InlineQueryResultCachedAudio {
  /** Type of the result, must be audio */
  readonly type: string;
  /** Unique identifier for this result, 1-64 bytes */
  readonly id: string;
  /** A valid file identifier for the audio file */
  readonly audio_file_id: string;
  /** Optional. Caption, 0-1024 characters after entities parsing */
  readonly caption?: string;
  /** Optional. Mode for parsing entities in the audio caption. See formatting options for more details. */
  readonly parse_mode?: ParseMode;
  /** Optional. List of special entities that appear in the caption, which can be specified instead of parse_mode */
  readonly caption_entities?: ReadonlyArray<MessageEntity>;
  /** Optional. Inline keyboard attached to the message */
  readonly reply_markup?: InlineKeyboardMarkup;
  /** Optional. Content of the message to be sent instead of the audio */
  readonly input_message_content?: InputMessageContent;
  readonly [key: string]: unknown;
}
export const InlineQueryResultCachedAudio: Schema.Codec<InlineQueryResultCachedAudio> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    id: Schema.String,
    audio_file_id: Schema.String,
    caption: Schema.optionalKey(Schema.String),
    parse_mode: Schema.optionalKey(Schema.suspend((): Schema.Codec<ParseMode> => ParseMode)),
    caption_entities: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<MessageEntity> => MessageEntity))),
    reply_markup: Schema.optionalKey(Schema.suspend((): Schema.Codec<InlineKeyboardMarkup> => InlineKeyboardMarkup)),
    input_message_content: Schema.optionalKey(Schema.suspend((): Schema.Codec<InputMessageContent> => InputMessageContent)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Represents a link to a file stored on the Telegram servers. By default, this file will be sent by the user with an optional caption. Alternatively, you can use input_message_content to send a message with the specified content instead of the file. */
export interface InlineQueryResultCachedDocument {
  /** Type of the result, must be document */
  readonly type: string;
  /** Unique identifier for this result, 1-64 bytes */
  readonly id: string;
  /** Title for the result */
  readonly title: string;
  /** A valid file identifier for the file */
  readonly document_file_id: string;
  /** Optional. Short description of the result */
  readonly description?: string;
  /** Optional. Caption of the document to be sent, 0-1024 characters after entities parsing */
  readonly caption?: string;
  /** Optional. Mode for parsing entities in the document caption. See formatting options for more details. */
  readonly parse_mode?: ParseMode;
  /** Optional. List of special entities that appear in the caption, which can be specified instead of parse_mode */
  readonly caption_entities?: ReadonlyArray<MessageEntity>;
  /** Optional. Inline keyboard attached to the message */
  readonly reply_markup?: InlineKeyboardMarkup;
  /** Optional. Content of the message to be sent instead of the file */
  readonly input_message_content?: InputMessageContent;
  readonly [key: string]: unknown;
}
export const InlineQueryResultCachedDocument: Schema.Codec<InlineQueryResultCachedDocument> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    id: Schema.String,
    title: Schema.String,
    document_file_id: Schema.String,
    description: Schema.optionalKey(Schema.String),
    caption: Schema.optionalKey(Schema.String),
    parse_mode: Schema.optionalKey(Schema.suspend((): Schema.Codec<ParseMode> => ParseMode)),
    caption_entities: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<MessageEntity> => MessageEntity))),
    reply_markup: Schema.optionalKey(Schema.suspend((): Schema.Codec<InlineKeyboardMarkup> => InlineKeyboardMarkup)),
    input_message_content: Schema.optionalKey(Schema.suspend((): Schema.Codec<InputMessageContent> => InputMessageContent)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Represents a link to an animated GIF file stored on the Telegram servers. By default, this animated GIF file will be sent by the user with an optional caption. Alternatively, you can use input_message_content to send a message with specified content instead of the animation. */
export interface InlineQueryResultCachedGif {
  /** Type of the result, must be gif */
  readonly type: string;
  /** Unique identifier for this result, 1-64 bytes */
  readonly id: string;
  /** A valid file identifier for the GIF file */
  readonly gif_file_id: string;
  /** Optional. Title for the result */
  readonly title?: string;
  /** Optional. Caption of the GIF file to be sent, 0-1024 characters after entities parsing */
  readonly caption?: string;
  /** Optional. Mode for parsing entities in the caption. See formatting options for more details. */
  readonly parse_mode?: ParseMode;
  /** Optional. List of special entities that appear in the caption, which can be specified instead of parse_mode */
  readonly caption_entities?: ReadonlyArray<MessageEntity>;
  /** Optional. Pass True if the caption must be shown above the message media */
  readonly show_caption_above_media?: boolean;
  /** Optional. Inline keyboard attached to the message */
  readonly reply_markup?: InlineKeyboardMarkup;
  /** Optional. Content of the message to be sent instead of the GIF animation */
  readonly input_message_content?: InputMessageContent;
  readonly [key: string]: unknown;
}
export const InlineQueryResultCachedGif: Schema.Codec<InlineQueryResultCachedGif> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    id: Schema.String,
    gif_file_id: Schema.String,
    title: Schema.optionalKey(Schema.String),
    caption: Schema.optionalKey(Schema.String),
    parse_mode: Schema.optionalKey(Schema.suspend((): Schema.Codec<ParseMode> => ParseMode)),
    caption_entities: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<MessageEntity> => MessageEntity))),
    show_caption_above_media: Schema.optionalKey(Schema.Boolean),
    reply_markup: Schema.optionalKey(Schema.suspend((): Schema.Codec<InlineKeyboardMarkup> => InlineKeyboardMarkup)),
    input_message_content: Schema.optionalKey(Schema.suspend((): Schema.Codec<InputMessageContent> => InputMessageContent)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Represents a link to a video animation (H.264/MPEG-4 AVC video without sound) stored on the Telegram servers. By default, this animated MPEG-4 file will be sent by the user with an optional caption. Alternatively, you can use input_message_content to send a message with the specified content instead of the animation. */
export interface InlineQueryResultCachedMpeg4Gif {
  /** Type of the result, must be mpeg4_gif */
  readonly type: string;
  /** Unique identifier for this result, 1-64 bytes */
  readonly id: string;
  /** A valid file identifier for the MPEG4 file */
  readonly mpeg4_file_id: string;
  /** Optional. Title for the result */
  readonly title?: string;
  /** Optional. Caption of the MPEG-4 file to be sent, 0-1024 characters after entities parsing */
  readonly caption?: string;
  /** Optional. Mode for parsing entities in the caption. See formatting options for more details. */
  readonly parse_mode?: ParseMode;
  /** Optional. List of special entities that appear in the caption, which can be specified instead of parse_mode */
  readonly caption_entities?: ReadonlyArray<MessageEntity>;
  /** Optional. Pass True if the caption must be shown above the message media */
  readonly show_caption_above_media?: boolean;
  /** Optional. Inline keyboard attached to the message */
  readonly reply_markup?: InlineKeyboardMarkup;
  /** Optional. Content of the message to be sent instead of the video animation */
  readonly input_message_content?: InputMessageContent;
  readonly [key: string]: unknown;
}
export const InlineQueryResultCachedMpeg4Gif: Schema.Codec<InlineQueryResultCachedMpeg4Gif> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    id: Schema.String,
    mpeg4_file_id: Schema.String,
    title: Schema.optionalKey(Schema.String),
    caption: Schema.optionalKey(Schema.String),
    parse_mode: Schema.optionalKey(Schema.suspend((): Schema.Codec<ParseMode> => ParseMode)),
    caption_entities: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<MessageEntity> => MessageEntity))),
    show_caption_above_media: Schema.optionalKey(Schema.Boolean),
    reply_markup: Schema.optionalKey(Schema.suspend((): Schema.Codec<InlineKeyboardMarkup> => InlineKeyboardMarkup)),
    input_message_content: Schema.optionalKey(Schema.suspend((): Schema.Codec<InputMessageContent> => InputMessageContent)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Represents a link to a photo stored on the Telegram servers. By default, this photo will be sent by the user with an optional caption. Alternatively, you can use input_message_content to send a message with the specified content instead of the photo. */
export interface InlineQueryResultCachedPhoto {
  /** Type of the result, must be photo */
  readonly type: string;
  /** Unique identifier for this result, 1-64 bytes */
  readonly id: string;
  /** A valid file identifier of the photo */
  readonly photo_file_id: string;
  /** Optional. Title for the result */
  readonly title?: string;
  /** Optional. Short description of the result */
  readonly description?: string;
  /** Optional. Caption of the photo to be sent, 0-1024 characters after entities parsing */
  readonly caption?: string;
  /** Optional. Mode for parsing entities in the photo caption. See formatting options for more details. */
  readonly parse_mode?: ParseMode;
  /** Optional. List of special entities that appear in the caption, which can be specified instead of parse_mode */
  readonly caption_entities?: ReadonlyArray<MessageEntity>;
  /** Optional. Pass True if the caption must be shown above the message media */
  readonly show_caption_above_media?: boolean;
  /** Optional. Inline keyboard attached to the message */
  readonly reply_markup?: InlineKeyboardMarkup;
  /** Optional. Content of the message to be sent instead of the photo */
  readonly input_message_content?: InputMessageContent;
  readonly [key: string]: unknown;
}
export const InlineQueryResultCachedPhoto: Schema.Codec<InlineQueryResultCachedPhoto> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    id: Schema.String,
    photo_file_id: Schema.String,
    title: Schema.optionalKey(Schema.String),
    description: Schema.optionalKey(Schema.String),
    caption: Schema.optionalKey(Schema.String),
    parse_mode: Schema.optionalKey(Schema.suspend((): Schema.Codec<ParseMode> => ParseMode)),
    caption_entities: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<MessageEntity> => MessageEntity))),
    show_caption_above_media: Schema.optionalKey(Schema.Boolean),
    reply_markup: Schema.optionalKey(Schema.suspend((): Schema.Codec<InlineKeyboardMarkup> => InlineKeyboardMarkup)),
    input_message_content: Schema.optionalKey(Schema.suspend((): Schema.Codec<InputMessageContent> => InputMessageContent)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Represents a link to a sticker stored on the Telegram servers. By default, this sticker will be sent by the user. Alternatively, you can use input_message_content to send a message with the specified content instead of the sticker. */
export interface InlineQueryResultCachedSticker {
  /** Type of the result, must be sticker */
  readonly type: string;
  /** Unique identifier for this result, 1-64 bytes */
  readonly id: string;
  /** A valid file identifier of the sticker */
  readonly sticker_file_id: string;
  /** Optional. Inline keyboard attached to the message */
  readonly reply_markup?: InlineKeyboardMarkup;
  /** Optional. Content of the message to be sent instead of the sticker */
  readonly input_message_content?: InputMessageContent;
  readonly [key: string]: unknown;
}
export const InlineQueryResultCachedSticker: Schema.Codec<InlineQueryResultCachedSticker> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    id: Schema.String,
    sticker_file_id: Schema.String,
    reply_markup: Schema.optionalKey(Schema.suspend((): Schema.Codec<InlineKeyboardMarkup> => InlineKeyboardMarkup)),
    input_message_content: Schema.optionalKey(Schema.suspend((): Schema.Codec<InputMessageContent> => InputMessageContent)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Represents a link to a video file stored on the Telegram servers. By default, this video file will be sent by the user with an optional caption. Alternatively, you can use input_message_content to send a message with the specified content instead of the video. */
export interface InlineQueryResultCachedVideo {
  /** Type of the result, must be video */
  readonly type: string;
  /** Unique identifier for this result, 1-64 bytes */
  readonly id: string;
  /** A valid file identifier for the video file */
  readonly video_file_id: string;
  /** Title for the result */
  readonly title: string;
  /** Optional. Short description of the result */
  readonly description?: string;
  /** Optional. Caption of the video to be sent, 0-1024 characters after entities parsing */
  readonly caption?: string;
  /** Optional. Mode for parsing entities in the video caption. See formatting options for more details. */
  readonly parse_mode?: ParseMode;
  /** Optional. List of special entities that appear in the caption, which can be specified instead of parse_mode */
  readonly caption_entities?: ReadonlyArray<MessageEntity>;
  /** Optional. Pass True if the caption must be shown above the message media */
  readonly show_caption_above_media?: boolean;
  /** Optional. Inline keyboard attached to the message */
  readonly reply_markup?: InlineKeyboardMarkup;
  /** Optional. Content of the message to be sent instead of the video */
  readonly input_message_content?: InputMessageContent;
  readonly [key: string]: unknown;
}
export const InlineQueryResultCachedVideo: Schema.Codec<InlineQueryResultCachedVideo> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    id: Schema.String,
    video_file_id: Schema.String,
    title: Schema.String,
    description: Schema.optionalKey(Schema.String),
    caption: Schema.optionalKey(Schema.String),
    parse_mode: Schema.optionalKey(Schema.suspend((): Schema.Codec<ParseMode> => ParseMode)),
    caption_entities: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<MessageEntity> => MessageEntity))),
    show_caption_above_media: Schema.optionalKey(Schema.Boolean),
    reply_markup: Schema.optionalKey(Schema.suspend((): Schema.Codec<InlineKeyboardMarkup> => InlineKeyboardMarkup)),
    input_message_content: Schema.optionalKey(Schema.suspend((): Schema.Codec<InputMessageContent> => InputMessageContent)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Represents a link to a voice message stored on the Telegram servers. By default, this voice message will be sent by the user. Alternatively, you can use input_message_content to send a message with the specified content instead of the voice message. */
export interface InlineQueryResultCachedVoice {
  /** Type of the result, must be voice */
  readonly type: string;
  /** Unique identifier for this result, 1-64 bytes */
  readonly id: string;
  /** A valid file identifier for the voice message */
  readonly voice_file_id: string;
  /** Voice message title */
  readonly title: string;
  /** Optional. Caption, 0-1024 characters after entities parsing */
  readonly caption?: string;
  /** Optional. Mode for parsing entities in the voice message caption. See formatting options for more details. */
  readonly parse_mode?: ParseMode;
  /** Optional. List of special entities that appear in the caption, which can be specified instead of parse_mode */
  readonly caption_entities?: ReadonlyArray<MessageEntity>;
  /** Optional. Inline keyboard attached to the message */
  readonly reply_markup?: InlineKeyboardMarkup;
  /** Optional. Content of the message to be sent instead of the voice message */
  readonly input_message_content?: InputMessageContent;
  readonly [key: string]: unknown;
}
export const InlineQueryResultCachedVoice: Schema.Codec<InlineQueryResultCachedVoice> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    id: Schema.String,
    voice_file_id: Schema.String,
    title: Schema.String,
    caption: Schema.optionalKey(Schema.String),
    parse_mode: Schema.optionalKey(Schema.suspend((): Schema.Codec<ParseMode> => ParseMode)),
    caption_entities: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<MessageEntity> => MessageEntity))),
    reply_markup: Schema.optionalKey(Schema.suspend((): Schema.Codec<InlineKeyboardMarkup> => InlineKeyboardMarkup)),
    input_message_content: Schema.optionalKey(Schema.suspend((): Schema.Codec<InputMessageContent> => InputMessageContent)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Represents a contact with a phone number. By default, this contact will be sent by the user. Alternatively, you can use input_message_content to send a message with the specified content instead of the contact. */
export interface InlineQueryResultContact {
  /** Type of the result, must be contact */
  readonly type: string;
  /** Unique identifier for this result, 1-64 Bytes */
  readonly id: string;
  /** Contact's phone number */
  readonly phone_number: string;
  /** Contact's first name */
  readonly first_name: string;
  /** Optional. Contact's last name */
  readonly last_name?: string;
  /** Optional. Additional data about the contact in the form of a vCard, 0-2048 bytes */
  readonly vcard?: string;
  /** Optional. Inline keyboard attached to the message */
  readonly reply_markup?: InlineKeyboardMarkup;
  /** Optional. Content of the message to be sent instead of the contact */
  readonly input_message_content?: InputMessageContent;
  /** Optional. Url of the thumbnail for the result */
  readonly thumbnail_url?: string;
  /** Optional. Thumbnail width */
  readonly thumbnail_width?: number;
  /** Optional. Thumbnail height */
  readonly thumbnail_height?: number;
  readonly [key: string]: unknown;
}
export const InlineQueryResultContact: Schema.Codec<InlineQueryResultContact> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    id: Schema.String,
    phone_number: Schema.String,
    first_name: Schema.String,
    last_name: Schema.optionalKey(Schema.String),
    vcard: Schema.optionalKey(Schema.String),
    reply_markup: Schema.optionalKey(Schema.suspend((): Schema.Codec<InlineKeyboardMarkup> => InlineKeyboardMarkup)),
    input_message_content: Schema.optionalKey(Schema.suspend((): Schema.Codec<InputMessageContent> => InputMessageContent)),
    thumbnail_url: Schema.optionalKey(Schema.String),
    thumbnail_width: Schema.optionalKey(Schema.Int),
    thumbnail_height: Schema.optionalKey(Schema.Int),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Represents a link to a file. By default, this file will be sent by the user with an optional caption. Alternatively, you can use input_message_content to send a message with the specified content instead of the file. Currently, only .PDF and .ZIP files can be sent using this method. */
export interface InlineQueryResultDocument {
  /** Type of the result, must be document */
  readonly type: string;
  /** Unique identifier for this result, 1-64 bytes */
  readonly id: string;
  /** Title for the result */
  readonly title: string;
  /** Optional. Caption of the document to be sent, 0-1024 characters after entities parsing */
  readonly caption?: string;
  /** Optional. Mode for parsing entities in the document caption. See formatting options for more details. */
  readonly parse_mode?: ParseMode;
  /** Optional. List of special entities that appear in the caption, which can be specified instead of parse_mode */
  readonly caption_entities?: ReadonlyArray<MessageEntity>;
  /** A valid URL for the file */
  readonly document_url: string;
  /** MIME type of the content of the file, either “application/pdf” or “application/zip” */
  readonly mime_type: string;
  /** Optional. Short description of the result */
  readonly description?: string;
  /** Optional. Inline keyboard attached to the message */
  readonly reply_markup?: InlineKeyboardMarkup;
  /** Optional. Content of the message to be sent instead of the file */
  readonly input_message_content?: InputMessageContent;
  /** Optional. URL of the thumbnail (JPEG only) for the file */
  readonly thumbnail_url?: string;
  /** Optional. Thumbnail width */
  readonly thumbnail_width?: number;
  /** Optional. Thumbnail height */
  readonly thumbnail_height?: number;
  readonly [key: string]: unknown;
}
export const InlineQueryResultDocument: Schema.Codec<InlineQueryResultDocument> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    id: Schema.String,
    title: Schema.String,
    caption: Schema.optionalKey(Schema.String),
    parse_mode: Schema.optionalKey(Schema.suspend((): Schema.Codec<ParseMode> => ParseMode)),
    caption_entities: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<MessageEntity> => MessageEntity))),
    document_url: Schema.String,
    mime_type: Schema.String,
    description: Schema.optionalKey(Schema.String),
    reply_markup: Schema.optionalKey(Schema.suspend((): Schema.Codec<InlineKeyboardMarkup> => InlineKeyboardMarkup)),
    input_message_content: Schema.optionalKey(Schema.suspend((): Schema.Codec<InputMessageContent> => InputMessageContent)),
    thumbnail_url: Schema.optionalKey(Schema.String),
    thumbnail_width: Schema.optionalKey(Schema.Int),
    thumbnail_height: Schema.optionalKey(Schema.Int),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Represents a Game. */
export interface InlineQueryResultGame {
  /** Type of the result, must be game */
  readonly type: string;
  /** Unique identifier for this result, 1-64 bytes */
  readonly id: string;
  /** Short name of the game */
  readonly game_short_name: string;
  /** Optional. Inline keyboard attached to the message */
  readonly reply_markup?: InlineKeyboardMarkup;
  readonly [key: string]: unknown;
}
export const InlineQueryResultGame: Schema.Codec<InlineQueryResultGame> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    id: Schema.String,
    game_short_name: Schema.String,
    reply_markup: Schema.optionalKey(Schema.suspend((): Schema.Codec<InlineKeyboardMarkup> => InlineKeyboardMarkup)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Represents a link to an animated GIF file. By default, this animated GIF file will be sent by the user with optional caption. Alternatively, you can use input_message_content to send a message with the specified content instead of the animation. */
export interface InlineQueryResultGif {
  /** Type of the result, must be gif */
  readonly type: string;
  /** Unique identifier for this result, 1-64 bytes */
  readonly id: string;
  /** A valid URL for the GIF file */
  readonly gif_url: string;
  /** Optional. Width of the GIF */
  readonly gif_width?: number;
  /** Optional. Height of the GIF */
  readonly gif_height?: number;
  /** Optional. Duration of the GIF in seconds */
  readonly gif_duration?: number;
  /** URL of the static (JPEG or GIF) or animated (MPEG4) thumbnail for the result */
  readonly thumbnail_url: string;
  /** Optional. MIME type of the thumbnail, must be one of “image/jpeg”, “image/gif”, or “video/mp4”. Defaults to “image/jpeg”. */
  readonly thumbnail_mime_type?: string;
  /** Optional. Title for the result */
  readonly title?: string;
  /** Optional. Caption of the GIF file to be sent, 0-1024 characters after entities parsing */
  readonly caption?: string;
  /** Optional. Mode for parsing entities in the caption. See formatting options for more details. */
  readonly parse_mode?: ParseMode;
  /** Optional. List of special entities that appear in the caption, which can be specified instead of parse_mode */
  readonly caption_entities?: ReadonlyArray<MessageEntity>;
  /** Optional. Pass True if the caption must be shown above the message media */
  readonly show_caption_above_media?: boolean;
  /** Optional. Inline keyboard attached to the message */
  readonly reply_markup?: InlineKeyboardMarkup;
  /** Optional. Content of the message to be sent instead of the GIF animation */
  readonly input_message_content?: InputMessageContent;
  readonly [key: string]: unknown;
}
export const InlineQueryResultGif: Schema.Codec<InlineQueryResultGif> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    id: Schema.String,
    gif_url: Schema.String,
    gif_width: Schema.optionalKey(Schema.Int),
    gif_height: Schema.optionalKey(Schema.Int),
    gif_duration: Schema.optionalKey(Schema.Int),
    thumbnail_url: Schema.String,
    thumbnail_mime_type: Schema.optionalKey(Schema.String),
    title: Schema.optionalKey(Schema.String),
    caption: Schema.optionalKey(Schema.String),
    parse_mode: Schema.optionalKey(Schema.suspend((): Schema.Codec<ParseMode> => ParseMode)),
    caption_entities: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<MessageEntity> => MessageEntity))),
    show_caption_above_media: Schema.optionalKey(Schema.Boolean),
    reply_markup: Schema.optionalKey(Schema.suspend((): Schema.Codec<InlineKeyboardMarkup> => InlineKeyboardMarkup)),
    input_message_content: Schema.optionalKey(Schema.suspend((): Schema.Codec<InputMessageContent> => InputMessageContent)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Represents a location on a map. By default, the location will be sent by the user. Alternatively, you can use input_message_content to send a message with the specified content instead of the location. */
export interface InlineQueryResultLocation {
  /** Type of the result, must be location */
  readonly type: string;
  /** Unique identifier for this result, 1-64 Bytes */
  readonly id: string;
  /** Location latitude in degrees */
  readonly latitude: number;
  /** Location longitude in degrees */
  readonly longitude: number;
  /** Location title */
  readonly title: string;
  /** Optional. The radius of uncertainty for the location, measured in meters; 0-1500 */
  readonly horizontal_accuracy?: number;
  /** Optional. Period in seconds during which the location can be updated, must be between 60 and 86400, or 0x7FFFFFFF for live locations that can be edited indefinitely */
  readonly live_period?: number;
  /** Optional. For live locations, a direction in which the user is moving, in degrees. Must be between 1 and 360 if specified. */
  readonly heading?: number;
  /** Optional. For live locations, a maximum distance for proximity alerts about approaching another chat member, in meters. Must be between 1 and 100000 if specified. */
  readonly proximity_alert_radius?: number;
  /** Optional. Inline keyboard attached to the message */
  readonly reply_markup?: InlineKeyboardMarkup;
  /** Optional. Content of the message to be sent instead of the location */
  readonly input_message_content?: InputMessageContent;
  /** Optional. Url of the thumbnail for the result */
  readonly thumbnail_url?: string;
  /** Optional. Thumbnail width */
  readonly thumbnail_width?: number;
  /** Optional. Thumbnail height */
  readonly thumbnail_height?: number;
  readonly [key: string]: unknown;
}
export const InlineQueryResultLocation: Schema.Codec<InlineQueryResultLocation> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    id: Schema.String,
    latitude: Schema.Number,
    longitude: Schema.Number,
    title: Schema.String,
    horizontal_accuracy: Schema.optionalKey(Schema.Number),
    live_period: Schema.optionalKey(Schema.Int),
    heading: Schema.optionalKey(Schema.Int),
    proximity_alert_radius: Schema.optionalKey(Schema.Int),
    reply_markup: Schema.optionalKey(Schema.suspend((): Schema.Codec<InlineKeyboardMarkup> => InlineKeyboardMarkup)),
    input_message_content: Schema.optionalKey(Schema.suspend((): Schema.Codec<InputMessageContent> => InputMessageContent)),
    thumbnail_url: Schema.optionalKey(Schema.String),
    thumbnail_width: Schema.optionalKey(Schema.Int),
    thumbnail_height: Schema.optionalKey(Schema.Int),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Represents a link to a video animation (H.264/MPEG-4 AVC video without sound). By default, this animated MPEG-4 file will be sent by the user with optional caption. Alternatively, you can use input_message_content to send a message with the specified content instead of the animation. */
export interface InlineQueryResultMpeg4Gif {
  /** Type of the result, must be mpeg4_gif */
  readonly type: string;
  /** Unique identifier for this result, 1-64 bytes */
  readonly id: string;
  /** A valid URL for the MPEG4 file */
  readonly mpeg4_url: string;
  /** Optional. Video width */
  readonly mpeg4_width?: number;
  /** Optional. Video height */
  readonly mpeg4_height?: number;
  /** Optional. Video duration in seconds */
  readonly mpeg4_duration?: number;
  /** URL of the static (JPEG or GIF) or animated (MPEG4) thumbnail for the result */
  readonly thumbnail_url: string;
  /** Optional. MIME type of the thumbnail, must be one of “image/jpeg”, “image/gif”, or “video/mp4”. Defaults to “image/jpeg”. */
  readonly thumbnail_mime_type?: string;
  /** Optional. Title for the result */
  readonly title?: string;
  /** Optional. Caption of the MPEG-4 file to be sent, 0-1024 characters after entities parsing */
  readonly caption?: string;
  /** Optional. Mode for parsing entities in the caption. See formatting options for more details. */
  readonly parse_mode?: ParseMode;
  /** Optional. List of special entities that appear in the caption, which can be specified instead of parse_mode */
  readonly caption_entities?: ReadonlyArray<MessageEntity>;
  /** Optional. Pass True if the caption must be shown above the message media */
  readonly show_caption_above_media?: boolean;
  /** Optional. Inline keyboard attached to the message */
  readonly reply_markup?: InlineKeyboardMarkup;
  /** Optional. Content of the message to be sent instead of the video animation */
  readonly input_message_content?: InputMessageContent;
  readonly [key: string]: unknown;
}
export const InlineQueryResultMpeg4Gif: Schema.Codec<InlineQueryResultMpeg4Gif> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    id: Schema.String,
    mpeg4_url: Schema.String,
    mpeg4_width: Schema.optionalKey(Schema.Int),
    mpeg4_height: Schema.optionalKey(Schema.Int),
    mpeg4_duration: Schema.optionalKey(Schema.Int),
    thumbnail_url: Schema.String,
    thumbnail_mime_type: Schema.optionalKey(Schema.String),
    title: Schema.optionalKey(Schema.String),
    caption: Schema.optionalKey(Schema.String),
    parse_mode: Schema.optionalKey(Schema.suspend((): Schema.Codec<ParseMode> => ParseMode)),
    caption_entities: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<MessageEntity> => MessageEntity))),
    show_caption_above_media: Schema.optionalKey(Schema.Boolean),
    reply_markup: Schema.optionalKey(Schema.suspend((): Schema.Codec<InlineKeyboardMarkup> => InlineKeyboardMarkup)),
    input_message_content: Schema.optionalKey(Schema.suspend((): Schema.Codec<InputMessageContent> => InputMessageContent)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Represents a link to a photo. By default, this photo will be sent by the user with optional caption. Alternatively, you can use input_message_content to send a message with the specified content instead of the photo. */
export interface InlineQueryResultPhoto {
  /** Type of the result, must be photo */
  readonly type: string;
  /** Unique identifier for this result, 1-64 bytes */
  readonly id: string;
  /** A valid URL of the photo. Photo must be in JPEG format. Photo size must not exceed 5MB. */
  readonly photo_url: string;
  /** URL of the thumbnail for the photo */
  readonly thumbnail_url: string;
  /** Optional. Width of the photo */
  readonly photo_width?: number;
  /** Optional. Height of the photo */
  readonly photo_height?: number;
  /** Optional. Title for the result */
  readonly title?: string;
  /** Optional. Short description of the result */
  readonly description?: string;
  /** Optional. Caption of the photo to be sent, 0-1024 characters after entities parsing */
  readonly caption?: string;
  /** Optional. Mode for parsing entities in the photo caption. See formatting options for more details. */
  readonly parse_mode?: ParseMode;
  /** Optional. List of special entities that appear in the caption, which can be specified instead of parse_mode */
  readonly caption_entities?: ReadonlyArray<MessageEntity>;
  /** Optional. Pass True if the caption must be shown above the message media */
  readonly show_caption_above_media?: boolean;
  /** Optional. Inline keyboard attached to the message */
  readonly reply_markup?: InlineKeyboardMarkup;
  /** Optional. Content of the message to be sent instead of the photo */
  readonly input_message_content?: InputMessageContent;
  readonly [key: string]: unknown;
}
export const InlineQueryResultPhoto: Schema.Codec<InlineQueryResultPhoto> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    id: Schema.String,
    photo_url: Schema.String,
    thumbnail_url: Schema.String,
    photo_width: Schema.optionalKey(Schema.Int),
    photo_height: Schema.optionalKey(Schema.Int),
    title: Schema.optionalKey(Schema.String),
    description: Schema.optionalKey(Schema.String),
    caption: Schema.optionalKey(Schema.String),
    parse_mode: Schema.optionalKey(Schema.suspend((): Schema.Codec<ParseMode> => ParseMode)),
    caption_entities: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<MessageEntity> => MessageEntity))),
    show_caption_above_media: Schema.optionalKey(Schema.Boolean),
    reply_markup: Schema.optionalKey(Schema.suspend((): Schema.Codec<InlineKeyboardMarkup> => InlineKeyboardMarkup)),
    input_message_content: Schema.optionalKey(Schema.suspend((): Schema.Codec<InputMessageContent> => InputMessageContent)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object represents a button to be shown above inline query results. You must use exactly one of the optional fields. */
export interface InlineQueryResultsButton {
  /** Label text on the button */
  readonly text: string;
  /** Optional. Description of the Web App that will be launched when the user presses the button. The Web App will be able to switch back to the inline mode using the method switchInlineQuery inside the Web App. */
  readonly web_app?: WebAppInfo;
  /** Optional. Deep-linking parameter for the /start message sent to the bot when a user presses the button. 1-64 characters, only A-Z, a-z, 0-9, _ and - are allowed.

Example: An inline bot that sends YouTube videos can ask the user to connect the bot to their YouTube account to adapt search results accordingly. To do this, it displays a 'Connect your YouTube account' button above the results, or even before showing any. The user presses the button, switches to a private chat with the bot and, in doing so, passes a start parameter that instructs the bot to return an OAuth link. Once done, the bot can offer a switch_inline button so that the user can easily return to the chat where they wanted to use the bot's inline capabilities. */
  readonly start_parameter?: string;
  readonly [key: string]: unknown;
}
export const InlineQueryResultsButton: Schema.Codec<InlineQueryResultsButton> = Schema.StructWithRest(
  Schema.Struct({
    text: Schema.String,
    web_app: Schema.optionalKey(Schema.suspend((): Schema.Codec<WebAppInfo> => WebAppInfo)),
    start_parameter: Schema.optionalKey(Schema.String),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Represents a venue. By default, the venue will be sent by the user. Alternatively, you can use input_message_content to send a message with the specified content instead of the venue. */
export interface InlineQueryResultVenue {
  /** Type of the result, must be venue */
  readonly type: string;
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
  readonly foursquare_id?: string;
  /** Optional. Foursquare type of the venue, if known. (For example, “arts_entertainment/default”, “arts_entertainment/aquarium” or “food/icecream”.) */
  readonly foursquare_type?: string;
  /** Optional. Google Places identifier of the venue */
  readonly google_place_id?: string;
  /** Optional. Google Places type of the venue. (See supported types.) */
  readonly google_place_type?: string;
  /** Optional. Inline keyboard attached to the message */
  readonly reply_markup?: InlineKeyboardMarkup;
  /** Optional. Content of the message to be sent instead of the venue */
  readonly input_message_content?: InputMessageContent;
  /** Optional. Url of the thumbnail for the result */
  readonly thumbnail_url?: string;
  /** Optional. Thumbnail width */
  readonly thumbnail_width?: number;
  /** Optional. Thumbnail height */
  readonly thumbnail_height?: number;
  readonly [key: string]: unknown;
}
export const InlineQueryResultVenue: Schema.Codec<InlineQueryResultVenue> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    id: Schema.String,
    latitude: Schema.Number,
    longitude: Schema.Number,
    title: Schema.String,
    address: Schema.String,
    foursquare_id: Schema.optionalKey(Schema.String),
    foursquare_type: Schema.optionalKey(Schema.String),
    google_place_id: Schema.optionalKey(Schema.String),
    google_place_type: Schema.optionalKey(Schema.String),
    reply_markup: Schema.optionalKey(Schema.suspend((): Schema.Codec<InlineKeyboardMarkup> => InlineKeyboardMarkup)),
    input_message_content: Schema.optionalKey(Schema.suspend((): Schema.Codec<InputMessageContent> => InputMessageContent)),
    thumbnail_url: Schema.optionalKey(Schema.String),
    thumbnail_width: Schema.optionalKey(Schema.Int),
    thumbnail_height: Schema.optionalKey(Schema.Int),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Represents a link to a page containing an embedded video player or a video file. By default, this video file will be sent by the user with an optional caption. Alternatively, you can use input_message_content to send a message with the specified content instead of the video. */
export interface InlineQueryResultVideo {
  /** Type of the result, must be video */
  readonly type: string;
  /** Unique identifier for this result, 1-64 bytes */
  readonly id: string;
  /** A valid URL for the embedded video player or video file */
  readonly video_url: string;
  /** MIME type of the content of the video URL, “text/html” or “video/mp4” */
  readonly mime_type: string;
  /** URL of the thumbnail (JPEG only) for the video */
  readonly thumbnail_url: string;
  /** Title for the result */
  readonly title: string;
  /** Optional. Caption of the video to be sent, 0-1024 characters after entities parsing */
  readonly caption?: string;
  /** Optional. Mode for parsing entities in the video caption. See formatting options for more details. */
  readonly parse_mode?: ParseMode;
  /** Optional. List of special entities that appear in the caption, which can be specified instead of parse_mode */
  readonly caption_entities?: ReadonlyArray<MessageEntity>;
  /** Optional. Pass True if the caption must be shown above the message media */
  readonly show_caption_above_media?: boolean;
  /** Optional. Video width */
  readonly video_width?: number;
  /** Optional. Video height */
  readonly video_height?: number;
  /** Optional. Video duration in seconds */
  readonly video_duration?: number;
  /** Optional. Short description of the result */
  readonly description?: string;
  /** Optional. Inline keyboard attached to the message */
  readonly reply_markup?: InlineKeyboardMarkup;
  /** Optional. Content of the message to be sent instead of the video. This field is required if InlineQueryResultVideo is used to send an HTML-page as a result (e.g., a YouTube video). */
  readonly input_message_content?: InputMessageContent;
  readonly [key: string]: unknown;
}
export const InlineQueryResultVideo: Schema.Codec<InlineQueryResultVideo> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    id: Schema.String,
    video_url: Schema.String,
    mime_type: Schema.String,
    thumbnail_url: Schema.String,
    title: Schema.String,
    caption: Schema.optionalKey(Schema.String),
    parse_mode: Schema.optionalKey(Schema.suspend((): Schema.Codec<ParseMode> => ParseMode)),
    caption_entities: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<MessageEntity> => MessageEntity))),
    show_caption_above_media: Schema.optionalKey(Schema.Boolean),
    video_width: Schema.optionalKey(Schema.Int),
    video_height: Schema.optionalKey(Schema.Int),
    video_duration: Schema.optionalKey(Schema.Int),
    description: Schema.optionalKey(Schema.String),
    reply_markup: Schema.optionalKey(Schema.suspend((): Schema.Codec<InlineKeyboardMarkup> => InlineKeyboardMarkup)),
    input_message_content: Schema.optionalKey(Schema.suspend((): Schema.Codec<InputMessageContent> => InputMessageContent)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Represents a link to a voice recording in an .OGG container encoded with OPUS. By default, this voice recording will be sent by the user. Alternatively, you can use input_message_content to send a message with the specified content instead of the the voice message. */
export interface InlineQueryResultVoice {
  /** Type of the result, must be voice */
  readonly type: string;
  /** Unique identifier for this result, 1-64 bytes */
  readonly id: string;
  /** A valid URL for the voice recording */
  readonly voice_url: string;
  /** Recording title */
  readonly title: string;
  /** Optional. Caption, 0-1024 characters after entities parsing */
  readonly caption?: string;
  /** Optional. Mode for parsing entities in the voice message caption. See formatting options for more details. */
  readonly parse_mode?: ParseMode;
  /** Optional. List of special entities that appear in the caption, which can be specified instead of parse_mode */
  readonly caption_entities?: ReadonlyArray<MessageEntity>;
  /** Optional. Recording duration in seconds */
  readonly voice_duration?: number;
  /** Optional. Inline keyboard attached to the message */
  readonly reply_markup?: InlineKeyboardMarkup;
  /** Optional. Content of the message to be sent instead of the voice recording */
  readonly input_message_content?: InputMessageContent;
  readonly [key: string]: unknown;
}
export const InlineQueryResultVoice: Schema.Codec<InlineQueryResultVoice> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    id: Schema.String,
    voice_url: Schema.String,
    title: Schema.String,
    caption: Schema.optionalKey(Schema.String),
    parse_mode: Schema.optionalKey(Schema.suspend((): Schema.Codec<ParseMode> => ParseMode)),
    caption_entities: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<MessageEntity> => MessageEntity))),
    voice_duration: Schema.optionalKey(Schema.Int),
    reply_markup: Schema.optionalKey(Schema.suspend((): Schema.Codec<InlineKeyboardMarkup> => InlineKeyboardMarkup)),
    input_message_content: Schema.optionalKey(Schema.suspend((): Schema.Codec<InputMessageContent> => InputMessageContent)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Describes a checklist to create. */
export interface InputChecklist {
  /** Title of the checklist; 1-255 characters after entities parsing */
  readonly title: string;
  /** Optional. Mode for parsing entities in the title. See formatting options for more details. */
  readonly parse_mode?: ParseMode;
  /** Optional. List of special entities that appear in the title, which can be specified instead of parse_mode. Currently, only bold, italic, underline, strikethrough, spoiler, custom_emoji, and date_time entities are allowed. */
  readonly title_entities?: ReadonlyArray<MessageEntity>;
  /** List of 1-30 tasks in the checklist */
  readonly tasks: ReadonlyArray<InputChecklistTask>;
  /** Optional. Pass True if other users can add tasks to the checklist */
  readonly others_can_add_tasks?: boolean;
  /** Optional. Pass True if other users can mark tasks as done or not done in the checklist */
  readonly others_can_mark_tasks_as_done?: boolean;
  readonly [key: string]: unknown;
}
export const InputChecklist: Schema.Codec<InputChecklist> = Schema.StructWithRest(
  Schema.Struct({
    title: Schema.String,
    parse_mode: Schema.optionalKey(Schema.suspend((): Schema.Codec<ParseMode> => ParseMode)),
    title_entities: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<MessageEntity> => MessageEntity))),
    tasks: Schema.Array(Schema.suspend((): Schema.Codec<InputChecklistTask> => InputChecklistTask)),
    others_can_add_tasks: Schema.optionalKey(Schema.Boolean),
    others_can_mark_tasks_as_done: Schema.optionalKey(Schema.Boolean),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Describes a task to add to a checklist. */
export interface InputChecklistTask {
  /** Unique identifier of the task; must be positive and unique among all task identifiers currently present in the checklist */
  readonly id: number;
  /** Text of the task; 1-100 characters after entities parsing */
  readonly text: string;
  /** Optional. Mode for parsing entities in the text. See formatting options for more details. */
  readonly parse_mode?: ParseMode;
  /** Optional. List of special entities that appear in the text, which can be specified instead of parse_mode. Currently, only bold, italic, underline, strikethrough, spoiler, custom_emoji, and date_time entities are allowed. */
  readonly text_entities?: ReadonlyArray<MessageEntity>;
  readonly [key: string]: unknown;
}
export const InputChecklistTask: Schema.Codec<InputChecklistTask> = Schema.StructWithRest(
  Schema.Struct({
    id: Schema.Int,
    text: Schema.String,
    parse_mode: Schema.optionalKey(Schema.suspend((): Schema.Codec<ParseMode> => ParseMode)),
    text_entities: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<MessageEntity> => MessageEntity))),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Represents the content of a contact message to be sent as the result of an inline query. */
export interface InputContactMessageContent {
  /** Contact's phone number */
  readonly phone_number: string;
  /** Contact's first name */
  readonly first_name: string;
  /** Optional. Contact's last name */
  readonly last_name?: string;
  /** Optional. Additional data about the contact in the form of a vCard, 0-2048 bytes */
  readonly vcard?: string;
  readonly [key: string]: unknown;
}
export const InputContactMessageContent: Schema.Codec<InputContactMessageContent> = Schema.StructWithRest(
  Schema.Struct({
    phone_number: Schema.String,
    first_name: Schema.String,
    last_name: Schema.optionalKey(Schema.String),
    vcard: Schema.optionalKey(Schema.String),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object represents the contents of a file to be uploaded. Must be posted using multipart/form-data in the usual way that files are uploaded via the browser. */
export interface InputFile {
  readonly [key: string]: unknown;
}
export const InputFile: Schema.Codec<InputFile> = Schema.StructWithRest(
  Schema.Struct({}),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Represents the content of an invoice message to be sent as the result of an inline query. */
export interface InputInvoiceMessageContent {
  /** Product name, 1-32 characters */
  readonly title: string;
  /** Product description, 1-255 characters */
  readonly description: string;
  /** Bot-defined invoice payload, 1-128 bytes. This will not be displayed to the user, use it for your internal processes. */
  readonly payload: string;
  /** Optional. Payment provider token, obtained via @BotFather. Pass an empty string for payments in Telegram Stars. */
  readonly provider_token?: string;
  /** Three-letter ISO 4217 currency code, see more on currencies. Pass “XTR” for payments in Telegram Stars. */
  readonly currency: string;
  /** Price breakdown, a JSON-serialized list of components (e.g. product price, tax, discount, delivery cost, delivery tax, bonus, etc.). Must contain exactly one item for payments in Telegram Stars. */
  readonly prices: ReadonlyArray<LabeledPrice>;
  /** Optional. The maximum accepted amount for tips in the smallest units of the currency (integer, not float/double). For example, for a maximum tip of US$ 1.45 pass max_tip_amount = 145. See the exp parameter in currencies.json, it shows the number of digits past the decimal point for each currency (2 for the majority of currencies). Defaults to 0. Not supported for payments in Telegram Stars. */
  readonly max_tip_amount?: number;
  /** Optional. A JSON-serialized Array of suggested amounts of tip in the smallest units of the currency (integer, not float/double). At most 4 suggested tip amounts can be specified. The suggested tip amounts must be positive, passed in a strictly increased order and must not exceed max_tip_amount. */
  readonly suggested_tip_amounts?: ReadonlyArray<number>;
  /** Optional. A JSON-serialized object for data about the invoice, which will be shared with the payment provider. A detailed description of the required fields should be provided by the payment provider. */
  readonly provider_data?: string;
  /** Optional. URL of the product photo for the invoice. Can be a photo of the goods or a marketing image for a service. */
  readonly photo_url?: string;
  /** Optional. Photo size in bytes */
  readonly photo_size?: number;
  /** Optional. Photo width */
  readonly photo_width?: number;
  /** Optional. Photo height */
  readonly photo_height?: number;
  /** Optional. Pass True if you require the user's full name to complete the order. Ignored for payments in Telegram Stars. */
  readonly need_name?: boolean;
  /** Optional. Pass True if you require the user's phone number to complete the order. Ignored for payments in Telegram Stars. */
  readonly need_phone_number?: boolean;
  /** Optional. Pass True if you require the user's email address to complete the order. Ignored for payments in Telegram Stars. */
  readonly need_email?: boolean;
  /** Optional. Pass True if you require the user's shipping address to complete the order. Ignored for payments in Telegram Stars. */
  readonly need_shipping_address?: boolean;
  /** Optional. Pass True if the user's phone number should be sent to the provider. Ignored for payments in Telegram Stars. */
  readonly send_phone_number_to_provider?: boolean;
  /** Optional. Pass True if the user's email address should be sent to the provider. Ignored for payments in Telegram Stars. */
  readonly send_email_to_provider?: boolean;
  /** Optional. Pass True if the final price depends on the shipping method. Ignored for payments in Telegram Stars. */
  readonly is_flexible?: boolean;
  readonly [key: string]: unknown;
}
export const InputInvoiceMessageContent: Schema.Codec<InputInvoiceMessageContent> = Schema.StructWithRest(
  Schema.Struct({
    title: Schema.String,
    description: Schema.String,
    payload: Schema.String,
    provider_token: Schema.optionalKey(Schema.String),
    currency: Schema.String,
    prices: Schema.Array(Schema.suspend((): Schema.Codec<LabeledPrice> => LabeledPrice)),
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

/** Represents the content of a location message to be sent as the result of an inline query. */
export interface InputLocationMessageContent {
  /** Latitude of the location in degrees */
  readonly latitude: number;
  /** Longitude of the location in degrees */
  readonly longitude: number;
  /** Optional. The radius of uncertainty for the location, measured in meters; 0-1500 */
  readonly horizontal_accuracy?: number;
  /** Optional. Period in seconds during which the location can be updated, must be between 60 and 86400, or 0x7FFFFFFF for live locations that can be edited indefinitely */
  readonly live_period?: number;
  /** Optional. For live locations, a direction in which the user is moving, in degrees. Must be between 1 and 360 if specified. */
  readonly heading?: number;
  /** Optional. For live locations, a maximum distance for proximity alerts about approaching another chat member, in meters. Must be between 1 and 100000 if specified. */
  readonly proximity_alert_radius?: number;
  readonly [key: string]: unknown;
}
export const InputLocationMessageContent: Schema.Codec<InputLocationMessageContent> = Schema.StructWithRest(
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

/** This object represents the content of a media message to be sent. It should be one of */
export type InputMedia = InputMediaAnimation | InputMediaAudio | InputMediaDocument | InputMediaLivePhoto | InputMediaPhoto | InputMediaVideo;
export const InputMedia: Schema.Codec<InputMedia> = Schema.Union([Schema.suspend((): Schema.Codec<InputMediaAnimation> => InputMediaAnimation), Schema.suspend((): Schema.Codec<InputMediaAudio> => InputMediaAudio), Schema.suspend((): Schema.Codec<InputMediaDocument> => InputMediaDocument), Schema.suspend((): Schema.Codec<InputMediaLivePhoto> => InputMediaLivePhoto), Schema.suspend((): Schema.Codec<InputMediaPhoto> => InputMediaPhoto), Schema.suspend((): Schema.Codec<InputMediaVideo> => InputMediaVideo)]);

/** Represents an animation file (GIF or H.264/MPEG-4 AVC video without sound) to be sent. */
export interface InputMediaAnimation {
  /** Type of the media, must be animation */
  readonly type: string;
  /** File to send. Pass a file_id to send a file that exists on the Telegram servers (recommended), pass an HTTP URL for Telegram to get a file from the Internet, or pass “attach://<file_attach_name>” to upload a new one using multipart/form-data under <file_attach_name> name. More information on Sending Files » */
  readonly media: string;
  /** Optional. Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails can't be reused and can be only uploaded as a new file, so you can pass “attach://<file_attach_name>” if the thumbnail was uploaded using multipart/form-data under <file_attach_name>. More information on Sending Files » */
  readonly thumbnail?: string;
  /** Optional. Caption of the animation to be sent, 0-1024 characters after entities parsing */
  readonly caption?: string;
  /** Optional. Mode for parsing entities in the animation caption. See formatting options for more details. */
  readonly parse_mode?: ParseMode;
  /** Optional. List of special entities that appear in the caption, which can be specified instead of parse_mode */
  readonly caption_entities?: ReadonlyArray<MessageEntity>;
  /** Optional. Pass True if the caption must be shown above the message media */
  readonly show_caption_above_media?: boolean;
  /** Optional. Animation width */
  readonly width?: number;
  /** Optional. Animation height */
  readonly height?: number;
  /** Optional. Animation duration in seconds */
  readonly duration?: number;
  /** Optional. Pass True if the animation needs to be covered with a spoiler animation */
  readonly has_spoiler?: boolean;
  readonly [key: string]: unknown;
}
export const InputMediaAnimation: Schema.Codec<InputMediaAnimation> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    media: Schema.String,
    thumbnail: Schema.optionalKey(Schema.String),
    caption: Schema.optionalKey(Schema.String),
    parse_mode: Schema.optionalKey(Schema.suspend((): Schema.Codec<ParseMode> => ParseMode)),
    caption_entities: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<MessageEntity> => MessageEntity))),
    show_caption_above_media: Schema.optionalKey(Schema.Boolean),
    width: Schema.optionalKey(Schema.Int),
    height: Schema.optionalKey(Schema.Int),
    duration: Schema.optionalKey(Schema.Int),
    has_spoiler: Schema.optionalKey(Schema.Boolean),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Represents an audio file to be treated as music to be sent. */
export interface InputMediaAudio {
  /** Type of the media, must be audio */
  readonly type: string;
  /** File to send. Pass a file_id to send a file that exists on the Telegram servers (recommended), pass an HTTP URL for Telegram to get a file from the Internet, or pass “attach://<file_attach_name>” to upload a new one using multipart/form-data under <file_attach_name> name. More information on Sending Files » */
  readonly media: string;
  /** Optional. Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails can't be reused and can be only uploaded as a new file, so you can pass “attach://<file_attach_name>” if the thumbnail was uploaded using multipart/form-data under <file_attach_name>. More information on Sending Files » */
  readonly thumbnail?: string;
  /** Optional. Caption of the audio to be sent, 0-1024 characters after entities parsing */
  readonly caption?: string;
  /** Optional. Mode for parsing entities in the audio caption. See formatting options for more details. */
  readonly parse_mode?: ParseMode;
  /** Optional. List of special entities that appear in the caption, which can be specified instead of parse_mode */
  readonly caption_entities?: ReadonlyArray<MessageEntity>;
  /** Optional. Duration of the audio in seconds */
  readonly duration?: number;
  /** Optional. Performer of the audio */
  readonly performer?: string;
  /** Optional. Title of the audio */
  readonly title?: string;
  readonly [key: string]: unknown;
}
export const InputMediaAudio: Schema.Codec<InputMediaAudio> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    media: Schema.String,
    thumbnail: Schema.optionalKey(Schema.String),
    caption: Schema.optionalKey(Schema.String),
    parse_mode: Schema.optionalKey(Schema.suspend((): Schema.Codec<ParseMode> => ParseMode)),
    caption_entities: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<MessageEntity> => MessageEntity))),
    duration: Schema.optionalKey(Schema.Int),
    performer: Schema.optionalKey(Schema.String),
    title: Schema.optionalKey(Schema.String),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Represents a general file to be sent. */
export interface InputMediaDocument {
  /** Type of the media, must be document */
  readonly type: string;
  /** File to send. Pass a file_id to send a file that exists on the Telegram servers (recommended), pass an HTTP URL for Telegram to get a file from the Internet, or pass “attach://<file_attach_name>” to upload a new one using multipart/form-data under <file_attach_name> name. More information on Sending Files » */
  readonly media: string;
  /** Optional. Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails can't be reused and can be only uploaded as a new file, so you can pass “attach://<file_attach_name>” if the thumbnail was uploaded using multipart/form-data under <file_attach_name>. More information on Sending Files » */
  readonly thumbnail?: string;
  /** Optional. Caption of the document to be sent, 0-1024 characters after entities parsing */
  readonly caption?: string;
  /** Optional. Mode for parsing entities in the document caption. See formatting options for more details. */
  readonly parse_mode?: ParseMode;
  /** Optional. List of special entities that appear in the caption, which can be specified instead of parse_mode */
  readonly caption_entities?: ReadonlyArray<MessageEntity>;
  /** Optional. Disables automatic server-side content type detection for files uploaded using multipart/form-data. Always True, if the document is sent as part of an album. */
  readonly disable_content_type_detection?: boolean;
  readonly [key: string]: unknown;
}
export const InputMediaDocument: Schema.Codec<InputMediaDocument> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    media: Schema.String,
    thumbnail: Schema.optionalKey(Schema.String),
    caption: Schema.optionalKey(Schema.String),
    parse_mode: Schema.optionalKey(Schema.suspend((): Schema.Codec<ParseMode> => ParseMode)),
    caption_entities: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<MessageEntity> => MessageEntity))),
    disable_content_type_detection: Schema.optionalKey(Schema.Boolean),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Represents an HTTP link to be sent. */
export interface InputMediaLink {
  /** Type of the media, must be link */
  readonly type: string;
  /** HTTP URL of the link */
  readonly url: string;
  readonly [key: string]: unknown;
}
export const InputMediaLink: Schema.Codec<InputMediaLink> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    url: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Represents a live photo to be sent. */
export interface InputMediaLivePhoto {
  /** Type of the media, must be live_photo */
  readonly type: string;
  /** Video of the live photo to send. Pass a file_id to send a file that exists on the Telegram servers (recommended) or pass “attach://<file_attach_name>” to upload a new one using multipart/form-data under <file_attach_name> name. More information on Sending Files ». Sending live photos by a URL is currently unsupported. */
  readonly media: string;
  /** The static photo to send. Pass a file_id to send a file that exists on the Telegram servers (recommended) or pass “attach://<file_attach_name>” to upload a new one using multipart/form-data under <file_attach_name> name. More information on Sending Files ». Sending live photos by a URL is currently unsupported. */
  readonly photo: string;
  /** Optional. Caption of the live photo to be sent, 0-1024 characters after entities parsing */
  readonly caption?: string;
  /** Optional. Mode for parsing entities in the live photo caption. See formatting options for more details. */
  readonly parse_mode?: ParseMode;
  /** Optional. List of special entities that appear in the caption, which can be specified instead of parse_mode */
  readonly caption_entities?: ReadonlyArray<MessageEntity>;
  /** Optional. Pass True if the caption must be shown above the message media */
  readonly show_caption_above_media?: boolean;
  /** Optional. Pass True if the live photo needs to be covered with a spoiler animation */
  readonly has_spoiler?: boolean;
  readonly [key: string]: unknown;
}
export const InputMediaLivePhoto: Schema.Codec<InputMediaLivePhoto> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    media: Schema.String,
    photo: Schema.String,
    caption: Schema.optionalKey(Schema.String),
    parse_mode: Schema.optionalKey(Schema.suspend((): Schema.Codec<ParseMode> => ParseMode)),
    caption_entities: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<MessageEntity> => MessageEntity))),
    show_caption_above_media: Schema.optionalKey(Schema.Boolean),
    has_spoiler: Schema.optionalKey(Schema.Boolean),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Represents a location to be sent. */
export interface InputMediaLocation {
  /** Type of the media, must be location */
  readonly type: string;
  /** Latitude of the location */
  readonly latitude: number;
  /** Longitude of the location */
  readonly longitude: number;
  /** Optional. The radius of uncertainty for the location, measured in meters; 0-1500 */
  readonly horizontal_accuracy?: number;
  readonly [key: string]: unknown;
}
export const InputMediaLocation: Schema.Codec<InputMediaLocation> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    latitude: Schema.Number,
    longitude: Schema.Number,
    horizontal_accuracy: Schema.optionalKey(Schema.Number),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Represents a photo to be sent. */
export interface InputMediaPhoto {
  /** Type of the media, must be photo */
  readonly type: string;
  /** File to send. Pass a file_id to send a file that exists on the Telegram servers (recommended), pass an HTTP URL for Telegram to get a file from the Internet, or pass “attach://<file_attach_name>” to upload a new one using multipart/form-data under <file_attach_name> name. More information on Sending Files » */
  readonly media: string;
  /** Optional. Caption of the photo to be sent, 0-1024 characters after entities parsing */
  readonly caption?: string;
  /** Optional. Mode for parsing entities in the photo caption. See formatting options for more details. */
  readonly parse_mode?: ParseMode;
  /** Optional. List of special entities that appear in the caption, which can be specified instead of parse_mode */
  readonly caption_entities?: ReadonlyArray<MessageEntity>;
  /** Optional. Pass True if the caption must be shown above the message media */
  readonly show_caption_above_media?: boolean;
  /** Optional. Pass True if the photo needs to be covered with a spoiler animation */
  readonly has_spoiler?: boolean;
  readonly [key: string]: unknown;
}
export const InputMediaPhoto: Schema.Codec<InputMediaPhoto> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    media: Schema.String,
    caption: Schema.optionalKey(Schema.String),
    parse_mode: Schema.optionalKey(Schema.suspend((): Schema.Codec<ParseMode> => ParseMode)),
    caption_entities: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<MessageEntity> => MessageEntity))),
    show_caption_above_media: Schema.optionalKey(Schema.Boolean),
    has_spoiler: Schema.optionalKey(Schema.Boolean),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Represents a sticker file to be sent. */
export interface InputMediaSticker {
  /** Type of the media, must be sticker */
  readonly type: string;
  /** File to send. Pass a file_id to send a file that exists on the Telegram servers (recommended), pass an HTTP URL for Telegram to get a .WEBP sticker from the Internet, or pass “attach://<file_attach_name>” to upload a new .WEBP, .TGS, or .WEBM sticker using multipart/form-data under <file_attach_name> name. More information on Sending Files » */
  readonly media: string;
  /** Optional. Emoji associated with the sticker; only for just uploaded stickers */
  readonly emoji?: string;
  readonly [key: string]: unknown;
}
export const InputMediaSticker: Schema.Codec<InputMediaSticker> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    media: Schema.String,
    emoji: Schema.optionalKey(Schema.String),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Represents a venue to be sent. */
export interface InputMediaVenue {
  /** Type of the media, must be venue */
  readonly type: string;
  /** Latitude of the location */
  readonly latitude: number;
  /** Longitude of the location */
  readonly longitude: number;
  /** Name of the venue */
  readonly title: string;
  /** Address of the venue */
  readonly address: string;
  /** Optional. Foursquare identifier of the venue */
  readonly foursquare_id?: string;
  /** Optional. Foursquare type of the venue, if known. (For example, “arts_entertainment/default”, “arts_entertainment/aquarium” or “food/icecream”.) */
  readonly foursquare_type?: string;
  /** Optional. Google Places identifier of the venue */
  readonly google_place_id?: string;
  /** Optional. Google Places type of the venue. (See supported types.) */
  readonly google_place_type?: string;
  readonly [key: string]: unknown;
}
export const InputMediaVenue: Schema.Codec<InputMediaVenue> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
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

/** Represents a video to be sent. */
export interface InputMediaVideo {
  /** Type of the media, must be video */
  readonly type: string;
  /** File to send. Pass a file_id to send a file that exists on the Telegram servers (recommended), pass an HTTP URL for Telegram to get a file from the Internet, or pass “attach://<file_attach_name>” to upload a new one using multipart/form-data under <file_attach_name> name. More information on Sending Files » */
  readonly media: string;
  /** Optional. Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails can't be reused and can be only uploaded as a new file, so you can pass “attach://<file_attach_name>” if the thumbnail was uploaded using multipart/form-data under <file_attach_name>. More information on Sending Files » */
  readonly thumbnail?: string;
  /** Optional. Cover for the video in the message. Pass a file_id to send a file that exists on the Telegram servers (recommended), pass an HTTP URL for Telegram to get a file from the Internet, or pass “attach://<file_attach_name>” to upload a new one using multipart/form-data under <file_attach_name> name. More information on Sending Files » */
  readonly cover?: string;
  /** Optional. Start timestamp for the video in the message */
  readonly start_timestamp?: number;
  /** Optional. Caption of the video to be sent, 0-1024 characters after entities parsing */
  readonly caption?: string;
  /** Optional. Mode for parsing entities in the video caption. See formatting options for more details. */
  readonly parse_mode?: ParseMode;
  /** Optional. List of special entities that appear in the caption, which can be specified instead of parse_mode */
  readonly caption_entities?: ReadonlyArray<MessageEntity>;
  /** Optional. Pass True if the caption must be shown above the message media */
  readonly show_caption_above_media?: boolean;
  /** Optional. Video width */
  readonly width?: number;
  /** Optional. Video height */
  readonly height?: number;
  /** Optional. Video duration in seconds */
  readonly duration?: number;
  /** Optional. Pass True if the uploaded video is suitable for streaming */
  readonly supports_streaming?: boolean;
  /** Optional. Pass True if the video needs to be covered with a spoiler animation */
  readonly has_spoiler?: boolean;
  readonly [key: string]: unknown;
}
export const InputMediaVideo: Schema.Codec<InputMediaVideo> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    media: Schema.String,
    thumbnail: Schema.optionalKey(Schema.String),
    cover: Schema.optionalKey(Schema.String),
    start_timestamp: Schema.optionalKey(Schema.Int),
    caption: Schema.optionalKey(Schema.String),
    parse_mode: Schema.optionalKey(Schema.suspend((): Schema.Codec<ParseMode> => ParseMode)),
    caption_entities: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<MessageEntity> => MessageEntity))),
    show_caption_above_media: Schema.optionalKey(Schema.Boolean),
    width: Schema.optionalKey(Schema.Int),
    height: Schema.optionalKey(Schema.Int),
    duration: Schema.optionalKey(Schema.Int),
    supports_streaming: Schema.optionalKey(Schema.Boolean),
    has_spoiler: Schema.optionalKey(Schema.Boolean),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Represents a voice message file to be sent. */
export interface InputMediaVoiceNote {
  /** Type of the media, must be voice_note */
  readonly type: string;
  /** File to send. Pass a file_id to send a file that exists on the Telegram servers (recommended), pass an HTTP URL for Telegram to get a file from the Internet, or pass "attach://<file_attach_name>" to upload a new one using multipart/form-data under <file_attach_name> name. More information on Sending Files » */
  readonly media: string;
  /** Optional. Caption of the voice message to be sent, 0-1024 characters after entities parsing */
  readonly caption?: string;
  /** Optional. Mode for parsing entities in the voice message caption. See formatting options for more details. */
  readonly parse_mode?: ParseMode;
  /** Optional. List of special entities that appear in the caption, which can be specified instead of parse_mode */
  readonly caption_entities?: ReadonlyArray<MessageEntity>;
  /** Optional. Duration of the voice message in seconds */
  readonly duration?: number;
  readonly [key: string]: unknown;
}
export const InputMediaVoiceNote: Schema.Codec<InputMediaVoiceNote> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    media: Schema.String,
    caption: Schema.optionalKey(Schema.String),
    parse_mode: Schema.optionalKey(Schema.suspend((): Schema.Codec<ParseMode> => ParseMode)),
    caption_entities: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<MessageEntity> => MessageEntity))),
    duration: Schema.optionalKey(Schema.Int),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object represents the content of a message to be sent as a result of an inline query. Telegram clients currently support the following types: */
export type InputMessageContent = InputTextMessageContent | InputRichMessageContent | InputLocationMessageContent | InputVenueMessageContent | InputContactMessageContent | InputInvoiceMessageContent;
export const InputMessageContent: Schema.Codec<InputMessageContent> = Schema.Union([Schema.suspend((): Schema.Codec<InputTextMessageContent> => InputTextMessageContent), Schema.suspend((): Schema.Codec<InputRichMessageContent> => InputRichMessageContent), Schema.suspend((): Schema.Codec<InputLocationMessageContent> => InputLocationMessageContent), Schema.suspend((): Schema.Codec<InputVenueMessageContent> => InputVenueMessageContent), Schema.suspend((): Schema.Codec<InputContactMessageContent> => InputContactMessageContent), Schema.suspend((): Schema.Codec<InputInvoiceMessageContent> => InputInvoiceMessageContent)]);

/** This object describes the paid media to be sent. Currently, it can be one of */
export type InputPaidMedia = InputPaidMediaLivePhoto | InputPaidMediaPhoto | InputPaidMediaVideo;
export const InputPaidMedia: Schema.Codec<InputPaidMedia> = Schema.Union([Schema.suspend((): Schema.Codec<InputPaidMediaLivePhoto> => InputPaidMediaLivePhoto), Schema.suspend((): Schema.Codec<InputPaidMediaPhoto> => InputPaidMediaPhoto), Schema.suspend((): Schema.Codec<InputPaidMediaVideo> => InputPaidMediaVideo)]);

/** The paid media to send is a live photo. */
export interface InputPaidMediaLivePhoto {
  /** Type of the media, must be live_photo */
  readonly type: string;
  /** Video of the live photo to send. Pass a file_id to send a file that exists on the Telegram servers (recommended) or pass “attach://<file_attach_name>” to upload a new one using multipart/form-data under <file_attach_name> name. More information on Sending Files ». Sending live photos by a URL is currently unsupported. */
  readonly media: string;
  /** The static photo to send. Pass a file_id to send a file that exists on the Telegram servers (recommended) or pass “attach://<file_attach_name>” to upload a new one using multipart/form-data under <file_attach_name> name. More information on Sending Files ». Sending live photos by a URL is currently unsupported. */
  readonly photo: string;
  readonly [key: string]: unknown;
}
export const InputPaidMediaLivePhoto: Schema.Codec<InputPaidMediaLivePhoto> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    media: Schema.String,
    photo: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** The paid media to send is a photo. */
export interface InputPaidMediaPhoto {
  /** Type of the media, must be photo */
  readonly type: string;
  /** File to send. Pass a file_id to send a file that exists on the Telegram servers (recommended), pass an HTTP URL for Telegram to get a file from the Internet, or pass “attach://<file_attach_name>” to upload a new one using multipart/form-data under <file_attach_name> name. More information on Sending Files » */
  readonly media: string;
  readonly [key: string]: unknown;
}
export const InputPaidMediaPhoto: Schema.Codec<InputPaidMediaPhoto> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    media: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** The paid media to send is a video. */
export interface InputPaidMediaVideo {
  /** Type of the media, must be video */
  readonly type: string;
  /** File to send. Pass a file_id to send a file that exists on the Telegram servers (recommended), pass an HTTP URL for Telegram to get a file from the Internet, or pass “attach://<file_attach_name>” to upload a new one using multipart/form-data under <file_attach_name> name. More information on Sending Files » */
  readonly media: string;
  /** Optional. Thumbnail of the file sent; can be ignored if thumbnail generation for the file is supported server-side. The thumbnail should be in JPEG format and less than 200 kB in size. A thumbnail's width and height should not exceed 320. Ignored if the file is not uploaded using multipart/form-data. Thumbnails can't be reused and can be only uploaded as a new file, so you can pass “attach://<file_attach_name>” if the thumbnail was uploaded using multipart/form-data under <file_attach_name>. More information on Sending Files » */
  readonly thumbnail?: string;
  /** Optional. Cover for the video in the message. Pass a file_id to send a file that exists on the Telegram servers (recommended), pass an HTTP URL for Telegram to get a file from the Internet, or pass “attach://<file_attach_name>” to upload a new one using multipart/form-data under <file_attach_name> name. More information on Sending Files » */
  readonly cover?: string;
  /** Optional. Start timestamp for the video in the message */
  readonly start_timestamp?: number;
  /** Optional. Video width */
  readonly width?: number;
  /** Optional. Video height */
  readonly height?: number;
  /** Optional. Video duration in seconds */
  readonly duration?: number;
  /** Optional. Pass True if the uploaded video is suitable for streaming */
  readonly supports_streaming?: boolean;
  readonly [key: string]: unknown;
}
export const InputPaidMediaVideo: Schema.Codec<InputPaidMediaVideo> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    media: Schema.String,
    thumbnail: Schema.optionalKey(Schema.String),
    cover: Schema.optionalKey(Schema.String),
    start_timestamp: Schema.optionalKey(Schema.Int),
    width: Schema.optionalKey(Schema.Int),
    height: Schema.optionalKey(Schema.Int),
    duration: Schema.optionalKey(Schema.Int),
    supports_streaming: Schema.optionalKey(Schema.Boolean),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object represents the content of a poll description or a quiz explanation to be sent. It should be one of */
export type InputPollMedia = InputMediaAnimation | InputMediaAudio | InputMediaDocument | InputMediaLivePhoto | InputMediaLocation | InputMediaPhoto | InputMediaVenue | InputMediaVideo;
export const InputPollMedia: Schema.Codec<InputPollMedia> = Schema.Union([Schema.suspend((): Schema.Codec<InputMediaAnimation> => InputMediaAnimation), Schema.suspend((): Schema.Codec<InputMediaAudio> => InputMediaAudio), Schema.suspend((): Schema.Codec<InputMediaDocument> => InputMediaDocument), Schema.suspend((): Schema.Codec<InputMediaLivePhoto> => InputMediaLivePhoto), Schema.suspend((): Schema.Codec<InputMediaLocation> => InputMediaLocation), Schema.suspend((): Schema.Codec<InputMediaPhoto> => InputMediaPhoto), Schema.suspend((): Schema.Codec<InputMediaVenue> => InputMediaVenue), Schema.suspend((): Schema.Codec<InputMediaVideo> => InputMediaVideo)]);

/** This object contains information about one answer option in a poll to be sent. */
export interface InputPollOption {
  /** Option text, 1-100 characters */
  readonly text: string;
  /** Optional. Mode for parsing entities in the text. See formatting options for more details. Currently, only custom emoji entities are allowed. */
  readonly text_parse_mode?: ParseMode;
  /** Optional. A JSON-serialized list of special entities that appear in the poll option text. It can be specified instead of text_parse_mode. */
  readonly text_entities?: ReadonlyArray<MessageEntity>;
  /** Optional. Media added to the poll option */
  readonly media?: InputPollOptionMedia;
  readonly [key: string]: unknown;
}
export const InputPollOption: Schema.Codec<InputPollOption> = Schema.StructWithRest(
  Schema.Struct({
    text: Schema.String,
    text_parse_mode: Schema.optionalKey(Schema.suspend((): Schema.Codec<ParseMode> => ParseMode)),
    text_entities: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<MessageEntity> => MessageEntity))),
    media: Schema.optionalKey(Schema.suspend((): Schema.Codec<InputPollOptionMedia> => InputPollOptionMedia)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object represents the content of a poll option to be sent. It should be one of */
export type InputPollOptionMedia = InputMediaAnimation | InputMediaLink | InputMediaLivePhoto | InputMediaLocation | InputMediaPhoto | InputMediaSticker | InputMediaVenue | InputMediaVideo;
export const InputPollOptionMedia: Schema.Codec<InputPollOptionMedia> = Schema.Union([Schema.suspend((): Schema.Codec<InputMediaAnimation> => InputMediaAnimation), Schema.suspend((): Schema.Codec<InputMediaLink> => InputMediaLink), Schema.suspend((): Schema.Codec<InputMediaLivePhoto> => InputMediaLivePhoto), Schema.suspend((): Schema.Codec<InputMediaLocation> => InputMediaLocation), Schema.suspend((): Schema.Codec<InputMediaPhoto> => InputMediaPhoto), Schema.suspend((): Schema.Codec<InputMediaSticker> => InputMediaSticker), Schema.suspend((): Schema.Codec<InputMediaVenue> => InputMediaVenue), Schema.suspend((): Schema.Codec<InputMediaVideo> => InputMediaVideo)]);

/** This object describes a profile photo to set. Currently, it can be one of */
export type InputProfilePhoto = InputProfilePhotoStatic | InputProfilePhotoAnimated;
export const InputProfilePhoto: Schema.Codec<InputProfilePhoto> = Schema.Union([Schema.suspend((): Schema.Codec<InputProfilePhotoStatic> => InputProfilePhotoStatic), Schema.suspend((): Schema.Codec<InputProfilePhotoAnimated> => InputProfilePhotoAnimated)]);

/** An animated profile photo in the MPEG4 format. */
export interface InputProfilePhotoAnimated {
  /** Type of the profile photo, must be animated */
  readonly type: string;
  /** The animated profile photo. Profile photos can't be reused and can only be uploaded as a new file, so you can pass “attach://<file_attach_name>” if the photo was uploaded using multipart/form-data under <file_attach_name>. More information on Sending Files » */
  readonly animation: string;
  /** Optional. Timestamp in seconds of the frame that will be used as the static profile photo. Defaults to 0.0. */
  readonly main_frame_timestamp?: number;
  readonly [key: string]: unknown;
}
export const InputProfilePhotoAnimated: Schema.Codec<InputProfilePhotoAnimated> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    animation: Schema.String,
    main_frame_timestamp: Schema.optionalKey(Schema.Number),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A static profile photo in the .JPG format. */
export interface InputProfilePhotoStatic {
  /** Type of the profile photo, must be static */
  readonly type: string;
  /** The static profile photo. Profile photos can't be reused and can only be uploaded as a new file, so you can pass “attach://<file_attach_name>” if the photo was uploaded using multipart/form-data under <file_attach_name>. More information on Sending Files » */
  readonly photo: string;
  readonly [key: string]: unknown;
}
export const InputProfilePhotoStatic: Schema.Codec<InputProfilePhotoStatic> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    photo: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object represents a block in a rich formatted message to be sent. Currently, it can be any of the following types: */
export type InputRichBlock = InputRichBlockParagraph | InputRichBlockSectionHeading | InputRichBlockPreformatted | InputRichBlockFooter | InputRichBlockDivider | InputRichBlockMathematicalExpression | InputRichBlockAnchor | InputRichBlockList | InputRichBlockBlockQuotation | InputRichBlockExpandableBlockQuotation | InputRichBlockPullQuotation | InputRichBlockCollage | InputRichBlockSlideshow | InputRichBlockTable | InputRichBlockDetails | InputRichBlockMap | InputRichBlockButtons | InputRichBlockAnimation | InputRichBlockAudio | InputRichBlockDocument | InputRichBlockPhoto | InputRichBlockVideo | InputRichBlockVoiceNote | InputRichBlockThinking;
export const InputRichBlock: Schema.Codec<InputRichBlock> = Schema.Union([Schema.suspend((): Schema.Codec<InputRichBlockParagraph> => InputRichBlockParagraph), Schema.suspend((): Schema.Codec<InputRichBlockSectionHeading> => InputRichBlockSectionHeading), Schema.suspend((): Schema.Codec<InputRichBlockPreformatted> => InputRichBlockPreformatted), Schema.suspend((): Schema.Codec<InputRichBlockFooter> => InputRichBlockFooter), Schema.suspend((): Schema.Codec<InputRichBlockDivider> => InputRichBlockDivider), Schema.suspend((): Schema.Codec<InputRichBlockMathematicalExpression> => InputRichBlockMathematicalExpression), Schema.suspend((): Schema.Codec<InputRichBlockAnchor> => InputRichBlockAnchor), Schema.suspend((): Schema.Codec<InputRichBlockList> => InputRichBlockList), Schema.suspend((): Schema.Codec<InputRichBlockBlockQuotation> => InputRichBlockBlockQuotation), Schema.suspend((): Schema.Codec<InputRichBlockExpandableBlockQuotation> => InputRichBlockExpandableBlockQuotation), Schema.suspend((): Schema.Codec<InputRichBlockPullQuotation> => InputRichBlockPullQuotation), Schema.suspend((): Schema.Codec<InputRichBlockCollage> => InputRichBlockCollage), Schema.suspend((): Schema.Codec<InputRichBlockSlideshow> => InputRichBlockSlideshow), Schema.suspend((): Schema.Codec<InputRichBlockTable> => InputRichBlockTable), Schema.suspend((): Schema.Codec<InputRichBlockDetails> => InputRichBlockDetails), Schema.suspend((): Schema.Codec<InputRichBlockMap> => InputRichBlockMap), Schema.suspend((): Schema.Codec<InputRichBlockButtons> => InputRichBlockButtons), Schema.suspend((): Schema.Codec<InputRichBlockAnimation> => InputRichBlockAnimation), Schema.suspend((): Schema.Codec<InputRichBlockAudio> => InputRichBlockAudio), Schema.suspend((): Schema.Codec<InputRichBlockDocument> => InputRichBlockDocument), Schema.suspend((): Schema.Codec<InputRichBlockPhoto> => InputRichBlockPhoto), Schema.suspend((): Schema.Codec<InputRichBlockVideo> => InputRichBlockVideo), Schema.suspend((): Schema.Codec<InputRichBlockVoiceNote> => InputRichBlockVoiceNote), Schema.suspend((): Schema.Codec<InputRichBlockThinking> => InputRichBlockThinking)]);

/** A block with an anchor, corresponding to the HTML tag <a> with the attribute name. */
export interface InputRichBlockAnchor {
  /** Type of the block, always “anchor” */
  readonly type: string;
  /** The name of the anchor */
  readonly name: string;
  readonly [key: string]: unknown;
}
export const InputRichBlockAnchor: Schema.Codec<InputRichBlockAnchor> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    name: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A block with an animation, corresponding to the HTML tag <video>. */
export interface InputRichBlockAnimation {
  /** Type of the block, always “animation” */
  readonly type: string;
  /** The animation. Caption is ignored. */
  readonly animation: InputMediaAnimation;
  /** Optional. Caption of the block */
  readonly caption?: RichBlockCaption;
  readonly [key: string]: unknown;
}
export const InputRichBlockAnimation: Schema.Codec<InputRichBlockAnimation> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    animation: Schema.suspend((): Schema.Codec<InputMediaAnimation> => InputMediaAnimation),
    caption: Schema.optionalKey(Schema.suspend((): Schema.Codec<RichBlockCaption> => RichBlockCaption)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A block with a music file, corresponding to the HTML tag <audio>. */
export interface InputRichBlockAudio {
  /** Type of the block, always “audio” */
  readonly type: string;
  /** The audio. Caption is ignored. */
  readonly audio: InputMediaAudio;
  /** Optional. Caption of the block */
  readonly caption?: RichBlockCaption;
  readonly [key: string]: unknown;
}
export const InputRichBlockAudio: Schema.Codec<InputRichBlockAudio> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    audio: Schema.suspend((): Schema.Codec<InputMediaAudio> => InputMediaAudio),
    caption: Schema.optionalKey(Schema.suspend((): Schema.Codec<RichBlockCaption> => RichBlockCaption)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A block quotation, corresponding to the HTML tag <blockquote>. */
export interface InputRichBlockBlockQuotation {
  /** Type of the block, always “blockquote” */
  readonly type: string;
  /** Content of the block */
  readonly blocks: ReadonlyArray<InputRichBlock>;
  /** Optional. Credit of the block */
  readonly credit?: RichText;
  readonly [key: string]: unknown;
}
export const InputRichBlockBlockQuotation: Schema.Codec<InputRichBlockBlockQuotation> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    blocks: Schema.Array(Schema.suspend((): Schema.Codec<InputRichBlock> => InputRichBlock)),
    credit: Schema.optionalKey(Schema.suspend((): Schema.Codec<RichText> => RichText)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A block containing a list of buttons that are shown in one row, corresponding to the custom HTML tag <tg-button-row>. */
export interface InputRichBlockButtons {
  /** Type of the block, always “buttons” */
  readonly type: string;
  /** List of 1-8 buttons to send */
  readonly buttons: ReadonlyArray<RichMessageButton>;
  /** Optional. Horizontal alignment of the buttons. Currently, must be one of “left”, “center”, or “right”. */
  readonly align?: string;
  readonly [key: string]: unknown;
}
export const InputRichBlockButtons: Schema.Codec<InputRichBlockButtons> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    buttons: Schema.Array(Schema.suspend((): Schema.Codec<RichMessageButton> => RichMessageButton)),
    align: Schema.optionalKey(Schema.String),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A collage, corresponding to the custom HTML tag <tg-collage>. */
export interface InputRichBlockCollage {
  /** Type of the block, always “collage” */
  readonly type: string;
  /** Elements of the collage */
  readonly blocks: ReadonlyArray<InputRichBlock>;
  /** Optional. Caption of the block */
  readonly caption?: RichBlockCaption;
  readonly [key: string]: unknown;
}
export const InputRichBlockCollage: Schema.Codec<InputRichBlockCollage> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    blocks: Schema.Array(Schema.suspend((): Schema.Codec<InputRichBlock> => InputRichBlock)),
    caption: Schema.optionalKey(Schema.suspend((): Schema.Codec<RichBlockCaption> => RichBlockCaption)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** An expandable block for details disclosure, corresponding to the HTML tag <details>. */
export interface InputRichBlockDetails {
  /** Type of the block, always “details” */
  readonly type: string;
  /** Always shown summary of the block */
  readonly summary: RichText;
  /** Content of the block */
  readonly blocks: ReadonlyArray<InputRichBlock>;
  /** Optional. Pass True if the content of the block is visible by default */
  readonly is_open?: true;
  readonly [key: string]: unknown;
}
export const InputRichBlockDetails: Schema.Codec<InputRichBlockDetails> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    summary: Schema.suspend((): Schema.Codec<RichText> => RichText),
    blocks: Schema.Array(Schema.suspend((): Schema.Codec<InputRichBlock> => InputRichBlock)),
    is_open: Schema.optionalKey(Schema.Literal(true)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A divider, corresponding to the HTML tag <hr/>. */
export interface InputRichBlockDivider {
  /** Type of the block, always “divider” */
  readonly type: string;
  readonly [key: string]: unknown;
}
export const InputRichBlockDivider: Schema.Codec<InputRichBlockDivider> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A block with a general file, corresponding to the custom HTML tag <tg-document>. */
export interface InputRichBlockDocument {
  /** Type of the block, always “document” */
  readonly type: string;
  /** The document. Caption is ignored. */
  readonly document: InputMediaDocument;
  /** Optional. Caption of the block */
  readonly caption?: RichBlockCaption;
  readonly [key: string]: unknown;
}
export const InputRichBlockDocument: Schema.Codec<InputRichBlockDocument> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    document: Schema.suspend((): Schema.Codec<InputMediaDocument> => InputMediaDocument),
    caption: Schema.optionalKey(Schema.suspend((): Schema.Codec<RichBlockCaption> => RichBlockCaption)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A block quotation, corresponding to the HTML tag <blockquote> with custom attribute "expandable". */
export interface InputRichBlockExpandableBlockQuotation {
  /** Type of the block, always “expandable_blockquote” */
  readonly type: string;
  /** Content of the block */
  readonly text: RichText;
  /** Optional. Credit of the block */
  readonly credit?: RichText;
  readonly [key: string]: unknown;
}
export const InputRichBlockExpandableBlockQuotation: Schema.Codec<InputRichBlockExpandableBlockQuotation> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    text: Schema.suspend((): Schema.Codec<RichText> => RichText),
    credit: Schema.optionalKey(Schema.suspend((): Schema.Codec<RichText> => RichText)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A footer, corresponding to the HTML tag <footer>. */
export interface InputRichBlockFooter {
  /** Type of the block, always “footer” */
  readonly type: string;
  /** Text of the block */
  readonly text: RichText;
  readonly [key: string]: unknown;
}
export const InputRichBlockFooter: Schema.Codec<InputRichBlockFooter> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    text: Schema.suspend((): Schema.Codec<RichText> => RichText),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A list of blocks, corresponding to the HTML tag <ul> or <ol> with multiple nested tags <li>. */
export interface InputRichBlockList {
  /** Type of the block, always “list” */
  readonly type: string;
  /** Items of the list */
  readonly items: ReadonlyArray<InputRichBlockListItem>;
  readonly [key: string]: unknown;
}
export const InputRichBlockList: Schema.Codec<InputRichBlockList> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    items: Schema.Array(Schema.suspend((): Schema.Codec<InputRichBlockListItem> => InputRichBlockListItem)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** An item of a list to be sent. */
export interface InputRichBlockListItem {
  /** The content of the item */
  readonly blocks: ReadonlyArray<InputRichBlock>;
  /** Optional. Pass True if the item has a checkbox */
  readonly has_checkbox?: true;
  /** Optional. Pass True if the item has a checked checkbox */
  readonly is_checked?: true;
  /** Optional. For ordered lists, the numeric value of the item label */
  readonly value?: number;
  /** Optional. For ordered lists, the type of the item label; must be one of “a” for lowercase letters, “A” for uppercase letters, “i” for lowercase Roman numerals, “I” for uppercase Roman numerals, or “1” for decimal numbers */
  readonly type?: string;
  readonly [key: string]: unknown;
}
export const InputRichBlockListItem: Schema.Codec<InputRichBlockListItem> = Schema.StructWithRest(
  Schema.Struct({
    blocks: Schema.Array(Schema.suspend((): Schema.Codec<InputRichBlock> => InputRichBlock)),
    has_checkbox: Schema.optionalKey(Schema.Literal(true)),
    is_checked: Schema.optionalKey(Schema.Literal(true)),
    value: Schema.optionalKey(Schema.Int),
    type: Schema.optionalKey(Schema.String),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A block with a map, corresponding to the custom HTML tag <tg-map>. The map's width and height must not exceed 10000 in total. The width and height ratio must be at most 20. */
export interface InputRichBlockMap {
  /** Type of the block, always “map” */
  readonly type: string;
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
export const InputRichBlockMap: Schema.Codec<InputRichBlockMap> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    location: Schema.suspend((): Schema.Codec<Location> => Location),
    zoom: Schema.optionalKey(Schema.Int),
    width: Schema.optionalKey(Schema.Int),
    height: Schema.optionalKey(Schema.Int),
    caption: Schema.optionalKey(Schema.suspend((): Schema.Codec<RichBlockCaption> => RichBlockCaption)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A block with a mathematical expression in LaTeX format, corresponding to the custom HTML tag <tg-math-block>. */
export interface InputRichBlockMathematicalExpression {
  /** Type of the block, always “mathematical_expression” */
  readonly type: string;
  /** The mathematical expression in LaTeX format */
  readonly expression: string;
  readonly [key: string]: unknown;
}
export const InputRichBlockMathematicalExpression: Schema.Codec<InputRichBlockMathematicalExpression> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    expression: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A text paragraph, corresponding to the HTML tag <p>. */
export interface InputRichBlockParagraph {
  /** Type of the block, always “paragraph” */
  readonly type: string;
  /** Text of the block */
  readonly text: RichText;
  readonly [key: string]: unknown;
}
export const InputRichBlockParagraph: Schema.Codec<InputRichBlockParagraph> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    text: Schema.suspend((): Schema.Codec<RichText> => RichText),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A block with a photo, corresponding to the HTML tag <img>. */
export interface InputRichBlockPhoto {
  /** Type of the block, always “photo” */
  readonly type: string;
  /** The photo. Caption is ignored. */
  readonly photo: InputMediaPhoto;
  /** Optional. Caption of the block */
  readonly caption?: RichBlockCaption;
  readonly [key: string]: unknown;
}
export const InputRichBlockPhoto: Schema.Codec<InputRichBlockPhoto> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    photo: Schema.suspend((): Schema.Codec<InputMediaPhoto> => InputMediaPhoto),
    caption: Schema.optionalKey(Schema.suspend((): Schema.Codec<RichBlockCaption> => RichBlockCaption)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A preformatted text block, corresponding to the nested HTML tags <pre> and <code>. */
export interface InputRichBlockPreformatted {
  /** Type of the block, always “pre” */
  readonly type: string;
  /** Text of the block */
  readonly text: RichText;
  /** Optional. The programming language of the text */
  readonly language?: string;
  readonly [key: string]: unknown;
}
export const InputRichBlockPreformatted: Schema.Codec<InputRichBlockPreformatted> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    text: Schema.suspend((): Schema.Codec<RichText> => RichText),
    language: Schema.optionalKey(Schema.String),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A quotation with centered text, loosely corresponding to the HTML tag <aside>. */
export interface InputRichBlockPullQuotation {
  /** Type of the block, always “pullquote” */
  readonly type: string;
  /** Text of the block */
  readonly text: RichText;
  /** Optional. Credit of the block */
  readonly credit?: RichText;
  readonly [key: string]: unknown;
}
export const InputRichBlockPullQuotation: Schema.Codec<InputRichBlockPullQuotation> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    text: Schema.suspend((): Schema.Codec<RichText> => RichText),
    credit: Schema.optionalKey(Schema.suspend((): Schema.Codec<RichText> => RichText)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A section heading, corresponding to the HTML tags <h1>, <h2>, <h3>, <h4>, <h5>, or <h6>. */
export interface InputRichBlockSectionHeading {
  /** Type of the block, always “heading” */
  readonly type: string;
  /** Text of the block */
  readonly text: RichText;
  /** Relative size of the text font; 1-6, 1 is the largest, 6 is the smallest */
  readonly size: number;
  readonly [key: string]: unknown;
}
export const InputRichBlockSectionHeading: Schema.Codec<InputRichBlockSectionHeading> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    text: Schema.suspend((): Schema.Codec<RichText> => RichText),
    size: Schema.Int,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A slideshow, corresponding to the custom HTML tag <tg-slideshow>. */
export interface InputRichBlockSlideshow {
  /** Type of the block, always “slideshow” */
  readonly type: string;
  /** Elements of the slideshow */
  readonly blocks: ReadonlyArray<InputRichBlock>;
  /** Optional. Caption of the block */
  readonly caption?: RichBlockCaption;
  readonly [key: string]: unknown;
}
export const InputRichBlockSlideshow: Schema.Codec<InputRichBlockSlideshow> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    blocks: Schema.Array(Schema.suspend((): Schema.Codec<InputRichBlock> => InputRichBlock)),
    caption: Schema.optionalKey(Schema.suspend((): Schema.Codec<RichBlockCaption> => RichBlockCaption)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A table, corresponding to the HTML tag <table>. */
export interface InputRichBlockTable {
  /** Type of the block, always “table” */
  readonly type: string;
  /** Cells of the table */
  readonly cells: ReadonlyArray<ReadonlyArray<RichBlockTableCell>>;
  /** Optional. Pass True if the table has borders */
  readonly is_bordered?: true;
  /** Optional. Pass True if the table is striped */
  readonly is_striped?: true;
  /** Optional. Pass True if table cells must have smaller indents */
  readonly is_compact?: true;
  /** Optional. Caption of the table */
  readonly caption?: RichText;
  readonly [key: string]: unknown;
}
export const InputRichBlockTable: Schema.Codec<InputRichBlockTable> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    cells: Schema.Array(Schema.Array(Schema.suspend((): Schema.Codec<RichBlockTableCell> => RichBlockTableCell))),
    is_bordered: Schema.optionalKey(Schema.Literal(true)),
    is_striped: Schema.optionalKey(Schema.Literal(true)),
    is_compact: Schema.optionalKey(Schema.Literal(true)),
    caption: Schema.optionalKey(Schema.suspend((): Schema.Codec<RichText> => RichText)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A block with a “Thinking…” placeholder, corresponding to the custom HTML tag <tg-thinking>. The block may be used only in sendRichMessageDraft, therefore it can't be received in messages. See https://t.me/addemoji/AIActions for examples of custom emoji that are recommended for usage in the block. */
export interface InputRichBlockThinking {
  /** Type of the block, always “thinking” */
  readonly type: string;
  /** Text of the block. See https://t.me/addemoji/AIActions for examples of custom emoji that are recommended for usage in the block. */
  readonly text: RichText;
  readonly [key: string]: unknown;
}
export const InputRichBlockThinking: Schema.Codec<InputRichBlockThinking> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    text: Schema.suspend((): Schema.Codec<RichText> => RichText),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A block with a video, corresponding to the HTML tag <video>. */
export interface InputRichBlockVideo {
  /** Type of the block, always “video” */
  readonly type: string;
  /** The video. Caption is ignored. */
  readonly video: InputMediaVideo;
  /** Optional. Caption of the block */
  readonly caption?: RichBlockCaption;
  readonly [key: string]: unknown;
}
export const InputRichBlockVideo: Schema.Codec<InputRichBlockVideo> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    video: Schema.suspend((): Schema.Codec<InputMediaVideo> => InputMediaVideo),
    caption: Schema.optionalKey(Schema.suspend((): Schema.Codec<RichBlockCaption> => RichBlockCaption)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A block with a voice note, corresponding to the HTML tag <audio>. */
export interface InputRichBlockVoiceNote {
  /** Type of the block, always “voice_note” */
  readonly type: string;
  /** The voice note. Caption is ignored. */
  readonly voice_note: InputMediaVoiceNote;
  /** Optional. Caption of the block */
  readonly caption?: RichBlockCaption;
  readonly [key: string]: unknown;
}
export const InputRichBlockVoiceNote: Schema.Codec<InputRichBlockVoiceNote> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    voice_note: Schema.suspend((): Schema.Codec<InputMediaVoiceNote> => InputMediaVoiceNote),
    caption: Schema.optionalKey(Schema.suspend((): Schema.Codec<RichBlockCaption> => RichBlockCaption)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
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
  readonly is_rtl?: boolean;
  /** Optional. Pass True to skip automatic detection of entities (e.g., URLs, email addresses, username mentions, hashtags, cashtags, bot commands, or phone numbers) in the text */
  readonly skip_entity_detection?: boolean;
  readonly [key: string]: unknown;
}
export const InputRichMessage: Schema.Codec<InputRichMessage> = Schema.StructWithRest(
  Schema.Struct({
    blocks: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<InputRichBlock> => InputRichBlock))),
    html: Schema.optionalKey(Schema.String),
    markdown: Schema.optionalKey(Schema.String),
    media: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<InputRichMessageMedia> => InputRichMessageMedia))),
    is_rtl: Schema.optionalKey(Schema.Boolean),
    skip_entity_detection: Schema.optionalKey(Schema.Boolean),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Represents the content of a rich message to be sent as the result of an inline query. */
export interface InputRichMessageContent {
  /** The message to be sent. Only previously uploaded files may be used in the message. */
  readonly rich_message: InputRichMessage;
  readonly [key: string]: unknown;
}
export const InputRichMessageContent: Schema.Codec<InputRichMessageContent> = Schema.StructWithRest(
  Schema.Struct({
    rich_message: Schema.suspend((): Schema.Codec<InputRichMessage> => InputRichMessage),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Describes a media element embedded in an outgoing rich message. */
export interface InputRichMessageMedia {
  /** Unique identifier of the media used in a tg://photo?id=, tg://video?id=, tg://document?id=, or tg://audio?id= link. 1-64 characters, only A-Z, a-z, 0-9, _ and - are allowed. */
  readonly id: string;
  /** The media to be sent. Everything except the media itself and its properties is ignored. */
  readonly media: InputMediaAnimation | InputMediaAudio | InputMediaDocument | InputMediaPhoto | InputMediaVideo | InputMediaVoiceNote;
  readonly [key: string]: unknown;
}
export const InputRichMessageMedia: Schema.Codec<InputRichMessageMedia> = Schema.StructWithRest(
  Schema.Struct({
    id: Schema.String,
    media: Schema.Union([Schema.suspend((): Schema.Codec<InputMediaAnimation> => InputMediaAnimation), Schema.suspend((): Schema.Codec<InputMediaAudio> => InputMediaAudio), Schema.suspend((): Schema.Codec<InputMediaDocument> => InputMediaDocument), Schema.suspend((): Schema.Codec<InputMediaPhoto> => InputMediaPhoto), Schema.suspend((): Schema.Codec<InputMediaVideo> => InputMediaVideo), Schema.suspend((): Schema.Codec<InputMediaVoiceNote> => InputMediaVoiceNote)]),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object describes a sticker to be added to a sticker set. */
export interface InputSticker {
  /** The added sticker. Pass a file_id as a String to send a file that already exists on the Telegram servers, pass an HTTP URL as a String for Telegram to get a file from the Internet, or pass “attach://<file_attach_name>” to upload a new file using multipart/form-data under <file_attach_name> name. Animated and video stickers can't be uploaded via HTTP URL. More information on Sending Files » */
  readonly sticker: string;
  /** Format of the added sticker, must be one of “static” for a .WEBP or .PNG image, “animated” for a .TGS animation, “video” for a .WEBM video */
  readonly format: StickerFormat;
  /** List of 1-20 emoji associated with the sticker */
  readonly emoji_list: ReadonlyArray<string>;
  /** Optional. Position where the mask should be placed on faces. For “mask” stickers only. */
  readonly mask_position?: MaskPosition;
  /** Optional. List of 0-20 search keywords for the sticker with total length of up to 64 characters. For “regular” and “custom_emoji” stickers only. */
  readonly keywords?: ReadonlyArray<string>;
  readonly [key: string]: unknown;
}
export const InputSticker: Schema.Codec<InputSticker> = Schema.StructWithRest(
  Schema.Struct({
    sticker: Schema.String,
    format: Schema.suspend((): Schema.Codec<StickerFormat> => StickerFormat),
    emoji_list: Schema.Array(Schema.String),
    mask_position: Schema.optionalKey(Schema.suspend((): Schema.Codec<MaskPosition> => MaskPosition)),
    keywords: Schema.optionalKey(Schema.Array(Schema.String)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object describes the content of a story to post. Currently, it can be one of */
export type InputStoryContent = InputStoryContentPhoto | InputStoryContentVideo;
export const InputStoryContent: Schema.Codec<InputStoryContent> = Schema.Union([Schema.suspend((): Schema.Codec<InputStoryContentPhoto> => InputStoryContentPhoto), Schema.suspend((): Schema.Codec<InputStoryContentVideo> => InputStoryContentVideo)]);

/** Describes a photo to post as a story. */
export interface InputStoryContentPhoto {
  /** Type of the content, must be photo */
  readonly type: string;
  /** The photo to post as a story. The photo must be of the size 1080x1920 and must not exceed 10 MB. The photo can't be reused and can only be uploaded as a new file, so you can pass “attach://<file_attach_name>” if the photo was uploaded using multipart/form-data under <file_attach_name>. More information on Sending Files » */
  readonly photo: string;
  readonly [key: string]: unknown;
}
export const InputStoryContentPhoto: Schema.Codec<InputStoryContentPhoto> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    photo: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Describes a video to post as a story. */
export interface InputStoryContentVideo {
  /** Type of the content, must be video */
  readonly type: string;
  /** The video to post as a story. The video must be of the size 720x1280, streamable, encoded with H.265 codec, with key frames added each second in the MPEG4 format, and must not exceed 30 MB. The video can't be reused and can only be uploaded as a new file, so you can pass “attach://<file_attach_name>” if the video was uploaded using multipart/form-data under <file_attach_name>. More information on Sending Files » */
  readonly video: string;
  /** Optional. Precise duration of the video in seconds; 0-60 */
  readonly duration?: number;
  /** Optional. Timestamp in seconds of the frame that will be used as the static cover for the story. Defaults to 0.0. */
  readonly cover_frame_timestamp?: number;
  /** Optional. Pass True if the video has no sound */
  readonly is_animation?: boolean;
  readonly [key: string]: unknown;
}
export const InputStoryContentVideo: Schema.Codec<InputStoryContentVideo> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    video: Schema.String,
    duration: Schema.optionalKey(Schema.Number),
    cover_frame_timestamp: Schema.optionalKey(Schema.Number),
    is_animation: Schema.optionalKey(Schema.Boolean),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Represents the content of a text message to be sent as the result of an inline query. */
export interface InputTextMessageContent {
  /** Text of the message to be sent, 1-4096 characters */
  readonly message_text: string;
  /** Optional. Mode for parsing entities in the message text. See formatting options for more details. */
  readonly parse_mode?: ParseMode;
  /** Optional. List of special entities that appear in message text, which can be specified instead of parse_mode */
  readonly entities?: ReadonlyArray<MessageEntity>;
  /** Optional. Link preview generation options for the message */
  readonly link_preview_options?: LinkPreviewOptions;
  readonly [key: string]: unknown;
}
export const InputTextMessageContent: Schema.Codec<InputTextMessageContent> = Schema.StructWithRest(
  Schema.Struct({
    message_text: Schema.String,
    parse_mode: Schema.optionalKey(Schema.suspend((): Schema.Codec<ParseMode> => ParseMode)),
    entities: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<MessageEntity> => MessageEntity))),
    link_preview_options: Schema.optionalKey(Schema.suspend((): Schema.Codec<LinkPreviewOptions> => LinkPreviewOptions)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
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
  readonly foursquare_id?: string;
  /** Optional. Foursquare type of the venue, if known. (For example, “arts_entertainment/default”, “arts_entertainment/aquarium” or “food/icecream”.) */
  readonly foursquare_type?: string;
  /** Optional. Google Places identifier of the venue */
  readonly google_place_id?: string;
  /** Optional. Google Places type of the venue. (See supported types.) */
  readonly google_place_type?: string;
  readonly [key: string]: unknown;
}
export const InputVenueMessageContent: Schema.Codec<InputVenueMessageContent> = Schema.StructWithRest(
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

/** This object contains basic information about an invoice. */
export interface Invoice {
  /** Product name */
  readonly title: string;
  /** Product description */
  readonly description: string;
  /** Unique bot deep-linking parameter that can be used to generate this invoice */
  readonly start_parameter: string;
  /** Three-letter ISO 4217 currency code, or “XTR” for payments in Telegram Stars */
  readonly currency: string;
  /** Total price in the smallest units of the currency (integer, not float/double). For example, for a price of US$ 1.45 pass amount = 145. See the exp parameter in currencies.json, it shows the number of digits past the decimal point for each currency (2 for the majority of currencies). */
  readonly total_amount: number;
  readonly [key: string]: unknown;
}
export const Invoice: Schema.Codec<Invoice> = Schema.StructWithRest(
  Schema.Struct({
    title: Schema.String,
    description: Schema.String,
    start_parameter: Schema.String,
    currency: Schema.String,
    total_amount: Schema.Int,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object represents one button of the reply keyboard. At most one of the fields other than text, icon_custom_emoji_id, and style must be used to specify the type of the button. For simple text buttons, String can be used instead of this object to specify the button text. */
export interface KeyboardButton {
  /** Text of the button. If none of the fields other than text, icon_custom_emoji_id, and style are used, it will be sent as a message when the button is pressed. */
  readonly text: string;
  /** Optional. Unique identifier of the custom emoji shown before the text of the button. Can only be used by bots that purchased additional usernames on Fragment or in the messages directly sent by the bot to private, group and supergroup chats if the owner of the bot has a Telegram Premium subscription. */
  readonly icon_custom_emoji_id?: string;
  /** Optional. Style of the button. Must be one of “danger” (red), “success” (green) or “primary” (blue). If omitted, then an app-specific style is used. */
  readonly style?: string;
  /** Optional. If specified, pressing the button will open a list of suitable users. Identifiers of selected users will be sent to the bot in a “users_shared” service message. Available in private chats only. */
  readonly request_users?: KeyboardButtonRequestUsers;
  /** Optional. If specified, pressing the button will open a list of suitable chats. Tapping on a chat will send its identifier to the bot in a “chat_shared” service message. Available in private chats only. */
  readonly request_chat?: KeyboardButtonRequestChat;
  /** Optional. If specified, pressing the button will ask the user to create and share a bot that will be managed by the current bot. Available for bots that enabled management of other bots in the @BotFather Mini App. Available in private chats only. */
  readonly request_managed_bot?: KeyboardButtonRequestManagedBot;
  /** Optional. If True, the user's phone number will be sent as a contact when the button is pressed. Available in private chats only. */
  readonly request_contact?: boolean;
  /** Optional. If True, the user's current location will be sent when the button is pressed. Available in private chats only. */
  readonly request_location?: boolean;
  /** Optional. If specified, the user will be asked to create a poll and send it to the bot when the button is pressed. Available in private chats only. */
  readonly request_poll?: KeyboardButtonPollType;
  /** Optional. If specified, the described Web App will be launched when the button is pressed. The Web App will be able to send a “web_app_data” service message. Available in private chats only. */
  readonly web_app?: WebAppInfo;
  readonly [key: string]: unknown;
}
export const KeyboardButton: Schema.Codec<KeyboardButton> = Schema.StructWithRest(
  Schema.Struct({
    text: Schema.String,
    icon_custom_emoji_id: Schema.optionalKey(Schema.String),
    style: Schema.optionalKey(Schema.String),
    request_users: Schema.optionalKey(Schema.suspend((): Schema.Codec<KeyboardButtonRequestUsers> => KeyboardButtonRequestUsers)),
    request_chat: Schema.optionalKey(Schema.suspend((): Schema.Codec<KeyboardButtonRequestChat> => KeyboardButtonRequestChat)),
    request_managed_bot: Schema.optionalKey(Schema.suspend((): Schema.Codec<KeyboardButtonRequestManagedBot> => KeyboardButtonRequestManagedBot)),
    request_contact: Schema.optionalKey(Schema.Boolean),
    request_location: Schema.optionalKey(Schema.Boolean),
    request_poll: Schema.optionalKey(Schema.suspend((): Schema.Codec<KeyboardButtonPollType> => KeyboardButtonPollType)),
    web_app: Schema.optionalKey(Schema.suspend((): Schema.Codec<WebAppInfo> => WebAppInfo)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object represents type of a poll, which is allowed to be created and sent when the corresponding button is pressed. */
export interface KeyboardButtonPollType {
  /** Optional. If quiz is passed, the user will be allowed to create only polls in the quiz mode. If regular is passed, only regular polls will be allowed. Otherwise, the user will be allowed to create a poll of any type. */
  readonly type?: string;
  readonly [key: string]: unknown;
}
export const KeyboardButtonPollType: Schema.Codec<KeyboardButtonPollType> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.optionalKey(Schema.String),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object defines the criteria used to request a suitable chat. Information about the selected chat will be shared with the bot when the corresponding button is pressed. The bot will be granted requested rights in the chat if appropriate. More about requesting chats ». */
export interface KeyboardButtonRequestChat {
  /** Signed 32-bit identifier of the request, which will be received back in the ChatShared object. Must be unique within the message. */
  readonly request_id: number;
  /** Pass True to request a channel chat, pass False to request a group or a supergroup chat */
  readonly chat_is_channel: boolean;
  /** Optional. Pass True to request a forum supergroup, pass False to request a non-forum chat. If not specified, no additional restrictions are applied. */
  readonly chat_is_forum?: boolean;
  /** Optional. Pass True to request a supergroup or a channel with a username, pass False to request a chat without a username. If not specified, no additional restrictions are applied. */
  readonly chat_has_username?: boolean;
  /** Optional. Pass True to request a chat owned by the user. Otherwise, no additional restrictions are applied. */
  readonly chat_is_created?: boolean;
  /** Optional. A JSON-serialized object listing the required administrator rights of the user in the chat. The rights must be a superset of bot_administrator_rights. If not specified, no additional restrictions are applied. */
  readonly user_administrator_rights?: ChatAdministratorRights;
  /** Optional. A JSON-serialized object listing the required administrator rights of the bot in the chat. The rights must be a subset of user_administrator_rights. If not specified, no additional restrictions are applied. */
  readonly bot_administrator_rights?: ChatAdministratorRights;
  /** Optional. Pass True to request a chat with the bot as a member. Otherwise, no additional restrictions are applied. */
  readonly bot_is_member?: boolean;
  /** Optional. Pass True to request the chat's title */
  readonly request_title?: boolean;
  /** Optional. Pass True to request the chat's username */
  readonly request_username?: boolean;
  /** Optional. Pass True to request the chat's photo */
  readonly request_photo?: boolean;
  readonly [key: string]: unknown;
}
export const KeyboardButtonRequestChat: Schema.Codec<KeyboardButtonRequestChat> = Schema.StructWithRest(
  Schema.Struct({
    request_id: Schema.Int,
    chat_is_channel: Schema.Boolean,
    chat_is_forum: Schema.optionalKey(Schema.Boolean),
    chat_has_username: Schema.optionalKey(Schema.Boolean),
    chat_is_created: Schema.optionalKey(Schema.Boolean),
    user_administrator_rights: Schema.optionalKey(Schema.suspend((): Schema.Codec<ChatAdministratorRights> => ChatAdministratorRights)),
    bot_administrator_rights: Schema.optionalKey(Schema.suspend((): Schema.Codec<ChatAdministratorRights> => ChatAdministratorRights)),
    bot_is_member: Schema.optionalKey(Schema.Boolean),
    request_title: Schema.optionalKey(Schema.Boolean),
    request_username: Schema.optionalKey(Schema.Boolean),
    request_photo: Schema.optionalKey(Schema.Boolean),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object defines the parameters for the creation of a managed bot. Information about the created bot will be shared with the bot using the update managed_bot and a Message with the field managed_bot_created. */
export interface KeyboardButtonRequestManagedBot {
  /** Signed 32-bit identifier of the request. Must be unique within the message. */
  readonly request_id: number;
  /** Optional. Suggested name for the bot */
  readonly suggested_name?: string;
  /** Optional. Suggested username for the bot */
  readonly suggested_username?: string;
  readonly [key: string]: unknown;
}
export const KeyboardButtonRequestManagedBot: Schema.Codec<KeyboardButtonRequestManagedBot> = Schema.StructWithRest(
  Schema.Struct({
    request_id: Schema.Int,
    suggested_name: Schema.optionalKey(Schema.String),
    suggested_username: Schema.optionalKey(Schema.String),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object defines the criteria used to request suitable users. Information about the selected users will be shared with the bot when the corresponding button is pressed. More about requesting users » */
export interface KeyboardButtonRequestUsers {
  /** Signed 32-bit identifier of the request that will be received back in the UsersShared object. Must be unique within the message. */
  readonly request_id: number;
  /** Optional. Pass True to request bots, pass False to request regular users. If not specified, no additional restrictions are applied. */
  readonly user_is_bot?: boolean;
  /** Optional. Pass True to request premium users, pass False to request non-premium users. If not specified, no additional restrictions are applied. */
  readonly user_is_premium?: boolean;
  /** Optional. The maximum number of users to be selected; 1-10. Defaults to 1. */
  readonly max_quantity?: number;
  /** Optional. Pass True to request the users' first and last names */
  readonly request_name?: boolean;
  /** Optional. Pass True to request the users' usernames */
  readonly request_username?: boolean;
  /** Optional. Pass True to request the users' photos */
  readonly request_photo?: boolean;
  readonly [key: string]: unknown;
}
export const KeyboardButtonRequestUsers: Schema.Codec<KeyboardButtonRequestUsers> = Schema.StructWithRest(
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

/** This object represents a portion of the price for goods or services. */
export interface LabeledPrice {
  /** Portion label */
  readonly label: string;
  /** Price of the product in the smallest units of the currency (integer, not float/double). For example, for a price of US$ 1.45 pass amount = 145. See the exp parameter in currencies.json, it shows the number of digits past the decimal point for each currency (2 for the majority of currencies). */
  readonly amount: number;
  readonly [key: string]: unknown;
}
export const LabeledPrice: Schema.Codec<LabeledPrice> = Schema.StructWithRest(
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
export const Link: Schema.Codec<Link> = Schema.StructWithRest(
  Schema.Struct({
    url: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Describes the options used for link preview generation. */
export interface LinkPreviewOptions {
  /** Optional. True, if the link preview is disabled */
  readonly is_disabled?: boolean;
  /** Optional. URL to use for the link preview. If empty, then the first URL found in the message text will be used. */
  readonly url?: string;
  /** Optional. True, if the media in the link preview is supposed to be shrunk; ignored if the URL isn't explicitly specified or media size change isn't supported for the preview */
  readonly prefer_small_media?: boolean;
  /** Optional. True, if the media in the link preview is supposed to be enlarged; ignored if the URL isn't explicitly specified or media size change isn't supported for the preview */
  readonly prefer_large_media?: boolean;
  /** Optional. True, if the link preview must be shown above the message text; otherwise, the link preview will be shown below the message text */
  readonly show_above_text?: boolean;
  readonly [key: string]: unknown;
}
export const LinkPreviewOptions: Schema.Codec<LinkPreviewOptions> = Schema.StructWithRest(
  Schema.Struct({
    is_disabled: Schema.optionalKey(Schema.Boolean),
    url: Schema.optionalKey(Schema.String),
    prefer_small_media: Schema.optionalKey(Schema.Boolean),
    prefer_large_media: Schema.optionalKey(Schema.Boolean),
    show_above_text: Schema.optionalKey(Schema.Boolean),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object represents a live photo. */
export interface LivePhoto {
  /** Optional. Available sizes of the corresponding static photo */
  readonly photo?: ReadonlyArray<PhotoSize>;
  /** Identifier for the video file which can be used to download or reuse the file */
  readonly file_id: string;
  /** Unique identifier for the video file which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file. */
  readonly file_unique_id: string;
  /** Video width as defined by the sender */
  readonly width: number;
  /** Video height as defined by the sender */
  readonly height: number;
  /** Duration of the video in seconds as defined by the sender */
  readonly duration: number;
  /** Optional. MIME type of the file as defined by the sender */
  readonly mime_type?: string;
  /** Optional. File size in bytes. It can be bigger than 2^31 and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a signed 64-bit integer or double-precision float type are safe for storing this value. */
  readonly file_size?: number;
  readonly [key: string]: unknown;
}
export const LivePhoto: Schema.Codec<LivePhoto> = Schema.StructWithRest(
  Schema.Struct({
    photo: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<PhotoSize> => PhotoSize))),
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

/** This object represents a point on the map. */
export interface Location {
  /** Latitude as defined by the sender */
  readonly latitude: number;
  /** Longitude as defined by the sender */
  readonly longitude: number;
  /** Optional. The radius of uncertainty for the location, measured in meters; 0-1500 */
  readonly horizontal_accuracy?: number;
  /** Optional. Time relative to the message sending date, during which the location can be updated; in seconds. For active live locations only. */
  readonly live_period?: number;
  /** Optional. The direction in which user is moving, in degrees; 1-360. For active live locations only. */
  readonly heading?: number;
  /** Optional. The maximum distance for proximity alerts about approaching another chat member, in meters. For sent live locations only. */
  readonly proximity_alert_radius?: number;
  readonly [key: string]: unknown;
}
export const Location: Schema.Codec<Location> = Schema.StructWithRest(
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

/** Describes the physical address of a location. */
export interface LocationAddress {
  /** The two-letter ISO 3166-1 alpha-2 country code of the country where the location is located */
  readonly country_code: string;
  /** Optional. State of the location */
  readonly state?: string;
  /** Optional. City of the location */
  readonly city?: string;
  /** Optional. Street address of the location */
  readonly street?: string;
  readonly [key: string]: unknown;
}
export const LocationAddress: Schema.Codec<LocationAddress> = Schema.StructWithRest(
  Schema.Struct({
    country_code: Schema.String,
    state: Schema.optionalKey(Schema.String),
    city: Schema.optionalKey(Schema.String),
    street: Schema.optionalKey(Schema.String),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object represents a parameter of the inline keyboard button used to automatically authorize a user. It serves as a great replacement for the Telegram Login Widget when the user is coming from Telegram. All the user needs to do is tap/click a button and confirm that they want to log in: */
export interface LoginUrl {
  /** An HTTPS URL to be opened with user authorization data added to the query string when the button is pressed. If the user refuses to provide authorization data, the original URL without information about the user will be opened. The data added is the same as described in Receiving authorization data.

NOTE: You must always check the hash of the received data to verify the authentication and the integrity of the data as described in Checking authorization. */
  readonly url: string;
  /** Optional. New text of the button in forwarded messages */
  readonly forward_text?: string;
  /** Optional. Username of a bot, which will be used for user authorization; not supported in RichMessageButton. See Setting up a bot for more details. If not specified, the current bot's username will be assumed. The url's domain must be the same as the domain linked with the bot. See Linking your domain to the bot for more details. */
  readonly bot_username?: string;
  /** Optional. Pass True to request the permission for your bot to send messages to the user */
  readonly request_write_access?: boolean;
  readonly [key: string]: unknown;
}
export const LoginUrl: Schema.Codec<LoginUrl> = Schema.StructWithRest(
  Schema.Struct({
    url: Schema.String,
    forward_text: Schema.optionalKey(Schema.String),
    bot_username: Schema.optionalKey(Schema.String),
    request_write_access: Schema.optionalKey(Schema.Boolean),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object contains information about the bot that was created to be managed by the current bot. */
export interface ManagedBotCreated {
  /** Information about the bot. The bot's token can be fetched using the method getManagedBotToken. */
  readonly bot: User;
  readonly [key: string]: unknown;
}
export const ManagedBotCreated: Schema.Codec<ManagedBotCreated> = Schema.StructWithRest(
  Schema.Struct({
    bot: Schema.suspend((): Schema.Codec<User> => User),
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
export const ManagedBotUpdated: Schema.Codec<ManagedBotUpdated> = Schema.StructWithRest(
  Schema.Struct({
    user: Schema.suspend((): Schema.Codec<User> => User),
    bot: Schema.suspend((): Schema.Codec<User> => User),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object describes the position on faces where a mask should be placed by default. */
export interface MaskPosition {
  /** The part of the face relative to which the mask should be placed. One of “forehead”, “eyes”, “mouth”, or “chin”. */
  readonly point: MaskPositionPoint;
  /** Shift by X-axis measured in widths of the mask scaled to the face size, from left to right. For example, choosing -1.0 will place mask just to the left of the default mask position. */
  readonly x_shift: number;
  /** Shift by Y-axis measured in heights of the mask scaled to the face size, from top to bottom. For example, 1.0 will place the mask just below the default mask position. */
  readonly y_shift: number;
  /** Mask scaling coefficient. For example, 2.0 means double size. */
  readonly scale: number;
  readonly [key: string]: unknown;
}
export const MaskPosition: Schema.Codec<MaskPosition> = Schema.StructWithRest(
  Schema.Struct({
    point: Schema.suspend((): Schema.Codec<MaskPositionPoint> => MaskPositionPoint),
    x_shift: Schema.Number,
    y_shift: Schema.Number,
    scale: Schema.Number,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object describes a message that can be inaccessible to the bot. It can be one of */
export type MaybeInaccessibleMessage = Message | InaccessibleMessage;
export const MaybeInaccessibleMessage: Schema.Codec<MaybeInaccessibleMessage> = Schema.Union([Schema.suspend((): Schema.Codec<Message> => Message), Schema.suspend((): Schema.Codec<InaccessibleMessage> => InaccessibleMessage)]);

/** This object describes the bot's menu button in a private chat. It should be one of */
export type MenuButton = MenuButtonCommands | MenuButtonWebApp | MenuButtonDefault;
export const MenuButton: Schema.Codec<MenuButton> = Schema.Union([Schema.suspend((): Schema.Codec<MenuButtonCommands> => MenuButtonCommands), Schema.suspend((): Schema.Codec<MenuButtonWebApp> => MenuButtonWebApp), Schema.suspend((): Schema.Codec<MenuButtonDefault> => MenuButtonDefault)]);

/** Represents a menu button, which opens the bot's list of commands. */
export interface MenuButtonCommands {
  /** Type of the button, must be commands */
  readonly type: string;
  readonly [key: string]: unknown;
}
export const MenuButtonCommands: Schema.Codec<MenuButtonCommands> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Describes that no specific value for the menu button was set. */
export interface MenuButtonDefault {
  /** Type of the button, must be default */
  readonly type: string;
  readonly [key: string]: unknown;
}
export const MenuButtonDefault: Schema.Codec<MenuButtonDefault> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Represents a menu button, which launches a Web App. */
export interface MenuButtonWebApp {
  /** Type of the button, must be web_app */
  readonly type: string;
  /** Text on the button */
  readonly text: string;
  /** Description of the Web App that will be launched when the user presses the button. The Web App will be able to send an arbitrary message on behalf of the user using the method answerWebAppQuery. Alternatively, a t.me link to a Web App of the bot can be specified in the object instead of the Web App's URL, in which case the Web App will be opened as if the user pressed the link. */
  readonly web_app: WebAppInfo;
  readonly [key: string]: unknown;
}
export const MenuButtonWebApp: Schema.Codec<MenuButtonWebApp> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    text: Schema.String,
    web_app: Schema.suspend((): Schema.Codec<WebAppInfo> => WebAppInfo),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object represents a message. */
export interface Message {
  /** Unique message identifier inside this chat; 0 for ephemeral messages. In specific instances (e.g., a message containing a video sent to a big chat), the server might automatically schedule a message instead of sending it immediately. In such cases, this field will be 0 and the relevant message will be unusable until it is actually sent. */
  readonly message_id: number;
  /** Optional. Unique identifier of a message thread or forum topic to which the message belongs; for supergroups and private chats only */
  readonly message_thread_id?: number;
  /** Optional. Information about the direct messages chat topic that contains the message */
  readonly direct_messages_topic?: DirectMessagesTopic;
  /** Optional. Sender of the message; may be empty for messages sent to channels. For backward compatibility, if the message was sent on behalf of a chat, the field contains a fake sender user in non-channel chats. */
  readonly from?: User;
  /** Optional. Sender of the message when sent on behalf of a chat. For example, the supergroup itself for messages sent by its anonymous administrators or a linked channel for messages automatically forwarded to the channel's discussion group. For backward compatibility, if the message was sent on behalf of a chat, the field from contains a fake sender user in non-channel chats. */
  readonly sender_chat?: Chat;
  /** Optional. If the sender of the message boosted the chat, the number of boosts added by the user */
  readonly sender_boost_count?: number;
  /** Optional. The bot that actually sent the message on behalf of the business account. Available only for outgoing messages sent on behalf of the connected business account. */
  readonly sender_business_bot?: User;
  /** Optional. Tag or custom title of the sender of the message; for supergroups only */
  readonly sender_tag?: string;
  /** Optional. For ephemeral messages, the user who received the message */
  readonly receiver_user?: User;
  /** Optional. For ephemeral messages, identifier of the ephemeral message inside this chat. The identifier may be reused for another ephemeral message after the message is deleted or expires. */
  readonly ephemeral_message_id?: number;
  /** Date the message was sent in Unix time. It is always a positive number, representing a valid date. */
  readonly date: number;
  /** Optional. The unique identifier for the guest query. Use this identifier with the method answerGuestQuery to send a response message. If non-empty, the message belongs to the chat where the guest bot was summoned, which may not coincide with other existing bot chats sharing the same identifier. */
  readonly guest_query_id?: string;
  /** Optional. Unique identifier of the business connection from which the message was received. If non-empty, the message belongs to a chat of the corresponding business account that is independent from any potential bot chat which might share the same identifier. */
  readonly business_connection_id?: string;
  /** Chat the message belongs to */
  readonly chat: Chat;
  /** Optional. Information about the original message for forwarded messages */
  readonly forward_origin?: MessageOrigin;
  /** Optional. True, if the message is sent to a topic in a forum supergroup or a private chat with the bot */
  readonly is_topic_message?: true;
  /** Optional. True, if the message is a channel post that was automatically forwarded to the connected discussion group */
  readonly is_automatic_forward?: true;
  /** Optional. For replies in the same chat and message thread, the original message. Note that the Message object in this field will not contain further reply_to_message fields even if it itself is a reply. If the message is a reply to an ephemeral message, then this field may be omitted. */
  readonly reply_to_message?: Message;
  /** Optional. Information about the message that is being replied to, which may come from another chat or forum topic */
  readonly external_reply?: ExternalReplyInfo;
  /** Optional. For replies that quote part of the original message, the quoted part of the message */
  readonly quote?: TextQuote;
  /** Optional. For replies to a story, the original story */
  readonly reply_to_story?: Story;
  /** Optional. Identifier of the specific checklist task that is being replied to */
  readonly reply_to_checklist_task_id?: number;
  /** Optional. Persistent identifier of the specific poll option that is being replied to */
  readonly reply_to_poll_option_id?: string;
  /** Optional. Bot through which the message was sent */
  readonly via_bot?: User;
  /** Optional. For a message sent by a guest bot, this is the user whose original message triggered the bot's response */
  readonly guest_bot_caller_user?: User;
  /** Optional. For a message sent by a guest bot, this is the chat whose original message triggered the bot's response */
  readonly guest_bot_caller_chat?: Chat;
  /** Optional. Date the message was last edited in Unix time */
  readonly edit_date?: number;
  /** Optional. True, if the message can't be forwarded */
  readonly has_protected_content?: true;
  /** Optional. True, if the message was sent by an implicit action, for example, as an away or a greeting business message, or as a scheduled message */
  readonly is_from_offline?: true;
  /** Optional. True, if the message is a paid post. Note that such posts must not be deleted for 24 hours to receive the payment and can't be edited. */
  readonly is_paid_post?: true;
  /** Optional. The unique identifier inside this chat of a media message group this message belongs to */
  readonly media_group_id?: string;
  /** Optional. Signature of the post author for messages in channels, or the custom title of an anonymous group administrator */
  readonly author_signature?: string;
  /** Optional. The number of Telegram Stars that were paid by the sender of the message to send it */
  readonly paid_star_count?: number;
  /** Optional. For text messages, the actual UTF-8 text of the message */
  readonly text?: string;
  /** Optional. For text messages, special entities like usernames, URLs, bot commands, etc. that appear in the text */
  readonly entities?: ReadonlyArray<MessageEntity>;
  /** Optional. Options used for link preview generation for the message, if it is a text message and link preview options were changed */
  readonly link_preview_options?: LinkPreviewOptions;
  /** Optional. Information about suggested post parameters if the message is a suggested post in a channel direct messages chat. If the message is an approved or declined suggested post, then it can't be edited. */
  readonly suggested_post_info?: SuggestedPostInfo;
  /** Optional. Unique identifier of the message effect added to the message */
  readonly effect_id?: string;
  /** Optional. Message is a rich formatted message */
  readonly rich_message?: RichMessage;
  /** Optional. Message is an animation, information about the animation. For backward compatibility, when this field is set, the document field will also be set. */
  readonly animation?: Animation;
  /** Optional. Message is an audio file, information about the file */
  readonly audio?: Audio;
  /** Optional. Message is a general file, information about the file */
  readonly document?: Document;
  /** Optional. Message is a live photo, information about the live photo. For backward compatibility, when this field is set, the photo field will also be set. */
  readonly live_photo?: LivePhoto;
  /** Optional. Message contains paid media; information about the paid media */
  readonly paid_media?: PaidMediaInfo;
  /** Optional. Message is a photo, available sizes of the photo */
  readonly photo?: ReadonlyArray<PhotoSize>;
  /** Optional. Message is a sticker, information about the sticker */
  readonly sticker?: Sticker;
  /** Optional. Message is a forwarded story */
  readonly story?: Story;
  /** Optional. Message is a video, information about the video */
  readonly video?: Video;
  /** Optional. Message is a video note, information about the video message */
  readonly video_note?: VideoNote;
  /** Optional. Message is a voice message, information about the file */
  readonly voice?: Voice;
  /** Optional. Caption for the animation, audio, document, paid media, photo, video or voice */
  readonly caption?: string;
  /** Optional. For messages with a caption, special entities like usernames, URLs, bot commands, etc. that appear in the caption */
  readonly caption_entities?: ReadonlyArray<MessageEntity>;
  /** Optional. True, if the caption must be shown above the message media */
  readonly show_caption_above_media?: true;
  /** Optional. True, if the message media is covered by a spoiler animation */
  readonly has_media_spoiler?: true;
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
  readonly new_chat_members?: ReadonlyArray<User>;
  /** Optional. A member was removed from the group, information about them (this member may be the bot itself) */
  readonly left_chat_member?: User;
  /** Optional. Service message: chat owner has left */
  readonly chat_owner_left?: ChatOwnerLeft;
  /** Optional. Service message: chat owner has changed */
  readonly chat_owner_changed?: ChatOwnerChanged;
  /** Optional. A chat title was changed to this value */
  readonly new_chat_title?: string;
  /** Optional. A chat photo was change to this value */
  readonly new_chat_photo?: ReadonlyArray<PhotoSize>;
  /** Optional. Service message: the chat photo was deleted */
  readonly delete_chat_photo?: true;
  /** Optional. Service message: the group has been created */
  readonly group_chat_created?: true;
  /** Optional. Service message: the supergroup has been created. This field can't be received in a message coming through updates, because bot can't be a member of a supergroup when it is created. It can only be found in reply_to_message if someone replies to a very first message in a directly created supergroup. */
  readonly supergroup_chat_created?: true;
  /** Optional. Service message: the channel has been created. This field can't be received in a message coming through updates, because bot can't be a member of a channel when it is created. It can only be found in reply_to_message if someone replies to a very first message in a channel. */
  readonly channel_chat_created?: true;
  /** Optional. Service message: auto-delete timer settings changed in the chat */
  readonly message_auto_delete_timer_changed?: MessageAutoDeleteTimerChanged;
  /** Optional. The group has been migrated to a supergroup with the specified identifier. This number may have more than 32 significant bits and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a signed 64-bit integer or double-precision float type are safe for storing this identifier. */
  readonly migrate_to_chat_id?: number;
  /** Optional. The supergroup has been migrated from a group with the specified identifier. This number may have more than 32 significant bits and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a signed 64-bit integer or double-precision float type are safe for storing this identifier. */
  readonly migrate_from_chat_id?: number;
  /** Optional. Specified message was pinned. Note that the Message object in this field will not contain further reply_to_message fields even if it itself is a reply. */
  readonly pinned_message?: MaybeInaccessibleMessage;
  /** Optional. Message is an invoice for a payment, information about the invoice. More about payments » */
  readonly invoice?: Invoice;
  /** Optional. Message is a service message about a successful payment, information about the payment. More about payments » */
  readonly successful_payment?: SuccessfulPayment;
  /** Optional. Message is a service message about a refunded payment, information about the payment. More about payments » */
  readonly refunded_payment?: RefundedPayment;
  /** Optional. Service message: users were shared with the bot */
  readonly users_shared?: UsersShared;
  /** Optional. Service message: a chat was shared with the bot */
  readonly chat_shared?: ChatShared;
  /** Optional. Service message: a regular gift was sent or received */
  readonly gift?: GiftInfo;
  /** Optional. Service message: a unique gift was sent or received */
  readonly unique_gift?: UniqueGiftInfo;
  /** Optional. Service message: upgrade of a gift was purchased after the gift was sent */
  readonly gift_upgrade_sent?: GiftInfo;
  /** Optional. The domain name of the website on which the user has logged in. More about Telegram Login » */
  readonly connected_website?: string;
  /** Optional. Service message: the user allowed the bot to write messages after adding it to the attachment or side menu, launching a Web App from a link, or accepting an explicit request from a Web App sent by the method requestWriteAccess */
  readonly write_access_allowed?: WriteAccessAllowed;
  /** Optional. Telegram Passport data */
  readonly passport_data?: PassportData;
  /** Optional. Service message: a user in the chat triggered another user's proximity alert while sharing Live Location */
  readonly proximity_alert_triggered?: ProximityAlertTriggered;
  /** Optional. Service message: user boosted the chat */
  readonly boost_added?: ChatBoostAdded;
  /** Optional. Service message: chat background set */
  readonly chat_background_set?: ChatBackground;
  /** Optional. Service message: some tasks in a checklist were marked as done or not done */
  readonly checklist_tasks_done?: ChecklistTasksDone;
  /** Optional. Service message: tasks were added to a checklist */
  readonly checklist_tasks_added?: ChecklistTasksAdded;
  /** Optional. Service message: chat or bot added to a Community */
  readonly community_chat_added?: CommunityChatAdded;
  /** Optional. Service message: chat was joined by a user from a Community */
  readonly community_chat_joined?: CommunityChatJoined;
  /** Optional. Service message: chat or bot removed from a Community */
  readonly community_chat_removed?: CommunityChatRemoved;
  /** Optional. Service message: the price for paid messages in the corresponding direct messages chat of a channel has changed */
  readonly direct_message_price_changed?: DirectMessagePriceChanged;
  /** Optional. Service message: forum topic created */
  readonly forum_topic_created?: ForumTopicCreated;
  /** Optional. Service message: forum topic edited */
  readonly forum_topic_edited?: ForumTopicEdited;
  /** Optional. Service message: forum topic closed */
  readonly forum_topic_closed?: ForumTopicClosed;
  /** Optional. Service message: forum topic reopened */
  readonly forum_topic_reopened?: ForumTopicReopened;
  /** Optional. Service message: the 'General' forum topic hidden */
  readonly general_forum_topic_hidden?: GeneralForumTopicHidden;
  /** Optional. Service message: the 'General' forum topic unhidden */
  readonly general_forum_topic_unhidden?: GeneralForumTopicUnhidden;
  /** Optional. Service message: a scheduled giveaway was created */
  readonly giveaway_created?: GiveawayCreated;
  /** Optional. The message is a scheduled giveaway message */
  readonly giveaway?: Giveaway;
  /** Optional. A giveaway with public winners was completed */
  readonly giveaway_winners?: GiveawayWinners;
  /** Optional. Service message: a giveaway without public winners was completed */
  readonly giveaway_completed?: GiveawayCompleted;
  /** Optional. Service message: user created a bot that will be managed by the current bot */
  readonly managed_bot_created?: ManagedBotCreated;
  /** Optional. Service message: the price for paid messages has changed in the chat */
  readonly paid_message_price_changed?: PaidMessagePriceChanged;
  /** Optional. Service message: answer option was added to a poll */
  readonly poll_option_added?: PollOptionAdded;
  /** Optional. Service message: answer option was deleted from a poll */
  readonly poll_option_deleted?: PollOptionDeleted;
  /** Optional. Service message: a suggested post was approved */
  readonly suggested_post_approved?: SuggestedPostApproved;
  /** Optional. Service message: approval of a suggested post has failed */
  readonly suggested_post_approval_failed?: SuggestedPostApprovalFailed;
  /** Optional. Service message: a suggested post was declined */
  readonly suggested_post_declined?: SuggestedPostDeclined;
  /** Optional. Service message: payment for a suggested post was received */
  readonly suggested_post_paid?: SuggestedPostPaid;
  /** Optional. Service message: payment for a suggested post was refunded */
  readonly suggested_post_refunded?: SuggestedPostRefunded;
  /** Optional. Service message: video chat scheduled */
  readonly video_chat_scheduled?: VideoChatScheduled;
  /** Optional. Service message: video chat started */
  readonly video_chat_started?: VideoChatStarted;
  /** Optional. Service message: video chat ended */
  readonly video_chat_ended?: VideoChatEnded;
  /** Optional. Service message: new participants invited to a video chat */
  readonly video_chat_participants_invited?: VideoChatParticipantsInvited;
  /** Optional. Service message: data sent by a Web App */
  readonly web_app_data?: WebAppData;
  /** Optional. Inline keyboard attached to the message. login_url buttons are represented as ordinary url buttons. */
  readonly reply_markup?: InlineKeyboardMarkup;
  readonly [key: string]: unknown;
}
export const Message: Schema.Codec<Message> = Schema.StructWithRest(
  Schema.Struct({
    message_id: Schema.Int,
    message_thread_id: Schema.optionalKey(Schema.Int),
    direct_messages_topic: Schema.optionalKey(Schema.suspend((): Schema.Codec<DirectMessagesTopic> => DirectMessagesTopic)),
    from: Schema.optionalKey(Schema.suspend((): Schema.Codec<User> => User)),
    sender_chat: Schema.optionalKey(Schema.suspend((): Schema.Codec<Chat> => Chat)),
    sender_boost_count: Schema.optionalKey(Schema.Int),
    sender_business_bot: Schema.optionalKey(Schema.suspend((): Schema.Codec<User> => User)),
    sender_tag: Schema.optionalKey(Schema.String),
    receiver_user: Schema.optionalKey(Schema.suspend((): Schema.Codec<User> => User)),
    ephemeral_message_id: Schema.optionalKey(Schema.Int),
    date: Schema.Int,
    guest_query_id: Schema.optionalKey(Schema.String),
    business_connection_id: Schema.optionalKey(Schema.String),
    chat: Schema.suspend((): Schema.Codec<Chat> => Chat),
    forward_origin: Schema.optionalKey(Schema.suspend((): Schema.Codec<MessageOrigin> => MessageOrigin)),
    is_topic_message: Schema.optionalKey(Schema.Literal(true)),
    is_automatic_forward: Schema.optionalKey(Schema.Literal(true)),
    reply_to_message: Schema.optionalKey(Schema.suspend((): Schema.Codec<Message> => Message)),
    external_reply: Schema.optionalKey(Schema.suspend((): Schema.Codec<ExternalReplyInfo> => ExternalReplyInfo)),
    quote: Schema.optionalKey(Schema.suspend((): Schema.Codec<TextQuote> => TextQuote)),
    reply_to_story: Schema.optionalKey(Schema.suspend((): Schema.Codec<Story> => Story)),
    reply_to_checklist_task_id: Schema.optionalKey(Schema.Int),
    reply_to_poll_option_id: Schema.optionalKey(Schema.String),
    via_bot: Schema.optionalKey(Schema.suspend((): Schema.Codec<User> => User)),
    guest_bot_caller_user: Schema.optionalKey(Schema.suspend((): Schema.Codec<User> => User)),
    guest_bot_caller_chat: Schema.optionalKey(Schema.suspend((): Schema.Codec<Chat> => Chat)),
    edit_date: Schema.optionalKey(Schema.Int),
    has_protected_content: Schema.optionalKey(Schema.Literal(true)),
    is_from_offline: Schema.optionalKey(Schema.Literal(true)),
    is_paid_post: Schema.optionalKey(Schema.Literal(true)),
    media_group_id: Schema.optionalKey(Schema.String),
    author_signature: Schema.optionalKey(Schema.String),
    paid_star_count: Schema.optionalKey(Schema.Int),
    text: Schema.optionalKey(Schema.String),
    entities: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<MessageEntity> => MessageEntity))),
    link_preview_options: Schema.optionalKey(Schema.suspend((): Schema.Codec<LinkPreviewOptions> => LinkPreviewOptions)),
    suggested_post_info: Schema.optionalKey(Schema.suspend((): Schema.Codec<SuggestedPostInfo> => SuggestedPostInfo)),
    effect_id: Schema.optionalKey(Schema.String),
    rich_message: Schema.optionalKey(Schema.suspend((): Schema.Codec<RichMessage> => RichMessage)),
    animation: Schema.optionalKey(Schema.suspend((): Schema.Codec<Animation> => Animation)),
    audio: Schema.optionalKey(Schema.suspend((): Schema.Codec<Audio> => Audio)),
    document: Schema.optionalKey(Schema.suspend((): Schema.Codec<Document> => Document)),
    live_photo: Schema.optionalKey(Schema.suspend((): Schema.Codec<LivePhoto> => LivePhoto)),
    paid_media: Schema.optionalKey(Schema.suspend((): Schema.Codec<PaidMediaInfo> => PaidMediaInfo)),
    photo: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<PhotoSize> => PhotoSize))),
    sticker: Schema.optionalKey(Schema.suspend((): Schema.Codec<Sticker> => Sticker)),
    story: Schema.optionalKey(Schema.suspend((): Schema.Codec<Story> => Story)),
    video: Schema.optionalKey(Schema.suspend((): Schema.Codec<Video> => Video)),
    video_note: Schema.optionalKey(Schema.suspend((): Schema.Codec<VideoNote> => VideoNote)),
    voice: Schema.optionalKey(Schema.suspend((): Schema.Codec<Voice> => Voice)),
    caption: Schema.optionalKey(Schema.String),
    caption_entities: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<MessageEntity> => MessageEntity))),
    show_caption_above_media: Schema.optionalKey(Schema.Literal(true)),
    has_media_spoiler: Schema.optionalKey(Schema.Literal(true)),
    checklist: Schema.optionalKey(Schema.suspend((): Schema.Codec<Checklist> => Checklist)),
    contact: Schema.optionalKey(Schema.suspend((): Schema.Codec<Contact> => Contact)),
    dice: Schema.optionalKey(Schema.suspend((): Schema.Codec<Dice> => Dice)),
    game: Schema.optionalKey(Schema.suspend((): Schema.Codec<Game> => Game)),
    poll: Schema.optionalKey(Schema.suspend((): Schema.Codec<Poll> => Poll)),
    venue: Schema.optionalKey(Schema.suspend((): Schema.Codec<Venue> => Venue)),
    location: Schema.optionalKey(Schema.suspend((): Schema.Codec<Location> => Location)),
    new_chat_members: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<User> => User))),
    left_chat_member: Schema.optionalKey(Schema.suspend((): Schema.Codec<User> => User)),
    chat_owner_left: Schema.optionalKey(Schema.suspend((): Schema.Codec<ChatOwnerLeft> => ChatOwnerLeft)),
    chat_owner_changed: Schema.optionalKey(Schema.suspend((): Schema.Codec<ChatOwnerChanged> => ChatOwnerChanged)),
    new_chat_title: Schema.optionalKey(Schema.String),
    new_chat_photo: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<PhotoSize> => PhotoSize))),
    delete_chat_photo: Schema.optionalKey(Schema.Literal(true)),
    group_chat_created: Schema.optionalKey(Schema.Literal(true)),
    supergroup_chat_created: Schema.optionalKey(Schema.Literal(true)),
    channel_chat_created: Schema.optionalKey(Schema.Literal(true)),
    message_auto_delete_timer_changed: Schema.optionalKey(Schema.suspend((): Schema.Codec<MessageAutoDeleteTimerChanged> => MessageAutoDeleteTimerChanged)),
    migrate_to_chat_id: Schema.optionalKey(Schema.Int),
    migrate_from_chat_id: Schema.optionalKey(Schema.Int),
    pinned_message: Schema.optionalKey(Schema.suspend((): Schema.Codec<MaybeInaccessibleMessage> => MaybeInaccessibleMessage)),
    invoice: Schema.optionalKey(Schema.suspend((): Schema.Codec<Invoice> => Invoice)),
    successful_payment: Schema.optionalKey(Schema.suspend((): Schema.Codec<SuccessfulPayment> => SuccessfulPayment)),
    refunded_payment: Schema.optionalKey(Schema.suspend((): Schema.Codec<RefundedPayment> => RefundedPayment)),
    users_shared: Schema.optionalKey(Schema.suspend((): Schema.Codec<UsersShared> => UsersShared)),
    chat_shared: Schema.optionalKey(Schema.suspend((): Schema.Codec<ChatShared> => ChatShared)),
    gift: Schema.optionalKey(Schema.suspend((): Schema.Codec<GiftInfo> => GiftInfo)),
    unique_gift: Schema.optionalKey(Schema.suspend((): Schema.Codec<UniqueGiftInfo> => UniqueGiftInfo)),
    gift_upgrade_sent: Schema.optionalKey(Schema.suspend((): Schema.Codec<GiftInfo> => GiftInfo)),
    connected_website: Schema.optionalKey(Schema.String),
    write_access_allowed: Schema.optionalKey(Schema.suspend((): Schema.Codec<WriteAccessAllowed> => WriteAccessAllowed)),
    passport_data: Schema.optionalKey(Schema.suspend((): Schema.Codec<PassportData> => PassportData)),
    proximity_alert_triggered: Schema.optionalKey(Schema.suspend((): Schema.Codec<ProximityAlertTriggered> => ProximityAlertTriggered)),
    boost_added: Schema.optionalKey(Schema.suspend((): Schema.Codec<ChatBoostAdded> => ChatBoostAdded)),
    chat_background_set: Schema.optionalKey(Schema.suspend((): Schema.Codec<ChatBackground> => ChatBackground)),
    checklist_tasks_done: Schema.optionalKey(Schema.suspend((): Schema.Codec<ChecklistTasksDone> => ChecklistTasksDone)),
    checklist_tasks_added: Schema.optionalKey(Schema.suspend((): Schema.Codec<ChecklistTasksAdded> => ChecklistTasksAdded)),
    community_chat_added: Schema.optionalKey(Schema.suspend((): Schema.Codec<CommunityChatAdded> => CommunityChatAdded)),
    community_chat_joined: Schema.optionalKey(Schema.suspend((): Schema.Codec<CommunityChatJoined> => CommunityChatJoined)),
    community_chat_removed: Schema.optionalKey(Schema.suspend((): Schema.Codec<CommunityChatRemoved> => CommunityChatRemoved)),
    direct_message_price_changed: Schema.optionalKey(Schema.suspend((): Schema.Codec<DirectMessagePriceChanged> => DirectMessagePriceChanged)),
    forum_topic_created: Schema.optionalKey(Schema.suspend((): Schema.Codec<ForumTopicCreated> => ForumTopicCreated)),
    forum_topic_edited: Schema.optionalKey(Schema.suspend((): Schema.Codec<ForumTopicEdited> => ForumTopicEdited)),
    forum_topic_closed: Schema.optionalKey(Schema.suspend((): Schema.Codec<ForumTopicClosed> => ForumTopicClosed)),
    forum_topic_reopened: Schema.optionalKey(Schema.suspend((): Schema.Codec<ForumTopicReopened> => ForumTopicReopened)),
    general_forum_topic_hidden: Schema.optionalKey(Schema.suspend((): Schema.Codec<GeneralForumTopicHidden> => GeneralForumTopicHidden)),
    general_forum_topic_unhidden: Schema.optionalKey(Schema.suspend((): Schema.Codec<GeneralForumTopicUnhidden> => GeneralForumTopicUnhidden)),
    giveaway_created: Schema.optionalKey(Schema.suspend((): Schema.Codec<GiveawayCreated> => GiveawayCreated)),
    giveaway: Schema.optionalKey(Schema.suspend((): Schema.Codec<Giveaway> => Giveaway)),
    giveaway_winners: Schema.optionalKey(Schema.suspend((): Schema.Codec<GiveawayWinners> => GiveawayWinners)),
    giveaway_completed: Schema.optionalKey(Schema.suspend((): Schema.Codec<GiveawayCompleted> => GiveawayCompleted)),
    managed_bot_created: Schema.optionalKey(Schema.suspend((): Schema.Codec<ManagedBotCreated> => ManagedBotCreated)),
    paid_message_price_changed: Schema.optionalKey(Schema.suspend((): Schema.Codec<PaidMessagePriceChanged> => PaidMessagePriceChanged)),
    poll_option_added: Schema.optionalKey(Schema.suspend((): Schema.Codec<PollOptionAdded> => PollOptionAdded)),
    poll_option_deleted: Schema.optionalKey(Schema.suspend((): Schema.Codec<PollOptionDeleted> => PollOptionDeleted)),
    suggested_post_approved: Schema.optionalKey(Schema.suspend((): Schema.Codec<SuggestedPostApproved> => SuggestedPostApproved)),
    suggested_post_approval_failed: Schema.optionalKey(Schema.suspend((): Schema.Codec<SuggestedPostApprovalFailed> => SuggestedPostApprovalFailed)),
    suggested_post_declined: Schema.optionalKey(Schema.suspend((): Schema.Codec<SuggestedPostDeclined> => SuggestedPostDeclined)),
    suggested_post_paid: Schema.optionalKey(Schema.suspend((): Schema.Codec<SuggestedPostPaid> => SuggestedPostPaid)),
    suggested_post_refunded: Schema.optionalKey(Schema.suspend((): Schema.Codec<SuggestedPostRefunded> => SuggestedPostRefunded)),
    video_chat_scheduled: Schema.optionalKey(Schema.suspend((): Schema.Codec<VideoChatScheduled> => VideoChatScheduled)),
    video_chat_started: Schema.optionalKey(Schema.suspend((): Schema.Codec<VideoChatStarted> => VideoChatStarted)),
    video_chat_ended: Schema.optionalKey(Schema.suspend((): Schema.Codec<VideoChatEnded> => VideoChatEnded)),
    video_chat_participants_invited: Schema.optionalKey(Schema.suspend((): Schema.Codec<VideoChatParticipantsInvited> => VideoChatParticipantsInvited)),
    web_app_data: Schema.optionalKey(Schema.suspend((): Schema.Codec<WebAppData> => WebAppData)),
    reply_markup: Schema.optionalKey(Schema.suspend((): Schema.Codec<InlineKeyboardMarkup> => InlineKeyboardMarkup)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object represents a service message about a change in auto-delete timer settings. */
export interface MessageAutoDeleteTimerChanged {
  /** New auto-delete time for messages in the chat; in seconds */
  readonly message_auto_delete_time: number;
  readonly [key: string]: unknown;
}
export const MessageAutoDeleteTimerChanged: Schema.Codec<MessageAutoDeleteTimerChanged> = Schema.StructWithRest(
  Schema.Struct({
    message_auto_delete_time: Schema.Int,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
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
  readonly custom_emoji_id?: string;
  /** Optional. For “date_time” only, the Unix time associated with the entity */
  readonly unix_time?: number;
  /** Optional. For “date_time” only, the string that defines the formatting of the date and time. See date-time entity formatting for more details. */
  readonly date_time_format?: string;
  readonly [key: string]: unknown;
}
export const MessageEntity: Schema.Codec<MessageEntity> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.suspend((): Schema.Codec<MessageEntityType> => MessageEntityType),
    offset: Schema.Int,
    length: Schema.Int,
    url: Schema.optionalKey(Schema.String),
    user: Schema.optionalKey(Schema.suspend((): Schema.Codec<User> => User)),
    language: Schema.optionalKey(Schema.String),
    custom_emoji_id: Schema.optionalKey(Schema.String),
    unix_time: Schema.optionalKey(Schema.Int),
    date_time_format: Schema.optionalKey(Schema.String),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object describes an update about a user stopping message generation. */
export interface MessageGenerationStopped {
  /** Chat in which the message is generated */
  readonly chat: Chat;
  /** Optional. Unique identifier of the message thread in which the message is generated */
  readonly message_thread_id?: number;
  /** Unique identifier of the message draft which was stopped */
  readonly draft_id: number;
  readonly [key: string]: unknown;
}
export const MessageGenerationStopped: Schema.Codec<MessageGenerationStopped> = Schema.StructWithRest(
  Schema.Struct({
    chat: Schema.suspend((): Schema.Codec<Chat> => Chat),
    message_thread_id: Schema.optionalKey(Schema.Int),
    draft_id: Schema.Int,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object represents a unique message identifier. */
export interface MessageId {
  /** Unique message identifier. In specific instances (e.g., message containing a video sent to a big chat), the server might automatically schedule a message instead of sending it immediately. In such cases, this field will be 0 and the relevant message will be unusable until it is actually sent. */
  readonly message_id: number;
  readonly [key: string]: unknown;
}
export const MessageId: Schema.Codec<MessageId> = Schema.StructWithRest(
  Schema.Struct({
    message_id: Schema.Int,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object describes the origin of a message. It can be one of */
export type MessageOrigin = MessageOriginUser | MessageOriginHiddenUser | MessageOriginChat | MessageOriginChannel;
export const MessageOrigin: Schema.Codec<MessageOrigin> = Schema.Union([Schema.suspend((): Schema.Codec<MessageOriginUser> => MessageOriginUser), Schema.suspend((): Schema.Codec<MessageOriginHiddenUser> => MessageOriginHiddenUser), Schema.suspend((): Schema.Codec<MessageOriginChat> => MessageOriginChat), Schema.suspend((): Schema.Codec<MessageOriginChannel> => MessageOriginChannel)]);

/** The message was originally sent to a channel chat. */
export interface MessageOriginChannel {
  /** Type of the message origin, always “channel” */
  readonly type: string;
  /** Date the message was sent originally in Unix time */
  readonly date: number;
  /** Channel chat to which the message was originally sent */
  readonly chat: Chat;
  /** Unique message identifier inside the chat */
  readonly message_id: number;
  /** Optional. Signature of the original post author */
  readonly author_signature?: string;
  readonly [key: string]: unknown;
}
export const MessageOriginChannel: Schema.Codec<MessageOriginChannel> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    date: Schema.Int,
    chat: Schema.suspend((): Schema.Codec<Chat> => Chat),
    message_id: Schema.Int,
    author_signature: Schema.optionalKey(Schema.String),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** The message was originally sent on behalf of a chat to a group chat. */
export interface MessageOriginChat {
  /** Type of the message origin, always “chat” */
  readonly type: string;
  /** Date the message was sent originally in Unix time */
  readonly date: number;
  /** Chat that sent the message originally */
  readonly sender_chat: Chat;
  /** Optional. For messages originally sent by an anonymous chat administrator, original message author signature */
  readonly author_signature?: string;
  readonly [key: string]: unknown;
}
export const MessageOriginChat: Schema.Codec<MessageOriginChat> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    date: Schema.Int,
    sender_chat: Schema.suspend((): Schema.Codec<Chat> => Chat),
    author_signature: Schema.optionalKey(Schema.String),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** The message was originally sent by an unknown user. */
export interface MessageOriginHiddenUser {
  /** Type of the message origin, always “hidden_user” */
  readonly type: string;
  /** Date the message was sent originally in Unix time */
  readonly date: number;
  /** Name of the user that sent the message originally */
  readonly sender_user_name: string;
  readonly [key: string]: unknown;
}
export const MessageOriginHiddenUser: Schema.Codec<MessageOriginHiddenUser> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    date: Schema.Int,
    sender_user_name: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** The message was originally sent by a known user. */
export interface MessageOriginUser {
  /** Type of the message origin, always “user” */
  readonly type: string;
  /** Date the message was sent originally in Unix time */
  readonly date: number;
  /** User that sent the message originally */
  readonly sender_user: User;
  readonly [key: string]: unknown;
}
export const MessageOriginUser: Schema.Codec<MessageOriginUser> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    date: Schema.Int,
    sender_user: Schema.suspend((): Schema.Codec<User> => User),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object represents reaction changes on a message with anonymous reactions. */
export interface MessageReactionCountUpdated {
  /** The chat containing the message */
  readonly chat: Chat;
  /** Unique message identifier inside the chat */
  readonly message_id: number;
  /** Date of the change in Unix time */
  readonly date: number;
  /** List of reactions that are present on the message */
  readonly reactions: ReadonlyArray<ReactionCount>;
  readonly [key: string]: unknown;
}
export const MessageReactionCountUpdated: Schema.Codec<MessageReactionCountUpdated> = Schema.StructWithRest(
  Schema.Struct({
    chat: Schema.suspend((): Schema.Codec<Chat> => Chat),
    message_id: Schema.Int,
    date: Schema.Int,
    reactions: Schema.Array(Schema.suspend((): Schema.Codec<ReactionCount> => ReactionCount)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object represents a change of a reaction on a message performed by a user. */
export interface MessageReactionUpdated {
  /** The chat containing the message the user reacted to */
  readonly chat: Chat;
  /** Unique identifier of the message inside the chat */
  readonly message_id: number;
  /** Optional. The user that changed the reaction, if the user isn't anonymous */
  readonly user?: User;
  /** Optional. The chat on behalf of which the reaction was changed, if the user is anonymous */
  readonly actor_chat?: Chat;
  /** Date of the change in Unix time */
  readonly date: number;
  /** Previous list of reaction types that were set by the user */
  readonly old_reaction: ReadonlyArray<ReactionType>;
  /** New list of reaction types that have been set by the user */
  readonly new_reaction: ReadonlyArray<ReactionType>;
  readonly [key: string]: unknown;
}
export const MessageReactionUpdated: Schema.Codec<MessageReactionUpdated> = Schema.StructWithRest(
  Schema.Struct({
    chat: Schema.suspend((): Schema.Codec<Chat> => Chat),
    message_id: Schema.Int,
    user: Schema.optionalKey(Schema.suspend((): Schema.Codec<User> => User)),
    actor_chat: Schema.optionalKey(Schema.suspend((): Schema.Codec<Chat> => Chat)),
    date: Schema.Int,
    old_reaction: Schema.Array(Schema.suspend((): Schema.Codec<ReactionType> => ReactionType)),
    new_reaction: Schema.Array(Schema.suspend((): Schema.Codec<ReactionType> => ReactionType)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object represents information about an order. */
export interface OrderInfo {
  /** Optional. User name */
  readonly name?: string;
  /** Optional. User's phone number */
  readonly phone_number?: string;
  /** Optional. User email */
  readonly email?: string;
  /** Optional. User shipping address */
  readonly shipping_address?: ShippingAddress;
  readonly [key: string]: unknown;
}
export const OrderInfo: Schema.Codec<OrderInfo> = Schema.StructWithRest(
  Schema.Struct({
    name: Schema.optionalKey(Schema.String),
    phone_number: Schema.optionalKey(Schema.String),
    email: Schema.optionalKey(Schema.String),
    shipping_address: Schema.optionalKey(Schema.suspend((): Schema.Codec<ShippingAddress> => ShippingAddress)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object describes a gift received and owned by a user or a chat. Currently, it can be one of */
export type OwnedGift = OwnedGiftRegular | OwnedGiftUnique;
export const OwnedGift: Schema.Codec<OwnedGift> = Schema.Union([Schema.suspend((): Schema.Codec<OwnedGiftRegular> => OwnedGiftRegular), Schema.suspend((): Schema.Codec<OwnedGiftUnique> => OwnedGiftUnique)]);

/** Describes a regular gift owned by a user or a chat. */
export interface OwnedGiftRegular {
  /** Type of the gift, always “regular” */
  readonly type: string;
  /** Information about the regular gift */
  readonly gift: Gift;
  /** Optional. Unique identifier of the gift for the bot; for gifts received on behalf of business accounts only */
  readonly owned_gift_id?: string;
  /** Optional. Sender of the gift if it is a known user */
  readonly sender_user?: User;
  /** Date the gift was sent in Unix time */
  readonly send_date: number;
  /** Optional. Text of the message that was added to the gift */
  readonly text?: string;
  /** Optional. Special entities that appear in the text */
  readonly entities?: ReadonlyArray<MessageEntity>;
  /** Optional. True, if the sender and gift text are shown only to the gift receiver; otherwise, everyone will be able to see them */
  readonly is_private?: true;
  /** Optional. True, if the gift is displayed on the account's profile page; for gifts received on behalf of business accounts only */
  readonly is_saved?: true;
  /** Optional. True, if the gift can be upgraded to a unique gift; for gifts received on behalf of business accounts only */
  readonly can_be_upgraded?: true;
  /** Optional. True, if the gift was refunded and isn't available anymore */
  readonly was_refunded?: true;
  /** Optional. Number of Telegram Stars that can be claimed by the receiver instead of the gift; omitted if the gift cannot be converted to Telegram Stars; for gifts received on behalf of business accounts only */
  readonly convert_star_count?: number;
  /** Optional. Number of Telegram Stars that were paid for the ability to upgrade the gift */
  readonly prepaid_upgrade_star_count?: number;
  /** Optional. True, if the gift's upgrade was purchased after the gift was sent; for gifts received on behalf of business accounts only */
  readonly is_upgrade_separate?: true;
  /** Optional. Unique number reserved for this gift when upgraded. See the number field in UniqueGift. */
  readonly unique_gift_number?: number;
  readonly [key: string]: unknown;
}
export const OwnedGiftRegular: Schema.Codec<OwnedGiftRegular> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    gift: Schema.suspend((): Schema.Codec<Gift> => Gift),
    owned_gift_id: Schema.optionalKey(Schema.String),
    sender_user: Schema.optionalKey(Schema.suspend((): Schema.Codec<User> => User)),
    send_date: Schema.Int,
    text: Schema.optionalKey(Schema.String),
    entities: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<MessageEntity> => MessageEntity))),
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

/** Contains the list of gifts received and owned by a user or a chat. */
export interface OwnedGifts {
  /** The total number of gifts owned by the user or the chat */
  readonly total_count: number;
  /** The list of gifts */
  readonly gifts: ReadonlyArray<OwnedGift>;
  /** Optional. Offset for the next request. If empty, then there are no more results. */
  readonly next_offset?: string;
  readonly [key: string]: unknown;
}
export const OwnedGifts: Schema.Codec<OwnedGifts> = Schema.StructWithRest(
  Schema.Struct({
    total_count: Schema.Int,
    gifts: Schema.Array(Schema.suspend((): Schema.Codec<OwnedGift> => OwnedGift)),
    next_offset: Schema.optionalKey(Schema.String),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Describes a unique gift received and owned by a user or a chat. */
export interface OwnedGiftUnique {
  /** Type of the gift, always “unique” */
  readonly type: string;
  /** Information about the unique gift */
  readonly gift: UniqueGift;
  /** Optional. Unique identifier of the received gift for the bot; for gifts received on behalf of business accounts only */
  readonly owned_gift_id?: string;
  /** Optional. Sender of the gift if it is a known user */
  readonly sender_user?: User;
  /** Date the gift was sent in Unix time */
  readonly send_date: number;
  /** Optional. True, if the gift is displayed on the account's profile page; for gifts received on behalf of business accounts only */
  readonly is_saved?: true;
  /** Optional. True, if the gift can be transferred to another owner; for gifts received on behalf of business accounts only */
  readonly can_be_transferred?: true;
  /** Optional. Number of Telegram Stars that must be paid to transfer the gift; omitted if the bot cannot transfer the gift */
  readonly transfer_star_count?: number;
  /** Optional. Point in time (Unix timestamp) when the gift can be transferred. If it is in the past, then the gift can be transferred now. */
  readonly next_transfer_date?: number;
  readonly [key: string]: unknown;
}
export const OwnedGiftUnique: Schema.Codec<OwnedGiftUnique> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    gift: Schema.suspend((): Schema.Codec<UniqueGift> => UniqueGift),
    owned_gift_id: Schema.optionalKey(Schema.String),
    sender_user: Schema.optionalKey(Schema.suspend((): Schema.Codec<User> => User)),
    send_date: Schema.Int,
    is_saved: Schema.optionalKey(Schema.Literal(true)),
    can_be_transferred: Schema.optionalKey(Schema.Literal(true)),
    transfer_star_count: Schema.optionalKey(Schema.Int),
    next_transfer_date: Schema.optionalKey(Schema.Int),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object describes paid media. Currently, it can be one of */
export type PaidMedia = PaidMediaLivePhoto | PaidMediaPhoto | PaidMediaPreview | PaidMediaVideo;
export const PaidMedia: Schema.Codec<PaidMedia> = Schema.Union([Schema.suspend((): Schema.Codec<PaidMediaLivePhoto> => PaidMediaLivePhoto), Schema.suspend((): Schema.Codec<PaidMediaPhoto> => PaidMediaPhoto), Schema.suspend((): Schema.Codec<PaidMediaPreview> => PaidMediaPreview), Schema.suspend((): Schema.Codec<PaidMediaVideo> => PaidMediaVideo)]);

/** Describes the paid media added to a message. */
export interface PaidMediaInfo {
  /** The number of Telegram Stars that must be paid to buy access to the media */
  readonly star_count: number;
  /** Information about the paid media */
  readonly paid_media: ReadonlyArray<PaidMedia>;
  readonly [key: string]: unknown;
}
export const PaidMediaInfo: Schema.Codec<PaidMediaInfo> = Schema.StructWithRest(
  Schema.Struct({
    star_count: Schema.Int,
    paid_media: Schema.Array(Schema.suspend((): Schema.Codec<PaidMedia> => PaidMedia)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** The paid media is a live photo. */
export interface PaidMediaLivePhoto {
  /** Type of the paid media, always “live_photo” */
  readonly type: string;
  /** The photo */
  readonly live_photo: LivePhoto;
  readonly [key: string]: unknown;
}
export const PaidMediaLivePhoto: Schema.Codec<PaidMediaLivePhoto> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    live_photo: Schema.suspend((): Schema.Codec<LivePhoto> => LivePhoto),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** The paid media is a photo. */
export interface PaidMediaPhoto {
  /** Type of the paid media, always “photo” */
  readonly type: string;
  /** The photo */
  readonly photo: ReadonlyArray<PhotoSize>;
  readonly [key: string]: unknown;
}
export const PaidMediaPhoto: Schema.Codec<PaidMediaPhoto> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    photo: Schema.Array(Schema.suspend((): Schema.Codec<PhotoSize> => PhotoSize)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** The paid media isn't available before the payment. */
export interface PaidMediaPreview {
  /** Type of the paid media, always “preview” */
  readonly type: string;
  /** Optional. Media width as defined by the sender */
  readonly width?: number;
  /** Optional. Media height as defined by the sender */
  readonly height?: number;
  /** Optional. Duration of the media in seconds as defined by the sender */
  readonly duration?: number;
  readonly [key: string]: unknown;
}
export const PaidMediaPreview: Schema.Codec<PaidMediaPreview> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
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
  readonly paid_media_payload: string;
  readonly [key: string]: unknown;
}
export const PaidMediaPurchased: Schema.Codec<PaidMediaPurchased> = Schema.StructWithRest(
  Schema.Struct({
    from: Schema.suspend((): Schema.Codec<User> => User),
    paid_media_payload: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** The paid media is a video. */
export interface PaidMediaVideo {
  /** Type of the paid media, always “video” */
  readonly type: string;
  /** The video */
  readonly video: Video;
  readonly [key: string]: unknown;
}
export const PaidMediaVideo: Schema.Codec<PaidMediaVideo> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    video: Schema.suspend((): Schema.Codec<Video> => Video),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Describes a service message about a change in the price of paid messages within a chat. */
export interface PaidMessagePriceChanged {
  /** The new number of Telegram Stars that must be paid by non-administrator users of the supergroup chat for each sent message */
  readonly paid_message_star_count: number;
  readonly [key: string]: unknown;
}
export const PaidMessagePriceChanged: Schema.Codec<PaidMessagePriceChanged> = Schema.StructWithRest(
  Schema.Struct({
    paid_message_star_count: Schema.Int,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Describes Telegram Passport data shared with the bot by the user. */
export interface PassportData {
  /** Array with information about documents and other Telegram Passport elements that was shared with the bot */
  readonly data: ReadonlyArray<EncryptedPassportElement>;
  /** Encrypted credentials required to decrypt the data */
  readonly credentials: EncryptedCredentials;
  readonly [key: string]: unknown;
}
export const PassportData: Schema.Codec<PassportData> = Schema.StructWithRest(
  Schema.Struct({
    data: Schema.Array(Schema.suspend((): Schema.Codec<EncryptedPassportElement> => EncryptedPassportElement)),
    credentials: Schema.suspend((): Schema.Codec<EncryptedCredentials> => EncryptedCredentials),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object represents an error in the Telegram Passport element which was submitted that should be resolved by the user. It should be one of: */
export type PassportElementError = PassportElementErrorDataField | PassportElementErrorFrontSide | PassportElementErrorReverseSide | PassportElementErrorSelfie | PassportElementErrorFile | PassportElementErrorFiles | PassportElementErrorTranslationFile | PassportElementErrorTranslationFiles | PassportElementErrorUnspecified;
export const PassportElementError: Schema.Codec<PassportElementError> = Schema.Union([Schema.suspend((): Schema.Codec<PassportElementErrorDataField> => PassportElementErrorDataField), Schema.suspend((): Schema.Codec<PassportElementErrorFrontSide> => PassportElementErrorFrontSide), Schema.suspend((): Schema.Codec<PassportElementErrorReverseSide> => PassportElementErrorReverseSide), Schema.suspend((): Schema.Codec<PassportElementErrorSelfie> => PassportElementErrorSelfie), Schema.suspend((): Schema.Codec<PassportElementErrorFile> => PassportElementErrorFile), Schema.suspend((): Schema.Codec<PassportElementErrorFiles> => PassportElementErrorFiles), Schema.suspend((): Schema.Codec<PassportElementErrorTranslationFile> => PassportElementErrorTranslationFile), Schema.suspend((): Schema.Codec<PassportElementErrorTranslationFiles> => PassportElementErrorTranslationFiles), Schema.suspend((): Schema.Codec<PassportElementErrorUnspecified> => PassportElementErrorUnspecified)]);

/** Represents an issue in one of the data fields that was provided by the user. The error is considered resolved when the field's value changes. */
export interface PassportElementErrorDataField {
  /** Error source, must be data */
  readonly source: string;
  /** The section of the user's Telegram Passport which has the error, one of “personal_details”, “passport”, “driver_license”, “identity_card”, “internal_passport”, “address” */
  readonly type: string;
  /** Name of the data field which has the error */
  readonly field_name: string;
  /** Base64-encoded data hash */
  readonly data_hash: string;
  /** Error message */
  readonly message: string;
  readonly [key: string]: unknown;
}
export const PassportElementErrorDataField: Schema.Codec<PassportElementErrorDataField> = Schema.StructWithRest(
  Schema.Struct({
    source: Schema.String,
    type: Schema.String,
    field_name: Schema.String,
    data_hash: Schema.String,
    message: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Represents an issue with a document scan. The error is considered resolved when the file with the document scan changes. */
export interface PassportElementErrorFile {
  /** Error source, must be file */
  readonly source: string;
  /** The section of the user's Telegram Passport which has the issue, one of “utility_bill”, “bank_statement”, “rental_agreement”, “passport_registration”, “temporary_registration” */
  readonly type: string;
  /** Base64-encoded file hash */
  readonly file_hash: string;
  /** Error message */
  readonly message: string;
  readonly [key: string]: unknown;
}
export const PassportElementErrorFile: Schema.Codec<PassportElementErrorFile> = Schema.StructWithRest(
  Schema.Struct({
    source: Schema.String,
    type: Schema.String,
    file_hash: Schema.String,
    message: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Represents an issue with a list of scans. The error is considered resolved when the list of files containing the scans changes. */
export interface PassportElementErrorFiles {
  /** Error source, must be files */
  readonly source: string;
  /** The section of the user's Telegram Passport which has the issue, one of “utility_bill”, “bank_statement”, “rental_agreement”, “passport_registration”, “temporary_registration” */
  readonly type: string;
  /** List of base64-encoded file hashes */
  readonly file_hashes: ReadonlyArray<string>;
  /** Error message */
  readonly message: string;
  readonly [key: string]: unknown;
}
export const PassportElementErrorFiles: Schema.Codec<PassportElementErrorFiles> = Schema.StructWithRest(
  Schema.Struct({
    source: Schema.String,
    type: Schema.String,
    file_hashes: Schema.Array(Schema.String),
    message: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Represents an issue with the front side of a document. The error is considered resolved when the file with the front side of the document changes. */
export interface PassportElementErrorFrontSide {
  /** Error source, must be front_side */
  readonly source: string;
  /** The section of the user's Telegram Passport which has the issue, one of “passport”, “driver_license”, “identity_card”, “internal_passport” */
  readonly type: string;
  /** Base64-encoded hash of the file with the front side of the document */
  readonly file_hash: string;
  /** Error message */
  readonly message: string;
  readonly [key: string]: unknown;
}
export const PassportElementErrorFrontSide: Schema.Codec<PassportElementErrorFrontSide> = Schema.StructWithRest(
  Schema.Struct({
    source: Schema.String,
    type: Schema.String,
    file_hash: Schema.String,
    message: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Represents an issue with the reverse side of a document. The error is considered resolved when the file with reverse side of the document changes. */
export interface PassportElementErrorReverseSide {
  /** Error source, must be reverse_side */
  readonly source: string;
  /** The section of the user's Telegram Passport which has the issue, one of “driver_license”, “identity_card” */
  readonly type: string;
  /** Base64-encoded hash of the file with the reverse side of the document */
  readonly file_hash: string;
  /** Error message */
  readonly message: string;
  readonly [key: string]: unknown;
}
export const PassportElementErrorReverseSide: Schema.Codec<PassportElementErrorReverseSide> = Schema.StructWithRest(
  Schema.Struct({
    source: Schema.String,
    type: Schema.String,
    file_hash: Schema.String,
    message: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Represents an issue with the selfie with a document. The error is considered resolved when the file with the selfie changes. */
export interface PassportElementErrorSelfie {
  /** Error source, must be selfie */
  readonly source: string;
  /** The section of the user's Telegram Passport which has the issue, one of “passport”, “driver_license”, “identity_card”, “internal_passport” */
  readonly type: string;
  /** Base64-encoded hash of the file with the selfie */
  readonly file_hash: string;
  /** Error message */
  readonly message: string;
  readonly [key: string]: unknown;
}
export const PassportElementErrorSelfie: Schema.Codec<PassportElementErrorSelfie> = Schema.StructWithRest(
  Schema.Struct({
    source: Schema.String,
    type: Schema.String,
    file_hash: Schema.String,
    message: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Represents an issue with one of the files that constitute the translation of a document. The error is considered resolved when the file changes. */
export interface PassportElementErrorTranslationFile {
  /** Error source, must be translation_file */
  readonly source: string;
  /** Type of element of the user's Telegram Passport which has the issue, one of “passport”, “driver_license”, “identity_card”, “internal_passport”, “utility_bill”, “bank_statement”, “rental_agreement”, “passport_registration”, “temporary_registration” */
  readonly type: string;
  /** Base64-encoded file hash */
  readonly file_hash: string;
  /** Error message */
  readonly message: string;
  readonly [key: string]: unknown;
}
export const PassportElementErrorTranslationFile: Schema.Codec<PassportElementErrorTranslationFile> = Schema.StructWithRest(
  Schema.Struct({
    source: Schema.String,
    type: Schema.String,
    file_hash: Schema.String,
    message: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Represents an issue with the translated version of a document. The error is considered resolved when a file with the document translation change. */
export interface PassportElementErrorTranslationFiles {
  /** Error source, must be translation_files */
  readonly source: string;
  /** Type of element of the user's Telegram Passport which has the issue, one of “passport”, “driver_license”, “identity_card”, “internal_passport”, “utility_bill”, “bank_statement”, “rental_agreement”, “passport_registration”, “temporary_registration” */
  readonly type: string;
  /** List of base64-encoded file hashes */
  readonly file_hashes: ReadonlyArray<string>;
  /** Error message */
  readonly message: string;
  readonly [key: string]: unknown;
}
export const PassportElementErrorTranslationFiles: Schema.Codec<PassportElementErrorTranslationFiles> = Schema.StructWithRest(
  Schema.Struct({
    source: Schema.String,
    type: Schema.String,
    file_hashes: Schema.Array(Schema.String),
    message: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Represents an issue in an unspecified place. The error is considered resolved when new data is added. */
export interface PassportElementErrorUnspecified {
  /** Error source, must be unspecified */
  readonly source: string;
  /** Type of element of the user's Telegram Passport which has the issue */
  readonly type: string;
  /** Base64-encoded element hash */
  readonly element_hash: string;
  /** Error message */
  readonly message: string;
  readonly [key: string]: unknown;
}
export const PassportElementErrorUnspecified: Schema.Codec<PassportElementErrorUnspecified> = Schema.StructWithRest(
  Schema.Struct({
    source: Schema.String,
    type: Schema.String,
    element_hash: Schema.String,
    message: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object represents a file uploaded to Telegram Passport. Currently all Telegram Passport files are in JPEG format when decrypted and don't exceed 10MB. */
export interface PassportFile {
  /** Identifier for this file, which can be used to download or reuse the file */
  readonly file_id: string;
  /** Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file. */
  readonly file_unique_id: string;
  /** File size in bytes */
  readonly file_size: number;
  /** Unix time when the file was uploaded */
  readonly file_date: number;
  readonly [key: string]: unknown;
}
export const PassportFile: Schema.Codec<PassportFile> = Schema.StructWithRest(
  Schema.Struct({
    file_id: Schema.String,
    file_unique_id: Schema.String,
    file_size: Schema.Int,
    file_date: Schema.Int,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object represents one size of a photo or a file / sticker thumbnail. */
export interface PhotoSize {
  /** Identifier for this file, which can be used to download or reuse the file */
  readonly file_id: string;
  /** Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file. */
  readonly file_unique_id: string;
  /** Photo width */
  readonly width: number;
  /** Photo height */
  readonly height: number;
  /** Optional. File size in bytes */
  readonly file_size?: number;
  readonly [key: string]: unknown;
}
export const PhotoSize: Schema.Codec<PhotoSize> = Schema.StructWithRest(
  Schema.Struct({
    file_id: Schema.String,
    file_unique_id: Schema.String,
    width: Schema.Int,
    height: Schema.Int,
    file_size: Schema.optionalKey(Schema.Int),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object contains information about a poll. */
export interface Poll {
  /** Unique poll identifier */
  readonly id: string;
  /** Poll question, 1-300 characters */
  readonly question: string;
  /** Optional. Special entities that appear in the question. Currently, only custom emoji entities are allowed in poll questions */
  readonly question_entities?: ReadonlyArray<MessageEntity>;
  /** List of poll options */
  readonly options: ReadonlyArray<PollOption>;
  /** Total number of users that voted in the poll */
  readonly total_voter_count: number;
  /** True, if the poll is closed */
  readonly is_closed: boolean;
  /** True, if the poll is anonymous */
  readonly is_anonymous: boolean;
  /** Poll type, currently can be “regular” or “quiz” */
  readonly type: PollType;
  /** True, if the poll allows multiple answers */
  readonly allows_multiple_answers: boolean;
  /** True, if the poll allows to change the chosen answer options */
  readonly allows_revoting: boolean;
  /** True if voting is limited to users who have been members of the chat where the poll was originally sent for more than 24 hours */
  readonly members_only: boolean;
  /** Optional. A list of two-letter ISO 3166-1 alpha-2 country codes indicating the countries from which users can vote in the poll. The country code “FT” is used for users with anonymous numbers. If omitted, then users from any country can participate in the poll. */
  readonly country_codes?: ReadonlyArray<string>;
  /** Optional. Array of 0-based identifiers of the correct answer options. Available only for polls in quiz mode which are closed or were sent (not forwarded) by the bot or to the private chat with the bot. */
  readonly correct_option_ids?: ReadonlyArray<number>;
  /** Optional. Text that is shown when a user chooses an incorrect answer or taps on the lamp icon in a quiz-style poll, 0-200 characters */
  readonly explanation?: string;
  /** Optional. Special entities like usernames, URLs, bot commands, etc. that appear in the explanation */
  readonly explanation_entities?: ReadonlyArray<MessageEntity>;
  /** Optional. Media added to the quiz explanation */
  readonly explanation_media?: PollMedia;
  /** Optional. Amount of time in seconds the poll will be active after creation */
  readonly open_period?: number;
  /** Optional. Point in time (Unix timestamp) when the poll will be automatically closed */
  readonly close_date?: number;
  /** Optional. Description of the poll; for polls inside the Message object only */
  readonly description?: string;
  /** Optional. Special entities like usernames, URLs, bot commands, etc. that appear in the description */
  readonly description_entities?: ReadonlyArray<MessageEntity>;
  /** Optional. Media added to the poll description; for polls inside the Message object only */
  readonly media?: PollMedia;
  readonly [key: string]: unknown;
}
export const Poll: Schema.Codec<Poll> = Schema.StructWithRest(
  Schema.Struct({
    id: Schema.String,
    question: Schema.String,
    question_entities: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<MessageEntity> => MessageEntity))),
    options: Schema.Array(Schema.suspend((): Schema.Codec<PollOption> => PollOption)),
    total_voter_count: Schema.Int,
    is_closed: Schema.Boolean,
    is_anonymous: Schema.Boolean,
    type: Schema.suspend((): Schema.Codec<PollType> => PollType),
    allows_multiple_answers: Schema.Boolean,
    allows_revoting: Schema.Boolean,
    members_only: Schema.Boolean,
    country_codes: Schema.optionalKey(Schema.Array(Schema.String)),
    correct_option_ids: Schema.optionalKey(Schema.Array(Schema.Int)),
    explanation: Schema.optionalKey(Schema.String),
    explanation_entities: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<MessageEntity> => MessageEntity))),
    explanation_media: Schema.optionalKey(Schema.suspend((): Schema.Codec<PollMedia> => PollMedia)),
    open_period: Schema.optionalKey(Schema.Int),
    close_date: Schema.optionalKey(Schema.Int),
    description: Schema.optionalKey(Schema.String),
    description_entities: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<MessageEntity> => MessageEntity))),
    media: Schema.optionalKey(Schema.suspend((): Schema.Codec<PollMedia> => PollMedia)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object represents an answer of a user in a non-anonymous poll. */
export interface PollAnswer {
  /** Unique poll identifier */
  readonly poll_id: string;
  /** Optional. The chat that changed the answer to the poll, if the voter is anonymous */
  readonly voter_chat?: Chat;
  /** Optional. The user that changed the answer to the poll, if the voter isn't anonymous */
  readonly user?: User;
  /** 0-based identifiers of chosen answer options. May be empty if the vote was retracted. */
  readonly option_ids: ReadonlyArray<number>;
  /** Persistent identifiers of the chosen answer options. May be empty if the vote was retracted. */
  readonly option_persistent_ids: ReadonlyArray<string>;
  readonly [key: string]: unknown;
}
export const PollAnswer: Schema.Codec<PollAnswer> = Schema.StructWithRest(
  Schema.Struct({
    poll_id: Schema.String,
    voter_chat: Schema.optionalKey(Schema.suspend((): Schema.Codec<Chat> => Chat)),
    user: Schema.optionalKey(Schema.suspend((): Schema.Codec<User> => User)),
    option_ids: Schema.Array(Schema.Int),
    option_persistent_ids: Schema.Array(Schema.String),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
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
  readonly live_photo?: LivePhoto;
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
export const PollMedia: Schema.Codec<PollMedia> = Schema.StructWithRest(
  Schema.Struct({
    animation: Schema.optionalKey(Schema.suspend((): Schema.Codec<Animation> => Animation)),
    audio: Schema.optionalKey(Schema.suspend((): Schema.Codec<Audio> => Audio)),
    document: Schema.optionalKey(Schema.suspend((): Schema.Codec<Document> => Document)),
    link: Schema.optionalKey(Schema.suspend((): Schema.Codec<Link> => Link)),
    live_photo: Schema.optionalKey(Schema.suspend((): Schema.Codec<LivePhoto> => LivePhoto)),
    location: Schema.optionalKey(Schema.suspend((): Schema.Codec<Location> => Location)),
    photo: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<PhotoSize> => PhotoSize))),
    sticker: Schema.optionalKey(Schema.suspend((): Schema.Codec<Sticker> => Sticker)),
    venue: Schema.optionalKey(Schema.suspend((): Schema.Codec<Venue> => Venue)),
    video: Schema.optionalKey(Schema.suspend((): Schema.Codec<Video> => Video)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object contains information about one answer option in a poll. */
export interface PollOption {
  /** Unique identifier of the option, persistent on option addition and deletion */
  readonly persistent_id: string;
  /** Option text, 1-100 characters */
  readonly text: string;
  /** Optional. Special entities that appear in the option text. Currently, only custom emoji entities are allowed in poll option texts */
  readonly text_entities?: ReadonlyArray<MessageEntity>;
  /** Optional. Media added to the poll option */
  readonly media?: PollMedia;
  /** Number of users who voted for this option; may be 0 if unknown */
  readonly voter_count: number;
  /** Optional. User who added the option; omitted if the option wasn't added by a user after poll creation */
  readonly added_by_user?: User;
  /** Optional. Chat that added the option; omitted if the option wasn't added by a chat after poll creation */
  readonly added_by_chat?: Chat;
  /** Optional. Point in time (Unix timestamp) when the option was added; omitted if the option existed in the original poll */
  readonly addition_date?: number;
  readonly [key: string]: unknown;
}
export const PollOption: Schema.Codec<PollOption> = Schema.StructWithRest(
  Schema.Struct({
    persistent_id: Schema.String,
    text: Schema.String,
    text_entities: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<MessageEntity> => MessageEntity))),
    media: Schema.optionalKey(Schema.suspend((): Schema.Codec<PollMedia> => PollMedia)),
    voter_count: Schema.Int,
    added_by_user: Schema.optionalKey(Schema.suspend((): Schema.Codec<User> => User)),
    added_by_chat: Schema.optionalKey(Schema.suspend((): Schema.Codec<Chat> => Chat)),
    addition_date: Schema.optionalKey(Schema.Int),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Describes a service message about an option added to a poll. */
export interface PollOptionAdded {
  /** Optional. Message containing the poll to which the option was added, if known. Note that the Message object in this field will not contain the reply_to_message field even if it itself is a reply. */
  readonly poll_message?: MaybeInaccessibleMessage;
  /** Unique identifier of the added option */
  readonly option_persistent_id: string;
  /** Option text */
  readonly option_text: string;
  /** Optional. Special entities that appear in the option_text */
  readonly option_text_entities?: ReadonlyArray<MessageEntity>;
  readonly [key: string]: unknown;
}
export const PollOptionAdded: Schema.Codec<PollOptionAdded> = Schema.StructWithRest(
  Schema.Struct({
    poll_message: Schema.optionalKey(Schema.suspend((): Schema.Codec<MaybeInaccessibleMessage> => MaybeInaccessibleMessage)),
    option_persistent_id: Schema.String,
    option_text: Schema.String,
    option_text_entities: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<MessageEntity> => MessageEntity))),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Describes a service message about an option deleted from a poll. */
export interface PollOptionDeleted {
  /** Optional. Message containing the poll from which the option was deleted, if known. Note that the Message object in this field will not contain the reply_to_message field even if it itself is a reply. */
  readonly poll_message?: MaybeInaccessibleMessage;
  /** Unique identifier of the deleted option */
  readonly option_persistent_id: string;
  /** Option text */
  readonly option_text: string;
  /** Optional. Special entities that appear in the option_text */
  readonly option_text_entities?: ReadonlyArray<MessageEntity>;
  readonly [key: string]: unknown;
}
export const PollOptionDeleted: Schema.Codec<PollOptionDeleted> = Schema.StructWithRest(
  Schema.Struct({
    poll_message: Schema.optionalKey(Schema.suspend((): Schema.Codec<MaybeInaccessibleMessage> => MaybeInaccessibleMessage)),
    option_persistent_id: Schema.String,
    option_text: Schema.String,
    option_text_entities: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<MessageEntity> => MessageEntity))),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
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
  readonly total_amount: number;
  /** Bot-specified invoice payload */
  readonly invoice_payload: string;
  /** Optional. Identifier of the shipping option chosen by the user */
  readonly shipping_option_id?: string;
  /** Optional. Order information provided by the user */
  readonly order_info?: OrderInfo;
  readonly [key: string]: unknown;
}
export const PreCheckoutQuery: Schema.Codec<PreCheckoutQuery> = Schema.StructWithRest(
  Schema.Struct({
    id: Schema.String,
    from: Schema.suspend((): Schema.Codec<User> => User),
    currency: Schema.String,
    total_amount: Schema.Int,
    invoice_payload: Schema.String,
    shipping_option_id: Schema.optionalKey(Schema.String),
    order_info: Schema.optionalKey(Schema.suspend((): Schema.Codec<OrderInfo> => OrderInfo)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Describes an inline message to be sent by a user of a Mini App. */
export interface PreparedInlineMessage {
  /** Unique identifier of the prepared message */
  readonly id: string;
  /** Expiration date of the prepared message, in Unix time. Expired prepared messages can no longer be used. */
  readonly expiration_date: number;
  readonly [key: string]: unknown;
}
export const PreparedInlineMessage: Schema.Codec<PreparedInlineMessage> = Schema.StructWithRest(
  Schema.Struct({
    id: Schema.String,
    expiration_date: Schema.Int,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Describes a keyboard button to be used by a user of a Mini App. */
export interface PreparedKeyboardButton {
  /** Unique identifier of the keyboard button */
  readonly id: string;
  readonly [key: string]: unknown;
}
export const PreparedKeyboardButton: Schema.Codec<PreparedKeyboardButton> = Schema.StructWithRest(
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
export const ProximityAlertTriggered: Schema.Codec<ProximityAlertTriggered> = Schema.StructWithRest(
  Schema.Struct({
    traveler: Schema.suspend((): Schema.Codec<User> => User),
    watcher: Schema.suspend((): Schema.Codec<User> => User),
    distance: Schema.Int,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Represents a reaction added to a message along with the number of times it was added. */
export interface ReactionCount {
  /** Type of the reaction */
  readonly type: ReactionType;
  /** Number of times the reaction was added */
  readonly total_count: number;
  readonly [key: string]: unknown;
}
export const ReactionCount: Schema.Codec<ReactionCount> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.suspend((): Schema.Codec<ReactionType> => ReactionType),
    total_count: Schema.Int,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object describes the type of a reaction. Currently, it can be one of */
export type ReactionType = ReactionTypeEmoji | ReactionTypeCustomEmoji | ReactionTypePaid;
export const ReactionType: Schema.Codec<ReactionType> = Schema.Union([Schema.suspend((): Schema.Codec<ReactionTypeEmoji> => ReactionTypeEmoji), Schema.suspend((): Schema.Codec<ReactionTypeCustomEmoji> => ReactionTypeCustomEmoji), Schema.suspend((): Schema.Codec<ReactionTypePaid> => ReactionTypePaid)]);

/** The reaction is based on a custom emoji. */
export interface ReactionTypeCustomEmoji {
  /** Type of the reaction, always “custom_emoji” */
  readonly type: string;
  /** Custom emoji identifier */
  readonly custom_emoji_id: string;
  readonly [key: string]: unknown;
}
export const ReactionTypeCustomEmoji: Schema.Codec<ReactionTypeCustomEmoji> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    custom_emoji_id: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** The reaction is based on an emoji. */
export interface ReactionTypeEmoji {
  /** Type of the reaction, always “emoji” */
  readonly type: string;
  /** Reaction emoji. Currently, it can be one of "❤", "👍", "👎", "🔥", "🥰", "👏", "😁", "🤔", "🤯", "😱", "🤬", "😢", "🎉", "🤩", "🤮", "💩", "🙏", "👌", "🕊", "🤡", "🥱", "🥴", "😍", "🐳", "❤‍🔥", "🌚", "🌭", "💯", "🤣", "⚡", "🍌", "🏆", "💔", "🤨", "😐", "🍓", "🍾", "💋", "🖕", "😈", "😴", "😭", "🤓", "👻", "👨‍💻", "👀", "🎃", "🙈", "😇", "😨", "🤝", "✍", "🤗", "🫡", "🎅", "🎄", "☃", "💅", "🤪", "🗿", "🆒", "💘", "🙉", "🦄", "😘", "💊", "🙊", "😎", "👾", "🤷‍♂", "🤷", "🤷‍♀", "😡". */
  readonly emoji: string;
  readonly [key: string]: unknown;
}
export const ReactionTypeEmoji: Schema.Codec<ReactionTypeEmoji> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    emoji: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** The reaction is paid. */
export interface ReactionTypePaid {
  /** Type of the reaction, always “paid” */
  readonly type: string;
  readonly [key: string]: unknown;
}
export const ReactionTypePaid: Schema.Codec<ReactionTypePaid> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object contains basic information about a refunded payment. */
export interface RefundedPayment {
  /** Three-letter ISO 4217 currency code, or “XTR” for payments in Telegram Stars. Currently, always “XTR”. */
  readonly currency: string;
  /** Total refunded price in the smallest units of the currency (integer, not float/double). For example, for a price of US$ 1.45, total_amount = 145. See the exp parameter in currencies.json, it shows the number of digits past the decimal point for each currency (2 for the majority of currencies). */
  readonly total_amount: number;
  /** Bot-specified invoice payload */
  readonly invoice_payload: string;
  /** Telegram payment identifier */
  readonly telegram_payment_charge_id: string;
  /** Optional. Provider payment identifier */
  readonly provider_payment_charge_id?: string;
  readonly [key: string]: unknown;
}
export const RefundedPayment: Schema.Codec<RefundedPayment> = Schema.StructWithRest(
  Schema.Struct({
    currency: Schema.String,
    total_amount: Schema.Int,
    invoice_payload: Schema.String,
    telegram_payment_charge_id: Schema.String,
    provider_payment_charge_id: Schema.optionalKey(Schema.String),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object represents a custom keyboard with reply options (see Introduction to bots for details and examples). Not supported in channels and for messages sent on behalf of a business account. */
export interface ReplyKeyboardMarkup {
  /** Array of button rows, each represented by an Array of KeyboardButton objects */
  readonly keyboard: ReadonlyArray<ReadonlyArray<KeyboardButton>>;
  /** Optional. Requests clients to always show the keyboard when the regular keyboard is hidden. Defaults to False, in which case the custom keyboard can be hidden and opened with a keyboard icon. */
  readonly is_persistent?: boolean;
  /** Optional. Requests clients to resize the keyboard vertically for optimal fit (e.g., make the keyboard smaller if there are just two rows of buttons). Defaults to False, in which case the custom keyboard is always of the same height as the app's standard keyboard. */
  readonly resize_keyboard?: boolean;
  /** Optional. Requests clients to hide the keyboard as soon as it's been used. The keyboard will still be available, but clients will automatically display the usual letter-keyboard in the chat - the user can press a special button in the input field to see the custom keyboard again. Defaults to False. */
  readonly one_time_keyboard?: boolean;
  /** Optional. The placeholder to be shown in the input field when the keyboard is active; 1-64 characters */
  readonly input_field_placeholder?: string;
  /** Optional. Use this parameter if you want to show the keyboard to specific users only. Targets: 1) users that are @mentioned in the text of the Message object; 2) if the bot's message is a reply to a message in the same chat and forum topic, sender of the original message.

Example: A user requests to change the bot's language, bot replies to the request with a keyboard to select the new language. Other users in the group don't see the keyboard. */
  readonly selective?: boolean;
  /** Optional. Pass True if the reply interface must be shown to the user, as if they had manually selected the bot's message and tapped 'Reply' */
  readonly force_reply?: boolean;
  readonly [key: string]: unknown;
}
export const ReplyKeyboardMarkup: Schema.Codec<ReplyKeyboardMarkup> = Schema.StructWithRest(
  Schema.Struct({
    keyboard: Schema.Array(Schema.Array(Schema.suspend((): Schema.Codec<KeyboardButton> => KeyboardButton))),
    is_persistent: Schema.optionalKey(Schema.Boolean),
    resize_keyboard: Schema.optionalKey(Schema.Boolean),
    one_time_keyboard: Schema.optionalKey(Schema.Boolean),
    input_field_placeholder: Schema.optionalKey(Schema.String),
    selective: Schema.optionalKey(Schema.Boolean),
    force_reply: Schema.optionalKey(Schema.Boolean),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Upon receiving a message with this object, Telegram clients will remove the current custom keyboard and display the default letter-keyboard. By default, custom keyboards are displayed until a new keyboard is sent by a bot. An exception is made for one-time keyboards that are hidden immediately after the user presses a button (see ReplyKeyboardMarkup). Not supported in channels and for messages sent on behalf of a business account. */
export interface ReplyKeyboardRemove {
  /** Requests clients to remove the custom keyboard (user will not be able to summon this keyboard; if you want to hide the keyboard from sight but keep it accessible, use one_time_keyboard in ReplyKeyboardMarkup) */
  readonly remove_keyboard: true;
  /** Optional. Use this parameter if you want to remove the keyboard for specific users only. Targets: 1) users that are @mentioned in the text of the Message object; 2) if the bot's message is a reply to a message in the same chat and forum topic, sender of the original message.

Example: A user votes in a poll, bot returns confirmation message in reply to the vote and removes the keyboard for that user, while still showing the keyboard with poll options to users who haven't voted yet. */
  readonly selective?: boolean;
  readonly [key: string]: unknown;
}
export const ReplyKeyboardRemove: Schema.Codec<ReplyKeyboardRemove> = Schema.StructWithRest(
  Schema.Struct({
    remove_keyboard: Schema.Literal(true),
    selective: Schema.optionalKey(Schema.Boolean),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Describes reply parameters for the message that is being sent. */
export interface ReplyParameters {
  /** Optional. Identifier of the message that will be replied to in the current chat, or in the chat chat_id if it is specified. Required if ephemeral_message_id isn't specified. */
  readonly message_id?: number;
  /** Optional. If the message to be replied to is from a different chat, unique identifier for the chat or username of the bot, supergroup or channel in the format @username. Not supported for messages sent on behalf of a business account, messages from channel direct messages chats and ephemeral messages. */
  readonly chat_id?: number | string;
  /** Optional. Identifier of the incoming ephemeral message that will be replied to in the current chat. A reply to an ephemeral message must itself be an ephemeral message. An ephemeral message may only be replied to within 15 seconds of being sent. Required if message_id isn't specified. */
  readonly ephemeral_message_id?: number;
  /** Optional. Pass True if the message should be sent even if the specified message to be replied to is not found. Always False for replies in another chat or forum topic, and sent ephemeral messages. Always True for messages sent on behalf of a business account. */
  readonly allow_sending_without_reply?: boolean;
  /** Optional. Quoted part of the message to be replied to; 0-1024 characters after entities parsing. The quote must be an exact substring of the message to be replied to, including bold, italic, underline, strikethrough, spoiler, custom_emoji, and date_time entities. The message will fail to send if the quote isn't found in the original message. Ignored for ephemeral messages. */
  readonly quote?: string;
  /** Optional. Mode for parsing entities in the quote. See formatting options for more details. */
  readonly quote_parse_mode?: string;
  /** Optional. A JSON-serialized list of special entities that appear in the quote. It can be specified instead of quote_parse_mode. */
  readonly quote_entities?: ReadonlyArray<MessageEntity>;
  /** Optional. Position of the quote in the original message in UTF-16 code units */
  readonly quote_position?: number;
  /** Optional. Identifier of the specific checklist task to be replied to */
  readonly checklist_task_id?: number;
  /** Optional. Persistent identifier of the specific poll option to be replied to */
  readonly poll_option_id?: string;
  readonly [key: string]: unknown;
}
export const ReplyParameters: Schema.Codec<ReplyParameters> = Schema.StructWithRest(
  Schema.Struct({
    message_id: Schema.optionalKey(Schema.Int),
    chat_id: Schema.optionalKey(Schema.Union([Schema.Int, Schema.String])),
    ephemeral_message_id: Schema.optionalKey(Schema.Int),
    allow_sending_without_reply: Schema.optionalKey(Schema.Boolean),
    quote: Schema.optionalKey(Schema.String),
    quote_parse_mode: Schema.optionalKey(Schema.String),
    quote_entities: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<MessageEntity> => MessageEntity))),
    quote_position: Schema.optionalKey(Schema.Int),
    checklist_task_id: Schema.optionalKey(Schema.Int),
    poll_option_id: Schema.optionalKey(Schema.String),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Describes why a request was unsuccessful. */
export interface ResponseParameters {
  /** Optional. The group has been migrated to a supergroup with the specified identifier. This number may have more than 32 significant bits and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a signed 64-bit integer or double-precision float type are safe for storing this identifier. */
  readonly migrate_to_chat_id?: number;
  /** Optional. In case of exceeding flood control, the number of seconds left to wait before the request can be repeated */
  readonly retry_after?: number;
  readonly [key: string]: unknown;
}
export const ResponseParameters: Schema.Codec<ResponseParameters> = Schema.StructWithRest(
  Schema.Struct({
    migrate_to_chat_id: Schema.optionalKey(Schema.Int),
    retry_after: Schema.optionalKey(Schema.Int),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object describes the state of a revenue withdrawal operation. Currently, it can be one of */
export type RevenueWithdrawalState = RevenueWithdrawalStatePending | RevenueWithdrawalStateSucceeded | RevenueWithdrawalStateFailed;
export const RevenueWithdrawalState: Schema.Codec<RevenueWithdrawalState> = Schema.Union([Schema.suspend((): Schema.Codec<RevenueWithdrawalStatePending> => RevenueWithdrawalStatePending), Schema.suspend((): Schema.Codec<RevenueWithdrawalStateSucceeded> => RevenueWithdrawalStateSucceeded), Schema.suspend((): Schema.Codec<RevenueWithdrawalStateFailed> => RevenueWithdrawalStateFailed)]);

/** The withdrawal failed and the transaction was refunded. */
export interface RevenueWithdrawalStateFailed {
  /** Type of the state, always “failed” */
  readonly type: string;
  readonly [key: string]: unknown;
}
export const RevenueWithdrawalStateFailed: Schema.Codec<RevenueWithdrawalStateFailed> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** The withdrawal is in progress. */
export interface RevenueWithdrawalStatePending {
  /** Type of the state, always “pending” */
  readonly type: string;
  readonly [key: string]: unknown;
}
export const RevenueWithdrawalStatePending: Schema.Codec<RevenueWithdrawalStatePending> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** The withdrawal succeeded. */
export interface RevenueWithdrawalStateSucceeded {
  /** Type of the state, always “succeeded” */
  readonly type: string;
  /** Date the withdrawal was completed in Unix time */
  readonly date: number;
  /** An HTTPS URL that can be used to see transaction details */
  readonly url: string;
  readonly [key: string]: unknown;
}
export const RevenueWithdrawalStateSucceeded: Schema.Codec<RevenueWithdrawalStateSucceeded> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    date: Schema.Int,
    url: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object represents a block in a rich formatted message. Currently, it can be any of the following types: */
export type RichBlock = RichBlockParagraph | RichBlockSectionHeading | RichBlockPreformatted | RichBlockFooter | RichBlockDivider | RichBlockMathematicalExpression | RichBlockAnchor | RichBlockList | RichBlockBlockQuotation | RichBlockExpandableBlockQuotation | RichBlockPullQuotation | RichBlockCollage | RichBlockSlideshow | RichBlockTable | RichBlockDetails | RichBlockMap | RichBlockButtons | RichBlockAnimation | RichBlockAudio | RichBlockDocument | RichBlockPhoto | RichBlockVideo | RichBlockVoiceNote | RichBlockThinking;
export const RichBlock: Schema.Codec<RichBlock> = Schema.Union([Schema.suspend((): Schema.Codec<RichBlockParagraph> => RichBlockParagraph), Schema.suspend((): Schema.Codec<RichBlockSectionHeading> => RichBlockSectionHeading), Schema.suspend((): Schema.Codec<RichBlockPreformatted> => RichBlockPreformatted), Schema.suspend((): Schema.Codec<RichBlockFooter> => RichBlockFooter), Schema.suspend((): Schema.Codec<RichBlockDivider> => RichBlockDivider), Schema.suspend((): Schema.Codec<RichBlockMathematicalExpression> => RichBlockMathematicalExpression), Schema.suspend((): Schema.Codec<RichBlockAnchor> => RichBlockAnchor), Schema.suspend((): Schema.Codec<RichBlockList> => RichBlockList), Schema.suspend((): Schema.Codec<RichBlockBlockQuotation> => RichBlockBlockQuotation), Schema.suspend((): Schema.Codec<RichBlockExpandableBlockQuotation> => RichBlockExpandableBlockQuotation), Schema.suspend((): Schema.Codec<RichBlockPullQuotation> => RichBlockPullQuotation), Schema.suspend((): Schema.Codec<RichBlockCollage> => RichBlockCollage), Schema.suspend((): Schema.Codec<RichBlockSlideshow> => RichBlockSlideshow), Schema.suspend((): Schema.Codec<RichBlockTable> => RichBlockTable), Schema.suspend((): Schema.Codec<RichBlockDetails> => RichBlockDetails), Schema.suspend((): Schema.Codec<RichBlockMap> => RichBlockMap), Schema.suspend((): Schema.Codec<RichBlockButtons> => RichBlockButtons), Schema.suspend((): Schema.Codec<RichBlockAnimation> => RichBlockAnimation), Schema.suspend((): Schema.Codec<RichBlockAudio> => RichBlockAudio), Schema.suspend((): Schema.Codec<RichBlockDocument> => RichBlockDocument), Schema.suspend((): Schema.Codec<RichBlockPhoto> => RichBlockPhoto), Schema.suspend((): Schema.Codec<RichBlockVideo> => RichBlockVideo), Schema.suspend((): Schema.Codec<RichBlockVoiceNote> => RichBlockVoiceNote), Schema.suspend((): Schema.Codec<RichBlockThinking> => RichBlockThinking)]);

/** A block with an anchor, corresponding to the HTML tag <a> with the attribute name. */
export interface RichBlockAnchor {
  /** Type of the block, always “anchor” */
  readonly type: string;
  /** The name of the anchor */
  readonly name: string;
  readonly [key: string]: unknown;
}
export const RichBlockAnchor: Schema.Codec<RichBlockAnchor> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    name: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A block with an animation, corresponding to the HTML tag <video>. */
export interface RichBlockAnimation {
  /** Type of the block, always “animation” */
  readonly type: string;
  /** The animation */
  readonly animation: Animation;
  /** Optional. True, if the media preview is covered by a spoiler animation */
  readonly has_spoiler?: true;
  /** Optional. Caption of the block */
  readonly caption?: RichBlockCaption;
  readonly [key: string]: unknown;
}
export const RichBlockAnimation: Schema.Codec<RichBlockAnimation> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    animation: Schema.suspend((): Schema.Codec<Animation> => Animation),
    has_spoiler: Schema.optionalKey(Schema.Literal(true)),
    caption: Schema.optionalKey(Schema.suspend((): Schema.Codec<RichBlockCaption> => RichBlockCaption)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A block with a music file, corresponding to the HTML tag <audio>. */
export interface RichBlockAudio {
  /** Type of the block, always “audio” */
  readonly type: string;
  /** The audio */
  readonly audio: Audio;
  /** Optional. Caption of the block */
  readonly caption?: RichBlockCaption;
  readonly [key: string]: unknown;
}
export const RichBlockAudio: Schema.Codec<RichBlockAudio> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    audio: Schema.suspend((): Schema.Codec<Audio> => Audio),
    caption: Schema.optionalKey(Schema.suspend((): Schema.Codec<RichBlockCaption> => RichBlockCaption)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A block quotation, corresponding to the HTML tag <blockquote>. */
export interface RichBlockBlockQuotation {
  /** Type of the block, always “blockquote” */
  readonly type: string;
  /** Content of the block */
  readonly blocks: ReadonlyArray<RichBlock>;
  /** Optional. Credit of the block */
  readonly credit?: RichText;
  readonly [key: string]: unknown;
}
export const RichBlockBlockQuotation: Schema.Codec<RichBlockBlockQuotation> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    blocks: Schema.Array(Schema.suspend((): Schema.Codec<RichBlock> => RichBlock)),
    credit: Schema.optionalKey(Schema.suspend((): Schema.Codec<RichText> => RichText)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A block containing a list of buttons that are shown in one row, corresponding to the custom HTML tag <tg-button-row>. */
export interface RichBlockButtons {
  /** Type of the block, always “buttons” */
  readonly type: string;
  /** The buttons */
  readonly buttons: ReadonlyArray<RichMessageButton>;
  /** Optional. Horizontal alignment of the buttons. Currently, must be one of “left”, “center”, or “right”. */
  readonly align?: string;
  readonly [key: string]: unknown;
}
export const RichBlockButtons: Schema.Codec<RichBlockButtons> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    buttons: Schema.Array(Schema.suspend((): Schema.Codec<RichMessageButton> => RichMessageButton)),
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
export const RichBlockCaption: Schema.Codec<RichBlockCaption> = Schema.StructWithRest(
  Schema.Struct({
    text: Schema.suspend((): Schema.Codec<RichText> => RichText),
    credit: Schema.optionalKey(Schema.suspend((): Schema.Codec<RichText> => RichText)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A collage, corresponding to the custom HTML tag <tg-collage>. */
export interface RichBlockCollage {
  /** Type of the block, always “collage” */
  readonly type: string;
  /** Elements of the collage */
  readonly blocks: ReadonlyArray<RichBlock>;
  /** Optional. Caption of the block */
  readonly caption?: RichBlockCaption;
  readonly [key: string]: unknown;
}
export const RichBlockCollage: Schema.Codec<RichBlockCollage> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    blocks: Schema.Array(Schema.suspend((): Schema.Codec<RichBlock> => RichBlock)),
    caption: Schema.optionalKey(Schema.suspend((): Schema.Codec<RichBlockCaption> => RichBlockCaption)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** An expandable block for details disclosure, corresponding to the HTML tag <details>. */
export interface RichBlockDetails {
  /** Type of the block, always “details” */
  readonly type: string;
  /** Always shown summary of the block */
  readonly summary: RichText;
  /** Content of the block */
  readonly blocks: ReadonlyArray<RichBlock>;
  /** Optional. True, if the content of the block is visible by default */
  readonly is_open?: true;
  readonly [key: string]: unknown;
}
export const RichBlockDetails: Schema.Codec<RichBlockDetails> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    summary: Schema.suspend((): Schema.Codec<RichText> => RichText),
    blocks: Schema.Array(Schema.suspend((): Schema.Codec<RichBlock> => RichBlock)),
    is_open: Schema.optionalKey(Schema.Literal(true)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A divider, corresponding to the HTML tag <hr/>. */
export interface RichBlockDivider {
  /** Type of the block, always “divider” */
  readonly type: string;
  readonly [key: string]: unknown;
}
export const RichBlockDivider: Schema.Codec<RichBlockDivider> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A block with a general file, corresponding to the custom HTML tag <tg-document>. */
export interface RichBlockDocument {
  /** Type of the block, always “document” */
  readonly type: string;
  /** The document */
  readonly document: Document;
  /** Optional. Caption of the block */
  readonly caption?: RichBlockCaption;
  readonly [key: string]: unknown;
}
export const RichBlockDocument: Schema.Codec<RichBlockDocument> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    document: Schema.suspend((): Schema.Codec<Document> => Document),
    caption: Schema.optionalKey(Schema.suspend((): Schema.Codec<RichBlockCaption> => RichBlockCaption)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A block quotation, corresponding to the HTML tag <blockquote> with custom attribute "expandable". */
export interface RichBlockExpandableBlockQuotation {
  /** Type of the block, always “expandable_blockquote” */
  readonly type: string;
  /** Content of the block */
  readonly text: RichText;
  /** Optional. Credit of the block */
  readonly credit?: RichText;
  readonly [key: string]: unknown;
}
export const RichBlockExpandableBlockQuotation: Schema.Codec<RichBlockExpandableBlockQuotation> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    text: Schema.suspend((): Schema.Codec<RichText> => RichText),
    credit: Schema.optionalKey(Schema.suspend((): Schema.Codec<RichText> => RichText)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A footer, corresponding to the HTML tag <footer>. */
export interface RichBlockFooter {
  /** Type of the block, always “footer” */
  readonly type: string;
  /** Text of the block */
  readonly text: RichText;
  readonly [key: string]: unknown;
}
export const RichBlockFooter: Schema.Codec<RichBlockFooter> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    text: Schema.suspend((): Schema.Codec<RichText> => RichText),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A list of blocks, corresponding to the HTML tag <ul> or <ol> with multiple nested tags <li>. */
export interface RichBlockList {
  /** Type of the block, always “list” */
  readonly type: string;
  /** Items of the list */
  readonly items: ReadonlyArray<RichBlockListItem>;
  readonly [key: string]: unknown;
}
export const RichBlockList: Schema.Codec<RichBlockList> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    items: Schema.Array(Schema.suspend((): Schema.Codec<RichBlockListItem> => RichBlockListItem)),
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
  readonly has_checkbox?: true;
  /** Optional. True, if the item has a checked checkbox */
  readonly is_checked?: true;
  /** Optional. For ordered lists, the numeric value of the item label */
  readonly value?: number;
  /** Optional. For ordered lists, the type of the item label; must be one of “a” for lowercase letters, “A” for uppercase letters, “i” for lowercase Roman numerals, “I” for uppercase Roman numerals, or “1” for decimal numbers */
  readonly type?: string;
  readonly [key: string]: unknown;
}
export const RichBlockListItem: Schema.Codec<RichBlockListItem> = Schema.StructWithRest(
  Schema.Struct({
    label: Schema.String,
    blocks: Schema.Array(Schema.suspend((): Schema.Codec<RichBlock> => RichBlock)),
    has_checkbox: Schema.optionalKey(Schema.Literal(true)),
    is_checked: Schema.optionalKey(Schema.Literal(true)),
    value: Schema.optionalKey(Schema.Int),
    type: Schema.optionalKey(Schema.String),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A block with a map, corresponding to the custom HTML tag <tg-map>. */
export interface RichBlockMap {
  /** Type of the block, always “map” */
  readonly type: string;
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
export const RichBlockMap: Schema.Codec<RichBlockMap> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    location: Schema.suspend((): Schema.Codec<Location> => Location),
    zoom: Schema.Int,
    width: Schema.Int,
    height: Schema.Int,
    caption: Schema.optionalKey(Schema.suspend((): Schema.Codec<RichBlockCaption> => RichBlockCaption)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A block with a mathematical expression in LaTeX format, corresponding to the custom HTML tag <tg-math-block>. */
export interface RichBlockMathematicalExpression {
  /** Type of the block, always “mathematical_expression” */
  readonly type: string;
  /** The mathematical expression in LaTeX format */
  readonly expression: string;
  readonly [key: string]: unknown;
}
export const RichBlockMathematicalExpression: Schema.Codec<RichBlockMathematicalExpression> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    expression: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A text paragraph, corresponding to the HTML tag <p>. */
export interface RichBlockParagraph {
  /** Type of the block, always “paragraph” */
  readonly type: string;
  /** Text of the block */
  readonly text: RichText;
  readonly [key: string]: unknown;
}
export const RichBlockParagraph: Schema.Codec<RichBlockParagraph> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    text: Schema.suspend((): Schema.Codec<RichText> => RichText),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A block with a photo, corresponding to the HTML tag <img>. */
export interface RichBlockPhoto {
  /** Type of the block, always “photo” */
  readonly type: string;
  /** Available sizes of the photo */
  readonly photo: ReadonlyArray<PhotoSize>;
  /** Optional. True, if the media preview is covered by a spoiler animation */
  readonly has_spoiler?: true;
  /** Optional. Caption of the block */
  readonly caption?: RichBlockCaption;
  readonly [key: string]: unknown;
}
export const RichBlockPhoto: Schema.Codec<RichBlockPhoto> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    photo: Schema.Array(Schema.suspend((): Schema.Codec<PhotoSize> => PhotoSize)),
    has_spoiler: Schema.optionalKey(Schema.Literal(true)),
    caption: Schema.optionalKey(Schema.suspend((): Schema.Codec<RichBlockCaption> => RichBlockCaption)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A preformatted text block, corresponding to the nested HTML tags <pre> and <code>. */
export interface RichBlockPreformatted {
  /** Type of the block, always “pre” */
  readonly type: string;
  /** Text of the block */
  readonly text: RichText;
  /** Optional. The programming language of the text */
  readonly language?: string;
  readonly [key: string]: unknown;
}
export const RichBlockPreformatted: Schema.Codec<RichBlockPreformatted> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    text: Schema.suspend((): Schema.Codec<RichText> => RichText),
    language: Schema.optionalKey(Schema.String),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A quotation with centered text, loosely corresponding to the HTML tag <aside>. */
export interface RichBlockPullQuotation {
  /** Type of the block, always “pullquote” */
  readonly type: string;
  /** Text of the block */
  readonly text: RichText;
  /** Optional. Credit of the block */
  readonly credit?: RichText;
  readonly [key: string]: unknown;
}
export const RichBlockPullQuotation: Schema.Codec<RichBlockPullQuotation> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    text: Schema.suspend((): Schema.Codec<RichText> => RichText),
    credit: Schema.optionalKey(Schema.suspend((): Schema.Codec<RichText> => RichText)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A section heading, corresponding to the HTML tags <h1>, <h2>, <h3>, <h4>, <h5>, or <h6>. */
export interface RichBlockSectionHeading {
  /** Type of the block, always “heading” */
  readonly type: string;
  /** Text of the block */
  readonly text: RichText;
  /** Relative size of the text font; 1-6, 1 is the largest, 6 is the smallest */
  readonly size: number;
  readonly [key: string]: unknown;
}
export const RichBlockSectionHeading: Schema.Codec<RichBlockSectionHeading> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    text: Schema.suspend((): Schema.Codec<RichText> => RichText),
    size: Schema.Int,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A slideshow, corresponding to the custom HTML tag <tg-slideshow>. */
export interface RichBlockSlideshow {
  /** Type of the block, always “slideshow” */
  readonly type: string;
  /** Elements of the slideshow */
  readonly blocks: ReadonlyArray<RichBlock>;
  /** Optional. Caption of the block */
  readonly caption?: RichBlockCaption;
  readonly [key: string]: unknown;
}
export const RichBlockSlideshow: Schema.Codec<RichBlockSlideshow> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    blocks: Schema.Array(Schema.suspend((): Schema.Codec<RichBlock> => RichBlock)),
    caption: Schema.optionalKey(Schema.suspend((): Schema.Codec<RichBlockCaption> => RichBlockCaption)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A table, corresponding to the HTML tag <table>. */
export interface RichBlockTable {
  /** Type of the block, always “table” */
  readonly type: string;
  /** Cells of the table */
  readonly cells: ReadonlyArray<ReadonlyArray<RichBlockTableCell>>;
  /** Optional. True, if the table has borders */
  readonly is_bordered?: true;
  /** Optional. True, if the table is striped */
  readonly is_striped?: true;
  /** Optional. True, if table cells have smaller indents */
  readonly is_compact?: true;
  /** Optional. Caption of the table */
  readonly caption?: RichText;
  readonly [key: string]: unknown;
}
export const RichBlockTable: Schema.Codec<RichBlockTable> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    cells: Schema.Array(Schema.Array(Schema.suspend((): Schema.Codec<RichBlockTableCell> => RichBlockTableCell))),
    is_bordered: Schema.optionalKey(Schema.Literal(true)),
    is_striped: Schema.optionalKey(Schema.Literal(true)),
    is_compact: Schema.optionalKey(Schema.Literal(true)),
    caption: Schema.optionalKey(Schema.suspend((): Schema.Codec<RichText> => RichText)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Cell in a table. */
export interface RichBlockTableCell {
  /** Optional. Text in the cell. If omitted, then the cell is invisible. */
  readonly text?: RichText;
  /** Optional. True, if the cell is a header cell */
  readonly is_header?: true;
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
export const RichBlockTableCell: Schema.Codec<RichBlockTableCell> = Schema.StructWithRest(
  Schema.Struct({
    text: Schema.optionalKey(Schema.suspend((): Schema.Codec<RichText> => RichText)),
    is_header: Schema.optionalKey(Schema.Literal(true)),
    colspan: Schema.optionalKey(Schema.Int),
    rowspan: Schema.optionalKey(Schema.Int),
    align: Schema.String,
    valign: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A block with a “Thinking…” placeholder, corresponding to the custom HTML tag <tg-thinking>. The block may be used only in sendRichMessageDraft, therefore it can't be received in messages. See https://t.me/addemoji/AIActions for examples of custom emoji that are recommended for usage in the block. */
export interface RichBlockThinking {
  /** Type of the block, always “thinking” */
  readonly type: string;
  /** Text of the block. See https://t.me/addemoji/AIActions for examples of custom emoji that are recommended for usage in the block. */
  readonly text: RichText;
  readonly [key: string]: unknown;
}
export const RichBlockThinking: Schema.Codec<RichBlockThinking> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    text: Schema.suspend((): Schema.Codec<RichText> => RichText),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A block with a video, corresponding to the HTML tag <video>. */
export interface RichBlockVideo {
  /** Type of the block, always “video” */
  readonly type: string;
  /** The video */
  readonly video: Video;
  /** Optional. True, if the media preview is covered by a spoiler animation */
  readonly has_spoiler?: true;
  /** Optional. Caption of the block */
  readonly caption?: RichBlockCaption;
  readonly [key: string]: unknown;
}
export const RichBlockVideo: Schema.Codec<RichBlockVideo> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    video: Schema.suspend((): Schema.Codec<Video> => Video),
    has_spoiler: Schema.optionalKey(Schema.Literal(true)),
    caption: Schema.optionalKey(Schema.suspend((): Schema.Codec<RichBlockCaption> => RichBlockCaption)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A block with a voice note, corresponding to the HTML tag <audio>. */
export interface RichBlockVoiceNote {
  /** Type of the block, always “voice_note” */
  readonly type: string;
  /** The voice note */
  readonly voice_note: Voice;
  /** Optional. Caption of the block */
  readonly caption?: RichBlockCaption;
  readonly [key: string]: unknown;
}
export const RichBlockVoiceNote: Schema.Codec<RichBlockVoiceNote> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    voice_note: Schema.suspend((): Schema.Codec<Voice> => Voice),
    caption: Schema.optionalKey(Schema.suspend((): Schema.Codec<RichBlockCaption> => RichBlockCaption)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Rich formatted message. */
export interface RichMessage {
  /** Content of the message */
  readonly blocks: ReadonlyArray<RichBlock>;
  /** Optional. True, if the rich message must be shown right-to-left */
  readonly is_rtl?: boolean;
  readonly [key: string]: unknown;
}
export const RichMessage: Schema.Codec<RichMessage> = Schema.StructWithRest(
  Schema.Struct({
    blocks: Schema.Array(Schema.suspend((): Schema.Codec<RichBlock> => RichBlock)),
    is_rtl: Schema.optionalKey(Schema.Boolean),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
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
  readonly callback_data?: string;
  /** Optional. Description of the Web App that will be launched when the user presses the button. The Web App will be able to send an arbitrary message on behalf of the user using the method answerWebAppQuery. Available only in private chats between a user and the bot. Not supported for messages sent on behalf of a business account. */
  readonly web_app?: WebAppInfo;
  /** Optional. An HTTPS URL used to automatically authorize the user. Can be used as a replacement for the Telegram Login Widget. Not supported for ephemeral messages. */
  readonly login_url?: LoginUrl;
  /** Optional. If set, pressing the button will prompt the user to select one of their chats, open that chat and insert the bot's username and the specified inline query in the input field. May be empty, in which case just the bot's username will be inserted. Not supported for messages sent in channel direct messages chats and on behalf of a business account. */
  readonly switch_inline_query?: string;
  /** Optional. If set, pressing the button will insert the bot's username and the specified inline query in the current chat's input field. May be empty, in which case only the bot's username will be inserted. Not supported in channels and for messages sent in channel direct messages chats and on behalf of a business account. */
  readonly switch_inline_query_current_chat?: string;
  /** Optional. If set, pressing the button will prompt the user to select one of their chats of the specified type, open that chat and insert the bot's username and the specified inline query in the input field. Not supported for messages sent in channel direct messages chats and on behalf of a business account. */
  readonly switch_inline_query_chosen_chat?: SwitchInlineQueryChosenChat;
  /** Optional. A button that copies the specified text to the clipboard */
  readonly copy_text?: CopyTextButton;
  /** Optional. If set, then the button is disabled and does nothing */
  readonly disabled?: DisabledButton;
  readonly [key: string]: unknown;
}
export const RichMessageButton: Schema.Codec<RichMessageButton> = Schema.StructWithRest(
  Schema.Struct({
    text: Schema.suspend((): Schema.Codec<RichText> => RichText),
    style: Schema.optionalKey(Schema.String),
    url: Schema.optionalKey(Schema.String),
    callback_data: Schema.optionalKey(Schema.String),
    web_app: Schema.optionalKey(Schema.suspend((): Schema.Codec<WebAppInfo> => WebAppInfo)),
    login_url: Schema.optionalKey(Schema.suspend((): Schema.Codec<LoginUrl> => LoginUrl)),
    switch_inline_query: Schema.optionalKey(Schema.String),
    switch_inline_query_current_chat: Schema.optionalKey(Schema.String),
    switch_inline_query_chosen_chat: Schema.optionalKey(Schema.suspend((): Schema.Codec<SwitchInlineQueryChosenChat> => SwitchInlineQueryChosenChat)),
    copy_text: Schema.optionalKey(Schema.suspend((): Schema.Codec<CopyTextButton> => CopyTextButton)),
    disabled: Schema.optionalKey(Schema.suspend((): Schema.Codec<DisabledButton> => DisabledButton)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object represents a rich formatted text. Currently, it can be either a String for plain text, an Array of RichText, or any of the following types: */
export type RichText = RichTextBold | RichTextItalic | RichTextUnderline | RichTextStrikethrough | RichTextSpoiler | RichTextDateTime | RichTextTextMention | RichTextSubscript | RichTextSuperscript | RichTextMarked | RichTextCode | RichTextCustomEmoji | RichTextMathematicalExpression | RichTextUrl | RichTextEmailAddress | RichTextPhoneNumber | RichTextBankCardNumber | RichTextMention | RichTextHashtag | RichTextCashtag | RichTextBotCommand | RichTextButton | RichTextAnchor | RichTextAnchorLink | RichTextReference | RichTextReferenceLink;
export const RichText: Schema.Codec<RichText> = Schema.Union([Schema.suspend((): Schema.Codec<RichTextBold> => RichTextBold), Schema.suspend((): Schema.Codec<RichTextItalic> => RichTextItalic), Schema.suspend((): Schema.Codec<RichTextUnderline> => RichTextUnderline), Schema.suspend((): Schema.Codec<RichTextStrikethrough> => RichTextStrikethrough), Schema.suspend((): Schema.Codec<RichTextSpoiler> => RichTextSpoiler), Schema.suspend((): Schema.Codec<RichTextDateTime> => RichTextDateTime), Schema.suspend((): Schema.Codec<RichTextTextMention> => RichTextTextMention), Schema.suspend((): Schema.Codec<RichTextSubscript> => RichTextSubscript), Schema.suspend((): Schema.Codec<RichTextSuperscript> => RichTextSuperscript), Schema.suspend((): Schema.Codec<RichTextMarked> => RichTextMarked), Schema.suspend((): Schema.Codec<RichTextCode> => RichTextCode), Schema.suspend((): Schema.Codec<RichTextCustomEmoji> => RichTextCustomEmoji), Schema.suspend((): Schema.Codec<RichTextMathematicalExpression> => RichTextMathematicalExpression), Schema.suspend((): Schema.Codec<RichTextUrl> => RichTextUrl), Schema.suspend((): Schema.Codec<RichTextEmailAddress> => RichTextEmailAddress), Schema.suspend((): Schema.Codec<RichTextPhoneNumber> => RichTextPhoneNumber), Schema.suspend((): Schema.Codec<RichTextBankCardNumber> => RichTextBankCardNumber), Schema.suspend((): Schema.Codec<RichTextMention> => RichTextMention), Schema.suspend((): Schema.Codec<RichTextHashtag> => RichTextHashtag), Schema.suspend((): Schema.Codec<RichTextCashtag> => RichTextCashtag), Schema.suspend((): Schema.Codec<RichTextBotCommand> => RichTextBotCommand), Schema.suspend((): Schema.Codec<RichTextButton> => RichTextButton), Schema.suspend((): Schema.Codec<RichTextAnchor> => RichTextAnchor), Schema.suspend((): Schema.Codec<RichTextAnchorLink> => RichTextAnchorLink), Schema.suspend((): Schema.Codec<RichTextReference> => RichTextReference), Schema.suspend((): Schema.Codec<RichTextReferenceLink> => RichTextReferenceLink)]);

/** An anchor. */
export interface RichTextAnchor {
  /** Type of the rich text, always “anchor” */
  readonly type: string;
  /** The name of the anchor */
  readonly name: string;
  readonly [key: string]: unknown;
}
export const RichTextAnchor: Schema.Codec<RichTextAnchor> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    name: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A link to an anchor. */
export interface RichTextAnchorLink {
  /** Type of the rich text, always “anchor_link” */
  readonly type: string;
  /** The link text */
  readonly text: RichText;
  /** The name of the anchor. If the name is empty, then the link brings back to the top of the message. */
  readonly anchor_name: string;
  readonly [key: string]: unknown;
}
export const RichTextAnchorLink: Schema.Codec<RichTextAnchorLink> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    text: Schema.suspend((): Schema.Codec<RichText> => RichText),
    anchor_name: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A text with a bank card number. */
export interface RichTextBankCardNumber {
  /** Type of the rich text, always “bank_card_number” */
  readonly type: string;
  /** The text */
  readonly text: RichText;
  /** The bank card number */
  readonly bank_card_number: string;
  readonly [key: string]: unknown;
}
export const RichTextBankCardNumber: Schema.Codec<RichTextBankCardNumber> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    text: Schema.suspend((): Schema.Codec<RichText> => RichText),
    bank_card_number: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A bold text. */
export interface RichTextBold {
  /** Type of the rich text, always “bold” */
  readonly type: string;
  /** The text */
  readonly text: RichText;
  readonly [key: string]: unknown;
}
export const RichTextBold: Schema.Codec<RichTextBold> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    text: Schema.suspend((): Schema.Codec<RichText> => RichText),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A bot command. */
export interface RichTextBotCommand {
  /** Type of the rich text, always “bot_command” */
  readonly type: string;
  /** The text */
  readonly text: RichText;
  /** The bot command */
  readonly bot_command: string;
  readonly [key: string]: unknown;
}
export const RichTextBotCommand: Schema.Codec<RichTextBotCommand> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    text: Schema.suspend((): Schema.Codec<RichText> => RichText),
    bot_command: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A button. */
export interface RichTextButton {
  /** Type of the rich text, always “button” */
  readonly type: string;
  /** The button */
  readonly button: RichMessageButton;
  readonly [key: string]: unknown;
}
export const RichTextButton: Schema.Codec<RichTextButton> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    button: Schema.suspend((): Schema.Codec<RichMessageButton> => RichMessageButton),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A cashtag. */
export interface RichTextCashtag {
  /** Type of the rich text, always “cashtag” */
  readonly type: string;
  /** The text */
  readonly text: RichText;
  /** The cashtag */
  readonly cashtag: string;
  readonly [key: string]: unknown;
}
export const RichTextCashtag: Schema.Codec<RichTextCashtag> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    text: Schema.suspend((): Schema.Codec<RichText> => RichText),
    cashtag: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A monowidth text. */
export interface RichTextCode {
  /** Type of the rich text, always “code” */
  readonly type: string;
  /** The text */
  readonly text: RichText;
  readonly [key: string]: unknown;
}
export const RichTextCode: Schema.Codec<RichTextCode> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    text: Schema.suspend((): Schema.Codec<RichText> => RichText),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A custom emoji. */
export interface RichTextCustomEmoji {
  /** Type of the rich text, always “custom_emoji” */
  readonly type: string;
  /** Unique identifier of the custom emoji. Use getCustomEmojiStickers to get full information about the sticker. */
  readonly custom_emoji_id: string;
  /** Alternative emoji for the custom emoji */
  readonly alternative_text: string;
  readonly [key: string]: unknown;
}
export const RichTextCustomEmoji: Schema.Codec<RichTextCustomEmoji> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    custom_emoji_id: Schema.String,
    alternative_text: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Formatted date and time. */
export interface RichTextDateTime {
  /** Type of the rich text, always “date_time” */
  readonly type: string;
  /** The text */
  readonly text: RichText;
  /** The Unix time associated with the entity */
  readonly unix_time: number;
  /** The string that defines the formatting of the date and time. See date-time entity formatting for more details. */
  readonly date_time_format: string;
  readonly [key: string]: unknown;
}
export const RichTextDateTime: Schema.Codec<RichTextDateTime> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    text: Schema.suspend((): Schema.Codec<RichText> => RichText),
    unix_time: Schema.Int,
    date_time_format: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A text with an email address. */
export interface RichTextEmailAddress {
  /** Type of the rich text, always “email_address” */
  readonly type: string;
  /** The text */
  readonly text: RichText;
  /** The email address */
  readonly email_address: string;
  readonly [key: string]: unknown;
}
export const RichTextEmailAddress: Schema.Codec<RichTextEmailAddress> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    text: Schema.suspend((): Schema.Codec<RichText> => RichText),
    email_address: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A hashtag. */
export interface RichTextHashtag {
  /** Type of the rich text, always “hashtag” */
  readonly type: string;
  /** The text */
  readonly text: RichText;
  /** The hashtag */
  readonly hashtag: string;
  readonly [key: string]: unknown;
}
export const RichTextHashtag: Schema.Codec<RichTextHashtag> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    text: Schema.suspend((): Schema.Codec<RichText> => RichText),
    hashtag: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** An italicized text. */
export interface RichTextItalic {
  /** Type of the rich text, always “italic” */
  readonly type: string;
  /** The text */
  readonly text: RichText;
  readonly [key: string]: unknown;
}
export const RichTextItalic: Schema.Codec<RichTextItalic> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    text: Schema.suspend((): Schema.Codec<RichText> => RichText),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A marked text. */
export interface RichTextMarked {
  /** Type of the rich text, always “marked” */
  readonly type: string;
  /** The text */
  readonly text: RichText;
  readonly [key: string]: unknown;
}
export const RichTextMarked: Schema.Codec<RichTextMarked> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    text: Schema.suspend((): Schema.Codec<RichText> => RichText),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A mathematical expression. */
export interface RichTextMathematicalExpression {
  /** Type of the rich text, always “mathematical_expression” */
  readonly type: string;
  /** The expression in LaTeX format */
  readonly expression: string;
  readonly [key: string]: unknown;
}
export const RichTextMathematicalExpression: Schema.Codec<RichTextMathematicalExpression> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    expression: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A mention by a username. */
export interface RichTextMention {
  /** Type of the rich text, always “mention” */
  readonly type: string;
  /** The text */
  readonly text: RichText;
  /** The username */
  readonly username: string;
  readonly [key: string]: unknown;
}
export const RichTextMention: Schema.Codec<RichTextMention> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    text: Schema.suspend((): Schema.Codec<RichText> => RichText),
    username: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A text with a phone number. */
export interface RichTextPhoneNumber {
  /** Type of the rich text, always “phone_number” */
  readonly type: string;
  /** The text */
  readonly text: RichText;
  /** The phone number */
  readonly phone_number: string;
  readonly [key: string]: unknown;
}
export const RichTextPhoneNumber: Schema.Codec<RichTextPhoneNumber> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    text: Schema.suspend((): Schema.Codec<RichText> => RichText),
    phone_number: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A reference. */
export interface RichTextReference {
  /** Type of the rich text, always “reference” */
  readonly type: string;
  /** Text of the reference */
  readonly text: RichText;
  /** The name of the reference */
  readonly name: string;
  readonly [key: string]: unknown;
}
export const RichTextReference: Schema.Codec<RichTextReference> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    text: Schema.suspend((): Schema.Codec<RichText> => RichText),
    name: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A link to a reference. */
export interface RichTextReferenceLink {
  /** Type of the rich text, always “reference_link” */
  readonly type: string;
  /** The link text */
  readonly text: RichText;
  /** The name of the reference */
  readonly reference_name: string;
  readonly [key: string]: unknown;
}
export const RichTextReferenceLink: Schema.Codec<RichTextReferenceLink> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    text: Schema.suspend((): Schema.Codec<RichText> => RichText),
    reference_name: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A text covered by a spoiler. */
export interface RichTextSpoiler {
  /** Type of the rich text, always “spoiler” */
  readonly type: string;
  /** The text */
  readonly text: RichText;
  readonly [key: string]: unknown;
}
export const RichTextSpoiler: Schema.Codec<RichTextSpoiler> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    text: Schema.suspend((): Schema.Codec<RichText> => RichText),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A strikethrough text. */
export interface RichTextStrikethrough {
  /** Type of the rich text, always “strikethrough” */
  readonly type: string;
  /** The text */
  readonly text: RichText;
  readonly [key: string]: unknown;
}
export const RichTextStrikethrough: Schema.Codec<RichTextStrikethrough> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    text: Schema.suspend((): Schema.Codec<RichText> => RichText),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A subscript text. */
export interface RichTextSubscript {
  /** Type of the rich text, always “subscript” */
  readonly type: string;
  /** The text */
  readonly text: RichText;
  readonly [key: string]: unknown;
}
export const RichTextSubscript: Schema.Codec<RichTextSubscript> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    text: Schema.suspend((): Schema.Codec<RichText> => RichText),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A superscript text. */
export interface RichTextSuperscript {
  /** Type of the rich text, always “superscript” */
  readonly type: string;
  /** The text */
  readonly text: RichText;
  readonly [key: string]: unknown;
}
export const RichTextSuperscript: Schema.Codec<RichTextSuperscript> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    text: Schema.suspend((): Schema.Codec<RichText> => RichText),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A mention of a Telegram user by their identifier. */
export interface RichTextTextMention {
  /** Type of the rich text, always “text_mention” */
  readonly type: string;
  /** The text */
  readonly text: RichText;
  /** The mentioned user */
  readonly user: User;
  readonly [key: string]: unknown;
}
export const RichTextTextMention: Schema.Codec<RichTextTextMention> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    text: Schema.suspend((): Schema.Codec<RichText> => RichText),
    user: Schema.suspend((): Schema.Codec<User> => User),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** An underlined text. */
export interface RichTextUnderline {
  /** Type of the rich text, always “underline” */
  readonly type: string;
  /** The text */
  readonly text: RichText;
  readonly [key: string]: unknown;
}
export const RichTextUnderline: Schema.Codec<RichTextUnderline> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    text: Schema.suspend((): Schema.Codec<RichText> => RichText),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** A text with a link. */
export interface RichTextUrl {
  /** Type of the rich text, always “url” */
  readonly type: string;
  /** The text */
  readonly text: RichText;
  /** URL of the link */
  readonly url: string;
  readonly [key: string]: unknown;
}
export const RichTextUrl: Schema.Codec<RichTextUrl> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    text: Schema.suspend((): Schema.Codec<RichText> => RichText),
    url: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Describes an inline message sent by a guest bot. */
export interface SentGuestMessage {
  /** Identifier of the sent inline message */
  readonly inline_message_id: string;
  readonly [key: string]: unknown;
}
export const SentGuestMessage: Schema.Codec<SentGuestMessage> = Schema.StructWithRest(
  Schema.Struct({
    inline_message_id: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Describes an inline message sent by a Web App on behalf of a user. */
export interface SentWebAppMessage {
  /** Optional. Identifier of the sent inline message. Available only if there is an inline keyboard attached to the message. */
  readonly inline_message_id?: string;
  readonly [key: string]: unknown;
}
export const SentWebAppMessage: Schema.Codec<SentWebAppMessage> = Schema.StructWithRest(
  Schema.Struct({
    inline_message_id: Schema.optionalKey(Schema.String),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object contains information about a user that was shared with the bot using a KeyboardButtonRequestUsers button. */
export interface SharedUser {
  /** Identifier of the shared user. This number may have more than 32 significant bits and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so 64-bit integers or double-precision float types are safe for storing these identifiers. The bot may not have access to the user and could be unable to use this identifier, unless the user is already known to the bot by some other means. */
  readonly user_id: number;
  /** Optional. First name of the user, if the name was requested by the bot */
  readonly first_name?: string;
  /** Optional. Last name of the user, if the name was requested by the bot */
  readonly last_name?: string;
  /** Optional. Username of the user, if the username was requested by the bot */
  readonly username?: string;
  /** Optional. Available sizes of the chat photo, if the photo was requested by the bot */
  readonly photo?: ReadonlyArray<PhotoSize>;
  readonly [key: string]: unknown;
}
export const SharedUser: Schema.Codec<SharedUser> = Schema.StructWithRest(
  Schema.Struct({
    user_id: Schema.Int,
    first_name: Schema.optionalKey(Schema.String),
    last_name: Schema.optionalKey(Schema.String),
    username: Schema.optionalKey(Schema.String),
    photo: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<PhotoSize> => PhotoSize))),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object represents a shipping address. */
export interface ShippingAddress {
  /** Two-letter ISO 3166-1 alpha-2 country code */
  readonly country_code: string;
  /** State, if applicable */
  readonly state: string;
  /** City */
  readonly city: string;
  /** First line for the address */
  readonly street_line1: string;
  /** Second line for the address */
  readonly street_line2: string;
  /** Address post code */
  readonly post_code: string;
  readonly [key: string]: unknown;
}
export const ShippingAddress: Schema.Codec<ShippingAddress> = Schema.StructWithRest(
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
export const ShippingOption: Schema.Codec<ShippingOption> = Schema.StructWithRest(
  Schema.Struct({
    id: Schema.String,
    title: Schema.String,
    prices: Schema.Array(Schema.suspend((): Schema.Codec<LabeledPrice> => LabeledPrice)),
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
  readonly invoice_payload: string;
  /** User specified shipping address */
  readonly shipping_address: ShippingAddress;
  readonly [key: string]: unknown;
}
export const ShippingQuery: Schema.Codec<ShippingQuery> = Schema.StructWithRest(
  Schema.Struct({
    id: Schema.String,
    from: Schema.suspend((): Schema.Codec<User> => User),
    invoice_payload: Schema.String,
    shipping_address: Schema.suspend((): Schema.Codec<ShippingAddress> => ShippingAddress),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Describes an amount of Telegram Stars. */
export interface StarAmount {
  /** Integer amount of Telegram Stars, rounded to 0; can be negative */
  readonly amount: number;
  /** Optional. The number of 1/1000000000 shares of Telegram Stars; from -999999999 to 999999999; can be negative if and only if amount is non-positive */
  readonly nanostar_amount?: number;
  readonly [key: string]: unknown;
}
export const StarAmount: Schema.Codec<StarAmount> = Schema.StructWithRest(
  Schema.Struct({
    amount: Schema.Int,
    nanostar_amount: Schema.optionalKey(Schema.Int),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Describes a Telegram Star transaction. Note that if the buyer initiates a chargeback with the payment provider from whom they acquired Stars (e.g., Apple, Google) following this transaction, the refunded Stars will be deducted from the bot's balance. This is outside of Telegram's control. */
export interface StarTransaction {
  /** Unique identifier of the transaction. Coincides with the identifier of the original transaction for refund transactions. Coincides with SuccessfulPayment.telegram_payment_charge_id for successful incoming payments from users. */
  readonly id: string;
  /** Integer amount of Telegram Stars transferred by the transaction */
  readonly amount: number;
  /** Optional. The number of 1/1000000000 shares of Telegram Stars transferred by the transaction; from 0 to 999999999 */
  readonly nanostar_amount?: number;
  /** Date the transaction was created in Unix time */
  readonly date: number;
  /** Optional. Source of an incoming transaction (e.g., a user purchasing goods or services, Fragment refunding a failed withdrawal). Only for incoming transactions. */
  readonly source?: TransactionPartner;
  /** Optional. Receiver of an outgoing transaction (e.g., a user for a purchase refund, Fragment for a withdrawal). Only for outgoing transactions. */
  readonly receiver?: TransactionPartner;
  readonly [key: string]: unknown;
}
export const StarTransaction: Schema.Codec<StarTransaction> = Schema.StructWithRest(
  Schema.Struct({
    id: Schema.String,
    amount: Schema.Int,
    nanostar_amount: Schema.optionalKey(Schema.Int),
    date: Schema.Int,
    source: Schema.optionalKey(Schema.suspend((): Schema.Codec<TransactionPartner> => TransactionPartner)),
    receiver: Schema.optionalKey(Schema.suspend((): Schema.Codec<TransactionPartner> => TransactionPartner)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Contains a list of Telegram Star transactions. */
export interface StarTransactions {
  /** The list of transactions */
  readonly transactions: ReadonlyArray<StarTransaction>;
  readonly [key: string]: unknown;
}
export const StarTransactions: Schema.Codec<StarTransactions> = Schema.StructWithRest(
  Schema.Struct({
    transactions: Schema.Array(Schema.suspend((): Schema.Codec<StarTransaction> => StarTransaction)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object represents a sticker. */
export interface Sticker {
  /** Identifier for this file, which can be used to download or reuse the file */
  readonly file_id: string;
  /** Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file. */
  readonly file_unique_id: string;
  /** Type of the sticker, currently one of “regular”, “mask”, “custom_emoji”. The type of the sticker is independent from its format, which is determined by the fields is_animated and is_video. */
  readonly type: StickerType;
  /** Sticker width */
  readonly width: number;
  /** Sticker height */
  readonly height: number;
  /** True, if the sticker is animated */
  readonly is_animated: boolean;
  /** True, if the sticker is a video sticker */
  readonly is_video: boolean;
  /** Optional. Sticker thumbnail in the .WEBP or .JPG format */
  readonly thumbnail?: PhotoSize;
  /** Optional. Emoji associated with the sticker */
  readonly emoji?: string;
  /** Optional. Name of the sticker set to which the sticker belongs */
  readonly set_name?: string;
  /** Optional. For premium regular stickers, premium animation for the sticker */
  readonly premium_animation?: File;
  /** Optional. For mask stickers, the position where the mask should be placed */
  readonly mask_position?: MaskPosition;
  /** Optional. For custom emoji stickers, unique identifier of the custom emoji */
  readonly custom_emoji_id?: string;
  /** Optional. True, if the sticker must be repainted to a text color in messages, the color of the Telegram Premium badge in emoji status, white color on chat photos, or another appropriate color in other places */
  readonly needs_repainting?: true;
  /** Optional. File size in bytes */
  readonly file_size?: number;
  readonly [key: string]: unknown;
}
export const Sticker: Schema.Codec<Sticker> = Schema.StructWithRest(
  Schema.Struct({
    file_id: Schema.String,
    file_unique_id: Schema.String,
    type: Schema.suspend((): Schema.Codec<StickerType> => StickerType),
    width: Schema.Int,
    height: Schema.Int,
    is_animated: Schema.Boolean,
    is_video: Schema.Boolean,
    thumbnail: Schema.optionalKey(Schema.suspend((): Schema.Codec<PhotoSize> => PhotoSize)),
    emoji: Schema.optionalKey(Schema.String),
    set_name: Schema.optionalKey(Schema.String),
    premium_animation: Schema.optionalKey(Schema.suspend((): Schema.Codec<File> => File)),
    mask_position: Schema.optionalKey(Schema.suspend((): Schema.Codec<MaskPosition> => MaskPosition)),
    custom_emoji_id: Schema.optionalKey(Schema.String),
    needs_repainting: Schema.optionalKey(Schema.Literal(true)),
    file_size: Schema.optionalKey(Schema.Int),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object represents a sticker set. */
export interface StickerSet {
  /** Sticker set name */
  readonly name: string;
  /** Sticker set title */
  readonly title: string;
  /** Type of stickers in the set, currently one of “regular”, “mask”, “custom_emoji” */
  readonly sticker_type: StickerType;
  /** List of all set stickers */
  readonly stickers: ReadonlyArray<Sticker>;
  /** Optional. Sticker set thumbnail in the .WEBP, .TGS, or .WEBM format */
  readonly thumbnail?: PhotoSize;
  readonly [key: string]: unknown;
}
export const StickerSet: Schema.Codec<StickerSet> = Schema.StructWithRest(
  Schema.Struct({
    name: Schema.String,
    title: Schema.String,
    sticker_type: Schema.suspend((): Schema.Codec<StickerType> => StickerType),
    stickers: Schema.Array(Schema.suspend((): Schema.Codec<Sticker> => Sticker)),
    thumbnail: Schema.optionalKey(Schema.suspend((): Schema.Codec<PhotoSize> => PhotoSize)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object represents a story. */
export interface Story {
  /** Chat that posted the story */
  readonly chat: Chat;
  /** Unique identifier for the story in the chat */
  readonly id: number;
  readonly [key: string]: unknown;
}
export const Story: Schema.Codec<Story> = Schema.StructWithRest(
  Schema.Struct({
    chat: Schema.suspend((): Schema.Codec<Chat> => Chat),
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
export const StoryArea: Schema.Codec<StoryArea> = Schema.StructWithRest(
  Schema.Struct({
    position: Schema.suspend((): Schema.Codec<StoryAreaPosition> => StoryAreaPosition),
    type: Schema.suspend((): Schema.Codec<StoryAreaType> => StoryAreaType),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Describes the position of a clickable area within a story. */
export interface StoryAreaPosition {
  /** The abscissa of the area's center, as a percentage of the media width */
  readonly x_percentage: number;
  /** The ordinate of the area's center, as a percentage of the media height */
  readonly y_percentage: number;
  /** The width of the area's rectangle, as a percentage of the media width */
  readonly width_percentage: number;
  /** The height of the area's rectangle, as a percentage of the media height */
  readonly height_percentage: number;
  /** The clockwise rotation angle of the rectangle, in degrees; 0-360 */
  readonly rotation_angle: number;
  /** The radius of the rectangle corner rounding, as a percentage of the media width */
  readonly corner_radius_percentage: number;
  readonly [key: string]: unknown;
}
export const StoryAreaPosition: Schema.Codec<StoryAreaPosition> = Schema.StructWithRest(
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

/** Describes the type of a clickable area on a story. Currently, it can be one of */
export type StoryAreaType = StoryAreaTypeLocation | StoryAreaTypeSuggestedReaction | StoryAreaTypeLink | StoryAreaTypeWeather | StoryAreaTypeUniqueGift;
export const StoryAreaType: Schema.Codec<StoryAreaType> = Schema.Union([Schema.suspend((): Schema.Codec<StoryAreaTypeLocation> => StoryAreaTypeLocation), Schema.suspend((): Schema.Codec<StoryAreaTypeSuggestedReaction> => StoryAreaTypeSuggestedReaction), Schema.suspend((): Schema.Codec<StoryAreaTypeLink> => StoryAreaTypeLink), Schema.suspend((): Schema.Codec<StoryAreaTypeWeather> => StoryAreaTypeWeather), Schema.suspend((): Schema.Codec<StoryAreaTypeUniqueGift> => StoryAreaTypeUniqueGift)]);

/** Describes a story area pointing to an HTTP or tg:// link. Currently, a story can have up to 3 link areas. */
export interface StoryAreaTypeLink {
  /** Type of the area, always “link” */
  readonly type: string;
  /** HTTP or tg:// URL to be opened when the area is clicked */
  readonly url: string;
  readonly [key: string]: unknown;
}
export const StoryAreaTypeLink: Schema.Codec<StoryAreaTypeLink> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    url: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Describes a story area pointing to a location. Currently, a story can have up to 10 location areas. */
export interface StoryAreaTypeLocation {
  /** Type of the area, always “location” */
  readonly type: string;
  /** Location latitude in degrees */
  readonly latitude: number;
  /** Location longitude in degrees */
  readonly longitude: number;
  /** Optional. Address of the location */
  readonly address?: LocationAddress;
  readonly [key: string]: unknown;
}
export const StoryAreaTypeLocation: Schema.Codec<StoryAreaTypeLocation> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    latitude: Schema.Number,
    longitude: Schema.Number,
    address: Schema.optionalKey(Schema.suspend((): Schema.Codec<LocationAddress> => LocationAddress)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Describes a story area pointing to a suggested reaction. Currently, a story can have up to 5 suggested reaction areas. */
export interface StoryAreaTypeSuggestedReaction {
  /** Type of the area, always “suggested_reaction” */
  readonly type: string;
  /** Type of the reaction */
  readonly reaction_type: ReactionType;
  /** Optional. Pass True if the reaction area has a dark background */
  readonly is_dark?: boolean;
  /** Optional. Pass True if reaction area corner is flipped */
  readonly is_flipped?: boolean;
  readonly [key: string]: unknown;
}
export const StoryAreaTypeSuggestedReaction: Schema.Codec<StoryAreaTypeSuggestedReaction> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    reaction_type: Schema.suspend((): Schema.Codec<ReactionType> => ReactionType),
    is_dark: Schema.optionalKey(Schema.Boolean),
    is_flipped: Schema.optionalKey(Schema.Boolean),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Describes a story area pointing to a unique gift. Currently, a story can have at most 1 unique gift area. */
export interface StoryAreaTypeUniqueGift {
  /** Type of the area, always “unique_gift” */
  readonly type: string;
  /** Unique name of the gift */
  readonly name: string;
  readonly [key: string]: unknown;
}
export const StoryAreaTypeUniqueGift: Schema.Codec<StoryAreaTypeUniqueGift> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    name: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Describes a story area containing weather information. Currently, a story can have up to 3 weather areas. */
export interface StoryAreaTypeWeather {
  /** Type of the area, always “weather” */
  readonly type: string;
  /** Temperature, in degree Celsius */
  readonly temperature: number;
  /** Emoji representing the weather */
  readonly emoji: string;
  /** A color of the area background in the ARGB format */
  readonly background_color: number;
  readonly [key: string]: unknown;
}
export const StoryAreaTypeWeather: Schema.Codec<StoryAreaTypeWeather> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    temperature: Schema.Number,
    emoji: Schema.String,
    background_color: Schema.Int,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object contains basic information about a successful payment. Note that if the buyer initiates a chargeback with the relevant payment provider following this transaction, the funds may be debited from your balance. This is outside of Telegram's control. */
export interface SuccessfulPayment {
  /** Three-letter ISO 4217 currency code, or “XTR” for payments in Telegram Stars */
  readonly currency: string;
  /** Total price in the smallest units of the currency (integer, not float/double). For example, for a price of US$ 1.45 pass amount = 145. See the exp parameter in currencies.json, it shows the number of digits past the decimal point for each currency (2 for the majority of currencies). */
  readonly total_amount: number;
  /** Bot-specified invoice payload */
  readonly invoice_payload: string;
  /** Optional. Expiration date of the subscription, in Unix time; for recurring payments only */
  readonly subscription_expiration_date?: number;
  /** Optional. True, if the payment is a recurring payment for a subscription */
  readonly is_recurring?: true;
  /** Optional. True, if the payment is the first payment for a subscription */
  readonly is_first_recurring?: true;
  /** Optional. Identifier of the shipping option chosen by the user */
  readonly shipping_option_id?: string;
  /** Optional. Order information provided by the user */
  readonly order_info?: OrderInfo;
  /** Telegram payment identifier */
  readonly telegram_payment_charge_id: string;
  /** Provider payment identifier */
  readonly provider_payment_charge_id: string;
  readonly [key: string]: unknown;
}
export const SuccessfulPayment: Schema.Codec<SuccessfulPayment> = Schema.StructWithRest(
  Schema.Struct({
    currency: Schema.String,
    total_amount: Schema.Int,
    invoice_payload: Schema.String,
    subscription_expiration_date: Schema.optionalKey(Schema.Int),
    is_recurring: Schema.optionalKey(Schema.Literal(true)),
    is_first_recurring: Schema.optionalKey(Schema.Literal(true)),
    shipping_option_id: Schema.optionalKey(Schema.String),
    order_info: Schema.optionalKey(Schema.suspend((): Schema.Codec<OrderInfo> => OrderInfo)),
    telegram_payment_charge_id: Schema.String,
    provider_payment_charge_id: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Describes a service message about the failed approval of a suggested post. Currently, only caused by insufficient user funds at the time of approval. */
export interface SuggestedPostApprovalFailed {
  /** Optional. Message containing the suggested post whose approval has failed. Note that the Message object in this field will not contain the reply_to_message field even if it itself is a reply. */
  readonly suggested_post_message?: Message;
  /** Expected price of the post */
  readonly price: SuggestedPostPrice;
  readonly [key: string]: unknown;
}
export const SuggestedPostApprovalFailed: Schema.Codec<SuggestedPostApprovalFailed> = Schema.StructWithRest(
  Schema.Struct({
    suggested_post_message: Schema.optionalKey(Schema.suspend((): Schema.Codec<Message> => Message)),
    price: Schema.suspend((): Schema.Codec<SuggestedPostPrice> => SuggestedPostPrice),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Describes a service message about the approval of a suggested post. */
export interface SuggestedPostApproved {
  /** Optional. Message containing the suggested post. Note that the Message object in this field will not contain the reply_to_message field even if it itself is a reply. */
  readonly suggested_post_message?: Message;
  /** Optional. Amount paid for the post */
  readonly price?: SuggestedPostPrice;
  /** Date when the post will be published */
  readonly send_date: number;
  readonly [key: string]: unknown;
}
export const SuggestedPostApproved: Schema.Codec<SuggestedPostApproved> = Schema.StructWithRest(
  Schema.Struct({
    suggested_post_message: Schema.optionalKey(Schema.suspend((): Schema.Codec<Message> => Message)),
    price: Schema.optionalKey(Schema.suspend((): Schema.Codec<SuggestedPostPrice> => SuggestedPostPrice)),
    send_date: Schema.Int,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Describes a service message about the rejection of a suggested post. */
export interface SuggestedPostDeclined {
  /** Optional. Message containing the suggested post. Note that the Message object in this field will not contain the reply_to_message field even if it itself is a reply. */
  readonly suggested_post_message?: Message;
  /** Optional. Comment with which the post was declined */
  readonly comment?: string;
  readonly [key: string]: unknown;
}
export const SuggestedPostDeclined: Schema.Codec<SuggestedPostDeclined> = Schema.StructWithRest(
  Schema.Struct({
    suggested_post_message: Schema.optionalKey(Schema.suspend((): Schema.Codec<Message> => Message)),
    comment: Schema.optionalKey(Schema.String),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Contains information about a suggested post. */
export interface SuggestedPostInfo {
  /** State of the suggested post. Currently, it can be one of “pending”, “approved”, “declined”. */
  readonly state: string;
  /** Optional. Proposed price of the post. If the field is omitted, then the post is unpaid. */
  readonly price?: SuggestedPostPrice;
  /** Optional. Proposed send date of the post. If the field is omitted, then the post can be published at any time within 30 days at the sole discretion of the user or administrator who approves it. */
  readonly send_date?: number;
  readonly [key: string]: unknown;
}
export const SuggestedPostInfo: Schema.Codec<SuggestedPostInfo> = Schema.StructWithRest(
  Schema.Struct({
    state: Schema.String,
    price: Schema.optionalKey(Schema.suspend((): Schema.Codec<SuggestedPostPrice> => SuggestedPostPrice)),
    send_date: Schema.optionalKey(Schema.Int),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Describes a service message about a successful payment for a suggested post. */
export interface SuggestedPostPaid {
  /** Optional. Message containing the suggested post. Note that the Message object in this field will not contain the reply_to_message field even if it itself is a reply. */
  readonly suggested_post_message?: Message;
  /** Currency in which the payment was made. Currently, one of “XTR” for Telegram Stars or “TON” for TON grams. */
  readonly currency: string;
  /** Optional. The amount of the currency that was received by the channel in nanograms; for payments in TON grams only */
  readonly amount?: number;
  /** Optional. The amount of Telegram Stars that was received by the channel; for payments in Telegram Stars only */
  readonly star_amount?: StarAmount;
  readonly [key: string]: unknown;
}
export const SuggestedPostPaid: Schema.Codec<SuggestedPostPaid> = Schema.StructWithRest(
  Schema.Struct({
    suggested_post_message: Schema.optionalKey(Schema.suspend((): Schema.Codec<Message> => Message)),
    currency: Schema.String,
    amount: Schema.optionalKey(Schema.Int),
    star_amount: Schema.optionalKey(Schema.suspend((): Schema.Codec<StarAmount> => StarAmount)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Contains parameters of a post that is being suggested by the bot. */
export interface SuggestedPostParameters {
  /** Optional. Proposed price for the post. If the field is omitted, then the post is unpaid. */
  readonly price?: SuggestedPostPrice;
  /** Optional. Proposed send date of the post. If specified, then the date must be between 300 second and 2678400 seconds (30 days) in the future. If the field is omitted, then the post can be published at any time within 30 days at the sole discretion of the user who approves it. */
  readonly send_date?: number;
  readonly [key: string]: unknown;
}
export const SuggestedPostParameters: Schema.Codec<SuggestedPostParameters> = Schema.StructWithRest(
  Schema.Struct({
    price: Schema.optionalKey(Schema.suspend((): Schema.Codec<SuggestedPostPrice> => SuggestedPostPrice)),
    send_date: Schema.optionalKey(Schema.Int),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Describes the price of a suggested post. */
export interface SuggestedPostPrice {
  /** Currency in which the post will be paid. Currently, must be one of “XTR” for Telegram Stars or “TON” for TON grams. */
  readonly currency: string;
  /** The amount of the currency that will be paid for the post in the smallest units of the currency, i.e. Telegram Stars or nanograms. Currently, price in Telegram Stars must be between 5 and 100000, and price in nanograms must be between 10000000 and 10000000000000. */
  readonly amount: number;
  readonly [key: string]: unknown;
}
export const SuggestedPostPrice: Schema.Codec<SuggestedPostPrice> = Schema.StructWithRest(
  Schema.Struct({
    currency: Schema.String,
    amount: Schema.Int,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Describes a service message about a payment refund for a suggested post. */
export interface SuggestedPostRefunded {
  /** Optional. Message containing the suggested post. Note that the Message object in this field will not contain the reply_to_message field even if it itself is a reply. */
  readonly suggested_post_message?: Message;
  /** Reason for the refund. Currently, one of “post_deleted” if the post was deleted within 24 hours of being posted or removed from scheduled messages without being posted, or “payment_refunded” if the payer refunded their payment. */
  readonly reason: string;
  readonly [key: string]: unknown;
}
export const SuggestedPostRefunded: Schema.Codec<SuggestedPostRefunded> = Schema.StructWithRest(
  Schema.Struct({
    suggested_post_message: Schema.optionalKey(Schema.suspend((): Schema.Codec<Message> => Message)),
    reason: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object represents an inline button that switches the current user to inline mode in a chosen chat, with an optional default inline query. */
export interface SwitchInlineQueryChosenChat {
  /** Optional. The default inline query to be inserted in the input field. If left empty, only the bot's username will be inserted. */
  readonly query?: string;
  /** Optional. True, if private chats with users can be chosen */
  readonly allow_user_chats?: boolean;
  /** Optional. True, if private chats with bots can be chosen */
  readonly allow_bot_chats?: boolean;
  /** Optional. True, if group and supergroup chats can be chosen */
  readonly allow_group_chats?: boolean;
  /** Optional. True, if channel chats can be chosen */
  readonly allow_channel_chats?: boolean;
  readonly [key: string]: unknown;
}
export const SwitchInlineQueryChosenChat: Schema.Codec<SwitchInlineQueryChosenChat> = Schema.StructWithRest(
  Schema.Struct({
    query: Schema.optionalKey(Schema.String),
    allow_user_chats: Schema.optionalKey(Schema.Boolean),
    allow_bot_chats: Schema.optionalKey(Schema.Boolean),
    allow_group_chats: Schema.optionalKey(Schema.Boolean),
    allow_channel_chats: Schema.optionalKey(Schema.Boolean),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
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
  readonly is_manual?: true;
  readonly [key: string]: unknown;
}
export const TextQuote: Schema.Codec<TextQuote> = Schema.StructWithRest(
  Schema.Struct({
    text: Schema.String,
    entities: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<MessageEntity> => MessageEntity))),
    position: Schema.Int,
    is_manual: Schema.optionalKey(Schema.Literal(true)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object describes the source of a transaction, or its recipient for outgoing transactions. Currently, it can be one of */
export type TransactionPartner = TransactionPartnerUser | TransactionPartnerChat | TransactionPartnerAffiliateProgram | TransactionPartnerFragment | TransactionPartnerTelegramAds | TransactionPartnerTelegramApi | TransactionPartnerOther;
export const TransactionPartner: Schema.Codec<TransactionPartner> = Schema.Union([Schema.suspend((): Schema.Codec<TransactionPartnerUser> => TransactionPartnerUser), Schema.suspend((): Schema.Codec<TransactionPartnerChat> => TransactionPartnerChat), Schema.suspend((): Schema.Codec<TransactionPartnerAffiliateProgram> => TransactionPartnerAffiliateProgram), Schema.suspend((): Schema.Codec<TransactionPartnerFragment> => TransactionPartnerFragment), Schema.suspend((): Schema.Codec<TransactionPartnerTelegramAds> => TransactionPartnerTelegramAds), Schema.suspend((): Schema.Codec<TransactionPartnerTelegramApi> => TransactionPartnerTelegramApi), Schema.suspend((): Schema.Codec<TransactionPartnerOther> => TransactionPartnerOther)]);

/** Describes the affiliate program that issued the affiliate commission received via this transaction. */
export interface TransactionPartnerAffiliateProgram {
  /** Type of the transaction partner, always “affiliate_program” */
  readonly type: string;
  /** Optional. Information about the bot that sponsored the affiliate program */
  readonly sponsor_user?: User;
  /** The number of Telegram Stars received by the bot for each 1000 Telegram Stars received by the affiliate program sponsor from referred users */
  readonly commission_per_mille: number;
  readonly [key: string]: unknown;
}
export const TransactionPartnerAffiliateProgram: Schema.Codec<TransactionPartnerAffiliateProgram> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    sponsor_user: Schema.optionalKey(Schema.suspend((): Schema.Codec<User> => User)),
    commission_per_mille: Schema.Int,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Describes a transaction with a chat. */
export interface TransactionPartnerChat {
  /** Type of the transaction partner, always “chat” */
  readonly type: string;
  /** Information about the chat */
  readonly chat: Chat;
  /** Optional. The gift sent to the chat by the bot */
  readonly gift?: Gift;
  readonly [key: string]: unknown;
}
export const TransactionPartnerChat: Schema.Codec<TransactionPartnerChat> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    chat: Schema.suspend((): Schema.Codec<Chat> => Chat),
    gift: Schema.optionalKey(Schema.suspend((): Schema.Codec<Gift> => Gift)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Describes a withdrawal transaction with Fragment. */
export interface TransactionPartnerFragment {
  /** Type of the transaction partner, always “fragment” */
  readonly type: string;
  /** Optional. State of the transaction if the transaction is outgoing */
  readonly withdrawal_state?: RevenueWithdrawalState;
  readonly [key: string]: unknown;
}
export const TransactionPartnerFragment: Schema.Codec<TransactionPartnerFragment> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    withdrawal_state: Schema.optionalKey(Schema.suspend((): Schema.Codec<RevenueWithdrawalState> => RevenueWithdrawalState)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Describes a transaction with an unknown source or recipient. */
export interface TransactionPartnerOther {
  /** Type of the transaction partner, always “other” */
  readonly type: string;
  readonly [key: string]: unknown;
}
export const TransactionPartnerOther: Schema.Codec<TransactionPartnerOther> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Describes a withdrawal transaction to the Telegram Ads platform. */
export interface TransactionPartnerTelegramAds {
  /** Type of the transaction partner, always “telegram_ads” */
  readonly type: string;
  readonly [key: string]: unknown;
}
export const TransactionPartnerTelegramAds: Schema.Codec<TransactionPartnerTelegramAds> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Describes a transaction with payment for paid broadcasting. */
export interface TransactionPartnerTelegramApi {
  /** Type of the transaction partner, always “telegram_api” */
  readonly type: string;
  /** The number of successful requests that exceeded regular limits and were therefore billed */
  readonly request_count: number;
  readonly [key: string]: unknown;
}
export const TransactionPartnerTelegramApi: Schema.Codec<TransactionPartnerTelegramApi> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    request_count: Schema.Int,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Describes a transaction with a user. */
export interface TransactionPartnerUser {
  /** Type of the transaction partner, always “user” */
  readonly type: string;
  /** Type of the transaction, currently one of “invoice_payment” for payments via invoices, “paid_media_payment” for payments for paid media, “gift_purchase” for gifts sent by the bot, “premium_purchase” for Telegram Premium subscriptions gifted by the bot, “business_account_transfer” for direct transfers from managed business accounts */
  readonly transaction_type: string;
  /** Information about the user */
  readonly user: User;
  /** Optional. Information about the affiliate that received a commission via this transaction. Can be available only for “invoice_payment” and “paid_media_payment” transactions. */
  readonly affiliate?: AffiliateInfo;
  /** Optional. Bot-specified invoice payload. Can be available only for “invoice_payment” transactions. */
  readonly invoice_payload?: string;
  /** Optional. The duration of the paid subscription. Can be available only for “invoice_payment” transactions. */
  readonly subscription_period?: number;
  /** Optional. Information about the paid media bought by the user; for “paid_media_payment” transactions only */
  readonly paid_media?: ReadonlyArray<PaidMedia>;
  /** Optional. Bot-specified paid media payload. Can be available only for “paid_media_payment” transactions. */
  readonly paid_media_payload?: string;
  /** Optional. The gift sent to the user by the bot; for “gift_purchase” transactions only */
  readonly gift?: Gift;
  /** Optional. Number of months the gifted Telegram Premium subscription will be active for; for “premium_purchase” transactions only */
  readonly premium_subscription_duration?: number;
  readonly [key: string]: unknown;
}
export const TransactionPartnerUser: Schema.Codec<TransactionPartnerUser> = Schema.StructWithRest(
  Schema.Struct({
    type: Schema.String,
    transaction_type: Schema.String,
    user: Schema.suspend((): Schema.Codec<User> => User),
    affiliate: Schema.optionalKey(Schema.suspend((): Schema.Codec<AffiliateInfo> => AffiliateInfo)),
    invoice_payload: Schema.optionalKey(Schema.String),
    subscription_period: Schema.optionalKey(Schema.Int),
    paid_media: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<PaidMedia> => PaidMedia))),
    paid_media_payload: Schema.optionalKey(Schema.String),
    gift: Schema.optionalKey(Schema.suspend((): Schema.Codec<Gift> => Gift)),
    premium_subscription_duration: Schema.optionalKey(Schema.Int),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object describes a unique gift that was upgraded from a regular gift. */
export interface UniqueGift {
  /** Identifier of the regular gift from which the gift was upgraded */
  readonly gift_id: string;
  /** Human-readable name of the regular gift from which this unique gift was upgraded */
  readonly base_name: string;
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
  readonly is_premium?: true;
  /** Optional. True, if the gift was used to craft another gift and isn't available anymore */
  readonly is_burned?: true;
  /** Optional. True, if the gift is assigned from the TON blockchain and can't be resold or transferred in Telegram */
  readonly is_from_blockchain?: true;
  /** Optional. The color scheme that can be used by the gift's owner for the chat's name, replies to messages and link previews; for business account gifts and gifts that are currently on sale only */
  readonly colors?: UniqueGiftColors;
  /** Optional. Information about the chat that published the gift */
  readonly publisher_chat?: Chat;
  readonly [key: string]: unknown;
}
export const UniqueGift: Schema.Codec<UniqueGift> = Schema.StructWithRest(
  Schema.Struct({
    gift_id: Schema.String,
    base_name: Schema.String,
    name: Schema.String,
    number: Schema.Int,
    model: Schema.suspend((): Schema.Codec<UniqueGiftModel> => UniqueGiftModel),
    symbol: Schema.suspend((): Schema.Codec<UniqueGiftSymbol> => UniqueGiftSymbol),
    backdrop: Schema.suspend((): Schema.Codec<UniqueGiftBackdrop> => UniqueGiftBackdrop),
    is_premium: Schema.optionalKey(Schema.Literal(true)),
    is_burned: Schema.optionalKey(Schema.Literal(true)),
    is_from_blockchain: Schema.optionalKey(Schema.Literal(true)),
    colors: Schema.optionalKey(Schema.suspend((): Schema.Codec<UniqueGiftColors> => UniqueGiftColors)),
    publisher_chat: Schema.optionalKey(Schema.suspend((): Schema.Codec<Chat> => Chat)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object describes the backdrop of a unique gift. */
export interface UniqueGiftBackdrop {
  /** Name of the backdrop */
  readonly name: string;
  /** Colors of the backdrop */
  readonly colors: UniqueGiftBackdropColors;
  /** The number of unique gifts that receive this backdrop for every 1000 gifts upgraded */
  readonly rarity_per_mille: number;
  readonly [key: string]: unknown;
}
export const UniqueGiftBackdrop: Schema.Codec<UniqueGiftBackdrop> = Schema.StructWithRest(
  Schema.Struct({
    name: Schema.String,
    colors: Schema.suspend((): Schema.Codec<UniqueGiftBackdropColors> => UniqueGiftBackdropColors),
    rarity_per_mille: Schema.Int,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object describes the colors of the backdrop of a unique gift. */
export interface UniqueGiftBackdropColors {
  /** The color in the center of the backdrop in RGB format */
  readonly center_color: number;
  /** The color on the edges of the backdrop in RGB format */
  readonly edge_color: number;
  /** The color to be applied to the symbol in RGB format */
  readonly symbol_color: number;
  /** The color for the text on the backdrop in RGB format */
  readonly text_color: number;
  readonly [key: string]: unknown;
}
export const UniqueGiftBackdropColors: Schema.Codec<UniqueGiftBackdropColors> = Schema.StructWithRest(
  Schema.Struct({
    center_color: Schema.Int,
    edge_color: Schema.Int,
    symbol_color: Schema.Int,
    text_color: Schema.Int,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object contains information about the color scheme for a user's name, message replies and link previews based on a unique gift. */
export interface UniqueGiftColors {
  /** Custom emoji identifier of the unique gift's model */
  readonly model_custom_emoji_id: string;
  /** Custom emoji identifier of the unique gift's symbol */
  readonly symbol_custom_emoji_id: string;
  /** Main color used in light themes; RGB format */
  readonly light_theme_main_color: number;
  /** List of 1-3 additional colors used in light themes; RGB format */
  readonly light_theme_other_colors: ReadonlyArray<number>;
  /** Main color used in dark themes; RGB format */
  readonly dark_theme_main_color: number;
  /** List of 1-3 additional colors used in dark themes; RGB format */
  readonly dark_theme_other_colors: ReadonlyArray<number>;
  readonly [key: string]: unknown;
}
export const UniqueGiftColors: Schema.Codec<UniqueGiftColors> = Schema.StructWithRest(
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
  readonly is_private?: true;
  /** Optional. For gifts bought from other users, the currency in which the payment for the gift was done. Currently, one of “XTR” for Telegram Stars or “TON” for TON grams. */
  readonly last_resale_currency?: string;
  /** Optional. For gifts bought from other users, the price paid for the gift in either Telegram Stars or nanograms */
  readonly last_resale_amount?: number;
  /** Optional. Unique identifier of the received gift for the bot; only present for gifts received on behalf of business accounts */
  readonly owned_gift_id?: string;
  /** Optional. Number of Telegram Stars that must be paid to transfer the gift; omitted if the bot cannot transfer the gift */
  readonly transfer_star_count?: number;
  /** Optional. Point in time (Unix timestamp) when the gift can be transferred. If it is in the past, then the gift can be transferred now. */
  readonly next_transfer_date?: number;
  readonly [key: string]: unknown;
}
export const UniqueGiftInfo: Schema.Codec<UniqueGiftInfo> = Schema.StructWithRest(
  Schema.Struct({
    gift: Schema.suspend((): Schema.Codec<UniqueGift> => UniqueGift),
    origin: Schema.String,
    text: Schema.optionalKey(Schema.String),
    entities: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<MessageEntity> => MessageEntity))),
    is_private: Schema.optionalKey(Schema.Literal(true)),
    last_resale_currency: Schema.optionalKey(Schema.String),
    last_resale_amount: Schema.optionalKey(Schema.Int),
    owned_gift_id: Schema.optionalKey(Schema.String),
    transfer_star_count: Schema.optionalKey(Schema.Int),
    next_transfer_date: Schema.optionalKey(Schema.Int),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object describes the model of a unique gift. */
export interface UniqueGiftModel {
  /** Name of the model */
  readonly name: string;
  /** The sticker that represents the unique gift */
  readonly sticker: Sticker;
  /** The number of unique gifts that receive this model for every 1000 gift upgrades. Always 0 for crafted gifts. */
  readonly rarity_per_mille: number;
  /** Optional. Rarity of the model if it is a crafted model. Currently, can be “uncommon”, “rare”, “epic”, or “legendary”. */
  readonly rarity?: string;
  readonly [key: string]: unknown;
}
export const UniqueGiftModel: Schema.Codec<UniqueGiftModel> = Schema.StructWithRest(
  Schema.Struct({
    name: Schema.String,
    sticker: Schema.suspend((): Schema.Codec<Sticker> => Sticker),
    rarity_per_mille: Schema.Int,
    rarity: Schema.optionalKey(Schema.String),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object describes the symbol shown on the pattern of a unique gift. */
export interface UniqueGiftSymbol {
  /** Name of the symbol */
  readonly name: string;
  /** The sticker that represents the unique gift */
  readonly sticker: Sticker;
  /** The number of unique gifts that receive this model for every 1000 gifts upgraded */
  readonly rarity_per_mille: number;
  readonly [key: string]: unknown;
}
export const UniqueGiftSymbol: Schema.Codec<UniqueGiftSymbol> = Schema.StructWithRest(
  Schema.Struct({
    name: Schema.String,
    sticker: Schema.suspend((): Schema.Codec<Sticker> => Sticker),
    rarity_per_mille: Schema.Int,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object represents an incoming update.
At most one of the optional fields can be present in any given update. */
export interface Update {
  /** The update's unique identifier. Update identifiers start from a certain positive number and increase sequentially. This identifier becomes especially handy if you're using webhooks, since it allows you to ignore repeated updates or to restore the correct update sequence, should they get out of order. If there are no new updates for at least a week, then identifier of the next update will be chosen randomly instead of sequentially. */
  readonly update_id: number;
  /** Optional. New incoming message of any kind - text, photo, sticker, etc. */
  readonly message?: Message;
  /** Optional. New version of a message that is known to the bot and was edited. This update may at times be triggered by changes to message fields that are either unavailable or not actively used by your bot. */
  readonly edited_message?: Message;
  /** Optional. New incoming channel post of any kind - text, photo, sticker, etc. */
  readonly channel_post?: Message;
  /** Optional. New version of a channel post that is known to the bot and was edited. This update may at times be triggered by changes to message fields that are either unavailable or not actively used by your bot. */
  readonly edited_channel_post?: Message;
  /** Optional. The bot was connected to or disconnected from a business account, or a user edited an existing connection with the bot */
  readonly business_connection?: BusinessConnection;
  /** Optional. New message from a connected business account */
  readonly business_message?: Message;
  /** Optional. New version of a message from a connected business account */
  readonly edited_business_message?: Message;
  /** Optional. Messages were deleted from a connected business account */
  readonly deleted_business_messages?: BusinessMessagesDeleted;
  /** Optional. New guest message. The bot can use the field Message.guest_query_id and the method answerGuestQuery to send a message in response. */
  readonly guest_message?: Message;
  /** Optional. A reaction to a message was changed by a user. The bot must be an administrator in the chat and must explicitly specify "message_reaction" in the list of allowed_updates to receive these updates. The update isn't received for reactions set by bots. */
  readonly message_reaction?: MessageReactionUpdated;
  /** Optional. Reactions to a message with anonymous reactions were changed. The bot must be an administrator in the chat and must explicitly specify "message_reaction_count" in the list of allowed_updates to receive these updates. The updates are grouped and can be sent with delay up to a few minutes. */
  readonly message_reaction_count?: MessageReactionCountUpdated;
  /** Optional. New incoming inline query */
  readonly inline_query?: InlineQuery;
  /** Optional. The result of an inline query that was chosen by a user and sent to their chat partner. Please see our documentation on the feedback collecting for details on how to enable these updates for your bot. */
  readonly chosen_inline_result?: ChosenInlineResult;
  /** Optional. New incoming callback query */
  readonly callback_query?: CallbackQuery;
  /** Optional. New incoming shipping query. Only for invoices with flexible price. */
  readonly shipping_query?: ShippingQuery;
  /** Optional. New incoming pre-checkout query. Contains full information about checkout. */
  readonly pre_checkout_query?: PreCheckoutQuery;
  /** Optional. A user purchased paid media with a non-empty payload sent by the bot in a non-channel chat */
  readonly purchased_paid_media?: PaidMediaPurchased;
  /** Optional. New poll state. Bots receive only updates about manually stopped polls and polls, which are sent by the bot. */
  readonly poll?: Poll;
  /** Optional. A user changed their answer in a non-anonymous poll. Bots receive new votes only in polls that were sent by the bot itself. */
  readonly poll_answer?: PollAnswer;
  /** Optional. The bot's chat member status was updated in a chat. For private chats, this update is received only when the bot is blocked or unblocked by the user. */
  readonly my_chat_member?: ChatMemberUpdated;
  /** Optional. A chat member's status was updated in a chat. The bot must be an administrator in the chat and must explicitly specify "chat_member" in the list of allowed_updates to receive these updates. */
  readonly chat_member?: ChatMemberUpdated;
  /** Optional. A request to join the chat has been sent. The bot must have the can_invite_users administrator right in the chat to receive these updates. */
  readonly chat_join_request?: ChatJoinRequest;
  /** Optional. A chat boost was added or changed. The bot must be an administrator in the chat to receive these updates. */
  readonly chat_boost?: ChatBoostUpdated;
  /** Optional. A boost was removed from a chat. The bot must be an administrator in the chat to receive these updates. */
  readonly removed_chat_boost?: ChatBoostRemoved;
  /** Optional. A new bot was created to be managed by the bot, or token or owner of a managed bot was changed */
  readonly managed_bot?: ManagedBotUpdated;
  /** Optional. User payment subscription has changed */
  readonly subscription?: BotSubscriptionUpdated;
  /** Optional. A user asked the bot to stop the generation of a message */
  readonly stopped_message_generation?: MessageGenerationStopped;
  readonly [key: string]: unknown;
}
export const Update: Schema.Codec<Update> = Schema.StructWithRest(
  Schema.Struct({
    update_id: Schema.Int,
    message: Schema.optionalKey(Schema.suspend((): Schema.Codec<Message> => Message)),
    edited_message: Schema.optionalKey(Schema.suspend((): Schema.Codec<Message> => Message)),
    channel_post: Schema.optionalKey(Schema.suspend((): Schema.Codec<Message> => Message)),
    edited_channel_post: Schema.optionalKey(Schema.suspend((): Schema.Codec<Message> => Message)),
    business_connection: Schema.optionalKey(Schema.suspend((): Schema.Codec<BusinessConnection> => BusinessConnection)),
    business_message: Schema.optionalKey(Schema.suspend((): Schema.Codec<Message> => Message)),
    edited_business_message: Schema.optionalKey(Schema.suspend((): Schema.Codec<Message> => Message)),
    deleted_business_messages: Schema.optionalKey(Schema.suspend((): Schema.Codec<BusinessMessagesDeleted> => BusinessMessagesDeleted)),
    guest_message: Schema.optionalKey(Schema.suspend((): Schema.Codec<Message> => Message)),
    message_reaction: Schema.optionalKey(Schema.suspend((): Schema.Codec<MessageReactionUpdated> => MessageReactionUpdated)),
    message_reaction_count: Schema.optionalKey(Schema.suspend((): Schema.Codec<MessageReactionCountUpdated> => MessageReactionCountUpdated)),
    inline_query: Schema.optionalKey(Schema.suspend((): Schema.Codec<InlineQuery> => InlineQuery)),
    chosen_inline_result: Schema.optionalKey(Schema.suspend((): Schema.Codec<ChosenInlineResult> => ChosenInlineResult)),
    callback_query: Schema.optionalKey(Schema.suspend((): Schema.Codec<CallbackQuery> => CallbackQuery)),
    shipping_query: Schema.optionalKey(Schema.suspend((): Schema.Codec<ShippingQuery> => ShippingQuery)),
    pre_checkout_query: Schema.optionalKey(Schema.suspend((): Schema.Codec<PreCheckoutQuery> => PreCheckoutQuery)),
    purchased_paid_media: Schema.optionalKey(Schema.suspend((): Schema.Codec<PaidMediaPurchased> => PaidMediaPurchased)),
    poll: Schema.optionalKey(Schema.suspend((): Schema.Codec<Poll> => Poll)),
    poll_answer: Schema.optionalKey(Schema.suspend((): Schema.Codec<PollAnswer> => PollAnswer)),
    my_chat_member: Schema.optionalKey(Schema.suspend((): Schema.Codec<ChatMemberUpdated> => ChatMemberUpdated)),
    chat_member: Schema.optionalKey(Schema.suspend((): Schema.Codec<ChatMemberUpdated> => ChatMemberUpdated)),
    chat_join_request: Schema.optionalKey(Schema.suspend((): Schema.Codec<ChatJoinRequest> => ChatJoinRequest)),
    chat_boost: Schema.optionalKey(Schema.suspend((): Schema.Codec<ChatBoostUpdated> => ChatBoostUpdated)),
    removed_chat_boost: Schema.optionalKey(Schema.suspend((): Schema.Codec<ChatBoostRemoved> => ChatBoostRemoved)),
    managed_bot: Schema.optionalKey(Schema.suspend((): Schema.Codec<ManagedBotUpdated> => ManagedBotUpdated)),
    subscription: Schema.optionalKey(Schema.suspend((): Schema.Codec<BotSubscriptionUpdated> => BotSubscriptionUpdated)),
    stopped_message_generation: Schema.optionalKey(Schema.suspend((): Schema.Codec<MessageGenerationStopped> => MessageGenerationStopped)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object represents a Telegram user or bot. */
export interface User {
  /** Unique identifier for this user or bot. This number may have more than 32 significant bits and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a 64-bit integer or double-precision float type are safe for storing this identifier. */
  readonly id: number;
  /** True, if this user is a bot */
  readonly is_bot: boolean;
  /** User's or bot's first name */
  readonly first_name: string;
  /** Optional. User's or bot's last name */
  readonly last_name?: string;
  /** Optional. User's or bot's username */
  readonly username?: string;
  /** Optional. IETF language tag of the user's language */
  readonly language_code?: string;
  /** Optional. True, if this user is a Telegram Premium user */
  readonly is_premium?: true;
  /** Optional. True, if this user added the bot to the attachment menu */
  readonly added_to_attachment_menu?: true;
  /** Optional. True, if the bot can be invited to groups. Returned only in getMe. */
  readonly can_join_groups?: boolean;
  /** Optional. True, if privacy mode is disabled for the bot. Returned only in getMe. */
  readonly can_read_all_group_messages?: boolean;
  /** Optional. True, if the bot supports guest queries from chats it is not a member of. Returned only in getMe. */
  readonly supports_guest_queries?: boolean;
  /** Optional. True, if the bot supports inline queries. Returned only in getMe. */
  readonly supports_inline_queries?: boolean;
  /** Optional. True, if the bot can be connected to a user account to manage it. Returned only in getMe. */
  readonly can_connect_to_business?: boolean;
  /** Optional. True, if the bot has a main Web App. Returned only in getMe. */
  readonly has_main_web_app?: boolean;
  /** Optional. True, if the bot has forum topic mode enabled in private chats. Returned only in getMe. */
  readonly has_topics_enabled?: boolean;
  /** Optional. True, if the bot allows users to create and delete topics in private chats. Returned only in getMe. */
  readonly allows_users_to_create_topics?: boolean;
  /** Optional. True, if other bots can be created to be controlled by the bot. Returned only in getMe. */
  readonly can_manage_bots?: boolean;
  /** Optional. True, if the bot supports join request queries and can be assigned to process them. Returned only in getMe. */
  readonly supports_join_request_queries?: boolean;
  readonly [key: string]: unknown;
}
export const User: Schema.Codec<User> = Schema.StructWithRest(
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

/** This object represents a list of boosts added to a chat by a user. */
export interface UserChatBoosts {
  /** The list of boosts added to the chat by the user */
  readonly boosts: ReadonlyArray<ChatBoost>;
  readonly [key: string]: unknown;
}
export const UserChatBoosts: Schema.Codec<UserChatBoosts> = Schema.StructWithRest(
  Schema.Struct({
    boosts: Schema.Array(Schema.suspend((): Schema.Codec<ChatBoost> => ChatBoost)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object represents the audios displayed on a user's profile. */
export interface UserProfileAudios {
  /** Total number of profile audios for the target user */
  readonly total_count: number;
  /** Requested profile audios */
  readonly audios: ReadonlyArray<Audio>;
  readonly [key: string]: unknown;
}
export const UserProfileAudios: Schema.Codec<UserProfileAudios> = Schema.StructWithRest(
  Schema.Struct({
    total_count: Schema.Int,
    audios: Schema.Array(Schema.suspend((): Schema.Codec<Audio> => Audio)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object represent a user's profile pictures. */
export interface UserProfilePhotos {
  /** Total number of profile pictures the target user has */
  readonly total_count: number;
  /** Requested profile pictures (in up to 4 sizes each) */
  readonly photos: ReadonlyArray<ReadonlyArray<PhotoSize>>;
  readonly [key: string]: unknown;
}
export const UserProfilePhotos: Schema.Codec<UserProfilePhotos> = Schema.StructWithRest(
  Schema.Struct({
    total_count: Schema.Int,
    photos: Schema.Array(Schema.Array(Schema.suspend((): Schema.Codec<PhotoSize> => PhotoSize))),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object describes the rating of a user based on their Telegram Star spendings. */
export interface UserRating {
  /** Current level of the user, indicating their reliability when purchasing digital goods and services. A higher level suggests a more trustworthy customer; a negative level is likely reason for concern. */
  readonly level: number;
  /** Numerical value of the user's rating; the higher the rating, the better */
  readonly rating: number;
  /** The rating value required to get the current level */
  readonly current_level_rating: number;
  /** Optional. The rating value required to get to the next level; omitted if the maximum level was reached */
  readonly next_level_rating?: number;
  readonly [key: string]: unknown;
}
export const UserRating: Schema.Codec<UserRating> = Schema.StructWithRest(
  Schema.Struct({
    level: Schema.Int,
    rating: Schema.Int,
    current_level_rating: Schema.Int,
    next_level_rating: Schema.optionalKey(Schema.Int),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object contains information about the users whose identifiers were shared with the bot using a KeyboardButtonRequestUsers button. */
export interface UsersShared {
  /** Identifier of the request */
  readonly request_id: number;
  /** Information about users shared with the bot */
  readonly users: ReadonlyArray<SharedUser>;
  readonly [key: string]: unknown;
}
export const UsersShared: Schema.Codec<UsersShared> = Schema.StructWithRest(
  Schema.Struct({
    request_id: Schema.Int,
    users: Schema.Array(Schema.suspend((): Schema.Codec<SharedUser> => SharedUser)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
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
  readonly foursquare_id?: string;
  /** Optional. Foursquare type of the venue. (For example, “arts_entertainment/default”, “arts_entertainment/aquarium” or “food/icecream”.) */
  readonly foursquare_type?: string;
  /** Optional. Google Places identifier of the venue */
  readonly google_place_id?: string;
  /** Optional. Google Places type of the venue. (See supported types.) */
  readonly google_place_type?: string;
  readonly [key: string]: unknown;
}
export const Venue: Schema.Codec<Venue> = Schema.StructWithRest(
  Schema.Struct({
    location: Schema.suspend((): Schema.Codec<Location> => Location),
    title: Schema.String,
    address: Schema.String,
    foursquare_id: Schema.optionalKey(Schema.String),
    foursquare_type: Schema.optionalKey(Schema.String),
    google_place_id: Schema.optionalKey(Schema.String),
    google_place_type: Schema.optionalKey(Schema.String),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object represents a video file. */
export interface Video {
  /** Identifier for this file, which can be used to download or reuse the file */
  readonly file_id: string;
  /** Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file. */
  readonly file_unique_id: string;
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
  readonly start_timestamp?: number;
  /** Optional. List of available qualities of the video */
  readonly qualities?: ReadonlyArray<VideoQuality>;
  /** Optional. Original filename as defined by the sender */
  readonly file_name?: string;
  /** Optional. MIME type of the file as defined by the sender */
  readonly mime_type?: string;
  /** Optional. File size in bytes. It can be bigger than 2^31 and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a signed 64-bit integer or double-precision float type are safe for storing this value. */
  readonly file_size?: number;
  readonly [key: string]: unknown;
}
export const Video: Schema.Codec<Video> = Schema.StructWithRest(
  Schema.Struct({
    file_id: Schema.String,
    file_unique_id: Schema.String,
    width: Schema.Int,
    height: Schema.Int,
    duration: Schema.Int,
    thumbnail: Schema.optionalKey(Schema.suspend((): Schema.Codec<PhotoSize> => PhotoSize)),
    cover: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<PhotoSize> => PhotoSize))),
    start_timestamp: Schema.optionalKey(Schema.Int),
    qualities: Schema.optionalKey(Schema.Array(Schema.suspend((): Schema.Codec<VideoQuality> => VideoQuality))),
    file_name: Schema.optionalKey(Schema.String),
    mime_type: Schema.optionalKey(Schema.String),
    file_size: Schema.optionalKey(Schema.Int),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object represents a service message about a video chat ended in the chat. */
export interface VideoChatEnded {
  /** Video chat duration in seconds */
  readonly duration: number;
  readonly [key: string]: unknown;
}
export const VideoChatEnded: Schema.Codec<VideoChatEnded> = Schema.StructWithRest(
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
export const VideoChatParticipantsInvited: Schema.Codec<VideoChatParticipantsInvited> = Schema.StructWithRest(
  Schema.Struct({
    users: Schema.Array(Schema.suspend((): Schema.Codec<User> => User)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object represents a service message about a video chat scheduled in the chat. */
export interface VideoChatScheduled {
  /** Point in time (Unix timestamp) when the video chat is supposed to be started by a chat administrator */
  readonly start_date: number;
  readonly [key: string]: unknown;
}
export const VideoChatScheduled: Schema.Codec<VideoChatScheduled> = Schema.StructWithRest(
  Schema.Struct({
    start_date: Schema.Int,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object represents a service message about a video chat started in the chat. Currently holds no information. */
export interface VideoChatStarted {
  readonly [key: string]: unknown;
}
export const VideoChatStarted: Schema.Codec<VideoChatStarted> = Schema.StructWithRest(
  Schema.Struct({}),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object represents a video message. */
export interface VideoNote {
  /** Identifier for this file, which can be used to download or reuse the file */
  readonly file_id: string;
  /** Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file. */
  readonly file_unique_id: string;
  /** Video width and height (diameter of the video message) as defined by the sender */
  readonly length: number;
  /** Duration of the video in seconds as defined by the sender */
  readonly duration: number;
  /** Optional. Video thumbnail */
  readonly thumbnail?: PhotoSize;
  /** Optional. File size in bytes */
  readonly file_size?: number;
  readonly [key: string]: unknown;
}
export const VideoNote: Schema.Codec<VideoNote> = Schema.StructWithRest(
  Schema.Struct({
    file_id: Schema.String,
    file_unique_id: Schema.String,
    length: Schema.Int,
    duration: Schema.Int,
    thumbnail: Schema.optionalKey(Schema.suspend((): Schema.Codec<PhotoSize> => PhotoSize)),
    file_size: Schema.optionalKey(Schema.Int),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object represents a video file of a specific quality. */
export interface VideoQuality {
  /** Identifier for this file, which can be used to download or reuse the file */
  readonly file_id: string;
  /** Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file. */
  readonly file_unique_id: string;
  /** Video width */
  readonly width: number;
  /** Video height */
  readonly height: number;
  /** Codec that was used to encode the video, for example, “h264”, “h265”, or “av01” */
  readonly codec: string;
  /** Optional. File size in bytes. It can be bigger than 2^31 and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a signed 64-bit integer or double-precision float type are safe for storing this value. */
  readonly file_size?: number;
  readonly [key: string]: unknown;
}
export const VideoQuality: Schema.Codec<VideoQuality> = Schema.StructWithRest(
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

/** This object represents a voice note. */
export interface Voice {
  /** Identifier for this file, which can be used to download or reuse the file */
  readonly file_id: string;
  /** Unique identifier for this file, which is supposed to be the same over time and for different bots. Can't be used to download or reuse the file. */
  readonly file_unique_id: string;
  /** Duration of the audio in seconds as defined by the sender */
  readonly duration: number;
  /** Optional. MIME type of the file as defined by the sender */
  readonly mime_type?: string;
  /** Optional. File size in bytes. It can be bigger than 2^31 and some programming languages may have difficulty/silent defects in interpreting it. But it has at most 52 significant bits, so a signed 64-bit integer or double-precision float type are safe for storing this value. */
  readonly file_size?: number;
  readonly [key: string]: unknown;
}
export const Voice: Schema.Codec<Voice> = Schema.StructWithRest(
  Schema.Struct({
    file_id: Schema.String,
    file_unique_id: Schema.String,
    duration: Schema.Int,
    mime_type: Schema.optionalKey(Schema.String),
    file_size: Schema.optionalKey(Schema.Int),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Describes data sent from a Web App to the bot. */
export interface WebAppData {
  /** The data. Be aware that a bad client can send arbitrary data in this field. */
  readonly data: string;
  /** Text of the web_app keyboard button from which the Web App was opened. Be aware that a bad client can send arbitrary data in this field. */
  readonly button_text: string;
  readonly [key: string]: unknown;
}
export const WebAppData: Schema.Codec<WebAppData> = Schema.StructWithRest(
  Schema.Struct({
    data: Schema.String,
    button_text: Schema.String,
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** Describes a Web App. */
export interface WebAppInfo {
  /** An HTTPS URL of a Web App to be opened with additional data as specified in Initializing Web Apps */
  readonly url: string;
  readonly [key: string]: unknown;
}
export const WebAppInfo: Schema.Codec<WebAppInfo> = Schema.StructWithRest(
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
  readonly has_custom_certificate: boolean;
  /** Number of updates awaiting delivery */
  readonly pending_update_count: number;
  /** Optional. Currently used webhook IP address */
  readonly ip_address?: string;
  /** Optional. Unix time for the most recent error that happened when trying to deliver an update via webhook */
  readonly last_error_date?: number;
  /** Optional. Error message in human-readable format for the most recent error that happened when trying to deliver an update via webhook */
  readonly last_error_message?: string;
  /** Optional. Unix time of the most recent error that happened when trying to synchronize available updates with Telegram datacenters */
  readonly last_synchronization_error_date?: number;
  /** Optional. The maximum allowed number of simultaneous HTTPS connections to the webhook for update delivery */
  readonly max_connections?: number;
  /** Optional. A list of update types the bot is subscribed to. Defaults to all update types except chat_member, message_reaction, and message_reaction_count. */
  readonly allowed_updates?: UpdateType;
  readonly [key: string]: unknown;
}
export const WebhookInfo: Schema.Codec<WebhookInfo> = Schema.StructWithRest(
  Schema.Struct({
    url: Schema.String,
    has_custom_certificate: Schema.Boolean,
    pending_update_count: Schema.Int,
    ip_address: Schema.optionalKey(Schema.String),
    last_error_date: Schema.optionalKey(Schema.Int),
    last_error_message: Schema.optionalKey(Schema.String),
    last_synchronization_error_date: Schema.optionalKey(Schema.Int),
    max_connections: Schema.optionalKey(Schema.Int),
    allowed_updates: Schema.optionalKey(Schema.suspend((): Schema.Codec<UpdateType> => UpdateType)),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);

/** This object represents a service message about a user allowing a bot to write messages after adding it to the attachment menu, launching a Web App from a link, or accepting an explicit request from a Web App sent by the method requestWriteAccess. */
export interface WriteAccessAllowed {
  /** Optional. True, if the access was granted after the user accepted an explicit request from a Web App sent by the method requestWriteAccess */
  readonly from_request?: boolean;
  /** Optional. Name of the Web App, if the access was granted when the Web App was launched from a link */
  readonly web_app_name?: string;
  /** Optional. True, if the access was granted when the bot was added to the attachment or side menu */
  readonly from_attachment_menu?: boolean;
  readonly [key: string]: unknown;
}
export const WriteAccessAllowed: Schema.Codec<WriteAccessAllowed> = Schema.StructWithRest(
  Schema.Struct({
    from_request: Schema.optionalKey(Schema.Boolean),
    web_app_name: Schema.optionalKey(Schema.String),
    from_attachment_menu: Schema.optionalKey(Schema.Boolean),
  }),
  [Schema.Record(Schema.String, Schema.Unknown)],
);
