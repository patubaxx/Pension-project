import type { AppLocale } from "@/lib/i18n/routing";
import { formatBillionEur } from "@/lib/formatting";
import type { ProcessedFundingSnapshot } from "@/lib/data";
import type { FundingOverviewViewModel } from "../model/types";

export function toFundingOverviewViewModel(
  processed: ProcessedFundingSnapshot,
  locale: AppLocale
): FundingOverviewViewModel {
  return {
    asOfYear: processed.asOfYear,
    formattedAssetsCompact: formatBillionEur(
      processed.totalAssetsBillionEur,
      locale
    ),
    sourceNote: processed.sourceNote,
  };
}
