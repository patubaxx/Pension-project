import { getTranslations } from "next-intl/server";
import { Section } from "@/components/primitives/section";
import { Body, SectionTitle } from "@/components/primitives/typography";
import { Link } from "@/lib/i18n/routing";
import { PENSION_ANCHORS } from "../utils/section-anchors";

const linkClassName =
  "inline-flex text-sm font-medium text-stone-800 underline decoration-stone-300 underline-offset-4 transition-colors hover:decoration-stone-600 focus-visible:rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-800";

export async function StoryTrustSection() {
  const t = await getTranslations("PensionHome.sections.storyTrust");

  return (
    <Section
      className="border-t border-stone-200/70 bg-stone-50/40 pb-20 pt-14 sm:pb-24 sm:pt-16"
      aria-labelledby={PENSION_ANCHORS.storyTrustHeading}
    >
      <div className="flex flex-col gap-12">
        <div className="max-w-2xl">
          <SectionTitle id={PENSION_ANCHORS.storyTrustHeading}>
            {t("title")}
          </SectionTitle>
          <Body className="mt-4 text-pretty">{t("intro")}</Body>
        </div>
        <div className="grid gap-12 sm:grid-cols-2 sm:gap-10 lg:gap-14">
          <article
            id={PENSION_ANCHORS.methodologyPreview}
            className="flex flex-col gap-4 border-l border-stone-200 pl-6"
          >
            <h3 className="font-serif text-lg font-normal tracking-tight text-stone-900">
              {t("methodologyTitle")}
            </h3>
            <Body className="text-pretty">{t("methodologyBody")}</Body>
            <p>
              <Link href="/methodology" className={linkClassName}>
                {t("methodologyCta")}
              </Link>
            </p>
          </article>
          <article
            id={PENSION_ANCHORS.sourcesPreview}
            className="flex flex-col gap-4 border-l border-stone-200 pl-6"
          >
            <h3 className="font-serif text-lg font-normal tracking-tight text-stone-900">
              {t("sourcesTitle")}
            </h3>
            <Body className="text-pretty">{t("sourcesBody")}</Body>
            <p>
              <Link href="/sources" className={linkClassName}>
                {t("sourcesCta")}
              </Link>
            </p>
          </article>
        </div>
      </div>
    </Section>
  );
}
