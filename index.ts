import { Application } from "./src/Application.js";
import type { ApplicationOptions, Polling } from "./src/Application.js";
import { Bot, BotApiError } from "./src/BotApi.js";
import type { BotApiOptions } from "./src/BotApi.js";
import { downloadFile } from "./src/Files.js";
import type { DownloadFileOptions } from "./src/Files.js";
import { reply, respond } from "./src/Conversation.js";
import type { ConversationMessageOptions } from "./src/Conversation.js";
import { pollUpdates } from "./src/Polling.js";
import type {
  AcknowledgmentMode,
  PollingOptions,
  UpdateHandler,
} from "./src/Polling.js";
import {
  callbackQuery,
  chatType,
  command,
  defineBot,
  every,
  Filter,
  media,
  mention,
  on,
  regex,
  repliedMessage,
  routes,
  text,
} from "./src/Routing.js";
import type { Webhook, WebhookOptions } from "./src/Webhook.js";
import type {
  CallbackQueryMatch,
  BotDefinition,
  ChatTypeMatch,
  CommandMatch,
  MediaKind,
  MediaKindMap,
  MediaMatch,
  MentionMatch,
  MentionSpan,
  MessageChatType,
  RegexMatch,
  RepliedMessageMatch,
  Route,
  TextMatch,
} from "./src/Routing.js";

export * from "./src/methods.generated.js";
export * from "./src/types.generated.js";
export {
  Application,
  Bot,
  BotApiError,
  callbackQuery,
  chatType,
  command,
  defineBot,
  downloadFile,
  every,
  Filter,
  media,
  mention,
  on,
  pollUpdates,
  reply,
  regex,
  repliedMessage,
  respond,
  routes,
  text,
};
export type {
  AcknowledgmentMode,
  ApplicationOptions,
  BotApiOptions,
  BotDefinition,
  ChatTypeMatch,
  ConversationMessageOptions,
  DownloadFileOptions,
  MediaKind,
  MediaKindMap,
  MediaMatch,
  MentionMatch,
  MentionSpan,
  MessageChatType,
  PollingOptions,
  Polling,
  Route,
  RegexMatch,
  RepliedMessageMatch,
  TextMatch,
  UpdateHandler,
  Webhook,
  WebhookOptions,
  CallbackQueryMatch,
  CommandMatch,
};
