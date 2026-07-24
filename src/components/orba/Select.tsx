"use client";

import { CaretDown, Check } from "@phosphor-icons/react/dist/ssr";
import { useEffect, useId, useRef, useState } from "react";

/**
 * ORBA select — a listbox-pattern dropdown (keyboard: arrows, Enter, Escape).
 */
export function Select({
  label,
  options,
  placeholder = "Select an option",
  defaultValue,
  className = "",
}: {
  label: string;
  options: string[];
  placeholder?: string;
  defaultValue?: string;
  className?: string;
}) {
  const id = useId();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string | undefined>(defaultValue);
  const [activeIndex, setActiveIndex] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("pointerdown", close);
    return () => window.removeEventListener("pointerdown", close);
  }, [open]);

  const choose = (opt: string) => {
    setValue(opt);
    setOpen(false);
  };

  return (
    <div ref={rootRef} className={`relative flex flex-col gap-2 ${className}`}>
      <span id={`${id}-label`} className="text-body-sm text-fg-secondary">
        {label}
      </span>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby={`${id}-label`}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={(e) => {
          if (!open) return;
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setActiveIndex((i) => Math.min(i + 1, options.length - 1));
          } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setActiveIndex((i) => Math.max(i - 1, 0));
          } else if (e.key === "Enter") {
            e.preventDefault();
            choose(options[activeIndex]);
          } else if (e.key === "Escape") {
            setOpen(false);
          }
        }}
        className={[
          "flex h-12 w-full items-center justify-between rounded-md border bg-surface-sunken px-4 text-left text-body-sm",
          "transition-colors duration-(--duration-fast)",
          open
            ? "border-accent/60 shadow-glow-accent-soft"
            : "border-border-default hover:border-border-strong",
          value ? "text-fg" : "text-fg-muted",
        ].join(" ")}
      >
        {value ?? placeholder}
        <CaretDown
          size={16}
          weight="light"
          className={`text-fg-muted transition-transform duration-(--duration-base) ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <ul
          role="listbox"
          aria-labelledby={`${id}-label`}
          className="animate-fade-up glass absolute top-full z-20 mt-2 w-full overflow-hidden rounded-md py-1 shadow-floating"
          style={{ animationDuration: "var(--duration-fast)" }}
        >
          {options.map((opt, i) => (
            <li key={opt} role="option" aria-selected={value === opt}>
              <button
                type="button"
                tabIndex={-1}
                onClick={() => choose(opt)}
                onPointerEnter={() => setActiveIndex(i)}
                className={[
                  "flex w-full items-center justify-between px-4 py-2.5 text-left text-body-sm transition-colors duration-(--duration-fast)",
                  i === activeIndex ? "bg-alpha-white-5 text-fg" : "text-fg-secondary",
                ].join(" ")}
              >
                {opt}
                {value === opt && <Check size={14} weight="bold" className="text-accent" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
