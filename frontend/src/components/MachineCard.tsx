import type { MachineOverview } from "../types";

interface Props {
  machine: MachineOverview;
  onClick: () => void;
}

export default function MachineCard({ machine, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer bg-[#1e293b] border border-gray-700 rounded-xl p-6 hover:border-cyan-500 transition"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-cyan-400">{machine.name}</h3>
        <div
          className={`w-3 h-3 rounded-full ${
            machine.status === "RUN"
              ? "bg-green-500"
              : machine.status === "STOP"
                ? "bg-red-500"
                : "bg-yellow-500"
          }`}
        />
      </div>

      <div className="flex justify-between font-mono tabular-nums">
        <div>
          <p className="text-sm text-gray-400">Producción Hoy:</p>
          <p className="text-2xl font-bold text-white">
            {machine.total_production}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-400">Última actualización:</p>
          <p className="text-2xl font-bold text-white">
            {machine.last_update_seconds ?? "NA"} s
          </p>
        </div>
      </div>
    </div>
  );
}
