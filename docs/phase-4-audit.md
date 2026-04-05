# Phase 4 audit — funding flows and project polish

**Scope:** Post–Phase 3 review of the ETK funding flows homepage integration and surrounding repo accuracy. **Follow-up:** Phase 4 implementation (docs, Sources, story-trust copy, copy dedupe, small Methodology note) was completed in-repo after this audit.

**Original audit intent:** assessment and backlog only—the sections below retain the original findings for context.

**Reviewed in repo:** `FundingFlowsSection`, both funding chart clients, `page.tsx` composition, `en.json` / `fi.json` (`PensionHome.sections.fundingFlows`, `storyTrust`, `SourcesPage`, `MethodologyPage`, `Meta`), `docs/architecture.md`, `docs/data-pipeline.md`, `docs/agents.md`, `docs/funding-flows-source-note.md`.

---

## 1. Overall assessment

The funding flows block **fits the narrative order** (hero → overview → **RTP asset stock** → **ETK annual flows** → narrow net → key metrics still RTP-only → methodology/sources). Visually it **reuses the same section shell** as the signature chart (figure + read panel + footnote), so it reads as **editorial continuation**, not a dashboard module.

**Density:** The homepage is **longer** than before (two large figures, four explanatory strips, caveat, source line). That is acceptable for a data story but pushes **mobile scroll**. Not broken—just **worth a light pass** on vertical rhythm and copy length, not a layout redesign.

**Verdict:** Implementation quality is **strong enough to ship** as MVP UI. The **highest-value Phase 4 work is trust + accuracy**: static pages and docs still imply a **single** homepage dataset (StatFin only). Fixing that is more important than visual micro-tweaks.

---

## 2. High-priority fixes (do these in Phase 4)

### 2.1 Documentation drift (factual errors)

These are **wrong today** and confuse reviewers:

| Doc | Issue |
|-----|--------|
| `docs/architecture.md` | **Client boundary** lists only `PensionAssetsLineChart`; omits `FundingFlowsMultiLineChart` and `FundingNetCashFlowChart`. **`pensionFundingFlows/`** says “not wired to routes yet”—**false**; it is loaded in `loadHomeStoryViewModel` and rendered on the homepage. **Scope line** “one domain chart” understates the current UI (multiple Recharts surfaces). |
| `docs/data-pipeline.md` | Layer 3 says funding flows loader is “**not wired to pages yet**”—**false**. Layers 4–5 omit `toFundingFlowsViewModels` and the funding charts; intro still frames the doc as **only** StatFin → one chart. |
| `docs/funding-flows-source-note.md` | Phase 2 block still says “**no homepage UI yet**” and omits Phase 3—**stale**. |

**Action:** Patch these files in one small doc PR: correct wiring statements, list funding transforms + chart components, add a one-line **Phase 3** status (homepage section + charts), optionally add link to `phase-4-audit.md` if you keep it.

### 2.2 Sources page and in-story trust copy

- **`SourcesPage`:** `intro` is singular (“Primary dataset…”) and body covers **only** StatFin 11qp. The homepage now plots **ETK flows** as well—readers who verify on Sources will **miss the second lineage**.
- **`PensionHome.sections.storyTrust.sourcesBody`:** Same gap—only mentions the RTP chart.

**Action (minimal):** Add a **second** sources block (or a short “Also used on the story” subsection) for ETK `rahavirrat01_kaikki`, with links from `ETK_PENSION_FUNDING_FLOWS` in `sourceConstants.ts` (documentation + PxWeb UI URL). Mirror in EN/FI messages; keep the StatFin block as primary if you want hierarchy.

---

## 3. Medium-priority optional improvements

### 3.1 Copy tightening (reduce repetition)

**Duplication:** Intro, Chart B read panel, and caveat all restate **ETK vs RTP**, **narrow net definition**, and **not solvency**. The content is correct but **noisy**.

**Action:** Pick **one** place for the full ETK/RTP distinction (e.g. caveat block), **shorten intro** to one bridge sentence + “see below”, and **trim** Chart B `readBody` to what is not already said above—or invert (short caveat, keep read panel). **Do not delete** the distinctions; **rebalance** word count.

### 3.2 Methodology page

The methodology page remains **generic** (raw → processed → VM). It does **not** mention a **second dataset** or the **narrow net** definition.

**Action:** Add **one** short paragraph or bullet list under existing content: “Homepage also uses ETK funding flows; narrow net = contributions + investment result − pensions paid (processed file); not the same as RTP stocks.” EN/FI. **Skip** long methodology expansion unless product asks for it.

### 3.3 Accessibility / Chart B encoding

- **Colour:** Positive (dark) vs negative (grey) bars are **distinguishable**; **position relative to the zero line** is the primary non-colour cue—**good**.
- **Legend labels** (“Year with positive narrow net”) are **wordy**; on small screens they wrap. Optional shorten to “Positive year” / “Negative year” with the **narrow net** term kept in caption or read panel.
- **Tooltips:** Recharts tooltips on **touch** need a tap—same as the assets chart; not a regression. No change required unless you adopt a project-wide pattern later.
- **`role="img"`** on chart wrappers: matches existing assets pattern; summary is in **aria-label**. Acceptable; no mandatory change.

### 3.4 Visual / responsive polish

- **Fixed heights** (340px + 300px) match the signature chart order of magnitude; **optional** `min-h` / slightly smaller height on `max-sm` if you want less scroll—**test on a real phone** first.
- **Chart A** three lines + bottom legend: on **very narrow** widths, legend may wrap; if ugly, **stack legend vertically** via Recharts `layout="vertical"` or move key lines into caption only—**only if** visual QA shows a problem.

### 3.5 Meta description and footer

- **`Meta.homeDescription`:** Still describes **only** national-accounts reserves. Optional one clause: “and ETK annual funding flows”—keeps search/social honest.
- **`Footer.note`:** Still references only `ingest` + `transform:data`. Optional append “; flows: `ingest:funding-flows` + `transform:data:funding-flows`”.

### 3.6 `docs/agents.md`

Safe-zones row “Chart presentation only” still points **only** at `PensionAssetsLineChart`. **Action:** Add funding chart filenames so agents do not assume a single chart file.

---

## 4. What is already good — keep as-is

- **Architecture:** Server load + pure transforms + serializable VMs + thin `page.tsx`—**do not refactor** for Phase 4.
- **Chart choice:** Multi-line for three **comparable** magnitudes; bars + **zero reference** for signed net—**appropriate** and calm.
- **Read panels:** Same pattern as signature section—supports **non-tooltip** reading; keep the pattern.
- **Caveat block:** Prominence level is **right** for ETK vs RTP and non-solvency—only trim duplicate prose, not the substance.
- **Styling:** Stone palette, borders, typography alignment with `PensionAssetsSignatureSection`—**consistent**.
- **`data-pipeline.md`** ETK table, commands, filenames, sign convention—**accurate** (aside from “wired” wording in Layer 3).

---

## 5. Methodology / sources — recommendation

| Page | Update now? | Rationale |
|------|-------------|-----------|
| **Sources** | **Yes** | Homepage claims two data stories; Sources currently documents one. Small addition preserves **verifiability**. |
| **Methodology** | **Nice-to-have** | One short clarification prevents “where is narrow net defined?” without duplicating the whole homepage. |

Homepage-only explanation is **not sufficient** for a portfolio that stresses transparency on dedicated Sources/Methodology routes.

---

## 6. Documentation follow-up summary

| File | Change |
|------|--------|
| `docs/architecture.md` | Client components list; `pensionFundingFlows` wired; soften “one chart” scope wording. |
| `docs/data-pipeline.md` | Layer 3–5: funding flows **on homepage**; list `toFundingFlowsViewModels`, section + chart names. |
| `docs/funding-flows-source-note.md` | Phase 2 text + **Phase 3** line (UI integrated). |
| `docs/agents.md` | Chart safe-zone row includes funding charts. |
| `docs/phase-4-audit.md` | This file (audit record). |

---

## 7. Recommended Phase 4 implementation scope

Execute in roughly this order for **smallest coherent diffs**:

1. **Doc corrections** — `architecture.md`, `data-pipeline.md`, `funding-flows-source-note.md`, `agents.md` (single PR).
2. **Sources page** — ETK subsection + i18n; use `ETK_PENSION_FUNDING_FLOWS` URLs (second PR or same if tiny).
3. **`storyTrust.sourcesBody`** — one sentence that the story also uses ETK flows + link to `/sources` (messages EN/FI).
4. **Copy dedupe** — intro / chartB / caveat in `fundingFlows` messages only (no component restructure).
5. **Methodology** — optional short paragraph + i18n.
6. **Polish pass** — meta description, footer note, legend wording / mobile chart height **only after** spot-check on device.

**Explicit non-goals for Phase 4:** new datasets, new chart types, dashboard controls, shared “chart framework” abstraction, redesign of key metrics section, changing `loadHomeStoryViewModel` shape without need.

---

## 8. Ship readiness (UI)

**Can ship without further UI work?** **Yes**, for an MVP/story demo—the section is coherent, on-brand, and technically sound.

**Should you ship without doc/sources updates?** **Not ideal** for a “trust-forward” portfolio: fix **§2.1 and §2.2** before calling the release “complete” or using Sources as proof of lineage.
