"use client";

import { TriangleAlert } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/src/components/ui/dialog";

export default function DeleteContactDialog({
  open,
  onOpenChange,
  contactName,
  onConfirm,
  isDeleting = false,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  contactName: string;
  onConfirm: () => void;
  isDeleting?: boolean;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="w-full max-w-md gap-0 overflow-hidden rounded-xl border border-[#E5E7EB] bg-white p-0 shadow-xs sm:max-w-md"
      >
        <div className="flex flex-col gap-4 p-6">
          <div className="flex items-center gap-3">
            <TriangleAlert className="size-6 shrink-0 text-red-600" />
            <DialogTitle className="text-[22px] font-semibold text-[#111827]">
              Xác nhận xóa liên hệ
            </DialogTitle>
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-base text-[#4B5563]">
              Bạn có chắc chắn muốn xóa liên hệ này? Hành động này không thể
              hoàn tác.
            </p>

            <div className="flex flex-col gap-1 rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] p-3">
              <span className="text-xs text-[#6B7280]">Liên hệ:</span>
              <span className="text-base font-medium text-[#111827]">
                {contactName}
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-[#E5E7EB] bg-[#F9FAFB] px-6 py-4">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            disabled={isDeleting}
            className="flex h-9 items-center justify-center rounded-lg border border-[#D1D5DB] px-4 text-sm font-semibold text-[#111827] hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            Hủy
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex h-9 items-center justify-center rounded-lg bg-red-600 px-4 text-sm font-semibold text-white hover:bg-red-600/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isDeleting ? "Đang xóa..." : "Xác nhận xóa"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
