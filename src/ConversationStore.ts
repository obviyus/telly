import * as Context from "effect/Context";
import * as Effect from "effect/Effect";
import * as Layer from "effect/Layer";
import * as Schema from "effect/Schema";

export class ConversationStoreError extends Schema.TaggedError<ConversationStoreError>()(
  "ConversationStoreError",
  {
    description: Schema.String,
    operation: Schema.String,
  },
) {}

export interface ConversationRecord {
  readonly conversation: string;
  readonly state: unknown;
  readonly step: string;
  readonly version: number;
}

export interface LoadConversation {
  readonly botId: number;
  readonly scope: string;
}

export type ConversationCommitExpected = number | "any";

export interface CommitConversation {
  readonly botId: number;
  readonly expected: ConversationCommitExpected;
  readonly scope: string;
  readonly next?: {
    readonly conversation: string;
    readonly state: unknown;
    readonly step: string;
  };
}

export type ConversationCommitResult = "Committed" | "Conflict";

export interface ConversationStoreService {
  /** Atomically writes or ends a scope only when its expected version still matches. */
  readonly commit: (
    options: CommitConversation,
  ) => Effect.Effect<ConversationCommitResult, ConversationStoreError>;
  /** Loads the one active conversation for a chat-and-user scope. */
  readonly load: (
    options: LoadConversation,
  ) => Effect.Effect<ConversationRecord | undefined, ConversationStoreError>;
}

export class ConversationStore extends Context.Service<
  ConversationStore,
  ConversationStoreService
>()("telly/ConversationStore") {}

function positiveInteger(value: number, name: string): void {
  if (!Number.isSafeInteger(value) || value < 1) {
    throw new RangeError(`${name} must be a positive safe integer`);
  }
}

function conversationScope(scope: string): void {
  if (scope.length === 0) throw new RangeError("Conversation scope must not be empty");
}

/** Process-memory conversation storage for development and adapter tests. */
export const MemoryConversations = {
  layer(): Layer.Layer<ConversationStore> {
    return Layer.succeed(ConversationStore, MemoryConversations.make());
  },

  make(): ConversationStoreService {
    const bots = new Map<number, Map<string, ConversationRecord>>();
    const records = (botId: number) => {
      let values = bots.get(botId);
      if (values === undefined) {
        values = new Map();
        bots.set(botId, values);
      }
      return values;
    };

    return ConversationStore.of({
      commit: Effect.fn("MemoryConversations.commit")(function* (options) {
        positiveInteger(options.botId, "botId");
        conversationScope(options.scope);
        return yield* Effect.sync(() => {
          const conversations = records(options.botId);
          const current = conversations.get(options.scope);
          if (
            typeof options.expected === "number" &&
            current?.version !== options.expected
          ) {
            return "Conflict" as const;
          }
          if (options.next === undefined) {
            conversations.delete(options.scope);
          } else {
            conversations.set(options.scope, {
              conversation: options.next.conversation,
              state: structuredClone(options.next.state),
              step: options.next.step,
              version: (current?.version ?? 0) + 1,
            });
          }
          return "Committed" as const;
        });
      }),

      load: Effect.fn("MemoryConversations.load")(function* (options) {
        positiveInteger(options.botId, "botId");
        conversationScope(options.scope);
        return yield* Effect.sync(() => {
          const record = records(options.botId).get(options.scope);
          return record === undefined
            ? undefined
            : { ...record, state: structuredClone(record.state) };
        });
      }),
    });
  },
};
