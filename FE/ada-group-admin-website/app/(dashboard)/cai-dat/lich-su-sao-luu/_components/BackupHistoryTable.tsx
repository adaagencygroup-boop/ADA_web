"use client";

import { useMemo, useState } from "react";
import { Check, Download, RefreshCw, Search, X } from "lucide-react";
import type { DateRange } from "react-day-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import DateRangeFilter from "@/app/(dashboard)/cai-dat/lich-su-sao-luu/_components/DateRangeFilter";

type BackupStatus = "success" | "failed";

type BackupRecord = {
  id: string;
  backupId: string;
  sizeMb: number | null;
  startedAt: string;
  finishedAt: string;
  status: BackupStatus;
};

const RECORDS: BackupRecord[] = [
  {
    id: "1",
    backupId: "3f2a1b7e-9c11-4a6b-b7d2-8c9e3d1a2f10",
    sizeMb: 125.6,
    startedAt: "20/06/2025 14:45:00",
    finishedAt: "20/06/2025 14:45:35",
    status: "success",
  },
  {
    id: "2",
    backupId: "3f2a1b7e-9c11-4a6b-b7d2-8c9e3d1a2f10",
    sizeMb: 124.8,
    startedAt: "19/06/2025 14:45:00",
    finishedAt: "19/06/2025 14:45:28",
    status: "success",
  },
  {
    id: "3",
    backupId: "3f2a1b7e-9c11-4a6b-b7d2-8c9e3d1a2f10",
    sizeMb: 123.9,
    startedAt: "18/06/2025 14:45:00",
    finishedAt: "18/06/2025 14:45:22",
    status: "success",
  },
  {
    id: "4",
    backupId: "3f2a1b7e-9c11-4a6b-b7d2-8c9e3d1a2f10",
    sizeMb: null,
    startedAt: "17/06/2025 14:45:00",
    finishedAt: "17/06/2025 14:45:05",
    status: "failed",
  },
  {
    id: "5",
    backupId: "a9c4d8b2-0f21-4e7a-b2c4-1d2e3f4a5b6c",
    sizeMb: 512.3,
    startedAt: "15/06/2025 02:00:00",
    finishedAt: "15/06/2025 02:00:45",
    status: "success",
  },
  {
    id: "6",
    backupId: "3f2a1b7e-9c11-4a6b-b7d2-8c9e3d1a2f10",
    sizeMb: null,
    startedAt: "14/06/2025 14:45:00",
    finishedAt: "14/06/2025 14:45:07",
    status: "failed",
  },
  {
    id: "7",
    backupId: "3f2a1b7e-9c11-4a6b-b7d2-8c9e3d1a2f10",
    sizeMb: 121.9,
    startedAt: "13/06/2025 14:45:00",
    finishedAt: "13/06/2025 14:45:31",
    status: "success",
  },
];

const STATUS_OPTIONS: { value: "all" | BackupStatus; label: string }[] = [
  { value: "all", label: "Tất cả trạng thái" },
  { value: "success", label: "Thành công" },
  { value: "failed", label: "Thất bại" },
];

const PAGE_SIZE_OPTIONS = ["10", "20", "50"];

function parseRecordDate(value: string) {
  const [datePart, timePart] = value.split(" ");
  const [day, month, year] = datePart.split("/").map(Number);
  const [hour, minute, second] = timePart.split(":").map(Number);
  return new Date(year, month - 1, day, hour, minute, second);
}

export default function BackupHistoryTable() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | BackupStatus>(
    "all"
  );
  const [dateRange, setDateRange] = useState<DateRange | null>(null);
  const [pageSize, setPageSize] = useState("10");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return RECORDS.filter((record) => {
      const matchesSearch = record.backupId
        .toLowerCase()
        .includes(search.trim().toLowerCase());
      const matchesStatus =
        statusFilter === "all" || record.status === statusFilter;

      let matchesDate = true;
      if (dateRange?.from) {
        const recordDate = parseRecordDate(record.startedAt);

        const from = new Date(dateRange.from);
        from.setHours(0, 0, 0, 0);

        const to = new Date(dateRange.to ?? dateRange.from);
        to.setHours(23, 59, 59, 999);

        matchesDate = recordDate >= from && recordDate <= to;
      }

      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [search, statusFilter, dateRange]);

  const totalPages = Math.max(
    1,
    Math.ceil(filtered.length / Number(pageSize))
  );
  const currentPage = Math.min(page, totalPages);
  const paged = filtered.slice(
    (currentPage - 1) * Number(pageSize),
    currentPage * Number(pageSize)
  );

  function handleRefresh() {
    setSearch("");
    setStatusFilter("all");
    setDateRange(null);
    setPage(1);
  }

  return (
    <>
      <div className="flex flex-wrap items-center gap-4 rounded-xl border border-[#E5E7EB] bg-white p-4">
        <div className="relative min-w-50 flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-5 -translate-y-1/2 text-[#9CA3AF]" />
          <input
            type="text"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setPage(1);
            }}
            placeholder="Tìm theo tên bản sao lưu..."
            className="h-9.5 w-full rounded-lg border border-[#D1D5DB] pr-4 pl-10 text-sm text-[#111827] outline-none placeholder:text-[#6B7280] focus-visible:border-[#1A56DB]"
          />
        </div>

        <DateRangeFilter
          value={dateRange}
          onChange={(next) => {
            setDateRange(next);
            setPage(1);
          }}
        />

        <Select
          value={statusFilter}
          onValueChange={(next) =>
            next && (setStatusFilter(next as "all" | BackupStatus), setPage(1))
          }
        >
          <SelectTrigger className="w-48 rounded-lg border-[#D1D5DB] text-sm text-[#1F2937] data-[size=default]:h-9.5">
            <SelectValue>
              {(value: string) =>
                STATUS_OPTIONS.find((option) => option.value === value)
                  ?.label
              }
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {STATUS_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <button
          type="button"
          onClick={handleRefresh}
          className="flex shrink-0 items-center gap-2 rounded-lg border border-[#D1D5DB] px-4 py-2 text-sm font-medium text-[#1A56DB] hover:bg-[#F8FAFC]"
        >
          <RefreshCw className="size-4" />
          Làm mới
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-[#E5E7EB]">
        <table className="w-full min-w-225 border-collapse">
          <thead>
            <tr className="border-b border-[#E5E7EB] bg-[#F9FAFB] text-left">
              <th className="px-6 py-4 text-center text-sm font-bold text-[#374151]">
                STT
              </th>
              <th className="px-6 py-4 text-sm font-bold text-[#374151]">
                Tên bản sao lưu
              </th>
              <th className="px-6 py-4 text-sm font-bold text-[#374151]">
                Dung lượng
              </th>
              <th className="px-6 py-4 text-sm font-bold text-[#374151]">
                Thời gian bắt đầu
              </th>
              <th className="px-6 py-4 text-sm font-bold text-[#374151]">
                Thời gian hoàn thành
              </th>
              <th className="px-6 py-4 text-sm font-bold text-[#374151]">
                Trạng thái
              </th>
              <th className="px-6 py-4 text-center text-sm font-bold text-[#374151]">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody>
            {paged.map((record, index) => (
              <tr key={record.id} className="border-t border-[#E5E7EB]">
                <td className="px-6 py-5 text-center text-sm text-[#4B5563]">
                  {(currentPage - 1) * Number(pageSize) + index + 1}
                </td>
                <td className="px-6 py-5">
                  <span className="text-xs text-[#6B7280]">
                    (ID: {record.backupId})
                  </span>
                </td>
                <td className="px-6 py-5 text-sm font-medium text-[#111827]">
                  {record.sizeMb !== null ? `${record.sizeMb} MB` : "—"}
                </td>
                <td className="px-6 py-5 text-sm text-[#4B5563]">
                  {record.startedAt.split(" ")[0]}
                  <br />
                  {record.startedAt.split(" ")[1]}
                </td>
                <td className="px-6 py-5 text-sm text-[#4B5563]">
                  {record.finishedAt.split(" ")[0]}
                  <br />
                  {record.finishedAt.split(" ")[1]}
                </td>
                <td className="px-6 py-5">
                  {record.status === "success" ? (
                    <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-[#BBF7D0] bg-[#E1FCEF] px-2.5 py-1 text-xs font-medium text-[#14804A]">
                      <Check className="size-3.5" />
                      Thành công
                    </span>
                  ) : (
                    <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-[#FECACA] bg-[#FFEDEC] px-2.5 py-1 text-xs font-medium text-[#D1293D]">
                      <X className="size-3.5" />
                      Thất bại
                    </span>
                  )}
                </td>
                <td className="px-6 py-5 text-center">
                  {record.status === "success" ? (
                    <button
                      type="button"
                      aria-label="Tải xuống"
                      className="inline-flex size-8.5 items-center justify-center rounded-lg border border-[#E5E7EB] text-[#6B7280] hover:bg-[#F8FAFC]"
                    >
                      <Download className="size-4" />
                    </button>
                  ) : (
                    <span className="text-[#9CA3AF]">—</span>
                  )}
                </td>
              </tr>
            ))}
            {paged.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="px-6 py-10 text-center text-sm text-[#6B7280]"
                >
                  Không tìm thấy bản sao lưu nào phù hợp.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm text-[#4B5563]">
          Hiển thị
          <Select
            value={pageSize}
            onValueChange={(next) => {
              if (!next) return;
              setPageSize(next);
              setPage(1);
            }}
          >
            <SelectTrigger className="rounded-lg border-[#D1D5DB] text-sm data-[size=default]:h-9">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PAGE_SIZE_OPTIONS.map((size) => (
                <SelectItem key={size} value={size}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          kết quả trên mỗi trang
        </div>

        <div className="flex items-center gap-1.5">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => setPage(num)}
              className={`flex size-8.5 items-center justify-center rounded-lg text-sm font-medium ${
                num === currentPage
                  ? "bg-[#1A56DB] text-white"
                  : "text-[#374151] hover:bg-[#F8FAFC]"
              }`}
            >
              {num}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
