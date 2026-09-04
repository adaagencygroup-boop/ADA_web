"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import type { DateRange } from "react-day-picker";
import DateRangeButton from "@/app/(dashboard)/tuyen-dung/_components/DateRangeButton";
import StatsGrid from "@/app/(dashboard)/tuyen-dung/_components/StatsGrid";
import JobsListCard from "@/app/(dashboard)/tuyen-dung/_components/JobsListCard";

const DEFAULT_RANGE: DateRange = {
  from: new Date(2025, 3, 18),
  to: new Date(2025, 4, 18),
};

export default function RecruitmentDashboard() {
  const [dateRange, setDateRange] = useState<DateRange>(DEFAULT_RANGE);

  return (
    <div className="flex flex-1 flex-col gap-7.5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-4xl font-semibold text-[#1C1B1B]">
            Dashboard tuyển dụng
          </h1>
          <p className="text-sm text-[#434750]">
            Tổng quan hoạt động tuyển dụng
          </p>
        </div>

        <div className="flex items-center gap-4">
          <DateRangeButton value={dateRange} onChange={setDateRange} />
          <button
            type="button"
            className="flex h-9.5 shrink-0 items-center gap-2 rounded-lg border border-[#C4C6D2] bg-white px-4 text-sm font-medium text-[#1C1B1B] shadow-xs hover:bg-[#F8FAFC]"
          >
            <Download className="size-4" />
            Xuất báo cáo
          </button>
        </div>
      </div>

      <StatsGrid />

      <div className="w-full border-t border-[#C4C6D2]" />

      <JobsListCard />
    </div>
  );
}
