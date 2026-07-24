import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

const principles = [
  {
    n: "01",
    title: "Night first",
    body: "The canvas is darkness. Light is information — spend it carefully.",
  },
  {
    n: "02",
    title: "One warm signal",
    body: "Coral marks the single most important thing on screen. If everything glows, nothing does.",
  },
  {
    n: "03",
    title: "Glass, not walls",
    body: "Surfaces are translucent layers over the void, separated by hairline light — never grey shadows.",
  },
  {
    n: "04",
    title: "Calm numbers",
    body: "Data is rendered big, Light and quiet. Numerals breathe; they never shout.",
  },
  {
    n: "05",
    title: "Motion breathes",
    body: "Animation follows breath-like rhythms — pulse, drift, spring — and always respects reduced motion.",
  },
];

const foundations = [
  { title: "Philosophy", href: "/foundations/philosophy", blurb: "The rules behind every decision" },
  { title: "Colour", href: "/foundations/colour", blurb: "Night ramp, coral signal, roles" },
  { title: "Typography", href: "/foundations/typography", blurb: "Satoshi, fluid from phone to desktop" },
  { title: "Spacing & Layout", href: "/foundations/spacing", blurb: "4px rhythm, grid, breakpoints" },
  { title: "Shape & Effects", href: "/foundations/shape", blurb: "Radius, glass, glow, elevation" },
  { title: "Motion", href: "/foundations/motion", blurb: "Durations, easings, micro-interactions" },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative mb-24 pt-6 lg:pt-16">
        {/* Orbit decoration */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-4 right-0 hidden size-64 md:block lg:size-80"
        >
          <div className="absolute inset-0 rounded-full border border-border-subtle" />
          <div className="animate-slow-spin absolute inset-0 rounded-full border-t-2 border-r-2 border-accent/40" />
          <div className="animate-glow-pulse absolute top-[9%] right-[18%] size-1.5 rounded-full bg-accent" />
          <div className="absolute inset-8 rounded-full border border-border-subtle opacity-60" />
        </div>

        <p className="overline-label animate-fade-up mb-6 text-accent">
          ORBA Design System · v0.1
        </p>
        <h1
          className="animate-fade-up max-w-3xl text-display-xl text-fg"
          style={{ animationDelay: "60ms" }}
        >
          Mindful <span className="text-accent">by design.</span>
        </h1>
        <p
          className="animate-fade-up mt-6 max-w-xl text-body-lg font-light text-fg-secondary"
          style={{ animationDelay: "120ms" }}
        >
          A calm, night-first design language for focus and wellbeing products.
          This site is its living source of truth — every specimen is real,
          token-driven production code, on phones and desktops alike.
        </p>
      </section>

      {/* Principles */}
      <section className="mb-24">
        <h2 className="overline-label mb-6 text-fg-muted">The five principles</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {principles.map((p) => (
            <article key={p.n} className="glass rounded-lg p-6">
              <p className="overline-label mb-4 text-accent">{p.n}</p>
              <h3 className="mb-2 text-heading-4 text-fg">{p.title}</h3>
              <p className="text-body-sm leading-relaxed text-fg-secondary">{p.body}</p>
            </article>
          ))}
          <article className="flex items-center justify-center rounded-lg border border-dashed border-border-default p-6">
            <Link
              href="/foundations/philosophy"
              className="group flex items-center gap-2 text-body-sm text-fg-secondary transition-colors hover:text-accent"
            >
              Read the full philosophy
              <ArrowRight
                size={16}
                weight="light"
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </article>
        </div>
      </section>

      {/* Foundations index */}
      <section>
        <h2 className="overline-label mb-6 text-fg-muted">Foundations</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {foundations.map((f) => (
            <Link
              key={f.href}
              href={f.href}
              className="group glass flex items-center justify-between gap-4 rounded-lg p-5 transition-colors duration-300 hover:border-border-strong"
            >
              <span>
                <span className="block text-body font-medium text-fg">{f.title}</span>
                <span className="mt-1 block text-caption text-fg-muted">{f.blurb}</span>
              </span>
              <ArrowRight
                size={18}
                weight="light"
                className="shrink-0 text-fg-muted transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent"
              />
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
