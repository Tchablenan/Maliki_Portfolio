'use client';

import { useRef, useState, useTransition } from 'react';
import type { StaticImageData } from 'next/image';
import { FileText, FileUp, LoaderCircle, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';

import { saveSettings } from '@/app/admin/actions/settings';
import { ImageField } from '@/components/admin/media/image-field';
import { uploadMedia } from '@/components/admin/media/upload';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardHeading, CardTitle } from '@/components/ui/card';
import type { SiteSettings } from '@/lib/settings';

import { SaveBar } from './save-bar';

type Media = SiteSettings['media'];

function CvField({ value, defaultCv, onChange }: { value: string | null; defaultCv: string; onChange: (url: string | null) => void }) {
  const input = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const current = value || defaultCv;

  const pick = async (file?: File) => {
    if (!file) return;
    if (file.type !== 'application/pdf') return toast.error('Le CV doit être un fichier PDF.');
    setBusy(true);
    try {
      onChange(await uploadMedia(file, 'cv'));
      toast.success('CV envoyé — pensez à enregistrer.');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Envoi impossible');
    } finally {
      setBusy(false);
      if (input.current) input.current.value = '';
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <a href={current} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-lg border border-border p-4 hover:bg-muted/50">
        <span className="grid size-11 place-items-center rounded-lg bg-red-500/10 text-red-600">
          <FileText />
        </span>
        <span className="min-w-0">
          <span className="block text-sm font-semibold text-mono">{value ? 'CV personnalisé' : 'CV d’origine'}</span>
          <span className="block truncate text-xs text-muted-foreground">{current.split('/').pop()}</span>
        </span>
      </a>
      <div className="flex flex-wrap gap-2">
        <input ref={input} type="file" accept="application/pdf" className="hidden" onChange={(e) => pick(e.target.files?.[0])} />
        <Button type="button" variant="outline" size="sm" disabled={busy} onClick={() => input.current?.click()}>
          {busy ? <LoaderCircle className="animate-spin" /> : <FileUp />} Envoyer un nouveau CV (PDF)
        </Button>
        {value && (
          <Button type="button" variant="ghost" size="sm" onClick={() => onChange(null)}>
            <RotateCcw /> CV d’origine
          </Button>
        )}
      </div>
    </div>
  );
}

export function MediaEditor({
  initial,
  defaults,
  defaultCv,
}: {
  initial: Media;
  defaults: { heroPhoto: StaticImageData; aboutPhoto: StaticImageData };
  defaultCv: string;
}) {
  const [saved, setSaved] = useState(initial);
  const [media, setMedia] = useState(initial);
  const [pending, startTransition] = useTransition();
  const dirty = JSON.stringify(media) !== JSON.stringify(saved);

  const save = () =>
    startTransition(async () => {
      const result = await saveSettings({ media });
      if (result.ok) {
        setSaved(media);
        toast.success(result.message ?? 'Enregistré');
      } else toast.error(result.error);
    });

  const slots = [
    { key: 'heroPhoto' as const, title: 'Photo du haut de page', text: 'Portrait principal, à droite du grand titre. Format vertical conseillé.' },
    { key: 'aboutPhoto' as const, title: 'Photo « À propos »', text: 'Grande photo de la section À propos.' },
  ];

  return (
    <>
      <div className="grid gap-5 lg:grid-cols-3">
        {slots.map((slot) => (
          <Card key={slot.key}>
            <CardHeader className="py-4">
              <CardHeading>
                <CardTitle>{slot.title}</CardTitle>
                <CardDescription>{slot.text}</CardDescription>
              </CardHeading>
            </CardHeader>
            <CardContent>
              <ImageField value={media[slot.key]} fallback={defaults[slot.key]} folder="photos" onChange={(url) => setMedia((m) => ({ ...m, [slot.key]: url }))} />
            </CardContent>
          </Card>
        ))}
        <Card>
          <CardHeader className="py-4">
            <CardHeading>
              <CardTitle>Curriculum vitæ</CardTitle>
              <CardDescription>Le fichier téléchargé par les boutons « CV » du site.</CardDescription>
            </CardHeading>
          </CardHeader>
          <CardContent>
            <CvField value={media.cv} defaultCv={defaultCv} onChange={(cv) => setMedia((m) => ({ ...m, cv }))} />
          </CardContent>
        </Card>
      </div>
      <SaveBar dirty={dirty} pending={pending} onSave={save} onReset={() => setMedia(saved)} />
    </>
  );
}
