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
import type { CandidateStatus } from "@/src/lib/api/candidate";
import type { Recruitment } from "@/src/lib/api/recruitment";

const PAGE_SIZE = 10;

const STATUS_STYLES: Record<CandidateStatus, { label: string; className: string }> = {
  pending: {
    label: "Chờ duyệt",
    className: "bg-[#FEF3C7] text-[#D97706]",
  },
  passed: {
    label: "Đạt vòng hồ sơ",
    className: "bg-[#E1FCEF] text-[#15803D]",
  },
  interview_passed: {
    label: "Trúng tuyển",
    className: "bg-[#DBEAFE] text-[#1E40AF]",
  },
  failed: {
    label: "Từ chối",
    className: "bg-[#FEE2E2] text-[#DC2626]",
  },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("vi-VN");
}

export default function CandidatesTable({
  jobs,
  recruitmentId,
  onRecruitmentIdChange,
  status,
  onStatusChange,
  dateRange,
  onDateRangeChange,
  fromDate,
  toDate,
}: {
  jobs: Recruitment[];
  recruitmentId: string;
  onRecruitmentIdChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string) => void;
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
    status,
    fromDate,
    toDate,
  });
  if (
    search !== prevFilters.search ||
    recruitmentId !== prevFilters.recruitmentId ||
    status !== prevFilters.status ||
    fromDate !== prevFilters.fromDate ||
    toDate !== prevFilters.toDate
  ) {
    setPrevFilters({ search, recruitmentId, status, fromDate, toDate });
    setPage(1);
  }

  const { data, isLoading, isError, error } = useCandidates({
    page,
    size: PAGE_SIZE,
    search: search || undefined,
    recruitmentId: recruitmentId === "all" ? undefined : recruitmentId,
    status: status === "all" ? undefined : (status as CandidateStatus),
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

        <Select
          value={status}
          onValueChange={(next) => {
            if (!next) return;
            onStatusChange(next);
          }}
        >
          <SelectTrigger className="h-11 w-52 rounded-lg border-[#C4C6D2] bg-white text-sm text-[#1C1B1B] data-[size=default]:h-11">
            <SelectValue placeholder="Tất cả trạng thái">
              {(value: string) => {
                if (value === "all") return "Tất cả trạng thái";
                return STATUS_STYLES[value as CandidateStatus]?.label ?? value;
              }}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả trạng thái</SelectItem>
            <SelectItem value="pending">Chờ duyệt</SelectItem>
            <SelectItem value="passed">Đạt vòng hồ sơ</SelectItem>
            <SelectItem value="interview_passed">Trúng tuyển (Đạt phỏng vấn)</SelectItem>
            <SelectItem value="failed">Từ chối</SelectItem>
          </SelectContent>
        </Select>

        <DateRangeFilter value={dateRange} onChange={onDateRangeChange} />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-200 border-collapse">
          <thead>
            <tr className="border-b border-[#C4C6D2] text-left">
              <th className="w-14 px-6 py-3 text-center text-sm font-semibold text-[#1C1B1B]">STT</th>
              <th className="px-3 py-3 text-sm font-semibold text-[#1C1B1B]">Ứng viên</th>
              <th className="px-3 py-3 text-sm font-semibold text-[#1C1B1B]">Vị trí ứng tuyển</th>
              <th className="px-3 py-3 text-sm font-semibold text-[#1C1B1B]">Trạng thái</th>
              <th className="px-3 py-3 text-sm font-semibold text-[#1C1B1B]">Ngày ứng tuyển</th>
              <th className="px-3 py-3 text-sm font-semibold text-[#1C1B1B]">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={6} className="px-6 py-10 text-center text-sm text-[#6B7280]">
                  Đang tải...
                </td>
              </tr>
            )}
            {isError && (
              <tr>
                <td colSpan={6} className="px-6 py-10 text-center text-sm text-red-600">
                  {error?.message ?? "Đã có lỗi xảy ra khi tải danh sách ứng viên."}
                </td>
              </tr>
            )}
            {!isLoading &&
              !isError &&
              items.map((candidate, index) => {
                const statusStyle = STATUS_STYLES[candidate.status ?? "pending"];
                const stt = (currentPage - 1) * PAGE_SIZE + index + 1;
                return (
                  <tr key={candidate.id} className="border-b border-[#E5E2E1] last:border-b-0">
                    <td className="px-6 py-4 text-center text-sm font-medium text-[#434750]">
                      {stt}
                    </td>
                    <td className="px-3 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#D8E2FF]">
                          <User className="size-5 text-[#001E4B]" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-[#1C1B1B]">
                            {candidate.fullname}
                          </span>
                          <span className="text-sm text-[#6B7280]">
                            {candidate.email ?? "—"}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-4 text-sm text-[#434750]">
                      {candidate.recruitmentTitle}
                    </td>
                    <td className="px-3 py-4">
                      <span
                        className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-1 text-xs font-medium ${statusStyle.className}`}
                      >
                        {statusStyle.label}
                      </span>
                    </td>
                    <td className="px-3 py-4 text-sm text-[#434750]">
                      {formatDate(candidate.appliedAt)}
                    </td>
                    <td className="px-3 py-4">
                      {(() => {
                        const activeId =
                          recruitmentId !== "all" ? recruitmentId : candidate.recruitmentId;
                        const queryParam = activeId ? `?recruitmentId=${activeId}` : "";
                        return (
                          <Link
                            href={`/tuyen-dung/ung-vien/${candidate.id}${queryParam}`}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-[#BFDBFE] px-3 py-1.5 text-sm font-medium text-[#1D4ED8] hover:bg-[#EFF6FF]"
                          >
                            <Eye className="size-3.5" />
                            Xem
                          </Link>
                        );
                      })()}
                    </td>
                  </tr>
                );
              })}
            {!isLoading && !isError && items.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-10 text-center text-sm text-[#6B7280]">
                  Không có ứng viên nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4">
        <span className="text-sm text-[#434750]">
          Hiển thị {totalElements === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1} -{" "}
          {Math.min(currentPage * PAGE_SIZE, totalElements)} của {totalElements} ứng viên
        </span>
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            aria-label="Trang trước"
            disabled={currentPage === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="flex size-8.5 items-center justify-center rounded-lg border border-[#C4C6D2] text-[#434750] hover:bg-[#F8FAFC] disabled:cursor-not-allowed disabled:opacity-50"
          >
            ‹
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => setPage(num)}
              className={`flex size-8.5 items-center justify-center rounded-lg text-sm font-medium ${
                num === currentPage
                  ? "bg-[#1A56DB] text-white"
                  : "border border-[#C4C6D2] text-[#1C1B1B] hover:bg-[#F8FAFC]"
              }`}
            >
              {num}
            </button>
          ))}
          <button
            type="button"
            aria-label="Trang sau"
            disabled={currentPage === totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="flex size-8.5 items-center justify-center rounded-lg border border-[#C4C6D2] text-[#434750] hover:bg-[#F8FAFC] disabled:cursor-not-allowed disabled:opacity-50"
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
}
