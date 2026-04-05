/** After validation + normalization (domain-agnostic processed layer). */
export type ProcessedFundingSnapshot = {
  asOfYear: number;
  totalAssetsBillionEur: number;
  sourceNote: string;
};

/** Generic chart-oriented row (skeleton for later visualizations). */
export type FundingSeriesPoint = {
  year: number;
  valueBillionEur: number;
};
