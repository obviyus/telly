import { execFile as execFileCallback } from "node:child_process";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";

import { Application, close as closeBot, getMe, logOut } from "../../index.ts";
import {
  openTelegramTestHarness,
  repoRoot,
  startTestApiProxy,
  writeMethodProof,
} from "./harness.mjs";

const run = promisify(execFileCallback);
const helper = path.join(
  repoRoot,
  ".agents/skills/telegram-e2e-userbot/scripts/botfather-fixtures.py",
);
const selected = new Set(
  process.env.TELLY_E2E_METHODS?.split(",").filter(Boolean) ?? ["close", "logOut"],
);
const localServerImage =
  "aiogram/telegram-bot-api@sha256:3f92622be7b5bbf56ae98711901c1f42e4d9bc5e388167e4ee8d4cb2f899c5cb";
const harness = await openTelegramTestHarness();
const { credential, proxy } = harness;
const bots = [];
let localProxy;
let localServer;

async function makeDisposableBot(label) {
  const username = `telly_${label}_${crypto.randomUUID().replaceAll("-", "").slice(0, 10)}_bot`;
  const created = await run("uv", ["run", helper, "create-bot", "--username", username], {
    cwd: repoRoot,
    env: { ...process.env, ...credential.driverEnv },
    timeout: 180_000,
  });
  const token = JSON.parse(created.stdout).token;
  bots.push({ token, username });
  return { token, username };
}

async function deleteDisposableBot(bot) {
  await run("uv", ["run", helper, "delete-bot", "--username", bot.username], {
    cwd: repoRoot,
    env: { ...process.env, ...credential.driverEnv },
    timeout: 180_000,
  });
  bots.splice(bots.indexOf(bot), 1);
}

async function writeProof(method, result) {
  return writeMethodProof(credential, method, { result });
}

async function startLocalBotApiServer() {
  const config = JSON.parse(
    await readFile(path.join(credential.userDriverDir, "config.local.json"), "utf8"),
  );
  if (!Number.isSafeInteger(config.apiId) || typeof config.apiHash !== "string") {
    throw new Error("Leased TDLib config has no Telegram application credentials");
  }
  const name = `telly-bot-api-${crypto.randomUUID()}`;
  await run(
    "docker",
    [
      "run",
      "--detach",
      "--rm",
      "--name",
      name,
      "--publish",
      "127.0.0.1::8081",
      "--env",
      "TELEGRAM_API_ID",
      "--env",
      "TELEGRAM_API_HASH",
      "--env",
      "TELEGRAM_LOCAL=1",
      localServerImage,
    ],
    {
      cwd: repoRoot,
      env: {
        ...process.env,
        TELEGRAM_API_HASH: config.apiHash,
        TELEGRAM_API_ID: String(config.apiId),
      },
      timeout: 180_000,
    },
  );
  let apiRoot;
  let ready = false;
  for (let attempt = 0; attempt < 100; attempt += 1) {
    const mapped = await run("docker", ["port", name, "8081/tcp"]);
    const port = mapped.stdout.trim().match(/:(\d+)$/u)?.[1];
    if (port !== undefined) {
      apiRoot = `http://127.0.0.1:${port}`;
      try {
        await fetch(apiRoot, { signal: AbortSignal.timeout(1_000) });
        ready = true;
        break;
      } catch {}
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  if (!ready || apiRoot === undefined) throw new Error("Local Bot API server did not start");
  return {
    apiRoot,
    close: () => run("docker", ["stop", "--time", "5", name], { timeout: 30_000 }),
  };
}

try {
  const proofs = [];
  if (selected.has("logOut")) {
    const logoutFixture = await makeDisposableBot("logout");
    const logoutApp = Application.make({ apiRoot: proxy.apiRoot, token: logoutFixture.token });
    const logoutResult = await logoutApp.run(logOut());
    await logoutApp.close();
    await deleteDisposableBot(logoutFixture);
    proofs.push(await writeProof("logOut", logoutResult));
  }

  if (selected.has("close")) {
    const closeFixture = await makeDisposableBot("close");
    localServer = await startLocalBotApiServer();
    localProxy = await startTestApiProxy(undefined, { upstream: localServer.apiRoot });
    const closeApp = Application.make({ apiRoot: localProxy.apiRoot, token: closeFixture.token });
    await closeApp.run(getMe());
    let closeResult;
    try {
      closeResult = await closeApp.run(closeBot());
    } catch (error) {
      const retryAfter = error?.reason?.retryAfter;
      if (!Number.isSafeInteger(retryAfter)) throw error;
      await new Promise((resolve) => setTimeout(resolve, (retryAfter + 1) * 1_000));
      closeResult = await closeApp.run(closeBot());
    }
    await closeApp.close();
    await deleteDisposableBot(closeFixture);
    proofs.push(await writeProof("close", closeResult));
  }
  console.log(JSON.stringify({ ok: true, proofs }));
} finally {
  for (const bot of [...bots]) await deleteDisposableBot(bot).catch(() => {});
  await localProxy?.close();
  await localServer?.close().catch(() => {});
  await harness.close();
}
