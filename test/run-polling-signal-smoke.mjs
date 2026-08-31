import { Application } from "telly";
import { FakeBotApi } from "telly/testing";

const token = "123456:signal-smoke";
const fake = FakeBotApi.make({ token });
const app = Application.make({ httpClient: fake.layer, token });
const running = app.runPolling(() => {
  throw new Error("No update expected");
});
const keepAlive = setInterval(() => undefined, 1_000);

await fake.whenCalled("getUpdates");
console.log("ready");
try {
  await running;
} finally {
  clearInterval(keepAlive);
}
console.log("stopped");
