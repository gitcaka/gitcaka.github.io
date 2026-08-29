import type { Metadata } from 'next';
import { ResearchPage } from '@/components/pages/research-page';
export const metadata: Metadata = {
  title: '研究 Research',
  description:
    '曹武康围绕协同感知、多模态驾驶推理、生成式轨迹规划与自主系统验证形成的研究路线。',
};
export default function Page() {
  return <ResearchPage />;
}
