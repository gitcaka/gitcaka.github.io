import type { Metadata } from 'next';
import './globals.css';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { SiteProviders } from '@/components/site-context';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  'https://wukang-cao-research.caka152005.chatgpt.site';
const siteTitle = '曹武康｜自动驾驶感知与智能系统个人主页';
const siteDescription =
  '曹武康的中英文个人主页：交通运输硕士生，求职方向为自动驾驶感知、仿真评测、多模态/VLM 与机器人系统工程。';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: '%s · 曹武康 Wukang Cao',
  },
  description: siteDescription,
  applicationName: 'Wukang Cao Personal Portfolio',
  keywords: [
    'Cooperative Perception',
    'Intelligent Connected Vehicles',
    'Autonomous Driving',
    'Computer Vision',
    'CARLA',
    'ROS',
    'Multimodal Reasoning',
    'Robotics',
  ],
  authors: [{ name: 'Wukang Cao' }],
  robots: { index: true, follow: true },
  alternates: { canonical: '/', languages: { 'zh-CN': '/', en: '/' } },
  openGraph: {
    type: 'website',
    url: '/',
    title: siteTitle,
    description: siteDescription,
    siteName: '曹武康 · Wukang Cao',
    locale: 'zh_CN',
    alternateLocale: ['en_US'],
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: '曹武康 · Wukang Cao — Autonomous Driving Perception and Intelligent Systems',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wukang Cao | Autonomous Driving Perception & Intelligent Systems',
    description:
      'Personal portfolio for autonomous-driving perception, simulation evaluation, multimodal systems, and robotics.',
    images: ['/og.png'],
  },
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
