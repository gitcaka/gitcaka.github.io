export const skillGroups = [
  {
    key: 'algorithms',
    title: { zh: '算法与视觉', en: 'Algorithms & Vision' },
    items: [
      'Python',
      'PyTorch',
      'CUDA',
      'YOLO / YOLO-World',
      'CNN / Transformer',
      'CLIP',
      'Multimodal Learning',
    ],
  },
  {
    key: 'autonomy',
    title: { zh: '自动驾驶与机器人', en: 'Autonomy & Robotics' },
    items: [
      'CARLA',
      'Autoware',
      'ROS Melodic / Noetic',
      'Gazebo / RViz',
      'ArUco',
      'C-V2X',
      'OBU / RSU / MEC',
    ],
  },
  {
    key: 'engineering',
    title: { zh: '工程与部署', en: 'Engineering & Deployment' },
    items: [
      'Linux / Ubuntu',
      'Conda',
      'Git',
      'GPU Server Deployment',
      'TCP/IP / UDP',
      'Jetson Nano',
      'System Integration',
    ],
  },
] as const;
