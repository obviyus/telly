import { Effect, Exit, Schema } from "effect";

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
};

type ConversationStates = Readonly<
  Record<string, Schema.Codec<unknown, unknown, never, never>>
>;
type StateAt<States extends ConversationStates, Step extends keyof States> =
  States[Step]["Type"];
type ConversationTransition<States extends ConversationStates> =
  | ConversationEnd
  | {
      [Step in Extract<keyof States, string>]: ConversationNext<
        Step,
        StateAt<States, Step>
      >;
    }[Extract<keyof States, string>];

interface RuntimeConversationStep<Step extends string, out E> {
  readonly error?: E;
  readonly filter: Filter<unknown>;
  readonly run: (
    match: unknown,
    state: unknown,
  ) => Effect.Effect<ConversationEnd | ConversationNext<string, unknown> | void, E, Bot>;
  readonly step: Step;
}

export interface ConversationStep<Step extends string, out E> {
  readonly [ConversationStepTypeId]: RuntimeConversationStep<Step, E>;
}

type ConversationStepError<Value> = Value extends ConversationStep<string, infer Error>
  ? Error
  : never;
type ConversationStepDefinitions<States extends ConversationStates> = {
  readonly [Step in keyof States]: ConversationStep<Extract<Step, string>, unknown>;
};
type ConversationStepBuilders<States extends ConversationStates> = {
  readonly [Step in Extract<keyof States, string>]: <Match, Error>(
    filter: Filter<Match>,
    run: (
      match: Match,
      state: StateAt<States, Step>,
    ) => Effect.Effect<ConversationTransition<States> | void, Error, Bot>,
  ) => ConversationStep<Step, Error>;
};
type ConversationDefinitionError<Steps> = Steps extends Readonly<Record<string, unknown>>
  ? ConversationStepError<Steps[keyof Steps]>
  : never;

interface RuntimeStateCodec {
  readonly decode: (input: unknown) => Exit.Exit<unknown, Schema.SchemaError>;
  readonly encode: (input: unknown) => Exit.Exit<unknown, Schema.SchemaError>;
}

export interface DurableConversation<States extends ConversationStates, out Error>
  extends ConversationProtocol<
    Error | BotApiError | ConversationConflict | ConversationStateInvalid
  >
{
  readonly enter: <Step extends Extract<keyof States, string>>(
    message: Message,
    step: Step,
    state: StateAt<States, Step>,
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
  codecs: ReadonlyMap<string, RuntimeStateCodec>,
  conversationName: string,
  step: string,
  state: unknown,
) {
  const codec = codecs.get(step);
  if (codec === undefined) {
    return Effect.fail(new ConversationStateInvalid({
      conversation: conversationName,
      step,
    }));
  }
  const encoded = codec.encode(state);
  return Exit.isSuccess(encoded)
    ? Effect.succeed(encoded.value)
    : Effect.fail(new ConversationStateInvalid({
        conversation: conversationName,
        step,
      }));
}

/** Defines one durable, schema-checked conversation state machine. */
export function conversation<
  const States extends ConversationStates,
  const Steps extends ConversationStepDefinitions<States>,
>(options: {
  readonly handlers: (step: ConversationStepBuilders<States>) => Steps;
  readonly name: string;
  readonly states: States;
  readonly store: ConversationStoreService;
}): DurableConversation<States, ConversationDefinitionError<Steps>> {
  if (!/^[a-z0-9][a-z0-9_-]{0,63}$/u.test(options.name)) {
    throw new RangeError("Conversation names must use 1-64 lowercase letters, digits, dashes, or underscores");
  }
  const codecs = new Map<string, RuntimeStateCodec>();
  const builders: Partial<Record<string, unknown>> = {};
  for (const [step, schema] of Object.entries(options.states)) {
    if (!/^[a-z0-9][a-z0-9_-]{0,63}$/u.test(step)) {
      throw new RangeError(`Invalid conversation step: ${step}`);
    }
    const codec = Schema.toCodecJson(schema);
    codecs.set(step, {
      decode: Schema.decodeUnknownExit(codec),
      encode: Schema.encodeUnknownExit(codec),
    });
    builders[step] = <Match, Error>(
      filter: Filter<Match>,
      run: (
        match: Match,
        state: StateAt<States, Extract<keyof States, string>>,
      ) => Effect.Effect<ConversationTransition<States> | void, Error, Bot>,
    ): ConversationStep<string, Error> => ({
      [ConversationStepTypeId]: {
        filter,
        run: (matchValue, stateValue) => run(
          matchValue as Match,
          stateValue as StateAt<States, Extract<keyof States, string>>,
        ),
        step,
      },
    });
  }
  const definitions = options.handlers(builders as ConversationStepBuilders<States>);
  const runtimeSteps = new Map<
    string,
    RuntimeConversationStep<string, ConversationDefinitionError<Steps>>
  >();
  for (const step of Object.keys(options.states)) {
    const definition = definitions[step];
    if (definition === undefined || definition[ConversationStepTypeId].step !== step) {
      throw new RangeError(`Conversation step ${step} must use its matching builder`);
    }
    runtimeSteps.set(
      step,
      definition[ConversationStepTypeId] as RuntimeConversationStep<
        string,
        ConversationDefinitionError<Steps>
      >,
    );
  }
  if (Object.keys(definitions).length !== runtimeSteps.size) {
    throw new RangeError("Conversation handlers must match the declared states");
  }

  const enter = Effect.fn("Conversation.enter")(function* <
    Step extends Extract<keyof States, string>,
  >(message: Message, step: Step, state: StateAt<States, Step>) {
    const scope = conversationScopeFromMessage(message);
    if (scope === undefined) {
      return yield* new ConversationScopeMissing({ conversation: options.name });
    }
    const bot = yield* Bot;
    const encoded = yield* encodeState(codecs, options.name, step, state);
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
        const runtimeStep = runtimeSteps.get(record.step);
        const codec = codecs.get(record.step);
        if (runtimeStep === undefined || codec === undefined) return false;
        const decoded = codec.decode(record.state);
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
                codecs,
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
