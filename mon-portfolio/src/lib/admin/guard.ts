import "server-only";

import { redirect } from "next/navigation";
import { connection } from "next/server";

import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createSessionClient } from "@/lib/supabase/server";

/**
 * Returns the signed-in administrator and a session-bound Supabase client,
 * or redirects to the login page. Every back-office page and action goes through it:
 * the database policies (`is_admin()`) remain the final line of defence.
 */
export async function requireAdmin() {
  // Always per request: never prerender a back-office page at build time.
  await connection();
  if (!isSupabaseConfigured) redirect("/admin/login?error=config");
  const supabase = await createSessionClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const { data: isAdmin } = await supabase.rpc("is_admin");
  if (!isAdmin) {
    await supabase.auth.signOut();
    redirect("/admin/login?error=forbidden");
  }
  return { supabase, user };
}

/** Result shape shared by back-office server actions. */
export type ActionResult = { ok: true; message?: string } | { ok: false; error: string };
