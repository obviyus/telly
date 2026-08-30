---
name: claude-consult
description: Consult Claude Fable via the claude CLI for an independent second-model review. Use when the user asks to consult Claude, or before a high-leverage architecture, debugging, or PR-risk decision.
---

# Claude Consult

Claude Consult is one Fable-only process, separate from Claude Code subagent delegation. Perform every consultation step in that process and never invoke a subagent. Pass `--model fable` on every initial and resumed command. If Fable is unavailable, stop and report it; never inherit or substitute Opus, Sonnet, or another model.

Use Claude as an independent senior reviewer, not as an oracle. Give Claude concrete context, let it think, push back with new evidence or user objections, then verify useful claims in the real repo before acting.

## Workflow

1. Gather the minimum real context first: current goal, repo path, changed files or PR, constraints, current hypothesis, and the exact question Claude should answer.
2. Resolve the sibling helper at `../agent-supervisor/scripts/supervise.ts`; stop and report a missing dependency instead of falling back to raw Claude. Write the consultation to a private task-local prompt file, then run Claude non-interactively with Fable:

```bash
AGENT_SUPERVISOR_DIR=/absolute/path/to/agent-supervisor
bun run "$AGENT_SUPERVISOR_DIR/scripts/supervise.ts" \
  --label claude-consult \
  --output /absolute/consult.jsonl \
  --stdin-file /absolute/prompt.md \
  -- \
  claude -p --model fable --disallowedTools Agent --output-format stream-json --verbose
```

Do not append `&`, redirect the supervisor, or replace it with a raw `claude` command. The supervisor stores stdout in `consult.jsonl`, stderr in `consult.jsonl.stderr`, emits compact activity after engine events, and emits a heartbeat after 60 seconds of silence.

3. Give the process at least 30 minutes while activity or heartbeats advance. Inspect or interrupt only after multiple missing heartbeats, an obvious subprocess failure, or a user stop request.
4. Read the result and `session_id` from the final event:

```bash
jq -sr 'map(select(.type == "result")) | last | {session_id, subtype, is_error, result}' /absolute/consult.jsonl
```

Require a final result with `is_error != true` and a non-empty `result`.
5. Continue the same consultation for follow-ups:

```bash
bun run "$AGENT_SUPERVISOR_DIR/scripts/supervise.ts" \
  --label claude-consult-followup \
  --output /absolute/followup.jsonl \
  --stdin-file /absolute/followup.md \
  -- \
  claude -p --model fable --disallowedTools Agent --output-format stream-json --verbose --resume <session-id>
```

6. Go back and forth until the recommendation is stable, the disagreement is understood, or the remaining choice is product judgment.
7. Verify Claude's concrete claims against local source, tests, docs, or production read-only evidence as appropriate. Finish with each factual premise marked verified, corrected, or unresolved.
8. For a proposed public issue or similar external artifact, build a publication evidence ledger before requesting the final draft. Record the reproduced configuration, observed behavior, source-proven mechanism, causal exclusions, exact references, duplicate-search results, and untested claims to omit. Constrain the title to the reproduced scope, and separate desired contracts from proposed implementation. Finish with solved behavior removed, adjacent work linked, and every allowed claim classified as verified or explicitly proposed.
9. Audit the title and every body sentence against the ledger, including non-goals and acceptance criteria. Batch all unsupported claims, broad quantifiers, and scope corrections into one resumed request for the complete revised artifact. Finish when no statement exceeds the evidence and every required section is present.
10. Synthesize the decision for the user: what Claude recommended, what you verified, what you accept or reject, and the implementation plan. Finish with remaining product judgments stated explicitly.

## Prompt Shape

Include:
- exact files, PR number, branch, or command output that matters
- user constraints and objections, quoted plainly
- current design and why it feels questionable
- alternatives already considered
- the decision you need from Claude

Ask for:
- root-cause framing
- simplest long-term design
- how Codex and Claude should converge on the implementation
- risks and failure modes
- what to delete or avoid
- concrete recommendation

## Rules

- Use a private prompt file for long prompts and pass it with the supervisor's `--stdin-file`.
- Use `--resume <session-id>` for follow-ups so Claude keeps context.
- Do not expose secrets, tokens, private customer data, or unnecessary message contents in the prompt.
