import type { Project } from './types';

export const projects: Project[] = [
  {
    id: 'coop-llm',
    slug: 'llm-cooperative-perception',
    featured: true,
    emphasis: 'primary',
    title: {
      zh: '视距受限下大模型驱动的协同感知方法研究',
      en: 'LLM-Driven Cooperative Perception under Limited Visibility',
    },
    summary: {
      zh: '围绕遮挡场景下的 V2V 协同感知，探索由多模态大模型提供语义先验，并用可观测证据约束其影响。',
      en: 'Investigating V2V cooperative perception under occlusion, where multimodal models provide semantic priors whose influence remains constrained by observable evidence.',
    },
    category: { zh: '研究生在研课题', en: 'Graduate Research Project' },
    status: { zh: '在研', en: 'Ongoing' },
    role: {
      zh: '负责问题定义、方法设计、代码实现、实验设计与消融验证规划',
      en: 'Responsible for problem formulation, method design, implementation, experiment design, and ablation planning',
    },
    technologies: [
      'OpenCOOD',
      'V2X',
      'PyTorch',
      'Vision-Language Models',
      'CARLA',
    ],
    highlights: {
      zh: [
        '视距受限与遮挡场景',
        'V2V 信息选择与可靠性',
        '语义先验、软偏置与证据约束',
      ],
      en: [
        'Limited visibility and occlusion',
        'V2V information selection and reliability',
        'Semantic priors, soft biases, and evidence constraints',
      ],
    },
    details: {
      problem: {
        zh: '单车传感器在遮挡场景中存在不可恢复的视野缺失；直接共享全部信息又会带来通信负担和不可靠证据。',
        en: 'Single-vehicle sensors have irrecoverable blind spots under occlusion, while sharing everything creates communication overhead and can introduce unreliable evidence.',
      },
      route: {
        zh: '从协同感知基线出发，定位通信区域选择与融合环节，探索大模型语义建议作为受约束先验的接入方式。',
        en: 'Starting from a cooperative-perception baseline, the work targets communication-region selection and fusion, then studies how model-generated semantic guidance can enter as a constrained prior.',
      },
      system: {
        zh: '多车观测 → 特征编码 → 通信信息选择 → 证据约束语义提示 → 协同融合 → 感知输出。',
        en: 'Multi-agent observations → feature encoding → communication selection → evidence-grounded semantic guidance → cooperative fusion → perception output.',
      },
      implementation: {
        zh: '围绕可复现基线设计清晰插入点，并规划通信预算匹配、无信息泄漏训练与分组消融。',
        en: 'The implementation is organized around a reproducible baseline, with explicit insertion points, matched communication budgets, leakage controls, and grouped ablations.',
      },
      result: {
        zh: '当前处于方法设计与实验准备阶段；尚不公开未经验证的性能结论。',
        en: 'The project is currently in method-design and experiment-preparation stages; no unverified performance claims are published.',
      },
      challenge: {
        zh: '大模型语义可能脱离传感器证据，同时协同收益也容易与通信开销混杂。',
        en: 'Model semantics may drift away from sensor evidence, and cooperative gains can be confounded by communication cost.',
      },
      solution: {
        zh: '通过证据门控、软偏置和匹配通信预算的对照实验，限制语义建议的作用范围并验证真实贡献。',
        en: 'Evidence gating, soft biases, and matched-budget controls bound the effect of semantic guidance and isolate its real contribution.',
      },
      current: {
        zh: '在研：方法设计、实验链路搭建与消融方案准备。',
        en: 'Ongoing: method design, experiment-pipeline setup, and ablation planning.',
      },
    },
  },
  {
    id: 'diffusion-drive',
    slug: 'language-guided-diffusion-drive',
    featured: true,
    emphasis: 'primary',
    title: {
      zh: '语言引导的 DiffusionDrive 轨迹规划探索',
      en: 'Language-Guided DiffusionDrive Exploration',
    },
    summary: {
      zh: '复现生成式轨迹规划流程，探索把大模型建议作为低维语义先验，对基础轨迹进行受约束的残差修正。',
      en: 'Reproducing a generative trajectory-planning pipeline and exploring constrained residual corrections guided by low-dimensional language priors.',
    },
    category: {
      zh: '自动驾驶轨迹规划研究',
      en: 'Autonomous-Driving Planning Research',
    },
    status: { zh: '复现与方案探索', en: 'Reproduction & Exploration' },
    role: {
      zh: '负责方法复现、评测流程理解与语义先验接入方案探索',
      en: 'Responsible for method reproduction, evaluation-pipeline analysis, and semantic-prior integration exploration',
    },
    technologies: [
      'DiffusionDrive',
      'NAVSIM',
      'PyTorch',
      'Trajectory Planning',
    ],
    highlights: {
      zh: [
        '基础轨迹生成',
        '低维语义先验',
        '轨迹残差修正',
        '开环评测与闭环计划',
      ],
      en: [
        'Base trajectory generation',
        'Low-dimensional semantic priors',
        'Trajectory residual correction',
        'Open-loop evaluation and closed-loop plan',
      ],
    },
    details: {
      problem: {
        zh: '连续轨迹生成需要保持几何与动态可行性，而语言建议是离散、高层且可能不稳定的。',
        en: 'Continuous trajectory generation must preserve geometric and dynamic feasibility, while language suggestions are discrete, high-level, and potentially unstable.',
      },
      route: {
        zh: '先复现基础轨迹生成与评测，再把语言建议压缩为低维条件，限制其仅对轨迹残差产生影响。',
        en: 'First reproduce base generation and evaluation, then compress language guidance into low-dimensional conditions whose influence is limited to trajectory residuals.',
      },
      system: {
        zh: '场景输入 → DiffusionDrive 基础轨迹 → 语义先验 → 残差修正 → 可行性约束 → 评测。',
        en: 'Scene input → DiffusionDrive base trajectory → semantic prior → residual correction → feasibility constraints → evaluation.',
      },
      implementation: {
        zh: '围绕 NAVSIM 或相关评测流程梳理数据、轨迹表示与指标接口，预留未来闭环验证边界。',
        en: 'The implementation maps data, trajectory representations, and metric interfaces in NAVSIM or related evaluation flows while preserving a clear boundary for future closed-loop testing.',
      },
      result: {
        zh: '目前为复现和方案探索；尚未完成完整闭环，也未确认指标提升。',
        en: 'Currently in reproduction and design exploration; complete closed-loop validation and metric gains have not been confirmed.',
      },
      challenge: {
        zh: '语言条件如何影响轨迹而不破坏基础规划器的稳定性。',
        en: 'The key challenge is letting language conditions influence trajectories without destabilizing the base planner.',
      },
      solution: {
        zh: '采用低维条件、残差幅度限制与分阶段评测，将语义影响控制在可分析范围内。',
        en: 'Low-dimensional conditioning, bounded residual magnitudes, and staged evaluation keep semantic influence analyzable.',
      },
      current: {
        zh: '复现与方案探索；计划先完成开环评测，再进入闭环验证。',
        en: 'Reproduction and exploration; the plan is to complete open-loop evaluation before closed-loop validation.',
      },
    },
  },
  {
    id: 'highway-risk',
    slug: 'highway-spillage-risk-platform',
    featured: true,
    emphasis: 'primary',
    title: {
      zh: '高速公路网抛洒物源头治理与风险预估系统',
      en: 'Highway Spillage Source Control and Risk Estimation System',
    },
    summary: {
      zh: '识别货运车辆类型、篷布遮盖与环境因素，在 Web 云平台中形成路段风险画像，并结合 C-V2X 进行预警。',
      en: 'Identifying freight-vehicle types, tarpaulin coverage, and environmental factors to profile road-segment risk on a web platform and issue C-V2X warnings.',
    },
    category: {
      zh: '智能交通工程系统',
      en: 'Intelligent-Transportation Engineering System',
    },
    status: { zh: '持续推进', en: 'Ongoing' },
    period: { zh: '2023.12 — 至今', en: 'Dec 2023 — Present' },
    role: {
      zh: '参与数据集制作与目标检测训练；负责 Vue、Flask Web 云平台；参与小程序设计开发',
      en: 'Contributed to dataset creation and detector training; led the Vue/Flask web platform; contributed to mini-program design and development',
    },
    technologies: [
      'Deep Learning',
      'Object Detection',
      'Vue',
      'Flask',
      'C-V2X',
    ],
    highlights: {
      zh: [
        '货运车辆与篷布状态识别',
        '路段风险画像与评估',
        'C-V2X 高风险预警',
        '交通运输科技大赛国家三等奖',
      ],
      en: [
        'Freight-vehicle and tarpaulin-state recognition',
        'Road-segment risk profiling',
        'C-V2X high-risk warning',
        'National Third Prize, Transportation Science and Technology Competition',
      ],
    },
    details: {
      problem: {
        zh: '高速公路抛洒物风险需要从事后处置转向对货运车辆、遮盖状态与环境因素的源头识别和路段预估。',
        en: 'Highway spillage risk calls for a shift from post-event response toward source-level identification of freight vehicles, cover states, environmental factors, and segment-level estimation.',
      },
      route: {
        zh: '制作数据集并训练目标检测模型，将识别结果与环境信息汇入 Web 平台形成风险画像，再通过 C-V2X 提供预警。',
        en: 'Build a dataset and train a detector, combine recognition outputs with environmental information in a web risk-profiling platform, then provide warnings through C-V2X.',
      },
      system: {
        zh: '数据采集与标注 → 目标检测 → 风险特征汇聚 → Web 云平台 → 路段风险画像 → C-V2X 预警。',
        en: 'Data collection and annotation → object detection → risk-feature aggregation → web platform → road-segment risk profile → C-V2X warning.',
      },
      implementation: {
        zh: '参与数据集与算法训练，并负责 Vue 与 Flask 构成的云平台界面、接口和风险展示链路。',
        en: 'Contributed to dataset and model training, and built the Vue/Flask platform interface, APIs, and risk-visualization flow.',
      },
      result: {
        zh: '形成可运行的风险预估与预警系统，并获交通运输科技大赛国家三等奖。',
        en: 'Delivered a working risk-estimation and warning system that received a National Third Prize in the Transportation Science and Technology Competition.',
      },
      challenge: {
        zh: '需要把算法输出、环境因素和路段风险表达连接为可理解的工程流程。',
        en: 'The challenge was connecting model outputs, environmental factors, and road-segment risk into an understandable engineering workflow.',
      },
      solution: {
        zh: '通过分层数据结构与 Web 可视化，把识别结果转化为可追踪的风险特征与预警入口。',
        en: 'Layered data structures and web visualization translated recognition outputs into traceable risk features and warning entry points.',
      },
      current: {
        zh: '2023.12 至今，持续推进。',
        en: 'Ongoing since December 2023.',
      },
    },
  },
  {
    id: 'apollo',
    slug: 'apollo-planning-strategy',
    featured: true,
    emphasis: 'secondary',
    title: {
      zh: 'Apollo 自动驾驶规划策略优化',
      en: 'Apollo Planning-Strategy Optimization',
    },
    summary: {
      zh: '围绕交通灯、红灯停车与右转、多车道变道等具体任务，定位并修改 Apollo 9.0 规划规则与场景状态机。',
      en: 'Locating and modifying Apollo 9.0 planning rules and scenario state machines for traffic lights, red-light stopping and turning, and multi-lane maneuvers.',
    },
    category: {
      zh: '自动驾驶竞赛与规划系统实践',
      en: 'Autonomous-Driving Competition & Planning Practice',
    },
    status: { zh: '仿真实践', en: 'Simulation Practice' },
    role: {
      zh: '负责场景分析、规划规则定位、代码修改与仿真验证',
      en: 'Responsible for scenario analysis, planning-rule localization, code changes, and simulation validation',
    },
    technologies: ['Apollo 9.0', 'C++', 'Planning', 'Simulation'],
    highlights: {
      zh: [
        '交通灯场景状态机',
        '红灯停车距离与右转逻辑',
        '多车道变道与右转任务',
      ],
      en: [
        'Traffic-light scenario state machines',
        'Red-light stop distance and right-turn logic',
        'Multi-lane lane-change and turn tasks',
      ],
    },
    details: {
      problem: {
        zh: '竞赛仿真中的具体交通场景需要理解大型规划系统的规则、状态和任务切换逻辑。',
        en: 'Specific competition-simulation scenarios required understanding rules, states, and task transitions in a large planning system.',
      },
      route: {
        zh: '从场景复现和规划输出入手，沿配置、规则与状态机定位行为来源，再做小范围修改。',
        en: 'Starting from scenario reproduction and planner outputs, trace behavior through configuration, rules, and state machines, then apply scoped changes.',
      },
      system: {
        zh: '仿真场景 → 感知与地图状态 → 场景状态机 → 交通规则 → 轨迹规划 → 仿真验证。',
        en: 'Simulation scene → perception/map state → scenario state machine → traffic rules → trajectory planning → simulation validation.',
      },
      implementation: {
        zh: '围绕 Apollo 9.0 规划模块阅读代码，修改红灯停车距离、红灯右转及多车道任务相关策略。',
        en: 'Read and modified Apollo 9.0 planning code around red-light stopping distance, right-turn behavior, and multi-lane tasks.',
      },
      result: {
        zh: '在仿真环境中完成面向竞赛场景的规则修改与验证；不等同于真实道路量产能力。',
        en: 'Completed rule changes and validation for competition scenarios in simulation; this does not imply production-road capability.',
      },
      challenge: {
        zh: '规划行为由配置、规则与状态机共同决定，单点修改容易产生连锁影响。',
        en: 'Planner behavior emerges from configuration, rules, and state machines, so isolated edits can have cascading effects.',
      },
      solution: {
        zh: '通过场景级复现、调用链跟踪和逐项回归，缩小修改边界并验证行为变化。',
        en: 'Scenario-level reproduction, control-flow tracing, and incremental regression checks kept changes scoped and observable.',
      },
      current: {
        zh: '已完成相关竞赛仿真场景实践。',
        en: 'Relevant competition-simulation practice completed.',
      },
    },
  },
  {
    id: 'ros2-grasp',
    slug: 'ros2-mobile-manipulation',
    featured: true,
    emphasis: 'secondary',
    title: {
      zh: 'ROS 2 移动机器人与机械臂视觉抓取',
      en: 'ROS 2 Mobile Manipulation and Visual Grasping',
    },
    summary: {
      zh: '打通移动底盘、ArUco 识别、TF 变换、MoveIt 2 规划、末端运动与夹爪控制的完整链路。',
      en: 'Integrating a mobile base, ArUco perception, TF transforms, MoveIt 2 planning, end-effector motion, and gripper control.',
    },
    category: {
      zh: '机器人系统工程实践',
      en: 'Robotic-System Engineering Practice',
    },
    status: { zh: '系统联调', en: 'System Integration' },
    role: {
      zh: '负责定位问题、运动链路实现、机器人系统调试与软硬件联调',
      en: 'Responsible for fault localization, motion-pipeline implementation, robot debugging, and hardware–software integration',
    },
    technologies: [
      'ROS 2 Humble',
      'MoveIt 2',
      'ArUco',
      'TF',
      'Python',
      'Robotics',
    ],
    highlights: {
      zh: [
        '视觉识别与 TF 坐标变换',
        '机械臂规划与末端控制',
        '导航、识别与抓取联动',
      ],
      en: [
        'Visual recognition and TF transforms',
        'Manipulator planning and end-effector control',
        'Navigation–perception–grasp coordination',
      ],
    },
    details: {
      problem: {
        zh: '移动机器人需要在导航后稳定识别目标，并把视觉坐标可靠传递到机械臂规划与夹爪执行。',
        en: 'A mobile robot must reliably recognize a target after navigation and carry visual coordinates through manipulator planning to gripper execution.',
      },
      route: {
        zh: '分段验证视觉、TF、规划、末端运动和夹爪控制，再把各环节接入统一任务流程。',
        en: 'Validate perception, TF, planning, end-effector motion, and gripper control separately before connecting them into one task flow.',
      },
      system: {
        zh: '视觉识别 → 坐标变换 → 机械臂规划 → 末端运动 → 夹爪闭合 → 抓取验证。',
        en: 'Visual recognition → coordinate transform → manipulator planning → end-effector motion → gripper close → grasp validation.',
      },
      implementation: {
        zh: '使用 ROS 2 Humble、MoveIt 2、ArUco 与 TF，完成移动底盘和机械臂的任务联动。',
        en: 'Used ROS 2 Humble, MoveIt 2, ArUco, and TF to coordinate the mobile base and manipulator.',
      },
      result: {
        zh: '形成从导航、识别到抓取验证的完整系统链路。',
        en: 'Established an end-to-end system flow from navigation and recognition to grasp validation.',
      },
      challenge: {
        zh: '坐标系、时序、机械臂可达性与真实硬件误差会共同影响抓取结果。',
        en: 'Coordinate frames, timing, manipulator reachability, and physical hardware error jointly affect grasp outcomes.',
      },
      solution: {
        zh: '通过 TF 链路核对、分阶段预检、可达位姿筛选与软硬件联合调试逐项消除问题。',
        en: 'TF-chain checks, staged preflight validation, reachable-pose screening, and joint hardware–software debugging isolated each issue.',
      },
      current: {
        zh: '已完成机器人系统工程实践与链路验证。',
        en: 'Robotic-system engineering practice and pipeline validation completed.',
      },
    },
  },
  {
    id: 'embedded',
    slug: 'embedded-sensor-systems',
    featured: false,
    emphasis: 'secondary',
    title: {
      zh: '嵌入式与传感器系统实践',
      en: 'Embedded and Sensor-System Practice',
    },
    summary: {
      zh: '围绕 STM32、MPU6050、I²C、CAN 与平衡车控制，完成寄存器通信、信号分析和底层控制实践。',
      en: 'Hands-on work with STM32, MPU6050, I²C, CAN, balance control, register communication, and signal analysis.',
    },
    category: { zh: '更多工程实践', en: 'Additional Engineering Work' },
    status: { zh: '工程实践', en: 'Engineering Practice' },
    role: {
      zh: '参与底层通信、传感器调试、示波器分析与控制代码理解',
      en: 'Worked on low-level communication, sensor debugging, oscilloscope analysis, and control-code analysis',
    },
    technologies: ['STM32', 'MPU6050', 'I²C', 'CAN', 'Embedded C'],
    highlights: {
      zh: ['传感器寄存器与 I²C', '示波器信号分析', '平衡车控制与 CAN'],
      en: [
        'Sensor registers and I²C',
        'Oscilloscope signal analysis',
        'Balance control and CAN',
      ],
    },
    details: {
      problem: {
        zh: '传感器、总线和控制环之间的问题需要从电气信号、寄存器配置与中断执行路径共同定位。',
        en: 'Issues across sensors, buses, and control loops must be localized through electrical signals, register configuration, and interrupt execution paths.',
      },
      route: {
        zh: '从硬件信号和通信时序入手，核对寄存器读写，再追踪控制与执行链路。',
        en: 'Start with physical signals and bus timing, verify register access, then trace the control and actuation path.',
      },
      system: {
        zh: '传感器 → I²C / CAN → MCU 中断与控制 → PWM / 执行器 → 状态反馈。',
        en: 'Sensor → I²C / CAN → MCU interrupt and control → PWM / actuator → state feedback.',
      },
      implementation: {
        zh: '涉及 STM32、MPU6050、I²C、CAN、示波器分析和平衡车控制代码。',
        en: 'Covered STM32, MPU6050, I²C, CAN, oscilloscope analysis, and balance-control code.',
      },
      result: {
        zh: '完成相关嵌入式与传感器系统实践。',
        en: 'Completed the associated embedded and sensor-system exercises.',
      },
      challenge: {
        zh: '同一故障可能来自硬件连接、时序、寄存器或控制逻辑。',
        en: 'The same symptom may originate in wiring, timing, registers, or control logic.',
      },
      solution: {
        zh: '按物理层、通信层和控制层分层检查，并用示波器与代码调用链相互验证。',
        en: 'Layered checks across physical, communication, and control layers, cross-validating oscilloscope evidence with code paths.',
      },
      current: {
        zh: '作为辅助工程能力展示。',
        en: 'Presented as supporting engineering experience.',
      },
    },
  },
];

export const featuredProjects = projects.filter((project) => project.featured);
export const additionalProjects = projects.filter(
  (project) => !project.featured,
);
export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
