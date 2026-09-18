import Image from "next/image";

export default function EnterpriseIntro() {
  return (
    <section className="bg-white section-y">
      <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
        
        {/* Text Content */}
        <div className="mx-auto max-w-full text-left md:text-center mb-(--heading-space) md:mb-(--section-padding)">
          <h2 className="text-left md:text-center text-[28px] lg:text-[44px] font-semibold leading-[1.2] mb-(--inner-space) md:mb-(--inner-space) max-w-full">
            <span className="text-zinc-900 block mb-(--heading-space) md:mb-(--heading-space)">Kết nối từng hoạt động để tạo nên một hệ thống</span>
            <span className="text-[#1e3a8a] block">doanh nghiệp hoàn chỉnh</span>
          </h2>
          <p className="text-zinc-600 leading-[1.8] text-[14px] lg:text-[16px] max-w-4xl mx-auto text-justify md:text-center [word-break:break-word]">
            ADA Group xây dựng các giải pháp dựa trên sự kết nối giữa con người, quy trình và dữ liệu, giúp các bộ phận phối hợp hiệu quả, thông tin lưu chuyển xuyên suốt và hạn chế những hệ thống rời rạc. Mỗi giải pháp được phát triển như một phần của hệ thống tổng thể, sẵn sàng kết nối và mở rộng theo nhu cầu doanh nghiệp.
          </p>
        </div>

        {/* Large Image */}
        <div className="hidden md:flex w-full aspect-4/3 md:aspect-video lg:aspect-21/9 bg-slate-100 rounded-3xl lg:rounded-4xl border border-slate-200 items-center justify-center relative overflow-hidden shadow-sm">
          <Image src="/images/dich-vu/he-thong/EnterpriseIntro.webp" alt="ADA Group Workspace" fill loading="lazy" placeholder="blur" blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZTJlOGYwIi8+PC9zdmc+" sizes="(max-width: 768px) 100vw, 80vw" className="object-cover transition-transform duration-500 hover:scale-105" />
        </div>

      </div>
    </section>
  );
}
