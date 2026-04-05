# Funding flows dataset — source decision and processed model (Phase 1)

This note plans the **employment pension system funding flows** dataset. It follows the same boundary as the existing assets pipeline: **raw → validation → normalization → processed → view model → UI** (see `docs/data-pipeline.md`).

## Phase 2 status (implemented)

The **data pipeline** is implemented in parallel to pension assets (no homepage UI yet):

| Step | Command / module |
|------|------------------|
| Ingest | `npm run ingest:funding-flows` → `src/data/raw/etk-rahavirrat01-kaikki-funding-flows.json` |
| Transform | `npm run transform:data:funding-flows` → `src/data/processed/pension-funding-flows-finland.json` |
| Constants | `src/lib/data/pensionFundingFlows/sourceConstants.ts` |
| Raw Zod | `src/lib/data/pensionFundingFlows/rawEtkSchema.ts` |
| Transform | `src/lib/data/pensionFundingFlows/fromRawEtk.ts` |
| Processed Zod | `src/lib/data/pensionFundingFlows/processedSchema.ts` |
| Runtime load | `loadProcessedPensionFundingFlows()` in `src/lib/data/pensionFundingFlows/loadProcessed.ts` (`server-only`) |

**API base (ETK):** machine-readable POST URL is `https://tilastot.etk.fi/api/v1/fi/ETK/180tyoelakkeiden_rahoitus/10rahavirrat/rahavirrat01_kaikki.px` (not the legacy `/PXWeb/api/v1/...` path).

**Processed conventions:** see `flowConvention`, `netCashFlowDefinition`, and `source.notes` inside the processed JSON; summary in `docs/data-pipeline.md` (funding flows subsection).

## A. Reference implementation (pension assets)

The current pattern to mirror in Phase 2:

| Layer | Location |
|--------|----------|
| Source metadata + filenames | `src/lib/data/pensionAssets/sourceConstants.ts` |
| Raw boundary (Zod) | `src/lib/data/pensionAssets/rawStatfinSchema.ts` |
| Raw → processed build | `src/lib/data/pensionAssets/fromRawStatfin.ts` |
| Processed schema (Zod) | `src/lib/data/pensionAssets/processedSchema.ts` |
| Runtime load (`server-only`) | `src/lib/data/pensionAssets/loadProcessed.ts` |
| Ingest (verbatim API response) | `src/scripts/ingest/fetch-pension-assets.mjs` |
| Transform script | `src/scripts/transform/build-processed.ts` |

Funding flows will need a **different processed observation shape** (multiple signed flow lines per year, optional opening/closing stocks from the same table). The raw schema will depend on whether ETK returns JSON-stat 1.x or 2.x; do not assume the minimal `Vuosi`-only layout used for `11qp`.

---

## B. Candidate sources

### 1. Eläketurvakeskus (ETK) — Työeläkejärjestelmän eläkevarat ja rahavirrat (recommended)

- **Access:** PxWeb, database `ETK__180tyoelakkeiden_rahoitus__10rahavirrat`, primary table **[`rahavirrat01_kaikki.px`](https://tilastot.etk.fi/pxweb/fi/ETK/ETK__180tyoelakkeiden_rahoitus__10rahavirrat/rahavirrat01_kaikki.px/)** (“Työeläkejärjestelmän eläkevarat ja rahavirrat, milj. euroa”).
- **Dimensions (high level):** `Vuosi` (annual, from 2007 in published series), `Rahavirta` (~11 flow/stock lines), `Eläkelaki (Vastuulaitos)` / institution group — use the **system total** category (e.g. institutions combined) for a single national editorial series.
- **Authority:** ETK is the **statutory** hub for Finnish earnings-related pensions; figures are compiled from **supervised insurers’ financial reporting** (FiVa), not ad hoc estimates.
- **Official statistics flag:** On ETK’s metadata this statistic is **not** classified as Finland’s “official statistics” (*virallinen tilasto*); it is still the most **direct public machine-readable** breakdown of **contributions, benefits, investment result, and asset bridge** for the earnings-related system.

### 2. Statistics Finland — Annual sector income and expenditure (national accounts)

- **Access:** PxWeb table **[`statfin_vtp_pxt_11yx`](https://pxdata.stat.fi/PXWeb/pxweb/en/StatFin/StatFin__vtp/statfin_vtp_pxt_11yx.px/)** — *Income and expenditure by sector, annually* (VTP / national accounts).
- **Fit:** Same **macro tradition** as the existing RTP **S13141** asset stock series (`statfin_rtp_pxt_11qp`), so concepts align with **ESA 2010** and cross-country comparability.
- **Gap for editorial “funding flows”:** Useful for **macro** income/expense **transactions** by sector, but the **transaction dimension** is **national-accounts codes**, not insurer-style “premium income / paid pensions / investment return”. Mapping those codes to plain-language labels for non-experts is **non-trivial** and easy to mis-sell as “pension contributions” when the ESA line is structurally different.

### 3. Combination strategy (optional later)

- **ETK** for the **flow story** (premiums, paid pensions, investment result, small operating/tax lines as needed).
- **Existing processed asset stock** (`pension-assets-finland.json`, StatFin RTP **F0**) for **balance-sheet context** aligned with the homepage chart — accepting that **ETK closing assets ≠ StatFin F0** by construction (different definitions and perimeter). Any **side-by-side** use needs a short methodology footnote in content, not hidden in code.

---

## C. Recommendation

**Primary source for Phase 2 ingest:** **ETK PxWeb `rahavirrat01_kaikki.px`**, aggregated to **one row per year** for the **whole earnings-related system** (combined institutions dimension).

**Why it fits Pension Project**

- **Annual** series suitable for a **calm** time-based graphic.
- **Concepts match** how Finnish readers and ETK itself discuss system funding: **maksut / maksetut eläkkeet / sijoitustuotto / varat**.
- **Stable enough to explain:** definitions are documented on ETK’s statistic page (Finnish; English pages may lag — plan copy and methodology from Finnish authoritative text where needed).
- **Architectural fit:** keeps **raw JSON-stat (or equivalent) in `src/data/raw/`**, **narrow Zod at the boundary**, **processed JSON** as the only runtime input — same as assets.

**What it covers directly (source-native, after pivoting `Rahavirta`)**

- **Contributions** — vakuutusmaksut (premium income; includes employer/employee/entrepreneur components as defined by ETK).
- **Paid pensions** — maksetut eläkkeet (outflow).
- **Investment return** — sijoitustuotto (as defined by ETK: includes valuation changes per their methodology).
- **Other flows** — e.g. **TR-osuus** (Employment Fund share), **siirrot** (transfers), **valtion osuus** (state shares), **kokonaisliikekulut** / operating costs, **verot** (taxes) if present as separate rows — exact labels **must** be taken from the table metadata at ingest time.
- **Stocks (optional fields)** — **eläkevarat 1.1.** and **eläkevarat 31.12.** from the same table for **internal reconciliation** and optional Chart B context.

**What is not a single primary field**

- **“Funding”** as a standalone annual statistic: **not** a dedicated PxWeb row. In public communication it is either **implicit** (how the system is financed) or **derived** (e.g. net of major inflows/outflows, or change in assets explained by listed flows).

**Derived metrics (processed layer, not invented in UI)**

- **`netFlowMillionEur`** (or similarly named): **sum of selected signed flow lines** for the year **excluding** opening/closing asset stocks, using one explicit sign convention (recommended: **positive = net inflow to assets** / increases closing assets ceteris paribus). Implement as pure arithmetic from normalized raw codes in **`fromRaw*.ts`**, not in components.
- **Reconciliation check (optional):** `openingAssets + sum(flows) ≈ closingAssets` within rounding; surface discrepancies as `source.notes` or transform warnings in Phase 2.

**Terminology and ambiguity risks**

| Risk | Mitigation |
|------|------------|
| “Contributions” vs “työeläkemaksut” vs national-accounts “social contributions” | Use **ETK’s** labels in methodology; do not equate to VTP transaction rows without a documented mapping. |
| “Investment returns” vs “net investment income” | Follow **ETK sijoitustuotto** definition (includes valuation path per their docs). |
| ETK assets vs StatFin **S13141 F0** stocks | Treat as **different series**; do not merge without explanation. |
| Provisional latest year | ETK publishes **preliminary** figures (e.g. press-year tables) before final insurer closings — mirror assets pipeline: state **provisional/revisions** in copy or `source.notes`. |

---

## D. Proposed processed file shape (first pass)

**File name (proposal):** `src/data/processed/pension-funding-flows-finland.json`  
**Module prefix (proposal):** `src/lib/data/pensionFundingFlows/` (parallel to `pensionAssets/`, not a shared generic “all datasets” framework).

**Top-level (conceptual)**

- `schemaVersion`: `1`
- `unit`: `"MEUR"` (all monetary fields **millions of euros**, current prices — confirm against table “milj. euroa”).
- `flowConvention`: short string, e.g. `"SIGNED_INFLOW_POSITIVE"` or `"SOURCE_SIGNS"` — **must** be fixed in Phase 2 so transforms and charts stay consistent.
- `source`: same idea as assets — `provider`, `datasetId`, `datasetTitle`, `seriesDefinition`, `documentationUrl`, `dataPortalUrl`, `retrievedAt`, optional `notes[]`.
- `series`: non-empty array of **annual observations**, sorted by `year`.

**Observation fields**

| Field | Role | Source-native vs derived |
|-------|------|---------------------------|
| `year` | Calendar year (or statistic year as defined by ETK) | Native (dimension) |
| `contributionsMillionEur` | Premium / insurance contribution income | **Native** (ETK vakuutusmaksut) |
| `investmentReturnsMillionEur` | Investment result | **Native** (ETK sijoitustuotto) |
| `pensionExpenditureMillionEur` | Paid earnings-related pensions | **Native** (ETK maksetut eläkkeet); store **signed** consistently with `flowConvention` (typically **negative** if inflows are positive) |
| `employmentFundShareMillionEur` | TR-osuus | **Native** (optional column; omit from v1 chart if narrative stays minimal) |
| `stateShareMillionEur` | Valtion osuus | **Native** (optional) |
| `transfersMillionEur` | Siirrot | **Native** (optional) |
| `operatingExpensesMillionEur` | Kokonaisliikekulut (or ETK “toimintakulut” if that is the table line used) | **Native** (recommended for a honest “flows” picture; typically **negative** if inflows are positive) |
| `taxesMillionEur` | Direct taxes in flow table, if separate | **Native** (optional) |
| `pensionAssetsOpeningMillionEur` | Assets at 1 Jan | **Native** (optional; Chart B / reconciliation) |
| `pensionAssetsClosingMillionEur` | Assets at 31 Dec | **Native** (optional) |
| `netCashFlowMillionEur` | Net of included flow lines (excl. opening/closing stocks) | **Derived** |
| `statisticalDiscrepancyMillionEur` | `opening + netCashFlow - closing` if stocks present | **Derived** (optional sanity) |

**Naming rationale:** `*MillionEur` matches `assetsMillionEur` in `processedSchema.ts` for pension assets. Prefix verbs (`contributions`, `pensionExpenditure`) keep **chart and i18n keys** readable.

**Minimal v1 processed subset (if you want a thin first artifact):**  
`year`, `contributionsMillionEur`, `investmentReturnsMillionEur`, `pensionExpenditureMillionEur`, `netCashFlowMillionEur`, plus `source` metadata. Add optional natives before any UI that needs them.

---

## E. Chart direction for later phases (not implemented now)

- **Chart A — Annual funding flows over time:** Component/stacked or small-multiple **signed** flows from **ETK-derived** processed fields (`contributionsMillionEur`, `investmentReturnsMillionEur`, `pensionExpenditureMillionEur`, optionally operating/taxes/transfers). This is the **primary** visualization tied to **this** dataset.
- **Chart B — Net balance / system balance context:** Prefer **`netCashFlowMillionEur` (derived)** for “surplus/deficit **of flows**”. For **asset level**, either reuse the **existing StatFin stock** processed file for continuity with the current homepage story, or use **ETK closing assets** from this table for a **self-contained** funding chapter — **do not mix without explicit copy**.

**“Funding” in the first implementation:** Treat **`funding` as a narrative term**, not a mandatory primary series. Expose **native** contributions, expenditure, and investment result; expose **`netCashFlowMillionEur` as the main derived “balance of flows”** metric. Avoid implying a single government “funding” line unless a future source provides one unambiguously.

---

## F. Phase 2 checklist (forward reference)

1. Add `sourceConstants.ts` for ETK table id, UI URLs, and raw filename.
2. Add ingest script: POST (or GET per ETK PxWeb docs) → `src/data/raw/…json` verbatim.
3. Add raw Zod schema matching **actual** JSON-stat version from ETK.
4. Implement `fromRaw*.ts`: pivot `Rahavirta` → observation fields + derived `netCashFlowMillionEur`.
5. Extend or duplicate `build-processed.ts` pattern (separate script entry is clearer than overloading the assets-only script).
6. Wire **`server-only` loader** and feature transforms only when the product asks for runtime use.

---

## References (stable entry points)

- ETK — Työeläkejärjestelmän eläkevarat ja rahavirrat: https://www.etk.fi/tutkimus-tilastot-ja-ennusteet/tilastot/tyoelakkeiden-rahoitus/tyoelakejarjestelman-elakevarat-ja-rahavirrat/
- ETK PxWeb folder: https://tilastot.etk.fi/pxweb/fi/ETK/ETK__180tyoelakkeiden_rahoitus__10rahavirrat/?tablelist=true
- Statistics Finland — RTP (existing assets context): https://stat.fi/en/statistics/rtp
- Statistics Finland — VTP / `11yx` (sector income & expenditure): https://stat.fi/en/statistics/vtp
