import type { Metadata } from "next";
import { PageHeader } from "@/components/site/PageHeader";
import { Specimen } from "@/components/site/Specimen";
import { ICON_SIZES, Icon, ORBA_ICONS, type OrbaIconName } from "@/components/orba/icons";

export const metadata: Metadata = { title: "Icons — ORBA Design System" };

const names = Object.keys(ORBA_ICONS) as OrbaIconName[];

export default function IconsPage() {
  return (
    <>
      <PageHeader
        overline="Components"
        title="Icons"
        lead="A curated set drawn in a thin outline voice (Phosphor, light weight) — quiet line work that matches ORBA's hairline borders."
      />

      <Specimen
        label={`The set — ${names.length} icons`}
        caption="Named for what they mean in ORBA, not what they depict. Add new icons only from the same family, light weight."
      >
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-6">
          {names.map((name) => (
            <figure
              key={name}
              className="group flex flex-col items-center gap-3 rounded-md py-5 transition-colors duration-150 hover:bg-surface-sunken"
            >
              <span className="text-fg-secondary transition-colors duration-150 group-hover:text-accent">
                <Icon name={name} size={24} />
              </span>
              <figcaption className="text-caption text-fg-muted">{name}</figcaption>
            </figure>
          ))}
        </div>
      </Specimen>

      <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-2">
        <Specimen
          label="Sizes"
          caption="Four sizes only. 16 inside buttons and inputs, 20 default UI, 24 navigation and feature rows, 32 hero moments."
        >
          <div className="flex items-end gap-8">
            {ICON_SIZES.map((s) => (
              <figure key={s} className="flex flex-col items-center gap-3">
                <span className="text-fg-secondary">
                  <Icon name="focus" size={s} />
                </span>
                <figcaption className="text-caption text-fg-muted">{s}px</figcaption>
              </figure>
            ))}
          </div>
        </Specimen>

        <Specimen
          label="Weights"
          caption="Light is the ORBA voice. Fill marks the active state only — a nav item you're on, a playing button."
        >
          <div className="flex items-end gap-8">
            {(["thin", "light", "regular", "fill"] as const).map((w) => (
              <figure key={w} className="flex flex-col items-center gap-3">
                <span className={w === "fill" ? "text-accent" : "text-fg-secondary"}>
                  <Icon name="heart" size={24} weight={w} />
                </span>
                <figcaption className="text-caption text-fg-muted">{w}</figcaption>
              </figure>
            ))}
          </div>
        </Specimen>
      </div>

      <Specimen
        label="In context — the active state"
        caption="Exactly one filled icon per navigation: the place you are now, in coral."
      >
        <div className="mx-auto flex max-w-sm items-center justify-between rounded-lg border border-border-subtle px-8 py-4">
          {(
            [
              ["home", false],
              ["focus", true],
              ["reflect", false],
              ["profile", false],
            ] as Array<[OrbaIconName, boolean]>
          ).map(([name, active]) => (
            <div key={name} className="flex flex-col items-center gap-1.5">
              <span className={active ? "text-accent" : "text-fg-muted"}>
                <Icon name={name} size={24} weight={active ? "fill" : "light"} />
              </span>
              <span className={`text-[10px] ${active ? "text-accent" : "text-fg-muted"}`}>
                {name}
              </span>
            </div>
          ))}
        </div>
      </Specimen>
    </>
  );
}
