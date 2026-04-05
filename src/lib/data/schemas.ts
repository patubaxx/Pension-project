import { z } from "zod";

/** Schema for illustrative raw funding snapshot (Phase 1 sample). */
export const rawFundingSnapshotSchema = z.object({
  asOfYear: z.number().int().min(1900).max(2100),
  totalAssetsBillionEur: z.number().finite().nonnegative(),
  sourceNote: z.string().min(1),
});

export type RawFundingSnapshot = z.infer<typeof rawFundingSnapshotSchema>;
