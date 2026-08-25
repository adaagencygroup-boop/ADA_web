import type { Metadata } from "next";
import EnterpriseHeroSection from "./_components/EnterpriseHeroSection";
import EnterpriseCoreValues from "./_components/EnterpriseCoreValues";
import EnterpriseSolutions from "./_components/EnterpriseSolutions";
import EnterpriseIntro from "./_components/EnterpriseIntro";
import EnterpriseCTASection from "./_components/EnterpriseCTASection";

export const metadata: Metadata = {
  title: "Hệ thống doanh nghiệp | Dịch vụ | ADA Group",
  description:
    "ADA Group tư vấn và triển khai các hệ thống phần mềm doanh nghiệp: ERP, CRM, HRM và các nền tảng quản trị nội bộ theo đặc thù ngành.",
};

export default function EnterpriseServicePage() {
  return (
    <>
      <EnterpriseHeroSection />
      <EnterpriseCoreValues />
      <EnterpriseSolutions />
      <EnterpriseIntro />
      <EnterpriseCTASection />
    </>
  );
}
