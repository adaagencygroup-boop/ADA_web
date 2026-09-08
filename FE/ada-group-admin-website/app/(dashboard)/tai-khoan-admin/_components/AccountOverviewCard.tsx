"use client";

import { Calendar, History, Settings, User } from "lucide-react";
import { Badge } from "@/src/components/ui/badge";
import { useProfile, useSessions } from "@/src/hooks/useAccount";
import type { UserRole } from "@/src/lib/api/auth";

const ROLE_LABELS: Record<UserRole, string> = {
  admin: "Quản trị viên",
  staff: "Nhân viên",
};

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AccountOverviewCard() {
  const { data: profile } = useProfile();
  const { data: sessions } = useSessions();

  const currentSession = sessions?.find((s) => s.isCurrentSession);

  return (
    <div className="rounded-xl border border-[#E2E8F0] bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-[#E2E8F0] px-6 py-5">
        <h2 className="text-xl font-semibold text-[#0F172A]">
          Thông tin tài khoản
        </h2>
      </div>

      <div className="flex min-w-0 flex-col gap-8 p-6 sm:flex-row sm:items-start">
        <div className="flex shrink-0 flex-col items-center gap-3">
          <div className="flex size-24 items-center justify-center rounded-full border-2 border-[#FCF9F8] bg-[#D8E2FF]">
            <User className="size-8 text-[#003274]" />
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-[22px] leading-7.75 font-semibold text-[#1C1B1B]">
              {profile?.fullname ?? "—"}
            </span>
            <span className="text-sm text-[#434750]">
              {profile?.email ?? ""}
            </span>
            {profile && (
              <Badge className="mt-1 bg-[#D8E2FF] text-[#003274]">
                {ROLE_LABELS[profile.role]}
              </Badge>
            )}
          </div>
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-5">
          <div className="flex min-w-0 flex-wrap items-center gap-3">
            <Settings className="size-5 shrink-0 text-[#64748B]" />
            <span className="w-44 shrink-0 text-sm text-[#64748B]">
              Trạng thái
            </span>
            <Badge className="shrink-0 bg-green-50 text-green-600">
              Đang hoạt động
            </Badge>
          </div>
          <div className="flex min-w-0 flex-wrap items-center gap-3">
            <History className="size-5 shrink-0 text-[#64748B]" />
            <span className="w-44 shrink-0 text-sm text-[#64748B]">
              Lần đăng nhập gần nhất
            </span>
            <span className="text-sm font-medium text-[#0F172A]">
              {currentSession ? formatDateTime(currentSession.issuedAt) : "—"}
            </span>
          </div>
          <div className="flex min-w-0 flex-wrap items-center gap-3">
            <Calendar className="size-5 shrink-0 text-[#64748B]" />
            <span className="w-44 shrink-0 text-sm text-[#64748B]">
              Ngày tạo tài khoản
            </span>
            <span className="text-sm font-medium text-[#0F172A]">
              {profile ? formatDateTime(profile.createdAt) : "—"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
