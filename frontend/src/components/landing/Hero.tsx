import Section from "./Section";

export default function Hero() {
  return (
    <Section bg="bg-[#0B1F3A] text-white" id="home">
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Industrial Intelligence. In Real Time.
        </h1>

        <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
          Real-time production and basic OEE monitoring for modern manufacturing
          plants in Mexico.
        </p>

        <div className="space-x-4">
          <button className="bg-blue-600 px-6 py-3 rounded-lg hover:bg-blue-500">
            Request Demo
          </button>
          <button className="border border-gray-500 px-6 py-3 rounded-lg hover:bg-gray-800">
            See How It Works
          </button>
        </div>
      </div>
    </Section>
  );
}
