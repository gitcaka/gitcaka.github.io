import type { Metadata } from 'next';
import { ProjectsPage } from '@/components/pages/projects-page';
export const metadata: Metadata = {
  title: '项目 Projects',
  description:
    '曹武康在协同感知、自动驾驶规划、智能交通、Apollo 与 ROS 2 机器人系统中的代表项目。',
};
export default function Page() {
  return <ProjectsPage />;
}
