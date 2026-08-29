"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { MOCK_RECRUITMENTS, formatEmploymentType, getJobIconLabel } from "@/src/lib/api/recruitments";
import type { Recruitment } from "@/src/types/recruitments";

export default function JobBoard() {
  const [jobs, setJobs] = useState<Recruitment[]>(MOCK_RECRUITMENTS);
  const [displayCount, setDisplayCount] = useState(10);
  const [filters, setFilters] = useState({
    keyword: "",
    department: "",
    location: "",
    type: "",
  });

  const uniqueDepartments = Array.from(new Set(MOCK_RECRUITMENTS.map(job => job.department))).filter(Boolean) as string[];
  const uniqueLocations = Array.from(new Set(MOCK_RECRUITMENTS.map(job => job.location))).filter(Boolean) as string[];
  const uniqueTypes = Array.from(new Set(MOCK_RECRUITMENTS.map(job => formatEmploymentType(job.employmentType)))).filter(Boolean) as string[];

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    // fetch(`/api/jobs?keyword=${filters.keyword}&department=${filters.department}`)
    //   .then(res => res.json())
    //   .then(data => setJobs(data));

    let filtered = MOCK_RECRUITMENTS;

    if (filters.keyword) {
      const keyword = filters.keyword.toLowerCase();
      filtered = filtered.filter(
        (job) =>
          job.jobTitle.toLowerCase().includes(keyword) ||
          job.description?.toLowerCase().includes(keyword)
      );
    }
    if (filters.department) {
      filtered = filtered.filter((job) => job.department === filters.department);
    }
    if (filters.location) {
      filtered = filtered.filter((job) => job.location === filters.location);
    }
    if (filters.type) {
      filtered = filtered.filter((job) => formatEmploymentType(job.employmentType) === filters.type);
    }

    setJobs(filtered);
    setDisplayCount(10);
  };

  const displayedJobs = jobs.slice(0, displayCount);

  return (
    <section className="bg-white section-y pt-0!">
      <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8 flex flex-col gap-(--inner-space)">
        
        {/* Search & Filter Box */}
        <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] p-6 lg:p-8 relative z-10 -mt-16 md:-mt-27.5 lg:-mt-17.5 border border-slate-100">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 lg:gap-6 items-end">
            
            <div className="lg:col-span-4 flex flex-col gap-1.5">
              <label className="text-[13px] font-semibold text-zinc-800">Tìm kiếm vị trí</label>
              <div className="relative">
                <input 
                  type="text" 
                  name="keyword"
                  value={filters.keyword}
                  onChange={handleFilterChange}
                  placeholder="Nhập vị trí, kỹ năng, từ khóa..." 
                  className="w-full border border-slate-200 rounded-lg px-4 py-3 pl-10 text-[14px] outline-none focus:border-blue-500 transition-colors"
                />
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </div>
            </div>

            <div className="lg:col-span-2 flex flex-col gap-1.5">
              <label className="text-[13px] font-semibold text-zinc-800">Phòng ban</label>
              <select name="department" value={filters.department} onChange={handleFilterChange} className="w-full border border-slate-200 rounded-lg px-4 py-3 text-[14px] outline-none focus:border-blue-500 transition-colors bg-white">
                <option value="">Tất cả phòng ban</option>
                {uniqueDepartments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            <div className="lg:col-span-2 flex flex-col gap-1.5">
              <label className="text-[13px] font-semibold text-zinc-800">Địa điểm</label>
              <select name="location" value={filters.location} onChange={handleFilterChange} className="w-full border border-slate-200 rounded-lg px-4 py-3 text-[14px] outline-none focus:border-blue-500 transition-colors bg-white">
                <option value="">Tất cả địa điểm</option>
                {uniqueLocations.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>

            <div className="lg:col-span-2 flex flex-col gap-1.5">
              <label className="text-[13px] font-semibold text-zinc-800">Hình thức làm việc</label>
              <select name="type" value={filters.type} onChange={handleFilterChange} className="w-full border border-slate-200 rounded-lg px-4 py-3 text-[14px] outline-none focus:border-blue-500 transition-colors bg-white">
                <option value="">Tất cả hình thức</option>
                {uniqueTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className="lg:col-span-2">
              <button onClick={handleSearch} className="w-full bg-[#002A64] hover:bg-[#002A64]/90 text-white font-medium text-[14px] py-3 rounded-lg transition-colors">
                Tìm kiếm
              </button>
            </div>

          </div>
        </div>

        {/* Title */}
        <div className="flex items-center justify-between px-1">
          <h2 className="text-[18px] lg:text-[20px] font-bold text-zinc-900 uppercase">
            VỊ TRÍ ĐANG TUYỂN
          </h2>
          <div className="text-[13.5px] text-zinc-500 font-medium">
            {jobs.length} vị trí
          </div>
        </div>

        {/* Job Cards */}
        <div className="flex flex-col gap-(--inner-space)">
          {displayedJobs.length > 0 ? (
            displayedJobs.map((job) => (
              <div key={job.id} className="bg-white rounded-2xl border border-slate-200 p-5 lg:p-6 flex flex-col lg:flex-row gap-5 lg:gap-6 lg:items-center hover:border-blue-200 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all">
                
                {/* Left side: Icon + Title + Meta */}
                <div className="flex items-start lg:items-center gap-4 flex-1">
                  <div className="w-14 h-14 shrink-0 rounded-2xl bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-100 relative">
                    {job.coverImageUrl ? (
                      <Image src={job.coverImageUrl} alt={job.jobTitle} fill sizes="(max-width: 768px) 100vw, 56px" className="object-cover" unoptimized />
                    ) : (
                      <div className="w-full h-full bg-[#002A64] text-white flex items-center justify-center font-bold text-[18px]">
                        {getJobIconLabel(job.jobTitle)}
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-zinc-900 text-[16px] lg:text-[18px]">
                      <Link href={`/tuyen-dung/${job.slug}`}>{job.jobTitle}</Link>
                    </h3>
                    <div className="flex flex-col gap-1 mt-1.5 text-[13px] text-zinc-500 font-medium">
                      <div className="flex items-center flex-wrap gap-2">
                        <span>{job.department || "Khác"}</span>
                        <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center flex-wrap gap-2">
                        <span>{formatEmploymentType(job.employmentType)}</span>
                        <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                        <span className="text-blue-600">
                          {job.isSalaryNegotiable 
                            ? "Thỏa thuận" 
                            : (job.minSalary && job.maxSalary)
                              ? `${(job.minSalary / 1000000).toLocaleString('vi-VN')} - ${(job.maxSalary / 1000000).toLocaleString('vi-VN')} triệu`
                              : "Thỏa thuận"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Middle: Description snippet */}
                <div className="hidden lg:block w-64 xl:w-80 shrink-0">
                  <p className="text-[13px] text-zinc-500 leading-relaxed line-clamp-2">
                    {job.description}
                  </p>
                </div>

                {/* Right side: Dates & Button */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between lg:justify-end gap-4 lg:gap-6 shrink-0 mt-3 lg:mt-0 w-full lg:w-auto border-t lg:border-t-0 border-slate-100 pt-4 lg:pt-0">
                  <div className="flex flex-col gap-1.5 text-[12.5px] text-zinc-500 w-full sm:w-40">
                    <div className="flex items-center gap-2">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
                      <span>Đăng ngày: {new Date(job.createdAt).toLocaleDateString("vi-VN")}</span>
                    </div>
                    <div className="flex items-center gap-2 text-zinc-500">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                      <span>Hạn ứng tuyển: <span className="hidden lg:inline"><br/></span>{job.expiresAt ? new Date(job.expiresAt).toLocaleDateString("vi-VN") : "Đang mở"}</span>
                    </div>
                  </div>
                  
                  <div className="w-full sm:w-auto shrink-0 mt-1 sm:mt-0">
                    <Link href={`/tuyen-dung/${job.slug}`} className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-lg border border-slate-200 text-[#002A64] font-semibold text-[13px] hover:bg-slate-50 transition-colors group">
                      Xem chi tiết 
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
              <p className="text-zinc-500">Không tìm thấy vị trí phù hợp với tiêu chí lọc của bạn.</p>
            </div>
          )}
        </div>

        {/* Load more button */}
        {jobs.length > displayCount && (
          <div className="mt-10 flex justify-center">
            <button 
              onClick={() => setDisplayCount(prev => prev + 10)}
              className="px-6 py-2.5 rounded-lg border border-slate-200 bg-white text-zinc-600 font-medium text-[13.5px] hover:bg-slate-50 transition-colors flex items-center gap-2"
            >
              Xem thêm vị trí khác
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="m6 9 6 6 6-6"/></svg>
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
