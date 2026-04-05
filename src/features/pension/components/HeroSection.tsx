import { getTranslations } from "next-intl/server";
import { Section } from "@/components/primitives/section";
import { Stack } from "@/components/primitives/stack";
import { DisplayTitle, Kicker, Lead } from "@/components/primitives/typography";
import type { FundingOverviewViewModel } from "../model/types";

type HeroSectionProps = {
  fundingOverview: FundingOverviewViewModel;
};

export async function HeroSection({ fundingOverview }: HeroSectionProps) {
  const t = await getTranslations("PensionHome.hero");

  return (
    <Section className="border-b border-stone-200/60 pb-14 pt-8 sm:pb-20 sm:pt-12">
      <Stack gap="lg">
        <div className="max-w-3xl">
          <Kicker>{t("kicker")}</Kicker>
          <DisplayTitle className="mt-3">{t("title")}</DisplayTitle>
          <Lead className="mt-6">{t("lead")}</Lead>
          <p className="mt-6 max-w-2xl text-pretty text-base leading-relaxed text-stone-600">
            {t("framing")}
          </p>
        </div>
        <div className="mt-2 max-w-xl border-l-2 border-stone-300/90 pl-6">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-stone-500">
            {t("statLabel")}
          </p>
          <p className="mt-3 font-serif text-3xl font-normal tracking-tight text-stone-900 sm:text-4xl">
            {fundingOverview.latestFormatted}
          </p>
          <p className="mt-2 text-sm text-stone-600">
            {t("statContext", { year: fundingOverview.latestYear })}
          </p>
          <p className="mt-5 text-xs leading-relaxed text-stone-500">
            {t("sourceLine")}
          </p>
        </div>
      </Stack>
    </Section>
  );
}
