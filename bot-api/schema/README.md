# Bot API schema

`sources/dofer/spec.json` is the complete pinned input snapshot for Bot API 10.3. It is not yet Telly's permanent normalized format.

`sources/manifest.json` records the primary source and the independent source used to confirm its type and method inventory.

`spec.ts` is the single check interface. It preserves unknown fields and verifies provenance, version, names, and type references.

`generator.ts` converts the checked source, `overrides.json`, and `../proofs/manifest.json` into the public type Schemas, enabled methods, and method coverage.

`overrides.json` records type corrections and explicit retry safety metadata for every enabled method. Method `retry_safe` states whether retrying after an unknown outcome is guaranteed not to duplicate a side effect.

- Run `bun run schema:generate` after a schema, override, enabled-method, or proof change.
- Run `bun run schema:check` to validate the source and confirm every generated file is current.
