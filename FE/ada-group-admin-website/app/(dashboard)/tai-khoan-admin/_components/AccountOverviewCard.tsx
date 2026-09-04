import { Calendar, Camera, History, Pencil, Settings, User } from "lucide-react";
import { Badge } from "@/src/components/ui/badge";

export default function AccountOverviewCard() {
  return (
    <div className="rounded-xl border border-[#E2E8F0] bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-[#E2E8F0] px-6 py-5">
        <h2 className="text-xl font-semibold text-[#0F172A]">
          Thông tin tài khoản
        </h2>
        <button
          type="button"
          className="flex items-center gap-2 rounded-lg border border-[#E2E8F0] px-4 py-2 text-sm font-medium text-[#334155] hover:bg-[#F8FAFC]"
        >
          <Pencil className="size-4" />
          Chỉnh sửa thông tin
        </button>
      </div>

      <div className="flex flex-col gap-8 p-6 sm:flex-row sm:items-start">
        <div className="flex flex-col gap-3 items-center">
          <div className="relative">
            <div className="flex size-24 items-center justify-center rounded-full border-2 border-[#FCF9F8] bg-[#D8E2FF]">
              <User className="size-8 text-[#003274]" />
            </div>
            <button
              type="button"
              aria-label="Đổi ảnh đại diện"
              className="absolute right-0 bottom-0 flex size-7 items-center justify-center rounded-full border border-[#C4C6D2] bg-[#FCF9F8] text-[#434750] shadow-sm hover:bg-[#F1EDEB]"
            >
              <Camera className="size-3" />
            </button>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-[22px] leading-7.75 font-semibold text-[#1C1B1B]">
              Admin
            </span>
            <span className="text-sm text-[#434750]">admin@adagroup.vn</span>
            <Badge className="mt-1 bg-[#D8E2FF] text-[#003274]">
              Quản trị viên
            </Badge>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-5">
          <div className="flex items-center gap-3">
            <Settings className="size-5 shrink-0 text-[#64748B]" />
            <span className="w-44 shrink-0 text-sm text-[#64748B]">
              Trạng thái
            </span>
            <Badge className="bg-green-50 text-green-600">
              Đang hoạt động
            </Badge>
          </div>
          <div className="flex items-center gap-3">
            <History className="size-5 shrink-0 text-[#64748B]" />
            <span className="w-44 shrink-0 text-sm text-[#64748B]">
              Lần đăng nhập gần nhất
            </span>
            <span className="text-sm font-medium text-[#0F172A]">
              20/06/2025 14:45
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Calendar className="size-5 shrink-0 text-[#64748B]" />
            <span className="w-44 shrink-0 text-sm text-[#64748B]">
              Ngày tạo tài khoản
            </span>
            <span className="text-sm font-medium text-[#0F172A]">
              01/01/2024 09:30
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
