export interface Summary {
  readonly coefficientOfVariation: number;
  readonly max: number;
  readonly mean: number;
  readonly median: number;
  readonly min: number;
  readonly relativeMedianAbsoluteDeviation: number;
  readonly samples: number;
}

function sorted(values: ReadonlyArray<number>): Array<number> {
  if (values.length === 0) throw new RangeError("At least one sample is required");
  if (values.some((value) => !Number.isFinite(value))) {
    throw new RangeError("Samples must be finite numbers");
  }
  return [...values].sort((left, right) => left - right);
}

export function percentile(values: ReadonlyArray<number>, probability: number): number {
  if (probability < 0 || probability > 1) {
    throw new RangeError("probability must be between zero and one");
  }
  const ordered = sorted(values);
  const position = (ordered.length - 1) * probability;
  const lower = Math.floor(position);
  const upper = Math.ceil(position);
  const left = ordered[lower];
  const right = ordered[upper];
  if (left === undefined || right === undefined) throw new Error("Percentile index is missing");
  return left + (right - left) * (position - lower);
}

export function summarize(values: ReadonlyArray<number>): Summary {
  const ordered = sorted(values);
  const mean = ordered.reduce((total, value) => total + value, 0) / ordered.length;
  const median = percentile(ordered, 0.5);
  const variance = ordered.reduce(
    (total, value) => total + (value - mean) ** 2,
    0,
  ) / ordered.length;
  const medianAbsoluteDeviation = percentile(
    ordered.map((value) => Math.abs(value - median)),
    0.5,
  );
  return {
    coefficientOfVariation: mean === 0 ? 0 : Math.sqrt(variance) / mean,
    max: ordered.at(-1) ?? 0,
    mean,
    median,
    min: ordered[0] ?? 0,
    relativeMedianAbsoluteDeviation: median === 0
      ? 0
      : medianAbsoluteDeviation / median,
    samples: ordered.length,
  };
}

export interface LatencySummary {
  readonly max: number;
  readonly p50: number;
  readonly p95: number;
  readonly p99: number;
  readonly samples: number;
}

export function summarizeLatency(values: ReadonlyArray<number>): LatencySummary {
  return {
    max: percentile(values, 1),
    p50: percentile(values, 0.5),
    p95: percentile(values, 0.95),
    p99: percentile(values, 0.99),
    samples: values.length,
  };
}
