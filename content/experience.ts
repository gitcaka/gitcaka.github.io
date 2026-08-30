import type { ExperienceItem } from './types';

export const experience: ExperienceItem[] = [
  {
    id: 'master-education',
    period: { zh: '2024.09 — 至今', en: 'Sep 2024 — Present' },
    type: { zh: '硕士教育', en: 'Graduate Education' },
    title: {
      zh: '重庆交通大学 · 交通运输',
      en: 'Chongqing Jiaotong University · Transportation',
    },
    summary: {
      zh: '研究方向包括车路协同、自动驾驶、障碍物检测与车辆行为预测；持续参与国家自然科学基金项目及智能交通、机器人系统实践。',
      en: 'Focus areas include vehicle–road cooperation, autonomous driving, obstacle detection, and vehicle behavior prediction, with ongoing work in NSFC projects, intelligent transportation, and robotics.',
    },
  },
  {
    id: 'coop-project',
    period: { zh: '2025.10 — 至今', en: 'Oct 2025 — Present' },
    type: { zh: '国家自然科学基金项目', en: 'NSFC Project' },
    title: {
      zh: '多模态大模型协同感知与轨迹规划研究',
      en: 'Multimodal Cooperative Perception and Trajectory Planning',
    },
    summary: {
      zh: '基于 Qwen2.5-VL、LangCoop、V2V-GoT 与 CARLA 构建双车闭环评测；完成 10 次单 GPU 多随机种子复现，并通过安全停止、轨迹合法性与异常帧处理机制提升闭环可靠性。',
      en: 'Built dual-vehicle closed-loop evaluation with Qwen2.5-VL, LangCoop, V2V-GoT, and CARLA; completed 10 single-GPU multi-seed reproductions and improved reliability through safe-stop, trajectory validation, and anomalous-frame handling.',
    },
  },
  {
    id: 'robotics-project',
    period: { zh: '2026.06 — 2026.09', en: 'Jun 2026 — Sep 2026' },
    type: { zh: '机器人系统项目 · 进行中', en: 'Robotics Project · Ongoing' },
    title: {
      zh: 'ROS 移动机械臂智能物流系统',
      en: 'ROS Mobile-Manipulator Intelligent Logistics System',
    },
    summary: {
      zh: '在 Jetson Nano 与 ROS Noetic 上打通导航、ArUco 识别、机械臂抓取与串口控制；20 次全流程闭环测试任务完成率 85%，抓取成功率 90%。',
      en: 'Integrated navigation, ArUco recognition, manipulation, and serial control on Jetson Nano with ROS Noetic; across 20 end-to-end closed-loop tests, task completion reached 85% and grasp success 90%.',
    },
  },
  {
    id: 'spillage-project',
    period: { zh: '2024.09 — 2025.09', en: 'Sep 2024 — Sep 2025' },
    type: { zh: '智能交通项目', en: 'Intelligent Transportation Project' },
    title: {
      zh: '智能网联抛洒物零样本感知与预警系统',
      en: 'Zero-Shot Road-Spillage Perception and Warning System',
    },
    summary: {
      zh: '融合 YOLO-World、CLIP、TwinLiteNet 与 C-V2X，Precision 从 4.43% 提升至 68.45%，F1 从 0.0835 提升至 0.6946，并获甘肃省大学生交通运输科技大赛一等奖。',
      en: 'Combined YOLO-World, CLIP, TwinLiteNet, and C-V2X; improved precision from 4.43% to 68.45% and F1 from 0.0835 to 0.6946, earning a provincial first prize.',
    },
  },
  {
    id: 'bachelor-education',
    period: { zh: '2020.09 — 2024.06', en: 'Sep 2020 — Jun 2024' },
    type: { zh: '本科教育', en: 'Undergraduate Education' },
    title: {
      zh: '重庆交通大学 · 交通设备与控制工程',
      en: 'Chongqing Jiaotong University · Transportation Equipment and Control Engineering',
    },
    summary: {
      zh: 'GPA 3.66，专业排名前 27%，综合测评前 10%；曾获国家励志奖学金、华西教育奖学金、校三等奖学金及优秀毕业生等荣誉。',
      en: 'GPA 3.66; top 27% academically and top 10% in comprehensive evaluation. Honors include the National Encouragement Scholarship, Huaxi Education Scholarship, university scholarship, and Outstanding Graduate.',
    },
  },
];
