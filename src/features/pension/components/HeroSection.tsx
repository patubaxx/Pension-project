import { getTranslations } from "next-intl/server";
import { Section } from "@/components/primitives/section";
import { Stack } from "@/components/primitives/stack";
import { DisplayTitle, Kicker, Lead } from "@/components/primitives/typography";

export async function HeroSection() {
  const t = await getTranslations("PensionHome.hero");

  return (
    <Section className="pb-12 pt-8 sm:pb-16 sm:pt-12">
      <Stack gap="lg">
        <Kicker>{t("kicker")}</Kicker>
        <DisplayTitle>{t("title")}</DisplayTitle>
        <Lead>{t("lead")}</Lead>
      </Stack>
    </Section>
  );
}
