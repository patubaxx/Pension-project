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
        <SectionTitle>{t("title")}</SectionTitle>
        <Body className="text-lg">{t("intro")}</Body>
        <div>
          <Body className="mb-3 font-medium text-stone-800">
            {t("listTitle")}
          </Body>
          <ul className="list-inside list-disc space-y-2 text-stone-600">
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
