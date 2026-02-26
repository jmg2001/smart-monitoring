import { useEffect, useState } from "react";
import { api } from "../api/axios";
import MachineSelector from "../components/MachineSelector";
import type { MachineOverview } from "../types";

export default function Dashboard() {
  const [machines, setMachines] = useState<MachineOverview[]>([]);
  // const [selectedMachine, setSelectedMachine] =
  //   useState<MachineOverview | null>(null);

  useEffect(() => {
    const fetchMachines = async () => {
      const response = await api.get(
        "/companies/698622f2-528f-4039-bb3c-4ddde69e0f88/machines/overview",
      );
      setMachines(response.data);

      // if (response.data.length > 0) {
      //   setSelectedMachine(response.data[0]);
      // }
    };

    fetchMachines();

    const interval = setInterval(fetchMachines, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-white">
      <h2 className="text-2xl font-semibold mb-4">Machines</h2>
      <MachineSelector machines={machines} />
    </div>
  );
}
