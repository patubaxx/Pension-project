import "server-only";

import { readFile } from "node:fs/promises";
import path from "node:path";

import { PROCESSED_FILENAME } from "./sourceConstants";
import type { ProcessedPensionFundingFlowsFile } from "./processedSchema";
import { processedPensionFundingFlowsFileSchema } from "./processedSchema";

const processedPath = path.join(
  process.cwd(),
  "src",
  "data",
  "processed",
  PROCESSED_FILENAME
);

/**
 * Loads the committed pension funding flows artifact. Not wired to the homepage yet.
 */
export async function loadProcessedPensionFundingFlows(): Promise<ProcessedPensionFundingFlowsFile> {
  const text = await readFile(processedPath, "utf8");
  const json: unknown = JSON.parse(text);
  return processedPensionFundingFlowsFileSchema.parse(json);
}
