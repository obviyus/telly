import { execFileSync } from "node:child_process";
import { mkdir, mkdtemp, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  Application,
  createNewStickerSet,
  deleteStickerSet,
  getStickerSet,
  setCustomEmojiStickerSetThumbnail,
} from "../../index.ts";
import { acquireTelegramTestCredential } from "../../.agents/skills/telegram-e2e-userbot/scripts/telegram-test-credential.mjs";
import { startTelegramTestApiProxy } from "../../.agents/skills/telegram-e2e-userbot/scripts/telegram-test-api-proxy.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const convexProjectDir =
  process.env.TELLY_E2E_CONVEX_PROJECT_DIR ??
  path.resolve(repoRoot, "../openclaw/qa/convex-credential-broker");
const artifactDir = process.env.TELLY_E2E_ARTIFACT_DIR;
const fixtureDir = await mkdtemp(path.join(tmpdir(), "telly-custom-emoji."));
const credential = await acquireTelegramTestCredential({ convexProjectDir });
let proxy;
let app;
let setName;

try {
  proxy = await startTelegramTestApiProxy({
    leaseHealth: {
      assertHealthy: credential.assertLeaseHealthy,
      whenUnhealthy: credential.whenLeaseUnhealthy,
    },
  });
  app = Application.make({ apiRoot: proxy.apiRoot, token: credential.sutToken });
  const userId = Number(credential.testerUserId);
  if (!Number.isSafeInteger(userId)) throw new Error("Leased tester id is not a safe integer");
  const stickerPath = path.join(fixtureDir, "custom.webp");
  execFileSync(
    "ffmpeg",
    [
      "-hide_banner",
      "-loglevel",
      "error",
      "-f",
      "lavfi",
      "-i",
      `color=c=#${crypto.randomUUID().replaceAll("-", "").slice(0, 6)}:s=100x100:d=0.1`,
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
  setName = `telly_emoji_${crypto.randomUUID().replaceAll("-", "").slice(0, 10)}_by_${credential.sutUsername}`;
  await app.run(createNewStickerSet({
    name: setName,
    needsRepainting: true,
    stickerType: "custom_emoji",
    stickers: [{
      emojiList: ["🟠"],
      format: "static",
      sticker: new File([await readFile(stickerPath)], "custom.webp", { type: "image/webp" }),
    }],
    title: "Telly emoji proof",
    userId,
  }));
  const stickerSet = await app.run(getStickerSet({ name: setName }));
  const customEmojiId = stickerSet.stickers[0]?.customEmojiId;
  if (customEmojiId === undefined) throw new Error("Temporary set has no custom emoji id");
  const result = await app.run(setCustomEmojiStickerSetThumbnail({ customEmojiId, name: setName }));
  const proof = {
    method: "setCustomEmojiStickerSetThumbnail",
    passed: true,
    recorded_time: new Date().toISOString(),
    schemaVersion: 1,
    timeline: [{ kind: "bot_api_result", observation: { result } }],
  };
  await app.run(deleteStickerSet({ name: setName }));
  setName = undefined;
  const serialized = `${JSON.stringify(proof, null, 2)}\n`;
  if (artifactDir !== undefined) {
    const methodDir = path.resolve(repoRoot, artifactDir, proof.method);
    await mkdir(methodDir, { recursive: true });
    await writeFile(path.join(methodDir, `${proof.recorded_time.slice(0, 10)}.json`), serialized);
  }
  console.log(JSON.stringify({ ok: true, proof }));
} finally {
  if (setName !== undefined) await app?.run(deleteStickerSet({ name: setName })).catch(() => {});
  await app?.close();
  await proxy?.close();
  await credential.release();
}
