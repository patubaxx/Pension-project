import "server-only";

import type { AppLocale } from "@/lib/i18n/routing";
import { runFundingPipeline } from "@/lib/data";
import type { HomeStoryViewModel } from "../model/types";
import { toFundingOverviewViewModel } from "../transforms/toFundingOverview";

export async function loadHomeStoryViewModel(
  locale: AppLocale
): Promise<HomeStoryViewModel> {
  try {
    const { processed } = await runFundingPipeline();
    return {
      fundingOverview: toFundingOverviewViewModel(processed, locale),
    };
  } catch {
    return { fundingOverview: null };
  }
}
