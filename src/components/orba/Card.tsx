import type { HTMLAttributes, ReactNode } from "react";

/**
 * ORBA card — the glass surface everything lives on.
 * standard = 16px radius workhorse · feature = 32px radius hero surface.
 * `interactive` adds the hover-lift (spring, -8px, floating shadow).
 */
export function Card({
  size = "standard",
  interactive = false,
  className = "",
  children,
  ...rest
}: {
  size?: "standard" | "feature";
  interactive?: boolean;
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={[
        "glass relative overflow-hidden",
        size === "feature" ? "rounded-2xl p-8" : "rounded-lg p-6",
        interactive
          ? "shadow-raised transition-all duration-(--duration-slow) ease-(--ease-spring) hover:-translate-y-2 hover:scale-[1.01] hover:border-border-strong hover:shadow-floating"
          : "",
        className,
      ].join(" ")}
      {...rest}
    >
      {children}
    </div>
  );
}

/** The overline header row every reference card opens with. */
export function CardHeader({
  title,
  icon,
  muted = true,
}: {
  title: string;
  icon?: ReactNode;
  muted?: boolean;
}) {
  return (
    <div
      className={`relative z-10 flex w-full items-center justify-between ${muted ? "text-fg-muted" : "text-fg-secondary"}`}
    >
      <span className="overline-label">{title}</span>
      {icon}
    </div>
  );
}
