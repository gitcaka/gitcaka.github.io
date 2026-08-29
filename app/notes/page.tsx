import type { Metadata } from 'next';
import { NotesPage } from '@/components/pages/notes-page';
export const metadata: Metadata = {
  title: '笔记 Notes',
  description:
    '用于整理协同感知、自动驾驶、ROS、嵌入式、仿真与部署的真实技术记录。',
};
export default function Page() {
  return <NotesPage />;
}
