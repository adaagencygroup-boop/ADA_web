"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bell } from "lucide-react";
import { formatDistanceToNowStrict } from "date-fns";
import { vi } from "date-fns/locale";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import {
  useMarkAllNotificationsAsRead,
  useMarkNotificationAsRead,
  useNotificationRealtime,
  useNotificationsInfinite,
} from "@/src/hooks/useNotifications";
import { NOTIFICATION_TYPE_META } from "@/src/lib/notification-meta";
import type { Notification } from "@/src/lib/api/notification";

const PAGE_SIZE = 5;

export default function NotificationBell() {
  const router = useRouter();
  useNotificationRealtime();
  const [rootEl, setRootEl] = useState<HTMLDivElement | null>(null);
  const [sentinelEl, setSentinelEl] = useState<HTMLDivElement | null>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useNotificationsInfinite({ size: PAGE_SIZE });
  const markAsReadMutation = useMarkNotificationAsRead();
  const markAllAsReadMutation = useMarkAllNotificationsAsRead();

  const items = data?.pages.flatMap((page) => page.items) ?? [];
  const unreadCount = data?.pages[0]?.unreadCount ?? 0;

  useEffect(() => {
    if (!rootEl || !sentinelEl || !hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { root: rootEl, rootMargin: "100px" }
    );
    observer.observe(sentinelEl);
    return () => observer.disconnect();
  }, [rootEl, sentinelEl, hasNextPage, isFetchingNextPage, fetchNextPage]);

  function handleItemClick(notification: Notification) {
    if (!notification.isRead) {
      markAsReadMutation.mutate(notification.id);
    }
    router.push(`/cai-dat/thong-bao/${notification.id}`);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="Thông báo"
        className="relative flex size-9 items-center justify-center rounded-full text-foreground/70 outline-none hover:bg-muted"
      >
        <Bell className="size-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-96 rounded-lg p-0">
        <div className="flex items-center justify-between border-b border-[#F3F4F6] px-5 py-4">
          <span className="text-lg font-semibold text-[#0F172A]">
            Thông báo
          </span>
          {unreadCount > 0 && (
            <button
              type="button"
              onClick={() => markAllAsReadMutation.mutate()}
              disabled={markAllAsReadMutation.isPending}
              className="text-sm font-medium text-[#2563EB] hover:underline disabled:cursor-not-allowed disabled:opacity-50"
            >
              Đánh dấu tất cả đã đọc
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="px-5 py-8 text-center text-sm text-[#6B7280]">
            Không có thông báo nào.
          </div>
        ) : (
          <div ref={setRootEl} className="max-h-96 overflow-y-auto">
            {items.map((item) => {
              const meta = NOTIFICATION_TYPE_META[item.type];
              const Icon = meta.icon;
              return (
                <DropdownMenuItem
                  key={item.id}
                  className="items-start gap-3 rounded-none px-5 py-3"
                  onClick={() => handleItemClick(item)}
                >
                  <span className="relative shrink-0">
                    <span
                      className="flex size-9 items-center justify-center rounded-full"
                      style={{ backgroundColor: meta.bg }}
                    >
                      <Icon className="size-4.5" style={{ color: meta.color }} />
                    </span>
                    {!item.isRead && (
                      <span className="absolute -top-0.5 -left-0.5 size-2.5 rounded-full border-2 border-white bg-blue-600" />
                    )}
                  </span>
                  <div className="flex min-w-0 flex-col gap-0.5">
                    <span className="text-sm font-semibold text-[#0F172A]">
                      {item.title}
                    </span>
                    <span className="line-clamp-2 text-sm text-[#475569]">
                      {item.content}
                    </span>
                    <span className="mt-0.5 text-xs text-[#94A3B8]">
                      {formatDistanceToNowStrict(new Date(item.createdAt), {
                        addSuffix: true,
                        locale: vi,
                      })}
                    </span>
                  </div>
                </DropdownMenuItem>
              );
            })}
            <div ref={setSentinelEl} className="h-1" />
            {isFetchingNextPage && (
              <div className="px-5 py-3 text-center text-xs text-[#94A3B8]">
                Đang tải thêm...
              </div>
            )}
          </div>
        )}

        <div className="border-t border-[#F3F4F6] p-3 text-center">
          <Link
            href="/cai-dat/thong-bao"
            className="text-sm font-medium text-[#2563EB] hover:underline"
          >
            Xem tất cả thông báo
          </Link>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
