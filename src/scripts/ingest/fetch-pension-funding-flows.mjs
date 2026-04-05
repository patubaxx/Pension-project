/**
 * Fetches ETK PxWeb JSON-stat2 for työeläkejärjestelmän rahavirrat
 * (rahavirrat01_kaikki, Laitokset yhteensä). Writes the API response unchanged
 * to src/data/raw — see src/lib/data/pensionFundingFlows/sourceConstants.ts.
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "../../..");

const PX_URL =
  "https://tilastot.etk.fi/api/v1/fi/ETK/180tyoelakkeiden_rahoitus/10rahavirrat/rahavirrat01_kaikki.px";

const QUERY_BODY = {
  query: [
    {
      code: "Vuosi",
      selection: { filter: "all", values: ["*"] },
    },
    {
      code: "Rahavirta",
      selection: { filter: "all", values: ["*"] },
    },
    {
      code: "Eläkelaki (Vastuulaitos)",
      selection: { filter: "item", values: ["399"] },
    },
  ],
  response: { format: "json-stat2" },
};

async function main() {
  const res = await fetch(PX_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Accept: "application/json",
    },
    body: JSON.stringify(QUERY_BODY),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`ETK PxWeb ${res.status}: ${text.slice(0, 500)}`);
  }

  const json = await res.json();
  if (!json || json.class !== "dataset" || json.version !== "2.0") {
    throw new Error(
      "ETK PxWeb: unexpected payload (expected JSON-stat 2.0 dataset)"
    );
  }

  const outDir = path.join(root, "src", "data", "raw");
  await mkdir(outDir, { recursive: true });
  const outFile = path.join(outDir, "etk-rahavirrat01-kaikki-funding-flows.json");
  await writeFile(outFile, `${JSON.stringify(json, null, 2)}\n`, "utf8");
  console.log(`[ingest:funding-flows] wrote ${path.relative(root, outFile)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
