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

/** Chart A — three annual flow components (billion EUR), ETK insurer reporting basis. */
export type FundingFlowsChartPoint = {
  year: number;
  contributionsBillionEur: number;
  investmentReturnsBillionEur: number;
  pensionExpenditureBillionEur: number;
};

export type FundingFlowsChartViewModel = {
  points: FundingFlowsChartPoint[];
  retrievedAt: string;
};

/** Chart B — narrow derived narrative net (billion EUR); see processed `netCashFlowDefinition`. */
export type FundingBalanceChartPoint = {
  year: number;
  netCashFlowBillionEur: number;
};

export type FundingBalanceChartViewModel = {
  points: FundingBalanceChartPoint[];
};

export type FundingFlowsSectionViewModel = {
  flowsChart: FundingFlowsChartViewModel;
  balanceChart: FundingBalanceChartViewModel;
};

export type HomeStoryViewModel = {
  fundingOverview: FundingOverviewViewModel;
  signatureChart: SignatureChartViewModel;
  fundingFlows: FundingFlowsSectionViewModel;
  keyMetrics: KeyMetricsViewModel;
};
