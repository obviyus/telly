import { execFile as execFileCallback, spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";

import { Effect } from "effect";

import {
  Application,
  defineBot,
  deleteWebhook,
  getWebhookInfo,
  respond,
  setWebhook,
} from "../../index.ts";
import {
  createMethodProof,
  openTelegramTestHarness,
  publishMethodProof,
  repoRoot,
} from "./harness.mjs";

const execFile = promisify(execFileCallback);
const userDriver = path.join(
  repoRoot,
  ".agents/skills/telegram-e2e-userbot/scripts/user-driver.py",
);
const runtimeArtifactPath = process.env.TELLY_E2E_RUNTIME_ARTIFACT_PATH;
const text = `telly-webhook-${crypto.randomUUID()}`;
const echoText = `echo:${text}`;
const secretToken = `telly_${crypto.randomUUID().replaceAll("-", "_")}`;
let credential;
let harness;
let proxy;
let app;
let server;
let tunnel;
let webhook;
let webhookSet = false;
let deliveryResolve;
let deliveryReject;
const delivery = new Promise((resolve, reject) => {
  deliveryResolve = resolve;
  deliveryReject = reject;
});

function waitForTunnelUrl(child) {
  return new Promise((resolve, reject) => {
    let output = "";
    let tunnelUrl;
    const timeout = setTimeout(
      () => reject(new Error("Wrangler tunnel did not publish a URL")),
      60_000,
    );
    const inspect = (chunk) => {
      output = `${output}${chunk}`.slice(-64_000);
      tunnelUrl ??= output.match(/https:\/\/[a-z0-9-]+\.trycloudflare\.com/u)?.[0];
      if (tunnelUrl !== undefined && output.includes("Registered tunnel connection")) {
        clearTimeout(timeout);
        resolve(tunnelUrl);
      }
    };
    child.stdout.setEncoding("utf8");
    child.stderr.setEncoding("utf8");
    child.stdout.on("data", inspect);
    child.stderr.on("data", inspect);
    child.once("error", reject);
    child.once("exit", (code) => {
      clearTimeout(timeout);
      reject(new Error(`Wrangler tunnel exited before readiness with code ${String(code)}`));
    });
  });
}

async function waitForWebhook(read, predicate, label) {
  for (let attempt = 0; attempt < 50; attempt += 1) {
    const value = await read();
    if (predicate(value)) return value;
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  throw new Error(`${label} did not become visible`);
}

async function waitForPublicTunnel(url) {
  const hostname = new URL(url).hostname;
  let lastError;
  for (let attempt = 0; attempt < 240; attempt += 1) {
    try {
      const response = await fetch(
        `https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(hostname)}&type=A`,
        {
          headers: { accept: "application/dns-json" },
          signal: AbortSignal.timeout(2_000),
        },
      );
      const result = await response.json();
      if (result.Status === 0 && result.Answer?.length > 0) break;
    } catch (error) {
      lastError = error;
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
    if (attempt === 239) {
      throw new Error("Wrangler tunnel DNS did not become visible", { cause: lastError });
    }
  }
  try {
    await fetch(url, { signal: AbortSignal.timeout(10_000) });
  } catch (error) {
    throw new Error("Wrangler tunnel URL did not become reachable", { cause: error });
  }
}

function spawnWranglerTunnel(port) {
  return spawn(
    "bunx",
    [
      "wrangler@4.127.1",
      "tunnel",
      "quick-start",
      `http://127.0.0.1:${port}`,
    ],
    { detached: true, stdio: ["ignore", "pipe", "pipe"] },
  );
}

function signalTunnel(child, signal) {
  if (child?.pid === undefined) return;
  try {
    process.kill(-child.pid, signal);
  } catch (error) {
    if (error?.code !== "ESRCH") throw error;
  }
}

async function stopTunnel(child) {
  if (child === undefined) return;
  signalTunnel(child, "SIGTERM");
  if (child.exitCode === null) {
    const exited = new Promise((resolve) => child.once("exit", resolve));
    await Promise.race([
      exited,
      new Promise((resolve) => setTimeout(resolve, 5_000)),
    ]);
  }
  signalTunnel(child, "SIGKILL");
}

async function startPublicTunnel(port) {
  let lastError;
  for (let attempt = 0; attempt < 3; attempt += 1) {
    const child = spawnWranglerTunnel(port);
    try {
      const url = await waitForTunnelUrl(child);
      await waitForPublicTunnel(url);
      return { child, url };
    } catch (error) {
      lastError = error;
      await stopTunnel(child);
    }
  }
  throw new Error("Wrangler failed to create a reachable Quick Tunnel", { cause: lastError });
}

async function writeProof(method, observation, timeline) {
  return publishMethodProof(
    createMethodProof(method, observation, [
      { kind: "bot_api_result", observation },
      ...timeline,
    ]),
    credential,
    { secrets: [secretToken] },
  );
}

try {
  harness = await openTelegramTestHarness();
  ({ credential, proxy } = harness);
  app = Application.make({ apiRoot: proxy.apiRoot, token: credential.sutToken });
  const snapshot = await app.run(getWebhookInfo());
  if (snapshot.url !== "") {
    throw new Error("Leased bot already has a webhook; its secret settings cannot be restored safely");
  }

  const bot = defineBot({
    text: ({ message, text: incoming, update }) =>
      respond(message, `echo:${incoming}`).pipe(
        Effect.tap((sent) =>
          incoming === text
            ? Effect.sync(() => deliveryResolve({
                sentMessageId: sent.messageId,
                updateIdIsInteger: Number.isInteger(update.updateId),
              }))
            : Effect.void
        ),
      ),
  });
  webhook = app.startWebhook(bot, { secretToken });

  server = Bun.serve({
    hostname: "127.0.0.1",
    port: 0,
    fetch(request) {
      if (request.method !== "POST" || new URL(request.url).pathname !== "/telegram") {
        return new Response("ready");
      }
      return webhook.fetch(request).catch((error) => {
        deliveryReject(error);
        return new Response(null, { status: 500 });
      });
    },
  });
  const publicTunnel = await startPublicTunnel(server.port);
  tunnel = publicTunnel.child;
  const tunnelUrl = publicTunnel.url;
  const webhookUrl = `${tunnelUrl}/telegram`;
  const setResult = await app.run(setWebhook({
    allowedUpdates: ["message"],
    dropPendingUpdates: true,
    secretToken,
    url: webhookUrl,
  }));
  webhookSet = true;
  const active = await waitForWebhook(
    () => app.run(getWebhookInfo()),
    (value) => value.url === webhookUrl,
    "setWebhook",
  );
  const probeResult = await execFile(
    "uv",
    [
      "run",
      userDriver,
      "probe",
      "--json",
      "--any-sut-reply",
      "--chat",
      `@${credential.sutUsername}`,
      "--expect",
      echoText,
      "--text",
      text,
    ],
    { cwd: repoRoot, env: { ...process.env, ...credential.driverEnv }, timeout: 30_000 },
  );
  const delivered = await Promise.race([
    delivery,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Telegram did not deliver the webhook update")), 30_000)
    ),
  ]);
  const userObservedResponse = JSON.parse(probeResult.stdout).ok === true;
  const setProof = await writeProof(
    "setWebhook",
    {
      hasCustomCertificate: active.hasCustomCertificate,
      result: setResult,
      userObservedResponse,
    },
    [{ kind: "webhook_delivery", observation: delivered }],
  );

  const deleteResult = await app.run(deleteWebhook({ dropPendingUpdates: true }));
  webhookSet = false;
  const removed = await waitForWebhook(
    () => app.run(getWebhookInfo()),
    (value) => value.url === "",
    "deleteWebhook",
  );
  const deleteProof = await writeProof(
    "deleteWebhook",
    { pendingUpdateCount: removed.pendingUpdateCount, result: deleteResult },
    [],
  );
  if (runtimeArtifactPath !== undefined) {
    const runtimeProof = {
      feature: "webhook-runtime",
      passed: true,
      recorded_time: new Date().toISOString(),
      schemaVersion: 1,
      timeline: [
        { kind: "telegram_webhook_delivery", observation: delivered },
        { kind: "user_observed_response", observed: userObservedResponse },
      ],
    };
    const serialized = `${JSON.stringify(runtimeProof, null, 2)}\n`;
    for (const secret of [credential.sutToken, credential.sutUsername, secretToken]) {
      if (serialized.includes(secret)) throw new Error("Webhook runtime proof contains a secret");
    }
    const target = path.resolve(repoRoot, runtimeArtifactPath);
    await mkdir(path.dirname(target), { recursive: true });
    await writeFile(target, serialized);
  }
  console.log(JSON.stringify({ ok: true, proofs: [setProof, deleteProof] }));
} finally {
  if (webhookSet) await app?.run(deleteWebhook({ dropPendingUpdates: true })).catch(() => {});
  await stopTunnel(tunnel);
  server?.stop(true);
  await webhook?.stop().catch(() => {});
  await app?.close();
  await harness?.close();
}
