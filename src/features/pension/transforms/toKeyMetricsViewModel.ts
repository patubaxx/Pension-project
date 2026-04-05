import type { ProcessedPensionAssetsFile } from "@/lib/data";
import type { AppLocale } from "@/lib/i18n/routing";
import {
  formatBillionsFromMillionEur,
  formatPercentRatio,
} from "@/lib/formatting";
import type { KeyMetricsViewModel } from "../model/types";

export function toKeyMetricsViewModel(
  processed: ProcessedPensionAssetsFile,
  locale: AppLocale
): KeyMetricsViewModel {
  const series = processed.series;
  const latest = series[series.length - 1];
  const baseline = series[0];
  const growthRatio =
    baseline.assetsMillionEur > 0
      ? (latest.assetsMillionEur - baseline.assetsMillionEur) /
        baseline.assetsMillionEur
      : 0;

  return {
    latestYear: latest.year,
    latestFormatted: formatBillionsFromMillionEur(
      latest.assetsMillionEur,
      locale
    ),
    baselineYear: baseline.year,
    growthRatio,
    growthFormatted: formatPercentRatio(growthRatio, locale),
    yearCount: series.length,
  };
}
