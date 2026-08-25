import Link from "next/link";
import Image from "next/image";

export default function MobileCustomerApps() {
  const headerContent = [
    {
      tag: "CUSTOMER APPS",
      title: "Ứng dụng dành cho khách hàng",
      subtitle: "Tạo một kênh kết nối trực tiếp giữa doanh nghiệp và người dùng",
      description: "ADA Group phát triển ứng dụng di động giúp doanh nghiệp đưa sản phẩm, dịch vụ và thương hiệu đến gần khách hàng hơn, tạo kênh kết nối trực tiếp để người dùng thuận tiện tìm hiểu, sử dụng dịch vụ và duy trì tương tác lâu dài."
    }
  ];

  const features = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-blue-600">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
      title: "Trải nghiệm khách hàng",
      desc: "Xây dựng hành trình sử dụng thuận tiện và nhất quán.",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-blue-600">
          <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
          <path d="M12 18h.01" />
        </svg>
      ),
      title: "Dịch vụ trực tuyến",
      desc: "Đưa sản phẩm và dịch vụ của doanh nghiệp lên thiết bị di động.",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-blue-600">
          <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" />
        </svg>
      ),
      title: "Tương tác & kết nối",
      desc: "Tạo kênh kết nối trực tiếp giữa doanh nghiệp và người dùng.",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-blue-600">
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
      title: "Cá nhân hóa trải nghiệm",
      desc: "Điều chỉnh nội dung và trải nghiệm phù hợp với từng nhóm.",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-blue-600">
          <path d="m8 6 4-4 4 4" />
          <path d="M12 2v10.3a4 4 0 0 1-1.172 2.872L4 22" />
          <path d="m20 22-5-5" />
        </svg>
      ),
      title: "Tích hợp hệ thống",
      desc: "Kết nối ứng dụng với dữ liệu và nền tảng hiện có.",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-blue-600">
          <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
          <polyline points="16 7 22 7 22 13" />
        </svg>
      ),
      title: "Phát triển & mở rộng",
      desc: "Sẵn sàng bổ sung và phát triển theo nhu cầu kinh doanh.",
    },
  ];

  return (
    <section className="bg-white section-y max-md:py-5! md:pt-0!">
      <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col xl:grid xl:grid-cols-2 gap-0 xl:gap-16 items-center bg-white rounded-4xl xl:rounded-none border border-slate-100 xl:border-none shadow-sm xl:shadow-none overflow-hidden xl:overflow-visible">
          
          {/* Right Column (Image - Top on Mobile) */}
          <div className="relative w-full aspect-4/3 sm:aspect-video xl:aspect-4/5 bg-slate-100 xl:rounded-4xl overflow-hidden xl:shadow-sm border-b border-slate-100 xl:border-slate-100 order-1 xl:order-2">
            <Image src="https://cdn2.fptshop.com.vn/unsafe/Uploads/images/tin-tuc/173610/Originals/cong-nghe-so-la-gi-1.jpg" alt="Ứng dụng khách hàng" fill className="object-cover" unoptimized />
          </div>

          {/* Left Column (Text - Bottom on Mobile) */}
          <div className="flex flex-col p-6 sm:p-8 xl:p-0 order-2 xl:order-1">
            {headerContent.map((item, index) => (
              <div key={index}>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 xl:text-blue-800 mb-2 xl:mb-3 block">
                  {item.tag}
                </span>
                <h2 className="text-[1.35rem] font-bold xl:font-semibold leading-snug xl:leading-tight tracking-tight text-zinc-900 xl:text-[#0a1a2f] sm:text-4xl xl:text-[2.5rem] mb-3">
                  {item.title}
                </h2>
                <p className="text-[15px] xl:text-[17px] font-medium text-blue-600 mb-4">
                  {item.subtitle}
                </p>
                <p className="text-[14px] xl:text-[15px] leading-relaxed text-zinc-500 xl:text-zinc-600 mb-6 xl:mb-8 max-w-xl">
                  {item.description}
                </p>
              </div>
            ))}
            
            {/* Features Grid (Hidden on Mobile) */}
            <div className="hidden xl:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {features.map((item, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-[0_2px_15px_rgb(0,0,0,0.03)] flex flex-col items-center text-center">
                  <div className="bg-blue-50 p-2.5 rounded-full mb-3 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <h4 className="font-semibold text-[13px] text-zinc-900 mb-2 leading-snug">{item.title}</h4>
                  <p className="text-[12px] text-zinc-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
            
            <Link href="/lien-he" className="inline-flex items-center gap-2 text-blue-600 font-semibold text-[14px] xl:text-[14.5px] hover:text-blue-800 transition-colors w-fit">
              <span className="xl:hidden">Xem chi tiết &rarr;</span>
              <span className="hidden xl:inline">Nhận tư vấn ngay &rarr;</span>
            </Link>
          </div>
          
        </div>
      </div>
    </section>
  );
}
