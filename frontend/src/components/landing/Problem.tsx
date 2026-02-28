import FeatureCard from "../FeatureCard";
import Section from "./Section";

export default function Problem() {
  return (
    <Section bg="bg-white" id="problem">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-8">
          Lack of Visibility Is Costing You Money
        </h2>

        <div className="grid md:grid-cols-2 gap-8 text-gray-600 max-w-4xl mx-auto">
          <FeatureCard title="Production tracked in Excel" />
          <FeatureCard title="No real downtime measurement" />
          <FeatureCard title="No OEE visibility" />
          <FeatureCard title="Reactive decision making" />
        </div>
      </div>
    </Section>
  );
}
