import Section from "./Section";

export default function Pricing() {
  return (
    <Section
      id="pricing"
      className="bg-[#0B1F3A] text-white py-20 px-8 text-center"
    >
      <h2 className="text-3xl font-bold mb-10">Simple Pricing</h2>

      <div className="max-w-xl mx-auto bg-[#112B4A] p-10 rounded-2xl">
        <h3 className="text-2xl font-bold mb-4">Per Machine</h3>
        <p className="text-4xl font-bold mb-6">$XXX MXN / month</p>

        <ul className="text-gray-300 space-y-3">
          <li>✔ Production Tracking</li>
          <li>✔ OEE Calculation</li>
          <li>✔ Cloud Dashboard</li>
          <li>✔ Data Storage</li>
          <li>✔ Support</li>
        </ul>
      </div>
    </Section>
  );
}
