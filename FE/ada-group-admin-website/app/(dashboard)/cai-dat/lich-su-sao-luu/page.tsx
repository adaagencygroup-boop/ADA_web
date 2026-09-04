import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";
import BackupHistoryTable from "@/app/(dashboard)/cai-dat/lich-su-sao-luu/_components/BackupHistoryTable";

export default function LichSuSaoLuuPage() {
  return (
    <div className="flex flex-1 flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <nav className="flex items-center gap-2 text-sm text-[#434750]">
            <Link href="/" className="hover:text-[#1C1B1B]">
              Dashboard
            </Link>
            <ChevronRight className="size-3" />
            <Link href="/cai-dat" className="hover:text-[#1C1B1B]">
              Cài đặt
            </Link>
            <ChevronRight className="size-3" />
            <span className="font-medium text-[#1C1B1B]">
              Lịch sử sao lưu
            </span>
          </nav>
          <h1 className="text-3xl font-semibold text-[#1C1B1B]">
            Lịch sử sao lưu
          </h1>
          <p className="text-sm text-[#6B7280]">
            Quản lý và theo dõi tất cả các bản sao lưu dữ liệu của hệ thống.
          </p>
        </div>

        <Link
          href="/cai-dat"
          className="flex shrink-0 items-center gap-2 rounded-lg border border-[#D1D5DB] px-4 py-2 text-sm font-medium text-[#374151] hover:bg-[#F8FAFC]"
        >
          <ArrowLeft className="size-4" />
          Quay lại
        </Link>
      </div>

      <BackupHistoryTable />
    </div>
  );
}
