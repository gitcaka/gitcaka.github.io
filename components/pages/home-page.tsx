'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  ArrowDown,
  ArrowUpRight,
  CodeXml as Github,
  Mail,
  FileText,
  Bot,
  Radar,
  Code2,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { PortfolioScene, type SceneTopic } from '@/components/portfolio-scene';
import { useSite } from '@/components/site-context';
import { FullPageLink } from '@/components/full-page-link';
import { portfolioWork, resumeUpdated, githubUrl } from '@/content/portfolio';
import { localize } from '@/lib/content';

export function HomePage() {
  const { language } = useSite();
  const zh = language === 'zh';
  const [selected, setSelected] = useState<SceneTopic>('robotics');
  const [filter, setFilter] = useState('all');
  const [copied, setCopied] = useState(false);
  const topics = {
    robotics: {
      icon: Bot,
      title: zh
        ? '让代码在真实世界行动。'
        : 'Code that moves in the real world.',
      body: zh
        ? '从 ROS 移动机械臂到 STM32 平衡小车，我把感知、控制与硬件连接成可运行的系统。'
        : 'From ROS manipulators to STM32 robots, I connect perception, control, and hardware into working systems.',
      metric: '20',
      metricLabel: zh ? '组机器人闭环测试' : 'robotic closed-loop test groups',
      url: '/projects/ros-mobile-manipulator-logistics',
    },
    perception: {
      icon: Radar,
      title: zh ? '看见更远，也理解更多。' : 'See farther. Understand more.',
      body: zh
        ? '探索低照度视觉、车路协同和多模态大模型，并在 CARLA 闭环中检验算法。'
        : 'Exploring low-light vision, cooperative perception, and multimodal models through CARLA closed-loop evaluation.',
      metric: '93.5%',
      metricLabel: zh ? 'DIONet · SAS mAP@50' : 'DIONet · SAS mAP@50',
      url: '/projects/dionet-low-light-detection',
    },
    engineering: {
      icon: Code2,
      title: zh ? '把想法做成可以体验的作品。' : 'Ideas you can actually try.',
      body: zh
        ? '从交通可视化到视频分析工作台，关注完整交互、工程实现和易用的界面。'
        : 'From traffic visualization to video workspaces, I build complete interactions and approachable interfaces.',
      metric: 'gitcaka',
      metricLabel: 'GitHub / Open source',
      url: githubUrl,
    },
  };
  const topic = topics[selected];
  const TopicIcon = topic.icon;
  const works = portfolioWork.filter(
    (work) => filter === 'all' || work.category === filter,
  );
  return (
    <main id="top" className="portfolio-home">
      <section className="portfolio-hero studio-width">
        <div className="portfolio-intro">
          <div className="intro-kicker">
            <span className="live-dot" />{' '}
            {zh
              ? '你好，欢迎来到我的数字空间'
              : 'HELLO, WELCOME TO MY DIGITAL SPACE'}
          </div>
          <h1>
            <span>WUKANG</span>
            <span className="outline-name">
              CAO<span className="name-dot">.</span>
            </span>
          </h1>
          <div className="name-caption">
            <strong>曹武康</strong>
            <span>BUILD. EXPLORE. VALIDATE.</span>
          </div>
          <p className="portfolio-tagline">
            {zh
              ? '感知世界，构建智能。'
              : 'Perceive the world. Build intelligence.'}
          </p>
          <p className="portfolio-description">
            {zh
              ? '重庆交通大学交通运输硕士生。热爱自动驾驶、机器人和把想法变成可交互作品的过程。'
              : 'Transportation master’s student at Chongqing Jiaotong University. Exploring autonomous driving, robotics, and turning ideas into interactive experiences.'}
          </p>
          <div className="portfolio-actions">
            <a className="studio-primary" href="#work">
              {zh ? '探索我的作品' : 'Explore my work'}
              <ArrowUpRight size={18} />
            </a>
            <FullPageLink className="studio-secondary" href="/resume">
              <FileText size={16} />
              {zh ? '查看简历' : 'View résumé'}
            </FullPageLink>
          </div>
          <div className="hero-footnote">
            <span className="tiny-orbit" />
            {zh
              ? '求职方向：自动驾驶感知 / 仿真评测 / 智能系统'
              : 'Open to perception, evaluation & intelligent systems roles'}
          </div>
        </div>
        <div className="portfolio-stage">
          <PortfolioScene selected={selected} onSelect={setSelected} />
          <fieldset className="scene-tabs">
            <legend className="sr-only">
              {zh ? '选择作品方向' : 'Select a portfolio area'}
            </legend>
            {(['robotics', 'perception', 'engineering'] as const).map(
              (key, index) => {
                const Icon = topics[key].icon;
                return (
                  <button
                    type="button"
                    key={key}
                    aria-pressed={selected === key}
                    onClick={() => setSelected(key)}
                  >
                    <span>0{index + 1}</span>
                    <Icon size={15} />
                    {zh
                      ? ['机器人工程', '自动驾驶', '软件作品'][index]
                      : ['Robotics', 'Perception', 'Software'][index]}
                  </button>
                );
              },
            )}
          </fieldset>
        </div>
      </section>

      <section className="selected-topic studio-width" aria-live="polite">
        <div className="topic-icon">
          <TopicIcon size={26} />
        </div>
        <div className="topic-copy">
          <small>
            {zh ? '正在探索' : 'NOW EXPLORING'} / {selected.toUpperCase()}
          </small>
          <h2>{topic.title}</h2>
          <p>{topic.body}</p>
        </div>
        <div className="topic-metric">
          <strong>{topic.metric}</strong>
          <span>{topic.metricLabel}</span>
        </div>
        <FullPageLink
          className="circle-link"
          href={topic.url}
          aria-label={zh ? '查看当前方向作品' : 'Explore the selected area'}
        >
          <ArrowUpRight size={24} />
        </FullPageLink>
      </section>
      <div className="tech-ribbon studio-width">
        <span>PYTORCH</span>
        <i />
        <span>CARLA</span>
        <i />
        <span>ROS</span>
        <i />
        <span>COMPUTER VISION</span>
        <i />
        <span>V2X</span>
        <i />
        <span>WEB ENGINEERING</span>
      </div>

      <section id="work" className="portfolio-work studio-width">
        <div className="portfolio-section-top">
          <div>
            <div className="intro-kicker">
              <span>01 / SELECTED WORK</span>
            </div>
            <h2>{zh ? '不止想法，还有作品。' : 'Ideas, made tangible.'}</h2>
            <p>
              {zh
                ? '一部分关于智能，一部分关于创造。欢迎亲自体验。'
                : 'Some about intelligence. Some about making things. Try them yourself.'}
            </p>
          </div>
          <a
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
            className="github-link"
          >
            <Github size={18} /> GitHub <ArrowUpRight size={17} />
          </a>
        </div>
        <fieldset className="work-filters">
          <legend className="sr-only">
            {zh ? '作品分类' : 'Project categories'}
          </legend>
          {[
            ['all', zh ? '全部作品' : 'All work'],
            ['web', zh ? '交通可视化' : 'Traffic & Web'],
            ['vision', zh ? '视觉应用' : 'Vision apps'],
          ].map(([key, label]) => (
            <button
              type="button"
              key={key}
              aria-pressed={filter === key}
              onClick={() => setFilter(key)}
            >
              {label}
            </button>
          ))}
          <FullPageLink href="/projects">
            {zh ? '科研与工程项目' : 'Research & engineering'}
            <ArrowRight size={15} />
          </FullPageLink>
        </fieldset>
        <div className="portfolio-work-grid">
          {works.map((work, index) => (
            <article
              className={`work-item work-accent-${work.accent}`}
              key={work.id}
            >
              <a
                className="work-preview"
                href={work.demo}
                target="_blank"
                rel="noreferrer"
                aria-label={`${localize(work.title, language)} · ${zh ? '打开演示' : 'Open demo'}`}
              >
                <Image
                  unoptimized
                  src={work.image}
                  alt={`${localize(work.title, language)} ${zh ? '界面预览' : 'interface preview'}`}
                  loading="lazy"
                  width={1280}
                  height={800}
                />
                <span className="work-open">
                  <ArrowUpRight size={24} />
                </span>
                <span className="work-number">0{index + 1}</span>
              </a>
              <div className="work-info">
                <small>{work.subtitle}</small>
                <h3>{localize(work.title, language)}</h3>
                <p>{localize(work.description, language)}</p>
                <div className="work-tags">
                  {work.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <div className="work-links">
                  <a href={work.demo} target="_blank" rel="noreferrer">
                    {zh ? '体验演示' : 'Try demo'}
                    <ArrowUpRight size={15} />
                  </a>
                  <a
                    href={`${githubUrl}/${work.repo}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Github size={15} />
                    {zh ? '源代码' : 'Source'}
                  </a>
                  <small>{zh ? '静态示例演示' : 'Static demo'}</small>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="portfolio-about studio-width" id="about">
        <div>
          <div className="intro-kicker">02 / THE PERSON BEHIND THE CODE</div>
          <h2>
            {zh ? (
              <>
                对未知保持好奇。
                <br />
                让结果经得起验证。
              </>
            ) : (
              <>
                Stay curious.
                <br />
                Make it verifiable.
              </>
            )}
          </h2>
          <p>
            {zh
              ? '我是曹武康，在重庆交通大学学习交通运输。我的工作横跨视觉感知、自动驾驶仿真、机器人工程与 Web 应用。我喜欢沿着“问题—代码—系统”的路径，直到一个想法真正运行起来。'
              : 'I’m Wukang Cao, a transportation master’s student at Chongqing Jiaotong University. My work spans visual perception, autonomous-driving simulation, robotics, and web applications. I enjoy following an idea from the problem to code and finally to a working system.'}
          </p>
          <FullPageLink className="studio-secondary" href="/about">
            {zh ? '更多关于我' : 'More about me'}
            <ArrowUpRight size={17} />
          </FullPageLink>
        </div>
        <div className="resume-card">
          <div className="resume-card-top">
            <FileText size={28} />
            <span>RÉSUMÉ / 2026</span>
          </div>
          <h3>
            曹武康 <span>Wukang Cao</span>
          </h3>
          <p>
            {zh
              ? '交通运输硕士生 · 重庆交通大学'
              : 'Transportation · Chongqing Jiaotong University'}
          </p>
          <div className="resume-card-facts">
            <span>
              <b>7</b>
              {zh ? '个研究与工程项目' : 'research & engineering projects'}
            </span>
            <span>
              <b>2</b>
              {zh ? '篇 SCI 合著论文' : 'coauthored SCI papers'}
            </span>
          </div>
          <div className="resume-card-bottom">
            <small>
              {zh ? '内容更新' : 'Updated'} {resumeUpdated}
            </small>
            <FullPageLink href="/resume">
              {zh ? '打开完整简历' : 'Open résumé'}
              <ArrowUpRight size={17} />
            </FullPageLink>
          </div>
        </div>
      </section>

      <section className="portfolio-contact studio-width" id="contact">
        <Sparkles size={26} />
        <div className="intro-kicker">LET’S BUILD SOMETHING THAT MATTERS</div>
        <h2>
          {zh
            ? '下一个有意思的项目，\n一起做。'
            : 'Let’s build\nsomething meaningful.'}
        </h2>
        <p>
          {zh
            ? '欢迎交流岗位机会、项目合作与有趣的想法。'
            : 'Open to career opportunities, collaborations, and interesting ideas.'}
        </p>
        <a className="contact-email" href="mailto:caka152005@163.com">
          caka152005@163.com
          <ArrowUpRight size={24} />
        </a>
        <div className="contact-inline">
          <button
            type="button"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText('caka152005@163.com');
                setCopied(true);
              } catch {
                setCopied(false);
              }
            }}
          >
            <Mail size={15} />
            {copied
              ? zh
                ? '邮箱已复制'
                : 'Email copied'
              : zh
                ? '复制邮箱'
                : 'Copy email'}
          </button>
          <a href={githubUrl} target="_blank" rel="noreferrer">
            <Github size={15} />
            GitHub / gitcaka
          </a>
        </div>
        <a className="back-home" href="#top">
          <ArrowDown size={18} />
          {zh ? '回到顶部' : 'Back to top'}
        </a>
      </section>
    </main>
  );
}
