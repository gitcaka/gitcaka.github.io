import type { Metadata } from 'next';
import { OutputsPage } from '@/components/pages/outputs-page';
export const metadata: Metadata = {
  title: '成果 Outputs',
  description: '曹武康已发表的 SCI 论文、竞赛获奖与可核对的项目成果。',
};
export default function Page() {
  return <OutputsPage />;
}
