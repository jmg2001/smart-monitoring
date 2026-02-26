import { useEffect, useState } from "react";
import { api } from "../../api/axios";
import { useNavigate } from "react-router-dom";

export default function CompaniesPage() {
  const navigate = useNavigate();

  const [companies, setCompanies] = useState<any[]>([]);
  const [name, setName] = useState("");

  const fetchCompanies = async () => {
    const response = await api.get("/admin/companies");
    setCompanies(response.data);
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleCreate = async () => {
    if (!name.trim()) return;

    await api.post("/admin/companies", { name });

    setName("");
    fetchCompanies();
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-red-400 mb-6">Companies</h1>

      {/* Crear compañía */}
      <div className="bg-[#1e293b] border border-gray-700 rounded-xl p-6 mb-6">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Company name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1 p-3 bg-[#111827] border border-gray-600 rounded text-gray-200"
          />
          <button
            onClick={handleCreate}
            className="bg-red-600 hover:bg-red-500 px-6 rounded font-semibold"
          >
            Create
          </button>
        </div>
      </div>

      {/* Lista */}
      <div className="bg-[#1e293b] border border-gray-700 rounded-xl p-6">
        {companies.length === 0 ? (
          <p className="text-gray-400">No companies found.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="text-gray-400 border-b border-gray-700">
              <tr>
                <th className="text-left py-3">Name</th>
                <th className="text-left py-3">ID</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company) => (
                <tr
                  key={company.id}
                  className="border-b border-gray-800 hover:bg-[#111827] cursor-pointer"
                  onClick={() => navigate(`/admin/companies/${company.id}`)}
                >
                  <td className="py-3">{company.name}</td>
                  <td className="py-3 font-mono text-xs text-gray-500">
                    {company.id}
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
