'use client';

import { useOptimistic, useState, useTransition } from 'react';
import { Inbox, Mail, MailOpen, Reply, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

import { deleteMessage, setMessageRead } from '@/app/admin/actions/messages';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { formatDate, type ContactMessage } from '@/lib/admin/types';
import { cn } from '@/lib/utils';

type Filter = 'all' | 'unread';
type Change = { type: 'read'; id: string; value: boolean } | { type: 'delete'; id: string };

export function MessagesInbox({ messages }: { messages: ContactMessage[] }) {
  const [list, apply] = useOptimistic(messages, (state, change: Change) =>
    change.type === 'delete' ? state.filter((m) => m.id !== change.id) : state.map((m) => (m.id === change.id ? { ...m, is_read: change.value } : m)),
  );
  const [filter, setFilter] = useState<Filter>('all');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  const visible = filter === 'unread' ? list.filter((m) => !m.is_read) : list;
  const selected = list.find((m) => m.id === selectedId) ?? null;
  const unread = list.filter((m) => !m.is_read).length;

  const markRead = (message: ContactMessage, value: boolean) =>
    startTransition(async () => {
      apply({ type: 'read', id: message.id, value });
      const result = await setMessageRead(message.id, value);
      if (!result.ok) toast.error(result.error);
    });

  const open = (message: ContactMessage) => {
    setSelectedId(message.id);
    if (!message.is_read) markRead(message, true);
  };

  const remove = (message: ContactMessage) => {
    if (!window.confirm(`Supprimer définitivement le message de ${message.name} ?`)) return;
    startTransition(async () => {
      apply({ type: 'delete', id: message.id });
      setSelectedId(null);
      const result = await deleteMessage(message.id);
      if (result.ok) toast.success(result.message ?? 'Supprimé');
      else toast.error(result.error);
    });
  };

  if (list.length === 0) {
    return (
      <Card className="flex flex-col items-center gap-3 px-6 py-16 text-center">
        <span className="grid size-14 place-items-center rounded-full bg-muted">
          <Inbox className="size-6 text-muted-foreground" />
        </span>
        <p className="text-base font-semibold text-mono">Aucun message pour l’instant</p>
        <p className="max-w-sm text-sm text-muted-foreground">Les demandes envoyées depuis le formulaire de contact du site apparaîtront ici.</p>
      </Card>
    );
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,380px)_1fr]">
      <Card className="overflow-hidden">
        <div className="flex gap-1 border-b border-border p-2">
          {(['all', 'unread'] as Filter[]).map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setFilter(value)}
              className={cn('rounded-md px-3 py-1.5 text-sm font-medium', filter === value ? 'bg-muted text-mono' : 'text-muted-foreground hover:text-mono')}
            >
              {value === 'all' ? `Tous (${list.length})` : `Non lus (${unread})`}
            </button>
          ))}
        </div>
        <ul className="max-h-[65vh] divide-y divide-border overflow-y-auto">
          {visible.map((message) => (
            <li key={message.id}>
              <button
                type="button"
                onClick={() => open(message)}
                className={cn('flex w-full gap-3 px-4 py-3 text-start hover:bg-muted/50', selectedId === message.id && 'bg-muted/70')}
              >
                <span className={cn('mt-1.5 size-2 shrink-0 rounded-full', message.is_read ? 'bg-transparent' : 'bg-[#00C2FF]')} />
                <span className="min-w-0 grow">
                  <span className="flex items-baseline justify-between gap-2">
                    <span className={cn('truncate text-sm', message.is_read ? 'text-secondary-foreground' : 'font-semibold text-mono')}>{message.name}</span>
                    <span className="shrink-0 text-xs text-muted-foreground">{formatDate(message.created_at, false)}</span>
                  </span>
                  <span className="block truncate text-xs font-medium text-secondary-foreground">{message.subject || 'Sans sujet'}</span>
                  <span className="block truncate text-xs text-muted-foreground">{message.message}</span>
                </span>
              </button>
            </li>
          ))}
          {visible.length === 0 && <li className="px-4 py-10 text-center text-sm text-muted-foreground">Tout est lu 🎉</li>}
        </ul>
      </Card>

      <Card className="min-h-[320px]">
        {selected ? (
          <article className="flex h-full flex-col">
            <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border p-5">
              <div className="min-w-0">
                <h2 className="text-lg font-semibold text-mono">{selected.subject || 'Sans sujet'}</h2>
                <p className="mt-1 text-sm text-secondary-foreground">
                  {selected.name} ·{' '}
                  <a className="text-[#0094c6] hover:underline" href={`mailto:${selected.email}`}>
                    {selected.email}
                  </a>
                </p>
                <p className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                  {formatDate(selected.created_at)}
                  {selected.locale && (
                    <Badge variant="secondary" appearance="light" size="sm">
                      {selected.locale.toUpperCase()}
                    </Badge>
                  )}
                </p>
              </div>
              <div className="flex gap-1.5">
                <Button type="button" variant="outline" size="sm" onClick={() => markRead(selected, !selected.is_read)}>
                  {selected.is_read ? <Mail /> : <MailOpen />} {selected.is_read ? 'Marquer non lu' : 'Marquer lu'}
                </Button>
                <Button type="button" variant="outline" mode="icon" size="sm" aria-label="Supprimer" onClick={() => remove(selected)}>
                  <Trash2 className="text-destructive" />
                </Button>
              </div>
            </header>
            <p className="grow p-5 text-sm leading-7 whitespace-pre-wrap text-foreground">{selected.message}</p>
            <footer className="border-t border-border p-5">
              <Button asChild>
                <a href={`mailto:${selected.email}?subject=${encodeURIComponent(`Re: ${selected.subject || 'Votre message'}`)}`}>
                  <Reply /> Répondre par e-mail
                </a>
              </Button>
            </footer>
          </article>
        ) : (
          <div className="grid h-full place-items-center p-10 text-center text-sm text-muted-foreground">Sélectionnez un message pour le lire.</div>
        )}
      </Card>
    </div>
  );
}
