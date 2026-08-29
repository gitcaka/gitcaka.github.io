import type { Metadata } from 'next';
import './globals.css';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { SiteProviders } from '@/components/site-context';

export const metadata: Metadata = {
  title: {
    default: '曹武康｜智能网联、协同感知与自动驾驶研究',
    template: '%s · 曹武康 Wukang Cao',
  },
  description:
    '曹武康的科研与工程主页，关注协同感知、多模态推理、自动驾驶规划与机器人系统。',
  applicationName: 'Wukang Cao Research Portfolio',
  keywords: [
    'Cooperative Perception',
    'Intelligent Connected Vehicles',
    'Autonomous Driving',
    'Multimodal Reasoning',
    'Robotics',
  ],
  authors: [{ name: 'Wukang Cao' }],
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN" className="dark" suppressHydrationWarning>
      <body>
        <SiteProviders>
          <SiteHeader />
          {children}
          <SiteFooter />
        </SiteProviders>
      </body>
    </html>
  );
}
