# Pension Project

Multilingual **Next.js** portfolio site: an editorial, evidence-led view of **Finnish employment pension scheme financial assets** as published in **Statistics Finland’s national financial accounts** (one official time series, one signature chart).

**Goals**

1. **Portfolio / editorial** — calm reading rhythm, clear narrative, visible sources and caveats (not a dashboard).
2. **Technical clarity** — reproducible **raw → validate → processed → view-model → UI** data path, thin routes, server-first rendering.

## Stack

- **Next.js 16** (App Router), **React 19**, **TypeScript**
- **next-intl** — locale-prefixed routes (`/en`, `/fi`), message JSON per locale
- **Tailwind CSS v4**
- **Zod** — raw + processed data schemas
- **Recharts** — single client chart component
- **ESLint** + **Prettier**

## Requirements

- **Node.js** 20+ recommended (aligned with `package.json` engines-style dev deps)

No runtime `.env` is required for the default static dataset: the app reads committed **processed JSON** from disk at build/runtime.

## Quick start

```bash
npm install
npm run dev
```

Open **http://localhost:3000** — middleware redirects to a locale (default **en**: `/en`).

Production build:

```bash
npm run build
npm run start
```

## Scripts

| Script | Purpose |
|--------|---------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Production server |
| `npm run lint` | ESLint |
| `npm run format` | Prettier write (`src/**/*`) |
| `npm run ingest` | Fetch PxWeb JSON-stat2 → `src/data/raw/statfin-rtp-11qp-pension-assets.json` |
| `npm run transform:data` | Raw → validate/normalize → `src/data/processed/pension-assets-finland.json` |

After refreshing data, run **both** `ingest` and `transform:data`, then commit updated artifacts if you want reproducible deploys.

## Repository layout (summary)

| Path | Role |
|------|------|
| `src/app/[locale]/` | Routes: home, methodology, sources, `not-found` |
| `src/middleware.ts` | `next-intl` locale routing |
| `src/lib/i18n/` | Routing config + request config (message loading) |
| `src/messages/` | `en.json`, `fi.json` — user-facing copy |
| `src/lib/data/` | Processed loader, Zod schemas, StatFin constants |
| `src/lib/formatting/` | Locale-aware currency / percent helpers |
| `src/features/pension/` | Domain: homepage sections, transforms, chart wrapper |
| `src/components/` | Shared layout, nav, primitives |
| `src/data/raw/` | Committed PxWeb response (ingest output) |
| `src/data/processed/` | Committed normalized JSON (transform output) |
| `src/scripts/ingest/` | Node fetch script |
| `src/scripts/transform/` | TS transform CLI |

Deeper detail: **[docs/architecture.md](./docs/architecture.md)** and **[docs/data-pipeline.md](./docs/data-pipeline.md)**.

## Data source (summary)

- **Provider:** Statistics Finland (Tilastokeskus)  
- **Table:** national financial accounts, **11qp** (`statfin_rtp_pxt_11qp`)  
- **Series:** sector **S13141** (employment pension schemes), instrument **F0** (total financial assets), **stock** positions, **million EUR**

URLs and assumptions are documented in `src/lib/data/pensionAssets/sourceConstants.ts` and **docs/data-pipeline.md**.

## Internationalization

- Locales: **`en`** (default), **`fi`**
- All primary UI strings live in **`src/messages/{locale}.json`**
- Numeric presentation uses **`src/lib/formatting/`** with an explicit locale (from the route)

## Documentation index

| Doc | Audience |
|-----|----------|
| [docs/architecture.md](./docs/architecture.md) | Developers — routing, layers, boundaries |
| [docs/data-pipeline.md](./docs/data-pipeline.md) | Developers — ingest, schemas, refresh |
| [docs/repository-audit.md](./docs/repository-audit.md) | Maintainers — strengths, gaps, launch notes |
| [docs/qa-checklist.md](./docs/qa-checklist.md) | Pre-launch / pre-release QA |
| [docs/agents.md](./docs/agents.md) | Coding agents — safe edit zones |
| [AGENTS.md](./AGENTS.md) | Full agent policy (constraints, style) |
| [CONTRIBUTING.md](./CONTRIBUTING.md) | Contributors |
| [docs/solution-specification.md](./docs/solution-specification.md) | Original Finnish planning spec (historical context; implementation may differ) |

## License

See [LICENSE](./LICENSE) (MIT). Adjust copyright holder before a public release if needed.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md).
