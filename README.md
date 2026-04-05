# Pension Project

**Open-source project and reference implementation** — a multilingual **Next.js** application that presents one **editorial data story**: Finnish **employment pension scheme financial assets** as published in **Statistics Finland’s national financial accounts** (one official series, one signature chart).

This is **not** an npm library, a generic chart toolkit, or a pension analytics / policy platform. It is a **whole app** you clone and run to study or fork **editorial presentation + a disciplined data pipeline**.

**Goals**

1. **Portfolio / editorial** — calm reading rhythm, clear narrative, visible sources and caveats (not a dashboard).
2. **Technical clarity** — reproducible **raw → validate → processed → view-model → UI** path, thin routes, server-first rendering.

## Requirements

- **Node.js** **≥ 20** (see `package.json` → `engines` and **`.nvmrc`** for local version managers).
- No runtime `.env` is required for the default app: it reads committed **processed JSON** from disk at build/runtime.

**CI:** pushes and pull requests to `main` or `master` run **`npm ci`**, **`npm run lint`**, and **`npm run build`** (see [`.github/workflows/ci.yml`](./.github/workflows/ci.yml)).

## Stack

- **Next.js 16** (App Router), **React 19**, **TypeScript**
- **next-intl** — locale-prefixed routes (`/en`, `/fi`), message JSON per locale
- **Tailwind CSS v4**
- **Zod** — raw + processed data schemas
- **Recharts** — single client chart component
- **ESLint** + **Prettier**

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

For a clean install matching CI:

```bash
npm ci
npm run lint
npm run build
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

URLs and assumptions: `src/lib/data/pensionAssets/sourceConstants.ts` and **[docs/data-pipeline.md](./docs/data-pipeline.md)**.

## Internationalization

- Locales: **`en`** (default), **`fi`**
- UI strings: **`src/messages/{locale}.json`**
- Numbers: **`src/lib/formatting/`** with locale from the route

## Documentation

| Doc | Audience |
|-----|----------|
| [docs/architecture.md](./docs/architecture.md) | Developers — routing, layers, boundaries |
| [docs/data-pipeline.md](./docs/data-pipeline.md) | Ingest, schemas, refresh |
| [docs/repository-audit.md](./docs/repository-audit.md) | Strengths, gaps, release notes |
| [docs/qa-checklist.md](./docs/qa-checklist.md) | Pre-release QA |
| [docs/agents.md](./docs/agents.md) | Coding agents — safe edit zones |
| [AGENTS.md](./AGENTS.md) | Full agent policy |
| [CONTRIBUTING.md](./CONTRIBUTING.md) | How to contribute |
| [docs/solution-specification.md](./docs/solution-specification.md) | Original Finnish planning spec (historical; implementation uses StatFin RTP for this series) |

## Contributing

Small, focused PRs are welcome — especially docs, fixes, and clarity improvements. Please preserve architecture and scope; see **[CONTRIBUTING.md](./CONTRIBUTING.md)**.

## License

[MIT](./LICENSE) — Copyright (c) patubaxx
