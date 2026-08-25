import Link from "next/link";

const CONTENT = {
  heading: "Bạn quan tâm đến lĩnh vực nào?",
  paragraph:
    "Chúng tôi luôn sẵn sàng lắng nghe và hợp tác để cùng nhau kiến tạo những giá trị mới thông qua sức mạnh của Trí tuệ nhân tạo.",
  primaryCta: { label: "Liên hệ hợp tác", href: "/lien-he" },
  secondaryCta: { label: "Xem tất cả dự án", href: "/du-an" },
};

export default function CTASection() {
  return (
    <section className="section-y bg-[#002A64]">
      <div className="mx-auto flex max-w-360 flex-col items-start gap-3 px-8 lg:items-center lg:gap-6 lg:px-16">
        <h2 className="text-[22px] leading-8 font-semibold text-white lg:text-center lg:text-5xl lg:leading-[58px] lg:font-semibold lg:tracking-[-0.96px]">
          {CONTENT.heading}
        </h2>
        <p className="text-[13px] leading-[18px] text-[#DBEAFE] lg:max-w-3xl lg:text-center lg:text-lg lg:leading-[29px] lg:text-[#D5E3FD]">
          {CONTENT.paragraph}
        </p>

        <div className="flex w-full flex-col items-stretch gap-3 lg:w-auto lg:flex-row lg:items-start lg:gap-6">
          <Link
            href={CONTENT.primaryCta.href}
            className="rounded-lg bg-white px-3.5 py-3.5 text-center text-sm font-bold text-[#002A64] lg:rounded-xl lg:px-20 lg:py-4 lg:text-base lg:font-normal lg:shadow-lg"
          >
            {CONTENT.primaryCta.label}
          </Link>
          <Link
            href={CONTENT.secondaryCta.href}
            className="rounded-lg border border-white px-3.5 py-3.5 text-center text-sm font-bold text-white lg:rounded-xl lg:border-[#C4C6D2]/30 lg:bg-[#1A4182] lg:px-20 lg:py-4 lg:text-base lg:font-normal"
          >
            {CONTENT.secondaryCta.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
