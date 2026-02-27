import { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../context/auth/AuthContext";
import LiveClock from "../components/LiveClock";

export default function AdminLayout() {
  const { logout } = useContext(AuthContext);

  return (
    <div className="flex h-screen bg-[#111827] text-gray-200">
      {/* Sidebar Admin */}
      <aside className="w-64 bg-[#0f172a] border-r border-gray-800 p-6">
        <div className="flex-col mb-8 gap-2">
          <h2 className="text-xl text-wrap text-center font-bold text-red-400 ">
            SMART MONITOR
          </h2>

          <h2 className="text-xl text-wrap text-center font-bold text-red-400 ">
            ADMINISTATOR
          </h2>
        </div>

        <nav className="space-y-4 text-sm">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `block px-3 py-2 rounded ${
                isActive
                  ? "bg-[#1e293b] text-red-400"
                  : "text-gray-400 hover:bg-[#1e293b]"
              }`
            }
          >
            General
          </NavLink>

          <NavLink
            to="/admin/companies/"
            className={({ isActive }) =>
              `block px-3 py-2 rounded ${
                isActive
                  ? "bg-[#1e293b] text-red-400"
                  : "text-gray-400 hover:bg-[#1e293b]"
              }`
            }
          >
            Empresas
          </NavLink>

          <div className=" block rounded hover:bg-[#1e293b]">
            <button
              onClick={logout}
              className=" bg-red-600 rounded-md text-white py-2 px-3 size-full hover:cursor-pointer hover:bg-red-500"
            >
              Cerrar Sesión
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
