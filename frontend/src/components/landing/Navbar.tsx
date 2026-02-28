import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="w-full bg-[#0B1F3A] text-white px-8 py-4 flex justify-between items-center fixed">
      <h1 className="text-xl font-bold tracking-wide">CorePulse</h1>
      <div className="space-x-6 hidden md:flex">
        <a href="#home" className="hover:text-blue-400">
          Home
        </a>
        <a href="#problem" className="hover:text-blue-400">
          Problem
        </a>
        <a href="#features" className="hover:text-blue-400">
          Features
        </a>
        <a href="#pricing" className="hover:text-blue-400">
          Pricing
        </a>
        <a href="#contact" className="hover:text-blue-400">
          Contact
        </a>
      </div>
      <div className="flex gap-2">
        <button className="bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-500 cursor-pointer">
          Request Demo
        </button>
        <button
          className="bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-500 cursor-pointer"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      </div>
    </nav>
  );
}
