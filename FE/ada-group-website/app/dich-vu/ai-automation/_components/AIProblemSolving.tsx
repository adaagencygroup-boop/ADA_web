import Link from "next/link";

export default function AIProblemSolving() {
  return (
    <section className="bg-white section-y max-md:py-5! border-t border-slate-100">
      <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_480px] gap-10 lg:gap-16 items-center">
          
          {/* Left Column: Content */}
          <div className="flex flex-col">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-800 mb-3 block">
              AI ĐÚNG NƠI, ĐÚNG BÀI TOÁN
            </span>
            <h2 className="text-[2rem] font-semibold leading-[1.1] tracking-tight text-[#0a1a2f] sm:text-4xl lg:text-[2.5rem] mb-4 uppercase">
              Không phải mọi bài toán cần AI
            </h2>
            <p className="text-[17px] font-medium text-blue-600 mb-6 leading-snug">
              AI mở ra khả năng mới, nhưng không phải lúc nào cũng là giải pháp phù hợp nhất
            </p>
            <p className="text-[15px] leading-relaxed text-zinc-600 mb-4 max-w-xl">
              Một số vấn đề có thể được giải quyết hiệu quả bằng phần mềm và tự động hóa thông thường. Những bài toán liên quan đến lượng lớn tài liệu, dữ liệu, hình ảnh hoặc thông tin khó xử lý theo quy tắc cố định có thể phù hợp hơn với AI.
            </p>
            <p className="text-[15px] leading-relaxed text-zinc-600 mb-8 max-w-xl">
              ADA Group tập trung vào việc xác định công nghệ nào thực sự phù hợp với vấn đề cần giải quyết, thay vì đưa AI vào chỉ vì đó là một công nghệ mới.
            </p>
            
            <Link href="/lien-he" className="inline-flex items-center gap-2 text-blue-600 font-semibold text-[14.5px] hover:text-blue-800 transition-colors w-fit">
              Trao đổi thông tin chi tiết &rarr;
            </Link>
          </div>

          {/* Right Column: Flowchart UI */}
          <div className="w-full bg-[#f8fafc] rounded-3xl lg:rounded-4xl border border-slate-100 shadow-[inset_0_0_40px_rgb(0,0,0,0.02)] hidden lg:flex flex-col items-center justify-center py-10 px-8">
            
            {/* Top Node: BÀI TOÁN */}
            <div className="flex flex-col items-center">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-900 mb-3">BÀI TOÁN</span>
              <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-xl shadow-lg shadow-blue-600/20">
                ?
              </div>
            </div>

            {/* Arrow down */}
            <div className="flex flex-col items-center my-4">
              <div className="w-px h-10 bg-slate-200"></div>
              <svg viewBox="0 0 16 10" fill="none" className="w-4 h-2.5 -mt-px" stroke="#cbd5e1" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <polyline points="2,2 8,8 14,2" />
              </svg>
            </div>

            {/* Middle Label */}
            <div className="mb-6">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-900">GIẢI PHÁP PHÙ HỢP</span>
            </div>

            {/* Horizontal connector + 3 Cards */}
            <div className="relative w-full max-w-xs">
              {/* Top horizontal line connecting the 3 cards */}
              <div className="absolute top-5.5 left-[calc(100%/6)] right-[calc(100%/6)] h-px bg-slate-200 z-0"></div>
              
              {/* 3 Options */}
              <div className="grid grid-cols-3 gap-3 relative z-10">
                {/* Software */}
                <div className="bg-white rounded-2xl p-4 flex flex-col items-center justify-center gap-2 shadow-[0_2px_12px_rgb(0,0,0,0.05)] border border-slate-100 hover:-translate-y-1 transition-transform cursor-default">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-blue-500">
                    <rect width="20" height="14" x="2" y="3" rx="2" />
                    <line x1="8" x2="16" y1="21" y2="21" />
                    <line x1="12" x2="12" y1="17" y2="21" />
                  </svg>
                  <span className="text-[11px] font-semibold text-slate-700">Software</span>
                </div>
                
                {/* Automation */}
                <div className="bg-white rounded-2xl p-4 flex flex-col items-center justify-center gap-2 shadow-[0_2px_12px_rgb(0,0,0,0.05)] border border-slate-100 hover:-translate-y-1 transition-transform cursor-default">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-blue-500">
                    <path d="M12 2v20" />
                    <path d="m17 5-5-3-5 3" />
                    <path d="m17 19-5 3-5-3" />
                    <path d="M2 12h20" />
                    <path d="m5 7-3 5 3 5" />
                    <path d="m19 7 3 5-3 5" />
                  </svg>
                  <span className="text-[11px] font-semibold text-slate-700">Automation</span>
                </div>

                {/* AI */}
                <div className="bg-white rounded-2xl p-4 flex flex-col items-center justify-center gap-2 shadow-[0_2px_12px_rgb(0,0,0,0.05)] border border-slate-100 hover:-translate-y-1 transition-transform cursor-default">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-blue-500">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                    <polyline points="3.29 7 12 12 20.71 7" />
                    <line x1="12" x2="12" y1="22" y2="12" />
                  </svg>
                  <span className="text-[11px] font-semibold text-slate-700">AI</span>
                </div>
              </div>
            </div>

          </div>
          
        </div>
      </div>
    </section>
  );
}
