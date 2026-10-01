import type { Metadata } from "next";

import { MessagesInbox } from "@/components/admin/messages/messages-inbox";
import { PageHeader } from "@/components/admin/page-header";
import { requireAdmin } from "@/lib/admin/guard";
import type { ContactMessage } from "@/lib/admin/types";

export const metadata: Metadata = { title: "Messages" };

export default async function MessagesPage() {
  const { supabase } = await requireAdmin();
  const { data } = await supabase
    .from("messages")
    .select("id, name, email, subject, message, locale, is_read, created_at")
    .order("created_at", { ascending: false })
    .limit(300);

  return (
    <div className="container">
      <PageHeader title="Messages" description="Les demandes reçues via le formulaire de contact du site." />
      <MessagesInbox messages={(data ?? []) as ContactMessage[]} />
    </div>
  );
}
