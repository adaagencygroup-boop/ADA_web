import Image from "next/image";

export default function WebIntro() {
  return (
    <section className="bg-white section-y">
      <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
        
        {/* Text Content */}
        <div className="mx-auto max-w-full text-left md:text-center mb-(--heading-space) md:mb-(--section-padding)">
          <h2 className="text-left md:text-center text-[28px] lg:text-[44px] font-semibold leading-[1.2] mb-(--inner-space) md:mb-(--inner-space) max-w-full">
            <span className="text-zinc-900 block mb-(--heading-space) md:mb-(--heading-space)">Không chỉ xây dựng website.</span>
            <span className="text-[#1e3a8a] block">Chúng tôi xây dựng nền tảng cho doanh nghiệp phát triển.</span>
          </h2>
          <p className="text-zinc-600 leading-[1.8] text-[14px] lg:text-[16px] max-w-4xl mx-auto text-justify md:text-center [word-break:break-word]">
            ADA Group tiếp cận mỗi dự án web như một sản phẩm hoàn chỉnh — nơi trải nghiệm người dùng, nhu cầu kinh doanh và định hướng phát triển được xem xét trong cùng một tổng thể. Từ những website phục vụ thương hiệu đến các nền tảng trực tuyến phục vụ hoạt động kinh doanh, chúng tôi hướng tới những sản phẩm dễ sử dụng, ổn định, linh hoạt và có giá trị sử dụng lâu dài.
          </p>
        </div>

        {/* Large Image */}
        <div className="hidden md:flex w-full aspect-4/3 md:aspect-video lg:aspect-21/9 bg-slate-100 rounded-3xl lg:rounded-4xl border border-slate-200 items-center justify-center relative overflow-hidden shadow-sm">
          <Image src="/images/dich-vu/web/WebIntro.webp" alt="ADA Group Workspace" fill loading="lazy" placeholder="blur" blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZTJlOGYwIi8+PC9zdmc+" sizes="(max-width: 768px) 100vw, 80vw" className="object-cover transition-transform duration-500 hover:scale-105" />
        </div>

      </div>
    </section>
  );
}
