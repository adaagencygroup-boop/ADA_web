import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Briefcase,
  CalendarClock,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  Eye,
  Folder,
  Gift,
  Hash,
  Info,
  Maximize2,
  MapPin,
  Pencil,
  Trash2,
  UserPlus,
  Users,
  Zap,
} from "lucide-react";
import type { JobDetail } from "@/app/(dashboard)/tuyen-dung/[jobId]/_components/data";

const STATUS_STYLES: Record<JobDetail["status"], string> = {
  active: "bg-[#E1FCEF] text-[#15803D]",
  closed: "bg-[#FFDAD6] text-[#BA1A1A]",
  hidden: "bg-[#F3F4F6] text-[#434750]",
};

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2">
          <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-[#001E4B]" />
          <span className="text-base leading-6.5 text-[#1C1B1B]">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function JobDetailView({ job }: { job: JobDetail }) {
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
            <span className="font-medium text-[#1C1B1B]">{job.title}</span>
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
            className="flex h-9 items-center gap-2 rounded-lg bg-[#BA1A1A] px-4 text-sm font-medium text-white hover:bg-[#BA1A1A]/90"
          >
            <Trash2 className="size-3.5" />
            Xóa tin tuyển dụng
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="flex flex-col gap-6 xl:col-span-2">
          <div className="relative flex h-80 flex-col justify-end overflow-hidden rounded-xl border border-[#C4C6D2] p-8 shadow-xs">
            <Image
              src={job.heroImage}
              alt={job.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-[#001E4B]/90 to-[#001E4B]/0" />

            <div className="relative z-10 flex items-end justify-between gap-8">
              <div className="flex flex-col gap-3">
                <span className="w-fit rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-xs">
                  {job.type === "Full-time" ? "Toàn thời gian" : job.type}
                </span>
                <h2 className="text-4xl font-bold tracking-tight text-white">
                  {job.title}
                </h2>
                <div className="flex items-center gap-4 text-sm text-white/90">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="size-3.5" />
                    {job.location}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Briefcase className="size-3.5" />
                    {job.type}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Folder className="size-3.5" />
                    {job.category}
                  </span>
                </div>
              </div>

              <div className="flex shrink-0 flex-col items-end gap-3">
                <button
                  type="button"
                  className="flex items-center gap-2 rounded-lg bg-white px-6 py-2.5 text-sm font-bold text-[#001E4B] hover:bg-white/90"
                >
                  Ứng tuyển ngay
                  <span aria-hidden>↗</span>
                </button>
                <div className="flex flex-col items-end gap-0.5 rounded-lg bg-white/20 px-3 py-1.5 backdrop-blur-xs">
                  <span className="text-xs text-white/80">
                    Hạn nộp hồ sơ
                  </span>
                  <span className="text-xs font-bold text-white">
                    {job.deadline}
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
            <BulletList items={job.description} />
          </div>

          <div className="flex flex-col gap-4 rounded-xl border border-[#C4C6D2] bg-white p-6 shadow-xs">
            <h3 className="flex items-center gap-2 border-b border-[#E5E2E1] pb-2 text-xl font-semibold text-[#001E4B]">
              <CheckCircle2 className="size-5 text-[#0054CD]" />
              YÊU CẦU
            </h3>
            <BulletList items={job.requirements} />
          </div>

          <div className="flex flex-col gap-4 rounded-xl border border-[#C4C6D2] bg-white p-6 shadow-xs">
            <h3 className="flex items-center gap-2 border-b border-[#E5E2E1] pb-2 text-xl font-semibold text-[#001E4B]">
              <Gift className="size-5 text-[#0054CD]" />
              QUYỀN LỢI
            </h3>
            <BulletList items={job.benefits} />
          </div>

          <div className="flex flex-col gap-4 rounded-xl border border-[#C4C6D2] bg-white p-6 shadow-xs">
            <h3 className="flex items-center gap-2 border-b border-[#E5E2E1] pb-2 text-xl font-semibold text-[#001E4B]">
              <Info className="size-5 text-[#0054CD]" />
              THÔNG TIN KHÁC
            </h3>
            <div className="overflow-hidden rounded-lg border border-[#E5E2E1]">
              {job.otherInfo.map((row, index) => (
                <div
                  key={row.label}
                  className={`flex ${
                    index !== job.otherInfo.length - 1
                      ? "border-b border-[#E5E2E1]"
                      : ""
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
          <div className="flex flex-col gap-5 rounded-xl border border-[#C4C6D2] bg-white p-5 shadow-xs">
            <h3 className="text-xl font-semibold tracking-wide text-[#001E4B] uppercase">
              Thông tin tuyển dụng
            </h3>

            <div className="flex items-start gap-3">
              <Hash className="mt-0.5 size-4 shrink-0 text-[#434750]" />
              <div className="flex flex-col gap-0.5">
                <span className="text-sm text-[#434750]">
                  ID tin tuyển dụng
                </span>
                <span className="text-base font-semibold text-[#1C1B1B]">
                  {job.code}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Zap className="mt-0.5 size-4 shrink-0 text-[#434750]" />
              <div className="flex flex-col gap-1">
                <span className="text-sm text-[#434750]">Trạng thái</span>
                <span
                  className={`w-fit rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLES[job.status]}`}
                >
                  {job.statusLabel}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CalendarDays className="mt-0.5 size-4 shrink-0 text-[#434750]" />
              <div className="flex flex-col gap-0.5">
                <span className="text-sm text-[#434750]">Ngày đăng</span>
                <span className="text-base font-semibold text-[#1C1B1B]">
                  {job.postedAt}
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
                  {job.deadline}
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
                  {job.totalSlots}
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
                  {job.appliedCount}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Eye className="mt-0.5 size-4 shrink-0 text-[#434750]" />
              <div className="flex flex-col gap-0.5">
                <span className="text-sm text-[#434750]">Lượt xem</span>
                <span className="text-base font-semibold text-[#1C1B1B]">
                  {job.viewCount}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 rounded-xl border border-[#C4C6D2] bg-white p-5 shadow-xs">
            <h3 className="text-xl font-semibold text-[#001E4B]">
              Hình ảnh đại diện
            </h3>
            <div className="relative h-40 w-full overflow-hidden rounded-lg">
              <Image
                src={job.heroImage}
                alt={job.title}
                fill
                className="object-cover"
              />
            </div>
            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-lg border border-[#C4C6D2] py-2.5 text-sm font-medium text-[#1C1B1B] hover:bg-[#F8FAFC]"
            >
              <Maximize2 className="size-3.5" />
              Xem ảnh đầy đủ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
