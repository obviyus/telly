import { access, readFile } from "node:fs/promises";

import { Effect, Schema } from "effect";

import {
  BotApiCoverage,
  GeneratorOverrides,
  generateSources,
  MethodEvidence,
} from "./generator.ts";
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

const checkFile = Effect.fn("checkEvidenceArtifact")(function* (url: URL) {
  yield* Effect.tryPromise({
    try: () => access(url),
    catch: (cause) => new SchemaFileReadError({ cause, path: url.pathname }),
  });
});

const result = await Effect.runPromise(
  Effect.gen(function* () {
    const [
      specText,
      manifestText,
      overridesText,
      evidenceText,
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
    const evidence = yield* Schema.decodeUnknownEffect(Schema.fromJsonString(MethodEvidence), {
      onExcessProperty: "error",
    })(evidenceText);
    yield* Effect.all(
      Object.values(evidence).flatMap((item) =>
        item.status === "proven"
          ? [checkFile(new URL(`../../${item.artifact}`, import.meta.url))]
          : []
      ),
    );
    const expected = generateSources(result.spec, overrides, evidence);
    for (const [path, actual, wanted] of [
      ["src/types.generated.ts", generatedTypes, expected.types],
      ["src/methods.generated.ts", generatedMethods, expected.methods],
      ["bot-api/schema/coverage.json", generatedCoverage, expected.coverage],
    ] as const) {
      if (actual !== wanted) {
        return yield* new GeneratedSourceMismatch({ path });
      }
    }
    const coverage = yield* Schema.decodeUnknownEffect(Schema.fromJsonString(BotApiCoverage))(
      expected.coverage,
    );
    const today = new Date().toISOString().slice(0, 10);
    const expiredBlockCount = Object.values(coverage.methods).filter(
      (item) => item.status === "blocked" && item.expires_on < today,
    ).length;
    return { ...result, expiredBlockCount };
  }),
);

console.log(
  `Bot API ${result.summary.version}: ${result.summary.typeCount} types, ${result.summary.methodCount} methods, ${result.summary.enumCount} enums, ${result.summary.unresolvedReferenceCount} unresolved references, ${result.expiredBlockCount} expired evidence blocks`,
);
