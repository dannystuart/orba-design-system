/**
 * The ORBA wave equalizer — coral bars breathing on the wave-dance loop,
 * staggered 50ms per bar. Used by the Audio Engine card and the motion library.
 */
const DEFAULT_HEIGHTS = [
  25, 50, 75, 66, 100, 80, 60, 50, 66, 33, 50, 75, 83, 60, 25, 33, 50, 66, 80,
  100, 75, 50, 25, 20,
];

export function WaveEqualizer({
  heights = DEFAULT_HEIGHTS,
  barWidth = 3,
  className = "h-24",
}: {
  heights?: number[];
  barWidth?: number;
  className?: string;
}) {
  return (
    <div aria-hidden className={`flex items-end justify-between gap-1 ${className}`}>
      {heights.map((h, i) => (
        <span
          key={i}
          className="animate-wave-dance origin-bottom rounded-full"
          style={{
            height: `${h}%`,
            width: barWidth,
            animationDelay: `${i * 50}ms`,
            background:
              "linear-gradient(to top, color-mix(in srgb, var(--color-accent) 20%, transparent), color-mix(in srgb, var(--color-accent) 80%, transparent))",
          }}
        />
      ))}
    </div>
  );
}
