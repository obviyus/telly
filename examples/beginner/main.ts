import { Application } from "../../index.ts";

import { beginnerBot } from "./bot.ts";

const token = process.env["BOT_TOKEN"];
if (token === undefined) throw new Error("Set BOT_TOKEN");

await Application.make({ token }).runPolling(beginnerBot);
