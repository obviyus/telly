import { readFile } from "node:fs/promises";
import os from "node:os";

async function text(path: string, fallback: string): Promise<string> {
  try {
    return (await readFile(path, "utf8")).trim();
  } catch {
    return fallback;
  }
}

async function command(argv: ReadonlyArray<string>): Promise<string> {
  const child = Bun.spawn([...argv], { stderr: "pipe", stdout: "pipe" });
  const output = await new Response(child.stdout).text();
  const exitCode = await child.exited;
  if (exitCode !== 0) throw new Error(`Command failed: ${argv.join(" ")}`);
  return output.trim();
}

async function idlePercent(cpu: number | null): Promise<number | null> {
  if (cpu === null) return null;
  const siblings = (await readFile(
    `/sys/devices/system/cpu/cpu${cpu}/topology/thread_siblings_list`,
    "utf8",
  )).trim().split(",").flatMap((part) => {
    const [first, last = first] = part.split("-").map(Number);
    if (first === undefined || last === undefined) return [];
    return Array.from({ length: last - first + 1 }, (_, index) => first + index);
  });
  const sample = async () => {
    const stat = await readFile("/proc/stat", "utf8");
    let idle = 0;
    let total = 0;
    for (const sibling of siblings) {
      const line = stat.split("\n").find((value) => value.startsWith(`cpu${sibling} `));
      if (line === undefined) throw new Error(`CPU ${sibling} is not available in /proc/stat`);
      const fields = line.trim().split(/\s+/u).slice(1).map(Number);
      if (fields.length < 5 || fields.some((value) => !Number.isFinite(value))) {
        throw new Error(`CPU ${sibling} has invalid /proc/stat counters`);
      }
      idle += (fields[3] ?? 0) + (fields[4] ?? 0);
      total += fields.reduce((sum, value) => sum + value, 0);
    }
    return { idle, total };
  };
  const before = await sample();
  await new Promise((resolve) => setTimeout(resolve, 250));
  const after = await sample();
  const total = after.total - before.total;
  return total === 0 ? 0 : (after.idle - before.idle) / total * 100;
}

export async function benchmarkEnvironment(pin: number | null) {
  const status = await text("/proc/self/status", "");
  const cpuAllowed = status.match(/^Cpus_allowed_list:\s+(.+)$/mu)?.[1] ?? "unknown";
  return {
    machine: {
      architecture: os.arch(),
      bun: Bun.version,
      cpu: os.cpus()[0]?.model ?? "unknown",
      cpuAllowed,
      cpuGovernor: await text(
        "/sys/devices/system/cpu/cpu0/cpufreq/scaling_governor",
        "unknown",
      ),
      kernel: os.release(),
      loadAverage: os.loadavg(),
      node: await command(["node", "--version"]),
      pinnedCoreIdlePercent: await idlePercent(pin),
      platform: os.platform(),
      python: await command([
        "uv",
        "run",
        "--project",
        "benchmarks/runners/ptb",
        "python",
        "--version",
      ]),
      totalMemoryBytes: os.totalmem(),
    },
    source: {
      gitSha: await command(["git", "rev-parse", "HEAD"]),
      workingTreeDirty: (await command(["git", "status", "--porcelain"]))
        .length > 0,
    },
  };
}
