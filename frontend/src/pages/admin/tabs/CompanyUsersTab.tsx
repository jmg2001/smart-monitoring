import { useEffect, useState } from "react";
import { api } from "../../../api/axios";
import type { UserBase } from "../../../types";

interface Props {
  companyId: string;
}

export default function CompanyUsersTab({ companyId }: Props) {
  const [users, setUsers] = useState<UserBase[]>([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("operator");

  const fetchUsers = async () => {
    const response = await api.get(`/admin/users/company/${companyId}`);
    setUsers(response.data);
  };

  useEffect(() => {
    fetchUsers();
  }, [companyId]);

  const handleCreateUser = async () => {
    if (!email || !password) return;

    await api.post("/admin/users", {
      email,
      password,
      role,
      company_id: companyId,
    });

    setEmail("");
    setPassword("");
    setRole("operator");

    fetchUsers();
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm("Delete this user?")) return;

    await api.delete(`/admin/users/${userId}`);
    fetchUsers();
  };

  return (
    <div>
      {/* Crear usuario */}
      <div className="bg-[#1e293b] border border-gray-700 rounded-xl p-6 mb-6">
        <div className="grid grid-cols-4 gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 bg-[#111827] border border-gray-600 rounded text-gray-200"
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 bg-[#111827] border border-gray-600 rounded text-gray-200"
          />

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="p-3 bg-[#111827] border border-gray-600 rounded text-gray-200"
          >
            <option value="operator">Operator</option>
            <option value="admin">Admin</option>
          </select>

          <button
            onClick={handleCreateUser}
            className="bg-red-600 hover:bg-red-500 rounded font-semibold"
          >
            Crear Usuario
          </button>
        </div>
      </div>

      {/* Lista */}
      <div className="bg-[#1e293b] border border-gray-700 rounded-xl p-6">
        {users.length === 0 ? (
          <p className="text-gray-400">No se encontraron usuarios.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="text-gray-400 border-b border-gray-700">
              <tr>
                <th className="text-left py-3">Email</th>
                <th className="text-left py-3">Rol</th>
                <th className="text-left py-3">Acción</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-gray-800">
                  <td className="py-3">{user.email}</td>
                  <td className="py-3">
                    <span
                      className={
                        user.role === "admin"
                          ? "text-green-400"
                          : "text-gray-400"
                      }
                    >
                      {user.role}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="px-3 h-9 
                                bg-red-600 hover:bg-red-500
                                text-white font-semibold
                                rounded-md
                                shadow-lg
                                transition-all duration-300
                                hover:cursor-pointer"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
