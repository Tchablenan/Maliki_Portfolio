'use client';

import { useState, useTransition } from 'react';
import { ArrowDown, ArrowUp, ChevronDown, Link2, Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

import { saveReferences } from '@/app/admin/actions/content';
import { ImageField } from '@/components/admin/media/image-field';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { defaultProjectImages } from '@/data/profile';
import { locales, type Locale } from '@/i18n/config';
import type { Dictionary, Project } from '@/i18n/types';
import type { ImageFit, ProjectMedia, SiteSettings } from '@/lib/settings';
import { cn } from '@/lib/utils';

import { LocaleTabs } from './locale-tabs';
import { SaveBar } from './save-bar';
import { ObjectFields, type JsonObject } from './value-editor';

type Content = Record<Locale, Dictionary['projects']>;
type State = { content: Content; media: SiteSettings['projects'] };

const emptyProject = (id: string): Project => ({ id, title: '', period: '', place: '', description: '', tags: [] });
const emptyMedia: ProjectMedia = { image: null, fit: 'cover', href: '' };

/** Makes every language list the same references, in the French order. */
function align(content: Content): Content {
  const order = content.fr.items.map((item) => item.id);
  const result = { ...content };
  for (const locale of locales) {
    const byId = new Map(content[locale].items.map((item) => [item.id, item]));
    result[locale] = { ...content[locale], items: order.map((id) => byId.get(id) ?? emptyProject(id)) };
  }
  return result;
}

function mapItems(content: Content, fn: (items: Project[]) => Project[]): Content {
  return Object.fromEntries(locales.map((l) => [l, { ...content[l], items: fn(content[l].items) }])) as Content;
}

function move<T>(list: T[], from: number, to: number) {
  const next = [...list];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}

export function ReferencesEditor({ initial }: { initial: State }) {
  const [saved, setSaved] = useState<State>(() => ({ ...initial, content: align(initial.content) }));
  const [state, setState] = useState<State>(saved);
  const [open, setOpen] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const dirty = JSON.stringify(state) !== JSON.stringify(saved);
  const items = state.content.fr.items;

  const save = () =>
    startTransition(async () => {
      const result = await saveReferences(state);
      if (result.ok) {
        setSaved(state);
        toast.success(result.message ?? 'Enregistré');
      } else toast.error(result.error);
    });

  const setMedia = (id: string, patch: Partial<ProjectMedia>) =>
    setState((s) => ({ ...s, media: { ...s.media, [id]: { ...emptyMedia, ...s.media[id], ...patch } } }));

  const setHeader = (locale: Locale, next: JsonObject) =>
    setState((s) => ({ ...s, content: { ...s.content, [locale]: { ...s.content[locale], ...next } } }));

  const setItem = (locale: Locale, id: string, next: Project) =>
    setState((s) => ({
      ...s,
      content: { ...s.content, [locale]: { ...s.content[locale], items: s.content[locale].items.map((p) => (p.id === id ? next : p)) } },
    }));

  const add = () => {
    const id = `ref-${Date.now().toString(36)}`;
    setState((s) => ({ ...s, content: mapItems(s.content, (list) => [emptyProject(id), ...list]) }));
    setOpen(id);
  };

  const remove = (id: string, title: string) => {
    if (!window.confirm(`Supprimer « ${title || 'cette référence'} » dans les trois langues ?`)) return;
    setState((s) => {
      const media = { ...s.media };
      delete media[id];
      return { content: mapItems(s.content, (list) => list.filter((p) => p.id !== id)), media };
    });
  };

  return (
    <div className="flex flex-col gap-7.5">
      <Card>
        <CardHeader>
          <CardTitle>En-tête de la section</CardTitle>
        </CardHeader>
        <CardContent>
          <LocaleTabs>
            {(locale) => {
              const { title, text, linkLabel } = state.content[locale];
              return <ObjectFields value={{ title, text, linkLabel }} onChange={(next) => setHeader(locale, next)} />;
            }}
          </LocaleTabs>
        </CardContent>
      </Card>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-mono">{items.length} références</h2>
          <p className="text-sm text-muted-foreground">L’ordre ici est celui du site, dans les trois langues.</p>
        </div>
        <Button type="button" onClick={add}>
          <Plus /> Ajouter une référence
        </Button>
      </div>

      <ol className="flex flex-col gap-3">
        {items.map((project, i) => {
          const media = { ...emptyMedia, ...state.media[project.id] };
          const fallback = defaultProjectImages[project.id];
          const thumb = media.image || fallback?.src;
          const isOpen = open === project.id;
          return (
            <li key={project.id}>
              <Card className={cn(isOpen && 'ring-2 ring-[#00C2FF]/30')}>
                <div className="flex items-center gap-3 p-3">
                  <button type="button" onClick={() => setOpen(isOpen ? null : project.id)} className="flex grow items-center gap-3 text-start">
                    <span className="hidden size-14 shrink-0 overflow-hidden rounded-md bg-muted sm:block">
                      {thumb && (
                        // eslint-disable-next-line @next/next/no-img-element -- small preview
                        <img src={thumb} alt="" className="size-full object-cover" />
                      )}
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-semibold text-mono">
                        {String(i + 1).padStart(2, '0')} · {project.title || 'Nouvelle référence'}
                      </span>
                      <span className="block truncate text-xs text-muted-foreground">
                        {[project.period, project.place].filter(Boolean).join(' · ') || 'À compléter'}
                      </span>
                    </span>
                    <ChevronDown className={cn('ms-auto size-4 shrink-0 text-muted-foreground transition-transform', !isOpen && '-rotate-90')} />
                  </button>
                  <Button type="button" variant="ghost" mode="icon" size="sm" disabled={i === 0} aria-label="Monter"
                    onClick={() => setState((s) => ({ ...s, content: mapItems(s.content, (l) => move(l, i, i - 1)) }))}>
                    <ArrowUp />
                  </Button>
                  <Button type="button" variant="ghost" mode="icon" size="sm" disabled={i === items.length - 1} aria-label="Descendre"
                    onClick={() => setState((s) => ({ ...s, content: mapItems(s.content, (l) => move(l, i, i + 1)) }))}>
                    <ArrowDown />
                  </Button>
                  <Button type="button" variant="ghost" mode="icon" size="sm" aria-label="Supprimer" onClick={() => remove(project.id, project.title)}>
                    <Trash2 className="text-destructive" />
                  </Button>
                </div>

                {isOpen && (
                  <div className="grid gap-7 border-t border-border p-5 lg:grid-cols-[280px_1fr]">
                    <div className="flex flex-col gap-4">
                      <ImageField
                        value={media.image}
                        fallback={fallback}
                        fit={media.fit}
                        folder="projects"
                        onChange={(image) => setMedia(project.id, { image })}
                      />
                      <div className="flex flex-col gap-2">
                        <Label>Cadrage de l’image</Label>
                        <div className="grid grid-cols-2 gap-1 rounded-lg bg-muted p-1">
                          {(['cover', 'contain'] as ImageFit[]).map((fit) => (
                            <button
                              key={fit}
                              type="button"
                              onClick={() => setMedia(project.id, { fit })}
                              className={cn('rounded-md px-2 py-1.5 text-xs font-medium', media.fit === fit ? 'bg-background shadow-xs' : 'text-muted-foreground')}
                            >
                              {fit === 'cover' ? 'Remplir le cadre' : 'Image entière'}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label htmlFor={`href-${project.id}`}>
                          <Link2 className="inline size-3.5" /> Lien « En savoir plus » (facultatif)
                        </Label>
                        <Input id={`href-${project.id}`} type="url" placeholder="https://…" value={media.href} onChange={(e) => setMedia(project.id, { href: e.target.value })} />
                      </div>
                    </div>
                    <LocaleTabs>
                      {(locale) => {
                        const item = state.content[locale].items.find((p) => p.id === project.id) ?? emptyProject(project.id);
                        return (
                          <ObjectFields
                            value={item as unknown as JsonObject}
                            onChange={(next) => setItem(locale, project.id, { ...(next as unknown as Project), id: project.id })}
                          />
                        );
                      }}
                    </LocaleTabs>
                  </div>
                )}
              </Card>
            </li>
          );
        })}
      </ol>

      <SaveBar dirty={dirty} pending={pending} onSave={save} onReset={() => setState(saved)} />
    </div>
  );
}
