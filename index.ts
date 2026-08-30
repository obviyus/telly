import { Application } from "./src/Application.js";
import type { ApplicationOptions } from "./src/Application.js";
import { Bot, BotApiError } from "./src/BotApi.js";
import type { BotApiOptions } from "./src/BotApi.js";
import { downloadFile } from "./src/Files.js";
import type { DownloadFileOptions } from "./src/Files.js";

export * from "./src/methods.generated.js";
export * from "./src/types.generated.js";
export { Application, Bot, BotApiError, downloadFile };
export type { ApplicationOptions, BotApiOptions, DownloadFileOptions };
