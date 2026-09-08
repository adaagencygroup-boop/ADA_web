"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Building2, Check, List, Pencil, Plus, Search, Trash2, X } from "lucide-react";
import { useDebouncedValue } from "@/src/hooks/useDebouncedValue";
import {
  useCreateDepartment,
  useDeleteDepartment,
  useDepartments,
  useUpdateDepartment,
} from "@/src/hooks/useDepartments";
import type { Department } from "@/src/lib/api/recruitment";
import {
  departmentSchema,
  type DepartmentFormValues,
} from "@/src/lib/validations/department";
import DeleteDepartmentDialog from "@/app/(dashboard)/tuyen-dung/phong-ban/_components/DeleteDepartmentDialog";

const PAGE_SIZE = 10;

export default function DepartmentManager() {
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);
  const [deleteTarget, setDeleteTarget] = useState<Department | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  const search = useDebouncedValue(searchInput, 400);

  const [prevSearch, setPrevSearch] = useState(search);
  if (search !== prevSearch) {
    setPrevSearch(search);
    setPage(1);
  }

  const { data: departments, isLoading, isError, error } = useDepartments(search);
  const createMutation = useCreateDepartment();
  const updateMutation = useUpdateDepartment();
  const deleteMutation = useDeleteDepartment();

  const addForm = useForm<DepartmentFormValues>({
    resolver: zodResolver(departmentSchema),
    defaultValues: { name: "" },
  });
  const editForm = useForm<DepartmentFormValues>({
    resolver: zodResolver(departmentSchema),
    defaultValues: { name: "" },
  });

  const items = departments ?? [];
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

  function handleStartEdit(department: Department) {
    setEditingId(department.id);
    editForm.reset({ name: department.name });
  }

  function handleCancelEdit() {
    setEditingId(null);
    editForm.reset({ name: "" });
  }

  function saveEdit(department: Department) {
    return editForm.handleSubmit((values) => {
      updateMutation.mutate(
        { id: department.id, payload: { name: values.name } },
        { onSuccess: () => handleCancelEdit() }
      );
    })();
  }

  return (
    <div className="flex flex-col gap-6">
      <form
        onSubmit={onAdd}
        noValidate
        className="flex flex-col gap-6 rounded-xl border border-[#C4C6D2] bg-white p-6 shadow-xs"
      >
        <h2 className="flex items-center gap-3 border-b border-[#C4C6D2] pb-4 text-lg font-semibold text-[#1C1B1B]">
          <Building2 className="size-4 text-[#316EE9]" />
          Thêm phòng ban mới
        </h2>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[#1C1B1B]">
            Tên phòng ban <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Nhập tên phòng ban"
            className="h-10.5 rounded-lg border border-[#C4C6D2] px-4 text-sm text-[#1C1B1B] shadow-xs outline-none placeholder:text-[#9CA3AF] focus-visible:border-[#316EE9]"
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
          className="flex h-10 w-fit items-center gap-2 self-end rounded-lg bg-[#316EE9] px-6 text-sm font-medium text-white shadow-xs hover:bg-[#316EE9]/90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Plus className="size-3.5" />
          {createMutation.isPending ? "Đang thêm..." : "Thêm phòng ban"}
        </button>
      </form>

      <div className="overflow-hidden rounded-xl border border-[#C4C6D2] bg-white shadow-xs">
        <div className="flex flex-wrap items-center gap-4 border-b border-[#C4C6D2] p-6">
          <h2 className="flex items-center gap-3 text-lg font-semibold text-[#1C1B1B]">
            <List className="size-4 text-[#316EE9]" />
            Danh sách phòng ban
          </h2>

          <div className="relative w-full max-w-md flex-1">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-[#434750]" />
            <input
              type="text"
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              placeholder="Tìm kiếm phòng ban..."
              className="h-9.5 w-full rounded-lg border border-[#C4C6D2] pr-4 pl-10 text-sm text-[#1C1B1B] outline-none placeholder:text-[#434750] focus-visible:border-[#316EE9]"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-150 border-collapse">
            <thead>
              <tr className="bg-[#F8FAFC] text-left">
                <th className="w-24 px-6 py-3 text-xs font-semibold tracking-wider text-[#434750] uppercase">
                  STT
                </th>
                <th className="px-6 py-3 text-xs font-semibold tracking-wider text-[#434750] uppercase">
                  Tên phòng ban
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold tracking-wider text-[#434750] uppercase">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading && (
                <tr>
                  <td colSpan={3} className="px-6 py-10 text-center text-sm text-[#434750]">
                    Đang tải...
                  </td>
                </tr>
              )}
              {isError && (
                <tr>
                  <td colSpan={3} className="px-6 py-10 text-center text-sm text-red-600">
                    {error?.message ?? "Đã có lỗi xảy ra khi tải danh sách phòng ban."}
                  </td>
                </tr>
              )}
              {!isLoading && !isError &&
                paged.map((department, index) => {
                  const isEditing = editingId === department.id;
                  return (
                    <tr key={department.id} className="border-t border-[#C4C6D2]">
                      <td className="px-6 py-5 text-sm font-medium text-[#1C1B1B]">
                        {(currentPage - 1) * PAGE_SIZE + index + 1}
                      </td>
                      <td className="px-6 py-5 text-sm font-medium text-[#1C1B1B]">
                        {isEditing ? (
                          <div className="flex flex-col gap-1">
                            <input
                              type="text"
                              autoFocus
                              onKeyDown={(event) => {
                                if (event.key === "Enter") {
                                  event.preventDefault();
                                  saveEdit(department);
                                }
                                if (event.key === "Escape") handleCancelEdit();
                              }}
                              className="h-9 w-full max-w-80 rounded-lg border border-[#316EE9] px-3 text-sm text-[#1C1B1B] outline-none"
                              {...editForm.register("name")}
                            />
                            {editForm.formState.errors.name && (
                              <p className="text-xs text-red-600">
                                {editForm.formState.errors.name.message}
                              </p>
                            )}
                          </div>
                        ) : (
                          department.name
                        )}
                      </td>
                      <td className="px-6 py-5 text-right">
                        {isEditing ? (
                          <div className="flex justify-end gap-2">
                            <button
                              type="button"
                              aria-label="Lưu"
                              onClick={() => saveEdit(department)}
                              disabled={updateMutation.isPending}
                              className="inline-flex size-9.5 items-center justify-center rounded-lg border border-[#BBF7D0] text-green-600 hover:bg-green-50 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              <Check className="size-3.5" />
                            </button>
                            <button
                              type="button"
                              aria-label="Hủy"
                              onClick={handleCancelEdit}
                              className="inline-flex size-9.5 items-center justify-center rounded-lg border border-[#C4C6D2] text-[#434750] hover:bg-[#F8FAFC]"
                            >
                              <X className="size-3.5" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex justify-end gap-2">
                            <button
                              type="button"
                              aria-label="Sửa"
                              onClick={() => handleStartEdit(department)}
                              className="inline-flex size-9.5 items-center justify-center rounded-lg border border-[#C4C6D2] text-[#1C1B1B] hover:bg-[#F8FAFC]"
                            >
                              <Pencil className="size-3.5" />
                            </button>
                            <button
                              type="button"
                              aria-label="Xóa"
                              onClick={() => setDeleteTarget(department)}
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
                    className="px-6 py-10 text-center text-sm text-[#434750]"
                  >
                    Không tìm thấy phòng ban nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#C4C6D2] px-6 py-4">
          <span className="text-sm text-[#434750]">
            Hiển thị {items.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1} -{" "}
            {Math.min(currentPage * PAGE_SIZE, items.length)} của{" "}
            {items.length} phòng ban
          </span>

          <div className="flex flex-wrap items-center gap-1">
            <button
              type="button"
              aria-label="Trang trước"
              disabled={currentPage === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="flex size-8 items-center justify-center rounded-md border border-[#C4C6D2] text-[#434750] disabled:cursor-not-allowed disabled:opacity-50"
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
                    ? "bg-[#316EE9] text-white"
                    : "border border-[#C4C6D2] text-[#1C1B1B] hover:bg-[#F8FAFC]"
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
              className="flex size-8 items-center justify-center rounded-md border border-[#C4C6D2] text-[#434750] disabled:cursor-not-allowed disabled:opacity-50"
            >
              ›
            </button>
          </div>
        </div>
      </div>

      <DeleteDepartmentDialog
        open={!!deleteTarget}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null);
        }}
        departmentName={deleteTarget?.name ?? ""}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
