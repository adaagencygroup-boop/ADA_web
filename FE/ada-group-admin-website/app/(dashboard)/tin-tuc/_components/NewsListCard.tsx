"use client";

import { useState } from "react";
import Image from "next/image";
import { useDebouncedValue } from "@/src/hooks/useDebouncedValue";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  Circle,
  Eye,
  Pencil,
  Search,
  Star,
  Trash2,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { useDeleteNews, useNews, useToggleFeatured } from "@/src/hooks/useNews";
import { useNewsCategories } from "@/src/hooks/useNewsCategories";
import type { NewsItem, NewsStatus } from "@/src/lib/api/news";
import DeleteNewsDialog from "@/app/(dashboard)/tin-tuc/_components/DeleteNewsDialog";

const STATUS_STYLES: Record<NewsStatus, string> = {
  published: "bg-[#D1FAE5] text-[#047857]",
  draft: "bg-[#FEF3C7] text-[#92400E]",
};

const STATUS_LABELS: Record<NewsStatus, string> = {
  published: "Đã xuất bản",
  draft: "Bản nháp",
};

const FEATURED_OPTIONS = [
  { value: "all", label: "Tất cả" },
  { value: "featured", label: "Nổi bật" },
  { value: "normal", label: "Không nổi bật" },
];

const PAGE_SIZE_OPTIONS = ["10", "20", "50"];

function formatDateParts(iso: string) {
  const date = new Date(iso);
  return {
    date: date.toLocaleDateString("vi-VN"),
    time: date.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
  };
}

export default function NewsListCard() {
  const [searchInput, setSearchInput] = useState("");
  const [categoryId, setCategoryId] = useState("all");
  const [featured, setFeatured] = useState("all");
  const [pageSize, setPageSize] = useState("10");
  const [page, setPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [deleteTarget, setDeleteTarget] = useState<NewsItem | null>(null);

  const deleteMutation = useDeleteNews();
  const toggleFeaturedMutation = useToggleFeatured();

  const search = useDebouncedValue(searchInput, 400);

  const [prevSearch, setPrevSearch] = useState(search);
  if (search !== prevSearch) {
    setPrevSearch(search);
    setPage(1);
  }

  const { data: categories } = useNewsCategories();

  const { data, isLoading, isError, error } = useNews({
    page,
    size: Number(pageSize),
    search: search || undefined,
    categoryId: categoryId === "all" ? undefined : categoryId,
    isFeatured: featured === "all" ? undefined : featured === "featured",
  });

  const items = data?.items ?? [];
  const pagination = data?.pagination;
  const totalPages = pagination?.totalPages ?? 1;
  const currentPage = pagination?.page ?? 1;
  const totalElements = pagination?.totalElements ?? 0;

  const allPagedSelected =
    items.length > 0 && items.every((article) => selectedRows.has(article.id));

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
        items.forEach((article) => next.delete(article.id));
        return next;
      }
      const next = new Set(prev);
      items.forEach((article) => next.add(article.id));
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
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-4 rounded-xl border border-[#E5E7EB] bg-white p-4">
        <div className="relative min-w-50 flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-[#9CA3AF]" />
          <input
            type="text"
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            placeholder="Tìm kiếm tiêu đề, tóm tắt..."
            className="h-10.5 w-full rounded-lg border border-[#D1D5DB] pr-4 pl-10 text-sm text-[#111827] outline-none placeholder:text-[#9CA3AF] focus-visible:border-[#316EE9]"
          />
        </div>

        <Select
          value={categoryId}
          onValueChange={(next) => {
            if (!next) return;
            setCategoryId(next);
            setPage(1);
          }}
        >
          <SelectTrigger className="w-52 rounded-lg border-[#D1D5DB] text-sm text-[#374151] data-[size=default]:h-10.5">
            <SelectValue>
              {(value: string) =>
                value === "all"
                  ? "Tất cả lĩnh vực"
                  : (categories?.find((c) => c.id === value)?.name ?? value)
              }
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả lĩnh vực</SelectItem>
            {categories?.map((option) => (
              <SelectItem key={option.id} value={option.id}>
                {option.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={featured}
          onValueChange={(next) => {
            if (!next) return;
            setFeatured(next);
            setPage(1);
          }}
        >
          <SelectTrigger className="w-44 rounded-lg border-[#D1D5DB] text-sm text-[#374151] data-[size=default]:h-10.5">
            <SelectValue>
              {(value: string) =>
                FEATURED_OPTIONS.find((option) => option.value === value)?.label
              }
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {FEATURED_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="overflow-hidden rounded-xl border border-[#E5E7EB] bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-250 border-collapse">
            <thead>
              <tr className="border-b border-[#E5E7EB] bg-[#F9FAFB] text-left">
                <th className="w-12 px-6 py-4">
                  <input
                    type="checkbox"
                    checked={allPagedSelected}
                    onChange={toggleAllRows}
                    className="size-4 rounded border-[#D1D5DB]"
                  />
                </th>
                <th className="px-3 py-4 text-sm font-semibold text-[#374151]">
                  Tiêu đề
                </th>
                <th className="px-3 py-4 text-sm font-semibold text-[#374151]">
                  Danh mục
                </th>
                <th className="px-3 py-4 text-sm font-semibold text-[#374151]">
                  Ngày đăng
                </th>
                <th className="px-3 py-4 text-sm font-semibold text-[#374151]">
                  Trạng thái
                </th>
                <th className="px-3 py-4 text-center text-sm font-semibold text-[#374151]">
                  Nổi bật
                </th>
                <th className="px-3 py-4 text-right text-sm font-semibold text-[#374151]">
                  Lượt xem
                </th>
                <th className="px-3 py-4 text-center text-sm font-semibold text-[#374151]">
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
                    {error?.message ?? "Đã có lỗi xảy ra khi tải danh sách tin tức."}
                  </td>
                </tr>
              )}
              {!isLoading && !isError &&
                items.map((article) => {
                  const created = formatDateParts(article.createdAt);
                  return (
                    <tr
                      key={article.id}
                      className="border-b border-[#E5E7EB] last:border-b-0 hover:bg-[#F9FAFB]"
                    >
                      <td className="px-6 py-5" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          checked={selectedRows.has(article.id)}
                          onChange={() => toggleRow(article.id)}
                          className="size-4 rounded border-[#D1D5DB]"
                        />
                      </td>
                      <td className="px-3 py-5">
                        <div className="flex items-start gap-3">
                          <div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-[#E5E7EB]">
                            {article.coverImageURL && (
                              <Image
                                src={article.coverImageURL}
                                alt={article.title}
                                fill
                                className="object-cover"
                              />
                            )}
                          </div>
                          <div className="flex max-w-70 flex-col gap-1">
                            <span className="line-clamp-2 text-sm font-semibold text-[#111827]">
                              {article.title}
                            </span>
                            <span className="truncate font-mono text-xs text-[#9CA3AF]">
                              {article.slug}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-5">
                        <span className="inline-flex w-fit items-center rounded-full bg-[#E0E7FF] px-3 py-1 text-xs font-medium text-[#4338CA]">
                          {article.categoryName ?? "—"}
                        </span>
                      </td>
                      <td className="px-3 py-5 text-sm text-[#4B5563]">
                        {created.date}
                        <br />
                        {created.time}
                      </td>
                      <td className="px-3 py-5">
                        <span
                          className={`inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${STATUS_STYLES[article.status]}`}
                        >
                          <Circle className="size-2 fill-current" />
                          {STATUS_LABELS[article.status]}
                        </span>
                      </td>
                      <td className="px-3 py-5 text-center">
                        <button
                          type="button"
                          aria-label={
                            article.isFeatured
                              ? "Bỏ đánh dấu nổi bật"
                              : "Đánh dấu nổi bật"
                          }
                          disabled={toggleFeaturedMutation.isPending}
                          onClick={() =>
                            toggleFeaturedMutation.mutate({
                              id: article.id,
                              isFeatured: !article.isFeatured,
                            })
                          }
                          className="mx-auto flex items-center justify-center rounded p-1 hover:bg-[#F3F4F6] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <Star
                            className={`size-4.5 ${
                              article.isFeatured
                                ? "fill-[#F59E0B] text-[#F59E0B]"
                                : "text-[#D1D5DB]"
                            }`}
                          />
                        </button>
                      </td>
                      <td className="px-3 py-5 text-right text-sm font-medium text-[#111827]">
                        {article.viewCount.toLocaleString("vi-VN")}
                      </td>
                      <td className="px-3 py-5">
                        <div className="flex items-center justify-center gap-1">
                          <Link
                            href={`/tin-tuc/${article.id}`}
                            aria-label="Xem chi tiết"
                            className="inline-flex size-8 items-center justify-center rounded-lg text-[#316EE9] hover:bg-[#EFF6FF]"
                          >
                            <Eye className="size-4" />
                          </Link>
                          <Link
                            href={`/tin-tuc/${article.id}/sua`}
                            aria-label="Chỉnh sửa"
                            className="inline-flex size-8 items-center justify-center rounded-lg text-[#1C1B1B] hover:bg-[#F3F4F6]"
                          >
                            <Pencil className="size-4" />
                          </Link>
                          <button
                            type="button"
                            aria-label="Xóa"
                            onClick={() => setDeleteTarget(article)}
                            className="inline-flex size-8 items-center justify-center rounded-lg text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="size-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              {!isLoading && !isError && items.length === 0 && (
                <tr>
                  <td
                    colSpan={8}
                    className="px-6 py-10 text-center text-sm text-[#6B7280]"
                  >
                    Không tìm thấy tin tức nào phù hợp.
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
              <SelectTrigger className="w-18 rounded-lg border-[#D1D5DB] text-sm data-[size=default]:h-9">
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
            trên mỗi trang
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-[#4B5563]">
            <span>Tổng {totalElements} bản ghi</span>
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                type="button"
                aria-label="Trang trước"
                disabled={currentPage === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="flex size-8.5 items-center justify-center rounded-lg border border-[#D1D5DB] text-[#4B5563] hover:bg-[#F8FAFC] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <ChevronLeft className="size-4" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setPage(num)}
                  className={`flex size-8.5 items-center justify-center rounded-lg text-sm font-medium ${
                    num === currentPage
                      ? "bg-[#1A56DB] text-white"
                      : "border border-[#D1D5DB] text-[#374151] hover:bg-[#F8FAFC]"
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
                className="flex size-8.5 items-center justify-center rounded-lg border border-[#D1D5DB] text-[#4B5563] hover:bg-[#F8FAFC] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <DeleteNewsDialog
        open={!!deleteTarget}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null);
        }}
        articleTitle={deleteTarget?.title ?? ""}
        onConfirm={handleConfirmDelete}
        isDeleting={deleteMutation.isPending}
      />
    </div>
  );
}

export function NewsToolbarActions() {
  return (
    <div className="flex items-center gap-3">
      <Link
        href="/tin-tuc/danh-muc"
        className="flex h-10 shrink-0 items-center gap-2 rounded-lg bg-[#316EE9] px-4 text-sm font-semibold text-white hover:bg-[#316EE9]/90"
      >
        + Thêm danh mục mới
      </Link>
      <Link
        href="/tin-tuc/tao-moi"
        className="flex h-10 shrink-0 items-center gap-2 rounded-lg bg-[#316EE9] px-4 text-sm font-semibold text-white hover:bg-[#316EE9]/90"
      >
        + Thêm tin tức mới
      </Link>
    </div>
  );
}
