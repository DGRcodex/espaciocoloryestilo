import Hero from "@/components/hero/Hero";
import Services from "@/components/sections/Services";
import Team from "@/components/sections/Team";
import Gallery from "@/components/sections/Gallery";
import Testimonials from "@/components/sections/Testimonials";
import CtaBand from "@/components/sections/CtaBand";
import FAQ from "@/components/sections/FAQ";
import LocationHours from "@/components/sections/LocationHours";

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      
      <Gallery />
      <Testimonials />
      <CtaBand />
      <FAQ />
      <LocationHours />
    </main>
  );
}
