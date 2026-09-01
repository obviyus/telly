import { execFile as execFileCallback } from "node:child_process";
import path from "node:path";
import { promisify } from "node:util";

import {
  Application,
  answerPreCheckoutQuery,
  deleteMessage,
  getUpdates,
  refundStarPayment,
  sendInvoice,
  sendPaidMedia,
} from "../../index.ts";
import { openTelegramTestHarness, repoRoot, writeMethodProof } from "./harness.mjs";

const run = promisify(execFileCallback);
const helper = path.join(
  repoRoot,
  ".agents/skills/telegram-e2e-userbot/scripts/payment-fixtures.py",
);
const harness = await openTelegramTestHarness();
const { credential, proxy } = harness;
const writeProof = (method, observation) =>
  writeMethodProof(credential, method, observation);
let app;
let payment;
let invoiceMessage;

try {
  app = Application.make({ apiRoot: proxy.apiRoot, token: credential.sutToken });
  const chatId = Number(credential.testerUserId);
  const userId = Number(credential.testerUserId);
  if (!Number.isSafeInteger(chatId) || !Number.isSafeInteger(userId)) {
    throw new Error("Leased tester id is not a safe integer");
  }
  await proxy.drainUpdates(credential.sutToken);
  const paidMedia = await app.run(sendPaidMedia({
    caption: "Telly paid media proof",
    chatId,
    media: [{
      media: new File([
        Buffer.from(
          "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=",
          "base64",
        ),
      ], "paid-media.png", { type: "image/png" }),
      type: "photo",
    }],
    starCount: 1,
  }));
  await writeProof("sendPaidMedia", { messageId: paidMedia.messageId });
  await app.run(deleteMessage({ chatId, messageId: paidMedia.messageId }));
  const title = `Telly payment ${crypto.randomUUID()}`;
  invoiceMessage = await app.run(sendInvoice({
    chatId,
    currency: "XTR",
    description: "Reversible Telly Test Server payment",
    payload: `telly_${crypto.randomUUID()}`,
    prices: [{ amount: 1, label: "Proof" }],
    providerToken: "",
    title,
  }));
  payment = run("uv", ["run", helper, "pay-invoice", "--title", title], {
    cwd: repoRoot,
    env: { ...process.env, ...credential.driverEnv },
    timeout: 90_000,
  });
  const queries = await app.run(getUpdates({ allowedUpdates: ["pre_checkout_query"], timeout: 20 }));
  const query = queries.find((update) => update.preCheckoutQuery !== undefined)?.preCheckoutQuery;
  if (query === undefined) throw new Error("Telly did not receive a pre-checkout query");
  const answerResult = await app.run(answerPreCheckoutQuery({
    ok: true,
    preCheckoutQueryId: query.id,
  }));
  const paymentResult = JSON.parse((await payment).stdout);
  if (paymentResult.success !== true) throw new Error("Telegram Stars payment did not succeed");
  const successfulUpdates = await app.run(getUpdates({
    allowedUpdates: ["message"],
    offset: Math.max(...queries.map((update) => update.updateId)) + 1,
    timeout: 20,
  }));
  const charge = successfulUpdates.find(
    (update) => update.message?.successfulPayment !== undefined,
  )?.message?.successfulPayment;
  if (charge === undefined) throw new Error("Telly did not receive the successful payment update");
  const refundResult = await app.run(refundStarPayment({
    telegramPaymentChargeId: charge.telegramPaymentChargeId,
    userId,
  }));
  const proofs = [
    await writeProof("answerPreCheckoutQuery", {
      paymentSucceeded: true,
      result: answerResult,
    }),
    await writeProof("refundStarPayment", { result: refundResult }),
  ];
  await app.run(deleteMessage({ chatId, messageId: invoiceMessage.messageId }));
  invoiceMessage = undefined;
  console.log(JSON.stringify({ ok: true, proofs }));
} finally {
  await payment?.catch(() => {});
  if (invoiceMessage !== undefined) {
    await app?.run(deleteMessage({
      chatId: Number(credential.testerUserId),
      messageId: invoiceMessage.messageId,
    })).catch(() => {});
  }
  await app?.close();
  await harness.close();
}
