import { useEffect, useState } from "react";
import { api } from "../../api/axios";
import KPI from "../../components/KPI";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";

export default function AdminHome() {
  const [stats, setStats] = useState<any>(null);
  const [serverHistory, setServerHistory] = useState<any[]>([]);
  const [currCPU, setCurrCPU] = useState<number>(0);
  const [currMemory, setCurrMemory] = useState<number>(0);
  const [currRpm, setCurrRpm] = useState<number>(0);

  useEffect(() => {
    const fetchStats = async () => {
      const response = await api.get("/admin/overview");

      setStats(response.data);

      setServerHistory((prev) => [
        ...prev.slice(-20),
        {
          time: new Date().toLocaleTimeString(),
          cpu: response.data.server.cpu_percent,
          memory: response.data.server.memory_percent,
          rpm: response.data.requests_per_minute,
        },
      ]);

      setCurrCPU(response.data.server.cpu_percent);
      setCurrMemory(response.data.server.memory_percent);
      setCurrRpm(response.data.requests_per_minute);
    };

    fetchStats();
    const interval = setInterval(fetchStats, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-red-400 text- bg- mb-8">
        System Overview
      </h1>

      <div className="grid grid-cols-3 gap-6">
        <KPI
          title="Empresas:"
          value={stats ? stats.total_companies : "Cargando..."}
          color="yellow"
        />
        <KPI
          title="Máquinas"
          value={stats ? stats.total_machines : "Cargando..."}
          color=""
        />
        <KPI
          title="Usuarios:"
          value={stats ? stats.total_users : "Cargando..."}
          color="emerald"
        />
        <KPI
          title="Registros de Producción:"
          value={stats ? stats.total_records : "Cargando..."}
          color="green"
        />
        <KPI
          title="Máquinas Activas Hoy:"
          value={stats ? stats.active_machines_today : "Cargando..."}
          color="cyan"
        />
      </div>

      <div className="bg-[#1e293b] border border-gray-700 rounded-xl p-6 mt-8">
        <h2 className="text-xl text-red-400 mb-4 font-semibold">
          Server Metrics
        </h2>

        <div className="flex-col">
          <div className="flex justify-between gap-6 px-10 mb-5 w-full">
            <div>
              <p className="text-gray-400 text-sm mb-2">CPU</p>
              <p className="text-2xl font-bold text-red-400 font-mono">
                {currCPU} %
              </p>
            </div>

            <div>
              <p className="text-gray-400 text-sm mb-2">Memory</p>
              <p className="text-2xl font-bold text-blue-400 font-mono">
                {currMemory} %
              </p>
            </div>

            <div>
              <p className="text-gray-400 text-sm mb-2">Request</p>
              <p className="text-2xl font-bold text-green-400 font-mono">
                {currRpm} rpm
              </p>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={serverHistory}>
              <XAxis dataKey="time" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip />

              <Line
                type="monotone"
                dataKey="cpu"
                stroke="#ef4444"
                isAnimationActive={false}
              />

              <Line
                type="monotone"
                dataKey="memory"
                stroke="#3b82f6"
                isAnimationActive={false}
              />
              <Line
                type="monotone"
                dataKey="rpm"
                stroke="#10b981"
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
