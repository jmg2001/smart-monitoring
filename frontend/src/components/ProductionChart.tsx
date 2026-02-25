import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

interface Props {
  data: any[];
}

export default function ProductionChart({ data }: Props) {
  return (
    <div className="bg-white p-4 rounded shadow h-80">
      <h3 className="text-lg font-semibold mb-2">Producción últimas horas</h3>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="timestamp"
            tickFormatter={(value) => new Date(value).toLocaleTimeString()}
          />
          <YAxis />
          <Tooltip
            labelFormatter={(value) => new Date(value).toLocaleString()}
          />
          <Line
            type="monotone"
            dataKey="count_value"
            stroke="#2563eb"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
