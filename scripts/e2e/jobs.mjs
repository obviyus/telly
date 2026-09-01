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
const scratch = await mkdtemp(path.join(tmpdir(), "telly-jobs-e2e."));
const eventsPath = path.join(scratch, "events.ndjson");
const summaryPath = path.join(scratch, "summary.json");
const scenarioPath = path.join(scratch, "scenario.json");
const proofPath = path.join(repoRoot, "runtime/proofs/jobs/2026-08-31.json");
const run = randomUUID();
const commandText = `/remind ${run}`;
const scheduledText = `scheduled:${run}`;
const reminderText = `reminder:${run}`;
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
    const timeout = setTimeout(() => reject(new Error("Jobs bot did not become ready")), 15_000);
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
      reject(new Error("Jobs bot exited before readiness"));
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
  sut = spawn("bun", ["run", "./scripts/e2e/fixtures/jobs-sut.mjs"], {
    cwd: repoRoot,
    env: {
      ...process.env,
      TELLY_E2E_API_ROOT: proxy.apiRoot,
      TELLY_E2E_BOT_TOKEN: credential.sutToken,
      TELLY_E2E_DATABASE_PATH: path.join(scratch, "jobs.db"),
    },
    stdio: ["ignore", "pipe", "pipe"],
  });
  const sutCompletion = waitForChild(sut, "Jobs bot");
  void sutCompletion.catch(() => undefined);
  await waitForReady(sut);

  await writeFile(scenarioPath, `${JSON.stringify({
    actions: [{ atMs: 0, text: commandText, type: "send" }],
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
  const command = requireEvent(
    events,
    (event) => event.kind === "action" && event.text === commandText,
    "reminder command",
  );
  const scheduled = requireEvent(
    events,
    (event) => event.kind === "message" && event.isSut === true && event.text === scheduledText,
    "schedule confirmation",
  );
  const reminder = requireEvent(
    events,
    (event) => event.kind === "message" && event.isSut === true && event.text === reminderText,
    "delayed reminder",
  );
  if (scheduled.elapsedMs <= command.elapsedMs) {
    throw new Error("Schedule confirmation did not follow the command");
  }
  if (reminder.elapsedMs - scheduled.elapsedMs < 700) {
    throw new Error("Reminder was not delayed by the durable schedule");
  }

  sut.kill("SIGTERM");
  const stopped = await sutCompletion;
  sut = undefined;
  const proof = {
    feature: "durable-jobs",
    passed: true,
    recorded_time: new Date().toISOString(),
    schemaVersion: 1,
    timeline: [
      { botApiMessageId: command.botApiMessageId, kind: "reminder_command", text: command.text },
      {
        botApiMessageId: scheduled.botApiMessageId,
        kind: "schedule_confirmation",
        text: scheduled.text,
      },
      {
        botApiMessageId: reminder.botApiMessageId,
        delayAfterConfirmationMs: reminder.elapsedMs - scheduled.elapsedMs,
        kind: "scheduled_delivery",
        text: reminder.text,
      },
      { exitCode: stopped.code, kind: "graceful_shutdown", signal: "SIGTERM" },
    ],
  };
  const serialized = `${JSON.stringify(proof, null, 2)}\n`;
  for (const secret of [credential.sutToken, credential.sutUsername]) {
    if (serialized.includes(secret)) throw new Error("Jobs proof contains a leased identity");
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
