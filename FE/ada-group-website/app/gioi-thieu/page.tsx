import type { Metadata } from "next";
import AboutIntro from "@/app/gioi-thieu/_components/AboutIntro";
import BusinessProfile from "@/app/gioi-thieu/_components/BusinessProfile";
import ClosingStatement from "@/app/gioi-thieu/_components/ClosingStatement";
import CoreValues from "@/app/gioi-thieu/_components/CoreValues";
import DevelopmentStrategy from "@/app/gioi-thieu/_components/DevelopmentStrategy";
import LeadershipTeam from "@/app/gioi-thieu/_components/LeadershipTeam";
import MissionBanner from "@/app/gioi-thieu/_components/MissionBanner";
import MissionDetails from "@/app/gioi-thieu/_components/MissionDetails";
import ServiceHighlights from "@/app/gioi-thieu/_components/ServiceHighlights";

export const metadata: Metadata = {
  title: "Giới thiệu | ADA Group",
  description:
    "ADA Group phát triển sản phẩm và giải pháp công nghệ giúp doanh nghiệp Việt Nam số hóa hoạt động và chuyển đổi số.",
};

export default function AboutPage() {
  return (
    <>
      <AboutIntro />
      <MissionBanner />
      <CoreValues />
      <DevelopmentStrategy />
      <MissionDetails />
      <ServiceHighlights />
      <BusinessProfile />
      <LeadershipTeam />
      <ClosingStatement />
    </>
  );
}
