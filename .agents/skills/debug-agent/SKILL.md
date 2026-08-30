---
name: debug-agent
description: "Evidence-first debugging. Use for any bug, regression, flaky behavior, or outage where the root cause must be proven by runtime evidence before patching."
metadata:
  short-description: Evidence-first debugging
---

# Debug Agent

Code inspection gives hypotheses; runtime evidence proves or rejects them.

## Workflow

1. Capture the exact symptom: command, request, UI path, error text, affected input, environment, expected vs actual.
2. Reproduce with the narrowest path available:
   - existing failing test/check
   - direct CLI/API/script repro
   - browser automation for UI bugs
   - user-run steps only when local reproduction needs their environment
   - For UI bugs, trace from the exact route's rendering component. Follow unexplained text through its helper or row field to the producer and precedence tests. For a missing capability, compare a sibling route that has it across trigger, rendered controls, selection behavior, and backing API. Locate symbols first; expand bounded reads only when the chain breaks.
   - If authentication blocks browser automation, inspect the exact route and focused tests. Separate source-confirmed behavior from unverified deployed behavior.
   Complete this step when a repro artifact is captured, or when the blocked runtime boundary and source-only evidence are explicitly recorded.
3. Generate 2-5 concrete hypotheses. Each must name the code path and the observable signal that would prove or reject it.
4. Gather evidence before fixing:
   - existing logs, traces, DB rows, network payloads, screenshots, test output
   - temporary instrumentation only when existing evidence is insufficient
5. Evaluate each hypothesis as `confirmed`, `rejected`, or `unknown`, citing the exact log line, output line, row, event, or screenshot.
6. Patch the confirmed root cause only. Remove speculative guards and changes tied to rejected hypotheses.
7. Verify on the same repro path. For non-trivial fixes, keep instrumentation through one post-fix run and compare before/after evidence.
8. Clean up instrumentation, rerun the scoped check, then summarize root cause and fix in 1-3 lines.

If every hypothesis is rejected, keep the repro, add new hypotheses from a different subsystem, and instrument the next narrow boundary.

## Instrumentation

Prefer the project's existing logger, tracing, metrics, or test diagnostics.

Rules:
- Mark every temporary block with `#region debug log` and `#endregion` using the file's comment syntax.
- Keep logs small: usually 2-6 sites, max 10 without narrowing the problem first.
- Every log maps to a hypothesis.
- Log boundary facts: inputs, normalized values, branch choice, state mutation, external response, thrown error.
- Never log secrets, tokens, credentials, full PII, or large payloads.
- Use structured logs when possible: `{runId, hypothesisId, location, message, data, time}`.
- Put logs at the boundary that distinguishes hypotheses, not everywhere.

For JS/TS without project logging, use console output in the narrow repro process.

For backend/service bugs, prefer logs that survive the real runtime: service logs, request IDs, DB rows, queue messages, trace spans, or a dedicated temp NDJSON file.

## Temporary Log Sink

Logs must cross a runtime boundary (browser to agent, worker to local file, distributed callback, UI timing)? Follow [`sink.md`](sink.md).

## Reproduction

Reuse the first working repro for every iteration.

If the repro is manual:
- give numbered steps
- tell the user exactly when to restart/reload if instrumented files are cached or bundled
- ask for the exact log/output artifact needed, not a vague "done"

If local:
- quote the command
- capture output
- keep the command scoped to the failing surface

## Fix Bar

Patch when evidence identifies the failing value, transition, ordering, or external contract — nothing before that.

Good fixes:
- remove the bad state or bad transition
- unify divergent paths
- align with the project's existing architecture
- add a focused regression check when practical

Bad fixes:
- sleeps, timeouts, retries as timing guesses
- broad try/catch blocks
- fallback chains
- null checks on values guaranteed by schema/types
- compatibility shims unless explicitly required
- comments explaining the obvious

## Cleanup

Before final:

```sh
rg -n "#region debug log|#endregion"
```

Delete each temporary block from `#region debug log` through matching `#endregion`.

Then:

```sh
rg -n "#region debug log|#endregion"
git diff --check
git diff
```

The `rg` rerun must print nothing.

Final answer should include:
- root cause
- evidence used
- files changed
- verification run
- remaining risk, if any
