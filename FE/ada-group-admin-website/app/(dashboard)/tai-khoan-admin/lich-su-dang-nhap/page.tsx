import Link from "next/link";
import { ChevronRight } from "lucide-react";
import LoginHistoryTable from "@/app/(dashboard)/tai-khoan-admin/lich-su-dang-nhap/_components/LoginHistoryTable";

export default function LichSuDangNhapPage() {
  return (
    <div className="flex flex-1 flex-col gap-6">
      <nav className="flex items-center gap-2 text-sm text-[#434750]">
        <Link href="/" className="hover:text-[#1C1B1B]">
          Dashboard
        </Link>
        <ChevronRight className="size-3" />
        <Link href="/tai-khoan-admin" className="hover:text-[#1C1B1B]">
          Tài khoản admin
        </Link>
        <ChevronRight className="size-3" />
        <span className="font-medium text-[#1C1B1B]">Lịch sử đăng nhập</span>
      </nav>

      <LoginHistoryTable />
    </div>
  );
}
