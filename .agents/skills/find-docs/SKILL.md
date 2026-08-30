---
name: "find-docs"
description: "Fetch current library documentation and code examples through the Context7 CLI when an API, config option, or version behavior is uncertain or newer than training data."
---

# Find Docs

Context7 through the `ctx7` CLI, never the MCP server. One `docs` call returns 3–4 KB (~1k tokens, observed 2026-08); no tool schemas ride along in every session.

## When

- API signature, config option, migration, or CLI flag that training data may have wrong, or a library released or majorly bumped after the cutoff.
- Not for well-known stable APIs already in hand, general concepts, or business-logic debugging.

## Procedure

1. Resolve the ID. Official name with punctuation (`Next.js`, `Three.js`); the query steers ranking.

   ```bash
   bunx ctx7@latest library "<name>" "<what to look up>"
   ```

   Pick by exact name, then Source Reputation High, then Benchmark Score, then Code Snippets. Version-pinned IDs look like `/org/project/v1.2.3`. Skip this step only when the ID is already known in `/org/project` form.
2. Fetch docs, one topic per call.

   ```bash
   bunx ctx7@latest docs /org/project "<single-topic question>"
   ```

   Multi-topic questions dilute ranking; split them unless the question is about the interaction. Max 3 calls per question, then answer with the best result.
3. Need a hard size cap or JSON: hit the API directly (works unauthenticated).

   ```bash
   curl -s 'https://context7.com/api/v2/context?libraryId=/org/project&query=<url-encoded>&tokens=2000'
   ```

## Limits

- Works logged out. `CONTEXT7_API_KEY` or `bunx ctx7@latest login` raises quota; creds land in `~/.config/context7/credentials.json`.
- Quota error → say so and answer from training data flagged as possibly stale. Never fall back silently.
- Never put secrets or proprietary code in a query. `CTX7_TELEMETRY_DISABLED=1` opts out of telemetry.
