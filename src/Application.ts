import { type Effect, Layer, ManagedRuntime, Redacted } from "effect";
import { FetchHttpClient, HttpClient } from "effect/unstable/http";

import { Bot } from "./BotApi.js";

export interface ApplicationOptions {
  readonly apiRoot?: string;
  readonly httpClient?: Layer.Layer<HttpClient.HttpClient>;
  readonly token: string;
}

export interface Application {
  readonly close: () => Promise<void>;
  readonly run: <A, E>(effect: Effect.Effect<A, E, Bot>) => Promise<A>;
}

export const Application = {
  make(options: ApplicationOptions): Application {
    const runtime = ManagedRuntime.make(
      Bot.layer({
        ...(options.apiRoot === undefined ? {} : { apiRoot: options.apiRoot }),
        token: Redacted.make(options.token),
      }).pipe(Layer.provide(options.httpClient ?? FetchHttpClient.layer)),
    );

    return {
      close: runtime.dispose,
      run: runtime.runPromise,
    };
  },
};
