import { createHash } from "node:crypto";

import { Effect, Schema } from "effect";

const BotApiField = Schema.Struct({
  description: Schema.String,
  html_description: Schema.String,
  name: Schema.String,
  required: Schema.Boolean,
  types: Schema.Array(Schema.String),
});

const BotApiType = Schema.Struct({
  description: Schema.Array(Schema.String),
  fields: Schema.optionalKey(Schema.Array(BotApiField)),
  href: Schema.String,
  name: Schema.String,
  subtypes: Schema.optionalKey(Schema.Array(Schema.String)),
  subtype_of: Schema.optionalKey(Schema.Array(Schema.String)),
});

const BotApiMethod = Schema.Struct({
  description: Schema.Array(Schema.String),
  fields: Schema.optionalKey(Schema.Array(BotApiField)),
  href: Schema.String,
  name: Schema.String,
  returns: Schema.Array(Schema.String),
});

const BotApiEnum = Schema.Struct({
  applies_to: Schema.optionalKey(Schema.Array(Schema.String)),
  description: Schema.String,
  href: Schema.optionalKey(Schema.String),
  members: Schema.Array(Schema.String),
  name: Schema.String,
  values: Schema.Array(Schema.String),
});

export const BotApiSpec = Schema.Struct({
  changelog: Schema.Array(Schema.Unknown),
  document: Schema.Record(Schema.String, Schema.Unknown),
  enums: Schema.Record(Schema.String, BotApiEnum),
  fields: Schema.Record(Schema.String, Schema.Unknown),
  methods: Schema.Record(Schema.String, BotApiMethod),
  release_date: Schema.String,
  source: Schema.String,
  spec_format: Schema.Int,
  types: Schema.Record(Schema.String, BotApiType),
  version: Schema.String,
});

export type BotApiSpec = typeof BotApiSpec.Type;

const SchemaSource = Schema.Struct({
  commit: Schema.String,
  repository: Schema.String,
  revision: Schema.String,
  sha256: Schema.String,
  url: Schema.String,
});

export const BotApiSchemaManifest = Schema.Struct({
  botApiReleaseDate: Schema.String,
  botApiVersion: Schema.String,
  independentSources: Schema.Array(SchemaSource),
  primarySource: SchemaSource,
});

export class BotApiSchemaInvariantError extends Schema.TaggedError<BotApiSchemaInvariantError>()(
  "BotApiSchemaInvariantError",
  {
    actual: Schema.optionalKey(Schema.String),
    expected: Schema.optionalKey(Schema.String),
    field: Schema.optionalKey(Schema.String),
    owner: Schema.optionalKey(Schema.String),
    reason: Schema.Literals([
      "source_hash_mismatch",
      "version_mismatch",
      "release_date_mismatch",
      "name_mismatch",
      "unknown_type_reference",
    ]),
    typeName: Schema.optionalKey(Schema.String),
  },
) {}

export interface BotApiSchemaInput {
  readonly manifestText: string;
  readonly specText: string;
}

const SpecFromJson = Schema.fromJsonString(BotApiSpec);
const ManifestFromJson = Schema.fromJsonString(BotApiSchemaManifest);
const primitiveTypes = new Set(["Boolean", "Float", "Integer", "String", "True"]);

function baseTypeName(reference: string): string {
  let name = reference;
  while (name.startsWith("Array of ")) {
    name = name.slice("Array of ".length);
  }
  return name;
}

interface TypeReference {
  readonly field?: string;
  readonly owner: string;
  readonly reference: string;
}

function* typeReferences(spec: BotApiSpec): Generator<TypeReference> {
  for (const type of Object.values(spec.types)) {
    for (const field of type.fields ?? []) {
      for (const reference of field.types) {
        yield { field: field.name, owner: `type:${type.name}`, reference };
      }
    }
    for (const reference of [...(type.subtypes ?? []), ...(type.subtype_of ?? [])]) {
      yield { owner: `type:${type.name}`, reference };
    }
  }
  for (const method of Object.values(spec.methods)) {
    for (const field of method.fields ?? []) {
      for (const reference of field.types) {
        yield { field: field.name, owner: `method:${method.name}`, reference };
      }
    }
    for (const reference of method.returns) {
      yield { field: "return", owner: `method:${method.name}`, reference };
    }
  }
}

export const checkBotApiSchema = Effect.fn("checkBotApiSchema")(function* (
  input: BotApiSchemaInput,
) {
  const manifest = yield* Schema.decodeUnknownEffect(ManifestFromJson)(input.manifestText);
  const actualHash = createHash("sha256").update(input.specText).digest("hex");
  if (actualHash !== manifest.primarySource.sha256) {
    return yield* new BotApiSchemaInvariantError({
      actual: actualHash,
      expected: manifest.primarySource.sha256,
      reason: "source_hash_mismatch",
    });
  }

  const spec = yield* Schema.decodeUnknownEffect(SpecFromJson, {
    onExcessProperty: "preserve",
  })(input.specText);

  if (spec.version !== manifest.botApiVersion) {
    return yield* new BotApiSchemaInvariantError({
      actual: spec.version,
      expected: manifest.botApiVersion,
      reason: "version_mismatch",
    });
  }
  if (spec.release_date !== manifest.botApiReleaseDate) {
    return yield* new BotApiSchemaInvariantError({
      actual: spec.release_date,
      expected: manifest.botApiReleaseDate,
      reason: "release_date_mismatch",
    });
  }

  const collections = [
    ["type", spec.types],
    ["method", spec.methods],
    ["enum", spec.enums],
  ] as const;
  for (const [kind, entities] of collections) {
    for (const [key, entity] of Object.entries(entities)) {
      if (key !== entity.name) {
        return yield* new BotApiSchemaInvariantError({
          actual: entity.name,
          expected: key,
          owner: `${kind}:${key}`,
          reason: "name_mismatch",
        });
      }
    }
  }

  const declaredTypes = new Set([...Object.keys(spec.types), ...primitiveTypes]);
  for (const { field, owner, reference } of typeReferences(spec)) {
    const typeName = baseTypeName(reference);
    if (!declaredTypes.has(typeName)) {
      return yield* new BotApiSchemaInvariantError({
        ...(field === undefined ? {} : { field }),
        owner,
        reason: "unknown_type_reference",
        typeName,
      });
    }
  }

  return {
    spec,
    summary: {
      enumCount: Object.keys(spec.enums).length,
      methodCount: Object.keys(spec.methods).length,
      typeCount: Object.keys(spec.types).length,
      unresolvedReferenceCount: 0,
      version: spec.version,
    },
  } as const;
});
