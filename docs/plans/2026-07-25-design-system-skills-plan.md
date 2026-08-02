# Design-System Skills — Planning Doc

**Date:** 2026-07-25 · **Owner:** Danny (designer — plain language, outcome-first)
**Goal:** Turn the ORBA workflow into three reusable personal skills so every future
design system comes out at ORBA's level of thoroughness (or better) — while the
*styling* always comes from the current project's references, never from ORBA.

## Locked decisions (validated with Danny)

| Decision | Choice |
|---|---|
| Split | Three skills: process / output spec / Figma mirroring |
| Skill 1 trigger scope | **Broad** — any visual source (ref imagery, mood boards, existing site/app, brand PDF, screenshots) |
| Stack | **Locked** — Next.js App Router + TypeScript strict + Tailwind v4 + pnpm + DTCG token JSON → generated CSS |
| Skill 3 | Built in a **separate fresh session** (large task) |
| Home | `~/.claude/skills/<name>/SKILL.md` (personal, all projects) |
| Depth vs aesthetic | The spec fixes **depth, not aesthetic** — stated explicitly in Skill 2 |

## Source material (for the build sessions)

- The ORBA repo: `~/CodeProjects/image-to-design-system` — worked example of everything
  (`docs/plans/*` design + implementation docs, `tokens/*`, `scripts/*` incl. verification
  tooling, `figma-handoff/manifest.json`, `docs/HANDOFF.md`)
- Raw session transcripts: `~/CodeProjects/claude-notes/transcripts/2026-07-25-i-want-to-take-a-set-of-static-images-*.md` (build) and `…-mirror-the-orba-design-system-into-figma-*.md` (Figma)
- Distilled lesson: `~/CodeProjects/claude-notes/learning-materials/2026-07-25-images-to-live-design-system-figma.md`
- Figma gotchas memory: `~/.claude/projects/-Users-Danny-CodeProjects-image-to-design-system/memory/figma-mcp-workflow-gotchas.md` (+ `orba-figma-mirror.md`)
- Skill-writing methodology: `superpowers:writing-skills` (TDD for skills — baseline test
  BEFORE writing, then close loopholes). **Iron law: no skill without a failing test first.**

---

## Skill 1 — `design-system-from-refs` (process/technique skill)

**Draft description (CSO rules: triggers only, no workflow summary, third person):**
> Use when the user wants a design system created or extracted from visual sources —
> reference imagery, mood boards, screenshots, a brand PDF, an existing website or
> app — or asks to turn a look/aesthetic into a coded system.

**Contents (outline):**
1. **Intake** — refs folder convention (`design-refs/images`, `design-refs/reference-code`);
   read every source; inventory present vs missing artefact types (palette, type specimen,
   components, motion refs, coded examples); ask for missing ones rather than inventing.
2. **Contradiction audit (the load-bearing step)** — actively hunt disagreements across
   sources (names, fonts, colour variants, radii); force each into a multiple-choice
   decision with a recommendation; never silently pick. Pattern: *give losing values a
   different job* (ORBA: spare coral → error red) before discarding.
3. **Design conversation → design doc** — locked-decisions table; aesthetic distilled into
   3–7 named principles; token architecture; component scope; build order. Gate with user.
   Doc goes to `docs/plans/YYYY-MM-DD-<name>-design-system-design.md`.
4. **Implementation plan → chunked build** — foundations chunk first (tokens → pipeline →
   shell → foundation pages), then component groups, motion, audit. Branch per chunk;
   browser-review gate per chunk; gates convert to async screenshot evidence
   (`docs/review/chunk-N/`) + a HANDOFF.md when the user steps away.
5. **Verification doctrine** — typecheck + lint + build before any commit; headless
   full-page screenshots at 1440 and 390; scripted interaction checks for stateful
   components; self-review against the refs before presenting any gate.
6. **Wrap** — HANDOFF.md (state, locked decisions, restart prompt), Figma manifest
   generation, licence audit before anything goes public (fonts: fetch-at-build if the
   licence forbids redistribution).
- **Rules box:** styling comes only from THIS project's refs (never from past systems);
  every value becomes a token before any page uses it; components use semantic tokens only.
- **REQUIRED SUB-SKILL:** `design-system-spec` defines what "done" means per deliverable.
- Cross-refs: superpowers:brainstorming (design conversation), superpowers:writing-plans,
  frontend-design skill for page craft.

## Skill 2 — `design-system-spec` (reference/standard skill)

**Draft description:**
> Use when building, extending, reviewing, or auditing a design system — before declaring
> any foundations page, component, or token set complete — to check the deliverable
> against the required depth standard.

**Contents (outline):** opening principle — *this spec fixes depth, not aesthetic* — then
per-deliverable minimum bars, checklist format:

- **Tokens:** DTCG JSON single source of truth; three layers (primitives → semantic roles →
  component); semantic-only usage in components; all eight value families tokenised
  (colour, typography, spacing, radius, effects/shadows, motion durations+easings,
  breakpoints, layout/blur); generated CSS (`@theme`) via tested pipeline; alias
  resolution must fail loudly; Figma-name extensions where CSS names diverge.
- **Foundations pages, required sections each:**
  - *Philosophy:* named principles with do/don't pairs; fundamental rules list
  - *Colour:* ramps, semantic role table (role → primitive → CSS var → sample), gradients,
    alphas over surface, usage ratios, **computed** contrast table (never eyeballed)
  - *Typography:* weight ladder, fluid scale table (name, px range, weight, tracking,
    live sample), usage guidelines, signature styles
  - *Spacing/Layout:* scale visual, container/gutters, breakpoints with live indicator,
    grid behaviour, touch-target rule
  - *Shape/Effects:* radius scale, surface recipes deconstructed layer by layer,
    elevation, glow/effect families
  - *Motion:* duration + easing token tables with live players; named micro-interactions
    each with tokens-used, when-to-use, reduced-motion fallback
- **Component standard:** full state coverage (rest/hover/pressed/focus/disabled +
  loading/error where applicable) × sizes × variants; frozen-state matrix for
  hover-dependent states; do/don't pairs; a11y floor (accessible names, visible focus,
  44px touch, 4.5:1 body / 3:1 large text); mobile pattern demonstrated; scripted
  interaction checks for stateful components.
- **Site bar:** the docs site is built FROM the system it documents; phone-first; fluid type.
- **Hand-off bar:** Figma manifest (token collections + component sets with variant
  properties), review screenshot pack per chunk, HANDOFF.md, version tag.
- **Quick-reference table** mapping deliverable → minimum bar, for fast auditing.

## Skill 3 — `mirroring-design-system-to-figma` (technique skill, separate session)

**Draft description:**
> Use when a coded design system (token JSON + components) needs mirroring into Figma as
> variables, styles, and component sets — or when a figma-handoff manifest exists and the
> user asks for the Figma library.

**Contents (outline, for the fresh session to refine):** read order (manifest → tokens →
component source → review screenshots as cross-check only); connection check first;
variables/collections 1:1 with alias chains preserved; paired desktop/mobile text styles
from fluid ranges; component sets matching documented frozen states; screenshot-validate
every stage (the toggle-opacity bug was caught this way); the trust chain (code is truth,
PNGs are cross-check); invented-filler flagging at gates; Desktop Bridge for text on
non-Org plans (cloud Figma can't see local fonts; font upload is Org-plan only);
paint-opacity-before-binding gotcha; bridge reconnect ritual; idempotent build scripts
(RUN_ID ledger in scratchpad) so dropped calls resume cleanly.

---

## Build methodology (both sessions — this is the hard requirement)

Per `superpowers:writing-skills`, RED-GREEN-REFACTOR:

1. **RED (baseline):** run pressure scenarios with subagents WITHOUT the skill; document
   verbatim where output comes out shallow. Expected baseline failures to look for —
   Skill 1: no contradiction audit, silent value-picking, pages before tokens, no gates,
   no verification evidence. Skill 2: components with 2–3 states, no contrast maths, no
   reduced-motion, no do/don'ts. Skill 3: guessed values, no screenshot validation, text
   built without checking fonts, non-idempotent scripts.
2. **GREEN:** write the skill to counter those specific failures; re-run scenarios WITH
   the skill; verify compliance.
3. **REFACTOR:** capture new rationalizations, add counters/red-flags, re-test.
4. Frontmatter: `name` + `description` only; descriptions = triggering conditions ONLY
   (no workflow summaries — agents shortcut them). Keep each SKILL.md lean; heavy
   reference (the per-page section checklists) may live in a supporting file.
5. Deploy to `~/.claude/skills/<name>/`, then verify discovery (fresh subagent, realistic
   prompt, does it invoke?).

## Kickoff prompts

**Session A — build Skills 1 + 2 (a pair; Skill 1 references Skill 2):**
> Build two personal Claude Code skills from the plan in
> `~/CodeProjects/image-to-design-system/docs/plans/2026-07-25-design-system-skills-plan.md`
> (read it first, then the source material it lists): `design-system-from-refs` and
> `design-system-spec`, deployed to `~/.claude/skills/`. Follow
> superpowers:writing-skills strictly — baseline-test each skill with subagent scenarios
> BEFORE writing it, document the failures, write the skill to counter them, re-test,
> close loopholes. Build and fully test ONE skill at a time (spec first — the process
> skill references it). The spec must fix depth, not aesthetic. I'm a designer — keep
> explanations plain, and gate with me: once after each skill's baseline results (show me
> what agents do wrong without it), once after each skill passes testing.

**Session B — build Skill 3 (after Session A ships):**
> Build the personal Claude Code skill `mirroring-design-system-to-figma` from the plan in
> `~/CodeProjects/image-to-design-system/docs/plans/2026-07-25-design-system-skills-plan.md`
> (read it, the Figma-session transcript, and the two Figma memory files it lists).
> Deploy to `~/.claude/skills/`. Follow superpowers:writing-skills strictly —
> baseline-test with a subagent scenario before writing, then verify with the skill
> loaded. Requires `design-system-spec` to exist (Session A). The ORBA Figma file
> (figma.com/design/JjiW4cfdSVPcyAzA9ubO49) is the worked example. I'm a designer —
> plain language, gate with me after baseline and after testing passes.
