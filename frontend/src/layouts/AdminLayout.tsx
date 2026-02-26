import { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../context/auth/AuthContext";

export default function AdminLayout() {
  const { logout } = useContext(AuthContext);

  return (
    <div className="flex h-screen bg-[#111827] text-gray-200">
      {/* Sidebar Admin */}
      <aside className="w-64 bg-[#0f172a] border-r border-gray-800 p-6">
        <h2 className="text-xl font-bold text-red-400 mb-8">SYSTEM ADMIN</h2>

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
            Overview
          </NavLink>

          <NavLink
            to="/admin/companies"
            className={({ isActive }) =>
              `block px-3 py-2 rounded ${
                isActive
                  ? "bg-[#1e293b] text-red-400"
                  : "text-gray-400 hover:bg-[#1e293b]"
              }`
            }
          >
            Companies
          </NavLink>

          <div>
            <button
              onClick={logout}
              className="text-red-400 hover:text-red-300 mt-6"
            >
              Logout
            </button>
          </div>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
