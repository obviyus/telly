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
if ("runJobWorker" in root) {
  throw new Error("telly exposes its internal job worker");
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
if (
  !root.messageEntities || !root.messageMedia || !root.messageReply || !root.messageSender ||
  !root.messageText || !root.updateContext
) {
  throw new Error("telly message helper exports are incomplete");
}
if (!root.answerCallback || !root.callbackTarget || !root.html || !root.markdownV2) {
  throw new Error("telly callback and formatting helper exports are incomplete");
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
}

const sqliteConversationsPath = join(sqliteDirectory, "conversations.db");
const sqliteConversations = await root.SqliteConversations.open(sqliteConversationsPath);
try {
  const committed = await Effect.runPromise(sqliteConversations.commit({
    botId: 123456,
    expected: "any",
    scope: "chat:1:user:2",
    next: { conversation: "node", state: { step: 1 }, step: "active" },
  }));
  const loaded = await Effect.runPromise(sqliteConversations.load({
    botId: 123456,
    scope: "chat:1:user:2",
  }));
  if (committed !== "Committed" || loaded?.version !== 1) {
    throw new Error("Node SQLite conversations did not persist");
  }
} finally {
  sqliteConversations.close();
  rmSync(sqliteDirectory, { force: true, recursive: true });
}
