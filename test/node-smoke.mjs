const [root, testing] = await Promise.all([
  import("telly"),
  import("telly/testing"),
]);

if (!root.Application || !root.Bot || !root.BotApiError) {
  throw new Error("telly application exports are incomplete");
}
if (!root.sendMessage || !root.SendMessageParams) {
  throw new Error("telly method exports are incomplete");
}
if (!testing.FakeBotApi || !testing.FakeBotApiReply) {
  throw new Error("telly/testing exports are incomplete");
}
if (!root.Message || !root.Chat || !root.User) {
  throw new Error("telly type exports are incomplete");
}

for (const removedPath of ["telly/methods", "telly/types"]) {
  try {
    await import(removedPath);
    throw new Error(`${removedPath} is still public`);
  } catch (error) {
    if (error?.code !== "ERR_PACKAGE_PATH_NOT_EXPORTED") throw error;
  }
}

const { Effect, Layer, Redacted } = await import("effect");
const token = "123456:node-smoke";
const fake = testing.FakeBotApi.make({ token });
const bot = root.Bot.layer({ token: Redacted.make(token) }).pipe(Layer.provide(fake.layer));
const message = await Effect.runPromise(
  root.sendMessage({ chatId: 29, text: "node-smoke" }).pipe(Effect.provide(bot)),
);
if (message.messageId !== 41 || message.chat.id !== 29 || message.text !== "node-smoke") {
  throw new Error("sendMessage failed under Node.js");
}

const invalidFake = testing.FakeBotApi.make({
  replies: [testing.FakeBotApiReply.ok({ message_id: "invalid" })],
  token,
});
const invalidBot = root.Bot.layer({ token: Redacted.make(token) }).pipe(
  Layer.provide(invalidFake.layer),
);
const invalidResult = await Effect.runPromise(
  Effect.flip(
    root.sendMessage({ chatId: 31, text: "invalid-result" }).pipe(
      Effect.provide(invalidBot),
    ),
  ),
);
if (!(invalidResult instanceof root.BotApiError)) {
  throw new Error("telly uses different BotApiError classes across root exports");
}
if (!invalidResult.message.includes("message_id") || invalidResult.retrySafe !== false) {
  throw new Error("BotApiError diagnostics failed under Node.js");
}

const applicationFake = testing.FakeBotApi.make({
  nextMessageId: 47,
  token,
});
const app = root.Application.make({
  httpClient: applicationFake.layer,
  token,
});
try {
  const applicationMessage = await app.run(
    root.sendMessage({ chatId: 41, text: "application-node-smoke" }),
  );
  if (applicationMessage.messageId !== 47 || applicationMessage.chat.id !== 41) {
    throw new Error("Application failed under Node.js");
  }
} finally {
  await app.close();
}
