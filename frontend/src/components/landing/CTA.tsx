import Section from "./Section";

export default function CTA() {
  return (
    <Section id="contact" className="bg-blue-600 text-white py-20 text-center">
      <h2 className="text-4xl font-bold mb-6">
        Stop Guessing. Start Measuring.
      </h2>
      <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-200">
        Schedule a Demo
      </button>
    </Section>
  );
}
