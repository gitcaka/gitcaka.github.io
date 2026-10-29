'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import {
  ArrowUpRight,
  BookOpen,
  Check,
  CodeXml,
  FileText,
  Grid2X2,
  Home,
  Languages,
  Mail,
  Minus,
  Moon,
  MousePointer2,
  Plus,
  Printer,
  RotateCcw,
  Sun,
  Tags,
  Wrench,
  X,
} from 'lucide-react';
import { RoomScene, type RoomControls } from '@/components/room-scene';
import { useSite } from '@/components/site-context';
import { FullPageLink } from '@/components/full-page-link';
import { ResumePage } from './resume-page';
import {
  findRoomObject,
  roomObjects,
  type RoomObjectId,
  type RoomView,
} from '@/content/room';
import { portfolioWork, githubUrl } from '@/content/portfolio';
import { getProject } from '@/content/projects';
import { outputs } from '@/content/outputs';
import { profile } from '@/content/profile';
import { localize } from '@/lib/content';

export function HomePage() {
  const { language, toggleLanguage } = useSite();
  const zh = language === 'zh';
  const [active, setActive] = useState<RoomObjectId | null>(null);
  const [readerOpen, setReaderOpen] = useState(false);
  const [returning, setReturning] = useState(false);
  const [status, setStatus] = useState<'loading' | 'ready' | 'failed'>(
    'loading',
  );
  const [night, setNight] = useState(false);
  const [labels, setLabels] = useState(true);
  const [inventory, setInventory] = useState(false);
  const [view, setView] = useState<RoomView>('overview');
  const [visited, setVisited] = useState<Set<RoomObjectId>>(new Set());
  const [copied, setCopied] = useState<'idle' | 'ok' | 'failed'>('idle');
  const controls = useRef<RoomControls>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const inventoryButton = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const select = useCallback(
    (id: RoomObjectId) => {
      if (active || returning) return;
      lastFocus.current = document.activeElement as HTMLElement;
      setInventory(false);
      setActive(id);
      setVisited((prev) => new Set(prev).add(id));
      if (status === 'failed') setReaderOpen(true);
    },
    [active, returning, status],
  );
  const inspectReady = useCallback(() => setReaderOpen(true), []);
  const restored = useCallback(() => {
    setReturning(false);
    requestAnimationFrame(() => {
      const target = lastFocus.current;
      (target?.isConnected && target !== document.body
        ? target
        : inventoryButton.current
      )?.focus({ preventScroll: true });
    });
  }, []);
  const close = useCallback(() => {
    if (!active) return;
    setReaderOpen(false);
    setActive(null);
    if (status !== 'ready') restored();
    else setReturning(true);
  }, [active, status, restored]);
  const sceneStatus = useCallback(
    (value: 'ready' | 'failed') => {
      setStatus(value);
      if (value === 'failed') restored();
      if (value === 'failed' && active) setReaderOpen(true);
    },
    [active, restored],
  );
  useEffect(() => {
    if (readerOpen && !dialog.current?.open) {
      dialog.current?.showModal();
      closeButton.current?.focus();
    } else if (!readerOpen && dialog.current?.open) dialog.current.close();
  }, [readerOpen]);
  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (active) {
          e.preventDefault();
          close();
        } else setInventory(false);
      }
    };
    document.addEventListener('keydown', key);
    return () => document.removeEventListener('keydown', key);
  }, [active, close]);
  const item = active ? findRoomObject(active) : null;
  const project = item && 'slug' in item ? getProject(item.slug) : null;
  const chooseView = (name: RoomView) => {
    setView(name);
    controls.current?.view(name);
  };
  return (
    <main
      className={`immersive-home ${night ? 'room-night' : 'room-day'}`}
      id="top"
    >
      <RoomScene
        ref={controls}
        active={active}
        returning={returning}
        night={night}
        showLabels={labels}
        onPick={select}
        onInspectReady={inspectReady}
        onRestored={restored}
        onStatus={sceneStatus}
      />
      <div className="room-vignette" />
      <header className="room-header room-hud">
        <div className="room-brand">
          <span className="room-monogram">
            wc<span>.</span>
          </span>
          <div>
            <h1>{zh ? '曹武康的工作室' : 'Wukang’s studio'}</h1>
            <p>CODE · ROBOTICS · A LITTLE CURIOSITY</p>
          </div>
        </div>
        <div className="room-header-actions">
          <button
            type="button"
            onClick={toggleLanguage}
            aria-label={zh ? 'Switch to English' : '切换到中文'}
          >
            <Languages size={18} />
            <span>{zh ? 'EN' : '中'}</span>
          </button>
          <button
            type="button"
            onClick={() => setNight(!night)}
            aria-label={
              night
                ? zh
                  ? '打开日光'
                  : 'Daylight'
                : zh
                  ? '切换夜晚'
                  : 'Night mode'
            }
            aria-pressed={night}
          >
            {night ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          <button
            type="button"
            onClick={() => setLabels(!labels)}
            aria-label={
              zh ? '显示或隐藏物件提示' : 'Show or hide object labels'
            }
            aria-pressed={labels}
          >
            <Tags size={18} />
          </button>
          <button
            type="button"
            className="inventory-trigger"
            ref={inventoryButton}
            aria-label={zh ? '物件目录' : 'Objects'}
            onClick={() => setInventory(!inventory)}
            aria-expanded={inventory}
            aria-controls="room-inventory"
          >
            <Grid2X2 size={17} />
            <span>{zh ? '物件目录' : 'Objects'}</span>
          </button>
        </div>
      </header>
      {status === 'loading' && (
        <div className="room-loading" role="status">
          <span className="room-loading-orbit" />
          <p>{zh ? '正在打开工作室…' : 'Opening the studio…'}</p>
        </div>
      )}
      {status === 'failed' && (
        <div className="room-fallback">
          <Wrench size={30} />
          <h2>
            {zh
              ? '这个设备暂时无法显示 3D'
              : '3D is unavailable on this device'}
          </h2>
          <p>
            {zh
              ? '仍然可以从物件目录阅读简历、查看项目。'
              : 'You can still explore every project and the résumé through the object list.'}
          </p>
          <button type="button" onClick={() => setInventory(true)}>
            {zh ? '打开物件目录' : 'Explore the objects'}
          </button>
          <FullPageLink href="/resume">
            {zh ? '直接阅读简历' : 'Read résumé'}
          </FullPageLink>
        </div>
      )}
      <div className="room-caption room-hud">
        <span className="room-availability">
          <i />
          {zh ? '正在寻找新的工作机会' : 'OPEN TO WORK'}
        </span>
        <h2>
          {zh ? '随便看看，\n这里有我的故事。' : 'Make yourself at home.'}
        </h2>
        <p>
          <span className="room-desktop-hint">
            {zh
              ? '拖动环顾 · 滚轮缩放 · 点击物件探索'
              : 'Drag to look around · Scroll to zoom · Click to explore'}
          </span>
          <span className="room-touch-hint">
            {zh
              ? '单指环顾 · 双指缩放 · 轻触物件探索'
              : 'Drag to orbit · Pinch to zoom · Tap to explore'}
          </span>
        </p>
      </div>
      <div className="room-bottom room-hud">
        <nav
          className="room-views"
          aria-label={zh ? '房间视角' : 'Room viewpoints'}
        >
          {(
            [
              ['overview', Home, zh ? '全景' : 'Room'],
              ['desk', FileText, zh ? '工作台' : 'Desk'],
              ['garage', Wrench, zh ? '机器人角' : 'Workshop'],
              ['shelf', BookOpen, zh ? '作品架' : 'Shelf'],
            ] as const
          ).map(([id, Icon, label]) => (
            <button
              type="button"
              key={id}
              onClick={() => chooseView(id)}
              aria-pressed={view === id}
              disabled={!!active || returning || status !== 'ready'}
            >
              <Icon size={17} />
              <span>{label}</span>
            </button>
          ))}
        </nav>
        <div className="room-zoom">
          <button
            type="button"
            onClick={() => controls.current?.zoom(0.85)}
            aria-label={zh ? '缩小房间' : 'Zoom out'}
            disabled={status !== 'ready' || !!active || returning}
          >
            <Minus size={17} />
          </button>
          <button
            type="button"
            onClick={() => controls.current?.zoom(1.17)}
            aria-label={zh ? '放大房间' : 'Zoom in'}
            disabled={status !== 'ready' || !!active || returning}
          >
            <Plus size={17} />
          </button>
          <button
            type="button"
            onClick={() => chooseView('overview')}
            aria-label={zh ? '重置房间视角' : 'Reset room view'}
            disabled={status !== 'ready' || !!active || returning}
          >
            <RotateCcw size={16} />
          </button>
        </div>
      </div>
      <div className="room-progress room-hud">
        <span>
          {String(visited.size).padStart(2, '0')} / {roomObjects.length}
        </span>
        {zh ? '个物件已探索' : 'objects explored'}
        <a href={githubUrl} target="_blank" rel="noreferrer">
          <CodeXml size={15} />
          gitcaka
          <ArrowUpRight size={13} />
        </a>
      </div>
      {active && !readerOpen && (
        <div className="room-picking" role="status">
          <MousePointer2 size={16} />
          {zh ? '拿起查看…' : 'Taking a closer look…'}
          <button type="button" onClick={close}>
            {zh ? '放回' : 'Put back'}
          </button>
        </div>
      )}
      {inventory && (
        <aside
          className="room-inventory room-hud"
          id="room-inventory"
          aria-label={zh ? '物件目录' : 'Object directory'}
        >
          <div className="inventory-heading">
            <div>
              <small>THE OBJECTS IN MY ROOM</small>
              <h2>
                {zh ? '每件物品，都有故事。' : 'Every object has a story.'}
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setInventory(false)}
              aria-label={zh ? '关闭目录' : 'Close directory'}
            >
              <X size={18} />
            </button>
          </div>
          <div className="inventory-items">
            {roomObjects.map((object, index) => (
              <button
                type="button"
                key={object.id}
                onClick={() => select(object.id)}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <strong>{object.label[language]}</strong>
                  <small>{object.hint[language]}</small>
                </div>
                {visited.has(object.id) ? (
                  <Check size={16} />
                ) : (
                  <ArrowUpRight size={16} />
                )}
              </button>
            ))}
          </div>
          <div className="inventory-footer">
            <FullPageLink href="/resume">
              {zh ? '简历网页 / 打印版' : 'Résumé / printable version'}
              <ArrowUpRight size={14} />
            </FullPageLink>
            <FullPageLink href="/projects">
              {zh ? '全部工程项目' : 'All engineering projects'}
              <ArrowUpRight size={14} />
            </FullPageLink>
          </div>
        </aside>
      )}
      <dialog
        ref={dialog}
        className={`room-reader ${item?.kind === 'resume' ? 'is-paper' : ''}`}
        aria-labelledby="reader-title"
        onCancel={(e) => {
          e.preventDefault();
          close();
        }}
        onPointerDown={(e) => e.stopPropagation()}
        onPointerUp={(e) => e.stopPropagation()}
      >
        <div className="reader-toolbar">
          <div>
            <span className="reader-object-dot" />
            <h2 id="reader-title">{item?.label[language]}</h2>
            <small>{zh ? '来自曹武康的工作室' : 'FROM WUKANG’S STUDIO'}</small>
          </div>
          <div>
            {item?.kind === 'resume' && (
              <button
                type="button"
                onClick={() => window.print()}
                aria-label={zh ? '打印简历' : 'Print résumé'}
              >
                <Printer size={17} />
              </button>
            )}
            <button
              type="button"
              ref={closeButton}
              onClick={close}
              className="reader-close"
            >
              <X size={18} />
              <span>{zh ? '放回房间' : 'Put it back'}</span>
            </button>
          </div>
        </div>
        <div className="reader-content" key={active}>
          {item?.kind === 'resume' && <ResumePage embedded />}
          {item?.kind === 'works' && (
            <div className="room-work-content">
              <small className="reading-kicker">ON MY SCREEN / GITCAKA</small>
              <h3>
                {zh ? '把想法，做成作品。' : 'Ideas you can actually try.'}
              </h3>
              <p>
                {zh
                  ? '这些是我的公开 Web 作品。点击演示亲自体验，或到 GitHub 查看代码。'
                  : 'Explore my public web projects through their live demos and source code.'}
              </p>
              <div className="room-work-grid">
                {portfolioWork.map((work) => (
                  <article key={work.id}>
                    <a href={work.demo} target="_blank" rel="noreferrer">
                      <Image
                        unoptimized
                        src={work.image}
                        width={1280}
                        height={800}
                        alt={work.title[language]}
                      />
                    </a>
                    <h4>{work.title[language]}</h4>
                    <p>{work.description[language]}</p>
                    <div>
                      <a href={work.demo} target="_blank" rel="noreferrer">
                        {zh ? '体验演示' : 'Try demo'}
                        <ArrowUpRight size={14} />
                      </a>
                      <a
                        href={`${githubUrl}/${work.repo}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <CodeXml size={14} />
                        {zh ? '代码' : 'Code'}
                      </a>
                      <small>{zh ? '静态示例' : 'Static demo'}</small>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}
          {project && (
            <div className="room-project-content">
              <small className="reading-kicker">
                {localize(project.category, language)}
              </small>
              <h3>{localize(project.title, language)}</h3>
              <p className="reading-lead">
                {localize(project.summary, language)}
              </p>
              <div className="reading-tech">
                {project.technologies.map((tech) => (
                  <span key={tech}>{tech}</span>
                ))}
              </div>
              <div className="reading-metrics">
                {project.highlights[language].map((value) => (
                  <span key={value}>
                    <Check size={15} />
                    {value}
                  </span>
                ))}
              </div>
              {[
                [zh ? '我的工作' : 'My contribution', project.role],
                [
                  zh ? '如何实现' : 'Implementation',
                  project.details.implementation,
                ],
                [
                  zh ? '验证与结果' : 'Validation & results',
                  project.details.result,
                ],
              ].map(([title, body]) => (
                <section key={title as string}>
                  <h4>{title as string}</h4>
                  <p>
                    {localize(body as { zh: string; en: string }, language)}
                  </p>
                </section>
              ))}
              <FullPageLink
                className="reading-primary"
                href={`/projects/${project.slug}`}
              >
                {zh ? '阅读完整项目' : 'Read the full project'}
                <ArrowUpRight size={16} />
              </FullPageLink>
            </div>
          )}
          {item?.kind === 'publications' && (
            <div className="room-publications">
              <small className="reading-kicker">
                RESEARCH NOTES & MILESTONES
              </small>
              <h3>{zh ? '书架上的积累。' : 'Notes from the journey.'}</h3>
              <h4>{zh ? '合著论文' : 'Coauthored papers'}</h4>
              {outputs
                .filter((o) => o.type === 'publication')
                .map((paper) => (
                  <article key={paper.id}>
                    <small>
                      {paper.year} · {paper.status[language]}
                    </small>
                    <h4>{paper.title.en}</h4>
                    <p>{paper.summary[language]}</p>
                  </article>
                ))}
              <h4>{zh ? '竞赛与荣誉' : 'Competitions & awards'}</h4>
              <ul>
                {outputs
                  .filter((o) => o.type === 'award')
                  .map((award) => (
                    <li key={award.id}>
                      <span>{award.year}</span>
                      <div>
                        {award.title[language]}
                        <small>{award.status[language]}</small>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          )}
          {item?.kind === 'contact' && (
            <div className="room-contact-card">
              <small className="reading-kicker">NICE TO MEET YOU</small>
              <h3>
                {zh ? '曹武康' : 'Wukang Cao'}
                <span>{zh ? 'Wukang Cao' : '曹武康'}</span>
              </h3>
              <p>{profile.bio[language]}</p>
              <a className="room-card-email" href="mailto:caka152005@163.com">
                <Mail size={20} />
                caka152005@163.com
                <ArrowUpRight size={18} />
              </a>
              <div className="room-contact-links">
                <button
                  type="button"
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText('caka152005@163.com');
                      setCopied('ok');
                    } catch {
                      setCopied('failed');
                    }
                  }}
                >
                  {copied === 'ok'
                    ? zh
                      ? '已复制邮箱'
                      : 'Email copied'
                    : zh
                      ? '复制邮箱'
                      : 'Copy email'}
                </button>
                <a href={githubUrl} target="_blank" rel="noreferrer">
                  <CodeXml size={16} />
                  GitHub / gitcaka
                  <ArrowUpRight size={15} />
                </a>
              </div>
              <p className="copy-status" role="status">
                {copied === 'failed'
                  ? zh
                    ? '复制未成功，可以选中上方邮箱复制。'
                    : 'Copy failed. Select the email above to copy it manually.'
                  : ''}
              </p>
              <div className="card-signature">
                let’s build something meaningful.
              </div>
            </div>
          )}
        </div>
        <div className="reader-bottom">
          <span>
            {zh
              ? '按 Esc 或点击右上角，放回房间'
              : 'Press Esc or close to return this object to the room'}
          </span>
          <span>WUKANG CAO · 2026</span>
        </div>
      </dialog>
    </main>
  );
}
