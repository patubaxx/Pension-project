import { getTranslations } from "next-intl/server";
import { Stack } from "@/components/primitives/stack";
import { PlaceholderFrame } from "@/components/primitives/placeholder-frame";
import { Body, SectionTitle } from "@/components/primitives/typography";
import { PENSION_ANCHORS } from "../utils/section-anchors";

type MessageKey = "signatureViz" | "supportingViz";

type VisualizationPlaceholderProps = {
  sectionKey: MessageKey;
};

export async function VisualizationPlaceholder({
  sectionKey,
}: VisualizationPlaceholderProps) {
  const id =
    sectionKey === "signatureViz"
      ? PENSION_ANCHORS.signatureViz
      : PENSION_ANCHORS.supportingViz;
  const t = await getTranslations(`PensionHome.sections.${sectionKey}`);

  return (
    <section
      id={id}
      className="mx-auto w-full max-w-3xl px-6 py-16 sm:px-8 sm:py-20"
    >
      <Stack>
        <SectionTitle>{t("title")}</SectionTitle>
        <PlaceholderFrame className="min-h-[200px] sm:min-h-[240px]">
          <Body>{t("placeholder")}</Body>
        </PlaceholderFrame>
      </Stack>
    </section>
  );
}
