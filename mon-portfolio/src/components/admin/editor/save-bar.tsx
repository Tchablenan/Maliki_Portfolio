'use client';

import { useEffect } from 'react';
import { Check, LoaderCircle, Save } from 'lucide-react';

import { Button } from '@/components/ui/button';

/** Sticky save bar: shows unsaved changes and warns before leaving the page. */
export function SaveBar({ dirty, pending, onSave, onReset }: { dirty: boolean; pending: boolean; onSave: () => void; onReset?: () => void }) {
  useEffect(() => {
    if (!dirty) return;
    const warn = (event: BeforeUnloadEvent) => event.preventDefault();
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);

  return (
    <div className="sticky bottom-0 z-[5] -mx-1 mt-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-background/90 px-4 py-3 shadow-sm backdrop-blur">
      <p className="flex items-center gap-2 text-sm text-muted-foreground">
        {dirty ? (
          <>
            <span className="size-2 rounded-full bg-amber-500" /> Modifications non enregistrées
          </>
        ) : (
          <>
            <Check className="size-4 text-green-600" /> Tout est enregistré
          </>
        )}
      </p>
      <div className="flex gap-2">
        {onReset && (
          <Button type="button" variant="outline" disabled={!dirty || pending} onClick={onReset}>
            Annuler
          </Button>
        )}
        <Button type="button" disabled={!dirty || pending} onClick={onSave}>
          {pending ? <LoaderCircle className="animate-spin" /> : <Save />}
          Enregistrer et publier
        </Button>
      </div>
    </div>
  );
}
