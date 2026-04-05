import { getTranslations } from "next-intl/server";
import { Section } from "@/components/primitives/section";
import { Stack } from "@/components/primitives/stack";
import { Body, SectionTitle } from "@/components/primitives/typography";
import type { FundingOverviewViewModel } from "../model/types";
import { PENSION_ANCHORS } from "../utils/section-anchors";

type FundingOverviewSectionProps = {
  viewModel: FundingOverviewViewModel;
};

export async function FundingOverviewSection({
  viewModel,
}: FundingOverviewSectionProps) {
  const t = await getTranslations("PensionHome.sections.fundingOverview");

  return (
    <Section id={PENSION_ANCHORS.fundingOverview} className="pt-12 sm:pt-16">
      <Stack gap="md">
        <SectionTitle>{t("title")}</SectionTitle>
        <Body className="max-w-2xl text-pretty">{t("lead")}</Body>
        <Body className="max-w-2xl text-pretty text-stone-700">
          {t("interpretation")}
        </Body>
        <Body className="max-w-2xl text-pretty text-sm text-stone-600">
          {t("bridge", {
            firstYear: viewModel.firstYear,
            latestYear: viewModel.latestYear,
          })}
        </Body>
        <Body className="max-w-2xl border-l border-stone-200 pl-5 text-sm leading-relaxed text-stone-600">
          {t("attribution")}
        </Body>
      </Stack>
    </Section>
  );
}
