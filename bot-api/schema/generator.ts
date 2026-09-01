import { Schema } from "effect";

import type { BotApiSpec } from "./spec.ts";

const ExactTypeOverride = Schema.Struct({
  schema: Schema.String,
  typescript: Schema.String,
});

const AdditiveTypeOverride = Schema.Struct({
  additionalTypes: Schema.Array(Schema.String),
});

const TypeOverride = Schema.Union([ExactTypeOverride, AdditiveTypeOverride]);

const RateLimitClass = Schema.Union([
  Schema.Literal("media-array"),
  Schema.Literal("message"),
  Schema.Literal("message-id-array"),
  Schema.Literal("none"),
]);

const MethodOverride = Schema.Struct({
  rateLimit: RateLimitClass,
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
  readonly decoders: string;
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
  return primitiveSchemas[reference] ?? `${qualifier}${reference}`;
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

type DecoderTarget =
  | { readonly _tag: "Literal"; readonly value: string }
  | { readonly _tag: "References"; readonly references: ReadonlyArray<string> };

function decoderTarget(
  owner: string,
  field: NonNullable<BotApiSpec["types"][string]["fields"]>[number],
  targets: ReadonlyMap<string, FieldTarget>,
  overrides: GeneratorOverrides,
): DecoderTarget {
  const target = targets.get(`${owner}.${field.name}`);
  const references = overrides.fields[`${owner}.${field.name}`]?.types ?? field.types;
  if (target?._tag === "Literal") return { _tag: "Literal", value: target.value };
  return {
    _tag: "References",
    references: target?._tag === "Enum"
      ? references.map((reference) => enumReference(reference, target.name))
      : references,
  };
}

function fieldExpressions(
  owner: string,
  field: NonNullable<BotApiSpec["types"][string]["fields"]>[number],
  targets: ReadonlyMap<string, FieldTarget>,
  overrides: GeneratorOverrides,
  qualifier = "",
) {
  const target = decoderTarget(owner, field, targets, overrides);
  if (target._tag === "Literal") {
    const literal = JSON.stringify(target.value);
    return { schema: `Schema.Literal(${literal})`, type: literal };
  }
  return {
    schema: unionSchema(target.references, (reference) => schemaExpression(reference, qualifier)),
    type: unionExpression(target.references, (reference) => typeExpression(reference, qualifier)),
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
      return `${docComment([definition.description])}export type ${name} = ${values.join(" | ")};\nexport const ${name}: Schema.Codec<${name}> = Schema.suspend(() => Schema.Literals([${values.join(", ")}]));\n`;
    })
    .join("\n");
}

function decoderName(reference: string): string {
  const item = arrayItem(reference);
  return item === undefined
    ? `_decode${reference}`
    : `_decodeArrayOf${decoderName(item).slice("_decode".length)}`;
}

function decodedValue(target: DecoderTarget, raw: string): string {
  if (target._tag === "Literal") {
    return `const decoded = ${raw} === ${JSON.stringify(target.value)} ? ${raw} : decodeFailure;`;
  }
  if (target.references.length === 1) {
    return `const decoded = ${decoderName(target.references[0] ?? "missing")}(${raw});`;
  }
  return [
    "let decoded: unknown = decodeFailure;",
    ...target.references.map((reference) =>
      `if (decoded === decodeFailure) decoded = ${decoderName(reference)}(${raw});`
    ),
  ].join("\n      ");
}

function renderObjectDecoder(
  name: string,
  definition: BotApiSpec["types"][string],
  targets: ReadonlyMap<string, FieldTarget>,
  overrides: GeneratorOverrides,
): string {
  const fields = definition.fields ?? [];
  const alwaysClone = fields.some((field) =>
    field.required && publicFieldName(field.name) !== field.name
  );
  let requiredIndex = 0;
  const cases = fields.map((field) => {
    const publicName = publicFieldName(field.name);
    const target = decoderTarget(name, field, targets, overrides);
    const bit = field.required ? 2 ** requiredIndex++ : undefined;
    const assign = alwaysClone
      ? `output[${JSON.stringify(publicName)}] = decoded;`
      : publicName === field.name
      ? `if (decoded !== raw) {
        output ??= { ...source };
        output[${JSON.stringify(publicName)}] = decoded;
      }`
      : `output ??= { ...source };
      output[${JSON.stringify(publicName)}] = decoded;
      delete output[${JSON.stringify(field.name)}];`;
    return `    case ${JSON.stringify(field.name)}: {
      const raw = source[key];
      ${decodedValue(target, "raw")}
      if (decoded === decodeFailure) return decodeFailure;
      ${assign}${bit === undefined ? "" : `
      seen |= ${bit};`}
      break;
    }`;
  });
  const requiredMask = requiredIndex === 0 ? 0 : 2 ** requiredIndex - 1;
  return `export function _decode${name}(input: unknown): Types.${name} | typeof decodeFailure {
  if (typeof input !== "object" || input === null || Array.isArray(input)) return decodeFailure;
  const source = input as Readonly<Record<string, unknown>>;
  ${alwaysClone ? "const output: Record<string, unknown> = {};" : "let output: Record<string, unknown> | undefined;"}
  let seen = 0;
  for (const key of Object.keys(source)) {
    switch (key) {
${cases.join("\n")}
${alwaysClone ? "    default:\n      output[key] = source[key];\n      break;" : ""}
    }
  }
  if (seen !== ${requiredMask}) return decodeFailure;
  return ${alwaysClone ? "output" : "(output ?? source)"} as Types.${name};
}`;
}

function renderUnionDecoder(
  name: string,
  references: ReadonlyArray<string>,
): string {
  const attempts = references.map((reference, index) =>
    `  const member${index} = ${decoderName(reference)}(input);
  if (member${index} !== decodeFailure) return member${index};`
  ).join("\n");
  return `export function _decode${name}(input: unknown): Types.${name} | typeof decodeFailure {
${attempts}
  return decodeFailure;
}`;
}

function collectArrayReferences(
  spec: BotApiSpec,
  overrides: GeneratorOverrides,
  targets: ReadonlyMap<string, FieldTarget>,
): ReadonlyArray<string> {
  const references = new Set<string>();
  const add = (reference: string) => {
    const item = arrayItem(reference);
    if (item === undefined) return;
    references.add(reference);
    add(item);
  };
  for (const [name, definition] of Object.entries(spec.types)) {
    for (const field of definition.fields ?? []) {
      const target = decoderTarget(name, field, targets, overrides);
      if (target._tag === "References") target.references.forEach(add);
    }
    const override = overrides.types[name];
    if (definition.subtypes !== undefined && !(override !== undefined && "schema" in override)) {
      [...definition.subtypes, ...(override?.additionalTypes ?? [])].forEach(add);
    }
  }
  return [...references].sort((left, right) => left.length - right.length);
}

function renderDecoders(
  spec: BotApiSpec,
  overrides: GeneratorOverrides,
  targets: ReadonlyMap<string, FieldTarget>,
): string {
  const primitiveDecoders = `export function _decodeBoolean(input: unknown): boolean | typeof decodeFailure {
  return typeof input === "boolean" ? input : decodeFailure;
}

export function _decodeFloat(input: unknown): number | typeof decodeFailure {
  return typeof input === "number" ? input : decodeFailure;
}

export function _decodeInteger(input: unknown): number | typeof decodeFailure {
  return typeof input === "number" && Number.isSafeInteger(input) ? input : decodeFailure;
}

export function _decodeString(input: unknown): string | typeof decodeFailure {
  return typeof input === "string" ? input : decodeFailure;
}

export function _decodeTrue(input: unknown): true | typeof decodeFailure {
  return input === true ? input : decodeFailure;
}

export function _decodeArray<A>(
  input: unknown,
  decode: (input: unknown) => A | typeof decodeFailure,
): ReadonlyArray<A> | typeof decodeFailure {
  if (!Array.isArray(input)) return decodeFailure;
  const source: ReadonlyArray<unknown> = input;
  let output: Array<A> | undefined;
  for (let index = 0; index < source.length; index += 1) {
    const raw = source[index];
    const decoded = decode(raw);
    if (decoded === decodeFailure) return decodeFailure;
    if (decoded !== raw) {
      output ??= source.slice() as Array<A>;
      output[index] = decoded;
    }
  }
  return output ?? source as ReadonlyArray<A>;
}`;
  const enumDecoders = Object.entries(spec.enums)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([name, definition]) => `export function _decode${name}(input: unknown): Types.${name} | typeof decodeFailure {
  switch (input) {
${definition.values.map((value) => `    case ${JSON.stringify(value)}:`).join("\n")}
      return input;
    default:
      return decodeFailure;
  }
}`)
    .join("\n\n");
  const arrayDecoders = collectArrayReferences(spec, overrides, targets)
    .map((reference) => {
      const item = arrayItem(reference);
      if (item === undefined) throw new Error(`Expected array reference, found ${reference}`);
      return `export function ${decoderName(reference)}(input: unknown): ${typeExpression(reference, "Types.")} | typeof decodeFailure {
  return _decodeArray(input, ${decoderName(item)});
}`;
    })
    .join("\n\n");
  const typeDecoders = Object.entries(spec.types)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([name, definition]) => {
      const override = overrides.types[name];
      if (override !== undefined && "schema" in override) {
        return override.schema === "Schema.instanceOf(Blob)"
          ? `export function _decode${name}(input: unknown): Types.${name} | typeof decodeFailure {
  return input instanceof Blob ? input : decodeFailure;
}`
          : `export function _decode${name}(_input: unknown): Types.${name} | typeof decodeFailure {
  return decodeFailure;
}`;
      }
      if (definition.subtypes !== undefined) {
        return renderUnionDecoder(name, [
          ...definition.subtypes,
          ...(override?.additionalTypes ?? []),
        ]);
      }
      return renderObjectDecoder(name, definition, targets, overrides);
    })
    .join("\n\n");
  return `${generatedHeader("bot-api/schema/sources/dofer/spec.json")}import type * as Types from "../types.generated.js";

export const decodeFailure = Symbol("telly/FastDecodeFailure");

${primitiveDecoders}

${enumDecoders}

${arrayDecoders}

${typeDecoders}

export function decodeUpdate(input: unknown): Types.Update | typeof decodeFailure {
  return _decodeUpdate(input);
}
`;
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
    return `${docComment(definition.description)}export interface ${name} {\n${interfaceBody}\n}\nexport const ${name}: Schema.Codec<${name}, unknown> = Schema.suspend(() => Schema.StructWithRest(\n  Schema.Struct({${encodedBody}}),\n  [Schema.Record(Schema.String, Schema.Unknown)],\n));\n`;
  }
  if (name === "Update") {
    return `${docComment(definition.description)}export interface ${name} {\n${interfaceBody}\n}\nexport const ${name}: Schema.Codec<${name}, unknown> = Schema.suspend(() => {\n  const publicKeys = { ${publicKeyMapping(renamed)} } as const;\n  const wireKeys = invertKeys(publicKeys);\n  const encoded = Schema.StructWithRest(\n    Schema.Struct({${encodedBody.replaceAll("\n", "\n  ")}}),\n    [Schema.Record(Schema.String, Schema.Unknown)],\n  );\n  const decodedSchema = Schema.declare<${name}>((input): input is ${name} => Predicate.isObject(input));\n  const interpreted: Schema.Codec<${name}, unknown> = encoded.pipe(\n    Schema.decodeTo(decodedSchema, {\n      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),\n      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),\n    }),\n  );\n  const decodeInterpreted = SchemaParser.decodeUnknownEffect(interpreted);\n  const encodeInterpreted = SchemaParser.encodeUnknownEffect(interpreted);\n  return Schema.Unknown.pipe(\n    Schema.decodeTo(decodedSchema, {\n      decode: SchemaGetter.transformOrFail((input, options) => {\n        const decoded = decode${name}(input);\n        return decoded === decodeFailure\n          ? decodeInterpreted(input, options)\n          : Effect.succeed(decoded);\n      }),\n      encode: SchemaGetter.transformOrFail((input, options) =>\n        encodeInterpreted(input, options)\n      ),\n    }),\n  );\n});\n`;
  }
  // The encoded schema validates both directions; the declared target carries the camelCase type without validating every field twice.
  return `${docComment(definition.description)}export interface ${name} {\n${interfaceBody}\n}\nexport const ${name}: Schema.Codec<${name}, unknown> = Schema.suspend(() => {\n  const publicKeys = { ${publicKeyMapping(renamed)} } as const;\n  const wireKeys = invertKeys(publicKeys);\n  const encoded = Schema.StructWithRest(\n    Schema.Struct({${encodedBody.replaceAll("\n", "\n  ")}}),\n    [Schema.Record(Schema.String, Schema.Unknown)],\n  );\n  const decoded = Schema.declare<${name}>((input): input is ${name} => Predicate.isObject(input));\n  return encoded.pipe(\n    Schema.decodeTo(decoded, {\n      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),\n      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),\n    }),\n  );\n});\n`;
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
      if (override !== undefined && "schema" in override) {
        return `${docComment(definition.description)}export type ${name} = ${override.typescript};\nexport const ${name}: Schema.Codec<${name}> = Schema.suspend(() => ${override.schema});\n`;
      }
      if (definition.subtypes !== undefined) {
        const references = [...definition.subtypes, ...(override?.additionalTypes ?? [])];
        return `${docComment(definition.description)}export type ${name} = ${unionExpression(references, typeExpression)};\nexport const ${name}: Schema.Codec<${name}, unknown> = Schema.suspend(() => ${unionSchema(references, schemaExpression)});\n`;
      }
      return renderObjectType(name, definition, targets, overrides);
    });
  return `${generatedHeader("bot-api/schema/sources/dofer/spec.json")}import * as Effect from "effect/Effect";\nimport * as Predicate from "effect/Predicate";\nimport * as Schema from "effect/Schema";\nimport * as SchemaGetter from "effect/SchemaGetter";\nimport * as SchemaParser from "effect/SchemaParser";\nimport * as Struct from "effect/Struct";\n\nimport { decodeFailure, decodeUpdate } from "./internal/decoders.generated.js";\nimport { invertKeys } from "./internal/SchemaKeys.js";\n\n${renderEnums(spec)}\n${sections.join("\n")}`;
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
        ? `export const ${paramsName}: Schema.Codec<${paramsName}, Readonly<Record<string, unknown>>> = Schema.suspend(() => Schema.Struct({\n${encodedFields}\n}));`
        : `export const ${paramsName}: Schema.Codec<${paramsName}, Readonly<Record<string, unknown>>> = Schema.suspend(() => {\n  const publicKeys = { ${publicKeyMapping(renamed)} } as const;\n  const wireKeys = invertKeys(publicKeys);\n  const encoded = Schema.Struct({\n${encodedFields.replaceAll("\n", "\n  ")}\n  });\n  const decoded = Schema.declare<${paramsName}>((input): input is ${paramsName} => Predicate.isObject(input));\n  return encoded.pipe(\n    Schema.decodeTo(decoded, {\n      decode: SchemaGetter.transform(Struct.renameKeys(publicKeys)),\n      encode: SchemaGetter.transform(Struct.renameKeys(wireKeys)),\n    }),\n  );\n});`;
      const result = override.resultSchema ??
        unionSchema(method.returns, (reference) => schemaExpression(reference, "Types."));
      const parameterDeclaration = fields.length === 0
        ? ""
        : `export interface ${paramsName} {\n${interfaceFields}\n}\n${paramsSchema}\n\n`;
      const descriptorParams = fields.length === 0 ? "" : `  params: ${paramsName},\n`;
      return `${docComment(method.description)}${parameterDeclaration}export const ${name} = callMethod({\n  method: ${JSON.stringify(name)},\n${descriptorParams}  rateLimit: ${JSON.stringify(override.rateLimit)},\n  result: Schema.suspend(() => ${result}),\n  retrySafe: ${override.retrySafe},\n});\n`;
    });
  return `${generatedHeader("bot-api/schema/sources/dofer/spec.json")}import * as Predicate from "effect/Predicate";\nimport * as Schema from "effect/Schema";\nimport * as SchemaGetter from "effect/SchemaGetter";\nimport * as Struct from "effect/Struct";\n\nimport { callMethod } from "./internal/CallMethod.js";\nimport { invertKeys } from "./internal/SchemaKeys.js";\nimport * as Types from "./types.generated.js";\n\n${sections.join("\n")}`;
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
    throw new Error(`Methods missing request metadata: ${missingOverrides.join(", ")}`);
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
  for (const [name, override] of Object.entries(overrides.types)) {
    const definition = spec.types[name];
    if (definition === undefined) {
      throw new Error(`Override type ${name} is missing from the schema`);
    }
    if (!("additionalTypes" in override)) continue;
    if (definition.subtypes === undefined) {
      throw new Error(`Additive type override ${name} requires a subtype union`);
    }
    if (override.additionalTypes.length === 0) {
      throw new Error(`Additive type override ${name} must add at least one type`);
    }
    const seen = new Set(definition.subtypes);
    for (const reference of override.additionalTypes) {
      if (seen.has(reference)) {
        throw new Error(`Additive type override ${name} duplicates type ${reference}`);
      }
      seen.add(reference);
      let typeName = reference;
      for (;;) {
        const item = arrayItem(typeName);
        if (item === undefined) break;
        typeName = item;
      }
      if (!declaredTypes.has(typeName)) {
        throw new Error(`Additive type override ${name} refers to missing type ${typeName}`);
      }
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
    decoders: renderDecoders(spec, overrides, targets),
    methods: renderMethods(spec, overrides, targets),
    types: renderTypes(spec, overrides, targets),
  };
}
