import FeatureCard from "../FeatureCard";
import Section from "./Section";

export default function Solution() {
  return (
    <Section className="bg-gray-100 py-20 px-8 text-center" id="features">
      <h2 className="text-3xl font-bold mb-10">
        Simple. Industrial. Actionable.
      </h2>

      <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        <FeatureCard title="Real-Time Production" />
        <FeatureCard title="Run / Stop Monitoring" />
        <FeatureCard title="Basic OEE Tracking" />
        <FeatureCard title="Downtime Alerts" />
        <FeatureCard title="Cloud Dashboard" />
        <FeatureCard title="Secure Infrastructure" />
      </div>
    </Section>
  );
}
