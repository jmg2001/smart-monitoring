interface Props {
  title: string;
}

export default function FeatureCard({ title }: Props) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition">
      <h3 className="font-semibold text-lg">{title}</h3>
    </div>
  );
}
