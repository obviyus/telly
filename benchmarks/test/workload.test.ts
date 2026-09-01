import { expect, test } from "bun:test";

import {
  expectedTotals,
  makeHeavyWorkload,
  makeWorkload,
} from "../orchestrator/workload.ts";

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

test("complex workload preserves routing totals while adding nested Telegram data", () => {
  const workload = makeHeavyWorkload({ fixtureCount: 100, seed: 20260901 });
  const text = workload.entries.find((entry) => entry.kind === "text");
  const callback = workload.entries.find((entry) => entry.kind === "callback");

  expect(expectedTotals(workload.entries, 100)).toMatchObject({
    callback: 10,
    command: 20,
    text: 70,
  });
  expect(text?.update["message"]).toMatchObject({
    forward_origin: { type: "user" },
    photo: [{ height: 720 }, { height: 1080 }],
    reply_to_message: { text: "nested reply" },
  });
  expect(callback?.update["callback_query"]).toMatchObject({
    message: { reply_markup: { inline_keyboard: [[{ text: "Choose" }]] } },
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
