import "server-only";

import type { AppLocale } from "@/lib/i18n/routing";
import {
  loadProcessedPensionAssets,
  loadProcessedPensionFundingFlows,
} from "@/lib/data";
import type { HomeStoryViewModel } from "../model/types";
import { toFundingFlowsSectionViewModel } from "../transforms/toFundingFlowsViewModels";
import { toFundingOverviewViewModel } from "../transforms/toFundingOverview";
import { toKeyMetricsViewModel } from "../transforms/toKeyMetricsViewModel";
import { toSignatureChartViewModel } from "../transforms/toSignatureChartModel";

export async function loadHomeStoryViewModel(
  locale: AppLocale
): Promise<HomeStoryViewModel> {
  const [processedAssets, processedFlows] = await Promise.all([
    loadProcessedPensionAssets(),
    loadProcessedPensionFundingFlows(),
  ]);

  return {
    fundingOverview: toFundingOverviewViewModel(processedAssets, locale),
    signatureChart: toSignatureChartViewModel(processedAssets),
    fundingFlows: toFundingFlowsSectionViewModel(processedFlows),
    keyMetrics: toKeyMetricsViewModel(processedAssets, locale),
  };
}
