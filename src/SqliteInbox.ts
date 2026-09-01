import type { Client } from "@libsql/client";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

import { Effect } from "effect";

import {
  DispatchLeaseLost,
  InboxStoreError,
  type ClaimedUpdate,
  type InboxSettlement,
  type InboxStoreService,
} from "./Inbox.js";
import {
  sqliteCurrentTime,
  sqliteInteger,
  sqliteText,
  withDatabaseLock,
  writeTransaction,
} from "./internal/Sqlite.js";

const schema = [
  `CREATE TABLE IF NOT EXISTS telly_inbox_meta (
    singleton INTEGER PRIMARY KEY CHECK (singleton = 1),
    schema_version INTEGER NOT NULL
  )`,
  "INSERT OR IGNORE INTO telly_inbox_meta (singleton, schema_version) VALUES (1, 1)",
  `CREATE TABLE IF NOT EXISTS telly_inbox_leases (
    bot_id INTEGER PRIMARY KEY,
    fencing_token INTEGER NOT NULL,
    expires_at_ms INTEGER NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS telly_inbox_updates (
    bot_id INTEGER NOT NULL,
    update_id INTEGER NOT NULL,
    conversation_key TEXT NOT NULL,
    payload TEXT NOT NULL,
    attempts INTEGER NOT NULL DEFAULT 0,
    state TEXT NOT NULL CHECK (state IN ('pending', 'running', 'done', 'parked')),
    not_before_ms INTEGER NOT NULL DEFAULT 0,
    running_token INTEGER,
    terminal_time_ms INTEGER,
    parked_reason TEXT,
    PRIMARY KEY (bot_id, update_id)
  )`,
  `CREATE INDEX IF NOT EXISTS telly_inbox_ready
    ON telly_inbox_updates (bot_id, state, not_before_ms, update_id)`,
  `CREATE INDEX IF NOT EXISTS telly_inbox_conversation
    ON telly_inbox_updates (bot_id, conversation_key, update_id)`,
] as const;

export interface SqliteInboxOptions {
  readonly timeoutMs?: number;
}

export interface SqliteInboxStore extends InboxStoreService {
  readonly close: () => void;
}

function description(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

function storeError(operation: string, error: unknown): InboxStoreError {
  return new InboxStoreError({ description: description(error), operation });
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
    catch: (error) => error instanceof DispatchLeaseLost
      ? error
      : storeError(operation, error),
  });
}

async function requireLease(
  tx: Client,
  botId: number,
  fencingToken: number,
  now: number,
) {
  const result = await tx.execute({
    sql: `SELECT fencing_token, expires_at_ms
      FROM telly_inbox_leases WHERE bot_id = ?`,
    args: [botId],
  });
  const row = result.rows[0];
  if (
    row === undefined ||
    sqliteInteger(row["fencing_token"], "fencing_token") !== fencingToken ||
    sqliteInteger(row["expires_at_ms"], "expires_at_ms") <= now
  ) {
    throw new DispatchLeaseLost({ botId });
  }
}

function settlementUpdate(outcome: InboxSettlement, now: number) {
  switch (outcome._tag) {
    case "Done":
      return {
        args: [now],
        sql: `state = 'done', terminal_time_ms = ?, running_token = NULL,
          not_before_ms = 0, parked_reason = NULL`,
      };
    case "Parked":
      return {
        args: [now, outcome.reason],
        sql: `state = 'parked', terminal_time_ms = ?, parked_reason = ?,
          running_token = NULL, not_before_ms = 0`,
      };
    case "Retry":
      return {
        args: [now + outcome.delayMs],
        sql: `state = 'pending', not_before_ms = ?, running_token = NULL,
          terminal_time_ms = NULL, parked_reason = NULL`,
      };
    case "Interrupted":
      return {
        args: [now],
        sql: `state = 'pending', attempts = MAX(0, attempts - 1), not_before_ms = ?,
          running_token = NULL, terminal_time_ms = NULL, parked_reason = NULL`,
      };
  }
}

async function makeStore(client: Client, databaseKey: string): Promise<SqliteInboxStore> {
  await withDatabaseLock(databaseKey, async () => {
    await client.execute("PRAGMA journal_mode = WAL");
    await client.execute("PRAGMA synchronous = FULL");
    await writeTransaction(client, async (tx) => {
      for (const statement of schema) await tx.execute(statement);
    });
    const version = await client.execute(
      "SELECT schema_version FROM telly_inbox_meta WHERE singleton = 1",
    );
    if (sqliteInteger(version.rows[0]?.["schema_version"], "schema_version") !== 1) {
      throw new Error("Unsupported Telly inbox schema version");
    }
  });
  const write = <A>(run: (tx: Client) => Promise<A>) =>
    withDatabaseLock(databaseKey, () => writeTransaction(client, run));

  return {
    acquire: (options) => runStore("acquire", () => write(async (tx) => {
      const now = await sqliteCurrentTime(tx);
      const current = await tx.execute({
        sql: "SELECT fencing_token, expires_at_ms FROM telly_inbox_leases WHERE bot_id = ?",
        args: [options.botId],
      });
      const row = current.rows[0];
      if (row !== undefined && sqliteInteger(row["expires_at_ms"], "expires_at_ms") > now) {
        return { _tag: "Held" } as const;
      }
      const fencingToken = (row === undefined
        ? 0
        : sqliteInteger(row["fencing_token"], "fencing_token")) + 1;
      await tx.execute({
        sql: `INSERT INTO telly_inbox_leases (bot_id, fencing_token, expires_at_ms)
          VALUES (?, ?, ?)
          ON CONFLICT(bot_id) DO UPDATE SET
            fencing_token = excluded.fencing_token,
            expires_at_ms = excluded.expires_at_ms`,
        args: [options.botId, fencingToken, now + options.leaseMs],
      });
      return { _tag: "Acquired", fencingToken } as const;
    })),

    claim: (options) => runFenced("claim", () => write(async (tx) => {
      const now = await sqliteCurrentTime(tx);
      await requireLease(tx, options.botId, options.fencingToken, now);
      const result = await tx.execute({
        sql: `SELECT u.update_id, u.conversation_key, u.payload, u.attempts
          FROM telly_inbox_updates AS u
          WHERE u.bot_id = ?
            AND u.state IN ('pending', 'running')
            AND NOT EXISTS (
              SELECT 1 FROM telly_inbox_updates AS earlier
              WHERE earlier.bot_id = u.bot_id
                AND earlier.conversation_key = u.conversation_key
                AND earlier.state IN ('pending', 'running')
                AND earlier.update_id < u.update_id
            )
            AND ((u.state = 'pending' AND u.not_before_ms <= ?)
              OR (u.state = 'running' AND u.running_token <> ?))
          ORDER BY u.update_id
          LIMIT ?`,
        args: [options.botId, now, options.fencingToken, options.limit],
      });
      const claimed: Array<ClaimedUpdate> = [];
      for (const row of result.rows) {
        const updateId = sqliteInteger(row["update_id"], "update_id");
        const attempts = sqliteInteger(row["attempts"], "attempts") + 1;
        await tx.execute({
          sql: `UPDATE telly_inbox_updates
            SET state = 'running', running_token = ?, attempts = ?
            WHERE bot_id = ? AND update_id = ?`,
          args: [options.fencingToken, attempts, options.botId, updateId],
        });
        claimed.push({
          attempts,
          conversationKey: sqliteText(row["conversation_key"], "conversation_key"),
          payload: JSON.parse(sqliteText(row["payload"], "payload")),
          updateId,
        });
      }
      return claimed;
    })),

    prune: (options) => runStore("prune", () => write(async (tx) => {
      const now = await sqliteCurrentTime(tx);
      await tx.execute({
        sql: `DELETE FROM telly_inbox_updates
          WHERE bot_id = ? AND state = 'done' AND terminal_time_ms <= ?`,
        args: [options.botId, now - options.doneAgeMs],
      });
    })),

    release: (options) => runStore("release", () => write(async (tx) => {
      await tx.execute({
        sql: `UPDATE telly_inbox_leases SET expires_at_ms = 0
          WHERE bot_id = ? AND fencing_token = ?`,
        args: [options.botId, options.fencingToken],
      });
    })),

    renew: (options) => runFenced("renew", () => write(async (tx) => {
      const now = await sqliteCurrentTime(tx);
      await requireLease(tx, options.botId, options.fencingToken, now);
      await tx.execute({
        sql: `UPDATE telly_inbox_leases SET expires_at_ms = ?
          WHERE bot_id = ? AND fencing_token = ?`,
        args: [now + options.leaseMs, options.botId, options.fencingToken],
      });
    })),

    save: (options) => runStore("save", () => write(async (tx) => {
      const duplicate = await tx.execute({
        sql: "SELECT 1 FROM telly_inbox_updates WHERE bot_id = ? AND update_id = ?",
        args: [options.botId, options.updateId],
      });
      if (duplicate.rows.length > 0) return { _tag: "Duplicate" } as const;
      const depth = await tx.execute({
        sql: `SELECT COUNT(*) AS depth FROM telly_inbox_updates
          WHERE bot_id = ? AND state IN ('pending', 'running')`,
        args: [options.botId],
      });
      if (sqliteInteger(depth.rows[0]?.["depth"], "depth") >= options.capacity) {
        return { _tag: "Full" } as const;
      }
      const payload = JSON.stringify(options.payload);
      if (payload === undefined) throw new TypeError("Inbox payload must be JSON-serializable");
      await tx.execute({
        sql: `INSERT INTO telly_inbox_updates
          (bot_id, update_id, conversation_key, payload, state)
          VALUES (?, ?, ?, ?, 'pending')`,
        args: [options.botId, options.updateId, options.conversationKey, payload],
      });
      return { _tag: "Stored" } as const;
    })),

    settle: (options) => runFenced("settle", () => write(async (tx) => {
      const now = await sqliteCurrentTime(tx);
      await requireLease(tx, options.botId, options.fencingToken, now);
      const update = settlementUpdate(options.outcome, now);
      await tx.execute({
        sql: `UPDATE telly_inbox_updates SET ${update.sql}
          WHERE bot_id = ? AND update_id = ? AND state = 'running' AND running_token = ?`,
        args: [...update.args, options.botId, options.updateId, options.fencingToken],
      });
    })),

    close: () => client.close(),
  };
}

export const SqliteInbox = {
  async open(path: string, options: SqliteInboxOptions = {}): Promise<SqliteInboxStore> {
    if (path === ":memory:") {
      throw new RangeError("Use MemoryInbox for process-memory storage");
    }
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
