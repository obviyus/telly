// Generated from schema/sources/dofer/spec.json. Edit schema inputs or overrides, then regenerate.
import { Schema } from "effect";

import { callMethod } from "./internal/CallMethod.js";
import * as Types from "./types.generated.js";

/** Use this method to send text messages. On success, the sent Message is returned. */
export interface SendMessageParams {
  /** Unique identifier of the business connection on behalf of which the message will be sent */
  readonly business_connection_id?: string | undefined;
  /** Unique identifier for the target chat or username of the target bot, supergroup or channel in the format @username */
  readonly chat_id: number | string;
  /** Unique identifier for the target message thread (topic) of a forum; for forum supergroups and private chats of bots with forum topic mode enabled only */
  readonly message_thread_id?: number | undefined;
  /** Identifier of the direct messages topic to which the message will be sent; required if the message is sent to a direct messages chat */
  readonly direct_messages_topic_id?: number | undefined;
  /** A JSON-serialized object containing the parameters of the ephemeral message to send */
  readonly ephemeral_message_parameters?: Types.EphemeralMessageParameters | undefined;
  /** Text of the message to be sent, 1-4096 characters after entities parsing */
  readonly text: string;
  /** Mode for parsing entities in the message text. See formatting options for more details. */
  readonly parse_mode?: Types.ParseMode | undefined;
  /** A JSON-serialized list of special entities that appear in message text, which can be specified instead of parse_mode */
  readonly entities?: ReadonlyArray<Types.MessageEntity> | undefined;
  /** Link preview generation options for the message */
  readonly link_preview_options?: Types.LinkPreviewOptions | undefined;
  /** Sends the message silently. Users will receive a notification with no sound. */
  readonly disable_notification?: boolean | undefined;
  /** Protects the contents of the sent message from forwarding and saving */
  readonly protect_content?: boolean | undefined;
  /** Pass True to allow up to 1000 messages per second, ignoring broadcasting limits for a fee of 0.1 Telegram Stars per message. The relevant Stars will be withdrawn from the bot's balance. */
  readonly allow_paid_broadcast?: boolean | undefined;
  /** Unique identifier of the message effect to be added to the message; for private chats only */
  readonly message_effect_id?: string | undefined;
  /** A JSON-serialized object containing the parameters of the suggested post to send; for direct messages chats only. If the message is sent as a reply to another suggested post, then that suggested post is automatically declined. */
  readonly suggested_post_parameters?: Types.SuggestedPostParameters | undefined;
  /** Description of the message to reply to */
  readonly reply_parameters?: Types.ReplyParameters | undefined;
  /** Additional interface options. A JSON-serialized object for an inline keyboard, custom reply keyboard, instructions to remove a reply keyboard or to force a reply from the user. */
  readonly reply_markup?: Types.InlineKeyboardMarkup | Types.ReplyKeyboardMarkup | Types.ReplyKeyboardRemove | Types.ForceReply | undefined;
}
export const SendMessageParams: Schema.Codec<SendMessageParams> = Schema.Struct({
  business_connection_id: Schema.optional(Schema.String),
  chat_id: Schema.Union([Schema.Int, Schema.String]),
  message_thread_id: Schema.optional(Schema.Int),
  direct_messages_topic_id: Schema.optional(Schema.Int),
  ephemeral_message_parameters: Schema.optional(Schema.suspend((): Schema.Codec<Types.EphemeralMessageParameters> => Types.EphemeralMessageParameters)),
  text: Schema.String,
  parse_mode: Schema.optional(Schema.suspend((): Schema.Codec<Types.ParseMode> => Types.ParseMode)),
  entities: Schema.optional(Schema.Array(Schema.suspend((): Schema.Codec<Types.MessageEntity> => Types.MessageEntity))),
  link_preview_options: Schema.optional(Schema.suspend((): Schema.Codec<Types.LinkPreviewOptions> => Types.LinkPreviewOptions)),
  disable_notification: Schema.optional(Schema.Boolean),
  protect_content: Schema.optional(Schema.Boolean),
  allow_paid_broadcast: Schema.optional(Schema.Boolean),
  message_effect_id: Schema.optional(Schema.String),
  suggested_post_parameters: Schema.optional(Schema.suspend((): Schema.Codec<Types.SuggestedPostParameters> => Types.SuggestedPostParameters)),
  reply_parameters: Schema.optional(Schema.suspend((): Schema.Codec<Types.ReplyParameters> => Types.ReplyParameters)),
  reply_markup: Schema.optional(Schema.Union([Schema.suspend((): Schema.Codec<Types.InlineKeyboardMarkup> => Types.InlineKeyboardMarkup), Schema.suspend((): Schema.Codec<Types.ReplyKeyboardMarkup> => Types.ReplyKeyboardMarkup), Schema.suspend((): Schema.Codec<Types.ReplyKeyboardRemove> => Types.ReplyKeyboardRemove), Schema.suspend((): Schema.Codec<Types.ForceReply> => Types.ForceReply)])),
});

export const sendMessage = callMethod({
  method: "sendMessage",
  params: SendMessageParams,
  result: Schema.suspend((): Schema.Codec<Types.Message> => Types.Message),
  retrySafe: false,
});
