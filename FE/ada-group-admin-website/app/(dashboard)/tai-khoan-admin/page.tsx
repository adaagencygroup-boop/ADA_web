import Link from "next/link";
import AccountOverviewCard from "@/app/(dashboard)/tai-khoan-admin/_components/AccountOverviewCard";
import AccountSecurityCard from "@/app/(dashboard)/tai-khoan-admin/_components/AccountSecurityCard";
import ChangePasswordCard from "@/app/(dashboard)/tai-khoan-admin/_components/ChangePasswordCard";
import PersonalInfoCard from "@/app/(dashboard)/tai-khoan-admin/_components/PersonalInfoCard";

export default function TaiKhoanAdminPage() {
  return (
    <div className="flex flex-1 flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold text-[#0F172A]">Tài khoản admin</h1>
        <nav className="flex items-center gap-2 text-sm text-[#64748B]">
          <Link href="/" className="hover:text-[#0F172A]">
            Dashboard
          </Link>
          <span>/</span>
          <span className="text-[#0F172A]">Tài khoản admin</span>
        </nav>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-2">
          <AccountOverviewCard />
          <PersonalInfoCard />
        </div>

        <div className="flex flex-col gap-6">
          <ChangePasswordCard />
          <AccountSecurityCard />
        </div>
      </div>
    </div>
  );
}
