import { spawn } from "node:child_process";
import { randomUUID } from "node:crypto";
import { mkdir, mkdtemp, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { acquireTelegramTestCredential } from "../../.agents/skills/telegram-e2e-userbot/scripts/telegram-test-credential.mjs";
import { startTelegramTestApiProxy } from "../../.agents/skills/telegram-e2e-userbot/scripts/telegram-test-api-proxy.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const skillScripts = path.join(repoRoot, ".agents/skills/telegram-e2e-userbot/scripts");
const convexProjectDir = process.env.TELLY_E2E_CONVEX_PROJECT_DIR ??
  path.resolve(repoRoot, "../openclaw/qa/convex-credential-broker");
const proofDir = await mkdtemp(path.join(tmpdir(), "telly-beginner-bot."));
const eventsPath = path.join(proofDir, "events.ndjson");
const summaryPath = path.join(proofDir, "summary.json");
const readyPath = path.join(proofDir, "recorder-ready.json");
const scenarioPath = path.join(proofDir, "scenario.json");
const recorderStdoutPath = path.join(proofDir, "recorder.stdout.log");
const recorderStderrPath = path.join(proofDir, "recorder.stderr.log");
const sutStdoutPath = path.join(proofDir, "sut.stdout.log");
const sutStderrPath = path.join(proofDir, "sut.stderr.log");
const run = randomUUID();
const startText = `telly-start-${run}`;
const echoInput = `telly-echo-input-${run}`;
const echoPrefix = "echo:";
const echoText = `${echoPrefix}${echoInput}`;
const ignoredCommand = "/start@definitely_other_bot";
const CHILD_ENV_SECRET_KEY =
  /(?:^|_)(?:ACCESS_KEY|API_KEY|AUTH|COOKIE|CREDENTIAL|PASS|PASSWORD|PRIVATE_KEY|SECRET|SESSION|TOKEN)(?:_|$)/u;
let credential;
let proxy;
let recorder;
let recorderCompletion;
let sut;
let sutCompletion;
let recorderStdout = "";
let recorderStderr = "";
let sutStdout = "";
let sutStderr = "";

function sanitizedEnvironment() {
  return Object.fromEntries(
    Object.entries(process.env).filter(
      ([key, value]) => value !== undefined && !CHILD_ENV_SECRET_KEY.test(key),
    ),
  );
}

function waitForChild(child, label) {
  return new Promise((resolve, reject) => {
    child.once("error", reject);
    child.once("exit", (code, signal) => {
      if (code === 0) resolve({ code, signal });
      else reject(new Error(`${label} exited with code ${String(code)} signal ${String(signal)}`));
    });
  });
}

function waitForOutput(child, getOutput, expected, timeoutMs) {
  return new Promise((resolve, reject) => {
    const finish = (error) => {
      clearTimeout(timeout);
      child.stdout.off("data", check);
      child.off("exit", exited);
      if (error === undefined) resolve();
      else reject(error);
    };
    const check = () => {
      if (getOutput().includes(expected)) finish();
    };
    const exited = (code, signal) => {
      finish(new Error(`SUT exited before readiness: code ${String(code)} signal ${String(signal)}`));
    };
    const timeout = setTimeout(
      () => finish(new Error("Timed out waiting for the Telly beginner bot")),
      timeoutMs,
    );
    child.stdout.on("data", check);
    child.on("exit", exited);
    check();
  });
}

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

  sut = spawn(
    "bun",
    ["run", "./scripts/e2e/fixtures/beginner-bot-sut.mjs"],
    {
      cwd: repoRoot,
      env: {
        ...sanitizedEnvironment(),
        TELLY_E2E_API_ROOT: proxy.apiRoot,
        TELLY_E2E_BOT_TOKEN: credential.sutToken,
        TELLY_E2E_ECHO_PREFIX: echoPrefix,
        TELLY_E2E_START_TEXT: startText,
      },
      stdio: ["ignore", "pipe", "pipe"],
    },
  );
  sut.stdout.setEncoding("utf8");
  sut.stderr.setEncoding("utf8");
  sut.stdout.on("data", (chunk) => {
    sutStdout = `${sutStdout}${chunk}`.slice(-64_000);
  });
  sut.stderr.on("data", (chunk) => {
    sutStderr = `${sutStderr}${chunk}`.slice(-64_000);
  });
  sutCompletion = waitForChild(sut, "Telly beginner bot");
  void sutCompletion.catch(() => undefined);
  await waitForOutput(sut, () => sutStdout, "ready\n", 15_000);

  await writeFile(
    scenarioPath,
    `${JSON.stringify({
      actions: [
        { atMs: 0, text: "/start", type: "send" },
        { atMs: 1_500, text: echoInput, type: "send" },
        { atMs: 3_000, text: ignoredCommand, type: "send" },
      ],
    }, null, 2)}\n`,
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
      "7",
      "--record",
      eventsPath,
      "--output",
      summaryPath,
      "--chat",
      `@${credential.sutUsername}`,
      "--sut-user-id",
      credential.sutBotId,
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
  recorderCompletion = waitForChild(recorder, "Telegram recorder");
  await recorderCompletion;
  credential.assertLeaseHealthy();

  const events = await readJsonLines(eventsPath);
  const startAction = requireEvent(
    events,
    (event) => event.kind === "action" && event.text === "/start" && event.status === "completed",
    "completed /start action",
  );
  const startResponse = requireEvent(
    events,
    (event) => event.kind === "message" && event.isSut === true && event.text === startText,
    "unquoted /start response",
  );
  const echoAction = requireEvent(
    events,
    (event) => event.kind === "action" && event.text === echoInput && event.status === "completed",
    "completed echo action",
  );
  const echoResponse = requireEvent(
    events,
    (event) => event.kind === "message" && event.isSut === true && event.text === echoText,
    "quoted echo response",
  );
  const ignoredAction = requireEvent(
    events,
    (event) =>
      event.kind === "action" && event.text === ignoredCommand && event.status === "completed",
    "completed command for another bot",
  );
  if (startResponse.replyToMessageId !== undefined && startResponse.replyToMessageId !== null) {
    throw new Error("respond unexpectedly quoted /start");
  }
  if (echoResponse.replyToMessageId !== echoAction.messageId) {
    throw new Error("reply did not quote the user's echo message");
  }
  const unexpected = events.find(
    (event) =>
      event.kind === "message" &&
      event.isSut === true &&
      event.elapsedMs > ignoredAction.elapsedMs &&
      (event.text === startText || event.text === `${echoPrefix}${ignoredCommand}`),
  );
  if (unexpected !== undefined) throw new Error("A command for another bot was handled");

  const shutdownStartedAt = Date.now();
  sut.kill("SIGTERM");
  const shutdown = await sutCompletion;
  const shutdownDurationMs = Date.now() - shutdownStartedAt;
  sut = undefined;

  const verdict = {
    feature: "beginner-bot",
    passed: true,
    recorded_time: new Date().toISOString(),
    schemaVersion: 1,
    timeline: [
      {
        botApiMessageId: startAction.botApiMessageId,
        kind: "user_command",
        text: "/start",
      },
      {
        botApiMessageId: startResponse.botApiMessageId,
        kind: "bot_response",
        quoted: false,
        text: startResponse.text,
      },
      {
        botApiMessageId: echoAction.botApiMessageId,
        kind: "user_message",
        text: echoAction.text,
      },
      {
        botApiMessageId: echoResponse.botApiMessageId,
        kind: "bot_reply",
        quotedBotApiMessageId: echoAction.botApiMessageId,
        text: echoResponse.text,
      },
      {
        botApiMessageId: ignoredAction.botApiMessageId,
        kind: "ignored_command",
        observation: "no later SUT response",
        observationWindowMs: 3_000,
      },
      {
        durationMs: shutdownDurationMs,
        exitCode: shutdown.code,
        kind: "graceful_shutdown",
        signal: "SIGTERM",
      },
    ],
  };
  const serialized = `${JSON.stringify(verdict, null, 2)}\n`;
  for (const secret of [credential.sutToken, credential.sutUsername]) {
    if (serialized.includes(secret)) throw new Error("Beginner bot proof contains leased identity");
  }
  await writeFile(path.join(proofDir, "verdict.json"), serialized, { mode: 0o600 });
  if (process.env.TELLY_E2E_ARTIFACT_PATH !== undefined) {
    const artifactPath = path.resolve(repoRoot, process.env.TELLY_E2E_ARTIFACT_PATH);
    await mkdir(path.dirname(artifactPath), { recursive: true });
    await writeFile(artifactPath, serialized);
  }
  console.log(JSON.stringify({ ok: true, proofDir, verdict }));
} catch (error) {
  console.error(JSON.stringify({
    error: error instanceof Error ? error.message : String(error),
    ok: false,
    proofDir,
  }));
  throw error;
} finally {
  if (recorder?.exitCode === null) recorder.kill("SIGTERM");
  await recorderCompletion?.catch(() => undefined);
  if (sut?.exitCode === null) sut.kill("SIGTERM");
  await sutCompletion?.catch(() => undefined);
  await writeFile(recorderStdoutPath, recorderStdout, { mode: 0o600 });
  await writeFile(recorderStderrPath, recorderStderr, { mode: 0o600 });
  await writeFile(sutStdoutPath, sutStdout, { mode: 0o600 });
  await writeFile(sutStderrPath, sutStderr, { mode: 0o600 });
  await proxy?.close();
  await credential?.release();
}
