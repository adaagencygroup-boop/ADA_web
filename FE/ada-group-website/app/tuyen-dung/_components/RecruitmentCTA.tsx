import React from "react";

export default function RecruitmentCTA() {
  return (
    <section className="bg-white section-y max-md:py-8!">
      <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
        
        <div className="bg-[#002A64] shadow-xl rounded-2xl p-8 lg:p-12 flex flex-col lg:flex-row justify-center lg:justify-start items-center relative overflow-hidden lg:h-60">
          
          {/* Abstract background elements */}
          <div className="absolute w-64 h-64 -right-20 -top-20 bg-blue-500/20 blur-[32px] rounded-full z-0"></div>
          <div className="absolute w-80 h-80 -left-20 -bottom-20 bg-blue-400/10 blur-[32px] rounded-full z-0"></div>

          {/* Content Container */}
          <div className="flex flex-col lg:flex-row items-center gap-8 z-10 w-full lg:w-auto">
            {/* Icon */}
            <div className="hidden lg:flex w-24 h-24 shrink-0 rounded-2xl bg-white/10 border border-white/20 items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <path d="M13 11l-3 4h4l-3 4" />
              </svg>
            </div>

            {/* Text Group */}
            <div className="flex flex-col gap-3 text-center lg:text-left">
              <h2 className="font-semibold text-[30px] leading-9 text-white">
                Chưa tìm thấy vị trí phù hợp?
              </h2>
              <h3 className="font-semibold text-[24px] leading-8 text-blue-200">
                Hãy gửi CV cho chúng tôi!
              </h3>
              <p className="font-normal text-base leading-6 text-blue-100 pt-1 lg:max-w-md">
                Chúng tôi luôn tìm kiếm những tài năng phù hợp cho các cơ hội hiện tại và tương lai tại ADA Group.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
