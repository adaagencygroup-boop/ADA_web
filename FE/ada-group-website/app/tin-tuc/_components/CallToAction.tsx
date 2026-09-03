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

      <div className="relative mx-auto flex max-w-360 flex-col items-center px-4 text-center sm:px-6 lg:px-8">
        <h2 className="max-w-3xl text-3xl leading-tight font-semibold tracking-[-0.36px] text-white">
          {CONTENT.title}
        </h2>
        <p className="mt-(--heading-space) max-w-2xl text-base leading-6 text-[#BFDBFE]">
          {CONTENT.description}
        </p>

        <div className="mt-(--inner-space) flex flex-col items-stretch gap-4 sm:flex-row sm:items-start">
          <Link
            href={CONTENT.primaryCta.href}
            className="flex items-center justify-center rounded-md bg-white px-8 py-3 text-base font-semibold text-[#003274] transition-colors hover:bg-slate-100"
          >
            {CONTENT.primaryCta.label}
          </Link>
          <Link
            href={CONTENT.secondaryCta.href}
            className="flex items-center justify-center rounded-md border border-white px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-white/10"
          >
            {CONTENT.secondaryCta.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
