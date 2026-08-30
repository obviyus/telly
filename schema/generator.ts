import { Schema } from "effect";

import type { BotApiSpec } from "./spec.ts";

const TypeOverride = Schema.Struct({
  schema: Schema.String,
  typescript: Schema.String,
});

const MethodOverride = Schema.Struct({
  retry_safe: Schema.Boolean,
});

export const GeneratorOverrides = Schema.Struct({
  methods: Schema.Record(Schema.String, MethodOverride),
  types: Schema.Record(Schema.String, TypeOverride),
});

const MethodProof = Schema.Struct({
  artifact: Schema.String,
  recorded_time: Schema.String,
});

export const MethodProofs = Schema.Record(Schema.String, MethodProof);

export type GeneratorOverrides = typeof GeneratorOverrides.Type;
export type MethodProofs = typeof MethodProofs.Type;

const enabledMethods = new Set(["sendMessage"]);
const primitiveSchemas: Readonly<Record<string, string>> = {
  Boolean: "Schema.Boolean",
  Float: "Schema.Number",
  Integer: "Schema.Int",
  String: "Schema.String",
  True: "Schema.Literal(true)",
};
const primitiveTypes: Readonly<Record<string, string>> = {
  Boolean: "boolean",
  Float: "number",
  Integer: "number",
  String: "string",
  True: "true",
};

interface GeneratedSources {
  readonly coverage: string;
  readonly methods: string;
  readonly types: string;
}

function generatedHeader(source: string): string {
  return `// Generated from ${source}. Edit schema inputs or overrides, then regenerate.\n`;
}

function docComment(lines: ReadonlyArray<string>, indentation = ""): string {
  const text = lines.join(" ").replaceAll("*/", "*\\/");
  return `${indentation}/** ${text} */\n`;
}

function arrayItem(reference: string): string | undefined {
  return reference.startsWith("Array of ") ? reference.slice("Array of ".length) : undefined;
}

function typeExpression(reference: string, qualifier = ""): string {
  const item = arrayItem(reference);
  if (item !== undefined) {
    return `ReadonlyArray<${typeExpression(item, qualifier)}>`;
  }
  return primitiveTypes[reference] ?? `${qualifier}${reference}`;
}

function schemaExpression(reference: string, qualifier = ""): string {
  const item = arrayItem(reference);
  if (item !== undefined) {
    return `Schema.Array(${schemaExpression(item, qualifier)})`;
  }
  return primitiveSchemas[reference] ??
    `Schema.suspend((): Schema.Codec<${qualifier}${reference}> => ${qualifier}${reference})`;
}

function unionExpression(references: ReadonlyArray<string>, render: (reference: string) => string) {
  return references.map((reference) => render(reference)).join(" | ");
}

function unionSchema(references: ReadonlyArray<string>, render: (reference: string) => string) {
  const members = references.map((reference) => render(reference));
  return members.length === 1 ? members[0] : `Schema.Union([${members.join(", ")}])`;
}

function enumTargets(spec: BotApiSpec): ReadonlyMap<string, string> {
  const targets = new Map<string, string>();
  for (const [enumName, definition] of Object.entries(spec.enums)) {
    for (const target of definition.applies_to ?? []) {
      if (targets.has(target)) {
        throw new Error(`Multiple enums apply to ${target}`);
      }
      targets.set(target, enumName);
    }
  }
  return targets;
}

function fieldExpressions(
  owner: string,
  field: NonNullable<BotApiSpec["types"][string]["fields"]>[number],
  targets: ReadonlyMap<string, string>,
  qualifier = "",
) {
  const enumName = targets.get(`${owner}.${field.name}`);
  return enumName === undefined
    ? {
        schema: unionSchema(field.types, (reference) => schemaExpression(reference, qualifier)),
        type: unionExpression(field.types, (reference) => typeExpression(reference, qualifier)),
      }
    : {
        schema: `Schema.suspend((): Schema.Codec<${qualifier}${enumName}> => ${qualifier}${enumName})`,
        type: `${qualifier}${enumName}`,
      };
}

function renderEnums(spec: BotApiSpec): string {
  return Object.entries(spec.enums)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([name, definition]) => {
      const values = definition.values.map((value) => JSON.stringify(value));
      return `${docComment([definition.description])}export type ${name} = ${values.join(" | ")};\nexport const ${name}: Schema.Codec<${name}> = Schema.Literals([${values.join(", ")}]);\n`;
    })
    .join("\n");
}

function renderObjectType(
  name: string,
  definition: BotApiSpec["types"][string],
  targets: ReadonlyMap<string, string>,
): string {
  const fields = definition.fields ?? [];
  const interfaceFields = fields
    .map((field) => {
      const expressions = fieldExpressions(name, field, targets);
      return `${docComment([field.description], "  ")}  readonly ${field.name}${field.required ? "" : "?"}: ${expressions.type};`;
    })
    .join("\n");
  const schemaFields = fields
    .map((field) => {
      const expressions = fieldExpressions(name, field, targets);
      const schema = field.required
        ? expressions.schema
        : `Schema.optionalKey(${expressions.schema})`;
      return `    ${field.name}: ${schema},`;
    })
    .join("\n");

  const interfaceBody = interfaceFields.length === 0
    ? "  readonly [key: string]: unknown;"
    : `${interfaceFields}\n  readonly [key: string]: unknown;`;
  const structBody = schemaFields.length === 0 ? "" : `\n${schemaFields}\n  `;
  return `${docComment(definition.description)}export interface ${name} {\n${interfaceBody}\n}\nexport const ${name}: Schema.Codec<${name}> = Schema.StructWithRest(\n  Schema.Struct({${structBody}}),\n  [Schema.Record(Schema.String, Schema.Unknown)],\n);\n`;
}

function renderTypes(spec: BotApiSpec, overrides: GeneratorOverrides): string {
  const targets = enumTargets(spec);
  const sections = Object.entries(spec.types)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([name, definition]) => {
      const override = overrides.types[name];
      if (override !== undefined) {
        return `${docComment(definition.description)}export type ${name} = ${override.typescript};\nexport const ${name}: Schema.Codec<${name}> = ${override.schema};\n`;
      }
      if (definition.subtypes !== undefined) {
        return `${docComment(definition.description)}export type ${name} = ${unionExpression(definition.subtypes, typeExpression)};\nexport const ${name}: Schema.Codec<${name}> = ${unionSchema(definition.subtypes, schemaExpression)};\n`;
      }
      return renderObjectType(name, definition, targets);
    });
  return `${generatedHeader("schema/sources/dofer/spec.json")}import { Schema } from "effect";\n\n${renderEnums(spec)}\n${sections.join("\n")}`;
}

function renderMethods(spec: BotApiSpec, overrides: GeneratorOverrides): string {
  const targets = enumTargets(spec);
  const sections = [...enabledMethods]
    .sort()
    .map((name) => {
      const method = spec.methods[name];
      if (method === undefined) {
        throw new Error(`Enabled method ${name} is missing from the schema`);
      }
      const override = overrides.methods[name];
      if (override === undefined) {
        throw new Error(`Enabled method ${name} is missing retry safety metadata`);
      }
      const paramsName = `${name.charAt(0).toUpperCase()}${name.slice(1)}Params`;
      const fields = method.fields ?? [];
      const interfaceFields = fields
        .map((field) => {
          const expressions = fieldExpressions(name, field, targets, "Types.");
          return `${docComment([field.description], "  ")}  readonly ${field.name}${field.required ? "" : "?"}: ${expressions.type}${field.required ? "" : " | undefined"};`;
        })
        .join("\n");
      const schemaFields = fields
        .map((field) => {
          const expressions = fieldExpressions(name, field, targets, "Types.");
          const schema = field.required
            ? expressions.schema
            : `Schema.optional(${expressions.schema})`;
          return `  ${field.name}: ${schema},`;
        })
        .join("\n");
      const result = unionSchema(method.returns, (reference) => schemaExpression(reference, "Types."));
      return `${docComment(method.description)}export interface ${paramsName} {\n${interfaceFields}\n}\nexport const ${paramsName}: Schema.Codec<${paramsName}> = Schema.Struct({\n${schemaFields}\n});\n\nexport const ${name} = callMethod({\n  method: ${JSON.stringify(name)},\n  params: ${paramsName},\n  result: ${result},\n  retrySafe: ${override.retry_safe},\n});\n`;
    });
  return `${generatedHeader("schema/sources/dofer/spec.json")}import { Schema } from "effect";\n\nimport { callMethod } from "./internal/CallMethod.js";\nimport * as Types from "./types.generated.js";\n\n${sections.join("\n")}`;
}

function renderCoverage(spec: BotApiSpec, proofs: MethodProofs): string {
  const releaseTime = Date.parse(`${spec.release_date}T00:00:00Z`);
  if (!Number.isFinite(releaseTime)) {
    throw new Error(`Invalid Bot API release date ${spec.release_date}`);
  }
  const blockedExpiry = new Date(releaseTime + 30 * 24 * 60 * 60 * 1_000)
    .toISOString()
    .slice(0, 10);
  const methods = Object.fromEntries(
    Object.keys(spec.methods)
      .sort()
      .map((method) => {
        const proof = proofs[method];
        return [
          method,
          proof === undefined
            ? { expires_on: blockedExpiry, reason: "no live scenario", status: "blocked" }
            : { ...proof, status: "proven" },
        ];
      }),
  );
  return `${JSON.stringify({ botApiVersion: spec.version, methods }, null, 2)}\n`;
}

export function generateSources(
  spec: BotApiSpec,
  overrides: GeneratorOverrides,
  proofs: MethodProofs,
): GeneratedSources {
  for (const name of Object.keys(overrides.types)) {
    if (spec.types[name] === undefined) {
      throw new Error(`Override type ${name} is missing from the schema`);
    }
  }
  for (const name of Object.keys(overrides.methods)) {
    if (spec.methods[name] === undefined) {
      throw new Error(`Override method ${name} is missing from the schema`);
    }
  }
  for (const name of Object.keys(proofs)) {
    if (spec.methods[name] === undefined) {
      throw new Error(`Proof method ${name} is missing from the schema`);
    }
  }
  return {
    coverage: renderCoverage(spec, proofs),
    methods: renderMethods(spec, overrides),
    types: renderTypes(spec, overrides),
  };
}
