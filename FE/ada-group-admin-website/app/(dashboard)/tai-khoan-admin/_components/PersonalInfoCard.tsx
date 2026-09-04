import { Save } from "lucide-react";
import { Input } from "@/src/components/ui/input";

export default function PersonalInfoCard() {
  return (
    <div className="rounded-xl border border-[#E2E8F0] bg-white shadow-sm">
      <div className="border-b border-[#E2E8F0] px-6 py-5">
        <h2 className="text-xl font-semibold text-[#0F172A]">Thông tin cá nhân</h2>
      </div>

      <div className="flex flex-col gap-5 p-6">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="fullName"
              className="text-sm font-medium text-[#334155]"
            >
              Họ và tên
            </label>
            <Input
              id="fullName"
              name="fullName"
              defaultValue="Admin"
              className="h-11 border-[#E2E8F0]"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className="text-sm font-medium text-[#334155]"
            >
              Email
            </label>
            <Input
              id="email"
              name="email"
              defaultValue="admin@adagroup.vn"
              disabled
              className="h-11 border-[#E2E8F0] bg-[#F1F5F9] text-[#64748B]"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="phone"
              className="text-sm font-medium text-[#334155]"
            >
              Số điện thoại
            </label>
            <Input
              id="phone"
              name="phone"
              defaultValue="(84) 024 3456 678"
              className="h-11 border-[#E2E8F0]"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="position"
              className="text-sm font-medium text-[#334155]"
            >
              Chức vụ
            </label>
            <Input
              id="position"
              name="position"
              defaultValue="Quản trị viên hệ thống"
              className="h-11 border-[#E2E8F0]"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            className="flex items-center gap-2 rounded-lg bg-[#0B1B3A] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0B1B3A]/90"
          >
            <Save className="size-4" />
            Lưu thay đổi
          </button>
        </div>
      </div>
    </div>
  );
}
