import type { Metadata } from 'next';
import { OutputsPage } from '@/components/pages/outputs-page';
export const metadata: Metadata = {
  title: '成果 Outputs',
  description: '曹武康的真实在研课题、软件系统与竞赛成果。',
};
export default function Page() {
  return <OutputsPage />;
}
