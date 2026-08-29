'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import type { Language, ThemePreference } from '@/content/types';
import { dictionaries } from '@/locales';

const LANGUAGE_KEY = 'wc-language';
const THEME_KEY = 'wc-theme';

interface SiteContextValue {
  language: Language;
  setLanguage: (value: Language) => void;
  toggleLanguage: () => void;
  theme: ThemePreference;
  setTheme: (value: ThemePreference) => void;
  cycleTheme: () => void;
  t: (typeof dictionaries)[Language];
}

const SiteContext = createContext<SiteContextValue | null>(null);

export function SiteProviders({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('zh');
  const [theme, setThemeState] = useState<ThemePreference>('dark');

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const savedLanguage = localStorage.getItem(
        LANGUAGE_KEY,
      ) as Language | null;
      const preferred = navigator.language.toLowerCase().startsWith('zh')
        ? 'zh'
        : 'en';
      setLanguageState(
        savedLanguage === 'zh' || savedLanguage === 'en'
          ? savedLanguage
          : preferred,
      );
      const savedTheme = localStorage.getItem(
        THEME_KEY,
      ) as ThemePreference | null;
      if (
        savedTheme === 'dark' ||
        savedTheme === 'light' ||
        savedTheme === 'system'
      )
        setThemeState(savedTheme);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
    document.title =
      language === 'zh'
        ? '曹武康｜智能网联、协同感知与自动驾驶研究'
        : 'Wukang Cao | Cooperative Intelligence and Autonomous Driving';
  }, [language]);

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const applyTheme = () => {
      const resolved =
        theme === 'system' ? (media.matches ? 'dark' : 'light') : theme;
      document.documentElement.classList.toggle('dark', resolved === 'dark');
      document.documentElement.dataset.theme = resolved;
      document.documentElement.style.colorScheme = resolved;
    };
    applyTheme();
    media.addEventListener('change', applyTheme);
    return () => media.removeEventListener('change', applyTheme);
  }, [theme]);

  const setLanguage = (value: Language) => {
    setLanguageState(value);
    localStorage.setItem(LANGUAGE_KEY, value);
  };
  const setTheme = (value: ThemePreference) => {
    setThemeState(value);
    localStorage.setItem(THEME_KEY, value);
  };
  const cycleTheme = () =>
    setTheme(
      theme === 'dark' ? 'light' : theme === 'light' ? 'system' : 'dark',
    );
  const value = {
    language,
    setLanguage,
    toggleLanguage: () => setLanguage(language === 'zh' ? 'en' : 'zh'),
    theme,
    setTheme,
    cycleTheme,
    t: dictionaries[language],
  };
  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export function useSite() {
  const context = useContext(SiteContext);
  if (!context) throw new Error('useSite must be used within SiteProviders');
  return context;
}
