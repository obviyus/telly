import { execFileSync } from "node:child_process";
import { mkdtemp, readFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

import {
  Application,
  getUserProfilePhotos,
  removeMyProfilePhoto,
  setMyProfilePhoto,
} from "../../index.ts";
import { openTelegramTestHarness, writeMethodProof } from "./harness.mjs";

const fixtureDir = await mkdtemp(path.join(tmpdir(), "telly-profile-photo."));
let credential;
let harness;
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
  return writeMethodProof(credential, method, observation);
}

try {
  harness = await openTelegramTestHarness();
  ({ credential, proxy } = harness);
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
  await harness?.close();
}
