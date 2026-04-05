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
    <Section id={PENSION_ANCHORS.fundingOverview}>
      <Stack>
        <SectionTitle>{t("title")}</SectionTitle>
        <Body className="max-w-2xl">{t("lead")}</Body>
        <Body className="max-w-2xl text-stone-800">
          {t("highlight", {
            year: viewModel.latestYear,
            amount: viewModel.latestFormatted,
          })}
        </Body>
        <Body className="max-w-2xl text-sm text-stone-600">
          {t("attribution")}
        </Body>
      </Stack>
    </Section>
  );
}
