import { PageHeader } from "@/components/site/PageHeader";
import { Specimen } from "@/components/site/Specimen";

export default function Home() {
  return (
    <>
      <PageHeader
        overline="Design System · v0.1"
        title="Mindful by design."
        lead="ORBA is a calm, night-first design language. This site is its living source of truth — every specimen is real, token-driven production code."
      />
      <Specimen label="Placeholder — full overview lands in Task 6">
        <p className="text-body text-fg-secondary">
          Shell verification specimen.
        </p>
      </Specimen>
    </>
  );
}
