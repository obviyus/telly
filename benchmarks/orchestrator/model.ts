import type { RunnerResult } from "./protocol.ts";
import type { LatencySummary, Summary } from "./stats.ts";

export type FrameworkName = "grammy" | "puregram" | "python-telegram-bot" | "telly";

export interface FrameworkMetrics {
  readonly latency: LatencySummary;
  readonly peakRssKiB: Summary;
  readonly throughput: Summary;
}

export interface StartupMetrics {
  readonly deltaNs: number;
  readonly total: Summary;
}

export interface BenchmarkDocument {
  readonly diagnostics: {
    readonly decode: Partial<Record<FrameworkName, Summary>>;
    readonly heavyDecode: Partial<Record<FrameworkName, Summary>>;
    readonly routing: Record<FrameworkName, Summary>;
  };
  readonly generatedAt: string;
  readonly machine: {
    readonly architecture: string;
    readonly bun: string;
    readonly cpu: string;
    readonly cpuAllowed: string;
    readonly cpuGovernor: string;
    readonly kernel: string;
    readonly loadAverage: ReadonlyArray<number>;
    readonly node: string;
    readonly pinnedCoreIdlePercent: number | null;
    readonly platform: string;
    readonly python: string;
    readonly totalMemoryBytes: number;
  };
  readonly packageBytes: Record<FrameworkName, number>;
  readonly pin: number | null;
  readonly preset: string;
  readonly quality: {
    readonly publishable: boolean;
    readonly warnings: ReadonlyArray<string>;
  };
  readonly primary: Record<FrameworkName, FrameworkMetrics>;
  readonly raw: {
    readonly runners: ReadonlyArray<RunnerResult>;
    readonly startupNs: Readonly<Record<string, ReadonlyArray<number>>>;
  };
  readonly schemaVersion: 1;
  readonly source: {
    readonly gitSha: string;
    readonly workingTreeDirty: boolean;
  };
  readonly startup: Record<FrameworkName, StartupMetrics>;
  readonly timerFloor: {
    readonly node: LatencySummary;
    readonly python: LatencySummary;
  };
  readonly versions: Record<FrameworkName, string>;
  readonly workload: {
    readonly callbackPercent: number;
    readonly commandPercent: number;
    readonly diagnosticOperations: number;
    readonly fixtureCount: number;
    readonly operations: number;
    readonly seed: number;
    readonly textPercent: number;
  };
}
