import { getTranslations } from "next-intl/server";
import { Section } from "@/components/primitives/section";
import { Stack } from "@/components/primitives/stack";
import { SectionTitle } from "@/components/primitives/typography";
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
    <Section id={PENSION_ANCHORS.keyMetrics}>
      <Stack gap="md">
        <SectionTitle>{t("title")}</SectionTitle>
        <div className="grid gap-8 border-t border-stone-200 pt-8 sm:grid-cols-3">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-stone-500">
              {t("latestLabel")}
            </p>
            <p className="mt-2 font-serif text-2xl text-stone-900">
              {metrics.latestFormatted}
            </p>
            <p className="mt-1 text-sm text-stone-600">
              {t("latestYearNote", { year: metrics.latestYear })}
            </p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-stone-500">
              {t("growthLabel", { year: metrics.baselineYear })}
            </p>
            <p className="mt-2 font-serif text-2xl text-stone-900">
              {metrics.growthFormatted}
            </p>
            <p className="mt-1 text-sm text-stone-600">{t("growthHint")}</p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-stone-500">
              {t("spanLabel")}
            </p>
            <p className="mt-2 font-serif text-2xl text-stone-900">
              {t("yearCount", { count: metrics.yearCount })}
            </p>
            <p className="mt-1 text-sm text-stone-600">{t("spanHint")}</p>
          </div>
        </div>
      </Stack>
    </Section>
  );
}
