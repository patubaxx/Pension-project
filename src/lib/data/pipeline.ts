import "server-only";

import { loadRawFundingSnapshotJson } from "./raw";
import type { ProcessedFundingSnapshot } from "./types";
import type { FundingSeriesPoint } from "./types";
import { normalizeFundingSnapshot } from "./normalize";
import { toFundingSeriesSkeleton } from "./transform";
import { validateFundingSnapshot } from "./validate";

export type FundingPipelineResult = {
  processed: ProcessedFundingSnapshot;
  seriesSkeleton: FundingSeriesPoint[];
};

export async function runFundingPipeline(): Promise<FundingPipelineResult> {
  const rawJson = await loadRawFundingSnapshotJson();
  const validated = validateFundingSnapshot(rawJson);
  const processed = normalizeFundingSnapshot(validated);
  const seriesSkeleton = toFundingSeriesSkeleton(processed);
  return { processed, seriesSkeleton };
}
