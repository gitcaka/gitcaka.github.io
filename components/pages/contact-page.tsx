'use client';

import {
  AtSign,
  BriefcaseBusiness,
  CodeXml,
  GraduationCap,
  QrCode,
} from 'lucide-react';
import { contact } from '@/content/contact';
import { EmptyState } from '@/components/empty-state';
import { PageHero } from '@/components/page-hero';
import { useSite } from '@/components/site-context';

export function ContactPage() {
  const { language, t } = useSite();
  const entries = [
    contact.email && ['Email', `mailto:${contact.email}`, contact.email, AtSign],
    contact.github && ['GitHub', contact.github, 'GitHub', CodeXml],
    contact.googleScholar && [
      'Google Scholar',
      contact.googleScholar,
      'Google Scholar',
      GraduationCap,
    ],
    contact.linkedIn && ['LinkedIn', contact.linkedIn, 'LinkedIn', BriefcaseBusiness],
    contact.wechatQr && ['WeChat', contact.wechatQr, 'WeChat', QrCode],
  ].filter(Boolean) as [string, string, string, typeof AtSign][];
  return (
    <main id="top" className="page-main">
      <div className="content-width">
        <PageHero
          index="07"
          title={t.page.contactTitle}
          description={t.page.contactIntro}
        />
        {contact.openToWork && (
          <div className="contact-availability">
            <BriefcaseBusiness />
            <div>
              <strong>{language === 'zh' ? '目前求职中' : 'Currently open to work'}</strong>
              <span>
                {language === 'zh'
                  ? '优先考虑自动驾驶感知、仿真评测、多模态/VLM 与机器人系统岗位。'
                  : 'Prioritizing autonomous-driving perception, simulation evaluation, multimodal/VLM, and robotics roles.'}
              </span>
            </div>
          </div>
        )}
        {entries.length ? (
          <div className="contact-grid">
            {entries.map(([label, url, value, Icon]) => (
              <a key={label} href={url}>
                <Icon />
                <span>{label}</span>
                <strong>{value}</strong>
              </a>
            ))}
          </div>
        ) : (
          <EmptyState
            title={t.page.contactEmpty}
            body={t.page.contactEmptyBody}
          />
        )}
      </div>
    </main>
  );
}
