# QA and launch checklist

Reusable checklist for **portfolio launch** and **public repository** readiness. Check items explicitly; note owner and date in your release notes.

---

## Product / content

- [ ] Homepage states **what** is measured (stock of financial assets, sector S13141, national accounts).
- [ ] Homepage states **what it is not** (not flows-only story, not individual advice, not full solvency picture).
- [ ] **Narrative order** reads as one story: hero → why → chart → context → methodology/sources.
- [ ] **EN** and **FI** both read naturally; no obvious missing keys or English leftovers in `/fi`.
- [ ] **Methodology** and **sources** wording aligns with homepage (same dataset identity, no contradictory “phase” language).
- [ ] **Chart:** unit (bn EUR), timeframe, and **revision/provisional** caveats visible.
- [ ] **Interpretation** notes present (“how to read”, “what this does not mean”) — no over-claims.

---

## Functional

- [ ] **`npm install`** from clean clone succeeds (or **`npm ci`** after lockfile is present).
- [ ] **`npm run dev`** — `/` redirects to locale; `/en` and `/fi` render.
- [ ] **Nav links** — Story, Methodology, Sources work for both locales.
- [ ] **Locale switcher** preserves path, switches messages and number formatting.
- [ ] **`npm run build`** completes without errors.
- [ ] **`npm run lint`** passes.
- [ ] **`npm run format`** run when formatting drift is acceptable (or document skip).
- [ ] **404** — not-found page renders with working link home.
- [ ] **No dead imports** or references to removed modules (search for old component names if refactors landed).

---

## Data pipeline

- [ ] **Source URL** still valid: PxWeb endpoint in `fetch-pension-assets.mjs` (spot-check in browser or curl).
- [ ] **Identifiers** in `sourceConstants.ts` match ingest query (table, sector **S13141**, instrument **F0**).
- [ ] **`npm run ingest`** succeeds (network); raw JSON updated as intended.
- [ ] **`npm run transform:data`** succeeds; processed JSON validates against Zod.
- [ ] **Processed artifact** committed (or deployment pipeline generates it — document which).
- [ ] **`retrievedAt`** (or equivalent) in processed file reflects refresh policy.
- [ ] **Revision handling** understood: team knows latest year may change when StatFin revises.

---

## Accessibility

- [ ] **Heading order:** one **`h1`** per page (home hero; methodology; sources; not-found).
- [ ] **Landmarks:** `header` / `main` / `footer` sensible in layout; nav has accessible name (`aria-label` localized).
- [ ] **Focus:** visible **`focus-visible`** on interactive controls (nav, locale, key links).
- [ ] **Chart:** meaningful **`aria-label`**; empty state announced if no data.
- [ ] **Keyboard:** tab through header controls; no keyboard traps in chart container.
- [ ] **Mobile:** readable line lengths, chart not clipped, touch targets adequate on nav/locale.
- [ ] **Contrast:** body text and muted captions readable on stone backgrounds (spot-check).

---

## Open source / repo hygiene

- [ ] **README** positions the repo as an **OSS application / reference implementation** (not an npm chart library or analytics platform).
- [ ] **LICENSE** present (**MIT**); copyright line matches maintainer policy (**patubaxx**).
- [ ] **CONTRIBUTING.md** present; contribution model (small PRs, scope discipline) is clear.
- [ ] **Node policy:** **`.nvmrc`** and **`package.json` → `engines.node`** align with CI and local dev.
- [ ] **CI** workflow runs **`npm ci`**, **`npm run lint`**, **`npm run build`** on push/PR to default branch(es).
- [ ] **docs/** linked from README (`architecture`, `data-pipeline`, audit, this checklist, agents).
- [ ] **AGENTS.md** matches real paths and workflows.
- [ ] **No secrets** in repo; document if `.env` ever introduced.

---

## Post-launch spot checks (production)

- [ ] Correct **`lang`** on `<html>` per locale.
- [ ] **Metadata** title/description per locale on key routes.
- [ ] **External links** (StatFin) open in new context safely (`rel` attributes).

---

## Sign-off

| Role | Name | Date |
|------|------|------|
| Content | | |
| Technical | | |
