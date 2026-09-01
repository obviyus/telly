import { spawn } from "node:child_process";
import { randomUUID } from "node:crypto";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

import {
  openTelegramTestHarness,
  readJsonLines,
  repoRoot,
  requireEvent,
  skillScripts,
  waitForChild,
  waitForReady,
} from "./harness.mjs";
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
let harness;
let proxy;
let recorder;
let sut;

try {
  harness = await openTelegramTestHarness();
  ({ credential, proxy } = harness);
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
  await waitForReady(sut, "Jobs bot");

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

  const events = await readJsonLines(eventsPath);
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
  await harness?.close();
  await rm(scratch, { force: true, recursive: true });
}
