import { expect, test } from "bun:test";

import {
  messageMedia,
  messageEntities,
  messageReply,
  messageSender,
  messageText,
  type Animation,
  type Chat,
  type Document,
  type LivePhoto,
  type Message,
  type PhotoSize,
  type User,
} from "../index.ts";

const chat: Chat = { id: 17, type: "private" };

function message(fields: Partial<Message> = {}): Message {
  return {
    chat,
    date: 1_700_000_000,
    messageId: 31,
    ...fields,
  };
}

test("messageText prefers text and falls back to a media caption", () => {
  expect(messageText(message({ caption: "caption", text: "text" }))).toBe("text");
  expect(messageText(message({ caption: "caption only" }))).toBe("caption only");
  expect(messageText(message())).toBeUndefined();
});

test("messageEntities extracts UTF-16 text spans and filters their types", () => {
  const hashtag = { length: 4, offset: 3, type: "hashtag" as const };
  const bold = { length: 4, offset: 12, type: "bold" as const };
  const source = message({
    entities: [hashtag, bold],
    text: "😀 #tag and bold",
  });

  expect(messageEntities(source)).toEqual([
    { entity: hashtag, text: "#tag" },
    { entity: bold, text: "bold" },
  ]);
  expect(messageEntities(source, "hashtag")).toEqual([
    { entity: hashtag, text: "#tag" },
  ]);
});

test("messageEntities extracts caption spans", () => {
  const italic = { length: 7, offset: 6, type: "italic" as const };
  const source = message({
    caption: "Photo caption",
    captionEntities: [italic],
  });

  expect(messageEntities(source, "italic")).toEqual([
    { entity: italic, text: "caption" },
  ]);
});

test("messageMedia resolves Telegram media aliases to the specific type", () => {
  const animation: Animation = {
    duration: 3,
    fileId: "animation-file",
    fileUniqueId: "animation-unique",
    height: 20,
    width: 30,
  };
  const document: Document = {
    fileId: "document-file",
    fileUniqueId: "document-unique",
  };
  const livePhoto: LivePhoto = {
    duration: 4,
    fileId: "live-photo-file",
    fileUniqueId: "live-photo-unique",
    height: 40,
    width: 50,
  };
  const staticPhoto: PhotoSize = {
    fileId: "static-photo-file",
    fileUniqueId: "static-photo-unique",
    height: 60,
    width: 70,
  };

  expect(messageMedia(message({ animation, document }))).toEqual({
    animation,
    type: "animation",
  });
  expect(messageMedia(message({ livePhoto, photo: [staticPhoto] }))).toEqual({
    livePhoto,
    type: "livePhoto",
  });
});

test("messageMedia returns the largest available photo size", () => {
  const small: PhotoSize = {
    fileId: "small-file",
    fileUniqueId: "small-unique",
    height: 90,
    width: 90,
  };
  const large: PhotoSize = {
    fileId: "large-file",
    fileUniqueId: "large-unique",
    height: 900,
    width: 900,
  };

  expect(messageMedia(message({ photo: [small, large] }))).toEqual({
    photo: large,
    type: "photo",
  });
});

test("messageMedia returns each direct downloadable media kind", () => {
  const audio = { duration: 11, fileId: "audio-file", fileUniqueId: "audio-unique" };
  const document = { fileId: "document-file", fileUniqueId: "document-unique" };
  const sticker = {
    fileId: "sticker-file",
    fileUniqueId: "sticker-unique",
    height: 12,
    isAnimated: false,
    isVideo: false,
    type: "regular" as const,
    width: 13,
  };
  const video = {
    duration: 14,
    fileId: "video-file",
    fileUniqueId: "video-unique",
    height: 15,
    width: 16,
  };
  const videoNote = {
    duration: 17,
    fileId: "video-note-file",
    fileUniqueId: "video-note-unique",
    length: 18,
  };
  const voice = { duration: 19, fileId: "voice-file", fileUniqueId: "voice-unique" };

  expect([
    messageMedia(message({ audio })),
    messageMedia(message({ document })),
    messageMedia(message({ sticker })),
    messageMedia(message({ video })),
    messageMedia(message({ videoNote })),
    messageMedia(message({ voice })),
  ]).toEqual([
    { audio, type: "audio" },
    { document, type: "document" },
    { sticker, type: "sticker" },
    { type: "video", video },
    { type: "videoNote", videoNote },
    { type: "voice", voice },
  ]);
});

test("messageSender prefers the real sender chat over Telegram's placeholder user", () => {
  const senderChat: Chat = { id: -10071, title: "News", type: "channel" };
  const placeholder: User = { firstName: "Telegram", id: 777000, isBot: false };
  const user: User = { firstName: "Ayaan", id: 73, isBot: false };

  expect(messageSender(message({ from: placeholder, senderChat }))).toEqual({
    chat: senderChat,
    type: "chat",
  });
  expect(messageSender(message({ from: user }))).toEqual({ type: "user", user });
  expect(messageSender(message())).toBeUndefined();
});

test("messageReply normalizes Telegram's three reply variants", () => {
  const repliedMessage = message({ messageId: 37, text: "same chat" });
  const externalReply = {
    messageId: 41,
    origin: {
      date: 1_700_000_001,
      senderUserName: "Hidden Person",
      type: "hidden_user" as const,
    },
  };
  const story = { chat, id: 43 };

  expect(messageReply(message({
    externalReply,
    replyToMessage: repliedMessage,
    replyToStory: story,
  }))).toEqual({ message: repliedMessage, type: "message" });
  expect(messageReply(message({ externalReply, replyToStory: story }))).toEqual({
    reply: externalReply,
    type: "external",
  });
  expect(messageReply(message({ replyToStory: story }))).toEqual({ story, type: "story" });
  expect(messageReply(message())).toBeUndefined();
});
