import type { Metadata } from "next";
import Hero from "@/app/dich-vu/_components/Hero";
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
      <Hero
        badge="AI & Automation"
        title="Ứng dụng AI và tự động hóa vào những bài toán thực tế"
        desc="ADA Group hỗ trợ doanh nghiệp ứng dụng trí tuệ nhân tạo và tự động hóa để khai thác thông tin, cải thiện quy trình và nâng cao hiệu quả hoạt động. Mỗi dự án bắt đầu từ bài toán thực tế, dữ liệu hiện có và giá trị doanh nghiệp muốn đạt được, sau đó mới lựa chọn công nghệ phù hợp."
        imagePlaceholder="https://wtxsbaavzdvpzogiwoei.supabase.co/storage/v1/object/public/ADA%20Group%20website/dong-hanh-cung-doanh-nghiep-tren-hanh-trinh-chuyen-doi-so-02.jpg"
      />
      <AIProblemSolving />
      <AIUseCases />
      <AIEcosystem />
      <AICTASection />
    </>
  );
}
