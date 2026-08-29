import type { Metadata } from 'next';
import { AboutPage } from '@/components/pages/about-page';
export const metadata: Metadata = {
  title: '关于 About',
  description:
    '曹武康关注协同信息与语义推理如何帮助自主移动系统在遮挡和复杂交互中获得更可靠的理解与决策。',
};
export default function Page() {
  return <AboutPage />;
}
