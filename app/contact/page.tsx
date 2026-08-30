import type { Metadata } from 'next';
import { ContactPage } from '@/components/pages/contact-page';
export const metadata: Metadata = {
  title: '联系 Contact',
  description: '联系曹武康，沟通自动驾驶感知、仿真评测、多模态与机器人系统相关岗位机会。',
};
export default function Page() {
  return <ContactPage />;
}
