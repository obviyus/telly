import { spawn } from "node:child_process";
import { randomUUID } from "node:crypto";
import { mkdir, mkdtemp, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

import {
  openTelegramTestHarness,
  readJsonLines,
  repoRoot,
  requireEvent,
  skillScripts,
  waitForChild,
  waitForOutput,
} from "./harness.mjs";
const proofDir = await mkdtemp(path.join(tmpdir(), "telly-beginner-bot."));
const eventsPath = path.join(proofDir, "events.ndjson");
const summaryPath = path.join(proofDir, "summary.json");
const photoEventsPath = path.join(proofDir, "photo-events.ndjson");
const photoSummaryPath = path.join(proofDir, "photo-summary.json");
const photoPath = path.join(proofDir, "caption-command.png");
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
const captionArgument = `telly-caption-${run}`;
const captionCommand = `/describe ${captionArgument}`;
const captionResponseText = `caption:${captionArgument}`;
const CHILD_ENV_SECRET_KEY =
  /(?:^|_)(?:ACCESS_KEY|API_KEY|AUTH|COOKIE|CREDENTIAL|PASS|PASSWORD|PRIVATE_KEY|SECRET|SESSION|TOKEN)(?:_|$)/u;
let credential;
let harness;
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

try {
  harness = await openTelegramTestHarness();
  ({ credential, proxy } = harness);
  await proxy.drainUpdates(credential.sutToken);
  await writeFile(photoPath, Buffer.from(
    "iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAIAAAAlC+aJAAAACXBIWXMAAAABAAAAAQBPJcTWAAAAb0lEQVR4nO3PAQkAAAyEwO8feiyGCMIF0G0nxxc0IMcXNCDHFzQgxxc0IMcXNCDHFzQgxxc0IMcXNCDHFzQgxxc0IMcXNCDHFzQgxxc0IMcXNCDHFzQgxxc0IMcXNCDHFzQgxxc0IMcXNCDHFzSg9sFe4OIMD8UiAAAAAElFTkSuQmCC",
    "base64",
  ));

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
  await waitForOutput(sut, () => sutStdout, "ready\n", 15_000, "Telly beginner bot");

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

  recorder = spawn(
    "uv",
    [
      "run",
      path.join(skillScripts, "user-record.py"),
      "--send-photo",
      photoPath,
      "--send-caption",
      captionCommand,
      "--seconds",
      "4",
      "--record",
      photoEventsPath,
      "--output",
      photoSummaryPath,
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
  recorderCompletion = waitForChild(recorder, "Telegram photo recorder");
  await recorderCompletion;
  credential.assertLeaseHealthy();

  const events = await readJsonLines(eventsPath);
  const photoEvents = await readJsonLines(photoEventsPath);
  const photoSummary = JSON.parse(await Bun.file(photoSummaryPath).text());
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
  const captionResponse = requireEvent(
    photoEvents,
    (event) =>
      event.kind === "message" &&
      event.isSut === true &&
      event.text === captionResponseText,
    "caption command response",
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
  if (captionResponse.replyToMessageId !== photoSummary.sentMessageId) {
    throw new Error("Caption command response did not quote the photo");
  }

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
        kind: "photo_caption_command",
        text: captionCommand,
      },
      {
        botApiMessageId: captionResponse.botApiMessageId,
        kind: "caption_command_response",
        quotedMessageId: photoSummary.sentMessageId,
        text: captionResponse.text,
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
  await harness?.close();
}
