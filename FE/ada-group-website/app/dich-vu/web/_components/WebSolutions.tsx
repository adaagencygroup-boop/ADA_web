import Link from"next/link";
import Image from"next/image";

export default function WebSolutions() {
  const solutions = [
    {
      id:"01",
      title:"WEBSITE DOANH NGHIỆP",
      subtitle:"Xây dựng hình ảnh chuyên nghiệp trên môi trường số",
      description:
"ADA Group thiết kế và phát triển website chuyên nghiệp, giúp doanh nghiệp giới thiệu thương hiệu, sản phẩm và dịch vụ, đồng thời hỗ trợ kết nối khách hàng, truyền thông và phát triển kinh doanh.",
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
      title:"WEB APPLICATION",
      subtitle:"Đưa dịch vụ và quy trình nghiệp vụ lên nền tảng web",
      description:
"ADA Group phát triển ứng dụng web giúp doanh nghiệp quản lý dữ liệu, cung cấp dịch vụ và số hóa quy trình nghiệp vụ trên một nền tảng tập trung, có thể hoạt động độc lập hoặc tích hợp vào hệ thống doanh nghiệp.",
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
      title:"E - COMMERCE",
      subtitle:"Xây dựng nền tảng bán hàng trực tuyến hiệu quả",
      description:
"ADA Group phát triển website và nền tảng thương mại điện tử phù hợp với mô hình kinh doanh, sản phẩm và hành vi mua sắm của từng nhóm khách hàng.\n\nChúng tôi không chỉ tập trung vào giao diện cửa hàng mà xem xét toàn bộ hành trình mua hàng — từ tìm kiếm sản phẩm, lựa chọn, đặt hàng và thanh toán đến theo dõi đơn hàng và quản lý khách hàng.",
      imagePlaceholder:"https://wtxsbaavzdvpzogiwoei.supabase.co/storage/v1/object/public/ADA%20Group%20website/dong-hanh-cung-doanh-nghiep-tren-hanh-trinh-chuyen-doi-so-02.jpg",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
          <path d="M3 6h18" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
      ),
      layout:"full",
    },
    {
      id:"04",
      title:"HỆ THỐNG QUẢN TRỊ",
      subtitle:"Quản lý tập trung, kiểm soát hiệu quả",
      description:
"Phía sau một website hay ứng dụng web thường là hệ thống quản trị dành riêng cho doanh nghiệp.\n\nADA Group xây dựng các trang quản trị giúp đội ngũ vận hành quản lý dữ liệu, theo dõi hoạt động, xử lý nghiệp vụ và nắm bắt thông tin quan trọng trên một giao diện thống nhất.",
      imagePlaceholder:"https://wtxsbaavzdvpzogiwoei.supabase.co/storage/v1/object/public/ADA%20Group%20website/dong-hanh-cung-doanh-nghiep-tren-hanh-trinh-chuyen-doi-so-02.jpg",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      ),
      layout:"half",
    },
    {
      id:"05",
      title:"CỔNG THÔNG TIN KHÁCH HÀNG & ĐỐI TÁC",
      subtitle:"Kết nối thông tin, nâng cao trải nghiệm",
      description:
"ADA Group xây dựng cổng thông tin dành cho khách hàng và đối tác, giúp tập trung thông tin, tài liệu và dịch vụ trên một nền tảng thống nhất, từ đó đơn giản hóa quá trình trao đổi, quản lý và kết nối giữa doanh nghiệp với các bên liên quan.",
      imagePlaceholder:"https://wtxsbaavzdvpzogiwoei.supabase.co/storage/v1/object/public/ADA%20Group%20website/dong-hanh-cung-doanh-nghiep-tren-hanh-trinh-chuyen-doi-so-02.jpg",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
      layout:"half",
    },
    {
      id:"06",
      title:"API & TÍCH HỢP HỆ THỐNG",
      subtitle:"Kết nối linh hoạt, mở rộng không giới hạn",
      description:
"Một ứng dụng web trong thực tế hiếm khi hoạt động độc lập. Hệ thống có thể cần kết nối với phần mềm quản lý, cổng thanh toán, dịch vụ gửi thông báo hoặc các nền tảng mà doanh nghiệp đang sử dụng.\n\nADA Group xây dựng API và các giải pháp tích hợp giúp dữ liệu được trao đổi giữa các hệ thống một cách thống nhất, hạn chế những quy trình nhập liệu hoặc xử lý thủ công không cần thiết.",
      imagePlaceholder:"https://wtxsbaavzdvpzogiwoei.supabase.co/storage/v1/object/public/ADA%20Group%20website/dong-hanh-cung-doanh-nghiep-tren-hanh-trinh-chuyen-doi-so-02.jpg",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
      ),
      layout:"full",
    },
  ];

  return (
    <section className="section-y">
      <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mx-auto max-w-4xl text-center mb-(--section-padding) md:mb-(--section-padding)">
          <div className="inline-flex items-center gap-(--inner-space) rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600 mb-(--inner-space)">
            <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 0.8C8 0.358468 7.64153 0 7.2 0C6.75847 0 6.4 0.358468 6.4 0.8V1.6C6.4 2.04153 6.75847 2.4 7.2 2.4C7.64153 2.4 8 2.04153 8 1.6V0.8ZM11.7256 3.0056C12.0288 2.6917 12.0244 2.19273 11.7159 1.88415C11.4073 1.57556 10.9083 1.57122 10.5944 1.8744L10.0288 2.44C9.72562 2.7539 9.72996 3.25287 10.0385 3.56146C10.3471 3.87004 10.8461 3.87438 11.16 3.5712L11.7256 3.0056ZM13.6 6.4C13.6 6.84153 13.2415 7.2 12.8 7.2H12C11.5585 7.2 11.2 6.84153 11.2 6.4C11.2 5.95847 11.5585 5.6 12 5.6H12.8C13.2415 5.6 13.6 5.95847 13.6 6.4ZM11.7256 9.7944C12.0379 10.1068 12.0379 10.6132 11.7256 10.9256L11.16 11.4912C10.9591 11.6992 10.6617 11.7826 10.382 11.7094C10.1023 11.6361 9.88385 11.4177 9.81064 11.138C9.73743 10.8583 9.82084 10.5609 10.0288 10.36L10.5944 9.7944C10.9068 9.48209 11.4132 9.48209 11.7256 9.7944ZM7.2 12.8C6.75847 12.8 6.4 12.4415 6.4 12V11.2C6.4 10.7585 6.75847 10.4 7.2 10.4C7.64153 10.4 8 10.7585 8 11.2V12C8 12.4415 7.64153 12.8 7.2 12.8ZM3.8056 10.9256C3.4932 11.2379 2.9868 11.2379 2.6744 10.9256L2.1088 10.36C1.90083 10.1591 1.81743 9.8617 1.89064 9.58199C1.96385 9.30229 2.18229 9.08385 2.46199 9.01064C2.7417 8.93743 3.03914 9.02083 3.24 9.2288L3.8056 9.7944C4.11791 10.1068 4.11791 10.6132 3.8056 10.9256ZM2.4 6.4C2.4 6.84153 2.04153 7.2 1.6 7.2H0.8C0.358468 7.2 0 6.84153 0 6.4C0 5.95847 0.358468 5.6 0.8 5.6H1.6C2.04153 5.6 2.4 5.95847 2.4 6.4ZM4.3712 3.0056C4.67438 2.6917 4.67004 2.19273 4.36145 1.88415C4.05287 1.57556 3.5539 1.57122 3.24 1.8744L2.6744 2.44C2.46643 2.64086 2.38303 2.9383 2.45624 3.21801C2.52945 3.49771 2.74789 3.71615 3.02759 3.78936C3.3073 3.86257 3.60474 3.77917 3.8056 3.5712L4.3712 3.0056Z" fill="#2563EB"/>
            </svg>
            <span className="text-[12px] font-semibold uppercase tracking-widest">GIẢI PHÁP WEB HOÀN CHỈNH</span>
          </div>
          <h2 className="text-[28px] lg:text-[44px] font-semibold text-zinc-900 leading-[1.2] mb-(--inner-space) max-w-full">
            Giải pháp web cho từng <br className="hidden md:block" />
            giai đoạn <span className="text-blue-600">phát triển doanh nghiệp</span>
          </h2>
          <div className="w-16 h-1 bg-blue-600 mx-auto rounded-full mb-(--inner-space)"></div>
          <p className="text-[14px] lg:text-[16px] text-zinc-500 leading-relaxed max-w-2xl mx-auto mt-(--inner-space)">
            Từ website giới thiệu thương hiệu đến các nền tảng phức tạp, chúng tôi cung cấp giải pháp web toàn diện, linh hoạt và sẵn sàng đồng hành cùng doanh nghiệp.
          </p>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-(--section-padding)">
          {solutions.map((item) => {
            if (item.layout ==="full_dark") {
              return (
                <div key={item.id} className="lg:col-span-2 bg-white lg:bg-blue-50 rounded-3xl lg:rounded-4xl flex flex-col-reverse lg:flex-row overflow-hidden text-zinc-900 lg:text-white shadow-[0_2px_20px_rgb(0,0,0,0.04)] lg:shadow-xl border border-slate-100 lg:border-none">
                  <div className="p-6 lg:p-8 flex-1 flex flex-col justify-center lg:max-w-[50%]">
                    {/* Mobile Title with ID */}
                    <h3 className="lg:hidden text-[24px] font-semibold uppercase mb-(--heading-space) text-zinc-900 flex items-baseline gap-(--inner-space) leading-snug">
                      <span className="text-blue-600 text-[1.4rem]">{item.id}</span>
                      {item.title}
                    </h3>
                    
                    <div className="hidden lg:block">
                      <div className="flex items-center gap-(--inner-space) mb-(--inner-space)">
                        <span className="text-3xl lg:text-4xl font-semibold text-blue-600">{item.id}</span>
                        <div className="bg-white text-blue-400 p-2.5 rounded-xl shadow-sm">
                          {item.icon}
                        </div>
                      </div>
                      <h3 className="text-[24px] font-semibold uppercase mb-(--heading-space) text-zinc-900 lg:text-white">{item.title}</h3>
                    </div>
                    
                    <p className="text-[14px] lg:text-[16px] font-semibold text-blue-600 lg:text-blue-400 mb-(--inner-space) text-justify">{item.subtitle}</p>

                    <div className="text-[14px] lg:text-[16px] text-zinc-600 lg:text-slate-300 mb-(--section-padding) leading-relaxed whitespace-pre-line text-justify">
                      {item.description}
                    </div>
                    <Link href="/lien-he" className="text-[14px] text-blue-600 lg:text-blue-400 font-medium hover:text-blue-700 lg:hover:text-blue-300 inline-flex items-center gap-(--inner-space).5 w-fit transition-colors">
                      Trao đổi chi tiết &rarr;
                    </Link>
                  </div>
                  <div className="w-full lg:flex-1 bg-slate-100 lg:bg-[#111827] min-h-64 lg:min-h-75 relative flex items-center justify-center lg:p-8">
                    <Image src={item.imagePlaceholder} alt={item.title} fill className="object-cover " />
                  </div>
                </div>
              );
            }

            if (item.layout ==="full") {
              return (
                <div key={item.id} className="lg:col-span-2 g-white lg:bg-blue-50 rounded-3xl lg:rounded-4xl flex flex-col-reverse lg:flex-row overflow-hidden shadow-sm border border-slate-100">
                  <div className="p-6 lg:p-8 flex-1 flex flex-col justify-center lg:max-w-[50%]">
                    {/* Mobile Title with ID */}
                    <h3 className="lg:hidden text-[24px] font-semibold uppercase mb-(--heading-space) text-zinc-900 flex items-baseline gap-(--inner-space) leading-snug">
                      <span className="text-blue-600 text-[1.4rem]">{item.id}</span>
                      {item.title}
                    </h3>

                    <div className="hidden lg:block">
                      <div className="flex items-center gap-(--inner-space) mb-(--inner-space)">
                        <span className="text-3xl lg:text-4xl font-semibold text-blue-600">{item.id}</span>
                        <div className="bg-white text-blue-600 p-2.5 rounded-xl shadow-sm">
                          {item.icon}
                        </div>
                      </div>
                      <h3 className="text-[24px] font-semibold uppercase mb-(--heading-space) text-zinc-900">{item.title}</h3>
                    </div>
                    
                    <p className="text-[14px] lg:text-[16px] font-semibold text-blue-600 mb-(--inner-space) text-justify">{item.subtitle}</p>

                    <div className="text-[14px] lg:text-[16px] text-zinc-600 mb-(--section-padding) leading-relaxed whitespace-pre-line text-justify">
                      {item.description}
                    </div>
                    <Link href="/lien-he" className="text-[14px] text-blue-600 font-medium hover:underline inline-flex items-center gap-(--inner-space).5 w-fit">
                      Trao đổi chi tiết &rarr;
                    </Link>
                  </div>
                  <div className="w-full lg:flex-1 bg-slate-200 min-h-75 relative flex items-center justify-center">
                    <Image src={item.imagePlaceholder} alt={item.title} fill className="object-cover" />
                  </div>
                </div>
              );
            }

            return (
              <div key={item.id} className="bg-white rounded-3xl lg:rounded-4xl border border-slate-100 shadow-[0_2px_20px_rgb(0,0,0,0.04)] overflow-hidden flex flex-col-reverse xl:flex-row h-full">
                <div className="p-6 lg:p-8 flex-1 flex flex-col">
                  {/* Mobile Title with ID */}
                  <h3 className="lg:hidden text-[24px] font-semibold uppercase mb-(--heading-space) text-zinc-900 flex items-baseline gap-(--inner-space) leading-snug">
                    <span className="text-blue-600 text-[1.4rem]">{item.id}</span>
                    {item.title}
                  </h3>

                  <div className="hidden lg:block">
                    <div className="flex items-center gap-(--inner-space) mb-(--inner-space)">
                      <span className="text-3xl font-semibold text-blue-600">{item.id}</span>
                      <div className="bg-blue-50 text-blue-600 p-2.5 rounded-xl">
                        {item.icon}
                      </div>
                    </div>
                    <h3 className="text-[24px] font-semibold uppercase mb-(--heading-space) text-zinc-900 leading-snug">{item.title}</h3>
                  </div>
                  
                  <p className="text-[14px] lg:text-[16px] font-semibold text-blue-600 mb-(--inner-space) text-justify">{item.subtitle}</p>

                  <div className="text-[14px] lg:text-[16px] text-zinc-500 mb-(--inner-space) leading-[1.6] whitespace-pre-line flex-1 text-justify">
                    {item.description}
                  </div>
                  <Link href="/lien-he" className="text-[14px] text-blue-600 font-medium hover:underline inline-flex items-center gap-(--inner-space).5 mt-auto w-fit">
                    Trao đổi chi tiết &rarr;
                  </Link>
                </div>
                <div className="w-full xl:w-[45%] bg-slate-100 min-h-64 xl:min-h-full relative flex items-center justify-center">
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
