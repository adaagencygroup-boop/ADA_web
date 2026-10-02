"use client";

import { TriangleAlert } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/src/components/ui/dialog";
import type { RecruitmentStatus } from "@/src/lib/api/recruitment";

export default function DeleteRecruitmentDialog({
  open,
  onOpenChange,
  jobTitle,
  status,
  applicantCount,
  onConfirm,
  isDeleting = false,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  jobTitle: string;
  status: RecruitmentStatus;
  applicantCount: number;
  onConfirm: () => void;
  isDeleting?: boolean;
}) {
  const hasApplicants = applicantCount > 0;

  // Build description based on status and applicant count
  function getDescription() {
    if (status === "hiring") {
      if (!hasApplicants) {
        return "Bạn có chắc chắn muốn xóa tin tuyển dụng này? Hành động này không thể hoàn tác.";
      }
      return `Tin tuyển dụng này đang ở trạng thái Đang tuyển và hiện có ${applicantCount} ứng viên đã ứng tuyển. Bạn có chắc chắn muốn xóa? Hành động này không thể hoàn tác và toàn bộ dữ liệu ứng viên liên quan cũng sẽ bị xóa.`;
    }
    if (status === "draft") {
      if (!hasApplicants) {
        return "Bạn có chắc chắn muốn xóa bản nháp tin tuyển dụng này? Hành động này không thể hoàn tác.";
      }
      return `Tin tuyển dụng dạng Nháp này hiện có ${applicantCount} ứng viên đã ứng tuyển. Bạn có chắc chắn muốn xóa? Hành động này không thể hoàn tác và toàn bộ dữ liệu ứng viên liên quan cũng sẽ bị xóa.`;
    }
    if (status === "closed") {
      if (!hasApplicants) {
        return "Bạn có chắc chắn muốn xóa tin tuyển dụng đã đóng này? Hành động này không thể hoàn tác.";
      }
      return `Tin tuyển dụng đã đóng này có ${applicantCount} ứng viên đã ứng tuyển. Bạn có chắc chắn muốn xóa? Hành động này không thể hoàn tác và toàn bộ dữ liệu ứng viên liên quan cũng sẽ bị xóa.`;
    }
    return "Bạn có chắc chắn muốn xóa tin tuyển dụng này? Hành động này không thể hoàn tác.";
  }

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
              Xác nhận xóa tin tuyển dụng
            </DialogTitle>
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-base text-[#434750]">
              {getDescription()}
            </p>

            <div className="flex flex-col gap-1 rounded-lg border border-[#C4C6D2] bg-[#F6F3F2] p-3">
              <span className="text-xs text-[#434750]">Tin tuyển dụng:</span>
              <span className="text-base font-medium text-[#1C1B1B]">
                {jobTitle}
              </span>
              {hasApplicants && (
                <span className="mt-1 text-xs font-semibold text-[#BA1A1A]">
                  ⚠ {applicantCount} ứng viên sẽ bị ảnh hưởng
                </span>
              )}
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
