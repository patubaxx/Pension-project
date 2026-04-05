import "server-only";

import type { AppLocale } from "@/lib/i18n/routing";
import { loadProcessedPensionAssets } from "@/lib/data";
import type { HomeStoryViewModel } from "../model/types";
import { toFundingOverviewViewModel } from "../transforms/toFundingOverview";
import { toKeyMetricsViewModel } from "../transforms/toKeyMetricsViewModel";
import { toSignatureChartViewModel } from "../transforms/toSignatureChartModel";

export async function loadHomeStoryViewModel(
  locale: AppLocale
): Promise<HomeStoryViewModel> {
  const processed = await loadProcessedPensionAssets();

  return {
    fundingOverview: toFundingOverviewViewModel(processed, locale),
    signatureChart: toSignatureChartViewModel(processed),
    keyMetrics: toKeyMetricsViewModel(processed, locale),
  };
}
