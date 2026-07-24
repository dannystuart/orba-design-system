# ORBA Design System Site — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.
> Read `docs/plans/2026-07-24-orba-design-system-design.md` first — it holds all locked design decisions, hex values, scales and component specs. Reference images live in `design-refs/images/`.

**Goal:** Build the ORBA design-system documentation site (Chunk 1: token pipeline + site shell + six foundation pages), gated on Danny's browser review before later chunks.

**Architecture:** Next.js App Router site at repo root. DTCG token JSON in `tokens/` is the single source of truth; `scripts/build-tokens.ts` generates `src/styles/tokens.css` (CSS custom properties in a Tailwind v4 `@theme` block) so every utility class is token-driven. Pages are React server components; interactive specimens are small client components.

**Tech Stack:** Next.js (App Router) · TypeScript strict · Tailwind CSS v4 · pnpm · @phosphor-icons/react · vitest (token pipeline tests) · Satoshi via next/font/local (self-hosted from Fontshare).

**Verification doctrine (from web-build-gotchas.md):**
- `pnpm exec tsc --noEmit` before claiming any task done — dev server green is not proof (strict-TS closure narrowing gotcha).
- Entrance animations use CSS keyframes, never transitions (same-paint gotcha).
- Visual verification via headless Playwright screenshots (`pnpm dlx playwright screenshot`), desktop 1440×900 and mobile 390×844 — MCP preview tabs may not run rAF.
- All ambient animations respect `prefers-reduced-motion`.

**Workflow:** branch `feat/foundations`; conventional commits after each task; `pnpm build` + lint before every commit; merge to main only after Danny's gate approval.

---

## Chunk 1 — Foundations

### Task 1: Scaffold the Next.js app (manual, into existing repo)

**Files:** Create `package.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `.gitignore`, `src/app/layout.tsx`, `src/app/page.tsx`, `src/styles/globals.css`, `.npmrc` (if needed).

Steps:
1. `git checkout -b feat/foundations`
2. Write `package.json` (name `orba-design-system`, private, scripts: `dev`, `build`, `start`, `lint`, `tokens` = `tsx scripts/build-tokens.ts`, `test` = `vitest run`, `typecheck` = `tsc --noEmit`; `predev`/`prebuild` run `tokens`).
3. `pnpm add next react react-dom @phosphor-icons/react` and `pnpm add -D typescript @types/react @types/react-dom @types/node tailwindcss @tailwindcss/postcss vitest tsx eslint eslint-config-next`
4. `tsconfig.json` strict, `@/*` → `src/*`. `postcss.config.mjs` with `@tailwindcss/postcss`.
5. Minimal `layout.tsx` + placeholder `page.tsx`; `globals.css` starts with `@import "tailwindcss";`.
6. Verify: `pnpm dev` serves; `pnpm typecheck` clean. Commit `feat: scaffold Next.js app`.

### Task 2: Self-host Satoshi

**Files:** Create `src/fonts/` (woff2 files), modify `src/app/layout.tsx`.

Steps:
1. `curl -L -o /tmp-scratch/satoshi.zip "https://api.fontshare.com/v2/fonts/download/satoshi"` (use scratchpad); unzip; copy `Satoshi-Variable.woff2` + `Satoshi-VariableItalic.woff2` into `src/fonts/`. Keep the licence file → `src/fonts/OFL-or-ITF-LICENSE.txt`.
2. `next/font/local` in layout: variable font, `weight: "300 900"`, css var `--font-satoshi`; expose to Tailwind as `--font-sans` in the theme.
3. Fallback if download fails: Fontshare hosted CSS `<link>` (note in commit; retry self-host later).
4. Verify: page renders Satoshi (screenshot; letterforms match type.png specimen — single-storey friendly 'a', geometric). Commit `feat: self-host Satoshi variable font`.

### Task 3: DTCG token files (TDD target fixture first)

**Files:** Create `tokens/colour.tokens.json`, `tokens/typography.tokens.json`, `tokens/dimension.tokens.json`, `tokens/effects.tokens.json`, `tokens/motion.tokens.json`.

All values from the design doc §Token architecture — primitives (night ramp, coral ramp, danger, alpha, white), semantic roles as DTCG aliases (`"$value": "{colour.night.950}"`), radius/spacing/breakpoints (dimension), fluid type scale (custom `$type: "fluid"` with min/max px + weight + tracking + leading), shadows/glows (composite shadow type), durations/easings (motion). Each group carries `$description` for Figma hand-off. Semantic tokens carry `$extensions.orba.cssName` where the Tailwind-friendly CSS name differs from the group path (e.g. `text/primary` → `fg`).

Verify: `cat tokens/*.json | python3 -m json.tool` clean (valid JSON). Commit `feat: DTCG design tokens`.

### Task 4: Token build script (TDD)

**Files:** Create `scripts/build-tokens.ts`, `scripts/build-tokens.test.ts`; generates `src/styles/tokens.css` (gitignored? No — commit generated file so builds don't depend on script for CI simplicity; regenerate via pre-scripts).

Behaviour to test first (vitest):
1. Flattens nested groups → kebab CSS vars (`colour.night.950` → `--color-night-950`; dimension.radius.lg → `--radius-lg`).
2. Resolves `{a.b.c}` aliases (one level of indirection is enough — fail loudly on missing ref).
3. `fluid` type → `clamp()` with 390→1280px viewport interpolation.
4. Shadow composites → CSS shadow lists.
5. Emits `@theme` block for Tailwind-convention names (`--color-*`, `--radius-*`, `--font-*`, `--text-*`, `--shadow-*`, `--ease-*`) and plain `:root` for the rest (durations, glass recipe pieces).
6. Honours `$extensions.orba.cssName`.

Steps: write failing tests → run (`pnpm test`, expect fail) → implement → pass → wire `@import "./tokens.css"` into globals.css → `pnpm typecheck` → commit `feat: token build pipeline (DTCG → CSS)`.

### Task 5: Site shell

**Files:** Create `src/components/site/SiteShell.tsx` (sidebar + mobile sheet nav + main column), `src/components/site/Nav.tsx` (nav data + active states), `src/components/site/PageHeader.tsx` (overline + h1 + lead), `src/components/site/Specimen.tsx` (specimen frame: overline label, glass inset panel, optional caption), `src/components/site/TokenTable.tsx`. Modify `layout.tsx`.

Design: sidebar fixed left 260px on lg+, ORBA wordmark (letterspaced, orb glyph as coral-glow dot), grouped nav (Foundations / Components); mobile: top bar + slide-over sheet (CSS keyframe entrance). Chrome uses the tokens exclusively — this shell is itself the first proof of the system.

Verify: typecheck + build + screenshots (desktop sidebar, mobile sheet open/closed). Commit `feat: site shell and specimen primitives`.

### Task 6: Overview page (`/`)

Hero: ORBA wordmark treatment, "Mindful by design." strap, principles digest (5 cards), links into foundations. Ambient: subtle radial coral/void gradient background (design doc bg/void), slow-spin orbit decoration, all reduced-motion-safe.
Verify + commit `feat: overview page`.

### Task 7: Philosophy page (`/foundations/philosophy`)

Content from design doc §Aesthetic distilled: the five principles as numbered glass cards with do/don't pairs; "one warm signal" rule illustrated (a mini UI with one vs many glows); fundamental rules list (contrast floors, touch targets, reduced motion, glass-not-walls).
Verify + commit.

### Task 8: Colour page (`/foundations/colour`)

Sections: primary swatch row (circles, like colour.png, hex + RGB shown); night ramp strip; coral ramp; danger; alpha set over glass demo; semantic roles table (role → primitive → var name → sample); usage-ratio bar (40/20/15/10/8/7); contrast table (fg/bg pairs with computed ratios — compute at build time in the page, mark pass level).
Verify + commit.

### Task 9: Typography page (`/foundations/typography`)

Specimen hero (Aa in coral, Satoshi, "Clean · Modern · Human" — mirrors type.png); weight ladder Light→Black; full fluid scale table with live rendered rows (name, px range, weight, tracking, sample "Focus. Balance. Thrive."); usage-guidelines four-column block from specimen (headings/subheadings/body/accent); overline micro-label showcase; a "resize me" note pointing at fluid behaviour.
Verify + commit.

### Task 10: Spacing & layout page (`/foundations/spacing`)

4px scale visual bars; container + page-gutter demo; breakpoints table with a live current-breakpoint indicator chip (client component); grid patterns (1→3 col card grid demo); touch-target rule.
Verify + commit.

### Task 11: Shape & effects page (`/foundations/shape`)

Radius scale (rounded squares row); glass recipe deconstructed (layered: gradient → blur → hairline border, shown as stacked specimens with each layer toggled in); elevation levels (raised, floating) on hover-lift demo card; glow family (accent-soft/strong, knob-white) on dots/buttons.
Verify + commit.

### Task 12: Motion foundations page (`/foundations/motion`)

Duration + easing token table with click-to-play pills (each pill animates a dot with that duration/easing); the named micro-interaction set as a preview grid (hover-lift, glow-pulse, shimmer, wave-dance, slow-spin, breathe, fade-up) — each a small live specimen with a replay button; reduced-motion statement + demo. (Full library polish is Chunk 5; this page establishes tokens + catalogue.)
Verify + commit.

### Task 13: Chunk-1 verification sweep & gate

1. `pnpm typecheck` && `pnpm lint` && `pnpm build` — all clean.
2. Playwright screenshots: every page, 1440×900 + 390×844 → `docs/review/chunk-1/`.
3. Self-review against reference images (side-by-side look): palette fidelity, type feel, glass/glow fidelity.
4. Fix anything off; re-screenshot.
5. Commit `chore: chunk 1 verification screenshots`. Present to Danny with preview server running → **GATE**. Merge to main on approval.

---

## Chunk 2 — Buttons + Icons (outline)

Branch `feat/buttons-icons`. Build `src/components/orba/Button.tsx` (variants primary/secondary/tertiary/icon; sizes sm/md/lg; states incl. loading + focus ring; pill radius; glow on primary), `Icon.tsx` wrapper (Phosphor light, size map 16/20/24/32, ORBA name map ~24 icons). Pages `/components/buttons`, `/components/icons` with full state × variant matrices, do/don't, code snippets. Verify sweep → gate → merge.

## Chunk 3 — Inputs (outline)

Branch `feat/inputs`. `TextField` (rest/focus/filled/error/disabled, leading icon, helper/error text), `Select` (custom dropdown, keyboard nav), `Checkbox`, `Radio`, `Toggle`, `Slider` (single + range, draggable, glow knob — port logic from reference code), `SegmentedControl`. Page `/components/inputs`. A11y: labels, aria, focus management. Verify → gate → merge.

## Chunk 4 — Cards (outline)

Branch `feat/cards`. `Card` base (glass, radius 16/32 sizes), media card (scrim gradient), stat card (numerals + activity bars), timer card (progress ring, count-up). Rebuild the three reference cards (Focus Timer / Audio Engine / Performance) on-system as flagship demo at `/components/cards`. Verify vs `cards_screenshot.png` → gate → merge.

## Chunk 5 — Motion library (outline)

Branch `feat/motion-library`. Promote catalogue to full library: per-interaction spec cards (tokens used, when to use, code), interactive playground (trigger each on a demo card), stagger patterns, count-up numerals, wave equalizer as reusable component. Reduced-motion behaviour documented per item. Verify → gate → merge.

## Chunk 6 — Audit + Figma-ready export (outline)

Branch `feat/audit-handoff`. Full responsive sweep (every page at 390/768/1024/1440), contrast audit table, keyboard-only walkthrough, touch targets; fix findings. Generate `figma-handoff/manifest.json` (token collections summary + component/variant inventory) for the Figma session. Final gate → merge → tag `v1.0.0`.
