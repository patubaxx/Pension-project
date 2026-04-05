import type { RawFundingSnapshot } from "./schemas";
import { rawFundingSnapshotSchema } from "./schemas";

export function validateFundingSnapshot(data: unknown): RawFundingSnapshot {
  return rawFundingSnapshotSchema.parse(data);
}
