"use client";

import { TriangleAlert } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/src/components/ui/dialog";

export default function DeleteNewsDialog({
  open,
  onOpenChange,
  articleTitle,
  onConfirm,
  isDeleting = false,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  articleTitle: string;
  onConfirm: () => void;
  isDeleting?: boolean;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="w-full max-w-md gap-0 overflow-hidden rounded-xl border border-[#C4C6D2] bg-[#FCF9F8] p-0 shadow-xs sm:max-w-md"
      >
        <div className="flex flex-col gap-4 p-6">
          <div className="flex items-center gap-3">
            <TriangleAlert className="size-6 shrink-0 text-[#BA1A1A]" />
            <DialogTitle className="text-[22px] font-semibold text-[#1C1B1B]">
              Xác nhận xóa bài viết
            </DialogTitle>
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-base text-[#434750]">
              Bạn có chắc chắn muốn xóa bài viết này? Hành động này không thể
              hoàn tác.
            </p>

            <div className="flex flex-col gap-1 rounded-lg border border-[#C4C6D2] bg-[#F6F3F2] p-3">
              <span className="text-xs text-[#434750]">Bài viết:</span>
              <span className="text-base font-medium text-[#1C1B1B]">
                {articleTitle}
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-[#C4C6D2] bg-[#F6F3F2] px-6 py-4">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            disabled={isDeleting}
            className="flex h-9 items-center justify-center rounded-lg border border-[#747782] px-4 text-sm font-semibold tracking-wide text-[#1C1B1B] hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            Hủy
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex h-9 items-center justify-center rounded-lg bg-[#BA1A1A] px-4 text-sm font-semibold tracking-wide text-white hover:bg-[#BA1A1A]/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isDeleting ? "Đang xóa..." : "Xác nhận xóa"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
