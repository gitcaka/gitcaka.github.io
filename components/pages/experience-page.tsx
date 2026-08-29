'use client';

import { experience } from '@/content/experience';
import { localize } from '@/lib/content';
import { PageHero } from '@/components/page-hero';
import { useSite } from '@/components/site-context';

export function ExperiencePage() {
  const { language, t } = useSite();
  return (
    <main id="top" className="page-main">
      <div className="content-width">
        <PageHero
          index="03"
          title={t.page.experienceTitle}
          description={t.page.experienceIntro}
        />
        <div className="timeline">
          {experience.map((item, index) => (
            <article key={item.id}>
              <div className="timeline-rail">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <i />
              </div>
              <div className="timeline-period">
                {localize(item.period, language)}
              </div>
              <div className="timeline-content">
                <span>{localize(item.type, language)}</span>
                <h2>{localize(item.title, language)}</h2>
                <p>{localize(item.summary, language)}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
