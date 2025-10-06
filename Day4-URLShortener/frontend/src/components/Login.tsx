import React, { useState } from 'react';
import type { User as SupabaseUser } from '@supabase/supabase-js';

interface LoginProps {
  setUser: (user: SupabaseUser | null) => void;
}

const Login: React.FC<LoginProps> = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    // TODO: Call supabase.auth.signInWithPassword with email and password
    // TODO: On success, call setUser with the user object
    // TODO: Handle errors (e.g., invalid credentials) and display them
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 w-full mb-2"
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 w-full mb-2"
        placeholder="Password"
      />
      <button
        onClick={handleLogin}
        className="bg-green-500 text-white p-2 w-full"
      >
        Login
      </button>
      {/* TODO: Optionally add a signup button */}
      {/* TODO: If signup is added, call supabase.auth.signUp */}
      {/* TODO: Add error message display for auth failures */}
      {/* TODO: Add loading state (e.g., disable button, show spinner) */}
    </div>
  );
};

export default Login;