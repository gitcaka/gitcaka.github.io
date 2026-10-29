'use client';

import { ArrowUpRight, Cpu } from 'lucide-react';
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
      <div className="project-evidence-cover">
        <div>
          <Cpu size={22} />
          <span>
            {project.technologies[0]} / {project.technologies[1]}
          </span>
        </div>
        <strong>{project.highlights[language][0]}</strong>
        <small>{project.highlights[language][1]}</small>
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
