import Link from "next/link";
import Image from "next/image";
import { ArrowRightIcon } from "@/app/_components/icons";

export default function WebVision() {
  return (
    <section className="bg-white section-y max-md:py-5! overflow-hidden">
      <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-(--section-padding) items-center">
          
          {/* Left: Content */}
          <div className="w-full lg:w-[55%] flex flex-col justify-center">
            <h2 className="text-[28px] lg:text-[36px] font-semibold leading-[1.2] tracking-tight text-zinc-900 mb-(--inner-space) max-w-full">
              Website không chỉ để hiện diện.<br className="hidden lg:block" />
              <span className="lg:hidden"> </span>
              Hãy biến nó thành <span className="text-[#004bb4]">công cụ kinh doanh.</span>
            </h2>
            
            {/* Blue Divider Line */}
            <div className="hidden lg:block w-16 h-1.5 bg-blue-600 rounded-full mb-(--inner-space)"></div>
            
            <p className="text-[14px] lg:text-[16px] leading-relaxed text-zinc-600 mb-(--inner-space) pr-4 lg:pr-0">
              Từ website doanh nghiệp đến ứng dụng web và hệ thống quản trị, chúng tôi xây dựng giải pháp phù hợp với cách doanh nghiệp vận hành.
            </p>
            
            <div>
              <Link
                href="/lien-he"
                className="group inline-flex w-full lg:w-fit items-center justify-center gap-1.5 rounded-lg bg-[#004bb4] px-7 py-3.5 text-[14px] leading-none font-semibold text-white transition-colors hover:bg-blue-700 shadow-sm"
              >
                <span>Khám phá giải pháp</span>
                <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Right: Image Mockup */}
          <div className="hidden lg:flex relative w-full lg:w-[45%] justify-end shrink-0">
            {/* Optional decorative background glow */}
            <div className="absolute inset-0 bg-blue-50 blur-3xl opacity-50 rounded-full scale-110"></div>
            
            {/* Image Container */}
            <div className="relative w-full aspect-4/3 lg:aspect-16/11 bg-white rounded-3xl overflow-hidden shadow-[0_10px_50px_-10px_rgba(0,0,0,0.1)] border border-slate-100 flex items-center justify-center p-4">
              <Image src="https://wtxsbaavzdvpzogiwoei.supabase.co/storage/v1/object/public/ADA%20Group%20website/dich-vu/web/WebVision.png" alt="ADA Group Mockup" fill sizes="(max-width: 768px) 100vw, 80vw" className="object-cover rounded-2xl" />
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
