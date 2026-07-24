# ORBA Design System — Design Document

**Date:** 2026-07-24
**Status:** Approved by Danny (gate passed)
**Goal:** Turn the static ORBA reference images into a live, browsable, code-first design system website (desktop + mobile web), architected so a later session can mirror it into Figma variables/components.

---

## Locked decisions (validated with Danny)

| Decision | Choice | Notes |
|---|---|---|
| Brand name | **ORBA** | References also showed LUMINA / SPHERE — retired. |
| Typeface | **Satoshi only** | Self-hosted from Fontshare (free commercial licence). Weights Light→Black. |
| Accent colour | **`#FF8D9B` soft coral** | From the palette sheet. |
| The other coral | **`#F87171` becomes error/danger** | Resolves the palette-vs-card-code conflict; two jobs, two corals. |
| Colour modes | **Dark-only, light-ready** | Semantic role naming so a light theme can re-point roles later. No light values designed now. |
| Icons | **Phosphor** | Matches the outline style used in every reference; light weight default. |
| Stack | Next.js App Router + TypeScript strict + Tailwind v4 + pnpm | Danny's standard stack. Static-exportable docs site. |

## Source material

- `design-refs/images/colour.png` — palette sheet (canonical hexes)
- `design-refs/images/type.png` — Satoshi specimen + usage guidance
- `design-refs/images/components.png` — full component sheet (states, inputs, controls)
- `design-refs/images/micrographics.png` — graphic elements, waves, particles, icons
- `design-refs/images/cards.png` + `cards_screenshot.png` — Deep Focus card variations
- `design-refs/images/starterimage.png` — hero/marketing composition
- `design-refs/reference-code/code.txt` — DOM-scraped card implementation (glass recipe, glow, motion timings, slider behaviour). Fonts in it (Inter/Space Grotesk) are tool defaults — ignored.

## Aesthetic distilled ("what makes it ORBA")

Deep-space calm: near-black blue-navy fields; frosted-glass surfaces with hairline light borders; one warm coral accent used sparingly with a soft glow; huge Light-weight numerals; letterspaced uppercase micro-labels; pill buttons with dark text on coral; particles, orbits and wave lines as decoration; motion that is slow, springy and breathing — never snappy or busy.

Semantic philosophy to write on the Philosophy page:
1. **Night first** — the canvas is darkness; light is information.
2. **One warm signal** — coral marks the single most important action or live element per view. If everything glows, nothing does.
3. **Glass, not walls** — surfaces are translucent layers over the void, separated by hairline light, not grey shadows.
4. **Calm numbers** — data is rendered big, Light and quiet.
5. **Motion breathes** — animation follows breath-like rhythms (pulse, drift, spring); respects reduced-motion.

---

## Token architecture

Source of truth: DTCG-format JSON files in `tokens/` (colour, typography, dimension, shadow, motion). A small build script generates `theme.css` (CSS custom properties consumed by Tailwind v4 `@theme`). The same JSON is the Figma-variables interchange later. Naming uses `/` groups mapping 1:1 to Figma variable groups.

### Layer 1 — Primitives

**night ramp** (cool blue-grey; anchors from palette sheet in bold):
- night-950 **#0B0F14** · night-900 #10171E · night-850 #141E24 · night-800 **#1A2A33** · night-700 #223640 · night-600 #2E4A55 · night-500 **#4C6B73** · night-400 #6B8792 · night-300 #8CA7B1 · night-200 **#A7C6D1** · night-100 #C6DCE4 · night-50 #E4F0F4
- white: #F7F7F5 (off-white, from components sheet)

**coral ramp** (anchors bold):
- coral-300 #FFB3BC · coral-400 #FF9FAB · coral-500 **#FF8D9B** · coral-600 #DC7484 · coral-700 **#B45B67**

**danger:** danger-400 #F87171 (+ alpha variants)

**alpha:** white-a03/a05/a08/a10/a12 (glass borders + fills); coral-glow-a20/a30/a40

### Layer 2 — Semantic roles (components use only these)

- `bg/base` night-950 · `bg/void` gradient backdrop
- `surface/raised` glass recipe · `surface/overlay` modal glass · `surface/sunken` white-a03
- `text/primary` #F7F7F5 · `text/secondary` night-200 · `text/muted` night-400 · `text/disabled` night-600 · `text/on-accent` night-950
- `border/subtle` white-a05 · `border/default` white-a10 · `border/strong` white-a12
- `accent/default` coral-500 · `accent/hover` coral-400 · `accent/pressed` coral-700 · `accent/subtle` coral-500 @ 10%
- `status/error` danger-400 · `focus/ring` coral-300
- Interaction states pattern: default → hover (lighter) → pressed (darker, rose) → disabled (40% opacity) — matches components sheet.

### Shape, depth, effects

- Radius: sm 8 · md 12 · lg 16 · xl 24 · 2xl 32 · pill 9999. (Inputs 12, buttons pill/16, cards 16, feature cards 32.)
- Glass recipe (named surface token): `linear-gradient(145deg, rgba(20,24,33,.8), rgba(10,12,18,.9))` + `backdrop-blur(12px)` + 1px `border/subtle`.
- Elevation: raised `0 8px 24px rgba(0,0,0,.35)` · floating `0 24px 48px rgba(0,0,0,.5)` (hover-lift target).
- Glow: accent-soft `0 0 20px coral@20%` · accent-strong `0 0 30px coral@40%` · knob-white `0 0 15px white@60%`.

### Typography

Satoshi (Fontshare, self-hosted woff2, variable if available). Fluid scale via clamp(), rem-based:

| Token | Mobile → Desktop | Weight | Notes |
|---|---|---|---|
| display-2xl | 56 → 96px | Light | timer numerals, tracking -0.05em |
| display-xl | 44 → 72px | Light | hero headlines |
| heading-1 | 36 → 48px | Light/Medium | page titles, tracking -0.025em |
| heading-2 | 28 → 36px | Medium | |
| heading-3 | 22 → 26px | Medium | |
| heading-4 | 18 → 20px | Medium | |
| body-lg | 17 → 18px | Regular/Light | lead paragraphs, lh 1.65 |
| body | 16px | Regular | lh 1.6 |
| body-sm | 14px | Regular | UI text |
| caption | 12px | Regular | |
| overline | 10 → 11px | Medium | UPPERCASE, tracking 0.25em — signature micro-label |

Usage rules from specimen: Bold/Black = titles & key moments · Medium = section titles, nav, buttons · Regular/Light = body · Light/Italic = quotes & captions.

### Spacing, layout, breakpoints

- 4px base scale: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96.
- Container: max 80rem; page padding 24px mobile / 32px desktop.
- Breakpoints (mobile-first): sm 640 · md 768 · lg 1024 · xl 1280.
- Grid: CSS grid, 1-col mobile → multi-col md+ (per reference cards).

### Motion

- Durations: fast 150ms · base 300ms · slow 400ms · drift 700ms · ambient 1200–2500ms loops.
- Easings: standard `cubic-bezier(0.4,0,0.2,1)` · spring `cubic-bezier(0.34,1.56,0.64,1)` (signature) · linear (spins/shimmer).
- Named micro-interactions (library page, all with reduced-motion fallbacks):
  hover-lift (translateY -8px + scale 1.01 + floating shadow, spring 400ms) · glow-pulse (2.5s breathe of scale+glow) · shimmer (2s gradient sweep on active progress) · wave-dance (1.2s equalizer bars, staggered 50ms) · slow-spin (12s linear orbit) · breathe (4s scale for meditation circle) · fade-up entrance (base, standard) · count-up numerals.
- Implementation: CSS keyframes for ambient loops; interaction transitions in CSS; JS only where needed (count-up, slider drag). GSAP not needed for v1 — keep dependency-light.

---

## Site map

```
/                      Overview: brand intro, principles digest, quick nav
/foundations/philosophy    Semantic philosophy, fundamental rules & principles
/foundations/colour        Ramps, roles, usage ratios (40/20/15/10/8/7 from palette sheet), contrast table
/foundations/typography    Specimen, fluid scale demo (resize me), usage rules
/foundations/spacing       Scale, grid, container, breakpoints (live indicator)
/foundations/shape         Radius, glass recipe, elevation, glow
/foundations/motion        Duration/easing tokens + live micro-interaction library
/components/buttons        All variants × states × sizes, do/don't
/components/inputs         Text/icon/error fields, dropdown, checkbox, radio, toggle, slider, segmented
/components/cards          Glass card family + the three reference cards rebuilt on-system
/components/icons          Curated Phosphor set with ORBA names, sizes, weights
```

Site chrome: left sidebar (desktop) / sheet menu (mobile), page ToC, every specimen in a "SpecimenFrame" with title overline + optional code toggle.

## Component scope & states

- **Buttons:** primary (coral pill, dark text, glow) · secondary (glass outline) · tertiary (text + arrow, underline) · icon button. States: rest/hover/pressed/focus/disabled/loading. Sizes sm/md/lg.
- **Inputs:** text field (rest/focus/filled/error/disabled, with-icon) · dropdown/select · checkbox · radio · toggle · slider (single + range, draggable, glow knob) · segmented control. Error messaging pattern in danger-400.
- **Cards:** base glass card · media card (image + gradient scrim) · stat card (numerals + activity bars) · timer card (progress ring). Rebuild the three reference cards as the flagship demo.
- **Icons:** @phosphor-icons/react, light weight default; curated ~24-icon ORBA set (focus, breathe, streak, journey, insights, …); sizes 16/20/24/32.
- Backlog (explicitly out of v1): tabs, navigation bar, modal, toasts/notifications, badges, avatars, tooltips, chips — sheet references exist; add after v1.

## Build plan — six gated chunks

1. **Foundations** — scaffold, tokens pipeline, site shell, all six foundation pages → browser review gate
2. **Buttons + Icons** → gate
3. **Inputs** → gate
4. **Cards** → gate
5. **Motion library page polish** (tokens land in Chunk 1; the full interactive library here) → gate
6. **Responsive + accessibility audit, Figma-export manifest, final review** → done

Workflow: git from the start; each chunk on a feature branch (`feat/foundations`, …), conventional commits, build+lint before commit, merge only after Danny's gate approval.

## Figma hand-off intent (for the future session)

- `tokens/*.json` (DTCG) → Figma variables via MCP/plugin; groups map to variable collections.
- Component pages map 1:1 to Figma component sets (variant properties = our documented states/sizes).
- Reference images stay in `design-refs/` as the visual source of truth.

## Accessibility commitments

- Text contrast ≥ 4.5:1 for body (off-white/night-200 on night-950 passes); large numerals ≥ 3:1; coral used for accents/CTAs with dark text (passes at ~7:1).
- Visible focus rings (coral-300, 2px, offset) on everything interactive.
- `prefers-reduced-motion` honoured by every animation.
- Touch targets ≥ 44px on mobile.
