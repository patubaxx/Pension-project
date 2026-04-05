import { z } from "zod";

/**
 * Single calendar year, ETK “Laitokset yhteensä” funding flow snapshot.
 *
 * Sign / magnitude rules are fixed in `flowConvention` on the file root
 * (see `buildProcessedPensionFundingFlowsFile`).
 */
export const processedFundingFlowsObservationSchema = z.object({
  year: z.number().int(),
  /** Rahavirta 120 Vakuutusmaksut — non-negative magnitude (MEUR). */
  contributionsMillionEur: z.number().finite().nonnegative(),
  /**
   * Rahavirta 127 Sijoitustuotto — signed MEUR (ETK: gains positive, losses negative).
   */
  investmentReturnsMillionEur: z.number().finite(),
  /** Rahavirta 124 Maksetut eläkkeet — non-negative magnitude (MEUR). */
  pensionExpenditureMillionEur: z.number().finite().nonnegative(),
  /** Rahavirta 100 Eläkevarat 1.1. — MEUR stock. */
  pensionAssetsOpeningMillionEur: z.number().finite().nonnegative(),
  /** Rahavirta 200 Eläkevarat 31.12. — MEUR stock. */
  pensionAssetsClosingMillionEur: z.number().finite().nonnegative(),
  /** Rahavirta 121 TR-osuus — signed MEUR (source sign). */
  employmentFundShareMillionEur: z.number().finite(),
  /** Rahavirta 122 Siirrot — signed MEUR. */
  transfersMillionEur: z.number().finite(),
  /** Rahavirta 123 Valtion osuus — signed MEUR. */
  stateShareMillionEur: z.number().finite(),
  /** Rahavirta 125 Kokonaisliikekulut — non-negative magnitude (MEUR). */
  operatingExpensesMillionEur: z.number().finite().nonnegative(),
  /** Rahavirta 126 Verot — non-negative magnitude (MEUR). */
  taxesMillionEur: z.number().finite().nonnegative(),
  /** Rahavirta 128 Muu — signed MEUR (ETK residual line). */
  otherAdjustmentMillionEur: z.number().finite(),
  /**
   * Derived narrative net: contributions + investmentReturns − pensionExpenditure
   * (does not include TR, state share, operating costs, taxes, etc.).
   */
  netCashFlowMillionEur: z.number().finite(),
});

export const processedPensionFundingFlowsFileSchema = z.object({
  schemaVersion: z.literal(1),
  unit: z.literal("MEUR"),
  /**
   * CONTRIBUTIONS_EXPENSE_MAGNITUDES_INVESTMENT_SIGNED:
   * - contributions, pension expenditure, operating expenses, taxes: stored as ≥ 0 magnitudes
   * - investment result: signed (can be negative)
   * - TR, siirrot, valtion osuus, Muu: signed as in ETK payload
   */
  flowConvention: z.literal(
    "CONTRIBUTIONS_EXPENSE_MAGNITUDES_INVESTMENT_SIGNED"
  ),
  netCashFlowDefinition: z.string().min(1),
  source: z.object({
    provider: z.string(),
    datasetId: z.string(),
    datasetTitle: z.string(),
    seriesDefinition: z.string(),
    documentationUrl: z.url(),
    dataPortalUrl: z.url(),
    retrievedAt: z.string(),
    notes: z.array(z.string()).optional(),
  }),
  series: z.array(processedFundingFlowsObservationSchema).min(1),
});

export type ProcessedFundingFlowsObservation = z.infer<
  typeof processedFundingFlowsObservationSchema
>;
export type ProcessedPensionFundingFlowsFile = z.infer<
  typeof processedPensionFundingFlowsFileSchema
>;
