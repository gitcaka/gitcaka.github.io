import type { Metadata } from 'next';
import { AboutPage } from '@/components/pages/about-page';
export const metadata: Metadata = {
  title: '关于 About',
  description:
    '曹武康的个人简介、求职方向以及自动驾驶算法、闭环评测和机器人系统工程能力。',
};
export default function Page() {
  return <AboutPage />;
}
