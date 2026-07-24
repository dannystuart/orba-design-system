import type { Metadata } from "next";
import { PageHeader } from "@/components/site/PageHeader";
import { Specimen } from "@/components/site/Specimen";
import { radii } from "@/lib/tokens";

export const metadata: Metadata = { title: "Shape & Effects — ORBA Design System" };

const radiusUse: Record<string, string> = {
  sm: "chips, wells",
  md: "inputs, list rows",
  lg: "cards, panels",
  xl: "modals",
  "2xl": "feature cards",
  pill: "buttons, toggles",
};

/** Decorative backdrop so the blur layer has something to blur. */
function Nebula() {
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden rounded-lg">
      <div
        className="absolute -top-4 left-2 size-36 rounded-full opacity-90"
        style={{ background: "radial-gradient(circle, var(--color-coral-500), transparent 68%)" }}
      />
      <div
        className="absolute -right-2 -bottom-6 size-32 rounded-full opacity-70"
        style={{ background: "radial-gradient(circle, var(--color-night-200), transparent 68%)" }}
      />
      <div className="absolute top-6 right-10 size-1 rounded-full bg-white/80" />
      <div className="absolute top-16 left-8 size-0.5 rounded-full bg-white/60" />
      <div className="absolute bottom-8 left-16 size-1 rounded-full bg-white/50" />
    </div>
  );
}

export default function ShapePage() {
  return (
    <>
      <PageHeader
        overline="Foundations"
        title="Shape & Effects"
        lead="Soft geometry over a dark void: generous rounding, frosted glass, and glow instead of grey shadows."
      />

      {/* Radius */}
      <Specimen
        label="Corner radius"
        caption="Rounding grows with the element: small things are gently soft, feature surfaces are unmistakably round."
      >
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
          {radii.map((r) => (
            <figure key={r.name} className="flex flex-col items-center gap-3">
              <div
                className="flex size-20 items-center justify-center border border-border-strong bg-surface-sunken"
                style={{ borderRadius: r.name === "pill" ? "9999px" : r.value }}
              />
              <figcaption className="text-center">
                <p className="text-caption font-medium text-fg">
                  {r.name} · {r.name === "pill" ? "∞" : r.value}
                </p>
                <p className="mt-0.5 text-[10px] text-fg-muted">{radiusUse[r.name]}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </Specimen>

      {/* Glass recipe */}
      <Specimen
        label="The glass recipe, deconstructed"
        caption="Three ingredients, always together: a dark 145° gradient, a 12px backdrop blur, and a hairline of light."
        variant="plain"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            { step: "1 · Gradient", cls: "", style: { background: "linear-gradient(145deg, var(--color-glass-from), var(--color-glass-to))" } },
            { step: "2 · + Blur 12px", cls: "backdrop-blur-[12px]", style: { background: "linear-gradient(145deg, var(--color-glass-from), var(--color-glass-to))" } },
            { step: "3 · + Hairline", cls: "glass", style: {} },
          ].map((layer) => (
            <figure key={layer.step} className="relative h-44">
              <Nebula />
              <div
                className={`absolute inset-5 flex items-end rounded-lg p-4 ${layer.cls}`}
                style={layer.style}
              >
                <figcaption className="overline-label text-fg-secondary">{layer.step}</figcaption>
              </div>
            </figure>
          ))}
        </div>
      </Specimen>

      {/* Elevation */}
      <Specimen
        label="Elevation — hover to lift"
        caption="Two levels only. Raised is the resting state; floating is the hover state, reached with the spring easing and a deeper shadow."
        variant="plain"
      >
        <div className="grid grid-cols-1 gap-6 py-4 sm:grid-cols-2">
          <div className="glass shadow-raised flex h-40 flex-col justify-between rounded-lg p-6">
            <p className="overline-label text-fg-muted">Raised</p>
            <p className="text-caption text-fg-secondary">shadow-raised · resting cards</p>
          </div>
          <div className="glass shadow-raised hover:shadow-floating flex h-40 flex-col justify-between rounded-lg p-6 transition-all duration-(--duration-slow) ease-(--ease-spring) hover:-translate-y-2 hover:scale-[1.01] hover:border-border-strong">
            <p className="overline-label text-accent">Floating — hover me</p>
            <p className="text-caption text-fg-secondary">
              shadow-floating · translateY(-8px) · scale(1.01)
            </p>
          </div>
        </div>
      </Specimen>

      {/* Glow */}
      <Specimen
        label="The glow family"
        caption="ORBA's replacement for coloured shadows: light leaking from live elements. Soft for resting accents, strong for the active moment, knob for controls."
      >
        <div className="grid grid-cols-1 gap-8 py-4 sm:grid-cols-3">
          <figure className="flex flex-col items-center gap-5">
            <button
              type="button"
              className="shadow-glow-accent-soft rounded-full bg-accent px-6 py-3 text-body-sm font-medium text-fg-on-accent"
            >
              Start Session
            </button>
            <figcaption className="overline-label text-fg-muted">glow / accent-soft</figcaption>
          </figure>
          <figure className="flex flex-col items-center gap-5">
            <button
              type="button"
              className="shadow-glow-accent-strong rounded-full bg-accent px-6 py-3 text-body-sm font-medium text-fg-on-accent"
            >
              Start Session
            </button>
            <figcaption className="overline-label text-fg-muted">glow / accent-strong</figcaption>
          </figure>
          <figure className="flex flex-col items-center gap-5">
            <div className="flex h-12 items-center">
              <div className="shadow-glow-knob flex size-5 items-center justify-center rounded-full bg-white">
                <span className="size-1.5 rounded-full bg-accent" />
              </div>
            </div>
            <figcaption className="overline-label text-fg-muted">glow / knob</figcaption>
          </figure>
        </div>
      </Specimen>

      {/* Anti-pattern */}
      <Specimen
        label="What ORBA never does"
        caption="No opaque grey panels, no classic material drop-shadows. Depth is darkness plus hairlines of light."
      >
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="flex h-28 items-center justify-center rounded-lg bg-[#3a3f46] shadow-[0_10px_20px_rgba(0,0,0,0.4)]">
            <p className="text-caption text-white/70 line-through">opaque grey + drop shadow</p>
          </div>
          <div className="glass flex h-28 items-center justify-center rounded-lg">
            <p className="text-caption text-fg-secondary">glass + hairline ✓</p>
          </div>
        </div>
      </Specimen>
    </>
  );
}
