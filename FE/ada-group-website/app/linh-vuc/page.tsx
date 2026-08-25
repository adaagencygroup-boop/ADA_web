import type { Metadata } from "next";
import AIEcosystem from "@/app/linh-vuc/_components/AIEcosystem";
import CTASection from "@/app/linh-vuc/_components/CTASection";
import SectorsGrid from "@/app/linh-vuc/_components/SectorsGrid";

export const metadata: Metadata = {
  title: "Lĩnh vực | ADA Group",
  description:
    "ADA Group phát triển hệ sinh thái AI trên 14 lĩnh vực trọng điểm của nền kinh tế Việt Nam.",
};

export default function LinhVucPage() {
  return (
    <>
      <AIEcosystem />
      <SectorsGrid />
      <CTASection />
    </>
  );
}
