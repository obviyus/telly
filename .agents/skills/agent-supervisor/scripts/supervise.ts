#!/usr/bin/env bun

import { once } from "node:events";
import { createWriteStream, existsSync } from "node:fs";
import { chmod, mkdir } from "node:fs/promises";
import { dirname, isAbsolute, resolve } from "node:path";

// Shared by the Grok and Claude delegation skills.

type SupervisionOptions = {
  label: string;
  output: string;
  stdinFile?: string;
  heartbeatSeconds?: number;
  command: string[];
};

export type SupervisionResult = {
  exitCode: number;
  output: string;
  stderrOutput: string;
};

type Activity = {
  stdoutBytes: number;
  stderrBytes: number;
  stdoutLines: number;
  stderrLines: number;
  jsonEvents: number;
  lastEvent: string;
};

function safeToken(value: string): string {
  return value.replace(/[^a-zA-Z0-9_.:-]/g, "?").slice(0, 80);
}

function processMetrics(pid: number): string {
  const ps = existsSync("/bin/ps") ? "/bin/ps" : "/usr/bin/ps";
  if (!existsSync(ps)) return "";

  const result = Bun.spawnSync([ps, "-o", "state=", "-o", "rss=", "-o", "time=", "-p", String(pid)], {
    stdout: "pipe",
    stderr: "ignore",
  });
  if (result.exitCode !== 0) return "";

  const fields = new TextDecoder().decode(result.stdout).trim().split(/\s+/);
  if (fields.length < 3) return "";

  const rssKb = Number.parseInt(fields[1] ?? "", 10);
  const rss = Number.isFinite(rssKb) ? ` rss=${Math.round(rssKb / 1024)}M` : "";
  return `${rss} state=${safeToken(fields[0] ?? "?")} cpu=${safeToken(fields[2] ?? "?")}`;
}

function observeLine(name: "stdout" | "stderr", line: string, activity: Activity): void {
  if (name === "stdout") {
    activity.stdoutLines += 1;
    try {
      const event: unknown = JSON.parse(line);
      if (typeof event === "object" && event !== null && "type" in event) {
        const type = Reflect.get(event, "type");
        if (typeof type === "string") {
          activity.jsonEvents += 1;
          activity.lastEvent = safeToken(type);
        }
      }
    } catch {
      // Non-JSON output remains in the artifact and still counts as activity.
    }
  } else {
    activity.stderrLines += 1;
  }
}

async function drain(
  name: "stdout" | "stderr",
  stream: ReadableStream<Uint8Array>,
  output: string,
  activity: Activity,
): Promise<void> {
  await Bun.write(output, "");
  await chmod(output, 0o600);
  const target = createWriteStream(output, { flags: "a" });
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  let pending = "";

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      if (!target.write(value)) await once(target, "drain");
      if (name === "stdout") activity.stdoutBytes += value.byteLength;
      else activity.stderrBytes += value.byteLength;

      pending += decoder.decode(value, { stream: true });
      let newline = pending.indexOf("\n");
      while (newline !== -1) {
        observeLine(name, pending.slice(0, newline), activity);
        pending = pending.slice(newline + 1);
        newline = pending.indexOf("\n");
      }
    }

    pending += decoder.decode();
    if (pending) observeLine(name, pending, activity);
  } finally {
    target.end();
    await once(target, "finish");
  }
}

export async function supervise(options: SupervisionOptions): Promise<SupervisionResult> {
  const heartbeatSeconds = options.heartbeatSeconds ?? 60;
  if (!/^[a-zA-Z0-9_.:-]+$/.test(options.label)) {
    throw new Error("label must contain only letters, numbers, dot, colon, underscore, or dash");
  }
  if (!isAbsolute(options.output)) throw new Error("output must be an absolute path");
  if (options.stdinFile && !isAbsolute(options.stdinFile)) {
    throw new Error("stdin file must be an absolute path");
  }
  if (!Number.isFinite(heartbeatSeconds) || heartbeatSeconds <= 0) {
    throw new Error("heartbeat seconds must be positive");
  }
  if (options.command.length === 0) throw new Error("missing command after --");

  const stderrOutput = `${options.output}.stderr`;
  const stdinFile = options.stdinFile;
  if (
    stdinFile &&
    [options.output, stderrOutput].some((output) => resolve(output) === resolve(stdinFile))
  ) {
    throw new Error("stdin file must differ from output artifacts");
  }
  await mkdir(dirname(options.output), { recursive: true });

  const activity: Activity = {
    stdoutBytes: 0,
    stderrBytes: 0,
    stdoutLines: 0,
    stderrLines: 0,
    jsonEvents: 0,
    lastEvent: "none",
  };
  const started = performance.now();
  const child = Bun.spawn(options.command, {
    stdin: options.stdinFile ? Bun.file(options.stdinFile) : "ignore",
    stdout: "pipe",
    stderr: "pipe",
  });

  console.error(
    `${options.label} started: pid=${child.pid} output=${JSON.stringify(options.output)}`,
  );

  let lastSignal = started;
  let lastReportedActivity = 0;
  const heartbeatMilliseconds = heartbeatSeconds * 1000;
  const activityMilliseconds = Math.min(20_000, heartbeatMilliseconds);
  const timer = setInterval(() => {
    const now = performance.now();
    const totalActivity = activity.stdoutLines + activity.stderrLines;
    const elapsed = Math.floor((now - started) / 1000);
    const detail =
      `elapsed=${elapsed}s pid=${child.pid} events=${activity.jsonEvents}` +
      ` stdout=${activity.stdoutBytes}B stderr=${activity.stderrBytes}B` +
      ` last=${activity.lastEvent}${processMetrics(child.pid)}`;

    if (totalActivity !== lastReportedActivity && now - lastSignal >= activityMilliseconds) {
      console.error(`${options.label} activity: ${detail}`);
      lastReportedActivity = totalActivity;
      lastSignal = now;
    } else if (now - lastSignal >= heartbeatMilliseconds) {
      console.error(`${options.label} still running: ${detail}`);
      lastSignal = now;
    }
  }, activityMilliseconds);

  const forwardSignal = (signal: NodeJS.Signals) => child.kill(signal);
  const onInterrupt = () => forwardSignal("SIGINT");
  const onTerminate = () => forwardSignal("SIGTERM");
  process.on("SIGINT", onInterrupt);
  process.on("SIGTERM", onTerminate);

  let exitCode: number;
  try {
    const exitPromise = child.exited;
    await Promise.all([
      drain("stdout", child.stdout, options.output, activity),
      drain("stderr", child.stderr, stderrOutput, activity),
    ]);
    exitCode = await exitPromise;
  } catch (error) {
    child.kill("SIGTERM");
    await child.exited;
    throw error;
  } finally {
    clearInterval(timer);
    process.off("SIGINT", onInterrupt);
    process.off("SIGTERM", onTerminate);
  }

  const elapsed = Math.floor((performance.now() - started) / 1000);
  console.error(
    `${options.label} completed: exit=${exitCode} elapsed=${elapsed}s events=${activity.jsonEvents}` +
      ` stdout=${activity.stdoutBytes}B stderr=${activity.stderrBytes}B last=${activity.lastEvent}`,
  );

  return { exitCode, output: options.output, stderrOutput };
}

function parseArguments(args: string[]): SupervisionOptions {
  const separator = args.indexOf("--");
  if (separator === -1) {
    throw new Error(
      "Usage: supervise.ts --label NAME --output /absolute/output.jsonl [--stdin-file /absolute/prompt] -- COMMAND...",
    );
  }

  let label = "";
  let output = "";
  let stdinFile: string | undefined;
  let heartbeatSeconds: number | undefined;

  for (let index = 0; index < separator; index += 1) {
    const argument = args[index];
    const value = args[index + 1];
    if (argument === "--label" && value) {
      label = value;
      index += 1;
    } else if (argument === "--output" && value) {
      output = value;
      index += 1;
    } else if (argument === "--stdin-file" && value) {
      stdinFile = value;
      index += 1;
    } else if (argument === "--heartbeat-seconds" && value) {
      heartbeatSeconds = Number(value);
      index += 1;
    } else {
      throw new Error(`unknown or incomplete supervisor argument: ${argument ?? "<missing>"}`);
    }
  }

  if (!label) throw new Error("missing --label");
  if (!output) throw new Error("missing --output");

  return {
    label,
    output,
    stdinFile,
    heartbeatSeconds,
    command: args.slice(separator + 1),
  };
}

if (import.meta.main) {
  try {
    const result = await supervise(parseArguments(Bun.argv.slice(2)));
    process.exitCode = result.exitCode;
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
}
