// src/Components/Header.tsx
import { Link } from "react-router-dom";
import logoSrc from "../assets/Logo.png";

export default function Header() {
  return (
    <header className="w-full bg-white shadow-md px-6 py-2 flex justify-between items-center fixed top-0 left-0 z-50">
      
      {/* Left side: logo + name */}
      <div className="flex items-center gap-2">
        <img src={logoSrc} alt="logo" className="w-10 h-10 invert-colors" />
        <span className="text-xl font-bold">Alfred.AI</span>
      </div>

      {/* Right side: nav links + login */}
      <div className="flex items-center gap-8 text-gray-600 font-medium">
        <Link to="/about" className="hover:text-black">About Us</Link>
        <Link to="/technical" className="hover:text-black">Technical</Link>
        <Link to="/auth" className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition">
          Login
        </Link>
      </div>
    </header>
  );
}
