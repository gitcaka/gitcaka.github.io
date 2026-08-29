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
            '阅读与修改自动驾驶、机器人相关代码',
            '围绕真实系统定位规则、坐标链路与执行路径。',
          ],
          [
            '研究与技术路线一致性',
            '从问题定义出发安排基线、方法、实验和消融。',
          ],
          ['算法实验与系统联调', '连接模型训练、仿真验证和真实硬件调试。'],
          [
            '工程部署与环境调试',
            '在 Linux、Docker 与 GPU 环境中部署和排查项目。',
          ],
        ]
      : [
          [
            'Reading and modifying autonomous-driving and robotics code',
            'Tracing rules, coordinate chains, and execution paths in real systems.',
          ],
          [
            'Research–method alignment',
            'Organizing baselines, methods, experiments, and ablations from the research question.',
          ],
          [
            'Algorithm experiments and system integration',
            'Connecting model training, simulation, and physical-hardware debugging.',
          ],
          [
            'Deployment and environment debugging',
            'Deploying and troubleshooting projects across Linux, Docker, and GPU environments.',
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
                PERCEPTION
                <br />
                REASONING
                <br />
                ACTION
              </span>
            </div>
          }
        />
        <section className="about-statement">
          <span>
            {language === 'zh' ? '我关注的问题' : 'THE QUESTION I FOCUS ON'}
          </span>
          <h2>
            {language === 'zh'
              ? '车辆在遮挡、信息不完整和复杂交互环境中，如何借助协作信息和语义推理获得更可靠的理解与决策。'
              : 'How can vehicles use cooperative information and semantic reasoning to build more reliable understanding and decisions under occlusion, incomplete evidence, and complex interaction?'}
          </h2>
        </section>
        <div className="about-grid">
          <section>
            <span>{language === 'zh' ? '我的工作方式' : 'HOW I WORK'}</span>
            <p>
              {language === 'zh'
                ? '从研究问题出发，阅读和复现方法，完成代码实现、实验设计，并尽可能在仿真或真实系统中验证。'
                : 'I start from the research question, read and reproduce relevant methods, implement code, design experiments, and validate in simulation or physical systems wherever possible.'}
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
