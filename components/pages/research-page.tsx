'use client';

import { CheckCircle2, FlaskConical } from 'lucide-react';
import { researchAreas } from '@/content/research';
import { localize } from '@/lib/content';
import { PageHero } from '@/components/page-hero';
import { ResearchPipeline } from '@/components/research-pipeline';
import { useSite } from '@/components/site-context';

export function ResearchPage() {
  const { language, t } = useSite();
  return (
    <main id="top" className="page-main">
      <div className="content-width">
        <PageHero
          index="01"
          title={t.page.researchTitle}
          description={t.page.researchIntro}
          aside={
            <div className="coordinate-aside">
              <span>Y</span>
              <i />
              <strong>V2X</strong>
              <i />
              <span>X</span>
            </div>
          }
        />
        <ResearchPipeline />
        <div className="research-area-grid">
          {researchAreas.map((area) => (
            <article key={area.id} className="research-area-card">
              <div className="area-top">
                <span>{area.index}</span>
                <span className={`research-status ${area.status}`}>
                  {area.status === 'active' ? (
                    <CheckCircle2 />
                  ) : (
                    <FlaskConical />
                  )}
                  {area.status === 'active'
                    ? language === 'zh'
                      ? '核心能力'
                      : 'Core'
                    : language === 'zh'
                      ? '探索中'
                      : 'Exploring'}
                </span>
              </div>
              <h2>{localize(area.title, language)}</h2>
              <p>{localize(area.summary, language)}</p>
              <ul>
                {area.topics.map((topic) => (
                  <li key={topic.en}>{localize(topic, language)}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <section className="research-principle">
          <span>ENGINEERING PRINCIPLE</span>
          <blockquote>
            {language === 'zh'
              ? '算法价值不仅写在模型结构里，也要体现在可复现指标、闭环行为和真实系统的稳定运行中。'
              : 'Algorithmic value should appear not only in model architecture, but also in reproducible metrics, closed-loop behavior, and stable system operation.'}
          </blockquote>
        </section>
      </div>
    </main>
  );
}
