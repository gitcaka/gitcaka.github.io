export const roomObjects = [
  {
    id: 'resume',
    label: { zh: '桌上的简历', en: 'Résumé on the desk' },
    hint: { zh: '拿起来，认识一下我', en: 'Pick it up and get to know me' },
    kind: 'resume',
  },
  {
    id: 'screen',
    label: { zh: '作品显示器', en: 'Project monitor' },
    hint: {
      zh: '打开四个可以体验的 Web 作品',
      en: 'Explore four playable web projects',
    },
    kind: 'works',
  },
  {
    id: 'robot',
    label: { zh: 'ROS 物流机器人', en: 'ROS logistics robot' },
    hint: {
      zh: '导航、识别、抓取与搬运',
      en: 'Navigation, vision, grasping and delivery',
    },
    kind: 'project',
    slug: 'ros-mobile-manipulator-logistics',
  },
  {
    id: 'car',
    label: { zh: '协同驾驶小车', en: 'Cooperative driving car' },
    hint: {
      zh: '探索大模型与自动驾驶',
      en: 'Discover multimodal autonomous driving',
    },
    kind: 'project',
    slug: 'multimodal-cooperative-driving',
  },
  {
    id: 'camera',
    label: { zh: '低照度相机', en: 'Low-light camera' },
    hint: {
      zh: 'DIONet · 在暗处看得更清楚',
      en: 'DIONet · seeing clearly in the dark',
    },
    kind: 'project',
    slug: 'dionet-low-light-detection',
  },
  {
    id: 'rover',
    label: { zh: 'STM32 平衡小车', en: 'STM32 balancing robot' },
    hint: {
      zh: '200 Hz 控制与多传感器融合',
      en: '200 Hz control and sensor fusion',
    },
    kind: 'project',
    slug: 'stm32-self-balancing-robot',
  },
  {
    id: 'cone',
    label: { zh: '道路预警路锥', en: 'Road safety cone' },
    hint: {
      zh: '零样本抛洒物感知与预警',
      en: 'Zero-shot road-spillage detection',
    },
    kind: 'project',
    slug: 'zero-shot-road-spillage',
  },
  {
    id: 'map',
    label: { zh: '仿真地图', en: 'Simulation map' },
    hint: {
      zh: '走进 CARLA 与双平台评测',
      en: 'CARLA and two-platform evaluation',
    },
    kind: 'project',
    slug: 'closed-loop-driving-simulation',
  },
  {
    id: 'emotion',
    label: { zh: '情绪识别相框', en: 'Emotion recognition frame' },
    hint: {
      zh: 'DER-NR · 理解驾驶员的情绪',
      en: 'DER-NR · understanding driver emotions',
    },
    kind: 'project',
    slug: 'der-nr-driver-emotion',
  },
  {
    id: 'books',
    label: { zh: '论文与荣誉', en: 'Papers and awards' },
    hint: {
      zh: '翻开书架上的研究记录',
      en: 'Browse the records on my bookshelf',
    },
    kind: 'publications',
  },
  {
    id: 'contact',
    label: { zh: '联系名片', en: 'Contact card' },
    hint: {
      zh: '聊聊工作机会或有趣的项目',
      en: 'Talk about opportunities and ideas',
    },
    kind: 'contact',
  },
] as const;

export type RoomObjectId = (typeof roomObjects)[number]['id'];
export type RoomView = 'overview' | 'desk' | 'garage' | 'shelf';
export const findRoomObject = (id: RoomObjectId) =>
  roomObjects.find((item) => item.id === id)!;
