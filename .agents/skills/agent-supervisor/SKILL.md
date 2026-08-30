---
name: "agent-supervisor"
description: "Supervise delegated agent processes with foreground tracking, private artifacts, activity heartbeats, signal forwarding, and exact exit status. Use as shared runtime guidance whenever another skill delegates work."
---

# Agent Supervisor

Shared runtime reference. Calling skills resolve `scripts/supervise.ts` directly and own their task-specific workflow.

The runner:

- keeps the delegated process in the foreground
- writes private stdout and stderr artifacts incrementally
- emits compact activity and silence heartbeats
- forwards signals and the child's exact exit status
