// Generated from bot-api/schema/sources/dofer/spec.json. Edit schema inputs or overrides, then regenerate.
import type * as Types from "../types.generated.js";

export const decodeFailure = Symbol("telly/FastDecodeFailure");

export function _decodeBoolean(input: unknown): boolean | typeof decodeFailure {
  return typeof input === "boolean" ? input : decodeFailure;
}

export function _decodeFloat(input: unknown): number | typeof decodeFailure {
  return typeof input === "number" ? input : decodeFailure;
}

export function _decodeInteger(input: unknown): number | typeof decodeFailure {
  return typeof input === "number" && Number.isSafeInteger(input) ? input : decodeFailure;
}

export function _decodeString(input: unknown): string | typeof decodeFailure {
  return typeof input === "string" ? input : decodeFailure;
}

export function _decodeTrue(input: unknown): true | typeof decodeFailure {
  return input === true ? input : decodeFailure;
}

export function _decodeArray<A>(
  input: unknown,
  decode: (input: unknown) => A | typeof decodeFailure,
): ReadonlyArray<A> | typeof decodeFailure {
  if (!Array.isArray(input)) return decodeFailure;
  const source: ReadonlyArray<unknown> = input;
  let output: Array<A> | undefined;
  for (let index = 0; index < source.length; index += 1) {
    const raw = source[index];
    const decoded = decode(raw);
    if (decoded === decodeFailure) return decodeFailure;
    if (decoded !== raw) {
      output ??= source.slice() as Array<A>;
      output[index] = decoded;
    }
  }
  return output ?? source as ReadonlyArray<A>;
}

export function _decodeBackgroundFillType(input: unknown): Types.BackgroundFillType | typeof decodeFailure {
  switch (input) {
    case "solid":
    case "gradient":
    case "freeform_gradient":
      return input;
    default:
      return decodeFailure;
  }
}

export function _decodeBackgroundTypeType(input: unknown): Types.BackgroundTypeType | typeof decodeFailure {
  switch (input) {
    case "fill":
    case "wallpaper":
    case "pattern":
    case "chat_theme":
      return input;
    default:
      return decodeFailure;
  }
}

export function _decodeBotCommandScopeType(input: unknown): Types.BotCommandScopeType | typeof decodeFailure {
  switch (input) {
    case "default":
    case "all_private_chats":
    case "all_group_chats":
    case "all_chat_administrators":
    case "chat":
    case "chat_administrators":
    case "chat_member":
      return input;
    default:
      return decodeFailure;
  }
}

export function _decodeChatAction(input: unknown): Types.ChatAction | typeof decodeFailure {
  switch (input) {
    case "typing":
    case "upload_photo":
    case "record_video":
    case "upload_video":
    case "record_voice":
    case "upload_voice":
    case "upload_document":
    case "choose_sticker":
    case "find_location":
    case "record_video_note":
    case "upload_video_note":
      return input;
    default:
      return decodeFailure;
  }
}

export function _decodeChatBoostSourceSource(input: unknown): Types.ChatBoostSourceSource | typeof decodeFailure {
  switch (input) {
    case "premium":
    case "gift_code":
    case "giveaway":
      return input;
    default:
      return decodeFailure;
  }
}

export function _decodeChatMemberStatus(input: unknown): Types.ChatMemberStatus | typeof decodeFailure {
  switch (input) {
    case "creator":
    case "administrator":
    case "member":
    case "restricted":
    case "left":
    case "kicked":
      return input;
    default:
      return decodeFailure;
  }
}

export function _decodeChatType(input: unknown): Types.ChatType | typeof decodeFailure {
  switch (input) {
    case "private":
    case "group":
    case "supergroup":
    case "channel":
      return input;
    default:
      return decodeFailure;
  }
}

export function _decodeContentType(input: unknown): Types.ContentType | typeof decodeFailure {
  switch (input) {
    case "text":
    case "rich_message":
    case "animation":
    case "audio":
    case "document":
    case "live_photo":
    case "paid_media":
    case "photo":
    case "sticker":
    case "story":
    case "video":
    case "video_note":
    case "voice":
    case "checklist":
    case "contact":
    case "dice":
    case "game":
    case "poll":
    case "venue":
    case "location":
    case "new_chat_members":
    case "left_chat_member":
    case "chat_owner_left":
    case "chat_owner_changed":
    case "new_chat_title":
    case "new_chat_photo":
    case "delete_chat_photo":
    case "group_chat_created":
    case "supergroup_chat_created":
    case "channel_chat_created":
    case "message_auto_delete_timer_changed":
    case "migrate_to_chat_id":
    case "migrate_from_chat_id":
    case "pinned_message":
    case "invoice":
    case "successful_payment":
    case "refunded_payment":
    case "users_shared":
    case "chat_shared":
    case "gift":
    case "unique_gift":
    case "gift_upgrade_sent":
    case "connected_website":
    case "write_access_allowed":
    case "passport_data":
    case "proximity_alert_triggered":
    case "boost_added":
    case "chat_background_set":
    case "checklist_tasks_done":
    case "checklist_tasks_added":
    case "community_chat_added":
    case "community_chat_joined":
    case "community_chat_removed":
    case "direct_message_price_changed":
    case "forum_topic_created":
    case "forum_topic_edited":
    case "forum_topic_closed":
    case "forum_topic_reopened":
    case "general_forum_topic_hidden":
    case "general_forum_topic_unhidden":
    case "giveaway_created":
    case "giveaway":
    case "giveaway_winners":
    case "giveaway_completed":
    case "managed_bot_created":
    case "paid_message_price_changed":
    case "poll_option_added":
    case "poll_option_deleted":
    case "suggested_post_approved":
    case "suggested_post_approval_failed":
    case "suggested_post_declined":
    case "suggested_post_paid":
    case "suggested_post_refunded":
    case "video_chat_scheduled":
    case "video_chat_started":
    case "video_chat_ended":
    case "video_chat_participants_invited":
    case "web_app_data":
      return input;
    default:
      return decodeFailure;
  }
}

export function _decodeDiceEmoji(input: unknown): Types.DiceEmoji | typeof decodeFailure {
  switch (input) {
    case "🎲":
    case "🎯":
    case "🏀":
    case "⚽":
    case "🎳":
    case "🎰":
      return input;
    default:
      return decodeFailure;
  }
}

export function _decodeEncryptedPassportElementType(input: unknown): Types.EncryptedPassportElementType | typeof decodeFailure {
  switch (input) {
    case "personal_details":
    case "passport":
    case "driver_license":
    case "identity_card":
    case "internal_passport":
    case "address":
    case "utility_bill":
    case "bank_statement":
    case "rental_agreement":
    case "passport_registration":
    case "temporary_registration":
    case "phone_number":
    case "email":
      return input;
    default:
      return decodeFailure;
  }
}

export function _decodeInlineQueryChatType(input: unknown): Types.InlineQueryChatType | typeof decodeFailure {
  switch (input) {
    case "sender":
    case "private":
    case "group":
    case "supergroup":
    case "channel":
      return input;
    default:
      return decodeFailure;
  }
}

export function _decodeInlineQueryResultType(input: unknown): Types.InlineQueryResultType | typeof decodeFailure {
  switch (input) {
    case "audio":
    case "document":
    case "gif":
    case "mpeg4_gif":
    case "photo":
    case "sticker":
    case "video":
    case "voice":
    case "article":
    case "contact":
    case "game":
    case "location":
    case "venue":
      return input;
    default:
      return decodeFailure;
  }
}

export function _decodeInputMediaType(input: unknown): Types.InputMediaType | typeof decodeFailure {
  switch (input) {
    case "animation":
    case "audio":
    case "document":
    case "live_photo":
    case "photo":
    case "video":
      return input;
    default:
      return decodeFailure;
  }
}

export function _decodeInputPaidMediaType(input: unknown): Types.InputPaidMediaType | typeof decodeFailure {
  switch (input) {
    case "live_photo":
    case "photo":
    case "video":
      return input;
    default:
      return decodeFailure;
  }
}

export function _decodeInputPollMediaType(input: unknown): Types.InputPollMediaType | typeof decodeFailure {
  switch (input) {
    case "animation":
    case "audio":
    case "document":
    case "live_photo":
    case "location":
    case "photo":
    case "venue":
    case "video":
      return input;
    default:
      return decodeFailure;
  }
}

export function _decodeInputPollOptionMediaType(input: unknown): Types.InputPollOptionMediaType | typeof decodeFailure {
  switch (input) {
    case "animation":
    case "link":
    case "live_photo":
    case "location":
    case "photo":
    case "sticker":
    case "venue":
    case "video":
      return input;
    default:
      return decodeFailure;
  }
}

export function _decodeInputProfilePhotoType(input: unknown): Types.InputProfilePhotoType | typeof decodeFailure {
  switch (input) {
    case "static":
    case "animated":
      return input;
    default:
      return decodeFailure;
  }
}

export function _decodeInputRichBlockType(input: unknown): Types.InputRichBlockType | typeof decodeFailure {
  switch (input) {
    case "paragraph":
    case "heading":
    case "pre":
    case "footer":
    case "divider":
    case "mathematical_expression":
    case "anchor":
    case "list":
    case "blockquote":
    case "expandable_blockquote":
    case "pullquote":
    case "collage":
    case "slideshow":
    case "table":
    case "details":
    case "map":
    case "buttons":
    case "animation":
    case "audio":
    case "document":
    case "photo":
    case "video":
    case "voice_note":
    case "thinking":
      return input;
    default:
      return decodeFailure;
  }
}

export function _decodeInputStoryContentType(input: unknown): Types.InputStoryContentType | typeof decodeFailure {
  switch (input) {
    case "photo":
    case "video":
      return input;
    default:
      return decodeFailure;
  }
}

export function _decodeMaskPositionPoint(input: unknown): Types.MaskPositionPoint | typeof decodeFailure {
  switch (input) {
    case "forehead":
    case "eyes":
    case "mouth":
    case "chin":
      return input;
    default:
      return decodeFailure;
  }
}

export function _decodeMenuButtonType(input: unknown): Types.MenuButtonType | typeof decodeFailure {
  switch (input) {
    case "commands":
    case "web_app":
    case "default":
      return input;
    default:
      return decodeFailure;
  }
}

export function _decodeMessageEntityType(input: unknown): Types.MessageEntityType | typeof decodeFailure {
  switch (input) {
    case "mention":
    case "hashtag":
    case "cashtag":
    case "bot_command":
    case "url":
    case "email":
    case "phone_number":
    case "bold":
    case "italic":
    case "underline":
    case "strikethrough":
    case "spoiler":
    case "blockquote":
    case "expandable_blockquote":
    case "code":
    case "pre":
    case "text_link":
    case "text_mention":
    case "custom_emoji":
    case "date_time":
      return input;
    default:
      return decodeFailure;
  }
}

export function _decodeMessageOriginType(input: unknown): Types.MessageOriginType | typeof decodeFailure {
  switch (input) {
    case "user":
    case "hidden_user":
    case "chat":
    case "channel":
      return input;
    default:
      return decodeFailure;
  }
}

export function _decodeOwnedGiftType(input: unknown): Types.OwnedGiftType | typeof decodeFailure {
  switch (input) {
    case "regular":
    case "unique":
      return input;
    default:
      return decodeFailure;
  }
}

export function _decodePaidMediaType(input: unknown): Types.PaidMediaType | typeof decodeFailure {
  switch (input) {
    case "live_photo":
    case "photo":
    case "preview":
    case "video":
      return input;
    default:
      return decodeFailure;
  }
}

export function _decodeParseMode(input: unknown): Types.ParseMode | typeof decodeFailure {
  switch (input) {
    case "HTML":
    case "Markdown":
    case "MarkdownV2":
      return input;
    default:
      return decodeFailure;
  }
}

export function _decodePassportElementErrorSource(input: unknown): Types.PassportElementErrorSource | typeof decodeFailure {
  switch (input) {
    case "data":
    case "front_side":
    case "reverse_side":
    case "selfie":
    case "file":
    case "files":
    case "translation_file":
    case "translation_files":
    case "unspecified":
      return input;
    default:
      return decodeFailure;
  }
}

export function _decodePollType(input: unknown): Types.PollType | typeof decodeFailure {
  switch (input) {
    case "regular":
    case "quiz":
      return input;
    default:
      return decodeFailure;
  }
}

export function _decodeReactionTypeType(input: unknown): Types.ReactionTypeType | typeof decodeFailure {
  switch (input) {
    case "emoji":
    case "custom_emoji":
    case "paid":
      return input;
    default:
      return decodeFailure;
  }
}

export function _decodeRevenueWithdrawalStateType(input: unknown): Types.RevenueWithdrawalStateType | typeof decodeFailure {
  switch (input) {
    case "pending":
    case "succeeded":
    case "failed":
      return input;
    default:
      return decodeFailure;
  }
}

export function _decodeRichBlockType(input: unknown): Types.RichBlockType | typeof decodeFailure {
  switch (input) {
    case "paragraph":
    case "heading":
    case "pre":
    case "footer":
    case "divider":
    case "mathematical_expression":
    case "anchor":
    case "list":
    case "blockquote":
    case "expandable_blockquote":
    case "pullquote":
    case "collage":
    case "slideshow":
    case "table":
    case "details":
    case "map":
    case "buttons":
    case "animation":
    case "audio":
    case "document":
    case "photo":
    case "video":
    case "voice_note":
    case "thinking":
      return input;
    default:
      return decodeFailure;
  }
}

export function _decodeRichTextType(input: unknown): Types.RichTextType | typeof decodeFailure {
  switch (input) {
    case "bold":
    case "italic":
    case "underline":
    case "strikethrough":
    case "spoiler":
    case "date_time":
    case "text_mention":
    case "subscript":
    case "superscript":
    case "marked":
    case "code":
    case "custom_emoji":
    case "mathematical_expression":
    case "url":
    case "email_address":
    case "phone_number":
    case "bank_card_number":
    case "mention":
    case "hashtag":
    case "cashtag":
    case "bot_command":
    case "button":
    case "anchor":
    case "anchor_link":
    case "reference":
    case "reference_link":
      return input;
    default:
      return decodeFailure;
  }
}

export function _decodeStickerFormat(input: unknown): Types.StickerFormat | typeof decodeFailure {
  switch (input) {
    case "static":
    case "animated":
    case "video":
      return input;
    default:
      return decodeFailure;
  }
}

export function _decodeStickerType(input: unknown): Types.StickerType | typeof decodeFailure {
  switch (input) {
    case "regular":
    case "mask":
    case "custom_emoji":
      return input;
    default:
      return decodeFailure;
  }
}

export function _decodeStoryAreaTypeType(input: unknown): Types.StoryAreaTypeType | typeof decodeFailure {
  switch (input) {
    case "location":
    case "suggested_reaction":
    case "link":
    case "weather":
    case "unique_gift":
      return input;
    default:
      return decodeFailure;
  }
}

export function _decodeTransactionPartnerType(input: unknown): Types.TransactionPartnerType | typeof decodeFailure {
  switch (input) {
    case "user":
    case "chat":
    case "affiliate_program":
    case "fragment":
    case "telegram_ads":
    case "telegram_api":
    case "other":
      return input;
    default:
      return decodeFailure;
  }
}

export function _decodeUpdateType(input: unknown): Types.UpdateType | typeof decodeFailure {
  switch (input) {
    case "message":
    case "edited_message":
    case "channel_post":
    case "edited_channel_post":
    case "business_connection":
    case "business_message":
    case "edited_business_message":
    case "deleted_business_messages":
    case "guest_message":
    case "message_reaction":
    case "message_reaction_count":
    case "inline_query":
    case "chosen_inline_result":
    case "callback_query":
    case "shipping_query":
    case "pre_checkout_query":
    case "purchased_paid_media":
    case "poll":
    case "poll_answer":
    case "my_chat_member":
    case "chat_member":
    case "chat_join_request":
    case "chat_boost":
    case "removed_chat_boost":
    case "managed_bot":
    case "subscription":
    case "stopped_message_generation":
      return input;
    default:
      return decodeFailure;
  }
}

export function _decodeArrayOfUser(input: unknown): ReadonlyArray<Types.User> | typeof decodeFailure {
  return _decodeArray(input, _decodeUser);
}

export function _decodeArrayOfGift(input: unknown): ReadonlyArray<Types.Gift> | typeof decodeFailure {
  return _decodeArray(input, _decodeGift);
}

export function _decodeArrayOfChat(input: unknown): ReadonlyArray<Types.Chat> | typeof decodeFailure {
  return _decodeArray(input, _decodeChat);
}

export function _decodeArrayOfAudio(input: unknown): ReadonlyArray<Types.Audio> | typeof decodeFailure {
  return _decodeArray(input, _decodeAudio);
}

export function _decodeArrayOfString(input: unknown): ReadonlyArray<string> | typeof decodeFailure {
  return _decodeArray(input, _decodeString);
}

export function _decodeArrayOfInteger(input: unknown): ReadonlyArray<number> | typeof decodeFailure {
  return _decodeArray(input, _decodeInteger);
}

export function _decodeArrayOfSticker(input: unknown): ReadonlyArray<Types.Sticker> | typeof decodeFailure {
  return _decodeArray(input, _decodeSticker);
}

export function _decodeArrayOfRichText(input: unknown): ReadonlyArray<Types.RichText> | typeof decodeFailure {
  return _decodeArray(input, _decodeRichText);
}

export function _decodeArrayOfPhotoSize(input: unknown): ReadonlyArray<Types.PhotoSize> | typeof decodeFailure {
  return _decodeArray(input, _decodePhotoSize);
}

export function _decodeArrayOfOwnedGift(input: unknown): ReadonlyArray<Types.OwnedGift> | typeof decodeFailure {
  return _decodeArray(input, _decodeOwnedGift);
}

export function _decodeArrayOfPaidMedia(input: unknown): ReadonlyArray<Types.PaidMedia> | typeof decodeFailure {
  return _decodeArray(input, _decodePaidMedia);
}

export function _decodeArrayOfRichBlock(input: unknown): ReadonlyArray<Types.RichBlock> | typeof decodeFailure {
  return _decodeArray(input, _decodeRichBlock);
}

export function _decodeArrayOfChatBoost(input: unknown): ReadonlyArray<Types.ChatBoost> | typeof decodeFailure {
  return _decodeArray(input, _decodeChatBoost);
}

export function _decodeArrayOfPollOption(input: unknown): ReadonlyArray<Types.PollOption> | typeof decodeFailure {
  return _decodeArray(input, _decodePollOption);
}

export function _decodeArrayOfSharedUser(input: unknown): ReadonlyArray<Types.SharedUser> | typeof decodeFailure {
  return _decodeArray(input, _decodeSharedUser);
}

export function _decodeArrayOfUpdateType(input: unknown): ReadonlyArray<Types.UpdateType> | typeof decodeFailure {
  return _decodeArray(input, _decodeUpdateType);
}

export function _decodeArrayOfReactionType(input: unknown): ReadonlyArray<Types.ReactionType> | typeof decodeFailure {
  return _decodeArray(input, _decodeReactionType);
}

export function _decodeArrayOfPassportFile(input: unknown): ReadonlyArray<Types.PassportFile> | typeof decodeFailure {
  return _decodeArray(input, _decodePassportFile);
}

export function _decodeArrayOfLabeledPrice(input: unknown): ReadonlyArray<Types.LabeledPrice> | typeof decodeFailure {
  return _decodeArray(input, _decodeLabeledPrice);
}

export function _decodeArrayOfVideoQuality(input: unknown): ReadonlyArray<Types.VideoQuality> | typeof decodeFailure {
  return _decodeArray(input, _decodeVideoQuality);
}

export function _decodeArrayOfMessageEntity(input: unknown): ReadonlyArray<Types.MessageEntity> | typeof decodeFailure {
  return _decodeArray(input, _decodeMessageEntity);
}

export function _decodeArrayOfChecklistTask(input: unknown): ReadonlyArray<Types.ChecklistTask> | typeof decodeFailure {
  return _decodeArray(input, _decodeChecklistTask);
}

export function _decodeArrayOfReactionCount(input: unknown): ReadonlyArray<Types.ReactionCount> | typeof decodeFailure {
  return _decodeArray(input, _decodeReactionCount);
}

export function _decodeArrayOfInputRichBlock(input: unknown): ReadonlyArray<Types.InputRichBlock> | typeof decodeFailure {
  return _decodeArray(input, _decodeInputRichBlock);
}

export function _decodeArrayOfKeyboardButton(input: unknown): ReadonlyArray<Types.KeyboardButton> | typeof decodeFailure {
  return _decodeArray(input, _decodeKeyboardButton);
}

export function _decodeArrayOfStarTransaction(input: unknown): ReadonlyArray<Types.StarTransaction> | typeof decodeFailure {
  return _decodeArray(input, _decodeStarTransaction);
}

export function _decodeArrayOfRichMessageButton(input: unknown): ReadonlyArray<Types.RichMessageButton> | typeof decodeFailure {
  return _decodeArray(input, _decodeRichMessageButton);
}

export function _decodeArrayOfRichBlockListItem(input: unknown): ReadonlyArray<Types.RichBlockListItem> | typeof decodeFailure {
  return _decodeArray(input, _decodeRichBlockListItem);
}

export function _decodeArrayOfInputChecklistTask(input: unknown): ReadonlyArray<Types.InputChecklistTask> | typeof decodeFailure {
  return _decodeArray(input, _decodeInputChecklistTask);
}

export function _decodeArrayOfRichBlockTableCell(input: unknown): ReadonlyArray<Types.RichBlockTableCell> | typeof decodeFailure {
  return _decodeArray(input, _decodeRichBlockTableCell);
}

export function _decodeArrayOfArrayOfPhotoSize(input: unknown): ReadonlyArray<ReadonlyArray<Types.PhotoSize>> | typeof decodeFailure {
  return _decodeArray(input, _decodeArrayOfPhotoSize);
}

export function _decodeArrayOfInlineKeyboardButton(input: unknown): ReadonlyArray<Types.InlineKeyboardButton> | typeof decodeFailure {
  return _decodeArray(input, _decodeInlineKeyboardButton);
}

export function _decodeArrayOfInputRichMessageMedia(input: unknown): ReadonlyArray<Types.InputRichMessageMedia> | typeof decodeFailure {
  return _decodeArray(input, _decodeInputRichMessageMedia);
}

export function _decodeArrayOfInputRichBlockListItem(input: unknown): ReadonlyArray<Types.InputRichBlockListItem> | typeof decodeFailure {
  return _decodeArray(input, _decodeInputRichBlockListItem);
}

export function _decodeArrayOfArrayOfKeyboardButton(input: unknown): ReadonlyArray<ReadonlyArray<Types.KeyboardButton>> | typeof decodeFailure {
  return _decodeArray(input, _decodeArrayOfKeyboardButton);
}

export function _decodeArrayOfEncryptedPassportElement(input: unknown): ReadonlyArray<Types.EncryptedPassportElement> | typeof decodeFailure {
  return _decodeArray(input, _decodeEncryptedPassportElement);
}

export function _decodeArrayOfArrayOfRichBlockTableCell(input: unknown): ReadonlyArray<ReadonlyArray<Types.RichBlockTableCell>> | typeof decodeFailure {
  return _decodeArray(input, _decodeArrayOfRichBlockTableCell);
}

export function _decodeArrayOfBusinessOpeningHoursInterval(input: unknown): ReadonlyArray<Types.BusinessOpeningHoursInterval> | typeof decodeFailure {
  return _decodeArray(input, _decodeBusinessOpeningHoursInterval);
}

export function _decodeArrayOfArrayOfInlineKeyboardButton(input: unknown): ReadonlyArray<ReadonlyArray<Types.InlineKeyboardButton>> | typeof decodeFailure {
  return _decodeArray(input, _decodeArrayOfInlineKeyboardButton);
}

export function _decodeAcceptedGiftTypes(input: unknown): Types.AcceptedGiftTypes | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "unlimited_gifts": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["unlimitedGifts"] = decoded;
      seen |= 1;
      break;
    }
    case "limited_gifts": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["limitedGifts"] = decoded;
      seen |= 2;
      break;
    }
    case "unique_gifts": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["uniqueGifts"] = decoded;
      seen |= 4;
      break;
    }
    case "premium_subscription": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["premiumSubscription"] = decoded;
      seen |= 8;
      break;
    }
    case "gifts_from_channels": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["giftsFromChannels"] = decoded;
      seen |= 16;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 31) return decodeFailure;
  return output as Types.AcceptedGiftTypes;
}

export function _decodeAffiliateInfo(input: unknown): Types.AffiliateInfo | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "affiliate_user": {
      const raw = source[key];
      const decoded = _decodeUser(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["affiliateUser"] = decoded;
      break;
    }
    case "affiliate_chat": {
      const raw = source[key];
      const decoded = _decodeChat(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["affiliateChat"] = decoded;
      break;
    }
    case "commission_per_mille": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["commissionPerMille"] = decoded;
      seen |= 1;
      break;
    }
    case "amount": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["amount"] = decoded;
      seen |= 2;
      break;
    }
    case "nanostar_amount": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["nanostarAmount"] = decoded;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 3) return decodeFailure;
  return output as Types.AffiliateInfo;
}

export function _decodeAnimation(input: unknown): Types.Animation | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "file_id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["fileId"] = decoded;
      seen |= 1;
      break;
    }
    case "file_unique_id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["fileUniqueId"] = decoded;
      seen |= 2;
      break;
    }
    case "width": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["width"] = decoded;
      seen |= 4;
      break;
    }
    case "height": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["height"] = decoded;
      seen |= 8;
      break;
    }
    case "duration": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["duration"] = decoded;
      seen |= 16;
      break;
    }
    case "thumbnail": {
      const raw = source[key];
      const decoded = _decodePhotoSize(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["thumbnail"] = decoded;
      break;
    }
    case "file_name": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["fileName"] = decoded;
      break;
    }
    case "mime_type": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["mimeType"] = decoded;
      break;
    }
    case "file_size": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["fileSize"] = decoded;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 31) return decodeFailure;
  return output as Types.Animation;
}

export function _decodeAudio(input: unknown): Types.Audio | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "file_id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["fileId"] = decoded;
      seen |= 1;
      break;
    }
    case "file_unique_id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["fileUniqueId"] = decoded;
      seen |= 2;
      break;
    }
    case "duration": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["duration"] = decoded;
      seen |= 4;
      break;
    }
    case "performer": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["performer"] = decoded;
      break;
    }
    case "title": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["title"] = decoded;
      break;
    }
    case "file_name": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["fileName"] = decoded;
      break;
    }
    case "mime_type": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["mimeType"] = decoded;
      break;
    }
    case "file_size": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["fileSize"] = decoded;
      break;
    }
    case "thumbnail": {
      const raw = source[key];
      const decoded = _decodePhotoSize(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["thumbnail"] = decoded;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 7) return decodeFailure;
  return output as Types.Audio;
}

export function _decodeBackgroundFill(input: unknown): Types.BackgroundFill | typeof decodeFailure {
  const member0 = _decodeBackgroundFillSolid(input);
  if (member0 !== decodeFailure) return member0;
  const member1 = _decodeBackgroundFillGradient(input);
  if (member1 !== decodeFailure) return member1;
  const member2 = _decodeBackgroundFillFreeformGradient(input);
  if (member2 !== decodeFailure) return member2;
  return decodeFailure;
}

export function _decodeBackgroundFillFreeformGradient(input: unknown): Types.BackgroundFillFreeformGradient | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "freeform_gradient" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "colors": {
      const raw = source[key];
      const decoded = _decodeArrayOfInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["colors"] = decoded;
      }
      seen |= 2;
      break;
    }

    }
  }
  if (seen !== 3) return decodeFailure;
  return (output ?? source) as Types.BackgroundFillFreeformGradient;
}

export function _decodeBackgroundFillGradient(input: unknown): Types.BackgroundFillGradient | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "gradient" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      output["type"] = decoded;
      seen |= 1;
      break;
    }
    case "top_color": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["topColor"] = decoded;
      seen |= 2;
      break;
    }
    case "bottom_color": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["bottomColor"] = decoded;
      seen |= 4;
      break;
    }
    case "rotation_angle": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["rotationAngle"] = decoded;
      seen |= 8;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 15) return decodeFailure;
  return output as Types.BackgroundFillGradient;
}

export function _decodeBackgroundFillSolid(input: unknown): Types.BackgroundFillSolid | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "solid" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "color": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["color"] = decoded;
      }
      seen |= 2;
      break;
    }

    }
  }
  if (seen !== 3) return decodeFailure;
  return (output ?? source) as Types.BackgroundFillSolid;
}

export function _decodeBackgroundType(input: unknown): Types.BackgroundType | typeof decodeFailure {
  const member0 = _decodeBackgroundTypeFill(input);
  if (member0 !== decodeFailure) return member0;
  const member1 = _decodeBackgroundTypeWallpaper(input);
  if (member1 !== decodeFailure) return member1;
  const member2 = _decodeBackgroundTypePattern(input);
  if (member2 !== decodeFailure) return member2;
  const member3 = _decodeBackgroundTypeChatTheme(input);
  if (member3 !== decodeFailure) return member3;
  return decodeFailure;
}

export function _decodeBackgroundTypeChatTheme(input: unknown): Types.BackgroundTypeChatTheme | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "chat_theme" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      output["type"] = decoded;
      seen |= 1;
      break;
    }
    case "theme_name": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["themeName"] = decoded;
      seen |= 2;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 3) return decodeFailure;
  return output as Types.BackgroundTypeChatTheme;
}

export function _decodeBackgroundTypeFill(input: unknown): Types.BackgroundTypeFill | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "fill" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      output["type"] = decoded;
      seen |= 1;
      break;
    }
    case "fill": {
      const raw = source[key];
      const decoded = _decodeBackgroundFill(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["fill"] = decoded;
      seen |= 2;
      break;
    }
    case "dark_theme_dimming": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["darkThemeDimming"] = decoded;
      seen |= 4;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 7) return decodeFailure;
  return output as Types.BackgroundTypeFill;
}

export function _decodeBackgroundTypePattern(input: unknown): Types.BackgroundTypePattern | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "pattern" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "document": {
      const raw = source[key];
      const decoded = _decodeDocument(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["document"] = decoded;
      }
      seen |= 2;
      break;
    }
    case "fill": {
      const raw = source[key];
      const decoded = _decodeBackgroundFill(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["fill"] = decoded;
      }
      seen |= 4;
      break;
    }
    case "intensity": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["intensity"] = decoded;
      }
      seen |= 8;
      break;
    }
    case "is_inverted": {
      const raw = source[key];
      const decoded = _decodeTrue(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["isInverted"] = decoded;
      delete output["is_inverted"];
      break;
    }
    case "is_moving": {
      const raw = source[key];
      const decoded = _decodeTrue(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["isMoving"] = decoded;
      delete output["is_moving"];
      break;
    }

    }
  }
  if (seen !== 15) return decodeFailure;
  return (output ?? source) as Types.BackgroundTypePattern;
}

export function _decodeBackgroundTypeWallpaper(input: unknown): Types.BackgroundTypeWallpaper | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "wallpaper" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      output["type"] = decoded;
      seen |= 1;
      break;
    }
    case "document": {
      const raw = source[key];
      const decoded = _decodeDocument(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["document"] = decoded;
      seen |= 2;
      break;
    }
    case "dark_theme_dimming": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["darkThemeDimming"] = decoded;
      seen |= 4;
      break;
    }
    case "is_blurred": {
      const raw = source[key];
      const decoded = _decodeTrue(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["isBlurred"] = decoded;
      break;
    }
    case "is_moving": {
      const raw = source[key];
      const decoded = _decodeTrue(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["isMoving"] = decoded;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 7) return decodeFailure;
  return output as Types.BackgroundTypeWallpaper;
}

export function _decodeBirthdate(input: unknown): Types.Birthdate | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "day": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["day"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "month": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["month"] = decoded;
      }
      seen |= 2;
      break;
    }
    case "year": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["year"] = decoded;
      }
      break;
    }

    }
  }
  if (seen !== 3) return decodeFailure;
  return (output ?? source) as Types.Birthdate;
}

export function _decodeBotAccessSettings(input: unknown): Types.BotAccessSettings | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "is_access_restricted": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["isAccessRestricted"] = decoded;
      seen |= 1;
      break;
    }
    case "added_users": {
      const raw = source[key];
      const decoded = _decodeArrayOfUser(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["addedUsers"] = decoded;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 1) return decodeFailure;
  return output as Types.BotAccessSettings;
}

export function _decodeBotCommand(input: unknown): Types.BotCommand | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "command": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["command"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "description": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["description"] = decoded;
      }
      seen |= 2;
      break;
    }
    case "is_ephemeral": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["isEphemeral"] = decoded;
      delete output["is_ephemeral"];
      break;
    }

    }
  }
  if (seen !== 3) return decodeFailure;
  return (output ?? source) as Types.BotCommand;
}

export function _decodeBotCommandScope(input: unknown): Types.BotCommandScope | typeof decodeFailure {
  const member0 = _decodeBotCommandScopeDefault(input);
  if (member0 !== decodeFailure) return member0;
  const member1 = _decodeBotCommandScopeAllPrivateChats(input);
  if (member1 !== decodeFailure) return member1;
  const member2 = _decodeBotCommandScopeAllGroupChats(input);
  if (member2 !== decodeFailure) return member2;
  const member3 = _decodeBotCommandScopeAllChatAdministrators(input);
  if (member3 !== decodeFailure) return member3;
  const member4 = _decodeBotCommandScopeChat(input);
  if (member4 !== decodeFailure) return member4;
  const member5 = _decodeBotCommandScopeChatAdministrators(input);
  if (member5 !== decodeFailure) return member5;
  const member6 = _decodeBotCommandScopeChatMember(input);
  if (member6 !== decodeFailure) return member6;
  return decodeFailure;
}

export function _decodeBotCommandScopeAllChatAdministrators(input: unknown): Types.BotCommandScopeAllChatAdministrators | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "all_chat_administrators" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      seen |= 1;
      break;
    }

    }
  }
  if (seen !== 1) return decodeFailure;
  return (output ?? source) as Types.BotCommandScopeAllChatAdministrators;
}

export function _decodeBotCommandScopeAllGroupChats(input: unknown): Types.BotCommandScopeAllGroupChats | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "all_group_chats" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      seen |= 1;
      break;
    }

    }
  }
  if (seen !== 1) return decodeFailure;
  return (output ?? source) as Types.BotCommandScopeAllGroupChats;
}

export function _decodeBotCommandScopeAllPrivateChats(input: unknown): Types.BotCommandScopeAllPrivateChats | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "all_private_chats" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      seen |= 1;
      break;
    }

    }
  }
  if (seen !== 1) return decodeFailure;
  return (output ?? source) as Types.BotCommandScopeAllPrivateChats;
}

export function _decodeBotCommandScopeChat(input: unknown): Types.BotCommandScopeChat | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "chat" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      output["type"] = decoded;
      seen |= 1;
      break;
    }
    case "chat_id": {
      const raw = source[key];
      let decoded: unknown = decodeFailure;
      if (decoded === decodeFailure) decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["chatId"] = decoded;
      seen |= 2;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 3) return decodeFailure;
  return output as Types.BotCommandScopeChat;
}

export function _decodeBotCommandScopeChatAdministrators(input: unknown): Types.BotCommandScopeChatAdministrators | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "chat_administrators" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      output["type"] = decoded;
      seen |= 1;
      break;
    }
    case "chat_id": {
      const raw = source[key];
      let decoded: unknown = decodeFailure;
      if (decoded === decodeFailure) decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["chatId"] = decoded;
      seen |= 2;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 3) return decodeFailure;
  return output as Types.BotCommandScopeChatAdministrators;
}

export function _decodeBotCommandScopeChatMember(input: unknown): Types.BotCommandScopeChatMember | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "chat_member" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      output["type"] = decoded;
      seen |= 1;
      break;
    }
    case "chat_id": {
      const raw = source[key];
      let decoded: unknown = decodeFailure;
      if (decoded === decodeFailure) decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["chatId"] = decoded;
      seen |= 2;
      break;
    }
    case "user_id": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["userId"] = decoded;
      seen |= 4;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 7) return decodeFailure;
  return output as Types.BotCommandScopeChatMember;
}

export function _decodeBotCommandScopeDefault(input: unknown): Types.BotCommandScopeDefault | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "default" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      seen |= 1;
      break;
    }

    }
  }
  if (seen !== 1) return decodeFailure;
  return (output ?? source) as Types.BotCommandScopeDefault;
}

export function _decodeBotDescription(input: unknown): Types.BotDescription | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "description": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["description"] = decoded;
      }
      seen |= 1;
      break;
    }

    }
  }
  if (seen !== 1) return decodeFailure;
  return (output ?? source) as Types.BotDescription;
}

export function _decodeBotName(input: unknown): Types.BotName | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "name": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["name"] = decoded;
      }
      seen |= 1;
      break;
    }

    }
  }
  if (seen !== 1) return decodeFailure;
  return (output ?? source) as Types.BotName;
}

export function _decodeBotShortDescription(input: unknown): Types.BotShortDescription | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "short_description": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["shortDescription"] = decoded;
      seen |= 1;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 1) return decodeFailure;
  return output as Types.BotShortDescription;
}

export function _decodeBotSubscriptionUpdated(input: unknown): Types.BotSubscriptionUpdated | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "user": {
      const raw = source[key];
      const decoded = _decodeUser(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["user"] = decoded;
      seen |= 1;
      break;
    }
    case "invoice_payload": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["invoicePayload"] = decoded;
      seen |= 2;
      break;
    }
    case "state": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["state"] = decoded;
      seen |= 4;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 7) return decodeFailure;
  return output as Types.BotSubscriptionUpdated;
}

export function _decodeBusinessBotRights(input: unknown): Types.BusinessBotRights | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "can_reply": {
      const raw = source[key];
      const decoded = _decodeTrue(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["canReply"] = decoded;
      delete output["can_reply"];
      break;
    }
    case "can_read_messages": {
      const raw = source[key];
      const decoded = _decodeTrue(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["canReadMessages"] = decoded;
      delete output["can_read_messages"];
      break;
    }
    case "can_delete_sent_messages": {
      const raw = source[key];
      const decoded = _decodeTrue(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["canDeleteSentMessages"] = decoded;
      delete output["can_delete_sent_messages"];
      break;
    }
    case "can_delete_all_messages": {
      const raw = source[key];
      const decoded = _decodeTrue(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["canDeleteAllMessages"] = decoded;
      delete output["can_delete_all_messages"];
      break;
    }
    case "can_edit_name": {
      const raw = source[key];
      const decoded = _decodeTrue(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["canEditName"] = decoded;
      delete output["can_edit_name"];
      break;
    }
    case "can_edit_bio": {
      const raw = source[key];
      const decoded = _decodeTrue(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["canEditBio"] = decoded;
      delete output["can_edit_bio"];
      break;
    }
    case "can_edit_profile_photo": {
      const raw = source[key];
      const decoded = _decodeTrue(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["canEditProfilePhoto"] = decoded;
      delete output["can_edit_profile_photo"];
      break;
    }
    case "can_edit_username": {
      const raw = source[key];
      const decoded = _decodeTrue(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["canEditUsername"] = decoded;
      delete output["can_edit_username"];
      break;
    }
    case "can_change_gift_settings": {
      const raw = source[key];
      const decoded = _decodeTrue(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["canChangeGiftSettings"] = decoded;
      delete output["can_change_gift_settings"];
      break;
    }
    case "can_view_gifts_and_stars": {
      const raw = source[key];
      const decoded = _decodeTrue(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["canViewGiftsAndStars"] = decoded;
      delete output["can_view_gifts_and_stars"];
      break;
    }
    case "can_convert_gifts_to_stars": {
      const raw = source[key];
      const decoded = _decodeTrue(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["canConvertGiftsToStars"] = decoded;
      delete output["can_convert_gifts_to_stars"];
      break;
    }
    case "can_transfer_and_upgrade_gifts": {
      const raw = source[key];
      const decoded = _decodeTrue(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["canTransferAndUpgradeGifts"] = decoded;
      delete output["can_transfer_and_upgrade_gifts"];
      break;
    }
    case "can_transfer_stars": {
      const raw = source[key];
      const decoded = _decodeTrue(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["canTransferStars"] = decoded;
      delete output["can_transfer_stars"];
      break;
    }
    case "can_manage_stories": {
      const raw = source[key];
      const decoded = _decodeTrue(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["canManageStories"] = decoded;
      delete output["can_manage_stories"];
      break;
    }

    }
  }
  if (seen !== 0) return decodeFailure;
  return (output ?? source) as Types.BusinessBotRights;
}

export function _decodeBusinessConnection(input: unknown): Types.BusinessConnection | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["id"] = decoded;
      seen |= 1;
      break;
    }
    case "user": {
      const raw = source[key];
      const decoded = _decodeUser(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["user"] = decoded;
      seen |= 2;
      break;
    }
    case "user_chat_id": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["userChatId"] = decoded;
      seen |= 4;
      break;
    }
    case "date": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["date"] = decoded;
      seen |= 8;
      break;
    }
    case "rights": {
      const raw = source[key];
      const decoded = _decodeBusinessBotRights(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["rights"] = decoded;
      break;
    }
    case "is_enabled": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["isEnabled"] = decoded;
      seen |= 16;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 31) return decodeFailure;
  return output as Types.BusinessConnection;
}

export function _decodeBusinessIntro(input: unknown): Types.BusinessIntro | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "title": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["title"] = decoded;
      }
      break;
    }
    case "message": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["message"] = decoded;
      }
      break;
    }
    case "sticker": {
      const raw = source[key];
      const decoded = _decodeSticker(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["sticker"] = decoded;
      }
      break;
    }

    }
  }
  if (seen !== 0) return decodeFailure;
  return (output ?? source) as Types.BusinessIntro;
}

export function _decodeBusinessLocation(input: unknown): Types.BusinessLocation | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "address": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["address"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "location": {
      const raw = source[key];
      const decoded = _decodeLocation(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["location"] = decoded;
      }
      break;
    }

    }
  }
  if (seen !== 1) return decodeFailure;
  return (output ?? source) as Types.BusinessLocation;
}

export function _decodeBusinessMessagesDeleted(input: unknown): Types.BusinessMessagesDeleted | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "business_connection_id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["businessConnectionId"] = decoded;
      seen |= 1;
      break;
    }
    case "chat": {
      const raw = source[key];
      const decoded = _decodeChat(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["chat"] = decoded;
      seen |= 2;
      break;
    }
    case "message_ids": {
      const raw = source[key];
      const decoded = _decodeArrayOfInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["messageIds"] = decoded;
      seen |= 4;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 7) return decodeFailure;
  return output as Types.BusinessMessagesDeleted;
}

export function _decodeBusinessOpeningHours(input: unknown): Types.BusinessOpeningHours | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "time_zone_name": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["timeZoneName"] = decoded;
      seen |= 1;
      break;
    }
    case "opening_hours": {
      const raw = source[key];
      const decoded = _decodeArrayOfBusinessOpeningHoursInterval(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["openingHours"] = decoded;
      seen |= 2;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 3) return decodeFailure;
  return output as Types.BusinessOpeningHours;
}

export function _decodeBusinessOpeningHoursInterval(input: unknown): Types.BusinessOpeningHoursInterval | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "opening_minute": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["openingMinute"] = decoded;
      seen |= 1;
      break;
    }
    case "closing_minute": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["closingMinute"] = decoded;
      seen |= 2;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 3) return decodeFailure;
  return output as Types.BusinessOpeningHoursInterval;
}

export function _decodeCallbackGame(input: unknown): Types.CallbackGame | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {


    }
  }
  if (seen !== 0) return decodeFailure;
  return (output ?? source) as Types.CallbackGame;
}

export function _decodeCallbackQuery(input: unknown): Types.CallbackQuery | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["id"] = decoded;
      seen |= 1;
      break;
    }
    case "from": {
      const raw = source[key];
      const decoded = _decodeUser(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["from"] = decoded;
      seen |= 2;
      break;
    }
    case "message": {
      const raw = source[key];
      const decoded = _decodeMaybeInaccessibleMessage(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["message"] = decoded;
      break;
    }
    case "inline_message_id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["inlineMessageId"] = decoded;
      break;
    }
    case "chat_instance": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["chatInstance"] = decoded;
      seen |= 4;
      break;
    }
    case "data": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["data"] = decoded;
      break;
    }
    case "game_short_name": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["gameShortName"] = decoded;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 7) return decodeFailure;
  return output as Types.CallbackQuery;
}

export function _decodeChat(input: unknown): Types.Chat | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "id": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["id"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "type": {
      const raw = source[key];
      const decoded = _decodeChatType(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      seen |= 2;
      break;
    }
    case "title": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["title"] = decoded;
      }
      break;
    }
    case "username": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["username"] = decoded;
      }
      break;
    }
    case "first_name": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["firstName"] = decoded;
      delete output["first_name"];
      break;
    }
    case "last_name": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["lastName"] = decoded;
      delete output["last_name"];
      break;
    }
    case "is_forum": {
      const raw = source[key];
      const decoded = _decodeTrue(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["isForum"] = decoded;
      delete output["is_forum"];
      break;
    }
    case "is_direct_messages": {
      const raw = source[key];
      const decoded = _decodeTrue(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["isDirectMessages"] = decoded;
      delete output["is_direct_messages"];
      break;
    }

    }
  }
  if (seen !== 3) return decodeFailure;
  return (output ?? source) as Types.Chat;
}

export function _decodeChatAdministratorRights(input: unknown): Types.ChatAdministratorRights | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "is_anonymous": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["isAnonymous"] = decoded;
      seen |= 1;
      break;
    }
    case "can_manage_chat": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["canManageChat"] = decoded;
      seen |= 2;
      break;
    }
    case "can_delete_messages": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["canDeleteMessages"] = decoded;
      seen |= 4;
      break;
    }
    case "can_manage_video_chats": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["canManageVideoChats"] = decoded;
      seen |= 8;
      break;
    }
    case "can_restrict_members": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["canRestrictMembers"] = decoded;
      seen |= 16;
      break;
    }
    case "can_promote_members": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["canPromoteMembers"] = decoded;
      seen |= 32;
      break;
    }
    case "can_change_info": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["canChangeInfo"] = decoded;
      seen |= 64;
      break;
    }
    case "can_invite_users": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["canInviteUsers"] = decoded;
      seen |= 128;
      break;
    }
    case "can_post_stories": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["canPostStories"] = decoded;
      seen |= 256;
      break;
    }
    case "can_edit_stories": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["canEditStories"] = decoded;
      seen |= 512;
      break;
    }
    case "can_delete_stories": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["canDeleteStories"] = decoded;
      seen |= 1024;
      break;
    }
    case "can_post_messages": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["canPostMessages"] = decoded;
      break;
    }
    case "can_edit_messages": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["canEditMessages"] = decoded;
      break;
    }
    case "can_pin_messages": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["canPinMessages"] = decoded;
      break;
    }
    case "can_manage_topics": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["canManageTopics"] = decoded;
      break;
    }
    case "can_manage_direct_messages": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["canManageDirectMessages"] = decoded;
      break;
    }
    case "can_manage_tags": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["canManageTags"] = decoded;
      break;
    }
    case "can_send_welcome_messages": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["canSendWelcomeMessages"] = decoded;
      seen |= 2048;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 4095) return decodeFailure;
  return output as Types.ChatAdministratorRights;
}

export function _decodeChatBackground(input: unknown): Types.ChatBackground | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = _decodeBackgroundType(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      seen |= 1;
      break;
    }

    }
  }
  if (seen !== 1) return decodeFailure;
  return (output ?? source) as Types.ChatBackground;
}

export function _decodeChatBoost(input: unknown): Types.ChatBoost | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "boost_id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["boostId"] = decoded;
      seen |= 1;
      break;
    }
    case "add_date": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["addDate"] = decoded;
      seen |= 2;
      break;
    }
    case "expiration_date": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["expirationDate"] = decoded;
      seen |= 4;
      break;
    }
    case "source": {
      const raw = source[key];
      const decoded = _decodeChatBoostSource(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["source"] = decoded;
      seen |= 8;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 15) return decodeFailure;
  return output as Types.ChatBoost;
}

export function _decodeChatBoostAdded(input: unknown): Types.ChatBoostAdded | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "boost_count": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["boostCount"] = decoded;
      seen |= 1;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 1) return decodeFailure;
  return output as Types.ChatBoostAdded;
}

export function _decodeChatBoostRemoved(input: unknown): Types.ChatBoostRemoved | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "chat": {
      const raw = source[key];
      const decoded = _decodeChat(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["chat"] = decoded;
      seen |= 1;
      break;
    }
    case "boost_id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["boostId"] = decoded;
      seen |= 2;
      break;
    }
    case "remove_date": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["removeDate"] = decoded;
      seen |= 4;
      break;
    }
    case "source": {
      const raw = source[key];
      const decoded = _decodeChatBoostSource(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["source"] = decoded;
      seen |= 8;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 15) return decodeFailure;
  return output as Types.ChatBoostRemoved;
}

export function _decodeChatBoostSource(input: unknown): Types.ChatBoostSource | typeof decodeFailure {
  const member0 = _decodeChatBoostSourcePremium(input);
  if (member0 !== decodeFailure) return member0;
  const member1 = _decodeChatBoostSourceGiftCode(input);
  if (member1 !== decodeFailure) return member1;
  const member2 = _decodeChatBoostSourceGiveaway(input);
  if (member2 !== decodeFailure) return member2;
  return decodeFailure;
}

export function _decodeChatBoostSourceGiftCode(input: unknown): Types.ChatBoostSourceGiftCode | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "source": {
      const raw = source[key];
      const decoded = raw === "gift_code" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["source"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "user": {
      const raw = source[key];
      const decoded = _decodeUser(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["user"] = decoded;
      }
      seen |= 2;
      break;
    }

    }
  }
  if (seen !== 3) return decodeFailure;
  return (output ?? source) as Types.ChatBoostSourceGiftCode;
}

export function _decodeChatBoostSourceGiveaway(input: unknown): Types.ChatBoostSourceGiveaway | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "source": {
      const raw = source[key];
      const decoded = raw === "giveaway" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      output["source"] = decoded;
      seen |= 1;
      break;
    }
    case "giveaway_message_id": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["giveawayMessageId"] = decoded;
      seen |= 2;
      break;
    }
    case "user": {
      const raw = source[key];
      const decoded = _decodeUser(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["user"] = decoded;
      break;
    }
    case "prize_star_count": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["prizeStarCount"] = decoded;
      break;
    }
    case "is_unclaimed": {
      const raw = source[key];
      const decoded = _decodeTrue(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["isUnclaimed"] = decoded;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 3) return decodeFailure;
  return output as Types.ChatBoostSourceGiveaway;
}

export function _decodeChatBoostSourcePremium(input: unknown): Types.ChatBoostSourcePremium | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "source": {
      const raw = source[key];
      const decoded = raw === "premium" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["source"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "user": {
      const raw = source[key];
      const decoded = _decodeUser(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["user"] = decoded;
      }
      seen |= 2;
      break;
    }

    }
  }
  if (seen !== 3) return decodeFailure;
  return (output ?? source) as Types.ChatBoostSourcePremium;
}

export function _decodeChatBoostUpdated(input: unknown): Types.ChatBoostUpdated | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "chat": {
      const raw = source[key];
      const decoded = _decodeChat(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["chat"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "boost": {
      const raw = source[key];
      const decoded = _decodeChatBoost(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["boost"] = decoded;
      }
      seen |= 2;
      break;
    }

    }
  }
  if (seen !== 3) return decodeFailure;
  return (output ?? source) as Types.ChatBoostUpdated;
}

export function _decodeChatFullInfo(input: unknown): Types.ChatFullInfo | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "id": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["id"] = decoded;
      seen |= 1;
      break;
    }
    case "type": {
      const raw = source[key];
      const decoded = _decodeChatType(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["type"] = decoded;
      seen |= 2;
      break;
    }
    case "title": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["title"] = decoded;
      break;
    }
    case "username": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["username"] = decoded;
      break;
    }
    case "first_name": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["firstName"] = decoded;
      break;
    }
    case "last_name": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["lastName"] = decoded;
      break;
    }
    case "is_forum": {
      const raw = source[key];
      const decoded = _decodeTrue(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["isForum"] = decoded;
      break;
    }
    case "is_direct_messages": {
      const raw = source[key];
      const decoded = _decodeTrue(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["isDirectMessages"] = decoded;
      break;
    }
    case "accent_color_id": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["accentColorId"] = decoded;
      seen |= 4;
      break;
    }
    case "max_reaction_count": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["maxReactionCount"] = decoded;
      seen |= 8;
      break;
    }
    case "photo": {
      const raw = source[key];
      const decoded = _decodeChatPhoto(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["photo"] = decoded;
      break;
    }
    case "active_usernames": {
      const raw = source[key];
      const decoded = _decodeArrayOfString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["activeUsernames"] = decoded;
      break;
    }
    case "birthdate": {
      const raw = source[key];
      const decoded = _decodeBirthdate(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["birthdate"] = decoded;
      break;
    }
    case "business_intro": {
      const raw = source[key];
      const decoded = _decodeBusinessIntro(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["businessIntro"] = decoded;
      break;
    }
    case "business_location": {
      const raw = source[key];
      const decoded = _decodeBusinessLocation(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["businessLocation"] = decoded;
      break;
    }
    case "business_opening_hours": {
      const raw = source[key];
      const decoded = _decodeBusinessOpeningHours(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["businessOpeningHours"] = decoded;
      break;
    }
    case "personal_chat": {
      const raw = source[key];
      const decoded = _decodeChat(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["personalChat"] = decoded;
      break;
    }
    case "parent_chat": {
      const raw = source[key];
      const decoded = _decodeChat(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["parentChat"] = decoded;
      break;
    }
    case "available_reactions": {
      const raw = source[key];
      const decoded = _decodeArrayOfReactionType(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["availableReactions"] = decoded;
      break;
    }
    case "background_custom_emoji_id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["backgroundCustomEmojiId"] = decoded;
      break;
    }
    case "profile_accent_color_id": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["profileAccentColorId"] = decoded;
      break;
    }
    case "profile_background_custom_emoji_id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["profileBackgroundCustomEmojiId"] = decoded;
      break;
    }
    case "emoji_status_custom_emoji_id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["emojiStatusCustomEmojiId"] = decoded;
      break;
    }
    case "emoji_status_expiration_date": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["emojiStatusExpirationDate"] = decoded;
      break;
    }
    case "bio": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["bio"] = decoded;
      break;
    }
    case "has_private_forwards": {
      const raw = source[key];
      const decoded = _decodeTrue(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["hasPrivateForwards"] = decoded;
      break;
    }
    case "has_restricted_voice_and_video_messages": {
      const raw = source[key];
      const decoded = _decodeTrue(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["hasRestrictedVoiceAndVideoMessages"] = decoded;
      break;
    }
    case "join_to_send_messages": {
      const raw = source[key];
      const decoded = _decodeTrue(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["joinToSendMessages"] = decoded;
      break;
    }
    case "join_by_request": {
      const raw = source[key];
      const decoded = _decodeTrue(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["joinByRequest"] = decoded;
      break;
    }
    case "description": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["description"] = decoded;
      break;
    }
    case "invite_link": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["inviteLink"] = decoded;
      break;
    }
    case "pinned_message": {
      const raw = source[key];
      const decoded = _decodeMessage(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["pinnedMessage"] = decoded;
      break;
    }
    case "permissions": {
      const raw = source[key];
      const decoded = _decodeChatPermissions(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["permissions"] = decoded;
      break;
    }
    case "accepted_gift_types": {
      const raw = source[key];
      const decoded = _decodeAcceptedGiftTypes(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["acceptedGiftTypes"] = decoded;
      seen |= 16;
      break;
    }
    case "can_send_paid_media": {
      const raw = source[key];
      const decoded = _decodeTrue(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["canSendPaidMedia"] = decoded;
      break;
    }
    case "slow_mode_delay": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["slowModeDelay"] = decoded;
      break;
    }
    case "unrestrict_boost_count": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["unrestrictBoostCount"] = decoded;
      break;
    }
    case "message_auto_delete_time": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["messageAutoDeleteTime"] = decoded;
      break;
    }
    case "has_aggressive_anti_spam_enabled": {
      const raw = source[key];
      const decoded = _decodeTrue(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["hasAggressiveAntiSpamEnabled"] = decoded;
      break;
    }
    case "has_hidden_members": {
      const raw = source[key];
      const decoded = _decodeTrue(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["hasHiddenMembers"] = decoded;
      break;
    }
    case "has_protected_content": {
      const raw = source[key];
      const decoded = _decodeTrue(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["hasProtectedContent"] = decoded;
      break;
    }
    case "has_visible_history": {
      const raw = source[key];
      const decoded = _decodeTrue(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["hasVisibleHistory"] = decoded;
      break;
    }
    case "sticker_set_name": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["stickerSetName"] = decoded;
      break;
    }
    case "can_set_sticker_set": {
      const raw = source[key];
      const decoded = _decodeTrue(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["canSetStickerSet"] = decoded;
      break;
    }
    case "custom_emoji_sticker_set_name": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["customEmojiStickerSetName"] = decoded;
      break;
    }
    case "linked_chat_id": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["linkedChatId"] = decoded;
      break;
    }
    case "location": {
      const raw = source[key];
      const decoded = _decodeChatLocation(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["location"] = decoded;
      break;
    }
    case "rating": {
      const raw = source[key];
      const decoded = _decodeUserRating(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["rating"] = decoded;
      break;
    }
    case "first_profile_audio": {
      const raw = source[key];
      const decoded = _decodeAudio(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["firstProfileAudio"] = decoded;
      break;
    }
    case "unique_gift_colors": {
      const raw = source[key];
      const decoded = _decodeUniqueGiftColors(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["uniqueGiftColors"] = decoded;
      break;
    }
    case "paid_message_star_count": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["paidMessageStarCount"] = decoded;
      break;
    }
    case "guard_bot": {
      const raw = source[key];
      const decoded = _decodeUser(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["guardBot"] = decoded;
      break;
    }
    case "community": {
      const raw = source[key];
      const decoded = _decodeCommunity(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["community"] = decoded;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 31) return decodeFailure;
  return output as Types.ChatFullInfo;
}

export function _decodeChatInviteLink(input: unknown): Types.ChatInviteLink | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "invite_link": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["inviteLink"] = decoded;
      seen |= 1;
      break;
    }
    case "creator": {
      const raw = source[key];
      const decoded = _decodeUser(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["creator"] = decoded;
      seen |= 2;
      break;
    }
    case "creates_join_request": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["createsJoinRequest"] = decoded;
      seen |= 4;
      break;
    }
    case "is_primary": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["isPrimary"] = decoded;
      seen |= 8;
      break;
    }
    case "is_revoked": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["isRevoked"] = decoded;
      seen |= 16;
      break;
    }
    case "name": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["name"] = decoded;
      break;
    }
    case "expire_date": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["expireDate"] = decoded;
      break;
    }
    case "member_limit": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["memberLimit"] = decoded;
      break;
    }
    case "pending_join_request_count": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["pendingJoinRequestCount"] = decoded;
      break;
    }
    case "subscription_period": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["subscriptionPeriod"] = decoded;
      break;
    }
    case "subscription_price": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["subscriptionPrice"] = decoded;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 31) return decodeFailure;
  return output as Types.ChatInviteLink;
}

export function _decodeChatJoinRequest(input: unknown): Types.ChatJoinRequest | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "chat": {
      const raw = source[key];
      const decoded = _decodeChat(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["chat"] = decoded;
      seen |= 1;
      break;
    }
    case "from": {
      const raw = source[key];
      const decoded = _decodeUser(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["from"] = decoded;
      seen |= 2;
      break;
    }
    case "user_chat_id": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["userChatId"] = decoded;
      seen |= 4;
      break;
    }
    case "date": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["date"] = decoded;
      seen |= 8;
      break;
    }
    case "bio": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["bio"] = decoded;
      break;
    }
    case "invite_link": {
      const raw = source[key];
      const decoded = _decodeChatInviteLink(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["inviteLink"] = decoded;
      break;
    }
    case "query_id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["queryId"] = decoded;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 15) return decodeFailure;
  return output as Types.ChatJoinRequest;
}

export function _decodeChatLocation(input: unknown): Types.ChatLocation | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "location": {
      const raw = source[key];
      const decoded = _decodeLocation(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["location"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "address": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["address"] = decoded;
      }
      seen |= 2;
      break;
    }

    }
  }
  if (seen !== 3) return decodeFailure;
  return (output ?? source) as Types.ChatLocation;
}

export function _decodeChatMember(input: unknown): Types.ChatMember | typeof decodeFailure {
  const member0 = _decodeChatMemberOwner(input);
  if (member0 !== decodeFailure) return member0;
  const member1 = _decodeChatMemberAdministrator(input);
  if (member1 !== decodeFailure) return member1;
  const member2 = _decodeChatMemberMember(input);
  if (member2 !== decodeFailure) return member2;
  const member3 = _decodeChatMemberRestricted(input);
  if (member3 !== decodeFailure) return member3;
  const member4 = _decodeChatMemberLeft(input);
  if (member4 !== decodeFailure) return member4;
  const member5 = _decodeChatMemberBanned(input);
  if (member5 !== decodeFailure) return member5;
  return decodeFailure;
}

export function _decodeChatMemberAdministrator(input: unknown): Types.ChatMemberAdministrator | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "status": {
      const raw = source[key];
      const decoded = raw === "administrator" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      output["status"] = decoded;
      seen |= 1;
      break;
    }
    case "user": {
      const raw = source[key];
      const decoded = _decodeUser(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["user"] = decoded;
      seen |= 2;
      break;
    }
    case "can_be_edited": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["canBeEdited"] = decoded;
      seen |= 4;
      break;
    }
    case "is_anonymous": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["isAnonymous"] = decoded;
      seen |= 8;
      break;
    }
    case "can_manage_chat": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["canManageChat"] = decoded;
      seen |= 16;
      break;
    }
    case "can_delete_messages": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["canDeleteMessages"] = decoded;
      seen |= 32;
      break;
    }
    case "can_manage_video_chats": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["canManageVideoChats"] = decoded;
      seen |= 64;
      break;
    }
    case "can_restrict_members": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["canRestrictMembers"] = decoded;
      seen |= 128;
      break;
    }
    case "can_promote_members": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["canPromoteMembers"] = decoded;
      seen |= 256;
      break;
    }
    case "can_change_info": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["canChangeInfo"] = decoded;
      seen |= 512;
      break;
    }
    case "can_invite_users": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["canInviteUsers"] = decoded;
      seen |= 1024;
      break;
    }
    case "can_post_stories": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["canPostStories"] = decoded;
      seen |= 2048;
      break;
    }
    case "can_edit_stories": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["canEditStories"] = decoded;
      seen |= 4096;
      break;
    }
    case "can_delete_stories": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["canDeleteStories"] = decoded;
      seen |= 8192;
      break;
    }
    case "can_post_messages": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["canPostMessages"] = decoded;
      break;
    }
    case "can_edit_messages": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["canEditMessages"] = decoded;
      break;
    }
    case "can_pin_messages": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["canPinMessages"] = decoded;
      break;
    }
    case "can_manage_topics": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["canManageTopics"] = decoded;
      break;
    }
    case "can_manage_direct_messages": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["canManageDirectMessages"] = decoded;
      break;
    }
    case "can_manage_tags": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["canManageTags"] = decoded;
      break;
    }
    case "can_send_welcome_messages": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["canSendWelcomeMessages"] = decoded;
      seen |= 16384;
      break;
    }
    case "custom_title": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["customTitle"] = decoded;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 32767) return decodeFailure;
  return output as Types.ChatMemberAdministrator;
}

export function _decodeChatMemberBanned(input: unknown): Types.ChatMemberBanned | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "status": {
      const raw = source[key];
      const decoded = raw === "kicked" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      output["status"] = decoded;
      seen |= 1;
      break;
    }
    case "user": {
      const raw = source[key];
      const decoded = _decodeUser(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["user"] = decoded;
      seen |= 2;
      break;
    }
    case "until_date": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["untilDate"] = decoded;
      seen |= 4;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 7) return decodeFailure;
  return output as Types.ChatMemberBanned;
}

export function _decodeChatMemberLeft(input: unknown): Types.ChatMemberLeft | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "status": {
      const raw = source[key];
      const decoded = raw === "left" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["status"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "user": {
      const raw = source[key];
      const decoded = _decodeUser(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["user"] = decoded;
      }
      seen |= 2;
      break;
    }

    }
  }
  if (seen !== 3) return decodeFailure;
  return (output ?? source) as Types.ChatMemberLeft;
}

export function _decodeChatMemberMember(input: unknown): Types.ChatMemberMember | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "status": {
      const raw = source[key];
      const decoded = raw === "member" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["status"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "tag": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["tag"] = decoded;
      }
      break;
    }
    case "user": {
      const raw = source[key];
      const decoded = _decodeUser(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["user"] = decoded;
      }
      seen |= 2;
      break;
    }
    case "until_date": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["untilDate"] = decoded;
      delete output["until_date"];
      break;
    }

    }
  }
  if (seen !== 3) return decodeFailure;
  return (output ?? source) as Types.ChatMemberMember;
}

export function _decodeChatMemberOwner(input: unknown): Types.ChatMemberOwner | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "status": {
      const raw = source[key];
      const decoded = raw === "creator" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      output["status"] = decoded;
      seen |= 1;
      break;
    }
    case "user": {
      const raw = source[key];
      const decoded = _decodeUser(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["user"] = decoded;
      seen |= 2;
      break;
    }
    case "is_anonymous": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["isAnonymous"] = decoded;
      seen |= 4;
      break;
    }
    case "custom_title": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["customTitle"] = decoded;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 7) return decodeFailure;
  return output as Types.ChatMemberOwner;
}

export function _decodeChatMemberRestricted(input: unknown): Types.ChatMemberRestricted | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "status": {
      const raw = source[key];
      const decoded = raw === "restricted" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      output["status"] = decoded;
      seen |= 1;
      break;
    }
    case "tag": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["tag"] = decoded;
      break;
    }
    case "user": {
      const raw = source[key];
      const decoded = _decodeUser(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["user"] = decoded;
      seen |= 2;
      break;
    }
    case "is_member": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["isMember"] = decoded;
      seen |= 4;
      break;
    }
    case "can_send_messages": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["canSendMessages"] = decoded;
      seen |= 8;
      break;
    }
    case "can_send_audios": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["canSendAudios"] = decoded;
      seen |= 16;
      break;
    }
    case "can_send_documents": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["canSendDocuments"] = decoded;
      seen |= 32;
      break;
    }
    case "can_send_photos": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["canSendPhotos"] = decoded;
      seen |= 64;
      break;
    }
    case "can_send_videos": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["canSendVideos"] = decoded;
      seen |= 128;
      break;
    }
    case "can_send_video_notes": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["canSendVideoNotes"] = decoded;
      seen |= 256;
      break;
    }
    case "can_send_voice_notes": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["canSendVoiceNotes"] = decoded;
      seen |= 512;
      break;
    }
    case "can_send_polls": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["canSendPolls"] = decoded;
      seen |= 1024;
      break;
    }
    case "can_send_other_messages": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["canSendOtherMessages"] = decoded;
      seen |= 2048;
      break;
    }
    case "can_add_web_page_previews": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["canAddWebPagePreviews"] = decoded;
      seen |= 4096;
      break;
    }
    case "can_react_to_messages": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["canReactToMessages"] = decoded;
      seen |= 8192;
      break;
    }
    case "can_edit_tag": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["canEditTag"] = decoded;
      seen |= 16384;
      break;
    }
    case "can_change_info": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["canChangeInfo"] = decoded;
      seen |= 32768;
      break;
    }
    case "can_invite_users": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["canInviteUsers"] = decoded;
      seen |= 65536;
      break;
    }
    case "can_pin_messages": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["canPinMessages"] = decoded;
      seen |= 131072;
      break;
    }
    case "can_manage_topics": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["canManageTopics"] = decoded;
      seen |= 262144;
      break;
    }
    case "until_date": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["untilDate"] = decoded;
      seen |= 524288;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 1048575) return decodeFailure;
  return output as Types.ChatMemberRestricted;
}

export function _decodeChatMemberUpdated(input: unknown): Types.ChatMemberUpdated | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "chat": {
      const raw = source[key];
      const decoded = _decodeChat(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["chat"] = decoded;
      seen |= 1;
      break;
    }
    case "from": {
      const raw = source[key];
      const decoded = _decodeUser(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["from"] = decoded;
      seen |= 2;
      break;
    }
    case "date": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["date"] = decoded;
      seen |= 4;
      break;
    }
    case "old_chat_member": {
      const raw = source[key];
      const decoded = _decodeChatMember(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["oldChatMember"] = decoded;
      seen |= 8;
      break;
    }
    case "new_chat_member": {
      const raw = source[key];
      const decoded = _decodeChatMember(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["newChatMember"] = decoded;
      seen |= 16;
      break;
    }
    case "invite_link": {
      const raw = source[key];
      const decoded = _decodeChatInviteLink(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["inviteLink"] = decoded;
      break;
    }
    case "via_join_request": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["viaJoinRequest"] = decoded;
      break;
    }
    case "via_chat_folder_invite_link": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["viaChatFolderInviteLink"] = decoded;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 31) return decodeFailure;
  return output as Types.ChatMemberUpdated;
}

export function _decodeChatOwnerChanged(input: unknown): Types.ChatOwnerChanged | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "new_owner": {
      const raw = source[key];
      const decoded = _decodeUser(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["newOwner"] = decoded;
      seen |= 1;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 1) return decodeFailure;
  return output as Types.ChatOwnerChanged;
}

export function _decodeChatOwnerLeft(input: unknown): Types.ChatOwnerLeft | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "new_owner": {
      const raw = source[key];
      const decoded = _decodeUser(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["newOwner"] = decoded;
      delete output["new_owner"];
      break;
    }

    }
  }
  if (seen !== 0) return decodeFailure;
  return (output ?? source) as Types.ChatOwnerLeft;
}

export function _decodeChatPermissions(input: unknown): Types.ChatPermissions | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "can_send_messages": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["canSendMessages"] = decoded;
      delete output["can_send_messages"];
      break;
    }
    case "can_send_audios": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["canSendAudios"] = decoded;
      delete output["can_send_audios"];
      break;
    }
    case "can_send_documents": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["canSendDocuments"] = decoded;
      delete output["can_send_documents"];
      break;
    }
    case "can_send_photos": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["canSendPhotos"] = decoded;
      delete output["can_send_photos"];
      break;
    }
    case "can_send_videos": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["canSendVideos"] = decoded;
      delete output["can_send_videos"];
      break;
    }
    case "can_send_video_notes": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["canSendVideoNotes"] = decoded;
      delete output["can_send_video_notes"];
      break;
    }
    case "can_send_voice_notes": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["canSendVoiceNotes"] = decoded;
      delete output["can_send_voice_notes"];
      break;
    }
    case "can_send_polls": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["canSendPolls"] = decoded;
      delete output["can_send_polls"];
      break;
    }
    case "can_send_other_messages": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["canSendOtherMessages"] = decoded;
      delete output["can_send_other_messages"];
      break;
    }
    case "can_add_web_page_previews": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["canAddWebPagePreviews"] = decoded;
      delete output["can_add_web_page_previews"];
      break;
    }
    case "can_react_to_messages": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["canReactToMessages"] = decoded;
      delete output["can_react_to_messages"];
      break;
    }
    case "can_edit_tag": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["canEditTag"] = decoded;
      delete output["can_edit_tag"];
      break;
    }
    case "can_change_info": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["canChangeInfo"] = decoded;
      delete output["can_change_info"];
      break;
    }
    case "can_invite_users": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["canInviteUsers"] = decoded;
      delete output["can_invite_users"];
      break;
    }
    case "can_pin_messages": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["canPinMessages"] = decoded;
      delete output["can_pin_messages"];
      break;
    }
    case "can_manage_topics": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["canManageTopics"] = decoded;
      delete output["can_manage_topics"];
      break;
    }

    }
  }
  if (seen !== 0) return decodeFailure;
  return (output ?? source) as Types.ChatPermissions;
}

export function _decodeChatPhoto(input: unknown): Types.ChatPhoto | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "small_file_id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["smallFileId"] = decoded;
      seen |= 1;
      break;
    }
    case "small_file_unique_id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["smallFileUniqueId"] = decoded;
      seen |= 2;
      break;
    }
    case "big_file_id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["bigFileId"] = decoded;
      seen |= 4;
      break;
    }
    case "big_file_unique_id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["bigFileUniqueId"] = decoded;
      seen |= 8;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 15) return decodeFailure;
  return output as Types.ChatPhoto;
}

export function _decodeChatShared(input: unknown): Types.ChatShared | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "request_id": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["requestId"] = decoded;
      seen |= 1;
      break;
    }
    case "chat_id": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["chatId"] = decoded;
      seen |= 2;
      break;
    }
    case "title": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["title"] = decoded;
      break;
    }
    case "username": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["username"] = decoded;
      break;
    }
    case "photo": {
      const raw = source[key];
      const decoded = _decodeArrayOfPhotoSize(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["photo"] = decoded;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 3) return decodeFailure;
  return output as Types.ChatShared;
}

export function _decodeChecklist(input: unknown): Types.Checklist | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "title": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["title"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "title_entities": {
      const raw = source[key];
      const decoded = _decodeArrayOfMessageEntity(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["titleEntities"] = decoded;
      delete output["title_entities"];
      break;
    }
    case "tasks": {
      const raw = source[key];
      const decoded = _decodeArrayOfChecklistTask(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["tasks"] = decoded;
      }
      seen |= 2;
      break;
    }
    case "others_can_add_tasks": {
      const raw = source[key];
      const decoded = _decodeTrue(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["othersCanAddTasks"] = decoded;
      delete output["others_can_add_tasks"];
      break;
    }
    case "others_can_mark_tasks_as_done": {
      const raw = source[key];
      const decoded = _decodeTrue(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["othersCanMarkTasksAsDone"] = decoded;
      delete output["others_can_mark_tasks_as_done"];
      break;
    }

    }
  }
  if (seen !== 3) return decodeFailure;
  return (output ?? source) as Types.Checklist;
}

export function _decodeChecklistTask(input: unknown): Types.ChecklistTask | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "id": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["id"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "text": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["text"] = decoded;
      }
      seen |= 2;
      break;
    }
    case "text_entities": {
      const raw = source[key];
      const decoded = _decodeArrayOfMessageEntity(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["textEntities"] = decoded;
      delete output["text_entities"];
      break;
    }
    case "completed_by_user": {
      const raw = source[key];
      const decoded = _decodeUser(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["completedByUser"] = decoded;
      delete output["completed_by_user"];
      break;
    }
    case "completed_by_chat": {
      const raw = source[key];
      const decoded = _decodeChat(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["completedByChat"] = decoded;
      delete output["completed_by_chat"];
      break;
    }
    case "completion_date": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["completionDate"] = decoded;
      delete output["completion_date"];
      break;
    }

    }
  }
  if (seen !== 3) return decodeFailure;
  return (output ?? source) as Types.ChecklistTask;
}

export function _decodeChecklistTasksAdded(input: unknown): Types.ChecklistTasksAdded | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "checklist_message": {
      const raw = source[key];
      const decoded = _decodeMessage(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["checklistMessage"] = decoded;
      delete output["checklist_message"];
      break;
    }
    case "tasks": {
      const raw = source[key];
      const decoded = _decodeArrayOfChecklistTask(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["tasks"] = decoded;
      }
      seen |= 1;
      break;
    }

    }
  }
  if (seen !== 1) return decodeFailure;
  return (output ?? source) as Types.ChecklistTasksAdded;
}

export function _decodeChecklistTasksDone(input: unknown): Types.ChecklistTasksDone | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "checklist_message": {
      const raw = source[key];
      const decoded = _decodeMessage(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["checklistMessage"] = decoded;
      delete output["checklist_message"];
      break;
    }
    case "marked_as_done_task_ids": {
      const raw = source[key];
      const decoded = _decodeArrayOfInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["markedAsDoneTaskIds"] = decoded;
      delete output["marked_as_done_task_ids"];
      break;
    }
    case "marked_as_not_done_task_ids": {
      const raw = source[key];
      const decoded = _decodeArrayOfInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["markedAsNotDoneTaskIds"] = decoded;
      delete output["marked_as_not_done_task_ids"];
      break;
    }

    }
  }
  if (seen !== 0) return decodeFailure;
  return (output ?? source) as Types.ChecklistTasksDone;
}

export function _decodeChosenInlineResult(input: unknown): Types.ChosenInlineResult | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "result_id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["resultId"] = decoded;
      seen |= 1;
      break;
    }
    case "from": {
      const raw = source[key];
      const decoded = _decodeUser(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["from"] = decoded;
      seen |= 2;
      break;
    }
    case "location": {
      const raw = source[key];
      const decoded = _decodeLocation(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["location"] = decoded;
      break;
    }
    case "inline_message_id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["inlineMessageId"] = decoded;
      break;
    }
    case "query": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["query"] = decoded;
      seen |= 4;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 7) return decodeFailure;
  return output as Types.ChosenInlineResult;
}

export function _decodeCommunity(input: unknown): Types.Community | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "id": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["id"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "name": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["name"] = decoded;
      }
      seen |= 2;
      break;
    }

    }
  }
  if (seen !== 3) return decodeFailure;
  return (output ?? source) as Types.Community;
}

export function _decodeCommunityChatAdded(input: unknown): Types.CommunityChatAdded | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "community": {
      const raw = source[key];
      const decoded = _decodeCommunity(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["community"] = decoded;
      }
      seen |= 1;
      break;
    }

    }
  }
  if (seen !== 1) return decodeFailure;
  return (output ?? source) as Types.CommunityChatAdded;
}

export function _decodeCommunityChatJoined(input: unknown): Types.CommunityChatJoined | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "community": {
      const raw = source[key];
      const decoded = _decodeCommunity(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["community"] = decoded;
      }
      seen |= 1;
      break;
    }

    }
  }
  if (seen !== 1) return decodeFailure;
  return (output ?? source) as Types.CommunityChatJoined;
}

export function _decodeCommunityChatRemoved(input: unknown): Types.CommunityChatRemoved | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {


    }
  }
  if (seen !== 0) return decodeFailure;
  return (output ?? source) as Types.CommunityChatRemoved;
}

export function _decodeContact(input: unknown): Types.Contact | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "phone_number": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["phoneNumber"] = decoded;
      seen |= 1;
      break;
    }
    case "first_name": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["firstName"] = decoded;
      seen |= 2;
      break;
    }
    case "last_name": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["lastName"] = decoded;
      break;
    }
    case "user_id": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["userId"] = decoded;
      break;
    }
    case "vcard": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["vcard"] = decoded;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 3) return decodeFailure;
  return output as Types.Contact;
}

export function _decodeCopyTextButton(input: unknown): Types.CopyTextButton | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "text": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["text"] = decoded;
      }
      seen |= 1;
      break;
    }

    }
  }
  if (seen !== 1) return decodeFailure;
  return (output ?? source) as Types.CopyTextButton;
}

export function _decodeDice(input: unknown): Types.Dice | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "emoji": {
      const raw = source[key];
      const decoded = _decodeDiceEmoji(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["emoji"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "value": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["value"] = decoded;
      }
      seen |= 2;
      break;
    }

    }
  }
  if (seen !== 3) return decodeFailure;
  return (output ?? source) as Types.Dice;
}

export function _decodeDirectMessagePriceChanged(input: unknown): Types.DirectMessagePriceChanged | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "are_direct_messages_enabled": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["areDirectMessagesEnabled"] = decoded;
      seen |= 1;
      break;
    }
    case "direct_message_star_count": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["directMessageStarCount"] = decoded;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 1) return decodeFailure;
  return output as Types.DirectMessagePriceChanged;
}

export function _decodeDirectMessagesTopic(input: unknown): Types.DirectMessagesTopic | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "topic_id": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["topicId"] = decoded;
      seen |= 1;
      break;
    }
    case "user": {
      const raw = source[key];
      const decoded = _decodeUser(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["user"] = decoded;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 1) return decodeFailure;
  return output as Types.DirectMessagesTopic;
}

export function _decodeDisabledButton(input: unknown): Types.DisabledButton | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {


    }
  }
  if (seen !== 0) return decodeFailure;
  return (output ?? source) as Types.DisabledButton;
}

export function _decodeDocument(input: unknown): Types.Document | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "file_id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["fileId"] = decoded;
      seen |= 1;
      break;
    }
    case "file_unique_id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["fileUniqueId"] = decoded;
      seen |= 2;
      break;
    }
    case "thumbnail": {
      const raw = source[key];
      const decoded = _decodePhotoSize(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["thumbnail"] = decoded;
      break;
    }
    case "file_name": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["fileName"] = decoded;
      break;
    }
    case "mime_type": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["mimeType"] = decoded;
      break;
    }
    case "file_size": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["fileSize"] = decoded;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 3) return decodeFailure;
  return output as Types.Document;
}

export function _decodeEncryptedCredentials(input: unknown): Types.EncryptedCredentials | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "data": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["data"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "hash": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["hash"] = decoded;
      }
      seen |= 2;
      break;
    }
    case "secret": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["secret"] = decoded;
      }
      seen |= 4;
      break;
    }

    }
  }
  if (seen !== 7) return decodeFailure;
  return (output ?? source) as Types.EncryptedCredentials;
}

export function _decodeEncryptedPassportElement(input: unknown): Types.EncryptedPassportElement | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = _decodeEncryptedPassportElementType(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "data": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["data"] = decoded;
      }
      break;
    }
    case "phone_number": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["phoneNumber"] = decoded;
      delete output["phone_number"];
      break;
    }
    case "email": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["email"] = decoded;
      }
      break;
    }
    case "files": {
      const raw = source[key];
      const decoded = _decodeArrayOfPassportFile(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["files"] = decoded;
      }
      break;
    }
    case "front_side": {
      const raw = source[key];
      const decoded = _decodePassportFile(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["frontSide"] = decoded;
      delete output["front_side"];
      break;
    }
    case "reverse_side": {
      const raw = source[key];
      const decoded = _decodePassportFile(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["reverseSide"] = decoded;
      delete output["reverse_side"];
      break;
    }
    case "selfie": {
      const raw = source[key];
      const decoded = _decodePassportFile(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["selfie"] = decoded;
      }
      break;
    }
    case "translation": {
      const raw = source[key];
      const decoded = _decodeArrayOfPassportFile(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["translation"] = decoded;
      }
      break;
    }
    case "hash": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["hash"] = decoded;
      }
      seen |= 2;
      break;
    }

    }
  }
  if (seen !== 3) return decodeFailure;
  return (output ?? source) as Types.EncryptedPassportElement;
}

export function _decodeEphemeralMessageParameters(input: unknown): Types.EphemeralMessageParameters | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "receiver_user_id": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["receiverUserId"] = decoded;
      seen |= 1;
      break;
    }
    case "callback_query_id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["callbackQueryId"] = decoded;
      break;
    }
    case "replace_callback_query_message": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["replaceCallbackQueryMessage"] = decoded;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 1) return decodeFailure;
  return output as Types.EphemeralMessageParameters;
}

export function _decodeExternalReplyInfo(input: unknown): Types.ExternalReplyInfo | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "origin": {
      const raw = source[key];
      const decoded = _decodeMessageOrigin(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["origin"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "chat": {
      const raw = source[key];
      const decoded = _decodeChat(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["chat"] = decoded;
      }
      break;
    }
    case "message_id": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["messageId"] = decoded;
      delete output["message_id"];
      break;
    }
    case "link_preview_options": {
      const raw = source[key];
      const decoded = _decodeLinkPreviewOptions(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["linkPreviewOptions"] = decoded;
      delete output["link_preview_options"];
      break;
    }
    case "animation": {
      const raw = source[key];
      const decoded = _decodeAnimation(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["animation"] = decoded;
      }
      break;
    }
    case "audio": {
      const raw = source[key];
      const decoded = _decodeAudio(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["audio"] = decoded;
      }
      break;
    }
    case "document": {
      const raw = source[key];
      const decoded = _decodeDocument(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["document"] = decoded;
      }
      break;
    }
    case "live_photo": {
      const raw = source[key];
      const decoded = _decodeLivePhoto(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["livePhoto"] = decoded;
      delete output["live_photo"];
      break;
    }
    case "paid_media": {
      const raw = source[key];
      const decoded = _decodePaidMediaInfo(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["paidMedia"] = decoded;
      delete output["paid_media"];
      break;
    }
    case "photo": {
      const raw = source[key];
      const decoded = _decodeArrayOfPhotoSize(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["photo"] = decoded;
      }
      break;
    }
    case "sticker": {
      const raw = source[key];
      const decoded = _decodeSticker(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["sticker"] = decoded;
      }
      break;
    }
    case "story": {
      const raw = source[key];
      const decoded = _decodeStory(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["story"] = decoded;
      }
      break;
    }
    case "video": {
      const raw = source[key];
      const decoded = _decodeVideo(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["video"] = decoded;
      }
      break;
    }
    case "video_note": {
      const raw = source[key];
      const decoded = _decodeVideoNote(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["videoNote"] = decoded;
      delete output["video_note"];
      break;
    }
    case "voice": {
      const raw = source[key];
      const decoded = _decodeVoice(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["voice"] = decoded;
      }
      break;
    }
    case "has_media_spoiler": {
      const raw = source[key];
      const decoded = _decodeTrue(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["hasMediaSpoiler"] = decoded;
      delete output["has_media_spoiler"];
      break;
    }
    case "checklist": {
      const raw = source[key];
      const decoded = _decodeChecklist(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["checklist"] = decoded;
      }
      break;
    }
    case "contact": {
      const raw = source[key];
      const decoded = _decodeContact(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["contact"] = decoded;
      }
      break;
    }
    case "dice": {
      const raw = source[key];
      const decoded = _decodeDice(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["dice"] = decoded;
      }
      break;
    }
    case "game": {
      const raw = source[key];
      const decoded = _decodeGame(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["game"] = decoded;
      }
      break;
    }
    case "giveaway": {
      const raw = source[key];
      const decoded = _decodeGiveaway(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["giveaway"] = decoded;
      }
      break;
    }
    case "giveaway_winners": {
      const raw = source[key];
      const decoded = _decodeGiveawayWinners(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["giveawayWinners"] = decoded;
      delete output["giveaway_winners"];
      break;
    }
    case "invoice": {
      const raw = source[key];
      const decoded = _decodeInvoice(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["invoice"] = decoded;
      }
      break;
    }
    case "location": {
      const raw = source[key];
      const decoded = _decodeLocation(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["location"] = decoded;
      }
      break;
    }
    case "poll": {
      const raw = source[key];
      const decoded = _decodePoll(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["poll"] = decoded;
      }
      break;
    }
    case "venue": {
      const raw = source[key];
      const decoded = _decodeVenue(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["venue"] = decoded;
      }
      break;
    }

    }
  }
  if (seen !== 1) return decodeFailure;
  return (output ?? source) as Types.ExternalReplyInfo;
}

export function _decodeFile(input: unknown): Types.File | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "file_id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["fileId"] = decoded;
      seen |= 1;
      break;
    }
    case "file_unique_id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["fileUniqueId"] = decoded;
      seen |= 2;
      break;
    }
    case "file_size": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["fileSize"] = decoded;
      break;
    }
    case "file_path": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["filePath"] = decoded;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 3) return decodeFailure;
  return output as Types.File;
}

export function _decodeForceReply(input: unknown): Types.ForceReply | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "force_reply": {
      const raw = source[key];
      const decoded = _decodeTrue(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["forceReply"] = decoded;
      seen |= 1;
      break;
    }
    case "input_field_placeholder": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["inputFieldPlaceholder"] = decoded;
      break;
    }
    case "selective": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["selective"] = decoded;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 1) return decodeFailure;
  return output as Types.ForceReply;
}

export function _decodeForumTopic(input: unknown): Types.ForumTopic | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "message_thread_id": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["messageThreadId"] = decoded;
      seen |= 1;
      break;
    }
    case "name": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["name"] = decoded;
      seen |= 2;
      break;
    }
    case "icon_color": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["iconColor"] = decoded;
      seen |= 4;
      break;
    }
    case "icon_custom_emoji_id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["iconCustomEmojiId"] = decoded;
      break;
    }
    case "is_name_implicit": {
      const raw = source[key];
      const decoded = _decodeTrue(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["isNameImplicit"] = decoded;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 7) return decodeFailure;
  return output as Types.ForumTopic;
}

export function _decodeForumTopicClosed(input: unknown): Types.ForumTopicClosed | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {


    }
  }
  if (seen !== 0) return decodeFailure;
  return (output ?? source) as Types.ForumTopicClosed;
}

export function _decodeForumTopicCreated(input: unknown): Types.ForumTopicCreated | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "name": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["name"] = decoded;
      seen |= 1;
      break;
    }
    case "icon_color": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["iconColor"] = decoded;
      seen |= 2;
      break;
    }
    case "icon_custom_emoji_id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["iconCustomEmojiId"] = decoded;
      break;
    }
    case "is_name_implicit": {
      const raw = source[key];
      const decoded = _decodeTrue(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["isNameImplicit"] = decoded;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 3) return decodeFailure;
  return output as Types.ForumTopicCreated;
}

export function _decodeForumTopicEdited(input: unknown): Types.ForumTopicEdited | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "name": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["name"] = decoded;
      }
      break;
    }
    case "icon_custom_emoji_id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["iconCustomEmojiId"] = decoded;
      delete output["icon_custom_emoji_id"];
      break;
    }

    }
  }
  if (seen !== 0) return decodeFailure;
  return (output ?? source) as Types.ForumTopicEdited;
}

export function _decodeForumTopicReopened(input: unknown): Types.ForumTopicReopened | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {


    }
  }
  if (seen !== 0) return decodeFailure;
  return (output ?? source) as Types.ForumTopicReopened;
}

export function _decodeGame(input: unknown): Types.Game | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "title": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["title"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "description": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["description"] = decoded;
      }
      seen |= 2;
      break;
    }
    case "photo": {
      const raw = source[key];
      const decoded = _decodeArrayOfPhotoSize(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["photo"] = decoded;
      }
      seen |= 4;
      break;
    }
    case "text": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["text"] = decoded;
      }
      break;
    }
    case "text_entities": {
      const raw = source[key];
      const decoded = _decodeArrayOfMessageEntity(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["textEntities"] = decoded;
      delete output["text_entities"];
      break;
    }
    case "animation": {
      const raw = source[key];
      const decoded = _decodeAnimation(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["animation"] = decoded;
      }
      break;
    }

    }
  }
  if (seen !== 7) return decodeFailure;
  return (output ?? source) as Types.Game;
}

export function _decodeGameHighScore(input: unknown): Types.GameHighScore | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "position": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["position"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "user": {
      const raw = source[key];
      const decoded = _decodeUser(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["user"] = decoded;
      }
      seen |= 2;
      break;
    }
    case "score": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["score"] = decoded;
      }
      seen |= 4;
      break;
    }

    }
  }
  if (seen !== 7) return decodeFailure;
  return (output ?? source) as Types.GameHighScore;
}

export function _decodeGeneralForumTopicHidden(input: unknown): Types.GeneralForumTopicHidden | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {


    }
  }
  if (seen !== 0) return decodeFailure;
  return (output ?? source) as Types.GeneralForumTopicHidden;
}

export function _decodeGeneralForumTopicUnhidden(input: unknown): Types.GeneralForumTopicUnhidden | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {


    }
  }
  if (seen !== 0) return decodeFailure;
  return (output ?? source) as Types.GeneralForumTopicUnhidden;
}

export function _decodeGift(input: unknown): Types.Gift | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["id"] = decoded;
      seen |= 1;
      break;
    }
    case "sticker": {
      const raw = source[key];
      const decoded = _decodeSticker(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["sticker"] = decoded;
      seen |= 2;
      break;
    }
    case "star_count": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["starCount"] = decoded;
      seen |= 4;
      break;
    }
    case "upgrade_star_count": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["upgradeStarCount"] = decoded;
      break;
    }
    case "is_premium": {
      const raw = source[key];
      const decoded = _decodeTrue(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["isPremium"] = decoded;
      break;
    }
    case "has_colors": {
      const raw = source[key];
      const decoded = _decodeTrue(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["hasColors"] = decoded;
      break;
    }
    case "total_count": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["totalCount"] = decoded;
      break;
    }
    case "remaining_count": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["remainingCount"] = decoded;
      break;
    }
    case "personal_total_count": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["personalTotalCount"] = decoded;
      break;
    }
    case "personal_remaining_count": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["personalRemainingCount"] = decoded;
      break;
    }
    case "background": {
      const raw = source[key];
      const decoded = _decodeGiftBackground(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["background"] = decoded;
      break;
    }
    case "unique_gift_variant_count": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["uniqueGiftVariantCount"] = decoded;
      break;
    }
    case "publisher_chat": {
      const raw = source[key];
      const decoded = _decodeChat(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["publisherChat"] = decoded;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 7) return decodeFailure;
  return output as Types.Gift;
}

export function _decodeGiftBackground(input: unknown): Types.GiftBackground | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "center_color": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["centerColor"] = decoded;
      seen |= 1;
      break;
    }
    case "edge_color": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["edgeColor"] = decoded;
      seen |= 2;
      break;
    }
    case "text_color": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["textColor"] = decoded;
      seen |= 4;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 7) return decodeFailure;
  return output as Types.GiftBackground;
}

export function _decodeGiftInfo(input: unknown): Types.GiftInfo | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "gift": {
      const raw = source[key];
      const decoded = _decodeGift(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["gift"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "owned_gift_id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["ownedGiftId"] = decoded;
      delete output["owned_gift_id"];
      break;
    }
    case "convert_star_count": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["convertStarCount"] = decoded;
      delete output["convert_star_count"];
      break;
    }
    case "prepaid_upgrade_star_count": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["prepaidUpgradeStarCount"] = decoded;
      delete output["prepaid_upgrade_star_count"];
      break;
    }
    case "is_upgrade_separate": {
      const raw = source[key];
      const decoded = _decodeTrue(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["isUpgradeSeparate"] = decoded;
      delete output["is_upgrade_separate"];
      break;
    }
    case "can_be_upgraded": {
      const raw = source[key];
      const decoded = _decodeTrue(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["canBeUpgraded"] = decoded;
      delete output["can_be_upgraded"];
      break;
    }
    case "text": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["text"] = decoded;
      }
      break;
    }
    case "entities": {
      const raw = source[key];
      const decoded = _decodeArrayOfMessageEntity(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["entities"] = decoded;
      }
      break;
    }
    case "is_private": {
      const raw = source[key];
      const decoded = _decodeTrue(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["isPrivate"] = decoded;
      delete output["is_private"];
      break;
    }
    case "unique_gift_number": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["uniqueGiftNumber"] = decoded;
      delete output["unique_gift_number"];
      break;
    }

    }
  }
  if (seen !== 1) return decodeFailure;
  return (output ?? source) as Types.GiftInfo;
}

export function _decodeGifts(input: unknown): Types.Gifts | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "gifts": {
      const raw = source[key];
      const decoded = _decodeArrayOfGift(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["gifts"] = decoded;
      }
      seen |= 1;
      break;
    }

    }
  }
  if (seen !== 1) return decodeFailure;
  return (output ?? source) as Types.Gifts;
}

export function _decodeGiveaway(input: unknown): Types.Giveaway | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "chats": {
      const raw = source[key];
      const decoded = _decodeArrayOfChat(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["chats"] = decoded;
      seen |= 1;
      break;
    }
    case "winners_selection_date": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["winnersSelectionDate"] = decoded;
      seen |= 2;
      break;
    }
    case "winner_count": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["winnerCount"] = decoded;
      seen |= 4;
      break;
    }
    case "only_new_members": {
      const raw = source[key];
      const decoded = _decodeTrue(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["onlyNewMembers"] = decoded;
      break;
    }
    case "has_public_winners": {
      const raw = source[key];
      const decoded = _decodeTrue(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["hasPublicWinners"] = decoded;
      break;
    }
    case "prize_description": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["prizeDescription"] = decoded;
      break;
    }
    case "country_codes": {
      const raw = source[key];
      const decoded = _decodeArrayOfString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["countryCodes"] = decoded;
      break;
    }
    case "prize_star_count": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["prizeStarCount"] = decoded;
      break;
    }
    case "premium_subscription_month_count": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["premiumSubscriptionMonthCount"] = decoded;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 7) return decodeFailure;
  return output as Types.Giveaway;
}

export function _decodeGiveawayCompleted(input: unknown): Types.GiveawayCompleted | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "winner_count": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["winnerCount"] = decoded;
      seen |= 1;
      break;
    }
    case "unclaimed_prize_count": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["unclaimedPrizeCount"] = decoded;
      break;
    }
    case "giveaway_message": {
      const raw = source[key];
      const decoded = _decodeMessage(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["giveawayMessage"] = decoded;
      break;
    }
    case "is_star_giveaway": {
      const raw = source[key];
      const decoded = _decodeTrue(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["isStarGiveaway"] = decoded;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 1) return decodeFailure;
  return output as Types.GiveawayCompleted;
}

export function _decodeGiveawayCreated(input: unknown): Types.GiveawayCreated | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "prize_star_count": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["prizeStarCount"] = decoded;
      delete output["prize_star_count"];
      break;
    }

    }
  }
  if (seen !== 0) return decodeFailure;
  return (output ?? source) as Types.GiveawayCreated;
}

export function _decodeGiveawayWinners(input: unknown): Types.GiveawayWinners | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "chat": {
      const raw = source[key];
      const decoded = _decodeChat(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["chat"] = decoded;
      seen |= 1;
      break;
    }
    case "giveaway_message_id": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["giveawayMessageId"] = decoded;
      seen |= 2;
      break;
    }
    case "winners_selection_date": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["winnersSelectionDate"] = decoded;
      seen |= 4;
      break;
    }
    case "winner_count": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["winnerCount"] = decoded;
      seen |= 8;
      break;
    }
    case "winners": {
      const raw = source[key];
      const decoded = _decodeArrayOfUser(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["winners"] = decoded;
      seen |= 16;
      break;
    }
    case "additional_chat_count": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["additionalChatCount"] = decoded;
      break;
    }
    case "prize_star_count": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["prizeStarCount"] = decoded;
      break;
    }
    case "premium_subscription_month_count": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["premiumSubscriptionMonthCount"] = decoded;
      break;
    }
    case "unclaimed_prize_count": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["unclaimedPrizeCount"] = decoded;
      break;
    }
    case "only_new_members": {
      const raw = source[key];
      const decoded = _decodeTrue(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["onlyNewMembers"] = decoded;
      break;
    }
    case "was_refunded": {
      const raw = source[key];
      const decoded = _decodeTrue(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["wasRefunded"] = decoded;
      break;
    }
    case "prize_description": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["prizeDescription"] = decoded;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 31) return decodeFailure;
  return output as Types.GiveawayWinners;
}

export function _decodeInaccessibleMessage(input: unknown): Types.InaccessibleMessage | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "chat": {
      const raw = source[key];
      const decoded = _decodeChat(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["chat"] = decoded;
      seen |= 1;
      break;
    }
    case "message_id": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["messageId"] = decoded;
      seen |= 2;
      break;
    }
    case "date": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["date"] = decoded;
      seen |= 4;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 7) return decodeFailure;
  return output as Types.InaccessibleMessage;
}

export function _decodeInlineKeyboardButton(input: unknown): Types.InlineKeyboardButton | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "text": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["text"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "icon_custom_emoji_id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["iconCustomEmojiId"] = decoded;
      delete output["icon_custom_emoji_id"];
      break;
    }
    case "style": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["style"] = decoded;
      }
      break;
    }
    case "url": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["url"] = decoded;
      }
      break;
    }
    case "callback_data": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["callbackData"] = decoded;
      delete output["callback_data"];
      break;
    }
    case "web_app": {
      const raw = source[key];
      const decoded = _decodeWebAppInfo(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["webApp"] = decoded;
      delete output["web_app"];
      break;
    }
    case "login_url": {
      const raw = source[key];
      const decoded = _decodeLoginUrl(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["loginUrl"] = decoded;
      delete output["login_url"];
      break;
    }
    case "switch_inline_query": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["switchInlineQuery"] = decoded;
      delete output["switch_inline_query"];
      break;
    }
    case "switch_inline_query_current_chat": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["switchInlineQueryCurrentChat"] = decoded;
      delete output["switch_inline_query_current_chat"];
      break;
    }
    case "switch_inline_query_chosen_chat": {
      const raw = source[key];
      const decoded = _decodeSwitchInlineQueryChosenChat(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["switchInlineQueryChosenChat"] = decoded;
      delete output["switch_inline_query_chosen_chat"];
      break;
    }
    case "copy_text": {
      const raw = source[key];
      const decoded = _decodeCopyTextButton(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["copyText"] = decoded;
      delete output["copy_text"];
      break;
    }
    case "callback_game": {
      const raw = source[key];
      const decoded = _decodeCallbackGame(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["callbackGame"] = decoded;
      delete output["callback_game"];
      break;
    }
    case "pay": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["pay"] = decoded;
      }
      break;
    }
    case "disabled": {
      const raw = source[key];
      const decoded = _decodeDisabledButton(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["disabled"] = decoded;
      }
      break;
    }

    }
  }
  if (seen !== 1) return decodeFailure;
  return (output ?? source) as Types.InlineKeyboardButton;
}

export function _decodeInlineKeyboardMarkup(input: unknown): Types.InlineKeyboardMarkup | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "inline_keyboard": {
      const raw = source[key];
      const decoded = _decodeArrayOfArrayOfInlineKeyboardButton(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["inlineKeyboard"] = decoded;
      seen |= 1;
      break;
    }
    case "force_reply": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["forceReply"] = decoded;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 1) return decodeFailure;
  return output as Types.InlineKeyboardMarkup;
}

export function _decodeInlineQuery(input: unknown): Types.InlineQuery | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["id"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "from": {
      const raw = source[key];
      const decoded = _decodeUser(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["from"] = decoded;
      }
      seen |= 2;
      break;
    }
    case "query": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["query"] = decoded;
      }
      seen |= 4;
      break;
    }
    case "offset": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["offset"] = decoded;
      }
      seen |= 8;
      break;
    }
    case "chat_type": {
      const raw = source[key];
      const decoded = _decodeInlineQueryChatType(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["chatType"] = decoded;
      delete output["chat_type"];
      break;
    }
    case "location": {
      const raw = source[key];
      const decoded = _decodeLocation(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["location"] = decoded;
      }
      break;
    }

    }
  }
  if (seen !== 15) return decodeFailure;
  return (output ?? source) as Types.InlineQuery;
}

export function _decodeInlineQueryResult(input: unknown): Types.InlineQueryResult | typeof decodeFailure {
  const member0 = _decodeInlineQueryResultCachedAudio(input);
  if (member0 !== decodeFailure) return member0;
  const member1 = _decodeInlineQueryResultCachedDocument(input);
  if (member1 !== decodeFailure) return member1;
  const member2 = _decodeInlineQueryResultCachedGif(input);
  if (member2 !== decodeFailure) return member2;
  const member3 = _decodeInlineQueryResultCachedMpeg4Gif(input);
  if (member3 !== decodeFailure) return member3;
  const member4 = _decodeInlineQueryResultCachedPhoto(input);
  if (member4 !== decodeFailure) return member4;
  const member5 = _decodeInlineQueryResultCachedSticker(input);
  if (member5 !== decodeFailure) return member5;
  const member6 = _decodeInlineQueryResultCachedVideo(input);
  if (member6 !== decodeFailure) return member6;
  const member7 = _decodeInlineQueryResultCachedVoice(input);
  if (member7 !== decodeFailure) return member7;
  const member8 = _decodeInlineQueryResultArticle(input);
  if (member8 !== decodeFailure) return member8;
  const member9 = _decodeInlineQueryResultAudio(input);
  if (member9 !== decodeFailure) return member9;
  const member10 = _decodeInlineQueryResultContact(input);
  if (member10 !== decodeFailure) return member10;
  const member11 = _decodeInlineQueryResultGame(input);
  if (member11 !== decodeFailure) return member11;
  const member12 = _decodeInlineQueryResultDocument(input);
  if (member12 !== decodeFailure) return member12;
  const member13 = _decodeInlineQueryResultGif(input);
  if (member13 !== decodeFailure) return member13;
  const member14 = _decodeInlineQueryResultLocation(input);
  if (member14 !== decodeFailure) return member14;
  const member15 = _decodeInlineQueryResultMpeg4Gif(input);
  if (member15 !== decodeFailure) return member15;
  const member16 = _decodeInlineQueryResultPhoto(input);
  if (member16 !== decodeFailure) return member16;
  const member17 = _decodeInlineQueryResultVenue(input);
  if (member17 !== decodeFailure) return member17;
  const member18 = _decodeInlineQueryResultVideo(input);
  if (member18 !== decodeFailure) return member18;
  const member19 = _decodeInlineQueryResultVoice(input);
  if (member19 !== decodeFailure) return member19;
  return decodeFailure;
}

export function _decodeInlineQueryResultArticle(input: unknown): Types.InlineQueryResultArticle | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "article" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      output["type"] = decoded;
      seen |= 1;
      break;
    }
    case "id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["id"] = decoded;
      seen |= 2;
      break;
    }
    case "title": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["title"] = decoded;
      seen |= 4;
      break;
    }
    case "input_message_content": {
      const raw = source[key];
      const decoded = _decodeInputMessageContent(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["inputMessageContent"] = decoded;
      seen |= 8;
      break;
    }
    case "reply_markup": {
      const raw = source[key];
      const decoded = _decodeInlineKeyboardMarkup(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["replyMarkup"] = decoded;
      break;
    }
    case "url": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["url"] = decoded;
      break;
    }
    case "description": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["description"] = decoded;
      break;
    }
    case "thumbnail_url": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["thumbnailUrl"] = decoded;
      break;
    }
    case "thumbnail_width": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["thumbnailWidth"] = decoded;
      break;
    }
    case "thumbnail_height": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["thumbnailHeight"] = decoded;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 15) return decodeFailure;
  return output as Types.InlineQueryResultArticle;
}

export function _decodeInlineQueryResultAudio(input: unknown): Types.InlineQueryResultAudio | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "audio" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      output["type"] = decoded;
      seen |= 1;
      break;
    }
    case "id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["id"] = decoded;
      seen |= 2;
      break;
    }
    case "audio_url": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["audioUrl"] = decoded;
      seen |= 4;
      break;
    }
    case "title": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["title"] = decoded;
      seen |= 8;
      break;
    }
    case "caption": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["caption"] = decoded;
      break;
    }
    case "parse_mode": {
      const raw = source[key];
      const decoded = _decodeParseMode(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["parseMode"] = decoded;
      break;
    }
    case "caption_entities": {
      const raw = source[key];
      const decoded = _decodeArrayOfMessageEntity(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["captionEntities"] = decoded;
      break;
    }
    case "performer": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["performer"] = decoded;
      break;
    }
    case "audio_duration": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["audioDuration"] = decoded;
      break;
    }
    case "reply_markup": {
      const raw = source[key];
      const decoded = _decodeInlineKeyboardMarkup(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["replyMarkup"] = decoded;
      break;
    }
    case "input_message_content": {
      const raw = source[key];
      const decoded = _decodeInputMessageContent(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["inputMessageContent"] = decoded;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 15) return decodeFailure;
  return output as Types.InlineQueryResultAudio;
}

export function _decodeInlineQueryResultCachedAudio(input: unknown): Types.InlineQueryResultCachedAudio | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "audio" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      output["type"] = decoded;
      seen |= 1;
      break;
    }
    case "id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["id"] = decoded;
      seen |= 2;
      break;
    }
    case "audio_file_id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["audioFileId"] = decoded;
      seen |= 4;
      break;
    }
    case "caption": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["caption"] = decoded;
      break;
    }
    case "parse_mode": {
      const raw = source[key];
      const decoded = _decodeParseMode(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["parseMode"] = decoded;
      break;
    }
    case "caption_entities": {
      const raw = source[key];
      const decoded = _decodeArrayOfMessageEntity(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["captionEntities"] = decoded;
      break;
    }
    case "reply_markup": {
      const raw = source[key];
      const decoded = _decodeInlineKeyboardMarkup(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["replyMarkup"] = decoded;
      break;
    }
    case "input_message_content": {
      const raw = source[key];
      const decoded = _decodeInputMessageContent(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["inputMessageContent"] = decoded;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 7) return decodeFailure;
  return output as Types.InlineQueryResultCachedAudio;
}

export function _decodeInlineQueryResultCachedDocument(input: unknown): Types.InlineQueryResultCachedDocument | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "document" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      output["type"] = decoded;
      seen |= 1;
      break;
    }
    case "id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["id"] = decoded;
      seen |= 2;
      break;
    }
    case "title": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["title"] = decoded;
      seen |= 4;
      break;
    }
    case "document_file_id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["documentFileId"] = decoded;
      seen |= 8;
      break;
    }
    case "description": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["description"] = decoded;
      break;
    }
    case "caption": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["caption"] = decoded;
      break;
    }
    case "parse_mode": {
      const raw = source[key];
      const decoded = _decodeParseMode(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["parseMode"] = decoded;
      break;
    }
    case "caption_entities": {
      const raw = source[key];
      const decoded = _decodeArrayOfMessageEntity(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["captionEntities"] = decoded;
      break;
    }
    case "reply_markup": {
      const raw = source[key];
      const decoded = _decodeInlineKeyboardMarkup(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["replyMarkup"] = decoded;
      break;
    }
    case "input_message_content": {
      const raw = source[key];
      const decoded = _decodeInputMessageContent(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["inputMessageContent"] = decoded;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 15) return decodeFailure;
  return output as Types.InlineQueryResultCachedDocument;
}

export function _decodeInlineQueryResultCachedGif(input: unknown): Types.InlineQueryResultCachedGif | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "gif" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      output["type"] = decoded;
      seen |= 1;
      break;
    }
    case "id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["id"] = decoded;
      seen |= 2;
      break;
    }
    case "gif_file_id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["gifFileId"] = decoded;
      seen |= 4;
      break;
    }
    case "title": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["title"] = decoded;
      break;
    }
    case "caption": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["caption"] = decoded;
      break;
    }
    case "parse_mode": {
      const raw = source[key];
      const decoded = _decodeParseMode(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["parseMode"] = decoded;
      break;
    }
    case "caption_entities": {
      const raw = source[key];
      const decoded = _decodeArrayOfMessageEntity(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["captionEntities"] = decoded;
      break;
    }
    case "show_caption_above_media": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["showCaptionAboveMedia"] = decoded;
      break;
    }
    case "reply_markup": {
      const raw = source[key];
      const decoded = _decodeInlineKeyboardMarkup(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["replyMarkup"] = decoded;
      break;
    }
    case "input_message_content": {
      const raw = source[key];
      const decoded = _decodeInputMessageContent(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["inputMessageContent"] = decoded;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 7) return decodeFailure;
  return output as Types.InlineQueryResultCachedGif;
}

export function _decodeInlineQueryResultCachedMpeg4Gif(input: unknown): Types.InlineQueryResultCachedMpeg4Gif | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "mpeg4_gif" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      output["type"] = decoded;
      seen |= 1;
      break;
    }
    case "id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["id"] = decoded;
      seen |= 2;
      break;
    }
    case "mpeg4_file_id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["mpeg4FileId"] = decoded;
      seen |= 4;
      break;
    }
    case "title": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["title"] = decoded;
      break;
    }
    case "caption": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["caption"] = decoded;
      break;
    }
    case "parse_mode": {
      const raw = source[key];
      const decoded = _decodeParseMode(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["parseMode"] = decoded;
      break;
    }
    case "caption_entities": {
      const raw = source[key];
      const decoded = _decodeArrayOfMessageEntity(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["captionEntities"] = decoded;
      break;
    }
    case "show_caption_above_media": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["showCaptionAboveMedia"] = decoded;
      break;
    }
    case "reply_markup": {
      const raw = source[key];
      const decoded = _decodeInlineKeyboardMarkup(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["replyMarkup"] = decoded;
      break;
    }
    case "input_message_content": {
      const raw = source[key];
      const decoded = _decodeInputMessageContent(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["inputMessageContent"] = decoded;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 7) return decodeFailure;
  return output as Types.InlineQueryResultCachedMpeg4Gif;
}

export function _decodeInlineQueryResultCachedPhoto(input: unknown): Types.InlineQueryResultCachedPhoto | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "photo" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      output["type"] = decoded;
      seen |= 1;
      break;
    }
    case "id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["id"] = decoded;
      seen |= 2;
      break;
    }
    case "photo_file_id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["photoFileId"] = decoded;
      seen |= 4;
      break;
    }
    case "title": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["title"] = decoded;
      break;
    }
    case "description": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["description"] = decoded;
      break;
    }
    case "caption": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["caption"] = decoded;
      break;
    }
    case "parse_mode": {
      const raw = source[key];
      const decoded = _decodeParseMode(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["parseMode"] = decoded;
      break;
    }
    case "caption_entities": {
      const raw = source[key];
      const decoded = _decodeArrayOfMessageEntity(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["captionEntities"] = decoded;
      break;
    }
    case "show_caption_above_media": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["showCaptionAboveMedia"] = decoded;
      break;
    }
    case "reply_markup": {
      const raw = source[key];
      const decoded = _decodeInlineKeyboardMarkup(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["replyMarkup"] = decoded;
      break;
    }
    case "input_message_content": {
      const raw = source[key];
      const decoded = _decodeInputMessageContent(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["inputMessageContent"] = decoded;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 7) return decodeFailure;
  return output as Types.InlineQueryResultCachedPhoto;
}

export function _decodeInlineQueryResultCachedSticker(input: unknown): Types.InlineQueryResultCachedSticker | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "sticker" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      output["type"] = decoded;
      seen |= 1;
      break;
    }
    case "id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["id"] = decoded;
      seen |= 2;
      break;
    }
    case "sticker_file_id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["stickerFileId"] = decoded;
      seen |= 4;
      break;
    }
    case "reply_markup": {
      const raw = source[key];
      const decoded = _decodeInlineKeyboardMarkup(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["replyMarkup"] = decoded;
      break;
    }
    case "input_message_content": {
      const raw = source[key];
      const decoded = _decodeInputMessageContent(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["inputMessageContent"] = decoded;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 7) return decodeFailure;
  return output as Types.InlineQueryResultCachedSticker;
}

export function _decodeInlineQueryResultCachedVideo(input: unknown): Types.InlineQueryResultCachedVideo | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "video" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      output["type"] = decoded;
      seen |= 1;
      break;
    }
    case "id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["id"] = decoded;
      seen |= 2;
      break;
    }
    case "video_file_id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["videoFileId"] = decoded;
      seen |= 4;
      break;
    }
    case "title": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["title"] = decoded;
      seen |= 8;
      break;
    }
    case "description": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["description"] = decoded;
      break;
    }
    case "caption": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["caption"] = decoded;
      break;
    }
    case "parse_mode": {
      const raw = source[key];
      const decoded = _decodeParseMode(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["parseMode"] = decoded;
      break;
    }
    case "caption_entities": {
      const raw = source[key];
      const decoded = _decodeArrayOfMessageEntity(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["captionEntities"] = decoded;
      break;
    }
    case "show_caption_above_media": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["showCaptionAboveMedia"] = decoded;
      break;
    }
    case "reply_markup": {
      const raw = source[key];
      const decoded = _decodeInlineKeyboardMarkup(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["replyMarkup"] = decoded;
      break;
    }
    case "input_message_content": {
      const raw = source[key];
      const decoded = _decodeInputMessageContent(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["inputMessageContent"] = decoded;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 15) return decodeFailure;
  return output as Types.InlineQueryResultCachedVideo;
}

export function _decodeInlineQueryResultCachedVoice(input: unknown): Types.InlineQueryResultCachedVoice | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "voice" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      output["type"] = decoded;
      seen |= 1;
      break;
    }
    case "id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["id"] = decoded;
      seen |= 2;
      break;
    }
    case "voice_file_id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["voiceFileId"] = decoded;
      seen |= 4;
      break;
    }
    case "title": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["title"] = decoded;
      seen |= 8;
      break;
    }
    case "caption": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["caption"] = decoded;
      break;
    }
    case "parse_mode": {
      const raw = source[key];
      const decoded = _decodeParseMode(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["parseMode"] = decoded;
      break;
    }
    case "caption_entities": {
      const raw = source[key];
      const decoded = _decodeArrayOfMessageEntity(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["captionEntities"] = decoded;
      break;
    }
    case "reply_markup": {
      const raw = source[key];
      const decoded = _decodeInlineKeyboardMarkup(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["replyMarkup"] = decoded;
      break;
    }
    case "input_message_content": {
      const raw = source[key];
      const decoded = _decodeInputMessageContent(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["inputMessageContent"] = decoded;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 15) return decodeFailure;
  return output as Types.InlineQueryResultCachedVoice;
}

export function _decodeInlineQueryResultContact(input: unknown): Types.InlineQueryResultContact | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "contact" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      output["type"] = decoded;
      seen |= 1;
      break;
    }
    case "id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["id"] = decoded;
      seen |= 2;
      break;
    }
    case "phone_number": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["phoneNumber"] = decoded;
      seen |= 4;
      break;
    }
    case "first_name": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["firstName"] = decoded;
      seen |= 8;
      break;
    }
    case "last_name": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["lastName"] = decoded;
      break;
    }
    case "vcard": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["vcard"] = decoded;
      break;
    }
    case "reply_markup": {
      const raw = source[key];
      const decoded = _decodeInlineKeyboardMarkup(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["replyMarkup"] = decoded;
      break;
    }
    case "input_message_content": {
      const raw = source[key];
      const decoded = _decodeInputMessageContent(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["inputMessageContent"] = decoded;
      break;
    }
    case "thumbnail_url": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["thumbnailUrl"] = decoded;
      break;
    }
    case "thumbnail_width": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["thumbnailWidth"] = decoded;
      break;
    }
    case "thumbnail_height": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["thumbnailHeight"] = decoded;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 15) return decodeFailure;
  return output as Types.InlineQueryResultContact;
}

export function _decodeInlineQueryResultDocument(input: unknown): Types.InlineQueryResultDocument | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "document" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      output["type"] = decoded;
      seen |= 1;
      break;
    }
    case "id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["id"] = decoded;
      seen |= 2;
      break;
    }
    case "title": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["title"] = decoded;
      seen |= 4;
      break;
    }
    case "caption": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["caption"] = decoded;
      break;
    }
    case "parse_mode": {
      const raw = source[key];
      const decoded = _decodeParseMode(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["parseMode"] = decoded;
      break;
    }
    case "caption_entities": {
      const raw = source[key];
      const decoded = _decodeArrayOfMessageEntity(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["captionEntities"] = decoded;
      break;
    }
    case "document_url": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["documentUrl"] = decoded;
      seen |= 8;
      break;
    }
    case "mime_type": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["mimeType"] = decoded;
      seen |= 16;
      break;
    }
    case "description": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["description"] = decoded;
      break;
    }
    case "reply_markup": {
      const raw = source[key];
      const decoded = _decodeInlineKeyboardMarkup(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["replyMarkup"] = decoded;
      break;
    }
    case "input_message_content": {
      const raw = source[key];
      const decoded = _decodeInputMessageContent(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["inputMessageContent"] = decoded;
      break;
    }
    case "thumbnail_url": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["thumbnailUrl"] = decoded;
      break;
    }
    case "thumbnail_width": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["thumbnailWidth"] = decoded;
      break;
    }
    case "thumbnail_height": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["thumbnailHeight"] = decoded;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 31) return decodeFailure;
  return output as Types.InlineQueryResultDocument;
}

export function _decodeInlineQueryResultGame(input: unknown): Types.InlineQueryResultGame | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "game" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      output["type"] = decoded;
      seen |= 1;
      break;
    }
    case "id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["id"] = decoded;
      seen |= 2;
      break;
    }
    case "game_short_name": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["gameShortName"] = decoded;
      seen |= 4;
      break;
    }
    case "reply_markup": {
      const raw = source[key];
      const decoded = _decodeInlineKeyboardMarkup(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["replyMarkup"] = decoded;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 7) return decodeFailure;
  return output as Types.InlineQueryResultGame;
}

export function _decodeInlineQueryResultGif(input: unknown): Types.InlineQueryResultGif | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "gif" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      output["type"] = decoded;
      seen |= 1;
      break;
    }
    case "id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["id"] = decoded;
      seen |= 2;
      break;
    }
    case "gif_url": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["gifUrl"] = decoded;
      seen |= 4;
      break;
    }
    case "gif_width": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["gifWidth"] = decoded;
      break;
    }
    case "gif_height": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["gifHeight"] = decoded;
      break;
    }
    case "gif_duration": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["gifDuration"] = decoded;
      break;
    }
    case "thumbnail_url": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["thumbnailUrl"] = decoded;
      seen |= 8;
      break;
    }
    case "thumbnail_mime_type": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["thumbnailMimeType"] = decoded;
      break;
    }
    case "title": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["title"] = decoded;
      break;
    }
    case "caption": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["caption"] = decoded;
      break;
    }
    case "parse_mode": {
      const raw = source[key];
      const decoded = _decodeParseMode(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["parseMode"] = decoded;
      break;
    }
    case "caption_entities": {
      const raw = source[key];
      const decoded = _decodeArrayOfMessageEntity(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["captionEntities"] = decoded;
      break;
    }
    case "show_caption_above_media": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["showCaptionAboveMedia"] = decoded;
      break;
    }
    case "reply_markup": {
      const raw = source[key];
      const decoded = _decodeInlineKeyboardMarkup(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["replyMarkup"] = decoded;
      break;
    }
    case "input_message_content": {
      const raw = source[key];
      const decoded = _decodeInputMessageContent(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["inputMessageContent"] = decoded;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 15) return decodeFailure;
  return output as Types.InlineQueryResultGif;
}

export function _decodeInlineQueryResultLocation(input: unknown): Types.InlineQueryResultLocation | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "location" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["id"] = decoded;
      }
      seen |= 2;
      break;
    }
    case "latitude": {
      const raw = source[key];
      const decoded = _decodeFloat(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["latitude"] = decoded;
      }
      seen |= 4;
      break;
    }
    case "longitude": {
      const raw = source[key];
      const decoded = _decodeFloat(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["longitude"] = decoded;
      }
      seen |= 8;
      break;
    }
    case "title": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["title"] = decoded;
      }
      seen |= 16;
      break;
    }
    case "horizontal_accuracy": {
      const raw = source[key];
      const decoded = _decodeFloat(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["horizontalAccuracy"] = decoded;
      delete output["horizontal_accuracy"];
      break;
    }
    case "live_period": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["livePeriod"] = decoded;
      delete output["live_period"];
      break;
    }
    case "heading": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["heading"] = decoded;
      }
      break;
    }
    case "proximity_alert_radius": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["proximityAlertRadius"] = decoded;
      delete output["proximity_alert_radius"];
      break;
    }
    case "reply_markup": {
      const raw = source[key];
      const decoded = _decodeInlineKeyboardMarkup(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["replyMarkup"] = decoded;
      delete output["reply_markup"];
      break;
    }
    case "input_message_content": {
      const raw = source[key];
      const decoded = _decodeInputMessageContent(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["inputMessageContent"] = decoded;
      delete output["input_message_content"];
      break;
    }
    case "thumbnail_url": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["thumbnailUrl"] = decoded;
      delete output["thumbnail_url"];
      break;
    }
    case "thumbnail_width": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["thumbnailWidth"] = decoded;
      delete output["thumbnail_width"];
      break;
    }
    case "thumbnail_height": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["thumbnailHeight"] = decoded;
      delete output["thumbnail_height"];
      break;
    }

    }
  }
  if (seen !== 31) return decodeFailure;
  return (output ?? source) as Types.InlineQueryResultLocation;
}

export function _decodeInlineQueryResultMpeg4Gif(input: unknown): Types.InlineQueryResultMpeg4Gif | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "mpeg4_gif" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      output["type"] = decoded;
      seen |= 1;
      break;
    }
    case "id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["id"] = decoded;
      seen |= 2;
      break;
    }
    case "mpeg4_url": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["mpeg4Url"] = decoded;
      seen |= 4;
      break;
    }
    case "mpeg4_width": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["mpeg4Width"] = decoded;
      break;
    }
    case "mpeg4_height": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["mpeg4Height"] = decoded;
      break;
    }
    case "mpeg4_duration": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["mpeg4Duration"] = decoded;
      break;
    }
    case "thumbnail_url": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["thumbnailUrl"] = decoded;
      seen |= 8;
      break;
    }
    case "thumbnail_mime_type": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["thumbnailMimeType"] = decoded;
      break;
    }
    case "title": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["title"] = decoded;
      break;
    }
    case "caption": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["caption"] = decoded;
      break;
    }
    case "parse_mode": {
      const raw = source[key];
      const decoded = _decodeParseMode(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["parseMode"] = decoded;
      break;
    }
    case "caption_entities": {
      const raw = source[key];
      const decoded = _decodeArrayOfMessageEntity(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["captionEntities"] = decoded;
      break;
    }
    case "show_caption_above_media": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["showCaptionAboveMedia"] = decoded;
      break;
    }
    case "reply_markup": {
      const raw = source[key];
      const decoded = _decodeInlineKeyboardMarkup(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["replyMarkup"] = decoded;
      break;
    }
    case "input_message_content": {
      const raw = source[key];
      const decoded = _decodeInputMessageContent(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["inputMessageContent"] = decoded;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 15) return decodeFailure;
  return output as Types.InlineQueryResultMpeg4Gif;
}

export function _decodeInlineQueryResultPhoto(input: unknown): Types.InlineQueryResultPhoto | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "photo" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      output["type"] = decoded;
      seen |= 1;
      break;
    }
    case "id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["id"] = decoded;
      seen |= 2;
      break;
    }
    case "photo_url": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["photoUrl"] = decoded;
      seen |= 4;
      break;
    }
    case "thumbnail_url": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["thumbnailUrl"] = decoded;
      seen |= 8;
      break;
    }
    case "photo_width": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["photoWidth"] = decoded;
      break;
    }
    case "photo_height": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["photoHeight"] = decoded;
      break;
    }
    case "title": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["title"] = decoded;
      break;
    }
    case "description": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["description"] = decoded;
      break;
    }
    case "caption": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["caption"] = decoded;
      break;
    }
    case "parse_mode": {
      const raw = source[key];
      const decoded = _decodeParseMode(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["parseMode"] = decoded;
      break;
    }
    case "caption_entities": {
      const raw = source[key];
      const decoded = _decodeArrayOfMessageEntity(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["captionEntities"] = decoded;
      break;
    }
    case "show_caption_above_media": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["showCaptionAboveMedia"] = decoded;
      break;
    }
    case "reply_markup": {
      const raw = source[key];
      const decoded = _decodeInlineKeyboardMarkup(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["replyMarkup"] = decoded;
      break;
    }
    case "input_message_content": {
      const raw = source[key];
      const decoded = _decodeInputMessageContent(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["inputMessageContent"] = decoded;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 15) return decodeFailure;
  return output as Types.InlineQueryResultPhoto;
}

export function _decodeInlineQueryResultsButton(input: unknown): Types.InlineQueryResultsButton | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "text": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["text"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "web_app": {
      const raw = source[key];
      const decoded = _decodeWebAppInfo(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["webApp"] = decoded;
      delete output["web_app"];
      break;
    }
    case "start_parameter": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["startParameter"] = decoded;
      delete output["start_parameter"];
      break;
    }

    }
  }
  if (seen !== 1) return decodeFailure;
  return (output ?? source) as Types.InlineQueryResultsButton;
}

export function _decodeInlineQueryResultVenue(input: unknown): Types.InlineQueryResultVenue | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "venue" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["id"] = decoded;
      }
      seen |= 2;
      break;
    }
    case "latitude": {
      const raw = source[key];
      const decoded = _decodeFloat(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["latitude"] = decoded;
      }
      seen |= 4;
      break;
    }
    case "longitude": {
      const raw = source[key];
      const decoded = _decodeFloat(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["longitude"] = decoded;
      }
      seen |= 8;
      break;
    }
    case "title": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["title"] = decoded;
      }
      seen |= 16;
      break;
    }
    case "address": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["address"] = decoded;
      }
      seen |= 32;
      break;
    }
    case "foursquare_id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["foursquareId"] = decoded;
      delete output["foursquare_id"];
      break;
    }
    case "foursquare_type": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["foursquareType"] = decoded;
      delete output["foursquare_type"];
      break;
    }
    case "google_place_id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["googlePlaceId"] = decoded;
      delete output["google_place_id"];
      break;
    }
    case "google_place_type": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["googlePlaceType"] = decoded;
      delete output["google_place_type"];
      break;
    }
    case "reply_markup": {
      const raw = source[key];
      const decoded = _decodeInlineKeyboardMarkup(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["replyMarkup"] = decoded;
      delete output["reply_markup"];
      break;
    }
    case "input_message_content": {
      const raw = source[key];
      const decoded = _decodeInputMessageContent(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["inputMessageContent"] = decoded;
      delete output["input_message_content"];
      break;
    }
    case "thumbnail_url": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["thumbnailUrl"] = decoded;
      delete output["thumbnail_url"];
      break;
    }
    case "thumbnail_width": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["thumbnailWidth"] = decoded;
      delete output["thumbnail_width"];
      break;
    }
    case "thumbnail_height": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["thumbnailHeight"] = decoded;
      delete output["thumbnail_height"];
      break;
    }

    }
  }
  if (seen !== 63) return decodeFailure;
  return (output ?? source) as Types.InlineQueryResultVenue;
}

export function _decodeInlineQueryResultVideo(input: unknown): Types.InlineQueryResultVideo | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "video" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      output["type"] = decoded;
      seen |= 1;
      break;
    }
    case "id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["id"] = decoded;
      seen |= 2;
      break;
    }
    case "video_url": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["videoUrl"] = decoded;
      seen |= 4;
      break;
    }
    case "mime_type": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["mimeType"] = decoded;
      seen |= 8;
      break;
    }
    case "thumbnail_url": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["thumbnailUrl"] = decoded;
      seen |= 16;
      break;
    }
    case "title": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["title"] = decoded;
      seen |= 32;
      break;
    }
    case "caption": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["caption"] = decoded;
      break;
    }
    case "parse_mode": {
      const raw = source[key];
      const decoded = _decodeParseMode(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["parseMode"] = decoded;
      break;
    }
    case "caption_entities": {
      const raw = source[key];
      const decoded = _decodeArrayOfMessageEntity(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["captionEntities"] = decoded;
      break;
    }
    case "show_caption_above_media": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["showCaptionAboveMedia"] = decoded;
      break;
    }
    case "video_width": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["videoWidth"] = decoded;
      break;
    }
    case "video_height": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["videoHeight"] = decoded;
      break;
    }
    case "video_duration": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["videoDuration"] = decoded;
      break;
    }
    case "description": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["description"] = decoded;
      break;
    }
    case "reply_markup": {
      const raw = source[key];
      const decoded = _decodeInlineKeyboardMarkup(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["replyMarkup"] = decoded;
      break;
    }
    case "input_message_content": {
      const raw = source[key];
      const decoded = _decodeInputMessageContent(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["inputMessageContent"] = decoded;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 63) return decodeFailure;
  return output as Types.InlineQueryResultVideo;
}

export function _decodeInlineQueryResultVoice(input: unknown): Types.InlineQueryResultVoice | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "voice" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      output["type"] = decoded;
      seen |= 1;
      break;
    }
    case "id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["id"] = decoded;
      seen |= 2;
      break;
    }
    case "voice_url": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["voiceUrl"] = decoded;
      seen |= 4;
      break;
    }
    case "title": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["title"] = decoded;
      seen |= 8;
      break;
    }
    case "caption": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["caption"] = decoded;
      break;
    }
    case "parse_mode": {
      const raw = source[key];
      const decoded = _decodeParseMode(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["parseMode"] = decoded;
      break;
    }
    case "caption_entities": {
      const raw = source[key];
      const decoded = _decodeArrayOfMessageEntity(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["captionEntities"] = decoded;
      break;
    }
    case "voice_duration": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["voiceDuration"] = decoded;
      break;
    }
    case "reply_markup": {
      const raw = source[key];
      const decoded = _decodeInlineKeyboardMarkup(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["replyMarkup"] = decoded;
      break;
    }
    case "input_message_content": {
      const raw = source[key];
      const decoded = _decodeInputMessageContent(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["inputMessageContent"] = decoded;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 15) return decodeFailure;
  return output as Types.InlineQueryResultVoice;
}

export function _decodeInputChecklist(input: unknown): Types.InputChecklist | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "title": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["title"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "parse_mode": {
      const raw = source[key];
      const decoded = _decodeParseMode(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["parseMode"] = decoded;
      delete output["parse_mode"];
      break;
    }
    case "title_entities": {
      const raw = source[key];
      const decoded = _decodeArrayOfMessageEntity(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["titleEntities"] = decoded;
      delete output["title_entities"];
      break;
    }
    case "tasks": {
      const raw = source[key];
      const decoded = _decodeArrayOfInputChecklistTask(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["tasks"] = decoded;
      }
      seen |= 2;
      break;
    }
    case "others_can_add_tasks": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["othersCanAddTasks"] = decoded;
      delete output["others_can_add_tasks"];
      break;
    }
    case "others_can_mark_tasks_as_done": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["othersCanMarkTasksAsDone"] = decoded;
      delete output["others_can_mark_tasks_as_done"];
      break;
    }

    }
  }
  if (seen !== 3) return decodeFailure;
  return (output ?? source) as Types.InputChecklist;
}

export function _decodeInputChecklistTask(input: unknown): Types.InputChecklistTask | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "id": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["id"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "text": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["text"] = decoded;
      }
      seen |= 2;
      break;
    }
    case "parse_mode": {
      const raw = source[key];
      const decoded = _decodeParseMode(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["parseMode"] = decoded;
      delete output["parse_mode"];
      break;
    }
    case "text_entities": {
      const raw = source[key];
      const decoded = _decodeArrayOfMessageEntity(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["textEntities"] = decoded;
      delete output["text_entities"];
      break;
    }

    }
  }
  if (seen !== 3) return decodeFailure;
  return (output ?? source) as Types.InputChecklistTask;
}

export function _decodeInputContactMessageContent(input: unknown): Types.InputContactMessageContent | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "phone_number": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["phoneNumber"] = decoded;
      seen |= 1;
      break;
    }
    case "first_name": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["firstName"] = decoded;
      seen |= 2;
      break;
    }
    case "last_name": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["lastName"] = decoded;
      break;
    }
    case "vcard": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["vcard"] = decoded;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 3) return decodeFailure;
  return output as Types.InputContactMessageContent;
}

export function _decodeInputFile(input: unknown): Types.InputFile | typeof decodeFailure {
  return input instanceof Blob ? input : decodeFailure;
}

export function _decodeInputInvoiceMessageContent(input: unknown): Types.InputInvoiceMessageContent | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "title": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["title"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "description": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["description"] = decoded;
      }
      seen |= 2;
      break;
    }
    case "payload": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["payload"] = decoded;
      }
      seen |= 4;
      break;
    }
    case "provider_token": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["providerToken"] = decoded;
      delete output["provider_token"];
      break;
    }
    case "currency": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["currency"] = decoded;
      }
      seen |= 8;
      break;
    }
    case "prices": {
      const raw = source[key];
      const decoded = _decodeArrayOfLabeledPrice(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["prices"] = decoded;
      }
      seen |= 16;
      break;
    }
    case "max_tip_amount": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["maxTipAmount"] = decoded;
      delete output["max_tip_amount"];
      break;
    }
    case "suggested_tip_amounts": {
      const raw = source[key];
      const decoded = _decodeArrayOfInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["suggestedTipAmounts"] = decoded;
      delete output["suggested_tip_amounts"];
      break;
    }
    case "provider_data": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["providerData"] = decoded;
      delete output["provider_data"];
      break;
    }
    case "photo_url": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["photoUrl"] = decoded;
      delete output["photo_url"];
      break;
    }
    case "photo_size": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["photoSize"] = decoded;
      delete output["photo_size"];
      break;
    }
    case "photo_width": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["photoWidth"] = decoded;
      delete output["photo_width"];
      break;
    }
    case "photo_height": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["photoHeight"] = decoded;
      delete output["photo_height"];
      break;
    }
    case "need_name": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["needName"] = decoded;
      delete output["need_name"];
      break;
    }
    case "need_phone_number": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["needPhoneNumber"] = decoded;
      delete output["need_phone_number"];
      break;
    }
    case "need_email": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["needEmail"] = decoded;
      delete output["need_email"];
      break;
    }
    case "need_shipping_address": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["needShippingAddress"] = decoded;
      delete output["need_shipping_address"];
      break;
    }
    case "send_phone_number_to_provider": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["sendPhoneNumberToProvider"] = decoded;
      delete output["send_phone_number_to_provider"];
      break;
    }
    case "send_email_to_provider": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["sendEmailToProvider"] = decoded;
      delete output["send_email_to_provider"];
      break;
    }
    case "is_flexible": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["isFlexible"] = decoded;
      delete output["is_flexible"];
      break;
    }

    }
  }
  if (seen !== 31) return decodeFailure;
  return (output ?? source) as Types.InputInvoiceMessageContent;
}

export function _decodeInputLocationMessageContent(input: unknown): Types.InputLocationMessageContent | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "latitude": {
      const raw = source[key];
      const decoded = _decodeFloat(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["latitude"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "longitude": {
      const raw = source[key];
      const decoded = _decodeFloat(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["longitude"] = decoded;
      }
      seen |= 2;
      break;
    }
    case "horizontal_accuracy": {
      const raw = source[key];
      const decoded = _decodeFloat(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["horizontalAccuracy"] = decoded;
      delete output["horizontal_accuracy"];
      break;
    }
    case "live_period": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["livePeriod"] = decoded;
      delete output["live_period"];
      break;
    }
    case "heading": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["heading"] = decoded;
      }
      break;
    }
    case "proximity_alert_radius": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["proximityAlertRadius"] = decoded;
      delete output["proximity_alert_radius"];
      break;
    }

    }
  }
  if (seen !== 3) return decodeFailure;
  return (output ?? source) as Types.InputLocationMessageContent;
}

export function _decodeInputMedia(input: unknown): Types.InputMedia | typeof decodeFailure {
  const member0 = _decodeInputMediaAnimation(input);
  if (member0 !== decodeFailure) return member0;
  const member1 = _decodeInputMediaAudio(input);
  if (member1 !== decodeFailure) return member1;
  const member2 = _decodeInputMediaDocument(input);
  if (member2 !== decodeFailure) return member2;
  const member3 = _decodeInputMediaLivePhoto(input);
  if (member3 !== decodeFailure) return member3;
  const member4 = _decodeInputMediaPhoto(input);
  if (member4 !== decodeFailure) return member4;
  const member5 = _decodeInputMediaVideo(input);
  if (member5 !== decodeFailure) return member5;
  return decodeFailure;
}

export function _decodeInputMediaAnimation(input: unknown): Types.InputMediaAnimation | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "animation" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "media": {
      const raw = source[key];
      let decoded: unknown = decodeFailure;
      if (decoded === decodeFailure) decoded = _decodeInputFile(raw);
      if (decoded === decodeFailure) decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["media"] = decoded;
      }
      seen |= 2;
      break;
    }
    case "thumbnail": {
      const raw = source[key];
      const decoded = _decodeInputFile(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["thumbnail"] = decoded;
      }
      break;
    }
    case "caption": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["caption"] = decoded;
      }
      break;
    }
    case "parse_mode": {
      const raw = source[key];
      const decoded = _decodeParseMode(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["parseMode"] = decoded;
      delete output["parse_mode"];
      break;
    }
    case "caption_entities": {
      const raw = source[key];
      const decoded = _decodeArrayOfMessageEntity(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["captionEntities"] = decoded;
      delete output["caption_entities"];
      break;
    }
    case "show_caption_above_media": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["showCaptionAboveMedia"] = decoded;
      delete output["show_caption_above_media"];
      break;
    }
    case "width": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["width"] = decoded;
      }
      break;
    }
    case "height": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["height"] = decoded;
      }
      break;
    }
    case "duration": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["duration"] = decoded;
      }
      break;
    }
    case "has_spoiler": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["hasSpoiler"] = decoded;
      delete output["has_spoiler"];
      break;
    }

    }
  }
  if (seen !== 3) return decodeFailure;
  return (output ?? source) as Types.InputMediaAnimation;
}

export function _decodeInputMediaAudio(input: unknown): Types.InputMediaAudio | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "audio" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "media": {
      const raw = source[key];
      let decoded: unknown = decodeFailure;
      if (decoded === decodeFailure) decoded = _decodeInputFile(raw);
      if (decoded === decodeFailure) decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["media"] = decoded;
      }
      seen |= 2;
      break;
    }
    case "thumbnail": {
      const raw = source[key];
      const decoded = _decodeInputFile(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["thumbnail"] = decoded;
      }
      break;
    }
    case "caption": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["caption"] = decoded;
      }
      break;
    }
    case "parse_mode": {
      const raw = source[key];
      const decoded = _decodeParseMode(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["parseMode"] = decoded;
      delete output["parse_mode"];
      break;
    }
    case "caption_entities": {
      const raw = source[key];
      const decoded = _decodeArrayOfMessageEntity(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["captionEntities"] = decoded;
      delete output["caption_entities"];
      break;
    }
    case "duration": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["duration"] = decoded;
      }
      break;
    }
    case "performer": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["performer"] = decoded;
      }
      break;
    }
    case "title": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["title"] = decoded;
      }
      break;
    }

    }
  }
  if (seen !== 3) return decodeFailure;
  return (output ?? source) as Types.InputMediaAudio;
}

export function _decodeInputMediaDocument(input: unknown): Types.InputMediaDocument | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "document" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "media": {
      const raw = source[key];
      let decoded: unknown = decodeFailure;
      if (decoded === decodeFailure) decoded = _decodeInputFile(raw);
      if (decoded === decodeFailure) decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["media"] = decoded;
      }
      seen |= 2;
      break;
    }
    case "thumbnail": {
      const raw = source[key];
      const decoded = _decodeInputFile(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["thumbnail"] = decoded;
      }
      break;
    }
    case "caption": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["caption"] = decoded;
      }
      break;
    }
    case "parse_mode": {
      const raw = source[key];
      const decoded = _decodeParseMode(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["parseMode"] = decoded;
      delete output["parse_mode"];
      break;
    }
    case "caption_entities": {
      const raw = source[key];
      const decoded = _decodeArrayOfMessageEntity(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["captionEntities"] = decoded;
      delete output["caption_entities"];
      break;
    }
    case "disable_content_type_detection": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["disableContentTypeDetection"] = decoded;
      delete output["disable_content_type_detection"];
      break;
    }

    }
  }
  if (seen !== 3) return decodeFailure;
  return (output ?? source) as Types.InputMediaDocument;
}

export function _decodeInputMediaLink(input: unknown): Types.InputMediaLink | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "link" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "url": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["url"] = decoded;
      }
      seen |= 2;
      break;
    }

    }
  }
  if (seen !== 3) return decodeFailure;
  return (output ?? source) as Types.InputMediaLink;
}

export function _decodeInputMediaLivePhoto(input: unknown): Types.InputMediaLivePhoto | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "live_photo" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "media": {
      const raw = source[key];
      let decoded: unknown = decodeFailure;
      if (decoded === decodeFailure) decoded = _decodeInputFile(raw);
      if (decoded === decodeFailure) decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["media"] = decoded;
      }
      seen |= 2;
      break;
    }
    case "photo": {
      const raw = source[key];
      let decoded: unknown = decodeFailure;
      if (decoded === decodeFailure) decoded = _decodeInputFile(raw);
      if (decoded === decodeFailure) decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["photo"] = decoded;
      }
      seen |= 4;
      break;
    }
    case "caption": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["caption"] = decoded;
      }
      break;
    }
    case "parse_mode": {
      const raw = source[key];
      const decoded = _decodeParseMode(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["parseMode"] = decoded;
      delete output["parse_mode"];
      break;
    }
    case "caption_entities": {
      const raw = source[key];
      const decoded = _decodeArrayOfMessageEntity(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["captionEntities"] = decoded;
      delete output["caption_entities"];
      break;
    }
    case "show_caption_above_media": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["showCaptionAboveMedia"] = decoded;
      delete output["show_caption_above_media"];
      break;
    }
    case "has_spoiler": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["hasSpoiler"] = decoded;
      delete output["has_spoiler"];
      break;
    }

    }
  }
  if (seen !== 7) return decodeFailure;
  return (output ?? source) as Types.InputMediaLivePhoto;
}

export function _decodeInputMediaLocation(input: unknown): Types.InputMediaLocation | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "location" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "latitude": {
      const raw = source[key];
      const decoded = _decodeFloat(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["latitude"] = decoded;
      }
      seen |= 2;
      break;
    }
    case "longitude": {
      const raw = source[key];
      const decoded = _decodeFloat(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["longitude"] = decoded;
      }
      seen |= 4;
      break;
    }
    case "horizontal_accuracy": {
      const raw = source[key];
      const decoded = _decodeFloat(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["horizontalAccuracy"] = decoded;
      delete output["horizontal_accuracy"];
      break;
    }

    }
  }
  if (seen !== 7) return decodeFailure;
  return (output ?? source) as Types.InputMediaLocation;
}

export function _decodeInputMediaPhoto(input: unknown): Types.InputMediaPhoto | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "photo" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "media": {
      const raw = source[key];
      let decoded: unknown = decodeFailure;
      if (decoded === decodeFailure) decoded = _decodeInputFile(raw);
      if (decoded === decodeFailure) decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["media"] = decoded;
      }
      seen |= 2;
      break;
    }
    case "caption": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["caption"] = decoded;
      }
      break;
    }
    case "parse_mode": {
      const raw = source[key];
      const decoded = _decodeParseMode(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["parseMode"] = decoded;
      delete output["parse_mode"];
      break;
    }
    case "caption_entities": {
      const raw = source[key];
      const decoded = _decodeArrayOfMessageEntity(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["captionEntities"] = decoded;
      delete output["caption_entities"];
      break;
    }
    case "show_caption_above_media": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["showCaptionAboveMedia"] = decoded;
      delete output["show_caption_above_media"];
      break;
    }
    case "has_spoiler": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["hasSpoiler"] = decoded;
      delete output["has_spoiler"];
      break;
    }

    }
  }
  if (seen !== 3) return decodeFailure;
  return (output ?? source) as Types.InputMediaPhoto;
}

export function _decodeInputMediaSticker(input: unknown): Types.InputMediaSticker | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "sticker" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "media": {
      const raw = source[key];
      let decoded: unknown = decodeFailure;
      if (decoded === decodeFailure) decoded = _decodeInputFile(raw);
      if (decoded === decodeFailure) decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["media"] = decoded;
      }
      seen |= 2;
      break;
    }
    case "emoji": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["emoji"] = decoded;
      }
      break;
    }

    }
  }
  if (seen !== 3) return decodeFailure;
  return (output ?? source) as Types.InputMediaSticker;
}

export function _decodeInputMediaVenue(input: unknown): Types.InputMediaVenue | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "venue" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "latitude": {
      const raw = source[key];
      const decoded = _decodeFloat(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["latitude"] = decoded;
      }
      seen |= 2;
      break;
    }
    case "longitude": {
      const raw = source[key];
      const decoded = _decodeFloat(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["longitude"] = decoded;
      }
      seen |= 4;
      break;
    }
    case "title": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["title"] = decoded;
      }
      seen |= 8;
      break;
    }
    case "address": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["address"] = decoded;
      }
      seen |= 16;
      break;
    }
    case "foursquare_id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["foursquareId"] = decoded;
      delete output["foursquare_id"];
      break;
    }
    case "foursquare_type": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["foursquareType"] = decoded;
      delete output["foursquare_type"];
      break;
    }
    case "google_place_id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["googlePlaceId"] = decoded;
      delete output["google_place_id"];
      break;
    }
    case "google_place_type": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["googlePlaceType"] = decoded;
      delete output["google_place_type"];
      break;
    }

    }
  }
  if (seen !== 31) return decodeFailure;
  return (output ?? source) as Types.InputMediaVenue;
}

export function _decodeInputMediaVideo(input: unknown): Types.InputMediaVideo | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "video" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "media": {
      const raw = source[key];
      let decoded: unknown = decodeFailure;
      if (decoded === decodeFailure) decoded = _decodeInputFile(raw);
      if (decoded === decodeFailure) decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["media"] = decoded;
      }
      seen |= 2;
      break;
    }
    case "thumbnail": {
      const raw = source[key];
      const decoded = _decodeInputFile(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["thumbnail"] = decoded;
      }
      break;
    }
    case "cover": {
      const raw = source[key];
      let decoded: unknown = decodeFailure;
      if (decoded === decodeFailure) decoded = _decodeInputFile(raw);
      if (decoded === decodeFailure) decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["cover"] = decoded;
      }
      break;
    }
    case "start_timestamp": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["startTimestamp"] = decoded;
      delete output["start_timestamp"];
      break;
    }
    case "caption": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["caption"] = decoded;
      }
      break;
    }
    case "parse_mode": {
      const raw = source[key];
      const decoded = _decodeParseMode(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["parseMode"] = decoded;
      delete output["parse_mode"];
      break;
    }
    case "caption_entities": {
      const raw = source[key];
      const decoded = _decodeArrayOfMessageEntity(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["captionEntities"] = decoded;
      delete output["caption_entities"];
      break;
    }
    case "show_caption_above_media": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["showCaptionAboveMedia"] = decoded;
      delete output["show_caption_above_media"];
      break;
    }
    case "width": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["width"] = decoded;
      }
      break;
    }
    case "height": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["height"] = decoded;
      }
      break;
    }
    case "duration": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["duration"] = decoded;
      }
      break;
    }
    case "supports_streaming": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["supportsStreaming"] = decoded;
      delete output["supports_streaming"];
      break;
    }
    case "has_spoiler": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["hasSpoiler"] = decoded;
      delete output["has_spoiler"];
      break;
    }

    }
  }
  if (seen !== 3) return decodeFailure;
  return (output ?? source) as Types.InputMediaVideo;
}

export function _decodeInputMediaVoiceNote(input: unknown): Types.InputMediaVoiceNote | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "media": {
      const raw = source[key];
      let decoded: unknown = decodeFailure;
      if (decoded === decodeFailure) decoded = _decodeInputFile(raw);
      if (decoded === decodeFailure) decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["media"] = decoded;
      }
      seen |= 2;
      break;
    }
    case "caption": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["caption"] = decoded;
      }
      break;
    }
    case "parse_mode": {
      const raw = source[key];
      const decoded = _decodeParseMode(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["parseMode"] = decoded;
      delete output["parse_mode"];
      break;
    }
    case "caption_entities": {
      const raw = source[key];
      const decoded = _decodeArrayOfMessageEntity(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["captionEntities"] = decoded;
      delete output["caption_entities"];
      break;
    }
    case "duration": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["duration"] = decoded;
      }
      break;
    }

    }
  }
  if (seen !== 3) return decodeFailure;
  return (output ?? source) as Types.InputMediaVoiceNote;
}

export function _decodeInputMessageContent(input: unknown): Types.InputMessageContent | typeof decodeFailure {
  const member0 = _decodeInputTextMessageContent(input);
  if (member0 !== decodeFailure) return member0;
  const member1 = _decodeInputRichMessageContent(input);
  if (member1 !== decodeFailure) return member1;
  const member2 = _decodeInputLocationMessageContent(input);
  if (member2 !== decodeFailure) return member2;
  const member3 = _decodeInputVenueMessageContent(input);
  if (member3 !== decodeFailure) return member3;
  const member4 = _decodeInputContactMessageContent(input);
  if (member4 !== decodeFailure) return member4;
  const member5 = _decodeInputInvoiceMessageContent(input);
  if (member5 !== decodeFailure) return member5;
  return decodeFailure;
}

export function _decodeInputPaidMedia(input: unknown): Types.InputPaidMedia | typeof decodeFailure {
  const member0 = _decodeInputPaidMediaLivePhoto(input);
  if (member0 !== decodeFailure) return member0;
  const member1 = _decodeInputPaidMediaPhoto(input);
  if (member1 !== decodeFailure) return member1;
  const member2 = _decodeInputPaidMediaVideo(input);
  if (member2 !== decodeFailure) return member2;
  return decodeFailure;
}

export function _decodeInputPaidMediaLivePhoto(input: unknown): Types.InputPaidMediaLivePhoto | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "live_photo" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "media": {
      const raw = source[key];
      let decoded: unknown = decodeFailure;
      if (decoded === decodeFailure) decoded = _decodeInputFile(raw);
      if (decoded === decodeFailure) decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["media"] = decoded;
      }
      seen |= 2;
      break;
    }
    case "photo": {
      const raw = source[key];
      let decoded: unknown = decodeFailure;
      if (decoded === decodeFailure) decoded = _decodeInputFile(raw);
      if (decoded === decodeFailure) decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["photo"] = decoded;
      }
      seen |= 4;
      break;
    }

    }
  }
  if (seen !== 7) return decodeFailure;
  return (output ?? source) as Types.InputPaidMediaLivePhoto;
}

export function _decodeInputPaidMediaPhoto(input: unknown): Types.InputPaidMediaPhoto | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "photo" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "media": {
      const raw = source[key];
      let decoded: unknown = decodeFailure;
      if (decoded === decodeFailure) decoded = _decodeInputFile(raw);
      if (decoded === decodeFailure) decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["media"] = decoded;
      }
      seen |= 2;
      break;
    }

    }
  }
  if (seen !== 3) return decodeFailure;
  return (output ?? source) as Types.InputPaidMediaPhoto;
}

export function _decodeInputPaidMediaVideo(input: unknown): Types.InputPaidMediaVideo | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "video" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "media": {
      const raw = source[key];
      let decoded: unknown = decodeFailure;
      if (decoded === decodeFailure) decoded = _decodeInputFile(raw);
      if (decoded === decodeFailure) decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["media"] = decoded;
      }
      seen |= 2;
      break;
    }
    case "thumbnail": {
      const raw = source[key];
      const decoded = _decodeInputFile(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["thumbnail"] = decoded;
      }
      break;
    }
    case "cover": {
      const raw = source[key];
      let decoded: unknown = decodeFailure;
      if (decoded === decodeFailure) decoded = _decodeInputFile(raw);
      if (decoded === decodeFailure) decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["cover"] = decoded;
      }
      break;
    }
    case "start_timestamp": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["startTimestamp"] = decoded;
      delete output["start_timestamp"];
      break;
    }
    case "width": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["width"] = decoded;
      }
      break;
    }
    case "height": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["height"] = decoded;
      }
      break;
    }
    case "duration": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["duration"] = decoded;
      }
      break;
    }
    case "supports_streaming": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["supportsStreaming"] = decoded;
      delete output["supports_streaming"];
      break;
    }

    }
  }
  if (seen !== 3) return decodeFailure;
  return (output ?? source) as Types.InputPaidMediaVideo;
}

export function _decodeInputPollMedia(input: unknown): Types.InputPollMedia | typeof decodeFailure {
  const member0 = _decodeInputMediaAnimation(input);
  if (member0 !== decodeFailure) return member0;
  const member1 = _decodeInputMediaAudio(input);
  if (member1 !== decodeFailure) return member1;
  const member2 = _decodeInputMediaDocument(input);
  if (member2 !== decodeFailure) return member2;
  const member3 = _decodeInputMediaLivePhoto(input);
  if (member3 !== decodeFailure) return member3;
  const member4 = _decodeInputMediaLocation(input);
  if (member4 !== decodeFailure) return member4;
  const member5 = _decodeInputMediaPhoto(input);
  if (member5 !== decodeFailure) return member5;
  const member6 = _decodeInputMediaVenue(input);
  if (member6 !== decodeFailure) return member6;
  const member7 = _decodeInputMediaVideo(input);
  if (member7 !== decodeFailure) return member7;
  return decodeFailure;
}

export function _decodeInputPollOption(input: unknown): Types.InputPollOption | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "text": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["text"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "text_parse_mode": {
      const raw = source[key];
      const decoded = _decodeParseMode(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["textParseMode"] = decoded;
      delete output["text_parse_mode"];
      break;
    }
    case "text_entities": {
      const raw = source[key];
      const decoded = _decodeArrayOfMessageEntity(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["textEntities"] = decoded;
      delete output["text_entities"];
      break;
    }
    case "media": {
      const raw = source[key];
      const decoded = _decodeInputPollOptionMedia(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["media"] = decoded;
      }
      break;
    }

    }
  }
  if (seen !== 1) return decodeFailure;
  return (output ?? source) as Types.InputPollOption;
}

export function _decodeInputPollOptionMedia(input: unknown): Types.InputPollOptionMedia | typeof decodeFailure {
  const member0 = _decodeInputMediaAnimation(input);
  if (member0 !== decodeFailure) return member0;
  const member1 = _decodeInputMediaLink(input);
  if (member1 !== decodeFailure) return member1;
  const member2 = _decodeInputMediaLivePhoto(input);
  if (member2 !== decodeFailure) return member2;
  const member3 = _decodeInputMediaLocation(input);
  if (member3 !== decodeFailure) return member3;
  const member4 = _decodeInputMediaPhoto(input);
  if (member4 !== decodeFailure) return member4;
  const member5 = _decodeInputMediaSticker(input);
  if (member5 !== decodeFailure) return member5;
  const member6 = _decodeInputMediaVenue(input);
  if (member6 !== decodeFailure) return member6;
  const member7 = _decodeInputMediaVideo(input);
  if (member7 !== decodeFailure) return member7;
  return decodeFailure;
}

export function _decodeInputProfilePhoto(input: unknown): Types.InputProfilePhoto | typeof decodeFailure {
  const member0 = _decodeInputProfilePhotoStatic(input);
  if (member0 !== decodeFailure) return member0;
  const member1 = _decodeInputProfilePhotoAnimated(input);
  if (member1 !== decodeFailure) return member1;
  return decodeFailure;
}

export function _decodeInputProfilePhotoAnimated(input: unknown): Types.InputProfilePhotoAnimated | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "animated" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "animation": {
      const raw = source[key];
      const decoded = _decodeInputFile(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["animation"] = decoded;
      }
      seen |= 2;
      break;
    }
    case "main_frame_timestamp": {
      const raw = source[key];
      const decoded = _decodeFloat(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["mainFrameTimestamp"] = decoded;
      delete output["main_frame_timestamp"];
      break;
    }

    }
  }
  if (seen !== 3) return decodeFailure;
  return (output ?? source) as Types.InputProfilePhotoAnimated;
}

export function _decodeInputProfilePhotoStatic(input: unknown): Types.InputProfilePhotoStatic | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "static" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "photo": {
      const raw = source[key];
      const decoded = _decodeInputFile(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["photo"] = decoded;
      }
      seen |= 2;
      break;
    }

    }
  }
  if (seen !== 3) return decodeFailure;
  return (output ?? source) as Types.InputProfilePhotoStatic;
}

export function _decodeInputRichBlock(input: unknown): Types.InputRichBlock | typeof decodeFailure {
  const member0 = _decodeInputRichBlockParagraph(input);
  if (member0 !== decodeFailure) return member0;
  const member1 = _decodeInputRichBlockSectionHeading(input);
  if (member1 !== decodeFailure) return member1;
  const member2 = _decodeInputRichBlockPreformatted(input);
  if (member2 !== decodeFailure) return member2;
  const member3 = _decodeInputRichBlockFooter(input);
  if (member3 !== decodeFailure) return member3;
  const member4 = _decodeInputRichBlockDivider(input);
  if (member4 !== decodeFailure) return member4;
  const member5 = _decodeInputRichBlockMathematicalExpression(input);
  if (member5 !== decodeFailure) return member5;
  const member6 = _decodeInputRichBlockAnchor(input);
  if (member6 !== decodeFailure) return member6;
  const member7 = _decodeInputRichBlockList(input);
  if (member7 !== decodeFailure) return member7;
  const member8 = _decodeInputRichBlockBlockQuotation(input);
  if (member8 !== decodeFailure) return member8;
  const member9 = _decodeInputRichBlockExpandableBlockQuotation(input);
  if (member9 !== decodeFailure) return member9;
  const member10 = _decodeInputRichBlockPullQuotation(input);
  if (member10 !== decodeFailure) return member10;
  const member11 = _decodeInputRichBlockCollage(input);
  if (member11 !== decodeFailure) return member11;
  const member12 = _decodeInputRichBlockSlideshow(input);
  if (member12 !== decodeFailure) return member12;
  const member13 = _decodeInputRichBlockTable(input);
  if (member13 !== decodeFailure) return member13;
  const member14 = _decodeInputRichBlockDetails(input);
  if (member14 !== decodeFailure) return member14;
  const member15 = _decodeInputRichBlockMap(input);
  if (member15 !== decodeFailure) return member15;
  const member16 = _decodeInputRichBlockButtons(input);
  if (member16 !== decodeFailure) return member16;
  const member17 = _decodeInputRichBlockAnimation(input);
  if (member17 !== decodeFailure) return member17;
  const member18 = _decodeInputRichBlockAudio(input);
  if (member18 !== decodeFailure) return member18;
  const member19 = _decodeInputRichBlockDocument(input);
  if (member19 !== decodeFailure) return member19;
  const member20 = _decodeInputRichBlockPhoto(input);
  if (member20 !== decodeFailure) return member20;
  const member21 = _decodeInputRichBlockVideo(input);
  if (member21 !== decodeFailure) return member21;
  const member22 = _decodeInputRichBlockVoiceNote(input);
  if (member22 !== decodeFailure) return member22;
  const member23 = _decodeInputRichBlockThinking(input);
  if (member23 !== decodeFailure) return member23;
  return decodeFailure;
}

export function _decodeInputRichBlockAnchor(input: unknown): Types.InputRichBlockAnchor | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "anchor" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "name": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["name"] = decoded;
      }
      seen |= 2;
      break;
    }

    }
  }
  if (seen !== 3) return decodeFailure;
  return (output ?? source) as Types.InputRichBlockAnchor;
}

export function _decodeInputRichBlockAnimation(input: unknown): Types.InputRichBlockAnimation | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "animation" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "animation": {
      const raw = source[key];
      const decoded = _decodeInputMediaAnimation(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["animation"] = decoded;
      }
      seen |= 2;
      break;
    }
    case "caption": {
      const raw = source[key];
      const decoded = _decodeRichBlockCaption(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["caption"] = decoded;
      }
      break;
    }

    }
  }
  if (seen !== 3) return decodeFailure;
  return (output ?? source) as Types.InputRichBlockAnimation;
}

export function _decodeInputRichBlockAudio(input: unknown): Types.InputRichBlockAudio | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "audio" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "audio": {
      const raw = source[key];
      const decoded = _decodeInputMediaAudio(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["audio"] = decoded;
      }
      seen |= 2;
      break;
    }
    case "caption": {
      const raw = source[key];
      const decoded = _decodeRichBlockCaption(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["caption"] = decoded;
      }
      break;
    }

    }
  }
  if (seen !== 3) return decodeFailure;
  return (output ?? source) as Types.InputRichBlockAudio;
}

export function _decodeInputRichBlockBlockQuotation(input: unknown): Types.InputRichBlockBlockQuotation | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "blockquote" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "blocks": {
      const raw = source[key];
      const decoded = _decodeArrayOfInputRichBlock(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["blocks"] = decoded;
      }
      seen |= 2;
      break;
    }
    case "credit": {
      const raw = source[key];
      const decoded = _decodeRichText(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["credit"] = decoded;
      }
      break;
    }

    }
  }
  if (seen !== 3) return decodeFailure;
  return (output ?? source) as Types.InputRichBlockBlockQuotation;
}

export function _decodeInputRichBlockButtons(input: unknown): Types.InputRichBlockButtons | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "buttons" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "buttons": {
      const raw = source[key];
      const decoded = _decodeArrayOfRichMessageButton(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["buttons"] = decoded;
      }
      seen |= 2;
      break;
    }
    case "align": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["align"] = decoded;
      }
      break;
    }

    }
  }
  if (seen !== 3) return decodeFailure;
  return (output ?? source) as Types.InputRichBlockButtons;
}

export function _decodeInputRichBlockCollage(input: unknown): Types.InputRichBlockCollage | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "collage" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "blocks": {
      const raw = source[key];
      const decoded = _decodeArrayOfInputRichBlock(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["blocks"] = decoded;
      }
      seen |= 2;
      break;
    }
    case "caption": {
      const raw = source[key];
      const decoded = _decodeRichBlockCaption(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["caption"] = decoded;
      }
      break;
    }

    }
  }
  if (seen !== 3) return decodeFailure;
  return (output ?? source) as Types.InputRichBlockCollage;
}

export function _decodeInputRichBlockDetails(input: unknown): Types.InputRichBlockDetails | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "details" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "summary": {
      const raw = source[key];
      const decoded = _decodeRichText(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["summary"] = decoded;
      }
      seen |= 2;
      break;
    }
    case "blocks": {
      const raw = source[key];
      const decoded = _decodeArrayOfInputRichBlock(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["blocks"] = decoded;
      }
      seen |= 4;
      break;
    }
    case "is_open": {
      const raw = source[key];
      const decoded = _decodeTrue(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["isOpen"] = decoded;
      delete output["is_open"];
      break;
    }

    }
  }
  if (seen !== 7) return decodeFailure;
  return (output ?? source) as Types.InputRichBlockDetails;
}

export function _decodeInputRichBlockDivider(input: unknown): Types.InputRichBlockDivider | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "divider" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      seen |= 1;
      break;
    }

    }
  }
  if (seen !== 1) return decodeFailure;
  return (output ?? source) as Types.InputRichBlockDivider;
}

export function _decodeInputRichBlockDocument(input: unknown): Types.InputRichBlockDocument | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "document" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "document": {
      const raw = source[key];
      const decoded = _decodeInputMediaDocument(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["document"] = decoded;
      }
      seen |= 2;
      break;
    }
    case "caption": {
      const raw = source[key];
      const decoded = _decodeRichBlockCaption(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["caption"] = decoded;
      }
      break;
    }

    }
  }
  if (seen !== 3) return decodeFailure;
  return (output ?? source) as Types.InputRichBlockDocument;
}

export function _decodeInputRichBlockExpandableBlockQuotation(input: unknown): Types.InputRichBlockExpandableBlockQuotation | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "expandable_blockquote" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "text": {
      const raw = source[key];
      const decoded = _decodeRichText(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["text"] = decoded;
      }
      seen |= 2;
      break;
    }
    case "credit": {
      const raw = source[key];
      const decoded = _decodeRichText(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["credit"] = decoded;
      }
      break;
    }

    }
  }
  if (seen !== 3) return decodeFailure;
  return (output ?? source) as Types.InputRichBlockExpandableBlockQuotation;
}

export function _decodeInputRichBlockFooter(input: unknown): Types.InputRichBlockFooter | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "footer" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "text": {
      const raw = source[key];
      const decoded = _decodeRichText(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["text"] = decoded;
      }
      seen |= 2;
      break;
    }

    }
  }
  if (seen !== 3) return decodeFailure;
  return (output ?? source) as Types.InputRichBlockFooter;
}

export function _decodeInputRichBlockList(input: unknown): Types.InputRichBlockList | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "list" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "items": {
      const raw = source[key];
      const decoded = _decodeArrayOfInputRichBlockListItem(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["items"] = decoded;
      }
      seen |= 2;
      break;
    }

    }
  }
  if (seen !== 3) return decodeFailure;
  return (output ?? source) as Types.InputRichBlockList;
}

export function _decodeInputRichBlockListItem(input: unknown): Types.InputRichBlockListItem | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "blocks": {
      const raw = source[key];
      const decoded = _decodeArrayOfInputRichBlock(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["blocks"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "has_checkbox": {
      const raw = source[key];
      const decoded = _decodeTrue(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["hasCheckbox"] = decoded;
      delete output["has_checkbox"];
      break;
    }
    case "is_checked": {
      const raw = source[key];
      const decoded = _decodeTrue(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["isChecked"] = decoded;
      delete output["is_checked"];
      break;
    }
    case "value": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["value"] = decoded;
      }
      break;
    }
    case "type": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      break;
    }

    }
  }
  if (seen !== 1) return decodeFailure;
  return (output ?? source) as Types.InputRichBlockListItem;
}

export function _decodeInputRichBlockMap(input: unknown): Types.InputRichBlockMap | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "map" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "location": {
      const raw = source[key];
      const decoded = _decodeLocation(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["location"] = decoded;
      }
      seen |= 2;
      break;
    }
    case "zoom": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["zoom"] = decoded;
      }
      break;
    }
    case "width": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["width"] = decoded;
      }
      break;
    }
    case "height": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["height"] = decoded;
      }
      break;
    }
    case "caption": {
      const raw = source[key];
      const decoded = _decodeRichBlockCaption(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["caption"] = decoded;
      }
      break;
    }

    }
  }
  if (seen !== 3) return decodeFailure;
  return (output ?? source) as Types.InputRichBlockMap;
}

export function _decodeInputRichBlockMathematicalExpression(input: unknown): Types.InputRichBlockMathematicalExpression | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "mathematical_expression" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "expression": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["expression"] = decoded;
      }
      seen |= 2;
      break;
    }

    }
  }
  if (seen !== 3) return decodeFailure;
  return (output ?? source) as Types.InputRichBlockMathematicalExpression;
}

export function _decodeInputRichBlockParagraph(input: unknown): Types.InputRichBlockParagraph | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "paragraph" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "text": {
      const raw = source[key];
      const decoded = _decodeRichText(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["text"] = decoded;
      }
      seen |= 2;
      break;
    }

    }
  }
  if (seen !== 3) return decodeFailure;
  return (output ?? source) as Types.InputRichBlockParagraph;
}

export function _decodeInputRichBlockPhoto(input: unknown): Types.InputRichBlockPhoto | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "photo" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "photo": {
      const raw = source[key];
      const decoded = _decodeInputMediaPhoto(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["photo"] = decoded;
      }
      seen |= 2;
      break;
    }
    case "caption": {
      const raw = source[key];
      const decoded = _decodeRichBlockCaption(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["caption"] = decoded;
      }
      break;
    }

    }
  }
  if (seen !== 3) return decodeFailure;
  return (output ?? source) as Types.InputRichBlockPhoto;
}

export function _decodeInputRichBlockPreformatted(input: unknown): Types.InputRichBlockPreformatted | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "pre" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "text": {
      const raw = source[key];
      const decoded = _decodeRichText(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["text"] = decoded;
      }
      seen |= 2;
      break;
    }
    case "language": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["language"] = decoded;
      }
      break;
    }

    }
  }
  if (seen !== 3) return decodeFailure;
  return (output ?? source) as Types.InputRichBlockPreformatted;
}

export function _decodeInputRichBlockPullQuotation(input: unknown): Types.InputRichBlockPullQuotation | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "pullquote" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "text": {
      const raw = source[key];
      const decoded = _decodeRichText(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["text"] = decoded;
      }
      seen |= 2;
      break;
    }
    case "credit": {
      const raw = source[key];
      const decoded = _decodeRichText(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["credit"] = decoded;
      }
      break;
    }

    }
  }
  if (seen !== 3) return decodeFailure;
  return (output ?? source) as Types.InputRichBlockPullQuotation;
}

export function _decodeInputRichBlockSectionHeading(input: unknown): Types.InputRichBlockSectionHeading | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "heading" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "text": {
      const raw = source[key];
      const decoded = _decodeRichText(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["text"] = decoded;
      }
      seen |= 2;
      break;
    }
    case "size": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["size"] = decoded;
      }
      seen |= 4;
      break;
    }

    }
  }
  if (seen !== 7) return decodeFailure;
  return (output ?? source) as Types.InputRichBlockSectionHeading;
}

export function _decodeInputRichBlockSlideshow(input: unknown): Types.InputRichBlockSlideshow | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "slideshow" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "blocks": {
      const raw = source[key];
      const decoded = _decodeArrayOfInputRichBlock(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["blocks"] = decoded;
      }
      seen |= 2;
      break;
    }
    case "caption": {
      const raw = source[key];
      const decoded = _decodeRichBlockCaption(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["caption"] = decoded;
      }
      break;
    }

    }
  }
  if (seen !== 3) return decodeFailure;
  return (output ?? source) as Types.InputRichBlockSlideshow;
}

export function _decodeInputRichBlockTable(input: unknown): Types.InputRichBlockTable | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "table" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "cells": {
      const raw = source[key];
      const decoded = _decodeArrayOfArrayOfRichBlockTableCell(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["cells"] = decoded;
      }
      seen |= 2;
      break;
    }
    case "is_bordered": {
      const raw = source[key];
      const decoded = _decodeTrue(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["isBordered"] = decoded;
      delete output["is_bordered"];
      break;
    }
    case "is_striped": {
      const raw = source[key];
      const decoded = _decodeTrue(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["isStriped"] = decoded;
      delete output["is_striped"];
      break;
    }
    case "is_compact": {
      const raw = source[key];
      const decoded = _decodeTrue(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["isCompact"] = decoded;
      delete output["is_compact"];
      break;
    }
    case "caption": {
      const raw = source[key];
      const decoded = _decodeRichText(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["caption"] = decoded;
      }
      break;
    }

    }
  }
  if (seen !== 3) return decodeFailure;
  return (output ?? source) as Types.InputRichBlockTable;
}

export function _decodeInputRichBlockThinking(input: unknown): Types.InputRichBlockThinking | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "thinking" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "text": {
      const raw = source[key];
      const decoded = _decodeRichText(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["text"] = decoded;
      }
      seen |= 2;
      break;
    }

    }
  }
  if (seen !== 3) return decodeFailure;
  return (output ?? source) as Types.InputRichBlockThinking;
}

export function _decodeInputRichBlockVideo(input: unknown): Types.InputRichBlockVideo | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "video" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "video": {
      const raw = source[key];
      const decoded = _decodeInputMediaVideo(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["video"] = decoded;
      }
      seen |= 2;
      break;
    }
    case "caption": {
      const raw = source[key];
      const decoded = _decodeRichBlockCaption(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["caption"] = decoded;
      }
      break;
    }

    }
  }
  if (seen !== 3) return decodeFailure;
  return (output ?? source) as Types.InputRichBlockVideo;
}

export function _decodeInputRichBlockVoiceNote(input: unknown): Types.InputRichBlockVoiceNote | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "voice_note" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      output["type"] = decoded;
      seen |= 1;
      break;
    }
    case "voice_note": {
      const raw = source[key];
      const decoded = _decodeInputMediaVoiceNote(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["voiceNote"] = decoded;
      seen |= 2;
      break;
    }
    case "caption": {
      const raw = source[key];
      const decoded = _decodeRichBlockCaption(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["caption"] = decoded;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 3) return decodeFailure;
  return output as Types.InputRichBlockVoiceNote;
}

export function _decodeInputRichMessage(input: unknown): Types.InputRichMessage | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "blocks": {
      const raw = source[key];
      const decoded = _decodeArrayOfInputRichBlock(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["blocks"] = decoded;
      }
      break;
    }
    case "html": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["html"] = decoded;
      }
      break;
    }
    case "markdown": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["markdown"] = decoded;
      }
      break;
    }
    case "media": {
      const raw = source[key];
      const decoded = _decodeArrayOfInputRichMessageMedia(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["media"] = decoded;
      }
      break;
    }
    case "is_rtl": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["isRtl"] = decoded;
      delete output["is_rtl"];
      break;
    }
    case "skip_entity_detection": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["skipEntityDetection"] = decoded;
      delete output["skip_entity_detection"];
      break;
    }

    }
  }
  if (seen !== 0) return decodeFailure;
  return (output ?? source) as Types.InputRichMessage;
}

export function _decodeInputRichMessageContent(input: unknown): Types.InputRichMessageContent | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "rich_message": {
      const raw = source[key];
      const decoded = _decodeInputRichMessage(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["richMessage"] = decoded;
      seen |= 1;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 1) return decodeFailure;
  return output as Types.InputRichMessageContent;
}

export function _decodeInputRichMessageMedia(input: unknown): Types.InputRichMessageMedia | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["id"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "media": {
      const raw = source[key];
      let decoded: unknown = decodeFailure;
      if (decoded === decodeFailure) decoded = _decodeInputMediaAnimation(raw);
      if (decoded === decodeFailure) decoded = _decodeInputMediaAudio(raw);
      if (decoded === decodeFailure) decoded = _decodeInputMediaDocument(raw);
      if (decoded === decodeFailure) decoded = _decodeInputMediaPhoto(raw);
      if (decoded === decodeFailure) decoded = _decodeInputMediaVideo(raw);
      if (decoded === decodeFailure) decoded = _decodeInputMediaVoiceNote(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["media"] = decoded;
      }
      seen |= 2;
      break;
    }

    }
  }
  if (seen !== 3) return decodeFailure;
  return (output ?? source) as Types.InputRichMessageMedia;
}

export function _decodeInputSticker(input: unknown): Types.InputSticker | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "sticker": {
      const raw = source[key];
      let decoded: unknown = decodeFailure;
      if (decoded === decodeFailure) decoded = _decodeInputFile(raw);
      if (decoded === decodeFailure) decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["sticker"] = decoded;
      seen |= 1;
      break;
    }
    case "format": {
      const raw = source[key];
      const decoded = _decodeStickerFormat(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["format"] = decoded;
      seen |= 2;
      break;
    }
    case "emoji_list": {
      const raw = source[key];
      const decoded = _decodeArrayOfString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["emojiList"] = decoded;
      seen |= 4;
      break;
    }
    case "mask_position": {
      const raw = source[key];
      const decoded = _decodeMaskPosition(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["maskPosition"] = decoded;
      break;
    }
    case "keywords": {
      const raw = source[key];
      const decoded = _decodeArrayOfString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["keywords"] = decoded;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 7) return decodeFailure;
  return output as Types.InputSticker;
}

export function _decodeInputStoryContent(input: unknown): Types.InputStoryContent | typeof decodeFailure {
  const member0 = _decodeInputStoryContentPhoto(input);
  if (member0 !== decodeFailure) return member0;
  const member1 = _decodeInputStoryContentVideo(input);
  if (member1 !== decodeFailure) return member1;
  return decodeFailure;
}

export function _decodeInputStoryContentPhoto(input: unknown): Types.InputStoryContentPhoto | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "photo" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "photo": {
      const raw = source[key];
      const decoded = _decodeInputFile(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["photo"] = decoded;
      }
      seen |= 2;
      break;
    }

    }
  }
  if (seen !== 3) return decodeFailure;
  return (output ?? source) as Types.InputStoryContentPhoto;
}

export function _decodeInputStoryContentVideo(input: unknown): Types.InputStoryContentVideo | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "video" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "video": {
      const raw = source[key];
      const decoded = _decodeInputFile(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["video"] = decoded;
      }
      seen |= 2;
      break;
    }
    case "duration": {
      const raw = source[key];
      const decoded = _decodeFloat(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["duration"] = decoded;
      }
      break;
    }
    case "cover_frame_timestamp": {
      const raw = source[key];
      const decoded = _decodeFloat(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["coverFrameTimestamp"] = decoded;
      delete output["cover_frame_timestamp"];
      break;
    }
    case "is_animation": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["isAnimation"] = decoded;
      delete output["is_animation"];
      break;
    }

    }
  }
  if (seen !== 3) return decodeFailure;
  return (output ?? source) as Types.InputStoryContentVideo;
}

export function _decodeInputTextMessageContent(input: unknown): Types.InputTextMessageContent | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "message_text": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["messageText"] = decoded;
      seen |= 1;
      break;
    }
    case "parse_mode": {
      const raw = source[key];
      const decoded = _decodeParseMode(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["parseMode"] = decoded;
      break;
    }
    case "entities": {
      const raw = source[key];
      const decoded = _decodeArrayOfMessageEntity(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["entities"] = decoded;
      break;
    }
    case "link_preview_options": {
      const raw = source[key];
      const decoded = _decodeLinkPreviewOptions(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["linkPreviewOptions"] = decoded;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 1) return decodeFailure;
  return output as Types.InputTextMessageContent;
}

export function _decodeInputVenueMessageContent(input: unknown): Types.InputVenueMessageContent | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "latitude": {
      const raw = source[key];
      const decoded = _decodeFloat(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["latitude"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "longitude": {
      const raw = source[key];
      const decoded = _decodeFloat(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["longitude"] = decoded;
      }
      seen |= 2;
      break;
    }
    case "title": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["title"] = decoded;
      }
      seen |= 4;
      break;
    }
    case "address": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["address"] = decoded;
      }
      seen |= 8;
      break;
    }
    case "foursquare_id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["foursquareId"] = decoded;
      delete output["foursquare_id"];
      break;
    }
    case "foursquare_type": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["foursquareType"] = decoded;
      delete output["foursquare_type"];
      break;
    }
    case "google_place_id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["googlePlaceId"] = decoded;
      delete output["google_place_id"];
      break;
    }
    case "google_place_type": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["googlePlaceType"] = decoded;
      delete output["google_place_type"];
      break;
    }

    }
  }
  if (seen !== 15) return decodeFailure;
  return (output ?? source) as Types.InputVenueMessageContent;
}

export function _decodeInvoice(input: unknown): Types.Invoice | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "title": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["title"] = decoded;
      seen |= 1;
      break;
    }
    case "description": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["description"] = decoded;
      seen |= 2;
      break;
    }
    case "start_parameter": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["startParameter"] = decoded;
      seen |= 4;
      break;
    }
    case "currency": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["currency"] = decoded;
      seen |= 8;
      break;
    }
    case "total_amount": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["totalAmount"] = decoded;
      seen |= 16;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 31) return decodeFailure;
  return output as Types.Invoice;
}

export function _decodeKeyboardButton(input: unknown): Types.KeyboardButton | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "text": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["text"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "icon_custom_emoji_id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["iconCustomEmojiId"] = decoded;
      delete output["icon_custom_emoji_id"];
      break;
    }
    case "style": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["style"] = decoded;
      }
      break;
    }
    case "request_users": {
      const raw = source[key];
      const decoded = _decodeKeyboardButtonRequestUsers(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["requestUsers"] = decoded;
      delete output["request_users"];
      break;
    }
    case "request_chat": {
      const raw = source[key];
      const decoded = _decodeKeyboardButtonRequestChat(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["requestChat"] = decoded;
      delete output["request_chat"];
      break;
    }
    case "request_managed_bot": {
      const raw = source[key];
      const decoded = _decodeKeyboardButtonRequestManagedBot(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["requestManagedBot"] = decoded;
      delete output["request_managed_bot"];
      break;
    }
    case "request_contact": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["requestContact"] = decoded;
      delete output["request_contact"];
      break;
    }
    case "request_location": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["requestLocation"] = decoded;
      delete output["request_location"];
      break;
    }
    case "request_poll": {
      const raw = source[key];
      const decoded = _decodeKeyboardButtonPollType(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["requestPoll"] = decoded;
      delete output["request_poll"];
      break;
    }
    case "web_app": {
      const raw = source[key];
      const decoded = _decodeWebAppInfo(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["webApp"] = decoded;
      delete output["web_app"];
      break;
    }

    }
  }
  if (seen !== 1) return decodeFailure;
  return (output ?? source) as Types.KeyboardButton;
}

export function _decodeKeyboardButtonPollType(input: unknown): Types.KeyboardButtonPollType | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      break;
    }

    }
  }
  if (seen !== 0) return decodeFailure;
  return (output ?? source) as Types.KeyboardButtonPollType;
}

export function _decodeKeyboardButtonRequestChat(input: unknown): Types.KeyboardButtonRequestChat | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "request_id": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["requestId"] = decoded;
      seen |= 1;
      break;
    }
    case "chat_is_channel": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["chatIsChannel"] = decoded;
      seen |= 2;
      break;
    }
    case "chat_is_forum": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["chatIsForum"] = decoded;
      break;
    }
    case "chat_has_username": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["chatHasUsername"] = decoded;
      break;
    }
    case "chat_is_created": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["chatIsCreated"] = decoded;
      break;
    }
    case "user_administrator_rights": {
      const raw = source[key];
      const decoded = _decodeChatAdministratorRights(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["userAdministratorRights"] = decoded;
      break;
    }
    case "bot_administrator_rights": {
      const raw = source[key];
      const decoded = _decodeChatAdministratorRights(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["botAdministratorRights"] = decoded;
      break;
    }
    case "bot_is_member": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["botIsMember"] = decoded;
      break;
    }
    case "request_title": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["requestTitle"] = decoded;
      break;
    }
    case "request_username": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["requestUsername"] = decoded;
      break;
    }
    case "request_photo": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["requestPhoto"] = decoded;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 3) return decodeFailure;
  return output as Types.KeyboardButtonRequestChat;
}

export function _decodeKeyboardButtonRequestManagedBot(input: unknown): Types.KeyboardButtonRequestManagedBot | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "request_id": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["requestId"] = decoded;
      seen |= 1;
      break;
    }
    case "suggested_name": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["suggestedName"] = decoded;
      break;
    }
    case "suggested_username": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["suggestedUsername"] = decoded;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 1) return decodeFailure;
  return output as Types.KeyboardButtonRequestManagedBot;
}

export function _decodeKeyboardButtonRequestUsers(input: unknown): Types.KeyboardButtonRequestUsers | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "request_id": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["requestId"] = decoded;
      seen |= 1;
      break;
    }
    case "user_is_bot": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["userIsBot"] = decoded;
      break;
    }
    case "user_is_premium": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["userIsPremium"] = decoded;
      break;
    }
    case "max_quantity": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["maxQuantity"] = decoded;
      break;
    }
    case "request_name": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["requestName"] = decoded;
      break;
    }
    case "request_username": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["requestUsername"] = decoded;
      break;
    }
    case "request_photo": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["requestPhoto"] = decoded;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 1) return decodeFailure;
  return output as Types.KeyboardButtonRequestUsers;
}

export function _decodeLabeledPrice(input: unknown): Types.LabeledPrice | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "label": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["label"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "amount": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["amount"] = decoded;
      }
      seen |= 2;
      break;
    }

    }
  }
  if (seen !== 3) return decodeFailure;
  return (output ?? source) as Types.LabeledPrice;
}

export function _decodeLink(input: unknown): Types.Link | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "url": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["url"] = decoded;
      }
      seen |= 1;
      break;
    }

    }
  }
  if (seen !== 1) return decodeFailure;
  return (output ?? source) as Types.Link;
}

export function _decodeLinkPreviewOptions(input: unknown): Types.LinkPreviewOptions | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "is_disabled": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["isDisabled"] = decoded;
      delete output["is_disabled"];
      break;
    }
    case "url": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["url"] = decoded;
      }
      break;
    }
    case "prefer_small_media": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["preferSmallMedia"] = decoded;
      delete output["prefer_small_media"];
      break;
    }
    case "prefer_large_media": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["preferLargeMedia"] = decoded;
      delete output["prefer_large_media"];
      break;
    }
    case "show_above_text": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["showAboveText"] = decoded;
      delete output["show_above_text"];
      break;
    }

    }
  }
  if (seen !== 0) return decodeFailure;
  return (output ?? source) as Types.LinkPreviewOptions;
}

export function _decodeLivePhoto(input: unknown): Types.LivePhoto | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "photo": {
      const raw = source[key];
      const decoded = _decodeArrayOfPhotoSize(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["photo"] = decoded;
      break;
    }
    case "file_id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["fileId"] = decoded;
      seen |= 1;
      break;
    }
    case "file_unique_id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["fileUniqueId"] = decoded;
      seen |= 2;
      break;
    }
    case "width": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["width"] = decoded;
      seen |= 4;
      break;
    }
    case "height": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["height"] = decoded;
      seen |= 8;
      break;
    }
    case "duration": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["duration"] = decoded;
      seen |= 16;
      break;
    }
    case "mime_type": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["mimeType"] = decoded;
      break;
    }
    case "file_size": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["fileSize"] = decoded;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 31) return decodeFailure;
  return output as Types.LivePhoto;
}

export function _decodeLocation(input: unknown): Types.Location | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "latitude": {
      const raw = source[key];
      const decoded = _decodeFloat(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["latitude"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "longitude": {
      const raw = source[key];
      const decoded = _decodeFloat(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["longitude"] = decoded;
      }
      seen |= 2;
      break;
    }
    case "horizontal_accuracy": {
      const raw = source[key];
      const decoded = _decodeFloat(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["horizontalAccuracy"] = decoded;
      delete output["horizontal_accuracy"];
      break;
    }
    case "live_period": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["livePeriod"] = decoded;
      delete output["live_period"];
      break;
    }
    case "heading": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["heading"] = decoded;
      }
      break;
    }
    case "proximity_alert_radius": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["proximityAlertRadius"] = decoded;
      delete output["proximity_alert_radius"];
      break;
    }

    }
  }
  if (seen !== 3) return decodeFailure;
  return (output ?? source) as Types.Location;
}

export function _decodeLocationAddress(input: unknown): Types.LocationAddress | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "country_code": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["countryCode"] = decoded;
      seen |= 1;
      break;
    }
    case "state": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["state"] = decoded;
      break;
    }
    case "city": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["city"] = decoded;
      break;
    }
    case "street": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["street"] = decoded;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 1) return decodeFailure;
  return output as Types.LocationAddress;
}

export function _decodeLoginUrl(input: unknown): Types.LoginUrl | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "url": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["url"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "forward_text": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["forwardText"] = decoded;
      delete output["forward_text"];
      break;
    }
    case "bot_username": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["botUsername"] = decoded;
      delete output["bot_username"];
      break;
    }
    case "request_write_access": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["requestWriteAccess"] = decoded;
      delete output["request_write_access"];
      break;
    }

    }
  }
  if (seen !== 1) return decodeFailure;
  return (output ?? source) as Types.LoginUrl;
}

export function _decodeManagedBotCreated(input: unknown): Types.ManagedBotCreated | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "bot": {
      const raw = source[key];
      const decoded = _decodeUser(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["bot"] = decoded;
      }
      seen |= 1;
      break;
    }

    }
  }
  if (seen !== 1) return decodeFailure;
  return (output ?? source) as Types.ManagedBotCreated;
}

export function _decodeManagedBotUpdated(input: unknown): Types.ManagedBotUpdated | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "user": {
      const raw = source[key];
      const decoded = _decodeUser(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["user"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "bot": {
      const raw = source[key];
      const decoded = _decodeUser(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["bot"] = decoded;
      }
      seen |= 2;
      break;
    }

    }
  }
  if (seen !== 3) return decodeFailure;
  return (output ?? source) as Types.ManagedBotUpdated;
}

export function _decodeMaskPosition(input: unknown): Types.MaskPosition | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "point": {
      const raw = source[key];
      const decoded = _decodeMaskPositionPoint(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["point"] = decoded;
      seen |= 1;
      break;
    }
    case "x_shift": {
      const raw = source[key];
      const decoded = _decodeFloat(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["xShift"] = decoded;
      seen |= 2;
      break;
    }
    case "y_shift": {
      const raw = source[key];
      const decoded = _decodeFloat(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["yShift"] = decoded;
      seen |= 4;
      break;
    }
    case "scale": {
      const raw = source[key];
      const decoded = _decodeFloat(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["scale"] = decoded;
      seen |= 8;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 15) return decodeFailure;
  return output as Types.MaskPosition;
}

export function _decodeMaybeInaccessibleMessage(input: unknown): Types.MaybeInaccessibleMessage | typeof decodeFailure {
  const member0 = _decodeMessage(input);
  if (member0 !== decodeFailure) return member0;
  const member1 = _decodeInaccessibleMessage(input);
  if (member1 !== decodeFailure) return member1;
  return decodeFailure;
}

export function _decodeMenuButton(input: unknown): Types.MenuButton | typeof decodeFailure {
  const member0 = _decodeMenuButtonCommands(input);
  if (member0 !== decodeFailure) return member0;
  const member1 = _decodeMenuButtonWebApp(input);
  if (member1 !== decodeFailure) return member1;
  const member2 = _decodeMenuButtonDefault(input);
  if (member2 !== decodeFailure) return member2;
  return decodeFailure;
}

export function _decodeMenuButtonCommands(input: unknown): Types.MenuButtonCommands | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "commands" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      seen |= 1;
      break;
    }

    }
  }
  if (seen !== 1) return decodeFailure;
  return (output ?? source) as Types.MenuButtonCommands;
}

export function _decodeMenuButtonDefault(input: unknown): Types.MenuButtonDefault | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "default" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      seen |= 1;
      break;
    }

    }
  }
  if (seen !== 1) return decodeFailure;
  return (output ?? source) as Types.MenuButtonDefault;
}

export function _decodeMenuButtonWebApp(input: unknown): Types.MenuButtonWebApp | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "web_app" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      output["type"] = decoded;
      seen |= 1;
      break;
    }
    case "text": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["text"] = decoded;
      seen |= 2;
      break;
    }
    case "web_app": {
      const raw = source[key];
      const decoded = _decodeWebAppInfo(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["webApp"] = decoded;
      seen |= 4;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 7) return decodeFailure;
  return output as Types.MenuButtonWebApp;
}

export function _decodeMessage(input: unknown): Types.Message | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "message_id": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["messageId"] = decoded;
      seen |= 1;
      break;
    }
    case "message_thread_id": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["messageThreadId"] = decoded;
      break;
    }
    case "direct_messages_topic": {
      const raw = source[key];
      const decoded = _decodeDirectMessagesTopic(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["directMessagesTopic"] = decoded;
      break;
    }
    case "from": {
      const raw = source[key];
      const decoded = _decodeUser(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["from"] = decoded;
      break;
    }
    case "sender_chat": {
      const raw = source[key];
      const decoded = _decodeChat(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["senderChat"] = decoded;
      break;
    }
    case "sender_boost_count": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["senderBoostCount"] = decoded;
      break;
    }
    case "sender_business_bot": {
      const raw = source[key];
      const decoded = _decodeUser(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["senderBusinessBot"] = decoded;
      break;
    }
    case "sender_tag": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["senderTag"] = decoded;
      break;
    }
    case "receiver_user": {
      const raw = source[key];
      const decoded = _decodeUser(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["receiverUser"] = decoded;
      break;
    }
    case "ephemeral_message_id": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["ephemeralMessageId"] = decoded;
      break;
    }
    case "date": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["date"] = decoded;
      seen |= 2;
      break;
    }
    case "guest_query_id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["guestQueryId"] = decoded;
      break;
    }
    case "business_connection_id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["businessConnectionId"] = decoded;
      break;
    }
    case "chat": {
      const raw = source[key];
      const decoded = _decodeChat(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["chat"] = decoded;
      seen |= 4;
      break;
    }
    case "forward_origin": {
      const raw = source[key];
      const decoded = _decodeMessageOrigin(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["forwardOrigin"] = decoded;
      break;
    }
    case "is_topic_message": {
      const raw = source[key];
      const decoded = _decodeTrue(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["isTopicMessage"] = decoded;
      break;
    }
    case "is_automatic_forward": {
      const raw = source[key];
      const decoded = _decodeTrue(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["isAutomaticForward"] = decoded;
      break;
    }
    case "reply_to_message": {
      const raw = source[key];
      const decoded = _decodeMessage(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["replyToMessage"] = decoded;
      break;
    }
    case "external_reply": {
      const raw = source[key];
      const decoded = _decodeExternalReplyInfo(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["externalReply"] = decoded;
      break;
    }
    case "quote": {
      const raw = source[key];
      const decoded = _decodeTextQuote(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["quote"] = decoded;
      break;
    }
    case "reply_to_story": {
      const raw = source[key];
      const decoded = _decodeStory(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["replyToStory"] = decoded;
      break;
    }
    case "reply_to_checklist_task_id": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["replyToChecklistTaskId"] = decoded;
      break;
    }
    case "reply_to_poll_option_id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["replyToPollOptionId"] = decoded;
      break;
    }
    case "via_bot": {
      const raw = source[key];
      const decoded = _decodeUser(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["viaBot"] = decoded;
      break;
    }
    case "guest_bot_caller_user": {
      const raw = source[key];
      const decoded = _decodeUser(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["guestBotCallerUser"] = decoded;
      break;
    }
    case "guest_bot_caller_chat": {
      const raw = source[key];
      const decoded = _decodeChat(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["guestBotCallerChat"] = decoded;
      break;
    }
    case "edit_date": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["editDate"] = decoded;
      break;
    }
    case "has_protected_content": {
      const raw = source[key];
      const decoded = _decodeTrue(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["hasProtectedContent"] = decoded;
      break;
    }
    case "is_from_offline": {
      const raw = source[key];
      const decoded = _decodeTrue(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["isFromOffline"] = decoded;
      break;
    }
    case "is_paid_post": {
      const raw = source[key];
      const decoded = _decodeTrue(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["isPaidPost"] = decoded;
      break;
    }
    case "media_group_id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["mediaGroupId"] = decoded;
      break;
    }
    case "author_signature": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["authorSignature"] = decoded;
      break;
    }
    case "paid_star_count": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["paidStarCount"] = decoded;
      break;
    }
    case "text": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["text"] = decoded;
      break;
    }
    case "entities": {
      const raw = source[key];
      const decoded = _decodeArrayOfMessageEntity(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["entities"] = decoded;
      break;
    }
    case "link_preview_options": {
      const raw = source[key];
      const decoded = _decodeLinkPreviewOptions(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["linkPreviewOptions"] = decoded;
      break;
    }
    case "suggested_post_info": {
      const raw = source[key];
      const decoded = _decodeSuggestedPostInfo(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["suggestedPostInfo"] = decoded;
      break;
    }
    case "effect_id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["effectId"] = decoded;
      break;
    }
    case "rich_message": {
      const raw = source[key];
      const decoded = _decodeRichMessage(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["richMessage"] = decoded;
      break;
    }
    case "animation": {
      const raw = source[key];
      const decoded = _decodeAnimation(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["animation"] = decoded;
      break;
    }
    case "audio": {
      const raw = source[key];
      const decoded = _decodeAudio(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["audio"] = decoded;
      break;
    }
    case "document": {
      const raw = source[key];
      const decoded = _decodeDocument(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["document"] = decoded;
      break;
    }
    case "live_photo": {
      const raw = source[key];
      const decoded = _decodeLivePhoto(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["livePhoto"] = decoded;
      break;
    }
    case "paid_media": {
      const raw = source[key];
      const decoded = _decodePaidMediaInfo(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["paidMedia"] = decoded;
      break;
    }
    case "photo": {
      const raw = source[key];
      const decoded = _decodeArrayOfPhotoSize(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["photo"] = decoded;
      break;
    }
    case "sticker": {
      const raw = source[key];
      const decoded = _decodeSticker(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["sticker"] = decoded;
      break;
    }
    case "story": {
      const raw = source[key];
      const decoded = _decodeStory(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["story"] = decoded;
      break;
    }
    case "video": {
      const raw = source[key];
      const decoded = _decodeVideo(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["video"] = decoded;
      break;
    }
    case "video_note": {
      const raw = source[key];
      const decoded = _decodeVideoNote(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["videoNote"] = decoded;
      break;
    }
    case "voice": {
      const raw = source[key];
      const decoded = _decodeVoice(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["voice"] = decoded;
      break;
    }
    case "caption": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["caption"] = decoded;
      break;
    }
    case "caption_entities": {
      const raw = source[key];
      const decoded = _decodeArrayOfMessageEntity(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["captionEntities"] = decoded;
      break;
    }
    case "show_caption_above_media": {
      const raw = source[key];
      const decoded = _decodeTrue(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["showCaptionAboveMedia"] = decoded;
      break;
    }
    case "has_media_spoiler": {
      const raw = source[key];
      const decoded = _decodeTrue(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["hasMediaSpoiler"] = decoded;
      break;
    }
    case "checklist": {
      const raw = source[key];
      const decoded = _decodeChecklist(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["checklist"] = decoded;
      break;
    }
    case "contact": {
      const raw = source[key];
      const decoded = _decodeContact(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["contact"] = decoded;
      break;
    }
    case "dice": {
      const raw = source[key];
      const decoded = _decodeDice(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["dice"] = decoded;
      break;
    }
    case "game": {
      const raw = source[key];
      const decoded = _decodeGame(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["game"] = decoded;
      break;
    }
    case "poll": {
      const raw = source[key];
      const decoded = _decodePoll(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["poll"] = decoded;
      break;
    }
    case "venue": {
      const raw = source[key];
      const decoded = _decodeVenue(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["venue"] = decoded;
      break;
    }
    case "location": {
      const raw = source[key];
      const decoded = _decodeLocation(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["location"] = decoded;
      break;
    }
    case "new_chat_members": {
      const raw = source[key];
      const decoded = _decodeArrayOfUser(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["newChatMembers"] = decoded;
      break;
    }
    case "left_chat_member": {
      const raw = source[key];
      const decoded = _decodeUser(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["leftChatMember"] = decoded;
      break;
    }
    case "chat_owner_left": {
      const raw = source[key];
      const decoded = _decodeChatOwnerLeft(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["chatOwnerLeft"] = decoded;
      break;
    }
    case "chat_owner_changed": {
      const raw = source[key];
      const decoded = _decodeChatOwnerChanged(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["chatOwnerChanged"] = decoded;
      break;
    }
    case "new_chat_title": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["newChatTitle"] = decoded;
      break;
    }
    case "new_chat_photo": {
      const raw = source[key];
      const decoded = _decodeArrayOfPhotoSize(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["newChatPhoto"] = decoded;
      break;
    }
    case "delete_chat_photo": {
      const raw = source[key];
      const decoded = _decodeTrue(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["deleteChatPhoto"] = decoded;
      break;
    }
    case "group_chat_created": {
      const raw = source[key];
      const decoded = _decodeTrue(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["groupChatCreated"] = decoded;
      break;
    }
    case "supergroup_chat_created": {
      const raw = source[key];
      const decoded = _decodeTrue(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["supergroupChatCreated"] = decoded;
      break;
    }
    case "channel_chat_created": {
      const raw = source[key];
      const decoded = _decodeTrue(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["channelChatCreated"] = decoded;
      break;
    }
    case "message_auto_delete_timer_changed": {
      const raw = source[key];
      const decoded = _decodeMessageAutoDeleteTimerChanged(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["messageAutoDeleteTimerChanged"] = decoded;
      break;
    }
    case "migrate_to_chat_id": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["migrateToChatId"] = decoded;
      break;
    }
    case "migrate_from_chat_id": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["migrateFromChatId"] = decoded;
      break;
    }
    case "pinned_message": {
      const raw = source[key];
      const decoded = _decodeMaybeInaccessibleMessage(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["pinnedMessage"] = decoded;
      break;
    }
    case "invoice": {
      const raw = source[key];
      const decoded = _decodeInvoice(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["invoice"] = decoded;
      break;
    }
    case "successful_payment": {
      const raw = source[key];
      const decoded = _decodeSuccessfulPayment(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["successfulPayment"] = decoded;
      break;
    }
    case "refunded_payment": {
      const raw = source[key];
      const decoded = _decodeRefundedPayment(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["refundedPayment"] = decoded;
      break;
    }
    case "users_shared": {
      const raw = source[key];
      const decoded = _decodeUsersShared(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["usersShared"] = decoded;
      break;
    }
    case "chat_shared": {
      const raw = source[key];
      const decoded = _decodeChatShared(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["chatShared"] = decoded;
      break;
    }
    case "gift": {
      const raw = source[key];
      const decoded = _decodeGiftInfo(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["gift"] = decoded;
      break;
    }
    case "unique_gift": {
      const raw = source[key];
      const decoded = _decodeUniqueGiftInfo(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["uniqueGift"] = decoded;
      break;
    }
    case "gift_upgrade_sent": {
      const raw = source[key];
      const decoded = _decodeGiftInfo(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["giftUpgradeSent"] = decoded;
      break;
    }
    case "connected_website": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["connectedWebsite"] = decoded;
      break;
    }
    case "write_access_allowed": {
      const raw = source[key];
      const decoded = _decodeWriteAccessAllowed(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["writeAccessAllowed"] = decoded;
      break;
    }
    case "passport_data": {
      const raw = source[key];
      const decoded = _decodePassportData(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["passportData"] = decoded;
      break;
    }
    case "proximity_alert_triggered": {
      const raw = source[key];
      const decoded = _decodeProximityAlertTriggered(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["proximityAlertTriggered"] = decoded;
      break;
    }
    case "boost_added": {
      const raw = source[key];
      const decoded = _decodeChatBoostAdded(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["boostAdded"] = decoded;
      break;
    }
    case "chat_background_set": {
      const raw = source[key];
      const decoded = _decodeChatBackground(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["chatBackgroundSet"] = decoded;
      break;
    }
    case "checklist_tasks_done": {
      const raw = source[key];
      const decoded = _decodeChecklistTasksDone(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["checklistTasksDone"] = decoded;
      break;
    }
    case "checklist_tasks_added": {
      const raw = source[key];
      const decoded = _decodeChecklistTasksAdded(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["checklistTasksAdded"] = decoded;
      break;
    }
    case "community_chat_added": {
      const raw = source[key];
      const decoded = _decodeCommunityChatAdded(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["communityChatAdded"] = decoded;
      break;
    }
    case "community_chat_joined": {
      const raw = source[key];
      const decoded = _decodeCommunityChatJoined(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["communityChatJoined"] = decoded;
      break;
    }
    case "community_chat_removed": {
      const raw = source[key];
      const decoded = _decodeCommunityChatRemoved(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["communityChatRemoved"] = decoded;
      break;
    }
    case "direct_message_price_changed": {
      const raw = source[key];
      const decoded = _decodeDirectMessagePriceChanged(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["directMessagePriceChanged"] = decoded;
      break;
    }
    case "forum_topic_created": {
      const raw = source[key];
      const decoded = _decodeForumTopicCreated(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["forumTopicCreated"] = decoded;
      break;
    }
    case "forum_topic_edited": {
      const raw = source[key];
      const decoded = _decodeForumTopicEdited(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["forumTopicEdited"] = decoded;
      break;
    }
    case "forum_topic_closed": {
      const raw = source[key];
      const decoded = _decodeForumTopicClosed(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["forumTopicClosed"] = decoded;
      break;
    }
    case "forum_topic_reopened": {
      const raw = source[key];
      const decoded = _decodeForumTopicReopened(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["forumTopicReopened"] = decoded;
      break;
    }
    case "general_forum_topic_hidden": {
      const raw = source[key];
      const decoded = _decodeGeneralForumTopicHidden(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["generalForumTopicHidden"] = decoded;
      break;
    }
    case "general_forum_topic_unhidden": {
      const raw = source[key];
      const decoded = _decodeGeneralForumTopicUnhidden(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["generalForumTopicUnhidden"] = decoded;
      break;
    }
    case "giveaway_created": {
      const raw = source[key];
      const decoded = _decodeGiveawayCreated(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["giveawayCreated"] = decoded;
      break;
    }
    case "giveaway": {
      const raw = source[key];
      const decoded = _decodeGiveaway(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["giveaway"] = decoded;
      break;
    }
    case "giveaway_winners": {
      const raw = source[key];
      const decoded = _decodeGiveawayWinners(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["giveawayWinners"] = decoded;
      break;
    }
    case "giveaway_completed": {
      const raw = source[key];
      const decoded = _decodeGiveawayCompleted(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["giveawayCompleted"] = decoded;
      break;
    }
    case "managed_bot_created": {
      const raw = source[key];
      const decoded = _decodeManagedBotCreated(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["managedBotCreated"] = decoded;
      break;
    }
    case "paid_message_price_changed": {
      const raw = source[key];
      const decoded = _decodePaidMessagePriceChanged(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["paidMessagePriceChanged"] = decoded;
      break;
    }
    case "poll_option_added": {
      const raw = source[key];
      const decoded = _decodePollOptionAdded(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["pollOptionAdded"] = decoded;
      break;
    }
    case "poll_option_deleted": {
      const raw = source[key];
      const decoded = _decodePollOptionDeleted(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["pollOptionDeleted"] = decoded;
      break;
    }
    case "suggested_post_approved": {
      const raw = source[key];
      const decoded = _decodeSuggestedPostApproved(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["suggestedPostApproved"] = decoded;
      break;
    }
    case "suggested_post_approval_failed": {
      const raw = source[key];
      const decoded = _decodeSuggestedPostApprovalFailed(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["suggestedPostApprovalFailed"] = decoded;
      break;
    }
    case "suggested_post_declined": {
      const raw = source[key];
      const decoded = _decodeSuggestedPostDeclined(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["suggestedPostDeclined"] = decoded;
      break;
    }
    case "suggested_post_paid": {
      const raw = source[key];
      const decoded = _decodeSuggestedPostPaid(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["suggestedPostPaid"] = decoded;
      break;
    }
    case "suggested_post_refunded": {
      const raw = source[key];
      const decoded = _decodeSuggestedPostRefunded(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["suggestedPostRefunded"] = decoded;
      break;
    }
    case "video_chat_scheduled": {
      const raw = source[key];
      const decoded = _decodeVideoChatScheduled(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["videoChatScheduled"] = decoded;
      break;
    }
    case "video_chat_started": {
      const raw = source[key];
      const decoded = _decodeVideoChatStarted(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["videoChatStarted"] = decoded;
      break;
    }
    case "video_chat_ended": {
      const raw = source[key];
      const decoded = _decodeVideoChatEnded(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["videoChatEnded"] = decoded;
      break;
    }
    case "video_chat_participants_invited": {
      const raw = source[key];
      const decoded = _decodeVideoChatParticipantsInvited(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["videoChatParticipantsInvited"] = decoded;
      break;
    }
    case "web_app_data": {
      const raw = source[key];
      const decoded = _decodeWebAppData(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["webAppData"] = decoded;
      break;
    }
    case "reply_markup": {
      const raw = source[key];
      const decoded = _decodeInlineKeyboardMarkup(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["replyMarkup"] = decoded;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 7) return decodeFailure;
  return output as Types.Message;
}

export function _decodeMessageAutoDeleteTimerChanged(input: unknown): Types.MessageAutoDeleteTimerChanged | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "message_auto_delete_time": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["messageAutoDeleteTime"] = decoded;
      seen |= 1;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 1) return decodeFailure;
  return output as Types.MessageAutoDeleteTimerChanged;
}

export function _decodeMessageEntity(input: unknown): Types.MessageEntity | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = _decodeMessageEntityType(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "offset": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["offset"] = decoded;
      }
      seen |= 2;
      break;
    }
    case "length": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["length"] = decoded;
      }
      seen |= 4;
      break;
    }
    case "url": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["url"] = decoded;
      }
      break;
    }
    case "user": {
      const raw = source[key];
      const decoded = _decodeUser(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["user"] = decoded;
      }
      break;
    }
    case "language": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["language"] = decoded;
      }
      break;
    }
    case "custom_emoji_id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["customEmojiId"] = decoded;
      delete output["custom_emoji_id"];
      break;
    }
    case "unix_time": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["unixTime"] = decoded;
      delete output["unix_time"];
      break;
    }
    case "date_time_format": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["dateTimeFormat"] = decoded;
      delete output["date_time_format"];
      break;
    }

    }
  }
  if (seen !== 7) return decodeFailure;
  return (output ?? source) as Types.MessageEntity;
}

export function _decodeMessageGenerationStopped(input: unknown): Types.MessageGenerationStopped | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "chat": {
      const raw = source[key];
      const decoded = _decodeChat(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["chat"] = decoded;
      seen |= 1;
      break;
    }
    case "message_thread_id": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["messageThreadId"] = decoded;
      break;
    }
    case "draft_id": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["draftId"] = decoded;
      seen |= 2;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 3) return decodeFailure;
  return output as Types.MessageGenerationStopped;
}

export function _decodeMessageId(input: unknown): Types.MessageId | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "message_id": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["messageId"] = decoded;
      seen |= 1;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 1) return decodeFailure;
  return output as Types.MessageId;
}

export function _decodeMessageOrigin(input: unknown): Types.MessageOrigin | typeof decodeFailure {
  const member0 = _decodeMessageOriginUser(input);
  if (member0 !== decodeFailure) return member0;
  const member1 = _decodeMessageOriginHiddenUser(input);
  if (member1 !== decodeFailure) return member1;
  const member2 = _decodeMessageOriginChat(input);
  if (member2 !== decodeFailure) return member2;
  const member3 = _decodeMessageOriginChannel(input);
  if (member3 !== decodeFailure) return member3;
  return decodeFailure;
}

export function _decodeMessageOriginChannel(input: unknown): Types.MessageOriginChannel | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "channel" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      output["type"] = decoded;
      seen |= 1;
      break;
    }
    case "date": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["date"] = decoded;
      seen |= 2;
      break;
    }
    case "chat": {
      const raw = source[key];
      const decoded = _decodeChat(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["chat"] = decoded;
      seen |= 4;
      break;
    }
    case "message_id": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["messageId"] = decoded;
      seen |= 8;
      break;
    }
    case "author_signature": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["authorSignature"] = decoded;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 15) return decodeFailure;
  return output as Types.MessageOriginChannel;
}

export function _decodeMessageOriginChat(input: unknown): Types.MessageOriginChat | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "chat" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      output["type"] = decoded;
      seen |= 1;
      break;
    }
    case "date": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["date"] = decoded;
      seen |= 2;
      break;
    }
    case "sender_chat": {
      const raw = source[key];
      const decoded = _decodeChat(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["senderChat"] = decoded;
      seen |= 4;
      break;
    }
    case "author_signature": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["authorSignature"] = decoded;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 7) return decodeFailure;
  return output as Types.MessageOriginChat;
}

export function _decodeMessageOriginHiddenUser(input: unknown): Types.MessageOriginHiddenUser | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "hidden_user" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      output["type"] = decoded;
      seen |= 1;
      break;
    }
    case "date": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["date"] = decoded;
      seen |= 2;
      break;
    }
    case "sender_user_name": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["senderUserName"] = decoded;
      seen |= 4;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 7) return decodeFailure;
  return output as Types.MessageOriginHiddenUser;
}

export function _decodeMessageOriginUser(input: unknown): Types.MessageOriginUser | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "user" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      output["type"] = decoded;
      seen |= 1;
      break;
    }
    case "date": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["date"] = decoded;
      seen |= 2;
      break;
    }
    case "sender_user": {
      const raw = source[key];
      const decoded = _decodeUser(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["senderUser"] = decoded;
      seen |= 4;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 7) return decodeFailure;
  return output as Types.MessageOriginUser;
}

export function _decodeMessageReactionCountUpdated(input: unknown): Types.MessageReactionCountUpdated | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "chat": {
      const raw = source[key];
      const decoded = _decodeChat(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["chat"] = decoded;
      seen |= 1;
      break;
    }
    case "message_id": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["messageId"] = decoded;
      seen |= 2;
      break;
    }
    case "date": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["date"] = decoded;
      seen |= 4;
      break;
    }
    case "reactions": {
      const raw = source[key];
      const decoded = _decodeArrayOfReactionCount(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["reactions"] = decoded;
      seen |= 8;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 15) return decodeFailure;
  return output as Types.MessageReactionCountUpdated;
}

export function _decodeMessageReactionUpdated(input: unknown): Types.MessageReactionUpdated | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "chat": {
      const raw = source[key];
      const decoded = _decodeChat(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["chat"] = decoded;
      seen |= 1;
      break;
    }
    case "message_id": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["messageId"] = decoded;
      seen |= 2;
      break;
    }
    case "user": {
      const raw = source[key];
      const decoded = _decodeUser(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["user"] = decoded;
      break;
    }
    case "actor_chat": {
      const raw = source[key];
      const decoded = _decodeChat(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["actorChat"] = decoded;
      break;
    }
    case "date": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["date"] = decoded;
      seen |= 4;
      break;
    }
    case "old_reaction": {
      const raw = source[key];
      const decoded = _decodeArrayOfReactionType(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["oldReaction"] = decoded;
      seen |= 8;
      break;
    }
    case "new_reaction": {
      const raw = source[key];
      const decoded = _decodeArrayOfReactionType(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["newReaction"] = decoded;
      seen |= 16;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 31) return decodeFailure;
  return output as Types.MessageReactionUpdated;
}

export function _decodeOrderInfo(input: unknown): Types.OrderInfo | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "name": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["name"] = decoded;
      }
      break;
    }
    case "phone_number": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["phoneNumber"] = decoded;
      delete output["phone_number"];
      break;
    }
    case "email": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["email"] = decoded;
      }
      break;
    }
    case "shipping_address": {
      const raw = source[key];
      const decoded = _decodeShippingAddress(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["shippingAddress"] = decoded;
      delete output["shipping_address"];
      break;
    }

    }
  }
  if (seen !== 0) return decodeFailure;
  return (output ?? source) as Types.OrderInfo;
}

export function _decodeOwnedGift(input: unknown): Types.OwnedGift | typeof decodeFailure {
  const member0 = _decodeOwnedGiftRegular(input);
  if (member0 !== decodeFailure) return member0;
  const member1 = _decodeOwnedGiftUnique(input);
  if (member1 !== decodeFailure) return member1;
  return decodeFailure;
}

export function _decodeOwnedGiftRegular(input: unknown): Types.OwnedGiftRegular | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "regular" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      output["type"] = decoded;
      seen |= 1;
      break;
    }
    case "gift": {
      const raw = source[key];
      const decoded = _decodeGift(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["gift"] = decoded;
      seen |= 2;
      break;
    }
    case "owned_gift_id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["ownedGiftId"] = decoded;
      break;
    }
    case "sender_user": {
      const raw = source[key];
      const decoded = _decodeUser(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["senderUser"] = decoded;
      break;
    }
    case "send_date": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["sendDate"] = decoded;
      seen |= 4;
      break;
    }
    case "text": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["text"] = decoded;
      break;
    }
    case "entities": {
      const raw = source[key];
      const decoded = _decodeArrayOfMessageEntity(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["entities"] = decoded;
      break;
    }
    case "is_private": {
      const raw = source[key];
      const decoded = _decodeTrue(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["isPrivate"] = decoded;
      break;
    }
    case "is_saved": {
      const raw = source[key];
      const decoded = _decodeTrue(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["isSaved"] = decoded;
      break;
    }
    case "can_be_upgraded": {
      const raw = source[key];
      const decoded = _decodeTrue(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["canBeUpgraded"] = decoded;
      break;
    }
    case "was_refunded": {
      const raw = source[key];
      const decoded = _decodeTrue(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["wasRefunded"] = decoded;
      break;
    }
    case "convert_star_count": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["convertStarCount"] = decoded;
      break;
    }
    case "prepaid_upgrade_star_count": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["prepaidUpgradeStarCount"] = decoded;
      break;
    }
    case "is_upgrade_separate": {
      const raw = source[key];
      const decoded = _decodeTrue(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["isUpgradeSeparate"] = decoded;
      break;
    }
    case "unique_gift_number": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["uniqueGiftNumber"] = decoded;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 7) return decodeFailure;
  return output as Types.OwnedGiftRegular;
}

export function _decodeOwnedGifts(input: unknown): Types.OwnedGifts | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "total_count": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["totalCount"] = decoded;
      seen |= 1;
      break;
    }
    case "gifts": {
      const raw = source[key];
      const decoded = _decodeArrayOfOwnedGift(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["gifts"] = decoded;
      seen |= 2;
      break;
    }
    case "next_offset": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["nextOffset"] = decoded;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 3) return decodeFailure;
  return output as Types.OwnedGifts;
}

export function _decodeOwnedGiftUnique(input: unknown): Types.OwnedGiftUnique | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "unique" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      output["type"] = decoded;
      seen |= 1;
      break;
    }
    case "gift": {
      const raw = source[key];
      const decoded = _decodeUniqueGift(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["gift"] = decoded;
      seen |= 2;
      break;
    }
    case "owned_gift_id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["ownedGiftId"] = decoded;
      break;
    }
    case "sender_user": {
      const raw = source[key];
      const decoded = _decodeUser(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["senderUser"] = decoded;
      break;
    }
    case "send_date": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["sendDate"] = decoded;
      seen |= 4;
      break;
    }
    case "is_saved": {
      const raw = source[key];
      const decoded = _decodeTrue(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["isSaved"] = decoded;
      break;
    }
    case "can_be_transferred": {
      const raw = source[key];
      const decoded = _decodeTrue(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["canBeTransferred"] = decoded;
      break;
    }
    case "transfer_star_count": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["transferStarCount"] = decoded;
      break;
    }
    case "next_transfer_date": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["nextTransferDate"] = decoded;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 7) return decodeFailure;
  return output as Types.OwnedGiftUnique;
}

export function _decodePaidMedia(input: unknown): Types.PaidMedia | typeof decodeFailure {
  const member0 = _decodePaidMediaLivePhoto(input);
  if (member0 !== decodeFailure) return member0;
  const member1 = _decodePaidMediaPhoto(input);
  if (member1 !== decodeFailure) return member1;
  const member2 = _decodePaidMediaPreview(input);
  if (member2 !== decodeFailure) return member2;
  const member3 = _decodePaidMediaVideo(input);
  if (member3 !== decodeFailure) return member3;
  return decodeFailure;
}

export function _decodePaidMediaInfo(input: unknown): Types.PaidMediaInfo | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "star_count": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["starCount"] = decoded;
      seen |= 1;
      break;
    }
    case "paid_media": {
      const raw = source[key];
      const decoded = _decodeArrayOfPaidMedia(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["paidMedia"] = decoded;
      seen |= 2;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 3) return decodeFailure;
  return output as Types.PaidMediaInfo;
}

export function _decodePaidMediaLivePhoto(input: unknown): Types.PaidMediaLivePhoto | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "live_photo" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      output["type"] = decoded;
      seen |= 1;
      break;
    }
    case "live_photo": {
      const raw = source[key];
      const decoded = _decodeLivePhoto(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["livePhoto"] = decoded;
      seen |= 2;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 3) return decodeFailure;
  return output as Types.PaidMediaLivePhoto;
}

export function _decodePaidMediaPhoto(input: unknown): Types.PaidMediaPhoto | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "photo" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "photo": {
      const raw = source[key];
      const decoded = _decodeArrayOfPhotoSize(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["photo"] = decoded;
      }
      seen |= 2;
      break;
    }

    }
  }
  if (seen !== 3) return decodeFailure;
  return (output ?? source) as Types.PaidMediaPhoto;
}

export function _decodePaidMediaPreview(input: unknown): Types.PaidMediaPreview | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "preview" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "width": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["width"] = decoded;
      }
      break;
    }
    case "height": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["height"] = decoded;
      }
      break;
    }
    case "duration": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["duration"] = decoded;
      }
      break;
    }

    }
  }
  if (seen !== 1) return decodeFailure;
  return (output ?? source) as Types.PaidMediaPreview;
}

export function _decodePaidMediaPurchased(input: unknown): Types.PaidMediaPurchased | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "from": {
      const raw = source[key];
      const decoded = _decodeUser(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["from"] = decoded;
      seen |= 1;
      break;
    }
    case "paid_media_payload": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["paidMediaPayload"] = decoded;
      seen |= 2;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 3) return decodeFailure;
  return output as Types.PaidMediaPurchased;
}

export function _decodePaidMediaVideo(input: unknown): Types.PaidMediaVideo | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "video" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "video": {
      const raw = source[key];
      const decoded = _decodeVideo(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["video"] = decoded;
      }
      seen |= 2;
      break;
    }

    }
  }
  if (seen !== 3) return decodeFailure;
  return (output ?? source) as Types.PaidMediaVideo;
}

export function _decodePaidMessagePriceChanged(input: unknown): Types.PaidMessagePriceChanged | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "paid_message_star_count": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["paidMessageStarCount"] = decoded;
      seen |= 1;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 1) return decodeFailure;
  return output as Types.PaidMessagePriceChanged;
}

export function _decodePassportData(input: unknown): Types.PassportData | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "data": {
      const raw = source[key];
      const decoded = _decodeArrayOfEncryptedPassportElement(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["data"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "credentials": {
      const raw = source[key];
      const decoded = _decodeEncryptedCredentials(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["credentials"] = decoded;
      }
      seen |= 2;
      break;
    }

    }
  }
  if (seen !== 3) return decodeFailure;
  return (output ?? source) as Types.PassportData;
}

export function _decodePassportElementError(input: unknown): Types.PassportElementError | typeof decodeFailure {
  const member0 = _decodePassportElementErrorDataField(input);
  if (member0 !== decodeFailure) return member0;
  const member1 = _decodePassportElementErrorFrontSide(input);
  if (member1 !== decodeFailure) return member1;
  const member2 = _decodePassportElementErrorReverseSide(input);
  if (member2 !== decodeFailure) return member2;
  const member3 = _decodePassportElementErrorSelfie(input);
  if (member3 !== decodeFailure) return member3;
  const member4 = _decodePassportElementErrorFile(input);
  if (member4 !== decodeFailure) return member4;
  const member5 = _decodePassportElementErrorFiles(input);
  if (member5 !== decodeFailure) return member5;
  const member6 = _decodePassportElementErrorTranslationFile(input);
  if (member6 !== decodeFailure) return member6;
  const member7 = _decodePassportElementErrorTranslationFiles(input);
  if (member7 !== decodeFailure) return member7;
  const member8 = _decodePassportElementErrorUnspecified(input);
  if (member8 !== decodeFailure) return member8;
  return decodeFailure;
}

export function _decodePassportElementErrorDataField(input: unknown): Types.PassportElementErrorDataField | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "source": {
      const raw = source[key];
      const decoded = raw === "data" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      output["source"] = decoded;
      seen |= 1;
      break;
    }
    case "type": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["type"] = decoded;
      seen |= 2;
      break;
    }
    case "field_name": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["fieldName"] = decoded;
      seen |= 4;
      break;
    }
    case "data_hash": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["dataHash"] = decoded;
      seen |= 8;
      break;
    }
    case "message": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["message"] = decoded;
      seen |= 16;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 31) return decodeFailure;
  return output as Types.PassportElementErrorDataField;
}

export function _decodePassportElementErrorFile(input: unknown): Types.PassportElementErrorFile | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "source": {
      const raw = source[key];
      const decoded = raw === "file" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      output["source"] = decoded;
      seen |= 1;
      break;
    }
    case "type": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["type"] = decoded;
      seen |= 2;
      break;
    }
    case "file_hash": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["fileHash"] = decoded;
      seen |= 4;
      break;
    }
    case "message": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["message"] = decoded;
      seen |= 8;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 15) return decodeFailure;
  return output as Types.PassportElementErrorFile;
}

export function _decodePassportElementErrorFiles(input: unknown): Types.PassportElementErrorFiles | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "source": {
      const raw = source[key];
      const decoded = raw === "files" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      output["source"] = decoded;
      seen |= 1;
      break;
    }
    case "type": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["type"] = decoded;
      seen |= 2;
      break;
    }
    case "file_hashes": {
      const raw = source[key];
      const decoded = _decodeArrayOfString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["fileHashes"] = decoded;
      seen |= 4;
      break;
    }
    case "message": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["message"] = decoded;
      seen |= 8;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 15) return decodeFailure;
  return output as Types.PassportElementErrorFiles;
}

export function _decodePassportElementErrorFrontSide(input: unknown): Types.PassportElementErrorFrontSide | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "source": {
      const raw = source[key];
      const decoded = raw === "front_side" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      output["source"] = decoded;
      seen |= 1;
      break;
    }
    case "type": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["type"] = decoded;
      seen |= 2;
      break;
    }
    case "file_hash": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["fileHash"] = decoded;
      seen |= 4;
      break;
    }
    case "message": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["message"] = decoded;
      seen |= 8;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 15) return decodeFailure;
  return output as Types.PassportElementErrorFrontSide;
}

export function _decodePassportElementErrorReverseSide(input: unknown): Types.PassportElementErrorReverseSide | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "source": {
      const raw = source[key];
      const decoded = raw === "reverse_side" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      output["source"] = decoded;
      seen |= 1;
      break;
    }
    case "type": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["type"] = decoded;
      seen |= 2;
      break;
    }
    case "file_hash": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["fileHash"] = decoded;
      seen |= 4;
      break;
    }
    case "message": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["message"] = decoded;
      seen |= 8;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 15) return decodeFailure;
  return output as Types.PassportElementErrorReverseSide;
}

export function _decodePassportElementErrorSelfie(input: unknown): Types.PassportElementErrorSelfie | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "source": {
      const raw = source[key];
      const decoded = raw === "selfie" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      output["source"] = decoded;
      seen |= 1;
      break;
    }
    case "type": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["type"] = decoded;
      seen |= 2;
      break;
    }
    case "file_hash": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["fileHash"] = decoded;
      seen |= 4;
      break;
    }
    case "message": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["message"] = decoded;
      seen |= 8;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 15) return decodeFailure;
  return output as Types.PassportElementErrorSelfie;
}

export function _decodePassportElementErrorTranslationFile(input: unknown): Types.PassportElementErrorTranslationFile | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "source": {
      const raw = source[key];
      const decoded = raw === "translation_file" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      output["source"] = decoded;
      seen |= 1;
      break;
    }
    case "type": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["type"] = decoded;
      seen |= 2;
      break;
    }
    case "file_hash": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["fileHash"] = decoded;
      seen |= 4;
      break;
    }
    case "message": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["message"] = decoded;
      seen |= 8;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 15) return decodeFailure;
  return output as Types.PassportElementErrorTranslationFile;
}

export function _decodePassportElementErrorTranslationFiles(input: unknown): Types.PassportElementErrorTranslationFiles | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "source": {
      const raw = source[key];
      const decoded = raw === "translation_files" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      output["source"] = decoded;
      seen |= 1;
      break;
    }
    case "type": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["type"] = decoded;
      seen |= 2;
      break;
    }
    case "file_hashes": {
      const raw = source[key];
      const decoded = _decodeArrayOfString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["fileHashes"] = decoded;
      seen |= 4;
      break;
    }
    case "message": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["message"] = decoded;
      seen |= 8;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 15) return decodeFailure;
  return output as Types.PassportElementErrorTranslationFiles;
}

export function _decodePassportElementErrorUnspecified(input: unknown): Types.PassportElementErrorUnspecified | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "source": {
      const raw = source[key];
      const decoded = raw === "unspecified" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      output["source"] = decoded;
      seen |= 1;
      break;
    }
    case "type": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["type"] = decoded;
      seen |= 2;
      break;
    }
    case "element_hash": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["elementHash"] = decoded;
      seen |= 4;
      break;
    }
    case "message": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["message"] = decoded;
      seen |= 8;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 15) return decodeFailure;
  return output as Types.PassportElementErrorUnspecified;
}

export function _decodePassportFile(input: unknown): Types.PassportFile | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "file_id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["fileId"] = decoded;
      seen |= 1;
      break;
    }
    case "file_unique_id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["fileUniqueId"] = decoded;
      seen |= 2;
      break;
    }
    case "file_size": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["fileSize"] = decoded;
      seen |= 4;
      break;
    }
    case "file_date": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["fileDate"] = decoded;
      seen |= 8;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 15) return decodeFailure;
  return output as Types.PassportFile;
}

export function _decodePhotoSize(input: unknown): Types.PhotoSize | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "file_id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["fileId"] = decoded;
      seen |= 1;
      break;
    }
    case "file_unique_id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["fileUniqueId"] = decoded;
      seen |= 2;
      break;
    }
    case "width": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["width"] = decoded;
      seen |= 4;
      break;
    }
    case "height": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["height"] = decoded;
      seen |= 8;
      break;
    }
    case "file_size": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["fileSize"] = decoded;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 15) return decodeFailure;
  return output as Types.PhotoSize;
}

export function _decodePoll(input: unknown): Types.Poll | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["id"] = decoded;
      seen |= 1;
      break;
    }
    case "question": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["question"] = decoded;
      seen |= 2;
      break;
    }
    case "question_entities": {
      const raw = source[key];
      const decoded = _decodeArrayOfMessageEntity(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["questionEntities"] = decoded;
      break;
    }
    case "options": {
      const raw = source[key];
      const decoded = _decodeArrayOfPollOption(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["options"] = decoded;
      seen |= 4;
      break;
    }
    case "total_voter_count": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["totalVoterCount"] = decoded;
      seen |= 8;
      break;
    }
    case "is_closed": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["isClosed"] = decoded;
      seen |= 16;
      break;
    }
    case "is_anonymous": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["isAnonymous"] = decoded;
      seen |= 32;
      break;
    }
    case "type": {
      const raw = source[key];
      const decoded = _decodePollType(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["type"] = decoded;
      seen |= 64;
      break;
    }
    case "allows_multiple_answers": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["allowsMultipleAnswers"] = decoded;
      seen |= 128;
      break;
    }
    case "allows_revoting": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["allowsRevoting"] = decoded;
      seen |= 256;
      break;
    }
    case "members_only": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["membersOnly"] = decoded;
      seen |= 512;
      break;
    }
    case "country_codes": {
      const raw = source[key];
      const decoded = _decodeArrayOfString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["countryCodes"] = decoded;
      break;
    }
    case "correct_option_ids": {
      const raw = source[key];
      const decoded = _decodeArrayOfInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["correctOptionIds"] = decoded;
      break;
    }
    case "explanation": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["explanation"] = decoded;
      break;
    }
    case "explanation_entities": {
      const raw = source[key];
      const decoded = _decodeArrayOfMessageEntity(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["explanationEntities"] = decoded;
      break;
    }
    case "explanation_media": {
      const raw = source[key];
      const decoded = _decodePollMedia(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["explanationMedia"] = decoded;
      break;
    }
    case "open_period": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["openPeriod"] = decoded;
      break;
    }
    case "close_date": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["closeDate"] = decoded;
      break;
    }
    case "description": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["description"] = decoded;
      break;
    }
    case "description_entities": {
      const raw = source[key];
      const decoded = _decodeArrayOfMessageEntity(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["descriptionEntities"] = decoded;
      break;
    }
    case "media": {
      const raw = source[key];
      const decoded = _decodePollMedia(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["media"] = decoded;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 1023) return decodeFailure;
  return output as Types.Poll;
}

export function _decodePollAnswer(input: unknown): Types.PollAnswer | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "poll_id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["pollId"] = decoded;
      seen |= 1;
      break;
    }
    case "voter_chat": {
      const raw = source[key];
      const decoded = _decodeChat(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["voterChat"] = decoded;
      break;
    }
    case "user": {
      const raw = source[key];
      const decoded = _decodeUser(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["user"] = decoded;
      break;
    }
    case "option_ids": {
      const raw = source[key];
      const decoded = _decodeArrayOfInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["optionIds"] = decoded;
      seen |= 2;
      break;
    }
    case "option_persistent_ids": {
      const raw = source[key];
      const decoded = _decodeArrayOfString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["optionPersistentIds"] = decoded;
      seen |= 4;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 7) return decodeFailure;
  return output as Types.PollAnswer;
}

export function _decodePollMedia(input: unknown): Types.PollMedia | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "animation": {
      const raw = source[key];
      const decoded = _decodeAnimation(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["animation"] = decoded;
      }
      break;
    }
    case "audio": {
      const raw = source[key];
      const decoded = _decodeAudio(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["audio"] = decoded;
      }
      break;
    }
    case "document": {
      const raw = source[key];
      const decoded = _decodeDocument(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["document"] = decoded;
      }
      break;
    }
    case "link": {
      const raw = source[key];
      const decoded = _decodeLink(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["link"] = decoded;
      }
      break;
    }
    case "live_photo": {
      const raw = source[key];
      const decoded = _decodeLivePhoto(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["livePhoto"] = decoded;
      delete output["live_photo"];
      break;
    }
    case "location": {
      const raw = source[key];
      const decoded = _decodeLocation(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["location"] = decoded;
      }
      break;
    }
    case "photo": {
      const raw = source[key];
      const decoded = _decodeArrayOfPhotoSize(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["photo"] = decoded;
      }
      break;
    }
    case "sticker": {
      const raw = source[key];
      const decoded = _decodeSticker(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["sticker"] = decoded;
      }
      break;
    }
    case "venue": {
      const raw = source[key];
      const decoded = _decodeVenue(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["venue"] = decoded;
      }
      break;
    }
    case "video": {
      const raw = source[key];
      const decoded = _decodeVideo(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["video"] = decoded;
      }
      break;
    }

    }
  }
  if (seen !== 0) return decodeFailure;
  return (output ?? source) as Types.PollMedia;
}

export function _decodePollOption(input: unknown): Types.PollOption | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "persistent_id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["persistentId"] = decoded;
      seen |= 1;
      break;
    }
    case "text": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["text"] = decoded;
      seen |= 2;
      break;
    }
    case "text_entities": {
      const raw = source[key];
      const decoded = _decodeArrayOfMessageEntity(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["textEntities"] = decoded;
      break;
    }
    case "media": {
      const raw = source[key];
      const decoded = _decodePollMedia(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["media"] = decoded;
      break;
    }
    case "voter_count": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["voterCount"] = decoded;
      seen |= 4;
      break;
    }
    case "added_by_user": {
      const raw = source[key];
      const decoded = _decodeUser(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["addedByUser"] = decoded;
      break;
    }
    case "added_by_chat": {
      const raw = source[key];
      const decoded = _decodeChat(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["addedByChat"] = decoded;
      break;
    }
    case "addition_date": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["additionDate"] = decoded;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 7) return decodeFailure;
  return output as Types.PollOption;
}

export function _decodePollOptionAdded(input: unknown): Types.PollOptionAdded | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "poll_message": {
      const raw = source[key];
      const decoded = _decodeMaybeInaccessibleMessage(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["pollMessage"] = decoded;
      break;
    }
    case "option_persistent_id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["optionPersistentId"] = decoded;
      seen |= 1;
      break;
    }
    case "option_text": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["optionText"] = decoded;
      seen |= 2;
      break;
    }
    case "option_text_entities": {
      const raw = source[key];
      const decoded = _decodeArrayOfMessageEntity(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["optionTextEntities"] = decoded;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 3) return decodeFailure;
  return output as Types.PollOptionAdded;
}

export function _decodePollOptionDeleted(input: unknown): Types.PollOptionDeleted | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "poll_message": {
      const raw = source[key];
      const decoded = _decodeMaybeInaccessibleMessage(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["pollMessage"] = decoded;
      break;
    }
    case "option_persistent_id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["optionPersistentId"] = decoded;
      seen |= 1;
      break;
    }
    case "option_text": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["optionText"] = decoded;
      seen |= 2;
      break;
    }
    case "option_text_entities": {
      const raw = source[key];
      const decoded = _decodeArrayOfMessageEntity(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["optionTextEntities"] = decoded;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 3) return decodeFailure;
  return output as Types.PollOptionDeleted;
}

export function _decodePreCheckoutQuery(input: unknown): Types.PreCheckoutQuery | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["id"] = decoded;
      seen |= 1;
      break;
    }
    case "from": {
      const raw = source[key];
      const decoded = _decodeUser(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["from"] = decoded;
      seen |= 2;
      break;
    }
    case "currency": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["currency"] = decoded;
      seen |= 4;
      break;
    }
    case "total_amount": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["totalAmount"] = decoded;
      seen |= 8;
      break;
    }
    case "invoice_payload": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["invoicePayload"] = decoded;
      seen |= 16;
      break;
    }
    case "shipping_option_id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["shippingOptionId"] = decoded;
      break;
    }
    case "order_info": {
      const raw = source[key];
      const decoded = _decodeOrderInfo(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["orderInfo"] = decoded;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 31) return decodeFailure;
  return output as Types.PreCheckoutQuery;
}

export function _decodePreparedInlineMessage(input: unknown): Types.PreparedInlineMessage | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["id"] = decoded;
      seen |= 1;
      break;
    }
    case "expiration_date": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["expirationDate"] = decoded;
      seen |= 2;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 3) return decodeFailure;
  return output as Types.PreparedInlineMessage;
}

export function _decodePreparedKeyboardButton(input: unknown): Types.PreparedKeyboardButton | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["id"] = decoded;
      }
      seen |= 1;
      break;
    }

    }
  }
  if (seen !== 1) return decodeFailure;
  return (output ?? source) as Types.PreparedKeyboardButton;
}

export function _decodeProximityAlertTriggered(input: unknown): Types.ProximityAlertTriggered | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "traveler": {
      const raw = source[key];
      const decoded = _decodeUser(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["traveler"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "watcher": {
      const raw = source[key];
      const decoded = _decodeUser(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["watcher"] = decoded;
      }
      seen |= 2;
      break;
    }
    case "distance": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["distance"] = decoded;
      }
      seen |= 4;
      break;
    }

    }
  }
  if (seen !== 7) return decodeFailure;
  return (output ?? source) as Types.ProximityAlertTriggered;
}

export function _decodeReactionCount(input: unknown): Types.ReactionCount | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = _decodeReactionType(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["type"] = decoded;
      seen |= 1;
      break;
    }
    case "total_count": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["totalCount"] = decoded;
      seen |= 2;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 3) return decodeFailure;
  return output as Types.ReactionCount;
}

export function _decodeReactionType(input: unknown): Types.ReactionType | typeof decodeFailure {
  const member0 = _decodeReactionTypeEmoji(input);
  if (member0 !== decodeFailure) return member0;
  const member1 = _decodeReactionTypeCustomEmoji(input);
  if (member1 !== decodeFailure) return member1;
  const member2 = _decodeReactionTypePaid(input);
  if (member2 !== decodeFailure) return member2;
  return decodeFailure;
}

export function _decodeReactionTypeCustomEmoji(input: unknown): Types.ReactionTypeCustomEmoji | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "custom_emoji" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      output["type"] = decoded;
      seen |= 1;
      break;
    }
    case "custom_emoji_id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["customEmojiId"] = decoded;
      seen |= 2;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 3) return decodeFailure;
  return output as Types.ReactionTypeCustomEmoji;
}

export function _decodeReactionTypeEmoji(input: unknown): Types.ReactionTypeEmoji | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "emoji" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "emoji": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["emoji"] = decoded;
      }
      seen |= 2;
      break;
    }

    }
  }
  if (seen !== 3) return decodeFailure;
  return (output ?? source) as Types.ReactionTypeEmoji;
}

export function _decodeReactionTypePaid(input: unknown): Types.ReactionTypePaid | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "paid" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      seen |= 1;
      break;
    }

    }
  }
  if (seen !== 1) return decodeFailure;
  return (output ?? source) as Types.ReactionTypePaid;
}

export function _decodeRefundedPayment(input: unknown): Types.RefundedPayment | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "currency": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["currency"] = decoded;
      seen |= 1;
      break;
    }
    case "total_amount": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["totalAmount"] = decoded;
      seen |= 2;
      break;
    }
    case "invoice_payload": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["invoicePayload"] = decoded;
      seen |= 4;
      break;
    }
    case "telegram_payment_charge_id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["telegramPaymentChargeId"] = decoded;
      seen |= 8;
      break;
    }
    case "provider_payment_charge_id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["providerPaymentChargeId"] = decoded;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 15) return decodeFailure;
  return output as Types.RefundedPayment;
}

export function _decodeReplyKeyboardMarkup(input: unknown): Types.ReplyKeyboardMarkup | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "keyboard": {
      const raw = source[key];
      const decoded = _decodeArrayOfArrayOfKeyboardButton(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["keyboard"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "is_persistent": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["isPersistent"] = decoded;
      delete output["is_persistent"];
      break;
    }
    case "resize_keyboard": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["resizeKeyboard"] = decoded;
      delete output["resize_keyboard"];
      break;
    }
    case "one_time_keyboard": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["oneTimeKeyboard"] = decoded;
      delete output["one_time_keyboard"];
      break;
    }
    case "input_field_placeholder": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["inputFieldPlaceholder"] = decoded;
      delete output["input_field_placeholder"];
      break;
    }
    case "selective": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["selective"] = decoded;
      }
      break;
    }
    case "force_reply": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["forceReply"] = decoded;
      delete output["force_reply"];
      break;
    }

    }
  }
  if (seen !== 1) return decodeFailure;
  return (output ?? source) as Types.ReplyKeyboardMarkup;
}

export function _decodeReplyKeyboardRemove(input: unknown): Types.ReplyKeyboardRemove | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "remove_keyboard": {
      const raw = source[key];
      const decoded = _decodeTrue(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["removeKeyboard"] = decoded;
      seen |= 1;
      break;
    }
    case "selective": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["selective"] = decoded;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 1) return decodeFailure;
  return output as Types.ReplyKeyboardRemove;
}

export function _decodeReplyParameters(input: unknown): Types.ReplyParameters | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "message_id": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["messageId"] = decoded;
      delete output["message_id"];
      break;
    }
    case "chat_id": {
      const raw = source[key];
      let decoded: unknown = decodeFailure;
      if (decoded === decodeFailure) decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["chatId"] = decoded;
      delete output["chat_id"];
      break;
    }
    case "ephemeral_message_id": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["ephemeralMessageId"] = decoded;
      delete output["ephemeral_message_id"];
      break;
    }
    case "allow_sending_without_reply": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["allowSendingWithoutReply"] = decoded;
      delete output["allow_sending_without_reply"];
      break;
    }
    case "quote": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["quote"] = decoded;
      }
      break;
    }
    case "quote_parse_mode": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["quoteParseMode"] = decoded;
      delete output["quote_parse_mode"];
      break;
    }
    case "quote_entities": {
      const raw = source[key];
      const decoded = _decodeArrayOfMessageEntity(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["quoteEntities"] = decoded;
      delete output["quote_entities"];
      break;
    }
    case "quote_position": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["quotePosition"] = decoded;
      delete output["quote_position"];
      break;
    }
    case "checklist_task_id": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["checklistTaskId"] = decoded;
      delete output["checklist_task_id"];
      break;
    }
    case "poll_option_id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["pollOptionId"] = decoded;
      delete output["poll_option_id"];
      break;
    }

    }
  }
  if (seen !== 0) return decodeFailure;
  return (output ?? source) as Types.ReplyParameters;
}

export function _decodeResponseParameters(input: unknown): Types.ResponseParameters | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "migrate_to_chat_id": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["migrateToChatId"] = decoded;
      delete output["migrate_to_chat_id"];
      break;
    }
    case "retry_after": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["retryAfter"] = decoded;
      delete output["retry_after"];
      break;
    }

    }
  }
  if (seen !== 0) return decodeFailure;
  return (output ?? source) as Types.ResponseParameters;
}

export function _decodeRevenueWithdrawalState(input: unknown): Types.RevenueWithdrawalState | typeof decodeFailure {
  const member0 = _decodeRevenueWithdrawalStatePending(input);
  if (member0 !== decodeFailure) return member0;
  const member1 = _decodeRevenueWithdrawalStateSucceeded(input);
  if (member1 !== decodeFailure) return member1;
  const member2 = _decodeRevenueWithdrawalStateFailed(input);
  if (member2 !== decodeFailure) return member2;
  return decodeFailure;
}

export function _decodeRevenueWithdrawalStateFailed(input: unknown): Types.RevenueWithdrawalStateFailed | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "failed" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      seen |= 1;
      break;
    }

    }
  }
  if (seen !== 1) return decodeFailure;
  return (output ?? source) as Types.RevenueWithdrawalStateFailed;
}

export function _decodeRevenueWithdrawalStatePending(input: unknown): Types.RevenueWithdrawalStatePending | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "pending" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      seen |= 1;
      break;
    }

    }
  }
  if (seen !== 1) return decodeFailure;
  return (output ?? source) as Types.RevenueWithdrawalStatePending;
}

export function _decodeRevenueWithdrawalStateSucceeded(input: unknown): Types.RevenueWithdrawalStateSucceeded | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "succeeded" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "date": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["date"] = decoded;
      }
      seen |= 2;
      break;
    }
    case "url": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["url"] = decoded;
      }
      seen |= 4;
      break;
    }

    }
  }
  if (seen !== 7) return decodeFailure;
  return (output ?? source) as Types.RevenueWithdrawalStateSucceeded;
}

export function _decodeRichBlock(input: unknown): Types.RichBlock | typeof decodeFailure {
  const member0 = _decodeRichBlockParagraph(input);
  if (member0 !== decodeFailure) return member0;
  const member1 = _decodeRichBlockSectionHeading(input);
  if (member1 !== decodeFailure) return member1;
  const member2 = _decodeRichBlockPreformatted(input);
  if (member2 !== decodeFailure) return member2;
  const member3 = _decodeRichBlockFooter(input);
  if (member3 !== decodeFailure) return member3;
  const member4 = _decodeRichBlockDivider(input);
  if (member4 !== decodeFailure) return member4;
  const member5 = _decodeRichBlockMathematicalExpression(input);
  if (member5 !== decodeFailure) return member5;
  const member6 = _decodeRichBlockAnchor(input);
  if (member6 !== decodeFailure) return member6;
  const member7 = _decodeRichBlockList(input);
  if (member7 !== decodeFailure) return member7;
  const member8 = _decodeRichBlockBlockQuotation(input);
  if (member8 !== decodeFailure) return member8;
  const member9 = _decodeRichBlockExpandableBlockQuotation(input);
  if (member9 !== decodeFailure) return member9;
  const member10 = _decodeRichBlockPullQuotation(input);
  if (member10 !== decodeFailure) return member10;
  const member11 = _decodeRichBlockCollage(input);
  if (member11 !== decodeFailure) return member11;
  const member12 = _decodeRichBlockSlideshow(input);
  if (member12 !== decodeFailure) return member12;
  const member13 = _decodeRichBlockTable(input);
  if (member13 !== decodeFailure) return member13;
  const member14 = _decodeRichBlockDetails(input);
  if (member14 !== decodeFailure) return member14;
  const member15 = _decodeRichBlockMap(input);
  if (member15 !== decodeFailure) return member15;
  const member16 = _decodeRichBlockButtons(input);
  if (member16 !== decodeFailure) return member16;
  const member17 = _decodeRichBlockAnimation(input);
  if (member17 !== decodeFailure) return member17;
  const member18 = _decodeRichBlockAudio(input);
  if (member18 !== decodeFailure) return member18;
  const member19 = _decodeRichBlockDocument(input);
  if (member19 !== decodeFailure) return member19;
  const member20 = _decodeRichBlockPhoto(input);
  if (member20 !== decodeFailure) return member20;
  const member21 = _decodeRichBlockVideo(input);
  if (member21 !== decodeFailure) return member21;
  const member22 = _decodeRichBlockVoiceNote(input);
  if (member22 !== decodeFailure) return member22;
  const member23 = _decodeRichBlockThinking(input);
  if (member23 !== decodeFailure) return member23;
  return decodeFailure;
}

export function _decodeRichBlockAnchor(input: unknown): Types.RichBlockAnchor | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "anchor" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "name": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["name"] = decoded;
      }
      seen |= 2;
      break;
    }

    }
  }
  if (seen !== 3) return decodeFailure;
  return (output ?? source) as Types.RichBlockAnchor;
}

export function _decodeRichBlockAnimation(input: unknown): Types.RichBlockAnimation | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "animation" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "animation": {
      const raw = source[key];
      const decoded = _decodeAnimation(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["animation"] = decoded;
      }
      seen |= 2;
      break;
    }
    case "has_spoiler": {
      const raw = source[key];
      const decoded = _decodeTrue(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["hasSpoiler"] = decoded;
      delete output["has_spoiler"];
      break;
    }
    case "caption": {
      const raw = source[key];
      const decoded = _decodeRichBlockCaption(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["caption"] = decoded;
      }
      break;
    }

    }
  }
  if (seen !== 3) return decodeFailure;
  return (output ?? source) as Types.RichBlockAnimation;
}

export function _decodeRichBlockAudio(input: unknown): Types.RichBlockAudio | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "audio" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "audio": {
      const raw = source[key];
      const decoded = _decodeAudio(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["audio"] = decoded;
      }
      seen |= 2;
      break;
    }
    case "caption": {
      const raw = source[key];
      const decoded = _decodeRichBlockCaption(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["caption"] = decoded;
      }
      break;
    }

    }
  }
  if (seen !== 3) return decodeFailure;
  return (output ?? source) as Types.RichBlockAudio;
}

export function _decodeRichBlockBlockQuotation(input: unknown): Types.RichBlockBlockQuotation | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "blockquote" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "blocks": {
      const raw = source[key];
      const decoded = _decodeArrayOfRichBlock(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["blocks"] = decoded;
      }
      seen |= 2;
      break;
    }
    case "credit": {
      const raw = source[key];
      const decoded = _decodeRichText(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["credit"] = decoded;
      }
      break;
    }

    }
  }
  if (seen !== 3) return decodeFailure;
  return (output ?? source) as Types.RichBlockBlockQuotation;
}

export function _decodeRichBlockButtons(input: unknown): Types.RichBlockButtons | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "buttons" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "buttons": {
      const raw = source[key];
      const decoded = _decodeArrayOfRichMessageButton(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["buttons"] = decoded;
      }
      seen |= 2;
      break;
    }
    case "align": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["align"] = decoded;
      }
      break;
    }

    }
  }
  if (seen !== 3) return decodeFailure;
  return (output ?? source) as Types.RichBlockButtons;
}

export function _decodeRichBlockCaption(input: unknown): Types.RichBlockCaption | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "text": {
      const raw = source[key];
      const decoded = _decodeRichText(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["text"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "credit": {
      const raw = source[key];
      const decoded = _decodeRichText(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["credit"] = decoded;
      }
      break;
    }

    }
  }
  if (seen !== 1) return decodeFailure;
  return (output ?? source) as Types.RichBlockCaption;
}

export function _decodeRichBlockCollage(input: unknown): Types.RichBlockCollage | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "collage" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "blocks": {
      const raw = source[key];
      const decoded = _decodeArrayOfRichBlock(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["blocks"] = decoded;
      }
      seen |= 2;
      break;
    }
    case "caption": {
      const raw = source[key];
      const decoded = _decodeRichBlockCaption(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["caption"] = decoded;
      }
      break;
    }

    }
  }
  if (seen !== 3) return decodeFailure;
  return (output ?? source) as Types.RichBlockCollage;
}

export function _decodeRichBlockDetails(input: unknown): Types.RichBlockDetails | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "details" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "summary": {
      const raw = source[key];
      const decoded = _decodeRichText(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["summary"] = decoded;
      }
      seen |= 2;
      break;
    }
    case "blocks": {
      const raw = source[key];
      const decoded = _decodeArrayOfRichBlock(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["blocks"] = decoded;
      }
      seen |= 4;
      break;
    }
    case "is_open": {
      const raw = source[key];
      const decoded = _decodeTrue(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["isOpen"] = decoded;
      delete output["is_open"];
      break;
    }

    }
  }
  if (seen !== 7) return decodeFailure;
  return (output ?? source) as Types.RichBlockDetails;
}

export function _decodeRichBlockDivider(input: unknown): Types.RichBlockDivider | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "divider" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      seen |= 1;
      break;
    }

    }
  }
  if (seen !== 1) return decodeFailure;
  return (output ?? source) as Types.RichBlockDivider;
}

export function _decodeRichBlockDocument(input: unknown): Types.RichBlockDocument | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "document" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "document": {
      const raw = source[key];
      const decoded = _decodeDocument(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["document"] = decoded;
      }
      seen |= 2;
      break;
    }
    case "caption": {
      const raw = source[key];
      const decoded = _decodeRichBlockCaption(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["caption"] = decoded;
      }
      break;
    }

    }
  }
  if (seen !== 3) return decodeFailure;
  return (output ?? source) as Types.RichBlockDocument;
}

export function _decodeRichBlockExpandableBlockQuotation(input: unknown): Types.RichBlockExpandableBlockQuotation | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "expandable_blockquote" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "text": {
      const raw = source[key];
      const decoded = _decodeRichText(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["text"] = decoded;
      }
      seen |= 2;
      break;
    }
    case "credit": {
      const raw = source[key];
      const decoded = _decodeRichText(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["credit"] = decoded;
      }
      break;
    }

    }
  }
  if (seen !== 3) return decodeFailure;
  return (output ?? source) as Types.RichBlockExpandableBlockQuotation;
}

export function _decodeRichBlockFooter(input: unknown): Types.RichBlockFooter | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "footer" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "text": {
      const raw = source[key];
      const decoded = _decodeRichText(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["text"] = decoded;
      }
      seen |= 2;
      break;
    }

    }
  }
  if (seen !== 3) return decodeFailure;
  return (output ?? source) as Types.RichBlockFooter;
}

export function _decodeRichBlockList(input: unknown): Types.RichBlockList | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "list" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "items": {
      const raw = source[key];
      const decoded = _decodeArrayOfRichBlockListItem(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["items"] = decoded;
      }
      seen |= 2;
      break;
    }

    }
  }
  if (seen !== 3) return decodeFailure;
  return (output ?? source) as Types.RichBlockList;
}

export function _decodeRichBlockListItem(input: unknown): Types.RichBlockListItem | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "label": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["label"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "blocks": {
      const raw = source[key];
      const decoded = _decodeArrayOfRichBlock(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["blocks"] = decoded;
      }
      seen |= 2;
      break;
    }
    case "has_checkbox": {
      const raw = source[key];
      const decoded = _decodeTrue(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["hasCheckbox"] = decoded;
      delete output["has_checkbox"];
      break;
    }
    case "is_checked": {
      const raw = source[key];
      const decoded = _decodeTrue(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["isChecked"] = decoded;
      delete output["is_checked"];
      break;
    }
    case "value": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["value"] = decoded;
      }
      break;
    }
    case "type": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      break;
    }

    }
  }
  if (seen !== 3) return decodeFailure;
  return (output ?? source) as Types.RichBlockListItem;
}

export function _decodeRichBlockMap(input: unknown): Types.RichBlockMap | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "map" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "location": {
      const raw = source[key];
      const decoded = _decodeLocation(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["location"] = decoded;
      }
      seen |= 2;
      break;
    }
    case "zoom": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["zoom"] = decoded;
      }
      seen |= 4;
      break;
    }
    case "width": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["width"] = decoded;
      }
      seen |= 8;
      break;
    }
    case "height": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["height"] = decoded;
      }
      seen |= 16;
      break;
    }
    case "caption": {
      const raw = source[key];
      const decoded = _decodeRichBlockCaption(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["caption"] = decoded;
      }
      break;
    }

    }
  }
  if (seen !== 31) return decodeFailure;
  return (output ?? source) as Types.RichBlockMap;
}

export function _decodeRichBlockMathematicalExpression(input: unknown): Types.RichBlockMathematicalExpression | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "mathematical_expression" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "expression": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["expression"] = decoded;
      }
      seen |= 2;
      break;
    }

    }
  }
  if (seen !== 3) return decodeFailure;
  return (output ?? source) as Types.RichBlockMathematicalExpression;
}

export function _decodeRichBlockParagraph(input: unknown): Types.RichBlockParagraph | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "paragraph" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "text": {
      const raw = source[key];
      const decoded = _decodeRichText(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["text"] = decoded;
      }
      seen |= 2;
      break;
    }

    }
  }
  if (seen !== 3) return decodeFailure;
  return (output ?? source) as Types.RichBlockParagraph;
}

export function _decodeRichBlockPhoto(input: unknown): Types.RichBlockPhoto | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "photo" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "photo": {
      const raw = source[key];
      const decoded = _decodeArrayOfPhotoSize(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["photo"] = decoded;
      }
      seen |= 2;
      break;
    }
    case "has_spoiler": {
      const raw = source[key];
      const decoded = _decodeTrue(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["hasSpoiler"] = decoded;
      delete output["has_spoiler"];
      break;
    }
    case "caption": {
      const raw = source[key];
      const decoded = _decodeRichBlockCaption(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["caption"] = decoded;
      }
      break;
    }

    }
  }
  if (seen !== 3) return decodeFailure;
  return (output ?? source) as Types.RichBlockPhoto;
}

export function _decodeRichBlockPreformatted(input: unknown): Types.RichBlockPreformatted | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "pre" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "text": {
      const raw = source[key];
      const decoded = _decodeRichText(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["text"] = decoded;
      }
      seen |= 2;
      break;
    }
    case "language": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["language"] = decoded;
      }
      break;
    }

    }
  }
  if (seen !== 3) return decodeFailure;
  return (output ?? source) as Types.RichBlockPreformatted;
}

export function _decodeRichBlockPullQuotation(input: unknown): Types.RichBlockPullQuotation | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "pullquote" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "text": {
      const raw = source[key];
      const decoded = _decodeRichText(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["text"] = decoded;
      }
      seen |= 2;
      break;
    }
    case "credit": {
      const raw = source[key];
      const decoded = _decodeRichText(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["credit"] = decoded;
      }
      break;
    }

    }
  }
  if (seen !== 3) return decodeFailure;
  return (output ?? source) as Types.RichBlockPullQuotation;
}

export function _decodeRichBlockSectionHeading(input: unknown): Types.RichBlockSectionHeading | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "heading" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "text": {
      const raw = source[key];
      const decoded = _decodeRichText(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["text"] = decoded;
      }
      seen |= 2;
      break;
    }
    case "size": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["size"] = decoded;
      }
      seen |= 4;
      break;
    }

    }
  }
  if (seen !== 7) return decodeFailure;
  return (output ?? source) as Types.RichBlockSectionHeading;
}

export function _decodeRichBlockSlideshow(input: unknown): Types.RichBlockSlideshow | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "slideshow" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "blocks": {
      const raw = source[key];
      const decoded = _decodeArrayOfRichBlock(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["blocks"] = decoded;
      }
      seen |= 2;
      break;
    }
    case "caption": {
      const raw = source[key];
      const decoded = _decodeRichBlockCaption(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["caption"] = decoded;
      }
      break;
    }

    }
  }
  if (seen !== 3) return decodeFailure;
  return (output ?? source) as Types.RichBlockSlideshow;
}

export function _decodeRichBlockTable(input: unknown): Types.RichBlockTable | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "table" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "cells": {
      const raw = source[key];
      const decoded = _decodeArrayOfArrayOfRichBlockTableCell(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["cells"] = decoded;
      }
      seen |= 2;
      break;
    }
    case "is_bordered": {
      const raw = source[key];
      const decoded = _decodeTrue(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["isBordered"] = decoded;
      delete output["is_bordered"];
      break;
    }
    case "is_striped": {
      const raw = source[key];
      const decoded = _decodeTrue(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["isStriped"] = decoded;
      delete output["is_striped"];
      break;
    }
    case "is_compact": {
      const raw = source[key];
      const decoded = _decodeTrue(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["isCompact"] = decoded;
      delete output["is_compact"];
      break;
    }
    case "caption": {
      const raw = source[key];
      const decoded = _decodeRichText(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["caption"] = decoded;
      }
      break;
    }

    }
  }
  if (seen !== 3) return decodeFailure;
  return (output ?? source) as Types.RichBlockTable;
}

export function _decodeRichBlockTableCell(input: unknown): Types.RichBlockTableCell | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "text": {
      const raw = source[key];
      const decoded = _decodeRichText(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["text"] = decoded;
      }
      break;
    }
    case "is_header": {
      const raw = source[key];
      const decoded = _decodeTrue(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["isHeader"] = decoded;
      delete output["is_header"];
      break;
    }
    case "colspan": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["colspan"] = decoded;
      }
      break;
    }
    case "rowspan": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["rowspan"] = decoded;
      }
      break;
    }
    case "align": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["align"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "valign": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["valign"] = decoded;
      }
      seen |= 2;
      break;
    }

    }
  }
  if (seen !== 3) return decodeFailure;
  return (output ?? source) as Types.RichBlockTableCell;
}

export function _decodeRichBlockThinking(input: unknown): Types.RichBlockThinking | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "thinking" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "text": {
      const raw = source[key];
      const decoded = _decodeRichText(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["text"] = decoded;
      }
      seen |= 2;
      break;
    }

    }
  }
  if (seen !== 3) return decodeFailure;
  return (output ?? source) as Types.RichBlockThinking;
}

export function _decodeRichBlockVideo(input: unknown): Types.RichBlockVideo | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "video" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "video": {
      const raw = source[key];
      const decoded = _decodeVideo(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["video"] = decoded;
      }
      seen |= 2;
      break;
    }
    case "has_spoiler": {
      const raw = source[key];
      const decoded = _decodeTrue(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["hasSpoiler"] = decoded;
      delete output["has_spoiler"];
      break;
    }
    case "caption": {
      const raw = source[key];
      const decoded = _decodeRichBlockCaption(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["caption"] = decoded;
      }
      break;
    }

    }
  }
  if (seen !== 3) return decodeFailure;
  return (output ?? source) as Types.RichBlockVideo;
}

export function _decodeRichBlockVoiceNote(input: unknown): Types.RichBlockVoiceNote | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "voice_note" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      output["type"] = decoded;
      seen |= 1;
      break;
    }
    case "voice_note": {
      const raw = source[key];
      const decoded = _decodeVoice(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["voiceNote"] = decoded;
      seen |= 2;
      break;
    }
    case "caption": {
      const raw = source[key];
      const decoded = _decodeRichBlockCaption(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["caption"] = decoded;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 3) return decodeFailure;
  return output as Types.RichBlockVoiceNote;
}

export function _decodeRichMessage(input: unknown): Types.RichMessage | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "blocks": {
      const raw = source[key];
      const decoded = _decodeArrayOfRichBlock(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["blocks"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "is_rtl": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["isRtl"] = decoded;
      delete output["is_rtl"];
      break;
    }

    }
  }
  if (seen !== 1) return decodeFailure;
  return (output ?? source) as Types.RichMessage;
}

export function _decodeRichMessageButton(input: unknown): Types.RichMessageButton | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "text": {
      const raw = source[key];
      const decoded = _decodeRichText(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["text"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "style": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["style"] = decoded;
      }
      break;
    }
    case "url": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["url"] = decoded;
      }
      break;
    }
    case "callback_data": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["callbackData"] = decoded;
      delete output["callback_data"];
      break;
    }
    case "web_app": {
      const raw = source[key];
      const decoded = _decodeWebAppInfo(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["webApp"] = decoded;
      delete output["web_app"];
      break;
    }
    case "login_url": {
      const raw = source[key];
      const decoded = _decodeLoginUrl(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["loginUrl"] = decoded;
      delete output["login_url"];
      break;
    }
    case "switch_inline_query": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["switchInlineQuery"] = decoded;
      delete output["switch_inline_query"];
      break;
    }
    case "switch_inline_query_current_chat": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["switchInlineQueryCurrentChat"] = decoded;
      delete output["switch_inline_query_current_chat"];
      break;
    }
    case "switch_inline_query_chosen_chat": {
      const raw = source[key];
      const decoded = _decodeSwitchInlineQueryChosenChat(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["switchInlineQueryChosenChat"] = decoded;
      delete output["switch_inline_query_chosen_chat"];
      break;
    }
    case "copy_text": {
      const raw = source[key];
      const decoded = _decodeCopyTextButton(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["copyText"] = decoded;
      delete output["copy_text"];
      break;
    }
    case "disabled": {
      const raw = source[key];
      const decoded = _decodeDisabledButton(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["disabled"] = decoded;
      }
      break;
    }

    }
  }
  if (seen !== 1) return decodeFailure;
  return (output ?? source) as Types.RichMessageButton;
}

export function _decodeRichText(input: unknown): Types.RichText | typeof decodeFailure {
  const member0 = _decodeRichTextBold(input);
  if (member0 !== decodeFailure) return member0;
  const member1 = _decodeRichTextItalic(input);
  if (member1 !== decodeFailure) return member1;
  const member2 = _decodeRichTextUnderline(input);
  if (member2 !== decodeFailure) return member2;
  const member3 = _decodeRichTextStrikethrough(input);
  if (member3 !== decodeFailure) return member3;
  const member4 = _decodeRichTextSpoiler(input);
  if (member4 !== decodeFailure) return member4;
  const member5 = _decodeRichTextDateTime(input);
  if (member5 !== decodeFailure) return member5;
  const member6 = _decodeRichTextTextMention(input);
  if (member6 !== decodeFailure) return member6;
  const member7 = _decodeRichTextSubscript(input);
  if (member7 !== decodeFailure) return member7;
  const member8 = _decodeRichTextSuperscript(input);
  if (member8 !== decodeFailure) return member8;
  const member9 = _decodeRichTextMarked(input);
  if (member9 !== decodeFailure) return member9;
  const member10 = _decodeRichTextCode(input);
  if (member10 !== decodeFailure) return member10;
  const member11 = _decodeRichTextCustomEmoji(input);
  if (member11 !== decodeFailure) return member11;
  const member12 = _decodeRichTextMathematicalExpression(input);
  if (member12 !== decodeFailure) return member12;
  const member13 = _decodeRichTextUrl(input);
  if (member13 !== decodeFailure) return member13;
  const member14 = _decodeRichTextEmailAddress(input);
  if (member14 !== decodeFailure) return member14;
  const member15 = _decodeRichTextPhoneNumber(input);
  if (member15 !== decodeFailure) return member15;
  const member16 = _decodeRichTextBankCardNumber(input);
  if (member16 !== decodeFailure) return member16;
  const member17 = _decodeRichTextMention(input);
  if (member17 !== decodeFailure) return member17;
  const member18 = _decodeRichTextHashtag(input);
  if (member18 !== decodeFailure) return member18;
  const member19 = _decodeRichTextCashtag(input);
  if (member19 !== decodeFailure) return member19;
  const member20 = _decodeRichTextBotCommand(input);
  if (member20 !== decodeFailure) return member20;
  const member21 = _decodeRichTextButton(input);
  if (member21 !== decodeFailure) return member21;
  const member22 = _decodeRichTextAnchor(input);
  if (member22 !== decodeFailure) return member22;
  const member23 = _decodeRichTextAnchorLink(input);
  if (member23 !== decodeFailure) return member23;
  const member24 = _decodeRichTextReference(input);
  if (member24 !== decodeFailure) return member24;
  const member25 = _decodeRichTextReferenceLink(input);
  if (member25 !== decodeFailure) return member25;
  const member26 = _decodeString(input);
  if (member26 !== decodeFailure) return member26;
  const member27 = _decodeArrayOfRichText(input);
  if (member27 !== decodeFailure) return member27;
  return decodeFailure;
}

export function _decodeRichTextAnchor(input: unknown): Types.RichTextAnchor | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "anchor" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "name": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["name"] = decoded;
      }
      seen |= 2;
      break;
    }

    }
  }
  if (seen !== 3) return decodeFailure;
  return (output ?? source) as Types.RichTextAnchor;
}

export function _decodeRichTextAnchorLink(input: unknown): Types.RichTextAnchorLink | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "anchor_link" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      output["type"] = decoded;
      seen |= 1;
      break;
    }
    case "text": {
      const raw = source[key];
      const decoded = _decodeRichText(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["text"] = decoded;
      seen |= 2;
      break;
    }
    case "anchor_name": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["anchorName"] = decoded;
      seen |= 4;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 7) return decodeFailure;
  return output as Types.RichTextAnchorLink;
}

export function _decodeRichTextBankCardNumber(input: unknown): Types.RichTextBankCardNumber | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "bank_card_number" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      output["type"] = decoded;
      seen |= 1;
      break;
    }
    case "text": {
      const raw = source[key];
      const decoded = _decodeRichText(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["text"] = decoded;
      seen |= 2;
      break;
    }
    case "bank_card_number": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["bankCardNumber"] = decoded;
      seen |= 4;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 7) return decodeFailure;
  return output as Types.RichTextBankCardNumber;
}

export function _decodeRichTextBold(input: unknown): Types.RichTextBold | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "bold" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "text": {
      const raw = source[key];
      const decoded = _decodeRichText(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["text"] = decoded;
      }
      seen |= 2;
      break;
    }

    }
  }
  if (seen !== 3) return decodeFailure;
  return (output ?? source) as Types.RichTextBold;
}

export function _decodeRichTextBotCommand(input: unknown): Types.RichTextBotCommand | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "bot_command" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      output["type"] = decoded;
      seen |= 1;
      break;
    }
    case "text": {
      const raw = source[key];
      const decoded = _decodeRichText(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["text"] = decoded;
      seen |= 2;
      break;
    }
    case "bot_command": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["botCommand"] = decoded;
      seen |= 4;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 7) return decodeFailure;
  return output as Types.RichTextBotCommand;
}

export function _decodeRichTextButton(input: unknown): Types.RichTextButton | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "button" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "button": {
      const raw = source[key];
      const decoded = _decodeRichMessageButton(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["button"] = decoded;
      }
      seen |= 2;
      break;
    }

    }
  }
  if (seen !== 3) return decodeFailure;
  return (output ?? source) as Types.RichTextButton;
}

export function _decodeRichTextCashtag(input: unknown): Types.RichTextCashtag | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "cashtag" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "text": {
      const raw = source[key];
      const decoded = _decodeRichText(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["text"] = decoded;
      }
      seen |= 2;
      break;
    }
    case "cashtag": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["cashtag"] = decoded;
      }
      seen |= 4;
      break;
    }

    }
  }
  if (seen !== 7) return decodeFailure;
  return (output ?? source) as Types.RichTextCashtag;
}

export function _decodeRichTextCode(input: unknown): Types.RichTextCode | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "code" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "text": {
      const raw = source[key];
      const decoded = _decodeRichText(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["text"] = decoded;
      }
      seen |= 2;
      break;
    }

    }
  }
  if (seen !== 3) return decodeFailure;
  return (output ?? source) as Types.RichTextCode;
}

export function _decodeRichTextCustomEmoji(input: unknown): Types.RichTextCustomEmoji | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "custom_emoji" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      output["type"] = decoded;
      seen |= 1;
      break;
    }
    case "custom_emoji_id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["customEmojiId"] = decoded;
      seen |= 2;
      break;
    }
    case "alternative_text": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["alternativeText"] = decoded;
      seen |= 4;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 7) return decodeFailure;
  return output as Types.RichTextCustomEmoji;
}

export function _decodeRichTextDateTime(input: unknown): Types.RichTextDateTime | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "date_time" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      output["type"] = decoded;
      seen |= 1;
      break;
    }
    case "text": {
      const raw = source[key];
      const decoded = _decodeRichText(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["text"] = decoded;
      seen |= 2;
      break;
    }
    case "unix_time": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["unixTime"] = decoded;
      seen |= 4;
      break;
    }
    case "date_time_format": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["dateTimeFormat"] = decoded;
      seen |= 8;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 15) return decodeFailure;
  return output as Types.RichTextDateTime;
}

export function _decodeRichTextEmailAddress(input: unknown): Types.RichTextEmailAddress | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "email_address" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      output["type"] = decoded;
      seen |= 1;
      break;
    }
    case "text": {
      const raw = source[key];
      const decoded = _decodeRichText(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["text"] = decoded;
      seen |= 2;
      break;
    }
    case "email_address": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["emailAddress"] = decoded;
      seen |= 4;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 7) return decodeFailure;
  return output as Types.RichTextEmailAddress;
}

export function _decodeRichTextHashtag(input: unknown): Types.RichTextHashtag | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "hashtag" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "text": {
      const raw = source[key];
      const decoded = _decodeRichText(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["text"] = decoded;
      }
      seen |= 2;
      break;
    }
    case "hashtag": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["hashtag"] = decoded;
      }
      seen |= 4;
      break;
    }

    }
  }
  if (seen !== 7) return decodeFailure;
  return (output ?? source) as Types.RichTextHashtag;
}

export function _decodeRichTextItalic(input: unknown): Types.RichTextItalic | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "italic" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "text": {
      const raw = source[key];
      const decoded = _decodeRichText(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["text"] = decoded;
      }
      seen |= 2;
      break;
    }

    }
  }
  if (seen !== 3) return decodeFailure;
  return (output ?? source) as Types.RichTextItalic;
}

export function _decodeRichTextMarked(input: unknown): Types.RichTextMarked | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "marked" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "text": {
      const raw = source[key];
      const decoded = _decodeRichText(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["text"] = decoded;
      }
      seen |= 2;
      break;
    }

    }
  }
  if (seen !== 3) return decodeFailure;
  return (output ?? source) as Types.RichTextMarked;
}

export function _decodeRichTextMathematicalExpression(input: unknown): Types.RichTextMathematicalExpression | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "mathematical_expression" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "expression": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["expression"] = decoded;
      }
      seen |= 2;
      break;
    }

    }
  }
  if (seen !== 3) return decodeFailure;
  return (output ?? source) as Types.RichTextMathematicalExpression;
}

export function _decodeRichTextMention(input: unknown): Types.RichTextMention | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "mention" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "text": {
      const raw = source[key];
      const decoded = _decodeRichText(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["text"] = decoded;
      }
      seen |= 2;
      break;
    }
    case "username": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["username"] = decoded;
      }
      seen |= 4;
      break;
    }

    }
  }
  if (seen !== 7) return decodeFailure;
  return (output ?? source) as Types.RichTextMention;
}

export function _decodeRichTextPhoneNumber(input: unknown): Types.RichTextPhoneNumber | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "phone_number" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      output["type"] = decoded;
      seen |= 1;
      break;
    }
    case "text": {
      const raw = source[key];
      const decoded = _decodeRichText(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["text"] = decoded;
      seen |= 2;
      break;
    }
    case "phone_number": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["phoneNumber"] = decoded;
      seen |= 4;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 7) return decodeFailure;
  return output as Types.RichTextPhoneNumber;
}

export function _decodeRichTextReference(input: unknown): Types.RichTextReference | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "reference" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "text": {
      const raw = source[key];
      const decoded = _decodeRichText(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["text"] = decoded;
      }
      seen |= 2;
      break;
    }
    case "name": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["name"] = decoded;
      }
      seen |= 4;
      break;
    }

    }
  }
  if (seen !== 7) return decodeFailure;
  return (output ?? source) as Types.RichTextReference;
}

export function _decodeRichTextReferenceLink(input: unknown): Types.RichTextReferenceLink | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "reference_link" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      output["type"] = decoded;
      seen |= 1;
      break;
    }
    case "text": {
      const raw = source[key];
      const decoded = _decodeRichText(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["text"] = decoded;
      seen |= 2;
      break;
    }
    case "reference_name": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["referenceName"] = decoded;
      seen |= 4;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 7) return decodeFailure;
  return output as Types.RichTextReferenceLink;
}

export function _decodeRichTextSpoiler(input: unknown): Types.RichTextSpoiler | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "spoiler" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "text": {
      const raw = source[key];
      const decoded = _decodeRichText(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["text"] = decoded;
      }
      seen |= 2;
      break;
    }

    }
  }
  if (seen !== 3) return decodeFailure;
  return (output ?? source) as Types.RichTextSpoiler;
}

export function _decodeRichTextStrikethrough(input: unknown): Types.RichTextStrikethrough | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "strikethrough" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "text": {
      const raw = source[key];
      const decoded = _decodeRichText(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["text"] = decoded;
      }
      seen |= 2;
      break;
    }

    }
  }
  if (seen !== 3) return decodeFailure;
  return (output ?? source) as Types.RichTextStrikethrough;
}

export function _decodeRichTextSubscript(input: unknown): Types.RichTextSubscript | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "subscript" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "text": {
      const raw = source[key];
      const decoded = _decodeRichText(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["text"] = decoded;
      }
      seen |= 2;
      break;
    }

    }
  }
  if (seen !== 3) return decodeFailure;
  return (output ?? source) as Types.RichTextSubscript;
}

export function _decodeRichTextSuperscript(input: unknown): Types.RichTextSuperscript | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "superscript" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "text": {
      const raw = source[key];
      const decoded = _decodeRichText(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["text"] = decoded;
      }
      seen |= 2;
      break;
    }

    }
  }
  if (seen !== 3) return decodeFailure;
  return (output ?? source) as Types.RichTextSuperscript;
}

export function _decodeRichTextTextMention(input: unknown): Types.RichTextTextMention | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "text_mention" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "text": {
      const raw = source[key];
      const decoded = _decodeRichText(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["text"] = decoded;
      }
      seen |= 2;
      break;
    }
    case "user": {
      const raw = source[key];
      const decoded = _decodeUser(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["user"] = decoded;
      }
      seen |= 4;
      break;
    }

    }
  }
  if (seen !== 7) return decodeFailure;
  return (output ?? source) as Types.RichTextTextMention;
}

export function _decodeRichTextUnderline(input: unknown): Types.RichTextUnderline | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "underline" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "text": {
      const raw = source[key];
      const decoded = _decodeRichText(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["text"] = decoded;
      }
      seen |= 2;
      break;
    }

    }
  }
  if (seen !== 3) return decodeFailure;
  return (output ?? source) as Types.RichTextUnderline;
}

export function _decodeRichTextUrl(input: unknown): Types.RichTextUrl | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "url" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "text": {
      const raw = source[key];
      const decoded = _decodeRichText(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["text"] = decoded;
      }
      seen |= 2;
      break;
    }
    case "url": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["url"] = decoded;
      }
      seen |= 4;
      break;
    }

    }
  }
  if (seen !== 7) return decodeFailure;
  return (output ?? source) as Types.RichTextUrl;
}

export function _decodeSentGuestMessage(input: unknown): Types.SentGuestMessage | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "inline_message_id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["inlineMessageId"] = decoded;
      seen |= 1;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 1) return decodeFailure;
  return output as Types.SentGuestMessage;
}

export function _decodeSentWebAppMessage(input: unknown): Types.SentWebAppMessage | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "inline_message_id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["inlineMessageId"] = decoded;
      delete output["inline_message_id"];
      break;
    }

    }
  }
  if (seen !== 0) return decodeFailure;
  return (output ?? source) as Types.SentWebAppMessage;
}

export function _decodeSharedUser(input: unknown): Types.SharedUser | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "user_id": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["userId"] = decoded;
      seen |= 1;
      break;
    }
    case "first_name": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["firstName"] = decoded;
      break;
    }
    case "last_name": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["lastName"] = decoded;
      break;
    }
    case "username": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["username"] = decoded;
      break;
    }
    case "photo": {
      const raw = source[key];
      const decoded = _decodeArrayOfPhotoSize(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["photo"] = decoded;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 1) return decodeFailure;
  return output as Types.SharedUser;
}

export function _decodeShippingAddress(input: unknown): Types.ShippingAddress | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "country_code": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["countryCode"] = decoded;
      seen |= 1;
      break;
    }
    case "state": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["state"] = decoded;
      seen |= 2;
      break;
    }
    case "city": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["city"] = decoded;
      seen |= 4;
      break;
    }
    case "street_line1": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["streetLine1"] = decoded;
      seen |= 8;
      break;
    }
    case "street_line2": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["streetLine2"] = decoded;
      seen |= 16;
      break;
    }
    case "post_code": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["postCode"] = decoded;
      seen |= 32;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 63) return decodeFailure;
  return output as Types.ShippingAddress;
}

export function _decodeShippingOption(input: unknown): Types.ShippingOption | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["id"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "title": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["title"] = decoded;
      }
      seen |= 2;
      break;
    }
    case "prices": {
      const raw = source[key];
      const decoded = _decodeArrayOfLabeledPrice(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["prices"] = decoded;
      }
      seen |= 4;
      break;
    }

    }
  }
  if (seen !== 7) return decodeFailure;
  return (output ?? source) as Types.ShippingOption;
}

export function _decodeShippingQuery(input: unknown): Types.ShippingQuery | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["id"] = decoded;
      seen |= 1;
      break;
    }
    case "from": {
      const raw = source[key];
      const decoded = _decodeUser(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["from"] = decoded;
      seen |= 2;
      break;
    }
    case "invoice_payload": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["invoicePayload"] = decoded;
      seen |= 4;
      break;
    }
    case "shipping_address": {
      const raw = source[key];
      const decoded = _decodeShippingAddress(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["shippingAddress"] = decoded;
      seen |= 8;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 15) return decodeFailure;
  return output as Types.ShippingQuery;
}

export function _decodeStarAmount(input: unknown): Types.StarAmount | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "amount": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["amount"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "nanostar_amount": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["nanostarAmount"] = decoded;
      delete output["nanostar_amount"];
      break;
    }

    }
  }
  if (seen !== 1) return decodeFailure;
  return (output ?? source) as Types.StarAmount;
}

export function _decodeStarTransaction(input: unknown): Types.StarTransaction | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["id"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "amount": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["amount"] = decoded;
      }
      seen |= 2;
      break;
    }
    case "nanostar_amount": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["nanostarAmount"] = decoded;
      delete output["nanostar_amount"];
      break;
    }
    case "date": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["date"] = decoded;
      }
      seen |= 4;
      break;
    }
    case "source": {
      const raw = source[key];
      const decoded = _decodeTransactionPartner(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["source"] = decoded;
      }
      break;
    }
    case "receiver": {
      const raw = source[key];
      const decoded = _decodeTransactionPartner(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["receiver"] = decoded;
      }
      break;
    }

    }
  }
  if (seen !== 7) return decodeFailure;
  return (output ?? source) as Types.StarTransaction;
}

export function _decodeStarTransactions(input: unknown): Types.StarTransactions | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "transactions": {
      const raw = source[key];
      const decoded = _decodeArrayOfStarTransaction(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["transactions"] = decoded;
      }
      seen |= 1;
      break;
    }

    }
  }
  if (seen !== 1) return decodeFailure;
  return (output ?? source) as Types.StarTransactions;
}

export function _decodeSticker(input: unknown): Types.Sticker | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "file_id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["fileId"] = decoded;
      seen |= 1;
      break;
    }
    case "file_unique_id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["fileUniqueId"] = decoded;
      seen |= 2;
      break;
    }
    case "type": {
      const raw = source[key];
      const decoded = _decodeStickerType(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["type"] = decoded;
      seen |= 4;
      break;
    }
    case "width": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["width"] = decoded;
      seen |= 8;
      break;
    }
    case "height": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["height"] = decoded;
      seen |= 16;
      break;
    }
    case "is_animated": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["isAnimated"] = decoded;
      seen |= 32;
      break;
    }
    case "is_video": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["isVideo"] = decoded;
      seen |= 64;
      break;
    }
    case "thumbnail": {
      const raw = source[key];
      const decoded = _decodePhotoSize(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["thumbnail"] = decoded;
      break;
    }
    case "emoji": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["emoji"] = decoded;
      break;
    }
    case "set_name": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["setName"] = decoded;
      break;
    }
    case "premium_animation": {
      const raw = source[key];
      const decoded = _decodeFile(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["premiumAnimation"] = decoded;
      break;
    }
    case "mask_position": {
      const raw = source[key];
      const decoded = _decodeMaskPosition(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["maskPosition"] = decoded;
      break;
    }
    case "custom_emoji_id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["customEmojiId"] = decoded;
      break;
    }
    case "needs_repainting": {
      const raw = source[key];
      const decoded = _decodeTrue(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["needsRepainting"] = decoded;
      break;
    }
    case "file_size": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["fileSize"] = decoded;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 127) return decodeFailure;
  return output as Types.Sticker;
}

export function _decodeStickerSet(input: unknown): Types.StickerSet | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "name": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["name"] = decoded;
      seen |= 1;
      break;
    }
    case "title": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["title"] = decoded;
      seen |= 2;
      break;
    }
    case "sticker_type": {
      const raw = source[key];
      const decoded = _decodeStickerType(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["stickerType"] = decoded;
      seen |= 4;
      break;
    }
    case "stickers": {
      const raw = source[key];
      const decoded = _decodeArrayOfSticker(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["stickers"] = decoded;
      seen |= 8;
      break;
    }
    case "thumbnail": {
      const raw = source[key];
      const decoded = _decodePhotoSize(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["thumbnail"] = decoded;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 15) return decodeFailure;
  return output as Types.StickerSet;
}

export function _decodeStory(input: unknown): Types.Story | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "chat": {
      const raw = source[key];
      const decoded = _decodeChat(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["chat"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "id": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["id"] = decoded;
      }
      seen |= 2;
      break;
    }

    }
  }
  if (seen !== 3) return decodeFailure;
  return (output ?? source) as Types.Story;
}

export function _decodeStoryArea(input: unknown): Types.StoryArea | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "position": {
      const raw = source[key];
      const decoded = _decodeStoryAreaPosition(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["position"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "type": {
      const raw = source[key];
      const decoded = _decodeStoryAreaType(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      seen |= 2;
      break;
    }

    }
  }
  if (seen !== 3) return decodeFailure;
  return (output ?? source) as Types.StoryArea;
}

export function _decodeStoryAreaPosition(input: unknown): Types.StoryAreaPosition | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "x_percentage": {
      const raw = source[key];
      const decoded = _decodeFloat(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["xPercentage"] = decoded;
      seen |= 1;
      break;
    }
    case "y_percentage": {
      const raw = source[key];
      const decoded = _decodeFloat(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["yPercentage"] = decoded;
      seen |= 2;
      break;
    }
    case "width_percentage": {
      const raw = source[key];
      const decoded = _decodeFloat(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["widthPercentage"] = decoded;
      seen |= 4;
      break;
    }
    case "height_percentage": {
      const raw = source[key];
      const decoded = _decodeFloat(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["heightPercentage"] = decoded;
      seen |= 8;
      break;
    }
    case "rotation_angle": {
      const raw = source[key];
      const decoded = _decodeFloat(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["rotationAngle"] = decoded;
      seen |= 16;
      break;
    }
    case "corner_radius_percentage": {
      const raw = source[key];
      const decoded = _decodeFloat(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["cornerRadiusPercentage"] = decoded;
      seen |= 32;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 63) return decodeFailure;
  return output as Types.StoryAreaPosition;
}

export function _decodeStoryAreaType(input: unknown): Types.StoryAreaType | typeof decodeFailure {
  const member0 = _decodeStoryAreaTypeLocation(input);
  if (member0 !== decodeFailure) return member0;
  const member1 = _decodeStoryAreaTypeSuggestedReaction(input);
  if (member1 !== decodeFailure) return member1;
  const member2 = _decodeStoryAreaTypeLink(input);
  if (member2 !== decodeFailure) return member2;
  const member3 = _decodeStoryAreaTypeWeather(input);
  if (member3 !== decodeFailure) return member3;
  const member4 = _decodeStoryAreaTypeUniqueGift(input);
  if (member4 !== decodeFailure) return member4;
  return decodeFailure;
}

export function _decodeStoryAreaTypeLink(input: unknown): Types.StoryAreaTypeLink | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "link" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "url": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["url"] = decoded;
      }
      seen |= 2;
      break;
    }

    }
  }
  if (seen !== 3) return decodeFailure;
  return (output ?? source) as Types.StoryAreaTypeLink;
}

export function _decodeStoryAreaTypeLocation(input: unknown): Types.StoryAreaTypeLocation | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "location" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "latitude": {
      const raw = source[key];
      const decoded = _decodeFloat(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["latitude"] = decoded;
      }
      seen |= 2;
      break;
    }
    case "longitude": {
      const raw = source[key];
      const decoded = _decodeFloat(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["longitude"] = decoded;
      }
      seen |= 4;
      break;
    }
    case "address": {
      const raw = source[key];
      const decoded = _decodeLocationAddress(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["address"] = decoded;
      }
      break;
    }

    }
  }
  if (seen !== 7) return decodeFailure;
  return (output ?? source) as Types.StoryAreaTypeLocation;
}

export function _decodeStoryAreaTypeSuggestedReaction(input: unknown): Types.StoryAreaTypeSuggestedReaction | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "suggested_reaction" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      output["type"] = decoded;
      seen |= 1;
      break;
    }
    case "reaction_type": {
      const raw = source[key];
      const decoded = _decodeReactionType(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["reactionType"] = decoded;
      seen |= 2;
      break;
    }
    case "is_dark": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["isDark"] = decoded;
      break;
    }
    case "is_flipped": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["isFlipped"] = decoded;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 3) return decodeFailure;
  return output as Types.StoryAreaTypeSuggestedReaction;
}

export function _decodeStoryAreaTypeUniqueGift(input: unknown): Types.StoryAreaTypeUniqueGift | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "unique_gift" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "name": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["name"] = decoded;
      }
      seen |= 2;
      break;
    }

    }
  }
  if (seen !== 3) return decodeFailure;
  return (output ?? source) as Types.StoryAreaTypeUniqueGift;
}

export function _decodeStoryAreaTypeWeather(input: unknown): Types.StoryAreaTypeWeather | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "weather" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      output["type"] = decoded;
      seen |= 1;
      break;
    }
    case "temperature": {
      const raw = source[key];
      const decoded = _decodeFloat(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["temperature"] = decoded;
      seen |= 2;
      break;
    }
    case "emoji": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["emoji"] = decoded;
      seen |= 4;
      break;
    }
    case "background_color": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["backgroundColor"] = decoded;
      seen |= 8;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 15) return decodeFailure;
  return output as Types.StoryAreaTypeWeather;
}

export function _decodeSuccessfulPayment(input: unknown): Types.SuccessfulPayment | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "currency": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["currency"] = decoded;
      seen |= 1;
      break;
    }
    case "total_amount": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["totalAmount"] = decoded;
      seen |= 2;
      break;
    }
    case "invoice_payload": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["invoicePayload"] = decoded;
      seen |= 4;
      break;
    }
    case "subscription_expiration_date": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["subscriptionExpirationDate"] = decoded;
      break;
    }
    case "is_recurring": {
      const raw = source[key];
      const decoded = _decodeTrue(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["isRecurring"] = decoded;
      break;
    }
    case "is_first_recurring": {
      const raw = source[key];
      const decoded = _decodeTrue(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["isFirstRecurring"] = decoded;
      break;
    }
    case "shipping_option_id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["shippingOptionId"] = decoded;
      break;
    }
    case "order_info": {
      const raw = source[key];
      const decoded = _decodeOrderInfo(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["orderInfo"] = decoded;
      break;
    }
    case "telegram_payment_charge_id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["telegramPaymentChargeId"] = decoded;
      seen |= 8;
      break;
    }
    case "provider_payment_charge_id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["providerPaymentChargeId"] = decoded;
      seen |= 16;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 31) return decodeFailure;
  return output as Types.SuccessfulPayment;
}

export function _decodeSuggestedPostApprovalFailed(input: unknown): Types.SuggestedPostApprovalFailed | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "suggested_post_message": {
      const raw = source[key];
      const decoded = _decodeMessage(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["suggestedPostMessage"] = decoded;
      delete output["suggested_post_message"];
      break;
    }
    case "price": {
      const raw = source[key];
      const decoded = _decodeSuggestedPostPrice(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["price"] = decoded;
      }
      seen |= 1;
      break;
    }

    }
  }
  if (seen !== 1) return decodeFailure;
  return (output ?? source) as Types.SuggestedPostApprovalFailed;
}

export function _decodeSuggestedPostApproved(input: unknown): Types.SuggestedPostApproved | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "suggested_post_message": {
      const raw = source[key];
      const decoded = _decodeMessage(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["suggestedPostMessage"] = decoded;
      break;
    }
    case "price": {
      const raw = source[key];
      const decoded = _decodeSuggestedPostPrice(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["price"] = decoded;
      break;
    }
    case "send_date": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["sendDate"] = decoded;
      seen |= 1;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 1) return decodeFailure;
  return output as Types.SuggestedPostApproved;
}

export function _decodeSuggestedPostDeclined(input: unknown): Types.SuggestedPostDeclined | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "suggested_post_message": {
      const raw = source[key];
      const decoded = _decodeMessage(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["suggestedPostMessage"] = decoded;
      delete output["suggested_post_message"];
      break;
    }
    case "comment": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["comment"] = decoded;
      }
      break;
    }

    }
  }
  if (seen !== 0) return decodeFailure;
  return (output ?? source) as Types.SuggestedPostDeclined;
}

export function _decodeSuggestedPostInfo(input: unknown): Types.SuggestedPostInfo | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "state": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["state"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "price": {
      const raw = source[key];
      const decoded = _decodeSuggestedPostPrice(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["price"] = decoded;
      }
      break;
    }
    case "send_date": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["sendDate"] = decoded;
      delete output["send_date"];
      break;
    }

    }
  }
  if (seen !== 1) return decodeFailure;
  return (output ?? source) as Types.SuggestedPostInfo;
}

export function _decodeSuggestedPostPaid(input: unknown): Types.SuggestedPostPaid | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "suggested_post_message": {
      const raw = source[key];
      const decoded = _decodeMessage(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["suggestedPostMessage"] = decoded;
      delete output["suggested_post_message"];
      break;
    }
    case "currency": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["currency"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "amount": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["amount"] = decoded;
      }
      break;
    }
    case "star_amount": {
      const raw = source[key];
      const decoded = _decodeStarAmount(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["starAmount"] = decoded;
      delete output["star_amount"];
      break;
    }

    }
  }
  if (seen !== 1) return decodeFailure;
  return (output ?? source) as Types.SuggestedPostPaid;
}

export function _decodeSuggestedPostParameters(input: unknown): Types.SuggestedPostParameters | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "price": {
      const raw = source[key];
      const decoded = _decodeSuggestedPostPrice(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["price"] = decoded;
      }
      break;
    }
    case "send_date": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["sendDate"] = decoded;
      delete output["send_date"];
      break;
    }

    }
  }
  if (seen !== 0) return decodeFailure;
  return (output ?? source) as Types.SuggestedPostParameters;
}

export function _decodeSuggestedPostPrice(input: unknown): Types.SuggestedPostPrice | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "currency": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["currency"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "amount": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["amount"] = decoded;
      }
      seen |= 2;
      break;
    }

    }
  }
  if (seen !== 3) return decodeFailure;
  return (output ?? source) as Types.SuggestedPostPrice;
}

export function _decodeSuggestedPostRefunded(input: unknown): Types.SuggestedPostRefunded | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "suggested_post_message": {
      const raw = source[key];
      const decoded = _decodeMessage(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["suggestedPostMessage"] = decoded;
      delete output["suggested_post_message"];
      break;
    }
    case "reason": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["reason"] = decoded;
      }
      seen |= 1;
      break;
    }

    }
  }
  if (seen !== 1) return decodeFailure;
  return (output ?? source) as Types.SuggestedPostRefunded;
}

export function _decodeSwitchInlineQueryChosenChat(input: unknown): Types.SwitchInlineQueryChosenChat | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "query": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["query"] = decoded;
      }
      break;
    }
    case "allow_user_chats": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["allowUserChats"] = decoded;
      delete output["allow_user_chats"];
      break;
    }
    case "allow_bot_chats": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["allowBotChats"] = decoded;
      delete output["allow_bot_chats"];
      break;
    }
    case "allow_group_chats": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["allowGroupChats"] = decoded;
      delete output["allow_group_chats"];
      break;
    }
    case "allow_channel_chats": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["allowChannelChats"] = decoded;
      delete output["allow_channel_chats"];
      break;
    }

    }
  }
  if (seen !== 0) return decodeFailure;
  return (output ?? source) as Types.SwitchInlineQueryChosenChat;
}

export function _decodeTextQuote(input: unknown): Types.TextQuote | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "text": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["text"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "entities": {
      const raw = source[key];
      const decoded = _decodeArrayOfMessageEntity(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["entities"] = decoded;
      }
      break;
    }
    case "position": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["position"] = decoded;
      }
      seen |= 2;
      break;
    }
    case "is_manual": {
      const raw = source[key];
      const decoded = _decodeTrue(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["isManual"] = decoded;
      delete output["is_manual"];
      break;
    }

    }
  }
  if (seen !== 3) return decodeFailure;
  return (output ?? source) as Types.TextQuote;
}

export function _decodeTransactionPartner(input: unknown): Types.TransactionPartner | typeof decodeFailure {
  const member0 = _decodeTransactionPartnerUser(input);
  if (member0 !== decodeFailure) return member0;
  const member1 = _decodeTransactionPartnerChat(input);
  if (member1 !== decodeFailure) return member1;
  const member2 = _decodeTransactionPartnerAffiliateProgram(input);
  if (member2 !== decodeFailure) return member2;
  const member3 = _decodeTransactionPartnerFragment(input);
  if (member3 !== decodeFailure) return member3;
  const member4 = _decodeTransactionPartnerTelegramAds(input);
  if (member4 !== decodeFailure) return member4;
  const member5 = _decodeTransactionPartnerTelegramApi(input);
  if (member5 !== decodeFailure) return member5;
  const member6 = _decodeTransactionPartnerOther(input);
  if (member6 !== decodeFailure) return member6;
  return decodeFailure;
}

export function _decodeTransactionPartnerAffiliateProgram(input: unknown): Types.TransactionPartnerAffiliateProgram | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "affiliate_program" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      output["type"] = decoded;
      seen |= 1;
      break;
    }
    case "sponsor_user": {
      const raw = source[key];
      const decoded = _decodeUser(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["sponsorUser"] = decoded;
      break;
    }
    case "commission_per_mille": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["commissionPerMille"] = decoded;
      seen |= 2;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 3) return decodeFailure;
  return output as Types.TransactionPartnerAffiliateProgram;
}

export function _decodeTransactionPartnerChat(input: unknown): Types.TransactionPartnerChat | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "chat" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "chat": {
      const raw = source[key];
      const decoded = _decodeChat(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["chat"] = decoded;
      }
      seen |= 2;
      break;
    }
    case "gift": {
      const raw = source[key];
      const decoded = _decodeGift(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["gift"] = decoded;
      }
      break;
    }

    }
  }
  if (seen !== 3) return decodeFailure;
  return (output ?? source) as Types.TransactionPartnerChat;
}

export function _decodeTransactionPartnerFragment(input: unknown): Types.TransactionPartnerFragment | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "fragment" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "withdrawal_state": {
      const raw = source[key];
      const decoded = _decodeRevenueWithdrawalState(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["withdrawalState"] = decoded;
      delete output["withdrawal_state"];
      break;
    }

    }
  }
  if (seen !== 1) return decodeFailure;
  return (output ?? source) as Types.TransactionPartnerFragment;
}

export function _decodeTransactionPartnerOther(input: unknown): Types.TransactionPartnerOther | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "other" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      seen |= 1;
      break;
    }

    }
  }
  if (seen !== 1) return decodeFailure;
  return (output ?? source) as Types.TransactionPartnerOther;
}

export function _decodeTransactionPartnerTelegramAds(input: unknown): Types.TransactionPartnerTelegramAds | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "telegram_ads" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["type"] = decoded;
      }
      seen |= 1;
      break;
    }

    }
  }
  if (seen !== 1) return decodeFailure;
  return (output ?? source) as Types.TransactionPartnerTelegramAds;
}

export function _decodeTransactionPartnerTelegramApi(input: unknown): Types.TransactionPartnerTelegramApi | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "telegram_api" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      output["type"] = decoded;
      seen |= 1;
      break;
    }
    case "request_count": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["requestCount"] = decoded;
      seen |= 2;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 3) return decodeFailure;
  return output as Types.TransactionPartnerTelegramApi;
}

export function _decodeTransactionPartnerUser(input: unknown): Types.TransactionPartnerUser | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "type": {
      const raw = source[key];
      const decoded = raw === "user" ? raw : decodeFailure;
      if (decoded === decodeFailure) return decodeFailure;
      output["type"] = decoded;
      seen |= 1;
      break;
    }
    case "transaction_type": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["transactionType"] = decoded;
      seen |= 2;
      break;
    }
    case "user": {
      const raw = source[key];
      const decoded = _decodeUser(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["user"] = decoded;
      seen |= 4;
      break;
    }
    case "affiliate": {
      const raw = source[key];
      const decoded = _decodeAffiliateInfo(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["affiliate"] = decoded;
      break;
    }
    case "invoice_payload": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["invoicePayload"] = decoded;
      break;
    }
    case "subscription_period": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["subscriptionPeriod"] = decoded;
      break;
    }
    case "paid_media": {
      const raw = source[key];
      const decoded = _decodeArrayOfPaidMedia(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["paidMedia"] = decoded;
      break;
    }
    case "paid_media_payload": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["paidMediaPayload"] = decoded;
      break;
    }
    case "gift": {
      const raw = source[key];
      const decoded = _decodeGift(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["gift"] = decoded;
      break;
    }
    case "premium_subscription_duration": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["premiumSubscriptionDuration"] = decoded;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 7) return decodeFailure;
  return output as Types.TransactionPartnerUser;
}

export function _decodeUniqueGift(input: unknown): Types.UniqueGift | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "gift_id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["giftId"] = decoded;
      seen |= 1;
      break;
    }
    case "base_name": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["baseName"] = decoded;
      seen |= 2;
      break;
    }
    case "name": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["name"] = decoded;
      seen |= 4;
      break;
    }
    case "number": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["number"] = decoded;
      seen |= 8;
      break;
    }
    case "model": {
      const raw = source[key];
      const decoded = _decodeUniqueGiftModel(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["model"] = decoded;
      seen |= 16;
      break;
    }
    case "symbol": {
      const raw = source[key];
      const decoded = _decodeUniqueGiftSymbol(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["symbol"] = decoded;
      seen |= 32;
      break;
    }
    case "backdrop": {
      const raw = source[key];
      const decoded = _decodeUniqueGiftBackdrop(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["backdrop"] = decoded;
      seen |= 64;
      break;
    }
    case "is_premium": {
      const raw = source[key];
      const decoded = _decodeTrue(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["isPremium"] = decoded;
      break;
    }
    case "is_burned": {
      const raw = source[key];
      const decoded = _decodeTrue(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["isBurned"] = decoded;
      break;
    }
    case "is_from_blockchain": {
      const raw = source[key];
      const decoded = _decodeTrue(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["isFromBlockchain"] = decoded;
      break;
    }
    case "colors": {
      const raw = source[key];
      const decoded = _decodeUniqueGiftColors(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["colors"] = decoded;
      break;
    }
    case "publisher_chat": {
      const raw = source[key];
      const decoded = _decodeChat(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["publisherChat"] = decoded;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 127) return decodeFailure;
  return output as Types.UniqueGift;
}

export function _decodeUniqueGiftBackdrop(input: unknown): Types.UniqueGiftBackdrop | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "name": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["name"] = decoded;
      seen |= 1;
      break;
    }
    case "colors": {
      const raw = source[key];
      const decoded = _decodeUniqueGiftBackdropColors(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["colors"] = decoded;
      seen |= 2;
      break;
    }
    case "rarity_per_mille": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["rarityPerMille"] = decoded;
      seen |= 4;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 7) return decodeFailure;
  return output as Types.UniqueGiftBackdrop;
}

export function _decodeUniqueGiftBackdropColors(input: unknown): Types.UniqueGiftBackdropColors | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "center_color": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["centerColor"] = decoded;
      seen |= 1;
      break;
    }
    case "edge_color": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["edgeColor"] = decoded;
      seen |= 2;
      break;
    }
    case "symbol_color": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["symbolColor"] = decoded;
      seen |= 4;
      break;
    }
    case "text_color": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["textColor"] = decoded;
      seen |= 8;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 15) return decodeFailure;
  return output as Types.UniqueGiftBackdropColors;
}

export function _decodeUniqueGiftColors(input: unknown): Types.UniqueGiftColors | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "model_custom_emoji_id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["modelCustomEmojiId"] = decoded;
      seen |= 1;
      break;
    }
    case "symbol_custom_emoji_id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["symbolCustomEmojiId"] = decoded;
      seen |= 2;
      break;
    }
    case "light_theme_main_color": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["lightThemeMainColor"] = decoded;
      seen |= 4;
      break;
    }
    case "light_theme_other_colors": {
      const raw = source[key];
      const decoded = _decodeArrayOfInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["lightThemeOtherColors"] = decoded;
      seen |= 8;
      break;
    }
    case "dark_theme_main_color": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["darkThemeMainColor"] = decoded;
      seen |= 16;
      break;
    }
    case "dark_theme_other_colors": {
      const raw = source[key];
      const decoded = _decodeArrayOfInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["darkThemeOtherColors"] = decoded;
      seen |= 32;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 63) return decodeFailure;
  return output as Types.UniqueGiftColors;
}

export function _decodeUniqueGiftInfo(input: unknown): Types.UniqueGiftInfo | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "gift": {
      const raw = source[key];
      const decoded = _decodeUniqueGift(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["gift"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "origin": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["origin"] = decoded;
      }
      seen |= 2;
      break;
    }
    case "text": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["text"] = decoded;
      }
      break;
    }
    case "entities": {
      const raw = source[key];
      const decoded = _decodeArrayOfMessageEntity(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["entities"] = decoded;
      }
      break;
    }
    case "is_private": {
      const raw = source[key];
      const decoded = _decodeTrue(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["isPrivate"] = decoded;
      delete output["is_private"];
      break;
    }
    case "last_resale_currency": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["lastResaleCurrency"] = decoded;
      delete output["last_resale_currency"];
      break;
    }
    case "last_resale_amount": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["lastResaleAmount"] = decoded;
      delete output["last_resale_amount"];
      break;
    }
    case "owned_gift_id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["ownedGiftId"] = decoded;
      delete output["owned_gift_id"];
      break;
    }
    case "transfer_star_count": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["transferStarCount"] = decoded;
      delete output["transfer_star_count"];
      break;
    }
    case "next_transfer_date": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["nextTransferDate"] = decoded;
      delete output["next_transfer_date"];
      break;
    }

    }
  }
  if (seen !== 3) return decodeFailure;
  return (output ?? source) as Types.UniqueGiftInfo;
}

export function _decodeUniqueGiftModel(input: unknown): Types.UniqueGiftModel | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "name": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["name"] = decoded;
      seen |= 1;
      break;
    }
    case "sticker": {
      const raw = source[key];
      const decoded = _decodeSticker(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["sticker"] = decoded;
      seen |= 2;
      break;
    }
    case "rarity_per_mille": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["rarityPerMille"] = decoded;
      seen |= 4;
      break;
    }
    case "rarity": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["rarity"] = decoded;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 7) return decodeFailure;
  return output as Types.UniqueGiftModel;
}

export function _decodeUniqueGiftSymbol(input: unknown): Types.UniqueGiftSymbol | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "name": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["name"] = decoded;
      seen |= 1;
      break;
    }
    case "sticker": {
      const raw = source[key];
      const decoded = _decodeSticker(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["sticker"] = decoded;
      seen |= 2;
      break;
    }
    case "rarity_per_mille": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["rarityPerMille"] = decoded;
      seen |= 4;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 7) return decodeFailure;
  return output as Types.UniqueGiftSymbol;
}

export function _decodeUpdate(input: unknown): Types.Update | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "update_id": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["updateId"] = decoded;
      seen |= 1;
      break;
    }
    case "message": {
      const raw = source[key];
      const decoded = _decodeMessage(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["message"] = decoded;
      break;
    }
    case "edited_message": {
      const raw = source[key];
      const decoded = _decodeMessage(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["editedMessage"] = decoded;
      break;
    }
    case "channel_post": {
      const raw = source[key];
      const decoded = _decodeMessage(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["channelPost"] = decoded;
      break;
    }
    case "edited_channel_post": {
      const raw = source[key];
      const decoded = _decodeMessage(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["editedChannelPost"] = decoded;
      break;
    }
    case "business_connection": {
      const raw = source[key];
      const decoded = _decodeBusinessConnection(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["businessConnection"] = decoded;
      break;
    }
    case "business_message": {
      const raw = source[key];
      const decoded = _decodeMessage(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["businessMessage"] = decoded;
      break;
    }
    case "edited_business_message": {
      const raw = source[key];
      const decoded = _decodeMessage(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["editedBusinessMessage"] = decoded;
      break;
    }
    case "deleted_business_messages": {
      const raw = source[key];
      const decoded = _decodeBusinessMessagesDeleted(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["deletedBusinessMessages"] = decoded;
      break;
    }
    case "guest_message": {
      const raw = source[key];
      const decoded = _decodeMessage(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["guestMessage"] = decoded;
      break;
    }
    case "message_reaction": {
      const raw = source[key];
      const decoded = _decodeMessageReactionUpdated(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["messageReaction"] = decoded;
      break;
    }
    case "message_reaction_count": {
      const raw = source[key];
      const decoded = _decodeMessageReactionCountUpdated(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["messageReactionCount"] = decoded;
      break;
    }
    case "inline_query": {
      const raw = source[key];
      const decoded = _decodeInlineQuery(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["inlineQuery"] = decoded;
      break;
    }
    case "chosen_inline_result": {
      const raw = source[key];
      const decoded = _decodeChosenInlineResult(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["chosenInlineResult"] = decoded;
      break;
    }
    case "callback_query": {
      const raw = source[key];
      const decoded = _decodeCallbackQuery(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["callbackQuery"] = decoded;
      break;
    }
    case "shipping_query": {
      const raw = source[key];
      const decoded = _decodeShippingQuery(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["shippingQuery"] = decoded;
      break;
    }
    case "pre_checkout_query": {
      const raw = source[key];
      const decoded = _decodePreCheckoutQuery(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["preCheckoutQuery"] = decoded;
      break;
    }
    case "purchased_paid_media": {
      const raw = source[key];
      const decoded = _decodePaidMediaPurchased(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["purchasedPaidMedia"] = decoded;
      break;
    }
    case "poll": {
      const raw = source[key];
      const decoded = _decodePoll(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["poll"] = decoded;
      break;
    }
    case "poll_answer": {
      const raw = source[key];
      const decoded = _decodePollAnswer(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["pollAnswer"] = decoded;
      break;
    }
    case "my_chat_member": {
      const raw = source[key];
      const decoded = _decodeChatMemberUpdated(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["myChatMember"] = decoded;
      break;
    }
    case "chat_member": {
      const raw = source[key];
      const decoded = _decodeChatMemberUpdated(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["chatMember"] = decoded;
      break;
    }
    case "chat_join_request": {
      const raw = source[key];
      const decoded = _decodeChatJoinRequest(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["chatJoinRequest"] = decoded;
      break;
    }
    case "chat_boost": {
      const raw = source[key];
      const decoded = _decodeChatBoostUpdated(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["chatBoost"] = decoded;
      break;
    }
    case "removed_chat_boost": {
      const raw = source[key];
      const decoded = _decodeChatBoostRemoved(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["removedChatBoost"] = decoded;
      break;
    }
    case "managed_bot": {
      const raw = source[key];
      const decoded = _decodeManagedBotUpdated(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["managedBot"] = decoded;
      break;
    }
    case "subscription": {
      const raw = source[key];
      const decoded = _decodeBotSubscriptionUpdated(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["subscription"] = decoded;
      break;
    }
    case "stopped_message_generation": {
      const raw = source[key];
      const decoded = _decodeMessageGenerationStopped(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["stoppedMessageGeneration"] = decoded;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 1) return decodeFailure;
  return output as Types.Update;
}

export function _decodeUser(input: unknown): Types.User | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "id": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["id"] = decoded;
      seen |= 1;
      break;
    }
    case "is_bot": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["isBot"] = decoded;
      seen |= 2;
      break;
    }
    case "first_name": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["firstName"] = decoded;
      seen |= 4;
      break;
    }
    case "last_name": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["lastName"] = decoded;
      break;
    }
    case "username": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["username"] = decoded;
      break;
    }
    case "language_code": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["languageCode"] = decoded;
      break;
    }
    case "is_premium": {
      const raw = source[key];
      const decoded = _decodeTrue(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["isPremium"] = decoded;
      break;
    }
    case "added_to_attachment_menu": {
      const raw = source[key];
      const decoded = _decodeTrue(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["addedToAttachmentMenu"] = decoded;
      break;
    }
    case "can_join_groups": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["canJoinGroups"] = decoded;
      break;
    }
    case "can_read_all_group_messages": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["canReadAllGroupMessages"] = decoded;
      break;
    }
    case "supports_guest_queries": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["supportsGuestQueries"] = decoded;
      break;
    }
    case "supports_inline_queries": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["supportsInlineQueries"] = decoded;
      break;
    }
    case "can_connect_to_business": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["canConnectToBusiness"] = decoded;
      break;
    }
    case "has_main_web_app": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["hasMainWebApp"] = decoded;
      break;
    }
    case "has_topics_enabled": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["hasTopicsEnabled"] = decoded;
      break;
    }
    case "allows_users_to_create_topics": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["allowsUsersToCreateTopics"] = decoded;
      break;
    }
    case "can_manage_bots": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["canManageBots"] = decoded;
      break;
    }
    case "supports_join_request_queries": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["supportsJoinRequestQueries"] = decoded;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 7) return decodeFailure;
  return output as Types.User;
}

export function _decodeUserChatBoosts(input: unknown): Types.UserChatBoosts | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "boosts": {
      const raw = source[key];
      const decoded = _decodeArrayOfChatBoost(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["boosts"] = decoded;
      }
      seen |= 1;
      break;
    }

    }
  }
  if (seen !== 1) return decodeFailure;
  return (output ?? source) as Types.UserChatBoosts;
}

export function _decodeUserProfileAudios(input: unknown): Types.UserProfileAudios | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "total_count": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["totalCount"] = decoded;
      seen |= 1;
      break;
    }
    case "audios": {
      const raw = source[key];
      const decoded = _decodeArrayOfAudio(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["audios"] = decoded;
      seen |= 2;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 3) return decodeFailure;
  return output as Types.UserProfileAudios;
}

export function _decodeUserProfilePhotos(input: unknown): Types.UserProfilePhotos | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "total_count": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["totalCount"] = decoded;
      seen |= 1;
      break;
    }
    case "photos": {
      const raw = source[key];
      const decoded = _decodeArrayOfArrayOfPhotoSize(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["photos"] = decoded;
      seen |= 2;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 3) return decodeFailure;
  return output as Types.UserProfilePhotos;
}

export function _decodeUserRating(input: unknown): Types.UserRating | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "level": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["level"] = decoded;
      seen |= 1;
      break;
    }
    case "rating": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["rating"] = decoded;
      seen |= 2;
      break;
    }
    case "current_level_rating": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["currentLevelRating"] = decoded;
      seen |= 4;
      break;
    }
    case "next_level_rating": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["nextLevelRating"] = decoded;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 7) return decodeFailure;
  return output as Types.UserRating;
}

export function _decodeUsersShared(input: unknown): Types.UsersShared | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "request_id": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["requestId"] = decoded;
      seen |= 1;
      break;
    }
    case "users": {
      const raw = source[key];
      const decoded = _decodeArrayOfSharedUser(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["users"] = decoded;
      seen |= 2;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 3) return decodeFailure;
  return output as Types.UsersShared;
}

export function _decodeVenue(input: unknown): Types.Venue | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "location": {
      const raw = source[key];
      const decoded = _decodeLocation(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["location"] = decoded;
      }
      seen |= 1;
      break;
    }
    case "title": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["title"] = decoded;
      }
      seen |= 2;
      break;
    }
    case "address": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["address"] = decoded;
      }
      seen |= 4;
      break;
    }
    case "foursquare_id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["foursquareId"] = decoded;
      delete output["foursquare_id"];
      break;
    }
    case "foursquare_type": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["foursquareType"] = decoded;
      delete output["foursquare_type"];
      break;
    }
    case "google_place_id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["googlePlaceId"] = decoded;
      delete output["google_place_id"];
      break;
    }
    case "google_place_type": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["googlePlaceType"] = decoded;
      delete output["google_place_type"];
      break;
    }

    }
  }
  if (seen !== 7) return decodeFailure;
  return (output ?? source) as Types.Venue;
}

export function _decodeVideo(input: unknown): Types.Video | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "file_id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["fileId"] = decoded;
      seen |= 1;
      break;
    }
    case "file_unique_id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["fileUniqueId"] = decoded;
      seen |= 2;
      break;
    }
    case "width": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["width"] = decoded;
      seen |= 4;
      break;
    }
    case "height": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["height"] = decoded;
      seen |= 8;
      break;
    }
    case "duration": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["duration"] = decoded;
      seen |= 16;
      break;
    }
    case "thumbnail": {
      const raw = source[key];
      const decoded = _decodePhotoSize(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["thumbnail"] = decoded;
      break;
    }
    case "cover": {
      const raw = source[key];
      const decoded = _decodeArrayOfPhotoSize(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["cover"] = decoded;
      break;
    }
    case "start_timestamp": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["startTimestamp"] = decoded;
      break;
    }
    case "qualities": {
      const raw = source[key];
      const decoded = _decodeArrayOfVideoQuality(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["qualities"] = decoded;
      break;
    }
    case "file_name": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["fileName"] = decoded;
      break;
    }
    case "mime_type": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["mimeType"] = decoded;
      break;
    }
    case "file_size": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["fileSize"] = decoded;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 31) return decodeFailure;
  return output as Types.Video;
}

export function _decodeVideoChatEnded(input: unknown): Types.VideoChatEnded | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "duration": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["duration"] = decoded;
      }
      seen |= 1;
      break;
    }

    }
  }
  if (seen !== 1) return decodeFailure;
  return (output ?? source) as Types.VideoChatEnded;
}

export function _decodeVideoChatParticipantsInvited(input: unknown): Types.VideoChatParticipantsInvited | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "users": {
      const raw = source[key];
      const decoded = _decodeArrayOfUser(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["users"] = decoded;
      }
      seen |= 1;
      break;
    }

    }
  }
  if (seen !== 1) return decodeFailure;
  return (output ?? source) as Types.VideoChatParticipantsInvited;
}

export function _decodeVideoChatScheduled(input: unknown): Types.VideoChatScheduled | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "start_date": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["startDate"] = decoded;
      seen |= 1;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 1) return decodeFailure;
  return output as Types.VideoChatScheduled;
}

export function _decodeVideoChatStarted(input: unknown): Types.VideoChatStarted | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {


    }
  }
  if (seen !== 0) return decodeFailure;
  return (output ?? source) as Types.VideoChatStarted;
}

export function _decodeVideoNote(input: unknown): Types.VideoNote | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "file_id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["fileId"] = decoded;
      seen |= 1;
      break;
    }
    case "file_unique_id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["fileUniqueId"] = decoded;
      seen |= 2;
      break;
    }
    case "length": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["length"] = decoded;
      seen |= 4;
      break;
    }
    case "duration": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["duration"] = decoded;
      seen |= 8;
      break;
    }
    case "thumbnail": {
      const raw = source[key];
      const decoded = _decodePhotoSize(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["thumbnail"] = decoded;
      break;
    }
    case "file_size": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["fileSize"] = decoded;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 15) return decodeFailure;
  return output as Types.VideoNote;
}

export function _decodeVideoQuality(input: unknown): Types.VideoQuality | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "file_id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["fileId"] = decoded;
      seen |= 1;
      break;
    }
    case "file_unique_id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["fileUniqueId"] = decoded;
      seen |= 2;
      break;
    }
    case "width": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["width"] = decoded;
      seen |= 4;
      break;
    }
    case "height": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["height"] = decoded;
      seen |= 8;
      break;
    }
    case "codec": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["codec"] = decoded;
      seen |= 16;
      break;
    }
    case "file_size": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["fileSize"] = decoded;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 31) return decodeFailure;
  return output as Types.VideoQuality;
}

export function _decodeVoice(input: unknown): Types.Voice | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "file_id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["fileId"] = decoded;
      seen |= 1;
      break;
    }
    case "file_unique_id": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["fileUniqueId"] = decoded;
      seen |= 2;
      break;
    }
    case "duration": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["duration"] = decoded;
      seen |= 4;
      break;
    }
    case "mime_type": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["mimeType"] = decoded;
      break;
    }
    case "file_size": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["fileSize"] = decoded;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 7) return decodeFailure;
  return output as Types.Voice;
}

export function _decodeWebAppData(input: unknown): Types.WebAppData | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "data": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["data"] = decoded;
      seen |= 1;
      break;
    }
    case "button_text": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["buttonText"] = decoded;
      seen |= 2;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 3) return decodeFailure;
  return output as Types.WebAppData;
}

export function _decodeWebAppInfo(input: unknown): Types.WebAppInfo | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "url": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      if (decoded !== raw) {
        output ??= { ...source };
        output["url"] = decoded;
      }
      seen |= 1;
      break;
    }

    }
  }
  if (seen !== 1) return decodeFailure;
  return (output ?? source) as Types.WebAppInfo;
}

export function _decodeWebhookInfo(input: unknown): Types.WebhookInfo | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  const output: Record<string, unknown> = {};
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "url": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["url"] = decoded;
      seen |= 1;
      break;
    }
    case "has_custom_certificate": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["hasCustomCertificate"] = decoded;
      seen |= 2;
      break;
    }
    case "pending_update_count": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["pendingUpdateCount"] = decoded;
      seen |= 4;
      break;
    }
    case "ip_address": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["ipAddress"] = decoded;
      break;
    }
    case "last_error_date": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["lastErrorDate"] = decoded;
      break;
    }
    case "last_error_message": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["lastErrorMessage"] = decoded;
      break;
    }
    case "last_synchronization_error_date": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["lastSynchronizationErrorDate"] = decoded;
      break;
    }
    case "max_connections": {
      const raw = source[key];
      const decoded = _decodeInteger(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["maxConnections"] = decoded;
      break;
    }
    case "allowed_updates": {
      const raw = source[key];
      const decoded = _decodeArrayOfUpdateType(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output["allowedUpdates"] = decoded;
      break;
    }
    default:
      output[key] = source[key];
      break;
    }
  }
  if (seen !== 7) return decodeFailure;
  return output as Types.WebhookInfo;
}

export function _decodeWriteAccessAllowed(input: unknown): Types.WriteAccessAllowed | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  let output: Record<string, unknown> | undefined;
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
    case "from_request": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["fromRequest"] = decoded;
      delete output["from_request"];
      break;
    }
    case "web_app_name": {
      const raw = source[key];
      const decoded = _decodeString(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["webAppName"] = decoded;
      delete output["web_app_name"];
      break;
    }
    case "from_attachment_menu": {
      const raw = source[key];
      const decoded = _decodeBoolean(raw);
      if (decoded === decodeFailure) return decodeFailure;
      output ??= { ...source };
      output["fromAttachmentMenu"] = decoded;
      delete output["from_attachment_menu"];
      break;
    }

    }
  }
  if (seen !== 0) return decodeFailure;
  return (output ?? source) as Types.WriteAccessAllowed;
}

export function decodeUpdate(input: unknown): Types.Update | typeof decodeFailure {
  return _decodeUpdate(input);
}
