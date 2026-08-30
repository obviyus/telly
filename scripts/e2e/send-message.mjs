import { spawn } from "node:child_process";
import { randomUUID } from "node:crypto";
import { watch } from "node:fs";
import { mkdir, mkdtemp, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { Effect, Layer, Redacted } from "effect";
import { FetchHttpClient } from "effect/unstable/http";

import { Bot, sendMessage } from "../../index.ts";
import { acquireTelegramTestCredential } from "../../.agents/skills/telegram-e2e-userbot/scripts/telegram-test-credential.mjs";
import { startTelegramTestApiProxy } from "../../.agents/skills/telegram-e2e-userbot/scripts/telegram-test-api-proxy.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const skillScripts = path.join(repoRoot, ".agents/skills/telegram-e2e-userbot/scripts");
const proofDir = await mkdtemp(path.join(tmpdir(), "telegram-e2e-proof."));
const eventsPath = path.join(proofDir, "events.ndjson");
const summaryPath = path.join(proofDir, "summary.json");
const readyPath = path.join(proofDir, "recorder-ready.json");
const scenarioPath = path.join(proofDir, "scenario.json");
const recorderStdoutPath = path.join(proofDir, "recorder.stdout.log");
const recorderStderrPath = path.join(proofDir, "recorder.stderr.log");
const run = randomUUID();
const openText = `telly-open-${run}`;
const sentText = `telly-sendMessage-${run}`;

async function readJsonLines(file) {
  try {
    return (await readFile(file, "utf8"))
      .split(/\r?\n/u)
      .filter(Boolean)
      .map((line) => JSON.parse(line));
  } catch (error) {
    if (error && typeof error === "object" && error.code === "ENOENT") return [];
    throw error;
  }
}

async function waitFor(file, predicate, timeoutMs) {
  return new Promise((resolve, reject) => {
    const directory = path.dirname(file);
    let checking = false;
    const finish = (result, error) => {
      clearTimeout(timeout);
      watcher.close();
      if (error) reject(error);
      else resolve(result);
    };
    const check = async () => {
      if (checking) return;
      checking = true;
      try {
        const result = predicate(await readJsonLines(file));
        if (result) finish(result);
      } catch (error) {
        finish(undefined, error);
      } finally {
        checking = false;
      }
    };
    const watcher = watch(directory, () => void check());
    watcher.once("error", (error) => finish(undefined, error));
    const timeout = setTimeout(
      () => finish(undefined, new Error(`Timed out waiting for ${path.basename(file)}`)),
      timeoutMs,
    );
    void check();
  });
}

function waitForChild(child) {
  return new Promise((resolve, reject) => {
    child.once("error", reject);
    child.once("exit", (code, signal) => {
      if (code === 0) resolve();
      else reject(new Error(`Recorder exited with code ${String(code)} signal ${String(signal)}`));
    });
  });
}

const convexProjectDir =
  process.env.TELLY_E2E_CONVEX_PROJECT_DIR ??
  path.resolve(repoRoot, "../openclaw/qa/convex-credential-broker");
let credential;
let proxy;
let recorder;
let recorderCompletion;
let recorderStdout = "";
let recorderStderr = "";

try {
  credential = await acquireTelegramTestCredential({ convexProjectDir });
  proxy = await startTelegramTestApiProxy({
    leaseHealth: {
      assertHealthy: credential.assertLeaseHealthy,
      whenUnhealthy: credential.whenLeaseUnhealthy,
    },
  });
  await proxy.drainUpdates(credential.sutToken);
  await writeFile(
    scenarioPath,
    `${JSON.stringify({ actions: [{ atMs: 0, text: openText, type: "send" }] }, null, 2)}\n`,
    { mode: 0o600 },
  );

  recorder = spawn(
    "uv",
    [
      "run",
      path.join(skillScripts, "user-record.py"),
      "--scenario",
      scenarioPath,
      "--ready-file",
      readyPath,
      "--seconds",
      "12",
      "--record",
      eventsPath,
      "--output",
      summaryPath,
      "--chat",
      `@${credential.sutUsername}`,
    ],
    {
      cwd: repoRoot,
      env: { ...process.env, ...credential.driverEnv },
      stdio: ["ignore", "pipe", "pipe"],
    },
  );
  recorder.stdout.setEncoding("utf8");
  recorder.stderr.setEncoding("utf8");
  recorder.stdout.on("data", (chunk) => {
    recorderStdout = `${recorderStdout}${chunk}`.slice(-64_000);
  });
  recorder.stderr.on("data", (chunk) => {
    recorderStderr = `${recorderStderr}${chunk}`.slice(-64_000);
  });
  recorderCompletion = waitForChild(recorder);

  const recorderStoppedEarly = recorderCompletion.then(() => {
    throw new Error("Recorder exited before the expected event");
  });
  await Promise.race([waitFor(readyPath, (records) => records[0], 15_000), recorderStoppedEarly]);
  await Promise.race([
    waitFor(
      eventsPath,
      (events) => events.find((event) => event.kind === "action" && event.status === "completed"),
      15_000,
    ),
    recorderStoppedEarly,
  ]);
  credential.assertLeaseHealthy();
  const chatId = Number(credential.testerUserId);
  if (!Number.isSafeInteger(chatId)) {
    throw new Error("Leased Telegram tester id is not a safe integer");
  }
  const bot = Bot.layer({
    apiRoot: proxy.apiRoot,
    token: Redacted.make(credential.sutToken),
  }).pipe(Layer.provide(FetchHttpClient.layer));
  const sent = await Effect.runPromise(
    sendMessage({ chat_id: chatId, text: sentText }).pipe(Effect.provide(bot)),
  );
  await writeFile(
    path.join(proofDir, "sent.json"),
    `${JSON.stringify({ date: sent.date, message_id: sent.message_id, text: sent.text }, null, 2)}\n`,
    { mode: 0o600 },
  );

  await recorderCompletion;
  const events = await readJsonLines(eventsPath);
  const observed = events.find(
    (event) =>
      event.kind === "message" &&
      event.isSut === true &&
      event.text === sentText,
  );
  if (!observed) {
    throw new Error("Telegram user recorder did not observe the sent message");
  }

  const verdict = {
    method: "sendMessage",
    passed: true,
    recorded_time: new Date().toISOString(),
    schemaVersion: 1,
    sent: {
      date: sent.date,
      senderBotApiMessageId: sent.message_id,
      text: sent.text,
    },
    timeline: [
      {
        contentType: observed.contentType,
        elapsedMs: observed.elapsedMs,
        isSut: true,
        kind: observed.kind,
        observerBotApiMessageId: observed.botApiMessageId,
        text: observed.text,
      },
    ],
  };
  const serializedVerdict = `${JSON.stringify(verdict, null, 2)}\n`;
  for (const secret of [credential.sutToken, credential.sutUsername]) {
    if (serializedVerdict.includes(secret)) {
      throw new Error("Sanitized verdict contains leased identity data");
    }
  }
  await writeFile(path.join(proofDir, "verdict.json"), serializedVerdict, { mode: 0o600 });
  if (process.env.TELLY_E2E_ARTIFACT_PATH) {
    const artifactPath = path.resolve(repoRoot, process.env.TELLY_E2E_ARTIFACT_PATH);
    await mkdir(path.dirname(artifactPath), { recursive: true });
    await writeFile(artifactPath, serializedVerdict);
  }
  console.log(JSON.stringify({ ok: true, proofDir, verdict }));
} catch (error) {
  console.error(JSON.stringify({ error: error instanceof Error ? error.message : String(error), ok: false, proofDir }));
  throw error;
} finally {
  if (recorder?.exitCode === null) recorder.kill("SIGTERM");
  await recorderCompletion?.catch(() => {});
  await writeFile(recorderStdoutPath, recorderStdout, { mode: 0o600 });
  await writeFile(recorderStderrPath, recorderStderr, { mode: 0o600 });
  await proxy?.close();
  await credential?.release();
}
