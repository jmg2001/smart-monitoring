import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../api/axios";
import ProductionChart from "../components/ProductionChart";
import KPI from "../components/KPI";
import type {
  MachineBase,
  MachineDailyData,
  MachineRealtimeData,
  MachineSeriesData,
} from "../types";

export default function MachineDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const n_hours = 2;

  const [daily, setDaily] = useState<MachineDailyData | null>(null);
  const [realtime, setRealtime] = useState<MachineRealtimeData | null>(null);
  const [chartData, setChartData] = useState<MachineSeriesData[]>([]);
  const [machine, setMachine] = useState<MachineBase | null>(null);

  const fetchData = async () => {
    const dailyRes = await api.get(`/machines/${id}/daily`);
    const realtimeRes = await api.get(`/machines/${id}/realtime`);
    const chartRes = await api.get(
      `/machines/${id}/last-hours?hours=${n_hours}`,
    );
    const machineRes = await api.get(`/machines/${id}`);

    console.log(machineRes);

    setMachine(machineRes.data);
    setDaily(dailyRes.data);
    setRealtime(realtimeRes.data);
    setChartData(chartRes.data);
  };

  useEffect(() => {
    if (!id) return;

    fetchData();

    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval);
  }, [id]);

  return (
    <div className="flex-1 flex flex-col">
      <div className="justify-between flex">
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate("/machines/")}
            className="cursor-pointer p-2 items-center bg-[#1e293b] border border-gray-700 rounded-lg  hover:border-cyan-500 transition"
          >
            ← Volver
          </button>

          <h2 className="text-2xl font-semibold">
            Detalle Máquina - {machine ? machine.name : "Cargando..."}
          </h2>
        </div>
        <div>
          <button
            onClick={() => fetchData()}
            className="cursor-pointer p-2 items-center bg-[#1e293b] border border-gray-700 rounded-lg  hover:border-cyan-500 transition"
          >
            Refrescar
          </button>
        </div>
      </div>

      {realtime && (
        <div className="bg-[#1e293b] rounded-xl p-6 border border-gray-700 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Estado</p>
              <p
                className={`text-3xl font-bold ${
                  realtime.status === "RUN"
                    ? "text-green-400"
                    : realtime.status === "STOP"
                      ? "text-red-400"
                      : "text-yellow-400"
                }`}
              >
                {realtime.status}
              </p>
            </div>

            <div
              className={`w-6 h-6 rounded-full ${
                realtime.status === "RUN"
                  ? "bg-green-500 animate-pulse"
                  : realtime.status === "STOP"
                    ? "bg-red-500"
                    : "bg-yellow-500"
              }`}
            />
          </div>

          <div className="flex gap-10">
            <p className="mt-4 text-gray-400 text-sm font-mono tabular-nums">
              Último conteo: {realtime.last_count}
            </p>
            <p className="mt-4 text-gray-400 text-sm font-mono tabular-nums">
              Última actualización: {realtime.seconds_since_last_update} s
            </p>
          </div>
        </div>
      )}

      {daily && (
        <div className="grid grid-cols-4 gap-6 mb-6">
          <KPI
            title="Producción Hoy"
            value={daily.total_production}
            color="cyan"
          />
          <KPI
            title="Disponibilidad %"
            value={daily.availability_percent}
            color="green"
          />
          <KPI
            title="RUN (min)"
            value={daily.run_time_minutes}
            color="emerald"
          />
          <KPI title="STOP (min)" value={daily.stop_time_minutes} color="red" />
        </div>
      )}

      {chartData && (
        <div className="rounded shadow">
          <ProductionChart data={chartData} hours={n_hours} />
        </div>
      )}
    </div>
  );
}
