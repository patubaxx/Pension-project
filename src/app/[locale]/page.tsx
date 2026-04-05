import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { FundingFlowsSection } from "@/features/pension/components/FundingFlowsSection";
import { FundingOverviewSection } from "@/features/pension/components/FundingOverviewSection";
import { HeroSection } from "@/features/pension/components/HeroSection";
import { PensionAssetsSignatureSection } from "@/features/pension/components/PensionAssetsSignatureSection";
import { PensionKeyMetricsSection } from "@/features/pension/components/PensionKeyMetricsSection";
import { StoryTrustSection } from "@/features/pension/components/StoryTrustSection";
import { loadHomeStoryViewModel } from "@/features/pension/content/home";
import type { AppLocale } from "@/lib/i18n/routing";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  return {
    title: t("homeTitle"),
    description: t("homeDescription"),
  };
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  const viewModel = await loadHomeStoryViewModel(locale as AppLocale);

  return (
    <>
      <HeroSection fundingOverview={viewModel.fundingOverview} />
      <FundingOverviewSection viewModel={viewModel.fundingOverview} />
      <PensionAssetsSignatureSection
        chart={viewModel.signatureChart}
        locale={locale as AppLocale}
      />
      <FundingFlowsSection
        viewModel={viewModel.fundingFlows}
        locale={locale as AppLocale}
      />
      <PensionKeyMetricsSection metrics={viewModel.keyMetrics} />
      <StoryTrustSection />
    </>
  );
}
