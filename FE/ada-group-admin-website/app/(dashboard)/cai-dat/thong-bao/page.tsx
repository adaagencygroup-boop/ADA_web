import Link from "next/link";
import { ChevronRight } from "lucide-react";
import NotificationsTable from "@/app/(dashboard)/cai-dat/thong-bao/_components/NotificationsTable";

export default function NotificationsPage() {
  return (
    <div className="flex flex-1 flex-col gap-2 sm:gap-4 md:gap-6">
      <div className="flex flex-col gap-2">
        <nav className="flex items-center gap-2 text-sm text-[#434750]">
          <Link href="/" className="hover:text-[#1C1B1B]">
            Dashboard
          </Link>
          <ChevronRight className="size-3" />
          <Link href="/cai-dat" className="hover:text-[#1C1B1B]">
            Cài đặt
          </Link>
          <ChevronRight className="size-3" />
          <span className="font-medium text-[#1C1B1B]">Trang thông báo</span>
        </nav>
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-semibold text-[#1C1B1B]">
            Trang thông báo
          </h1>
          <p className="text-lg text-[#434750]">
            Tổng hợp các sự kiện quan trọng trong hệ thống.
          </p>
        </div>
      </div>

      <NotificationsTable />
    </div>
  );
}
