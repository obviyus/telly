import { execFile as execFileCallback, execFileSync } from "node:child_process";
import { mkdtemp } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { promisify } from "node:util";

import {
  Application,
  answerInlineQuery,
  deleteMessage,
  getGameHighScores,
  getMe,
  getUpdates,
  savePreparedInlineMessage,
  savePreparedKeyboardButton,
  sendGame,
  setGameScore,
} from "../../index.ts";
import { openTelegramTestHarness, repoRoot, writeMethodProof } from "./harness.mjs";

const run = promisify(execFileCallback);
const helper = path.join(
  repoRoot,
  ".agents/skills/telegram-e2e-userbot/scripts/botfather-fixtures.py",
);
const mode = process.env.TELLY_E2E_BOTFATHER_MODE ?? "all";
const fixtureDir = await mkdtemp(path.join(tmpdir(), "telly-botfather."));
const harness = await openTelegramTestHarness();
const { credential, proxy } = harness;
const writeProof = (method, observation) =>
  writeMethodProof(credential, method, observation);
let app;
let userbot;

try {
  await run("uv", ["run", helper, "enable-inline"], {
    cwd: repoRoot,
    env: { ...process.env, ...credential.driverEnv },
    timeout: 180_000,
  });
  app = Application.make({ apiRoot: proxy.apiRoot, token: credential.sutToken });
  const proofs = [];
  if (mode !== "game") {
    const bot = await app.run(getMe());
    if (bot.supportsInlineQueries !== true) {
      throw new Error("BotFather did not enable inline queries for the leased bot");
    }
    await proxy.drainUpdates(credential.sutToken);
    const query = `telly-inline-${crypto.randomUUID()}`;
    userbot = run("uv", ["run", helper, "inline-query", "--query", query], {
      cwd: repoRoot,
      env: { ...process.env, ...credential.driverEnv },
      timeout: 60_000,
    });
    const updates = await app.run(getUpdates({ allowedUpdates: ["inline_query"], timeout: 20 }));
    const inlineQuery = updates.find((update) => update.inlineQuery?.query === query)?.inlineQuery;
    if (inlineQuery === undefined) throw new Error("Telly did not receive the userbot inline query");
    const result = await app.run(answerInlineQuery({
      cacheTime: 0,
      inlineQueryId: inlineQuery.id,
      results: [{
        id: "telly-proof",
        inputMessageContent: { messageText: "Telly inline proof" },
        title: "Telly proof",
        type: "article",
      }],
    }));
    const userbotResult = JSON.parse((await userbot).stdout);
    if (userbotResult.resultCount !== 1) throw new Error("Userbot did not receive one inline result");
    proofs.push(await writeProof("answerInlineQuery", {
      result,
      userbotResultCount: userbotResult.resultCount,
    }));
    const userId = Number(credential.testerUserId);
    if (!Number.isSafeInteger(userId)) throw new Error("Leased tester id is not a safe integer");
    const preparedMessage = await app.run(savePreparedInlineMessage({
      allowGroupChats: true,
      allowUserChats: true,
      result: {
        id: "telly-prepared",
        inputMessageContent: { messageText: "Telly prepared message" },
        title: "Telly prepared",
        type: "article",
      },
      userId,
    }));
    proofs.push(await writeProof("savePreparedInlineMessage", {
      hasId: preparedMessage.id.length > 0,
    }));
    const preparedButton = await app.run(savePreparedKeyboardButton({
      button: {
        requestUsers: { maxQuantity: 1, requestId: 73, userIsBot: false },
        text: "Choose user",
      },
      userId,
    }));
    proofs.push(await writeProof("savePreparedKeyboardButton", {
      hasId: preparedButton.id.length > 0,
    }));
  }

  if (mode === "inline") {
    console.log(JSON.stringify({ ok: true, proofs }));
    process.exitCode = 0;
  } else {

  const chatId = Number(credential.testerUserId);
  const userId = Number(credential.testerUserId);
  if (!Number.isSafeInteger(chatId) || !Number.isSafeInteger(userId)) {
    throw new Error("Leased Telegram tester id is not a safe integer");
  }
  const gameShortName = `telly${credential.sutBotId}`;
  let gameMessage;
  try {
    gameMessage = await app.run(sendGame({ chatId, gameShortName }));
  } catch (error) {
    const description = error?.reason?.description;
    if (
      typeof description !== "string" ||
      !description.toLowerCase().includes("game short name")
    ) {
      throw error;
    }
    const photoPath = path.join(fixtureDir, "game.jpg");
    execFileSync(
      "ffmpeg",
      [
        "-hide_banner",
        "-loglevel",
        "error",
        "-f",
        "lavfi",
        "-i",
        "color=c=orange:s=640x360:d=0.1",
        "-frames:v",
        "1",
        photoPath,
      ],
      { stdio: "inherit" },
    );
    await run("uv", [
      "run",
      helper,
      "create-game",
      "--short-name",
      gameShortName,
      "--photo",
      photoPath,
    ], {
      cwd: repoRoot,
      env: { ...process.env, ...credential.driverEnv },
      timeout: 240_000,
    });
    gameMessage = await app.run(sendGame({ chatId, gameShortName }));
  }
  const visible = await run("uv", ["run", helper, "find-game", "--short-name", gameShortName], {
    cwd: repoRoot,
    env: { ...process.env, ...credential.driverEnv },
    timeout: 60_000,
  });
  if (JSON.parse(visible.stdout).contentType !== "messageGame") {
    throw new Error("Userbot did not observe the game message");
  }
  proofs.push(await writeProof("sendGame", { contentType: "messageGame" }));
  const scored = await app.run(setGameScore({
    chatId,
    force: true,
    messageId: gameMessage.messageId,
    score: 42,
    userId,
  }));
  proofs.push(await writeProof("setGameScore", {
    messageReturned: scored !== true,
    score: 42,
  }));
  const scores = await app.run(getGameHighScores({
    chatId,
    messageId: gameMessage.messageId,
    userId,
  }));
  if (!scores.some((score) => score.score === 42)) {
    throw new Error("Telegram did not return the score set through Telly");
  }
  proofs.push(await writeProof("getGameHighScores", {
    scoreCount: scores.length,
    scoreFound: true,
  }));
  await app.run(deleteMessage({ chatId, messageId: gameMessage.messageId }));
    console.log(JSON.stringify({ ok: true, proofs }));
  }
} finally {
  await userbot?.catch(() => {});
  await app?.close();
  await harness.close();
}
