"use client";

import { useState } from "react";
import Link from "next/link";
import { Download, Eye, RefreshCw, Search } from "lucide-react";
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
import {
  useExportNotificationsExcel,
  useNotifications,
} from "@/src/hooks/useNotifications";
import type { NotificationType } from "@/src/lib/api/notification";
import { endOfDayISO, startOfDayISO } from "@/src/lib/date-range";
import { NOTIFICATION_TYPE_META } from "@/src/lib/notification-meta";

const TYPE_OPTIONS: { value: "all" | NotificationType; label: string }[] = [
  { value: "all", label: "Tất cả loại" },
  { value: "system", label: "Hệ thống" },
  { value: "contacts", label: "Liên hệ" },
  { value: "recruitments", label: "Tuyển dụng" },
  { value: "news", label: "Tin tức" },
];

const PAGE_SIZE = 10;

function formatDateTime(iso: string) {
  const date = new Date(iso);
  return `${date.toLocaleDateString("vi-VN")} ${date.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })}`;
}

export default function NotificationsTable() {
  const [searchInput, setSearchInput] = useState("");
  const [typeFilter, setTypeFilter] = useState<"all" | NotificationType>(
    "all"
  );
  const [dateRange, setDateRange] = useState<DateRange | null>(null);
  const [page, setPage] = useState(1);

  const search = useDebouncedValue(searchInput, 400);
  const fromDate = dateRange?.from ? startOfDayISO(dateRange.from) : undefined;
  const toDate = dateRange?.to
    ? endOfDayISO(dateRange.to)
    : dateRange?.from
      ? endOfDayISO(dateRange.from)
      : undefined;

  const [prevFilters, setPrevFilters] = useState({
    search,
    typeFilter,
    fromDate,
    toDate,
  });
  if (
    search !== prevFilters.search ||
    typeFilter !== prevFilters.typeFilter ||
    fromDate !== prevFilters.fromDate ||
    toDate !== prevFilters.toDate
  ) {
    setPrevFilters({ search, typeFilter, fromDate, toDate });
    setPage(1);
  }

  const { data, isLoading, isError, error, refetch } = useNotifications({
    page,
    size: PAGE_SIZE,
    search: search || undefined,
    type: typeFilter === "all" ? undefined : typeFilter,
    fromDate,
    toDate,
  });
  const exportMutation = useExportNotificationsExcel();

  const items = data?.items ?? [];
  const pagination = data?.pagination;
  const totalPages = pagination?.totalPages ?? 1;
  const currentPage = pagination?.page ?? 1;

  function handleRefresh() {
    setSearchInput("");
    setTypeFilter("all");
    setDateRange(null);
    setPage(1);
    refetch();
  }

  function handleExport() {
    exportMutation.mutate({
      type: typeFilter === "all" ? undefined : typeFilter,
      search: search || undefined,
      fromDate,
      toDate,
    });
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
            placeholder="Tìm kiếm tiêu đề hoặc nội dung..."
            className="h-9.5 w-full rounded-lg border border-[#D1D5DB] pr-4 pl-10 text-sm text-[#111827] outline-none placeholder:text-[#6B7280] focus-visible:border-[#1A56DB]"
          />
        </div>

        <Select
          value={typeFilter}
          onValueChange={(next) => {
            if (!next) return;
            setTypeFilter(next as "all" | NotificationType);
          }}
        >
          <SelectTrigger className="w-48 rounded-lg border-[#D1D5DB] text-sm text-[#1F2937] data-[size=default]:h-9.5">
            <SelectValue>
              {(value: string) =>
                TYPE_OPTIONS.find((option) => option.value === value)?.label
              }
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {TYPE_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <DateRangeFilter value={dateRange} onChange={setDateRange} />

        <button
          type="button"
          onClick={handleExport}
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
              <th className="px-6 py-4 text-sm font-semibold text-[#374151]">
                Tiêu đề
              </th>
              <th className="px-3 py-4 text-sm font-semibold text-[#374151]">
                Nội dung
              </th>
              <th className="px-3 py-4 text-sm font-semibold text-[#374151]">
                Loại
              </th>
              <th className="px-3 py-4 text-sm font-semibold text-[#374151]">
                Thời gian
              </th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-[#374151]">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={5} className="px-6 py-10 text-center text-sm text-[#6B7280]">
                  Đang tải...
                </td>
              </tr>
            )}
            {isError && (
              <tr>
                <td colSpan={5} className="px-6 py-10 text-center text-sm text-red-600">
                  {error?.message ?? "Đã có lỗi xảy ra khi tải thông báo."}
                </td>
              </tr>
            )}
            {!isLoading &&
              !isError &&
              items.map((item) => {
                const meta = NOTIFICATION_TYPE_META[item.type];
                const Icon = meta.icon;
                return (
                  <tr key={item.id} className="border-t border-[#E5E7EB]">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span
                          className="flex size-9 shrink-0 items-center justify-center rounded-lg"
                          style={{ backgroundColor: meta.bg }}
                        >
                          <Icon className="size-4.5" style={{ color: meta.color }} />
                        </span>
                        <span className="text-sm font-semibold text-[#111827]">
                          {item.title}
                        </span>
                      </div>
                    </td>
                    <td className="max-w-80 px-3 py-4 text-sm text-[#4B5563]">
                      <span className="line-clamp-2">{item.content}</span>
                    </td>
                    <td className="px-3 py-4">
                      <span
                        className="inline-flex w-fit items-center rounded-full px-2.5 py-1 text-xs font-medium"
                        style={{ backgroundColor: meta.bg, color: meta.color }}
                      >
                        {meta.label}
                      </span>
                    </td>
                    <td className="px-3 py-4 text-sm text-[#4B5563]">
                      {formatDateTime(item.createdAt)}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Link
                        href={`/cai-dat/thong-bao/${item.id}`}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-[#D1D5DB] px-3 py-1.5 text-sm font-medium text-[#374151] hover:bg-[#F8FAFC]"
                      >
                        <Eye className="size-3.5" />
                        Xem
                      </Link>
                    </td>
                  </tr>
                );
              })}
            {!isLoading && !isError && items.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-10 text-center text-sm text-[#6B7280]"
                >
                  Không có thông báo nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <span className="text-sm text-[#4B5563]">
          Hiển thị {PAGE_SIZE} kết quả trên mỗi trang
        </span>

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
