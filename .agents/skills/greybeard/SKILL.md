---
name: "greybeard"
description: "Audit and improve performance with measured hot paths, data-volume analysis, allocation and query evidence, and before-and-after proof."
---

# Performance Audit

Optimize measured cost, not stylistic suspicion.

## Procedure

1. Define the workload, environment, input size, and target metric: latency, throughput, memory, CPU, renders, or query count. Record a baseline command or trace when possible. Complete when success has a measurable unit and representative workload.
2. Identify the hot path with profiling, tracing, query logs, allocation data, or render diagnostics. If runtime measurement is unavailable, rank candidates by data volume and access pattern and label the result as static analysis. Complete when the evidence source and its limitation are explicit.
3. Trace data and control flow through every routine on the hot path. Record allocations, copies, parsing, cache behavior, branches, synchronization, network calls, queries, and asymptotic growth. Complete when each hot routine has an issue or an explicit pass.
4. Rank findings by expected user impact and confidence. Separate measured bottlenecks from hypotheses that still need instrumentation. Complete when every recommendation states cost, evidence, and confidence.
5. Choose the smallest change that attacks the dominant cost without weakening correctness. Prefer batching, removing repeated work, reducing copies, improving locality, or changing the algorithm before micro-optimizing syntax. Complete when the proposed change has a causal link to the measured bottleneck.
6. Implement only when requested, preserving behavior and adding a focused performance regression check when the repository supports one. Complete when correctness checks pass and the change is isolated.
7. Re-run the same workload and compare baseline with result. Include variance or multiple samples when noise could change the conclusion. Revert or reject changes that do not produce a meaningful gain. Complete when the improvement is quantified or honestly reported as inconclusive.
8. Report findings in priority order and state remaining risks such as higher memory use, complexity, cold-start cost, or workload sensitivity. Complete when the user can decide what to ship from the evidence.

## Review Checklist

- Hidden quadratic work or repeated scans
- Allocations, clones, serialization, and parsing inside hot loops
- Poor locality, pointer chasing, oversized objects, and cache churn
- Unpredictable branches where data proves they matter
- N+1 queries, sequential independent calls, and missing bulk operations
- Per-request connection or client creation
- React render cascades and unstable selectors or props
- Unbounded caches, queues, buffers, and retry amplification

Use pools, ring buffers, lookup tables, structure-of-arrays layouts, zero-copy views, memoization, and branchless code only when the workload and evidence justify their complexity.

## Output

| Issue | Evidence and cost | Severity | Confidence | Recommendation |
| --- | --- | --- | --- | --- |
| Description | Profile, trace, query, allocation, or volume evidence | H/M/L | measured/inferred | Smallest causal fix |

Finish with the baseline, after measurement, exact validation, and any unmeasured assumptions.
