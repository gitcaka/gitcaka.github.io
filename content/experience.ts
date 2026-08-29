import type { ExperienceItem } from './types';

export const experience: ExperienceItem[] = [
  {
    id: 'graduate-research',
    period: { zh: '当前', en: 'Present' },
    type: { zh: '科研经历', en: 'Research' },
    title: {
      zh: '视距受限下大模型驱动的协同感知方法研究',
      en: 'LLM-Driven Cooperative Perception under Limited Visibility',
    },
    summary: {
      zh: '围绕遮挡、多车信息协同、语义证据约束和实验验证，推进研究问题定义、基线复现与方法设计。',
      en: 'Advancing problem formulation, baseline reproduction, and method design around occlusion, multi-agent cooperation, evidence-grounded semantics, and experimental validation.',
    },
  },
  {
    id: 'planning-research',
    period: { zh: '探索中', en: 'Exploring' },
    type: { zh: '研究探索', en: 'Research Exploration' },
    title: {
      zh: '语言引导的 DiffusionDrive 轨迹规划',
      en: 'Language-Guided DiffusionDrive Planning',
    },
    summary: {
      zh: '复现基础生成式规划流程，梳理 NAVSIM 等评测环节，并探索低维语义先验与轨迹残差修正。',
      en: 'Reproducing the base generative-planning flow, mapping NAVSIM-style evaluation, and exploring low-dimensional priors for trajectory residual correction.',
    },
  },
  {
    id: 'highway-project',
    period: { zh: '2023.12 — 至今', en: 'Dec 2023 — Present' },
    type: { zh: '项目与竞赛', en: 'Project & Competition' },
    title: {
      zh: '高速公路网抛洒物源头治理与风险预估系统',
      en: 'Highway Spillage Source Control and Risk Estimation',
    },
    summary: {
      zh: '参与数据集与目标检测训练，负责 Vue/Flask 云平台并参与小程序开发；项目获交通运输科技大赛国家三等奖。',
      en: 'Contributed to dataset and detector training, built the Vue/Flask cloud platform, and supported mini-program development; the project received a National Third Prize.',
    },
  },
  {
    id: 'apollo-practice',
    period: { zh: '项目实践', en: 'Project Practice' },
    type: { zh: '自动驾驶系统', en: 'Autonomous-Driving System' },
    title: {
      zh: 'Apollo 9.0 规划策略修改与仿真验证',
      en: 'Apollo 9.0 Planning-Strategy Modification and Simulation',
    },
    summary: {
      zh: '围绕交通灯、红灯停车与右转、多车道任务阅读大型规划系统代码，定位规则与状态机并完成仿真验证。',
      en: 'Read and modified a large planning stack around traffic lights, red-light stopping and turning, and multi-lane tasks, then validated behavior in simulation.',
    },
  },
  {
    id: 'robotics-practice',
    period: { zh: '工程实践', en: 'Engineering Practice' },
    type: { zh: '机器人系统', en: 'Robotic Systems' },
    title: {
      zh: 'ROS 2 移动机器人与机械臂视觉抓取',
      en: 'ROS 2 Mobile Manipulation and Visual Grasping',
    },
    summary: {
      zh: '打通导航、ArUco 识别、TF、MoveIt 2、末端运动和夹爪控制，完成软硬件联调与链路验证。',
      en: 'Integrated navigation, ArUco recognition, TF, MoveIt 2, end-effector motion, and gripper control through hardware–software debugging.',
    },
  },
];
