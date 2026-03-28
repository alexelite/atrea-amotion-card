export function fanAnimationDuration(speedPercent: number | null): string {
  if (speedPercent === null || speedPercent <= 0) {
    return "0s";
  }
  const normalized = Math.min(100, Math.max(0, speedPercent));
  const duration = 2.8 - normalized * 0.022;
  return `${Math.max(0.5, duration).toFixed(2)}s`;
}

export function flowAnimationDuration(speedPercent: number | null): string {
  if (speedPercent === null || speedPercent <= 0) {
    return "0s";
  }
  const normalized = Math.min(100, Math.max(0, speedPercent));
  const duration = 4.2 - normalized * 0.03;
  return `${Math.max(0.9, duration).toFixed(2)}s`;
}
