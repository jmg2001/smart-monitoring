import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../api/axios";
import ProductionChart from "../components/ProductionChart";

interface Props {
  machine_name: string;
}

export default function MachineDetail({ machine_name }: Props) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [daily, setDaily] = useState<any>(null);
  const [realtime, setRealtime] = useState<any>(null);
  const [chartData, setChartData] = useState<any[]>([]);
  const [machine, setMachine] = useState<any>(null);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      const dailyRes = await api.get(`/machines/${id}/daily`);
      const realtimeRes = await api.get(`/machines/${id}/realtime`);
      const chartRes = await api.get(`/machines/${id}/last-hours?hours=2`);
      const machineRes = await api.get(`/machines/${id}`);

      setMachine(machineRes.data);
      setDaily(dailyRes.data);
      setRealtime(realtimeRes.data);
      setChartData(chartRes.data);
    };

    fetchData();

    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval);
  }, [id]);

  return (
    <div>
      <div className="flex content-center gap-3 mb-2">
        <button
          onClick={() => navigate("/")}
          className="cursor-pointer p-2 items-center rounded-xl border border-gray-700 bg-[#1e293b] hover:bg-[#273549] transition"
        >
          ← Volver
        </button>

        <h2 className="text-2xl font-semibold">
          Detalle Máquina - {machine ? machine.name : "Cargando..."}
        </h2>
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
            <p className="mt-4 text-gray-400 text-sm">
              Último conteo: {realtime.last_count}
            </p>
            <p className="mt-4 text-gray-400 text-sm">
              Última actualización: {realtime.seconds_since_last_update} s
            </p>
          </div>
        </div>
      )}

      {daily && (
        <div className="bg-[#1e293b] rounded-xl p-6 border border-gray-700 mb-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-gray-400 text-sm">Producción Hoy</p>
              <p className="text-4xl font-bold text-cyan-400">
                {daily.total_production}
              </p>
            </div>

            <div>
              <p className="text-gray-400 text-sm">Promedio / Hora</p>
              <p className="text-3xl font-semibold text-indigo-400">
                {daily.avg_per_hour}
              </p>
            </div>
          </div>
        </div>
      )}

      {chartData && (
        // <div className="mt-4 bg-white p-4 rounded shadow">
        <div className="mt-4 rounded shadow mb-6">
          <ProductionChart data={chartData} />
        </div>
      )}
    </div>
  );
}
