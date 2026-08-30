'use client';

import { Code2, Crosshair, Network, Wrench } from 'lucide-react';
import { PageHero } from '@/components/page-hero';
import { profile } from '@/content/profile';
import { localize } from '@/lib/content';
import { useSite } from '@/components/site-context';

export function AboutPage() {
  const { language, t } = useSite();
  const capabilities =
    language === 'zh'
      ? [
          [
            '视觉算法与实验复现',
            '使用 PyTorch、CUDA、YOLO 与 Transformer 完成训练、消融和指标评测。',
          ],
          [
            '自动驾驶闭环评测',
            '使用 CARLA 组织多路线、成对对照、多随机种子复现和安全验证。',
          ],
          ['机器人系统联调', '连接 ROS、视觉定位、机械臂、移动底盘和串口设备。'],
          [
            '工程部署与问题定位',
            '在 Linux、GPU 服务器与 Jetson 平台上部署、复现并定位系统问题。',
          ],
        ]
      : [
          [
            'Vision algorithms and reproducible experiments',
            'Training, ablation, and metric evaluation with PyTorch, CUDA, YOLO, and Transformers.',
          ],
          [
            'Autonomous-driving closed-loop evaluation',
            'Multi-route paired comparisons, multi-seed reproduction, and safety validation in CARLA.',
          ],
          [
            'Robotics system integration',
            'Connecting ROS, visual localization, manipulators, mobile bases, and serial devices.',
          ],
          [
            'Engineering deployment and diagnosis',
            'Deploying, reproducing, and diagnosing systems on Linux, GPU servers, and Jetson platforms.',
          ],
        ];
  const icons = [Code2, Crosshair, Network, Wrench];
  return (
    <main id="top" className="page-main">
      <div className="content-width">
        <PageHero
          index="06"
          title={t.page.aboutTitle}
          description={t.page.aboutIntro}
          aside={
            <div className="monogram-aside">
              WC
              <span>
                ALGORITHMS
                <br />
                SYSTEMS
                <br />
                VALIDATION
              </span>
            </div>
          }
        />
        <section className="about-statement">
          <span>
            {language === 'zh' ? '我能带来的价值' : 'WHAT I BRING'}
          </span>
          <h2>
            {language === 'zh'
              ? '不止完成模型训练，还能沿着数据、算法、仿真与硬件链路，把结果推进到可复现、可解释、可运行。'
              : 'Beyond training models, I connect data, algorithms, simulation, and hardware to make results reproducible, explainable, and runnable.'}
          </h2>
        </section>
        <div className="about-grid">
          <section>
            <span>{language === 'zh' ? '我的工作方式' : 'HOW I WORK'}</span>
            <p>
              {language === 'zh'
                ? '我习惯先明确问题与指标，再跑通基线、缩小修改边界、组织对照和消融，最后用仿真闭环或真实硬件检查结果。'
                : 'I define the problem and metrics, reproduce the baseline, keep changes scoped, organize controls and ablations, and finally check results in a simulation loop or on physical hardware.'}
            </p>
            <blockquote>{localize(profile.statement, language)}</blockquote>
          </section>
          <div className="capability-list">
            {capabilities.map(([title, body], index) => {
              const Icon = icons[index];
              return (
                <article key={title}>
                  <Icon />
                  <div>
                    <h3>{title}</h3>
                    <p>{body}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
