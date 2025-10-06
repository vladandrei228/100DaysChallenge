import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import type { User as SupabaseUser } from '@supabase/supabase-js';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

const App: React.FC = () => {
  const [user, setUser] = useState<SupabaseUser | null>(null);

  // TODO: Use supabase.auth.onAuthStateChange to listen for auth changes
  // TODO: Update user state when auth state changes
  // TODO: Protect routes (e.g., redirect to /login if user is null for Home/Dashboard)

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Header user={user} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;