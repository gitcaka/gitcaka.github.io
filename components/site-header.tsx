'use client';

import { usePathname } from 'next/navigation';
import { Languages, Menu, MonitorCog, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { LogoMark } from './logo';
import { FullPageLink } from './full-page-link';
import { useSite } from './site-context';

export function SiteHeader() {
  const pathname = usePathname();
  const { language, toggleLanguage, theme, cycleTheme, t } = useSite();
  const links = [
    ['/', t.nav.home],
    ['/projects', t.nav.projects],
    ['/resume', language === 'zh' ? '简历' : 'Résumé'],
    ['/outputs', t.nav.outputs],
    ['/about', t.nav.about],
    ['/contact', t.nav.contact],
  ] as const;
  const active = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);
  const ThemeIcon =
    theme === 'dark' ? Moon : theme === 'light' ? Sun : MonitorCog;

  return (
    <header className="site-header">
      <div className="header-inner">
        <FullPageLink
          className="brand"
          href="/"
          aria-label={language === 'zh' ? '曹武康首页' : 'Wukang Cao home'}
        >
          <LogoMark />
          <span>
            <strong>{language === 'zh' ? '曹武康' : 'Wukang Cao'}</strong>
            <small>PERCEPTION · SYSTEMS</small>
          </span>
        </FullPageLink>
        <nav
          className="desktop-nav"
          aria-label={language === 'zh' ? '主导航' : 'Primary navigation'}
        >
          {links.map(([href, label]) => (
            <FullPageLink
              key={href}
              href={href}
              aria-current={active(href) ? 'page' : undefined}
            >
              {label}
            </FullPageLink>
          ))}
        </nav>
        <div className="header-actions">
          <Button
            variant="outline"
            size="icon-lg"
            onClick={toggleLanguage}
            aria-label={language === 'zh' ? 'Switch to English' : '切换到中文'}
            title={language === 'zh' ? 'English' : '中文'}
          >
            <Languages />
            <span className="action-text">
              {language === 'zh' ? 'EN' : '中'}
            </span>
          </Button>
          <Button
            variant="outline"
            size="icon-lg"
            onClick={cycleTheme}
            aria-label={`${t.theme.label}: ${t.theme[theme]}`}
            title={`${t.theme.label}: ${t.theme[theme]}`}
          >
            <ThemeIcon />
          </Button>
          <Sheet>
            <SheetTrigger
              render={
                <Button
                  id="mobile-menu-trigger"
                  className="mobile-menu-trigger"
                  variant="outline"
                  size="icon-lg"
                  aria-label={language === 'zh' ? '打开菜单' : 'Open menu'}
                />
              }
            >
              <Menu />
            </SheetTrigger>
            <SheetContent className="mobile-menu-panel" side="right">
              <SheetHeader>
                <SheetTitle>
                  <span className="mobile-brand">
                    <LogoMark compact />{' '}
                    {language === 'zh' ? '曹武康' : 'Wukang Cao'}
                  </span>
                </SheetTitle>
                <SheetDescription>
                  {language === 'zh'
                    ? '自动驾驶感知与智能系统'
                    : 'Autonomous perception and intelligent systems'}
                </SheetDescription>
              </SheetHeader>
              <nav
                className="mobile-nav"
                aria-label={
                  language === 'zh' ? '移动端导航' : 'Mobile navigation'
                }
              >
                {links.map(([href, label], index) => (
                  <FullPageLink
                    key={href}
                    href={href}
                    aria-current={active(href) ? 'page' : undefined}
                    aria-label={label}
                  >
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    {label}
                  </FullPageLink>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
