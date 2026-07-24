import type { Metadata } from "next";
import { PageHeader } from "@/components/site/PageHeader";
import { Specimen } from "@/components/site/Specimen";
import { spacingScale } from "@/lib/tokens";
import { BreakpointIndicator } from "./BreakpointIndicator";

export const metadata: Metadata = { title: "Spacing & Layout — ORBA Design System" };

export default function SpacingPage() {
  return (
    <>
      <PageHeader
        overline="Foundations"
        title="Spacing & Layout"
        lead="Everything sits on a 4px rhythm — paddings, gaps, sizes. Layout is mobile-first: one calm column that grows into a grid as room appears."
      />

      {/* Scale */}
      <Specimen
        label="The 4px scale"
        caption="Steps are multiples of 4px. Between related elements use 8–16; between sections use 48–96."
      >
        <div className="flex flex-col gap-3">
          {spacingScale.map((s) => (
            <div key={s.name} className="flex items-center gap-5">
              <p className="w-8 shrink-0 text-right font-mono text-caption text-fg-muted">{s.name}</p>
              <div
                className="h-4 rounded-xs bg-accent/70"
                style={{ width: s.value }}
              />
              <p className="font-mono text-caption text-fg-disabled">{s.value}</p>
            </div>
          ))}
        </div>
      </Specimen>

      {/* Breakpoints */}
      <Specimen
        label="Breakpoints — live"
        caption="Resize the window: the lit chip is the breakpoint this page is using right now. Design for base first; add refinement upward."
      >
        <BreakpointIndicator />
      </Specimen>

      {/* Container */}
      <Specimen
        label="Container & gutters"
        caption="Content is centred in a max 1280px column. Gutters: 24px on mobile, 32px on desktop."
        padded={false}
      >
        <div className="p-4">
          <div className="rounded-md border border-dashed border-border-default p-2 sm:p-4">
            <div className="rounded-sm bg-surface-sunken px-4 py-8 text-center">
              <p className="overline-label text-fg-muted">max-width 1280px</p>
              <p className="mt-2 text-caption text-fg-disabled">
                gutter 24px (mobile) · 32px (desktop)
              </p>
            </div>
          </div>
        </div>
      </Specimen>

      {/* Grid behaviour */}
      <Specimen
        label="Grid behaviour"
        caption="The standard card grid: one column on phones, two from 640px, three from 1024px. Gap 16px."
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }, (_, i) => (
            <div
              key={i}
              className="flex h-20 items-center justify-center rounded-md bg-surface-sunken text-caption text-fg-muted"
            >
              Card {i + 1}
            </div>
          ))}
        </div>
      </Specimen>

      {/* Touch targets */}
      <Specimen
        label="Touch targets"
        caption="Interactive elements are at least 44px on touch screens — visual size can be smaller, but the hit area never is."
      >
        <div className="flex items-center gap-8">
          <div className="flex flex-col items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-full border border-dashed border-accent/50">
              <span className="size-2 rounded-full bg-accent shadow-glow-accent-soft" />
            </div>
            <p className="text-caption text-fg-muted">44px hit area</p>
          </div>
          <p className="max-w-sm text-body-sm text-fg-secondary">
            A 8px dot can be the visual; the invisible circle around it is what
            fingers actually press.
          </p>
        </div>
      </Specimen>
    </>
  );
}
