import React from "react";
import Image from "next/image";

const reasons = [
  {
    id: "01",
    image: "https://wtxsbaavzdvpzogiwoei.supabase.co/storage/v1/object/public/ADA%20Group%20website/dong-hanh-cung-doanh-nghiep-tren-hanh-trinh-chuyen-doi-so-02.jpg",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M12 21a9 9 0 0 0 9-9H3a9 9 0 0 0 9 9Z" />
        <path d="M12 3a9 9 0 0 1 9 9H3a9 9 0 0 1 9-9Z" />
        <path d="m12 12 3-3" />
        <path d="m12 12-3-3" />
      </svg>
    ),
    title: "Môi trường truyền cảm hứng",
    desc: "Làm việc trong môi trường trẻ trung, chuyên nghiệp, khuyến khích sáng tạo và đề cao sự hợp tác."
  },
  {
    id: "02",
    image: "https://wtxsbaavzdvpzogiwoei.supabase.co/storage/v1/object/public/ADA%20Group%20website/dong-hanh-cung-doanh-nghiep-tren-hanh-trinh-chuyen-doi-so-02.jpg",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
        <polyline points="16 7 22 7 22 13" />
      </svg>
    ),
    title: "Cơ hội phát triển rõ ràng",
    desc: "Lộ trình thăng tiến minh bạch, được đào tạo và phát triển kỹ năng liên tục."
  },
  {
    id: "03",
    image: "https://wtxsbaavzdvpzogiwoei.supabase.co/storage/v1/object/public/ADA%20Group%20website/dong-hanh-cung-doanh-nghiep-tren-hanh-trinh-chuyen-doi-so-02.jpg",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
        <path d="m3.3 7 8.7 5 8.7-5" />
        <path d="M12 22V12" />
      </svg>
    ),
    title: "Phúc lợi toàn diện",
    desc: "Chế độ đãi ngộ cạnh tranh, bảo hiểm đầy đủ, team building và nhiều hoạt động gắn kết."
  },
  {
    id: "04",
    image: "https://wtxsbaavzdvpzogiwoei.supabase.co/storage/v1/object/public/ADA%20Group%20website/dong-hanh-cung-doanh-nghiep-tren-hanh-trinh-chuyen-doi-so-02.jpg",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
    title: "Dự án tạo impact thực tế",
    desc: "Tham gia các dự án công nghệ mang lại giá trị cho doanh nghiệp và xã hội."
  }
];

export default function WhyChooseUs() {
  return (
    <section className="bg-white section-y">
      <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8 flex flex-col gap-(--inner-space)">
        <div className="text-center lg:text-left">
          <h2 className="text-2xl lg:text-[1.75rem] font-semibold text-[#002A64] uppercase tracking-tight">
            VÌ SAO CHỌN ADA GROUP?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-(--inner-space)">
          {reasons.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-[0_2px_15px_rgb(0,0,0,0.03)] flex flex-col hover:shadow-md transition-shadow">
              {/* Image */}
              <div className="relative w-full aspect-4/3 bg-slate-100">
                <Image 
                  src={item.image} 
                  alt={item.title} 
                  fill 
                  className="object-cover" 
                />
              </div>

              {/* Content */}
              <div className="p-6 lg:p-8 flex flex-col flex-1">
                <div className="hidden md:flex w-12 h-12 rounded-xl bg-blue-50 text-blue-600 items-center justify-center mb-6">
                  {item.icon}
                </div>
                
                <h3 className="text-[17px] font-semibold text-zinc-900 mb-3 leading-snug text-justify">
                  {item.title}
                </h3>
                
                <p className="text-[14px] text-zinc-500 leading-relaxed flex-1 text-justify">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
