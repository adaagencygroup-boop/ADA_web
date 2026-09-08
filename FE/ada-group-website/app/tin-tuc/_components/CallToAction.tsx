import Link from "next/link";

const CONTENT = {
  title: "Bạn quan tâm đến cơ hội hợp tác cùng ADA Group?",
  description:
    "Hãy để lại thông tin hoặc liên hệ trực tiếp để chúng tôi đồng hành cùng bạn trên hành trình chuyển đổi số.",
  primaryCta: { label: "Liên hệ ngay", href: "/lien-he" },
  secondaryCta: { label: "Tìm hiểu về chúng tôi", href: "/gioi-thieu" },
};

export default function CallToAction() {
  return (
    <section className="section-y relative overflow-hidden bg-[#002A64]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(81.13%_300.15%_at_80%_50%,#4A90E2_0%,rgba(74,144,226,0)_50%)] opacity-20"
      />

      <div className="relative mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto text-center flex flex-col items-center">
          <h2 className="text-[28px] lg:text-[36px] font-semibold leading-[1.2] tracking-tight text-white mb-(--inner-space) max-w-4xl px-2 md:px-0">
            {CONTENT.title}
          </h2>
          <p className="text-[14px] lg:text-[16px] leading-relaxed text-blue-100 max-w-2xl mb-(--section-padding) px-4 md:px-0">
            {CONTENT.description}
          </p>

          <div className="flex flex-col w-full px-4 sm:px-0 sm:w-auto sm:flex-row items-center justify-center gap-(--inner-space)">
            <Link
              href={CONTENT.primaryCta.href}
              className="inline-flex w-full sm:w-auto min-w-50 items-center justify-center rounded-lg bg-[#004bb4] px-6 py-3.5 text-[14px] font-semibold text-white transition-colors hover:bg-blue-600 shadow-sm"
            >
              {CONTENT.primaryCta.label}
            </Link>
            <Link
              href={CONTENT.secondaryCta.href}
              className="inline-flex w-full sm:w-auto min-w-50 items-center justify-center rounded-lg border border-white/40 bg-transparent px-6 py-3.5 text-[14px] font-semibold text-white transition-colors hover:bg-white/10"
            >
              {CONTENT.secondaryCta.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
