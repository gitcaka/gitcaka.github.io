import type { ReactNode } from 'react';
export function PageHero({
  index,
  title,
  description,
  aside,
}: {
  index: string;
  title: string;
  description: string;
  aside?: ReactNode;
}) {
  return (
    <section className="page-hero">
      <div className="page-hero-copy">
        <span>{index} / RESEARCH PORTFOLIO</span>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {aside && <div className="page-hero-aside">{aside}</div>}
    </section>
  );
}
