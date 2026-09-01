import { mkdtemp, rename, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const entries = [
  ["src/Application.ts", "Application.js", "Application.js"],
  ["src/BotApi.ts", "BotApi.js", "BotApi.js"],
  ["src/CallbackData.ts", "CallbackData.js", "CallbackData.js"],
  ["src/Conversation.ts", "Conversation.js", "Conversation.js"],
  ["src/Conversations.ts", "Conversations.js", "Conversations.js"],
  ["src/ConversationStore.ts", "ConversationStore.js", "ConversationStore.js"],
  ["src/Files.ts", "Files.js", "Files.js"],
  ["src/Inbox.ts", "Inbox.js", "Inbox.js"],
  ["src/Jobs.ts", "Jobs.js", "Jobs.js"],
  ["src/Polling.ts", "Polling.js", "Polling.js"],
  ["src/Routing.ts", "Routing.js", "Routing.js"],
  ["src/SqliteInbox.ts", "SqliteInbox.js", "SqliteInbox.js"],
  ["src/SqliteConversations.ts", "SqliteConversations.js", "SqliteConversations.js"],
  ["src/SqliteJobs.ts", "SqliteJobs.js", "SqliteJobs.js"],
  ["src/internal/JobRuntime.ts", "JobRuntime.js", "JobRuntime.js"],
  ["src/methods.generated.ts", "methods.generated.js", "methods.js"],
  ["src/testing/FakeBotApi.ts", "FakeBotApi.js", "testing.js"],
  ["src/types.generated.ts", "types.generated.js", "types.js"],
  ["src/Webhook.ts", "Webhook.js", "Webhook.js"],
] as const;

const outdir = await mkdtemp(resolve(".telly-dist-"));

try {
  const result = await Bun.build({
    entrypoints: entries.map(([source]) => source),
    format: "esm",
    naming: {
      chunk: "chunks/[name]-[hash].js",
      entry: "[name].js",
    },
    outdir,
    packages: "external",
    splitting: true,
    target: "node",
    throw: false,
  });
  if (!result.success) {
    for (const log of result.logs) console.error(log);
    throw new Error("Failed to build Telly");
  }

  await Promise.all(
    entries.map(([, built, published]) =>
      rename(resolve(outdir, built), resolve(outdir, published))
    ),
  );
  // Bun 1.4 drops imported bindings from re-export-only entries, so write the stable root entry after bundling implementations.
  await writeFile(
    resolve(outdir, "index.js"),
    [
      'export { Application } from "./Application.js";',
      'export { Bot, BotApiError, retryUnknownOutcome } from "./BotApi.js";',
      'export { callbackData, CallbackDataInvalid, CallbackDataTooLong } from "./CallbackData.js";',
      'export { reply, respond } from "./Conversation.js";',
      'export { conversation, Conversation, ConversationConflict, ConversationScopeMissing, conversations, ConversationStateInvalid } from "./Conversations.js";',
      'export { ConversationStore, ConversationStoreError, MemoryConversations } from "./ConversationStore.js";',
      'export { downloadFile } from "./Files.js";',
      'export { DispatchLeaseLost, InboxStore, InboxStoreError, MemoryInbox } from "./Inbox.js";',
      'export { defineJobs, InvalidJobPayload, InvalidJobSchedule, job, JobCapacityExceeded, JobConflict, JobLeaseLost, JobStore, JobStoreError, MemoryJobs } from "./Jobs.js";',
      'export { runJobWorker } from "./JobRuntime.js";',
      'export { pollInboxUpdates, pollUpdates } from "./Polling.js";',
      'export { SqliteInbox } from "./SqliteInbox.js";',
      'export { SqliteConversations } from "./SqliteConversations.js";',
      'export { SqliteJobs } from "./SqliteJobs.js";',
      'export { callbackQuery, chatType, command, defineBot, every, Filter, media, mention, on, regex, repliedMessage, routes, text } from "./Routing.js";',
      'export * from "./methods.js";',
      'export * from "./types.js";',
      'export * as Effect from "effect/Effect";',
      'export * as Schema from "effect/Schema";',
      "",
    ].join("\n"),
  );
  const sourceRoot = await import(new URL("../index.ts", import.meta.url).href);
  const builtRoot = await import(pathToFileURL(resolve(outdir, "index.js")).href);
  const sourceExports = Object.keys(sourceRoot).sort();
  const builtExports = Object.keys(builtRoot).sort();
  if (JSON.stringify(sourceExports) !== JSON.stringify(builtExports)) {
    throw new Error("Built root exports do not match index.ts");
  }
  await rm(resolve("dist"), { force: true, recursive: true });
  await rename(outdir, resolve("dist"));
} catch (error) {
  await rm(outdir, { force: true, recursive: true });
  throw error;
}
