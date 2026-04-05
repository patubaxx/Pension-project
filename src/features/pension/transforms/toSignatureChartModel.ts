import type { ProcessedPensionAssetsFile } from "@/lib/data";
import type { SignatureChartViewModel } from "../model/types";

export function toSignatureChartViewModel(
  processed: ProcessedPensionAssetsFile
): SignatureChartViewModel {
  const points = processed.series.map((row) => ({
    year: row.year,
    valueBillionEur: row.assetsMillionEur / 1000,
  }));

  return {
    points,
    retrievedAt: processed.source.retrievedAt,
  };
}
