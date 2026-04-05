import { getTranslations } from "next-intl/server";
import { Body } from "@/components/primitives/typography";

export async function SiteFooter() {
  const t = await getTranslations("Footer");
  return (
    <Body className="text-center text-sm text-stone-500">{t("note")}</Body>
  );
}
