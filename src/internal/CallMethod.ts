import { Effect, Schema } from "effect";

import { Bot, BotApiError } from "../BotApi.js";

interface MethodDescriptor<P extends object, A> {
  readonly method: string;
  readonly params: Schema.Codec<P, P>;
  readonly result: Schema.Codec<A, A>;
  readonly retrySafe: boolean;
}

function applyRetrySafety(error: BotApiError, retrySafe: boolean): BotApiError {
  return error.retry_safe || !retrySafe
    ? error
    : new BotApiError({
        method: error.method,
        reason: error.reason,
        retry_safe: true,
      });
}

export function callMethod<P extends object, A>(descriptor: MethodDescriptor<P, A>) {
  return Effect.fn(`telegram.${descriptor.method}`)(function* (
    params: P,
  ): Effect.fn.Return<A, BotApiError, Bot> {
    const encoded = yield* Schema.encodeEffect(descriptor.params)(params).pipe(Effect.orDie);
    const bot = yield* Bot;
    const result = yield* bot.callRaw(descriptor.method, encoded).pipe(
      Effect.mapError((error) => applyRetrySafety(error, descriptor.retrySafe)),
    );
    return yield* Schema.decodeUnknownEffect(descriptor.result)(result).pipe(
      Effect.mapError(
        (error) =>
          new BotApiError({
            method: descriptor.method,
            reason: {
              _tag: "InvalidResponse",
              description: error.message,
            },
            retry_safe: descriptor.retrySafe,
          }),
      ),
    );
  });
}
