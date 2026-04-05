import { getTranslations } from "next-intl/server";
import { Section } from "@/components/primitives/section";
import { Stack } from "@/components/primitives/stack";
import { Body, SectionTitle } from "@/components/primitives/typography";
import { Link } from "@/lib/i18n/routing";
import { PENSION_ANCHORS } from "../utils/section-anchors";

export async function SourcesPreview() {
  const t = await getTranslations("PensionHome.sections.sourcesPreview");

  return (
    <Section id={PENSION_ANCHORS.sourcesPreview}>
      <Stack>
        <SectionTitle>{t("title")}</SectionTitle>
        <Body>{t("body")}</Body>
        <p>
          <Link
            href="/sources"
            className="text-sm font-medium text-stone-800 underline decoration-stone-300 underline-offset-4 transition-colors hover:decoration-stone-600"
          >
            {t("cta")}
          </Link>
        </p>
      </Stack>
    </Section>
  );
}
