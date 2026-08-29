import type { ResearchArea } from './types';

export const researchAreas: ResearchArea[] = [
  {
    id: 'cooperative-perception',
    index: '01',
    status: 'active',
    title: {
      zh: '视距受限场景下的协同感知',
      en: 'Cooperative Perception under Limited Visibility',
    },
    summary: {
      zh: '研究遮挡导致的感知缺失，以及多车视角互补、通信信息选择与共享信息可靠性。',
      en: 'Studying perception gaps caused by occlusion, complementary multi-vehicle viewpoints, selective communication, and the reliability of shared evidence.',
    },
    topics: [
      { zh: '遮挡与感知缺失', en: 'Occlusion & Missing Evidence' },
      { zh: '多车视角互补', en: 'Multi-Agent View Complementarity' },
      { zh: '通信成本与性能平衡', en: 'Communication–Performance Trade-off' },
    ],
  },
  {
    id: 'multimodal-reasoning',
    index: '02',
    status: 'active',
    title: {
      zh: '多模态大模型与驾驶语义推理',
      en: 'Multimodal Foundation Models for Driving Reasoning',
    },
    summary: {
      zh: '探索由视觉与传感器证据约束的语义建议，避免大模型推理脱离可观测信息。',
      en: 'Exploring semantic guidance constrained by visual and sensor evidence so that model reasoning remains grounded in observable information.',
    },
    topics: [
      { zh: '多模态场景理解', en: 'Multimodal Scene Understanding' },
      { zh: '证据约束推理', en: 'Evidence-Grounded Reasoning' },
      { zh: '语义残差与软偏置', en: 'Semantic Residuals & Soft Biases' },
    ],
  },
  {
    id: 'trajectory-planning',
    index: '03',
    status: 'exploring',
    title: {
      zh: '语言引导与生成式轨迹规划',
      en: 'Language-Guided Generative Trajectory Planning',
    },
    summary: {
      zh: '探索将低维语言语义先验连接到连续轨迹，并在基础轨迹上进行受约束的残差修正。',
      en: 'Exploring how low-dimensional language priors can connect to continuous trajectories through constrained residual corrections.',
    },
    topics: [
      { zh: 'DiffusionDrive', en: 'DiffusionDrive' },
      { zh: '低维语义先验', en: 'Low-Dimensional Semantic Priors' },
      {
        zh: '开环评测与闭环计划',
        en: 'Open-loop Evaluation & Closed-loop Plan',
      },
    ],
  },
  {
    id: 'system-validation',
    index: '04',
    status: 'active',
    title: {
      zh: '自动驾驶与机器人系统验证',
      en: 'Autonomous System Implementation and Validation',
    },
    summary: {
      zh: '通过 Apollo、CARLA、ROS 2、MoveIt 2 与真实硬件，把算法问题落实到可运行系统。',
      en: 'Using Apollo, CARLA, ROS 2, MoveIt 2, and physical hardware to carry algorithmic ideas into working systems.',
    },
    topics: [
      { zh: '规划系统修改', en: 'Planning-System Modification' },
      { zh: '仿真验证', en: 'Simulation Validation' },
      { zh: '软硬件联调', en: 'Hardware–Software Integration' },
    ],
  },
];

export const researchPipeline = [
  {
    key: 'scene',
    title: { zh: '复杂交通场景', en: 'Complex Traffic' },
    detail: { zh: '遮挡与信息不完整', en: 'Occlusion and incomplete evidence' },
  },
  {
    key: 'cooperate',
    title: { zh: '协同感知', en: 'Cooperative Perception' },
    detail: { zh: '车车 / 车路视角互补', en: 'V2V / V2X view complementarity' },
  },
  {
    key: 'reason',
    title: { zh: '语义推理', en: 'Semantic Reasoning' },
    detail: {
      zh: '多模态理解与证据约束',
      en: 'Multimodal and evidence-grounded',
    },
  },
  {
    key: 'plan',
    title: { zh: '轨迹规划', en: 'Trajectory Planning' },
    detail: {
      zh: '生成、决策与残差修正',
      en: 'Generation, decision, and correction',
    },
  },
  {
    key: 'validate',
    title: { zh: '系统验证', en: 'System Validation' },
    detail: {
      zh: '数据集、仿真与真实硬件',
      en: 'Datasets, simulation, and hardware',
    },
  },
] as const;
