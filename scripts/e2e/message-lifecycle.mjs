import { spawn } from "node:child_process";
import { randomUUID } from "node:crypto";
import { watch } from "node:fs";
import { mkdir, mkdtemp, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  Application,
  answerCallbackQuery,
  answerInlineQuery,
  copyMessage,
  copyMessages,
  createInvoiceLink,
  deleteEphemeralMessage,
  deleteMessage,
  deleteMessages,
  editMessageCaption,
  editMessageLiveLocation,
  editMessageMedia,
  editMessageReplyMarkup,
  editMessageText,
  editEphemeralMessageCaption,
  editEphemeralMessageMedia,
  editEphemeralMessageReplyMarkup,
  editEphemeralMessageText,
  forwardMessage,
  forwardMessages,
  getUpdates,
  pinChatMessage,
  sendMessage,
  sendMessageDraft,
  sendLocation,
  sendMediaGroup,
  sendPhoto,
  sendInvoice,
  sendPoll,
  sendRichMessage,
  sendRichMessageDraft,
  setMessageReaction,
  stopPoll,
  stopMessageLiveLocation,
  unpinAllChatMessages,
  unpinChatMessage,
} from "../../index.ts";
import { acquireTelegramTestCredential } from "../../.agents/skills/telegram-e2e-userbot/scripts/telegram-test-credential.mjs";
import { startTelegramTestApiProxy } from "../../.agents/skills/telegram-e2e-userbot/scripts/telegram-test-api-proxy.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const skillScripts = path.join(repoRoot, ".agents/skills/telegram-e2e-userbot/scripts");
const convexProjectDir =
  process.env.TELLY_E2E_CONVEX_PROJECT_DIR ??
  path.resolve(repoRoot, "../openclaw/qa/convex-credential-broker");
const artifactDir = process.env.TELLY_E2E_ARTIFACT_DIR;
const selected = new Set(process.env.TELLY_E2E_METHODS?.split(",").filter(Boolean) ?? []);
const run = randomUUID();
const openText = `telly-open-${run}`;
const callbackMessageText = `telly-callback-${run}`;
const callbackButtonText = "Acknowledge";
const proofDir = await mkdtemp(path.join(tmpdir(), "telly-message-lifecycle."));
const eventsPath = path.join(proofDir, "events.ndjson");
const summaryPath = path.join(proofDir, "summary.json");
const readyPath = path.join(proofDir, "recorder-ready.json");
const scenarioPath = path.join(proofDir, "scenario.json");
const stopPath = path.join(proofDir, "stop");
const recorderStdoutPath = path.join(proofDir, "recorder.stdout.log");
const recorderStderrPath = path.join(proofDir, "recorder.stderr.log");
const setupMessageIds = new Set();
const ephemeralMessageIds = new Set();
const verdicts = [];
const failures = [];
let credential;
let proxy;
let app;
let recorder;
let recorderCompletion;
let recorderStdout = "";
let recorderStderr = "";

const png = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=",
  "base64",
);

function waitForChild(child) {
  return new Promise((resolve, reject) => {
    child.once("error", reject);
    child.once("exit", (code, signal) => {
      if (code === 0) resolve();
      else reject(new Error(`Recorder exited with code ${String(code)} signal ${String(signal)}`));
    });
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

function waitFor(file, predicate, timeoutMs = 15_000) {
  return new Promise((resolve, reject) => {
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
    const watcher = watch(path.dirname(file), () => void check());
    watcher.once("error", (error) => finish(undefined, error));
    const timeout = setTimeout(
      () => finish(undefined, new Error(`Timed out waiting for ${path.basename(file)}`)),
      timeoutMs,
    );
    const poll = setInterval(() => void check(), 50);
    void check();
  });
}

function eventView(event) {
  return {
    botApiMessageId: event.botApiMessageId,
    buttonTexts: event.buttonTexts,
    contentType: event.contentType,
    elapsedMs: event.elapsedMs,
    hasReplyMarkup: event.hasReplyMarkup,
    isPermanent: event.isPermanent,
    isSut: event.isSut,
    kind: event.kind,
    latitude: event.latitude,
    longitude: event.longitude,
    livePeriod: event.livePeriod,
    expiresIn: event.expiresIn,
    ephemeralMessageId: event.ephemeralMessageId,
    pollIsClosed: event.pollIsClosed,
    reactionCount: event.reactionCount,
    reactionText: event.reactionText,
    text: event.text,
  };
}

async function writeVerdict(method, observation, timeline) {
  const verdict = {
    method,
    passed: true,
    recorded_time: new Date().toISOString(),
    schemaVersion: 1,
    timeline: [{ kind: "bot_api_result", observation }, ...timeline.map(eventView)],
  };
  const serialized = `${JSON.stringify(verdict, null, 2)}\n`;
  for (const secret of [credential.sutToken, credential.sutUsername]) {
    if (serialized.includes(secret)) throw new Error(`${method} proof contains leased identity data`);
  }
  if (artifactDir !== undefined) {
    const methodDir = path.resolve(repoRoot, artifactDir, method);
    await mkdir(methodDir, { recursive: true });
    await writeFile(path.join(methodDir, `${verdict.recorded_time.slice(0, 10)}.json`), serialized);
  }
  verdicts.push(verdict);
}

async function observeMessage(messageId, predicate = () => true, afterIndex = 0) {
  return waitFor(
    eventsPath,
    (events) => events.slice(afterIndex).find(
      (event) =>
        event.kind === "message" &&
        (messageId === undefined || event.botApiMessageId === messageId) &&
        event.isSut === true &&
        predicate(event),
    ),
  );
}

async function sendSetupText(chatId, label) {
  const text = `telly-${label}-${run}`;
  const message = await app.run(sendMessage({ chatId, text }));
  setupMessageIds.add(message.messageId);
  const event = await observeMessage(undefined, (candidate) => candidate.text === text);
  return { event, message, text };
}

async function deleteSetup(chatId, messageId) {
  if (!setupMessageIds.delete(messageId)) return;
  await app.run(deleteMessage({ chatId, messageId }));
}

async function sendEphemeralText(chatId, receiverUserId, label, replyMarkup) {
  const text = `telly-${label}-${run}`;
  const message = await app.run(sendMessage({
    chatId,
    ephemeralMessageParameters: { receiverUserId },
    replyMarkup,
    text,
  }));
  if (message.ephemeralMessageId === undefined) {
    throw new Error("Telegram returned no ephemeral message id");
  }
  ephemeralMessageIds.add(message.ephemeralMessageId);
  const event = await observeMessage(undefined, (candidate) => candidate.text === text);
  return { event, message, text };
}

async function deleteEphemeralSetup(chatId, receiverUserId, ephemeralMessageId) {
  if (!ephemeralMessageIds.delete(ephemeralMessageId)) return;
  await app.run(deleteEphemeralMessage({ chatId, ephemeralMessageId, receiverUserId }));
}

async function runProof(method, proof) {
  if (selected.size > 0 && !selected.has(method)) return;
  credential.assertLeaseHealthy();
  try {
    const { observation, timeline = [] } = await proof();
    await writeVerdict(method, observation, timeline);
  } catch (error) {
    failures.push({ method, error: error instanceof Error ? error.message : String(error) });
  }
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
  app = Application.make({ apiRoot: proxy.apiRoot, token: credential.sutToken });
  const chatId = Number(credential.testerUserId);
  if (!Number.isSafeInteger(chatId)) throw new Error("Leased Telegram tester id is not a safe integer");

  await writeFile(
    scenarioPath,
    `${JSON.stringify({
      actions: [
        { atMs: 0, text: openText, type: "send" },
        ...(selected.has("answerCallbackQuery")
          ? [{
              atMs: 500,
              buttonText: callbackButtonText,
              messageText: callbackMessageText,
              timeoutMs: 15_000,
              type: "click",
            }]
          : []),
        ...(selected.has("answerInlineQuery")
          ? [{ atMs: 500, query: `telly-inline-${run}`, timeoutMs: 15_000, type: "inlineQuery" }]
          : []),
      ],
    })}\n`,
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
      "--stop-file",
      stopPath,
      "--seconds",
      "120",
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
  recorderCompletion = waitForChild(recorder);
  const recorderStoppedEarly = recorderCompletion.then(() => {
    throw new Error("Recorder exited before the harness finished");
  });
  await Promise.race([waitFor(readyPath, (records) => records[0]), recorderStoppedEarly]);
  const initialAction = await Promise.race([
    waitFor(
      eventsPath,
      (events) => events.find((event) => event.kind === "action" && event.status === "completed"),
    ),
    recorderStoppedEarly,
  ]);
  const initialMessage = await waitFor(eventsPath, (events) => events.find(
    (event) => event.kind === "message" && event.isOutgoing === true && event.text === openText,
  ));
  const incomingUpdates = await app.run(getUpdates({ allowedUpdates: ["message"], timeout: 0 }));
  const incomingMessage = incomingUpdates.find((update) => update.message?.text === openText)?.message;
  if (incomingMessage === undefined) throw new Error("Bot API did not receive the userbot setup message");

  await runProof("getUpdates", async () => ({
    observation: { messageId: incomingMessage.messageId, updateCount: incomingUpdates.length },
    timeline: [initialAction, initialMessage],
  }));

  await runProof("answerCallbackQuery", async () => {
    const message = await app.run(sendMessage({
      chatId,
      replyMarkup: {
        inlineKeyboard: [[{ callbackData: `ack_${run}`, text: callbackButtonText }]],
      },
      text: callbackMessageText,
    }));
    setupMessageIds.add(message.messageId);
    const sent = await observeMessage(undefined, (event) => event.text === callbackMessageText);
    const offset = Math.max(...incomingUpdates.map((update) => update.updateId)) + 1;
    const callbackUpdates = await app.run(getUpdates({
      allowedUpdates: ["callback_query"],
      offset,
      timeout: 10,
    }));
    const callbackQuery = callbackUpdates.find(
      (update) => update.callbackQuery?.data === `ack_${run}`,
    )?.callbackQuery;
    if (callbackQuery === undefined) throw new Error("Bot API did not receive the callback query");
    const result = await app.run(answerCallbackQuery({
      callbackQueryId: callbackQuery.id,
      text: "Acknowledged",
    }));
    const click = await waitFor(eventsPath, (events) => events.find(
      (event) =>
        event.kind === "action" &&
        event.actionType === "click" &&
        event.buttonText === callbackButtonText &&
        event.status === "completed",
    ));
    await deleteSetup(chatId, message.messageId);
    return { observation: { result }, timeline: [sent, click] };
  });

  await runProof("answerInlineQuery", async () => {
    const offset = Math.max(...incomingUpdates.map((update) => update.updateId)) + 1;
    const inlineUpdates = await app.run(getUpdates({
      allowedUpdates: ["inline_query"],
      offset,
      timeout: 10,
    }));
    const inlineQuery = inlineUpdates.find(
      (update) => update.inlineQuery?.query === `telly-inline-${run}`,
    )?.inlineQuery;
    if (inlineQuery === undefined) throw new Error("Bot API did not receive the inline query");
    const result = await app.run(answerInlineQuery({
      cacheTime: 0,
      inlineQueryId: inlineQuery.id,
      results: [{
        id: `proof_${run}`,
        inputMessageContent: { messageText: "Telly inline proof" },
        title: "Telly proof",
        type: "article",
      }],
    }));
    const action = await waitFor(eventsPath, (events) => events.find(
      (event) =>
        event.kind === "action" &&
        event.actionType === "inlineQuery" &&
        event.status === "completed",
    ));
    return { observation: { result }, timeline: [action] };
  });

  await runProof("createInvoiceLink", async () => {
    const link = await app.run(createInvoiceLink({
      currency: "XTR",
      description: "Telly live proof",
      payload: `telly_${run}`,
      prices: [{ amount: 1, label: "Proof" }],
      providerToken: "",
      title: "Telly proof",
    }));
    return {
      observation: {
        hasHttpsLink: link.startsWith("https://"),
        linkLength: link.length,
      },
    };
  });

  await runProof("editMessageText", async () => {
    const setup = await sendSetupText(chatId, "edit-text");
    const editedText = `telly-edited-text-${run}`;
    const result = await app.run(editMessageText({ chatId, messageId: setup.message.messageId, text: editedText }));
    const edited = await waitFor(eventsPath, (events) => events.find(
      (event) => event.kind === "edit" && event.botApiMessageId === setup.event.botApiMessageId && event.text === editedText,
    ));
    await deleteSetup(chatId, setup.message.messageId);
    return { observation: { messageId: result === true ? setup.message.messageId : result.messageId }, timeline: [setup.event, edited] };
  });

  await runProof("editMessageReplyMarkup", async () => {
    const message = await app.run(sendMessage({
      chatId,
      text: `telly-markup-${run}`,
      replyMarkup: { inlineKeyboard: [[{ callbackData: "before", text: "Before" }]] },
    }));
    setupMessageIds.add(message.messageId);
    const sent = await observeMessage(undefined, (event) => event.text === `telly-markup-${run}`);
    const result = await app.run(editMessageReplyMarkup({
      chatId,
      messageId: message.messageId,
      replyMarkup: { inlineKeyboard: [[{ callbackData: "after", text: "After" }]] },
    }));
    const edited = await waitFor(eventsPath, (events) => events.find(
      (event) => event.kind === "edit-meta" && event.botApiMessageId === sent.botApiMessageId && event.buttonTexts?.includes("After"),
    ));
    await deleteSetup(chatId, message.messageId);
    return { observation: { messageId: result === true ? message.messageId : result.messageId }, timeline: [sent, edited] };
  });

  await runProof("editMessageCaption", async () => {
    const message = await app.run(sendPhoto({
      caption: `telly-caption-before-${run}`,
      chatId,
      photo: new File([png], "caption.png", { type: "image/png" }),
    }));
    setupMessageIds.add(message.messageId);
    const sent = await observeMessage(undefined, (event) => event.text === `telly-caption-before-${run}`);
    const caption = `telly-caption-after-${run}`;
    const result = await app.run(editMessageCaption({ caption, chatId, messageId: message.messageId }));
    const edited = await waitFor(eventsPath, (events) => events.find(
      (event) => event.kind === "edit" && event.botApiMessageId === sent.botApiMessageId && event.text === caption,
    ));
    await deleteSetup(chatId, message.messageId);
    return { observation: { messageId: result === true ? message.messageId : result.messageId }, timeline: [sent, edited] };
  });

  await runProof("editMessageMedia", async () => {
    const message = await app.run(sendPhoto({
      caption: `telly-media-before-${run}`,
      chatId,
      photo: new File([png], "before.png", { type: "image/png" }),
    }));
    setupMessageIds.add(message.messageId);
    const sent = await observeMessage(undefined, (event) => event.text === `telly-media-before-${run}`);
    const caption = `telly-media-after-${run}`;
    const result = await app.run(editMessageMedia({
      chatId,
      messageId: message.messageId,
      media: {
        caption,
        media: new File([png], "after.png", { type: "image/png" }),
        type: "photo",
      },
    }));
    const edited = await waitFor(eventsPath, (events) => events.find(
      (event) => event.kind === "edit" && event.botApiMessageId === sent.botApiMessageId && event.text === caption,
    ));
    await deleteSetup(chatId, message.messageId);
    return { observation: { messageId: result === true ? message.messageId : result.messageId }, timeline: [sent, edited] };
  });

  await runProof("editEphemeralMessageText", async () => {
    const setup = await sendEphemeralText(chatId, chatId, "ephemeral-text");
    const text = `telly-ephemeral-edited-${run}`;
    const result = await app.run(editEphemeralMessageText({
      chatId,
      ephemeralMessageId: setup.message.ephemeralMessageId,
      receiverUserId: chatId,
      text,
    }));
    const edited = await waitFor(eventsPath, (events) => events.find(
      (event) => event.kind === "edit" && event.botApiMessageId === setup.event.botApiMessageId && event.text === text,
    ));
    await deleteEphemeralSetup(chatId, chatId, setup.message.ephemeralMessageId);
    return { observation: { messageId: result.messageId }, timeline: [setup.event, edited] };
  });

  await runProof("editEphemeralMessageReplyMarkup", async () => {
    const setup = await sendEphemeralText(
      chatId,
      chatId,
      "ephemeral-markup",
      { inlineKeyboard: [[{ callbackData: "before", text: "Before" }]] },
    );
    const result = await app.run(editEphemeralMessageReplyMarkup({
      chatId,
      ephemeralMessageId: setup.message.ephemeralMessageId,
      receiverUserId: chatId,
      replyMarkup: { inlineKeyboard: [[{ callbackData: "after", text: "After" }]] },
    }));
    const edited = await waitFor(eventsPath, (events) => events.find(
      (event) => event.kind === "edit-meta" && event.botApiMessageId === setup.event.botApiMessageId && event.buttonTexts?.includes("After"),
    ));
    await deleteEphemeralSetup(chatId, chatId, setup.message.ephemeralMessageId);
    return { observation: { messageId: result.messageId }, timeline: [setup.event, edited] };
  });

  await runProof("editEphemeralMessageCaption", async () => {
    const before = (await readJsonLines(eventsPath)).length;
    const message = await app.run(sendPhoto({
      caption: `telly-ephemeral-caption-before-${run}`,
      chatId,
      ephemeralMessageParameters: { receiverUserId: chatId },
      photo: new File([png], "ephemeral-caption.png", { type: "image/png" }),
    }));
    if (message.ephemeralMessageId === undefined) throw new Error("Telegram returned no ephemeral message id");
    ephemeralMessageIds.add(message.ephemeralMessageId);
    const sent = await observeMessage(undefined, (event) => event.contentType === "messagePhoto", before);
    const caption = `telly-ephemeral-caption-after-${run}`;
    const result = await app.run(editEphemeralMessageCaption({
      caption,
      chatId,
      ephemeralMessageId: message.ephemeralMessageId,
      receiverUserId: chatId,
    }));
    const edited = await waitFor(eventsPath, (events) => events.find(
      (event) => event.kind === "edit" && event.botApiMessageId === sent.botApiMessageId && event.text === caption,
    ));
    await deleteEphemeralSetup(chatId, chatId, message.ephemeralMessageId);
    return { observation: { messageId: result.messageId }, timeline: [sent, edited] };
  });

  await runProof("editEphemeralMessageMedia", async () => {
    const before = (await readJsonLines(eventsPath)).length;
    const message = await app.run(sendPhoto({
      caption: `telly-ephemeral-media-before-${run}`,
      chatId,
      ephemeralMessageParameters: { receiverUserId: chatId },
      photo: new File([png], "ephemeral-before.png", { type: "image/png" }),
    }));
    if (message.ephemeralMessageId === undefined) throw new Error("Telegram returned no ephemeral message id");
    ephemeralMessageIds.add(message.ephemeralMessageId);
    const sent = await observeMessage(undefined, (event) => event.contentType === "messagePhoto", before);
    const caption = `telly-ephemeral-media-after-${run}`;
    const result = await app.run(editEphemeralMessageMedia({
      chatId,
      ephemeralMessageId: message.ephemeralMessageId,
      media: {
        caption,
        media: new File([png], "ephemeral-after.png", { type: "image/png" }),
        type: "photo",
      },
      receiverUserId: chatId,
    }));
    const edited = await waitFor(eventsPath, (events) => events.find(
      (event) => event.kind === "edit" && event.botApiMessageId === sent.botApiMessageId && event.text === caption,
    ));
    await deleteEphemeralSetup(chatId, chatId, message.ephemeralMessageId);
    return { observation: { messageId: result.messageId }, timeline: [sent, edited] };
  });

  await runProof("deleteEphemeralMessage", async () => {
    const setup = await sendEphemeralText(chatId, chatId, "ephemeral-delete");
    const result = await app.run(deleteEphemeralMessage({
      chatId,
      ephemeralMessageId: setup.message.ephemeralMessageId,
      receiverUserId: chatId,
    }));
    ephemeralMessageIds.delete(setup.message.ephemeralMessageId);
    const deleted = await waitFor(eventsPath, (events) => events.find(
      (event) => event.kind === "delete" && event.botApiMessageId === setup.event.botApiMessageId,
    ));
    return { observation: { result }, timeline: [setup.event, deleted] };
  });

  await runProof("editMessageLiveLocation", async () => {
    const before = (await readJsonLines(eventsPath)).length;
    const message = await app.run(sendLocation({
      chatId,
      latitude: 52.5,
      livePeriod: 60,
      longitude: 13.4,
    }));
    setupMessageIds.add(message.messageId);
    const sent = await observeMessage(
      undefined,
      (event) => event.contentType === "messageLiveLocation" && event.livePeriod === 60,
      before,
    );
    const result = await app.run(editMessageLiveLocation({
      chatId,
      latitude: 52.6,
      longitude: 13.5,
      messageId: message.messageId,
    }));
    const edited = await waitFor(eventsPath, (events) => events.find(
      (event) =>
        event.kind === "edit" &&
        event.botApiMessageId === sent.botApiMessageId &&
        Math.abs(event.latitude - 52.6) < 0.001 &&
        Math.abs(event.longitude - 13.5) < 0.001,
    ));
    await deleteSetup(chatId, message.messageId);
    return { observation: { messageId: result === true ? message.messageId : result.messageId }, timeline: [sent, edited] };
  });

  await runProof("stopMessageLiveLocation", async () => {
    const before = (await readJsonLines(eventsPath)).length;
    const message = await app.run(sendLocation({
      chatId,
      latitude: 52.7,
      livePeriod: 60,
      longitude: 13.6,
    }));
    setupMessageIds.add(message.messageId);
    const sent = await observeMessage(
      undefined,
      (event) => event.contentType === "messageLiveLocation" && event.livePeriod === 60,
      before,
    );
    const result = await app.run(stopMessageLiveLocation({ chatId, messageId: message.messageId }));
    await deleteSetup(chatId, message.messageId);
    return {
      observation: {
        returnedLivePeriod: result === true ? null : result.location?.livePeriod,
        messageId: result === true ? message.messageId : result.messageId,
      },
      timeline: [sent],
    };
  });

  await runProof("deleteMessage", async () => {
    const setup = await sendSetupText(chatId, "delete-one");
    const result = await app.run(deleteMessage({ chatId, messageId: setup.message.messageId }));
    setupMessageIds.delete(setup.message.messageId);
    const deleted = await waitFor(eventsPath, (events) => events.find(
      (event) => event.kind === "delete" && event.botApiMessageId === setup.event.botApiMessageId,
    ));
    return { observation: { result }, timeline: [setup.event, deleted] };
  });

  await runProof("deleteMessages", async () => {
    const first = await sendSetupText(chatId, "delete-many-a");
    const second = await sendSetupText(chatId, "delete-many-b");
    const apiIds = [first.message.messageId, second.message.messageId];
    const observedIds = [first.event.botApiMessageId, second.event.botApiMessageId];
    const result = await app.run(deleteMessages({ chatId, messageIds: apiIds }));
    apiIds.forEach((id) => setupMessageIds.delete(id));
    const deletions = await waitFor(eventsPath, (events) => {
      const found = events.filter((event) => event.kind === "delete" && observedIds.includes(event.botApiMessageId));
      return found.length === observedIds.length ? found : undefined;
    });
    return { observation: { result }, timeline: [first.event, second.event, ...deletions] };
  });

  await runProof("copyMessage", async () => {
    const setup = await sendSetupText(chatId, "copy-one");
    const copied = await app.run(copyMessage({ chatId, fromChatId: chatId, messageId: setup.message.messageId }));
    setupMessageIds.add(copied.messageId);
    const observed = await observeMessage(undefined, (event) =>
      event.text === setup.text && event.botApiMessageId !== setup.event.botApiMessageId
    );
    await deleteSetup(chatId, copied.messageId);
    await deleteSetup(chatId, setup.message.messageId);
    return { observation: { messageId: copied.messageId }, timeline: [setup.event, observed] };
  });

  await runProof("copyMessages", async () => {
    const first = await sendSetupText(chatId, "copy-many-a");
    const second = await sendSetupText(chatId, "copy-many-b");
    const copied = await app.run(copyMessages({
      chatId,
      fromChatId: chatId,
      messageIds: [first.message.messageId, second.message.messageId],
    }));
    const copiedIds = copied.map((item) => item.messageId);
    copiedIds.forEach((id) => setupMessageIds.add(id));
    const observed = await waitFor(eventsPath, (events) => {
      const copies = events.filter((event) =>
        event.kind === "message" && event.isSut === true && (
          (event.text === first.text && event.botApiMessageId !== first.event.botApiMessageId) ||
          (event.text === second.text && event.botApiMessageId !== second.event.botApiMessageId)
        )
      );
      return copies.length === 2 ? copies : undefined;
    });
    await app.run(deleteMessages({ chatId, messageIds: [...copiedIds, first.message.messageId, second.message.messageId] }));
    [...copiedIds, first.message.messageId, second.message.messageId].forEach((id) => setupMessageIds.delete(id));
    return { observation: { messageIds: copiedIds }, timeline: [first.event, second.event, ...observed] };
  });

  await runProof("forwardMessage", async () => {
    const setup = await sendSetupText(chatId, "forward-one");
    const forwarded = await app.run(forwardMessage({ chatId, fromChatId: chatId, messageId: setup.message.messageId }));
    setupMessageIds.add(forwarded.messageId);
    const observed = await observeMessage(undefined, (event) =>
      event.text === setup.text && event.botApiMessageId !== setup.event.botApiMessageId
    );
    await deleteSetup(chatId, forwarded.messageId);
    await deleteSetup(chatId, setup.message.messageId);
    return { observation: { messageId: forwarded.messageId }, timeline: [setup.event, observed] };
  });

  await runProof("forwardMessages", async () => {
    const first = await sendSetupText(chatId, "forward-many-a");
    const second = await sendSetupText(chatId, "forward-many-b");
    const forwarded = await app.run(forwardMessages({
      chatId,
      fromChatId: chatId,
      messageIds: [first.message.messageId, second.message.messageId],
    }));
    const forwardedIds = forwarded.map((item) => item.messageId);
    forwardedIds.forEach((id) => setupMessageIds.add(id));
    const observed = await Promise.all([
      observeMessage(undefined, (event) => event.text === first.text && event.botApiMessageId !== first.event.botApiMessageId),
      observeMessage(undefined, (event) => event.text === second.text && event.botApiMessageId !== second.event.botApiMessageId),
    ]);
    await app.run(deleteMessages({ chatId, messageIds: [...forwardedIds, first.message.messageId, second.message.messageId] }));
    [...forwardedIds, first.message.messageId, second.message.messageId].forEach((id) => setupMessageIds.delete(id));
    return { observation: { messageIds: forwardedIds }, timeline: [first.event, second.event, ...observed] };
  });

  await runProof("setMessageReaction", async () => {
    const messageId = incomingMessage.messageId;
    const result = await app.run(setMessageReaction({
      chatId,
      messageId,
      reaction: [{ emoji: "👍", type: "emoji" }],
    }));
    const reaction = await waitFor(eventsPath, (events) => events.find(
      (event) => event.kind === "reaction" && event.botApiMessageId === initialAction.botApiMessageId && event.reactionText.includes("👍"),
    ));
    await app.run(setMessageReaction({ chatId, messageId, reaction: [] }));
    return { observation: { result }, timeline: [initialAction, initialMessage, reaction] };
  });

  await runProof("sendPoll", async () => {
    const before = (await readJsonLines(eventsPath)).length;
    const message = await app.run(sendPoll({
      chatId,
      options: [{ text: "Alpha" }, { text: "Beta" }],
      question: `Telly poll ${run}`,
    }));
    setupMessageIds.add(message.messageId);
    const observed = await observeMessage(undefined, (event) => event.contentType === "messagePoll", before);
    return { observation: { messageId: message.messageId }, timeline: [observed] };
  });

  await runProof("sendMediaGroup", async () => {
    const before = (await readJsonLines(eventsPath)).length;
    const caption = `telly-media-group-${run}`;
    const messages = await app.run(sendMediaGroup({
      chatId,
      media: [
        {
          caption,
          media: new File([png], "album-a.png", { type: "image/png" }),
          type: "photo",
        },
        {
          media: new File([png], "album-b.png", { type: "image/png" }),
          type: "photo",
        },
      ],
    }));
    const messageIds = messages.map((message) => message.messageId);
    messageIds.forEach((messageId) => setupMessageIds.add(messageId));
    const observed = await waitFor(eventsPath, (events) => {
      const photos = events.slice(before).filter(
        (event) => event.kind === "message" && event.isSut === true && event.contentType === "messagePhoto",
      );
      return photos.length === 2 ? photos : undefined;
    });
    await app.run(deleteMessages({ chatId, messageIds }));
    messageIds.forEach((messageId) => setupMessageIds.delete(messageId));
    return { observation: { messageCount: messages.length }, timeline: observed };
  });

  await runProof("sendInvoice", async () => {
    const before = (await readJsonLines(eventsPath)).length;
    const message = await app.run(sendInvoice({
      chatId,
      currency: "XTR",
      description: "Telly live proof",
      payload: `telly_${run}`,
      prices: [{ amount: 1, label: "Proof" }],
      providerToken: "",
      title: "Telly proof",
    }));
    setupMessageIds.add(message.messageId);
    const observed = await observeMessage(
      undefined,
      (event) => event.contentType === "messageInvoice",
      before,
    );
    await deleteSetup(chatId, message.messageId);
    return { observation: { messageId: message.messageId }, timeline: [observed] };
  });

  await runProof("sendRichMessage", async () => {
    const before = (await readJsonLines(eventsPath)).length;
    const text = `telly-rich-${run}`;
    const message = await app.run(sendRichMessage({
      chatId,
      richMessage: { html: `<p>${text}</p>` },
    }));
    setupMessageIds.add(message.messageId);
    const observed = await observeMessage(
      undefined,
      (event) => event.contentType === "messageRichMessage" && event.text === text,
      before,
    );
    await deleteSetup(chatId, message.messageId);
    return { observation: { messageId: message.messageId }, timeline: [observed] };
  });

  await runProof("sendRichMessageDraft", async () => {
    const before = (await readJsonLines(eventsPath)).length;
    const text = `telly-rich-draft-${run}`;
    const result = await app.run(sendRichMessageDraft({
      chatId,
      draftId: Date.now(),
      richMessage: { html: `<p>${text}</p>` },
    }));
    const observed = await waitFor(eventsPath, (events) => events.slice(before).find(
      (event) => event.kind === "draft" && event.contentType === "messageRichMessage" && event.text === text,
    ));
    return { observation: { result }, timeline: [observed] };
  });

  await runProof("stopPoll", async () => {
    const before = (await readJsonLines(eventsPath)).length;
    const message = await app.run(sendPoll({
      chatId,
      options: [{ text: "Open" }, { text: "Closed" }],
      question: `Telly stop poll ${run}`,
    }));
    setupMessageIds.add(message.messageId);
    const sent = await observeMessage(undefined, (event) => event.contentType === "messagePoll", before);
    const result = await app.run(stopPoll({ chatId, messageId: message.messageId }));
    const stopped = await waitFor(eventsPath, (events) => events.find(
      (event) => event.kind === "edit" && event.botApiMessageId === sent.botApiMessageId && event.pollIsClosed === true,
    ));
    await deleteSetup(chatId, message.messageId);
    return { observation: { isClosed: result.isClosed }, timeline: [sent, stopped] };
  });

  await runProof("pinChatMessage", async () => {
    const setup = await sendSetupText(chatId, "pin");
    const result = await app.run(pinChatMessage({ chatId, messageId: setup.message.messageId }));
    return { observation: { result }, timeline: [setup.event] };
  });

  await runProof("unpinChatMessage", async () => {
    const setup = await sendSetupText(chatId, "unpin");
    await app.run(pinChatMessage({ chatId, messageId: setup.message.messageId }));
    const result = await app.run(unpinChatMessage({ chatId, messageId: setup.message.messageId }));
    await deleteSetup(chatId, setup.message.messageId);
    return { observation: { result }, timeline: [setup.event] };
  });

  await runProof("unpinAllChatMessages", async () => {
    const first = await sendSetupText(chatId, "unpin-all-a");
    const second = await sendSetupText(chatId, "unpin-all-b");
    await app.run(pinChatMessage({ chatId, messageId: first.message.messageId }));
    await app.run(pinChatMessage({ chatId, messageId: second.message.messageId }));
    const result = await app.run(unpinAllChatMessages({ chatId }));
    await deleteSetup(chatId, first.message.messageId);
    await deleteSetup(chatId, second.message.messageId);
    return { observation: { result }, timeline: [first.event, second.event] };
  });

  await runProof("sendMessageDraft", async () => {
    const draftId = Date.now();
    const text = `telly-draft-${run}`;
    const before = (await readJsonLines(eventsPath)).length;
    const result = await app.run(sendMessageDraft({ chatId, draftId, text }));
    const observed = await waitFor(eventsPath, (events) => events.slice(before).find(
      (event) => event.kind === "draft" && event.text === text,
    ));
    return { observation: { result }, timeline: [observed] };
  });

  await writeFile(stopPath, "stop\n", { mode: 0o600 });
  await recorderCompletion;
  console.log(JSON.stringify({ failures, ok: failures.length === 0, proofDir, verdicts }));
  if (failures.length > 0) process.exitCode = 1;
} catch (error) {
  console.error(JSON.stringify({ error: error instanceof Error ? error.message : String(error), ok: false, proofDir }));
  throw error;
} finally {
  if (app !== undefined && credential !== undefined) {
    const chatId = Number(credential.testerUserId);
    for (const ephemeralMessageId of ephemeralMessageIds) {
      await app.run(deleteEphemeralMessage({
        chatId,
        ephemeralMessageId,
        receiverUserId: chatId,
      })).catch(() => {});
    }
    for (const messageId of setupMessageIds) {
      await app.run(deleteMessage({ chatId, messageId })).catch(() => {});
    }
  }
  if (recorder?.exitCode === null) recorder.kill("SIGTERM");
  await recorderCompletion?.catch(() => {});
  await writeFile(recorderStdoutPath, recorderStdout, { mode: 0o600 });
  await writeFile(recorderStderrPath, recorderStderr, { mode: 0o600 });
  await app?.close();
  await proxy?.close();
  await credential?.release();
}
