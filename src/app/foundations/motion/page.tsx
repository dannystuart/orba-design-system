import type { Metadata } from "next";
import { PageHeader } from "@/components/site/PageHeader";
import { Specimen } from "@/components/site/Specimen";
import { durations } from "@/lib/tokens";
import { DurationDemo, EasingDemo, InteractionGrid } from "./MotionDemos";

export const metadata: Metadata = { title: "Motion — ORBA Design System" };

export default function MotionPage() {
  return (
    <>
      <PageHeader
        overline="Foundations"
        title="Motion"
        lead="ORBA motion follows the rhythms of breath — slow pulses, gentle drifts, soft spring arrivals. It reassures; it never hurries."
      />

      <Specimen
        label="Durations — click to feel each one"
        caption="fast flips colours, base moves most things, slow + spring moves things spatially, drift moves large media."
      >
        <DurationDemo />
      </Specimen>

      <Specimen
        label="Ambient loops"
        caption="Looping decoration runs far slower than interaction speeds — these are moods, not events."
        padded={false}
      >
        <div className="grid grid-cols-2 sm:grid-cols-5">
          {durations
            .filter((d) => d.name.startsWith("ambient") || d.name === "breathe")
            .map((d) => (
              <div key={d.name} className="border-r border-b border-border-subtle p-5 last:border-r-0 sm:border-b-0">
                <p className="overline-label text-fg-secondary">{d.name.replace("ambient-", "")}</p>
                <p className="mt-1 font-mono text-caption text-fg-muted">{d.value}</p>
              </div>
            ))}
        </div>
      </Specimen>

      <Specimen
        label="Easings — click a curve to run it"
        caption="standard for utility moves · spring is the ORBA signature for arrivals and lifts · linear only for spins and shimmers."
      >
        <EasingDemo />
      </Specimen>

      <section className="mt-14">
        <h2 className="overline-label mb-6 text-fg-muted">
          The micro-interaction library
        </h2>
        <InteractionGrid />
      </section>

      <Specimen
        label="Reduced motion"
        caption="Every animation honours the system 'reduce motion' setting: ambient loops stop, entrances land instantly at their final state. Nothing is lost except movement."
      >
        <p className="text-body-sm text-fg-secondary">
          Try it: enable <span className="text-fg">Reduce Motion</span> in your
          OS accessibility settings and revisit this page — it stays calm,
          just still.
        </p>
      </Specimen>
    </>
  );
}
