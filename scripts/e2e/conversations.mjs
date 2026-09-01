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
const scratch = await mkdtemp(path.join(tmpdir(), "telly-conversations-e2e."));
const databasePath = path.join(scratch, "conversations.db");
const proofPath = path.join(repoRoot, "runtime/proofs/conversations/2026-09-01.json");
const run = randomUUID();
const commandText = `/order ${run}`;
const confirmText = `confirm:${run}`;
const notePrompt = `note:${run}`;
const noteText = `extra-${run}`;
const doneText = `done:${run}:${noteText}`;
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
    const timeout = setTimeout(() => reject(new Error("Conversation bot did not become ready")), 15_000);
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
      reject(new Error("Conversation bot exited before readiness"));
    });
  });
}

async function startSut() {
  const child = spawn("bun", ["run", "./scripts/e2e/fixtures/conversations-sut.mjs"], {
    cwd: repoRoot,
    env: {
      ...process.env,
      TELLY_E2E_API_ROOT: proxy.apiRoot,
      TELLY_E2E_BOT_TOKEN: credential.sutToken,
      TELLY_E2E_DATABASE_PATH: databasePath,
    },
    stdio: ["ignore", "pipe", "pipe"],
  });
  const completion = waitForChild(child, "Conversation bot");
  void completion.catch(() => undefined);
  await waitForReady(child);
  return { child, completion };
}

async function recordScenario(name, actions, seconds) {
  const eventsPath = path.join(scratch, `${name}.ndjson`);
  const summaryPath = path.join(scratch, `${name}-summary.json`);
  const scenarioPath = path.join(scratch, `${name}-scenario.json`);
  await writeFile(scenarioPath, `${JSON.stringify({ actions }, null, 2)}\n`);
  recorder = spawn("uv", [
    "run",
    path.join(skillScripts, "user-record.py"),
    "--scenario",
    scenarioPath,
    "--seconds",
    String(seconds),
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
  await waitForChild(recorder, `Telegram recorder ${name}`);
  recorder = undefined;
  return (await readFile(eventsPath, "utf8"))
    .split(/\r?\n/u)
    .filter(Boolean)
    .map((line) => JSON.parse(line));
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

  let running = await startSut();
  sut = running.child;
  const firstEvents = await recordScenario("enter", [
    { atMs: 0, text: commandText, type: "send" },
    {
      atMs: 1_000,
      buttonText: "Yes",
      messageText: confirmText,
      timeoutMs: 3_000,
      type: "click",
    },
  ], 5);
  credential.assertLeaseHealthy();
  const command = requireEvent(
    firstEvents,
    (event) => event.kind === "action" && event.text === commandText,
    "order command",
  );
  const confirmation = requireEvent(
    firstEvents,
    (event) => event.kind === "message" && event.isSut === true && event.text === confirmText,
    "confirmation keyboard",
  );
  const click = requireEvent(
    firstEvents,
    (event) => event.kind === "action" && event.actionType === "click" &&
      event.buttonText === "Yes" && event.status === "completed",
    "completed callback click",
  );
  const prompt = requireEvent(
    firstEvents,
    (event) => event.kind === "message" && event.isSut === true && event.text === notePrompt,
    "note prompt",
  );

  sut.kill("SIGTERM");
  const firstStop = await running.completion;
  sut = undefined;

  running = await startSut();
  sut = running.child;
  const secondEvents = await recordScenario("resume", [
    { atMs: 0, text: noteText, type: "send" },
  ], 4);
  credential.assertLeaseHealthy();
  const note = requireEvent(
    secondEvents,
    (event) => event.kind === "action" && event.text === noteText,
    "note message after restart",
  );
  const done = requireEvent(
    secondEvents,
    (event) => event.kind === "message" && event.isSut === true && event.text === doneText,
    "completed conversation",
  );
  sut.kill("SIGTERM");
  const secondStop = await running.completion;
  sut = undefined;

  const proof = {
    feature: "durable-conversations-and-callback-data",
    passed: true,
    recorded_time: new Date().toISOString(),
    schemaVersion: 1,
    timeline: [
      { botApiMessageId: command.botApiMessageId, kind: "conversation_entry", text: command.text },
      {
        botApiMessageId: confirmation.botApiMessageId,
        button: "Yes",
        kind: "typed_callback_button",
        text: confirmation.text,
      },
      { actionStatus: click.status, button: click.buttonText, kind: "callback_click" },
      { botApiMessageId: prompt.botApiMessageId, kind: "next_step_prompt", text: prompt.text },
      { exitCode: firstStop.code, kind: "application_restart", signal: "SIGTERM" },
      { botApiMessageId: note.botApiMessageId, kind: "resumed_text_step", text: note.text },
      { botApiMessageId: done.botApiMessageId, kind: "conversation_complete", text: done.text },
      { exitCode: secondStop.code, kind: "graceful_shutdown", signal: "SIGTERM" },
    ],
  };
  const serialized = `${JSON.stringify(proof, null, 2)}\n`;
  for (const secret of [credential.sutToken, credential.sutUsername]) {
    if (serialized.includes(secret)) {
      throw new Error("Conversation proof contains a leased identity");
    }
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
