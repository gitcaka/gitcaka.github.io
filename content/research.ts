import type { ResearchArea } from './types';

export const researchAreas: ResearchArea[] = [
  {
    id: 'perception',
    index: '01',
    status: 'active',
    title: { zh: '自动驾驶视觉感知', en: 'Autonomous-Driving Perception' },
    summary: {
      zh: '面向道路障碍物、低照度与开放词汇场景，完成模型设计、训练、消融、指标评测和车辆端部署实践。',
      en: 'Model design, training, ablation, metric evaluation, and vehicle-side deployment for road obstacles, low light, and open-vocabulary perception.',
    },
    topics: [
      { zh: '目标检测', en: 'Object Detection' },
      { zh: '低照度感知', en: 'Low-Light Perception' },
      { zh: '开放词汇检测', en: 'Open-Vocabulary Detection' },
    ],
  },
  {
    id: 'cooperative-intelligence',
    index: '02',
    status: 'active',
    title: { zh: '协同感知与多模态系统', en: 'Cooperative Perception & Multimodal Systems' },
    summary: {
      zh: '围绕 C-V2X、多车视角互补和本地 VLM 部署，设计可靠的信息交换、异常处理和语义约束机制。',
      en: 'Reliable information exchange, anomalous-output handling, and semantic constraints across C-V2X, complementary vehicle views, and local VLM deployment.',
    },
    topics: [
      { zh: 'V2V / V2I', en: 'V2V / V2I' },
      { zh: 'Qwen2.5-VL', en: 'Qwen2.5-VL' },
      { zh: '安全回退', en: 'Safety Fallbacks' },
    ],
  },
  {
    id: 'simulation-evaluation',
    index: '03',
    status: 'active',
    title: { zh: '自动驾驶仿真与闭环评测', en: 'Autonomous-Driving Simulation & Evaluation' },
    summary: {
      zh: '使用 CARLA 组织多路线、成对对照、多随机种子复现和异常场景验证，用闭环结果检查算法实际收益。',
      en: 'Use CARLA for multi-route paired comparisons, multi-seed reproduction, and anomalous-scenario validation, checking algorithmic value through closed-loop outcomes.',
    },
    topics: [
      { zh: 'CARLA 闭环', en: 'CARLA Closed Loop' },
      { zh: '多随机种子复现', en: 'Multi-Seed Reproduction' },
      { zh: '安全与异常验证', en: 'Safety & Fault Validation' },
    ],
  },
  {
    id: 'robotics',
    index: '04',
    status: 'active',
    title: { zh: 'ROS 机器人系统工程', en: 'ROS Robotics Systems Engineering' },
    summary: {
      zh: '在 Jetson Nano 与 ROS 上连接导航、视觉定位、机械臂控制和串口通信，以重复闭环测试验证软硬件系统。',
      en: 'Integrate navigation, visual localization, manipulation, and serial communication on Jetson Nano and ROS, validating hardware–software systems through repeated closed-loop tests.',
    },
    topics: [
      { zh: 'ROS Noetic', en: 'ROS Noetic' },
      { zh: 'ArUco 与坐标链', en: 'ArUco & Transform Chains' },
      { zh: '软硬件联调', en: 'Hardware–Software Integration' },
    ],
  },
];

export const researchPipeline = [
  {
    key: 'problem',
    title: { zh: '问题与指标', en: 'Problem & Metrics' },
    detail: { zh: '定义场景、边界与评测标准', en: 'Define scenarios, boundaries, and metrics' },
  },
  {
    key: 'reproduce',
    title: { zh: '复现与基线', en: 'Reproduce & Baseline' },
    detail: { zh: '跑通真实代码与实验链路', en: 'Run real code and experiment pipelines' },
  },
  {
    key: 'build',
    title: { zh: '算法与系统', en: 'Build Algorithms' },
    detail: { zh: '实现模型、协议与安全机制', en: 'Implement models, protocols, and safeguards' },
  },
  {
    key: 'evaluate',
    title: { zh: '量化评测', en: 'Quantify' },
    detail: { zh: '对照、消融与多次复现', en: 'Controls, ablations, and repeated runs' },
  },
  {
    key: 'validate',
    title: { zh: '闭环验证', en: 'Validate in Loop' },
    detail: { zh: '仿真或真实硬件验证', en: 'Simulation or physical hardware' },
  },
] as const;
