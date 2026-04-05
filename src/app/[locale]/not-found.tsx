import { getTranslations } from "next-intl/server";
import { Section } from "@/components/primitives/section";
import { Body, SectionTitle } from "@/components/primitives/typography";
import { Link } from "@/lib/i18n/routing";

export default async function NotFound() {
  const t = await getTranslations("NotFound");

  return (
    <Section className="py-24 text-center">
      <SectionTitle className="mb-4">{t("title")}</SectionTitle>
      <Body className="mb-8">{t("body")}</Body>
      <Link
        href="/"
        className="text-sm font-medium text-stone-800 underline decoration-stone-300 underline-offset-4"
      >
        {t("cta")}
      </Link>
    </Section>
  );
}
