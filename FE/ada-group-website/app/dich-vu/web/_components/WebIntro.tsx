import Image from "next/image";

export default function WebIntro() {
  return (
    <section className="bg-white section-y max-md:py-5!">
      <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
        
        {/* Text Content */}
        <div className="mx-auto max-w-4xl lg:max-w-5xl text-center mb-0 md:mb-14">
          <h2 className="text-[1.75rem] font-semibold leading-[1.3] sm:text-3xl lg:text-[2.5rem] mb-4 md:mb-8">
            <span className="text-zinc-900 block mb-1 md:mb-2">Không chỉ xây dựng website.</span>
            <span className="text-[#1e3a8a] block">Chúng tôi xây dựng nền tảng cho doanh nghiệp phát triển.</span>
          </h2>
          <p className="text-zinc-600 leading-[1.8] text-[15px] lg:text-[17px] max-w-4xl mx-auto px-2 md:px-0 text-justify md:text-center">
            ADA Group tiếp cận mỗi dự án web như một sản phẩm hoàn chỉnh — nơi trải nghiệm người dùng, nhu cầu kinh doanh và định hướng phát triển được xem xét trong cùng một tổng thể. Từ những website phục vụ thương hiệu đến các nền tảng trực tuyến phục vụ hoạt động kinh doanh, chúng tôi hướng tới những sản phẩm dễ sử dụng, ổn định, linh hoạt và có giá trị sử dụng lâu dài.
          </p>
        </div>

        {/* Large Image */}
        <div className="hidden md:flex w-full aspect-4/3 md:aspect-video lg:aspect-21/9 bg-slate-100 rounded-3xl lg:rounded-4xl border border-slate-200 items-center justify-center relative overflow-hidden shadow-sm">
          <Image src="https://cdn2.fptshop.com.vn/unsafe/Uploads/images/tin-tuc/173610/Originals/cong-nghe-so-la-gi-1.jpg" alt="ADA Group Workspace" fill className="object-cover" unoptimized />
        </div>

      </div>
    </section>
  );
}
