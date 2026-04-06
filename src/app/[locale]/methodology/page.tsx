import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Section } from "@/components/primitives/section";
import { Stack } from "@/components/primitives/stack";
import { Body, PageTitle, SectionTitle } from "@/components/primitives/typography";
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
    title: t("methodologyTitle"),
    description: t("methodologyDescription"),
  };
}

export default async function MethodologyPage({ params }: PageProps) {
  const { locale } = await params;
  setRequestLocale(locale as AppLocale);

  const t = await getTranslations("MethodologyPage");

  return (
    <Section className="py-12 sm:py-16">
      <Stack gap="lg">
        <PageTitle>{t("title")}</PageTitle>
        <Body className="text-lg">{t("intro")}</Body>
        <Body className="max-w-2xl text-stone-600">{t("datasetsNote")}</Body>
        <div className="border-t border-stone-200 pt-8">
          <SectionTitle className="text-xl sm:text-2xl">
            {t("implementationTitle")}
          </SectionTitle>
          <Body className="mt-3 max-w-2xl text-stone-600">
            {t("implementationBody")}
          </Body>
        </div>
        <div>
          <SectionTitle className="mt-10 text-xl sm:text-2xl">
            {t("listTitle")}
          </SectionTitle>
          <ul className="mt-4 list-inside list-disc space-y-2 text-stone-600">
            <li>{t("layers.raw")}</li>
            <li>{t("layers.validate")}</li>
            <li>{t("layers.normalize")}</li>
            <li>{t("layers.processed")}</li>
            <li>{t("layers.transform")}</li>
          </ul>
        </div>
      </Stack>
    </Section>
  );
}
