'use client';

import { ArrowLeft, Printer, CodeXml as Github, Mail } from 'lucide-react';
import { useSite } from '@/components/site-context';
import { FullPageLink } from '@/components/full-page-link';
import { resumeProjects, resumeUpdated, githubUrl } from '@/content/portfolio';
import { outputs } from '@/content/outputs';
import { profile } from '@/content/profile';
import { localize } from '@/lib/content';

export function ResumePage() {
  const { language } = useSite();
  const zh = language === 'zh';
  return (
    <main className="resume-page">
      <div className="resume-toolbar">
        <FullPageLink href="/" className="studio-secondary">
          <ArrowLeft size={16} />
          {zh ? '返回个人主页' : 'Back to portfolio'}
        </FullPageLink>
        <button
          type="button"
          className="studio-primary"
          onClick={() => window.print()}
        >
          <Printer size={16} />
          {zh ? '打印 / 保存为 PDF' : 'Print / Save as PDF'}
        </button>
      </div>
      <header className="resume-heading">
        <div className="intro-kicker">RÉSUMÉ · {resumeUpdated}</div>
        <h1>
          曹武康 <span>Wukang Cao</span>
        </h1>
        <p>{localize(profile.bio, language)}</p>
        <div className="resume-meta">
          <a href="mailto:caka152005@163.com">
            <Mail size={14} />
            caka152005@163.com
          </a>
          <a href={githubUrl} target="_blank" rel="noreferrer">
            <Github size={14} />
            github.com/gitcaka
          </a>
          <span>{zh ? '重庆 · 中国' : 'Chongqing, China'}</span>
        </div>
      </header>
      <section className="resume-section">
        <h2>{zh ? '教育背景' : 'Education'}</h2>
        <article>
          <div className="resume-meta">
            <span>2024.09 — {zh ? '至今' : 'Present'}</span>
          </div>
          <h3>
            {zh
              ? '重庆交通大学 · 交通运输 · 硕士在读'
              : 'Chongqing Jiaotong University · M.Eng. in Transportation (in progress)'}
          </h3>
          <p>
            {zh
              ? '方向：自动驾驶、车路协同、障碍物检测与车辆行为预测。'
              : 'Focus: autonomous driving, vehicle–road cooperation, obstacle detection, and vehicle behavior prediction.'}
          </p>
        </article>
        <article>
          <div className="resume-meta">
            <span>2020.09 — 2024.06</span>
          </div>
          <h3>
            {zh
              ? '重庆交通大学 · 交通设备与控制工程 · 本科'
              : 'Chongqing Jiaotong University · B.Eng. in Transportation Equipment and Control Engineering'}
          </h3>
          <p>
            {zh
              ? 'GPA 3.66；专业前 27%，综合测评前 10%。国家励志奖学金、华西教育奖学金、校三等奖学金、科技创新先进个人及优秀毕业生。'
              : 'GPA 3.66; top 27% academically and top 10% in comprehensive evaluation. National Encouragement Scholarship, Huaxi Education Scholarship, university scholarship, science and technology innovation honor, and Outstanding Graduate.'}
          </p>
        </article>
      </section>
      <section className="resume-section">
        <h2>{zh ? '技术能力' : 'Technical skills'}</h2>
        <div className="resume-skills">
          <article>
            <h3>{zh ? '感知与深度学习' : 'Perception & deep learning'}</h3>
            <p>
              Python · PyTorch · CUDA · YOLO · CNN / Transformer · OpenCV · VLM
            </p>
          </article>
          <article>
            <h3>{zh ? '仿真与自动驾驶' : 'Simulation & autonomous driving'}</h3>
            <p>CARLA · Bench2Drive · DriverSim · Autoware · PIXKIT · C-V2X</p>
          </article>
          <article>
            <h3>{zh ? '机器人与嵌入式' : 'Robotics & embedded systems'}</h3>
            <p>
              ROS Melodic / Noetic · Gazebo · RViz · Jetson Nano · STM32 · PID
            </p>
          </article>
          <article>
            <h3>{zh ? '工程与开发' : 'Engineering & development'}</h3>
            <p>
              Ubuntu · Conda · Git · TCP / UDP · Flask · Vue ·{' '}
              {zh ? '服务器部署' : 'Server deployment'}
            </p>
          </article>
        </div>
      </section>
      <section className="resume-section">
        <h2>{zh ? '项目经历' : 'Project experience'}</h2>
        {resumeProjects.map((project, i) => (
          <article key={project.title.en}>
            <div className="resume-meta">
              <span>
                {project.period.replace('Present', zh ? '至今' : 'Present')}
              </span>
              <span>0{i + 1}</span>
            </div>
            <h3>{localize(project.title, language)}</h3>
            <small>{project.tags}</small>
            <p>{localize(project.body, language)}</p>
            <p className="resume-result">
              {localize(project.result, language)}
            </p>
          </article>
        ))}
      </section>
      <section className="resume-section">
        <h2>{zh ? '论文成果 · 合著' : 'Coauthored publications'}</h2>
        {outputs
          .filter((item) => item.type === 'publication')
          .map((paper) => (
            <article key={paper.id}>
              <h3>{paper.title.en}</h3>
              <p>{localize(paper.summary, language)}</p>
            </article>
          ))}
      </section>
      <section className="resume-section">
        <h2>{zh ? '竞赛与荣誉' : 'Competitions & awards'}</h2>
        <ul className="resume-awards">
          {outputs
            .filter((item) => item.type === 'award')
            .map((award) => (
              <li key={award.id}>
                {award.year} · {localize(award.title, language)}{' '}
                <small>({localize(award.status, language)})</small>
              </li>
            ))}
        </ul>
      </section>
      <p className="resume-note">
        {zh
          ? `依据 ${resumeUpdated} 更新的简历整理。项目指标对应各自实验与测试条件。`
          : `Based on the résumé updated ${resumeUpdated}. Project metrics refer to their respective experiment and test conditions.`}
      </p>
    </main>
  );
}
