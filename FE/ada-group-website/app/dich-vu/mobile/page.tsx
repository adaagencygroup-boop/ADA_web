import type { Metadata } from "next";
import MobileHeroSection from "./_components/MobileHeroSection";
import MobileIntro from "./_components/MobileIntro";
import MobileCustomerApps from "./_components/MobileCustomerApps";
import MobileBusinessApps from "./_components/MobileBusinessApps";
import MobileEcommerceApps from "./_components/MobileEcommerceApps";
import MobileCrossPlatform from "./_components/MobileCrossPlatform";
import MobileBackend from "./_components/MobileBackend";
import MobileAdminCMS from "./_components/MobileAdminCMS";
import MobileScalability from "./_components/MobileScalability";
import MobileCoreValues from "./_components/MobileCoreValues";
import MobileCTASection from "./_components/MobileCTASection";

export const metadata: Metadata = {
  title: "Mobile App | Dịch vụ | ADA Group",
  description:
    "ADA Group phát triển ứng dụng di động trên nền tảng iOS và Android với hiệu năng cao và trải nghiệm người dùng tối ưu.",
};

export default function MobileServicePage() {
  return (
    <>
      <MobileHeroSection />
      <MobileCoreValues />
      <MobileIntro />
      <MobileCustomerApps />
      <MobileBusinessApps />
      <MobileEcommerceApps />
      <MobileCrossPlatform />
      <MobileBackend />
      <MobileAdminCMS />
      <MobileScalability />
      <MobileCTASection />
    </>
  );
}
