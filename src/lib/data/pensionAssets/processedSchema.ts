import { z } from "zod";

export const processedObservationSchema = z.object({
  year: z.number().int(),
  assetsMillionEur: z.number().finite(),
});

export const processedPensionAssetsFileSchema = z.object({
  schemaVersion: z.literal(1),
  source: z.object({
    provider: z.string(),
    datasetId: z.string(),
    datasetTitle: z.string(),
    seriesDefinition: z.string(),
    documentationUrl: z.url(),
    pxWebTableUrl: z.url(),
    retrievedAt: z.string(),
    notes: z.array(z.string()).optional(),
  }),
  unit: z.literal("MEUR_STOCK"),
  series: z.array(processedObservationSchema).min(1),
});

export type ProcessedObservation = z.infer<typeof processedObservationSchema>;
export type ProcessedPensionAssetsFile = z.infer<
  typeof processedPensionAssetsFileSchema
>;
