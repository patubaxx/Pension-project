/**
 * Fetches Statistics Finland PxWeb JSON-stat2 for employment pension scheme
 * financial asset stocks (table statfin_rtp_pxt_11qp). Writes the API response
 * unchanged to src/data/raw — see sourceConstants.ts for field definitions.
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "../../..");

const PX_URL =
  "https://pxdata.stat.fi/PXWeb/api/v1/en/StatFin/statfin_rtp_pxt_11qp.px";

const QUERY_BODY = {
  query: [
    {
      code: "Vara",
      selection: { filter: "item", values: ["F0"] },
    },
    {
      code: "Sektori",
      selection: { filter: "item", values: ["S13141"] },
    },
    {
      code: "Velallissektori",
      selection: { filter: "item", values: ["S0"] },
    },
    {
      code: "Vuosi",
      selection: { filter: "all", values: ["*"] },
    },
    {
      code: "Tiedot",
      selection: { filter: "item", values: ["K"] },
    },
  ],
  response: { format: "json-stat2" },
};

async function main() {
  const res = await fetch(PX_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(QUERY_BODY),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`PxWeb ${res.status}: ${text.slice(0, 500)}`);
  }

  const json = await res.json();
  const outDir = path.join(root, "src", "data", "raw");
  await mkdir(outDir, { recursive: true });
  const outFile = path.join(outDir, "statfin-rtp-11qp-pension-assets.json");
  await writeFile(outFile, `${JSON.stringify(json, null, 2)}\n`, "utf8");
  console.log(`[ingest] wrote ${path.relative(root, outFile)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
