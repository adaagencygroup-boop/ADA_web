"use client";

import { useRef, useState } from "react";
import { toast } from "sonner";
import {
  FileText,
  Mail,
  Paperclip,
  Phone,
  Send,
  Trash2,
  User,
} from "lucide-react";
import { useUploadMedia } from "@/src/hooks/useNews";
import {
  useDeleteContact,
  useRespondContact,
  useUpdateContactNote,
} from "@/src/hooks/useContacts";
import type { Contact } from "@/src/lib/api/contact";

const STATUS_STYLES = {
  pending: {
    label: "Chưa phản hồi",
    className: "bg-[#FDEEE0] text-[#C2410C]",
  },
  responded: {
    label: "Đã phản hồi",
    className: "bg-[#E1FCEF] text-[#15803D]",
  },
};

const ALLOWED_ATTACHMENT_EXTENSIONS = ["pdf", "doc", "docx", "jpg", "jpeg", "png"];
const MAX_ATTACHMENT_SIZE_BYTES = 10 * 1024 * 1024;

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function ContactDetailPanel({
  contact,
  onDeleted,
}: {
  contact: Contact;
  onDeleted: () => void;
}) {
  const [replyContent, setReplyContent] = useState("");
  const [note, setNote] = useState(contact.note ?? "");
  const [attachment, setAttachment] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadMutation = useUploadMedia();
  const respondMutation = useRespondContact();
  const noteMutation = useUpdateContactNote();
  const deleteMutation = useDeleteContact();

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    const extension = file.name.split(".").pop()?.toLowerCase() ?? "";
    if (!ALLOWED_ATTACHMENT_EXTENSIONS.includes(extension)) {
      toast.error(
        "Định dạng tệp không hợp lệ. Chỉ chấp nhận PDF, DOC, DOCX, JPG, PNG."
      );
      return;
    }
    if (file.size > MAX_ATTACHMENT_SIZE_BYTES) {
      toast.error("Dung lượng tệp không được vượt quá 10MB.");
      return;
    }

    setAttachment(file);
  }

  function handleSendReply() {
    if (!replyContent.trim()) return;

    if (attachment) {
      uploadMutation.mutate(attachment, {
        onSuccess: (result) => {
          respondMutation.mutate({
            id: contact.id,
            payload: {
              feedbackContent: replyContent,
              feedbackAttachmentURL: result.fileURL,
            },
          });
        },
      });
      return;
    }

    respondMutation.mutate({
      id: contact.id,
      payload: { feedbackContent: replyContent },
    });
  }

  function handleSaveNote() {
    noteMutation.mutate({ id: contact.id, note });
  }

  function handleDelete() {
    if (!window.confirm(`Xoá liên hệ của "${contact.customerFullname}"?`)) return;
    deleteMutation.mutate(contact.id, { onSuccess: onDeleted });
  }

  const statusStyle = STATUS_STYLES[contact.status];
  const isSendingReply = uploadMutation.isPending || respondMutation.isPending;

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-xl border border-[#E5E7EB] bg-white p-6">
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-xl font-semibold text-[#111827]">
            Chi tiết liên hệ
          </h2>
          <span
            className={`inline-flex shrink-0 items-center rounded-full px-3 py-1 text-xs font-medium ${statusStyle.className}`}
          >
            {statusStyle.label}
          </span>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-[#D8E2FF]">
            <User className="size-6 text-[#316EE9]" />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-lg font-semibold text-[#111827]">
              {contact.customerFullname}
            </span>
            {contact.customerEmail && (
              <span className="flex items-center gap-1.5 text-sm text-[#4B5563]">
                <Mail className="size-3.5" />
                {contact.customerEmail}
              </span>
            )}
            {contact.customerPhone && (
              <span className="flex items-center gap-1.5 text-sm text-[#4B5563]">
                <Phone className="size-3.5" />
                {contact.customerPhone}
              </span>
            )}
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-3 rounded-lg bg-[#F9FAFB] p-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-[#6B7280]">Ngày gửi:</span>
            <span className="font-medium text-[#111827]">
              {formatDateTime(contact.createdAt)}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold text-[#111827]">
              Nội dung tin nhắn:
            </span>
            <p className="text-sm whitespace-pre-line text-[#374151]">
              &ldquo;{contact.message}&rdquo;
            </p>
          </div>
        </div>
      </div>

      {contact.status === "responded" && contact.feedbackContent ? (
        <div className="rounded-xl border border-[#E5E7EB] bg-white p-6">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-semibold text-[#111827]">
              Phản hồi của bạn
            </h2>
            <span className="inline-flex shrink-0 items-center rounded-full bg-[#E1FCEF] px-3 py-1 text-xs font-medium text-[#15803D]">
              Đã gửi
            </span>
          </div>

          <div className="mt-4 flex flex-col gap-2">
            <span className="text-sm font-semibold text-[#111827]">
              Nội dung phản hồi:
            </span>
            <p className="rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] p-3 text-sm whitespace-pre-line text-[#374151]">
              {contact.feedbackContent}
            </p>
          </div>

          {contact.feedbackAttachmentURL && (
            <div className="mt-4 flex flex-col gap-2">
              <span className="text-sm font-semibold text-[#111827]">
                Đính kèm tệp:
              </span>
              <div className="flex items-center justify-between gap-3 rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] p-3">
                <div className="flex min-w-0 items-center gap-2">
                  <FileText className="size-4 shrink-0 text-[#6B7280]" />
                  <span className="truncate text-sm font-medium text-[#111827]">
                    {contact.feedbackAttachmentURL.split("/").pop()}
                  </span>
                </div>
                <a
                  href={contact.feedbackAttachmentURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 text-sm font-medium text-[#1A56DB] hover:underline"
                >
                  Xem file
                </a>
              </div>
            </div>
          )}

          {contact.feedbackSentAt && (
            <p className="mt-4 text-xs text-[#6B7280]">
              Đã gửi lúc: {formatDateTime(contact.feedbackSentAt)}
            </p>
          )}
        </div>
      ) : (
        <div className="rounded-xl border border-[#E5E7EB] bg-white p-6">
          <h2 className="text-xl font-semibold text-[#111827]">
            Phản hồi cho khách hàng
          </h2>

          <div className="mt-4 flex flex-col gap-2">
            <label className="text-sm font-semibold text-[#111827]">
              Nội dung phản hồi
            </label>
            <textarea
              value={replyContent}
              onChange={(event) => setReplyContent(event.target.value)}
              placeholder="Nhập nội dung phản hồi..."
              rows={5}
              className="resize-none rounded-lg border border-[#D1D5DB] p-3 text-sm text-[#111827] outline-none placeholder:text-[#9CA3AF] focus-visible:border-[#1A56DB]"
            />
          </div>

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="mt-3 flex w-full min-w-0 items-center gap-2 text-sm text-[#4B5563] hover:text-[#1A56DB]"
          >
            <Paperclip className="size-4 shrink-0" />
            <span className="truncate">
              {attachment ? attachment.name : "Đính kèm tệp (nếu có)"}
            </span>
          </button>
          <p className="mt-1 text-xs text-[#9CA3AF]">
            Định dạng: PDF, DOC, DOCX, JPG, PNG (Tối đa 10MB)
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/jpeg,image/png"
            className="hidden"
            onChange={handleFileChange}
          />

          <button
            type="button"
            onClick={handleSendReply}
            disabled={!replyContent.trim() || isSendingReply}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-[#1A56DB] py-3 text-sm font-semibold text-white hover:bg-[#1A56DB]/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Send className="size-4" />
            {isSendingReply ? "Đang gửi..." : "Gửi phản hồi"}
          </button>
        </div>
      )}

      <div className="rounded-xl border border-[#E5E7EB] bg-white p-6">
        <h2 className="text-xl font-semibold text-[#111827]">Ghi chú nội bộ</h2>
        <textarea
          value={note}
          onChange={(event) => setNote(event.target.value)}
          placeholder="Nhập ghi chú..."
          rows={3}
          className="mt-4 w-full resize-none rounded-lg border border-[#D1D5DB] p-3 text-sm text-[#111827] outline-none placeholder:text-[#9CA3AF] focus-visible:border-[#1A56DB]"
        />

        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={handleSaveNote}
            disabled={noteMutation.isPending || note === (contact.note ?? "")}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-[#BFDBFE] bg-white px-3 py-2.5 text-sm font-semibold text-[#1A56DB] hover:bg-[#EFF6FF] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <span className="text-center">
              {noteMutation.isPending ? "Đang lưu..." : "Lưu ghi chú"}
            </span>
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-red-200 bg-white px-3 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Trash2 className="size-4 shrink-0" />
            <span className="text-center">
              {deleteMutation.isPending ? "Đang xóa..." : "Xóa liên hệ"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
