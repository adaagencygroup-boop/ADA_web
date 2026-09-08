import type { Metadata } from "next";
import { getDepartments, getRecruitments } from "@/src/lib/api/recruitments";
import RecruitmentHero from "./_components/RecruitmentHero";
import JobBoard from "./_components/JobBoard";
import WhyChooseUs from "./_components/WhyChooseUs";
import RecruitmentCTA from "./_components/RecruitmentCTA";

export const revalidate = 15 * 60;

export const metadata: Metadata = {
  title: "Tuyển dụng | ADA Group",
  description:
    "Tuyển dụng ADA Group để được tư vấn và hỗ trợ về các dịch vụ của chúng tôi.",
};

export default async function TuyendungPage() {
  const [jobsPage, departments] = await Promise.all([
    getRecruitments({ size: 50 }),
    getDepartments(),
  ]);

  return (
    <>
      <RecruitmentHero />
      <JobBoard initialJobs={jobsPage.items} departments={departments} />
      <WhyChooseUs />
      <RecruitmentCTA />
    </>
  );
}
