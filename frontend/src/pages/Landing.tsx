import Navbar from "../components/landing/Navbar";
import Hero from "../components/landing/Hero";
import Problem from "../components/landing/Problem";
import Solution from "../components/landing/Solution";
import Pricing from "../components/landing/Pricing";
import CTA from "../components/landing/CTA";

export default function Landing() {
  return (
    <>
      <Navbar />
      <Hero />
      <Problem />
      <Solution />
      <Pricing />
      <CTA />
    </>
  );
}
