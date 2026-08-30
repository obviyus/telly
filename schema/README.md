# Bot API schema

`sources/dofer/spec.json` is the complete pinned input snapshot for Bot API 10.3. It is not yet Telly's permanent normalized format.

`sources/manifest.json` records the primary source and the independent source used to confirm its type and method inventory.

`spec.ts` is the single check interface. It preserves unknown fields and verifies provenance, version, names, and type references.

Run `bun run schema:check` to validate the checked-in snapshot without network access.
