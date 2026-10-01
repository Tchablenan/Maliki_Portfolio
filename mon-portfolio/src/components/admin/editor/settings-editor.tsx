'use client';

import { useState, useTransition } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

import { saveSettings } from '@/app/admin/actions/settings';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardHeading, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import type { SiteSettings, SocialLink } from '@/lib/settings';

import { SaveBar } from './save-bar';

type Editable = Omit<SiteSettings, 'media' | 'projects'>;

const networks: { id: SocialLink['id']; label: string }[] = [
  { id: 'linkedin', label: 'LinkedIn' },
  { id: 'x', label: 'X (Twitter)' },
  { id: 'facebook', label: 'Facebook' },
];

function Section({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <Card>
      <CardHeader className="py-4">
        <CardHeading>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeading>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">{children}</CardContent>
    </Card>
  );
}

function Field({ id, label, children }: { id?: string; label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id}>{label}</Label>
      {children}
    </div>
  );
}

function List({ values, onChange, placeholder, type = 'text' }: { values: string[]; onChange: (v: string[]) => void; placeholder: string; type?: string }) {
  return (
    <div className="flex flex-col gap-2">
      {values.map((value, i) => (
        <div key={i} className="flex gap-1.5">
          <Input type={type} value={value} placeholder={placeholder} onChange={(e) => onChange(values.map((v, j) => (j === i ? e.target.value : v)))} />
          <Button type="button" variant="ghost" mode="icon" aria-label="Supprimer" onClick={() => onChange(values.filter((_, j) => j !== i))}>
            <Trash2 className="text-destructive" />
          </Button>
        </div>
      ))}
      <Button type="button" variant="dashed" size="sm" className="w-fit" onClick={() => onChange([...values, ''])}>
        <Plus /> Ajouter
      </Button>
    </div>
  );
}

export function SettingsEditor({ initial }: { initial: Editable }) {
  const [saved, setSaved] = useState(initial);
  const [values, setValues] = useState(initial);
  const [pending, startTransition] = useTransition();
  const dirty = JSON.stringify(values) !== JSON.stringify(saved);
  const set = <K extends keyof Editable>(key: K, value: Editable[K]) => setValues((v) => ({ ...v, [key]: value }));

  const save = () =>
    startTransition(async () => {
      const clean: Editable = {
        ...values,
        emails: values.emails.map((e) => e.trim()).filter(Boolean),
        partners: values.partners.map((p) => p.trim()).filter(Boolean),
        socials: values.socials.filter((s) => s.href.trim()),
      };
      const result = await saveSettings(clean);
      if (result.ok) {
        setValues(clean);
        setSaved(clean);
        toast.success(result.message ?? 'Enregistré');
      } else toast.error(result.error);
    });

  return (
    <>
      <div className="grid gap-5 xl:grid-cols-2">
        <Section title="Identité & disponibilité" description="Affichés dans le haut de page, le pied de page et pour Google.">
          <Field id="name" label="Nom complet">
            <Input id="name" value={values.name} onChange={(e) => set('name', e.target.value)} />
          </Field>
          <label className="flex items-center justify-between gap-4 rounded-lg border border-border p-4">
            <span>
              <span className="block text-sm font-medium text-mono">Disponible pour de nouvelles missions</span>
              <span className="block text-xs text-muted-foreground">Affiche la pastille verte dans le haut de page.</span>
            </span>
            <Switch checked={values.available} onCheckedChange={(checked) => set('available', checked)} />
          </label>
        </Section>

        <Section title="Coordonnées" description="Utilisées dans la section Contact et le pied de page.">
          <Field label="Adresses e-mail (la première est principale)">
            <List type="email" values={values.emails} placeholder="nom@exemple.com" onChange={(v) => set('emails', v)} />
          </Field>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field id="phone" label="Téléphone">
              <Input id="phone" value={values.phone} onChange={(e) => set('phone', e.target.value)} />
            </Field>
            <Field id="city" label="Ville">
              <Input id="city" value={values.city} onChange={(e) => set('city', e.target.value)} />
            </Field>
          </div>
        </Section>

        <Section title="Réseaux sociaux" description="Laissez un lien vide pour masquer le réseau.">
          {networks.map((network) => {
            const current = values.socials.find((s) => s.id === network.id);
            return (
              <Field key={network.id} id={`social-${network.id}`} label={network.label}>
                <Input
                  id={`social-${network.id}`}
                  type="url"
                  placeholder="https://…"
                  value={current?.href ?? ''}
                  onChange={(e) =>
                    set(
                      'socials',
                      networks
                        .map((n) => (n.id === network.id ? { id: n.id, label: n.label, href: e.target.value } : values.socials.find((s) => s.id === n.id)))
                        .filter((s): s is SocialLink => Boolean(s)),
                    )
                  }
                />
              </Field>
            );
          })}
        </Section>

        <Section title="Institutions & partenaires" description="Le bandeau défilant sous le haut de page.">
          <List values={values.partners} placeholder="Nom de l’institution" onChange={(v) => set('partners', v)} />
        </Section>
      </div>
      <SaveBar dirty={dirty} pending={pending} onSave={save} onReset={() => setValues(saved)} />
    </>
  );
}
