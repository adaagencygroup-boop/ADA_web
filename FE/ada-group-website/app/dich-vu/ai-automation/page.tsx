import type { Metadata } from "next";
import AIHeroSection from "./_components/AIHeroSection";
import AIProblemSolving from "./_components/AIProblemSolving";
import AIEcosystem from "./_components/AIEcosystem";
import AIUseCases from "./_components/AIUseCases";
import AICTASection from "./_components/AICTASection";

export const metadata: Metadata = {
  title: "AI & Automation | Dịch vụ | ADA Group",
  description:
    "ADA Group cung cấp giải pháp AI và tự động hóa giúp doanh nghiệp tối ưu quy trình, giảm chi phí và nâng cao hiệu suất vận hành.",
};

export default function AIAutomationServicePage() {
  return (
    <>
      <AIHeroSection />
      <AIProblemSolving />
      <AIUseCases />
      <AIEcosystem />
      <AICTASection />
    </>
  );
}
