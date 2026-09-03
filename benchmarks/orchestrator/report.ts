import type {
  BenchmarkDocument,
  FrameworkName,
  FrameworkMetrics,
} from "./model.ts";

const frameworks: ReadonlyArray<FrameworkName> = [
  "telly",
  "grammy",
  "puregram",
  "python-telegram-bot",
];

function integer(value: number): string {
  return Math.round(value).toLocaleString("en-US");
}

function percent(value: number): string {
  return `${(value * 100).toFixed(1)}%`;
}

function microseconds(value: number): string {
  return (value / 1_000).toFixed(value < 10_000 ? 1 : 0);
}

function mebibytes(kibibytes: number): string {
  return (kibibytes / 1_024).toFixed(1);
}

function packageMebibytes(bytes: number): string {
  return (bytes / 1_048_576).toFixed(1);
}

function primaryRow(name: FrameworkName, metrics: FrameworkMetrics): string {
  return `| ${name} | ${integer(metrics.throughput.median)} | ${percent(metrics.throughput.coefficientOfVariation)} | ${microseconds(metrics.latency.p50)} | ${microseconds(metrics.latency.p95)} | ${microseconds(metrics.latency.p99)} | ${mebibytes(metrics.peakRssKiB.median)} | ${mebibytes(metrics.peakRssKiB.max)} |`;
}

export function markdownReport(result: BenchmarkDocument, rawFile: string): string {
  const winner = [...frameworks].sort((left, right) =>
    result.primary[right].throughput.median - result.primary[left].throughput.median
  )[0] ?? "unknown";
  const routingRows = frameworks.map((name) =>
    `| ${name} | ${integer(result.diagnostics.routing[name].median)} | ${percent(result.diagnostics.routing[name].coefficientOfVariation)} |`
  ).join("\n");
  const decodeRows = frameworks.map((name) => {
    const metric = result.diagnostics.decode[name];
    return `| ${name} | ${metric === undefined ? "N/A" : integer(metric.median)} |`;
  }).join("\n");
  const heavyDecodeRows = frameworks.map((name) => {
    const metric = result.diagnostics.heavyDecode[name];
    return `| ${name} | ${metric === undefined ? "N/A" : integer(metric.median)} |`;
  }).join("\n");
  const startupRows = frameworks.map((name) =>
    `| ${name} | ${(result.startup[name].total.median / 1_000_000).toFixed(1)} | ${(result.startup[name].deltaNs / 1_000_000).toFixed(1)} |`
  ).join("\n");
  const packageRows = frameworks.map((name) =>
    `| ${name} | ${packageMebibytes(result.packageBytes[name])} |`
  ).join("\n");
  const quality = result.quality.publishable
    ? "✅ This run passed the noise checks."
    : `⚠️ Do not use this run for tight regression decisions:\n${result.quality.warnings.map((warning) => `- ${warning}`).join("\n")}`;

  return `# Telly benchmark report

Headline winner for this workload: **${winner}**.

The primary score includes each framework's production update construction, routing, and awaited handler completion. It excludes JSON string parsing, Telegram network time, and user handler work.

${quality}

## Race card

| Framework | updates/s | CV | p50 µs | p95 µs | p99 µs | median peak RSS MiB | max peak RSS MiB |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
${frameworks.map((name) => primaryRow(name, result.primary[name])).join("\n")}

CV is the coefficient of variation across throughput rounds. Peak RSS compares the three Node frameworks directly. The Python value describes the full Python stack. Every process peak remains in the raw data.

## Routing-only diagnostic

| Framework | updates/s | CV |
| --- | ---: | ---: |
${routingRows}

## Decode-only diagnostic

| Framework | updates/s |
| --- | ---: |
${decodeRows}

grammY reports N/A because it consumes Telegram update objects directly. Puregram reports N/A because it has no public standalone decode interface.

## Complex decode diagnostic

| Framework | updates/s |
| --- | ---: |
${heavyDecodeRows}

Complex fixtures add forwarded origins, nested replies, photo arrays, and inline keyboards. Each round decodes ${integer(result.workload.diagnosticOperations)} updates. This diagnostic proves sparse decoding beyond the primary shapes. grammY and Puregram remain N/A for the same reasons as the decode-only table.

## Cold startup

| Framework | total ms | framework delta ms |
| --- | ---: | ---: |
${startupRows}

Framework delta subtracts a fresh hello-world process in the same runtime. Negative deltas within measurement noise remain visible.

## Installed production package cost

| Framework | MiB |
| --- | ---: |
${packageRows}

Package size is descriptive across ecosystems. Telly includes its built artifact and production dependency closure. grammY and Puregram include their production dependency closures. python-telegram-bot includes its virtual environment site-packages without bytecode caches.

## Method

- Workload: ${result.workload.textPercent}% text, ${result.workload.commandPercent}% command, ${result.workload.callbackPercent}% callback updates in one chat.
- Primary operations per round: ${integer(result.workload.operations)}.
- Fixture values: ${integer(result.workload.fixtureCount)}, seed ${result.workload.seed}.
- CPU pin: ${result.pin === null ? "off" : result.pin}.
- Timer floor p50: Node ${microseconds(result.timerFloor.node.p50)} µs; Python ${microseconds(result.timerFloor.python.p50)} µs. Floors are not subtracted.
- No samples were discarded. Raw samples: [${rawFile}](${rawFile}).

## Environment

- Source: ${result.source.gitSha}${result.source.workingTreeDirty ? " (worktree dirty)" : ""}
- CPU: ${result.machine.cpu}
- Allowed CPUs: ${result.machine.cpuAllowed}
- Governor: ${result.machine.cpuGovernor}
- Kernel: ${result.machine.platform} ${result.machine.kernel} ${result.machine.architecture}
- Runtimes: Node ${result.machine.node}, Bun ${result.machine.bun}, ${result.machine.python}
- Frameworks: Telly ${result.versions.telly}, grammY ${result.versions.grammy}, Puregram ${result.versions.puregram}, python-telegram-bot ${result.versions["python-telegram-bot"]}
- Pinned physical core idle before start: ${result.machine.pinnedCoreIdlePercent === null ? "not sampled" : `${result.machine.pinnedCoreIdlePercent.toFixed(1)}%`}
- Load average at start: ${result.machine.loadAverage.map((value) => value.toFixed(2)).join(", ")}
- Generated: ${result.generatedAt}
`;
}

export function terminalReport(result: BenchmarkDocument): string {
  const maximum = Math.max(...frameworks.map((name) => result.primary[name].throughput.median));
  const rows = frameworks.map((name) => {
    const value = result.primary[name].throughput.median;
    const blocks = Math.max(1, Math.round(value / maximum * 24));
    return `${name.padEnd(21)} ${"█".repeat(blocks).padEnd(24)} ${integer(value).padStart(12)} updates/s  CV ${percent(result.primary[name].throughput.coefficientOfVariation)}`;
  });
  return [
    "🏁 Telly benchmark lab",
    "",
    ...rows,
    "",
    "Every runner passed routing counts, checksum, and async completion preflight.",
    result.quality.publishable
      ? "✅ Noise checks passed."
      : `⚠️  Noisy run: ${result.quality.warnings.join(" ")}`,
  ].join("\n");
}
