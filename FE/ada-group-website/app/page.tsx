import AboutHighlight from "@/app/_components/AboutHighlight";
import ContactForm from "@/app/_components/ContactForm";
import GsapScrollReveal from "@/app/_components/GsapScrollReveal";
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
          <GsapScrollReveal>
            <AboutHighlight />
          </GsapScrollReveal>
        </div>
        <div data-hologram-section="services">
          <GsapScrollReveal>
            <ServicesGrid />
          </GsapScrollReveal>
        </div>
        <div data-hologram-section="partners">
          <GsapScrollReveal>
            <PartnersSection />
          </GsapScrollReveal>
        </div>
        <div data-hologram-section="people">
          <GsapScrollReveal>
            <PeopleSection />
          </GsapScrollReveal>
        </div>
        <div data-hologram-section="techstack">
          <GsapScrollReveal>
            <TechStack />
          </GsapScrollReveal>
        </div>
        <div data-hologram-section="why">
          <GsapScrollReveal>
            <WhyChooseUs />
          </GsapScrollReveal>
        </div>
        <div data-hologram-section="contact">
          <GsapScrollReveal>
            <ContactForm />
          </GsapScrollReveal>
        </div>
      </div>
    </>
  );
}
