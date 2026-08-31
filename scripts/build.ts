import { mkdtemp, rename, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const entries = [
  ["src/Application.ts", "Application.js", "Application.js"],
  ["src/BotApi.ts", "BotApi.js", "BotApi.js"],
  ["src/Conversation.ts", "Conversation.js", "Conversation.js"],
  ["src/Files.ts", "Files.js", "Files.js"],
  ["src/Polling.ts", "Polling.js", "Polling.js"],
  ["src/Routing.ts", "Routing.js", "Routing.js"],
  ["src/methods.generated.ts", "methods.generated.js", "methods.js"],
  ["src/testing/FakeBotApi.ts", "FakeBotApi.js", "testing.js"],
  ["src/types.generated.ts", "types.generated.js", "types.js"],
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
      'export { Bot, BotApiError } from "./BotApi.js";',
      'export { reply, respond } from "./Conversation.js";',
      'export { downloadFile } from "./Files.js";',
      'export { pollUpdates } from "./Polling.js";',
      'export { callbackQuery, command, defineBot, every, Filter, on, routes, text } from "./Routing.js";',
      'export * from "./methods.js";',
      'export * from "./types.js";',
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
