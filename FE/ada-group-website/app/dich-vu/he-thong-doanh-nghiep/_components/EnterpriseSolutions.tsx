import Link from"next/link";
import Image from"next/image";

export default function EnterpriseSolutions() {
  const solutions = [
    {
      id:"01",
      title:"QUẢN LÝ KHÁCH HÀNG",
      subtitle:"Tập trung thông tin, kết nối hoạt động kinh doanh",
      description:
"ADA Group xây dựng hệ thống giúp doanh nghiệp tập trung thông tin khách hàng và kết nối với hoạt động bán hàng, chăm sóc và quản lý, tạo góc nhìn rõ ràng về khách hàng và nâng cao hiệu quả phối hợp giữa các bộ phận.",
      imagePlaceholder:"https://wtxsbaavzdvpzogiwoei.supabase.co/storage/v1/object/public/ADA%20Group%20website/dong-hanh-cung-doanh-nghiep-tren-hanh-trinh-chuyen-doi-so-02.jpg",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
          <rect width="20" height="14" x="2" y="3" rx="2" />
          <line x1="8" x2="16" y1="21" y2="21" />
          <line x1="12" x2="12" y1="17" y2="21" />
        </svg>
      ),
      layout:"half",
    },
    {
      id:"02",
      title:"QUẢN LÝ NHÂN SỰ",
      subtitle:"Kết nối con người với hoạt động nội bộ",
      description:
"ADA Group phát triển hệ thống giúp doanh nghiệp tổ chức thông tin nhân sự và các hoạt động nội bộ trên một môi trường thống nhất, giúp nhân viên, quản lý và các bộ phận phối hợp thuận tiện hơn, đồng thời tạo nền tảng hỗ trợ doanh nghiệp quản lý và phát triển đội ngũ một cách lâu dài.",
      imagePlaceholder:"https://wtxsbaavzdvpzogiwoei.supabase.co/storage/v1/object/public/ADA%20Group%20website/dong-hanh-cung-doanh-nghiep-tren-hanh-trinh-chuyen-doi-so-02.jpg",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
          <rect width="7" height="7" x="3" y="3" rx="1" />
          <rect width="7" height="7" x="14" y="3" rx="1" />
          <rect width="7" height="7" x="14" y="14" rx="1" />
          <rect width="7" height="7" x="3" y="14" rx="1" />
        </svg>
      ),
      layout:"half",
    },
    {
      id:"03",
      title:"QUẢN LÝ QUY TRÌNH",
      subtitle:"Tập trung hoạt động trên một nền tảng thống nhất",
      description:
"ADA Group xây dựng các hệ thống giúp doanh nghiệp tập trung hoạt động, dữ liệu và thông tin vận hành trên một môi trường thống nhất, giúp các bộ phận dễ dàng theo dõi, phối hợp và quản lý công việc hiệu quả hơn. Giải pháp được thiết kế linh hoạt theo đặc thù từng doanh nghiệp và có khả năng mở rộng khi quy mô, nhu cầu vận hành thay đổi.",
      imagePlaceholder:"https://wtxsbaavzdvpzogiwoei.supabase.co/storage/v1/object/public/ADA%20Group%20website/dong-hanh-cung-doanh-nghiep-tren-hanh-trinh-chuyen-doi-so-02.jpg",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <path d="M9 15l2 2 4-4" />
        </svg>
      ),
      layout:"full",
    },
    {
      id:"04",
      title:"QUẢN LÝ VẬN HÀNH",
      subtitle:"Tập trung hoạt động trên một nền tảng thống nhất",
      description:
"ADA Group xây dựng các hệ thống giúp doanh nghiệp tập trung hoạt động, dữ liệu và thông tin vận hành, giúp các bộ phận dễ dàng theo dõi, phối hợp và quản lý công việc. Giải pháp được thiết kế linh hoạt và có thể mở rộng theo nhu cầu phát triển của doanh nghiệp.",
      imagePlaceholder:"https://wtxsbaavzdvpzogiwoei.supabase.co/storage/v1/object/public/ADA%20Group%20website/dong-hanh-cung-doanh-nghiep-tren-hanh-trinh-chuyen-doi-so-02.jpg",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
          <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      ),
      layout:"half",
    },
    {
      id:"05",
      title:"BÁO CÁO & TRỰC QUAN DỮ LIỆU",
      subtitle:"Biến dữ liệu thành góc nhìn hỗ trợ quản lý",
      description:
"ADA Group xây dựng các nền tảng giúp doanh nghiệp tổng hợp, quan sát và khai thác dữ liệu một cách trực quan, giúp thông tin được trình bày rõ ràng theo từng nhu cầu, từ theo dõi hoạt động hằng ngày đến hỗ trợ quản lý có góc nhìn tổng quan.",
      imagePlaceholder:"https://wtxsbaavzdvpzogiwoei.supabase.co/storage/v1/object/public/ADA%20Group%20website/dong-hanh-cung-doanh-nghiep-tren-hanh-trinh-chuyen-doi-so-02.jpg",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
          <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
          <path d="M22 12A10 10 0 0 0 12 2v10z" />
        </svg>
      ),
      layout:"half",
    },
    {
      id:"06",
      title:"TÍCH HỢP HỆ THỐNG",
      subtitle:"Kết nối thay vì tạo thêm những nền tảng tách biệt",
      description:
"ADA Group phát triển giải pháp có khả năng kết nối với website, ứng dụng, phần mềm và các nguồn dữ liệu hiện có, giúp thông tin được trao đổi xuyên suốt và hạn chế dữ liệu phân tán. Qua đó, doanh nghiệp có thể tận dụng hạ tầng công nghệ hiện tại và từng bước xây dựng môi trường vận hành thống nhất hơn.",
      imagePlaceholder:"https://wtxsbaavzdvpzogiwoei.supabase.co/storage/v1/object/public/ADA%20Group%20website/dong-hanh-cung-doanh-nghiep-tren-hanh-trinh-chuyen-doi-so-02.jpg",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
      ),
      layout:"full",
    },
  ];

  return (
    <section className="section-y">
      <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mx-auto max-w-4xl text-center mb-(--section-padding)">
          <div className="inline-flex items-center gap-(--inner-space) rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600 mb-(--inner-space)">
            <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 0.8C8 0.358468 7.64153 0 7.2 0C6.75847 0 6.4 0.358468 6.4 0.8V1.6C6.4 2.04153 6.75847 2.4 7.2 2.4C7.64153 2.4 8 2.04153 8 1.6V0.8ZM11.7256 3.0056C12.0288 2.6917 12.0244 2.19273 11.7159 1.88415C11.4073 1.57556 10.9083 1.57122 10.5944 1.8744L10.0288 2.44C9.72562 2.7539 9.72996 3.25287 10.0385 3.56146C10.3471 3.87004 10.8461 3.87438 11.16 3.5712L11.7256 3.0056ZM13.6 6.4C13.6 6.84153 13.2415 7.2 12.8 7.2H12C11.5585 7.2 11.2 6.84153 11.2 6.4C11.2 5.95847 11.5585 5.6 12 5.6H12.8C13.2415 5.6 13.6 5.95847 13.6 6.4ZM11.7256 9.7944C12.0379 10.1068 12.0379 10.6132 11.7256 10.9256L11.16 11.4912C10.9591 11.6992 10.6617 11.7826 10.382 11.7094C10.1023 11.6361 9.88385 11.4177 9.81064 11.138C9.73743 10.8583 9.82084 10.5609 10.0288 10.36L10.5944 9.7944C10.9068 9.48209 11.4132 9.48209 11.7256 9.7944ZM7.2 12.8C6.75847 12.8 6.4 12.4415 6.4 12V11.2C6.4 10.7585 6.75847 10.4 7.2 10.4C7.64153 10.4 8 10.7585 8 11.2V12C8 12.4415 7.64153 12.8 7.2 12.8ZM3.8056 10.9256C3.4932 11.2379 2.9868 11.2379 2.6744 10.9256L2.1088 10.36C1.90083 10.1591 1.81743 9.8617 1.89064 9.58199C1.96385 9.30229 2.18229 9.08385 2.46199 9.01064C2.7417 8.93743 3.03914 9.02083 3.24 9.2288L3.8056 9.7944C4.11791 10.1068 4.11791 10.6132 3.8056 10.9256ZM2.4 6.4C2.4 6.84153 2.04153 7.2 1.6 7.2H0.8C0.358468 7.2 0 6.84153 0 6.4C0 5.95847 0.358468 5.6 0.8 5.6H1.6C2.04153 5.6 2.4 5.95847 2.4 6.4ZM4.3712 3.0056C4.67438 2.6917 4.67004 2.19273 4.36145 1.88415C4.05287 1.57556 3.5539 1.57122 3.24 1.8744L2.6744 2.44C2.46643 2.64086 2.38303 2.9383 2.45624 3.21801C2.52945 3.49771 2.74789 3.71615 3.02759 3.78936C3.3073 3.86257 3.60474 3.77917 3.8056 3.5712L4.3712 3.0056Z" fill="#2563EB"/>
            </svg>
            <span className="text-[11px] font-semibold uppercase tracking-widest">GIẢI PHÁP WEB HOÀN CHỈNH</span>
          </div>
          <h2 className="text-3xl font-semibold text-zinc-900 sm:text-4xl lg:text-[2.6rem] leading-tight mb-(--inner-space)">
            Giải pháp web cho từng <br className="hidden md:block" />
            giai đoạn <span className="text-blue-600 relative inline-block">phát triển doanh nghiệp<span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-blue-600 rounded-full"></span></span>
          </h2>
          <p className="text-zinc-500 leading-relaxed max-w-2xl mx-auto mt-(--inner-space) text-[15px] lg:text-base">
            Từ website giới thiệu thương hiệu đến các nền tảng phức tạp, chúng tôi cung cấp giải pháp web toàn diện, linh hoạt và sẵn sàng đồng hành cùng doanh nghiệp.
          </p>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-(--section-padding)">
          {solutions.map((item) => {
            if (item.layout ==="full_dark") {
              return (
                <div key={item.id} className="lg:col-span-2 bg-[#0b1120] rounded-3xl lg:rounded-4xl flex flex-col lg:flex-row overflow-hidden text-white shadow-xl">
                  <div className="p-8 lg:p-12 xl:p-16 flex-1 flex flex-col justify-center lg:max-w-[50%]">
                    <div className="flex items-center gap-(--inner-space) mb-(--inner-space)">
                      <span className="text-3xl lg:text-4xl font-semibold text-blue-400">{item.id}</span>
                      <div className="bg-white/10 text-blue-400 p-2.5 rounded-xl">
                        {item.icon}
                      </div>
                    </div>
                    <h3 className="text-2xl font-semibold uppercase mb-(--heading-space) text-white">{item.title}</h3>
                    <p className="text-[15px] font-semibold text-blue-400 mb-(--inner-space) text-justify">{item.subtitle}</p>
                    <div className="text-[14px] text-slate-300 mb-(--section-padding) leading-relaxed whitespace-pre-line text-justify">
                      {item.description}
                    </div>
                    <Link href="/lien-he" className="text-[14px] text-blue-400 font-medium hover:text-blue-300 inline-flex items-center gap-(--inner-space).5 w-fit transition-colors">
                      Trao đổi chi tiết &rarr;
                    </Link>
                  </div>
                  <div className="w-full lg:flex-1 bg-[#111827] min-h-75 relative flex items-center justify-center p-8">
                    <Image src={item.imagePlaceholder} alt={item.title} fill className="object-cover rounded-xl opacity-80" />
                  </div>
                </div>
              );
            }

            if (item.layout ==="full") {
              return (
                <div key={item.id} className="lg:col-span-2 bg-[#f4f6f9] rounded-3xl lg:rounded-4xl flex flex-col lg:flex-row overflow-hidden shadow-sm border border-slate-100">
                  <div className="p-6 lg:p-8 flex-1 flex flex-col justify-center lg:max-w-[50%] order-2 lg:order-1">
                    <div className="hidden md:flex items-center gap-(--inner-space) mb-(--inner-space)">
                      <span className="text-3xl lg:text-4xl font-semibold text-blue-600">{item.id}</span>
                      <div className="bg-white text-blue-600 p-2.5 rounded-xl shadow-sm">
                        {item.icon}
                      </div>
                    </div>
                    
                    {/* Mobile Title with ID */}
                    <h3 className="md:hidden text-[19px] font-semibold uppercase mb-(--heading-space) text-zinc-900 flex items-baseline gap-(--inner-space) leading-snug">
                      <span className="text-blue-600 text-[1.4rem]">{item.id}</span>
                      {item.title}
                    </h3>
                    
                    {/* Desktop Title */}
                    <h3 className="hidden md:block text-2xl font-semibold uppercase mb-(--heading-space) text-zinc-900">{item.title}</h3>
                    <p className="text-[15px] font-semibold text-blue-600 mb-(--inner-space) text-justify">{item.subtitle}</p>
                    <div className="text-[14px] text-zinc-600 mb-(--section-padding) leading-relaxed whitespace-pre-line text-justify">
                      {item.description}
                    </div>
                    <Link href="/lien-he" className="text-[14px] text-blue-600 font-medium hover:underline inline-flex items-center gap-(--inner-space).5 w-fit">
                      Trao đổi chi tiết &rarr;
                    </Link>
                  </div>
                  <div className="w-full lg:flex-1 bg-slate-200 min-h-60 md:min-h-75 relative flex items-center justify-center order-1 lg:order-2">
                    <Image src={item.imagePlaceholder} alt={item.title} fill className="object-cover" />
                  </div>
                </div>
              );
            }

            return (
              <div key={item.id} className="bg-white rounded-3xl lg:rounded-4xl border border-slate-100 shadow-[0_2px_20px_rgb(0,0,0,0.04)] overflow-hidden flex flex-col xl:flex-row h-full">
                <div className="p-6 lg:p-8 flex-1 flex flex-col order-2 xl:order-1">
                  <div className="hidden md:flex items-center gap-(--inner-space) mb-(--inner-space)">
                    <span className="text-3xl font-semibold text-blue-600">{item.id}</span>
                    <div className="bg-blue-50 text-blue-600 p-2.5 rounded-xl">
                      {item.icon}
                    </div>
                  </div>
                  
                  {/* Mobile Title with ID */}
                  <h3 className="md:hidden text-[19px] font-semibold uppercase mb-(--heading-space) text-zinc-900 flex items-baseline gap-(--inner-space) leading-snug">
                    <span className="text-blue-600 text-[1.4rem]">{item.id}</span>
                    {item.title}
                  </h3>
                  
                  {/* Desktop Title */}
                  <h3 className="hidden md:block text-lg lg:text-xl font-semibold uppercase mb-(--heading-space) text-zinc-900 leading-snug">{item.title}</h3>
                  <p className="text-[14px] font-semibold text-blue-600 mb-(--inner-space) text-justify">{item.subtitle}</p>
                  <div className="text-[14px] text-zinc-500 mb-(--inner-space) leading-[1.6] whitespace-pre-line flex-1 text-justify">
                    {item.description}
                  </div>
                  <Link href="/lien-he" className="text-[14px] text-blue-600 font-medium hover:underline inline-flex items-center gap-(--inner-space).5 mt-auto w-fit">
                    Trao đổi chi tiết &rarr;
                  </Link>
                </div>
                <div className="w-full xl:w-[45%] bg-slate-100 min-h-64 xl:min-h-full relative flex items-center justify-center order-1 xl:order-2 border-b xl:border-b-0 xl:border-l border-slate-100">
                  <Image src={item.imagePlaceholder} alt={item.title} fill className="object-cover" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
