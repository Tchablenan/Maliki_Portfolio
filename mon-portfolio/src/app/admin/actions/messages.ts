"use server";

import { revalidatePath } from "next/cache";

import { requireAdmin, type ActionResult } from "@/lib/admin/guard";

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
