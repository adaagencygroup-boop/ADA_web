"use client";

import { useState } from "react";
import { Laptop, LogOut, Monitor, RefreshCw, Smartphone } from "lucide-react";
import { useRevokeSession, useSessions } from "@/src/hooks/useAccount";
import type { DeviceType, Session } from "@/src/lib/api/account";
import RevokeSessionDialog from "@/app/(dashboard)/tai-khoan-admin/noi-dang-nhap/_components/RevokeSessionDialog";

const DEVICE_ICONS: Record<DeviceType, typeof Monitor> = {
  desktop: Monitor,
  mobile: Smartphone,
  tablet: Laptop,
};

function formatDateTime(iso: string) {
  const date = new Date(iso);
  return {
    date: date.toLocaleDateString("vi-VN"),
    time: date.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
  };
}

export default function DeviceSessionsTable() {
  const { data: sessions, isLoading, isError, error, refetch, isFetching } =
    useSessions();
  const revokeMutation = useRevokeSession();
  const [target, setTarget] = useState<Session | null>(null);

  const items = sessions ?? [];

  function handleConfirmRevoke() {
    if (!target) return;
    revokeMutation.mutate(target.sessionId, {
      onSuccess: () => setTarget(null),
    });
  }

  return (
    <>
      <div className="rounded-xl border border-[#C4C6D2] bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-[#C4C6D2] px-6 py-4">
          <h2 className="text-xl font-semibold text-[#1C1B1B]">
            Danh sách thiết bị đăng nhập ({items.length})
          </h2>
          <button
            type="button"
            onClick={() => refetch()}
            disabled={isFetching}
            className="flex items-center gap-1 text-sm font-semibold text-[#0054CD] hover:underline disabled:cursor-not-allowed disabled:opacity-50"
          >
            <RefreshCw className="size-3.5" />
            Cập nhật
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-225 border-collapse">
            <thead>
              <tr className="border-b border-[#C4C6D2] bg-[#F9FAFB] text-left">
                <th className="px-6 py-4 text-sm font-medium text-[#434750]">
                  Thiết bị / Trình duyệt
                </th>
                <th className="px-6 py-4 text-sm font-medium text-[#434750]">
                  Địa chỉ IP
                </th>
                <th className="px-6 py-4 text-sm font-medium text-[#434750]">
                  Đăng nhập lúc
                </th>
                <th className="px-6 py-4 text-sm font-medium text-[#434750]">
                  Hoạt động lần cuối
                </th>
                <th className="px-6 py-4 text-sm font-medium text-[#434750]">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading && (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-sm text-[#6B7280]">
                    Đang tải...
                  </td>
                </tr>
              )}
              {isError && (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-sm text-red-600">
                    {error?.message ?? "Đã có lỗi xảy ra khi tải danh sách thiết bị."}
                  </td>
                </tr>
              )}
              {!isLoading && !isError &&
                items.map((item) => {
                  const Icon = DEVICE_ICONS[item.deviceType];
                  const loginAt = formatDateTime(item.issuedAt);
                  const lastSeen = formatDateTime(item.lastSeenAt);
                  return (
                    <tr key={item.sessionId} className="border-t border-[#C4C6D2]">
                      <td className="px-6 py-5">
                        <div className="flex items-start gap-4">
                          <Icon className="mt-0.5 size-6 shrink-0 text-[#747782]" />
                          <div className="flex flex-col gap-1">
                            <span className="text-sm font-semibold tracking-wide text-[#1C1B1B]">
                              {item.OS} · {item.browser}
                            </span>
                            {item.isCurrentSession && (
                              <span className="w-fit rounded bg-[#E6F4EA] px-2 py-0.5 text-xs font-medium text-[#137333]">
                                Thiết bị hiện tại
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5 align-top text-sm text-[#1C1B1B]">
                        {item.IPAddress}
                      </td>
                      <td className="px-6 py-5 align-top">
                        <div className="flex flex-col gap-1">
                          <span className="text-sm text-[#434750]">
                            {loginAt.date}
                          </span>
                          <span className="text-sm text-[#434750]">
                            {loginAt.time}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-5 align-top">
                        <div className="flex flex-col gap-1">
                          <span className="text-sm text-[#434750]">
                            {lastSeen.date}
                          </span>
                          <span className="text-sm text-[#434750]">
                            {lastSeen.time}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-5 align-top">
                        {item.isCurrentSession ? (
                          <span className="text-[#94A3B8]">—</span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setTarget(item)}
                            className="flex items-center gap-1.5 rounded border border-[#FEE2E2] bg-white px-3 py-2 text-sm font-medium text-[#DC2626] hover:bg-red-50"
                          >
                            <LogOut className="size-3.5" />
                            Đăng xuất
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              {!isLoading && !isError && items.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-sm text-[#6B7280]">
                    Không có thiết bị nào đang đăng nhập.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <RevokeSessionDialog
        open={!!target}
        onOpenChange={(open) => {
          if (!open) setTarget(null);
        }}
        session={target}
        onConfirm={handleConfirmRevoke}
        isRevoking={revokeMutation.isPending}
      />
    </>
  );
}
