import { expect, test } from "bun:test";
import { Effect, Schema } from "effect";

import { generateSources, MethodEvidence } from "./generator.ts";
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
  absent: { retrySafe: true },
  blocked: { retrySafe: true },
  proven: { resultSchema, retrySafe: true },
};

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
  expect(sources.methods).toContain(`result: ${resultSchema}`);
  expect(sources.types).toContain("readonly value: number");
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
      fields: { "Result.value": { types: ["String"] } },
      methods: completeMethods,
      types: {},
    },
    completeEvidence,
  )).toThrow("Field override Result.value duplicates the schema");
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
    { fields: {}, methods: completeMethods, types: {} },
    completeEvidence,
  )).toThrow("Nested upload field Result.value needs a field override");
});

test("every schema method requires retry metadata", () => {
  const incompleteMethods = Object.fromEntries(
    Object.entries(completeMethods).filter(([name]) => name !== "absent"),
  );

  expect(() => generateSources(
    spec,
    { fields: {}, methods: incompleteMethods, types: {} },
    completeEvidence,
  )).toThrow("Methods missing retry metadata: absent");
});

test("every schema method requires explicit evidence", () => {
  const incompleteEvidence = Object.fromEntries(
    Object.entries(completeEvidence).filter(([name]) => name !== "absent"),
  );

  expect(() => generateSources(
    spec,
    { fields: {}, methods: completeMethods, types: {} },
    incompleteEvidence,
  )).toThrow("Methods missing evidence: absent");
});
