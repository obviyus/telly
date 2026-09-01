import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Schema from "effect/Schema";

import type { Update } from "./types.generated.js";

export interface InboxOptions {
  readonly capacity?: number;
  readonly concurrency?: number;
  readonly conversationKey?: (update: Update) => number | string;
  readonly doneRetentionMs?: number;
  readonly gracePeriodMs?: number;
  readonly leaseMs?: number;
  readonly maxAttempts?: number;
  readonly retryBaseMs?: number;
  readonly retryMaxMs?: number;
}

export class InboxStoreError extends Schema.TaggedError<InboxStoreError>()(
  "InboxStoreError",
  {
    description: Schema.String,
    operation: Schema.String,
  },
) {}

export class InboxLeaseLost extends Schema.TaggedError<InboxLeaseLost>()(
  "InboxLeaseLost",
  { botId: Schema.Int },
) {}

export type InboxSaveResult =
  | { readonly _tag: "Duplicate" }
  | { readonly _tag: "Full" }
  | { readonly _tag: "Stored" };

export type InboxLeaseResult =
  | { readonly _tag: "Acquired"; readonly fencingToken: number }
  | { readonly _tag: "Held" };

export interface ClaimedUpdate {
  readonly attempts: number;
  readonly conversationKey: string;
  readonly payload: unknown;
  readonly updateId: number;
}

export type InboxSettlement =
  | { readonly _tag: "Done" }
  | { readonly _tag: "Interrupted" }
  | { readonly _tag: "Parked"; readonly reason: string }
  | { readonly _tag: "Retry"; readonly delayMs: number };

export interface SaveInboxUpdate {
  readonly botId: number;
  readonly capacity: number;
  readonly conversationKey: string;
  readonly payload: unknown;
  readonly updateId: number;
}

export interface InboxLeaseOptions {
  readonly botId: number;
  readonly leaseMs: number;
}

export interface FencedInboxOperation {
  readonly botId: number;
  readonly fencingToken: number;
}

export interface ClaimInboxUpdates extends FencedInboxOperation {
  readonly limit: number;
}

export interface SettleInboxUpdate extends FencedInboxOperation {
  readonly outcome: InboxSettlement;
  readonly updateId: number;
}

export interface PruneInboxUpdates {
  readonly botId: number;
  readonly doneAgeMs: number;
}

export interface InboxStoreService {
  readonly acquire: (
    options: InboxLeaseOptions,
  ) => Effect.Effect<InboxLeaseResult, InboxStoreError>;
  readonly claim: (
    options: ClaimInboxUpdates,
  ) => Effect.Effect<ReadonlyArray<ClaimedUpdate>, InboxStoreError | InboxLeaseLost>;
  readonly prune: (
    options: PruneInboxUpdates,
  ) => Effect.Effect<void, InboxStoreError>;
  readonly release: (
    options: FencedInboxOperation,
  ) => Effect.Effect<void, InboxStoreError>;
  readonly renew: (
    options: FencedInboxOperation & { readonly leaseMs: number },
  ) => Effect.Effect<void, InboxStoreError | InboxLeaseLost>;
  readonly save: (
    options: SaveInboxUpdate,
  ) => Effect.Effect<InboxSaveResult, InboxStoreError>;
  readonly settle: (
    options: SettleInboxUpdate,
  ) => Effect.Effect<void, InboxStoreError | InboxLeaseLost>;
}

export class InboxStore extends Context.Service<InboxStore, InboxStoreService>()(
  "telly/InboxStore",
) {}

type PendingRow = {
  attempts: number;
  readonly conversationKey: string;
  notBeforeMs: number;
  readonly payload: unknown;
  state: "pending";
  readonly updateId: number;
};

type RunningRow = {
  attempts: number;
  readonly conversationKey: string;
  readonly fencingToken: number;
  readonly payload: unknown;
  state: "running";
  readonly updateId: number;
};

type TerminalRow = {
  readonly attempts: number;
  readonly conversationKey: string;
  readonly payload: unknown;
  readonly state: "done" | "parked";
  readonly terminalTimeMs: number;
  readonly updateId: number;
};

type InboxRow = PendingRow | RunningRow | TerminalRow;

interface BotInbox {
  lease?: { readonly expiresAtMs: number; readonly fencingToken: number };
  nextFencingToken: number;
  readonly rows: Map<number, InboxRow>;
}

function positiveInteger(value: number, name: string): void {
  if (!Number.isSafeInteger(value) || value < 1) {
    throw new RangeError(`${name} must be a positive safe integer`);
  }
}

function nonNegativeNumber(value: number, name: string): void {
  if (!Number.isFinite(value) || value < 0) {
    throw new RangeError(`${name} must be a non-negative number`);
  }
}

/** Process-memory inbox for development and adapter tests. It is not durable. */
export const MemoryInbox = {
  layer(): Layer.Layer<InboxStore> {
    return Layer.succeed(InboxStore, MemoryInbox.make());
  },

  make(): InboxStoreService {
    const bots = new Map<number, BotInbox>();
    const botInbox = (botId: number) => {
      let inbox = bots.get(botId);
      if (inbox === undefined) {
        inbox = { nextFencingToken: 0, rows: new Map() };
        bots.set(botId, inbox);
      }
      return inbox;
    };
    const currentLease = (botId: number, fencingToken: number, now: number) => {
      const lease = botInbox(botId).lease;
      if (
        lease === undefined ||
        lease.fencingToken !== fencingToken ||
        lease.expiresAtMs <= now
      ) {
        return new InboxLeaseLost({ botId });
      }
      return lease;
    };

    return InboxStore.of({
      acquire: Effect.fn("MemoryInbox.acquire")(function* (options) {
        positiveInteger(options.botId, "botId");
        positiveInteger(options.leaseMs, "leaseMs");
        return yield* Effect.clockWith((clock) => Effect.sync(() => {
          const now = clock.currentTimeMillisUnsafe();
          const inbox = botInbox(options.botId);
          if (inbox.lease !== undefined && inbox.lease.expiresAtMs > now) {
            return { _tag: "Held" } as const;
          }
          inbox.nextFencingToken += 1;
          inbox.lease = {
            expiresAtMs: now + options.leaseMs,
            fencingToken: inbox.nextFencingToken,
          };
          return { _tag: "Acquired", fencingToken: inbox.nextFencingToken } as const;
        }));
      }),

      claim: Effect.fn("MemoryInbox.claim")(function* (options) {
        positiveInteger(options.limit, "limit");
        return yield* Effect.clockWith((clock) => Effect.gen(function* () {
          const now = clock.currentTimeMillisUnsafe();
          const lease = currentLease(options.botId, options.fencingToken, now);
          if (lease instanceof InboxLeaseLost) return yield* lease;
          return yield* Effect.sync(() => {
            const inbox = botInbox(options.botId);
            const heads = new Map<string, InboxRow>();
            for (const row of inbox.rows.values()) {
              if (row.state === "done" || row.state === "parked") continue;
              const head = heads.get(row.conversationKey);
              if (head === undefined || row.updateId < head.updateId) {
                heads.set(row.conversationKey, row);
              }
            }
            const claimed: Array<ClaimedUpdate> = [];
            for (const row of [...heads.values()].sort((left, right) =>
              left.updateId - right.updateId
            )) {
              if (claimed.length >= options.limit) break;
              if (row.state === "running" && row.fencingToken === options.fencingToken) continue;
              if (row.state === "pending" && row.notBeforeMs > now) continue;
              const running: RunningRow = {
                attempts: row.attempts + 1,
                conversationKey: row.conversationKey,
                fencingToken: options.fencingToken,
                payload: row.payload,
                state: "running",
                updateId: row.updateId,
              };
              inbox.rows.set(row.updateId, running);
              claimed.push({
                attempts: running.attempts,
                conversationKey: running.conversationKey,
                payload: structuredClone(running.payload),
                updateId: running.updateId,
              });
            }
            return claimed;
          });
        }));
      }),

      prune: Effect.fn("MemoryInbox.prune")(function* (options) {
        nonNegativeNumber(options.doneAgeMs, "doneAgeMs");
        yield* Effect.clockWith((clock) => Effect.sync(() => {
          const cutoff = clock.currentTimeMillisUnsafe() - options.doneAgeMs;
          const inbox = botInbox(options.botId);
          for (const [updateId, row] of inbox.rows) {
            if (row.state === "done" && row.terminalTimeMs <= cutoff) {
              inbox.rows.delete(updateId);
            }
          }
        }));
      }),

      release: Effect.fn("MemoryInbox.release")(function* (options) {
        yield* Effect.sync(() => {
          const inbox = botInbox(options.botId);
          if (inbox.lease?.fencingToken === options.fencingToken) {
            delete inbox.lease;
          }
        });
      }),

      renew: Effect.fn("MemoryInbox.renew")(function* (options) {
        positiveInteger(options.leaseMs, "leaseMs");
        yield* Effect.clockWith((clock) => Effect.gen(function* () {
          const now = clock.currentTimeMillisUnsafe();
          const lease = currentLease(options.botId, options.fencingToken, now);
          if (lease instanceof InboxLeaseLost) return yield* lease;
          botInbox(options.botId).lease = {
            expiresAtMs: now + options.leaseMs,
            fencingToken: options.fencingToken,
          };
        }));
      }),

      save: Effect.fn("MemoryInbox.save")(function* (options) {
        positiveInteger(options.botId, "botId");
        positiveInteger(options.capacity, "capacity");
        return yield* Effect.sync(() => {
          const inbox = botInbox(options.botId);
          if (inbox.rows.has(options.updateId)) return { _tag: "Duplicate" } as const;
          let active = 0;
          for (const row of inbox.rows.values()) {
            if (row.state === "pending" || row.state === "running") active += 1;
          }
          if (active >= options.capacity) return { _tag: "Full" } as const;
          inbox.rows.set(options.updateId, {
            attempts: 0,
            conversationKey: options.conversationKey,
            notBeforeMs: 0,
            payload: structuredClone(options.payload),
            state: "pending",
            updateId: options.updateId,
          });
          return { _tag: "Stored" } as const;
        });
      }),

      settle: Effect.fn("MemoryInbox.settle")(function* (options) {
        return yield* Effect.clockWith((clock) => Effect.gen(function* () {
          const now = clock.currentTimeMillisUnsafe();
          const lease = currentLease(options.botId, options.fencingToken, now);
          if (lease instanceof InboxLeaseLost) return yield* lease;
          const inbox = botInbox(options.botId);
          const row = inbox.rows.get(options.updateId);
          if (
            row === undefined ||
            row.state !== "running" ||
            row.fencingToken !== options.fencingToken
          ) {
            return;
          }
          switch (options.outcome._tag) {
            case "Done":
              inbox.rows.set(row.updateId, {
                attempts: row.attempts,
                conversationKey: row.conversationKey,
                payload: row.payload,
                state: "done",
                terminalTimeMs: now,
                updateId: row.updateId,
              });
              return;
            case "Parked":
              inbox.rows.set(row.updateId, {
                attempts: row.attempts,
                conversationKey: row.conversationKey,
                payload: row.payload,
                state: "parked",
                terminalTimeMs: now,
                updateId: row.updateId,
              });
              return;
            case "Retry":
              nonNegativeNumber(options.outcome.delayMs, "delayMs");
              inbox.rows.set(row.updateId, {
                attempts: row.attempts,
                conversationKey: row.conversationKey,
                notBeforeMs: now + options.outcome.delayMs,
                payload: row.payload,
                state: "pending",
                updateId: row.updateId,
              });
              return;
            case "Interrupted":
              inbox.rows.set(row.updateId, {
                attempts: row.attempts - 1,
                conversationKey: row.conversationKey,
                notBeforeMs: now,
                payload: row.payload,
                state: "pending",
                updateId: row.updateId,
              });
          }
        }));
      }),
    });
  },
};
