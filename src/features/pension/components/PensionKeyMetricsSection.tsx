import { getTranslations } from "next-intl/server";
import { Section } from "@/components/primitives/section";
import { Stack } from "@/components/primitives/stack";
import { Body, SectionTitle } from "@/components/primitives/typography";
import { PENSION_ANCHORS } from "../utils/section-anchors";
import type { KeyMetricsViewModel } from "../model/types";

type PensionKeyMetricsSectionProps = {
  metrics: KeyMetricsViewModel;
};

export async function PensionKeyMetricsSection({
  metrics,
}: PensionKeyMetricsSectionProps) {
  const t = await getTranslations("PensionHome.sections.keyMetrics");

  return (
    <Section id={PENSION_ANCHORS.keyMetrics} className="pt-4 sm:pt-8">
      <Stack gap="lg">
        <div className="max-w-2xl">
          <SectionTitle>{t("title")}</SectionTitle>
          <Body className="mt-4 text-pretty">{t("lead")}</Body>
        </div>

        <div
          className="rounded-lg border border-stone-200/90 bg-white/70 p-5 sm:p-6"
          role="note"
          aria-label={t("howToReadAria")}
        >
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-stone-500">
            {t("howToReadLabel")}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-stone-700">
            {t("howToReadBody")}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-3 sm:gap-5">
          <div className="rounded-lg border border-stone-200/80 bg-white/50 p-5 sm:p-6">
            <p className="text-xs font-medium uppercase tracking-wider text-stone-500">
              {t("latestLabel")}
            </p>
            <p className="mt-3 font-serif text-2xl tracking-tight text-stone-900 sm:text-[1.65rem]">
              {metrics.latestFormatted}
            </p>
            <p className="mt-2 text-sm leading-snug text-stone-600">
              {t("latestYearNote", { year: metrics.latestYear })}
            </p>
          </div>
          <div className="rounded-lg border border-stone-200/80 bg-white/50 p-5 sm:p-6">
            <p className="text-xs font-medium uppercase tracking-wider text-stone-500">
              {t("growthLabel", { year: metrics.baselineYear })}
            </p>
            <p className="mt-3 font-serif text-2xl tracking-tight text-stone-900 sm:text-[1.65rem]">
              {metrics.growthFormatted}
            </p>
            <p className="mt-2 text-sm leading-snug text-stone-600">
              {t("growthHint")}
            </p>
          </div>
          <div className="rounded-lg border border-stone-200/80 bg-white/50 p-5 sm:p-6">
            <p className="text-xs font-medium uppercase tracking-wider text-stone-500">
              {t("spanLabel")}
            </p>
            <p className="mt-3 font-serif text-2xl tracking-tight text-stone-900 sm:text-[1.65rem]">
              {t("yearCount", { count: metrics.yearCount })}
            </p>
            <p className="mt-2 text-sm leading-snug text-stone-600">
              {t("spanHint")}
            </p>
          </div>
        </div>

        <Body className="max-w-2xl border-l border-stone-300/80 pl-5 text-sm text-stone-600">
          {t("notInference")}
        </Body>
      </Stack>
    </Section>
  );
}
