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

  const ariaLabel = t("ariaLabel", {
    from: String(chart.points[0]?.year ?? ""),
    to: String(chart.points[chart.points.length - 1]?.year ?? ""),
  });

  return (
    <Section id={PENSION_ANCHORS.signatureViz}>
      <Stack gap="lg">
        <div>
          <SectionTitle className="mb-3">{t("title")}</SectionTitle>
          <Body className="max-w-2xl">{t("deck")}</Body>
        </div>
        <PensionAssetsLineChart
          points={chart.points}
          locale={locale}
          ariaLabel={ariaLabel}
          yearLabel={t("chartYear")}
          billionsUnitNote={t("axisBillionsEur")}
        />
        <p className="text-xs leading-relaxed text-stone-500">{t("caption")}</p>
      </Stack>
    </Section>
  );
}
