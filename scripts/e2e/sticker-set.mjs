import { execFileSync } from "node:child_process";
import { mkdtemp, readFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

import {
  Application,
  addStickerToSet,
  createNewStickerSet,
  deleteStickerFromSet,
  deleteStickerSet,
  getStickerSet,
  replaceStickerInSet,
  setStickerEmojiList,
  setStickerKeywords,
  setStickerMaskPosition,
  setStickerPositionInSet,
  setStickerSetThumbnail,
  setStickerSetTitle,
  uploadStickerFile,
} from "../../index.ts";
import {
  createMethodProof,
  openTelegramTestHarness,
  publishMethodProof,
} from "./harness.mjs";

const fixtureDir = await mkdtemp(path.join(tmpdir(), "telly-sticker-set."));
let credential;
let harness;
let proxy;
let app;
let setName;
let setExists = false;
const pendingProofs = [];

function generateWebp(name, color, size) {
  const pathname = path.join(fixtureDir, name);
  execFileSync(
    "ffmpeg",
    [
      "-hide_banner",
      "-loglevel",
      "error",
      "-f",
      "lavfi",
      "-i",
      `color=c=${color}:s=${size}x${size}:d=0.1`,
      "-frames:v",
      "1",
      "-c:v",
      "libwebp",
      "-lossless",
      "1",
      pathname,
    ],
    { stdio: "inherit" },
  );
  return pathname;
}

function record(method, observation) {
  pendingProofs.push(createMethodProof(method, observation));
}

async function publishProofs() {
  for (const proof of pendingProofs) {
    await publishMethodProof(proof, credential);
  }
}

try {
  harness = await openTelegramTestHarness();
  ({ credential, proxy } = harness);
  app = Application.make({ apiRoot: proxy.apiRoot, token: credential.sutToken });
  const userId = Number(credential.testerUserId);
  if (!Number.isSafeInteger(userId)) throw new Error("Leased Telegram tester id is not a safe integer");
  const suffix = crypto.randomUUID().replaceAll("-", "").slice(0, 12);
  setName = `telly_${suffix}_by_${credential.sutUsername}`;

  const [redBytes, greenBytes, blueBytes, thumbnailBytes] = await Promise.all([
    readFile(generateWebp("red.webp", "red", 512)),
    readFile(generateWebp("green.webp", "green", 512)),
    readFile(generateWebp("blue.webp", "blue", 512)),
    readFile(generateWebp("thumbnail.webp", "yellow", 100)),
  ]);
  const upload = (bytes, name) => app.run(uploadStickerFile({
    sticker: new File([bytes], name, { type: "image/webp" }),
    stickerFormat: "static",
    userId,
  }));
  const [red, green, blue] = await Promise.all([
    upload(redBytes, "red.webp"),
    upload(greenBytes, "green.webp"),
    upload(blueBytes, "blue.webp"),
  ]);
  record("uploadStickerFile", {
    hasFileId: red.fileId.length > 0,
    hasUniqueId: red.fileUniqueId.length > 0,
  });

  const created = await app.run(createNewStickerSet({
    name: setName,
    stickers: [{ emojiList: ["🔴"], format: "static", sticker: red.fileId }],
    title: "Telly proof",
    userId,
  }));
  setExists = true;
  let stickerSet = await app.run(getStickerSet({ name: setName }));
  record("createNewStickerSet", { result: created, stickerCount: stickerSet.stickers.length });

  const added = await app.run(addStickerToSet({
    name: setName,
    sticker: { emojiList: ["🟢"], format: "static", sticker: green.fileId },
    userId,
  }));
  stickerSet = await app.run(getStickerSet({ name: setName }));
  record("addStickerToSet", { result: added, stickerCount: stickerSet.stickers.length });

  const greenSticker = stickerSet.stickers.find((sticker) => sticker.emoji === "🟢");
  const redSticker = stickerSet.stickers.find((sticker) => sticker.emoji === "🔴");
  if (greenSticker === undefined || redSticker === undefined) {
    throw new Error("Telegram did not return both temporary stickers");
  }

  const positioned = await app.run(setStickerPositionInSet({
    position: 0,
    sticker: greenSticker.fileId,
  }));
  stickerSet = await app.run(getStickerSet({ name: setName }));
  record("setStickerPositionInSet", {
    firstStickerMatches: stickerSet.stickers[0]?.fileId === greenSticker.fileId,
    result: positioned,
  });

  const titled = await app.run(setStickerSetTitle({ name: setName, title: "Telly proof renamed" }));
  stickerSet = await app.run(getStickerSet({ name: setName }));
  record("setStickerSetTitle", { result: titled, titleMatches: stickerSet.title === "Telly proof renamed" });

  const emojiSet = await app.run(setStickerEmojiList({
    emojiList: ["✅"],
    sticker: greenSticker.fileId,
  }));
  stickerSet = await app.run(getStickerSet({ name: setName }));
  record("setStickerEmojiList", {
    emojiMatches: stickerSet.stickers.some((sticker) => sticker.fileId === greenSticker.fileId && sticker.emoji === "✅"),
    result: emojiSet,
  });

  const keywordsSet = await app.run(setStickerKeywords({
    keywords: ["telly", "proof"],
    sticker: greenSticker.fileId,
  }));
  record("setStickerKeywords", { result: keywordsSet });

  const replaced = await app.run(replaceStickerInSet({
    name: setName,
    oldSticker: redSticker.fileId,
    sticker: { emojiList: ["🔵"], format: "static", sticker: blue.fileId },
    userId,
  }));
  stickerSet = await app.run(getStickerSet({ name: setName }));
  record("replaceStickerInSet", {
    result: replaced,
    stickerCount: stickerSet.stickers.length,
    blueStickerPresent: stickerSet.stickers.some((sticker) => sticker.emoji === "🔵"),
  });

  const thumbnailSet = await app.run(setStickerSetThumbnail({
    format: "static",
    name: setName,
    thumbnail: new File([thumbnailBytes], "thumbnail.webp", { type: "image/webp" }),
    userId,
  }));
  stickerSet = await app.run(getStickerSet({ name: setName }));
  record("setStickerSetThumbnail", {
    hasThumbnail: stickerSet.thumbnail !== undefined,
    result: thumbnailSet,
  });

  const removable = stickerSet.stickers.find((sticker) => sticker.fileId !== greenSticker.fileId);
  if (removable === undefined) throw new Error("Temporary sticker set has no removable sticker");
  const removed = await app.run(deleteStickerFromSet({ sticker: removable.fileId }));
  stickerSet = await app.run(getStickerSet({ name: setName }));
  record("deleteStickerFromSet", { result: removed, stickerCount: stickerSet.stickers.length });

  const deleted = await app.run(deleteStickerSet({ name: setName }));
  setExists = false;
  record("deleteStickerSet", { result: deleted });

  setName = `telly_mask_${suffix}_by_${credential.sutUsername}`;
  await app.run(createNewStickerSet({
    name: setName,
    stickerType: "mask",
    stickers: [{
      emojiList: ["🥸"],
      format: "static",
      maskPosition: { point: "eyes", scale: 1, xShift: 0, yShift: 0 },
      sticker: red.fileId,
    }],
    title: "Telly mask proof",
    userId,
  }));
  setExists = true;
  stickerSet = await app.run(getStickerSet({ name: setName }));
  const maskSticker = stickerSet.stickers[0];
  if (maskSticker === undefined) throw new Error("Temporary mask set has no sticker");
  const maskPositionSet = await app.run(setStickerMaskPosition({
    maskPosition: { point: "mouth", scale: 1.1, xShift: 0.1, yShift: -0.1 },
    sticker: maskSticker.fileId,
  }));
  stickerSet = await app.run(getStickerSet({ name: setName }));
  record("setStickerMaskPosition", {
    pointMatches: stickerSet.stickers[0]?.maskPosition?.point === "mouth",
    result: maskPositionSet,
  });
  await app.run(deleteStickerSet({ name: setName }));
  setExists = false;

  await publishProofs();
  console.log(JSON.stringify({ ok: true, proofs: pendingProofs }));
} finally {
  if (setExists) await app?.run(deleteStickerSet({ name: setName })).catch(() => {});
  await app?.close();
  await harness?.close();
}
