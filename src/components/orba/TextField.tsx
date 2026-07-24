"use client";

import type { InputHTMLAttributes, ReactNode } from "react";
import { useId } from "react";

/**
 * ORBA text field. Focus draws the coral hairline + soft glow (the "active"
 * state on the components sheet); error swaps the hairline to danger.
 */
export function TextField({
  label,
  helper,
  error,
  icon,
  className = "",
  id: idProp,
  disabled,
  ...rest
}: {
  label: string;
  helper?: string;
  error?: string;
  icon?: ReactNode;
  className?: string;
} & InputHTMLAttributes<HTMLInputElement>) {
  const autoId = useId();
  const id = idProp ?? autoId;
  const describedBy = error ? `${id}-error` : helper ? `${id}-helper` : undefined;

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label htmlFor={id} className="text-body-sm text-fg-secondary">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <span
            aria-hidden
            className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-fg-muted"
          >
            {icon}
          </span>
        )}
        <input
          id={id}
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={[
            "h-12 w-full rounded-md border bg-surface-sunken px-4 text-body-sm text-fg",
            "placeholder:text-fg-muted",
            "transition-colors duration-(--duration-fast)",
            "focus:outline-none",
            icon ? "pl-11" : "",
            error
              ? "border-danger-400/60 focus:border-danger-400 focus:shadow-[0_0_20px_rgba(248,113,113,0.15)]"
              : "border-border-default hover:border-border-strong focus:border-accent/60 focus:shadow-glow-accent-soft",
            "disabled:pointer-events-none disabled:opacity-40",
          ].join(" ")}
          {...rest}
        />
      </div>
      {error ? (
        <p id={`${id}-error`} className="text-caption text-danger-400">
          {error}
        </p>
      ) : helper ? (
        <p id={`${id}-helper`} className="text-caption text-fg-muted">
          {helper}
        </p>
      ) : null}
    </div>
  );
}
