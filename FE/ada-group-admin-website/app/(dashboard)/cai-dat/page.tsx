import Link from "next/link";
import { ChevronRight } from "lucide-react";
import BackupSettingsCard from "@/app/(dashboard)/cai-dat/_components/BackupSettingsCard";

export default function CaiDatPage() {
  return (
    <div className="flex flex-1 flex-col gap-2 sm:gap-4 md:gap-6">
      <div className="flex flex-col gap-2">
        <nav className="flex items-center gap-2 text-sm text-[#434750]">
          <Link href="/" className="hover:text-[#1C1B1B]">
            Dashboard
          </Link>
          <ChevronRight className="size-3" />
          <span className="font-medium text-[#1C1B1B]">Cài đặt</span>
        </nav>
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-semibold text-[#1C1B1B]">
            Cài đặt hệ thống
          </h1>
          <p className="text-lg text-[#434750]">
            Quản lý sao lưu và khôi phục dữ liệu của hệ thống.
          </p>
        </div>
      </div>

      <BackupSettingsCard />
    </div>
  );
}
