import type { ProcessedPensionFundingFlowsFile } from "@/lib/data";
import type {
  FundingBalanceChartViewModel,
  FundingFlowsChartViewModel,
  FundingFlowsSectionViewModel,
} from "../model/types";

const MEUR_PER_BN = 1000;

function millionToBillion(meur: number): number {
  return meur / MEUR_PER_BN;
}

export function toFundingFlowsChartViewModel(
  processed: ProcessedPensionFundingFlowsFile
): FundingFlowsChartViewModel {
  const points = processed.series.map((row) => ({
    year: row.year,
    contributionsBillionEur: millionToBillion(row.contributionsMillionEur),
    investmentReturnsBillionEur: millionToBillion(
      row.investmentReturnsMillionEur
    ),
    pensionExpenditureBillionEur: millionToBillion(
      row.pensionExpenditureMillionEur
    ),
  }));

  return {
    points,
    retrievedAt: processed.source.retrievedAt,
  };
}

export function toFundingBalanceChartViewModel(
  processed: ProcessedPensionFundingFlowsFile
): FundingBalanceChartViewModel {
  const points = processed.series.map((row) => ({
    year: row.year,
    netCashFlowBillionEur: millionToBillion(row.netCashFlowMillionEur),
  }));

  return { points };
}

export function toFundingFlowsSectionViewModel(
  processed: ProcessedPensionFundingFlowsFile
): FundingFlowsSectionViewModel {
  return {
    flowsChart: toFundingFlowsChartViewModel(processed),
    balanceChart: toFundingBalanceChartViewModel(processed),
  };
}
