"use client";

import type { InputHTMLAttributes } from "react";
import { useId } from "react";
import { Check } from "@phosphor-icons/react/dist/ssr";

type ControlProps = { label: string } & InputHTMLAttributes<HTMLInputElement>;

/** Custom-drawn checkbox over a real, keyboard-accessible input. */
export function Checkbox({ label, id: idProp, className = "", ...rest }: ControlProps) {
  const autoId = useId();
  const id = idProp ?? autoId;
  return (
    <label
      htmlFor={id}
      className={`group flex min-h-11 cursor-pointer items-center gap-3 ${className}`}
    >
      <span className="relative flex size-5 items-center justify-center">
        <input
          type="checkbox"
          id={id}
          className="peer absolute inset-0 size-full cursor-pointer opacity-0"
          {...rest}
        />
        <span
          aria-hidden
          className={[
            "flex size-5 items-center justify-center rounded-sm border transition-all duration-(--duration-fast)",
            "border-border-strong bg-surface-sunken group-hover:border-night-400",
            "peer-checked:border-accent peer-checked:bg-accent peer-checked:shadow-glow-accent-soft",
            "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ring",
            "peer-disabled:opacity-40",
          ].join(" ")}
        >
          <Check
            size={12}
            weight="bold"
            className="text-fg-on-accent opacity-0 transition-opacity duration-(--duration-fast) [input:checked~span_&]:opacity-100"
          />
        </span>
      </span>
      <span className="text-body-sm text-fg-secondary group-hover:text-fg">{label}</span>
    </label>
  );
}

/** Custom-drawn radio over a real input. */
export function Radio({ label, id: idProp, className = "", ...rest }: ControlProps) {
  const autoId = useId();
  const id = idProp ?? autoId;
  return (
    <label
      htmlFor={id}
      className={`group flex min-h-11 cursor-pointer items-center gap-3 ${className}`}
    >
      <span className="relative flex size-5 items-center justify-center">
        <input
          type="radio"
          id={id}
          className="peer absolute inset-0 size-full cursor-pointer opacity-0"
          {...rest}
        />
        <span
          aria-hidden
          className={[
            "flex size-5 items-center justify-center rounded-full border transition-all duration-(--duration-fast)",
            "border-border-strong bg-surface-sunken group-hover:border-night-400",
            "peer-checked:border-accent peer-checked:shadow-glow-accent-soft",
            "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ring",
            "peer-disabled:opacity-40",
          ].join(" ")}
        >
          <span className="size-2.5 scale-0 rounded-full bg-accent transition-transform duration-(--duration-fast) [input:checked~span_&]:scale-100" />
        </span>
      </span>
      <span className="text-body-sm text-fg-secondary group-hover:text-fg">{label}</span>
    </label>
  );
}

/** Toggle switch — the sheet's Off/On control. */
export function Toggle({ label, id: idProp, className = "", ...rest }: ControlProps) {
  const autoId = useId();
  const id = idProp ?? autoId;
  return (
    <label
      htmlFor={id}
      className={`group flex min-h-11 cursor-pointer items-center gap-3 ${className}`}
    >
      <span className="relative inline-flex h-7 w-12 shrink-0">
        <input
          type="checkbox"
          role="switch"
          id={id}
          className="peer absolute inset-0 size-full cursor-pointer opacity-0"
          {...rest}
        />
        <span
          aria-hidden
          className={[
            "absolute inset-0 rounded-pill border transition-colors duration-(--duration-base)",
            "border-border-default bg-surface-sunken",
            "peer-checked:border-accent/40 peer-checked:bg-accent/25",
            "peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-ring",
            "peer-disabled:opacity-40",
          ].join(" ")}
        />
        <span
          aria-hidden
          className={[
            "absolute top-1 left-1 size-5 rounded-full bg-night-300 transition-all duration-(--duration-base) ease-(--ease-spring)",
            "[input:checked~&]:translate-x-5 [input:checked~&]:bg-accent [input:checked~&]:shadow-glow-accent-soft",
          ].join(" ")}
        />
      </span>
      <span className="text-body-sm text-fg-secondary group-hover:text-fg">{label}</span>
    </label>
  );
}
