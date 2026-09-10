"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ArrowRightIcon } from "@/app/_components/icons";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Pagination, A11y, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

type IconProps = { className?: string };

function BrainIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M9.5 2a3.5 3.5 0 0 0-3.5 3.5v.5A3 3 0 0 0 3 9v1a3 3 0 0 0 1 2.24V15a3.5 3.5 0 0 0 3.5 3.5" />
      <path d="M14.5 2a3.5 3.5 0 0 1 3.5 3.5v.5A3 3 0 0 1 21 9v1a3 3 0 0 1-1 2.24V15a3.5 3.5 0 0 1-3.5 3.5" />
      <path d="M9.5 2v18M14.5 2v18" />
    </svg>
  );
}

function CodeIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="m8 6-6 6 6 6M16 6l6 6-6 6" />
    </svg>
  );
}

function NetworkIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="9" y="2" width="6" height="6" rx="1" />
      <rect x="2" y="16" width="6" height="6" rx="1" />
      <rect x="16" y="16" width="6" height="6" rx="1" />
      <path d="M12 8v4M12 12H5v4M12 12h7v4" />
    </svg>
  );
}

function SettingsIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
    </svg>
  );
}

function ChevronLeftIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

const SERVICE_FEATURES = [
  { icon: BrainIcon, label: "Tư vấn chiến lược" },
  { icon: CodeIcon, label: "Phát triển AI" },
  { icon: NetworkIcon, label: "Tích hợp hệ thống" },
  { icon: SettingsIcon, label: "Vận hành & Tối ưu hóa" },
];

const SLIDES = [
  {
    title: "Ứng dụng AI và Tự động hóa",
    subtitle: "Khai thác dữ liệu, tối ưu quy trình vận hành",
    features: SERVICE_FEATURES,
    ctaLabel: "Tìm hiểu ngay",
    ctaHref: "/dich-vu/ai-automation",
    badge: "AI",
  },
  {
    title: "Số hóa quy trình doanh nghiệp",
    subtitle: "Kết nối dữ liệu và vận hành xuyên suốt tổ chức",
    features: SERVICE_FEATURES,
    ctaLabel: "Tìm hiểu ngay",
    ctaHref: "/dich-vu/he-thong-doanh-nghiep",
    badge: "ERP",
  },
  {
    title: "Phát triển ứng dụng di động",
    subtitle: "Đưa sản phẩm và dịch vụ đến gần người dùng hơn",
    features: SERVICE_FEATURES,
    ctaLabel: "Tìm hiểu ngay",
    ctaHref: "/dich-vu/mobile",
    badge: "APP",
  },
  {
    title: "Xây dựng nền tảng Web hiện đại",
    subtitle: "Phục vụ hoạt động kinh doanh và trải nghiệm khách hàng",
    features: SERVICE_FEATURES,
    ctaLabel: "Tìm hiểu ngay",
    ctaHref: "/dich-vu/web",
    badge: "WEB",
  },
];

export default function HeroCarousel() {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className="section-y pb-0!">
      <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl bg-[#003274]">
          {/* Background */}
          <div className="absolute inset-0 bg-linear-to-r from-[#001A40] to-[#003274] opacity-90" />
          <Image
            src="https://wtxsbaavzdvpzogiwoei.supabase.co/storage/v1/object/public/ADA%20Group%20website/news-banner.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover mix-blend-overlay opacity-50"
          />

          {/* Prev button */}
          <button
            type="button"
            aria-label="Slide trước"
            onClick={() => swiperRef.current?.slidePrev()}
            className="absolute top-1/2 left-3 z-20 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 lg:left-6"
          >
            <ChevronLeftIcon />
          </button>

          {/* Next button */}
          <button
            type="button"
            aria-label="Slide tiếp theo"
            onClick={() => swiperRef.current?.slideNext()}
            className="absolute top-1/2 right-3 z-20 flex h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 lg:right-6"
          >
            <ChevronRightIcon />
          </button>

          {/* Pagination dots style */}
          <style>{`
            .hero-swiper .swiper-pagination {
              position: absolute;
              bottom: 16px;
              z-index: 20;
            }
            .hero-swiper .swiper-pagination-bullet {
              background: rgba(255,255,255,0.4);
              opacity: 1;
              width: 8px;
              height: 8px;
              transition: background 0.2s;
            }
            .hero-swiper .swiper-pagination-bullet-active {
              background: white;
            }
            .hero-swiper .swiper-slide {
              display: flex;
              align-items: center;
              min-height: 240px;
            }
            @media (min-width: 1024px) {
              .hero-swiper .swiper-slide {
                min-height: 300px;
              }
            }
          `}</style>

          <Swiper
            className="hero-swiper relative z-10"
            modules={[Pagination, A11y, Autoplay]}
            pagination={{ clickable: true }}
            loop
            speed={500}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            onSwiper={(swiper) => { swiperRef.current = swiper; }}
            a11y={{ prevSlideMessage: "Slide trước", nextSlideMessage: "Slide tiếp theo" }}
          >
            {SLIDES.map((slide) => (
              <SwiperSlide key={slide.badge}>
                <div className="mx-auto w-full max-w-360 flex flex-col items-start gap-4 px-10 py-6 sm:px-12 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:px-20 lg:py-12">
                  <div className="flex flex-col items-start gap-2 lg:w-150">
                    <h2 className="text-xl leading-tight font-semibold text-white sm:text-2xl lg:text-4xl">
                      {slide.title}
                    </h2>
                    <p className="text-sm text-blue-100 sm:text-base lg:text-2xl">
                      {slide.subtitle}
                    </p>

                    <div className="mt-1 flex flex-wrap items-start gap-x-4 gap-y-2 py-1 lg:flex-nowrap lg:gap-8">
                      {slide.features.map((feature) => (
                        <div key={feature.label} className="flex items-center gap-1.5">
                          <feature.icon className="h-4 w-4 shrink-0 text-blue-300 lg:h-5 lg:w-5" />
                          <span className="text-xs leading-[1.3] font-medium whitespace-pre-line text-white lg:text-sm">
                            {feature.label}
                          </span>
                        </div>
                      ))}
                    </div>

                    <Link
                      href={slide.ctaHref}
                      className="mt-1 inline-flex items-center gap-1.5 rounded-md bg-[#1961E6] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 lg:px-6 lg:py-2.5 lg:text-base group"
                    >
                      <span>{slide.ctaLabel}</span>
                      <ArrowRightIcon className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>

                  <div className="hidden shrink-0 items-center justify-center lg:flex">
                    <div className="relative flex h-48 w-48 items-center justify-center rounded-2xl border-2 border-blue-400 bg-blue-900/50 shadow-[0_10px_15px_-3px_rgba(59,130,246,0.2),0_4px_6px_-4px_rgba(59,130,246,0.2)] backdrop-blur-sm">
                      <span className="text-6xl font-semibold text-blue-300">
                        {slide.badge}
                      </span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
