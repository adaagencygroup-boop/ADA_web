import type { Metadata, Viewport } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import Header from "@/src/components/layout/Header";
import Footer from "@/src/components/layout/Footer";
import FloatingContact from "@/src/components/common/FloatingContact";
import LoadingScreen from "@/src/components/common/LoadingScreen";
import SmoothScroll from "@/src/components/common/SmoothScroll";
import "./globals.css";

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-be-vietnam",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://adaagencygroup.online";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "ADA Group - Giải pháp công nghệ, đồng hành cùng doanh nghiệp Việt",
    template: "%s | ADA Group",
  },
  description:
    "ADA Group phát triển sản phẩm và giải pháp công nghệ giúp doanh nghiệp Việt Nam số hóa hoạt động, tối ưu quy trình và tạo ra những trải nghiệm tốt hơn cho khách hàng.",
  keywords: [
    "ADA Group",
    "giải pháp công nghệ",
    "chuyển đổi số",
    "phần mềm doanh nghiệp",
    "trí tuệ nhân tạo",
    "AI automation",
    "thiết kế website",
    "ứng dụng di động",
  ],
  authors: [{ name: "ADA Group", url: siteUrl }],
  creator: "ADA Group",
  publisher: "ADA Group",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "ADA Group - Giải pháp công nghệ, đồng hành cùng doanh nghiệp Việt",
    description:
      "ADA Group phát triển sản phẩm và giải pháp công nghệ giúp doanh nghiệp Việt Nam số hóa hoạt động, tối ưu quy trình và tạo ra những trải nghiệm tốt hơn cho khách hàng.",
    url: siteUrl,
    siteName: "ADA Group",
    locale: "vi_VN",
    type: "website",
    images: [
      {
        url: "/images/logo/logo.webp",
        width: 1200,
        height: 630,
        alt: "ADA Group - Giải pháp công nghệ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ADA Group - Giải pháp công nghệ, đồng hành cùng doanh nghiệp Việt",
    description:
      "ADA Group phát triển sản phẩm và giải pháp công nghệ giúp doanh nghiệp Việt Nam số hóa hoạt động, tối ưu quy trình và tạo ra những trải nghiệm tốt hơn cho khách hàng.",
    images: ["/images/logo/logo.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ADA Group",
  url: siteUrl,
  logo: `${siteUrl}/images/logo/logo.webp`,
  description:
    "ADA Group phát triển sản phẩm và giải pháp công nghệ giúp doanh nghiệp Việt Nam số hóa hoạt động, tối ưu quy trình và tạo ra những trải nghiệm tốt hơn cho khách hàng.",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Customer Support",
    availableLanguage: ["Vietnamese", "English"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="vi"
      className={`${beVietnamPro.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <SmoothScroll />
        <LoadingScreen />
        <Header />
        <main className="flex flex-1 flex-col overflow-x-clip">{children}</main>
        <Footer />
        <FloatingContact />
      </body>
    </html>
  );
}
