import { spawn } from "node:child_process";
import { randomUUID } from "node:crypto";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { acquireTelegramTestCredential } from "../../.agents/skills/telegram-e2e-userbot/scripts/telegram-test-credential.mjs";
import { startTelegramTestApiProxy } from "../../.agents/skills/telegram-e2e-userbot/scripts/telegram-test-api-proxy.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const skillScripts = path.join(repoRoot, ".agents/skills/telegram-e2e-userbot/scripts");
const convexProjectDir = process.env.TELLY_E2E_CONVEX_PROJECT_DIR ??
  path.resolve(repoRoot, "../openclaw/qa/convex-credential-broker");
const scratch = await mkdtemp(path.join(tmpdir(), "telly-sed-e2e."));
const eventsPath = path.join(scratch, "events.ndjson");
const summaryPath = path.join(scratch, "summary.json");
const scenarioPath = path.join(scratch, "scenario.json");
const proofPath = path.join(repoRoot, "runtime/proofs/superseriousbot-sed/2026-08-31.json");
const run = randomUUID();
const sourceText = `old wheel old axle ${run}`;
const correctedText = `new wheel new axle ${run}`;
let credential;
let proxy;
let recorder;
let sut;

function waitForChild(child, label) {
  return new Promise((resolve, reject) => {
    child.once("error", reject);
    child.once("exit", (code, signal) => {
      if (code === 0) resolve({ code, signal });
      else reject(new Error(`${label} exited with code ${String(code)} signal ${String(signal)}`));
    });
  });
}

function waitForReady(child) {
  return new Promise((resolve, reject) => {
    let output = "";
    const timeout = setTimeout(() => reject(new Error("Sed bot did not become ready")), 15_000);
    child.stdout.setEncoding("utf8");
    child.stdout.on("data", (chunk) => {
      output += chunk;
      if (output.includes("ready\n")) {
        clearTimeout(timeout);
        resolve();
      }
    });
    child.once("exit", () => {
      clearTimeout(timeout);
      reject(new Error("Sed bot exited before readiness"));
    });
  });
}

function requireEvent(events, predicate, label) {
  const event = events.find(predicate);
  if (event === undefined) throw new Error(`Missing Telegram event: ${label}`);
  return event;
}

try {
  credential = await acquireTelegramTestCredential({ convexProjectDir });
  proxy = await startTelegramTestApiProxy({
    leaseHealth: {
      assertHealthy: credential.assertLeaseHealthy,
      whenUnhealthy: credential.whenLeaseUnhealthy,
    },
  });
  await proxy.drainUpdates(credential.sutToken);
  sut = spawn("bun", ["run", "./scripts/e2e/fixtures/superseriousbot-sed-sut.mjs"], {
    cwd: repoRoot,
    env: {
      ...process.env,
      TELLY_E2E_API_ROOT: proxy.apiRoot,
      TELLY_E2E_BOT_TOKEN: credential.sutToken,
      TELLY_E2E_DATABASE_PATH: path.join(scratch, "inbox.db"),
    },
    stdio: ["ignore", "pipe", "pipe"],
  });
  const sutCompletion = waitForChild(sut, "Sed bot");
  void sutCompletion.catch(() => undefined);
  await waitForReady(sut);

  await writeFile(scenarioPath, `${JSON.stringify({
    actions: [
      { atMs: 0, text: sourceText, type: "send" },
      { atMs: 1_000, replyToAction: 0, text: "s/old/new", type: "send" },
      { atMs: 2_000, replyToAction: 0, text: "s/new", type: "send" },
    ],
  }, null, 2)}\n`);
  recorder = spawn("uv", [
    "run",
    path.join(skillScripts, "user-record.py"),
    "--scenario",
    scenarioPath,
    "--seconds",
    "5",
    "--record",
    eventsPath,
    "--output",
    summaryPath,
    "--chat",
    `@${credential.sutUsername}`,
    "--sut-user-id",
    credential.sutBotId,
  ], {
    cwd: repoRoot,
    env: { ...process.env, ...credential.driverEnv },
    stdio: ["ignore", "pipe", "pipe"],
  });
  await waitForChild(recorder, "Telegram recorder");
  recorder = undefined;
  credential.assertLeaseHealthy();

  const events = (await readFile(eventsPath, "utf8"))
    .split(/\r?\n/u)
    .filter(Boolean)
    .map((line) => JSON.parse(line));
  const source = requireEvent(
    events,
    (event) => event.kind === "action" && event.text === sourceText,
    "source message",
  );
  const command = requireEvent(
    events,
    (event) => event.kind === "action" && event.text === "s/old/new",
    "sed reply",
  );
  const commandMessage = requireEvent(
    events,
    (event) => event.kind === "message" && event.messageId === command.messageId,
    "sed reply message",
  );
  const corrected = requireEvent(
    events,
    (event) => event.kind === "message" && event.isSut === true && event.text === correctedText,
    "corrected bot reply",
  );
  const invalid = requireEvent(
    events,
    (event) => event.kind === "action" && event.text === "s/new",
    "invalid sed reply",
  );
  if (commandMessage.replyToMessageId !== source.messageId) {
    throw new Error("Sed action did not reply to the source message");
  }
  if (corrected.replyToMessageId !== source.messageId) {
    throw new Error("Sed result did not quote the source message");
  }
  if (events.some((event) =>
    event.kind === "message" && event.isSut === true && event.elapsedMs > invalid.elapsedMs
  )) {
    throw new Error("Invalid sed expression produced a bot response");
  }

  sut.kill("SIGTERM");
  const stopped = await sutCompletion;
  sut = undefined;
  const proof = {
    feature: "superseriousbot-sed",
    passed: true,
    recorded_time: new Date().toISOString(),
    schemaVersion: 1,
    timeline: [
      { botApiMessageId: source.botApiMessageId, kind: "source_message", text: source.text },
      {
        botApiMessageId: command.botApiMessageId,
        kind: "sed_reply",
        quotedBotApiMessageId: source.botApiMessageId,
        text: command.text,
      },
      {
        botApiMessageId: corrected.botApiMessageId,
        kind: "corrected_reply",
        quotedBotApiMessageId: source.botApiMessageId,
        text: corrected.text,
      },
      { kind: "invalid_expression", observation: "no later SUT response" },
      { exitCode: stopped.code, kind: "graceful_shutdown", signal: "SIGTERM" },
    ],
  };
  const serialized = `${JSON.stringify(proof, null, 2)}\n`;
  for (const secret of [credential.sutToken, credential.sutUsername]) {
    if (serialized.includes(secret)) throw new Error("Sed proof contains a secret");
  }
  await mkdir(path.dirname(proofPath), { recursive: true });
  await writeFile(proofPath, serialized);
  console.log(JSON.stringify({ ok: true, proof }));
} finally {
  if (recorder?.exitCode === null) recorder.kill("SIGTERM");
  if (sut?.exitCode === null) sut.kill("SIGTERM");
  await proxy?.close();
  await credential?.release();
  await rm(scratch, { force: true, recursive: true });
}
