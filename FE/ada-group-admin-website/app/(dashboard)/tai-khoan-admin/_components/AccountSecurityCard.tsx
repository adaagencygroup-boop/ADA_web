"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronRight, History, LogOut, MonitorSmartphone, Shield } from "lucide-react";
import LogoutConfirmDialog from "@/src/components/shared/LogoutConfirmDialog";
import { logout as logoutRequest } from "@/src/lib/api/auth";
import { clearAuthTokens } from "@/src/lib/storage";

export default function AccountSecurityCard() {
  const router = useRouter();
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  async function handleLogout() {
    setIsLoggingOut(true);
    try {
      await logoutRequest();
    } catch {
      // Best-effort: proceed to clear local session even if the request fails.
    } finally {
      clearAuthTokens();
      router.replace("/dang-nhap");
    }
  }

  return (
    <div className="rounded-xl border border-[#E2E8F0] bg-white shadow-sm">
      <div className="flex items-center gap-2 border-b border-[#E2E8F0] px-6 py-5">
        <Shield className="size-5 text-[#0F172A]" />
        <h2 className="text-lg font-semibold text-[#0F172A]">
          Bảo mật tài khoản
        </h2>
      </div>

      <div className="flex flex-col">
        <Link
          href="/tai-khoan-admin/noi-dang-nhap"
          className="flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-[#F8FAFC]"
        >
          <div className="flex items-start gap-3">
            <MonitorSmartphone className="mt-0.5 size-5 shrink-0 text-[#0F172A]" />
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-[#0F172A]">
                Nơi bạn đăng nhập
              </span>
              <span className="text-sm text-[#64748B]">
                Xem và quản lý các thiết bị đang đăng nhập
              </span>
            </div>
          </div>
          <ChevronRight className="size-5 shrink-0 text-[#94A3B8]" />
        </Link>

        <div className="border-t border-[#E2E8F0]" />

        <Link
          href="/tai-khoan-admin/lich-su-dang-nhap"
          className="flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-[#F8FAFC]"
        >
          <div className="flex items-start gap-3">
            <History className="mt-0.5 size-5 shrink-0 text-[#0F172A]" />
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-[#0F172A]">
                Lịch sử đăng nhập
              </span>
              <span className="text-sm text-[#64748B]">
                Xem lịch sử các lần đăng nhập tài khoản
              </span>
            </div>
          </div>
          <ChevronRight className="size-5 shrink-0 text-[#94A3B8]" />
        </Link>

        <div className="border-t border-[#E2E8F0] p-6">
          <button
            type="button"
            onClick={() => setLogoutOpen(true)}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-red-200 py-3 text-sm font-semibold text-red-600 hover:bg-red-50"
          >
            <LogOut className="size-4" />
            Đăng xuất
          </button>
        </div>
      </div>

      <LogoutConfirmDialog
        open={logoutOpen}
        onOpenChange={setLogoutOpen}
        onConfirm={handleLogout}
        isLoggingOut={isLoggingOut}
      />
    </div>
  );
}
