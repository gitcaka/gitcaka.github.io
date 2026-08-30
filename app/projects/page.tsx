import type { Metadata } from 'next';
import { ProjectsPage } from '@/components/pages/projects-page';
export const metadata: Metadata = {
  title: '项目 Projects',
  description:
    '曹武康在自动驾驶视觉感知、CARLA 闭环评测、C-V2X 协同智能与 ROS 机器人系统中的代表项目。',
};
export default function Page() {
  return <ProjectsPage />;
}
