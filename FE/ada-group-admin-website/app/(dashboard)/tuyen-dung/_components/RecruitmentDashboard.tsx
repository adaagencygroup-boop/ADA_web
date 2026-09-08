"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, Download } from "lucide-react";
import type { DateRange } from "react-day-picker";
import DateRangeButton from "@/app/(dashboard)/tuyen-dung/_components/DateRangeButton";
import StatsGrid from "@/app/(dashboard)/tuyen-dung/_components/StatsGrid";
import JobsListCard from "@/app/(dashboard)/tuyen-dung/_components/JobsListCard";
import { useExportRecruitmentsExcel } from "@/src/hooks/useRecruitments";
import { endOfDayISO, startOfDayISO } from "@/src/lib/date-range";

const DEFAULT_RANGE: DateRange = {
  from: undefined,
  to: undefined,
};

export default function RecruitmentDashboard() {
  const [dateRange, setDateRange] = useState<DateRange>(DEFAULT_RANGE);
  const exportMutation = useExportRecruitmentsExcel();

  const fromDate = dateRange.from ? startOfDayISO(dateRange.from) : undefined;
  const toDate = dateRange.to
    ? endOfDayISO(dateRange.to)
    : dateRange.from
      ? endOfDayISO(dateRange.from)
      : undefined;

  function handleExport() {
    exportMutation.mutate({ fromDate, toDate });
  }

  return (
    <div className="flex flex-1 flex-col gap-7.5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex flex-col gap-2">
          <nav className="flex items-center gap-2 text-sm text-[#434750]">
            <Link href="/" className="hover:text-[#1C1B1B]">
              Dashboard
            </Link>
            <ChevronRight className="size-3" />
            <span className="font-medium text-[#1C1B1B]">Tuyển dụng</span>
          </nav>
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-semibold text-[#1C1B1B]">
              Dashboard tuyển dụng
            </h1>
            <p className="text-sm text-[#434750]">
              Tổng quan hoạt động tuyển dụng
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <DateRangeButton value={dateRange} onChange={setDateRange} />
          <button
            type="button"
            onClick={handleExport}
            disabled={exportMutation.isPending}
            className="flex h-9.5 shrink-0 items-center gap-2 rounded-lg border border-[#C4C6D2] bg-white px-4 text-sm font-medium text-[#1C1B1B] shadow-xs hover:bg-[#F8FAFC] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Download className="size-4" />
            {exportMutation.isPending ? "Đang xuất..." : "Xuất báo cáo"}
          </button>
        </div>
      </div>

      <StatsGrid />

      <div className="w-full border-t border-[#C4C6D2]" />

      <JobsListCard fromDate={fromDate} toDate={toDate} />
    </div>
  );
}
