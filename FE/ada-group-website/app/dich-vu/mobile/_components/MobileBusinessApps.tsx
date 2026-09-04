import Link from"next/link";
import Image from"next/image";

export default function MobileBusinessApps() {
  const headerContent = [
    {
      tag:"BUSINESS APPS",
      title:"Ứng dụng doanh nghiệp",
      subtitle:"Tối ưu hoạt động và hỗ trợ vận hành doanh nghiệp",
      description1:"ADA Group phát triển ứng dụng di động giúp doanh nghiệp đưa các quy trình cần thiết lên Mobile, cho phép nhân viên tiếp cận dữ liệu và xử lý công việc thuận tiện ở bất cứ đâu, đồng thời kết nối hoạt động thực tế với hệ thống quản lý của doanh nghiệp."
    }
  ];

  const features = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-blue-600">
          <rect width="18" height="18" x="3" y="3" rx="2" />
          <path d="M3 9h18" />
          <path d="M9 21V9" />
        </svg>
      ),
      title:"Số hóa quy trình",
      desc:"Chuẩn hóa và tự động hóa các quy trình nghiệp vụ cốt lõi.",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-blue-600">
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
          <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3" />
        </svg>
      ),
      title:"Quản lý tập trung",
      desc:"Quản lý thông tin và tài nguyên trên một nền tảng duy nhất.",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-blue-600">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <circle cx="19" cy="11" r="2" />
          <path d="M19 8v6" />
        </svg>
      ),
      title:"Kết nối dữ liệu",
      desc:"Liên thông dữ liệu giữa các phòng ban và hệ thống.",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-blue-600">
          <line x1="18" x2="18" y1="20" y2="10" />
          <line x1="12" x2="12" y1="20" y2="4" />
          <line x1="6" x2="6" y1="20" y2="14" />
        </svg>
      ),
      title:"Hỗ trợ vận hành",
      desc:"Cung cấp công cụ và báo cáo giúp theo dõi, đo lường.",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-blue-600">
          <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
        </svg>
      ),
      title:"Tích hợp & mở rộng",
      desc:"Dễ dàng tích hợp với hệ thống hiện có và mở rộng.",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-blue-600">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
      title:"Bảo mật & phân quyền",
      desc:"Kiểm soát truy cập và bảo mật dữ liệu theo tiêu chuẩn.",
    },
  ];

  const highlights = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-white">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
      ),
      title:"Giải pháp phù hợp",
      desc:"Linh hoạt theo mô hình và quy trình của doanh nghiệp",
      active: true,
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-blue-800">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      ),
      title:"Triển khai hiệu quả",
      desc:"Phát triển nhanh chóng, dễ sử dụng và dễ mở rộng",
      active: false,
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-blue-800">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
      title:"Đồng hành dài hạn",
      desc:"Bảo trì, nâng cấp và hỗ trợ liên tục trong suốt quá trình vận hành",
      active: false,
    },
  ];

  return (
    <section className="section-y md:pt-(--heading-space)!">
      <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-(--section-padding) lg:items-center rounded-4xl lg:rounded-none border border-slate-100 lg:border-none shadow-[0_2px_15px_rgb(0,0,0,0.03)] lg:shadow-none overflow-hidden lg:overflow-visible">
          
          {/* Left Column (Image & Highlights - Top on Mobile) */}
          <div className="flex flex-col lg:gap-(--inner-space) order-1">
            <div className="relative w-full min-h-64 lg:min-h-0 lg:aspect-16/10 bg-slate-100 lg:rounded-3xl overflow-hidden lg:shadow-sm border-b border-slate-100 lg:border-slate-100">
              <Image src="https://wtxsbaavzdvpzogiwoei.supabase.co/storage/v1/object/public/ADA%20Group%20website/dong-hanh-cung-doanh-nghiep-tren-hanh-trinh-chuyen-doi-so-02.jpg" alt="Ứng dụng doanh nghiệp" fill className="object-cover" />
            </div>
            
            <div className="hidden lg:flex flex-col gap-(--inner-space)">
              {highlights.map((hl, idx) => (
                <div key={idx} className={`rounded-xl p-4 flex items-center gap-(--inner-space) border ${hl.active ? 'bg-[#1e3b75] border-[#1e3b75]' : 'bg-white border-slate-100 shadow-[0_2px_15px_rgb(0,0,0,0.03)]'}`}>
                  <div className={`p-2 rounded-lg shrink-0 ${hl.active ? 'bg-white/10' : 'bg-blue-50'}`}>
                    {hl.icon}
                  </div>
                  <div>
                    <h4 className={`text-[14px] font-semibold mb-(--heading-space).5 ${hl.active ? 'text-white' : 'text-zinc-900'}`}>{hl.title}</h4>
                    <p className={`text-[12px] ${hl.active ? 'text-blue-100' : 'text-zinc-500'}`}>{hl.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column (Text - Bottom on Mobile) */}
          <div className="flex flex-col p-6 sm:p-8 lg:p-0 order-2">
            {headerContent.map((item, index) => (
              <div key={index}>
                <span className="text-[11px] font-semibold uppercase tracking-widest text-slate-500 lg:text-blue-800 mb-(--heading-space) block">
                  {item.tag}
                </span>
                <h2 className="text-[1.35rem] font-bold lg:font-semibold leading-snug lg:leading-tight tracking-tight text-zinc-900 lg:text-[#0a1a2f] sm:text-4xl lg:text-[2.5rem] mb-(--heading-space)">
                  {item.title}
                </h2>
                <p className="text-[15px] lg:text-[17px] font-medium text-blue-600 mb-(--inner-space)">
                  {item.subtitle}
                </p>
                <p className="text-[14px] lg:text-[15px] leading-relaxed text-zinc-500 lg:text-zinc-600 mb-(--inner-space) text-justify">
                  {item.description1}
                </p>
              </div>
            ))}
            
            {/* Features Grid (Hidden on Mobile) */}
            <div className="hidden lg:grid grid-cols-1 sm:grid-cols-2 gap-(--inner-space) mb-(--inner-space)">
              {features.map((item, idx) => (
                <div key={idx} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-[0_2px_15px_rgb(0,0,0,0.03)] flex flex-col items-center text-center">
                  <div className="bg-blue-50 p-2.5 rounded-full mb-(--heading-space) flex items-center justify-center">
                    {item.icon}
                  </div>
                  <h4 className="font-semibold text-[13px] text-zinc-900 mb-(--heading-space) leading-snug">{item.title}</h4>
                  <p className="text-[12px] text-zinc-500 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
            
            <Link href="/lien-he" className="inline-flex items-center gap-(--inner-space) text-blue-600 font-semibold text-[14px] lg:text-[14.5px] hover:text-blue-800 transition-colors w-fit">
              Trao đổi chi tiết &rarr;
            </Link>
          </div>
          
        </div>
      </div>
    </section>
  );
}
