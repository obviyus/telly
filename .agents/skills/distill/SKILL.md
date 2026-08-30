---
name: "distill"
description: "Simplify code structure by proving and eliminating accidental special cases, duplicated paths, and redundant state without sacrificing behavior."
---

# Structural Distillation

Eliminate accidental special cases by changing the model, not by golfing the code.

## Procedure

1. Define the target surface and its observable behavior. Read its callers, tests, invariants, and data shapes before proposing a refactor. Complete when the behavior that must remain unchanged is explicit.
2. Map divergent paths: special first/last cases, duplicated normal and fallback logic, repeated null handling, split initialization and iteration, and states that exist only to route control flow. Complete when each divergence has a concrete location and purpose.
3. Classify every divergence as either genuinely distinct behavior or accidental structure. Use caller contracts and tests as evidence; do not erase domain differences merely because their code looks similar. Complete when every candidate has a stated invariant that supports keeping or unifying it.
4. Design the smallest unifying representation. Consider a common loop shape, a sentinel, a shared transition, an explicit sum type, or one normalized input path. Prefer the form that makes invalid states harder to express. Complete when the proposed model removes a branch without hiding its behavior.
5. Implement one coherent simplification at a time. Preserve public contracts unless the task explicitly changes them, and avoid unrelated cleanup. Complete when the diff expresses one structural idea and remains reviewable.
6. Verify existing behavior with focused tests, then add or adjust a regression test for the collapsed edge when practical. Inspect the full diff and run `git diff --check`. Complete when the same behavior passes through the unified path and no accidental surface changed.
7. Report the old special case, the unifying insight, the new structure, validation, and any readability or performance tradeoff. Complete when every targeted divergence is unified or justified as genuinely distinct.

## Useful Patterns

- Make the first iteration structurally identical to later iterations.
- Normalize inputs once instead of branching throughout the pipeline.
- Replace duplicate state transitions with one transition table or function.
- Use sentinels when they simplify boundaries without introducing fake domain values.
- Use explicit variants instead of repeated nullable-field combinations.

Treat null objects, pointer indirection, branchless expressions, and algebraic rewrites as options, not goals. Reject a shorter result when it obscures invariants, weakens types, or makes debugging harder.
