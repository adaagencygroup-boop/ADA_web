import Link from "next/link";
import Image from "next/image";

export default function WebVision() {
  return (
    <section className="bg-white section-y max-md:py-5! overflow-hidden">
      <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-8 items-center">
          
          {/* Left: Content */}
          <div className="w-full lg:w-[55%] flex flex-col justify-center">
            <h2 className="text-[1.85rem] font-bold leading-[1.3] tracking-tight text-zinc-900 sm:text-4xl lg:text-[2.8rem] lg:leading-[1.15] mb-5">
              Website không chỉ để hiện diện.<br className="hidden lg:block" />
              <span className="lg:hidden"> </span>
              Hãy biến nó thành <span className="text-[#004bb4]">công cụ kinh doanh.</span>
            </h2>
            
            {/* Blue Divider Line */}
            <div className="hidden lg:block w-16 h-1.5 bg-blue-600 rounded-full mb-6"></div>
            
            <p className="text-[15px] lg:text-[16px] leading-relaxed text-zinc-600 max-w-115 mb-8 pr-4 lg:pr-0">
              Từ website doanh nghiệp đến ứng dụng web và hệ thống quản trị, chúng tôi xây dựng giải pháp phù hợp với cách doanh nghiệp vận hành.
            </p>
            
            <div>
              <Link
                href="/lien-he"
                className="inline-flex w-full lg:w-fit items-center justify-center gap-2 rounded-lg bg-[#004bb4] px-7 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-blue-700 shadow-sm"
              >
                Khám phá giải pháp
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
                  <path d="M5 12h14" /><path d="m13 6 6 6-6 6" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Right: Image Mockup */}
          <div className="hidden lg:flex relative mt-4 lg:mt-0 w-full lg:w-[45%] justify-end shrink-0">
            {/* Optional decorative background glow */}
            <div className="absolute inset-0 bg-blue-50 blur-3xl opacity-50 rounded-full scale-110"></div>
            
            {/* Image Container */}
            <div className="relative w-full aspect-4/3 lg:aspect-16/11 bg-white rounded-3xl overflow-hidden shadow-[0_10px_50px_-10px_rgba(0,0,0,0.1)] border border-slate-100 flex items-center justify-center p-4">
              <Image src="https://cdn2.fptshop.com.vn/unsafe/Uploads/images/tin-tuc/173610/Originals/cong-nghe-so-la-gi-1.jpg" alt="ADA Group Mockup" fill className="object-cover rounded-2xl" unoptimized />
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
