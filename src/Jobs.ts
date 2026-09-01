import * as Context from "effect/Context";
import * as Deferred from "effect/Deferred";
import * as Duration from "effect/Duration";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Schema from "effect/Schema";

import { Bot } from "./BotApi.js";
import { nextJobOccurrence } from "./internal/JobSchedule.js";

const JobDefinitionTypeId = Symbol.for("telly/JobDefinition");
export const JobsTypeId = Symbol.for("telly/Jobs");

export interface JobOptions {
  readonly capacity?: number;
  readonly concurrency?: number;
  readonly doneRetentionMs?: number;
  readonly gracePeriodMs?: number;
  readonly leaseMs?: number;
  readonly maxAttempts?: number;
  readonly retryBaseMs?: number;
  readonly retryMaxMs?: number;
}

export const jobDefaults = {
  capacity: 10_000,
  concurrency: 16,
  doneRetentionMs: 86_400_000,
  gracePeriodMs: 30_000,
  leaseMs: 30_000,
  maxAttempts: 5,
  pollIntervalMs: 100,
  retryBaseMs: 1_000,
  retryMaxMs: 60_000,
} as const;

type ResolvedJobOptions = Required<JobOptions>;

export interface JobContext {
  readonly attempt: number;
  readonly id: string;
  readonly scheduledAt: Date;
}

export class JobStoreError extends Schema.TaggedError<JobStoreError>()(
  "JobStoreError",
  {
    description: Schema.String,
    operation: Schema.String,
  },
) {}

export class JobLeaseLost extends Schema.TaggedError<JobLeaseLost>()(
  "JobLeaseLost",
  { botId: Schema.Int },
) {}

export class InvalidJobPayload extends Schema.TaggedError<InvalidJobPayload>()(
  "InvalidJobPayload",
  {
    description: Schema.String,
    jobName: Schema.String,
  },
) {}

export class InvalidJobSchedule extends Schema.TaggedError<InvalidJobSchedule>()(
  "InvalidJobSchedule",
  {
    description: Schema.String,
    jobName: Schema.String,
  },
) {}

export class JobConflict extends Schema.TaggedError<JobConflict>()(
  "JobConflict",
  { jobId: Schema.String },
) {}

export class JobCapacityExceeded extends Schema.TaggedError<JobCapacityExceeded>()(
  "JobCapacityExceeded",
  { capacity: Schema.Int },
) {}

export type JobSchedule =
  | { readonly _tag: "Once" }
  | { readonly _tag: "Repeat"; readonly intervalMs: number };

export type JobSaveResult =
  | { readonly _tag: "Conflict" }
  | { readonly _tag: "Existing" }
  | { readonly _tag: "Full" }
  | { readonly _tag: "Stored" };

export type JobLeaseResult =
  | { readonly _tag: "Acquired"; readonly fencingToken: number }
  | { readonly _tag: "Held" };

export interface ClaimedJob {
  readonly attempts: number;
  readonly id: string;
  readonly name: string;
  readonly payload: unknown;
  readonly scheduledTimeMs: number;
}

export type JobSettlement =
  | { readonly _tag: "Done" }
  | { readonly _tag: "Interrupted" }
  | { readonly _tag: "Parked"; readonly reason: string }
  | { readonly _tag: "Retry"; readonly delayMs: number };

export interface SaveJob {
  readonly botId: number;
  readonly capacity: number;
  readonly fingerprint: string;
  readonly id: string;
  readonly name: string;
  readonly payload: unknown;
  readonly runAtMs: number;
  readonly schedule: JobSchedule;
}

export interface JobLeaseOptions {
  readonly botId: number;
  readonly leaseMs: number;
}

export interface FencedJobOperation {
  readonly botId: number;
  readonly fencingToken: number;
}

export interface ClaimJobs extends FencedJobOperation {
  readonly limit: number;
}

export interface SettleJob extends FencedJobOperation {
  readonly id: string;
  readonly outcome: JobSettlement;
}

export interface PruneJobs {
  readonly botId: number;
  readonly doneAgeMs: number;
}

export interface JobStoreService {
  /** Acquires exclusive claim authority for one bot. Tokens must increase after expiry. */
  readonly acquire: (
    options: JobLeaseOptions,
  ) => Effect.Effect<JobLeaseResult, JobStoreError>;
  readonly cancel: (
    options: { readonly botId: number; readonly id: string },
  ) => Effect.Effect<boolean, JobStoreError>;
  /** Atomically claims due jobs and unfinished jobs owned by an older fencing token. */
  readonly claim: (
    options: ClaimJobs,
  ) => Effect.Effect<ReadonlyArray<ClaimedJob>, JobStoreError | JobLeaseLost>;
  readonly prune: (
    options: PruneJobs,
  ) => Effect.Effect<void, JobStoreError>;
  readonly release: (
    options: FencedJobOperation,
  ) => Effect.Effect<void, JobStoreError>;
  /** Renews only the current lease. A stale token fails with JobLeaseLost. */
  readonly renew: (
    options: FencedJobOperation & { readonly leaseMs: number },
  ) => Effect.Effect<void, JobStoreError | JobLeaseLost>;
  /** Saves one idempotent job or reports a conflicting identifier without changing it. */
  readonly save: (
    options: SaveJob,
  ) => Effect.Effect<JobSaveResult, JobStoreError>;
  /** Atomically settles only work claimed by the current token. Done rearms repeating jobs. */
  readonly settle: (
    options: SettleJob,
  ) => Effect.Effect<void, JobStoreError | JobLeaseLost>;
}

export class JobStore extends Context.Service<JobStore, JobStoreService>()(
  "telly/JobStore",
) {}

type ScheduledRow = {
  attempts: number;
  readonly fingerprint: string;
  readonly id: string;
  readonly name: string;
  nextRunMs: number;
  readonly payload: unknown;
  readonly schedule: JobSchedule;
  scheduledTimeMs: number;
  state: "scheduled";
};

type RunningRow = {
  readonly attempts: number;
  readonly fencingToken: number;
  readonly fingerprint: string;
  readonly id: string;
  readonly name: string;
  readonly payload: unknown;
  readonly schedule: JobSchedule;
  readonly scheduledTimeMs: number;
  state: "running";
};

type TerminalRow = {
  readonly attempts: number;
  readonly fingerprint: string;
  readonly id: string;
  readonly name: string;
  readonly payload: unknown;
  readonly schedule: JobSchedule;
  readonly scheduledTimeMs: number;
  readonly state: "done" | "parked";
  readonly terminalTimeMs: number;
};

type JobRow = ScheduledRow | RunningRow | TerminalRow;

interface BotJobs {
  lease?: { readonly expiresAtMs: number; readonly fencingToken: number };
  nextFencingToken: number;
  readonly rows: Map<string, JobRow>;
}

function positiveInteger(value: number, name: string): void {
  if (!Number.isSafeInteger(value) || value < 1) {
    throw new RangeError(`${name} must be a positive safe integer`);
  }
}

function nonNegativeSafeInteger(value: number, name: string): void {
  if (!Number.isSafeInteger(value) || value < 0) {
    throw new RangeError(`${name} must be a non-negative safe integer`);
  }
}

/** Process-memory job storage for development and adapter tests. It is not durable. */
export const MemoryJobs = {
  layer(): Layer.Layer<JobStore> {
    return Layer.succeed(JobStore, MemoryJobs.make());
  },

  make(): JobStoreService {
    const bots = new Map<number, BotJobs>();
    const botJobs = (botId: number) => {
      let jobs = bots.get(botId);
      if (jobs === undefined) {
        jobs = { nextFencingToken: 0, rows: new Map() };
        bots.set(botId, jobs);
      }
      return jobs;
    };
    const currentLease = (botId: number, fencingToken: number, now: number) => {
      const lease = botJobs(botId).lease;
      if (
        lease === undefined ||
        lease.fencingToken !== fencingToken ||
        lease.expiresAtMs <= now
      ) {
        return new JobLeaseLost({ botId });
      }
      return lease;
    };

    return JobStore.of({
      acquire: Effect.fn("MemoryJobs.acquire")(function* (options) {
        positiveInteger(options.botId, "botId");
        positiveInteger(options.leaseMs, "leaseMs");
        return yield* Effect.clockWith((clock) => Effect.sync(() => {
          const now = clock.currentTimeMillisUnsafe();
          const jobs = botJobs(options.botId);
          if (jobs.lease !== undefined && jobs.lease.expiresAtMs > now) {
            return { _tag: "Held" } as const;
          }
          jobs.nextFencingToken += 1;
          jobs.lease = {
            expiresAtMs: now + options.leaseMs,
            fencingToken: jobs.nextFencingToken,
          };
          return { _tag: "Acquired", fencingToken: jobs.nextFencingToken } as const;
        }));
      }),

      cancel: Effect.fn("MemoryJobs.cancel")(function* (options) {
        return yield* Effect.sync(() => botJobs(options.botId).rows.delete(options.id));
      }),

      claim: Effect.fn("MemoryJobs.claim")(function* (options) {
        positiveInteger(options.limit, "limit");
        return yield* Effect.clockWith((clock) => Effect.gen(function* () {
          const now = clock.currentTimeMillisUnsafe();
          const lease = currentLease(options.botId, options.fencingToken, now);
          if (lease instanceof JobLeaseLost) return yield* lease;
          return yield* Effect.sync(() => {
            const jobs = botJobs(options.botId);
            const eligible = [...jobs.rows.values()]
              .filter((row) =>
                (row.state === "scheduled" && row.nextRunMs <= now) ||
                (row.state === "running" && row.fencingToken !== options.fencingToken)
              )
              .sort((left, right) =>
                left.scheduledTimeMs - right.scheduledTimeMs || left.id.localeCompare(right.id)
              )
              .slice(0, options.limit);
            return eligible.map((row) => {
              const running: RunningRow = {
                attempts: row.attempts + 1,
                fencingToken: options.fencingToken,
                fingerprint: row.fingerprint,
                id: row.id,
                name: row.name,
                payload: row.payload,
                schedule: row.schedule,
                scheduledTimeMs: row.scheduledTimeMs,
                state: "running",
              };
              jobs.rows.set(row.id, running);
              return {
                attempts: running.attempts,
                id: running.id,
                name: running.name,
                payload: structuredClone(running.payload),
                scheduledTimeMs: running.scheduledTimeMs,
              };
            });
          });
        }));
      }),

      prune: Effect.fn("MemoryJobs.prune")(function* (options) {
        nonNegativeSafeInteger(options.doneAgeMs, "doneAgeMs");
        yield* Effect.clockWith((clock) => Effect.sync(() => {
          const cutoff = clock.currentTimeMillisUnsafe() - options.doneAgeMs;
          const jobs = botJobs(options.botId);
          for (const [id, row] of jobs.rows) {
            if (row.state === "done" && row.terminalTimeMs <= cutoff) jobs.rows.delete(id);
          }
        }));
      }),

      release: Effect.fn("MemoryJobs.release")(function* (options) {
        yield* Effect.sync(() => {
          const jobs = botJobs(options.botId);
          if (jobs.lease?.fencingToken === options.fencingToken) delete jobs.lease;
        });
      }),

      renew: Effect.fn("MemoryJobs.renew")(function* (options) {
        positiveInteger(options.leaseMs, "leaseMs");
        yield* Effect.clockWith((clock) => Effect.gen(function* () {
          const now = clock.currentTimeMillisUnsafe();
          const lease = currentLease(options.botId, options.fencingToken, now);
          if (lease instanceof JobLeaseLost) return yield* lease;
          botJobs(options.botId).lease = {
            expiresAtMs: now + options.leaseMs,
            fencingToken: options.fencingToken,
          };
        }));
      }),

      save: Effect.fn("MemoryJobs.save")(function* (options) {
        positiveInteger(options.botId, "botId");
        positiveInteger(options.capacity, "capacity");
        nonNegativeSafeInteger(options.runAtMs, "runAtMs");
        if (options.schedule._tag === "Repeat") {
          positiveInteger(options.schedule.intervalMs, "intervalMs");
        }
        return yield* Effect.sync(() => {
          const jobs = botJobs(options.botId);
          const existing = jobs.rows.get(options.id);
          if (existing !== undefined) {
            return existing.fingerprint === options.fingerprint
              ? { _tag: "Existing" } as const
              : { _tag: "Conflict" } as const;
          }
          let active = 0;
          for (const row of jobs.rows.values()) {
            if (row.state === "scheduled" || row.state === "running") active += 1;
          }
          if (active >= options.capacity) return { _tag: "Full" } as const;
          jobs.rows.set(options.id, {
            attempts: 0,
            fingerprint: options.fingerprint,
            id: options.id,
            name: options.name,
            nextRunMs: options.runAtMs,
            payload: structuredClone(options.payload),
            schedule: options.schedule,
            scheduledTimeMs: options.runAtMs,
            state: "scheduled",
          });
          return { _tag: "Stored" } as const;
        });
      }),

      settle: Effect.fn("MemoryJobs.settle")(function* (options) {
        return yield* Effect.clockWith((clock) => Effect.gen(function* () {
          const now = clock.currentTimeMillisUnsafe();
          const lease = currentLease(options.botId, options.fencingToken, now);
          if (lease instanceof JobLeaseLost) return yield* lease;
          const jobs = botJobs(options.botId);
          const row = jobs.rows.get(options.id);
          if (
            row === undefined ||
            row.state !== "running" ||
            row.fencingToken !== options.fencingToken
          ) {
            return;
          }
          switch (options.outcome._tag) {
            case "Done":
              if (row.schedule._tag === "Repeat") {
                const scheduledTimeMs = nextJobOccurrence(
                  row.scheduledTimeMs,
                  row.schedule.intervalMs,
                  now,
                );
                jobs.rows.set(row.id, {
                  attempts: 0,
                  fingerprint: row.fingerprint,
                  id: row.id,
                  name: row.name,
                  nextRunMs: scheduledTimeMs,
                  payload: row.payload,
                  schedule: row.schedule,
                  scheduledTimeMs,
                  state: "scheduled",
                });
              } else {
                jobs.rows.set(row.id, {
                  attempts: row.attempts,
                  fingerprint: row.fingerprint,
                  id: row.id,
                  name: row.name,
                  payload: row.payload,
                  schedule: row.schedule,
                  scheduledTimeMs: row.scheduledTimeMs,
                  state: "done",
                  terminalTimeMs: now,
                });
              }
              return;
            case "Interrupted":
              jobs.rows.set(row.id, {
                attempts: row.attempts - 1,
                fingerprint: row.fingerprint,
                id: row.id,
                name: row.name,
                nextRunMs: now,
                payload: row.payload,
                schedule: row.schedule,
                scheduledTimeMs: row.scheduledTimeMs,
                state: "scheduled",
              });
              return;
            case "Parked":
              jobs.rows.set(row.id, {
                attempts: row.attempts,
                fingerprint: row.fingerprint,
                id: row.id,
                name: row.name,
                payload: row.payload,
                schedule: row.schedule,
                scheduledTimeMs: row.scheduledTimeMs,
                state: "parked",
                terminalTimeMs: now,
              });
              return;
            case "Retry":
              nonNegativeSafeInteger(options.outcome.delayMs, "delayMs");
              jobs.rows.set(row.id, {
                attempts: row.attempts,
                fingerprint: row.fingerprint,
                id: row.id,
                name: row.name,
                nextRunMs: now + options.outcome.delayMs,
                payload: row.payload,
                schedule: row.schedule,
                scheduledTimeMs: row.scheduledTimeMs,
                state: "scheduled",
              });
          }
        }));
      }),
    });
  },
};

interface RuntimeJobDefinition<out Payload = unknown> {
  readonly encode: (payload: unknown) => Effect.Effect<unknown, InvalidJobPayload>;
  readonly execute: (
    payload: unknown,
    context: JobContext,
  ) => Effect.Effect<unknown, unknown, Bot>;
  readonly Payload?: Payload;
}

export interface JobDefinition<out Payload> {
  readonly [JobDefinitionTypeId]: RuntimeJobDefinition<Payload>;
}

export function job<Payload, Encoded, E>(options: {
  readonly payload: Schema.Codec<Payload, Encoded, never, never>;
  readonly run: (
    payload: Payload,
    context: JobContext,
  ) => Effect.Effect<unknown, E, Bot>;
}): JobDefinition<Payload> {
  const codec = Schema.toCodecJson(options.payload);
  return {
    [JobDefinitionTypeId]: {
      encode: (payload) => Schema.encodeUnknownEffect(codec)(payload).pipe(
        Effect.mapError(() =>
          new InvalidJobPayload({
            description: "Payload does not match its job schema",
            jobName: "unbound",
          })
        ),
      ),
      execute: (payload, context) => Schema.decodeUnknownEffect(codec)(payload).pipe(
        Effect.flatMap((decoded) => options.run(decoded, context)),
      ),
    },
  };
}

type JobDefinitions = Readonly<Record<string, JobDefinition<unknown>>>;
type JobPayload<Definition> = Definition extends JobDefinition<infer Payload> ? Payload : never;

export interface ScheduleJobOptions<Payload> {
  readonly after?: Duration.Input;
  readonly at?: Date;
  readonly every?: Duration.Input;
  readonly id?: string;
  readonly payload: Payload;
}

export interface JobsState {
  readonly definitions: ReadonlyMap<string, RuntimeJobDefinition>;
  readonly options: ResolvedJobOptions;
  readonly store: JobStoreService;
  readonly wake: {
    readonly current: () => number;
    readonly signal: Effect.Effect<void>;
    readonly wait: (version: number) => Effect.Effect<void>;
  };
}

export interface Jobs<Definitions extends JobDefinitions = JobDefinitions> {
  readonly [JobsTypeId]: JobsState;
  readonly cancel: (id: string) => Effect.Effect<boolean, JobStoreError, Bot>;
  readonly schedule: <Name extends Extract<keyof Definitions, string>>(
    name: Name,
    options: ScheduleJobOptions<JobPayload<Definitions[Name]>>,
  ) => Effect.Effect<
    string,
    | InvalidJobPayload
    | InvalidJobSchedule
    | JobCapacityExceeded
    | JobConflict
    | JobStoreError,
    Bot
  >;
}

function makeWake(): JobsState["wake"] {
  let version = 0;
  let changed = Deferred.makeUnsafe<void>();
  return {
    current: () => version,
    signal: Effect.sync(() => {
      version += 1;
      const previous = changed;
      changed = Deferred.makeUnsafe<void>();
      Deferred.doneUnsafe(previous, Effect.void);
    }),
    wait: (observed) => Effect.suspend(() =>
      observed === version ? Deferred.await(changed) : Effect.void
    ),
  };
}

function durationMillis(input: Duration.Input, name: string, allowZero: boolean): number {
  const value = Math.ceil(Duration.toMillis(Duration.fromInputUnsafe(input)));
  if (!Number.isSafeInteger(value) || (allowZero ? value < 0 : value <= 0)) {
    throw new RangeError(`${name} must be a ${allowZero ? "non-negative" : "positive"} duration`);
  }
  return value;
}

function jobName(name: string): void {
  if (!/^[A-Za-z0-9][A-Za-z0-9._:-]{0,127}$/u.test(name)) {
    throw new RangeError(`Invalid job name: ${name}`);
  }
}

function jobId(id: string): void {
  if (id.length === 0 || id.length > 256 || id.includes("\0")) {
    throw new RangeError("Job id must contain 1-256 characters and no null byte");
  }
}

function resolveJobOptions(options: JobOptions = {}): ResolvedJobOptions {
  const resolved = {
    capacity: options.capacity ?? jobDefaults.capacity,
    concurrency: options.concurrency ?? jobDefaults.concurrency,
    doneRetentionMs: options.doneRetentionMs ?? jobDefaults.doneRetentionMs,
    gracePeriodMs: options.gracePeriodMs ?? jobDefaults.gracePeriodMs,
    leaseMs: options.leaseMs ?? jobDefaults.leaseMs,
    maxAttempts: options.maxAttempts ?? jobDefaults.maxAttempts,
    retryBaseMs: options.retryBaseMs ?? jobDefaults.retryBaseMs,
    retryMaxMs: options.retryMaxMs ?? jobDefaults.retryMaxMs,
  };
  positiveInteger(resolved.capacity, "Job capacity");
  positiveInteger(resolved.concurrency, "Job concurrency");
  nonNegativeSafeInteger(resolved.doneRetentionMs, "Job doneRetentionMs");
  nonNegativeSafeInteger(resolved.gracePeriodMs, "Job gracePeriodMs");
  positiveInteger(resolved.leaseMs, "Job leaseMs");
  positiveInteger(resolved.maxAttempts, "Job maxAttempts");
  nonNegativeSafeInteger(resolved.retryBaseMs, "Job retryBaseMs");
  nonNegativeSafeInteger(resolved.retryMaxMs, "Job retryMaxMs");
  return resolved;
}

function normalizeTiming(
  name: string,
  options: Pick<ScheduleJobOptions<unknown>, "after" | "at" | "every">,
  now: number,
) {
  return Effect.try({
    try: () => {
      if (options.at !== undefined && options.after !== undefined) {
        throw new RangeError("A job cannot use both at and after");
      }
      const everyMs = options.every === undefined
        ? undefined
        : durationMillis(options.every, "every", false);
      const afterMs = options.after === undefined
        ? undefined
        : durationMillis(options.after, "after", true);
      const atMs = options.at?.getTime();
      if (atMs !== undefined && (!Number.isSafeInteger(atMs) || atMs < 0)) {
        throw new RangeError("at must be a valid Date on or after 1970-01-01");
      }
      const runAtMs = atMs ?? (afterMs === undefined
        ? now + (everyMs ?? 0)
        : now + afterMs);
      if (!Number.isSafeInteger(runAtMs)) throw new RangeError("Job time exceeds safe integers");
      return { afterMs, atMs, everyMs, runAtMs };
    },
    catch: (error) => new InvalidJobSchedule({
      description: error instanceof Error ? error.message : String(error),
      jobName: name,
    }),
  });
}

export function defineJobs<const Definitions extends JobDefinitions>(
  definitions: Definitions,
  configuration: { readonly options?: JobOptions; readonly store: JobStoreService },
): Jobs<Definitions> {
  const options = resolveJobOptions(configuration.options);
  const entries = Object.entries(definitions);
  const runtimeDefinitions = new Map<string, RuntimeJobDefinition>();
  for (const [name, definition] of entries) {
    jobName(name);
    runtimeDefinitions.set(name, definition[JobDefinitionTypeId]);
  }
  const state: JobsState = {
    definitions: runtimeDefinitions,
    options,
    store: configuration.store,
    wake: makeWake(),
  };

  const cancel: Jobs<Definitions>["cancel"] = Effect.fn("Jobs.cancel")(function* (id) {
    jobId(id);
    const bot = yield* Bot;
    const cancelled = yield* state.store.cancel({ botId: bot.id, id });
    if (cancelled) yield* state.wake.signal;
    return cancelled;
  });

  const schedule: Jobs<Definitions>["schedule"] = Effect.fn("Jobs.schedule")(function* (
    name,
    options,
  ) {
    const definition = state.definitions.get(name);
    if (definition === undefined) return yield* Effect.die(new Error(`Unknown job: ${name}`));
    const bot = yield* Bot;
    const now = yield* Effect.clockWith((clock) => clock.currentTimeMillis);
    const { afterMs, atMs, everyMs, runAtMs } = yield* normalizeTiming(name, options, now);
    const id = options.id ?? (everyMs === undefined ? `${name}:${crypto.randomUUID()}` : name);
    jobId(id);
    const payload = yield* definition.encode(options.payload).pipe(
      Effect.mapError((error) =>
        new InvalidJobPayload({ description: error.description, jobName: name })
      ),
    );
    const scheduleValue: JobSchedule = everyMs === undefined
      ? { _tag: "Once" }
      : { _tag: "Repeat", intervalMs: everyMs };
    // Declared timing stays stable when the same repeating job is registered after a restart.
    const fingerprint = JSON.stringify({
      afterMs: afterMs ?? null,
      atMs: atMs ?? null,
      everyMs: everyMs ?? null,
      name,
      payload,
    });
    const saved = yield* state.store.save({
      botId: bot.id,
      capacity: state.options.capacity,
      fingerprint,
      id,
      name,
      payload,
      runAtMs,
      schedule: scheduleValue,
    });
    if (saved._tag === "Conflict") return yield* new JobConflict({ jobId: id });
    if (saved._tag === "Full") {
      return yield* new JobCapacityExceeded({
        capacity: state.options.capacity,
      });
    }
    if (saved._tag === "Stored") yield* state.wake.signal;
    return id;
  });

  return { [JobsTypeId]: state, cancel, schedule };
}
