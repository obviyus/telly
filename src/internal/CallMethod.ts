import * as Effect from "effect/Effect";
import * as Schema from "effect/Schema";

import { Bot, BotApiError } from "../BotApi.js";
import type { RateLimitClass } from "./RequestPolicy.js";

interface MethodDescriptorBase<A, EncodedA> {
  readonly method: string;
  readonly rateLimit: RateLimitClass;
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

function invokeMethod<A, EncodedA>(
  descriptor: MethodDescriptorBase<A, EncodedA>,
  encoded?: object,
): Effect.Effect<A, BotApiError, Bot> {
  return Effect.gen(function* () {
    const bot = yield* Bot;
    return yield* bot.call(
      descriptor.method,
      encoded ?? {},
      {
        rateLimit: descriptor.rateLimit,
        retrySafe: descriptor.retrySafe,
      },
      (result) => Schema.decodeUnknownEffect(descriptor.result)(result).pipe(
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
