'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Languages, Menu, MonitorCog, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { LogoMark } from './logo';
import { useSite } from './site-context';

export function SiteHeader() {
  const pathname = usePathname();
  const { language, toggleLanguage, theme, cycleTheme, t } = useSite();
  const links = [
    ['/', t.nav.home],
    ['/research', t.nav.research],
    ['/projects', t.nav.projects],
    ['/experience', t.nav.experience],
    ['/outputs', t.nav.outputs],
    ['/notes', t.nav.notes],
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
        <Link
          className="brand"
          href="/"
          aria-label={language === 'zh' ? '曹武康首页' : 'Wukang Cao home'}
        >
          <LogoMark />
          <span>
            <strong>{language === 'zh' ? '曹武康' : 'Wukang Cao'}</strong>
            <small>COOPERATIVE INTELLIGENCE</small>
          </span>
        </Link>
        <nav
          className="desktop-nav"
          aria-label={language === 'zh' ? '主导航' : 'Primary navigation'}
        >
          {links.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              aria-current={active(href) ? 'page' : undefined}
            >
              {label}
            </Link>
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
                    ? '面向自主移动的协同智能'
                    : 'Cooperative intelligence for autonomous mobility'}
                </SheetDescription>
              </SheetHeader>
              <nav
                className="mobile-nav"
                aria-label={
                  language === 'zh' ? '移动端导航' : 'Mobile navigation'
                }
              >
                {links.map(([href, label], index) => (
                  <SheetClose
                    nativeButton={false}
                    key={href}
                    render={
                      <Link
                        href={href}
                        aria-current={active(href) ? 'page' : undefined}
                      />
                    }
                  >
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    {label}
                  </SheetClose>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
