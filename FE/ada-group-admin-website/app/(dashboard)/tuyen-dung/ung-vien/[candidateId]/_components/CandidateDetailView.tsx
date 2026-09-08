"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Briefcase,
  Calendar,
  CalendarClock,
  ChevronRight,
  Clock,
  Download,
  Eye,
  FileText,
  Mail,
  MapPin,
  MessageSquare,
  Pencil,
  Phone,
  User,
  Users,
} from "lucide-react";
import { useRecruitmentById } from "@/src/hooks/useRecruitments";
import { useUpdateCandidateNote } from "@/src/hooks/useCandidates";
import type { Candidate } from "@/src/lib/api/candidate";
import type { EmploymentType } from "@/src/lib/api/recruitment";

const EMPLOYMENT_TYPE_LABELS: Record<EmploymentType, string> = {
  fulltime: "Toàn thời gian",
  parttime: "Bán thời gian",
  remote: "Từ xa",
  hybrid: "Hybrid",
};

function formatDate(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("vi-VN");
}

function getFileName(url: string) {
  return url.split("/").pop() ?? url;
}

export default function CandidateDetailView({
  candidate,
}: {
  candidate: Candidate;
}) {
  const { data: job } = useRecruitmentById(candidate.recruitmentId);
  const noteMutation = useUpdateCandidateNote();
  const [note, setNote] = useState(candidate.note ?? "");

  function handleSaveNote() {
    noteMutation.mutate({ id: candidate.id, note });
  }

  return (
    <div className="flex flex-1 flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <nav className="flex items-center gap-2 text-sm text-[#434750]">
            <Link href="/" className="hover:text-[#1C1B1B]">
              Trang chủ
            </Link>
            <ChevronRight className="size-3" />
            <Link href="/tuyen-dung" className="hover:text-[#1C1B1B]">
              Tuyển dụng
            </Link>
            <ChevronRight className="size-3" />
            <Link href="/tuyen-dung/ung-vien" className="hover:text-[#1C1B1B]">
              Ứng viên
            </Link>
            <ChevronRight className="size-3" />
            <span className="font-medium text-[#1C1B1B]">
              Thông tin ứng viên
            </span>
          </nav>
          <h1 className="text-3xl font-semibold text-[#1C1B1B]">
            Thông tin ứng viên
          </h1>
        </div>

        <Link
          href="/tuyen-dung/ung-vien"
          className="flex h-10 shrink-0 items-center gap-2 rounded-lg border border-[#C4C6D2] bg-white px-4 text-sm font-medium text-[#1C1B1B] hover:bg-[#F8FAFC]"
        >
          ← Quay lại danh sách
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="flex flex-col gap-6 rounded-xl border border-[#C4C6D2] bg-white p-6 shadow-xs xl:col-span-2">
          <div className="flex flex-col gap-4">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-[#1D4ED8]">
              <User className="size-4" />
              THÔNG TIN ỨNG VIÊN
            </h2>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <User className="size-4 shrink-0 text-[#94A3B8]" />
                <div className="flex flex-col">
                  <span className="text-xs text-[#94A3B8]">Họ và tên</span>
                  <span className="text-base font-semibold text-[#1C1B1B]">
                    {candidate.fullname}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="size-4 shrink-0 text-[#94A3B8]" />
                <div className="flex flex-col">
                  <span className="text-xs text-[#94A3B8]">Email</span>
                  <span className="text-base font-semibold text-[#1C1B1B]">
                    {candidate.email ?? "—"}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="size-4 shrink-0 text-[#94A3B8]" />
                <div className="flex flex-col">
                  <span className="text-xs text-[#94A3B8]">
                    Số điện thoại
                  </span>
                  <span className="text-base font-semibold text-[#1C1B1B]">
                    {candidate.phone ?? "—"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-[#E5E2E1]" />

          <div className="flex flex-col gap-4">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-[#1D4ED8]">
              <FileText className="size-4" />
              HỒ SƠ ỨNG TUYỂN
            </h2>
            {candidate.resumeURL ? (
              <>
                <p className="text-sm font-semibold text-[#1C1B1B]">
                  CV / Resume
                </p>
                <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-[#E5E2E1] bg-[#F8FAFC] px-4 py-3">
                  <div className="flex min-w-0 items-center gap-3">
                    <FileText className="size-6 shrink-0 text-red-500" />
                    <span className="truncate text-sm font-medium text-[#1C1B1B]">
                      {getFileName(candidate.resumeURL)}
                    </span>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <Link
                      href={`/tuyen-dung/ung-vien/${candidate.id}/cv`}
                      className="flex h-9 items-center gap-1.5 rounded-lg border border-[#C4C6D2] px-3 text-sm font-medium text-[#1C1B1B] hover:bg-white"
                    >
                      <Eye className="size-3.5" />
                      Xem
                    </Link>
                    <a
                      href={candidate.resumeURL}
                      download
                      className="flex h-9 items-center gap-1.5 rounded-lg border border-[#C4C6D2] px-3 text-sm font-medium text-[#1C1B1B] hover:bg-white"
                    >
                      <Download className="size-3.5" />
                      Tải xuống
                    </a>
                  </div>
                </div>
              </>
            ) : (
              <p className="text-sm text-[#6B7280]">
                Ứng viên chưa đính kèm CV.
              </p>
            )}
          </div>

          <div className="border-t border-[#E5E2E1]" />

          <div className="flex flex-col gap-4">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-[#1D4ED8]">
              <MessageSquare className="size-4" />
              LỜI NHẮN GỬI ĐẾN NHÀ TUYỂN DỤNG
            </h2>
            <div className="rounded-lg border border-[#E5E2E1] bg-[#F8FAFC] p-4">
              {candidate.message ? (
                <p className="text-sm whitespace-pre-line text-[#374151]">
                  {candidate.message}
                </p>
              ) : (
                <p className="text-sm text-[#9CA3AF]">
                  Ứng viên không để lại lời nhắn.
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4 rounded-xl border border-[#C4C6D2] bg-white p-6 shadow-xs">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-[#1D4ED8]">
              <Briefcase className="size-4" />
              THÔNG TIN TUYỂN DỤNG
            </h2>
            <p className="text-xl font-semibold text-[#1D4ED8]">
              {candidate.recruitmentTitle}
            </p>

            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-2 text-sm text-[#6B7280]">
                  <Users className="size-4" />
                  Phòng ban
                </span>
                <span className="text-sm font-medium text-[#1C1B1B]">
                  {job?.departmentName ?? "—"}
                </span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-2 text-sm text-[#6B7280]">
                  <MapPin className="size-4" />
                  Địa điểm làm việc
                </span>
                <span className="text-sm font-medium text-[#1C1B1B]">
                  {candidate.location ?? "—"}
                </span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-2 text-sm text-[#6B7280]">
                  <Clock className="size-4" />
                  Hình thức làm việc
                </span>
                <span className="text-sm font-medium text-[#1C1B1B]">
                  {EMPLOYMENT_TYPE_LABELS[candidate.employmentType]}
                </span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-2 text-sm text-[#6B7280]">
                  <Calendar className="size-4" />
                  Ngày đăng
                </span>
                <span className="text-sm font-medium text-[#1C1B1B]">
                  {formatDate(job?.createdAt ?? null)}
                </span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-2 text-sm text-[#6B7280]">
                  <CalendarClock className="size-4" />
                  Hạn nộp hồ sơ
                </span>
                <span className="text-sm font-medium text-red-600">
                  {formatDate(candidate.expiresAt)}
                </span>
              </div>
            </div>

            <Link
              href={`/tuyen-dung/${candidate.recruitmentId}`}
              className="flex h-10 items-center justify-center gap-2 rounded-lg border border-[#BFDBFE] text-sm font-medium text-[#1D4ED8] hover:bg-[#EFF6FF]"
            >
              <Eye className="size-3.5" />
              Xem chi tiết tin tuyển dụng
            </Link>
          </div>

          <div className="flex flex-col gap-3 rounded-xl border border-[#C4C6D2] bg-white p-6 shadow-xs">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-[#1D4ED8]">
              <Pencil className="size-4" />
              GHI CHÚ CỦA NHÀ TUYỂN DỤNG
            </h2>
            <textarea
              value={note}
              onChange={(event) => setNote(event.target.value.slice(0, 500))}
              placeholder="Nhập ghi chú về ứng viên..."
              rows={5}
              className="resize-none rounded-lg border border-[#D1D5DB] p-3 text-sm text-[#1C1B1B] outline-none placeholder:text-[#9CA3AF] focus-visible:border-[#1A56DB]"
            />
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs text-[#94A3B8]">{note.length}/500</span>
              <button
                type="button"
                onClick={handleSaveNote}
                disabled={
                  noteMutation.isPending || note === (candidate.note ?? "")
                }
                className="flex h-9 items-center justify-center rounded-lg bg-[#1A56DB] px-4 text-sm font-semibold text-white hover:bg-[#1A56DB]/90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {noteMutation.isPending ? "Đang lưu..." : "Lưu ghi chú"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
