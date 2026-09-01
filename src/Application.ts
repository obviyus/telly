import type { EventEmitter } from "node:events";

import * as Cause from "effect/Cause";
import * as Effect from "effect/Effect";
import * as Fiber from "effect/Fiber";
import * as Layer from "effect/Layer";
import * as ManagedRuntime from "effect/ManagedRuntime";
import * as Redacted from "effect/Redacted";
import * as FetchHttpClient from "effect/unstable/http/FetchHttpClient";
import * as HttpClient from "effect/unstable/http/HttpClient";

import { Bot, type BotApiError } from "./BotApi.js";
import {
  InboxStore,
  type InboxOptions,
  type InboxStoreError,
  type InboxStoreService,
} from "./Inbox.js";
import { type Jobs, type JobStoreError } from "./Jobs.js";
import { makeInboxWebhook } from "./internal/InboxRuntime.js";
import { runJobWorker } from "./internal/JobRuntime.js";
import {
  pollInboxUpdates,
  pollUpdates,
  type PollingConflictError,
  type PollingOptions,
  type UpdateHandler,
} from "./Polling.js";
import {
  makeWebhook,
  type Webhook,
  type WebhookOptions,
  type WebhookRuntime,
} from "./Webhook.js";

export interface ApplicationOptions {
  readonly apiRoot?: string;
  readonly httpClient?: Layer.Layer<HttpClient.HttpClient>;
  readonly inbox?: InboxStoreService;
  readonly inboxOptions?: InboxOptions;
  readonly jobs?: Jobs;
  readonly rateLimit?: boolean;
  readonly token: string | Redacted.Redacted<string>;
}

export interface Application {
  readonly close: () => Promise<void>;
  readonly run: <A, E>(effect: Effect.Effect<A, E, Bot>) => Promise<A>;
  /** Runs polling until failure or a process stop signal, then closes this application. */
  readonly runPolling: <E>(
    handler: UpdateHandler<E>,
    options?: PollingOptions,
  ) => Promise<void>;
  readonly startWebhook: <E>(
    handler: UpdateHandler<E>,
    options: WebhookOptions,
  ) => Webhook;
  readonly startPolling: <E>(
    handler: UpdateHandler<E>,
    options?: PollingOptions,
  ) => Polling;
}

export interface Polling {
  readonly completed: Promise<void>;
  readonly stop: () => Promise<void>;
}

export const Application = {
  make(options: ApplicationOptions): Application {
    const botLayer = Bot.layer({
      ...(options.apiRoot === undefined ? {} : { apiRoot: options.apiRoot }),
      ...(options.rateLimit === undefined ? {} : { rateLimit: options.rateLimit }),
      token: Redacted.isRedacted(options.token) ? options.token : Redacted.make(options.token),
    }).pipe(Layer.provide(options.httpClient ?? FetchHttpClient.layer));
    const runtime = ManagedRuntime.make(botLayer);
    let activeStop: (() => Promise<void>) | undefined;

    const close = async () => {
      if (activeStop !== undefined) await activeStop();
      await runtime.dispose();
    };

    const startPolling = <E>(
      handler: UpdateHandler<E>,
      pollingOptions?: PollingOptions,
    ): Polling => {
      if (activeStop !== undefined) throw new Error("Application already has an active runtime");
      const updates: Effect.Effect<
        never,
        E | BotApiError | InboxStoreError | PollingConflictError,
        Bot
      > =
        options.inbox !== undefined && pollingOptions?.acknowledgment === undefined
        ? pollInboxUpdates(handler, {
            ...options.inboxOptions,
            ...pollingOptions,
          }).pipe(
            Effect.provideService(InboxStore, options.inbox),
          )
        : pollUpdates(handler, pollingOptions);
      const program = options.jobs === undefined
        ? updates
        : Effect.raceFirst(updates, runJobWorker(options.jobs));
      const fiber: Fiber.Fiber<
        never,
        E | BotApiError | InboxStoreError | JobStoreError | PollingConflictError
      > = runtime.runFork(program);
      let completed: Promise<void> | undefined;
      const stopCurrent = async () => {
        try {
          await Effect.runPromise(Fiber.interrupt(fiber));
          await completed;
        } finally {
          if (activeStop === stopCurrent) activeStop = undefined;
        }
      };
      activeStop = stopCurrent;
      completed = runtime.runPromise(
        Fiber.join(fiber).pipe(
          Effect.catchCause((cause) =>
            Cause.hasInterruptsOnly(cause) ? Effect.void : Effect.failCause(cause)
          ),
          Effect.ensuring(
            Effect.sync(() => {
              if (activeStop === stopCurrent) activeStop = undefined;
            }),
          ),
        ),
      );
      // A caller may only use stop(). Keep an unobserved runtime failure from becoming a process rejection.
      void completed.catch(() => undefined);
      return {
        completed,
        stop: stopCurrent,
      };
    };

    const runPolling = async <E>(
      handler: UpdateHandler<E>,
      pollingOptions?: PollingOptions,
    ) => {
      const polling = startPolling(handler, pollingOptions);
      const stopOnSignal = () => {
        void polling.stop().catch(() => undefined);
      };
      const processEvents: EventEmitter = process;
      processEvents.once("SIGINT", stopOnSignal);
      processEvents.once("SIGTERM", stopOnSignal);
      try {
        await polling.completed;
      } finally {
        processEvents.off("SIGINT", stopOnSignal);
        processEvents.off("SIGTERM", stopOnSignal);
        await close();
      }
    };

    const startWebhook = <E>(
      handler: UpdateHandler<E>,
      webhookOptions: WebhookOptions,
    ): Webhook => {
      if (activeStop !== undefined) throw new Error("Application already has an active runtime");
      const webhook: WebhookRuntime<E | InboxStoreError> = options.inbox === undefined
        ? Effect.runSync(makeWebhook(handler, webhookOptions))
        : runtime.runSync(
            makeInboxWebhook(handler, webhookOptions.secretToken, {
              ...options.inboxOptions,
              ...webhookOptions,
            }).pipe(
              Effect.provideService(InboxStore, options.inbox),
            ),
          );
      const jobFiber = options.jobs === undefined
        ? undefined
        : runtime.runFork(runJobWorker(options.jobs));
      const stopRuntime = () => jobFiber === undefined
        ? webhook.stop
        : Effect.all([webhook.stop, Fiber.interrupt(jobFiber)], {
            concurrency: "unbounded",
            discard: true,
          });
      let completed: Promise<void> | undefined;
      const stopCurrent = async () => {
        try {
          await runtime.runPromise(stopRuntime());
          await completed;
        } finally {
          if (activeStop === stopCurrent) activeStop = undefined;
        }
      };
      activeStop = stopCurrent;
      const completion: Effect.Effect<
        void,
        E | InboxStoreError | JobStoreError,
        Bot
      > = jobFiber === undefined
        ? webhook.completed
        : Effect.raceFirst(webhook.completed, Fiber.join(jobFiber));
      completed = runtime.runPromise(completion);
      void completed.catch(() => {
        void runtime.runPromise(stopRuntime()).catch(() => undefined).finally(() => {
          if (activeStop === stopCurrent) activeStop = undefined;
        });
      });
      return {
        completed,
        fetch: (request) => runtime.runPromise(webhook.fetch(request)),
        stop: stopCurrent,
      };
    };

    return {
      close,
      run: runtime.runPromise,
      runPolling,
      startPolling,
      startWebhook,
    };
  },
};
