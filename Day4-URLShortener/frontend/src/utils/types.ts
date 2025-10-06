export interface Url {
  original_url: string;
  short_code: string;
  clicks: number;
  created_at: string;
}

// TODO: Use this Url type in Dashboard.tsx for type-safe URL data
// TODO: Use Supabase's User type from @supabase/supabase-js for user data
// Note: Supabase User type is imported where needed (e.g., App.tsx, Header.tsx)