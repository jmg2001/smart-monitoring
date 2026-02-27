import { useNavigate } from "react-router-dom";
import MachineCard from "./MachineCard";
import type { MachineOverview } from "../types";

interface Props {
  machines: MachineOverview[];
}

export default function MachineSelector({ machines }: Props) {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-4">
      {machines.map((machine: MachineOverview) => (
        <MachineCard
          machine={machine}
          onClick={() => navigate(`/machine/${machine.id}`)}
          key={machine.id}
        ></MachineCard>
      ))}
    </div>
  );
}
