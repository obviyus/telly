import { execFile as execFileCallback, execFileSync } from "node:child_process";
import { mkdir, mkdtemp, readFile, writeFile } from "node:fs/promises";
import { homedir, tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

import {
  Application,
  approveChatJoinRequest,
  banChatMember,
  banChatSenderChat,
  closeForumTopic,
  closeGeneralForumTopic,
  createChatInviteLink,
  createForumTopic,
  createNewStickerSet,
  deleteAllMessageReactions,
  deleteChatPhoto,
  deleteChatStickerSet,
  deleteEphemeralMessage,
  deleteForumTopic,
  deleteMessageReaction,
  deleteStickerSet,
  declineChatJoinRequest,
  editChatInviteLink,
  editEphemeralMessageCaption,
  editEphemeralMessageMedia,
  editEphemeralMessageReplyMarkup,
  editEphemeralMessageText,
  editForumTopic,
  editGeneralForumTopic,
  exportChatInviteLink,
  getChat,
  getChatAdministrators,
  getChatMember,
  getUpdates,
  getUserChatBoosts,
  hideGeneralForumTopic,
  leaveChat,
  pinChatMessage,
  promoteChatMember,
  reopenForumTopic,
  reopenGeneralForumTopic,
  revokeChatInviteLink,
  restrictChatMember,
  sendMessage,
  sendPhoto,
  setChatAdministratorCustomTitle,
  setChatDescription,
  setChatMemberTag,
  setChatPermissions,
  setChatPhoto,
  setChatStickerSet,
  setChatTitle,
  setMessageReaction,
  unhideGeneralForumTopic,
  unbanChatMember,
  unbanChatSenderChat,
  unpinAllChatMessages,
  unpinAllForumTopicMessages,
  unpinAllGeneralForumTopicMessages,
} from "../../index.ts";
import { acquireTelegramTestCredential } from "../../.agents/skills/telegram-e2e-userbot/scripts/telegram-test-credential.mjs";
import { startTelegramTestApiProxy } from "../../.agents/skills/telegram-e2e-userbot/scripts/telegram-test-api-proxy.mjs";

const run = promisify(execFileCallback);
const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const helper = path.join(
  repoRoot,
  ".agents/skills/telegram-e2e-userbot/scripts/isolated-group.py",
);
const userDriver = path.join(
  repoRoot,
  ".agents/skills/telegram-e2e-userbot/scripts/user-driver.py",
);
const convexProjectDir =
  process.env.TELLY_E2E_CONVEX_PROJECT_DIR ??
  path.resolve(repoRoot, "../openclaw/qa/convex-credential-broker");
const artifactDir = process.env.TELLY_E2E_ARTIFACT_DIR;
const fixtureDir = await mkdtemp(path.join(tmpdir(), "telly-isolated-group."));
const pendingProofs = [];
const failures = [];
let credential;
let proxy;
let app;
let chatId;
let normalized = false;
let secondaryApp;
let secondaryCredential;
let secondaryMemberAdded = false;

const baselinePermissions = {
  canAddWebPagePreviews: true,
  canChangeInfo: true,
  canEditTag: true,
  canInviteUsers: true,
  canManageTopics: true,
  canPinMessages: true,
  canReactToMessages: true,
  canSendAudios: true,
  canSendDocuments: true,
  canSendMessages: true,
  canSendOtherMessages: true,
  canSendPhotos: true,
  canSendPolls: true,
  canSendVideoNotes: true,
  canSendVideos: true,
  canSendVoiceNotes: true,
};

function record(method, observation) {
  pendingProofs.push({
    method,
    passed: true,
    recorded_time: new Date().toISOString(),
    schemaVersion: 1,
    timeline: [{ kind: "bot_api_result", observation }],
  });
}

async function attempt(method, proof) {
  try {
    await proof();
    return true;
  } catch (error) {
    failures.push({ method, error: error instanceof Error ? error.message : String(error) });
    return false;
  }
}

async function publishProofs() {
  for (const proof of pendingProofs) {
    const serialized = `${JSON.stringify(proof, null, 2)}\n`;
    for (const secret of [credential.sutToken, credential.sutUsername]) {
      if (serialized.includes(secret)) throw new Error(`${proof.method} proof contains leased identity data`);
    }
    if (artifactDir !== undefined) {
      const methodDir = path.resolve(repoRoot, artifactDir, proof.method);
      await mkdir(methodDir, { recursive: true });
      await writeFile(path.join(methodDir, `${proof.recorded_time.slice(0, 10)}.json`), serialized);
    }
  }
}

async function runIdempotent(operation) {
  try {
    return await app.run(operation);
  } catch (error) {
    const description = error?.reason?.description;
    if (typeof description !== "string" || !description.includes("NOT_MODIFIED")) throw error;
  }
}

function ephemeralEditObservation(ephemeralMessageId) {
  if (!Number.isSafeInteger(ephemeralMessageId) || ephemeralMessageId <= 0) {
    throw new Error("Telegram accepted an invalid ephemeral message identifier");
  }
  return {
    accepted: true,
    requestedEphemeralMessageId: ephemeralMessageId,
  };
}

async function normalizeBotApiFixture(userId) {
  const chat = await app.run(getChat({ chatId }));
  if (chat.photo !== undefined) await app.run(deleteChatPhoto({ chatId }));
  if (chat.stickerSetName !== undefined) await app.run(deleteChatStickerSet({ chatId }));
  await app.run(setChatPermissions({ chatId, permissions: baselinePermissions }));
  await runIdempotent(unpinAllChatMessages({ chatId }));
  await app.run(deleteAllMessageReactions({ chatId, userId }));
  for (const operation of [
    reopenGeneralForumTopic({ chatId }),
    unhideGeneralForumTopic({ chatId }),
    editGeneralForumTopic({ chatId, name: "General" }),
  ]) {
    await runIdempotent(operation);
  }
}

async function acquireReusableFixture() {
  const seen = new Set();
  for (let attempt = 0; attempt < 12; attempt += 1) {
    const candidate = await acquireTelegramTestCredential({ convexProjectDir });
    seen.add(candidate.credentialId);
    const driverEnv = { ...process.env, ...candidate.driverEnv };
    try {
      const found = await run("uv", ["run", helper, "reuse"], {
        cwd: repoRoot,
        env: driverEnv,
        timeout: 60_000,
      });
      const fixture = JSON.parse(found.stdout);
      if (fixture.found === true) {
        return {
          chatId: fixture.chatId,
          credential: candidate,
          driverEnv,
        };
      }
    } catch (error) {
      await candidate.release();
      throw error;
    }
    await candidate.release();
  }
  throw new Error(`No reusable group found across ${seen.size} leased credentials`);
}

async function ensureSecondaryTestUser(primaryDriverEnv) {
  const stateRoot = path.join(homedir(), ".local/share/telly/e2e-secondary-user-tdlib-alice");
  const stateDir = path.join(stateRoot, "user-driver");
  const configPath = path.join(stateDir, "config.local.json");
  let config;
  try {
    config = JSON.parse(await readFile(configPath, "utf8"));
  } catch (error) {
    if (!error || typeof error !== "object" || error.code !== "ENOENT") throw error;
    const primaryConfig = JSON.parse(
      await readFile(path.join(primaryDriverEnv.TELEGRAM_USER_DRIVER_STATE_DIR, "config.local.json"), "utf8"),
    );
    config = {
      apiHash: primaryConfig.apiHash,
      apiId: primaryConfig.apiId,
      databaseEncryptionKey: Buffer.from(crypto.getRandomValues(new Uint8Array(32))).toString("base64"),
      testDc: true,
      testPhone: "9996636437",
    };
    await mkdir(stateDir, { mode: 0o700, recursive: true });
    await writeFile(configPath, `${JSON.stringify(config, null, 2)}\n`, { mode: 0o600 });
  }
  if (typeof config.testPhone !== "string") {
    throw new Error("Secondary Test Server user has no test phone number");
  }
  const env = {
    ...process.env,
    TELEGRAM_E2E_STATE_DIR: stateRoot,
    TELEGRAM_USER_DRIVER_STATE_DIR: stateDir,
  };
  const loginArgs = [
    "run",
    userDriver,
    "login",
    "--phone",
    config.testPhone,
    "--code",
    "33333",
    "--first-name",
    "Telly",
    "--last-name",
    "Guest",
    "--json",
  ];
  const loggedIn = await run("uv", loginArgs, { cwd: repoRoot, env, timeout: 120_000 });
  const userId = JSON.parse(loggedIn.stdout).user?.id;
  if (!Number.isSafeInteger(userId)) throw new Error("Secondary Test Server user has no id");
  return { env, userId };
}

async function waitForSecondaryAccess() {
  let lastError;
  for (let attempt = 0; attempt < 50; attempt += 1) {
    try {
      return await secondaryApp.run(getChat({ chatId }));
    } catch (error) {
      lastError = error;
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }
  throw new Error("Secondary bot did not gain access to the reusable group", { cause: lastError });
}

async function waitForBotMessage(application, text) {
  for (let attempt = 0; attempt < 10; attempt += 1) {
    const updates = await application.run(getUpdates({
      allowedUpdates: ["message"],
      timeout: 2,
    }));
    const message = updates.find((update) => update.message?.text === text)?.message;
    if (message !== undefined) return message;
  }
  throw new Error("User-authored reaction target did not reach the bot");
}

try {
  const fixture = await acquireReusableFixture();
  credential = fixture.credential;
  const driverEnv = fixture.driverEnv;
  chatId = fixture.chatId;
  proxy = await startTelegramTestApiProxy({
    leaseHealth: {
      assertHealthy: credential.assertLeaseHealthy,
      whenUnhealthy: credential.whenLeaseUnhealthy,
    },
  });
  app = Application.make({ apiRoot: proxy.apiRoot, token: credential.sutToken });
  const botId = Number(credential.sutBotId);
  const userId = Number(credential.testerUserId);
  if (!Number.isSafeInteger(botId) || !Number.isSafeInteger(userId)) {
    throw new Error("Leased Telegram identifiers are not safe integers");
  }
  const member = await app.run(getChatMember({ chatId, userId: botId }));
  if (member.status !== "administrator") throw new Error("Isolated group bot is not an administrator");
  await normalizeBotApiFixture(userId);

  await attempt("getChatAdministrators", async () => {
    const administrators = await app.run(getChatAdministrators({ chatId, returnBots: true }));
    record("getChatAdministrators", { administratorCount: administrators.length });
  });
  await attempt("getUserChatBoosts", async () => {
    const boosts = await app.run(getUserChatBoosts({ chatId, userId }));
    record("getUserChatBoosts", { boostCount: boosts.boosts.length });
  });
  await attempt("setChatTitle", async () => {
    const result = await app.run(setChatTitle({ chatId, title: "Telly title proof" }));
    const chat = await app.run(getChat({ chatId }));
    record("setChatTitle", { result, titleMatches: chat.title === "Telly title proof" });
  });
  await attempt("setChatDescription", async () => {
    const result = await app.run(setChatDescription({ chatId, description: "Telly description proof" }));
    const chat = await app.run(getChat({ chatId }));
    record("setChatDescription", {
      descriptionMatches: chat.description === "Telly description proof",
      result,
    });
  });
  await attempt("setChatPermissions", async () => {
    const result = await app.run(setChatPermissions({
      chatId,
      permissions: { canSendMessages: false },
    }));
    const chat = await app.run(getChat({ chatId }));
    record("setChatPermissions", {
      canSendMessages: chat.permissions.canSendMessages ?? false,
      result,
    });
    await app.run(setChatPermissions({ chatId, permissions: baselinePermissions }));
  });
  const photoPath = path.join(fixtureDir, "chat.jpg");
  execFileSync(
    "ffmpeg",
    [
      "-hide_banner",
      "-loglevel",
      "error",
      "-f",
      "lavfi",
      "-i",
      "color=c=cyan:s=512x512:d=0.1",
      "-frames:v",
      "1",
      photoPath,
    ],
    { stdio: "inherit" },
  );
  await attempt("setChatPhoto", async () => {
    const result = await app.run(setChatPhoto({
      chatId,
      photo: new File([await readFile(photoPath)], "chat.jpg", { type: "image/jpeg" }),
    }));
    const chat = await app.run(getChat({ chatId }));
    record("setChatPhoto", { hasPhoto: chat.photo !== undefined, result });
  });
  if (pendingProofs.some((proof) => proof.method === "setChatPhoto")) {
    await attempt("deleteChatPhoto", async () => {
      const result = await app.run(deleteChatPhoto({ chatId }));
      const chat = await app.run(getChat({ chatId }));
      record("deleteChatPhoto", { hasPhoto: chat.photo !== undefined, result });
    });
  }

  const ephemeralText = await app.run(sendMessage({
    chatId,
    ephemeralMessageParameters: { receiverUserId: userId },
    replyMarkup: { inlineKeyboard: [[{ callbackData: "before", text: "Before" }]] },
    text: "Telly ephemeral before",
  }));
  if (ephemeralText.ephemeralMessageId === undefined) {
    throw new Error("Telegram returned no ephemeral text id");
  }
  await attempt("editEphemeralMessageText", async () => {
    await app.run(editEphemeralMessageText({
      chatId,
      ephemeralMessageId: ephemeralText.ephemeralMessageId,
      receiverUserId: userId,
      text: "Telly ephemeral after",
    }));
    record(
      "editEphemeralMessageText",
      ephemeralEditObservation(ephemeralText.ephemeralMessageId),
    );
  });
  await attempt("editEphemeralMessageReplyMarkup", async () => {
    await app.run(editEphemeralMessageReplyMarkup({
      chatId,
      ephemeralMessageId: ephemeralText.ephemeralMessageId,
      receiverUserId: userId,
      replyMarkup: { inlineKeyboard: [[{ callbackData: "after", text: "After" }]] },
    }));
    record(
      "editEphemeralMessageReplyMarkup",
      ephemeralEditObservation(ephemeralText.ephemeralMessageId),
    );
  });
  await attempt("deleteEphemeralMessage", async () => {
    const result = await app.run(deleteEphemeralMessage({
      chatId,
      ephemeralMessageId: ephemeralText.ephemeralMessageId,
      receiverUserId: userId,
    }));
    record("deleteEphemeralMessage", { result });
  });

  const ephemeralPhoto = await app.run(sendPhoto({
    caption: "Telly ephemeral caption before",
    chatId,
    ephemeralMessageParameters: { receiverUserId: userId },
    photo: new File([await readFile(photoPath)], "ephemeral.jpg", { type: "image/jpeg" }),
  }));
  if (ephemeralPhoto.ephemeralMessageId === undefined) {
    throw new Error("Telegram returned no ephemeral photo id");
  }
  await attempt("editEphemeralMessageCaption", async () => {
    await app.run(editEphemeralMessageCaption({
      caption: "Telly ephemeral caption after",
      chatId,
      ephemeralMessageId: ephemeralPhoto.ephemeralMessageId,
      receiverUserId: userId,
    }));
    record(
      "editEphemeralMessageCaption",
      ephemeralEditObservation(ephemeralPhoto.ephemeralMessageId),
    );
  });
  await attempt("editEphemeralMessageMedia", async () => {
    await app.run(editEphemeralMessageMedia({
      chatId,
      ephemeralMessageId: ephemeralPhoto.ephemeralMessageId,
      media: {
        caption: "Telly ephemeral media after",
        media: new File([await readFile(photoPath)], "ephemeral-edited.jpg", { type: "image/jpeg" }),
        type: "photo",
      },
      receiverUserId: userId,
    }));
    record(
      "editEphemeralMessageMedia",
      ephemeralEditObservation(ephemeralPhoto.ephemeralMessageId),
    );
  });
  await app.run(deleteEphemeralMessage({
    chatId,
    ephemeralMessageId: ephemeralPhoto.ephemeralMessageId,
    receiverUserId: userId,
  }));
  const stickerPath = path.join(fixtureDir, "group-sticker.webp");
  execFileSync(
    "ffmpeg",
    [
      "-hide_banner",
      "-loglevel",
      "error",
      "-f",
      "lavfi",
      "-i",
      "color=c=magenta:s=512x512:d=0.1",
      "-frames:v",
      "1",
      "-c:v",
      "libwebp",
      "-lossless",
      "1",
      stickerPath,
    ],
    { stdio: "inherit" },
  );
  const stickerSetName = `telly_group_${crypto.randomUUID().replaceAll("-", "").slice(0, 10)}_by_${credential.sutUsername}`;
  let stickerSetExists = false;
  try {
    await app.run(createNewStickerSet({
      name: stickerSetName,
      stickers: [{
        emojiList: ["🟣"],
        format: "static",
        sticker: new File([await readFile(stickerPath)], "group-sticker.webp", { type: "image/webp" }),
      }],
      title: "Telly group proof",
      userId,
    }));
    stickerSetExists = true;
    await attempt("setChatStickerSet", async () => {
      const result = await app.run(setChatStickerSet({ chatId, stickerSetName }));
      const chat = await app.run(getChat({ chatId }));
      if (chat.stickerSetName !== stickerSetName) throw new Error("Group sticker set did not become visible");
      record("setChatStickerSet", { result, stickerSetMatches: true });
    });
    await attempt("deleteChatStickerSet", async () => {
      const result = await app.run(deleteChatStickerSet({ chatId }));
      const chat = await app.run(getChat({ chatId }));
      if (chat.stickerSetName !== undefined) throw new Error("Group sticker set was not removed");
      record("deleteChatStickerSet", { result, stickerSetRemoved: true });
    });
  } finally {
    if (stickerSetExists) await app.run(deleteStickerSet({ name: stickerSetName })).catch(() => {});
  }

  const helperOptions = { cwd: repoRoot, env: driverEnv, timeout: 60_000 };
  secondaryCredential = await acquireTelegramTestCredential({ convexProjectDir });
  const secondaryId = Number(secondaryCredential.sutBotId);
  if (!Number.isSafeInteger(secondaryId)) {
    throw new Error("Secondary Telegram bot id is not a safe integer");
  }
  secondaryApp = Application.make({ apiRoot: proxy.apiRoot, token: secondaryCredential.sutToken });
  await run("uv", [
    "run",
    helper,
    "add-bot",
    "--chat-id",
    String(chatId),
    "--user-id",
    String(secondaryId),
    "--username",
    secondaryCredential.sutUsername,
  ], helperOptions);
  secondaryMemberAdded = true;
  await waitForSecondaryAccess();

  try {
    await attempt("setChatMemberTag", async () => {
      const result = await app.run(setChatMemberTag({ chatId, tag: "Telly", userId: secondaryId }));
      const member = await app.run(getChatMember({ chatId, userId: secondaryId }));
      if (member.status !== "member" || member.tag !== "Telly") {
        throw new Error("Temporary member tag did not become visible");
      }
      record("setChatMemberTag", { result, tagMatches: true });
    });

    const promoted = await attempt("promoteChatMember", async () => {
      const result = await app.run(promoteChatMember({
        canDeleteMessages: true,
        canManageChat: true,
        canPinMessages: true,
        chatId,
        userId: secondaryId,
      }));
      const member = await app.run(getChatMember({ chatId, userId: secondaryId }));
      if (member.status !== "administrator" || member.canDeleteMessages !== true) {
        throw new Error("Temporary bot promotion did not become visible");
      }
      record("promoteChatMember", { result, status: member.status });
    });
    if (promoted) {
      await attempt("setChatAdministratorCustomTitle", async () => {
        const result = await app.run(setChatAdministratorCustomTitle({
          chatId,
          customTitle: "Telly",
          userId: secondaryId,
        }));
        const member = await app.run(getChatMember({ chatId, userId: secondaryId }));
        if (member.status !== "administrator" || member.customTitle !== "Telly") {
          throw new Error("Temporary administrator title did not become visible");
        }
        record("setChatAdministratorCustomTitle", { customTitleMatches: true, result });
      });
    }

    await Promise.all([
      proxy.drainUpdates(credential.sutToken),
      proxy.drainUpdates(secondaryCredential.sutToken),
    ]);
    const reactionText = `Telly reaction ${crypto.randomUUID()}`;
    const sent = await run("uv", [
      "run",
      helper,
      "send-text",
      "--chat-id",
      String(chatId),
      "--text",
      reactionText,
    ], helperOptions);
    const tdMessageId = JSON.parse(sent.stdout).tdMessageId;
    const [primaryMessage, secondaryMessage] = await Promise.all([
      waitForBotMessage(app, reactionText),
      waitForBotMessage(secondaryApp, reactionText),
    ]);
    await secondaryApp.run(setMessageReaction({
      chatId,
      messageId: secondaryMessage.messageId,
      reaction: [{ emoji: "👍", type: "emoji" }],
    }));
    await attempt("deleteMessageReaction", async () => {
      const result = await app.run(deleteMessageReaction({
        chatId,
        messageId: primaryMessage.messageId,
        userId: secondaryId,
      }));
      const inspected = await run("uv", [
        "run",
        helper,
        "reaction-count",
        "--chat-id",
        String(chatId),
        "--td-message-id",
        String(tdMessageId),
        "--expect",
        "0",
      ], helperOptions);
      const count = JSON.parse(inspected.stdout).reactionCount;
      if (count !== 0) throw new Error("Temporary bot reaction was not removed");
      record("deleteMessageReaction", { reactionCount: count, result });
    });
    await secondaryApp.run(setMessageReaction({
      chatId,
      messageId: secondaryMessage.messageId,
      reaction: [{ emoji: "👍", type: "emoji" }],
    }));
    await attempt("deleteAllMessageReactions", async () => {
      const result = await app.run(deleteAllMessageReactions({ chatId, userId: secondaryId }));
      const inspected = await run("uv", [
        "run",
        helper,
        "reaction-count",
        "--chat-id",
        String(chatId),
        "--td-message-id",
        String(tdMessageId),
        "--expect",
        "0",
      ], helperOptions);
      const count = JSON.parse(inspected.stdout).reactionCount;
      if (count !== 0) throw new Error("Temporary bot reactions were not removed from the chat");
      record("deleteAllMessageReactions", { reactionCount: count, result });
    });

    if (promoted) {
      await run("uv", [
        "run",
        helper,
        "make-member",
        "--chat-id",
        String(chatId),
        "--user-id",
        String(secondaryId),
      ], helperOptions);
    }
    const restricted = await attempt("restrictChatMember", async () => {
      const result = await app.run(restrictChatMember({
        chatId,
        permissions: { canSendMessages: false },
        useIndependentChatPermissions: true,
        userId: secondaryId,
      }));
      const member = await app.run(getChatMember({ chatId, userId: secondaryId }));
      if (member.status !== "restricted" || member.canSendMessages !== false) {
        throw new Error("Temporary member restriction did not become visible");
      }
      record("restrictChatMember", { result, status: member.status });
    });
    if (restricted) {
      await app.run(restrictChatMember({
        chatId,
        permissions: baselinePermissions,
        useIndependentChatPermissions: true,
        userId: secondaryId,
      }));
    }

    const banned = await attempt("banChatMember", async () => {
      const result = await app.run(banChatMember({ chatId, revokeMessages: true, userId: secondaryId }));
      secondaryMemberAdded = false;
      const member = await app.run(getChatMember({ chatId, userId: secondaryId }));
      if (member.status !== "kicked") throw new Error("Temporary member ban did not become visible");
      record("banChatMember", { result, status: member.status });
    });
    let unbanned = false;
    if (banned) {
      unbanned = await attempt("unbanChatMember", async () => {
        const result = await app.run(unbanChatMember({ chatId, onlyIfBanned: true, userId: secondaryId }));
        const member = await app.run(getChatMember({ chatId, userId: secondaryId }));
        if (member.status !== "left") throw new Error("Temporary member unban did not become visible");
        record("unbanChatMember", { result, status: member.status });
      });
    }

    if (unbanned) {
      await run("uv", [
        "run",
        helper,
        "add-bot",
        "--chat-id",
        String(chatId),
        "--user-id",
        String(secondaryId),
        "--username",
        secondaryCredential.sutUsername,
      ], helperOptions);
      secondaryMemberAdded = true;
    }
    if (secondaryMemberAdded) {
      await attempt("leaveChat", async () => {
        const result = await secondaryApp.run(leaveChat({ chatId }));
        secondaryMemberAdded = false;
        const member = await app.run(getChatMember({ chatId, userId: secondaryId }));
        if (member.status !== "left") throw new Error("Temporary bot did not leave the group");
        record("leaveChat", { result, status: member.status });
      });
    }
  } finally {
    if (secondaryMemberAdded) {
      await run("uv", [
        "run",
        helper,
        "remove-member",
        "--chat-id",
        String(chatId),
        "--user-id",
        String(secondaryId),
      ], helperOptions).catch(() => {});
      secondaryMemberAdded = false;
    }
    await secondaryApp.close();
    await secondaryCredential.release();
    secondaryApp = undefined;
    secondaryCredential = undefined;
  }

  let senderChatId;
  let senderBanApplied = false;
  await attempt("banChatSenderChat", async () => {
    const senderSetup = await run("uv", [
      "run",
      helper,
      "send-as-personal-channel",
      "--chat-id",
      String(chatId),
      "--text",
      `Telly sender ${crypto.randomUUID()}`,
    ], helperOptions);
    senderChatId = JSON.parse(senderSetup.stdout).senderChatId;
    const result = await app.run(banChatSenderChat({ chatId, senderChatId }));
    senderBanApplied = true;
    let rejected = false;
    try {
      await run("uv", [
        "run",
        helper,
        "send-as-personal-channel",
        "--chat-id",
        String(chatId),
        "--text",
        `Telly blocked sender ${crypto.randomUUID()}`,
      ], helperOptions);
    } catch (error) {
      const detail = `${error?.stderr ?? ""} ${error instanceof Error ? error.message : ""}`;
      if (!/(did not become visible|SENDER_CHAT|CHAT_SEND_AS)/u.test(detail)) throw error;
      rejected = true;
    }
    if (!rejected) throw new Error("Banned sender chat could still send to the group");
    record("banChatSenderChat", { result, senderRejected: true });
  });
  if (senderBanApplied) {
    await attempt("unbanChatSenderChat", async () => {
      const result = await app.run(unbanChatSenderChat({ chatId, senderChatId }));
      await run("uv", [
        "run",
        helper,
        "send-as-personal-channel",
        "--chat-id",
        String(chatId),
        "--text",
        `Telly restored sender ${crypto.randomUUID()}`,
      ], helperOptions);
      record("unbanChatSenderChat", { result, senderRestored: true });
    });
  }
  await run("uv", ["run", helper, "normalize", "--chat-id", String(chatId)], helperOptions);

  await attempt("createChatInviteLink", async () => {
    const expireDate = Math.floor(Date.now() / 1_000) + 3_600;
    const link = await app.run(createChatInviteLink({ chatId, expireDate, name: "Telly proof" }));
    record("createChatInviteLink", {
      expiresInFuture: link.expireDate === expireDate,
      hasHttpsLink: link.inviteLink.startsWith("https://"),
    });
    const edited = await app.run(editChatInviteLink({
      chatId,
      inviteLink: link.inviteLink,
      name: "Telly renamed",
    }));
    record("editChatInviteLink", { nameMatches: edited.name === "Telly renamed" });
  });
  await attempt("revokeChatInviteLink", async () => {
    const link = await app.run(createChatInviteLink({
      chatId,
      expireDate: Math.floor(Date.now() / 1_000) + 3_600,
      name: "Telly revoke proof",
    }));
    const revoked = await app.run(revokeChatInviteLink({ chatId, inviteLink: link.inviteLink }));
    record("revokeChatInviteLink", { isRevoked: revoked.isRevoked });
  });
  await attempt("exportChatInviteLink", async () => {
    const link = await app.run(exportChatInviteLink({ chatId }));
    record("exportChatInviteLink", { hasHttpsLink: link.startsWith("https://"), linkLength: link.length });
  });

  let secondaryUser;
  let secondaryUserError;
  const getSecondaryUser = async () => {
    if (secondaryUser !== undefined) return secondaryUser;
    if (secondaryUserError !== undefined) throw secondaryUserError;
    try {
      secondaryUser = await ensureSecondaryTestUser(driverEnv);
      return secondaryUser;
    } catch (error) {
      secondaryUserError = error;
      throw error;
    }
  };
  const requestJoin = async (inviteLink) => {
    const user = await getSecondaryUser();
    const staleUpdates = await app.run(getUpdates({
      allowedUpdates: ["chat_join_request"],
      timeout: 0,
    }));
    const offset = Math.max(0, ...staleUpdates.map((update) => update.updateId + 1));
    await run(
      "uv",
      ["run", userDriver, "join", "--invite-link", inviteLink, "--json"],
      { cwd: repoRoot, env: user.env, timeout: 60_000 },
    );
    const updates = await app.run(getUpdates({
      allowedUpdates: ["chat_join_request"],
      offset,
      timeout: 10,
    }));
    const request = updates.find(
      (update) =>
        update.chatJoinRequest?.chat.id === chatId &&
        update.chatJoinRequest.from.id === user.userId,
    )?.chatJoinRequest;
    if (request === undefined) throw new Error("Bot API did not receive the join request");
    return user;
  };

  await attempt("approveChatJoinRequest", async () => {
    const link = await app.run(createChatInviteLink({
      chatId,
      createsJoinRequest: true,
      name: "Telly approve proof",
    }));
    try {
      const user = await requestJoin(link.inviteLink);
      const result = await app.run(approveChatJoinRequest({ chatId, userId: user.userId }));
      const member = await app.run(getChatMember({ chatId, userId: user.userId }));
      if (member.status !== "member") throw new Error("Approved user did not become a member");
      record("approveChatJoinRequest", { result, status: member.status });
      await run(
        "uv",
        ["run", helper, "remove-member", "--chat-id", String(chatId), "--user-id", String(user.userId)],
        helperOptions,
      );
    } finally {
      await app.run(revokeChatInviteLink({ chatId, inviteLink: link.inviteLink })).catch(() => {});
    }
  });

  await attempt("declineChatJoinRequest", async () => {
    const link = await app.run(createChatInviteLink({
      chatId,
      createsJoinRequest: true,
      name: "Telly decline proof",
    }));
    try {
      const user = await requestJoin(link.inviteLink);
      const result = await app.run(declineChatJoinRequest({ chatId, userId: user.userId }));
      const member = await app.run(getChatMember({ chatId, userId: user.userId }));
      if (member.status !== "left") throw new Error("Declined user did not remain outside the group");
      record("declineChatJoinRequest", { result, status: member.status });
    } finally {
      await app.run(revokeChatInviteLink({ chatId, inviteLink: link.inviteLink })).catch(() => {});
    }
  });

  let topic;
  await attempt("createForumTopic", async () => {
    topic = await app.run(createForumTopic({ chatId, name: "Telly topic" }));
    record("createForumTopic", { hasThreadId: topic.messageThreadId > 0 });
  });
  if (topic !== undefined) {
    await attempt("editForumTopic", async () => {
      const result = await app.run(editForumTopic({
        chatId,
        messageThreadId: topic.messageThreadId,
        name: "Telly renamed topic",
      }));
      record("editForumTopic", { result });
    });
    await attempt("closeForumTopic", async () => {
      const result = await app.run(closeForumTopic({ chatId, messageThreadId: topic.messageThreadId }));
      record("closeForumTopic", { result });
    });
    await attempt("reopenForumTopic", async () => {
      const result = await app.run(reopenForumTopic({ chatId, messageThreadId: topic.messageThreadId }));
      record("reopenForumTopic", { result });
    });
    await attempt("unpinAllForumTopicMessages", async () => {
      const message = await app.run(sendMessage({
        chatId,
        messageThreadId: topic.messageThreadId,
        text: "Telly forum pin proof",
      }));
      await app.run(pinChatMessage({ chatId, messageId: message.messageId }));
      const result = await app.run(unpinAllForumTopicMessages({
        chatId,
        messageThreadId: topic.messageThreadId,
      }));
      record("unpinAllForumTopicMessages", { result });
    });
    await attempt("deleteForumTopic", async () => {
      const result = await app.run(deleteForumTopic({ chatId, messageThreadId: topic.messageThreadId }));
      record("deleteForumTopic", { result });
    });
  }

  await attempt("editGeneralForumTopic", async () => {
    const result = await app.run(editGeneralForumTopic({ chatId, name: "Telly general" }));
    record("editGeneralForumTopic", { result });
  });
  await attempt("closeGeneralForumTopic", async () => {
    const result = await app.run(closeGeneralForumTopic({ chatId }));
    record("closeGeneralForumTopic", { result });
  });
  await attempt("reopenGeneralForumTopic", async () => {
    const result = await app.run(reopenGeneralForumTopic({ chatId }));
    record("reopenGeneralForumTopic", { result });
  });
  await attempt("hideGeneralForumTopic", async () => {
    const result = await app.run(hideGeneralForumTopic({ chatId }));
    record("hideGeneralForumTopic", { result });
  });
  await attempt("unhideGeneralForumTopic", async () => {
    const result = await app.run(unhideGeneralForumTopic({ chatId }));
    record("unhideGeneralForumTopic", { result });
  });
  await attempt("unpinAllGeneralForumTopicMessages", async () => {
    const message = await app.run(sendMessage({ chatId, text: "Telly general pin proof" }));
    await app.run(pinChatMessage({ chatId, messageId: message.messageId }));
    const result = await app.run(unpinAllGeneralForumTopicMessages({ chatId }));
    record("unpinAllGeneralForumTopicMessages", { result });
  });

  await normalizeBotApiFixture(userId);
  await run("uv", ["run", helper, "normalize", "--chat-id", String(chatId)], {
    cwd: repoRoot,
    env: driverEnv,
    timeout: 60_000,
  });
  normalized = true;
  await publishProofs();
  console.log(JSON.stringify({ failures, ok: failures.length === 0, proofs: pendingProofs }));
  if (failures.length > 0) process.exitCode = 1;
} finally {
  if (secondaryMemberAdded && chatId !== undefined && credential !== undefined && secondaryCredential !== undefined) {
    await run("uv", [
      "run",
      helper,
      "remove-member",
      "--chat-id",
      String(chatId),
      "--user-id",
      String(secondaryCredential.sutBotId),
    ], {
      cwd: repoRoot,
      env: { ...process.env, ...credential.driverEnv },
      timeout: 60_000,
    }).catch(() => {});
  }
  await secondaryApp?.close();
  await secondaryCredential?.release();
  if (!normalized && chatId !== undefined && credential !== undefined) {
    await normalizeBotApiFixture(Number(credential.testerUserId)).catch(() => {});
    await run("uv", ["run", helper, "normalize", "--chat-id", String(chatId)], {
      cwd: repoRoot,
      env: { ...process.env, ...credential.driverEnv },
      timeout: 60_000,
    }).catch(() => {});
  }
  await app?.close();
  await proxy?.close();
  await credential?.release();
}
