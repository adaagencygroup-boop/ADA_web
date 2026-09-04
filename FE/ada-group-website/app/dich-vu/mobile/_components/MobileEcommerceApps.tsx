import Image from"next/image";
import Link from"next/link";

export default function MobileEcommerceApps() {
  const headerContent = [
    {
      tag:"E-COMMERCE & SERVICES",
      title:"Ứng dụng thương mại & dịch vụ",
      description:"ADA Group phát triển Mobile App giúp doanh nghiệp kết nối toàn bộ hành trình khách hàng từ khám phá, lựa chọn đến sử dụng và tương tác với dịch vụ, tạo nên trải nghiệm thống nhất giữa khách hàng và hoạt động vận hành của doanh nghiệp."
    }
  ];

  const categories = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-blue-600">
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
          <path d="M3 6h18" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
      ),
      title:"E-commerce",
      desc:"Cửa hàng trực tuyến, giỏ hàng, thanh toán và quản lý đơn hàng.",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-blue-600">
          <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
          <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
          <line x1="6" x2="6" y1="1" y2="3" />
          <line x1="10" x2="10" y1="1" y2="3" />
          <line x1="14" x2="14" y1="1" y2="3" />
        </svg>
      ),
      title:"F&B",
      desc:"Đặt món, quản lý menu, giao hàng và takeaway.",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-blue-600">
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      ),
      title:"Hotel & Travel",
      desc:"Đặt phòng, tour, vé và các dịch vụ du lịch.",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-blue-600">
          <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
          <line x1="16" x2="16" y1="2" y2="6" />
          <line x1="8" x2="8" y1="2" y2="6" />
          <line x1="3" x2="21" y1="10" y2="10" />
        </svg>
      ),
      title:"Booking & Event",
      desc:"Đặt lịch, đặt chỗ và quản lý sự kiện.",
    },
  ];

  return (
    <section className="section-y max-md:py-5! md:pt-(--heading-space)!">
      <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-(--section-padding) lg:items-start bg-white lg:bg-transparent rounded-4xl lg:rounded-none border border-slate-100 lg:border-none shadow-[0_2px_15px_rgb(0,0,0,0.03)] lg:shadow-none overflow-hidden lg:overflow-visible">
          
          {/* Left Column / Mobile Card */}
          <div className="flex flex-col lg:col-span-1">
            
            {/* Image (Top on mobile, Bottom on desktop) */}
            <div className="relative w-full min-h-64 lg:min-h-0 lg:aspect-4/3 bg-slate-100 lg:bg-white lg:rounded-4xl overflow-hidden shadow-none lg:shadow-sm border-b lg:border border-slate-100 order-1 lg:order-2 lg:mt-(--inner-space)">
              <Image src="https://wtxsbaavzdvpzogiwoei.supabase.co/storage/v1/object/public/ADA%20Group%20website/dong-hanh-cung-doanh-nghiep-tren-hanh-trinh-chuyen-doi-so-02.jpg" alt="Ứng dụng thương mại" fill className="object-cover" />
            </div>

            {/* Text (Bottom on mobile, Top on desktop) */}
            {headerContent.map((item, index) => (
              <div key={index} className="flex flex-col p-6 sm:p-8 lg:p-0 order-2 lg:order-1">
                <span className="text-[11px] font-semibold uppercase tracking-widest text-slate-500 lg:text-blue-800 mb-(--heading-space) block">
                  {item.tag}
                </span>
                <h2 className="text-[1.35rem] font-bold lg:font-semibold leading-snug lg:leading-tight tracking-tight text-zinc-900 lg:text-[#0a1a2f] sm:text-4xl lg:text-[2.5rem] mb-(--inner-space)">
                  {item.title}
                </h2>
                <p className="text-[14px] lg:text-[15px] leading-relaxed text-zinc-500 lg:text-zinc-600 mb-(--heading-space) text-justify">
                  {item.description}
                </p>
                
                <Link href="/lien-he" className="mt-(--inner-space) inline-flex items-center gap-(--inner-space) text-blue-600 font-semibold text-[14px] lg:text-[14.5px] hover:text-blue-800 transition-colors w-fit">
                  Trao đổi chi tiết &rarr;
                </Link>
              </div>
            ))}

          </div>

          {/* Right Column (Categories - Hidden on Mobile) */}
          <div className="hidden lg:grid grid-cols-1 sm:grid-cols-2 gap-(--inner-space) lg:pt-(--inner-space) lg:col-span-1">
            {categories.map((cat, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-6 lg:p-8 border border-slate-100 shadow-[0_2px_15px_rgb(0,0,0,0.03)] flex flex-col">
                <div className="bg-blue-50 w-12 h-12 rounded-2xl mb-(--inner-space) flex items-center justify-center">
                  {cat.icon}
                </div>
                <h4 className="font-semibold text-[17px] text-zinc-900 mb-(--heading-space)">{cat.title}</h4>
                <p className="text-[14px] text-zinc-500 leading-relaxed">{cat.desc}</p>
              </div>
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
}
