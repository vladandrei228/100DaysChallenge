import { createClient } from '@supabase/supabase-js';


// TODO: Fill env vars in your .env file (Vite prefixes VITE_)
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;


if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
// We intentionally throw a descriptive error so the developer knows to set env vars.
// DO NOT commit keys to source control.
throw new Error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY environment variables');
}


export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);