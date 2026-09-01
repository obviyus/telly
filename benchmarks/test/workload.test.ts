import { expect, test } from "bun:test";

import { expectedTotals, makeWorkload } from "../orchestrator/workload.ts";

test("mixed workload is deterministic with the declared 70-20-10 shape", () => {
  const first = makeWorkload({ fixtureCount: 100, seed: 20260901 });
  const second = makeWorkload({ fixtureCount: 100, seed: 20260901 });

  expect(first).toEqual(second);
  expect(expectedTotals(first.entries, 100)).toMatchObject({
    callback: 10,
    command: 20,
    text: 70,
  });
});

test("expected workload totals count repeated fixtures and preserve their checksum", () => {
  const workload = makeWorkload({ fixtureCount: 10, seed: 7 });

  expect(expectedTotals(workload.entries, 10)).toEqual({
    callback: 1,
    checksum: 1_704_189,
    command: 2,
    text: 7,
  });
  expect(expectedTotals(workload.entries, 20)).toEqual({
    callback: 2,
    checksum: 3_408_378,
    command: 4,
    text: 14,
  });
});
