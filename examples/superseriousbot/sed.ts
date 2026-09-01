import {
  Filter,
  on,
  regex,
  repliedMessage,
  reply,
  routes,
} from "../../index.ts";
import { Effect } from "effect";

const sedExpression = /^s\/[\s\S]*\/[\s\S]*/u;

function parse(expression: string) {
  const separator = expression.indexOf("/", 2);
  if (separator === -1) return undefined;
  return {
    replacement: expression.slice(separator + 1),
    search: expression.slice(2, separator),
  };
}

export const sedBot = routes(
  on(
    Filter.and(repliedMessage(), regex(sedExpression)),
    ([{ repliedMessage }, { text }]) => {
      if (repliedMessage.text === undefined) return Effect.void;
      const substitution = parse(text);
      if (substitution === undefined) return Effect.void;
      return reply(
        repliedMessage,
        repliedMessage.text.replaceAll(
          substitution.search,
          () => substitution.replacement,
        ),
      );
    },
  ),
);
