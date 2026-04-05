# Agent quick reference (repo-specific)

This file **complements** the root **[AGENTS.md](../AGENTS.md)** with concrete paths and workflows for **this repository’s layout**. If something conflicts, prefer **AGENTS.md** for product policy and **this file** for file placement.

**Scope:** This repo is a **single application** (`private: true` in `package.json`), not a library to publish to npm. Changes should preserve that boundary unless maintainers explicitly broaden it.

## Safe zones (typical tasks)

| Task | Where to work |
|------|----------------|
| Homepage copy (EN/FI) | `src/messages/en.json`, `src/messages/fi.json` — keep keys in sync |
| Homepage layout/sections | `src/features/pension/components/*.tsx` |
| New homepage section | Add component under `src/features/pension/components/`, compose from `src/app/[locale]/page.tsx`, extend `loadHomeStoryViewModel` if new data needed |
| Chart presentation only | `PensionAssetsLineChart.tsx`, `FundingFlowsMultiLineChart.tsx`, `FundingNetCashFlowChart.tsx` — props in, no I/O |
| Number formatting | `src/lib/formatting/` |
| Processed schema / loader | `src/lib/data/pensionAssets/processedSchema.ts`, `loadProcessed.ts` |
| Funding flows processed / loader | `src/lib/data/pensionFundingFlows/processedSchema.ts`, `loadProcessed.ts` |
| Raw validation / raw→processed | `src/lib/data/pensionAssets/fromRawStatfin.ts`, `rawStatfinSchema.ts` |
| Funding flows raw / transform | `src/lib/data/pensionFundingFlows/rawEtkSchema.ts`, `fromRawEtk.ts` |
| View-model shapes | `src/features/pension/model/types.ts`, `src/features/pension/transforms/` |
| Funding flows chart VMs | `src/features/pension/transforms/toFundingFlowsViewModels.ts` |
| Ingest query / raw file output | `src/scripts/ingest/fetch-pension-assets.mjs`, `src/data/raw/` |
| ETK funding flows ingest | `src/scripts/ingest/fetch-pension-funding-flows.mjs` |
| Rebuild processed JSON | `src/scripts/transform/build-processed.ts`, `src/data/processed/` |
| Rebuild funding flows processed | `src/scripts/transform/build-pension-funding-flows.ts` |
| PxWeb URLs + dataset narrative constants | `src/lib/data/pensionAssets/sourceConstants.ts` |
| ETK funding flows constants | `src/lib/data/pensionFundingFlows/sourceConstants.ts` |
| Global chrome | `src/components/layout/`, `src/components/navigation/` |
| Shared typography / section shell | `src/components/primitives/` |
| Locale routing config | `src/lib/i18n/routing.ts`, `src/lib/i18n/request.ts`, `src/middleware.ts` |

## Do not (without explicit approval)

- Fetch PxWeb or parse raw JSON-stat **inside** React components or chart files.
- Add **hardcoded** user-visible strings in JSX when they belong in **`src/messages/`**.
- Put **domain-specific** chart logic under generic `src/components/` — keep it under **`src/features/pension/`**.
- Expand into **dashboard controls**, **multi-chart frameworks**, or **CMS** unless the user requests it.

## i18n workflow

1. Add or change keys in **`en.json`**.
2. Mirror in **`fi.json`** (same key paths).
3. Use `getTranslations("Namespace")` in server components or `useTranslations` in client components.

## Data refresh workflow

1. `npm run ingest` — updates raw JSON.
2. `npm run transform:data` — regenerates processed JSON + validates.
3. `npm run build` — ensures runtime parse still passes.

Commit raw + processed if you want **reproducible** deploys and auditable diffs.

## Verification commands

Same as CI:

```bash
npm ci
npm run lint
npm run build
```

## Further reading

- [architecture.md](./architecture.md) — full layering diagram in prose.
- [data-pipeline.md](./data-pipeline.md) — dataset identity and caveats.
- [qa-checklist.md](./qa-checklist.md) — pre-release checks.
