import type { ProcessedFundingSnapshot } from "./types";
import type { FundingSeriesPoint } from "./types";

/** Map processed snapshot to a minimal series for future charts (skeleton). */
export function toFundingSeriesSkeleton(
  processed: ProcessedFundingSnapshot
): FundingSeriesPoint[] {
  return [
    {
      year: processed.asOfYear,
      valueBillionEur: processed.totalAssetsBillionEur,
    },
  ];
}
