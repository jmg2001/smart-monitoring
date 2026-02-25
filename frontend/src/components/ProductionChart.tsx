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
    <div className="bg-[#1e293b] rounded-xl p-6 border border-gray-700 h-96">
      <h3 className="text-lg font-semibold mb-2">Producción últimas horas</h3>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 10,
            right: 20,
            left: 0,
            bottom: 30,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis
            dataKey="timestamp"
            tickFormatter={(value) => new Date(value).toLocaleTimeString()}
            stroke="#9ca3af"
          />
          <YAxis stroke="#9ca3af" />
          <Tooltip
            labelFormatter={(value) => new Date(value).toLocaleString()}
            contentStyle={{
              backgroundColor: "#1e293b",
              border: "1px solid #374151",
              borderRadius: "8px",
            }}
            labelStyle={{
              color: "#9ca3af",
            }}
            itemStyle={{
              color: "#22d3ee",
            }}
          />
          <Line
            type="monotone"
            dataKey="count_value"
            stroke="#22d3ee"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
