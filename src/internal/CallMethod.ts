import * as Effect from "effect/Effect";
import * as Predicate from "effect/Predicate";
import * as Schema from "effect/Schema";
import * as SchemaIssue from "effect/SchemaIssue";
import * as SchemaParser from "effect/SchemaParser";

import { Bot, BotApiError, type MessageDefaults } from "../BotApi.js";
import type { RateLimitClass } from "./RequestPolicy.js";

type MessageDefaultField = keyof MessageDefaults;

const formatIssue = SchemaIssue.makeFormatterStandardSchemaV1();

function publicFieldName(name: string): string {
  return name.replace(/_([a-z0-9])/gu, (_, character: string) => character.toUpperCase());
}

function pathString(path: ReadonlyArray<unknown> | undefined): string {
  if (path === undefined || path.length === 0) return "request";
  let output = "";
  for (const raw of path) {
    const part = Predicate.hasProperty(raw, "key") ? raw.key : raw;
    output += typeof part === "number"
      ? `[${part}]`
      : `${output.length === 0 ? "" : "."}${publicFieldName(String(part))}`;
  }
  return output;
}

function invalidRequest(method: string, issue: SchemaIssue.Issue): BotApiError {
  const formatted = formatIssue(issue);
  return new BotApiError({
    method,
    reason: {
      _tag: "InvalidRequest",
      issues: formatted.issues.slice(0, 1).map((item) => ({
        message: item.message,
        path: pathString(item.path),
      })),
    },
    retrySafe: true,
  });
}

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
    const encoded = yield* SchemaParser.encodeUnknownEffect(paramsSchema)(withDefaults).pipe(
      Effect.mapError((issue) => invalidRequest(descriptor.method, issue)),
    );
    return yield* invokeMethod(bot, descriptor, encoded);
  });
}
