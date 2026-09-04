const CONTENT = {
  title: "Giải pháp công nghệ,\n đồng hành cùng doanh nghiệp Việt",
  description:
    "ADA Group phát triển sản phẩm và giải pháp công nghệ giúp doanh nghiệp\n số hóa hoạt động, tối ưu quy trình và tạo ra những trải nghiệm tốt hơn cho khách hàng.",
  mediaPlaceholder: "Animation về trí tuệ nhân tạo",
};

export default function Hero() {
  return (
    <section className="section-y flex flex-col">
      <div className="mx-auto w-full max-w-360 px-4 sm:px-6 lg:px-8">
        <div className="md:text-center">
          <h1 className="text-2xl font-semibold whitespace-pre-line min-[1322px]:whitespace-normal tracking-tight sm:text-4xl lg:text-5xl">
            {CONTENT.title}
          </h1>

          <p className="mt-5 md:mx-auto md:whitespace-pre-line text-justify md:text-center text-base leading-relaxed text-zinc-600 lg:text-lg">
            {CONTENT.description}
          </p>
        </div>

        <div className="mt-(--inner-space) flex aspect-video w-full items-center justify-center rounded-2xl bg-zinc-100">
          <span className="text-sm text-zinc-400">
            {CONTENT.mediaPlaceholder}
          </span>
        </div>
      </div>
    </section>
  );
}