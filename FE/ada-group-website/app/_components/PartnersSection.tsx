import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@/app/_components/icons";

const CONTENT = {
  badge: "ĐỐI TÁC",
  title: "Đồng hành cùng các đối tác đáng tin cậy",
  description:
    "Chúng tôi tự hào được hợp tác và đồng hành cùng các doanh nghiệp Việt.",
  ctaLabel: "Xem tất cả đối tác",
  ctaHref: "/doi-tac",
};

const PARTNERS = [
  {
    name: "GreenSoft",
    description: "Giải pháp phần mềm",
    logoSrc: "https://picsum.photos/150/50?random=1",
    logoWidth: 149,
    logoHeight: 44,
  },
  {
    name: "CloudOne",
    description: "Dịch vụ Cloud & Hosting",
    logoSrc: "https://picsum.photos/150/50?random=2",
    logoWidth: 155,
    logoHeight: 29,
  },
  {
    name: "MISA SME",
    description: "Phần mềm kế toán",
    logoSrc: "https://picsum.photos/150/50?random=3",
    logoWidth: 149,
    logoHeight: 33,
  },
  {
    name: "SapoGo",
    description: "Giải pháp bán hàng online",
    logoSrc: "https://picsum.photos/150/50?random=4",
    logoWidth: 142,
    logoHeight: 40,
  },
];

export default function PartnersSection() {
  return (
    <section className="section-y bg-[#EFF6FF] xs:bg-white">
      <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl sm:text-center">
          <span className="inline-flex items-center rounded-full bg-[#D8E2FF] px-3 py-1 text-sm font-semibold text-[#002A64]">
              {CONTENT.badge}
            </span>
          <h2 className="mt-(--heading-space) text-2xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
            {CONTENT.title}
          </h2>
          <p className="mt-(--inner-space) hidden sm:inline text-sm leading-relaxed text-zinc-600 sm:text-base md:text-lg">
            {CONTENT.description}
          </p>
        </div>

        <div className="mt-(--inner-space) grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PARTNERS.map((partner) => (
            <div
              key={partner.name}
              className="flex flex-col items-center rounded-2xl border border-zinc-200 bg-white p-8"
            >
              <div className="flex h-11 items-center">
                <Image
                  src={partner.logoSrc}
                  alt={partner.name}
                  width={partner.logoWidth}
                  height={partner.logoHeight}
                  className="h-auto max-h-11 w-autos scale-85"
                />
              </div>
              <h3 className="mt-4 text-base font-semibold text-[#001E4B]">
                {partner.name}
              </h3>
              <p className="mt-1 text-sm text-zinc-600">{partner.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-(--inner-space) text-center">
          <Link
            href={CONTENT.ctaHref}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-700 hover:text-blue-800"
          >
            {CONTENT.ctaLabel}
            <ArrowRightIcon className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
