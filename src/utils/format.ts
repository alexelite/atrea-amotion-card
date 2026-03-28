export function clampPercent(value: number | null): number | null {
  if (value === null || Number.isNaN(value)) {
    return null;
  }
  return Math.min(100, Math.max(0, value));
}

export function formatNumber(value: number | null, decimals = 0): string {
  if (value === null || Number.isNaN(value)) {
    return "--";
  }
  return value.toFixed(decimals);
}

export function formatValueWithUnit(value: number | null, unit: string | null, decimals = 0): string {
  if (value === null || Number.isNaN(value)) {
    return "--";
  }
  const suffix = unit ? ` ${unit}` : "";
  return `${value.toFixed(decimals)}${suffix}`;
}

export function titleCase(value: string): string {
  return value
    .replace(/[_-]+/g, " ")
    .trim()
    .replace(/\b\w/g, (character) => character.toUpperCase());
}
