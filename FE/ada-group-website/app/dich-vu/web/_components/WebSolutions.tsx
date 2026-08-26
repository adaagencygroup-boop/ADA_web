import Link from "next/link";
import Image from "next/image";

export default function WebSolutions() {
  const solutions = [
    {
      id: "01",
      title: "WEBSITE DOANH NGHIỆP",
      subtitle: "Xây dựng hình ảnh chuyên nghiệp trên môi trường số",
      description:
        "ADA Group thiết kế và phát triển website chuyên nghiệp, giúp doanh nghiệp giới thiệu thương hiệu, sản phẩm và dịch vụ, đồng thời hỗ trợ kết nối khách hàng, truyền thông và phát triển kinh doanh.",
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
      title: "WEB APPLICATION",
      subtitle: "Đưa dịch vụ và quy trình nghiệp vụ lên nền tảng web",
      description:
        "ADA Group phát triển ứng dụng web giúp doanh nghiệp quản lý dữ liệu, cung cấp dịch vụ và số hóa quy trình nghiệp vụ trên một nền tảng tập trung, có thể hoạt động độc lập hoặc tích hợp vào hệ thống doanh nghiệp.",
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
      title: "E - COMMERCE",
      subtitle: "Xây dựng nền tảng bán hàng trực tuyến hiệu quả",
      description:
        "ADA Group phát triển website và nền tảng thương mại điện tử phù hợp với mô hình kinh doanh, sản phẩm và hành vi mua sắm của từng nhóm khách hàng.\n\nChúng tôi không chỉ tập trung vào giao diện cửa hàng mà xem xét toàn bộ hành trình mua hàng — từ tìm kiếm sản phẩm, lựa chọn, đặt hàng và thanh toán đến theo dõi đơn hàng và quản lý khách hàng.",
      imagePlaceholder: "https://cdn2.fptshop.com.vn/unsafe/Uploads/images/tin-tuc/173610/Originals/cong-nghe-so-la-gi-1.jpg",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
          <path d="M3 6h18" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
      ),
      layout: "full",
    },
    {
      id: "04",
      title: "HỆ THỐNG QUẢN TRỊ",
      subtitle: "Quản lý tập trung, kiểm soát hiệu quả",
      description:
        "Phía sau một website hay ứng dụng web thường là hệ thống quản trị dành riêng cho doanh nghiệp.\n\nADA Group xây dựng các trang quản trị giúp đội ngũ vận hành quản lý dữ liệu, theo dõi hoạt động, xử lý nghiệp vụ và nắm bắt thông tin quan trọng trên một giao diện thống nhất.",
      imagePlaceholder: "https://cdn2.fptshop.com.vn/unsafe/Uploads/images/tin-tuc/173610/Originals/cong-nghe-so-la-gi-1.jpg",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      ),
      layout: "half",
    },
    {
      id: "05",
      title: "CỔNG THÔNG TIN KHÁCH HÀNG & ĐỐI TÁC",
      subtitle: "Kết nối thông tin, nâng cao trải nghiệm",
      description:
        "ADA Group xây dựng cổng thông tin dành cho khách hàng và đối tác, giúp tập trung thông tin, tài liệu và dịch vụ trên một nền tảng thống nhất, từ đó đơn giản hóa quá trình trao đổi, quản lý và kết nối giữa doanh nghiệp với các bên liên quan.",
      imagePlaceholder: "https://cdn2.fptshop.com.vn/unsafe/Uploads/images/tin-tuc/173610/Originals/cong-nghe-so-la-gi-1.jpg",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
      layout: "half",
    },
    {
      id: "06",
      title: "API & TÍCH HỢP HỆ THỐNG",
      subtitle: "Kết nối linh hoạt, mở rộng không giới hạn",
      description:
        "Một ứng dụng web trong thực tế hiếm khi hoạt động độc lập. Hệ thống có thể cần kết nối với phần mềm quản lý, cổng thanh toán, dịch vụ gửi thông báo hoặc các nền tảng mà doanh nghiệp đang sử dụng.\n\nADA Group xây dựng API và các giải pháp tích hợp giúp dữ liệu được trao đổi giữa các hệ thống một cách thống nhất, hạn chế những quy trình nhập liệu hoặc xử lý thủ công không cần thiết.",
      imagePlaceholder: "https://cdn2.fptshop.com.vn/unsafe/Uploads/images/tin-tuc/173610/Originals/cong-nghe-so-la-gi-1.jpg",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
      ),
      layout: "full_dark",
    },
  ];

  return (
    <section className="bg-white section-y max-md:py-5!">
      <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mx-auto max-w-4xl text-left md:text-center mb-10 md:mb-16">
          <div className="flex items-center justify-start md:justify-center gap-1.5 mb-4 text-blue-600">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2" /><path d="M12 20v2" />
              <path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" />
              <path d="M2 12h2" /><path d="M20 12h2" />
              <path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" />
            </svg>
            <span className="text-[11px] font-semibold uppercase tracking-widest">GIẢI PHÁP WEB HOÀN CHỈNH</span>
          </div>
          <h2 className="text-3xl font-semibold text-zinc-900 sm:text-4xl lg:text-[2.6rem] leading-tight mb-4">
            Giải pháp web cho từng <br className="hidden md:block" />
            giai đoạn <span className="text-blue-600">phát triển doanh nghiệp</span>
          </h2>
          <div className="w-16 h-1 bg-blue-600 ml-0 md:mx-auto rounded-full mb-6"></div>
          <p className="text-zinc-500 leading-relaxed max-w-2xl md:mx-auto mt-6 text-[15px] lg:text-base pr-4 md:pr-0">
            Từ website giới thiệu thương hiệu đến các nền tảng phức tạp, chúng tôi cung cấp giải pháp web toàn diện, linh hoạt và sẵn sàng đồng hành cùng doanh nghiệp.
          </p>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
          {solutions.map((item) => {
            if (item.layout === "full_dark") {
              return (
                <div key={item.id} className="lg:col-span-2 bg-white lg:bg-[#0b1120] rounded-3xl lg:rounded-4xl flex flex-col-reverse lg:flex-row overflow-hidden text-zinc-900 lg:text-white shadow-[0_2px_20px_rgb(0,0,0,0.04)] lg:shadow-xl border border-slate-100 lg:border-none">
                  <div className="p-6 lg:p-8 flex-1 flex flex-col justify-center lg:max-w-[50%]">
                    <div className="block lg:hidden mb-4">
                      <p className="text-[13px] font-semibold text-slate-500 uppercase tracking-wide mb-2">
                        {item.id} &mdash; {item.title}
                      </p>
                      <h3 className="text-[17px] font-semibold text-zinc-900 leading-[1.4]">
                        {item.subtitle}
                      </h3>
                    </div>
                    
                    <div className="hidden lg:block">
                      <div className="flex items-center gap-3 mb-6">
                        <span className="text-3xl lg:text-4xl font-semibold text-blue-400">{item.id}</span>
                        <div className="bg-white/10 text-blue-400 p-2.5 rounded-xl">
                          {item.icon}
                        </div>
                      </div>
                      <h3 className="text-2xl font-semibold uppercase mb-3 text-white">{item.title}</h3>
                      <p className="text-[15px] font-semibold text-blue-400 mb-6">{item.subtitle}</p>
                    </div>

                    <div className="hidden lg:block text-[14px] text-slate-300 mb-10 leading-relaxed whitespace-pre-line">
                      {item.description}
                    </div>
                    <Link href="/lien-he" className="text-[14px] text-blue-600 lg:text-blue-400 font-medium hover:text-blue-700 lg:hover:text-blue-300 inline-flex items-center gap-1.5 w-fit transition-colors">
                      Trao đổi chi tiết &rarr;
                    </Link>
                  </div>
                  <div className="w-full lg:flex-1 bg-slate-100 lg:bg-[#111827] min-h-64 lg:min-h-75 relative flex items-center justify-center lg:p-8">
                    <Image src={item.imagePlaceholder} alt={item.title} fill className="object-cover rounded-xl opacity-80" unoptimized />
                  </div>
                </div>
              );
            }

            if (item.layout === "full") {
              return (
                <div key={item.id} className="lg:col-span-2 bg-[#f4f6f9] rounded-3xl lg:rounded-4xl flex flex-col-reverse lg:flex-row overflow-hidden shadow-sm border border-slate-100">
                  <div className="p-6 lg:p-8 flex-1 flex flex-col justify-center lg:max-w-[50%]">
                    <div className="block lg:hidden mb-4">
                      <p className="text-[13px] font-semibold text-slate-500 uppercase tracking-wide mb-2">
                        {item.id} &mdash; {item.title}
                      </p>
                      <h3 className="text-lg font-semibold text-zinc-900 leading-snug">
                        {item.subtitle}
                      </h3>
                    </div>

                    <div className="hidden lg:block">
                      <div className="flex items-center gap-3 mb-6">
                        <span className="text-3xl lg:text-4xl font-semibold text-blue-600">{item.id}</span>
                        <div className="bg-white text-blue-600 p-2.5 rounded-xl shadow-sm">
                          {item.icon}
                        </div>
                      </div>
                      <h3 className="text-2xl font-semibold uppercase mb-3 text-zinc-900">{item.title}</h3>
                      <p className="text-[15px] font-semibold text-blue-600 mb-6">{item.subtitle}</p>
                    </div>

                    <div className="hidden lg:block text-[14px] text-zinc-600 mb-10 leading-relaxed whitespace-pre-line">
                      {item.description}
                    </div>
                    <Link href="/lien-he" className="text-[14px] text-blue-600 font-medium hover:underline inline-flex items-center gap-1.5 w-fit">
                      Trao đổi chi tiết &rarr;
                    </Link>
                  </div>
                  <div className="w-full lg:flex-1 bg-slate-200 min-h-75 relative flex items-center justify-center">
                    <Image src={item.imagePlaceholder} alt={item.title} fill className="object-cover" unoptimized />
                  </div>
                </div>
              );
            }

            return (
              <div key={item.id} className="bg-white rounded-3xl lg:rounded-4xl border border-slate-100 shadow-[0_2px_20px_rgb(0,0,0,0.04)] overflow-hidden flex flex-col-reverse xl:flex-row h-full">
                <div className="p-6 lg:p-8 flex-1 flex flex-col">
                  <div className="block lg:hidden mb-4">
                    <p className="text-[13px] font-semibold text-slate-500 uppercase tracking-wide mb-2">
                      {item.id} &mdash; {item.title}
                    </p>
                    <h3 className="text-[17px] font-semibold text-zinc-900 leading-[1.4]">
                      {item.subtitle}
                    </h3>
                  </div>

                  <div className="hidden lg:block">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-3xl font-semibold text-blue-600">{item.id}</span>
                      <div className="bg-blue-50 text-blue-600 p-2.5 rounded-xl">
                        {item.icon}
                      </div>
                    </div>
                    <h3 className="text-lg lg:text-xl font-semibold uppercase mb-3 text-zinc-900 leading-snug">{item.title}</h3>
                    <p className="text-[14px] font-semibold text-blue-600 mb-4">{item.subtitle}</p>
                  </div>

                  <div className="hidden lg:block text-[14px] text-zinc-500 mb-8 leading-[1.6] whitespace-pre-line flex-1">
                    {item.description}
                  </div>
                  <Link href="/lien-he" className="text-[14px] text-blue-600 font-medium hover:underline inline-flex items-center gap-1.5 mt-auto w-fit">
                    Trao đổi chi tiết &rarr;
                  </Link>
                </div>
                <div className="w-full xl:w-[45%] bg-slate-100 min-h-64 xl:min-h-full relative flex items-center justify-center">
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
