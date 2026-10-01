'use client';

import type { ReactNode } from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { localeLabels, locales, type Locale } from '@/i18n/config';

const flags: Record<Locale, string> = { fr: '🇫🇷', en: '🇬🇧', ja: '🇯🇵' };

/** FR / EN / JA switcher shared by every content editor. */
export function LocaleTabs({ children }: { children: (locale: Locale) => ReactNode }) {
  return (
    <Tabs defaultValue="fr" className="flex flex-col gap-5">
      <TabsList className="w-fit">
        {locales.map((locale) => (
          <TabsTrigger key={locale} value={locale} className="gap-1.5">
            <span aria-hidden>{flags[locale]}</span> {localeLabels[locale].name}
          </TabsTrigger>
        ))}
      </TabsList>
      {locales.map((locale) => (
        <TabsContent key={locale} value={locale} className="mt-0">
          {children(locale)}
        </TabsContent>
      ))}
    </Tabs>
  );
}
