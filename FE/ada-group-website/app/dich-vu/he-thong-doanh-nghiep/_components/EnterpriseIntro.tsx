import Image from"next/image";

export default function EnterpriseIntro() {
  return (
    <section className="bg-white section-y max-md:py-5! md:pt-(--heading-space)!">
      <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
        
        {/* Text Content */}
        <div className="mx-auto max-w-4xl lg:max-w-5xl text-center mb-(--heading-space) md:mb-(--section-padding)">
          <h2 className="text-[1.75rem] font-semibold leading-[1.3] sm:text-3xl lg:text-[2.5rem] mb-(--inner-space) md:mb-(--inner-space)">
            <span className="text-zinc-900 block mb-(--heading-space) md:mb-(--heading-space)">Kết nối từng hoạt động để tạo nên một hệ thống</span>
            <span className="text-[#1e3a8a] block">doanh nghiệp hoàn chỉnh</span>
          </h2>
          <p className="text-zinc-600 leading-[1.8] text-[15px] lg:text-[17px] max-w-4xl mx-auto px-2 md:px-0 text-justify md:text-center">
            ADA Group xây dựng các giải pháp dựa trên sự kết nối giữa con người, quy trình và dữ liệu, giúp các bộ phận phối hợp hiệu quả, thông tin lưu chuyển xuyên suốt và hạn chế những hệ thống rời rạc. Mỗi giải pháp được phát triển như một phần của hệ thống tổng thể, sẵn sàng kết nối và mở rộng theo nhu cầu doanh nghiệp.
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
