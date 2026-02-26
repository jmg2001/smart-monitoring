import { useContext } from "react";
import LiveClock from "../components/LiveClock";
import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { AuthContext } from "../context/auth/AuthContext";

export default function MainLayout() {
  const { logout } = useContext(AuthContext);

  return (
    <div className="flex h-screen bg-[#0f172a] text-gray-200">
      {/* Sidebar */}
      <aside className="w-32 bg-[#111827] border-r border-gray-800 p-6 md:w-64">
        <h2 className="text-lg font-bold text-cyan-400 mb-8">SMART MONITOR</h2>

        <nav className="space-y-4 text-sm">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `block px-3 py-2 rounded-md transition ${
                isActive
                  ? "bg-[#1e293b] text-cyan-400"
                  : "text-gray-400 hover:bg-[#1e293b]"
              }`
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/machines"
            className={({ isActive }) =>
              `block px-3 py-2 rounded-md transition ${
                isActive
                  ? "bg-[#1e293b] text-cyan-400"
                  : "text-gray-400 hover:bg-[#1e293b]"
              }`
            }
          >
            Machines
          </NavLink>

          <div className="block  rounded-md transition">
            <button
              onClick={logout}
              className="bg-cyan-600 rounded-md text-white py-2 px-3 size-full hover:cursor-pointer hover:bg-cyan-500"
            >
              Logout
            </button>
          </div>
        </nav>
      </aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="h-16 bg-[#111827] border-b border-gray-800 flex items-center justify-between px-6">
          <LiveClock />
          {/* <SystemStatus /> */}
        </header>

        <main className="flex-1 p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
