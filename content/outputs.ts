import type { Output } from './types';

export const outputs: Output[] = [
  {
    id: 'paper-dionet',
    type: 'publication',
    title: {
      zh: 'DIONet：面向低照度场景实时道路障碍物检测的光照自适应网络',
      en: 'DIONet: An Illumination-Adaptive Network for Real-Time Road Obstacles Detection Under Low-Light Scenarios',
    },
    year: 2025,
    status: { zh: 'SCI 已发表', en: 'SCI · Published' },
    summary: {
      zh: 'Yongfu He, Shiwei Xie, Haochi Zhang, Wukang Cao。发表于 IEEE Sensors Journal；在 SAS 数据集上达到 mAP@50 93.5%、mAP@50:95 65.9%。',
      en: 'Yongfu He, Shiwei Xie, Haochi Zhang, Wukang Cao. Published in IEEE Sensors Journal; achieved 93.5% mAP@50 and 65.9% mAP@50:95 on the SAS dataset.',
    },
    area: {
      zh: '低照度道路障碍物检测',
      en: 'Low-Light Road-Obstacle Detection',
    },
  },
  {
    id: 'paper-der-nr',
    type: 'publication',
    title: {
      zh: 'DER-NR：通过噪声校正实现基于视觉的驾驶员情绪识别',
      en: 'DER-NR: Vision-Based Driver Emotion Recognition via Noise Rectification',
    },
    year: 2026,
    status: { zh: 'SCI 已发表', en: 'SCI · Published' },
    summary: {
      zh: 'Yongfu He, Ruikang Wang, Yanqing He, Wukang Cao。发表于 IEEE Transactions on Computational Social Systems；在多个公开数据集及不同标签噪声条件下较基线提升 1.20—9.84 个百分点。',
      en: 'Yongfu He, Ruikang Wang, Yanqing He, Wukang Cao. Published in IEEE Transactions on Computational Social Systems; improved over baselines by 1.20–9.84 percentage points across public datasets and different label-noise conditions.',
    },
    area: {
      zh: '驾驶员情绪识别 · 噪声鲁棒性',
      en: 'Driver Emotion Recognition · Noise Robustness',
    },
  },
  {
    id: 'award-intelligent-transport',
    type: 'award',
    title: {
      zh: '第九届全国高校智能交通创新与创业大赛二等奖',
      en: 'Second Prize, 9th National University Intelligent Transportation Innovation & Entrepreneurship Competition',
    },
    year: 2026,
    status: { zh: '技术骨干', en: 'Core Technical Member' },
    summary: {
      zh: '负责项目关键技术实现与系统验证。',
      en: 'Contributed to key technical implementation and system validation.',
    },
    area: { zh: '智能交通', en: 'Intelligent Transportation' },
  },
  {
    id: 'award-gansu',
    type: 'award',
    title: {
      zh: '第二届甘肃省大学生交通运输科技大赛一等奖',
      en: 'First Prize, 2nd Gansu Provincial Student Transportation Science & Technology Competition',
    },
    year: 2025,
    status: { zh: '技术骨干', en: 'Core Technical Member' },
    summary: {
      zh: '对应智能网联抛洒物零样本感知与预警系统。',
      en: 'Awarded for the zero-shot connected road-spillage perception and warning system.',
    },
    area: {
      zh: '智能网联 · 视觉感知',
      en: 'Connected Mobility · Visual Perception',
    },
  },
  {
    id: 'award-ai-scene',
    type: 'award',
    title: {
      zh: '全国人工智能应用场景创新挑战赛智能交通专项赛三等奖',
      en: 'Third Prize, National AI Application Scenario Innovation Challenge — Intelligent Transportation',
    },
    year: 2025,
    status: { zh: '负责人', en: 'Project Lead' },
    summary: {
      zh: '负责项目组织、技术路线推进与成果交付。',
      en: 'Led project organization, technical execution, and delivery.',
    },
    area: { zh: '人工智能 · 智能交通', en: 'AI · Intelligent Transportation' },
  },
  {
    id: 'award-smart-transport',
    type: 'award',
    title: {
      zh: '第六届智慧交通创新大赛三等奖',
      en: 'Third Prize, 6th Smart Transportation Innovation Competition',
    },
    year: 2025,
    status: { zh: '负责人', en: 'Project Lead' },
    summary: {
      zh: '负责技术路线、系统集成与参赛交付。',
      en: 'Led the technical route, system integration, and competition delivery.',
    },
    area: { zh: '智慧交通', en: 'Smart Transportation' },
  },
  {
    id: 'award-icv-llm',
    type: 'award',
    title: {
      zh: '第五届沈阳智能网联汽车 AI 大模型挑战赛三等奖',
      en: 'Third Prize, 5th Shenyang Intelligent Connected Vehicle AI Foundation Model Challenge',
    },
    year: 2025,
    status: { zh: '负责人', en: 'Project Lead' },
    summary: {
      zh: '围绕智能网联汽车与大模型应用完成方案设计和工程实现。',
      en: 'Led solution design and implementation for an intelligent connected vehicle and foundation-model challenge.',
    },
    area: {
      zh: '智能网联 · 大模型',
      en: 'Connected Vehicles · Foundation Models',
    },
  },
  {
    id: 'award-transport-national',
    type: 'award',
    title: {
      zh: '全国大学生交通运输科技大赛三等奖',
      en: 'Third Prize, National Student Transportation Science & Technology Competition',
    },
    year: 2024,
    status: { zh: '负责人', en: 'Project Lead' },
    summary: {
      zh: '负责项目推进、系统实现与竞赛答辩。',
      en: 'Led project execution, system implementation, and competition presentation.',
    },
    area: { zh: '交通运输科技', en: 'Transportation Science & Technology' },
  },
];
