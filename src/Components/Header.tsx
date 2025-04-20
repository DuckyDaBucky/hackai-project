// src/Components/Header.tsx
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { User } from "@supabase/supabase-js";
import logoSrc from "../assets/Logo.png";

export default function Header() {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
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
    navigate("/"); // Redirect to splash page after logout
  };

  return (
    <header className="w-full shadow-md px-6 py-2 flex justify-between items-center fixed top-0 left-0 z-50">
      {/* Left side: logo + name */}
      <div className="flex items-center gap-2">
        <img src={logoSrc} alt="logo" className="w-8 h-8" />
        <span className="text-xl font-bold">Alfred.AI</span>
      </div>

      {/* Right: Navigation */}
      <nav className="flex gap-10 items-center text-darkBrown text-[1rem] font-medium">
        <Link
          to="/"
          className="hover:text-plum hover:scale-110 transition-transform duration-200"
        >
          Home
        </Link>
        <Link
          to="/about"
          className="hover:text-plum hover:scale-110 transition-transform duration-200"
        >
          About
        </Link>
        <Link
          to="/technical"
          className="hover:text-plum hover:scale-110 transition-transform duration-200"
        >
          Technical
        </Link>
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
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
          >
            Login
          </Link>
        )}
      </nav>
    </header>
  );
}
