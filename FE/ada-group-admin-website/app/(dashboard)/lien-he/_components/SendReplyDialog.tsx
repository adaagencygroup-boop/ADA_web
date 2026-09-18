"use client";

import { Mail, Paperclip } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/src/components/ui/dialog";

export default function SendReplyDialog({
  open,
  onOpenChange,
  contactName,
  contactEmail,
  replyContent,
  attachmentName,
  onConfirm,
  isSending = false,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  contactName: string;
  contactEmail?: string;
  replyContent: string;
  attachmentName?: string;
  onConfirm: () => void;
  isSending?: boolean;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="w-full max-w-md gap-0 overflow-hidden rounded-xl border border-[#E5E7EB] bg-white p-0 shadow-xs sm:max-w-md"
      >
        <div className="flex flex-col gap-4 p-6">
          <div className="flex items-center gap-3">
            <Mail className="size-6 shrink-0 text-[#1A56DB]" />
            <DialogTitle className="text-[22px] font-semibold text-[#111827]">
              Xác nhận gửi phản hồi
            </DialogTitle>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-sm text-[#4B5563]">
              Bạn sắp gửi email phản hồi đến khách hàng. Vui lòng kiểm tra thông tin trước khi xác nhận.
            </p>

            <div className="flex flex-col gap-2 rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] p-3 text-sm">
              <div className="flex items-start gap-2">
                <span className="min-w-[72px] text-[#6B7280]">Gửi đến:</span>
                <span className="font-medium text-[#111827]">
                  {contactName}
                  {contactEmail && (
                    <span className="ml-1 text-[#6B7280] font-normal">
                      ({contactEmail})
                    </span>
                  )}
                </span>
              </div>

              <div className="flex items-start gap-2">
                <span className="min-w-[72px] shrink-0 text-[#6B7280]">Nội dung:</span>
                <span className="max-h-32 overflow-y-auto whitespace-pre-line text-[#374151]">{replyContent}</span>
              </div>

              {attachmentName && (
                <div className="flex items-center gap-2">
                  <span className="min-w-[72px] text-[#6B7280]">Đính kèm:</span>
                  <span className="flex items-center gap-1 text-[#374151]">
                    <Paperclip className="size-3.5 shrink-0" />
                    <span className="truncate">{attachmentName}</span>
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-[#E5E7EB] bg-[#F9FAFB] px-6 py-4">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            disabled={isSending}
            className="flex h-9 items-center justify-center rounded-lg border border-[#D1D5DB] px-4 text-sm font-semibold text-[#111827] hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            Hủy
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isSending}
            className="flex h-9 items-center justify-center gap-2 rounded-lg bg-[#1A56DB] px-4 text-sm font-semibold text-white hover:bg-[#1A56DB]/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Mail className="size-4" />
            {isSending ? "Đang gửi..." : "Xác nhận gửi"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
