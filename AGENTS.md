# AGENTS.md

# Pension Project — Agent Guidelines

This document defines the operating rules for Cursor agents working on Pension Project.
It complements the architectural solution plan and acts as the practical implementation guide.

The purpose of these rules is to keep implementation:
- technically clean
- visually high quality
- consistent with the project scope
- easy to review and extend
- aligned with the intended portfolio quality level

---

## 1. Project context

Pension Project is an **open-source Next.js application** and **reference implementation**: a multilingual editorial site about Finnish pension funding data. It is **not** intended as a reusable npm package or a general-purpose chart library from this repository.

The product presents visually refined data stories about Finnish pension system funding.

The product direction is:
- premium editorial, not dashboard-first
- portfolio-first but production-minded
- technically disciplined
- visually calm, modern, and high quality
- easy to understand even for users without pension system expertise

Current MVP direction:
- one-page experience
- architecture must support later expansion to multiple pages
- supported languages from the start:
  - English
  - Finnish
- English is the primary language

---

## 2. Agent mission

When implementing code, always optimize for this order of priority:

1. architectural correctness
2. readability and maintainability
3. visual and interaction quality
4. performance
5. implementation speed

Do not optimize for short-term convenience if it weakens structure.

Agents must make the codebase easier to extend, not harder.

---

## 3. Non-negotiable constraints

These rules must always be followed.

### 3.1 Scope discipline
- Do not expand the product scope on your own.
- Do not invent new pages, systems, features, or dependencies unless clearly justified.
- Do not turn the MVP into a dashboard product.
- Do not add CMS, auth, backend services, or admin interfaces unless explicitly requested.
- Do not introduce complex exploratory data tooling in the MVP.

### 3.2 Data discipline
- UI components must not operate directly on raw source data.
- Raw data parsing, normalization, validation, and chart transforms must be separated from presentation.
- Do not fetch external pension source data directly inside UI components.
- Keep a clear pipeline:
  - raw source
  - validation
  - normalization
  - processed data
  - chart model
  - UI

### 3.3 i18n discipline
- Do not hardcode user-facing UI copy in components when it belongs in translations.
- All core interface text must come from i18n messages or structured content layers.
- English and Finnish must both be supported from the start.
- English is the default language.
- Locale handling must be consistent and route-aware.

### 3.4 Architectural discipline
- Prefer lightweight scalable structure over premature enterprise abstraction.
- Keep domain logic out of route files whenever practical.
- Keep formatting logic centralized.
- Keep client components to a minimum.
- Prefer server-oriented architecture by default.
- Do not create vague “helper dumping grounds”.

### 3.5 Quality discipline
- Use strict TypeScript.
- Favor explicit naming and small modules.
- Prioritize clarity over cleverness.
- Build code that is easy for a human reviewer to understand quickly.

---

## 4. Product and design interpretation

Agents must understand the intended product feel.

This project should feel:
- editorial
- premium
- calm
- trustworthy
- modern
- structured
- data-literate

This project should **not** feel:
- like an internal admin panel
- like a BI dashboard
- like a startup SaaS template
- like a generic chart demo
- like an animation-heavy concept site
- like a government site clone

Visual work must support reading, understanding, and trust.

---

## 5. Implementation philosophy

### 5.1 Build from foundation upward
Agents should implement in this order unless instructed otherwise:
1. app structure
2. i18n structure
3. layout foundation
4. domain/data foundation
5. section structure
6. chart integration
7. motion/detail polish

Do not prematurely polish before the structural layers are correct.

### 5.2 Avoid false generality
- Do not create highly abstract reusable systems too early.
- Do not generalize components before there are at least 2 realistic use cases.
- Prefer specific and well-named components over generic “config-driven” complexity.

### 5.3 Favor stable, reviewable changes
- Make changes in small coherent increments.
- Keep diffs understandable.
- Avoid large sweeping rewrites unless explicitly requested.
- If touching architecture, preserve the existing direction rather than replacing it casually.

---

## 6. Required technical approach

### 6.1 Stack assumptions
Use the locked stack unless the user explicitly changes it:
- Next.js
- TypeScript
- App Router
- Tailwind CSS
- i18n library compatible with App Router
- Zod
- ESLint
- Prettier

### 6.2 Rendering and state
- Prefer server components by default.
- Use client components only where interaction genuinely requires them.
- Avoid unnecessary global state.
- Avoid introducing client state libraries without a clear need.
- Keep interaction local and purposeful.

### 6.3 Formatting
Number, currency, percentage, and date formatting must be centralized.
Do not scatter ad hoc formatting logic across components.

### 6.4 Validation
Use explicit schemas where data enters the project boundary or changes shape.
Zod should be used for meaningful validation, not as decoration.

---

## 7. File and module rules

### 7.1 Preferred structure
Agents should preserve and extend the intended project structure:

- `src/app/[locale]/...`
- `src/components/layout`
- `src/components/navigation`
- `src/components/primitives`
- `src/features/pension/...` (includes domain sections and `components/charts/` for the pension chart)
- `src/lib/i18n`
- `src/lib/data`
- `src/lib/formatting`
- `src/messages`
- `src/data/raw`
- `src/data/processed`
- `src/scripts/ingest`
- `src/scripts/transform`

For **path-level detail** and refresh commands, see `docs/architecture.md` and `docs/agents.md`.

### 7.2 File naming
- Use clear descriptive names.
- Prefer domain language over vague technical names.
- Avoid names like:
  - `helpers.ts`
  - `misc.ts`
  - `commonStuff.ts`
  - `temp.ts`
  - `new.tsx`

### 7.3 Module responsibilities
Each module should have a clear purpose.
Examples:
- loading data
- validating schema
- transforming for chart consumption
- rendering a page section
- formatting domain values

Do not combine unrelated concerns into one file.

---

## 8. Rules for route files

Route files must stay relatively thin.

### Route files may:
- compose sections
- load already-processed data
- load translations
- define page-level structure
- delegate rendering to components

### Route files should not:
- contain raw parsing logic
- contain large transformation pipelines
- contain arbitrary formatting logic
- contain hardcoded long-form content everywhere
- become giant monolithic page files

---

## 9. Rules for components

### 9.1 Component design
Components should be:
- small to medium in size
- purpose-driven
- readable
- easy to test mentally by inspection

### 9.2 Component boundaries
Separate:
- layout primitives
- section components
- feature/domain components
- chart presentation components

### 9.3 What to avoid
Do not create:
- god components
- mega-props interfaces with too many responsibilities
- components that fetch, transform, format, and render everything
- artificially generic wrappers with unclear value

---

## 10. Rules for charts and data visualization

Charts are important, but the project is not “just charts”.

### 10.1 Chart principles
- Charts must support a narrative.
- Charts must be readable before they are flashy.
- Typography, spacing, labels, and tooltips matter as much as the chart primitive.
- Tooltips must not be the only way to understand the data.

### 10.2 Data flow
Chart components must receive already-prepared chart-friendly data.
Do not perform raw-to-chart transformation inside the chart component.

### 10.3 Interaction
Allowed interactions should be lightweight and useful:
- hover
- tooltips
- metric toggles
- simple view switches

Avoid:
- overbuilt filtering systems
- dense controls
- dashboard-like widget behavior
- unnecessary motion overload

---

## 11. i18n rules

### 11.1 Messages
Use message files for interface copy.
Keep translation keys understandable and stable.

### 11.2 Locale-aware formatting
All numeric and date rendering must respect locale where relevant.

### 11.3 Content separation
Avoid burying important content strings deep inside component trees.
Keep content maintainable and easy to update.

---

## 12. Data pipeline rules

Agents must preserve a clean data boundary.

### 12.1 Data layers
The expected layers are:

1. ingestion
2. raw storage
3. validation
4. normalization
5. processed storage or processed loading
6. chart/data-view transforms
7. presentation

### 12.2 Raw data
Raw data should stay close to source shape.
Do not destructively overwrite raw source files with UI-specific shape.

### 12.3 Processed data
Processed data should be stable, documented by code shape, and suitable for application use.

### 12.4 Transform functions
Transform functions should be:
- small
- explicit
- composable where useful
- easy to reason about

Do not hide business meaning behind obscure utility chains.

---

## 13. Dependency rules

### 13.1 General rule
Every new dependency must earn its place.

Before adding a dependency, prefer:
- platform features
- existing project utilities
- small local implementation

### 13.2 Do not add dependencies for:
- trivial formatting
- tiny utility functions
- speculative future needs
- generic UI kits that replace the project’s intended design direction

### 13.3 If adding a dependency
Explain briefly:
- why it is needed
- why built-in or existing code is not enough
- what architectural role it serves

---

## 14. Styling rules

### 14.1 General direction
Styling should aim for:
- strong hierarchy
- calm visual rhythm
- generous spacing
- restrained use of emphasis
- clear readability

### 14.2 Avoid
- noisy gradients everywhere
- excessive shadows
- overuse of glassmorphism
- flashy transitions
- dense card grids that create a dashboard feel
- visual clutter

### 14.3 Responsive behavior
Responsive layout must be considered from the beginning.
Do not build desktop-only structures first and patch mobile later.

---

## 15. Accessibility and semantics

Accessibility is required from the start.

Agents must:
- use semantic HTML
- preserve heading hierarchy
- ensure sufficient contrast
- avoid interaction patterns that rely only on hover
- ensure keyboard access where applicable
- avoid hiding essential information behind animation or tooltip only

Accessibility must be treated as a design constraint, not a cleanup step.

---

## 16. Performance rules

Performance matters, especially because this is a portfolio project.

Agents should:
- minimize client JavaScript
- avoid heavy runtime work in the UI
- avoid unnecessary re-renders
- avoid oversized dependency additions
- keep motion performant and subtle
- prefer static or server-rendered paths when practical

Do not trade structural quality for micro-optimizations, but do not ignore obvious inefficiencies.

---

## 17. How agents should communicate changes

When completing a meaningful task, summarize:
1. what was changed
2. why it was changed that way
3. which files were added or updated
4. any follow-up recommendation or unresolved constraint

Keep summaries concrete and implementation-focused.

If architectural tradeoffs were made, state them clearly.

---

## 18. When uncertain

If an implementation detail is unclear, choose the option that best preserves:
- the locked architecture
- readability
- multilingual support
- data pipeline separation
- future extensibility
- calm premium editorial feel

Do not invent product strategy changes.

---

## 19. Anti-patterns to avoid

Avoid these unless explicitly requested:

- huge page files with embedded logic
- raw source data handled in components
- translation strings hardcoded across JSX
- giant utility buckets
- speculative abstraction layers
- dependency sprawl
- “dashboardification” of the homepage
- over-animated UI
- premature state management systems
- ad hoc formatting logic in random files
- mixing content modeling with presentation details without structure

---

## 20. Definition of good work in this project

Good implementation in Pension Project is:

- easy to review
- easy to extend
- calm and intentional
- architecturally coherent
- multilingual by design
- visually strong without being noisy
- data-aware without becoming a dashboard
- production-minded without overengineering

When in doubt, choose the more disciplined and more maintainable path.