/**
 * Generates figma-handoff/manifest.json — the bridge document for the future
 * Figma session. Token collections come straight from tokens/*.tokens.json;
 * the component inventory mirrors the documented variants on the site.
 * Run: pnpm tsx scripts/build-figma-manifest.ts
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { buildCss, loadTokenTree } from "./build-tokens";

const tree = loadTokenTree("tokens");
const { theme, root } = buildCss(tree);

const components = [
  {
    name: "Button",
    source: "src/components/orba/Button.tsx",
    docs: "/components/buttons",
    variantProperties: {
      variant: ["primary", "secondary", "tertiary"],
      size: ["sm", "md", "lg"],
      state: ["rest", "hover", "pressed", "disabled", "loading"],
    },
  },
  {
    name: "IconButton",
    source: "src/components/orba/Button.tsx",
    docs: "/components/buttons",
    variantProperties: { variant: ["primary", "secondary"], size: ["sm", "md", "lg"] },
  },
  {
    name: "TextField",
    source: "src/components/orba/TextField.tsx",
    docs: "/components/inputs",
    variantProperties: {
      state: ["rest", "focus", "filled", "error", "disabled"],
      leadingIcon: ["none", "icon"],
    },
  },
  {
    name: "Select",
    source: "src/components/orba/Select.tsx",
    docs: "/components/inputs",
    variantProperties: { state: ["rest", "open", "selected"] },
  },
  {
    name: "Checkbox",
    source: "src/components/orba/Selection.tsx",
    docs: "/components/inputs",
    variantProperties: { checked: ["true", "false"], disabled: ["true", "false"] },
  },
  {
    name: "Radio",
    source: "src/components/orba/Selection.tsx",
    docs: "/components/inputs",
    variantProperties: { checked: ["true", "false"], disabled: ["true", "false"] },
  },
  {
    name: "Toggle",
    source: "src/components/orba/Selection.tsx",
    docs: "/components/inputs",
    variantProperties: { on: ["true", "false"], disabled: ["true", "false"] },
  },
  {
    name: "Slider",
    source: "src/components/orba/Slider.tsx",
    docs: "/components/inputs",
    variantProperties: { kind: ["single", "range"], ticks: ["none", "ticks"] },
  },
  {
    name: "SegmentedControl",
    source: "src/components/orba/SegmentedControl.tsx",
    docs: "/components/inputs",
    variantProperties: { segments: ["2", "3", "4"] },
  },
  {
    name: "Card",
    source: "src/components/orba/Card.tsx",
    docs: "/components/cards",
    variantProperties: {
      size: ["standard", "feature"],
      interactive: ["true", "false"],
    },
  },
  {
    name: "WaveEqualizer",
    source: "src/components/orba/WaveEqualizer.tsx",
    docs: "/foundations/motion",
    variantProperties: {},
  },
  {
    name: "Icon",
    source: "src/components/orba/icons.tsx",
    docs: "/components/icons",
    variantProperties: {
      size: ["16", "20", "24", "32"],
      weight: ["light (default)", "fill (active only)"],
    },
    note: "26 named icons — see ORBA_ICONS map; Phosphor family, light weight.",
  },
];

const manifest = {
  system: "ORBA Design System",
  version: "1.0.0",
  generated: "run `pnpm tsx scripts/build-figma-manifest.ts` to regenerate",
  figmaGuidance: {
    variables:
      "Create one Figma variable collection per top-level token group (colour, semantic, radius, spacing, breakpoint, shadow/glow, duration, easing, gradient). Names map 1:1 to the token paths in tokens/*.tokens.json.",
    textStyles:
      "One text style per type token; use maxPx for the desktop style and minPx for the mobile variant (Figma has no fluid type).",
    components:
      "Each entry below becomes a Figma component set; variantProperties map to Figma variant properties. Frozen state visuals exist on the docs pages for reference.",
    referenceImages: "design-refs/images/ holds the original visual references.",
  },
  tokenFiles: [
    "tokens/colour.tokens.json",
    "tokens/typography.tokens.json",
    "tokens/dimension.tokens.json",
    "tokens/effects.tokens.json",
    "tokens/motion.tokens.json",
  ],
  resolvedCssVariables: { theme, root },
  components,
};

mkdirSync("figma-handoff", { recursive: true });
writeFileSync("figma-handoff/manifest.json", JSON.stringify(manifest, null, 2));
console.log(
  `[figma] wrote figma-handoff/manifest.json — ${components.length} component sets, ${Object.keys(theme).length + Object.keys(root).length} variables`,
);
