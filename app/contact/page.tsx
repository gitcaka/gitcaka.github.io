import type { Metadata } from 'next';
import { ContactPage } from '@/components/pages/contact-page';
export const metadata: Metadata = {
  title: '联系 Contact',
  description: '围绕智能网联、协同感知、自动驾驶与机器人系统的交流入口。',
};
export default function Page() {
  return <ContactPage />;
}
