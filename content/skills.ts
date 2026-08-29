export const skillGroups = [
  {
    key: 'research',
    title: { zh: '研究方法', en: 'Research' },
    items: [
      'Cooperative Perception',
      'V2X',
      'Multimodal Learning',
      'Vision-Language Models',
      'Diffusion Models',
      'End-to-End Driving',
      'Trajectory Planning',
    ],
  },
  {
    key: 'systems',
    title: { zh: '系统与平台', en: 'Systems' },
    items: [
      'Apollo',
      'CARLA',
      'NAVSIM',
      'ROS 2',
      'MoveIt 2',
      'Docker',
      'Linux',
    ],
  },
  {
    key: 'engineering',
    title: { zh: '工程实现', en: 'Engineering' },
    items: [
      'Python',
      'C++',
      'PyTorch',
      'Vue',
      'Flask',
      'STM32',
      'CAN',
      'I²C',
      'Git',
    ],
  },
] as const;
