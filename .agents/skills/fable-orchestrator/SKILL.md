---
name: fable-orchestrator
description: "Fable-as-orchestrator operating contract: route loops and labor out of the main context, arm waits instead of polling, wake discipline, session hygiene. Invoke at session start before substantial work."
---

# Fable Orchestrator

Gate: session model is Fable → apply. Any other model → stop here and work normally.

Every main-loop turn re-reads the whole session as cache reads; cache reads were 9.17B of 9.36B billed tokens across 58 sessions (observed 2026-08). Cost ≈ turns × context, so the contract is: Fable decides, specifies, and reviews in the main loop; loops and labor run outside it.

## Route work out

- Hands-on implementation, fixes, tests, git mechanics → `$codex-first`.
- Verify / E2E / proof / review cycles → one subagent (or one tracked worker) owns the whole loop and returns a verdict. The loop's turns bill at the subagent's small context, not the session's.
- Screenshot and UI judgment → subagent reads the images, returns a text verdict. A PNG read into the main loop is re-billed on every later turn — one 294KB image rode ~900 turns of cache reads (observed 2026-08).
- Mechanical sweeps and low-judgment loops → Codex worker (flat-rate; medium effort, fast mode per `$codex-first`). Claude subagents only for work that cannot leave the harness: MCP/browser tools, `bws` secrets, artifacts already in-session.
- Main loop reads conclusions: long diffs, logs, and JSON go to a file plus a head-capped or subagent summary.

## Armed waits

A wait is **armed** when completion re-invokes Fable with zero turns spent: one harness-tracked `run_in_background: true` Bash whose child *is* the worker, setup chained inside. Agent-CLI workers (codex, claude, grok) run under `$agent-supervisor`'s `supervise.ts` as that child — exact exit propagation, private stderr artifacts, and heartbeats make a single status read answer "how's it going?" without `pgrep`. Arm it, then end the turn — the task-notification resumes work and is the only trigger to read the output.

- Needing `pgrep` to find a worker proves the launch detached (`&`, nohup, launcher fork) — it will never notify. Kill and relaunch tracked. Every "done?" nudge from Ayaan traced to an untracked worker; polling tracked ones billed 17 full-context turns in one session (observed 2026-08, session 657d5489).
- External state the harness can't track (CI, remote queues) → tracked `until` loop or Monitor. Shell-side waiting is free; model-side checking costs a full-context turn each time.

## Wake discipline

- Notifications queue while the turn waits on Ayaan's reply — two finished tasks were delivered only when he next typed (observed 2026-08). So: ask questions *before* arming workers, or end the wait-turn with no question pending.
- A turn that ends with only armed waits outstanding is complete: state what's armed and stop. Silence until the notification is correct behavior.

## Session hygiene

- Handoff at ~400 main-loop turns. One 2,672-turn session billed 1.29B cache reads — 14% of a month's total (observed 2026-08).
