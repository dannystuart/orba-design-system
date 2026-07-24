export function Specimen({
  label,
  caption,
  variant = "glass",
  padded = true,
  className = "",
  children,
}: {
  label?: string;
  caption?: string;
  /** glass = frosted panel; plain = borderless well on the void */
  variant?: "glass" | "plain";
  padded?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <figure className="my-8">
      {label && (
        <figcaption className="overline-label mb-3 text-fg-muted">
          {label}
        </figcaption>
      )}
      <div
        className={[
          variant === "glass"
            ? "glass rounded-lg"
            : "rounded-lg bg-surface-sunken",
          padded ? "p-6 sm:p-8" : "",
          className,
        ].join(" ")}
      >
        {children}
      </div>
      {caption && (
        <p className="mt-3 text-caption text-fg-muted">{caption}</p>
      )}
    </figure>
  );
}

export function SpecimenGrid({
  children,
  cols = 2,
}: {
  children: React.ReactNode;
  cols?: 2 | 3 | 4;
}) {
  const colClass = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
  }[cols];
  return <div className={`grid grid-cols-1 gap-4 ${colClass}`}>{children}</div>;
}
