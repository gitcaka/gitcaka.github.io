import type { Metadata } from 'next';
import './globals.css';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { SiteProviders } from '@/components/site-context';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  'https://wukang-cao-research.caka152005.chatgpt.site';
const siteTitle = '曹武康｜智能网联、协同感知与自动驾驶研究';
const siteDescription =
  '曹武康的科研与工程主页，关注协同感知、多模态推理、自动驾驶规划与机器人系统。';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: '%s · 曹武康 Wukang Cao',
  },
  description: siteDescription,
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
        alt: '曹武康 · Wukang Cao — Cooperative Intelligence for Autonomous Mobility',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Wukang Cao | Cooperative Intelligence and Autonomous Driving',
    description:
      'Research in cooperative perception, multimodal reasoning, autonomous planning, and robotic systems.',
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
