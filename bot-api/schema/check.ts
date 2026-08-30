import { readFile } from "node:fs/promises";

import { Effect, Schema } from "effect";

import { GeneratorOverrides, generateSources, MethodProofs } from "./generator.ts";
import { checkBotApiSchema } from "./spec.ts";

class SchemaFileReadError extends Schema.TaggedError<SchemaFileReadError>()(
  "SchemaFileReadError",
  {
    cause: Schema.Defect(),
    path: Schema.String,
  },
) {}

class GeneratedSourceMismatch extends Schema.TaggedError<GeneratedSourceMismatch>()(
  "GeneratedSourceMismatch",
  { path: Schema.String },
) {}

const readText = Effect.fn("readSchemaText")(function* (url: URL) {
  return yield* Effect.tryPromise({
    try: () => readFile(url, "utf8"),
    catch: (cause) => new SchemaFileReadError({ cause, path: url.pathname }),
  });
});

const result = await Effect.runPromise(
  Effect.gen(function* () {
    const [
      specText,
      manifestText,
      overridesText,
      proofsText,
      generatedTypes,
      generatedMethods,
      generatedCoverage,
    ] = yield* Effect.all([
      readText(new URL("./sources/dofer/spec.json", import.meta.url)),
      readText(new URL("./sources/manifest.json", import.meta.url)),
      readText(new URL("./overrides.json", import.meta.url)),
      readText(new URL("../proofs/manifest.json", import.meta.url)),
      readText(new URL("../../src/types.generated.ts", import.meta.url)),
      readText(new URL("../../src/methods.generated.ts", import.meta.url)),
      readText(new URL("./coverage.json", import.meta.url)),
    ]);
    const result = yield* checkBotApiSchema({ manifestText, specText });
    const overrides = yield* Schema.decodeUnknownEffect(Schema.fromJsonString(GeneratorOverrides))(
      overridesText,
    );
    const proofs = yield* Schema.decodeUnknownEffect(Schema.fromJsonString(MethodProofs))(proofsText);
    const expected = generateSources(result.spec, overrides, proofs);
    for (const [path, actual, wanted] of [
      ["src/types.generated.ts", generatedTypes, expected.types],
      ["src/methods.generated.ts", generatedMethods, expected.methods],
      ["bot-api/schema/coverage.json", generatedCoverage, expected.coverage],
    ] as const) {
      if (actual !== wanted) {
        return yield* new GeneratedSourceMismatch({ path });
      }
    }
    return result;
  }),
);

console.log(
  `Bot API ${result.summary.version}: ${result.summary.typeCount} types, ${result.summary.methodCount} methods, ${result.summary.enumCount} enums, ${result.summary.unresolvedReferenceCount} unresolved references`,
);
