import { useEffect, useState } from "react";
import { api } from "../api/axios";
import MachineSelector from "../components/MachineSelector";

export default function Dashboard() {
  const [machines, setMachines] = useState<any[]>([]);
  const [selectedMachine, setSelectedMachine] = useState<any>(null);

  useEffect(() => {
    const fetchMachines = async () => {
      const response = await api.get(
        "/companies/698622f2-528f-4039-bb3c-4ddde69e0f88/machines",
      );
      setMachines(response.data);

      if (response.data.length > 0) {
        setSelectedMachine(response.data[0]);
      }
    };

    fetchMachines();
  }, []);

  return (
    <div className="text-black">
      <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
      <MachineSelector
        machines={machines}
        selectedMachine={selectedMachine}
        onSelect={(machine) => setSelectedMachine(machine)}
      />
    </div>
  );
}
