import type {
  Animation,
  Audio,
  Chat,
  Document,
  ExternalReplyInfo,
  LivePhoto,
  Message,
  MessageEntity,
  MessageEntityType,
  PhotoSize,
  RichBlock,
  RichBlockCaption,
  RichText,
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

export interface MessageEntitySpan {
  readonly entity: MessageEntity;
  readonly text: string;
}

function joinText(parts: ReadonlyArray<string>, separator = "\n"): string {
  return parts.filter((part) => part.length > 0).join(separator);
}

function richTextText(value: RichText): string {
  if (typeof value === "string") return value;
  if (!("type" in value)) return value.map(richTextText).join("");
  switch (value.type) {
    case "anchor":
      return "";
    case "button":
      return richTextText(value.button.text);
    case "custom_emoji":
      return value.alternativeText;
    case "mathematical_expression":
      return value.expression;
    default:
      return richTextText(value.text);
  }
}

function captionText(caption: RichBlockCaption | undefined): string {
  return caption === undefined
    ? ""
    : joinText([
        richTextText(caption.text),
        caption.credit === undefined ? "" : richTextText(caption.credit),
      ]);
}

function richBlocksText(blocks: ReadonlyArray<RichBlock>): string {
  return joinText(blocks.map(richBlockText));
}

function richBlockText(block: RichBlock): string {
  switch (block.type) {
    case "anchor":
    case "divider":
      return "";
    case "mathematical_expression":
      return block.expression;
    case "paragraph":
    case "heading":
    case "pre":
    case "footer":
    case "thinking":
      return richTextText(block.text);
    case "expandable_blockquote":
    case "pullquote":
      return joinText([
        richTextText(block.text),
        block.credit === undefined ? "" : richTextText(block.credit),
      ]);
    case "blockquote":
      return joinText([
        richBlocksText(block.blocks),
        block.credit === undefined ? "" : richTextText(block.credit),
      ]);
    case "list":
      return joinText(block.items.map((item) => {
        const content = richBlocksText(item.blocks);
        return item.label.length === 0 ? content : `${item.label} ${content}`;
      }));
    case "collage":
    case "slideshow":
      return joinText([richBlocksText(block.blocks), captionText(block.caption)]);
    case "table":
      return joinText([
        block.caption === undefined ? "" : richTextText(block.caption),
        ...block.cells.map((row) => joinText(
          row.map((cell) => cell.text === undefined ? "" : richTextText(cell.text)),
          "\t",
        )),
      ]);
    case "details":
      return joinText([richTextText(block.summary), richBlocksText(block.blocks)]);
    case "buttons":
      return joinText(block.buttons.map((button) => richTextText(button.text)), "\t");
    case "map":
    case "animation":
    case "audio":
    case "document":
    case "photo":
    case "video":
    case "voice_note":
      return captionText(block.caption);
  }
}

/** Returns readable text from a plain, media, or rich message. */
export function messageText(message: Message): string | undefined {
  if (message.text !== undefined) return message.text;
  if (message.caption !== undefined) return message.caption;
  if (message.richMessage === undefined) return undefined;
  const text = richBlocksText(message.richMessage.blocks);
  return text.length === 0 ? undefined : text;
}

/** Extracts entity substrings from message text or a media caption. */
export function messageEntities(
  message: Message,
  ...types: ReadonlyArray<MessageEntityType>
): ReadonlyArray<MessageEntitySpan> {
  const text = message.text ?? message.caption;
  const entities = message.text === undefined ? message.captionEntities : message.entities;
  if (text === undefined || entities === undefined) return [];
  const spans: Array<MessageEntitySpan> = [];
  for (const entity of entities) {
    if (types.length > 0 && !types.includes(entity.type)) continue;
    spans.push({ entity, text: text.slice(entity.offset, entity.offset + entity.length) });
  }
  return spans;
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
