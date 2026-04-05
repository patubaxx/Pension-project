/**
 * Reads raw PxWeb JSON from src/data/raw, validates, normalizes, writes
 * src/data/processed/pension-assets-finland.json for runtime consumption.
 */
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { buildProcessedPensionAssetsFile } from "../../lib/data/pensionAssets/fromRawStatfin";
import {
  RAW_FILENAME,
  PROCESSED_FILENAME,
} from "../../lib/data/pensionAssets/sourceConstants";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "../../..");

async function main() {
  const rawPath = path.join(root, "src", "data", "raw", RAW_FILENAME);
  const rawText = await readFile(rawPath, "utf8");
  const rawJson: unknown = JSON.parse(rawText);

  const retrievedAt = new Date().toISOString();
  const processed = buildProcessedPensionAssetsFile(rawJson, retrievedAt);

  const outDir = path.join(root, "src", "data", "processed");
  await mkdir(outDir, { recursive: true });
  const outPath = path.join(outDir, PROCESSED_FILENAME);
  await writeFile(outPath, `${JSON.stringify(processed, null, 2)}\n`, "utf8");
  console.log(
    `[transform] wrote ${path.relative(root, outPath)} (${processed.series.length} years)`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
