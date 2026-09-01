import * as Effect from "effect/Effect";
import * as Schema from "effect/Schema";

import { Bot, BotApiError, type MessageDefaults } from "../BotApi.js";
import type { RateLimitClass } from "./RequestPolicy.js";

type MessageDefaultField = keyof MessageDefaults;

interface MethodDescriptorBase<A, EncodedA> {
  readonly method: string;
  readonly rateLimit: RateLimitClass;
  readonly result: Schema.Codec<A, EncodedA>;
  readonly retrySafe: boolean;
}

interface MethodDescriptor<P extends object, EncodedP extends object, A, EncodedA>
  extends MethodDescriptorBase<A, EncodedA> {
  readonly defaultFields?: ReadonlyArray<MessageDefaultField>;
  readonly params: Schema.Codec<P, EncodedP>;
}

interface ParameterlessMethodDescriptor<A, EncodedA> extends MethodDescriptorBase<A, EncodedA> {
  readonly params?: undefined;
}

function invokeMethod<A, EncodedA>(
  bot: Bot["Service"],
  descriptor: MethodDescriptorBase<A, EncodedA>,
  encoded?: object,
): Effect.Effect<A, BotApiError> {
  return bot.call(
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
}

function hasExplicitEntities(params: object): boolean {
  return Reflect.get(params, "entities") !== undefined ||
    Reflect.get(params, "captionEntities") !== undefined;
}

function applyDefaults<P extends object>(
  params: P,
  defaults: MessageDefaults,
  fields: ReadonlyArray<MessageDefaultField>,
): P {
  let result = params;
  for (const field of fields) {
    if (Object.hasOwn(params, field)) continue;
    const value = defaults[field];
    if (value === undefined || field === "parseMode" && hasExplicitEntities(params)) continue;
    result = { ...result, [field]: value };
  }
  return result;
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
      const bot = yield* Bot;
      return yield* invokeMethod(bot, descriptor);
    });
  }
  const paramsSchema = descriptor.params;
  return Effect.fn(`telegram.${descriptor.method}`)(function* (params: P) {
    const bot = yield* Bot;
    const withDefaults = descriptor.defaultFields === undefined || bot.defaults === undefined
      ? params
      : applyDefaults(params, bot.defaults, descriptor.defaultFields);
    const encoded = yield* Schema.encodeEffect(paramsSchema)(withDefaults).pipe(Effect.orDie);
    return yield* invokeMethod(bot, descriptor, encoded);
  });
}
