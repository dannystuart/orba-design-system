import type { Metadata } from "next";
import { PageHeader } from "@/components/site/PageHeader";
import { Specimen } from "@/components/site/Specimen";
import { fontWeights, typeScale } from "@/lib/tokens";

export const metadata: Metadata = { title: "Typography — ORBA Design System" };

/** Literal utility classes so Tailwind can see them. */
const typeClass: Record<string, string> = {
  "display-2xl": "text-display-2xl",
  "display-xl": "text-display-xl",
  "heading-1": "text-heading-1",
  "heading-2": "text-heading-2",
  "heading-3": "text-heading-3",
  "heading-4": "text-heading-4",
  "body-lg": "text-body-lg",
  body: "text-body",
  "body-sm": "text-body-sm",
  caption: "text-caption",
  overline: "overline-label",
};

const usage = [
  {
    title: "Headings",
    spec: "Medium / Bold",
    body: "Page titles, key messages and high-impact moments. Displays drop to Light.",
  },
  {
    title: "Subheadings",
    spec: "Medium",
    body: "Section titles and navigation labels.",
  },
  {
    title: "Body text",
    spec: "Regular / Light",
    body: "Paragraphs, descriptions and UI text.",
  },
  {
    title: "Accent text",
    spec: "Light / Italic",
    body: "Quotes, captions and secondary information.",
  },
];

export default function TypographyPage() {
  return (
    <>
      <PageHeader
        overline="Foundations"
        title="Typography"
        lead="One family — Satoshi — combining clarity and warmth. The scale is fluid: every size glides between its phone and desktop value, no breakpoint jumps."
      />

      {/* Specimen hero */}
      <Specimen label="The family">
        <div className="flex flex-col items-start gap-8 sm:flex-row sm:items-end sm:justify-between">
          <p aria-hidden className="text-accent" style={{ fontSize: "clamp(6rem, 5rem + 8vw, 11rem)", lineHeight: 1, fontWeight: 400 }}>
            Aa
          </p>
          <div className="pb-2">
            <h2 className="text-heading-2 text-fg">Satoshi</h2>
            <p className="mt-2 flex items-center gap-2 text-body-sm text-fg-secondary">
              Clean <span className="text-accent">·</span> Modern
              <span className="text-accent">·</span> Human
            </p>
            <p className="mt-3 max-w-xs text-caption text-fg-muted">
              A modern geometric sans-serif balancing precision and friendliness.
              Self-hosted variable font, weights 300–900.
            </p>
          </div>
        </div>
      </Specimen>

      {/* Weight ladder */}
      <Specimen label="Weights" caption="A single variable font file serves every weight.">
        <div className="flex flex-col gap-4">
          {fontWeights.map((w) => (
            <div key={w.name} className="flex items-baseline justify-between gap-6 border-b border-border-subtle pb-4 last:border-b-0 last:pb-0">
              <p className="text-heading-3 text-fg" style={{ fontWeight: w.value }}>
                Focus. Balance. <span className="text-accent">Thrive.</span>
              </p>
              <p className="overline-label shrink-0 text-fg-muted">
                {w.name} · {w.value}
              </p>
            </div>
          ))}
        </div>
      </Specimen>

      {/* Fluid scale */}
      <Specimen
        label="Fluid scale — resize the window and watch it glide"
        caption="Sizes are ranges, not fixed numbers: the phone value at 390px viewport, the desktop value at 1280px, interpolated between."
        padded={false}
      >
        <div className="flex flex-col">
          {typeScale.map((t) => (
            <div key={t.name} className="flex flex-col gap-3 border-b border-border-subtle p-6 last:border-b-0 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <p className={`${typeClass[t.name]} truncate text-fg`}>
                  {t.name.startsWith("display") ? "25:00" : "Find your calm"}
                </p>
              </div>
              <div className="shrink-0 sm:text-right">
                <p className="overline-label text-accent">{t.name}</p>
                <p className="mt-1 font-mono text-caption text-fg-muted">
                  {t.minPx === t.maxPx ? `${t.maxPx}px` : `${t.minPx} → ${t.maxPx}px`} · w{t.weight}
                  {t.trackingEm !== 0 && ` · ${t.trackingEm}em`}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Specimen>

      {/* Usage guidance */}
      <Specimen label="Usage guidelines" padded={false}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {usage.map((u) => (
            <div key={u.title} className="border-b border-border-subtle p-6 sm:border-r sm:last:border-r-0 lg:border-b-0">
              <p className="overline-label mb-3 text-fg-muted">{u.title}</p>
              <p className="text-body font-medium text-fg">{u.spec}</p>
              <p className="mt-2 text-caption text-fg-secondary">{u.body}</p>
            </div>
          ))}
        </div>
      </Specimen>

      {/* Signature styles */}
      <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-2">
        <Specimen
          label="Signature — calm numerals"
          caption="Data renders Light at display sizes, tightly tracked, surrounded by quiet."
        >
          <div className="py-6 text-center">
            <p className="text-display-2xl text-fg">25:00</p>
            <p className="overline-label mt-3 text-fg-muted">Deep Work</p>
          </div>
        </Specimen>
        <Specimen
          label="Signature — the micro-label"
          caption="Letterspaced uppercase overlines name every region. Weight Medium, tracking 0.25em."
        >
          <div className="flex h-full flex-col justify-center gap-4 py-6">
            <p className="overline-label text-fg-muted">Focus Timer</p>
            <p className="overline-label text-fg-muted">Ambient Context</p>
            <p className="overline-label text-accent">Current Stream</p>
          </div>
        </Specimen>
      </div>

      {/* Quote */}
      <Specimen label="Accent text — the quote voice">
        <blockquote className="py-4">
          <p className="text-heading-3 font-light text-fg-secondary italic">
            &ldquo;You can&rsquo;t control everything. But you can create your
            sphere.&rdquo;
          </p>
          <cite className="overline-label mt-4 block text-fg-muted not-italic">
            Satoshi Light Italic
          </cite>
        </blockquote>
      </Specimen>
    </>
  );
}
