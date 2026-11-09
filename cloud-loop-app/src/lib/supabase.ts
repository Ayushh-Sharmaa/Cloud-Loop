import { createClient } from "@supabase/supabase-js";
import { supabaseConfig } from "@/config/env";

const supabaseUrl = supabaseConfig.url || "https://placeholder-project.supabase.co";
const supabaseServiceKey = supabaseConfig.serviceKey || "placeholder-anon-key";

// Supabase Admin client that runs on the server and bypasses RLS
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});
