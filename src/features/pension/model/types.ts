/** View model for the funding overview section (no raw JSON in UI). */
export type FundingOverviewViewModel = {
  asOfYear: number;
  formattedAssetsCompact: string;
  sourceNote: string;
};

export type HomeStoryViewModel = {
  fundingOverview: FundingOverviewViewModel | null;
};
