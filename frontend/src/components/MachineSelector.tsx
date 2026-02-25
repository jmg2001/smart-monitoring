import { useNavigate } from "react-router-dom";

export default function MachineSelector({ machines }: any) {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {machines.map((machine: any) => (
        <div
          key={machine.id}
          onClick={() => navigate(`/machine/${machine.id}`)}
          className="cursor-pointer p-6 rounded-xl border border-gray-700 bg-[#1e293b] hover:bg-[#273549] transition"
        >
          <h3 className="text-lg font-semibold text-cyan-400">
            {machine.name}
          </h3>
        </div>
      ))}
    </div>
  );
}
