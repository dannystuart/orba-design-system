import type { Metadata } from "next";
import { PageHeader } from "@/components/site/PageHeader";
import { Specimen } from "@/components/site/Specimen";
import { Button, IconButton } from "@/components/orba/Button";
import { Icon } from "@/components/orba/icons";
import { Check, X } from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = { title: "Buttons — ORBA Design System" };

const states = ["Default", "Hover", "Pressed", "Disabled", "Loading"] as const;

export default function ButtonsPage() {
  return (
    <>
      <PageHeader
        overline="Components"
        title="Buttons"
        lead="Three voices: a coral pill that glows for the one main action, a glass outline for alternatives, and a quiet text link for everything else."
      />

      {/* Variants at rest */}
      <Specimen
        label="Variants"
        caption="Primary is the one warm signal — at most one per view. Secondary supports it. Tertiary steps back."
      >
        <div className="flex flex-wrap items-center gap-6">
          <Button variant="primary">Start Session</Button>
          <Button variant="secondary">View Progress</Button>
          <Button variant="tertiary">Learn More</Button>
        </div>
      </Specimen>

      {/* State matrix */}
      <Specimen
        label="States"
        caption="Hover lightens and strengthens the glow; pressed deepens to rose and settles. Rows here are frozen visuals — hover the top row to feel the real thing."
        padded={false}
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-130">
            <thead>
              <tr className="border-b border-border-default">
                <th className="overline-label px-6 py-4 text-left font-medium text-fg-muted">State</th>
                <th className="overline-label px-6 py-4 text-left font-medium text-fg-muted">Primary</th>
                <th className="overline-label px-6 py-4 text-left font-medium text-fg-muted">Secondary</th>
                <th className="overline-label px-6 py-4 text-left font-medium text-fg-muted">Tertiary</th>
              </tr>
            </thead>
            <tbody>
              {states.map((s) => {
                const props =
                  s === "Hover"
                    ? { state: "hover" as const }
                    : s === "Pressed"
                      ? { state: "pressed" as const }
                      : s === "Disabled"
                        ? { disabled: true }
                        : s === "Loading"
                          ? { loading: true }
                          : {};
                return (
                  <tr key={s} className="border-b border-border-subtle last:border-b-0">
                    <td className="overline-label px-6 py-5 text-fg-muted">{s}</td>
                    <td className="px-6 py-5">
                      <Button variant="primary" {...props}>Start Session</Button>
                    </td>
                    <td className="px-6 py-5">
                      <Button variant="secondary" {...props}>View Progress</Button>
                    </td>
                    <td className="px-6 py-5">
                      {s === "Loading" ? (
                        <span className="text-caption text-fg-disabled">—</span>
                      ) : (
                        <Button variant="tertiary" {...props}>Learn More</Button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Specimen>

      {/* Sizes */}
      <Specimen
        label="Sizes"
        caption="md is the default. lg for hero moments and full-width mobile actions; sm for dense rows. All meet the 44px touch rule via hit area."
      >
        <div className="flex flex-wrap items-center gap-6">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </Specimen>

      {/* With icons + icon buttons */}
      <Specimen
        label="With icons & icon-only"
        caption="Icons sit at text size. Icon-only buttons always carry an accessible label."
      >
        <div className="flex flex-wrap items-center gap-6">
          <Button variant="primary">
            <Icon name="play" size={16} weight="fill" />
            Start Session
          </Button>
          <Button variant="secondary">
            <Icon name="calendar" size={16} />
            Schedule
          </Button>
          <IconButton label="Play" variant="primary">
            <Icon name="play" size={20} weight="fill" />
          </IconButton>
          <IconButton label="Settings">
            <Icon name="settings" size={20} />
          </IconButton>
          <IconButton label="Close" size="sm">
            <Icon name="close" size={16} />
          </IconButton>
        </div>
      </Specimen>

      {/* Full width mobile pattern */}
      <Specimen
        label="Mobile pattern — full width"
        caption="On phones the primary action spans the card, exactly like the reference Deep Focus cards."
      >
        <div className="mx-auto max-w-xs">
          <Button variant="primary" size="lg" className="w-full">
            Start Session
          </Button>
        </div>
      </Specimen>

      {/* Do / don't */}
      <Specimen label="Do / don't" variant="plain">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <figure className="glass rounded-lg p-6">
            <div className="mb-5 flex gap-3">
              <Button variant="primary" size="sm">Start Session</Button>
              <Button variant="secondary" size="sm">Not Now</Button>
            </div>
            <figcaption className="flex items-center gap-2 text-caption text-fg-muted">
              <Check size={14} weight="bold" className="text-night-200" />
              One primary, one secondary — a clear hierarchy.
            </figcaption>
          </figure>
          <figure className="glass rounded-lg p-6">
            <div className="mb-5 flex gap-3">
              <Button variant="primary" size="sm">Start Session</Button>
              <Button variant="primary" size="sm">View Progress</Button>
            </div>
            <figcaption className="flex items-center gap-2 text-caption text-fg-muted">
              <X size={14} weight="bold" className="text-danger-400" />
              Two primaries — the warm signal cancels itself out.
            </figcaption>
          </figure>
        </div>
      </Specimen>
    </>
  );
}
