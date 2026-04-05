import {
  ETK_PENSION_FUNDING_FLOWS,
  INSTITUTION_COMBINED_CODE,
} from "./sourceConstants";
import type { EtkFundingFlowsJsonStat2Dataset } from "./rawEtkSchema";
import { etkFundingFlowsJsonStat2DatasetSchema } from "./rawEtkSchema";
import type { ProcessedPensionFundingFlowsFile } from "./processedSchema";

/** PxWeb Rahavirta codes — see ETK table metadata `valueTexts`. */
const RAHVIRTA = {
  assetsOpening: "100",
  contributions: "120",
  employmentFundShare: "121",
  transfers: "122",
  stateShare: "123",
  pensionBenefitsPaid: "124",
  operatingCosts: "125",
  taxes: "126",
  investmentReturn: "127",
  otherResidual: "128",
  assetsClosing: "200",
} as const;

export function validateRawEtkFundingFlowsDataset(
  data: unknown
): EtkFundingFlowsJsonStat2Dataset {
  return etkFundingFlowsJsonStat2DatasetSchema.parse(data);
}

function linearIndex(
  coords: readonly [number, number, number],
  size: readonly [number, number, number]
): number {
  const [, d1, d2] = size;
  return coords[0] * (d1 * d2) + coords[1] * d2 + coords[2];
}

/** Match PxWeb `decimals: 1` for the derived net to avoid float noise. */
function roundMeurOneDecimal(value: number): number {
  return Math.round(value * 10) / 10;
}

function requireNumber(value: number | null, context: string): number {
  if (value == null || Number.isNaN(value)) {
    throw new Error(`ETK funding flows: missing or null value (${context})`);
  }
  return value;
}

/**
 * Maps ETK PxWeb JSON-stat2 (combined institutions) to annual processed rows.
 *
 * Raw → processed field mapping (Rahavirta):
 * - 120 → contributionsMillionEur (≥ 0)
 * - 127 → investmentReturnsMillionEur (signed)
 * - 124 → pensionExpenditureMillionEur (|raw|, benefit outflows are negative in source)
 * - 100 / 200 → opening / closing pension assets (stock, MEUR)
 * - 121, 122, 123 → signed inflows/adjustments as published
 * - 125, 126 → operatingExpensesMillionEur, taxesMillionEur (|raw|)
 * - 128 → otherAdjustmentMillionEur (signed residual)
 */
export function buildProcessedPensionFundingFlowsFile(
  rawUnknown: unknown,
  retrievedAtIso: string
): ProcessedPensionFundingFlowsFile {
  const dataset = validateRawEtkFundingFlowsDataset(rawUnknown);
  const size = dataset.size;
  const instIndices = Object.keys(
    dataset.dimension["Eläkelaki (Vastuulaitos)"].category.index
  );
  if (
    instIndices.length !== 1 ||
    instIndices[0] !== INSTITUTION_COMBINED_CODE
  ) {
    throw new Error(
      `ETK funding flows: expected single institution slice ${INSTITUTION_COMBINED_CODE}, got ${instIndices.join(",")}`
    );
  }
  const instIdx = 0;

  const vuosiIndex = dataset.dimension.Vuosi.category.index;
  const rahIndex = dataset.dimension.Rahavirta.category.index;

  const yearEntries = Object.entries(vuosiIndex).sort((a, b) => a[1] - b[1]);

  const series: ProcessedPensionFundingFlowsFile["series"] = [];

  for (const [yearStr, yIdx] of yearEntries) {
    const year = Number.parseInt(yearStr, 10);
    if (Number.isNaN(year)) continue;

    const getRah = (code: string): number => {
      const rIdx = rahIndex[code];
      if (rIdx === undefined) {
        throw new Error(`ETK funding flows: missing Rahavirta index for ${code}`);
      }
      const idx = linearIndex([yIdx, rIdx, instIdx], size);
      return requireNumber(dataset.value[idx], `year ${year}, Rahavirta ${code}`);
    };

    const rawContributions = getRah(RAHVIRTA.contributions);
    const rawPensionPaid = getRah(RAHVIRTA.pensionBenefitsPaid);
    const rawInvestment = getRah(RAHVIRTA.investmentReturn);
    const rawOperating = getRah(RAHVIRTA.operatingCosts);
    const rawTaxes = getRah(RAHVIRTA.taxes);

    if (rawContributions < 0) {
      throw new Error(
        `ETK funding flows: unexpected negative Vakuutusmaksut in ${year}`
      );
    }

    const contributionsMillionEur = rawContributions;
    const pensionExpenditureMillionEur = Math.abs(rawPensionPaid);
    const investmentReturnsMillionEur = rawInvestment;

    const netCashFlowMillionEur = roundMeurOneDecimal(
      contributionsMillionEur +
        investmentReturnsMillionEur -
        pensionExpenditureMillionEur
    );

    series.push({
      year,
      contributionsMillionEur,
      investmentReturnsMillionEur,
      pensionExpenditureMillionEur,
      pensionAssetsOpeningMillionEur: getRah(RAHVIRTA.assetsOpening),
      pensionAssetsClosingMillionEur: getRah(RAHVIRTA.assetsClosing),
      employmentFundShareMillionEur: getRah(RAHVIRTA.employmentFundShare),
      transfersMillionEur: getRah(RAHVIRTA.transfers),
      stateShareMillionEur: getRah(RAHVIRTA.stateShare),
      operatingExpensesMillionEur: Math.abs(rawOperating),
      taxesMillionEur: Math.abs(rawTaxes),
      otherAdjustmentMillionEur: getRah(RAHVIRTA.otherResidual),
      netCashFlowMillionEur,
    });
  }

  if (series.length === 0) {
    throw new Error("ETK funding flows: extract produced no observations");
  }

  return {
    schemaVersion: 1,
    unit: "MEUR",
    flowConvention: "CONTRIBUTIONS_EXPENSE_MAGNITUDES_INVESTMENT_SIGNED",
    netCashFlowDefinition:
      "netCashFlowMillionEur = contributionsMillionEur + investmentReturnsMillionEur - pensionExpenditureMillionEur (excludes TR share, state share, operating costs, taxes, transfers, other adjustment, and stock lines).",
    source: {
      provider: ETK_PENSION_FUNDING_FLOWS.providerEn,
      datasetId: ETK_PENSION_FUNDING_FLOWS.pxTableId,
      datasetTitle: ETK_PENSION_FUNDING_FLOWS.datasetTitleEn,
      seriesDefinition: ETK_PENSION_FUNDING_FLOWS.seriesDefinitionEn,
      documentationUrl: ETK_PENSION_FUNDING_FLOWS.documentationUrl,
      dataPortalUrl: ETK_PENSION_FUNDING_FLOWS.dataPortalUrl,
      retrievedAt: retrievedAtIso,
      notes: [
        `Institution filter: Eläkelaki (Vastuulaitos) = ${INSTITUTION_COMBINED_CODE} (Laitokset yhteensä).`,
        "Figures from supervised insurers’ financial reporting; latest year may be revised in June releases.",
        "Pension expenditure and operating costs/taxes stored as non-negative magnitudes; ETK publishes benefits and some costs as negative outflows.",
      ],
    },
    series,
  };
}
