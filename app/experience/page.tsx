import type { Metadata } from 'next';
import { ExperiencePage } from '@/components/pages/experience-page';
export const metadata: Metadata = {
  title: '经历 Experience',
  description:
    '曹武康围绕科研问题、代码实现、仿真和系统联调形成的研究与工程经历。',
};
export default function Page() {
  return <ExperiencePage />;
}
