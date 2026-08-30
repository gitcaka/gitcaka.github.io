import type { Metadata } from 'next';
import { ExperiencePage } from '@/components/pages/experience-page';
export const metadata: Metadata = {
  title: '教育与经历 Education & Experience',
  description:
    '曹武康在重庆交通大学的交通运输硕士、交通设备与控制工程本科教育及自动驾驶与机器人项目经历。',
};
export default function Page() {
  return <ExperiencePage />;
}
