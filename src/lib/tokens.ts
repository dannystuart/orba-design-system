/**
 * Typed, resolved views over tokens/*.tokens.json for the docs pages.
 * Pages render from here so specimens can never drift from the source of truth.
 */
import colourTokens from "../../tokens/colour.tokens.json";
import dimensionTokens from "../../tokens/dimension.tokens.json";
import motionTokens from "../../tokens/motion.tokens.json";
import typographyTokens from "../../tokens/typography.tokens.json";

type AnyTree = Record<string, unknown>;

function getPath(tree: AnyTree, path: string): unknown {
  let node: unknown = tree;
  for (const part of path.split(".")) {
    node = (node as AnyTree)[part];
    if (node === undefined) throw new Error(`Missing token path: ${path}`);
  }
  return node;
}

/** Resolve a token's $value, following {alias} references inside colour tokens. */
export function resolveColour(path: string): string {
  const node = getPath(colourTokens as unknown as AnyTree, path) as { $value: string };
  const v = node.$value;
  if (v.startsWith("{")) return resolveColour(v.slice(1, -1));
  return v;
}

const ramp = (group: Record<string, unknown>) =>
  Object.entries(group)
    .filter(([k]) => !k.startsWith("$"))
    .map(([step, node]) => ({ step, hex: (node as { $value: string }).$value }))
    .sort((a, b) => Number(b.step) - Number(a.step));

export const nightRamp = ramp(colourTokens.colour.night as Record<string, unknown>);
export const coralRamp = ramp(colourTokens.colour.coral as Record<string, unknown>).reverse();
export const alphaSet = Object.entries(colourTokens.colour.alpha)
  .filter(([k]) => !k.startsWith("$"))
  .map(([name, node]) => ({ name, hex: (node as { $value: string }).$value }));

export const gradients = Object.entries(colourTokens.colour.gradient)
  .filter(([k]) => !k.startsWith("$"))
  .map(([name, node]) => {
    const n = node as {
      $value: { angle: number; stops: string[] };
      $description?: string;
    };
    const stops = n.$value.stops.map((s) =>
      s.startsWith("{") ? resolveColour(s.slice(1, -1)) : s,
    );
    return {
      name,
      angle: n.$value.angle,
      stops,
      css: `linear-gradient(${n.$value.angle}deg, ${stops.join(", ")})`,
      note: n.$description,
    };
  });

export type SemanticEntry = {
  role: string;
  cssVar: string;
  source: string;
  hex: string;
  note?: string;
};

function semanticGroup(groupName: string): SemanticEntry[] {
  const group = (colourTokens.semantic as AnyTree)[groupName] as AnyTree;
  return Object.entries(group)
    .filter(([k]) => !k.startsWith("$"))
    .map(([key, node]) => {
      const n = node as {
        $value: string;
        $extensions?: { orba?: { cssName?: string } };
        $description?: string;
      };
      const cssName = n.$extensions?.orba?.cssName ?? `${groupName}-${key}`;
      return {
        role: `${groupName} / ${key}`,
        cssVar: `--color-${cssName}`,
        source: n.$value.startsWith("{") ? n.$value.slice(1, -1) : n.$value,
        hex: n.$value.startsWith("{") ? resolveColour(n.$value.slice(1, -1)) : n.$value,
        note: n.$description,
      };
    });
}

export const semanticColours: SemanticEntry[] = [
  ...semanticGroup("bg"),
  ...semanticGroup("surface"),
  ...semanticGroup("text"),
  ...semanticGroup("border"),
  ...semanticGroup("accent"),
  ...semanticGroup("status"),
  ...semanticGroup("focus"),
];

/** WCAG 2.x contrast ratio between two opaque hex colours. */
export function contrast(hexA: string, hexB: string): number {
  const lum = (hex: string) => {
    const c = hex.replace("#", "").slice(0, 6);
    const [r, g, b] = [0, 2, 4].map((i) => {
      const v = parseInt(c.slice(i, i + 2), 16) / 255;
      return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  const [hi, lo] = [lum(hexA), lum(hexB)].sort((a, b) => b - a);
  return (hi + 0.05) / (lo + 0.05);
}

export const durations = Object.entries(motionTokens.duration)
  .filter(([k]) => !k.startsWith("$"))
  .map(([name, node]) => ({ name, value: (node as { $value: string }).$value }));

export const easings = Object.entries(motionTokens.easing)
  .filter(([k]) => !k.startsWith("$"))
  .map(([name, node]) => {
    const v = (node as { $value: number[] }).$value;
    return { name, value: `cubic-bezier(${v.join(", ")})`, points: v };
  });

export const radii = Object.entries(dimensionTokens.radius)
  .filter(([k]) => !k.startsWith("$"))
  .map(([name, node]) => ({ name, value: (node as { $value: string }).$value }));

export const spacingScale = Object.entries(dimensionTokens.spacing)
  .filter(([k]) => !k.startsWith("$"))
  .map(([name, node]) => ({ name, value: (node as { $value: string }).$value }))
  .sort((a, b) => parseInt(a.value) - parseInt(b.value));

export const breakpoints = Object.entries(dimensionTokens.breakpoint)
  .filter(([k]) => !k.startsWith("$"))
  .map(([name, node]) => ({ name, value: (node as { $value: string }).$value }));

export type TypeStyle = {
  name: string;
  minPx: number;
  maxPx: number;
  weight: number;
  trackingEm: number;
  leading: number;
  uppercase?: boolean;
  description?: string;
};

export const typeScale: TypeStyle[] = Object.entries(typographyTokens.type)
  .filter(([k]) => !k.startsWith("$"))
  .map(([name, node]) => {
    const n = node as {
      $value: Omit<TypeStyle, "name" | "description">;
      $description?: string;
    };
    return { name, ...n.$value, description: n.$description };
  });

export const fontWeights = Object.entries(typographyTokens.font.weight)
  .filter(([k]) => !k.startsWith("$"))
  .map(([name, node]) => ({ name, value: (node as { $value: number }).$value }));
