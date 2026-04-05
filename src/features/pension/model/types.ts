/** Homepage funding intro — derived from processed national-accounts series. */
export type FundingOverviewViewModel = {
  latestYear: number;
  latestFormatted: string;
  firstYear: number;
  /** Billion EUR for optional copy */
  latestBillions: number;
};

/** Serializable points for the signature line chart (client-safe). */
export type SignatureChartPoint = {
  year: number;
  valueBillionEur: number;
};

export type SignatureChartViewModel = {
  points: SignatureChartPoint[];
  /** ISO timestamp of processed build / last ingest */
  retrievedAt: string;
};

export type KeyMetricsViewModel = {
  latestYear: number;
  latestFormatted: string;
  baselineYear: number;
  growthRatio: number;
  growthFormatted: string;
  yearCount: number;
};

export type HomeStoryViewModel = {
  fundingOverview: FundingOverviewViewModel;
  signatureChart: SignatureChartViewModel;
  keyMetrics: KeyMetricsViewModel;
};
