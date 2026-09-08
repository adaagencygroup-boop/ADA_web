"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/src/components/ui/dialog";
import { useCreateDepartment } from "@/src/hooks/useDepartments";
import {
  departmentSchema,
  type DepartmentFormValues,
} from "@/src/lib/validations/department";

export default function AddDepartmentDialog({
  open,
  onOpenChange,
  onCreated,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreated?: (departmentId: string) => void;
}) {
  const createMutation = useCreateDepartment();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DepartmentFormValues>({
    resolver: zodResolver(departmentSchema),
    defaultValues: { name: "" },
  });

  const onSubmit = handleSubmit((values) => {
    createMutation.mutate(
      { name: values.name },
      {
        onSuccess: (department) => {
          reset({ name: "" });
          onOpenChange(false);
          onCreated?.(department.id);
        },
      }
    );
  });

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) reset({ name: "" });
        onOpenChange(next);
      }}
    >
      <DialogContent
        showCloseButton={false}
        className="w-full max-w-md gap-0 overflow-hidden rounded-xl border border-[#C4C6D2] bg-[#FCF9F8] p-0 sm:max-w-md"
      >
        <form onSubmit={onSubmit} noValidate>
          <div className="border-b border-[#C4C6D2] px-6 py-5">
            <DialogTitle className="text-[22px] font-semibold text-[#1C1B1B]">
              Thêm phòng ban mới
            </DialogTitle>
          </div>

          <div className="flex flex-col gap-1.5 px-6 py-6">
            <label className="text-sm font-medium text-[#1C1B1B]">
              Tên phòng ban <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              autoFocus
              placeholder="Ví dụ: Phòng Nhân sự"
              className="h-9.5 rounded-lg border border-[#C4C6D2] px-4 text-sm text-[#1C1B1B] outline-none placeholder:text-[#9CA3AF] focus-visible:border-[#316EE9]"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          <div className="flex justify-end gap-3 border-t border-[#C4C6D2] bg-[#F6F3F2] px-6 py-4">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              disabled={createMutation.isPending}
              className="flex h-9 items-center justify-center rounded-lg border border-[#747782] px-4 text-sm font-semibold text-[#1C1B1B] hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={createMutation.isPending}
              className="flex h-9 items-center justify-center rounded-lg bg-[#316EE9] px-4 text-sm font-semibold text-white hover:bg-[#316EE9]/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {createMutation.isPending ? "Đang thêm..." : "Thêm phòng ban"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
