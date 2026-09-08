"use client";

import { LogOut, TriangleAlert } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/src/components/ui/dialog";
import type { Session } from "@/src/lib/api/account";

export default function RevokeSessionDialog({
  open,
  onOpenChange,
  session,
  onConfirm,
  isRevoking = false,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  session: Session | null;
  onConfirm: () => void;
  isRevoking?: boolean;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-105 rounded-xl p-6">
        <DialogTitle className="sr-only">Đăng xuất thiết bị này?</DialogTitle>

        <div className="flex flex-col items-center gap-1 pb-2 text-center">
          <TriangleAlert className="mb-2 size-9.5 text-[#D97706]" />
          <p className="text-[22px] leading-7.75 font-semibold text-[#1C1B1B]">
            Đăng xuất thiết bị này?
          </p>
          <p className="text-base leading-relaxed text-[#434750]">
            Bạn có chắc chắn muốn đăng xuất thiết bị sau?
          </p>
        </div>

        {session && (
          <div className="flex flex-col gap-1 rounded-lg bg-[#F6F3F2] p-4">
            <span className="text-sm font-semibold tracking-wide text-[#1C1B1B]">
              {session.deviceName} · {session.browser}
            </span>
            <span className="text-sm text-[#434750]">
              IP: {session.IPAddress}
            </span>
          </div>
        )}

        <div className="flex items-start gap-2 text-sm font-medium text-[#92400E]">
          <TriangleAlert className="mt-0.5 size-3.5 shrink-0" />
          <span>
            Sau khi đăng xuất, thiết bị này sẽ cần đăng nhập lại để truy cập
            tài khoản.
          </span>
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            disabled={isRevoking}
            className="flex-1 rounded-lg border border-[#C4C6D2] py-2.5 text-sm font-semibold tracking-wide text-[#1C1B1B] hover:bg-[#F8FAFC] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Hủy
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isRevoking}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#BA1A1A] py-2.5 text-sm font-semibold tracking-wide text-white hover:bg-[#BA1A1A]/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <LogOut className="size-3.5" />
            {isRevoking ? "Đang đăng xuất..." : "Đăng xuất"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
