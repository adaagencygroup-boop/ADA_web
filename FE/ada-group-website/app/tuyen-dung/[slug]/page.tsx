import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MOCK_RECRUITMENTS, formatEmploymentType } from "@/src/lib/api/recruitments";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function JobDetailsPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  const job = MOCK_RECRUITMENTS.find((j) => j.slug === slug);

  if (!job) {
    notFound();
  }

  const displaySalary = job.isNegotiable 
    ? "Thỏa thuận" 
    : (job.minSalary && job.maxSalary)
      ? `${(job.minSalary / 1000000).toLocaleString('vi-VN')} - ${(job.maxSalary / 1000000).toLocaleString('vi-VN')} triệu`
      : "Thỏa thuận";

  const postDate = new Date(job.createdAt).toLocaleDateString("vi-VN");
  const expireDate = job.expiresAt ? new Date(job.expiresAt).toLocaleDateString("vi-VN") : "Đang mở";

  const fallbackDesc = job.description || "Chưa có mô tả chi tiết.";
  const fallbackReqs = job.requirements || "Tốt nghiệp đại học chuyên ngành CNTT hoặc liên quan.\nCó kiến thức vững về công nghệ áp dụng.\nKinh nghiệm với các dự án thực tế.\nCó khả năng làm việc độc lập và nhóm tốt.";
  const fallbackBens = job.benefits || "Thu nhập cạnh tranh theo năng lực.\nXét tăng lương và thưởng hiệu quả công việc.\nĐược tham gia các dự án lớn, làm việc cùng chuyên gia.\nMôi trường trẻ trung, năng động, khuyến khích sáng tạo.\nHưởng đầy đủ các chế độ theo quy định của pháp luật.";

  return (
    <div className="bg-slate-50 w-full flex-1 flex flex-col">
      {/* Breadcrumb Area (White Background) */}
      <div className="bg-white py-4 border-b border-slate-100">
        <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center text-[10px] sm:text-[11px] md:text-[13px] text-zinc-500 font-medium whitespace-nowrap overflow-x-auto no-scrollbar">
            <Link href="/" className="flex items-center gap-1.5 hover:text-blue-600 transition-colors shrink-0">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-2.5 h-2.5 md:w-3.75 md:h-3.75 -mt-px"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
              Trang chủ
            </Link>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 mx-1.5 md:mx-2 text-zinc-400 shrink-0"><polyline points="9 18 15 12 9 6" /></svg>
            <Link href="/tuyen-dung" className="hover:text-blue-600 transition-colors shrink-0">Tuyển dụng</Link>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 mx-1.5 md:mx-2 text-zinc-400 shrink-0"><polyline points="9 18 15 12 9 6" /></svg>
            <span className="text-zinc-900 font-semibold shrink-0">{job.jobTitle}</span>
          </nav>
        </div>
      </div>

      {/* Hero Banner */}
      <section className="relative w-full bg-[#002A64] section-y overflow-hidden">
        {job.coverImageURL && (
          <Image 
            src={job.coverImageURL} 
            alt={job.jobTitle} 
            fill 
            className="object-cover" 
            unoptimized 
          />
        )}
        <div className="absolute inset-0 bg-[#002A64]/65"></div>
        {/* Network / Tech Overlay Image (simulated with CSS pattern or a static image) */}
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        
        <div className="relative z-10 mx-auto max-w-360 px-4 sm:px-6 lg:px-8 text-white">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-(--inner-space)">
            <div className="flex-1 flex flex-col gap-(--heading-space)">
              <div className="inline-flex w-fit items-center gap-2 bg-white/10 border border-white/20 text-white px-3 py-1.5 rounded-full font-semibold text-[11px] uppercase tracking-wider">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>
                Tuyển dụng
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight">
                {job.jobTitle}
              </h1>
              <div className="flex flex-wrap items-center gap-4 lg:gap-8 text-[14px] md:text-[15px] font-medium text-blue-100">
                <div className="flex items-center gap-2">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" /></svg>
                  {job.department?.name || "Khác"}
                </div>
                <div className="flex items-center gap-2">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
                  {job.location}
                </div>
                <div className="flex items-center gap-2">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  {formatEmploymentType(job.employmentType)}
                </div>
                <div className="flex items-center gap-2">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" /></svg>
                  {displaySalary}
                </div>
              </div>
            </div>
            
            <div className="shrink-0 flex items-center justify-start lg:justify-end">
              <Link href={`/tuyen-dung/${slug}/ung-tuyen`} className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-[#002A64] rounded-lg font-semibold text-[14px] hover:bg-slate-100 transition-colors shadow-lg group">
                Ứng tuyển ngay
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-4 h-4 group-hover:translate-x-1 transition-transform"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
              </Link>
            </div>
          </div>

          <div className="mt-(--inner-space) pt-6 border-t border-white/20 flex flex-wrap items-center gap-6 text-[13px] text-blue-100/80">
            <div className="flex items-center gap-2">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4"><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" /></svg>
              Đăng ngày: {postDate}
            </div>
            <div className="flex items-center gap-2 text-red-300">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
              Hạn ứng tuyển: {expireDate}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-y">
        <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-(--inner-space) items-start">
          
          {/* Left Column (Job Info) */}
          <div className="lg:col-span-8 flex flex-col gap-(--inner-space)">
            
            <div className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm">
              <h2 className="text-[17px] font-semibold text-zinc-900 uppercase flex items-center gap-3 mb-6">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5 text-blue-600"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
                Mô tả công việc
              </h2>
              <div className="text-[14.5px] text-zinc-600 leading-relaxed whitespace-pre-line space-y-4">
                {fallbackDesc.split('\n').map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm">
              <h2 className="text-[17px] font-semibold text-zinc-900 uppercase flex items-center gap-3 mb-6">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5 text-blue-600"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
                Yêu cầu
              </h2>
              <ul className="text-[14.5px] text-zinc-600 leading-relaxed space-y-3 list-none">
                {fallbackReqs.split('\n').map((line, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-blue-600 mt-1">&bull;</span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm">
              <h2 className="text-[17px] font-semibold text-zinc-900 uppercase flex items-center gap-3 mb-6">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5 text-blue-600"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" /></svg>
                Quyền lợi
              </h2>
              <ul className="text-[14.5px] text-zinc-600 leading-relaxed space-y-3 list-none">
                {fallbackBens.split('\n').map((line, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4 text-blue-500 mt-0.5 shrink-0"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm">
              <h2 className="text-[17px] font-semibold text-zinc-900 uppercase flex items-center gap-3 mb-6">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5 text-blue-600"><path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" /></svg>
                Thông tin chung
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-[14px] text-zinc-600 border-collapse">
                  <tbody>
                    <tr className="border-b border-slate-100">
                      <td className="py-4 font-medium text-zinc-800 w-1/3">Địa điểm làm việc</td>
                      <td className="py-4">{job.location}</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="py-4 font-medium text-zinc-800">Hình thức làm việc</td>
                      <td className="py-4">{formatEmploymentType(job.employmentType)}</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="py-4 font-medium text-zinc-800">Thời gian làm việc</td>
                      <td className="py-4">{job.workingHours || "Thứ 2 – Thứ 6 (8:30 – 17:30)"}</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="py-4 font-medium text-zinc-800">Phòng ban</td>
                      <td className="py-4">{job.department?.name || "Khác"}</td>
                    </tr>
                    <tr>
                      <td className="py-4 font-medium text-zinc-800">Mức lương</td>
                      <td className="py-4">{displaySalary}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>

          {/* Right Column (Sidebar) */}
          <div className="lg:col-span-4 flex flex-col gap-(--inner-space) lg:sticky lg:top-24">
            
            {/* Box 1: Ứng tuyển vị trí này */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm">
              <h3 className="text-[16px] font-semibold text-zinc-900 uppercase mb-5 pb-4 border-b border-slate-100">
                Ứng tuyển vị trí này
              </h3>
              <h4 className="font-semibold text-zinc-900 text-[18px] mb-4">{job.jobTitle}</h4>
              <div className="flex flex-col gap-3 text-[13.5px] text-zinc-600 mb-6">
                <div className="flex items-center gap-3">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4 text-zinc-400"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" /></svg>
                  {job.department?.name || "Phòng ban Khác"}
                </div>
                <div className="flex items-center gap-3">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4 text-zinc-400"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
                  {job.location}
                </div>
                <div className="flex items-center gap-3">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4 text-zinc-400"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  {formatEmploymentType(job.employmentType)}
                </div>
                <div className="flex items-center gap-3">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4 text-zinc-400"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>
                  Số lượng: {job.requiredCandidateNum} người
                </div>
                <div className="flex items-center gap-3">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4 text-zinc-400"><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" /></svg>
                  Đăng ngày: {postDate}
                </div>
                <div className="flex items-center gap-3 text-red-500 font-medium">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                  Hạn ứng tuyển: {expireDate}
                </div>
              </div>
              <Link href={`/tuyen-dung/${slug}/ung-tuyen`} className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#002A64] text-white rounded-lg font-semibold text-[14px] hover:bg-[#002A64]/90 transition-colors shadow-md group">
                Ứng tuyển ngay
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-4 h-4 group-hover:translate-x-1 transition-transform"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
              </Link>
            </div>

            {/* Box 2: Thông tin liên hệ */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm">
              <h3 className="text-[16px] font-semibold text-zinc-900 uppercase mb-4 pb-4 border-b border-slate-100">
                Thông tin liên hệ
              </h3>
              <p className="text-[13px] text-zinc-500 mb-4 leading-relaxed">
                Nếu bạn có câu hỏi về vị trí này, vui lòng liên hệ với chúng tôi.
              </p>
              <div className="flex flex-col gap-3 text-[13.5px] text-zinc-800 font-medium">
                <a href="mailto:hr@adagroup.vn" className="flex items-center gap-3 hover:text-blue-600 transition-colors">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4 text-zinc-400"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
                  hr@adagroup.vn
                </a>
                <a href="tel:0243456678" className="flex items-center gap-3 hover:text-blue-600 transition-colors">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4 text-zinc-400"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.25-3.95-6.847-6.847l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
                  (+84) 024 345 678
                </a>
                <div className="flex items-center gap-3 text-zinc-600">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4 text-zinc-400"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  Thứ 2 – Thứ 6 (8:30 – 17:30)
                </div>
              </div>
            </div>

            {/* Box 3: Về ADA Group */}
            <div className="bg-white rounded-2xl border border-slate-100 p-6 md:p-8 shadow-sm">
              <h3 className="text-[16px] font-semibold text-zinc-900 uppercase mb-4 pb-4 border-b border-slate-100">
                Về ADA GROUP
              </h3>
              <div className="relative w-full h-32 rounded-lg overflow-hidden mb-4">
                <Image 
                  src="https://picsum.photos/400/200" 
                  alt="ADA Group Office" 
                  fill 
                  className="object-cover"
                />
              </div>
              <p className="text-[13px] text-zinc-500 mb-4 leading-relaxed line-clamp-4">
                ADA Group cung cấp các giải pháp công nghệ toàn diện, ứng dụng AI và tự động hóa để giúp doanh nghiệp tối ưu vận hành và bứt phá tăng trưởng. Môi trường làm việc hiện đại, chuyên nghiệp.
              </p>
              <Link href="/gioi-thieu" className="text-[13px] font-semibold text-[#002A64] hover:text-blue-700 transition-colors inline-flex items-center gap-1">
                Tìm hiểu thêm về chúng tôi <span className="text-lg leading-none">&rarr;</span>
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* Footer Call to Action */}
      <section className="bg-[#002A64] section-y mt-auto">
        <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-(--inner-space)">
          <div className="flex items-center gap-(--inner-space) text-white">
            <div className="w-14 h-14 shrink-0 bg-white/10 rounded-xl flex items-center justify-center border border-white/20">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
            </div>
            <div className="flex flex-col gap-(--heading-space)">
              <h2 className="text-xl md:text-2xl font-semibold">Sẵn sàng gia nhập ADA Group?</h2>
              <p className="text-blue-200 text-[13.5px] md:text-[15px]">Hãy gửi CV và cùng chúng tôi xây dựng những sản phẩm công nghệ tạo ra giá trị thực tế.</p>
            </div>
          </div>
          <div className="shrink-0 w-full md:w-auto">
            <Link href={`/tuyen-dung/${slug}/ung-tuyen`} className="w-full inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-[#002A64] rounded-lg font-semibold text-[14px] hover:bg-slate-100 transition-colors shadow-lg group">
              Gửi CV ngay
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-4 h-4 group-hover:translate-x-1 transition-transform"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
