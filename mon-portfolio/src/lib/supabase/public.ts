import { createClient } from "@supabase/supabase-js";

import { supabaseKey, supabaseUrl } from "./config";

/**
 * Cookie-less client for public reads (content, settings) and anonymous inserts
 * (contact messages, page views). Keeps public pages statically renderable.
 */
export function createPublicClient() {
  return createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
