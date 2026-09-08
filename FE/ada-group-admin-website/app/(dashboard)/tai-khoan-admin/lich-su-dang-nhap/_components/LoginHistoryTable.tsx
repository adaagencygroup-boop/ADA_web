"use client";

import { useState } from "react";
import { Circle, Download, Monitor, Smartphone } from "lucide-react";
import type { DateRange } from "react-day-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import DateRangeFilter from "@/src/components/shared/DateRangeFilter";
import {
  useExportLoginHistoriesExcel,
  useLoginHistories,
} from "@/src/hooks/useAccount";
import type { LoginStatus } from "@/src/lib/api/account";
import { endOfDayISO, startOfDayISO } from "@/src/lib/date-range";

const STATUS_OPTIONS: { value: "all" | LoginStatus; label: string }[] = [
  { value: "all", label: "Tất cả trạng thái" },
  { value: "success", label: "Thành công" },
  { value: "failed", label: "Thất bại" },
];

const PAGE_SIZE_OPTIONS = ["10", "20", "50"];

function getDeviceIcon(userAgent: string | null) {
  if (userAgent && /mobile|android|iphone|ipad/i.test(userAgent)) {
    return Smartphone;
  }
  return Monitor;
}

function formatDateTime(iso: string) {
  const date = new Date(iso);
  return `${date.toLocaleDateString("vi-VN")}, ${date.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })}`;
}

export default function LoginHistoryTable() {
  const [statusFilter, setStatusFilter] = useState<"all" | LoginStatus>(
    "all"
  );
  const [dateRange, setDateRange] = useState<DateRange | null>(null);
  const [pageSize, setPageSize] = useState("10");
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error } = useLoginHistories({
    page,
    size: Number(pageSize),
    status: statusFilter === "all" ? undefined : statusFilter,
    fromDate: dateRange?.from ? startOfDayISO(dateRange.from) : undefined,
    toDate: dateRange?.to
      ? endOfDayISO(dateRange.to)
      : dateRange?.from
        ? endOfDayISO(dateRange.from)
        : undefined,
  });
  const exportMutation = useExportLoginHistoriesExcel();

  const items = data?.items ?? [];
  const pagination = data?.pagination;
  const totalPages = pagination?.totalPages ?? 1;
  const currentPage = pagination?.page ?? 1;
  const totalElements = pagination?.totalElements ?? 0;

  return (
    <div className="rounded-xl border border-[#E5E7EB] bg-white shadow-sm">
      <div className="flex flex-col gap-1 border-b border-[#E5E7EB] px-6 py-5">
        <h2 className="text-xl font-semibold text-[#111827]">
          Lịch sử đăng nhập
        </h2>
        <p className="text-sm text-[#6B7280]">
          Xem lại các lần đăng nhập gần đây trên tài khoản của bạn.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-4 border-b border-[#E5E7EB] px-6 py-4">
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
            setStatusFilter(next as "all" | LoginStatus);
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
          onClick={() =>
            exportMutation.mutate({
              status: statusFilter === "all" ? undefined : statusFilter,
              fromDate: dateRange?.from
                ? startOfDayISO(dateRange.from)
                : undefined,
              toDate: dateRange?.to
                ? endOfDayISO(dateRange.to)
                : dateRange?.from
                  ? endOfDayISO(dateRange.from)
                  : undefined,
            })
          }
          disabled={exportMutation.isPending}
          className="ml-auto flex shrink-0 items-center gap-2 rounded-lg border border-[#D1D5DB] px-4 py-2 text-sm font-medium text-[#374151] hover:bg-[#F8FAFC] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Download className="size-4" />
          {exportMutation.isPending ? "Đang xuất..." : "Xuất Excel"}
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-200 border-collapse">
          <thead>
            <tr className="border-b border-[#E5E7EB] bg-[#F9FAFB] text-left">
              <th className="px-6 py-3 text-xs font-semibold tracking-wide text-[#6B7280] uppercase">
                Thiết bị
              </th>
              <th className="px-6 py-3 text-xs font-semibold tracking-wide text-[#6B7280] uppercase">
                Vị trí
              </th>
              <th className="px-6 py-3 text-xs font-semibold tracking-wide text-[#6B7280] uppercase">
                Địa chỉ IP
              </th>
              <th className="px-6 py-3 text-xs font-semibold tracking-wide text-[#6B7280] uppercase">
                Thời gian
              </th>
              <th className="px-6 py-3 text-xs font-semibold tracking-wide text-[#6B7280] uppercase">
                Trạng thái
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
                  {error?.message ?? "Đã có lỗi xảy ra khi tải lịch sử đăng nhập."}
                </td>
              </tr>
            )}
            {!isLoading && !isError &&
              items.map((item) => {
                const DeviceIcon = getDeviceIcon(item.userAgent);
                return (
                  <tr key={item.id} className="border-t border-[#E5E7EB]">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <DeviceIcon className="size-5 shrink-0 text-[#6B7280]" />
                        <div className="flex flex-col">
                          <span className="text-sm font-medium text-[#111827]">
                            {item.deviceName ?? "Không xác định"}
                          </span>
                          {item.isNewIP && (
                            <span className="w-fit rounded bg-[#FEF3C7] px-1.5 py-0.5 text-[10px] font-medium text-[#92400E]">
                              IP mới
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#4B5563]">
                      {[item.geoCity, item.geoCountry].filter(Boolean).join(", ") || "—"}
                    </td>
                    <td className="px-6 py-4 text-sm text-[#4B5563]">
                      {item.IPAddress ?? "—"}
                    </td>
                    <td className="px-6 py-4 text-sm text-[#4B5563]">
                      {formatDateTime(item.createdAt)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-sm font-medium">
                        {item.status === "success" ? (
                          <>
                            <Circle className="size-2 fill-[#15803D] text-[#15803D]" />
                            <span className="text-[#15803D]">Thành công</span>
                          </>
                        ) : (
                          <>
                            <Circle className="size-2 fill-[#DC2626] text-[#DC2626]" />
                            <span className="text-[#DC2626]">Thất bại</span>
                          </>
                        )}
                      </div>
                      {item.status === "failed" && item.failureReason && (
                        <span className="text-xs text-[#9CA3AF]">
                          {item.failureReason}
                        </span>
                      )}
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
                  Không tìm thấy lịch sử đăng nhập nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#E5E7EB] px-6 py-4">
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
          kết quả · Tổng {totalElements} bản ghi
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
    </div>
  );
}
