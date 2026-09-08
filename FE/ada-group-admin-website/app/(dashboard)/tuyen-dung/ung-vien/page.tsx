"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, Download } from "lucide-react";
import type { DateRange } from "react-day-picker";
import { useExportCandidatesExcel } from "@/src/hooks/useCandidates";
import { useRecruitments } from "@/src/hooks/useRecruitments";
import { endOfDayISO, startOfDayISO } from "@/src/lib/date-range";
import CandidatesTable from "@/app/(dashboard)/tuyen-dung/ung-vien/_components/CandidatesTable";

export default function UngVienPage() {
  const [recruitmentId, setRecruitmentId] = useState("all");
  const [dateRange, setDateRange] = useState<DateRange | null>(null);

  const exportMutation = useExportCandidatesExcel();
  const { data: jobsPage } = useRecruitments({ page: 1, size: 100 });
  const jobs = jobsPage?.items ?? [];

  const fromDate = dateRange?.from ? startOfDayISO(dateRange.from) : undefined;
  const toDate = dateRange?.to
    ? endOfDayISO(dateRange.to)
    : dateRange?.from
      ? endOfDayISO(dateRange.from)
      : undefined;

  function handleExport() {
    exportMutation.mutate({
      recruitmentId: recruitmentId === "all" ? undefined : recruitmentId,
      fromDate,
      toDate,
    });
  }

  return (
    <div className="flex flex-1 flex-col gap-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex flex-col gap-2">
          <nav className="flex items-center gap-2 text-sm text-[#434750]">
            <Link href="/" className="hover:text-[#1C1B1B]">
              Trang chủ
            </Link>
            <ChevronRight className="size-3" />
            <Link href="/tuyen-dung" className="hover:text-[#1C1B1B]">
              Tuyển dụng
            </Link>
            <ChevronRight className="size-3" />
            <span className="font-medium text-[#1C1B1B]">Ứng viên</span>
          </nav>
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-semibold text-[#001E4B]">
              Tổng ứng viên
            </h1>
            <p className="text-base text-[#434750]">
              Danh sách ứng viên đã ứng tuyển
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleExport}
          disabled={exportMutation.isPending}
          className="flex h-10.5 shrink-0 items-center gap-2 rounded-lg border border-[#C4C6D2] bg-white px-4 text-sm font-medium text-[#1C1B1B] shadow-xs hover:bg-[#F8FAFC] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Download className="size-4" />
          {exportMutation.isPending ? "Đang xuất..." : "Xuất báo cáo"}
        </button>
      </div>

      <CandidatesTable
        jobs={jobs}
        recruitmentId={recruitmentId}
        onRecruitmentIdChange={setRecruitmentId}
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        fromDate={fromDate}
        toDate={toDate}
      />
    </div>
  );
}
