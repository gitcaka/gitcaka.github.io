import type { Metadata } from 'next';
import { ResumePage } from '@/components/pages/resume-page';

export const metadata: Metadata = {
  title: '简历 Résumé',
  description:
    '曹武康的求职简历：教育背景、技术能力、自动驾驶与机器人项目、论文与获奖经历。',
};

export default function Page() {
  return <ResumePage />;
}
