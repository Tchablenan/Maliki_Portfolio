export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  locale: string | null;
  is_read: boolean;
  created_at: string;
}

export function formatDate(iso: string, withTime = true) {
  return new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    ...(withTime ? { hour: '2-digit', minute: '2-digit' } : {}),
    timeZone: 'Africa/Abidjan',
  }).format(new Date(iso));
}
