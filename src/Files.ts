import * as Effect from "effect/Effect";

import { Bot, BotApiError } from "./BotApi.js";
import { getFile } from "./methods.generated.js";

export interface DownloadFileOptions {
  readonly fileId: string;
}

export const downloadFile = Effect.fn("telegram.downloadFile")(function* (
  options: DownloadFileOptions,
): Effect.fn.Return<Uint8Array, BotApiError, Bot> {
  const file = yield* getFile({ fileId: options.fileId });
  if (file.filePath === undefined) {
    return yield* new BotApiError({
      method: "downloadFile",
      reason: {
        _tag: "InvalidResponse",
        description: "getFile returned no filePath",
      },
      retrySafe: true,
    });
  }
  const bot = yield* Bot;
  return yield* bot.downloadRaw(file.filePath);
});
