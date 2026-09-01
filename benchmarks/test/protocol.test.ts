import { expect, test } from "bun:test";

import { assertRunnerResult, type RunnerResult } from "../orchestrator/protocol.ts";

const result: RunnerResult = {
  finalRssBytes: 1,
  framework: "telly",
  maxRssKiB: 1,
  mode: "ingress",
  rounds: [{
    checksum: 19,
    counts: { callback: 1, command: 2, text: 7 },
    durationNs: 1,
    operations: 10,
  }],
  runtime: "node test",
  schemaVersion: 1,
  version: "test",
};

test("runner proof accepts matching identity, counts, and checksum", () => {
  expect(() => assertRunnerResult(
    result,
    { callback: 1, checksum: 19, command: 2, text: 7 },
    { framework: "telly", mode: "ingress", operations: 10, rounds: 1 },
  )).not.toThrow();
});

test("runner proof rejects a plausible but incorrect result", () => {
  expect(() => assertRunnerResult(
    result,
    { callback: 1, checksum: 20, command: 2, text: 7 },
    { framework: "telly", mode: "ingress", operations: 10, rounds: 1 },
  )).toThrow("Runner correctness proof failed");
});

test("runner proof rejects missing measured rounds", () => {
  expect(() => assertRunnerResult(
    { ...result, rounds: [] },
    { callback: 1, checksum: 19, command: 2, text: 7 },
    { framework: "telly", mode: "ingress", operations: 10, rounds: 1 },
  )).toThrow("Runner round count is wrong");
});
