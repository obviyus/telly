import { execFile as execFileCallback } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

import {
  Application,
  createChatSubscriptionInviteLink,
  editChatSubscriptionInviteLink,
  getUserPersonalChatMessages,
  revokeChatInviteLink,
} from "../../index.ts";
import { acquireTelegramTestCredential } from "../../.agents/skills/telegram-e2e-userbot/scripts/telegram-test-credential.mjs";
import { startTelegramTestApiProxy } from "../../.agents/skills/telegram-e2e-userbot/scripts/telegram-test-api-proxy.mjs";

const run = promisify(execFileCallback);
const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const helper = path.join(
  repoRoot,
  ".agents/skills/telegram-e2e-userbot/scripts/isolated-group.py",
);
const convexProjectDir =
  process.env.TELLY_E2E_CONVEX_PROJECT_DIR ??
  path.resolve(repoRoot, "../openclaw/qa/convex-credential-broker");
const artifactDir = process.env.TELLY_E2E_ARTIFACT_DIR;
const credential = await acquireTelegramTestCredential({ convexProjectDir });
let proxy;
let app;
let botAdded = false;
let channelId;
let activeInviteLink;

try {
  const ensured = await run("uv", ["run", helper, "ensure-personal-channel"], {
    cwd: repoRoot,
    env: { ...process.env, ...credential.driverEnv },
    timeout: 60_000,
  });
  channelId = JSON.parse(ensured.stdout).chatId;
  await run("uv", [
    "run",
    helper,
    "add-channel-bot",
    "--chat-id",
    String(channelId),
    "--user-id",
    credential.sutBotId,
    "--username",
    credential.sutUsername,
  ], {
    cwd: repoRoot,
    env: { ...process.env, ...credential.driverEnv },
    timeout: 60_000,
  });
  botAdded = true;
  proxy = await startTelegramTestApiProxy({
    leaseHealth: {
      assertHealthy: credential.assertLeaseHealthy,
      whenUnhealthy: credential.whenLeaseUnhealthy,
    },
  });
  app = Application.make({ apiRoot: proxy.apiRoot, token: credential.sutToken });
  const userId = Number(credential.testerUserId);
  if (!Number.isSafeInteger(userId)) throw new Error("Leased tester id is not a safe integer");
  const messages = await app.run(getUserPersonalChatMessages({ limit: 1, userId }));
  const proof = {
    method: "getUserPersonalChatMessages",
    passed: true,
    recorded_time: new Date().toISOString(),
    schemaVersion: 1,
    timeline: [{
      kind: "bot_api_result",
      observation: { messageCount: messages.length },
    }],
  };
  const serialized = `${JSON.stringify(proof, null, 2)}\n`;
  for (const secret of [credential.sutToken, credential.sutUsername]) {
    if (serialized.includes(secret)) throw new Error("Personal-channel proof contains leased identity data");
  }
  if (artifactDir !== undefined) {
    const methodDir = path.resolve(repoRoot, artifactDir, proof.method);
    await mkdir(methodDir, { recursive: true });
    await writeFile(path.join(methodDir, `${proof.recorded_time.slice(0, 10)}.json`), serialized);
  }
  const link = await app.run(createChatSubscriptionInviteLink({
    chatId: channelId,
    name: "Telly subscription proof",
    subscriptionPeriod: 300,
    subscriptionPrice: 1,
  }));
  activeInviteLink = link.inviteLink;
  if (link.subscriptionPrice !== 1) throw new Error("Subscription price did not match");
  const createProof = {
    method: "createChatSubscriptionInviteLink",
    passed: true,
    recorded_time: new Date().toISOString(),
    schemaVersion: 1,
    timeline: [{
      kind: "bot_api_result",
      observation: { subscriptionPrice: link.subscriptionPrice },
    }],
  };
  const edited = await app.run(editChatSubscriptionInviteLink({
    chatId: channelId,
    inviteLink: link.inviteLink,
    name: "Telly subscription renamed",
  }));
  activeInviteLink = edited.inviteLink;
  if (edited.name !== "Telly subscription renamed") {
    throw new Error("Subscription invite name did not change");
  }
  const editProof = {
    method: "editChatSubscriptionInviteLink",
    passed: true,
    recorded_time: new Date().toISOString(),
    schemaVersion: 1,
    timeline: [{
      kind: "bot_api_result",
      observation: { nameMatches: edited.name === "Telly subscription renamed" },
    }],
  };
  await app.run(revokeChatInviteLink({ chatId: channelId, inviteLink: edited.inviteLink }));
  activeInviteLink = undefined;
  for (const current of [createProof, editProof]) {
    if (artifactDir !== undefined) {
      const methodDir = path.resolve(repoRoot, artifactDir, current.method);
      await mkdir(methodDir, { recursive: true });
      await writeFile(
        path.join(methodDir, `${current.recorded_time.slice(0, 10)}.json`),
        `${JSON.stringify(current, null, 2)}\n`,
      );
    }
  }
  console.log(JSON.stringify({ ok: true, proofs: [proof, createProof, editProof] }));
} finally {
  if (activeInviteLink !== undefined) {
    await app?.run(revokeChatInviteLink({
      chatId: channelId,
      inviteLink: activeInviteLink,
    })).catch(() => {});
  }
  if (botAdded) {
    await run("uv", [
      "run",
      helper,
      "remove-member",
      "--chat-id",
      String(channelId),
      "--user-id",
      credential.sutBotId,
    ], {
      cwd: repoRoot,
      env: { ...process.env, ...credential.driverEnv },
      timeout: 60_000,
    }).catch(() => {});
  }
  await app?.close();
  await proxy?.close();
  await credential.release();
}
