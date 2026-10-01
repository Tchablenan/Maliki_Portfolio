'use client';

import { createBrowserSupabase } from '@/lib/supabase/browser';
import { MEDIA_BUCKET } from '@/lib/supabase/config';

const MAX_SIZE = 10 * 1024 * 1024;

/** Uploads a file to the public « media » bucket and returns its public URL. */
export async function uploadMedia(file: File, folder: string): Promise<string> {
  if (file.size > MAX_SIZE) throw new Error('Fichier trop volumineux (10 Mo maximum).');
  const extension = file.name.split('.').pop()?.toLowerCase() ?? 'bin';
  const base = file.name
    .replace(/\.[^.]+$/, '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 40);
  const path = `${folder}/${Date.now().toString(36)}-${base || 'fichier'}.${extension}`;

  const supabase = createBrowserSupabase();
  const { error } = await supabase.storage.from(MEDIA_BUCKET).upload(path, file, { cacheControl: '31536000', upsert: false, contentType: file.type });
  if (error) throw new Error(error.message);
  return supabase.storage.from(MEDIA_BUCKET).getPublicUrl(path).data.publicUrl;
}
