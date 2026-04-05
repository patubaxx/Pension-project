import { STATFIN_PENSION_ASSETS } from "./sourceConstants";
import type { StatfinJsonStat2Dataset } from "./rawStatfinSchema";
import { statfinJsonStat2DatasetSchema } from "./rawStatfinSchema";
import type { ProcessedPensionAssetsFile } from "./processedSchema";

export function validateRawStatfinDataset(
  data: unknown
): StatfinJsonStat2Dataset {
  return statfinJsonStat2DatasetSchema.parse(data);
}

/**
 * Map PxWeb JSON-stat2 response to ordered annual observations.
 * Expects a single time dimension (Vuosi) with values aligned to `dataset.value` order.
 */
export function extractYearSeriesFromStatfin(
  dataset: StatfinJsonStat2Dataset
): { year: number; assetsMillionEur: number }[] {
  const indexMap = dataset.dimension.Vuosi.category.index;
  const entries = Object.entries(indexMap).sort((a, b) => a[1] - b[1]);

  const series: { year: number; assetsMillionEur: number }[] = [];
  for (let i = 0; i < entries.length; i++) {
    const [yearStr] = entries[i];
    const year = Number.parseInt(yearStr, 10);
    const rawVal = dataset.value[i];
    if (rawVal == null || Number.isNaN(year)) continue;
    series.push({ year, assetsMillionEur: rawVal });
  }

  return series;
}

export function buildProcessedPensionAssetsFile(
  rawUnknown: unknown,
  retrievedAtIso: string
): ProcessedPensionAssetsFile {
  const validated = validateRawStatfinDataset(rawUnknown);
  const series = extractYearSeriesFromStatfin(validated);

  if (series.length === 0) {
    throw new Error("StatFin extract produced no observations");
  }

  return {
    schemaVersion: 1,
    source: {
      provider: STATFIN_PENSION_ASSETS.providerEn,
      datasetId: STATFIN_PENSION_ASSETS.pxTableId,
      datasetTitle: STATFIN_PENSION_ASSETS.datasetTitleEn,
      seriesDefinition: STATFIN_PENSION_ASSETS.seriesDefinitionEn,
      documentationUrl: STATFIN_PENSION_ASSETS.documentationUrl,
      pxWebTableUrl: STATFIN_PENSION_ASSETS.pxWebUiUrl,
      retrievedAt: retrievedAtIso,
      notes: [
        "National financial accounts, ESA 2010. Sector S13141 = employment pension schemes.",
        "Instrument F0 = total financial assets (stock, million EUR). Latest year may be revised in subsequent releases.",
      ],
    },
    unit: "MEUR_STOCK",
    series,
  };
}
