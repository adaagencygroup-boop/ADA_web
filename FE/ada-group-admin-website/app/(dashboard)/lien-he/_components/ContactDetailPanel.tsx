"use client";

import { useRef, useState } from "react";
import {
  Check,
  FileText,
  Mail,
  Paperclip,
  Phone,
  Send,
  Trash2,
  User,
} from "lucide-react";
import type { Contact } from "@/app/(dashboard)/lien-he/_components/data";

const STATUS_STYLES = {
  pending: {
    label: "Chưa phản hồi",
    className: "bg-[#FDEEE0] text-[#C2410C]",
  },
  answered: {
    label: "Đã phản hồi",
    className: "bg-[#E1FCEF] text-[#15803D]",
  },
};

function formatFileSize(bytes: number) {
  const mb = bytes / (1024 * 1024);
  return `${mb.toFixed(2)} MB`;
}

export default function ContactDetailPanel({
  contact,
  onSendReply,
  onMarkAnswered,
  onDelete,
}: {
  contact: Contact;
  onSendReply: (
    id: string,
    content: string,
    attachment?: { name: string; size: string }
  ) => void;
  onMarkAnswered: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const [replyContent, setReplyContent] = useState("");
  const [note, setNote] = useState(contact.note ?? "");
  const [attachment, setAttachment] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    setAttachment(file ?? null);
  }

  function handleSendReply() {
    if (!replyContent.trim()) return;
    onSendReply(
      contact.id,
      replyContent,
      attachment
        ? { name: attachment.name, size: formatFileSize(attachment.size) }
        : undefined
    );
  }

  function handleDelete() {
    if (!window.confirm(`Xoá liên hệ của "${contact.name}"?`)) return;
    onDelete(contact.id);
  }

  const statusStyle = STATUS_STYLES[contact.status];

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
              {contact.name}
            </span>
            <span className="flex items-center gap-1.5 text-sm text-[#4B5563]">
              <Mail className="size-3.5" />
              {contact.email}
            </span>
            <span className="flex items-center gap-1.5 text-sm text-[#4B5563]">
              <Phone className="size-3.5" />
              {contact.phone}
            </span>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-3 rounded-lg bg-[#F9FAFB] p-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-[#6B7280]">Ngày gửi:</span>
            <span className="font-medium text-[#111827]">
              {contact.sentAt.replace(" ", " - ")}
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

      {contact.status === "answered" && contact.reply ? (
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
              {contact.reply.content}
            </p>
          </div>

          {contact.reply.attachmentName && (
            <div className="mt-4 flex flex-col gap-2">
              <span className="text-sm font-semibold text-[#111827]">
                Đính kèm tệp:
              </span>
              <div className="flex items-center justify-between rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] p-3">
                <div className="flex items-center gap-2">
                  <FileText className="size-4 text-[#6B7280]" />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-[#111827]">
                      {contact.reply.attachmentName}
                    </span>
                    <span className="text-xs text-[#6B7280]">
                      {contact.reply.attachmentSize}
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  className="text-sm font-medium text-[#1A56DB] hover:underline"
                >
                  Xem file
                </button>
              </div>
            </div>
          )}

          <p className="mt-4 text-xs text-[#6B7280]">
            Đã gửi lúc: {contact.reply.sentAt.replace(" ", " - ")}
          </p>
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
            className="mt-3 flex items-center gap-2 text-sm text-[#4B5563] hover:text-[#1A56DB]"
          >
            <Paperclip className="size-4" />
            {attachment ? attachment.name : "Đính kèm tệp (nếu có)"}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />

          <button
            type="button"
            onClick={handleSendReply}
            disabled={!replyContent.trim()}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-[#1A56DB] py-3 text-sm font-semibold text-white hover:bg-[#1A56DB]/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Send className="size-4" />
            Gửi phản hồi qua Gmail
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
            onClick={() => onMarkAnswered(contact.id)}
            disabled={contact.status === "answered"}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-[#BBF7D0] bg-white px-3 py-2.5 text-sm font-semibold text-[#15803D] hover:bg-[#E1FCEF] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Check className="size-4 shrink-0" />
            <span className="text-center">Đánh dấu đã phản hồi</span>
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-red-200 bg-white px-3 py-2.5 text-sm font-semibold text-red-600 hover:bg-red-50"
          >
            <Trash2 className="size-4 shrink-0" />
            <span className="text-center">Xóa liên hệ</span>
          </button>
        </div>
      </div>
    </div>
  );
}
