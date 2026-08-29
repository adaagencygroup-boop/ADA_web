import Link from "next/link";

export default function AIProblemSolving() {
  const contentData = [
    {
      tag: "AI ĐÚNG NƠI, ĐÚNG BÀI TOÁN",
      title: "Không phải mọi bài toán cần AI",
      subtitle: "AI mở ra khả năng mới, nhưng không phải lúc nào cũng là giải pháp phù hợp nhất",
      description1: "Một số vấn đề có thể được giải quyết hiệu quả bằng phần mềm và tự động hóa thông thường. Những bài toán liên quan đến lượng lớn tài liệu, dữ liệu, hình ảnh hoặc thông tin khó xử lý theo quy tắc cố định có thể phù hợp hơn với AI.",
      description2: "ADA Group tập trung vào việc xác định công nghệ nào thực sự phù hợp với vấn đề cần giải quyết, thay vì đưa AI vào chỉ vì đó là một công nghệ mới.",
    },
  ];

  return (
    <section className="bg-white section-y max-md:py-5! border-t border-slate-100">
      <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_480px] gap-10 lg:gap-16 items-center">
          
          {/* Left Column: Content */}
          <div className="flex flex-col">
            {contentData.map((item, index) => (
              <div key={index}>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-800 mb-3 block">
                  {item.tag}
                </span>
                <h2 className="text-[2rem] font-semibold leading-[1.1] tracking-tight text-[#0a1a2f] sm:text-4xl lg:text-[2.5rem] mb-4 uppercase">
                  {item.title}
                </h2>
                <p className="text-[17px] font-medium text-blue-600 mb-6 leading-snug">
                  {item.subtitle}
                </p>
                <p className="text-[15px] leading-relaxed text-zinc-600 mb-4 max-w-xl text-justify">
                  {item.description1}
                </p>
                <p className="text-[15px] leading-relaxed text-zinc-600 mb-8 max-w-xl text-justify">
                  {item.description2}
                </p>
              </div>
            ))}
            
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
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.4 15C19.1277 15.6171 19.2583 16.3378 19.73 16.82L19.79 16.88C20.1656 17.2551 20.3766 17.7642 20.3766 18.295C20.3766 18.8258 20.1656 19.3349 19.79 19.71C19.4149 20.0856 18.9058 20.2966 18.375 20.2966C17.8442 20.2966 17.3351 20.0856 16.96 19.71L16.9 19.65C16.4178 19.1783 15.6971 19.0477 15.08 19.32C14.4755 19.5791 14.0826 20.1724 14.08 20.83V21C14.08 22.1038 13.1838 23 12.08 23C10.9762 23 10.08 22.1038 10.08 21V20.91C10.0642 20.2327 9.63587 19.6339 9 19.4C8.38291 19.1277 7.66219 19.2583 7.18 19.73L7.12 19.79C6.74486 20.1656 6.23582 20.3766 5.705 20.3766C5.17418 20.3766 4.66514 20.1656 4.29 19.79C3.91445 19.4149 3.70343 18.9058 3.70343 18.375C3.70343 17.8442 3.91445 17.3351 4.29 16.96L4.35 16.9C4.82167 16.4178 4.95235 15.6971 4.68 15.08C4.42093 14.4755 3.82764 14.0826 3.17 14.08H3C1.89617 14.08 1 13.1838 1 12.08C1 10.9762 1.89617 10.08 3 10.08H3.09C3.76733 10.0642 4.36613 9.63587 4.6 9C4.87235 8.38291 4.74167 7.66219 4.27 7.18L4.21 7.12C3.83445 6.74486 3.62343 6.23582 3.62343 5.705C3.62343 5.17418 3.83445 4.66514 4.21 4.29C4.58514 3.91445 5.09418 3.70343 5.625 3.70343C6.15582 3.70343 6.66486 3.91445 7.04 4.29L7.1 4.35C7.58219 4.82167 8.30291 4.95235 8.92 4.68H9C9.60447 4.42093 9.99738 3.82764 10 3.17V3C10 1.89617 10.8962 1 12 1C13.1038 1 14 1.89617 14 3V3.09C14.0026 3.74764 14.3955 4.34093 15 4.6C15.6171 4.87235 16.3378 4.74167 16.82 4.27L16.88 4.21C17.2551 3.83445 17.7642 3.62343 18.295 3.62343C18.8258 3.62343 19.3349 3.83445 19.71 4.21C20.0856 4.58514 20.2966 5.09418 20.2966 5.625C20.2966 6.15582 20.0856 6.66486 19.71 7.04L19.65 7.1C19.1783 7.58219 19.0477 8.30291 19.32 8.92V9C19.5791 9.60447 20.1724 9.99738 20.83 10H21C22.1038 10 23 10.8962 23 12C23 13.1038 22.1038 14 21 14H20.91C20.2524 14.0026 19.6591 14.3955 19.4 15V15" stroke="#3B82F6" strokeWidth={2}/>
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
