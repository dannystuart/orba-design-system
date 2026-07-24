"use client";

import { useEffect, useState } from "react";
import { breakpoints } from "@/lib/tokens";

const ordered = [...breakpoints].sort((a, b) => parseInt(a.value) - parseInt(b.value));

function current(width: number): string {
  let name = "base";
  for (const bp of ordered) {
    if (width >= parseInt(bp.value)) name = bp.name;
  }
  return name;
}

export function BreakpointIndicator() {
  const [state, setState] = useState<{ name: string; width: number } | null>(null);

  useEffect(() => {
    const update = () =>
      setState({ name: current(window.innerWidth), width: window.innerWidth });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div className="flex flex-wrap items-center gap-3">
      {["base", ...ordered.map((b) => b.name)].map((name) => {
        const active = state?.name === name;
        return (
          <span
            key={name}
            className={[
              "rounded-full border px-4 py-1.5 text-caption transition-colors duration-300",
              active
                ? "shadow-glow-accent-soft border-accent/40 bg-accent-subtle text-accent"
                : "border-border-subtle text-fg-muted",
            ].join(" ")}
          >
            {name}
            {name !== "base" && (
              <span className="ml-1.5 opacity-60">
                ≥{ordered.find((b) => b.name === name)?.value}
              </span>
            )}
          </span>
        );
      })}
      <span className="ml-auto font-mono text-caption text-fg-muted">
        {state ? `${state.width}px` : "measuring…"}
      </span>
    </div>
  );
}
