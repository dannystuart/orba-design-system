import Link from "next/link";

export function Wordmark() {
  return (
    <Link
      href="/"
      className="group flex items-center gap-3 rounded-md focus-visible:outline-offset-4"
    >
      <span
        aria-hidden
        className="size-6 shrink-0 rounded-full shadow-glow-accent-soft transition-shadow duration-300 group-hover:shadow-glow-accent-strong"
        style={{
          background:
            "radial-gradient(circle at 32% 28%, var(--color-night-200) 0%, var(--color-night-700) 42%, var(--color-night-950) 78%), var(--color-night-950)",
          boxShadow:
            "inset 0 -6px 10px color-mix(in srgb, var(--color-accent) 55%, transparent), var(--shadow-glow-accent-soft)",
        }}
      />
      <span className="text-sm font-light tracking-[0.42em] text-fg">
        ORBA
      </span>
    </Link>
  );
}
