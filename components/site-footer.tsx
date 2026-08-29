'use client';

import Link from 'next/link';
import { ArrowUp } from 'lucide-react';
import { LogoMark } from './logo';
import { useSite } from './site-context';

export function SiteFooter() {
  const { language, t } = useSite();
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
        <Link
          href="#top"
          className="back-top"
          aria-label={language === 'zh' ? '返回顶部' : 'Back to top'}
        >
          <ArrowUp />
        </Link>
      </div>
    </footer>
  );
}
