import type {
  Animation,
  Audio,
  Chat,
  Document,
  ExternalReplyInfo,
  LivePhoto,
  Message,
  PhotoSize,
  Sticker,
  Story,
  User,
  Video,
  VideoNote,
  Voice,
} from "./types.generated.js";

export type MessageMedia =
  | { readonly animation: Animation; readonly type: "animation" }
  | { readonly audio: Audio; readonly type: "audio" }
  | { readonly document: Document; readonly type: "document" }
  | { readonly livePhoto: LivePhoto; readonly type: "livePhoto" }
  | { readonly photo: PhotoSize; readonly type: "photo" }
  | { readonly sticker: Sticker; readonly type: "sticker" }
  | { readonly video: Video; readonly type: "video" }
  | { readonly videoNote: VideoNote; readonly type: "videoNote" }
  | { readonly voice: Voice; readonly type: "voice" };

export type MessageSender =
  | { readonly chat: Chat; readonly type: "chat" }
  | { readonly type: "user"; readonly user: User };

export type MessageReply =
  | { readonly message: Message; readonly type: "message" }
  | { readonly reply: ExternalReplyInfo; readonly type: "external" }
  | { readonly story: Story; readonly type: "story" };

/** Returns message text, or the caption when the message carries media. */
export function messageText(message: Message): string | undefined {
  return message.text ?? message.caption;
}

/** Returns the message's downloadable media with Telegram aliases resolved. */
export function messageMedia(message: Message): MessageMedia | undefined {
  if (message.animation !== undefined) {
    return { animation: message.animation, type: "animation" };
  }
  if (message.audio !== undefined) return { audio: message.audio, type: "audio" };
  if (message.document !== undefined) return { document: message.document, type: "document" };
  if (message.livePhoto !== undefined) return { livePhoto: message.livePhoto, type: "livePhoto" };
  const photo = message.photo?.at(-1);
  if (photo !== undefined) return { photo, type: "photo" };
  if (message.sticker !== undefined) return { sticker: message.sticker, type: "sticker" };
  if (message.video !== undefined) return { type: "video", video: message.video };
  if (message.videoNote !== undefined) {
    return { type: "videoNote", videoNote: message.videoNote };
  }
  if (message.voice !== undefined) return { type: "voice", voice: message.voice };
  return undefined;
}

/** Returns the real user or chat identity that sent the message. */
export function messageSender(message: Message): MessageSender | undefined {
  if (message.senderChat !== undefined) return { chat: message.senderChat, type: "chat" };
  if (message.from !== undefined) return { type: "user", user: message.from };
  return undefined;
}

/** Returns the message, external message, or story to which this message replies. */
export function messageReply(message: Message): MessageReply | undefined {
  if (message.replyToMessage !== undefined) {
    return { message: message.replyToMessage, type: "message" };
  }
  if (message.externalReply !== undefined) {
    return { reply: message.externalReply, type: "external" };
  }
  if (message.replyToStory !== undefined) return { story: message.replyToStory, type: "story" };
  return undefined;
}
