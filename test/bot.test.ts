import { describe, expect, test } from "bun:test";
import { Effect, Fiber, Layer, Predicate, Redacted, Tracer } from "effect";
import { TestClock } from "effect/testing";

import {
  answerCallbackQuery,
  Bot,
  forwardMessage,
  getChatMenuButton,
  getChatMemberCount,
  getMe,
  getStarTransactions,
  getUserProfilePhotos,
  sendMessage,
  sendPhoto,
  sendVenue,
  setMyDefaultAdministratorRights,
  setChatTitle,
} from "../index.ts";
import { FakeBotApi, FakeBotApiReply } from "../testing.ts";

const token = "123456:fake-token-for-tests";

function botLayer(fake: FakeBotApi) {
  return Bot.layer({ token: Redacted.make(token) }).pipe(Layer.provide(fake.layer));
}

describe("sendMessage", () => {
  test("sends Telegram wire parameters and decodes the Message", async () => {
    const fake = FakeBotApi.make({ token });

    const message = await Effect.runPromise(
      sendMessage({ chatId: 7, text: "sprocket" }).pipe(Effect.provide(botLayer(fake))),
    );

    expect(message.messageId).toBe(41);
    expect(message.chat.id).toBe(7);
    expect(message.text).toBe("sprocket");
    expect(message["future_field"]).toBe("kept");
    expect(fake.requests).toEqual([
      {
        contentType: "application/json",
        method: "sendMessage",
        params: { chat_id: 7, text: "sprocket" },
        tracingDisabled: true,
      },
    ]);
  });

  test("returns Telegram rejection details after exhausting retries", async () => {
    const limited = () => FakeBotApiReply.reject({
      description: "Too Many Requests",
      errorCode: 429,
      parameters: { retryAfter: 9 },
    });
    const fake = FakeBotApi.make({
      replies: [limited(), limited(), limited()],
      token,
    });
    const program = Effect.gen(function* () {
      const fiber = yield* Effect.flip(
        sendMessage({ chatId: 11, text: "ratchet" }),
      ).pipe(Effect.forkChild);
      yield* Effect.promise(() => fake.whenCalled("sendMessage"));
      yield* Effect.yieldNow;
      yield* TestClock.adjust("9 seconds");
      yield* TestClock.adjust("9 seconds");
      return yield* Fiber.join(fiber);
    });

    const error = await Effect.runPromise(program.pipe(
      Effect.provide(botLayer(fake)),
      Effect.provide(TestClock.layer()),
    ));

    expect(error.reason).toEqual({
      _tag: "TelegramRejected",
      description: "Too Many Requests",
      errorCode: 429,
      retryAfter: 9,
    });
    expect(error.message).toBe(
      "sendMessage: Telegram rejected the call: 429 Too Many Requests (retry after 9s)",
    );
    expect(error.retrySafe).toBe(true);
    expect(fake.requests).toHaveLength(3);
  });

  test("omits optional parameters set to undefined", async () => {
    const fake = FakeBotApi.make({ token });

    await Effect.runPromise(
      sendMessage({
        chatId: 19,
        parseMode: undefined,
        text: "flywheel",
      }).pipe(Effect.provide(botLayer(fake))),
    );

    expect(fake.requests[0]?.params).toEqual({ chat_id: 19, text: "flywheel" });
  });

  test("marks a transport failure as unsafe to retry", async () => {
    const spans: Array<Tracer.NativeSpan> = [];
    const tracer = Tracer.make({
      span(options) {
        const span = new Tracer.NativeSpan(options);
        spans.push(span);
        return span;
      },
    });
    const fake = FakeBotApi.make({
      replies: [FakeBotApiReply.transportFailure(`failed POST /bot${token}/sendMessage`)],
      token,
    });

    const error = await Effect.runPromise(Effect.flip(
      sendMessage({ chatId: 13, text: "cog" }).pipe(
        Effect.provide(botLayer(fake)),
        Effect.provideService(Tracer.Tracer, tracer),
      ),
    ));

    expect(error.reason).toEqual({
      _tag: "Transport",
      description: "Transport: failed POST /bot<token>/sendMessage (POST https://api.telegram.org/bot<token>/sendMessage)",
    });
    expect(error.message).toBe(
      "sendMessage: no Telegram response: Transport: failed POST /bot<token>/sendMessage (POST https://api.telegram.org/bot<token>/sendMessage)",
    );
    expect(error.retrySafe).toBe(false);
    expect(String(error)).toContain("BotApiError: sendMessage: no Telegram response:");
    expect(String(error)).not.toContain(token);
    expect(JSON.stringify(error)).not.toContain(token);
    expect(JSON.stringify(
      spans.map((span) => ({
        attributes: Object.fromEntries(span.attributes),
        exit: span.status._tag === "Ended" ? String(span.status.exit) : undefined,
        name: span.name,
      })),
    )).not.toContain(token);
    expect(fake.requests).toHaveLength(1);
  });

  test("returns InvalidResponse for a non-Telegram response", async () => {
    const fake = FakeBotApi.make({
      replies: [FakeBotApiReply.body(502, "<html>bad gateway</html>")],
      token,
    });

    const error = await Effect.runPromise(Effect.flip(
      sendMessage({ chatId: 17, text: "bearing" }).pipe(Effect.provide(botLayer(fake))),
    ));

    expect(error.reason._tag).toBe("InvalidResponse");
    expect(error.message).toContain("sendMessage: Telegram returned an invalid response:");
    expect(error.retrySafe).toBe(false);
  });

  test("reports the field path for an invalid method result", async () => {
    const fake = FakeBotApi.make({
      replies: [FakeBotApiReply.ok({ message_id: token })],
      token,
    });

    const error = await Effect.runPromise(Effect.flip(
      sendMessage({ chatId: 23, text: "pinion" }).pipe(Effect.provide(botLayer(fake))),
    ));

    expect(error.reason._tag).toBe("InvalidResponse");
    expect(error.reason.description).toContain("[\"message_id\"]");
    expect(error.message).not.toContain(token);
  });

  test("keeps the raw call as a separate day-zero path", async () => {
    const fake = FakeBotApi.make({ token });
    const program = Effect.gen(function* () {
      const bot = yield* Bot;
      return yield* bot.callRaw("sendMessage", { chat_id: 31, text: "raw-call" });
    }).pipe(Effect.provide(botLayer(fake)));

    const result = await Effect.runPromise(program);

    expect(Predicate.isObject(result) && result["message_id"]).toBe(41);
    expect(fake.requests[0]?.params).toEqual({ chat_id: 31, text: "raw-call" });
  });

  test("Bot.layer applies defaults to generated calls", async () => {
    const fake = FakeBotApi.make({ token });
    const layer = Bot.layer({
      defaults: { disableNotification: true, parseMode: "HTML" },
      token: Redacted.make(token),
    }).pipe(Layer.provide(fake.layer));

    await Effect.runPromise(
      sendMessage({ chatId: 33, text: "<b>direct layer</b>" }).pipe(Effect.provide(layer)),
    );

    expect(fake.requests[0]?.params).toEqual({
      chat_id: 33,
      disable_notification: true,
      parse_mode: "HTML",
      text: "<b>direct layer</b>",
    });
  });

  test("raw calls do not receive generated method defaults", async () => {
    const fake = FakeBotApi.make({ token });
    const layer = Bot.layer({
      defaults: { disableNotification: true, parseMode: "HTML" },
      token: Redacted.make(token),
    }).pipe(Layer.provide(fake.layer));
    const program = Effect.gen(function* () {
      const bot = yield* Bot;
      return yield* bot.callRaw("sendMessage", { chat_id: 35, text: "raw" });
    }).pipe(Effect.provide(layer));

    await Effect.runPromise(program);

    expect(fake.requests[0]?.params).toEqual({ chat_id: 35, text: "raw" });
  });
});

test("outgoing defaults follow each method's generated field subset", async () => {
  const fake = FakeBotApi.make({
    replies: [FakeBotApiReply.ok({
      chat: { id: 47, type: "private" },
      date: 1_700_000_000,
      message_id: 61,
    })],
    token,
  });
  const layer = Bot.layer({
    defaults: {
      disableNotification: true,
      linkPreviewOptions: { isDisabled: true },
      parseMode: "HTML",
      protectContent: true,
    },
    token: Redacted.make(token),
  }).pipe(Layer.provide(fake.layer));

  await Effect.runPromise(forwardMessage({
    chatId: 47,
    fromChatId: 49,
    messageId: 51,
  }).pipe(Effect.provide(layer)));

  expect(fake.requests[0]?.params).toEqual({
    chat_id: 47,
    disable_notification: true,
    from_chat_id: 49,
    message_id: 51,
    protect_content: true,
  });
});

test("caption entities suppress a parse mode default", async () => {
  const fake = FakeBotApi.make({
    replies: [FakeBotApiReply.ok({
      chat: { id: 53, type: "private" },
      date: 1_700_000_001,
      message_id: 63,
    })],
    token,
  });
  const layer = Bot.layer({
    defaults: { parseMode: "HTML" },
    token: Redacted.make(token),
  }).pipe(Layer.provide(fake.layer));

  await Effect.runPromise(sendPhoto({
    caption: "photo",
    captionEntities: [{ length: 5, offset: 0, type: "italic" }],
    chatId: 53,
    photo: "telegram-file-id",
  }).pipe(Effect.provide(layer)));

  expect(fake.requests[0]?.params).toEqual({
    caption: "photo",
    caption_entities: [{ length: 5, offset: 0, type: "italic" }],
    chat_id: 53,
    photo: "telegram-file-id",
  });
});

describe("getMe", () => {
  test("sends an empty Telegram object and decodes the User", async () => {
    const fake = FakeBotApi.make({
      replies: [FakeBotApiReply.ok({
        first_name: "Telly Test",
        future_field: "kept",
        id: 73,
        is_bot: true,
        username: "telly_test_bot",
      })],
      token,
    });

    const user = await Effect.runPromise(getMe().pipe(Effect.provide(botLayer(fake))));

    expect(user.id).toBe(73);
    expect(user.isBot).toBe(true);
    expect(user.firstName).toBe("Telly Test");
    expect(user["future_field"]).toBe("kept");
    expect(fake.requests).toEqual([
      {
        contentType: "application/json",
        method: "getMe",
        params: {},
        tracingDisabled: true,
      },
    ]);
  });

});

describe("read-only methods with optional fields", () => {
  test("sends an empty object and decodes a discriminated union", async () => {
    const fake = FakeBotApi.make({
      replies: [FakeBotApiReply.ok({ type: "default" })],
      token,
    });

    const menuButton = await Effect.runPromise(
      getChatMenuButton({}).pipe(Effect.provide(botLayer(fake))),
    );

    expect(menuButton).toEqual({ type: "default" });
    expect(fake.requests[0]?.params).toEqual({});
  });

  test("sends optional fields that keep their Telegram names", async () => {
    const fake = FakeBotApi.make({
      replies: [FakeBotApiReply.ok({ transactions: [] })],
      token,
    });

    const transactions = await Effect.runPromise(
      getStarTransactions({ limit: 5, offset: 3 }).pipe(Effect.provide(botLayer(fake))),
    );

    expect(transactions.transactions).toEqual([]);
    expect(fake.requests[0]?.params).toEqual({ limit: 5, offset: 3 });
  });
});

test("getChatMemberCount sends the required chat identifier", async () => {
  const fake = FakeBotApi.make({
    replies: [FakeBotApiReply.ok(17)],
    token,
  });

  const count = await Effect.runPromise(
    getChatMemberCount({ chatId: -10073 }).pipe(Effect.provide(botLayer(fake))),
  );

  expect(count).toBe(17);
  expect(fake.requests[0]?.params).toEqual({ chat_id: -10073 });
});

test("getUserProfilePhotos decodes its nested result", async () => {
  const fake = FakeBotApi.make({
    replies: [FakeBotApiReply.ok({ photos: [], total_count: 0 })],
    token,
  });

  const photos = await Effect.runPromise(
    getUserProfilePhotos({ limit: 4, offset: 2, userId: 73 }).pipe(
      Effect.provide(botLayer(fake)),
    ),
  );

  expect(photos.totalCount).toBe(0);
  expect(photos.photos).toEqual([]);
  expect(fake.requests[0]?.params).toEqual({ limit: 4, offset: 2, user_id: 73 });
});

test("setMyDefaultAdministratorRights encodes nested camelCase fields", async () => {
  const fake = FakeBotApi.make({
    replies: [FakeBotApiReply.ok(true)],
    token,
  });
  const rights = {
    canChangeInfo: false,
    canDeleteMessages: false,
    canDeleteStories: false,
    canEditStories: false,
    canInviteUsers: true,
    canManageChat: true,
    canManageVideoChats: false,
    canPostStories: false,
    canPromoteMembers: false,
    canRestrictMembers: false,
    canSendWelcomeMessages: true,
    isAnonymous: false,
  };

  const result = await Effect.runPromise(
    setMyDefaultAdministratorRights({ forChannels: true, rights }).pipe(
      Effect.provide(botLayer(fake)),
    ),
  );

  expect(result).toBe(true);
  expect(fake.requests[0]?.params).toEqual({
    for_channels: true,
    rights: {
      can_change_info: false,
      can_delete_messages: false,
      can_delete_stories: false,
      can_edit_stories: false,
      can_invite_users: true,
      can_manage_chat: true,
      can_manage_video_chats: false,
      can_post_stories: false,
      can_promote_members: false,
      can_restrict_members: false,
      can_send_welcome_messages: true,
      is_anonymous: false,
    },
  });
});

test("sendVenue maps its public location fields to Telegram", async () => {
  const fake = FakeBotApi.make({
    replies: [FakeBotApiReply.ok({
      chat: { id: 113, type: "private" },
      date: 1_700_000_113,
      message_id: 113,
    })],
    token,
  });

  const message = await Effect.runPromise(
    sendVenue({
      address: "113 Gear Street",
      chatId: 113,
      latitude: 12,
      longitude: 34,
      title: "Gear Hall",
    }).pipe(Effect.provide(botLayer(fake))),
  );

  expect(message.messageId).toBe(113);
  expect(fake.requests[0]?.params).toEqual({
    address: "113 Gear Street",
    chat_id: 113,
    latitude: 12,
    longitude: 34,
    title: "Gear Hall",
  });
});

test("answerCallbackQuery sends one consumable query response", async () => {
  const fake = FakeBotApi.make({
    replies: [FakeBotApiReply.ok(true)],
    token,
  });

  const answered = await Effect.runPromise(
    answerCallbackQuery({
      callbackQueryId: "query-127",
      cacheTime: 17,
      showAlert: true,
      text: "Done",
    }).pipe(Effect.provide(botLayer(fake))),
  );

  expect(answered).toBe(true);
  expect(fake.requests[0]?.params).toEqual({
    cache_time: 17,
    callback_query_id: "query-127",
    show_alert: true,
    text: "Done",
  });
});

test("setChatTitle sends request-keyed replacement state", async () => {
  const fake = FakeBotApi.make({
    replies: [FakeBotApiReply.ok(true)],
    token,
  });

  const changed = await Effect.runPromise(
    setChatTitle({ chatId: -100131, title: "Telly Room" }).pipe(
      Effect.provide(botLayer(fake)),
    ),
  );

  expect(changed).toBe(true);
  expect(fake.requests[0]?.params).toEqual({
    chat_id: -100131,
    title: "Telly Room",
  });
});
