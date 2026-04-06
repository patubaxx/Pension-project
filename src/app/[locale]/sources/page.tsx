import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Section } from "@/components/primitives/section";
import { Stack } from "@/components/primitives/stack";
import { Body, PageTitle, SectionTitle } from "@/components/primitives/typography";
import type { AppLocale } from "@/lib/i18n/routing";
import {
  ETK_PENSION_FUNDING_FLOWS,
  STATFIN_PENSION_ASSETS,
} from "@/lib/data";
import { PENSION_PROJECT_GITHUB_URL } from "@/lib/site/projectUrls";

const externalSourceLinkClass =
  "font-medium text-stone-800 underline decoration-stone-300 underline-offset-4 hover:decoration-stone-600 focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-800";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Meta" });
  return {
    title: t("sourcesTitle"),
    description: t("sourcesDescription"),
  };
}

export default async function SourcesPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale as AppLocale);

  const t = await getTranslations("SourcesPage");

  return (
    <Section className="py-12 sm:py-16">
      <Stack gap="lg">
        <PageTitle>{t("title")}</PageTitle>
        <Body className="text-lg">{t("intro")}</Body>
        <div className="border-t border-stone-200 pt-8">
          <SectionTitle className="text-xl sm:text-2xl">
            {t("statfinHeading")}
          </SectionTitle>
          <Body className="mt-3 max-w-2xl">{t("statfinBody")}</Body>
          <ul className="mt-4 list-inside list-disc space-y-2 text-sm text-stone-700">
            <li>
              <a
                href={STATFIN_PENSION_ASSETS.pxWebUiUrl}
                className={externalSourceLinkClass}
                rel="noopener noreferrer"
              >
                {t("statfinPxLabel")}
              </a>
            </li>
            <li>
              <a
                href={STATFIN_PENSION_ASSETS.documentationUrl}
                className={externalSourceLinkClass}
                rel="noopener noreferrer"
              >
                {t("statfinDocLabel")}
              </a>
            </li>
          </ul>
        </div>
        <div className="border-t border-stone-200 pt-8">
          <SectionTitle className="text-xl sm:text-2xl">
            {t("etkHeading")}
          </SectionTitle>
          <Body className="mt-3 max-w-2xl">{t("etkBody")}</Body>
          <ul className="mt-4 list-inside list-disc space-y-2 text-sm text-stone-700">
            <li>
              <a
                href={ETK_PENSION_FUNDING_FLOWS.dataPortalUrl}
                className={externalSourceLinkClass}
                rel="noopener noreferrer"
              >
                {t("etkPxLabel")}
              </a>
            </li>
            <li>
              <a
                href={ETK_PENSION_FUNDING_FLOWS.fundingFlowsRahtiChartUrl}
                className={externalSourceLinkClass}
                rel="noopener noreferrer"
              >
                {t("etkExplorerLabel")}
              </a>
            </li>
            <li>
              <a
                href={ETK_PENSION_FUNDING_FLOWS.documentationUrl}
                className={externalSourceLinkClass}
                rel="noopener noreferrer"
              >
                {t("etkDocLabel")}
              </a>
            </li>
          </ul>
        </div>
        <div className="border-t border-stone-200 pt-8">
          <Body className="max-w-2xl text-stone-600">
            {t.rich("openSourceNote", {
              github: (chunks) => (
                <a
                  href={PENSION_PROJECT_GITHUB_URL}
                  className={externalSourceLinkClass}
                  rel="noopener noreferrer"
                >
                  {chunks}
                </a>
              ),
            })}
          </Body>
        </div>
      </Stack>
    </Section>
  );
}
