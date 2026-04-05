import "server-only";

import { readFile } from "node:fs/promises";
import path from "node:path";

const rawFundingPath = path.join(
  process.cwd(),
  "src",
  "data",
  "raw",
  "funding-snapshot.json"
);

export async function loadRawFundingSnapshotJson(): Promise<unknown> {
  const buf = await readFile(rawFundingPath, "utf8");
  return JSON.parse(buf) as unknown;
}
