export function invertKeys<const Mapping extends Readonly<Record<string, string>>>(
  mapping: Mapping,
): { readonly [Key in keyof Mapping as Mapping[Key]]: Key };
export function invertKeys(
  mapping: Readonly<Record<string, string>>,
): Readonly<Record<string, string>> {
  return Object.fromEntries(Object.entries(mapping).map(([key, value]) => [value, key]));
}
