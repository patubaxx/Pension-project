import { getTranslations } from "next-intl/server";
import { Section } from "@/components/primitives/section";
import { Stack } from "@/components/primitives/stack";
import { Body, SectionTitle } from "@/components/primitives/typography";
import type { AppLocale } from "@/lib/i18n/routing";
import type { FundingFlowsSectionViewModel } from "../model/types";
import { PENSION_ANCHORS } from "../utils/section-anchors";
import { FundingFlowsMultiLineChart } from "./charts/FundingFlowsMultiLineChart";
import { FundingNetCashFlowChart } from "./charts/FundingNetCashFlowChart";

type FundingFlowsSectionProps = {
  viewModel: FundingFlowsSectionViewModel;
  locale: AppLocale;
};

export async function FundingFlowsSection({
  viewModel,
  locale,
}: FundingFlowsSectionProps) {
  const t = await getTranslations("PensionHome.sections.fundingFlows");

  const { flowsChart, balanceChart } = viewModel;
  const flowPts = flowsChart.points;
  const balPts = balanceChart.points;
  const hasFlows = flowPts.length > 0;
  const hasBalance = balPts.length > 0;
  const rangeFrom = flowPts[0]?.year ?? balPts[0]?.year;
  const rangeTo =
    flowPts[flowPts.length - 1]?.year ??
    balPts[balPts.length - 1]?.year;

  const flowsAria = hasFlows
    ? t("chartA.ariaLabel", { from: String(rangeFrom), to: String(rangeTo) })
    : t("chartA.ariaLabelEmpty");

  const balanceAria = hasBalance
    ? t("chartB.ariaLabel", { from: String(rangeFrom), to: String(rangeTo) })
    : t("chartB.ariaLabelEmpty");

  return (
    <Section id={PENSION_ANCHORS.fundingFlows} className="pt-4 sm:pt-10">
      <Stack gap="lg">
        <header className="max-w-2xl">
          {rangeFrom != null && rangeTo != null ? (
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-500">
              {t("timeRangeKicker", { from: rangeFrom, to: rangeTo })}
            </p>
          ) : null}
          <SectionTitle className={rangeFrom != null ? "mt-3" : undefined}>
            {t("title")}
          </SectionTitle>
          <Body className="mt-4 text-pretty">{t("intro")}</Body>
        </header>

        {hasFlows ? (
          <>
            <figure className="rounded-lg border border-stone-200/80 bg-white p-4 shadow-sm shadow-stone-900/5 sm:p-6">
              <p className="mb-4 font-serif text-base text-stone-800 sm:text-lg">
                {t("chartA.caption")}
              </p>
              <FundingFlowsMultiLineChart
                points={flowPts}
                locale={locale}
                ariaLabel={flowsAria}
                axisBillionsNote={t("chartA.axisBillionsEur")}
                legendContributions={t("chartA.legendContributions")}
                legendInvestment={t("chartA.legendInvestment")}
                legendExpenditure={t("chartA.legendExpenditure")}
                tooltipYearLabel={t("chartA.tooltipYear")}
              />
            </figure>
            <div className="flex flex-col gap-3 border-l border-stone-300/90 bg-stone-100/50 py-3 pl-5 pr-4 text-sm leading-relaxed text-stone-700">
              <p className="font-medium text-stone-800">{t("chartA.readTitle")}</p>
              <p>{t("chartA.readBody")}</p>
            </div>
          </>
        ) : (
          <p
            className="rounded-lg border border-dashed border-stone-300 bg-stone-50/80 px-4 py-8 text-center text-sm text-stone-600"
            role="status"
          >
            {t("chartA.emptyState")}
          </p>
        )}

        {hasBalance ? (
          <>
            <figure className="rounded-lg border border-stone-200/80 bg-white p-4 shadow-sm shadow-stone-900/5 sm:p-6">
              <p className="mb-4 font-serif text-base text-stone-800 sm:text-lg">
                {t("chartB.caption")}
              </p>
              <FundingNetCashFlowChart
                points={balPts}
                locale={locale}
                ariaLabel={balanceAria}
                axisBillionsNote={t("chartB.axisBillionsEur")}
                tooltipYearLabel={t("chartB.tooltipYear")}
                tooltipNetLabel={t("chartB.tooltipNetLabel")}
              />
              <p className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-stone-500">
                <span className="inline-flex items-center gap-2">
                  <span
                    className="inline-block size-2.5 rounded-sm"
                    style={{ backgroundColor: "#292524" }}
                    aria-hidden
                  />
                  {t("chartB.legendPositive")}
                </span>
                <span className="inline-flex items-center gap-2">
                  <span
                    className="inline-block size-2.5 rounded-sm"
                    style={{ backgroundColor: "#a8a29e" }}
                    aria-hidden
                  />
                  {t("chartB.legendNegative")}
                </span>
              </p>
            </figure>
            <div className="flex flex-col gap-3 border-l border-stone-300/90 bg-stone-100/50 py-3 pl-5 pr-4 text-sm leading-relaxed text-stone-700">
              <p className="font-medium text-stone-800">{t("chartB.readTitle")}</p>
              <p>{t("chartB.readBody")}</p>
            </div>
          </>
        ) : (
          <p
            className="rounded-lg border border-dashed border-stone-300 bg-stone-50/80 px-4 py-8 text-center text-sm text-stone-600"
            role="status"
          >
            {t("chartB.emptyState")}
          </p>
        )}

        <div className="max-w-2xl rounded-md border border-stone-200 bg-stone-50/80 px-4 py-4 text-sm leading-relaxed text-stone-700">
          <p className="font-medium text-stone-800">{t("caveatTitle")}</p>
          <p className="mt-2">{t("caveatBody")}</p>
        </div>
        <p className="text-xs leading-relaxed text-stone-500">{t("sourceNote")}</p>
      </Stack>
    </Section>
  );
}
