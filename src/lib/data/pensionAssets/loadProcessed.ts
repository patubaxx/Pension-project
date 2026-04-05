import "server-only";

import { readFile } from "node:fs/promises";
import path from "node:path";

import { PROCESSED_FILENAME } from "./sourceConstants";
import type { ProcessedPensionAssetsFile } from "./processedSchema";
import { processedPensionAssetsFileSchema } from "./processedSchema";

const processedPath = path.join(
  process.cwd(),
  "src",
  "data",
  "processed",
  PROCESSED_FILENAME
);

/**
 * Loads the committed processed artifact. Fails loudly if missing or invalid
 * so missing-data issues are visible during development and build.
 */
export async function loadProcessedPensionAssets(): Promise<ProcessedPensionAssetsFile> {
  const text = await readFile(processedPath, "utf8");
  const json: unknown = JSON.parse(text);
  return processedPensionAssetsFileSchema.parse(json);
}
