import * as Cause from "effect/Cause";
import * as Effect from "effect/Effect";
import * as Exit from "effect/Exit";
import * as Metric from "effect/Metric";
import * as Result from "effect/Result";

import type { BotApiError } from "../BotApi.js";

export type DispatchSource = "inbox" | "jobs" | "polling" | "webhook";

type BotApiOutcome =
  | "defect"
  | "interrupted"
  | "invalid_response"
  | "ok"
  | "rejected_429"
  | "rejected_4xx"
  | "rejected_5xx"
  | "transport";
type DispatchOutcome = "failed" | "interrupted" | "ok";
type DurableSettlement =
  | { readonly _tag: "Done" | "Interrupted" | "Retry" }
  | { readonly _tag: "Parked"; readonly reason: string };
type SettlementOutcome = "done" | "interrupted" | "parked" | "retry";
type SettlementStore = "inbox" | "jobs";
type WebhookResult =
  | "accepted"
  | "bad_request"
  | "failed"
  | "method_not_allowed"
  | "other"
  | "unauthorized"
  | "unavailable";

const botApiRequestTotal = Metric.counter("telly_bot_api_request_total", {
  description: "Telegram Bot API request attempts",
  incremental: true,
});
const botApiRequestDuration = Metric.histogram("telly_bot_api_request_duration_ms", {
  boundaries: Metric.exponentialBoundaries({ start: 1, factor: 2, count: 17 }),
  description: "Telegram Bot API request attempt duration in milliseconds",
});
const botApiDelayTotal = Metric.counter("telly_bot_api_delay_total", {
  description: "Telegram Bot API request delays",
  incremental: true,
});
const botApiDelayMsTotal = Metric.counter("telly_bot_api_delay_ms_total", {
  description: "Time spent delaying Telegram Bot API requests in milliseconds",
  incremental: true,
});
const dispatchActive = Metric.gauge("telly_dispatch_active", {
  description: "Accepted updates or jobs that have not settled",
});
const dispatchSettledTotal = Metric.counter("telly_dispatch_settled_total", {
  description: "Settled update or job dispatches",
  incremental: true,
});
const dispatchRejectedTotal = Metric.counter("telly_dispatch_rejected_total", {
  description: "Dispatches rejected because the runtime cannot accept work",
  incremental: true,
});
const webhookRequestTotal = Metric.counter("telly_webhook_request_total", {
  description: "Telegram webhook requests by bounded result",
  incremental: true,
});
const inboxSaveTotal = Metric.counter("telly_inbox_save_total", {
  description: "Durable inbox save results",
  incremental: true,
});
const settlementTotal = Metric.counter("telly_settlement_total", {
  description: "Durable inbox and job settlements",
  incremental: true,
});

const requestCounters = new Map<string, Metric.Counter<number>>();
const requestDurations = new Map<string, Metric.Histogram<number>>();
const delayCounters = new Map<string, Metric.Counter<number>>();
const delayDurations = new Map<string, Metric.Counter<number>>();
const activeGauges = new Map<DispatchSource, Metric.Gauge<number>>();
const settledCounters = new Map<string, Metric.Counter<number>>();
const rejectedCounters = new Map<DispatchSource, Metric.Counter<number>>();
const webhookCounters = new Map<WebhookResult, Metric.Counter<number>>();
const inboxSaveCounters = new Map<string, Metric.Counter<number>>();
const settlementCounters = new Map<string, Metric.Counter<number>>();

function cached<K, A>(cache: Map<K, A>, key: K, make: () => A): A {
  const found = cache.get(key);
  if (found !== undefined) return found;
  const value = make();
  cache.set(key, value);
  return value;
}

function botApiOutcome(exit: Exit.Exit<unknown, BotApiError>): BotApiOutcome {
  if (Exit.isSuccess(exit)) return "ok";
  const error = Cause.findError(exit.cause);
  if (Result.isFailure(error)) {
    return Cause.hasInterruptsOnly(exit.cause) ? "interrupted" : "defect";
  }
  switch (error.success.reason._tag) {
    case "InvalidResponse":
      return "invalid_response";
    case "Transport":
      return "transport";
    case "TelegramRejected":
      if (error.success.reason.errorCode === 429) return "rejected_429";
      if (error.success.reason.errorCode >= 500) return "rejected_5xx";
      return "rejected_4xx";
  }
}

function dispatchOutcome(exit: Exit.Exit<unknown, unknown>): DispatchOutcome {
  if (Exit.isSuccess(exit)) return "ok";
  return Cause.hasInterruptsOnly(exit.cause) ? "interrupted" : "failed";
}

function webhookResult(status: number): WebhookResult {
  switch (status) {
    case 200:
      return "accepted";
    case 400:
      return "bad_request";
    case 401:
      return "unauthorized";
    case 405:
      return "method_not_allowed";
    case 500:
      return "failed";
    case 503:
      return "unavailable";
    default:
      return "other";
  }
}

function settlementOutcome(settlement: DurableSettlement): SettlementOutcome {
  switch (settlement._tag) {
    case "Done":
      return "done";
    case "Interrupted":
      return "interrupted";
    case "Parked":
      return "parked";
    case "Retry":
      return "retry";
  }
}

export function trackBotApiRequest<A>(
  method: string,
  effect: Effect.Effect<A, BotApiError>,
): Effect.Effect<A, BotApiError> {
  return Effect.clockWith((clock) => {
    const startedAt = clock.currentTimeNanosUnsafe();
    return Effect.annotateCurrentSpan({ "telegram.method": method }).pipe(
      Effect.andThen(effect),
      Effect.onExit((exit) => {
        const outcome = botApiOutcome(exit);
        const durationMs = Number(clock.currentTimeNanosUnsafe() - startedAt) / 1_000_000;
        const requestCounter = cached(
          requestCounters,
          `${method}:${outcome}`,
          () => Metric.withAttributes(botApiRequestTotal, { method, outcome }),
        );
        const duration = cached(
          requestDurations,
          method,
          () => Metric.withAttributes(botApiRequestDuration, { method }),
        );
        return Effect.all([
          Metric.update(requestCounter, 1),
          Metric.update(duration, durationMs),
          Effect.annotateCurrentSpan({ "telegram.outcome": outcome }),
        ], { discard: true });
      }),
    );
  });
}

export function recordBotApiDelay(reason: "rate_limit" | "retry", delayMs: number) {
  const count = cached(
    delayCounters,
    reason,
    () => Metric.withAttributes(botApiDelayTotal, { reason }),
  );
  const duration = cached(
    delayDurations,
    reason,
    () => Metric.withAttributes(botApiDelayMsTotal, { reason }),
  );
  return Effect.all([
    Metric.update(count, 1),
    Metric.update(duration, delayMs),
  ], { discard: true });
}

export function trackDispatch<A, E, R>(
  source: DispatchSource,
  effect: Effect.Effect<A, E, R>,
): Effect.Effect<A, E, R> {
  const active = cached(
    activeGauges,
    source,
    () => Metric.withAttributes(dispatchActive, { source }),
  );
  return Metric.modify(active, 1).pipe(
    Effect.andThen(effect),
    Effect.onExit((exit) => {
      const outcome = dispatchOutcome(exit);
      const settled = cached(
        settledCounters,
        `${source}:${outcome}`,
        () => Metric.withAttributes(dispatchSettledTotal, { outcome, source }),
      );
      return Metric.update(settled, 1);
    }),
    Effect.ensuring(Metric.modify(active, -1)),
  );
}

export function recordDispatchRejected(source: DispatchSource) {
  const counter = cached(
    rejectedCounters,
    source,
    () => Metric.withAttributes(dispatchRejectedTotal, { source }),
  );
  return Metric.update(counter, 1);
}

export function recordWebhookRequest(status: number) {
  const result = webhookResult(status);
  const counter = cached(
    webhookCounters,
    result,
    () => Metric.withAttributes(webhookRequestTotal, { result }),
  );
  return Metric.update(counter, 1).pipe(
    Effect.andThen(Effect.annotateCurrentSpan({ "telegram.webhook.result": result })),
  );
}

export function recordInboxSave(result: "Duplicate" | "Full" | "Stored") {
  const normalized = result.toLowerCase();
  const counter = cached(
    inboxSaveCounters,
    normalized,
    () => Metric.withAttributes(inboxSaveTotal, { result: normalized }),
  );
  return Metric.update(counter, 1).pipe(
    Effect.andThen(Effect.annotateCurrentSpan({ "telly.inbox.save_result": normalized })),
  );
}

export function recordSettlement(
  store: SettlementStore,
  settlement: DurableSettlement,
) {
  const outcome = settlementOutcome(settlement);
  const counter = cached(
    settlementCounters,
    `${store}:${outcome}`,
    () => Metric.withAttributes(settlementTotal, { outcome, store }),
  );
  return Metric.update(counter, 1).pipe(
    Effect.andThen(
      settlement._tag === "Parked"
        ? Effect.logWarning("Telegram durable work parked").pipe(
            Effect.annotateLogs({
              reason: settlement.reason,
              store,
            }),
          )
        : Effect.void,
    ),
  );
}
