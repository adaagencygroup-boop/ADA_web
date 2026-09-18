const CONTENT = {
  title: "Giải pháp công nghệ,\n đồng hành cùng doanh nghiệp Việt",
  description:
    "ADA Group phát triển sản phẩm và giải pháp công nghệ giúp doanh nghiệp\n số hóa hoạt động, tối ưu quy trình và tạo ra những trải nghiệm tốt hơn cho khách hàng.",
};

export default function Hero() {
  return (
    <section className="section-y flex flex-col md:min-h-screen justify-center lg:min-h-[calc(100vh-80px)]">
      <div className="mx-auto w-full max-w-360 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-x-12 md:grid-cols-2">
          <div>
            <h1 className="text-[28px] leading-[1.2] font-semibold tracking-tight text-black lg:text-[44px] lg:leading-[1.1] whitespace-pre-line">
              {CONTENT.title}
            </h1>

            <p className="mt-5 whitespace-pre-line text-justify text-[14px] lg:text-[16px] leading-relaxed text-zinc-600">
              {CONTENT.description}
            </p>
          </div>

          {/* The hologram particle background (mounted in app/page.tsx) fills
              this space on devices that render it — the model for the "hero"
              section shows through here (see modelX in sectionConfig, tuned
              to sit in this right-hand column). No 3D on mobile/unsupported
              browsers, so no space is reserved there either. */}
          {/* <div className="mt-(--inner-space) hidden aspect-square w-full md:mt-0 md:block" /> */}
        </div>
      </div>
    </section>
  );
}
