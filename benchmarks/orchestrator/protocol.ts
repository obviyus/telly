import { Schema } from "effect";

import type { FrameworkName } from "./model.ts";
import type { WorkloadTotals } from "./workload.ts";

const Counts = Schema.Struct({
  callback: Schema.Int,
  command: Schema.Int,
  text: Schema.Int,
});

const MeasuredRound = Schema.Struct({
  checksum: Schema.Int,
  counts: Counts,
  durationNs: Schema.Int,
  operations: Schema.Int,
});

export const RunnerResult = Schema.Struct({
  finalRssBytes: Schema.Int,
  framework: Schema.String,
  latencyNs: Schema.optionalKey(Schema.Array(Schema.Int)),
  maxRssKiB: Schema.Int,
  mode: Schema.Literals(["decode", "floor", "ingress", "latency", "routing"]),
  rounds: Schema.Array(MeasuredRound),
  runtime: Schema.String,
  schemaVersion: Schema.Literal(1),
  version: Schema.String,
});

export type RunnerResult = typeof RunnerResult.Type;

export function assertRunnerResult(
  result: RunnerResult,
  expected: WorkloadTotals,
  options: {
    readonly framework: FrameworkName;
    readonly mode: RunnerResult["mode"];
    readonly operations: number;
    readonly rounds: number;
  },
): void {
  if (result.framework !== options.framework || result.mode !== options.mode) {
    throw new Error(
      `Runner identity mismatch: expected ${options.framework}/${options.mode}, received ${result.framework}/${result.mode}`,
    );
  }
  const expectsLatency = options.mode === "floor" || options.mode === "latency";
  const expectedRounds = options.mode === "floor"
    ? 0
    : options.mode === "latency"
    ? 1
    : options.rounds;
  if (result.rounds.length !== expectedRounds) {
    throw new Error(`Runner round count is wrong for ${options.framework}/${options.mode}`);
  }
  if ((result.latencyNs !== undefined) !== expectsLatency) {
    throw new Error(`Runner latency shape is wrong for ${options.framework}/${options.mode}`);
  }
  if (expectsLatency && result.latencyNs?.length !== options.operations) {
    throw new Error(`Runner latency sample count is wrong for ${options.framework}/${options.mode}`);
  }
  if (options.mode === "floor") {
    return;
  }
  for (const round of result.rounds) {
    if (
      round.operations !== options.operations ||
      round.durationNs < 1 ||
      round.checksum !== expected.checksum ||
      round.counts.callback !== expected.callback ||
      round.counts.command !== expected.command ||
      round.counts.text !== expected.text
    ) {
      throw new Error(`Runner correctness proof failed for ${options.framework}/${options.mode}`);
    }
  }
}

export const StartupResult = Schema.Struct({
  framework: Schema.String,
  ready: Schema.Literal(true),
  runtime: Schema.String,
  schemaVersion: Schema.Literal(1),
  version: Schema.String,
});

export type StartupResult = typeof StartupResult.Type;
