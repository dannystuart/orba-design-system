"use client";

import { ArrowClockwise } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { WaveEqualizer } from "@/components/orba/WaveEqualizer";
import { durations, easings } from "@/lib/tokens";

const REPLAYABLE = new Set(["fade-up", "stagger", "count-up"]);

/** Click a duration pill → the dot crosses the track at that speed. */
export function DurationDemo() {
  const [active, setActive] = useState("base");
  const [right, setRight] = useState(false);
  const playable = durations.filter((d) => !d.name.startsWith("ambient") && d.name !== "breathe");

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2">
        {playable.map((d) => (
          <button
            key={d.name}
            type="button"
            onClick={() => {
              setActive(d.name);
              setRight((r) => !r);
            }}
            className={[
              "min-h-11 rounded-full border px-4 text-caption transition-colors duration-150",
              active === d.name
                ? "border-accent/40 bg-accent-subtle text-accent"
                : "border-border-subtle text-fg-secondary hover:border-border-strong hover:text-fg",
            ].join(" ")}
          >
            {d.name} · {d.value}
          </button>
        ))}
      </div>
      <div className="relative h-10 rounded-full bg-surface-sunken">
        <div
          className="shadow-glow-accent-soft absolute top-1/2 size-4 -translate-y-1/2 rounded-full bg-accent"
          style={{
            left: right ? "calc(100% - 1.5rem)" : "0.5rem",
            transition: `left var(--duration-${active}) var(--ease-standard)`,
          }}
        />
      </div>
    </div>
  );
}

/** Each easing drawn as a curve and demonstrated on click. */
export function EasingDemo() {
  const [pos, setPos] = useState<Record<string, boolean>>({});

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {easings.map((e) => {
        const [x1, y1, x2, y2] = e.points;
        return (
          <button
            key={e.name}
            type="button"
            onClick={() => setPos((p) => ({ ...p, [e.name]: !p[e.name] }))}
            className="group rounded-lg bg-surface-sunken p-5 text-left transition-colors hover:bg-alpha-white-5"
          >
            <div className="mb-4 flex items-center justify-between">
              <p className="overline-label text-fg-secondary">{e.name}</p>
              <ArrowClockwise size={14} weight="light" className="text-fg-muted transition-transform duration-300 group-hover:rotate-90" />
            </div>
            {/* Curve */}
            <svg viewBox="0 0 100 100" className="mb-4 h-20 w-full" aria-hidden>
              <path d="M0,100 L100,0" stroke="var(--color-border-default)" strokeWidth="1" fill="none" />
              <path
                d={`M0,100 C${x1 * 100},${100 - y1 * 100} ${x2 * 100},${100 - y2 * 100} 100,0`}
                stroke="var(--color-accent)"
                strokeWidth="2.5"
                fill="none"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            {/* Dot track */}
            <div className="relative h-6">
              <span
                className="absolute top-1/2 size-3 -translate-y-1/2 rounded-full bg-accent"
                style={{
                  left: pos[e.name] ? "calc(100% - 0.75rem)" : "0",
                  transition: `left var(--duration-drift) ${e.value}`,
                }}
              />
            </div>
            <p className="mt-2 font-mono text-[10px] text-fg-muted">{e.value}</p>
          </button>
        );
      })}
    </div>
  );
}

const interactions = [
  {
    name: "hover-lift",
    note: "Hover the card.",
    tokens: "duration/slow · ease/spring · shadow/floating",
    use: "Any interactive card or tile. Never on static content.",
  },
  {
    name: "glow-pulse",
    note: "Live dots breathe glow.",
    tokens: "duration/ambient-pulse · glow/accent-soft→strong",
    use: "The one live element per view: recording dot, active session.",
  },
  {
    name: "wave-dance",
    note: "The equalizer.",
    tokens: "duration/ambient-wave · 50ms stagger",
    use: "Sound that is currently playing — never as decoration.",
  },
  {
    name: "shimmer",
    note: "Active progress shimmers.",
    tokens: "duration/ambient-shimmer · linear",
    use: "Progress currently being earned; static bars stay still.",
  },
  {
    name: "slow-spin",
    note: "Orbits rotate, linear.",
    tokens: "duration/ambient-spin · linear",
    use: "Timer rings and orbital decoration. One per view.",
  },
  {
    name: "breathe",
    note: "The meditation rhythm.",
    tokens: "duration/breathe · ease/standard",
    use: "Breathing guides and idle companion orbs.",
  },
  {
    name: "fade-up",
    note: "Entrances rise 12px. Replay ↻",
    tokens: "duration/slow · ease/standard",
    use: "Content arriving on screen. Keyframes, never transitions.",
  },
  {
    name: "stagger",
    note: "Siblings arrive 60ms apart. Replay ↻",
    tokens: "fade-up × n · 60ms steps",
    use: "Lists and grids entering together — max 6 staggered items.",
  },
  {
    name: "count-up",
    note: "Numbers land softly. Replay ↻",
    tokens: "duration/drift · ease/standard",
    use: "Stats revealing their value. Respects reduced motion (jumps).",
  },
] as const;

function InteractionPreview({ name, replayKey }: { name: string; replayKey: number }) {
  switch (name) {
    case "hover-lift":
      return (
        <div className="glass shadow-raised hover:shadow-floating flex h-24 w-full max-w-40 items-center justify-center rounded-lg transition-all duration-(--duration-slow) ease-(--ease-spring) hover:-translate-y-2 hover:scale-[1.02]">
          <p className="text-caption text-fg-secondary">hover me</p>
        </div>
      );
    case "glow-pulse":
      return <span className="animate-glow-pulse size-3 rounded-full bg-accent" />;
    case "wave-dance":
      return (
        <WaveEqualizer
          heights={[40, 65, 90, 75, 100, 85, 60, 45, 70, 55, 35, 25]}
          barWidth={4}
          className="h-16 w-32"
        />
      );
    case "shimmer":
      return (
        <div className="h-1.5 w-full max-w-44 overflow-hidden rounded-full bg-surface-sunken">
          <div
            className="animate-shimmer shadow-glow-accent-soft h-full w-3/4 rounded-full"
            style={{
              background:
                "linear-gradient(90deg, var(--color-accent) 0%, var(--color-coral-300) 50%, var(--color-accent) 100%)",
              backgroundSize: "200% 100%",
            }}
          />
        </div>
      );
    case "slow-spin":
      return (
        <div className="relative size-20">
          <div className="absolute inset-0 rounded-full border border-border-default" />
          <div className="animate-slow-spin absolute inset-0 rounded-full border-t-2 border-r-2 border-accent/50" />
        </div>
      );
    case "breathe":
      return (
        <div
          className="animate-breathe size-16 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 35% 30%, color-mix(in srgb, var(--color-accent) 45%, transparent), color-mix(in srgb, var(--color-accent) 12%, transparent) 70%)",
          }}
        />
      );
    case "fade-up":
      return (
        <div key={replayKey} className="animate-fade-up glass flex h-20 w-full max-w-40 items-center justify-center rounded-lg">
          <p className="text-caption text-fg-secondary">entrance</p>
        </div>
      );
    case "stagger":
      return (
        <div key={replayKey} className="flex w-full max-w-44 flex-col gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="animate-fade-up h-8 rounded-md bg-surface-sunken"
              style={{ animationDelay: `${i * 60}ms` }}
            />
          ))}
        </div>
      );
    case "count-up":
      return <CountUp key={replayKey} target={78} />;
    default:
      return null;
  }
}

function CountUp({ target }: { target: number }) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    // Reduced motion: land on the value in a single frame.
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = reduce ? 0 : 700; // duration/drift
    const startTime = performance.now();
    let frame: number;
    const tick = (now: number) => {
      const t = duration === 0 ? 1 : Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(eased * target));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target]);
  return (
    <p className="text-display-2xl text-fg" style={{ fontSize: "3rem" }}>
      {value}
      <span className="text-heading-3 text-fg-muted">%</span>
    </p>
  );
}

export function InteractionGrid() {
  const [keys, setKeys] = useState<Record<string, number>>({});
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {interactions.map((ix) => (
        <figure key={ix.name} className="glass flex flex-col rounded-lg p-5">
          <div className="mb-4 flex items-center justify-between">
            <figcaption className="overline-label text-accent">{ix.name}</figcaption>
            {REPLAYABLE.has(ix.name) && (
              <button
                type="button"
                aria-label={`Replay ${ix.name}`}
                onClick={() => setKeys((k) => ({ ...k, [ix.name]: (k[ix.name] ?? 0) + 1 }))}
                className="flex size-8 items-center justify-center rounded-full border border-border-subtle text-fg-muted transition-colors hover:border-border-strong hover:text-fg"
              >
                <ArrowClockwise size={13} weight="light" />
              </button>
            )}
          </div>
          <div className="flex min-h-28 flex-1 items-center justify-center py-2">
            <InteractionPreview name={ix.name} replayKey={keys[ix.name] ?? 0} />
          </div>
          <p className="mt-4 text-caption text-fg-secondary">{ix.note}</p>
          <p className="mt-2 font-mono text-[10px] text-fg-muted">{ix.tokens}</p>
          <p className="mt-2 border-t border-border-subtle pt-2 text-caption text-fg-muted">
            {ix.use}
          </p>
        </figure>
      ))}
    </div>
  );
}
