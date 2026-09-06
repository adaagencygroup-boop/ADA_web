"use client";

import { useMemo, useState } from "react";
import { Bookmark, List, Plus, Search, Trash2 } from "lucide-react";
import { CATEGORIES } from "@/app/(dashboard)/tin-tuc/_components/data";
import DeleteCategoryDialog from "@/app/(dashboard)/tin-tuc/danh-muc/_components/DeleteCategoryDialog";

type Category = { id: number; name: string };

const PAGE_SIZE = 10;

export default function CategoryManager() {
  const [categories, setCategories] = useState<Category[]>(() =>
    CATEGORIES.map((name, i) => ({ id: i + 1, name }))
  );
  const [newName, setNewName] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState<Category | null>(null);

  const filtered = useMemo(
    () =>
      categories.filter((c) =>
        c.name.toLowerCase().includes(search.trim().toLowerCase())
      ),
    [categories, search]
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paged = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  function handleAdd() {
    const trimmed = newName.trim();
    if (!trimmed) return;
    setCategories((prev) => [
      ...prev,
      { id: (prev.at(-1)?.id ?? 0) + 1, name: trimmed },
    ]);
    setNewName("");
  }

  function handleConfirmDelete() {
    if (!deleteTarget) return;
    setCategories((prev) => prev.filter((c) => c.id !== deleteTarget.id));
    setDeleteTarget(null);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-6 rounded-xl border border-[#E2E8F0] bg-white p-6 shadow-xs">
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
            value={newName}
            onChange={(event) => setNewName(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                handleAdd();
              }
            }}
            placeholder="Nhập tên lĩnh vực"
            className="h-10.5 rounded-lg border border-[#E2E8F0] px-4 text-sm text-[#1E293B] shadow-xs outline-none placeholder:text-[#94A3B8] focus-visible:border-[#1A56DB]"
          />
        </div>

        <button
          type="button"
          onClick={handleAdd}
          disabled={!newName.trim()}
          className="flex h-10 w-fit items-center gap-2 self-end rounded-lg bg-[#1A56DB] px-6 text-sm font-medium text-white shadow-xs hover:bg-[#1A56DB]/90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Plus className="size-3.5" />
          Thêm lĩnh vực
        </button>
      </div>

      <div className="overflow-hidden rounded-xl border border-[#E2E8F0] bg-white shadow-xs">
        <div className="flex flex-wrap items-center gap-4 border-b border-[#E2E8F0] p-6">
          <h2 className="flex items-center gap-3 text-lg font-semibold text-[#1E293B]">
            <List className="size-4 text-[#1A56DB]" />
            Danh sách lĩnh vực
          </h2>

          <div className="relative w-full max-w-112 flex-1">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-[#64748B]" />
            <input
              type="text"
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
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
              {paged.map((category, index) => (
                <tr key={category.id} className="border-t border-[#E2E8F0]">
                  <td className="px-6 py-5 text-sm font-medium text-[#1E293B]">
                    {(currentPage - 1) * PAGE_SIZE + index + 1}
                  </td>
                  <td className="px-6 py-5 text-sm font-medium text-[#1E293B]">
                    {category.name}
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button
                      type="button"
                      aria-label="Xóa"
                      onClick={() => setDeleteTarget(category)}
                      className="inline-flex size-9.5 items-center justify-center rounded-lg border border-[#FEE2E2] text-red-500 hover:bg-red-50"
                    >
                      <Trash2 className="size-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
              {paged.length === 0 && (
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
            Hiển thị {filtered.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1} -{" "}
            {Math.min(currentPage * PAGE_SIZE, filtered.length)} của{" "}
            {filtered.length} lĩnh vực
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
