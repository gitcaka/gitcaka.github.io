'use client';

import { ArrowUpRight, Image as ImageIcon } from 'lucide-react';
import type { Project } from '@/content/types';
import { localize } from '@/lib/content';
import { useSite } from './site-context';
import { FullPageLink } from './full-page-link';

export function ProjectCard({
  project,
  large = false,
}: {
  project: Project;
  large?: boolean;
}) {
  const { language, t } = useSite();
  return (
    <article className={`project-card ${large ? 'project-card-large' : ''}`}>
      <div className="project-cover" aria-label={t.common.imagePending}>
        <div className="cover-grid" />
        <div className="cover-route" />
        <span className="cover-node node-a" />
        <span className="cover-node node-b" />
        <span className="cover-car car-a" />
        <span className="cover-car car-b" />
        <div className="cover-empty">
          <ImageIcon />
          <span>{t.common.imagePending}</span>
        </div>
        <span className="project-index">
          {String((Number(project.id.length * 7) % 90) + 10).padStart(2, '0')}
        </span>
      </div>
      <div className="project-card-body">
        <div className="project-meta">
          <span>{localize(project.category, language)}</span>
          <span className="status-dot">
            {localize(project.status, language)}
          </span>
          {project.period && <span>{localize(project.period, language)}</span>}
        </div>
        <h3>{localize(project.title, language)}</h3>
        <p>{localize(project.summary, language)}</p>
        <div className="tag-list">
          {project.technologies.slice(0, large ? 5 : 4).map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
        <FullPageLink
          className="project-link"
          href={`/projects/${project.slug}`}
        >
          {t.common.learnMore}
          <ArrowUpRight />
        </FullPageLink>
      </div>
    </article>
  );
}
