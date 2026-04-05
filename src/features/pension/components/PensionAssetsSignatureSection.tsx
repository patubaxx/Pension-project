import { getTranslations } from "next-intl/server";
import { Section } from "@/components/primitives/section";
import { Stack } from "@/components/primitives/stack";
import { Body, SectionTitle } from "@/components/primitives/typography";
import type { AppLocale } from "@/lib/i18n/routing";
import { PENSION_ANCHORS } from "../utils/section-anchors";
import type { SignatureChartViewModel } from "../model/types";
import { PensionAssetsLineChart } from "./charts/PensionAssetsLineChart";

type PensionAssetsSignatureSectionProps = {
  chart: SignatureChartViewModel;
  locale: AppLocale;
};

export async function PensionAssetsSignatureSection({
  chart,
  locale,
}: PensionAssetsSignatureSectionProps) {
  const t = await getTranslations("PensionHome.sections.signatureViz");

  const first = chart.points[0];
  const last = chart.points[chart.points.length - 1];
  const hasData = chart.points.length > 0;

  const ariaLabel = hasData
    ? t("ariaLabel", {
        from: String(first?.year ?? ""),
        to: String(last?.year ?? ""),
      })
    : t("ariaLabelEmpty");

  return (
    <Section id={PENSION_ANCHORS.signatureViz} className="pt-4 sm:pt-8">
      <Stack gap="lg">
        <header className="max-w-2xl">
          {hasData ? (
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-500">
              {t("timeRangeKicker", {
                from: first!.year,
                to: last!.year,
              })}
            </p>
          ) : null}
          <SectionTitle className={hasData ? "mt-3" : undefined}>
            {t("title")}
          </SectionTitle>
          <p className="mt-2 font-serif text-lg text-stone-700 sm:text-xl">
            {t("seriesLabel")}
          </p>
          <Body className="mt-4 text-pretty">{t("deck")}</Body>
          <Body className="mt-4 max-w-2xl text-pretty text-stone-700">
            {t("takeaway")}
          </Body>
        </header>

        {hasData ? (
          <>
            <figure className="rounded-lg border border-stone-200/80 bg-white p-4 shadow-sm shadow-stone-900/5 sm:p-6">
              <PensionAssetsLineChart
                points={chart.points}
                locale={locale}
                ariaLabel={ariaLabel}
                yearLabel={t("chartYear")}
                valueLabel={t("tooltipValueLabel")}
                seriesLabel={t("tooltipSeriesLabel")}
                billionsUnitNote={t("axisBillionsEur")}
                highlightLatestYear={last!.year}
                lineName={t("lineName")}
              />
            </figure>
            <div className="flex flex-col gap-3 border-l border-stone-300/90 bg-stone-100/50 py-3 pl-5 pr-4 text-sm leading-relaxed text-stone-700">
              <p className="font-medium text-stone-800">{t("readThisTitle")}</p>
              <p>{t("readThisBody")}</p>
            </div>
            <p className="text-xs leading-relaxed text-stone-500">
              {t("sourceNote")}
            </p>
            <p className="text-xs leading-relaxed text-stone-500">{t("caption")}</p>
          </>
        ) : (
          <p
            className="rounded-lg border border-dashed border-stone-300 bg-stone-50/80 px-4 py-8 text-center text-sm text-stone-600"
            role="status"
          >
            {t("emptyState")}
          </p>
        )}
      </Stack>
    </Section>
  );
}
