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
      href: "#result",
      name: "Result",
    },
  },
  version: "fixture",
} satisfies BotApiSpec;

test("coverage distinguishes proven, explicitly blocked, and absent methods", () => {
  const evidence: MethodEvidence = {
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

  const coverage = JSON.parse(generateSources(spec, { methods: {}, types: {} }, evidence).coverage);

  expect(coverage.methods["proven"]).toEqual(evidence["proven"]);
  expect(coverage.methods["blocked"]).toEqual(evidence["blocked"]);
  expect(coverage.methods["absent"]).toEqual({
    expires_on: "2026-09-29",
    reason: "no live scenario",
    status: "blocked",
  });
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
