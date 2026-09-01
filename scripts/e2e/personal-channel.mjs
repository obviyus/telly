import { execFile as execFileCallback } from "node:child_process";
import path from "node:path";
import { promisify } from "node:util";

import {
  Application,
  createChatSubscriptionInviteLink,
  editChatSubscriptionInviteLink,
  getUserPersonalChatMessages,
  revokeChatInviteLink,
} from "../../index.ts";
import {
  createMethodProof,
  openTelegramTestHarness,
  publishMethodProof,
  repoRoot,
} from "./harness.mjs";

const run = promisify(execFileCallback);
const helper = path.join(
  repoRoot,
  ".agents/skills/telegram-e2e-userbot/scripts/isolated-group.py",
);
const harness = await openTelegramTestHarness();
const { credential, proxy } = harness;
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
  app = Application.make({ apiRoot: proxy.apiRoot, token: credential.sutToken });
  const userId = Number(credential.testerUserId);
  if (!Number.isSafeInteger(userId)) throw new Error("Leased tester id is not a safe integer");
  const messages = await app.run(getUserPersonalChatMessages({ limit: 1, userId }));
  const proof = await publishMethodProof(createMethodProof(
    "getUserPersonalChatMessages",
    { messageCount: messages.length },
  ), credential);
  const link = await app.run(createChatSubscriptionInviteLink({
    chatId: channelId,
    name: "Telly subscription proof",
    subscriptionPeriod: 300,
    subscriptionPrice: 1,
  }));
  activeInviteLink = link.inviteLink;
  if (link.subscriptionPrice !== 1) throw new Error("Subscription price did not match");
  const createProof = createMethodProof(
    "createChatSubscriptionInviteLink",
    { subscriptionPrice: link.subscriptionPrice },
  );
  const edited = await app.run(editChatSubscriptionInviteLink({
    chatId: channelId,
    inviteLink: link.inviteLink,
    name: "Telly subscription renamed",
  }));
  activeInviteLink = edited.inviteLink;
  if (edited.name !== "Telly subscription renamed") {
    throw new Error("Subscription invite name did not change");
  }
  const editProof = createMethodProof(
    "editChatSubscriptionInviteLink",
    { nameMatches: edited.name === "Telly subscription renamed" },
  );
  await app.run(revokeChatInviteLink({ chatId: channelId, inviteLink: edited.inviteLink }));
  activeInviteLink = undefined;
  for (const current of [createProof, editProof]) {
    await publishMethodProof(current, credential);
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
  await harness.close();
}
