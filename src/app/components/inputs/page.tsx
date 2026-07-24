import type { Metadata } from "next";
import { PageHeader } from "@/components/site/PageHeader";
import { Specimen } from "@/components/site/Specimen";
import { Icon } from "@/components/orba/icons";
import { TextField } from "@/components/orba/TextField";
import { Checkbox, Radio, Toggle } from "@/components/orba/Selection";
import { Select } from "@/components/orba/Select";
import { SegmentedControl } from "@/components/orba/SegmentedControl";
import { Slider } from "@/components/orba/Slider";

export const metadata: Metadata = { title: "Inputs — ORBA Design System" };

export default function InputsPage() {
  return (
    <>
      <PageHeader
        overline="Components"
        title="Inputs"
        lead="Quiet wells in the glass. At rest they whisper; focus draws the coral hairline; only genuine errors speak in red."
      />

      {/* Text fields */}
      <Specimen
        label="Text fields"
        caption="Click into a field to see the focus treatment. Error text always names the fix, not just the failure."
      >
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          <TextField label="Email address" placeholder="you@example.com" helper="We only use this to sync your sphere." />
          <TextField label="Search" placeholder="Search sessions…" icon={<Icon name="search" size={16} />} />
          <TextField
            label="Email address"
            defaultValue="you@example"
            error="Please enter a valid email address."
          />
          <TextField label="Display name" placeholder="Unavailable during sync" disabled />
        </div>
      </Specimen>

      {/* Select */}
      <Specimen
        label="Dropdown"
        caption="A glass sheet floats below the field. Arrow keys move, Enter selects, Escape dismisses."
      >
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          <Select
            label="Ambient sound"
            options={["Cosmic Drift", "Stellar Echoes", "Night Rain", "Silence"]}
            defaultValue="Cosmic Drift"
          />
          <Select
            label="Session length"
            options={["15 minutes", "25 minutes", "50 minutes"]}
          />
        </div>
      </Specimen>

      {/* Selection controls */}
      <Specimen
        label="Selection controls"
        caption="Checked states earn the coral + soft glow. Every control sits in a 44px hit area."
      >
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div className="flex flex-col gap-1">
            <p className="overline-label mb-3 text-fg-muted">Checkbox</p>
            <Checkbox label="Morning reminder" defaultChecked />
            <Checkbox label="Evening reflection" />
            <Checkbox label="Weekly summary" disabled />
          </div>
          <div className="flex flex-col gap-1">
            <p className="overline-label mb-3 text-fg-muted">Radio</p>
            <Radio name="focus-mode" label="Deep work" defaultChecked />
            <Radio name="focus-mode" label="Light focus" />
            <Radio name="focus-mode" label="Recovery" />
          </div>
          <div className="flex flex-col gap-1">
            <p className="overline-label mb-3 text-fg-muted">Toggle</p>
            <Toggle label="Ambient context" defaultChecked />
            <Toggle label="Do not disturb" />
          </div>
        </div>
      </Specimen>

      {/* Sliders */}
      <Specimen
        label="Sliders"
        caption="The white knob carries the ORBA glow; the fill is coral. Drag, or focus the knob and use arrow keys (Shift for ×10)."
      >
        <div className="flex flex-col gap-10">
          <div>
            <div className="mb-2 flex items-baseline justify-between">
              <p className="text-body-sm text-fg-secondary">Daily goal</p>
              <p className="overline-label text-accent">hours</p>
            </div>
            <Slider label="Daily goal" defaultValue={66} ticks={5} />
          </div>
          <div>
            <div className="mb-2 flex items-baseline justify-between">
              <p className="text-body-sm text-fg-secondary">Quiet hours</p>
              <p className="overline-label text-fg-muted">range</p>
            </div>
            <Slider label="Quiet hours" defaultValue={25} defaultEnd={75} />
          </div>
        </div>
      </Specimen>

      {/* Segmented control */}
      <Specimen
        label="Segmented control"
        caption="For 2–4 sibling views. The chosen segment is the one warm signal of its row."
      >
        <SegmentedControl label="Period" options={["Day", "Week", "Month", "Year"]} defaultValue="Week" />
      </Specimen>

      {/* Accessibility notes */}
      <Specimen label="Accessibility" padded={false}>
        <ul className="flex flex-col">
          {[
            "Every field has a real label — placeholders never stand in for one.",
            "Focus is always visible: coral hairline on fields, coral ring on controls.",
            "Errors are announced to screen readers and linked to their field.",
            "All controls work keyboard-only: Tab to reach, arrows/Space/Enter to operate.",
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
