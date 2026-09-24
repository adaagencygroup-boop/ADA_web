import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@/app/_components/icons";
import HologramAware from "@/src/components/common/HologramAware";

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
    src: "/images/home_images/AboutHighlight1.webp",
    alt: "Không gian làm việc tại văn phòng ADA Group",
  },
  secondary: {
    src: "/images/home_images/AboutHighlight.webp",
    alt: "Hệ thống hạ tầng máy chủ của ADA Group",
  },
};

export default function AboutHighlight() {
  return (
    <section className="section-y pt-0!">
      <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-x-12 md:grid-cols-2">
          <div className="order-1 md:order-0 md:col-start-2 md:row-start-1">
            <span className="inline-flex items-center rounded-full bg-[#D8E2FF] px-3 py-1 text-[12px] font-semibold text-[#002A64] lg:text-[12px]">
              {CONTENT.badge}
            </span>
            <h2 className="mt-(--heading-space) text-[28px] leading-[1.2] font-semibold tracking-tight text-zinc-900 lg:text-[36px] lg:leading-[1.3]">
              {CONTENT.title}
            </h2>
          </div>

          <HologramAware>
            <div className="relative order-2 mx-auto mt-(--inner-space) pb-15 pr-22.5 md:w-143 md:pb-10 md:pr-56 lg:order-0 lg:col-start-1 lg:row-start-1 lg:row-span-2 lg:mx-0 lg:mt-0 lg:w-full lg:max-w-none lg:pb-[8%] lg:pr-0">
              <div className="relative h-35 w-55 overflow-hidden rounded-2xl md:h-62.5 md:w-87 lg:aspect-348/250 lg:h-auto lg:w-[55%]">
                <Image
                  src={IMAGES.primary.src}
                  alt={IMAGES.primary.alt}
                  fill
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZTJlOGYwIi8+PC9zdmc+"
                  sizes="(min-width: 1024px) 35vw, (min-width: 768px) 348px, 220px"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="absolute bottom-0 right-0 h-30 w-45 overflow-hidden rounded-xl border-4 border-white shadow-lg md:h-62.5 md:w-87 md:border lg:aspect-348/250 lg:h-auto lg:w-[55%]">
                <Image
                  src={IMAGES.secondary.src}
                  alt={IMAGES.secondary.alt}
                  fill
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZTJlOGYwIi8+PC9zdmc+"
                  sizes="(min-width: 1024px) 28vw, (min-width: 768px) 348px, 180px"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            </div>
          </HologramAware>

          <div className="order-3 mt-(--inner-space) md:order-0 md:col-start-2 md:row-start-2 md:mt-(--heading-space)">
            {CONTENT.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="text-[14px] lg:text-[16px] leading-relaxed text-zinc-600 text-justify [&+&]:mt-4"
              >
                {paragraph}
              </p>
            ))}
            <Link
              href={CONTENT.ctaHref}
              className="group mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 hover:text-blue-800"
            >
              {CONTENT.ctaLabel}
              <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
