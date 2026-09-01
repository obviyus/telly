import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { once } from "node:events";
import { spawn } from "node:child_process";
import { tmpdir } from "node:os";
import { join } from "node:path";

const [root, testing] = await Promise.all([
  import("telly"),
  import("telly/testing"),
]);

if (!root.Application || !root.Bot || !root.BotApiError || !root.Filter) {
  throw new Error("telly application exports are incomplete");
}
if (!root.defineJobs || !root.job || !root.MemoryJobs || !root.SqliteJobs || !root.Schema) {
  throw new Error("telly job exports are incomplete");
}
if (
  !root.command ||
  !root.defineBot ||
  !root.every ||
  !root.on ||
  !root.reply ||
  !root.respond ||
  !root.routes ||
  !root.text
) {
  throw new Error("telly routing exports are incomplete");
}
if (!root.getMe || !root.sendMessage || !root.SendMessageParams) {
  throw new Error("telly method exports are incomplete");
}
if (!testing.FakeBotApi || !testing.FakeBotApiReply) {
  throw new Error("telly/testing exports are incomplete");
}
if (!root.Message || !root.Chat || !root.User) {
  throw new Error("telly type exports are incomplete");
}
const overrides = JSON.parse(readFileSync(
  new URL("../bot-api/schema/overrides.json", import.meta.url),
  "utf8",
));
for (const method of Object.keys(overrides.methods)) {
  if (typeof root[method] !== "function") {
    throw new Error(`telly root does not export ${method}`);
  }
}

for (const removedPath of ["telly/methods", "telly/types"]) {
  try {
    await import(removedPath);
    throw new Error(`${removedPath} is still public`);
  } catch (error) {
    if (error?.code !== "ERR_PACKAGE_PATH_NOT_EXPORTED") throw error;
  }
}

const { Effect, Layer, Redacted } = await import("effect");
const token = "123456:node-smoke";
const fake = testing.FakeBotApi.make({ token });
const bot = root.Bot.layer({ token: Redacted.make(token) }).pipe(Layer.provide(fake.layer));
const message = await Effect.runPromise(
  root.sendMessage({ chatId: 29, text: "node-smoke" }).pipe(Effect.provide(bot)),
);
if (message.messageId !== 41 || message.chat.id !== 29 || message.text !== "node-smoke") {
  throw new Error("sendMessage failed under Node.js");
}
fake.enqueue(testing.FakeBotApiReply.ok({
  first_name: "Node Smoke",
  id: 59,
  is_bot: true,
}));
const botUser = await Effect.runPromise(root.getMe().pipe(Effect.provide(bot)));
if (botUser.id !== 59 || botUser.firstName !== "Node Smoke" || botUser.isBot !== true) {
  throw new Error("getMe failed under Node.js");
}
fake.enqueue(testing.FakeBotApiReply.ok({
  file_id: "node-file",
  file_path: "documents/node.bin",
  file_unique_id: "node-unique",
}));
fake.enqueue(testing.FakeBotApiReply.file(new Uint8Array([2, 7, 1, 8])));
const fileBytes = await Effect.runPromise(
  root.downloadFile({ fileId: "node-file" }).pipe(Effect.provide(bot)),
);
if (!(fileBytes instanceof Uint8Array) || fileBytes.join(",") !== "2,7,1,8") {
  throw new Error("downloadFile failed under Node.js");
}
fake.enqueue(testing.FakeBotApiReply.ok({
  chat: { id: 61, type: "private" },
  date: 1_700_000_000,
  message_id: 109,
}));
const photoMessage = await Effect.runPromise(
  root.sendPhoto({
    chatId: 61,
    photo: new File([new Uint8Array([1, 0, 9])], "node.png", { type: "image/png" }),
  }).pipe(Effect.provide(bot)),
);
if (photoMessage.messageId !== 109 || fake.requests.at(-1)?.contentType !== "multipart/form-data") {
  throw new Error("sendPhoto multipart failed under Node.js");
}

const invalidFake = testing.FakeBotApi.make({
  replies: [testing.FakeBotApiReply.ok({ message_id: "invalid" })],
  token,
});
const invalidBot = root.Bot.layer({ token: Redacted.make(token) }).pipe(
  Layer.provide(invalidFake.layer),
);
const invalidResult = await Effect.runPromise(
  Effect.flip(
    root.sendMessage({ chatId: 31, text: "invalid-result" }).pipe(
      Effect.provide(invalidBot),
    ),
  ),
);
if (!(invalidResult instanceof root.BotApiError)) {
  throw new Error("telly uses different BotApiError classes across root exports");
}
if (!invalidResult.message.includes("message_id") || invalidResult.retrySafe !== false) {
  throw new Error("BotApiError diagnostics failed under Node.js");
}

const applicationFake = testing.FakeBotApi.make({
  nextMessageId: 47,
  token,
});
const app = root.Application.make({
  httpClient: applicationFake.layer,
  token,
});
try {
  const applicationMessage = await app.run(
    root.sendMessage({ chatId: 41, text: "application-node-smoke" }),
  );
  if (applicationMessage.messageId !== 47 || applicationMessage.chat.id !== 41) {
    throw new Error("Application failed under Node.js");
  }
} finally {
  await app.close();
}

const pollingFake = testing.FakeBotApi.make({
  replies: [
    testing.FakeBotApiReply.ok([{
      message: {
        chat: { id: 53, type: "private" },
        date: 1_700_000_000,
        entities: [{ length: 22, offset: 0, type: "bot_command" }],
        message_id: 117,
        text: "/ping@node_polling_bot node-polling",
      },
      update_id: 117,
    }]),
    testing.FakeBotApiReply.ok({
      first_name: "Node Polling Bot",
      id: 7002,
      is_bot: true,
      username: "node_polling_bot",
    }),
  ],
  token,
});
const pollingApp = root.Application.make({
  httpClient: pollingFake.layer,
  token,
});
const definedBot = root.defineBot({
  commands: {
    ping: ({ message, argText }) => root.respond(message, `pong ${argText}`),
  },
});
const running = pollingApp.runPolling(
  definedBot,
  { concurrency: 1 },
);
try {
  const sent = await pollingFake.whenCalled("sendMessage");
  if (sent.params.chat_id !== 53 || sent.params.text !== "pong node-polling") {
    throw new Error("Application polling failed under Node.js");
  }
  await pollingApp.stop();
  await running;
} finally {
  await pollingApp.close();
}

const jobFake = testing.FakeBotApi.make({ token });
const jobs = root.defineJobs({
  reminder: root.job({
    payload: root.Schema.Struct({ chatId: root.Schema.Int, text: root.Schema.String }),
    run: ({ chatId, text }) => root.sendMessage({ chatId, text }),
  }),
}, { store: root.MemoryJobs.make() });
const jobApp = root.Application.make({
  httpClient: jobFake.layer,
  jobs,
  token,
});
await jobApp.run(jobs.schedule("reminder", {
  id: "node-job",
  payload: { chatId: 62, text: "node scheduled job" },
}));
jobApp.startPolling(() => Effect.void);
try {
  const sent = await jobFake.whenCalled("sendMessage");
  if (sent.params.chat_id !== 62 || sent.params.text !== "node scheduled job") {
    throw new Error("Application jobs failed under Node.js");
  }
} finally {
  await jobApp.close();
}

const signalChild = spawn(
  process.execPath,
  [new URL("./run-polling-signal-smoke.mjs", import.meta.url).pathname],
  { stdio: ["ignore", "pipe", "pipe"], timeout: 5_000 },
);
signalChild.stdout.setEncoding("utf8");
signalChild.stderr.setEncoding("utf8");
let signalOutput = "";
let signalError = "";
const signalReady = new Promise((resolve) => {
  signalChild.stdout.on("data", (chunk) => {
    signalOutput += chunk;
    if (signalOutput.includes("ready\n")) resolve();
  });
});
signalChild.stderr.on("data", (chunk) => {
  signalError += chunk;
});
const signalExited = once(signalChild, "exit");
await Promise.race([
  signalReady,
  signalExited.then(() => {
    throw new Error(`runPolling signal child exited before ready: ${signalError}`);
  }),
]);
signalChild.kill("SIGTERM");
const [signalExitCode] = await signalExited;
if (signalExitCode !== 0 || !signalOutput.includes("stopped\n")) {
  throw new Error(`runPolling signal smoke failed: stdout=${signalOutput} stderr=${signalError}`);
}

const webhookFake = testing.FakeBotApi.make({ token });
const webhookApp = root.Application.make({ httpClient: webhookFake.layer, token });
const webhookBot = root.defineBot({
  text: ({ message, text }) => root.respond(message, `webhook:${text}`),
});
const webhook = webhookApp.startWebhook(webhookBot, { secretToken: "node_webhook_secret" });
try {
  const delivered = await webhook.fetch(new Request("https://example.test/telegram", {
    body: JSON.stringify({
      message: {
        chat: { id: 63, type: "private" },
        date: 1_700_000_000,
        message_id: 118,
        text: "node-webhook",
      },
      update_id: 118,
    }),
    headers: {
      "content-type": "application/json",
      "x-telegram-bot-api-secret-token": "node_webhook_secret",
    },
    method: "POST",
  }));
  if (
    delivered.status !== 200 ||
    webhookFake.requests.at(-1)?.params.text !== "webhook:node-webhook"
  ) {
    throw new Error("Application webhook failed under Node.js");
  }
  await webhook.stop();
  await webhook.completed;
} finally {
  await webhookApp.close();
}

const sqliteDirectory = mkdtempSync(join(tmpdir(), "telly-node-sqlite."));
const sqlitePath = join(sqliteDirectory, "inbox.db");
let sqliteInbox = await root.SqliteInbox.open(sqlitePath);
try {
  const saved = await Effect.runPromise(sqliteInbox.save({
    botId: 123456,
    capacity: 10,
    conversationKey: "chat:node",
    payload: { update_id: 501 },
    updateId: 501,
  }));
  if (saved._tag !== "Stored") throw new Error("Node SQLite inbox did not save");
  sqliteInbox.close();
  sqliteInbox = await root.SqliteInbox.open(sqlitePath);
  const lease = await Effect.runPromise(sqliteInbox.acquire({ botId: 123456, leaseMs: 30_000 }));
  if (lease._tag !== "Acquired") throw new Error("Node SQLite inbox lease was not acquired");
  const claimed = await Effect.runPromise(sqliteInbox.claim({
    botId: 123456,
    fencingToken: lease.fencingToken,
    limit: 1,
  }));
  if (claimed[0]?.updateId !== 501) throw new Error("Node SQLite inbox did not replay");
} finally {
  sqliteInbox.close();
}

const sqliteJobsPath = join(sqliteDirectory, "jobs.db");
const sqliteJobs = await root.SqliteJobs.open(sqliteJobsPath);
try {
  const saved = await Effect.runPromise(sqliteJobs.save({
    botId: 123456,
    capacity: 10,
    fingerprint: "node-job",
    id: "node-job",
    name: "reminder",
    payload: { text: "persisted" },
    runAtMs: 0,
    schedule: { _tag: "Once" },
  }));
  if (saved._tag !== "Stored") throw new Error("Node SQLite jobs did not save");
} finally {
  sqliteJobs.close();
  rmSync(sqliteDirectory, { force: true, recursive: true });
}
