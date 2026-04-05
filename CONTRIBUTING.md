# Contributing

Thanks for helping improve Pension Project. This repository is an **open-source application / reference implementation**, not a published npm package — we value **small PRs**, **clear boundaries**, and **technical clarity** over scope creep.

## What we welcome

- **Bug fixes** and **small corrections** (copy, a11y, types).
- **Documentation** improvements — onboarding, accuracy, agent guidance.
- **Refinements** that make the data pipeline or structure easier to understand, without changing product direction.

## What to avoid without prior discussion

- **New product surfaces** (extra dashboards, datasets, or major UI expansions).
- **Architecture rewrites** or large dependency additions.
- **Casual scope widening** — the editorial, single-series story is intentional.

Major features or directional changes should be **talked through** (issue or maintainer contact) before large patches.

## Before you change code

1. Read **[AGENTS.md](./AGENTS.md)** — non-negotiable constraints (data pipeline, i18n, scope).
2. Skim **[docs/architecture.md](./docs/architecture.md)** — where UI, data, and transforms belong.
3. Skim **[docs/data-pipeline.md](./docs/data-pipeline.md)** — if you touch data or charts.

## Pull request expectations

- **Focused PRs** — one coherent change is easier to review than a bundle of unrelated edits.
- **Thin routes** — `page.tsx` composes sections and loads view models; no raw parsing or heavy transforms in route files.
- **Dependencies** — avoid new packages unless clearly justified (see AGENTS.md).
- **i18n** — user-visible strings in **`src/messages/en.json`** and **`src/messages/fi.json`** together.
- **Formatting** — use **`src/lib/formatting/`** for locale-aware numbers.
- **Green checks** — match CI: **`npm run lint`** and **`npm run build`** pass locally.

## Local checks

Same as CI (recommended):

```bash
npm ci
npm run lint
npm run build
```

Day-to-day development:

```bash
npm install
npm run dev
```

If you change upstream data:

```bash
npm run ingest
npm run transform:data
npm run build
```

## Documentation

If you add routes, scripts, or change the data contract, update **README.md** and the relevant file under **docs/**.

## License

By contributing, you agree your contributions are licensed under the same terms as [LICENSE](./LICENSE).
