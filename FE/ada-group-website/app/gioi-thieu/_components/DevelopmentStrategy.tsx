import Image from "next/image";

type IconProps = { className?: string };

function CapabilityIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 18 20" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10 8V1L1 12H8V19L17 8H10V8"
        stroke="#1E3A8A"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SolutionsIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 18 20" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M17 5L9 1L1 5M17 5L9 9M17 5V15L9 19M9 9L1 5M9 9V19M1 5V15L9 19"
        stroke="#1E3A8A"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function LongTermValueIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 20 19" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5 9L8 6L11 9L15 5M6 18L10 14L14 18M1 1H19M2 1H18V13C18 13.5519 17.5519 14 17 14H3C2.44808 14 2 13.5519 2 13V1L5 9"
        stroke="#1E3A8A"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function EyeIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M15 12C15 13.6557 13.6557 15 12 15C10.3443 15 9 13.6557 9 12C9 10.3443 10.3443 9 12 9C13.6557 9 15 10.3443 15 12V12"
        stroke="white"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.45703 12C3.73103 7.943 7.52203 5 11.999 5C16.477 5 20.267 7.943 21.541 12C20.267 16.057 16.477 19 11.999 19C7.52203 19 3.73103 16.057 2.45703 12V12"
        stroke="white"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const CONTENT = {
  eyebrow: "ĐỊNH HƯỚNG PHÁT TRIỂN",
  title: "Công nghệ thiết thực, nền tảng cho sự phát triển dài hạn",
  paragraphs: [
    "ADA Group hướng đến xây dựng những sản phẩm và giải pháp công nghệ gắn với nhu cầu thực tế của doanh nghiệp, có khả năng tạo ra giá trị trong quá trình sử dụng và tiếp tục phát triển khi nhu cầu thay đổi.",
    "Chúng tôi tập trung mở rộng năng lực trên các nền tảng Web, Mobile, hệ thống doanh nghiệp, AI & Automation, đồng thời tăng cường khả năng kết nối giữa sản phẩm, dữ liệu và quy trình để tạo nên những giải pháp ngày càng hoàn thiện.",
    "Thay vì chạy theo công nghệ một cách ngắn hạn, ADA Group ưu tiên lựa chọn công nghệ phù hợp, xây dựng nền tảng bền vững và đồng hành cùng doanh nghiệp trong quá trình chuyển đổi và phát triển.",
  ],
  ctaText:
    "Phát triển công nghệ từ nhu cầu hôm nay, tạo nền tảng cho những bước tiến dài hạn.",
};

const PRINCIPLES = [
  {
    icon: CapabilityIcon,
    title: "Phát triển năng lực",
    description: "Không ngừng nâng cao năng lực công nghệ và chất lượng sản phẩm.",
  },
  {
    icon: SolutionsIcon,
    title: "Mở rộng giải pháp",
    description:
      "Từng bước hoàn thiện hệ sinh thái giải pháp đáp ứng nhiều nhu cầu doanh nghiệp.",
  },
  {
    icon: LongTermValueIcon,
    title: "Giá trị dài hạn",
    description:
      "Xây dựng sản phẩm có khả năng thích ứng và tiếp tục phát triển theo thời gian.",
  },
];

const IMAGE = {
  src: "https://wtxsbaavzdvpzogiwoei.supabase.co/storage/v1/object/public/ADA%20Group%20website/cong-nghe-thiet-thuc.jpg",
  alt: "Đội ngũ ADA Group làm việc cùng nhau trong văn phòng",
};

export default function DevelopmentStrategy() {
  return (
    <section className="section-y bg-white">
      <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-x-16 lg:grid-cols-2">
          <div>
            <span className="text-[12px] lg:text-[12px] font-semibold uppercase leading-5 tracking-wider text-blue-900">
              {CONTENT.eyebrow}
            </span>
            <h2 className="mt-(--heading-space) text-[28px] font-semibold leading-[1.2] text-zinc-900 lg:text-[36px] lg:leading-[1.2]">
              {CONTENT.title}
            </h2>

            <div className="mt-(--inner-space)">
              {CONTENT.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-[14px] lg:text-[16px] text-justify sm:text-start leading-relaxed text-gray-600 [&+&]:mt-4"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-6 flex flex-col gap-6 lg:mt-8">
              {PRINCIPLES.map((principle) => (
                <div key={principle.title} className="flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-100">
                    <principle.icon />
                  </span>
                  <div>
                    <h3 className="text-[16px] lg:text-[18px] font-semibold leading-snug text-slate-900">
                      {principle.title}
                    </h3>
                    <p className="mt-1 text-[14px] lg:text-[16px] leading-relaxed text-gray-500">
                      {principle.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-(--inner-space) lg:mt-0">
            <div className="relative aspect-618/500 w-full overflow-hidden rounded-2xl shadow-lg">
              <Image
                src={IMAGE.src}
                alt={IMAGE.alt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>

            <div className="hidden mt-6 lg:flex items-center gap-4 rounded-xl border border-zinc-100 bg-white p-6 shadow-sm">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-900">
                <EyeIcon className="h-6 w-6" />
              </span>
              <p className="text-base font-semibold leading-6 text-slate-900">
                {CONTENT.ctaText}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
