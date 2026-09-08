"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Bookmark, Check, List, Pencil, Plus, Search, Trash2, X } from "lucide-react";
import { useDebouncedValue } from "@/src/hooks/useDebouncedValue";
import {
  useCreateNewsCategory,
  useDeleteNewsCategory,
  useNewsCategories,
  useUpdateNewsCategory,
} from "@/src/hooks/useNewsCategories";
import type { NewsCategory } from "@/src/lib/api/news";
import {
  newsCategorySchema,
  type NewsCategoryFormValues,
} from "@/src/lib/validations/news-category";
import DeleteCategoryDialog from "@/app/(dashboard)/tin-tuc/danh-muc/_components/DeleteCategoryDialog";

const PAGE_SIZE = 10;

export default function CategoryManager() {
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState<NewsCategory | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  const search = useDebouncedValue(searchInput, 400);

  const [prevSearch, setPrevSearch] = useState(search);
  if (search !== prevSearch) {
    setPrevSearch(search);
    setPage(1);
  }

  const { data: categories, isLoading, isError, error } = useNewsCategories(search);
  const createMutation = useCreateNewsCategory();
  const updateMutation = useUpdateNewsCategory();
  const deleteMutation = useDeleteNewsCategory();

  const addForm = useForm<NewsCategoryFormValues>({
    resolver: zodResolver(newsCategorySchema),
    defaultValues: { name: "" },
  });
  const editForm = useForm<NewsCategoryFormValues>({
    resolver: zodResolver(newsCategorySchema),
    defaultValues: { name: "" },
  });

  const items = categories ?? [];
  const totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paged = items.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const onAdd = addForm.handleSubmit((values) => {
    createMutation.mutate(
      { name: values.name },
      { onSuccess: () => addForm.reset({ name: "" }) }
    );
  });

  function handleConfirmDelete() {
    if (!deleteTarget) return;
    deleteMutation.mutate(deleteTarget.id, {
      onSuccess: () => setDeleteTarget(null),
    });
  }

  function handleStartEdit(category: NewsCategory) {
    setEditingId(category.id);
    editForm.reset({ name: category.name });
  }

  function handleCancelEdit() {
    setEditingId(null);
    editForm.reset({ name: "" });
  }

  function saveEdit(category: NewsCategory) {
    return editForm.handleSubmit((values) => {
      updateMutation.mutate(
        { id: category.id, payload: { name: values.name, isActive: category.isActive } },
        { onSuccess: () => handleCancelEdit() }
      );
    })();
  }

  return (
    <div className="flex flex-col gap-6">
      <form
        onSubmit={onAdd}
        noValidate
        className="flex flex-col gap-6 rounded-xl border border-[#E2E8F0] bg-white p-6 shadow-xs"
      >
        <h2 className="flex items-center gap-3 border-b border-[#E2E8F0] pb-4 text-lg font-semibold text-[#1E293B]">
          <Bookmark className="size-4 text-[#1A56DB]" />
          Thêm lĩnh vực mới
        </h2>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[#1E293B]">
            Tên lĩnh vực <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Nhập tên lĩnh vực"
            className="h-10.5 rounded-lg border border-[#E2E8F0] px-4 text-sm text-[#1E293B] shadow-xs outline-none placeholder:text-[#94A3B8] focus-visible:border-[#1A56DB]"
            {...addForm.register("name")}
          />
          {addForm.formState.errors.name && (
            <p className="text-sm text-red-600">
              {addForm.formState.errors.name.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={createMutation.isPending}
          className="flex h-10 w-fit items-center gap-2 self-end rounded-lg bg-[#1A56DB] px-6 text-sm font-medium text-white shadow-xs hover:bg-[#1A56DB]/90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Plus className="size-3.5" />
          {createMutation.isPending ? "Đang thêm..." : "Thêm lĩnh vực"}
        </button>
      </form>

      <div className="overflow-hidden rounded-xl border border-[#E2E8F0] bg-white shadow-xs">
        <div className="flex flex-wrap items-center gap-4 border-b border-[#E2E8F0] p-6">
          <h2 className="flex items-center gap-3 text-lg font-semibold text-[#1E293B]">
            <List className="size-4 text-[#1A56DB]" />
            Danh sách lĩnh vực
          </h2>

          <div className="relative w-full max-w-md flex-1">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-[#64748B]" />
            <input
              type="text"
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              placeholder="Tìm kiếm lĩnh vực..."
              className="h-9.5 w-full rounded-lg border border-[#E2E8F0] pr-4 pl-10 text-sm text-[#1E293B] outline-none placeholder:text-[#64748B] focus-visible:border-[#1A56DB]"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-150 border-collapse">
            <thead>
              <tr className="bg-[#F8FAFC] text-left">
                <th className="w-24 px-6 py-3 text-xs font-semibold tracking-wider text-[#64748B] uppercase">
                  STT
                </th>
                <th className="px-6 py-3 text-xs font-semibold tracking-wider text-[#64748B] uppercase">
                  Tên lĩnh vực
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold tracking-wider text-[#64748B] uppercase">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading && (
                <tr>
                  <td colSpan={3} className="px-6 py-10 text-center text-sm text-[#64748B]">
                    Đang tải...
                  </td>
                </tr>
              )}
              {isError && (
                <tr>
                  <td colSpan={3} className="px-6 py-10 text-center text-sm text-red-600">
                    {error?.message ?? "Đã có lỗi xảy ra khi tải danh sách lĩnh vực."}
                  </td>
                </tr>
              )}
              {!isLoading && !isError &&
                paged.map((category, index) => {
                  const isEditing = editingId === category.id;
                  return (
                    <tr key={category.id} className="border-t border-[#E2E8F0]">
                      <td className="px-6 py-5 text-sm font-medium text-[#1E293B]">
                        {(currentPage - 1) * PAGE_SIZE + index + 1}
                      </td>
                      <td className="px-6 py-5 text-sm font-medium text-[#1E293B]">
                        {isEditing ? (
                          <div className="flex flex-col gap-1">
                            <input
                              type="text"
                              autoFocus
                              onKeyDown={(event) => {
                                if (event.key === "Enter") {
                                  event.preventDefault();
                                  saveEdit(category);
                                }
                                if (event.key === "Escape") handleCancelEdit();
                              }}
                              className="h-9 w-full max-w-80 rounded-lg border border-[#1A56DB] px-3 text-sm text-[#1E293B] outline-none"
                              {...editForm.register("name")}
                            />
                            {editForm.formState.errors.name && (
                              <p className="text-xs text-red-600">
                                {editForm.formState.errors.name.message}
                              </p>
                            )}
                          </div>
                        ) : (
                          category.name
                        )}
                      </td>
                      <td className="px-6 py-5 text-right">
                        {isEditing ? (
                          <div className="flex justify-end gap-2">
                            <button
                              type="button"
                              aria-label="Lưu"
                              onClick={() => saveEdit(category)}
                              disabled={updateMutation.isPending}
                              className="inline-flex size-9.5 items-center justify-center rounded-lg border border-[#BBF7D0] text-green-600 hover:bg-green-50 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              <Check className="size-3.5" />
                            </button>
                            <button
                              type="button"
                              aria-label="Hủy"
                              onClick={handleCancelEdit}
                              className="inline-flex size-9.5 items-center justify-center rounded-lg border border-[#E2E8F0] text-[#64748B] hover:bg-[#F8FAFC]"
                            >
                              <X className="size-3.5" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex justify-end gap-2">
                            <button
                              type="button"
                              aria-label="Sửa"
                              onClick={() => handleStartEdit(category)}
                              className="inline-flex size-9.5 items-center justify-center rounded-lg border border-[#E2E8F0] text-[#1E293B] hover:bg-[#F8FAFC]"
                            >
                              <Pencil className="size-3.5" />
                            </button>
                            <button
                              type="button"
                              aria-label="Xóa"
                              onClick={() => setDeleteTarget(category)}
                              className="inline-flex size-9.5 items-center justify-center rounded-lg border border-[#FEE2E2] text-red-500 hover:bg-red-50"
                            >
                              <Trash2 className="size-3.5" />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              {!isLoading && !isError && paged.length === 0 && (
                <tr>
                  <td
                    colSpan={3}
                    className="px-6 py-10 text-center text-sm text-[#64748B]"
                  >
                    Không tìm thấy lĩnh vực nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#E2E8F0] px-6 py-4">
          <span className="text-sm text-[#64748B]">
            Hiển thị {items.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1} -{" "}
            {Math.min(currentPage * PAGE_SIZE, items.length)} của{" "}
            {items.length} lĩnh vực
          </span>

          <div className="flex items-center gap-1">
            <button
              type="button"
              aria-label="Trang trước"
              disabled={currentPage === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="flex size-8 items-center justify-center rounded-md border border-[#E2E8F0] text-[#64748B] disabled:cursor-not-allowed disabled:opacity-50"
            >
              ‹
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => setPage(num)}
                className={`flex size-8 items-center justify-center rounded-md text-sm font-medium ${
                  num === currentPage
                    ? "bg-[#1A56DB] text-white"
                    : "border border-[#E2E8F0] text-[#1E293B] hover:bg-[#F8FAFC]"
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
              className="flex size-8 items-center justify-center rounded-md border border-[#E2E8F0] text-[#64748B] disabled:cursor-not-allowed disabled:opacity-50"
            >
              ›
            </button>
          </div>
        </div>
      </div>

      <DeleteCategoryDialog
        open={!!deleteTarget}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null);
        }}
        categoryName={deleteTarget?.name ?? ""}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
