import { Effect, Schema } from "effect";

import { Bot, BotApiError } from "../BotApi.js";

interface MethodDescriptorBase<A, EncodedA> {
  readonly method: string;
  readonly result: Schema.Codec<A, EncodedA>;
  readonly retrySafe: boolean;
}

interface MethodDescriptor<P extends object, EncodedP extends object, A, EncodedA>
  extends MethodDescriptorBase<A, EncodedA> {
  readonly params: Schema.Codec<P, EncodedP>;
}

interface ParameterlessMethodDescriptor<A, EncodedA> extends MethodDescriptorBase<A, EncodedA> {
  readonly params?: undefined;
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

function invokeMethod<A, EncodedA>(
  descriptor: MethodDescriptorBase<A, EncodedA>,
  encoded?: object,
): Effect.Effect<A, BotApiError, Bot> {
  return Effect.gen(function* () {
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

export function callMethod<P extends object, EncodedP extends object, A, EncodedA>(
  descriptor: MethodDescriptor<P, EncodedP, A, EncodedA>,
): (params: P) => Effect.Effect<A, BotApiError, Bot>;
export function callMethod<A, EncodedA>(
  descriptor: ParameterlessMethodDescriptor<A, EncodedA>,
): () => Effect.Effect<A, BotApiError, Bot>;
export function callMethod<P extends object, EncodedP extends object, A, EncodedA>(
  descriptor:
    | MethodDescriptor<P, EncodedP, A, EncodedA>
    | ParameterlessMethodDescriptor<A, EncodedA>,
) {
  if (descriptor.params === undefined) {
    return Effect.fn(`telegram.${descriptor.method}`)(function* () {
      return yield* invokeMethod(descriptor);
    });
  }
  const paramsSchema = descriptor.params;
  return Effect.fn(`telegram.${descriptor.method}`)(function* (params: P) {
    const encoded = yield* Schema.encodeEffect(paramsSchema)(params).pipe(Effect.orDie);
    return yield* invokeMethod(descriptor, encoded);
  });
}
