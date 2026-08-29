import type { Metadata } from "next";
import RecruitmentHero from "./_components/RecruitmentHero";
import JobBoard from "./_components/JobBoard";
import WhyChooseUs from "./_components/WhyChooseUs";
import RecruitmentCTA from "./_components/RecruitmentCTA";

export const metadata: Metadata = {
  title: "Tuyển dụng | ADA Group",
  description:
    "Tuyển dụng ADA Group để được tư vấn và hỗ trợ về các dịch vụ của chúng tôi.",
};

export default function TuyendungPage() {
  return (
    <>
      <RecruitmentHero />
      <JobBoard />
      <WhyChooseUs />
      <RecruitmentCTA />
    </>
  );
}
