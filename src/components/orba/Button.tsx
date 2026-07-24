import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "tertiary";
export type ButtonSize = "sm" | "md" | "lg";
export type ButtonState = "rest" | "hover" | "pressed";

/**
 * Class recipes per variant. `rest` includes the interactive pseudo-classes;
 * `hover`/`pressed` are the same visuals as plain classes so documentation can
 * freeze any state. This map is also the Figma variant contract for Chunk 6.
 */
const variantClasses: Record<ButtonVariant, Record<ButtonState, string>> = {
  primary: {
    rest: "bg-accent text-fg-on-accent shadow-glow-accent-soft hover:bg-accent-hover hover:shadow-glow-accent-strong active:bg-accent-pressed active:scale-[0.98] active:shadow-glow-accent-soft",
    hover: "bg-accent-hover text-fg-on-accent shadow-glow-accent-strong",
    pressed: "bg-accent-pressed text-fg-on-accent shadow-glow-accent-soft scale-[0.98]",
  },
  secondary: {
    rest: "border border-border-default text-fg hover:bg-alpha-white-5 hover:border-border-strong active:bg-alpha-white-3 active:scale-[0.98]",
    hover: "border border-border-strong bg-alpha-white-5 text-fg",
    pressed: "border border-border-default bg-alpha-white-3 text-fg scale-[0.98]",
  },
  tertiary: {
    rest: "text-fg-secondary underline decoration-border-strong underline-offset-8 hover:text-accent hover:decoration-accent/50 active:text-accent-pressed",
    hover: "text-accent underline decoration-accent/50 underline-offset-8",
    pressed: "text-accent-pressed underline decoration-accent/40 underline-offset-8",
  },
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 gap-1.5 px-4 text-body-sm",
  md: "h-11 gap-2 px-6 text-body-sm",
  lg: "h-12 gap-2.5 px-8 text-body",
};

function Spinner() {
  return (
    <span
      aria-hidden
      className="animate-slow-spin size-4 rounded-full border-2 border-current/25 border-t-current"
      style={{ animationDuration: "800ms" }}
    />
  );
}

export function Button({
  variant = "primary",
  size = "md",
  state = "rest",
  loading = false,
  className = "",
  children,
  disabled,
  ...rest
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Docs only: freeze the hover/pressed visual. Interactive uses stay on "rest". */
  state?: ButtonState;
  loading?: boolean;
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  const isDisabled = disabled || loading;
  return (
    <button
      type="button"
      disabled={isDisabled}
      aria-busy={loading || undefined}
      className={[
        "inline-flex items-center justify-center rounded-pill font-medium tracking-wide",
        "transition-all duration-(--duration-base) ease-(--ease-standard)",
        "disabled:pointer-events-none disabled:opacity-40",
        sizeClasses[size],
        variantClasses[variant][state],
        className,
      ].join(" ")}
      {...rest}
    >
      {loading && <Spinner />}
      {children}
    </button>
  );
}

export function IconButton({
  variant = "secondary",
  size = "md",
  label,
  className = "",
  children,
  ...rest
}: {
  variant?: "primary" | "secondary";
  size?: ButtonSize;
  /** Accessible name — icon buttons have no visible text. */
  label: string;
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  const sizes: Record<ButtonSize, string> = {
    sm: "size-9",
    md: "size-11",
    lg: "size-12",
  };
  return (
    <button
      type="button"
      aria-label={label}
      className={[
        "inline-flex items-center justify-center rounded-pill",
        "transition-all duration-(--duration-base) ease-(--ease-standard)",
        "disabled:pointer-events-none disabled:opacity-40",
        sizes[size],
        variant === "primary"
          ? variantClasses.primary.rest
          : variantClasses.secondary.rest,
        className,
      ].join(" ")}
      {...rest}
    >
      {children}
    </button>
  );
}
