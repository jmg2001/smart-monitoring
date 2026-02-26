import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../api/axios";

export default function CompanyMachinesPage() {
  const { companyId } = useParams();
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
  return (
    <div>
      <h1 className="text-3xl font-bold text-red-400 mb-6">Company Machines</h1>

      <div className="bg-[#1e293b] border border-gray-700 rounded-xl p-6 mb-6">
        <div className="grid grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Machine name"
            value={newMachineName}
            onChange={(e) => setNewMachineName(e.target.value)}
            className="p-3 bg-[#111827] border border-gray-600 rounded text-gray-200"
          />

          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-3 bg-[#111827] border border-gray-600 rounded text-gray-200"
          />

          <input
            type="number"
            step="0.01"
            placeholder="Ideal Cycle Time (sec)"
            value={idealCycleTime}
            onChange={(e) => setIdealCycleTime(e.target.value)}
            className="p-3 bg-[#111827] border border-gray-600 rounded text-gray-200"
          />
        </div>

        <button
          onClick={handleCreateMachine}
          className="mt-4 bg-red-600 hover:bg-red-500 px-6 py-2 rounded font-semibold"
        >
          Create Machine
        </button>
      </div>

      <div className="bg-[#1e293b] border border-gray-700 rounded-xl p-6">
        {machines.length === 0 ? (
          <p className="text-gray-400">No machines found.</p>
        ) : (
          <ul className="space-y-3">
            {machines.map((machine) => (
              <li
                key={machine.id}
                className="p-4 bg-[#111827] rounded border border-gray-700"
              >
                {machine.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
