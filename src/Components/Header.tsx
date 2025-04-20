// src/Components/Header.tsx
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="w-full bg-[#d5d8ec] shadow-lg px-12 py-5 flex justify-between items-center font-body">

      {/* Left: Logo + Name */}
      <div className="group flex items-center gap-2 cursor-pointer transition-transform duration-300 hover:scale-105 hover:brightness-110">
      <img
        src="/vite.svg"
        alt="logo"
        className="w-10 h-10 transition duration-300"
      />
      <span className="text-2xl font-heading font-bold text-darkBrown tracking-wide transition duration-300">
        Alfred.AI
      </span>
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
