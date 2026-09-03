import type { Metadata } from "next";
import Hero from "@/app/dich-vu/_components/Hero";
import WebVision from "./_components/WebVision";
import WebCoreValues from "./_components/WebCoreValues";
import WebSolutions from "./_components/WebSolutions";
import WebUpgradeMaintenance from "./_components/WebUpgradeMaintenance";
import WebCTA from "./_components/WebCTA";
import WebIntro from "./_components/WebIntro";

export const metadata: Metadata = {
  title: "Web & Web Application | Dịch vụ | ADA Group",
  description:
    "ADA Group thiết kế và phát triển website, ứng dụng web và các hệ thống trực tuyến theo nhu cầu của doanh nghiệp.",
};

export default function WebServicePage() {
  return (
    <div className="flex flex-col">
      <Hero
        badge="WEB & WEB APPLICATION"
        title="Xây dựng nền tảng web phục vụ hoạt động kinh doanh"
        desc="ADA Group thiết kế và phát triển website, ứng dụng web và các hệ thống trực tuyến theo nhu cầu của doanh nghiệp — từ website giới thiệu thương hiệu đến những nền tảng hỗ trợ quản lý, vận hành."
        imagePlaceholder="https://wtxsbaavzdvpzogiwoei.supabase.co/storage/v1/object/public/ADA%20Group%20website/dong-hanh-cung-doanh-nghiep-tren-hanh-trinh-chuyen-doi-so-02.jpg"
      />
      <WebCoreValues />
      <WebSolutions />
      <WebIntro />
      <WebUpgradeMaintenance />
      <WebVision />
      <WebCTA />
    </div>
  );
}
