import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import Header from "@/src/components/layout/Header";
import Footer from "@/src/components/layout/Footer";
import "./globals.css";

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-be-vietnam",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "ADA Group",
  description:
    "ADA Group phát triển sản phẩm và giải pháp công nghệ giúp doanh nghiệp Việt Nam số hóa hoạt động và chuyển đổi số.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${beVietnamPro.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex flex-1 flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
