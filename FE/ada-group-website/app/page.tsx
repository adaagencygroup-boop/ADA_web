import AboutHighlight from "@/app/_components/AboutHighlight";
import ContactForm from "@/app/_components/ContactForm";
import Hero from "@/app/_components/Hero";
import PartnersSection from "@/app/_components/PartnersSection";
import PeopleSection from "@/app/_components/PeopleSection";
import ServicesGrid from "@/app/_components/ServicesGrid";
import TechStack from "@/app/_components/TechStack";
import WhyChooseUs from "@/app/_components/WhyChooseUs";
import HologramBackground from "@/src/components/hologram/HologramBackground";

export default function Home() {
  return (
    <>
      <HologramBackground />
      <div className="relative" style={{ zIndex: 1 }}>
        <div data-hologram-section="hero">
          <Hero />
        </div>
        <div data-hologram-section="about">
          <AboutHighlight />
        </div>
        <div data-hologram-section="services">
          <ServicesGrid />
        </div>
        <div data-hologram-section="partners">
          <PartnersSection />
        </div>
        <div data-hologram-section="people">
          <PeopleSection />
        </div>
        <div data-hologram-section="techstack">
          <TechStack />
        </div>
        <div data-hologram-section="why">
          <WhyChooseUs />
        </div>
        <div data-hologram-section="contact">
          <ContactForm />
        </div>
      </div>
    </>
  );
}
