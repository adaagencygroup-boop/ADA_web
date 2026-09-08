"use client";

import { ArrowRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/src/components/ui/dialog";

export default function LogoutConfirmDialog({
  open,
  onOpenChange,
  onConfirm,
  isLoggingOut = false,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  isLoggingOut?: boolean;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="w-full max-w-md gap-0 overflow-hidden rounded-xl border border-[#C4C6D2] bg-[#FCF9F8] p-0 shadow-xs sm:max-w-md"
      >
        <div className="flex flex-col items-center gap-2 p-6 text-center">
          <DialogTitle className="text-lg font-semibold text-[#1C1B1B]">
            Bạn có chắc chắn muốn đăng xuất khỏi hệ thống không?
          </DialogTitle>
          <p className="text-sm text-[#6B7280]">
            Bạn sẽ cần đăng nhập lại để truy cập ADA Group Dashboard.
          </p>
        </div>

        <div className="flex border-t border-[#E5E7EB]">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            disabled={isLoggingOut}
            className="flex h-14 flex-1 items-center justify-center border-r border-[#E5E7EB] text-sm font-semibold text-[#1C1B1B] hover:bg-[#F3F4F6] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Hủy
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoggingOut}
            className="flex h-14 flex-1 items-center justify-center gap-2 bg-[#BA1A1A] text-sm font-semibold text-white hover:bg-[#BA1A1A]/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoggingOut ? "Đang đăng xuất..." : "Đăng xuất"}
            {!isLoggingOut && <ArrowRight className="size-4" />}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
