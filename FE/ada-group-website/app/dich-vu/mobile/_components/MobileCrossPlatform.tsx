import Image from"next/image";
import Link from"next/link";

export default function MobileCrossPlatform() {
  const headerContent = [
    {
      tag:"CROSS-PLATFORM",
      title:"Ứng dụng đa nền tảng",
      subtitle:"Một trải nghiệm nhất quán trên nhiều thiết bị",
      description:"ADA Group đánh giá nhu cầu thực tế của từng dự án để lựa chọn phương án phát triển phù hợp cho Android, iOS hoặc đa nền tảng, thay vì áp dụng một công nghệ cố định. Mục tiêu là tạo ra giải pháp cân bằng giữa trải nghiệm người dùng, khả năng phát triển, hiệu quả nguồn lực và định hướng lâu dài của sản phẩm."
    }
  ];

  const features = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-blue-600 lg:text-white">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      ),
      title:"Codebase chung",
      desc:"Tiết kiệm chi phí phát triển & bảo trì",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-blue-600 lg:text-white">
          <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
          <path d="M3 3v5h5" />
          <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
          <path d="M16 21v-5h5" />
        </svg>
      ),
      title:"Trải nghiệm nhất quán",
      desc:"Đồng bộ giao diện và tính năng",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-blue-600 lg:text-white">
          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
          <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
          <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
          <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
        </svg>
      ),
      title:"Triển khai nhanh",
      desc:"Rút ngắn thời gian ra mắt sản phẩm",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-blue-600 lg:text-white">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      ),
      title:"Vận hành ổn định",
      desc:"Hiệu năng cao, bảo mật và dễ dàng mở rộng",
    },
  ];

  return (
    <section className="bg-white section-y max-md:py-5! md:pt-(--heading-space)!">
      <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:items-center bg-white lg:bg-[#0a1526] rounded-4xl lg:rounded-[3rem] lg:px-6 lg:py-14 text-left lg:text-center border border-slate-100 lg:border-none shadow-[0_2px_15px_rgb(0,0,0,0.03)] lg:shadow-none overflow-hidden lg:overflow-visible">
          
          {/* Mobile Image (Hidden on Desktop) */}
          <div className="lg:hidden relative w-full min-h-64 bg-slate-100 border-b border-slate-100">
            <Image src="https://wtxsbaavzdvpzogiwoei.supabase.co/storage/v1/object/public/ADA%20Group%20website/dong-hanh-cung-doanh-nghiep-tren-hanh-trinh-chuyen-doi-so-02.jpg" alt="Ứng dụng đa nền tảng" fill className="object-cover" />
          </div>

          {/* Text Content */}
          {headerContent.map((item, index) => (
            <div key={index} className="flex flex-col p-6 sm:p-8 lg:p-0 lg:items-center">
              <div className="flex items-center gap-(--inner-space) mb-(--inner-space)">
                <div className="hidden lg:block h-px w-8 bg-blue-500/30"></div>
                <span className="text-slate-500 lg:text-blue-500 text-[11px] font-semibold tracking-widest uppercase">
                  {item.tag}
                </span>
                <div className="hidden lg:block h-px w-8 bg-blue-500/30"></div>
              </div>
              
              <h2 className="text-[1.35rem] font-bold lg:font-semibold leading-snug lg:leading-tight tracking-tight text-zinc-900 lg:text-white sm:text-4xl lg:text-[2.75rem] mb-(--inner-space)">
                {item.title}
              </h2>
              <p className="text-[15px] lg:text-[17px] font-medium text-blue-600 lg:text-slate-300 mb-(--inner-space)">
                {item.subtitle}
              </p>
              <p className="text-[14px] lg:text-[15px] leading-relaxed text-zinc-500 lg:text-slate-400 text-justify lg:text-center">
                {item.description}
              </p>

              {/*"Xem chi tiết" Link */}
              <Link href="/lien-he" className="mt-(--inner-space) lg:mb-(--section-padding) inline-flex items-center gap-(--inner-space) text-blue-600 font-semibold text-[14px] lg:text-[14.5px] hover:text-blue-800 transition-colors w-fit">
                Trao đổi chi tiết &rarr;
              </Link>
            </div>
          ))}

          {/* Features Box (Hidden on Mobile) */}
          <div className="hidden lg:block w-full max-w-5xl bg-[#111e35] border border-slate-700/50 rounded-2xl p-6 lg:p-10 mb-(--section-padding)">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-(--inner-space) text-left divide-y sm:divide-y-0 sm:divide-x divide-slate-200 lg:divide-slate-700/50">
              {features.map((feature, idx) => (
                <div key={idx} className={`pt-(--inner-space) sm:pt-(--heading-space) ${idx !== 0 ? 'sm:pl-6 lg:pl-6' : ''}`}>
                  <div className="mb-(--inner-space)">
                    {feature.icon}
                  </div>
                  <h4 className="text-zinc-900 lg:text-white font-semibold text-[15px] mb-(--heading-space)">{feature.title}</h4>
                  <p className="text-zinc-500 lg:text-slate-400 text-[13px] leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* OS Icons (Hidden on Mobile) */}
          <div className="hidden lg:flex items-center gap-(--section-padding)">
            <div className="flex flex-col items-center gap-(--inner-space)">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 text-slate-400 lg:text-slate-300">
                <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z" />
                <path d="M10 2c1 .5 2 2 2 5" />
              </svg>
              <span className="text-[11px] font-semibold tracking-wider text-slate-500 lg:text-slate-400 uppercase">iOS</span>
            </div>
            
            <div className="w-px h-12 bg-slate-200 lg:bg-slate-700"></div>
            
            <div className="flex flex-col items-center gap-(--inner-space)">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 text-slate-400 lg:text-slate-300">
                <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
                <path d="M12 18h.01" />
              </svg>
              <span className="text-[11px] font-semibold tracking-wider text-slate-500 lg:text-slate-400 uppercase">Android</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
