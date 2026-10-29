'use client';

import { ArrowUp } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { LogoMark } from './logo';
import { useSite } from './site-context';
import { FullPageLink } from './full-page-link';

export function SiteFooter() {
  const { language, t } = useSite();
  const pathname = usePathname();
  if (pathname === '/') return null;
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <LogoMark />
          <div>
            <strong>
              {language === 'zh'
                ? '曹武康 · Wukang Cao'
                : 'Wukang Cao · 曹武康'}
            </strong>
            <span>{t.footer.line}</span>
          </div>
        </div>
        <div className="footer-meta">
          <span>{t.footer.truth}</span>
          <span>© {new Date().getFullYear()} Wukang Cao</span>
        </div>
        <FullPageLink
          href="#top"
          className="back-top"
          aria-label={language === 'zh' ? '返回顶部' : 'Back to top'}
        >
          <ArrowUp />
        </FullPageLink>
      </div>
    </footer>
  );
}
