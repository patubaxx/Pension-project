# Data pipeline

End-to-end path from Statistics Finland to the homepage chart.

## Dataset in use

**Employment pension schemes — total financial assets (stock positions), million EUR**

| Aspect | Value |
|--------|--------|
| Provider | Statistics Finland (national financial accounts, RTP) |
| PxWeb API table | `statfin_rtp_pxt_11qp` (POST body fixed in ingest script) |
| Sector | **S13141** — Employment pension schemes |
| Instrument | **F0** — Total financial assets |
| Measure | Stock positions (not flows), year-end |
| Unit in raw/processed | Million EUR |

**Why this source:** It is the official **national-accounts** series for the pension sector balance sheet line used on the site. The original planning spec mentioned ETK as a narrative authority; the **implemented** time series is **Tilastokeskus RTP**, which is the standard public quantitative source for this stock measure.

Authoritative field names, UI links, and API URL are centralized in:

- `src/lib/data/pensionAssets/sourceConstants.ts` (comments include PxWeb + documentation links)

## Layer 1 — Ingest (raw)

**Script:** `npm run ingest` → `src/scripts/ingest/fetch-pension-assets.mjs`

- **POST** to PxWeb JSON-stat2 endpoint (English API path in script).
- Writes **verbatim** response to:
  - `src/data/raw/statfin-rtp-11qp-pension-assets.json`
- No application-specific shaping at this stage (preserves audit trail).

**Operational notes**

- Requires network access at run time.
- If PxWeb changes table codes or breaks the API contract, ingest may fail or require query updates.

## Layer 2 — Transform (processed)

**Script:** `npm run transform:data` → `src/scripts/transform/build-processed.ts`

1. Reads raw file (`RAW_FILENAME` from `sourceConstants.ts`).
2. Parses JSON and passes through **`buildProcessedPensionAssetsFile`** (`fromRawStatfin.ts`):
   - Validates raw shape (**Zod** `rawStatfinSchema`).
   - Normalizes to a **sorted annual series** of `{ year, assetsMillionEur }`.
3. Embeds **source metadata** (provider, dataset id, documentation URL, `retrievedAt` timestamp).
4. Writes:
   - `src/data/processed/pension-assets-finland.json`

**Schema:** `processedPensionAssetsFileSchema` in `processedSchema.ts`

- `schemaVersion: 1`
- `unit: "MEUR_STOCK"`
- `series`: non-empty array of observations

## Layer 3 — Runtime load (app)

**Module:** `src/lib/data/pensionAssets/loadProcessed.ts` (marked **`server-only`**)

- `readFile` from `process.cwd()/src/data/processed/{PROCESSED_FILENAME}`.
- **`processedPensionAssetsFileSchema.parse`** — fails build/dev if artifact missing or invalid.

## Layer 4 — View models (feature transforms)

**Entry:** `src/features/pension/content/home.ts`

Calls:

- `toFundingOverviewViewModel(processed, locale)`
- `toSignatureChartViewModel(processed)` → points in **billion EUR** for Recharts
- `toKeyMetricsViewModel(processed, locale)`

These are **pure** functions of the processed file + locale.

## Layer 5 — UI

- Server sections consume view models only.
- **`PensionAssetsLineChart`** receives `SignatureChartPoint[]` and locale — no Zod, no file I/O.

## Refresh checklist

1. `npm run ingest`
2. `npm run transform:data`
3. Inspect git diff on raw + processed JSON (sanity: year range, magnitudes).
4. `npm run build`
5. Spot-check `/en` and `/fi` (chart, tooltips, footnotes).

## Caveats (product + data)

- **Revisions:** National accounts figures are revised; latest year may be **provisional** (stated on the homepage copy).
- **One series:** The chart is **not** adjusted for inflation, demographics, or liabilities — interpret as **one official stock line**, not solvency.
- **English API ingest:** Raw fetch uses the **English** PxWeb path; labels in UI are localized via **messages** and **formatting**, not via re-fetching per locale.

## Related files (quick map)

| Concern | File |
|---------|------|
| PxWeb query + raw output | `src/scripts/ingest/fetch-pension-assets.mjs` |
| Raw → processed | `src/lib/data/pensionAssets/fromRawStatfin.ts` |
| Processed Zod | `src/lib/data/pensionAssets/processedSchema.ts` |
| Runtime load | `src/lib/data/pensionAssets/loadProcessed.ts` |
| Constants / URLs | `src/lib/data/pensionAssets/sourceConstants.ts` |
| Homepage VM | `src/features/pension/content/home.ts` |
