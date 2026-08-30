# Telly

- Read `VISION.md` before you change product scope, architecture, the Bot API schema pipeline, a runtime contract, the public interface, packaging, or acceptance criteria. It owns those decisions and their `Done when` conditions.

## Preflight

- Define a checkable done condition before implementation. Stop when it passes.
- Before adopting an Effect, Bun, Telegram, testing, code generation, documentation, or release approach, run `bunx skills find "<topic>"` and inspect each candidate's source, freshness, and license. Reuse a sound skill over new local guidance.

## Skill routing

- Use the smallest set of skills whose triggers match the task. State the order when more than one applies.
- Read each selected `SKILL.md` completely before acting. Follow its linked references only when its routing requires them.

### Design

- Fable session before substantial work → `$fable-orchestrator`.
- Effect repository setup or dependency changes → `$effect-ts`.
- Module interface, seam, depth, or testability design → `$codebase-design`.
- Domain terms, `CONTEXT.md`, or an architecture decision record → `$domain-modeling`.

### Evidence

- Bug, regression, flaky behavior, or outage → `$debug-agent`.
- Performance or resource-cost work → `$greybeard`. Record the same representative workload before and after the change.
- Uncertain current library interface or version behavior → `$find-docs`.
- Test design, doubles, brittleness, or flakiness → `$testing-on-the-toilet`.
- Live Telegram claim → `$telegram-e2e-userbot` after a Telly harness exists. Until then, adapt the harness without claiming proof.

### Review and structure

- Every non-trivial module or interface change, and any duplicate path or accidental special case → `$distill` before review.
- `AGENTS.md`, `CLAUDE.md`, or skill authoring → `$writing-for-agents`.
- Explicit structured code-review request → `$autoreview`.
- Claude request or high-leverage architecture decision → `$claude-consult`.
- Any selected skill that delegates an external agent process → `$agent-supervisor`.

## Effect v4

- Before writing Effect code, read `node_modules/effect/AGENTS.md` completely. Resolve uncertain behavior from the installed Effect source and current upstream documentation.
- Use `Effect.fn` for named operations and `Effect.gen` for sequential logic.
- Use `Schema` for untrusted Telegram data and public domain models.
- Use `Context.Service` and `Layer` for real seams such as transport, persistence, clocks, inboxes, and job stores.
- Keep expected failures in typed error channels. Preserve defects as defects.
- Use `Scope`, interruption, `Stream`, and `Schedule` for lifecycle, updates, and retry policy.

## Bot API schema

- Change normalized schema inputs or the override file, then regenerate. Generated output comes only from the generator.
- Correct nested upload fields that the source types as `String` in `overrides.fields`. Preserve the hashed source snapshot.

## Tests

- Test observable behavior through public interfaces. A test must fail on a real behavior bug and survive a behavior-preserving refactor.
- Prefer real objects, then maintained fakes, then stubs. Use mocks only when the interaction is the contract.
- Drive time, randomness, and transport with deterministic Effect services in unit tests.
- Keep scenario inputs and expected outputs visible. Use narrow assertions and distinct values.
- Prove each new test can fail before accepting it.
- Use the hermetic Bot API fake for protocol behavior and Telegram's Test Server for live claims. Record a structured event timeline for every live claim and update the coverage manifest.
- A live run that cannot execute records a `blocked` entry in `bot-api/proofs/manifest.json` with Telegram's exact error and an absolute `expires_on` date.

## Safety

- Hold bot tokens and other secrets in `Redacted` values. Keep them out of fixtures, test names, and proof artifacts.
- Run live Telegram proof only through a leased Test Server harness with cleanup and redacted evidence.

## Completion

- Run `bun run check` before handoff. Run targeted behavior tests for every changed contract.
- Update reference data and documentation in the same change as a public contract.
- Report any validation that could not run and the exact reason.
