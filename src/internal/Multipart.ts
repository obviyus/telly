import { Predicate } from "effect";

export type RequestBody =
  | { readonly _tag: "Json"; readonly body: object }
  | { readonly _tag: "FormData"; readonly body: FormData };

interface Attachment {
  readonly blob: Blob;
  readonly name: string;
}

function containsBlob(value: unknown): boolean {
  if (value instanceof Blob) return true;
  if (Array.isArray(value)) {
    for (const item of value) {
      if (containsBlob(item)) return true;
    }
    return false;
  }
  if (Predicate.isObject(value)) {
    for (const key in value) {
      if (Object.hasOwn(value, key) && containsBlob(value[key])) return true;
    }
  }
  return false;
}

export function requestBody(params: object): RequestBody {
  if (!containsBlob(params)) {
    return { _tag: "Json", body: params };
  }
  const attachments: Array<Attachment> = [];
  const attachmentNames = new Map<Blob, string>();
  const usedNames = new Set(Object.keys(params));
  let attachmentIndex = 0;

  const addAttachment = (blob: Blob, preferredName?: string) => {
    const existing = attachmentNames.get(blob);
    if (existing !== undefined) return existing;
    let name = preferredName;
    if (name === undefined) {
      do {
        name = `file${attachmentIndex}`;
        attachmentIndex += 1;
      } while (usedNames.has(name));
    }
    usedNames.add(name);
    attachmentNames.set(blob, name);
    attachments.push({ blob, name });
    return name;
  };

  const replaceNestedFiles = (value: unknown): unknown => {
    if (value instanceof Blob) {
      return `attach://${addAttachment(value)}`;
    }
    if (Array.isArray(value)) {
      return value.map(replaceNestedFiles);
    }
    if (Predicate.isObject(value)) {
      return Object.fromEntries(
        Object.entries(value).map(([key, item]) => [key, replaceNestedFiles(item)]),
      );
    }
    return value;
  };

  const transformed: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(params)) {
    if (value instanceof Blob) {
      const existing = attachmentNames.get(value);
      if (existing === undefined) {
        addAttachment(value, key);
      } else {
        transformed[key] = `attach://${existing}`;
      }
    } else {
      transformed[key] = replaceNestedFiles(value);
    }
  }

  const body = new FormData();
  for (const [key, value] of Object.entries(transformed)) {
    if (value === undefined) continue;
    if (typeof value === "string") {
      body.append(key, value);
    } else if (typeof value === "number" || typeof value === "boolean") {
      body.append(key, String(value));
    } else {
      body.append(key, JSON.stringify(value));
    }
  }
  for (const attachment of attachments) {
    const fileName = attachment.blob instanceof File ? attachment.blob.name : attachment.name;
    body.append(attachment.name, attachment.blob, fileName);
  }
  return { _tag: "FormData", body };
}
