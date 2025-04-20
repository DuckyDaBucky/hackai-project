// src/Components/Header.tsx
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { User } from '@supabase/supabase-js';
import logoSrc from "../assets/Logo.png";

export default function Header() {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };
    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/'); // Redirect to splash page after logout
  };

  return (
    <header className="w-full bg-white shadow-md px-6 py-2 flex justify-between items-center fixed top-0 left-0 z-50">
      
      {/* Left side: logo + name - Linked to Home */}
      <Link to="/" className="flex items-center gap-2 cursor-pointer">
        <img src={logoSrc} alt="logo" className="w-10 h-10 invert" />
        <span className="text-xl font-bold text-black">Alfred.AI</span>
      </Link>

      {/* Right side: nav links + login/logout */}
      <div className="flex items-center gap-8 text-gray-600 font-medium">
        <Link to="/about" className="hover:text-black">About Us</Link>
        {user ? (
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        ) : (
          <Link 
            to="/auth" 
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition">
            Login
          </Link>
        )}
      </div>
    </header>
  );
}
