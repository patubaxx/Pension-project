# Contributing

Thank you for improving Pension Project. This repo prioritizes **editorial clarity** and **clean data boundaries** over feature sprawl.

## Before you change code

1. Read **[AGENTS.md](./AGENTS.md)** — non-negotiable constraints (data pipeline, i18n, scope).
2. Skim **[docs/architecture.md](./docs/architecture.md)** — where UI, data, and transforms belong.
3. Skim **[docs/data-pipeline.md](./docs/data-pipeline.md)** — if you touch data or charts.

## Pull request expectations

- **Thin routes** — `page.tsx` composes sections and loads view models; no raw parsing or heavy transforms in route files.
- **No new dependencies** unless clearly justified (see AGENTS.md).
- **i18n** — user-visible strings in `src/messages/en.json` and `src/messages/fi.json` together.
- **Formatting** — use `src/lib/formatting/` for locale-aware numbers; do not duplicate format logic in components.
- **Quality** — `npm run lint` and `npm run build` pass.

## Local checks

```bash
npm install
npm run lint
npm run build
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
