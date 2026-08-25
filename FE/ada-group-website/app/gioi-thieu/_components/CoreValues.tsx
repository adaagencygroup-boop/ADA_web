type IconProps = { className?: string };

function RealisticIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 16 20" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 5C12 7.20766 10.2077 9 8 9C5.79234 9 4 7.20766 4 5C4 2.79234 5.79234 1 8 1C10.2077 1 12 2.79234 12 5V5M8 12C4.13659 12 1 15.1366 1 19H15C15 15.1366 11.8634 12 8 12V12"
        stroke="#1E3A8A"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function InnovationIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M7 10.056L9 12.056L13 8.056M18.618 4.04C15.4561 4.20792 12.3567 3.11461 10 1C7.64327 3.11461 4.5439 4.20792 1.382 4.04C1.12754 5.02511 0.999177 6.03855 1 7.056C1 12.647 4.824 17.346 10 18.678C15.176 17.346 19 12.648 19 7.056C19 6.014 18.867 5.004 18.618 4.04L7 10.056"
        stroke="#1E3A8A"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function UserCentricIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 18 20" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1 5V15C1 17.21 4.582 19 9 19C13.418 19 17 17.21 17 15V5M1 5C1 7.21 4.582 9 9 9C13.418 9 17 7.21 17 5M1 5C1 2.79 4.582 1 9 1C13.418 1 17 2.79 17 5M17 10C17 12.21 13.418 14 9 14C4.582 14 1 12.21 1 10"
        stroke="#1E3A8A"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PartnershipIcon({ className = "h-6 w-6" }: IconProps) {
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

const CONTENT = {
  title: "Giá trị cốt lõi",
};

const VALUES = [
  {
    icon: RealisticIcon,
    title: "Thực tế",
    description:
      "Tập trung vào những bài toán thực tế và giá trị mà sản phẩm mang lại cho người dùng.",
  },
  {
    icon: InnovationIcon,
    title: "Đổi mới",
    description:
      "Không ngừng cập nhật công nghệ và tìm kiếm những cách tiếp cận hiệu quả hơn.",
  },
  {
    icon: UserCentricIcon,
    title: "Người dùng là trung tâm",
    description:
      "Thiết kế sản phẩm dựa trên nhu cầu, hành vi và trải nghiệm thực tế của người sử dụng.",
  },
  {
    icon: PartnershipIcon,
    title: "Đồng hành",
    description:
      "Cùng khách hàng từ giai đoạn ý tưởng, phát triển đến triển khai và vận hành sản phẩm.",
  },
];

export default function CoreValues() {
  return (
    <section className="section-y bg-white">
      <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-[22px] font-extrabold leading-8 text-slate-900 lg:text-3xl lg:font-semibold lg:leading-9 lg:text-black">
            {CONTENT.title}
          </h2>
          <span className="mt-4 h-1 w-12 shrink-0 rounded-full bg-[#002A64] lg:bg-blue-900" />
        </div>

        <div className="mt-(--inner-space) grid grid-cols-2 gap-x-5 gap-y-4 lg:grid-cols-4 lg:gap-2.5">
          {VALUES.map((value) => (
            <div
              key={value.title}
              className="flex flex-col gap-2 rounded-xl bg-slate-100 p-4 lg:gap-3 lg:rounded-2xl lg:border lg:border-[#F3F4F6] lg:bg-[#F3F4F6] lg:p-8 lg:shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.05),0px_2px_4px_-1px_rgba(0,0,0,0.03)]"
            >
              <div className="flex items-center gap-2.5">
                <span className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 lg:flex">
                  <value.icon />
                </span>
                <h3 className="text-base font-semibold leading-[23px] text-slate-900 lg:text-xl lg:leading-7">
                  {value.title}
                </h3>
              </div>
              <p className="text-[13px] text-justify leading-4.5 text-zinc-500 lg:text-sm lg:leading-[23px] lg:text-gray-600">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
