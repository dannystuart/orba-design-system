import type { Metadata } from "next";
import { Check, X } from "@phosphor-icons/react/dist/ssr";
import { PageHeader } from "@/components/site/PageHeader";

export const metadata: Metadata = { title: "Philosophy — ORBA Design System" };

const principles = [
  {
    n: "01",
    title: "Night first",
    body: "ORBA lives in darkness. The near-black night-950 canvas is not a 'dark mode' — it is the brand's natural habitat, calm by default. Light is information: every lighter pixel should earn its place by communicating something.",
    do: "Compose on night-950; let content glow out of the dark.",
    dont: "Flood panels with light fills or large bright areas.",
  },
  {
    n: "02",
    title: "One warm signal",
    body: "Coral is ORBA's only warm voice, and scarcity is what gives it authority. In any view, coral belongs to the single most important action or live element — the Start Session, the active day, the current stream.",
    do: "One coral emphasis per view; support it with glow.",
    dont: "Use coral for decoration, borders, or several equal elements at once.",
  },
  {
    n: "03",
    title: "Glass, not walls",
    body: "Surfaces are translucent layers floating over the void — a dark gradient, a 12px blur, a hairline of light. Depth comes from darkness and these light borders, never from grey drop-shadows.",
    do: "Separate layers with hairline white borders and blur.",
    dont: "Stack opaque grey panels or use classic material shadows.",
  },
  {
    n: "04",
    title: "Calm numbers",
    body: "Data is the hero of focus and wellbeing products, so ORBA renders it huge, Light-weight and tightly tracked — then surrounds it with quiet. A timer reads like a moon, not a dashboard.",
    do: "Display numerals in Light at display sizes with generous space.",
    dont: "Bold small numerals or crowd data with labels.",
  },
  {
    n: "05",
    title: "Motion breathes",
    body: "Animation follows the rhythms of breath: slow pulses, gentle drifts, springy but soft arrivals. Motion exists to reassure — something is alive and listening — never to hurry the user.",
    do: "Loop ambient motion slowly; enter with the spring easing.",
    dont: "Snap, flash, or animate faster than 150ms for spatial moves.",
  },
];

const rules = [
  "Body text contrasts at least 4.5:1 against its background; large numerals at least 3:1.",
  "Text on coral is always night-950 — never white.",
  "Every interactive element shows a visible coral focus ring for keyboard users.",
  "Touch targets are at least 44px on mobile.",
  "Every animation has a reduced-motion fallback; ambient loops simply stop.",
  "Error red (danger) is reserved for genuine problems — it is never a second accent.",
  "Components consume semantic tokens only; primitives never appear in component code.",
];

export default function PhilosophyPage() {
  return (
    <>
      <PageHeader
        overline="Foundations"
        title="Philosophy"
        lead="Five principles govern every ORBA decision. When a new situation isn't covered by a rule, these decide."
      />

      <div className="flex flex-col gap-6">
        {principles.map((p) => (
          <article key={p.n} className="glass rounded-xl p-6 sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:gap-10">
              <div className="lg:w-1/2">
                <p className="overline-label mb-3 text-accent">{p.n}</p>
                <h2 className="mb-3 text-heading-3 text-fg">{p.title}</h2>
                <p className="text-body-sm leading-relaxed text-fg-secondary">{p.body}</p>
              </div>
              <div className="flex flex-col gap-3 lg:w-1/2 lg:justify-center">
                <div className="flex items-start gap-3 rounded-md bg-surface-sunken p-4">
                  <Check size={16} weight="bold" className="mt-0.5 shrink-0 text-night-200" />
                  <p className="text-body-sm text-fg-secondary">{p.do}</p>
                </div>
                <div className="flex items-start gap-3 rounded-md bg-surface-sunken p-4">
                  <X size={16} weight="bold" className="mt-0.5 shrink-0 text-danger-400" />
                  <p className="text-body-sm text-fg-secondary">{p.dont}</p>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* One warm signal, illustrated */}
      <section className="mt-16">
        <h2 className="overline-label mb-6 text-fg-muted">
          One warm signal, illustrated
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <figure className="glass rounded-lg p-6">
            <div className="mb-5 flex flex-col gap-3">
              <div className="h-2 w-24 rounded-full bg-surface-sunken" />
              <div className="h-2 w-36 rounded-full bg-surface-sunken" />
              <div className="mt-3 flex gap-3">
                <div className="shadow-glow-accent-soft flex h-9 flex-1 items-center justify-center rounded-full bg-accent text-caption font-medium text-fg-on-accent">
                  Start Session
                </div>
                <div className="flex h-9 flex-1 items-center justify-center rounded-full border border-border-default text-caption text-fg-secondary">
                  View Progress
                </div>
              </div>
            </div>
            <figcaption className="flex items-center gap-2 text-caption text-fg-muted">
              <Check size={14} weight="bold" className="text-night-200" />
              One coral action. The eye knows where to go.
            </figcaption>
          </figure>
          <figure className="glass rounded-lg p-6">
            <div className="mb-5 flex flex-col gap-3">
              <div className="h-2 w-24 rounded-full bg-accent/60" />
              <div className="h-2 w-36 rounded-full bg-accent/40" />
              <div className="mt-3 flex gap-3">
                <div className="flex h-9 flex-1 items-center justify-center rounded-full bg-accent text-caption font-medium text-fg-on-accent">
                  Start Session
                </div>
                <div className="flex h-9 flex-1 items-center justify-center rounded-full bg-accent/80 text-caption font-medium text-fg-on-accent">
                  View Progress
                </div>
              </div>
            </div>
            <figcaption className="flex items-center gap-2 text-caption text-fg-muted">
              <X size={14} weight="bold" className="text-danger-400" />
              Coral everywhere — the signal is gone.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Fundamental rules */}
      <section className="mt-16">
        <h2 className="overline-label mb-6 text-fg-muted">Fundamental rules</h2>
        <ol className="glass rounded-xl">
          {rules.map((rule, i) => (
            <li
              key={rule}
              className="flex items-baseline gap-4 border-b border-border-subtle px-6 py-4 text-body-sm text-fg-secondary last:border-b-0"
            >
              <span className="overline-label shrink-0 text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              {rule}
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
