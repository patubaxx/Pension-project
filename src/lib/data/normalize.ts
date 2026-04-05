import type { RawFundingSnapshot } from "./schemas";
import type { ProcessedFundingSnapshot } from "./types";

export function normalizeFundingSnapshot(
  raw: RawFundingSnapshot
): ProcessedFundingSnapshot {
  return {
    asOfYear: raw.asOfYear,
    totalAssetsBillionEur: raw.totalAssetsBillionEur,
    sourceNote: raw.sourceNote.trim(),
  };
}
