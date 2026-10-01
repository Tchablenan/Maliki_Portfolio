'use client';

import { useState, useTransition } from 'react';
import { toast } from 'sonner';

import { saveSection } from '@/app/admin/actions/content';
import { Card, CardContent } from '@/components/ui/card';
import type { Locale } from '@/i18n/config';

import { LocaleTabs } from './locale-tabs';
import { SaveBar } from './save-bar';
import { ObjectFields, type JsonObject } from './value-editor';

type Values = Record<Locale, JsonObject>;

/** Generic editor of one content section in the three languages. */
export function SectionEditor({ slug, initial }: { slug: string; initial: Values }) {
  const [saved, setSaved] = useState(initial);
  const [values, setValues] = useState(initial);
  const [pending, startTransition] = useTransition();
  const dirty = JSON.stringify(values) !== JSON.stringify(saved);

  const save = () =>
    startTransition(async () => {
      const result = await saveSection(slug, values);
      if (result.ok) {
        setSaved(values);
        toast.success(result.message ?? 'Enregistré');
      } else toast.error(result.error);
    });

  return (
    <>
      <LocaleTabs>
        {(locale) => (
          <Card>
            <CardContent className="p-5 lg:p-7.5">
              <ObjectFields value={values[locale]} onChange={(next) => setValues((v) => ({ ...v, [locale]: next }))} />
            </CardContent>
          </Card>
        )}
      </LocaleTabs>
      <SaveBar dirty={dirty} pending={pending} onSave={save} onReset={() => setValues(saved)} />
    </>
  );
}
