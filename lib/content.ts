import type { Language, LocalizedText } from '@/content/types';
export const localize = (value: LocalizedText, language: Language) =>
  value[language];
