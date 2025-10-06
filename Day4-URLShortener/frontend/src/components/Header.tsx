import React from 'react';
import type { User as SupabaseUser } from '@supabase/supabase-js';

interface HeaderProps {
  user: SupabaseUser | null;
}

const Header: React.FC<HeaderProps> = ({ user }) => {
  return (
    <header className="bg-blue-600 text-white p-4">
      <h1 className="text-2xl">URL Shortener</h1>
      {/* TODO: If user is not null, show a logout button */}
      {/* TODO: On logout button click, call supabase.auth.signOut and update user state */}
    </header>
  );
};

export default Header;