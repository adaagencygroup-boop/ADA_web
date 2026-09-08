"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Briefcase,
  CalendarClock,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  Clock,
  Eye,
  Folder,
  Gift,
  Hash,
  Info,
  MapPin,
  Pencil,
  Trash2,
  UserPlus,
  Users,
} from "lucide-react";
import { RICH_TEXT_TYPOGRAPHY_CLASS } from "@/src/components/shared/RichTextEditor";
import { useDeleteRecruitment } from "@/src/hooks/useRecruitments";
import type {
  EmploymentType,
  RecruitmentDetail,
  RecruitmentStatus,
} from "@/src/lib/api/recruitment";
import DeleteRecruitmentDialog from "@/app/(dashboard)/tuyen-dung/_components/DeleteRecruitmentDialog";

const STATUS_STYLES: Record<RecruitmentStatus, string> = {
  hiring: "bg-[#E1FCEF] text-[#15803D]",
  closed: "bg-[#FFDAD6] text-[#BA1A1A]",
  draft: "bg-[#F3F4F6] text-[#434750]",
};

const STATUS_LABELS: Record<RecruitmentStatus, string> = {
  hiring: "Đang tuyển",
  closed: "Đã đóng",
  draft: "Nháp",
};

const EMPLOYMENT_TYPE_LABELS: Record<EmploymentType, string> = {
  fulltime: "Full-time",
  parttime: "Part-time",
  remote: "Remote",
  hybrid: "Hybrid",
};

function formatDate(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("vi-VN");
}

function formatSalary(job: RecruitmentDetail) {
  if (job.isNegotiable) return "Thỏa thuận";
  if (job.minSalary == null && job.maxSalary == null) return "—";
  const format = (value: number) => value.toLocaleString("vi-VN") + " VND";
  if (job.minSalary != null && job.maxSalary != null) {
    return `${format(job.minSalary)} - ${format(job.maxSalary)}`;
  }
  return format(job.minSalary ?? job.maxSalary ?? 0);
}

export default function JobDetailView({ job }: { job: RecruitmentDetail }) {
  const router = useRouter();
  const [deleteOpen, setDeleteOpen] = useState(false);
  const deleteMutation = useDeleteRecruitment();

  function handleConfirmDelete() {
    deleteMutation.mutate(job.id, {
      onSuccess: () => router.push("/tuyen-dung"),
    });
  }

  return (
    <div className="flex flex-1 flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <nav className="flex items-center gap-2 text-sm text-[#434750]">
            <Link href="/" className="hover:text-[#1C1B1B]">
              Dashboard
            </Link>
            <ChevronRight className="size-3" />
            <Link href="/tuyen-dung" className="hover:text-[#1C1B1B]">
              Tuyển dụng
            </Link>
            <ChevronRight className="size-3" />
            <span className="font-medium text-[#1C1B1B]">{job.jobTitle}</span>
          </nav>
          <h1 className="text-3xl font-semibold text-[#1C1B1B]">
            Xem bài tuyển dụng
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/tuyen-dung"
            className="flex h-9.5 items-center gap-2 rounded-lg border border-[#747782] px-4 text-sm font-medium text-[#1C1B1B] hover:bg-[#F8FAFC]"
          >
            <ArrowLeft className="size-3.5" />
            Quay lại danh sách
          </Link>
          <Link
            href={`/tuyen-dung/${job.id}/sua`}
            className="flex h-9 items-center gap-2 rounded-lg bg-[#0054CD] px-4 text-sm font-medium text-white hover:bg-[#0054CD]/90"
          >
            <Pencil className="size-3.5" />
            Chỉnh sửa
          </Link>
          <button
            type="button"
            onClick={() => setDeleteOpen(true)}
            className="flex h-9 items-center gap-2 rounded-lg bg-[#BA1A1A] px-4 text-sm font-medium text-white hover:bg-[#BA1A1A]/90"
          >
            <Trash2 className="size-3.5" />
            Xóa tin tuyển dụng
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="flex flex-col gap-6 xl:col-span-2">
          <div className="relative flex h-80 flex-col justify-end overflow-hidden rounded-xl border border-[#C4C6D2] bg-[#001E4B] p-8 shadow-xs">
            {job.coverImageURL && (
              <Image
                src={job.coverImageURL}
                alt={job.jobTitle}
                fill
                className="object-cover"
              />
            )}
            <div className="absolute inset-0 bg-linear-to-t from-[#001E4B]/90 to-[#001E4B]/0" />

            <div className="relative z-10 flex items-end justify-between gap-8">
              <div className="flex flex-col gap-3">
                <span className="w-fit rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-xs">
                  {EMPLOYMENT_TYPE_LABELS[job.employmentType]}
                </span>
                <h2 className="text-4xl font-semibold tracking-tight text-white">
                  {job.jobTitle}
                </h2>
                <div className="flex items-center gap-4 text-sm text-white/90">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="size-3.5" />
                    {job.location ?? "—"}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="size-3.5" />
                    {EMPLOYMENT_TYPE_LABELS[job.employmentType]}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Briefcase className="size-3.5" />
                    {job.departmentName ?? "—"}
                  </span>
                </div>
              </div>

              <div className="flex shrink-0 flex-col items-end gap-3">
                <div className="flex flex-col items-end gap-0.5 rounded-lg bg-white/20 px-3 py-1.5 backdrop-blur-xs">
                  <span className="text-xs text-white/80">
                    Hạn nộp hồ sơ
                  </span>
                  <span className="text-xs font-semibold text-white">
                    {formatDate(job.expiresAt)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 rounded-xl border border-[#C4C6D2] bg-white p-6 shadow-xs">
            <h3 className="flex items-center gap-2 border-b border-[#E5E2E1] pb-2 text-xl font-semibold text-[#001E4B]">
              <ClipboardList className="size-4 text-[#0054CD]" />
              MÔ TẢ CÔNG VIỆC
            </h3>
            <div
              className={`text-base text-[#1C1B1B] ${RICH_TEXT_TYPOGRAPHY_CLASS}`}
              dangerouslySetInnerHTML={{ __html: job.description }}
            />
          </div>

          <div className="flex flex-col gap-4 rounded-xl border border-[#C4C6D2] bg-white p-6 shadow-xs">
            <h3 className="flex items-center gap-2 border-b border-[#E5E2E1] pb-2 text-xl font-semibold text-[#001E4B]">
              <CheckCircle2 className="size-5 text-[#0054CD]" />
              YÊU CẦU
            </h3>
            <div
              className={`text-base text-[#1C1B1B] ${RICH_TEXT_TYPOGRAPHY_CLASS}`}
              dangerouslySetInnerHTML={{ __html: job.requirements }}
            />
          </div>

          <div className="flex flex-col gap-4 rounded-xl border border-[#C4C6D2] bg-white p-6 shadow-xs">
            <h3 className="flex items-center gap-2 border-b border-[#E5E2E1] pb-2 text-xl font-semibold text-[#001E4B]">
              <Gift className="size-5 text-[#0054CD]" />
              QUYỀN LỢI
            </h3>
            <div
              className={`text-base text-[#1C1B1B] ${RICH_TEXT_TYPOGRAPHY_CLASS}`}
              dangerouslySetInnerHTML={{ __html: job.benefits }}
            />
          </div>

          <div className="flex flex-col gap-4 rounded-xl border border-[#C4C6D2] bg-white p-6 shadow-xs">
            <h3 className="flex items-center gap-2 border-b border-[#E5E2E1] pb-2 text-xl font-semibold text-[#001E4B]">
              <Info className="size-5 text-[#0054CD]" />
              THÔNG TIN KHÁC
            </h3>
            <div className="overflow-hidden rounded-lg border border-[#E5E2E1]">
              {[
                { label: "Thời gian làm việc", value: job.workingHours ?? "—" },
                { label: "Mức lương", value: formatSalary(job) },
              ].map((row, index, arr) => (
                <div
                  key={row.label}
                  className={`flex ${
                    index !== arr.length - 1 ? "border-b border-[#E5E2E1]" : ""
                  }`}
                >
                  <div className="w-56 shrink-0 bg-[#F6F3F2] px-4 py-3 text-base font-medium text-[#434750]">
                    {row.label}
                  </div>
                  <div className="px-4 py-3 text-base text-[#1C1B1B]">
                    {row.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-5 self-start rounded-xl border border-[#C4C6D2] bg-white p-5 shadow-xs">
            <h3 className="text-xl font-semibold tracking-wide text-[#001E4B] uppercase">
              Thông tin tuyển dụng
            </h3>

            <div className="flex items-start gap-3">
              <Hash className="mt-0.5 size-4 shrink-0 text-[#434750]" />
              <div className="flex flex-col gap-0.5">
                <span className="text-sm text-[#434750]">
                  ID tin tuyển dụng
                </span>
                <span className="font-mono text-sm font-medium break-all text-[#1C1B1B]">
                  {job.id}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Info className="mt-0.5 size-4 shrink-0 text-[#434750]" />
              <div className="flex flex-col gap-1">
                <span className="text-sm text-[#434750]">Trạng thái</span>
                <span
                  className={`w-fit rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLES[job.status]}`}
                >
                  {STATUS_LABELS[job.status]}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CalendarDays className="mt-0.5 size-4 shrink-0 text-[#434750]" />
              <div className="flex flex-col gap-0.5">
                <span className="text-sm text-[#434750]">Ngày đăng</span>
                <span className="text-base font-semibold text-[#1C1B1B]">
                  {formatDate(job.createdAt)}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CalendarClock className="mt-0.5 size-4 shrink-0 text-[#434750]" />
              <div className="flex flex-col gap-0.5">
                <span className="text-sm text-[#434750]">
                  Hạn nộp hồ sơ
                </span>
                <span className="text-base font-semibold text-[#BA1A1A]">
                  {formatDate(job.expiresAt)}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Users className="mt-0.5 size-4 shrink-0 text-[#434750]" />
              <div className="flex flex-col gap-0.5">
                <span className="text-sm text-[#434750]">
                  Số lượng tuyển
                </span>
                <span className="text-base font-semibold text-[#1C1B1B]">
                  {job.requiredCandidateNum ?? "—"}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <UserPlus className="mt-0.5 size-4 shrink-0 text-[#434750]" />
              <div className="flex flex-col gap-0.5">
                <span className="text-sm text-[#434750]">
                  Đã ứng tuyển
                </span>
                <span className="text-base font-semibold text-[#0054CD]">
                  {job.applicantCount ?? 0}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Eye className="mt-0.5 size-4 shrink-0 text-[#434750]" />
              <div className="flex flex-col gap-0.5">
                <span className="text-sm text-[#434750]">Lượt xem</span>
                <span className="text-base font-semibold text-[#1C1B1B]">
                  {job.viewCount ?? 0}
                </span>
              </div>
            </div>
          </div>

          {job.coverImageURL && (
            <div className="flex flex-col gap-4 rounded-xl border border-[#C4C6D2] bg-white p-5 shadow-xs">
              <h3 className="text-xl font-semibold text-[#001E4B]">
                Hình ảnh đại diện
              </h3>
              <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                <Image
                  src={job.coverImageURL}
                  alt={job.jobTitle}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <DeleteRecruitmentDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        jobTitle={job.jobTitle}
        onConfirm={handleConfirmDelete}
        isDeleting={deleteMutation.isPending}
      />
    </div>
  );
}
