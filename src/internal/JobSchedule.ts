export function nextJobOccurrence(
  scheduledTimeMs: number,
  intervalMs: number,
  now: number,
): number {
  const elapsed = Math.max(0, now - scheduledTimeMs);
  const next = scheduledTimeMs + (Math.floor(elapsed / intervalMs) + 1) * intervalMs;
  if (!Number.isSafeInteger(next)) throw new RangeError("Next job time exceeds safe integers");
  return next;
}
