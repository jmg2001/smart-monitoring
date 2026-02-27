import { useEffect, useState } from "react";
import { api } from "../../api/axios";
import { useNavigate } from "react-router-dom";
import type { CompanyBase } from "../../types";

export default function CompaniesPage() {
  const navigate = useNavigate();

  const [companies, setCompanies] = useState<CompanyBase[]>([]);
  const [name, setName] = useState("");

  const fetchCompanies = async () => {
    const response = await api.get("/admin/companies/");
    setCompanies(response.data);
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleCreateCompany = async () => {
    if (!name.trim()) return;

    await api.post("/admin/companies/", { name });

    setName("");
    fetchCompanies();
  };

  const handleDeleteCompany = async (company_id: string) => {
    if (!confirm("Are you sure you want to delete this company?")) return;

    await api.delete(`/admin/companies/${company_id}`);

    fetchCompanies();
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-red-400 mb-6">Empresas</h1>

      {/* Crear compañía */}
      <div className="bg-[#1e293b] border border-gray-700 rounded-xl p-6 mb-6">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Nombre de la empresa"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1 p-3 bg-[#111827] border border-gray-600 rounded text-gray-200"
          />
          <button
            onClick={handleCreateCompany}
            className="bg-red-600 hover:bg-red-500 hover:cursor-pointer px-6 rounded font-semibold"
          >
            Crear
          </button>
        </div>
      </div>

      {/* Lista */}
      <div className="bg-[#1e293b] border border-gray-700 rounded-xl p-6">
        {companies.length === 0 ? (
          <p className="text-gray-400">No se encontraron empresas.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="text-gray-400 border-b border-gray-700">
              <tr>
                <th className="text-left pl-3">Empresa</th>
                <th className="text-left py-3">ID</th>
                <th className="text-left py-3">Acción</th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company) => (
                <tr key={company.id}>
                  <td className="py-3 pl-2 border-b border-gray-800 ">
                    {company.name}
                  </td>
                  <td className="py-3 font-mono text-xs text-gray-500">
                    {company.id}
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleDeleteCompany(company.id)}
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
                      <button
                        onClick={() =>
                          navigate(`/admin/companies/${company.id}`, {
                            state: { companyName: company.name },
                          })
                        }
                        className="px-3 h-9
                                    bg-cyan-600 hover:bg-cyan-500
                                    text-white font-semibold
                                    rounded-md
                                    shadow-lg
                                    transition-all duration-300
                                    hover:cursor-pointer"
                      >
                        Detalles
                      </button>
                    </div>
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
