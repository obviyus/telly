import { expect, test } from "bun:test";
import { Effect, Schema } from "effect";

import { GeneratorOverrides, generateSources, MethodEvidence } from "./generator.ts";
import type { BotApiSpec } from "./spec.ts";

const method = (name: string) => ({
  description: [name],
  href: `#${name}`,
  name,
  returns: ["Result"],
});

const spec = {
  changelog: [],
  document: {},
  enums: {},
  fields: {},
  methods: {
    absent: method("absent"),
    blocked: method("blocked"),
    proven: method("proven"),
  },
  release_date: "2026-08-30",
  source: "fixture",
  spec_format: 1,
  types: {
    Result: {
      description: ["result"],
      fields: [{
        description: "value",
        html_description: "value",
        name: "value",
        required: true,
        types: ["String"],
      }],
      href: "#result",
      name: "Result",
    },
  },
  version: "fixture",
} satisfies BotApiSpec;

const resultSchema = "Schema.Literal(\"overridden\")";
const completeEvidence: MethodEvidence = {
  absent: {
    expires_on: "2026-09-14",
    reason: "second fixture unavailable",
    status: "blocked",
  },
  blocked: {
    expires_on: "2026-09-13",
    reason: "fixture unavailable",
    status: "blocked",
  },
  proven: {
    artifact: "bot-api/proofs/proven.json",
    recorded_time: "2026-08-30T17:00:00.000Z",
    status: "proven",
  },
};
const completeMethods = {
  absent: { rateLimit: "none", retrySafe: true },
  blocked: { rateLimit: "none", retrySafe: true },
  proven: { rateLimit: "none", resultSchema, retrySafe: true },
} satisfies GeneratorOverrides["methods"];

test("coverage copies explicit proven and blocked evidence", () => {
  const evidence: MethodEvidence = {
    ...completeEvidence,
    blocked: {
      expires_on: "2026-09-13",
      reason: "fixture unavailable",
      status: "blocked",
    },
  };

  const sources = generateSources(
    spec,
    {
      constraints: {},
      fields: { "Result.value": { types: ["Integer"] } },
      methods: completeMethods,
      types: {},
    },
    evidence,
  );
  const coverage = JSON.parse(sources.coverage);

  expect(coverage.methods["proven"]).toEqual(evidence["proven"]);
  expect(coverage.methods["blocked"]).toEqual(evidence["blocked"]);
  expect(coverage.methods["absent"]).toEqual(evidence["absent"]);
  expect(sources.methods).toContain(`result: Schema.suspend(() => ${resultSchema})`);
  expect(sources.methods).toContain('rateLimit: "none"');
  expect(sources.types).toContain("readonly value: number");
  expect(sources.decoders).toContain("export function _decodeResult");
  expect(sources.decoders).toContain('case "value"');
});

test("evidence tags reject fields from the other state", async () => {
  const decode = Schema.decodeUnknownEffect(Schema.fromJsonString(MethodEvidence), {
    onExcessProperty: "error",
  });
  const blockedWithArtifact = await Effect.runPromiseExit(decode(JSON.stringify({
    method: {
      artifact: "bot-api/proofs/method.json",
      expires_on: "2026-09-13",
      reason: "fixture unavailable",
      status: "blocked",
    },
  })));
  const provenWithoutArtifact = await Effect.runPromiseExit(decode(JSON.stringify({
    method: {
      recorded_time: "2026-08-30T17:00:00.000Z",
      status: "proven",
    },
  })));

  expect(blockedWithArtifact._tag).toBe("Failure");
  expect(provenWithoutArtifact._tag).toBe("Failure");
});

test("field overrides must change an existing schema field", () => {
  expect(() => generateSources(
    spec,
    {
      constraints: {},
      fields: { "Result.value": { types: ["String"] } },
      methods: completeMethods,
      types: {},
    },
    completeEvidence,
  )).toThrow("Field override Result.value duplicates the schema");
});

test("constraints require current evidence and compatible schema fields", () => {
  const generate = (constraints: GeneratorOverrides["constraints"]) => generateSources(
    spec,
    { constraints, fields: {}, methods: completeMethods, types: {} },
    completeEvidence,
  );
  const stringRange = {
    checks: [{ kind: "codePoints", maximum: 5, minimum: 1 }],
    evidence: "value",
  } satisfies GeneratorOverrides["constraints"][string];

  expect(() => generate({ "Missing.value": stringRange })).toThrow(
    "Constraint field Missing.value is missing from the schema",
  );
  expect(() => generate({
    "Result.value": { ...stringRange, evidence: "stale evidence" },
  })).toThrow("Constraint evidence for Result.value is missing from its description");
  expect(() => generate({
    "Result.value": {
      checks: [{ kind: "range", maximum: 5, minimum: 1 }],
      evidence: "value",
    },
  })).toThrow("Constraint range for Result.value has incompatible types");
});

test("constraints generate encode-only checks from explicit metadata", () => {
  const sources = generateSources(
    spec,
    {
      constraints: {
        "Result.value": {
          checks: [{ kind: "utf8Bytes", maximum: 4, minimum: 1 }],
          evidence: "value",
        },
      },
      fields: {},
      methods: completeMethods,
      types: {},
    },
    completeEvidence,
  );

  expect(sources.types).toContain('const _constraintsResult = [["value",[{"kind":"utf8Bytes"');
  expect(sources.types).toContain("SchemaGetter.checkEffect<Result>");
});

test("additive type override extends a recursive subtype union", () => {
  const unionSpec = {
    ...spec,
    types: {
      Child: {
        description: ["child"],
        fields: [],
        href: "#child",
        name: "Child",
        subtype_of: ["Parent"],
      },
      Parent: {
        description: ["parent"],
        href: "#parent",
        name: "Parent",
        subtypes: ["Child"],
      },
      Result: spec.types.Result,
    },
  } satisfies BotApiSpec;

  const sources = generateSources(
    unionSpec,
    {
      constraints: {},
      fields: {},
      methods: completeMethods,
      types: { Parent: { additionalTypes: ["String", "Array of Parent"] } },
    },
    completeEvidence,
  );

  expect(sources.types).toContain("export type Parent = Child | string | ReadonlyArray<Parent>");
  expect(sources.types).toContain(
    "Schema.Array(Parent)",
  );
});

test("additive type overrides reject invalid union members", () => {
  const unionSpec = {
    ...spec,
    types: {
      Child: {
        description: ["child"],
        fields: [],
        href: "#child",
        name: "Child",
        subtype_of: ["Parent"],
      },
      Parent: {
        description: ["parent"],
        href: "#parent",
        name: "Parent",
        subtypes: ["Child"],
      },
      Result: spec.types.Result,
    },
  } satisfies BotApiSpec;
  const generate = (name: "Parent" | "Result", additionalTypes: ReadonlyArray<string>) =>
    generateSources(
      unionSpec,
      {
        constraints: {},
        fields: {},
        methods: completeMethods,
        types: { [name]: { additionalTypes } },
      },
      completeEvidence,
    );

  expect(() => generate("Parent", [])).toThrow("must add at least one type");
  expect(() => generate("Parent", ["Child"])).toThrow("duplicates type Child");
  expect(() => generate("Parent", ["String", "String"])).toThrow("duplicates type String");
  expect(() => generate("Parent", ["Missing"])).toThrow("refers to missing type Missing");
  expect(() => generate("Result", ["String"])).toThrow("requires a subtype union");
});

test("type override forms cannot be mixed", async () => {
  const decoded = await Effect.runPromiseExit(
    Schema.decodeUnknownEffect(GeneratorOverrides, { onExcessProperty: "error" })({
      constraints: {},
      fields: {},
      methods: {},
      types: {
        Result: {
          additionalTypes: ["String"],
          schema: "Schema.String",
          typescript: "string",
        },
      },
    }),
  );

  expect(decoded._tag).toBe("Failure");
});

test("nested upload fields require an explicit type correction", () => {
  const uploadSpec = {
    ...spec,
    types: {
      Result: {
        ...spec.types.Result,
        fields: [{
          description: "Upload with attach://file0",
          html_description: "Upload with attach://file0",
          name: "value",
          required: true,
          types: ["String"],
        }],
      },
    },
  } satisfies BotApiSpec;

  expect(() => generateSources(
    uploadSpec,
    { constraints: {}, fields: {}, methods: completeMethods, types: {} },
    completeEvidence,
  )).toThrow("Nested upload field Result.value needs a field override");
});

test("every schema method requires request metadata", () => {
  const incompleteMethods = Object.fromEntries(
    Object.entries(completeMethods).filter(([name]) => name !== "absent"),
  );

  expect(() => generateSources(
    spec,
    { constraints: {}, fields: {}, methods: incompleteMethods, types: {} },
    completeEvidence,
  )).toThrow("Methods missing request metadata: absent");
});

test("every schema method requires explicit evidence", () => {
  const incompleteEvidence = Object.fromEntries(
    Object.entries(completeEvidence).filter(([name]) => name !== "absent"),
  );

  expect(() => generateSources(
    spec,
    { constraints: {}, fields: {}, methods: completeMethods, types: {} },
    incompleteEvidence,
  )).toThrow("Methods missing evidence: absent");
});
