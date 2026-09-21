"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import {
  Award,
  CheckCircle2,
  FileText,
  Mail,
  Paperclip,
  RotateCcw,
  Send,
  X,
  XCircle,
} from "lucide-react";
import { useUploadMedia } from "@/src/hooks/useNews";
import { useRespondCandidate } from "@/src/hooks/useCandidates";
import ConfirmDialog from "@/src/components/shared/ConfirmDialog";
import DateTimePicker from "@/src/components/shared/DateTimePicker";
import type { Candidate, CandidateStatus } from "@/src/lib/api/candidate";

const ALLOWED_EXTENSIONS = ["pdf", "doc", "docx", "jpg", "jpeg", "png"];
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

function buildPassedTemplate(
  candidateName: string,
  position: string,
  interviewTime: string,
  location: string,
  contact: string
) {
  return `Kính gửi ${candidateName || "Ứng viên"},

Cảm ơn bạn đã quan tâm và nộp hồ sơ ứng tuyển vào vị trí ${position || "Tuyển dụng"} tại ADA Group.

Hội đồng tuyển dụng xin trân trọng thông báo hồ sơ của bạn đã vượt qua vòng sơ loại. Chúng tôi xin mời bạn tham dự buổi phỏng vấn trực tiếp với thông tin chi tiết như sau:

- Vị trí phỏng vấn: ${position || "N/A"}
- Thời gian: ${interviewTime || "[Chưa bổ sung]"}
- Địa điểm: ${location || "[Chưa bổ sung]"}
- Người liên hệ: ${contact || "[Chưa bổ sung]"}

Vui lòng xác nhận email này để xác nhận sự tham gia của bạn. Nếu có bất kỳ thắc mắc hoặc cần điều chỉnh thời gian, bạn vui lòng phản hồi qua email này hoặc liên hệ hotline tuyển dụng.

Trân trọng,
Phòng Nhân sự - ADA Group`;
}

function buildOfferTemplate(
  candidateName: string,
  position: string,
  startDate: string,
  location: string,
  offeredSalary: string,
  contact: string
) {
  return `Kính gửi ${candidateName || "Ứng viên"},

ADA Group xin trân trọng chúc mừng bạn đã xuất sắc vượt qua các vòng phỏng vấn cho vị trí ${position || "Tuyển dụng"}.

Hội đồng tuyển dụng trân trọng gửi tới bạn Thư mời nhận việc (Job Offer) với thông tin chi tiết như sau:

- Vị trí công tác: ${position || "N/A"}
- Ngày bắt đầu làm việc: ${startDate || "[Chưa bổ sung]"}
- Địa điểm làm việc: ${location || "[Chưa bổ sung]"}
- Chế độ lương & thử việc: ${offeredSalary || "[Chưa bổ sung]"}
- Người liên hệ HR: ${contact || "[Chưa bổ sung]"}

Chi tiết Thư mời nhận việc và thủ tục tiếp nhận công việc được đính kèm trong email này. Vui lòng phản hồi email này để xác nhận đồng ý nhận việc.

Nếu bạn cần hỗ trợ thêm thông tin, vui lòng liên hệ bộ phận Nhân sự qua email hoặc hotline.

Trân trọng,
Phòng Nhân sự - ADA Group`;
}

function buildFailedTemplate(candidateName: string, position: string, reason?: string) {
  const reasonText = reason?.trim()
    ? `\nLý do: ${reason.trim()}\n`
    : "";

  return `Kính gửi ${candidateName || "Ứng viên"},

Cảm ơn bạn đã dành thời gian quan tâm và nộp hồ sơ ứng tuyển vị trí ${position || "Tuyển dụng"} tại ADA Group.

Sau khi xem xét kỹ lưỡng hồ sơ và quá trình ứng tuyển, chúng tôi rất tiếc phải thông báo rằng hồ sơ của bạn chưa phù hợp với các tiêu chí tuyển dụng hiện tại cho vị trí này.${reasonText}

ADA Group chân thành cảm ơn sự quan tâm của bạn và chúc bạn luôn thành công trên con đường sự nghiệp. Hồ sơ của bạn sẽ được lưu trữ trong cơ sở dữ liệu để chúng tôi có thể liên hệ cho các cơ hội phù hợp hơn trong tương lai.

Trân trọng,
Phòng Nhân sự - ADA Group`;
}

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const HISTORY_STATUS_STYLES: Record<CandidateStatus, { label: string; className: string }> = {
  pending: { label: "Chờ duyệt", className: "bg-[#FEF3C7] text-[#D97706]" },
  passed: { label: "Đạt vòng hồ sơ", className: "bg-[#E1FCEF] text-[#15803D]" },
  interview_passed: { label: "Trúng tuyển (Offer)", className: "bg-[#DBEAFE] text-[#1E40AF]" },
  failed: { label: "Từ chối", className: "bg-[#FEE2E2] text-[#DC2626]" },
};

export default function CandidateRespondSection({
  candidate,
}: {
  candidate: Candidate;
}) {
  const isTerminal = candidate.status === "interview_passed" || candidate.status === "failed";
  const [responseType, setResponseType] = useState<CandidateStatus>(() => {
    if (candidate.status === "passed") return "interview_passed";
    if (candidate.status === "interview_passed") return "interview_passed";
    if (candidate.status === "failed") return "failed";
    return "passed";
  });

  // Form 1: Passed (Resume / Interview invitation)
  const [interviewTime, setInterviewTime] = useState("");
  const [interviewLocation, setInterviewLocation] = useState(
    candidate.location || "Tầng 5, Tòa nhà ADA Group"
  );
  const [contactInfo, setContactInfo] = useState("Mr.Alexander - 09232323232");

  // Form 2: Interview Passed (Job Offer)
  const [startDate, setStartDate] = useState("");
  const [workLocation, setWorkLocation] = useState(
    candidate.location || "Tầng 5, Tòa nhà ADA Group"
  );
  const [offeredSalary, setOfferedSalary] = useState("Thử việc 2 tháng - 85% lương chính thức");
  const [offerContactInfo, setOfferContactInfo] = useState("Mr.Alexander - 09232323232");

  // Form 3: Failed
  const [failedReason, setFailedReason] = useState("");

  // Email content text
  const [emailContent, setEmailContent] = useState("");
  const [isManualEdit, setIsManualEdit] = useState(false);

  const [attachment, setAttachment] = useState<File | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  function clearError(field: string) {
    setFormErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }

  function validateForm(): boolean {
    const newErrors: Record<string, string> = {};

    if (responseType === "passed") {
      if (!interviewTime.trim()) {
        newErrors.interviewTime = "Vui lòng nhập thời gian phỏng vấn.";
      }
      if (!interviewLocation.trim()) {
        newErrors.interviewLocation = "Vui lòng nhập địa điểm phỏng vấn.";
      }
      if (!contactInfo.trim()) {
        newErrors.contactInfo = "Vui lòng nhập thông tin người liên hệ.";
      }
    } else if (responseType === "interview_passed") {
      if (!startDate.trim()) {
        newErrors.startDate = "Vui lòng nhập ngày bắt đầu làm việc.";
      }
      if (!workLocation.trim()) {
        newErrors.workLocation = "Vui lòng nhập địa điểm làm việc.";
      }
      if (!offeredSalary.trim()) {
        newErrors.offeredSalary = "Vui lòng nhập mức lương & thử việc.";
      }
      if (!offerContactInfo.trim()) {
        newErrors.offerContactInfo = "Vui lòng nhập người liên hệ HR.";
      }
    }

    if (!emailContent.trim()) {
      newErrors.emailContent = "Vui lòng nhập nội dung thư thông báo.";
    }

    setFormErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      toast.error("Vui lòng điền đầy đủ các thông tin bắt buộc.");
      return false;
    }

    return true;
  }

  const uploadMutation = useUploadMedia();
  const respondMutation = useRespondCandidate();

  // Auto-generate template text when fields change (unless manually edited)
  useEffect(() => {
    if (isManualEdit) return;
    if (responseType === "passed") {
      setEmailContent(
        buildPassedTemplate(
          candidate.fullname,
          candidate.recruitmentTitle,
          interviewTime,
          interviewLocation,
          contactInfo
        )
      );
    } else if (responseType === "interview_passed") {
      setEmailContent(
        buildOfferTemplate(
          candidate.fullname,
          candidate.recruitmentTitle,
          startDate,
          workLocation,
          offeredSalary,
          offerContactInfo
        )
      );
    } else {
      setEmailContent(
        buildFailedTemplate(candidate.fullname, candidate.recruitmentTitle, failedReason)
      );
    }
  }, [
    responseType,
    candidate.fullname,
    candidate.recruitmentTitle,
    interviewTime,
    interviewLocation,
    contactInfo,
    startDate,
    workLocation,
    offeredSalary,
    offerContactInfo,
    failedReason,
    isManualEdit,
  ]);

  function handleResetTemplate() {
    setIsManualEdit(false);
    if (responseType === "passed") {
      setEmailContent(
        buildPassedTemplate(
          candidate.fullname,
          candidate.recruitmentTitle,
          interviewTime,
          interviewLocation,
          contactInfo
        )
      );
    } else if (responseType === "interview_passed") {
      setEmailContent(
        buildOfferTemplate(
          candidate.fullname,
          candidate.recruitmentTitle,
          startDate,
          workLocation,
          offeredSalary,
          offerContactInfo
        )
      );
    } else {
      setEmailContent(
        buildFailedTemplate(candidate.fullname, candidate.recruitmentTitle, failedReason)
      );
    }
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    const extension = file.name.split(".").pop()?.toLowerCase() ?? "";
    if (!ALLOWED_EXTENSIONS.includes(extension)) {
      toast.error("Chỉ chấp nhận các tệp định dạng PDF, DOC, DOCX, JPG, PNG.");
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      toast.error("Dung lượng tệp đính kèm không vượt quá 10MB.");
      return;
    }

    setAttachment(file);
  }

  function handleSendClick() {
    if (isTerminal) {
      toast.error(
        candidate.status === "interview_passed"
          ? "Ứng viên đã trúng tuyển, quy trình tuyển dụng đã hoàn tất."
          : "Ứng viên đã bị từ chối, quy trình tuyển dụng đã kết thúc."
      );
      return;
    }
    if (candidate.status === "passed" && responseType === "passed") {
      toast.error("Ứng viên đã ở trạng thái Đạt vòng hồ sơ rồi.");
      return;
    }
    if (responseType === candidate.status) {
      toast.error("Ứng viên đã ở trạng thái này rồi.");
      return;
    }
    if (candidate.status === "pending" && responseType === "interview_passed") {
      toast.error("Không thể chuyển trực tiếp từ Chờ duyệt sang Đã trúng tuyển. Vui lòng mời phỏng vấn trước.");
      return;
    }

    if (!validateForm()) return;

    setConfirmOpen(true);
  }
  function handleActualSend() {
    if (attachment) {
      uploadMutation.mutate(attachment, {
        onSuccess: (uploadRes) => {
          respondMutation.mutate(
            {
              id: candidate.id,
              payload: {
                status: responseType,
                feedbackContent: emailContent,
                feedbackAttachmentURL: uploadRes.fileURL,
              },
            },
            {
              onSuccess: () => setConfirmOpen(false),
            }
          );
        },
      });
      return;
    }
    respondMutation.mutate(
      {
        id: candidate.id,
        payload: {
          status: responseType,
          feedbackContent: emailContent,
        },
      },
      {
        onSuccess: () => setConfirmOpen(false),
      }
    );
  }

  const isSending = uploadMutation.isPending || respondMutation.isPending;
  const historyStyle = HISTORY_STATUS_STYLES[candidate.status ?? "pending"];

  return (
    <div className="flex flex-col gap-6">
      {/* Existing Response History */}
      {candidate.status !== "pending" && candidate.feedbackContent && (
        <div className="rounded-xl border border-[#C4C6D2] bg-white p-6 shadow-xs">
          <div className="flex items-center justify-between gap-4">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-[#111827]">
              <Mail className="size-5 text-[#316EE9]" />
              LỊCH SỬ PHẢN HỒI ĐÃ GỬI
            </h2>
            <span
              className={`inline-flex shrink-0 items-center rounded-full px-3 py-1 text-xs font-medium ${historyStyle.className}`}
            >
              {historyStyle.label}
            </span>
          </div>

          <div className="mt-4 flex flex-col gap-3 rounded-lg bg-[#F8FAFC] p-4 text-sm">
            {candidate.feedbackSentAt && (
              <div className="flex items-center justify-between text-xs text-[#6B7280]">
                <span>Thời gian gửi:</span>
                <span className="font-medium text-[#111827]">
                  {formatDateTime(candidate.feedbackSentAt)}
                </span>
              </div>
            )}

            <div className="flex flex-col gap-1 border-t border-[#E5E7EB] pt-3">
              <span className="font-semibold text-[#111827]">Nội dung thư:</span>
              <p className="whitespace-pre-line text-[#374151]">
                {candidate.feedbackContent}
              </p>
            </div>

            {candidate.feedbackAttachmentURL && (
              <div className="flex items-center gap-2 border-t border-[#E5E7EB] pt-3 text-xs">
                <Paperclip className="size-4 text-[#6B7280]" />
                <span className="text-[#6B7280]">Tệp đính kèm:</span>
                <a
                  href={candidate.feedbackAttachmentURL}
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-[#316EE9] underline hover:text-[#1D4ED8]"
                >
                  {candidate.feedbackAttachmentURL.split("/").pop()}
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Response Form Box */}
      <div className="flex flex-col gap-6 rounded-xl border border-[#C4C6D2] bg-white p-6 shadow-xs">
        <div className="flex items-center justify-between gap-4">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-[#1D4ED8]">
            <Mail className="size-5" />
            PHẢN HỒI ỨNG VIÊN
          </h2>
          <span className="text-xs text-[#6B7280]">
            Phản hồi sẽ được gửi trực tiếp tới email:{" "}
            <strong className="text-[#111827]">{candidate.email}</strong>
          </span>
        </div>

        {isTerminal && (
          <div className="rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] p-4 text-xs font-medium text-[#4B5563]">
            {candidate.status === "interview_passed"
              ? "Ứng viên đã đạt trạng thái Trúng tuyển (Vòng 2). Quy trình tuyển dụng đã hoàn tất và được khóa theo luồng một chiều."
              : "Ứng viên đã ở trạng thái Từ chối. Quy trình tuyển dụng đã kết thúc và được khóa theo luồng một chiều."}
          </div>
        )}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <button
            type="button"
            disabled={candidate.status === "passed" || isTerminal}
            onClick={() => {
              if (candidate.status === "passed" || isTerminal) return;
              setResponseType("passed");
              setFormErrors({});
              setIsManualEdit(false);
            }}
            className={`flex items-center justify-center gap-2 rounded-lg border py-3 px-2 text-xs font-semibold transition-all md:text-sm disabled:cursor-not-allowed disabled:opacity-40 ${
              responseType === "passed"
                ? "border-[#16A34A] bg-[#F0FDF4] text-[#16A34A] shadow-xs"
                : "border-[#E5E7EB] bg-white text-[#6B7280] hover:bg-[#F9FAFB]"
            }`}
          >
            <CheckCircle2 className="size-4 shrink-0" />
            1. Mời phỏng vấn (Vòng 1)
          </button>
          <button
            type="button"
            disabled={candidate.status === "pending" || isTerminal}
            onClick={() => {
              if (candidate.status === "pending" || isTerminal) return;
              setResponseType("interview_passed");
              setFormErrors({});
              setIsManualEdit(false);
            }}
            className={`flex items-center justify-center gap-2 rounded-lg border py-3 px-2 text-xs font-semibold transition-all md:text-sm disabled:cursor-not-allowed disabled:opacity-40 ${
              responseType === "interview_passed"
                ? "border-[#2563EB] bg-[#EFF6FF] text-[#2563EB] shadow-xs"
                : "border-[#E5E7EB] bg-white text-[#6B7280] hover:bg-[#F9FAFB]"
            }`}
          >
            <Award className="size-4 shrink-0" />
            2. Trúng tuyển / Job Offer (Vòng 2)
          </button>
          <button
            type="button"
            disabled={isTerminal}
            onClick={() => {
              if (isTerminal) return;
              setResponseType("failed");
              setFormErrors({});
              setIsManualEdit(false);
            }}
            className={`flex items-center justify-center gap-2 rounded-lg border py-3 px-2 text-xs font-semibold transition-all md:text-sm disabled:cursor-not-allowed disabled:opacity-40 ${
              responseType === "failed"
                ? "border-[#DC2626] bg-[#FEF2F2] text-[#DC2626] shadow-xs"
                : "border-[#E5E7EB] bg-white text-[#6B7280] hover:bg-[#F9FAFB]"
            }`}
          >
            <XCircle className="size-4 shrink-0" />
            3. Từ chối (Không phù hợp)
          </button>
        </div>

        {/* Form Inputs based on Tab */}
        {responseType === "passed" && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-[#374151]">
                Họ và tên ứng viên
              </label>
              <div className="flex h-10 items-center rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] px-3 text-sm font-medium text-[#111827]">
                {candidate.fullname}
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-[#374151]">
                Vị trí ứng tuyển
              </label>
              <div className="flex h-10 items-center rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] px-3 text-sm font-medium text-[#111827]">
                {candidate.recruitmentTitle || "N/A"}
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-[#374151]">
                Thời gian phỏng vấn <span className="text-red-500">*</span>
              </label>
              <DateTimePicker
                value={interviewTime}
                onChange={(val) => {
                  setInterviewTime(val);
                  clearError("interviewTime");
                }}
                placeholder="Ví dụ: 09:30 - Ngày 20/09/2026..."
                showTime={true}
                formatMode="interview"
                error={formErrors.interviewTime}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-[#374151]">
                Địa điểm phỏng vấn <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={interviewLocation}
                onChange={(e) => {
                  setInterviewLocation(e.target.value);
                  clearError("interviewLocation");
                }}
                placeholder="Ví dụ: Tầng 5, Tòa nhà ADA Group..."
                className={`h-10 rounded-lg border px-3 text-sm outline-none transition-colors ${
                  formErrors.interviewLocation
                    ? "border-red-500 focus:border-red-500"
                    : "border-[#D1D5DB] focus:border-[#316EE9]"
                }`}
              />
              {formErrors.interviewLocation && (
                <p className="text-xs text-red-600">{formErrors.interviewLocation}</p>
              )}
            </div>

            <div className="flex flex-col gap-1.5 md:col-span-2">
              <label className="text-xs font-medium text-[#374151]">
                Thông tin người liên hệ <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={contactInfo}
                onChange={(e) => {
                  setContactInfo(e.target.value);
                  clearError("contactInfo");
                }}
                placeholder="Ví dụ: Mr.Alexander - 09232323232"
                className={`h-10 rounded-lg border px-3 text-sm outline-none transition-colors ${
                  formErrors.contactInfo
                    ? "border-red-500 focus:border-red-500"
                    : "border-[#D1D5DB] focus:border-[#316EE9]"
                }`}
              />
              {formErrors.contactInfo && (
                <p className="text-xs text-red-600">{formErrors.contactInfo}</p>
              )}
            </div>
          </div>
        )}

        {responseType === "interview_passed" && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-[#374151]">
                Họ và tên ứng viên
              </label>
              <div className="flex h-10 items-center rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] px-3 text-sm font-medium text-[#111827]">
                {candidate.fullname}
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-[#374151]">
                Vị trí công tác
              </label>
              <div className="flex h-10 items-center rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] px-3 text-sm font-medium text-[#111827]">
                {candidate.recruitmentTitle || "N/A"}
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-[#374151]">
                Ngày bắt đầu làm việc <span className="text-red-500">*</span>
              </label>
              <DateTimePicker
                value={startDate}
                onChange={(val) => {
                  setStartDate(val);
                  clearError("startDate");
                }}
                placeholder="Ví dụ: 01/10/2026..."
                showTime={false}
                formatMode="dateOnly"
                error={formErrors.startDate}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-[#374151]">
                Địa điểm làm việc <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={workLocation}
                onChange={(e) => {
                  setWorkLocation(e.target.value);
                  clearError("workLocation");
                }}
                placeholder="Ví dụ: Tầng 5, Tòa nhà ADA Group..."
                className={`h-10 rounded-lg border px-3 text-sm outline-none transition-colors ${
                  formErrors.workLocation
                    ? "border-red-500 focus:border-red-500"
                    : "border-[#D1D5DB] focus:border-[#316EE9]"
                }`}
              />
              {formErrors.workLocation && (
                <p className="text-xs text-red-600">{formErrors.workLocation}</p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-[#374151]">
                Mức lương & Thử việc <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={offeredSalary}
                onChange={(e) => {
                  setOfferedSalary(e.target.value);
                  clearError("offeredSalary");
                }}
                placeholder="Ví dụ: Thử việc 2 tháng - 85% lương..."
                className={`h-10 rounded-lg border px-3 text-sm outline-none transition-colors ${
                  formErrors.offeredSalary
                    ? "border-red-500 focus:border-red-500"
                    : "border-[#D1D5DB] focus:border-[#316EE9]"
                }`}
              />
              {formErrors.offeredSalary && (
                <p className="text-xs text-red-600">{formErrors.offeredSalary}</p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-[#374151]">
                Người liên hệ HR <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={offerContactInfo}
                onChange={(e) => {
                  setOfferContactInfo(e.target.value);
                  clearError("offerContactInfo");
                }}
                placeholder="Ví dụ: Mr.Alexander - 09232323232"
                className={`h-10 rounded-lg border px-3 text-sm outline-none transition-colors ${
                  formErrors.offerContactInfo
                    ? "border-red-500 focus:border-red-500"
                    : "border-[#D1D5DB] focus:border-[#316EE9]"
                }`}
              />
              {formErrors.offerContactInfo && (
                <p className="text-xs text-red-600">{formErrors.offerContactInfo}</p>
              )}
            </div>
          </div>
        )}

        {responseType === "failed" && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-[#374151]">
                Họ và tên ứng viên
              </label>
              <div className="flex h-10 items-center rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] px-3 text-sm font-medium text-[#111827]">
                {candidate.fullname}
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-[#374151]">
                Vị trí ứng tuyển
              </label>
              <div className="flex h-10 items-center rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] px-3 text-sm font-medium text-[#111827]">
                {candidate.recruitmentTitle || "N/A"}
              </div>
            </div>

            <div className="flex flex-col gap-1.5 md:col-span-2">
              <label className="text-xs font-medium text-[#374151]">
                Lý do / Lời nhắn bổ sung (Tùy chọn)
              </label>
              <input
                type="text"
                value={failedReason}
                onChange={(e) => setFailedReason(e.target.value)}
                placeholder="Ví dụ: Kinh nghiệm chuyên môn chưa đáp ứng yêu cầu dự án..."
                className="h-10 rounded-lg border border-[#D1D5DB] px-3 text-sm outline-none focus:border-[#316EE9]"
              />
            </div>
          </div>
        )}

        {/* Email Content Textarea */}
        <div className="flex flex-col gap-2 border-t border-[#E5E7EB] pt-4">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-[#111827]">
              Xem trước & Chỉnh sửa thư thông báo Email: <span className="text-red-500">*</span>
            </label>
            <button
              type="button"
              onClick={handleResetTemplate}
              className="flex items-center gap-1 text-xs text-[#316EE9] hover:underline"
            >
              <RotateCcw className="size-3" />
              Khôi phục mẫu chuẩn
            </button>
          </div>
          <textarea
            value={emailContent}
            onChange={(e) => {
              setIsManualEdit(true);
              setEmailContent(e.target.value);
              clearError("emailContent");
            }}
            rows={10}
            className={`w-full resize-y rounded-lg border p-3 text-sm text-[#111827] outline-none transition-colors ${
              formErrors.emailContent
                ? "border-red-500 focus:border-red-500"
                : "border-[#D1D5DB] focus:border-[#316EE9]"
            }`}
          />
          {formErrors.emailContent && (
            <p className="text-xs text-red-600">{formErrors.emailContent}</p>
          )}
        </div>

        {/* File Attachment & Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#E5E7EB] pt-4">
          <div className="flex items-center gap-3">
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1.5 rounded-lg border border-[#D1D5DB] bg-white px-3 py-2 text-xs font-medium text-[#374151] hover:bg-[#F9FAFB]"
            >
              <Paperclip className="size-4 text-[#6B7280]" />
              Đính kèm Thư mời / Tệp hợp đồng
            </button>

            {attachment && (
              <div className="flex items-center gap-2 rounded-md bg-[#F3F4F6] px-2.5 py-1 text-xs text-[#374151]">
                <FileText className="size-3.5 text-[#316EE9]" />
                <span className="max-w-40 truncate">{attachment.name}</span>
                <button
                  type="button"
                  onClick={() => setAttachment(null)}
                  className="text-[#9CA3AF] hover:text-[#EF4444]"
                >
                  <X className="size-3.5" />
                </button>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={handleSendClick}
            disabled={isSending || isTerminal || !emailContent.trim() || responseType === candidate.status}
            className={`flex items-center gap-2 rounded-lg px-6 py-2.5 text-sm font-semibold text-white transition-all disabled:cursor-not-allowed disabled:opacity-50 ${
              responseType === "passed"
                ? "bg-[#16A34A] hover:bg-[#15803D]"
                : responseType === "interview_passed"
                  ? "bg-[#2563EB] hover:bg-[#1D4ED8]"
                  : "bg-[#DC2626] hover:bg-[#B91C1C]"
            }`}
          >
            <Send className="size-4" />
            {isTerminal
              ? (candidate.status === "interview_passed" ? "Quy trình đã hoàn tất (Trúng tuyển)" : "Quy trình đã kết thúc (Từ chối)")
              : responseType === candidate.status
                ? "Đang ở trạng thái này"
                : isSending
                  ? "Đang gửi email..."
                  : "Gửi phản hồi qua Email"}
          </button>
        </div>
      </div>
      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="Xác nhận gửi email phản hồi"
        description={`Bạn có chắc chắn muốn gửi email phản hồi cho ứng viên "${candidate.fullname}" (${candidate.email})? Email thật sẽ được gửi đi ngay lập tức.`}
        cancelLabel="Hủy bỏ"
        confirmLabel="Gửi email ngay"
        onConfirm={handleActualSend}
        isConfirming={isSending}
      />
    </div>
  );
}