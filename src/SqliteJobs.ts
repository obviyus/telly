import type { Client } from "@libsql/client";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

import * as Effect from "effect/Effect";

import {
  JobLeaseLost,
  JobStoreError,
  type ClaimedJob,
  type JobSettlement,
  type JobStoreService,
} from "./Jobs.js";
import { nextJobOccurrence } from "./internal/JobSchedule.js";
import {
  sqliteCurrentTime,
  sqliteInteger,
  sqliteText,
  withDatabaseLock,
  writeTransaction,
} from "./internal/Sqlite.js";

const schema = [
  `CREATE TABLE IF NOT EXISTS telly_jobs_meta (
    singleton INTEGER PRIMARY KEY CHECK (singleton = 1),
    schema_version INTEGER NOT NULL
  )`,
  "INSERT OR IGNORE INTO telly_jobs_meta (singleton, schema_version) VALUES (1, 1)",
  `CREATE TABLE IF NOT EXISTS telly_job_leases (
    bot_id INTEGER PRIMARY KEY,
    fencing_token INTEGER NOT NULL,
    expires_at_ms INTEGER NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS telly_jobs (
    bot_id INTEGER NOT NULL,
    job_id TEXT NOT NULL,
    name TEXT NOT NULL,
    payload TEXT NOT NULL,
    fingerprint TEXT NOT NULL,
    schedule_kind TEXT NOT NULL CHECK (schedule_kind IN ('once', 'repeat')),
    interval_ms INTEGER,
    scheduled_time_ms INTEGER NOT NULL,
    next_run_ms INTEGER NOT NULL,
    attempts INTEGER NOT NULL DEFAULT 0,
    state TEXT NOT NULL CHECK (state IN ('scheduled', 'running', 'done', 'parked')),
    running_token INTEGER,
    terminal_time_ms INTEGER,
    parked_reason TEXT,
    PRIMARY KEY (bot_id, job_id),
    CHECK ((schedule_kind = 'once' AND interval_ms IS NULL)
      OR (schedule_kind = 'repeat' AND interval_ms > 0))
  )`,
  `CREATE INDEX IF NOT EXISTS telly_jobs_ready
    ON telly_jobs (bot_id, state, next_run_ms, job_id)`,
] as const;

export interface SqliteJobsOptions {
  readonly timeoutMs?: number;
}

export interface SqliteJobStore extends JobStoreService {
  readonly close: () => void;
}

function description(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

function storeError(operation: string, error: unknown): JobStoreError {
  return new JobStoreError({ description: description(error), operation });
}

function runStore<A>(operation: string, run: () => Promise<A>) {
  return Effect.tryPromise({
    try: run,
    catch: (error) => storeError(operation, error),
  });
}

function runFenced<A>(operation: string, run: () => Promise<A>) {
  return Effect.tryPromise({
    try: run,
    catch: (error) => error instanceof JobLeaseLost ? error : storeError(operation, error),
  });
}

async function requireLease(
  transaction: Client,
  botId: number,
  fencingToken: number,
  now: number,
) {
  const result = await transaction.execute({
    sql: `SELECT fencing_token, expires_at_ms
      FROM telly_job_leases WHERE bot_id = ?`,
    args: [botId],
  });
  const row = result.rows[0];
  if (
    row === undefined ||
    sqliteInteger(row["fencing_token"], "fencing_token") !== fencingToken ||
    sqliteInteger(row["expires_at_ms"], "expires_at_ms") <= now
  ) {
    throw new JobLeaseLost({ botId });
  }
}

function settlementUpdate(
  outcome: JobSettlement,
  row: { readonly attempts: number; readonly intervalMs?: number; readonly scheduledTimeMs: number },
  now: number,
) {
  switch (outcome._tag) {
    case "Done":
      if (row.intervalMs !== undefined) {
        const scheduledTimeMs = nextJobOccurrence(row.scheduledTimeMs, row.intervalMs, now);
        return {
          args: [scheduledTimeMs, scheduledTimeMs],
          sql: `state = 'scheduled', attempts = 0, scheduled_time_ms = ?, next_run_ms = ?,
            running_token = NULL, terminal_time_ms = NULL, parked_reason = NULL`,
        };
      }
      return {
        args: [now],
        sql: `state = 'done', terminal_time_ms = ?, running_token = NULL,
          parked_reason = NULL`,
      };
    case "Interrupted":
      return {
        args: [now],
        sql: `state = 'scheduled', attempts = MAX(0, attempts - 1), next_run_ms = ?,
          running_token = NULL, terminal_time_ms = NULL, parked_reason = NULL`,
      };
    case "Parked":
      return {
        args: [now, outcome.reason],
        sql: `state = 'parked', terminal_time_ms = ?, parked_reason = ?,
          running_token = NULL`,
      };
    case "Retry":
      return {
        args: [now + outcome.delayMs],
        sql: `state = 'scheduled', next_run_ms = ?, running_token = NULL,
          terminal_time_ms = NULL, parked_reason = NULL`,
      };
  }
}

async function makeStore(client: Client, databaseKey: string): Promise<SqliteJobStore> {
  await withDatabaseLock(databaseKey, async () => {
    await client.execute("PRAGMA journal_mode = WAL");
    await client.execute("PRAGMA synchronous = FULL");
    await writeTransaction(client, async (transaction) => {
      for (const statement of schema) await transaction.execute(statement);
    });
    const version = await client.execute(
      "SELECT schema_version FROM telly_jobs_meta WHERE singleton = 1",
    );
    if (sqliteInteger(version.rows[0]?.["schema_version"], "schema_version") !== 1) {
      throw new Error("Unsupported Telly jobs schema version");
    }
  });
  const write = <A>(run: (transaction: Client) => Promise<A>) =>
    withDatabaseLock(databaseKey, () => writeTransaction(client, run));

  return {
    acquire: (options) => runStore("acquire", () => write(async (transaction) => {
      const now = await sqliteCurrentTime(transaction);
      const current = await transaction.execute({
        sql: "SELECT fencing_token, expires_at_ms FROM telly_job_leases WHERE bot_id = ?",
        args: [options.botId],
      });
      const row = current.rows[0];
      if (row !== undefined && sqliteInteger(row["expires_at_ms"], "expires_at_ms") > now) {
        return { _tag: "Held" } as const;
      }
      const fencingToken = (row === undefined
        ? 0
        : sqliteInteger(row["fencing_token"], "fencing_token")) + 1;
      await transaction.execute({
        sql: `INSERT INTO telly_job_leases (bot_id, fencing_token, expires_at_ms)
          VALUES (?, ?, ?)
          ON CONFLICT(bot_id) DO UPDATE SET
            fencing_token = excluded.fencing_token,
            expires_at_ms = excluded.expires_at_ms`,
        args: [options.botId, fencingToken, now + options.leaseMs],
      });
      return { _tag: "Acquired", fencingToken } as const;
    })),

    cancel: (options) => runStore("cancel", () => write(async (transaction) => {
      const result = await transaction.execute({
        sql: "DELETE FROM telly_jobs WHERE bot_id = ? AND job_id = ?",
        args: [options.botId, options.id],
      });
      return result.rowsAffected > 0;
    })),

    claim: (options) => runFenced("claim", () => write(async (transaction) => {
      const now = await sqliteCurrentTime(transaction);
      await requireLease(transaction, options.botId, options.fencingToken, now);
      const result = await transaction.execute({
        sql: `SELECT job_id, name, payload, attempts, scheduled_time_ms
          FROM telly_jobs
          WHERE bot_id = ?
            AND ((state = 'scheduled' AND next_run_ms <= ?)
              OR (state = 'running' AND running_token <> ?))
          ORDER BY next_run_ms, job_id
          LIMIT ?`,
        args: [options.botId, now, options.fencingToken, options.limit],
      });
      const claimed: Array<ClaimedJob> = [];
      for (const row of result.rows) {
        const id = sqliteText(row["job_id"], "job_id");
        const attempts = sqliteInteger(row["attempts"], "attempts") + 1;
        await transaction.execute({
          sql: `UPDATE telly_jobs
            SET state = 'running', running_token = ?, attempts = ?
            WHERE bot_id = ? AND job_id = ?`,
          args: [options.fencingToken, attempts, options.botId, id],
        });
        claimed.push({
          attempts,
          id,
          name: sqliteText(row["name"], "name"),
          payload: JSON.parse(sqliteText(row["payload"], "payload")),
          scheduledTimeMs: sqliteInteger(row["scheduled_time_ms"], "scheduled_time_ms"),
        });
      }
      return claimed;
    })),

    prune: (options) => runStore("prune", () => write(async (transaction) => {
      const now = await sqliteCurrentTime(transaction);
      await transaction.execute({
        sql: `DELETE FROM telly_jobs
          WHERE bot_id = ? AND state = 'done' AND terminal_time_ms <= ?`,
        args: [options.botId, now - options.doneAgeMs],
      });
    })),

    release: (options) => runStore("release", () => write(async (transaction) => {
      await transaction.execute({
        sql: `UPDATE telly_job_leases SET expires_at_ms = 0
          WHERE bot_id = ? AND fencing_token = ?`,
        args: [options.botId, options.fencingToken],
      });
    })),

    renew: (options) => runFenced("renew", () => write(async (transaction) => {
      const now = await sqliteCurrentTime(transaction);
      await requireLease(transaction, options.botId, options.fencingToken, now);
      await transaction.execute({
        sql: `UPDATE telly_job_leases SET expires_at_ms = ?
          WHERE bot_id = ? AND fencing_token = ?`,
        args: [now + options.leaseMs, options.botId, options.fencingToken],
      });
    })),

    save: (options) => runStore("save", () => write(async (transaction) => {
      const existing = await transaction.execute({
        sql: "SELECT fingerprint FROM telly_jobs WHERE bot_id = ? AND job_id = ?",
        args: [options.botId, options.id],
      });
      const row = existing.rows[0];
      if (row !== undefined) {
        return sqliteText(row["fingerprint"], "fingerprint") === options.fingerprint
          ? { _tag: "Existing" } as const
          : { _tag: "Conflict" } as const;
      }
      const depth = await transaction.execute({
        sql: `SELECT COUNT(*) AS depth FROM telly_jobs
          WHERE bot_id = ? AND state IN ('scheduled', 'running')`,
        args: [options.botId],
      });
      if (sqliteInteger(depth.rows[0]?.["depth"], "depth") >= options.capacity) {
        return { _tag: "Full" } as const;
      }
      const payload = JSON.stringify(options.payload);
      if (payload === undefined) throw new TypeError("Job payload must be JSON-serializable");
      await transaction.execute({
        sql: `INSERT INTO telly_jobs
          (bot_id, job_id, name, payload, fingerprint, schedule_kind, interval_ms,
            scheduled_time_ms, next_run_ms, state)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'scheduled')`,
        args: [
          options.botId,
          options.id,
          options.name,
          payload,
          options.fingerprint,
          options.schedule._tag === "Once" ? "once" : "repeat",
          options.schedule._tag === "Once" ? null : options.schedule.intervalMs,
          options.runAtMs,
          options.runAtMs,
        ],
      });
      return { _tag: "Stored" } as const;
    })),

    settle: (options) => runFenced("settle", () => write(async (transaction) => {
      const now = await sqliteCurrentTime(transaction);
      await requireLease(transaction, options.botId, options.fencingToken, now);
      const selected = await transaction.execute({
        sql: `SELECT attempts, interval_ms, scheduled_time_ms
          FROM telly_jobs
          WHERE bot_id = ? AND job_id = ? AND state = 'running' AND running_token = ?`,
        args: [options.botId, options.id, options.fencingToken],
      });
      const row = selected.rows[0];
      if (row === undefined) return;
      const intervalValue = row["interval_ms"];
      const intervalMs = intervalValue === null
        ? undefined
        : sqliteInteger(intervalValue, "interval_ms");
      const update = settlementUpdate(options.outcome, {
        attempts: sqliteInteger(row["attempts"], "attempts"),
        ...(intervalMs === undefined ? {} : { intervalMs }),
        scheduledTimeMs: sqliteInteger(row["scheduled_time_ms"], "scheduled_time_ms"),
      }, now);
      await transaction.execute({
        sql: `UPDATE telly_jobs SET ${update.sql}
          WHERE bot_id = ? AND job_id = ? AND state = 'running' AND running_token = ?`,
        args: [...update.args, options.botId, options.id, options.fencingToken],
      });
    })),

    close: () => client.close(),
  };
}

export const SqliteJobs = {
  async open(path: string, options: SqliteJobsOptions = {}): Promise<SqliteJobStore> {
    if (path === ":memory:") throw new RangeError("Use MemoryJobs for process-memory storage");
    const url = pathToFileURL(resolve(path)).href;
    const { createClient } = await import("@libsql/client");
    const client = createClient({
      intMode: "number",
      timeout: options.timeoutMs ?? 5_000,
      url,
    });
    try {
      return await makeStore(client, url);
    } catch (error) {
      client.close();
      throw error;
    }
  },
};
