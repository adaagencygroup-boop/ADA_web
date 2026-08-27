import Image from "next/image";
import Link from "next/link";

export default function MobileBackend() {
  const headerContent = [
    {
      tag: "BACKEND & API",
      title: "Mobile Backend & API",
      subtitle: "Một ứng dụng tốt cần một nền tảng vững chắc phía sau",
      description1: "ADA Group phát triển đồng bộ ứng dụng và hệ thống phía sau, giúp dữ liệu, nghiệp vụ và các dịch vụ được kết nối xuyên suốt. Giải pháp có thể tích hợp với hệ thống hiện có của doanh nghiệp, tạo nền tảng vận hành ổn định và mang đến trải nghiệm đơn giản, liền mạch cho người dùng."
    }
  ];

  const features = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-blue-600">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      ),
      title: "Vận hành ổn định",
      desc: "Nền tảng được xây dựng để đáp ứng hoạt động thường xuyên của ứng dụng, đảm bảo hiệu suất và độ tin cậy.",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-blue-600">
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
          <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3" />
        </svg>
      ),
      title: "Quản lý dữ liệu",
      desc: "Tổ chức, lưu trữ và xử lý dữ liệu phù hợp với nghiệp vụ, đảm bảo tính nhất quán và an toàn thông tin.",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-blue-600">
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
      ),
      title: "Kết nối linh hoạt",
      desc: "Hỗ trợ ứng dụng kết nối với các nền tảng, hệ thống và dịch vụ bên thứ ba một cách dễ dàng.",
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-blue-600">
          <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
          <polyline points="16 7 22 7 22 13" />
        </svg>
      ),
      title: "Sẵn sàng mở rộng",
      desc: "Kiến trúc có khả năng mở rộng để đáp ứng nhu cầu phát triển và tăng trưởng người dùng.",
    },
  ];

  return (
    <section className="bg-white section-y max-md:py-5! md:pt-0!">
      <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
        
        {/* Mobile Card / Desktop Top Section */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-0 lg:gap-16 lg:items-center lg:mb-12 bg-white lg:bg-transparent rounded-4xl lg:rounded-none border border-slate-100 lg:border-none shadow-[0_2px_15px_rgb(0,0,0,0.03)] lg:shadow-none overflow-hidden lg:overflow-visible">
          
          {/* Right Column: Image (Top on Mobile) */}
          <div className="relative w-full min-h-64 lg:min-h-0 lg:aspect-16/10 bg-[#0a1526] lg:rounded-[2.5rem] overflow-hidden lg:shadow-xl border-b border-slate-100 lg:border-slate-200 order-1 lg:order-2">
            <Image src="https://cdn2.fptshop.com.vn/unsafe/Uploads/images/tin-tuc/173610/Originals/cong-nghe-so-la-gi-1.jpg" alt="Backend Infrastructure" fill className="object-cover opacity-80" unoptimized />
          </div>

          {/* Left Column: Text (Bottom on Mobile) */}
          {headerContent.map((item, index) => (
            <div key={index} className="flex flex-col p-6 sm:p-8 lg:p-0 order-2 lg:order-1">
              <div className="flex items-center gap-3 mb-2 lg:mb-4">
                <span className="text-slate-500 lg:text-blue-600 font-semibold text-[11px] lg:text-[13px] tracking-widest uppercase">
                  {item.tag}
                </span>
              </div>
              
              <h2 className="text-[1.35rem] font-bold lg:font-semibold leading-snug tracking-tight text-zinc-900 lg:text-[#0a1a2f] sm:text-4xl lg:text-[2.75rem] mb-3 lg:mb-4">
                {item.title}
              </h2>
              <p className="text-[15px] lg:text-[17px] font-medium text-blue-600 mb-4 lg:mb-6">
                {item.subtitle}
              </p>
              <p className="text-[14px] lg:text-[15px] leading-relaxed text-zinc-500 lg:text-zinc-600 max-w-xl mb-0">
                {item.description1}
              </p>

              <Link href="/lien-he" className="mt-6 inline-flex items-center gap-2 text-blue-600 font-semibold text-[14px] lg:text-[14.5px] hover:text-blue-800 transition-colors w-fit">
                Trao đổi chi tiết &rarr;
              </Link>
            </div>
          ))}
          
        </div>

        {/* Bottom Section: Grid (Hidden on Mobile) */}
        <div className="hidden lg:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {features.map((feature, idx) => (
            <div key={idx} className="bg-white rounded-3xl p-6 lg:p-8 border border-slate-100 shadow-[0_2px_15px_rgb(0,0,0,0.03)] flex flex-col">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-blue-50 w-10 h-10 rounded-full flex items-center justify-center shrink-0">
                  {feature.icon}
                </div>
                <h4 className="font-semibold text-[15px] text-zinc-900 leading-snug">{feature.title}</h4>
              </div>
              <p className="text-[13px] text-zinc-500 leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
