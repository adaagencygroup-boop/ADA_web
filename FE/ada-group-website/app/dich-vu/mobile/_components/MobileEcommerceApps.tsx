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
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 10C16 12.2077 14.2077 14 12 14C9.79234 14 8 12.2077 8 10" stroke="#1A4182" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3.10156 6.03516H20.8956" stroke="#1A4182" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3.4 5.467C3.14036 5.81319 3 6.23426 3 6.667V20C3 21.1038 3.89617 22 5 22H19C20.1038 22 21 21.1038 21 20V6.667C21 6.23426 20.8596 5.81319 20.6 5.467L18.6 2.8C18.2223 2.29639 17.6295 2 17 2H7C6.37049 2 5.77771 2.29639 5.4 2.8L3.4 5.467" stroke="#1A4182" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title:"E-commerce",
      desc:"Cửa hàng trực tuyến, giỏ hàng, thanh toán và quản lý đơn hàng.",
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 2V9C3 10.1 3.9 11 5 11H9C10.1038 11 11 10.1038 11 9V2" stroke="#1A4182" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M7 2V22" stroke="#1A4182" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M21 15V2C18.2404 2 16 4.24042 16 7V13C16 14.1 16.9 15 18 15H21V15M21 15V22" stroke="#1A4182" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title:"F&B",
      desc:"Đặt món, quản lý menu, giao hàng và takeaway.",
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 10C20 14.993 14.461 20.193 12.601 21.799C12.245 22.0667 11.755 22.0667 11.399 21.799C9.539 20.193 4 14.993 4 10C4 5.58468 7.58468 2 12 2C16.4153 2 20 5.58468 20 10" stroke="#1A4182" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 10C9 11.6557 10.3443 13 12 13C13.6557 13 15 11.6557 15 10C15 8.34425 13.6557 7 12 7C10.3443 7 9 8.34425 9 10V10" stroke="#1A4182" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title:"Hotel & Travel",
      desc:"Đặt phòng, tour, vé và các dịch vụ du lịch.",
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 2V5" stroke="#1A4182" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16 2V5" stroke="#1A4182" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M5 3H19C20.1038 3 21 3.89617 21 5V19C21 20.1038 20.1038 21 19 21H5C3.89617 21 3 20.1038 3 19V5C3 3.89617 3.89617 3 5 3V3" stroke="#1A4182" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M3 9H21" stroke="#1A4182" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
                <span className="text-[12px] font-semibold uppercase tracking-widest text-slate-500 lg:text-blue-800 mb-(--heading-space) block">
                  {item.tag}
                </span>
                <h2 className="text-[24px] lg:text-[36px] font-semibold leading-[1.2] tracking-tight text-zinc-900 lg:text-[#0a1a2f] mb-(--inner-space)">
                  {item.title}
                </h2>
                <p className="text-[14px] lg:text-[16px] leading-relaxed text-zinc-500 lg:text-zinc-600 mb-(--heading-space) text-justify">
                  {item.description}
                </p>
                
                <Link href="/lien-he" className="mt-(--inner-space) inline-flex items-center gap-(--inner-space) text-blue-600 font-semibold text-[14px] hover:text-blue-800 transition-colors w-fit">
                  Trao đổi chi tiết &rarr;
                </Link>
              </div>
            ))}

          </div>

          {/* Right Column (Categories - Hidden on Mobile) */}
          <div className="hidden lg:grid grid-cols-1 sm:grid-cols-2 gap-(--inner-space) lg:pt-(--inner-space) lg:col-span-1">
            {categories.map((cat, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-6 lg:p-8 border border-slate-100 shadow-[0_2px_15px_rgb(0,0,0,0.03)] flex flex-col items-center text-center">
                <div className="bg-blue-50 w-12 h-12 rounded-2xl mb-(--inner-space) flex items-center justify-center">
                  {cat.icon}
                </div>
                <h4 className="font-semibold text-[13px] text-zinc-900 mb-(--heading-space) leading-snug">{cat.title}</h4>
                <p className="text-[12px] text-zinc-500 leading-relaxed">{cat.desc}</p>
              </div>
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
}
