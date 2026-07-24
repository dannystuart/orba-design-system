"use client";

import { useState } from "react";

/**
 * ORBA segmented control (Day / Week / Month / Year on the sheet).
 * The selected pill glows coral; the rest stay quiet.
 */
export function SegmentedControl({
  options,
  defaultValue,
  label,
  onChange,
}: {
  options: string[];
  defaultValue?: string;
  label: string;
  onChange?: (value: string) => void;
}) {
  const [value, setValue] = useState(defaultValue ?? options[0]);
  return (
    <div
      role="radiogroup"
      aria-label={label}
      className="inline-flex rounded-pill border border-border-subtle bg-surface-sunken p-1"
    >
      {options.map((opt) => {
        const selected = value === opt;
        return (
          <button
            key={opt}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => {
              setValue(opt);
              onChange?.(opt);
            }}
            className={[
              "min-h-9 rounded-pill px-4 text-body-sm transition-all duration-(--duration-base)",
              selected
                ? "shadow-glow-accent-soft bg-accent font-medium text-fg-on-accent"
                : "text-fg-muted hover:text-fg",
            ].join(" ")}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}
