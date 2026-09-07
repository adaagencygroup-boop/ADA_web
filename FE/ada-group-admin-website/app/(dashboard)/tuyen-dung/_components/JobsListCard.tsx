"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  Pencil,
  Plus,
  Search,
  Trash2,
} from "lucide-react";
import { useDebouncedValue } from "@/src/hooks/useDebouncedValue";
import { useDeleteRecruitment, useRecruitments } from "@/src/hooks/useRecruitments";
import type { EmploymentType, Recruitment, RecruitmentStatus } from "@/src/lib/api/recruitment";
import DeleteRecruitmentDialog from "@/app/(dashboard)/tuyen-dung/_components/DeleteRecruitmentDialog";

type Tab = "all" | RecruitmentStatus;

const TABS: { value: Tab; label: string }[] = [
  { value: "all", label: "Tất cả" },
  { value: "draft", label: "Nháp" },
  { value: "hiring", label: "Đang tuyển" },
  { value: "closed", label: "Đã đóng" },
];

const EMPLOYMENT_TYPE_LABELS: Record<EmploymentType, string> = {
  fulltime: "Toàn thời gian",
  parttime: "Bán thời gian",
  remote: "Từ xa",
  hybrid: "Hybrid",
};

const PAGE_SIZE = 10;

function formatDeadline(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("vi-VN");
}

export default function JobsListCard() {
  const [tab, setTab] = useState<Tab>("all");
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [deleteTarget, setDeleteTarget] = useState<Recruitment | null>(null);

  const search = useDebouncedValue(searchInput, 400);

  const [prevSearch, setPrevSearch] = useState(search);
  if (search !== prevSearch) {
    setPrevSearch(search);
    setPage(1);
  }

  const { data, isLoading, isError, error } = useRecruitments({
    page,
    size: PAGE_SIZE,
    search: search || undefined,
    status: tab === "all" ? undefined : tab,
  });
  const deleteMutation = useDeleteRecruitment();

  const items = data?.items ?? [];
  const pagination = data?.pagination;
  const totalPages = pagination?.totalPages ?? 1;
  const currentPage = pagination?.page ?? 1;
  const totalElements = pagination?.totalElements ?? 0;

  const allPagedSelected =
    items.length > 0 && items.every((job) => selectedRows.has(job.id));

  function handleTabChange(next: Tab) {
    setTab(next);
    setPage(1);
  }

  function toggleRow(id: string) {
    setSelectedRows((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleAllRows() {
    setSelectedRows((prev) => {
      if (allPagedSelected) {
        const next = new Set(prev);
        items.forEach((job) => next.delete(job.id));
        return next;
      }
      const next = new Set(prev);
      items.forEach((job) => next.add(job.id));
      return next;
    });
  }

  function handleConfirmDelete() {
    if (!deleteTarget) return;
    deleteMutation.mutate(deleteTarget.id, {
      onSuccess: () => setDeleteTarget(null),
    });
  }

  return (
    <div className="rounded-xl border border-[#C4C6D2] bg-white shadow-xs">
      <div className="flex flex-col gap-4 border-b border-[#C4C6D2] px-6 py-4">
        <h2 className="text-[22px] font-semibold text-[#1C1B1B]">
          Danh sách tin tuyển dụng
        </h2>

        <div className="-mb-px flex items-center gap-6 overflow-x-auto border-b border-[#C4C6D2]">
          {TABS.map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => handleTabChange(item.value)}
              className={`shrink-0 border-b-2 pb-2 text-sm font-medium whitespace-nowrap ${
                tab === item.value
                  ? "border-[#001E4B] text-[#001E4B]"
                  : "border-transparent text-[#434750] hover:text-[#1C1B1B]"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 px-6 py-4">
        <div className="relative min-w-50 flex-1">
          <input
            type="text"
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            placeholder="Tìm kiếm tin tuyển dụng..."
            className="h-10 w-full rounded-lg border border-[#C4C6D2] pr-4 pl-4 text-sm text-[#1C1B1B] outline-none placeholder:text-[#6B7280] focus-visible:border-[#316EE9]"
          />
          <Search className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-[#434750]" />
        </div>

        <Link
          href="/tuyen-dung/phong-ban"
          className="flex h-9 shrink-0 items-center gap-2 rounded-lg bg-[#316EE9] px-4 text-sm font-medium text-white hover:bg-[#316EE9]/90"
        >
          <Plus className="size-3.5" />
          Quản lý phòng ban
        </Link>

        <Link
          href="/tuyen-dung/tao-moi"
          className="flex h-9 shrink-0 items-center gap-2 rounded-lg bg-[#316EE9] px-4 text-sm font-medium text-white hover:bg-[#316EE9]/90"
        >
          <Plus className="size-3.5" />
          Thêm tin tuyển dụng
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-225 border-collapse">
          <thead>
            <tr className="border-b border-[#C4C6D2] bg-[#FCF9F8] text-left">
              <th className="w-16 px-6 py-3">
                <input
                  type="checkbox"
                  checked={allPagedSelected}
                  onChange={toggleAllRows}
                  className="size-4 rounded border-[#C4C6D2]"
                />
              </th>
              <th className="px-3 py-3 text-sm font-medium text-[#434750]">
                Vị trí tuyển dụng
              </th>
              <th className="px-3 py-3 text-sm font-medium text-[#434750]">
                Phòng ban
              </th>
              <th className="px-3 py-3 text-sm font-medium text-[#434750]">
                Địa điểm
              </th>
              <th className="px-3 py-3 text-sm font-medium text-[#434750]">
                Hình thức
              </th>
              <th className="px-3 py-3 text-center text-sm font-medium text-[#434750]">
                Ứng viên
              </th>
              <th className="px-3 py-3 text-sm font-medium text-[#434750]">
                Hạn ứng tuyển
              </th>
              <th className="px-3 py-3 text-right text-sm font-medium text-[#434750]">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={8} className="px-6 py-10 text-center text-sm text-[#6B7280]">
                  Đang tải...
                </td>
              </tr>
            )}
            {isError && (
              <tr>
                <td colSpan={8} className="px-6 py-10 text-center text-sm text-red-600">
                  {error?.message ?? "Đã có lỗi xảy ra khi tải danh sách tin tuyển dụng."}
                </td>
              </tr>
            )}
            {!isLoading && !isError &&
              items.map((job) => (
                <tr
                  key={job.id}
                  className="border-b border-[#C4C6D2]/50 last:border-b-0"
                >
                  <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={selectedRows.has(job.id)}
                      onChange={() => toggleRow(job.id)}
                      className="size-4 rounded border-[#C4C6D2]"
                    />
                  </td>
                  <td className="px-3 py-4 text-sm font-medium text-[#316EE9]">
                    <Link href={`/tuyen-dung/${job.id}`} className="hover:underline">
                      {job.jobTitle}
                    </Link>
                  </td>
                  <td className="px-3 py-4 text-sm text-[#434750]">
                    {job.departmentName ?? "—"}
                  </td>
                  <td className="px-3 py-4 text-sm text-[#434750]">
                    {job.location ?? "—"}
                  </td>
                  <td className="px-3 py-4 text-sm text-[#434750]">
                    {EMPLOYMENT_TYPE_LABELS[job.employmentType]}
                  </td>
                  <td className="px-3 py-4 text-center text-sm font-medium text-[#1C1B1B]">
                    {job.applicantCount ?? 0}
                  </td>
                  <td className="px-3 py-4 text-sm text-[#434750]">
                    {formatDeadline(job.expiresAt)}
                  </td>
                  <td className="px-3 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/tuyen-dung/${job.id}`}
                        aria-label="Xem chi tiết"
                        className="inline-flex size-8 items-center justify-center rounded text-[#434750] hover:bg-[#F3F4F6]"
                      >
                        <Eye className="size-4" />
                      </Link>
                      <Link
                        href={`/tuyen-dung/${job.id}/sua`}
                        aria-label="Chỉnh sửa"
                        className="inline-flex size-8 items-center justify-center rounded text-[#434750] hover:bg-[#F3F4F6]"
                      >
                        <Pencil className="size-4" />
                      </Link>
                      <button
                        type="button"
                        aria-label="Xóa"
                        onClick={() => setDeleteTarget(job)}
                        className="inline-flex size-8 items-center justify-center rounded text-[#434750] hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            {!isLoading && !isError && items.length === 0 && (
              <tr>
                <td
                  colSpan={8}
                  className="px-6 py-10 text-center text-sm text-[#6B7280]"
                >
                  Không có tin tuyển dụng nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-4">
        <span className="text-sm text-[#434750]">
          Hiển thị {totalElements === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1} -{" "}
          {Math.min(currentPage * PAGE_SIZE, totalElements)} của{" "}
          {totalElements} tin tuyển dụng
        </span>

        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            aria-label="Trang trước"
            disabled={currentPage === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="flex size-8.5 items-center justify-center rounded-lg border border-[#C4C6D2] text-[#434750] hover:bg-[#F8FAFC] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ChevronLeft className="size-4" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => setPage(num)}
              className={`flex size-8.5 items-center justify-center rounded-lg border text-sm font-medium ${
                num === currentPage
                  ? "border-[#001E4B] bg-[#001E4B] text-white"
                  : "border-[#C4C6D2] text-[#1C1B1B] hover:bg-[#F8FAFC]"
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
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>

      <DeleteRecruitmentDialog
        open={!!deleteTarget}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null);
        }}
        jobTitle={deleteTarget?.jobTitle ?? ""}
        onConfirm={handleConfirmDelete}
        isDeleting={deleteMutation.isPending}
      />
    </div>
  );
}
