"use server";

import { revalidatePath } from "next/cache";

import { requireAdmin, type ActionResult } from "@/lib/admin/guard";
import { formatDate } from "@/lib/admin/types";
import { sendMail } from "@/lib/mailer";
import { getSiteSettings } from "@/lib/site-data";

export async function setMessageRead(id: string, isRead: boolean): Promise<ActionResult> {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("messages").update({ is_read: isRead }).eq("id", id);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin", "layout");
  return { ok: true };
}

export async function deleteMessage(id: string): Promise<ActionResult> {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("messages").delete().eq("id", id);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin", "layout");
  return { ok: true, message: "Message supprimé." };
}

const clean = (value: string, max: number) => value.replace(/[\r\n]+/g, " ").trim().slice(0, max);

/** Sends a reply from the owner's Gmail address and keeps a copy in the message history. */
export async function replyToMessage(id: string, subjectInput: string, bodyInput: string): Promise<ActionResult> {
  const { supabase, user } = await requireAdmin();
  const subject = clean(subjectInput, 200);
  const body = bodyInput.trim().slice(0, 10000);
  if (!subject || !body) return { ok: false, error: "Le sujet et le message sont obligatoires." };

  const { data: message } = await supabase.from("messages").select("name, email, message, created_at").eq("id", id).maybeSingle();
  if (!message) return { ok: false, error: "Message introuvable." };

  const settings = await getSiteSettings();
  const quoted = message.message
    .split("\n")
    .map((line: string) => `> ${line}`)
    .join("\n");
  const text = `${body}\n\n—\n${settings.name}\n\nLe ${formatDate(message.created_at)}, ${message.name} a écrit :\n${quoted}`;

  try {
    await sendMail({ to: message.email, subject, text, fromName: settings.name });
  } catch (error) {
    return { ok: false, error: error instanceof Error ? `Envoi impossible : ${error.message}` : "Envoi impossible." };
  }

  await supabase.from("message_replies").insert({ message_id: id, subject, body, sent_by: user.email ?? null });
  await supabase.from("messages").update({ is_read: true }).eq("id", id);
  revalidatePath("/admin", "layout");
  return { ok: true, message: `Réponse envoyée à ${message.email}.` };
}
