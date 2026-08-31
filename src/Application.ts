import type { EventEmitter } from "node:events";

import { Cause, Effect, Fiber, Layer, ManagedRuntime, Redacted } from "effect";
import { FetchHttpClient, HttpClient } from "effect/unstable/http";

import { Bot } from "./BotApi.js";
import { pollUpdates, type PollingOptions, type UpdateHandler } from "./Polling.js";
import { makeWebhook, type Webhook, type WebhookOptions } from "./Webhook.js";

export interface ApplicationOptions {
  readonly apiRoot?: string;
  readonly httpClient?: Layer.Layer<HttpClient.HttpClient>;
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
  readonly stop: () => Promise<void>;
}

export interface Polling {
  readonly completed: Promise<void>;
  readonly stop: () => Promise<void>;
}

export const Application = {
  make(options: ApplicationOptions): Application {
    const runtime = ManagedRuntime.make(
      Bot.layer({
        ...(options.apiRoot === undefined ? {} : { apiRoot: options.apiRoot }),
        token: Redacted.isRedacted(options.token) ? options.token : Redacted.make(options.token),
      }).pipe(Layer.provide(options.httpClient ?? FetchHttpClient.layer)),
    );
    let activeStop: (() => Promise<void>) | undefined;

    const stop = async () => {
      if (activeStop !== undefined) await activeStop();
    };

    const close = async () => {
      await stop();
      await runtime.dispose();
    };

    const startPolling = <E>(
      handler: UpdateHandler<E>,
      pollingOptions?: PollingOptions,
    ): Polling => {
      if (activeStop !== undefined) throw new Error("Application already has an active runtime");
      const fiber = runtime.runFork(pollUpdates(handler, pollingOptions));
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
      const webhook = Effect.runSync(makeWebhook(handler, webhookOptions));
      let completed: Promise<void> | undefined;
      const stopCurrent = async () => {
        try {
          await runtime.runPromise(webhook.stop);
          await completed;
        } finally {
          if (activeStop === stopCurrent) activeStop = undefined;
        }
      };
      activeStop = stopCurrent;
      completed = runtime.runPromise(webhook.completed);
      void completed.catch(() => {
        void runtime.runPromise(webhook.stop).catch(() => undefined).finally(() => {
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
      stop,
    };
  },
};
