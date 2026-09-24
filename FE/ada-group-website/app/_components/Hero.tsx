import Image from "next/image";
import HologramAware from "@/src/components/common/HologramAware";

const CONTENT = {
  title: "Giải pháp công nghệ,\n đồng hành cùng doanh nghiệp Việt",
  description:
    "ADA Group phát triển sản phẩm và giải pháp công nghệ giúp doanh nghiệp\n số hóa hoạt động, tối ưu quy trình và tạo ra những trải nghiệm tốt hơn cho khách hàng.",
};

export default function Hero() {
  return (
    <section className="section-y flex flex-col md:min-h-screen justify-center lg:min-h-[calc(100vh-80px)]">
      <div className="mx-auto w-full max-w-360 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-x-12 md:grid-cols-2">
          <div>
            <h1 className="text-[28px] leading-[1.2] font-semibold tracking-tight text-black lg:text-[44px] lg:leading-[1.1] whitespace-pre-line">
              {CONTENT.title}
            </h1>

            <p className="mt-5 whitespace-pre-line text-justify text-[14px] lg:text-[16px] leading-relaxed text-zinc-600">
              {CONTENT.description}
            </p>
          </div>

          {/* Right column: visible on desktop only when discrete GPU is not present (fallback) */}
          <HologramAware>
            <div className="hidden md:block overflow-hidden rounded-2xl mt-0">
              <Image
                src="/images/home_images/Hero.webp"
                alt="Đội ngũ ADA Group làm việc cùng nhau"
                width={1372}
                height={737}
                priority
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZTJlOGYwIi8+PC9zdmc+"
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="h-auto w-full transition-transform duration-500 hover:scale-105"
              />
            </div>
          </HologramAware>
        </div>
      </div>
    </section>
  );
}
