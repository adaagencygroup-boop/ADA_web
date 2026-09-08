"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Briefcase,
  Calendar,
  CalendarClock,
  ChevronRight,
  History,
  Mail,
  Phone,
  User,
} from "lucide-react";
import type { Candidate } from "@/src/lib/api/candidate";

function formatDate(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("vi-VN");
}

function getFileName(url: string) {
  return url.split("/").pop() ?? url;
}

export default function CandidateCvViewer({
  candidate,
}: {
  candidate: Candidate;
}) {
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
            <Link
              href={`/tuyen-dung/ung-vien/${candidate.id}`}
              className="hover:text-[#1C1B1B]"
            >
              Thông tin ứng viên
            </Link>
            <ChevronRight className="size-3" />
            <span className="font-medium text-[#1C1B1B]">Xem CV</span>
          </nav>
          <h1 className="text-3xl font-semibold text-[#1C1B1B]">
            Xem CV ứng viên
          </h1>
        </div>

        <Link
          href={`/tuyen-dung/ung-vien/${candidate.id}`}
          className="flex h-10 shrink-0 items-center gap-2 rounded-lg border border-[#BFDBFE] px-4 text-sm font-medium text-[#1D4ED8] hover:bg-[#EFF6FF]"
        >
          <ArrowLeft className="size-3.5" />
          Quay lại thông tin ứng viên
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="overflow-hidden rounded-xl border border-[#C4C6D2] bg-white shadow-xs xl:col-span-2">
          {candidate.resumeURL ? (
            <>
              <div className="flex items-center justify-between border-b border-[#E5E2E1] bg-[#F8FAFC] px-4 py-3">
                <span className="truncate text-sm font-medium text-[#1C1B1B]">
                  {getFileName(candidate.resumeURL)}
                </span>
                <a
                  href={candidate.resumeURL}
                  download
                  className="shrink-0 text-sm font-medium text-[#1D4ED8] hover:underline"
                >
                  Tải xuống
                </a>
              </div>
              <iframe
                src={candidate.resumeURL}
                title="CV ứng viên"
                className="h-[80vh] w-full"
              />
            </>
          ) : (
            <div className="flex h-80 items-center justify-center text-sm text-[#6B7280]">
              Ứng viên chưa đính kèm CV.
            </div>
          )}
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-4 rounded-xl border border-[#C4C6D2] bg-white p-6 shadow-xs">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-[#1D4ED8]">
              <User className="size-4" />
              THÔNG TIN ỨNG VIÊN
            </h2>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <User className="size-4 shrink-0 text-[#94A3B8]" />
                <div className="flex flex-col">
                  <span className="text-xs text-[#94A3B8]">Họ và tên</span>
                  <span className="text-sm font-semibold text-[#1C1B1B]">
                    {candidate.fullname}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="size-4 shrink-0 text-[#94A3B8]" />
                <div className="flex flex-col">
                  <span className="text-xs text-[#94A3B8]">Email</span>
                  <span className="text-sm font-semibold text-[#1C1B1B]">
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
                  <span className="text-sm font-semibold text-[#1C1B1B]">
                    {candidate.phone ?? "—"}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 rounded-xl border border-[#C4C6D2] bg-white p-6 shadow-xs">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-[#1D4ED8]">
              <Briefcase className="size-4" />
              ỨNG TUYỂN VỊ TRÍ
            </h2>
            <p className="text-base font-semibold text-[#1C1B1B]">
              {candidate.recruitmentTitle}
            </p>
          </div>

          <div className="flex flex-col gap-3 rounded-xl border border-[#C4C6D2] bg-white p-6 shadow-xs">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-[#1D4ED8]">
              <History className="size-4" />
              THÔNG TIN GHI NHẬN
            </h2>
            <div className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-2 text-sm text-[#6B7280]">
                <Calendar className="size-4" />
                Ngày ứng tuyển
              </span>
              <span className="text-sm font-medium text-[#1C1B1B]">
                {formatDate(candidate.appliedAt)}
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
        </div>
      </div>
    </div>
  );
}
