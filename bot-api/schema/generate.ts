import { readFile, writeFile } from "node:fs/promises";

import { Effect, Schema } from "effect";

import { GeneratorOverrides, generateSources, MethodEvidence } from "./generator.ts";
import { checkBotApiSchema } from "./spec.ts";

const program = Effect.gen(function* () {
  const read = (path: string) =>
    Effect.tryPromise(() => readFile(new URL(path, import.meta.url), "utf8"));
  const [specText, manifestText, overridesText, evidenceText] = yield* Effect.all([
    read("./sources/dofer/spec.json"),
    read("./sources/manifest.json"),
    read("./overrides.json"),
    read("../proofs/manifest.json"),
  ]);
  const { spec } = yield* checkBotApiSchema({ manifestText, specText });
  const overrides = yield* Schema.decodeUnknownEffect(Schema.fromJsonString(GeneratorOverrides))(
    overridesText,
  );
  const evidence = yield* Schema.decodeUnknownEffect(Schema.fromJsonString(MethodEvidence), {
    onExcessProperty: "error",
  })(evidenceText);
  const sources = generateSources(spec, overrides, evidence);
  yield* Effect.all([
    Effect.tryPromise(() => writeFile(new URL("../../src/types.generated.ts", import.meta.url), sources.types)),
    Effect.tryPromise(() => writeFile(new URL("../../src/methods.generated.ts", import.meta.url), sources.methods)),
    Effect.tryPromise(() => writeFile(new URL("./coverage.json", import.meta.url), sources.coverage)),
  ]);
});

await Effect.runPromise(program);
