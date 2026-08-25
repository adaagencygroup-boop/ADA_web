import type { Metadata } from "next";
import WebHero from "./_components/WebHero";
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
      <WebHero />
      <WebCoreValues />
      <WebSolutions />
      <WebIntro />
      <WebUpgradeMaintenance />
      <WebVision />
      <WebCTA />
    </div>
  );
}
