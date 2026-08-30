import type { Project } from './types';

export const projects: Project[] = [
  {
    id: 'coop-vlm',
    slug: 'multimodal-cooperative-driving',
    featured: true,
    emphasis: 'primary',
    title: {
      zh: '多模态大模型协同感知与轨迹规划',
      en: 'Multimodal Cooperative Perception and Trajectory Planning',
    },
    summary: {
      zh: '在 CARLA 中搭建双车协同闭环，围绕大模型语义协议、异常帧处理与轨迹安全机制完成多随机种子复现和成对评测。',
      en: 'Built a dual-vehicle CARLA closed loop and evaluated multimodal semantic protocols, anomalous-frame handling, and trajectory safeguards through multi-seed reproductions and paired runs.',
    },
    category: { zh: '国家自然科学基金项目', en: 'NSFC Project' },
    status: { zh: '在研', en: 'Ongoing' },
    period: { zh: '2025.10 — 至今', en: 'Oct 2025 — Present' },
    role: {
      zh: '负责本地 VLM 部署、协同语义协议修正、安全机制实现、复现实验与 CARLA 双车闭环评测',
      en: 'Responsible for local VLM deployment, cooperative semantic-protocol fixes, safety mechanisms, reproducibility runs, and dual-vehicle CARLA evaluation',
    },
    technologies: ['PyTorch', 'CUDA', 'CARLA', 'Qwen2.5-VL', 'LangCoop', 'V2V-GoT'],
    highlights: {
      zh: ['10 次单 GPU 多随机种子复现', '平均 DS 37.50 → 65.02', '完整路线 2/6 → 6/6', '碰撞数 9 → 2'],
      en: ['10 single-GPU multi-seed reproductions', 'Mean DS: 37.50 → 65.02', 'Completed routes: 2/6 → 6/6', 'Collisions: 9 → 2'],
    },
    details: {
      problem: {
        zh: '多车协同驾驶中，语言语义的方向、单位与轨迹形状容易不一致；单车退出、图像过期和异常输出还会放大闭环风险。',
        en: 'In cooperative driving, semantic direction, units, and trajectory shape can become inconsistent, while agent dropout, stale images, and anomalous outputs amplify closed-loop risk.',
      },
      route: {
        zh: '本地部署 Qwen2.5-VL，基于 LangCoop 与 V2V-GoT 搭建双车协同链路，统一速度—曲率语义并加入轨迹与安全校验。',
        en: 'Deploy Qwen2.5-VL locally, build a dual-vehicle pipeline on LangCoop and V2V-GoT, normalize speed–curvature semantics, and add trajectory and safety validation.',
      },
      system: {
        zh: '双车场景观测 → 多模态语义生成 → 协同信息交换 → 轨迹合法性校验 → 控制执行 → CARLA 闭环评测。',
        en: 'Dual-vehicle observations → multimodal semantics → cooperative exchange → trajectory validation → control execution → CARLA closed-loop evaluation.',
      },
      implementation: {
        zh: '修正速度—曲率语义、单位、目标方向与轨迹形状；实现同车历史回退、陈旧图像上限、Partial-Agent、安全停止与异常帧兜底；组织 B0、几何约束、目标恢复、速度提示及组合消融。',
        en: 'Fixed speed–curvature semantics, units, target direction, and trajectory shape; implemented same-vehicle history fallback, stale-image limits, Partial-Agent handling, safe-stop, and anomalous-frame fallbacks; organized baseline and grouped ablations.',
      },
      result: {
        zh: '完成 10 次单 GPU 多随机种子复现。8 条路线中取得 7 组有效成对结果：平均 DS 由 37.50±21.88 提升至 65.02±5.47，RC 由 66.19 提升至 100.00，完整路线由 2/6 提升至 6/6，碰撞数由 9 降至 2；83/83 异常帧得到处理。',
        en: 'Completed 10 single-GPU multi-seed reproductions. Seven valid paired results across eight routes improved mean DS from 37.50±21.88 to 65.02±5.47, RC from 66.19 to 100.00, completed routes from 2/6 to 6/6, and collisions from 9 to 2; all 83 anomalous frames were handled.',
      },
      challenge: {
        zh: '必须同时保证协同语义不串车、单车退出后仍可控，并避免大模型异常输出直接进入执行链路。',
        en: 'The system must prevent cross-vehicle mixing, remain controllable after agent dropout, and keep anomalous model outputs from entering the control loop directly.',
      },
      solution: {
        zh: '以明确的车源标识、同车历史回退、轨迹合法性检查和强制安全停止形成分层防线，并用成对路线与消融结果核对收益。',
        en: 'Layered safeguards combine explicit vehicle identity, same-vehicle fallback, trajectory legality checks, and forced safe-stop, with paired-route and ablation evidence used to verify gains.',
      },
      current: {
        zh: '在研：继续扩展场景覆盖、复现稳定性与对照实验。',
        en: 'Ongoing: expanding scenario coverage, reproduction stability, and controlled comparisons.',
      },
    },
  },
  {
    id: 'zero-shot-spillage',
    slug: 'zero-shot-road-spillage',
    featured: true,
    emphasis: 'primary',
    title: {
      zh: '智能网联抛洒物零样本感知与预警系统',
      en: 'Zero-Shot Connected Road-Spillage Perception and Warning',
    },
    summary: {
      zh: '将开放词汇检测、道路语义分割与 C-V2X 预警连接成可运行系统，显著降低零样本抛洒物检测中的误报。',
      en: 'Connected open-vocabulary detection, road segmentation, and C-V2X warning into a working system that substantially reduced false positives in zero-shot spillage detection.',
    },
    category: { zh: '智能交通 · 视觉感知', en: 'Intelligent Transportation · Vision' },
    status: { zh: '已完成', en: 'Completed' },
    period: { zh: '2024.09 — 2025.09', en: 'Sep 2024 — Sep 2025' },
    role: {
      zh: '负责视觉算法方案、模型训练与指标评测，并参与 OBU、RSU、MEC 协同预警系统集成',
      en: 'Responsible for visual-algorithm design, model training, and metric evaluation, with system integration across OBU, RSU, and MEC components',
    },
    technologies: ['PyTorch', 'YOLO-World', 'CLIP', 'TwinLiteNet', 'C-V2X', 'OBU / RSU / MEC'],
    highlights: {
      zh: ['Precision 4.43% → 68.45%', 'F1 0.0835 → 0.6946', 'Recall 70.50%', '省级一等奖'],
      en: ['Precision: 4.43% → 68.45%', 'F1: 0.0835 → 0.6946', 'Recall: 70.50%', 'Provincial First Prize'],
    },
    details: {
      problem: {
        zh: '开放词汇模型能够发现未见类别，但在复杂道路背景中误报严重，且检测结果需要转化为对车辆真正有用的协同预警。',
        en: 'Open-vocabulary models can detect unseen categories but suffer heavy road-scene false positives, and detections must be translated into useful cooperative warnings.',
      },
      route: {
        zh: '以 YOLO-World 与 CLIP 提供开放词汇能力，用 TwinLiteNet 提取道路区域约束检测空间，再通过 C-V2X 传播风险信息。',
        en: 'Use YOLO-World and CLIP for open-vocabulary capability, constrain detection with TwinLiteNet road segmentation, then propagate risk through C-V2X.',
      },
      system: {
        zh: '道路图像 → 语义分割 → 开放词汇检测 → 道路区域过滤 → 风险生成 → OBU / RSU / MEC 协同预警。',
        en: 'Road image → semantic segmentation → open-vocabulary detection → road-region filtering → risk generation → OBU / RSU / MEC warning.',
      },
      implementation: {
        zh: '完成模型组合、道路区域约束、训练评测与端到端系统联调，将识别结果接入智能网联预警链路。',
        en: 'Implemented model composition, road-region constraints, training and evaluation, and end-to-end integration with the connected warning pipeline.',
      },
      result: {
        zh: 'Precision 从 4.43% 提升至 68.45%，F1 从 0.0835 提升至 0.6946，Recall 达 70.50%；项目获第二届甘肃省大学生交通运输科技大赛一等奖，并产出 DIONet SCI 论文。',
        en: 'Precision improved from 4.43% to 68.45%, F1 from 0.0835 to 0.6946, with 70.50% recall. The project received a provincial first prize and contributed to the DIONet SCI paper.',
      },
      challenge: {
        zh: '零样本检测的高召回往往伴随大量路外误报，单纯提高阈值会损失未知障碍物发现能力。',
        en: 'High recall in zero-shot detection often brings many off-road false positives, while simply raising thresholds sacrifices unseen-obstacle coverage.',
      },
      solution: {
        zh: '用道路语义分割建立空间先验，把“是否为障碍物”和“是否位于有效道路区域”联合判断。',
        en: 'Road segmentation provides a spatial prior so obstacle identity and valid-road location are evaluated jointly.',
      },
      current: { zh: '已完成算法评测、系统集成与竞赛验证。', en: 'Algorithm evaluation, system integration, and competition validation completed.' },
    },
  },
  {
    id: 'dionet',
    slug: 'dionet-low-light-detection',
    featured: true,
    emphasis: 'secondary',
    title: { zh: 'DIONet 低照度道路障碍物实时检测', en: 'DIONet for Real-Time Low-Light Road-Obstacle Detection' },
    summary: {
      zh: '面向夜间与低照度道路场景设计多尺度特征融合网络，并在 SAS 数据集和 PIXKIT2.0 车辆平台上完成评测与部署实践。',
      en: 'Designed a multi-scale feature-fusion network for night and low-light road scenes, with evaluation on SAS and deployment practice on a PIXKIT2.0 vehicle.',
    },
    category: { zh: '视觉算法 · 车载部署', en: 'Vision Algorithm · Vehicle Deployment' },
    status: { zh: '论文已发表', en: 'Paper Published' },
    period: { zh: '2024.09 — 2025.09', en: 'Sep 2024 — Sep 2025' },
    role: {
      zh: '参与网络设计、消融实验、数据集评测与车辆端部署验证',
      en: 'Contributed to network design, ablations, dataset evaluation, and vehicle-side deployment validation',
    },
    technologies: ['PyTorch', 'YOLO', 'Transformer', 'AIFI', 'Inner-IoU', 'PIXKIT2.0'],
    highlights: {
      zh: ['mAP@50 93.5%', 'mAP@50:95 65.9%', 'IEEE Sensors Journal 2025', '车辆端部署实践'],
      en: ['mAP@50: 93.5%', 'mAP@50:95: 65.9%', 'IEEE Sensors Journal 2025', 'Vehicle-side deployment'],
    },
    details: {
      problem: { zh: '低照度条件会同时削弱目标纹理、边缘和尺度特征，使道路障碍物检测更容易漏检。', en: 'Low illumination weakens texture, edges, and multi-scale cues, increasing missed detections for road obstacles.' },
      route: { zh: '围绕多尺度 Transformer、频率自适应空洞卷积、AIFI 与 Inner-IoU 改进特征融合和定位能力。', en: 'Improve feature fusion and localization through a multi-scale Transformer, frequency-adaptive dilated convolution, AIFI, and Inner-IoU.' },
      system: { zh: '低照度图像 → 多尺度特征提取 → 自适应融合 → 障碍物检测 → SAS 评测 → PIXKIT2.0 部署验证。', en: 'Low-light image → multi-scale features → adaptive fusion → obstacle detection → SAS evaluation → PIXKIT2.0 deployment validation.' },
      implementation: { zh: '完成网络模块组合、训练与消融设计，并将检测链路迁移到车辆计算平台进行实时场景验证。', en: 'Integrated network modules, training, and ablations, then moved the detection pipeline to a vehicle compute platform for real-scene validation.' },
      result: { zh: '在 SAS 数据集上达到 mAP@50 93.5%、mAP@50:95 65.9%；论文发表于 IEEE Sensors Journal（2025）。', en: 'Achieved 93.5% mAP@50 and 65.9% mAP@50:95 on SAS; published in IEEE Sensors Journal (2025).' },
      challenge: { zh: '提升弱光目标特征的同时，需要控制模型复杂度并保持实时检测能力。', en: 'The model must strengthen weak-light features while controlling complexity and preserving real-time detection.' },
      solution: { zh: '以多尺度融合和选择性模块增强有效特征，并通过消融与车辆端验证检查精度—效率平衡。', en: 'Multi-scale fusion and selective modules strengthen useful cues, while ablations and vehicle-side validation check the accuracy–efficiency trade-off.' },
      current: { zh: '研究与论文已完成，保留车辆端部署与算法复现经验。', en: 'Research and publication completed, with reusable experience in deployment and reproduction.' },
    },
  },
  {
    id: 'ros-logistics',
    slug: 'ros-mobile-manipulator-logistics',
    featured: true,
    emphasis: 'secondary',
    title: { zh: 'ROS 移动机械臂智能物流系统', en: 'ROS Mobile-Manipulator Intelligent Logistics System' },
    summary: {
      zh: '在 Jetson Nano 与 ROS Noetic 上完成移动底盘、ArUco 定位、PyMyCobot 抓取和串口控制的全流程闭环。',
      en: 'Integrated a mobile base, ArUco localization, PyMyCobot grasping, and serial control into an end-to-end loop on Jetson Nano and ROS Noetic.',
    },
    category: { zh: '机器人系统工程', en: 'Robotics Systems Engineering' },
    status: { zh: '进行中', en: 'Ongoing' },
    period: { zh: '2026.06 — 2026.09', en: 'Jun 2026 — Sep 2026' },
    role: {
      zh: '负责 ROS 节点与 Launch 链路、视觉定位、机械臂动作规划、串口联调和闭环测试',
      en: 'Responsible for ROS nodes and launch flows, visual localization, manipulator motion planning, serial integration, and closed-loop testing',
    },
    technologies: ['Jetson Nano', 'ROS Noetic', 'PyMyCobot', 'ArUco', 'LiDAR', 'Serial'],
    highlights: {
      zh: ['20 次全流程闭环测试', '任务完成率 85%', '抓取成功率 90%', '目标定位误差 ≤ 5 cm'],
      en: ['20 end-to-end closed-loop tests', '85% task completion', '90% grasp success', 'Target localization error ≤ 5 cm'],
    },
    details: {
      problem: { zh: '移动、定位、识别、抓取和通信需要跨多个 ROS 节点与硬件统一协作，任何一环漂移都会导致任务失败。', en: 'Mobility, localization, recognition, grasping, and communication span multiple ROS nodes and devices; drift in any stage can fail the task.' },
      route: { zh: '以任务状态机组织导航与抓取，使用 ArUco 完成目标定位，并通过串口与机械臂控制接口执行动作。', en: 'Coordinate navigation and grasping with a task state machine, localize targets through ArUco, and execute motions through serial and manipulator control interfaces.' },
      system: { zh: '激光导航 → ArUco 识别 → 目标坐标转换 → 机械臂规划 → 抓取与搬运 → 状态回传。', en: 'LiDAR navigation → ArUco recognition → target transform → manipulator planning → grasp and transport → state feedback.' },
      implementation: { zh: '配置 ROS Noetic 节点、Topic、Service 与 Launch；联调 Jetson Nano、PyMyCobot、激光雷达和串口设备；组织 20 次端到端测试。', en: 'Configured ROS Noetic nodes, topics, services, and launch files; integrated Jetson Nano, PyMyCobot, LiDAR, and serial devices; ran 20 end-to-end tests.' },
      result: { zh: '20 次测试中任务完成率 85%、标记识别率 95%、抓取成功率 90%、目标定位误差不超过 5 cm，平均任务时长约 120 秒。', en: 'Across 20 tests: 85% task completion, 95% marker recognition, 90% grasp success, target localization error within 5 cm, and about 120 seconds average task time.' },
      challenge: { zh: '坐标变换、机械臂可达性、串口状态与移动底盘到位条件相互耦合。', en: 'Coordinate transforms, manipulator reachability, serial state, and mobile-base arrival conditions are tightly coupled.' },
      solution: { zh: '通过分阶段预检、状态机兜底、坐标链核对和重复闭环测试定位并隔离问题。', en: 'Staged preflight checks, state-machine fallbacks, transform-chain validation, and repeated closed-loop tests isolate failures.' },
      current: { zh: '进行中：已形成量化闭环测试结果，继续优化系统稳定性。', en: 'Ongoing: quantified closed-loop results are available, with further stability work in progress.' },
    },
  },
  {
    id: 'der-nr',
    slug: 'der-nr-driver-emotion',
    featured: false,
    emphasis: 'secondary',
    title: { zh: 'DER-NR 真实场景驾驶员情绪鲁棒识别', en: 'DER-NR for Robust Real-World Driver Emotion Recognition' },
    summary: { zh: '面向噪声标注和复杂车内环境，构建结合 EMA 注意力、CoTAttention 与 DFNS 的抗噪情绪识别网络。', en: 'Built a noise-robust emotion-recognition network combining EMA attention, CoTAttention, and DFNS for noisy labels and complex in-cabin conditions.' },
    category: { zh: '驾驶员状态感知', en: 'Driver-State Perception' },
    status: { zh: '论文已发表', en: 'Paper Published' },
    period: { zh: '2025.03 — 2026.01', en: 'Mar 2025 — Jan 2026' },
    role: { zh: '参与网络模块设计、噪声鲁棒训练、跨数据集实验与论文工作', en: 'Contributed to module design, noise-robust training, cross-dataset experiments, and publication work' },
    technologies: ['PyTorch', 'EMA Attention', 'CoTAttention', 'DFNS', 'AffectNet', 'RAF-DB'],
    highlights: { zh: ['四个公开数据集', '较基线提升 1.20—9.84 个百分点', 'IEEE TCSS 2026'], en: ['Four public datasets', '1.20–9.84 pp over baselines', 'IEEE TCSS 2026'] },
    details: {
      problem: { zh: '真实驾驶员情绪数据存在遮挡、光照变化与噪声标签，常规模型容易记忆错误监督。', en: 'Real driver-emotion data includes occlusion, illumination shifts, and noisy labels that standard models can memorize.' },
      route: { zh: '融合 EMA 注意力、CoTAttention 与 DFNS，增强有效表情特征并抑制噪声样本影响。', en: 'Combine EMA attention, CoTAttention, and DFNS to strengthen useful expression cues and suppress noisy-sample influence.' },
      system: { zh: '驾驶员图像 → 多尺度注意力特征 → 噪声样本抑制 → 情绪分类 → 多数据集评测。', en: 'Driver image → multi-scale attentive features → noisy-sample suppression → emotion classification → multi-dataset evaluation.' },
      implementation: { zh: '在 RAF-DB、DEFE、KMU-FED 与 AffectNet 上开展统一训练、对照和跨数据集分析。', en: 'Conducted unified training, controls, and cross-dataset analysis on RAF-DB, DEFE, KMU-FED, and AffectNet.' },
      result: { zh: '在四个公开数据集上较基线提升 1.20—9.84 个百分点；论文发表于 IEEE Transactions on Computational Social Systems（2026）。', en: 'Improved over baselines by 1.20–9.84 percentage points across four public datasets; published in IEEE Transactions on Computational Social Systems (2026).' },
      challenge: { zh: '模型需要区分真实难样本和错误标签，避免在清洗噪声时损失少数类信息。', en: 'The model must distinguish genuinely hard samples from wrong labels without discarding minority-class information.' },
      solution: { zh: '通过注意力增强与动态噪声筛选协同建模，并用多数据集实验检查稳健性。', en: 'Attention enhancement and dynamic noise filtering are modeled jointly, with robustness checked across multiple datasets.' },
      current: { zh: '研究与论文已完成。', en: 'Research and publication completed.' },
    },
  },
];

export const featuredProjects = projects.filter((project) => project.featured);
export const additionalProjects = projects.filter((project) => !project.featured);
export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
