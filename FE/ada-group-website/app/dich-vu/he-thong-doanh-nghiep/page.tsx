import type { Metadata } from "next";
import Hero from "@/app/dich-vu/_components/Hero";
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
      <Hero
        badge="Enterprise System"
        title="Số hóa quy trình, kết nối hoạt động doanh nghiệp"
        desc="ADA Group thiết kế và phát triển các hệ thống phần mềm giúp doanh nghiệp quản lý thông tin, chuẩn hóa quy trình và kết nối các hoạt động trên một nền tảng thống nhất. Từ một công cụ phục vụ một bộ phận đến hệ thống kết nối nhiều quy trình trong doanh nghiệp, mỗi giải pháp được xây dựng dựa trên cách tổ chức thực sự vận hành, hướng tới việc giảm thao tác thủ công, tập trung dữ liệu và nâng cao hiệu quả quản lý."
        imagePlaceholder="https://wtxsbaavzdvpzogiwoei.supabase.co/storage/v1/object/public/ADA%20Group%20website/dong-hanh-cung-doanh-nghiep-tren-hanh-trinh-chuyen-doi-so-02.jpg"
      />
      <EnterpriseCoreValues />
      <EnterpriseSolutions />
      <EnterpriseIntro />
      <EnterpriseCTASection />
    </>
  );
}
