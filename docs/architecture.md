# Architecture (current implementation)

This document describes **how the code is organized today**, not a future target state.

## Routing and locales

- **App Router** under `src/app/`.
- All user-facing pages live under **`src/app/[locale]/`** (`page.tsx`, `methodology/page.tsx`, `sources/page.tsx`, `not-found.tsx`).
- **`src/middleware.ts`** applies `next-intl` middleware so every matched path is locale-aware; **`localePrefix: "always"`** → URLs are `/en/...` and `/fi/...`.
- **`src/lib/i18n/routing.ts`** defines locales (`en`, `fi`), default locale, and exports navigation helpers (`Link`, etc.).
- **`src/lib/i18n/request.ts`** is the **next-intl plugin entry** (referenced from `next.config.ts`): loads `src/messages/{locale}.json` per request.

There is **no** `app/page.tsx` at the root without `[locale]`; the locale segment is the entry.

## Server vs client

- **Default: Server Components.** Homepage sections (`HeroSection`, `FundingOverviewSection`, etc.) are async server components using `getTranslations`.
- **Client boundary** is intentionally small:
  - `LocaleSwitcher` — client (pathname + locale switch).
  - `PensionAssetsLineChart` — client (Recharts).
- **Processed data** is loaded only on the server via **`import "server-only"`** in `loadProcessedPensionAssets` — a hard signal not to import from client bundles.

## Layering

### Routes (`src/app/[locale]/`)

- Compose feature sections.
- Call **`loadHomeStoryViewModel(locale)`** (or translations only on static pages).
- Avoid: parsing JSON-stat, Zod validation of raw payloads, ad hoc formatting.

### Feature domain (`src/features/pension/`)

| Area | Responsibility |
|------|----------------|
| `content/home.ts` | Server-only entry: load processed file, return **`HomeStoryViewModel`** |
| `transforms/` | Pure functions: processed file → section/chart view models |
| `model/types.ts` | Serializable view-model types (chart points, metrics, etc.) |
| `components/` | Section UI; chart wrapper imports client chart |
| `utils/section-anchors.ts` | Stable `id`s for sections |

### Data (`src/lib/data/`)

- **`pensionAssets/loadProcessed.ts`** — read `src/data/processed/pension-assets-finland.json`, parse with Zod (`processedSchema.ts`).
- **`pensionAssets/fromRawStatfin.ts`** — build processed artifact from raw (used by **transform script**, not at runtime in the browser).
- **`pensionAssets/rawStatfinSchema.ts`** — raw boundary validation.
- **`pensionAssets/sourceConstants.ts`** — filenames, PxWeb URLs, human-readable series definition (also used by Sources page links).

### Formatting (`src/lib/formatting/`)

- Currency / billion EUR / percent ratio helpers take **`AppLocale`** so server-rendered numbers match the active route.

### Shared UI (`src/components/`)

- **`layout/`** — `SiteShell`, `SiteFooter`.
- **`navigation/`** — `MainNav`, `LocaleSwitcher`.
- **`primitives/`** — `Section`, `Stack`, typography (`DisplayTitle`, `SectionTitle`, `PageTitle`, etc.).

Charts are **not** under `src/components/charts/`; the pension chart lives under **`src/features/pension/components/charts/`** next to the feature that owns the data shape.

## Data flow (runtime)

1. User requests `/en` or `/fi`.
2. Home `page.tsx` calls **`loadHomeStoryViewModel(locale)`**.
3. That loads **processed JSON** from disk, validates with Zod, runs **transforms** to view models.
4. Server components render HTML; the chart subtree hydrates with **pre-shaped points** (no fetch in the chart).

## Why this structure

- **Portfolio + maintainability:** reviewers see data boundaries immediately (`lib/data`, `features/pension/transforms`, `messages`).
- **Reproducibility:** raw and processed artifacts can be committed and diffed; ingest/transform are explicit scripts.
- **i18n:** copy and number formatting stay out of presentation logic as much as possible.

## Intentional scope boundaries

- No CMS, auth, or user-generated content in-repo.
- No generic “dashboard” chart framework — one domain chart, one pipeline.
- Expanding to new datasets should add **parallel** `lib/data/...` modules and feature transforms, not ad hoc logic in `page.tsx`.

## Related docs

- [data-pipeline.md](./data-pipeline.md) — scripts, files, and refresh flow.
- [agents.md](./agents.md) — where agents should edit safely.
