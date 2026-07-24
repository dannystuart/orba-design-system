/**
 * DTCG token → CSS pipeline.
 *
 * Reads tokens/*.tokens.json (single source of truth, Figma-interchange format)
 * and generates src/styles/tokens.css:
 *   - an @theme block (Tailwind v4 conventions: --color-*, --text-*, --radius-*,
 *     --shadow-*, --ease-*, --breakpoint-*, --blur-*) so utilities are token-driven
 *   - a :root block for non-utility tokens (durations, layout, spacing reference)
 *
 * Font families are intentionally NOT emitted — next/font/local owns --font-sans.
 */
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

type TokenNode = {
  $value?: unknown;
  $type?: string;
  $description?: string;
  $extensions?: { orba?: { cssName?: string } };
  [key: string]: unknown;
};

type Tree = Record<string, unknown>;

const FLUID_MIN_VP = 390;
const FLUID_MAX_VP = 1280;

const round = (n: number, dp = 4) =>
  String(Number(n.toFixed(dp)));

export function fluidClamp(minPx: number, maxPx: number): string {
  if (minPx === maxPx) return `${round(minPx / 16)}rem`;
  const slope = (maxPx - minPx) / (FLUID_MAX_VP - FLUID_MIN_VP);
  const interceptPx = minPx - slope * FLUID_MIN_VP;
  return `clamp(${round(minPx / 16)}rem, ${round(interceptPx / 16)}rem + ${round(slope * 100)}vw, ${round(maxPx / 16)}rem)`;
}

function isToken(node: unknown): node is TokenNode {
  return typeof node === "object" && node !== null && "$value" in node;
}

function deepMerge(target: Tree, source: Tree): Tree {
  for (const [key, value] of Object.entries(source)) {
    if (
      typeof value === "object" &&
      value !== null &&
      !Array.isArray(value) &&
      typeof target[key] === "object" &&
      target[key] !== null
    ) {
      deepMerge(target[key] as Tree, value as Tree);
    } else {
      target[key] = value;
    }
  }
  return target;
}

export function loadTokenTree(dir: string): Tree {
  const tree: Tree = {};
  for (const file of readdirSync(dir).filter((f) => f.endsWith(".tokens.json")).sort()) {
    deepMerge(tree, JSON.parse(readFileSync(join(dir, file), "utf8")) as Tree);
  }
  return tree;
}

function getAtPath(tree: Tree, path: string): TokenNode {
  let node: unknown = tree;
  for (const part of path.split(".")) {
    if (typeof node !== "object" || node === null || !(part in (node as Tree))) {
      throw new Error(`Unresolvable alias: {${path}}`);
    }
    node = (node as Tree)[part];
  }
  if (!isToken(node)) throw new Error(`Alias {${path}} does not point at a token`);
  return node;
}

function resolveValue(tree: Tree, node: TokenNode, depth = 0): unknown {
  if (depth > 10) throw new Error("Alias cycle detected");
  const v = node.$value;
  if (typeof v === "string" && v.startsWith("{") && v.endsWith("}")) {
    return resolveValue(tree, getAtPath(tree, v.slice(1, -1)), depth + 1);
  }
  return v;
}

/** Inherited $type: nearest ancestor group's $type wins if the token has none. */
function walk(
  tree: Tree,
  node: Tree,
  path: string[],
  inheritedType: string | undefined,
  visit: (path: string[], node: TokenNode, type: string | undefined, resolved: unknown) => void,
) {
  const type = (node.$type as string | undefined) ?? inheritedType;
  if (isToken(node)) {
    visit(path, node, type, resolveValue(tree, node));
    return;
  }
  for (const [key, child] of Object.entries(node)) {
    if (key.startsWith("$")) continue;
    if (typeof child === "object" && child !== null) {
      walk(tree, child as Tree, [...path, key], type, visit);
    }
  }
}

type Shadow = { color: string; offsetX: string; offsetY: string; blur: string; spread: string };
type FluidText = {
  minPx: number;
  maxPx: number;
  weight: number;
  trackingEm: number;
  leading: number;
  uppercase?: boolean;
};

export function buildCss(tree: Tree): {
  theme: Record<string, string>;
  root: Record<string, string>;
} {
  const theme: Record<string, string> = {};
  const root: Record<string, string> = {};

  walk(tree, tree, [], undefined, (path, node, type, resolved) => {
    const cssName = node.$extensions?.orba?.cssName;
    const topGroup = path[0];
    // name = cssName override, else the path minus its top-level group
    const name = cssName ?? path.slice(1).join("-");

    switch (type) {
      case "color":
        theme[`--color-${name}`] = String(resolved);
        break;
      case "orba-fluid-text": {
        const t = resolved as FluidText;
        theme[`--text-${name}`] = fluidClamp(t.minPx, t.maxPx);
        theme[`--text-${name}--line-height`] = String(t.leading);
        theme[`--text-${name}--font-weight`] = String(t.weight);
        if (t.trackingEm !== 0) theme[`--text-${name}--letter-spacing`] = `${t.trackingEm}em`;
        break;
      }
      case "shadow": {
        const s = resolved as Shadow;
        const value = `${s.offsetX} ${s.offsetY} ${s.blur} ${s.spread} ${s.color}`;
        theme[topGroup === "glow" ? `--shadow-glow-${name}` : `--shadow-${name}`] = value;
        break;
      }
      case "cubicBezier": {
        const [a, b, c, d] = resolved as number[];
        theme[`--ease-${name}`] = `cubic-bezier(${a}, ${b}, ${c}, ${d})`;
        break;
      }
      case "duration":
        root[`--duration-${name}`] = String(resolved);
        break;
      case "dimension": {
        const value = String(resolved);
        if (topGroup === "radius") theme[`--radius-${name}`] = value;
        else if (topGroup === "breakpoint") theme[`--breakpoint-${name}`] = value;
        else if (topGroup === "blur") theme[`--blur-${name}`] = value;
        else if (topGroup === "spacing") root[`--space-${name}`] = value;
        else root[`--${topGroup}-${name}`] = value;
        break;
      }
      case "fontFamily":
      case "fontWeight":
        // next/font owns families; weights use Tailwind's built-in font-* utilities.
        break;
      default:
        throw new Error(`Token ${path.join(".")} has unknown $type: ${type}`);
    }
  });

  return { theme, root };
}

function serialise(vars: Record<string, string>, indent = "  "): string {
  return Object.entries(vars)
    .map(([k, v]) => `${indent}${k}: ${v};`)
    .join("\n");
}

function main() {
  const tree = loadTokenTree("tokens");
  const { theme, root } = buildCss(tree);
  const css = `/* AUTO-GENERATED by scripts/build-tokens.ts — DO NOT EDIT.
 * Source of truth: tokens/*.tokens.json
 */
@theme {
${serialise(theme)}
}

:root {
${serialise(root)}
}
`;
  writeFileSync("src/styles/tokens.css", css);
  console.log(
    `[tokens] wrote src/styles/tokens.css — ${Object.keys(theme).length} theme vars, ${Object.keys(root).length} root vars`,
  );
}

if (process.argv[1]?.includes("build-tokens.ts")) {
  main();
}
