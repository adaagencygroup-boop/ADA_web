"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import type { Notification } from "@/src/lib/api/notification";
import {
  NOTIFICATION_TYPE_META,
  NOTIFICATION_TYPE_TARGET,
} from "@/src/lib/notification-meta";

function formatDateTime(iso: string) {
  const date = new Date(iso);
  return `${date.toLocaleDateString("vi-VN")} ${date.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })}`;
}

export default function NotificationDetailView({
  notification,
}: {
  notification: Notification;
}) {
  const queryClient = useQueryClient();
  const meta = NOTIFICATION_TYPE_META[notification.type];
  const Icon = meta.icon;
  const target = NOTIFICATION_TYPE_TARGET[notification.type];

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["notifications"] });
  }, [queryClient, notification.id]);

  return (
    <div className="flex flex-1 flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
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
            <Link href="/cai-dat/thong-bao" className="hover:text-[#1C1B1B]">
              Trang thông báo
            </Link>
            <ChevronRight className="size-3" />
            <span className="font-medium text-[#1C1B1B]">
              Chi tiết thông báo
            </span>
          </nav>
          <h1 className="text-3xl font-semibold text-[#1C1B1B]">
            Chi tiết thông báo
          </h1>
        </div>

        <Link
          href="/cai-dat/thong-bao"
          className="flex h-10 shrink-0 items-center gap-2 rounded-lg border border-[#D1D5DB] bg-white px-4 text-sm font-medium text-[#374151] hover:bg-[#F8FAFC]"
        >
          <ArrowLeft className="size-3.5" />
          Quay lại danh sách
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="flex flex-col gap-4 xl:col-span-2">
          <div className="flex flex-col gap-3 rounded-xl border border-[#E5E7EB] bg-white p-6 shadow-xs">
            <div className="flex items-start gap-4">
              <span
                className="flex size-11 shrink-0 items-center justify-center rounded-lg"
                style={{ backgroundColor: meta.bg }}
              >
                <Icon className="size-5" style={{ color: meta.color }} />
              </span>
              <div className="flex flex-col gap-2">
                <h2 className="text-lg font-semibold text-[#111827]">
                  {notification.title}
                </h2>
                <div className="flex items-center gap-3 text-sm text-[#6B7280]">
                  <span
                    className="inline-flex w-fit items-center rounded-full px-2.5 py-1 text-xs font-medium"
                    style={{ backgroundColor: meta.bg, color: meta.color }}
                  >
                    {meta.label}
                  </span>
                  <span>{formatDateTime(notification.createdAt)}</span>
                </div>
                <p className="text-sm text-[#374151]">
                  {notification.content}
                </p>
              </div>
            </div>
          </div>
        </div>

        {target && (
          <div className="flex flex-col gap-3 rounded-xl border border-[#E5E7EB] bg-white p-6 shadow-xs">
            <h2 className="text-sm font-semibold text-[#111827]">Xử lý</h2>
            <Link
              href={target.href}
              className="flex items-start justify-between gap-3 rounded-lg border border-[#E5E7EB] p-4 hover:bg-[#F8FAFC]"
            >
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-semibold text-[#111827]">
                  {target.label}
                </span>
                <span className="text-sm text-[#6B7280]">
                  {target.caption}
                </span>
              </div>
              <ChevronRight className="mt-0.5 size-4 shrink-0 text-[#9CA3AF]" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
