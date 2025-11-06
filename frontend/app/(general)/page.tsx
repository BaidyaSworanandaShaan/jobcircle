import About from "@/components/About";
import CallToAction from "@/components/CallToAction";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";

import PopularJobs from "@/components/PopularJobs";

export default function Home() {
  return (
    <main className="min-h-screen">
      {" "}
      <Hero />
      <About />
      <PopularJobs />
      <HowItWorks />
      <CallToAction />
    </main>
  );
}
