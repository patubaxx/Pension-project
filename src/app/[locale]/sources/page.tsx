import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Section } from "@/components/primitives/section";
import { Stack } from "@/components/primitives/stack";
import { Body, SectionTitle } from "@/components/primitives/typography";
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
        <SectionTitle>{t("title")}</SectionTitle>
        <Body className="text-lg">{t("intro")}</Body>
      </Stack>
    </Section>
  );
}
