import path from "node:path";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

import { acquireTelegramTestCredential } from "../../.agents/skills/telegram-e2e-userbot/scripts/telegram-test-credential.mjs";
import { startTelegramTestApiProxy } from "../../.agents/skills/telegram-e2e-userbot/scripts/telegram-test-api-proxy.mjs";

export const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
export const skillScripts = path.join(
  repoRoot,
  ".agents/skills/telegram-e2e-userbot/scripts",
);
export const artifactDir = process.env.TELLY_E2E_ARTIFACT_DIR;

const convexProjectDir = process.env.TELLY_E2E_CONVEX_PROJECT_DIR ??
  path.resolve(repoRoot, "../openclaw/qa/convex-credential-broker");

export function acquireTestCredential() {
  return acquireTelegramTestCredential({ convexProjectDir });
}

export function startTestApiProxy(credential, options = {}) {
  return startTelegramTestApiProxy({
    ...options,
    ...(credential === undefined
      ? {}
      : {
          leaseHealth: {
            assertHealthy: credential.assertLeaseHealthy,
            whenUnhealthy: credential.whenLeaseUnhealthy,
          },
        }),
  });
}

export async function openTelegramTestHarness(options = {}) {
  const credential = options.credential ?? await acquireTestCredential();
  try {
    const proxy = await startTestApiProxy(credential, options.proxy);
    let closed = false;
    return {
      credential,
      proxy,
      async close() {
        if (closed) return;
        closed = true;
        const errors = [];
        for (const close of [() => proxy.close(), () => credential.release()]) {
          try {
            await close();
          } catch (error) {
            errors.push(error);
          }
        }
        if (errors.length === 1) throw errors[0];
        if (errors.length > 1) {
          throw new AggregateError(errors, "Telegram test harness cleanup failed");
        }
      },
    };
  } catch (error) {
    await credential.release();
    throw error;
  }
}

export function waitForChild(child, label) {
  return new Promise((resolve, reject) => {
    child.once("error", reject);
    child.once("exit", (code, signal) => {
      if (code === 0) resolve({ code, signal });
      else reject(new Error(`${label} exited with code ${String(code)} signal ${String(signal)}`));
    });
  });
}

export function waitForOutput(child, getOutput, expected, timeoutMs, label) {
  return new Promise((resolve, reject) => {
    const finish = (error) => {
      clearTimeout(timeout);
      child.stdout.off("data", check);
      child.off("exit", exited);
      if (error === undefined) resolve();
      else reject(error);
    };
    const check = () => {
      if (getOutput().includes(expected)) finish();
    };
    const exited = (code, signal) => {
      finish(new Error(`${label} exited before readiness: code ${String(code)} signal ${String(signal)}`));
    };
    const timeout = setTimeout(
      () => finish(new Error(`Timed out waiting for ${label}`)),
      timeoutMs,
    );
    child.stdout.on("data", check);
    child.on("exit", exited);
    check();
  });
}

export function waitForReady(child, label, timeoutMs = 15_000) {
  let output = "";
  child.stdout.setEncoding("utf8");
  child.stdout.on("data", (chunk) => {
    output = `${output}${chunk}`.slice(-64_000);
  });
  return waitForOutput(child, () => output, "ready\n", timeoutMs, label);
}

export async function readJsonLines(file) {
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

export function requireEvent(events, predicate, label) {
  const event = events.find(predicate);
  if (event === undefined) throw new Error(`Missing Telegram event: ${label}`);
  return event;
}

export function createMethodProof(method, observation, timeline) {
  return {
    method,
    passed: true,
    recorded_time: new Date().toISOString(),
    schemaVersion: 1,
    timeline: timeline ?? [{ kind: "bot_api_result", observation }],
  };
}

export async function publishMethodProof(proof, credential, options = {}) {
  const serialized = `${JSON.stringify(proof, null, 2)}\n`;
  for (const secret of [
    credential.sutToken,
    credential.sutUsername,
    ...(options.secrets ?? []),
  ]) {
    if (serialized.includes(secret)) {
      throw new Error(`${proof.method} proof contains leased identity data`);
    }
  }
  if (artifactDir !== undefined) {
    const methodDir = path.resolve(repoRoot, artifactDir, proof.method);
    await mkdir(methodDir, { recursive: true });
    await writeFile(
      path.join(methodDir, `${proof.recorded_time.slice(0, 10)}.json`),
      serialized,
      options.exclusive === true ? { flag: "wx" } : undefined,
    );
  }
  return proof;
}

export function writeMethodProof(credential, method, observation, options = {}) {
  return publishMethodProof(
    createMethodProof(method, observation, options.timeline),
    credential,
    options,
  );
}
