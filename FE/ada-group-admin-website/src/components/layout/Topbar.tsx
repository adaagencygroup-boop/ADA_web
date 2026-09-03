import { Bell, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/src/components/ui/sidebar";

export default function Topbar() {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b bg-[#F8F9FB] px-6">
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
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Hồ sơ</DropdownMenuItem>
            <DropdownMenuItem>Đăng xuất</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
