import type { Metadata } from 'next';
import { ResearchPage } from '@/components/pages/research-page';
export const metadata: Metadata = {
  title: '专业方向 Professional Focus',
  description:
    '曹武康面向自动驾驶感知、协同智能、仿真评测与机器人系统形成的岗位能力主线。',
};
export default function Page() {
  return <ResearchPage />;
}
