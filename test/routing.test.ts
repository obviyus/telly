import { expect, test } from "bun:test";
import { Effect, Fiber, Layer, Redacted } from "effect";

import {
  Application,
  Bot,
  BotApiError,
  callbackQuery,
  command,
  every,
  Filter,
  on,
  routes,
  text,
  type Filter as RoutingFilter,
  type Update,
} from "../index.ts";
import { FakeBotApi, FakeBotApiReply } from "../testing.ts";

const token = "123456:routing-test";

function botIdentity(username = "telly_test_bot") {
  return {
    first_name: "Telly Test",
    id: 7001,
    is_bot: true,
    username,
  };
}

function messageUpdate(
  textValue: string,
  options: {
    readonly caption?: boolean;
    readonly edited?: boolean;
    readonly entityLength?: number;
    readonly updateId?: number;
  } = {},
): Update {
  const updateId = options.updateId ?? 101;
  const message = {
    chat: { id: 501, type: "private" as const },
    date: 1_700_000_000,
    messageId: updateId,
    ...(options.caption === true
      ? {
          caption: textValue,
          ...(options.entityLength === undefined
            ? {}
            : {
                captionEntities: [{
                  length: options.entityLength,
                  offset: 0,
                  type: "bot_command" as const,
                }],
              }),
        }
      : {
          ...(options.entityLength === undefined
            ? {}
            : {
                entities: [{
                  length: options.entityLength,
                  offset: 0,
                  type: "bot_command" as const,
                }],
              }),
          text: textValue,
        }),
  };
  return {
    ...(options.edited === true ? { editedMessage: message } : { message }),
    updateId,
  };
}

test("command extracts normalized command and both argument forms", async () => {
  const fake = FakeBotApi.make({
    replies: [FakeBotApiReply.ok(botIdentity())],
    token,
  });
  const app = Application.make({ httpClient: fake.layer, token });
  let observed:
    | { readonly argText: string; readonly args: ReadonlyArray<string>; readonly command: string }
    | undefined;
  const handler = routes(
    on(command("echo"), (match) =>
      Effect.sync(() => {
        observed = match;
      })),
  );

  try {
    await app.run(handler(messageUpdate("/ECHO  hello   🌍 \n", { entityLength: 5 })));
  } finally {
    await app.close();
  }

  expect(observed).toMatchObject({
    argText: "hello   🌍 \n",
    args: ["hello", "🌍"],
    command: "echo",
  });
});

test("command accepts this bot target and rejects another bot target", async () => {
  const fake = FakeBotApi.make({
    replies: [FakeBotApiReply.ok(botIdentity())],
    token,
  });
  const app = Application.make({ httpClient: fake.layer, token });
  let handled = 0;
  let textHandled = 0;
  const firstRoutes = routes(
    on(command("start"), () => Effect.sync(() => {
      handled += 1;
    })),
  );
  const secondRoutes = routes(
    on(command("start"), () => Effect.sync(() => {
      handled += 1;
    })),
    on(text(), () => Effect.sync(() => {
      textHandled += 1;
    })),
  );

  try {
    await app.run(firstRoutes(messageUpdate("/start@telly_test_bot", { entityLength: 21 })));
    await app.run(secondRoutes(messageUpdate("/start@other_bot", {
      entityLength: 16,
      updateId: 102,
    })));
  } finally {
    await app.close();
  }

  expect(handled).toBe(1);
  expect(textHandled).toBe(0);
  expect(fake.requests.filter((call) => call.method === "getMe")).toHaveLength(1);
});

test("bot identity retries after a failed lookup", async () => {
  const fake = FakeBotApi.make({
    replies: [
      FakeBotApiReply.transportFailure("temporary identity failure"),
      FakeBotApiReply.ok(botIdentity()),
    ],
    token,
  });
  const app = Application.make({ httpClient: fake.layer, token });
  let handled = false;
  const handler = routes(
    on(command("start"), () => Effect.sync(() => {
      handled = true;
    })),
  );

  try {
    await expect(app.run(handler(messageUpdate("/start@telly_test_bot", {
      entityLength: 21,
    })))).rejects
      .toBeInstanceOf(BotApiError);
    await app.run(handler(messageUpdate("/start@telly_test_bot", {
      entityLength: 21,
      updateId: 103,
    })));
  } finally {
    await app.close();
  }

  expect(handled).toBe(true);
  expect(fake.requests.filter((call) => call.method === "getMe")).toHaveLength(2);
});

test("bot identity shares one lookup and survives an interrupted owner", async () => {
  const fake = FakeBotApi.make({
    replies: [
      FakeBotApiReply.hang(),
      FakeBotApiReply.ok(botIdentity()),
    ],
    token,
  });
  const layer = Bot.layer({ token: Redacted.make(token) }).pipe(
    Layer.provide(fake.layer),
  );
  const result = await Effect.runPromise(
    Effect.gen(function* () {
      const bot = yield* Bot;
      const owner = yield* Effect.forkChild(bot.me);
      yield* Effect.promise(() => fake.whenCalled("getMe"));
      const waiter = yield* Effect.forkChild(bot.me);
      yield* Effect.yieldNow;
      const requestsBeforeInterrupt = fake.requests.filter(
        (call) => call.method === "getMe"
      ).length;
      yield* Fiber.interrupt(owner);
      const identity = yield* Fiber.join(waiter);
      return { identity, requestsBeforeInterrupt };
    }).pipe(Effect.provide(layer)),
  );

  expect(result.requestsBeforeInterrupt).toBe(1);
  expect(result.identity.username).toBe("telly_test_bot");
  expect(fake.requests.filter((call) => call.method === "getMe")).toHaveLength(2);
});

test("identity-free filters make no hidden Bot API call", async () => {
  const fake = FakeBotApi.make({ token });
  const app = Application.make({ httpClient: fake.layer, token });
  const observed: Array<string> = [];
  const handler = routes(
    on(text(), ({ text: body }) => Effect.sync(() => {
      observed.push(body);
    })),
    on(callbackQuery(), ({ callbackQuery: query }) => Effect.sync(() => {
      observed.push(query.data ?? "missing-data");
    })),
  );
  const queryUpdate: Update = {
    callbackQuery: {
      chatInstance: "query-chat",
      data: "confirm",
      from: { firstName: "Ada", id: 77, isBot: false },
      id: "callback-1",
    },
    updateId: 105,
  };

  try {
    await app.run(handler(messageUpdate("ordinary text", { updateId: 104 })));
    await app.run(handler(queryUpdate));
  } finally {
    await app.close();
  }

  expect(observed).toEqual(["ordinary text", "confirm"]);
  expect(fake.requests).toEqual([]);
});

test("command excludes edited messages and captions", async () => {
  const fake = FakeBotApi.make({
    replies: [FakeBotApiReply.ok(botIdentity())],
    token,
  });
  const app = Application.make({ httpClient: fake.layer, token });
  let handled = 0;
  const handler = routes(
    on(command("start"), () => Effect.sync(() => {
      handled += 1;
    })),
  );

  try {
    await app.run(handler(messageUpdate("/start", {
      edited: true,
      entityLength: 6,
      updateId: 106,
    })));
    await app.run(handler(messageUpdate("/start", {
      caption: true,
      entityLength: 6,
      updateId: 107,
    })));
  } finally {
    await app.close();
  }

  expect(handled).toBe(0);
});

test("routes runs only its first matching route", async () => {
  const fake = FakeBotApi.make({ token });
  const app = Application.make({ httpClient: fake.layer, token });
  const handled: Array<string> = [];
  const always = Filter.make((update) => update);
  const handler = routes(
    on(always, () => Effect.sync(() => {
      handled.push("first");
    })),
    on(always, () => Effect.sync(() => {
      handled.push("second");
    })),
  );

  try {
    await app.run(handler(messageUpdate("hello", { updateId: 108 })));
  } finally {
    await app.close();
  }

  expect(handled).toEqual(["first"]);
});

test("every runs each handler in order while routes may do nothing", async () => {
  const fake = FakeBotApi.make({ token });
  const app = Application.make({ httpClient: fake.layer, token });
  const handled: Array<string> = [];
  const handler = every(
    () => Effect.sync(() => {
      handled.push("observe");
    }),
    routes(on(Filter.make(() => undefined), () => Effect.void)),
    () => Effect.sync(() => {
      handled.push("after");
    }),
  );

  try {
    await app.run(handler(messageUpdate("hello", { updateId: 109 })));
  } finally {
    await app.close();
  }

  expect(handled).toEqual(["observe", "after"]);
});

test("every stops after a typed handler failure", async () => {
  class PhaseError extends Error {}
  const fake = FakeBotApi.make({ token });
  const app = Application.make({ httpClient: fake.layer, token });
  const handled: Array<string> = [];
  const handler = every(
    () => Effect.sync(() => {
      handled.push("before");
    }),
    () => Effect.fail(new PhaseError("phase failed")),
    () => Effect.sync(() => {
      handled.push("after");
    }),
  );

  try {
    await expect(app.run(handler(messageUpdate("hello", { updateId: 110 })))).rejects
      .toBeInstanceOf(PhaseError);
  } finally {
    await app.close();
  }

  expect(handled).toEqual(["before"]);
});

test("filter combinators preserve extracted values", async () => {
  const fake = FakeBotApi.make({ token });
  const app = Application.make({ httpClient: fake.layer, token });
  const positiveId: RoutingFilter<number> = Filter.make((update) =>
    update.updateId > 0 ? update.updateId : undefined
  );
  const label = Filter.make((update) => update.message?.text);
  const never = Filter.make(() => undefined);
  const observed: Array<unknown> = [];
  const handler = every(
    routes(on(Filter.and(positiveId, label), (match) => Effect.sync(() => {
      observed.push(match);
    }))),
    routes(on(Filter.or(never, label), (match) => Effect.sync(() => {
      observed.push(match);
    }))),
    routes(on(Filter.not(never), (match) => Effect.sync(() => {
      observed.push(match.updateId);
    }))),
  );

  try {
    await app.run(handler(messageUpdate("filter-text", { updateId: 111 })));
  } finally {
    await app.close();
  }

  expect(observed).toEqual([[111, "filter-text"], "filter-text", 111]);
});

test("command rejects an invalid Telegram command name at construction", () => {
  expect(() => command("/start")).toThrow("Invalid Telegram bot command: /start");
  expect(() => command("contains-dash")).toThrow(
    "Invalid Telegram bot command: contains-dash",
  );
});
