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
  const { t } = useSite();
  const entries = [
    contact.email && ['Email', contact.email, AtSign],
    contact.github && ['GitHub', contact.github, CodeXml],
    contact.googleScholar && [
      'Google Scholar',
      contact.googleScholar,
      GraduationCap,
    ],
    contact.linkedIn && ['LinkedIn', contact.linkedIn, BriefcaseBusiness],
    contact.wechatQr && ['WeChat', contact.wechatQr, QrCode],
  ].filter(Boolean) as [string, string, typeof AtSign][];
  return (
    <main id="top" className="page-main">
      <div className="content-width">
        <PageHero
          index="07"
          title={t.page.contactTitle}
          description={t.page.contactIntro}
        />
        {entries.length ? (
          <div className="contact-grid">
            {entries.map(([label, url, Icon]) => (
              <a key={label} href={url}>
                <Icon />
                <strong>{label}</strong>
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
