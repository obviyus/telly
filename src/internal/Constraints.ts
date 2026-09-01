import type * as Schema from "effect/Schema";

interface Bounds {
  readonly maximum?: number;
  readonly minimum?: number;
}

export type Constraint =
  | ({ readonly kind: "codePoints" } & Bounds)
  | ({ readonly kind: "items" } & Bounds)
  | ({ readonly kind: "range" } & Bounds)
  | ({ readonly kind: "utf8Bytes" } & Bounds)
  | { readonly expected: string; readonly kind: "pattern"; readonly source: string };

export type FieldConstraints = ReadonlyArray<
  readonly [field: string, checks: ReadonlyArray<Constraint>]
>;

const encoder = new TextEncoder();
const patterns = new Map<string, RegExp>();

function range(bounds: Bounds, unit: string): string {
  if (bounds.minimum !== undefined && bounds.maximum !== undefined) {
    return `${bounds.minimum}–${bounds.maximum}${unit}`;
  }
  if (bounds.minimum !== undefined) return `at least ${bounds.minimum}${unit}`;
  return `at most ${String(bounds.maximum)}${unit}`;
}

function measured(
  bounds: Bounds,
  unit: string,
  received: number,
): string | undefined {
  if (
    bounds.minimum !== undefined && received < bounds.minimum ||
    bounds.maximum !== undefined && received > bounds.maximum
  ) {
    return `expected ${range(bounds, unit)}, received ${received}`;
  }
  return undefined;
}

function check(value: unknown, constraint: Constraint): string | undefined {
  switch (constraint.kind) {
    case "codePoints":
      return typeof value === "string"
        ? measured(constraint, " characters", [...value].length)
        : undefined;
    case "items":
      return Array.isArray(value)
        ? measured(constraint, " items", value.length)
        : undefined;
    case "range":
      if (typeof value !== "number") return undefined;
      return Number.isFinite(value)
        ? measured(constraint, "", value)
        : `expected ${range(constraint, "")}, received ${String(value)}`;
    case "utf8Bytes":
      return typeof value === "string"
        ? measured(constraint, " UTF-8 bytes", encoder.encode(value).byteLength)
        : undefined;
    case "pattern": {
      if (typeof value !== "string") return undefined;
      let pattern = patterns.get(constraint.source);
      if (pattern === undefined) {
        pattern = new RegExp(constraint.source, "u");
        patterns.set(constraint.source, pattern);
      }
      return pattern.test(value) ? undefined : `expected ${constraint.expected}`;
    }
  }
}

export function fields(
  input: object,
  constraints: FieldConstraints,
): Schema.FilterIssue | undefined {
  for (const [field, checks] of constraints) {
    const value = Reflect.get(input, field);
    if (value === undefined) continue;
    for (const constraint of checks) {
      const issue = check(value, constraint);
      if (issue !== undefined) return { issue, path: [field] };
    }
  }
  return undefined;
}
