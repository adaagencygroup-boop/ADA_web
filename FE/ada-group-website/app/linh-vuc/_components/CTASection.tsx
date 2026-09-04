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
      <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto text-center flex flex-col items-center">
          <h2 className="text-[1.75rem] font-semibold leading-snug tracking-tight text-white sm:text-3xl lg:text-[2.5rem] mb-(--inner-space) max-w-4xl px-2 md:px-0">
            {CONTENT.heading}
          </h2>
          <p className="text-[14px] lg:text-[15px] leading-relaxed text-blue-100 max-w-2xl mb-(--section-padding) px-4 md:px-0">
            {CONTENT.paragraph}
          </p>

          <div className="flex flex-col w-full px-4 sm:px-0 sm:w-auto sm:flex-row items-center justify-center gap-(--inner-space)">
            <Link
              href={CONTENT.primaryCta.href}
              className="inline-flex w-full sm:w-auto min-w-50 items-center justify-center rounded-lg bg-[#004bb4] px-6 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-blue-600 shadow-sm"
            >
              {CONTENT.primaryCta.label}
            </Link>
            <Link
              href={CONTENT.secondaryCta.href}
              className="inline-flex w-full sm:w-auto min-w-50 items-center justify-center rounded-lg border border-white/40 bg-transparent px-6 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-white/10"
            >
              {CONTENT.secondaryCta.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
