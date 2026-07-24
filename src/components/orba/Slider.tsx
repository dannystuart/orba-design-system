"use client";

import { useCallback, useRef, useState } from "react";

const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));

function Thumb({
  value,
  min,
  max,
  label,
  onChange,
}: {
  value: number;
  min: number;
  max: number;
  label: string;
  onChange: (v: number) => void;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <span
      role="slider"
      tabIndex={0}
      aria-label={label}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      onKeyDown={(e) => {
        const step = e.shiftKey ? 10 : 1;
        if (e.key === "ArrowRight" || e.key === "ArrowUp") {
          e.preventDefault();
          onChange(clamp(value + step, min, max));
        } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
          e.preventDefault();
          onChange(clamp(value - step, min, max));
        } else if (e.key === "Home") {
          e.preventDefault();
          onChange(min);
        } else if (e.key === "End") {
          e.preventDefault();
          onChange(max);
        }
      }}
      className={[
        "absolute top-1/2 z-10 flex size-5 -translate-x-1/2 -translate-y-1/2 cursor-grab items-center justify-center",
        "rounded-full bg-white shadow-glow-knob",
        "transition-transform duration-(--duration-fast) active:scale-90 active:cursor-grabbing",
      ].join(" ")}
      style={{ left: `${pct}%` }}
    >
      <span className="size-1.5 rounded-full bg-accent" />
    </span>
  );
}

/**
 * ORBA slider — coral fill, white glow knob, drag or arrow keys.
 * Pass two values for a range slider.
 */
export function Slider({
  label,
  min = 0,
  max = 100,
  defaultValue = 66,
  defaultEnd,
  ticks = 0,
  onValueChange,
}: {
  label: string;
  min?: number;
  max?: number;
  defaultValue?: number;
  /** Providing an end value turns this into a range slider. */
  defaultEnd?: number;
  ticks?: number;
  onValueChange?: (start: number, end?: number) => void;
}) {
  const [start, setStart] = useState(defaultValue);
  const [end, setEnd] = useState(defaultEnd);
  const track = useRef<HTMLDivElement>(null);
  const isRange = end !== undefined;

  const valueFromPointer = useCallback(
    (clientX: number) => {
      const rect = track.current?.getBoundingClientRect();
      if (!rect) return min;
      return Math.round(min + clamp((clientX - rect.left) / rect.width, 0, 1) * (max - min));
    },
    [min, max],
  );

  const update = useCallback(
    (v: number, which: "start" | "end") => {
      if (which === "start") {
        const next = isRange && end !== undefined ? Math.min(v, end) : v;
        setStart(next);
        onValueChange?.(next, end);
      } else {
        const next = Math.max(v, start);
        setEnd(next);
        onValueChange?.(start, next);
      }
    },
    [isRange, end, start, onValueChange],
  );

  const handlePointer = (e: React.PointerEvent) => {
    const v = valueFromPointer(e.clientX);
    // Drag whichever thumb is closer.
    const which =
      isRange && end !== undefined && Math.abs(v - end) < Math.abs(v - start)
        ? "end"
        : "start";
    update(v, which);
    const move = (ev: PointerEvent) => update(valueFromPointer(ev.clientX), which);
    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };

  const startPct = ((start - min) / (max - min)) * 100;
  const endPct = end !== undefined ? ((end - min) / (max - min)) * 100 : startPct;

  return (
    <div
      ref={track}
      onPointerDown={handlePointer}
      className="relative h-11 w-full cursor-pointer touch-none"
    >
      <div className="absolute top-1/2 h-1 w-full -translate-y-1/2 rounded-full bg-alpha-white-8">
        <div
          className="shadow-glow-accent-soft absolute top-0 h-full rounded-full bg-accent"
          style={{
            left: isRange ? `${startPct}%` : 0,
            width: isRange ? `${endPct - startPct}%` : `${startPct}%`,
          }}
        />
        {ticks > 0 && (
          <div aria-hidden className="absolute inset-0 flex items-center justify-between px-0.5">
            {Array.from({ length: ticks }, (_, i) => (
              <span key={i} className="h-1.5 w-0.5 bg-alpha-white-10" />
            ))}
          </div>
        )}
      </div>
      <Thumb
        value={start}
        min={min}
        max={isRange && end !== undefined ? end : max}
        label={isRange ? `${label} (start)` : label}
        onChange={(v) => update(v, "start")}
      />
      {isRange && end !== undefined && (
        <Thumb
          value={end}
          min={start}
          max={max}
          label={`${label} (end)`}
          onChange={(v) => update(v, "end")}
        />
      )}
    </div>
  );
}
