// src/Components/Header.tsx
import { Link } from "react-router-dom";
import logoSrc from "../assets/Logo.png";

export default function Header() {
  return (
    <header className="w-full bg-white shadow-md px-6 py-2 flex justify-between items-center fixed top-0 left-0 z-50">
      {/* Left side: logo + name */}
      <div className="flex items-center gap-2">
        <img src="/vite.svg" alt="logo" className="w-8 h-8" />
        <span className="text-xl font-bold">Alfred.AI</span>
      </div>

      {/* Right: Navigation */}
      <nav className="flex gap-10 items-center text-darkBrown text-[1rem] font-medium">
        <Link to="/" className="hover:text-plum hover:scale-110 transition-transform duration-200">Home</Link>
        <Link to="/about" className="hover:text-plum hover:scale-110 transition-transform duration-200">About</Link>
        <Link to="/technical" className="hover:text-plum hover:scale-110 transition-transform duration-200">Technical</Link>
        <Link to="/auth">
          <button className="bg-paleLavender text-white text-sm px-6 py-2 rounded-md shadow-md hover:bg-plum transition">
            Login
          </button>
        </Link>
      </nav>
    </header>
  );
}
