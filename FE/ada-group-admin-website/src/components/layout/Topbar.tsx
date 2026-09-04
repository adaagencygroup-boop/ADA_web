import { Bell, ChevronDown, LogOut, Settings, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/src/components/ui/sidebar";

export default function Topbar() {
  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between border-b bg-[#F8F9FB] px-6">
      <SidebarTrigger className="text-foreground/70 hover:text-foreground" />

      <div className="flex items-center gap-4">
        <button
          type="button"
          aria-label="Thông báo"
          className="relative flex size-9 items-center justify-center rounded-full text-foreground/70 hover:bg-muted"
        >
          <Bell className="size-5" />
          <span className="absolute top-1.5 right-1.5 size-2 rounded-full bg-red-500" />
        </button>

        <div className="h-6 w-px bg-border" />

        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 text-sm font-medium text-foreground outline-none">
            <span className="flex size-8 items-center justify-center rounded-full bg-[#0B1B3A] text-sm font-semibold text-white">
              A
            </span>
            Admin
            <ChevronDown className="size-4 text-muted-foreground" />
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-70 rounded-lg p-0">
            <div className="flex items-start gap-4 p-5">
              <span className="flex size-13 shrink-0 items-center justify-center rounded-full bg-[#1C4ED8] text-2xl font-medium text-white">
                A
              </span>
              <div className="flex flex-col gap-1 pt-0.5">
                <span className="text-lg font-semibold text-[#0F172A]">
                  Admin
                </span>
                <span className="text-sm text-[#475569]">
                  admin@adagroup.vn
                </span>
                <span className="mt-1 inline-flex w-fit items-center rounded bg-[#EFF6FF] px-2 py-0.5 text-xs font-medium text-[#2563EB]">
                  Quản trị viên
                </span>
              </div>
            </div>

            <div className="border-t border-[#F3F4F6] py-2">
              <DropdownMenuItem className="items-start gap-4 rounded-none px-5 py-3">
                <User className="mt-0.5 size-5 text-[#1E293B]" />
                <div className="flex flex-col">
                  <span className="text-[15px] font-semibold text-[#0F172A]">
                    Tài khoản admin
                  </span>
                  <span className="text-sm text-[#64748B]">
                    Thông tin tài khoản
                  </span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="items-start gap-4 rounded-none px-5 py-3">
                <Settings className="mt-0.5 size-5 text-[#1E293B]" />
                <div className="flex flex-col">
                  <span className="text-[15px] font-semibold text-[#0F172A]">
                    Cài đặt
                  </span>
                  <span className="text-sm text-[#64748B]">
                    Quản lý hệ thống
                  </span>
                </div>
              </DropdownMenuItem>
            </div>

            <div className="border-t border-[#F3F4F6] py-2">
              <DropdownMenuItem
                variant="destructive"
                className="items-start gap-4 rounded-none px-5 py-3"
              >
                <LogOut className="mt-0.5 size-4.5" />
                <div className="flex flex-col">
                  <span className="text-[15px] font-semibold">Đăng xuất</span>
                  <span className="text-sm text-[#64748B]">
                    Thoát khỏi hệ thống
                  </span>
                </div>
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
