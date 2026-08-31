import { execFile as execFileCallback } from "node:child_process";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import { Redacted } from "effect";

import {
  Application,
  getBusinessAccountGifts,
  getBusinessAccountStarBalance,
  getBusinessConnection,
  getMe,
  getManagedBotAccessSettings,
  getManagedBotToken,
  getUpdates,
  deleteStory,
  editStory,
  postStory,
  removeChatVerification,
  removeUserVerification,
  removeBusinessAccountProfilePhoto,
  replaceManagedBotToken,
  setBusinessAccountBio,
  setBusinessAccountGiftSettings,
  setBusinessAccountName,
  setBusinessAccountProfilePhoto,
  setBusinessAccountUsername,
  setManagedBotAccessSettings,
  verifyChat,
  verifyUser,
} from "../../index.ts";
import { acquireTelegramTestCredential } from "../../.agents/skills/telegram-e2e-userbot/scripts/telegram-test-credential.mjs";
import { startTelegramTestApiProxy } from "../../.agents/skills/telegram-e2e-userbot/scripts/telegram-test-api-proxy.mjs";

const run = promisify(execFileCallback);
const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const skillScripts = path.join(repoRoot, ".agents/skills/telegram-e2e-userbot/scripts");
const botfather = path.join(skillScripts, "botfather-fixtures.py");
const entitlements = path.join(skillScripts, "entitlement-fixtures.py");
const convexProjectDir =
  process.env.TELLY_E2E_CONVEX_PROJECT_DIR ??
  path.resolve(repoRoot, "../openclaw/qa/convex-credential-broker");
const artifactDir = process.env.TELLY_E2E_ARTIFACT_DIR;
const scratch = await mkdtemp(path.join(tmpdir(), "telly-entitlements."));
const urlFile = path.join(scratch, "botfather-web-app.json");
const businessStateFile = path.join(scratch, "business-account-state.json");
const browserSession = `telly-entitlements-${crypto.randomUUID()}`;
const credential = await acquireTelegramTestCredential({ convexProjectDir });
let proxy;
let app;
let businessConnectionId;
let originalBusinessState;
let giftSettingsChanged = false;

function sanitize(text) {
  return text
    .replace(/^URL:.*$/gmu, "URL: <redacted>")
    .replace(/\b\d{5,}:[A-Za-z0-9_-]{20,}\b/gu, "<token>")
    .replace(/@[A-Za-z0-9_]+/gu, "@<redacted>");
}

async function browser(...args) {
  return run("agent-browser", ["--session", browserSession, ...args], {
    cwd: repoRoot,
    timeout: 30_000,
  });
}

async function snapshot() {
  return (await browser("snapshot", "-i")).stdout;
}

async function navigateRef(ref, expectedPath) {
  const href = (await browser("get", "attr", `@${ref}`, "href")).stdout.trim();
  if (!href.startsWith(expectedPath)) throw new Error("BotFather returned an unexpected route");
  await browser("eval", `location.pathname = ${JSON.stringify(href)}`);
  await browser("wait", "--url", `**${href}*`);
}

async function ensureMode(label) {
  let settings = await snapshot();
  const line = settings.split(/\r?\n/u).find((item) => item.includes(`generic "${label}"`));
  const ref = line?.match(/ref=(e\d+)/u)?.[1];
  if (ref === undefined) throw new Error(`BotFather did not show ${label}`);
  const current = (await browser("get", "html", `@${ref}`)).stdout;
  if (current.includes("tm-toggle-on")) return;
  await browser("click", `@${ref}`);
  for (let attempt = 0; attempt < 50; attempt += 1) {
    settings = await snapshot();
    const updatedLine = settings
      .split(/\r?\n/u)
      .find((item) => item.includes(`generic "${label}"`));
    const updatedRef = updatedLine?.match(/ref=(e\d+)/u)?.[1];
    if (updatedRef !== undefined) {
      const updated = (await browser("get", "html", `@${updatedRef}`)).stdout;
      if (updated.includes("tm-toggle-on")) return;
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  throw new Error(`BotFather did not enable ${label}`);
}

async function ensureBotModes() {
  await run("uv", ["run", botfather, "write-main-web-app", "--output", urlFile], {
    cwd: repoRoot,
    env: { ...process.env, ...credential.driverEnv },
    timeout: 60_000,
  });
  const url = JSON.parse(await readFile(urlFile, "utf8")).url;
  try {
    await browser("open", url);
  } catch {
    throw new Error("BotFather MiniApp failed to open");
  }
  let bots = await snapshot();
  let botLine = bots
    .split(/\r?\n/u)
    .find((line) => line.includes(`@${credential.sutUsername}`));
  if (botLine === undefined) {
    const searchRef = bots.match(/searchbox "Search" \[ref=(e\d+)\]/u)?.[1];
    if (searchRef === undefined) throw new Error("BotFather did not show bot search");
    try {
      await browser("fill", `@${searchRef}`, credential.sutUsername);
    } catch {
      throw new Error("BotFather bot search failed");
    }
    for (let attempt = 0; attempt < 50 && botLine === undefined; attempt += 1) {
      bots = await snapshot();
      botLine = bots
        .split(/\r?\n/u)
        .find((line) => line.includes(`@${credential.sutUsername}`));
      if (botLine === undefined) await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }
  const botRef = botLine?.match(/ref=(e\d+)/u)?.[1];
  if (botRef === undefined) throw new Error("Leased bot is absent from BotFather MiniApp");
  await navigateRef(botRef, "/botfather/bot/");
  const bot = await snapshot();
  const settingsRef = bot.match(/link "Bot Settings" \[ref=(e\d+)\]/u)?.[1];
  if (settingsRef === undefined) {
    throw new Error(`BotFather did not show Bot Settings: ${sanitize(bot)}`);
  }
  await navigateRef(settingsRef, "/botfather/bot/");
  await ensureMode("Secretary Mode");
  await ensureMode("Bot Management Mode");
}

async function writeProof(method, observation) {
  const proof = {
    method,
    passed: true,
    recorded_time: new Date().toISOString(),
    schemaVersion: 1,
    timeline: [{ kind: "bot_api_result", observation }],
  };
  const serialized = `${JSON.stringify(proof, null, 2)}\n`;
  for (const secret of [credential.sutToken, credential.sutUsername]) {
    if (serialized.includes(secret)) throw new Error(`${method} proof contains leased identity data`);
  }
  if (artifactDir !== undefined) {
    const methodDir = path.resolve(repoRoot, artifactDir, method);
    await mkdir(methodDir, { recursive: true });
    await writeFile(path.join(methodDir, `${proof.recorded_time.slice(0, 10)}.json`), serialized);
  }
  return proof;
}

async function editStoryWhenReady(operation) {
  for (let attempt = 0; attempt < 50; attempt += 1) {
    try {
      return await app.run(operation);
    } catch (error) {
      if (error?.reason?.description !== "Bad Request: STORIES_NEVER_CREATED") throw error;
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }
  throw new Error("Telegram did not publish the created story");
}

async function readBusinessState() {
  await run("uv", [
    "run",
    entitlements,
    "business-account-state",
    "--output",
    businessStateFile,
  ], {
    cwd: repoRoot,
    env: { ...process.env, ...credential.driverEnv },
    timeout: 60_000,
  });
  return JSON.parse(await readFile(businessStateFile, "utf8"));
}

async function restoreBusinessAccount() {
  if (businessConnectionId === undefined || originalBusinessState === undefined) return;
  const state = originalBusinessState;
  await app.run(setBusinessAccountBio({
    bio: state.bio,
    businessConnectionId,
  }));
  await app.run(setBusinessAccountName({
    businessConnectionId,
    firstName: state.firstName,
    lastName: state.lastName,
  }));
  if (giftSettingsChanged) {
    await app.run(setBusinessAccountGiftSettings({
      acceptedGiftTypes: state.acceptedGiftTypes,
      businessConnectionId,
      showGiftButton: state.showGiftButton,
    }));
    giftSettingsChanged = false;
  }
  originalBusinessState = undefined;
}

try {
  proxy = await startTelegramTestApiProxy({
    leaseHealth: {
      assertHealthy: credential.assertLeaseHealthy,
      whenUnhealthy: credential.whenLeaseUnhealthy,
    },
  });
  app = Application.make({ apiRoot: proxy.apiRoot, token: credential.sutToken });
  await ensureBotModes();
  const bot = await app.run(getMe());
  const stale = await app.run(getUpdates({ timeout: 0 }));
  const offset = Math.max(0, ...stale.map((update) => update.updateId + 1));
  let connection = stale
    .filter((update) => update.businessConnection !== undefined)
    .at(-1)?.businessConnection;
  if (connection?.isEnabled !== true) {
    const businessSetup = await run("uv", ["run", entitlements, "connect-business"], {
      cwd: repoRoot,
      env: { ...process.env, ...credential.driverEnv },
      timeout: 60_000,
    });
    const setup = JSON.parse(businessSetup.stdout);
    if (setup.confirmed !== true) throw new Error("Telegram business connection stayed unconfirmed");
    const updates = await app.run(getUpdates({
      allowedUpdates: ["business_connection"],
      offset,
      timeout: 50,
    }));
    connection = updates
      .filter((update) => update.businessConnection !== undefined)
      .at(-1)?.businessConnection;
  }
  if (connection === undefined) throw new Error("Telly did not receive a business connection");
  const fetched = await app.run(getBusinessConnection({ businessConnectionId: connection.id }));
  if (!fetched.isEnabled) throw new Error("Telly returned a disabled business connection");
  businessConnectionId = connection.id;
  originalBusinessState = await readBusinessState();
  const proofs = [await writeProof("getBusinessConnection", {
    canConnectToBusiness: bot.canConnectToBusiness,
    canManageBots: bot.canManageBots,
    isEnabled: fetched.isEnabled,
  })];
  const failures = [];
  const balance = await app.run(getBusinessAccountStarBalance({ businessConnectionId }));
  proofs.push(await writeProof("getBusinessAccountStarBalance", {
    amountIsNonnegative: balance.amount >= 0,
  }));
  const gifts = await app.run(getBusinessAccountGifts({ businessConnectionId, limit: 1 }));
  proofs.push(await writeProof("getBusinessAccountGifts", {
    resultCount: gifts.gifts.length,
    totalCount: gifts.totalCount,
  }));

  const proofBio = `Telly business proof ${crypto.randomUUID().slice(0, 8)}`;
  const bioResult = await app.run(setBusinessAccountBio({
    bio: proofBio,
    businessConnectionId,
  }));
  proofs.push(await writeProof("setBusinessAccountBio", { accepted: true, result: bioResult }));
  await app.run(setBusinessAccountBio({ bio: originalBusinessState.bio, businessConnectionId }));

  const nameResult = await app.run(setBusinessAccountName({
    businessConnectionId,
    firstName: "Telly Business",
    lastName: "Proof",
  }));
  proofs.push(await writeProof("setBusinessAccountName", { accepted: true, result: nameResult }));
  await app.run(setBusinessAccountName({
    businessConnectionId,
    firstName: originalBusinessState.firstName,
    lastName: originalBusinessState.lastName,
  }));

  const acceptedGiftTypes = {
    ...originalBusinessState.acceptedGiftTypes,
    unlimitedGifts: !originalBusinessState.acceptedGiftTypes.unlimitedGifts,
  };
  try {
    const giftsResult = await app.run(setBusinessAccountGiftSettings({
      acceptedGiftTypes,
      businessConnectionId,
      showGiftButton: originalBusinessState.showGiftButton,
    }));
    giftSettingsChanged = true;
    proofs.push(await writeProof("setBusinessAccountGiftSettings", {
      accepted: true,
      result: giftsResult,
    }));
  } catch (error) {
    failures.push({
      method: "setBusinessAccountGiftSettings",
      error: error instanceof Error ? error.message : String(error),
    });
  }

  const proofUsername = `tellyqa${crypto.randomUUID().replaceAll("-", "").slice(0, 12)}`;
  try {
    const result = await app.run(setBusinessAccountUsername({
      businessConnectionId,
      username: proofUsername,
    }));
    proofs.push(await writeProof("setBusinessAccountUsername", { accepted: true, result }));
  } catch (error) {
    failures.push({
      method: "setBusinessAccountUsername",
      error: error instanceof Error ? error.message : String(error),
    });
  } finally {
    await app.run(setBusinessAccountUsername({
      businessConnectionId,
      username: originalBusinessState.username,
    })).catch(() => {});
  }

  const profilePath = path.join(scratch, "business-profile.jpg");
  await run("ffmpeg", [
    "-hide_banner",
    "-loglevel",
    "error",
    "-f",
    "lavfi",
    "-i",
    "color=c=blue:s=512x512:d=0.1",
    "-frames:v",
    "1",
    profilePath,
  ]);
  let profileSet = false;
  try {
    const result = await app.run(setBusinessAccountProfilePhoto({
      businessConnectionId,
      photo: {
        photo: new File([await readFile(profilePath)], "business-profile.jpg", {
          type: "image/jpeg",
        }),
        type: "static",
      },
    }));
    profileSet = true;
    proofs.push(await writeProof("setBusinessAccountProfilePhoto", { accepted: true, result }));
    const removed = await app.run(removeBusinessAccountProfilePhoto({ businessConnectionId }));
    profileSet = false;
    proofs.push(await writeProof("removeBusinessAccountProfilePhoto", { result: removed }));
  } catch (error) {
    failures.push({
      method: profileSet ? "removeBusinessAccountProfilePhoto" : "setBusinessAccountProfilePhoto",
      error: error instanceof Error ? error.message : String(error),
    });
  } finally {
    if (profileSet) {
      await app.run(removeBusinessAccountProfilePhoto({ businessConnectionId })).catch(() => {});
    }
  }

  const storyBeforePath = path.join(scratch, "story-before.jpg");
  const storyAfterPath = path.join(scratch, "story-after.jpg");
  await Promise.all([
    run("ffmpeg", [
      "-hide_banner", "-loglevel", "error", "-f", "lavfi", "-i",
      "color=c=orange:s=1080x1920:d=0.1", "-frames:v", "1", storyBeforePath,
    ]),
    run("ffmpeg", [
      "-hide_banner", "-loglevel", "error", "-f", "lavfi", "-i",
      "color=c=green:s=1080x1920:d=0.1", "-frames:v", "1", storyAfterPath,
    ]),
  ]);
  let storyId;
  try {
    const story = await app.run(postStory({
      activePeriod: 6 * 3_600,
      businessConnectionId,
      caption: "Telly story proof",
      content: {
        photo: new File([await readFile(storyBeforePath)], "story-before.jpg", {
          type: "image/jpeg",
        }),
        type: "photo",
      },
    }));
    storyId = story.id;
    proofs.push(await writeProof("postStory", { storyCreated: story.id > 0 }));
    const edited = await editStoryWhenReady(editStory({
      businessConnectionId,
      caption: "Telly story edited",
      content: {
        photo: new File([await readFile(storyAfterPath)], "story-after.jpg", {
          type: "image/jpeg",
        }),
        type: "photo",
      },
      storyId,
    }));
    proofs.push(await writeProof("editStory", { sameStory: edited.id === storyId }));
    const deleted = await app.run(deleteStory({ businessConnectionId, storyId }));
    storyId = undefined;
    proofs.push(await writeProof("deleteStory", { result: deleted }));
  } catch (error) {
    failures.push({
      method: storyId === undefined ? "postStory" : "businessStoryFixture",
      error: error instanceof Error ? error.message : String(error),
    });
  } finally {
    if (storyId !== undefined) {
      await app.run(deleteStory({ businessConnectionId, storyId })).catch(() => {});
    }
  }

  const testerUserId = Number(credential.testerUserId);
  let userVerified = false;
  let chatVerified = false;
  try {
    const verifiedUser = await app.run(verifyUser({ userId: testerUserId }));
    userVerified = true;
    proofs.push(await writeProof("verifyUser", { result: verifiedUser }));
    const removedUser = await app.run(removeUserVerification({ userId: testerUserId }));
    userVerified = false;
    proofs.push(await writeProof("removeUserVerification", { result: removedUser }));
    const verifiedChat = await app.run(verifyChat({ chatId: `@${credential.sutUsername}` }));
    chatVerified = true;
    proofs.push(await writeProof("verifyChat", { result: verifiedChat }));
    const removedChat = await app.run(removeChatVerification({
      chatId: `@${credential.sutUsername}`,
    }));
    chatVerified = false;
    proofs.push(await writeProof("removeChatVerification", { result: removedChat }));
  } catch (error) {
    failures.push({
      method: "verificationFixture",
      error: error instanceof Error ? error.message : String(error),
    });
  } finally {
    if (userVerified) {
      await app.run(removeUserVerification({ userId: testerUserId })).catch(() => {});
    }
    if (chatVerified) {
      await app.run(removeChatVerification({
        chatId: `@${credential.sutUsername}`,
      })).catch(() => {});
    }
  }

  if (process.env.TELLY_E2E_SKIP_MANAGED !== "1") {
    try {
      const managedSetup = await run("uv", ["run", entitlements, "ensure-managed-bot"], {
        cwd: repoRoot,
        env: { ...process.env, ...credential.driverEnv },
        timeout: 90_000,
      });
      const managedBotId = JSON.parse(managedSetup.stdout).botUserId;
      if (!Number.isSafeInteger(managedBotId)) throw new Error("Managed bot fixture has no id");
      const token = await app.run(getManagedBotToken({ userId: managedBotId }));
      if (!Redacted.isRedacted(token)) throw new Error("Managed bot token was not redacted");
      proofs.push(await writeProof("getManagedBotToken", { redacted: true }));

      const access = await app.run(getManagedBotAccessSettings({ userId: managedBotId }));
      proofs.push(await writeProof("getManagedBotAccessSettings", {
        isAccessRestricted: access.isAccessRestricted,
      }));
      const isAccessRestricted = !access.isAccessRestricted;
      const accessResult = await app.run(setManagedBotAccessSettings({
        addedUserIds: [],
        isAccessRestricted,
        userId: managedBotId,
      }));
      const changedAccess = await app.run(getManagedBotAccessSettings({ userId: managedBotId }));
      if (changedAccess.isAccessRestricted !== isAccessRestricted) {
        throw new Error("Managed bot access setting did not change");
      }
      proofs.push(await writeProof("setManagedBotAccessSettings", {
        changed: true,
        result: accessResult,
      }));
      await app.run(setManagedBotAccessSettings({
        addedUserIds: access.addedUsers?.map((user) => user.id) ?? [],
        isAccessRestricted: access.isAccessRestricted,
        userId: managedBotId,
      }));

      const replacement = await app.run(replaceManagedBotToken({ userId: managedBotId }));
      if (!Redacted.isRedacted(replacement)) {
        throw new Error("Replacement token was not redacted");
      }
      proofs.push(await writeProof("replaceManagedBotToken", { redacted: true }));
    } catch (error) {
      failures.push({
        method: "managedBotFixture",
        error: error instanceof Error ? error.message : String(error),
      });
    }
  }
  await restoreBusinessAccount();
  console.log(JSON.stringify({ failures, ok: failures.length === 0, proofs }));
  if (failures.length > 0) process.exitCode = 1;
} finally {
  await run("agent-browser", ["--session", browserSession, "close"], {
    cwd: repoRoot,
    timeout: 30_000,
  }).catch(() => {});
  await restoreBusinessAccount().catch(() => {});
  await app?.close();
  await proxy?.close();
  await credential.release();
  await rm(scratch, { force: true, recursive: true });
}
