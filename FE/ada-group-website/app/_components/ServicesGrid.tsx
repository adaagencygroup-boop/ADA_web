import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@/app/_components/icons";

const CONTENT = {
  title: "Công nghệ phục vụ những bài toán thực tế",
  description:
    "Chúng tôi không bắt đầu từ công nghệ, mà bắt đầu từ vấn đề cần giải quyết.\n Mỗi sản phẩm được xây dựng dựa trên nhu cầu thực tế, khả năng triển khai và giá trị mang lại cho người sử dụng.",
  detailLabel: "Chi tiết",
};

const SERVICES = [
  {
    iconSrc: "/images/home_images/service1.png",
    title: "Web & Web Application",
    description:
      "Phát triển website và ứng dụng web hiện đại, tối ưu cho nhu cầu vận hành và kinh doanh.",
    href: "/dich-vu/web",
  },
  {
    iconSrc: "/images/home_images/service2.png",
    title: "Mobile Application",
    description:
      "Xây dựng ứng dụng di động trải nghiệm trực quan, phù hợp với từng nhóm người dùng.",
    href: "/dich-vu/mobile",
  },
  {
    iconSrc: "/images/home_images/service3.png",
    title: "Hệ thống doanh nghiệp",
    description:
      "Số hoá quy trình quản lý, kết nối dữ liệu và hỗ trợ doanh nghiệp vận hành hiệu quả hơn.",
    href: "/dich-vu/he-thong-doanh-nghiep",
  },
  {
    iconSrc: "/images/home_images/service4.png",
    title: "AI & Automation",
    description:
      "Ứng dụng AI và tự động hoá vào các bài toán phù hợp để nâng cao năng suất và tối ưu hoá.",
    href: "/dich-vu/ai-automation",
  },
];

export default function ServicesGrid() {
  return (
    <section className="section-y">
      <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-2xl text-start sm:text-center font-bold tracking-tight text-zinc-900 sm:text-4xl">
            {CONTENT.title}
          </h2>
          <p className="mt-(--heading-space) text-sm leading-relaxed whitespace-pre-line text-zinc-600 text-justify md:text-base">
            {CONTENT.description}
          </p>
        </div>

        <div className="mt-(--inner-space) grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service) => (
            <div
              key={service.title}
              className="rounded-2xl border border-zinc-200 bg-[#F3F4F6] p-6"
            >
              <div className="flex items-center gap-3">
                <Image
                  src={service.iconSrc}
                  alt=""
                  width={48}
                  height={48}
                  className="h-12 w-12 shrink-0"
                />
                <h3 className="text-base font-semibold text-[#001E4B]">
                  {service.title}
                </h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                {service.description}
              </p>
              <Link
                href={service.href}
                className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-blue-700 hover:text-blue-800"
              >
                {CONTENT.detailLabel}
                <ArrowRightIcon className="h-3.5 w-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
