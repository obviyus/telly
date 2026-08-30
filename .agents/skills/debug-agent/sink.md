# Temporary Log Sink

For logs that must cross runtime boundaries: browser to agent, worker to local file, distributed callback flow, or UI timing issue.

If a `debug-agent` CLI is available, start it in the background:

```sh
bunx debug-agent 2>&1 &
```

Capture `sessionId`, `endpoint`, and `logPath` from startup output. If startup fails, stop; fix the CLI setup or switch the evidence plan to existing logs before editing code.

JS/TS instrumentation shape:

```js
// #region debug log
fetch("ENDPOINT", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    sessionId: "SESSION_ID",
    runId: "pre-fix",
    hypothesisId: "H1",
    location: "file.ts:42",
    message: "branch selected",
    data: { value },
    time: Date.now(),
  }),
}).catch(() => {});
// #endregion
```

Before each repro, clear only this session's log through the sink API or exact `logPath`. Never touch other session logs.

After each repro, read `logPath` as NDJSON and cite line numbers when accepting or rejecting hypotheses.
