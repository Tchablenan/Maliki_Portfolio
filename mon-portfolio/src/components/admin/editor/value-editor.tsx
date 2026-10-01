'use client';

import { useId, useState } from 'react';
import Image from 'next/image';
import { ArrowDown, ArrowUp, ChevronDown, Plus, Trash2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

import { labelFor, longTextKeys } from './labels';

type Json = string | number | boolean | null | undefined | Json[] | { [key: string]: Json };
type JsonObject = { [key: string]: Json };

const isObject = (value: Json): value is JsonObject => typeof value === 'object' && value !== null && !Array.isArray(value);

/** Empty copy of a value, used as the template of a new list item. */
function blank(value: Json): Json {
  if (typeof value === 'string') return '';
  if (typeof value === 'number') return 0;
  if (typeof value === 'boolean') return false;
  if (Array.isArray(value)) return [];
  if (isObject(value)) return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, k === 'icon' ? v : blank(v)]));
  return '';
}

/** Short summary of a list item for its collapsed header. */
function preview(value: Json): string {
  if (!isObject(value)) return String(value ?? '');
  const first = ['title', 'role', 'name', 'label', 'value'].map((k) => value[k]).find((v) => typeof v === 'string' && v);
  return (first as string | undefined) ?? '';
}

function move<T>(list: T[], from: number, to: number) {
  const next = [...list];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}

function TextField({ fieldKey, value, onChange, id }: { fieldKey: string; value: string; onChange: (v: string) => void; id: string }) {
  const long = longTextKeys.has(fieldKey) || value.length > 90 || value.includes('\n');
  return long ? (
    <Textarea id={id} value={value} rows={Math.min(8, Math.max(2, Math.ceil(value.length / 90)))} onChange={(e) => onChange(e.target.value)} />
  ) : (
    <Input id={id} value={value} onChange={(e) => onChange(e.target.value)} />
  );
}

/** Six pictograms of the « Services » section, picked visually. */
function IconPicker({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {[1, 2, 3, 4, 5, 6].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          aria-pressed={value === n}
          aria-label={`Pictogramme ${n}`}
          className={cn(
            'grid size-14 place-items-center rounded-lg border bg-zinc-900 p-2 transition',
            value === n ? 'border-[#00C2FF] ring-2 ring-[#00C2FF]/40' : 'border-border opacity-60 hover:opacity-100',
          )}
        >
          <Image src={`/decor/icon-${n}.png`} alt="" width={40} height={40} className="size-10 object-contain" />
        </button>
      ))}
    </div>
  );
}

function StringList({ fieldKey, value, onChange }: { fieldKey: string; value: string[]; onChange: (v: string[]) => void }) {
  const long = longTextKeys.has(fieldKey);
  return (
    <div className="flex flex-col gap-2">
      {value.map((item, i) => (
        <div key={i} className="flex items-start gap-1.5">
          <div className="grow">
            {long ? (
              <Textarea rows={2} value={item} onChange={(e) => onChange(value.map((v, j) => (j === i ? e.target.value : v)))} />
            ) : (
              <Input value={item} onChange={(e) => onChange(value.map((v, j) => (j === i ? e.target.value : v)))} />
            )}
          </div>
          <Button type="button" variant="ghost" mode="icon" size="sm" disabled={i === 0} aria-label="Monter" onClick={() => onChange(move(value, i, i - 1))}>
            <ArrowUp />
          </Button>
          <Button type="button" variant="ghost" mode="icon" size="sm" aria-label="Supprimer" onClick={() => onChange(value.filter((_, j) => j !== i))}>
            <Trash2 className="text-destructive" />
          </Button>
        </div>
      ))}
      <Button type="button" variant="dashed" size="sm" className="w-fit" onClick={() => onChange([...value, ''])}>
        <Plus /> Ajouter
      </Button>
    </div>
  );
}

function ObjectList({
  value,
  onChange,
  template,
}: {
  value: JsonObject[];
  onChange: (v: JsonObject[]) => void;
  template?: JsonObject;
}) {
  const [open, setOpen] = useState<number | null>(value.length <= 4 ? -1 : null);
  const isOpen = (i: number) => open === -1 || open === i;

  return (
    <div className="flex flex-col gap-2.5">
      {value.map((item, i) => (
        <div key={i} className="rounded-lg border border-border bg-background">
          <div className="flex items-center gap-1 px-3 py-2">
            <button type="button" className="flex grow items-center gap-2 text-start text-sm font-medium" onClick={() => setOpen(isOpen(i) ? null : i)}>
              <ChevronDown className={cn('size-4 shrink-0 text-muted-foreground transition-transform', !isOpen(i) && '-rotate-90')} />
              <span className="grid size-6 shrink-0 place-items-center rounded-md bg-muted text-xs">{i + 1}</span>
              <span className="line-clamp-1">{preview(item) || 'Nouvel élément'}</span>
            </button>
            <Button type="button" variant="ghost" mode="icon" size="sm" disabled={i === 0} aria-label="Monter" onClick={() => onChange(move(value, i, i - 1))}>
              <ArrowUp />
            </Button>
            <Button type="button" variant="ghost" mode="icon" size="sm" disabled={i === value.length - 1} aria-label="Descendre" onClick={() => onChange(move(value, i, i + 1))}>
              <ArrowDown />
            </Button>
            <Button type="button" variant="ghost" mode="icon" size="sm" aria-label="Supprimer" onClick={() => onChange(value.filter((_, j) => j !== i))}>
              <Trash2 className="text-destructive" />
            </Button>
          </div>
          {isOpen(i) && (
            <div className="border-t border-border p-4">
              <ObjectFields value={item} onChange={(next) => onChange(value.map((v, j) => (j === i ? next : v)))} />
            </div>
          )}
        </div>
      ))}
      <Button
        type="button"
        variant="dashed"
        size="sm"
        className="w-fit"
        onClick={() => {
          onChange([...value, blank(value[0] ?? template ?? { title: '' }) as JsonObject]);
          setOpen(value.length);
        }}
      >
        <Plus /> Ajouter un élément
      </Button>
    </div>
  );
}

/** One labelled field, rendered according to the shape of its value. */
export function ValueEditor({ fieldKey, value, onChange }: { fieldKey: string; value: Json; onChange: (v: Json) => void }) {
  const id = useId();
  let control: React.ReactNode;

  if (fieldKey === 'icon' && typeof value === 'number') control = <IconPicker value={value} onChange={onChange} />;
  else if (typeof value === 'string') control = <TextField id={id} fieldKey={fieldKey} value={value} onChange={onChange} />;
  else if (typeof value === 'number')
    control = <Input id={id} type="number" value={value} onChange={(e) => onChange(Number(e.target.value))} className="max-w-40" />;
  else if (Array.isArray(value) && value.every((v) => typeof v === 'string'))
    control = value.length === 0 && fieldKey === 'items' ? null : <StringList fieldKey={fieldKey} value={value as string[]} onChange={onChange} />;
  else if (Array.isArray(value)) control = <ObjectList value={value.filter(isObject)} onChange={onChange} />;
  else if (isObject(value))
    control = (
      <div className="rounded-lg border border-dashed border-border p-4">
        <ObjectFields value={value} onChange={onChange} />
      </div>
    );
  else control = <Input id={id} value={String(value ?? '')} onChange={(e) => onChange(e.target.value)} />;

  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id} className="text-[0.8125rem] font-medium text-secondary-foreground">
        {labelFor(fieldKey)}
      </Label>
      {control}
    </div>
  );
}

/** All fields of an object; the technical `id` key is kept but never shown. */
export function ObjectFields({ value, onChange }: { value: JsonObject; onChange: (v: JsonObject) => void }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {Object.entries(value)
        .filter(([key]) => key !== 'id')
        .map(([key, v]) => {
          const wide = typeof v !== 'string' || longTextKeys.has(key) || v.length > 60;
          return (
            <div key={key} className={wide ? 'sm:col-span-2' : undefined}>
              <ValueEditor fieldKey={key} value={v} onChange={(next) => onChange({ ...value, [key]: next })} />
            </div>
          );
        })}
    </div>
  );
}

export type { Json, JsonObject };
