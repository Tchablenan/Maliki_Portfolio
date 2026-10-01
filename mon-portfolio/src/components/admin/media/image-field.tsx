'use client';

import { useRef, useState } from 'react';
import type { StaticImageData } from 'next/image';
import { ImageUp, LoaderCircle, RotateCcw } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { uploadMedia } from './upload';

/**
 * Image picker: previews the current image (uploaded or bundled), uploads a replacement
 * to Supabase Storage and can go back to the original bundled image.
 */
export function ImageField({
  value,
  fallback,
  folder,
  onChange,
  fit = 'cover',
  className,
}: {
  value: string | null;
  fallback?: StaticImageData;
  folder: string;
  onChange: (url: string | null) => void;
  fit?: 'cover' | 'contain';
  className?: string;
}) {
  const input = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const src = value || fallback?.src;

  const pick = async (file?: File) => {
    if (!file) return;
    setBusy(true);
    try {
      onChange(await uploadMedia(file, folder));
      toast.success('Image envoyée — pensez à enregistrer.');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Envoi impossible');
    } finally {
      setBusy(false);
      if (input.current) input.current.value = '';
    }
  };

  return (
    <div className={cn('flex flex-col gap-3', className)}>
      <div className={cn('relative aspect-[4/3] overflow-hidden rounded-lg border border-border', fit === 'contain' ? 'bg-white' : 'bg-muted')}>
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element -- previews of arbitrary uploaded URLs
          <img src={src} alt="" className={cn('size-full', fit === 'contain' ? 'object-contain p-4' : 'object-cover')} />
        ) : (
          <div className="grid size-full place-items-center text-sm text-muted-foreground">Aucune image</div>
        )}
        {value && <span className="absolute top-2 left-2 rounded-md bg-black/70 px-2 py-0.5 text-xs text-white">Image personnalisée</span>}
        {busy && (
          <div className="absolute inset-0 grid place-items-center bg-background/70">
            <LoaderCircle className="size-6 animate-spin" />
          </div>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        <input ref={input} type="file" accept="image/*" className="hidden" onChange={(e) => pick(e.target.files?.[0])} />
        <Button type="button" variant="outline" size="sm" disabled={busy} onClick={() => input.current?.click()}>
          <ImageUp /> {src ? 'Remplacer' : 'Choisir une image'}
        </Button>
        {value && (
          <Button type="button" variant="ghost" size="sm" disabled={busy} onClick={() => onChange(null)}>
            <RotateCcw /> {fallback ? 'Image d’origine' : 'Retirer'}
          </Button>
        )}
      </div>
    </div>
  );
}
