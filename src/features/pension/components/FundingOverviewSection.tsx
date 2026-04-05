import { getTranslations } from "next-intl/server";
import { Section } from "@/components/primitives/section";
import { Stack } from "@/components/primitives/stack";
import { PlaceholderFrame } from "@/components/primitives/placeholder-frame";
import { Body, SectionTitle } from "@/components/primitives/typography";
import type { FundingOverviewViewModel } from "../model/types";
import { PENSION_ANCHORS } from "../utils/section-anchors";

type FundingOverviewSectionProps = {
  viewModel: FundingOverviewViewModel | null;
};

export async function FundingOverviewSection({
  viewModel,
}: FundingOverviewSectionProps) {
  const t = await getTranslations("PensionHome.sections.fundingOverview");
  const tSample = await getTranslations("PensionHome.pipelineSample");

  return (
    <Section id={PENSION_ANCHORS.fundingOverview}>
      <Stack>
        <SectionTitle>{t("title")}</SectionTitle>
        <PlaceholderFrame>
          <Stack gap="sm">
            <Body>{t("placeholder")}</Body>
            {viewModel ? (
              <p className="text-sm text-stone-500">
                <span className="font-medium text-stone-700">
                  {tSample("label")}
                </span>
                <br />
                {tSample("value", {
                  year: viewModel.asOfYear,
                  amount: viewModel.formattedAssetsCompact,
                })}
              </p>
            ) : null}
          </Stack>
        </PlaceholderFrame>
      </Stack>
    </Section>
  );
}
