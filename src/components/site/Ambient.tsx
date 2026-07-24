/** Fixed void backdrop: a whisper of coral top-right, ice-blue bottom-left. */
export function Ambient() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10"
      style={{
        background: [
          "radial-gradient(ellipse 75% 55% at 88% -8%, color-mix(in srgb, var(--color-accent) 7%, transparent), transparent 62%)",
          "radial-gradient(ellipse 65% 50% at 8% 108%, color-mix(in srgb, var(--color-night-200) 5%, transparent), transparent 60%)",
        ].join(", "),
      }}
    />
  );
}
