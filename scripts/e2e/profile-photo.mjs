import { execFileSync } from "node:child_process";
import { mkdir, mkdtemp, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  Application,
  getUserProfilePhotos,
  removeMyProfilePhoto,
  setMyProfilePhoto,
} from "../../index.ts";
import { acquireTelegramTestCredential } from "../../.agents/skills/telegram-e2e-userbot/scripts/telegram-test-credential.mjs";
import { startTelegramTestApiProxy } from "../../.agents/skills/telegram-e2e-userbot/scripts/telegram-test-api-proxy.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const convexProjectDir =
  process.env.TELLY_E2E_CONVEX_PROJECT_DIR ??
  path.resolve(repoRoot, "../openclaw/qa/convex-credential-broker");
const artifactDir = process.env.TELLY_E2E_ARTIFACT_DIR;
const fixtureDir = await mkdtemp(path.join(tmpdir(), "telly-profile-photo."));
let credential;
let proxy;
let app;
let temporaryPhotoActive = false;

async function waitForCount(userId, expected) {
  for (let attempt = 0; attempt < 50; attempt += 1) {
    const photos = await app.run(getUserProfilePhotos({ limit: 1, userId }));
    if (photos.totalCount === expected) return photos;
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  throw new Error(`Profile photo count did not become ${expected}`);
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

try {
  credential = await acquireTelegramTestCredential({ convexProjectDir });
  proxy = await startTelegramTestApiProxy({
    leaseHealth: {
      assertHealthy: credential.assertLeaseHealthy,
      whenUnhealthy: credential.whenLeaseUnhealthy,
    },
  });
  app = Application.make({ apiRoot: proxy.apiRoot, token: credential.sutToken });
  const botId = Number(credential.sutBotId);
  if (!Number.isSafeInteger(botId)) throw new Error("Leased Telegram bot id is not a safe integer");
  const snapshot = await app.run(getUserProfilePhotos({ limit: 1, userId: botId }));
  const photoPath = path.join(fixtureDir, "profile.jpg");
  execFileSync(
    "ffmpeg",
    [
      "-hide_banner",
      "-loglevel",
      "error",
      "-f",
      "lavfi",
      "-i",
      "color=c=purple:s=512x512:d=0.1",
      "-frames:v",
      "1",
      photoPath,
    ],
    { stdio: "inherit" },
  );
  const photo = new File([await readFile(photoPath)], "profile.jpg", { type: "image/jpeg" });
  const setResult = await app.run(setMyProfilePhoto({ photo: { photo, type: "static" } }));
  temporaryPhotoActive = true;
  const added = await waitForCount(botId, snapshot.totalCount + 1);

  const removeResult = await app.run(removeMyProfilePhoto());
  temporaryPhotoActive = false;
  const restored = await waitForCount(botId, snapshot.totalCount);
  const proofs = [
    await writeProof("setMyProfilePhoto", {
      afterCount: added.totalCount,
      beforeCount: snapshot.totalCount,
      result: setResult,
    }),
    await writeProof("removeMyProfilePhoto", {
      restoredCount: restored.totalCount,
      result: removeResult,
    }),
  ];
  console.log(JSON.stringify({ ok: true, proofs }));
} finally {
  if (temporaryPhotoActive) await app?.run(removeMyProfilePhoto()).catch(() => {});
  await app?.close();
  await proxy?.close();
  await credential?.release();
}
