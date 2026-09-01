import { defineBot, reply, respond } from "../../index.ts";

export const beginnerBot = defineBot({
  commands: {
    start: ({ message }) => respond(message, "Hi! Send me anything."),
  },
  text: ({ message, text }) => reply(message, text),
});
