import { execFileSync, spawn } from "node:child_process";
import { randomUUID } from "node:crypto";
import { watch } from "node:fs";
import { mkdir, mkdtemp, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

import { Effect, Layer, Redacted } from "effect";
import { FetchHttpClient } from "effect/unstable/http";

import {
  Bot,
  sendAnimation,
  sendAudio,
  sendChatAction,
  sendContact,
  sendDice,
  sendDocument,
  sendLocation,
  sendLivePhoto,
  sendMessage,
  sendPhoto,
  sendSticker,
  sendVenue,
  sendVideo,
  sendVideoNote,
  sendVoice,
} from "../../index.ts";
import {
  openTelegramTestHarness,
  readJsonLines,
  repoRoot,
  skillScripts,
  waitForChild,
} from "./harness.mjs";
const proofDir = await mkdtemp(path.join(tmpdir(), "telegram-e2e-proof."));
const eventsPath = path.join(proofDir, "events.ndjson");
const summaryPath = path.join(proofDir, "summary.json");
const readyPath = path.join(proofDir, "recorder-ready.json");
const scenarioPath = path.join(proofDir, "scenario.json");
const recorderStdoutPath = path.join(proofDir, "recorder.stdout.log");
const recorderStderrPath = path.join(proofDir, "recorder.stderr.log");
const method = process.env.TELLY_E2E_SEND_METHOD ?? "sendMessage";
const chatMode = process.env.TELLY_E2E_CHAT ?? "dm";
const run = randomUUID();
const openText = `telly-open-${run}`;
const sentText = `telly-${method}-${run}`;
let mediaBytes;
let livePhotoBytes;
let livePhotoImageBytes;

const mediaFixtures = {
  sendAnimation: {
    args: ["-f", "lavfi", "-i", "color=c=red:s=64x64:d=0.3", "-c:v", "libx264", "-pix_fmt", "yuv420p", "-movflags", "+faststart", "-an"],
    name: "animation.mp4",
  },
  sendAudio: {
    args: ["-f", "lavfi", "-i", "sine=frequency=440:duration=0.3", "-codec:a", "libmp3lame", "-b:a", "32k"],
    name: "audio.mp3",
  },
  sendSticker: {
    args: ["-f", "lavfi", "-i", "color=c=green:s=64x64:d=0.1", "-frames:v", "1", "-c:v", "libwebp", "-lossless", "1"],
    name: "sticker.webp",
  },
  sendVideo: {
    args: ["-f", "lavfi", "-i", "color=c=blue:s=64x64:d=0.3", "-c:v", "libx264", "-pix_fmt", "yuv420p", "-movflags", "+faststart", "-an"],
    name: "video.mp4",
  },
  sendVideoNote: {
    args: ["-f", "lavfi", "-i", "color=c=blue:s=64x64:d=0.3", "-c:v", "libx264", "-pix_fmt", "yuv420p", "-movflags", "+faststart", "-an"],
    name: "video-note.mp4",
  },
  sendVoice: {
    args: ["-f", "lavfi", "-i", "anullsrc=r=48000:cl=mono", "-t", "0.3", "-c:a", "libopus", "-b:a", "16k"],
    name: "voice.ogg",
  },
};

const mediaFixture = mediaFixtures[method];
if (mediaFixture !== undefined) {
  const mediaPath = path.join(proofDir, mediaFixture.name);
  execFileSync(
    "ffmpeg",
    ["-hide_banner", "-loglevel", "error", ...mediaFixture.args, mediaPath],
    { stdio: "inherit" },
  );
  mediaBytes = await readFile(mediaPath);
}
if (method === "sendLivePhoto") {
  const imagePath = path.join(proofDir, "live-photo.jpg");
  const videoPath = path.join(proofDir, "live-photo.mp4");
  execFileSync(
    "ffmpeg",
    ["-hide_banner", "-loglevel", "error", "-f", "lavfi", "-i", "color=c=orange:s=512x512:d=0.1", "-frames:v", "1", imagePath],
    { stdio: "inherit" },
  );
  execFileSync(
    "ffmpeg",
    ["-hide_banner", "-loglevel", "error", "-f", "lavfi", "-i", "color=c=orange:s=512x512:d=0.3", "-c:v", "libx264", "-pix_fmt", "yuv420p", "-movflags", "+faststart", "-an", videoPath],
    { stdio: "inherit" },
  );
  [livePhotoImageBytes, livePhotoBytes] = await Promise.all([
    readFile(imagePath),
    readFile(videoPath),
  ]);
}

function sendOperation(chatId) {
  switch (method) {
    case "sendAnimation":
      return sendAnimation({
        animation: new File([mediaBytes], "animation.mp4", { type: "video/mp4" }),
        caption: sentText,
        chatId,
      });
    case "sendAudio":
      return sendAudio({
        audio: new File([mediaBytes], "audio.mp3", { type: "audio/mpeg" }),
        caption: sentText,
        chatId,
      });
    case "sendChatAction":
      return sendChatAction({ action: "typing", chatId });
    case "sendContact":
      return sendContact({
        chatId,
        firstName: "Telly",
        lastName: "Proof",
        phoneNumber: "+999661234567",
      });
    case "sendDice":
      return sendDice({ chatId, emoji: "🎲" });
    case "sendDocument":
      return sendDocument({
        caption: sentText,
        chatId,
        document: new File(["Telly proof"], "proof.txt", { type: "text/plain" }),
      });
    case "sendLocation":
      return sendLocation({ chatId, latitude: 52, longitude: 13 });
    case "sendLivePhoto":
      return sendLivePhoto({
        caption: sentText,
        chatId,
        livePhoto: new File([livePhotoBytes], "live-photo.mp4", { type: "video/mp4" }),
        photo: new File([livePhotoImageBytes], "live-photo.jpg", { type: "image/jpeg" }),
      });
    case "sendMessage":
      return sendMessage({ chatId, text: sentText });
    case "sendPhoto":
      return sendPhoto({
        caption: sentText,
        chatId,
        photo: new Blob([
          Buffer.from(
            "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=",
            "base64",
          ),
        ], { type: "image/png" }),
      });
    case "sendSticker":
      return sendSticker({
        chatId,
        sticker: new File([mediaBytes], "sticker.webp", { type: "image/webp" }),
      });
    case "sendVenue":
      return sendVenue({
        address: "1 Telly Test Street",
        chatId,
        latitude: 52,
        longitude: 13,
        title: "Telly Proof",
      });
    case "sendVideo":
      return sendVideo({
        caption: sentText,
        chatId,
        video: new File([mediaBytes], "video.mp4", { type: "video/mp4" }),
      });
    case "sendVideoNote":
      return sendVideoNote({
        chatId,
        videoNote: new File([mediaBytes], "video-note.mp4", { type: "video/mp4" }),
      });
    case "sendVoice":
      return sendVoice({
        caption: sentText,
        chatId,
        voice: new File([mediaBytes], "voice.ogg", { type: "audio/ogg" }),
      });
    default:
      throw new Error(`Unsupported send proof method ${method}`);
  }
}

function matchesObservedEvent(event) {
  if (method === "sendChatAction") {
    return event.kind === "typing" && event.isSut === true && event.action === "chatActionTyping";
  }
  if (event.kind !== "message" || event.isSut !== true) return false;
  if (method === "sendLivePhoto") {
    return event.contentType === "messagePhoto" && event.isLivePhoto === true;
  }
  const contentTypes = {
    sendAnimation: "messageAnimation",
    sendAudio: "messageAudio",
    sendContact: "messageContact",
    sendDice: "messageDice",
    sendDocument: "messageDocument",
    sendLocation: "messageLocation",
    sendPhoto: "messagePhoto",
    sendSticker: "messageSticker",
    sendVenue: "messageVenue",
    sendVideo: "messageVideo",
    sendVideoNote: "messageVideoNote",
    sendVoice: "messageVoiceNote",
  };
  const contentType = contentTypes[method];
  return contentType === undefined ? event.text === sentText : event.contentType === contentType;
}

async function waitFor(file, predicate, timeoutMs) {
  return new Promise((resolve, reject) => {
    const directory = path.dirname(file);
    let checking = false;
    let pending = false;
    const finish = (result, error) => {
      clearTimeout(timeout);
      clearInterval(poll);
      watcher.close();
      if (error) reject(error);
      else resolve(result);
    };
    const check = async () => {
      if (checking) {
        pending = true;
        return;
      }
      checking = true;
      pending = false;
      try {
        const result = predicate(await readJsonLines(file));
        if (result) finish(result);
      } catch (error) {
        finish(undefined, error);
      } finally {
        checking = false;
        if (pending) void check();
      }
    };
    const watcher = watch(directory, () => void check());
    watcher.once("error", (error) => finish(undefined, error));
    const timeout = setTimeout(
      () => finish(undefined, new Error(`Timed out waiting for ${path.basename(file)}`)),
      timeoutMs,
    );
    const poll = setInterval(() => void check(), 50);
    void check();
  });
}

let credential;
let harness;
let proxy;
let recorder;
let recorderCompletion;
let recorderStdout = "";
let recorderStderr = "";
let bot;
let sentMessageId;
let deleted = false;

try {
  harness = await openTelegramTestHarness();
  ({ credential, proxy } = harness);
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
      chatMode === "group" ? credential.groupId : `@${credential.sutUsername}`,
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
  const chatId = Number(chatMode === "group" ? credential.groupId : credential.testerUserId);
  if (!Number.isSafeInteger(chatId)) {
    throw new Error("Leased Telegram tester id is not a safe integer");
  }
  bot = Bot.layer({
    apiRoot: proxy.apiRoot,
    token: Redacted.make(credential.sutToken),
  }).pipe(Layer.provide(FetchHttpClient.layer));
  const result = await Effect.runPromise(sendOperation(chatId).pipe(Effect.provide(bot)));
  const sendsMessage = method !== "sendChatAction";
  const shouldDelete = sendsMessage && method !== "sendMessage";
  const sentContent = sendsMessage ? result.text ?? result.caption : undefined;
  if (sendsMessage) {
    sentMessageId = result.messageId;
    await writeFile(
      path.join(proofDir, "sent.json"),
      `${JSON.stringify({
        date: result.date,
        message_id: result.messageId,
        text: sentContent,
      }, null, 2)}\n`,
      { mode: 0o600 },
    );
  }

  const observed = await Promise.race([
    waitFor(
      eventsPath,
      (events) => events.find(matchesObservedEvent),
      15_000,
    ),
    recorderStoppedEarly,
  ]);
  let observedDeletion;
  if (shouldDelete) {
    await Effect.runPromise(
      Effect.gen(function* () {
        const service = yield* Bot;
        return yield* service.callRaw("deleteMessage", {
          chat_id: chatId,
          message_id: result.messageId,
        });
      }).pipe(Effect.provide(bot)),
    );
    deleted = true;
    observedDeletion = await Promise.race([
      waitFor(
        eventsPath,
        (events) => events.find(
          (event) =>
            event.kind === "delete" &&
            event.botApiMessageId === observed.botApiMessageId,
        ),
        15_000,
      ),
      recorderStoppedEarly,
    ]);
  }
  await recorderCompletion;

  const verdict = {
    method,
    passed: true,
    recorded_time: new Date().toISOString(),
    schemaVersion: 1,
    ...(sendsMessage
      ? {
          sent: {
            date: result.date,
            senderBotApiMessageId: result.messageId,
            text: sentContent,
          },
        }
      : { result }),
    timeline: [
      {
        contentType: observed.contentType,
        elapsedMs: observed.elapsedMs,
        isSut: true,
        kind: observed.kind,
        isLivePhoto: observed.isLivePhoto,
        observerBotApiMessageId: observed.botApiMessageId,
        text: observed.text,
      },
      ...(observedDeletion === undefined
        ? []
        : [{
            elapsedMs: observedDeletion.elapsedMs,
            isPermanent: observedDeletion.isPermanent,
            isSut: true,
            kind: observedDeletion.kind,
            observerBotApiMessageId: observedDeletion.botApiMessageId,
          }]),
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
  if (
    method !== "sendMessage" &&
    method !== "sendChatAction" &&
    !deleted &&
    sentMessageId !== undefined &&
    bot !== undefined
  ) {
    await Effect.runPromise(
      Effect.gen(function* () {
        const service = yield* Bot;
        yield* service.callRaw("deleteMessage", {
          chat_id: Number(chatMode === "group" ? credential.groupId : credential.testerUserId),
          message_id: sentMessageId,
        });
      }).pipe(Effect.provide(bot)),
    );
  }
  if (recorder?.exitCode === null) recorder.kill("SIGTERM");
  await recorderCompletion?.catch(() => {});
  await writeFile(recorderStdoutPath, recorderStdout, { mode: 0o600 });
  await writeFile(recorderStderrPath, recorderStderr, { mode: 0o600 });
  await harness?.close();
}
