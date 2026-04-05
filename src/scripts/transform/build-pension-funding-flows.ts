/**
 * Reads raw ETK PxWeb JSON from src/data/raw, validates, normalizes, writes
 * src/data/processed/pension-funding-flows-finland.json.
 */
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { buildProcessedPensionFundingFlowsFile } from "../../lib/data/pensionFundingFlows/fromRawEtk";
import {
  RAW_FILENAME,
  PROCESSED_FILENAME,
} from "../../lib/data/pensionFundingFlows/sourceConstants";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "../../..");

async function main() {
  const rawPath = path.join(root, "src", "data", "raw", RAW_FILENAME);
  const rawText = await readFile(rawPath, "utf8");
  const rawJson: unknown = JSON.parse(rawText);

  const retrievedAt = new Date().toISOString();
  const processed = buildProcessedPensionFundingFlowsFile(rawJson, retrievedAt);

  const outDir = path.join(root, "src", "data", "processed");
  await mkdir(outDir, { recursive: true });
  const outPath = path.join(outDir, PROCESSED_FILENAME);
  await writeFile(outPath, `${JSON.stringify(processed, null, 2)}\n`, "utf8");
  console.log(
    `[transform:funding-flows] wrote ${path.relative(root, outPath)} (${processed.series.length} years)`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
