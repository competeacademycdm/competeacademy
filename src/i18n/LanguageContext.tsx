'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { translations, TranslationSchema } from './translations';

export type Language = 'EN' | 'TA';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (path: string, fallback?: string) => string;
  tr: TranslationSchema;
  isTamil: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const COOKIE_NAME = 'compete_lang';
const STORAGE_KEY = 'compete_academy_lang';

function getStoredLanguage(): Language {
  if (typeof window === 'undefined') return 'EN';

  try {
    // 1. Check document cookie
    const match = document.cookie.match(new RegExp('(^| )' + COOKIE_NAME + '=([^;]+)'));
    if (match && (match[2] === 'TA' || match[2] === 'ta')) return 'TA';
    if (match && (match[2] === 'EN' || match[2] === 'en')) return 'EN';

    // 2. Check localStorage
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'TA' || stored === 'EN') return stored;
  } catch {}

  return 'EN';
}

function persistLanguage(lang: Language) {
  if (typeof window === 'undefined') return;

  try {
    // Set cookie valid for 1 year across the whole domain
    const maxAge = 365 * 24 * 60 * 60;
    document.cookie = `${COOKIE_NAME}=${lang}; path=/; max-age=${maxAge}; SameSite=Lax`;
    document.cookie = `NEXT_LOCALE=${lang.toLowerCase()}; path=/; max-age=${maxAge}; SameSite=Lax`;

    localStorage.setItem(STORAGE_KEY, lang);

    // Update HTML root element
    document.documentElement.lang = lang === 'TA' ? 'ta' : 'en';
    if (lang === 'TA') {
      document.documentElement.classList.add('lang-ta');
    } else {
      document.documentElement.classList.remove('lang-ta');
    }
  } catch {}
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('EN');

  useEffect(() => {
    const initialLang = getStoredLanguage();
    setLanguageState(initialLang);
    persistLanguage(initialLang);
  }, []);

  const setLanguage = useCallback((newLang: Language) => {
    setLanguageState(newLang);
    persistLanguage(newLang);
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguageState((prev) => {
      const nextLang = prev === 'EN' ? 'TA' : 'EN';
      persistLanguage(nextLang);
      return nextLang;
    });
  }, []);

  // Safe nested key lookup with English fallback
  const t = useCallback(
    (path: string, fallback?: string): string => {
      const keys = path.split('.');
      
      const resolveValue = (dict: Record<string, unknown>): string | undefined => {
        let current: unknown = dict;
        for (const k of keys) {
          if (!current || typeof current !== 'object') return undefined;
          current = (current as Record<string, unknown>)[k];
        }
        return typeof current === 'string' ? current : undefined;
      };

      // 1. Try active language
      const val = resolveValue(translations[language] as unknown as Record<string, unknown>);
      if (val !== undefined) return val;

      // 2. Fallback to English
      const enVal = resolveValue(translations.EN as unknown as Record<string, unknown>);
      if (enVal !== undefined) return enVal;

      // 3. Fallback string or bare path
      return fallback !== undefined ? fallback : path;
    },
    [language]
  );

  const tr = useMemo(() => translations[language], [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      toggleLanguage,
      t,
      tr,
      isTamil: language === 'TA',
    }),
    [language, setLanguage, toggleLanguage, t, tr]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    // Provide safe non-crashing fallback if used outside provider
    return {
      language: 'EN',
      setLanguage: () => {},
      toggleLanguage: () => {},
      t: (path: string, fallback?: string) => fallback || path,
      tr: translations.EN,
      isTamil: false,
    };
  }
  return context;
}

export const useTranslation = useLanguage;
