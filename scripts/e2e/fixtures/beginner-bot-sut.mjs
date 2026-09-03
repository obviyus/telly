import {
  Application,
  defineBot,
  reply,
  respond,
} from "../../../index.ts";

const token = process.env.TELLY_E2E_BOT_TOKEN;
const apiRoot = process.env.TELLY_E2E_API_ROOT;
const startText = process.env.TELLY_E2E_START_TEXT;
const echoPrefix = process.env.TELLY_E2E_ECHO_PREFIX;
if (token === undefined || apiRoot === undefined || startText === undefined || echoPrefix === undefined) {
  throw new Error("Missing beginner bot E2E configuration");
}

const bot = defineBot({
  commands: {
    describe: ({ argText, message }) => reply(message, `caption:${argText}`),
    start: ({ message }) => respond(message, startText),
  },
  text: ({ message, text }) => reply(message, `${echoPrefix}${text}`),
});

console.log("ready");
await Application.make({ apiRoot, token }).runPolling(bot, {
  allowedUpdates: ["message"],
  concurrency: 1,
  pollTimeoutSeconds: 2,
});
