import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  Application,
  getAvailableGifts,
  getChat,
  getChatAdministrators,
  getChatGifts,
  getChatMember,
  getChatMemberCount,
  getChatMenuButton,
  getForumTopicIconStickers,
  getMe,
  getMyCommands,
  getMyDefaultAdministratorRights,
  getMyDescription,
  getMyName,
  getMyShortDescription,
  getMyStarBalance,
  getStarTransactions,
  getWebhookInfo,
} from "../../index.ts";
import { acquireTelegramTestCredential } from "../../.agents/skills/telegram-e2e-userbot/scripts/telegram-test-credential.mjs";
import { startTelegramTestApiProxy } from "../../.agents/skills/telegram-e2e-userbot/scripts/telegram-test-api-proxy.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const convexProjectDir =
  process.env.TELLY_E2E_CONVEX_PROJECT_DIR ??
  path.resolve(repoRoot, "../openclaw/qa/convex-credential-broker");
const artifactDir = process.env.TELLY_E2E_ARTIFACT_DIR;
const credential = await acquireTelegramTestCredential({ convexProjectDir });
let proxy;
let app;

try {
  proxy = await startTelegramTestApiProxy({
    leaseHealth: {
      assertHealthy: credential.assertLeaseHealthy,
      whenUnhealthy: credential.whenLeaseUnhealthy,
    },
  });
  app = Application.make({ apiRoot: proxy.apiRoot, token: credential.sutToken });
  const groupId = Number(credential.groupId);
  const testerUserId = Number(credential.testerUserId);
  if (!Number.isSafeInteger(groupId) || !Number.isSafeInteger(testerUserId)) {
    throw new Error("Leased Telegram identifiers are not safe integers");
  }
  const methods = [
    {
      name: "getAvailableGifts",
      operation: getAvailableGifts,
      summarize: (result) => ({ giftCount: result.gifts.length }),
    },
    {
      name: "getChat",
      operation: () => getChat({ chatId: groupId }),
      summarize: (result) => ({ hasTitle: result.title !== undefined, type: result.type }),
    },
    {
      name: "getChatAdministrators",
      operation: () => getChatAdministrators({ chatId: groupId, returnBots: true }),
      summarize: (result) => ({ administratorCount: result.length }),
    },
    {
      name: "getChatGifts",
      operation: () => getChatGifts({ chatId: groupId, limit: 1 }),
      summarize: (result) => ({ giftCount: result.gifts.length, totalCount: result.totalCount }),
    },
    {
      name: "getChatMember",
      operation: () => getChatMember({ chatId: testerUserId, userId: testerUserId }),
      summarize: (result) => ({ status: result.status }),
    },
    {
      name: "getChatMemberCount",
      operation: () => getChatMemberCount({ chatId: testerUserId }),
      summarize: (result) => ({ memberCount: result }),
    },
    {
      name: "getChatMenuButton",
      operation: () => getChatMenuButton({}),
      summarize: (result) => ({ type: result.type }),
    },
    {
      name: "getForumTopicIconStickers",
      operation: getForumTopicIconStickers,
      summarize: (result) => ({ stickerCount: result.length }),
    },
    {
      name: "getMe",
      operation: getMe,
      summarize: (result) => ({
        hasUsername: result.username !== undefined,
        isBot: result.isBot,
      }),
    },
    {
      name: "getMyCommands",
      operation: () => getMyCommands({
        languageCode: "en",
        scope: { type: "default" },
      }),
      summarize: (result) => ({ commandCount: result.length }),
    },
    {
      name: "getMyDefaultAdministratorRights",
      operation: () => getMyDefaultAdministratorRights({}),
      summarize: (result) => ({ canManageChat: result.canManageChat }),
    },
    {
      name: "getMyDescription",
      operation: () => getMyDescription({ languageCode: "en" }),
      summarize: (result) => ({ descriptionLength: result.description.length }),
    },
    {
      name: "getMyName",
      operation: () => getMyName({ languageCode: "en" }),
      summarize: (result) => ({ nameLength: result.name.length }),
    },
    {
      name: "getMyShortDescription",
      operation: () => getMyShortDescription({ languageCode: "en" }),
      summarize: (result) => ({ shortDescriptionLength: result.shortDescription.length }),
    },
    {
      name: "getMyStarBalance",
      operation: getMyStarBalance,
      summarize: (result) => ({
        amount: result.amount,
        nanostarAmount: result.nanostarAmount ?? 0,
      }),
    },
    {
      name: "getStarTransactions",
      operation: () => getStarTransactions({ limit: 1, offset: 0 }),
      summarize: (result) => ({ transactionCount: result.transactions.length }),
    },
    {
      name: "getWebhookInfo",
      operation: getWebhookInfo,
      summarize: (result) => ({
        hasCustomCertificate: result.hasCustomCertificate,
        hasWebhook: result.url.length > 0,
        pendingUpdateCount: result.pendingUpdateCount,
      }),
    },
  ];
  const requestedMethods = process.env.TELLY_E2E_METHODS?.split(",").filter(Boolean);
  const selectedMethods = requestedMethods === undefined
    ? methods
    : requestedMethods.map((name) => {
        const method = methods.find((candidate) => candidate.name === name);
        if (method === undefined) throw new Error(`Unknown read-only method ${name}`);
        return method;
      });
  const verdicts = [];

  for (const method of selectedMethods) {
    credential.assertLeaseHealthy();
    const start = performance.now();
    const result = await app.run(method.operation());
    const verdict = {
      method: method.name,
      passed: true,
      recorded_time: new Date().toISOString(),
      schemaVersion: 1,
      timeline: [
        {
          elapsedMs: Math.round(performance.now() - start),
          kind: "bot_api_result",
          observation: method.summarize(result),
        },
      ],
    };
    const serialized = `${JSON.stringify(verdict, null, 2)}\n`;
    for (const secret of [credential.sutToken, credential.sutUsername]) {
      if (serialized.includes(secret)) {
        throw new Error(`${method.name} proof contains leased identity data`);
      }
    }
    if (artifactDir !== undefined) {
      const methodDir = path.resolve(repoRoot, artifactDir, method.name);
      await mkdir(methodDir, { recursive: true });
      await writeFile(
        path.join(methodDir, `${verdict.recorded_time.slice(0, 10)}.json`),
        serialized,
        { flag: "wx" },
      );
    }
    verdicts.push(verdict);
  }

  console.log(JSON.stringify({ ok: true, verdicts }));
} catch (error) {
  console.error(JSON.stringify({
    error: error instanceof Error ? error.message : String(error),
    ok: false,
  }));
  throw error;
} finally {
  await app?.close();
  await proxy?.close();
  await credential.release();
}
