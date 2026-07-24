# ORBA Design System — Session Handoff

**Last updated:** 2026-07-24 (end of Chunk 1, start of Chunk 2)
**Owner:** Danny (designer — communicate in plain, non-technical language; explain by outcome, not technology)

## What this project is

A live, code-first design system website for **ORBA** — a calm, night-first design language for focus/wellbeing products — built from Danny's static reference images, to later be mirrored into Figma (variables + components) in a separate session.

## Read these first (in order)

1. `docs/plans/2026-07-24-orba-design-system-design.md` — all locked design decisions, token values, scales, component specs
2. `docs/plans/2026-07-24-orba-implementation-plan.md` — the six-chunk build plan with task detail
3. `design-refs/images/` — the seven reference images (visual source of truth); `design-refs/reference-code/code.txt` — DOM-scraped card code the aesthetic came from

## Key locked decisions (validated with Danny — do not relitigate)

- Brand: **ORBA** · Font: **Satoshi only** (self-hosted, `src/fonts/`) · Accent: **#FF8D9B** soft coral · **#F87171** is error/danger only · **Dark-only, light-ready** (semantic role tokens) · Icons: **Phosphor, light weight**
- Tokens: DTCG JSON in `tokens/*.tokens.json` is the single source of truth → `scripts/build-tokens.ts` generates `src/styles/tokens.css` (Tailwind v4 `@theme`). Never hand-edit `tokens.css`; never hard-code values in components. Tests: `pnpm test`.
- Components use **semantic tokens only** (`--color-fg`, `--color-accent`…), never primitives.

## State — ALL SIX CHUNKS BUILT (v1.0.0)

- **Chunk 1 Foundations** — approved by Danny at the browser gate. Review pack: `docs/review/chunk-1/`.
- **Chunk 2 Buttons + Icons + gradient tokens** (Danny's gate note folded in) — `docs/review/chunk-2/`.
- **Chunk 3 Inputs** — all controls with headless interaction checks (`scripts/verify-inputs.ts`, 7 passing) — `docs/review/chunk-3/`.
- **Chunk 4 Cards** — incl. the three Deep Focus reference cards rebuilt on-system — `docs/review/chunk-4/`.
- **Chunk 5 Motion library** — per-interaction specs, stagger + count-up, shared `WaveEqualizer`.
- **Chunk 6** — final capture sweep (`docs/review/final/`, 22 shots) + `figma-handoff/manifest.json` (12 component sets, 130 variables).
- Chunks 2–6 were built while Danny was away ("carry on") and are merged but **not yet human-reviewed** — his async review of `docs/review/final/` may produce revision notes.
- Known follow-ups for a next session: deeper keyboard/screen-reader audit beyond the scripted checks; real device testing; then the Figma mirroring session (read `figma-handoff/manifest.json` first; authorise the figma connector).

## Workflow rules

- Branch per chunk (`feat/<chunk>`), conventional commits, `pnpm typecheck && pnpm lint && pnpm build` before every commit; merge to main when the chunk passes verification (Danny reviews async via screenshots).
- Before any web UI work, read `~/CodeProjects/hero-boilerplate/docs/web-build-gotchas.md` (global rule). Already applied: TS narrowing gotcha, keyframes-not-transitions for entrances, headless Playwright verification (`scripts/capture-review.ts <baseUrl> <outDir>`).
- Dev server: `pnpm dev` (or the `orba-dev` launch config; port auto-assigned). Playwright is a devDependency for capture scripts.
- Environment quirk: TypeScript is pinned to 5.x and ESLint to 9.x — v7/v10 are too new for Next 16 / plugin ecosystem. Don't upgrade them.

## Figma end-goal (later session)

`tokens/*.tokens.json` groups map 1:1 to Figma variable collections; each component page's documented variants/states map to Figma component-set properties. Chunk 6 will emit `figma-handoff/manifest.json`. The `figma-remote` MCP connector still needs authorising in Danny's claude.ai connector settings before that session.

---

## Fresh-session starter prompt (paste this)

> Continue the ORBA design system build in `~/CodeProjects/image-to-design-system`.
> Start by reading `docs/HANDOFF.md`, then the two docs in `docs/plans/`, then check `git log --oneline` and the latest `docs/review/` folder to see exactly where the build stopped.
> Follow the handoff's workflow rules (branch per chunk, tokens are the source of truth, verify with typecheck/lint/build + the capture script before committing). Continue from the first unfinished chunk in the implementation plan, and gate each finished chunk with screenshots in `docs/review/chunk-N/` for my async review. I'm a designer — keep explanations plain and outcome-focused.
