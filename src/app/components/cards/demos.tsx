"use client";

import {
  ChartLineUp,
  Clock,
  Info,
  Play,
  SkipBack,
  SkipForward,
  SpeakerHifi,
  Waves,
} from "@phosphor-icons/react";
import { useState } from "react";
import { Button, IconButton } from "@/components/orba/Button";
import { Card, CardHeader } from "@/components/orba/Card";
import { Slider } from "@/components/orba/Slider";

/** CSS-only cosmic backdrop (no external imagery — stays token-driven). */
function CosmicBackdrop() {
  return (
    <div aria-hidden className="absolute inset-0">
      <div
        className="absolute inset-0"
        style={{
          background: [
            "radial-gradient(ellipse 90% 60% at 75% 18%, color-mix(in srgb, var(--color-coral-700) 34%, transparent), transparent 65%)",
            "radial-gradient(ellipse 70% 55% at 20% 85%, color-mix(in srgb, var(--color-night-500) 40%, transparent), transparent 60%)",
          ].join(", "),
        }}
      />
      {[
        [12, 18], [28, 8], [46, 26], [64, 12], [82, 30], [90, 6],
        [18, 55], [38, 68], [70, 58], [88, 74], [8, 82], [55, 88],
      ].map(([x, y], i) => (
        <span
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            left: `${x}%`,
            top: `${y}%`,
            width: i % 3 === 0 ? 2 : 1,
            height: i % 3 === 0 ? 2 : 1,
            opacity: i % 2 === 0 ? 0.5 : 0.25,
          }}
        />
      ))}
      <div
        className="absolute inset-0"
        style={{ background: "var(--gradient-scrim)" }}
      />
    </div>
  );
}

export function FocusTimerCard() {
  return (
    <Card size="feature" className="flex min-h-130 flex-col items-center justify-between">
      <CardHeader title="Focus Timer" icon={<Clock size={18} weight="light" />} />

      <div className="relative my-8 flex items-center justify-center">
        <div className="flex size-56 items-center justify-center rounded-full border border-border-subtle sm:size-64">
          <div className="animate-slow-spin absolute inset-0 rounded-full border-t-2 border-r-2 border-accent/40" />
          <div className="z-10 text-center">
            <span className="block text-display-2xl text-fg">25:00</span>
            <span className="overline-label mt-2 block text-fg-muted">Deep Work</span>
          </div>
        </div>
        <div className="animate-glow-pulse absolute top-3 right-12 size-1.5 rounded-full bg-accent" />
      </div>

      <div className="w-full space-y-6">
        <Button variant="primary" size="lg" className="w-full">
          Start Session
        </Button>
        <div className="border-t border-border-subtle pt-5">
          <div className="mb-4 flex items-center justify-between text-caption text-fg-muted">
            <span className="overline-label">Ambient Context</span>
            <span>On</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex size-10 items-center justify-center rounded-full bg-alpha-white-5">
              <Play size={14} weight="fill" className="text-accent" />
            </span>
            <span>
              <span className="block text-body-sm font-medium text-fg">Stellar Echoes</span>
              <span className="mt-0.5 block text-[10px] tracking-tight text-fg-muted uppercase">
                Brown Noise · 48kHz
              </span>
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}

const WAVE_HEIGHTS = [25, 50, 75, 66, 100, 80, 60, 50, 66, 33, 50, 75, 83, 60, 25, 33, 50, 66, 80, 100, 75, 50, 25, 20];

export function AudioEngineCard() {
  return (
    <Card size="feature" className="flex min-h-130 flex-col justify-between">
      <CosmicBackdrop />
      <CardHeader title="Audio Engine" icon={<Waves size={18} weight="light" />} muted={false} />

      <div className="relative z-10 mt-10">
        <p className="overline-label mb-2 text-accent">Current Stream</p>
        <h3 className="text-heading-2 font-light text-fg">Cosmic Drift</h3>
        <p className="mt-3 text-body-sm font-light text-fg-secondary">
          A seamless loop of interstellar radio waves and deep synthetic pads.
        </p>
      </div>

      <div className="relative z-10 mt-8 w-full">
        <div className="mb-8 flex h-24 items-end justify-between gap-1">
          {WAVE_HEIGHTS.map((h, i) => (
            <span
              key={i}
              className="animate-wave-dance w-[3px] origin-bottom rounded-full"
              style={{
                height: `${h}%`,
                animationDelay: `${i * 50}ms`,
                background:
                  "linear-gradient(to top, color-mix(in srgb, var(--color-accent) 20%, transparent), color-mix(in srgb, var(--color-accent) 80%, transparent))",
              }}
            />
          ))}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-4">
            <IconButton label="Previous track">
              <SkipBack size={20} weight="light" />
            </IconButton>
            <button
              type="button"
              aria-label="Play"
              className="flex size-12 items-center justify-center rounded-full bg-white text-night-950 transition-transform duration-(--duration-base) ease-(--ease-spring) hover:scale-105 active:scale-95"
            >
              <Play size={20} weight="fill" />
            </button>
            <IconButton label="Next track">
              <SkipForward size={20} weight="light" />
            </IconButton>
          </div>
          <span className="flex items-center gap-2 text-caption text-fg-muted">
            <SpeakerHifi size={16} weight="light" />
            <span className="overline-label">Hi-Res</span>
          </span>
        </div>
      </div>
    </Card>
  );
}

const ACTIVITY = [30, 60, 45, 85, 20, 55, 40];
const GOAL_HOURS = 6;

export function PerformanceCard() {
  const [hours, setHours] = useState(4);
  const pct = Math.round((hours / GOAL_HOURS) * 100);
  return (
    <Card size="feature" className="flex min-h-130 flex-col justify-between">
      <CardHeader title="Performance" icon={<ChartLineUp size={18} weight="light" />} />

      <div className="my-8 space-y-10">
        <div className="space-y-2">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-body-sm font-medium text-fg-secondary">Daily Goal</p>
              <p className="text-heading-2 font-light text-fg">
                {hours} / {GOAL_HOURS}{" "}
                <span className="text-body-sm font-normal text-fg-muted">hours</span>
              </p>
            </div>
            <span className="overline-label text-accent">{pct}%</span>
          </div>
          <Slider
            label="Daily goal"
            defaultValue={66}
            ticks={5}
            onValueChange={(v) => setHours(Math.round((v / 100) * GOAL_HOURS))}
          />
        </div>

        <div className="space-y-4">
          <p className="overline-label text-fg-muted">Activity Pulse</p>
          <div className="grid grid-cols-7 gap-2">
            {ACTIVITY.map((h, i) => (
              <div
                key={i}
                className="group/bar relative h-12 overflow-hidden rounded-md bg-alpha-white-5"
              >
                <div
                  className={[
                    "absolute bottom-0 w-full transition-all duration-(--duration-base)",
                    i === 3
                      ? "shadow-glow-accent-soft bg-accent"
                      : "bg-accent/30 group-hover/bar:bg-accent/50",
                  ].join(" ")}
                  style={{ height: `${h}%` }}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between text-[10px] tracking-tight text-fg-disabled uppercase">
            <span>Mon</span>
            <span>Sun</span>
          </div>
        </div>
      </div>

      <div className="flex items-start gap-4 rounded-lg border border-border-subtle bg-alpha-white-3 p-4">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-accent-subtle">
          <Info size={14} weight="light" className="text-accent" />
        </span>
        <p className="text-caption leading-relaxed font-light text-fg-secondary">
          <span className="font-medium text-fg">Insight:</span> Thursday is your most
          productive day. You tend to reach deep flow states between 10 AM and 1 PM.
        </p>
      </div>
    </Card>
  );
}

/** Small progress-ring card (78% Focus Score, from the components sheet). */
export function ProgressRingCard() {
  const pct = 78;
  const r = 42;
  const c = 2 * Math.PI * r;
  return (
    <Card interactive className="flex items-center justify-between gap-6">
      <div>
        <h3 className="text-heading-4 text-fg">Your Progress</h3>
        <p className="mt-1 text-caption text-fg-muted">This Week</p>
      </div>
      <div className="relative size-24 shrink-0">
        <svg viewBox="0 0 100 100" className="size-full -rotate-90">
          <circle cx="50" cy="50" r={r} fill="none" stroke="var(--color-alpha-white-8)" strokeWidth="6" />
          <circle
            cx="50"
            cy="50"
            r={r}
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={c * (1 - pct / 100)}
            style={{ filter: "drop-shadow(0 0 6px color-mix(in srgb, var(--color-accent) 45%, transparent))" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-heading-3 font-light text-fg">{pct}%</span>
          <span className="text-[9px] tracking-[0.2em] text-fg-muted uppercase">Focus Score</span>
        </div>
      </div>
    </Card>
  );
}

export function GreetingCard() {
  return (
    <Card interactive className="relative min-h-36">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 90% at 85% 30%, color-mix(in srgb, var(--color-coral-700) 22%, transparent), transparent 65%)",
        }}
      />
      <div className="relative z-10">
        <h3 className="text-heading-3 font-light text-fg">Good Evening</h3>
        <p className="mt-2 text-body-sm text-fg-secondary">Take a deep breath.</p>
      </div>
    </Card>
  );
}
