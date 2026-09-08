"use client";

import { useState } from "react";
import { Check, Download, RefreshCw, Search, X } from "lucide-react";
import type { DateRange } from "react-day-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { useDebouncedValue } from "@/src/hooks/useDebouncedValue";
import {
  useBackups,
  useDownloadBackupFile,
  useExportBackupsExcel,
} from "@/src/hooks/useSettings";
import type { BackupStatus } from "@/src/lib/api/settings";
import DateRangeFilter from "@/src/components/shared/DateRangeFilter";

const STATUS_OPTIONS: { value: "all" | BackupStatus; label: string }[] = [
  { value: "all", label: "Tất cả trạng thái" },
  { value: "success", label: "Thành công" },
  { value: "failed", label: "Thất bại" },
  { value: "running", label: "Đang chạy" },
  { value: "pending", label: "Đang chờ" },
];

const PAGE_SIZE_OPTIONS = ["10", "20", "50"];

function formatDateParts(iso: string | null) {
  if (!iso) return { date: "—", time: "" };
  const date = new Date(iso);
  return {
    date: date.toLocaleDateString("vi-VN"),
    time: date.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
  };
}

function formatSize(bytes: number | null) {
  if (bytes == null) return "—";
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function startOfDayISO(date: Date) {
  return new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0)
  ).toISOString();
}

function endOfDayISO(date: Date) {
  return new Date(
    Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      23,
      59,
      59,
      999
    )
  ).toISOString();
}

export default function BackupHistoryTable() {
  const [searchInput, setSearchInput] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | BackupStatus>(
    "all"
  );
  const [dateRange, setDateRange] = useState<DateRange | null>(null);
  const [pageSize, setPageSize] = useState("10");
  const [page, setPage] = useState(1);

  const search = useDebouncedValue(searchInput, 400);

  const [prevSearch, setPrevSearch] = useState(search);
  if (search !== prevSearch) {
    setPrevSearch(search);
    setPage(1);
  }

  const { data, isLoading, isError, error, refetch } = useBackups({
    page,
    size: Number(pageSize),
    status: statusFilter === "all" ? undefined : statusFilter,
    search: search || undefined,
    fromDate: dateRange?.from ? startOfDayISO(dateRange.from) : undefined,
    toDate: dateRange?.to
      ? endOfDayISO(dateRange.to)
      : dateRange?.from
        ? endOfDayISO(dateRange.from)
        : undefined,
  });
  const exportMutation = useExportBackupsExcel();
  const downloadMutation = useDownloadBackupFile();

  const items = data?.items ?? [];
  const pagination = data?.pagination;
  const totalPages = pagination?.totalPages ?? 1;
  const currentPage = pagination?.page ?? 1;

  function handleRefresh() {
    setSearchInput("");
    setStatusFilter("all");
    setDateRange(null);
    setPage(1);
    refetch();
  }

  return (
    <>
      <div className="flex flex-wrap items-center gap-4 rounded-xl border border-[#E5E7EB] bg-white p-4">
        <div className="relative min-w-50 flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-5 -translate-y-1/2 text-[#9CA3AF]" />
          <input
            type="text"
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
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
          onValueChange={(next) => {
            if (!next) return;
            setStatusFilter(next as "all" | BackupStatus);
            setPage(1);
          }}
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
          onClick={() => exportMutation.mutate({})}
          disabled={exportMutation.isPending}
          className="flex shrink-0 items-center gap-2 rounded-lg border border-[#D1D5DB] px-4 py-2 text-sm font-medium text-[#374151] hover:bg-[#F8FAFC] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Download className="size-4" />
          {exportMutation.isPending ? "Đang xuất..." : "Xuất Excel"}
        </button>

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
            {isLoading && (
              <tr>
                <td colSpan={7} className="px-6 py-10 text-center text-sm text-[#6B7280]">
                  Đang tải...
                </td>
              </tr>
            )}
            {isError && (
              <tr>
                <td colSpan={7} className="px-6 py-10 text-center text-sm text-red-600">
                  {error?.message ?? "Đã có lỗi xảy ra khi tải lịch sử sao lưu."}
                </td>
              </tr>
            )}
            {!isLoading && !isError &&
              items.map((record, index) => {
                const started = formatDateParts(record.startedAt);
                const finished = formatDateParts(record.finishedAt);
                return (
                  <tr key={record.id} className="border-t border-[#E5E7EB]">
                    <td className="px-6 py-5 text-center text-sm text-[#4B5563]">
                      {(currentPage - 1) * Number(pageSize) + index + 1}
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-xs text-[#6B7280]">
                        (ID: {record.id})
                      </span>
                    </td>
                    <td className="px-6 py-5 text-sm font-medium text-[#111827]">
                      {formatSize(record.fileSizeBytes)}
                    </td>
                    <td className="px-6 py-5 text-sm text-[#4B5563]">
                      {started.date}
                      <br />
                      {started.time}
                    </td>
                    <td className="px-6 py-5 text-sm text-[#4B5563]">
                      {finished.date}
                      <br />
                      {finished.time}
                    </td>
                    <td className="px-6 py-5">
                      {record.status === "success" ? (
                        <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-[#BBF7D0] bg-[#E1FCEF] px-2.5 py-1 text-xs font-medium text-[#14804A]">
                          <Check className="size-3.5" />
                          Thành công
                        </span>
                      ) : record.status === "failed" ? (
                        <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-[#FECACA] bg-[#FFEDEC] px-2.5 py-1 text-xs font-medium text-[#D1293D]">
                          <X className="size-3.5" />
                          Thất bại
                        </span>
                      ) : (
                        <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-[#FDE68A] bg-[#FEF3C7] px-2.5 py-1 text-xs font-medium text-[#92400E]">
                          {record.status === "running" ? "Đang chạy" : "Đang chờ"}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-5 text-center">
                      {record.status === "success" ? (
                        <button
                          type="button"
                          aria-label="Tải xuống"
                          onClick={() => downloadMutation.mutate(record.id)}
                          disabled={downloadMutation.isPending}
                          className="inline-flex size-8.5 items-center justify-center rounded-lg border border-[#E5E7EB] text-[#6B7280] hover:bg-[#F8FAFC] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <Download className="size-4" />
                        </button>
                      ) : (
                        <span className="text-[#9CA3AF]">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            {!isLoading && !isError && items.length === 0 && (
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

        <div className="flex flex-wrap items-center gap-1.5">
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
