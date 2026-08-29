'use client';

import Link from 'next/link';
import { ArrowLeft, ExternalLink, Image as ImageIcon } from 'lucide-react';
import type { Project } from '@/content/types';
import { localize } from '@/lib/content';
import { useSite } from '@/components/site-context';

export function ProjectDetailPage({ project }: { project: Project }) {
  const { language, t } = useSite();
  const sections = [
    ['01', t.detail.background, project.details.problem],
    ['02', t.detail.route, project.details.route],
    ['03', t.detail.system, project.details.system],
    ['04', t.detail.implementation, project.details.implementation],
    ['05', t.detail.result, project.details.result],
    ['06', t.detail.challenge, project.details.challenge],
    ['07', t.detail.solution, project.details.solution],
    ['08', t.detail.current, project.details.current],
  ] as const;
  const links = [
    project.repository && ['Code', project.repository],
    project.demo && ['Demo', project.demo],
    project.paper && ['Paper', project.paper],
  ].filter(Boolean) as [string, string][];
  return (
    <main id="top" className="project-detail page-main">
      <div className="content-width">
        <Link className="back-link" href="/projects">
          <ArrowLeft />
          {t.common.backProjects}
        </Link>
        <section className="project-detail-hero">
          <div className="project-detail-copy">
            <div className="project-meta">
              <span>{localize(project.category, language)}</span>
              <span className="status-dot">
                {localize(project.status, language)}
              </span>
              {project.period && (
                <span>{localize(project.period, language)}</span>
              )}
            </div>
            <h1>{localize(project.title, language)}</h1>
            <p>{localize(project.summary, language)}</p>
            <div className="tag-list">
              {project.technologies.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
          <div className="detail-media-placeholder">
            <div className="cover-grid" />
            <div className="cover-route" />
            <ImageIcon />
            <span>{t.common.imagePending}</span>
          </div>
        </section>
        <section className="detail-role">
          <span>{t.detail.role}</span>
          <p>{localize(project.role, language)}</p>
        </section>
        <div className="detail-sections">
          {sections.map(([index, title, content]) => (
            <article key={index}>
              <span>{index}</span>
              <div>
                <h2>{title}</h2>
                <p>{localize(content, language)}</p>
                {title === t.detail.system && (
                  <div className="system-flow">
                    {localize(content, language)
                      .split(' → ')
                      .map((part, i, all) => (
                        <span key={part}>
                          <i>{part}</i>
                          {i < all.length - 1 && <b>→</b>}
                        </span>
                      ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
        <section className="detail-bottom">
          <div>
            <h2>{t.detail.tech}</h2>
            <div className="tag-list">
              {project.technologies.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </div>
          <div>
            <h2>{t.detail.links}</h2>
            {links.length ? (
              <div className="real-links">
                {links.map(([label, url]) => (
                  <a href={url} key={label} target="_blank" rel="noreferrer">
                    {label}
                    <ExternalLink />
                  </a>
                ))}
              </div>
            ) : (
              <p>{t.common.noLinks}</p>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
