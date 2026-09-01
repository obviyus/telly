import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { Schema } from "effect";

import { benchmarkEnvironment } from "./environment.ts";
import type {
  BenchmarkDocument,
  FrameworkName,
} from "./model.ts";
import { measurePackageBytes } from "./package-cost.ts";
import {
  assertRunnerResult,
  RunnerResult,
  StartupResult,
  type RunnerResult as RunnerResultType,
} from "./protocol.ts";
import { markdownReport, terminalReport } from "./report.ts";
import { summarize, summarizeLatency } from "./stats.ts";
import {
  expectedTotals,
  makeHeavyWorkload,
  makeWorkload,
  type WorkloadTotals,
} from "./workload.ts";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const frameworkOrder: ReadonlyArray<FrameworkName> = [
  "telly",
  "grammy",
  "python-telegram-bot",
];

const Preset = Schema.Struct({
  diagnosticOperations: Schema.Int,
  latencyOperations: Schema.Int,
  measuredRounds: Schema.Int,
  operations: Schema.Int,
  processes: Schema.Int,
  startupRounds: Schema.Int,
  warmupRounds: Schema.Int,
});
const Manifest = Schema.Struct({
  frameworks: Schema.Struct({
    grammy: Schema.String,
    pythonTelegramBot: Schema.String,
  }),
  presets: Schema.Record(Schema.String, Preset),
  schemaVersion: Schema.Literal(1),
  workload: Schema.Struct({
    callbackPercent: Schema.Int,
    commandPercent: Schema.Int,
    fixtureCount: Schema.Int,
    seed: Schema.Int,
    textPercent: Schema.Int,
  }),
});

function parseCli() {
  let allowNoisy = false;
  const values = process.argv.slice(2);
  let baseline = false;
  let pin: number | null = null;
  let preset = "quick";
  for (let index = 0; index < values.length; index += 1) {
    const value = values[index];
    if (value === "--baseline") {
      baseline = true;
      continue;
    }
    if (value === "--allow-noisy") {
      allowNoisy = true;
      continue;
    }
    if (value === "--pin") {
      pin = Number(values[index + 1]);
      index += 1;
      continue;
    }
    if (value === "--preset") {
      preset = values[index + 1] ?? "";
      index += 1;
      continue;
    }
    throw new Error(`Unknown benchmark option: ${String(value)}`);
  }
  if (pin !== null && (!Number.isSafeInteger(pin) || pin < 0)) {
    throw new RangeError("--pin must name a non-negative CPU number");
  }
  return { allowNoisy, baseline, pin, preset };
}

function runnerCommand(framework: FrameworkName): ReadonlyArray<string> {
  switch (framework) {
    case "telly":
      return ["node", path.join(repoRoot, "benchmarks/runners/telly.mjs")];
    case "grammy":
      return ["node", path.join(repoRoot, "benchmarks/runners/grammy/runner.mjs")];
    case "python-telegram-bot":
      return [
        "uv",
        "run",
        "--project",
        path.join(repoRoot, "benchmarks/runners/ptb"),
        "python",
        path.join(repoRoot, "benchmarks/runners/ptb/runner.py"),
      ];
  }
}

function withPin(command: ReadonlyArray<string>, pin: number | null): ReadonlyArray<string> {
  return pin === null ? command : ["taskset", "-c", String(pin), ...command];
}

async function spawnJson(
  command: ReadonlyArray<string>,
  pin: number | null,
): Promise<{ readonly durationNs: number; readonly value: unknown }> {
  const started = process.hrtime.bigint();
  const child = Bun.spawn([...withPin(command, pin)], {
    cwd: repoRoot,
    stderr: "pipe",
    stdout: "pipe",
  });
  const [stdout, stderr, exitCode] = await Promise.all([
    new Response(child.stdout).text(),
    new Response(child.stderr).text(),
    child.exited,
  ]);
  const durationNs = Number(process.hrtime.bigint() - started);
  if (exitCode !== 0) {
    throw new Error(`Benchmark runner failed (${command.join(" ")}): ${stderr.trim()}`);
  }
  if (stderr.trim().length > 0) {
    throw new Error(`Benchmark runner wrote unexpected stderr: ${stderr.trim()}`);
  }
  return { durationNs, value: JSON.parse(stdout) };
}

async function runFramework(
  framework: FrameworkName,
  options: {
    readonly mode: "decode" | "floor" | "ingress" | "latency" | "routing";
    readonly operations: number;
    readonly expected: WorkloadTotals;
    readonly pin: number | null;
    readonly rounds: number;
    readonly warmups: number;
    readonly warmupOperations: number;
    readonly workloadPath: string;
  },
): Promise<RunnerResultType> {
  console.error(`🏎  ${options.mode.padEnd(7)} ${framework}`);
  const command = [
    ...runnerCommand(framework),
    "--mode",
    options.mode,
    "--operations",
    String(options.operations),
    "--rounds",
    String(options.rounds),
    "--startup",
    "false",
    "--warmups",
    String(options.warmups),
    "--warmup-operations",
    String(options.warmupOperations),
    "--workload",
    options.workloadPath,
  ];
  const output = await spawnJson(command, options.pin);
  const result = Schema.decodeUnknownSync(RunnerResult)(output.value);
  assertRunnerResult(result, options.expected, {
    framework,
    mode: options.mode,
    operations: options.operations,
    rounds: options.rounds,
  });
  return result;
}

function rotatedFrameworks(index: number): ReadonlyArray<FrameworkName> {
  const offset = index % frameworkOrder.length;
  return [...frameworkOrder.slice(offset), ...frameworkOrder.slice(0, offset)];
}

function throughput(results: ReadonlyArray<RunnerResultType>, framework: FrameworkName) {
  return results
    .filter((result) => result.framework === framework)
    .flatMap((result) => result.rounds)
    .map((round) => round.operations / (round.durationNs / 1_000_000_000));
}

function latency(results: ReadonlyArray<RunnerResultType>, framework: FrameworkName) {
  return results
    .filter((result) => result.framework === framework)
    .flatMap((result) => result.latencyNs ?? []);
}

function peakRss(results: ReadonlyArray<RunnerResultType>, framework: FrameworkName) {
  return results
    .filter((result) => result.framework === framework)
    .map((result) => result.maxRssKiB);
}

async function startupSamples(options: {
  readonly pin: number | null;
  readonly rounds: number;
}) {
  const samples: Record<string, Array<number>> = {
    grammy: [],
    "node-baseline": [],
    "python-baseline": [],
    "python-telegram-bot": [],
    telly: [],
  };
  const baselineCommands: Record<string, ReadonlyArray<string>> = {
    "node-baseline": ["node", path.join(repoRoot, "benchmarks/runners/node-baseline.mjs")],
    "python-baseline": [
      "uv",
      "run",
      "--project",
      path.join(repoRoot, "benchmarks/runners/ptb"),
      "python",
      path.join(repoRoot, "benchmarks/runners/ptb/python_baseline.py"),
    ],
  };
  for (let round = 0; round < options.rounds; round += 1) {
    const order = [
      ...rotatedFrameworks(round),
      round % 2 === 0 ? "node-baseline" : "python-baseline",
      round % 2 === 0 ? "python-baseline" : "node-baseline",
    ];
    for (const name of order) {
      console.error(`🚦 startup ${name}`);
      const baselineCommand = baselineCommands[name];
      const command = baselineCommand !== undefined
        ? baselineCommand
        : [...runnerCommand(name as FrameworkName), "--startup", "true"];
      const output = await spawnJson(command, options.pin);
      const result = Schema.decodeUnknownSync(StartupResult)(output.value);
      if (result.framework !== name) {
        throw new Error(`Startup runner identity mismatch: expected ${name}, received ${result.framework}`);
      }
      samples[name]?.push(output.durationNs);
    }
  }
  return samples;
}

const cli = parseCli();
const manifest = Schema.decodeUnknownSync(Manifest)(
  JSON.parse(await readFile(path.join(repoRoot, "benchmarks/manifest.json"), "utf8")),
);
const preset = manifest.presets[cli.preset];
if (preset === undefined) throw new Error(`Unknown benchmark preset: ${cli.preset}`);
const environment = await benchmarkEnvironment(cli.pin);
if (
  cli.baseline &&
  !cli.allowNoisy &&
  environment.machine.pinnedCoreIdlePercent !== null &&
  environment.machine.pinnedCoreIdlePercent < 90
) {
  throw new Error(
    `Pinned physical core is only ${environment.machine.pinnedCoreIdlePercent.toFixed(1)}% idle. Choose another CPU or pass --allow-noisy.`,
  );
}
const scratch = await mkdtemp(path.join(tmpdir(), "telly-benchmark."));

try {
  const workload = makeWorkload({
    fixtureCount: manifest.workload.fixtureCount,
    seed: manifest.workload.seed,
  });
  const workloadPath = path.join(scratch, "workload.json");
  await writeFile(workloadPath, JSON.stringify(workload));
  const heavyWorkload = makeHeavyWorkload({
    fixtureCount: manifest.workload.fixtureCount,
    seed: manifest.workload.seed,
  });
  const heavyWorkloadPath = path.join(scratch, "heavy-workload.json");
  await writeFile(heavyWorkloadPath, JSON.stringify(heavyWorkload));
  const measuredExpected = expectedTotals(workload.entries, preset.operations);
  const latencyExpected = expectedTotals(workload.entries, preset.latencyOperations);
  const heavyExpected = expectedTotals(heavyWorkload.entries, preset.diagnosticOperations);
  const ingress: Array<RunnerResultType> = [];
  const routing: Array<RunnerResultType> = [];
  const decode: Array<RunnerResultType> = [];
  const heavyDecode: Array<RunnerResultType> = [];
  const latencyResults: Array<RunnerResultType> = [];

  for (let processIndex = 0; processIndex < preset.processes; processIndex += 1) {
    for (const framework of rotatedFrameworks(processIndex)) {
      ingress.push(await runFramework(framework, {
        mode: "ingress",
        expected: measuredExpected,
        operations: preset.operations,
        pin: cli.pin,
        rounds: preset.measuredRounds,
        warmups: preset.warmupRounds,
        warmupOperations: preset.operations,
        workloadPath,
      }));
    }
  }
  for (let processIndex = 0; processIndex < preset.processes; processIndex += 1) {
    for (const framework of rotatedFrameworks(processIndex + 1)) {
      routing.push(await runFramework(framework, {
        mode: "routing",
        expected: measuredExpected,
        operations: preset.operations,
        pin: cli.pin,
        rounds: preset.measuredRounds,
        warmups: preset.warmupRounds,
        warmupOperations: preset.operations,
        workloadPath,
      }));
    }
  }
  for (const framework of ["telly", "python-telegram-bot"] as const) {
    decode.push(await runFramework(framework, {
      mode: "decode",
      expected: measuredExpected,
      operations: preset.operations,
      pin: cli.pin,
      rounds: preset.measuredRounds,
      warmups: preset.warmupRounds,
      warmupOperations: preset.operations,
      workloadPath,
    }));
  }
  for (const framework of ["telly", "python-telegram-bot"] as const) {
    heavyDecode.push(await runFramework(framework, {
      mode: "decode",
      expected: heavyExpected,
      operations: preset.diagnosticOperations,
      pin: cli.pin,
      rounds: preset.measuredRounds,
      warmups: preset.warmupRounds,
      warmupOperations: preset.diagnosticOperations,
      workloadPath: heavyWorkloadPath,
    }));
  }
  for (let processIndex = 0; processIndex < preset.processes; processIndex += 1) {
    for (const framework of rotatedFrameworks(processIndex + 2)) {
      latencyResults.push(await runFramework(framework, {
        mode: "latency",
        expected: latencyExpected,
        operations: preset.latencyOperations,
        pin: cli.pin,
        rounds: 1,
        warmups: preset.warmupRounds,
        warmupOperations: preset.operations,
        workloadPath,
      }));
    }
  }
  const nodeFloor = await runFramework("telly", {
    mode: "floor",
    expected: latencyExpected,
    operations: preset.latencyOperations,
    pin: cli.pin,
    rounds: 1,
    warmups: 0,
    warmupOperations: preset.operations,
    workloadPath,
  });
  const pythonFloor = await runFramework("python-telegram-bot", {
    mode: "floor",
    expected: latencyExpected,
    operations: preset.latencyOperations,
    pin: cli.pin,
    rounds: 1,
    warmups: 0,
    warmupOperations: preset.operations,
    workloadPath,
  });
  const startupNs = await startupSamples({ pin: cli.pin, rounds: preset.startupRounds });
  const packageBytes = await measurePackageBytes(repoRoot);
  const versions = {
    grammy: ingress.find((result) => result.framework === "grammy")?.version ?? "missing",
    "python-telegram-bot": ingress.find((result) => result.framework === "python-telegram-bot")
      ?.version ?? "missing",
    telly: ingress.find((result) => result.framework === "telly")?.version ?? "missing",
  } as const;
  if (
    versions.grammy !== manifest.frameworks.grammy ||
    versions["python-telegram-bot"] !== manifest.frameworks.pythonTelegramBot
  ) {
    throw new Error(`Resolved framework versions do not match benchmarks/manifest.json`);
  }
  const nodeBaseline = summarize(startupNs["node-baseline"] ?? []);
  const pythonBaseline = summarize(startupNs["python-baseline"] ?? []);
  const allRunners = [
    ...ingress,
    ...routing,
    ...decode,
    ...heavyDecode,
    ...latencyResults,
    nodeFloor,
    pythonFloor,
  ];
  const throughputSummaries = {
    grammy: summarize(throughput(ingress, "grammy")),
    "python-telegram-bot": summarize(throughput(ingress, "python-telegram-bot")),
    telly: summarize(throughput(ingress, "telly")),
  };
  const qualityWarnings: Array<string> = [];
  const highestVariation = Math.max(...frameworkOrder.map(
    (framework) => throughputSummaries[framework].coefficientOfVariation,
  ));
  if (highestVariation > 0.05) {
    qualityWarnings.push(`Highest throughput CV was ${Math.round(highestVariation * 1_000) / 10}%; target is 5% or less.`);
  }
  if (
    environment.machine.pinnedCoreIdlePercent !== null &&
    environment.machine.pinnedCoreIdlePercent < 90
  ) {
    qualityWarnings.push(`Pinned physical core was only ${environment.machine.pinnedCoreIdlePercent.toFixed(1)}% idle before the run.`);
  }
  const document: BenchmarkDocument = {
    diagnostics: {
      decode: {
        telly: summarize(throughput(decode, "telly")),
        "python-telegram-bot": summarize(throughput(decode, "python-telegram-bot")),
      },
      heavyDecode: {
        telly: summarize(throughput(heavyDecode, "telly")),
        "python-telegram-bot": summarize(throughput(heavyDecode, "python-telegram-bot")),
      },
      routing: {
        grammy: summarize(throughput(routing, "grammy")),
        "python-telegram-bot": summarize(throughput(routing, "python-telegram-bot")),
        telly: summarize(throughput(routing, "telly")),
      },
    },
    generatedAt: new Date().toISOString(),
    machine: environment.machine,
    packageBytes,
    pin: cli.pin,
    preset: cli.preset,
    quality: {
      publishable: qualityWarnings.length === 0,
      warnings: qualityWarnings,
    },
    primary: {
      grammy: {
        latency: summarizeLatency(latency(latencyResults, "grammy")),
        peakRssKiB: summarize(peakRss(ingress, "grammy")),
        throughput: throughputSummaries.grammy,
      },
      "python-telegram-bot": {
        latency: summarizeLatency(latency(latencyResults, "python-telegram-bot")),
        peakRssKiB: summarize(peakRss(ingress, "python-telegram-bot")),
        throughput: throughputSummaries["python-telegram-bot"],
      },
      telly: {
        latency: summarizeLatency(latency(latencyResults, "telly")),
        peakRssKiB: summarize(peakRss(ingress, "telly")),
        throughput: throughputSummaries.telly,
      },
    },
    raw: { runners: allRunners, startupNs },
    schemaVersion: 1,
    source: environment.source,
    startup: {
      grammy: {
        deltaNs: summarize(startupNs["grammy"] ?? []).median - nodeBaseline.median,
        total: summarize(startupNs["grammy"] ?? []),
      },
      "python-telegram-bot": {
        deltaNs: summarize(startupNs["python-telegram-bot"] ?? []).median -
          pythonBaseline.median,
        total: summarize(startupNs["python-telegram-bot"] ?? []),
      },
      telly: {
        deltaNs: summarize(startupNs["telly"] ?? []).median - nodeBaseline.median,
        total: summarize(startupNs["telly"] ?? []),
      },
    },
    timerFloor: {
      node: summarizeLatency(nodeFloor.latencyNs ?? []),
      python: summarizeLatency(pythonFloor.latencyNs ?? []),
    },
    versions,
    workload: {
      ...manifest.workload,
      diagnosticOperations: preset.diagnosticOperations,
      operations: preset.operations,
    },
  };
  const directory = cli.baseline && document.quality.publishable
    ? path.join(repoRoot, "benchmarks/baselines")
    : path.join(repoRoot, "benchmarks/results");
  await mkdir(directory, { recursive: true });
  const stamp = document.generatedAt.slice(0, 19).replaceAll(":", "-");
  const baseName = `${stamp}-${document.source.gitSha.slice(0, 8)}-${cli.preset}`;
  const jsonPath = path.join(directory, `${baseName}.json`);
  const markdownPath = path.join(directory, `${baseName}.md`);
  await writeFile(jsonPath, `${JSON.stringify(document)}\n`);
  await writeFile(markdownPath, markdownReport(document, `./${baseName}.json`));
  console.log(terminalReport(document));
  console.log(`\nRaw: ${path.relative(repoRoot, jsonPath)}`);
  console.log(`Report: ${path.relative(repoRoot, markdownPath)}`);
} finally {
  await rm(scratch, { force: true, recursive: true });
}
