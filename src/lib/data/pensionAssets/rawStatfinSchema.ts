import { z } from "zod";

/** Minimal JSON-stat 2.0 dataset shape for our PxWeb extract (time on Vuosi). */
export const statfinJsonStat2DatasetSchema = z.object({
  version: z.literal("2.0"),
  class: z.literal("dataset"),
  label: z.string(),
  id: z.array(z.string()),
  size: z.array(z.number().int().nonnegative()),
  value: z.array(z.union([z.number(), z.null()])),
  dimension: z.object({
    Vuosi: z.object({
      label: z.string(),
      category: z.object({
        index: z.record(z.string(), z.number()),
      }),
    }),
  }),
});

export type StatfinJsonStat2Dataset = z.infer<
  typeof statfinJsonStat2DatasetSchema
>;
