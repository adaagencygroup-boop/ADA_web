import Link from "next/link";
import { ChevronRight } from "lucide-react";
import DepartmentManager from "@/app/(dashboard)/tuyen-dung/phong-ban/_components/DepartmentManager";

export default function PhongBanPage() {
  return (
    <div className="flex flex-1 flex-col gap-6">
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
          <span className="font-medium text-[#1C1B1B]">Phòng ban</span>
        </nav>
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-semibold text-[#1C1B1B]">
            Phòng ban tuyển dụng
          </h1>
          <p className="text-sm text-[#434750]">
            Quản lý danh sách phòng ban của tin tuyển dụng.
          </p>
        </div>
      </div>

      <DepartmentManager />
    </div>
  );
}
