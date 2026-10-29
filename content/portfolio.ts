export const resumeUpdated = '2026-10-09';
export const githubUrl = 'https://github.com/gitcaka';
export const portfolioWork = [
  {
    id: 'highway',
    category: 'web',
    title: { zh: '高速云眼', en: 'Highway Vision' },
    subtitle: 'HIGHWAY VISION DASHBOARD',
    description: {
      zh: '从道路流量到风险趋势，让复杂交通数据成为清晰的可视化界面。',
      en: 'Turning traffic flow and risk trends into a clear visual interface.',
    },
    tags: ['Flask', 'ECharts', 'ES Modules'],
    repo: 'HighwayVisionDashboard',
    demo: 'https://gitcaka.github.io/HighwayVisionDashboard/',
    image: '/media/highway.png',
    accent: 'mint',
  },
  {
    id: 'helmet',
    category: 'vision',
    title: { zh: '头盔佩戴检测平台', en: 'Helmet Vision Platform' },
    subtitle: 'COMPUTER VISION / WEB',
    description: {
      zh: '整合目标检测、视频监测与数据看板，连接视觉算法和业务界面。',
      en: 'A visual interface connecting detection, video monitoring, and analytics.',
    },
    tags: ['Vue 3', 'Flask', 'Socket.IO'],
    repo: 'helmet-vision-platform',
    demo: 'https://gitcaka.github.io/helmet-vision-platform/',
    image: '/media/helmet.png',
    accent: 'violet',
  },
  {
    id: 'stream',
    category: 'vision',
    title: { zh: '视界流 · 视频工作台', en: 'Vision Stream Studio' },
    subtitle: 'VIDEO / AI WORKSPACE',
    description: {
      zh: '面向摄像头、RTSP 视频流和 AI 视觉结果的统一工作台。',
      en: 'A unified workspace for cameras, RTSP streams, and AI vision outputs.',
    },
    tags: ['OpenCV', 'FFmpeg', 'Flask'],
    repo: 'vision-stream-studio',
    demo: 'https://gitcaka.github.io/vision-stream-studio/',
    image: '/media/stream.png',
    accent: 'blue',
  },
  {
    id: 'vru',
    category: 'web',
    title: { zh: '弱势交通参与者预警平台', en: 'VRU Safety Cloud' },
    subtitle: 'V2X / SAFETY PLATFORM',
    description: {
      zh: '展示车路云协同感知、交通风险态势与预警联动。',
      en: 'Visualizing cooperative perception, road risk, and warning coordination.',
    },
    tags: ['V2X', 'Visualization', 'Web'],
    repo: 'vru-safety-cloud-platform',
    demo: 'https://gitcaka.github.io/vru-safety-cloud-platform/',
    image: '/media/vru.png',
    accent: 'mint',
  },
] as const;

export const resumeProjects = [
  {
    title: {
      zh: '多模态大模型协同感知与轨迹规划',
      en: 'Multimodal Cooperative Perception & Planning',
    },
    period: '2025.10 — Present',
    tags: 'CARLA · Qwen3-VL-8B · PyTorch · LangCoop',
    body: {
      zh: '构建语义顾问、风险融合、速度规划、低层控制与独立安全盾链路，完成 10 轮单卡多种子复现，8 条路线取得 7 组有效配对。',
      en: 'Built semantic advice, risk fusion, speed planning, control, and an independent safety shield; completed 10 multi-seed reproductions with 7 valid route pairs from 8 routes.',
    },
    result: {
      zh: 'DS 37.50±21.88 → 65.02±5.47；RC 66.19% → 100%；碰撞 9 → 2。4 轮冻结条件下速度顾问 ON/OFF 双重复实验中，固定场景安全盾停止占用均值 618 → 522 step，路线推进未下降，均零碰撞。',
      en: 'DS 37.50±21.88 → 65.02±5.47; RC 66.19% → 100%; collisions 9 → 2. In four rounds of frozen-condition speed-advisor ON/OFF experiments with two repeats, fixed-scenario mean shield-stop occupancy fell from 618 to 522 steps with no reduced route progress and no collisions.',
    },
  },
  {
    title: {
      zh: 'ROS 移动机械臂智能物流系统',
      en: 'ROS Mobile Manipulator Logistics',
    },
    period: '2026.06 — 2026.09',
    tags: 'Jetson Nano · ROS Noetic · ArUco · myAGV',
    body: {
      zh: '打通导航、精定位、识别、吸取、搬运与放置；实现笛卡尔/关节空间双分支抓取，以及可达性校验、超时重试和异常关泵。',
      en: 'Integrated navigation, precise localization, recognition, grasping, transport, and placement, with dual-space motion planning and fault handling.',
    },
    result: {
      zh: '20 组闭环测试，9 组实机观测标定，拟合 RMSE 0.63 mm；完成约 80 mm 横向偏移快递吸取及后备箱投放，4/4 边界测试通过。',
      en: '20 closed-loop test groups; 9 calibration observations; 0.63 mm fitting RMSE. Demonstrated pickup and trunk delivery at approximately 80 mm lateral offset; passed all 4 planner boundary tests.',
    },
  },
  {
    title: {
      zh: '多平台自动驾驶闭环仿真与评测',
      en: 'Multi-Platform Closed-Loop Driving Evaluation',
    },
    period: '2026.06 — 2026.09',
    tags: 'CARLA 0.9.15 · Bench2Drive · DriveTransformer · DriverSim',
    body: {
      zh: '独立搭建 DriverSim 与 CARLA/Bench2Drive 两套评测环境，适配 TransFuser++、DriveTransformer 与多传感器、导航、控制接口，组织批评测、日志与环境恢复。',
      en: 'Built DriverSim and CARLA/Bench2Drive evaluation environments, integrating TransFuser++, DriveTransformer, sensor interfaces, navigation, control, batch runs, and recovery.',
    },
    result: {
      zh: '完成两平台模型闭环验证、Town12/13 与路线配置；测得 RTX 3090 单卡 1.38 FPS、0.074× 实时速度的计算瓶颈。',
      en: 'Validated model loops on both platforms and configured Town12/13 and routes. Measured a single-RTX-3090 bottleneck at 1.38 FPS and 0.074× real time.',
    },
  },
  {
    title: {
      zh: 'STM32 多传感器两轮自平衡小车',
      en: 'STM32 Multi-Sensor Self-Balancing Robot',
    },
    period: '2026.06 — 2026.09',
    tags: 'STM32F103RC · MPU6050 · PID · LiDAR',
    body: {
      zh: '5 ms 中断控制、卡尔曼姿态融合、平衡 PD/速度 PI、编码器反馈与 25 kHz PWM；构建前进、停稳、掉头、返程和避障状态机。',
      en: '5 ms interrupt control, Kalman orientation fusion, balance PD and speed PI, encoder feedback, 25 kHz PWM, and a travel/stop/turn/return/avoidance state machine.',
    },
    result: {
      zh: '200 Hz 控制闭环与 360° 雷达距离映射；完成平衡、启停调速、掉头实车验证及往返避障逻辑测试。',
      en: '200 Hz closed-loop control and 360° LiDAR mapping; validated balancing, speed control, stopping, turning, and return/avoidance logic.',
    },
  },
  {
    title: {
      zh: '抛洒物零样本感知与协同预警',
      en: 'Zero-Shot Spillage Perception & Warning',
    },
    period: '2024.09 — 2025.09',
    tags: 'YOLO-World · CLIP · TwinLiteNet · C-V2X',
    body: {
      zh: '用道路分割掩膜约束开放词汇检测，并连接 OBU、RSU、MEC 车路云风险信息共享。',
      en: 'Constrained open-vocabulary detection with road segmentation and connected risk sharing across OBU, RSU, and MEC.',
    },
    result: {
      zh: 'Precision 4.43% → 68.45%；F1 0.0835 → 0.6946；Recall 70.50%。',
      en: 'Precision 4.43% → 68.45%; F1 0.0835 → 0.6946; recall 70.50%.',
    },
  },
  {
    title: {
      zh: 'DIONet 低照度障碍物检测',
      en: 'DIONet Low-Light Obstacle Detection',
    },
    period: '2024.09 — 2025.09',
    tags: 'Transformer · AIFI · Inner-IoU · PIXKIT2.0',
    body: {
      zh: '融合多尺度 Transformer、频率自适应空洞卷积、AIFI 与 Inner-IoU，完成 SAS 数据集训练、对比、消融及车辆端部署。',
      en: 'Combined multi-scale Transformers, frequency-adaptive dilated convolution, AIFI, and Inner-IoU with SAS evaluation and vehicle-side deployment.',
    },
    result: {
      zh: 'mAP@50 93.5%；mAP@50:95 65.9%；IEEE Sensors Journal 2025 合著论文。',
      en: '93.5% mAP@50; 65.9% mAP@50:95; coauthored IEEE Sensors Journal paper, 2025.',
    },
  },
  {
    title: {
      zh: 'DER-NR 抗噪驾驶员情绪识别',
      en: 'DER-NR Noise-Robust Driver Emotion Recognition',
    },
    period: '2025.03 — 2026.01',
    tags: 'EMA · CoTAttention · DFNS · PyTorch',
    body: {
      zh: '围绕噪声标签、注意力特征与动态噪声筛选，在 RAF-DB、DEFE、KMU-FED 和 AffectNet 上进行训练与对照实验。',
      en: 'Studied noisy labels, attention features, and dynamic noise filtering on RAF-DB, DEFE, KMU-FED, and AffectNet.',
    },
    result: {
      zh: '多数据集与不同噪声条件下提升 1.20—9.84 个百分点；IEEE TCSS 2026 合著论文。',
      en: 'Improved by 1.20–9.84 percentage points across datasets and noise conditions; coauthored IEEE TCSS paper, 2026.',
    },
  },
];
