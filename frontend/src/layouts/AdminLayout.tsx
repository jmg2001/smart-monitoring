import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="flex h-screen bg-[#111827] text-gray-200">

      <aside className="w-64 bg-[#0f172a] border-r border-gray-800 p-6">
        <h2 className="text-xl text-red-400 font-bold mb-8">
          SYSTEM ADMIN
        </h2>

        <nav className="space-y-4">
          <NavLink to="/admin/companies">Companies</NavLink>
          <NavLink to="/admin/users">Users</NavLink>
          <NavLink to="/admin/machines">Machines</NavLink>
        </nav>
      </aside>

      <main className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </main>

    </div>
  );
}