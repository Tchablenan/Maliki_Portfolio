'use client';

import { useState, useTransition } from 'react';
import { ExternalLink, LoaderCircle, Send } from 'lucide-react';
import { toast } from 'sonner';

import { replyToMessage } from '@/app/admin/actions/messages';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { ContactMessage } from '@/lib/admin/types';

/** Writes and sends a reply from the back office (through the owner's Gmail account). */
export function ReplyComposer({ message, canSend, sender }: { message: ContactMessage; canSend: boolean; sender: string }) {
  const [subject, setSubject] = useState(`Re: ${message.subject || 'Votre message'}`);
  const [body, setBody] = useState(`Bonjour ${message.name},\n\n`);
  const [pending, startTransition] = useTransition();
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(message.email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  const send = () =>
    startTransition(async () => {
      const result = await replyToMessage(message.id, subject, body);
      if (result.ok) {
        toast.success(result.message ?? 'Réponse envoyée');
        setBody(`Bonjour ${message.name},\n\n`);
      } else toast.error(result.error);
    });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-sm font-semibold text-mono">Répondre à {message.name}</h3>
        <p className="text-xs text-muted-foreground">
          {canSend ? <>Envoyé depuis {sender}</> : <>Envoi direct pas encore configuré — utilisez Gmail en attendant.</>}
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor={`subject-${message.id}`}>Sujet</Label>
        <Input id={`subject-${message.id}`} value={subject} onChange={(e) => setSubject(e.target.value)} />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor={`body-${message.id}`}>Message</Label>
        <Textarea id={`body-${message.id}`} rows={7} value={body} onChange={(e) => setBody(e.target.value)} />
        <p className="text-xs text-muted-foreground">Votre signature et le message d’origine sont ajoutés automatiquement.</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {canSend && (
          <Button type="button" disabled={pending || body.trim().length < 3} onClick={send}>
            {pending ? <LoaderCircle className="animate-spin" /> : <Send />} Envoyer la réponse
          </Button>
        )}
        <Button type="button" variant={canSend ? 'outline' : 'primary'} asChild>
          <a href={gmailUrl} target="_blank" rel="noopener noreferrer">
            <ExternalLink /> Ouvrir dans Gmail
          </a>
        </Button>
      </div>
    </div>
  );
}
