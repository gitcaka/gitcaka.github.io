'use client';

import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  Braces,
  BriefcaseBusiness,
  CheckCircle2,
  Eye,
  FlaskConical,
  Layers3,
  Wrench,
} from 'lucide-react';
import { profile } from '@/content/profile';
import { featuredProjects } from '@/content/projects';
import { skillGroups } from '@/content/skills';
import { localize } from '@/lib/content';
import { ProjectCard } from '@/components/project-card';
import { ResearchScene } from '@/components/research-scene';
import { SectionHeading } from '@/components/section-heading';
import { useSite } from '@/components/site-context';

const stageIcons = [Eye, Braces, CheckCircle2];

export function HomePage() {
  const { language, t } = useSite();
  const heroLines =
    language === 'zh'
      ? ['面向自动驾驶，', '把感知算法', '做成可验证系统。']
      : [
          'Building perception',
          'for autonomous driving',
          'into validated systems.',
        ];
  return (
    <main id="top">
      <section className="home-hero content-width">
        <div className="hero-copy">
          <div className="eyebrow">
            <span /> OPEN TO AUTONOMOUS DRIVING &amp; ROBOTICS ROLES
          </div>
          <div className="career-badge">
            <BriefcaseBusiness />
            {language === 'zh' ? '求职中 · 2026' : 'OPEN TO WORK · 2026'}
          </div>
          <p className="role">{localize(profile.role, language)}</p>
          <h1>
            {heroLines.map((line, index) => (
              <span key={line} className={index === 1 ? 'hero-accent' : ''}>
                {line}
                <br />
              </span>
            ))}
          </h1>
          <p className="intro">{localize(profile.bio, language)}</p>
          <div className="hero-cta">
            <Link className="primary-button" href="/projects">
              {t.common.viewProjects}
              <ArrowUpRight />
            </Link>
            <Link className="text-button" href="/contact">
              {language === 'zh' ? '联系我' : 'Contact Me'}
              <ArrowRight />
            </Link>
          </div>
          <div className="topic-row">
            {(language === 'zh'
              ? [
                  '协同感知',
                  '多模态推理',
                  'CARLA 闭环评测',
                  '视觉目标检测',
                  'ROS 与机器人',
                ]
              : [
                  'Cooperative Perception',
                  'Multimodal Reasoning',
                  'CARLA Closed-Loop Evaluation',
                  'Visual Object Detection',
                  'ROS & Robotics',
                ]
            ).map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
        <ResearchScene />
      </section>

      <section className="current-research section-pad section-grid-bg">
        <div className="content-width current-grid">
          <div>
            <SectionHeading
              kicker={t.home.researchKicker}
              title={t.home.researchTitle}
            />
            <span className="ongoing-badge">
              <i />
              {language === 'zh' ? '可随时沟通' : 'AVAILABLE TO CONNECT'}
            </span>
          </div>
          <div className="current-card">
            <span className="card-number">FIT / 01</span>
            <h2>
              {language === 'zh'
                ? '从视觉算法到闭环系统验证'
                : 'From Vision Algorithms to Closed-Loop Validation'}
            </h2>
            <p>{t.home.researchSummary}</p>
            <div className="evidence-row">
              <span>
                <FlaskConical />
                {language === 'zh'
                  ? '2 篇 SCI 论文'
                  : '2 SCI Papers'}
              </span>
              <span>
                <Layers3 />
                {language === 'zh' ? '10 次多随机种子复现' : '10 Multi-Seed Reproductions'}
              </span>
              <span>
                <CheckCircle2 />
                {language === 'zh' ? '20 次机器人闭环测试' : '20 Robotic Closed-Loop Tests'}
              </span>
            </div>
            <Link href="/projects">
              {language === 'zh' ? '查看项目证据' : 'View Project Evidence'}
              <ArrowUpRight />
            </Link>
          </div>
        </div>
      </section>

      <section className="section-pad content-width">
        <SectionHeading
          kicker="UNDERSTAND · BUILD · VALIDATE"
          title={t.home.methodTitle}
          description={t.home.methodSubtitle}
        />
        <div className="method-stages">
          {t.home.stages.map((stage, index) => {
            const Icon = stageIcons[index];
            return (
              <article key={stage.title}>
                <span className="stage-index">0{index + 1}</span>
                <Icon />
                <h3>{stage.title}</h3>
                <p>{stage.body}</p>
                {index < t.home.stages.length - 1 && (
                  <span className="stage-connector" />
                )}
              </article>
            );
          })}
        </div>
      </section>

      <section className="section-pad projects-home section-grid-bg">
        <div className="content-width">
          <div className="section-heading-row">
            <SectionHeading
              kicker="SELECTED WORK"
              title={t.home.projectsTitle}
              description={t.home.projectsSubtitle}
            />
            <Link href="/projects">
              {t.nav.projects}
              <ArrowRight />
            </Link>
          </div>
          <div className="featured-grid">
            {featuredProjects.slice(0, 3).map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                large={index === 0}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad content-width">
        <SectionHeading
          kicker="ALGORITHMS · SYSTEMS · ENGINEERING"
          title={t.home.skillsTitle}
          description={t.common.usedInWork}
        />
        <div className="skill-groups">
          {skillGroups.map((group, index) => {
            const Icon = [FlaskConical, Layers3, Wrench][index];
            return (
              <article key={group.key}>
                <span className="skill-icon">
                  <Icon />
                </span>
                <h3>{localize(group.title, language)}</h3>
                <div>
                  {group.items.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="closing-band">
        <div className="content-width">
          <div>
            <small>PERCEPTION → REASONING → ACTION</small>
            <h2>{t.home.closing}</h2>
          </div>
          <Link href="/about">
            {t.nav.about}
            <ArrowUpRight />
          </Link>
        </div>
      </section>
    </main>
  );
}
