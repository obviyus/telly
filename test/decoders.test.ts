import { readFile } from "node:fs/promises";

import { expect, test } from "bun:test";
import { Schema } from "effect";

import type { BotApiSpec } from "../bot-api/schema/spec.ts";
import * as Decoders from "../src/internal/decoders.generated.ts";
import * as Types from "../src/types.generated.ts";

const spec = JSON.parse(
  await readFile(new URL("../bot-api/schema/sources/dofer/spec.json", import.meta.url), "utf8"),
) as BotApiSpec;
const overrides = JSON.parse(
  await readFile(new URL("../bot-api/schema/overrides.json", import.meta.url), "utf8"),
) as {
  readonly fields: Readonly<Record<string, { readonly types: ReadonlyArray<string> }>>;
  readonly types: Readonly<Record<string, {
    readonly additionalTypes?: ReadonlyArray<string>;
    readonly schema?: string;
  }>>;
};
const noFixture = Symbol("noFixture");

const enumTargets = new Map<string, string>();
for (const [name, definition] of Object.entries(spec.enums)) {
  for (const path of definition.applies_to ?? []) enumTargets.set(path, name);
}

const literalTargets = new Map<string, string>();
for (const definition of Object.values(spec.types)) {
  for (const subtype of definition.subtypes ?? []) {
    for (const field of spec.types[subtype]?.fields ?? []) {
      const literal = field.description.match(/(?:always “([^”]+)”|must be ([a-z0-9_]+))$/u);
      if (field.required && field.types.length === 1 && field.types[0] === "String" && literal) {
        literalTargets.set(`${subtype}.${field.name}`, literal[1] ?? literal[2] ?? "");
      }
    }
  }
}

function arrayItem(reference: string): string | undefined {
  return reference.startsWith("Array of ") ? reference.slice("Array of ".length) : undefined;
}

function enumReference(reference: string, name: string): string {
  const item = arrayItem(reference);
  return item === undefined ? name : `Array of ${enumReference(item, name)}`;
}

function fieldReferences(owner: string, name: string, references: ReadonlyArray<string>) {
  const path = `${owner}.${name}`;
  const resolved = overrides.fields[path]?.types ?? references;
  const enumName = enumTargets.get(path);
  return enumName === undefined
    ? resolved
    : resolved.map((reference) => enumReference(reference, enumName));
}

function wireReference(reference: string, stack: ReadonlySet<string>): unknown | typeof noFixture {
  const item = arrayItem(reference);
  if (item !== undefined) {
    const value = wireReference(item, stack);
    return value === noFixture ? [] : [value];
  }
  switch (reference) {
    case "Boolean":
      return true;
    case "Float":
      return 1.5;
    case "Integer":
      return 17;
    case "String":
      return "value";
    case "True":
      return true;
  }
  const enumDefinition = spec.enums[reference];
  if (enumDefinition !== undefined) return enumDefinition.values[0] ?? noFixture;
  if (reference === "InputFile") return new Blob(["fixture"]);
  const definition = spec.types[reference];
  if (definition === undefined || stack.has(reference)) return noFixture;
  const nextStack = new Set(stack).add(reference);
  if (definition.subtypes !== undefined) {
    const candidates = [
      ...definition.subtypes,
      ...(overrides.types[reference]?.additionalTypes ?? []),
    ];
    for (const candidate of candidates) {
      const value = wireReference(candidate, nextStack);
      if (value !== noFixture) return value;
    }
    return noFixture;
  }
  const output: Record<string, unknown> = { future_field: `${reference}-future` };
  for (const field of definition.fields ?? []) {
    if (!field.required) continue;
    const literal = literalTargets.get(`${reference}.${field.name}`);
    if (literal !== undefined) {
      output[field.name] = literal;
      continue;
    }
    let value: unknown | typeof noFixture = noFixture;
    for (const candidate of fieldReferences(reference, field.name, field.types)) {
      value = wireReference(candidate, nextStack);
      if (value !== noFixture) break;
    }
    if (value === noFixture) return noFixture;
    output[field.name] = value;
  }
  return output;
}

for (const [name, definition] of Object.entries(spec.types).sort(([left], [right]) =>
  left.localeCompare(right)
)) {
  if (name === "Update") continue;
  test(`compiled ${name} decoder agrees with its Effect Schema`, () => {
    const schema = Types[name as keyof typeof Types];
    const decoder = Decoders[`_decode${name}` as keyof typeof Decoders];
    const wire = wireReference(name, new Set());
    if (!Schema.isSchema(schema) || typeof decoder !== "function" || wire === noFixture) {
      throw new Error(`Missing differential fixture for ${name}`);
    }

    const interpreted = Schema.decodeUnknownExit(schema)(wire);
    expect(interpreted._tag, `${name} reference fixture`).toBe("Success");
    if (interpreted._tag !== "Success") return;
    const compiled: unknown = Reflect.apply(decoder, undefined, [wire]);

    expect(compiled, `${name} compiled acceptance`).not.toBe(Decoders.decodeFailure);
    expect(compiled, `${name} decoded value`).toEqual(interpreted.value);

    const firstRequired = definition.fields?.find((field) => field.required);
    if (firstRequired === undefined || typeof wire !== "object" || wire === null) return;
    const missing = { ...wire };
    delete missing[firstRequired.name as keyof typeof missing];
    const wrong = { ...wire, [firstRequired.name]: null };

    expect(Schema.decodeUnknownExit(schema)(missing)._tag, `${name} missing reference`).toBe("Failure");
    expect(Reflect.apply(decoder, undefined, [missing]), `${name} missing compiled`).toBe(
      Decoders.decodeFailure,
    );
    expect(Schema.decodeUnknownExit(schema)(wrong)._tag, `${name} wrong reference`).toBe("Failure");
    expect(Reflect.apply(decoder, undefined, [wrong]), `${name} wrong compiled`).toBe(
      Decoders.decodeFailure,
    );
  });
}
