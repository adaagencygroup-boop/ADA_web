import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@/app/_components/icons";

const CONTENT = {
  badge: "ADA GROUP",
  title: "Đồng hành cùng doanh nghiệp trên hành trình chuyển đổi số",
  paragraphs: [
    "ADA Group là công ty công nghệ tập trung phát triển các sản phẩm và giải pháp phần mềm phục vụ những nhu cầu thực tế của doanh nghiệp và người dùng Việt Nam.",
    "Từ website, web application đến các hệ thống quản lý và nền tảng chuyên biệt, chúng tôi kết hợp công nghệ, tư duy sản phẩm và hiểu biết về bài toán kinh doanh để tạo ra những giải pháp có tính ứng dụng cao.",
  ],
  ctaLabel: "Trao đổi thông tin chi tiết",
  ctaHref: "/gioi-thieu",
};

const IMAGES = {
  primary: {
    src: "https://picsum.photos/700/500",
    alt: "Không gian làm việc tại văn phòng ADA Group",
  },
  secondary: {
    src: "https://picsum.photos/701/500",
    alt: "Hệ thống hạ tầng máy chủ của ADA Group",
  },
};

export default function AboutHighlight() {
  return (
    <section className="section-y mx-auto max-w-360 px-4 sm:px-6 lg:px-8 bg-[#EFF6FF] md:bg-white">
      <div className="grid grid-cols-1 items-center gap-x-12 lg:grid-cols-2">
        <div className="order-1 lg:order-0 lg:col-start-2 lg:row-start-1">
          <span className="inline-flex items-center rounded-full bg-[#D8E2FF] px-3 py-1 text-sm font-semibold text-[#002A64]">
            {CONTENT.badge}
          </span>
          <h2 className="mt-(--heading-space) text-2xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
            {CONTENT.title}
          </h2>
        </div>

        <div className="relative order-2 mx-auto mt-(--inner-space) pb-15 pr-22.5 md:w-143 md:pb-10 md:pr-56 lg:order-0 lg:col-start-1 lg:row-start-1 lg:row-span-2 lg:mx-0 lg:mt-0 lg:w-full lg:max-w-none lg:pb-[8%] lg:pr-0">
          <div className="relative h-35 w-55 overflow-hidden rounded-2xl md:h-62.5 md:w-87 lg:aspect-348/250 lg:h-auto lg:w-[55%]">
            <Image
              src={IMAGES.primary.src}
              alt={IMAGES.primary.alt}
              fill
              sizes="(min-width: 1024px) 35vw, (min-width: 768px) 348px, 220px"
              className="object-cover"
            />
          </div>
          <div className="absolute bottom-0 right-0 h-30 w-45 overflow-hidden rounded-xl border-4 border-white shadow-lg md:h-62.5 md:w-87 md:border lg:aspect-348/250 lg:h-auto lg:w-[55%]">
            <Image
              src={IMAGES.secondary.src}
              alt={IMAGES.secondary.alt}
              fill
              sizes="(min-width: 1024px) 28vw, (min-width: 768px) 348px, 180px"
              className="object-cover"
            />
          </div>
        </div>

        <div className="order-3 mt-(--inner-space) lg:order-0 lg:col-start-2 lg:row-start-2 lg:mt-(--heading-space)">
          {CONTENT.paragraphs.map((paragraph) => (
            <p
              key={paragraph}
              className="text-sm leading-relaxed text-zinc-600 text-justify sm:text-base [&+&]:mt-4 md:text-lg"
            >
              {paragraph}
            </p>
          ))}
          <Link
            href={CONTENT.ctaHref}
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 hover:text-blue-800"
          >
            {CONTENT.ctaLabel}
            <ArrowRightIcon className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
