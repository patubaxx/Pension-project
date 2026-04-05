# Repository audit (technical clarity)

**Scope:** Current state after Phases 1–3. **Not** a product redesign proposal.

## Executive summary

The repository **clearly implements** a server-first Next.js app with **locale-prefixed routes**, a **committed processed-data contract**, and **feature-local transforms**. Technical clarity is **strong** for a portfolio-sized codebase. **OSS release prep** added **MIT** (copyright **patubaxx**), **`.nvmrc`** + **`engines.node`**, **GitHub Actions CI** (`npm ci`, lint, build), and README/CONTRIBUTING positioning as a **reference application**, not an npm library.

**Launch readiness:** Suitable for **portfolio deploy** after [qa-checklist.md](./qa-checklist.md). **Public OSS publication** is viable with the above in place; still verify **PxWeb ingest** when refreshing data and monitor **Next.js middleware** deprecation notices.

---

## Strengths

### Architecture

- **Thin home route** (`src/app/[locale]/page.tsx`): composes sections + single view-model loader.
- **Explicit data boundary:** `server-only` loader + Zod at the processed boundary.
- **Pure transforms** under `src/features/pension/transforms/` — easy to test mentally and extend.
- **Minimal client JS:** only `LocaleSwitcher` and `PensionAssetsLineChart`.

### Folder semantics

- `src/lib/data/pensionAssets/` groups everything for **one dataset** (schemas, load, constants).
- `src/features/pension/` owns **homepage story** implementation without polluting `components/`.
- `src/messages/` is the obvious i18n location; keys are namespaced (`PensionHome`, `Meta`, etc.).

### Data reproducibility

- Raw and processed JSON are **versionable artifacts**; scripts are **named and documented** in `package.json`.
- `sourceConstants.ts` doubles as **documentation** for PxWeb identifiers and URLs.

### Product / trust

- Homepage emphasizes **stocks vs flows**, **revisions**, and **source** without academic overload.
- Dedicated **methodology** and **sources** routes; homepage **StoryTrustSection** ties them together.

### Tooling

- **ESLint** + **Prettier** present; `npm run lint` clean on audit date.
- **TypeScript** strict usage across data and features.

---

## Weaknesses and gaps

### Documentation drift (mitigated)

- **`docs/solution-specification.md`** (Finnish) reflects **early planning** (e.g. ETK-first framing). **Implementation** uses **Statistics Finland RTP** for the quantitative series. Treat the spec as **historical context**; trust **README**, **data-pipeline.md**, and **sourceConstants.ts** for current truth.
- **AGENTS.md** previously listed `src/components/charts/` — charts actually live under **`src/features/pension/components/charts/`**. **AGENTS.md** and **docs/agents.md** are updated to match.

### Open source / governance

- **LICENSE:** **MIT** with copyright **patubaxx** (OSS release prep).
- **CONTRIBUTING.md:** Present; emphasizes small PRs and scope discipline.

### Accessibility (minor residual)

- **Chart:** `role="img"` + `aria-label` is appropriate; there is **no** tabular alternative for screen-reader data exploration beyond tooltips — acceptable for portfolio scope; add a data table later only if targeting stricter WCAG dataviz expectations.

### Operations

- **CI:** `.github/workflows/ci.yml` runs on **push/PR** to `main` or `master`: `npm ci`, `npm run lint`, `npm run build` (Node from `.nvmrc`).
- **Next.js middleware** deprecation warning (framework): monitor Next.js migration guidance (`proxy` vs `middleware` naming) — not a functional blocker at audit time.

### i18n

- **Ingest** uses English PxWeb API path only — fine if raw values are numeric; UI copy is fully EN/FI. Documented in **data-pipeline.md**.
- **Parallel edits** required for any new user-facing string (en + fi) — intentional; risk is forgetting `fi.json` (catch with checklist).

### Dependencies

- Footprint is **lean** (next-intl, recharts, zod, server-only). No unnecessary CMS/auth stacks.

---

## Launch-readiness observations

| Area | Status |
|------|--------|
| Build | `npm run build` succeeds when dependencies installed |
| Data | Processed file committed; build fails loudly if invalid/missing |
| Locales | `/en` and `/fi` static generation |
| Sources page | External links + constants centralized |
| Legal OSS | MIT + patubaxx; CONTRIBUTING present |
| CI | Lint + build on default branches |
| Node policy | `.nvmrc` (20.x) + `engines.node` ≥ 20 |

---

## Recommended next steps (prioritized)

1. **Run** [qa-checklist.md](./qa-checklist.md) before each significant release.
2. **Optional:** Extend methodology page with prose when you want more narrative depth (not required for technical clarity).
3. **Optional:** Table fallback or `prefers-reduced-motion` for chart if targeting strict a11y audits.

---

## Intentionally out of scope (current product)

- Multi-dataset dashboards, filters, auth, CMS.
- Scrollytelling engine, second chart framework.
- Runtime fetch of PxWeb from the browser.

These boundaries are **documented** so contributors do not expand scope accidentally.
