import Link from "next/link";
import { ChevronRight, Info, ShieldAlert } from "lucide-react";
import DeviceSessionsTable from "@/app/(dashboard)/tai-khoan-admin/lich-su-dang-nhap/_components/DeviceSessionsTable";

export default function LichSuDangNhapPage() {
  return (
    <div className="flex flex-1 flex-col gap-6">
      <div className="flex flex-col gap-2">
        <nav className="flex items-center gap-2 text-sm text-[#434750]">
          <Link href="/" className="hover:text-[#1C1B1B]">
            Dashboard
          </Link>
          <ChevronRight className="size-3" />
          <Link href="/tai-khoan-admin" className="hover:text-[#1C1B1B]">
            Tài khoản admin
          </Link>
          <ChevronRight className="size-3" />
          <span className="font-medium text-[#1C1B1B]">
            Thiết bị đang đăng nhập
          </span>
        </nav>
        <h1 className="text-3xl font-semibold text-[#1C1B1B]">
          Lịch sử đăng nhập
        </h1>
      </div>

      <div className="flex items-start gap-4 rounded-lg border border-[#BCE0FD] bg-[#F0F7FF] p-4">
        <Info className="mt-0.5 size-5 shrink-0 text-[#006CEB]" />
        <div className="flex flex-col gap-1">
          <span className="text-sm font-semibold text-[#1C1B1B]">
            Danh sách các thiết bị đã đăng nhập vào tài khoản của bạn.
          </span>
          <span className="text-sm text-[#434750]">
            Nếu phát hiện thiết bị lạ hoặc không còn sử dụng, bạn có thể đăng
            xuất thiết bị đó để bảo mật tài khoản.
          </span>
        </div>
      </div>

      <DeviceSessionsTable />

      <div className="flex items-start gap-4 rounded-lg border border-[#FDE68A] bg-[#FFFBEB] p-5">
        <ShieldAlert className="mt-0.5 size-5 shrink-0 text-[#D97706]" />
        <div className="flex flex-col gap-1">
          <span className="text-sm font-semibold text-[#92400E]">
            Lưu ý bảo mật
          </span>
          <span className="text-sm text-[#92400E]">
            Nếu bạn không nhận ra thiết bị nào trong danh sách, hãy đăng xuất
            thiết bị đó ngay lập tức và đổi mật khẩu để bảo vệ tài khoản.
          </span>
        </div>
      </div>
    </div>
  );
}
