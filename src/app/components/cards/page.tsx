import type { Metadata } from "next";
import { PageHeader } from "@/components/site/PageHeader";
import { Specimen } from "@/components/site/Specimen";
import { Card } from "@/components/orba/Card";
import {
  AudioEngineCard,
  FocusTimerCard,
  GreetingCard,
  PerformanceCard,
  ProgressRingCard,
} from "./demos";

export const metadata: Metadata = { title: "Cards — ORBA Design System" };

export default function CardsPage() {
  return (
    <>
      <PageHeader
        overline="Components"
        title="Cards"
        lead="Glass panels floating over the void. Two sizes, one recipe — and at full strength, the Deep Focus cards from the original references, rebuilt entirely on system tokens."
      />

      {/* Anatomy */}
      <Specimen
        label="Anatomy"
        caption="standard (16px radius) for everyday content · feature (32px radius) for hero surfaces. Interactive cards lift on the spring easing."
        variant="plain"
      >
        <div className="grid grid-cols-1 gap-6 py-2 sm:grid-cols-3">
          <Card>
            <p className="overline-label mb-3 text-fg-muted">Standard</p>
            <p className="text-body-sm text-fg-secondary">16px radius, 24px padding.</p>
          </Card>
          <Card size="feature" className="!p-6">
            <p className="overline-label mb-3 text-fg-muted">Feature</p>
            <p className="text-body-sm text-fg-secondary">32px radius, 32px padding.</p>
          </Card>
          <Card interactive>
            <p className="overline-label mb-3 text-accent">Interactive — hover</p>
            <p className="text-body-sm text-fg-secondary">Lifts 8px, shadow deepens.</p>
          </Card>
        </div>
      </Specimen>

      {/* Small cards */}
      <Specimen
        label="Small cards"
        caption="Greeting and stat patterns from the components sheet."
        variant="plain"
      >
        <div className="grid grid-cols-1 gap-6 py-2 sm:grid-cols-2">
          <GreetingCard />
          <ProgressRingCard />
        </div>
      </Specimen>

      {/* Flagship */}
      <section className="mt-14">
        <h2 className="overline-label mb-2 text-fg-muted">
          The flagship — Deep Focus cards, rebuilt on-system
        </h2>
        <p className="mb-8 max-w-2xl text-body-sm text-fg-secondary">
          The three reference cards that defined the ORBA aesthetic, reproduced with
          nothing but system tokens and components: the timer ring is motion tokens, the
          equalizer is the wave-dance interaction, the goal slider is the real Slider —
          drag it and the numbers follow.
        </p>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <FocusTimerCard />
          <AudioEngineCard />
          <PerformanceCard />
        </div>
      </section>

      {/* Rules */}
      <Specimen label="Rules" padded={false}>
        <ul className="flex flex-col">
          {[
            "One feature card per view — it is the stage, everything else is audience.",
            "Glass never stacks more than two deep: void → card → well. Never card-on-card-on-card.",
            "Imagery always sits under the scrim gradient so text stays readable.",
            "Cards own their padding; content never touches the glass edge.",
          ].map((rule) => (
            <li
              key={rule}
              className="border-b border-border-subtle px-6 py-4 text-body-sm text-fg-secondary last:border-b-0"
            >
              {rule}
            </li>
          ))}
        </ul>
      </Specimen>
    </>
  );
}
