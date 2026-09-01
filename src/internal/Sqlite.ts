import type { Client, Value } from "@libsql/client";

export const sqliteNow = "CAST(unixepoch('subsec') * 1000 AS INTEGER)";

const databaseLocks = new Map<string, Promise<void>>();

export async function writeTransaction<A>(
  client: Client,
  run: (transaction: Client) => Promise<A>,
): Promise<A> {
  await client.execute("BEGIN IMMEDIATE");
  try {
    const result = await run(client);
    await client.execute("COMMIT");
    return result;
  } catch (error) {
    try {
      await client.execute("ROLLBACK");
    } catch (rollbackError) {
      throw new AggregateError([error, rollbackError], "SQLite transaction rollback failed");
    }
    throw error;
  }
}

export async function withDatabaseLock<A>(
  key: string,
  run: () => Promise<A>,
): Promise<A> {
  const previous = databaseLocks.get(key) ?? Promise.resolve();
  let unlock: () => void = () => {};
  const current = new Promise<void>((resolve) => {
    unlock = resolve;
  });
  databaseLocks.set(key, current);
  await previous;
  try {
    return await run();
  } finally {
    unlock();
    if (databaseLocks.get(key) === current) databaseLocks.delete(key);
  }
}

export function sqliteInteger(value: Value | undefined, name: string): number {
  const number = typeof value === "bigint" ? Number(value) : value;
  if (typeof number !== "number" || !Number.isSafeInteger(number)) {
    throw new TypeError(`${name} must be a safe integer`);
  }
  return number;
}

export function sqliteText(value: Value | undefined, name: string): string {
  if (typeof value !== "string") throw new TypeError(`${name} must be text`);
  return value;
}

export async function sqliteCurrentTime(transaction: Client): Promise<number> {
  const result = await transaction.execute(`SELECT ${sqliteNow} AS now_ms`);
  return sqliteInteger(result.rows[0]?.["now_ms"], "now_ms");
}
