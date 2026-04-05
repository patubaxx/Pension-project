import type { ProcessedPensionAssetsFile } from "@/lib/data";
import type { AppLocale } from "@/lib/i18n/routing";
import { formatBillionsFromMillionEur } from "@/lib/formatting";
import type { FundingOverviewViewModel } from "../model/types";

export function toFundingOverviewViewModel(
  processed: ProcessedPensionAssetsFile,
  locale: AppLocale
): FundingOverviewViewModel {
  const series = processed.series;
  const latest = series[series.length - 1];
  const first = series[0];

  return {
    latestYear: latest.year,
    latestFormatted: formatBillionsFromMillionEur(
      latest.assetsMillionEur,
      locale
    ),
    firstYear: first.year,
    latestBillions: latest.assetsMillionEur / 1000,
  };
}
