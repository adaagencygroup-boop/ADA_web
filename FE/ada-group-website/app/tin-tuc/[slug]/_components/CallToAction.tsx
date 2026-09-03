import Link from "next/link";

const CONTENT = {
  title: "Bạn quan tâm đến cơ hội hợp tác cùng ADA Group?",
  description:
    "Hãy để lại thông tin hoặc liên hệ trực tiếp với chúng tôi để nhận được tư vấn về cơ hội hợp tác và phát triển.",
  primaryCta: { label: "Liên hệ ngay", href: "/lien-he" },
  secondaryCta: { label: "Tìm hiểu về chúng tôi", href: "/gioi-thieu" },
};

export default function CallToAction() {
  return (
    <section className="section-y relative overflow-hidden bg-[#002A64]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70.71%_70.71%_at_50%_50%,#FFFFFF_0%,rgba(255,255,255,0)_50%,rgba(255,255,255,0)_100%)] opacity-10"
      />

      <div className="relative mx-auto flex max-w-360 flex-col items-center px-4 text-center sm:px-6 lg:px-8">
        <h2 className="max-w-3xl text-3xl leading-tight font-semibold tracking-[-0.36px] text-white">
          {CONTENT.title}
        </h2>
        <p className="mt-(--heading-space) max-w-2xl text-lg leading-7.25 text-[#D8E2FF]">
          {CONTENT.description}
        </p>

        <div className="mt-(--inner-space) flex flex-col items-stretch gap-4 sm:flex-row sm:items-start">
          <Link
            href={CONTENT.primaryCta.href}
            className="flex items-center justify-center rounded-lg bg-white px-8 py-3.5 text-base font-semibold text-[#003274] transition-colors hover:bg-slate-100"
          >
            {CONTENT.primaryCta.label}
          </Link>
          <Link
            href={CONTENT.secondaryCta.href}
            className="flex items-center justify-center rounded-lg border border-[#C4C6D2]/50 px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-white/10"
          >
            {CONTENT.secondaryCta.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
