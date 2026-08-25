import { CheckCircleIcon } from "@/app/_components/icons";

type IconProps = { className?: string };

function AiChipIcon({ className = "h-9 w-9" }: IconProps) {
  return (
    <svg
      width="39"
      height="40"
      viewBox="0 0 39 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M6 40V31.4C4.1 29.6667 2.625 27.6417 1.575 25.325C0.525 23.0083 0 20.5667 0 18C0 13 1.75 8.75 5.25 5.25C8.75 1.75 13 0 18 0C22.1667 0 25.8583 1.225 29.075 3.675C32.2917 6.125 34.3833 9.31667 35.35 13.25L37.95 23.5C38.1167 24.1333 38 24.7083 37.6 25.225C37.2 25.7417 36.6667 26 36 26H32V32C32 33.1 31.6083 34.0417 30.825 34.825C30.0417 35.6083 29.1 36 28 36H24V40H20V32H28V22H33.4L31.5 14.25C30.7333 11.2167 29.1 8.75 26.6 6.85C24.1 4.95 21.2333 4 18 4C14.1333 4 10.8333 5.35 8.1 8.05C5.36667 10.75 4 14.0333 4 17.9C4 19.9 4.40833 21.8 5.225 23.6C6.04167 25.4 7.2 27 8.7 28.4L10 29.6V40H6ZM16 26H20L20.3 23.5C20.5667 23.4 20.8083 23.2833 21.025 23.15C21.2417 23.0167 21.4333 22.8667 21.6 22.7L23.9 23.7L25.9 20.3L23.9 18.8C23.9667 18.5333 24 18.2667 24 18C24 17.7333 23.9667 17.4667 23.9 17.2L25.9 15.7L23.9 12.3L21.6 13.3C21.4333 13.1333 21.2417 12.9833 21.025 12.85C20.8083 12.7167 20.5667 12.6 20.3 12.5L20 10H16L15.7 12.5C15.4333 12.6 15.1917 12.7167 14.975 12.85C14.7583 12.9833 14.5667 13.1333 14.4 13.3L12.1 12.3L10.1 15.7L12.1 17.2C12.0333 17.4667 12 17.7333 12 18C12 18.2667 12.0333 18.5333 12.1 18.8L10.1 20.3L12.1 23.7L14.4 22.7C14.5667 22.8667 14.7583 23.0167 14.975 23.15C15.1917 23.2833 15.4333 23.4 15.7 23.5L16 26ZM18 21C17.1667 21 16.4583 20.7083 15.875 20.125C15.2917 19.5417 15 18.8333 15 18C15 17.1667 15.2917 16.4583 15.875 15.875C16.4583 15.2917 17.1667 15 18 15C18.8333 15 19.5417 15.2917 20.125 15.875C20.7083 16.4583 21 17.1667 21 18C21 18.8333 20.7083 19.5417 20.125 20.125C19.5417 20.7083 18.8333 21 18 21Z" fill="#1A4182"/>
    </svg>
  );
}

const CONTENT = {
  badge: "TẦM NHÌN CHIẾN LƯỢC",
  heading: "Ứng dụng Hệ sinh thái AI đa lĩnh vực",
  paragraph:
    "ADA Group phát triển hệ sinh thái AI trên 14 lĩnh vực trọng điểm của nền kinh tế. Mỗi lĩnh vực được lựa chọn dựa trên những bài toán thực tế, có khả năng tạo ra giá trị rõ ràng cho doanh nghiệp và người dùng Việt Nam.",
  criteriaHeading: "Chúng tôi tập trung vào 3 tiêu chí cốt lõi:",
  criteria: [
    "Có bài toán đủ lớn để AI tạo ra giá trị vượt trội.",
    "Có dữ liệu và điều kiện sẵn sàng để triển khai thực tế.",
    "Có nhu cầu ứng dụng và khả năng mở rộng quy mô lâu dài.",
  ],
  card: {
    title: "Đột phá Công nghệ",
    description: "Kiến tạo tương lai số bằng trí tuệ nhân tạo thuần Việt.",
  },
};

export default function AIEcosystem() {
  return (
    <section className="section-y bg-white">
      <div className="mx-auto flex max-w-360 flex-col items-start gap-8 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-center lg:gap-20 lg:px-8">
        <div className="flex flex-col items-start gap-4 lg:w-[610px] lg:shrink-0 lg:gap-6">
          <span className="inline-flex items-center rounded-full bg-[#D5E3FD] px-4 py-1.5 text-[11px] font-bold tracking-widest text-[#57657B] uppercase lg:text-base lg:font-normal lg:tracking-[1.6px]">
            {CONTENT.badge}
          </span>

          <h2 className="text-[28px] leading-[1.21] font-extrabold text-[#002A64] lg:text-5xl lg:leading-[1.25] lg:font-semibold lg:tracking-[-0.96px]">
            {CONTENT.heading}
          </h2>

          <div className="flex flex-col items-start gap-4 lg:gap-5.75 lg:pt-1.5">
            <p className="text-sm leading-[1.57] text-[#475569] lg:text-lg lg:leading-[1.6] lg:text-[#434750]">
              {CONTENT.paragraph}
            </p>

            <div className="flex flex-col items-start gap-3">
              <p className="text-sm font-semibold text-zinc-900 lg:text-lg lg:text-[#191C1E]">
                {CONTENT.criteriaHeading}
              </p>
              <ul className="flex flex-col items-start gap-3">
                {CONTENT.criteria.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircleIcon className="mt-1 h-5 w-5 shrink-0 text-[#002A64]" />
                    <span className="text-sm leading-[1.57] text-[#475569] lg:text-lg lg:leading-[1.6] lg:text-[#434750]">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="relative flex aspect-610/500 w-full items-center justify-center overflow-hidden rounded-2xl border border-[#C4C6D2]/10 bg-[#E6E8EA] p-6 shadow-2xl lg:w-[610px] lg:shrink-0 lg:rounded-3xl">
          <div className="flex w-full max-w-96 flex-col items-center gap-2 rounded-2xl border border-white/20 bg-white/80 px-8 py-8 text-center shadow-xl backdrop-blur-md">
            <AiChipIcon className="h-10 w-10 text-[#1A4182]" />
            <h3 className="mt-1 text-2xl font-semibold text-[#002A64]">
              {CONTENT.card.title}
            </h3>
            <p className="text-base text-[#434750]">
              {CONTENT.card.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
