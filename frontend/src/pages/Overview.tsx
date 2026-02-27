import { useEffect, useState } from "react";
import { api } from "../api/axios";
import KPI from "../components/KPI";
import type { ServerStatistics } from "../types";

export default function AdminHome() {
  const [stats, setStats] = useState<ServerStatistics | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      const response = await api.get("/overview/");

      setStats(response.data);
    };

    fetchStats();
    const interval = setInterval(fetchStats, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-cyan-400 text- bg- mb-8">
        Vista General
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KPI
          title="Máquinas"
          value={stats ? stats.total_machines : "Cargando..."}
          color="green"
        />
        <KPI
          title="Usuarios:"
          value={stats ? stats.total_users : "Cargando..."}
          color="white"
        />
        <KPI
          title="Registros de Producción:"
          value={stats ? stats.total_records : "Cargando..."}
          color="red"
        />
        <KPI
          title="Máquinas Activas Hoy:"
          value={stats ? stats.active_machines_today : "Cargando..."}
          color="cyan"
        />
      </div>
    </div>
  );
}
