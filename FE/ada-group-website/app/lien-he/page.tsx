import type { Metadata } from "next";
import ContactSection from "./_components/ContactSection";
export const metadata: Metadata = {
  title: "Liên hệ | ADA Group",
  description:
    "Liên hệ với ADA Group để được tư vấn và hỗ trợ về các dịch vụ của chúng tôi.",
};

export default function LienHePage() {
  return (
    <>
      <ContactSection />
    </>
  );
}
