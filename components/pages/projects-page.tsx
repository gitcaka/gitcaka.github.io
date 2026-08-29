'use client';

import { additionalProjects, featuredProjects } from '@/content/projects';
import { PageHero } from '@/components/page-hero';
import { ProjectCard } from '@/components/project-card';
import { SectionHeading } from '@/components/section-heading';
import { useSite } from '@/components/site-context';

export function ProjectsPage() {
  const { t } = useSite();
  return (
    <main id="top" className="page-main">
      <div className="content-width">
        <PageHero
          index="02"
          title={t.page.projectsTitle}
          description={t.page.projectsIntro}
          aside={
            <div className="metric-aside">
              <strong>{featuredProjects.length}</strong>
              <span>
                SELECTED
                <br />
                PROJECTS
              </span>
            </div>
          }
        />
        <div className="project-list-grid">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} large={index < 2} />
          ))}
        </div>
        {additionalProjects.length > 0 && (
          <section className="additional-work">
            <SectionHeading
              kicker="ADDITIONAL WORK"
              title={t.page.additional}
            />
            <div className="project-list-grid additional-grid">
              {additionalProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
