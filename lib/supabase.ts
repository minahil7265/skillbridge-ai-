import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let client: SupabaseClient | null = null;

function getSupabaseClient(): SupabaseClient {
  if (client) return client;

  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    process.env.SUPABASE_URL ||
    '';
  const supabaseAnonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    '';

  if (!supabaseUrl || !supabaseAnonKey) {
    // During build/prerender, env vars may not be injected yet.
    // Return a dummy client that will be replaced on the client side.
    client = createClient('https://placeholder.supabase.co', 'placeholder-anon-key');
    return client;
  }

  client = createClient(supabaseUrl, supabaseAnonKey);
  return client;
}

// Proxy that lazily creates the client on first access
export const supabase = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    const c = getSupabaseClient();
    const value = (c as unknown as Record<string | symbol, unknown>)[prop];
    return typeof value === 'function' ? value.bind(c) : value;
  },
});
