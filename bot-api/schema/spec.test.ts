import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";

import { describe, expect, test } from "bun:test";
import { Effect, Predicate } from "effect";

import { checkBotApiSchema } from "./spec.ts";

const specText = await readFile(new URL("./sources/dofer/spec.json", import.meta.url), "utf8");
const manifestText = await readFile(new URL("./sources/manifest.json", import.meta.url), "utf8");

type JsonObject = Record<string, unknown>;

function textWithMatchingHash(spec: JsonObject, manifest: JsonObject) {
  const nextSpecText = `${JSON.stringify(spec, null, 2)}\n`;
  const nextManifest = structuredClone(manifest);
  const primarySource = nextManifest["primarySource"];
  if (!Predicate.isObject(primarySource)) {
    throw new Error("Fixture manifest has no primarySource");
  }
  primarySource["sha256"] = createHash("sha256").update(nextSpecText).digest("hex");
  return {
    manifestText: JSON.stringify(nextManifest),
    specText: nextSpecText,
  };
}

async function invariantError(input: { manifestText: string; specText: string }) {
  return Effect.runPromise(Effect.flip(checkBotApiSchema(input)));
}

describe("Bot API schema", () => {
  test("loads the complete 10.3 contract with precise literal types", async () => {
    const result = await Effect.runPromise(checkBotApiSchema({ manifestText, specText }));

    expect(result.summary).toEqual({
      enumCount: 37,
      methodCount: 185,
      typeCount: 400,
      unresolvedReferenceCount: 0,
      version: "10.3",
    });
    expect(result.spec.methods["getMe"]?.returns).toEqual(["User"]);
    expect(result.spec.types["ForceReply"]?.fields?.find(({ name }) => name === "force_reply")?.types)
      .toEqual(["True"]);
  });

  test("preserves an unknown top-level field for day-zero access", async () => {
    const spec = JSON.parse(specText) as JsonObject;
    const manifest = JSON.parse(manifestText) as JsonObject;
    spec["future_feature"] = { enabled: true };

    const result = await Effect.runPromise(checkBotApiSchema(textWithMatchingHash(spec, manifest)));

    expect(Object.hasOwn(result.spec, "future_feature")).toBe(true);
  });

  test("rejects source bytes that do not match their provenance", async () => {
    const error = await invariantError({
      manifestText,
      specText: specText.replace('"version": "10.3"', '"version": "10.4"'),
    });

    expect(error).toMatchObject({
      _tag: "BotApiSchemaInvariantError",
      reason: "source_hash_mismatch",
    });
  });

  test("rejects an entity whose key and declared name differ", async () => {
    const spec = JSON.parse(specText) as JsonObject;
    const manifest = JSON.parse(manifestText) as JsonObject;
    const types = spec["types"];
    if (!Predicate.isObject(types) || !Predicate.isObject(types["User"])) {
      throw new Error("Fixture has no User type");
    }
    types["User"]["name"] = "Person";

    const error = await invariantError(textWithMatchingHash(spec, manifest));

    expect(error).toMatchObject({
      _tag: "BotApiSchemaInvariantError",
      actual: "Person",
      expected: "User",
      owner: "type:User",
      reason: "name_mismatch",
    });
  });

  test("rejects a field that refers to an unknown type", async () => {
    const spec = JSON.parse(specText) as JsonObject;
    const manifest = JSON.parse(manifestText) as JsonObject;
    const types = spec["types"];
    if (!Predicate.isObject(types) || !Predicate.isObject(types["Message"])) {
      throw new Error("Fixture has no Message type");
    }
    const messageFields = types["Message"]["fields"];
    if (!Array.isArray(messageFields)) {
      throw new Error("Fixture Message type has no fields");
    }
    const chat = messageFields.find(
      (field) => Predicate.isObject(field) && field["name"] === "chat",
    );
    if (!Predicate.isObject(chat)) {
      throw new Error("Fixture Message type has no chat field");
    }
    chat["types"] = ["MissingChat"];

    const error = await invariantError(textWithMatchingHash(spec, manifest));

    expect(error).toMatchObject({
      _tag: "BotApiSchemaInvariantError",
      field: "chat",
      owner: "type:Message",
      reason: "unknown_type_reference",
      typeName: "MissingChat",
    });
  });
});
