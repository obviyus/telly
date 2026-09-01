export type WorkloadKind = "callback" | "command" | "text";

export interface WorkloadEntry {
  readonly kind: WorkloadKind;
  readonly payload: string;
  readonly update: Readonly<Record<string, unknown>>;
  readonly updateId: number;
}

export interface WorkloadFile {
  readonly entries: ReadonlyArray<WorkloadEntry>;
  readonly schemaVersion: 1;
  readonly seed: number;
}

export interface WorkloadTotals {
  readonly callback: number;
  readonly checksum: number;
  readonly command: number;
  readonly text: number;
}

const kindWeight: Readonly<Record<WorkloadKind, number>> = {
  callback: 3,
  command: 2,
  text: 1,
};

export function foldChecksum(
  current: number,
  kind: WorkloadKind,
  payload: string,
  updateId: number,
): number {
  return (current + Math.imul(updateId, 17) + payload.length * 31 + kindWeight[kind]) >>> 0;
}

function random(seed: number) {
  let state = seed >>> 0;
  return () => {
    state = (Math.imul(state, 1_664_525) + 1_013_904_223) >>> 0;
    return state / 0x1_0000_0000;
  };
}

export function makeWorkload(options: {
  readonly fixtureCount: number;
  readonly seed: number;
}): WorkloadFile {
  if (!Number.isSafeInteger(options.fixtureCount) || options.fixtureCount < 10) {
    throw new RangeError("fixtureCount must be an integer of at least 10");
  }
  const nextRandom = random(options.seed);
  const kinds: Array<WorkloadKind> = [];
  for (let index = 0; index < options.fixtureCount; index += 1) {
    const position = index % 10;
    kinds.push(position < 7 ? "text" : position < 9 ? "command" : "callback");
  }
  for (let index = kinds.length - 1; index > 0; index -= 1) {
    const selected = Math.floor(nextRandom() * (index + 1));
    const value = kinds[index];
    if (value === undefined) throw new Error("Workload kind is missing");
    kinds[index] = kinds[selected] ?? value;
    kinds[selected] = value;
  }
  const entries = kinds.map((kind, index): WorkloadEntry => {
    const updateId = 10_000 + index;
    const payload = `${kind}-${updateId}`;
    const user = { first_name: "Benchmark", id: 17, is_bot: false };
    if (kind === "callback") {
      return {
        kind,
        payload,
        update: {
          callback_query: {
            chat_instance: "benchmark-chat",
            data: payload,
            from: user,
            id: `query-${updateId}`,
          },
          update_id: updateId,
        },
        updateId,
      };
    }
    const text = kind === "command" ? `/bench ${payload}` : payload;
    return {
      kind,
      payload,
      update: {
        message: {
          chat: { id: 71, type: "private" },
          date: 1_700_000_000,
          ...(kind === "command"
            ? { entities: [{ length: 6, offset: 0, type: "bot_command" }] }
            : {}),
          from: user,
          message_id: updateId,
          text,
        },
        update_id: updateId,
      },
      updateId,
    };
  });
  return { entries, schemaVersion: 1, seed: options.seed };
}

export function makeHeavyWorkload(options: {
  readonly fixtureCount: number;
  readonly seed: number;
}): WorkloadFile {
  const workload = makeWorkload(options);
  const photo = {
    file_id: "benchmark-photo",
    file_unique_id: "benchmark-photo-unique",
    height: 720,
    width: 1280,
  };
  const reply = {
    chat: { id: 71, type: "private" },
    date: 1_699_999_999,
    from: { first_name: "Reply", id: 18, is_bot: false },
    message_id: 9_999,
    photo: [photo],
    text: "nested reply",
  };
  return {
    ...workload,
    entries: workload.entries.map((entry) => {
      if (entry.kind === "callback") {
        const callback = entry.update["callback_query"];
        if (typeof callback !== "object" || callback === null) {
          throw new Error("Callback fixture is missing");
        }
        return {
          ...entry,
          update: {
            ...entry.update,
            callback_query: {
              ...callback,
              message: {
                ...reply,
                message_id: entry.updateId,
                reply_markup: {
                  inline_keyboard: [[{ callback_data: entry.payload, text: "Choose" }]],
                },
              },
            },
          },
        };
      }
      const message = entry.update["message"];
      if (typeof message !== "object" || message === null) {
        throw new Error("Message fixture is missing");
      }
      return {
        ...entry,
        update: {
          ...entry.update,
          message: {
            ...message,
            forward_origin: {
              date: 1_699_999_998,
              sender_user: { first_name: "Forwarded", id: 19, is_bot: false },
              type: "user",
            },
            photo: [photo, { ...photo, height: 1080, width: 1920 }],
            reply_to_message: reply,
          },
        },
      };
    }),
  };
}

export function expectedTotals(
  entries: ReadonlyArray<WorkloadEntry>,
  operations: number,
): WorkloadTotals {
  const totals = { callback: 0, checksum: 0, command: 0, text: 0 };
  for (let index = 0; index < operations; index += 1) {
    const entry = entries[index % entries.length];
    if (entry === undefined) throw new Error("Workload entry is missing");
    totals[entry.kind] += 1;
    totals.checksum = foldChecksum(
      totals.checksum,
      entry.kind,
      entry.payload,
      entry.updateId,
    );
  }
  return totals;
}
