"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { formatDate, formatDeadlineDate, formatEmploymentType, getJobIconLabel, getRecruitments, stripHtml } from "@/src/lib/api/recruitments";
import type { Department, EmploymentType, Recruitment } from "@/src/types/recruitments";

const EMPLOYMENT_TYPE_OPTIONS: EmploymentType[] = ["fulltime", "parttime", "remote", "hybrid"];

function ChevronDownIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function CheckIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function CustomSelectFilter({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { key: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentItem = options.find((opt) => opt.key === value) ?? options[0];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[13px] font-semibold text-zinc-800">{label}</label>
      <div ref={containerRef} className="relative w-full">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="cursor-pointer flex h-11 w-full items-center justify-between rounded-xl border border-slate-200 bg-zinc-50/60 px-4 text-left text-sm font-medium text-zinc-900 transition-all hover:border-blue-500 hover:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        >
          <span className="truncate">{currentItem?.label}</span>
          <ChevronDownIcon
            className={`w-4 h-4 shrink-0 text-zinc-500 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isOpen && (
          <div className="absolute left-0 right-0 top-full z-30 mt-2 max-h-60 overflow-y-auto rounded-xl border border-zinc-100 bg-white p-1.5 shadow-xl ring-1 ring-black/5">
            {options.map((option) => {
              const isSelected = option.key === value;
              return (
                <button
                  key={option.key}
                  type="button"
                  onClick={() => {
                    onChange(option.key);
                    setIsOpen(false);
                  }}
                  className={`cursor-pointer flex w-full items-center justify-between rounded-lg px-3.5 py-2.5 text-left text-sm font-medium transition-colors ${
                    isSelected
                      ? "bg-blue-50 text-blue-600 font-semibold"
                      : "text-zinc-700 hover:bg-zinc-50 hover:text-zinc-900"
                  }`}
                >
                  <span className="truncate">{option.label}</span>
                  {isSelected && <CheckIcon className="w-4 h-4 shrink-0 text-blue-600" />}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default function JobBoard({
  initialJobs,
  departments,
}: {
  initialJobs: Recruitment[];
  departments: Department[];
}) {
  const [jobs, setJobs] = useState<Recruitment[]>(initialJobs);
  const [displayCount, setDisplayCount] = useState(10);
  const [isSearching, setIsSearching] = useState(false);
  const [filters, setFilters] = useState({
    keyword: "",
    departmentId: "",
    employmentType: "",
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = async () => {
    setIsSearching(true);
    try {
      const result = await getRecruitments({
        search: filters.keyword || undefined,
        departmentId: filters.departmentId || undefined,
        employmentType: (filters.employmentType || undefined) as EmploymentType | undefined,
        size: 50,
      });
      setJobs(result.items);
      setDisplayCount(10);
    } finally {
      setIsSearching(false);
    }
  };

  const displayedJobs = jobs.slice(0, displayCount);

  const departmentOptions = [
    { key: "", label: "Tất cả phòng ban" },
    ...departments.map((dept) => ({ key: dept.id, label: dept.name })),
  ];

  const employmentTypeOptions = [
    { key: "", label: "Tất cả hình thức" },
    ...EMPLOYMENT_TYPE_OPTIONS.map((type) => ({
      key: type,
      label: formatEmploymentType(type),
    })),
  ];

  return (
    <section className="section-y pt-0!">
      <div className="mx-auto max-w-360 px-4 sm:px-6 lg:px-8 flex flex-col gap-(--inner-space)">

        {/* Search & Filter Box */}
        <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] p-6 lg:p-8 relative z-10 -mt-16 md:-mt-27.5 lg:-mt-17.5 border border-slate-100">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 lg:gap-6 items-end">

            <div className="lg:col-span-5 flex flex-col gap-1.5">
              <label className="text-[13px] font-semibold text-zinc-800">Tìm kiếm vị trí</label>
              <div className="relative">
                <input
                  type="text"
                  name="keyword"
                  value={filters.keyword}
                  onChange={handleFilterChange}
                  placeholder="Nhập vị trí, kỹ năng, từ khóa..."
                  className="w-full h-11 border border-slate-200 bg-zinc-50/60 rounded-xl px-4 pl-10 text-[14px] text-zinc-900 outline-none focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </div>
            </div>

            <div className="lg:col-span-3">
              <CustomSelectFilter
                label="Phòng ban"
                options={departmentOptions}
                value={filters.departmentId}
                onChange={(val) => setFilters((prev) => ({ ...prev, departmentId: val }))}
              />
            </div>

            <div className="lg:col-span-2">
              <CustomSelectFilter
                label="Hình thức làm việc"
                options={employmentTypeOptions}
                value={filters.employmentType}
                onChange={(val) => setFilters((prev) => ({ ...prev, employmentType: val }))}
              />
            </div>

            <div className="lg:col-span-2">
              <button
                onClick={handleSearch}
                disabled={isSearching}
                className="cursor-pointer h-11 w-full bg-[#002A64] hover:bg-[#002A64]/90 text-white font-medium text-[14px] rounded-xl transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSearching ? "Đang tìm..." : "Tìm kiếm"}
              </button>
            </div>

          </div>
        </div>

        {/* Title */}
        <div className="flex items-center justify-between px-1">
          <h2 className="text-[20px] lg:text-[28px] font-semibold text-zinc-900 uppercase">
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
                  <div className="w-12 h-12 lg:w-16 lg:h-16 shrink-0 relative rounded-xl border border-slate-100 overflow-hidden bg-white shadow-xs">
                    {job.coverImageURL ? (
                      <Image src={job.coverImageURL} alt={job.jobTitle} fill loading="lazy" placeholder="blur" blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZTJlOGYwIi8+PC9zdmc+" sizes="(max-width: 768px) 100vw, 56px" className="object-cover" />
                    ) : (
                      <div className="w-full h-full bg-[#002A64] text-white flex items-center justify-center font-semibold text-[18px]">
                        {getJobIconLabel(job.jobTitle)}
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-zinc-900 text-[16px] lg:text-[18px]">
                      <Link href={`/tuyen-dung/${job.slug}`}>{job.jobTitle}</Link>
                    </h3>
                    <div className="flex flex-col gap-1 mt-1.5 text-[13px] text-zinc-500 font-medium">
                      <div className="flex items-center flex-wrap gap-2">
                        <span>{job.departmentName || "Khác"}</span>
                        <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center flex-wrap gap-2">
                        <span>{formatEmploymentType(job.employmentType)}</span>
                        <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                        <span className="text-blue-600">
                          {job.isNegotiable
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
                    {job.description ? stripHtml(job.description) : ""}
                  </p>
                </div>

                {/* Right side: Dates & Button */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between lg:justify-end gap-4 lg:gap-6 shrink-0 mt-3 lg:mt-0 w-full lg:flex-1 border-t lg:border-t-0 border-slate-100 pt-4 lg:pt-0">
                  <div className="flex flex-col gap-1.5 text-[12.5px] text-zinc-500 w-full sm:w-40">
                    <div className="flex items-center gap-2">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
                      <span>Đăng ngày: {formatDate(job.createdAt)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-zinc-500">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                      <span>Hạn ứng tuyển: <span className="hidden lg:inline"><br/></span>{formatDeadlineDate(job.expiresAt)}</span>
                    </div>
                  </div>

                  <div className="w-full sm:w-auto shrink-0 mt-1 sm:mt-0">
                    <Link href={`/tuyen-dung/${job.slug}`} className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-lg border border-slate-200 text-[#002A64] font-semibold text-[14px] hover:bg-slate-50 transition-colors group">
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
          <div className="flex justify-center mt-[calc(var(--section-padding)-var(--inner-space))]">
            <button
              onClick={() => setDisplayCount(prev => prev + 10)}
              className="cursor-pointer px-6 py-2.5 rounded-lg border border-slate-200 bg-white text-zinc-600 font-medium text-[14px] hover:bg-slate-50 transition-colors flex items-center gap-2"
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
