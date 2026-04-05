import { z } from "zod";

/**
 * JSON-stat 2.0 dataset boundary for ETK PxWeb `rahavirrat01_kaikki` extract.
 * Dimensions: Vuosi × Rahavirta × Eläkelaki (single combined-institution slice).
 */
const categoryIndexSchema = z.object({
  label: z.string(),
  category: z.object({
    index: z.record(z.string(), z.number().int().nonnegative()),
    label: z.record(z.string(), z.string()).optional(),
  }),
});

export const etkFundingFlowsJsonStat2DatasetSchema = z
  .object({
    version: z.literal("2.0"),
    class: z.literal("dataset"),
    id: z.tuple([
      z.literal("Vuosi"),
      z.literal("Rahavirta"),
      z.literal("Eläkelaki (Vastuulaitos)"),
    ]),
    size: z.tuple([
      z.number().int().positive(),
      z.number().int().positive(),
      z.number().int().positive(),
    ]),
    value: z.array(z.union([z.number(), z.null()])),
    dimension: z.object({
      Vuosi: categoryIndexSchema,
      Rahavirta: categoryIndexSchema,
      "Eläkelaki (Vastuulaitos)": categoryIndexSchema,
    }),
    label: z.string().optional(),
    source: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    const [ny, nr, ni] = data.size;
    const expectedLen = ny * nr * ni;
    if (data.value.length !== expectedLen) {
      ctx.addIssue({
        code: "custom",
        message: `value length ${data.value.length} !== size product ${expectedLen}`,
      });
    }
    const requiredRahavirta = [
      "100",
      "120",
      "121",
      "122",
      "123",
      "124",
      "125",
      "126",
      "127",
      "128",
      "200",
    ];
    const rIndex = data.dimension.Rahavirta.category.index;
    for (const code of requiredRahavirta) {
      if (!(code in rIndex)) {
        ctx.addIssue({
          code: "custom",
          message: `Missing Rahavirta code ${code} in dimension index`,
        });
      }
    }
    if (ni !== 1) {
      ctx.addIssue({
        code: "custom",
        message: `Expected exactly one institution slice (size[2]===1), got ${ni}`,
      });
    }
  });

export type EtkFundingFlowsJsonStat2Dataset = z.infer<
  typeof etkFundingFlowsJsonStat2DatasetSchema
>;
