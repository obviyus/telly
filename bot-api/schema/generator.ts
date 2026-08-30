import { Schema } from "effect";

import type { BotApiSpec } from "./spec.ts";

const TypeOverride = Schema.Struct({
  schema: Schema.String,
  typescript: Schema.String,
});

const MethodOverride = Schema.Struct({
  resultSchema: Schema.optionalKey(Schema.String),
  retrySafe: Schema.Boolean,
});

const FieldOverride = Schema.Struct({
  types: Schema.Array(Schema.String),
});

export const GeneratorOverrides = Schema.Struct({
  fields: Schema.Record(Schema.String, FieldOverride),
  methods: Schema.Record(Schema.String, MethodOverride),
  types: Schema.Record(Schema.String, TypeOverride),
});

const ProvenMethodEvidence = Schema.Struct({
  artifact: Schema.String,
  recorded_time: Schema.String,
  status: Schema.Literal("proven"),
});

const BlockedMethodEvidence = Schema.Struct({
  expires_on: Schema.String,
  reason: Schema.String,
  status: Schema.Literal("blocked"),
});

export const MethodEvidence = Schema.Record(
  Schema.String,
  Schema.Union([ProvenMethodEvidence, BlockedMethodEvidence]),
);

export const BotApiCoverage = Schema.Struct({
  botApiVersion: Schema.String,
  methods: MethodEvidence,
});

export type GeneratorOverrides = typeof GeneratorOverrides.Type;
export type MethodEvidence = typeof MethodEvidence.Type;

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

function enumReference(reference: string, enumName: string): string {
  const item = arrayItem(reference);
  if (item !== undefined) {
    return `Array of ${enumReference(item, enumName)}`;
  }
  if (reference !== "String") {
    throw new Error(`Enum ${enumName} must refine a String leaf, found ${reference}`);
  }
  return enumName;
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
    `Schema.suspend((): Schema.Codec<${qualifier}${reference}, unknown> => ${qualifier}${reference})`;
}

function unionExpression(references: ReadonlyArray<string>, render: (reference: string) => string) {
  return references.map((reference) => render(reference)).join(" | ");
}

function unionSchema(references: ReadonlyArray<string>, render: (reference: string) => string) {
  const members = references.map((reference) => render(reference));
  return members.length === 1 ? members[0] : `Schema.Union([${members.join(", ")}])`;
}

type FieldTarget =
  | { readonly _tag: "Enum"; readonly name: string }
  | { readonly _tag: "Literal"; readonly value: string };

function addFieldTarget(targets: Map<string, FieldTarget>, path: string, target: FieldTarget) {
  const existing = targets.get(path);
  if (existing !== undefined) {
    const same = existing._tag === "Enum" && target._tag === "Enum"
      ? existing.name === target.name
      : existing._tag === "Literal" && target._tag === "Literal" &&
        existing.value === target.value;
    if (same) {
      return;
    }
    throw new Error(`Conflicting field targets apply to ${path}`);
  }
  targets.set(path, target);
}

function discriminatorValue(description: string): string | undefined {
  const match = description.match(/(?:always “([^”]+)”|must be ([a-z0-9_]+))$/u);
  return match?.[1] ?? match?.[2];
}

function fieldTargets(spec: BotApiSpec): ReadonlyMap<string, FieldTarget> {
  const targets = new Map<string, FieldTarget>();
  for (const [enumName, definition] of Object.entries(spec.enums)) {
    for (const target of definition.applies_to ?? []) {
      const [ownerName, fieldName] = target.split(".");
      const owner = ownerName === undefined
        ? undefined
        : spec.types[ownerName] ?? spec.methods[ownerName];
      const field = owner?.fields?.find((candidate) => candidate.name === fieldName);
      if (ownerName === undefined || fieldName === undefined || field === undefined) {
        throw new Error(`Enum ${enumName} targets missing field ${target}`);
      }
      // Enums refine the String leaf so Array of String targets keep their container.
      for (const reference of field.types) {
        enumReference(reference, enumName);
      }
      addFieldTarget(targets, target, { _tag: "Enum", name: enumName });
    }
  }

  for (const [parentName, definition] of Object.entries(spec.types)) {
    if (definition.subtypes === undefined) continue;
    const discriminators = definition.subtypes.map((subtypeName) => {
      const fields = (spec.types[subtypeName]?.fields ?? []).flatMap((field) => {
        const value = discriminatorValue(field.description);
        return field.required && field.types.length === 1 && field.types[0] === "String" && value !== undefined
          ? [{ fieldName: field.name, subtypeName, value }]
          : [];
      });
      if (fields.length > 1) {
        throw new Error(`Subtype ${subtypeName} has multiple discriminator fields`);
      }
      return fields[0];
    });
    const present = discriminators.filter((item) => item !== undefined);
    if (present.length === 0) continue;
    if (present.length !== definition.subtypes.length) {
      throw new Error(`Only some ${parentName} subtypes have discriminator fields`);
    }
    const fieldName = present[0]?.fieldName;
    if (fieldName === undefined || present.some((item) => item.fieldName !== fieldName)) {
      throw new Error(`${parentName} subtypes use different discriminator fields`);
    }
    for (const item of present) {
      if (item === undefined) {
        throw new Error(`${parentName} has an incomplete discriminator`);
      }
      addFieldTarget(targets, `${item.subtypeName}.${item.fieldName}`, {
        _tag: "Literal",
        value: item.value,
      });
    }
  }
  return targets;
}

function fieldExpressions(
  owner: string,
  field: NonNullable<BotApiSpec["types"][string]["fields"]>[number],
  targets: ReadonlyMap<string, FieldTarget>,
  overrides: GeneratorOverrides,
  qualifier = "",
) {
  const target = targets.get(`${owner}.${field.name}`);
  const references = overrides.fields[`${owner}.${field.name}`]?.types ?? field.types;
  if (target === undefined) {
    return {
      schema: unionSchema(references, (reference) => schemaExpression(reference, qualifier)),
      type: unionExpression(references, (reference) => typeExpression(reference, qualifier)),
    };
  }
  if (target._tag === "Literal") {
    const literal = JSON.stringify(target.value);
    return { schema: `Schema.Literal(${literal})`, type: literal };
  }
  const enumReferences = references.map((reference) => enumReference(reference, target.name));
  return {
    schema: unionSchema(enumReferences, (reference) => schemaExpression(reference, qualifier)),
    type: unionExpression(enumReferences, (reference) => typeExpression(reference, qualifier)),
  };
}

function publicFieldName(wireName: string): string {
  const name = wireName.replace(/_([a-z0-9])/gu, (_, character: string) =>
    character.toUpperCase()
  );
  if (!/^[A-Za-z_$][A-Za-z0-9_$]*$/u.test(name)) {
    throw new Error(`Telegram field ${wireName} cannot become a TypeScript identifier`);
  }
  return name;
}

interface RenamedField {
  readonly publicName: string;
  readonly wireName: string;
}

function publicKeyMapping(fields: ReadonlyArray<RenamedField>) {
  const renamed = fields.filter((field) => field.publicName !== field.wireName);
  return renamed
    .map((field) => `${field.wireName}: ${JSON.stringify(field.publicName)}`)
    .join(", ");
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
  targets: ReadonlyMap<string, FieldTarget>,
  overrides: GeneratorOverrides,
): string {
  const fields = definition.fields ?? [];
  const rendered = fields.map((field) => {
    const expressions = fieldExpressions(name, field, targets, overrides);
    const schema = field.required
      ? expressions.schema
      : `Schema.optionalKey(${expressions.schema})`;
    return {
      description: field.description,
      publicName: publicFieldName(field.name),
      required: field.required,
      schema,
      type: expressions.type,
      wireName: field.name,
    };
  });
  const publicNames = new Set(rendered.map((field) => field.publicName));
  if (publicNames.size !== rendered.length) {
    throw new Error(`Telegram type ${name} has colliding camelCase fields`);
  }
  const interfaceFields = rendered
    .map((field) =>
      `${docComment([field.description], "  ")}  readonly ${field.publicName}${field.required ? "" : "?"}: ${field.type};`
    )
    .join("\n");
  const encodedFields = rendered
    .map((field) => `    ${field.wireName}: ${field.schema},`)
    .join("\n");

  const interfaceBody = interfaceFields.length === 0
    ? "  readonly [key: string]: unknown;"
    : `${interfaceFields}\n  readonly [key: string]: unknown;`;
  const encodedBody = encodedFields.length === 0 ? "" : `\n${encodedFields}\n  `;
  const renamed = rendered.filter((field) => field.publicName !== field.wireName);
  if (renamed.length === 0) {
    return `${docComment(definition.description)}export interface ${name} {\n${interfaceBody}\n}\nexport const ${name}: Schema.Codec<${name}, unknown> = Schema.StructWithRest(\n  Schema.Struct({${encodedBody}}),\n  [Schema.Record(Schema.String, Schema.Unknown)],\n);\n`;
  }
  // The encoded schema validates both directions; the declared target carries the camelCase type without validating every field twice.
  return `${docComment(definition.description)}export interface ${name} {\n${interfaceBody}\n}\nconst _${name}PublicKeys = { ${publicKeyMapping(renamed)} } as const;\nconst _${name}WireKeys = invertKeys(_${name}PublicKeys);\nconst _${name}Encoded = Schema.StructWithRest(\n  Schema.Struct({${encodedBody}}),\n  [Schema.Record(Schema.String, Schema.Unknown)],\n);\nconst _${name}Decoded = Schema.declare<${name}>((input): input is ${name} => Predicate.isObject(input));\nexport const ${name}: Schema.Codec<${name}, unknown> = _${name}Encoded.pipe(\n  Schema.decodeTo(_${name}Decoded, {\n    decode: SchemaGetter.transform(Struct.renameKeys(_${name}PublicKeys)),\n    encode: SchemaGetter.transform(Struct.renameKeys(_${name}WireKeys)),\n  }),\n);\n`;
}

function renderTypes(
  spec: BotApiSpec,
  overrides: GeneratorOverrides,
  targets: ReadonlyMap<string, FieldTarget>,
): string {
  const sections = Object.entries(spec.types)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([name, definition]) => {
      const override = overrides.types[name];
      if (override !== undefined) {
        return `${docComment(definition.description)}export type ${name} = ${override.typescript};\nexport const ${name}: Schema.Codec<${name}> = ${override.schema};\n`;
      }
      if (definition.subtypes !== undefined) {
        return `${docComment(definition.description)}export type ${name} = ${unionExpression(definition.subtypes, typeExpression)};\nexport const ${name}: Schema.Codec<${name}, unknown> = ${unionSchema(definition.subtypes, schemaExpression)};\n`;
      }
      return renderObjectType(name, definition, targets, overrides);
    });
  return `${generatedHeader("bot-api/schema/sources/dofer/spec.json")}import { Predicate, Schema, SchemaGetter, Struct } from "effect";\n\nimport { invertKeys } from "./internal/SchemaKeys.js";\n\n${renderEnums(spec)}\n${sections.join("\n")}`;
}

function renderMethods(
  spec: BotApiSpec,
  overrides: GeneratorOverrides,
  targets: ReadonlyMap<string, FieldTarget>,
): string {
  const sections = Object.entries(overrides.methods)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([name, override]) => {
      const method = spec.methods[name];
      if (method === undefined) {
        throw new Error(`Enabled method ${name} is missing from the schema`);
      }
      const paramsName = `${name.charAt(0).toUpperCase()}${name.slice(1)}Params`;
      const fields = method.fields ?? [];
      const rendered = fields.map((field) => {
        const expressions = fieldExpressions(name, field, targets, overrides, "Types.");
        const schema = field.required
          ? expressions.schema
          : `Schema.optional(${expressions.schema})`;
        return {
          description: field.description,
          publicName: publicFieldName(field.name),
          required: field.required,
          schema,
          type: expressions.type,
          wireName: field.name,
        };
      });
      const publicNames = new Set(rendered.map((field) => field.publicName));
      if (publicNames.size !== rendered.length) {
        throw new Error(`Telegram method ${name} has colliding camelCase fields`);
      }
      const interfaceFields = rendered
        .map((field) =>
          `${docComment([field.description], "  ")}  readonly ${field.publicName}${field.required ? "" : "?"}: ${field.type}${field.required ? "" : " | undefined"};`
        )
        .join("\n");
      const encodedFields = rendered
        .map((field) => `  ${field.wireName}: ${field.schema},`)
        .join("\n");
      const renamed = rendered.filter((field) => field.publicName !== field.wireName);
      // Nested codecs can transform even when every top-level key is unchanged.
      const paramsSchema = renamed.length === 0
        ? `export const ${paramsName}: Schema.Codec<${paramsName}, Readonly<Record<string, unknown>>> = Schema.Struct({\n${encodedFields}\n});`
        : `const _${paramsName}PublicKeys = { ${publicKeyMapping(renamed)} } as const;\nconst _${paramsName}WireKeys = invertKeys(_${paramsName}PublicKeys);\nconst _${paramsName}Encoded = Schema.Struct({\n${encodedFields}\n});\nconst _${paramsName}Decoded = Schema.declare<${paramsName}>((input): input is ${paramsName} => Predicate.isObject(input));\nexport const ${paramsName}: Schema.Codec<${paramsName}, Readonly<Record<string, unknown>>> = _${paramsName}Encoded.pipe(\n  Schema.decodeTo(_${paramsName}Decoded, {\n    decode: SchemaGetter.transform(Struct.renameKeys(_${paramsName}PublicKeys)),\n    encode: SchemaGetter.transform(Struct.renameKeys(_${paramsName}WireKeys)),\n  }),\n);`;
      const result = override.resultSchema ??
        unionSchema(method.returns, (reference) => schemaExpression(reference, "Types."));
      const parameterDeclaration = fields.length === 0
        ? ""
        : `export interface ${paramsName} {\n${interfaceFields}\n}\n${paramsSchema}\n\n`;
      const descriptorParams = fields.length === 0 ? "" : `  params: ${paramsName},\n`;
      return `${docComment(method.description)}${parameterDeclaration}export const ${name} = callMethod({\n  method: ${JSON.stringify(name)},\n${descriptorParams}  result: ${result},\n  retrySafe: ${override.retrySafe},\n});\n`;
    });
  return `${generatedHeader("bot-api/schema/sources/dofer/spec.json")}import { Predicate, Schema, SchemaGetter, Struct } from "effect";\n\nimport { callMethod } from "./internal/CallMethod.js";\nimport { invertKeys } from "./internal/SchemaKeys.js";\nimport * as Types from "./types.generated.js";\n\n${sections.join("\n")}`;
}

function renderCoverage(spec: BotApiSpec, evidence: MethodEvidence): string {
  const methods = Object.fromEntries(
    Object.entries(evidence).sort(([left], [right]) => left.localeCompare(right)),
  );
  return `${JSON.stringify({ botApiVersion: spec.version, methods }, null, 2)}\n`;
}

export function generateSources(
  spec: BotApiSpec,
  overrides: GeneratorOverrides,
  evidence: MethodEvidence,
): GeneratedSources {
  const schemaMethods = Object.keys(spec.methods).sort();
  const missingOverrides = schemaMethods.filter((name) => overrides.methods[name] === undefined);
  if (missingOverrides.length > 0) {
    throw new Error(`Methods missing retry metadata: ${missingOverrides.join(", ")}`);
  }
  const missingEvidence = schemaMethods.filter((name) => evidence[name] === undefined);
  if (missingEvidence.length > 0) {
    throw new Error(`Methods missing evidence: ${missingEvidence.join(", ")}`);
  }
  const declaredTypes = new Set([...Object.keys(spec.types), ...Object.keys(primitiveTypes)]);
  for (const [ownerName, definition] of Object.entries(spec.types)) {
    for (const field of definition.fields ?? []) {
      const path = `${ownerName}.${field.name}`;
      const sourceHasInputFile = field.types.some((reference) => reference === "InputFile");
      if (
        field.description.includes("attach://") &&
        !sourceHasInputFile &&
        overrides.fields[path] === undefined
      ) {
        throw new Error(`Nested upload field ${path} needs a field override`);
      }
    }
  }
  for (const [path, override] of Object.entries(overrides.fields)) {
    const separator = path.indexOf(".");
    const ownerName = separator === -1 ? path : path.slice(0, separator);
    const fieldName = separator === -1 ? "" : path.slice(separator + 1);
    const owner = spec.types[ownerName] ?? spec.methods[ownerName];
    const field = owner?.fields?.find((candidate) => candidate.name === fieldName);
    if (field === undefined) {
      throw new Error(`Field override ${path} is missing from the schema`);
    }
    if (JSON.stringify(override.types) === JSON.stringify(field.types)) {
      throw new Error(`Field override ${path} duplicates the schema`);
    }
    for (const reference of override.types) {
      let typeName = reference;
      for (;;) {
        const item = arrayItem(typeName);
        if (item === undefined) break;
        typeName = item;
      }
      if (!declaredTypes.has(typeName)) {
        throw new Error(`Field override ${path} refers to missing type ${typeName}`);
      }
    }
  }
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
  for (const name of Object.keys(evidence)) {
    if (spec.methods[name] === undefined) {
      throw new Error(`Evidence method ${name} is missing from the schema`);
    }
  }
  const targets = fieldTargets(spec);
  return {
    coverage: renderCoverage(spec, evidence),
    methods: renderMethods(spec, overrides, targets),
    types: renderTypes(spec, overrides, targets),
  };
}
