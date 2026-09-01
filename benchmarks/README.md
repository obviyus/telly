# Telly benchmark lab

This suite races Telly, grammY, and python-telegram-bot through the same deterministic Telegram update workload.

The primary score starts with a parsed Telegram update object. It includes each framework's native update construction or validation, routing, and awaited handler completion. It excludes JSON parsing, network time, and user work.

## Run it

Requirements: Linux, Node.js 22 or newer, Bun 1.4, Python 3.12 or newer, and `uv`.

```sh
bun run bench:setup
bun run bench
```

`bun run bench` is a fast local smoke race. It writes ignored raw JSON and Markdown reports under `benchmarks/results/`.

Run the publishable suite when the machine is otherwise idle:

```sh
bun run bench:baseline --pin 3
```

`--pin 3` keeps every runner on CPU 3. Choose an idle CPU from the allowed CPU list for your machine. A baseline stops early when that CPU's physical core is less than 90% idle. Use `--allow-noisy` only when you need diagnostic data rather than a publishable baseline.

## What it reports

- Primary throughput: median updates per second across every measured round.
- Latency: p50, p95, and p99 for separately timed operations.
- Memory: Linux peak resident set size for each fresh runner process.
- Startup: total cold process time and the delta from a minimal process in the same runtime.
- Package cost: installed production bytes, reported as a descriptive cross-ecosystem comparison.
- Diagnostics: routing-only and decode-only throughput to show where time goes.

No sample is removed. Each result includes all raw samples, variance, machine data, runtime versions, source revision, and dirty-worktree state.

## Correctness contract

The seeded workload contains 70% text messages, 20% commands, and 10% callback queries. Every runner must:

1. Route each update through the public framework interface.
2. Await an intentionally suspended handler during preflight.
3. Ignore an update with no matching handler.
4. Return the exact event counts and rolling checksum.

The runner and Bun orchestrator both verify the counts and checksum before accepting timing data.

## Read results honestly

The primary workloads are equivalent, but the frameworks make different product choices. Telly validates Telegram input into its public schema. python-telegram-bot constructs Python domain objects. grammY uses Telegram objects directly, so its decode-only result is `N/A`.

Package sizes are not a quality score. Python and JavaScript package layouts differ. Telly also includes Effect and its configured persistence dependency.

Do not compare reports from different machines as if they were one race. Use a quiet machine, pin the same CPU when possible, and compare results from the same source and environment.
