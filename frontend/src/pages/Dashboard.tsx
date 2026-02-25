import { useEffect, useState } from "react";
import { api } from "../api/axios";
import ProductionChart from "../components/ProductionChart";

export default function Dashboard() {
  const [data, setData] = useState<any>(null);
  const [realtime, setRealtime] = useState<any>(null);
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await api.get(
        "/machines/dcb03447-0955-47a4-a9b3-c01f90f3038b/daily",
      );
      setData(response.data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchRealtime = async () => {
      const response = await api.get(
        "/machines/dcb03447-0955-47a4-a9b3-c01f90f3038b/realtime",
      );
      setRealtime(response.data);
    };

    fetchRealtime();

    const interval = setInterval(fetchRealtime, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchChart = async () => {
      const response = await api.get(
        "/machines/dcb03447-0955-47a4-a9b3-c01f90f3038b/last-hours?hours=2",
      );
      setChartData(response.data);
    };

    fetchChart();

    const interval = setInterval(fetchChart, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-black">
      <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>

      {data && (
        <div className="bg-white p-4 rounded shadow">
          <p>Total producción hoy: {data.total_production}</p>
          <p>Promedio por hora: {data.avg_per_hour}</p>
          <p>Último estado: {data.last_status}</p>
        </div>
      )}

      {realtime && (
        <div className="mt-4 bg-white p-4 rounded shadow">
          <p>
            Estado actual:
            <span
              className={`ml-2 font-bold ${
                realtime.status === "RUN"
                  ? "text-green-600"
                  : realtime.status === "STOP"
                    ? "text-red-600"
                    : "text-gray-500"
              }`}
            >
              {realtime.status}
            </span>
          </p>

          <p>Último conteo: {realtime.last_count}</p>
          <p>Última actualización: {realtime.seconds_since_last_update}s</p>
        </div>
      )}

      {chartData && (
        <div className="mt-4 bg-white p-4 rounded shadow">
          <ProductionChart data={chartData} />
        </div>
      )}
    </div>
  );
}
