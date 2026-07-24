export function PageHeader({
  overline,
  title,
  lead,
}: {
  overline: string;
  title: string;
  lead?: string;
}) {
  return (
    <header className="mb-14">
      <p className="overline-label mb-4 text-accent">{overline}</p>
      <h1 className="text-heading-1 text-fg">{title}</h1>
      {lead && (
        <p className="mt-5 max-w-2xl text-body-lg font-light text-fg-secondary">
          {lead}
        </p>
      )}
    </header>
  );
}
