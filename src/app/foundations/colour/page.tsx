import type { Metadata } from "next";
import { PageHeader } from "@/components/site/PageHeader";
import { Specimen } from "@/components/site/Specimen";
import {
  alphaSet,
  contrast,
  coralRamp,
  nightRamp,
  resolveColour,
  semanticColours,
} from "@/lib/tokens";

export const metadata: Metadata = { title: "Colour — ORBA Design System" };

const hexToRgb = (hex: string) => {
  const c = hex.replace("#", "");
  return `${parseInt(c.slice(0, 2), 16)} · ${parseInt(c.slice(2, 4), 16)} · ${parseInt(c.slice(4, 6), 16)}`;
};

const primaries = [
  { name: "night-950", hex: resolveColour("colour.night.950"), ring: true },
  { name: "night-800", hex: resolveColour("colour.night.800") },
  { name: "night-500", hex: resolveColour("colour.night.500") },
  { name: "night-200", hex: resolveColour("colour.night.200") },
  { name: "coral-500", hex: resolveColour("colour.coral.500") },
  { name: "coral-700", hex: resolveColour("colour.coral.700") },
];

const usageRatio = [
  { name: "night-950", pct: 40 },
  { name: "night-800", pct: 20 },
  { name: "night-500", pct: 15 },
  { name: "night-200", pct: 10 },
  { name: "coral-500", pct: 8 },
  { name: "coral-700", pct: 7 },
];

const contrastPairs = [
  { label: "Primary text on canvas", fg: "colour.white", bg: "colour.night.950", need: 4.5 },
  { label: "Secondary text on canvas", fg: "colour.night.200", bg: "colour.night.950", need: 4.5 },
  { label: "Muted text on canvas", fg: "colour.night.400", bg: "colour.night.950", need: 3 },
  { label: "Accent (large text / UI) on canvas", fg: "colour.coral.500", bg: "colour.night.950", need: 3 },
  { label: "Text on accent", fg: "colour.night.950", bg: "colour.coral.500", need: 4.5 },
  { label: "Error text on canvas", fg: "colour.danger.400", bg: "colour.night.950", need: 4.5 },
];

export default function ColourPage() {
  return (
    <>
      <PageHeader
        overline="Foundations"
        title="Colour"
        lead="A refined balance of deep, calming tones with one soft, warm accent. Primitives paint; semantic roles decide where the paint goes."
      />

      {/* Primary swatches */}
      <Specimen label="Primary colours" variant="plain" className="!bg-transparent !p-0">
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-6">
          {primaries.map((c) => (
            <figure key={c.name} className="flex flex-col items-center gap-4">
              <div
                className={`aspect-square w-full max-w-28 rounded-full ${c.ring ? "border border-border-default" : ""}`}
                style={{ backgroundColor: c.hex }}
              />
              <figcaption className="text-center">
                <p className="overline-label text-fg-secondary">{c.hex.replace("#", "")}</p>
                <p className="mt-1.5 text-caption text-fg-muted">{hexToRgb(c.hex)}</p>
                <p className="mt-1 text-caption text-fg-disabled">{c.name}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </Specimen>

      {/* Ramps */}
      <Specimen
        label="Night ramp"
        caption="The cool foundation ramp. 950 is the canvas; 200 is secondary text; steps between build surfaces and borders."
      >
        <div className="flex flex-col gap-2">
          <div className="flex h-16 overflow-hidden rounded-md border border-border-subtle">
            {nightRamp.map((s) => (
              <div key={s.step} className="flex-1" style={{ backgroundColor: s.hex }} title={`night-${s.step} ${s.hex}`} />
            ))}
          </div>
          <div className="flex">
            {nightRamp.map((s) => (
              <p key={s.step} className="flex-1 text-center text-[10px] text-fg-muted">{s.step}</p>
            ))}
          </div>
        </div>
      </Specimen>

      <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-2">
        <Specimen
          label="Coral ramp — the one warm signal"
          caption="500 is the canonical accent. 400 hovers, 700 presses."
        >
          <div className="flex flex-col gap-2">
            <div className="flex h-16 overflow-hidden rounded-md">
              {coralRamp.map((s) => (
                <div key={s.step} className="flex-1" style={{ backgroundColor: s.hex }} title={`coral-${s.step} ${s.hex}`} />
              ))}
            </div>
            <div className="flex">
              {coralRamp.map((s) => (
                <p key={s.step} className="flex-1 text-center text-[10px] text-fg-muted">{s.step}</p>
              ))}
            </div>
          </div>
        </Specimen>

        <Specimen
          label="Danger — deliberately not the accent"
          caption="F87171 marks genuine errors only. Coral invites; danger warns."
        >
          <div className="flex items-center gap-4">
            <div className="size-16 shrink-0 rounded-md bg-danger-400" />
            <div>
              <p className="text-body-sm text-fg">danger-400 · #F87171</p>
              <p className="mt-1 text-caption text-danger-400">Please enter a valid email address.</p>
            </div>
          </div>
        </Specimen>
      </div>

      {/* Alphas over glass */}
      <Specimen
        label="White alphas — hairlines & glass fills"
        caption="Borders and quiet fills are translucent white, so they adapt to whatever sits beneath the glass."
      >
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-5">
          {alphaSet.map((a) => (
            <div key={a.name} className="flex flex-col items-center gap-3">
              <div
                className="h-14 w-full rounded-md border border-border-subtle"
                style={{ backgroundColor: a.hex }}
              />
              <p className="text-caption text-fg-muted">{a.name}</p>
            </div>
          ))}
        </div>
      </Specimen>

      {/* Usage ratio */}
      <Specimen
        label="Usage ratio"
        caption="Primary colours are the foundation; accents exist for highlights, calls-to-action and key interactions."
      >
        <div className="flex h-10 overflow-hidden rounded-full border border-border-subtle">
          {usageRatio.map((u) => (
            <div
              key={u.name}
              style={{
                width: `${u.pct}%`,
                backgroundColor:
                  u.name.startsWith("night")
                    ? resolveColour(`colour.night.${u.name.split("-")[1]}`)
                    : resolveColour(`colour.coral.${u.name.split("-")[1]}`),
              }}
              title={`${u.name} ${u.pct}%`}
            />
          ))}
        </div>
        <div className="mt-3 flex">
          {usageRatio.map((u) => (
            <p key={u.name} style={{ width: `${u.pct}%` }} className="text-center text-[10px] text-fg-muted">
              {u.pct}%
            </p>
          ))}
        </div>
      </Specimen>

      {/* Semantic roles */}
      <Specimen
        label="Semantic roles — what components actually use"
        caption="Components never reference primitives. A future light theme only re-points this table."
        padded={false}
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-130 text-left">
            <thead>
              <tr className="border-b border-border-default">
                <th className="overline-label px-6 py-4 font-medium text-fg-muted">Role</th>
                <th className="overline-label px-6 py-4 font-medium text-fg-muted">CSS variable</th>
                <th className="overline-label px-6 py-4 font-medium text-fg-muted">Source</th>
                <th className="overline-label px-6 py-4 font-medium text-fg-muted">Sample</th>
              </tr>
            </thead>
            <tbody>
              {semanticColours.map((s) => (
                <tr key={s.cssVar} className="border-b border-border-subtle last:border-b-0">
                  <td className="px-6 py-3 text-body-sm text-fg">{s.role}</td>
                  <td className="px-6 py-3 font-mono text-caption text-fg-secondary">{s.cssVar}</td>
                  <td className="px-6 py-3 font-mono text-caption text-fg-muted">{s.source}</td>
                  <td className="px-6 py-3">
                    <span
                      className="inline-block h-6 w-10 rounded-sm border border-border-subtle align-middle"
                      style={{ backgroundColor: s.hex }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Specimen>

      {/* Contrast */}
      <Specimen
        label="Contrast — checked, not hoped"
        caption="Ratios computed from the token values at build time. AA body = 4.5:1 · AA large text / UI = 3:1."
        padded={false}
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-130 text-left">
            <thead>
              <tr className="border-b border-border-default">
                <th className="overline-label px-6 py-4 font-medium text-fg-muted">Pair</th>
                <th className="overline-label px-6 py-4 font-medium text-fg-muted">Sample</th>
                <th className="overline-label px-6 py-4 font-medium text-fg-muted">Ratio</th>
                <th className="overline-label px-6 py-4 font-medium text-fg-muted">Result</th>
              </tr>
            </thead>
            <tbody>
              {contrastPairs.map((p) => {
                const fg = resolveColour(p.fg);
                const bg = resolveColour(p.bg);
                const ratio = contrast(fg, bg);
                const pass = ratio >= p.need;
                return (
                  <tr key={p.label} className="border-b border-border-subtle last:border-b-0">
                    <td className="px-6 py-3 text-body-sm text-fg">{p.label}</td>
                    <td className="px-6 py-3">
                      <span
                        className="inline-flex h-7 items-center rounded-sm px-3 text-caption"
                        style={{ backgroundColor: bg, color: fg }}
                      >
                        Aa 25:00
                      </span>
                    </td>
                    <td className="px-6 py-3 font-mono text-caption text-fg-secondary">
                      {ratio.toFixed(2)}:1
                    </td>
                    <td className="px-6 py-3">
                      <span
                        className={`overline-label ${pass ? "text-night-200" : "text-danger-400"}`}
                      >
                        {pass ? `Pass ≥${p.need}` : "Fail"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Specimen>
    </>
  );
}
