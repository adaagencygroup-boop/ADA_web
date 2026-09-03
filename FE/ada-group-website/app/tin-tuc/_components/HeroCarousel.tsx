import Link from "next/link";
import { ArrowRightIcon } from "@/app/_components/icons";

type IconProps = { className?: string };

function BrainIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M9.5 2a3.5 3.5 0 0 0-3.5 3.5v.5A3 3 0 0 0 3 9v1a3 3 0 0 0 1 2.24V15a3.5 3.5 0 0 0 3.5 3.5" />
      <path d="M14.5 2a3.5 3.5 0 0 1 3.5 3.5v.5A3 3 0 0 1 21 9v1a3 3 0 0 1-1 2.24V15a3.5 3.5 0 0 1-3.5 3.5" />
      <path d="M9.5 2v18M14.5 2v18" />
    </svg>
  );
}

function CodeIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="m8 6-6 6 6 6M16 6l6 6-6 6" />
    </svg>
  );
}

function NetworkIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="9" y="2" width="6" height="6" rx="1" />
      <rect x="2" y="16" width="6" height="6" rx="1" />
      <rect x="16" y="16" width="6" height="6" rx="1" />
      <path d="M12 8v4M12 12H5v4M12 12h7v4" />
    </svg>
  );
}

function SettingsIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
    </svg>
  );
}

function ChevronLeftIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
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

const SLIDE_ID = (index: number) => `hero-slide-${index}`;

export default function HeroCarousel() {
  const slideCss = SLIDES.map(
    (_, index) =>
      `.hero-carousel:has(#${SLIDE_ID(index)}:checked) .hero-track { transform: translateX(-${index * 100}%); }` +
      `.hero-carousel:has(#${SLIDE_ID(index)}:checked) .hero-dot-${index} { background-color: rgba(255,255,255,1); }` +
      `.hero-carousel:has(#${SLIDE_ID(index)}:checked) .hero-prev-${index} { display: flex; }` +
      `.hero-carousel:has(#${SLIDE_ID(index)}:checked) .hero-next-${index} { display: flex; }`,
  ).join("\n");

  return (
    <section className="section-y pb-0!">
      <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
        <div className="hero-carousel relative overflow-hidden rounded-2xl bg-linear-to-br from-[#0B1F4D] via-[#0F2A63] to-[#173B82]">
          <style>{slideCss}</style>

          {SLIDES.map((_, index) => (
            <input
              key={SLIDE_ID(index)}
              type="radio"
              name="hero-slide"
              id={SLIDE_ID(index)}
              defaultChecked={index === 0}
              className="sr-only"
            />
          ))}

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_1px_1px,rgba(147,197,253,0.35)_1px,transparent_0)] bg-size-[28px_28px] opacity-40"
          />

          {SLIDES.length > 1 &&
            SLIDES.map((_, index) => (
              <div key={SLIDE_ID(index)}>
                <label
                  htmlFor={SLIDE_ID(
                    (index - 1 + SLIDES.length) % SLIDES.length,
                  )}
                  aria-label="Slide trước"
                  className={`hero-prev-${index} absolute top-1/2 left-3 z-20 hidden h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 lg:left-6`}
                >
                  <ChevronLeftIcon />
                </label>
                <label
                  htmlFor={SLIDE_ID((index + 1) % SLIDES.length)}
                  aria-label="Slide tiếp theo"
                  className={`hero-next-${index} absolute top-1/2 right-3 z-20 hidden h-9 w-9 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 lg:right-6`}
                >
                  <ChevronRightIcon />
                </label>
              </div>
            ))}

          <div className="overflow-hidden">
            <div className="hero-track flex transition-transform duration-500 ease-in-out">
              {SLIDES.map((slide) => (
                <div
                  key={slide.title}
                  className="flex w-full shrink-0 flex-col items-start gap-6 px-6 py-10 sm:px-10 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:px-16 lg:py-12"
                >
                  <div className="flex flex-col items-start gap-2 lg:w-150">
                    <h2 className="text-3xl leading-tight font-semibold text-white lg:text-4xl">
                      {slide.title}
                    </h2>
                    <p className="text-lg text-blue-100 lg:text-2xl">
                      {slide.subtitle}
                    </p>

                    <div className="mt-2 flex flex-wrap items-start gap-x-6 gap-y-4 py-2 lg:flex-nowrap lg:gap-8">
                      {slide.features.map((feature) => (
                        <div
                          key={feature.label}
                          className="flex items-center gap-2"
                        >
                          <feature.icon className="h-5 w-5 shrink-0 text-blue-300" />
                          <span className="text-sm leading-[1.3] font-medium whitespace-pre-line text-white">
                            {feature.label}
                          </span>
                        </div>
                      ))}
                    </div>

                    <Link
                      href={slide.ctaHref}
                      className="mt-2 inline-flex items-center gap-2 rounded-md bg-[#1961E6] px-6 py-2.5 text-base font-medium text-white transition-colors hover:bg-blue-700"
                    >
                      {slide.ctaLabel}
                      <ArrowRightIcon className="h-3 w-3" />
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
              ))}
            </div>
          </div>

          {SLIDES.length > 1 && (
            <div className="relative z-20 flex items-center justify-center gap-2 pb-4">
              {SLIDES.map((slide, index) => (
                <label
                  key={slide.title}
                  htmlFor={SLIDE_ID(index)}
                  aria-label={`Đến slide ${index + 1}`}
                  className={`hero-dot-${index} h-2 w-2 cursor-pointer rounded-full bg-white/40`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
