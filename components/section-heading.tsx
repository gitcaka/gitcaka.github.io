export function SectionHeading({
  kicker,
  title,
  description,
  align = 'left',
}: {
  kicker?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
}) {
  return (
    <div
      className={`section-heading ${align === 'center' ? 'section-heading-center' : ''}`}
    >
      {kicker && (
        <span className="section-kicker">
          <i />
          {kicker}
        </span>
      )}
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}
