import { Effect, Schema } from "effect";

import { Bot, BotApiError } from "../BotApi.js";

interface MethodDescriptor<P extends object, EncodedP extends object, A, EncodedA> {
  readonly method: string;
  readonly params: Schema.Codec<P, EncodedP>;
  readonly result: Schema.Codec<A, EncodedA>;
  readonly retrySafe: boolean;
}

function applyRetrySafety(error: BotApiError, retrySafe: boolean): BotApiError {
  return error.retrySafe || !retrySafe
    ? error
    : new BotApiError({
        method: error.method,
        reason: error.reason,
        retrySafe: true,
      });
}

export function callMethod<P extends object, EncodedP extends object, A, EncodedA>(
  descriptor: MethodDescriptor<P, EncodedP, A, EncodedA>,
) {
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
            retrySafe: descriptor.retrySafe,
          }),
      ),
    );
  });
}
