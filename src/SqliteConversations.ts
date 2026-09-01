import type { Client } from "@libsql/client";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

import * as Effect from "effect/Effect";

import {
  ConversationStoreError,
  type ConversationRecord,
  type ConversationStoreService,
} from "./ConversationStore.js";
import {
  sqliteInteger,
  sqliteText,
  withDatabaseLock,
  writeTransaction,
} from "./internal/Sqlite.js";

const schema = [
  `CREATE TABLE IF NOT EXISTS telly_conversations_meta (
    singleton INTEGER PRIMARY KEY CHECK (singleton = 1),
    schema_version INTEGER NOT NULL
  )`,
  "INSERT OR IGNORE INTO telly_conversations_meta (singleton, schema_version) VALUES (1, 1)",
  `CREATE TABLE IF NOT EXISTS telly_conversations (
    bot_id INTEGER NOT NULL,
    conversation_scope TEXT NOT NULL,
    conversation_name TEXT NOT NULL,
    step TEXT NOT NULL,
    state TEXT NOT NULL,
    version INTEGER NOT NULL,
    PRIMARY KEY (bot_id, conversation_scope)
  )`,
] as const;

export interface SqliteConversationsOptions {
  readonly timeoutMs?: number;
}

export interface SqliteConversationStore extends ConversationStoreService {
  readonly close: () => void;
}

function description(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

function storeError(operation: string, error: unknown): ConversationStoreError {
  return new ConversationStoreError({ description: description(error), operation });
}

function runStore<A>(operation: string, run: () => Promise<A>) {
  return Effect.tryPromise({
    try: run,
    catch: (error) => storeError(operation, error),
  });
}

async function makeStore(
  client: Client,
  databaseKey: string,
): Promise<SqliteConversationStore> {
  await withDatabaseLock(databaseKey, async () => {
    await client.execute("PRAGMA journal_mode = WAL");
    await client.execute("PRAGMA synchronous = FULL");
    await writeTransaction(client, async (transaction) => {
      for (const statement of schema) await transaction.execute(statement);
    });
    const version = await client.execute(
      "SELECT schema_version FROM telly_conversations_meta WHERE singleton = 1",
    );
    if (sqliteInteger(version.rows[0]?.["schema_version"], "schema_version") !== 1) {
      throw new Error("Unsupported Telly conversations schema version");
    }
  });
  const write = <A>(run: (transaction: Client) => Promise<A>) =>
    withDatabaseLock(databaseKey, () => writeTransaction(client, run));

  return {
    commit: (options) => runStore("commit", () => write(async (transaction) => {
      const selected = await transaction.execute({
        sql: `SELECT version FROM telly_conversations
          WHERE bot_id = ? AND conversation_scope = ?`,
        args: [options.botId, options.scope],
      });
      const row = selected.rows[0];
      const currentVersion = row === undefined
        ? undefined
        : sqliteInteger(row["version"], "version");
      if (
        typeof options.expected === "number" && currentVersion !== options.expected
      ) {
        return "Conflict" as const;
      }
      if (options.next === undefined) {
        await transaction.execute({
          sql: "DELETE FROM telly_conversations WHERE bot_id = ? AND conversation_scope = ?",
          args: [options.botId, options.scope],
        });
      } else {
        const state = JSON.stringify(options.next.state);
        if (state === undefined) {
          throw new TypeError("Conversation state must be JSON-serializable");
        }
        await transaction.execute({
          sql: `INSERT INTO telly_conversations
            (bot_id, conversation_scope, conversation_name, step, state, version)
            VALUES (?, ?, ?, ?, ?, ?)
            ON CONFLICT(bot_id, conversation_scope) DO UPDATE SET
              conversation_name = excluded.conversation_name,
              step = excluded.step,
              state = excluded.state,
              version = excluded.version`,
          args: [
            options.botId,
            options.scope,
            options.next.conversation,
            options.next.step,
            state,
            (currentVersion ?? 0) + 1,
          ],
        });
      }
      return "Committed" as const;
    })),

    load: (options) => runStore("load", () =>
      withDatabaseLock(databaseKey, async () => {
        const result = await client.execute({
          sql: `SELECT conversation_name, step, state, version
            FROM telly_conversations WHERE bot_id = ? AND conversation_scope = ?`,
          args: [options.botId, options.scope],
        });
        const row = result.rows[0];
        if (row === undefined) return undefined;
        const record: ConversationRecord = {
          conversation: sqliteText(row["conversation_name"], "conversation_name"),
          state: JSON.parse(sqliteText(row["state"], "state")),
          step: sqliteText(row["step"], "step"),
          version: sqliteInteger(row["version"], "version"),
        };
        return record;
      })
    ),

    close: () => client.close(),
  };
}

export const SqliteConversations = {
  async open(
    path: string,
    options: SqliteConversationsOptions = {},
  ): Promise<SqliteConversationStore> {
    if (path === ":memory:") {
      throw new RangeError("Use MemoryConversations for process-memory storage");
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
