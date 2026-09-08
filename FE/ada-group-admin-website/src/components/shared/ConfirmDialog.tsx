"use client";

import { Dialog, DialogContent, DialogTitle } from "@/src/components/ui/dialog";

export default function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  cancelLabel = "Thoát",
  confirmLabel,
  onConfirm,
  isConfirming = false,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  cancelLabel?: string;
  confirmLabel: string;
  onConfirm: () => void;
  isConfirming?: boolean;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full max-w-md gap-0 overflow-hidden rounded-xl border border-[#C4C6D2] bg-[#FCF9F8] p-0 sm:max-w-md">
        <div className="border-b border-[#C4C6D2] px-6 py-5">
          <DialogTitle className="text-[28px] font-bold text-[#1C1B1B]">
            {title}
          </DialogTitle>
        </div>

        <div className="px-6 py-6">
          <p className="text-base text-[#434750]">{description}</p>
        </div>

        <div className="flex justify-end gap-3 border-t border-[#C4C6D2] bg-[#F6F3F2] px-6 py-4">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            disabled={isConfirming}
            className="flex h-10 items-center justify-center rounded-lg border border-[#747782] px-5 text-sm font-semibold text-[#1C1B1B] hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isConfirming}
            className="flex h-10 items-center justify-center rounded-lg bg-[#001E4B] px-5 text-sm font-semibold text-white hover:bg-[#001E4B]/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {confirmLabel}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
