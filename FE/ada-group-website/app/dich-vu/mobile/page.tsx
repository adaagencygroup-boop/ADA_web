import type { Metadata } from "next";
import Hero from "@/app/dich-vu/_components/Hero";
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
      <Hero
        badge="Mobile Application"
        title="Đưa sản phẩm và dịch vụ đến gần người dùng hơn"
        desc="ADA Group thiết kế và phát triển ứng dụng di động phục vụ khách hàng, nhân viên và hoạt động kinh doanh của doanh nghiệp. Từ ứng dụng dịch vụ, thương mại đến các ứng dụng quản lý nội bộ, chúng tôi xây dựng sản phẩm hướng tới trải nghiệm trực quan, hoạt động ổn định và khả năng phát triển lâu dài."
        imagePlaceholder="https://wtxsbaavzdvpzogiwoei.supabase.co/storage/v1/object/public/ADA%20Group%20website/dong-hanh-cung-doanh-nghiep-tren-hanh-trinh-chuyen-doi-so-02.jpg"
      />
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
