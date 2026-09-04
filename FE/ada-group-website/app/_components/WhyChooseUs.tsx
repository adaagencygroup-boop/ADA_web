import Link from "next/link";
import { ArrowRightIcon, WhyChoose1Icon, WhyChoose2Icon, WhyChoose3Icon, WhyChoose4Icon } from "@/app/_components/icons";

const CONTENT = {
  title: "Vì sao doanh nghiệp lựa chọn ADA Group?",
  description:
    "Chúng tôi không chỉ phát triển phần mềm, mà còn đồng hành cùng doanh nghiệp trong toàn bộ quá trình từ phân tích nhu cầu, xây dựng, triển khai đến vận hành giải pháp.",
  ctaLabel: "Khám phá giải pháp của ADA Group",
  ctaHref: "/dich-vu",
};

const REASONS = [
  {
    Icon: WhyChoose1Icon,
    title: "Giải pháp theo nhu cầu",
    description:
      "Chúng tôi bắt đầu từ bài toán thực tế của doanh nghiệp để xây dựng giải pháp phù hợp với mục tiêu, quy mô và cách thức vận hành.",
  },
  {
    Icon: WhyChoose2Icon,
    title: "Am hiểu thị trường Việt Nam",
    description:
      "Hiểu nhu cầu, hành vi người dùng và đặc thù vận hành của doanh nghiệp Việt giúp chúng tôi tạo ra những sản phẩm phù hợp hơn.",
  },
  {
    Icon: WhyChoose3Icon,
    title: "Năng lực công nghệ đa dạng",
    description:
      "Từ Website, Web App, Mobile App đến Cloud, AI và tự động hóa, chúng tôi lựa chọn công nghệ phù hợp cho từng bài toán.",
  },
  {
    Icon: WhyChoose4Icon,
    title: "Triển khai linh hoạt",
    description:
      "Giải pháp được thiết kế để dễ triển khai, vận hành và mở rộng theo nhu cầu phát triển của doanh nghiệp.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="section-y ">
      <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
          {CONTENT.title}
        </h2>
        <p className="mt-(--heading-space) text-base leading-relaxed text-zinc-600">
          {CONTENT.description}
        </p>

        <div className="mt-(--inner-space) grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-x-6 md:gap-x-12 sm:gap-y-12">
          {REASONS.map((reason) => (
            <div
              key={reason.title}
              className="rounded-2xl border border-zinc-200 p-6 sm:border-0 bg-white "
            >
              <div
                className={[
                  "grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-3 sm:gap-y-2",
                  '[grid-template-areas:"title_title"_"icon_desc"]',
                  'sm:[grid-template-areas:"icon_title"_"._desc"]',
                ].join(" ")}
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D8E2FF] [grid-area:icon]">
                  <reason.Icon className="h-5 w-5" />
                </span>
                <h3 className="text-xl font-semibold text-[#001E4B] [grid-area:title]">
                  {reason.title}
                </h3>
                <p className="text-base leading-relaxed text-zinc-600 [grid-area:desc]">
                  {reason.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-(--inner-space) pt-5 flex justify-center">
          <Link
            href={CONTENT.ctaHref}
            className="inline-flex items-center gap-2 rounded-full bg-blue-950 px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-blue-900 sm:text-base"
          >
            {CONTENT.ctaLabel}
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
