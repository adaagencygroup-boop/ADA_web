import AboutHighlight from "@/app/_components/AboutHighlight";
import ContactForm from "@/app/_components/ContactForm";
import Hero from "@/app/_components/Hero";
import PartnersSection from "@/app/_components/PartnersSection";
import PeopleSection from "@/app/_components/PeopleSection";
import ServicesGrid from "@/app/_components/ServicesGrid";
import TechStack from "@/app/_components/TechStack";
import WhyChooseUs from "@/app/_components/WhyChooseUs";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutHighlight />
      <ServicesGrid />
      <PartnersSection />
      <PeopleSection />
      <TechStack />
      <WhyChooseUs />
      <ContactForm />
    </>
  );
}
