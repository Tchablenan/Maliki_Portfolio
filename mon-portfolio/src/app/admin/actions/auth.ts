"use server";

import { createClient } from "@supabase/supabase-js";
import { redirect } from "next/navigation";

import { isSupabaseConfigured, supabaseKey, supabaseUrl } from "@/lib/supabase/config";
import { createSessionClient } from "@/lib/supabase/server";

export type SignInState = { error?: string; email?: string };

/** Asks the database whether the owner of this access token is an administrator. */
async function isAdminToken(accessToken: string) {
  const client = createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { headers: { Authorization: `Bearer ${accessToken}` } },
  });
  const { data } = await client.rpc("is_admin");
  return data === true;
}

export async function signIn(_prev: SignInState, formData: FormData): Promise<SignInState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  if (!isSupabaseConfigured) return { email, error: "Supabase n'est pas encore configuré (variables d'environnement manquantes)." };
  if (!email || !password) return { email, error: "Saisissez votre e-mail et votre mot de passe." };

  const supabase = await createSessionClient();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error || !data.session) return { email, error: "E-mail ou mot de passe incorrect." };

  // Use the fresh token explicitly: the session cookies are only written at the end of the action.
  if (!(await isAdminToken(data.session.access_token))) {
    await supabase.auth.signOut();
    return { email, error: "Ce compte n'a pas accès au back-office." };
  }
  redirect("/admin");
}

export async function signOut() {
  const supabase = await createSessionClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
