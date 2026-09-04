import React from "react";
import Image from "next/image";

const stats = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
    label: "Môi trường chuyên nghiệp"
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    ),
    label: "Cơ hội phát triển rõ ràng"
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
      </svg>
    ),
    label: "Dự án thực tế nhiều thách thức"
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
    label: "Phúc lợi cạnh tranh và toàn diện"
  }
];

export default function RecruitmentHero() {
  return (
    <section className="relative w-full min-h-87.5 lg:min-h-150 bg-transparent flex flex-col lg:flex-row">
      {/* Background (Full bleed) */}
      <div className="absolute inset-0">
        {/* Mobile Background */}
        <div className="absolute inset-0 lg:hidden">
          <Image 
            src="https://wtxsbaavzdvpzogiwoei.supabase.co/storage/v1/object/public/ADA%20Group%20website/dong-hanh-cung-doanh-nghiep-tren-hanh-trinh-chuyen-doi-so-02.jpg" 
            alt="ADA Group Office" 
            fill 
            className="object-cover" 
          />
          {/* Overlay to ensure text readability */}
          <div className="absolute inset-0 bg-[#003274]/85"></div>
        </div>

        {/* Desktop Background */}
        <div className="hidden lg:block absolute inset-0">
          <div className="absolute inset-0 bg-[#003274]"></div>
          <div className="absolute top-0 right-0 bottom-0 w-1/2 bg-slate-100 [clip-path:polygon(10%_0,100%_0,100%_100%,0_100%)]">
            <Image 
              src="https://wtxsbaavzdvpzogiwoei.supabase.co/storage/v1/object/public/ADA%20Group%20website/dong-hanh-cung-doanh-nghiep-tren-hanh-trinh-chuyen-doi-so-02.jpg" 
              alt="ADA Group Office" 
              fill 
              className="object-cover" 
            />
          </div>
        </div>
      </div>

      {/* Contained Content */}
      <div className="relative z-10 mx-auto w-full max-w-360 grid grid-cols-1 lg:grid-cols-2 grow">
        {/* Left Content (Text) */}
        <div className="flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-10 lg:py-16 xl:py-24 text-white">
          <div className="max-w-xl mx-auto lg:mx-0 w-full">
            <div className="inline-block bg-[#1a56db] border border-blue-400/30 text-white px-3 py-1.5 rounded-full font-semibold tracking-widest uppercase mb-4 text-[12px] lg:text-[12px] w-fit">
              CƠ HỘI NGHỀ NGHIỆP TẠI
            </div>
            <h1 className="text-[28px] lg:text-[44px] font-semibold mb-4 lg:mb-6 tracking-tight uppercase leading-[1.2] lg:leading-[1.1]">
              ADA GROUP
            </h1>
            <p className="text-blue-100/90 text-[14px] lg:text-[16px] leading-relaxed mb-6 lg:mb-12 max-w-md">
              Chúng tôi tìm kiếm những con người đam mê công nghệ, sẵn sàng đổi mới và tạo ra giá trị thực tế cho cộng đồng.
            </p>

            <div className="hidden lg:grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {stats.map((stat, idx) => (
                <div key={idx} className="flex flex-col items-start gap-3">
                  <div className="p-3 bg-white/10 rounded-full border border-white/20 text-white">
                    {stat.icon}
                  </div>
                  <p className="text-[12px] font-medium text-blue-100/80 leading-snug">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
