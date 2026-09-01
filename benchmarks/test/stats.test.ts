import { expect, test } from "bun:test";

import {
  percentile,
  summarize,
  summarizeLatency,
} from "../orchestrator/stats.ts";

test("percentile interpolates ordered sample positions", () => {
  expect(percentile([40, 10, 30, 20], 0.5)).toBe(25);
  expect(percentile([40, 10, 30, 20], 0.95)).toBeCloseTo(38.5);
});

test("summary preserves every sample and reports variation", () => {
  expect(summarize([10, 20, 30])).toEqual({
    coefficientOfVariation: Math.sqrt(200 / 3) / 20,
    max: 30,
    mean: 20,
    median: 20,
    min: 10,
    relativeMedianAbsoluteDeviation: 0.5,
    samples: 3,
  });
});

test("latency summary reports tail percentiles without dropping outliers", () => {
  expect(summarizeLatency([10, 20, 30, 1_000])).toEqual({
    max: 1_000,
    p50: 25,
    p95: 854.4999999999997,
    p99: 970.8999999999997,
    samples: 4,
  });
});
