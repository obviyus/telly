import * as Effect from "effect/Effect";
import * as Exit from "effect/Exit";
import * as Schema from "effect/Schema";

import { Bot, type BotApiError } from "./BotApi.js";
import {
  type ConversationStoreError,
  type ConversationStoreService,
} from "./ConversationStore.js";
import { matchFilter, type Filter } from "./Routing.js";
import {
  conversationScopeFromMessage,
  withConversations,
} from "./internal/ConversationRuntime.js";
import {
  ConversationTypeId,
  type ConversationProtocol,
} from "./internal/ConversationProtocol.js";
import type { Message } from "./types.generated.js";
import type { UpdateHandler } from "./Polling.js";

const ConversationStepTypeId = Symbol.for("telly/ConversationStep");

export class ConversationConflict extends Schema.TaggedError<ConversationConflict>()(
  "ConversationConflict",
  { conversation: Schema.String },
) {}

export class ConversationScopeMissing extends Schema.TaggedError<ConversationScopeMissing>()(
  "ConversationScopeMissing",
  { conversation: Schema.String },
) {}

export class ConversationStateInvalid extends Schema.TaggedError<ConversationStateInvalid>()(
  "ConversationStateInvalid",
  {
    conversation: Schema.String,
    step: Schema.String,
  },
) {}

export interface ConversationNext<Step extends string, State> {
  readonly _tag: "Next";
  readonly state: State;
  readonly step: Step;
}

export interface ConversationEnd {
  readonly _tag: "End";
}

type ConversationTransition = ConversationEnd | ConversationNext<string, unknown> | void;

interface RuntimeConversationStep<out E> {
  readonly decode: (input: unknown) => Exit.Exit<unknown, Schema.SchemaError>;
  readonly encode: (input: unknown) => Exit.Exit<unknown, Schema.SchemaError>;
  readonly filter: Filter<unknown>;
  readonly run: (
    match: unknown,
    state: unknown,
  ) => Effect.Effect<ConversationEnd | ConversationNext<string, unknown> | void, E, Bot>;
}

interface AnyConversationStep {
  readonly [ConversationStepTypeId]: RuntimeConversationStep<unknown>;
}

export interface ConversationStep<in out State, out Transition, out E>
  extends AnyConversationStep
{
  readonly [ConversationStepTypeId]: RuntimeConversationStep<E> & {
    readonly State?: (state: State) => State;
    readonly Transition?: Transition;
  };
}

type ConversationSteps = Readonly<Record<string, AnyConversationStep>>;
type StepKey<Steps> = Extract<keyof Steps, string>;
type StepState<Step> = Step extends ConversationStep<infer State, infer _Transition, infer _Error>
  ? State
  : never;
type StepError<Step> = Step extends ConversationStep<infer _State, infer _Transition, infer Error>
  ? Error
  : never;
type ValidTransition<Steps> =
  | ConversationEnd
  | void
  | {
      [Step in StepKey<Steps>]: ConversationNext<Step, StepState<Steps[Step]>>;
    }[StepKey<Steps>];
type ValidSteps<Steps> = {
  readonly [Step in keyof Steps]: ConversationStep<
    StepState<Steps[Step]>,
    ValidTransition<Steps>,
    unknown
  >;
};

function conversationStep<
  StateSchema extends Schema.Codec<unknown, unknown, never, never>,
  Match,
  Success extends ConversationTransition,
  Error,
>(options: {
  readonly filter: Filter<Match>;
  readonly run: (
    match: Match,
    state: StateSchema["Type"],
  ) => Effect.Effect<Success, Error, Bot>;
  readonly state: StateSchema;
}): ConversationStep<StateSchema["Type"], Success, Error> {
  const codec = Schema.toCodecJson(options.state);
  return {
    [ConversationStepTypeId]: {
      decode: Schema.decodeUnknownExit(codec),
      encode: Schema.encodeUnknownExit(codec),
      filter: options.filter,
      run: (match, state) => options.run(
        match as Match,
        state as StateSchema["Type"],
      ),
    },
  };
}

export const Conversation = {
  end(): ConversationEnd {
    return { _tag: "End" };
  },

  next<const Step extends string, State>(
    step: Step,
    state: State,
  ): ConversationNext<Step, State> {
    return { _tag: "Next", state, step };
  },

  step: conversationStep,
};

export interface DurableConversation<Steps extends ConversationSteps, out Error>
  extends ConversationProtocol<
    Error | BotApiError | ConversationConflict | ConversationStateInvalid
  >
{
  readonly enter: <Step extends StepKey<Steps>>(
    message: Message,
    step: Step,
    state: StepState<Steps[Step]>,
  ) => Effect.Effect<
    void,
    | ConversationConflict
    | ConversationScopeMissing
    | ConversationStateInvalid
    | ConversationStoreError,
    Bot
  >;
  readonly exit: (
    message: Message,
  ) => Effect.Effect<
    void,
    ConversationConflict | ConversationScopeMissing | ConversationStoreError,
    Bot
  >;
}

function encodeState(
  steps: ReadonlyMap<string, RuntimeConversationStep<unknown>>,
  conversationName: string,
  step: string,
  state: unknown,
) {
  const runtimeStep = steps.get(step);
  if (runtimeStep === undefined) {
    return Effect.fail(new ConversationStateInvalid({
      conversation: conversationName,
      step,
    }));
  }
  const encoded = runtimeStep.encode(state);
  return Exit.isSuccess(encoded)
    ? Effect.succeed(encoded.value)
    : Effect.fail(new ConversationStateInvalid({
        conversation: conversationName,
        step,
      }));
}

/** Defines one durable, schema-checked conversation state machine. */
export function conversation<
  const Steps extends ConversationSteps,
>(options: {
  readonly name: string;
  readonly steps: Steps & ValidSteps<Steps>;
  readonly store: ConversationStoreService;
}): DurableConversation<Steps, StepError<Steps[keyof Steps]>> {
  if (!/^[a-z0-9][a-z0-9_-]{0,63}$/u.test(options.name)) {
    throw new RangeError("Conversation names must use 1-64 lowercase letters, digits, dashes, or underscores");
  }
  const steps = new Map<string, RuntimeConversationStep<StepError<Steps[keyof Steps]>>>();
  for (const [step, definition] of Object.entries(options.steps)) {
    if (!/^[a-z0-9][a-z0-9_-]{0,63}$/u.test(step)) {
      throw new RangeError(`Invalid conversation step: ${step}`);
    }
    steps.set(
      step,
      definition[ConversationStepTypeId] as RuntimeConversationStep<
        StepError<Steps[keyof Steps]>
      >,
    );
  }

  const enter = Effect.fn("Conversation.enter")(function* <Step extends StepKey<Steps>>(
    message: Message,
    step: Step,
    state: StepState<Steps[Step]>,
  ) {
    const scope = conversationScopeFromMessage(message);
    if (scope === undefined) {
      return yield* new ConversationScopeMissing({ conversation: options.name });
    }
    const bot = yield* Bot;
    const encoded = yield* encodeState(steps, options.name, step, state);
    const committed = yield* options.store.commit({
      botId: bot.id,
      expected: "any",
      scope,
      next: { conversation: options.name, state: encoded, step },
    });
    if (committed === "Conflict") {
      return yield* new ConversationConflict({ conversation: options.name });
    }
  });

  const exit = Effect.fn("Conversation.exit")(function* (message: Message) {
    const scope = conversationScopeFromMessage(message);
    if (scope === undefined) {
      return yield* new ConversationScopeMissing({ conversation: options.name });
    }
    const bot = yield* Bot;
    const record = yield* options.store.load({ botId: bot.id, scope });
    if (record === undefined || record.conversation !== options.name) return;
    const committed = yield* options.store.commit({
      botId: bot.id,
      expected: record.version,
      scope,
    });
    if (committed === "Conflict") {
      return yield* new ConversationConflict({ conversation: options.name });
    }
  });

  return {
    [ConversationTypeId]: {
      handle: Effect.fn("Conversation.handle")(function* (record, update, scope, botId) {
        const runtimeStep = steps.get(record.step);
        if (runtimeStep === undefined) return false;
        const decoded = runtimeStep.decode(record.state);
        if (Exit.isFailure(decoded)) return false;
        const matched = yield* matchFilter(runtimeStep.filter, update);
        if (matched === undefined) return false;
        const transition = yield* runtimeStep.run(matched, decoded.value);
        if (transition === undefined) return true;
        const next = transition._tag === "End"
          ? undefined
          : {
              conversation: options.name,
              state: yield* encodeState(
                steps,
                options.name,
                transition.step,
                transition.state,
              ),
              step: transition.step,
            };
        const committed = yield* options.store.commit({
          botId,
          expected: record.version,
          scope,
          ...(next === undefined ? {} : { next }),
        });
        if (committed === "Conflict") {
          return yield* new ConversationConflict({ conversation: options.name });
        }
        return true;
      }),
      name: options.name,
      store: options.store,
    },
    enter,
    exit,
  };
}

/** Runs active conversations before a fallback update handler. */
export function conversations<
  const Definitions extends ReadonlyArray<ConversationProtocol<unknown>>,
  FallbackError,
>(
  definitions: Definitions,
  fallback: UpdateHandler<FallbackError>,
) {
  return withConversations(definitions, fallback);
}
