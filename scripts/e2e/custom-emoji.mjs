import { execFileSync } from "node:child_process";
import { mkdtemp, readFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

import {
  Application,
  createNewStickerSet,
  deleteStickerSet,
  getStickerSet,
  setCustomEmojiStickerSetThumbnail,
} from "../../index.ts";
import { openTelegramTestHarness, writeMethodProof } from "./harness.mjs";

const fixtureDir = await mkdtemp(path.join(tmpdir(), "telly-custom-emoji."));
const harness = await openTelegramTestHarness();
const { credential, proxy } = harness;
let app;
let setName;

try {
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
  await app.run(deleteStickerSet({ name: setName }));
  setName = undefined;
  const proof = await writeMethodProof(
    credential,
    "setCustomEmojiStickerSetThumbnail",
    { result },
  );
  console.log(JSON.stringify({ ok: true, proof }));
} finally {
  if (setName !== undefined) await app?.run(deleteStickerSet({ name: setName })).catch(() => {});
  await app?.close();
  await harness.close();
}
