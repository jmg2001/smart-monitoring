import { useEffect, useState } from "react";
import { api } from "../../../api/axios";
import { useNavigate } from "react-router-dom";

export default function CompanyMachinesPage({ companyId }: any) {
  const navigate = useNavigate();

  const [machines, setMachines] = useState<any[]>([]);
  const [newMachineName, setNewMachineName] = useState("");
  const [description, setDescription] = useState("");
  const [idealCycleTime, setIdealCycleTime] = useState("");

  const fetchMachines = async () => {
    const response = await api.get(`/admin/machines/company/${companyId}`);
    setMachines(response.data);
  };

  useEffect(() => {
    fetchMachines();
  }, [companyId]);

  const handleCreateMachine = async () => {
    if (!newMachineName.trim()) return;

    await api.post("/admin/machines", {
      name: newMachineName,
      description: description || null,
      ideal_cycle_time: idealCycleTime ? parseFloat(idealCycleTime) : null,
      company_id: companyId,
    });

    setNewMachineName("");
    setDescription("");
    setIdealCycleTime("");

    fetchMachines();
  };

  const handleDeleteMachine = async (machineId: string) => {
    if (!confirm("Are you sure you want to delete this machine?")) return;

    await api.delete(`/admin/machines/${machineId}`);
    fetchMachines();
  };

  return (
    <div>
      <div className="bg-[#1e293b] border border-gray-700 rounded-xl p-6 mb-6">
        <div className="grid grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Nombre de la máquina"
            value={newMachineName}
            onChange={(e) => setNewMachineName(e.target.value)}
            className="p-3 bg-[#111827] border border-gray-600 rounded text-gray-200"
          />

          <input
            type="text"
            placeholder="Descripción"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-3 bg-[#111827] border border-gray-600 rounded text-gray-200"
          />

          <input
            type="number"
            step="0.01"
            placeholder="Ciclo ideal (sec)"
            value={idealCycleTime}
            onChange={(e) => setIdealCycleTime(e.target.value)}
            className="p-3 bg-[#111827] border border-gray-600 rounded text-gray-200"
          />
        </div>

        <button
          onClick={handleCreateMachine}
          className="mt-4 bg-red-600 hover:bg-red-500 px-6 py-2 rounded font-semibold hover:cursor-pointer"
        >
          Crear Máquina
        </button>
      </div>

      {/* Lista */}
      <div className="bg-[#1e293b] border border-gray-700 rounded-xl p-6">
        {machines.length === 0 ? (
          <p className="text-gray-400">No se encontraron máquinas.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="text-gray-400 border-b border-gray-700">
              <tr>
                <th className="text-left py-3">Máquina</th>
                <th className="text-left py-3">API KEY</th>
                <th className="text-left py-3">Acción</th>
              </tr>
            </thead>
            <tbody>
              {machines.map((machine) => (
                <tr key={machine.id} className="border-b border-gray-800">
                  <td className="py-3">{machine.name}</td>
                  <td className="py-3 font-mono text-xs text-gray-500">
                    {machine.api_key}
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleDeleteMachine(machine.id)}
                        className="px-3 h-9
                                  bg-red-600 hover:bg-red-500
                                  text-white font-semibold
                                  rounded-md
                                  shadow-lg
                                  transition-all duration-300
                                  hover:cursor-pointer"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => navigate(`machine/${machine.id}`)}
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
