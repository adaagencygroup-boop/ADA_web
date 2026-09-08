"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, Search, User } from "lucide-react";
import type { DateRange } from "react-day-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import DateRangeFilter from "@/src/components/shared/DateRangeFilter";
import { useDebouncedValue } from "@/src/hooks/useDebouncedValue";
import { useCandidates } from "@/src/hooks/useCandidates";
import type { Recruitment } from "@/src/lib/api/recruitment";

const PAGE_SIZE = 10;

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("vi-VN");
}

export default function CandidatesTable({
  jobs,
  recruitmentId,
  onRecruitmentIdChange,
  dateRange,
  onDateRangeChange,
  fromDate,
  toDate,
}: {
  jobs: Recruitment[];
  recruitmentId: string;
  onRecruitmentIdChange: (value: string) => void;
  dateRange: DateRange | null;
  onDateRangeChange: (value: DateRange | null) => void;
  fromDate?: string;
  toDate?: string;
}) {
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);

  const search = useDebouncedValue(searchInput, 400);

  const [prevFilters, setPrevFilters] = useState({
    search,
    recruitmentId,
    fromDate,
    toDate,
  });
  if (
    search !== prevFilters.search ||
    recruitmentId !== prevFilters.recruitmentId ||
    fromDate !== prevFilters.fromDate ||
    toDate !== prevFilters.toDate
  ) {
    setPrevFilters({ search, recruitmentId, fromDate, toDate });
    setPage(1);
  }

  const { data, isLoading, isError, error } = useCandidates({
    page,
    size: PAGE_SIZE,
    search: search || undefined,
    recruitmentId: recruitmentId === "all" ? undefined : recruitmentId,
    fromDate,
    toDate,
  });

  const items = data?.items ?? [];
  const pagination = data?.pagination;
  const totalPages = pagination?.totalPages ?? 1;
  const currentPage = pagination?.page ?? 1;
  const totalElements = pagination?.totalElements ?? 0;

  return (
    <div className="rounded-xl border border-[#C4C6D2] bg-white shadow-xs">
      <div className="flex flex-wrap items-center gap-4 border-b border-[#C4C6D2] bg-[#FCF9F8] p-6">
        <div className="relative min-w-50 flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-[#94A3B8]" />
          <input
            type="text"
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            placeholder="Tìm kiếm ứng viên..."
            className="h-11 w-full rounded-lg border border-[#C4C6D2] bg-white pr-4 pl-11 text-sm text-[#1C1B1B] outline-none placeholder:text-[#94A3B8] focus-visible:border-[#316EE9]"
          />
        </div>

        <Select
          value={recruitmentId}
          onValueChange={(next) => {
            if (!next) return;
            onRecruitmentIdChange(next);
          }}
        >
          <SelectTrigger className="h-11 w-56 rounded-lg border-[#C4C6D2] bg-white text-sm text-[#1C1B1B] data-[size=default]:h-11">
            <SelectValue placeholder="Tất cả vị trí">
              {(value: string) =>
                value === "all"
                  ? "Tất cả vị trí"
                  : (jobs.find((job) => job.id === value)?.jobTitle ?? "")
              }
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả vị trí</SelectItem>
            {jobs.map((job) => (
              <SelectItem key={job.id} value={job.id}>
                {job.jobTitle}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <DateRangeFilter value={dateRange} onChange={onDateRangeChange} />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-200 border-collapse">
          <thead>
            <tr className="border-b border-[#C4C6D2] text-left">
              <th className="px-6 py-3 text-sm font-semibold text-[#1C1B1B]">Ứng viên</th>
              <th className="px-3 py-3 text-sm font-semibold text-[#1C1B1B]">Vị trí ứng tuyển</th>
              <th className="px-3 py-3 text-sm font-semibold text-[#1C1B1B]">Ngày ứng tuyển</th>
              <th className="px-3 py-3 text-sm font-semibold text-[#1C1B1B]">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (<tr><td colSpan={4} className="px-6 py-10 text-center text-sm text-[#6B7280]">Đang tải...</td></tr>)}
            {isError && (<tr><td colSpan={4} className="px-6 py-10 text-center text-sm text-red-600">{error?.message ?? "Đã có lỗi xảy ra khi tải danh sách ứng viên."}</td></tr>)}
            {!isLoading && !isError && items.map((candidate) => (
              <tr key={candidate.id} className="border-b border-[#E5E2E1] last:border-b-0">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#D8E2FF]">
                      <User className="size-5 text-[#001E4B]" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-[#1C1B1B]">{candidate.fullname}</span>
                      <span className="text-sm text-[#6B7280]">{candidate.email ?? "—"}</span>
                    </div>
                  </div>
                </td>
                <td className="px-3 py-4 text-sm text-[#434750]">{candidate.recruitmentTitle}</td>
                <td className="px-3 py-4 text-sm text-[#434750]">{formatDate(candidate.appliedAt)}</td>
                <td className="px-3 py-4">
                  <Link href={`/tuyen-dung/ung-vien/${candidate.id}`} className="inline-flex items-center gap-1.5 rounded-lg border border-[#BFDBFE] px-3 py-1.5 text-sm font-medium text-[#1D4ED8] hover:bg-[#EFF6FF]">
                    <Eye className="size-3.5" />
                    Xem
                  </Link>
                </td>
              </tr>
            ))}
            {!isLoading && !isError && items.length === 0 && (<tr><td colSpan={4} className="px-6 py-10 text-center text-sm text-[#6B7280]">Không có ứng viên nào.</td></tr>)}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4">
        <span className="text-sm text-[#434750]">Hiển thị {totalElements === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1} - {Math.min(currentPage * PAGE_SIZE, totalElements)} của {totalElements} ứng viên</span>
        <div className="flex flex-wrap items-center gap-1.5">
          <button type="button" aria-label="Trang trước" disabled={currentPage === 1} onClick={() => setPage((p) => Math.max(1, p - 1))} className="flex size-8.5 items-center justify-center rounded-lg border border-[#C4C6D2] text-[#434750] hover:bg-[#F8FAFC] disabled:cursor-not-allowed disabled:opacity-50">‹</button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button key={num} type="button" onClick={() => setPage(num)} className={`flex size-8.5 items-center justify-center rounded-lg text-sm font-medium ${num === currentPage ? "bg-[#1A56DB] text-white" : "border border-[#C4C6D2] text-[#1C1B1B] hover:bg-[#F8FAFC]"}`}>{num}</button>
          ))}
          <button type="button" aria-label="Trang sau" disabled={currentPage === totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))} className="flex size-8.5 items-center justify-center rounded-lg border border-[#C4C6D2] text-[#434750] hover:bg-[#F8FAFC] disabled:cursor-not-allowed disabled:opacity-50">›</button>
        </div>
      </div>
    </div>
  );
}
