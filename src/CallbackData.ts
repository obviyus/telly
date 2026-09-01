import { Exit, Schema } from "effect";

import { Filter, type CallbackQueryMatch } from "./Routing.js";
import type { InlineKeyboardButton } from "./types.generated.js";

const maxCallbackDataBytes = 64;
const textEncoder = new TextEncoder();

export class CallbackDataInvalid extends Schema.TaggedError<CallbackDataInvalid>()(
  "CallbackDataInvalid",
  {
    name: Schema.String,
    reason: Schema.String,
  },
) {}

export class CallbackDataTooLong extends Schema.TaggedError<CallbackDataTooLong>()(
  "CallbackDataTooLong",
  {
    bytes: Schema.Int,
    maxBytes: Schema.Int,
    name: Schema.String,
  },
) {}

export interface CallbackDataMatch<Payload> extends CallbackQueryMatch {
  readonly data: Payload;
}

export interface CallbackData<Payload> extends Filter<CallbackDataMatch<Payload>> {
  readonly button: (text: string, payload: Payload) => InlineKeyboardButton;
  readonly name: string;
  readonly pack: (payload: Payload) => string;
  readonly unpack: (value: string) => Payload | undefined;
}

/** Defines one schema-validated callback payload and its routing filter. */
export function callbackData<Payload, Encoded>(
  name: string,
  schema: Schema.Codec<Payload, Encoded, never, never>,
): CallbackData<Payload> {
  if (!/^[a-z0-9][a-z0-9_-]{0,31}$/u.test(name)) {
    throw new RangeError("Callback data names must use 1-32 lowercase letters, digits, dashes, or underscores");
  }
  const prefix = `${name}:`;
  const codec = Schema.toCodecJson(schema);
  const encode = Schema.encodeUnknownExit(codec);
  const decode = Schema.decodeUnknownExit(codec);

  const pack = (payload: Payload) => {
    const encoded = encode(payload);
    if (Exit.isFailure(encoded)) {
      throw new CallbackDataInvalid({
        name,
        reason: "Payload does not match its callback data schema",
      });
    }
    const value = `${prefix}${JSON.stringify(encoded.value)}`;
    const bytes = textEncoder.encode(value).byteLength;
    if (bytes > maxCallbackDataBytes) {
      throw new CallbackDataTooLong({ bytes, maxBytes: maxCallbackDataBytes, name });
    }
    return value;
  };

  const unpack = (value: string): Payload | undefined => {
    if (!value.startsWith(prefix)) return undefined;
    let encoded: unknown;
    try {
      encoded = JSON.parse(value.slice(prefix.length));
    } catch {
      return undefined;
    }
    const decoded = decode(encoded);
    return Exit.isSuccess(decoded) ? decoded.value : undefined;
  };

  const filter = Filter.make((update) => {
    const query = update.callbackQuery;
    if (query?.data === undefined) return undefined;
    const data = unpack(query.data);
    return data === undefined ? undefined : { callbackQuery: query, data, update };
  });

  return Object.assign(filter, {
    button: (text: string, payload: Payload): InlineKeyboardButton => ({
      callbackData: pack(payload),
      text,
    }),
    name,
    pack,
    unpack,
  });
}
