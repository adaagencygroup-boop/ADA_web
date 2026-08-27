import Link from "next/link";
import Image from "next/image";

export default function EnterpriseSolutions() {
  const solutions = [
    {
      id: "01",
      title: "QUẢN LÝ KHÁCH HÀNG",
      subtitle: "Tập trung thông tin, kết nối hoạt động kinh doanh",
      description:
        "ADA Group xây dựng hệ thống giúp doanh nghiệp tập trung thông tin khách hàng và kết nối với hoạt động bán hàng, chăm sóc và quản lý, tạo góc nhìn rõ ràng về khách hàng và nâng cao hiệu quả phối hợp giữa các bộ phận.",
      imagePlaceholder: "https://cdn2.fptshop.com.vn/unsafe/Uploads/images/tin-tuc/173610/Originals/cong-nghe-so-la-gi-1.jpg",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
          <rect width="20" height="14" x="2" y="3" rx="2" />
          <line x1="8" x2="16" y1="21" y2="21" />
          <line x1="12" x2="12" y1="17" y2="21" />
        </svg>
      ),
      layout: "half",
    },
    {
      id: "02",
      title: "QUẢN LÝ NHÂN SỰ",
      subtitle: "Kết nối con người với hoạt động nội bộ",
      description:
        "ADA Group phát triển hệ thống giúp doanh nghiệp tổ chức thông tin nhân sự và các hoạt động nội bộ trên một môi trường thống nhất, giúp nhân viên, quản lý và các bộ phận phối hợp thuận tiện hơn, đồng thời tạo nền tảng hỗ trợ doanh nghiệp quản lý và phát triển đội ngũ một cách lâu dài.",
      imagePlaceholder: "https://cdn2.fptshop.com.vn/unsafe/Uploads/images/tin-tuc/173610/Originals/cong-nghe-so-la-gi-1.jpg",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
          <rect width="7" height="7" x="3" y="3" rx="1" />
          <rect width="7" height="7" x="14" y="3" rx="1" />
          <rect width="7" height="7" x="14" y="14" rx="1" />
          <rect width="7" height="7" x="3" y="14" rx="1" />
        </svg>
      ),
      layout: "half",
    },
    {
      id: "03",
      title: "QUẢN LÝ QUY TRÌNH",
      subtitle: "Tập trung hoạt động trên một nền tảng thống nhất",
      description:
        "ADA Group xây dựng các hệ thống giúp doanh nghiệp tập trung hoạt động, dữ liệu và thông tin vận hành trên một môi trường thống nhất, giúp các bộ phận dễ dàng theo dõi, phối hợp và quản lý công việc hiệu quả hơn. Giải pháp được thiết kế linh hoạt theo đặc thù từng doanh nghiệp và có khả năng mở rộng khi quy mô, nhu cầu vận hành thay đổi.",
      imagePlaceholder: "https://cdn2.fptshop.com.vn/unsafe/Uploads/images/tin-tuc/173610/Originals/cong-nghe-so-la-gi-1.jpg",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <path d="M9 15l2 2 4-4" />
        </svg>
      ),
      layout: "full",
    },
    {
      id: "04",
      title: "QUẢN LÝ VẬN HÀNH",
      subtitle: "Tập trung hoạt động trên một nền tảng thống nhất",
      description:
        "ADA Group xây dựng các hệ thống giúp doanh nghiệp tập trung hoạt động, dữ liệu và thông tin vận hành, giúp các bộ phận dễ dàng theo dõi, phối hợp và quản lý công việc. Giải pháp được thiết kế linh hoạt và có thể mở rộng theo nhu cầu phát triển của doanh nghiệp.",
      imagePlaceholder: "https://cdn2.fptshop.com.vn/unsafe/Uploads/images/tin-tuc/173610/Originals/cong-nghe-so-la-gi-1.jpg",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      ),
      layout: "half",
    },
    {
      id: "05",
      title: "BÁO CÁO & TRỰC QUAN DỮ LIỆU",
      subtitle: "Biến dữ liệu thành góc nhìn hỗ trợ quản lý",
      description:
        "ADA Group xây dựng các nền tảng giúp doanh nghiệp tổng hợp, quan sát và khai thác dữ liệu một cách trực quan, giúp thông tin được trình bày rõ ràng theo từng nhu cầu, từ theo dõi hoạt động hằng ngày đến hỗ trợ quản lý có góc nhìn tổng quan.",
      imagePlaceholder: "https://cdn2.fptshop.com.vn/unsafe/Uploads/images/tin-tuc/173610/Originals/cong-nghe-so-la-gi-1.jpg",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
          <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
          <path d="M22 12A10 10 0 0 0 12 2v10z" />
        </svg>
      ),
      layout: "half",
    },
    {
      id: "06",
      title: "TÍCH HỢP HỆ THỐNG",
      subtitle: "Kết nối thay vì tạo thêm những nền tảng tách biệt",
      description:
        "ADA Group phát triển giải pháp có khả năng kết nối với website, ứng dụng, phần mềm và các nguồn dữ liệu hiện có, giúp thông tin được trao đổi xuyên suốt và hạn chế dữ liệu phân tán. Qua đó, doanh nghiệp có thể tận dụng hạ tầng công nghệ hiện tại và từng bước xây dựng môi trường vận hành thống nhất hơn.",
      imagePlaceholder: "https://cdn2.fptshop.com.vn/unsafe/Uploads/images/tin-tuc/173610/Originals/cong-nghe-so-la-gi-1.jpg",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
      ),
      layout: "full",
    },
  ];

  return (
    <section className="bg-white section-y max-md:py-5!">
      <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mx-auto max-w-4xl text-center mb-16">
          <div className="flex items-center justify-center gap-1.5 mb-4 text-blue-600">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2" /><path d="M12 20v2" />
              <path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" />
              <path d="M2 12h2" /><path d="M20 12h2" />
              <path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" />
            </svg>
            <span className="text-[11px] font-semibold uppercase tracking-widest">GIẢI PHÁP WEB HOÀN CHỈNH</span>
          </div>
          <h2 className="text-3xl font-semibold text-zinc-900 sm:text-4xl lg:text-[2.6rem] leading-tight mb-6">
            Giải pháp web cho từng <br className="hidden md:block" />
            giai đoạn <span className="text-blue-600 relative inline-block">phát triển doanh nghiệp<span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-blue-600 rounded-full"></span></span>
          </h2>
          <p className="text-zinc-500 leading-relaxed max-w-2xl mx-auto mt-6 text-[15px] lg:text-base">
            Từ website giới thiệu thương hiệu đến các nền tảng phức tạp, chúng tôi cung cấp giải pháp web toàn diện, linh hoạt và sẵn sàng đồng hành cùng doanh nghiệp.
          </p>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
          {solutions.map((item) => {
            if (item.layout === "full_dark") {
              return (
                <div key={item.id} className="lg:col-span-2 bg-[#0b1120] rounded-3xl lg:rounded-4xl flex flex-col lg:flex-row overflow-hidden text-white shadow-xl">
                  <div className="p-8 lg:p-12 xl:p-16 flex-1 flex flex-col justify-center lg:max-w-[50%]">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-3xl lg:text-4xl font-semibold text-blue-400">{item.id}</span>
                      <div className="bg-white/10 text-blue-400 p-2.5 rounded-xl">
                        {item.icon}
                      </div>
                    </div>
                    <h3 className="text-2xl font-semibold uppercase mb-3 text-white">{item.title}</h3>
                    <p className="text-[15px] font-semibold text-blue-400 mb-6 text-justify">{item.subtitle}</p>
                    <div className="text-[14px] text-slate-300 mb-10 leading-relaxed whitespace-pre-line text-justify">
                      {item.description}
                    </div>
                    <Link href="/lien-he" className="text-[14px] text-blue-400 font-medium hover:text-blue-300 inline-flex items-center gap-1.5 w-fit transition-colors">
                      Trao đổi chi tiết &rarr;
                    </Link>
                  </div>
                  <div className="w-full lg:flex-1 bg-[#111827] min-h-75 relative flex items-center justify-center p-8">
                    <Image src={item.imagePlaceholder} alt={item.title} fill className="object-cover rounded-xl opacity-80" unoptimized />
                  </div>
                </div>
              );
            }

            if (item.layout === "full") {
              return (
                <div key={item.id} className="lg:col-span-2 bg-[#f4f6f9] rounded-3xl lg:rounded-4xl flex flex-col lg:flex-row overflow-hidden shadow-sm border border-slate-100">
                  <div className="p-6 lg:p-8 flex-1 flex flex-col justify-center lg:max-w-[50%] order-2 lg:order-1">
                    <div className="hidden md:flex items-center gap-3 mb-6">
                      <span className="text-3xl lg:text-4xl font-semibold text-blue-600">{item.id}</span>
                      <div className="bg-white text-blue-600 p-2.5 rounded-xl shadow-sm">
                        {item.icon}
                      </div>
                    </div>
                    
                    {/* Mobile Title with ID */}
                    <h3 className="md:hidden text-[19px] font-semibold uppercase mb-3 text-zinc-900 flex items-baseline gap-2 leading-snug">
                      <span className="text-blue-600 text-[1.4rem]">{item.id}</span>
                      {item.title}
                    </h3>
                    
                    {/* Desktop Title */}
                    <h3 className="hidden md:block text-2xl font-semibold uppercase mb-3 text-zinc-900">{item.title}</h3>
                    <p className="text-[15px] font-semibold text-blue-600 mb-6 text-justify">{item.subtitle}</p>
                    <div className="text-[14px] text-zinc-600 mb-10 leading-relaxed whitespace-pre-line text-justify">
                      {item.description}
                    </div>
                    <Link href="/lien-he" className="text-[14px] text-blue-600 font-medium hover:underline inline-flex items-center gap-1.5 w-fit">
                      Trao đổi chi tiết &rarr;
                    </Link>
                  </div>
                  <div className="w-full lg:flex-1 bg-slate-200 min-h-60 md:min-h-75 relative flex items-center justify-center order-1 lg:order-2">
                    <Image src={item.imagePlaceholder} alt={item.title} fill className="object-cover" unoptimized />
                  </div>
                </div>
              );
            }

            return (
              <div key={item.id} className="bg-white rounded-3xl lg:rounded-4xl border border-slate-100 shadow-[0_2px_20px_rgb(0,0,0,0.04)] overflow-hidden flex flex-col xl:flex-row h-full">
                <div className="p-6 lg:p-8 flex-1 flex flex-col order-2 xl:order-1">
                  <div className="hidden md:flex items-center gap-3 mb-6">
                    <span className="text-3xl font-semibold text-blue-600">{item.id}</span>
                    <div className="bg-blue-50 text-blue-600 p-2.5 rounded-xl">
                      {item.icon}
                    </div>
                  </div>
                  
                  {/* Mobile Title with ID */}
                  <h3 className="md:hidden text-[19px] font-semibold uppercase mb-3 text-zinc-900 flex items-baseline gap-2 leading-snug">
                    <span className="text-blue-600 text-[1.4rem]">{item.id}</span>
                    {item.title}
                  </h3>
                  
                  {/* Desktop Title */}
                  <h3 className="hidden md:block text-lg lg:text-xl font-semibold uppercase mb-3 text-zinc-900 leading-snug">{item.title}</h3>
                  <p className="text-[14px] font-semibold text-blue-600 mb-4 text-justify">{item.subtitle}</p>
                  <div className="text-[14px] text-zinc-500 mb-8 leading-[1.6] whitespace-pre-line flex-1 text-justify">
                    {item.description}
                  </div>
                  <Link href="/lien-he" className="text-[14px] text-blue-600 font-medium hover:underline inline-flex items-center gap-1.5 mt-auto w-fit">
                    Trao đổi chi tiết &rarr;
                  </Link>
                </div>
                <div className="w-full xl:w-[45%] bg-slate-100 min-h-64 xl:min-h-full relative flex items-center justify-center order-1 xl:order-2 border-b xl:border-b-0 xl:border-l border-slate-100">
                  <Image src={item.imagePlaceholder} alt={item.title} fill className="object-cover" unoptimized />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
