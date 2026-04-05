import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { FundingOverviewSection } from "@/features/pension/components/FundingOverviewSection";
import { HeroSection } from "@/features/pension/components/HeroSection";
import { MethodologyPreview } from "@/features/pension/components/MethodologyPreview";
import { SourcesPreview } from "@/features/pension/components/SourcesPreview";
import { VisualizationPlaceholder } from "@/features/pension/components/VisualizationPlaceholder";
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
      <HeroSection />
      <FundingOverviewSection viewModel={viewModel.fundingOverview} />
      <VisualizationPlaceholder sectionKey="signatureViz" />
      <VisualizationPlaceholder sectionKey="supportingViz" />
      <MethodologyPreview />
      <SourcesPreview />
    </>
  );
}
