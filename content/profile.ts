import type { Profile } from './types';

export const profile: Profile = {
  name: { zh: '曹武康', en: 'Wukang Cao' },
  role: {
    zh: '交通运输硕士生 · 自动驾驶感知与智能系统方向',
    en: 'M.Eng. Candidate · Autonomous Driving Perception & Intelligent Systems',
  },
  tagline: {
    zh: '从感知算法到可运行系统，让智能驾驶能力经得起真实验证。',
    en: 'From perception models to working systems—built to hold up in real validation.',
  },
  bio: {
    zh: '正在寻找自动驾驶感知算法、仿真评测、多模态/VLM 与机器人系统相关岗位。具备深度学习视觉算法、CARLA 闭环评测、C-V2X 协同感知、ROS 移动操作与车载部署实践。',
    en: 'Open to roles in autonomous-driving perception, simulation and evaluation, multimodal/VLM systems, and robotics. Experienced with deep-learning vision, CARLA closed-loop evaluation, C-V2X cooperation, ROS mobile manipulation, and vehicle-side deployment.',
  },
  statement: {
    zh: '我希望加入重视落地与验证的团队，把算法、代码、仿真和真实系统连接起来。',
    en: 'I want to join a team that values implementation and validation, connecting algorithms, code, simulation, and real systems.',
  },
  targetRoles: [
    { zh: '自动驾驶感知算法', en: 'Autonomous-Driving Perception' },
    { zh: '自动驾驶仿真与评测', en: 'Simulation & Evaluation' },
    { zh: '多模态 / VLM 应用', en: 'Multimodal / VLM Systems' },
    { zh: '机器人系统工程', en: 'Robotics Systems Engineering' },
  ],
  avatar: undefined,
  resume: undefined,
};
