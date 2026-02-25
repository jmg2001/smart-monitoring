interface Props {
  title: string;
  value: string | number;
  color: string;
}

export default function KPI({ title, value, color }: Props) {
  return (
    <div className="bg-[#1e293b] border border-gray-700 rounded-xl p-6 font-mono tabular-nums">
      <p className="text-gray-400 text-sm mb-2">{title}</p>
      <p className={`text-4xl font-bold text-${color}-400`}>{value}</p>
    </div>
  );
}
