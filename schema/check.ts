import { readFile } from "node:fs/promises";

import { Effect, Schema } from "effect";

import { checkBotApiSchema } from "./spec.ts";

class SchemaFileReadError extends Schema.TaggedError<SchemaFileReadError>()(
  "SchemaFileReadError",
  {
    cause: Schema.Defect(),
    path: Schema.String,
  },
) {}

const readText = Effect.fn("readSchemaText")(function* (url: URL) {
  return yield* Effect.tryPromise({
    try: () => readFile(url, "utf8"),
    catch: (cause) => new SchemaFileReadError({ cause, path: url.pathname }),
  });
});

const result = await Effect.runPromise(
  Effect.gen(function* () {
    const specText = yield* readText(new URL("./sources/dofer/spec.json", import.meta.url));
    const manifestText = yield* readText(new URL("./sources/manifest.json", import.meta.url));
    return yield* checkBotApiSchema({ manifestText, specText });
  }),
);

console.log(
  `Bot API ${result.summary.version}: ${result.summary.typeCount} types, ${result.summary.methodCount} methods, ${result.summary.enumCount} enums, ${result.summary.unresolvedReferenceCount} unresolved references`,
);
