import type { Output } from './types';

export const outputs: Output[] = [
  {
    id: 'research-coop',
    type: 'research',
    title: {
      zh: '视距受限下大模型驱动的协同感知方法研究',
      en: 'LLM-Driven Cooperative Perception under Limited Visibility',
    },
    status: { zh: '在研', en: 'Research in Progress' },
    summary: {
      zh: '正在推进问题定义、基线复现、方法设计与实验方案；不包含未经验证的论文或指标声明。',
      en: 'Ongoing problem formulation, baseline reproduction, method design, and experimental planning, without unverified publication or metric claims.',
    },
    area: {
      zh: '协同感知 · 多模态推理',
      en: 'Cooperative Perception · Multimodal Reasoning',
    },
  },
  {
    id: 'research-planning',
    type: 'research',
    title: {
      zh: '语言引导的 DiffusionDrive 轨迹规划探索',
      en: 'Language-Guided DiffusionDrive Exploration',
    },
    status: { zh: '复现与探索', en: 'Reproduction & Exploration' },
    summary: {
      zh: '围绕生成式规划复现、开环评测与语义残差修正开展探索，闭环验证仍在计划中。',
      en: 'Exploring generative-planning reproduction, open-loop evaluation, and semantic residual correction; closed-loop validation remains planned.',
    },
    area: { zh: '自动驾驶规划', en: 'Autonomous-Driving Planning' },
  },
  {
    id: 'software-risk',
    type: 'software',
    title: {
      zh: '高速公路抛洒风险预估 Web 云平台',
      en: 'Highway Spillage Risk Estimation Web Platform',
    },
    status: { zh: '工程系统', en: 'Engineering System' },
    summary: {
      zh: '基于 Vue 与 Flask 的路段风险画像、评估与预警平台。',
      en: 'A Vue/Flask platform for road-segment risk profiling, assessment, and warnings.',
    },
    area: {
      zh: '智能交通 · Web 系统',
      en: 'Intelligent Transportation · Web Systems',
    },
  },
  {
    id: 'award-transport',
    type: 'award',
    title: {
      zh: '交通运输科技大赛国家三等奖',
      en: 'National Third Prize, Transportation Science and Technology Competition',
    },
    status: { zh: '竞赛成果', en: 'Competition Outcome' },
    summary: {
      zh: '对应“高速公路网抛洒物源头治理与风险预估系统”项目。',
      en: 'Awarded for the highway spillage source-control and risk-estimation project.',
    },
    area: { zh: '智能交通', en: 'Intelligent Transportation' },
  },
];
