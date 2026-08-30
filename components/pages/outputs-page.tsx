'use client';

import { Award, BookOpen, FileCode2, FlaskConical, Layers3 } from 'lucide-react';
import { outputs } from '@/content/outputs';
import { localize } from '@/lib/content';
import { PageHero } from '@/components/page-hero';
import { useSite } from '@/components/site-context';

const icons = {
  publication: BookOpen,
  research: FlaskConical,
  software: FileCode2,
  award: Award,
  report: Layers3,
};
export function OutputsPage() {
  const { language, t } = useSite();
  return (
    <main id="top" className="page-main">
      <div className="content-width">
        <PageHero
          index="04"
          title={t.page.outputsTitle}
          description={t.page.outputsIntro}
        />
        <div className="outputs-list">
          {outputs.map((output) => {
            const Icon = icons[output.type];
            return (
              <article key={output.id}>
                <span className="output-icon">
                  <Icon />
                </span>
                <div className="output-main">
                  <div>
                    <span>{output.type.toUpperCase()}</span>
                    <span className="status-dot">
                      {localize(output.status, language)}
                    </span>
                  </div>
                  <h2>{localize(output.title, language)}</h2>
                  <p>{localize(output.summary, language)}</p>
                  <small>{localize(output.area, language)}</small>
                </div>
                {output.year && <strong>{output.year}</strong>}
              </article>
            );
          })}
        </div>
      </div>
    </main>
  );
}
