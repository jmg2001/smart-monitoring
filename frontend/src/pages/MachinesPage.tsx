import { useEffect, useState } from "react";
import { api } from "../api/axios";
import MachineSelector from "../components/MachineSelector";
import type { MachineOverview } from "../types";

export default function Dashboard() {
  const [machines, setMachines] = useState<MachineOverview[]>([]);

  useEffect(() => {
    const fetchMachines = async () => {
      const response = await api.get("/machines/overview");
      console.log(response);
      setMachines(response.data);
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
