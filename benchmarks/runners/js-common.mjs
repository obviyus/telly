import { readFile } from "node:fs/promises";

const weights = { callback: 3, command: 2, text: 1 };

export function foldChecksum(current, kind, payload, updateId) {
  return (current + Math.imul(updateId, 17) + payload.length * 31 + weights[kind]) >>> 0;
}

export function parseArguments(argv) {
  const values = {};
  for (let index = 0; index < argv.length; index += 2) {
    const key = argv[index];
    const value = argv[index + 1];
    if (!key?.startsWith("--") || value === undefined) {
      throw new Error(`Invalid runner argument: ${String(key)}`);
    }
    values[key.slice(2)] = value;
  }
  return {
    mode: values.mode,
    operations: Number(values.operations),
    rounds: Number(values.rounds),
    startup: values.startup === "true",
    warmupOperations: Number(values["warmup-operations"] ?? values.operations),
    warmups: Number(values.warmups),
    workload: values.workload,
  };
}

export function makeMetrics() {
  return { callback: 0, checksum: 0, command: 0, text: 0 };
}

export function record(metrics, kind, payload, updateId) {
  metrics[kind] += 1;
  metrics.checksum = foldChecksum(metrics.checksum, kind, payload, updateId);
}

function expected(entries, operations) {
  const metrics = makeMetrics();
  for (let index = 0; index < operations; index += 1) {
    const entry = entries[index % entries.length];
    record(metrics, entry.kind, entry.payload, entry.updateId);
  }
  return metrics;
}

function assertMetrics(actual, wanted) {
  for (const key of ["callback", "checksum", "command", "text"]) {
    if (actual[key] !== wanted[key]) {
      throw new Error(`Correctness failure for ${key}: expected ${wanted[key]}, received ${actual[key]}`);
    }
  }
}

export async function runFramework(options) {
  const args = parseArguments(process.argv.slice(2));
  if (args.startup) {
    console.log(JSON.stringify({
      framework: options.framework,
      ready: true,
      runtime: `node ${process.version}`,
      schemaVersion: 1,
      version: options.version,
    }));
    return;
  }
  if (!Number.isSafeInteger(args.operations) || args.operations < 1) {
    throw new RangeError("operations must be a positive integer");
  }
  if (!Number.isSafeInteger(args.rounds) || args.rounds < 1) {
    throw new RangeError("rounds must be a positive integer");
  }
  if (!Number.isSafeInteger(args.warmups) || args.warmups < 0) {
    throw new RangeError("warmups must be a non-negative integer");
  }
  if (!Number.isSafeInteger(args.warmupOperations) || args.warmupOperations < 1) {
    throw new RangeError("warmup operations must be a positive integer");
  }
  if (args.workload === undefined) throw new Error("Missing workload path");
  const source = await readFile(args.workload, "utf8");
  const entries = JSON.parse(source).entries;
  await options.preflight(entries);

  if (args.mode === "floor") {
    const latencyNs = new Array(args.operations);
    for (let index = 0; index < args.operations; index += 1) {
      const started = process.hrtime.bigint();
      const ended = process.hrtime.bigint();
      latencyNs[index] = Number(ended - started);
    }
    console.log(JSON.stringify(await result(options, args.mode, [], latencyNs)));
    await options.close();
    return;
  }

  const prepared = args.mode === "routing"
    ? await options.prepareRouting(entries)
    : entries;
  const dispatch = args.mode === "decode"
    ? options.decode
    : args.mode === "routing"
    ? options.dispatchRouting
    : options.dispatchIngress;
  if (dispatch === undefined) throw new Error(`Unsupported mode: ${args.mode}`);

  const runRound = async (measureLatency, operations = args.operations) => {
    options.reset();
    const latencyNs = measureLatency ? new Array(operations) : undefined;
    const started = process.hrtime.bigint();
    for (let index = 0; index < operations; index += 1) {
      const entry = prepared[index % prepared.length];
      const operationStarted = measureLatency ? process.hrtime.bigint() : undefined;
      await dispatch(entry);
      if (latencyNs !== undefined && operationStarted !== undefined) {
        latencyNs[index] = Number(process.hrtime.bigint() - operationStarted);
      }
    }
    const durationNs = Number(process.hrtime.bigint() - started);
    const actual = options.metrics();
    const wanted = expected(entries, operations);
    assertMetrics(actual, wanted);
    return {
      latencyNs,
      round: {
        checksum: actual.checksum,
        counts: {
          callback: actual.callback,
          command: actual.command,
          text: actual.text,
        },
        durationNs,
        operations,
      },
    };
  };

  for (let round = 0; round < args.warmups; round += 1) {
    await runRound(false, args.warmupOperations);
  }
  if (args.mode === "latency") {
    const measured = await runRound(true);
    console.log(JSON.stringify(await result(options, args.mode, [measured.round], measured.latencyNs)));
  } else {
    const rounds = [];
    for (let round = 0; round < args.rounds; round += 1) {
      rounds.push((await runRound(false)).round);
    }
    console.log(JSON.stringify(await result(options, args.mode, rounds)));
  }
  await options.close();
}

async function result(options, mode, rounds, latencyNs) {
  const status = await readFile("/proc/self/status", "utf8");
  const maxRssKiB = Number(status.match(/^VmHWM:\s+(\d+)\s+kB$/mu)?.[1]);
  if (!Number.isSafeInteger(maxRssKiB)) throw new Error("Linux VmHWM is unavailable");
  return {
    finalRssBytes: process.memoryUsage.rss(),
    framework: options.framework,
    ...(latencyNs === undefined ? {} : { latencyNs }),
    maxRssKiB,
    mode,
    rounds,
    runtime: `node ${process.version}`,
    schemaVersion: 1,
    version: options.version,
  };
}
